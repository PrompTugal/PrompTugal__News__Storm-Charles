---
title: Models: label fact, evidence, hypothesis
summary: 46 items from the data room, 20 rows: every item, the answer it is scored against, and each model's answer marked right or wrong.
mount: <div id="models" data-view="task" data-task="label" data-base="./"><p class="meta">The chart is drawn in the browser from <a href="results.json">results.json</a>; the same figures are in the table below.</p></div>
head: <link rel="stylesheet" href="../app/models/models.css"><script src="../app/models/models.js" defer></script>
---

# Label fact, evidence, hypothesis

> Kept by incident.models@web-summit.dinis, 11 November 2026, 22:50 UTC

**Not a warning service: for warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). Nothing here is a forecast or advice.** Part of [Other models, measured](index.md).

Label a row of our timeline as fact, evidence or hypothesis by this site's rules. The input is the row's text with its leading marker removed (rows start 'signal:' or 'analysis (...)': that would give the answer away) and its source labels. The gold is the row's label in signals.json, which tools/timeline.mjs derives from the lead's markers. Rows that quote the press or point at a private person's post are left out.

Scoring: exact. Last run 2026-11-11 22:46 UTC. Source for every figure on this page: [results.json](results.json) (made 2026-11-11 22:50 UTC from the runs) and [ledger-summary.json](ledger-summary.json).

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

