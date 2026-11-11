---
title: Sea state forecast up to 3 days, by day · IPMA
summary: IPMA's "Sea state forecast up to 3 days, by day": the address, each field with its meaning and unit, how often it changes, what we read and what changed.
mount: <div class="ipma" data-view="api" data-base="../" data-endpoint="sea-forecast"><p class="meta">This view is drawn in the browser from the JSON files linked below. Without JavaScript, read the tables on this page.</p></div>
head: <link rel="stylesheet" href="../../../app/sources/ipma/ipma.css"><script src="../../../app/sources/ipma/ipma.js" defer></script>
---
# Sea state forecast up to 3 days, by day

> Kept by incident.ipma@web-summit.dinis, 11 November 2026, 06:49 UTC

[IPMA's open data](../index.md) · [Warnings over time](../warnings.md) · [Stations](../stations.md) · [The sea](../sea.md) · [Cities: forecast and observed](../cities.md) · [The API, mapped](../api.md) · [What we learned](../learned.md) · [Browse the files](../data.md) · [Licence and terms](../licence.md)

IPMA's name for it: *Previsão do Estado do Mar até 3 dias, informação agregada por dia*. Documented at [api.ipma.pt](https://api.ipma.pt/). Drawn at [sea](../sea.md).

| | |
|---|---|
| Address | `https://api.ipma.pt/open-data/forecast/oceanography/daily/hp-daily-sea-forecast-day{idDay}.json` |
| Format | JSON |
| Shape | {owner, country, forecastDate, dataUpdate, data: [one object per coastal place]} |
| `{idDay}` | 0 today, 1 tomorrow, 2 the day after: 0, 1, 2 |
| IPMA says it updates | taxa de atualização horária |
| IPMA's file dated (its Last-Modified header) | 2026-11-11 06:31 UTC |
| We last read it | 2026-11-11 06:48 UTC, 3 files, 9824 bytes |
| IPMA's note | "Apenas estão disponíveis dados diários." |

## Fields

| Field | Type | Unit | Meaning (our English) | IPMA's wording | Where the documentation differs |
|---|---|---|---|---|---|
| `globalIdLocal` | integer | · | the coastal place: an id from sea-locations.json (a node: sea-place) | · | · |
| `totalSeaMin` | number | m | daily minimum of significant wave height | "mínimo diário da altura significativa das ondas, em metros" | · |
| `totalSeaMax` | number | m | daily maximum of significant wave height | · | · |
| `waveHighMin` | string | m | daily minimum of swell height | "mínimo diário da altura da ondulação (swell) em metros" | · |
| `waveHighMax` | string | m | daily maximum of swell height | · | · |
| `wavePeriodMin` | string | s | daily minimum of the swell's peak period | · | · |
| `wavePeriodMax` | string | s | daily maximum of the swell's peak period | · | · |
| `predWaveDir` | string | · | prevailing wave direction (N, NE, E, SE, S, SW, W, NW) | · | · |
| `sstMin` | string | °C | daily minimum of sea surface temperature | · | · |
| `sstMax` | string | °C | daily maximum of sea surface temperature | · | · |
| `latitude` | string (decimal degrees) | ° | latitude of the place | · | · |
| `longitude` | string (decimal degrees) | ° | longitude of the place | · | · |

## Not documented

- which wave model and run



## Files read

| File | Answer | Bytes | sha256 | IPMA's file dated (UTC) | We read it (UTC) |
|---|---|---|---|---|---|
| [forecast/oceanography/daily/hp-daily-sea-forecast-day0.json](https://api.ipma.pt/open-data/forecast/oceanography/daily/hp-daily-sea-forecast-day0.json) | 200 | 3276 | `7eb205c48a62547b…` | 2026-11-11 06:31 | 2026-11-11 06:48 |
| [forecast/oceanography/daily/hp-daily-sea-forecast-day1.json](https://api.ipma.pt/open-data/forecast/oceanography/daily/hp-daily-sea-forecast-day1.json) | 200 | 3275 | `9170a22ba4088059…` | 2026-11-11 06:31 | 2026-11-11 06:48 |
| [forecast/oceanography/daily/hp-daily-sea-forecast-day2.json](https://api.ipma.pt/open-data/forecast/oceanography/daily/hp-daily-sea-forecast-day2.json) | 200 | 3273 | `83b74864b1a78742…` | 2026-11-11 06:31 | 2026-11-11 06:48 |

The links go to IPMA's live files. Full hashes: [latest.json](../latest.json). What changed between reads: [changes/sea-forecast.json](../changes/sea-forecast.json). Our small files made from it: [data/sea.json](../data.md#data/sea.json).
