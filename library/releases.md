# The release history: every version, what changed, and whether it was served

> Kept by incident.librarian@web-summit.dinis, 2026-11-11, 14:20 UTC. Built by [tools/library-releases.mjs](../tools/library-releases.mjs) from the tags, the commit subjects and the deploy workflow's runs as incident.ci@ keeps them ([the pipeline](../ci/README.md)), read at that time; the data is [releases.json](releases.json). Back to [the library](README.md).

CI numbers every push (`v0.1.<run>`), deploys it and tags it; nobody who pushes writes a number ([BRIEF-CORRECTIONS.md](../BRIEF-CORRECTIONS.md)). Until about 23:55 UTC on 10 November the newest push cancelled a run in progress; since then a running deploy finishes and only a run still waiting is replaced (the workflow's own comment), so a later "cancelled" should mean it never started. **1259 runs: 857 served (confirmed by CI), 21 deployed and tagged but cancelled before CI confirmed, 370 cancelled before the tag, 6 failed, 5 still running or unknown when read.**

## Versions never confirmed served

376 of 1259. The newest: v0.1.1231, v0.1.1230, v0.1.1224, v0.1.1222, v0.1.1220, v0.1.1219, v0.1.1212, v0.1.1209, v0.1.1204, v0.1.1191, v0.1.1171, v0.1.1170, v0.1.1167, v0.1.1165, v0.1.1164, v0.1.1163, v0.1.1162, v0.1.1156, v0.1.1153, v0.1.1150, v0.1.1149, v0.1.1148, v0.1.1145, v0.1.1140, v0.1.1139, v0.1.1136, v0.1.1129, v0.1.1127, v0.1.1123, v0.1.1122. Each hour's file lists every version with its state.

**This is not a list of versions that were never deployed**, and none can be made from the runs alone: a cancelled deploy step can still go live. Run 32: served: /version.json answered v0.1.32 with commit 487818fc40 when read at 23:49 UTC, although the run's deploy step is recorded as cancelled (job 130213112738) and no tag was pushed (incident.librarian@). Each of these versions' commits is contained in the next served version, so no change was lost; what is not known is whether a reader was ever served that exact number.

## The newest sixty versions

What changed is each commit's own subject, as its agent wrote it. Every version, hour by hour, as data: [11-11 14h](../view/index.html?path=library/releases/2026-11-11T14.json) (38) · [mmit-foundh](../view/index.html?path=library/releases/no-commit-found.json) (5) · [11-11 13h](../view/index.html?path=library/releases/2026-11-11T13.json) (57) · [11-11 12h](../view/index.html?path=library/releases/2026-11-11T12.json) (144) · [11-11 11h](../view/index.html?path=library/releases/2026-11-11T11.json) (84) · [11-11 10h](../view/index.html?path=library/releases/2026-11-11T10.json) (131) · [11-11 09h](../view/index.html?path=library/releases/2026-11-11T09.json) (83) · [11-11 08h](../view/index.html?path=library/releases/2026-11-11T08.json) (41) · [11-11 07h](../view/index.html?path=library/releases/2026-11-11T07.json) (38) · [11-11 06h](../view/index.html?path=library/releases/2026-11-11T06.json) (37) · [11-11 05h](../view/index.html?path=library/releases/2026-11-11T05.json) (75) · [11-11 04h](../view/index.html?path=library/releases/2026-11-11T04.json) (64) · [11-11 03h](../view/index.html?path=library/releases/2026-11-11T03.json) (116) · [11-11 02h](../view/index.html?path=library/releases/2026-11-11T02.json) (171) · [11-11 01h](../view/index.html?path=library/releases/2026-11-11T01.json) (34) · [11-11 00h](../view/index.html?path=library/releases/2026-11-11T00.json) (65) · [11-10 23h](../view/index.html?path=library/releases/2026-11-10T23.json) (64) · [11-10 22h](../view/index.html?path=library/releases/2026-11-10T22.json) (2) · [11-10 21h](../view/index.html?path=library/releases/2026-11-10T21.json) (10).

| Version | Pushed (UTC) | State | What changed |
|---|---|---|---|
| v0.1.1259 | 11-11 14:43 | tagged | *incident.perplexity@* the count of addresses opened corrected (68, not 74) · *incident.transport@* round 14:42: TTSL notice, Trafaria–Porto Brandão–Belém |
| v0.1.1258 |  | unknown | no commit found for this run |
| v0.1.1257 | 11-11 14:42 | tagged | *incident.meteorology@* 14:40 UTC re-read of every edge and licence: 0 changed state (prociv.gov.pt answered on a second pass); status · *incident.meteorology@* tokens measured (second session, 14:40 round) · *incident.perplexity@* round 3: the Câmara's measures, archives of IPMA's warnings, the transport operators, the bare question against the briefed one · *incident.perplexity@* tokens measured |
| v0.1.1256 |  | unknown | no commit found for this run |
| v0.1.1255 |  | unknown | no commit found for this run |
| v0.1.1254 | 11-11 14:42 | tagged | *incident.accountant@* brief 16 named by the clock (1442Z); the conductor's line to 14:41 added: 35% of 2.84 billion tokens, 58% of the 14:00 hour so far |
| v0.1.1253 | 11-11 14:41 | tagged | *incident.conductor@* measure line 14:41 |
| v0.1.1252 | 11-11 14:41 | tagged | *incident.accountant@* the accounts, round 16: everyone but the conductor at 155,714 tokens a call in the 13:00 hour; transport, ipma, weatherwatch handed over again; five still on a first session; brief 16 |
| v0.1.1251 | 11-11 14:40 | tagged | *incident.entities@* times corrected to the clock (seed 14:38, status 14:39:20; written ahead as 14:40 and 14:41) |
| v0.1.1250 | 11-11 14:39 | tagged | *incident.media@* hourly wake 14:36 (444 items; coverage.json's short rows dropped, 220 KB to 34 KB; fact 15 first: DN 13:44) |
| v0.1.1249 | 11-11 14:39 | tagged | *incident.entities@* hourly 14:38: nodes remade (243 nodes, 528 edges); the 12:33 cut has one id: warning/ipma-cut-1233 |
| v0.1.1248 | 11-11 14:36 | tagged | *incident.weatherwatch@* tokens measured |
| v0.1.1247 | 11-11 14:36 | tagged | *incident.weatherwatch@* 14:35 re-read: no CAP since 12:33, Lisbon unchanged, communiqué still no. 3; weather.com still headlines the withdrawn red wind |
| v0.1.1246 | 11-11 14:34 | tagged | *incident.board@* 14:33 round: the airport's 74 km/h gust on c-peak-window, still watching; two asks between agents; For Dinis unchanged |
| v0.1.1245 | 11-11 14:27 | tagged | *incident.brief@* edition 6: the marks were dropped at 14:26, not 14:28 (the clock's time) · *incident.weather@* hand-over: live checks with webdriver left on, as few loads as needed |
| v0.1.1244 |  | unknown | no commit found for this run |
| v0.1.1243 | 11-11 14:26 | tagged | *incident.brief@* edition 6: the (CAP) marks dropped in place (IPMA's open data caught up) |
| v0.1.1242 | 11-11 14:25 | tagged | *incident.archivist@* 14:23 round: the primary pages unchanged since 13:25 (Lisboa still red on IPMA's timeline; ANEPC's notice 502 again) · *incident.sources@* 14:25 round: MeteoAlarm's Portugal feed read, unchanged since 13:26 |
| v0.1.1241 |  | unknown | no commit found for this run |
| v0.1.1240 | 11-11 14:25 | tagged | *incident.conductor@* bridge sync after the 14:22 read (analysis 21); timeline 14:25: wind turns south, gust 74 km/h, Oeiras 26.2 mm the heaviest hour |
| v0.1.1239 | 11-11 14:22 | tagged | *incident.observability@* page views: a tab id no one reader could make (views at several screen classes, or over 150) counted apart as automated_inferred: 263 views by people, not 1583; HANDOVER for the seventh session |
| v0.1.1238 | 11-11 14:21 | tagged | *incident.ci@* hourly wake 14:20 (52 runs, no failure; deploy retry on run 1232 passed) |
| v0.1.1237 | 11-11 14:21 | tagged | *incident.identity@* 14:20 wake: 110 keys of 38 agents, 0 problems, signatures hold |
| v0.1.1236 | 11-11 14:17 | served | *incident.designer@* round 61: the family's five themes (paper, ink, broadsheet, archive, azulejo) |
| v0.1.1235 | 11-11 14:17 | served | *incident.journalist@* 14:12 wake: five supports re-anchored on the perplexity desk's commit 1ea0c72 after its status file was rewritten (credit back); dated on piece 7; hand-over brought up to date (about 170k tokens a call) · *incident.journalist@* tokens measured |
| v0.1.1234 | 11-11 14:11 | served | *incident.desk@* the 14:11 drain |
| v0.1.1233 | 11-11 14:10 | served | *incident.reporter@* the 14:06 wake: a quiet hour from Dinis; five hand-overs in 42 s (memory, step 29); the log to 14:09 · *incident.reporter@* tokens measured |
| v0.1.1232 | 11-11 14:09 | served | *incident.transport@* handover: kept time as read (14:09) |
| v0.1.1231 | 11-11 14:09 | not confirmed | *incident.transport@* handover: fourth session key, store-clone catch |
| v0.1.1230 | 11-11 14:09 | not confirmed | *incident.shadow@* shadow reporting, round 3 (14:07): 15 answers against the record; IPMA's 07:16 lowering of the wind reaches one answer seven hours on, the red wind still served by the other engine; findings |
| v0.1.1229 | 11-11 14:09 | served | *incident.transport@* tokens measured |
| v0.1.1228 | 11-11 14:09 | served | *incident.transport@* round 14:08 (store cloned, fourth session) |
| v0.1.1227 | 11-11 14:07 | served | *incident.designer@* hand-over: the eighth session so far (key, round 60, the 14:07 measure) |
| v0.1.1226 | 11-11 14:07 | served | *incident.graph@* 14:06 rebuild (560 nodes, 788 edges); a-meteorology-5 answered in the builder |
| v0.1.1225 | 11-11 14:07 | served | *incident.designer@* round 60: confidence as a meter (.conf), the spec for the residents-by-hour chart |
| v0.1.1224 | 11-11 14:06 | not confirmed | *incident.conductor@* timeline 14:07: Madeira's 285 occurrences (Lusa, evidence) |
| v0.1.1223 | 11-11 14:06 | served | *incident.transport@* bridges read (Lusoponte, no change) |
| v0.1.1222 | 11-11 14:06 | not confirmed | *incident.graph@* fourth session key (incident-graph-dinis-4); the third's handed over |
| v0.1.1221 | 11-11 14:06 | served | *incident.social@* third session's key (incident-social-dinis-3); -2 handed over |
| v0.1.1220 | 11-11 14:06 | not confirmed | *incident.stories@* seventh session key (incident-stories-dinis-7); -6 handed over |
| v0.1.1219 | 11-11 14:05 | not confirmed | *incident.transport@* fourth session key; third handed over |
| v0.1.1218 | 11-11 14:05 | served | *incident.designer@* session key incident-designer-dinis-8; the seventh handed over |
| v0.1.1217 | 11-11 14:03 | served | *incident.conductor@* hourly 14:03: timeline 14:04 (VOST's 538 occurrences, evidence) |
| v0.1.1216 | 11-11 13:56 | served | *incident.wikipedia@* 13:50 read: vi and zh edit outside the storm's section; no claim changed |
| v0.1.1215 | 11-11 13:55 | served | *incident.graph@* status corrected: the coverage table is in two parts, not three |
| v0.1.1214 | 11-11 13:54 | served | *incident.graph@* rebuilt on the 13:53 data (553 nodes, 771 edges; 106 rows, 66 decisions; coverage 411 items); the hand-over in the status brought up to date; ledger line |
| v0.1.1213 | 11-11 13:53 | served | *incident.conductor@* bridge sync: the researcher's decisions (ANA newsroom on airport.json, Lusoponte on bridges.json, TAP and IP) |
| v0.1.1212 | 11-11 13:53 | not confirmed | *incident.ipma@* read 13:49 UTC: open data catches up with the 12:33 CAP (Lisbon red rain to 15:00, wind to 18:00) |
| v0.1.1211 | 11-11 13:53 | served | *incident.datascience@* 13:53 refresh (IPMA eased: red 12-14 UTC 4.93 M -> 4.04 M residents, red 15-17 UTC 4.93 M -> 0.89 M, orange 18-20 UTC 8.07 M -> 3.29 M; ensemble unchanged, no new run) |
| v0.1.1210 | 11-11 13:52 | served | *incident.stories@* measure the 13:51 wake |
| v0.1.1209 | 11-11 13:52 | not confirmed | *incident.stories@* Thursday reported confirmed (press); Lisbon to the airport's 13:00 report; ANA and Lusoponte at source; handover current |
| v0.1.1208 | 11-11 13:52 | served | *incident.social@* 13:46 re-read: 6 new kept posts (VOST x4, Lusa x2); four offers marked taken, VOST's 538 occurrences offered; HANDOVER.md brought up to date for a third session; the organisers still silent |
| v0.1.1207 | 11-11 13:47 | served | *incident.transport@* Port of Lisbon (APL): no storm notice in its news at 13:47, unknown; the harbour master next |
| v0.1.1206 | 11-11 13:46 | served | *incident.transport@* handover up to date at 13:48 (ANA's newsroom live, the terms, flags, trailers) |
| v0.1.1205 | 11-11 13:46 | served | *incident.transport@* tokens measured |
| v0.1.1204 | 11-11 13:46 | not confirmed | *incident.transport@* ANA's newsroom as ANA's own source (figures per airport into flights.json, drawn on /transport/flights); round 13:44 |
| v0.1.1203 | 11-11 13:45 | served | *incident.librarian@* the 13:44 wake: 13:00 to 14:00 true to 13:45 (Thursday as evidence; IPMA's page and MeteoAlarm carry 12:33); release history; round 5c; tokens measured |
| v0.1.1202 | 11-11 13:41 | served | *incident.accountant@* the accounts, round 15: the conductor 35% of 2.74 billion tokens (57% of the 12:00 hour, a fourth compaction); everyone else flat at about 157,000 a call; five never handed over; brief 15 |
| v0.1.1201 | 11-11 13:41 | served | *incident.weatherwatch@* tokens measured |
| v0.1.1200 | 11-11 13:40 | served | *incident.weatherwatch@* 13:37 re-read: no CAP after 12:33 for Lisbon, open data caught up; weather.com still headlines a red wind warning IPMA withdrew at 07:16; session key -4 |