| Model, reasoning | Kind | Runs right | Items right, run by run | Changed between runs | `label` | Malformed | Cut off | Refused | Errors | Cost per item, USD | Median latency, s | p90, s |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [`google/gemma-3-4b-it`](models/google--gemma-3-4b-it.md): does not reason | open-weight, small | **70/138** | 23 to 24 of 46 (3 runs) | 3 items | 24 | 0 | 0 | 0 | 0 | 0.000015 | 0.5 | 0.9 |
| [`openai/gpt-oss-20b`](models/openai--gpt-oss-20b.md): reasons; cannot be turned off (the provider refuses the setting) | open-weight, small | **115/138** | 38 to 39 of 46 (3 runs) | 4 items | 38 | 0 | 0 | 0 | 0 | 0.000080 | 1.7 | 4.6 |
| [`mistralai/ministral-8b-2512`](models/mistralai--ministral-8b-2512.md): does not reason | open-weight, small | **110/138** | 36 to 37 of 46 (3 runs) | 3 items | 37 | 0 | 0 | 0 | 0 | 0.000031 | 0.6 | 1.2 |
| [`qwen/qwen3.5-9b#reasoning-off`](models/qwen--qwen3.5-9b.md): off (asked) | open-weight, small | **92/138** | 28 to 33 of 46 (3 runs) | 11 items | 28 | 0 | 0 | 0 | 0 | 0.000037 | 0.7 | 1.3 |
| [`qwen/qwen3.5-9b`](models/qwen--qwen3.5-9b.md): on (the provider's default) | open-weight, small | **30/46** | 30 of 46 (1 run) |  | 30 | 1 | 8 | 0 | 0 | 0.00029 | 19.0 | 47.8 |
| [`google/gemma-4-31b-it`](models/google--gemma-4-31b-it.md): off (the provider's default) | open-weight, large | **120/138** | 40 of 46 (3 runs) | 2 items | 40 | 0 | 0 | 0 | 0 | 0.000036 | 0.7 | 2.3 |
| [`google/gemma-4-31b-it#reasoning-on`](models/google--gemma-4-31b-it.md): on (asked, medium effort) | open-weight, large | **40/46** | 40 of 46 (1 run) |  | 40 | 0 | 0 | 0 | 0 | 0.00022 | 7.1 | 15.5 |
| [`meta-llama/llama-4-maverick`](models/meta-llama--llama-4-maverick.md): does not reason | open-weight, large | **117/138** | 38 to 40 of 46 (3 runs) | 2 items | 40 | 0 | 0 | 0 | 0 | 0.000072 | 0.6 | 0.8 |
| [`deepseek/deepseek-v4.1-flash#reasoning-off`](models/deepseek--deepseek-v4.1-flash.md): off (asked) | open-weight, large | **126/138** | 41 to 43 of 46 (3 runs) | 2 items | 42 | 0 | 0 | 0 | 0 | 0.000038 | 0.4 | 0.9 |
| [`deepseek/deepseek-v4.1-flash`](models/deepseek--deepseek-v4.1-flash.md): on (the provider's default) | open-weight, large | **40/46** | 40 of 46 (1 run) |  | 40 | 0 | 1 | 0 | 0 | 0.00062 | 2.3 | 15.7 |
| [`qwen/qwen3.5-397b-a17b#reasoning-off`](models/qwen--qwen3.5-397b-a17b.md): off (asked) | open-weight, large | **121/138** | 39 to 41 of 46 (3 runs) | 6 items | 39 | 0 | 0 | 0 | 0 | 0.00026 | 1.0 | 1.4 |
| [`qwen/qwen3.5-397b-a17b`](models/qwen--qwen3.5-397b-a17b.md): on (the provider's default) | open-weight, large | **40/46** | 40 of 46 (1 run) |  | 40 | 1 | 1 | 0 | 0 | 0.00454 | 12.5 | 42.9 |
| [`mistralai/mistral-large-4-0`](models/mistralai--mistral-large-4-0.md): reasons; cannot be turned off (the provider refuses the setting) | open-weight, large | **39/46** | 39 of 46 (1 run) |  | 39 | 0 | 1 | 0 | 0 | 0.00298 | 7.3 | 24.8 |
| [`openai/gpt-6-luna`](models/openai--gpt-6-luna.md): off (the provider's default) | commercial, small | **115/138** | 38 to 39 of 46 (3 runs) | 3 items | 38 | 0 | 0 | 0 | 0 | 0.000066 | 2.5 | 3.3 |
| [`openai/gpt-6-luna#reasoning-on`](models/openai--gpt-6-luna.md): on (asked, medium effort) | commercial, small | **39/46** | 39 of 46 (1 run) |  | 39 | 0 | 0 | 0 | 0 | 0.000068 | 2.4 | 3.6 |
| [`google/gemini-3.5-flash-lite`](models/google--gemini-3.5-flash-lite.md): reasons; cannot be turned off (the provider refuses the setting) | commercial, small | **117/138** | 39 of 46 (3 runs) | 4 items | 39 | 0 | 0 | 0 | 0 | 0.00010 | 0.7 | 0.9 |
| [`anthropic/claude-haiku-5.5`](models/anthropic--claude-haiku-5.5.md): off (the provider's default) | commercial, small | **114/138** | 37 to 39 of 46 (3 runs) | 2 items | 37 | 0 | 0 | 0 | 0 | 0.00010 | 0.9 | 2.2 |
| [`anthropic/claude-haiku-5.5#reasoning-on`](models/anthropic--claude-haiku-5.5.md): on (asked, medium effort) | commercial, small | **39/46** | 39 of 46 (1 run) |  | 39 | 0 | 0 | 0 | 0 | 0.00011 | 0.8 | 3.3 |
| [`openai/gpt-6.1-terra`](models/openai--gpt-6.1-terra.md): off (the provider's default) | commercial, large | **119/138** | 38 to 42 of 46 (3 runs) | 4 items | 38 | 0 | 0 | 0 | 0 | 0.00063 | 2.5 | 4.5 |
| [`openai/gpt-6.1-terra#reasoning-on`](models/openai--gpt-6.1-terra.md): on (asked, medium effort) | commercial, large | **40/46** | 40 of 46 (1 run) |  | 40 | 0 | 0 | 0 | 0 | 0.00062 | 2.4 | 5.3 |

The field columns count the first run. "Changed between runs": items a row got right in one run and wrong in another, at temperature 0.

**Reading (ours, a hypothesis):** No model passed 17 of 20, and the misses are mostly the same rows for every model, which points at our labels as much as at the models. Two rows the lead marks 'analysis' (so: hypothesis) are counts made by incident.media@ from its own dataset (who published when; that no title had reported a change by a given time): 13 of 13 and 11 of 13 models call them fact or evidence. One team row ('No further statement from Web Summit', from a watcher's sweep) split the models three ways. The clear rows (IPMA's own data; a forecast-like reading by the meteorologist; a press report relayed by a watcher) were labelled right by nearly every model above the smallest. The smallest model (4 billion parameters) got 8 of 20: not usable for this.

## A question for Dinis: do our three labels lack a fourth, "our measurement"?

*asked by incident.conductor@web-summit.dinis (its message of 02:38 UTC), from this page's results; written up by incident.models@.*

The lead keeps the three labels below as they are: by our rule, anything that is our own analysis is a hypothesis. The models were given that rule and still read these rows differently, and the way they differ is the finding. Two of the rows are counts incident.media@ made from sources we hold (who published when; that no article title had reported a change by a given time). The third is an absence we observed (no further statement found in a sweep). None is an opinion or a forecast-like reading: each can be recomputed from the dataset it names and would come out the same. Our labels have fact (read at the body that decides, warns or measures), evidence (reported by others) and hypothesis (our reasoning, with its reasons). A count we made ourselves sits in none of them comfortably: it is not the primary source's statement, not someone else's report, and not a judgement. A fourth kind, "our measurement" (we counted or computed it from sources we hold; reproducible; with its limits stated), would let a reader tell the meteorologist's 'the centre most likely passes just south of Lisbon' from the media desk's '87 of 212 items carry Lusa's by-line'. Today both wear the same word. No row has been relabelled.

| Row | Our label | What the rows said (first run) | The row |
|---|---|---|---|
| [s-1110T2358](../incidents/2026-11-10-storm-charles/timeline.md#s-1110T2358) | hypothesis | evidence 10, fact 9, hypothesis 1 (of 20) | the press on Day 2 after Web Summit's 19:09 page: ECO and TEK 19:41 (32 min later), DN 19:49, Lusa via Notícias ao Minuto 20:01, Observador 20:08, Euronews 20:2… |
| [s-1111T0015](../incidents/2026-11-10-storm-charles/timeline.md#s-1111T0015) | hypothesis | fact 13, hypothesis 6, evidence 1 (of 20) | IPMA's move of Lisbon's red rain to 09:00 (sent 21:23) had not been reported by any article title or live-blog entry we could read by 00:15. Limits: matched by … |
| [s-1110T2153](../incidents/2026-11-10-storm-charles/timeline.md#s-1110T2153) | fact | fact 8, evidence 5, hypothesis 4, no answer 3 (of 20) | No further statement from Web Summit (social.watch@'s sweep 4); still open: Wednesday's talks, the PITCH semi-final (when it was set is in conflict: Wednesday 1… |

## Item by item

First run of each row.

| Item | Right | gemma-3-4b-it | gpt-oss-20b | ministral-8b-2512 | qwen3.5-9b #reasoning-off | qwen3.5-9b | gemma-4-31b-it | gemma-4-31b-it #reasoning-on | llama-4-maverick | deepseek-v4.1-flash #reasoning-off | deepseek-v4.1-flash | qwen3.5-397b-a17b #reasoning-off | qwen3.5-397b-a17b | mistral-large-4-0 | gpt-6-luna | gpt-6-luna #reasoning-on | gemini-3.5-flash-lite | claude-haiku-5.5 | claude-haiku-5.5 #reasoning-on | gpt-6.1-terra | gpt-6.1-terra #reasoning-on |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [s-1109T1020](#s-1109t1020) | 5/20 | **no** | **no** | right | right | right | **no** | **no** | **no** | right | **no** | **no** | **no** | **no** | **no** | **no** | **no** | **no** | right | **no** | **no** |
| [s-1109T1317](#s-1109t1317) | 20/20 | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [s-1109T2030](#s-1109t2030) | 20/20 | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [s-1110T0718](#s-1110t0718) | 20/20 | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [s-1110T0846](#s-1110t0846) | 19/20 | **no** | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [s-1110T1210](#s-1110t1210) | 20/20 | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [s-1110T1245](#s-1110t1245) | 19/20 | **no** | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [s-1110T1423](#s-1110t1423) | 20/20 | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [s-1110T1425](#s-1110t1425) | 19/20 | **no** | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [s-1110T1519](#s-1110t1519) | 20/20 | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [s-1110T1700](#s-1110t1700) | 9/20 | **no** | right | **no** | **no** | right | right | right | right | **no** | right | **no** | right | **no** | **no** | **no** | **no** | **no** | **no** | right | right |
| [s-1110T1707](#s-1110t1707) | 20/20 | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [s-1110T1707b](#s-1110t1707b) | 17/20 | **no** | right | right | **no** | **no** | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [s-1110T1742](#s-1110t1742) | 20/20 | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [s-1110T1743](#s-1110t1743) | 19/20 | right | right | right | **no** | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [s-1110T1753](#s-1110t1753) | 19/20 | **no** | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [s-1110T1825](#s-1110t1825) | 18/20 | **no** | right | **no** | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [s-1110T1835](#s-1110t1835) | 18/20 | **no** | right | right | right | **no** | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [s-1110T1836](#s-1110t1836) | 20/20 | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [s-1110T1858](#s-1110t1858) | 0/20 | **no** | **no** | **no** | **no** | **no** | **no** | **no** | **no** | **no** | **no** | **no** | **no** | **no** | **no** | **no** | **no** | **no** | **no** | **no** | **no** |
| [s-1110T1901](#s-1110t1901) | 19/20 | right | right | right | **no** | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [s-1110T1905](#s-1110t1905) | 18/20 | right | right | right | **no** | **no** | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [s-1110T1905b](#s-1110t1905b) | 19/20 | right | **no** | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [s-1110T1909](#s-1110t1909) | 14/20 | **no** | right | **no** | **no** | **no** | right | right | **no** | right | right | **no** | right | right | right | right | right | right | right | right | right |
| [s-1110T1941](#s-1110t1941) | 19/20 | **no** | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [s-1110T1945](#s-1110t1945) | 18/20 | **no** | right | **no** | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [s-1110T1952](#s-1110t1952) | 18/20 | **no** | right | right | **no** | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [s-1110T2008](#s-1110t2008) | 19/20 | **no** | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [s-1110T2030](#s-1110t2030) | 18/20 | **no** | right | right | right | right | right | right | right | right | right | right | **no** | right | right | right | right | right | right | right | right |
| [s-1110T2115](#s-1110t2115) | 10/20 | right | right | right | **no** | **no** | right | **no** | right | **no** | right | right | right | right | **no** | **no** | right | **no** | **no** | **no** | **no** |
| [s-1110T2118](#s-1110t2118) | 14/20 | **no** | **no** | right | **no** | **no** | right | right | **no** | right | right | right | right | right | right | right | **no** | right | right | right | right |
| [s-1110T2132](#s-1110t2132) | 16/20 | right | right | **no** | **no** | **no** | right | right | right | right | right | **no** | right | right | right | right | right | right | right | right | right |
| [s-1110T2153](#s-1110t2153) | 8/20 | **no** | right | **no** | **no** | **no** | **no** | right | right | right | right | **no** | **no** | **no** | **no** | right | **no** | **no** | right | **no** | right |
| [s-1110T2220](#s-1110t2220) | 19/20 | right | right | right | right | **no** | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [s-1110T2229](#s-1110t2229) | 5/20 | **no** | **no** | right | **no** | **no** | **no** | **no** | right | right | **no** | right | right | **no** | **no** | **no** | **no** | **no** | **no** | **no** | **no** |
| [s-1110T2323](#s-1110t2323) | 13/20 | right | right | right | **no** | **no** | right | right | right | right | **no** | right | right | right | right | **no** | right | **no** | right | **no** | **no** |
| [s-1110T2324](#s-1110t2324) | 20/20 | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [s-1110T2353](#s-1110t2353) | 20/20 | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [s-1110T2354](#s-1110t2354) | 16/20 | **no** | **no** | right | **no** | **no** | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [s-1110T2358](#s-1110t2358) | 1/20 | **no** | **no** | **no** | **no** | **no** | **no** | **no** | **no** | **no** | **no** | **no** | **no** | **no** | **no** | **no** | **no** | **no** | **no** | **no** | right |
| [s-1111T0000](#s-1111t0000) | 20/20 | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [s-1111T0015](#s-1111t0015) | 6/20 | **no** | **no** | **no** | **no** | **no** | **no** | **no** | **no** | right | **no** | right | **no** | **no** | **no** | right | right | **no** | **no** | right | right |
| [s-1111T0146](#s-1111t0146) | 19/20 | right | right | right | **no** | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [s-1111T0228](#s-1111t0228) | 20/20 | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [s-1111T0229](#s-1111t0229) | 20/20 | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [s-1111T0238](#s-1111t0238) | 16/20 | right | right | right | right | **no** | right | right | right | right | right | right | right | right | right | right | right | right | **no** | **no** | **no** |

### s-1109T1020

```
AEMET, Spain's meteorological agency, says in public that the storm is named Charles, 2 h 57 min before the 13:17 this timeline gives for IPMA's communiqué no. 1 (row s-1109T1317). AEMET's post is timed 10:20:11 (read through Bluesky's public API). IPMA's communiqué no. 1 can no longer be read (its page and feed carry only no. 2), so whether 13:17 was its first publication or an edit is not established
Source(s): AEMET on Bluesky ; read 02:2x on 11 Nov by incident.social@
```

Scored against: `{"label":"evidence"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1109T1020 (label)`. The row: [s-1109T1020](../incidents/2026-11-10-storm-charles/timeline.html#s-1109T1020).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | fact | **wrong** | 0/3 |
| `gpt-oss-20b` | fact | **wrong** | 0/3 |
| `ministral-8b-2512` | evidence | right | 3/3 |
| `qwen3.5-9b #reasoning-off` | evidence | right | 3/3 |
| `qwen3.5-9b` | evidence | right | 1/1 |
| `gemma-4-31b-it` | fact | **wrong** | 0/3 |
| `gemma-4-31b-it #reasoning-on` | hypothesis | **wrong** | 0/1 |
| `llama-4-maverick` | fact | **wrong** | 0/3 |
| `deepseek-v4.1-flash #reasoning-off` | evidence | right | 3/3 |
| `deepseek-v4.1-flash` | fact | **wrong** | 0/1 |
| `qwen3.5-397b-a17b #reasoning-off` | fact | **wrong** | 2/3 |
| `qwen3.5-397b-a17b` | fact | **wrong** | 0/1 |
| `mistral-large-4-0` | fact | **wrong** | 0/1 |
| `gpt-6-luna` | fact | **wrong** | 0/3 |
| `gpt-6-luna #reasoning-on` | fact | **wrong** | 0/1 |
| `gemini-3.5-flash-lite` | fact | **wrong** | 0/3 |
| `claude-haiku-5.5` | fact | **wrong** | 0/3 |
| `claude-haiku-5.5 #reasoning-on` | evidence | right | 1/1 |
| `gpt-6.1-terra` | fact | **wrong** | 0/3 |
| `gpt-6.1-terra #reasoning-on` | fact | **wrong** | 0/1 |

### s-1109T1317

```
IPMA names the storm CHARLES (communiqué no. 1): expected north of Madeira at 00:00 on 11 Nov, then toward the mainland, "com elevada incerteza na trajetória e intensidade"; orange warnings to be issued
Source(s): IPMA communiqués ; data/weather/communiques.json; read by weather@ 10 Nov 16:53
```

Scored against: `{"label":"fact"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1109T1317 (label)`. The row: [s-1109T1317](../incidents/2026-11-10-storm-charles/timeline.html#s-1109T1317).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | fact | right | 3/3 |
| `gpt-oss-20b` | fact | right | 3/3 |
| `ministral-8b-2512` | fact | right | 3/3 |
| `qwen3.5-9b #reasoning-off` | fact | right | 3/3 |
| `qwen3.5-9b` | fact | right | 1/1 |
| `gemma-4-31b-it` | fact | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | fact | right | 1/1 |
| `llama-4-maverick` | fact | right | 3/3 |
| `deepseek-v4.1-flash #reasoning-off` | fact | right | 3/3 |
| `deepseek-v4.1-flash` | fact | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | fact | right | 3/3 |
| `qwen3.5-397b-a17b` | fact | right | 1/1 |
| `mistral-large-4-0` | fact | right | 1/1 |
| `gpt-6-luna` | fact | right | 3/3 |
| `gpt-6-luna #reasoning-on` | fact | right | 1/1 |
| `gemini-3.5-flash-lite` | fact | right | 3/3 |
| `claude-haiku-5.5` | fact | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | fact | right | 1/1 |
| `gpt-6.1-terra` | fact | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | fact | right | 1/1 |

### s-1109T2030

```
ANEPC's public warning, Aviso 21, on CHARLES (before any red warning)
Source(s): ANEPC ; read by weather@ 10 Nov 17:01
```

Scored against: `{"label":"fact"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1109T2030 (label)`. The row: [s-1109T2030](../incidents/2026-11-10-storm-charles/timeline.html#s-1109T2030).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | fact | right | 3/3 |
| `gpt-oss-20b` | fact | right | 3/3 |
| `ministral-8b-2512` | fact | right | 3/3 |
| `qwen3.5-9b #reasoning-off` | fact | right | 2/3 |
| `qwen3.5-9b` | fact | right | 1/1 |
| `gemma-4-31b-it` | fact | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | fact | right | 1/1 |
| `llama-4-maverick` | fact | right | 3/3 |
| `deepseek-v4.1-flash #reasoning-off` | fact | right | 3/3 |
| `deepseek-v4.1-flash` | fact | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | fact | right | 3/3 |
| `qwen3.5-397b-a17b` | fact | right | 1/1 |
| `mistral-large-4-0` | fact | right | 1/1 |
| `gpt-6-luna` | fact | right | 3/3 |
| `gpt-6-luna #reasoning-on` | fact | right | 1/1 |
| `gemini-3.5-flash-lite` | fact | right | 3/3 |
| `claude-haiku-5.5` | fact | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | fact | right | 1/1 |
| `gpt-6.1-terra` | fact | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | fact | right | 1/1 |

### s-1110T0718

```
IPMA sends the red wind warning for Lisbon (Wednesday 12:00 to 21:00), updating a wind message sent Monday 13:27; first in the press we read at 08:05 (DN live)
Source(s): MeteoAlarm ; IPMA's CAP message through , data/weather/cap.json (incident.meteorologist@, read 23:51); research/media/first-on-each-fact.json
```

Scored against: `{"label":"fact"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T0718 (label)`. The row: [s-1110T0718](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T0718).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | fact | right | 3/3 |
| `gpt-oss-20b` | fact | right | 3/3 |
| `ministral-8b-2512` | fact | right | 3/3 |
| `qwen3.5-9b #reasoning-off` | fact | right | 3/3 |
| `qwen3.5-9b` | fact | right | 1/1 |
| `gemma-4-31b-it` | fact | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | fact | right | 1/1 |
| `llama-4-maverick` | fact | right | 3/3 |
| `deepseek-v4.1-flash #reasoning-off` | fact | right | 3/3 |
| `deepseek-v4.1-flash` | fact | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | fact | right | 3/3 |
| `qwen3.5-397b-a17b` | fact | right | 1/1 |
| `mistral-large-4-0` | fact | right | 1/1 |
| `gpt-6-luna` | fact | right | 3/3 |
| `gpt-6-luna #reasoning-on` | fact | right | 1/1 |
| `gemini-3.5-flash-lite` | fact | right | 3/3 |
| `claude-haiku-5.5` | fact | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | fact | right | 1/1 |
| `gpt-6.1-terra` | fact | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | fact | right | 1/1 |

### s-1110T0846

```
IPMA expects the storm earlier, Wednesday morning; Lisbon among the hardest hit; avoid unnecessary travel (Lusa)
Source(s): AWAY (IOL), via Lusa ; via social.watch@PrompTugal.dinis
```

Scored against: `{"label":"evidence"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T0846 (label)`. The row: [s-1110T0846](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T0846).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | fact | **wrong** | 0/3 |
| `gpt-oss-20b` | evidence | right | 3/3 |
| `ministral-8b-2512` | evidence | right | 3/3 |
| `qwen3.5-9b #reasoning-off` | evidence | right | 3/3 |
| `qwen3.5-9b` | evidence | right | 1/1 |
| `gemma-4-31b-it` | evidence | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | evidence | right | 1/1 |
| `llama-4-maverick` | evidence | right | 3/3 |
| `deepseek-v4.1-flash #reasoning-off` | evidence | right | 3/3 |
| `deepseek-v4.1-flash` | evidence | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | evidence | right | 3/3 |
| `qwen3.5-397b-a17b` | evidence | right | 1/1 |
| `mistral-large-4-0` | evidence | right | 1/1 |
| `gpt-6-luna` | evidence | right | 3/3 |
| `gpt-6-luna #reasoning-on` | evidence | right | 1/1 |
| `gemini-3.5-flash-lite` | evidence | right | 3/3 |
| `claude-haiku-5.5` | evidence | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | evidence | right | 1/1 |
| `gpt-6.1-terra` | evidence | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | evidence | right | 1/1 |

### s-1110T1210

```
The government declares an alert situation for the mainland on Wednesday, 00:00 to 23:59: schools and non-essential public services close; outdoor events suspended
Source(s): portugal.gov.pt ; observador.pt ; portugal.gov.pt (page dated 12:10; S41 updated with it at 17:27), read by weather@; address: ,  (primary (published 12:10) + press (announced ~09:17); read 00:56, by incident.researcher@)
```

Scored against: `{"label":"fact"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T1210 (label)`. The row: [s-1110T1210](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1210).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | fact | right | 3/3 |
| `gpt-oss-20b` | fact | right | 3/3 |
| `ministral-8b-2512` | fact | right | 3/3 |
| `qwen3.5-9b #reasoning-off` | fact | right | 3/3 |
| `qwen3.5-9b` | fact | right | 1/1 |
| `gemma-4-31b-it` | fact | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | fact | right | 1/1 |
| `llama-4-maverick` | fact | right | 3/3 |
| `deepseek-v4.1-flash #reasoning-off` | fact | right | 3/3 |
| `deepseek-v4.1-flash` | fact | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | fact | right | 3/3 |
| `qwen3.5-397b-a17b` | fact | right | 1/1 |
| `mistral-large-4-0` | fact | right | 1/1 |
| `gpt-6-luna` | fact | right | 3/3 |
| `gpt-6-luna #reasoning-on` | fact | right | 1/1 |
| `gemini-3.5-flash-lite` | fact | right | 3/3 |
| `claude-haiku-5.5` | fact | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | fact | right | 1/1 |
| `gpt-6.1-terra` | fact | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | fact | right | 1/1 |

### s-1110T1245

```
Web Summit's organisers following the alerts with ANEPC and PSP; no sign yet of cancelling Wednesday
Source(s): Jornal de Negócios, live ; via social.watch@PrompTugal.dinis
```

Scored against: `{"label":"evidence"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T1245 (label)`. The row: [s-1110T1245](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1245).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | fact | **wrong** | 0/3 |
| `gpt-oss-20b` | evidence | right | 3/3 |
| `ministral-8b-2512` | evidence | right | 3/3 |
| `qwen3.5-9b #reasoning-off` | evidence | right | 3/3 |
| `qwen3.5-9b` | evidence | right | 1/1 |
| `gemma-4-31b-it` | evidence | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | evidence | right | 1/1 |
| `llama-4-maverick` | evidence | right | 3/3 |
| `deepseek-v4.1-flash #reasoning-off` | evidence | right | 3/3 |
| `deepseek-v4.1-flash` | evidence | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | evidence | right | 3/3 |
| `qwen3.5-397b-a17b` | evidence | right | 1/1 |
| `mistral-large-4-0` | evidence | right | 1/1 |
| `gpt-6-luna` | evidence | right | 3/3 |
| `gpt-6-luna #reasoning-on` | evidence | right | 1/1 |
| `gemini-3.5-flash-lite` | evidence | right | 3/3 |
| `claude-haiku-5.5` | evidence | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | evidence | right | 1/1 |
| `gpt-6.1-terra` | evidence | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | evidence | right | 1/1 |

### s-1110T1423

```
IPMA red warning for wind, Lisbon district, Wednesday 12:00 to 21:00 (first read by the newsroom)
Source(s): feeds.meteoalarm.org ; api.ipma.pt ; ipma.pt ; S41; desks/weather-vicky/live.md; address: , ,  (primary; read 01:05, by incident.researcher@)
```

Scored against: `{"label":"fact"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T1423 (label)`. The row: [s-1110T1423](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1423).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | fact | right | 3/3 |
| `gpt-oss-20b` | fact | right | 3/3 |
| `ministral-8b-2512` | fact | right | 3/3 |
| `qwen3.5-9b #reasoning-off` | fact | right | 3/3 |
| `qwen3.5-9b` | fact | right | 1/1 |
| `gemma-4-31b-it` | fact | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | fact | right | 1/1 |
| `llama-4-maverick` | fact | right | 3/3 |
| `deepseek-v4.1-flash #reasoning-off` | fact | right | 3/3 |
| `deepseek-v4.1-flash` | fact | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | fact | right | 3/3 |
| `qwen3.5-397b-a17b` | fact | right | 1/1 |
| `mistral-large-4-0` | fact | right | 1/1 |
| `gpt-6-luna` | fact | right | 3/3 |
| `gpt-6-luna #reasoning-on` | fact | right | 1/1 |
| `gemini-3.5-flash-lite` | fact | right | 3/3 |
| `claude-haiku-5.5` | fact | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | fact | right | 1/1 |
| `gpt-6.1-terra` | fact | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | fact | right | 1/1 |

### s-1110T1425

```
Web Summit in doubt; Tagus bridges limited to 60 km/h; Lisbon tunnels closed from midnight; Metro keeps running
Source(s): TEK Notícias ; via social.watch@PrompTugal.dinis
```

Scored against: `{"label":"evidence"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T1425 (label)`. The row: [s-1110T1425](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1425).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | fact | **wrong** | 0/3 |
| `gpt-oss-20b` | evidence | right | 3/3 |
| `ministral-8b-2512` | evidence | right | 3/3 |
| `qwen3.5-9b #reasoning-off` | evidence | right | 3/3 |
| `qwen3.5-9b` | evidence | right | 1/1 |
| `gemma-4-31b-it` | evidence | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | evidence | right | 1/1 |
| `llama-4-maverick` | evidence | right | 3/3 |
| `deepseek-v4.1-flash #reasoning-off` | evidence | right | 3/3 |
| `deepseek-v4.1-flash` | evidence | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | evidence | right | 3/3 |
| `qwen3.5-397b-a17b` | evidence | right | 1/1 |
| `mistral-large-4-0` | evidence | right | 1/1 |
| `gpt-6-luna` | evidence | right | 3/3 |
| `gpt-6-luna #reasoning-on` | evidence | right | 1/1 |
| `gemini-3.5-flash-lite` | evidence | right | 3/3 |
| `claude-haiku-5.5` | evidence | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | evidence | right | 1/1 |
| `gpt-6.1-terra` | evidence | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | evidence | right | 1/1 |

### s-1110T1519

```
the storm leaves Web Summit with a thin audience
Source(s): Jornal de Negócios, live ; via social.watch@PrompTugal.dinis
```

Scored against: `{"label":"evidence"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T1519 (label)`. The row: [s-1110T1519](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1519).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | evidence | right | 3/3 |
| `gpt-oss-20b` | evidence | right | 3/3 |
| `ministral-8b-2512` | evidence | right | 3/3 |
| `qwen3.5-9b #reasoning-off` | evidence | right | 3/3 |
| `qwen3.5-9b` | evidence | right | 1/1 |
| `gemma-4-31b-it` | evidence | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | evidence | right | 1/1 |
| `llama-4-maverick` | evidence | right | 3/3 |
| `deepseek-v4.1-flash #reasoning-off` | evidence | right | 3/3 |
| `deepseek-v4.1-flash` | evidence | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | evidence | right | 3/3 |
| `qwen3.5-397b-a17b` | evidence | right | 1/1 |
| `mistral-large-4-0` | evidence | right | 1/1 |
| `gpt-6-luna` | evidence | right | 3/3 |
| `gpt-6-luna #reasoning-on` | evidence | right | 1/1 |
| `gemini-3.5-flash-lite` | evidence | right | 3/3 |
| `claude-haiku-5.5` | evidence | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | evidence | right | 1/1 |
| `gpt-6.1-terra` | evidence | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | evidence | right | 1/1 |

### s-1110T1700

```
Dinis: the storm is our case study (a dynamic team, the decision graph)
Source(s): PrompTugal guidance 2026-11-10-the-storm-as-our-case-study.md
```

Scored against: `{"label":"fact"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T1700 (label)`. The row: [s-1110T1700](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1700).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | hypothesis | **wrong** | 0/3 |
| `gpt-oss-20b` | fact | right | 2/3 |
| `ministral-8b-2512` | hypothesis | **wrong** | 0/3 |
| `qwen3.5-9b #reasoning-off` | hypothesis | **wrong** | 0/3 |
| `qwen3.5-9b` | fact | right | 1/1 |
| `gemma-4-31b-it` | fact | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | fact | right | 1/1 |
| `llama-4-maverick` | fact | right | 3/3 |
| `deepseek-v4.1-flash #reasoning-off` | hypothesis | **wrong** | 0/3 |
| `deepseek-v4.1-flash` | fact | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | hypothesis | **wrong** | 0/3 |
| `qwen3.5-397b-a17b` | fact | right | 1/1 |
| `mistral-large-4-0` | hypothesis | **wrong** | 0/1 |
| `gpt-6-luna` | hypothesis | **wrong** | 0/3 |
| `gpt-6-luna #reasoning-on` | hypothesis | **wrong** | 0/1 |
| `gemini-3.5-flash-lite` | hypothesis | **wrong** | 0/3 |
| `claude-haiku-5.5` | hypothesis | **wrong** | 0/3 |
| `claude-haiku-5.5 #reasoning-on` | hypothesis | **wrong** | 0/1 |
| `gpt-6.1-terra` | fact | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | fact | right | 1/1 |

### s-1110T1707

```
water enters a pavilion between halls 4 and 5; participants leave early
Source(s): Jornal de Negócios, live ; via social.watch@PrompTugal.dinis
```

Scored against: `{"label":"evidence"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T1707 (label)`. The row: [s-1110T1707](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1707).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | evidence | right | 3/3 |
| `gpt-oss-20b` | evidence | right | 3/3 |
| `ministral-8b-2512` | evidence | right | 3/3 |
| `qwen3.5-9b #reasoning-off` | evidence | right | 3/3 |
| `qwen3.5-9b` | evidence | right | 1/1 |
| `gemma-4-31b-it` | evidence | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | evidence | right | 1/1 |
| `llama-4-maverick` | evidence | right | 3/3 |
| `deepseek-v4.1-flash #reasoning-off` | evidence | right | 3/3 |
| `deepseek-v4.1-flash` | evidence | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | evidence | right | 3/3 |
| `qwen3.5-397b-a17b` | evidence | right | 1/1 |
| `mistral-large-4-0` | evidence | right | 1/1 |
| `gpt-6-luna` | evidence | right | 3/3 |
| `gpt-6-luna #reasoning-on` | evidence | right | 1/1 |
| `gemini-3.5-flash-lite` | evidence | right | 3/3 |
| `claude-haiku-5.5` | evidence | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | evidence | right | 1/1 |
| `gpt-6.1-terra` | evidence | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | evidence | right | 1/1 |

### s-1110T1707b

```
IPMA communiqué no. 2 on CHARLES (edited 17:07:58): worse weather from early Wednesday morning; the centre most likely to pass "entre Sines e o Cabo Carvoeiro"; gusts 100 to 120 km/h, locally 140; "elevada incerteza" in track and strength
Source(s): IPMA communiqués ; data/weather/communiques.json; read by weather@ 17:42
```

Scored against: `{"label":"fact"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T1707b (label)`. The row: [s-1110T1707b](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1707b).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | hypothesis | **wrong** | 0/3 |
| `gpt-oss-20b` | fact | right | 3/3 |
| `ministral-8b-2512` | fact | right | 3/3 |
| `qwen3.5-9b #reasoning-off` | evidence | **wrong** | 0/3 |
| `qwen3.5-9b` | evidence | **wrong** | 0/1 |
| `gemma-4-31b-it` | fact | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | fact | right | 1/1 |
| `llama-4-maverick` | fact | right | 3/3 |
| `deepseek-v4.1-flash #reasoning-off` | fact | right | 3/3 |
| `deepseek-v4.1-flash` | fact | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | fact | right | 3/3 |
| `qwen3.5-397b-a17b` | fact | right | 1/1 |
| `mistral-large-4-0` | fact | right | 1/1 |
| `gpt-6-luna` | fact | right | 3/3 |
| `gpt-6-luna #reasoning-on` | fact | right | 1/1 |
| `gemini-3.5-flash-lite` | fact | right | 3/3 |
| `claude-haiku-5.5` | fact | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | fact | right | 1/1 |
| `gpt-6.1-terra` | fact | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | fact | right | 1/1 |

### s-1110T1742

```
IPMA raises Lisbon's rain warning to red, Wednesday 12:00 to 18:00 (IPMA sent it at 16:30:01, by its CAP message; 17:42 is when the weather desk first read it)
Source(s): feeds.meteoalarm.org ; api.ipma.pt ; IPMA open data, read by weather@; address: ,  (primary; read 01:05, by incident.researcher@)
```

Scored against: `{"label":"fact"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T1742 (label)`. The row: [s-1110T1742](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1742).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | fact | right | 3/3 |
| `gpt-oss-20b` | fact | right | 3/3 |
| `ministral-8b-2512` | fact | right | 3/3 |
| `qwen3.5-9b #reasoning-off` | fact | right | 3/3 |
| `qwen3.5-9b` | fact | right | 1/1 |
| `gemma-4-31b-it` | fact | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | fact | right | 1/1 |
| `llama-4-maverick` | fact | right | 3/3 |
| `deepseek-v4.1-flash #reasoning-off` | fact | right | 3/3 |
| `deepseek-v4.1-flash` | fact | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | fact | right | 3/3 |
| `qwen3.5-397b-a17b` | fact | right | 1/1 |
| `mistral-large-4-0` | fact | right | 1/1 |
| `gpt-6-luna` | fact | right | 3/3 |
| `gpt-6-luna #reasoning-on` | fact | right | 1/1 |
| `gemini-3.5-flash-lite` | fact | right | 3/3 |
| `claude-haiku-5.5` | fact | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | fact | right | 1/1 |
| `gpt-6.1-terra` | fact | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | fact | right | 1/1 |

### s-1110T1743

```
Web Summit: no change to Wednesday's programme announced on its homepage or news page
Source(s): websummit.com ; websummit.com ; websummit.com, read by weather@; address: ,  (primary (a negative finding); read 18:58, by incident.researcher@)
```

Scored against: `{"label":"fact"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T1743 (label)`. The row: [s-1110T1743](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1743).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | fact | right | 3/3 |
| `gpt-oss-20b` | fact | right | 3/3 |
| `ministral-8b-2512` | fact | right | 3/3 |
| `qwen3.5-9b #reasoning-off` | evidence | **wrong** | 0/3 |
| `qwen3.5-9b` | fact | right | 1/1 |
| `gemma-4-31b-it` | fact | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | fact | right | 1/1 |
| `llama-4-maverick` | fact | right | 3/3 |
| `deepseek-v4.1-flash #reasoning-off` | fact | right | 3/3 |
| `deepseek-v4.1-flash` | fact | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | fact | right | 3/3 |
| `qwen3.5-397b-a17b` | fact | right | 1/1 |
| `mistral-large-4-0` | fact | right | 1/1 |
| `gpt-6-luna` | fact | right | 3/3 |
| `gpt-6-luna #reasoning-on` | fact | right | 1/1 |
| `gemini-3.5-flash-lite` | fact | right | 3/3 |
| `claude-haiku-5.5` | fact | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | fact | right | 1/1 |
| `gpt-6.1-terra` | fact | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | fact | right | 1/1 |

### s-1110T1753

```
the government recommends suspending Web Summit on Wednesday; the decision rests with the organisers
Source(s): Jornal de Negócios, live ; via social.watch@PrompTugal.dinis
```

Scored against: `{"label":"evidence"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T1753 (label)`. The row: [s-1110T1753](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1753).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | fact | **wrong** | 0/3 |
| `gpt-oss-20b` | evidence | right | 3/3 |
| `ministral-8b-2512` | evidence | right | 3/3 |
| `qwen3.5-9b #reasoning-off` | evidence | right | 3/3 |
| `qwen3.5-9b` | evidence | right | 1/1 |
| `gemma-4-31b-it` | evidence | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | evidence | right | 1/1 |
| `llama-4-maverick` | evidence | right | 3/3 |
| `deepseek-v4.1-flash #reasoning-off` | evidence | right | 3/3 |
| `deepseek-v4.1-flash` | evidence | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | evidence | right | 3/3 |
| `qwen3.5-397b-a17b` | evidence | right | 1/1 |
| `mistral-large-4-0` | evidence | right | 1/1 |
| `gpt-6-luna` | evidence | right | 3/3 |
| `gpt-6-luna #reasoning-on` | evidence | right | 1/1 |
| `gemini-3.5-flash-lite` | evidence | right | 3/3 |
| `claude-haiku-5.5` | evidence | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | evidence | right | 1/1 |
| `gpt-6.1-terra` | evidence | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | evidence | right | 1/1 |

### s-1110T1825

```
no organiser statement after the government's recommendation (the live blog's last update read)
Source(s): Jornal de Negócios, live ; via social.watch@PrompTugal.dinis
```

Scored against: `{"label":"evidence"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T1825 (label)`. The row: [s-1110T1825](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1825).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | hypothesis | **wrong** | 0/3 |
| `gpt-oss-20b` | evidence | right | 3/3 |
| `ministral-8b-2512` | fact | **wrong** | 0/3 |
| `qwen3.5-9b #reasoning-off` | evidence | right | 3/3 |
| `qwen3.5-9b` | evidence | right | 1/1 |
| `gemma-4-31b-it` | evidence | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | evidence | right | 1/1 |
| `llama-4-maverick` | evidence | right | 3/3 |
| `deepseek-v4.1-flash #reasoning-off` | evidence | right | 3/3 |
| `deepseek-v4.1-flash` | evidence | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | evidence | right | 3/3 |
| `qwen3.5-397b-a17b` | evidence | right | 1/1 |
| `mistral-large-4-0` | evidence | right | 1/1 |
| `gpt-6-luna` | evidence | right | 3/3 |
| `gpt-6-luna #reasoning-on` | evidence | right | 1/1 |
| `gemini-3.5-flash-lite` | evidence | right | 3/3 |
| `claude-haiku-5.5` | evidence | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | evidence | right | 1/1 |
| `gpt-6.1-terra` | evidence | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | evidence | right | 1/1 |

### s-1110T1835

```
Incident declared (P1, run on account A) at Dinis's word
Source(s): this folder
```

Scored against: `{"label":"fact"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T1835 (label)`. The row: [s-1110T1835](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1835).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | hypothesis | **wrong** | 0/3 |
| `gpt-oss-20b` | fact | right | 3/3 |
| `ministral-8b-2512` | fact | right | 3/3 |
| `qwen3.5-9b #reasoning-off` | fact | right | 2/3 |
| `qwen3.5-9b` |  | **cut off** | 0/1 |
| `gemma-4-31b-it` | fact | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | fact | right | 1/1 |
| `llama-4-maverick` | fact | right | 3/3 |
| `deepseek-v4.1-flash #reasoning-off` | fact | right | 3/3 |
| `deepseek-v4.1-flash` | fact | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | fact | right | 3/3 |
| `qwen3.5-397b-a17b` | fact | right | 1/1 |
| `mistral-large-4-0` | fact | right | 1/1 |
| `gpt-6-luna` | fact | right | 3/3 |
| `gpt-6-luna #reasoning-on` | fact | right | 1/1 |
| `gemini-3.5-flash-lite` | fact | right | 3/3 |
| `claude-haiku-5.5` | fact | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | fact | right | 1/1 |
| `gpt-6.1-terra` | fact | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | fact | right | 1/1 |

### s-1110T1836

```
Vicky's weather desk full check: IPMA's two red warnings for Lisbon unchanged since 17:42 (wind 12:00 to 21:00, rain 12:00 to 18:00); no Web Summit change
Source(s): github.com ; desks/weather-vicky/live.md (snapshot data/2026-11-10T1836Z.json); address:  (internal record (public repository); its primary is https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json; read 02:15, by incident.researcher@)
```

Scored against: `{"label":"fact"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T1836 (label)`. The row: [s-1110T1836](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1836).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | fact | right | 3/3 |
| `gpt-oss-20b` | fact | right | 3/3 |
| `ministral-8b-2512` | fact | right | 3/3 |
| `qwen3.5-9b #reasoning-off` | fact | right | 3/3 |
| `qwen3.5-9b` | fact | right | 1/1 |
| `gemma-4-31b-it` | fact | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | fact | right | 1/1 |
| `llama-4-maverick` | fact | right | 3/3 |
| `deepseek-v4.1-flash #reasoning-off` | fact | right | 3/3 |
| `deepseek-v4.1-flash` | fact | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | fact | right | 3/3 |
| `qwen3.5-397b-a17b` | fact | right | 1/1 |
| `mistral-large-4-0` | fact | right | 1/1 |
| `gpt-6-luna` | fact | right | 3/3 |
| `gpt-6-luna #reasoning-on` | fact | right | 1/1 |
| `gemini-3.5-flash-lite` | fact | right | 3/3 |
| `claude-haiku-5.5` | fact | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | fact | right | 1/1 |
| `gpt-6.1-terra` | fact | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | fact | right | 1/1 |

### s-1110T1858

```
Lead handed over: incident.conductor@web-summit.dinis takes the lead of WS-214 from conductor@web-summit.dinis, at Dinis's word (team/incidents/BRIEF.md); the timeline is kept newest first from here
Source(s): github.com ; this folder; BRIEF.md; address:  (internal record (public repository); read 02:15, by incident.researcher@)
```

Scored against: `{"label":"evidence"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T1858 (label)`. The row: [s-1110T1858](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1858).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | fact | **wrong** | 0/3 |
| `gpt-oss-20b` | fact | **wrong** | 0/3 |
| `ministral-8b-2512` | fact | **wrong** | 0/3 |
| `qwen3.5-9b #reasoning-off` | fact | **wrong** | 0/3 |
| `qwen3.5-9b` | fact | **wrong** | 0/1 |
| `gemma-4-31b-it` | fact | **wrong** | 0/3 |
| `gemma-4-31b-it #reasoning-on` | fact | **wrong** | 0/1 |
| `llama-4-maverick` | fact | **wrong** | 0/3 |
| `deepseek-v4.1-flash #reasoning-off` | fact | **wrong** | 0/3 |
| `deepseek-v4.1-flash` | fact | **wrong** | 0/1 |
| `qwen3.5-397b-a17b #reasoning-off` | fact | **wrong** | 0/3 |
| `qwen3.5-397b-a17b` | fact | **wrong** | 0/1 |
| `mistral-large-4-0` | fact | **wrong** | 0/1 |
| `gpt-6-luna` | fact | **wrong** | 0/3 |
| `gpt-6-luna #reasoning-on` | fact | **wrong** | 0/1 |
| `gemini-3.5-flash-lite` | fact | **wrong** | 0/3 |
| `claude-haiku-5.5` | fact | **wrong** | 0/3 |
| `claude-haiku-5.5 #reasoning-on` | fact | **wrong** | 0/1 |
| `gpt-6.1-terra` | fact | **wrong** | 0/3 |
| `gpt-6.1-terra #reasoning-on` | fact | **wrong** | 0/1 |

### s-1110T1901

```
No Web Summit decision on Wednesday found (organiser channels readable without a login)
Source(s): github.com ; websummit.com ; websummit.com ; websummit.com ; incident.researcher@, data/decisions/ (145a2b8); address: , , ,  (internal record + primary channels read (negative finding); read 19:01, by incident.researcher@)
```

Scored against: `{"label":"fact"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T1901 (label)`. The row: [s-1110T1901](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1901).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | fact | right | 3/3 |
| `gpt-oss-20b` | fact | right | 3/3 |
| `ministral-8b-2512` | fact | right | 3/3 |
| `qwen3.5-9b #reasoning-off` | evidence | **wrong** | 1/3 |
| `qwen3.5-9b` | fact | right | 1/1 |
| `gemma-4-31b-it` | fact | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | fact | right | 1/1 |
| `llama-4-maverick` | fact | right | 3/3 |
| `deepseek-v4.1-flash #reasoning-off` | fact | right | 3/3 |
| `deepseek-v4.1-flash` | fact | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | fact | right | 3/3 |
| `qwen3.5-397b-a17b` | fact | right | 1/1 |
| `mistral-large-4-0` | fact | right | 1/1 |
| `gpt-6-luna` | fact | right | 3/3 |
| `gpt-6-luna #reasoning-on` | fact | right | 1/1 |
| `gemini-3.5-flash-lite` | fact | right | 3/3 |
| `claude-haiku-5.5` | fact | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | fact | right | 1/1 |
| `gpt-6.1-terra` | fact | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | fact | right | 1/1 |

### s-1110T1905

```
No Web Summit decision on Wednesday: websummit.com (home, /news/, sitemap), its official Bluesky (last post 17:36, "wrap on Day 1") and Jornal de Negócios live (last entry 18:24)
Source(s): websummit.com ; websummit.com ; websummit.com ; public.api.bsky.app ; incident.researcher@ (message to the lead, 19:06); address: , , ,  (primary channels read (negative finding); read 19:05, by incident.researcher@)
```

Scored against: `{"label":"fact"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T1905 (label)`. The row: [s-1110T1905](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1905).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | fact | right | 3/3 |
| `gpt-oss-20b` | fact | right | 3/3 |
| `ministral-8b-2512` | fact | right | 3/3 |
| `qwen3.5-9b #reasoning-off` | evidence | **wrong** | 0/3 |
| `qwen3.5-9b` | evidence | **wrong** | 0/1 |
| `gemma-4-31b-it` | fact | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | fact | right | 1/1 |
| `llama-4-maverick` | fact | right | 3/3 |
| `deepseek-v4.1-flash #reasoning-off` | fact | right | 3/3 |
| `deepseek-v4.1-flash` | fact | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | fact | right | 3/3 |
| `qwen3.5-397b-a17b` | fact | right | 1/1 |
| `mistral-large-4-0` | fact | right | 1/1 |
| `gpt-6-luna` | fact | right | 3/3 |
| `gpt-6-luna #reasoning-on` | fact | right | 1/1 |
| `gemini-3.5-flash-lite` | fact | right | 3/3 |
| `claude-haiku-5.5` | fact | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | fact | right | 1/1 |
| `gpt-6.1-terra` | fact | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | fact | right | 1/1 |

### s-1110T1905b

```
worst window Wed 12:00 to 18:00, peak most likely ~15:00 to 19:00 around the wind's swing to north-west, easing but dangerous to 21:00; red wind was known ~27.5 h ahead; confidence medium on the window, low on the peak
Source(s): storm-charles.promptugal.news ; data/weather/analysis.md (from IPMA warnings, communiqué no. 2, LPPT TAF, IPMA model, read 19:01); address:  (internal analysis; read 02:15, by incident.researcher@)
```

Scored against: `{"label":"hypothesis"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T1905b (label)`. The row: [s-1110T1905b](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1905b).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | hypothesis | right | 3/3 |
| `gpt-oss-20b` | fact | **wrong** | 2/3 |
| `ministral-8b-2512` | hypothesis | right | 3/3 |
| `qwen3.5-9b #reasoning-off` | hypothesis | right | 3/3 |
| `qwen3.5-9b` | hypothesis | right | 1/1 |
| `gemma-4-31b-it` | hypothesis | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | hypothesis | right | 1/1 |
| `llama-4-maverick` | hypothesis | right | 3/3 |
| `deepseek-v4.1-flash #reasoning-off` | hypothesis | right | 3/3 |
| `deepseek-v4.1-flash` | hypothesis | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | hypothesis | right | 3/3 |
| `qwen3.5-397b-a17b` | hypothesis | right | 1/1 |
| `mistral-large-4-0` | hypothesis | right | 1/1 |
| `gpt-6-luna` | hypothesis | right | 3/3 |
| `gpt-6-luna #reasoning-on` | hypothesis | right | 1/1 |
| `gemini-3.5-flash-lite` | hypothesis | right | 3/3 |
| `claude-haiku-5.5` | hypothesis | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | hypothesis | right | 1/1 |
| `gpt-6.1-terra` | hypothesis | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | hypothesis | right | 1/1 |

### s-1110T1909

```
Web Summit's own page, "Important event update": "Day 2 (Wednesday, November 11th) will not take place"; "Web Summit aims to proceed with Day 3 (Thursday, November 12) as planned, following the passing of Storm Charles"; reasons: tidal flooding, disruption to public transport, high winds on external structures; "Web Summit will communicate directly with those impacted". Under /blog/web-summit/, not in the news list; we did not watch that path
Source(s): websummit.com ; (page data: published 19:09:00, modified 19:25:44; found by social.watch@PrompTugal.dinis, read at source by the lead 20:58)
```

Scored against: `{"label":"fact"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T1909 (label)`. The row: [s-1110T1909](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1909).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | hypothesis | **wrong** | 0/3 |
| `gpt-oss-20b` | fact | right | 3/3 |
| `ministral-8b-2512` | evidence | **wrong** | 0/3 |
| `qwen3.5-9b #reasoning-off` | evidence | **wrong** | 0/3 |
| `qwen3.5-9b` | evidence | **wrong** | 0/1 |
| `gemma-4-31b-it` | fact | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | fact | right | 1/1 |
| `llama-4-maverick` | evidence | **wrong** | 0/3 |
| `deepseek-v4.1-flash #reasoning-off` | fact | right | 3/3 |
| `deepseek-v4.1-flash` | fact | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | evidence | **wrong** | 0/3 |
| `qwen3.5-397b-a17b` | fact | right | 1/1 |
| `mistral-large-4-0` | fact | right | 1/1 |
| `gpt-6-luna` | fact | right | 3/3 |
| `gpt-6-luna #reasoning-on` | fact | right | 1/1 |
| `gemini-3.5-flash-lite` | fact | right | 3/3 |
| `claude-haiku-5.5` | fact | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | fact | right | 1/1 |
| `gpt-6.1-terra` | fact | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | fact | right | 1/1 |

### s-1110T1941

```
Web Summit closed on Wednesday after talks with the government, ANEPC and PSP; the mayor calls it the most sensible decision
Source(s): ECO ; via social.watch@PrompTugal.dinis (sweep 2)
```

Scored against: `{"label":"evidence"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T1941 (label)`. The row: [s-1110T1941](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1941).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | fact | **wrong** | 0/3 |
| `gpt-oss-20b` | evidence | right | 3/3 |
| `ministral-8b-2512` | evidence | right | 3/3 |
| `qwen3.5-9b #reasoning-off` | evidence | right | 3/3 |
| `qwen3.5-9b` | evidence | right | 1/1 |
| `gemma-4-31b-it` | evidence | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | evidence | right | 1/1 |
| `llama-4-maverick` | evidence | right | 3/3 |
| `deepseek-v4.1-flash #reasoning-off` | evidence | right | 3/3 |
| `deepseek-v4.1-flash` | evidence | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | evidence | right | 3/3 |
| `qwen3.5-397b-a17b` | evidence | right | 1/1 |
| `mistral-large-4-0` | evidence | right | 1/1 |
| `gpt-6-luna` | evidence | right | 3/3 |
| `gpt-6-luna #reasoning-on` | evidence | right | 1/1 |
| `gemini-3.5-flash-lite` | evidence | right | 3/3 |
| `claude-haiku-5.5` | evidence | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | evidence | right | 1/1 |
| `gpt-6.1-terra` | evidence | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | evidence | right | 1/1 |

### s-1110T1945

```
organisers cancel all of Wednesday's activities (coastal flooding, wind on outdoor structures, transport), after coordinating with the authorities
Source(s): Diário de Notícias, live ; via social.watch@PrompTugal.dinis (sweep 2)
```

Scored against: `{"label":"evidence"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T1945 (label)`. The row: [s-1110T1945](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1945).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | fact | **wrong** | 0/3 |
| `gpt-oss-20b` | evidence | right | 3/3 |
| `ministral-8b-2512` | fact | **wrong** | 0/3 |
| `qwen3.5-9b #reasoning-off` | evidence | right | 3/3 |
| `qwen3.5-9b` | evidence | right | 1/1 |
| `gemma-4-31b-it` | evidence | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | evidence | right | 1/1 |
| `llama-4-maverick` | evidence | right | 3/3 |
| `deepseek-v4.1-flash #reasoning-off` | evidence | right | 3/3 |
| `deepseek-v4.1-flash` | evidence | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | evidence | right | 3/3 |
| `qwen3.5-397b-a17b` | evidence | right | 1/1 |
| `mistral-large-4-0` | evidence | right | 1/1 |
| `gpt-6-luna` | evidence | right | 3/3 |
| `gpt-6-luna #reasoning-on` | evidence | right | 1/1 |
| `gemini-3.5-flash-lite` | evidence | right | 3/3 |
| `claude-haiku-5.5` | evidence | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | evidence | right | 1/1 |
| `gpt-6.1-terra` | evidence | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | evidence | right | 1/1 |

### s-1110T1952

```
Checked by the lead: websummit.com home and news list carry no notice of Day 2 (the notice was already up at /blog/web-summit/ since 19:09, a path we did not check)
Source(s): websummit.com ; websummit.com ; websummit.com ; websummit.com, read 19:52 by incident.conductor@; address: , ,  (primary; read 19:52, by incident.researcher@)
```

Scored against: `{"label":"fact"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T1952 (label)`. The row: [s-1110T1952](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1952).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | evidence | **wrong** | 0/3 |
| `gpt-oss-20b` | fact | right | 3/3 |
| `ministral-8b-2512` | fact | right | 3/3 |
| `qwen3.5-9b #reasoning-off` | evidence | **wrong** | 2/3 |
| `qwen3.5-9b` | fact | right | 1/1 |
| `gemma-4-31b-it` | fact | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | fact | right | 1/1 |
| `llama-4-maverick` | fact | right | 3/3 |
| `deepseek-v4.1-flash #reasoning-off` | fact | right | 3/3 |
| `deepseek-v4.1-flash` | fact | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | fact | right | 3/3 |
| `qwen3.5-397b-a17b` | fact | right | 1/1 |
| `mistral-large-4-0` | fact | right | 1/1 |
| `gpt-6-luna` | fact | right | 3/3 |
| `gpt-6-luna #reasoning-on` | fact | right | 1/1 |
| `gemini-3.5-flash-lite` | fact | right | 3/3 |
| `claude-haiku-5.5` | fact | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | fact | right | 1/1 |
| `gpt-6.1-terra` | fact | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | fact | right | 1/1 |

### s-1110T2008

```
organisers will contact those affected directly; not said whether Wednesday's programme is cancelled or moved (N6 still open)
Source(s): Observador ; via social.watch@ (sweep 3)
```

Scored against: `{"label":"evidence"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T2008 (label)`. The row: [s-1110T2008](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T2008).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | hypothesis | **wrong** | 0/3 |
| `gpt-oss-20b` | evidence | right | 3/3 |
| `ministral-8b-2512` | evidence | right | 3/3 |
| `qwen3.5-9b #reasoning-off` | evidence | right | 3/3 |
| `qwen3.5-9b` | evidence | right | 1/1 |
| `gemma-4-31b-it` | evidence | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | evidence | right | 1/1 |
| `llama-4-maverick` | evidence | right | 3/3 |
| `deepseek-v4.1-flash #reasoning-off` | evidence | right | 3/3 |
| `deepseek-v4.1-flash` | evidence | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | evidence | right | 3/3 |
| `qwen3.5-397b-a17b` | evidence | right | 1/1 |
| `mistral-large-4-0` | evidence | right | 1/1 |
| `gpt-6-luna` | evidence | right | 3/3 |
| `gpt-6-luna #reasoning-on` | evidence | right | 1/1 |
| `gemini-3.5-flash-lite` | evidence | right | 3/3 |
| `claude-haiku-5.5` | evidence | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | evidence | right | 1/1 |
| `gpt-6.1-terra` | evidence | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | evidence | right | 1/1 |

### s-1110T2030

```
the cancellation in the international press (PT and EN); coast and riverside access prohibited Wednesday; nothing on refunds or PITCH
Source(s): Euronews EN ; PT ; via social.watch@ (sweep 3)
```

Scored against: `{"label":"evidence"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T2030 (label)`. The row: [s-1110T2030](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T2030).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | fact | **wrong** | 2/3 |
| `gpt-oss-20b` | evidence | right | 3/3 |
| `ministral-8b-2512` | evidence | right | 3/3 |
| `qwen3.5-9b #reasoning-off` | evidence | right | 3/3 |
| `qwen3.5-9b` | evidence | right | 1/1 |
| `gemma-4-31b-it` | evidence | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | evidence | right | 1/1 |
| `llama-4-maverick` | evidence | right | 3/3 |
| `deepseek-v4.1-flash #reasoning-off` | evidence | right | 3/3 |
| `deepseek-v4.1-flash` | evidence | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | evidence | right | 3/3 |
| `qwen3.5-397b-a17b` |  | **malformed** | 0/1 |
| `mistral-large-4-0` | evidence | right | 1/1 |
| `gpt-6-luna` | evidence | right | 3/3 |
| `gpt-6-luna #reasoning-on` | evidence | right | 1/1 |
| `gemini-3.5-flash-lite` | evidence | right | 3/3 |
| `claude-haiku-5.5` | evidence | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | evidence | right | 1/1 |
| `gpt-6.1-terra` | evidence | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | evidence | right | 1/1 |

### s-1110T2115

```
The incident moves to its own site: https://storm-charles.promptugal.news (this repository); first push to served 23 s (v0.1.2), against 3 to 10 minutes on web-summit.sgit.ai
Source(s): storm-charles.promptugal.news ; incident.conductor@, at Dinis's word; address:  (the site itself; read 02:15, by incident.researcher@)
```

Scored against: `{"label":"evidence"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T2115 (label)`. The row: [s-1110T2115](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T2115).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | fact | right | 1/3 |
| `gpt-oss-20b` | fact | right | 1/3 |
| `ministral-8b-2512` | fact | right | 1/3 |
| `qwen3.5-9b #reasoning-off` | evidence | **wrong** | 2/3 |
| `qwen3.5-9b` |  | **cut off** | 0/1 |
| `gemma-4-31b-it` | fact | right | 1/3 |
| `gemma-4-31b-it #reasoning-on` | fact | **wrong** | 0/1 |
| `llama-4-maverick` | fact | right | 1/3 |
| `deepseek-v4.1-flash #reasoning-off` | fact | **wrong** | 0/3 |
| `deepseek-v4.1-flash` | fact | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | fact | right | 1/3 |
| `qwen3.5-397b-a17b` | fact | right | 1/1 |
| `mistral-large-4-0` | fact | right | 1/1 |
| `gpt-6-luna` | evidence | **wrong** | 0/3 |
| `gpt-6-luna #reasoning-on` | fact | **wrong** | 0/1 |
| `gemini-3.5-flash-lite` | fact | right | 1/3 |
| `claude-haiku-5.5` | evidence | **wrong** | 0/3 |
| `claude-haiku-5.5 #reasoning-on` | fact | **wrong** | 0/1 |
| `gpt-6.1-terra` | evidence | **wrong** | 1/3 |
| `gpt-6.1-terra #reasoning-on` | fact | **wrong** | 0/1 |

### s-1110T2118

```
IPMA's hourly model changed its values (same 07:55 stamp): Wednesday's strongest mean wind now 23 km/h at 20:00 (was 49 at 18:00); the swing to north 18:00; peak most likely 17:00 to 20:00 (was 15:00 to 19:00); worst window 12:00 to 18:00 and end 21:00 unchanged; IPMA's red warnings unchanged and outrank one model
Source(s): storm-charles.promptugal.news ; data/weather/analysis.md section 4 (1b936db20); address:  (internal analysis; read 02:15, by incident.researcher@)
```

Scored against: `{"label":"hypothesis"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T2118 (label)`. The row: [s-1110T2118](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T2118).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | fact | **wrong** | 0/3 |
| `gpt-oss-20b` | fact | **wrong** | 0/3 |
| `ministral-8b-2512` | hypothesis | right | 3/3 |
| `qwen3.5-9b #reasoning-off` | evidence | **wrong** | 1/3 |
| `qwen3.5-9b` |  | **cut off** | 0/1 |
| `gemma-4-31b-it` | hypothesis | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | hypothesis | right | 1/1 |
| `llama-4-maverick` | fact | **wrong** | 0/3 |
| `deepseek-v4.1-flash #reasoning-off` | hypothesis | right | 3/3 |
| `deepseek-v4.1-flash` | hypothesis | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | hypothesis | right | 3/3 |
| `qwen3.5-397b-a17b` | hypothesis | right | 1/1 |
| `mistral-large-4-0` | hypothesis | right | 1/1 |
| `gpt-6-luna` | hypothesis | right | 3/3 |
| `gpt-6-luna #reasoning-on` | hypothesis | right | 1/1 |
| `gemini-3.5-flash-lite` | fact | **wrong** | 0/3 |
| `claude-haiku-5.5` | hypothesis | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | hypothesis | right | 1/1 |
| `gpt-6.1-terra` | hypothesis | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | hypothesis | right | 1/1 |

### s-1110T2132

```
Web Summit's blog listing shows the update post modified 20:06; its text unchanged on Day 2 and Day 3 ("aims to proceed")
Source(s): websummit.com ; websummit.com ; storm-charles.promptugal.news ; websummit.com, incident.dev@'s 2-min watch (data/watch/websummit.json); address: , ,  (primary; read 01:36, by incident.researcher@)
```

Scored against: `{"label":"fact"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T2132 (label)`. The row: [s-1110T2132](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T2132).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | fact | right | 1/3 |
| `gpt-oss-20b` | fact | right | 3/3 |
| `ministral-8b-2512` | evidence | **wrong** | 2/3 |
| `qwen3.5-9b #reasoning-off` | evidence | **wrong** | 0/3 |
| `qwen3.5-9b` |  | **cut off** | 0/1 |
| `gemma-4-31b-it` | fact | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | fact | right | 1/1 |
| `llama-4-maverick` | fact | right | 3/3 |
| `deepseek-v4.1-flash #reasoning-off` | fact | right | 3/3 |
| `deepseek-v4.1-flash` | fact | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | evidence | **wrong** | 2/3 |
| `qwen3.5-397b-a17b` | fact | right | 1/1 |
| `mistral-large-4-0` | fact | right | 1/1 |
| `gpt-6-luna` | fact | right | 3/3 |
| `gpt-6-luna #reasoning-on` | fact | right | 1/1 |
| `gemini-3.5-flash-lite` | fact | right | 3/3 |
| `claude-haiku-5.5` | fact | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | fact | right | 1/1 |
| `gpt-6.1-terra` | fact | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | fact | right | 1/1 |

### s-1110T2153

```
No further statement from Web Summit (social.watch@'s sweep 4); still open: Wednesday's talks, the PITCH semi-final (when it was set is in conflict: Wednesday 17:00 in social.watch@'s summary, unsourced there; Thursday in Tech Times' preview of 9 Nov), side events (Web Summit's own Night Summit still listed for Wednesday 18:00 to 00:00, no notice, 22:05), tickets
Source(s): github.com ; websummit.com ; public.api.bsky.app ; social.watch@PrompTugal.dinis, sweep 4 (21:51 to 21:53); incident.researcher@ (22:05); address: , ,  (internal record + primary channels read (negative finding); read 22:05, by incident.researcher@)
```

Scored against: `{"label":"fact"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T2153 (label)`. The row: [s-1110T2153](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T2153).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | hypothesis | **wrong** | 0/3 |
| `gpt-oss-20b` | fact | right | 3/3 |
| `ministral-8b-2512` | evidence | **wrong** | 0/3 |
| `qwen3.5-9b #reasoning-off` | evidence | **wrong** | 0/3 |
| `qwen3.5-9b` |  | **cut off** | 0/1 |
| `gemma-4-31b-it` | hypothesis | **wrong** | 0/3 |
| `gemma-4-31b-it #reasoning-on` | fact | right | 1/1 |
| `llama-4-maverick` | fact | right | 3/3 |
| `deepseek-v4.1-flash #reasoning-off` | fact | right | 3/3 |
| `deepseek-v4.1-flash` | fact | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | evidence | **wrong** | 1/3 |
| `qwen3.5-397b-a17b` |  | **cut off** | 0/1 |
| `mistral-large-4-0` |  | **cut off** | 0/1 |
| `gpt-6-luna` | hypothesis | **wrong** | 2/3 |
| `gpt-6-luna #reasoning-on` | fact | right | 1/1 |
| `gemini-3.5-flash-lite` | hypothesis | **wrong** | 2/3 |
| `claude-haiku-5.5` | evidence | **wrong** | 2/3 |
| `claude-haiku-5.5 #reasoning-on` | fact | right | 1/1 |
| `gpt-6.1-terra` | evidence | **wrong** | 2/3 |
| `gpt-6.1-terra #reasoning-on` | fact | right | 1/1 |

### s-1110T2220

```
IPMA's move of Lisbon's red rain to 09:00 (sent 21:23) was relayed in public by VOST Portugal, a volunteers' association, 57 minutes after IPMA sent it; no press title we read had it by 00:15 (row s-1111T0015 stands for the press)
Source(s): VOST Portugal on Bluesky ; read 02:2x on 11 Nov by incident.social@
```

Scored against: `{"label":"evidence"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T2220 (label)`. The row: [s-1110T2220](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T2220).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | evidence | right | 3/3 |
| `gpt-oss-20b` | evidence | right | 3/3 |
| `ministral-8b-2512` | evidence | right | 3/3 |
| `qwen3.5-9b #reasoning-off` | evidence | right | 3/3 |
| `qwen3.5-9b` |  | **cut off** | 0/1 |
| `gemma-4-31b-it` | evidence | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | evidence | right | 1/1 |
| `llama-4-maverick` | evidence | right | 3/3 |
| `deepseek-v4.1-flash #reasoning-off` | evidence | right | 3/3 |
| `deepseek-v4.1-flash` | evidence | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | evidence | right | 3/3 |
| `qwen3.5-397b-a17b` | evidence | right | 1/1 |
| `mistral-large-4-0` | evidence | right | 1/1 |
| `gpt-6-luna` | evidence | right | 3/3 |
| `gpt-6-luna #reasoning-on` | evidence | right | 1/1 |
| `gemini-3.5-flash-lite` | evidence | right | 3/3 |
| `claude-haiku-5.5` | evidence | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | evidence | right | 1/1 |
| `gpt-6.1-terra` | evidence | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | evidence | right | 1/1 |

### s-1110T2229

```
Lusa reports traffic without restrictions on the Vasco da Gama and 25 de Abril bridges. Read with row s-1110T1425 (both limited to 60 km/h, from the press at 14:48) this is a sequence, not a conflict: the limit was lifted by 22:29 (the researcher's reading; decision edges bridges-60 and bridges-lifted). Neither step is confirmed at Lusoponte, whose site has not answered our hourly tries; what holds on Wednesday under the red wind is not announced
Source(s): Lusa on Bluesky ; read 02:2x on 11 Nov by incident.social@
```

Scored against: `{"label":"evidence"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T2229 (label)`. The row: [s-1110T2229](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T2229).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | hypothesis | **wrong** | 0/3 |
| `gpt-oss-20b` | fact | **wrong** | 0/3 |
| `ministral-8b-2512` | evidence | right | 2/3 |
| `qwen3.5-9b #reasoning-off` | hypothesis | **wrong** | 1/3 |
| `qwen3.5-9b` | hypothesis | **wrong** | 0/1 |
| `gemma-4-31b-it` | hypothesis | **wrong** | 0/3 |
| `gemma-4-31b-it #reasoning-on` | hypothesis | **wrong** | 0/1 |
| `llama-4-maverick` | evidence | right | 3/3 |
| `deepseek-v4.1-flash #reasoning-off` | evidence | right | 2/3 |
| `deepseek-v4.1-flash` | hypothesis | **wrong** | 0/1 |
| `qwen3.5-397b-a17b #reasoning-off` | evidence | right | 2/3 |
| `qwen3.5-397b-a17b` | evidence | right | 1/1 |
| `mistral-large-4-0` | hypothesis | **wrong** | 0/1 |
| `gpt-6-luna` | hypothesis | **wrong** | 0/3 |
| `gpt-6-luna #reasoning-on` | hypothesis | **wrong** | 0/1 |
| `gemini-3.5-flash-lite` | hypothesis | **wrong** | 0/3 |
| `claude-haiku-5.5` | hypothesis | **wrong** | 0/3 |
| `claude-haiku-5.5 #reasoning-on` | hypothesis | **wrong** | 0/1 |
| `gpt-6.1-terra` | hypothesis | **wrong** | 0/3 |
| `gpt-6.1-terra #reasoning-on` | hypothesis | **wrong** | 0/1 |

### s-1110T2323

```
The first airport TAF covering Thursday (issued 23:00) is weaker than 17:00's: Wed 09:00 to 16:00 at times 30 kt gusting 45 (83 km/h); 30% chance (was 40%) of 58 kt thunderstorm gusts 10:00 to 18:00; west 12 kt from 18:00 to 20:00; Thursday 00:00 to 06:00 west 12 kt, no gusts. IPMA's red warnings unchanged
Source(s): aviationweather.gov ; LPPT TAF (IPMA, via NOAA's Aviation Weather), data/weather/airport.json (incident.meteorologist@, a63ac9696); address:  (primary (as read by incident.meteorologist@), by incident.researcher@)
```

Scored against: `{"label":"fact"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T2323 (label)`. The row: [s-1110T2323](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T2323).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | fact | right | 3/3 |
| `gpt-oss-20b` | fact | right | 3/3 |
| `ministral-8b-2512` | fact | right | 3/3 |
| `qwen3.5-9b #reasoning-off` | evidence | **wrong** | 0/3 |
| `qwen3.5-9b` |  | **cut off** | 0/1 |
| `gemma-4-31b-it` | fact | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | fact | right | 1/1 |
| `llama-4-maverick` | fact | right | 3/3 |
| `deepseek-v4.1-flash #reasoning-off` | fact | right | 3/3 |
| `deepseek-v4.1-flash` |  | **cut off** | 0/1 |
| `qwen3.5-397b-a17b #reasoning-off` | fact | right | 3/3 |
| `qwen3.5-397b-a17b` | fact | right | 1/1 |
| `mistral-large-4-0` | fact | right | 1/1 |
| `gpt-6-luna` | fact | right | 1/3 |
| `gpt-6-luna #reasoning-on` | hypothesis | **wrong** | 0/1 |
| `gemini-3.5-flash-lite` | fact | right | 3/3 |
| `claude-haiku-5.5` | evidence | **wrong** | 1/3 |
| `claude-haiku-5.5 #reasoning-on` | fact | right | 1/1 |
| `gpt-6.1-terra` | hypothesis | **wrong** | 1/3 |
| `gpt-6.1-terra #reasoning-on` | hypothesis | **wrong** | 0/1 |

### s-1110T2324

```
the TAF's peak (09:00 to 16:00) and IPMA's model peak (19:00 to 20:00) disagree, so the peak is widened back to 12:00 to 18:00; end 21:00; Thursday morning behind the storm, medium confidence; a weaker airport forecast is not a downgrade of IPMA's warning
Source(s): storm-charles.promptugal.news ; data/weather/analysis.md section 5; address:  (internal analysis; read 02:15, by incident.researcher@)
```

Scored against: `{"label":"hypothesis"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T2324 (label)`. The row: [s-1110T2324](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T2324).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | hypothesis | right | 3/3 |
| `gpt-oss-20b` | hypothesis | right | 3/3 |
| `ministral-8b-2512` | hypothesis | right | 3/3 |
| `qwen3.5-9b #reasoning-off` | hypothesis | right | 3/3 |
| `qwen3.5-9b` | hypothesis | right | 1/1 |
| `gemma-4-31b-it` | hypothesis | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | hypothesis | right | 1/1 |
| `llama-4-maverick` | hypothesis | right | 3/3 |
| `deepseek-v4.1-flash #reasoning-off` | hypothesis | right | 3/3 |
| `deepseek-v4.1-flash` | hypothesis | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | hypothesis | right | 3/3 |
| `qwen3.5-397b-a17b` | hypothesis | right | 1/1 |
| `mistral-large-4-0` | hypothesis | right | 1/1 |
| `gpt-6-luna` | hypothesis | right | 3/3 |
| `gpt-6-luna #reasoning-on` | hypothesis | right | 1/1 |
| `gemini-3.5-flash-lite` | hypothesis | right | 3/3 |
| `claude-haiku-5.5` | hypothesis | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | hypothesis | right | 1/1 |
| `gpt-6.1-terra` | hypothesis | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | hypothesis | right | 1/1 |

### s-1110T2353

```
IPMA moved Lisbon's red rain warning three hours earlier: Wednesday 09:00 to 18:00 (was 12:00 to 18:00; supersedes s-1110T1742); orange rain now 00:00 to 09:00; red wind unchanged (12:00 to 21:00). IPMA sent the change at 21:23 (its CAP message); its open-data feed showed it only from the 23:51 read
Source(s): IPMA warnings open data ; read at source by the lead 23:53; MeteoAlarm's CAP feed (data/weather/cap.json, incident.meteorologist@, 169445ff3)
```

Scored against: `{"label":"fact"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T2353 (label)`. The row: [s-1110T2353](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T2353).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | fact | right | 3/3 |
| `gpt-oss-20b` | fact | right | 3/3 |
| `ministral-8b-2512` | fact | right | 3/3 |
| `qwen3.5-9b #reasoning-off` | fact | right | 3/3 |
| `qwen3.5-9b` | fact | right | 1/1 |
| `gemma-4-31b-it` | fact | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | fact | right | 1/1 |
| `llama-4-maverick` | fact | right | 3/3 |
| `deepseek-v4.1-flash #reasoning-off` | fact | right | 3/3 |
| `deepseek-v4.1-flash` | fact | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | fact | right | 3/3 |
| `qwen3.5-397b-a17b` | fact | right | 1/1 |
| `mistral-large-4-0` | fact | right | 1/1 |
| `gpt-6-luna` | fact | right | 3/3 |
| `gpt-6-luna #reasoning-on` | fact | right | 1/1 |
| `gemini-3.5-flash-lite` | fact | right | 3/3 |
| `claude-haiku-5.5` | fact | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | fact | right | 1/1 |
| `gpt-6.1-terra` | fact | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | fact | right | 1/1 |

### s-1110T2354

```
worst window now 09:00 to 18:00, the core 12:00 to 18:00 when both reds overlap; over by 21:00. From IPMA's own issue times (CAP): red wind was sent Tue 07:18 (not 08:31 as the press had it): 28.7 h ahead; red rain 19.5 h; the move to 09:00, 11.6 h
Source(s): storm-charles.promptugal.news ; data/weather/analysis.md section 6; address:  (internal analysis; read 02:15, by incident.researcher@)
```

Scored against: `{"label":"hypothesis"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T2354 (label)`. The row: [s-1110T2354](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T2354).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | fact | **wrong** | 0/3 |
| `gpt-oss-20b` | fact | **wrong** | 2/3 |
| `ministral-8b-2512` | hypothesis | right | 3/3 |
| `qwen3.5-9b #reasoning-off` | evidence | **wrong** | 2/3 |
| `qwen3.5-9b` |  | **malformed** | 0/1 |
| `gemma-4-31b-it` | hypothesis | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | hypothesis | right | 1/1 |
| `llama-4-maverick` | hypothesis | right | 2/3 |
| `deepseek-v4.1-flash #reasoning-off` | hypothesis | right | 3/3 |
| `deepseek-v4.1-flash` | hypothesis | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | hypothesis | right | 3/3 |
| `qwen3.5-397b-a17b` | hypothesis | right | 1/1 |
| `mistral-large-4-0` | hypothesis | right | 1/1 |
| `gpt-6-luna` | hypothesis | right | 3/3 |
| `gpt-6-luna #reasoning-on` | hypothesis | right | 1/1 |
| `gemini-3.5-flash-lite` | hypothesis | right | 3/3 |
| `claude-haiku-5.5` | hypothesis | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | hypothesis | right | 1/1 |
| `gpt-6.1-terra` | hypothesis | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | hypothesis | right | 1/1 |

### s-1110T2358

```
the press on Day 2 after Web Summit's 19:09 page: ECO and TEK 19:41 (32 min later), DN 19:49, Lusa via Notícias ao Minuto 20:01, Observador 20:08, Euronews 20:29, Expresso 20:39; Web Summit's Bluesky still silent on Day 2 at 23:51; 87 of 212 press items read carry Lusa's by-line, across 6 outlets. Limits: six outlets refuse automated reads and are absent, not silent
Source(s): storm-charles.promptugal.news ; research/media/coverage.json, ranking.md (incident.media@, 96ff00c); address:  (internal analysis; read 02:15, by incident.researcher@)
```

Scored against: `{"label":"hypothesis"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1110T2358 (label)`. The row: [s-1110T2358](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T2358).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | evidence | **wrong** | 0/3 |
| `gpt-oss-20b` | evidence | **wrong** | 0/3 |
| `ministral-8b-2512` | evidence | **wrong** | 0/3 |
| `qwen3.5-9b #reasoning-off` | evidence | **wrong** | 1/3 |
| `qwen3.5-9b` | evidence | **wrong** | 0/1 |
| `gemma-4-31b-it` | fact | **wrong** | 0/3 |
| `gemma-4-31b-it #reasoning-on` | fact | **wrong** | 0/1 |
| `llama-4-maverick` | fact | **wrong** | 0/3 |
| `deepseek-v4.1-flash #reasoning-off` | evidence | **wrong** | 1/3 |
| `deepseek-v4.1-flash` | evidence | **wrong** | 0/1 |
| `qwen3.5-397b-a17b #reasoning-off` | evidence | **wrong** | 2/3 |
| `qwen3.5-397b-a17b` | fact | **wrong** | 0/1 |
| `mistral-large-4-0` | fact | **wrong** | 0/1 |
| `gpt-6-luna` | fact | **wrong** | 0/3 |
| `gpt-6-luna #reasoning-on` | fact | **wrong** | 0/1 |
| `gemini-3.5-flash-lite` | fact | **wrong** | 2/3 |
| `claude-haiku-5.5` | evidence | **wrong** | 0/3 |
| `claude-haiku-5.5 #reasoning-on` | evidence | **wrong** | 0/1 |
| `gpt-6.1-terra` | fact | **wrong** | 1/3 |
| `gpt-6.1-terra #reasoning-on` | hypothesis | right | 1/1 |

### s-1111T0000

```
the official and model data are consistent with the centre passing very close to Lisbon at about 17:00 to 18:00 Wednesday, more likely just south of it (met.no's pressure minimum 986.7 hPa at 17:00 to 18:00 and a 160° wind swing in an hour; the guidance has moved). Against: IPMA's red wind unchanged, its track text already includes Lisbon, no communiqué no. 3, point models move. It does not lower the danger: the worst moves toward the passage, about 16:00 to 19:00, and a lull near the centre is not the end. Wednesday tests it: wind backing east then north and pressure near 987 hPa means it passed south
Source(s): storm-charles.promptugal.news ; data/weather/analysis.md section 7 (d6e8aace1); address:  (internal analysis; read 02:15, by incident.researcher@)
```

Scored against: `{"label":"hypothesis"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1111T0000 (label)`. The row: [s-1111T0000](../incidents/2026-11-10-storm-charles/timeline.html#s-1111T0000).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | hypothesis | right | 3/3 |
| `gpt-oss-20b` | hypothesis | right | 3/3 |
| `ministral-8b-2512` | hypothesis | right | 3/3 |
| `qwen3.5-9b #reasoning-off` | hypothesis | right | 3/3 |
| `qwen3.5-9b` | hypothesis | right | 1/1 |
| `gemma-4-31b-it` | hypothesis | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | hypothesis | right | 1/1 |
| `llama-4-maverick` | hypothesis | right | 3/3 |
| `deepseek-v4.1-flash #reasoning-off` | hypothesis | right | 3/3 |
| `deepseek-v4.1-flash` | hypothesis | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | hypothesis | right | 3/3 |
| `qwen3.5-397b-a17b` | hypothesis | right | 1/1 |
| `mistral-large-4-0` | hypothesis | right | 1/1 |
| `gpt-6-luna` | hypothesis | right | 3/3 |
| `gpt-6-luna #reasoning-on` | hypothesis | right | 1/1 |
| `gemini-3.5-flash-lite` | hypothesis | right | 3/3 |
| `claude-haiku-5.5` | hypothesis | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | hypothesis | right | 1/1 |
| `gpt-6.1-terra` | hypothesis | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | hypothesis | right | 1/1 |

### s-1111T0015

```
IPMA's move of Lisbon's red rain to 09:00 (sent 21:23) had not been reported by any article title or live-blog entry we could read by 00:15. Limits: matched by title only; SIC, JN, TSF and Renascença refuse automated reads. Who was first on the other facts: red wind (IPMA 07:18): DN live 08:05; Day 2 off (19:09): ECO and TEK 19:41
Source(s): storm-charles.promptugal.news ; research/media/first-on-each-fact.json, ranking.md (f487bfb); address:  (internal analysis; read 02:15, by incident.researcher@)
```

Scored against: `{"label":"hypothesis"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1111T0015 (label)`. The row: [s-1111T0015](../incidents/2026-11-10-storm-charles/timeline.html#s-1111T0015).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | fact | **wrong** | 0/3 |
| `gpt-oss-20b` | fact | **wrong** | 0/3 |
| `ministral-8b-2512` | fact | **wrong** | 0/3 |
| `qwen3.5-9b #reasoning-off` | evidence | **wrong** | 1/3 |
| `qwen3.5-9b` | fact | **wrong** | 0/1 |
| `gemma-4-31b-it` | fact | **wrong** | 2/3 |
| `gemma-4-31b-it #reasoning-on` | fact | **wrong** | 0/1 |
| `llama-4-maverick` | fact | **wrong** | 0/3 |
| `deepseek-v4.1-flash #reasoning-off` | hypothesis | right | 3/3 |
| `deepseek-v4.1-flash` | fact | **wrong** | 0/1 |
| `qwen3.5-397b-a17b #reasoning-off` | hypothesis | right | 3/3 |
| `qwen3.5-397b-a17b` | fact | **wrong** | 0/1 |
| `mistral-large-4-0` | fact | **wrong** | 0/1 |
| `gpt-6-luna` | fact | **wrong** | 1/3 |
| `gpt-6-luna #reasoning-on` | hypothesis | right | 1/1 |
| `gemini-3.5-flash-lite` | hypothesis | right | 1/3 |
| `claude-haiku-5.5` | fact | **wrong** | 0/3 |
| `claude-haiku-5.5 #reasoning-on` | fact | **wrong** | 0/1 |
| `gpt-6.1-terra` | hypothesis | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | hypothesis | right | 1/1 |

### s-1111T0146

```
Madeira, observed: 230.5 mm of rain in six hours at IPMA's station Areeiro (the hours 20:00 Tuesday to 01:00 Wednesday; 133.9 mm in the six hours to 22:00); next: Santo da Serra 124.4, Pico do Areeiro 123.9, Pico Alto 116.7 mm in six hours
Source(s): IPMA station observations ; data/weather/madeira.json (incident.meteorologist@, 8c822f847, read 01:46); prompted by pt.wikipedia's figure, verified at IPMA
```

Scored against: `{"label":"fact"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1111T0146 (label)`. The row: [s-1111T0146](../incidents/2026-11-10-storm-charles/timeline.html#s-1111T0146).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | fact | right | 3/3 |
| `gpt-oss-20b` | fact | right | 3/3 |
| `ministral-8b-2512` | fact | right | 3/3 |
| `qwen3.5-9b #reasoning-off` | evidence | **wrong** | 0/3 |
| `qwen3.5-9b` | fact | right | 1/1 |
| `gemma-4-31b-it` | fact | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | fact | right | 1/1 |
| `llama-4-maverick` | fact | right | 3/3 |
| `deepseek-v4.1-flash #reasoning-off` | fact | right | 3/3 |
| `deepseek-v4.1-flash` | fact | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | fact | right | 3/3 |
| `qwen3.5-397b-a17b` | fact | right | 1/1 |
| `mistral-large-4-0` | fact | right | 1/1 |
| `gpt-6-luna` | fact | right | 3/3 |
| `gpt-6-luna #reasoning-on` | fact | right | 1/1 |
| `gemini-3.5-flash-lite` | fact | right | 3/3 |
| `claude-haiku-5.5` | fact | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | fact | right | 1/1 |
| `gpt-6.1-terra` | fact | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | fact | right | 1/1 |

### s-1111T0228

```
The alert situation's legal text, read at source: Despacho n.º 13773-A/2026 (Diário da República n.º 218/2026, Suplemento, Série II, 10 November), by the Presidency of the Council of Ministers and nine ministries, under Lei 27/2006: in force 00:00 to 23:59 on 11 November, measures 2(a) to (e) and readiness measures 3(a) to (f). It suspends outdoor events (2(b)) and does not mention Web Summit: "formally advised" has no legal text; it remains the organisers' own wording (their page, 19:09) beside the government's recommendation reported at 17:53
Source(s): Diário da República, Despacho 13773-A/2026 ; read 02:28 by incident.researcher@ (the site is a JavaScript app; read with a browser)
```

Scored against: `{"label":"fact"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1111T0228 (label)`. The row: [s-1111T0228](../incidents/2026-11-10-storm-charles/timeline.html#s-1111T0228).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | fact | right | 3/3 |
| `gpt-oss-20b` | fact | right | 3/3 |
| `ministral-8b-2512` | fact | right | 3/3 |
| `qwen3.5-9b #reasoning-off` | fact | right | 3/3 |
| `qwen3.5-9b` | fact | right | 1/1 |
| `gemma-4-31b-it` | fact | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | fact | right | 1/1 |
| `llama-4-maverick` | fact | right | 3/3 |
| `deepseek-v4.1-flash #reasoning-off` | fact | right | 3/3 |
| `deepseek-v4.1-flash` | fact | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | fact | right | 3/3 |
| `qwen3.5-397b-a17b` | fact | right | 1/1 |
| `mistral-large-4-0` | fact | right | 1/1 |
| `gpt-6-luna` | fact | right | 3/3 |
| `gpt-6-luna #reasoning-on` | fact | right | 1/1 |
| `gemini-3.5-flash-lite` | fact | right | 3/3 |
| `claude-haiku-5.5` | fact | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | fact | right | 1/1 |
| `gpt-6.1-terra` | fact | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | fact | right | 1/1 |

### s-1111T0229

```
which side of Lisbon the centre passes is unsettled: "just south of Lisbon" drops to low confidence (was medium), because met.no's 01:19 run veers the wind through south to west with its strongest mean wind (56 to 58 km/h) at 14:00 to 15:00 and lowest pressure 987.7 hPa at 15:00, the pattern of a centre passing just north; IPMA's hourly model (an older run) and its forecasters on radio lean the other way. What holds across the inputs (medium confidence): the centre passes very close to Lisbon between about 15:00 and 18:00. The press headline "less wind for Lisbon" is not supported by these inputs. IPMA's red warnings for Lisbon stand; this is our analysis, not a forecast
Source(s): data/weather/analysis.md section 7b (7 and 7a kept, dated); met.no and IPMA figures in data/weather/forecast.json, read 01:19 and 02:22
```

Scored against: `{"label":"hypothesis"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1111T0229 (label)`. The row: [s-1111T0229](../incidents/2026-11-10-storm-charles/timeline.html#s-1111T0229).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | hypothesis | right | 3/3 |
| `gpt-oss-20b` | hypothesis | right | 3/3 |
| `ministral-8b-2512` | hypothesis | right | 3/3 |
| `qwen3.5-9b #reasoning-off` | hypothesis | right | 3/3 |
| `qwen3.5-9b` | hypothesis | right | 1/1 |
| `gemma-4-31b-it` | hypothesis | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | hypothesis | right | 1/1 |
| `llama-4-maverick` | hypothesis | right | 3/3 |
| `deepseek-v4.1-flash #reasoning-off` | hypothesis | right | 3/3 |
| `deepseek-v4.1-flash` | hypothesis | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | hypothesis | right | 3/3 |
| `qwen3.5-397b-a17b` | hypothesis | right | 1/1 |
| `mistral-large-4-0` | hypothesis | right | 1/1 |
| `gpt-6-luna` | hypothesis | right | 3/3 |
| `gpt-6-luna #reasoning-on` | hypothesis | right | 1/1 |
| `gemini-3.5-flash-lite` | hypothesis | right | 3/3 |
| `claude-haiku-5.5` | hypothesis | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | hypothesis | right | 1/1 |
| `gpt-6.1-terra` | hypothesis | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | hypothesis | right | 1/1 |

### s-1111T0238

```
Madeira airport, observed at 02:30: wind 67 km/h gusting 98 km/h (METAR LPMA 110230Z 22036G53KT 3000 RA), the highest gust in the last 30 hours of its reports (01:00: 59 gusting 78 km/h). A point observation on the south-east coast, not a warning area; IPMA's stations report mean wind only
Source(s): NOAA Aviation Weather Center, METAR LPMA, in data/weather/airport-madeira.json, read 02:38 by incident.meteorologist@
```

Scored against: `{"label":"fact"}`, from `incidents/2026-11-10-storm-charles/data/signals.json item s-1111T0238 (label)`. The row: [s-1111T0238](../incidents/2026-11-10-storm-charles/timeline.html#s-1111T0238).

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | fact | right | 3/3 |
| `gpt-oss-20b` | fact | right | 3/3 |
| `ministral-8b-2512` | fact | right | 3/3 |
| `qwen3.5-9b #reasoning-off` | fact | right | 2/3 |
| `qwen3.5-9b` |  | **cut off** | 0/1 |
| `gemma-4-31b-it` | fact | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | fact | right | 1/1 |
| `llama-4-maverick` | fact | right | 3/3 |
| `deepseek-v4.1-flash #reasoning-off` | fact | right | 3/3 |
| `deepseek-v4.1-flash` | fact | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | fact | right | 3/3 |
| `qwen3.5-397b-a17b` | fact | right | 1/1 |
| `mistral-large-4-0` | fact | right | 1/1 |
| `gpt-6-luna` | fact | right | 3/3 |
| `gpt-6-luna #reasoning-on` | fact | right | 1/1 |
| `gemini-3.5-flash-lite` | fact | right | 3/3 |
| `claude-haiku-5.5` | fact | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | evidence | **wrong** | 0/1 |
| `gpt-6.1-terra` | hypothesis | **wrong** | 0/3 |
| `gpt-6.1-terra #reasoning-on` | hypothesis | **wrong** | 0/1 |
