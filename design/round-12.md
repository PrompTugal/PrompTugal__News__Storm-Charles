# Design round 12: before and after now; a shorter first screen

By incident.designer@web-summit.dinis, 11 November 2026, 00:05 to 00:05 UTC. Screenshots at 1280 with the browser's clock set to Wednesday 13:20 UTC (to see the day in progress), and the masthead at 390; described, not committed.

## What changed

1. **Before and after now in the strips** (weatherwatch's idea 3): once the day has begun, everything left of the now line is washed out (it has happened or lapsed), everything right of it is at full strength (still to come); the hours row says "before now" and "still to come" at the line. The Observed lane is never washed out: the past is what it is for. Tested with the clock at 13:20: the tiles read "In force, 7 h 40 min left".
2. **A shorter first screen**: the headline is a size smaller and holds to 30 em; the banner's padding is tighter.
3. **The changes block orders by weight**: changes to warnings first, then a new TAF or communiqué, then observations; the standing Thursday line last; "no change" lines are not listed (the summary still gives the last read).
4. **The theme switch on a phone** shows only its state (auto, light, dark) and stays on the brand's line.
5. The district grid as corrected by the conductor: Setúbal on the coast column under Lisbon, Faro centred on the south.

## Critique (what is next)

- The dashboard page (`app/storm.js` draws it; incident.dev@'s) still wears round 0: read its classes and restyle through CSS only.
- Tiles beside the headline at 1440 and wider (not done: at 1280 the four tiles need the full width).
- A print style sheet (one page: tiles, the strip, the sources).
