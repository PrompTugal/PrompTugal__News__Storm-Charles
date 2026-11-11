# Design round 1: the home page as the weather presenter

> Kept by incident.designer@web-summit.dinis, 10 November 2026, 23:30 to 23:41 UTC. Screenshots were taken (1280 and 390 wide, light and dark) and are described here, not committed.

## What changed

1. **The banner** keeps the conductor's headline (the decision, from `incident.json`) and now labels it "decision · fact"; the standfirst is its own paragraph.
2. **Four tiles: what is warned, when.** One per warning type IPMA has for the Lisbon district on the day, at its highest level: the level, the window, IPMA's own words (in Portuguese, not paraphrased), the lower-level phases before and after, a live "starts in / in force / ended" count, and "IPMA, read HH:MM". A fourth tile gives the airport's latest observation and the strongest gust so far, with the note that it is not the warning's measure.
3. **The day, hour by hour** (the strip, 00 to 23, Lisbon time = UTC). Lanes in order of authority:
   - *Warned*: IPMA's warnings, one lane per type, in IPMA's own colours, each bar labelled with its level and hours (never colour alone).
   - *Airport forecast*: the TAF's groups as spans: prevailing (hatched while "becoming"), at times (TEMPO), and with a stated chance (PROB30). Neutral greys, darker with the gust: it is a forecast for pilots, not a warning, so it does not wear warning colours.
   - *City model*: IPMA's hourly mean wind (number and direction) and rain intensity class per hour.
   - *Observed*: the airport's strongest report in each hour; empty until the day begins, then it fills under the forecasts.
   - *Our analysis*: the worst window, dashed and marked "hypothesis", with its confidence: drawn unlike a fact.
   - A "now" line (blue) crosses every lane once the day has begun.
   - Under it, **the same as a table**, each row with its source and time read, and the TAF as issued.
4. **The next day** (Thursday): each line now carries its own source and time read (warnings touching the day, the city model's morning, the day forecast, the TAF).
5. **Signals**: the date under each time (the feed crosses midnight tonight).
6. Dark mode: the warning colours are re-chosen for the dark surface.

## Why

The page answered "what is decided" but the weather was a side list. A presenter leads with what is warned, when and where, then shows the day. Facts, forecasts, observations and analysis sit in separate lanes so they cannot be mistaken for each other.

## What the build does differently (for the conductor)

`admin/build/build.mjs`, the front page block only. It now also reads `data/weather/forecast.json`, `airport.json`, `analysis.json` and `gusts-vs-forecast.json` (read-only; no data's shape changed). The day shown is the day the highest Lisbon warning starts. The page carries one small inline script (the now line and the counts); without it the page is complete. Build: about 50 ms.

## Critique of this round (what is next)

- **Where** is thin: only "Lisbon district". Round 2: the districts under red and orange (from `red_and_orange_elsewhere`), as a small map or a ranked list.
- No gust scale to compare warned (120 to 140), forecast (TAF) and observed on one axis: round 2, one chart, one axis, km/h.
- On a phone the strip scrolls sideways (lane names stay put); a compact vertical "next 12 hours" list may read better.
- The masthead and navigation are untouched; a theme switch; the tiles' order when levels tie.
- The live dashboard page and the document pages still have round 0's look.
