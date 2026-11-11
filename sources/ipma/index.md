---
title: IPMA's open data
summary: Everything IPMA publishes as open data (api.ipma.pt), mapped, read hourly, kept with what changed, and drawn: the stations and warning areas on a map of Portugal and the islands, every area's warnings over time, the sea, the cities.
mount: <div class="ipma" data-view="map" data-base="./"><p class="meta">This view is drawn in the browser from the JSON files linked below. Without JavaScript, read the tables on this page.</p></div>
head: <link rel="stylesheet" href="../../app/sources/ipma/ipma.css"><script src="../../app/sources/ipma/ipma.js" defer></script>
---
# IPMA's open data

> Kept by incident.ipma@web-summit.dinis, 11 November 2026, 23:52 UTC. At Dinis Cruz's word (BRIEF.md, 11 November, ~02:10 UTC): "start a new agent for IPMA and build a complete new visualisation, a section, a data analysis ... every JSON under api.ipma.pt/open-data, the cities, the ocean".

**Not a warning service.** Everything here is IPMA's, shown as IPMA's, with the time we read it; we add no forecast and no advice. Follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/).

[IPMA's open data](index.md) · [Warnings over time](warnings.md) · [Stations](stations.md) · [The sea](sea.md) · [Cities: forecast and observed](cities.md) · [The API, mapped](api.md) · [What we learned](learned.md) · [Browse the files](data.md) · [Licence and terms](licence.md)

**What this is.** IPMA (Instituto Português do Mar e da Atmosfera) publishes warnings, forecasts, observations, the sea state, earthquakes and climate series as open files at [api.ipma.pt](https://api.ipma.pt/). This section maps every one of them, reads them about once an hour (one request every few seconds, read-only), keeps the sha256 and the time of each read in git and the full responses in a data store, records what changed between reads, and draws views from them. The map above is drawn from IPMA's coordinates only: no tiles, no image.

**Everything on this page is a fact in this site's sense**: read from the body that warns (IPMA), with the file and the UTC time we read it. Where a figure is computed by us (a 24-hour sum, the nearest station), the page and the data say so.

## Now, in IPMA's feed

Read 2026-11-11 23:49 UTC (IPMA's file dated 2026-11-11 23:15 UTC): **13 warnings above green** across 10 of 25 areas; 0 red, 0 orange, 13 yellow. [All of them, over time](warnings.md).

| Area | Type (IPMA's word) | Level | From | To | IPMA's text | First in our read of (UTC) | Now |
|---|---|---|---|---|---|---|---|
| none red | | | | | | | |

Source: [warnings_www.json](https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json). Windows are as IPMA writes them (no zone; Lisbon and Madeira are on UTC in November).

## What IPMA publishes

29 data sets: 20 documented at [api.ipma.pt](https://api.ipma.pt/), 9 more found in its own directory listings. 64 files read in the latest pass (2026-11-11 23:48 UTC: 64 requests in 189 s). The full map, field by field: [api.md](api.md) and [api.json](api.json).

### Warnings

| Data set | Format | Files read | Bytes | IPMA's file dated (UTC) | We read it (UTC) | IPMA says it updates |
|---|---|---|---|---|---|---|
| [Weather warnings, up to 3 days](endpoints/warnings.md) | JSON | 1 | 37444 | 2026-11-11 23:15 | 2026-11-11 23:49 | not stated |

### Forecasts

| Data set | Format | Files read | Bytes | IPMA's file dated (UTC) | We read it (UTC) | IPMA says it updates |
|---|---|---|---|---|---|---|
| [Daily forecast up to 5 days, by place](endpoints/city-daily.md) | JSON | 35 | 41507 | 2026-11-11 23:31 | 2026-11-11 23:49 | taxa de atualização horária; the model runs twice a day: "a corrida das 00UTC (disponibilizada em regra a partir das 10:00) e das 12UTC (disponibilizada em regra a partir das 20:00)" |
| [Daily forecast up to 3 days, all places for one day](endpoints/day-forecast.md) | JSON | 3 | 20585 | 2026-11-11 23:31 | 2026-11-11 23:50 | taxa de atualização horária |
| [Ultraviolet index forecast](endpoints/uv.md) | JSON | 1 | 20100 | 2026-11-11 23:00 | 2026-11-11 23:51 | not stated |
| [Fire risk forecast up to 3 days, by municipality](endpoints/fire-risk.md) | JSON | 3 | 72906 | 2026-11-11 09:35 | 2026-11-11 23:51 | taxa de atualização horária |

### The sea

| Data set | Format | Files read | Bytes | IPMA's file dated (UTC) | We read it (UTC) | IPMA says it updates |
|---|---|---|---|---|---|---|
| [Sea state forecast up to 3 days, by day](endpoints/sea-forecast.md) | JSON | 3 | 9823 | 2026-11-11 23:31 | 2026-11-11 23:51 | taxa de atualização horária |
| [Shellfish harvesting bans by production zone](endpoints/bivalves.md) | GeoJSON | 1 | 3411715 | 2026-11-09 16:20 | 2026-11-11 23:51 | not stated (the latest bulletin) |

### Observations

| Data set | Format | Files read | Bytes | IPMA's file dated (UTC) | We read it (UTC) | IPMA says it updates |
|---|---|---|---|---|---|---|
| [Station observations, hourly, last 24 hours](endpoints/observations.md) | JSON | 1 | 1044586 | 2026-11-11 23:35 | 2026-11-11 23:51 | Taxa de atualização horária. |
| [Station observations, last 3 hours, with coordinates](endpoints/obs-surface.md) | GeoJSON | 1 | 428997 | 2026-11-11 23:31 | 2026-11-11 23:51 | Taxa de atualização horária. |

### Earthquakes

| Data set | Format | Files read | Bytes | IPMA's file dated (UTC) | We read it (UTC) | IPMA says it updates |
|---|---|---|---|---|---|---|
| [Seismic events, last 30 days](endpoints/seismic.md) | JSON | 2 | 146029 | 2026-11-11 23:36 | 2026-11-11 23:51 | Atualização é horária. |

### Climate, by municipality

| Data set | Format | Files read | Bytes | IPMA's file dated (UTC) | We read it (UTC) | IPMA says it updates |
|---|---|---|---|---|---|---|
| [Daily precipitation by municipality](endpoints/climate-precipitation.md) | CSV | 1 | 635427 | 2026-11-11 03:10 | 2026-11-11 23:51 | Taxa de atualização diária. |
| [Daily air temperature by municipality](endpoints/climate-temperature.md) | CSV | 1 | 896257 | 2026-11-11 03:10 | 2026-11-11 23:51 | Taxa de atualização diária. |
| [Daily reference evapotranspiration by municipality](endpoints/climate-evapotranspiration.md) | CSV | 1 (1 not 200) | · | · | 2026-11-11 23:51 | Taxa de atualização diária. |
| [Daily reference evapotranspiration by municipality (the address IPMA's directory lists)](endpoints/climate-evapotranspiration-listed.md) | ZIP of SVG | 1 | 431062 | 2026-06-20 19:12 | 2026-11-11 23:51 | not stated |

### Id tables and files

| Data set | Format | Files read | Bytes | IPMA's file dated (UTC) | We read it (UTC) | IPMA says it updates |
|---|---|---|---|---|---|---|
| [Places: district capitals and islands](endpoints/places.md) | JSON | 1 | 10071 | 2021-12-07 14:48 | 2026-11-11 23:48 | not stated |
| [Coastal places](endpoints/sea-places.md) | JSON | 1 | 2268 | 2020-02-04 12:21 | 2026-11-11 23:48 | not stated |
| [Weather stations](endpoints/stations.md) | JSON | 1 | 49864 | 2026-11-11 23:35 | 2026-11-11 23:48 | not stated |
| [Weather types](endpoints/weather-types.md) | JSON | 1 | 4954 | 2024-06-07 09:55 | 2026-11-11 23:48 | not stated |
| [Wind strength classes](endpoints/wind-classes.md) | JSON | 1 | 644 | 2018-01-18 17:50 | 2026-11-11 23:48 | not stated |
| [Precipitation intensity classes](endpoints/precipitation-classes.md) | JSON | 1 | 578 | 2019-11-06 17:27 | 2026-11-11 23:48 | not stated |
| [Weather symbols (SVG, zipped)](endpoints/icons.md) | ZIP of SVG | 1 | 179447 | 2022-05-12 11:47 | 2026-11-11 23:49 | not stated |

### Listed, not documented

| Data set | Format | Files read | Bytes | IPMA's file dated (UTC) | We read it (UTC) | IPMA says it updates |
|---|---|---|---|---|---|---|
| [Climate series by district: reference evapotranspiration](endpoints/climate-evapotranspiration-districts.md) | a folder per mainland district, files per municipality | · | · | · | · | not documented |
| [Climate series by district: a drought index (the folder is named mpdsi)](endpoints/climate-mpdsi-districts.md) | a folder per mainland district, files per municipality | · | · | · | · | not documented |
| [Climate series by district: total precipitation](endpoints/climate-precipitation-total-districts.md) | a folder per mainland district, files per municipality | · | · | · | · | not documented |
| [Climate series by district: maximum temperature](endpoints/climate-temperature-max-districts.md) | a folder per mainland district, files per municipality | · | · | · | · | not documented |
| [Climate series by district: minimum temperature](endpoints/climate-temperature-min-districts.md) | a folder per mainland district, files per municipality | · | · | · | · | not documented |
| [Monthly and daily long series (spreadsheets), Lisbon from 1855](endpoints/climate-long-series.md) | XLSX and XLS | · | · | · | · | not documented |
| [A list of place ids for district 06 (Coimbra)](endpoints/district-06.md) | JSON (invalid) | 1 | 277 | 2018-02-27 16:20 | 2026-11-11 23:51 | not documented |
| [zonas.gpkg (a GeoPackage, 61 MB as listed)](endpoints/zones-geopackage.md) | GeoPackage | 1 | · | 2024-06-19 10:01 | 2026-11-11 23:51 | not documented |

## What the documentation does not match or does not say

Found by reading the responses beside the documentation (11 November 2026). Observations of ours about IPMA's files, each checkable at the address given on the data set's page.

- **Daily forecast up to 5 days, by place**, `precipitaProb`: the documentation names this field probPrecipita; the responses carry precipitaProb
- **Daily forecast up to 3 days, all places for one day**, `precipitaProb`: the documentation names this field probPrecipita; the responses carry precipitaProb
- **Seismic events, last 30 days**, `lon`: the documentation names this field long; the responses carry lon
- **Shellfish harvesting bans by production zone**, `code`: the documentation names this field samp; the responses carry code
- **Wind strength classes**, `descClassWindSpeedDailyEN`: documented as descClassWindSpeedEN
- **Wind strength classes**, `descClassWindSpeedDailyPT`: documented as descClassWindSpeedPT
- **Weather symbols (SVG, zipped)**: Documented at this address, which answered 404 Not Found on 11 November 2026 (02:11 UTC). IPMA's own directory lists the file under another name, ending concelhos-20d.csv: see "Daily reference evapotranspiration by municipality (the address IPMA's directory lists)". The reader keeps asking both and records each answer.
- **Daily reference evapotranspiration by municipality (the address IPMA's directory lists)**: The file as IPMA's directory lists it. The documentation gives the name with "20d" and "concelhos" the other way round, and that address answers 404.
- **Climate series by district: reference evapotranspiration**: Listed in IPMA's directory, not in the documentation. Eighteen folders, one per mainland district. The files are not downloaded yet: the names, sizes and dates IPMA lists are in listing.json.
- **Climate series by district: a drought index (the folder is named mpdsi)**: Listed in IPMA's directory, not in the documentation. Eighteen folders, one per mainland district. The files are not downloaded yet: the names, sizes and dates IPMA lists are in listing.json.
- **Climate series by district: total precipitation**: Listed in IPMA's directory, not in the documentation. Eighteen folders, one per mainland district. The files are not downloaded yet: the names, sizes and dates IPMA lists are in listing.json.
- **Climate series by district: maximum temperature**: Listed in IPMA's directory, not in the documentation. Eighteen folders, one per mainland district. The files are not downloaded yet: the names, sizes and dates IPMA lists are in listing.json.
- **Climate series by district: minimum temperature**: Listed in IPMA's directory, not in the documentation. Eighteen folders, one per mainland district. The files are not downloaded yet: the names, sizes and dates IPMA lists are in listing.json.
- **Monthly and daily long series (spreadsheets), Lisbon from 1855**: Listed in IPMA's directory, not in the documentation. Binary spreadsheets: not downloaded; a vault could hold them if Dinis wants them read.
- **A list of place ids for district 06 (Coimbra)**: Listed in IPMA's directory (dated 27 February 2018), not in the documentation. Its "data" is a set of bare numbers in braces, which is not valid JSON.
- **zonas.gpkg (a GeoPackage, 61 MB as listed)**: Listed in IPMA's directory (dated 19 June 2024), not in the documentation. Not downloaded: only its headers are read.

- **Weather warnings, up to 3 days**: no time of issue: a row does not say when the warning was issued or changed (the file's Last-Modified header is the nearest thing)
- **Weather warnings, up to 3 days**: the time zone of startTime and endTime (the documentation says forecasts are in UTC; for warnings it says nothing)
- **Weather warnings, up to 3 days**: the areas MCN, MRM (in the feed) are in no id table: distrits-islands.json has MCS and MPS only
- **Weather warnings, up to 3 days**: no identifier for a warning: a changed warning is a different row, not an update of the same one
- **Daily forecast up to 5 days, by place**: tMin and tMax are strings with one decimal here and whole numbers in the day files
- **Daily forecast up to 5 days, by place**: which model run a file comes from (dataUpdate is the file's rewrite time, hourly)
- **Daily forecast up to 3 days, all places for one day**: 27 places are listed here; distrits-islands.json lists 35
- **Sea state forecast up to 3 days, by day**: which wave model and run
- **Ultraviolet index forecast**: the title says up to 3 days; the file read on 11 November carried 4 days
- **Ultraviolet index forecast**: intervaloHora was empty in every row read
- **Fire risk forecast up to 3 days, by municipality**: what the point of each municipality is (a centroid, the seat, a station)
- **Station observations, hourly, last 24 hours**: the hour label's convention: whether a label is the hour starting or ending at that time, and its time zone (incident.meteorologist@ infers hour ending, UTC: incidents/2026-11-10-storm-charles/data/weather/madeira.json, hour_label)
- **Station observations, hourly, last 24 hours**: no gusts: wind is the mean speed only; warnings are issued on gusts
- **Station observations, hourly, last 24 hours**: a station can be null or absent in an hour
- **Station observations, last 3 hours, with coordinates**: the hour label's convention, as for observations.json
- **Seismic events, last 30 days**: the unit of depth
- **Seismic events, last 30 days**: sensed, sismoId, shakemapid, shakemapref, googlemapref, tensorRef, source, updateDate, lastSismicActivityDate
- **Daily precipitation by municipality**: the mainland only (the file name says continental)
- **Daily air temperature by municipality**: the mainland only (the file name says continental)
- **Daily reference evapotranspiration by municipality**: the mainland only (the file name says continental)
- **Weather stations**: altitude, district, the instruments at each station, the owner of the station
- **Wind strength classes**: the speeds each class stands for
- **Precipitation intensity classes**: the amounts each class stands for

## The files of this section

| File | What it is |
|---|---|
| [source.json](source.json) | who IPMA is, what it publishes, the licence as published, how we read it |
| [api.json](api.json) | the map: every data set, address, field, unit, cadence |
| [listing.json](listing.json) | IPMA's own directory listings under /open-data/ |
| [latest.json](latest.json) | every file read: sha256, size, time read, IPMA's Last-Modified |
| [reads.json](reads.json) | every read, appended |
| [changes/](api.md) | per data set, what changed between one read and the next |
| [dataset.json](dataset.json) | where the full responses are kept (a vault; never in git) |
| [nodes.json](nodes.json) | areas, places, stations, warning types and levels as nodes, for the entity graph |
| [data/](data.md) | the small files the views draw: warnings, stations, observations, places, sea, cities, earthquakes |

For agents: every file above is JSON at a stable address; each derived file names the IPMA file it came from, its sha256 and the time read.
