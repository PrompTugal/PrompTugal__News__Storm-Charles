# The project, hour by hour

> Kept by incident.reporter@web-summit.dinis, 11 November 2026, 04:14 UTC

**In five lines.**
1. One person, Dinis Cruz, spoke nine times between about 19:00 on 10 November and about 02:50 on 11 November; a team that grew from 4 agents to 26 (30 named by 03:00) turned each direction into pages within minutes.
2. The first push here was at 21:14:33; by 03:38 incident.ci@ had counted 485 commits by 28 agents and 275 releases (6 runs failed, 161 cancelled by a newer push).
3. The busiest hour was 02:00 to 03:00: Dinis's page-by-page review became a contract (RESTRUCTURE.md) in 45 s, thirteen new agents shipped in 35 minutes, and the home page was swapped at 02:19:08.
4. What broke was mostly the machine under load (cancelled runs, a push race, the gate's budget) and clocks (five agents wrote times ahead of the clock); each was fixed in a commit that says so.
5. What waits, waits on Dinis: 43 cards at 04:00, first among them the model provider's account out of credit since about 02:54; the oldest is from 21:20 (attach the repository to three agents' sessions). He has not spoken in the record since ~02:50.

**Rests on:** [BRIEF.md](../BRIEF.md), [numbers.json](numbers.json) (from [data/ci/](../data/ci/index.json) and [board/items/](../board/README.md)), [the traces](traces/README.md), [agents/JOBS.md](../agents/JOBS.md), [REALITY.md](../REALITY.md), and for 10 November before 21:14 the commits of `team/incidents/` in SGit-AI__Website__Web-Summit. **How to read it:** times are UTC; a seven-letter code is a commit of this repository (`ws:` before it: of SGit-AI__Website__Web-Summit); "Dinis ~hh:mm" is BRIEF.md's own time for his words, which runs a few minutes later than the commit that records them. Counts are from numbers.json and stop at its sources' snapshot (03:38). Not a warning service: this is the project's record, not the storm's.

## 10 November

**18:00 to 19:00: an incident, then a team for it.**
- Asked: Dinis, by voice, "about 19:00": a separate incident team with its own conductor, site and repository; publishing in seconds. (`ws:` team/incidents/BRIEF.md)
- Shipped: the storm declared a P1 incident (`ws:dedace1`, 18:40:03); the incident team's brief (`ws:a16e4a1`, 18:55:42).
- Open question: the brief says "about 19:00"; its commit is 18:55:42.

**19:00 to 20:00: four agents, in the shared repository.**
- Shipped: incident.conductor@ takes the lead with PIPELINE.md (`ws:56a07e9`, 19:01:39) and ROADMAP.md (`ws:27d5ca7`); the researcher's decision graph (`ws:145a2b8`), the meteorologist's weather as JSON (`ws:a73dfb5`), the dev's dashboard (`ws:fad836c`, 19:11:53).
- Broke: push to live took 3 min 56 s there; the gate alone 110 s in CI (`ws:fad836c`). The case for a separate repository.
- Waited on Dinis: a yes to the CI fix the dev had proved (`ws:753b331`, 19:18:12; still a card: board/items/a-ci-fix-websummit.json).

**20:00 to 21:00: the wrapper for other models; a missed primary source.**
- Shipped: llm.mjs, one wrapper for model calls with a ledger and a daily cap (`ws:cd9246b`, 20:45:01; `ws:3a00a1b`).
- Broke: the organisers' own page had carried their decision since 19:09 and the team read it at 20:58, "a path we did not watch" (`ws:9802197`, 20:59:02); the watch was widened (`ws:716690a`).
- Waited on Dinis: the cap and which sessions get the model key (board/items/a-llm-cap.json).

**21:00 to 22:00: the repository, the first push, the first ask.** (11 commits, 1 agent, 6 releases)
- Asked: Dinis names the repository and the domain (~21:00) and creates the repository (`3a61421`, 21:03:38, his own commit); "yes all good" to the plan (~21:10; BRIEF-CORRECTIONS.md).
- Shipped: the whole site in one commit (`77cdd51`, 21:14:33); v0.1.2 served (run 2 ended 21:15:41).
- Broke: run 1 failed at its own gate; fixed in 43 s (`610dd5f`).
- Waited on Dinis: attach this repository to three agents' sessions (`0808960`, 21:20:07). Until then the conductor copies their files across (`5858061`).

**22:00 to 23:00: one agent, hourly.** (2 commits, 1 agent, 2 releases)
- Shipped: the 22:02 wake and one conflict marked (`9b42aed`, `674a97a`). Nothing was asked.

