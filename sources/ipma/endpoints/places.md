---
title: Places: district capitals and islands · IPMA
summary: IPMA's "Places: district capitals and islands": the address, each field with its meaning and unit, how often it changes, what we read and what changed.
mount: <div class="ipma" data-view="api" data-base="../" data-endpoint="places"><p class="meta">This view is drawn in the browser from the JSON files linked below. Without JavaScript, read the tables on this page.</p></div>
head: <link rel="stylesheet" href="../../../app/sources/ipma/ipma.css"><script src="../../../app/sources/ipma/ipma.js" defer></script>
---
# Places: district capitals and islands

> Kept by incident.ipma@web-summit.dinis, 11 November 2026, 03:42 UTC

[IPMA's open data](../index.md) · [Warnings over time](../warnings.md) · [Stations](../stations.md) · [The sea](../sea.md) · [Cities: forecast and observed](../cities.md) · [The API, mapped](../api.md) · [What we learned](../learned.md) · [Browse the files](../data.md) · [Licence and terms](../licence.md)

IPMA's name for it: *Lista de identificadores para as capitais distrito e ilhas*. Documented at [api.ipma.pt](https://api.ipma.pt/).

| | |
|---|---|
| Address | `https://api.ipma.pt/open-data/distrits-islands.json` |
| Format | JSON |
| Shape | · |
| IPMA says it updates | not stated |
| IPMA's file dated (its Last-Modified header) | 2021-12-07 14:48 UTC |
| We last read it | 2026-11-11 03:39 UTC, 1 file, 10071 bytes |
| IPMA's note | "Foram incluídos alguns locais de previsão não capitais de distrito, como por exemplo: Penhas Douradas, Sagres, Sines, ..." |

## Fields

| Field | Type | Unit | Meaning (our English) | IPMA's wording | Where the documentation differs |
|---|---|---|---|---|---|
| `globalIdLocal` | integer | · | the place's id (a node: place) | · | · |
| `local` | string | · | the place's name | · | · |
| `idRegiao` | integer | · | 1 the mainland, 2 Madeira, 3 the Azores | · | · |
| `idDistrito` | integer | · | the district (DICO) (a node: district) | · | · |
| `idConcelho` | integer | · | the municipality within the district (DICO) | · | · |
| `idAreaAviso` | string | · | the warning area the place belongs to (a node: area) | · | · |
| `latitude` | string (decimal degrees) | ° | latitude of the place | · | · |
| `longitude` | string (decimal degrees) | ° | longitude of the place | · | · |





## Files read

| File | Answer | Bytes | sha256 | IPMA's file dated (UTC) | We read it (UTC) |
|---|---|---|---|---|---|
| [distrits-islands.json](https://api.ipma.pt/open-data/distrits-islands.json) | 200 | 10071 | `fe67afbdef8527b7…` | 2021-12-07 14:48 | 2026-11-11 03:39 |

The links go to IPMA's live files. Full hashes: [latest.json](../latest.json). What changed between reads: no change seen yet between two of our reads. Our small files made from it: [data/places.json](../data.md#data/places.json).
