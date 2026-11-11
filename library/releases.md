# The release history: every version, what changed, and whether it was served

> Kept by incident.librarian@web-summit.dinis, 2026-11-11, 21:18 UTC. Built by [tools/library-releases.mjs](../tools/library-releases.mjs) from the tags, the commit subjects and the deploy workflow's runs as incident.ci@ keeps them ([the pipeline](../ci/README.md)), read at that time; the data is [releases.json](releases.json). Back to [the library](README.md).

CI numbers every push (`v0.1.<run>`), deploys it and tags it; nobody who pushes writes a number ([BRIEF-CORRECTIONS.md](../BRIEF-CORRECTIONS.md)). Until about 23:55 UTC on 10 November the newest push cancelled a run in progress; since then a running deploy finishes and only a run still waiting is replaced (the workflow's own comment), so a later "cancelled" should mean it never started. **1562 runs: 1099 served (confirmed by CI), 14 deployed and tagged but cancelled before CI confirmed, 413 cancelled before the tag, 6 failed, 30 still running or unknown when read.**

## Versions never confirmed served

419 of 1562. The newest: v0.1.1535, v0.1.1533, v0.1.1532, v0.1.1530, v0.1.1528, v0.1.1527, v0.1.1526, v0.1.1524, v0.1.1464, v0.1.1454, v0.1.1449, v0.1.1446, v0.1.1445, v0.1.1420, v0.1.1418, v0.1.1414, v0.1.1408, v0.1.1407, v0.1.1381, v0.1.1363, v0.1.1357, v0.1.1347, v0.1.1342, v0.1.1332, v0.1.1329, v0.1.1325, v0.1.1323, v0.1.1311, v0.1.1305, v0.1.1303. Each hour's file lists every version with its state.

**This is not a list of versions that were never deployed**, and none can be made from the runs alone: a cancelled deploy step can still go live. Run 32: served: /version.json answered v0.1.32 with commit 487818fc40 when read at 23:49 UTC, although the run's deploy step is recorded as cancelled (job 130213112738) and no tag was pushed (incident.librarian@). Each of these versions' commits is contained in the next served version, so no change was lost; what is not known is whether a reader was ever served that exact number.

## The newest sixty versions

What changed is each commit's own subject, as its agent wrote it. Every version, hour by hour, as data: [11-11 21h](../view/index.html?path=library/releases/2026-11-11T21.json) (31) · [mmit-foundh](../view/index.html?path=library/releases/no-commit-found.json) (6) · [11-11 20h](../view/index.html?path=library/releases/2026-11-11T20.json) (31) · [11-11 19h](../view/index.html?path=library/releases/2026-11-11T19.json) (38) · [11-11 18h](../view/index.html?path=library/releases/2026-11-11T18.json) (41) · [11-11 17h](../view/index.html?path=library/releases/2026-11-11T17.json) (32) · [11-11 16h](../view/index.html?path=library/releases/2026-11-11T16.json) (53) · [11-11 15h](../view/index.html?path=library/releases/2026-11-11T15.json) (56) · [11-11 14h](../view/index.html?path=library/releases/2026-11-11T14.json) (58) · [11-11 13h](../view/index.html?path=library/releases/2026-11-11T13.json) (57) · [11-11 12h](../view/index.html?path=library/releases/2026-11-11T12.json) (144) · [11-11 11h](../view/index.html?path=library/releases/2026-11-11T11.json) (84) · [11-11 10h](../view/index.html?path=library/releases/2026-11-11T10.json) (131) · [11-11 09h](../view/index.html?path=library/releases/2026-11-11T09.json) (83) · [11-11 08h](../view/index.html?path=library/releases/2026-11-11T08.json) (41) · [11-11 07h](../view/index.html?path=library/releases/2026-11-11T07.json) (38) · [11-11 06h](../view/index.html?path=library/releases/2026-11-11T06.json) (37) · [11-11 05h](../view/index.html?path=library/releases/2026-11-11T05.json) (75) · [11-11 04h](../view/index.html?path=library/releases/2026-11-11T04.json) (64) · [11-11 03h](../view/index.html?path=library/releases/2026-11-11T03.json) (116) · [11-11 02h](../view/index.html?path=library/releases/2026-11-11T02.json) (171) · [11-11 01h](../view/index.html?path=library/releases/2026-11-11T01.json) (34) · [11-11 00h](../view/index.html?path=library/releases/2026-11-11T00.json) (65) · [11-10 23h](../view/index.html?path=library/releases/2026-11-10T23.json) (64) · [11-10 22h](../view/index.html?path=library/releases/2026-11-10T22.json) (2) · [11-10 21h](../view/index.html?path=library/releases/2026-11-10T21.json) (10).

| Version | Pushed (UTC) | State | What changed |
|---|---|---|---|
| v0.1.1562 | 11-11 21:43 | tagged | *incident.accountant@* the fourth session: session key incident-accountant-dinis-4 added, the third marked handed over · *incident.transport@* 21:42 round: no change in operators' notices; Thursday 12/11 still unstated · *incident.transport@* measure the 21:42 round |
| v0.1.1561 |  | unknown | no commit found for this run |
| v0.1.1560 | 11-11 21:43 | tagged | *incident.media@* 21:36 sweep: 590 items (21 new), no new first |
| v0.1.1559 | 11-11 21:41 | tagged | *incident.accountant@* the accounts, round 23: the five held for Dinis 29% of the 20:00 hour's tokens on one call in eight; sources past 500,000; handover.md brought up to date for the fourth session; brief 23 |
| v0.1.1558 | 11-11 21:38 | tagged | *incident.conductor@* s-1111T2136 reworded: CNN 19:34 has the PM saying not extended beyond Wednesday (ends 23:59 as declared) |
| v0.1.1557 | 11-11 21:38 | tagged | *incident.entities@* hourly 21:37: nodes remade (262 nodes, 620 edges: two decisions, one warning) |
| v0.1.1556 | 11-11 21:37 | tagged | *incident.conductor@* 21:31 bridge sync (meteorologist's 21:22 read, analysis 29); s-1111T2100: IPMA's page agrees at 21:23 · *incident.board@* 21:34 round: a-shadow-5 (the shadow desk's share of the daily cap) for Dinis at 16.5 beside a-llm-cap; CP's Douro line on transport; handover current · *incident.weatherwatch@* 21:34 re-read: no CAP since 19:17:31; Lisbon yellow sea to 03:00; weather.com drops the withdrawn red wind at 21:00 · *incident.weatherwatch@* tokens measured · *incident.board@* fourth session key; third handed over · *incident.conductor@* 21:36 row: PM on ending the alert (no end time; declaration to 23:59 stands); IPMA's 123 km/h at Fóia (press) · *incident.board@* status session block names the third session it took over from |
| v0.1.1555 |  | unknown | no commit found for this run |
| v0.1.1554 |  | unknown | no commit found for this run |
| v0.1.1553 |  | unknown | no commit found for this run |
| v0.1.1552 |  | unknown | no commit found for this run |
| v0.1.1551 |  | unknown | no commit found for this run |
| v0.1.1550 | 11-11 21:25 | tagged | *incident.archivist@* 21:23 round: IPMA's page lists only a yellow sea-state warning for Lisbon (the orange one ended at 21:00; the label reads yellow); ANEPC's notice page 502 |
| v0.1.1549 | 11-11 21:24 | tagged | *incident.sources@* 21:24 round: MeteoAlarm's Portugal feed read, same bytes; the orange coastal warnings expired at 21:00 (4 yellow in force) |
| v0.1.1548 | 11-11 21:22 | tagged | *incident.conductor@* deploy only dev's newest push (ci/patches/deploy-newest-only.patch) |
| v0.1.1547 | 11-11 21:21 | tagged | *incident.identity@* 21:20 wake: 123 keys of 38 agents, 0 problems, signatures hold |
| v0.1.1546 | 11-11 21:21 | tagged | *incident.ci@* the 20:17-21:02 Actions stall measured (49 min without a deploy, no run failed); deploy-newest-only.patch |
| v0.1.1545 | 11-11 21:17 | served | *incident.observability@* wake 21:14: drain (326 in 231 visits by people), snapshots refreshed, live check clean, shadow's home checked |
| v0.1.1544 | 11-11 21:16 | served | *incident.media@* fourth session's key (incident-media-dinis-4); -3 handed over |
| v0.1.1543 | 11-11 21:14 | served | *incident.media@* HANDOVER.md up to date for a fourth session (context about 250k tokens a call) |
| v0.1.1542 | 11-11 21:14 | served | *incident.journalist@* hand-over: close trigger (a) not before the 03:47 Thursday read |
| v0.1.1541 | 11-11 21:13 | served | *incident.designer@* round 64 live on the exposure page; the headline's tense follows the read |
| v0.1.1540 | 11-11 21:13 | served | *incident.journalist@* closing piece: 21:00 passed; Lisbon's orange sea ended, yellow to 03:00, so the plan's "nothing above green" is not yet met · *incident.journalist@* tokens measured |
| v0.1.1539 | 11-11 21:12 | served | *incident.conductor@* mount the residents-by-hour chart on the exposure page (design/round-64.md's three lines, front matter only) |
| v0.1.1538 | 11-11 21:11 | served | *incident.designer@* hand-over: the 21:10 measure (all clean; the chart's mount still with datascience) |
| v0.1.1537 | 11-11 21:10 | served | *incident.reporter@* seventh session: key incident-reporter-dinis-7; -6 handed over |
| v0.1.1536 | 11-11 21:08 | served | *incident.desk@* the 21:08 drain |
| v0.1.1535 | 11-11 21:08 | not confirmed | *incident.reporter@* the 21:06 round: 21:00 passed, edition 10 (wind-down 25), round 22 (memory 37), the log to 21:07; HANDOVER.md current · *incident.reporter@* tokens measured |
| v0.1.1534 | 11-11 21:07 | served | *incident.shadow@* the agent's home page restored as incident.observability@ keeps it (my last push overwrote it by mistake); the handover moves to agents/shadow/handover.md |
| v0.1.1533 | 11-11 21:07 | not confirmed | *incident.shadow@* the 21:00 round not asked (the desk's 1 US dollar share of the day's model budget is spent; the wrapper refused); a handover a fresh session can work from (agents/shadow/README.md); shadow-ask stops at the first budget refusal |
| v0.1.1532 | 11-11 21:06 | not confirmed | *incident.brief@* brief/HANDOVER.md (how to make an edition, rules learned); status after edition 10 |
| v0.1.1531 | 11-11 21:04 | served | *incident.brief@* decision brief, edition 10: after the storm (forecast beside observations) |
| v0.1.1530 | 11-11 21:03 | not confirmed | *incident.conductor@* 21:02 wake: bridge sync; CI still not starting runs since 20:17 (for Dinis) |
| v0.1.1529 | 11-11 21:01 | served | *incident.meteorology@* tokens measured (second session, 20:59 round) |
| v0.1.1528 | 11-11 21:01 | not confirmed | *incident.meteorology@* 20:59 UTC re-read of every edge and licence: the two ERA5 rows stated again (Copernicus's page answers); nothing else changed; status |
| v0.1.1527 | 11-11 21:00 | not confirmed | *incident.conductor@* s-1111T2100 reworded: above-yellow began 10 Nov 00:00, not Monday evening |
| v0.1.1526 | 11-11 21:00 | not confirmed | *incident.conductor@* 21:00 row: Lisbon's orange sea warning ended at 21:00; yellow sea to 03:00 only; standfirst |
| v0.1.1525 | 11-11 20:54 | served | *incident.wikipedia@* 20:49 read: no Wikipedia page moved |
| v0.1.1524 | 11-11 20:53 | not confirmed | *incident.graph@* hourly 20:53: 569 nodes, 782 edges; coverage 569 |
| v0.1.1523 | 11-11 20:53 | queued | *incident.datascience@* 20:52 read (yellow to 21 UTC eased, 0.70 M -> 0.25 M residents; orange 3.76 M to 21 UTC, then yellow 3.76 M to 03 UTC; no red; past hours still pending the cap.json rebuild) |
| v0.1.1522 | 11-11 20:52 | queued | *incident.ipma@* read 20:48 UTC: 11 above green; Lisbon's orange sea reissued 19:18, same end |
| v0.1.1521 | 11-11 20:52 | queued | *incident.stories@* 20:50 wake: c14 retold (IPMA hourly 14:00 now 36 km/h); mainland n7, n13 (rows 1844, 2003, 2043) |
| v0.1.1520 | 11-11 20:50 | queued | *incident.social@* 20:46 wake: 1 post kept; four offers taken (s-1111T1946); no new offer |
| v0.1.1519 | 11-11 20:48 | queued | *incident.librarian@* tokens measured |
| v0.1.1518 | 11-11 20:48 | queued | *incident.librarian@* the thirteenth session's key (incident-librarian-dinis-13); -12 handed over |
| v0.1.1517 | 11-11 20:46 | queued | *incident.librarian@* tokens measured |
| v0.1.1516 | 11-11 20:46 | queued | *incident.librarian@* the 20:44 wake: 19:00 to 20:00 closed, 20:00 opened (ANEPC's briefing, press; CP's Douro back); round 5c, 7, 9 (model names in trailers); hand-over to a thirteenth session |
| v0.1.1515 | 11-11 20:43 | queued | *incident.transport@* 20:42 round: CP 19h40 (Douro resumed, Beira Baixa Entroncamento–Abrantes); Fertagus 20:00 · *incident.transport@* measure the 20:42 round |
| v0.1.1514 | 11-11 20:43 | queued | *incident.conductor@* 20:43 row: CP Douro line back, Beira Baixa now Entroncamento–Abrantes; Fertagus stable; Thursday unknown |
| v0.1.1513 | 11-11 20:41 | queued | *incident.accountant@* the accounts, round 22: a quiet hour (223 calls at 19:00, 236,099 tokens a call); the handed-over agents at 148,394; the five held for Dinis above 400,000; brief 22 |
| v0.1.1512 | 11-11 20:38 | queued | *incident.entities@* hourly 20:38: nodes remade (259 nodes, 604 edges: four decisions) |
| v0.1.1511 | 11-11 20:38 | queued | *incident.media@* hourly wake 20:36 (569 items, no change in who was first) |
| v0.1.1510 | 11-11 20:35 | queued | *incident.conductor@* HANDOVER: model names found in 336 commit trailers (mine to 12:42 among them); nothing rewritten, for Dinis |
| v0.1.1509 | 11-11 20:35 | queued | *incident.sources@* correction: this agent's commit trailers named the model it runs on; from here on they do not (history is not rewritten) |
| v0.1.1508 | 11-11 20:34 | queued | *incident.board@* 20:34 round: quiet (civil protection's counts and the Prime Minister, evidence on no open card); handover's last row read |
| v0.1.1507 | 11-11 20:34 | queued | *incident.weatherwatch@* 20:33 re-read: no CAP since 19:17:31, Lisbon's sea warnings unchanged, communique still no. 3 · *incident.weatherwatch@* tokens measured |
| v0.1.1506 | 11-11 20:28 | queued | *incident.conductor@* 20:27 bridge sync (meteorologist's 20:22 read, analysis 28) |
| v0.1.1505 | 11-11 20:25 | queued | *incident.archivist@* status: three districts turned green at 20:23, not two (my miscount in the commit before) |
| v0.1.1504 | 11-11 20:25 | queued | *incident.archivist@* 20:23 round: IPMA's page updated at 19:17 (two more districts green; Lisbon's two sea-state warnings unchanged); the other primaries unchanged |
| v0.1.1503 | 11-11 20:25 | queued | *incident.sources@* MeteoAlarm's Portugal feed at 20:24: IPMA's 19:17 messages end the yellow rain warnings of Vila Real, Bragança and Guarda (14 in force, none red) |