**23:00 to 00:00: Dinis sits down; seven agents start.** (73 commits, 8 agents, 33 releases, 29 runs cancelled)
- Asked: Dinis ~23:40: "This is where I'm going to be working for the next couple of hours"; as many agents as needed; every agent visible; the UI in rounds (BRIEF.md; `cdaa2d7`, 23:35:36).
- Shipped: six session keys in 2 min 19 s (`876a31e` to `b53673e`); design rounds 1 to 8; the agents page (`a485c84`); SECURITY.md and the log-in (`588962e`, `f0369a0`); the library (`3449349`); the graph and a database in the browser (`9b42a2e`, `5ce386f`); 106 weather sites (`56a4837`); the media watch (`96ff00c`); permanent row ids (`18fe598`); the path policy (`796772f`, `0b40077`).
- Broke: bursts of pushes starved the deploy; CI no longer cancels a running one (`76337b0`, 23:56:18). Generators that wrote tracked files left the tree dirty and release.sh refused (`5df495a`).

## 11 November

**00:00 to 01:00: rounds; the Studio.** (69 commits, 9 agents, 57 releases)
- Asked: Dinis ~00:30: a Studio; first, "what is compression", animated with small characters (`ce7d8f3`, 00:29:38).
- Shipped: design rounds 9 to 24; the Studio's player and six chapters (`7fc709c`, `87364c8`); lead times (`39f465a`); who was first on each fact (`f487bfb`); the timeline as a page (`712adfd`).
- Corrected: a live blog the media agent had said did not exist (`6b46a65`); the alert's time (announced ~09:17, the page says 12:10: `897439e`).

**01:00 to 02:00: quieter; Wikipedia; a privacy correction.** (34 commits, 9 agents, 31 releases)
- Asked: Dinis ~01:28: a Wikipedia agent; measure this site against Wikipedia's values (`5b880fb`, 01:26:27).
- Shipped: Wikipedia in 4 languages, 577 revisions as data (`1e744ad`, 01:43:52); a page per agent (`06cd5f4`); Madeira, warned against observed (`2880fb0`).
- Corrected: a private person's post address withheld 71 s after incident.wikipedia@ found it (`25c7467`, `1dec016`, `caf3181`). See [the corrections trace](traces/correction-three-fixes-in-the-open.json).
- Waited on Dinis: his key, three decisions on the log-in, a token (`3dbecb2`, 01:22:29).

**02:00 to 03:00: the review, the contract, thirteen agents, the swap.** (to 02:53: 174 commits, 23 agents, 81 releases, 72 runs cancelled; 53 cards closed)
- Asked: Dinis ~02:10: two faces, every word linked, every outside page captured, sources as sections (`659dd79`, 02:06:42). ~02:20: meteorology to the raw material, Wayback, stories, other models, a home for every agent, a CI agent (`9d3a54c`, 02:15:04). ~02:50: 20 dollars a day for models, a Perplexity agent, an accountant, a reporter and a journalist on the project itself (`ab8008e`, 02:49:18).
- Shipped: RESTRUCTURE.md (`f8297d8`, 02:07:27); the Weather face (`a92c425`, 02:16:19) and the swap of the home page (`d8d6450`, 02:19:08); entities and the linker (`747d832`); Wayback (`b708dbe`); the board (`13eb44e`); sources and IPMA's open data (`ec7471f`, `39c68b9`); labs, stories, shadow reporting, Bluesky, models, meteorology, CI made visible (`22d1e0b`, `d2a5832`, `6d28025`, `904f80d`, `26bb07c`, `8b8bf87`, `e94ded1`); the round's article (`0ed2f21`); the briefing pack (`3171210`, 02:54:55); the accounts (`5c6c532`, 02:58:02); the journal's first piece (`641e216`, 02:59:44).
- Broke: a missing semicolon stopped the lens for 24 s (`d2adc44`); 23 captures of cut-short addresses, removed by their maker (`97f63e1`); release.sh lost five gated tries to the push race (`6cf060c`); the gate's budget went from 5 s to 8 s as the site passed 1,100 pages (`95c0757`); the model provider refused calls for lack of credit from about 02:55 (`2bbee52`, `8ccd1ef`).
- Corrected: eight rows relabelled evidence (`4577806`); the hypothesis on the track re-weighed (`10d9145`) and its story retold (`67dc6d6`); "not signed" corrected to "signed by the hosting service's one key" (`f2e014e`).
- Waited on Dinis: 36 cards, the launch first ([board/for-dinis](../board/README.md)); one answered in his own review (the model budget, asked the evening before). See [the escalations trace](traces/escalation-asks-waiting-on-dinis.json).

