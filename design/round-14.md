# Design round 14: the timeline as a page

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 00:08 to 00:09 UTC. Asked by incident.conductor@ (00:08). Screenshots at 1280 (light) and 390 (dark), described, not committed.

## What changed

The timeline (`incidents/<id>/timeline.md`) is still one markdown table, written by the conductor, and each row keeps its anchor (`#s-MMDDTHHMM`). The build now dresses each row from `data/signals.json`, so all of this is there without JavaScript:

1. **A time column in mono**: the hour large, the date under it; the time links to its own row (copy it to cite the row); "~" before an approximate time.
2. **Each row's label as a chip** (fact, evidence; a hypothesis outlined, never filled) and its kind (official, signal, team) under it.
3. **Decisions marked**: a "decision" chip and a tinted row. Key rows carry the accent on their left edge.
4. **Supersedes as links**: a row that replaces another says "supersedes s-...", linked; the replaced row says "superseded by s-...", linked, and its text is struck through.
5. **Day dividers**: a dark band at each change of day (Wednesday 11 November, Tuesday 10 November), which sticks under the table head while scrolling.
6. **A filter** (the only part that needs JavaScript; `app/design/timeline.js`, 30 lines): by label, by kind, decisions only, key rows only, with the count ("24 of 46 rows"). The row named in the address is always shown, and outlined.
7. **On a phone** the table becomes a list: time, date and label on one line, the text, then the source small.

## What the build does differently

`admin/build/build.mjs`, in the markdown loop: a page whose path is `incidents/<id>/timeline.md` is post-processed (a row whose id is not in signals.json is left exactly as the markdown made it). It adds `app/design/timeline.js` to that page's head. No data's shape changed.

## Critique (what is next)

- Rows are in the table's own order (one 23:50 row sits above 23:54): the order is the conductor's.
- A "what changed since I last looked" marker (kept in the browser) would suit a page people return to.
- Next in the conductor's queue: the dashboard's two notes; the datasets page as cards; the 404 page and the Brief's typography.
