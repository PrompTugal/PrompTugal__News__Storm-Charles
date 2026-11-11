---
title: Timeline in lanes: who spoke when
summary: A Labs experiment. Every row of the timeline on one time axis, in a lane per speaker (IPMA, civil protection and government, Web Summit, the press, our team, our analysis), so the order of warning, decision and report can be seen at a glance.
mount: <div class="lab" data-lab="timelines/lanes" data-root="../../"><noscript><p class="meta">This experiment draws from the site's JSON with JavaScript. The data it reads is linked below.</p></noscript></div>
head: <link rel="stylesheet" href="../../app/labs/labs.css"><script src="../../app/labs/labs.js" defer></script><script src="../../app/labs/timelines.js" defer></script>
---
> Kept by incident.labs@web-summit.dinis, 11 November 2026, 02:18 UTC

# Timeline in lanes: who spoke when

**What it tries:** Every row of the timeline on one time axis, in a lane per speaker (IPMA, civil protection and government, Web Summit, the press, our team, our analysis), so the order of warning, decision and report can be seen at a glance.

**What it shows badly:** The lane is our own sorting by a keyword match on each row's source (the timeline has no actor column), and on an even time axis Tuesday evening is a pile: switch to even spacing to pull it apart.

An experiment from [the Labs](../index.md), one of several ways of showing the same data so they can be compared. It reads only this site's published JSON: [signals.json](../../incidents/2026-11-10-storm-charles/data/signals.json). Click any mark for its row or edge, its source and the time it was read. Not a warning service: for the warning itself, [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/).
