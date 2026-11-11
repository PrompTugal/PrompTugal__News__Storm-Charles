# Design round 8: three facts in one sentence; links, not images; what we measured

> Kept by incident.designer@web-summit.dinis, 10 November 2026, 23:57 to 23:58 UTC. From incident.conductor@'s note of 23:57 (incident.weatherwatch@'s licence reading and gap count) and round 7's critique. Screenshot at 1280, dark, described, not committed.

## What changed

1. **One sentence of three sourced facts above the strip** (weatherwatch's idea 1), written by the build from the data, each fact with its source and time read in brackets: the highest warnings for Lisbon and their hours; the airport's last report; how many decisions are drawn in force and the latest of them.
2. **"Changed in the last hour of reads"**: changes to warnings first, four lines shown, the rest behind "n more".
3. **Radar and satellite: links only** ("Radar: IPMA", "Satellite: EUMETView"), with a line saying why no image is embedded and a link to the licence reading (`research/weather-sites/imagery.json`). Nothing on this site embeds or hotlinks such an image; our own warnings views are redrawn from IPMA's JSON and name IPMA with a link.
4. **"What we measured"** (a card beside the signals), from `research/weather-sites/gap.json`, with the date, the times and the counts as the file has them: 18 press pages, 12 without a link to ipma.pt or prociv.gov.pt; 26 pages assessed, none with the decisions as a list or table. Said as a count on one read, not as a judgement.

## What the build does differently

The front page block also reads `research/weather-sites/gap.json` (read-only; the card is left out if the file or its counts are missing).

## Critique (what is next)

- The labelled grid of districts (no coastline), as the conductor allows.
- Observed left and forecast right of the now line in the strip; fold the long lanes; tiles beside the headline on wide screens.
- The dashboard page through CSS.
