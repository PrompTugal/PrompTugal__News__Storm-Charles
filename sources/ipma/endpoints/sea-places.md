---
title: Coastal places · IPMA
summary: IPMA's "Coastal places": the address, each field with its meaning and unit, how often it changes, what we read and what changed.
mount: <div class="ipma" data-view="api" data-base="../" data-endpoint="sea-places"><p class="meta">This view is drawn in the browser from the JSON files linked below. Without JavaScript, read the tables on this page.</p></div>
head: <link rel="stylesheet" href="../../../app/sources/ipma/ipma.css"><script src="../../../app/sources/ipma/ipma.js" defer></script>
---
# Coastal places

> Kept by incident.ipma@web-summit.dinis, 11 November 2026, 05:49 UTC

[IPMA's open data](../index.md) · [Warnings over time](../warnings.md) · [Stations](../stations.md) · [The sea](../sea.md) · [Cities: forecast and observed](../cities.md) · [The API, mapped](../api.md) · [What we learned](../learned.md) · [Browse the files](../data.md) · [Licence and terms](../licence.md)

IPMA's name for it: *Lista de identificadores para as regiões costeiras*. Documented at [api.ipma.pt](https://api.ipma.pt/).

| | |
|---|---|
| Address | `https://api.ipma.pt/open-data/sea-locations.json` |
| Format | JSON |
| Shape | · |
| IPMA says it updates | not stated |
| IPMA's file dated (its Last-Modified header) | 2020-02-04 12:21 UTC |
| We last read it | 2026-11-11 05:46 UTC, 1 file, 2268 bytes |

## Fields

| Field | Type | Unit | Meaning (our English) | IPMA's wording | Where the documentation differs |
|---|---|---|---|---|---|
| `globalIdLocal` | integer | · | the coastal place's id (a node: sea-place) | · | · |
| `local` | string | · | its name | · | · |
| `idLocal` | integer | · | another id of the place | · | · |
| `idRegiao` | integer | · | 1 the mainland, 2 Madeira, 3 the Azores | · | · |
| `idAreaAviso` | string | · | the warning area (a node: area) | · | · |
| `latitude` | string (decimal degrees) | ° | latitude of the place | · | · |
| `longitude` | string (decimal degrees) | ° | longitude of the place | · | · |





## Files read

| File | Answer | Bytes | sha256 | IPMA's file dated (UTC) | We read it (UTC) |
|---|---|---|---|---|---|
| [sea-locations.json](https://api.ipma.pt/open-data/sea-locations.json) | 200 | 2268 | `fe0ffd2801bb8620…` | 2020-02-04 12:21 | 2026-11-11 05:46 |

The links go to IPMA's live files. Full hashes: [latest.json](../latest.json). What changed between reads: no change seen yet between two of our reads. Our small files made from it: [data/places.json](../data.md#data/places.json).
