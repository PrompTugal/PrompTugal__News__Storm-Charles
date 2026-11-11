---
title: Ultraviolet index forecast · IPMA
summary: IPMA's "Ultraviolet index forecast": the address, each field with its meaning and unit, how often it changes, what we read and what changed.
mount: <div class="ipma" data-view="api" data-base="../" data-endpoint="uv"><p class="meta">This view is drawn in the browser from the JSON files linked below. Without JavaScript, read the tables on this page.</p></div>
head: <link rel="stylesheet" href="../../../app/sources/ipma/ipma.css"><script src="../../../app/sources/ipma/ipma.js" defer></script>
---
# Ultraviolet index forecast

> Kept by incident.ipma@web-summit.dinis, 11 November 2026, 03:42 UTC

[IPMA's open data](../index.md) · [Warnings over time](../warnings.md) · [Stations](../stations.md) · [The sea](../sea.md) · [Cities: forecast and observed](../cities.md) · [The API, mapped](../api.md) · [What we learned](../learned.md) · [Browse the files](../data.md) · [Licence and terms](../licence.md)

IPMA's name for it: *Previsão do Risco de Ultravioletas até 3 dias (Índice Ultravioleta)*. Documented at [api.ipma.pt](https://api.ipma.pt/).

| | |
|---|---|
| Address | `https://api.ipma.pt/open-data/forecast/meteorology/uv/uv.json` |
| Format | JSON |
| Shape | an array, one row per place and day |
| IPMA says it updates | not stated |
| IPMA's file dated (its Last-Modified header) | 2026-11-11 03:00 UTC |
| We last read it | 2026-11-11 03:41 UTC, 1 file, 16080 bytes |
| More from IPMA | https://www.ipma.pt/pt/otempo/prev.uv/ |

## Fields

| Field | Type | Unit | Meaning (our English) | IPMA's wording | Where the documentation differs |
|---|---|---|---|---|---|
| `data` | date | · | the day | · | · |
| `globalIdLocal` | integer | · | the place (a node: place) | · | · |
| `iUv` | string | UV index | the index: >= 11 extreme, >= 8 very high, >= 6 high, >= 3 moderate, >= 1 low | · | · |
| `intervaloHora` | string | · | the hours of the maximum | "intervalo de horas relativo ao valor máximo de UV" | · |
| `idPeriodo` | integer | · | an internal code of the period | "código interno do período" | · |

## Not documented

- the title says up to 3 days; the file read on 11 November carried 4 days
- intervaloHora was empty in every row read



## Files read

| File | Answer | Bytes | sha256 | IPMA's file dated (UTC) | We read it (UTC) |
|---|---|---|---|---|---|
| [forecast/meteorology/uv/uv.json](https://api.ipma.pt/open-data/forecast/meteorology/uv/uv.json) | 200 | 16080 | `41613bd890e6e05f…` | 2026-11-11 03:00 | 2026-11-11 03:41 |

The links go to IPMA's live files. Full hashes: [latest.json](../latest.json). What changed between reads: no change seen yet between two of our reads.
