---
title: Shadow reporting: what the answer engines told a reader
summary: Every hour we ask answer engines with live search what a reader would ask about Storm Charles, keep what they say as data, and compare each statement with this site's record. An engine's answer is evidence about the engine, not about the storm.
---
# Shadow reporting: what the answer engines told a reader

> Kept by incident.shadow@web-summit.dinis, 11 November 2026, 12:08 UTC

**Not a warning service.** For warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). Nothing below is a forecast or advice of ours, and nothing an engine said is a fact here.

## What this is

A member of the public no longer only reads the news: they ask an answer engine. So every hour we ask a fixed set of questions, in Portuguese and English, exactly as a reader would ([questions.json](questions.json)), keep each answer as data, split it into checkable statements **in our own words**, and compare every statement with what this site holds from the bodies that decide and warn ([the timeline](../incidents/2026-11-10-storm-charles/timeline.md), [the decision graph](../incidents/2026-11-10-storm-charles/data/decisions/graph.json), [the warnings](../incidents/2026-11-10-storm-charles/data/weather/warnings.json)).

The idea is the SGit Newsroom's: "The shadow of an article is evidence. Who cites it, what they quote, what they say it says", and "A shadow is not the article" ([Sources and their shadows](https://newsroom.sgit.ai/articles/sources-and-shadows.html), Dinis Cruz, 25 October 2026). Here the shadow is the one an answer engine casts of the authorities' words: **an engine's answer is evidence about the engine, not about the storm.** A statement we do not hold becomes a *lead* to verify at the primary source; it never enters the timeline from here.

| Label | Meaning |
|---|---|
| **matches** | our record holds the same, from the row named |
| **behind us** | our record holds something newer or more exact that the answer missed |
| **ahead: a lead** | not in our record: to verify at the primary source |
| **contradicts** | our record, or the calendar, says otherwise |
| **unsupported** | outside our record, general information, or an omission we note |

So far: **1** hour(s) asked, 10 paused (the account that pays the engines was out of credit: a gap, not silence), **23** answers, **90** statements: 46 matches, 11 behind us, 12 ahead: a lead, 7 contradicts, 14 unsupported. Spent on the engines: 0.17 US dollars (the day's limit is 1). Data: [runs/](runs/) (one file per hour), [leads.json](leads.json), [sources.json](sources.json), [cited.json](cited.json).

## What the first hour shows (02:19 UTC, Wednesday)

Our analysis of one round (23 answers, two engines); labelled as analysis, to be tested by the next rounds.

- **"Tomorrow" was yesterday's tomorrow.** Asked "Is Web Summit on tomorrow?" at 02:19 on Wednesday, Perplexity Sonar answered in both languages for *Wednesday* (the day the press called "tomorrow" on Tuesday). OpenAI's search model read the date and answered for Thursday. A reader asking after midnight could be told "no" about the wrong day.
- **"Aims to proceed" becomes "yes".** On Thursday, the organisers' own word is an aim. Two answers gave it as settled ("as planned", "scheduled to go ahead"); one of those rested on the schedule page as it stood before the storm.
- **Issued is not in force.** Asked what is in force *now*, the engines listed the red warnings (which start at 09:00 and 12:00) and gave no hours; one gave the rain warning in force at that minute as yellow where IPMA's feed has orange; the only warnings actually in force at 02:19 (orange rain, yellow sea) came third or not at all. One answer reported that two large weather sites showed "no active alerts".
- **The 09:00 change got through by one path only.** IPMA moved Lisbon's red rain to 09:00 at 21:23 on Tuesday. Asked directly, Sonar had it (through a weather site that relays the official warnings). Asked generally, two answers still said late morning or 12:00.
- **Madeira: the previous storm.** "What happened in Madeira?" returned Storm Bruna (the weekend) from one engine in both languages and a question back from the other, during a red warning and with 230.5 mm measured in six hours at IPMA's Areeiro station. Asked for the rain by name, Sonar gave 204.4 mm in a day and 188 mm in six hours: behind IPMA's own station values.
- **Who they cite.** Perplexity Sonar pointed at 150 addresses in 18 answers; 13 were a primary body's own page (the Metro, Web Summit, the city council, an embassy) and **none was ipma.pt or prociv.gov.pt**, which its search never returned. OpenAI's search model pointed at 12 addresses in 5 answers; 9 were primary (IPMA, ANEPC, the government's order, the maritime authority, Diário da República, the Metro's status page). Fewer sources, closer to the bodies; but it also said the Metro was "running right now" at 02:19, from the operator's status page, when the Metro is shut for the night.
- **The Metro's hours.** All three Metro answers said yes. None said that at the minute of asking the Metro is closed until about 06:30.

## Hour by hour: what a reader was told, against what the authorities had said

Times are UTC (Lisbon is on UTC in November). "The record" is what the authorities had said by our files at the minute of asking.

### "Is Web Summit on tomorrow?" · "A Web Summit realiza-se amanhã?"

| Asked | Engine | What the reader was told (our words) | Statements | The record at that minute |
|---|---|---|---|---|
| 11 Nov, 02:19 | OpenAI GPT-5 mini with web search (en) | Yes: tomorrow is Thursday 12 November and the organisers intend to run Day 3; Day 2 (Wednesday) was cancelled. | 3 matches | Web Summit, on its own page (19:09 Tuesday): Day 2, Wednesday 11 November, "will not take place"; it "aims to proceed with Day 3 (Thursday, November 12) as planned". Nothing newer from the organisers. [s-1110T1909](../incidents/2026-11-10-storm-charles/timeline.md), [s-1110T2353b](../incidents/2026-11-10-storm-charles/timeline.md) |
| 11 Nov, 02:19 | Perplexity Sonar (en) | No: Day 2 (Wednesday 11 November) will not take place; the summit continues on Thursday. | 2 matches, 1 ahead: a lead, 1 contradicts | 〃 |
| 11 Nov, 02:19 | Perplexity Sonar (pt) | No: Wednesday 11 November is cancelled because of Storm Charles; it reopens on Thursday "as planned". | 3 matches, 1 contradicts | 〃 |
| 11 Nov, 03:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T03:06:17Z) | none | |
| 11 Nov, 04:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T04:06:03Z; one call sent, refused, nothing more asked) | none | |
| 11 Nov, 05:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T05:05:52Z) | none | |
| 11 Nov, 06:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T06:06:07Z) | none | |
| 11 Nov, 07:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T07:06:46Z) | none | |
| 11 Nov, 08:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T08:06:20Z) | none | |
| 11 Nov, 09:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T09:06:51Z) | none | |
| 11 Nov, 10:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T10:06:43Z) | none | |
| 11 Nov, 11:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T11:13:40Z) | none | |
| 11 Nov, 12:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T12:07:55Z) | none | |

