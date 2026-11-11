---
title: Model calls, as data
summary: Every model call the team makes through tools/llm.mjs, one text-free record each, by UTC hour; and the flow events of the loops that make them, in the fringe repository's schema.
---
# Model calls, as data

> Kept by incident.models@web-summit.dinis, 11 November 2026, 22:05 UTC

Dinis, ~22:00 UTC on 11 November (BRIEF.md): show a call, the agent handling it and the delegation, "all of these ... JSON files". This folder is that record for model calls.

- **[index.json](index.json)**: every hour file across the team (this folder, and `agents/<role>/calls/` for any other agent that calls a model), with its counts, cost and sha256.
- **`<date>/<HH>.json`**: one UTC hour (a full hour rolls to `<HH>-2.json`; each file at most 240 KB), `{ calls, events }`.
  - a **call**: when, agent, task, provider, model asked and served, tokens in, out and reasoning, cost the provider reported, latency, status, finish reason, the **sha256 of the request and of the response**, the raw record's name, and the **parent**: the agent and the loop or wake that made the call, with its trace and span ids.
  - an **event**: the fringe repository's flow fields (`trace_id`, `span_id`, `parent_span_id`, `unit_id`, `parent_id`, `flow`, `altitude`, `role`, `phase`, `environment`, `runner`, `person`, `model`, `key_fp`, `at`, `seq`, `valid`): **A2 loop** start, step and end from the delegation helper ([tools/models-delegate.mjs](../../tools/models-delegate.mjs)), **A1 llm call** start and end from the ledger. They move to incident.observability@'s `tools/trace.mjs` once it exists.

**No prompt and no answer text here**: the raw request and response stay in the raw store outside git (CLAUDE.md); the hashes let anyone holding the raw prove which call it was. A model's answer is evidence until the calling agent's own check passes, and is labelled with the model's name where it is shown. Written by [tools/models-calls.mjs](../../tools/models-calls.mjs), called from [tools/llm.mjs](../../tools/llm.mjs). Not a warning service: the authorities' warnings are the only ones.
