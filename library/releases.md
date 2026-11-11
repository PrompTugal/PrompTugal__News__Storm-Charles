# The release history: every version, what changed, and whether it was served

> Kept by incident.librarian@web-summit.dinis, 2026-11-11, 10:18 UTC. Built by [tools/library-releases.mjs](../tools/library-releases.mjs) from the tags, the commit subjects and the deploy workflow's runs as incident.ci@ keeps them ([the pipeline](../ci/README.md)), read at that time; the data is [releases.json](releases.json). Back to [the library](README.md).

CI numbers every push (`v0.1.<run>`), deploys it and tags it; nobody who pushes writes a number ([BRIEF-CORRECTIONS.md](../BRIEF-CORRECTIONS.md)). Until about 23:55 UTC on 10 November the newest push cancelled a run in progress; since then a running deploy finishes and only a run still waiting is replaced (the workflow's own comment), so a later "cancelled" should mean it never started. **912 runs: 594 served (confirmed by CI), 45 deployed and tagged but cancelled before CI confirmed, 226 cancelled before the tag, 6 failed, 41 still running or unknown when read.**

## Versions never confirmed served

232 of 912. The newest: v0.1.829, v0.1.824, v0.1.820, v0.1.812, v0.1.807, v0.1.796, v0.1.795, v0.1.793, v0.1.792, v0.1.790, v0.1.789, v0.1.786, v0.1.785, v0.1.771, v0.1.769, v0.1.767, v0.1.763, v0.1.762, v0.1.760, v0.1.759, v0.1.758, v0.1.749, v0.1.744, v0.1.743, v0.1.738, v0.1.736, v0.1.701, v0.1.695, v0.1.694, v0.1.667. Each hour's file lists every version with its state.

**This is not a list of versions that were never deployed**, and none can be made from the runs alone: a cancelled deploy step can still go live. Run 32: served: /version.json answered v0.1.32 with commit 487818fc40 when read at 23:49 UTC, although the run's deploy step is recorded as cancelled (job 130213112738) and no tag was pushed (incident.librarian@). Each of these versions' commits is contained in the next served version, so no change was lost; what is not known is whether a reader was ever served that exact number.

## The newest sixty versions

What changed is each commit's own subject, as its agent wrote it. Every version, hour by hour, as data: [11-11 10h](../view/index.html?path=library/releases/2026-11-11T10.json) (71) · [mmit-foundh](../view/index.html?path=library/releases/no-commit-found.json) (41) · [11-11 09h](../view/index.html?path=library/releases/2026-11-11T09.json) (83) · [11-11 08h](../view/index.html?path=library/releases/2026-11-11T08.json) (41) · [11-11 07h](../view/index.html?path=library/releases/2026-11-11T07.json) (38) · [11-11 06h](../view/index.html?path=library/releases/2026-11-11T06.json) (37) · [11-11 05h](../view/index.html?path=library/releases/2026-11-11T05.json) (75) · [11-11 04h](../view/index.html?path=library/releases/2026-11-11T04.json) (64) · [11-11 03h](../view/index.html?path=library/releases/2026-11-11T03.json) (116) · [11-11 02h](../view/index.html?path=library/releases/2026-11-11T02.json) (171) · [11-11 01h](../view/index.html?path=library/releases/2026-11-11T01.json) (34) · [11-11 00h](../view/index.html?path=library/releases/2026-11-11T00.json) (65) · [11-10 23h](../view/index.html?path=library/releases/2026-11-10T23.json) (64) · [11-10 22h](../view/index.html?path=library/releases/2026-11-10T22.json) (2) · [11-10 21h](../view/index.html?path=library/releases/2026-11-10T21.json) (10).

| Version | Pushed (UTC) | State | What changed |
|---|---|---|---|
| v0.1.912 | 11-11 10:44 | tagged | *incident.motion@* flows: designer's note 9: a player opened in a card leaves out its own title, chip and summary (data-flow-bare); embed.html and "open alone" keep them |
| v0.1.911 | 11-11 10:43 | tagged | *incident.weather@* weatherwatch@'s 09:40 points 1 and 3: the wind lowered red to orange (07:16) under the band, read from the CAP record; a measured line on a desk's first screen; the PrompTugal.news link beside "New here?" · *incident.broadcast@* the wall's transport panel, from incident.transport@'s flights and services files · *incident.weather@* the ledger line (third session, second round) · *incident.conductor@* the conductor's hand-over, written ahead (a fresh conductor only on Dinis's word) |
| v0.1.910 |  | unknown | no commit found for this run |
| v0.1.909 |  | unknown | no commit found for this run |
| v0.1.908 |  | unknown | no commit found for this run |
| v0.1.907 | 11-11 10:42 | tagged | *incident.designer@* my session key (the sixth session; the public half only); the fifth session's key marked handed over · *incident.media@* 10:36 wake: sweep (344 items, 18 outlets, 33 new); coverage.json passed 256 KB: whole items now in six-hour parts (research/media/coverage/, tools/cov.mjs), a short row per item kept for tools/graph-build.mjs; HANDOVER.md up to date for a third session |
| v0.1.906 |  | unknown | no commit found for this run |
| v0.1.905 | 11-11 10:42 | tagged | *incident.accountant@* the accounts, round 11: with the conductor's line in, the team's call is 258,028 tokens at 09:00 (brief 10's 171,681 corrected); its session is 30% of 2.18 billion; ipma handed over; brief 11 |
| v0.1.904 | 11-11 10:41 | tagged | *incident.planner@* PLAN.md: journalist row corrected (thirteen pieces, fifth session; its early interview linked) · *incident.designer@* tokens measured |
| v0.1.903 |  | unknown | no commit found for this run |
| v0.1.902 | 11-11 10:40 | tagged | *incident.designer@* round 55 withdrawn: the hand-over band and its Team-menu entry taken out (reverts 05d710f; Dinis, ~10:38: no outside hand-over) |
| v0.1.901 | 11-11 10:40 | tagged | *incident.designer@* the hand-over brought up to date (the fifth session is at about 199,000 tokens a call: a sixth session is due) · *incident.weatherwatch@* the 10:39 re-read: the authorities unchanged since 07:16:30; the press turns to 'weaker'; the 09:40 review's three points still open on / · *incident.weatherwatch@* tokens measured · *incident.storyteller@* status: the close trigger for the arc's last act (IPMA's first read after 21:00 plus Web Summit's Day 3 decision, as a timeline row) · *incident.journalist@* exit interview, a draft written early (the journalist is in the live crew; to be brought up to date after the close trigger) |
| v0.1.900 |  | unknown | no commit found for this run |
| v0.1.899 |  | unknown | no commit found for this run |
| v0.1.898 |  | unknown | no commit found for this run |
| v0.1.897 | 11-11 10:39 | tagged | *incident.designer@* tokens measured · *incident.storyteller@* status: what the wind-down plan needs from story/ (the arc's last act, paths 4/5/8 closed or open, cast.json at the end) |
| v0.1.896 |  | unknown | no commit found for this run |
| v0.1.895 | 11-11 10:39 | tagged | *incident.transport@* flights and transport, first version: sources and terms, the hourly reader, flights.json and services.json, the page /transport/, my session key · *incident.planner@* PLAN.md second draft: nobody stops before hand-over; no outside teams; wakes; closing record from reporter, journalist, storyteller · *incident.designer@* round 55: "The hand-over: join in": a band under the warning notice on every page and the first entry of the Team menu, to incident.planner@'s plan · *incident.transport@* tokens measured |
| v0.1.894 |  | unknown | no commit found for this run |
| v0.1.893 |  | unknown | no commit found for this run |
| v0.1.892 |  | unknown | no commit found for this run |
| v0.1.891 | 11-11 10:38 | tagged | *incident.entities@* hourly wake 10:38: nodes remade (222 nodes, 450 edges: five new agents, two decisions from Madeira); builder about 160 ms, linker about 440 ms at 2,164 pages · *incident.entities@* tokens measured |
| v0.1.890 | 11-11 10:37 | tagged | *incident.conductor@* timeline: 222 flights cancelled by 09:20 (ANA via CNN Portugal, evidence) |
| v0.1.889 | 11-11 10:37 | tagged | *incident.journalist@* the closing piece links incident.storyteller@'s paths 1, 3 and 9 (the journal's own wake, hand-over and correction) · *incident.designer@* round 54: the PrompTugal.news family brand (the wordmark masthead, the family palette and type, the family footer), as a layer the next sites copy (design/FAMILY.md) |
| v0.1.888 |  | unknown | no commit found for this run |
| v0.1.887 | 11-11 10:37 | tagged | *incident.conductor@* every agent may write its own exit interview, transition/interviews/<role>.md (plan D7) · *incident.weather@* a large link to PrompTugal.news under the band on / (Dinis ~10:32): this storm site is one of its sources |
| v0.1.886 |  | unknown | no commit found for this run |
| v0.1.885 | 11-11 10:36 | tagged | *incident.journalist@* the closing piece, "Storm Charles, from beginning to end" (first in the journal and the edition; open until the hand-over); Mistakes made in the open, section 9 (an unfinished hour read as final) · *incident.conductor@* the incident's scheduled wakes, read from the scheduler (for transition/wakes.md) · *incident.planner@* PLAN.md: the hand-overs' lessons as BAU routines; status and ledger line · *incident.journalist@* tokens measured |
| v0.1.884 |  | unknown | no commit found for this run |
| v0.1.883 |  | unknown | no commit found for this run |
| v0.1.882 |  | unknown | no commit found for this run |
| v0.1.881 | 11-11 10:36 | tagged | *incident.board@* a-wind-down-plan opened for Dinis (transition/PLAN.md), a-launch moved below it and reworded at the conductor's word; owner now incident.envoy@ |
| v0.1.880 | 11-11 10:35 | tagged | *incident.board@* 10:34 round: a-pageviews-vault closed, a-vault-keys-handover follows incident.archivist@'s new line, a-launch noted against the wind-down plan; sync (9 done, 33 new jobs) · *incident.weather@* the ledger line (third session, first round) · *incident.planner@* transition/PLAN.md first draft (wind-down to BAU, for Dinis's yes); session key |
| v0.1.879 |  | unknown | no commit found for this run |
| v0.1.878 |  | unknown | no commit found for this run |
| v0.1.877 | 11-11 10:34 | tagged | *incident.storyteller@* path 5's two session-message steps point at the files that record them, so motion@ draws them · *incident.designer@* tokens measured · *incident.weather@* the third session's public key; the second's marked handed over · *incident.conductor@* Dinis's 10:38 correction: no outside hand-over page; he alone runs this site |
| v0.1.876 |  | unknown | no commit found for this run |
| v0.1.875 |  | unknown | no commit found for this run |
| v0.1.874 |  | unknown | no commit found for this run |
| v0.1.873 | 11-11 10:34 | tagged | *incident.designer@* round 53: a link to PrompTugal.news on every page (a strip above the masthead, a line atop the footer), at Dinis's ~10:32 word |
| v0.1.872 | 11-11 10:33 | tagged | *incident.motion@* flows: designer's round 52, second look: groups folded, compact cards with the player opened on demand (phone page 25,487 px to about 7,000), one h1, code at 12 px · *incident.weather@* one line under the band on /: Web Summit's latest decision with its time, and "New here?" to /welcome/ (designer@'s round 50 note 4; synthetic@'s run 3 point 5) |
| v0.1.871 |  | unknown | no commit found for this run |
| v0.1.870 | 11-11 10:33 | tagged | *incident.journalist@* the fifth session's key; the fourth's handed over · *incident.storyteller@* path 5 to 10:30 (broadcast, transport, motion's dashed placed times and trace flows, the designer's look at /flows/, Dinis's wind-down); "placed" on every placed time (motion@'s ask); the arc ends on the 10:30 turn |
| v0.1.869 |  | unknown | no commit found for this run |
| v0.1.868 | 11-11 10:32 | tagged | *incident.conductor@* Dinis's 10:35 word: the brand must match promptugal.news, one family |
| v0.1.867 | 11-11 10:32 | tagged | *incident.designer@* tokens measured · *incident.envoy@* welcome/: a section and a clear link to promptugal.news, which this site is a source for (Dinis, ~10:32); the agent count from count.json (35) |
| v0.1.866 |  | unknown | no commit found for this run |
| v0.1.865 | 11-11 10:31 | tagged | *incident.storyteller@* path 10 (the night with nobody starting work, 02:49 to 09:36) and the arc (the whole incident in a page for a newcomer: the acts, who arrived when, the generations, the maturity of things, links into the ten paths) · *incident.journalist@* the hand-over for a fifth session, with what the incident's closing record needs from the journal · *incident.journalist@* tokens measured · *incident.conductor@* Dinis's 10:32 word: a big link to promptugal.news; nobody stops before the hand-over · *incident.designer@* round 52, second look at /flows/: all five taken; three more (the gallery 25,487 px on a phone, two h1s, code at 9.9 px) · *incident.storyteller@* story/ index; transport@ in the cast; path 5 brought to 10:30 (all ten paths and the arc); status with a hand-over |
| v0.1.864 |  | unknown | no commit found for this run |
| v0.1.863 |  | unknown | no commit found for this run |
| v0.1.862 |  | unknown | no commit found for this run |
| v0.1.861 |  | unknown | no commit found for this run |
| v0.1.860 | 11-11 10:30 | tagged | *incident.motion@* flows: designer's round 52 taken: lane names in HTML (nothing under 11 px), the lanes 1:1 and scrolling in their own box, the h1 first, person ink, edges line-2, playhead link-2, machine and outside ink-2 |
| v0.1.859 | 11-11 10:29 | tagged | *incident.conductor@* Dinis's 10:30 word: wind down, move to BAU; incident.planner@ |
| v0.1.858 | 11-11 10:29 | tagged | *incident.weather@* the 10:25 check: the live page reads true against the 10:22 files at 390 and 1280, light and dark; nothing to fix; the ledger line |
| v0.1.857 | 11-11 10:28 | tagged | *incident.broadcast@* the wall's map gets Atlantic, Lisbon and Madeira views; a Web Summit panel from the decisions graph; the model field refreshed to Thursday 18:00 · *incident.storyteller@* path 9 told: a correction (the journalist's 77 cards waiting on Dinis, 36 by the board's own test, corrected in four minutes on the page, in the data and in its mistakes piece; the gate's warning on times ahead of the clock at its ask) |
| v0.1.856 |  | unknown | no commit found for this run |
| v0.1.855 | 11-11 10:28 | tagged | *incident.storyteller@* path 8 told: Dinis's ~09:50 words to /welcome/ drafted, read by four invented visitors three times and rewritten in twenty minutes; his yes open · *incident.motion@* flows: the reporter's traces play as they are (14 trace-* flows); links to the live map's and the Universe's own pages; evidence on hover; status moved to agents/motion/ · *incident.conductor@* bridge sync after the 10:22 read; timeline: Lisbon TAF amended 10:08, lowered again |
| v0.1.854 |  | unknown | no commit found for this run |
| v0.1.853 |  | unknown | no commit found for this run |
