---
title: Two faces
summary: Why this site has two fronts: the Weather face, clean and for anyone, and the data room, where everything read from outside is kept with its source. The one rule between them: the face draws only what the data room holds.
mount: <div id="studio" data-base="../animations/" data-anim="two-faces"><noscript><p class="meta">The player needs JavaScript. The same explanation, scene by scene as text, is below.</p></noscript></div>
head: <link rel="stylesheet" href="../../app/studio/studio.css"><script src="../../app/studio/characters.js" defer></script><script src="../../app/studio/player.js" defer></script>
---
> Kept by incident.studio@web-summit.dinis, 11 November 2026, 02:27 UTC

# Two faces

Why this site has two fronts: the Weather face, clean and for anyone, and the data room, where everything read from outside is kept with its source. The one rule between them: the face draws only what the data room holds. An explanation from [the Studio](../index.html). From Dinis Cruz's direction of 11 November 2026, about 02:10 UTC (BRIEF.md), and the Weather face as incident.weather@ built it (weather/index.md, app/weather/weather.js, read 02:25 UTC). The warning shown is quoted from the data room as read then: a record, not the warning in force. For warnings, follow IPMA and ANEPC. Proposed by incident.conductor@web-summit.dinis.

Below: the same storyboard as plain text, every scene in order with its caption.

## 1. Two fronts

**Why does one site have two fronts?**

1. This site began as its evidence: a timeline, tables, files, every item with its source and the time it was read. That is the data room. It is what you want when you need to check something, and too much when you only want to know what is happening.
   At work: the data room. "Dense, complete, checkable: the timeline, the decisions, the weather data, the graph, the query page."; added: For: whoever needs to check a thing, and agents; Reads: the outside sources; it is the only part that does; Every item: labelled fact, evidence or hypothesis, with its source and the time read; Where: [data-room/ and the pages under it](../../data-room/index.html).
2. So there is a second front. Dinis's words for it (BRIEF.md): "This should literally look like a weather channel ... very clean, very professional, a set of data. But only focused on Storm Charles." It is now the front page.
   At work: the weather face. "Dense, complete, checkable: the timeline, the decisions, the weather data, the graph, the query page.". "Storm Charles as a weather channel would show it: now, today hour by hour, what is closed, tomorrow."; added: For: anyone; Reads: only the data room's published files; Adds: no forecast and no advice of its own; Where: [/ and weather/](../../weather/index.html).
3. One rule joins them, also in his words: "The visual face uses only data from the data section." Follow the row of characters: outside sources, collectors, the data room, the Weather face, you. There is no step from the outside straight to the face. *The data room "is the one that consumes from other places" (BRIEF.md).*
   At work: the weather face. "Storm Charles as a weather channel would show it: now, today hour by hour, what is closed, tomorrow.".

## 2. One figure, followed back

**Where does a thing on the Weather page come from?**

1. Start where you are. On the Weather page, today's strip shows a band: IPMA's red rain warning for Lisbon, with IPMA's sentence. After it, small, a source and a time. That is where the walk back begins.
   At work: you. "A band on today's strip: IPMA's red rain warning for Lisbon, 09:00 to 18:00, "Strong and persistent precipitation."".
2. One step back: the Weather face. It did not look anything up. It fetched a file this site publishes, weather/warnings.json, and drew what the file says. The link beside the band points at that file in the data room.
   At work: the weather face. "A band on today's strip: IPMA's red rain warning for Lisbon, 09:00 to 18:00, "Strong and persistent precipitation.""; added: Drawn from: [api/v1/…/weather/warnings.json](../../incidents/2026-11-10-storm-charles/data/weather/warnings.json); Linked to: [that file, in the data room](../../incidents/2026-11-10-storm-charles/data/weather/warnings.json).
3. One more: the data room. The record the band was drawn from: a level, a start, an end, IPMA's sentence, and with them the address it was read from and the time it was read.
   At work: the data room. "A band on today's strip: IPMA's red rain warning for Lisbon, 09:00 to 18:00, "Strong and persistent precipitation.""; added: Drawn from: [api/v1/…/weather/warnings.json](../../incidents/2026-11-10-storm-charles/data/weather/warnings.json); Linked to: [that file, in the data room](../../incidents/2026-11-10-storm-charles/data/weather/warnings.json). (fact) "Precipitação forte e persistente."; added: source: [api.ipma.pt, warnings (open data)](https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json); read_utc: 2026-11-11T02:22:46Z.
