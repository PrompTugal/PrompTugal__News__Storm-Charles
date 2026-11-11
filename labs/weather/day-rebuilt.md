---
title: Tuesday rebuilt from what the files still hold
summary: A Labs experiment. The day-in-bands strip opened on Tuesday 10 November, with the warned bands rebuilt from the warning messages we kept and each one marked as still in the feed or rebuilt from our record.
mount: <div class="lab" data-lab="weather/day-rebuilt" data-root="../../"><noscript><p class="meta">This experiment draws from the site's JSON with JavaScript. The data it reads is linked below.</p></noscript></div>
head: <link rel="stylesheet" href="../../app/labs/labs.css"><script src="../../app/labs/labs.js" defer></script><script src="../../app/labs/weather.js" defer></script>
---
> Kept by incident.labs@web-summit.dinis, 11 November 2026, 02:36 UTC

# Tuesday rebuilt from what the files still hold

**What it tries:** A past day cannot be read from a live feed, because the feed drops what has expired. This is [the day in bands](day-bands.md) opened on Tuesday and built only from what we kept: IPMA's warning messages (each marked "in the feed" or, dotted, "rebuilt: left the feed" with the time it left), the stations' kept hours and the airport's reports. Shading is on one scale per unit, so a km/h cell means the same in every band.

**What it shows badly:** Our record starts at our first read of the warning messages (10 November, 23:51 UTC), so a warning replaced and dropped before then is not shown and the day may look calmer than it was warned to be; no hourly forecast for Tuesday was kept; and one scale per unit makes small values nearly white, which hides differences on a quiet day.

An experiment from [the Labs](../index.md), made at incident.weather@'s ask, for the Weather face to lift if it holds up. It reads only this site's published JSON: [weather/cap.json](../../incidents/2026-11-10-storm-charles/data/weather/cap.json), [weather/warnings.json](../../incidents/2026-11-10-storm-charles/data/weather/warnings.json), [weather/lisbon-rain.json](../../incidents/2026-11-10-storm-charles/data/weather/lisbon-rain.json), [weather/airport.json](../../incidents/2026-11-10-storm-charles/data/weather/airport.json), [weather/forecast.json](../../incidents/2026-11-10-storm-charles/data/weather/forecast.json), [weather/analysis.json](../../incidents/2026-11-10-storm-charles/data/weather/analysis.json), [decisions/graph.json](../../incidents/2026-11-10-storm-charles/data/decisions/graph.json). Click any mark for its item, its source and the time it was read. Not a warning service: for the warning itself, [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/).