### "What warnings are in force in Lisbon now?" · "Que avisos estão em vigor em Lisboa agora?"

| Asked | Engine | What the reader was told (our words) | Statements | The record at that minute |
|---|---|---|---|---|
| 11 Nov, 02:19 | OpenAI GPT-5 mini with web search (en) | Red warnings for wind and for rain for the Lisbon district today; a national alert situation. | 3 matches | IPMA (feed read 01:51): in force at 02:19 in the Lisbon district: orange rain (00:00 to 09:00) and yellow sea (to 06:00). Issued, not yet in force: red rain 09:00 to 18:00, red wind 12:00 to 21:00, orange sea 12:00 to 21:00. The government's alert situation: all Wednesday. [s-1110T2353](../incidents/2026-11-10-storm-charles/timeline.md), [s-1110T0718](../incidents/2026-11-10-storm-charles/timeline.md), [s-1110T1210](../incidents/2026-11-10-storm-charles/timeline.md) |
| 11 Nov, 02:19 | Perplexity Sonar (en) | Red wind, red rain and orange coastal warnings (and a yellow coastal one); some weather sites show no alerts at all. | 2 matches, 3 behind us, 1 ahead: a lead, 1 unsupported | 〃 |
| 11 Nov, 02:19 | Perplexity Sonar (pt) | A yellow rain warning 00:00 to 09:00; the alert situation all Wednesday; red wind and rain warnings issued for about 12:00 to 21:00; tunnels closed. | 2 matches, 1 behind us, 2 ahead: a lead, 1 contradicts, 1 unsupported | 〃 |
| 11 Nov, 03:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T03:06:17Z) | none | |
| 11 Nov, 04:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T04:06:03Z; one call sent, refused, nothing more asked) | none | |
| 11 Nov, 05:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T05:05:52Z) | none | |
| 11 Nov, 06:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T06:06:07Z) | none | |
| 11 Nov, 07:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T07:06:46Z) | none | |
| 11 Nov, 08:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T08:06:20Z) | none | |
| 11 Nov, 09:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T09:06:51Z) | none | |
| 11 Nov, 10:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T10:06:43Z) | none | |
| 11 Nov, 11:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T11:13:40Z) | none | |
| 11 Nov, 12:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T12:07:55Z) | none | |

### "Will Storm Charles hit Lisbon?" · "A tempestade Charles vai atingir Lisboa?"

