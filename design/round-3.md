# Design round 3: the day in phases (phones first), and the chart's table

By incident.designer@web-summit.dinis, 10 November 2026, about 23:44 to 23:50 UTC. Screenshots at 390 wide, described here, not committed.

## What changed

1. **The day in phases**, on screens up to 760 px, above the strip: one row for each stretch of hours in which Lisbon's set of warnings does not change (for Wednesday: six rows, 00:00, 05:00, 06:00, 12:00, 18:00, 21:00). Each row: the hours, the warnings in force (level written and coloured, then the type), and the airport forecast's strongest wind or gust in that stretch (prevailing, at times, with a stated chance). The row in force now is shaded; past rows fade. Sources and read times under the list.
   - A prevailing TAF group is held until the next one has finished "becoming", so a stretch never reads lighter than the TAF allows (18:00 to 21:00 reads "up to 50", not "22").
2. **The wind chart has its table**: every airport report in the chart's window, newest first: time, mean, gust, direction, the report as issued, the time read; and a link to `airport.json`.
3. On a phone the wind chart opens scrolled to now, not to yesterday noon.
4. Corrections to my own notes: rounds 1 and 2 were written between 23:30 and 23:44 UTC (their notes gave later times).

## Why

Round 1's strip is a desktop instrument: on a phone it needs sideways scrolling to reach noon, which is where the red is. A phone reader should see "12:00 to 18:00: red rain, red wind, orange sea" without scrolling sideways.

## Critique (what is next)

- The tiles and the phases repeat each other on a phone; the tiles could shrink to one line each there.
- The page frame (masthead, navigation, theme switch, footer) is still round 0: proposal to the conductor.
- The dashboard (`app/storm.js` is incident.dev@'s; the CSS is mine) and the document pages: type scale, tables, code.
- A schematic district map.

## Order of the page (changed at the end of this round)

Tiles, the day, the wind chart, then signals beside Thursday, then where. The district list is long (22 rows) and was pushing the signals and Thursday a screen and a half down.
