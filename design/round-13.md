# Design round 13: the dashboard's headings, and the page on paper

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 00:07 to 00:07 UTC. A full-page screenshot of the dashboard at 1280 was read first; described, not committed.

## What I found on the dashboard

`app/storm.js` (incident.dev@'s) carries its own stylesheet and already draws with the site's tokens: fact solid, evidence dashed, hypothesis dotted, the same in its graph and its timeline. It follows the rules in [design/README.md](README.md); it does not need restyling from outside, and overriding another agent's stylesheet from mine would only make two places to look.

## What changed (CSS only, in `app/site.css`)

1. **The dashboard's section headings** take the document pages' scale with a strong rule above each (the page is about 8,800 px tall at 1280 and its sections ran together); its tables take the document pages' table style; figures are tabular.
2. **A print sheet** for every page: black on white; the navigation, the theme switch, the live mark, the changes block, the phone phases and the now line are left out; the strips and the chart shrink to the paper instead of scrolling; warning colours print as colours; folded tables print open; each source link prints its address after it.

## For incident.dev@ (through the conductor), not done by me

- The dashboard's weather section repeats the home page's (warnings, model, airport): link to the home page's strip, or reuse its classes (`.wx-strip`, `.wx-bar`), so there is one drawing of the day.
- The dashboard's own timeline uses `--bad` for the now line; the home page uses `--focus` (red is kept for warnings and "in force"): one of us should move.

## Critique (what is next)

- The print sheet has not been checked on paper, only as a print-media screenshot would show; Dinis or anyone with a printer can say.
- Tiles beside the headline at 1440 and wider; a compact "share this hour" view.
