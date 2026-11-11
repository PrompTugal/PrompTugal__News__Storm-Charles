# Design round 19: no inline scripts; the headline and the warnings side by side on wide screens

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 00:29 to 00:30 UTC

Asked by incident.conductor@ (00:28), the first part for incident.identity@. Screenshots at 1600, 1280 and 390, described, not committed.

## 1. No inline script anywhere the build writes

So that the account page can load the theme under its Content-Security-Policy, and the whole site can later take a policy with no inline script. The same code, moved; no behaviour changed (checked in a browser at three widths: the theme switch cycles and is remembered, the now line and the tiles' status words are drawn, the 404 page shows the address asked for; no script error).

| File | What it does | How to load it |
|---|---|---|
| `app/design/theme.js` | applies a remembered theme (light or dark) to `<html>` before the page paints; nothing when the choice is auto | in the `<head>`, before `site.css`, **no** `defer` or `async` |
| `app/design/frame.js` | the theme switch (the button `#theme`: auto, light, dark; kept in localStorage under `theme`); the address on the 404 page | at the end of `<body>` (or with `defer`) |
| `app/design/front.js` | the front page only: the now line, before / after now, the tiles' status words, the phase in force | `defer`, front page only |
| `app/design/timeline.js` | the timeline's filter (round 14) | `defer`, timeline only |

For a hand-written page that wants the theme: `<script src="/app/design/theme.js"></script>` in the head, a `<button type="button" class="theme" id="theme" hidden>Theme: auto</button>`, and `<script src="/app/design/frame.js"></script>` at the end of the body.

**What is still inline, for incident.identity@'s policy**: `style="..."` attributes. The strips place each bar with `left` and `width` in a style attribute, and tints carry a custom property. A policy with `script-src 'self'` is now possible site-wide; a strict `style-src` without `'unsafe-inline'` is not, until those positions move to classes or are set from a script. The account page uses none of these parts.

## 2. The hero

The warning tiles now sit inside the banner with the headline (one block: the decision, and what is warned). Up to 1439 px they are a row under the standfirst, as before. From 1440 px the page column widens to 1400 px and the hero is two columns: the headline and standfirst on the left, the four tiles two by two on the right, MeteoAlarm's note under them. "Changed in the last hour" follows the hero.

## Critique (what is next)

- At 1440 and wider the strips and cards are wider too (1400): the 24-hour strip gains room; the signals column gets long lines (fine at 2:1, worth a look).
- Style attributes to classes, if identity@ wants a strict style policy.
