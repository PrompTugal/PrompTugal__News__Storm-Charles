---
title: Daily air temperature by municipality · IPMA
summary: IPMA's "Daily air temperature by municipality": the address, each field with its meaning and unit, how often it changes, what we read and what changed.
mount: <div class="ipma" data-view="api" data-base="../" data-endpoint="climate-temperature"><p class="meta">This view is drawn in the browser from the JSON files linked below. Without JavaScript, read the tables on this page.</p></div>
head: <link rel="stylesheet" href="../../../app/sources/ipma/ipma.css"><script src="../../../app/sources/ipma/ipma.js" defer></script>
---
# Daily air temperature by municipality

> Kept by incident.ipma@web-summit.dinis, 12 November 2026, 11:52 UTC

[IPMA's open data](../index.md) · [Warnings over time](../warnings.md) · [Stations](../stations.md) · [The sea](../sea.md) · [Cities: forecast and observed](../cities.md) · [The API, mapped](../api.md) · [What we learned](../learned.md) · [Browse the files](../data.md) · [Licence and terms](../licence.md)

IPMA's name for it: *Temperatura do ar diária por concelho*. Documented at [api.ipma.pt](https://api.ipma.pt/).

| | |
|---|---|
| Address | `https://api.ipma.pt/open-data/observation/climate/temperature/t2m-p1d-continental-obssup-idw-concelhos-20d.csv` |
| Format | CSV |
| Shape | one line per municipality and day, 20 days |
| IPMA says it updates | Taxa de atualização diária. |
| IPMA's file dated (its Last-Modified header) | 2026-11-12 03:10 UTC |
| We last read it | 2026-11-12 11:51 UTC, 1 file, 897933 bytes |
| IPMA's note | "Valores diários obtidos através do processo de interpolação com recurso aos dados das estações meteorológicas automáticas da rede do IPMA. Valores dos últimos 20 dias." |

## Fields

| Field | Type | Unit | Meaning (our English) | IPMA's wording | Where the documentation differs |
|---|---|---|---|---|---|
| `time` | date-time with +00:00 | · | the day | · | · |
| `zname` | string | · | the municipality's name | · | · |
| `zid` | string | · | the municipality: DICO code (a node: municipality) | · | · |
| `mean_maxt2m` | number | °C | mean over the municipality of the maximum air temperature of the day | · | · |
| `std_maxt2m` | number | °C | std over the municipality of the maximum air temperature of the day | · | · |
| `min_maxt2m` | number | °C | min over the municipality of the maximum air temperature of the day | · | · |
| `max_maxt2m` | number | °C | max over the municipality of the maximum air temperature of the day | · | · |
| `percentile_25_maxt2m` | number | °C | percentile 25 over the municipality of the maximum air temperature of the day | · | · |
| `median_maxt2m` | number | °C | median over the municipality of the maximum air temperature of the day | · | · |
| `percentile_75_maxt2m` | number | °C | percentile 75 over the municipality of the maximum air temperature of the day | · | · |
| `mean_meant2m` | number | °C | mean over the municipality of the mean air temperature of the day | · | · |
| `std_meant2m` | number | °C | std over the municipality of the mean air temperature of the day | · | · |
| `min_meant2m` | number | °C | min over the municipality of the mean air temperature of the day | · | · |
| `max_meant2m` | number | °C | max over the municipality of the mean air temperature of the day | · | · |
| `percentile_25_meant2m` | number | °C | percentile 25 over the municipality of the mean air temperature of the day | · | · |
| `median_meant2m` | number | °C | median over the municipality of the mean air temperature of the day | · | · |
| `percentile_75_meant2m` | number | °C | percentile 75 over the municipality of the mean air temperature of the day | · | · |
| `mean_mint2m` | number | °C | mean over the municipality of the minimum air temperature of the day | · | · |
| `std_mint2m` | number | °C | std over the municipality of the minimum air temperature of the day | · | · |
| `min_mint2m` | number | °C | min over the municipality of the minimum air temperature of the day | · | · |
| `max_mint2m` | number | °C | max over the municipality of the minimum air temperature of the day | · | · |
| `percentile_25_mint2m` | number | °C | percentile 25 over the municipality of the minimum air temperature of the day | · | · |
| `median_mint2m` | number | °C | median over the municipality of the minimum air temperature of the day | · | · |
| `percentile_75_mint2m` | number | °C | percentile 75 over the municipality of the minimum air temperature of the day | · | · |

## Not documented

- the mainland only (the file name says continental)



## Files read

| File | Answer | Bytes | sha256 | IPMA's file dated (UTC) | We read it (UTC) |
|---|---|---|---|---|---|
| [observation/climate/temperature/t2m-p1d-continental-obssup-idw-concelhos-20d.csv](https://api.ipma.pt/open-data/observation/climate/temperature/t2m-p1d-continental-obssup-idw-concelhos-20d.csv) | 200 | 897933 | `249907ca1ac657e9…` | 2026-11-12 03:10 | 2026-11-12 11:51 |

The links go to IPMA's live files. Full hashes: [latest.json](../latest.json). What changed between reads: [changes/climate-temperature.json](../changes/climate-temperature.json).
