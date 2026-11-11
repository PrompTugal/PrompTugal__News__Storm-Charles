---
title: Daily forecast up to 5 days, by place · IPMA
summary: IPMA's "Daily forecast up to 5 days, by place": the address, each field with its meaning and unit, how often it changes, what we read and what changed.
mount: <div class="ipma" data-view="api" data-base="../" data-endpoint="city-daily"><p class="meta">This view is drawn in the browser from the JSON files linked below. Without JavaScript, read the tables on this page.</p></div>
head: <link rel="stylesheet" href="../../../app/sources/ipma/ipma.css"><script src="../../../app/sources/ipma/ipma.js" defer></script>
---
# Daily forecast up to 5 days, by place

> Kept by incident.ipma@web-summit.dinis, 11 November 2026, 12:51 UTC

[IPMA's open data](../index.md) · [Warnings over time](../warnings.md) · [Stations](../stations.md) · [The sea](../sea.md) · [Cities: forecast and observed](../cities.md) · [The API, mapped](../api.md) · [What we learned](../learned.md) · [Browse the files](../data.md) · [Licence and terms](../licence.md)

IPMA's name for it: *Previsão Meteorológica Diária até 5 dias agregada por Local*. Documented at [api.ipma.pt](https://api.ipma.pt/). Drawn at [cities](../cities.md).

| | |
|---|---|
| Address | `https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/{globalIdLocal}.json` |
| Format | JSON |
| Shape | {owner, country, globalIdLocal, dataUpdate, data: [one object per day]} |
| `{globalIdLocal}` | every globalIdLocal in distrits-islands.json |
| IPMA says it updates | taxa de atualização horária; the model runs twice a day: "a corrida das 00UTC (disponibilizada em regra a partir das 10:00) e das 12UTC (disponibilizada em regra a partir das 20:00)" |
| IPMA's file dated (its Last-Modified header) | 2026-11-11 12:31 UTC |
| We last read it | 2026-11-11 12:48 UTC, 35 files, 41493 bytes |
| IPMA's note | "Os dados de previsão são obtidos automaticamente através de processamento estatístico das previsões de dois modelos numéricos (ECMWF e AROME). Apenas estão disponíveis dados diários." |

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

- tMin and tMax are strings with one decimal here and whole numbers in the day files
- which model run a file comes from (dataUpdate is the file's rewrite time, hourly)



## Files read

| File | Answer | Bytes | sha256 | IPMA's file dated (UTC) | We read it (UTC) |
|---|---|---|---|---|---|
| [forecast/meteorology/cities/daily/1010500.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1010500.json) | 200 | 1195 | `7ffe971e7a070c9c…` | 2026-11-11 12:31 | 2026-11-11 12:48 |
| [forecast/meteorology/cities/daily/1020500.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1020500.json) | 200 | 1192 | `b73d32ba3f9a3623…` | 2026-11-11 12:31 | 2026-11-11 12:48 |
| [forecast/meteorology/cities/daily/1030300.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1030300.json) | 200 | 1195 | `6ce3b788028256e8…` | 2026-11-11 12:31 | 2026-11-11 12:48 |
| [forecast/meteorology/cities/daily/1030800.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1030800.json) | 200 | 1196 | `b18a2c057a6d81ff…` | 2026-11-11 12:31 | 2026-11-11 12:48 |
| [forecast/meteorology/cities/daily/1040200.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1040200.json) | 200 | 1191 | `1882055227f2ba9b…` | 2026-11-11 12:31 | 2026-11-11 12:48 |
| [forecast/meteorology/cities/daily/1050200.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1050200.json) | 200 | 1197 | `e3c29da1c903811f…` | 2026-11-11 12:31 | 2026-11-11 12:48 |
| [forecast/meteorology/cities/daily/1060300.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1060300.json) | 200 | 1193 | `b66d425abced8acc…` | 2026-11-11 12:31 | 2026-11-11 12:48 |
| [forecast/meteorology/cities/daily/1070500.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1070500.json) | 200 | 1194 | `7267750b5213b92c…` | 2026-11-11 12:31 | 2026-11-11 12:49 |
| [forecast/meteorology/cities/daily/1080500.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1080500.json) | 200 | 1189 | `0577093b44f1694d…` | 2026-11-11 12:31 | 2026-11-11 12:49 |
| [forecast/meteorology/cities/daily/1081505.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1081505.json) | 200 | 1191 | `48001e3fae0c42ba…` | 2026-11-11 12:31 | 2026-11-11 12:49 |
| [forecast/meteorology/cities/daily/1081100.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1081100.json) | 200 | 1190 | `426e52a883b0ce1b…` | 2026-11-11 12:31 | 2026-11-11 12:49 |
| [forecast/meteorology/cities/daily/1080800.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1080800.json) | 200 | 1190 | `dcc1a9c09ce805e2…` | 2026-11-11 12:31 | 2026-11-11 12:49 |
| [forecast/meteorology/cities/daily/1090700.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1090700.json) | 200 | 1187 | `edce296426e9df90…` | 2026-11-11 12:31 | 2026-11-11 12:49 |
| [forecast/meteorology/cities/daily/1090821.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1090821.json) | 200 | 1187 | `3bd9658486ba21cc…` | 2026-11-11 12:31 | 2026-11-11 12:49 |
| [forecast/meteorology/cities/daily/1100900.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1100900.json) | 200 | 1196 | `f433f3e0c925361b…` | 2026-11-11 12:31 | 2026-11-11 12:49 |
| [forecast/meteorology/cities/daily/1110600.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1110600.json) | 200 | 1192 | `f120b4e9096f01e1…` | 2026-11-11 12:31 | 2026-11-11 12:49 |
| [forecast/meteorology/cities/daily/1121400.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1121400.json) | 200 | 1197 | `aa3749ec2bf84f14…` | 2026-11-11 12:31 | 2026-11-11 12:49 |
| [forecast/meteorology/cities/daily/1131200.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1131200.json) | 200 | 1196 | `df267f4d637ce56d…` | 2026-11-11 12:31 | 2026-11-11 12:49 |
| [forecast/meteorology/cities/daily/1141600.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1141600.json) | 200 | 1192 | `0620d9b80ad04c98…` | 2026-11-11 12:31 | 2026-11-11 12:49 |
| [forecast/meteorology/cities/daily/1151200.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1151200.json) | 200 | 1191 | `75c0a50e2c2642e8…` | 2026-11-11 12:31 | 2026-11-11 12:49 |
| [forecast/meteorology/cities/daily/1151300.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1151300.json) | 200 | 1192 | `33df59df2ac538bb…` | 2026-11-11 12:31 | 2026-11-11 12:49 |
| [forecast/meteorology/cities/daily/1160900.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1160900.json) | 200 | 1195 | `f3458b916405827c…` | 2026-11-11 12:31 | 2026-11-11 12:49 |
| [forecast/meteorology/cities/daily/1171400.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1171400.json) | 200 | 1193 | `6a89daf1681f8e64…` | 2026-11-11 12:31 | 2026-11-11 12:49 |
| [forecast/meteorology/cities/daily/1182300.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1182300.json) | 200 | 1193 | `1e4da8745cd0025b…` | 2026-11-11 12:31 | 2026-11-11 12:49 |
| [forecast/meteorology/cities/daily/2310300.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/2310300.json) | 200 | 1136 | `7fc8642cbfbb6c50…` | 2026-11-11 12:31 | 2026-11-11 12:49 |
| [forecast/meteorology/cities/daily/2320100.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/2320100.json) | 200 | 1116 | `6229b0478d4b868a…` | 2026-11-11 12:31 | 2026-11-11 12:49 |
| [forecast/meteorology/cities/daily/3410100.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3410100.json) | 200 | 1137 | `bb5f034bf8272de7…` | 2026-11-11 12:31 | 2026-11-11 12:49 |
| [forecast/meteorology/cities/daily/3420300.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3420300.json) | 200 | 1179 | `43eaa89ebc2d2edf…` | 2026-11-11 12:31 | 2026-11-11 12:50 |
| [forecast/meteorology/cities/daily/3430100.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3430100.json) | 200 | 1197 | `c2a9209498dddf71…` | 2026-11-11 12:31 | 2026-11-11 12:50 |
| [forecast/meteorology/cities/daily/3440100.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3440100.json) | 200 | 1181 | `ebc827149e53b0b5…` | 2026-11-11 12:31 | 2026-11-11 12:50 |
| [forecast/meteorology/cities/daily/3450200.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3450200.json) | 200 | 1199 | `c0ffafd78cc4eea9…` | 2026-11-11 12:31 | 2026-11-11 12:50 |
| [forecast/meteorology/cities/daily/3460200.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3460200.json) | 200 | 1201 | `c0286f6221bef434…` | 2026-11-11 12:31 | 2026-11-11 12:50 |
| [forecast/meteorology/cities/daily/3470100.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3470100.json) | 200 | 1180 | `efd43d15ec06f180…` | 2026-11-11 12:31 | 2026-11-11 12:50 |
| [forecast/meteorology/cities/daily/3480200.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3480200.json) | 200 | 1181 | `5b9731561854e4b8…` | 2026-11-11 12:31 | 2026-11-11 12:50 |
| [forecast/meteorology/cities/daily/3490100.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3490100.json) | 200 | 1162 | `f1a2ceb78aa49ccf…` | 2026-11-11 12:31 | 2026-11-11 12:50 |

The links go to IPMA's live files. Full hashes: [latest.json](../latest.json). What changed between reads: [changes/city-daily.json](../changes/city-daily.json). Our small files made from it: [data/cities.json](../data.md#data/cities.json).