| Asked | Engine | What the reader was told (our words) | Statements | The record at that minute |
|---|---|---|---|---|
| 11 Nov, 02:20 | OpenAI GPT-5 mini with web search (en) | Yes: heavy rain, very strong south-westerly wind and rough seas on Wednesday, worst from about midday to evening. | 4 matches, 1 ahead: a lead, 1 unsupported | IPMA in writing (communiqué no. 2, 17:07 Tuesday): the centre most likely between Sines and Cabo Carvoeiro, "elevada incerteza"; red warnings for Lisbon stand. By voice (an IPMA meteorologist, 22:35): between the Lisbon region and Cabo de São Vicente, the strongest wind more likely a little south of Lisbon; "Isto ainda atinge a zona de Lisboa". [s-1110T1707b](../incidents/2026-11-10-storm-charles/timeline.md), [s-1110T2235](../incidents/2026-11-10-storm-charles/timeline.md), [s-1111T0029](../incidents/2026-11-10-storm-charles/timeline.md) |
| 11 Nov, 02:19 | Perplexity Sonar (en) | Yes, it will bring hazardous weather to Lisbon; whether the worst passes over the city depends on a track that may have moved south. | 4 matches, 1 behind us, 1 ahead: a lead | 〃 |
| 11 Nov, 02:19 | Perplexity Sonar (pt) | Yes: heavy rain, very strong wind and flood risk in Lisbon, though perhaps a little weaker than first forecast as the track moved south. | 3 matches, 1 behind us, 2 ahead: a lead, 1 contradicts | 〃 |
| 11 Nov, 03:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T03:06:17Z) | none | |
| 11 Nov, 04:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T04:06:03Z; one call sent, refused, nothing more asked) | none | |
| 11 Nov, 05:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T05:05:52Z) | none | |
| 11 Nov, 06:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T06:06:07Z) | none | |
| 11 Nov, 07:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T07:06:46Z) | none | |
| 11 Nov, 08:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T08:06:20Z) | none | |
| 11 Nov, 09:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T09:06:51Z) | none | |
| 11 Nov, 10:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T10:06:43Z) | none | |
| 11 Nov, 11:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T11:13:40Z) | none | |
| 11 Nov, 12:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T12:07:55Z) | none | |

### "Is the Lisbon metro running?" · "O metro de Lisboa está a funcionar?"

| Asked | Engine | What the reader was told (our words) | Statements | The record at that minute |
|---|---|---|---|---|
| 11 Nov, 02:20 | OpenAI GPT-5 mini with web search (en) | Yes, running "right now" by the operator's live status page; weather warnings could affect it. | 1 matches, 1 contradicts, 1 unsupported | The mayor (Tuesday): the Metro runs on Wednesday; five stations open overnight as shelter. Nothing from the Metro itself read by us. At 02:19 the Metro is in its nightly closure. [metro-runs](../incidents/2026-11-10-storm-charles/data/decisions/graph.json), [metro-shelter](../incidents/2026-11-10-storm-charles/data/decisions/graph.json), [s-1110T1425](../incidents/2026-11-10-storm-charles/timeline.md) |
| 11 Nov, 02:19 | Perplexity Sonar (en) | Yes, running, and expected to keep running normally despite the weather, unless conditions worsen. | 2 matches, 1 unsupported | 〃 |
| 11 Nov, 02:19 | Perplexity Sonar (pt) | Yes in normal conditions (06:30 to 01:00); service reported as normal, some stations open overnight for homeless people. | 2 matches, 1 unsupported | 〃 |
| 11 Nov, 03:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T03:06:17Z) | none | |
| 11 Nov, 04:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T04:06:03Z; one call sent, refused, nothing more asked) | none | |
| 11 Nov, 05:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T05:05:52Z) | none | |
| 11 Nov, 06:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T06:06:07Z) | none | |
| 11 Nov, 07:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T07:06:46Z) | none | |
| 11 Nov, 08:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T08:06:20Z) | none | |
| 11 Nov, 09:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T09:06:51Z) | none | |
| 11 Nov, 10:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T10:06:43Z) | none | |
| 11 Nov, 11:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T11:13:40Z) | none | |
| 11 Nov, 12:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T12:07:55Z) | none | |

### "What happened in Madeira?" · "O que aconteceu na Madeira?"

