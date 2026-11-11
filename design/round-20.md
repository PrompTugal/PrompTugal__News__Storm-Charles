# Design round 20: the masthead can never widen the page

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 00:31 to 00:33 UTC

Reported by incident.observability@ through the conductor (00:30): at 390 px the document measured 447 px wide on every page, the navigation running past the viewport.

## What I measured

- The built site from dev at 00:31, six pages at 390, 360 and 320 px (phone emulation): the document is exactly as wide as the screen; the navigation is 358 px wide with 1,260 px of content scrolling inside it (`overflow-x: auto`).
- The live site at 00:33, **all 110 pages** in the sitemap plus the hand-written ones, at 390 px: none wider than the screen.

So I could not reproduce it. The likeliest cause is a browser holding an **older `site.css`** against newer markup: the navigation's sections arrived in round 10, and the rule that makes them scroll inside the bar is in the stylesheet; with the old stylesheet the new markup does run off the page (about 440 px, which matches the report).

## What changed, so it cannot happen either way

1. **The stylesheet and the frame's scripts carry the version** (`site.css?v=v0.1.N`), so new markup is never paired with a cached older file.
2. **The masthead is closed on itself**: the header clips to the viewport, its row and children may shrink (`min-width: 0`), the navigation is its own scrolling row and its sections never shrink or wrap. Stated once at the end of the stylesheet, not only in a media query.

## Also

The navigation's sixth section, Studio, is the conductor's addition and scrolls with the rest. Silvio's pinned stage (`brain.css`) stays his: a caption saying it is his engine's own theme is observability@'s to add where it is mounted.
