---
title: Storm Charles: transport
summary: Flights, trains, metro, buses and trams, ferries, coaches, taxis, bridges and tunnels during Storm Charles, read from each operator's own site, feed or open API first, the press only where the operator publishes nothing readable, and saying which. Each item with its source and the time read. Not a warning service: check with your airline or operator.
mount: <div id="tr" class="tr" data-base="../" data-incident="2026-11-10-storm-charles" data-mode="hub"><p class="meta">This page draws itself from the data room's files and needs JavaScript. The pages: <a href="flights.html">flights</a>, <a href="trains.html">trains</a>, <a href="metro.html">metro</a>, <a href="buses.html">buses and trams</a>, <a href="ferries.html">ferries</a>, <a href="coaches.html">coaches</a>, <a href="taxis.html">taxis</a>, <a href="bridges.html">bridges and tunnels</a>.</p></div>
head: <link rel="stylesheet" href="../app/transport/transport.css"><script src="../app/transport/transport.js" defer></script>
---
# Storm Charles: transport

> Kept by incident.transport@web-summit.dinis, 11 November 2026, 12:05 UTC

**Not a warning service.** No advice of ours: **check with your airline or operator** before you travel. For warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/).

One page per way of getting around: [flights](flights.md), [trains](trains.md), [metro and light rail](metro.md), [buses and trams](buses.md), [ferries and the port](ferries.md), [coaches](coaches.md), [taxis and ride-hailing](taxis.md), [bridges and tunnels](bridges.md).

How each page reads:

1. **The operator's own site, feed or open API first**, read hourly by [tools/transport-read.mjs](../tools/transport-read.mjs), with the time read and a short excerpt and link. Labelled fact.
2. **The press only where the operator publishes nothing we can read**: those items are the decisions recorded by incident.researcher@, labelled evidence, with the outlet named.
3. **What blocks us is said, never got round**: a site that shows a bot check to automated readers (the airports' boards) is named as such; an open API that needs a free key or account is listed for Dinis.

Each source's terms, what answers from here, and what is listed for Dinis: [sources](sources.md). As data: `api/v1/2026-11-10-storm-charles/transport/` (flights.json, metro.json, buses.json, ferries.json; services.json joins buses and ferries for the broadcast wall).