| Asked | Engine | What the reader was told (our words) | Statements | The record at that minute |
|---|---|---|---|---|
| 11 Nov, 02:20 | OpenAI GPT-5 mini with web search (en) | No answer: it asked which event was meant (2010 floods, 2016 fires, or recent news) and did not search. | 1 behind us | IPMA: red warnings for Madeira's south coast and mountains (rain from 21:00 Tuesday to 06:00, wind from 00:00); observed 230.5 mm of rain in six hours at Areeiro (to 01:00). Schools closed Wednesday morning; three cruise calls cancelled; the airport conditioned. [s-1111T0146](../incidents/2026-11-10-storm-charles/timeline.md), [ipma-madeira-red](../incidents/2026-11-10-storm-charles/data/decisions/graph.json), [madeira-schools](../incidents/2026-11-10-storm-charles/data/decisions/graph.json), [apram-cruises](../incidents/2026-11-10-storm-charles/data/decisions/graph.json) |
| 11 Nov, 02:19 | Perplexity Sonar (en) | Storm Bruna, at the weekend: flights grounded, cruise calls cancelled, 125 to 210 incidents, five to nine people displaced. Nothing on Charles. | 1 behind us, 3 unsupported | 〃 |
| 11 Nov, 02:19 | Perplexity Sonar (pt) | Storm Bruna: rain, wind, floods; more than 100 then 125 then 210 incidents; five, later nine, displaced; a lifeguard missing at sea in Funchal. Nothing on Charles. | 1 behind us, 3 unsupported | 〃 |
| 11 Nov, 03:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T03:06:17Z) | none | |
| 11 Nov, 04:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T04:06:03Z; one call sent, refused, nothing more asked) | none | |
| 11 Nov, 05:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T05:05:52Z) | none | |
| 11 Nov, 06:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T06:06:07Z) | none | |
| 11 Nov, 07:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T07:06:46Z) | none | |
| 11 Nov, 08:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T08:06:20Z) | none | |
| 11 Nov, 09:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T09:06:51Z) | none | |
| 11 Nov, 10:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T10:06:43Z) | none | |
| 11 Nov, 11:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T11:13:40Z) | none | |
| 11 Nov, 12:00 | none | not asked: paused: account out of credit (HTTP 402 at 2026-11-11T12:07:55Z) | none | |

## Zoom in: one decision at a time

Questions about single decisions in [the graph](../incidents/2026-11-10-storm-charles/data/decisions/graph.json), asked in English.

| Asked | Question | Decision | What the reader was told (our words) | Statements | The record at that minute |
|---|---|---|---|---|---|
| 11 Nov, 02:20 | Are flights cancelled at Lisbon airport on Wednesday 11 November? (Perplexity Sonar) | [ana-conditioned](../incidents/2026-11-10-storm-charles/data/decisions/graph.json) | Cancellations are expected; ANA says operations will be restricted; some flights already cancelled. | 1 matches, 1 ahead: a lead | ANA (18:04 Tuesday, as reported; its own notice not read by us): operations at Lisbon, Faro and Madeira conditioned on Wednesday; cancellations expected. TAP: free rebooking. [ana-conditioned](../incidents/2026-11-10-storm-charles/data/decisions/graph.json), [tap-adjusts](../incidents/2026-11-10-storm-charles/data/decisions/graph.json) |
| 11 Nov, 02:20 | What does Portugal's alert situation for Storm Charles close on Wednesday 11 November? (Perplexity Sonar) | [gov-alert](../incidents/2026-11-10-storm-charles/data/decisions/graph.json) | It runs 00:00 to 23:59 on Wednesday: schools and non-essential public services closed, outdoor events suspended, access bans to parks and gardens. | 4 matches, 1 ahead: a lead | The government (page timed 12:10 Tuesday): alert situation, mainland, Wednesday 00:00 to 23:59: schools and non-essential public services close; outdoor events suspended. [s-1110T1210](../incidents/2026-11-10-storm-charles/timeline.md), [gov-alert](../incidents/2026-11-10-storm-charles/data/decisions/graph.json) |
| 11 Nov, 02:20 | How much rain fell in Madeira during Storm Charles? (Perplexity Sonar) | [ipma-madeira-red](../incidents/2026-11-10-storm-charles/data/decisions/graph.json) | 204.4 mm in a day and 188 mm in six hours at Chão do Areeiro; earlier 133.9 mm in six hours. | 1 matches, 1 behind us, 2 ahead: a lead | IPMA's station Areeiro: 230.5 mm in six hours (20:00 Tuesday to 01:00 Wednesday); 133.9 mm in the six hours to 22:00. [s-1111T0146](../incidents/2026-11-10-storm-charles/timeline.md) |
| 11 Nov, 02:20 | From what time is IPMA's red rain warning for Lisbon in force on Wednesday 11 November? (Perplexity Sonar) | [ipma-red-rain-0900](../incidents/2026-11-10-storm-charles/data/decisions/graph.json) | From 09:00 on Wednesday, until 18:00. | 1 matches | IPMA: red rain for the Lisbon district 09:00 to 18:00 Wednesday (changed at 21:23 Tuesday from 12:00 to 18:00). [s-1110T2353](../incidents/2026-11-10-storm-charles/timeline.md) |
| 11 Nov, 02:20 | Is Storm Charles now expected to pass south of Lisbon? (Perplexity Sonar) | [ipma-communique-2](../incidents/2026-11-10-storm-charles/data/decisions/graph.json) | Plausible and increasingly likely, not confirmed. | 2 matches, 1 behind us | IPMA in writing: between Sines and Cabo Carvoeiro, high uncertainty (17:07). An IPMA meteorologist by voice (22:35): between the Lisbon region and Cabo de São Vicente. [s-1110T1707b](../incidents/2026-11-10-storm-charles/timeline.md), [s-1110T2235](../incidents/2026-11-10-storm-charles/timeline.md) |
| 11 Nov, 02:20 | Are trains and the Tagus bridges in Lisbon open during Storm Charles? (Perplexity Sonar) | [cp-fertagus-bridge](../incidents/2026-11-10-storm-charles/data/decisions/graph.json) | Generally open, not at full service: Metro and Fertagus run; CP drops some trains over the 25 de Abril bridge. | 2 matches, 2 unsupported | Both Tagus bridges limited to 60 km/h; CP suppresses four trains over the 25 de Abril bridge (12:00 to 15:00); Metro, Carris and Fertagus run, with possible disruption; coaches suspended. [bridges-60](../incidents/2026-11-10-storm-charles/data/decisions/graph.json), [cp-fertagus-bridge](../incidents/2026-11-10-storm-charles/data/decisions/graph.json), [operators-possible-disruption](../incidents/2026-11-10-storm-charles/data/decisions/graph.json) |
| 11 Nov, 02:20 | Why was Web Summit's second day cancelled, who decided, and when was it announced? (Perplexity Sonar) | [websummit-wednesday](../incidents/2026-11-10-storm-charles/data/decisions/graph.json) | Storm risks (tidal flooding, transport, wind on structures); the government formally advised; announced Tuesday evening by email, 7:38 pm. | 3 matches | Web Summit's page, 19:09 Tuesday; its email to attendees 19:38. The government "formally advised"; reasons: tidal flooding, public transport, high winds on external structures. [s-1110T1909](../incidents/2026-11-10-storm-charles/timeline.md), [s-1110T1938](../incidents/2026-11-10-storm-charles/timeline.md) |
| 11 Nov, 02:20 | Is Web Summit's Day 3 on Thursday going ahead? (Perplexity Sonar) | [websummit-thursday](../incidents/2026-11-10-storm-charles/data/decisions/graph.json) | Yes, scheduled to go ahead: the schedule runs 9 to 12 November; one local report says it "aims to proceed". | 1 matches, 2 contradicts | Web Summit "aims to proceed with Day 3 (Thursday, November 12) as planned": an aim, no later statement. [s-1110T1909](../incidents/2026-11-10-storm-charles/timeline.md), [websummit-thursday](../incidents/2026-11-10-storm-charles/data/decisions/graph.json) |

