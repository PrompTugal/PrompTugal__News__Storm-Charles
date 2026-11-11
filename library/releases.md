# The release history: every version, what changed, and whether it was served

> Kept by incident.librarian@web-summit.dinis, 2026-11-11, 07:18 UTC. Built by [tools/library-releases.mjs](../tools/library-releases.mjs) from the tags, the commit subjects and the deploy workflow's runs as incident.ci@ keeps them ([the pipeline](../ci/README.md)), read at that time; the data is [releases.json](releases.json). Back to [the library](README.md).

CI numbers every push (`v0.1.<run>`), deploys it and tags it; nobody who pushes writes a number ([BRIEF-CORRECTIONS.md](../BRIEF-CORRECTIONS.md)). Until about 23:55 UTC on 10 November the newest push cancelled a run in progress; since then a running deploy finishes and only a run still waiting is replaced (the workflow's own comment), so a later "cancelled" should mean it never started. **661 runs: 441 served (confirmed by CI), 18 deployed and tagged but cancelled before CI confirmed, 195 cancelled before the tag, 6 failed, 1 still running or unknown when read.**

## Versions never confirmed served

201 of 661. The newest: v0.1.635, v0.1.634, v0.1.621, v0.1.605, v0.1.597, v0.1.596, v0.1.588, v0.1.586, v0.1.585, v0.1.584, v0.1.582, v0.1.578, v0.1.577, v0.1.576, v0.1.575, v0.1.572, v0.1.566, v0.1.561, v0.1.558, v0.1.556, v0.1.555, v0.1.554, v0.1.552, v0.1.541, v0.1.495, v0.1.494, v0.1.491, v0.1.490, v0.1.488, v0.1.487. Each hour's file lists every version with its state.

**This is not a list of versions that were never deployed**, and none can be made from the runs alone: a cancelled deploy step can still go live. Run 32: served: /version.json answered v0.1.32 with commit 487818fc40 when read at 23:49 UTC, although the run's deploy step is recorded as cancelled (job 130213112738) and no tag was pushed (incident.librarian@). Each of these versions' commits is contained in the next served version, so no change was lost; what is not known is whether a reader was ever served that exact number.

## The newest sixty versions

What changed is each commit's own subject, as its agent wrote it. Every version, hour by hour, as data: [11-11 07h](../view/index.html?path=library/releases/2026-11-11T07.json) (22) · [mmit-foundh](../view/index.html?path=library/releases/no-commit-found.json) (1) · [11-11 06h](../view/index.html?path=library/releases/2026-11-11T06.json) (37) · [11-11 05h](../view/index.html?path=library/releases/2026-11-11T05.json) (75) · [11-11 04h](../view/index.html?path=library/releases/2026-11-11T04.json) (64) · [11-11 03h](../view/index.html?path=library/releases/2026-11-11T03.json) (116) · [11-11 02h](../view/index.html?path=library/releases/2026-11-11T02.json) (171) · [11-11 01h](../view/index.html?path=library/releases/2026-11-11T01.json) (34) · [11-11 00h](../view/index.html?path=library/releases/2026-11-11T00.json) (65) · [11-10 23h](../view/index.html?path=library/releases/2026-11-10T23.json) (64) · [11-10 22h](../view/index.html?path=library/releases/2026-11-10T22.json) (2) · [11-10 21h](../view/index.html?path=library/releases/2026-11-10T21.json) (10).

| Version | Pushed (UTC) | State | What changed |
|---|---|---|---|
| v0.1.661 | 11-11 07:41 | tagged | *incident.accountant@* the accounts, round 8: the average call is flat at about 200,000 tokens since 05:00; labs handed over (nineteen); four hand-overs wait on the vault keys; brief 8 |
| v0.1.660 | 11-11 07:41 | tagged | *incident.media@* a twelfth keyed fact: IPMA lowers Lisbon's wind warning from red to orange (CAP 07:16:30 on 11 November); no press report we could read by 07:42; 268 items · *incident.weather@* IPMA's two channels: the newest message by its sent time is shown and what the open-data feed still lists is said plainly (band note and hour strip); no level of our own |
| v0.1.659 |  | unknown | no commit found for this run |
| v0.1.658 | 11-11 07:40 | tagged | *incident.weatherwatch@* correction: the 07:39 re-read said 'unchanged' from IPMA's open data alone; IPMA's CAP message of 07:16 had lowered Lisbon's wind to orange (entry, page and hand-over corrected) |
| v0.1.657 | 11-11 07:39 | tagged | *incident.weatherwatch@* the 07:39 re-read: authorities unchanged; Observador's new live blog; 66 occurrences on the mainland at 07:00, 137 in Madeira (titles) · *incident.weatherwatch@* tokens measured |
| v0.1.656 | 11-11 07:39 | tagged | *incident.conductor@* bridge sync: the meteorologist's files for IPMA's wind downgrade (cap.json, warnings.json with cap_leads_open_data, analysis section 10) |
| v0.1.655 | 11-11 07:39 | tagged | *incident.media@* 07:37 wake: sweep (267 items, 17 outlets, 20 new); today's live pages of RTP and Observador read; RTP's entries read from their own blocks (correction: RTP third on facts 2 and 10, at 09:18); fact 6 still unreported |
| v0.1.654 | 11-11 07:38 | tagged | *incident.conductor@* row s-1111T0738: IPMA lowered Lisbon's wind warning to orange (09:00 to 21:00, gusts to 120 km/h), sent 07:16:30; red rain unchanged; its open data still shows red |
| v0.1.653 | 11-11 07:38 | tagged | *incident.entities@* hourly wake 07:38: 8 new nodes from the decision graph (7 decisions, service/tcb-barreiro named with TCB): 203 nodes, 411 edges; builder 193 ms, linker 411 ms; tokens measured |
| v0.1.652 | 11-11 07:37 | tagged | *incident.conductor@* bridge sync; row s-1111T0735 (cars partly submerged at Parque das Nações by Oriente, per CNN Portugal's live blog; Funchal's centre closed; evidence) |
| v0.1.651 | 11-11 07:34 | tagged | *incident.board@* 07:33 round: sync (3 done, 8 new jobs, 1 new ask), no question moved, nothing new for Dinis |
| v0.1.650 | 11-11 07:29 | tagged | *incident.archivist@* 07:27 round: no primary changed in substance (IPMA's time axis moved on; read and marked same content); ANEPC's notice answered 502 again |
| v0.1.649 | 11-11 07:28 | tagged | *incident.sources@* the MeteoAlarm browser shows how each warning changed, area by area (the order sent, what each replaced); feed read 07:27, unchanged |
| v0.1.648 | 11-11 07:28 | tagged | *incident.conductor@* bridge sync of the 07:27 read; row s-1111T0727 (Areeiro 249.5 mm in six hours; Lisbon 1002 hPa, wind not yet risen) |
| v0.1.647 | 11-11 07:26 | tagged | *incident.identity@* tokens measured (07:20 wake: 52 keys, 0 problems, signatures hold) |
| v0.1.646 | 11-11 07:18 | tagged | *incident.ci@* 07:18 wake: 645 runs, no new failure or retry; gate on the runner median 5 s, max 8 s; push to served median 37 s |
| v0.1.645 | 11-11 07:16 | served | *incident.observability@* the hour's snapshots of commits and sessions; tokens measured |
| v0.1.644 | 11-11 07:15 | served | *incident.journalist@* tokens measured |
| v0.1.643 | 11-11 07:15 | served | *incident.journalist@* 07:14 round: the tenth piece corrected from the conductor's own record of the hold (how it was passed, the poll's stop); three supports moved from hourly sentences to commits; dated lines for the accountant's round 7 and the first limit of a hand-over; the status file |
| v0.1.642 | 11-11 07:08 | served | *incident.reporter@* the 07:06 wake: the hold's trace corrected from the conductor's own record (how it was passed, the poll's stop); the memory trace to round 7 and why IPMA's second session stood down; the outage trace to a fifth empty hour; the log's hour; the numbers · *incident.reporter@* tokens measured |
| v0.1.641 | 11-11 07:07 | served | *incident.shadow@* the 07:00 hour is a fifth recorded gap (the engines' account still out of credit) |
| v0.1.640 | 11-11 07:04 | served | *incident.conductor@* timeline row s-1111T0654 from social.watch's sweep 7: floods in Greater Lisbon, one ferry line suspended, nine districts red from 09:00 (press, evidence) |
| v0.1.639 | 11-11 07:03 | served | *incident.conductor@* 07:03 wake: bridge sync; IPMA Lisbon unchanged |
| v0.1.638 | 11-11 06:55 | served | *incident.wikipedia@* 06:50 read: nothing changed on Wikipedia; Wikidata did not answer, its last answer kept |
| v0.1.637 | 11-11 06:54 | served | *incident.stories@* Madeira m15 corrected again to the row: an IPMA meteorologist, as reported by Lusa, says gusts above 130 km/h were measured in the highlands; evidence, not read at IPMA |
| v0.1.636 | 11-11 06:54 | served | *incident.graph@* the graph rebuilt on the 06:52 data (480 nodes, 658 edges); a hand-over for the next session in the status file |
| v0.1.635 | 11-11 06:54 | not confirmed | *incident.conductor@* row s-1111T0642: the second correction's time as the clock had it (06:53, not 06:55) |
| v0.1.634 | 11-11 06:53 | not confirmed | *incident.conductor@* row s-1111T0642: Lusa has an IPMA meteorologist saying gusts above 130 km/h were measured in Madeira's highlands (evidence; not read at IPMA) |
| v0.1.633 | 11-11 06:53 | served | *incident.stories@* Madeira m15 corrected to the row's wording: the headline's 130 km/h matches IPMA's warning figure; whether IPMA gave the press a measured gust is not known |
| v0.1.632 | 11-11 06:52 | served | *incident.conductor@* row s-1111T0642 corrected: the 130 km/h matches IPMA's warning text and is not in its open data; whether it was measured is not known to us |
| v0.1.631 | 11-11 06:52 | served | *incident.stories@* on the 06:25 read: Madeira retold (red warnings ended 06:00 as scheduled; Areeiro to 05:00; a headline's 130 km/h is the warning's figure), Lisbon c16 (Open-Meteo moved); ledger line |
| v0.1.630 | 11-11 06:52 | served | *incident.social@* 06:47 re-read: 3 new kept posts (Lusa x2, Público); one offer (insurance regulator's recommendation, via Lusa), one tie to s-1111T0642; the organisers still silent |
| v0.1.629 | 11-11 06:51 | served | *incident.labs@* tokens measured |
| v0.1.628 | 11-11 06:50 | served | *incident.labs@* a table twin under every chart; models and stations corrected against Wednesday morning's data (observed rain was missing, the rain peak flattened, the red hours ahead hidden); status and HANDOVER current |
| v0.1.627 | 11-11 06:49 | served | *incident.ipma@* read 06:45 UTC: 64 requests, 63 answered 200, 46 files changed; warnings (IPMA's file dated 06:15): 58 above green; AVR Agitação Marítima yellow 11-10T21:24>11-11T06:00 ended; BRG Agitação Marítima yellow 11-10T21:24>11-11T0 |
| v0.1.626 | 11-11 06:46 | served | *incident.labs@* a twelfth experiment, decisions by state of service (closed, suspended, limited, running, not announced) with a table twin; tools/labs-check.mjs, the browser check as a tool |
| v0.1.625 | 11-11 06:45 | served | *incident.librarian@* tokens measured |
| v0.1.624 | 11-11 06:45 | served | *incident.librarian@* the 06:44 wake: 05:00 to 06:00 closed (82 commits by 24 agents, 75 versions); 06:00 to 07:00 opened; the round article to 06:44 (section 5e); the release history and the commit record refreshed; start.md's fresh-session line read from the key list |
| v0.1.623 | 11-11 06:44 | served | *incident.labs@* session key for the second labs session; the first session's entry marked handed over |
| v0.1.622 | 11-11 06:43 | served | *incident.labs@* HANDOVER.md for the fresh session; tokens measured |
| v0.1.621 | 11-11 06:43 | not confirmed | *incident.accountant@* correction to round 7: ipma did not hand over (its second session was stood down), so eighteen agents, not nineteen; four first sessions wait on the vault keys |
| v0.1.620 | 11-11 06:42 | served | *incident.conductor@* timeline row s-1111T0642, the press's 130 km/h in Madeira is IPMA's warned figure, not an observation |
| v0.1.619 | 11-11 06:42 | served | *incident.conductor@* my measured token line to 06:42 |
| v0.1.618 | 11-11 06:41 | served | *incident.accountant@* the accounts, round 7: nineteen agents have handed over (eight this hour, 64% to 73% less per call); the 06:00 hour at 192,263 tokens a call; seven still on their first session; brief 7 |
| v0.1.617 | 11-11 06:40 | served | *incident.weatherwatch@* the 06:39 re-read: IPMA published nothing new (Lisbon's first yellow sea warning ended at 06:00); RTP and ECO opened new live pages for the day · *incident.weatherwatch@* tokens measured |
| v0.1.616 | 11-11 06:38 | served | *incident.media@* 06:36 wake: sweep (247 items, 17 outlets, 16 new); fact 6 still unreported; RTP's live page of 11 November added (not yet timed); the fact window no longer ends at 12:00 today |
| v0.1.615 | 11-11 06:38 | served | *incident.entities@* hourly wake 06:38: five nodes remade after the hour's pushes; builder 205 ms, linker 440 ms at 796 linked pages; tokens measured |
| v0.1.614 | 11-11 06:34 | served | *incident.board@* 06:33 round: sync (7 done, 4 new jobs), incident.dev@'s ask joined into a-websummit-terms, no question moved |
| v0.1.613 | 11-11 06:27 | served | *incident.conductor@* timeline row s-1111T0625, Madeira's red warnings ended at 06:00 as scheduled (IPMA's page and open data) |
| v0.1.612 | 11-11 06:27 | served | *incident.sources@* ANEPC: its reuse terms read and quoted, what it publishes address by address; feed read 06:25, unchanged |
| v0.1.611 | 11-11 06:26 | served | *incident.archivist@* 06:24 round: IPMA's warnings timeline changed (a Lisbon sea-state warning no longer listed; three Madeira regions read orange where they read red); the other primaries unchanged |
| v0.1.610 | 11-11 06:26 | served | *incident.conductor@* bridge sync of the meteorologist's 06:25 read (no change at IPMA; Lisbon pressure 1003 hPa and falling) |
| v0.1.609 | 11-11 06:24 | served | *incident.identity@* tokens measured (06:20 wake: 51 keys, 0 problems, signatures hold) |
| v0.1.608 | 11-11 06:23 | served | *incident.ci@* 06:22 wake: 607 runs, no new failure or retry; gate on the runner median 5 s (one run at 12 s); push to served median 40 s |
| v0.1.607 | 11-11 06:21 | served | *incident.conductor@* the record of my two interim holds (websummit.com, IPMA's session) and two corrections to my own record |
| v0.1.606 | 11-11 06:21 | served | *incident.journalist@* tokens measured |
| v0.1.605 | 11-11 06:21 | not confirmed | *incident.journalist@* 06:20 round: a tenth piece, "The first decision to stop" (from the reporter's trace of the hold on Web Summit's site); five supports re-anchored after the accountant's round 6 and the reporter's 06:06 log, each dated on its page; the status file |
| v0.1.604 | 11-11 06:20 | served | *incident.observability@* the hour's snapshots of commits and sessions; tokens measured |
| v0.1.603 | 11-11 06:09 | served | *incident.reporter@* the 06:06 wake: a new trace (a decision without Dinis: Web Summit's terms read and every automated read of its site stopped in under two minutes); the outage trace to a fourth empty hour; the memory trace to fourteen more sessions in one hour; the log's hour; the numbers · *incident.reporter@* tokens measured |
| v0.1.602 | 11-11 06:06 | served | *incident.shadow@* the 06:00 hour is a fourth recorded gap (the engines' account still out of credit) |
