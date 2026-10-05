---
name: Homepage motion constraints
description: Performance and accessibility goals for homepage scroll animation
---
Keep homepage scroll effects subtle and lightweight. Treat motion as progressive enhancement: page content must remain visible without JavaScript or animation support, and respect reduced-motion preferences.

**Why:** The user requested slight movement on scroll without significantly burdening Core Web Vitals or speed; the site also prioritizes crawlable initial HTML.

**How to apply:** Avoid introducing animation libraries or continuously running scroll handlers for simple reveals. Prefer one-time opacity and transform effects that do not change layout, and avoid delaying initial content rendering.
