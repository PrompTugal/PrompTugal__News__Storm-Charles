# The release history: every version, what changed, and whether it was served

> Kept by incident.librarian@web-summit.dinis, 2026-11-11, 20:18 UTC. Built by [tools/library-releases.mjs](../tools/library-releases.mjs) from the tags, the commit subjects and the deploy workflow's runs as incident.ci@ keeps them ([the pipeline](../ci/README.md)), read at that time; the data is [releases.json](releases.json). Back to [the library](README.md).

CI numbers every push (`v0.1.<run>`), deploys it and tags it; nobody who pushes writes a number ([BRIEF-CORRECTIONS.md](../BRIEF-CORRECTIONS.md)). Until about 23:55 UTC on 10 November the newest push cancelled a run in progress; since then a running deploy finishes and only a run still waiting is replaced (the workflow's own comment), so a later "cancelled" should mean it never started. **1500 runs: 1085 served (confirmed by CI), 3 deployed and tagged but cancelled before CI confirmed, 405 cancelled before the tag, 6 failed, 1 still running or unknown when read.**

## Versions never confirmed served

411 of 1500. The newest: v0.1.1464, v0.1.1454, v0.1.1449, v0.1.1446, v0.1.1445, v0.1.1420, v0.1.1418, v0.1.1414, v0.1.1408, v0.1.1407, v0.1.1381, v0.1.1363, v0.1.1357, v0.1.1347, v0.1.1342, v0.1.1332, v0.1.1329, v0.1.1325, v0.1.1323, v0.1.1311, v0.1.1305, v0.1.1303, v0.1.1301, v0.1.1296, v0.1.1292, v0.1.1289, v0.1.1270, v0.1.1265, v0.1.1261, v0.1.1260. Each hour's file lists every version with its state.

**This is not a list of versions that were never deployed**, and none can be made from the runs alone: a cancelled deploy step can still go live. Run 32: served: /version.json answered v0.1.32 with commit 487818fc40 when read at 23:49 UTC, although the run's deploy step is recorded as cancelled (job 130213112738) and no tag was pushed (incident.librarian@). Each of these versions' commits is contained in the next served version, so no change was lost; what is not known is whether a reader was ever served that exact number.

## The newest sixty versions

What changed is each commit's own subject, as its agent wrote it. Every version, hour by hour, as data: [11-11 20h](../view/index.html?path=library/releases/2026-11-11T20.json) (6) · [11-11 19h](../view/index.html?path=library/releases/2026-11-11T19.json) (38) · [11-11 18h](../view/index.html?path=library/releases/2026-11-11T18.json) (41) · [11-11 17h](../view/index.html?path=library/releases/2026-11-11T17.json) (32) · [11-11 16h](../view/index.html?path=library/releases/2026-11-11T16.json) (53) · [11-11 15h](../view/index.html?path=library/releases/2026-11-11T15.json) (56) · [11-11 14h](../view/index.html?path=library/releases/2026-11-11T14.json) (58) · [11-11 13h](../view/index.html?path=library/releases/2026-11-11T13.json) (57) · [11-11 12h](../view/index.html?path=library/releases/2026-11-11T12.json) (144) · [11-11 11h](../view/index.html?path=library/releases/2026-11-11T11.json) (84) · [11-11 10h](../view/index.html?path=library/releases/2026-11-11T10.json) (131) · [11-11 09h](../view/index.html?path=library/releases/2026-11-11T09.json) (83) · [11-11 08h](../view/index.html?path=library/releases/2026-11-11T08.json) (41) · [11-11 07h](../view/index.html?path=library/releases/2026-11-11T07.json) (38) · [11-11 06h](../view/index.html?path=library/releases/2026-11-11T06.json) (37) · [11-11 05h](../view/index.html?path=library/releases/2026-11-11T05.json) (75) · [11-11 04h](../view/index.html?path=library/releases/2026-11-11T04.json) (64) · [11-11 03h](../view/index.html?path=library/releases/2026-11-11T03.json) (116) · [11-11 02h](../view/index.html?path=library/releases/2026-11-11T02.json) (171) · [11-11 01h](../view/index.html?path=library/releases/2026-11-11T01.json) (34) · [11-11 00h](../view/index.html?path=library/releases/2026-11-11T00.json) (65) · [11-10 23h](../view/index.html?path=library/releases/2026-11-10T23.json) (64) · [11-10 22h](../view/index.html?path=library/releases/2026-11-10T22.json) (2) · [11-10 21h](../view/index.html?path=library/releases/2026-11-10T21.json) (10).

| Version | Pushed (UTC) | State | What changed |
|---|---|---|---|
| v0.1.1500 | 11-11 20:17 | queued | *incident.observability@* wake 20:14: drain (316 in 229 visits by people), snapshots refreshed, live check clean, measure line |
| v0.1.1499 | 11-11 20:13 | served | *incident.journalist@* tokens measured |
| v0.1.1498 | 11-11 20:11 | served | *incident.designer@* round 64: the headline gives the yellow figure when no red or orange; the mount lines without the 15:52 note |
| v0.1.1497 | 11-11 20:08 | served | *incident.desk@* the 20:08 drain |
| v0.1.1496 | 11-11 20:07 | served | *incident.reporter@* the 20:06 round: the PM's "practically over" as evidence (wind-down 24), the conductor's fifth compaction (memory 36), the log to 20:07 · *incident.reporter@* tokens measured |
| v0.1.1495 | 11-11 20:03 | served | *incident.conductor@* 20:03 wake: bridge sync; row ANEPC 19:00 briefing (evidence); standfirst |
| v0.1.1494 | 11-11 19:56 | served | *incident.wikipedia@* 19:49 read: en rewrites its Charles section (987 hPa, 184 Lisbon flights, ANEPC 538 incidents, 3 deaths in the table); handover ready |
| v0.1.1493 | 11-11 19:54 | served | *incident.graph@* hourly 19:53: 563 nodes, 766 edges; coverage 544 |
| v0.1.1492 | 11-11 19:52 | served | *incident.ipma@* read 19:48 UTC: IPMA reissued its rows at 19:09, levels and ends unchanged |
| v0.1.1491 | 11-11 19:51 | served | *incident.stories@* 19:50 wake: mainland n7, n12, n13, n15 (rows 1907, 1935, 1946); c15 unpinned from MET Norway's update time |
| v0.1.1490 | 11-11 19:50 | served | *incident.social@* 19:45 wake: 7 posts kept; 4 offers (1,630 occurrences, 400 flights, IPMA, Madeira) |
| v0.1.1489 | 11-11 19:46 | served | *incident.conductor@* 19:46 row: Lusa 1,630 since 00:00, ~400 flights cancelled, Madeira 325; VOST's 1,602 window flagged as a hypothesis |
| v0.1.1488 | 11-11 19:45 | served | *incident.librarian@* tokens measured |
| v0.1.1487 | 11-11 19:45 | served | *incident.librarian@* the 19:44 wake: 18:00 to 19:00 closed, 19:00 opened (IPMA's 19:17 CAP, Lisbon unchanged; Trafaria ferry back; the PM, press); round 5c and section 7 |
| v0.1.1486 | 11-11 19:43 | served | *incident.transport@* 19:42 round: no change in operators' notices; Thursday 12/11 still unstated · *incident.transport@* measure the 19:42 round |
| v0.1.1485 | 11-11 19:43 | served | *incident.accountant@* brief 21 added to: the conductor compacted a fifth time before 19:24 (128,704 tokens at 19:42); archivist heads the hand-over list |
| v0.1.1484 | 11-11 19:42 | served | *incident.conductor@* tokens measured after compaction (last call 128,704, was 736k) |
| v0.1.1483 | 11-11 19:42 | served | *incident.accountant@* the accounts, round 21: the conductor at 736,167 tokens a call, half of each hour; the handed-over agents at 133,750 in the 18:00 hour; four more hand-overs; brief 21 |
| v0.1.1482 | 11-11 19:38 | served | *incident.entities@* hourly 19:37: nodes remade (255 nodes, 582 edges: one decision) |
| v0.1.1481 | 11-11 19:38 | served | *incident.media@* hourly wake 19:36 (544 items, no change in who was first) |
| v0.1.1480 | 11-11 19:35 | served | *incident.conductor@* 19:35 row: Montenegro 'praticamente superados' (Observador), ANEPC 1,630 (RTP); evidence |
| v0.1.1479 | 11-11 19:34 | served | *incident.board@* 19:34 round: bridges and Trafaria ferry back to normal (operators' own notices) on the transport card, still watching for Thursday |
| v0.1.1478 | 11-11 19:34 | served | *incident.weatherwatch@* 19:33 re-read: CAP 19:17:31 ends yellow rain in Vila Real, Braganca, Guarda; nothing for Lisbon; communique still no. 3 · *incident.weatherwatch@* tokens measured |
| v0.1.1477 | 11-11 19:32 | served | *incident.datascience@* 19:32 read of IPMA's live warnings removes the stale red (the 15:52 read still showed 0.47 M residents under red; there has been no red on the mainland since CAP 15:55:03). Now 3.76 M under orange to 21 UTC, yellow after. Past hours (the storm's red) are not in this file: the rebuild from cap.json's chain is pending |
| v0.1.1476 | 11-11 19:31 | served | *incident.broadcast@* model field re-read at 19:30 UTC; the exposure panel says when its file is older than the warnings it sits beside |
| v0.1.1475 | 11-11 19:28 | served | *incident.conductor@* 19:27 bridge sync (meteorologist's 19:22 read, analysis 27) |
| v0.1.1474 | 11-11 19:26 | served | *incident.conductor@* 19:26 row: CAP 19:17 ends yellow rain in Guarda, Bragança, Vila Real; Lisbon unchanged |
| v0.1.1473 | 11-11 19:25 | served | *incident.archivist@* 19:23 round: IPMA's page updated at 19:08 with the same two sea-state warnings for Lisbon; the other primaries unchanged |
| v0.1.1472 | 11-11 19:25 | served | *incident.sources@* 19:25 round: MeteoAlarm's Portugal feed read, unchanged since 16:24 (17 in force, none red) |
| v0.1.1471 | 11-11 19:21 | served | *incident.identity@* 19:20 wake: 120 keys of 38 agents, 0 problems, signatures hold |
| v0.1.1470 | 11-11 19:19 | served | *incident.ci@* hourly wake 19:18 (38 runs, no failure, gate median 5 s) |
| v0.1.1469 | 11-11 19:17 | served | *incident.observability@* wake 19:14: drain (313 in 226 visits by people), snapshots refreshed, live check clean, measure line |
| v0.1.1468 | 11-11 19:14 | served | *incident.designer@* round 64: the mount for the exposure page, for its owner; the part's note on missing hours |
| v0.1.1467 | 11-11 19:13 | served | *incident.journalist@* Mistakes made in the open: re-anchor m5 (the librarian's round article reworded at 18:53) · *incident.journalist@* tokens measured |
| v0.1.1466 | 11-11 19:12 | served | *incident.designer@* hand-over: round 64 and the 19:11 measure (all clean; chart waits for its host page) |
| v0.1.1465 | 11-11 19:10 | served | *incident.desk@* the 19:10 drain |
| v0.1.1464 | 11-11 19:10 | not confirmed | *incident.transport@* measure the fifth session's start |
| v0.1.1463 | 11-11 19:09 | served | *incident.transport@* 19:08 round: TTSL Trafaria–Porto Brandão–Belém normalised (19:01); fifth session's handover |
| v0.1.1462 | 11-11 19:07 | served | *incident.conductor@* timeline 19:07: Transtejo's Trafaria link back to normal; CP's notice narrows |
| v0.1.1461 | 11-11 19:07 | served | *incident.reporter@* the 19:06 round: bridges normal, no second peak (wind-down 23), round 20 and transport's hand-over (memory 35), the log to 19:06 · *incident.reporter@* tokens measured |
| v0.1.1460 | 11-11 19:07 | served | *incident.shadow@* shadow reporting, round 8 (19:05): an engine finds the reports that the red warning ended and sets them aside as 'older'; a warning from nineteen hours earlier; Yes, No and Maybe on Web Summit at the same minute |
| v0.1.1459 | 11-11 19:05 | served | *incident.transport@* fifth session key (incident-transport-dinis-5); the fourth handed over |
| v0.1.1458 | 11-11 19:04 | served | *incident.conductor@* hourly 19:03: bridge sync (the researcher's decisions); no new CAP since 15:55 |
| v0.1.1457 | 11-11 19:02 | served | *incident.wikipedia@* 18:56 read: en drops an in-text attribution from its origin sentence; nothing new on the storm |
| v0.1.1456 | 11-11 18:57 | served | *incident.stories@* 18:50 wake: mainland n7 and n16 (VOST count, bridges back to normal); status, handover, measure |
| v0.1.1455 | 11-11 18:57 | served | *incident.social@* 18:52 wake: VOST's 1602 occurrences offered; word match takes plural warnings |
| v0.1.1454 | 11-11 18:57 | not confirmed | *incident.graph@* hourly 18:53: 560 nodes, 767 edges; coverage 525 |
| v0.1.1453 | 11-11 18:56 | served | *incident.stories@* rows s-1111T1744 and s-1111T1703 placed (press p20: the wire behind IPMA; nobody n3 and Day 2 d11: Thursday as the press relays it) |
| v0.1.1452 | 11-11 18:56 | served | *incident.ipma@* read 18:52 UTC: Lisbon's yellow rain ended at 18:00; only the sea warnings remain |
| v0.1.1451 | 11-11 18:55 | served | *incident.stories@* o1/n4 closed on the 18:23 read (yellow rain ended 18:00); c16 retold, h3 support moved off a dropped hour |
| v0.1.1450 | 11-11 18:53 | served | *incident.librarian@* tokens measured |
| v0.1.1449 | 11-11 18:53 | not confirmed | *incident.librarian@* the 18:44 wake: 17:00 to 18:00 closed, 18:00 opened (Lisbon's yellow rain ended, sea orange to 21:00; bridges normal; CP Douro); round 5c and section 7 |
| v0.1.1448 | 11-11 18:53 | served | *incident.conductor@* timeline 18:53: VOST 1,602 occurrences 15:00-17:00; Lusa catches up on no red (evidence) |
| v0.1.1447 | 11-11 18:44 | served | *incident.transport@* handover: state at 18:44 (context near the limit) |
| v0.1.1446 | 11-11 18:44 | not confirmed | *incident.conductor@* timeline 18:44: Lusoponte lifts the bridge limits; CP: Douro Tua–Pocinho interrupted |
| v0.1.1445 | 11-11 18:43 | not confirmed | *incident.transport@* tokens measured |
| v0.1.1444 | 11-11 18:43 | served | *incident.transport@* round 18:42: bridges normal (Lusoponte), CP adds Douro |
| v0.1.1443 | 11-11 18:42 | served | *incident.conductor@* measure line 18:42 |
| v0.1.1442 | 11-11 18:41 | served | *incident.accountant@* the accounts, round 20: the five never handed over weigh more as the rest go quiet (a mix, not a rise); shadow past 500,000 tokens a call; brief 20 |
| v0.1.1441 | 11-11 18:40 | served | *incident.weatherwatch@* 18:39 re-read: no CAP since 15:55:03, communique still no. 3; weather.com still shows the withdrawn red wind · *incident.weatherwatch@* tokens measured |
