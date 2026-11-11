---
title: What we learned reading IPMA's API
summary: Notes from reading every file of IPMA's open data beside its documentation: small differences, things the documentation does not say, and files it does not list. Written as help for IPMA and for anyone building on the API.
---
# What we learned reading IPMA's API

> Kept by incident.ipma@web-summit.dinis, 11 November 2026, 12:51 UTC

[IPMA's open data](index.md) · [Warnings over time](warnings.md) · [Stations](stations.md) · [The sea](sea.md) · [Cities: forecast and observed](cities.md) · [The API, mapped](api.md) · [What we learned](learned.md) · [Browse the files](data.md) · [Licence and terms](licence.md)

IPMA's open data is a generous thing: warnings, forecasts, observations, the sea, earthquakes and climate series, free to read, without a key, with a documentation page that names every field. We read all of it on 11 November 2026 during Storm Charles, field by field, beside the documentation at [api.ipma.pt](https://api.ipma.pt/). These are the notes of a careful reader: where a response and the documentation differ, what a builder has to guess, and what is there but not listed. **They are offered as help, not criticism**: each one says where to see it and what would make it easier. Everything here is our observation at the time given; IPMA's files may have changed since, and where we may have misread, the address is there to check.

## Where a response and the documentation differ

### The evapotranspiration file is at another address

The documentation gives `.../evapotranspiration/et0-p1d-continental-obssup-idw-20d-concelhos.csv`. That address answered **404** when we read it (2026-11-11 12:51 UTC). IPMA's own directory lists the file as `et0-p1d-continental-obssup-idw-concelhos-20d.csv` ("concelhos" and "20d" the other way round, as in the precipitation and temperature files), and that address answered **200**.

- **Where to see it:** [the documented address](endpoints/climate-evapotranspiration.md), [the listed address](endpoints/climate-evapotranspiration-listed.md)
- **What would help a reader of the API:** one word order in the documentation's link.

### Four field names

In the daily forecasts the documentation names `probPrecipita`; the responses carry `precipitaProb`. In the seismic files it names `long`; the responses carry `lon`. In the wind-class table it names `descClassWindSpeedEN` and `descClassWindSpeedPT`; the responses carry `descClassWindSpeedDailyEN` and `descClassWindSpeedDailyPT`. In the shellfish zones it names `samp`; the responses carry `code`.

- **Where to see it:** [city-daily](endpoints/city-daily.md), [seismic](endpoints/seismic.md), [wind-classes](endpoints/wind-classes.md), [bivalves](endpoints/bivalves.md)
- **What would help a reader of the API:** the documentation's field lists brought in line with the responses (or the other way round).

### The UV file carries four days

The title says "até 3 dias"; the file we read carried four dates. The field `intervaloHora` was empty in every row.

- **Where to see it:** [uv](endpoints/uv.md)
- **What would help a reader of the API:** the title, or a note on what `intervaloHora` holds and when.

### Numbers as text in one file and as numbers in another

In the per-place daily forecast `tMin` and `tMax` are strings with one decimal ("14.6"); in the per-day files they are whole numbers (15). Latitude and longitude are strings in the place tables and numbers in the fire-risk files.

- **Where to see it:** [city-daily](endpoints/city-daily.md), [day-forecast](endpoints/day-forecast.md)
- **What would help a reader of the API:** a line in the documentation saying which is which, so a reader does not mistake rounding for a change of forecast.

## What the documentation does not say

### Warnings have no time of issue and no identifier

A row of the warnings feed is an area, a type, a level, a window and a text. It does not say when IPMA issued or changed it, and nothing ties a changed warning to the one it replaces: the old row goes and a new one appears. During a storm that is the question everyone asks ("when was the red issued?"). Today the only way to answer from open data is to read the feed often and compare, or to take the sent time from MeteoAlarm's CAP messages.

- **Where to see it:** [the warnings over time](warnings.md), where we pair rows ourselves and say so
- **What would help a reader of the API:** an issue time on each row (and, if possible, an identifier that survives an update). This would be the single most useful addition for anyone keeping a record.

### Two warning areas are in no id table

The feed carries 25 areas. `MCN` and `MRM` (parts of Madeira) appear in it but not in `distrits-islands.json` or `sea-locations.json`, which carry `MCS` and `MPS` only; and no table gives an area's name.

- **Where to see it:** [places](endpoints/places.md), [data/places.json](data/places.json)
- **What would help a reader of the API:** a small table of warning areas: code, name, and ideally an outline.

### The time zone of a warning's window

The documentation says forecasts are in UTC. For the warnings' `startTime` and `endTime` it says nothing, and they carry no zone. On the mainland and Madeira in winter it makes no difference; for the Azores, and in summer, it does.

- **Where to see it:** [warnings](endpoints/warnings.md)
- **What would help a reader of the API:** one sentence, or a zone on the timestamps.

### What an hour label means in the observations

An observation is keyed by an hour ("2026-11-10T18:00") and `precAcumulada` is "valor acumulado da hora". The documentation does not say whether that is the hour ending or starting at the label, nor the zone. The meteorologist of this site infers hour ending, UTC, and labels that as an inference.

- **Where to see it:** [observations](endpoints/observations.md)
- **What would help a reader of the API:** one sentence in the documentation.

### No gusts in the observations

The hourly observations carry the mean wind. IPMA's wind warnings are worded in gusts ("rajadas até 120 km/h"), so the open observations cannot be read beside a warning.

- **Where to see it:** [stations](stations.md)
- **What would help a reader of the API:** the hourly maximum gust, if IPMA can publish it.

### What the classes stand for

The wind and precipitation class tables give names (Fraco, Moderado, Forte) without the speeds or amounts behind them.

- **Where to see it:** [data/classes.json](data/classes.json)
- **What would help a reader of the API:** the thresholds beside the names.

### Smaller things

The unit of an earthquake's `depth`; the fields `sensed`, `sismoId`, `shakemapid` and others in the seismic files; what the point given for each municipality in the fire-risk files is; which model run a forecast file comes from (`dataUpdate` is the hourly rewrite time); the per-day forecast files list 27 places where the place table lists 35; the stations table has no altitude.

- **Where to see it:** each data set's page, under "Not documented": [the API, mapped](api.md)
- **What would help a reader of the API:** a line each.

## What is there and not listed

### Files in the directory that the documentation does not mention

IPMA's server lists its folders, which is how we found them: climate series by district in five folders (`evapotranspiration`, `mpdsi`, `precipitation-total`, `temperature-max`, `temperature-min`), 22 long-series spreadsheets under `monthly-long-series` (Lisbon's daily temperature from 1855 and rain from 1863 among them), a 61 MB `zonas.gpkg`, and `06.json`. We have listed them (names, sizes and dates as IPMA's server gives them) and downloaded none of the series.

- **Where to see it:** [listing.json](listing.json), [the API, mapped](api.md)
- **What would help a reader of the API:** a paragraph in the documentation for each: these are remarkable series and few people know they are there.

### 06.json does not parse

It reads as a list of place ids for district 06, but its `data` is a set of bare numbers in braces, which is not valid JSON. It is dated 2018 and may simply be a leftover.

- **Where to see it:** [district-06](endpoints/district-06.md)
- **What would help a reader of the API:** removing it, or brackets.

## How we read

One request every three seconds, about once an hour, read-only, with no key (none is needed). Every response's sha256 and the time read are public: [latest.json](latest.json), [reads.json](reads.json). IPMA's terms as published, and how this site follows them: [licence.md](licence.md).
