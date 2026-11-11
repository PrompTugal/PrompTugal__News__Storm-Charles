---
title: Models: label fact, evidence, hypothesis
summary: 20 items from the data room, 15 models: every item, the answer it is scored against, and each model's answer marked right or wrong.
mount: <div id="models" data-view="task" data-task="label" data-base="./"><p class="meta">The chart is drawn in the browser from <a href="results.json">results.json</a>; the same figures are in the table below.</p></div>
head: <link rel="stylesheet" href="../app/models/models.css"><script src="../app/models/models.js" defer></script>
---

# Label fact, evidence, hypothesis

> Kept by incident.models@web-summit.dinis, 11 November 2026, 02:41 UTC

**Not a warning service: for warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). Nothing here is a forecast or advice.** Part of [Other models, measured](index.md).

Label a row of our timeline as fact, evidence or hypothesis by this site's rules. The input is the row's text with its leading marker removed (rows start 'signal:' or 'analysis (...)': that would give the answer away) and its source labels. The gold is the row's label in signals.json, which tools/timeline.mjs derives from the lead's markers. Rows that quote the press or point at a private person's post are left out.

Scoring: exact. Run 2026-11-11 02:38 UTC. Source for every figure on this page: [results.json](results.json) (made 2026-11-11 02:41 UTC from the runs below) and [ledger-summary.json](ledger-summary.json).

## The instruction

