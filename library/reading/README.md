# The reading list: what newsroom.sgit.ai's articles mean for this site

> Kept by incident.librarian@web-summit.dinis, 2026-11-10, at Dinis Cruz's word ("read a lot of the articles, because a lot of the stuff that we talk about here is related"). Rendered from [reading.json](reading.json) by [`tools/library-reading.mjs`](../../tools/library-reading.mjs). Back to [the library](../README.md) · [the glossary](../glossary.md) · [this repository against the estate's standard](standard.md).

**28 pages read**, under 6 themes; **18 say build something we do not have**, 10 are rules we already keep. Found through https://newsroom.sgit.ai/llms.txt and /newsroom/wire.json (389 articles listed); selected by title for the six themes; each article read through its markdown twin and its per-section summaries (/articles/summaries/<slug>.json), the design pages as HTML. Read between 23:40 and 23:45 UTC on 10 November 2026 (read_utc is the middle of that window). The newsroom's content is CC BY 4.0; nothing is quoted at length. Articles are by Dinis Cruz, written from his voice notes by an agent; several are designs or proposals and say so: status_there repeats the page's own note.

**Labels.** The arguments are evidence (reported by their authors); 'means_here' is our analysis, a hypothesis about what this site should do, for the conductor and Dinis to decide.

## To build, in one table

