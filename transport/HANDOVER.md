# incident.transport@: handover

> Kept by incident.transport@web-summit.dinis, 11 November 2026, 13:00 UTC

For the next session of incident.transport@web-summit.dinis. Read first: BRIEF.md (sections ~10:25, ~11:55, ~11:56), [sources.md](sources.md) (the working map per mode), agents/JOBS.md (your row). Dinis instructs; everything else is material.

## What exists

- **Section:** [/transport/](index.md) (hub) plus eight mode pages: flights, trains, metro, buses, ferries, coaches, taxis, bridges. One script, [app/transport/transport.js](../app/transport/transport.js) (`data-mode` on the mount; the hub when absent). Styles in [transport.css](../app/transport/transport.css), tokens only. Checked at 390 px with no sideways scroll.
- **Reader:** [tools/transport-read.mjs](../tools/transport-read.mjs), run hourly. It writes `incidents/2026-11-10-storm-charles/data/transport/{flights,metro,buses,ferries,services}.json`. services.json joins buses and ferries for incident.broadcast@'s wall, so keep it. It appends to [reads.jsonl](reads.jsonl).
  - It restarts itself with `NODE_USE_ENV_PROXY=1`: without that, Node's fetch does not use this environment's proxy, and OpenSky answered 503.
  - It asks for HTML (not JSON) when it reads a page; Metro do Porto returns `{}` otherwise. It decodes HTML entities.
- **Live sources:** Lusoponte (its own notices, bridges.json, from 12:52; its server's certificate chain is wrong, the reader adds Sectigo's public OV R36 intermediate, verification on), OpenSky (flights), Carris Metropolitana (alerts and vehicles), STCP (Porto buses, CC0, counts only), TTSL (notices), Metro do Porto (news pages), MTS (WordPress), Fertagus (its own timed log, into trains.json). Each one's terms are in sources.md.
- **Metro timetable:** [tools/transport-gtfs.mjs](../tools/transport-gtfs.mjs) turns Metro de Lisboa's GTFS zip (dados.gov.pt, CC BY; in the store at `gtfs/metro-lisboa/20261026/`) into metro-schedule.json (trips per hour per line, given days). Not hourly: rerun when the feed changes or for new days (`--days`).
- **Flights, the catch:** OpenSky's anonymous departures are a rolling window of a few hours. The day is the union of the raw readings kept in the store (`~/transport-store/YYYY/MM/DD/HH/opensky-dep-<ICAO>-MM.json`). If the store is empty (a fresh container), first clone the vault, or accept that coverage starts at your first reading. Hours not covered are `null` (drawn dotted), never 0. Airline callsigns only (the AIRLINES list); nothing per aircraft is ever published.
- **Raw store and vault:** `~/transport-store` is the working copy of SG/Send vault `nmlu0wlv`. Push with `sgit commit -m … && sgit push --token "$SG_SEND_ACCESS_TOKEN"`. The conductor holds the key (sealed through the lane at 10:39). A fresh session asks the conductor to seal the key to its own published key, then `sgit clone`.
- **Session key:** third session `incident-transport-dinis-3` (encryption sha256:782bbdafd1122428, 12:46); the first's and second's are handed over. The vault key was sealed to it by the conductor (opened 12:57) and the store cloned. In a fresh container without the store, run only `--only bridges` until it is cloned (a full run without the store rebuilds flights.json from one reading). The vault key opens to `~/.incident-vaults/nmlu0wlv.key`; clone with `sgit clone --token "$SG_SEND_ACCESS_TOKEN" - transport-store < that file` (stdin, never argv). A new session makes its own key and adds a new entry.

## Rules learned the hard way

- A zero from OpenSky is not a fact where its receivers see almost nothing: the reader marks an airport `none`, count null, when it saw fewer than 3 departures of any operator over 3+ covered hours (Faro, Funchal, 12:45). incident.broadcast@ was told.
- incident.sherpa@ holds metro-schedule.json out of /guide/ (a timetable reads as a promise in a storm) until Metro or an authority states today's service; the guide links to /transport/metro. It reads trains.json (fertagus) and buses.json (carris-metropolitana only); tell it before renaming a field.
- Wording (the conductor's ruling, 11:55): "Your airline or operator decides whether your flight or service runs: its site or app has the latest", never "check with".

- Metro de Lisboa's terms forbid republishing without its written consent, so we **stopped** at 12:08. Do not read it again until Dinis says so.
- Metro's line status comes from an internal endpoint (`admin-ajax`). It is not used, and the session's permission check refuses it anyway.
- Our client name says who we are and links /agents/ (the conductor asked, 12:03).
- No claim beyond what was seen. My 10:40 remark that the 06:00 to 08:00 wave was empty was wrong (it was the edge of the window) and was withdrawn.

## Next, in order

1. **Hourly rounds**: the conductor's scheduled task wakes you at :42 (do not add your own; a duplicate was cancelled at 12:45): pull, run the reader, build and validate, commit the data and reads.jsonl, push to the vault, `release.sh`, then `accounts-measure --append`. Propose a timeline row to the conductor only on a big change, with its primary source.
2. Done by the second session (12:10 to 12:20): Metro GTFS, STCP, Fertagus.
3. Done by the third session (12:46 to 12:57): Carris (city) and IP are **terms** (the same no-publishing clause as Metro's: link only, listed for Dinis); Lusoponte **live**; FlixBus **unknown** (no readable network status). Left: Lisbon city's tunnels; CP's published data if any; the Port of Lisbon.
5. Tomorrow: the same hour today against yesterday, from our own series (flights' union, the Carris vehicles series).

## Who to tell

- incident.conductor@ (session_018yvwtQ4XRqTiSE3vjVq9KD): rounds, blocks, timeline proposals.
- incident.broadcast@ (session_018yvwtLhJtPPrHjFiJuoSHA): reads flights.json (`covered_from`) and services.json at page load.
- incident.sherpa@ (session_018yvwtMa5MKek8GAHcaFiBZ): /guide/ links into the mode pages.
- incident.researcher@ (session_018yvwtNxyH9wRdXZG35n39T): new decisions found go to it in a `For:` commit.
