---
title: Fire risk forecast up to 3 days, by municipality · IPMA
summary: IPMA's "Fire risk forecast up to 3 days, by municipality": the address, each field with its meaning and unit, how often it changes, what we read and what changed.
mount: <div class="ipma" data-view="api" data-base="../" data-endpoint="fire-risk"><p class="meta">This view is drawn in the browser from the JSON files linked below. Without JavaScript, read the tables on this page.</p></div>
head: <link rel="stylesheet" href="../../../app/sources/ipma/ipma.css"><script src="../../../app/sources/ipma/ipma.js" defer></script>
---
# Fire risk forecast up to 3 days, by municipality

> Kept by incident.ipma@web-summit.dinis, 11 November 2026, 16:51 UTC

[IPMA's open data](../index.md) · [Warnings over time](../warnings.md) · [Stations](../stations.md) · [The sea](../sea.md) · [Cities: forecast and observed](../cities.md) · [The API, mapped](../api.md) · [What we learned](../learned.md) · [Browse the files](../data.md) · [Licence and terms](../licence.md)

IPMA's name for it: *Previsão do Risco de Incêndio até 3 dias, informação agregada por dia*. Documented at [api.ipma.pt](https://api.ipma.pt/).

| | |
|---|---|
| Address | `https://api.ipma.pt/open-data/forecast/meteorology/rcm/rcm-d{idDay}.json` |
| Format | JSON |
| Shape | {dataPrev, dataRun, fileDate, local: {<DICO>: {data: {rcm}, dico, latitude, longitude}}} |
| `{idDay}` | 0 today, 1 tomorrow, 2 the day after: 0, 1, 2 |
| IPMA says it updates | taxa de atualização horária |
| IPMA's file dated (its Last-Modified header) | 2026-11-11 09:35 UTC |
| We last read it | 2026-11-11 16:50 UTC, 3 files, 72906 bytes |
| IPMA's note | "Apenas estão disponíveis dados diários." |

## Fields

| Field | Type | Unit | Meaning (our English) | IPMA's wording | Where the documentation differs |
|---|---|---|---|---|---|
| `dataPrev` | date | · | the day the forecast is for | · | · |
| `dataRun` | date | · | the day of the model run | · | · |
| `fileDate` | date-time, no zone | · | when the file was rewritten | · | · |
| `dico` | string | · | the municipality: the DICO code of the official administrative map (CAOP, DGT) (a node: municipality) | · | · |
| `rcm` | integer | · | fire risk: 1 low, 2 moderate, 3 high, 4 very high, 5 maximum | "1 - Risco reduzido, 2 - Risco moderado, 3 - Risco Elevado, 4 - Risco muito elevado, 5 - Risco máximo" | · |
| `latitude` | number | ° | a point of the municipality | · | · |
| `longitude` | number | ° | a point of the municipality | · | · |

## Not documented

- what the point of each municipality is (a centroid, the seat, a station)



## Files read

| File | Answer | Bytes | sha256 | IPMA's file dated (UTC) | We read it (UTC) |
|---|---|---|---|---|---|
| [forecast/meteorology/rcm/rcm-d0.json](https://api.ipma.pt/open-data/forecast/meteorology/rcm/rcm-d0.json) | 200 | 24302 | `dc11d3e2a07a18c1…` | 2026-11-11 09:35 | 2026-11-11 16:50 |
| [forecast/meteorology/rcm/rcm-d1.json](https://api.ipma.pt/open-data/forecast/meteorology/rcm/rcm-d1.json) | 200 | 24302 | `9704f664f01cc3d7…` | 2026-11-11 09:35 | 2026-11-11 16:50 |
| [forecast/meteorology/rcm/rcm-d2.json](https://api.ipma.pt/open-data/forecast/meteorology/rcm/rcm-d2.json) | 200 | 24302 | `bd2c7ca4a4b72ccf…` | 2026-11-11 09:35 | 2026-11-11 16:50 |

The links go to IPMA's live files. Full hashes: [latest.json](../latest.json). What changed between reads: [changes/fire-risk.json](../changes/fire-risk.json). Our small files made from it: [data/places.json](../data.md#data/places.json).
