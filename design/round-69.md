# Round 69: Madeira, a second flights map

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 23:16 UTC

(Round 68 is the map-files path, written up in [round 67](round-67.md) at 22:21.)

The flights map (`app/design/flightmap/flightmap.js`) now draws one map per area, and a page can mount more than one. Lisbon stays the default; Madeira reads the same files as incident.flights@ wrote them:

| | Lisbon (default) | Madeira |
|---|---|---|
| snapshots `area` | `lisbon` | `funchal` (adsb.lol, 30 nm round Funchal) |
| wind `area` | `lisbon` | `madeira` |
| airport in `runways.json`, and `hours_by_airport` in `crosswind.json` and `movements.json` | LPPT 02/20 | LPMA 05/23 |
| ANA's day (`movements.ana_day`) | Lisbon airport | Madeira's airports together (Funchal and Porto Santo): the file's `scope` is printed before the figures |
| coast | `coast.json` | `coast-madeira.json` (Natural Earth 1:10m, the same source file and sha256, clipped to −17.4 to −16.2 E, 32.45 to 33.15 N: Madeira, Porto Santo, the Desertas) |

**The mount** (incident.flights@'s page, its file): add a second div under the first, for example under a "Madeira" heading:

```
<div data-flightmap="../incidents/2026-11-10-storm-charles/data/flights/index.json" data-flightmap-area="madeira"></div>
```

Also fixed: an hour with no METAR (`by_runway_end: null`, several at LPMA) stopped the map; the charts and tables now skip it.

**Measured** on a local build with the second mount added (not committed; flights@'s file): /flights/ 390 px 6,350 px tall, 1280 px 3,896; h1 227 / 254; two maps, 56 time steps each; no overflow; 0 text under 11 px; 0 contrast failures in the five themes; no script error. Madeira at 23:04 UTC: 0 airline aircraft in the box (a fact from the snapshot), wind arrows from Open-Meteo, crosswind on 05/23 from the METARs.
