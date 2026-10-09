---
name: Production URL configuration
description: Hosting portability constraint for canonical and sitemap generation
---
Do not assume that the hosting platform automatically supplies the production origin required by pre-rendering. Netlify's automatic URL setting is not portable to Replit publishing.

**Why:** A Replit publish compiled successfully but failed during pre-rendering because the origin setting was absent. The site's crawlable canonical links, sitemap and structured data still require the real public origin.

**How to apply:** Confirm the public origin through deployment metadata and configure it for the production build. Keep missing-origin failures explicit rather than falling back to development or invented domains; review this configuration when moving hosts or changing the primary domain.

Validate crawlability against published HTTP responses, not only generated build files.

**Why:** Successful pre-rendering did not guarantee crawlable live pages: a hosting rewrite returned homepage HTML and its canonical link on every public route.

**How to apply:** After publishing, request representative non-homepage URLs without JavaScript and verify route-specific content and canonicals. Whenever adding routes, ensure hosting rules serve the corresponding generated HTML and unknown paths do not become homepage soft 404s.
