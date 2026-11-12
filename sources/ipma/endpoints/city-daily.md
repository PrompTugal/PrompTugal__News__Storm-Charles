---
title: Daily forecast up to 5 days, by place · IPMA
summary: IPMA's "Daily forecast up to 5 days, by place": the address, each field with its meaning and unit, how often it changes, what we read and what changed.
mount: <div class="ipma" data-view="api" data-base="../" data-endpoint="city-daily"><p class="meta">This view is drawn in the browser from the JSON files linked below. Without JavaScript, read the tables on this page.</p></div>
head: <link rel="stylesheet" href="../../../app/sources/ipma/ipma.css"><script src="../../../app/sources/ipma/ipma.js" defer></script>
---
# Daily forecast up to 5 days, by place

> Kept by incident.ipma@web-summit.dinis, 12 November 2026, 07:52 UTC

[IPMA's open data](../index.md) · [Warnings over time](../warnings.md) · [Stations](../stations.md) · [The sea](../sea.md) · [Cities: forecast and observed](../cities.md) · [The API, mapped](../api.md) · [What we learned](../learned.md) · [Browse the files](../data.md) · [Licence and terms](../licence.md)

IPMA's name for it: *Previsão Meteorológica Diária até 5 dias agregada por Local*. Documented at [api.ipma.pt](https://api.ipma.pt/). Drawn at [cities](../cities.md).

| | |
|---|---|
| Address | `https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/{globalIdLocal}.json` |
| Format | JSON |
| Shape | {owner, country, globalIdLocal, dataUpdate, data: [one object per day]} |
| `{globalIdLocal}` | every globalIdLocal in distrits-islands.json |
| IPMA says it updates | taxa de atualização horária; the model runs twice a day: "a corrida das 00UTC (disponibilizada em regra a partir das 10:00) e das 12UTC (disponibilizada em regra a partir das 20:00)" |
| IPMA's file dated (its Last-Modified header) | 2026-11-12 07:31 UTC |
| We last read it | 2026-11-12 07:49 UTC, 35 files, 41455 bytes |
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
| [forecast/meteorology/cities/daily/1010500.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1010500.json) | 200 | 1195 | `155dbde91e2d2859…` | 2026-11-12 07:31 | 2026-11-12 07:49 |
| [forecast/meteorology/cities/daily/1020500.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1020500.json) | 200 | 1192 | `11ed0bb48dce9620…` | 2026-11-12 07:31 | 2026-11-12 07:49 |
| [forecast/meteorology/cities/daily/1030300.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1030300.json) | 200 | 1194 | `5b6d38e2d8920325…` | 2026-11-12 07:31 | 2026-11-12 07:49 |
| [forecast/meteorology/cities/daily/1030800.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1030800.json) | 200 | 1196 | `4515fcfc3b0b2e07…` | 2026-11-12 07:31 | 2026-11-12 07:49 |
| [forecast/meteorology/cities/daily/1040200.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1040200.json) | 200 | 1189 | `5baeb3f06453f7e0…` | 2026-11-12 07:31 | 2026-11-12 07:49 |
| [forecast/meteorology/cities/daily/1050200.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1050200.json) | 200 | 1196 | `d2bd614bf6781e47…` | 2026-11-12 07:31 | 2026-11-12 07:49 |
| [forecast/meteorology/cities/daily/1060300.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1060300.json) | 200 | 1192 | `8acc46ee7203c605…` | 2026-11-12 07:31 | 2026-11-12 07:49 |
| [forecast/meteorology/cities/daily/1070500.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1070500.json) | 200 | 1195 | `45c6de5386b3e26c…` | 2026-11-12 07:31 | 2026-11-12 07:49 |
| [forecast/meteorology/cities/daily/1080500.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1080500.json) | 200 | 1190 | `66fdba86456a1c55…` | 2026-11-12 07:31 | 2026-11-12 07:49 |
| [forecast/meteorology/cities/daily/1081505.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1081505.json) | 200 | 1192 | `425eda4d8734185b…` | 2026-11-12 07:31 | 2026-11-12 07:49 |
| [forecast/meteorology/cities/daily/1081100.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1081100.json) | 200 | 1192 | `438b041abe55d9bf…` | 2026-11-12 07:31 | 2026-11-12 07:49 |
| [forecast/meteorology/cities/daily/1080800.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1080800.json) | 200 | 1192 | `452be0359c3bf051…` | 2026-11-12 07:31 | 2026-11-12 07:49 |
| [forecast/meteorology/cities/daily/1090700.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1090700.json) | 200 | 1185 | `c62543016050f521…` | 2026-11-12 07:31 | 2026-11-12 07:49 |
| [forecast/meteorology/cities/daily/1090821.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1090821.json) | 200 | 1184 | `2f92b9b760c92bef…` | 2026-11-12 07:31 | 2026-11-12 07:49 |
| [forecast/meteorology/cities/daily/1100900.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1100900.json) | 200 | 1195 | `4a6c3195dd412c51…` | 2026-11-12 07:31 | 2026-11-12 07:50 |
| [forecast/meteorology/cities/daily/1110600.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1110600.json) | 200 | 1192 | `1f308dfb5f3f20a9…` | 2026-11-12 07:31 | 2026-11-12 07:50 |
| [forecast/meteorology/cities/daily/1121400.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1121400.json) | 200 | 1196 | `b9257133dc43981d…` | 2026-11-12 07:31 | 2026-11-12 07:50 |
| [forecast/meteorology/cities/daily/1131200.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1131200.json) | 200 | 1196 | `e5f1d1e233ffff7d…` | 2026-11-12 07:31 | 2026-11-12 07:50 |
| [forecast/meteorology/cities/daily/1141600.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1141600.json) | 200 | 1192 | `c2600b15b5d344c6…` | 2026-11-12 07:31 | 2026-11-12 07:50 |
| [forecast/meteorology/cities/daily/1151200.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1151200.json) | 200 | 1191 | `70504e83d31d0fc9…` | 2026-11-12 07:31 | 2026-11-12 07:50 |
| [forecast/meteorology/cities/daily/1151300.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1151300.json) | 200 | 1192 | `bef32840b57af3c6…` | 2026-11-12 07:31 | 2026-11-12 07:50 |
| [forecast/meteorology/cities/daily/1160900.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1160900.json) | 200 | 1195 | `9919f45aa336a6f8…` | 2026-11-12 07:31 | 2026-11-12 07:50 |
| [forecast/meteorology/cities/daily/1171400.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1171400.json) | 200 | 1189 | `719ad5fdd43c298f…` | 2026-11-12 07:31 | 2026-11-12 07:50 |
| [forecast/meteorology/cities/daily/1182300.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/1182300.json) | 200 | 1194 | `d3c5f458a535e9f9…` | 2026-11-12 07:31 | 2026-11-12 07:50 |
| [forecast/meteorology/cities/daily/2310300.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/2310300.json) | 200 | 1115 | `726ed50ddfd30a26…` | 2026-11-12 07:31 | 2026-11-12 07:50 |
| [forecast/meteorology/cities/daily/2320100.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/2320100.json) | 200 | 1094 | `bb1ff3874efdbf37…` | 2026-11-12 07:31 | 2026-11-12 07:50 |
| [forecast/meteorology/cities/daily/3410100.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3410100.json) | 200 | 1137 | `65c63e5ec3a2b847…` | 2026-11-12 07:31 | 2026-11-12 07:50 |
| [forecast/meteorology/cities/daily/3420300.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3420300.json) | 200 | 1180 | `84db4259948580ba…` | 2026-11-12 07:31 | 2026-11-12 07:50 |
| [forecast/meteorology/cities/daily/3430100.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3430100.json) | 200 | 1199 | `29b2dc665d305286…` | 2026-11-12 07:31 | 2026-11-12 07:50 |
| [forecast/meteorology/cities/daily/3440100.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3440100.json) | 200 | 1179 | `574ef0fe74991db9…` | 2026-11-12 07:31 | 2026-11-12 07:50 |
| [forecast/meteorology/cities/daily/3450200.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3450200.json) | 200 | 1196 | `9e958053dedd3848…` | 2026-11-12 07:31 | 2026-11-12 07:50 |
| [forecast/meteorology/cities/daily/3460200.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3460200.json) | 200 | 1201 | `c5b3b16340965b27…` | 2026-11-12 07:31 | 2026-11-12 07:50 |
| [forecast/meteorology/cities/daily/3470100.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3470100.json) | 200 | 1180 | `5fe1f3f6246666ec…` | 2026-11-12 07:31 | 2026-11-12 07:50 |
| [forecast/meteorology/cities/daily/3480200.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3480200.json) | 200 | 1179 | `d98792b87c749d2f…` | 2026-11-12 07:31 | 2026-11-12 07:50 |
| [forecast/meteorology/cities/daily/3490100.json](https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/3490100.json) | 200 | 1179 | `39be01a78c75af27…` | 2026-11-12 07:31 | 2026-11-12 07:51 |

The links go to IPMA's live files. Full hashes: [latest.json](../latest.json). What changed between reads: [changes/city-daily.json](../changes/city-daily.json). Our small files made from it: [data/cities.json](../data.md#data/cities.json).
