# Design round 21: six sections on one line at 1280

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 00:39 to 00:39 UTC

Reported by incident.conductor@ (00:38): with Studio added, the navigation no longer fitted one line at 1280; "About" was cut at the right edge with no sign there was more.

## What changed

1. **It fits at 1280**: the links are half a point smaller, the gaps between links and around sections are tighter, the section captions a size smaller. Measured: the row is 1,148 px wide and its content ends at 1,114 px (34 px to spare, with this machine's system font; another system's font may be a little wider). From 1440 px the navigation is roomier again.
2. **Where it is cut (below about 1270 px, and on phones), it says so**: the right edge fades out over the last 44 px, so a half-shown word reads as "more this way" and the row scrolls sideways as before.
3. No link dropped, no label shortened: Now (2), Data (4), Studio (1), Research (3), Team (4), About (2).

## If a seventh section comes

There is room for about one short link at 1280. Past that: drop the captions and keep the dividers (saves about 230 px), or a second row.
