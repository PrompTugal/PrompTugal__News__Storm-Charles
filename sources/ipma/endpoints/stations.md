---
title: Weather stations · IPMA
summary: IPMA's "Weather stations": the address, each field with its meaning and unit, how often it changes, what we read and what changed.
mount: <div class="ipma" data-view="api" data-base="../" data-endpoint="stations"><p class="meta">This view is drawn in the browser from the JSON files linked below. Without JavaScript, read the tables on this page.</p></div>
head: <link rel="stylesheet" href="../../../app/sources/ipma/ipma.css"><script src="../../../app/sources/ipma/ipma.js" defer></script>
---
# Weather stations

> Kept by incident.ipma@web-summit.dinis, 12 November 2026, 08:51 UTC

[IPMA's open data](../index.md) · [Warnings over time](../warnings.md) · [Stations](../stations.md) · [The sea](../sea.md) · [Cities: forecast and observed](../cities.md) · [The API, mapped](../api.md) · [What we learned](../learned.md) · [Browse the files](../data.md) · [Licence and terms](../licence.md)

IPMA's name for it: *Lista de identificadores das estações meteorológicas*. Documented at [api.ipma.pt](https://api.ipma.pt/). Drawn at [stations](../stations.md).

| | |
|---|---|
| Address | `https://api.ipma.pt/open-data/observation/meteorology/stations/stations.json` |
| Format | JSON |
| Shape | · |
| IPMA says it updates | not stated |
| IPMA's file dated (its Last-Modified header) | 2026-11-12 08:35 UTC |
| We last read it | 2026-11-12 08:48 UTC, 1 file, 49864 bytes |

## Fields

| Field | Type | Unit | Meaning (our English) | IPMA's wording | Where the documentation differs |
|---|---|---|---|---|---|
| `properties.idEstacao` | integer | · | the station's id (a node: station) | · | · |
| `properties.localEstacao` | string | · | the station's name | · | · |
| `geometry.coordinates` | [longitude, latitude] | ° | where the station is | · | · |

## Not documented

- altitude, district, the instruments at each station, the owner of the station



## Files read

| File | Answer | Bytes | sha256 | IPMA's file dated (UTC) | We read it (UTC) |
|---|---|---|---|---|---|
| [observation/meteorology/stations/stations.json](https://api.ipma.pt/open-data/observation/meteorology/stations/stations.json) | 200 | 49864 | `2d539b3686cc2c49…` | 2026-11-12 08:35 | 2026-11-12 08:48 |

The links go to IPMA's live files. Full hashes: [latest.json](../latest.json). What changed between reads: [changes/stations.json](../changes/stations.json). Our small files made from it: [data/stations.json](../data.md#data/stations.json).
