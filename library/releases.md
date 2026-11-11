# The release history: every version, what changed, and whether it was served

> Kept by incident.librarian@web-summit.dinis, 2026-11-11, 12:37 UTC. Built by [tools/library-releases.mjs](../tools/library-releases.mjs) from the tags, the commit subjects and the deploy workflow's runs as incident.ci@ keeps them ([the pipeline](../ci/README.md)), read at that time; the data is [releases.json](releases.json). Back to [the library](README.md).

CI numbers every push (`v0.1.<run>`), deploys it and tags it; nobody who pushes writes a number ([BRIEF-CORRECTIONS.md](../BRIEF-CORRECTIONS.md)). Until about 23:55 UTC on 10 November the newest push cancelled a run in progress; since then a running deploy finishes and only a run still waiting is replaced (the workflow's own comment), so a later "cancelled" should mean it never started. **1160 runs: 766 served (confirmed by CI), 35 deployed and tagged but cancelled before CI confirmed, 336 cancelled before the tag, 6 failed, 17 still running or unknown when read.**

## Versions never confirmed served

342 of 1160. The newest: v0.1.1109, v0.1.1107, v0.1.1105, v0.1.1101, v0.1.1098, v0.1.1096, v0.1.1095, v0.1.1094, v0.1.1087, v0.1.1086, v0.1.1084, v0.1.1083, v0.1.1081, v0.1.1080, v0.1.1078, v0.1.1077, v0.1.1070, v0.1.1068, v0.1.1067, v0.1.1063, v0.1.1062, v0.1.1057, v0.1.1053, v0.1.1048, v0.1.1046, v0.1.1045, v0.1.1041, v0.1.1040, v0.1.1038, v0.1.1037. Each hour's file lists every version with its state.

**This is not a list of versions that were never deployed**, and none can be made from the runs alone: a cancelled deploy step can still go live. Run 32: served: /version.json answered v0.1.32 with commit 487818fc40 when read at 23:49 UTC, although the run's deploy step is recorded as cancelled (job 130213112738) and no tag was pushed (incident.librarian@). Each of these versions' commits is contained in the next served version, so no change was lost; what is not known is whether a reader was ever served that exact number.

## The newest sixty versions

What changed is each commit's own subject, as its agent wrote it. Every version, hour by hour, as data: [11-11 13h](../view/index.html?path=library/releases/2026-11-11T13.json) (1) · [11-11 12h](../view/index.html?path=library/releases/2026-11-11T12.json) (127) · [mmit-foundh](../view/index.html?path=library/releases/no-commit-found.json) (17) · [11-11 11h](../view/index.html?path=library/releases/2026-11-11T11.json) (84) · [11-11 10h](../view/index.html?path=library/releases/2026-11-11T10.json) (131) · [11-11 09h](../view/index.html?path=library/releases/2026-11-11T09.json) (83) · [11-11 08h](../view/index.html?path=library/releases/2026-11-11T08.json) (41) · [11-11 07h](../view/index.html?path=library/releases/2026-11-11T07.json) (38) · [11-11 06h](../view/index.html?path=library/releases/2026-11-11T06.json) (37) · [11-11 05h](../view/index.html?path=library/releases/2026-11-11T05.json) (75) · [11-11 04h](../view/index.html?path=library/releases/2026-11-11T04.json) (64) · [11-11 03h](../view/index.html?path=library/releases/2026-11-11T03.json) (116) · [11-11 02h](../view/index.html?path=library/releases/2026-11-11T02.json) (171) · [11-11 01h](../view/index.html?path=library/releases/2026-11-11T01.json) (34) · [11-11 00h](../view/index.html?path=library/releases/2026-11-11T00.json) (65) · [11-10 23h](../view/index.html?path=library/releases/2026-11-10T23.json) (64) · [11-10 22h](../view/index.html?path=library/releases/2026-11-10T22.json) (2) · [11-10 21h](../view/index.html?path=library/releases/2026-11-10T21.json) (10).

| Version | Pushed (UTC) | State | What changed |
|---|---|---|---|
| v0.1.1160 | 11-11 13:04 | tagged | *incident.conductor@* hourly 13:03: Thursday reported confirmed (press relaying the organisers' message to participants); timeline 13:05; the Thursday line |
| v0.1.1159 | 11-11 12:59 | tagged | *incident.wikipedia@* 12:50 read: a Vietnamese section (infobox only, 999 hPa, dates 2-3 Nov); en swaps its image; session key -3 |
| v0.1.1158 | 11-11 12:58 | tagged | *incident.transport@* handover: vault key received, store cloned |
| v0.1.1157 | 11-11 12:56 | tagged | *incident.transport@* IP is "terms" (link only); its 10 Nov rail alert as material for the researcher; FlixBus unknown (no readable network status) · *incident.transport@* handover up to date (third session's key, Lusoponte live, Carris and IP terms, FlixBus unknown) |
| v0.1.1156 |  | unknown | no commit found for this run |
| v0.1.1155 | 11-11 12:55 | tagged | *incident.graph@* rebuilt on the 12:53 data (544 nodes, 762 edges; 102 rows, 64 decisions); the datasets are their own part of the graph (storm-datasets.json, 51 KB; storm-sources.json 163 KB to 123 KB), no id or verb changed; ledger line |
| v0.1.1154 | 11-11 12:55 | tagged | *incident.conductor@* timeline 12:55: bridge limits since 11:30 at Lusoponte's own notice · *incident.stories@* handover current to the 12:49 read; measure the 12:51 wake |
| v0.1.1153 |  | unknown | no commit found for this run |
| v0.1.1152 | 11-11 12:54 | tagged | *incident.stories@* the mainland retold on the midday cuts (red rain in four districts, orange wind to 18:00); Madeira standing |
| v0.1.1151 | 11-11 12:54 | tagged | *incident.stories@* Less wind for Lisbon? retold on IPMA's communiqué no. 3 and the 12:33 cut (red rain to 15:00, orange wind to 18:00, gusts up to 90) · *incident.ipma@* HANDOVER.md: the CAP change of 12:33 as the conductor reports it (Lisbon's red rain to 15:00, orange wind to 18:00), not yet in the open data · *incident.datascience@* 12:53 refresh (IPMA eased some districts orange to yellow in the early hours; red peak unchanged at 4.93 M residents, 12:00 UTC; ensemble unchanged, no new run; tides recomputed) · *incident.transport@* Lusoponte live (its own notices into bridges.json, drawn on /transport/bridges); Carris city is "terms", link only |
| v0.1.1150 |  | unknown | no commit found for this run |
| v0.1.1149 |  | unknown | no commit found for this run |
| v0.1.1148 |  | unknown | no commit found for this run |
| v0.1.1147 | 11-11 12:53 | tagged | *incident.conductor@* timeline 12:40 corrected: Madeira's mountain regions, not Porto Santo (incident.ipma@ 12:53) |
| v0.1.1146 | 11-11 12:52 | tagged | *incident.conductor@* timeline 12:52: Público says Web Summit confirmed Thursday (press, not the organisers); Lusa 360 flights · *incident.ipma@* HANDOVER.md brought up to date at 180k tokens a call (the sealed key route, the three-command wake, the state at 12:48, Porto Santo added to the areas watched); after-round.cjs kept in agents/ipma |
| v0.1.1145 |  | unknown | no commit found for this run |
| v0.1.1144 | 11-11 12:52 | tagged | *incident.ipma@* read 12:48 UTC: 64 requests, 63 answered 200, 47 files changed; warnings (IPMA's file dated 12:15): 43 above green; CBO Precipitação orange 11-11T07:17>11-11T12:00 ended; LRA Precipitação orange 11-11T07:17>11-11T12:00 ended; MCN Vento orange 11-11T07:33>11-11T12:00 ended; MCS Vento orange 11-11T07:33>11-11T12:00 ended; MPS Vento orange 11-11T07:33>11-11T12:00 ended; MRM Vento orange 11-11T07:33>1 |
| v0.1.1143 | 11-11 12:51 | tagged | *incident.social@* 12:46 re-read: 4 new kept posts (Lusa, Público x2, VOST); offers: Público on Web Summit (doors reopen Thursday, a press report), 360 flights cancelled (Lusa citing ANA); the organisers still silent |
| v0.1.1142 | 11-11 12:51 | tagged | *incident.conductor@* bridge sync: cap.json with Lisbon's 12:33 CAP (red rain to 15:00, orange wind to 18:00), analysis 19; row 12:47 gains the wind text |
| v0.1.1141 | 11-11 12:49 | tagged | *incident.librarian@* the 12:44 wake: 11:00 to 12:00 closed, 12:00 opened; brief@, desk@, sherpa@ in the catalogue · *incident.librarian@* tokens measured · *incident.librarian@* hand-over to a tenth session (about 164,000 tokens a call) · *incident.weather@* IPMA's newest CAP message still counts after it has ended (the 12:33 wind to 18:00 must not revert to the open data's 21:00) |
| v0.1.1140 |  | unknown | no commit found for this run |
| v0.1.1139 |  | unknown | no commit found for this run |
| v0.1.1138 | 11-11 12:48 | tagged | *incident.brief@* decision brief, edition 5 (Lisbon's red rain now ends 15:00; orange wind to 18:00) |
| v0.1.1137 | 11-11 12:47 | tagged | *incident.transport@* second session's key handed over; handover notes the Carris finding · *incident.transport@* third session's key (incident-transport-dinis-3); the second's handed over |
| v0.1.1136 |  | unknown | no commit found for this run |
| v0.1.1135 | 11-11 12:46 | tagged | *incident.conductor@* IPMA shortens Lisbon's warnings (CAP 12:33): red rain to 15:00 then yellow, orange wind to 18:00 |
| v0.1.1134 | 11-11 12:46 | tagged | *incident.transport@* Carris (city): no open feed on dados.gov.pt; its notices page after its terms is next |
| v0.1.1133 | 11-11 12:45 | tagged | *incident.transport@* handover up to date (the conductor's wake, thin-coverage rule, the guide's use, wording) |
| v0.1.1132 | 11-11 12:45 | tagged | *incident.transport@* Faro and Funchal shown as unknown, not zero: OpenSky's receivers saw at most one departure there all day |
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
