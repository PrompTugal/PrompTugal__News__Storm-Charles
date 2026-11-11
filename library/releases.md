# The release history: every version, what changed, and whether it was served

> Kept by incident.librarian@web-summit.dinis, 2026-11-11, 23:24 UTC. Built by [tools/library-releases.mjs](../tools/library-releases.mjs) from the tags, the commit subjects and the deploy workflow's runs as incident.ci@ keeps them ([the pipeline](../ci/README.md)), read at that time; the data is [releases.json](releases.json). Back to [the library](README.md).

CI numbers every push (`v0.1.<run>`), deploys it and tags it; nobody who pushes writes a number ([BRIEF-CORRECTIONS.md](../BRIEF-CORRECTIONS.md)). Until about 23:55 UTC on 10 November the newest push cancelled a run in progress; since then a running deploy finishes and only a run still waiting is replaced (the workflow's own comment), so a later "cancelled" should mean it never started. **1743 runs: 1206 served (confirmed by CI), 21 deployed and tagged but cancelled before CI confirmed, 477 cancelled before the tag, 6 failed, 33 still running or unknown when read.**

## Versions never confirmed served

483 of 1743. The newest: v0.1.1715, v0.1.1713, v0.1.1711, v0.1.1707, v0.1.1695, v0.1.1690, v0.1.1688, v0.1.1675, v0.1.1673, v0.1.1666, v0.1.1664, v0.1.1659, v0.1.1656, v0.1.1655, v0.1.1652, v0.1.1650, v0.1.1647, v0.1.1646, v0.1.1644, v0.1.1643, v0.1.1642, v0.1.1640, v0.1.1635, v0.1.1633, v0.1.1630, v0.1.1628, v0.1.1627, v0.1.1625, v0.1.1624, v0.1.1622. Each hour's file lists every version with its state.

**This is not a list of versions that were never deployed**, and none can be made from the runs alone: a cancelled deploy step can still go live. Run 32: served: /version.json answered v0.1.32 with commit 487818fc40 when read at 23:49 UTC, although the run's deploy step is recorded as cancelled (job 130213112738) and no tag was pushed (incident.librarian@). Each of these versions' commits is contained in the next served version, so no change was lost; what is not known is whether a reader was ever served that exact number.

## The newest sixty versions

What changed is each commit's own subject, as its agent wrote it. Every version, hour by hour, as data: [11-11 23h](../view/index.html?path=library/releases/2026-11-11T23.json) (49) · [mmit-foundh](../view/index.html?path=library/releases/no-commit-found.json) (9) · [11-11 22h](../view/index.html?path=library/releases/2026-11-11T22.json) (114) · [11-11 21h](../view/index.html?path=library/releases/2026-11-11T21.json) (46) · [11-11 20h](../view/index.html?path=library/releases/2026-11-11T20.json) (31) · [11-11 19h](../view/index.html?path=library/releases/2026-11-11T19.json) (38) · [11-11 18h](../view/index.html?path=library/releases/2026-11-11T18.json) (41) · [11-11 17h](../view/index.html?path=library/releases/2026-11-11T17.json) (32) · [11-11 16h](../view/index.html?path=library/releases/2026-11-11T16.json) (53) · [11-11 15h](../view/index.html?path=library/releases/2026-11-11T15.json) (56) · [11-11 14h](../view/index.html?path=library/releases/2026-11-11T14.json) (58) · [11-11 13h](../view/index.html?path=library/releases/2026-11-11T13.json) (57) · [11-11 12h](../view/index.html?path=library/releases/2026-11-11T12.json) (144) · [11-11 11h](../view/index.html?path=library/releases/2026-11-11T11.json) (84) · [11-11 10h](../view/index.html?path=library/releases/2026-11-11T10.json) (131) · [11-11 09h](../view/index.html?path=library/releases/2026-11-11T09.json) (83) · [11-11 08h](../view/index.html?path=library/releases/2026-11-11T08.json) (41) · [11-11 07h](../view/index.html?path=library/releases/2026-11-11T07.json) (38) · [11-11 06h](../view/index.html?path=library/releases/2026-11-11T06.json) (37) · [11-11 05h](../view/index.html?path=library/releases/2026-11-11T05.json) (75) · [11-11 04h](../view/index.html?path=library/releases/2026-11-11T04.json) (64) · [11-11 03h](../view/index.html?path=library/releases/2026-11-11T03.json) (116) · [11-11 02h](../view/index.html?path=library/releases/2026-11-11T02.json) (171) · [11-11 01h](../view/index.html?path=library/releases/2026-11-11T01.json) (34) · [11-11 00h](../view/index.html?path=library/releases/2026-11-11T00.json) (65) · [11-10 23h](../view/index.html?path=library/releases/2026-11-10T23.json) (64) · [11-10 22h](../view/index.html?path=library/releases/2026-11-10T22.json) (2) · [11-10 21h](../view/index.html?path=library/releases/2026-11-10T21.json) (10).

| Version | Pushed (UTC) | State | What changed |
|---|---|---|---|
| v0.1.1743 | 11-11 23:43 | tagged | *incident.transport@* 23:41 round: LPPT/LPMA live from adsb.lol via incident.flights@ (first); CP's storm notice extended to Thursday 12/11 (its 21h30 update); gloss 6 asked |
| v0.1.1742 | 11-11 23:42 | tagged | *incident.accountant@* the accounts, round 25: the conductor at 714,579 a call; model spend 2.50 of 20; the provider's account in credit again; seven hand-overs; brief 25 |
| v0.1.1741 | 11-11 23:39 | tagged | *incident.media@* 23:36 sweep: 616 items (8 new), no new first |
| v0.1.1740 | 11-11 23:38 | tagged | *incident.entities@* hourly 23:37: nodes remade (264 nodes, 622 edges, unchanged) |
| v0.1.1739 | 11-11 23:38 | tagged | *incident.conductor@* trace: two flights-page jobs |
| v0.1.1738 | 11-11 23:37 | tagged | *incident.conductor@* BRIEF: Dinis ~23:38 on the flights page (better map, more planes, motion, a list, the explanation) |
| v0.1.1737 | 11-11 23:35 | tagged | *incident.board@* 23:34 round: no card moved; status files synced · *incident.board@* tokens measured (23:34 round) |
| v0.1.1736 |  | unknown | no commit found for this run |
| v0.1.1735 | 11-11 23:34 | tagged | *incident.models@* HANDOVER time read from date -u (23:33) · *incident.designer@* round 69: weather@'s chart text confirmed (/ at 390: 84 -> 0 under 11 px) |
| v0.1.1734 |  | unknown | no commit found for this run |
| v0.1.1733 | 11-11 23:33 | tagged | *incident.models@* wake 23:31: press decisions (10 read, 0 leads), delegated summary, call index; tokens measured · *incident.weatherwatch@* 23:31 re-read (CAP batch 22:43:28, yellow rain north only; Lisbon yellow sea to 03:00) · *incident.weatherwatch@* tokens measured · *incident.weatherwatch@* correct the 23:31 re-read's updated times to the clock (23:33) · *incident.models@* HANDOVER for a fourth session (context about 175k a call) |
| v0.1.1732 |  | unknown | no commit found for this run |
| v0.1.1731 |  | unknown | no commit found for this run |
| v0.1.1730 |  | unknown | no commit found for this run |
| v0.1.1729 | 11-11 23:32 | tagged | *incident.weather@* chart and map labels drawn at their stated size on a phone (designer@'s round 69: 84 to 0 under 11 px) |
| v0.1.1728 | 11-11 23:30 | tagged | *incident.observability@* HANDOVER: the eleventh session, and the data/agents split's new shape · *incident.observability@* HANDOVER: the split's time corrected to date -u (23:28, not 23:33) |
| v0.1.1727 |  | unknown | no commit found for this run |
| v0.1.1726 | 11-11 23:30 | tagged | *incident.conductor@* policy: the temporary grant to observability for the data/agents split removed (landed in 3baed26a) |
| v0.1.1725 | 11-11 23:28 | tagged | *incident.conductor@* 23:28 bridge sync (meteorologist's 23:22 read, analysis 31); row: the new Lisbon airport forecast for Thursday |
| v0.1.1724 | 11-11 23:27 | tagged | *incident.observability@* data/agents/sessions.json and index.json split a file per agent (each was within 5 KB of the gate) |
| v0.1.1723 | 11-11 23:26 | tagged | *incident.sources@* MeteoAlarm's Portugal feed at 23:25: IPMA's nine new yellow rain warnings for Thursday in the north (sent 22:43); the second reader agrees on 25 of 25 · *incident.ci@* superseded-no-build.patch marked applied (505298b6, live from run 1716); the file removed · *incident.conductor@* policy for the data/agents split: data/agents/** to observability; four readers shared with it for that one change (to be removed after) |
| v0.1.1722 |  | unknown | no commit found for this run |
| v0.1.1721 |  | unknown | no commit found for this run |
| v0.1.1720 | 11-11 23:26 | tagged | *incident.archivist@* 23:23 round: IPMA's page updated at 22:43 (Lisbon the same yellow sea-state warning; six northern districts read yellow again); the other primaries unchanged · *incident.ci@* ci-read.mjs names the tag job's step "tag" (it read as "checkout": its name says "no checkout"); three-job runs read again |
| v0.1.1719 |  | unknown | no commit found for this run |
| v0.1.1718 | 11-11 23:24 | tagged | *incident.aws@* kept-by time corrected to date -u (23:24) |
| v0.1.1717 | 11-11 23:24 | tagged | *incident.aws@* 23:23 wake: Runtime's PUBLIC network mode confirmed in AWS docs; OpenRouter trace fields in section 6 |
| v0.1.1716 | 11-11 23:22 | served | *incident.designer@* README: the flights map's area attribute, and mounts go in front matter (flights@'s note) |
| v0.1.1715 | 11-11 23:22 | not confirmed | *incident.conductor@* superseded runs skip the gate and brief PDFs too (ci/patches/superseded-no-build.patch: ~154 s of pages-group time an hour) |
| v0.1.1714 | 11-11 23:22 | served | *incident.identity@* 23:20 wake: 141 keys of 40 agents, 0 problems; hand-overs are archived by their own sessions; signatures hold |
| v0.1.1713 | 11-11 23:21 | not confirmed | *incident.ci@* HANDOVER: kept-by time corrected to date -u (23:21) |
| v0.1.1712 | 11-11 23:21 | served | *incident.designer@* hand-over: the ninth session (round 69, Madeira, print, the 23:21 measure); chart text under 11 px on / for weather@ |
| v0.1.1711 | 11-11 23:21 | not confirmed | *incident.ci@* hourly wake 23:18 (90 runs, no failure; the three-job deploy measured over 38 deploys); superseded-no-build.patch for the conductor |
| v0.1.1710 | 11-11 23:21 | served | *incident.observability@* key incident-observability-dinis-11 published; -10 handed over and archived |
| v0.1.1709 | 11-11 23:19 | served | *incident.observability@* HANDOVER: for the eleventh session (context about 188,000 a call; sessions.json and index.json near 256 KB) |
| v0.1.1708 | 11-11 23:19 | served | *incident.observability@* wake 23:15: views, trace backfill (feed link to /data/trace/), tokens measured · *incident.observability@* data/agents/sessions.json under 256 KB: the measured source said once (measured_source), not per session |
| v0.1.1707 | 11-11 23:19 | not confirmed | *incident.designer@* round 69: the flights map in print (keeps its time, figure on one page, no dead tables control) |
| v0.1.1706 | 11-11 23:18 | served | *incident.flights@* /flights/: Madeira as a second map (incident.designer@'s round 69), Lisbon and Madeira headings |
| v0.1.1705 | 11-11 23:17 | served | *incident.designer@* round 69: the flights map draws Madeira too (data-flightmap-area="madeira"; LPMA, funchal snapshots, Madeira coast); hours without a METAR no longer stop it |
| v0.1.1704 | 11-11 23:13 | served | *incident.journalist@* the 23:12 round: closing piece dated line (IPMA's Thursday warnings, none for Lisbon; Dinis ~22:20); tokens measured |
| v0.1.1703 | 11-11 23:13 | served | *incident.designer@* ninth session key (incident-designer-dinis-9); -8 handed over to data/keys-archive/designer.json |
| v0.1.1702 | 11-11 23:12 | served | *incident.observability@* trace: model calls with no parent loop as one A1 aggregate per agent, task and hour; data/trace/ 17 to 6.0 MB |
| v0.1.1701 | 11-11 23:11 | served | *incident.designer@* hand-over: the 23:10 measure; the list is current for a ninth session |
| v0.1.1700 | 11-11 23:11 | served | *incident.observability@* data/trace/index.json made by the build (tools/trace-index.mjs), not tracked; agents' trace calls no longer write it |
| v0.1.1699 | 11-11 23:08 | served | *incident.reporter@* the 23:06 round: IPMA's Thursday warnings northern only (wind-down 27), round 24, nine hand-overs, keys split (memory 39), the log block; HANDOVER seventh section; first trace lines · *incident.reporter@* tokens measured |
| v0.1.1698 | 11-11 23:08 | served | *incident.desk@* the 23:08 drain |
| v0.1.1697 | 11-11 23:05 | served | *incident.flights@* second session takes over: status, publisher's session line; hand-over time 23:04 |
| v0.1.1696 | 11-11 23:04 | served | *incident.flights@* hourly: snapshots, crosswind, summary, index (23:04 UTC) |
| v0.1.1695 | 11-11 23:04 | not confirmed | *incident.journalist@* three supports re-anchored after incident.models@'s round 2 (an-empty-account e5, e6; what-it-cost k3), dated on the pages |
| v0.1.1694 | 11-11 23:03 | served | *incident.flights@* second session key (incident-flights-dinis-2); -1 handed over to data/keys-archive/flights.json |
| v0.1.1693 | 11-11 23:03 | served | *incident.conductor@* 23:03 wake: bridge sync; measure line |
| v0.1.1692 | 11-11 23:02 | served | *incident.librarian@* fifteenth session key (incident-librarian-dinis-15); -14 handed over |
| v0.1.1691 | 11-11 23:02 | served | *incident.flights@* HANDOVER.md; poller and publisher scripts into agents/flights/bin |
| v0.1.1690 | 11-11 23:01 | not confirmed | *incident.conductor@* policy: the temporary grant to identity for the keys split removed (split landed in 5f3e9983) |
| v0.1.1689 | 11-11 23:01 | served | *incident.flights@* tokens measured |
| v0.1.1688 | 11-11 23:00 | not confirmed | *incident.conductor@* 23:00 row: IPMA's Thursday warnings, yellow rain in six northern districts (CAP 22:43); nothing for Lisbon or Madeira |
| v0.1.1687 | 11-11 23:00 | served | *incident.identity@* data/keys.json split (261 KB, over the gate): active keys stay, earlier ones to data/keys-archive/<role>.json; one loader (tools/lane-keystore.mjs) for every reader |
| v0.1.1686 | 11-11 23:00 | served | *incident.flights@* hourly: snapshots, crosswind, summary, index (23:00 UTC) |
| v0.1.1685 | 11-11 22:59 | served | *incident.conductor@* policy for the keys split: data/keys-archive/** shared; tools/lane-keystore.mjs to identity; the 14 readers shared with identity for that one change (to be removed after) |
| v0.1.1684 | 11-11 22:57 | served | *incident.wikipedia@* 22:51 read: no Wikipedia page moved |
