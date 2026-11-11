# Flights and the wind: the data

> Kept by incident.flights@web-summit.dinis, 11 November 2026, 22:11 UTC

Flights on the map with the wind on top, as JSON that can be replayed (Dinis, ~22:00 UTC on 11 November, [BRIEF.md](../../../../BRIEF.md)). This folder holds the data; incident.designer@ draws the map. Every file is served at its path and at `api/v1/2026-11-10-storm-charles/flights/<file>`. The list, with sizes and sha256: [index.json](index.json). Kept by [incident.flights@](../../../../agents/flights/README.md).

**Not a warning service.** No forecast or advice of ours. Your airline decides whether your flight runs: its site or app has the latest. For warnings follow IPMA and ANEPC.

## The files

| File | Label | What | Shape |
|---|---|---|---|
| [crosswind.json](crosswind.json) | fact (one hypothesis, labelled) | LPPT and LPMA, every METAR from 10 November 18:00 UTC, grouped by hour: wind direction, speed, gust; on each runway end the headwind (negative: tailwind) and crosswind and its side, for the mean wind and the gust; `departures_seen` that hour (OpenSky, a floor; null where not covered); ANA's figures for the day | `airports[].runways[]`, `airports[].hours[] = {hour, departures_seen, max_gust_or_wind_kt, max_crosswind_kt, metars[] = {time, raw, wind_dir, wind_kt, gust_kt, runways: {<end>: {headwind_kt, crosswind_kt, crosswind_from, gust_headwind_kt, gust_crosswind_kt}}, favoured_end}}` |
| `wind/<area>-<date>.json` (lisbon, madeira; 10, 11, 12 November) | evidence (model data) | Open-Meteo's hourly wind on a 0.25° lattice: 10 m speed, direction, gusts; 850 hPa speed and direction. Lisbon 37.5–40 N, 10.5–8 W (121 points); Madeira 32.5–33.25 N, 17.5–16.25 W (24 points); 10 November 12:00 to 12 November 12:00 UTC | `grid.lat[]`, `grid.lon[]` (point k = lat[k ÷ lon.length], lon[k mod lon.length]); `times[]`; `levels['10m'].speed_kt[hour][point]`, `.dir_deg`, `.gust_kt`; `levels['850hPa'].speed_kt`, `.dir_deg`; `forecast_from` |
| `snapshots/<date>/<HH>.json` | fact | Airline aircraft in a box around Lisbon (38.3–39.2 N, 9.8–8.6 W, every 10 minutes) and Madeira (32.4–33.2 N, 17.4–16.2 W, every 20 minutes), from 11 November about 22:00 UTC | `snapshots[] = {area, time, request, aircraft[] = {callsign, airline, lat, lon, baro_alt_m, geo_alt_m, on_ground, ground_speed_ms, track_deg, vertical_rate_ms, time_position}, other_aircraft_dropped}`; `airlines` names each code |

Directions are degrees true, the direction the wind blows **from** (draw an arrow pointing to direction + 180°). Speeds in knots (1 kt = 1.852 km/h) except aircraft ground speed and vertical rate, in metres per second as OpenSky gives them.

## What is and is not here

- **Airline flights only.** An aircraft is kept only when its callsign is an airline's ICAO code (the list in `tools/flights-common.mjs`, shared with incident.transport@) plus a flight number. Every other aircraft (private, business, general aviation, state, unknown) is dropped: never kept, only counted as one number per snapshot. No ICAO24 transponder address is in any published file.
- **The storm's peak cannot be replayed from positions.** OpenSky gives no history to anonymous readers ("You cannot access historical flights"); an account would, and that is a key for Dinis (listed in [transport/sources.md](../../../../transport/sources.md)). The snapshots start on 11 November at about 22:00 UTC, after the peak. For the storm itself, `crosswind.json` joins the measured wind to the departures OpenSky counted.
- **Failed reads are kept, not hidden.** OpenSky often answers 503 (an upstream timeout); each snapshot records its failed attempts, and a snapshot that failed three times has no aircraft and `time: null`.
- **The wind field is a model's**, not measured: what was measured is the METAR in `crosswind.json`.

## Provenance

Every file carries the request it came from: URL (never a credential), HTTP status, bytes, sha256 of the raw response, the time read and the response time. The raw responses are kept outside git, in the flights vault (`raw` names the file); git keeps the sha256. Files of other agents that `crosswind.json` reads are listed with their path and sha256.

## Sources and licences

- The OpenSky Network, https://opensky-network.org. Cite: M. Schäfer, M. Strohmeier, V. Lenders, I. Martinovic, M. Wilhelm, "Bringing Up OpenSky: A Large-scale ADS-B Sensor Network for Research", IPSN 2014. "For research and non-commercial purposes"; the full terms page is still for a person to read.
- Weather data by [Open-Meteo.com](https://open-meteo.com), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
- METAR: IPMA's observations through the US NOAA Aviation Weather Center (aviationweather.gov), public domain.
- Runway headings: [OurAirports](https://ourairports.com/data/), public domain (LPPT 02/20: 22° and 202° true; LPMA 05/23: 44.7° and 224.7° true).
- ANA Aeroportos de Portugal's newsroom: its figures only, with the link (its terms).
