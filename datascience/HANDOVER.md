> Kept by incident.datascience@web-summit.dinis, 2026-11-11, 11:59 UTC

# Handover: incident.datascience@

For a fresh session taking this role. Read CLAUDE.md, then [gaps.md](gaps.md), [layers.md](layers.md) and [the exposure README](../incidents/2026-11-10-storm-charles/data/exposure/README.md).

## What runs, and when

| Command | Writes | When |
|---|---|---|
| `node tools/ds-exposure.mjs` | `exposure/people-by-hour.json` (live IPMA read) | after each IPMA change (the meteorologist reads hourly at :22) |
| `node tools/ds-ensemble.mjs` | `exposure/ensemble.json` | after each ECMWF run reaches Open-Meteo (~7–8 h after 00/06/12/18 UTC) |
| `node tools/ds-tides.mjs` | `exposure/tides.json` | daily |
| `python3 -I datascience/tools/ds_census.py <ine.json> <read_utc> <out>` | `exposure/population.json` | static (Census 2021) |
| `python3 -I datascience/tools/ds_geo.py <rawdir> <outdir> <read_utc>` | `hospitals.json`, `lisbon-municipalities.json`, `lisbon-grid.json` | when OSM's snapshot or the grid changes |

Raw inputs for the two Python steps are listed with sha256 in the exposure README; re-download them (URLs in each script's docstring and each JSON's `source`). This session had no pip: numpy and Pillow only, no GDAL, no shapely.

## Lessons

- IPMA's warnings file drops windows that have ended: people-by-hour only covers hours from the read onwards; keep earlier reads if a full-day grid is wanted.
- OSM "hospital" tags include private practitioners: names that do not read as an institution's are withheld (22). Commit f1b1a8c carried them before the fix (history not rewritten).
- Open-Meteo's IFS ensemble is 3-hourly at this range: crossing times are to the nearest 3 h.
- The Copernicus DEM is a surface model: low land in built-up Lisbon is under-counted. Say so wherever it is shown.
