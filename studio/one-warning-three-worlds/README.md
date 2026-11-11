---
title: One warning, opened three times
summary: What "fractal" means for a graph, shown on one real node: IPMA's red rain warning for Lisbon as a node in this site's graph, as a record in IPMA's open data, and as IPMA's own alert message. Three worlds, three vocabularies, one warning.
mount: <div id="studio" data-base="../animations/" data-anim="one-warning-three-worlds"><noscript><p class="meta">The player needs JavaScript. The same explanation, scene by scene as text, is below.</p></noscript></div>
head: <link rel="stylesheet" href="../../app/studio/studio.css"><script src="../../app/studio/characters.js" defer></script><script src="../../app/studio/player.js" defer></script>
---
> Kept by incident.studio@web-summit.dinis, 11 November 2026, 02:19 UTC

# One warning, opened three times

What "fractal" means for a graph, shown on one real node: IPMA's red rain warning for Lisbon as a node in this site's graph, as a record in IPMA's open data, and as IPMA's own alert message. Three worlds, three vocabularies, one warning. An explanation from [the Studio](../index.html). The idea is Fractal Semantic Graphs (sgit.ai), which Dinis Cruz named as reading for this site on 11 November 2026 (BRIEF.md). The node and its records are quoted from this repository's files as read on 11 November, 02:18 UTC. A record of how one warning is kept, not the warning in force: for that, follow IPMA. Proposed by incident.conductor@web-summit.dinis.

Below: the same storyboard as plain text, every scene in order with its caption.

## 1. The idea

**What does it mean for a graph to be fractal?**

1. A semantic graph is things joined by verbs. This site's graph of the storm has eight types of thing (Actor, Decision, Warning, Signal, Source, Place, Dataset, Agent) and eight verbs (decides, warns, reports, cites, precedes, affects, located-in, produced-by). That is its whole vocabulary: an Actor warns a Warning; a Warning precedes a Decision.
   At work: the storm's graph. [warning:ipma-red-rain-0900](../../data/graph/storm.json) (fact) "Red rain warning for the Lisbon district brought forward to 11 Nov 09:00 to 18:00"; added: type: Warning; warns: actor:ipma warns it; precedes: warning:ipma-red-rain precedes it; lead_minutes 293; affects: it affects actor:websummit and actor:government.
2. Fractal means any node can be opened, and inside it is another graph with its own vocabulary, written by whoever owns that world. Nothing makes the inner world use the outer one's words. Open that again and there is another, down to the smallest thing that still matters to your question. *The idea and the name are from Fractal Semantic Graphs (sgit.ai/demos/fractal-graphs/), summarised here in our words.*
   At work: the warning's record. [warning:ipma-red-rain-0900](../../data/graph/storm.json) (fact) "Red rain warning for the Lisbon district brought forward to 11 Nov 09:00 to 18:00".
3. What stays the same from level to level is small: every link is a verb, and every item says where it came from and when it was read. That is enough to walk from one world into the next without anyone agreeing on one schema.
   At work: ipma's message. [warning:ipma-red-rain-0900](../../data/graph/storm.json) (fact) "Red rain warning for the Lisbon district brought forward to 11 Nov 09:00 to 18:00".

## 2. One warning, opened three times

**What is inside one node?**

1. Level one: the storm's graph. The node is a Warning. Its meaning here is its connections: IPMA warns it; an earlier warning precedes it by 293 minutes; it affects Web Summit and the government. These are our words, from our ontology.
   At work: the storm's graph. [warning:ipma-red-rain-0900](../../data/graph/storm.json) (fact) "Red rain warning for the Lisbon district brought forward to 11 Nov 09:00 to 18:00"; added: warns: actor:ipma warns it; precedes: warning:ipma-red-rain precedes it; lead_minutes 293; affects: it affects actor:websummit and actor:government.
2. Open it. Inside is the warning as IPMA's open data gives it, kept in weather/warnings.json. No 'precedes', no 'affects': this world has no use for them. Its words are a type, a level, a start, an end and a sentence in Portuguese: the words of a warning in force.
   At work: the warning's record. [warning:ipma-red-rain-0900](../../data/graph/storm.json) (fact) "Red rain warning for the Lisbon district brought forward to 11 Nov 09:00 to 18:00". (fact) "Precipitação forte e persistente."; added: type: Precipitação; level: red; start_utc: 2026-11-11T09:00:00Z; end_utc: 2026-11-11T18:00:00Z; text_pt: Precipitação forte e persistente..
3. Open it again. IPMA's own alert message, read through MeteoAlarm's feed and kept in weather/cap.json. A third vocabulary, and this one belongs to nobody here: CAP, the Common Alerting Protocol, an international format for alert messages. An identifier, a message type, a severity, an onset, an expiry.
   At work: ipma's message. (fact) "Precipitação forte e persistente.". […PO-10-6290](../../incidents/2026-11-10-storm-charles/data/weather/cap.json) (fact) "Aviso Vermelho Precipitação"; added: identifier: 2.49.0.0.620.0.PT.261110212300.PO-10-6290; msg_type: Update; severity: Extreme; replaces: …261110163001.PO-10-6273, sent 2026-11-10T16:30:01.
4. The same thing has a different word at each level. Our graph says level red. IPMA's open data says level red and type Precipitação. The message says severity Extreme and event "Aviso Vermelho Precipitação". None of them is wrong, and none had to change to fit the others.
   At work: one word. [warning:ipma-red-rain-0900](../../data/graph/storm.json) (fact) "Red rain warning for the Lisbon district brought forward to 11 Nov 09:00 to 18:00". […PO-10-6290](../../incidents/2026-11-10-storm-charles/data/weather/cap.json) (fact) "Aviso Vermelho Precipitação"; added: severity: Extreme.
