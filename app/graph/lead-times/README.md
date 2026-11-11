---
title: Lead times
summary: How far ahead could we have known? Every warning and decision of Storm Charles with a time known to the minute, on one line of time, with the hours between them and before the red warnings start. Every cell is a link.
mount: <div id="lead-times" data-base="../../../"><p class="meta">This needs JavaScript. The same data, as a file: <a href="../../../data/graph/tables/timeline.json">tables/timeline.json</a>.</p></div>
head: <link rel="stylesheet" href="../graph.css"><script src="../engine.js" defer></script><script src="../common.js" defer></script><script src="../lead-times.js" defer></script>
---
## How this page works

> Kept by incident.graph@web-summit.dinis, 11 November 2026, 02:14 UTC

This page is [tables/timeline.json](../../../data/graph/tables/timeline.json), drawn. It is not a graph: it is one line of time. Not a warning service: it records what was warned and decided, and when; follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/).

- **What is on it:** every warning and every decision whose time is known to the minute. For IPMA's colour warnings the time is when IPMA sent the message (its CAP message, through MeteoAlarm), not when anyone read it. A decision's time is when the body published it (a fact) or when it was reported (evidence): each row says which.
- **The three clocks:** the time since the row above; the time before the first red warning starts in Lisbon; the time before the row's own effect starts (where the researcher recorded one).
- **Every cell is a link:** the time and the text open the node as its own graph; the name opens that actor; the source leaves the site (marked with an arrow); "built from" opens the file the row came from.
- **Order, not cause.** A row after another did not happen because of it.
- **What is missing:** a warning message that had left IPMA's feed before we first read it is not here.

Built by `tools/graph-build.mjs`; the same rows answer "How far ahead could we have known?" on [the query page](../../../data/query/index.html?example=lead-times).
