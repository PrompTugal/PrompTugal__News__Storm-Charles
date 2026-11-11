---
title: Browse IPMA's data as we hold it
summary: A browser for every JSON file of the IPMA section: its schema, a readable table, and the raw file one click away.
mount: <div class="ipma" data-view="browser" data-base="./" data-files="data/warnings.json,data/classes.json,data/places.json,data/stations.json,data/observations.json,data/observed-daily.json,data/sea.json,data/cities.json,data/seismic.json,data/shellfish-zones.json,api.json,latest.json,reads.json,listing.json,nodes.json,source.json,dataset.json"><p class="meta">This view is drawn in the browser from the JSON files linked below. Without JavaScript, read the tables on this page.</p></div>
head: <link rel="stylesheet" href="../../app/sources/ipma/ipma.css"><script src="../../app/sources/ipma/ipma.js" defer></script>
---
# Browse the files

> Kept by incident.ipma@web-summit.dinis, 11 November 2026, 02:34 UTC

[IPMA's open data](index.md) · [Warnings over time](warnings.md) · [Stations](stations.md) · [The sea](sea.md) · [Cities: forecast and observed](cities.md) · [The API, mapped](api.md) · [Browse the files](data.md) · [Licence and terms](licence.md)

Pick a file above: **Table** shows its rows, **Schema** its shape (keys and types, read from the file itself), **Raw** the text. Every file is small (under 256 KB) and served at its own address; each says which IPMA file it was made from, with that file's sha256 and the time we read it. IPMA's full responses are not in git: they are in the data store ([dataset.json](dataset.json)), and each data set's page links IPMA's live file.

| File | Bytes | What it is |
|---|---|---|
| [data/warnings.json](data/warnings.json) | 42395 | Every IPMA warning above green that we have read, each with the reads that bracket it: first_read_utc (the first of our reads that carried it) and last_read_utc; gone_read_utc is the first read that no longer carried it, and 'gone' says how: ended (its window  |
| [data/classes.json](data/classes.json) | 4529 | IPMA's own names for its codes, in Portuguese and English exactly as IPMA publishes them (its spelling kept, trailing spaces trimmed): idWeatherType (significant weather), classWindSpeed (wind strength of the day) and classPrecInt (precipitation intensity). -9 |
| [data/places.json](data/places.json) | 31825 | IPMA's places: the 25 warning areas (districts, island groups, parts of Madeira), the places it forecasts for, the coastal places of the sea forecast, and a point for each mainland municipality (from the fire-risk files, with the risk class for today and the n |
| [data/stations.json](data/stations.json) | 33440 | IPMA's weather stations (id, name, coordinates as IPMA gives them) and whether each reported in the last 24 hours read. 'region' is ours, from the longitude. |
| [data/observations.json](data/observations.json) | 127682 | The last 24 hours of IPMA's hourly station observations, as arrays in the order of 'hours'. t: air temperature (°C, mean of the hour); w: wind speed at 10 m (km/h; the mean, not gusts: IPMA's open data carries no gusts); d: wind direction class (1 or 9 N, 2 NE |
| [data/observed-daily.json](data/observed-daily.json) | 15610 | Per day and station, computed by us from IPMA's hourly observations (not an IPMA product): [hours of the day present in the 24-hour file when read, lowest hourly mean temperature (°C), highest hourly mean temperature (°C), precipitation summed over the hours p |
| [data/sea.json](data/sea.json) | 8083 | IPMA's sea state forecast for its 12 coastal places, by place and day, as issued: each entry of a series is one version of that day's forecast, with the first of our reads that carried it (read_utc), the last (last_read_utc), and IPMA's file time (file_updated |
| [data/cities.json](data/cities.json) | 34180 | IPMA's daily forecast for each of its 35 places, by place and day, as issued: each entry of a series is one version of that day's forecast, with the first and last of our reads that carried it and IPMA's file time. v: [tMin (°C), tMax (°C), probability of prec |
| [data/seismic.json](data/seismic.json) | 32691 | IPMA's located seismic events of the last 30 days (area 3: the Azores; area 7: the mainland and Madeira), one array per event. Times are UTC (IPMA: 'TU'). |
| [data/shellfish-zones.json](data/shellfish-zones.json) | 22968 | IPMA's shellfish production zones and their harvesting status in the latest bulletin, with each zone's outline thinned by us to about 2 km (for drawing: the coastal zones trace the mainland's coast). Status and species are IPMA's. |
| [api.json](api.json) | 54991 | The map of IPMA's open data API: every endpoint IPMA documents at https://api.ipma.pt/ and every file its directory lists under /open-data/, with the address, the format, each field's meaning and unit, how often IPMA says it changes, and what the documentation |
| [latest.json](latest.json) | 33097 | Every file we read from IPMA's open data, as of its latest read: the sha256 and size of IPMA's response, the UTC time we read it, IPMA's own Last-Modified header, and when we last saw it change. The responses themselves are in the data store (see dataset.json) |
| [reads.json](reads.json) | 660 | Every read of IPMA's open data by tools/ipma-read.mjs, appended: when, how many requests, which files answered with something new (changed), which were read for the first time (the count), which failed. One request every few seconds; read-only. |
| [listing.json](listing.json) | 143409 | IPMA's own directory listings under https://api.ipma.pt/open-data/, as its server lists them (name, date and size are IPMA's columns; the dates carry no time zone). A listing, not a download: files are read only where sources/ipma/api.json says so. A directory |
| [nodes.json](nodes.json) | 122942 | Nodes from IPMA's open data for incident.entities@ to adopt: the body, each data set, the warning levels and types, the 25 warning areas, the forecast places, the coastal places, the stations and the weather types. Ids are stable (they are built from IPMA's ow |
| [source.json](source.json) | 9039 | IPMA as a source for this site: who it is, what it publishes as open data, its terms exactly as published, and how we read it. The map of its API is api.json; what we hold is latest.json. |
| [dataset.json](dataset.json) | 10975 | Where IPMA's full responses are kept: a data vault (SG/Send, made with sgit), never git. latest/ is overwritten by each read; a dated folder per hour (UTC) keeps every file that changed in that hour, a <file>.diff.json beside it saying what changed, and a mani |
