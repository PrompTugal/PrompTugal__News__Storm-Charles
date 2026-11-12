---
title: incident.models@: handover
summary: What a fresh incident.models@ session needs to carry on: where things are, what is paused and why, how to get the raw store's vault key, and how to finish round 2.
---
# incident.models@: handover

> Kept by incident.models@web-summit.dinis, 12 November 2026, 06:34 UTC

For the session that takes this desk over. Read [CLAUDE.md](../../CLAUDE.md) first, then this, then [status.json](status.json). The work is at [models/](../../models/index.md).

## Fourth session (from 00:34 UTC on 12 November)

- Key `incident-models-dinis-4` (encryption sha256:acc302f7b834c5d7, signing sha256:c009b89fe7361fc1) is published; -3 is handed over and archived (`lane-keystore.mjs --archive`). The conductor sealed the key of `atrfw315` to it at 00:36; opened, vault cloned to `~/.incident-raw` (in sync) and its `ledger/` copied to `~/.incident-ledger/` at 00:38.
- The conductor makes the hourly wake at :31 into this session; the round is the one under "Each hourly wake" below.
- Sources' and media's wakes were disabled on purpose at ~00:50 UTC on 12 November (Dinis's word, relayed; the conductor, 02:33): expect no more delegated calls from them. Only transport (and flights while it runs) still call. This desk's own wake is one of five the conductor has asked Dinis about; carry on until he answers.

- **State at 06:31** (context about 160k a call): wakes 01:31 to 06:31 all ran; nothing moved after 00:43. Team spend on 12 November 0.027 of 20 USD; this desk 0.011 of 6 (no call since 00:32); delegation 0.026 of 5. Running totals: models 373 calls (0 failed), media 168 (1 failed, 41 of 60 agree), sources 105 (35 of 35), transport 85 (glosses 14 of 23). Press decisions: 40 read, 11 matched an edge, 0 leads; nothing new since.
- Transport's 9 failing glosses all say "the open models give different figures" (none a missing figure). A hypothesis, not checked: figure formatting (17h30 against 17:30). Their raw records are in transport's session, not this vault.
- `node tools/models-measure-match.mjs` rewrites `models/delegated/match-fact-measure.json` without its hand-written `note` and `reading`: when it finds nothing new, `git checkout` the file; when it does, put those two back.
- The vault had nothing new to push this session (no calls after it opened).

## Third session (22:34 to about 23:33 UTC on 11 November; written for a fourth, context about 175k a call)

- Key `incident-models-dinis-3` is published and -2 is handed over. The conductor sealed the key of `atrfw315` to it at 22:36 (this route works: ask, then `lane-handover.mjs open`). Clone the vault with the key on stdin: `sgit --token "$SG_SEND_ACCESS_TOKEN" clone - ~/.incident-raw < ~/.incident-vaults/atrfw315.key`. Then copy `~/.incident-raw/ledger/<day>.jsonl` to `~/.incident-ledger/`, or the day's totals start from zero.
- Before the vault is open, run calls with `INCIDENT_RAW_DIR=~/.incident-raw-pending` and copy those records into the vault afterwards.
- A vault push of thousands of records can take more than 400 s. Run it in the background with a longer timeout and check `sgit status` says "in sync".
- **Match-fact measured** (22:39): `node tools/models-measure-match.mjs`, written to `models/delegated/match-fact-measure.json`. Against media's first-on-each-fact (61 items): maverick 47, gemma-4-31b 44, the comparison 38. It measures recall only. Rerun it when media's list grows; it resumes.
- **Round 2 complete** (22:47, 1.37 USD). The warnings-in-force task separates the models: maverick 4 of 39, gemma-4-31b 33 of 39 (13 of 13 with reasoning on), deepseek-v4.1-flash 13 of 13. The readings are hand-written in `models/notes.json`, with `round_2_status` as the heading, and rendered by `models-report.mjs`. Do not put maverick on a task that weighs several records together.
- **The 23:31 wake:** this desk's day is 2.32 of its 6 USD and the team about 2.4 of 20. Delegated: models 313 calls (0 failed), media 78 (1 failed), sources 45, transport 51 (re-ask 0.12). Owners' checks: sources 25 of 25, media 19 of 30, transport 7 of 12, press decisions 6 matched edges and 0 leads of 30.
- Told: the journalist (through the conductor) that `journal/an-empty-account.json` e6 quotes "**Round 2 is partial.**", which now reads complete. Media's session is session_018yvwtPDTB1YzeDrWjfmTPs.
- Open: a page for /models/calls/; transport's gloss check 7 of 12 (look at which fail); run.yml with incident.ci@ once Dinis creates the runner repository.

## Where things stand (second session, from 22:01 UTC on 11 November)

- **The router** (Dinis, ~22:00 UTC, BRIEF.md: collectors through OpenRouter, open-weight models, "at least a couple").
  1. **Calls as JSON.** `tools/llm.mjs` writes one text-free record per call to `models/calls/<date>/<HH>.json`; another agent's records go to `agents/<role>/calls/`. Code: `tools/models-calls.mjs`. Rebuild the index with `node tools/models-calls.mjs --index`. `--from-ledger <date>` publishes any ledger line that has no record yet.
  2. **The delegation loop** (A2): `tools/models-delegate.mjs`, configured by `models/delegate.json`. Tasks: translate, extract-warning, extract-decision, label, match-fact. Each runs on two open-weight models plus `google/gemini-3.5-flash-lite` for comparison, labelled commercial. Answers are checked against a schema and re-asked at most twice. Flow events use fringe fields, with trace and span ids computed as flow.mjs computes them.
  3. **Collectors.** Patches are in `models/patches/` (README there) for transport, sources, media and researcher; each was tried on live data at 22:09 to 22:15 UTC. The owners apply them; none was wired at 22:17. Sent: transport-5 and media-4 directly; sources and researcher through the conductor.
- **Budget**: the team cap is 20 USD a day. Shares (`models/budgets.json`): models 6, perplexity 4, shadow 1, flights 1, and delegation 5. The delegation's 5 is 1 per wired collector, drawn on delegated calls only (task `WS-214/delegate/…`). The account had credit at 22:04 UTC: 265 credits, 168.24 used; the key had 72.40 of its 100 limit left.
- **Round 1** is complete. **Round 2** is partial; it stopped at 02:55 UTC when the account ran out of credit, and can now be finished (below).
- OpenRouter Broadcast to Elastic (Dinis ~22:10): each request carries `trace` (our trace_id, parent_span_id, generation_name = the A1 unit, span_id, agent, task), `user` (the agent) and `session_id` (the flow), so Elastic joins OpenRouter's spans to ours.
- The raw store `~/.incident-raw` is the vault `atrfw315` again (key from the conductor 22:11, opened 22:18; pushed 22:20 with `sgit --token "$SG_SEND_ACCESS_TOKEN" push`), its `ledger/` merged with this session's ledger.
- Transport applied its patch (`aa94889`, `en.source` not `by`, since `by` means the agent).
- **Each hourly wake (:31)**: `node tools/models-press-decisions.mjs --wake "hourly HH:31"`, `node tools/models-delegated.mjs` (models/delegated/summary.json), the measure line (accounts/measure.md) (the researcher's lead list, models/delegated/, at the conductor's word 22:24), then `node tools/models-calls.mjs --index`, then push the raw vault (`cd ~/.incident-raw && sgit commit -m … && sgit --token "$SG_SEND_ACCESS_TOKEN" push`, timeout 400 s).
- Wired at 22:24: transport (from 22:41), media (:36), sources (hourly); researcher's task run here. Four of four.
- Open: observability's `tools/trace.mjs` runs its CLI when imported, so our events stay in `models/calls/` until it is made import-safe (asked 22:17).

## State at 22:34 UTC (the second session's context passed 200k tokens a call; written for the third)

- Four of four collectors delegate: transport (gloss, from 22:41), media (match-fact, :36), sources (extract-warning, hourly), and the researcher's press-decision lead list run here (`tools/models-press-decisions.mjs`, `models/delegated/press-decisions.json`). At a glance: `models/delegated/summary.json` (`node tools/models-delegated.mjs`).
- At 22:31: 219 delegated calls, 1 failure (a 429 rate limit, now retried once after a pause), re-asks mostly Qwen 3.5 9B on the notice summary. Translate moved to gemma-4-31b + llama-4-maverick (22:34). The owners' checks: sources 15 of 15 agree with the parser; media 9 of 15 agree with its patterns; press decisions 3 matched edges, 0 leads.
- `models/calls/` also holds the first session's eval calls of today (4,924 lines, 02:00 to 03:00 UTC, including the 3,556 refused for credit), published from the merged vault ledger with `--from-ledger` at 22:33: text-free, parent unknown.
- Flights' summary model confirmed: meta-llama/llama-4-maverick (its 1 USD).
- Not done: measure the new match-fact task; finish round 2 of the evals (about 2 to 3 USD); a page for /models/calls/.

## What lives only in a session, and is lost with it

| Thing | Where it was | What a new session does |
|---|---|---|
| The ledger (one line per call, no prompt text) | `~/.incident-ledger/<day>.jsonl` | Starts its own. The old lines are in the vault, under `ledger/`; copy them back before running the report, or the totals start from zero |
| The raw store (every request and response) | `~/.incident-raw/`, an sgit vault, id `atrfw315`, pushed | Clones the vault with its key (below) |
| The session key | `~/.sg-send/keys/` | Makes its own (`pki-agent.mjs keygen --session`) and adds the public half to `data/keys.json`; marks the old entry `incident-models-dinis` as ended |
| The provider key | the environment (`OPEN_ROUTER_KEY` or `OPENROUTER_API_KEY`) | Checks it is set; never prints it |

## The vault key

The key of vault `atrfw315` was sealed to incident.conductor@'s public key and sent once by session message at 09:33 UTC on 11 November (`tools/lane-handover.mjs`, [SECURITY.md](../../SECURITY.md) section e). It was never printed or put in a tracked file. The conductor opened it at 09:31 UTC and holds a copy. Dinis's word since (BRIEF.md, last section): keys go to the conductor through its append lane, not by session message; that is the way for any later key, once incident.identity@ publishes the command (data/lanes.json, SECURITY.md section e).

A fresh models session gets it the same way:

1. Make your session key and push its public half to `data/keys.json`.
2. Ask incident.conductor@ by session message to seal the key of `atrfw315` to your key id: `VAULT_KEY=… node tools/lane-handover.mjs seal --to <your key id> --name "models vault"`.
3. Open what it sends: `node tools/lane-handover.mjs open '<the m1 line>'`. It writes the key to `~/.incident-vaults/atrfw315.key` (0600) and prints the vault id only.
4. Clone the vault to `~/.incident-raw` with sgit, giving the key from that file through the environment, never on the command line.

## To finish round 2 (about 2 to 3 US dollars), once there is credit

```
node tools/models-items.mjs     # only if the data room changed; item ids are stable
node tools/models-run.mjs       # resumes: asks only what has no answer yet; stops at the first out-of-credit answer
node tools/models-report.mjs    # results.json, which.json, ledger-summary.json and every page
node admin/build/build.mjs && node admin/build/validate.mjs
AGENT=incident.models@web-summit.dinis admin/tools/release.sh
```

Then commit and push the vault (`cd ~/.incident-raw && sgit commit && sgit push`), run the accountant's measure step ([accounts/measure.md](../../accounts/measure.md)), and tell the conductor the spend.

## Things learnt the hard way

- A call the provider refuses is not a wrong answer. At 02:38 UTC five refused calls were counted as wrong and a finding was published from them; it was corrected at 02:59. The runner now drops refused calls and stops.
- `agents/models/README.md` belongs to incident.observability@ (this desk's home page). This desk's own notes are [ask.md](ask.md), this file and `status.json`.
- `data/keys.json` is shared and changes often: rebase before adding a key.
- No name of the model this desk itself runs on in anything pushed; the models under test are named because they are the subject.
