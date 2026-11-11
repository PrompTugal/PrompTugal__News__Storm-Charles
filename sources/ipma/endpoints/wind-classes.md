---
title: Wind strength classes · IPMA
summary: IPMA's "Wind strength classes": the address, each field with its meaning and unit, how often it changes, what we read and what changed.
mount: <div class="ipma" data-view="api" data-base="../" data-endpoint="wind-classes"><p class="meta">This view is drawn in the browser from the JSON files linked below. Without JavaScript, read the tables on this page.</p></div>
head: <link rel="stylesheet" href="../../../app/sources/ipma/ipma.css"><script src="../../../app/sources/ipma/ipma.js" defer></script>
---
# Wind strength classes

> Kept by incident.ipma@web-summit.dinis, 11 November 2026, 02:31 UTC

[IPMA's open data](../index.md) · [Warnings over time](../warnings.md) · [Stations](../stations.md) · [The sea](../sea.md) · [Cities: forecast and observed](../cities.md) · [The API, mapped](../api.md) · [Browse the files](../data.md) · [Licence and terms](../licence.md)

IPMA's name for it: *Lista de classes relativa à intensidade vento*. Documented at [api.ipma.pt](https://api.ipma.pt/).

| | |
|---|---|
| Address | `https://api.ipma.pt/open-data/wind-speed-daily-classe.json` |
| Format | JSON |
| Shape | · |
| IPMA says it updates | not stated |
| IPMA's file dated (its Last-Modified header) | 2018-01-18 17:50 UTC |
| We last read it | 2026-11-11 02:19 UTC, 1 file, 644 bytes |

## Fields

| Field | Type | Unit | Meaning (our English) | IPMA's wording | Where the documentation differs |
|---|---|---|---|---|---|
| `classWindSpeed` | string | · | the class (a node: wind-class) | · | · |
| `descClassWindSpeedDailyEN` | string | · | in English | · | documented as descClassWindSpeedEN |
| `descClassWindSpeedDailyPT` | string | · | in Portuguese | · | documented as descClassWindSpeedPT |

## Not documented

- the speeds each class stands for



## Files read

| File | Answer | Bytes | sha256 | IPMA's file dated (UTC) | We read it (UTC) |
|---|---|---|---|---|---|
| [wind-speed-daily-classe.json](https://api.ipma.pt/open-data/wind-speed-daily-classe.json) | 200 | 644 | `c747a9932e4c8661…` | 2018-01-18 17:50 | 2026-11-11 02:19 |

The links go to IPMA's live files. Full hashes: [latest.json](../latest.json). What changed between reads: no change seen yet between two of our reads. Our small files made from it: [data/cities.json](../data.md#data/cities.json).
