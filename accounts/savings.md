---
title: Where the savings are
summary: The largest costs first, what each agent could change, and the saving, measured or estimated and said to be which.
---
> Kept by incident.accountant@web-summit.dinis, 11 November 2026, 20:41 UTC

# Where the savings are

Round 22. 30 of 41 agents have measured their own sessions ([the table](index.md), [the lines](ledger/)); twenty-two of them have since handed over to a fresh session, so the first saving is measured on this team and not only estimated. The tables in items 1 and 5 to 7 are as read at 03:33 UTC; the team's total at 20:41 UTC is 3.26 billion tokens in 11,833 calls. Each item says **measured**, **estimated** (our arithmetic) or **hypothesis** (our analysis). Tokens are not turned into money.

## 1. Re-reading the session's context on every call is almost the whole cost (measured, 26 sessions)

| | Tokens | Share |
|---|---|---|
| Cache reads (the context, read again on each call) | 1,295,742,639 | 98.8% |
| Cache writes (what was new on each call) | 10,956,218 | 0.8% |
| Output (everything the agents wrote) | 4,447,848 | 0.3% |
| Fresh input | 8,186 | 0.0% |

1.31 billion tokens in 3,943 calls, read from the ledger at 03:33 UTC. WS-148's first finding (re-reading a long session's context on every call dominates) holds here without exception: every session starts at about 84,000 tokens before it reads anything, nothing but the conductor's has compacted, and the long sessions carry 300,000 to 770,000 tokens on every call. With cache reads weighted at a tenth (WS-148's weight, an estimate), they are still 89% of the team's cost.

The six largest sessions are 61% of it: conductor 327 million, designer 157 million, librarian 94 million, observability 84 million, graph 68 million, studio 65 million.

## 2. A fresh session, measured on twenty-one agents: 53% to 84% less per call

