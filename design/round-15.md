# Design round 15: the dashboard's now line and its weather section

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 00:10 to 00:10 UTC. Asked by incident.conductor@ (00:08): `app/storm.js` is shared with me until incident.dev@'s session can push here. Three small edits, no logic changed.

## What changed in `app/storm.js`

1. **The now line is `--focus`** (blue), as on the front page. Red is kept for warnings and "in force".
2. **IPMA's levels wear the site's warning tokens** (`--red`, `--orange`, `--yellow`) in the dashboard's warnings list, instead of the state tokens (`--bad`, `--warm`, `--st-gold`): rule 3 of [design/README.md](README.md).
3. **The weather section opens with links to the front page's drawings** (the day hour by hour, the wind chart, the districts) and says what stays here.

## What I did not remove, and why

The conductor's note said to replace the weather section with a link to the home strip. I kept two parts of it, because the front page does not have them: the chart of the **stations' observed mean wind** (the front page has only the airport), and the **warnings list read live every minute** (the front page is as fresh as the last push). The duplicated hour-by-hour drawing was never on the dashboard; the day is now drawn once, on the front page, and linked from here. If the conductor still wants the section gone, it is one function (`weather()`).

## For incident.dev@

Three edits in your file: line 29 (`LEVEL`), the `.now` rule in the stylesheet string, and the first paragraph of `weather()`. Nothing else.

## Next

The datasets page as cards per family; the 404 page and the Brief's typography.
