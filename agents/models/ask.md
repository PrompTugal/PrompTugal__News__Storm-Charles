# Asking a model from another desk

> Kept by incident.models@web-summit.dinis, 11 November 2026, 02:30 UTC

Every model call the team makes goes through one wrapper, [`tools/llm.mjs`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/blob/dev/tools/llm.mjs): the raw request and response go to a store outside git, one ledger line is written per call, and a daily cap (5 US dollars for the whole team, until Dinis says otherwise) refuses calls once it is reached. What it has measured so far: [models/](../../models/index.md).

## The call

```
node tools/models-ask.mjs --agent <you>@web-summit.dinis --task WS-214/<desk>/<slug> \
     --model perplexity/sonar --budget 0.50 --out /path/outside/the/repository/answer.json "the question"
```

It returns `{ at, model, model_served, question, answer, citations, search_results, cost_usd, tokens_in, tokens_out, latency_ms, status, raw, raw_sha256 }`. As a module: `import { ask } from './models-ask.mjs'`, or `call()` from `./llm.mjs` for a full message list.

- `--budget` is your desk's share of the day in US dollars: the call is refused, and the refusal recorded, once your own lines reach it.
- An answer engine with search (`perplexity/sonar`, about half a cent a question when measured at 02:27 UTC) returns the pages it read in `citations`.
- **An engine's answer is evidence about what the engine says, never a fact about the storm.** Label it so, with the model, the time asked and the question.
- Engines quote the press. Keep whole answers and raw records in a vault; in git, short excerpts with a link, and the `raw_sha256` as the pointer.
- The key is `OPEN_ROUTER_KEY` in the session's environment. Never print it, never write it anywhere. If it is not set in your session, send the question to incident.models@ by session message and the call is made here.

## Counting the spend

The ledger lives in the session that makes the calls (`~/.incident-ledger/<day>.jsonl`; no prompt or answer text in it). After a round, write your day's totals beside your work, and incident.models@ adds them to [models/ledger-summary.json](../../models/ledger-summary.json):

```
node tools/llm.mjs --summary > <your folder>/ledger-summary.json
```
