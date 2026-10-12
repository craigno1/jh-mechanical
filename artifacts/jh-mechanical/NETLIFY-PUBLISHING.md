# Updating the existing Netlify site

Use the existing **jh-mechanical** Netlify project and its existing GitHub connection. No new project is needed.

## Before publishing

1. Merge any outstanding SEO-title and FAQ edits into the GitHub branch Netlify builds. The Netlify project cannot include changes that are only in this workspace.
2. In Netlify, open **jh-mechanical → Forms** and enable **form detection** before the next deploy.
3. Check **Project configuration → Developer settings → Continuous deployment**:
   - The production branch is the branch receiving these changes.
   - Base directory is the repository root (leave blank).
   - Build command: `pnpm --filter @workspace/jh-mechanical run build`
   - Publish directory: `artifacts/jh-mechanical/dist/public`
   - Root `netlify.toml` already configures Node 24, `BASE_PATH=/` and `PORT=8888`.
   - Keep the root pnpm workspace files and lockfile in the repository; Netlify detects pnpm from the lockfile.
4. Check the project's **primary domain**. Netlify supplies `URL` as its primary public address during builds. If a manually configured `URL` overrides it, ensure it matches that address—not a Replit address, preview URL or obsolete domain. Static generation deliberately fails if the origin is absent.

## Publish the new version

Commit and push the verified changes to the GitHub production branch. If automatic deploys are enabled, this triggers a new Netlify build. Otherwise, open **Deploys → Trigger deploy → Deploy site** after the push.

A redeploy before pushing the new code only rebuilds the old GitHub version. Do not upload the source-code directory as a manual static deploy; only the generated publish directory contains the full crawlable site.

Review the build log for `Pre-rendered 16 crawlable pages.` and a successful deploy. This website deploy is static; no Replit API server or Replit credentials are needed for the quote form.

## Quote enquiries

The `quote-request` form submits the name, phone number, job description and optional photo to Netlify Forms. The browser shows success only after the request gets an accepted response; errors retain the details for retry. A honeypot discourages automated spam.

- Photos: JPG, PNG, WebP or GIF, up to 5 MB. Netlify's total request limit is 8 MB.
- After deploying, confirm `quote-request` appears under **Forms**.
- Make an identifiable test enquiry and confirm it actually appears in the Netlify Forms dashboard, including a test photo. Browser confirmation alone is not evidence of dashboard receipt.
- Under **Forms → Submission notifications → Add notification**, optionally configure the owner's chosen email address. No email destination is hardcoded.
- Netlify form handling is enabled only in Netlify builds using Netlify's `NETLIFY=true` build flag. The Replit/local preview deliberately reports that online submissions are unavailable rather than pretending to send an enquiry.
- If there is no JavaScript, Netlify handles the detected native POST form and displays its standard confirmation page.

## Post-publish checks

Use the project's actual primary domain:

- Open `/`, `/products/`, `/services/vehicle-maintenance/` and `/service-areas/macedon/` directly and refresh each.
- Check each page's initial HTML title, canonical and meaningful content—not just the browser-rendered heading.
- Confirm preferred trailing-slash URLs return HTTP 200 and slashless versions permanently redirect to them.
- Open `/sitemap.xml` and `/robots.txt`; their origins should match the primary domain.
- Visit a made-up path. It must return **HTTP 404** and display the styled “loose part” page, not homepage HTML. Its robots metadata must be `noindex, follow`.
- Use the 404 page's homepage link and test the header navigation at desktop and mobile widths.
- Confirm images and JavaScript load, and complete the real form/dashboard check above.

The local build and intercepted browser tests do not establish real Netlify receipt. That final check requires a deploy to the existing project and access to its Forms dashboard.

References:
- https://docs.netlify.com/build/configure-builds/monorepos/
- https://docs.netlify.com/manage/forms/setup/
- https://docs.netlify.com/manage/routing/redirects/redirect-options/