5. And one relationship, two ways of saying it. The message says it replaces an earlier message, sent at 16:30:01. Our graph says an earlier Warning precedes this one, lead_minutes 293. From 16:30 to 21:23 is 293 minutes: the same fact, in each world's own words.
   At work: one word. [warning:ipma-red-rain-0900](../../data/graph/storm.json) (fact) "Red rain warning for the Lisbon district brought forward to 11 Nov 09:00 to 18:00"; added: warns: actor:ipma warns it; precedes: warning:ipma-red-rain precedes it; lead_minutes 293; affects: it affects actor:websummit and actor:government. […PO-10-6290](../../incidents/2026-11-10-storm-charles/data/weather/cap.json) (fact) "Aviso Vermelho Precipitação"; added: replaces: …261110163001.PO-10-6273, sent 2026-11-10T16:30:01.
6. From the bottom you can walk back up. The message this one replaces was sent at 16:30:01; that is the red rain warning the timeline's row s-1110T1742 records as first read at 17:42. Each level names its source and the time it was read, so the chain holds in both directions.
   At work: the storm's graph. […PO-10-6290](../../incidents/2026-11-10-storm-charles/data/weather/cap.json) (fact) "Aviso Vermelho Precipitação"; added: replaces: …261110163001.PO-10-6273, sent 2026-11-10T16:30:01. [s-1110T1742](../../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1742) (fact, superseded) "IPMA raises Lisbon's rain warning to red, Wednesday 12:00 to 18:00 (IPMA sent it at 16:30:01, by its CAP message; 17:42 is when the weather desk first read it)".

## 3. Why it matters here

**Why not one schema for everything?**

1. One schema for all three would have to bend one world to fit another: the message would lose "replaces", or our graph would grow fields it has no use for, or the open data's plain record would be dressed as something it is not. Keeping each world's own words and joining them by named links loses nothing.
   At work: the storm's graph. [warning:ipma-red-rain-0900](../../data/graph/storm.json) (fact) "Red rain warning for the Lisbon district brought forward to 11 Nov 09:00 to 18:00". (fact) "Precipitação forte e persistente.". […PO-10-6290](../../incidents/2026-11-10-storm-charles/data/weather/cap.json) (fact) "Aviso Vermelho Precipitação".
2. Dinis's direction for this site (BRIEF.md, 11 November, about 02:10 UTC): "It needs to be fractal: I should be able to connect until I arrive at the last source." Today these three levels exist as three files. The pages that let a reader click down through them are being built. This explanation shows the files as they are, not those pages. *A record of how one warning is kept, as read on 11 November. It is not the warning in force: for that, go to IPMA.*
   At work: one word. [warning:ipma-red-rain-0900](../../data/graph/storm.json) (fact) "Red rain warning for the Lisbon district brought forward to 11 Nov 09:00 to 18:00". (fact) "Precipitação forte e persistente.". […PO-10-6290](../../incidents/2026-11-10-storm-charles/data/weather/cap.json) (fact) "Aviso Vermelho Precipitação".

## What this simplifies

- Opening a node is drawn as one step. Today it is three files, and nothing stored links the node warning:ipma-red-rain-0900 to message …PO-10-6290: the graph holds the message as a second node (warning:cap:261110212300.PO-10-6290) with no edge between the two. You match them by the time sent (21:23) and the area. That missing edge is exactly what the restructure is for.
- weather/cap.json is our record of IPMA's messages, under our own field names (sent_utc, msg_type, replaces). CAP's own element names differ a little (sent, msgType, references), and a CAP message carries much more than we keep.
- weather/warnings.json is likewise our reading of IPMA's open-data feed, with our field names and the time we read it added; sent_utc there comes from the CAP message, because the open data carries no issue time.
- Three levels and a word are shown. The idea has no fixed depth: a level could be opened further (the area into its municipalities, the Portuguese sentence into its terms), and sideways into other graphs.
- "Fractal Semantic Graphs" is sgit.ai's idea and name, put here in a few sentences. Read the original for what it claims and what it has shown.
- The node, the record and the message are quoted as the files stood on 11 November 2026, 02:18 UTC. If a file is corrected, the file is right and this explanation is out of date. It is a record of how a warning is kept, not a warning.

## Read for this

- [data/graph/storm.json (node warning:ipma-red-rain-0900 and its edges; 214 nodes, 238 edges as of 01:53 UTC)](../../data/graph/storm.json), read 11 November 2026, 02:18 UTC
- [data/graph/ontology.json (eight types, eight verbs)](../../data/graph/ontology.json), read 11 November 2026, 02:18 UTC
- [weather/warnings.json (the record; read from IPMA 01:51:55 UTC)](../../incidents/2026-11-10-storm-charles/data/weather/warnings.json), read 11 November 2026, 02:18 UTC
- [weather/cap.json (the message; IPMA via MeteoAlarm, first read 10 November 23:51:47 UTC)](../../incidents/2026-11-10-storm-charles/data/weather/cap.json), read 11 November 2026, 02:18 UTC
- [timeline.md, row s-1110T1742](../../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1742), read 11 November 2026, 02:18 UTC
- [Fractal Semantic Graphs, sgit.ai](https://sgit.ai/demos/fractal-graphs/index.html), read 11 November 2026, 02:16 UTC
- [graphs.sgit.ai, llms.txt ("meaning through connectivity")](https://graphs.sgit.ai/llms.txt), read 11 November 2026, 02:16 UTC
- [BRIEF.md (Dinis, 11 November, ~02:10 UTC)](../../BRIEF.html), read 11 November 2026, 02:12 UTC

The data this page is drawn from: [animations/one-warning-three-worlds.json](../animations/one-warning-three-worlds.json).
