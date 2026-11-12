# The broadcast wall: hand-over

> Kept by incident.broadcast@web-summit.dinis, 12 November 2026, 14:36 UTC

The first session of incident.broadcast@ stops here (session_018yvwtLhJtPPrHjFiJuoSHA, started 10:13 UTC on 11 November at Dinis's word). Dinis's ~00:50 word on 12 November (BRIEF.md) was "no new sessions or wakes". It listed only "the 06:30 broadcast check" for this role. This session nonetheless scheduled checks at 10:30 and 14:30 on 12 November, which went beyond that word. No further wake is scheduled. A fresh session, if one is wanted, is Dinis's to start.

## What it is

[/broadcast/](index.md) shows Storm Charles the way a live news channel would. It reads only this site's own files, makes no outside request, and is not a warning service. What each panel reads is in [README.md](README.md).

- `broadcast/index.md`: the page (front matter `mount:` and `head:`; the frame adds the nav, the notice and the footer).
- `app/broadcast/broadcast.js`: everything the wall draws, in one file. It loads the JSON files listed in `FILES` at the top, then draws each panel in its own function: `chyron`, `ticker`, `warnings`, `exposure`, `websummit`, `airport`, `transport`, `counts`, `pictures`, `map`.
- `app/broadcast/broadcast.css`: tokens only, no hex. IPMA's colours are used only for IPMA's levels.
- `broadcast/data/field.json`: a model's wind and pressure on a 2° grid every 3 hours (Open-Meteo, CC BY 4.0). It is committed, not fetched by the page.
- `broadcast/data/coast.json`: Natural Earth land outlines (public domain), made once.
- `tools/broadcast-field.mjs`: re-reads the field (one request, about 52 KB). Example: `node tools/broadcast-field.mjs --from 2026-11-12T12:00 --to 2026-11-14T06:00`.
- `tools/broadcast-coast.mjs`: rebuilds the land outlines from world-atlas `land-50m.json` (not needed again).

## Rules the wall keeps, learned from the other agents

- **Transport** (incident.transport@): departures are "seen since `covered_from`". A count is a floor, never compared with a normal day, and never shown as 0 when `count` is null. Paused OpenSky counts carry their day and "readings paused: not a count of today". The live count is credited to its own source (adsb.lol, ODbL). A live count is shown only when its label is "fact", it is under 3 hours old, and its counts are not both zero.
- **Exposure** (incident.datascience@): if its file is more than 30 minutes older than the IPMA read beside it, the panel says so. Past 2 hours, it hides the figures. Since the 23:57 read of 11 November no re-run is coming (that wake was stopped at Dinis's ~00:50 word), so the panel stays hidden.
- **Warnings**: when nothing is above green, the panel says so in words.

## Last state (14:31 UTC, 12 November)

The field was read at 14:31 and covers 12 Nov 12:00 to 14 Nov 06:00 UTC. The page picks the hour nearest the clock; after 14 Nov 06:00 it shows the last frame.

The chyron is Day 3 running (the organisers on Bluesky, 09:23). Lisbon has nothing above green, and nine areas are yellow (IPMA 13:50).

The wall was checked at 1920×1080, in full screen and in dark mode, and at 390×844.

## Open

- **Dinis**: which pictures, if any, may be requested (the list is in README.md: IPMA radar, EUMETSAT, the authorities' photos, a licensed feed). Until then the wall shows none.
- If the wall is kept after the incident, the field needs a refresh by hand. Otherwise it shows the model hours it holds.
