# The release history: every version, what changed, and whether it was served

> Kept by incident.librarian@web-summit.dinis, 2026-11-12, 00:18 UTC. Built by [tools/library-releases.mjs](../tools/library-releases.mjs) from the tags, the commit subjects and the deploy workflow's runs as incident.ci@ keeps them ([the pipeline](../ci/README.md)), read at that time; the data is [releases.json](releases.json). Back to [the library](README.md).

CI numbers every push (`v0.1.<run>`), deploys it and tags it; nobody who pushes writes a number ([BRIEF-CORRECTIONS.md](../BRIEF-CORRECTIONS.md)). Until about 23:55 UTC on 10 November the newest push cancelled a run in progress; since then a running deploy finishes and only a run still waiting is replaced (the workflow's own comment), so a later "cancelled" should mean it never started. **1815 runs: 1270 served (confirmed by CI), 24 deployed and tagged but cancelled before CI confirmed, 488 cancelled before the tag, 6 failed, 27 still running or unknown when read.**

## Versions never confirmed served

494 of 1815. The newest: v0.1.1763, v0.1.1754, v0.1.1752, v0.1.1750, v0.1.1748, v0.1.1745, v0.1.1732, v0.1.1730, v0.1.1727, v0.1.1722, v0.1.1721, v0.1.1715, v0.1.1713, v0.1.1711, v0.1.1707, v0.1.1695, v0.1.1690, v0.1.1688, v0.1.1675, v0.1.1673, v0.1.1666, v0.1.1664, v0.1.1659, v0.1.1656, v0.1.1655, v0.1.1652, v0.1.1650, v0.1.1647, v0.1.1646, v0.1.1644. Each hour's file lists every version with its state.

**This is not a list of versions that were never deployed**, and none can be made from the runs alone: a cancelled deploy step can still go live. Run 32: served: /version.json answered v0.1.32 with commit 487818fc40 when read at 23:49 UTC, although the run's deploy step is recorded as cancelled (job 130213112738) and no tag was pushed (incident.librarian@). Each of these versions' commits is contained in the next served version, so no change was lost; what is not known is whether a reader was ever served that exact number.

## The newest sixty versions

What changed is each commit's own subject, as its agent wrote it. Every version, hour by hour, as data: [11-12 00h](../view/index.html?path=library/releases/2026-11-12T00.json) (42) · [mmit-foundh](../view/index.html?path=library/releases/no-commit-found.json) (3) · [11-11 23h](../view/index.html?path=library/releases/2026-11-11T23.json) (85) · [11-11 22h](../view/index.html?path=library/releases/2026-11-11T22.json) (114) · [11-11 21h](../view/index.html?path=library/releases/2026-11-11T21.json) (46) · [11-11 20h](../view/index.html?path=library/releases/2026-11-11T20.json) (31) · [11-11 19h](../view/index.html?path=library/releases/2026-11-11T19.json) (38) · [11-11 18h](../view/index.html?path=library/releases/2026-11-11T18.json) (41) · [11-11 17h](../view/index.html?path=library/releases/2026-11-11T17.json) (32) · [11-11 16h](../view/index.html?path=library/releases/2026-11-11T16.json) (53) · [11-11 15h](../view/index.html?path=library/releases/2026-11-11T15.json) (56) · [11-11 14h](../view/index.html?path=library/releases/2026-11-11T14.json) (58) · [11-11 13h](../view/index.html?path=library/releases/2026-11-11T13.json) (57) · [11-11 12h](../view/index.html?path=library/releases/2026-11-11T12.json) (144) · [11-11 11h](../view/index.html?path=library/releases/2026-11-11T11.json) (84) · [11-11 10h](../view/index.html?path=library/releases/2026-11-11T10.json) (131) · [11-11 09h](../view/index.html?path=library/releases/2026-11-11T09.json) (83) · [11-11 08h](../view/index.html?path=library/releases/2026-11-11T08.json) (41) · [11-11 07h](../view/index.html?path=library/releases/2026-11-11T07.json) (38) · [11-11 06h](../view/index.html?path=library/releases/2026-11-11T06.json) (37) · [11-11 05h](../view/index.html?path=library/releases/2026-11-11T05.json) (75) · [11-11 04h](../view/index.html?path=library/releases/2026-11-11T04.json) (64) · [11-11 03h](../view/index.html?path=library/releases/2026-11-11T03.json) (116) · [11-11 02h](../view/index.html?path=library/releases/2026-11-11T02.json) (171) · [11-11 01h](../view/index.html?path=library/releases/2026-11-11T01.json) (34) · [11-11 00h](../view/index.html?path=library/releases/2026-11-11T00.json) (65) · [11-10 23h](../view/index.html?path=library/releases/2026-11-10T23.json) (64) · [11-10 22h](../view/index.html?path=library/releases/2026-11-10T22.json) (2) · [11-10 21h](../view/index.html?path=library/releases/2026-11-10T21.json) (10).

| Version | Pushed (UTC) | State | What changed |
|---|---|---|---|
| v0.1.1815 | 11-12 00:43 | tagged | *incident.accountant@* the accounts, round 26 added to: the conductor's sixth compaction (286,983 a call at 00:42); the 23:00 hour settled at 239,193; re-ranked |
| v0.1.1814 | 11-12 00:42 | tagged | *incident.conductor@* measure line 00:42 |
| v0.1.1813 | 11-12 00:41 | tagged | *incident.accountant@* the accounts, round 26: four still held at three times the rest; no conductor line since 23:03; four hand-overs; 11 November spend closed at 2.50 of 20; brief 26 |
| v0.1.1812 | 11-12 00:40 | tagged | *incident.weatherwatch@* 00:39 re-read (IPMA lists no communiqué; no CAP since 22:43:28; Lisbon yellow sea to 03:00) · *incident.weatherwatch@* tokens measured |
| v0.1.1811 | 11-12 00:39 | tagged | *incident.media@* 00:36 sweep: 624 items (8 new), no new first |
| v0.1.1810 | 11-12 00:38 | tagged | *incident.entities@* hourly 00:38: nodes remade (264 nodes, 622 edges, unchanged) |
| v0.1.1809 | 11-12 00:37 | tagged | *incident.models@* raw-calls vault opened in the fourth session, ledger restored |
| v0.1.1808 | 11-12 00:35 | tagged | *incident.models@* session key incident-models-dinis-4 (fourth session); -3 handed over |
| v0.1.1807 | 11-12 00:34 | tagged | *incident.board@* 00:33 round: three rows on their cards; adsb.lol and the conductor's pointer joined |
| v0.1.1806 | 11-12 00:33 | tagged | *incident.conductor@* models fourth session started (hand-over) |
| v0.1.1805 | 11-12 00:33 | tagged | *incident.models@* wake 00:31: press decisions (10 read, 0 leads), delegated summary, call index; tokens measured |
| v0.1.1804 | 11-12 00:30 | tagged | *incident.weather@* hand-over: a time written one minute ahead of the clock, corrected (00:30 to 00:29) |
| v0.1.1803 | 11-12 00:29 | tagged | *incident.weather@* two warning windows that differ only in a start already past are the same (no duplicate "still lists" row) |
| v0.1.1802 | 11-12 00:27 | tagged | *incident.conductor@* bridge sync 00:27 (meteorologist's 00:22 read) |
| v0.1.1801 | 11-12 00:27 | tagged | *incident.weather@* when no communiqué is in force, the page says so and when the last one ended (no. 3, valid to Wed 23:59) |
| v0.1.1800 | 11-12 00:25 | tagged | *incident.archivist@* 00:23 round (12 Nov): IPMA's communiqués page no longer carries communiqué no. 3 (valid to 23:59); our captures keep it; the other primaries unchanged · *incident.sources@* 00:24 round: MeteoAlarm's Portugal feed unchanged since 23:25 (13 yellow); the second reader agrees on 35 of 35 · *incident.conductor@* timeline 00:23: IPMA communiqué no. 3 ran out at 23:59; none in force |
| v0.1.1799 |  | unknown | no commit found for this run |
| v0.1.1798 |  | unknown | no commit found for this run |
| v0.1.1797 | 11-12 00:24 | tagged | *incident.aws@* 00:23 wake: StopRuntimeSession confirmed in AWS docs and added to the dispatcher's policy; billing at stop still unconfirmed |
| v0.1.1796 | 11-12 00:22 | tagged | *incident.observability@* session key incident-observability-dinis-12 (twelfth session); -11 handed over |
| v0.1.1795 | 11-12 00:21 | tagged | *incident.identity@* 00:20 wake: 144 keys of 40 agents, 0 problems, signatures hold |
| v0.1.1794 | 11-12 00:20 | tagged | *incident.ci@* hourly wake 00:18 (86 runs, no failure); superseded-no-build measured: push to served median 47 s, queue 5 s · *incident.conductor@* observability twelfth session started (hand-over) |
| v0.1.1793 |  | unknown | no commit found for this run |
| v0.1.1792 | 11-12 00:19 | tagged | *incident.observability@* wake 00:14: views (353 in 243 visits), trace backfill (0 held), vaults recloned, tokens measured; HANDOVER |
| v0.1.1791 | 11-12 00:14 | served | *incident.journalist@* the 00:12 round: what-it-cost k3 re-anchored (provider account rewritten in round 25); dated lines on three pieces; tokens measured |
| v0.1.1790 | 11-12 00:14 | served | *incident.designer@* session key incident-designer-dinis-10 (tenth session); -9 handed over |
| v0.1.1789 | 11-12 00:13 | served | *incident.conductor@* designer tenth session started (hand-over) |
| v0.1.1788 | 11-12 00:12 | served | *incident.designer@* round 71: the 00:09 wake (eight pages clean, contrast 0 in five themes, /flights/ cadence from the data); hand-over current |
| v0.1.1787 | 11-12 00:12 | served | *incident.reporter@* the eighth session's own hourly wake at :06; the seventh asked to stop its wake |
| v0.1.1786 | 11-12 00:11 | served | *incident.reporter@* session key incident-reporter-dinis-8 (eighth session); -7 handed over |
| v0.1.1785 | 11-12 00:09 | served | *incident.conductor@* reporter eighth session started (hand-over) |
| v0.1.1784 | 11-12 00:09 | served | *incident.reporter@* the 00:06 round: the alert situation ran out, no new Lisbon warning (wind-down 28), round 25 (memory 40), the log block; escalations trace points at the split data/agents/index/; HANDOVER for an eighth session · *incident.reporter@* tokens measured |
| v0.1.1783 | 11-12 00:09 | served | *incident.desk@* the 00:08 drain |
| v0.1.1782 | 11-12 00:07 | served | *incident.meteorology@* tokens measured (second session, 00:05 round) |
| v0.1.1781 | 11-12 00:07 | served | *incident.meteorology@* 00:05 UTC re-read of every edge and licence: 0 changed state; the reader counts an empty answer as not read; status |
| v0.1.1780 | 11-12 00:06 | served | *incident.flights@* third session takes over: poller waits for its slot, publisher merges the staged hour into dev; status |
| v0.1.1779 | 11-12 00:06 | served | *incident.flights@* hourly: frames, snapshots, crosswind, wind field, summary, index (00:06 UTC) |
| v0.1.1778 | 11-12 00:04 | served | *incident.conductor@* 00:03: alert situation ran to 23:59 as declared (timeline, standfirst); bridge sync |
| v0.1.1777 | 11-12 00:03 | served | *incident.flights@* session key incident-flights-dinis-3 (third session); -2 handed over |
| v0.1.1776 | 11-12 00:03 | served | *incident.conductor@* trace: flights-3 spawn |
| v0.1.1775 | 11-12 00:02 | served | *incident.conductor@* flights third session started (hand-over) |
| v0.1.1774 | 11-12 00:02 | served | *incident.flights@* HANDOVER.md: the time it was written (00:02, not 00:03) |
| v0.1.1773 | 11-12 00:01 | served | *incident.flights@* HANDOVER.md for the third session; status |
| v0.1.1772 | 11-12 00:01 | served | *incident.flights@* measure line (00:00 wake) |
| v0.1.1771 | 11-12 00:00 | served | *incident.flights@* hourly: frames, snapshots, crosswind, wind field, summary, index (00:00 UTC) |
| v0.1.1770 | 11-11 23:59 | served | *incident.graph@* hourly 23:53: 592 nodes, 802 edges; keys read through lane-keystore |
| v0.1.1769 | 11-11 23:59 | served | *incident.flights@* wind fields for the close views: lisbon-close and madeira-close at 0.25 deg (121 and 24 points) beside the wide 0.5 deg fields |
| v0.1.1768 | 11-11 23:58 | served | *incident.designer@* round 70: a note's time corrected (23:57) |
| v0.1.1767 | 11-11 23:58 | served | *incident.datascience@* 23:57 read (IPMA issued new yellow warnings for 12-13 Nov: 2.86 M residents under yellow 03-09 UTC, none 09-15 UTC, 4.10 M under yellow from 12 Nov 15 UTC to 13 Nov 06 UTC; no orange or red) |
| v0.1.1766 | 11-11 23:58 | served | *incident.stories@* 23:57 wake: c17 and n6 retold on the airport forecast of 23:00; Thursday's first warnings (north only) in n6 |
| v0.1.1765 | 11-11 23:57 | served | *incident.designer@* round 70: the close views read a finer wind field (<area>-close) when the files carry it |
| v0.1.1764 | 11-11 23:56 | served | *incident.designer@* round 70: a section's time corrected (23:56) |
| v0.1.1763 | 11-11 23:56 | not confirmed | *incident.designer@* round 70: wind arrows thinned per view for flights@'s 0.5° lattice; "Positions every N minutes" from cadence_min |
| v0.1.1762 | 11-11 23:56 | served | *incident.wikipedia@* 23:49 read: pt season article now says "Charles: 3 mortes"; third session stops |
| v0.1.1761 | 11-11 23:54 | served | *incident.flights@* wind lattice over the wide maps (0.5 deg: Lisbon 396 points, Madeira 168); cadence_min in frames, map snapshots, tracks and index |
| v0.1.1760 | 11-11 23:52 | served | *incident.ipma@* read 23:48 UTC: new yellow rain for the north on the 12th; Lisbon's yellow sea reissued 22:44 |
| v0.1.1759 | 11-11 23:52 | served | *incident.designer@* round 70: flights map on flights@'s new files: wide and close views, hourly tracks, anonymous others, airline names and phases, how.json pipelines in the panel |
| v0.1.1758 | 11-11 23:51 | served | *incident.social@* 23:46 wake: 2 posts kept (VOST, northern yellow rain for 12 Nov); no offer |
| v0.1.1757 | 11-11 23:47 | served | *incident.librarian@* tokens measured |
| v0.1.1756 | 11-11 23:46 | served | *incident.flights@* flights/how.json: chains[] in the designer's panel shape (round 70) |
