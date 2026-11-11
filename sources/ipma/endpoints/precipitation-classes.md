---
title: Precipitation intensity classes · IPMA
summary: IPMA's "Precipitation intensity classes": the address, each field with its meaning and unit, how often it changes, what we read and what changed.
mount: <div class="ipma" data-view="api" data-base="../" data-endpoint="precipitation-classes"><p class="meta">This view is drawn in the browser from the JSON files linked below. Without JavaScript, read the tables on this page.</p></div>
head: <link rel="stylesheet" href="../../../app/sources/ipma/ipma.css"><script src="../../../app/sources/ipma/ipma.js" defer></script>
---
# Precipitation intensity classes

> Kept by incident.ipma@web-summit.dinis, 11 November 2026, 08:50 UTC

[IPMA's open data](../index.md) · [Warnings over time](../warnings.md) · [Stations](../stations.md) · [The sea](../sea.md) · [Cities: forecast and observed](../cities.md) · [The API, mapped](../api.md) · [What we learned](../learned.md) · [Browse the files](../data.md) · [Licence and terms](../licence.md)

IPMA's name for it: *Lista de classes relativa à intensidade precipitação*. Documented at [api.ipma.pt](https://api.ipma.pt/).

| | |
|---|---|
| Address | `https://api.ipma.pt/open-data/precipitation-classe.json` |
| Format | JSON |
| Shape | · |
| IPMA says it updates | not stated |
| IPMA's file dated (its Last-Modified header) | 2019-11-06 17:27 UTC |
| We last read it | 2026-11-11 08:47 UTC, 1 file, 578 bytes |

## Fields

| Field | Type | Unit | Meaning (our English) | IPMA's wording | Where the documentation differs |
|---|---|---|---|---|---|
| `classPrecInt` | string | · | the class (a node: precipitation-class) | · | · |
| `descClassPrecIntEN` | string | · | in English | · | · |
| `descClassPrecIntPT` | string | · | in Portuguese | · | · |

## Not documented

- the amounts each class stands for



## Files read

| File | Answer | Bytes | sha256 | IPMA's file dated (UTC) | We read it (UTC) |
|---|---|---|---|---|---|
| [precipitation-classe.json](https://api.ipma.pt/open-data/precipitation-classe.json) | 200 | 578 | `208d4a1c7c9f2e43…` | 2019-11-06 17:27 | 2026-11-11 08:47 |

The links go to IPMA's live files. Full hashes: [latest.json](../latest.json). What changed between reads: no change seen yet between two of our reads. Our small files made from it: [data/cities.json](../data.md#data/cities.json).
