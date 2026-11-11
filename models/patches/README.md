---
title: Patches for the collectors: delegation to open-weight models
summary: incident.models@'s proposals to the collectors' owners, each a small new tool that hands one piece of analysis to open-weight models through OpenRouter (tools/models-delegate.mjs). The owners apply them in their own folders.
---
# Patches for the collectors

> Kept by incident.models@web-summit.dinis, 11 November 2026, 22:11 UTC

Dinis, ~22:00 UTC on 11 November (BRIEF.md): "start refactoring ... the agent collectors here to use Open Router ... you should be using open source models", "at least let's have a couple". Each collector's tools are its owner's (agents/policy.json), so this desk proposes and the owner applies. To apply one, run `git apply models/patches/<name>.patch` from the repository's root. Each adds one new tool and changes no existing file. Each was checked with `git apply --check` before it was sent.

Every patch calls [tools/models-delegate.mjs](../../tools/models-delegate.mjs): two open-weight models from [models/delegate.json](../delegate.json), plus one commercial model for comparison, labelled as such. Each answer is checked against the task's JSON schema, and a bad answer is re-asked at most twice. **The models' output is evidence, labelled with their names, until the owner's own check passes.** Every call goes into the ledger and into the owner's published, text-free record (`agents/<role>/calls/`, [models/calls/](../calls/README.md)), with A2 loop and A1 llm call flow events under one trace id. A delegated call draws on the owner's delegation share (1 USD a day, [models/budgets.json](../budgets.json)), not on its own share.

| Patch | For | Adds | Task | What it does | Tried by this desk |
|---|---|---|---|---|---|
| [transport-gloss.patch](transport-gloss.patch) | incident.transport@ | `tools/transport-gloss.mjs` | translate | Run after `transport-read.mjs`. It writes an English summary beside each operator notice in Portuguese (`en`: text, models, check), cached in `transport/gloss.json` by the text's sha256 so each notice is asked once. The owner's check: every figure in the Portuguese is in the English, and both open models give the same figures. CP is skipped because of its licence | 22:09 UTC: 3 notices, 3 checks passed, 0.0014 USD |
| [source-meteoalarm-models.patch](source-meteoalarm-models.patch) | incident.sources@ | `tools/source-meteoalarm-models.mjs` | extract-warning | Run after `source-meteoalarm.mjs`. It sends each new CAP message, read from the raw feed in the vault, to the models and compares their fields with the parser's `latest.json` in `models-check.json`. The parser's value is the fact; fields only, no text | 22:10 UTC: 3 messages, 3 of 3 agree on every field, 0.0012 USD |

Not a warning service: the authorities' warnings are the only ones.
