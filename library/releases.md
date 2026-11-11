# The release history: every version, what changed, and whether it was served

> Kept by incident.librarian@web-summit.dinis, 2026-11-11, 16:18 UTC. Built by [tools/library-releases.mjs](../tools/library-releases.mjs) from the tags, the commit subjects and the deploy workflow's runs as incident.ci@ keeps them ([the pipeline](../ci/README.md)), read at that time; the data is [releases.json](releases.json). Back to [the library](README.md).

CI numbers every push (`v0.1.<run>`), deploys it and tags it; nobody who pushes writes a number ([BRIEF-CORRECTIONS.md](../BRIEF-CORRECTIONS.md)). Until about 23:55 UTC on 10 November the newest push cancelled a run in progress; since then a running deploy finishes and only a run still waiting is replaced (the workflow's own comment), so a later "cancelled" should mean it never started. **1372 runs: 949 served (confirmed by CI), 23 deployed and tagged but cancelled before CI confirmed, 392 cancelled before the tag, 6 failed, 2 still running or unknown when read.**

## Versions never confirmed served

398 of 1372. The newest: v0.1.1347, v0.1.1342, v0.1.1332, v0.1.1329, v0.1.1325, v0.1.1323, v0.1.1311, v0.1.1305, v0.1.1303, v0.1.1301, v0.1.1296, v0.1.1292, v0.1.1289, v0.1.1270, v0.1.1265, v0.1.1261, v0.1.1260, v0.1.1258, v0.1.1256, v0.1.1255, v0.1.1244, v0.1.1241, v0.1.1231, v0.1.1230, v0.1.1224, v0.1.1222, v0.1.1220, v0.1.1219, v0.1.1212, v0.1.1209. Each hour's file lists every version with its state.

**This is not a list of versions that were never deployed**, and none can be made from the runs alone: a cancelled deploy step can still go live. Run 32: served: /version.json answered v0.1.32 with commit 487818fc40 when read at 23:49 UTC, although the run's deploy step is recorded as cancelled (job 130213112738) and no tag was pushed (incident.librarian@). Each of these versions' commits is contained in the next served version, so no change was lost; what is not known is whether a reader was ever served that exact number.

## The newest sixty versions

What changed is each commit's own subject, as its agent wrote it. Every version, hour by hour, as data: [11-11 16h](../view/index.html?path=library/releases/2026-11-11T16.json) (40) · [mmit-foundh](../view/index.html?path=library/releases/no-commit-found.json) (2) · [11-11 15h](../view/index.html?path=library/releases/2026-11-11T15.json) (56) · [11-11 14h](../view/index.html?path=library/releases/2026-11-11T14.json) (58) · [11-11 13h](../view/index.html?path=library/releases/2026-11-11T13.json) (57) · [11-11 12h](../view/index.html?path=library/releases/2026-11-11T12.json) (144) · [11-11 11h](../view/index.html?path=library/releases/2026-11-11T11.json) (84) · [11-11 10h](../view/index.html?path=library/releases/2026-11-11T10.json) (131) · [11-11 09h](../view/index.html?path=library/releases/2026-11-11T09.json) (83) · [11-11 08h](../view/index.html?path=library/releases/2026-11-11T08.json) (41) · [11-11 07h](../view/index.html?path=library/releases/2026-11-11T07.json) (38) · [11-11 06h](../view/index.html?path=library/releases/2026-11-11T06.json) (37) · [11-11 05h](../view/index.html?path=library/releases/2026-11-11T05.json) (75) · [11-11 04h](../view/index.html?path=library/releases/2026-11-11T04.json) (64) · [11-11 03h](../view/index.html?path=library/releases/2026-11-11T03.json) (116) · [11-11 02h](../view/index.html?path=library/releases/2026-11-11T02.json) (171) · [11-11 01h](../view/index.html?path=library/releases/2026-11-11T01.json) (34) · [11-11 00h](../view/index.html?path=library/releases/2026-11-11T00.json) (65) · [11-10 23h](../view/index.html?path=library/releases/2026-11-10T23.json) (64) · [11-10 22h](../view/index.html?path=library/releases/2026-11-10T22.json) (2) · [11-10 21h](../view/index.html?path=library/releases/2026-11-10T21.json) (10).

| Version | Pushed (UTC) | State | What changed |
|---|---|---|---|
| v0.1.1372 | 11-11 16:44 | tagged | *incident.transport@* Port of Lisbon re-checked: unknown · *incident.transport@* tokens measured |
| v0.1.1371 | 11-11 16:43 | tagged | *incident.conductor@* timeline 16:43: CP: Beira Baixa line interrupted Santa Margarida–Tramagal after a landslip |
| v0.1.1370 | 11-11 16:43 | tagged | *incident.transport@* round 16:42: CP's weather notice updated (Beira Baixa) |
| v0.1.1369 | 11-11 16:42 | tagged | *incident.conductor@* measure line 16:42 |
| v0.1.1368 | 11-11 16:42 | tagged | *incident.accountant@* the accounts, round 18: everyone but the conductor at 154,714 tokens a call in the 15:00 hour; journalist, reporter, observability handed over again; archivist past 500,000 a call; brief 18 |
| v0.1.1367 | 11-11 16:39 | tagged | *incident.conductor@* timeline 16:40: press titles quote the minister 'the most serious period is at the door' (evidence, time unknown), beside IPMA's 15:55 messages |
| v0.1.1366 | 11-11 16:39 | tagged | *incident.media@* hourly wake 16:36 (485 items; fact 18: Lisbon's wind warning ended, no red left) |
| v0.1.1365 | 11-11 16:38 | tagged | *incident.entities@* hourly 16:38: nodes remade (247 nodes, 550 edges: two decisions) |
| v0.1.1364 | 11-11 16:36 | tagged | *incident.weatherwatch@* 16:35 re-read: Lisbon's orange wind ended 15:56 by CAP (open data still lags); weather.com's only wind warning for Lisbon is the withdrawn red · *incident.weatherwatch@* tokens measured |
| v0.1.1363 |  | unknown | no commit found for this run |
| v0.1.1362 | 11-11 16:35 | tagged | *incident.board@* c-peak-window answered at the conductor's decision: Lisbon airport's highest gust 74 km/h at 14:00 (METAR), wind warning ended 15:56 |
| v0.1.1361 | 11-11 16:34 | tagged | *incident.board@* 16:34 round: Lisbon's orange wind ended 15:56, the peak card waits on IPMA's station gusts; CP and the minister (press) on their cards |
| v0.1.1360 | 11-11 16:31 | tagged | *incident.broadcast@* the wall's model field re-read at 16:30 UTC, now running to Friday 00:00 |
| v0.1.1359 | 11-11 16:27 | tagged | *incident.weather@* the measured tiles take only stations that reported the newest hour |
| v0.1.1358 | 11-11 16:26 | tagged | *incident.conductor@* timeline 16:09: IPMA's own page agrees at 16:24 (no district red; Lisbon's wind line gone) · *incident.sources@* correction: a warning is in force only if not expired and not replaced; the reader follows CAP references (normalising IPMA's stray dash) and the browser shows 'in force'; Lisbon's orange wind ended at 15:56 |
| v0.1.1357 |  | unknown | no commit found for this run |
| v0.1.1356 | 11-11 16:26 | tagged | *incident.archivist@* 16:24 round: IPMA's page no longer lists a wind warning for Lisbon (updated 15:55; no mainland district red); ANEPC's listing archives an old notice; its notice 21 page 502 again |
| v0.1.1355 | 11-11 16:25 | tagged | *incident.sources@* MeteoAlarm's Portugal feed at 16:24: IPMA's 15:55 messages lower Faro from red; no red warning in the feed is unexpired |
| v0.1.1354 | 11-11 16:24 | tagged | *incident.conductor@* bridge sync after the 16:22 read (analysis 24); timeline 16:24: Lisbon easing |
| v0.1.1353 | 11-11 16:21 | tagged | *incident.identity@* 16:20 wake: 115 keys of 38 agents, 0 problems, signatures hold |
| v0.1.1352 | 11-11 16:20 | tagged | *incident.ci@* hourly wake 16:18 (66 runs, no failure; edition 8's PDF render 44 s) |
| v0.1.1351 | 11-11 16:18 | tagged | *incident.observability@* wake 16:16: page views 292 in 212 visits by people; live check clean; snapshots refreshed |
| v0.1.1350 | 11-11 16:17 | served | *incident.conductor@* bridge sync: cap.json references carry identifier_norm (IPMA's stray '-' kept verbatim) |
| v0.1.1349 | 11-11 16:16 | served | *incident.journalist@* closing piece: correct the 16:15 line; no red remains on the mainland (s-1111T1609) |
| v0.1.1348 | 11-11 16:15 | served | *incident.weather@* hand-over: a time I wrote one minute ahead of the clock, corrected (16:15 to 16:14) |
| v0.1.1347 | 11-11 16:15 | not confirmed | *incident.journalist@* closing piece: Lisbon's red rain ended (IPMA's, as the timeline recorded it); close trigger unchanged · *incident.journalist@* tokens measured |
| v0.1.1346 | 11-11 16:15 | served | *incident.designer@* round 63: state colours to 4.5:1 on the recessed band in every theme |
| v0.1.1345 | 11-11 16:14 | served | *incident.weather@* CAP identifiers matched without stray punctuation; the 15:55 message now ends Lisbon's orange wind on the live page |
| v0.1.1344 | 11-11 16:11 | served | *incident.weather@* the newest CAP message's ended windows stay on the strip (wind 12:00-15:56), never the open data's older ones |
| v0.1.1343 | 11-11 16:11 | served | *incident.brief@* decision brief, edition 9 (no red warning left on the mainland) |
| v0.1.1342 | 11-11 16:11 | not confirmed | *incident.conductor@* bridge sync: cap.json with the 15:55 CAP (analysis 23); timeline 16:11: Lisbon's peak has passed (hypothesis), the airport at 16:00 |
| v0.1.1341 | 11-11 16:11 | served | *incident.stories@* IPMA's 15:55:03 batch: Lisbon's orange wind ended 15:56, no red on the mainland |
| v0.1.1340 | 11-11 16:10 | served | *incident.desk@* the 16:10 drain |
| v0.1.1339 | 11-11 16:09 | served | *incident.conductor@* IPMA CAP 15:55: Lisbon's orange wind ended 15:56; Faro lowered; no red left on the mainland; standfirst |
| v0.1.1338 | 11-11 16:08 | served | *incident.shadow@* shadow reporting, round 5 (16:07): an hour after Lisbon's red rain ended every answer on the warnings still had it; 'tomorrow' is Wednesday again; communiqué no. 3 arrives as a headline; findings |
| v0.1.1337 | 11-11 16:07 | served | *incident.reporter@* tokens measured |
| v0.1.1336 | 11-11 16:06 | served | *incident.reporter@* the 16:06 round: only Faro red (wind-down 20), a fix across a hand-over and four hand-overs (memory 31, 32), the log to 16:06 |
| v0.1.1335 | 11-11 16:06 | served | *incident.journalist@* closing piece: endings unchanged at the 16:00 round; 53 cards wait on Dinis |
| v0.1.1334 | 11-11 16:05 | served | *incident.stories@* h10 retold on the 15:52:55 ensemble read |
| v0.1.1333 | 11-11 16:04 | served | *incident.journalist@* seventh session key; sixth handed over |
| v0.1.1332 | 11-11 16:04 | not confirmed | *incident.stories@* eighth session key; -7 handed over |
| v0.1.1331 | 11-11 16:04 | served | *incident.reporter@* sixth session key (incident-reporter-dinis-6); the fifth handed over |
| v0.1.1330 | 11-11 15:56 | served | *incident.wikipedia@* 15:49 read: pt Madeira at 291 incidents; editor names withheld from bot edit summaries |
| v0.1.1329 | 11-11 15:56 | not confirmed | *incident.transport@* tokens measured |
| v0.1.1328 | 11-11 15:56 | served | *incident.transport@* CP live in trains.json (its own notices) |
| v0.1.1327 | 11-11 15:54 | served | *incident.graph@* hourly 15:53: 557 nodes, 780 edges; coverage 467 |
| v0.1.1326 | 11-11 15:54 | served | *incident.stories@* HANDOVER.md kept-by time to the clock |
| v0.1.1325 | 11-11 15:53 | not confirmed | *incident.stories@* HANDOVER.md current to the 15:53 wake |
| v0.1.1324 | 11-11 15:53 | served | *incident.stories@* measure the 15:53 wake |
| v0.1.1323 | 11-11 15:53 | not confirmed | *incident.stories@* 15:53 wake: Lisbon's red rain ended (c22, n1), o1/n4 to 15:00, h10, h11, n13, n16 |
| v0.1.1322 | 11-11 15:53 | served | *incident.datascience@* 15:52 refresh (IPMA eased again: red from 15 UTC 0.89 M -> 0.47 M residents, orange 4.19 M -> 3.73 M, yellow 5.03 M -> 5.91 M; red windows for 12-14 UTC have ended; ensemble shares unchanged) |
| v0.1.1321 | 11-11 15:52 | served | *incident.social@* 15:46 wake: 2 posts kept; VOST rail and roads offered; word match widened (warnings, alert, closures) |
| v0.1.1320 | 11-11 15:52 | served | *incident.ipma@* read 15:48 UTC: Lisbon's red rain ended at 15:00; rows reissued 15:06, same ends |
| v0.1.1319 | 11-11 15:49 | served | *incident.conductor@* timeline 15:49: CP's own notice: Campolide–Alcântara Terra and four Intercidades over the bridge suppressed |
| v0.1.1318 | 11-11 15:47 | served | *incident.conductor@* timeline 15:47: VOST reports rail suspensions and 8 roads restricted (evidence) |
| v0.1.1317 | 11-11 15:45 | served | *incident.librarian@* tokens measured, the 15:44 wake |
| v0.1.1316 | 11-11 15:45 | served | *incident.librarian@* the 15:44 wake: 15:00 hour true to 15:45 (Santarém and Leiria to yellow, only Faro red; tunnels closed, press); round 5c and section 7; release history |
| v0.1.1315 | 11-11 15:43 | served | *incident.transport@* Lisbon city's tunnels: unknown (open data stale) · *incident.transport@* tokens measured |
| v0.1.1314 | 11-11 15:42 | served | *incident.transport@* round 15:42 (no new notices) |
| v0.1.1313 | 11-11 15:41 | served | *incident.accountant@* the accounts, round 17: everyone but the conductor at 154,096 tokens a call in the 14:00 hour; social, stories, librarian handed over again; five still on a first session; brief 17 |
