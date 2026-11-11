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
