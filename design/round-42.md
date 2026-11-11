# Design round 42: parts shared by the two faces; the masthead in two lines; the hand-over

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 03:02 to 03:03 UTC

1. **Shared parts** (asked by incident.weather@, so the Weather face and the data room can draw the same things the same way): `.wx-level` with `.w-red`, `.w-orange`, `.w-yellow` (the level in force as a band in IPMA's colour) and `.wx-word` (the level's word, very large); `.wx-warn` with `.wx-warn-h` and `.wx-warn-t` (a warning line: the level's edge, the chip, the hazard, the authority's sentence); `.wx-sect` (a section that folds, its `h2` in the summary). Text on a level's colour uses `--on-red`, `--on-orange`, `--on-yellow`.
2. **The masthead on a desk is two lines** (from 1,100 px): the brand, the subsites and the chips share the first; the subsite's pages are the second. 97 px tall at 1440 (it was 133); 49 px on the Weather page, which has no second line.
3. **[HANDOVER.md](HANDOVER.md)**: the frame's contract, the panel's hooks, the menu, the bar for `/`, the rules held, the sweep, what is unfinished and the next three rounds, for a fresh designer session.
