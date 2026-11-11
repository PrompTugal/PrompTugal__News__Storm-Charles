---
title: Patches for the collectors: delegation to open-weight models
summary: incident.models@'s proposals to the collectors' owners, each a small new tool that hands one piece of analysis to open-weight models through OpenRouter (tools/models-delegate.mjs). The owners apply them in their own folders.
---
# Patches for the collectors

> Kept by incident.models@web-summit.dinis, 11 November 2026, 22:22 UTC

Dinis, ~22:00 UTC on 11 November (BRIEF.md): "start refactoring ... the agent collectors here to use Open Router ... you should be using open source models", "at least let's have a couple". Each collector's tools are its owner's (agents/policy.json), so this desk proposes and the owner applies. To apply one, run `git apply models/patches/<name>.patch` from the repository's root. Each adds one new tool and changes no existing file. Each was checked with `git apply --check` before it was sent.

Every patch calls [tools/models-delegate.mjs](../../tools/models-delegate.mjs): two open-weight models from [models/delegate.json](../delegate.json), plus one commercial model for comparison, labelled as such. Each answer is checked against the task's JSON schema, and a bad answer is re-asked at most twice. **The models' output is evidence, labelled with their names, until the owner's own check passes.** Every call goes into the ledger and into the owner's published, text-free record (`agents/<role>/calls/`, [models/calls/](../calls/README.md)), with A2 loop and A1 llm call flow events under one trace id. A delegated call draws on the owner's delegation share (1 USD a day, [models/budgets.json](../budgets.json)), not on its own share.

| Patch | For | Adds | Task | What it does | Tried by this desk |
|---|---|---|---|---|---|
| [transport-gloss.patch](transport-gloss.patch) | incident.transport@ (**applied** `aa94889`, field `en.source`; in its round from the next wake) | `tools/transport-gloss.mjs` | translate | Run after `transport-read.mjs`. It writes an English summary beside each operator notice in Portuguese (`en`: text, models, check), cached in `transport/gloss.json` by the text's sha256 so each notice is asked once. The owner's check: every figure in the Portuguese is in the English, and both open models give the same figures. CP is skipped because of its licence | 22:09 UTC: 3 notices, 3 checks passed, 0.0014 USD |
| [source-meteoalarm-models.patch](source-meteoalarm-models.patch) | incident.sources@ | `tools/source-meteoalarm-models.mjs` | extract-warning | Run after `source-meteoalarm.mjs`. It sends each new CAP message, read from the raw feed in the vault, to the models and compares their fields with the parser's `latest.json` in `models-check.json`. The parser's value is the fact; fields only, no text | 22:10 UTC: 3 messages, 3 of 3 agree on every field, 0.0012 USD |
| [media-models-match.patch](media-models-match.patch) | incident.media@ | `research/media/models-match.mjs` | match-fact (new) | For each new headline in the newest coverage files, it asks which of `facts.json`'s 18 facts the headline reports and compares the answer with the desk's own `pattern`. Results go to `models-match.json`: ids and urls only. The pattern is the reference; a disagreement is listed for the desk and nothing is relabelled. A headline the run has already seen reuses its answer | 22:14 UTC: 8 headlines, 5 agree with the pattern, 3 differ (the desk should look at each), 0.0024 USD |
| [researcher-press-decisions.patch](researcher-press-decisions.patch) | incident.researcher@ | `incidents/…/data/decisions/tools/press-decisions.mjs` | extract-decision | Takes headlines with a decision word, sends them to the models with `graph.json`'s 39 nodes (and "none") as the deciders, and matches what the open models agree on against the edges (same decider, within 24 h or inside the effect window). Results go to `press-check.json`. An agreed decider with no edge is a **lead**, to be read on the body's own channel; a headline is never the decision | 22:15 UTC: 5 headlines (one text): the two open models disagree (ipma, none; the decider is the government), so nothing is claimed, 0.0012 USD |

The new task match-fact is in [models/delegate.json](../delegate.json). It has not been measured yet: the desk's own patterns are its reference until it is.

Not a warning service: the authorities' warnings are the only ones.
