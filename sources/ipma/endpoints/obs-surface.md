---
title: Station observations, last 3 hours, with coordinates · IPMA
summary: IPMA's "Station observations, last 3 hours, with coordinates": the address, each field with its meaning and unit, how often it changes, what we read and what changed.
mount: <div class="ipma" data-view="api" data-base="../" data-endpoint="obs-surface"><p class="meta">This view is drawn in the browser from the JSON files linked below. Without JavaScript, read the tables on this page.</p></div>
head: <link rel="stylesheet" href="../../../app/sources/ipma/ipma.css"><script src="../../../app/sources/ipma/ipma.js" defer></script>
---
# Station observations, last 3 hours, with coordinates

> Kept by incident.ipma@web-summit.dinis, 12 November 2026, 14:52 UTC

[IPMA's open data](../index.md) · [Warnings over time](../warnings.md) · [Stations](../stations.md) · [The sea](../sea.md) · [Cities: forecast and observed](../cities.md) · [The API, mapped](../api.md) · [What we learned](../learned.md) · [Browse the files](../data.md) · [Licence and terms](../licence.md)

IPMA's name for it: *Observação Meteorológica de Estações, últimas 3 horas*. Documented at [api.ipma.pt](https://api.ipma.pt/). Drawn at [stations](../stations.md).

| | |
|---|---|
| Address | `https://api.ipma.pt/open-data/observation/meteorology/stations/obs-surface.geojson` |
| Format | GeoJSON |
| Shape | FeatureCollection of points, one per station and hour |
| IPMA says it updates | Taxa de atualização horária. |
| IPMA's file dated (its Last-Modified header) | 2026-11-12 14:31 UTC |
| We last read it | 2026-11-12 14:51 UTC, 1 file, 454872 bytes |
| IPMA's note | "valor "-99.0" = nodata" |

## Fields

| Field | Type | Unit | Meaning (our English) | IPMA's wording | Where the documentation differs |
|---|---|---|---|---|---|
| `geometry.coordinates` | [longitude, latitude] | ° | where the station is | · | · |
| `time` | date-time, no zone | · | the hour of the observation | · | · |
| `idEstacao` | integer | · | the station (a node: station) | · | · |
| `localEstacao` | string | · | the station's name | · | · |
| `descDirVento` | string | · | the wind direction as letters | · | · |
| `intensidadeVentoKM` | number | km/h | wind speed at 10 m | "intensidade do vento registada a 10 metros de altura (km/h)" | · |
| `intensidadeVento` | number | m/s | wind speed at 10 m | · | · |
| `idDireccVento` | integer | · | class of the prevailing wind direction at 10 m: 0 none, 1 or 9 N, 2 NE, 3 E, 4 SE, 5 S, 6 SW, 7 W, 8 NW | · | · |
| `temperatura` | number | °C | air temperature at 1.5 m, mean of the hour | · | · |
| `precAcumulada` | number | mm | precipitation at 1.5 m, accumulated in the hour | "precipitação registada a 1.5 metros de altura, valor acumulado da hora (mm)" | · |
| `humidade` | number | % | relative humidity at 1.5 m, mean of the hour | · | · |
| `pressao` | number | hPa | pressure reduced to mean sea level, mean of the hour | · | · |
| `radiacao` | number | kJ/m² | solar radiation | · | · |

## Not documented

- the hour label's convention, as for observations.json



## Files read

| File | Answer | Bytes | sha256 | IPMA's file dated (UTC) | We read it (UTC) |
|---|---|---|---|---|---|
| [observation/meteorology/stations/obs-surface.geojson](https://api.ipma.pt/open-data/observation/meteorology/stations/obs-surface.geojson) | 200 | 454872 | `f17562068477264b…` | 2026-11-12 14:31 | 2026-11-12 14:51 |

The links go to IPMA's live files. Full hashes: [latest.json](../latest.json). What changed between reads: [changes/obs-surface.json](../changes/obs-surface.json). Our small files made from it: [data/observations.json](../data.md#data/observations.json).
