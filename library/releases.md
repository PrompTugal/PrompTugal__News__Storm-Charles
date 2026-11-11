# The release history: every version, what changed, and whether it was served

> Kept by incident.librarian@web-summit.dinis, 2026-11-11, 12:37 UTC. Built by [tools/library-releases.mjs](../tools/library-releases.mjs) from the tags, the commit subjects and the deploy workflow's runs as incident.ci@ keeps them ([the pipeline](../ci/README.md)), read at that time; the data is [releases.json](releases.json). Back to [the library](README.md).

CI numbers every push (`v0.1.<run>`), deploys it and tags it; nobody who pushes writes a number ([BRIEF-CORRECTIONS.md](../BRIEF-CORRECTIONS.md)). Until about 23:55 UTC on 10 November the newest push cancelled a run in progress; since then a running deploy finishes and only a run still waiting is replaced (the workflow's own comment), so a later "cancelled" should mean it never started. **1131 runs: 766 served (confirmed by CI), 15 deployed and tagged but cancelled before CI confirmed, 336 cancelled before the tag, 6 failed, 8 still running or unknown when read.**

## Versions never confirmed served

342 of 1131. The newest: v0.1.1109, v0.1.1107, v0.1.1105, v0.1.1101, v0.1.1098, v0.1.1096, v0.1.1095, v0.1.1094, v0.1.1087, v0.1.1086, v0.1.1084, v0.1.1083, v0.1.1081, v0.1.1080, v0.1.1078, v0.1.1077, v0.1.1070, v0.1.1068, v0.1.1067, v0.1.1063, v0.1.1062, v0.1.1057, v0.1.1053, v0.1.1048, v0.1.1046, v0.1.1045, v0.1.1041, v0.1.1040, v0.1.1038, v0.1.1037. Each hour's file lists every version with its state.

**This is not a list of versions that were never deployed**, and none can be made from the runs alone: a cancelled deploy step can still go live. Run 32: served: /version.json answered v0.1.32 with commit 487818fc40 when read at 23:49 UTC, although the run's deploy step is recorded as cancelled (job 130213112738) and no tag was pushed (incident.librarian@). Each of these versions' commits is contained in the next served version, so no change was lost; what is not known is whether a reader was ever served that exact number.

## The newest sixty versions

What changed is each commit's own subject, as its agent wrote it. Every version, hour by hour, as data: [11-11 12h](../view/index.html?path=library/releases/2026-11-11T12.json) (108) · [mmit-foundh](../view/index.html?path=library/releases/no-commit-found.json) (8) · [11-11 11h](../view/index.html?path=library/releases/2026-11-11T11.json) (84) · [11-11 10h](../view/index.html?path=library/releases/2026-11-11T10.json) (131) · [11-11 09h](../view/index.html?path=library/releases/2026-11-11T09.json) (83) · [11-11 08h](../view/index.html?path=library/releases/2026-11-11T08.json) (41) · [11-11 07h](../view/index.html?path=library/releases/2026-11-11T07.json) (38) · [11-11 06h](../view/index.html?path=library/releases/2026-11-11T06.json) (37) · [11-11 05h](../view/index.html?path=library/releases/2026-11-11T05.json) (75) · [11-11 04h](../view/index.html?path=library/releases/2026-11-11T04.json) (64) · [11-11 03h](../view/index.html?path=library/releases/2026-11-11T03.json) (116) · [11-11 02h](../view/index.html?path=library/releases/2026-11-11T02.json) (171) · [11-11 01h](../view/index.html?path=library/releases/2026-11-11T01.json) (34) · [11-11 00h](../view/index.html?path=library/releases/2026-11-11T00.json) (65) · [11-10 23h](../view/index.html?path=library/releases/2026-11-10T23.json) (64) · [11-10 22h](../view/index.html?path=library/releases/2026-11-10T22.json) (2) · [11-10 21h](../view/index.html?path=library/releases/2026-11-10T21.json) (10).

| Version | Pushed (UTC) | State | What changed |
|---|---|---|---|
| v0.1.1131 | 11-11 12:43 | tagged | *incident.sherpa@* status: guide v13; the CP ask closed |
| v0.1.1130 | 11-11 12:43 | tagged | *incident.transport@* tokens measured · *incident.sherpa@* guide v13: "Changed today" in the row form (designer@ 12:40) |
| v0.1.1129 |  | unknown | no commit found for this run |
| v0.1.1128 | 11-11 12:42 | tagged | *incident.brief@* status: edition 4 live · *incident.transport@* round 12:41 (LIS 44, OPO 22 airline departures seen; Fertagus normal at 10:40; STCP and Carris counts) |
| v0.1.1127 |  | unknown | no commit found for this run |
| v0.1.1126 | 11-11 12:42 | tagged | *incident.conductor@* timeline 12:40: IPMA's open data catches up, Lisbon unchanged, Madeira's orange wind gone |
| v0.1.1125 | 11-11 12:41 | tagged | *incident.accountant@* the accounts, round 13: the conductor is 31% of 2.51 billion tokens (half of the 09:00 hour); the team at 187,811 tokens a call in the 10:00 hour; archivist and sources above 430,000; brief 13 |
| v0.1.1124 | 11-11 12:40 | tagged | *incident.brief@* decision brief, edition 4 (IPMA's adjusted warnings: red rain in four districts, Lisbon unchanged) · *incident.designer@* a more compact footer on a phone (535 -> 464 px); the guide v11 measured · *incident.sherpa@* guide v12: the label key as one line of the frame's chips, once per page (designer@ 12:37) |
| v0.1.1123 |  | unknown | no commit found for this run |
| v0.1.1122 |  | unknown | no commit found for this run |
| v0.1.1121 | 11-11 12:40 | tagged | *incident.ci@* third session's key incident-ci-dinis-3; incident-ci-dinis-2 handed over |
| v0.1.1120 | 11-11 12:39 | tagged | *incident.entities@* hourly wake 12:38: nodes remade (235 nodes, 492 edges: four agents, Lisbon's fire brigade named, six decisions); the builder indexes the neighbours once and parses each address once (about 50 ms less, the same output) · *incident.entities@* tokens measured |
| v0.1.1119 | 11-11 12:39 | tagged | *incident.weather@* communiqué no. 3 in IPMA's own words, each wind figure labelled by product and time, the hour strip back on the first screen (weatherwatch@'s 12:35 review) · *incident.media@* hourly wake 12:36 (384 items; facts 13 and 14: IPMA's communiqué no. 3 and Faro's red rain) |
| v0.1.1118 |  | unknown | no commit found for this run |
| v0.1.1117 | 11-11 12:38 | tagged | *incident.sherpa@* guide v11: Web Summit and Madeira in the row form · *incident.board@* takeover measured · *incident.ci@* HANDOVER.md for a third session (the wake in six commands, the state, what is in flight); generators-together on the runner: three runs at 5, 5, 6 s so far; the wake's scripts kept in agents/ci/ |
| v0.1.1116 |  | unknown | no commit found for this run |
| v0.1.1115 |  | unknown | no commit found for this run |
| v0.1.1114 | 11-11 12:37 | tagged | *incident.conductor@* sync cap.json (12:18 batch); timeline row 12:34 corrected: four districts' rain lowered red→orange; red stands in Lisboa, Setúbal, Santarém, Faro · *incident.board@* third session's key; second handed over |
| v0.1.1113 |  | unknown | no commit found for this run |
| v0.1.1112 | 11-11 12:36 | tagged | *incident.sherpa@* guide v10: short names on the rows, the full name in the fold; the alert in two lines (designer@ 12:33) |
| v0.1.1111 | 11-11 12:36 | served | *incident.conductor@* timeline: bridge limits again (60/80 km/h), 334 flights cancelled (press) |
| v0.1.1110 | 11-11 12:35 | served | *incident.weatherwatch@* the 12:33 re-read: IPMA's communiqué no. 3 and a CAP batch with nothing for Lisbon; / took the 09:40 review's three points, a new review after 12:00; hand-over brought up to date · *incident.weatherwatch@* tokens measured |
| v0.1.1109 | 11-11 12:35 | not confirmed | *incident.conductor@* apply incident.ci@'s generators-together patch (before-generators start together; gate ~4.4 s to ~3.5 s locally) |
| v0.1.1108 | 11-11 12:34 | served | *incident.board@* 12:33 round: eight new asks for Dinis joined or ranked, evidence on q-thursday-transport, sync (58 cards); HANDOVER.md brought up to date for a third session |
| v0.1.1107 | 11-11 12:34 | not confirmed | *incident.sherpa@* guide: the label key under "Changed today"; how to cite near the top (synthetic@'s /guide/media/ check) |
| v0.1.1106 | 11-11 12:34 | served | *incident.conductor@* timeline: IPMA's adjusted warnings (CAP 12:18:03): none for Lisbon; Faro rain red 12:19-18:00 |
| v0.1.1105 | 11-11 12:34 | not confirmed | *incident.weather@* the Câmara on the first screen names what it closed (scope.parts); communiqué no. 3 and the 18:00/21:00 step-downs checked |
| v0.1.1104 | 11-11 12:33 | served | *incident.ci@* where the gate's time goes at 2,297 pages, and ci/patches/generators-together.patch for the conductor (the before-generators side by side: about 1.2 s off the gate here, same output) |
| v0.1.1103 | 11-11 12:32 | served | *incident.brief@* edition 3 corrected: "heaviest hour since the red warning began", not "yet"; "adjusted" read against CAP |
| v0.1.1102 | 11-11 12:31 | served | *incident.weather@* no text under 11 px on / (round 57: 77 to 0 at 390, 53 to 0 at 1280); session key -5 |
| v0.1.1101 | 11-11 12:31 | not confirmed | *incident.sherpa@* guide v9: getting around as one row per operator (designer@ 12:25) |
| v0.1.1100 | 11-11 12:31 | served | *incident.brief@* status: edition 3 live |
| v0.1.1099 | 11-11 12:30 | served | *incident.conductor@* sync communiqué no. 3 to the site; timeline row 12:25 corrected: heaviest hour since the red warning began, not of the whole storm |
| v0.1.1098 | 11-11 12:29 | not confirmed | *incident.stories@* measure the sixth session's first wake |
| v0.1.1097 | 11-11 12:29 | served | *incident.stories@* sixth session key; Lisbon and mainland retold on the 12:23 read (airport to 12:00, the wettest station hour, the 12:25 reading, the ensemble, Carris, 288 flights) |
| v0.1.1096 | 11-11 12:29 | not confirmed | *incident.designer@* the phone menu row fades at its cut edge, and the fade drops at the end (synthetic@'s run 5) |
| v0.1.1095 | 11-11 12:29 | not confirmed | *incident.librarian@* the pack accepts next and asks as a string or a list |
| v0.1.1094 | 11-11 12:29 | not confirmed | *incident.brief@* decision brief, edition 3 (IPMA's communiqué no. 3; adjusted warnings awaited) |
| v0.1.1093 | 11-11 12:29 | served | *incident.synthetic@* targeted check of /guide/media/ on v8: "Changed today" at 801 px, the IPMA change is row 1 |
| v0.1.1092 | 11-11 12:28 | served | *incident.weather@* the 12:00 check true on the live site; "earlier today" rows off a class already taken; hand-over |
| v0.1.1091 | 11-11 12:27 | served | *incident.sherpa@* guide v8 (synthetic@ run 5) and agents/sherpa/status.json |
| v0.1.1090 | 11-11 12:27 | served | *incident.conductor@* IPMA communiqué no. 3 (12:16): two centres, less deepening, weaker wind; warnings adjusted; standfirst updated |
| v0.1.1089 | 11-11 12:26 | served | *incident.archivist@* 12:24 round: IPMA's communiqué no. 3 (edited 12:16) captured; the Lisbon timeline reads as before, Madeira's regions lower in the list; ANEPC answered 502 |
| v0.1.1088 | 11-11 12:26 | served | *incident.broadcast@* agents/broadcast/status.json; the wall gets an exposure panel (residents under each IPMA level this hour) and transport by mode |
| v0.1.1087 | 11-11 12:26 | not confirmed | *incident.designer@* round 59, the guide v7 measured; notes on the focused pages' rows |
| v0.1.1086 | 11-11 12:25 | not confirmed | *incident.sources@* the government portal address by address; feed read 12:24, unchanged since 08:24 |
| v0.1.1085 | 11-11 12:25 | served | *incident.stories@* HANDOVER.md current for a sixth session (the tested_by lesson; context about 184k a call) |
| v0.1.1084 | 11-11 12:25 | not confirmed | *incident.transport@* metro-schedule.json says it is the planned timetable, not today's service, and where today's word stands |
| v0.1.1083 | 11-11 12:25 | not confirmed | *incident.stories@* ledger line (generator fix) |
| v0.1.1082 | 11-11 12:24 | served | *incident.stories@* fix the stories generator's crash (h8's tested_by was a claim id; guarded, and --check now flags it) |
| v0.1.1081 | 11-11 12:24 | not confirmed | *incident.conductor@* bridge sync after the 12:22 read; timeline: heaviest rain hour yet, pressure falling 4 hPa/h; analysis 16 (centre over or just south of Lisbon) |
| v0.1.1080 | 11-11 12:24 | not confirmed | *incident.brief@* agents/brief/status.json (role, session, editions, next, asks) |
| v0.1.1079 | 11-11 12:24 | served | *incident.synthetic@* status.json (runs so far with scores; paused) |
| v0.1.1078 | 11-11 12:24 | not confirmed | *incident.transport@* agents/transport/status.json (role, session, sources live, blocked, next) |
| v0.1.1077 | 11-11 12:24 | not confirmed | *incident.envoy@* agents/envoy/status.json: what is drafted, what waits on Dinis, what is next |
| v0.1.1076 | 11-11 12:24 | served | *incident.sherpa@* guide v7: one row per operator or place, summaries with a one-line answer (designer@ 12:17 and 12:19) |
| v0.1.1075 | 11-11 12:22 | served | *incident.conductor@* bridge sync (researcher's CP attribution fix reaches the guide's data) · *incident.conductor@* fix invalid JSON in the CP edge (unescaped quotes broke graph, entities, board and stories builds); CP's words now in «» |
| v0.1.1074 | 11-11 12:22 | served | *incident.identity@* 12:20 wake: 93 keys of 38 agents, 0 problems, signatures hold |
| v0.1.1073 | 11-11 12:21 | served | *incident.observability@* wake 12:18: page views 343 in 145 visits; 11 newer agents in their groups on /agents/; measured · *incident.observability@* agents index under the gate again: done lists in the snapshot cut to the first 2 and last 8 (271 KB to 230 KB); the page still reads each status file whole |
| v0.1.1072 | 11-11 12:20 | served | *incident.synthetic@* /guide/ run 5 on v5 with a measured check of v6; Madeira up to 4, "Changed today" still far down for the reporter |
