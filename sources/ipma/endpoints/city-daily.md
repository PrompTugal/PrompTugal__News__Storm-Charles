---
title: Daily forecast up to 5 days, by place · IPMA
summary: IPMA's "Daily forecast up to 5 days, by place": the address, each field with its meaning and unit, how often it changes, what we read and what changed.
mount: <div class="ipma" data-view="api" data-base="../" data-endpoint="city-daily"><p class="meta">This view is drawn in the browser from the JSON files linked below. Without JavaScript, read the tables on this page.</p></div>
head: <link rel="stylesheet" href="../../../app/sources/ipma/ipma.css"><script src="../../../app/sources/ipma/ipma.js" defer></script>
---
# Daily forecast up to 5 days, by place

> Kept by incident.ipma@web-summit.dinis, 12 November 2026, 08:51 UTC

[IPMA's open data](../index.md) · [Warnings over time](../warnings.md) · [Stations](../stations.md) · [The sea](../sea.md) · [Cities: forecast and observed](../cities.md) · [The API, mapped](../api.md) · [What we learned](../learned.md) · [Browse the files](../data.md) · [Licence and terms](../licence.md)

IPMA's name for it: *Previsão Meteorológica Diária até 5 dias agregada por Local*. Documented at [api.ipma.pt](https://api.ipma.pt/). Drawn at [cities](../cities.md).

| | |
|---|---|
| Address | `https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/{globalIdLocal}.json` |
| Format | JSON |
| Shape | {owner, country, globalIdLocal, dataUpdate, data: [one object per day]} |
| `{globalIdLocal}` | every globalIdLocal in distrits-islands.json |
| IPMA says it updates | taxa de atualização horária; the model runs twice a day: "a corrida das 00UTC (disponibilizada em regra a partir das 10:00) e das 12UTC (disponibilizada em regra a partir das 20:00)" |
| IPMA's file dated (its Last-Modified header) | 2026-11-12 08:31 UTC |
| We last read it | 2026-11-12 08:48 UTC, 35 files, 41434 bytes |
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
| [forecast/meteorology/cities/daily/1010500.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1010500.json) | 200 | 1197 | `6f33ec764d06f585…` | 2026-11-12 08:31 | 2026-11-12 08:48 |
| [forecast/meteorology/cities/daily/1020500.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1020500.json) | 200 | 1174 | `243caa410ea080e6…` | 2026-11-12 08:31 | 2026-11-12 08:48 |
| [forecast/meteorology/cities/daily/1030300.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1030300.json) | 200 | 1195 | `248925e300315d78…` | 2026-11-12 08:31 | 2026-11-12 08:48 |
| [forecast/meteorology/cities/daily/1030800.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1030800.json) | 200 | 1197 | `073e88dbd3c6daf7…` | 2026-11-12 08:31 | 2026-11-12 08:48 |
| [forecast/meteorology/cities/daily/1040200.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1040200.json) | 200 | 1192 | `0c4bfe597049354d…` | 2026-11-12 08:31 | 2026-11-12 08:48 |
| [forecast/meteorology/cities/daily/1050200.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1050200.json) | 200 | 1194 | `cf8d0d317ff8b4eb…` | 2026-11-12 08:31 | 2026-11-12 08:48 |
| [forecast/meteorology/cities/daily/1060300.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1060300.json) | 200 | 1194 | `3c61199d29b0779b…` | 2026-11-12 08:31 | 2026-11-12 08:48 |
| [forecast/meteorology/cities/daily/1070500.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1070500.json) | 200 | 1194 | `265b5c10bf49fd73…` | 2026-11-12 08:31 | 2026-11-12 08:48 |
| [forecast/meteorology/cities/daily/1080500.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1080500.json) | 200 | 1171 | `d402d60041759696…` | 2026-11-12 08:31 | 2026-11-12 08:48 |
| [forecast/meteorology/cities/daily/1081505.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1081505.json) | 200 | 1191 | `a8ecd4a83f2f7f4d…` | 2026-11-12 08:31 | 2026-11-12 08:48 |
| [forecast/meteorology/cities/daily/1081100.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1081100.json) | 200 | 1190 | `ab7a0ee1c1c4c94f…` | 2026-11-12 08:31 | 2026-11-12 08:49 |
| [forecast/meteorology/cities/daily/1080800.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1080800.json) | 200 | 1192 | `4bd35db4724eba7a…` | 2026-11-12 08:31 | 2026-11-12 08:49 |
| [forecast/meteorology/cities/daily/1090700.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1090700.json) | 200 | 1187 | `c578eac318fc5dae…` | 2026-11-12 08:31 | 2026-11-12 08:49 |
| [forecast/meteorology/cities/daily/1090821.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1090821.json) | 200 | 1189 | `93794e82ef876aa5…` | 2026-11-12 08:31 | 2026-11-12 08:49 |
| [forecast/meteorology/cities/daily/1100900.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1100900.json) | 200 | 1194 | `e0056f52d42f13c4…` | 2026-11-12 08:31 | 2026-11-12 08:49 |
| [forecast/meteorology/cities/daily/1110600.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1110600.json) | 200 | 1192 | `9cce1876f40e8577…` | 2026-11-12 08:31 | 2026-11-12 08:49 |
| [forecast/meteorology/cities/daily/1121400.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1121400.json) | 200 | 1196 | `11683d63ea043e96…` | 2026-11-12 08:31 | 2026-11-12 08:49 |
| [forecast/meteorology/cities/daily/1131200.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1131200.json) | 200 | 1197 | `26558853fe90107c…` | 2026-11-12 08:31 | 2026-11-12 08:49 |
| [forecast/meteorology/cities/daily/1141600.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1141600.json) | 200 | 1193 | `d5d0af7d13425b11…` | 2026-11-12 08:31 | 2026-11-12 08:49 |
| [forecast/meteorology/cities/daily/1151200.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1151200.json) | 200 | 1193 | `b27203b45d2d01bf…` | 2026-11-12 08:31 | 2026-11-12 08:49 |
| [forecast/meteorology/cities/daily/1151300.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1151300.json) | 200 | 1193 | `260740e2d828e567…` | 2026-11-12 08:31 | 2026-11-12 08:49 |
| [forecast/meteorology/cities/daily/1160900.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1160900.json) | 200 | 1196 | `d15659b9b8881bdb…` | 2026-11-12 08:31 | 2026-11-12 08:49 |
| [forecast/meteorology/cities/daily/1171400.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1171400.json) | 200 | 1192 | `14b0798fd75a3406…` | 2026-11-12 08:31 | 2026-11-12 08:49 |
| [forecast/meteorology/cities/daily/1182300.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1182300.json) | 200 | 1193 | `7d1064700d137b59…` | 2026-11-12 08:31 | 2026-11-12 08:49 |
| [forecast/meteorology/cities/daily/2310300.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/2310300.json) | 200 | 1134 | `b7a3c9a73bab73f2…` | 2026-11-12 08:31 | 2026-11-12 08:49 |
| [forecast/meteorology/cities/daily/2320100.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/2320100.json) | 200 | 1094 | `c4e8ef5d1c780721…` | 2026-11-12 08:31 | 2026-11-12 08:49 |
| [forecast/meteorology/cities/daily/3410100.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3410100.json) | 200 | 1137 | `37c21b5031c2bb36…` | 2026-11-12 08:31 | 2026-11-12 08:49 |
| [forecast/meteorology/cities/daily/3420300.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3420300.json) | 200 | 1177 | `d24c2a47ee94c809…` | 2026-11-12 08:31 | 2026-11-12 08:49 |
| [forecast/meteorology/cities/daily/3430100.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3430100.json) | 200 | 1199 | `8841130867e64b2d…` | 2026-11-12 08:31 | 2026-11-12 08:49 |
| [forecast/meteorology/cities/daily/3440100.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3440100.json) | 200 | 1180 | `ddfddc86cfe68d43…` | 2026-11-12 08:31 | 2026-11-12 08:49 |
| [forecast/meteorology/cities/daily/3450200.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3450200.json) | 200 | 1179 | `db88aee39c870c80…` | 2026-11-12 08:31 | 2026-11-12 08:50 |
| [forecast/meteorology/cities/daily/3460200.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3460200.json) | 200 | 1202 | `baf8572c9ea76b18…` | 2026-11-12 08:31 | 2026-11-12 08:50 |
| [forecast/meteorology/cities/daily/3470100.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3470100.json) | 200 | 1179 | `b426046c2b6f2f22…` | 2026-11-12 08:31 | 2026-11-12 08:50 |
| [forecast/meteorology/cities/daily/3480200.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3480200.json) | 200 | 1178 | `5a7ece06750350e4…` | 2026-11-12 08:31 | 2026-11-12 08:50 |
| [forecast/meteorology/cities/daily/3490100.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3490100.json) | 200 | 1179 | `e541d4347b784ce1…` | 2026-11-12 08:31 | 2026-11-12 08:50 |

The links go to IPMA's live files. Full hashes: [latest.json](../latest.json). What changed between reads: [changes/city-daily.json](../changes/city-daily.json). Our small files made from it: [data/cities.json](../data.md#data/cities.json).
