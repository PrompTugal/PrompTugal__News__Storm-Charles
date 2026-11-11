---
title: Shellfish harvesting bans by production zone · IPMA
summary: IPMA's "Shellfish harvesting bans by production zone": the address, each field with its meaning and unit, how often it changes, what we read and what changed.
mount: <div class="ipma" data-view="api" data-base="../" data-endpoint="bivalves"><p class="meta">This view is drawn in the browser from the JSON files linked below. Without JavaScript, read the tables on this page.</p></div>
head: <link rel="stylesheet" href="../../../app/sources/ipma/ipma.css"><script src="../../../app/sources/ipma/ipma.js" defer></script>
---
# Shellfish harvesting bans by production zone

> Kept by incident.ipma@web-summit.dinis, 11 November 2026, 02:42 UTC

[IPMA's open data](../index.md) · [Warnings over time](../warnings.md) · [Stations](../stations.md) · [The sea](../sea.md) · [Cities: forecast and observed](../cities.md) · [The API, mapped](../api.md) · [What we learned](../learned.md) · [Browse the files](../data.md) · [Licence and terms](../licence.md)

IPMA's name for it: *Interdições à apanha nas Zonas de Produção de Moluscos Bivalves*. Documented at [api.ipma.pt](https://api.ipma.pt/).

| | |
|---|---|
| Address | `https://api.ipma.pt/open-data/observation/biology/bivalves/CI_SNMB.geojson` |
| Format | GeoJSON |
| Shape | FeatureCollection of zone polygons (3.4 MB), with the bulletin's number and publication_date at the top |
| IPMA says it updates | not stated (the latest bulletin) |
| IPMA's file dated (its Last-Modified header) | 2026-11-09 16:20 UTC |
| We last read it | 2026-11-11 02:22 UTC, 1 file, 3411715 bytes |
| IPMA's note | "Últimas permissões/interdições publicadas para a apanha e comercialização de moluscos bivalves, equinodermes, tunicados e gastrópodes marinhos vivos." |
| More from IPMA | https://www.ipma.pt/pt/bivalves |

## Fields

| Field | Type | Unit | Meaning (our English) | IPMA's wording | Where the documentation differs |
|---|---|---|---|---|---|
| `publication_date` | date | · | when the bulletin was published | · | · |
| `snmb_reference, cd_decision, bulletin_name` | string | · | the bulletin (not documented) | · | · |
| `name` | string | · | the zone's name | · | · |
| `code` | string | · | the zone's code (a node: shellfish-zone) | · | the documentation names this field samp; the responses carry code |
| `zone_type` | string | · | LITORAL (coastal) or EST_LAG (estuary or lagoon) | · | · |
| `region_name` | string | · | the region | · | · |
| `representative_point` | WKT point | ° | a point at the centre of the zone | · | · |
| `status` | string | · | OPEN, PARTIAL_OPEN, CLOSED or NOINFO | · | · |
| `interdictions` | object | · | species open and closed: scientific name, common name, sanitary class A, B or C | · | · |
| `geometry` | MultiPolygon | ° | the zone's outline | · | · |





## Files read

| File | Answer | Bytes | sha256 | IPMA's file dated (UTC) | We read it (UTC) |
|---|---|---|---|---|---|
| [observation/biology/bivalves/CI_SNMB.geojson](https://api.ipma.pt/open-data/observation/biology/bivalves/CI_SNMB.geojson) | 200 | 3411715 | `1f5ee7e1f1445d9b…` | 2026-11-09 16:20 | 2026-11-11 02:22 |

The links go to IPMA's live files. Full hashes: [latest.json](../latest.json). What changed between reads: no change seen yet between two of our reads. Our small files made from it: [data/shellfish-zones.json](../data.md#data/shellfish-zones.json).
