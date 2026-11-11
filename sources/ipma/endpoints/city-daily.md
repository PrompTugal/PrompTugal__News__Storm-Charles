---
title: Daily forecast up to 5 days, by place · IPMA
summary: IPMA's "Daily forecast up to 5 days, by place": the address, each field with its meaning and unit, how often it changes, what we read and what changed.
mount: <div class="ipma" data-view="api" data-base="../" data-endpoint="city-daily"><p class="meta">This view is drawn in the browser from the JSON files linked below. Without JavaScript, read the tables on this page.</p></div>
head: <link rel="stylesheet" href="../../../app/sources/ipma/ipma.css"><script src="../../../app/sources/ipma/ipma.js" defer></script>
---
# Daily forecast up to 5 days, by place

> Kept by incident.ipma@web-summit.dinis, 11 November 2026, 05:49 UTC

[IPMA's open data](../index.md) · [Warnings over time](../warnings.md) · [Stations](../stations.md) · [The sea](../sea.md) · [Cities: forecast and observed](../cities.md) · [The API, mapped](../api.md) · [What we learned](../learned.md) · [Browse the files](../data.md) · [Licence and terms](../licence.md)

IPMA's name for it: *Previsão Meteorológica Diária até 5 dias agregada por Local*. Documented at [api.ipma.pt](https://api.ipma.pt/). Drawn at [cities](../cities.md).

| | |
|---|---|
| Address | `https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/{globalIdLocal}.json` |
| Format | JSON |
| Shape | {owner, country, globalIdLocal, dataUpdate, data: [one object per day]} |
| `{globalIdLocal}` | every globalIdLocal in distrits-islands.json |
| IPMA says it updates | taxa de atualização horária; the model runs twice a day: "a corrida das 00UTC (disponibilizada em regra a partir das 10:00) e das 12UTC (disponibilizada em regra a partir das 20:00)" |
| IPMA's file dated (its Last-Modified header) | 2026-11-11 05:31 UTC |
| We last read it | 2026-11-11 05:46 UTC, 35 files, 41490 bytes |
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
| [forecast/meteorology/cities/daily/1010500.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1010500.json) | 200 | 1197 | `e4037a03c3ec9cd0…` | 2026-11-11 05:31 | 2026-11-11 05:46 |
| [forecast/meteorology/cities/daily/1020500.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1020500.json) | 200 | 1194 | `1b9e78060364404a…` | 2026-11-11 05:31 | 2026-11-11 05:46 |
| [forecast/meteorology/cities/daily/1030300.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1030300.json) | 200 | 1194 | `be10dfc0bf25170e…` | 2026-11-11 05:31 | 2026-11-11 05:46 |
| [forecast/meteorology/cities/daily/1030800.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1030800.json) | 200 | 1194 | `4b30faa9966d941c…` | 2026-11-11 05:31 | 2026-11-11 05:46 |
| [forecast/meteorology/cities/daily/1040200.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1040200.json) | 200 | 1191 | `a6cccea9a3cbfda2…` | 2026-11-11 05:31 | 2026-11-11 05:46 |
| [forecast/meteorology/cities/daily/1050200.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1050200.json) | 200 | 1195 | `910081f585af57e2…` | 2026-11-11 05:31 | 2026-11-11 05:46 |
| [forecast/meteorology/cities/daily/1060300.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1060300.json) | 200 | 1194 | `3bb77cace6c84a01…` | 2026-11-11 05:31 | 2026-11-11 05:46 |
| [forecast/meteorology/cities/daily/1070500.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1070500.json) | 200 | 1195 | `84265546c0ef2cd3…` | 2026-11-11 05:31 | 2026-11-11 05:46 |
| [forecast/meteorology/cities/daily/1080500.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1080500.json) | 200 | 1189 | `2d06dd6f48aefe2f…` | 2026-11-11 05:31 | 2026-11-11 05:46 |
| [forecast/meteorology/cities/daily/1081505.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1081505.json) | 200 | 1191 | `b88918f0189b3b60…` | 2026-11-11 05:31 | 2026-11-11 05:47 |
| [forecast/meteorology/cities/daily/1081100.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1081100.json) | 200 | 1189 | `946c8df2cf0e46a8…` | 2026-11-11 05:31 | 2026-11-11 05:47 |
| [forecast/meteorology/cities/daily/1080800.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1080800.json) | 200 | 1189 | `868c2f21f1ee290a…` | 2026-11-11 05:31 | 2026-11-11 05:47 |
| [forecast/meteorology/cities/daily/1090700.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1090700.json) | 200 | 1188 | `7f24c7af9caf7b9c…` | 2026-11-11 05:31 | 2026-11-11 05:47 |
| [forecast/meteorology/cities/daily/1090821.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1090821.json) | 200 | 1186 | `c55751d9800ad8dd…` | 2026-11-11 05:31 | 2026-11-11 05:47 |
| [forecast/meteorology/cities/daily/1100900.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1100900.json) | 200 | 1196 | `5391e671bceaaac9…` | 2026-11-11 05:31 | 2026-11-11 05:47 |
| [forecast/meteorology/cities/daily/1110600.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1110600.json) | 200 | 1192 | `25f7457d67c2a791…` | 2026-11-11 05:31 | 2026-11-11 05:47 |
| [forecast/meteorology/cities/daily/1121400.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1121400.json) | 200 | 1194 | `015e9d4f174ca40b…` | 2026-11-11 05:31 | 2026-11-11 05:47 |
| [forecast/meteorology/cities/daily/1131200.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1131200.json) | 200 | 1194 | `935518d590121b12…` | 2026-11-11 05:31 | 2026-11-11 05:47 |
| [forecast/meteorology/cities/daily/1141600.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1141600.json) | 200 | 1194 | `392d6a464033800e…` | 2026-11-11 05:31 | 2026-11-11 05:47 |
| [forecast/meteorology/cities/daily/1151200.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1151200.json) | 200 | 1192 | `7a12e34fb9f4480b…` | 2026-11-11 05:31 | 2026-11-11 05:47 |
| [forecast/meteorology/cities/daily/1151300.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1151300.json) | 200 | 1191 | `1a68bf43e18cdee6…` | 2026-11-11 05:31 | 2026-11-11 05:47 |
| [forecast/meteorology/cities/daily/1160900.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1160900.json) | 200 | 1194 | `e358d0f789aefd3c…` | 2026-11-11 05:31 | 2026-11-11 05:47 |
| [forecast/meteorology/cities/daily/1171400.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1171400.json) | 200 | 1191 | `81d2f47f5f716a97…` | 2026-11-11 05:31 | 2026-11-11 05:47 |
| [forecast/meteorology/cities/daily/1182300.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1182300.json) | 200 | 1192 | `8b5b4bdc88a399ab…` | 2026-11-11 05:31 | 2026-11-11 05:47 |
| [forecast/meteorology/cities/daily/2310300.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/2310300.json) | 200 | 1156 | `f9682ad9a348eaa7…` | 2026-11-11 05:31 | 2026-11-11 05:47 |
| [forecast/meteorology/cities/daily/2320100.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/2320100.json) | 200 | 1119 | `4ae8419ecb9ca461…` | 2026-11-11 05:31 | 2026-11-11 05:47 |
| [forecast/meteorology/cities/daily/3410100.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3410100.json) | 200 | 1139 | `a5c5d5b35c52c5f5…` | 2026-11-11 05:31 | 2026-11-11 05:47 |
| [forecast/meteorology/cities/daily/3420300.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3420300.json) | 200 | 1178 | `b8c8613f4bfbdb1d…` | 2026-11-11 05:31 | 2026-11-11 05:47 |
| [forecast/meteorology/cities/daily/3430100.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3430100.json) | 200 | 1198 | `9efffba1074f3a97…` | 2026-11-11 05:31 | 2026-11-11 05:47 |
| [forecast/meteorology/cities/daily/3440100.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3440100.json) | 200 | 1177 | `80da8a51984e42e9…` | 2026-11-11 05:31 | 2026-11-11 05:48 |
| [forecast/meteorology/cities/daily/3450200.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3450200.json) | 200 | 1196 | `57683fb92958a18e…` | 2026-11-11 05:31 | 2026-11-11 05:48 |
| [forecast/meteorology/cities/daily/3460200.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3460200.json) | 200 | 1198 | `5d1d06bd924d0f44…` | 2026-11-11 05:31 | 2026-11-11 05:48 |
| [forecast/meteorology/cities/daily/3470100.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3470100.json) | 200 | 1198 | `42cb2b98c3029997…` | 2026-11-11 05:31 | 2026-11-11 05:48 |
| [forecast/meteorology/cities/daily/3480200.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3480200.json) | 200 | 1158 | `91ce955ea148370d…` | 2026-11-11 05:31 | 2026-11-11 05:48 |
| [forecast/meteorology/cities/daily/3490100.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3490100.json) | 200 | 1157 | `0a37a10dd76ebade…` | 2026-11-11 05:31 | 2026-11-11 05:48 |

The links go to IPMA's live files. Full hashes: [latest.json](../latest.json). What changed between reads: [changes/city-daily.json](../changes/city-daily.json). Our small files made from it: [data/cities.json](../data.md#data/cities.json).
