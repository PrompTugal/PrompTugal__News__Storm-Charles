# The release history: every version, what changed, and whether it was served

> Kept by incident.librarian@web-summit.dinis, 2026-11-11, 17:18 UTC. Built by [tools/library-releases.mjs](../tools/library-releases.mjs) from the tags, the commit subjects and the deploy workflow's runs as incident.ci@ keeps them ([the pipeline](../ci/README.md)), read at that time; the data is [releases.json](releases.json). Back to [the library](README.md).

CI numbers every push (`v0.1.<run>`), deploys it and tags it; nobody who pushes writes a number ([BRIEF-CORRECTIONS.md](../BRIEF-CORRECTIONS.md)). Until about 23:55 UTC on 10 November the newest push cancelled a run in progress; since then a running deploy finishes and only a run still waiting is replaced (the workflow's own comment), so a later "cancelled" should mean it never started. **1402 runs: 986 served (confirmed by CI), 15 deployed and tagged but cancelled before CI confirmed, 395 cancelled before the tag, 6 failed.**

## Versions never confirmed served

401 of 1402. The newest: v0.1.1381, v0.1.1363, v0.1.1357, v0.1.1347, v0.1.1342, v0.1.1332, v0.1.1329, v0.1.1325, v0.1.1323, v0.1.1311, v0.1.1305, v0.1.1303, v0.1.1301, v0.1.1296, v0.1.1292, v0.1.1289, v0.1.1270, v0.1.1265, v0.1.1261, v0.1.1260, v0.1.1258, v0.1.1256, v0.1.1255, v0.1.1244, v0.1.1241, v0.1.1231, v0.1.1230, v0.1.1224, v0.1.1222, v0.1.1220. Each hour's file lists every version with its state.

**This is not a list of versions that were never deployed**, and none can be made from the runs alone: a cancelled deploy step can still go live. Run 32: served: /version.json answered v0.1.32 with commit 487818fc40 when read at 23:49 UTC, although the run's deploy step is recorded as cancelled (job 130213112738) and no tag was pushed (incident.librarian@). Each of these versions' commits is contained in the next served version, so no change was lost; what is not known is whether a reader was ever served that exact number.

## The newest sixty versions

What changed is each commit's own subject, as its agent wrote it. Every version, hour by hour, as data: [11-11 17h](../view/index.html?path=library/releases/2026-11-11T17.json) (19) · [11-11 16h](../view/index.html?path=library/releases/2026-11-11T16.json) (53) · [11-11 15h](../view/index.html?path=library/releases/2026-11-11T15.json) (56) · [11-11 14h](../view/index.html?path=library/releases/2026-11-11T14.json) (58) · [11-11 13h](../view/index.html?path=library/releases/2026-11-11T13.json) (57) · [11-11 12h](../view/index.html?path=library/releases/2026-11-11T12.json) (144) · [11-11 11h](../view/index.html?path=library/releases/2026-11-11T11.json) (84) · [11-11 10h](../view/index.html?path=library/releases/2026-11-11T10.json) (131) · [11-11 09h](../view/index.html?path=library/releases/2026-11-11T09.json) (83) · [11-11 08h](../view/index.html?path=library/releases/2026-11-11T08.json) (41) · [11-11 07h](../view/index.html?path=library/releases/2026-11-11T07.json) (38) · [11-11 06h](../view/index.html?path=library/releases/2026-11-11T06.json) (37) · [11-11 05h](../view/index.html?path=library/releases/2026-11-11T05.json) (75) · [11-11 04h](../view/index.html?path=library/releases/2026-11-11T04.json) (64) · [11-11 03h](../view/index.html?path=library/releases/2026-11-11T03.json) (116) · [11-11 02h](../view/index.html?path=library/releases/2026-11-11T02.json) (171) · [11-11 01h](../view/index.html?path=library/releases/2026-11-11T01.json) (34) · [11-11 00h](../view/index.html?path=library/releases/2026-11-11T00.json) (65) · [11-10 23h](../view/index.html?path=library/releases/2026-11-10T23.json) (64) · [11-10 22h](../view/index.html?path=library/releases/2026-11-10T22.json) (2) · [11-10 21h](../view/index.html?path=library/releases/2026-11-10T21.json) (10).

| Version | Pushed (UTC) | State | What changed |
|---|---|---|---|
| v0.1.1402 | 11-11 17:45 | tagged | *incident.accountant@* the accounts, round 19: the conductor at 599,746 tokens a call and 55% of the 16:00 hour; everyone else about 160,000; the team past 3 billion tokens; brief 19 |
| v0.1.1401 | 11-11 17:44 | tagged | *incident.conductor@* timeline 17:44: Lusa's ~17:00 report still has Faro red; IPMA's own data at 17:43 has no red |
| v0.1.1400 | 11-11 17:43 | tagged | *incident.media@* hourly wake 17:36 (507 items; a stale Lusa report kept off fact 18, counted for fact 17) |
| v0.1.1399 | 11-11 17:42 | tagged | *incident.entities@* hourly 17:41: nodes remade (251 nodes, 566 edges): IPMA's 15:55 cut, Marketeer |
| v0.1.1398 | 11-11 17:41 | tagged | *incident.weatherwatch@* tokens measured |
| v0.1.1397 | 11-11 17:41 | tagged | *incident.weatherwatch@* 17:40 re-read (no CAP since 15:55; open data caught up; weather.com unchanged); HANDOVER.md brought up to date |
| v0.1.1396 | 11-11 17:40 | tagged | *incident.board@* 17:39 round: Wednesday's sessions reported moved to Thursday (press) on the talks and Thursday cards; CP's update on transport; For Dinis unchanged |
| v0.1.1395 | 11-11 17:25 | tagged | *incident.archivist@* 17:23 round: IPMA's pages unchanged since 16:24; ANEPC's notice 21 page answers again (same notice; an old notice archived in its side list) |
| v0.1.1394 | 11-11 17:24 | tagged | *incident.sources@* 17:24 round: MeteoAlarm's Portugal feed read, unchanged since 16:24 (34 in force, none red) |
| v0.1.1393 | 11-11 17:24 | tagged | *incident.conductor@* bridge sync after the 17:22 read (analysis 25); timeline 17:24: the wind turned west, Thursday's airport forecast, no Thursday warning for Lisbon |
| v0.1.1392 | 11-11 17:21 | tagged | *incident.identity@* 17:20 wake: no key changes, 0 problems, signatures hold |
| v0.1.1391 | 11-11 17:19 | tagged | *incident.ci@* hourly wake 17:18 (40 runs, no failure; deploy retry on run 1352 passed) |
| v0.1.1390 | 11-11 17:18 | served | *incident.observability@* wake 17:14: page views 301 in 219 visits by people; automated up 481 in the hour; live check clean |
| v0.1.1389 | 11-11 17:14 | served | *incident.journalist@* tokens measured |
| v0.1.1388 | 11-11 17:12 | served | *incident.designer@* hand-over: the 17:11 measure (quiet; all pages and themes clean) |
| v0.1.1387 | 11-11 17:09 | served | *incident.desk@* the 17:09 drain |
| v0.1.1386 | 11-11 17:08 | served | *incident.shadow@* shadow reporting, round 6 (17:07): the first answer with no red for Lisbon (and no address); the other engine still serves red rain two hours after it ended; Yes in English and No in Portuguese at the same minute; findings |
| v0.1.1385 | 11-11 17:08 | served | *incident.reporter@* the 17:07 round: no red on the mainland (wind-down 21), round 18 (memory 33), step 32 corrected, the log to 17:07 · *incident.reporter@* tokens measured |
| v0.1.1384 | 11-11 17:03 | served | *incident.conductor@* hourly 17:03: bridge sync (researcher's decisions); timeline 17:03: Thursday programme and an 11:00 press conference (press, evidence) |
| v0.1.1383 | 11-11 16:56 | served | *incident.wikipedia@* 16:48 read: en Wikipedia claims a death in the Canary Islands (3 in its infobox); pt Madeira 313 incidents, railway cuts; handover updated |
| v0.1.1382 | 11-11 16:55 | served | *incident.conductor@* timeline 16:40 reworded: the minister's quote predates IPMA's 15:55 cut (stories@ note) |
| v0.1.1381 | 11-11 16:54 | not confirmed | *incident.stories@* n12: the minister's words predate IPMA's cut by at least 38 minutes |
| v0.1.1380 | 11-11 16:54 | served | *incident.graph@* hourly 16:53: 557 nodes, 769 edges; 46 warnings in force |
| v0.1.1379 | 11-11 16:53 | served | *incident.stories@* n12, n13 on rows 1640 and 1643; status, handover, measure |
| v0.1.1378 | 11-11 16:53 | served | *incident.stories@* 16:50 wake on the 16:22:55 read: wind window over, airport to 16:00, TAF 14:36 |
| v0.1.1377 | 11-11 16:52 | served | *incident.ipma@* read 16:48 UTC: IPMA withdrew Lisbon's orange wind at 15:56 (green since) |
| v0.1.1376 | 11-11 16:51 | served | *incident.social@* 16:46 wake: 4 posts kept (3 by the widened match); rail offer taken; Thursday gathering offered |
| v0.1.1375 | 11-11 16:47 | served | *incident.conductor@* timeline 16:40: the minister's quote dates from by 15:17, before IPMA's 15:55 messages (researcher) |
| v0.1.1374 | 11-11 16:46 | served | *incident.librarian@* tokens measured, the 16:44 wake |
| v0.1.1373 | 11-11 16:46 | served | *incident.librarian@* the 16:44 wake: 15:00 to 16:00 closed (rail, IPMA's open data catching up), 16:00 opened (no red left on the mainland; Beira Baixa landslip); round 5c and section 7 |
| v0.1.1372 | 11-11 16:44 | served | *incident.transport@* Port of Lisbon re-checked: unknown · *incident.transport@* tokens measured |
| v0.1.1371 | 11-11 16:43 | served | *incident.conductor@* timeline 16:43: CP: Beira Baixa line interrupted Santa Margarida–Tramagal after a landslip |
| v0.1.1370 | 11-11 16:43 | served | *incident.transport@* round 16:42: CP's weather notice updated (Beira Baixa) |
| v0.1.1369 | 11-11 16:42 | served | *incident.conductor@* measure line 16:42 |
| v0.1.1368 | 11-11 16:42 | served | *incident.accountant@* the accounts, round 18: everyone but the conductor at 154,714 tokens a call in the 15:00 hour; journalist, reporter, observability handed over again; archivist past 500,000 a call; brief 18 |
| v0.1.1367 | 11-11 16:39 | served | *incident.conductor@* timeline 16:40: press titles quote the minister 'the most serious period is at the door' (evidence, time unknown), beside IPMA's 15:55 messages |
| v0.1.1366 | 11-11 16:39 | served | *incident.media@* hourly wake 16:36 (485 items; fact 18: Lisbon's wind warning ended, no red left) |
| v0.1.1365 | 11-11 16:38 | served | *incident.entities@* hourly 16:38: nodes remade (247 nodes, 550 edges: two decisions) |
| v0.1.1364 | 11-11 16:36 | served | *incident.weatherwatch@* tokens measured |
| v0.1.1363 | 11-11 16:36 | not confirmed | *incident.weatherwatch@* 16:35 re-read: Lisbon's orange wind ended 15:56 by CAP (open data still lags); weather.com's only wind warning for Lisbon is the withdrawn red |
| v0.1.1362 | 11-11 16:35 | served | *incident.board@* c-peak-window answered at the conductor's decision: Lisbon airport's highest gust 74 km/h at 14:00 (METAR), wind warning ended 15:56 |
| v0.1.1361 | 11-11 16:34 | served | *incident.board@* 16:34 round: Lisbon's orange wind ended 15:56, the peak card waits on IPMA's station gusts; CP and the minister (press) on their cards |
| v0.1.1360 | 11-11 16:31 | served | *incident.broadcast@* the wall's model field re-read at 16:30 UTC, now running to Friday 00:00 |
| v0.1.1359 | 11-11 16:27 | served | *incident.weather@* the measured tiles take only stations that reported the newest hour |
| v0.1.1358 | 11-11 16:26 | served | *incident.sources@* correction: a warning is in force only if not expired and not replaced; the reader follows CAP references (normalising IPMA's stray dash) and the browser shows 'in force'; Lisbon's orange wind ended at 15:56 |
| v0.1.1357 | 11-11 16:26 | not confirmed | *incident.conductor@* timeline 16:09: IPMA's own page agrees at 16:24 (no district red; Lisbon's wind line gone) |
| v0.1.1356 | 11-11 16:26 | served | *incident.archivist@* 16:24 round: IPMA's page no longer lists a wind warning for Lisbon (updated 15:55; no mainland district red); ANEPC's listing archives an old notice; its notice 21 page 502 again |
| v0.1.1355 | 11-11 16:25 | served | *incident.sources@* MeteoAlarm's Portugal feed at 16:24: IPMA's 15:55 messages lower Faro from red; no red warning in the feed is unexpired |
| v0.1.1354 | 11-11 16:24 | served | *incident.conductor@* bridge sync after the 16:22 read (analysis 24); timeline 16:24: Lisbon easing |
| v0.1.1353 | 11-11 16:21 | served | *incident.identity@* 16:20 wake: 115 keys of 38 agents, 0 problems, signatures hold |
| v0.1.1352 | 11-11 16:20 | served | *incident.ci@* hourly wake 16:18 (66 runs, no failure; edition 8's PDF render 44 s) |
| v0.1.1351 | 11-11 16:18 | served | *incident.observability@* wake 16:16: page views 292 in 212 visits by people; live check clean; snapshots refreshed |
| v0.1.1350 | 11-11 16:17 | served | *incident.conductor@* bridge sync: cap.json references carry identifier_norm (IPMA's stray '-' kept verbatim) |
| v0.1.1349 | 11-11 16:16 | served | *incident.journalist@* closing piece: correct the 16:15 line; no red remains on the mainland (s-1111T1609) |
| v0.1.1348 | 11-11 16:15 | served | *incident.weather@* hand-over: a time I wrote one minute ahead of the clock, corrected (16:15 to 16:14) |
| v0.1.1347 | 11-11 16:15 | not confirmed | *incident.journalist@* closing piece: Lisbon's red rain ended (IPMA's, as the timeline recorded it); close trigger unchanged · *incident.journalist@* tokens measured |
| v0.1.1346 | 11-11 16:15 | served | *incident.designer@* round 63: state colours to 4.5:1 on the recessed band in every theme |
| v0.1.1345 | 11-11 16:14 | served | *incident.weather@* CAP identifiers matched without stray punctuation; the 15:55 message now ends Lisbon's orange wind on the live page |
| v0.1.1344 | 11-11 16:11 | served | *incident.weather@* the newest CAP message's ended windows stay on the strip (wind 12:00-15:56), never the open data's older ones |
| v0.1.1343 | 11-11 16:11 | served | *incident.brief@* decision brief, edition 9 (no red warning left on the mainland) |
