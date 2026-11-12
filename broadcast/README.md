# The broadcast wall: what it reads, and the pictures it may not yet show

> Kept by incident.broadcast@web-summit.dinis, 11 November 2026, 16:33 UTC

[The wall](index.md) is Storm Charles as a live news channel would show it (Dinis, 11 November, ~10:13 UTC, [BRIEF.md](../BRIEF.md)): information, not alarm. **Not a warning service**: for warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/).

## What each panel reads (all from this site; the page makes no outside request)

| Panel | File | Kept by | Label |
|---|---|---|---|
| Chyron | [incident.json](../incidents/2026-11-10-storm-charles/incident.json) `headline`, `thursday` | incident.conductor@ | fact (as the record labels it) |
| Ticker | [data/signals.json](../incidents/2026-11-10-storm-charles/data/signals.json), the 12 newest rows | timeline (tools/timeline.mjs) | each row's own label |
| IPMA warnings, Lisbon | [data/weather/warnings.json](../incidents/2026-11-10-storm-charles/data/weather/warnings.json) `lisbon` | incident.weather@ | fact |
| IPMA warnings, every area | [sources/ipma/data/warnings.json](../sources/ipma/data/warnings.json) `now.by_area`, names from `places.json` | incident.ipma@ | fact |
| Lisbon airport | [data/weather/airport.json](../incidents/2026-11-10-storm-charles/data/weather/airport.json) `metars` | incident.weather@ | fact |
| Web Summit | [data/decisions/graph.json](../incidents/2026-11-10-storm-charles/data/decisions/graph.json): the organisers' decisions (`by: websummit`), decided first, then not announced, then our hypotheses (dashed) | incident.researcher@ | each edge's own label |
| Getting around | [data/transport/flights.json](../incidents/2026-11-10-storm-charles/data/transport/flights.json) (Lisbon and Porto only: Faro and Funchal are under-covered) and the per-mode files (metro, trains, ferries, buses: the first Lisbon-area operator with a readable feed); a live snapshot of zero is not shown; "seen since" each airport's `covered_from` (OpenSky's window is a few hours, not the day), a floor, no normal-day comparison | incident.transport@ | fact |
| Who lives under the warnings | [data/exposure/people-by-hour.json](../incidents/2026-11-10-storm-charles/data/exposure/people-by-hour.json): census residents of the IPMA areas at each level this hour | incident.datascience@ | arithmetic on two facts; never people harmed |
| Counts | the timeline rows that give a number of occurrences (the newest for Madeira and for the mainland) | timeline | evidence |
| Wind and pressure map | [data/field.json](data/field.json): Open-Meteo forecast API, 2° grid 32° W to 2° E, 30° N to 52° N, every 3 hours, 12 Nov 06:00 to 14 Nov 00:00 UTC (from the 10:31 read on 12 Nov) (CC BY 4.0) | incident.broadcast@ (`tools/broadcast-field.mjs`) | a model (evidence), not an observation, not our forecast |
| Land outlines | [data/coast.json](data/coast.json): Natural Earth 1:50m land (public domain), cut and thinned (`tools/broadcast-coast.mjs`) | incident.broadcast@ | for orientation |
| Clock | the reader's own clock, shown in Europe/Lisbon time (= UTC in November) | | |

The model field is read by an agent and committed, not fetched by the page or the build: refresh with `node tools/broadcast-field.mjs` (one request, about 50 KB written).

## Pictures and outside requests: the list for Dinis

The gate refuses outside requests from pages today, and only Dinis can change that. Nothing below is requested by the page. Terms are from incident.weatherwatch@'s study, [research/weather-sites/imagery.json](../research/weather-sites/imagery.json) (terms read 10 Nov 23:53 UTC), which this list builds on.

| What | From | Its terms (short) | The request the page would make | Needs |
|---|---|---|---|---|
| Radar mosaic, the latest frame | IPMA, [obs.radar](https://www.ipma.pt/pt/otempo/obs.radar/) | non-profit use free with "Fonte: IPMA", logo and link; silent on hotlinking | one image GET to `www.ipma.pt` every 10 min | a person asks IPMA; Dinis states whether this site counts as non-profit |
| Satellite (Meteosat), a frame at least 1 hour old | EUMETSAT, [EUMETView WMS](https://view.eumetsat.int/) | any purpose with "Contains modified EUMETSAT Meteosat data 2026" and the image time, after a free licence in the user portal; under 1 hour old needs a paid licence | one WMS GetMap to `view.eumetsat.int` per hour (box 32° W to 2° E, 30° N to 52° N) | Dinis (or someone he names) registers and accepts the licence |
| Flood and damage maps | Copernicus EMS, [activations](https://mapping.emergency.copernicus.eu/) | usable with citation | an image or map file per product | only once an activation for Charles exists (none listed at 23:40 UTC on 10 Nov) |
| Photographs from the scene | Protecção Civil (ANEPC), Câmara Municipal de Lisboa, Governo Regional da Madeira / SRPC: their own posts | each authority's own terms; most say nothing | an image GET to each authority's host, one per picture | a person asks each authority for permission to show their photos with credit |
| Photographs from the scene | Lusa (the Portuguese news agency) | a licensed feed only | Lusa's licensed image service | a licence, Dinis's decision |
| A live video picture (as on CNN Portugal's screen) | RTP or another broadcaster | broadcasters' footage is not ours to embed without an agreement | an embed from the broadcaster's player host | an agreement; not proposed |
| Map tiles under the wind map | OpenStreetMap or another tile service | OSM tiles: attribution and its tile usage policy | tile GETs per view | not needed: the wall draws its own land from Natural Earth |

Never shown: a private person's photo, name or post, even where widely shared.

## Next

- A refresh of the model field each few hours (by hand for now); a gust layer if the meteorologist wants one.
- Done at 10:50: the transport panel from incident.transport@'s files.
- Done at 10:30: the map's three views (Atlantic, Lisbon, Madeira); the Web Summit panel from the decisions graph; the field refreshed and run to Thursday 18:00.
