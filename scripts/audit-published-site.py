#!/usr/bin/env python3
"""Read-only, JavaScript-free audit of an explicitly supplied production origin."""
import argparse
import concurrent.futures
import datetime
import hashlib
import json
import re
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path


class Page(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.title, self.h1, self.descriptions, self.canonicals = [], [], [], []
        self.schemas, self.assets, self.links, self.robots = [], [], [], []
        self.capture = None
        self.buffer = []
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in ("title", "h1") or (tag == "script" and a.get("type") == "application/ld+json"):
            self.capture, self.buffer = tag, []
        if tag == "br" and self.capture:
            self.buffer.append(" ")
        if tag == "meta":
            if a.get("name") == "description":
                self.descriptions.append(a.get("content", ""))
            if a.get("name") == "robots":
                self.robots.append(a.get("content", ""))
        if tag == "link":
            if a.get("rel") == "canonical":
                self.canonicals.append(a.get("href", ""))
            if a.get("rel") in ("stylesheet", "modulepreload", "preload", "icon"):
                if a.get("href"):
                    self.assets.append(a["href"])
                if a.get("imagesrcset"):
                    self.assets.extend(part.strip().split()[0] for part in a["imagesrcset"].split(",") if part.strip())
        if tag in ("img", "script", "source") and a.get("src"):
            self.assets.append(a["src"])
        if tag in ("img", "source") and a.get("srcset"):
            self.assets.extend(part.strip().split()[0] for part in a["srcset"].split(",") if part.strip())
        if tag == "a" and a.get("href"):
            self.links.append(a["href"])

    def handle_data(self, data):
        if self.capture:
            self.buffer.append(data)

    def handle_endtag(self, tag):
        if tag == self.capture:
            text = "".join(self.buffer)
            if tag == "script":
                self.schemas.append(json.loads(text))
            else:
                getattr(self, tag).append(" ".join(text.split()))
            self.capture = None


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def fetch(url, follow=True):
    opener = urllib.request.build_opener() if follow else urllib.request.build_opener(NoRedirect)
    req = urllib.request.Request(url, headers={"User-Agent": "JHMechanical-PublishedAudit/1.0", "Accept": "*/*"})
    try:
        response = opener.open(req, timeout=45)
    except urllib.error.HTTPError as error:
        response = error
    with response:
        body = response.read()
        return {
            "status": response.status, "url": response.url,
            "content_type": response.headers.get("Content-Type", ""),
            "location": response.headers.get("Location"),
            "x_robots_tag": response.headers.get("X-Robots-Tag"),
            "bytes": len(body), "sha256": hashlib.sha256(body).hexdigest(),
        }, body


def schema_urls(value):
    if isinstance(value, dict):
        for k, v in value.items():
            if k in ("url", "@id", "item", "image", "logo") and isinstance(v, str):
                yield k, v
            yield from schema_urls(v)
    elif isinstance(value, list):
        for item in value:
            yield from schema_urls(item)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("origin", help="Origin verified from deployment metadata; never a development URL")
    parser.add_argument("--output", required=True)
    args = parser.parse_args()
    origin = args.origin.rstrip("/")
    parsed = urllib.parse.urlparse(origin)
    if parsed.scheme != "https" or not parsed.netloc or parsed.path:
        parser.error("Provide an HTTPS origin without a path.")
    root = Path(__file__).resolve().parents[1]
    generator = (root / "artifacts/jh-mechanical/scripts/generate-static.js").read_text()
    routes = re.findall(r"'([^']+)'", generator.split("const routes = [", 1)[1].split("];", 1)[0])
    report = {"origin": origin, "checked_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
              "method": "Unauthenticated HTTP GET; no JavaScript execution", "pages": [], "assets": [], "failures": []}
    assets = set()
    all_links = set()
    def audit(route):
        url = origin + route
        direct, _ = fetch(url, follow=False)
        result, body = fetch(url)
        page = Page(body.decode())
        expected = origin + route
        issues = []
        if direct["status"] != 200 or direct["location"] or result["url"] != expected:
            issues.append("Preferred canonical target must return HTTP 200 without redirecting")
        if result["status"] != 200 or "text/html" not in result["content_type"]:
            issues.append("Expected HTML HTTP 200")
        for label, values in (("title", page.title), ("description", page.descriptions), ("H1", page.h1)):
            if len(values) != 1 or not values[0]:
                issues.append(f"Expected one nonempty {label}")
        if page.canonicals != [expected]:
            issues.append("Canonical does not match route")
        if not page.schemas:
            issues.append("Missing JSON-LD")
        graph = [node for schema in page.schemas for node in schema.get("@graph", [schema])]
        types = [node.get("@type") for node in graph]
        expected_type = "FAQPage" if route == "/" else "CollectionPage" if route == "/products/" else "AboutPage" if route == "/about/" else "Service"
        if not any(node.get("@type") == expected_type and
                   (node.get("url") or node.get("@id", "")).split("#")[0] == expected for node in graph):
            issues.append(f"Missing route-specific {expected_type} JSON-LD")
        if "AutoRepair" not in types:
            issues.append("Missing business JSON-LD")
        page_assets = set()
        for schema in page.schemas:
            for key, value in schema_urls(schema):
                if value.startswith("http") and not value.startswith(origin + "/") and "facebook.com/" not in value:
                    issues.append(f"Unexpected schema origin: {value}")
                if key in ("url", "@id", "item") and value.startswith(origin + "/"):
                    schema_path = urllib.parse.urlparse(value).path
                    if schema_path != "/" and schema_path.rstrip("/") + "/" in routes and not schema_path.endswith("/"):
                        issues.append(f"Schema page URL does not use preferred trailing slash: {value}")
                if key in ("image", "logo"):
                    page_assets.add(urllib.parse.urljoin(result["url"], value))
        for asset in page.assets:
            if asset.startswith("data:"):
                continue
            resolved = urllib.parse.urljoin(result["url"], asset)
            if urllib.parse.urlparse(resolved).netloc == parsed.netloc:
                page_assets.add(resolved)
                if not asset.startswith(("/", "https://")):
                    issues.append(f"Route-relative internal asset: {asset}")
        robots = " ".join(page.robots + [result.get("x_robots_tag") or ""]).lower()
        if "noindex" in robots:
            issues.append("Public page has noindex")
        local_path = root / "artifacts/jh-mechanical/dist/public" / route.lstrip("/") / "index.html"
        baseline_matches = None
        if local_path.is_file():
            baseline = Page(local_path.read_text())
            baseline_matches = {field: getattr(page, field) == getattr(baseline, field)
                                for field in ("title", "descriptions", "h1", "canonicals", "schemas")}
            if not all(baseline_matches.values()):
                issues.append(f"Published metadata differs from local generated HTML: {baseline_matches}")
        variants = []
        if route != "/":
            alternate = url.rstrip("/")
            slash_direct, _ = fetch(alternate, follow=False)
            slash, slash_body = fetch(alternate)
            slash_page = Page(slash_body.decode())
            equal = all(getattr(page, field) == getattr(slash_page, field)
                        for field in ("title", "descriptions", "h1", "canonicals", "schemas"))
            if slash["status"] != 200 or not equal:
                issues.append("Slashless metadata differs or fails")
            if slash_direct["status"] not in (301, 308) or urllib.parse.urljoin(alternate, slash_direct["location"] or "") != expected or slash["url"] != expected:
                issues.append("Slashless URL must permanently redirect to the preferred trailing-slash URL")
            variants.append({"requested": alternate, "initial_response": slash_direct, "final_response": slash,
                             "metadata_matches": equal})
        return {"route": route, "initial_response": direct, "final_response": result,
                "title": page.title, "description": page.descriptions, "h1": page.h1,
                "canonical": page.canonicals, "json_ld_types": types, "json_ld": page.schemas,
                "local_metadata_matches": baseline_matches,
                "internal_assets": sorted(page_assets), "variants": variants, "issues": issues}, page.links
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
        for row, links in pool.map(audit, routes):
            report["pages"].append(row)
            assets.update(row["internal_assets"])
            all_links.update(urllib.parse.urljoin(origin + row["route"], link) for link in links)
            report["failures"].extend(f'{row["route"]}: {issue}' for issue in row["issues"])
    for field in ("title", "description", "h1"):
        values = [tuple(page[field]) for page in report["pages"]]
        if len(set(values)) != len(routes):
            report["failures"].append(f"Non-unique {field} across public routes")
    def audit_asset(url):
        result, body = fetch(url)
        result["requested"] = url
        result["ok"] = result["status"] == 200 and "text/html" not in result["content_type"]
        dependencies = []
        if "text/css" in result["content_type"]:
            for match in re.finditer(r'''url\(\s*(?:"([^"]*)"|'([^']*)'|([^)\s]+))\s*\)''', body.decode()):
                value = next(group for group in match.groups() if group is not None)
                if value.startswith(("data:", "#")):
                    continue
                resolved = urllib.parse.urljoin(url, value.strip())
                if resolved.startswith(origin + "/"):
                    dependencies.append(resolved)
        return result, dependencies
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
        first = list(pool.map(audit_asset, sorted(assets)))
        dependencies = {url for _, urls in first for url in urls} - assets
        results = first + list(pool.map(audit_asset, sorted(dependencies)))
    for asset, _ in results:
        report["assets"].append(asset)
        if not asset["ok"]:
            report["failures"].append(f'Invalid internal asset: {asset["requested"]}')
    robots_result, robots_body = fetch(origin + "/robots.txt")
    robots = robots_body.decode()
    report["robots"] = {**robots_result, "body": robots}
    if robots_result["status"] != 200 or f"Sitemap: {origin}/sitemap.xml" not in robots or "Allow: /" not in robots:
        report["failures"].append("robots.txt does not permit crawling and declare the expected sitemap")
    sitemap_result, sitemap_body = fetch(origin + "/sitemap.xml")
    sitemap = ET.fromstring(sitemap_body)
    locations = [node.text for node in sitemap.findall(".//{http://www.sitemaps.org/schemas/sitemap/0.9}loc")]
    report["sitemap"] = {**sitemap_result, "locations": locations}
    if sitemap_result["status"] != 200 or sorted(locations) != sorted(origin + route for route in routes):
        report["failures"].append("Sitemap does not contain exactly the expected routes")
    report["unknown_urls"] = []
    for route in ("/audit-missing-page-20261009", "/audit-missing-page-20261009/",
                  "/services/audit-missing", "/services/audit-missing/",
                  "/service-areas/audit-missing", "/service-areas/audit-missing/"):
        initial, _ = fetch(origin + route, follow=False)
        result, body = fetch(origin + route)
        page = Page(body.decode())
        report["unknown_urls"].append({"requested": origin + route, "initial_response": initial,
                                       "final_response": result, "title": page.title, "robots": page.robots})
        if result["status"] != 404:
            report["failures"].append(f"Unknown URL did not return HTTP 404: {route}")
    public_paths = {route.rstrip("/") or "/" for route in routes}
    unknown_links = sorted({urllib.parse.urlparse(url).path.rstrip("/") or "/" for url in all_links
                            if urllib.parse.urlparse(url).netloc == parsed.netloc
                            and (urllib.parse.urlparse(url).path.rstrip("/") or "/") not in public_paths})
    report["unrecognised_internal_links"] = unknown_links
    if unknown_links:
        report["failures"].append(f"Internal links outside public routes: {unknown_links}")
    nonpreferred_links = sorted({url for url in all_links
                                if urllib.parse.urlparse(url).netloc == parsed.netloc
                                and urllib.parse.urlparse(url).path != "/"
                                and not urllib.parse.urlparse(url).path.endswith("/")})
    report["nonpreferred_internal_links"] = nonpreferred_links
    if nonpreferred_links:
        report["failures"].append(f"Internal page links do not use preferred trailing slash: {nonpreferred_links}")
    Path(args.output).parent.mkdir(parents=True, exist_ok=True)
    Path(args.output).write_text(json.dumps(report, indent=2) + "\n")
    print(json.dumps({"pages": len(routes), "assets": len(report["assets"]),
                      "unknown_urls": len(report["unknown_urls"]), "failures": report["failures"]}, indent=2))
    return bool(report["failures"])


if __name__ == "__main__":
    raise SystemExit(main())
