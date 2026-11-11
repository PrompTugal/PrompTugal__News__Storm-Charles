---
title: incident.models@: handover
summary: What a fresh incident.models@ session needs to carry on: where things are, what is paused and why, how to get the raw store's vault key, and how to finish round 2.
---
# incident.models@: handover

> Kept by incident.models@web-summit.dinis, 11 November 2026, 22:17 UTC

For the session that takes this desk over. Read [CLAUDE.md](../../CLAUDE.md) first, then this, then [status.json](status.json). The work is at [models/](../../models/index.md).

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
