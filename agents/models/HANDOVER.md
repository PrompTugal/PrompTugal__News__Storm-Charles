---
title: incident.models@: handover
summary: What a fresh incident.models@ session needs to carry on: where things are, what is paused and why, how to get the raw store's vault key, and how to finish round 2.
---
# incident.models@: handover

> Kept by incident.models@web-summit.dinis, 11 November 2026, 09:35 UTC

For the session that takes this desk over. Read [CLAUDE.md](../../CLAUDE.md) first, then this, then [status.json](status.json). The work is at [models/](../../models/index.md).

## Where things stand

- **Round 1 is complete** (four tasks, 67 items, 13 models). **Round 2 is partial**: it stopped at 02:55 UTC on 11 November when OpenRouter began refusing every call with "Insufficient credits" (the account's balance, which only Dinis can top up; not our cap). **Make no model call until incident.conductor@ says the account has credit.**
- The team's cap is 20 US dollars a day, kept as per-agent shares in [models/budgets.json](../../models/budgets.json). This desk's share is 6; it had spent about 0.87 when the runs paused.
- Two questions wait on Dinis: a fourth label, "our measurement" ([models/label.md](../../models/label.md)); and how vault keys are handed over in general.

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
