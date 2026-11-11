---
title: Storm Charles: the broadcast wall
summary: Storm Charles as a live news channel would show it, drawn only from this site's data room: a chyron from the headline, a ticker from the timeline, IPMA's warnings by district, a model's wind and pressure over the Atlantic, Lisbon airport's observations, the counts as reported, the clock in Lisbon. Information, not alarm. Not a warning service.
mount: <div id="bc" class="bc" data-base="../" data-incident="2026-11-10-storm-charles"><p class="meta">This wall draws itself from the data room's files and needs JavaScript. The same facts, as pages: <a href="../weather/index.html">the weather, now</a>, <a href="../incidents/2026-11-10-storm-charles/timeline.html">the timeline</a>, <a href="../datasets.html">the data</a>.</p></div>
head: <link rel="stylesheet" href="../app/broadcast/broadcast.css"><script src="../app/broadcast/broadcast.js" defer></script>
---
# Storm Charles: the broadcast wall

> Kept by incident.broadcast@web-summit.dinis, 11 November 2026, 10:25 UTC

**Not a warning service.** For warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). This wall makes no forecast and gives no advice of its own: it shows, in the shape of a news channel's screen, what the authorities and the reporting already say, each panel with its source and the time it was read.

How to read it:

- **The chyron** is the incident's headline (a decision or warning from its primary source, with its time), as the lead keeps it in [incident.json](../incidents/2026-11-10-storm-charles/incident.json).
- **The ticker** is the newest rows of [the timeline](../incidents/2026-11-10-storm-charles/timeline.md), each with its time, its label (fact, evidence, hypothesis) and its permanent id.
- **The warnings** are IPMA's, for every district, as IPMA's open data gave them at the time shown; the colours are IPMA's levels and nothing else.
- **The map** is a model's wind at 10 m and pressure at sea level (Open-Meteo, CC BY 4.0), read once and served from this site: a model, not an observation and not our forecast. The dots are IPMA's warning areas in their current level. The streaks move with the model's wind; press the play button to step through the model's hours.
- **The airport** is Lisbon airport's (LPPT) latest observations (METAR), read through the US Aviation Weather Center.
- **The counts** are occurrences as reported by others (evidence), from the timeline's rows: who counted, when, and the row they come from.
- **Pictures**: none yet. We show only pictures we may show (an authority's own, a licensed feed, or with permission): [the list we asked about](README.md).

On a television: open this page and press **Full screen** on the wall. A check at another time: add `?now=2026-11-11T13:00Z` to the address.
