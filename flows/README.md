---
title: Flows: the team's work, step by step
summary: Small animations of how the work was done (a wake, a hand-over, an agent over the night, the storyteller's paths), each built from the record by one tool, each step with its commit or file, each embeddable by one line. Experiments.
mount: <div data-flows-gallery data-root="../"><noscript><p class="meta">The flows are drawn with JavaScript from data/flows/index.json.</p></noscript></div>
head: <link rel="stylesheet" href="../app/flows/flows.css" data-flows-css><script src="../app/flows/player.js" defer></script><script src="../app/flows/gallery.js" defer></script>
---
> Kept by incident.motion@web-summit.dinis, 11 November 2026, 10:19 UTC

# Flows: the team's work, step by step

**Experiments.** Dinis asked (11 November, ~10:10 UTC, [BRIEF.md](../BRIEF.md)) for "a whole number of very small examples of that kind of animation in action ... that explain the workflow", and for "a set of APIs and data structures so that I can use the same visual explanation ... on a specific event, on a specific set of actions for a specific agent". This page is both: the small views above, and the format and the API below. Every step shown carries its evidence (a commit, a file, a time); a time that is not on record and was drawn from a neighbouring fact is dashed and says so. A view of the record, not a warning service: for the storm, follow IPMA and ANEPC.

The full engines these small views stand beside: Angelo's live map and Silvio's Universe, pinned copies used by [the agents page](../agents/index.html) (kept by incident.observability@).

## Ask for any flow

Any agent, any wake, built here in your browser from the same record by the same code (`app/flows/core.js`):

<form data-flows-ask class="card"><label>Kind <select name="kind"><option value="wake">a wake</option><option value="handover">a hand-over</option><option value="night">over the night</option></select></label> <label>Agent <input name="agent" value="reporter" size="14" aria-label="agent role, e.g. reporter"></label> <label>At (UTC, inside a wake) <input name="at" placeholder="2026-11-11T09:00:00Z" size="20"></label> <label>Session handing over <input name="n" size="3" inputmode="numeric"></label> <button type="submit">Draw</button></form>
<div data-flows-asked></div>

## Embed one, in one line

```
<iframe src="https://storm-charles.promptugal.news/app/flows/embed.html?flow=wake-journalist" width="640" height="440"></iframe>
<div data-flow="wake-journalist"></div><script src="https://storm-charles.promptugal.news/app/flows/player.js" defer></script>
<iframe src="https://storm-charles.promptugal.news/app/flows/embed.html?kind=night&agent=observability" width="640" height="440"></iframe>
```

The player reads only this site's files, makes no other request, and uses the site's tokens (system colours where the embedding page has none). Keys: ← → step, space plays. It waits for a press when the reader asks for reduced motion.

## The format (flows/v1)

The schema: [data/flows/schema.json](../data/flows/schema.json). A flow is:

| Part | What |
|---|---|
| `actors` | who took part: `id`, `kind` (person, agent, session, outside body, thing), `icon` (its shape says its kind), `mark` (up to three letters), `label` |
| `steps` | what each did, in order: `t` (UTC), `actor`, `verb`, `object`, `to` (the actors it is addressed to), `evidence` (`commit`, `file`, `url`, `run`, `key`, or a `note` saying nothing is on record); `drawn` when the time is not recorded |
| `edges` | who spoke to whom and how often, counted from the steps |
| `pauses` | the gaps with no step on record, in minutes |

The verbs are the primitives: wakes, reads, writes, commits, addresses (a `For:` trailer), asks, answers, starts, keys, hands-over, builds, serves, publishes, uses, finds, decides, ends. They are meant to match incident.storyteller@'s `story/primitives.md`; where the two differ, the storyteller's words win and this list follows.

## Where a flow comes from

`tools/flows-build.mjs` (a generator of the build: `--out <dir>`, `--check`) makes every flow, never by hand:

- **By recipe** ([flows/flows.json](flows.json), one line each): `wake` (one agent's commits cut where 15 minutes pass with none; the session it was in; each `For:`; CI serving each push), `handover` (a session's last pushes, its hand-over note, who started the next, its key, its first pushes), `night` (a lane per session, every commit).
- **From the storyteller's paths**: every `story/paths/<id>.md` with a table whose columns begin `| t (UTC) | actor | verb | object | evidence |` (and an optional `to`) becomes `path-<id>`; a cast table `| id | kind | icon | mark | label |` in the path or in `story/cast.md` names the actors.

It reads tracked files only, since the build reads no git history: commits from `data/ci/commits/*.json` (incident.ci@) and `data/agents/commits.json` (incident.observability@), sessions from `data/agents/sessions.json`, keys from `data/keys.json`, hand-overs from `agents/*/status.json`. It writes `data/flows/record.json` (the joined record, also what the browser reads), `data/flows/<id>.json` and `data/flows/index.json`, served also at `api/v1/flows/`. Session addresses are never shown: "session 7 of librarian" says it.

## What these show badly

- What woke an agent is not in the record (the scheduler's tasks are not in git): a wake begins at its first commit.
- What an agent read is not recorded at all; only what it wrote. A flow is the visible half of the work.
- A commit's time is its author's clock; pushes in one minute are drawn in the order of the record.
- The record behind it is as fresh as its sources: the commit extracts are refreshed by incident.ci@ and incident.observability@, not on every push.
