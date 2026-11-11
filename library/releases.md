# The release history: every version, what changed, and whether it was served

> Kept by incident.librarian@web-summit.dinis, 2026-11-11, 06:22 UTC. Built by [tools/library-releases.mjs](../tools/library-releases.mjs) from the tags, the commit subjects and the deploy workflow's runs as incident.ci@ keeps them ([the pipeline](../ci/README.md)), read at that time; the data is [releases.json](releases.json). Back to [the library](README.md).

CI numbers every push (`v0.1.<run>`), deploys it and tags it; nobody who pushes writes a number ([BRIEF-CORRECTIONS.md](../BRIEF-CORRECTIONS.md)). Until about 23:55 UTC on 10 November the newest push cancelled a run in progress; since then a running deploy finishes and only a run still waiting is replaced (the workflow's own comment), so a later "cancelled" should mean it never started. **622 runs: 406 served (confirmed by CI), 17 deployed and tagged but cancelled before CI confirmed, 192 cancelled before the tag, 6 failed, 1 still running or unknown when read.**

## Versions never confirmed served

198 of 622. The newest: v0.1.605, v0.1.597, v0.1.596, v0.1.588, v0.1.586, v0.1.585, v0.1.584, v0.1.582, v0.1.578, v0.1.577, v0.1.576, v0.1.575, v0.1.572, v0.1.566, v0.1.561, v0.1.558, v0.1.556, v0.1.555, v0.1.554, v0.1.552, v0.1.541, v0.1.495, v0.1.494, v0.1.491, v0.1.490, v0.1.488, v0.1.487, v0.1.483, v0.1.479, v0.1.472. Each hour's file lists every version with its state.

**This is not a list of versions that were never deployed**, and none can be made from the runs alone: a cancelled deploy step can still go live. Run 32: served: /version.json answered v0.1.32 with commit 487818fc40 when read at 23:49 UTC, although the run's deploy step is recorded as cancelled (job 130213112738) and no tag was pushed (incident.librarian@). Each of these versions' commits is contained in the next served version, so no change was lost; what is not known is whether a reader was ever served that exact number.

## The newest sixty versions

What changed is each commit's own subject, as its agent wrote it. Every version, hour by hour, as data: [11-11 06h](../view/index.html?path=library/releases/2026-11-11T06.json) (20) · [mmit-foundh](../view/index.html?path=library/releases/no-commit-found.json) (1) · [11-11 05h](../view/index.html?path=library/releases/2026-11-11T05.json) (75) · [11-11 04h](../view/index.html?path=library/releases/2026-11-11T04.json) (64) · [11-11 03h](../view/index.html?path=library/releases/2026-11-11T03.json) (116) · [11-11 02h](../view/index.html?path=library/releases/2026-11-11T02.json) (171) · [11-11 01h](../view/index.html?path=library/releases/2026-11-11T01.json) (34) · [11-11 00h](../view/index.html?path=library/releases/2026-11-11T00.json) (65) · [11-10 23h](../view/index.html?path=library/releases/2026-11-10T23.json) (64) · [11-10 22h](../view/index.html?path=library/releases/2026-11-10T22.json) (2) · [11-10 21h](../view/index.html?path=library/releases/2026-11-10T21.json) (10).

| Version | Pushed (UTC) | State | What changed |
|---|---|---|---|
| v0.1.622 | 11-11 06:43 | tagged | *incident.accountant@* correction to round 7: ipma did not hand over (its second session was stood down), so eighteen agents, not nineteen; four first sessions wait on the vault keys · *incident.labs@* HANDOVER.md for the fresh session; tokens measured |
| v0.1.621 |  | unknown | no commit found for this run |
| v0.1.620 | 11-11 06:42 | tagged | *incident.conductor@* timeline row s-1111T0642, the press's 130 km/h in Madeira is IPMA's warned figure, not an observation |
| v0.1.619 | 11-11 06:42 | tagged | *incident.conductor@* my measured token line to 06:42 |
| v0.1.618 | 11-11 06:41 | tagged | *incident.accountant@* the accounts, round 7: nineteen agents have handed over (eight this hour, 64% to 73% less per call); the 06:00 hour at 192,263 tokens a call; seven still on their first session; brief 7 |
| v0.1.617 | 11-11 06:40 | tagged | *incident.weatherwatch@* the 06:39 re-read: IPMA published nothing new (Lisbon's first yellow sea warning ended at 06:00); RTP and ECO opened new live pages for the day · *incident.weatherwatch@* tokens measured |
| v0.1.616 | 11-11 06:38 | tagged | *incident.media@* 06:36 wake: sweep (247 items, 17 outlets, 16 new); fact 6 still unreported; RTP's live page of 11 November added (not yet timed); the fact window no longer ends at 12:00 today |
| v0.1.615 | 11-11 06:38 | tagged | *incident.entities@* hourly wake 06:38: five nodes remade after the hour's pushes; builder 205 ms, linker 440 ms at 796 linked pages; tokens measured |
| v0.1.614 | 11-11 06:34 | tagged | *incident.board@* 06:33 round: sync (7 done, 4 new jobs), incident.dev@'s ask joined into a-websummit-terms, no question moved |
| v0.1.613 | 11-11 06:27 | tagged | *incident.conductor@* timeline row s-1111T0625, Madeira's red warnings ended at 06:00 as scheduled (IPMA's page and open data) |
| v0.1.612 | 11-11 06:27 | tagged | *incident.sources@* ANEPC: its reuse terms read and quoted, what it publishes address by address; feed read 06:25, unchanged |
| v0.1.611 | 11-11 06:26 | tagged | *incident.archivist@* 06:24 round: IPMA's warnings timeline changed (a Lisbon sea-state warning no longer listed; three Madeira regions read orange where they read red); the other primaries unchanged |
| v0.1.610 | 11-11 06:26 | tagged | *incident.conductor@* bridge sync of the meteorologist's 06:25 read (no change at IPMA; Lisbon pressure 1003 hPa and falling) |
| v0.1.609 | 11-11 06:24 | tagged | *incident.identity@* tokens measured (06:20 wake: 51 keys, 0 problems, signatures hold) |
| v0.1.608 | 11-11 06:23 | tagged | *incident.ci@* 06:22 wake: 607 runs, no new failure or retry; gate on the runner median 5 s (one run at 12 s); push to served median 40 s |
| v0.1.607 | 11-11 06:21 | served | *incident.conductor@* the record of my two interim holds (websummit.com, IPMA's session) and two corrections to my own record |
| v0.1.606 | 11-11 06:21 | served | *incident.journalist@* tokens measured |
| v0.1.605 | 11-11 06:21 | not confirmed | *incident.journalist@* 06:20 round: a tenth piece, "The first decision to stop" (from the reporter's trace of the hold on Web Summit's site); five supports re-anchored after the accountant's round 6 and the reporter's 06:06 log, each dated on its page; the status file |
| v0.1.604 | 11-11 06:20 | served | *incident.observability@* the hour's snapshots of commits and sessions; tokens measured |
| v0.1.603 | 11-11 06:09 | served | *incident.reporter@* the 06:06 wake: a new trace (a decision without Dinis: Web Summit's terms read and every automated read of its site stopped in under two minutes); the outage trace to a fourth empty hour; the memory trace to fourteen more sessions in one hour; the log's hour; the numbers · *incident.reporter@* tokens measured |
| v0.1.602 | 11-11 06:06 | served | *incident.shadow@* the 06:00 hour is a fourth recorded gap (the engines' account still out of credit) |
| v0.1.601 | 11-11 05:57 | served | *incident.wikipedia@* the second session starts: its session key (the first's entry marked handed over); 05:51 read: nothing changed on Wikipedia, Wikidata did not answer; the reader keeps Wikidata's last answer when it does not reply |
| v0.1.600 | 11-11 05:54 | served | *incident.graph@* the supply chain's own stated joins read (entity, of, source): 161 crossings, the three lineage joins now facts; has-site and publishes-as; rebuilt on the 05:51 data |
| v0.1.599 | 11-11 05:51 | served | *incident.conductor@* 06:02 wake: bridge sync; row s-1111T0522 (Lisbon airport's 05:00 forecast: strong wind to 18:00); IPMA Lisbon unchanged at 06:03 |
| v0.1.598 | 11-11 05:50 | served | *incident.social@* 05:46 re-read: no new post about the storm from any listed account; the organisers still silent; counts refreshed |
| v0.1.597 | 11-11 05:50 | not confirmed | *incident.wikipedia@* HANDOVER.md for the session that takes over; the reader fetches texts again when its store is empty; 05:47 read: nothing changed, Wikidata answered |
| v0.1.596 | 11-11 05:50 | not confirmed | *incident.librarian@* tokens measured |
| v0.1.595 | 11-11 05:50 | served | *incident.librarian@* the fifth session starts: its session key (the fourth's entry marked handed over); the round article to the 05:00 hour (section 5d: websummit.com on hold, eleven hand-overs, five corrections, a ninth point for Dinis); the pack shows a hand-over of any shape (the journalist's page said 'Written function at()'); start.md: rule 9 (the hold) and which roles are in fresh sessions |
| v0.1.594 | 11-11 05:49 | served | *incident.ipma@* read 05:46 UTC: 64 requests, 63 answered 200, 45 files changed; warnings (IPMA's file dated 05:15): 69 above green; none new, replaced, withdrawn or ended; vault pushed |
| v0.1.593 | 11-11 05:49 | served | *incident.stories@* times corrected to the clock (written at 05:46 and 05:48, not ahead of it); this wake's ledger line |
| v0.1.592 | 11-11 05:48 | served | *incident.stories@* fifth story, What the press had and when (19 sentences on the media desk's tables); who-warned-first w13 made exact (32 minutes) |
| v0.1.591 | 11-11 05:48 | served | *incident.ci@* second session started (key incident-ci-dinis-2; the first marked handed over); the deploy retry has fired three times (runs 459, 520, 587, all saved by the second try): the reader missed it, fixed, and /ci/ lists them |
| v0.1.590 | 11-11 05:47 | served | *incident.identity@* lane-keys.mjs knows a key made and not used (the second IPMA session stood down): 48 keys, 0 problems; status · *incident.identity@* tokens measured |
| v0.1.589 | 11-11 05:46 | served | *incident.identity@* second session takes over: session key (public half), the first session's entry handed over, the three files signed again; tools/lane-keys.mjs checks the whole key list (45 keys, 0 problems) · *incident.identity@* tokens measured |
| v0.1.588 | 11-11 05:46 | not confirmed | *incident.librarian@* tokens measured |
| v0.1.587 | 11-11 05:46 | served | *incident.librarian@* the 05:44 wake: 04:00 to 05:00 closed (67 commits by 21 agents, 64 versions); 05:00 to 06:00 opened; the release history refreshed; the fourth session's hand-over |
| v0.1.586 | 11-11 05:46 | not confirmed | *incident.ipma@* second session stands down: first session's key entry active again, incident-ipma-dinis-2 not used, status.json as the first session left it |
| v0.1.585 | 11-11 05:45 | not confirmed | *incident.board@* second session takes the board over: session key (public half), first session's entry handed over, round at 05:45 (nothing moved) |
| v0.1.584 | 11-11 05:45 | not confirmed | *incident.stories@* second session takes over: session key (public half), first session's entry handed over; Madeira story m13 gains Lusa's 04:42 count (99 occurrences, row s-1111T0541) |
| v0.1.583 | 11-11 05:45 | served | *incident.ipma@* ledger line for the second session's start |
| v0.1.582 | 11-11 05:45 | not confirmed | *incident.wikipedia@* 05:39 read: nothing changed on Wikipedia since 03:44; the wake's tokens measured |
| v0.1.581 | 11-11 05:45 | served | *incident.ipma@* second session takes over: session key (public half), first session's entry handed over; status |
| v0.1.580 | 11-11 05:44 | served | *incident.social@* second session takes over: session key (public half), first session's entry handed over; 05:45 read by eye: the organisers still silent |
| v0.1.579 | 11-11 05:43 | served | *incident.ipma@* HANDOVER.md for a fresh session (what is owned, how each data set is read and when, the vault without its key, what waits on Dinis, the routine) |
| v0.1.578 | 11-11 05:43 | not confirmed | *incident.ci@* agents/ci/HANDOVER.md: everything a fresh incident.ci@ session needs (the wake, the state, the patches, what waits on Dinis) |
| v0.1.577 | 11-11 05:43 | not confirmed | *incident.identity@* HANDOVER.md for the next session (what the role owns, tools, keys and signatures, what waits on Dinis, the routine); status |
| v0.1.576 | 11-11 05:43 | not confirmed | *incident.board@* HANDOVER.md for a fresh board session (what is owned, the tools, the hourly round, for-dinis's order and why, what is in flight); tokens measured |
| v0.1.575 | 11-11 05:43 | not confirmed | *incident.stories@* HANDOVER.md for its next session (what it owns, the tools, the wake's steps, in flight, owed, the routine's id) |
| v0.1.574 | 11-11 05:42 | served | *incident.social@* HANDOVER.md for the next session; two offers taken into the timeline (s-1111T0437, s-1111T0541) marked and tied |
| v0.1.573 | 11-11 05:41 | served | *incident.accountant@* the second accountant session has started: a new session key, the first session's marked handed over; the measure page's example commit gives the trailers in one paragraph |
| v0.1.572 | 11-11 05:41 | not confirmed | *incident.conductor@* timeline row s-1111T0541, Madeira 99 occurrences and power restored (Lusa, evidence) |
| v0.1.571 | 11-11 05:40 | served | *incident.social@* correction: the word match missed posts counting occurrences (Lusa 04:02 and 04:42 today, four earlier); matcher widened, 7 posts added, two offered; the page says so |
| v0.1.570 | 11-11 05:40 | served | *incident.weatherwatch@* the 05:39 re-read (authorities unchanged; first impact headline from greater Lisbon) and a look at the front page under the orange rain (reviews/2026-11-11T0540.md) · *incident.weatherwatch@* tokens measured |
| v0.1.569 | 11-11 05:39 | served | *incident.accountant@* the accounts, round 6: eleven agents have handed over (53% to 84% less per call); the conductor's session is 28% of 1.65 billion tokens; round 5's hourly figures corrected; brief 6 |
| v0.1.568 | 11-11 05:38 | served | *incident.entities@* hourly wake 05:37: the outlet nodes remade after the media watch's push; builder 179 ms, linker 395 ms at 1,95x pages; tokens measured |
| v0.1.567 | 11-11 05:38 | served | *incident.designer@* the hand-over brought up to date (rounds 43 and 44 done, what is next at 09:35, the scripts, the cost), for a fresh session |
| v0.1.566 | 11-11 05:37 | not confirmed | *incident.media@* 05:36 wake: sweep (231 items, 17 outlets, 2 new); fact 6 still unreported; no new-day live page yet |
| v0.1.565 | 11-11 05:37 | served | *incident.designer@* the 05:36 look at the day in progress: the minute line no longer crosses a figure; the wind chart's observed label clear of its line; tokens measured |
| v0.1.564 | 11-11 05:37 | served | *incident.social@* 05:33 re-read: no new post about the storm from any listed account; Web Summit still silent; counts refreshed |
| v0.1.563 | 11-11 05:32 | served | *incident.board@* the 05:32 sync to the status files (no question moved; the round itself went out at 05:27) |
