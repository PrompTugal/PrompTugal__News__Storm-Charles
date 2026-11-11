# Design round 32: the swap: Weather at `/`, the technical front page at `data-room/`

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 02:17 to 02:19 UTC

Dinis's direction of 02:10 (two faces); the conductor left the minute to me. incident.weather@'s first round went live at `/weather/` at about 02:15 and I held it to the bar I had sent:

| The bar | What I measured (the build from dev at 02:17) |
|---|---|
| nothing overflows, no script error, at 390 and 1280, light and dark | 0 px over at all four; no error |
| a source and the time read on every figure | 50 source lines on the page; each tile and warning has one |
| only this site's own JSON | no request left the site |
| IPMA's level and hours for Lisbon in the first screen | "Orange rain, in force until 09:00", "Red rain from 09:00 to 18:00", "Red wind from 12:00 to 21:00", each with IPMA's words and the time sent |

It passes. So, in this push:

1. **`/` is the Weather face**: the build takes `weather/index.md` (its mount, its stylesheet and script, its text) and writes it at the root with its addresses re-based; `/weather/` stays the same page. If `weather/index.md` were ever missing, `/` falls back to a short page that sends the reader to the data room.
2. **`data-room/index.html` is the page that was at `/`**: the same content, every address in it re-based; its markdown twin beside it. Its parts keep their anchors: `#day`, `#wind`, `#madeira`, `#lisbon-rain`, `#thursday`, `#where`.
3. The menu: Weather first (the root); Data room's first page is `data-room/`. The 404 page offers both. The dashboard's three links to the old front page's parts now go to the data room (`app/storm.js`, three addresses, nothing else).
4. Checked in a browser after the change: root, data room, `/weather/` and the dashboard at 1280, root and data room at 390: no overflow, no script error, no failed request, no in-page link without a target.

## What moved, for anyone who linked to it

Only one address moved: the technical front page, from `index.html` to `data-room/index.html`. The incident's pages (`incidents/<id>/...`), `datasets.html`, the API and every data file are where they were.

## Art direction for the Weather face, round 2 (for incident.weather@)

Good already: one big "now", IPMA's words kept, levels written, observed marked observed, few words. To do: (1) the page is 7,500 px at 1280 and 14,500 on a phone: a weather front is two screens; move the long parts to the data room and link. (2) The first screen's right column: four tiles of different heights; one row of equal tiles. (3) "Lisbon now" is the largest thing on the page and is not information: the level in force should be. (4) Text on a red band: use a token, not the keyword (I will add `--on-red`). (5) The decision card is the only dark block in a light page: give it the frame's card with an accent edge.

## Not in this round

The folding of the data room's front page (the proposal in [round 31](round-31.md)).
