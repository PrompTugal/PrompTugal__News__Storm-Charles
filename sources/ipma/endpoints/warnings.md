---
title: Weather warnings, up to 3 days · IPMA
summary: IPMA's "Weather warnings, up to 3 days": the address, each field with its meaning and unit, how often it changes, what we read and what changed.
mount: <div class="ipma" data-view="api" data-base="../" data-endpoint="warnings"><p class="meta">This view is drawn in the browser from the JSON files linked below. Without JavaScript, read the tables on this page.</p></div>
head: <link rel="stylesheet" href="../../../app/sources/ipma/ipma.css"><script src="../../../app/sources/ipma/ipma.js" defer></script>
---
# Weather warnings, up to 3 days

> Kept by incident.ipma@web-summit.dinis, 11 November 2026, 20:52 UTC

[IPMA's open data](../index.md) · [Warnings over time](../warnings.md) · [Stations](../stations.md) · [The sea](../sea.md) · [Cities: forecast and observed](../cities.md) · [The API, mapped](../api.md) · [What we learned](../learned.md) · [Browse the files](../data.md) · [Licence and terms](../licence.md)

IPMA's name for it: *Avisos Meteorológicos até 3 dias*. Documented at [api.ipma.pt](https://api.ipma.pt/). Drawn at [warnings](../warnings.md).

| | |
|---|---|
| Address | `https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json` |
| Format | JSON |
| Shape | an array of rows, one per area, type and window; most rows are green (no warning) and say only that the type is watched |
| IPMA says it updates | not stated |
| IPMA's file dated (its Last-Modified header) | 2026-11-11 20:15 UTC |
| We last read it | 2026-11-11 20:49 UTC, 1 file, 37369 bytes |
| IPMA's note | "Para mais informações sobre os Avisos Meteorológicos consulte o nosso Guia." |
| More from IPMA | https://www.ipma.pt/pt/enciclopedia/otempo/sam/ |

## Fields

| Field | Type | Unit | Meaning (our English) | IPMA's wording | Where the documentation differs |
|---|---|---|---|---|---|
| `idAreaAviso` | string | · | the warning area (a district, an island group, or a part of Madeira) (a node: area) | · | · |
| `awarenessTypeName` | string | · | what the warning is about (a node: warning-type) | "parâmetro do aviso (e.g. "Trovoada", "Agitação Marítima", "Precipitação", "Vento", "Nevoeiro", "Neve", "Tempo Frio", "Tempo Quente")" | · |
| `awarenessLevelID` | string | · | the level: green, yellow, orange, red (a node: level) | "só existem avisos para níveis diferentes de "green"" | · |
| `startTime` | date-time, no zone | · | start of the warning's window | · | · |
| `endTime` | date-time, no zone | · | end of the warning's window | · | · |
| `text` | string | · | the warning's text, in Portuguese | "preenchido apenas quando o aviso é amarelo, laranja ou vermelho" | · |

## Not documented

- no time of issue: a row does not say when the warning was issued or changed (the file's Last-Modified header is the nearest thing)
- the time zone of startTime and endTime (the documentation says forecasts are in UTC; for warnings it says nothing)
- the areas MCN, MRM (in the feed) are in no id table: distrits-islands.json has MCS and MPS only
- no identifier for a warning: a changed warning is a different row, not an update of the same one



## Files read

| File | Answer | Bytes | sha256 | IPMA's file dated (UTC) | We read it (UTC) |
|---|---|---|---|---|---|
| [forecast/warnings/warnings_www.json](https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json) | 200 | 37369 | `14c822eeb3646a2c…` | 2026-11-11 20:15 | 2026-11-11 20:49 |

The links go to IPMA's live files. Full hashes: [latest.json](../latest.json). What changed between reads: [changes/warnings.json](../changes/warnings.json). Our small files made from it: [data/warnings.json](../data.md#data/warnings.json).
