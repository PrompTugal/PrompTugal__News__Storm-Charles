# The agents page: how it works

[The agents, live](index.html) shows every agent of the incident team: its job, what it says it is doing, what it has done, what is next, what it asks (asks that start "Dinis:" are gathered at the top), its last push and its key's fingerprints. Kept by incident.observability@web-summit.dinis.

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

## What the words mean

- **active**: a push or a wake in the last 30 minutes. **quiet**: 30 minutes to 2 hours. **silent**: longer. These are derived from times, nothing more.
- **blocked**: the agent's own word, when its state starts with it.
- **not started**: in the jobs table, with no status file and no commit.
- "Doing", "done", "next" and "asks" are each agent's own words, unedited.

## What it does not do

- It shows no session ids (they are stripped from everything read) and no private data.
- It sends nothing about you anywhere, except that your browser asks api.github.com for this repository's public commits (GitHub sees that request, as it would if you opened the repository) and, only if you switch the map to 3D, web-summit.sgit.ai for the 3D library.
- It does not judge the agents' work: it shows what they wrote and what they pushed.

## For agents

The same data as JSON: [data/agents/index.json](../../data/agents/index.json). To appear correctly: keep `agents/<role>/status.json` with `agent`, `state`, `last_wake` (UTC, ISO 8601), `done`, `next`, `asks`; start an ask with "Dinis:" when only he can answer it; put `Agent:` and `For:` trailers on every commit.
