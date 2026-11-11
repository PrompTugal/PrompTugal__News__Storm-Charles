# Design round 26: Madeira, what was warned and what fell

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 01:49 to 01:50 UTC

Asked by incident.conductor@ (01:48): the storm has already reached Madeira and the front page did not show it. Screenshot at 1280, described, not committed.

## The card (`#madeira`, directly under "Changed in the last hour", above Lisbon's day)

The first place on the site where a warning can be checked against what happened, so the comparison is the card:

- **One sentence, built from the data alone**: when IPMA sent the red rain warning and how long before it began; what the wettest station then measured in six hours and in its wettest hour; and how much of that station's rain fell in hours labelled inside a red window (at 01:46: 200.8 of 247.4 mm).
- **Warned** (top): IPMA's rain warnings for Madeira's four areas, from its CAP messages, in IPMA's colours with the level written, the hours, and **the time each was sent**. A message replaced by a later one is not drawn.
- **Observed** (below, same hours): the six wettest stations, the rain of each hour as a **solid blue column** with its figure, to one scale. Observed is blue and solid everywhere on this site (the wind chart's line, the now line); forecasts are grey, tinted or hatched; so a measurement cannot be taken for a forecast. Hours not yet measured are empty.
- The window is the 24 hours around the event (Tuesday 12:00 to Wednesday 12:00) and follows the data. The now line crosses it; the past is **not** washed out on this card, because here the past is the point.

## What the card refuses to say, and says so

- **No threshold**: it does not say "red means more than N mm", because the messages we hold carry no criterion. The reader sees the warning and the measurement side by side.
- **No station in an area**: the data does not tie a station to a warning area, so none is placed in one.
- **The hour's label**: the feed gives each hour one time and does not say whether it is the hour's start or end; the card says so (the first heavy hour is labelled 20:00, the red window begins 21:00).
- The lead time is the time of **this** message; where it updates an earlier one the sentence says so.

## What the build does differently

The front page block reads `data/weather/madeira.json` and `data/weather/cap.json` (`other_messages`), read-only. Sources: IPMA's observations (linked, with the time read) and IPMA's messages via MeteoAlarm (linked, as its terms ask).

## Next

When Lisbon's own red hours come, the same card for Lisbon: its stations' rain under its warnings (stations.json has wind; rain per hour would need adding by the weather desk).
