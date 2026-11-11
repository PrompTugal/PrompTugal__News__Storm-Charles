# Round 65: the flights map, planned

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 22:03 UTC

Dinis, ~22:00 UTC (BRIEF.md, last section): "the planes in the map intersected with the wind ... on top of that". incident.flights@ (new) builds the data in `incidents/2026-11-10-storm-charles/data/flights/` and owns the page (`flights/`); the designer builds the app in `app/design/flightmap/`, mounted by the page's front matter (as the exposure chart, round 64). Planned now; built when the first files land.

## The page, top to bottom

1. **The headline**: a decision or fact from its source (ANA's cancellations, IPMA's warning for Lisbon), with the time read. Not a warning service; the frame's line stays.
2. **The map** (SVG, no tile server, no outside request): Natural Earth 1:10m coastline clipped to 10.0–8.5 W, 38.3–39.3 N (`app/design/flightmap/coast.json`, 157 points, public domain, source sha256 in the file); the runways of Lisbon (LPPT) drawn from their thresholds; a 10 km scale bar and north.
   - **Wind**: one arrow per lattice point, pointing where the wind goes, length by speed, a barb or the speed in kt beside it at the airport; `--ink-2` (a model, not an observation; never IPMA's colours). The forecast hour shown in words.
   - **Aircraft**: a small plane mark rotated to its track, `--ink`; the one picked in `--link` with its callsign, altitude, ground speed and the snapshot time in the panel ("This item"). Airline flights only; no registration of a private aircraft is ever drawn.
3. **The time control** under the map: a range over the snapshots (every 10 min), play and pause, the time in UTC mono; the wind follows the hour at or before the snapshot. Keyboard: arrows step one snapshot. The URL keeps the time (`#t=2026-11-11T22:10Z`).
4. **Crosswind by runway, hour by hour** (beside the map from 1100 px, under it on a phone): one line per runway end, crosswind in kt; gusts dashed; `--ink` and `--ink-2`, the now line `--focus`. A reference line only if the source gives it, labelled as the source says; no limit of our own.
5. **Departures and ANA's cancellations by hour**: bars in neutral tokens on the same hours, the source and time under each.
6. **The table twin** of each chart, and the sources: Open-Meteo (CC BY 4.0), the aircraft source and its licence, ANA, Natural Earth.

## What the app needs from the data (sent to incident.flights@)

- `index.json`: `{ snapshots: [{ t, file }], wind_hours: [{ t, file }], runways: file, crosswind: file, movements: file }`; each file ≤ 256 KB (the gate).
- a snapshot: `{ t, source, licence, aircraft: [{ id, callsign, lat, lon, track_deg, alt_ft, gs_kt, on_ground }] }`.
- a wind hour: `{ t, model, source, licence, points: [{ lat, lon, dir_from_deg, speed_kt, gust_kt }] }`.
- `runways.json`: `[{ id: "03/21", ends: [{ name: "03", lat, lon, heading_deg }, …] }]`.
- `crosswind.json`: `{ hours: [{ t, by_runway_end: { "03": { cross_kt, head_kt, gust_cross_kt } } }] }`.
- `movements.json`: `{ hours: [{ t, departures, cancellations }], sources }`.
- every file: `by`, `updated`, `source`, `read_utc`, `label` (fact / evidence / hypothesis), `method`.

## Checks before it is shown

390 and 1280 px; no overflow; 0 text under 11 px; 0 contrast failures in the five themes; the map readable in print (marks black, no animation); an aircraft mark at the right place for one known flight; play does not run when the reader prefers reduced motion.
