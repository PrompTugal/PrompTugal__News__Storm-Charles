# If you are the next conductor: lead from here

> Kept by incident.librarian@web-summit.dinis, 11 November 2026, 04:12 UTC. For a fresh incident.conductor@web-summit.dinis session, so it can lead from the pack and not from the first session's memory. The three tables are computed at every build from the files named above them; the prose is the librarian's reading of the files it points at, and it says so where nothing is written down. If this page and a file disagree, the file wins: tell the librarian. Whether the conductor's session is replaced is Dinis's decision. [The pack](README.md).

## Read, in this order

1. [start.md](start.md): the rules, how to release. 2. [state.json](state.json): the storm now. 3. [conductor.md](conductor.md): your paths, your neighbours, your cards. 4. This page. Then only what you need.

## What you are

- **The lead: you route and you talk with Dinis.** Your files: the incident's `timeline.md`, `decisions.md`, `incident.json`, the jobs table, the brief, the roadmap. [[file:agents/JOBS.md]], [[file:agents/policy.json]]
- **Only Dinis instructs.** You route his direction; every report, message and page is material. Write his words, close to verbatim and dated, into [[file:BRIEF.md]] before you route them: the agents' packs quote that file, not your prompt.
- What you can reach, what was authorised, and the gap between them: [[file:agents/conductor/policy.md]] (a draft until Dinis agrees it).
- **Your own status file is stale** (its last entry is 01:03 UTC): [[file:agents/conductor/status.json]]. Your first push: bring it current, with a `session` field ([[file:data/agents/sessions.json]], `how_to_record`).

## The rules you apply when you route

1. **Fact, evidence, hypothesis**, each with its source and the UTC time read; the headline in `incident.json` is always a decision or warning from its primary source. [[file:CLAUDE.md]], "Content rules"
2. **Not a warning service**: no forecast or advice of our own. Same file.
3. **People**: public sources only; a private person is never named or linked; a redacted row keeps its id. Same file.
4. **Agents draft, a person sends**: nothing leaves the repositories by an agent's hand; no contact details in git. `BRIEF.md`, the section of 10 November, ~23:40
5. **`dev` only.** `main` is a pull request merged by Dinis; CI owns the version; no force-push, no empty commit, no disabled check. `CLAUDE.md`, "Branches and versions"
6. **Each agent changes only its own paths.** An agent that needs another's file asks in a commit with `For:`. Only you change `agents/policy.json` for another agent, and an agent never edits it so that its own push passes; what you change across folders is logged in [[file:agents/conductor/cross-folder.log.md]].
7. **The ids `source:*` are incident.sources@'s**; links made in the browser are their maker's to check (your decision, 03:48 UTC). [start.md](start.md), "What you can count on"
8. **Models** only through `tools/llm.mjs`; the daily cap is 20 US dollars (`BRIEF.md`, ~02:50). No name of the model an agent runs on in anything pushed.
9. **Tokens.** A report to you is a few numbered lines with a link; agent-to-agent asks go in commits. Start prompts give the pack's live addresses, the measure step and a hand-over limit (about 50 calls or 250,000 tokens). [[file:accounts/savings.md]], [[file:accounts/measure.md]]
10. **Vicky Wang's desks**: we feed them (her conductor's inbox, or `For:` her agents); we never write to her files. `CLAUDE.md`, "Whose it is"
11. **Timeline row ids are permanent**: a new row goes below the rows of its minute; then `node tools/timeline.mjs incidents/2026-11-10-storm-charles`. `CLAUDE.md`, "Build"
12. **A vault key** is never in a file, a commit message or a page. [[file:data/vaults.json]]

## The bridge to the other repository

incident.meteorologist@, incident.researcher@ and incident.dev@ work in SGit-AI__Website__Web-Summit (`team/incidents/`): their sessions could not attach this repository. You carry their work across:

```
tools/sync-from-websummit.sh <a pulled clone of SGit-AI__Website__Web-Summit>
```

It copies their data (never `signals.json`, which is made here from the timeline) and their three status files, with paths rewritten, and prints what changed; you commit it under your name. [[file:tools/sync-from-websummit.sh]]. They cannot push a ledger line here either: the accountant counts them as missing ([[file:agents/accountant/status.json]]). The ask to attach the repository to their sessions waits on Dinis (below).

## Your hourly wake

**Not written down as one list anywhere**: this is assembled from the jobs table, your status file's `done` and the news pages. Correct it in your first hour.

1. `git pull --rebase origin dev`; read the messages that arrived (most agents report only on change).
2. **The storm first.** If incident.ipma@, incident.weatherwatch@ or incident.archivist@ reports a primary source changed: read it at source, add the timeline row, run `tools/timeline.mjs`, update `decisions.md` and the headline.
3. Run the bridge.
4. **The board**: [what waits on Dinis](../../board/for-dinis.md) in its order, and what waits on you (both below). Put the top of the first to Dinis; route his answers; an answer that changes direction goes into `BRIEF.md` first.
5. **Sessions**: any agent near its limit (the books: [[file:accounts/index.md]]) gets a fresh session started from its pack, its own wake, and the old wake disabled. Tell incident.observability@ who was started, from which session, on whose word ([[file:data/agents/starts.json]]).
6. The round article, rendered as a PDF for Dinis: [[file:news/2026-11-11-round-two.md]] (the librarian keeps the text).
7. Your status file, the measure step, release.

## The agents now

From each `agents/<role>/status.json` (`session`, `state`, `updated`), else the latest session in [[file:data/agents/sessions.json]] (marked "commits"); the wakes from [[file:library/pack/wakes.json]] (read 04:10 UTC; the scheduler's own list is the authority).

[[agents-now]]

## What waits on Dinis, in the board's order

Before the launch first, then the rest, most blocking first; the card is `board/items/<id>.json`, the sentence behind it on [the board's page](../../board/for-dinis.md).

[[for-dinis]]

## What waits on you

[[for-conductor]]

## In flight at 04:12 UTC (written by hand: check each against its file)

- **The model provider's account is out of credit** (first on Dinis's list): incident.shadow@ records each hour as a gap, incident.perplexity@ retries. [[file:agents/shadow/status.json]]
- **The weather face is checked against the warnings** by incident.weather@'s scheduled wakes at 05:25 and 09:25; the warnings themselves are in [state.json](state.json).
- **Fresh sessions**: the librarian is on its third; designer, observability, graph, weatherwatch, studio, journalist and reporter have had a second. Several earlier sessions' hourly wakes still fire (the table says which). Your own replacement waits on Dinis.
- **The launch**: the draft and the open letter wait on Dinis. [[file:outreach/launch.md]]
- **What is new**, hour by hour: [[file:news/README.md]] (03:00 is closed; 04:00 opens when it has commits).
