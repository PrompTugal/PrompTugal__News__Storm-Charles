# incident.flights@: flights on the map, with the wind on top

> Kept by incident.flights@web-summit.dinis, 11 November 2026, 22:06 UTC

Dinis asked (~22:00 UTC, 11 November, [BRIEF.md](../../BRIEF.md), newest section) for "the planes in the map intersected with the wind ... on top of that". This agent builds the **data**; incident.designer@ draws the map. Everything is JSON that can be replayed, under [incidents/2026-11-10-storm-charles/data/flights/](../../incidents/2026-11-10-storm-charles/data/flights/README.md), served also at `api/v1/2026-11-10-storm-charles/flights/`.

**Not a warning service.** No forecast or advice of ours. Your airline decides whether your flight runs; IPMA and ANEPC warn.

## What it builds, in order

1. `crosswind.json`: the airports' METAR wind for LPPT (Lisbon) and LPMA (Funchal) from 10 November 18:00 UTC, per hour, with headwind and crosswind on each runway end (runway headings from OurAirports, public domain), joined to airline departures OpenSky saw per hour (incident.transport@'s `flights.json`) and ANA's own cancellation figures.
2. `wind/`: Open-Meteo's hourly wind (10 m and 850 hPa) on a lattice over Lisbon and one over Madeira, 10 November 12:00 to 12 November 12:00 UTC (CC BY 4.0).
3. `snapshots/<date>/<HH>.json`: airline aircraft near Lisbon and Funchal from OpenSky's anonymous `/states/all`, every 10 minutes from 11 November 22:00 UTC. **Airline flights only** (an airline's ICAO code plus a flight number); every other aircraft is dropped and never counted. No ICAO24 address in a published file. The storm's own hours cannot be replayed this way: anonymous OpenSky has no history.
4. Provenance in every file (request URL, HTTP status, bytes, sha256 of the raw response, time read, response time); raw responses stay outside git. `index.json` lists every file with its sha256.
5. Once an hour, an open-weight model through `tools/llm.mjs` writes a two-sentence summary of the flight picture; every number is checked against the JSON, and it is published, labelled as model output, only if it passes.

Tools: `tools/flights-*.mjs`. State: [status.json](status.json).

## Sources

- The OpenSky Network, https://opensky-network.org (M. Schäfer, M. Strohmeier, V. Lenders, I. Martinovic, M. Wilhelm, "Bringing Up OpenSky: A Large-scale ADS-B Sensor Network for Research", IPSN 2014). "For research and non-commercial purposes"; the full terms page is still for a person to read ([transport/sources.md](../../transport/sources.md)).
- METAR: IPMA's observations, read through the US NOAA Aviation Weather Center's public API (public domain), via incident.meteorologist@'s files.
- Open-Meteo, https://open-meteo.com (CC BY 4.0).
- Runway headings: OurAirports, https://ourairports.com/data/ (public domain).
- ANA Aeroportos de Portugal's newsroom: figures only, with the link (ANA's terms).
