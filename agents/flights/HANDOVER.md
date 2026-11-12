# incident.flights@: hand-over

> Kept by incident.flights@web-summit.dinis, 12 November 2026, 00:02 UTC. Written by the second session (session_018yvwtMyxnGmzJLiwnr7JrW) because its context reached about 232,000 tokens a call (measured, accounts/ledger/flights.jsonl, 00:01 UTC).

## What runs, and how a new session takes over

1. **Key**: make your own session key (`node pki-agent.mjs keygen --name "incident.flights@web-summit.dinis" --session`, the copy whose sha256 is fcb28a1c...02ab) and add it to `data/keys.json` as `incident-flights-dinis-3`; move `-2` to `data/keys-archive/flights.json` with status "handed over". Tell the conductor (session_018yvwtQ4XRqTiSE3vjVq9KD): it seals the raw vault key `bfahrf8t` to you; open it with `node tools/lane-handover.mjs open '<m1 code>'` (writes `~/.incident-vaults/bfahrf8t.key`), then `cd ~/vaults && sgit clone "$(cat ~/.incident-vaults/bfahrf8t.key)" flights-raw`.
2. **Set up**: `mkdir -p ~/flights-bin ~/flights-stage/incidents/2026-11-10-storm-charles/data/flights ~/.incident-raw/flights`; copy `agents/flights/bin/poller.sh` to `~/flights-bin/poller2.sh` and `publish.sh` to `~/flights-bin/` (change the Claude-Session line to yours); seed the stage from git: `cp -r incidents/2026-11-10-storm-charles/data/flights/{snapshots,frames} ~/flights-stage/incidents/2026-11-10-storm-charles/data/flights/`; `git clone --depth 1 -b dev https://github.com/PrompTugal/PrompTugal__News__Storm-Charles ~/flights-pub` and set its user.name and user.email from the main clone. Make sure the main clone is on branch `dev` (release.sh refuses a detached HEAD: `git checkout -B dev && git branch -u origin/dev`).
3. **Switch pollers** (only one may run: adsb.lol allows 500 requests a day per IP): start yours with the Bash tool, `run_in_background: true`, `timeout: 7200000` (`~/flights-bin/poller2.sh`), then tell this session to stop. The harness stops a poller after 2 hours: each wake checks `pgrep -f poller2.sh` and restarts it.
4. **Never edit a running bash script in place** (bash reads it as it runs): write a new file and `mv` it over, or restart.

## The data (since 11 November 23:42 UTC)

- `frames/<area>/<date>/<HH>.json` (tools/flights-poll.mjs): Lisbon 250 nm every 5 min, Madeira ("funchal") 150 nm every 20; `cadence_min` in each file; airline rows under `fields`; every other aircraft anonymous under `other_fields` (category, position, alt to 100 ft, speed, track: no callsign, hex, registration or type); PIA/LADD dropped and counted. 15 requests an hour = 360 a day. A part `<HH>-2.json` if an hour would pass 240 KB.
- `snapshots/<date>/<HH>.json`: the earlier 40/30 nm shape (`--legacy`), Lisbon every 10 min, Madeira every 20. **incident.transport@ reads `snapshots[].near_airport.<LPPT|LPMA>.transport_list`**: keep the path and names or tell it first (session_018yvwtQM75D7SpofefudHFB). The hourly summary reads these too.
- Built by `tools/flights-map.mjs` (a build generator, not in git): `map/snapshots/` (frames replace snapshots of the same minute; `others[]`, `counts`, `phase`), `tracks/<area>/<date>/<HH>.json` (callsign → measured points, now, phase), `map/wind/<area>/...`.
- `wind/<area>-<date>.json` (tools/flights-wind.mjs, every 6 hours from the publisher): `lisbon` and `madeira` at 0.5° over the wide boxes (396 and 168 points), `lisbon-close` and `madeira-close` at 0.25° (121 and 24) for the close views. Largest file 173 KB.
- `crosswind.json`: window ends 12 November 12:00 UTC (165 KB now).
- `flights/how.json` (`pipelines[]` and the designer's `chains[]`) and `flights/how.md`: update them if the cadence, areas or lattice change.
- incident.designer@ (session_018yvwtPn6x13fYPQ2fmb4Cp) draws all of it (rounds 69–70, f6d1bb7): tell it before changing any shape.

## Open

1. **1–2 minute positions** (Dinis's ask, via the conductor 23:38): needs an adsb.lol key, which is Dinis's decision: a free "adhoc" key by request form (1,000 a day: Lisbon every 2 min + Madeira every 10) or a feeder key (7,200 a day). Told the conductor at 23:46. With a key: send it as `x-api-key` (a network secret through the proxy, never in git), change `CADENCE_MIN` in flights-poll.mjs and the loop in poller.sh together, then how.json/how.md.
2. **The 11 November archive** (adsb.lol `globe_history_2026`, expected 12 November): the runner's first job (agents/conductor/RUNNER.md); cut the Lisbon and Madeira boxes de-identified, raw to the vault.
3. Trace events once `tools/trace.mjs` exists. Models: llama-4-maverick through tools/llm.mjs until incident.models@ names one.

## Lessons

- adsb.lol's `x-ratelimit-remaining` jumps between counters (350 to 480 within a minute): the IP may be shared; keep a margin.
- The build escapes raw HTML in a markdown body: a second map mount goes in the front matter's `mount:` line.
- Read `date -u` before writing any time: three times this session a time was written a minute ahead and corrected, the last in this hand-over.
