> Kept by incident.observability@web-summit.dinis, 11 November 2026, 23:10 UTC

# The swarm's trace, as data

What the Storm Charles team did, from 10 November to now, as one event per line: a push, a message from one agent to another, a session spawned by the conductor, a CI run, an hour of an agent's model calls. Made at Dinis's word (BRIEF.md, 11 November ~22:00 UTC, item 4: "All of these needs to be JSON files"), for the visualizations built in the fringe repository ([PrompTugal/PrompTugal__News__Fringe](https://github.com/PrompTugal/PrompTugal__News__Fringe)). Not a warning service: this is about the team, not the storm.

## The files

| File | What it holds |
|---|---|
| [index.json](index.json) | every trace file in time order: path, lines, bytes, first and last time, sha256. Made by the build (`tools/trace-index.mjs`, from 23:10 UTC on 11 November) and served; not in git and written only into `_site/`, so no agent commits it |
| [units.json](units.json) | every unit that appears: the person, the swarm (A4), each agent (A3) with its keys and sessions in order, the CI (A0), and agents in other accounts |
| `<YYYY-MM-DD>/<HH>.json` | the backfilled events of one UTC hour, sorted by `seq`; past 240 KB an hour continues in `<HH>-2.json`, `-3`, ... |
| `<YYYY-MM-DD>/<HH>.<role>.json` | the events an agent wrote live in that hour (one file per agent, so no two agents edit one file) |

Each file is one JSON object: `{"elastic_feed": {...}, "by", "updated", "flow", "count", "docs": [ ...one event per line... ]}`. Served as they are: `https://storm-charles.promptugal.news/data/trace/index.json`, then each `path` in it. Replay: merge the `docs` of an hour's files by `seq` (it rises with time), hour after hour.

## Into Elastic

Every trace file and units.json carries a top-level `elastic_feed` block in the shape of the fringe repository's `admin/tools/elastic-feeds.mjs`: events go to index **`ptnews-storm-trace`** (id `seq`, time `at`), units to **`ptnews-storm-units`** (id `unit_id`); the `owner` is the agent that last commits the file. (The fringe's Elastic library accepts only indexes named `fringe-`, `ptnews-`, `websummit-`, `swarm-` or `agents-`, so `ptnews-`.) Every doc passes that library's privacy check (`findings()`: no address that is not an agent's, no phone number, nothing key-shaped), checked before each push.

## The schema: the fringe repository's, unchanged

Each line is one document of the fringe repository's `swarm-flows` index (`abp/tools/flow.mjs`, `data/elastic-export-swarm-flows.json`), using only fields its strict mapping accepts, so its Elastic, Grafana and gravity views read ours as they read theirs. Altitudes as in its `docs/where-agents-run.md` §3.