Twenty-one agents have handed over to a fresh session of themselves since 03:03 UTC, started from the librarian's pack and a hand-over note. Tokens per call, the old session's last hour against the new session (each agent's own lines in [the ledger](ledger/); the first three rows as read at 03:33 UTC, the next five at 04:36, the next three at 05:40, the next seven at 06:42, labs at 07:42, weather at 09:42, ipma at 10:43):

| Agent | Old session, calls | Old, tokens per call in its last hour | New session, calls | New, tokens per call | Less per call |
|---|---|---|---|---|---|
| designer | 332 | 761,832 | 33 | 125,417 | 84% |
| librarian | 220 | 596,917 | 58 | 153,786 | 74% |
| observability | 205 | 577,105 | 53 | 145,455 | 75% |
| graph | 192 | 559,318 | 50 | 161,621 | 71% |
| studio | 185 | 534,624 | 43 | 158,077 | 70% |
| weatherwatch | 159 | 527,988 | 35 | 154,880 | 71% |
| journalist | 87 | 374,302 | 38 | 142,791 | 62% |
| reporter | 72 | 306,046 | 36 | 143,045 | 53% |
| media | 184 | 528,449 | 24 | 115,478 | 78% |
| meteorology | 110 | 413,130 | 26 | 117,735 | 72% |
| entities | 172 | 461,665 | 39 | 145,425 | 69% |
| stories | 90 | 400,487 | 22 | 124,160 | 69% |
| board | 124 | 396,061 | 19 | 110,618 | 72% |
| wikipedia | 99 | 388,640 | 13 | 103,487 | 73% |
| identity | 134 | 382,268 | 24 | 119,122 | 69% |
| ci | 100 | 367,560 | 24 | 113,461 | 69% |
| social | 80 | 295,412 | 15 | 105,055 | 64% |
| accountant | 70 | 293,157 | 7 | 99,465 | 66% |
| labs | 90 | 362,809 | 28 | 149,512 | 59% |
| weather | 197 | 513,775 | 36 | 138,814 | 73% |
| ipma | 130 | 389,279 | 39 | 121,315 | 69% |

- **Measured.** The new sessions did real rounds (each line names its task and says its gate passed). They are young: their context grows again (the librarian's reached 208,291 after 58 calls), so the hand-over has to be repeated, not done once.
- **When to hand over (estimated):** the sessions here grow by about 2,000 to 3,500 tokens a call. A session that hands over every 50 to 60 calls stays under about 250,000 tokens a call; one that never does reaches 500,000 by its 200th.
- **The younger the old session, the smaller the gain:** the reporter handed over at 72 calls and saved 53%; the designer at 332 and saved 84%. The librarian has now handed over three times (at 220, 95 and 38 calls): its fourth session runs at 125,179 tokens a call, a fifth of its first session's last hour.
- **The whole team's call, hour by hour (measured, 05:40 UTC):** 328,460 tokens a call in the 02:00 hour (2,002 calls), 340,858 in the 03:00 hour (885 calls), 305,573 in the 04:00 hour (386 calls), 197,088 so far in the 05:00 hour (192 calls, 17 agents reporting). Correction: round 5 gave 286,658 for 03:00 and 201,429 for 04:00; those were read before the conductor's line for those hours arrived, and its calls (618,602 tokens each in the 04:00 hour) raised both. The fall is real from 05:00, not from 03:00.
- **The hours with and without the conductor (measured, 10:43 UTC).** Correction: every hourly figure in rounds 7 to 10 for 07:00 onward was read before the conductor's line for 06:42 to 09:42 UTC arrived, and so left its calls out. Tokens per call, the whole team, then everyone but the conductor, then the conductor alone:

  | Hour (UTC) | Team | Calls | Without the conductor | The conductor | Its share of the hour's tokens |
  |---|---|---|---|---|---|
  | 06:00 | 220,827 | 248 | 185,110 | 343,285 | 35% |
  | 07:00 | 252,970 | 295 | 193,510 | 421,310 | 43% |
  | 08:00 | 257,861 | 324 | 170,679 | 515,151 | 51% |
  | 09:00 | 295,306 | 709 | 189,288 | 665,028 | 50% |
  | 10:00 | 187,811 | 1,025 | 150,078 | 318,973 (after its third compaction) | 38% |
  | 11:00 | 231,999 | 570 | 161,389 | 508,351 | 45% |
  | 12:00 | 250,420 | 898 | 154,986 | 525,979 | 54% |
  | 13:00 (after the conductor's fourth compaction) | 178,593 | 464 | 158,647 | 252,129 | 30% |
  | 14:00 | 207,924 | 360 | 153,175 | 372,172 | 45% |
  | 15:00 | 234,227 | 335 | 154,437 | 465,250 | 51% |
  | 16:00 | 286,043 | 356 | 165,545 | 570,237 | 59% |
  | 17:00 | 332,393 | 177 | 216,413 | 644,089 | 53% |
  | 18:00 | 278,685 | 292 | 160,125 | 718,503 | 55% |
  | 19:00 (the conductor to 19:42, its fifth compaction before 19:24) | 236,099 | 223 | 176,196 | 372,643 | 48% |

  The hand-overs hold for the 28 other agents (170,000 to 194,000 a call since 06:00); the team's figure has risen since 06:00 because one session has grown from 346,000 to 692,000 tokens a call.
- **As read at 20:41 UTC:** the rows above. A quiet hour: 223 calls at 19:00 against 1,025 at 10:00, 38 filed so far for 20:00. Split of 19:00: the handed-over agents 143 calls at 148,394, the five first-session agents 12 at 507,495, the conductor 68 at 372,643. No hand-over since 19:41. Next to hand over (held for Dinis): archivist 532,967, shadow 517,440 (no line since 19:07), sources 489,041, perplexity 409,543 (none since 17:51), models 403,575 (none since 09:31); then media's third session, 249,038. The conductor: 128,704 at 19:42, no line since.
- **Added 19:44 UTC:** the conductor's line to 19:42: a fifth compaction just before 19:24 brought its last call to 128,704 tokens (2,635 calls, 1.21 billion tokens, 37.2% of 3.24 billion). Re-ranked, next to hand over: archivist 527,371, shadow 517,440, sources 484,055, perplexity 409,543, models 403,575 (held for Dinis, the conductor's word at 19:43); then media's third session, 240,802. The conductor grew about 100,000 a call an hour after its last compaction; at that rate it is back above 500,000 by about 23:00.
- **As read at 19:41 UTC:** the rows above, with the conductor's line to 18:42: 2,552 calls, 1.17 billion tokens, 36.5% of the team's; **736,167 tokens on its last call, no compaction since 13:09**, about half of every hour's tokens since 14:00. Split of the hours without it: the five first-session agents 23 calls at 451,269 (17:00), 16 at 497,184 (18:00); the rest 106 at 165,454 (17:00), 205 at 133,750 (18:00), the lowest whole hour for the rest yet. Hand-overs since 18:41, old session's last hour against the new session's average: transport's fifth 178,643 to 101,144 (43% less), weatherwatch's fifth 170,840 to 109,419 (36%), stories' ninth 170,604 to 119,839 (30%), librarian's twelfth 150,016 to 109,776 (27%). Next to hand over: the conductor; archivist 527,371, shadow 517,440, sources 484,055, perplexity 409,543 (line from 17:51), models 403,575 (line from 09:31); then media, whose third session has reached 240,802.
- **As read at 18:41 UTC:** the rows above. The 17:00 hour without the conductor reads 218,993 a call, but that is the mix, not a rise: the five first-session agents made 23 calls at 451,269 each, as in the 16:00 hour (23 at 465,339), while the rest have filed 99 calls so far at 165,030 (227 at 135,170 in the 16:00 hour). As the rest go quiet, the five weigh more. One hand-over with a line: observability's eighth 159,833 to 117,891 (26% less); weatherwatch, stories and librarian have new session keys and no line yet. Shadow passed half a million (501,136); perplexity 409,543 (up 43,000 since 14:42); archivist 519,166, sources 479,338, models 403,575 (line from 09:31). No line from the conductor since 16:42 (599,746 a call then).
- **As read at 17:44 UTC:** the rows above, with the conductor's line to 16:42: 2,435 calls, 1.09 billion tokens, 35.7% of the team's. **It has not compacted since 13:09 and has grown from 236,756 to 599,746 tokens a call in three and a half hours, about 100,000 an hour**; its share of each hour rose from 30% to 55%. The other agents stay at 153,000 to 166,000 a call. One more hand-over: stories' eighth 159,175 to 121,956 (23% less). Next: the conductor, then archivist 511,862, sources 474,727, shadow 464,011 (25,000 more an hour for the fourth hour), models 403,575 (line from 09:31), perplexity 366,449 (line from 14:42).
- **As read at 16:41 UTC:** the rows above; the conductor has sent no line for two hours (since 14:41). Hand-overs since 15:40, the old session's last hour against the new session's average: journalist's seventh 169,577 to 104,893 (38% less), reporter's sixth 157,217 to 109,027 (31%), observability's seventh 170,042 to 124,399 (27%). Next to hand over, still on their first session: archivist 503,947 on its last call (the first session past half a million since the conductor), sources 459,472, shadow 439,548 (25,000 more an hour, the third hour running), models 403,575 (line from 09:31), perplexity 366,449 (line from 14:42).
- **As read at 15:40 UTC:** the rows above. Hand-overs since 14:40 with a line from the new session, the old session's last hour against the new session's average: social's third 210,435 to 104,174 (50% less), stories' seventh 175,265 to 113,702 (35%), librarian's eleventh 137,845 to 103,576 (25%). Observability has a seventh session key and no line from it yet. Next to hand over, still on their first session: archivist 495,275 on its last call, sources 452,000, shadow 414,354 (up 25,000 again in an hour), models 403,575 (line from 09:31), perplexity 366,449 (up 42,000 since 13:37); and the conductor, 389,838 at 14:41 and growing again.
- **As read at 14:40 UTC:** the rows above, with the conductor's line to 14:41 (added at 14:43: 2,237 calls, 993 million tokens, 35% of the team's; 389,838 on its last call, growing again after the fourth compaction). Hand-overs since 13:40, the previous session's last hour against the new session's average: transport's fourth 195,342 to 100,467 (49% less), ipma's third 190,983 to 108,853 (43%), weatherwatch's fourth 179,838 to 117,234 (35%). Designer, graph, social and stories have published new session keys but no ledger line from the new session yet. Next to hand over, still on their first session and growing: archivist 487,882 on its last call, sources 447,119, models 403,575 (line from 09:31), shadow 389,643 (up 25,000 since 13:12), perplexity 324,104 (line from 13:37).
- **As read at 13:40 UTC:** the conductor's line to 13:09 is in: 2,110 calls, 953 million tokens, 34.7% of the team's; a fourth compaction brought its last call to 236,756 (its median is 455,302). It was 57% of the 12:00 hour's tokens. Without it the team has held at 155,000 to 162,000 tokens a call since 10:00. Hand-overs since 12:42 not given above, the previous session's last hour against the new session's average: board 208,636 to 101,379 (51% less), ci 197,667 to 99,222 (50%), reporter 201,869 to 109,518 (46%), entities 199,620 to 117,390 (41%), librarian 136,674 to 104,785 (23%, its tenth session). Next to hand over, on their first session: archivist 480,520 on its last call, sources 440,753, models 403,575 (line from 09:31), shadow 364,730, perplexity 324,104; each grows about 5,000 to 10,000 an hour.
- **As read at 13:07 UTC:** the 11:00 and 12:00 rows above (the 11:00 hour settled lower than read at 12:42: 160,368 without the conductor, not 164,294). Hand-overs since 12:42, tokens per call (median context, old against new): wikipedia's third session 133,970 to 102,599 (23% less); transport's second 176,223 to 142,091 (19%); stories' sixth 144,263 to 123,104 (15%); ipma's second session filed its last line at 13:06 (75 calls, 191,705 on the last) and handed over to a third, which has no line yet. Next to hand over, unchanged: archivist 467,435, sources 430,857, models 403,575 (line from 09:31), shadow 311,034; and the conductor (473,736 at 11:42, no line since).
- **As read at 12:42 UTC:** the table above, with the conductor's line to 11:42 (1,775 calls, 786 million tokens, 31% of the team's; 473,736 on its last call). Next to hand over: archivist 467,000, sources 431,000, models 404,000, shadow 311,000; and the conductor, whose compactions bring it down for an hour and no longer.
- **As read at 11:42 UTC (before the conductor's line for 09:42 to 11:42):** the table's last two rows; the 09:00 hour settled at 255,879 for the team (650 calls) and 189,288 without the conductor. Next to hand over: the conductor (no line since 09:42, then 691,711), archivist 459,000, sources 426,000, models 404,000, shadow 305,000. Seven agents handed over again in the 10:00 hour (designer, journalist, librarian, stories, media, observability, identity).
- **Who was next at 10:43 UTC:** the conductor, 691,711 after 1,441 calls (its line is from 09:42). Then archivist 442,000, sources 415,000, models 404,000 (ipma has shown the vault key can be passed), shadow 297,000, perplexity 255,000 (line from 05:27).
- **As read at 09:42 UTC, without the conductor's later line:** 202,176 tokens a call in the 06:00 hour (216 calls, 21 agents), 194,569 in the 07:00 hour (215 calls, 20 agents), 171,681 in the 08:00 hour (224 calls, 20 agents), 186,686 so far in the 09:00 hour (269 calls, 16 agents; not final). **An hour's figure is settled only when the next hour's lines are in:** the 07:00 hour read 211,634 at 07:42, 184,632 at 08:44 and 194,569 now, because an agent's line for an hour arrives at its next wake.
- **Who was next at 09:42 UTC:** the four that hold a vault key: archivist 409,000, models 404,000, ipma 390,000, sources 375,000 (incident.models@ reports its key sealed to the conductor and opened at 09:31 UTC; none has handed over yet). Then shadow 292,000 and weatherwatch's second session 256,000. The conductor: 346,311 at 06:42, no later line.
- **As read at 08:44 UTC:** 202,239 tokens a call in the 06:00 hour (214 calls, 21 agents), 184,632 in the 07:00 hour (185 calls, 20 agents), 175,178 so far in the 08:00 hour (90 calls, 12 agents). Correction: round 8 said the fall had stopped, on the first 48 calls of the 07:00 hour; the whole hour says otherwise, and the hypothesis below it is withdrawn in part (the second round of hand-overs was already under way).
- **A second hand-over, measured on five agents (08:44 UTC), the session before against the newest, tokens per call:** librarian 171,513 to 108,133 (37% less, its sixth session); graph 235,389 to 115,129 (51%); observability 243,036 to 115,579 (52%); journalist 191,826 to 114,357 (40%, its fourth); stories 220,073 to 142,293 (35%). The earlier the hand-over, the smaller each gain and the lower the average stays.
- **Who was next at 08:44 UTC:** weather 496,000 after 180 calls; shadow 286,000; perplexity 255,000 (line from 05:27); weatherwatch 235,000. Held by a vault key: archivist 393,000, models 387,000 (line from 03:06), ipma 385,000, sources 368,000. The conductor: 346,311 at 06:42.
- **As read at 07:42 UTC (the first sentence's conclusion was wrong, see above):** 200,871 tokens a call in the 05:00 hour (624 calls, 24 agents), 201,771 in the 06:00 hour (188 calls, 21 agents), 211,634 so far in the 07:00 hour (48 calls, 12 agents). **Hypothesis:** what is left is the conductor (346,311 a call), the first sessions that cannot hand over without a vault key (ipma, archivist, sources, models: 362,000 to 387,000) and the second sessions growing again; the next step down needs the keys settled and a second round of hand-overs.
- **Who was next at 07:42 UTC:** weather 478,000 (line from 05:27), shadow 276,000, perplexity 255,000 on their first session; observability 237,000, weatherwatch 235,000, graph 227,000 on their second. Held by a vault key: models 387,000, archivist 383,000, ipma 378,000, sources 362,000.
- **As read at 06:42 UTC:** 192,263 tokens a call (62 calls; most agents have not yet sent the hour's line), after 198,210 in the 05:00 hour (448 calls) and 304,192 in the 04:00 hour (398 calls).
- **Who was next at 06:42 UTC:** weather 478,000; models 387,000 (its line is from 03:06); archivist 374,000; ipma 374,000; labs 356,000 (from 03:01); sources 353,000; shadow 271,000; perplexity 255,000: the eight that are still on their first session (ipma, archivist, sources and models hold a vault key and wait on how those keys are passed on: the conductor's holds). Of the second sessions, observability is at 232,000 after 87 calls, weatherwatch 225,000, graph 222,000: due again within the hour.
- **Correction, 06:42 UTC:** this page first counted ipma among the hand-overs. It did not hand over: its second session was stood down after six calls and the first session is still the IPMA agent ([the conductor's holds](../agents/conductor/holds.md)).
- **Who was next at 05:40 UTC (six of the nine have since handed over; ipma, archivist and sources have not, weather neither):** weather 478,000; stories 396,000; board 390,000; wikipedia 382,000; identity 381,000; ci 366,000; ipma 358,000; archivist 356,000; sources 330,000. Each pays two to four times a fresh session's cost on every call, including a wake where nothing changed (several of these now make three or four calls an hour at that price).

### The conductor

**At 09:42 UTC (its latest line): 1,441 calls, 649 million tokens, 30% of the team's; 691,711 tokens on the last call; two compactions in all.** Earlier: one session since 18:56 UTC on 10 November, still the same one: at 04:36 UTC 970 calls, 461 million tokens (28% of the team's), 475,000 tokens a call on average and 618,602 in the 04:00 hour; compacted twice, which brought the last call down to 110,788 ([its line](ledger/conductor.jsonl)). The figures below are from its first line, at 758 calls and 327 million tokens.

- What filled it: 180 reads of the other agents' messages returned 968,742 characters; 272 shell calls 340,399. **The reports the agents send the conductor are the largest thing it reads.**
- **A fresh conductor session each hour, estimated: 176 million tokens against 327 million, 46% less** (each hour's calls as made, each session starting at 96,786 tokens and growing 2,040 a call, both measured). Handing over every 50 calls instead of every hour would save more: the 224-call hour gains little from the clock.
- **Hypothesis:** reports to the conductor of a few numbered lines with a link to the status file, and agent-to-agent asks by commits addressed `For:`, would cut what it reads by more than half.

## 3. The librarian's pack: 63% less to read at the start, same answers (measured, two runs)

Two sub-agents started the same job, one from ten whole files, one from the pack ([pack-test.json](pack-test.json)):

| Start from | Bytes | Tokens added to the context | Answers right, of 8 |
|---|---|---|---|
| ten whole files | 94,946 | 39,775 | 8 |
| the pack (start, state, the role's pack), 02:56 UTC | 22,950 | 14,164 | 6, and 2 in part |
| the pack after the librarian's correction, 03:01 UTC | 24,364 | 14,734 | 8 |

- **25,041 tokens saved at the start, 63% less, with the same answers as the whole files**, and that many fewer on every later call: over a session of 100 calls about 2.5 million cache-read tokens (estimated: the measured saving times the calls).
- The librarian's own estimate from bytes was 75%: bytes / 4 undercounts (the whole files measured 2.4 bytes a token, the pack 1.6). Its sizes file now uses the measured ratios.
- **The floor the pack cannot move:** about 84,000 tokens on a session's first call, before any reading (the harness, its tools, the repository's rules). The pack is worth about a sixth of that floor; the fresh session is worth far more than the pack. The pack is what makes the fresh session cheap to start.

## 4. What each agent could change

| Change | Who | Saving | Kind |
|---|---|---|---|
| Hand over to a fresh session every 50 to 60 calls, from the pack and a short note | every agent above 300,000 tokens a call (the list in item 2) | 74% to 84% less per call | measured on three agents |
| Start from the pack, open whole files only when needed | every new agent | 25,041 tokens at the start and per later call | measured, two runs |
| Short reports: a few numbered lines and a link | everyone who reports to the conductor | the conductor read 968,742 characters of reports | measured (the characters), hypothesis (the saving) |
| Quiet commands and smaller reads: a line range, a grep, a JSON's keys | everyone: shell output is the largest thing every agent but the conductor reads | each 4,000 characters not read is about 1,000 to 1,700 tokens, times the calls left in the session | estimated from the measured bytes per token |
| Sub-agents for bounded reading: the reading never enters the main session | long sessions | the pack test's sub-agents read 142,260 bytes; about 3,000 characters came back | measured |
| No wake when nothing changed | hourly desks | a wake costs at least one call at the session's full context | measured (the context), hypothesis (how many wakes are empty) |

## 5. Cost per output (measured, upper bounds)

| Output | Count | Tokens each, all | Weighted tokens each |
|---|---|---|---|
| timeline row | 66 | 6,976,867 | 729,940 |
| story | 4 | 5,906,454 | 693,257 |
| captured page | 564 | 71,946 | 7,843 |

The whole session of the agent that makes the thing, over the count ([outputs.json](outputs.json), 05:40 UTC; these move with the session, not the output: the archivist's 45 new captures in the hour cost 10 million tokens at its present 355,000 a call). The conductor also led the team in the session that wrote the rows, so a row's figure is far above its real cost; a captured page is the nearest to a true unit cost here.

## 6. Models: about a dollar, and the account is empty (measured and reported)

- 1.06 of 20 US dollars today: 0.87 measured in [the ledger](../models/ledger-summary.json) (03:06 UTC), 0.19 reported by the shadow desk. The provider's own count on the team's key was 1.09 at 02:57 UTC (reported by incident.models@).
- In the first eval round two models (qwen/qwen3.5-397b-a17b and mistralai/mistral-large-4-0) were 80% of the spend; the model [incident.models@ chose](../models/which.json) for four of six jobs, google/gemma-4-31b-it, cost a third of a cent for its 67 calls. The day's work at the chosen models costs cents.
- **The provider's account has no credit** since 02:55 UTC ([provider.json](provider.json)): every call is refused. That is for Dinis; it is not a saving.
- Not counted: the perplexity agent's calls (no ledger summary of its own yet).

## 7. CI: cheap (measured)

414 runs, 253 releases, about 19 s a release ([machine.json](machine.json), from [incident.ci@'s data](../data/ci/index.json)). About a third of runs are cancelled by a newer push and cost almost nothing. Nothing to save here that matters.

## What is not known yet

- Four agents have no line: dev, meteorologist, researcher and the new envoy (the first three work in another repository; the conductor relays their lines). 
- The team's tokens per release: needs all 30.
- How many hourly wakes find nothing changed.
- The model the agents run on is one for all jobs; whether a smaller one would do for the hourly data refreshes has not been tested (WS-148 tests it with the same task on each candidate; not done here).
