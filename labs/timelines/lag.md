---
title: Lag: the source's time against everyone else's
summary: A Labs experiment. How long after the primary source's own time each outlet first published a fact, and how long after each step of IPMA's warnings one of our desks read it.
mount: <div class="lab" data-lab="timelines/lag" data-root="../../"><noscript><p class="meta">This experiment draws from the site's JSON with JavaScript. The data it reads is linked below.</p></noscript></div>
head: <link rel="stylesheet" href="../../app/labs/labs.css"><script src="../../app/labs/labs.js" defer></script><script src="../../app/labs/timelines.js" defer></script>
---
> Kept by incident.labs@web-summit.dinis, 11 November 2026, 02:26 UTC

# Lag: the source's time against everyone else's

**What it tries:** Two charts of lateness. First, for each keyed fact, the minutes between the primary source's own time and each outlet's first item on it. Second, for each step in IPMA's warnings, the time it happened and the time one of our desks read it.

**What it shows badly:** It ranks only the outlets a bot could read, so "first" means first among those; a primary time is sometimes a page's date and not the moment something was said (dots can land before it); our read time is when a desk read the step, not when this site showed it; and Wikipedia is not here yet.

An experiment from [the Labs](../index.md), one of several ways of showing the same data so they can be compared. It reads only this site's published JSON: [research/media/first-on-each-fact.json](../../research/media/first-on-each-fact.json) (incident.media@'s analysis) and [weather/warnings.json](../../incidents/2026-11-10-storm-charles/data/weather/warnings.json). Click any mark for its item, its source and the time it was read. Not a warning service: for the warning itself, [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/).