| Field | Here |
|---|---|
| `flow` | one per UTC hour: `ws214-20261111T09` |
| `trace_id` | `sha256("trace:" + flow)`, first 32 hex characters (as flow.mjs) |
| `span_id`, `parent_span_id` | `sha256("span:" + unit_id)` and the same of `parent_id`, first 16 (as flow.mjs) |
| `unit_id`, `parent_id` | `P-dinis` → `A4-ws214` (the team) → `A3-<agent>` → `A0-ci-<run>` (a CI run started by that agent's push) or `A1-<hash>` (an hour of that agent's model calls) |
| `altitude`, `role` | P person, A4 swarm, A3 agent, A1 llm call, A0 compute |
| `phase` | `start`, `step`, `end` |
| `name` | its first word is the kind: `commit`, `msg`, `spawn`, `session`, `ci`, `llm`, `ev`, `fetch`, `write` |
| `item` | the other end: the commit (12 hex), the receiving unit of a `msg` or `spawn`, the session of a `session` line, the sha256 of a `fetch` or `write` |
| `runner` | the agent the event belongs to |
| `person` | `dinis` (the person the work is for; the only one who instructs) |
| `environment` | `R1 web-summit.dinis` (Claude Code in the cloud, this team's account), `GitHub Actions PrompTugal`, `R1 PrompTugal.vicky`, ... |
| `key_fp` | the agent's session key in use at that time (data/keys.json, encryption fingerprint) |
| `valid` | a CI run's result (`true` = success); a fetch's status was 2xx or 3xx |
| `duration_ms` | a CI run's run time |
| `note` | one line: the session number, the commit of a message, a spawn's reason, a measured hour's calls and tokens |
| `source` | where the line came from: `backfill:<file>` or `tools/trace.mjs` (written live) |
| `seq` | the time in milliseconds × 1000, plus one for each event in the same millisecond |

An example, the conductor handing the trace job to this agent's ninth session:

```json
{"trace_id":"bdc5f0c4b1f78259a21277ff227c5583","span_id":"c542f4b2ac4ebc85","parent_span_id":"288d82535a1683b4","flow":"ws214-20261111T22","seq":1794434640000000,"at":"2026-11-11T22:04:00.000Z","phase":"step","unit_id":"A3-incident.conductor@web-summit.dinis","parent_id":"A4-ws214","altitude":"A3","role":"agent","name":"spawn incident.observability@web-summit.dinis session 9","runner":"incident.conductor@web-summit.dinis","person":"dinis","environment":"R1 web-summit.dinis","key_fp":"sha256:2df48a3207ec20ae","item":"A3-incident.observability@web-summit.dinis","note":"hand-over at ~160k; takes the trace job","source":"backfill:agents/conductor/sessions.json"}
```

## How each kind was retrieved

| Kind | From | Retrieved by |
|---|---|---|
| `commit` | every commit on `dev` since 10 November: its time, the `Agent:` trailer (else the subject's prefix), subject, and `Claude-Session:` matched to the agent's session number | `git log` in `tools/trace.mjs backfill` |
| `msg` | each name in a commit's `For:` trailer: one edge per receiver. Edges to other accounts are tasks crossing accounts: Vicky Wang's desks (`weather@PrompTugal.vicky`, `conductor.B@PrompTugal.vicky`), Silvio's (`dashboard@web-summit.silvio`), Angelo's (`dev.map@PrompTugal.angelo`) | the same |
| `ci` | each CI run: start and end, result, run time, the commit and the agent that pushed it | [data/ci/runs/](../ci/runs/) (incident.ci@'s records, from GitHub's API) |
| `llm` | each hour of each measured agent session: the number of model calls and output tokens. An aggregate, not one line per call; never the words; the model an agent runs on is not named | [accounts/ledger/](../../accounts/ledger/) (incident.accountant@'s measure, from each session's own transcript) |
| `spawn`, `session` | the conductor starting or handing over an agent session | [agents/conductor/sessions.json](../../agents/conductor/sessions.json) (from 20:47 UTC on 11 November), and the sessions whose own status names the conductor and a start time ([data/agents/sessions.json](../agents/sessions.json)) |
| `delegate` (A2 loop), `llm call` (A1) with `source: backfill:models/calls` or `backfill:agents/<role>/calls` | the team's third-party model calls through tools/llm.mjs, one A1 span per call (model, cost_usd, duration_ms, ok or not; never the words): incident.models@'s events copied as they are (their own flow, trace_id and span_id; seq renumbered with the rest), an A2 with no parent put under its agent's A3; a call with no event becomes an A1 start/end of its own (unit `A1-<call id>`) under its agent | [models/calls/index.json](../../models/calls/index.json) (incident.models@'s text-free records, written by `tools/models-calls.mjs`), from 22:00 UTC on 11 November |
| `ev`, `msg`, `spawn`, `fetch`, `write` with `source: tools/trace.mjs` | written live by the agent itself as it works | `node tools/trace.mjs ...` |

Units: [units.json](units.json) from data/keys.json (a key's time from its own "how", else 00:00 of the day it was added), data/agents/sessions.json and agents/conductor/sessions.json. Cross-account reading: the fringe repository's `swarm/tools/run.mjs` reads this site's `api/v1` (unit `A3-swarm.1.fringe@PrompTugal.dinis`); its runs are not yet in these files.

**Gaps, stated:** spawns before 20:47 UTC on 11 November are only where an agent wrote down who started it; most agents' messages before this file existed went by the conductor's lanes and sessions, not commits, and are not here; the team's third-party model calls (tools/llm.mjs) are lines only from 22:00 UTC on 11 November, when incident.models@ began publishing its text-free records (models/calls/); before that they appear only as daily totals in [models/ledger-summary.json](../../models/ledger-summary.json).

## Writing a line as you work (for every agent)

```
AGENT=incident.<role>@web-summit.dinis node tools/trace.mjs msg   --to conductor --subject "one line"
AGENT=... node tools/trace.mjs spawn --child <role> --session <session id> --n 9 --why "hand-over at ~160k"
AGENT=... node tools/trace.mjs fetch --host www.ipma.pt --status 200 --bytes 5120 --sha256 <hex>
AGENT=... node tools/trace.mjs write --path incidents/<id>/timeline.md
AGENT=... node tools/trace.mjs ev    --unit <role> --phase step --name "what"
```

Your lines go to `data/trace/<date>/<HH>.<role>.json`; commit them with your work. Never a private person's name, a session's secret, a vault key, a prompt or a model's words in a line; free text is cut to one line of 160 characters, and addresses that are not agents' names are taken out.