**03:05, the first wake.**
- Shipped: this section: six traces, the log, the numbers (incident.reporter@, started by incident.conductor@ at Dinis's word of ~02:50).
- Corrected, mine: twice I stamped these files without reading the clock (03:10 and 03:20 when it said 03:01, found before the push; then 03:06 when it said 03:03, pushed in `4b5a93a`). The stamps now carry the clock's time (03:04), and tools/reporter-fill.mjs refuses a trace whose `updated` is later than the clock.

**03:00 to 04:00: the team measures itself and starts again, without a word from Dinis.** (to 03:38: 103 commits, 26 agents, 53 releases, 43 runs cancelled; 77 cards closed)
- Asked: nothing new from Dinis in BRIEF.md (its last section is ~02:50). The hour ran on that section's last sentence: "the librarian saves tokens".
- Shipped: the measure step and 26 of 30 agents' token lines (`5c6c532`, `f8b319f`: 1.31 billion tokens, 98.8% of it the context read again on each call); the pack measured (39,775 tokens against 14,164: accounts/pack-test.json); six agents handed over to fresh sessions started from the pack (librarian `067df08` 03:02:01, designer `cf079f3`, observability `8494cb1`, graph `a8ae84e`, weatherwatch `c197f9f`, studio `1fb0c5e` 03:37:07). See [the memory trace](traces/memory-the-librarian-saves-tokens.json). Also: Perplexity as a research tool (`f24a773`); five journal pieces, two written from these traces (`c067b3b`, `2d7320a`); the graph joined to sources, meteorology and Wayback (`cbeb3be`); a sixth Studio explanation, "The hand-over" (`863d28f`); the reporter in the menu under About (`cf079f3`); the live map plays these traces (`f76a4a6`).
- Broke: the model provider's account ran out of credit (HTTP 402 from about 02:54): the shadow reports recorded the 03:00 hour as a gap and the evals stopped part-way (`2bbee52`, `8ccd1ef`, `2af0be4`, `acea93a`). A fresh session in a shallow clone rewrote the night's commit and session data, restored in three minutes (`5539827`). Two more deploys failed when GitHub did not find the artifact just uploaded; the step is now tried twice (`31a5b21`, `9ed312b`).
- Corrected: the gate now warns on a time ahead of the clock (`271f7b9`, asked by incident.journalist@); commit trailers in one paragraph and no model name in them, stated in the pack and warned on by the path check (`2df7f77`); the board's cards carry an event time beside the time the board read them (`c83bd7c`); the official gazette is not press (`6cc6041`).
- Waited on Dinis: 43 cards. New at the top: credit for the model provider (board/items/a-provider-credit.json). The model cap is recorded as half answered (`c83bd7c`).

**04:04, the second wake.**
- Shipped: a seventh trace (the pack, the measurement, the hand-overs); this hour; the numbers use the board's event time where a card has one.
- Corrected, mine: the first draft of the new trace said both arms of the pack test answered equally well; the file says 8 of 8 against 6 right and 2 partly, then 8 of 8 after the pack was fixed. Found on re-reading the file, before the push.

**04:00 to 05:00 (to 04:11): the hand-overs go on; the model account still empty.**
- Asked: nothing new from Dinis in BRIEF.md (its last section is ~02:50).
- Shipped: an eighth trace, [the model provider's account out of credit](traces/outage-the-model-account-out-of-credit.json) (first refusal 02:53:57, 4 min 39 s after the commit that records the cap raised to 20 US dollars; one card for Dinis 9 min 50 s later). The journal's sixth piece, told from the memory trace (`4d4b6ab`).
- Shipped, traces owed from earlier hours: [the Studio](traces/studio-a-spoken-idea-to-an-animation.json) (Dinis ~00:30 to a player and two chapters in 8 min 19 s, `7fc709c`; six explanations by 03:54:54) and [an agent's start](traces/start-a-jobs-line-to-a-first-page.json) (the Perplexity desk: a jobs line at 02:49:18, `ab8008e`, to a first page at 03:01:18, `f24a773`, and a timeline row from its leads 80 s later, `f46df85`). Ten traces, 131 steps, 4 with no evidence.
- Handed over: the reporter (`2309e01` 04:06:27; this second session's key `6a509d6`; the first session's last measured call carried 320,145 tokens, this one's twelfth 115,554), the librarian for the second time (`d4a9418`, `f469b3c`), the journalist at the conductor's word (`0fb17c3`, `a5745e7`). Nine hand-overs in eight roles since 03:02: three more steps in [the memory trace](traces/memory-the-librarian-saves-tokens.json).
- Broke: nothing new. The shadow reports' 04:00 hour is a second recorded gap (`8d60f26`).
- Corrected, mine: the first session and this one both marked the first key "handed over" within a minute of each other; the release stopped on the conflict, and this session's entry went in on top of the other's (`6a509d6`). The new trace first said "captured 04:13" when the clock read 04:09; changed before the push.
- Waited on Dinis: the provider's account, 1 h 5 min at 04:09 (board/items/a-provider-credit.json). The numbers stop at 03:38, where incident.ci@'s last count stops.

## Open questions for the conductor

- *Answered 03:05 by the conductor: follow the commits; the "~" times are its estimates and stay.* **Brief times run later than their commits.** ~23:40 was committed 23:35:36; ~02:10 at 02:06:42; ~02:20 at 02:15:04; ~02:50 at 02:49:18. The traces follow the commits and keep the brief's time as a label.
- **Clocks.** Five agents corrected times written ahead of the clock (wikipedia `f979e75`, sources `2730586`, media `2cc13cc`, ci `1f5cb62`, weather `002ed61`); the librarian too (`a83da41`); and the reporter, above. The gate warns on it since `271f7b9` (03:14:07).
- **The board's opened times** are its reading of status files, not event times (the attach ask: 21:45 on the card, 21:20:07 in the commit).
- **`For:` trailers** on many commits sit in the paragraph above the session's trailers, so git's own trailer parser does not see them; data/ci/ and the traces read the whole message.
