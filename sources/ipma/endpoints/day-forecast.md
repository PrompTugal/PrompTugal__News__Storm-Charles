---
title: Daily forecast up to 3 days, all places for one day · IPMA
summary: IPMA's "Daily forecast up to 3 days, all places for one day": the address, each field with its meaning and unit, how often it changes, what we read and what changed.
mount: <div class="ipma" data-view="api" data-base="../" data-endpoint="day-forecast"><p class="meta">This view is drawn in the browser from the JSON files linked below. Without JavaScript, read the tables on this page.</p></div>
head: <link rel="stylesheet" href="../../../app/sources/ipma/ipma.css"><script src="../../../app/sources/ipma/ipma.js" defer></script>
---
# Daily forecast up to 3 days, all places for one day

> Kept by incident.ipma@web-summit.dinis, 11 November 2026, 04:49 UTC

[IPMA's open data](../index.md) · [Warnings over time](../warnings.md) · [Stations](../stations.md) · [The sea](../sea.md) · [Cities: forecast and observed](../cities.md) · [The API, mapped](../api.md) · [What we learned](../learned.md) · [Browse the files](../data.md) · [Licence and terms](../licence.md)

IPMA's name for it: *Previsão Meteorológica Diária até 3 dias, informação agregada por dia*. Documented at [api.ipma.pt](https://api.ipma.pt/). Drawn at [cities](../cities.md).

| | |
|---|---|
| Address | `https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/hp-daily-forecast-day{idDay}.json` |
| Format | JSON |
| Shape | {owner, country, forecastDate, dataUpdate, data: [one object per place]} |
| `{idDay}` | 0 today, 1 tomorrow, 2 the day after: 0, 1, 2 |
| IPMA says it updates | taxa de atualização horária |
| IPMA's file dated (its Last-Modified header) | 2026-11-11 04:31 UTC |
| We last read it | 2026-11-11 04:48 UTC, 3 files, 20606 bytes |
| IPMA's note | "Apenas estão disponíveis dados diários." |

## Fields

| Field | Type | Unit | Meaning (our English) | IPMA's wording | Where the documentation differs |
|---|---|---|---|---|---|
| `forecastDate` | date | · | the day the forecast is for | "data da previsão" | · |
| `dataUpdate` | date-time, no zone | · | when IPMA rewrote the file | "data de atualização do ficheiro (taxa de atualização horária)" | · |
| `globalIdLocal` | integer | · | the place: an id from the list of district capitals and islands (a node: place) | · | · |
| `idWeatherType` | integer | · | code of the significant weather: see the weather-type table (a node: weather-type) | · | · |
| `tMin` | string or number | °C | minimum temperature of the day | "temperatura mínima diária" | · |
| `tMax` | string or number | °C | maximum temperature of the day | "temperatura máxima diária" | · |
| `classWindSpeed` | integer | · | class of wind strength: see the wind-class table (a node: wind-class) | · | · |
| `predWindDir` | string | · | prevailing wind direction (N, NE, E, SE, S, SW, W, NW) | · | · |
| `precipitaProb` | string | % | probability of precipitation | "probabilidade da precipitação" | the documentation names this field probPrecipita; the responses carry precipitaProb |
| `classPrecInt` | integer | · | class of precipitation intensity: see the precipitation-class table; absent on some days (a node: precipitation-class) | · | · |
| `latitude` | string (decimal degrees) | ° | latitude of the place | · | · |
| `longitude` | string (decimal degrees) | ° | longitude of the place | · | · |

## Not documented

- 27 places are listed here; distrits-islands.json lists 35



## Files read

| File | Answer | Bytes | sha256 | IPMA's file dated (UTC) | We read it (UTC) |
|---|---|---|---|---|---|
| [forecast/meteorology/cities/daily/hp-daily-forecast-day0.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/hp-daily-forecast-day0.json) | 200 | 6894 | `1e44d03e01734b27…` | 2026-11-11 04:31 | 2026-11-11 04:48 |
| [forecast/meteorology/cities/daily/hp-daily-forecast-day1.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/hp-daily-forecast-day1.json) | 200 | 6870 | `2f21e3ca8c3d4580…` | 2026-11-11 04:31 | 2026-11-11 04:48 |
| [forecast/meteorology/cities/daily/hp-daily-forecast-day2.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/hp-daily-forecast-day2.json) | 200 | 6842 | `e33b99a6ac0d0eb8…` | 2026-11-11 04:31 | 2026-11-11 04:48 |

The links go to IPMA's live files. Full hashes: [latest.json](../latest.json). What changed between reads: [changes/day-forecast.json](../changes/day-forecast.json). Our small files made from it: [data/cities.json](../data.md#data/cities.json).
