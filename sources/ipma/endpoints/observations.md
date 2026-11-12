---
title: Station observations, hourly, last 24 hours · IPMA
summary: IPMA's "Station observations, hourly, last 24 hours": the address, each field with its meaning and unit, how often it changes, what we read and what changed.
mount: <div class="ipma" data-view="api" data-base="../" data-endpoint="observations"><p class="meta">This view is drawn in the browser from the JSON files linked below. Without JavaScript, read the tables on this page.</p></div>
head: <link rel="stylesheet" href="../../../app/sources/ipma/ipma.css"><script src="../../../app/sources/ipma/ipma.js" defer></script>
---
# Station observations, hourly, last 24 hours

> Kept by incident.ipma@web-summit.dinis, 12 November 2026, 06:53 UTC

[IPMA's open data](../index.md) · [Warnings over time](../warnings.md) · [Stations](../stations.md) · [The sea](../sea.md) · [Cities: forecast and observed](../cities.md) · [The API, mapped](../api.md) · [What we learned](../learned.md) · [Browse the files](../data.md) · [Licence and terms](../licence.md)

IPMA's name for it: *Observação Meteorológica de Estações (dados horários, últimas 24 horas)*. Documented at [api.ipma.pt](https://api.ipma.pt/). Drawn at [stations](../stations.md).

| | |
|---|---|
| Address | `https://api.ipma.pt/open-data/observation/meteorology/stations/observations.json` |
| Format | JSON |
| Shape | {<YYYY-mm-ddThh:mi>: {<idEstacao>: {values}}}: 24 hours, every station |
| IPMA says it updates | Taxa de atualização horária. |
| IPMA's file dated (its Last-Modified header) | 2026-11-12 06:35 UTC |
| We last read it | 2026-11-12 06:52 UTC, 1 file, 1039274 bytes |
| IPMA's note | "valor "-99.0" = nodata" |

## Fields

| Field | Type | Unit | Meaning (our English) | IPMA's wording | Where the documentation differs |
|---|---|---|---|---|---|
| `(key) YYYY-mm-ddThh:mi` | date-time, no zone | · | the hour of the observation | "data/hora da observação" | · |
| `(key) idEstacao` | integer | · | the station (a node: station) | · | · |
| `intensidadeVentoKM` | number | km/h | wind speed at 10 m | "intensidade do vento registada a 10 metros de altura (km/h)" | · |
| `intensidadeVento` | number | m/s | wind speed at 10 m | · | · |
| `idDireccVento` | integer | · | class of the prevailing wind direction at 10 m: 0 none, 1 or 9 N, 2 NE, 3 E, 4 SE, 5 S, 6 SW, 7 W, 8 NW | · | · |
| `temperatura` | number | °C | air temperature at 1.5 m, mean of the hour | · | · |
| `precAcumulada` | number | mm | precipitation at 1.5 m, accumulated in the hour | "precipitação registada a 1.5 metros de altura, valor acumulado da hora (mm)" | · |
| `humidade` | number | % | relative humidity at 1.5 m, mean of the hour | · | · |
| `pressao` | number | hPa | pressure reduced to mean sea level, mean of the hour | · | · |
| `radiacao` | number | kJ/m² | solar radiation | · | · |

## Not documented

- the hour label's convention: whether a label is the hour starting or ending at that time, and its time zone (incident.meteorologist@ infers hour ending, UTC: incidents/2026-11-10-storm-charles/data/weather/madeira.json, hour_label)
- no gusts: wind is the mean speed only; warnings are issued on gusts
- a station can be null or absent in an hour



## Files read

| File | Answer | Bytes | sha256 | IPMA's file dated (UTC) | We read it (UTC) |
|---|---|---|---|---|---|
| [observation/meteorology/stations/observations.json](https://api.ipma.pt/open-data/observation/meteorology/stations/observations.json) | 200 | 1039274 | `ef0025f5b6d8efdb…` | 2026-11-12 06:35 | 2026-11-12 06:52 |

The links go to IPMA's live files. Full hashes: [latest.json](../latest.json). What changed between reads: [changes/observations.json](../changes/observations.json). Our small files made from it: [data/observations.json](../data.md#data/observations.json), [data/observed-daily.json](../data.md#data/observed-daily.json).
