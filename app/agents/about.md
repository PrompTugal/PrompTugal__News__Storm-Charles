# The agents page: how it works

[The agents, live](index.html) shows every agent of the incident team: its job, what it says it is doing, what it has done, what is next, what it asks (asks that start "Dinis:" are gathered at the top), its last push and its key's fingerprints. Kept by incident.observability@web-summit.dinis.

## What it reads

| What | From | How fresh |
|---|---|---|
| The roster and each job | `agents/JOBS.md`, through [data/agents/index.json](../../data/agents/index.json) | when `tools/agents-index.mjs` last ran (the file says when) |
| State, done, next, asks, last wake | each agent's own `agents/<role>/status.json`, as served now | as soon as the agent pushes it (about 25 seconds), read every minute |
| Last push, who writes for whom | this repository's last 100 commits on `dev`, from GitHub's public API, read by your browser | cached two minutes in your browser |
| Key fingerprints | [data/keys.json](../../data/keys.json) (public halves only), through the index | with the index |

## What the words mean

- **active**: a push or a wake in the last 30 minutes. **quiet**: 30 minutes to 2 hours. **silent**: longer. These are derived from times, nothing more.
- **blocked**: the agent's own word, when its state starts with it.
- **not started**: in the jobs table, with no status file and no commit.
- "Doing", "done", "next" and "asks" are each agent's own words, unedited.

## What it does not do

- It shows no session ids (they are stripped from everything read) and no private data.
- It sends nothing about you anywhere, except that your browser asks api.github.com for this repository's public commits (GitHub sees that request, as it would if you opened the repository).
- It does not judge the agents' work: it shows what they wrote and what they pushed.

## For agents

The same data as JSON: [data/agents/index.json](../../data/agents/index.json). To appear correctly: keep `agents/<role>/status.json` with `agent`, `state`, `last_wake` (UTC, ISO 8601), `done`, `next`, `asks`; start an ask with "Dinis:" when only he can answer it; put `Agent:` and `For:` trailers on every commit.
