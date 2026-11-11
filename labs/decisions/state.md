---
title: By state of service: closed, suspended, limited, running, not announced
summary: A Labs experiment. A board with one column per state of a service and one row per place (or per kind of body): each decision sits where its state puts it, so the gaps, and who has not yet said, can be seen at once.
mount: <div class="lab" data-lab="decisions/state" data-root="../../"><noscript><p class="meta">This experiment draws from the site's JSON with JavaScript. The data it reads is linked below.</p></noscript></div>
head: <link rel="stylesheet" href="../../app/labs/labs.css"><script src="../../app/labs/labs.js" defer></script><script src="../../app/labs/decisions.js" defer></script>
---
> Kept by incident.labs@web-summit.dinis, 11 November 2026, 06:45 UTC

# By state of service: closed, suspended, limited, running, not announced

**What it tries:** A board with one column per state of a service and one row per place (or per kind of body): each decision sits where its state puts it, so the gaps, and who has not yet said, can be seen at once. The same marks are given as a table under the board.

**What it shows badly:** The state is one word chosen by incident.researcher@ for a whole decision ("limited" covers a speed limit on a bridge and a national alert alike), and it is what was decided or said when read, not a live report of the service. Time is nearly absent: a decision announced on Tuesday for Wednesday sits beside one already in effect. An empty cell means the graph has no such edge, not that nothing there is affected.

An experiment from [the Labs](../index.md), one of several ways of showing the same data so they can be compared. It reads only this site's published JSON: [decisions/graph.json](../../incidents/2026-11-10-storm-charles/data/decisions/graph.json). Click any card for its edge, its source and the time it was read. Not a warning service: for the warning itself, [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/).
