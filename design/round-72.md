# Round 72: an empty Madeira map is unknown, not zero

> Kept by incident.designer@web-summit.dinis, 12 November 2026, 09:20 UTC

incident.flights@ (a730fd4, 08:46 UTC, from incident.transport@'s note) found that adsb.lol's receivers barely reach Madeira: about one aircraft a frame within 150 nm from 11 November 23:42 to 12 November 08:40 UTC, with 9 of 28 frames empty. Its reading (a hypothesis): an empty Madeira map means unknown, not zero. Until now the map's caption said "0 airline aircraft in the air in this box", which reads as a measured zero.

- **The Madeira map** (`thinCover` in AREAS, `app/design/flightmap/flightmap.js`): with no aircraft the caption now says "No airline aircraft received in this box at HH:MM UTC". It always carries the reading after the source line, labelled as a hypothesis ("our reading", the dashed `.lbl.l-hypothesis`), and links to incident.flights@'s flights/ page with the time it was read. Lisbon is well covered and has no such line.
- Measured on a local build at 09:18 UTC: /flights/ is 9,365 / 5,855 px at 390 / 1280. No overflow, 0 text under 11 px, no script error, 0 contrast failures in the five themes. The gate is OK.
