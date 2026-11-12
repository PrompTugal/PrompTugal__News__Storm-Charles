---
title: Daily reference evapotranspiration by municipality · IPMA
summary: IPMA's "Daily reference evapotranspiration by municipality": the address, each field with its meaning and unit, how often it changes, what we read and what changed.
mount: <div class="ipma" data-view="api" data-base="../" data-endpoint="climate-evapotranspiration"><p class="meta">This view is drawn in the browser from the JSON files linked below. Without JavaScript, read the tables on this page.</p></div>
head: <link rel="stylesheet" href="../../../app/sources/ipma/ipma.css"><script src="../../../app/sources/ipma/ipma.js" defer></script>
---
# Daily reference evapotranspiration by municipality

> Kept by incident.ipma@web-summit.dinis, 12 November 2026, 00:52 UTC

[IPMA's open data](../index.md) · [Warnings over time](../warnings.md) · [Stations](../stations.md) · [The sea](../sea.md) · [Cities: forecast and observed](../cities.md) · [The API, mapped](../api.md) · [What we learned](../learned.md) · [Browse the files](../data.md) · [Licence and terms](../licence.md)

IPMA's name for it: *Evapotranspiração de referência diária por concelho*. Documented at [api.ipma.pt](https://api.ipma.pt/).

| | |
|---|---|
| Address | `https://api.ipma.pt/open-data/observation/climate/evapotranspiration/et0-p1d-continental-obssup-idw-20d-concelhos.csv` |
| Format | CSV |
| Shape | one line per municipality and day, 20 days |
| IPMA says it updates | Taxa de atualização diária. |
| IPMA's file dated (its Last-Modified header) | · UTC |
| We last read it | 2026-11-12 00:51 UTC, 1 file, 0 bytes |
| IPMA's note | "Valores diários obtidos através do processo de interpolação com recurso aos dados das estações meteorológicas automáticas da rede do IPMA. Valores dos últimos 20 dias." |

## Fields

| Field | Type | Unit | Meaning (our English) | IPMA's wording | Where the documentation differs |
|---|---|---|---|---|---|
| `time` | date-time with +00:00 | · | the day | · | · |
| `zname` | string | · | the municipality's name | · | · |
| `zid` | string | · | the municipality: DICO code (a node: municipality) | · | · |
| `mean_et0` | number | mm | mean over the municipality of reference evapotranspiration of the day | · | · |
| `std_et0` | number | mm | std over the municipality of reference evapotranspiration of the day | · | · |
| `min_et0` | number | mm | min over the municipality of reference evapotranspiration of the day | · | · |
| `max_et0` | number | mm | max over the municipality of reference evapotranspiration of the day | · | · |
| `percentile_25_et0` | number | mm | percentile 25 over the municipality of reference evapotranspiration of the day | · | · |
| `median_et0` | number | mm | median over the municipality of reference evapotranspiration of the day | · | · |
| `percentile_75_et0` | number | mm | percentile 75 over the municipality of reference evapotranspiration of the day | · | · |

## Not documented

- the mainland only (the file name says continental)



## Files read

| File | Answer | Bytes | sha256 | IPMA's file dated (UTC) | We read it (UTC) |
|---|---|---|---|---|---|
| [observation/climate/evapotranspiration/et0-p1d-continental-obssup-idw-20d-concelhos.csv](https://api.ipma.pt/open-data/observation/climate/evapotranspiration/et0-p1d-continental-obssup-idw-20d-concelhos.csv) | 404 | · | `·` | · | 2026-11-12 00:51 |

The links go to IPMA's live files. Full hashes: [latest.json](../latest.json). What changed between reads: no change seen yet between two of our reads.