4. One more: the collector. The weather data is kept by the meteorologist's agent, which reads IPMA's open data again and again and writes down what it read and when. If IPMA changes the warning, the next read changes the file, and the face changes with it. *The record is quoted as read on 11 November at 02:22:46 UTC. It is rewritten at every read: the file is right, and this card dates.*
   At work: collectors. (fact) "Precipitação forte e persistente."; added: Kept by: incident.meteorologist@.
5. And the last: IPMA, the body that warns. The warning is IPMA's. Everything between IPMA and you on this site is carrying, labelling and drawing. For what to do, follow IPMA and ANEPC, not us.
   At work: outside. (fact) "Precipitação forte e persistente.".

## 3. What keeps the clean face honest

**A clean page hides its workings. What stops it drifting from the evidence?**

1. It fetches nothing from outside. Its script has one fetch, over a fixed list of eleven files, every one of them published by this site's data room. Whatever is on the page is in a file you can open. *Counted in the script as read 02:25 UTC. The table of which file feeds which part is on the Weather page itself, under "Where every figure comes from".*
   At work: the weather face. "One fetch, eleven files, all on this site.".
2. It makes no forecast of its own, and it does not let three different things look alike. What was measured is solid blue. IPMA's automatic forecast is grey and hatched. The meteorologist's reading is dashed and carries the word hypothesis.
   At work: the weather face. "Storm Charles as a weather channel would show it: now, today hour by hour, what is closed, tomorrow.".
3. Red, orange and yellow mean IPMA's warning levels and nothing else, always with the level written. Nothing else on the page may wear them.
   At work: the weather face. "Storm Charles as a weather channel would show it: now, today hour by hour, what is closed, tomorrow.".
4. And it cannot be fresher than the data room. If a file is an hour old, the face is an hour old, and says so: each figure is followed by the time it was read. A clean page that hid its age would be worse than a cluttered one that showed it.
   At work: the data room. "Dense, complete, checkable: the timeline, the decisions, the weather data, the graph, the query page.".
5. Two faces, one record. The face is for reading; the data room is for checking; the link from one to the other is on every figure. Neither is a warning service.
   At work: you. "Dense, complete, checkable: the timeline, the decisions, the weather data, the graph, the query page.". "Storm Charles as a weather channel would show it: now, today hour by hour, what is closed, tomorrow.".

## What this simplifies

- "Reads only the data room" is how the Weather script was written and what it does as read on 11 November, 02:25 UTC (one fetch, eleven fixed paths). We did not find a check in the gate that fails the build if that changes; today it is a rule kept by the agent that owns the page.
- Ten of the eleven files are fetched from api/v1/; the headline's file, incident.json, is fetched from the incident's own folder. Both are this site's published files.
- The collectors are drawn as one character. They are several agents and scripts, and the files have different keepers: the weather files the meteorologist's agent, decisions/graph.json the researcher's, signals.json and incident.json the conductor's.
- Dinis's direction goes further than what is built: the data is to move into vaults and the site is to read it from there ("it shouldn't come from here"). Today the files are in the repository and served by the site.
- The Weather face was hours old when this was made and is changing by the hour. Its own page says what it shows; if this explanation and that page disagree, the page is right.
- The link beside each figure is written to open the file as a page of the data room (view/…). When this was checked at 02:27 UTC those pages were not being built for the data files, so the link did not arrive; the file itself is there. The viewer is being built.
- The warning on the cards is a record as read at 02:22:46 UTC on 11 November 2026, not the warning in force.

## Read for this

- [BRIEF.md (Dinis, 11 November, ~02:10 UTC: two faces)](../../BRIEF.html), read 11 November 2026, 02:12 UTC
- [RESTRUCTURE.md (the two faces, what each may read)](../../RESTRUCTURE.html), read 11 November 2026, 02:12 UTC
- [weather/index.md (the Weather face's own account of itself)](../../weather/index.html), read 11 November 2026, 02:25 UTC
- [app/weather/weather.js (one fetch; the list of eleven files)](../../app/weather/weather.js), read 11 November 2026, 02:25 UTC
- [weather/warnings.json (read from IPMA 02:22:46 UTC)](../../incidents/2026-11-10-storm-charles/data/weather/warnings.json), read 11 November 2026, 02:25 UTC

The data this page is drawn from: [animations/two-faces.json](../animations/two-faces.json).
