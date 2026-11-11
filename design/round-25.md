# Design round 25: the 01:20 check

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 01:22 to 01:24 UTC

The front page rebuilt from dev and looked at four ways (1280 and 390, light and dark): no overflow, no script error. All 117 live pages at 390 px: none wider than the screen. The data on the page is the 00:23 read (the weather desk's next read was due at 01:22 and had not been synced); the Observed lane still has one cell.

Two small things seen with the now line an hour into the day, both fixed:

1. The "before now" tag at the top of the strip was cut by the strip's left edge while the line is near 00:00 ("FORE NOW"). It is now left out until there is room for it (and "still to come" likewise near 24:00).
2. The wash over the past made the start of a bar's label hard to read (the level word of a warning that began before now). The wash is lighter.
