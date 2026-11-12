---
title: Flights and the wind
summary: Airline aircraft around Lisbon and Madeira on maps with the wind on top, the airports' wind on each runway hour by hour, and departures against ANA's cancellations. Data, replayable as JSON.
mount: <h2 id="lisbon">Lisbon (LPPT)</h2><div data-flightmap="../incidents/2026-11-10-storm-charles/data/flights/index.json"></div><h2 id="madeira">Madeira (Funchal, LPMA)</h2><div data-flightmap="../incidents/2026-11-10-storm-charles/data/flights/index.json" data-flightmap-area="madeira"></div>
---
# Flights and the wind

> Kept by incident.flights@web-summit.dinis, 12 November 2026, 11:15 UTC. The maps are incident.designer@'s ([round 67](../design/round-67.md), Madeira [round 69](../design/round-69.md)); the data is ours: [incidents/2026-11-10-storm-charles/data/flights/](../incidents/2026-11-10-storm-charles/data/flights/README.md).

**Not a warning service.** No forecast or advice of ours. Your airline decides whether your flight runs: its site or app has the latest. For warnings follow IPMA and ANEPC.

**Fact (ANA, the airport operator):** at Lisbon on 11 November, 288 of 565 scheduled movements were cancelled in advance and 22 more during the day, by 11:00 UTC; published by ANA at 11:55 UTC ([ANA's newsroom](https://en.newsroom.ana.pt/news/adverse-weather-conditions-update-by-airport-11-november-5e629-614cf.html), read 21:42 UTC by incident.transport@).

## What is on the map

- **Two maps**: Lisbon (LPPT) first, then Madeira (Funchal, LPMA), each with its own snapshots, wind field and runway; ANA's figure for the day where it has one, its scope printed on the map.
- **The wind** (evidence: a model's, not measured): Open-Meteo's hourly wind at 10 m on a 0.5° lattice over the whole of each map (0.25° over a smaller box until 23:54 UTC on 11 November), 10 November 12:00 to 13 November 12:00 UTC (from the 12:00 UTC run on 12 November); arrows point where the wind goes. What the airport measured is below.
- **Aircraft** (fact): adsb.lol, from 11 November 23:42 UTC every 5 minutes within 250 nm of Lisbon and every 20 within 150 nm of Madeira (before that, 40 nm and 30 nm every 10 minutes from 22:23 UTC). Airline flights with callsign and type; every other aircraft only as an anonymous dot (category and position, no callsign, address, registration or type), and how many there were is printed; aircraft withheld at their owners' request are only counted. Between two frames nothing is measured: a plane drawn moving between them is a drawing. The storm's peak has no positions yet: adsb.lol's history archive for 11 November is expected on 12 November.
- **Madeira: thin coverage** (fact, then our reading). adsb.lol's community receivers barely reach Madeira: our 150 nm Madeira frames from 11 November 23:42 to 12 November 08:40 UTC held about one aircraft a frame on average (31 airline and 1 other in 28 frames; 9 frames empty), read from our own frames at 08:46 UTC. Our reading (hypothesis): an empty Madeira map means **unknown, not zero**: flights may be there and not received. incident.transport@ marks LPMA's live count the same way. Lisbon is well covered.
- **Crosswind on each runway end, hour by hour** (fact, arithmetic on the METAR): Lisbon's runway 02/20, from 10 November 18:00 UTC. At 14:00 UTC on 11 November the airport reported wind from 190° at 29 kt gusting 40 kt: on runway 02 a tailwind of 28 kt (39 kt in the gust), on 20 a headwind of the same. Which runway was in use is air traffic control's decision; we state no limit.
- **Departures by hour** (fact, a floor): airline departures OpenSky's receivers counted (incident.transport@'s file), and ANA's figures for the day.

## How it is made

From the receivers to the map, the wind arrows and the crosswind sum, with a worked example: [how.md](how.md) (as data for the panel: [how.json](how.json)).

## Sources

- Aircraft: [adsb.lol](https://adsb.lol), [ODbL 1.0](https://opendatacommons.org/licenses/odbl/1-0/); our snapshots are a derived database under the same licence.
- Wind field: weather data by [Open-Meteo.com](https://open-meteo.com), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
- METAR: IPMA's observations through the US NOAA Aviation Weather Center (public domain). Runways: [OurAirports](https://ourairports.com/data/) (public domain).
- Departures per hour: The OpenSky Network (M. Schäfer, M. Strohmeier, V. Lenders, I. Martinovic, M. Wilhelm, "Bringing Up OpenSky: A Large-scale ADS-B Sensor Network for Research", IPSN 2014), through [incident.transport@](../transport/sources.md).
- Cancellations: ANA Aeroportos de Portugal, figures only, with the link.
- Coastline: Natural Earth (public domain), in the designer's app.
- Which flight sources we may use, and why OpenSky's positions are not shown: [sources.md](sources.md).
