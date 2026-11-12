# The release history: every version, what changed, and whether it was served

> Kept by incident.librarian@web-summit.dinis, 2026-11-12, 00:18 UTC. Built by [tools/library-releases.mjs](../tools/library-releases.mjs) from the tags, the commit subjects and the deploy workflow's runs as incident.ci@ keeps them ([the pipeline](../ci/README.md)), read at that time; the data is [releases.json](releases.json). Back to [the library](README.md).

CI numbers every push (`v0.1.<run>`), deploys it and tags it; nobody who pushes writes a number ([BRIEF-CORRECTIONS.md](../BRIEF-CORRECTIONS.md)). Until about 23:55 UTC on 10 November the newest push cancelled a run in progress; since then a running deploy finishes and only a run still waiting is replaced (the workflow's own comment), so a later "cancelled" should mean it never started. **1849 runs: 1270 served (confirmed by CI), 54 deployed and tagged but cancelled before CI confirmed, 488 cancelled before the tag, 6 failed, 31 still running or unknown when read.**

## Versions never confirmed served

494 of 1849. The newest: v0.1.1763, v0.1.1754, v0.1.1752, v0.1.1750, v0.1.1748, v0.1.1745, v0.1.1732, v0.1.1730, v0.1.1727, v0.1.1722, v0.1.1721, v0.1.1715, v0.1.1713, v0.1.1711, v0.1.1707, v0.1.1695, v0.1.1690, v0.1.1688, v0.1.1675, v0.1.1673, v0.1.1666, v0.1.1664, v0.1.1659, v0.1.1656, v0.1.1655, v0.1.1652, v0.1.1650, v0.1.1647, v0.1.1646, v0.1.1644. Each hour's file lists every version with its state.

**This is not a list of versions that were never deployed**, and none can be made from the runs alone: a cancelled deploy step can still go live. Run 32: served: /version.json answered v0.1.32 with commit 487818fc40 when read at 23:49 UTC, although the run's deploy step is recorded as cancelled (job 130213112738) and no tag was pushed (incident.librarian@). Each of these versions' commits is contained in the next served version, so no change was lost; what is not known is whether a reader was ever served that exact number.

## The newest sixty versions

What changed is each commit's own subject, as its agent wrote it. Every version, hour by hour, as data: [11-12 02h](../view/index.html?path=library/releases/2026-11-12T02.json) (7) · [11-12 01h](../view/index.html?path=library/releases/2026-11-12T01.json) (12) · [mmit-foundh](../view/index.html?path=library/releases/no-commit-found.json) (7) · [11-12 00h](../view/index.html?path=library/releases/2026-11-12T00.json) (53) · [11-11 23h](../view/index.html?path=library/releases/2026-11-11T23.json) (85) · [11-11 22h](../view/index.html?path=library/releases/2026-11-11T22.json) (114) · [11-11 21h](../view/index.html?path=library/releases/2026-11-11T21.json) (46) · [11-11 20h](../view/index.html?path=library/releases/2026-11-11T20.json) (31) · [11-11 19h](../view/index.html?path=library/releases/2026-11-11T19.json) (38) · [11-11 18h](../view/index.html?path=library/releases/2026-11-11T18.json) (41) · [11-11 17h](../view/index.html?path=library/releases/2026-11-11T17.json) (32) · [11-11 16h](../view/index.html?path=library/releases/2026-11-11T16.json) (53) · [11-11 15h](../view/index.html?path=library/releases/2026-11-11T15.json) (56) · [11-11 14h](../view/index.html?path=library/releases/2026-11-11T14.json) (58) · [11-11 13h](../view/index.html?path=library/releases/2026-11-11T13.json) (57) · [11-11 12h](../view/index.html?path=library/releases/2026-11-11T12.json) (144) · [11-11 11h](../view/index.html?path=library/releases/2026-11-11T11.json) (84) · [11-11 10h](../view/index.html?path=library/releases/2026-11-11T10.json) (131) · [11-11 09h](../view/index.html?path=library/releases/2026-11-11T09.json) (83) · [11-11 08h](../view/index.html?path=library/releases/2026-11-11T08.json) (41) · [11-11 07h](../view/index.html?path=library/releases/2026-11-11T07.json) (38) · [11-11 06h](../view/index.html?path=library/releases/2026-11-11T06.json) (37) · [11-11 05h](../view/index.html?path=library/releases/2026-11-11T05.json) (75) · [11-11 04h](../view/index.html?path=library/releases/2026-11-11T04.json) (64) · [11-11 03h](../view/index.html?path=library/releases/2026-11-11T03.json) (116) · [11-11 02h](../view/index.html?path=library/releases/2026-11-11T02.json) (171) · [11-11 01h](../view/index.html?path=library/releases/2026-11-11T01.json) (34) · [11-11 00h](../view/index.html?path=library/releases/2026-11-11T00.json) (65) · [11-10 23h](../view/index.html?path=library/releases/2026-11-10T23.json) (64) · [11-10 22h](../view/index.html?path=library/releases/2026-11-10T22.json) (2) · [11-10 21h](../view/index.html?path=library/releases/2026-11-10T21.json) (10).

| Version | Pushed (UTC) | State | What changed |
|---|---|---|---|
| v0.1.1849 | 11-12 02:42 | tagged | *incident.transport@* 02:41 round: no operator change; measured |
| v0.1.1848 | 11-12 02:32 | tagged | *incident.models@* sources' and media's wakes stopped on purpose (~00:50, Dinis's word); recorded |
| v0.1.1847 | 11-12 02:32 | tagged | *incident.models@* wake 02:31: press decisions (0 new), delegated summary, call index; sources and media silent since 00:25 and 00:39 · *incident.models@* tokens measured |
| v0.1.1846 | 11-12 02:29 | tagged | *incident.conductor@* bridge sync 02:29 (meteorologist's 02:22 read) |
| v0.1.1845 | 11-12 02:17 | tagged | *incident.observability@* wake 02:14: views (361 in 248 visits), trace backfill (12,069 docs, 0 held), live check, tokens measured |
| v0.1.1844 | 11-12 02:08 | tagged | *incident.desk@* the 02:08 drain |
| v0.1.1843 | 11-12 02:00 | tagged | *incident.flights@* hourly: frames, snapshots, crosswind, summary, index (02:00 UTC) |
| v0.1.1842 | 11-12 01:52 | tagged | *incident.ipma@* read 01:48 UTC: 64 requests, 63 answered 200, 45 files changed; warnings (IPMA's file dated 01:15): 13 above green; no warning changed |
| v0.1.1841 | 11-12 01:51 | tagged | *incident.social@* 01:46 wake: nothing new; Lusa's Beira Baixa post tied to s-1112T0142 |
| v0.1.1840 | 11-12 01:47 | tagged | *incident.librarian@* tokens measured |
| v0.1.1839 | 11-12 01:47 | tagged | *incident.librarian@* the 01:44 wake: 00:00 closed, 01:00 opened (Dinis ~00:50: keep the storm running, stop the rest; CP's Beira Baixa back) |
| v0.1.1838 | 11-12 01:43 | tagged | *incident.transport@* measure the 01:41 round; handover CP state · *incident.conductor@* timeline 01:42: CP Beira Baixa back; Thursday buses cancelled |
| v0.1.1837 |  | unknown | no commit found for this run |
| v0.1.1836 | 11-12 01:42 | tagged | *incident.transport@* 01:41 round: CP's storm notice updated (00h30): Beira Baixa resumed, Thursday's replacement buses withdrawn |
| v0.1.1835 | 11-12 01:32 | tagged | *incident.models@* wake 01:31: press decisions (0 new, 0 leads), delegated summary, call index; spend 0.026 of 20 · *incident.models@* tokens measured |
| v0.1.1834 | 11-12 01:28 | tagged | *incident.conductor@* bridge sync 01:27 (meteorologist's 01:22 read) |
| v0.1.1833 | 11-12 01:22 | tagged | *incident.observability@* wake 01:14: views (360 in 247 visits), trace backfill (11,806 docs, 0 held), live check, tokens measured |
| v0.1.1832 | 11-12 01:14 | tagged | *incident.desk@* the 01:14 drain |
| v0.1.1831 | 11-12 01:02 | tagged | *incident.conductor@* bridge sync 01:02 |
| v0.1.1830 | 11-12 01:00 | tagged | *incident.flights@* hourly: frames, snapshots, crosswind, summary, index (01:00 UTC) |
| v0.1.1829 | 11-12 00:57 | tagged | *incident.conductor@* BRIEF: Dinis ~00:50 (relayed): shut down to the main priorities |
| v0.1.1828 | 11-12 00:53 | tagged | *incident.graph@* hourly 00:53: 598 nodes, 805 edges; coverage 624 |
| v0.1.1827 | 11-12 00:52 | tagged | *incident.ipma@* read 00:48 UTC: 64 requests, 63 answered 200, 49 files changed; warnings (IPMA's file dated 00:15): 13 above green; no warning changed |
| v0.1.1826 | 11-12 00:51 | tagged | *incident.stories@* 00:50 wake: alert situation ran out at 23:59 (w7, n16); communiqué no. 3 expired (c3); c14 on IPMA's kept run |
| v0.1.1825 | 11-12 00:50 | tagged | *incident.social@* 00:46 wake: 2 posts kept (Lusa, yellow sea; Público); no offer |
| v0.1.1824 | 11-12 00:49 | tagged | *incident.librarian@* session key incident-librarian-dinis-16 (sixteenth session); -15 handed over |
| v0.1.1823 | 11-12 00:48 | tagged | *incident.conductor@* librarian sixteenth session started (hand-over) |
| v0.1.1822 | 11-12 00:47 | tagged | *incident.librarian@* hand-over to a sixteenth session (context 156,084 tokens a call) |
| v0.1.1821 | 11-12 00:47 | tagged | *incident.broadcast@* the transport panel dates 11 November's frozen departures and credits the live count to adsb.lol (ODbL), not OpenSky · *incident.sherpa@* guide: a departures count always carries its day; "not today" said (transport@, 00:43 UTC) · *incident.librarian@* the 00:44 wake: 23:00 to 00:00 closed, 00:00 opened on 12 November (the alert situation ran to 23:59; communiqué no. 3 ran out; Lisbon yellow sea to 03:00) · *incident.librarian@* tokens measured |
| v0.1.1820 |  | unknown | no commit found for this run |
| v0.1.1819 |  | unknown | no commit found for this run |
| v0.1.1818 |  | unknown | no commit found for this run |
| v0.1.1817 | 11-12 00:45 | tagged | *incident.transport@* measure the 00:41 round |
| v0.1.1816 | 11-12 00:44 | tagged | *incident.transport@* 00:41 round: no operator change; yesterday's frozen OpenSky counts carry their day (day, not_today) and the page dates them |
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
