# The release history: every version, what changed, and whether it was served

> Kept by incident.librarian@web-summit.dinis, 2026-11-11, 11:24 UTC. Built by [tools/library-releases.mjs](../tools/library-releases.mjs) from the tags, the commit subjects and the deploy workflow's runs as incident.ci@ keeps them ([the pipeline](../ci/README.md)), read at that time; the data is [releases.json](releases.json). Back to [the library](README.md).

CI numbers every push (`v0.1.<run>`), deploys it and tags it; nobody who pushes writes a number ([BRIEF-CORRECTIONS.md](../BRIEF-CORRECTIONS.md)). Until about 23:55 UTC on 10 November the newest push cancelled a run in progress; since then a running deploy finishes and only a run still waiting is replaced (the workflow's own comment), so a later "cancelled" should mean it never started. **961 runs: 658 served (confirmed by CI), 25 deployed and tagged but cancelled before CI confirmed, 271 cancelled before the tag, 6 failed, 1 still running or unknown when read.**

## Versions never confirmed served

277 of 961. The newest: v0.1.926, v0.1.924, v0.1.921, v0.1.920, v0.1.910, v0.1.909, v0.1.908, v0.1.906, v0.1.903, v0.1.900, v0.1.899, v0.1.898, v0.1.896, v0.1.894, v0.1.893, v0.1.892, v0.1.888, v0.1.886, v0.1.884, v0.1.883, v0.1.882, v0.1.879, v0.1.878, v0.1.876, v0.1.875, v0.1.874, v0.1.871, v0.1.869, v0.1.866, v0.1.864. Each hour's file lists every version with its state.

**This is not a list of versions that were never deployed**, and none can be made from the runs alone: a cancelled deploy step can still go live. Run 32: served: /version.json answered v0.1.32 with commit 487818fc40 when read at 23:49 UTC, although the run's deploy step is recorded as cancelled (job 130213112738) and no tag was pushed (incident.librarian@). Each of these versions' commits is contained in the next served version, so no change was lost; what is not known is whether a reader was ever served that exact number.

## The newest sixty versions

What changed is each commit's own subject, as its agent wrote it. Every version, hour by hour, as data: [11-11 11h](../view/index.html?path=library/releases/2026-11-11T11.json) (29) · [mmit-foundh](../view/index.html?path=library/releases/no-commit-found.json) (1) · [11-11 10h](../view/index.html?path=library/releases/2026-11-11T10.json) (131) · [11-11 09h](../view/index.html?path=library/releases/2026-11-11T09.json) (83) · [11-11 08h](../view/index.html?path=library/releases/2026-11-11T08.json) (41) · [11-11 07h](../view/index.html?path=library/releases/2026-11-11T07.json) (38) · [11-11 06h](../view/index.html?path=library/releases/2026-11-11T06.json) (37) · [11-11 05h](../view/index.html?path=library/releases/2026-11-11T05.json) (75) · [11-11 04h](../view/index.html?path=library/releases/2026-11-11T04.json) (64) · [11-11 03h](../view/index.html?path=library/releases/2026-11-11T03.json) (116) · [11-11 02h](../view/index.html?path=library/releases/2026-11-11T02.json) (171) · [11-11 01h](../view/index.html?path=library/releases/2026-11-11T01.json) (34) · [11-11 00h](../view/index.html?path=library/releases/2026-11-11T00.json) (65) · [11-10 23h](../view/index.html?path=library/releases/2026-11-10T23.json) (64) · [11-10 22h](../view/index.html?path=library/releases/2026-11-10T22.json) (2) · [11-10 21h](../view/index.html?path=library/releases/2026-11-10T21.json) (10).

| Version | Pushed (UTC) | State | What changed |
|---|---|---|---|
| v0.1.961 | 11-11 11:42 | tagged | *incident.conductor@* tokens measured |
| v0.1.960 | 11-11 11:41 | tagged | *incident.accountant@* the accounts, round 12: everyone but the conductor at 149,943 tokens a call in the 10:00 hour, the lowest yet; the conductor has no line since 09:42; archivist and sources above 425,000; brief 12 |
| v0.1.959 | 11-11 11:41 | tagged | *incident.broadcast@* the transport panel says "seen since <covered_from>", not since 00:00 (OpenSky's window is a few hours) |
| v0.1.958 | 11-11 11:40 | tagged | *incident.transport@* tokens measured |
| v0.1.957 | 11-11 11:39 | tagged | *incident.transport@* 11:38 read; OpenSky's departures are a rolling window of a few hours, not the day: the day is now the union of our readings, hours not covered shown as such, never as zero |
| v0.1.956 | 11-11 11:38 | tagged | *incident.entities@* hourly wake 11:38: nodes remade (224 nodes, 456 edges: incident.transport@, the decision lisbon-flights-208); builder about 140 ms, linker 406 to 473 ms at 2,221 pages · *incident.entities@* tokens measured |
| v0.1.955 | 11-11 11:38 | tagged | *incident.media@* hourly wake 11:36 (362 items, no change in who was first) |
| v0.1.954 | 11-11 11:36 | tagged | *incident.meteorology@* tokens measured (second session, 11:30 round) |
| v0.1.953 | 11-11 11:36 | tagged | *incident.meteorology@* 11:30 UTC re-read of every edge and licence: 0 changed state; the headless reader keeps a slow page's status (EUMETSAT's licence page read as not read, then stated again); status |
| v0.1.952 | 11-11 11:35 | tagged | *incident.board@* D10 answered on a-wind-down-plan (Dinis, 10:38); a-sources-4 waits on Dinis alone (the conductor declined at 10:27) · *incident.conductor@* timeline: the government's 'hardest still to come' line; 189 mainland and 235 Madeira occurrences (press) |
| v0.1.951 |  | unknown | no commit found for this run |
| v0.1.950 | 11-11 11:34 | tagged | *incident.conductor@* timeline s-1111T1109: say who read Web Summit's blog (social.watch@, another team); our hold stands |
| v0.1.949 | 11-11 11:34 | tagged | *incident.weatherwatch@* the 11:33 re-read: the authorities unchanged since 07:16:30; the government's 'worst still to come' beside the lowered wind; / took two of the 09:40 review's three points · *incident.weatherwatch@* tokens measured |
| v0.1.948 | 11-11 11:34 | tagged | *incident.board@* 11:33 round: the plan's ten decisions joined into a-wind-down-plan; a-designer-7 (fonts) and a-sources-4 (a read key) ranked for Dinis; sync (45 cards); no question moved |
| v0.1.947 | 11-11 11:29 | tagged | *incident.weather@* the 11:27 check: the live page reads true against the 11:26 files at 390 and 1280, light and dark; nothing to fix; the ledger line |
| v0.1.946 | 11-11 11:29 | tagged | *incident.archivist@* 11:27 round: the five primary pages unchanged (Lisboa still red on IPMA's timeline) |
| v0.1.945 | 11-11 11:28 | tagged | *incident.sources@* 11:27 round: MeteoAlarm's Portugal feed read, unchanged since 08:24; the vault's read key still to be published |
| v0.1.944 | 11-11 11:28 | tagged | *incident.conductor@* bridge sync after the 11:22 read; timeline: Lisbon at 11:00 (heavy rain, no gust), analysis 15 (centre may pass south) |
| v0.1.943 | 11-11 11:26 | tagged | *incident.journalist@* exit interview brought up to date for the sixth session (six sessions, five hand-overs, 619 supports, the fifth's ledger line) · *incident.journalist@* tokens measured |
| v0.1.942 | 11-11 11:25 | tagged | *incident.ci@* 11:24 wake: 939 runs (108 this hour, 45 replaced), no failure; a fifth deploy retry (run 867) saved by its second try; gate on the runner median 6 s; push to served median 47 s; the signing patch rebuilt for the new policy.json |
| v0.1.941 | 11-11 11:25 | tagged | *incident.journalist@* sixth session started; its session key (public half), the fifth's marked handed over |
| v0.1.940 | 11-11 11:25 | tagged | *incident.identity@* 11:20 wake: 82 keys of 34 agents, 0 problems, signatures hold |
| v0.1.939 | 11-11 11:24 | tagged | *incident.observability@* hourly wake: page views drained (287 opened, 0 refused; 141 views, 97 visits), totals republished; ledger line |
| v0.1.938 | 11-11 11:23 | served | *incident.journalist@* 11:12 wake: What it cost corrected from the accountant's round 11 (the 10:14 "falling" wrong once the conductor's line is in); the closing piece to round 11, Dinis's ~10:38 correction and the close trigger; one support re-anchored to commits; Mistakes section 9 extended · *incident.journalist@* tokens measured |
| v0.1.937 | 11-11 11:18 | served | *incident.reporter@* HANDOVER.md brought up to date for a fifth session (187,780 tokens a call) |
| v0.1.936 | 11-11 11:18 | served | *incident.reporter@* the 11:06 wake: seven words from Dinis; the 10:10 request closed in 21 min (ten paths, the arc, /flows/); a new trace, the wind-down, open; outage, memory and loop extended · *incident.reporter@* tokens measured |
| v0.1.935 | 11-11 11:13 | served | *incident.shadow@* the 11:00 hour is a ninth recorded gap (the engines' account still out of credit) |
| v0.1.934 | 11-11 11:13 | served | *incident.designer@* tokens measured |
| v0.1.933 | 11-11 11:13 | served | *incident.designer@* round 57: no text under 11 px in the frame's parts (19 rules; the data room 161 to 0 at 390); notes for the front page's and the stories' own small type |
| v0.1.932 | 11-11 11:09 | served | *incident.conductor@* 11:02 wake: bridge sync (researcher's decisions incl. lisbon-flights-208); timeline: track further south (press), no new IPMA or Web Summit word |
| v0.1.931 | 11-11 10:59 | served | *incident.stories@* ledger line (fifth session's first wake) |
| v0.1.930 | 11-11 10:59 | served | *incident.stories@* fifth session's key; the mainland warned-against-observed story (11 claims on the 10:22 read) |
| v0.1.929 | 11-11 10:55 | served | *incident.wikipedia@* 10:48 read: pt moved (the Canaries and a new section on Spain; w-pt-44, w-pt-45); neither pt nor en has IPMA's lowering of Lisbon's wind to orange (07:16:30): two claims now behind, a sixth key fact tracked; the reader's size heading fixed |
| v0.1.928 | 11-11 10:53 | served | *incident.graph@* rebuilt on the 10:51 data (508 nodes, 712 edges; coverage 345 items); ledger line |
| v0.1.927 | 11-11 10:53 | served | *incident.stories@* Madeira m18 (the regional president's count and rain figure, as reported by DN Madeira; row s-1111T1007); status, HANDOVER.md for a fifth session, ledger line |
| v0.1.926 | 11-11 10:53 | not confirmed | *incident.media@* third session's key and first wake (345 items; DN's 11 November live page; a false fact-12 match removed by hand) |
| v0.1.925 | 11-11 10:52 | served | *incident.stories@* retold on the 10:22 read: o1 (three airport reports inside Lisbon's windows, the station hour labelled 09:00), c17 (the airport forecast amended at 10:08, lowered), c16 (Open-Meteo), Madeira m7 (Areeiro 484.2 mm in fourteen values) |
| v0.1.924 | 11-11 10:52 | not confirmed | *incident.librarian@* status: the planner's ask of 10:52 (library/closing-inventory.json at the close trigger) in next |
| v0.1.923 | 11-11 10:52 | served | *incident.planner@* PLAN.md: the library's part (catalogue, provenance for the checks, hourly articles, the pack as BAU start page); librarian in its eighth session |
| v0.1.922 | 11-11 10:51 | served | *incident.conductor@* timeline: the flights row also cites Lusa 09:55 |
| v0.1.921 | 11-11 10:51 | not confirmed | *incident.ipma@* read 10:48 UTC: 64 requests, 63 answered 200, 46 files changed; warnings (IPMA's file dated 10:15): 51 above green; no warning changed |
| v0.1.920 | 11-11 10:51 | not confirmed | *incident.librarian@* tokens measured |
| v0.1.919 | 11-11 10:51 | served | *incident.social@* 10:46 re-read: 2 new kept posts (Lusa x2); offer: more than 220 flights cancelled at Lisbon and Faro (via Lusa); Lusa on IPMA's easing wind tied to s-1111T0939; the organisers still silent |
| v0.1.918 | 11-11 10:51 | served | *incident.librarian@* the eighth session: incident.storyteller@, incident.motion@, incident.broadcast@, incident.transport@ and incident.planner@ in library/abp.json with draft policies (37); the pack's start page gains the wind-down (waits on Dinis; nobody stops while the storm is live or before its hand-over), the 10:38 correction (no outside hand-over; Dinis alone runs this site) and the PrompTugal News family; sess |
| v0.1.917 | 11-11 10:47 | served | *incident.librarian@* tokens measured |
| v0.1.916 | 11-11 10:47 | served | *incident.librarian@* the 10:44 wake: 09:00 to 10:00 closed (98 commits by 25 agents, 83 versions; /welcome/ went live as a draft at 09:57); 10:00 to 11:00 opened (the newcomers' page rewritten on three runs of invented visitors; Dinis asks for the wind-down); the round article: the hour in its list, a correction, section 9 point 11; release history and commit record refreshed; the seventh session's hand-over |
| v0.1.915 | 11-11 10:46 | served | *incident.designer@* tokens measured |
| v0.1.914 | 11-11 10:45 | served | *incident.designer@* round 56: the phone masthead in two rows (102 to 77 px at 390 and 360): the menu shares its row with New here? and Panel; /flows/ third look: all eight notes hold |
| v0.1.913 | 11-11 10:45 | served | *incident.graph@* the builder reads the media watch's coverage from its six-hour parts (articles_files), no by-line carried; rebuilt on the 10:37 data (508 nodes, 710 edges; coverage 344 items, now in two parts); ledger line |
| v0.1.912 | 11-11 10:44 | served | *incident.motion@* flows: designer's note 9: a player opened in a card leaves out its own title, chip and summary (data-flow-bare); embed.html and "open alone" keep them |
| v0.1.911 | 11-11 10:43 | served | *incident.conductor@* the conductor's hand-over, written ahead (a fresh conductor only on Dinis's word) |
| v0.1.910 | 11-11 10:43 | not confirmed | *incident.weather@* the ledger line (third session, second round) |
| v0.1.909 | 11-11 10:43 | not confirmed | *incident.broadcast@* the wall's transport panel, from incident.transport@'s flights and services files |
| v0.1.908 | 11-11 10:43 | not confirmed | *incident.weather@* weatherwatch@'s 09:40 points 1 and 3: the wind lowered red to orange (07:16) under the band, read from the CAP record; a measured line on a desk's first screen; the PrompTugal.news link beside "New here?" |
| v0.1.907 | 11-11 10:42 | served | *incident.media@* 10:36 wake: sweep (344 items, 18 outlets, 33 new); coverage.json passed 256 KB: whole items now in six-hour parts (research/media/coverage/, tools/cov.mjs), a short row per item kept for tools/graph-build.mjs; HANDOVER.md up to date for a third session |
| v0.1.906 | 11-11 10:42 | not confirmed | *incident.designer@* my session key (the sixth session; the public half only); the fifth session's key marked handed over |
| v0.1.905 | 11-11 10:42 | served | *incident.accountant@* the accounts, round 11: with the conductor's line in, the team's call is 258,028 tokens at 09:00 (brief 10's 171,681 corrected); its session is 30% of 2.18 billion; ipma handed over; brief 11 |
| v0.1.904 | 11-11 10:41 | served | *incident.designer@* tokens measured |
| v0.1.903 | 11-11 10:41 | not confirmed | *incident.planner@* PLAN.md: journalist row corrected (thirteen pieces, fifth session; its early interview linked) |
| v0.1.902 | 11-11 10:40 | served | *incident.designer@* round 55 withdrawn: the hand-over band and its Team-menu entry taken out (reverts 05d710f; Dinis, ~10:38: no outside hand-over) |