| From | What to build here | For |
|---|---|---|
| [The wire as a graph](https://newsroom.sgit.ai/articles/the-wire-as-a-graph.html) | signals.json items have no id today (a row is known only by its time and text): tools/timeline.mjs should mint a permanent id per row and keep it when the row is edited, and the graph's nodes, the signals and sources.json should name actors by one shared id. | incident.dev@, incident.graph@ |
| [The bridge, followed to the end: what one local story is worth when it is kept as a graph](https://newsroom.sgit.ai/articles/the-bridge-followed-to-the-end.html) | Each open item (Thursday's Day 3, the PITCH semi-final, Night Summit, Thursday's transport) should be one maintained claim with its current state, its source, the time read and its whole history, kept current after the storm leaves the front pages. | incident.conductor@, incident.graph@ |
| [Breaking the story down before the agents do](https://newsroom.sgit.ai/articles/breaking-the-story-down-before-the-agents-do.html) | Where we state something about a named body (for example that an organiser's decision was public for 43 minutes before we saw it), the item should say whether it was put to that body and what it answered; incident.media@'s outreach drafts are where the question is drafted, and a person sends. | incident.media@, incident.researcher@ |
| [Search as navigation: walking the newsroom's graph with no model, and why a clean graph should beat vectors](https://newsroom.sgit.ai/articles/search-as-navigation.html) | Before the SQL console is useful, the ids must join: a build-time report of every actor, place and source id used in only one file, so the islands are counted on each push. | incident.graph@ |
| [Databases with no server](https://newsroom.sgit.ai/databases/index.html) | The database in the browser (incident.graph@'s job) should load exactly the files listed in api/v1/index.json and check each against its sha256 before querying, so a query result can be traced to the bytes. | incident.graph@ |
| [Provenance is the product](https://newsroom.sgit.ai/provenance/index.html) | ROADMAP's provenance record (source URL, time published, time captured, sha256 of the capture, vault object, agent, label) is still two fields short on every item: there is no capture and so no sha256, because the raw vault is not built (REALITY.md, Not yet). | incident.conductor@, incident.dev@ |
| [Capture first](https://newsroom.sgit.ai/articles/capture-first.html) | Build the raw vault before the next page: every source read is captured and committed to the vault at once, git keeps the pointer and sha256, and our pages say 'unchanged since we stored it' and never 'as published at'. | incident.dev@, incident.conductor@ |
| [The side stories of php2shell](https://newsroom.sgit.ai/articles/the-side-stories-of-php2shell.html) | tools/websummit.mjs already keeps the organiser's post text hash and its modified times; extend the same to every official page we watch, and publish a silent change as a signal of its own ('changed without a note', both hashes, both times read). | incident.dev@, incident.researcher@ |
| [A desk anyone can open](https://newsroom.sgit.ai/articles/a-desk-anyone-can-open.html) | Each 'done' line in agents/*/status.json should end with its proof (a commit or a URL); library/provenance/ already gives who committed each file, read from the record. | every agent |
| [Corrections must propagate](https://newsroom.sgit.ai/corrections/index.html) | The library now records what every document names as its source and what links to it (linked_from): when a file is corrected, the list of pages that cite it is one lookup, and the catalogue can list documents older than the sources they were made from. | incident.librarian@ |
| [How a graph answers it](https://newsroom.sgit.ai/corrections/how-a-graph-answers-it.html) | A corrected timeline row is never rewritten in place: the new row carries 'supersedes' and the old one stays, marked; today the PITCH semi-final conflict and the widened peak are told in prose only. Evidence rows should say whether the press report supports or extends beyond the primary source. | incident.conductor@, incident.dev@ |
| [Behaviour policies](https://newsroom.sgit.ai/newsroom/policies.html) | agents/JOBS.md's Owns column is our policy and nothing checks it: put the paths in a file (agents/policy.json), render the table from it, and have admin/tools/release.sh refuse a push whose commits touch paths outside the committing agent's list. | incident.conductor@ |
| [Where a check runs is part of the policy](https://newsroom.sgit.ai/articles/where-a-check-runs.html) | Our gate and workflow live in the repository every agent can push to: say so in SECURITY.md, and ask Dinis for branch protection on main and on admin/ and .github/ (only he can set it). | incident.identity@, incident.conductor@ |
| [The Web Summit team](https://newsroom.sgit.ai/articles/web-summit-part-four.html) | Every commit here has the same git author and the agent is only a word in the subject: the session keys in data/keys.json sign nothing yet. Signed commits or a signed status file per agent would make 'who wrote this' checkable, not asserted. | incident.identity@, incident.observability@ |
| [Green does not mean live](https://newsroom.sgit.ai/articles/green-does-not-mean-live.html) | Our CI measures push to served but does not fail when the version is never served (it prints 'not yet' and ends green): make that step fail. And make 'a page nothing links to' a gate warning: the library counts them on every build. | incident.conductor@ |
| [How a journalist agent publishes here](https://newsroom.sgit.ai/articles/how-a-journalist-agent-publishes-here.html) | CLAUDE.md has our rules but not the mistakes behind them: the decision graph's 'lessons' and the 43-minute miss belong in one lessons page, each with the rule or tool it produced. | incident.conductor@ |
| [The agent is the reader](https://newsroom.sgit.ai/articles/the-agent-is-the-reader.html) | Every dataset says when it was read; none says until when to trust it. Add the next scheduled read (or valid-until) at the top of each file, and serve one small now.json (the headline, the warnings in force, the open items) for an agent with one question. | incident.dev@, incident.meteorologist@ |
| [Two agents](https://newsroom.sgit.ai/articles/two-agents-one-vault.html) | This is PIPELINE.md's data lane, running elsewhere: one writer per file, the read key published on purpose, the site drawing what it decrypts. Here it is still 'Not yet' in REALITY.md. | incident.dev@ |

## A story is a graph

### The design, and what runs

[newsroom.sgit.ai/design/index.html](https://newsroom.sgit.ai/design/index.html) · read 2026-11-10 23:42 UTC

**Its argument.** The story is a graph and the article is one projection of it; six ideas (the graph, corrections, provenance, paying the fact's finder, rights, no server) are each set beside what runs and what does not yet. The page's own rule is that running is not designed: nothing is called live because a design describes it.

**A rule to keep here.** Every sentence on a page here must be a projection of a JSON file under data/, never the other way round; and REALITY.md, not ROADMAP.md, is what we cite when we say a thing exists.

### The wire as a graph

[newsroom.sgit.ai/articles/the-wire-as-a-graph.html](https://newsroom.sgit.ai/articles/the-wire-as-a-graph.html) · published 2026-10-14 · read 2026-11-10 23:42 UTC

**Its argument.** Design the graph backwards from what the reader sees: every name a link, every sentence a typed claim (fact, observation, party statement, analysis) pointing at a capture. Every object gets an identifier minted once, never reused and never derived from its title, so old links survive merges and splits.

**To build here.** signals.json items have no id today (a row is known only by its time and text): tools/timeline.mjs should mint a permanent id per row and keep it when the row is edited, and the graph's nodes, the signals and sources.json should name actors by one shared id. (For: incident.dev@, incident.graph@.)

### The bridge, followed to the end: what one local story is worth when it is kept as a graph

[newsroom.sgit.ai/articles/the-bridge-followed-to-the-end.html](https://newsroom.sgit.ai/articles/the-bridge-followed-to-the-end.html) · published 2026-10-07 · read 2026-11-10 23:42 UTC

**Its argument.** A bridge closure was newsworthy on five days but needed by readers on fifty-seven; each new date superseded the last claim and the graph kept what was believed when. An article is written once; a maintained claim is a service.

**To build here.** Each open item (Thursday's Day 3, the PITCH semi-final, Night Summit, Thursday's transport) should be one maintained claim with its current state, its source, the time read and its whole history, kept current after the storm leaves the front pages. (For: incident.conductor@, incident.graph@.)

### Breaking the story down before the agents do

[newsroom.sgit.ai/articles/breaking-the-story-down-before-the-agents-do.html](https://newsroom.sgit.ai/articles/breaking-the-story-down-before-the-agents-do.html) · published 2026-10-30 · read 2026-11-10 23:42 UTC

**Its argument.** Break a story into actors, events, sources and claims before the agents do it for you, and publish the breakdown with the article. What is still missing is an allegation kind: a claim about a party, with whether it was put to them and their answer.

**To build here.** Where we state something about a named body (for example that an organiser's decision was public for 43 minutes before we saw it), the item should say whether it was put to that body and what it answered; incident.media@'s outreach drafts are where the question is drafted, and a person sends. (For: incident.media@, incident.researcher@.)

### Search as navigation: walking the newsroom's graph with no model, and why a clean graph should beat vectors

[newsroom.sgit.ai/articles/search-as-navigation.html](https://newsroom.sgit.ai/articles/search-as-navigation.html) · published 2026-10-18 · read 2026-11-10 23:42 UTC

**Its argument.** Search can be a walk through the graph with no model: curated names and aliases, counted co-occurrence, exact counts, and databases running in the browser over the site's own files. The work is the debt: duplicate tags and graphs that share no labels are islands.

**To build here.** Before the SQL console is useful, the ids must join: a build-time report of every actor, place and source id used in only one file, so the islands are counted on each push. (For: incident.graph@.)

### Databases with no server

[newsroom.sgit.ai/databases/index.html](https://newsroom.sgit.ai/databases/index.html) · read 2026-11-10 23:42 UTC

**Its argument.** Keep the truth as files, derive every other shape at build time, and let the reader's machine do the querying: SQLite and a SPARQL store run in the browser over the same hashed JSON files. Nothing is uploaded and the database is gone when the tab closes.

**To build here.** The database in the browser (incident.graph@'s job) should load exactly the files listed in api/v1/index.json and check each against its sha256 before querying, so a query result can be traced to the bytes. (For: incident.graph@.)

## Provenance is the product

### Provenance is the product

[newsroom.sgit.ai/provenance/index.html](https://newsroom.sgit.ai/provenance/index.html) · read 2026-11-10 23:42 UTC · *A design, not a running system, by the page's own note.*

**Its argument.** Most articles give a link, not evidence: the link is rarely followed and may die. A newsroom that shows who found, checked and changed each claim earns trust a black box cannot, and the differentiator is the walkable chain.

**To build here.** ROADMAP's provenance record (source URL, time published, time captured, sha256 of the capture, vault object, agent, label) is still two fields short on every item: there is no capture and so no sha256, because the raw vault is not built (REALITY.md, Not yet). (For: incident.conductor@, incident.dev@.)

### Capture first

[newsroom.sgit.ai/articles/capture-first.html](https://newsroom.sgit.ai/articles/capture-first.html) · published 2026-10-22 · read 2026-11-10 23:42 UTC

**Its argument.** Live pages change by the hour, so the evidence vault was made before any page was written: captures only ever added, each hashed, one file per writer. Two agents nearly lost forty sources by not committing, which gave two rules: commit after every source, and check every clone; and a hash proves bytes unchanged since stored, not when they were captured.

**To build here.** Build the raw vault before the next page: every source read is captured and committed to the vault at once, git keeps the pointer and sha256, and our pages say 'unchanged since we stored it' and never 'as published at'. (For: incident.dev@, incident.conductor@.)

### The side stories of php2shell

[newsroom.sgit.ai/articles/the-side-stories-of-php2shell.html](https://newsroom.sgit.ai/articles/the-side-stories-of-php2shell.html) · published 2026-10-25 · read 2026-11-10 23:42 UTC

**Its argument.** Linking each claim to a source and each source to a dated, hashed capture is rare and underpins everything else. One publisher reworded a claim without a note, and it was detectable only because both captures had been kept.

**To build here.** tools/websummit.mjs already keeps the organiser's post text hash and its modified times; extend the same to every official page we watch, and publish a silent change as a signal of its own ('changed without a note', both hashes, both times read). (For: incident.dev@, incident.researcher@.)

### The decision graph

[newsroom.sgit.ai/provenance/the-decision-graph.html](https://newsroom.sgit.ai/provenance/the-decision-graph.html) · read 2026-11-10 23:42 UTC · *A specified process, not a running one, by the page's own note.*

**Its argument.** A decision should never be a yes or no but a graph that collects evidence, with a named owner at every step. A person who approves without the evidence is not oversight.

**A rule to keep here.** decisions.md already has By and Evidence columns: keep both filled on every row, and when a draft goes to a person to send, the person gets the facts it cites (comms/facts.md), not a summary.

### A desk anyone can open

[newsroom.sgit.ai/articles/a-desk-anyone-can-open.html](https://newsroom.sgit.ai/articles/a-desk-anyone-can-open.html) · published 2026-10-22 · read 2026-11-10 23:42 UTC

**Its argument.** Nine names worked a story in a day and only chat described it, so the work became a file where every row has an owner and its proof, and roles say what each name may change. The roles were drawn from the record (git logs, vault commits), not from memory.

**To build here.** Each 'done' line in agents/*/status.json should end with its proof (a commit or a URL); library/provenance/ already gives who committed each file, read from the record. (For: every agent.)

### The waiting room knew first: a live local story, and the gap where local information used to be

[newsroom.sgit.ai/articles/the-waiting-room-knew-first.html](https://newsroom.sgit.ai/articles/the-waiting-room-knew-first.html) · published 2026-10-08 · read 2026-11-10 23:42 UTC

**Its argument.** A local outage was known only to the people already in the waiting room; nothing checkable from home showed it. The answer is a log that keeps every observation by evidence level, every source and how it was accessed, and an agent that keeps re-checking.

**A rule to keep here.** This is the closest article to what this site is: keep 'how it was read' on every source (sources.json has machine_readable and status; a page only a person can read says so), and keep the list of what is not known beside what is.

## Corrections must propagate

### Corrections must propagate

[newsroom.sgit.ai/corrections/index.html](https://newsroom.sgit.ai/corrections/index.html) · read 2026-11-10 23:42 UTC · *None of the mechanism is built, by the page's own note.*

**Its argument.** In a document a correction is a new document and nothing that cited the original knows; in a graph a correction is an edge, typed, dated and traceable. Staleness and correction are first-class, not an afterthought.

**To build here.** The library now records what every document names as its source and what links to it (linked_from): when a file is corrected, the list of pages that cite it is one lookup, and the catalogue can list documents older than the sources they were made from. (For: incident.librarian@.)

### How a graph answers it

[newsroom.sgit.ai/corrections/how-a-graph-answers-it.html](https://newsroom.sgit.ai/corrections/how-a-graph-answers-it.html) · read 2026-11-10 23:42 UTC · *A design marked proposed, by the page's own note.*

**Its argument.** Supersede, never delete: a superseded claim stays, marked from the date it was superseded, so 'what did we believe at 19:00?' can still be answered. Citations are typed by faithfulness (supports, partially supports, extends beyond, contradicts) and freshness is a recorded property of a claim.

**To build here.** A corrected timeline row is never rewritten in place: the new row carries 'supersedes' and the old one stays, marked; today the PITCH semi-final conflict and the widened peak are told in prose only. Evidence rows should say whether the press report supports or extends beyond the primary source. (For: incident.conductor@, incident.dev@.)

### The Industry Wire (a beta)

[newsroom.sgit.ai/wire/index.html](https://newsroom.sgit.ai/wire/index.html) · read 2026-11-10 23:42 UTC · *Described from the newsroom's llms.txt; the wire's stories are marked unreviewed.*

**Its argument.** A corrected story carries its changes, dated, under its own text, so the correction is read where the story is read. Thirteen stories were corrected after their primary sources were fetched.

**A rule to keep here.** A correction here is shown on the item it corrects, with the time and the source that corrected it, never only in a later row.

## Agents under behaviour policies

### Behaviour policies

[newsroom.sgit.ai/newsroom/policies.html](https://newsroom.sgit.ai/newsroom/policies.html) · read 2026-11-10 23:42 UTC

**Its argument.** For agents sharing one repository the reach is every file and the mandate is a short list of paths; the barrier is a check that lists every changed file outside the role's list. The page's table is generated from the same role files the checker reads, so the two cannot disagree.

**To build here.** agents/JOBS.md's Owns column is our policy and nothing checks it: put the paths in a file (agents/policy.json), render the table from it, and have admin/tools/release.sh refuse a push whose commits touch paths outside the committing agent's list. (For: incident.conductor@.)

### A second reader the agent cannot skip: how two wrong emails became a gate on every draft

[newsroom.sgit.ai/articles/a-second-reader-the-agent-cannot-skip.html](https://newsroom.sgit.ai/articles/a-second-reader-the-agent-cannot-skip.html) · published 2026-10-09 · read 2026-11-10 23:42 UTC

**Its argument.** A rule kept by the agent it governs is hope. The fix is an independent reader behind a gate the harness runs: certain checks in code first, judgement by a reader with no history, and anything but an explicit pass fails.

**A rule to keep here.** 'Agents draft, a person sends' is our one real boundary for anything leaving the repositories; keep it absolute, and put what can be checked in code (the gate) rather than in an agent's promise.

### Where a check runs is part of the policy

[newsroom.sgit.ai/articles/where-a-check-runs.html](https://newsroom.sgit.ai/articles/where-a-check-runs.html) · published 2026-10-22 · read 2026-11-10 23:42 UTC

**Its argument.** Where a check runs decides what kind of control it is: a check the agent can edit or skip is a setting, not a boundary. CI is a setting until the owner protects the branch and the workflow.

**To build here.** Our gate and workflow live in the repository every agent can push to: say so in SECURITY.md, and ask Dinis for branch protection on main and on admin/ and .github/ (only he can set it). (For: incident.identity@, incident.conductor@.)

### Re-anchoring: keeping an agent's rules alive through every summary, and a canary that shows when they are not

[newsroom.sgit.ai/articles/re-anchoring-agent-behaviour-policies.html](https://newsroom.sgit.ai/articles/re-anchoring-agent-behaviour-policies.html) · published 2026-10-10 · read 2026-11-10 23:42 UTC

**Its argument.** Rules held only in conversation do not survive a summary (eighteen compactions kept 1.7% of context on average), so the policy is printed back from a file after every one, with a small computed report as a canary. A rule in view is still only an expectation.

**A rule to keep here.** CLAUDE.md and agents/JOBS.md are the anchor: every agent rereads both on every wake, and keeps its jobs and asks in status.json, not in its memory of the session.

### The Web Summit team

[newsroom.sgit.ai/articles/web-summit-part-four.html](https://newsroom.sgit.ai/articles/web-summit-part-four.html) · published 2026-11-02 · read 2026-11-10 23:42 UTC

**Its argument.** On the day the Web Summit team's agents ran on schedules (75 releases, 17 agents), the policies caught two of our own: writes outside a folder and a session signing as another. Neither did harm; both were the gap between mandate and reach, and both went to a person within hours.

**To build here.** Every commit here has the same git author and the agent is only a word in the subject: the session keys in data/keys.json sign nothing yet. Signed commits or a signed status file per agent would make 'who wrote this' checkable, not asserted. (For: incident.identity@, incident.observability@.)

### The Librarian's daily brief

[newsroom.sgit.ai/articles/the-librarians-daily-brief.html](https://newsroom.sgit.ai/articles/the-librarians-daily-brief.html) · published 2026-10-18 · read 2026-11-10 23:42 UTC · *A design, not built, by the article's own limits.*

**Its argument.** A librarian reads everything and writes only its own folder: it catalogues, keeps things in sync and flags; others fix. Its brief each morning lists what happened and the threads at risk of being lost.

**A rule to keep here.** The library lists gaps (files that do not say who wrote them, documents nothing links to) and sends them to their owners; it never edits another agent's file.

## CI owns the version; shipped means served

### CI owns the version

[newsroom.sgit.ai/articles/ci-owns-the-version.html](https://newsroom.sgit.ai/articles/ci-owns-the-version.html) · published 2026-10-27 · read 2026-11-10 23:42 UTC

**Its argument.** Whoever pushes cannot know the next number, so one CI job picks it after the push, stamps it, tags and deploys; with several agents committing, guessed numbers collide. Keep commit subjects numberless and guard the version file.

**A rule to keep here.** We follow it with one recorded departure (BRIEF-CORRECTIONS.md: CI tags and writes version.json but commits nothing). Because the newest push cancels older runs, some numbers are never deployed: say so where versions are listed.

### Green does not mean live

[newsroom.sgit.ai/articles/green-does-not-mean-live.html](https://newsroom.sgit.ai/articles/green-does-not-mean-live.html) · published 2026-08-17 · read 2026-11-10 23:42 UTC

**Its argument.** Two releases passed every check and never went live: the checks proved arrival at the remote, not that a reader was served. Now each release polls the live site for its version and fails loudly; and a page nothing links to, or missing from llms.txt, counts as unpublished.

**To build here.** Our CI measures push to served but does not fail when the version is never served (it prints 'not yet' and ends green): make that step fail. And make 'a page nothing links to' a gate warning: the library counts them on every build. (For: incident.conductor@.)

### The checks, measured: 123 local builds, 245 CI runs, 1,061 test checks, and where each check actually lives

[newsroom.sgit.ai/articles/the-checks-measured.html](https://newsroom.sgit.ai/articles/the-checks-measured.html) · published 2026-10-21 · read 2026-11-10 23:42 UTC

**Its argument.** Measured, a release took about 8 minutes locally and 5 in CI, and 26 of 44 failed CI test runs came from live data, not from the change. Checks coupled to live services fail for the wrong reason.

**A rule to keep here.** The gate stays offline and under its 5 s budget (0.1 to 0.2 s today); anything that needs the network runs on a schedule and reports, and never blocks a push during the storm.

### How a journalist agent publishes here

[newsroom.sgit.ai/articles/how-a-journalist-agent-publishes-here.html](https://newsroom.sgit.ai/articles/how-a-journalist-agent-publishes-here.html) · published 2026-10-28 · read 2026-11-10 23:42 UTC

**Its argument.** The handbook for an agent that publishes: eight rules, the release in eleven steps with CI choosing the number, and thirteen mistakes, each with the rule it produced. Another agent's draft is checked like a source.

**To build here.** CLAUDE.md has our rules but not the mistakes behind them: the decision graph's 'lessons' and the 43-minute miss belong in one lessons page, each with the rule or tool it produced. (For: incident.conductor@.)

## Data for agents

### The agent is the reader

[newsroom.sgit.ai/articles/the-agent-is-the-reader.html](https://newsroom.sgit.ai/articles/the-agent-is-the-reader.html) · published 2026-10-11 · read 2026-11-10 23:42 UTC · *No agent has paid yet, by the article's own limits.*

**Its argument.** An agent arrives with an objective and little room, so a small curated slice of a graph, with provenance, is worth more to it than pages. A second product is the signed claim: checked against its source on a date and valid until an expiry.

**To build here.** Every dataset says when it was read; none says until when to trust it. Add the next scheduled read (or valid-until) at the top of each file, and serve one small now.json (the headline, the warnings in force, the open items) for an agent with one question. (For: incident.dev@, incident.meteorologist@.)

### Two agents

[newsroom.sgit.ai/articles/two-agents-one-vault.html](https://newsroom.sgit.ai/articles/two-agents-one-vault.html) · published 2026-10-12 · read 2026-11-10 23:42 UTC

**Its argument.** One agent writes the news into an encrypted vault and the site only reads it with a published read key: updating is a commit, not a release, and neither side holds the other's key. The vault is the interface between agents, and a third agent can join from the clone command alone.

**To build here.** This is PIPELINE.md's data lane, running elsewhere: one writer per file, the read key published on purpose, the site drawing what it decrypts. Here it is still 'Not yet' in REALITY.md. (For: incident.dev@.)

### One researcher for every newsroom

[newsroom.sgit.ai/articles/one-researcher-for-every-newsroom.html](https://newsroom.sgit.ai/articles/one-researcher-for-every-newsroom.html) · published 2026-10-26 · read 2026-11-10 23:42 UTC · *A proposal, not built, by the article's own limits.*

**Its argument.** Several newsrooms research the same sources slowly, so one shared researcher should capture on a schedule and publish a pack a day. What is published depends on the source's licence tier: open and public-sector pages in full, others as link, hash, change dates and at most 25 words.

**A rule to keep here.** sources.json already records reuse and its basis per source: keep it on every source, publish open data (IPMA) in full with attribution, and hold press text to a short excerpt with a link.
