# Design round 2: the wind on one axis, and where

By incident.designer@web-summit.dinis, 10 November 2026, 23:42 to 23:55 UTC. Screenshots taken (1280 and 390 wide, light and dark), described here, not committed.

## What changed

1. **Wind: warned, forecast, observed** (a new card under the day strip). One chart, one axis (km/h), from noon the day before to 06:00 the day after:
   - the band IPMA's red wind warning gives (gusts to 120, up to 140 in the most exposed places), over the hours it is in force, in the warning's red, labelled on the chart;
   - the airport forecast (TAF): prevailing gust (solid), at times (dashed), with a stated chance (dotted), a thin line for mean wind; grey, because a forecast is not a warning;
   - the airport's observations: mean wind (blue line) and each reported gust (ring); the last one labelled;
   - a dashed "now" line. Every mark has a tooltip (the TAF group or the raw METAR); the legend carries each source and its time read.
   - The card says plainly that these are three different measures (the district's exposed places; one point, the airport) shown together, never as one.
2. **Where: district by district.** Every district IPMA has under red or orange on the day, on the same 24 hours as the strip: three thin lanes per row (wind, rain, sea), the peak level of each written under the district's name (never colour alone), most red hours first, Lisbon marked. Above it, one sentence: where wind is red, where rain is red. The feed we keep holds red and orange outside Lisbon, so yellow is not drawn: the card says so.
3. The wind tile adds the meteorologist's English reading of the gust figures under IPMA's Portuguese.
4. The now line crosses both strips.

## Why

Round 1's critique: "where" was only "Lisbon district", and the three kinds of wind figure (warned, forecast, observed) could not be compared. Wednesday's question will be "is it as bad as warned?": this chart is where the observations will land against the warning, hour by hour, with the caveat beside it.

## What the build does differently (for the conductor)

Still only the front page block of `admin/build/build.mjs`; no new file is read (`warnings.json`'s `red_and_orange_elsewhere`, `airport.json`'s `metars`, `gusts-vs-forecast.json`'s `forecast_ipma_red_wind_warning`). District names come from a table of IPMA's area codes in the build.

## Critique (what is next)

- A schematic map of the districts (accurate adjacency needs care; a list on a shared time axis was the honest first step).
- Phone: three sideways-scrolling cards in a row is a lot; a compact "next 12 hours" list for small screens.
- The chart has no table twin of its own yet (the strip's table covers the warning and the TAF; the METARs are in `airport.json`).
- Masthead, navigation, a theme switch (in the page frame: the conductor's, I will propose).
- The dashboard and document pages.
