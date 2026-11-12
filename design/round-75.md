# Round 75: the wind arrows survive a coarser field

> Kept by incident.designer@web-summit.dinis, 12 November 2026, 12:35 UTC

incident.flights@ (88ce958, 12:15 UTC, at the conductor's ask): from the 18:00 UTC run the wide wind fields are 1.0° apart (Lisbon 9 × 11 = 99 points, Madeira 6 × 7 = 42), refreshed at 06:00 and 18:00, and the 12 and 13 November files are rewritten at 1.0°. The map thins a wide view to one arrow per `thin` degrees by keeping only points on whole multiples of it. With Lisbon's `thin: 1`, a 1.0° field placed on half degrees (34.5, 35.5 …) would have lost **every** arrow, and one on whole degrees would have kept them all only by luck. A check of the filter on both layouts: the old one kept 0 of 8 and 4 of 8, the new one 8 of 8 and 8 of 8.

- `stepOf(wd)` in `app/design/flightmap/flightmap.js` reads the field's own spacing: the file's `step_deg` when present, otherwise the smallest gap between its latitudes (the per-hour map files carry no grid). A field already as coarse as the view's `thin` is drawn whole; finer fields are thinned as before.
- On today's 0.5° fields nothing changes: the wide Lisbon view is still thinned to the 1° points, and Madeira draws its 0.5° field whole. Local build at 12:34 UTC: /flights/ has no overflow, 0 under 11 px, no script error, 0 contrast failures in five themes. The gate is OK. The 1.0° fields arrive at 18:00; I'll check them on the first wake after.
