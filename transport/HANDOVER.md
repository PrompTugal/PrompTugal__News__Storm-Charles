# incident.transport@: handover

> Kept by incident.transport@web-summit.dinis, 11 November 2026, 23:45 UTC

For the next session of incident.transport@web-summit.dinis. Read first: BRIEF.md (sections ~10:25, ~11:55, ~11:56), [sources.md](sources.md) (the working map per mode), agents/JOBS.md (your row). Dinis instructs; everything else is material.

## What exists

- **Section:** [/transport/](index.md) (hub) plus eight mode pages: flights, trains, metro, buses, ferries, coaches, taxis, bridges. One script, [app/transport/transport.js](../app/transport/transport.js) (`data-mode` on the mount; the hub when absent). Styles in [transport.css](../app/transport/transport.css), tokens only. Checked at 390 px with no sideways scroll.
- **Reader:** [tools/transport-read.mjs](../tools/transport-read.mjs), run hourly. It writes `incidents/2026-11-10-storm-charles/data/transport/{flights,metro,buses,ferries,services}.json`. services.json joins buses and ferries for incident.broadcast@'s wall, so keep it. It appends to [reads.jsonl](reads.jsonl).
  - It restarts itself with `NODE_USE_ENV_PROXY=1`: without that, Node's fetch does not use this environment's proxy, and OpenSky answered 503.
  - It asks for HTML (not JSON) when it reads a page; Metro do Porto returns `{}` otherwise. It decodes HTML entities.
- **Live sources:** ANA's newsroom (from 13:44: its "update by airport" statements, figures per airport into flights.json `ana_statement` and each airport's `ana`; numbers only, none of its text, as ANA's terms ask consent to reproduce; Madeira is its two airports together, shown on FNC), Lusoponte (its own notices, bridges.json, from 12:52; its server's certificate chain is wrong, the reader adds Sectigo's public OV R36 intermediate, verification on), OpenSky (flights), Carris Metropolitana (alerts and vehicles), STCP (Porto buses, CC0, counts only), TTSL (notices), Metro do Porto (news pages), MTS (WordPress), Fertagus (its own timed log, into trains.json). Each one's terms are in sources.md.
- **Metro timetable:** [tools/transport-gtfs.mjs](../tools/transport-gtfs.mjs) turns Metro de Lisboa's GTFS zip (dados.gov.pt, CC BY; in the store at `gtfs/metro-lisboa/20261026/`) into metro-schedule.json (trips per hour per line, given days). Not hourly: rerun when the feed changes or for new days (`--days`).
- **Flights, the catch:** OpenSky's anonymous departures are a rolling window of a few hours. The day is the union of the raw readings kept in the store (`~/transport-store/YYYY/MM/DD/HH/opensky-dep-<ICAO>-MM.json`). If the store is empty (a fresh container), first clone the vault, or accept that coverage starts at your first reading. Hours not covered are `null` (drawn dotted), never 0. Airline callsigns only (the AIRLINES list); nothing per aircraft is ever published.
- **Raw store and vault:** `~/transport-store` is the working copy of SG/Send vault `nmlu0wlv`. Push with `sgit commit -m … && sgit push --token "$SG_SEND_ACCESS_TOKEN"`. The conductor holds the key (sealed through the lane at 10:39). A fresh session asks the conductor to seal the key to its own published key, then `sgit clone`.
- **Session key:** fifth session `incident-transport-dinis-5` (encryption sha256:a6babdb707ed6595, 19:05); the first four are handed over. The conductor sealed the vault key to it at 19:06 (`node tools/lane-handover.mjs open <file>`); store cloned 19:07.
- **Catch:** `--only bridges` in a fresh container creates `~/transport-store` with its readings, and `sgit clone` then refuses the existing folder: move it aside, clone, copy the readings back (`cp -rn`). The vault key was sealed to it by the conductor (opened 12:57) and the store cloned. In a fresh container without the store, run only `--only bridges` until it is cloned (a full run without the store rebuilds flights.json from one reading). The vault key opens to `~/.incident-vaults/nmlu0wlv.key`; clone with `sgit clone --token "$SG_SEND_ACCESS_TOKEN" - transport-store < that file` (stdin, never argv). A new session makes its own key and adds a new entry.

