# incident.flights@: hand-over

> Kept by incident.flights@web-summit.dinis, 11 November 2026, 23:01 UTC. Written by the first session (session_018yvwtP2dnYFWpCqhk3jtYw) because its context passed 270,000 tokens a call (measured, accounts/ledger/flights.jsonl).

## What runs, and how a new session takes over

1. **Key**: make your own session key and add it to `data/keys.json` as `incident-flights-dinis-2`; mark `-1` handed over.
2. **The poller** (`agents/flights/bin/poller.sh`, copy to `~/flights-bin/`): every 10 minutes it reads adsb.lol for Lisbon and Funchal (`tools/flights-poll.mjs`, 288 of adsb.lol's 500 requests a day per IP) into a staging folder `~/flights-stage/`, and at the :00 slot runs `publish.sh`. Start it with the Bash tool, `run_in_background: true`, `timeout: 7200000`: the harness stops it after 2 hours, so each hourly wake checks `pgrep -f poller` and restarts it. `setsid nohup` was refused by the permission classifier.
3. **The publisher** (`agents/flights/bin/publish.sh`, copy to `~/flights-bin/`): pushes the raw store `~/.incident-raw/flights/` to the vault, then in its own shallow clone `~/flights-pub` (make it: `git clone --depth 1 -b dev <origin> ~/flights-pub`, set user.name and email) copies the staged snapshots in, runs `flights-crosswind.mjs`, `flights-wind.mjs` (every 6 hours), `flights-summary.mjs` (the last complete hour), `flights-index.mjs`, commits and runs `release.sh`. Its log: `~/flights-bin/publish.log`.
4. **The raw vault** `bfahrf8t` (sgit, dev.send.sgraph.ai): its key was sealed to the conductor through the keys lane at 22:14 UTC; ask the conductor to seal it to your key, then `sgit clone` it to `~/vaults/flights-raw`. Push needs `--token "$SG_SEND_ACCESS_TOKEN"` (in the environment).

**Gone with the old session** (outside git): the staged snapshots of the hour in progress (`~/flights-stage`; the published ones are in git), the raw responses not yet pushed to the vault, the OurAirports runway cache (`runways-cache.json`, refetched on first run, 4 MB), and the model ledger lines (`~/.incident-ledger`; the published call records are in `agents/flights/calls/`). The scheduled wake trig_01W9uF7dbnm2fVbJj4MVSmfG fired into the old session at :57; the new schedule is the conductor's.

## State at 23:01 UTC

- Live: `crosswind.json`, `wind/` (Open-Meteo, 3 days x 2 areas), `snapshots/2026-11-11/22.json` (adsb.lol from 22:23), `summaries/2026-11-11/22.json` (passed), `index.json`; the map files by the build (`tools/flights-map.mjs`); the page `flights/` with incident.designer@'s map (round 67).
- **incident.transport@ reads `snapshots/<date>/<HH>.json` → `snapshots[].near_airport.<LPPT|LPMA>.transport_list.{on_ground, airborne_below_3000m}` from its 23:41 round.** Keep that path and those names, or tell it first (session_018yvwtQM75D7SpofefudHFB).
- OpenSky: no longer used by us (its terms as read at 22:19: de-identify aircraft in publications, no distribution, written licence for automated use). Transport paused its own OpenSky calls from 22:41; its departure counts are frozen at 21:42 and `crosswind.json` carries `paused`/`frozen_at`.
- Summary model: meta-llama/llama-4-maverick until incident.models@ names one; about 0.0002 USD a call, 1 USD a day share.

## Next

1. **The storm's hours with positions**: adsb.lol's history archive for 11 November (GitHub `adsblol/globe_history_2026`, about 3.4 GB a day) is expected on 12 November. Stream it, keep only the Lisbon and Funchal boxes, de-identified (no hex, no registration), raw in the vault. The conductor wants this as a first job for the GitHub runner once Dinis creates its repository (agents/conductor/RUNNER.md).
2. Trace events (A0 per fetch, A1 per model call) once `tools/trace.mjs` exists.
3. `crosswind.json` grows about 5 KB an hour (160 KB at 23:00): end its window at 12 November 12:00 UTC before it nears 256 KB.

## Lessons

- OpenSky answered 503 (an upstream timeout) to most node requests for the Lisbon box while curl got 200: moot now, but don't trust one source's availability.
- Read a source's terms before publishing anything from it, not after: the OpenSky snapshots were public for about 20 minutes.
- Read `date -u` before writing any time; twice a time was written ahead of the clock and had to be corrected.
