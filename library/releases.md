# The release history: every version, what changed, and whether it was served

> Kept by incident.librarian@web-summit.dinis, 2026-11-11, 22:26 UTC. Built by [tools/library-releases.mjs](../tools/library-releases.mjs) from the tags, the commit subjects and the deploy workflow's runs as incident.ci@ keeps them ([the pipeline](../ci/README.md)), read at that time; the data is [releases.json](releases.json). Back to [the library](README.md).

CI numbers every push (`v0.1.<run>`), deploys it and tags it; nobody who pushes writes a number ([BRIEF-CORRECTIONS.md](../BRIEF-CORRECTIONS.md)). Until about 23:55 UTC on 10 November the newest push cancelled a run in progress; since then a running deploy finishes and only a run still waiting is replaced (the workflow's own comment), so a later "cancelled" should mean it never started. **1668 runs: 1152 served (confirmed by CI), 15 deployed and tagged but cancelled before CI confirmed, 459 cancelled before the tag, 6 failed, 36 still running or unknown when read.**

## Versions never confirmed served

465 of 1668. The newest: v0.1.1644, v0.1.1643, v0.1.1642, v0.1.1640, v0.1.1635, v0.1.1633, v0.1.1630, v0.1.1628, v0.1.1627, v0.1.1625, v0.1.1624, v0.1.1622, v0.1.1621, v0.1.1619, v0.1.1614, v0.1.1613, v0.1.1612, v0.1.1611, v0.1.1610, v0.1.1609, v0.1.1608, v0.1.1607, v0.1.1606, v0.1.1605, v0.1.1604, v0.1.1603, v0.1.1602, v0.1.1601, v0.1.1600, v0.1.1599. Each hour's file lists every version with its state.

**This is not a list of versions that were never deployed**, and none can be made from the runs alone: a cancelled deploy step can still go live. Run 32: served: /version.json answered v0.1.32 with commit 487818fc40 when read at 23:49 UTC, although the run's deploy step is recorded as cancelled (job 130213112738) and no tag was pushed (incident.librarian@). Each of these versions' commits is contained in the next served version, so no change was lost; what is not known is whether a reader was ever served that exact number.

## The newest sixty versions

What changed is each commit's own subject, as its agent wrote it. Every version, hour by hour, as data: [11-11 22h](../view/index.html?path=library/releases/2026-11-11T22.json) (85) · [mmit-foundh](../view/index.html?path=library/releases/no-commit-found.json) (12) · [11-11 21h](../view/index.html?path=library/releases/2026-11-11T21.json) (46) · [11-11 20h](../view/index.html?path=library/releases/2026-11-11T20.json) (31) · [11-11 19h](../view/index.html?path=library/releases/2026-11-11T19.json) (38) · [11-11 18h](../view/index.html?path=library/releases/2026-11-11T18.json) (41) · [11-11 17h](../view/index.html?path=library/releases/2026-11-11T17.json) (32) · [11-11 16h](../view/index.html?path=library/releases/2026-11-11T16.json) (53) · [11-11 15h](../view/index.html?path=library/releases/2026-11-11T15.json) (56) · [11-11 14h](../view/index.html?path=library/releases/2026-11-11T14.json) (58) · [11-11 13h](../view/index.html?path=library/releases/2026-11-11T13.json) (57) · [11-11 12h](../view/index.html?path=library/releases/2026-11-11T12.json) (144) · [11-11 11h](../view/index.html?path=library/releases/2026-11-11T11.json) (84) · [11-11 10h](../view/index.html?path=library/releases/2026-11-11T10.json) (131) · [11-11 09h](../view/index.html?path=library/releases/2026-11-11T09.json) (83) · [11-11 08h](../view/index.html?path=library/releases/2026-11-11T08.json) (41) · [11-11 07h](../view/index.html?path=library/releases/2026-11-11T07.json) (38) · [11-11 06h](../view/index.html?path=library/releases/2026-11-11T06.json) (37) · [11-11 05h](../view/index.html?path=library/releases/2026-11-11T05.json) (75) · [11-11 04h](../view/index.html?path=library/releases/2026-11-11T04.json) (64) · [11-11 03h](../view/index.html?path=library/releases/2026-11-11T03.json) (116) · [11-11 02h](../view/index.html?path=library/releases/2026-11-11T02.json) (171) · [11-11 01h](../view/index.html?path=library/releases/2026-11-11T01.json) (34) · [11-11 00h](../view/index.html?path=library/releases/2026-11-11T00.json) (65) · [11-10 23h](../view/index.html?path=library/releases/2026-11-10T23.json) (64) · [11-10 22h](../view/index.html?path=library/releases/2026-11-10T22.json) (2) · [11-10 21h](../view/index.html?path=library/releases/2026-11-10T21.json) (10).

| Version | Pushed (UTC) | State | What changed |
|---|---|---|---|
| v0.1.1668 | 11-11 22:39 | tagged | *incident.models@* tools/models-measure-match.mjs: match-fact measured against media's first-on-each-fact · *incident.models@* call records so far (match-fact measurement, in progress) · *incident.models@* match-fact measured on media's first-on-each-fact: maverick 47/61, gemma 44/61, comparison 38/61 |
| v0.1.1667 | 11-11 22:38 | tagged | *incident.entities@* hourly 22:37: nodes remade (264 nodes, 622 edges: two agents) · *incident.media@* 22:36 sweep: 608 items (18 new), no new first |
| v0.1.1666 |  | unknown | no commit found for this run |
| v0.1.1665 | 11-11 22:37 | tagged | *incident.weatherwatch@* sixth session key incident-weatherwatch-dinis-6; -5 handed over · *incident.board@* runner cards ranked ahead of their ties at the conductor's word |
| v0.1.1664 |  | unknown | no commit found for this run |
| v0.1.1663 | 11-11 22:36 | tagged | *incident.board@* five asks for Dinis placed at the conductor's word (runner repo and secrets, Elastic, held runs, OpenSky counts); flights ranks confirmed |
| v0.1.1662 | 11-11 22:35 | tagged | *incident.models@* handover at 22:34 (context past 200k a call) · *incident.board@* 22:33 round: two rows, two flight-data asks ranked, a-shadow-5 confirmed · *incident.weatherwatch@* 22:33 re-read (no CAP since 19:17:31; Lisbon yellow sea to 03:00); HANDOVER.md brought up to date · *incident.weatherwatch@* tokens measured · *incident.models@* third session key incident-models-dinis-3; -2 handed over |
| v0.1.1661 |  | unknown | no commit found for this run |
| v0.1.1660 |  | unknown | no commit found for this run |
| v0.1.1659 |  | unknown | no commit found for this run |
| v0.1.1658 | 11-11 22:33 | tagged | *incident.models@* wake 22:31: delegation summary (models/delegated/summary.json), rate limits retried, translate on gemma-4-31b and llama-4-maverick; tokens measured |
| v0.1.1657 | 11-11 22:30 | tagged | *incident.flights@* crosswind carries transport's paused/frozen_at on departures · *incident.transport@* OpenSky marked "read under OpenSky's terms, now paused pending a licence (Dinis)", the conductor's wording · *incident.broadcast@* the transport panel shows OpenSky's departures as "as of <frozen_at>, readings paused"; model field re-read at 22:31 UTC |
| v0.1.1656 |  | unknown | no commit found for this run |
| v0.1.1655 |  | unknown | no commit found for this run |
| v0.1.1654 | 11-11 22:29 | tagged | *incident.transport@* pause OpenSky from the 22:41 round (its terms ask a written licence for automated use); for Dinis |
| v0.1.1653 | 11-11 22:28 | tagged | *incident.ci@* ci-read.mjs reads all three jobs (build, deploy, tag) since run 1618; first runs measured · *incident.designer@* round 67: the flights map live on /flights/; the storm hours' note in flights@'s words |
| v0.1.1652 |  | unknown | no commit found for this run |
| v0.1.1651 | 11-11 22:27 | tagged | *incident.flights@* the flights page (mounts the designer's map); transport's own-list count in near_airport · *incident.aws@* aws/README.md and aws/architecture.md: the runner mapped onto AWS (first pass) · *incident.conductor@* 22:27 bridge sync (meteorologist's 22:22 read, analysis 30) |
| v0.1.1650 |  | unknown | no commit found for this run |
| v0.1.1649 |  | unknown | no commit found for this run |
| v0.1.1648 | 11-11 22:26 | tagged | *incident.archivist@* 22:23 round: the five primary pages unchanged since 21:23 (Lisbon: one yellow sea-state warning to 03:00) · *incident.models@* the researcher's press-decision lead list, run here at the conductor's word (models/delegated/); four of four collectors · *incident.designer@* round 67: aircraft credited to adsb.lol (ODbL); the type on the picked aircraft |
| v0.1.1647 |  | unknown | no commit found for this run |
| v0.1.1646 |  | unknown | no commit found for this run |
| v0.1.1645 | 11-11 22:25 | tagged | *incident.observability@* HANDOVER and status for the tenth session (models@ calls in the trace) |
| v0.1.1644 | 11-11 22:25 | not confirmed | *incident.flights@* status: adsb.lol, map files, sources; asks for Dinis |
| v0.1.1643 | 11-11 22:25 | not confirmed | *incident.sources@* 22:24 round: MeteoAlarm's Portugal feed unchanged (4 yellow in force); the second reader agrees with the parser on 15 of 15 messages |
| v0.1.1642 | 11-11 22:25 | not confirmed | *incident.observability@* trace backfill reads models@'s call records (A2/A1 spans under their agents, cost and duration); unchanged hours left untouched |
| v0.1.1641 | 11-11 22:24 | served | *incident.flights@* positions from adsb.lol (ODbL) instead of OpenSky, whose terms forbid republishing identified positions; OpenSky snapshots removed; flights/sources.md (licences, limits, coverage of seven sources) |
| v0.1.1640 | 11-11 22:24 | not confirmed | *incident.models@* patches: sources wired, researcher not now |
| v0.1.1639 | 11-11 22:24 | served | *incident.librarian@* altitudes: CI's grants read per job (build A0, deploy and tag A3 in part); incident.aws@ in |
| v0.1.1638 | 11-11 22:24 | served | *incident.sources@* a second reader for MeteoAlarm's messages: open-weight models through OpenRouter check the parser's fields (incident.models@'s patch, at Dinis's direction of 22:00); first five agree on every field |
| v0.1.1637 | 11-11 22:23 | served | *incident.media@* models-match.mjs matches by rank.mjs's own rule |
| v0.1.1636 | 11-11 22:23 | served | *incident.observability@* tenth session key incident-observability-dinis-10; -9 handed over |
| v0.1.1635 | 11-11 22:22 | not confirmed | *incident.ci@* session key incident-ci-dinis-4 (public half); incident-ci-dinis-3 handed over |
| v0.1.1634 | 11-11 22:22 | served | *incident.models@* hour files one item per line; notice summaries leave out addresses and phone numbers; media wired |
| v0.1.1633 | 11-11 22:22 | not confirmed | *incident.ci@* ci-altitudes applied (fd90abcd) and working: run 1626 built read-only, tagged through the API, deployed; push to served 49 s |
| v0.1.1632 | 11-11 22:21 | served | *incident.designer@* round 67: the flights map takes incident.flights@'s map files first (Lisbon only, real runway ends, ANA's day) |
| v0.1.1631 | 11-11 22:21 | served | *incident.identity@* 22:20 wake: 132 keys of 40 agents (flights and aws new), 0 problems, signatures hold |
| v0.1.1630 | 11-11 22:21 | not confirmed | *incident.observability@* trace spawn: the child's "session begins" line goes in the parent's file |
| v0.1.1629 | 11-11 22:21 | served | *incident.models@* OpenRouter requests carry our trace and span ids (Broadcast to Elastic joins them); transport's patch applied |
| v0.1.1628 | 11-11 22:21 | not confirmed | *incident.transport@* handover time as read (22:20, not 22:22) |
| v0.1.1627 | 11-11 22:20 | not confirmed | *incident.transport@* gloss step in the hourly round from 22:41; the 22:20 trial's text-free call log |
| v0.1.1626 | 11-11 22:20 | served | *incident.observability@* HANDOVER: times corrected to date -u |
| v0.1.1625 | 11-11 22:20 | not confirmed | *incident.librarian@* pack rule 16: leave a trace with tools/trace.mjs (per-role files allowed, fd90abcd) |
| v0.1.1624 | 11-11 22:20 | not confirmed | *incident.flights@* the map's files in the designer's shapes (round 65), by a build generator; runway thresholds; near_airport counts for transport |
| v0.1.1623 | 11-11 22:20 | served | *incident.observability@* HANDOVER: the trace.mjs import fix, and models/calls into the backfill as the tenth's first job |
| v0.1.1622 | 11-11 22:20 | not confirmed | *incident.ci@* hourly wake 22:18 (71 runs, no failure; 8 superseded, each followed by a deploy); HANDOVER.md for the fourth session |
| v0.1.1621 | 11-11 22:20 | not confirmed | *incident.designer@* round 67: the flights map reads incident.flights@'s files (wind grid, snapshots, METAR crosswind, ANA) |
| v0.1.1620 | 11-11 22:19 | served | *incident.observability@* tools/trace.mjs: the CLI runs only as the command, never on import; export emit() |
| v0.1.1619 | 11-11 22:19 | not confirmed | *incident.aws@* session key incident-aws-dinis-1 (public half) |
| v0.1.1618 | 11-11 22:19 | served | *incident.conductor@* CI split by altitude (ci/patches/ci-altitudes.patch: build read-only, deploy without repository code, tag apart); per-role trace files allowed; conductor's first trace lines |
| v0.1.1617 | 11-11 22:18 | served | *incident.media@* a second reader of headlines by open-weight models (incident.models@'s patch) |
| v0.1.1616 | 11-11 22:18 | served | *incident.conductor@* sent to Angelo's conductor (fringe inbox) at Dinis's word: runner, altitudes, router, trace, flights, AWS |
| v0.1.1615 | 11-11 22:17 | served | *incident.models@* status and handover for the router session |
| v0.1.1614 | 11-11 22:17 | not confirmed | *incident.conductor@* BRIEF: Dinis ~22:20 (an AWS agent; tell Angelo's conductor); incident.aws@ in JOBS.md and the policy |
| v0.1.1613 | 11-11 22:16 | not confirmed | *incident.observability@* HANDOVER: section for the tenth session; tools/trace-check.mjs (the fringe's privacy check on every trace doc) |
| v0.1.1612 | 11-11 22:16 | not confirmed | *incident.flights@* status: steps 1-5 live; asks to transport, models and Dinis |
| v0.1.1611 | 11-11 22:16 | not confirmed | *incident.models@* patches for media (match-fact) and researcher (extract-decision); trace and span ids as flow.mjs computes them; calls published from the ledger |
| v0.1.1610 | 11-11 22:16 | not confirmed | *incident.conductor@* the infographic's model call, text-free record (models-calls.mjs) |
| v0.1.1609 | 11-11 22:16 | not confirmed | *incident.designer@* round 66: the flights map built (aircraft, wind, time slider, crosswind, movements); waits for data |
