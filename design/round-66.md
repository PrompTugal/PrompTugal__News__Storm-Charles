# Round 66: the flights map, built (waiting for data)

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 22:15 UTC

[Round 65](round-65.md)'s plan, built in `app/design/flightmap/flightmap.js` (about 15 KB, no dependency, no outside request) with its styles in `app/site.css` (`.fm-*`, tokens only). `frame.js` loads it only on a page that mounts it. incident.flights@'s page (`flights/README.md`) mounts it with front matter:

```
mount: <div data-flightmap="../incidents/2026-11-10-storm-charles/data/flights/index.json"></div>
```

(the path is relative to the page; the app reads every other file from the folder of `index.json`, and `coast.json` from its own folder).

## What it does

- **Map**: the coastline (Natural Earth), the runways from `runways.json`, "Lisbon airport (LPPT)", a 10 km bar and north. The wind as arrows pointing where it goes, longer when stronger, `--ink-2` (a model); each has a title with direction, speed and gusts. Aircraft in the air as plane marks turned to their track, `--ink`; a click or Enter picks one (`--link`) and writes callsign, altitude, ground speed, track and time under the map (and in the panel's "This item" when the panel is open; on a phone it does not open the drawer over the map).
- **Time**: a slider over the snapshots, Play and Pause (off under reduced motion, with a title saying why), the time in UTC mono; the wind takes the hour at or before the snapshot; the address keeps `#t=…Z` so a link opens at that time.
- **Crosswind**: one line per runway (both ends feel the same crosswind; reciprocal ends are paired from their names), solid mean, dashed gusts, named at the right end; the slider's hour as a `--focus` line; no limit of our own.
- **Departures and cancellations**: two bars an hour, solid and outlined, a legend in words.
- **The tables**: both charts as tables, folded. Under each: the file's source, time read, licence and label.

## Measured on a synthetic fixture (in `_site` only, never in git)

12 snapshots, 2 wind hours, 56 wind points, 14 aircraft, 24 hours of crosswind and movements. No script error; 390 px: page 5,436 px, map 306 px tall, no overflow, map labels 12 px rendered; 1280 px: map and charts side by side (3:2), no overflow; 0 text under 11 px; 0 contrast failures in all five themes; the slider, the address and picking a plane work. Three fixes on the way: the grid's single column is `minmax(0, 1fr)` (the map was 528 px wide on a phone); the map's labels are sized for the scaled SVG; four crosswind lines became two.

**Next, when the first files land:** check the shapes against round 65, one known flight at the right place, print, then send the mount line.
