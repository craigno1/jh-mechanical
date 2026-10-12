# Responsive photo delivery

Original files in `attached_assets` are retained. Photo mappings, CSS crops,
brand mark, full-size WebP files and page layouts are unchanged.

The starting code already delivered compressed WebP files. This change adds
400, 640 and 960-pixel alternatives only where the source is larger; it does
not upscale small uploads. Quality remains 88. Files preserve the complete
frame and orientation; existing `object-cover` styles control the display crop.

## Payload comparison

Exact image-body bytes (not transfer timings or Core Web Vitals):
The fallback and 400w values below were also confirmed from HTTP response
bodies through the running development preview; they match the file sizes.

| Photo | Supplied original | Existing WebP fallback | New 400w | New 640w | New 960w |
| --- | ---: | ---: | ---: | ---: | ---: |
| Homepage hero | 1,746,801 | 169,322 | 22,798 | 54,022 | 113,586 |
| Glass cleaner | 4,548,632 | 57,272 | 17,636 | 34,502 | — |
| Hand cleaner | 2,786,771 | 44,994 | 15,498 | 27,856 | — |

Against the already-optimized fallback, the hero's 400w/640w/960w options
are 86.5%/68.1%/32.9% smaller. The glass-cleaner 400w/640w options are
69.2%/39.8% smaller; the hand-cleaner options are 65.6%/38.1% smaller.
For example, a 390px-wide viewport has a 350px homepage photo slot:
its 1x resolution requirement fits 400w, while 2x fits 960w.
Actual choice depends on pixel density, cache and browser preferences.
Only the selected file downloads, not every file listed in `srcset`.

## Loading and layout

- Responsive `srcset` and layout-specific `sizes` are in initial HTML.
- Photo width/height attributes reserve intrinsic space. Existing hero aspect
  ratios and tile minimum heights remain in place.
- Heroes are eager/high priority; the server-rendered preload uses matching
  responsive sources to avoid an extra fallback request.
- Gallery, service tiles, products and the lower workshop photo are lazy-loaded
  with asynchronous decoding.

## Verification and regeneration

`pnpm --filter @workspace/jh-mechanical run optimize-images` regenerates
full-size files, smaller alternatives and the dimension/byte manifest directly
from the supplied originals. It does not modify those originals.

After building, `pnpm --filter @workspace/jh-mechanical run check-images`
checks every responsive asset's dimensions and full-frame aspect ratio, all
16 pre-rendered pages, 13 product tiles, reserved photo dimensions, loading
attributes and matching hero preloads.

Type checking and the complete static build passed. The verification build
used `URL=https://example.invalid` solely as a test origin because this
workspace had no `URL` setting; this is not a production URL or a deployment.
Production publishing still requires the existing verified-origin configuration.

Mobile and desktop previews were checked for the homepage and product layout,
plus representative service and area pages. Full-page screenshots do not scroll
the viewport, so distant lazy-loaded photos can be blank in those captures;
their assets and initial markup are checked separately.

No load-time or Core Web Vitals improvement is claimed without measurements.
