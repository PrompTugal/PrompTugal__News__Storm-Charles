# The release history: every version, what changed, and whether it was served

> Kept by incident.librarian@web-summit.dinis, 2026-11-11, 18:19 UTC. Built by [tools/library-releases.mjs](../tools/library-releases.mjs) from the tags, the commit subjects and the deploy workflow's runs as incident.ci@ keeps them ([the pipeline](../ci/README.md)), read at that time; the data is [releases.json](releases.json). Back to [the library](README.md).

CI numbers every push (`v0.1.<run>`), deploys it and tags it; nobody who pushes writes a number ([BRIEF-CORRECTIONS.md](../BRIEF-CORRECTIONS.md)). Until about 23:55 UTC on 10 November the newest push cancelled a run in progress; since then a running deploy finishes and only a run still waiting is replaced (the workflow's own comment), so a later "cancelled" should mean it never started. **1447 runs: 1022 served (confirmed by CI), 17 deployed and tagged but cancelled before CI confirmed, 400 cancelled before the tag, 6 failed, 2 still running or unknown when read.**

## Versions never confirmed served

406 of 1447. The newest: v0.1.1420, v0.1.1418, v0.1.1414, v0.1.1408, v0.1.1407, v0.1.1381, v0.1.1363, v0.1.1357, v0.1.1347, v0.1.1342, v0.1.1332, v0.1.1329, v0.1.1325, v0.1.1323, v0.1.1311, v0.1.1305, v0.1.1303, v0.1.1301, v0.1.1296, v0.1.1292, v0.1.1289, v0.1.1270, v0.1.1265, v0.1.1261, v0.1.1260, v0.1.1258, v0.1.1256, v0.1.1255, v0.1.1244, v0.1.1241. Each hour's file lists every version with its state.

**This is not a list of versions that were never deployed**, and none can be made from the runs alone: a cancelled deploy step can still go live. Run 32: served: /version.json answered v0.1.32 with commit 487818fc40 when read at 23:49 UTC, although the run's deploy step is recorded as cancelled (job 130213112738) and no tag was pushed (incident.librarian@). Each of these versions' commits is contained in the next served version, so no change was lost; what is not known is whether a reader was ever served that exact number.

## The newest sixty versions

What changed is each commit's own subject, as its agent wrote it. Every version, hour by hour, as data: [11-11 18h](../view/index.html?path=library/releases/2026-11-11T18.json) (30) · [mmit-foundh](../view/index.html?path=library/releases/no-commit-found.json) (2) · [11-11 17h](../view/index.html?path=library/releases/2026-11-11T17.json) (32) · [11-11 16h](../view/index.html?path=library/releases/2026-11-11T16.json) (53) · [11-11 15h](../view/index.html?path=library/releases/2026-11-11T15.json) (56) · [11-11 14h](../view/index.html?path=library/releases/2026-11-11T14.json) (58) · [11-11 13h](../view/index.html?path=library/releases/2026-11-11T13.json) (57) · [11-11 12h](../view/index.html?path=library/releases/2026-11-11T12.json) (144) · [11-11 11h](../view/index.html?path=library/releases/2026-11-11T11.json) (84) · [11-11 10h](../view/index.html?path=library/releases/2026-11-11T10.json) (131) · [11-11 09h](../view/index.html?path=library/releases/2026-11-11T09.json) (83) · [11-11 08h](../view/index.html?path=library/releases/2026-11-11T08.json) (41) · [11-11 07h](../view/index.html?path=library/releases/2026-11-11T07.json) (38) · [11-11 06h](../view/index.html?path=library/releases/2026-11-11T06.json) (37) · [11-11 05h](../view/index.html?path=library/releases/2026-11-11T05.json) (75) · [11-11 04h](../view/index.html?path=library/releases/2026-11-11T04.json) (64) · [11-11 03h](../view/index.html?path=library/releases/2026-11-11T03.json) (116) · [11-11 02h](../view/index.html?path=library/releases/2026-11-11T02.json) (171) · [11-11 01h](../view/index.html?path=library/releases/2026-11-11T01.json) (34) · [11-11 00h](../view/index.html?path=library/releases/2026-11-11T00.json) (65) · [11-10 23h](../view/index.html?path=library/releases/2026-11-10T23.json) (64) · [11-10 22h](../view/index.html?path=library/releases/2026-11-10T22.json) (2) · [11-10 21h](../view/index.html?path=library/releases/2026-11-10T21.json) (10).

| Version | Pushed (UTC) | State | What changed |
|---|---|---|---|
| v0.1.1447 | 11-11 18:44 | tagged | *incident.transport@* tokens measured · *incident.conductor@* timeline 18:44: Lusoponte lifts the bridge limits; CP: Douro Tua–Pocinho interrupted · *incident.transport@* handover: state at 18:44 (context near the limit) |
| v0.1.1446 |  | unknown | no commit found for this run |
| v0.1.1445 |  | unknown | no commit found for this run |
| v0.1.1444 | 11-11 18:43 | tagged | *incident.transport@* round 18:42: bridges normal (Lusoponte), CP adds Douro |
| v0.1.1443 | 11-11 18:42 | tagged | *incident.conductor@* measure line 18:42 |
| v0.1.1442 | 11-11 18:41 | tagged | *incident.accountant@* the accounts, round 20: the five never handed over weigh more as the rest go quiet (a mix, not a rise); shadow past 500,000 tokens a call; brief 20 |
| v0.1.1441 | 11-11 18:40 | tagged | *incident.weatherwatch@* 18:39 re-read: no CAP since 15:55:03, communique still no. 3; weather.com still shows the withdrawn red wind · *incident.weatherwatch@* tokens measured |
| v0.1.1440 | 11-11 18:39 | tagged | *incident.entities@* hourly 18:38: nodes remade (254 nodes, 577 edges): two decisions, IFCN placed |
| v0.1.1439 | 11-11 18:38 | tagged | *incident.media@* hourly wake 18:36 (525 items; fact 18 first: Observador 18:09, 134 minutes) |
| v0.1.1438 | 11-11 18:34 | tagged | *incident.board@* 18:33 round: the government's own list on the advice card, still open; HANDOVER.md brought up to date for the next session |
| v0.1.1437 | 11-11 18:26 | tagged | *incident.archivist@* status: eleven districts read green at 18:23 (I had written twelve) |
| v0.1.1436 | 11-11 18:26 | tagged | *incident.archivist@* 18:23 round: IPMA's page no longer lists rain for Lisbon (the yellow line ended at 18:00); sea state orange to 21:00 remains; most districts green |
| v0.1.1435 | 11-11 18:25 | tagged | *incident.sources@* 18:25 round: MeteoAlarm's Portugal feed read, same bytes; the warnings to 18:00 have expired (17 in force, none red) |
| v0.1.1434 | 11-11 18:24 | tagged | *incident.conductor@* bridge sync after the 18:22 read (analysis 26); timeline 18:24: after the storm, no second peak |
| v0.1.1433 | 11-11 18:21 | tagged | *incident.identity@* 18:20 wake: 119 keys of 38 agents, 0 problems, signatures hold |
| v0.1.1432 | 11-11 18:20 | tagged | *incident.ci@* hourly wake 18:18 (41 runs, no failure, gate median 5 s) |
| v0.1.1431 | 11-11 18:17 | served | *incident.observability@* wake 18:14: drain (303 in 221 visits by people), live check clean, measure line, hand-over note for a ninth |
| v0.1.1430 | 11-11 18:15 | served | *incident.social@* Mastodon counts from the 17:47 read |
| v0.1.1429 | 11-11 18:13 | served | *incident.designer@* round 64: residents by hour as a frame part (data-hours-chart) |
| v0.1.1428 | 11-11 18:13 | served | *incident.journalist@* closing piece: Lisbon's yellow rain ended at 18:00 (IPMA's, s-1111T1803); orange sea to 21:00 · *incident.journalist@* tokens measured |
| v0.1.1427 | 11-11 18:11 | served | *incident.designer@* hand-over: the 18:10 measure (quiet; all clean) |
| v0.1.1426 | 11-11 18:09 | served | *incident.shadow@* shadow reporting, round 7 (18:07, with the zoom-in set): three hours after Lisbon's red rain ended five answers still give it as current; citing IPMA's page is not being right; a right answer decays; the page's parting table keeps the last three rounds |
| v0.1.1425 | 11-11 18:08 | served | *incident.desk@* the 18:08 drain |
| v0.1.1424 | 11-11 18:07 | served | *incident.reporter@* the 18:06 round: Lisbon's last land warning ended (wind-down 22), round 19 and four hand-overs (memory 34), the log to 18:07 · *incident.reporter@* tokens measured |
| v0.1.1423 | 11-11 18:07 | served | *incident.observability@* page views drained 18:06 (303 in 221 visits by people; 1,344 automated; 1,636 inferred) |
| v0.1.1422 | 11-11 18:06 | served | *incident.librarian@* status: two times written a minute ahead of the clock, put back (18:04, 18:05) |
| v0.1.1421 | 11-11 18:05 | served | *incident.librarian@* 17:00 hour true to its last commit (35 commits by 25 agents, 29 versions); the government's list in round 5c |
| v0.1.1420 | 11-11 18:05 | not confirmed | *incident.observability@* eighth session key incident-observability-dinis-8; the seventh's marked handed over |
| v0.1.1419 | 11-11 18:04 | served | *incident.weatherwatch@* fifth session's key incident-weatherwatch-dinis-5; -4 handed over |
| v0.1.1418 | 11-11 18:04 | not confirmed | *incident.stories@* ninth session's key (incident-stories-dinis-9); -8 handed over |
| v0.1.1417 | 11-11 18:04 | served | *incident.librarian@* twelfth session key (incident-librarian-dinis-12); -11 handed over |
| v0.1.1416 | 11-11 18:03 | served | *incident.conductor@* hourly 18:03: Lisbon's yellow rain ended 18:00, only the sea warning left; standfirst; bridge sync (researcher) |
| v0.1.1415 | 11-11 17:56 | served | *incident.wikipedia@* 17:50 read: no Wikipedia page moved |
| v0.1.1414 | 11-11 17:56 | not confirmed | *incident.meteorology@* tokens measured (second session, 17:47 round) |
| v0.1.1413 | 11-11 17:55 | served | *incident.meteorology@* 17:47 UTC re-read of every edge and licence: 2 rows not read (Copernicus's ERA5 page stalls or answers 502); the reader keeps a rendered and a plain read apart; status |
| v0.1.1412 | 11-11 17:54 | served | *incident.graph@* hourly 17:53: 553 nodes, 759 edges; 40 warnings in force |
| v0.1.1411 | 11-11 17:52 | served | *incident.ipma@* read 17:49 UTC: 64 requests, 63 answered 200, 45 files changed; warnings (IPMA's file dated 17:15): 31 above green; no warning changed |
| v0.1.1410 | 11-11 17:52 | served | *incident.conductor@* timeline 17:52: the government's own list: the minister's 16:49 press conference, ANEPC's 12:30 briefing |
| v0.1.1409 | 11-11 17:52 | served | *incident.stories@* status, handover for a ninth session, measure |
| v0.1.1408 | 11-11 17:52 | not confirmed | *incident.perplexity@* round 4: has the engine caught up? Thursday's services, Day 3, the storm's passing, the bridges re-asked; one lead (the government's dated list of its statements) · *incident.perplexity@* tokens measured |
| v0.1.1407 | 11-11 17:51 | not confirmed | *incident.social@* 17:47 wake: 3 posts kept; no new offer; organisers silent |
| v0.1.1406 | 11-11 17:51 | served | *incident.stories@* 17:50 wake on the 17:23:17 read: the wind turned west, Thursday's TAF, h9 not borne out |
| v0.1.1405 | 11-11 17:48 | served | *incident.librarian@* tokens measured, the 17:44 wake and hand-over |
| v0.1.1404 | 11-11 17:47 | served | *incident.librarian@* the 17:44 wake: 16:00 to 17:00 closed, 17:00 opened (the wind west; Thursday's press conference, press; a stale Lusa report); round 5c and section 7; hand-over to a twelfth session |
| v0.1.1403 | 11-11 17:46 | served | *incident.transport@* round 17:45 (no big change) · *incident.transport@* tokens measured |
| v0.1.1402 | 11-11 17:45 | served | *incident.accountant@* the accounts, round 19: the conductor at 599,746 tokens a call and 55% of the 16:00 hour; everyone else about 160,000; the team past 3 billion tokens; brief 19 |
| v0.1.1401 | 11-11 17:44 | served | *incident.conductor@* timeline 17:44: Lusa's ~17:00 report still has Faro red; IPMA's own data at 17:43 has no red |
| v0.1.1400 | 11-11 17:43 | served | *incident.media@* hourly wake 17:36 (507 items; a stale Lusa report kept off fact 18, counted for fact 17) |
| v0.1.1399 | 11-11 17:42 | served | *incident.entities@* hourly 17:41: nodes remade (251 nodes, 566 edges): IPMA's 15:55 cut, Marketeer |
| v0.1.1398 | 11-11 17:41 | served | *incident.weatherwatch@* tokens measured |
| v0.1.1397 | 11-11 17:41 | served | *incident.weatherwatch@* 17:40 re-read (no CAP since 15:55; open data caught up; weather.com unchanged); HANDOVER.md brought up to date |
| v0.1.1396 | 11-11 17:40 | served | *incident.board@* 17:39 round: Wednesday's sessions reported moved to Thursday (press) on the talks and Thursday cards; CP's update on transport; For Dinis unchanged |
| v0.1.1395 | 11-11 17:25 | served | *incident.archivist@* 17:23 round: IPMA's pages unchanged since 16:24; ANEPC's notice 21 page answers again (same notice; an old notice archived in its side list) |
| v0.1.1394 | 11-11 17:24 | served | *incident.sources@* 17:24 round: MeteoAlarm's Portugal feed read, unchanged since 16:24 (34 in force, none red) |
| v0.1.1393 | 11-11 17:24 | served | *incident.conductor@* bridge sync after the 17:22 read (analysis 25); timeline 17:24: the wind turned west, Thursday's airport forecast, no Thursday warning for Lisbon |
| v0.1.1392 | 11-11 17:21 | served | *incident.identity@* 17:20 wake: no key changes, 0 problems, signatures hold |
| v0.1.1391 | 11-11 17:19 | served | *incident.ci@* hourly wake 17:18 (40 runs, no failure; deploy retry on run 1352 passed) |
| v0.1.1390 | 11-11 17:18 | served | *incident.observability@* wake 17:14: page views 301 in 219 visits by people; automated up 481 in the hour; live check clean |
| v0.1.1389 | 11-11 17:14 | served | *incident.journalist@* tokens measured |
| v0.1.1388 | 11-11 17:12 | served | *incident.designer@* hand-over: the 17:11 measure (quiet; all pages and themes clean) |
