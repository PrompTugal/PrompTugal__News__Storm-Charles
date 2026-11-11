# The release history: every version, what changed, and whether it was served

> Kept by incident.librarian@web-summit.dinis, 2026-11-11, 04:10 UTC. Built by [tools/library-releases.mjs](../tools/library-releases.mjs) from the tags, the commit subjects and the deploy workflow's runs as incident.ci@ keeps them ([the pipeline](../ci/README.md)), read at that time; the data is [releases.json](releases.json). Back to [the library](README.md).

CI numbers every push (`v0.1.<run>`), deploys it and tags it; nobody who pushes writes a number ([BRIEF-CORRECTIONS.md](../BRIEF-CORRECTIONS.md)). Until about 23:55 UTC on 10 November the newest push cancelled a run in progress; since then a running deploy finishes and only a run still waiting is replaced (the workflow's own comment), so a later "cancelled" should mean it never started. **498 runs: 305 served (confirmed by CI), 16 deployed and tagged but cancelled before CI confirmed, 163 cancelled before the tag, 6 failed, 8 still running or unknown when read.**

## Versions never confirmed served

169 of 498. The newest: v0.1.472, v0.1.471, v0.1.468, v0.1.467, v0.1.464, v0.1.441, v0.1.439, v0.1.437, v0.1.433, v0.1.426, v0.1.417, v0.1.411, v0.1.409, v0.1.396, v0.1.394, v0.1.393, v0.1.392, v0.1.390, v0.1.387, v0.1.386, v0.1.383, v0.1.381, v0.1.380, v0.1.379, v0.1.378, v0.1.377, v0.1.376, v0.1.374, v0.1.373, v0.1.372. Each hour's file lists every version with its state.

**This is not a list of versions that were never deployed**, and none can be made from the runs alone: a cancelled deploy step can still go live. Run 32: served: /version.json answered v0.1.32 with commit 487818fc40 when read at 23:49 UTC, although the run's deploy step is recorded as cancelled (job 130213112738) and no tag was pushed (incident.librarian@). Each of these versions' commits is contained in the next served version, so no change was lost; what is not known is whether a reader was ever served that exact number.

## The newest sixty versions

What changed is each commit's own subject, as its agent wrote it. Every version, hour by hour, as data: [11-11 04h](../view/index.html?path=library/releases/2026-11-11T04.json) (28) · [mmit-foundh](../view/index.html?path=library/releases/no-commit-found.json) (8) · [11-11 03h](../view/index.html?path=library/releases/2026-11-11T03.json) (116) · [11-11 02h](../view/index.html?path=library/releases/2026-11-11T02.json) (171) · [11-11 01h](../view/index.html?path=library/releases/2026-11-11T01.json) (34) · [11-11 00h](../view/index.html?path=library/releases/2026-11-11T00.json) (65) · [11-10 23h](../view/index.html?path=library/releases/2026-11-10T23.json) (64) · [11-10 22h](../view/index.html?path=library/releases/2026-11-10T22.json) (2) · [11-10 21h](../view/index.html?path=library/releases/2026-11-10T21.json) (10).

| Version | Pushed (UTC) | State | What changed |
|---|---|---|---|
| v0.1.498 | 11-11 04:18 | tagged | *incident.journalist@* the edition prints at 2.0 MB where it was 12.1 MB (110 pages): the article's soft shadow printed as two full-page mask images per page; a print rule in the journal's stylesheet removes it |
| v0.1.497 | 11-11 04:16 | tagged | *incident.board@* a-provider-credit: the first refusal's time (02:53:57, checked) and the reporter's trace of the outage as evidence |
| v0.1.496 | 11-11 04:16 | tagged | *incident.observability@* /agents/ stays phone-wide when GitHub's API refuses the browser (the error note now wraps); the hour's snapshots; tokens measured · *incident.conductor@* sync: every decision edge carries an area (lisbon, mainland, national, madeira, porto-santo) · *incident.librarian@* tokens measured |
| v0.1.495 |  | unknown | no commit found for this run |
| v0.1.494 |  | unknown | no commit found for this run |
| v0.1.493 | 11-11 04:16 | tagged | *incident.librarian@* the fourth session's key (the third's marked handed over) |
| v0.1.492 | 11-11 04:14 | tagged | *incident.journalist@* tokens measured · *incident.librarian@* the third session's hand-over (the conductor's catalogue job and the journalist's four points passed on); tokens measured · *incident.reporter@* tokens measured; the index's size in the reporter's README |
| v0.1.491 |  | unknown | no commit found for this run |
| v0.1.490 |  | unknown | no commit found for this run |
| v0.1.489 | 11-11 04:14 | tagged | *incident.conductor@* the conductor's status brought to 04:15 (session, the hourly wake's steps, what is in flight, what waits on Dinis) · *incident.journalist@* the seventh piece checked against the reporter's outage trace (it agrees; trace supports and a relay picture added; the 02:38 refusals kept as a difference, said on the page) · *incident.reporter@* two traces owed: the Studio (a spoken idea at 00:30 to a player and two chapters in 8 min 19 s, six explanations and a cast by 03:55) and an agent's start (the Perplexity desk: a jobs line to a first page in 12 minutes, a timeline row from its leads 80 s later); ten traces, 131 steps |
| v0.1.488 |  | unknown | no commit found for this run |
| v0.1.487 |  | unknown | no commit found for this run |
| v0.1.486 | 11-11 04:13 | tagged | *incident.conductor@* the PDF renderer is in the repository (admin/tools/render-pdf.cjs), so the journalist and the librarian can test what prints |
| v0.1.485 | 11-11 04:13 | tagged | *incident.librarian@* tokens measured |
| v0.1.484 | 11-11 04:13 | tagged | *incident.journalist@* tokens measured · *incident.librarian@* library/pack/conductor-handover.md: what the next conductor session needs to lead from the pack (its rules, the bridge, its wake, the agents with sessions and wakes, what waits on Dinis); the wakes as data; what the pack did not tell the third session |
| v0.1.483 |  | unknown | no commit found for this run |
| v0.1.482 | 11-11 04:12 | tagged | *incident.journalist@* the second session's first round: a seventh piece, "An empty account stopped the models, and only the models" (from the record; the reporter's trace is owed); the sixth piece gains this session as its newest example; What it cost gains the books at 03:33; the status says what the pack and the hand-over did not tell a fresh session |
| v0.1.481 | 11-11 04:12 | tagged | *incident.librarian@* the pack from a sixth fresh start (the reporter's): who marks an earlier key handed over, tags at every wake, where the context number is; three points left in the hand-over |
| v0.1.480 | 11-11 04:11 | tagged | *incident.designer@* round 44: a long bar's words stay in view when a strip is scrolled; the data room prints on a page; two notes for the Weather face; tokens measured · *incident.reporter@* an eighth trace (the model provider's account out of credit at 02:53:57: what stopped, three code changes, one card for Dinis); three more hand-overs in the memory trace (nine in eight roles); the log's 04:00 hour; what the pack and the hand-over did not say |
| v0.1.479 |  | unknown | no commit found for this run |
| v0.1.478 | 11-11 04:11 | tagged | *incident.ci@* the 04:10 wake: 477 runs and 523 commits; no new failure, no deploy retry fired; tokens measured |
| v0.1.477 | 11-11 04:09 | served | *incident.journalist@* tokens measured |
| v0.1.476 | 11-11 04:09 | served | *incident.journalist@* a second session takes over: its session key's public half; the first session's entry marked handed over |
| v0.1.475 | 11-11 04:09 | served | *incident.journalist@* handed over to a fresh session (the conductor's word, 04:08): this session's key marked handed over; a hand-over note in the status file; the sixth piece says so; nothing more is pushed from this session |
| v0.1.474 | 11-11 04:08 | served | *incident.librarian@* tokens measured |
| v0.1.473 | 11-11 04:07 | served | *incident.librarian@* the third session's key (public half); the second session's entry marked handed over |
| v0.1.472 | 11-11 04:07 | not confirmed | *incident.reporter@* tokens measured |
| v0.1.471 | 11-11 04:07 | not confirmed | *incident.journalist@* 04:05 round: a sixth piece, "Starting again is cheaper than remembering" (from the reporter's seventh trace); supports re-anchored where incident.ci@'s and the accountant's files had changed; the mistakes piece records the gate's clock warning; tokens measured |
| v0.1.470 | 11-11 04:07 | served | *incident.reporter@* a second session takes over: its session key's public half (the first session marked its own entry handed over) |
| v0.1.469 | 11-11 04:06 | served | *incident.reporter@* the first reporter session's key marked handed over (a fresh session carries on from agents/reporter/HANDOVER.md and the pack); this session pushes nothing more |
| v0.1.468 | 11-11 04:06 | not confirmed | *incident.shadow@* the 04:00 hour is a second recorded gap (the engines' account still out of credit); shadow-ask reads the wrapper's out-of-credit statuses |
| v0.1.467 | 11-11 04:06 | not confirmed | *incident.librarian@* the second session's hand-over (context 248,109 after 95 calls; a third session asked of the conductor before 04:44) |
| v0.1.466 | 11-11 04:06 | served | *incident.board@* a-llm-cap: event_utc from another repository's commit, as reported by incident.reporter@ and marked as not checked here |
| v0.1.465 | 11-11 04:05 | served | *incident.librarian@* tokens measured |
| v0.1.464 | 11-11 04:05 | not confirmed | *incident.librarian@* what is new: 03:00 to 04:00 closed (125 commits by 27 agents, 116 versions); the release history refreshed |
| v0.1.463 | 11-11 04:05 | served | *incident.reporter@* the 04:00 wake: a seventh trace (memory: "the librarian saves tokens" to the pack, the accountant's measurement and six hand-overs in 48 minutes); the log's 03:00 hour; numbers by the board's event time; a hand-over note · *incident.reporter@* tokens measured |
| v0.1.462 | 11-11 03:56 | served | *incident.librarian@* the pack from a fifth fresh start (the Studio's): a role pack lists each path once and the agent's ledger line; who needs state.json at the start; which fingerprint is which; the build has no --out |
| v0.1.461 | 11-11 03:55 | served | *incident.studio@* tokens measured |
| v0.1.460 | 11-11 03:54 | served | *incident.studio@* a sixth explanation, "The hand-over" (the sentence, the pack, the finding, five hand-overs measured); measured figures in "What compression is" (a box under eight scenes and a seventh chapter, each linked to the accountant's file); the player's scene field 'measured'; what the pack and the note did not tell the second session |
| v0.1.459 | 11-11 03:54 | served | *incident.graph@* in a node's pane each cited source carries our capture on the same line |
| v0.1.458 | 11-11 03:53 | served | *incident.conductor@* Madeira: 71 occurrences to 02:00, as evidence (the civil protection's count reaches the press through a platform that is not public; its site has none); sync |
| v0.1.457 | 11-11 03:50 | served | *incident.wikipedia@* 03:44 read: the pt article now says 71 incidents in Madeira to 02:00 (was 38 to 23:30) and adds Porto Santo's power failures; claims and the two-way table updated; the wake's tokens measured |
| v0.1.456 | 11-11 03:50 | served | *incident.graph@* the graph mints no source:* id (the conductor's decision, 03:48): its Source nodes are address:<id>; each registered-as crossing carries the register's own id |
| v0.1.455 | 11-11 03:48 | served | *incident.librarian@* the pack's contracts: source:* ids are the sources agent's (sources/registry.json); links made in the browser are checked by their maker |
| v0.1.454 | 11-11 03:47 | served | *incident.librarian@* tokens measured |
| v0.1.453 | 11-11 03:47 | served | *incident.librarian@* 03:47 wake: what is new for 03:00 brought to 03:45 (the journal's two pieces, IPMA's 03:15 rewrite, the corrections); the release history and the commit record refreshed |
| v0.1.452 | 11-11 03:43 | served | *incident.entities@* body/meteoalarm is actor:meteoalarm in the graph; nodes current |
| v0.1.451 | 11-11 03:43 | served | *incident.graph@* actor:meteoalarm and actor:noaa-awc: a host of an official body in the register of sources is that body, named (agreed with incident.entities@); two actor:host ids go |
| v0.1.450 | 11-11 03:43 | served | *incident.ipma@* 03:33 read: IPMA's feed rewritten at 03:15, four yellow warnings ended at 03:00 (none replaced or withdrawn, none new); first diffs for 9 data sets; the directory listing complete (115 folders) |
| v0.1.449 | 11-11 03:42 | served | *incident.librarian@* the pack from a fourth fresh start (the graph's): Wayback in the glossary, the browser's import, an entity id carries its type; asks to the conductor |
| v0.1.448 | 11-11 03:42 | served | *incident.entities@* body/meteoalarm names its graph node (actor:meteoalarm; held back until the graph has it); nodes current |
| v0.1.447 | 11-11 03:41 | served | *incident.weatherwatch@* two more studies: DWD's warnings by municipality and the US national hazards map (twelve studies, 71 callouts); two frames asked of the archivist · *incident.weatherwatch@* tokens measured |
| v0.1.446 | 11-11 03:41 | served | *incident.graph@* the graph joined to sources/, meteorology/ and evidence/ (crossings.json: named edges with inverses, nothing copied); every address ends at our capture; the entity links mended |
| v0.1.445 | 11-11 03:39 | served | *incident.librarian@* the pack from a third fresh start (weatherwatch's): how a taken-over key is named, what a hand-over must say; an ask to the accountant on measure.md's example commit |
| v0.1.444 | 11-11 03:39 | served | *incident.ci@* the 03:38 wake: 442 runs and 485 commits; the reader records a deploy's second try; no new failure; tokens measured |
| v0.1.443 | 11-11 03:39 | served | *incident.weatherwatch@* the second session starts: the 03:37 re-read (authorities unchanged, nothing new in the coverage); Jornal de Negócios link only in the pages, the address list and the tools; status says what the pack and the hand-over did not · *incident.weatherwatch@* tokens measured |
| v0.1.442 | 11-11 03:37 | served | *incident.media@* the official gazette is not press: removed from the coverage list (224 items, 17 outlets) |
| v0.1.441 | 11-11 03:37 | not confirmed | *incident.studio@* tokens measured (the fresh session's first line) |
| v0.1.440 | 11-11 03:37 | served | *incident.media@* 03:36 wake: sweep |
| v0.1.439 | 11-11 03:37 | not confirmed | *incident.studio@* a fresh studio session takes the row: its session key (the first session's marked handed over) |
