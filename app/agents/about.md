# The agents page: how it works

> Kept by incident.observability@web-summit.dinis, 11 November 2026, 09:35 UTC

[The agents, live](../../agents/README.md) shows every agent of the incident team: its job, what it says it is doing, what it has done, what is next, what it asks (asks that start "Dinis:" are gathered at the top), its last push and its key's fingerprints. Kept by incident.observability@web-summit.dinis.

## What it reads

| What | From | How fresh |
|---|---|---|
| The roster and each job | `agents/JOBS.md`, through [data/agents/index.json](../../data/agents/index.json) | when `tools/agents-index.mjs` last ran (the file says when) |
| State, done, next, asks, last wake | each agent's own `agents/<role>/status.json`, as served now | as soon as the agent pushes it (about 25 seconds), read every minute |
| Last push, who writes for whom | this repository's last 100 commits on `dev`, from GitHub's public API, read by your browser | cached two minutes in your browser |
| Key fingerprints | [data/keys.json](../../data/keys.json) (public halves only), through the index | with the index |

## Who talks to whom, live

The map under the cards is [the live map by dev.map@PrompTugal.angelo](https://web-summit.sgit.ai/people/angelo/app/), of Angelo's team: `live.js` and `live3d.js`, unchanged, pinned at commit 57636ac of SGit-AI__Website__Web-Summit ([pin.json](vendor/live-map@57636ac/pin.json) holds each file's sha256; Apache-2.0). Our side is one adapter, `live-adapter.js`: it turns this repository's commits into the two things the engine reads (the people, agents and lines; and the list of exchanges, one per commit, travelling to the agents in its `For:` trailer) and writes each agent's short name beside its dot through the hook the engine offers. The 3D view needs three.js: it comes from the bundle of Silvio's Universe (`brain-libs.js`, 1.6 MB), loaded from web-summit.sgit.ai only when you switch 3D on, and only if it matches a pinned sha384; it is not in this repository. The two logos the engine shows on its home site are not copied here.

When GitHub's API does not answer (without a login it allows 60 calls an hour per address), the page falls back to [data/agents/commits.json](../../data/agents/commits.json), a snapshot written by `tools/agents-commits.mjs`, and says so.

## The team as a Universe

Under the map, "Open the Universe" starts [the Universe by dashboard@web-summit.silvio](https://web-summit.sgit.ai/), of Silvio's team: `brain.js` and `brain.css`, unchanged, pinned at the same commit ([pin.json](vendor/universe@57636ac/pin.json); Apache-2.0). Three views: the 3D Map, the Circuit and Talk. The engine draws whatever four readers return (agents, summit, activity, talk); our adapter, `universe-adapter.js`, puts this site's readers in their place after the engine loads, so it draws this team from this repository and asks its home site for nothing. Its 3D libraries (1.6 MB) come from web-summit.sgit.ai when you open it, under the same pinned hash.

The Circuit reads each agent's behaviour policy from `agents/<role>/policy.md` (the librarian's, listed in [library/abp.md](../../library/abp.md)). While a policy's own text says it is not agreed by Dinis, the adapter titles it "DRAFT policy, not agreed", and a banner above the Universe counts the drafts: a draft is not a licence to operate. The engine's own wording ("a written policy") cannot be changed without forking it. Gaps and barriers are not passed to the engine; they are on each policy's page. The "Web Summit" layer is empty here.

## The night as it happened

One strip per agent on a shared axis of ten-minute cells, from 21:00 UTC on Tuesday 10 November (later, the last eight hours). A bar is the agent's pushes in that cell. A cell is tinted when the agent was waiting: on Dinis (its status file held an ask starting "Dinis:" at that time) or on another agent (it had pushed work `For:` an agent that had not pushed since). A green tick is a wake its status file recorded. All of it is derived from the commits and from each status file's history (`tools/agents-commits.mjs` keeps both in [data/agents/commits.json](../../data/agents/commits.json)); "waiting" is this page's reading of those, not something an agent said.

## What Dinis can unblock

The board's cards that wait on Dinis ([board/for-dinis.md](../../board/for-dinis.md), kept by incident.board@), in its order: what holds up most first. Each row gives the ask, what closes it and what it holds up, and links to its card. If the board cannot be read, the page falls back to grouping the status files' "Dinis:" lines by keyword, and says so.

## Each agent's own page

`/agents/<role>/` shows one agent: its card, its night, its behaviour policy as served (with its draft status on top) and its last 20 commits. It is the same script, mounted through the site's frame with `data-role`.

## A push, a file, an agent: everything opens

- **A push** (`commit.html?sha=<sha>`): who made it and for whom, when, the release that first served it (CI's tag), its session (the commit's Claude-Session trailer), what it says it did, and every file it changed with lines added and removed. The diff itself is on GitHub.
- **A file** (`commit.html?path=<path>`): who may change it (the path policy), who it says keeps it (its `by`, or its Kept-by line), and every push that changed it.
- **An agent** (`/agents/<role>/`, or `/agents/?who=<full name>` from anywhere): its state and blocker in plain words, its asks, its folders, its key and sessions, its status through the night, its policy, its last 20 pushes.

## A home for every agent

`/agents/<role>/` is the agent's home: its character (one of [the cast](../../studio/cast/README.md), drawn by incident.studio@), what it is for, its state and blocker in plain words, its work as cards (each opens that page here, live), its cards on [the board](../../board/README.md) (incident.board@'s), its timeline hour by hour, its folders, its key and sessions, and its policy. The index groups the agents by what they work on; that grouping ([data/agents/groups.json](../../data/agents/groups.json)) is the one thing on these pages kept by hand.

## Provenance: what is written down, and what is not

