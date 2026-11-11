# Round 64: residents by hour, the chart part

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 18:13 UTC

The conductor (18:12): incident.datascience@ rebuilds `people-by-hour.json`; the designer draws the chart from [round 60](round-60.md)'s parts. It is a frame part, so any page can carry it:

```html
<div data-hours-chart="../incidents/2026-11-10-storm-charles/data/exposure/people-by-hour.json"></div>
```

`app/design/frame.js` loads `app/design/hours.js` only on a page that has one. What it draws, from the file alone:

1. **The headline**: one sentence, one number, from `peak` ("About 0.5 million residents live in areas under IPMA red at 15:00 UTC, the worst hour in this read"); orange if no red; a plain line if neither.
2. **The legend**: the three levels by name, in stack order.
3. **The bars**: one per UTC hour, red at the base, then orange, then yellow (`rect.lv-*`, the only coloured marks); counts and axis in `text.count` (`--ink-2`); each segment has a title with the exact count. 760 px wide at least, so on a phone it scrolls sideways inside `.wx-scroll` while the page does not.
4. **What it is not**: residents where they sleep (Census 2021), not people at risk, not visitors; hours start at the read.
5. **`.prov`**: IPMA's warnings (linked) read at `read_utc` × INE Census 2021; the maker; then `.conf` from the file's `confidence` (high for the mainland, medium for Madeira).
6. **The table twin**: hour, red, orange, yellow, folded.

Measured on a throwaway copy in `_site` (not in git), the 15:52 read: 27 hours; 390 px: 585 px tall, the scroll 760 in 358, no page overflow; 1280 px: 560 px tall, no scroll; paper and azulejo use their own IPMA colours; no script errors. Waiting for datascience's host page to mount it there.

## Mounted (19:14)

The conductor (19:12): mount it in the data room, on the exposure page, now, on the current file. Prepared through the page's front matter (`mount:`, the frame's contract; the markdown body strips raw HTML), in `incidents/2026-11-10-storm-charles/data/exposure/README.md` (incident.datascience@'s file; nothing else on it changed). A line above the chart says it shows the 15:52 UTC read and that the hours before 15:00 are being rebuilt. The part's own note now reads "hours before the read may be missing: a missing hour is not zero" (the file holds 12:00 to 02:00). **Not pushed: the policy gate refuses it (the file is incident.datascience@'s); the three lines below are with the owner and the conductor.** Measured on a local build: under the title at 667 px on a phone (511 at 1280), 599 px tall, scroll 760 in 324, no page overflow; 0 contrast failures in all five themes.

The three lines to put at the top of `data/exposure/README.md` (front matter; nothing else changes):

```
---
title: "Exposure: who and what lies under the storm (data)"
mount: <section class="card hc-card"><h2>Residents under each level, hour by hour</h2><div data-hours-chart="people-by-hour.json"></div></section>
---
```

**20:10:** datascience's 19:32 read landed (170076e, the stale red removed); the lines above are the version without the 15:52 note, since the chart now carries the file's own read time. With no orange or red in a read, the headline gives the yellow figure ("at most about 0.3 million residents … under yellow").

**21:13: live.** The conductor added the mount (060fa06). Measured on a local build of that commit (page views count the live host): the chart sits under the title at 494 px on a phone (450 at 1280), 599 px tall, its 10 hours scroll 760 in 324 at 390, no page overflow, 0 contrast failures in all five themes. One fix of mine: the 20:52 read's worst hour (19:00) is before the read, and the headline said "live in"; it now says "About 3.8 million residents were in areas under IPMA orange at 19:00 UTC, the worst hour in the file (read 20:52 UTC)", and "live in … this read" when the hour is still to come.
