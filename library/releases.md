# The release history: every version, what changed, and whether it was served

> Kept by incident.librarian@web-summit.dinis, 2026-11-11, 02:54 UTC. Built by [tools/library-releases.mjs](../tools/library-releases.mjs) from the tags, the commit subjects and the deploy workflow's runs as incident.ci@ keeps them ([the pipeline](../ci/README.md)), read at that time; the data is [releases.json](releases.json). Back to [the library](README.md).

CI numbers every push (`v0.1.<run>`), deploys it and tags it; nobody who pushes writes a number ([BRIEF-CORRECTIONS.md](../BRIEF-CORRECTIONS.md)). Until about 23:55 UTC on 10 November the newest push cancelled a run in progress; since then a running deploy finishes and only a run still waiting is replaced (the workflow's own comment), so a later "cancelled" should mean it never started. **382 runs: 210 served (confirmed by CI), 24 deployed and tagged but cancelled before CI confirmed, 111 cancelled before the tag, 4 failed, 33 still running or unknown when read.**

## Versions never confirmed served

115 of 382. The newest: v0.1.326, v0.1.320, v0.1.315, v0.1.312, v0.1.309, v0.1.305, v0.1.304, v0.1.300, v0.1.299, v0.1.298, v0.1.297, v0.1.295, v0.1.294, v0.1.292, v0.1.291, v0.1.289, v0.1.288, v0.1.286, v0.1.285, v0.1.284, v0.1.281, v0.1.279, v0.1.276, v0.1.275, v0.1.273, v0.1.271, v0.1.269, v0.1.268, v0.1.266, v0.1.265. Each hour's file lists every version with its state.

**This is not a list of versions that were never deployed**, and none can be made from the runs alone: a cancelled deploy step can still go live. Run 32: served: /version.json answered v0.1.32 with commit 487818fc40 when read at 23:49 UTC, although the run's deploy step is recorded as cancelled (job 130213112738) and no tag was pushed (incident.librarian@). Each of these versions' commits is contained in the next served version, so no change was lost; what is not known is whether a reader was ever served that exact number.

## The newest sixty versions

What changed is each commit's own subject, as its agent wrote it. Every version, hour by hour, as data: [11-11 03h](../view/index.html?path=library/releases/2026-11-11T03.json) (9) · [mmit-foundh](../view/index.html?path=library/releases/no-commit-found.json) (33) · [11-11 02h](../view/index.html?path=library/releases/2026-11-11T02.json) (165) · [11-11 01h](../view/index.html?path=library/releases/2026-11-11T01.json) (34) · [11-11 00h](../view/index.html?path=library/releases/2026-11-11T00.json) (65) · [11-10 23h](../view/index.html?path=library/releases/2026-11-10T23.json) (64) · [11-10 22h](../view/index.html?path=library/releases/2026-11-10T22.json) (2) · [11-10 21h](../view/index.html?path=library/releases/2026-11-10T21.json) (10).

| Version | Pushed (UTC) | State | What changed |
|---|---|---|---|
| v0.1.382 | 11-11 03:03 | tagged | *incident.studio@* tokens measured (one line of numbers from this session's own transcript) · *incident.graph@* the session's tokens measured: one line of numbers in accounts/ledger/graph.jsonl · *incident.weatherwatch@* weather-sites studies: the Met Office frame shown with its consent panel hidden (and says so); all six shown captures checked against their callouts; tokens measured · *incident.reporter@* the project itself, as a record: six traces from Dinis's word to a live page (the whole arc, small, medium, large, corrections, escalations), the log hour by hour, the numbers by hour; session key (public half) · *incident.journalist@* correction: 36 cards wait on Dinis, not 77 (my count matched every agent address ending in ".dinis"); the oldest four, not five, date from 21:45; said on the page, in its record and in the mistakes piece · *incident.designer@* design round 42: parts shared by the two faces (.wx-level, .wx-word, .wx-warn, .wx-sect); the masthead in two lines on a desk (97 px, was 133); design/HANDOVER.md for the next designer session · *incident.perplexity@* the page leads with the scorecard in one sentence and says runs are paused (the account's credit, not the key's limit); capture asks; the leads' status · *incident.perplexity@* tokens measured |
| v0.1.381 |  | unknown | no commit found for this run |
| v0.1.380 |  | unknown | no commit found for this run |
| v0.1.379 |  | unknown | no commit found for this run |
| v0.1.378 |  | unknown | no commit found for this run |
| v0.1.377 |  | unknown | no commit found for this run |
| v0.1.376 |  | unknown | no commit found for this run |
| v0.1.375 | 11-11 03:03 | tagged | *incident.librarian@* the second librarian session's public key (the first session's stays listed, marked handed over) · *incident.librarian@* tokens measured (the second session's start from the pack) · *incident.sources@* this session's tokens, measured (one ledger line of numbers) · *incident.entities@* this session's tokens so far, measured from its own transcript (numbers only); nodes current · *incident.archivist@* this session's token line for the accounts ledger · *incident.ipma@* this session's token count after round 1 (one line of numbers) · *incident.media@* tokens measured for this session (one line of numbers in accounts/ledger/media.jsonl) |
| v0.1.374 |  | unknown | no commit found for this run |
| v0.1.373 |  | unknown | no commit found for this run |
| v0.1.372 |  | unknown | no commit found for this run |
| v0.1.371 |  | unknown | no commit found for this run |
| v0.1.370 |  | unknown | no commit found for this run |
| v0.1.369 | 11-11 03:02 | tagged | *incident.perplexity@* the key has no credit (03:02 UTC): a refused call is recorded apart from the answers; status and the page say so · *incident.journalist@* the journal's second piece, "Mistakes made in the open": seven kinds of mistake, who found each, the correcting commit, what each changed in a rule or a tool, what is still open; the 17 corrections drawn on the night's axis |
| v0.1.368 |  | unknown | no commit found for this run |
| v0.1.367 | 11-11 03:02 | tagged | *incident.weather@* tokens measured · *incident.accountant@* the accounts, round 3: the measure page corrected (the path check failed, it did not warn); the provider's account beside the cap; the pack measured again (63% less, 8 of 8); nine agents' reported figures; a fresh conductor session each hour estimated at 46% less; brief 3 · *incident.archivist@* Wayback: a notices-hidden frame beside the frame (frame-clean.jpg); the Met Office study re-captured with it; more research captures · *incident.conductor@* 03:02 wake: Web Summit's schedule as read at 02:55 (the PITCH semi-final's page still says Wednesday 17:00 to 18:00; Wednesday's sessions still listed, unmarked); sync |
| v0.1.366 |  | unknown | no commit found for this run |
| v0.1.365 |  | unknown | no commit found for this run |
| v0.1.364 |  | unknown | no commit found for this run |
| v0.1.363 | 11-11 03:02 | tagged | *incident.librarian@* handed over to a fresh session started from the pack (agents/librarian/status.json holds the hand-over); tokens measured · *incident.weatherwatch@* tokens measured |
| v0.1.362 |  | unknown | no commit found for this run |
| v0.1.361 | 11-11 03:01 | tagged | *incident.perplexity@* Perplexity as a research tool, round 1: three open questions asked, every cited address opened, the scorecard, three leads, the page · *incident.labs@* tokens measured (rounds 1 to 4) · *incident.designer@* the session's token line for the accountant (numbers only) |
| v0.1.360 |  | unknown | no commit found for this run |
| v0.1.359 |  | unknown | no commit found for this run |
| v0.1.358 | 11-11 03:01 | tagged | *incident.meteorology@* tokens measured · *incident.observability@* each agent's home shows its measured tokens (accounts/agents.json) or 'not measured'; my own line waits on the path policy · *incident.stories@* its session measured (accounts/ledger/stories.jsonl: one line of token counts, no text) · *incident.stories@* Madeira retold on the 02:38 read (Areeiro 230.8 mm in six hourly values, São Vicente 137.0; no station-to-area table; gusts only at the airports); Lisbon's observation sentences hold until 12:00 or the first gust above the warned gust · *incident.weather@* correction: the times in my status file and 'Kept by' lines were written without reading the clock and ran hours ahead; replaced by the commits' own times · *incident.weatherwatch@* weather-sites studies: five captures drawn under the callouts from the display vault (sha256 checked in the browser), points checked against their parts; Met Office's frame waits for one with notices hidden |
| v0.1.357 |  | unknown | no commit found for this run |
| v0.1.356 |  | unknown | no commit found for this run |
| v0.1.355 |  | unknown | no commit found for this run |
| v0.1.354 |  | unknown | no commit found for this run |
| v0.1.353 | 11-11 03:00 | tagged | *incident.weather@* status: tokens measured but not pushed (the path check fails accounts/ledger/ for me); the line went to the accountant by message · *incident.graph@* status: the token line is measured but the path policy refuses accounts/ledger/graph.jsonl from this agent · *incident.conductor@* every agent owns its own line in accounts/ledger/<role>.jsonl (the path check refused the measure step) |
| v0.1.352 |  | unknown | no commit found for this run |
| v0.1.351 |  | unknown | no commit found for this run |
| v0.1.350 | 11-11 03:00 | tagged | *incident.studio@* 03:00 wake: characters for the four new agents (perplexity, accountant, reporter, journalist: the cast is 30); "Follow a word" recounted (54 of 75 cited addresses captured) · *incident.models@* the cap at 20 a day as per-agent shares (models/budgets.json); round 2 built and run in part (the provider refused calls for lack of credits from 02:55Z); a page per model at models/models/ with its licence; results per model; a correction · *incident.librarian@* the pack: the accountant's measurement first (64% less to read at the start, 25,611 tokens), the two rules its test found missing, estimates by the measured ratios; status · *incident.accountant@* the accounts, round 2: the conductor's session measured (327 million tokens in 758 calls, 99.4% re-reading the context; the agents' reports are the largest thing it reads); savings and brief 2 · *incident.entities@* nodes regenerated from the current decision graph and evidence index |
| v0.1.349 |  | unknown | no commit found for this run |
| v0.1.348 |  | unknown | no commit found for this run |
| v0.1.347 |  | unknown | no commit found for this run |
| v0.1.346 |  | unknown | no commit found for this run |
| v0.1.345 | 11-11 02:59 | tagged | *incident.meteorology@* meteorology round 5: all 106 weather sites in the graph; "What we may build on today"; one MeteoAlarm licence statement · *incident.conductor@* tokens measured · *incident.conductor@* the cross-folder log · *incident.journalist@* the journal: how this site was made; the index and the first piece ("A storm, one person, twenty-something agents, one night", a draft), every statement with its supports resolved on each build; two pictures drawn from the run data; a printable edition; session key (public half) |
| v0.1.344 |  | unknown | no commit found for this run |
| v0.1.343 |  | unknown | no commit found for this run |
| v0.1.342 | 11-11 02:58 | tagged | *incident.accountant@* the accounts, round 1: what the project costs as data (model spend 0.92 of 20 US dollars, CI, tokens by agent where measured), the measuring tool every agent runs on its own session (WS-148's method), the librarian's pack measured (64% less to read at the start), where the savings are, brief 1; session key |
| v0.1.341 | 11-11 02:57 | tagged | *incident.entities@* the sources bodies' also-names are linked (a name a node here has stays here); nodes regenerated |
| v0.1.340 | 11-11 02:57 | tagged | *incident.archivist@* Wayback: each record carries its site's terms-page address where read; first research captures; status · *incident.sources@* plain names (also) for the linker on 15 bodies; the venues point to place/venue · *incident.librarian@* the pack's index: the rule on brains (WS-190) and the accountant's first finding (WS-148), as relayed by the conductor; named the incident's brain; status |
| v0.1.339 |  | unknown | no commit found for this run |
| v0.1.338 |  | unknown | no commit found for this run |
| v0.1.337 | 11-11 02:56 | tagged | *incident.entities@* a body's source page is its own address (sources/<id>/); the join uses incident.sources@'s entity field in both directions |
| v0.1.336 | 11-11 02:56 | tagged | *incident.librarian@* the pack: the token-efficiency rules and the accountant's finding from the main site's public pages, labelled as theirs; clock times corrected; status |
| v0.1.335 | 11-11 02:55 | tagged | *incident.sources@* a page and a source.json for every body (sources/<id>/, made at build time), each pointing to its entity page where one exists |
| v0.1.334 | 11-11 02:55 | tagged | *incident.archivist@* Wayback: a fixed-frame picture (--frame 1280x1600) for annotated studies; the ten weather-site studies captured; open-licence weather services shown · *incident.conductor@* the gate looks link targets up in one walk of the built site; its budget is 8 s (the site passed 1,100 pages; push to served stays the measure) |
| v0.1.333 |  | unknown | no commit found for this run |
| v0.1.332 | 11-11 02:55 | tagged | *incident.shadow@* shadow-ask stops at the first HTTP 402 (account out of credit) and records the pause for that hour |
| v0.1.331 | 11-11 02:54 | tagged | *incident.librarian@* library/pack/: the briefing pack (start.md, state.json, history.md, a pack per role, what it costs to read), by tools/library-pack.mjs in the build's generators; policies for the four newest agents; status |
| v0.1.330 | 11-11 02:54 | tagged | *incident.ci@* the 02:53 wake: the CI data refreshed (328 runs, 363 commits); the signing patch rebuilt against the new release.sh; the drift list marks what the conductor fixed |
| v0.1.329 | 11-11 02:54 | tagged | *incident.entities@* incident.sources@'s bodies joined, not copied: a node's page points across to what the body publishes, its licence and how we read it; a body only sources/ has is linked to the sources page; an address whose capture did not answer 200 is not routed to it |
| v0.1.328 | 11-11 02:52 | served | *incident.graph@* 02:51 wake: the graph rebuilt on the 02:42 data, in four parts (the timeline's rows in storm-signals.json); the side panel opens a node's entity |
| v0.1.327 | 11-11 02:52 | served | *incident.entities@* the meteorology graph's names link to its own node pages (a graph of its own, joined by links, not copied); overlapping nodes point across; nodes regenerated (189 nodes, 364 edges) |
| v0.1.326 | 11-11 02:52 | not confirmed | *incident.conductor@* timeline rows re-read against the archivist's corrected captures (23 wrong captures removed by it; rows now point only at captures that exist) |
| v0.1.325 | 11-11 02:52 | served | *incident.weatherwatch@* weather-sites: 39 site pages link to their lineage (meteorology/nodes); BBC's "in association with MeteoGroup" and Weather Underground's stated inputs corrected from incident.meteorology@'s reading |
| v0.1.324 | 11-11 02:51 | served | *incident.archivist@* Wayback: every address the timeline and decisions cite, captured (79 addresses; press kept privately); what could not be read is in the status |
| v0.1.323 | 11-11 02:50 | served | *incident.meteorology@* charles.html: the six-model table to the conductor's conditions; IPMA's and Open-Meteo's own statements of their sources |
