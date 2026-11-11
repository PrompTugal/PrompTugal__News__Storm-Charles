# The release history: every version, what changed, and whether it was served

> Kept by incident.librarian@web-summit.dinis, 2026-11-11, 05:15 UTC. Built by [tools/library-releases.mjs](../tools/library-releases.mjs) from the tags, the commit subjects and the deploy workflow's runs as incident.ci@ keeps them ([the pipeline](../ci/README.md)), read at that time; the data is [releases.json](releases.json). Back to [the library](README.md).

CI numbers every push (`v0.1.<run>`), deploys it and tags it; nobody who pushes writes a number ([BRIEF-CORRECTIONS.md](../BRIEF-CORRECTIONS.md)). Until about 23:55 UTC on 10 November the newest push cancelled a run in progress; since then a running deploy finishes and only a run still waiting is replaced (the workflow's own comment), so a later "cancelled" should mean it never started. **579 runs: 355 served (confirmed by CI), 34 deployed and tagged but cancelled before CI confirmed, 171 cancelled before the tag, 6 failed, 13 still running or unknown when read.**

## Versions never confirmed served

177 of 579. The newest: v0.1.495, v0.1.494, v0.1.491, v0.1.490, v0.1.488, v0.1.487, v0.1.483, v0.1.479, v0.1.472, v0.1.471, v0.1.468, v0.1.467, v0.1.464, v0.1.441, v0.1.439, v0.1.437, v0.1.433, v0.1.426, v0.1.417, v0.1.411, v0.1.409, v0.1.396, v0.1.394, v0.1.393, v0.1.392, v0.1.390, v0.1.387, v0.1.386, v0.1.383, v0.1.381. Each hour's file lists every version with its state.

**This is not a list of versions that were never deployed**, and none can be made from the runs alone: a cancelled deploy step can still go live. Run 32: served: /version.json answered v0.1.32 with commit 487818fc40 when read at 23:49 UTC, although the run's deploy step is recorded as cancelled (job 130213112738) and no tag was pushed (incident.librarian@). Each of these versions' commits is contained in the next served version, so no change was lost; what is not known is whether a reader was ever served that exact number.

## The newest sixty versions

What changed is each commit's own subject, as its agent wrote it. Every version, hour by hour, as data: [11-11 05h](../view/index.html?path=library/releases/2026-11-11T05.json) (40) · [mmit-foundh](../view/index.html?path=library/releases/no-commit-found.json) (13) · [11-11 04h](../view/index.html?path=library/releases/2026-11-11T04.json) (64) · [11-11 03h](../view/index.html?path=library/releases/2026-11-11T03.json) (116) · [11-11 02h](../view/index.html?path=library/releases/2026-11-11T02.json) (171) · [11-11 01h](../view/index.html?path=library/releases/2026-11-11T01.json) (34) · [11-11 00h](../view/index.html?path=library/releases/2026-11-11T00.json) (65) · [11-10 23h](../view/index.html?path=library/releases/2026-11-10T23.json) (64) · [11-10 22h](../view/index.html?path=library/releases/2026-11-10T22.json) (2) · [11-10 21h](../view/index.html?path=library/releases/2026-11-10T21.json) (10).

| Version | Pushed (UTC) | State | What changed |
|---|---|---|---|
| v0.1.579 | 11-11 05:43 | tagged | *incident.stories@* HANDOVER.md for its next session (what it owns, the tools, the wake's steps, in flight, owed, the routine's id) · *incident.board@* HANDOVER.md for a fresh board session (what is owned, the tools, the hourly round, for-dinis's order and why, what is in flight); tokens measured · *incident.identity@* HANDOVER.md for the next session (what the role owns, tools, keys and signatures, what waits on Dinis, the routine); status · *incident.ci@* agents/ci/HANDOVER.md: everything a fresh incident.ci@ session needs (the wake, the state, the patches, what waits on Dinis) · *incident.ipma@* HANDOVER.md for a fresh session (what is owned, how each data set is read and when, the vault without its key, what waits on Dinis, the routine) |
| v0.1.578 |  | unknown | no commit found for this run |
| v0.1.577 |  | unknown | no commit found for this run |
| v0.1.576 |  | unknown | no commit found for this run |
| v0.1.575 |  | unknown | no commit found for this run |
| v0.1.574 | 11-11 05:42 | tagged | *incident.social@* HANDOVER.md for the next session; two offers taken into the timeline (s-1111T0437, s-1111T0541) marked and tied |
| v0.1.573 | 11-11 05:41 | tagged | *incident.conductor@* timeline row s-1111T0541, Madeira 99 occurrences and power restored (Lusa, evidence) · *incident.accountant@* the second accountant session has started: a new session key, the first session's marked handed over; the measure page's example commit gives the trailers in one paragraph |
| v0.1.572 |  | unknown | no commit found for this run |
| v0.1.571 | 11-11 05:40 | tagged | *incident.social@* correction: the word match missed posts counting occurrences (Lusa 04:02 and 04:42 today, four earlier); matcher widened, 7 posts added, two offered; the page says so |
| v0.1.570 | 11-11 05:40 | tagged | *incident.weatherwatch@* the 05:39 re-read (authorities unchanged; first impact headline from greater Lisbon) and a look at the front page under the orange rain (reviews/2026-11-11T0540.md) · *incident.weatherwatch@* tokens measured |
| v0.1.569 | 11-11 05:39 | tagged | *incident.accountant@* the accounts, round 6: eleven agents have handed over (53% to 84% less per call); the conductor's session is 28% of 1.65 billion tokens; round 5's hourly figures corrected; brief 6 |
| v0.1.568 | 11-11 05:38 | tagged | *incident.entities@* hourly wake 05:37: the outlet nodes remade after the media watch's push; builder 179 ms, linker 395 ms at 1,95x pages; tokens measured |
| v0.1.567 | 11-11 05:38 | tagged | *incident.media@* 05:36 wake: sweep (231 items, 17 outlets, 2 new); fact 6 still unreported; no new-day live page yet · *incident.designer@* the hand-over brought up to date (rounds 43 and 44 done, what is next at 09:35, the scripts, the cost), for a fresh session |
| v0.1.566 |  | unknown | no commit found for this run |
| v0.1.565 | 11-11 05:37 | tagged | *incident.designer@* the 05:36 look at the day in progress: the minute line no longer crosses a figure; the wind chart's observed label clear of its line; tokens measured |
| v0.1.564 | 11-11 05:37 | tagged | *incident.social@* 05:33 re-read: no new post about the storm from any listed account; Web Summit still silent; counts refreshed |
| v0.1.563 | 11-11 05:32 | tagged | *incident.board@* the 05:32 sync to the status files (no question moved; the round itself went out at 05:27) |
| v0.1.562 | 11-11 05:29 | tagged | *incident.board@* a-websummit-terms: what keeping the hold means for the screenshots already in the display vault; the clauses checked in sources/registry.json · *incident.entities@* LPPT, LPMA and SRPC are names of the nodes that had them; the Capitania placed in the seed; nodes remade; HANDOVER.md and status current; tokens measured |
| v0.1.561 |  | unknown | no commit found for this run |
| v0.1.560 | 11-11 05:29 | tagged | *incident.sources@* Web Summit's record of automated reads completed with incident.dev@'s counts (244 poll reads, about 640 to 660 requests in all, estimated) and what content the repository holds |
| v0.1.559 | 11-11 05:28 | tagged | *incident.archivist@* status: the Web Summit hold covers 9 addresses (I had written 17) · *incident.stories@* the 05:27 re-check on the 04:23 read: nothing moved at IPMA; Open-Meteo moved and Madeira's stations gained an hour (Areeiro 232.1 mm in six hourly values): both retold and dated · *incident.stories@* on the 05:22 read: the 05:00 airport forecast keeps the 45-knot gusts, now to 18:00 ("Less wind for Lisbon?" retold, dated); IPMA's warnings unchanged |
| v0.1.558 |  | unknown | no commit found for this run |
| v0.1.557 | 11-11 05:28 | tagged | *incident.sources@* Web Summit on hold (its terms forbid automated reading; decision with Dinis); its page lists what this site read automatically and when · *incident.board@* Web Summit's terms and the hold on automated reads as a card for Dinis (second on his list); the five questions only Web Summit can answer move from watching to open; tokens measured · *incident.entities@* the linker writes each page in place (no truncate first): about 650 ms to about 400 ms in the build at 1,932 pages, output byte for byte the same; mentions.json now says where its time goes by family of pages · *incident.archivist@* Web Summit hold: no further read of websummit.com; its captures kept privately and not shown (address, title, time and hashes stay) |
| v0.1.556 |  | unknown | no commit found for this run |
| v0.1.555 |  | unknown | no commit found for this run |
| v0.1.554 |  | unknown | no commit found for this run |
| v0.1.553 | 11-11 05:27 | tagged | *incident.conductor@* bridge sync of the meteorologist's 05:22 read (new airport forecast, stations, warnings) · *incident.perplexity@* the conductor's interim hold on websummit.com: the checker no longer requests it; capture asks for its pages withdrawn; the page says so · *incident.perplexity@* tokens measured |
| v0.1.552 |  | unknown | no commit found for this run |
| v0.1.551 | 11-11 05:27 | tagged | *incident.weather@* the 05:25 check: a past hour with no measurement read yet says so (it showed the automatic forecast); the rain tile names its hour |
| v0.1.550 | 11-11 05:26 | tagged | *incident.media@* second session starts (session key incident-media-dinis-2, the first marked handed over); sweep: 229 items, 17 outlets, 2 new; fact 6 still unreported; live.mjs keeps a blog's earlier record when a fresh cache can time no entry |
| v0.1.549 | 11-11 05:26 | tagged | *incident.sources@* Web Summit's terms read and quoted: automated access, archiving and summarising of its websites are forbidden (a decision for Dinis); feed read 05:25, unchanged |
| v0.1.548 | 11-11 05:25 | tagged | *incident.archivist@* 05:23 round: the seven primary pages unchanged since the first captures |
| v0.1.547 | 11-11 05:24 | tagged | *incident.entities@* IPMA's nodes joined, not copied (card a-ipma-7): district names and codes, forecast and coastal places, qualified station names, warning types and levels link to their place on IPMA's pages; 635 more mentions linked, the linker's time unchanged |
| v0.1.546 | 11-11 05:23 | tagged | *incident.meteorology@* tokens measured (second session, first round) |
| v0.1.545 | 11-11 05:23 | tagged | *incident.meteorology@* second session: new session key (the first handed over); re-read of every edge and licence (0 changed state); nodes carry stated joins (entity, of, source) for the graph; two sharper names for the linker; status and handover |
| v0.1.544 | 11-11 05:21 | tagged | *incident.identity@* 05:21 wake: status (checks green, waiting on Dinis); tokens measured |
| v0.1.543 | 11-11 05:20 | tagged | *incident.entities@* second session started: its session key's public half in data/keys.json, the first session's entry handed over; status |
| v0.1.542 | 11-11 05:19 | tagged | *incident.meteorology@* agents/meteorology/HANDOVER.md (what it owns, the reader and builder and how to run them, in flight, what waits on Dinis); status; tokens measured · *incident.media@* agents/media/HANDOVER.md for a fresh session (what I own, the tools, the wake's steps, the rules, what is in flight, what waits on Dinis) |
| v0.1.541 |  | unknown | no commit found for this run |
| v0.1.540 | 11-11 05:19 | tagged | *incident.entities@* agents/entities/HANDOVER.md (what I own, how to run, check and time the builder and the linker, what is in flight, what is owed); nodes current |
| v0.1.539 | 11-11 05:18 | tagged | *incident.journalist@* tokens measured |
| v0.1.538 | 11-11 05:17 | tagged | *incident.journalist@* the third session starts: its session key (the second session's entry marked handed over); a ninth piece, "An explanation that is data" (from the reporter's trace of the Studio); the sixth piece carries the accountant's eight hand-overs; the status file |
| v0.1.537 | 11-11 05:16 | tagged | *incident.observability@* the hour's snapshots of commits and sessions; tokens measured · *incident.observability@* the snapshot files sized as written so they stay under the gate's limit (commits.json had passed it and the gate refused the push); the index carries a short done list |
| v0.1.536 | 11-11 05:16 | tagged | *incident.ci@* the 05:15 wake: 535 runs and 584 commits; no new failure, no deploy retry fired; tokens measured |
| v0.1.535 | 11-11 05:14 | served | *incident.journalist@* tokens measured |
| v0.1.534 | 11-11 05:14 | served | *incident.journalist@* 05:12 round: an eighth piece, "An agent's first twelve minutes" (from the reporter's trace of a start); the seventh piece re-anchored where the board's card and the reporter's log were reworded, with the reporter's correction of its outage trace recorded; What it cost carries the books at 04:35; a hand-over written into the status |
| v0.1.533 | 11-11 05:11 | served | *incident.librarian@* start.md: the gate's budget is 8 s and a warning (it said 5 s), at the conductor's word |
| v0.1.532 | 11-11 05:11 | served | *incident.reporter@* the third session starts: its session key added, the second session's entry marked handed over, the status file · *incident.reporter@* tokens measured |
| v0.1.531 | 11-11 05:09 | served | *incident.reporter@* the hand-over note brought up to date by the second session (225,862 tokens a call at 05:08: a fresh session at the next wake is sensible) |
| v0.1.530 | 11-11 05:08 | served | *incident.reporter@* tokens measured |
| v0.1.529 | 11-11 05:08 | served | *incident.reporter@* the 05:06 wake: the outage trace corrected in the open (five calls refused for credit before 02:39:15 went unrecognised; found by incident.journalist@) and brought to a third empty hour; the memory trace to ten hand-overs; the log's 04:00 hour; the numbers |
| v0.1.528 | 11-11 05:06 | served | *incident.shadow@* the 05:00 hour is a third recorded gap (the engines' account still out of credit) |
| v0.1.527 | 11-11 05:03 | served | *incident.conductor@* 05:02 wake: bridge sync (weather data, decision entities, status); IPMA Lisbon unchanged at 05:03 |
| v0.1.526 | 11-11 04:57 | served | *incident.graph@* the graph rebuilt on the 04:37 data (475 nodes, 647 edges) |
| v0.1.525 | 11-11 04:49 | served | *incident.ipma@* 04:46 read: 46 files changed; warnings rewritten at 04:15 with the same content (69 above green); a served file can be about twenty minutes old |
| v0.1.524 | 11-11 04:49 | served | *incident.archivist@* an unchanged re-read keeps only its hashes, summary and text in the private vault (no second copy of the HTML and pictures) |
| v0.1.523 | 11-11 04:48 | served | *incident.archivist@* the research round is done: 542 addresses, 557 captures; status and vault numbers |
| v0.1.522 | 11-11 04:48 | served | *incident.wikipedia@* 04:39 read: nothing changed on Wikipedia since 03:44; eight 429s waited out; the wake's tokens measured |
| v0.1.521 | 11-11 04:47 | served | *incident.archivist@* research captures recorded after the container restart (press pages kept privately) |
| v0.1.520 | 11-11 04:45 | served | *incident.librarian@* tokens measured |
