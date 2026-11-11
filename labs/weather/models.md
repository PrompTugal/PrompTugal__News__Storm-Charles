---
title: The models side by side
summary: A Labs experiment. Four model runs for Lisbon (two of IPMA's, MET Norway, Open-Meteo) drawn as what they are, dashed and named hypotheses about the future, against what was actually measured (solid), for mean wind, gusts and rain.
mount: <div class="lab" data-lab="weather/models" data-root="../../"><noscript><p class="meta">This experiment draws from the site's JSON with JavaScript. The data it reads is linked below.</p></noscript></div>
head: <link rel="stylesheet" href="../../app/labs/labs.css"><script src="../../app/labs/labs.js" defer></script><script src="../../app/labs/weather.js" defer></script>
---
> Kept by incident.labs@web-summit.dinis, 11 November 2026, 06:50 UTC

# The models side by side

**What it tries:** Four model runs for Lisbon (two of IPMA's, MET Norway, Open-Meteo) drawn as what they are, dashed and named hypotheses about the future, against what was actually measured (solid), for mean wind, gusts and rain.

**What it shows badly:** A point forecast for one grid cell is compared with one station, which is unfair to both; only one model here gives gusts, and gusts are what the warning is about. None of these lines is our forecast.

An experiment from [the Labs](../index.md), one of several ways of showing the same data so they can be compared. It reads only this site's published JSON: [weather/forecast.json](../../incidents/2026-11-10-storm-charles/data/weather/forecast.json), [weather/stations.json](../../incidents/2026-11-10-storm-charles/data/weather/stations.json), [weather/lisbon-rain.json](../../incidents/2026-11-10-storm-charles/data/weather/lisbon-rain.json), [weather/airport.json](../../incidents/2026-11-10-storm-charles/data/weather/airport.json), [weather/warnings.json](../../incidents/2026-11-10-storm-charles/data/weather/warnings.json). Click any mark for its row or edge, its source and the time it was read. Not a warning service: for the warning itself, [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/).
