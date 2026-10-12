---
name: Photo optimization constraints
description: Preserve supplied photos and crops when reducing mobile image payloads
---
Keep original supplied image files, branding, photo mappings and existing crops when optimizing mobile delivery. Do not replace photos or claim Core Web Vitals gains based only on smaller files.

**Why:** The user explicitly scoped mobile performance work to image weight without changing the photos; byte savings are not timing or field performance measurements.

**How to apply:** Generate smaller full-frame alternatives, let existing layout control crops, and distinguish incremental savings from any compression already present. Report measured bytes separately from device-dependent browser selection and measured performance.
