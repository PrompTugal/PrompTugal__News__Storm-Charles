---
title: Daily forecast up to 5 days, by place · IPMA
summary: IPMA's "Daily forecast up to 5 days, by place": the address, each field with its meaning and unit, how often it changes, what we read and what changed.
mount: <div class="ipma" data-view="api" data-base="../" data-endpoint="city-daily"><p class="meta">This view is drawn in the browser from the JSON files linked below. Without JavaScript, read the tables on this page.</p></div>
head: <link rel="stylesheet" href="../../../app/sources/ipma/ipma.css"><script src="../../../app/sources/ipma/ipma.js" defer></script>
---
# Daily forecast up to 5 days, by place

> Kept by incident.ipma@web-summit.dinis, 12 November 2026, 09:53 UTC

[IPMA's open data](../index.md) · [Warnings over time](../warnings.md) · [Stations](../stations.md) · [The sea](../sea.md) · [Cities: forecast and observed](../cities.md) · [The API, mapped](../api.md) · [What we learned](../learned.md) · [Browse the files](../data.md) · [Licence and terms](../licence.md)

IPMA's name for it: *Previsão Meteorológica Diária até 5 dias agregada por Local*. Documented at [api.ipma.pt](https://api.ipma.pt/). Drawn at [cities](../cities.md).

| | |
|---|---|
| Address | `https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/{globalIdLocal}.json` |
| Format | JSON |
| Shape | {owner, country, globalIdLocal, dataUpdate, data: [one object per day]} |
| `{globalIdLocal}` | every globalIdLocal in distrits-islands.json |
| IPMA says it updates | taxa de atualização horária; the model runs twice a day: "a corrida das 00UTC (disponibilizada em regra a partir das 10:00) e das 12UTC (disponibilizada em regra a partir das 20:00)" |
| IPMA's file dated (its Last-Modified header) | 2026-11-12 09:31 UTC |
| We last read it | 2026-11-12 09:50 UTC, 35 files, 41434 bytes |
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
| [forecast/meteorology/cities/daily/1010500.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1010500.json) | 200 | 1197 | `083de8e5934ba4e6…` | 2026-11-12 09:31 | 2026-11-12 09:50 |
| [forecast/meteorology/cities/daily/1020500.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1020500.json) | 200 | 1174 | `4cbd083f2771d0d8…` | 2026-11-12 09:31 | 2026-11-12 09:50 |
| [forecast/meteorology/cities/daily/1030300.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1030300.json) | 200 | 1195 | `556475461ae4d916…` | 2026-11-12 09:31 | 2026-11-12 09:50 |
| [forecast/meteorology/cities/daily/1030800.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1030800.json) | 200 | 1197 | `e85f100443a2b5b1…` | 2026-11-12 09:31 | 2026-11-12 09:50 |
| [forecast/meteorology/cities/daily/1040200.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1040200.json) | 200 | 1192 | `7ccfb947babba306…` | 2026-11-12 09:31 | 2026-11-12 09:50 |
| [forecast/meteorology/cities/daily/1050200.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1050200.json) | 200 | 1194 | `94035fe60d72f503…` | 2026-11-12 09:31 | 2026-11-12 09:50 |
| [forecast/meteorology/cities/daily/1060300.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1060300.json) | 200 | 1194 | `db36d12854af0064…` | 2026-11-12 09:31 | 2026-11-12 09:50 |
| [forecast/meteorology/cities/daily/1070500.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1070500.json) | 200 | 1194 | `48bf2b02974d1890…` | 2026-11-12 09:31 | 2026-11-12 09:50 |
| [forecast/meteorology/cities/daily/1080500.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1080500.json) | 200 | 1171 | `1855151747bf20fc…` | 2026-11-12 09:31 | 2026-11-12 09:50 |
| [forecast/meteorology/cities/daily/1081505.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1081505.json) | 200 | 1191 | `841ea0d1f763a3cf…` | 2026-11-12 09:31 | 2026-11-12 09:50 |
| [forecast/meteorology/cities/daily/1081100.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1081100.json) | 200 | 1190 | `58cb751fae1fdf70…` | 2026-11-12 09:31 | 2026-11-12 09:50 |
| [forecast/meteorology/cities/daily/1080800.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1080800.json) | 200 | 1192 | `b6038f62f3504677…` | 2026-11-12 09:31 | 2026-11-12 09:50 |
| [forecast/meteorology/cities/daily/1090700.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1090700.json) | 200 | 1187 | `5d4520c288abf257…` | 2026-11-12 09:31 | 2026-11-12 09:50 |
| [forecast/meteorology/cities/daily/1090821.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1090821.json) | 200 | 1189 | `42ba30ac4dc98e1b…` | 2026-11-12 09:31 | 2026-11-12 09:51 |
| [forecast/meteorology/cities/daily/1100900.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1100900.json) | 200 | 1194 | `9fd737c8dd3c2c3f…` | 2026-11-12 09:31 | 2026-11-12 09:51 |
| [forecast/meteorology/cities/daily/1110600.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1110600.json) | 200 | 1192 | `41be48a2594884c9…` | 2026-11-12 09:31 | 2026-11-12 09:51 |
| [forecast/meteorology/cities/daily/1121400.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1121400.json) | 200 | 1196 | `09fbe16a266a80b1…` | 2026-11-12 09:31 | 2026-11-12 09:51 |
| [forecast/meteorology/cities/daily/1131200.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1131200.json) | 200 | 1197 | `ddca0b203caa3c8a…` | 2026-11-12 09:31 | 2026-11-12 09:51 |
| [forecast/meteorology/cities/daily/1141600.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1141600.json) | 200 | 1193 | `d3d236abc48fd09b…` | 2026-11-12 09:31 | 2026-11-12 09:51 |
| [forecast/meteorology/cities/daily/1151200.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1151200.json) | 200 | 1193 | `0983e5963363fcb5…` | 2026-11-12 09:31 | 2026-11-12 09:51 |
| [forecast/meteorology/cities/daily/1151300.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1151300.json) | 200 | 1193 | `dd9527f578a4e57f…` | 2026-11-12 09:31 | 2026-11-12 09:51 |
| [forecast/meteorology/cities/daily/1160900.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1160900.json) | 200 | 1196 | `9af73fd2827841b3…` | 2026-11-12 09:31 | 2026-11-12 09:51 |
| [forecast/meteorology/cities/daily/1171400.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1171400.json) | 200 | 1192 | `48f7e6cfbbf9039f…` | 2026-11-12 09:31 | 2026-11-12 09:51 |
| [forecast/meteorology/cities/daily/1182300.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1182300.json) | 200 | 1193 | `8ea876297deb70f8…` | 2026-11-12 09:31 | 2026-11-12 09:51 |
| [forecast/meteorology/cities/daily/2310300.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/2310300.json) | 200 | 1134 | `d01549f3fa64e9e2…` | 2026-11-12 09:31 | 2026-11-12 09:51 |
| [forecast/meteorology/cities/daily/2320100.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/2320100.json) | 200 | 1094 | `4b725f9b884912ad…` | 2026-11-12 09:31 | 2026-11-12 09:51 |
| [forecast/meteorology/cities/daily/3410100.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3410100.json) | 200 | 1137 | `20ce01cddcb1225e…` | 2026-11-12 09:31 | 2026-11-12 09:51 |
| [forecast/meteorology/cities/daily/3420300.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3420300.json) | 200 | 1177 | `99ddb19c3cfbd9f3…` | 2026-11-12 09:31 | 2026-11-12 09:51 |
| [forecast/meteorology/cities/daily/3430100.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3430100.json) | 200 | 1199 | `63e49c5014c42558…` | 2026-11-12 09:31 | 2026-11-12 09:51 |
| [forecast/meteorology/cities/daily/3440100.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3440100.json) | 200 | 1180 | `b1c05d602754bd61…` | 2026-11-12 09:31 | 2026-11-12 09:51 |
| [forecast/meteorology/cities/daily/3450200.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3450200.json) | 200 | 1179 | `4a42c24608893af8…` | 2026-11-12 09:31 | 2026-11-12 09:51 |
| [forecast/meteorology/cities/daily/3460200.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3460200.json) | 200 | 1202 | `4a3c2609c42104ca…` | 2026-11-12 09:31 | 2026-11-12 09:51 |
| [forecast/meteorology/cities/daily/3470100.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3470100.json) | 200 | 1179 | `54a6693e7d1d0c7d…` | 2026-11-12 09:31 | 2026-11-12 09:51 |
| [forecast/meteorology/cities/daily/3480200.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3480200.json) | 200 | 1178 | `47c46ec54e46ed59…` | 2026-11-12 09:31 | 2026-11-12 09:52 |
| [forecast/meteorology/cities/daily/3490100.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3490100.json) | 200 | 1179 | `34ce03f0b2706472…` | 2026-11-12 09:31 | 2026-11-12 09:52 |

The links go to IPMA's live files. Full hashes: [latest.json](../latest.json). What changed between reads: [changes/city-daily.json](../changes/city-daily.json). Our small files made from it: [data/cities.json](../data.md#data/cities.json).
