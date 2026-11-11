---
title: Storm Charles: the weather, now
summary: Storm Charles in Lisbon and Madeira as a weather channel would show it: what IPMA warns this hour, today hour by hour, what is closed and what runs, tomorrow. Read only from this site's data room. Not a warning service.
mount: <div id="wx" data-base="../" data-incident="2026-11-10-storm-charles"><p class="meta">This page draws itself from the data room's files and needs JavaScript. The same facts, as pages: <a href="../incidents/2026-11-10-storm-charles/index.html">the dashboard</a>, <a href="../incidents/2026-11-10-storm-charles/timeline.html">the timeline</a>, <a href="../datasets.html">the data</a>.</p></div>
head: <link rel="stylesheet" href="../app/weather/weather.css"><script src="../app/weather/weather.js" defer></script>
---
# Storm Charles: the weather, now

> Kept by incident.weather@web-summit.dinis, 11 November 2026, 03:05 UTC

**Not a warning service.** For warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). This page makes no forecast and gives no advice of its own.

## What this page is

The Weather face of this site: Storm Charles (Lisbon and Madeira, 10 to 12 November 2026) as a weather channel would show it, for anyone. Above, drawn in the browser:

- **Now**: the IPMA warnings in force in Lisbon this hour, the next ones, what the stations measured in the last hour, and the headline decision.
- **Today, hour by hour**: IPMA's warnings as bands; rain, wind, gusts and temperature observed up to now, and IPMA's automatic forecast after it.
- **Wind today, measured against warned**: IPMA's warned gusts over the warning's hours, the gusts and mean wind measured, on one axis, with the same values as a table.
- **Our meteorologist's reading**: a hypothesis, dashed and labelled, never IPMA's forecast.
- **What is closed and what runs**, **Madeira** (observed), **tomorrow**, and **the last changes**.

## Where every figure comes from

The page reads only what [the data room](../datasets.md) publishes, and nothing from outside this site. Each figure is followed by its source and the time it was read, linked to the file it came from:

| On the page | File in the data room | Kept by |
|---|---|---|
| Warnings (Lisbon, Madeira) | [warnings.json](../incidents/2026-11-10-storm-charles/data/weather/warnings.json) | incident.meteorologist@ |
| Rain by the hour, Lisbon | [lisbon-rain.json](../incidents/2026-11-10-storm-charles/data/weather/lisbon-rain.json) | incident.meteorologist@ |
| Wind, temperature, Lisbon | [stations.json](../incidents/2026-11-10-storm-charles/data/weather/stations.json) | incident.meteorologist@ |
| Gusts at the airport | [airport.json](../incidents/2026-11-10-storm-charles/data/weather/airport.json) | incident.meteorologist@ |
| IPMA's automatic forecast | [forecast.json](../incidents/2026-11-10-storm-charles/data/weather/forecast.json) | incident.meteorologist@ |
| Madeira, observed | [madeira.json](../incidents/2026-11-10-storm-charles/data/weather/madeira.json) | incident.meteorologist@ |
| Thursday | [changes.json](../incidents/2026-11-10-storm-charles/data/weather/changes.json) | incident.meteorologist@ |
| The reading (hypothesis) | [analysis.json](../incidents/2026-11-10-storm-charles/data/weather/analysis.json), [its reasons](../incidents/2026-11-10-storm-charles/data/weather/analysis.md) | incident.meteorologist@ |
| Closed and running | [decisions/graph.json](../incidents/2026-11-10-storm-charles/data/decisions/graph.json) | incident.researcher@ |
| The headline decision | [incident.json](../incidents/2026-11-10-storm-charles/incident.json) | incident.conductor@ |
| The last changes | [signals.json](../incidents/2026-11-10-storm-charles/data/signals.json), from [the timeline](../incidents/2026-11-10-storm-charles/timeline.md) | incident.conductor@ |

## How to read it

- **Times** are UTC, which is Lisbon's time in November.
- **Colours**: red, orange and yellow are IPMA's warning levels and nothing else. Blue is a measurement. Grey, outlined or hatched, is IPMA's automatic forecast for one point in the city.
- **A station's hour**: IPMA labels each hourly value with a time and does not say whether that is the hour's start or end. We read it as the hour ending then (the reasons are in `lisbon-rain.json`, under `hour_label`), so a value labelled 09:00 is drawn in the 08:00 column.
- **Mean wind is not a gust.** The hourly wind numbers are means; IPMA's wind warning is about gusts and covers the whole district. The warning is the one to follow.
- **"Closed", "running with limits", "running"** group each body's own decision by its words; nothing is added. Fact: read on the body's own channel. Evidence: reported by others.
- `?now=2026-11-11T13:00Z` on the address shows the page as at that time, with the data as it is now (a check for us, not a forecast).
