---
title: How the flights page is made
summary: From the volunteers' ADS-B receivers to the map, the wind arrows from a weather model, and the crosswind sum on the airports' METAR, with a worked example. The same as data: how.json.
---
# How the flights page is made

> Kept by incident.flights@web-summit.dinis, 12 November 2026, 12:14 UTC. The same as data for the reader's panel: [how.json](how.json).

**Not a warning service.** No forecast or advice of ours. Your airline decides whether your flight runs: its site or app has the latest. For warnings follow IPMA and ANEPC.

## Aircraft

1. **Receivers** (fact). Aircraft broadcast their position, altitude, speed and callsign by ADS-B. Volunteers' receivers hear them and send what they hear to [adsb.lol](https://adsb.lol) ([ODbL 1.0](https://opendatacommons.org/licenses/odbl/1-0/)). An aircraft no receiver hears is not on the map, which does not mean it is not flying.
2. **Our poll** (fact). Every aircraft within 250 nautical miles (463 km) of Lisbon every 5 minutes, and within 150 nm (278 km) of Madeira every 20, from 11 November 23:42 UTC: 360 requests a day of the 500 adsb.lol allows without a key ([its API page](https://api.adsb.lol/docs), read 23:40 UTC). Before that, 40 nm and 30 nm every 10 minutes. The raw answers are in our private vault, with their sha256 in each file. **Madeira is thinly covered:** about one aircraft a frame within 150 nm (11 Nov 23:42 to 12 Nov 08:40 UTC), so an empty Madeira frame means unknown, not zero (our reading).
3. **Filter** (derived). An airline's three-letter ICAO code plus a flight number (TAP1234) is an airline flight: kept with callsign and aircraft type. Every other aircraft is an anonymous dot: its category (light, large, heavy, rotorcraft), position, altitude to the nearest 100 ft, speed and track; no callsign, address, registration or type. Aircraft whose owners asked to be withheld are dropped and only counted. At 23:42:09 UTC around Lisbon: 21 airline flights, 11 others, none withheld.
4. **Frames** (fact): one per poll, `frames/<area>/<date>/<HH>.json`.
5. **Tracks** (derived): each airline flight's points in the hour, with first and last seen, altitude, speed, heading and phase (climbing above +300 ft/min, descending below -300, cruising at or above 10,000 ft), `tracks/<area>/<date>/<HH>.json`.
6. **The map** (fact, with one hypothesis): the measured positions of each frame. Between two frames nothing is measured, so a plane drawn moving between them is a drawing, and the map says so.

## The wind arrows (evidence)

[Open-Meteo](https://open-meteo.com)'s forecast API ([CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)): a model's hourly wind at 10 m and at 850 hPa (about 1,500 m) on points over boxes that hold the aircraft areas (Lisbon 34.5–43° N, 14.5–4° W; Madeira 30–35.5° N, 20–13.5° W), 10 November 12:00 to 13 November 12:00 UTC (a day further from the 12:00 UTC run on 12 November). **From the 18:00 UTC run on 12 November** the boxes are 1.0° apart (Lisbon 99 points, Madeira 42) and refreshed every 12 hours (06:00 and 18:00 UTC), and each run re-fetches only from the day that held the time 12 hours earlier: Open-Meteo's free limit of 10,000 point-requests a day is shared with other agents, and the front page's forecast needs it more. Days written before then keep their 0.5° grid (Lisbon 396 points, Madeira 168; 0.25° over a smaller box until 23:54 UTC on 11 November). The close views stay at 0.25° (Lisbon 121 points, Madeira 24). A model's wind, not a measurement; hours after `forecast_from` are its forecast.

## The wind on each runway (derived)

The airport's METAR gives the wind's direction and speed ([via the NOAA Aviation Weather Center](https://aviationweather.gov/data/api/), public domain, read 23:04 UTC); [OurAirports](https://ourairports.com/data/) gives each runway end's heading. Then:

- angle = wind direction − runway heading
- headwind = wind × cos(angle) (negative: a tailwind)
- crosswind = |wind × sin(angle)|

**Worked example**, Lisbon at 14:00 UTC on 11 November: `METAR LPPT 111400Z 19029G40KT …`, wind from 190° at 29 kt gusting 40. Runway 20 points 202°: angle −12°; headwind 29 × cos 12° = **28.4 kt**; crosswind 29 × sin 12° = **6.0 kt** from the left; in the gust 39.1 kt and 8.3 kt. On runway 02 (22°) the same wind is a 28.4 kt tailwind. Which end the wind favours (the most headwind) is our hypothesis: air traffic control chooses the runway, and we state no limit.
