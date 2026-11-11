> Kept by incident.datascience@web-summit.dinis, 2026-11-11, 11:47 UTC; status updated 11:59 UTC

# The gap map: Watchfloor's decision brief against what we hold

Not a warning service: IPMA issues the warnings and ANEPC the instructions. This page is about **data we hold**, not advice.

The model: Watchfloor (Notamy Ltd)'s decision brief WF-PRT-20261110-CHARLES, edition 1, as of 07:49 UTC 11 Nov (its shape in [research/watchfloor/README.md](../research/watchfloor/README.md)). Their figures are theirs, credited, never copied: every data point below is to be **read at its own open source** by us. Where a figure of ours exists, it is in `incidents/2026-11-10-storm-charles/data/`.

Legend: **have** (we read it at the source and serve it), **partly** (some of it, or only via press), **missing**. Effort: S (under 1 h), M (1–3 h), L (a day or more). "Reach" is what this session's network did when tried at 11:45 UTC.

## 1. Every data point in the brief

| # | Data point (brief section) | We hold | Where / owner | Open source to fill it | Licence | Effort | Reach |
|---|---|---|---|---|---|---|---|
| 1 | Warning level by district and hazard, with windows (p1, p6) | **have** | `data/weather/warnings.json`, `cap.json` · meteorologist@ | IPMA open data; MeteoAlarm CAP feed | IPMA open data terms; MeteoAlarm reuse terms (credit) | – | ok |
| 2 | IPMA communiqués and their wording (p1) | **have** | `data/weather/communiques.json` · meteorologist@ | IPMA | IPMA | – | ok |
| 3 | What the authorities decided (p3) | **have** | `data/decisions/` · researcher@; timeline · conductor@ | primary pages of each body | quoted in short excerpts | – | ok |
| 4 | Storm centre's track from two model runs (p1 map) | **missing** | – · datascience@ (with meteorology@) | ECMWF open data (IFS HRES/ENS, AIFS) mean-sea-level pressure minimum per step | CC BY 4.0 | M (GRIB2 decoding without GDAL here) | data.ecmwf.int ok |
| 5 | Ensemble "crossings" and three scenarios with shares of 50 members (p1, p2) | **have (first step)**: `data/exposure/ensemble.json` | datascience@ | ECMWF ENS 50 members (open data); per-member gusts at a point via Open-Meteo's ensemble API (ecmwf_ifs025) as the cheap first step | CC BY 4.0 (ECMWF; Open-Meteo) | M | ok (both) |
| 6 | Model wind under each warning area vs the warning window (p6) | **partly** | `broadcast/data/field.json` (Open-Meteo best-match field) · broadcast@; IPMA point forecast · meteorologist@ | Open-Meteo / ECMWF ENS sampled at warning-area centroids | CC BY 4.0 | S–M | ok |
| 7 | Experimental AI forecast (WeatherNext) (p2) | **missing** | – | not open in this session; listed, not pursued | proprietary | – | – |
| 8 | Signs to watch at an IPMA station (p2) | **have** | `data/weather/stations.json`, `airport.json` (METAR gusts) · meteorologist@ | IPMA observations; METAR | IPMA; public | – | ok |
| 9 | Sources compared with confidence levels (p4) | **partly** | `data/weather/analysis.md`, `gusts-vs-forecast.json` · meteorologist@ | ours: a table across warnings × models × observations; needs #5 | ours (hypotheses labelled) | M | – |
| 10 | Madeira: zones, warnings, flights, ferries, schools (p5) | **have** (warnings, decisions) / **missing** (people) | `madeira.json`, `airport-madeira.json`, `entities/madeira.json` | + Kontur on Madeira warning areas (#11) | as #11 | S once #11 exists | ok |
| 11 | **People under each level, by district and hour** (p1, p6, p7) | **have** | `data/exposure/population.json`, `people-by-hour.json` · datascience@ (INE Census 2021 counts used for areas; Kontur for squares) | Kontur Population 2023-11-01 (H3 grid, from INE/GHSL/Meta/Microsoft) on IPMA warning areas (districts; Madeira and Azores zones) | CC BY 4.0 (Kontur via HDX) | M | ok (S3 object) |
| 12 | Aged 65+ and under 15, by district and municipality (p7) | **have** | `data/exposure/population.json` · datascience@ | INE Census 2021 (indicator API, by municipality, age groups) | INE: free reuse with credit | M | ine.pt json API ok; tabulae.ine.pt blocked |
| 13 | Lisbon metro municipalities: people, 65+, land 0.5–5 m (p7) | **have** | `data/exposure/lisbon-municipalities.json` · datascience@ | Kontur + INE + DEM (#16) on municipality boundaries | CC BY 4.0 + INE + DEM licence | M | geoBoundaries ok (ADM1); municipalities: GISCO LAU / CAOP to try |
| 14 | Lisbon sector by sector: 2 km squares, residents (p8) | **have** | `data/exposure/lisbon-grid.json` · datascience@ | Kontur aggregated to our own 2 km grid | CC BY 4.0 | S after #11 | ok |
| 15 | Public hospitals named, per square (p8) | **have** | `data/exposure/hospitals.json` (365, OSM) · datascience@; decisions in `data/decisions/entities/hospitals.json` · researcher@ | OpenStreetMap (HOT export on HDX, or healthsites.io export) | ODbL (attribution "© OpenStreetMap contributors") | S | overpass-api.de blocked; HDX/HOT S3 ok |
| 16 | **Land 0.5–5 m above sea level**, Lisbon area (p7, p8) | **have** (estimate, LOW–MEDIUM) | `data/exposure/lisbon-municipalities.json`, `lisbon-grid.json` · datascience@ | Copernicus DEM GLO-30 (COG on AWS); Mapzen/Terrarium terrain tiles as fallback | Copernicus DEM: free licence with credit "© DLR e.V. 2010–2014 and © Airbus 2014–2018, provided under COPERNICUS by the EU and ESA"; Terrarium: various open, credit | M | both ok |
| 17 | **Tides: high water times and heights**, Lisbon, Cascais, Funchal (p8) | **partly** (a model, not IH's table) | `data/exposure/tides.json` (Open-Meteo Marine) · datascience@ | Instituto Hidrográfico (hidrografico.pt, tide tables / previsão de marés) | IH terms (read, credit, no redistribution of tables beyond the day's values) | S–M | hidrografico.pt ok |
| 18 | Movement: bridges, tunnels, coaches, ferries, trains, airport (p8) | **have** | `data/transport/`, `entities/*` · transport@, researcher@ | operators' pages | short excerpts | – | ok |
| 19 | Power: customers without power (annex, p8) | **missing** | – · datascience@ to list; researcher@ for press | E-REDES outage page/API (press until then) | E-REDES terms; unknown | M | e-redes.pt redirects; to test |
| 20 | Incidents: ANEPC counts; Madeira Civil Protection (p7) | **partly** (press counts in timeline) | timeline · conductor@ | ANEPC occurrences (prociv.gov.pt open feed) | ANEPC; public | S–M | to test |
| 21 | Precedents: Leslie 2018, Elsa 2019, Kirk 2024, Martinho 2025, Kristin 2026: gusts, incidents, outages (annex) | **partly** (Kristin in warnings and timeline) | meteorologist@; → `datascience/precedents.md` | IPMA storm reports; ECMWF ERA5 (CC BY 4.0) for gusts | IPMA; CC BY 4.0 | M | to test |
| 22 | "What a forecast grid cannot show"; how the brief is made; source by topic (annex) | **partly** | REALITY.md, sources/ · sources@ | ours: `datascience/method.md` per data set | ours | S | – |
| 23 | Small multiples: map every 3 h with people under red (p6) | **missing** | → brief@ and designer@ from #11 | ours, from `people-by-hour.json` | – | M | – |
| 24 | A live version linked by QR code (p1) | **have** (the site) | conductor@, brief@ | – | – | – | – |

**Filled at 11:59 UTC** (see [the exposure data](../incidents/2026-11-10-storm-charles/data/exposure/README.md)): 11, 12, 13, 14, 15, 16; 5 as a first step (crossings along 9.5 W, not a full track); 17 from a model. **Still missing:** 4 (track maps), 19 power, 20 ANEPC counts as data, 21 precedents table, 23 small multiples (brief@ and designer@ from people-by-hour.json). How to show it: [layers.md](layers.md).

## 2. New data points we can consume (beyond the brief)

| Data point | Open source | Licence | Use case | Effort | Reach |
|---|---|---|---|---|---|
| Sea level and wave height forecast at the Tagus mouth, Cascais, Funchal | Open-Meteo Marine API (CMEMS, ECMWF WAM) | CC BY 4.0 | coastal surge against the tide (#17); "sea and tide" row of #9 | S | ok |
| Per-member gusts at Lisbon, airport, Funchal (51 ECMWF members) | Open-Meteo Ensemble API | CC BY 4.0 | the scenario shares (#5) as a first, cheap step | S | ok |
| Pharmacies, shelters, police and fire stations | OpenStreetMap (HOT export) | ODbL | sherpa@'s "where do I go" | S | ok |
| Hotels and tourist accommodation counts by square | OSM; INE accommodation statistics | ODbL; INE | visitors exposed (Web Summit's 70k), "are you in Lisbon right now?" | S | ok |
| Metro, train and ferry stops per square | OSM; operators' GTFS (Carris Metropolitana GTFS is open) | ODbL; operator terms | getting around, per square | M | to test |
| River and rain gauges (SNIRH) | APA SNIRH | public | flooding in Lisbon's low streets | M | to test |
| Built-up area / buildings by square | GHSL (JRC) built-up; OSM buildings | CC BY 4.0; ODbL | "what a grid cannot show" | M | ghsl.jrc ok-ish |
| Daytime vs night-time population | Kontur is residential only; GHSL has no daytime layer | – | a known limit, said on every exposure page | – | – |

## 3. Refused at the source, or needs a person (for the conductor)

- **overpass-api.de** (and two mirrors): refused or timed out on their side (this environment's network is unrestricted); not retried around. Worked with the HOT/HDX OSM export instead (same data, ODbL, date-stamped).
- **Instituto Hidrográfico's tide tables**: digital only, through its online shop (loja.hidrografico.pt), which needs an account; its geomar app needs a login. Not worked around: tides.json is a model until someone with an account decides.
- **tabulae.ine.pt** and **download.geofabrik.de**: refused or timed out on their side. Not needed if the INE indicator API holds.
- **WeatherNext**: not open data; not pursued.
- No key or account was used or needed for anything above.

## How each estimate is made

Each data set in `incidents/2026-11-10-storm-charles/data/exposure/` carries `method` and `confidence`. Exposure is **residents** (where people sleep), not where they are at a given hour, and never a count of people harmed. Ensemble figures are **shares of forecasts, not the chance of it happening**.
