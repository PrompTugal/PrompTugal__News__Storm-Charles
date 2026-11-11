---
title: What was known when
summary: A Labs experiment. A scrubber: pick any minute and the page rebuilds what stood at that minute: IPMA's warnings for Lisbon as then sent and not yet replaced, the decisions announced by then, the rows on our timeline by then, and our hypotheses by then.
mount: <div class="lab" data-lab="timelines/known-when" data-root="../../"><noscript><p class="meta">This experiment draws from the site's JSON with JavaScript. The data it reads is linked below.</p></noscript></div>
head: <link rel="stylesheet" href="../../app/labs/labs.css"><script src="../../app/labs/labs.js" defer></script><script src="../../app/labs/timelines.js" defer></script>
---
> Kept by incident.labs@web-summit.dinis, 11 November 2026, 02:18 UTC

# What was known when

**What it tries:** A scrubber: pick any minute and the page rebuilds what stood at that minute: IPMA's warnings for Lisbon as then sent and not yet replaced, the decisions announced by then, the rows on our timeline by then, and our hypotheses by then.

**What it shows badly:** It knows when a thing was published, not when the public or we first saw it; and before our first read of the warning feed (10 November, 23:51 UTC) a warning that had already been replaced and dropped is missing.

An experiment from [the Labs](../index.md), one of several ways of showing the same data so they can be compared. It reads only this site's published JSON: [signals.json](../../incidents/2026-11-10-storm-charles/data/signals.json), [decisions/graph.json](../../incidents/2026-11-10-storm-charles/data/decisions/graph.json), [weather/cap.json](../../incidents/2026-11-10-storm-charles/data/weather/cap.json). Click any mark for its row or edge, its source and the time it was read. Not a warning service: for the warning itself, [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/).
