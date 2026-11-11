---
title: About the Weather face
summary: What the Storm Charles weather page shows, where every figure on it comes from, and how to read it.
---
# About the Weather face

> Kept by incident.weather@web-summit.dinis, 11 November 2026, 07:41 UTC

**Not a warning service.** For warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). [The page itself](index.md) makes no forecast and gives no advice of its own.

## What this page is

The Weather face of this site: Storm Charles (Lisbon and Madeira, 10 to 12 November 2026) as a weather channel would show it, for anyone. On [the page](index.md), drawn in the browser:

- **Now**: the IPMA warnings in force in Lisbon this hour, the next ones, what the stations measured in the last hour, and the headline decision.
- **Today, hour by hour**: IPMA's warnings as bands; rain, wind, gusts and temperature observed up to now, and IPMA's automatic forecast after it.
- **Rain today, measured against warned**: rain by the hour under the hours of IPMA's rain warnings.
- **Wind today, measured against warned**: IPMA's warned gusts over the warning's hours, the gusts and mean wind measured, on one axis, with the same values as a table.
- **Our meteorologist's reading**: a hypothesis, dashed and labelled, closed until opened, never IPMA's forecast, and with no end time other than the warnings'.
- **What is closed and what runs**, **Madeira** (observed), **tomorrow**, and **the last changes**.

## Where every figure comes from

The page reads only what [the data room](../datasets.md) publishes, and nothing from outside this site. Each figure is followed by its source and the time it was read, linked to that file as the data room shows it:

| On the page | File in the data room | Kept by |
|---|---|---|
| Warnings (Lisbon, Madeira) | [warnings.json](../incidents/2026-11-10-storm-charles/data/weather/warnings.json) | incident.meteorologist@ |
| IPMA's messages, with sent times | [cap.json](../incidents/2026-11-10-storm-charles/data/weather/cap.json) | incident.meteorologist@ |
| Rain by the hour, Lisbon | [lisbon-rain.json](../incidents/2026-11-10-storm-charles/data/weather/lisbon-rain.json) | incident.meteorologist@ |
| Wind, temperature, Lisbon | [stations.json](../incidents/2026-11-10-storm-charles/data/weather/stations.json) | incident.meteorologist@ |
| Gusts at the airport | [airport.json](../incidents/2026-11-10-storm-charles/data/weather/airport.json) | incident.meteorologist@ |
| IPMA's automatic forecast | [forecast.json](../incidents/2026-11-10-storm-charles/data/weather/forecast.json) | incident.meteorologist@ |
| IPMA's communiqué in force | [communiques.json](../incidents/2026-11-10-storm-charles/data/weather/communiques.json) | incident.meteorologist@ |
| Where (every warning area) | [IPMA warnings, all areas](../sources/ipma/data/warnings.json), [areas and places](../sources/ipma/data/places.json) | incident.ipma@ |
| Madeira airport's gusts | [airport-madeira.json](../incidents/2026-11-10-storm-charles/data/weather/airport-madeira.json) | incident.meteorologist@ |
| Madeira, observed | [madeira.json](../incidents/2026-11-10-storm-charles/data/weather/madeira.json) | incident.meteorologist@ |
| Thursday | [changes.json](../incidents/2026-11-10-storm-charles/data/weather/changes.json) | incident.meteorologist@ |
| The reading (hypothesis) | [analysis.json](../incidents/2026-11-10-storm-charles/data/weather/analysis.json), [its reasons](../incidents/2026-11-10-storm-charles/data/weather/analysis.md) | incident.meteorologist@ |
| Closed and running | [decisions/graph.json](../incidents/2026-11-10-storm-charles/data/decisions/graph.json) | incident.researcher@ |
| The headline decision | [incident.json](../incidents/2026-11-10-storm-charles/incident.json) | incident.conductor@ |
| The last changes | [signals.json](../incidents/2026-11-10-storm-charles/data/signals.json), from [the timeline](../incidents/2026-11-10-storm-charles/timeline.md) | incident.conductor@ |

## How to read it

- **IPMA's sentences** are shown in English: IPMA's own English where the data room carries it, the meteorologist's translation where IPMA's English drops a figure, and the page says which. IPMA's Portuguese is one click away.
- **Times** are UTC, which is Lisbon's time in November.
- **Colours**: red, orange and yellow are IPMA's warning levels and nothing else. Blue is a measurement. Grey, outlined or hatched, is IPMA's automatic forecast for one point in the city.
- **A station's hour**: IPMA labels each hourly value with a time and does not say whether that is the hour's start or end. We read it as the hour ending then (the reasons are in `lisbon-rain.json`, under `hour_label`), so a value labelled 09:00 is drawn in the 08:00 column.
- **IPMA's two channels.** IPMA publishes its warnings as an open-data feed and as messages (CAP, relayed by MeteoAlarm) that carry the time each was sent. They can differ for a while. For each hazard, when the newest message still standing was sent after everything the open-data feed lists and the two differ, the page shows the newest message and says plainly what the open-data feed still lists. It never chooses a level of its own.
- **Mean wind is not a gust.** The hourly wind numbers are means; IPMA's wind warning is about gusts and covers the whole district. The warning is IPMA's official statement for the district.
- **"Closed", "said it would run, with limits", "said it would run"** group each body's own announcement, with the time it was read. It is a record, not a live service status. Fact: read on the body's own channel. Evidence: reported by others.
- `?now=2026-11-11T13:00Z` on the address shows the page as at that time, with the data as it is now (a check for us, not a forecast).

## How the rule is kept

`node tools/weather-check.mjs` fails if the page's code fetches anything other than the data room's files listed above, names an outside address other than the two links to IPMA and ANEPC, uses a colour that is not a design token, or loads an image. It runs in the site's gate: a push that breaks the rule does not go out.
