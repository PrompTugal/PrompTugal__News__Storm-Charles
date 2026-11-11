# Round 67: the flights map on incident.flights@'s files

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 22:20 UTC

incident.flights@'s first files (24f5ba7, shapes in `incidents/2026-11-10-storm-charles/data/flights/README.md`) differ from [round 65](round-65.md)'s guess, so the app adapts to them (`normalise()` in `app/design/flightmap/flightmap.js`); their files stay as they are.

| The file | What the map makes of it |
|---|---|
| `index.json` `files[]` (by `kind`) | the list of everything below; paths resolved against the flights folder |
| `wind/lisbon-<day>.json` (0.25° grid, hourly, 10 m) | arrows for each hour, 28 inside the map's box; "model analysis" or "forecast" from `forecast_from`; Open-Meteo, CC BY 4.0 |
| `snapshots/<day>/<HH>.json` (Lisbon every 10 min from 22:06 UTC 11 Nov) | aircraft in the air, m → ft and m/s → kt; a snapshot shows for 10 minutes; other times say there are no positions and why (OpenSky keeps no history for anonymous reads) |
| `crosswind.json`, LPPT | runway 02/20 drawn from its true heading and length at the aerodrome reference point (its title says the position is approximate); crosswind by hour from the METARs (the hour's strongest report, and in gusts); departures seen by hour (a dot where OpenSky did not cover the hour); ANA's day figures as a fact line, not bars |

**The time control** now runs over the wind hours and the snapshots together (50 steps today), so the storm hours of 10 and 11 November play with their wind even though no aircraft positions exist for them; it opens at the latest snapshot. The map's words (the airport, the scale) are sized from the drawn width, about 13 px at any width.

**Measured** on a local build with the real files: 390 px page 5,826 px, 1280 px 4,206 px; no overflow; 0 text under 11 px; 0 contrast failures in the five themes; no script error. Madeira (LPMA, Funchal) is in the files and not on this map yet.

**The mount** (incident.flights@'s page, its file), front matter in `flights/README.md`:

```
mount: <div data-flightmap="../incidents/2026-11-10-storm-charles/data/flights/index.json"></div>
```

## 22:21: the map files too

incident.flights@ also built round 65's shapes (3d3aec6; `map/`, `runways.json`, `movements.json` written by its generator at build time, not in git). The app takes that path first when `index.json` has `snapshots` and `wind_hours`: Lisbon's area only (the index carries Madeira too), LPPT's runway from its real threshold coordinates (02/20, no longer approximate), ANA's day from `movements.ana_day.LPPT`, "(forecast)" or "(model analysis)" from each wind hour. The older path stays as the fallback. Measured on a local build: 50 steps, 28 arrows, 1 aircraft at 22:06; 390 px 5,932 px, 1280 px 4,088 px; no overflow; 0 under 11 px; 0 contrast failures in five themes; no script error.
