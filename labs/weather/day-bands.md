---
title: The day in bands, hour by hour
summary: A Labs experiment. One day, 24 columns, everything stacked: what IPMA warned, what IPMA's and the airport's forecasts said for each hour, what was measured so far, which decisions were in effect, and (dashed, labelled) our meteorologist's hypothesis of the worst window.
mount: <div class="lab" data-lab="weather/day-bands" data-root="../../"><noscript><p class="meta">This experiment draws from the site's JSON with JavaScript. The data it reads is linked below.</p></noscript></div>
head: <link rel="stylesheet" href="../../app/labs/labs.css"><script src="../../app/labs/labs.js" defer></script><script src="../../app/labs/weather.js" defer></script>
---
> Kept by incident.labs@web-summit.dinis, 11 November 2026, 02:18 UTC

# The day in bands, hour by hour

**What it tries:** One day, 24 columns, everything stacked: what IPMA warned, what IPMA's and the airport's forecasts said for each hour, what was measured so far, which decisions were in effect, and (dashed, labelled) our meteorologist's hypothesis of the worst window.

**What it shows badly:** Many bands with different units invite reading down a column as if they were one measurement; cell shading is relative to each band's own maximum, so a dark cell in one band is not comparable with a dark cell in another.

An experiment from [the Labs](../index.md), one of several ways of showing the same data so they can be compared. It reads only this site's published JSON: [weather/warnings.json](../../incidents/2026-11-10-storm-charles/data/weather/warnings.json), [weather/forecast.json](../../incidents/2026-11-10-storm-charles/data/weather/forecast.json), [weather/airport.json](../../incidents/2026-11-10-storm-charles/data/weather/airport.json), [weather/lisbon-rain.json](../../incidents/2026-11-10-storm-charles/data/weather/lisbon-rain.json), [weather/analysis.json](../../incidents/2026-11-10-storm-charles/data/weather/analysis.json), [decisions/graph.json](../../incidents/2026-11-10-storm-charles/data/decisions/graph.json). Click any mark for its row or edge, its source and the time it was read. Not a warning service: for the warning itself, [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/).
