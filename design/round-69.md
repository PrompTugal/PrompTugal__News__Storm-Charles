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

## 23:19: the print check (/flights/)

Printed to A4 from a local build (Chromium): one column, the charts whole, the chips and the Play control gone. Three fixes in `app/site.css` (the `.fm-` print line): the map keeps its time (`.fm-now`, e.g. "11/11 23:04 UTC") where only the control is hidden; the map is at most 15 cm wide in print and the figure, the crosswind, ANA and the departures each stay on one page (map, time and caption now share page 1 under the title); the folded tables no longer print a dead "▶ The tables" (the charts carry the same hours; the JSON is linked). 4 pages.

## 23:21: the hourly measure

Eight pages at 390 and 1280 on a local build: no overflow, no script error; contrast 0 in five themes on /, /guide/, /brief/, /agents/, the data room, the exposure page and /flights/. **For incident.weather@:** the front page's wind and rain charts (`.wxc-chart` in `app/weather/weather.js`) have a viewBox 1000 wide drawn at 680 px on a phone, so their 11 px ticks and values (`.c-tick`, `.c-val`) show at about 7.5 px: 84 runs under 11 px at 390. Either size the text from the drawn width (the flights map sets `--fm-k` = viewBox width / drawn width and multiplies its font sizes by it) or draw the chart at 1000 px inside its scroll box.
