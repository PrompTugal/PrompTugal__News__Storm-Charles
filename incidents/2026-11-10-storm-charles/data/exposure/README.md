> Kept by incident.datascience@web-summit.dinis, 2026-11-11, 12:08 UTC

# Exposure: who and what lies under the storm (data)

Not a warning service: IPMA issues the warnings and ANEPC the instructions. These files say **where people live and what is there**, read at open sources, so a decision-maker can weigh IPMA's warnings against them. They are never a count of people harmed, and never a forecast of ours.

Every file carries `source`, `read_utc`, `licence`, `method`, `confidence`, `by` and `updated`. Raw downloads (Kontur grid, DEM tiles, OSM export, INE extract) stay out of git: sha256s below; copies are in the datascience vault `yiqem57n` (private; its key sealed to the conductor through the lane at 12:01 UTC; the DEM tiles are not in it: re-download them from the public Copernicus bucket and check the sha256).

| File | What | Label | Source and licence | Confidence | Refresh |
|---|---|---|---|---|---|
| [population.json](population.json) | Residents, aged 0–14 and 65+, by IPMA warning area and by municipality (308) | fact | INE Census 2021, indicator 0011609 (credit INE) | HIGH (Madeira zones MEDIUM) | static |
| [people-by-hour.json](people-by-hour.json) | Residents under red / orange / yellow, hour by hour, and hours at each level per area | arithmetic on two facts | IPMA warnings (open data) × population.json | HIGH (Madeira MEDIUM) | `node tools/ds-exposure.mjs` |
| [tides.json](tides.json) | High and low water, sea level, waves: Cascais, Tagus mouth, Funchal | evidence (a model) | Open-Meteo Marine API, CC BY 4.0. IH's official tables need an account (not read) | MEDIUM (Lisbon estuary LOW) | `node tools/ds-tides.mjs` |
| [ensemble.json](ensemble.json) | Where the storm centre crosses 9.5 W in each of 51 ECMWF ensemble forecasts (north / near / south of Lisbon), and Lisbon's model gust spread by hour | hypothesis | ECMWF IFS ENS via Open-Meteo, CC BY 4.0. **Shares of forecasts, not the chance of it happening** | MEDIUM (gusts LOW) | `node tools/ds-ensemble.mjs` |
| [hospitals.json](hospitals.json) | 365 hospitals mapped in OSM, with municipality and IPMA area | evidence | OpenStreetMap via HOT/HDX, snapshot 2026-11-03, ODbL © OpenStreetMap contributors | MEDIUM | weekly snapshot |
| [lisbon-municipalities.json](lisbon-municipalities.json) | The 18 Lisbon-metro municipalities: residents, 65+, land 0.5–5 m, residents on it, hospitals | fact + hypothesis | INE; Copernicus DEM GLO-30; Kontur (CC BY 4.0); GISCO LAU 2021 | LOW–MEDIUM | static |
| [lisbon-grid.json](lisbon-grid.json) | Lisbon in 49 squares of 2 km: residents, low land, hospitals | hypothesis | Kontur; Copernicus DEM; OSM | MEDIUM (low land LOW) | static |

Static files are made by `python3 -I datascience/tools/ds_census.py` and `python3 -I datascience/tools/ds_geo.py <rawdir> <outdir> <read_utc>` (numpy and Pillow only).

**Limits that every page using these must say:** residents are where people sleep (Census 2021; Kontur 2023), not where they are at noon, and not the ~70,000 Web Summit visitors; the DEM is a surface model, so roofs and trees hide low streets in built-up Lisbon; tide heights are above mean sea level, not IH's chart datum. Ensemble figures, when added, are **shares of forecasts, not the chance of it happening**.

Raw inputs (sha256):

- `kontur_population_PT_20231101.gpkg.gz` bef49d3be531202c252f479f332cbd2bc2dc20ee73cce62c62397a6129a1ed89
- `hotosm_prt_health_facilities_osm_geojson.zip` 86f2d41aa465ab6ef3463845c91ca01a4d007ff77cc93b1a74004f69219a8313
- INE 0011609 extract (11.6 MB JSON) 0e920fee8923511de042a3c72fa731cb2992c48538048dc07927562c2ecbadc9
- GISCO LAU 2021, Portugal subset 1c93d0e69b1eec1369d9771343201a832ffd40b7bd88be15af9cc6f1ea808769
- Copernicus DEM N38W010 5679589263f12d21ece43c475fd7fe17fb69854b41e513cb9aee25c9441d1c9f · N38W009 ea19dc693d73f638a9d50a12e108c211ea39c0be775d252b45f96dd38066ba9a · N39W010 d9eae6dfb209711e76327debb86f5f577f41a5946fb14469e8625e337e7e150b · N39W009 1d57c2d490d68ff64583b54a3297f7c0934a66908c44bfc25c9aab9576f58412
