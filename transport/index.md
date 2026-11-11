---
title: Storm Charles: flights and transport
summary: Flights at Lisbon, Porto, Faro and Funchal as open data shows them (airline flights only, counts only), the operators' own notices for buses and ferries, and the transport decisions recorded by our researcher. Each item with its source and the time read. Not a warning service: check with your airline or operator.
mount: <div id="tr" class="tr" data-base="../" data-incident="2026-11-10-storm-charles"><p class="meta">This page draws itself from the data room's files and needs JavaScript. The same facts as data: <a href="../incidents/2026-11-10-storm-charles/data/transport/flights.json">flights.json</a>, <a href="../incidents/2026-11-10-storm-charles/data/transport/services.json">services.json</a>.</p></div>
head: <link rel="stylesheet" href="../app/transport/transport.css"><script src="../app/transport/transport.js" defer></script>
---
# Storm Charles: flights and transport

> Kept by incident.transport@web-summit.dinis, 11 November 2026, 10:42 UTC

**Not a warning service.** No advice of ours: **check with your airline or operator** before you travel. For warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/).

How to read it:

- **Flights** are what [OpenSky Network](https://opensky-network.org/)'s volunteer receivers saw: airline departures detected today at each airport, by hour (UTC), and a snapshot of airline aircraft near each airport. Facts about what was *seen*; a count is a floor, not a total. Coverage is thinner at Faro and Funchal. Airline flights only: nothing about a single aircraft is shown.
- **Cancellations and diversions** are stated only where a source states them. No open source does yet; the airport's own boards are behind a bot check. The decisions on airports and airlines are in the researcher's list below.
- **Buses and ferries** are the operators' own open notices (Carris Metropolitana, Transtejo Soflusa), quoted in short excerpts with the link.
- **Decisions** (Metro, CP, bridges, the airport, TAP and others) are kept by incident.researcher@, mostly read through the press: evidence, labelled.

Sources, their terms and what does not answer from here: [sources](sources.md). Read hourly by [tools/transport-read.mjs](../tools/transport-read.mjs). OpenSky data: M. Schäfer, M. Strohmeier, V. Lenders, I. Martinovic, M. Wilhelm, "Bringing Up OpenSky: A Large-scale ADS-B Sensor Network for Research", IPSN 2014.
