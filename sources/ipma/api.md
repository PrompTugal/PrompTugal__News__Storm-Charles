---
title: IPMA's API, mapped
summary: Every data set IPMA documents at api.ipma.pt and every file its directory lists: the address, the format, the fields with meaning and unit, how often it changes, and what we read.
mount: <div class="ipma" data-view="api" data-base="./"><p class="meta">This view is drawn in the browser from the JSON files linked below. Without JavaScript, read the tables on this page.</p></div>
head: <link rel="stylesheet" href="../../app/sources/ipma/ipma.css"><script src="../../app/sources/ipma/ipma.js" defer></script>
---
# IPMA's API, mapped

> Kept by incident.ipma@web-summit.dinis, 11 November 2026, 02:34 UTC

[IPMA's open data](index.md) · [Warnings over time](warnings.md) · [Stations](stations.md) · [The sea](sea.md) · [Cities: forecast and observed](cities.md) · [The API, mapped](api.md) · [Browse the files](data.md) · [Licence and terms](licence.md)

IPMA's documentation is one page, in Portuguese: [api.ipma.pt](https://api.ipma.pt/) (read 2026-11-11 02:12 UTC). No key, no registration; the responses allow any origin. On times IPMA says: "As previsões são apresentadas em horas UTC. No continente e na Região Autónoma da Madeira a hora legal é igual à UTC, no horário de inverno." No time in any response carries a zone, except the climate CSVs (+00:00). No-data value: -99.0 (stated for the observations).

### Warnings

| Data set | Format | Files read | Bytes | IPMA's file dated (UTC) | We read it (UTC) | IPMA says it updates |
|---|---|---|---|---|---|---|
| [Weather warnings, up to 3 days](endpoints/warnings.md) | JSON | 1 | 51516 | 2026-11-11 01:15 | 2026-11-11 02:19 | not stated |

### Forecasts

| Data set | Format | Files read | Bytes | IPMA's file dated (UTC) | We read it (UTC) | IPMA says it updates |
|---|---|---|---|---|---|---|
| [Daily forecast up to 5 days, by place](endpoints/city-daily.md) | JSON | 35 | 41490 | 2026-11-11 01:31 | 2026-11-11 02:19 | taxa de atualização horária; the model runs twice a day: "a corrida das 00UTC (disponibilizada em regra a partir das 10:00) e das 12UTC (disponibilizada em regra a partir das 20:00)" |
| [Daily forecast up to 3 days, all places for one day](endpoints/day-forecast.md) | JSON | 3 | 20606 | 2026-11-11 01:31 | 2026-11-11 02:21 | taxa de atualização horária |
| [Ultraviolet index forecast](endpoints/uv.md) | JSON | 1 | 16080 | 2026-11-11 01:00 | 2026-11-11 02:21 | not stated |
| [Fire risk forecast up to 3 days, by municipality](endpoints/fire-risk.md) | JSON | 3 | 72906 | 2026-11-11 00:05 | 2026-11-11 02:21 | taxa de atualização horária |

### The sea

| Data set | Format | Files read | Bytes | IPMA's file dated (UTC) | We read it (UTC) | IPMA says it updates |
|---|---|---|---|---|---|---|
| [Sea state forecast up to 3 days, by day](endpoints/sea-forecast.md) | JSON | 3 | 9824 | 2026-11-11 01:31 | 2026-11-11 02:21 | taxa de atualização horária |
| [Shellfish harvesting bans by production zone](endpoints/bivalves.md) | GeoJSON | 1 | 3411715 | 2026-11-09 16:20 | 2026-11-11 02:22 | not stated (the latest bulletin) |

### Observations

| Data set | Format | Files read | Bytes | IPMA's file dated (UTC) | We read it (UTC) | IPMA says it updates |
|---|---|---|---|---|---|---|
| [Station observations, hourly, last 24 hours](endpoints/observations.md) | JSON | 1 | 1072647 | 2026-11-11 01:35 | 2026-11-11 02:22 | Taxa de atualização horária. |
| [Station observations, last 3 hours, with coordinates](endpoints/obs-surface.md) | GeoJSON | 1 | 440787 | 2026-11-11 01:31 | 2026-11-11 02:22 | Taxa de atualização horária. |

### Earthquakes

| Data set | Format | Files read | Bytes | IPMA's file dated (UTC) | We read it (UTC) | IPMA says it updates |
|---|---|---|---|---|---|---|
| [Seismic events, last 30 days](endpoints/seismic.md) | JSON | 2 | 146028 | 2026-11-11 01:36 | 2026-11-11 02:22 | Atualização é horária. |

### Climate, by municipality

| Data set | Format | Files read | Bytes | IPMA's file dated (UTC) | We read it (UTC) | IPMA says it updates |
|---|---|---|---|---|---|---|
| [Daily precipitation by municipality](endpoints/climate-precipitation.md) | CSV | 1 | 632591 | 2026-11-10 03:10 | 2026-11-11 02:22 | Taxa de atualização diária. |
| [Daily air temperature by municipality](endpoints/climate-temperature.md) | CSV | 1 | 894755 | 2026-11-10 03:10 | 2026-11-11 02:22 | Taxa de atualização diária. |
| [Daily reference evapotranspiration by municipality](endpoints/climate-evapotranspiration.md) | CSV | 1 (1 not 200) | · | · | 2026-11-11 02:22 | Taxa de atualização diária. |
| [Daily reference evapotranspiration by municipality (the address IPMA's directory lists)](endpoints/climate-evapotranspiration-listed.md) | ZIP of SVG | · | · | · | · | not stated |

### Id tables and files

| Data set | Format | Files read | Bytes | IPMA's file dated (UTC) | We read it (UTC) | IPMA says it updates |
|---|---|---|---|---|---|---|
| [Places: district capitals and islands](endpoints/places.md) | JSON | 1 | 10071 | 2021-12-07 14:48 | 2026-11-11 02:19 | not stated |
| [Coastal places](endpoints/sea-places.md) | JSON | 1 | 2268 | 2020-02-04 12:21 | 2026-11-11 02:19 | not stated |
| [Weather stations](endpoints/stations.md) | JSON | 1 | 49864 | 2026-11-11 01:35 | 2026-11-11 02:19 | not stated |
| [Weather types](endpoints/weather-types.md) | JSON | 1 | 4954 | 2024-06-07 09:55 | 2026-11-11 02:19 | not stated |
| [Wind strength classes](endpoints/wind-classes.md) | JSON | 1 | 644 | 2018-01-18 17:50 | 2026-11-11 02:19 | not stated |
| [Precipitation intensity classes](endpoints/precipitation-classes.md) | JSON | 1 | 578 | 2019-11-06 17:27 | 2026-11-11 02:19 | not stated |
| [Weather symbols (SVG, zipped)](endpoints/icons.md) | ZIP of SVG | 1 | 179447 | 2022-05-12 11:47 | 2026-11-11 02:19 | not stated |

### Listed, not documented

| Data set | Format | Files read | Bytes | IPMA's file dated (UTC) | We read it (UTC) | IPMA says it updates |
|---|---|---|---|---|---|---|
| [Climate series by district: reference evapotranspiration](endpoints/climate-evapotranspiration-districts.md) | a folder per mainland district, files per municipality | · | · | · | · | not documented |
| [Climate series by district: a drought index (the folder is named mpdsi)](endpoints/climate-mpdsi-districts.md) | a folder per mainland district, files per municipality | · | · | · | · | not documented |
| [Climate series by district: total precipitation](endpoints/climate-precipitation-total-districts.md) | a folder per mainland district, files per municipality | · | · | · | · | not documented |
| [Climate series by district: maximum temperature](endpoints/climate-temperature-max-districts.md) | a folder per mainland district, files per municipality | · | · | · | · | not documented |
| [Climate series by district: minimum temperature](endpoints/climate-temperature-min-districts.md) | a folder per mainland district, files per municipality | · | · | · | · | not documented |
| [Monthly and daily long series (spreadsheets), Lisbon from 1855](endpoints/climate-long-series.md) | XLSX and XLS | · | · | · | · | not documented |
| [A list of place ids for district 06 (Coimbra)](endpoints/district-06.md) | JSON (invalid) | 1 | 277 | 2018-02-27 16:20 | 2026-11-11 02:22 | not documented |
| [zonas.gpkg (a GeoPackage, 61 MB as listed)](endpoints/zones-geopackage.md) | GeoPackage | 1 | · | 2024-06-19 10:01 | 2026-11-11 02:22 | not documented |

## Beyond the open data

www.ipma.pt itself reads other addresses under https://api.ipma.pt/public-data/ (hourly forecasts, for example). They are not documented, the /public-data/ path is outside the open-data documentation and its terms for reuse are not stated: not mapped here until Dinis says so.

## IPMA's own directory

IPMA's server lists its folders under [/open-data/](https://api.ipma.pt/open-data/). We walked 80 of them (not all yet: the rest are named in listing.json); names, sizes and dates as listed are in [listing.json](listing.json). That is how the data sets marked "not documented" were found.

The machine-readable map: [api.json](api.json). What we hold of each file: [latest.json](latest.json). Every read: [reads.json](reads.json). [Licence and terms](licence.md).