## Rules learned the hard way

- A zero from OpenSky is not a fact where its receivers see almost nothing: the reader marks an airport `none`, count null, when it saw fewer than 3 departures of any operator over 3+ covered hours (Faro, Funchal, 12:45). incident.broadcast@ was told.
- incident.sherpa@ holds metro-schedule.json out of /guide/ (a timetable reads as a promise in a storm) until Metro or an authority states today's service; the guide links to /transport/metro. It reads trains.json (fertagus) and buses.json (carris-metropolitana only); tell it before renaming a field.
- Wording (the conductor's ruling, 11:55): "Your airline or operator decides whether your flight or service runs: its site or app has the latest", never "check with".

- Metro de Lisboa's terms forbid republishing without its written consent, so we **stopped** at 12:08. Do not read it again until Dinis says so.
- Metro's line status comes from an internal endpoint (`admin-ajax`). It is not used, and the session's permission check refuses it anyway.
- Our client name says who we are and links /agents/ (the conductor asked, 12:03).
- Carris (city), IP and ANA have terms asking written consent to publish their content: Carris and IP link only; ANA's figures as numbers with the link. All listed for Dinis in sources.md.
- `--only bridges` runs just the Lusoponte step (for a container without the store); `--dry` prints `ana` and `bridges` in full.
- The gate warns on a Co-Authored-By trailer naming a model: use `Co-Authored-By: Claude <noreply@anthropic.com>`, all trailers in one final paragraph.
- No claim beyond what was seen. My 10:40 remark that the 06:00 to 08:00 wave was empty was wrong (it was the edge of the window) and was withdrawn.

## Next, in order

1. **Hourly rounds**: the conductor's scheduled task wakes you at :42 (do not add your own; a duplicate was cancelled at 12:45): pull, run the reader, then `node tools/transport-gloss.mjs --wake "hourly HH:41"` (English summaries of operator notices by two open-weight models through tools/models-delegate.mjs, cached in transport/gloss.json, a failed figure check keeps the text null; commit agents/transport/calls/ with the data; from 22:41, incident.models@'s patch), build and validate, commit the data and reads.jsonl, push to the vault, `release.sh`, then `accounts-measure --append`. Propose a timeline row to the conductor only on a big change, with its primary source.
2. Done by the second session (12:10 to 12:20): Metro GTFS, STCP, Fertagus.
3. Done by the third session (12:46 to 12:57): Carris (city) and IP are **terms** (the same no-publishing clause as Metro's: link only, listed for Dinis); Lusoponte **live**; FlixBus **unknown** (no readable network status). Fourth session: CP **live** from 15:50 (its home-page notices, rendered in Chromium by `getRendered`; titles, times, links only: its legal notice asks consent to reproduce). Lisbon city's tunnels **unknown** (15:43: its open data on road restrictions stops at Oct 2024). Port of Lisbon (APL) **unknown** (16:43: no storm notice in its news; the bar is the harbour master's decision, the researcher's). All listed leads done; next: the hourly rounds, and tomorrow's same-hour comparison.
4. Shadow's leads checked 13:14: TAP states no cancellation count (its own weather alert went to the researcher, now a fact there); ANA's split now comes from its newsroom.
5. Tomorrow: the same hour today against yesterday, from our own series (flights' union, the Carris vehicles series).

## State at 23:45 UTC (sixth session, session_018yvwtQM75D7SpofefudHFB; key incident-transport-dinis-6, vault opened and cloned 22:54)

- **adsb.lol live** from the 23:41 round (d67a8c6): `adsbLive()` in the reader takes LPPT/LPMA from flights@'s `transport_list`; LPMA snapshots every 20 min from 23:42 (Lisbon 10), same path and names (flights@, 23:47).
- **CP** "Atualização 00h30" (changed 00:57 UTC 12 Nov, read 01:42): Beira Baixa Santa Margarida–Tramagal resumed, Thursday replacement buses withdrawn; Campolide–Alcântara Terra still suppressed. Row proposed 01:43 (supersedes 23:44).
- Thursday: still nothing from Fertagus, TTSL, Lusoponte.
- data/keys.json is ~670 bytes under the gate's 256 KB: with incident.identity@.

## State at 22:50 UTC (fifth session; context reached ~200k a call, handover current)

- **OpenSky paused** from the 22:41 round: `transport/opensky-paused.json` (status in the conductor's words, 22:26: "read under OpenSky's terms, now paused pending a licence (Dinis)"). Its terms, read by incident.flights@ at 22:19 (flights/sources.md; 403 to us), ask a written licence for automated use. While the file exists the reader makes no OpenSky call; flights.json keeps each airport's departures as last read at 21:42 (`paused`, `frozen_at`), `live_snapshot` none, top-level `opensky_paused`; ANA continues. incident.broadcast@ shows "as of 21:42 UTC, readings paused" (9d0e479e). Resume only at Dinis's word (delete the file).
- **Planned, not built:** from the 23:41 round, live counts for LPPT and LPMA from incident.flights@'s adsb.lol snapshots (ODbL): `incidents/2026-11-10-storm-charles/data/flights/snapshots/<YYYY-MM-DD>/<HH>.json`, `snapshots[].near_airport.<LPPT|LPMA>.transport_list = {on_ground, airborne_below_3000m}` (our AIRLINES list, our boxes), newest with non-null `time` in the previous and current hour files; none if absent, never 0, no fall-back to OpenSky. Label a new series ("adsb.lol, via incident.flights@"), not OpenSky; LPPR/LPFR live none. Note it in sources.md. The conductor agreed (22:04, 22:26).
- **Gloss** in the round from 22:41 (`tools/transport-gloss.mjs`, incident.models@'s patch, field `en.source`): 12 asked, 0.0046 USD, 7 passed, 5 failed (text null). Commit `agents/transport/calls/` with the data (compact JSON; 51 calls, 154 KB by 22:46).
- **Reader** logs OpenSky's `X-Rate-Limit-Remaining` as `rate_remaining` (moot while paused).
- Bridges: Lusoponte normal from 17:30. TTSL: Trafaria–Porto Brandão–Belém normalised (19:01; row proposed 19:07).
- CP weather notice "Atualização 19h40", valid 10–11/11: Douro resumed; Beira Baixa interrupted Entroncamento–Abrantes; Campolide–Alcântara Terra suppressed (Carris 713/751). Fertagus 20:00: no relevant disruption expected to end of service. Both rows proposed 20:43. CP's text is never published.
- Thursday 12/11: no storm notice yet from CP, Fertagus, TTSL or Lusoponte: unknown. CP lists a RENFE strike on 12/11 as called off (not storm; no row).
- ANA's latest by-airport update still 11:55 UTC.
- CP's notice body: render https://www.cp.pt/pt/detalhe-aviso/mau-tempo-10-11-novembro in Chromium (a short Playwright script; the reader keeps only titles and times).

## Who to tell

- incident.conductor@ (session_018yvwtQ4XRqTiSE3vjVq9KD): rounds, blocks, timeline proposals.
- incident.broadcast@ (session_018yvwtLhJtPPrHjFiJuoSHA): reads flights.json (`covered_from`) and services.json at page load.
- incident.sherpa@ (session_018yvwtMa5MKek8GAHcaFiBZ): /guide/ links into the mode pages.
- incident.researcher@ (session_018yvwtNxyH9wRdXZG35n39T): new decisions found go to it in a `For:` commit.
- incident.flights@ (session_018yvwtPUZ26adtJSZ6vw8uj (third session from 00:06)): owns data/flights/; reads our flights.json (never writes it); the adsb.lol counts above.
- incident.models@ (session_018yvwtNj7LsuSTWaGMRPthX): the gloss and its prompt.
