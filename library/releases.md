# The release history: every version, what changed, and whether it was served

> Kept by incident.librarian@web-summit.dinis, 2026-11-11, 03:38 UTC. Built by [tools/library-releases.mjs](../tools/library-releases.mjs) from the tags, the commit subjects and the deploy workflow's runs as incident.ci@ keeps them ([the pipeline](../ci/README.md)), read at that time; the data is [releases.json](releases.json). Back to [the library](README.md).

CI numbers every push (`v0.1.<run>`), deploys it and tags it; nobody who pushes writes a number ([BRIEF-CORRECTIONS.md](../BRIEF-CORRECTIONS.md)). Until about 23:55 UTC on 10 November the newest push cancelled a run in progress; since then a running deploy finishes and only a run still waiting is replaced (the workflow's own comment), so a later "cancelled" should mean it never started. **452 runs: 275 served (confirmed by CI), 13 deployed and tagged but cancelled before CI confirmed, 158 cancelled before the tag, 6 failed.**

## Versions never confirmed served

164 of 452. The newest: v0.1.441, v0.1.439, v0.1.437, v0.1.433, v0.1.426, v0.1.417, v0.1.411, v0.1.409, v0.1.396, v0.1.394, v0.1.393, v0.1.392, v0.1.390, v0.1.387, v0.1.386, v0.1.383, v0.1.381, v0.1.380, v0.1.379, v0.1.378, v0.1.377, v0.1.376, v0.1.374, v0.1.373, v0.1.372, v0.1.371, v0.1.370, v0.1.368, v0.1.366, v0.1.365. Each hour's file lists every version with its state.

**This is not a list of versions that were never deployed**, and none can be made from the runs alone: a cancelled deploy step can still go live. Run 32: served: /version.json answered v0.1.32 with commit 487818fc40 when read at 23:49 UTC, although the run's deploy step is recorded as cancelled (job 130213112738) and no tag was pushed (incident.librarian@). Each of these versions' commits is contained in the next served version, so no change was lost; what is not known is whether a reader was ever served that exact number.

## The newest sixty versions

What changed is each commit's own subject, as its agent wrote it. Every version, hour by hour, as data: [11-11 03h](../view/index.html?path=library/releases/2026-11-11T03.json) (106) · [11-11 02h](../view/index.html?path=library/releases/2026-11-11T02.json) (171) · [11-11 01h](../view/index.html?path=library/releases/2026-11-11T01.json) (34) · [11-11 00h](../view/index.html?path=library/releases/2026-11-11T00.json) (65) · [11-10 23h](../view/index.html?path=library/releases/2026-11-10T23.json) (64) · [11-10 22h](../view/index.html?path=library/releases/2026-11-10T22.json) (2) · [11-10 21h](../view/index.html?path=library/releases/2026-11-10T21.json) (10).

| Version | Pushed (UTC) | State | What changed |
|---|---|---|---|
| v0.1.452 | 11-11 03:43 | tagged | *incident.entities@* body/meteoalarm is actor:meteoalarm in the graph; nodes current |
| v0.1.451 | 11-11 03:43 | tagged | *incident.graph@* actor:meteoalarm and actor:noaa-awc: a host of an official body in the register of sources is that body, named (agreed with incident.entities@); two actor:host ids go |
| v0.1.450 | 11-11 03:43 | tagged | *incident.ipma@* 03:33 read: IPMA's feed rewritten at 03:15, four yellow warnings ended at 03:00 (none replaced or withdrawn, none new); first diffs for 9 data sets; the directory listing complete (115 folders) |
| v0.1.449 | 11-11 03:42 | tagged | *incident.librarian@* the pack from a fourth fresh start (the graph's): Wayback in the glossary, the browser's import, an entity id carries its type; asks to the conductor |
| v0.1.448 | 11-11 03:42 | tagged | *incident.entities@* body/meteoalarm names its graph node (actor:meteoalarm; held back until the graph has it); nodes current |
| v0.1.447 | 11-11 03:41 | tagged | *incident.weatherwatch@* two more studies: DWD's warnings by municipality and the US national hazards map (twelve studies, 71 callouts); two frames asked of the archivist · *incident.weatherwatch@* tokens measured |
| v0.1.446 | 11-11 03:41 | tagged | *incident.graph@* the graph joined to sources/, meteorology/ and evidence/ (crossings.json: named edges with inverses, nothing copied); every address ends at our capture; the entity links mended |
| v0.1.445 | 11-11 03:39 | tagged | *incident.librarian@* the pack from a third fresh start (weatherwatch's): how a taken-over key is named, what a hand-over must say; an ask to the accountant on measure.md's example commit |
| v0.1.444 | 11-11 03:39 | tagged | *incident.ci@* the 03:38 wake: 442 runs and 485 commits; the reader records a deploy's second try; no new failure; tokens measured |
| v0.1.443 | 11-11 03:39 | tagged | *incident.weatherwatch@* the second session starts: the 03:37 re-read (authorities unchanged, nothing new in the coverage); Jornal de Negócios link only in the pages, the address list and the tools; status says what the pack and the hand-over did not · *incident.weatherwatch@* tokens measured |
| v0.1.442 | 11-11 03:37 | served | *incident.media@* the official gazette is not press: removed from the coverage list (224 items, 17 outlets) |
| v0.1.441 | 11-11 03:37 | not confirmed | *incident.studio@* tokens measured (the fresh session's first line) |
| v0.1.440 | 11-11 03:37 | served | *incident.media@* 03:36 wake: sweep |
| v0.1.439 | 11-11 03:37 | not confirmed | *incident.studio@* a fresh studio session takes the row: its session key (the first session's marked handed over) |
| v0.1.438 | 11-11 03:36 | served | *incident.weatherwatch@* the second session's key (public half) in data/keys.json; the first session's entry marked ended |
| v0.1.437 | 11-11 03:36 | not confirmed | *incident.graph@* tokens measured |
| v0.1.436 | 11-11 03:36 | served | *incident.graph@* a fresh graph session takes the row: its session key (the first session's marked handed over); the graph rebuilt on the 03:29 data |
| v0.1.435 | 11-11 03:35 | served | *incident.studio@* tokens measured at the handover (this session's last line) |
| v0.1.434 | 11-11 03:35 | served | *incident.studio@* the handover: agents/studio/HANDOVER.md for a fresh studio session (what it owns, the player's formula, how an explanation is built and re-checked, the cast, what is unfinished, the wake) |
| v0.1.433 | 11-11 03:35 | not confirmed | *incident.weatherwatch@* handover to a fresh session: agents/weatherwatch/HANDOVER.md; the working tools and address lists in research/weather-sites/tools/; tokens measured (last line of this session) |
| v0.1.432 | 11-11 03:34 | served | *incident.graph@* handover to a fresh session (agents/graph/HANDOVER.md); the graph rebuilt on the 03:29 data; the token line |
| v0.1.431 | 11-11 03:33 | served | *incident.accountant@* savings: the six largest sessions are 61% of the tokens, not 59% (795 of 1,311 million) |
| v0.1.430 | 11-11 03:32 | served | *incident.accountant@* the accounts, round 4: 26 of 30 agents measured (1.31 billion tokens, 98.8% the context re-read); the fresh session measured on three agents (74% to 84% less per call); cost per row, story and captured page; brief 4 |
| v0.1.429 | 11-11 03:31 | served | *incident.media@* Jornal de Negócios and Sábado no longer read (held items kept as headline, time and link); CNN Portugal, IOL, TEK, SAPO feed only; sweep |
| v0.1.428 | 11-11 03:30 | served | *incident.conductor@* a radio bulletin's title at 03:00 says IPMA has the storm hitting further south; IPMA's published warnings for Lisbon are unchanged (a signal, title only) |
| v0.1.427 | 11-11 03:29 | served | *incident.board@* the 03:29 round: synced to the status files (357 cards); timeline and decision graph re-read, no question moved; tokens measured |
| v0.1.426 | 11-11 03:29 | not confirmed | *incident.weatherwatch@* weather-sites: 03:28 re-read (authorities unchanged; Madeira 71 occurrences by 02:00; live blogs still); tokens measured |
| v0.1.425 | 11-11 03:29 | served | *incident.social@* 03:23 re-read (nothing new on Bluesky; Web Summit still silent); Mastodon read: no official account found, four dormant or unverified organisation accounts, nine tags counted; X not readable without a login |
| v0.1.424 | 11-11 03:28 | served | *incident.stories@* the 03:27 re-check: no support moved; three new rows folded in (Madeira: the first press titles on effects, the airport's 98 km/h gust; Day 2: the schedule still lists Wednesday, unmarked) |
| v0.1.423 | 11-11 03:27 | served | *incident.archivist@* 03:24 round: the primary sources unchanged (ANEPC's notice answered 502); a clock printed on each visit and server errors no longer count as a change; research captures to 225 addresses |
| v0.1.422 | 11-11 03:25 | served | *incident.sources@* licences shown from weatherwatch's reading for 14 bodies (nothing re-read; two marked link only); rows per source counted from addresses.json too; feed read 03:24, unchanged |
| v0.1.421 | 11-11 03:25 | served | *incident.entities@* the linker reads pages word by word (a hash table of the names' first words, tags stepped over, hits memoised) and leaves five more families of generated pages to the browser |
| v0.1.420 | 11-11 03:23 | served | *incident.identity@* /account/ takes the build's own menu and breadcrumb marks (Log in, sixteen subsites) so it no longer falls behind the frame; the test checks the built page has nothing inline; tokens measured |
| v0.1.419 | 11-11 03:19 | served | *incident.observability@* the ranked list's bars wide enough to read on a phone (the mark is now the one word "due", explained above the list) |
| v0.1.418 | 11-11 03:18 | served | *incident.librarian@* the pack from a second fresh start (observability's): the shallow clone, where a session's id is, the board script's id contract |
| v0.1.417 | 11-11 03:18 | not confirmed | *incident.conductor@* the deploy step is tried a second time when GitHub does not find the artifact it has just been given (five of six failures tonight; incident.ci@'s patch) |
| v0.1.416 | 11-11 03:17 | served | *incident.observability@* sessions over the mark ranked and marked "hand-over due"; the three sessions that never push here recorded as the conductor's statement (33 in all); tokens measured |
| v0.1.415 | 11-11 03:17 | served | *incident.ci@* the 03:15 wake: 414 runs and 457 commits; two more deploy failures and a retry patch for the workflow; the reader splits a busy hour by ten minutes; the gate's budget read from the gate; tokens measured |
| v0.1.414 | 11-11 03:15 | served | *incident.observability@* tokens measured; the hand-over note brought up to this session |
| v0.1.413 | 11-11 03:14 | served | *incident.observability@* the live map plays a workflow: incident.reporter@'s traces beside "play push by push"; status: what is live, two corrections of my own, what the pack did not say |
| v0.1.412 | 11-11 03:14 | served | *incident.librarian@* tokens measured |
| v0.1.411 | 11-11 03:14 | not confirmed | *incident.librarian@* the path policy at the conductor's decision: tools/llm.mjs is the models agent's alone, README.md the ci agent's alone |
| v0.1.410 | 11-11 03:14 | served | *incident.conductor@* the gate warns when a file carries a time ahead of the clock (Kept by, updated): six agents corrected such stamps tonight (asked by incident.journalist@) |
| v0.1.409 | 11-11 03:13 | not confirmed | *incident.weather@* the band's largest word is the level in force now; the highest level still to come today sits beside it with its start; Madeira the same |
| v0.1.408 | 11-11 03:13 | served | *incident.journalist@* "Mistakes made in the open" gains its eighth: a model name in the default commit trailer (the conductor's rule of 03:02; the commits not counted, the run data does not hold that trailer); tokens measured |
| v0.1.407 | 11-11 03:13 | served | *incident.librarian@* the commit message stated exactly in the pack (trailers in one paragraph, no model name) and warned on by the path check; the pack's second measurement shown as current; history is a pointer to the reporter's traces; HANDOVER.md first in a role pack |
| v0.1.406 | 11-11 03:12 | served | *incident.observability@* an agent's sessions in order with the context each call carried and the hand-over as an event on its timeline; the same for the whole team on the agents' page; homes for perplexity, accountant, reporter and journalist; the board agent's own card no longer taken for the whole board |
| v0.1.405 | 11-11 03:11 | served | *incident.journalist@* tokens measured · *incident.journalist@* the journal's fifth piece, "What it cost" (from the accounts and the agents' ledger lines); pieces 1, 3 and 4 checked against the reporter's traces, with a second dated correction on piece 1 |
| v0.1.404 | 11-11 03:11 | served | *incident.designer@* a select or a plain table cannot widen a phone's page (the studies page was 88 px over); a note for the Weather face's band before 09:00; tokens measured |
| v0.1.403 | 11-11 03:10 | served | *incident.librarian@* tokens measured |
| v0.1.402 | 11-11 03:10 | served | *incident.librarian@* behaviour policies: what is particular to the 17 newer agents (what each reaches beyond the repository, the gaps that are its own); all 30 drafts regenerated |
| v0.1.401 | 11-11 03:09 | served | *incident.observability@* correction: the night's commits and sessions restored (my first two pushes rewrote them from a shallow clone); the tools now refuse a shallow clone; an agent's sessions carry their measured context and the hand-over between them; the board agent's home no longer breaks its own heading |
| v0.1.400 | 11-11 03:09 | served | *incident.designer@* round 43: one hour grid for both faces (the data room's strips take the Weather face's geometry and its now; before now sits behind the bars; a strip opens at now) |
| v0.1.399 | 11-11 03:08 | served | *incident.journalist@* the journal's piece from the traces, "From a sentence to a live page": three sentences of the 02:10 review followed to what shipped (23 min 31 s, 12 min 26 s, 45 min and open), a relay picture per trace; trace steps resolve as supports |
| v0.1.398 | 11-11 03:07 | served | *incident.librarian@* the round article to 03:06: five more agents after the round (accountant, journalist, reporter, Perplexity, the pack), three more corrections, two more things that wait on Dinis · *incident.librarian@* tokens measured |
| v0.1.397 | 11-11 03:07 | served | *incident.observability@* tokens measured |
| v0.1.396 | 11-11 03:06 | not confirmed | *incident.observability@* the second session's key and its start (the first session's key marked handed over) |
| v0.1.395 | 11-11 03:06 | served | *incident.designer@* tokens measured; what the fresh start needed that the pack did not say (agents/designer/status.json, start_notes) |
| v0.1.394 | 11-11 03:06 | not confirmed | *incident.board@* a-llm-cap half answered (Dinis: 20 US dollars a day, BRIEF.md; which sessions get the key stays open); event_utc beside opened_utc where the first commit of an ask is known |
| v0.1.393 | 11-11 03:06 | not confirmed | *incident.shadow@* the 03:00 hour is a recorded gap (the engines' account out of credit, HTTP 402 on the first call; nothing more asked); the page shows a paused hour; status with a spend object; the session's token line |
