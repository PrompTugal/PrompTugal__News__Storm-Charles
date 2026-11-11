---
title: Weather types · IPMA
summary: IPMA's "Weather types": the address, each field with its meaning and unit, how often it changes, what we read and what changed.
mount: <div class="ipma" data-view="api" data-base="../" data-endpoint="weather-types"><p class="meta">This view is drawn in the browser from the JSON files linked below. Without JavaScript, read the tables on this page.</p></div>
head: <link rel="stylesheet" href="../../../app/sources/ipma/ipma.css"><script src="../../../app/sources/ipma/ipma.js" defer></script>
---
# Weather types

> Kept by incident.ipma@web-summit.dinis, 11 November 2026, 06:49 UTC

[IPMA's open data](../index.md) · [Warnings over time](../warnings.md) · [Stations](../stations.md) · [The sea](../sea.md) · [Cities: forecast and observed](../cities.md) · [The API, mapped](../api.md) · [What we learned](../learned.md) · [Browse the files](../data.md) · [Licence and terms](../licence.md)

IPMA's name for it: *Lista de identificadores do tempo significativo*. Documented at [api.ipma.pt](https://api.ipma.pt/).

| | |
|---|---|
| Address | `https://api.ipma.pt/open-data/weather-type-classe.json` |
| Format | JSON |
| Shape | · |
| IPMA says it updates | not stated |
| IPMA's file dated (its Last-Modified header) | 2024-06-07 09:55 UTC |
| We last read it | 2026-11-11 06:45 UTC, 1 file, 4954 bytes |

## Fields

| Field | Type | Unit | Meaning (our English) | IPMA's wording | Where the documentation differs |
|---|---|---|---|---|---|
| `idWeatherType` | integer | · | the code (a node: weather-type) | · | · |
| `descWeatherTypeEN` | string | · | in English | · | · |
| `descWeatherTypePT` | string | · | in Portuguese | · | · |





## Files read

| File | Answer | Bytes | sha256 | IPMA's file dated (UTC) | We read it (UTC) |
|---|---|---|---|---|---|
| [weather-type-classe.json](https://api.ipma.pt/open-data/weather-type-classe.json) | 200 | 4954 | `8727e4e98344696b…` | 2024-06-07 09:55 | 2026-11-11 06:45 |

The links go to IPMA's live files. Full hashes: [latest.json](../latest.json). What changed between reads: no change seen yet between two of our reads. Our small files made from it: [data/cities.json](../data.md#data/cities.json).
