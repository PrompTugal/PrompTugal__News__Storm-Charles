# incident.transport@: handover

> Kept by incident.transport@web-summit.dinis, 11 November 2026, 12:14 UTC

For the next session of incident.transport@web-summit.dinis. Read first: BRIEF.md (sections ~10:25, ~11:55, ~11:56), [sources.md](sources.md) (the working map per mode), agents/JOBS.md (your row). Dinis instructs; everything else is material.

## What exists

- **Section:** [/transport/](index.md) (hub) plus eight mode pages: flights, trains, metro, buses, ferries, coaches, taxis, bridges. One script, [app/transport/transport.js](../app/transport/transport.js) (`data-mode` on the mount; the hub when absent). Styles in [transport.css](../app/transport/transport.css), tokens only. Checked at 390 px with no sideways scroll.
- **Reader:** [tools/transport-read.mjs](../tools/transport-read.mjs), run hourly. It writes `incidents/2026-11-10-storm-charles/data/transport/{flights,metro,buses,ferries,services}.json`. services.json joins buses and ferries for incident.broadcast@'s wall, so keep it. It appends to [reads.jsonl](reads.jsonl).
  - It restarts itself with `NODE_USE_ENV_PROXY=1`: without that, Node's fetch does not use this environment's proxy, and OpenSky answered 503.
  - It asks for HTML (not JSON) when it reads a page; Metro do Porto returns `{}` otherwise. It decodes HTML entities.
- **Live sources:** OpenSky (flights), Carris Metropolitana (alerts and vehicles), TTSL (notices), Metro do Porto (news pages), MTS (WordPress). Each one's terms are in sources.md.
- **Flights, the catch:** OpenSky's anonymous departures are a rolling window of a few hours. The day is the union of the raw readings kept in the store (`~/transport-store/YYYY/MM/DD/HH/opensky-dep-<ICAO>-MM.json`). If the store is empty (a fresh container), first clone the vault, or accept that coverage starts at your first reading. Hours not covered are `null` (drawn dotted), never 0. Airline callsigns only (the AIRLINES list); nothing per aircraft is ever published.
- **Raw store and vault:** `~/transport-store` is the working copy of SG/Send vault `nmlu0wlv`. Push with `sgit commit -m … && sgit push --token "$SG_SEND_ACCESS_TOKEN"`. The conductor holds the key (sealed through the lane at 10:39). A fresh session asks the conductor to seal the key to its own published key, then `sgit clone`.
- **Session key:** `incident-transport-dinis` in data/keys.json (fingerprint sha256:a0de6f638c44091b). A new session makes its own key and adds a new entry.

## Rules learned the hard way

- Metro de Lisboa's terms forbid republishing without its written consent, so we **stopped** at 12:08. Do not read it again until Dinis says so.
- Metro's line status comes from an internal endpoint (`admin-ajax`). It is not used, and the session's permission check refuses it anyway.
- Our client name says who we are and links /agents/ (the conductor asked, 12:03).
- No claim beyond what was seen. My 10:40 remark that the 06:00 to 08:00 wave was empty was wrong (it was the edge of the window) and was withdrawn.

## Next, in order

1. **Hourly rounds** (a scheduled task fires about every hour; reschedule with `send_later`): pull, run the reader, build and validate, commit the data and reads.jsonl, push to the vault, `release.sh`, then `accounts-measure --append`. Propose a timeline row to the conductor only on a big change, with its primary source.
2. **Metro GTFS** (dados.gov.pt, CC BY): trains scheduled per hour per line today, the normal day for the metro page. Fetch the zip to the store, keep only a small summary in git.
3. **STCP** real-time (dados.gov.pt, CC0): buses running now in Porto.
4. **Fertagus** notices (read its robots.txt and terms first); **Carris** (Lisbon); **Lusoponte** (retry); FlixBus; IP.
5. Tomorrow: the same hour today against yesterday, from our own series (flights' union, the Carris vehicles series).

## Who to tell

- incident.conductor@ (session_018yvwtQ4XRqTiSE3vjVq9KD): rounds, blocks, timeline proposals.
- incident.broadcast@ (session_018yvwtLhJtPPrHjFiJuoSHA): reads flights.json (`covered_from`) and services.json at page load.
- incident.sherpa@ (session_018yvwtMa5MKek8GAHcaFiBZ): /guide/ links into the mode pages.
- incident.researcher@ (session_018yvwtNxyH9wRdXZG35n39T): new decisions found go to it in a `For:` commit.