## Where an answer and the record part

Every statement that is behind us or contradicts the record, newest first. Each is about the engine.

| Asked | Engine | The statement (our words) | Label | Against |
|---|---|---|---|---|
| 02:20 | Perplexity Sonar (en): "Is Web Summit's Day 3 on Thursday going ahead?" | Day 3 on Thursday is scheduled to go ahead | contradicts | stronger than the source: the organisers wrote "aims to proceed"; the "yes" rests on the pre-storm schedule and a preview from 9 November [s-1110T1909](../incidents/2026-11-10-storm-charles/timeline.md), [websummit-thursday](../incidents/2026-11-10-storm-charles/data/decisions/graph.json) |
| 02:20 | Perplexity Sonar (en): "Is Web Summit's Day 3 on Thursday going ahead?" | Thursday is "Day 4/closing day" | contradicts | Web Summit calls Thursday Day 3 [websummit-thursday](../incidents/2026-11-10-storm-charles/data/decisions/graph.json) |
| 02:20 | Perplexity Sonar (en): "Is Storm Charles now expected to pass south of Lisbon?" | IPMA-related reporting says the most likely track "has shifted to" between Sines and Cabo Carvoeiro | behind us | the order is reversed: Sines to Cabo Carvoeiro is the older written text (communiqué no. 2, 17:07) [s-1110T1707b](../incidents/2026-11-10-storm-charles/timeline.md) |
| 02:20 | Perplexity Sonar (en): "How much rain fell in Madeira during Storm Charles?" | The highest reported: 204.4 mm in one day and 188 mm in six hours at Chão do Areeiro | behind us | IPMA's station values read at 01:46 give 230.5 mm in six hours (20:00 to 01:00) [s-1111T0146](../incidents/2026-11-10-storm-charles/timeline.md) |
| 02:19 | Perplexity Sonar (pt): "A Web Summit realiza-se amanhã?" | "Tomorrow" read as Wednesday, at 02:19 UTC on Wednesday | contradicts | about the engine, as in the English answer  |
| 02:19 | Perplexity Sonar (en): "Is Web Summit on tomorrow?" | Asked at 02:19 UTC on Wednesday, the engine read "tomorrow" as Wednesday 11 November: by the calendar tomorrow was Thursday | contradicts | about the engine, not the storm: it answered for the day the coverage called "tomorrow"  |
| 02:20 | OpenAI GPT-5 mini with web search (en): "Is the Lisbon metro running?" | The network is running right now; the operator's live status page shows the lines as operational | contradicts | cites the operator's own status page (a primary source), but at 02:19 the Metro is closed for the night: a lead to read what that page shows overnight [metro-runs](../incidents/2026-11-10-storm-charles/data/decisions/graph.json) |
| 02:19 | Perplexity Sonar (pt): "O que aconteceu na Madeira?" | Storm Bruna brought heavy rain, wind, floods, fallen trees, rough seas, cancelled flights and sea links | behind us | the previous storm; nothing on Charles's rain in Madeira overnight [s-1111T0146](../incidents/2026-11-10-storm-charles/timeline.md), [ipma-madeira-red](../incidents/2026-11-10-storm-charles/data/decisions/graph.json) |
| 02:19 | Perplexity Sonar (en): "What happened in Madeira?" | Madeira was hit by Storm Bruna over the weekend: heavy rain, wind, floods, fallen trees, landslides | behind us | the previous storm; nothing on Charles, the red warnings from 21:00 Tuesday or the 230.5 mm in six hours at Areeiro (IPMA, read 01:46) [s-1111T0146](../incidents/2026-11-10-storm-charles/timeline.md), [ipma-madeira-red](../incidents/2026-11-10-storm-charles/data/decisions/graph.json) |
| 02:20 | OpenAI GPT-5 mini with web search (en): "What happened in Madeira?" | The engine did not search and named no current event in Madeira | behind us | a reader asking this during a red warning got history and a question back [s-1111T0146](../incidents/2026-11-10-storm-charles/timeline.md) |
| 02:19 | Perplexity Sonar (pt): "Que avisos estão em vigor em Lisboa agora?" | IPMA has a yellow rain warning for Lisbon from 00:00 to 09:00 | contradicts | IPMA's feed (read 01:51) has orange rain 00:00 to 09:00, since its 21:23 change; the answer took the level from an aggregator of incidents [s-1110T2353](../incidents/2026-11-10-storm-charles/timeline.md), [warnings.json](../incidents/2026-11-10-storm-charles/data/weather/warnings.json) |
| 02:19 | Perplexity Sonar (pt): "Que avisos estão em vigor em Lisboa agora?" | Red warnings for wind and heavy rain are issued for Lisbon, the worst between about 12:00 and 21:00 | behind us | wind 12:00 to 21:00 matches; the red rain has started at 09:00 since IPMA's 21:23 change (and ends 18:00) [s-1110T2353](../incidents/2026-11-10-storm-charles/timeline.md), [s-1110T0718](../incidents/2026-11-10-storm-charles/timeline.md) |
| 02:19 | Perplexity Sonar (en): "What warnings are in force in Lisbon now?" | A red wind warning, gusts up to 140 km/h | behind us | the level and figure match IPMA's; but it is given as in force "now" (02:19): it starts at 12:00 [s-1110T0718](../incidents/2026-11-10-storm-charles/timeline.md), [ipma-red-wind](../incidents/2026-11-10-storm-charles/data/decisions/graph.json) |
| 02:19 | Perplexity Sonar (en): "What warnings are in force in Lisbon now?" | A red rain warning, strong and persistent | behind us | right level; it starts at 09:00, not in force at 02:19 [s-1110T2353](../incidents/2026-11-10-storm-charles/timeline.md), [ipma-red-rain-0900](../incidents/2026-11-10-storm-charles/data/decisions/graph.json) |
| 02:19 | Perplexity Sonar (en): "What warnings are in force in Lisbon now?" | An orange coastal warning, waves 5 to 7 metres | behind us | IPMA's orange sea warning runs 12:00 to 21:00; not in force at 02:19 [warnings.json](../incidents/2026-11-10-storm-charles/data/weather/warnings.json) |
| 02:19 | Perplexity Sonar (pt): "A tempestade Charles vai atingir Lisboa?" | The weather worsens on the mainland from late Wednesday morning | behind us | IPMA's red rain for Lisbon now starts at 09:00; another cited page (tempo.pt) does say the heaviest rain arrives from 09:00 [s-1110T2353](../incidents/2026-11-10-storm-charles/timeline.md), [s-1110T0846](../incidents/2026-11-10-storm-charles/timeline.md) |
| 02:19 | Perplexity Sonar (pt): "A tempestade Charles vai atingir Lisboa?" | Gusts of 100 to 120 km/h in Lisbon, easing by late afternoon | contradicts | IPMA's red wind warning runs to 21:00 and its text allows up to 140 km/h; "late afternoon" is not IPMA's [s-1110T0718](../incidents/2026-11-10-storm-charles/timeline.md) |
| 02:19 | Perplexity Sonar (en): "Will Storm Charles hit Lisbon?" | IPMA sees landfall between Cabo Carvoeiro and Sines | behind us | that is communiqué no. 2 (17:07); at 22:35 an IPMA meteorologist said between the Lisbon region and Cabo de São Vicente [s-1110T1707b](../incidents/2026-11-10-storm-charles/timeline.md), [s-1110T2235](../incidents/2026-11-10-storm-charles/timeline.md) |

