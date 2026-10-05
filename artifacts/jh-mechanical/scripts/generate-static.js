import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '../dist/public');
const serverEntry = path.resolve(__dirname, '../dist/server/entry-server.js');
if (!process.env.URL) {
  throw new Error('URL is required to generate canonical URLs, sitemap.xml, and robots.txt.');
}
const baseUrl = process.env.URL.replace(/\/+$/, '');
const routes = [
  '/', '/about', '/products',
  '/services/diesel-mechanic', '/services/diesel-servicing',
  '/services/vehicle-maintenance', '/services/vehicle-breakdown',
  '/services/vehicle-repairs',
  '/service-areas/heathcote', '/service-areas/bendigo',
  '/service-areas/seymour', '/service-areas/macedon',
  '/service-areas/shepparton', '/service-areas/lockington',
  '/service-areas/melbourne', '/service-areas/sunbury'
];

process.env.URL = baseUrl;
const { render } = await import(serverEntry);
const template = fs.readFileSync(path.join(publicDir, 'index.html'), 'utf8');

for (const route of routes) {
  let appHtml = render(route);
  const headTags = [];
  appHtml = appHtml.replace(
    /<(title|meta|link)\b[^>]*(?:>[^<]*<\/title>|\/?>)/g,
    (tag) => {
      headTags.push(tag);
      return '';
    },
  );
  appHtml = appHtml.replace(
    /<script id="jh-schema"[^>]*>[\s\S]*?<\/script>/,
    (tag) => {
      headTags.push(tag);
      return '';
    },
  );

  const html = template
    .replace('<!--seo-head-->', headTags.join('\n    '))
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  const output = route === '/'
    ? path.join(publicDir, 'index.html')
    : path.join(publicDir, route.slice(1), 'index.html');
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, html);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url>
    <loc>${baseUrl}${route}</loc>
    <changefreq>${route === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '/' ? '1.0' : route.includes('/services/') ? '0.9' : route.includes('/service-areas/') ? '0.7' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(publicDir, 'robots.txt'), `User-agent: *
Allow: /
Sitemap: ${baseUrl}/sitemap.xml
`);
fs.rmSync(path.resolve(__dirname, '../dist/server'), { recursive: true, force: true });
console.log(`Pre-rendered ${routes.length} crawlable pages.`);