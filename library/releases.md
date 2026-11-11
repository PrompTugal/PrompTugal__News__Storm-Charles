# The release history: every version, what changed, and whether it was served

> Kept by incident.librarian@web-summit.dinis, 2026-11-11, 04:43 UTC. Built by [tools/library-releases.mjs](../tools/library-releases.mjs) from the tags, the commit subjects and the deploy workflow's runs as incident.ci@ keeps them ([the pipeline](../ci/README.md)), read at that time; the data is [releases.json](releases.json). Back to [the library](README.md).

CI numbers every push (`v0.1.<run>`), deploys it and tags it; nobody who pushes writes a number ([BRIEF-CORRECTIONS.md](../BRIEF-CORRECTIONS.md)). Until about 23:55 UTC on 10 November the newest push cancelled a run in progress; since then a running deploy finishes and only a run still waiting is replaced (the workflow's own comment), so a later "cancelled" should mean it never started. **518 runs: 337 served (confirmed by CI), 4 deployed and tagged but cancelled before CI confirmed, 171 cancelled before the tag, 6 failed.**

## Versions never confirmed served

177 of 518. The newest: v0.1.495, v0.1.494, v0.1.491, v0.1.490, v0.1.488, v0.1.487, v0.1.483, v0.1.479, v0.1.472, v0.1.471, v0.1.468, v0.1.467, v0.1.464, v0.1.441, v0.1.439, v0.1.437, v0.1.433, v0.1.426, v0.1.417, v0.1.411, v0.1.409, v0.1.396, v0.1.394, v0.1.393, v0.1.392, v0.1.390, v0.1.387, v0.1.386, v0.1.383, v0.1.381. Each hour's file lists every version with its state.

**This is not a list of versions that were never deployed**, and none can be made from the runs alone: a cancelled deploy step can still go live. Run 32: served: /version.json answered v0.1.32 with commit 487818fc40 when read at 23:49 UTC, although the run's deploy step is recorded as cancelled (job 130213112738) and no tag was pushed (incident.librarian@). Each of these versions' commits is contained in the next served version, so no change was lost; what is not known is whether a reader was ever served that exact number.

## The newest sixty versions

What changed is each commit's own subject, as its agent wrote it. Every version, hour by hour, as data: [11-11 04h](../view/index.html?path=library/releases/2026-11-11T04.json) (56) · [11-11 03h](../view/index.html?path=library/releases/2026-11-11T03.json) (116) · [11-11 02h](../view/index.html?path=library/releases/2026-11-11T02.json) (171) · [11-11 01h](../view/index.html?path=library/releases/2026-11-11T01.json) (34) · [11-11 00h](../view/index.html?path=library/releases/2026-11-11T00.json) (65) · [11-10 23h](../view/index.html?path=library/releases/2026-11-10T23.json) (64) · [11-10 22h](../view/index.html?path=library/releases/2026-11-10T22.json) (2) · [11-10 21h](../view/index.html?path=library/releases/2026-11-10T21.json) (10).

| Version | Pushed (UTC) | State | What changed |
|---|---|---|---|
| v0.1.518 | 11-11 04:44 | tagged | *incident.ci@* the 04:43 wake: 517 runs and 565 commits; no new failure, no deploy retry fired; tokens measured |
| v0.1.517 | 11-11 04:37 | served | *incident.ipma@* 04:34 read: nothing changed (it fell before IPMA's hourly rewrite was served); the hourly read moves to :45 |
| v0.1.516 | 11-11 04:37 | served | *incident.conductor@* timeline row s-1111T0437, the first mainland count (66 occurrences at 03:30), as evidence from Lusa |
| v0.1.515 | 11-11 04:37 | served | *incident.media@* 04:36 wake: sweep (227 items, 17 outlets) |
| v0.1.514 | 11-11 04:36 | served | *incident.conductor@* my measured token line to 04:36 (970 calls; context 110k after the second compaction) |
| v0.1.513 | 11-11 04:36 | served | *incident.accountant@* a hand-over note, so a fresh accountant session starts from the pack and one page |
| v0.1.512 | 11-11 04:35 | served | *incident.accountant@* the accounts, round 5: eight agents have handed over to fresh sessions (53% to 84% less per call); the team's call is getting cheaper hour by hour; 27 of 30 measured (1.44 billion tokens); brief 5 |
| v0.1.511 | 11-11 04:33 | served | *incident.weatherwatch@* the 04:32 re-read: authorities unchanged; first mainland count on a front page (66 occurrences by 03:30, SAPO) · *incident.weatherwatch@* tokens measured |
| v0.1.510 | 11-11 04:32 | served | *incident.archivist@* capture pages made at build time (tools/capture-pages.mjs, in the generators list); the tracked per-capture .md files removed; research captures to 500 addresses |
| v0.1.509 | 11-11 04:31 | served | *incident.social@* 04:26 re-read (nothing new; Web Summit still silent); a page per listed account, made at build (tools/social-accounts.mjs) · *incident.social@* generators.json: tools/social-accounts.mjs (one line) |
| v0.1.508 | 11-11 04:31 | served | *incident.board@* the 04:30 round: synced; two new press rows move no question; the conductor's asks to Dinis now live on the board's cards; tokens measured |
| v0.1.507 | 11-11 04:29 | served | *incident.entities@* nodes regenerated (195 nodes, 377 edges) against the archivist's index of 469 addresses; 124 nodes carry evidence ids |
| v0.1.506 | 11-11 04:28 | served | *incident.archivist@* 04:24 round: no primary source changed; two rendering differences read and marked same content; the index is one line per address with per-source capture lists; research captures to 465 addresses |
| v0.1.505 | 11-11 04:28 | served | *incident.stories@* the 04:27 re-check on the 03:23 read: nothing moved at IPMA; two new rows folded in (RTP's 03:00 bulletin title; Madeira's 71 occurrences, as reported); supports name a re-read by its time |
| v0.1.504 | 11-11 04:24 | served | *incident.sources@* 04:24 round: feed unchanged; one message read as CAP XML (the API map records what it returns) |
| v0.1.503 | 11-11 04:22 | served | *incident.identity@* 04:21 wake: status (checks green, waiting on Dinis); tokens measured |
| v0.1.502 | 11-11 04:21 | served | *incident.librarian@* tokens measured |
| v0.1.501 | 11-11 04:21 | served | *incident.librarian@* 04:00 to 05:00 opened; the journalist's four pack points (supports count as read, library/pack/also.json, commit codes without history, help/print.md); the round article's 5c; start.md: a session is given one or two jobs; the release history refreshed |
| v0.1.500 | 11-11 04:18 | served | *incident.librarian@* the catalogue and the pack in one pass (one walk, one read and one hash per file; index+pack 539 ms to 428 ms, median of 7); library-pack leaves generators.json because library-index now runs it |
| v0.1.499 | 11-11 04:18 | served | *incident.journalist@* tokens measured |
| v0.1.498 | 11-11 04:18 | served | *incident.journalist@* the edition prints at 2.0 MB where it was 12.1 MB (110 pages): the article's soft shadow printed as two full-page mask images per page; a print rule in the journal's stylesheet removes it |
| v0.1.497 | 11-11 04:16 | served | *incident.board@* a-provider-credit: the first refusal's time (02:53:57, checked) and the reporter's trace of the outage as evidence |
| v0.1.496 | 11-11 04:16 | served | *incident.librarian@* tokens measured |
| v0.1.495 | 11-11 04:16 | not confirmed | *incident.conductor@* sync: every decision edge carries an area (lisbon, mainland, national, madeira, porto-santo) |
| v0.1.494 | 11-11 04:16 | not confirmed | *incident.observability@* /agents/ stays phone-wide when GitHub's API refuses the browser (the error note now wraps); the hour's snapshots; tokens measured |
| v0.1.493 | 11-11 04:16 | served | *incident.librarian@* the fourth session's key (the third's marked handed over) |
| v0.1.492 | 11-11 04:14 | served | *incident.reporter@* tokens measured; the index's size in the reporter's README |
| v0.1.491 | 11-11 04:14 | not confirmed | *incident.librarian@* the third session's hand-over (the conductor's catalogue job and the journalist's four points passed on); tokens measured |
| v0.1.490 | 11-11 04:14 | not confirmed | *incident.journalist@* tokens measured |
| v0.1.489 | 11-11 04:14 | served | *incident.reporter@* two traces owed: the Studio (a spoken idea at 00:30 to a player and two chapters in 8 min 19 s, six explanations and a cast by 03:55) and an agent's start (the Perplexity desk: a jobs line to a first page in 12 minutes, a timeline row from its leads 80 s later); ten traces, 131 steps |
| v0.1.488 | 11-11 04:14 | not confirmed | *incident.journalist@* the seventh piece checked against the reporter's outage trace (it agrees; trace supports and a relay picture added; the 02:38 refusals kept as a difference, said on the page) |
| v0.1.487 | 11-11 04:14 | not confirmed | *incident.conductor@* the conductor's status brought to 04:15 (session, the hourly wake's steps, what is in flight, what waits on Dinis) |
| v0.1.486 | 11-11 04:13 | served | *incident.conductor@* the PDF renderer is in the repository (admin/tools/render-pdf.cjs), so the journalist and the librarian can test what prints |
| v0.1.485 | 11-11 04:13 | served | *incident.librarian@* tokens measured |
| v0.1.484 | 11-11 04:13 | served | *incident.librarian@* library/pack/conductor-handover.md: what the next conductor session needs to lead from the pack (its rules, the bridge, its wake, the agents with sessions and wakes, what waits on Dinis); the wakes as data; what the pack did not tell the third session |
| v0.1.483 | 11-11 04:13 | not confirmed | *incident.journalist@* tokens measured |
| v0.1.482 | 11-11 04:12 | served | *incident.journalist@* the second session's first round: a seventh piece, "An empty account stopped the models, and only the models" (from the record; the reporter's trace is owed); the sixth piece gains this session as its newest example; What it cost gains the books at 03:33; the status says what the pack and the hand-over did not tell a fresh session |
| v0.1.481 | 11-11 04:12 | served | *incident.librarian@* the pack from a sixth fresh start (the reporter's): who marks an earlier key handed over, tags at every wake, where the context number is; three points left in the hand-over |
| v0.1.480 | 11-11 04:11 | served | *incident.reporter@* an eighth trace (the model provider's account out of credit at 02:53:57: what stopped, three code changes, one card for Dinis); three more hand-overs in the memory trace (nine in eight roles); the log's 04:00 hour; what the pack and the hand-over did not say |
| v0.1.479 | 11-11 04:11 | not confirmed | *incident.designer@* round 44: a long bar's words stay in view when a strip is scrolled; the data room prints on a page; two notes for the Weather face; tokens measured |
| v0.1.478 | 11-11 04:11 | served | *incident.ci@* the 04:10 wake: 477 runs and 523 commits; no new failure, no deploy retry fired; tokens measured |
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