The same for every model (the item follows it as the user's message):

```
You label one row of an incident timeline kept by a small newsroom team about Storm Charles. Answer with one JSON object and nothing else: no explanation, no code fence.
Key: "label", one of fact, evidence, hypothesis.
The rules:
- fact: read by the team, or by a named desk, on the primary source (the channel of the body that decides, warns or measures); or the team's own record of what it did or checked.
- evidence: reported by others (the press, a social post, a relay such as a watcher who passes on what a third party published); it carries its source and is true until a primary source says otherwise.
- hypothesis: the team's own analysis or reading (a likely window, a comparison, a conclusion drawn from several sources), with its reasons; never stated as fact.
```

## The table

| Model | Kind | Right | `label` | Malformed | Cut off | Refused | Errors | Cost per item, USD | Median latency, s | p90, s |
|---|---|---|---|---|---|---|---|---|---|---|
| `google/gemma-3-4b-it` | open-weight, small | **8/20** | 8 | 0 | 0 | 0 | 0 | 0.000012 | 0.7 | 1.1 |
| `openai/gpt-oss-20b` | open-weight, small | **15/20** | 15 | 0 | 0 | 0 | 0 | 0.000065 | 1.8 | 5.1 |
| `mistralai/ministral-8b-2512` | open-weight, small | **14/20** | 14 | 0 | 0 | 0 | 0 | 0.000035 | 0.5 | 0.8 |
| `qwen/qwen3.5-9b` | open-weight, small | **12/20** | 12 | 1 | 5 | 0 | 0 | 0.00040 | 26.0 | 51.2 |
| `qwen/qwen3.5-9b#reasoning-off` | open-weight, small | **10/20** | 10 | 0 | 0 | 0 | 0 | 0.000027 | 0.6 | 10.7 |
| `google/gemma-4-31b-it` | open-weight, large | **17/20** | 17 | 0 | 0 | 0 | 0 | 0.000034 | 0.4 | 0.6 |
| `meta-llama/llama-4-maverick` | open-weight, large | **17/20** | 17 | 0 | 0 | 0 | 0 | 0.000079 | 0.5 | 0.6 |
| `deepseek/deepseek-v4.1-flash` | open-weight, large | **17/20** | 17 | 0 | 1 | 0 | 0 | 0.00076 | 3.0 | 22.8 |
| `qwen/qwen3.5-397b-a17b` | open-weight, large | **16/20** | 16 | 1 | 1 | 0 | 0 | 0.00471 | 11.4 | 44.8 |
| `qwen/qwen3.5-397b-a17b#reasoning-off` | open-weight, large | **12/20** | 12 | 0 | 0 | 0 | 5 | 0.00010 | 1.1 | 1.3 |
| `mistralai/mistral-large-4-0` | open-weight, large | **17/20** | 17 | 0 | 1 | 0 | 0 | 0.00333 | 5.6 | 19.2 |
| `openai/gpt-6-luna` | commercial, small | **16/20** | 16 | 0 | 0 | 0 | 0 | 0.000074 | 2.1 | 4.0 |
| `google/gemini-3.5-flash-lite` | commercial, small | **17/20** | 17 | 0 | 0 | 0 | 0 | 0.00010 | 0.7 | 0.9 |
| `anthropic/claude-haiku-5.5` | commercial, small | **15/20** | 15 | 0 | 0 | 0 | 0 | 0.00011 | 1.0 | 2.2 |
| `openai/gpt-6.1-terra` | commercial, large | **16/20** | 16 | 0 | 0 | 0 | 0 | 0.00075 | 2.8 | 4.8 |

**Reading (ours, a hypothesis):** No model passed 17 of 20, and the misses are mostly the same rows for every model, which points at our labels as much as at the models. Two rows the lead marks 'analysis' (so: hypothesis) are counts made by incident.media@ from its own dataset (who published when; that no title had reported a change by a given time): 13 of 13 and 11 of 13 models call them fact or evidence. One team row ('No further statement from Web Summit', from a watcher's sweep) split the models three ways. The clear rows (IPMA's own data; a forecast-like reading by the meteorologist; a press report relayed by a watcher) were labelled right by nearly every model above the smallest. The smallest model (4 billion parameters) got 8 of 20: not usable for this.

## A question for Dinis: do our three labels lack a fourth, "our measurement"?

*asked by incident.conductor@web-summit.dinis (its message of 02:38 UTC), from this page's results; written up by incident.models@.*

The lead keeps the three labels below as they are: by our rule, anything that is our own analysis is a hypothesis. The models were given that rule and still read these rows differently, and the way they differ is the finding. Two of the rows are counts incident.media@ made from sources we hold (who published when; that no article title had reported a change by a given time). The third is an absence we observed (no further statement found in a sweep). None is an opinion or a forecast-like reading: each can be recomputed from the dataset it names and would come out the same. Our labels have fact (read at the body that decides, warns or measures), evidence (reported by others) and hypothesis (our reasoning, with its reasons). A count we made ourselves sits in none of them comfortably: it is not the primary source's statement, not someone else's report, and not a judgement. A fourth kind, "our measurement" (we counted or computed it from sources we hold; reproducible; with its limits stated), would let a reader tell the meteorologist's 'the centre most likely passes just south of Lisbon' from the media desk's '87 of 212 items carry Lusa's by-line'. Today both wear the same word. No row has been relabelled.

| Row | Our label | What the models said | The row |
|---|---|---|---|
| [s-1110T2358](../incidents/2026-11-10-storm-charles/timeline.md#s-1110T2358) | hypothesis | evidence 8, fact 7 (of 15) | the press on Day 2 after Web Summit's 19:09 page: ECO and TEK 19:41 (32 min later), DN 19:49, Lusa via Notícias ao Minuto 20:01, Observador 20:08, Euronews 20:2… |
| [s-1111T0015](../incidents/2026-11-10-storm-charles/timeline.md#s-1111T0015) | hypothesis | fact 11, hypothesis 2, evidence 1, no answer 1 (of 15) | IPMA's move of Lisbon's red rain to 09:00 (sent 21:23) had not been reported by any article title or live-blog entry we could read by 00:15. Limits: matched by … |
| [s-1110T2153](../incidents/2026-11-10-storm-charles/timeline.md#s-1110T2153) | fact | evidence 5, hypothesis 4, fact 3, no answer 3 (of 15) | No further statement from Web Summit (social.watch@'s sweep 4); still open: Wednesday's talks, the PITCH semi-final (when it was set is in conflict: Wednesday 1… |

## Item by item

| Item | Right | gemma-3-4b-it | gpt-oss-20b | ministral-8b-2512 | qwen3.5-9b | qwen3.5-9b#reasoning-off | gemma-4-31b-it | llama-4-maverick | deepseek-v4.1-flash | qwen3.5-397b-a17b | qwen3.5-397b-a17b#reasoning-off | mistral-large-4-0 | gpt-6-luna | gemini-3.5-flash-lite | claude-haiku-5.5 | gpt-6.1-terra |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [s-1110T1753](#s-1110t1753) | 14/15 | **no** | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [s-1110T1825](#s-1110t1825) | 13/15 | **no** | right | **no** | right | right | right | right | right | right | right | right | right | right | right | right |
| [s-1110T1905b](#s-1110t1905b) | 14/15 | right | **no** | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [s-1110T1941](#s-1110t1941) | 14/15 | **no** | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [s-1110T1945](#s-1110t1945) | 13/15 | **no** | right | **no** | right | right | right | right | right | right | right | right | right | right | right | right |
| [s-1110T1952](#s-1110t1952) | 13/15 | **no** | right | right | right | **no** | right | right | right | right | right | right | right | right | right | right |
| [s-1110T2008](#s-1110t2008) | 13/15 | **no** | right | right | right | right | right | right | right | right | **no** | right | right | right | right | right |
| [s-1110T2030](#s-1110t2030) | 12/15 | **no** | right | right | right | right | right | right | right | **no** | **no** | right | right | right | right | right |
| [s-1110T2115](#s-1110t2115) | 10/15 | right | right | right | **no** | **no** | right | right | right | right | right | right | **no** | right | **no** | **no** |
| [s-1110T2118](#s-1110t2118) | 9/15 | **no** | **no** | right | **no** | **no** | right | **no** | right | right | right | right | right | **no** | right | right |
| [s-1110T2132](#s-1110t2132) | 11/15 | right | right | **no** | **no** | **no** | right | right | right | right | **no** | right | right | right | right | right |
| [s-1110T2153](#s-1110t2153) | 3/15 | **no** | right | **no** | **no** | **no** | **no** | right | right | **no** | **no** | **no** | **no** | **no** | **no** | **no** |
| [s-1110T2323](#s-1110t2323) | 10/15 | right | right | right | **no** | **no** | right | right | **no** | right | right | right | right | right | **no** | **no** |
| [s-1110T2324](#s-1110t2324) | 15/15 | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [s-1110T2353](#s-1110t2353) | 15/15 | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [s-1110T2354](#s-1110t2354) | 10/15 | **no** | **no** | right | **no** | **no** | right | right | right | right | **no** | right | right | right | right | right |
| [s-1110T2358](#s-1110t2358) | 0/15 | **no** | **no** | **no** | **no** | **no** | **no** | **no** | **no** | **no** | **no** | **no** | **no** | **no** | **no** | **no** |
| [s-1111T0000](#s-1111t0000) | 14/15 | right | right | right | right | right | right | right | right | right | **no** | right | right | right | right | right |
| [s-1111T0015](#s-1111t0015) | 2/15 | **no** | **no** | **no** | **no** | **no** | **no** | **no** | **no** | **no** | **no** | **no** | **no** | right | **no** | right |
| [s-1111T0146](#s-1111t0146) | 14/15 | right | right | right | right | **no** | right | right | right | right | right | right | right | right | right | right |

### s-1110T1753

```
the government recommends suspending Web Summit on Wednesday; the decision rests with the organisers
Source(s): Jornal de Negócios, live ; via social.watch@PrompTugal.dinis
```

Scored against: `{"label":"evidence"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T1753 (label)`. The row: [s-1110T1753](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1753).

| Model | Answer | Result |
|---|---|---|
| `gemma-3-4b-it` | fact | **wrong** (label) |
| `gpt-oss-20b` | evidence | right |
| `ministral-8b-2512` | evidence | right |
| `qwen3.5-9b` | evidence | right |
| `qwen3.5-9b#reasoning-off` | evidence | right |
| `gemma-4-31b-it` | evidence | right |
| `llama-4-maverick` | evidence | right |
| `deepseek-v4.1-flash` | evidence | right |
| `qwen3.5-397b-a17b` | evidence | right |
| `qwen3.5-397b-a17b#reasoning-off` | evidence | right |
| `mistral-large-4-0` | evidence | right |
| `gpt-6-luna` | evidence | right |
| `gemini-3.5-flash-lite` | evidence | right |
| `claude-haiku-5.5` | evidence | right |
| `gpt-6.1-terra` | evidence | right |

### s-1110T1825

```
no organiser statement after the government's recommendation (the live blog's last update read)
Source(s): Jornal de Negócios, live ; via social.watch@PrompTugal.dinis
```

Scored against: `{"label":"evidence"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T1825 (label)`. The row: [s-1110T1825](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1825).

| Model | Answer | Result |
|---|---|---|
| `gemma-3-4b-it` | hypothesis | **wrong** (label) |
| `gpt-oss-20b` | evidence | right |
| `ministral-8b-2512` | fact | **wrong** (label) |
| `qwen3.5-9b` | evidence | right |
| `qwen3.5-9b#reasoning-off` | evidence | right |
| `gemma-4-31b-it` | evidence | right |
| `llama-4-maverick` | evidence | right |
| `deepseek-v4.1-flash` | evidence | right |
| `qwen3.5-397b-a17b` | evidence | right |
| `qwen3.5-397b-a17b#reasoning-off` | evidence | right |
| `mistral-large-4-0` | evidence | right |
| `gpt-6-luna` | evidence | right |
| `gemini-3.5-flash-lite` | evidence | right |
| `claude-haiku-5.5` | evidence | right |
| `gpt-6.1-terra` | evidence | right |

### s-1110T1905b

```
worst window Wed 12:00 to 18:00, peak most likely ~15:00 to 19:00 around the wind's swing to north-west, easing but dangerous to 21:00; red wind was known ~27.5 h ahead; confidence medium on the window, low on the peak
Source(s): data/weather/analysis.md (from IPMA warnings, communiqué no. 2, LPPT TAF, IPMA model, read 19:01)
```

Scored against: `{"label":"hypothesis"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T1905b (label)`. The row: [s-1110T1905b](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1905b).

| Model | Answer | Result |
|---|---|---|
| `gemma-3-4b-it` | hypothesis | right |
| `gpt-oss-20b` | fact | **wrong** (label) |
| `ministral-8b-2512` | hypothesis | right |
| `qwen3.5-9b` | hypothesis | right |
| `qwen3.5-9b#reasoning-off` | hypothesis | right |
| `gemma-4-31b-it` | hypothesis | right |
| `llama-4-maverick` | hypothesis | right |
| `deepseek-v4.1-flash` | hypothesis | right |
| `qwen3.5-397b-a17b` | hypothesis | right |
| `qwen3.5-397b-a17b#reasoning-off` | hypothesis | right |
| `mistral-large-4-0` | hypothesis | right |
| `gpt-6-luna` | hypothesis | right |
| `gemini-3.5-flash-lite` | hypothesis | right |
| `claude-haiku-5.5` | hypothesis | right |
| `gpt-6.1-terra` | hypothesis | right |

### s-1110T1941

```
Web Summit closed on Wednesday after talks with the government, ANEPC and PSP; the mayor calls it the most sensible decision
Source(s): ECO ; via social.watch@PrompTugal.dinis (sweep 2)
```

Scored against: `{"label":"evidence"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T1941 (label)`. The row: [s-1110T1941](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1941).

| Model | Answer | Result |
|---|---|---|
| `gemma-3-4b-it` | fact | **wrong** (label) |
| `gpt-oss-20b` | evidence | right |
| `ministral-8b-2512` | evidence | right |
| `qwen3.5-9b` | evidence | right |
| `qwen3.5-9b#reasoning-off` | evidence | right |
| `gemma-4-31b-it` | evidence | right |
| `llama-4-maverick` | evidence | right |
| `deepseek-v4.1-flash` | evidence | right |
| `qwen3.5-397b-a17b` | evidence | right |
| `qwen3.5-397b-a17b#reasoning-off` | evidence | right |
| `mistral-large-4-0` | evidence | right |
| `gpt-6-luna` | evidence | right |
| `gemini-3.5-flash-lite` | evidence | right |
| `claude-haiku-5.5` | evidence | right |
| `gpt-6.1-terra` | evidence | right |

### s-1110T1945

```
organisers cancel all of Wednesday's activities (coastal flooding, wind on outdoor structures, transport), after coordinating with the authorities
Source(s): Diário de Notícias, live ; via social.watch@PrompTugal.dinis (sweep 2)
```

Scored against: `{"label":"evidence"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T1945 (label)`. The row: [s-1110T1945](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1945).

| Model | Answer | Result |
|---|---|---|
| `gemma-3-4b-it` | fact | **wrong** (label) |
| `gpt-oss-20b` | evidence | right |
| `ministral-8b-2512` | fact | **wrong** (label) |
| `qwen3.5-9b` | evidence | right |
| `qwen3.5-9b#reasoning-off` | evidence | right |
| `gemma-4-31b-it` | evidence | right |
| `llama-4-maverick` | evidence | right |
| `deepseek-v4.1-flash` | evidence | right |
| `qwen3.5-397b-a17b` | evidence | right |
| `qwen3.5-397b-a17b#reasoning-off` | evidence | right |
| `mistral-large-4-0` | evidence | right |
| `gpt-6-luna` | evidence | right |
| `gemini-3.5-flash-lite` | evidence | right |
| `claude-haiku-5.5` | evidence | right |
| `gpt-6.1-terra` | evidence | right |

### s-1110T1952

```
Checked by the lead: websummit.com home and news list carry no notice of Day 2 (the notice was already up at /blog/web-summit/ since 19:09, a path we did not check)
Source(s): websummit.com, read 19:52 by incident.conductor@
```

Scored against: `{"label":"fact"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T1952 (label)`. The row: [s-1110T1952](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1952).

| Model | Answer | Result |
|---|---|---|
| `gemma-3-4b-it` | evidence | **wrong** (label) |
| `gpt-oss-20b` | fact | right |
| `ministral-8b-2512` | fact | right |
| `qwen3.5-9b` | fact | right |
| `qwen3.5-9b#reasoning-off` | evidence | **wrong** (label) |
| `gemma-4-31b-it` | fact | right |
| `llama-4-maverick` | fact | right |
| `deepseek-v4.1-flash` | fact | right |
| `qwen3.5-397b-a17b` | fact | right |
| `qwen3.5-397b-a17b#reasoning-off` | fact | right |
| `mistral-large-4-0` | fact | right |
| `gpt-6-luna` | fact | right |
| `gemini-3.5-flash-lite` | fact | right |
| `claude-haiku-5.5` | fact | right |
| `gpt-6.1-terra` | fact | right |

### s-1110T2008

```
organisers will contact those affected directly; not said whether Wednesday's programme is cancelled or moved (N6 still open)
Source(s): Observador ; via social.watch@ (sweep 3)
```

Scored against: `{"label":"evidence"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T2008 (label)`. The row: [s-1110T2008](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T2008).

| Model | Answer | Result |
|---|---|---|
| `gemma-3-4b-it` | hypothesis | **wrong** (label) |
| `gpt-oss-20b` | evidence | right |
| `ministral-8b-2512` | evidence | right |
| `qwen3.5-9b` | evidence | right |
| `qwen3.5-9b#reasoning-off` | evidence | right |
| `gemma-4-31b-it` | evidence | right |
| `llama-4-maverick` | evidence | right |
| `deepseek-v4.1-flash` | evidence | right |
| `qwen3.5-397b-a17b` | evidence | right |
| `qwen3.5-397b-a17b#reasoning-off` | (error) This request requires more credits, or fewer max_tokens. You requested up to 4000 tokens, but can only afford 3675. To increase, visit https://openrouter.ai/wor | **error** |
| `mistral-large-4-0` | evidence | right |
| `gpt-6-luna` | evidence | right |
| `gemini-3.5-flash-lite` | evidence | right |
| `claude-haiku-5.5` | evidence | right |
| `gpt-6.1-terra` | evidence | right |

### s-1110T2030

```
the cancellation in the international press (PT and EN); coast and riverside access prohibited Wednesday; nothing on refunds or PITCH
Source(s): Euronews EN ; PT ; via social.watch@ (sweep 3)
```

Scored against: `{"label":"evidence"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T2030 (label)`. The row: [s-1110T2030](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T2030).

| Model | Answer | Result |
|---|---|---|
| `gemma-3-4b-it` | fact | **wrong** (label) |
| `gpt-oss-20b` | evidence | right |
| `ministral-8b-2512` | evidence | right |
| `qwen3.5-9b` | evidence | right |
| `qwen3.5-9b#reasoning-off` | evidence | right |
| `gemma-4-31b-it` | evidence | right |
| `llama-4-maverick` | evidence | right |
| `deepseek-v4.1-flash` | evidence | right |
| `qwen3.5-397b-a17b` |  | **malformed** |
| `qwen3.5-397b-a17b#reasoning-off` | (error) This request requires more credits, or fewer max_tokens. You requested up to 4000 tokens, but can only afford 3675. To increase, visit https://openrouter.ai/wor | **error** |
| `mistral-large-4-0` | evidence | right |
| `gpt-6-luna` | evidence | right |
| `gemini-3.5-flash-lite` | evidence | right |
| `claude-haiku-5.5` | evidence | right |
| `gpt-6.1-terra` | evidence | right |

### s-1110T2115

```
The incident moves to its own site: https://storm-charles.promptugal.news (this repository); first push to served 23 s (v0.1.2), against 3 to 10 minutes on web-summit.sgit.ai
Source(s): incident.conductor@, at Dinis's word
```

Scored against: `{"label":"fact"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T2115 (label)`. The row: [s-1110T2115](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T2115).

| Model | Answer | Result |
|---|---|---|
| `gemma-3-4b-it` | fact | right |
| `gpt-oss-20b` | fact | right |
| `ministral-8b-2512` | fact | right |
| `qwen3.5-9b` |  | **cut off** |
| `qwen3.5-9b#reasoning-off` | evidence | **wrong** (label) |
| `gemma-4-31b-it` | fact | right |
| `llama-4-maverick` | fact | right |
| `deepseek-v4.1-flash` | fact | right |
| `qwen3.5-397b-a17b` | fact | right |
| `qwen3.5-397b-a17b#reasoning-off` | fact | right |
| `mistral-large-4-0` | fact | right |
| `gpt-6-luna` | evidence | **wrong** (label) |
| `gemini-3.5-flash-lite` | fact | right |
| `claude-haiku-5.5` | evidence | **wrong** (label) |
| `gpt-6.1-terra` | evidence | **wrong** (label) |

### s-1110T2118

```
IPMA's hourly model changed its values (same 07:55 stamp): Wednesday's strongest mean wind now 23 km/h at 20:00 (was 49 at 18:00); the swing to north 18:00; peak most likely 17:00 to 20:00 (was 15:00 to 19:00); worst window 12:00 to 18:00 and end 21:00 unchanged; IPMA's red warnings unchanged and outrank one model
Source(s): data/weather/analysis.md section 4 (1b936db20)
```

Scored against: `{"label":"hypothesis"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T2118 (label)`. The row: [s-1110T2118](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T2118).

| Model | Answer | Result |
|---|---|---|
| `gemma-3-4b-it` | fact | **wrong** (label) |
| `gpt-oss-20b` | fact | **wrong** (label) |
| `ministral-8b-2512` | hypothesis | right |
| `qwen3.5-9b` |  | **cut off** |
| `qwen3.5-9b#reasoning-off` | evidence | **wrong** (label) |
| `gemma-4-31b-it` | hypothesis | right |
| `llama-4-maverick` | fact | **wrong** (label) |
| `deepseek-v4.1-flash` | hypothesis | right |
| `qwen3.5-397b-a17b` | hypothesis | right |
| `qwen3.5-397b-a17b#reasoning-off` | hypothesis | right |
| `mistral-large-4-0` | hypothesis | right |
| `gpt-6-luna` | hypothesis | right |
| `gemini-3.5-flash-lite` | fact | **wrong** (label) |
| `claude-haiku-5.5` | hypothesis | right |
| `gpt-6.1-terra` | hypothesis | right |

### s-1110T2132

```
Web Summit's blog listing shows the update post modified 20:06; its text unchanged on Day 2 and Day 3 ("aims to proceed")
Source(s): websummit.com, incident.dev@'s 2-min watch (data/watch/websummit.json)
```

Scored against: `{"label":"fact"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T2132 (label)`. The row: [s-1110T2132](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T2132).

| Model | Answer | Result |
|---|---|---|
| `gemma-3-4b-it` | fact | right |
| `gpt-oss-20b` | fact | right |
| `ministral-8b-2512` | evidence | **wrong** (label) |
| `qwen3.5-9b` |  | **cut off** |
| `qwen3.5-9b#reasoning-off` | evidence | **wrong** (label) |
| `gemma-4-31b-it` | fact | right |
| `llama-4-maverick` | fact | right |
| `deepseek-v4.1-flash` | fact | right |
| `qwen3.5-397b-a17b` | fact | right |
| `qwen3.5-397b-a17b#reasoning-off` | evidence | **wrong** (label) |
| `mistral-large-4-0` | fact | right |
| `gpt-6-luna` | fact | right |
| `gemini-3.5-flash-lite` | fact | right |
| `claude-haiku-5.5` | fact | right |
| `gpt-6.1-terra` | fact | right |

### s-1110T2153

```
No further statement from Web Summit (social.watch@'s sweep 4); still open: Wednesday's talks, the PITCH semi-final (when it was set is in conflict: Wednesday 17:00 in social.watch@'s summary, unsourced there; Thursday in Tech Times' preview of 9 Nov), side events (Web Summit's own Night Summit still listed for Wednesday 18:00 to 00:00, no notice, 22:05), tickets
Source(s): social.watch@PrompTugal.dinis, sweep 4 (21:51 to 21:53); incident.researcher@ (22:05)
```

Scored against: `{"label":"fact"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T2153 (label)`. The row: [s-1110T2153](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T2153).

| Model | Answer | Result |
|---|---|---|
| `gemma-3-4b-it` | hypothesis | **wrong** (label) |
| `gpt-oss-20b` | fact | right |
| `ministral-8b-2512` | evidence | **wrong** (label) |
| `qwen3.5-9b` |  | **cut off** |
| `qwen3.5-9b#reasoning-off` | evidence | **wrong** (label) |
| `gemma-4-31b-it` | hypothesis | **wrong** (label) |
| `llama-4-maverick` | fact | right |
| `deepseek-v4.1-flash` | fact | right |
| `qwen3.5-397b-a17b` |  | **cut off** |
| `qwen3.5-397b-a17b#reasoning-off` | evidence | **wrong** (label) |
| `mistral-large-4-0` |  | **cut off** |
| `gpt-6-luna` | hypothesis | **wrong** (label) |
| `gemini-3.5-flash-lite` | hypothesis | **wrong** (label) |
| `claude-haiku-5.5` | evidence | **wrong** (label) |
| `gpt-6.1-terra` | evidence | **wrong** (label) |

### s-1110T2323

```
The first airport TAF covering Thursday (issued 23:00) is weaker than 17:00's: Wed 09:00 to 16:00 at times 30 kt gusting 45 (83 km/h); 30% chance (was 40%) of 58 kt thunderstorm gusts 10:00 to 18:00; west 12 kt from 18:00 to 20:00; Thursday 00:00 to 06:00 west 12 kt, no gusts. IPMA's red warnings unchanged
Source(s): LPPT TAF (IPMA, via NOAA's Aviation Weather), data/weather/airport.json (incident.meteorologist@, a63ac9696)
```

Scored against: `{"label":"fact"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T2323 (label)`. The row: [s-1110T2323](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T2323).

| Model | Answer | Result |
|---|---|---|
| `gemma-3-4b-it` | fact | right |
| `gpt-oss-20b` | fact | right |
| `ministral-8b-2512` | fact | right |
| `qwen3.5-9b` |  | **cut off** |
| `qwen3.5-9b#reasoning-off` | evidence | **wrong** (label) |
| `gemma-4-31b-it` | fact | right |
| `llama-4-maverick` | fact | right |
| `deepseek-v4.1-flash` |  | **cut off** |
| `qwen3.5-397b-a17b` | fact | right |
| `qwen3.5-397b-a17b#reasoning-off` | fact | right |
| `mistral-large-4-0` | fact | right |
| `gpt-6-luna` | fact | right |
| `gemini-3.5-flash-lite` | fact | right |
| `claude-haiku-5.5` | evidence | **wrong** (label) |
| `gpt-6.1-terra` | hypothesis | **wrong** (label) |

### s-1110T2324

```
the TAF's peak (09:00 to 16:00) and IPMA's model peak (19:00 to 20:00) disagree, so the peak is widened back to 12:00 to 18:00; end 21:00; Thursday morning behind the storm, medium confidence; a weaker airport forecast is not a downgrade of IPMA's warning
Source(s): data/weather/analysis.md section 5
```

Scored against: `{"label":"hypothesis"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T2324 (label)`. The row: [s-1110T2324](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T2324).

| Model | Answer | Result |
|---|---|---|
| `gemma-3-4b-it` | hypothesis | right |
| `gpt-oss-20b` | hypothesis | right |
| `ministral-8b-2512` | hypothesis | right |
| `qwen3.5-9b` | hypothesis | right |
| `qwen3.5-9b#reasoning-off` | hypothesis | right |
| `gemma-4-31b-it` | hypothesis | right |
| `llama-4-maverick` | hypothesis | right |
| `deepseek-v4.1-flash` | hypothesis | right |
| `qwen3.5-397b-a17b` | hypothesis | right |
| `qwen3.5-397b-a17b#reasoning-off` | hypothesis | right |
| `mistral-large-4-0` | hypothesis | right |
| `gpt-6-luna` | hypothesis | right |
| `gemini-3.5-flash-lite` | hypothesis | right |
| `claude-haiku-5.5` | hypothesis | right |
| `gpt-6.1-terra` | hypothesis | right |

### s-1110T2353

```
IPMA moved Lisbon's red rain warning three hours earlier: Wednesday 09:00 to 18:00 (was 12:00 to 18:00; supersedes s-1110T1742); orange rain now 00:00 to 09:00; red wind unchanged (12:00 to 21:00). IPMA sent the change at 21:23 (its CAP message); its open-data feed showed it only from the 23:51 read
Source(s): IPMA warnings open data ; read at source by the lead 23:53; MeteoAlarm's CAP feed (data/weather/cap.json, incident.meteorologist@, 169445ff3)
```

Scored against: `{"label":"fact"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T2353 (label)`. The row: [s-1110T2353](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T2353).

| Model | Answer | Result |
|---|---|---|
| `gemma-3-4b-it` | fact | right |
| `gpt-oss-20b` | fact | right |
| `ministral-8b-2512` | fact | right |
| `qwen3.5-9b` | fact | right |
| `qwen3.5-9b#reasoning-off` | fact | right |
| `gemma-4-31b-it` | fact | right |
| `llama-4-maverick` | fact | right |
| `deepseek-v4.1-flash` | fact | right |
| `qwen3.5-397b-a17b` | fact | right |
| `qwen3.5-397b-a17b#reasoning-off` | fact | right |
| `mistral-large-4-0` | fact | right |
| `gpt-6-luna` | fact | right |
| `gemini-3.5-flash-lite` | fact | right |
| `claude-haiku-5.5` | fact | right |
| `gpt-6.1-terra` | fact | right |

### s-1110T2354

```
worst window now 09:00 to 18:00, the core 12:00 to 18:00 when both reds overlap; over by 21:00. From IPMA's own issue times (CAP): red wind was sent Tue 07:18 (not 08:31 as the press had it): 28.7 h ahead; red rain 19.5 h; the move to 09:00, 11.6 h
Source(s): data/weather/analysis.md section 6
```

Scored against: `{"label":"hypothesis"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T2354 (label)`. The row: [s-1110T2354](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T2354).

| Model | Answer | Result |
|---|---|---|
| `gemma-3-4b-it` | fact | **wrong** (label) |
| `gpt-oss-20b` | fact | **wrong** (label) |
| `ministral-8b-2512` | hypothesis | right |
| `qwen3.5-9b` |  | **malformed** |
| `qwen3.5-9b#reasoning-off` | evidence | **wrong** (label) |
| `gemma-4-31b-it` | hypothesis | right |
| `llama-4-maverick` | hypothesis | right |
| `deepseek-v4.1-flash` | hypothesis | right |
| `qwen3.5-397b-a17b` | hypothesis | right |
| `qwen3.5-397b-a17b#reasoning-off` | (error) This request requires more credits, or fewer max_tokens. You requested up to 4000 tokens, but can only afford 3675. To increase, visit https://openrouter.ai/wor | **error** |
| `mistral-large-4-0` | hypothesis | right |
| `gpt-6-luna` | hypothesis | right |
| `gemini-3.5-flash-lite` | hypothesis | right |
| `claude-haiku-5.5` | hypothesis | right |
| `gpt-6.1-terra` | hypothesis | right |

### s-1110T2358

```
the press on Day 2 after Web Summit's 19:09 page: ECO and TEK 19:41 (32 min later), DN 19:49, Lusa via Notícias ao Minuto 20:01, Observador 20:08, Euronews 20:29, Expresso 20:39; Web Summit's Bluesky still silent on Day 2 at 23:51; 87 of 212 press items read carry Lusa's by-line, across 6 outlets. Limits: six outlets refuse automated reads and are absent, not silent
Source(s): research/media/coverage.json, ranking.md (incident.media@, 96ff00c)
```

Scored against: `{"label":"hypothesis"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T2358 (label)`. The row: [s-1110T2358](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T2358).

| Model | Answer | Result |
|---|---|---|
| `gemma-3-4b-it` | evidence | **wrong** (label) |
| `gpt-oss-20b` | evidence | **wrong** (label) |
| `ministral-8b-2512` | evidence | **wrong** (label) |
| `qwen3.5-9b` | evidence | **wrong** (label) |
| `qwen3.5-9b#reasoning-off` | evidence | **wrong** (label) |
| `gemma-4-31b-it` | fact | **wrong** (label) |
| `llama-4-maverick` | fact | **wrong** (label) |
| `deepseek-v4.1-flash` | evidence | **wrong** (label) |
| `qwen3.5-397b-a17b` | fact | **wrong** (label) |
| `qwen3.5-397b-a17b#reasoning-off` | evidence | **wrong** (label) |
| `mistral-large-4-0` | fact | **wrong** (label) |
| `gpt-6-luna` | fact | **wrong** (label) |
| `gemini-3.5-flash-lite` | fact | **wrong** (label) |
| `claude-haiku-5.5` | evidence | **wrong** (label) |
| `gpt-6.1-terra` | fact | **wrong** (label) |

### s-1111T0000

```
the official and model data are consistent with the centre passing very close to Lisbon at about 17:00 to 18:00 Wednesday, more likely just south of it (met.no's pressure minimum 986.7 hPa at 17:00 to 18:00 and a 160° wind swing in an hour; the guidance has moved). Against: IPMA's red wind unchanged, its track text already includes Lisbon, no communiqué no. 3, point models move. It does not lower the danger: the worst moves toward the passage, about 16:00 to 19:00, and a lull near the centre is not the end. Wednesday tests it: wind backing east then north and pressure near 987 hPa means it passed south
Source(s): data/weather/analysis.md section 7 (d6e8aace1)
```

Scored against: `{"label":"hypothesis"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1111T0000 (label)`. The row: [s-1111T0000](../incidents/2026-11-10-storm-charles/timeline.html#s-1111T0000).

| Model | Answer | Result |
|---|---|---|
| `gemma-3-4b-it` | hypothesis | right |
| `gpt-oss-20b` | hypothesis | right |
| `ministral-8b-2512` | hypothesis | right |
| `qwen3.5-9b` | hypothesis | right |
| `qwen3.5-9b#reasoning-off` | hypothesis | right |
| `gemma-4-31b-it` | hypothesis | right |
| `llama-4-maverick` | hypothesis | right |
| `deepseek-v4.1-flash` | hypothesis | right |
| `qwen3.5-397b-a17b` | hypothesis | right |
| `qwen3.5-397b-a17b#reasoning-off` | (error) This request requires more credits, or fewer max_tokens. You requested up to 4000 tokens, but can only afford 2704. To increase, visit https://openrouter.ai/wor | **error** |
| `mistral-large-4-0` | hypothesis | right |
| `gpt-6-luna` | hypothesis | right |
| `gemini-3.5-flash-lite` | hypothesis | right |
| `claude-haiku-5.5` | hypothesis | right |
| `gpt-6.1-terra` | hypothesis | right |

### s-1111T0015

```
IPMA's move of Lisbon's red rain to 09:00 (sent 21:23) had not been reported by any article title or live-blog entry we could read by 00:15. Limits: matched by title only; SIC, JN, TSF and Renascença refuse automated reads. Who was first on the other facts: red wind (IPMA 07:18): DN live 08:05; Day 2 off (19:09): ECO and TEK 19:41
Source(s): research/media/first-on-each-fact.json, ranking.md (f487bfb)
```

Scored against: `{"label":"hypothesis"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1111T0015 (label)`. The row: [s-1111T0015](../incidents/2026-11-10-storm-charles/timeline.html#s-1111T0015).

| Model | Answer | Result |
|---|---|---|
| `gemma-3-4b-it` | fact | **wrong** (label) |
| `gpt-oss-20b` | fact | **wrong** (label) |
| `ministral-8b-2512` | fact | **wrong** (label) |
| `qwen3.5-9b` | fact | **wrong** (label) |
| `qwen3.5-9b#reasoning-off` | evidence | **wrong** (label) |
| `gemma-4-31b-it` | fact | **wrong** (label) |
| `llama-4-maverick` | fact | **wrong** (label) |
| `deepseek-v4.1-flash` | fact | **wrong** (label) |
| `qwen3.5-397b-a17b` | fact | **wrong** (label) |
| `qwen3.5-397b-a17b#reasoning-off` | (error) This request requires more credits, or fewer max_tokens. You requested up to 4000 tokens, but can only afford 3245. To increase, visit https://openrouter.ai/wor | **error** |
| `mistral-large-4-0` | fact | **wrong** (label) |
| `gpt-6-luna` | fact | **wrong** (label) |
| `gemini-3.5-flash-lite` | hypothesis | right |
| `claude-haiku-5.5` | fact | **wrong** (label) |
| `gpt-6.1-terra` | hypothesis | right |

### s-1111T0146

```
Madeira, observed: 230.5 mm of rain in six hours at IPMA's station Areeiro (the hours 20:00 Tuesday to 01:00 Wednesday; 133.9 mm in the six hours to 22:00); next: Santo da Serra 124.4, Pico do Areeiro 123.9, Pico Alto 116.7 mm in six hours
Source(s): IPMA station observations ; data/weather/madeira.json (incident.meteorologist@, 8c822f847, read 01:46); prompted by pt.wikipedia's figure, verified at IPMA
```

Scored against: `{"label":"fact"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1111T0146 (label)`. The row: [s-1111T0146](../incidents/2026-11-10-storm-charles/timeline.html#s-1111T0146).

| Model | Answer | Result |
|---|---|---|
| `gemma-3-4b-it` | fact | right |
| `gpt-oss-20b` | fact | right |
| `ministral-8b-2512` | fact | right |
| `qwen3.5-9b` | fact | right |
| `qwen3.5-9b#reasoning-off` | evidence | **wrong** (label) |
| `gemma-4-31b-it` | fact | right |
| `llama-4-maverick` | fact | right |
| `deepseek-v4.1-flash` | fact | right |
| `qwen3.5-397b-a17b` | fact | right |
| `qwen3.5-397b-a17b#reasoning-off` | fact | right |
| `mistral-large-4-0` | fact | right |
| `gpt-6-luna` | fact | right |
| `gemini-3.5-flash-lite` | fact | right |
| `claude-haiku-5.5` | fact | right |
| `gpt-6.1-terra` | fact | right |
