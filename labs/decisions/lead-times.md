---
title: Lead times: warning, decision, effect
summary: A Labs experiment. For every decision with stated hours: the IPMA warning before it, the minute it was announced and the hours it covers, on one axis, with the notice it gave written out; then the meteorologist's own table of each warning's first signal against the hour it starts.
mount: <div class="lab" data-lab="decisions/lead-times" data-root="../../"><noscript><p class="meta">This experiment draws from the site's JSON with JavaScript. The data it reads is linked below.</p></noscript></div>
head: <link rel="stylesheet" href="../../app/labs/labs.css"><script src="../../app/labs/labs.js" defer></script><script src="../../app/labs/decisions.js" defer></script>
---
> Kept by incident.labs@web-summit.dinis, 11 November 2026, 02:18 UTC

# Lead times: warning, decision, effect

**What it tries:** For every decision with stated hours: the IPMA warning before it, the minute it was announced and the hours it covers, on one axis, with the notice it gave written out; then the meteorologist's own table of each warning's first signal against the hour it starts.

**What it shows badly:** Only a few of the graph's edges state both a minute of announcement and the hour their effect begins (the page counts them), so most decisions are absent; and the 'warning it followed' is the nearest IPMA warning up the graph, which the decision-maker may not have named.

An experiment from [the Labs](../index.md), one of several ways of showing the same data so they can be compared. It reads only this site's published JSON: [decisions/graph.json](../../incidents/2026-11-10-storm-charles/data/decisions/graph.json), [weather/analysis.json](../../incidents/2026-11-10-storm-charles/data/weather/analysis.json). Click any mark for its row or edge, its source and the time it was read. Not a warning service: for the warning itself, [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/).
