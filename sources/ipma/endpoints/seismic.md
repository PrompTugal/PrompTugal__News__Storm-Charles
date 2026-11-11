---
title: Seismic events, last 30 days · IPMA
summary: IPMA's "Seismic events, last 30 days": the address, each field with its meaning and unit, how often it changes, what we read and what changed.
mount: <div class="ipma" data-view="api" data-base="../" data-endpoint="seismic"><p class="meta">This view is drawn in the browser from the JSON files linked below. Without JavaScript, read the tables on this page.</p></div>
head: <link rel="stylesheet" href="../../../app/sources/ipma/ipma.css"><script src="../../../app/sources/ipma/ipma.js" defer></script>
---
# Seismic events, last 30 days

> Kept by incident.ipma@web-summit.dinis, 11 November 2026, 20:52 UTC

[IPMA's open data](../index.md) · [Warnings over time](../warnings.md) · [Stations](../stations.md) · [The sea](../sea.md) · [Cities: forecast and observed](../cities.md) · [The API, mapped](../api.md) · [What we learned](../learned.md) · [Browse the files](../data.md) · [Licence and terms](../licence.md)

IPMA's name for it: *Informação sismicidade, Arq. Açores, Continente e Arq. Madeira*. Documented at [api.ipma.pt](https://api.ipma.pt/).

| | |
|---|---|
| Address | `https://api.ipma.pt/open-data/observation/seismic/{idArea}.json` |
| Format | JSON |
| Shape | {idArea, country, owner, updateDate, lastSismicActivityDate, data: [events]} |
| `{idArea}` | 3 the Azores; 7 the mainland and Madeira: 3, 7 |
| IPMA says it updates | Atualização é horária. |
| IPMA's file dated (its Last-Modified header) | 2026-11-11 20:36 UTC |
| We last read it | 2026-11-11 20:51 UTC, 2 files, 146029 bytes |
| IPMA's note | "Integra 30 dias de informação" |

## Fields

| Field | Type | Unit | Meaning (our English) | IPMA's wording | Where the documentation differs |
|---|---|---|---|---|---|
| `time` | date-time | UTC | time of the event | "data hora (TU) do evento sismico" | · |
| `obsRegion` | string | · | the region, as a direction from a named place | · | · |
| `local` | string or null | · | the place of the epicentre, when felt | · | · |
| `lat` | string | ° | latitude of the epicentre | · | · |
| `lon` | string | ° | longitude of the epicentre | · | the documentation names this field long; the responses carry lon |
| `magnitud` | string | · | magnitude | · | · |
| `magType` | string | · | type of magnitude | · | · |
| `depth` | integer | km (unit not stated) | depth | · | · |
| `degree` | string or null | · | intensity degree, when felt | · | · |
| `sensed` | boolean or null | · | whether it was felt (not documented) | · | · |
| `dataUpdate` | date-time | · | when the event was updated | · | · |
| `sismoId, shakemapid, shakemapref, googlemapref, tensorRef, source` | string | · | identifiers and links (not documented) | · | · |

## Not documented

- the unit of depth
- sensed, sismoId, shakemapid, shakemapref, googlemapref, tensorRef, source, updateDate, lastSismicActivityDate



## Files read

| File | Answer | Bytes | sha256 | IPMA's file dated (UTC) | We read it (UTC) |
|---|---|---|---|---|---|
| [observation/seismic/3.json](https://api.ipma.pt/open-data/observation/seismic/3.json) | 200 | 36651 | `c9a33f1969c80cee…` | 2026-11-11 20:36 | 2026-11-11 20:51 |
| [observation/seismic/7.json](https://api.ipma.pt/open-data/observation/seismic/7.json) | 200 | 109378 | `23887750dc338dc6…` | 2026-11-11 20:36 | 2026-11-11 20:51 |

The links go to IPMA's live files. Full hashes: [latest.json](../latest.json). What changed between reads: [changes/seismic.json](../changes/seismic.json). Our small files made from it: [data/seismic.json](../data.md#data/seismic.json).
