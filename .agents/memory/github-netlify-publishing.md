---
name: GitHub and Netlify publishing workflow
description: Reliable workflow for publishing this workspace to GitHub and Netlify.
---

Use Replit's Git pane for full repository pushes after creating the destination repository; the connected GitHub API is reliable for metadata but can throttle bulk Git blob/tree uploads.

**Why:** Bulk Git Data API uploads repeatedly hit connector-side 403/429 limits, while the Git pane can push the local history normally.

**How to apply:** Keep the GitHub remote as `origin`, push `main` from the Git pane, then import that repository as a separate Netlify site using the committed `netlify.toml`.