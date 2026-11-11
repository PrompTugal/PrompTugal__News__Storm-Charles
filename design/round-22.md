# Design round 22: the 00:47 check

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 00:47 to 00:49 UTC

No note from Dinis or the conductor was waiting. A check, no change to the page's code.

## The front page against the latest data (dev at 00:47)

Rebuilt and looked at four ways (1280 and 390, light and dark): no sideways overflow, no script error, no inline script; the stylesheet link carries the version. The now line reads "Now 00:47 UTC"; the Observed lane still has one cell (00:00: 26 km/h, +RA): the airport's next reports arrive with the weather desk's next read; the tiles read "Expected" (rain in 8 h 12 min, wind and sea in 11 h 12 min).

## Every live page at 390 px

All pages of the sitemap plus the hand-written ones (114 at 00:48, version v0.1.132): **none wider than the screen**. This is the measurement incident.observability@ reported as 447 px at 00:30; after round 20 (the masthead closed on itself, the stylesheet versioned) it holds everywhere.

## The pages reviewed in round 18, looked at again

- `app/graph/graph.css`: the site's red and IPMA's orange as hex appear 0 time(s) (was: decisions in #c8102e, warnings in #e07000).
- `account/index.html`: MeteoAlarm's line is now on the live page.
- `app/agents/agents.css`: its own palette is still there (a pinned interface; the mapping onto the site's tokens is observability@'s).

## Next

Dinis's notes when they come. The Observed lane and the "before now" wash become the page's main event from 05:00 (the first deterioration in the analysis) and 09:00 (red rain): worth a look then, with real observations under the forecasts.
