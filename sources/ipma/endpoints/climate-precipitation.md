---
title: Daily precipitation by municipality · IPMA
summary: IPMA's "Daily precipitation by municipality": the address, each field with its meaning and unit, how often it changes, what we read and what changed.
mount: <div class="ipma" data-view="api" data-base="../" data-endpoint="climate-precipitation"><p class="meta">This view is drawn in the browser from the JSON files linked below. Without JavaScript, read the tables on this page.</p></div>
head: <link rel="stylesheet" href="../../../app/sources/ipma/ipma.css"><script src="../../../app/sources/ipma/ipma.js" defer></script>
---
# Daily precipitation by municipality

> Kept by incident.ipma@web-summit.dinis, 12 November 2026, 01:51 UTC

[IPMA's open data](../index.md) · [Warnings over time](../warnings.md) · [Stations](../stations.md) · [The sea](../sea.md) · [Cities: forecast and observed](../cities.md) · [The API, mapped](../api.md) · [What we learned](../learned.md) · [Browse the files](../data.md) · [Licence and terms](../licence.md)

IPMA's name for it: *Precipitação diária por concelho*. Documented at [api.ipma.pt](https://api.ipma.pt/).

| | |
|---|---|
| Address | `https://api.ipma.pt/open-data/observation/climate/precipitation/prec-p1d-continental-obssup-idw-concelhos-20d.csv` |
| Format | CSV |
| Shape | one line per municipality and day, 20 days |
| IPMA says it updates | Taxa de atualização diária. |
| IPMA's file dated (its Last-Modified header) | 2026-11-11 03:10 UTC |
| We last read it | 2026-11-12 01:51 UTC, 1 file, 635427 bytes |
| IPMA's note | "Valores diários obtidos através do processo de interpolação com recurso aos dados das estações meteorológicas automáticas da rede do IPMA. Valores dos últimos 20 dias." |

## Fields

| Field | Type | Unit | Meaning (our English) | IPMA's wording | Where the documentation differs |
|---|---|---|---|---|---|
| `time` | date-time with +00:00 | · | the day | · | · |
| `zname` | string | · | the municipality's name | · | · |
| `zid` | string | · | the municipality: DICO code (a node: municipality) | · | · |
| `mean_maxprate` | number | mm/h | mean over the municipality of the maximum precipitation rate of the day | · | · |
| `std_maxprate` | number | mm/h | std over the municipality of the maximum precipitation rate of the day | · | · |
| `min_maxprate` | number | mm/h | min over the municipality of the maximum precipitation rate of the day | · | · |
| `max_maxprate` | number | mm/h | max over the municipality of the maximum precipitation rate of the day | · | · |
| `percentile_25_maxprate` | number | mm/h | percentile 25 over the municipality of the maximum precipitation rate of the day | · | · |
| `median_maxprate` | number | mm/h | median over the municipality of the maximum precipitation rate of the day | · | · |
| `percentile_75_maxprate` | number | mm/h | percentile 75 over the municipality of the maximum precipitation rate of the day | · | · |
| `mean_tp` | number | mm | mean over the municipality of the total precipitation of the day | · | · |
| `std_tp` | number | mm | std over the municipality of the total precipitation of the day | · | · |
| `min_tp` | number | mm | min over the municipality of the total precipitation of the day | · | · |
| `max_tp` | number | mm | max over the municipality of the total precipitation of the day | · | · |
| `percentile_25_tp` | number | mm | percentile 25 over the municipality of the total precipitation of the day | · | · |
| `median_tp` | number | mm | median over the municipality of the total precipitation of the day | · | · |
| `percentile_75_tp` | number | mm | percentile 75 over the municipality of the total precipitation of the day | · | · |

## Not documented

- the mainland only (the file name says continental)



## Files read

| File | Answer | Bytes | sha256 | IPMA's file dated (UTC) | We read it (UTC) |
|---|---|---|---|---|---|
| [observation/climate/precipitation/prec-p1d-continental-obssup-idw-concelhos-20d.csv](https://api.ipma.pt/open-data/observation/climate/precipitation/prec-p1d-continental-obssup-idw-concelhos-20d.csv) | 200 | 635427 | `d74de55d629a750a…` | 2026-11-11 03:10 | 2026-11-12 01:51 |

The links go to IPMA's live files. Full hashes: [latest.json](../latest.json). What changed between reads: [changes/climate-precipitation.json](../changes/climate-precipitation.json).