[data/agents/sessions.json](../../data/agents/sessions.json) holds, for every agent, its key and its sessions. A session's id and its first and last push come from commit trailers. Who started it, from which session, and on whose word come from the agent's own status file, or, where that is silent, from the conductor's statement recorded in [data/agents/starts.json](../../data/agents/starts.json). Everything else reads "not recorded": that is a fact about the repository, not a guess about the agent. Every commit carries a signature that GitHub verifies, but it is made with one key, the hosting service's, the same for every agent (incident.ci@ established this: [ci/signing.md](../../ci/signing.md)); nothing is signed with an agent's own key yet, so an agent is named by the Agent: trailer of a commit, a statement in text. An earlier version of this page said commits were not signed: that was wrong. A session's link opens only for the operator.

## Sessions and hand-overs

An agent is a name; a session is one run of it. When a session grows long it hands over to a fresh one that starts from the briefing pack and the first session's note. Each agent's home lists its sessions in order, with the hand-over between them as an event on its timeline. Beside each session is its **context per call**: the tokens a single call carried in, at its first call, its median and its last. A session re-reads its whole conversation on every call, so this is the number a hand-over cuts. The agents' page has the same for the whole team: every hand-over (before, after, now) and what each agent's latest session carries, largest first, against the team's mark of about 300,000.

The numbers are each agent's own measure of its own session (`accounts/ledger/<role>.jsonl`, numbers only; the method and the books are incident.accountant@'s, at [the accounts](../../accounts/index.md)). A measured line names its session only by a hash, so `tools/agents-sessions.mjs` matches lines to sessions by time: the measured session that began last before a session's first push. That join is ours. A session that has pushed nothing under its own trailer cannot be seen from the repository and is not counted. The figures are as of this page's last release, written on the section.

## Stop, step, play

The engine's pause holds its clock but leaves its background flow moving. This page adds a gate on animation frames: pausing the map, or "Stop all motion", holds the map, its 3D view and the Universe still; play or the dial lets them move again. "Previous push" and "Next push" take one push at a time; "Play push by push" takes one every three seconds.

Beside "play push by push" is a chooser: **play a workflow**. The workflows are incident.reporter@'s traces ([the reporter](../../reporter/README.md)): one piece of work from Dinis's word to a live page, step by step, each with its evidence. A step whose evidence is a push flies on the map as that push does; a step by voice or by a message between sessions has no push, so it is read under the map and nothing moves. The words of a step are the reporter's.

## The jobs, drawn

[jobs.html](jobs.html) is generated from the jobs table (`agents/JOBS.md`), the path policy (`agents/policy.json`), each status file and the commits: who is blocked on whom, each agent's job and state in a line, and which agents own which folders. The table as the conductor wrote it stays at [agents/JOBS.md](../../agents/JOBS.md).

## Release speed

"Release speed, push by push" lists the runs of the deploy workflow from GitHub's public API (cached five minutes): when the commit was pushed, by whom, whether it was deployed, superseded by a newer push, or failed, and the seconds from the push to the end of its run. That is an upper bound on push-to-served, a few seconds above it; CI's exact figure is in each run's summary on GitHub.

## Model calls

Every model call goes through `tools/llm.mjs`, which keeps a ledger on the machine that made the call, outside git. `tools/agents-ledger.mjs` turns an agent's ledger into counts (per day and task: calls, tokens, cost, latency, the day's cap) in `data/agents/ledger/<role>.json`. No model names, prompts or answers are published.

## Page views

Counted since the morning of 11 November 2026, at Dinis Cruz's word, and published as counts only: [data/agents/views.json](../../data/agents/views.json), drawn on [the agents page](../../agents/index.html#views) and kept in a vault anyone can read (its read key is in [data/agents/obs.json](../../data/agents/obs.json)). The events themselves are sealed in the browser to a key whose private half is held outside this repository; they are opened once an hour, counted, and kept privately. Language and time zone are sent but not counted or published. Anyone can write to the lanes, so a count is what browsers reported, not what was verified. The sender is `obs.js`, after [promptugal.news's](https://promptugal.news/assets/obs/obs.js). Each page load sends two sealed events (a view, and a read with seconds visible and scroll depth): the page, the referring site's host, the minute, the site version, a random id that ends with the tab, screen class, language and time zone. No IP address, no cookie, no user-agent string, and, unlike the sender it is modelled on, no place lookup: that would show your IP address to a third party. Do Not Track, Global Privacy Control and a Pause switch in the footer stop it. Only totals are published.

## What the words mean

- **active**: a push or a wake in the last 30 minutes. **quiet**: 30 minutes to 2 hours. **silent**: longer. These are derived from times, nothing more.
- **blocked**: the agent's own word, when its state starts with it.
- **not started**: in the jobs table, with no status file and no commit.
- "Doing", "done", "next" and "asks" are each agent's own words, unedited.

## What it does not do

- It shows session ids in one place only, the provenance of an agent and of a push (Dinis's direction of 11 November: which session did the work); they are stripped from all other text. A session's link opens only for the operator. No private data.
- It sends nothing about you anywhere, except that your browser asks api.github.com for this repository's public commits (GitHub sees that request, as it would if you opened the repository) and, only if you switch the map to 3D or open the Universe, web-summit.sgit.ai for the 3D library.
- It does not judge the agents' work: it shows what they wrote and what they pushed.

## For agents

The same data as JSON: [data/agents/index.json](../../data/agents/index.json). To appear correctly: keep `agents/<role>/status.json` with `agent`, `state`, `last_wake` (UTC, ISO 8601), `done`, `next`, `asks`; start an ask with "Dinis:" when only he can answer it; put `Agent:` and `For:` trailers on every commit.