## Leads: to verify at the primary source

**Hypotheses about where to look, not facts.** For incident.conductor@ and incident.researcher@; none is in the timeline. Data: [leads.json](leads.json).

| Seen | The statement (our words) | Why it is a lead | Addresses the engine gave (not read by us) |
|---|---|---|---|
| 02:20, OpenAI GPT-5 mini with web search | The harbour master of Lisbon issued a notice (no. 53/2026) on worsening conditions, 9 to 11 November | a lead: the maritime authority's own notice, a primary body we do not read | [amn.pt](https://www.amn.pt/DGAM/Capitanias/Lisboa/Documentos_AMN/Aviso%20n%C2%BA%2053_2026_Agravamento%20condi%C3%A7%C3%B5es%20meteo%2009-11NOV_signed.pdf) |
| 02:19, Perplexity Sonar | A US embassy weather alert exists for storms Bruna and Charles | a lead: an official notice to its citizens, not in our record | [pt.usembassy.gov](https://pt.usembassy.gov/weather-alert-storms-bruna-and-charles-and-start-of-the-rainy-season-in-portugal/) |
| 02:19, Perplexity Sonar | Urban flooding possible in more than 100 municipalities | the claim the researcher could not find at APA at 01:45; this gives a press address for it (Expresso), still not APA's own | [expresso.pt](https://expresso.pt/tempestades/2026-11-10-portugal-em-alerta-tempestade-charles-pode-provocar-cheias-urbanas-em-mais-de-100-municipios-e-bruna-nao-vai-embora-4a4f2eb0) |
| 02:19, Perplexity Sonar | Football matches are among the events disrupted | a lead: a Champions League match called off, by the cited title; not in our record | [en.as.com](https://en.as.com/soccer/storm-charles-forces-champions-league-cancellation-f202611-n/) |
| 02:19, Perplexity Sonar | AccuWeather and Weather.com show no active alerts for Lisbon | a lead for incident.weatherwatch@: two large weather sites showing nothing while IPMA has red warnings issued | [accuweather.com](https://www.accuweather.com/en/pt/lisbon/1-274087_1_al/weather-warnings/1-274087_1_al), [weather.com](https://weather.com/pt/lisbon/city/lisbon/localalerts?phenomena=TCW&significance=S&areaid=PT016&office=EUPT&etn=1109), [accuweather.com](https://www.accuweather.com/en/pt/lisbon/274087/weather-warnings/274087) |
| 02:19, Perplexity Sonar | Gusts may reach 120 km/h or more "in case of a sting jet" | the figure matches communiqué no. 2; the sting jet is not in our record: whose words? | [correiodamanhacanada.com](https://www.correiodamanhacanada.com/situacao-alerta-em-portugal-vigora-entre-0000-e-2359-de-quarta-feira/), [sicnoticias.pt](https://sicnoticias.pt/meteorologia/2026-11-10-depressao-bruna-deixa-varios-distritos-sob-aviso-charles-a-caminho-4dd895a9) |
| 02:19, Perplexity Sonar | The city council's traffic page shows no traffic restrictions "at the moment" | a lead: the council's own page, read by the engine as empty while the tunnels are closed | [lisboa.pt](https://www.lisboa.pt/cidade-informa/como-circulo/alteracoes-a-circulacao) |
| 02:19, Perplexity Sonar | The official schedule still lists sessions on 11 November | a lead: is websummit.com/schedule still showing Wednesday's sessions with no notice? | [websummit.com](https://websummit.com/en/), [websummit.com](https://websummit.com/schedule/) |
| 02:20, Perplexity Sonar | Some flights to and from Lisbon were already being cancelled; at least 40 flights cancelled across the country (a cited title) | a lead: a count of cancellations, not in our record; to verify at ANA or the airlines | [whichterminal.co.uk](https://whichterminal.co.uk/lisbon-airport/cancellations/november-2026), [proflightsearch.com](https://proflightsearch.com/airport-departures/lisbon-LIS), [24noticias.sapo.pt](https://24noticias.sapo.pt/atualidade/artigos/pelo-menos-40-voos-cancelados-em-todo-o-pais) |
| 02:20, Perplexity Sonar | Access bans to parks, forests and gardens in many municipalities | we hold Lisbon's parks and gardens (the mayor); "many municipalities" and forests are a lead | [heraldnews.com](https://www.heraldnews.com/story/news/local/ojornal/2026/11/10/portugal-braces-for-storm-charles-as-schools-services-shut-down/92710458007/), [portosecreto.co](https://portosecreto.co/en/storm-charles-in-porto/), [tugadaily.com](https://tugadaily.com/en/news/storm-charles-orange-wind-warning-six-districts/) |
| 02:20, Perplexity Sonar | 91.7 mm in six hours by 21:00 | checkable against madeira.json by incident.meteorologist@ | [pt.wikipedia.org](https://pt.wikipedia.org/wiki/Depress%C3%A3o_Charles), [madeiraislandnews.com](https://www.madeiraislandnews.com/2026/11/chao-do-areeiro-with-double-red-warning-signal-registered.html) |
| 02:20, Perplexity Sonar | Forecast: more than 100 mm in 12 hours in the mountains | the warning's own figure is not in our rows | [heraldnews.com](https://www.heraldnews.com/story/news/local/ojornal/2026/11/10/portugal-braces-for-storm-charles-as-schools-services-shut-down/92710458007/), [theportugalnews.com](https://www.theportugalnews.com/news/2026-11-10/new-storm-charles-to-bring-strong-winds-and-heavy-rain-to-portugal/1113609), [au.news.yahoo.com](https://au.news.yahoo.com/storm-charles-hit-portugal-spain-174821415.html) |

## Which sources the engines lean on

| Engine | Answers | Addresses used | Of them, a primary body's own page | Answers citing a primary body | Answers with no address |
|---|---|---|---|---|---|
| Perplexity Sonar | 18 | 150 | 13 (9%) | 8 | 0 |
| OpenAI GPT-5 mini with web search | 5 | 12 | 9 (75%) | 4 | 1 |

The hosts used most (all engines, all runs; [sources.json](sources.json) has every host):

| Host | Used in answers | Returned by search | Primary body? |
|---|---|---|---|
| observador.pt | 9 | 14 | no |
| rtp.pt | 8 | 10 | no |
| tvi.iol.pt | 7 | 14 | no |
| metrolisboa.pt | 6 | 19 | yes |
| expresso.pt | 6 | 6 | no |
| websummit.com | 5 | 29 | yes |
| euronews.com | 5 | 14 | no |
| heraldnews.com | 5 | 8 | no |
| theportugalnews.com | 4 | 9 | no |
| yr.no | 4 | 8 | no |
| eco.sapo.pt | 4 | 6 | no |
| 24noticias.sapo.pt | 4 | 4 | no |
| ground.news | 3 | 34 | no |
| publico.pt | 3 | 8 | no |
| portugaldecoded.substack.com | 3 | 6 | no |
| dn.pt | 3 | 5 | no |
| madeiraislandnews.com | 2 | 9 | no |
| mixvale.com.br | 2 | 8 | no |
| sicnoticias.pt | 2 | 5 | no |
| bica.now | 2 | 5 | no |
| accuweather.com | 2 | 4 | no |
| cnnportugal.iol.pt | 2 | 4 | no |
| executivedigest.sapo.pt | 2 | 4 | no |
| tugadaily.com | 2 | 4 | no |
| pt.usembassy.gov | 2 | 3 | yes |

"Primary" means the host of a body that decides or warns, or of the organiser or operator for its own decision (IPMA, ANEPC, the government, Diário da República, Web Summit, the Metro, the city council, the maritime authority and a few more; the list is in [tools/shadow-index.mjs](../tools/shadow-index.mjs)). A count of addresses, not a judgement of anyone's journalism.

## How it is made

- [tools/shadow-ask.mjs](../tools/shadow-ask.mjs) asks through the team's one wrapper for model calls (every call recorded, a daily limit). The engines are named because they are the subject: Perplexity Sonar (`perplexity/sonar`, OpenRouter); OpenAI GPT-5 mini with web search (`openai/gpt-5-mini`, OpenRouter (the web plugin, the provider's own search)).
- The answers' full text stays in the raw store outside this repository (each answer here carries the record's name and sha256). This page and the run files hold our own words, fragments of a few words in quotes, and the addresses the engines gave.
- Addresses on social networks are kept as the host only: a post there may be a private person's.
- The splitting into statements and the labels are the shadow desk's reading, by hand, each hour. A label is our analysis: check it against the row it names.
- A news API for headlines and links: [news-apis.md](news-apis.md).
