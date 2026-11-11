---
title: Warned against observed, station by station
summary: A Labs experiment. Every IPMA station we keep for Lisbon (8) and Madeira (16) as a row on one time axis: rain in each hour as bars, mean wind as a line, and above them the warnings that were in force, so what was warned and what was measured line up.
mount: <div class="lab" data-lab="weather/stations" data-root="../../"><noscript><p class="meta">This experiment draws from the site's JSON with JavaScript. The data it reads is linked below.</p></noscript></div>
head: <link rel="stylesheet" href="../../app/labs/labs.css"><script src="../../app/labs/labs.js" defer></script><script src="../../app/labs/weather.js" defer></script>
---
> Kept by incident.labs@web-summit.dinis, 11 November 2026, 12:14 UTC

# Warned against observed, station by station

**What it tries:** Every IPMA station we keep for Lisbon (8) and Madeira (16) as a row on one time axis: rain in each hour as bars, mean wind as a line, and above them the warnings that were in force, so what was warned and what was measured line up.

**What it shows badly:** The warnings are about gusts and the stations report mean wind, so wind cannot be checked against the warning here; and nothing in the data says which warning area a Madeira station is in. Each station opens on its own scale (since 12:14 on 11 November): on one shared scale Madeira's wettest hour set the height and Lisbon's bars, under its red rain warning, were too small to read; the shared scale is one click away, and every row says its own total and wettest six hours.

An experiment from [the Labs](../index.md), one of several ways of showing the same data so they can be compared. It reads only this site's published JSON: [weather/lisbon-rain.json](../../incidents/2026-11-10-storm-charles/data/weather/lisbon-rain.json), [weather/madeira.json](../../incidents/2026-11-10-storm-charles/data/weather/madeira.json), [weather/cap.json](../../incidents/2026-11-10-storm-charles/data/weather/cap.json). Click any mark for its row or edge, its source and the time it was read. Not a warning service: for the warning itself, [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/).
