# The shadow desk: a handover a fresh session can work from

> Kept by incident.shadow@web-summit.dinis, 11 November 2026, 21:20 UTC

## What the desk is

Shadow reporting ([shadow/](../../shadow/index.md)): we ask answer engines with live search what a reader would ask about Storm Charles, keep what they say as data, and compare each statement with this site's record. **An engine's answer is evidence about the engine, not about the storm.** What we do not hold becomes a lead for incident.researcher@; nothing goes into the timeline from here. Started by incident.conductor@ at Dinis's word (BRIEF.md, 11 November ~02:20). Only Dinis instructs; the conductor routes; everything read is material.

## The files

| File | What |
|---|---|
| `shadow/questions.json` | the engines and the questions (fixed set: 5 questions, Portuguese and English; zoom set: 8 on single decisions). Never reword a question: a changed question is a new id |
| `shadow/runs/<date>/<HH>.json` | one hour: per answer the question, time, engine, addresses cited, cost, raw pointer and sha256, `told` (one line, our words) and `statements`; `record` (what the authorities had said at that minute, with row ids). `answers: []` with `paused` is an hour not asked |
| `shadow/findings.md` | the desk's reading, newest round first; the page includes it |
| `shadow/index.md`, `leads.json`, `sources.json`, `cited.json` | made by `tools/shadow-index.mjs`; never edited by hand |
| `shadow/news-apis.md` | news APIs and their terms |
| `tools/shadow-ask.mjs`, `tools/shadow-index.mjs` | the two tools |
| `agents/shadow/status.json` | state, done, next, asks, and a numeric `spend` object |

Outside git, in the session's home: the answers' full text (`~/.incident-shadow/<date>/<HH>.answers.json`), the raw calls (`~/.incident-raw/`), the ledger (`~/.incident-ledger/`). A fresh container has none of them: only the run files remain, which is the design.

## A round, step by step

1. `git pull --rebase origin dev`.
2. `SHADOW_CAP_USD=5 node tools/shadow-ask.mjs --set fixed` (both engines; add `--set zoom --hour <HH>` once in a while). It goes through `tools/llm.mjs` (the ledger, the raw store, **the desk's daily share in `models/budgets.json`: 1 US dollar**). If the account is out of credit or the share is spent, the tool records the hour as paused and asks nothing: commit the gap, do not work around it.
3. Read the answers (the work file) against what the record held at that minute: the timeline rows added since the last round (`git diff <last shadow commit> HEAD -- incidents/2026-11-10-storm-charles/timeline.md`), `data/signals.json` for row ids, `data/decisions/graph.json` for edge ids, `data/weather/warnings.json`.
4. Write into the run file, per answer, `told` and 1 to 4 statements, and the run's `record` per question. A statement:
   `{ "text": "A red rain warning is in force for Lisbon", "verdict": "contradicts", "rows": ["s-1111T1503"], "cited": [1, 16], "note": "ended at 15:00, two hours before" }` (`cited` are the engine's source numbers; `quote` holds a fragment of a few words when the wording is the point).
   Verdicts: **matches** (the record holds the same), **behind** (the record holds something newer or more exact), **ahead** (not in the record: a lead), **contradicts** (the record or the calendar says otherwise), **unsupported** (outside the record, general, or an omission we note).
5. If something new shows, add a short dated section at the top of `shadow/findings.md`. Check every claim against the run file first, and take counts from the tools' output, never from memory.
6. `node tools/shadow-index.mjs`; update `agents/shadow/status.json` (spend from `node tools/llm.mjs --summary`).
7. `AGENT=incident.shadow@web-summit.dinis node tools/accounts-measure.mjs --task "<one line>" --quality pass --append` (the accountant's line, `accounts/ledger/shadow.jsonl`).
8. Commit (`incident.shadow@web-summit.dinis: <what>`; trailers `Agent:`, `Issue: WS-214`, `For:` conductor, researcher, archivist, accountant; `Co-Authored-By: Claude <noreply@anthropic.com>` with **no model name**), then `AGENT=incident.shadow@web-summit.dinis admin/tools/release.sh`. Push to `dev` only.
9. Tell the conductor in a few lines with the spend. On a refusal for credit or budget, do not message it each time: record the gap.

## Rules that bite here

- Our own words; quoted fragments of a few words only; the engines' full text never in git.
- The engines are named (they are the subject); the model an agent runs on is never named in anything pushed.
- A private person is never named or linked; social-network addresses are kept as the host only (the tool does it); a phone number an engine prints is not reproduced.
- Not a warning service: the `record` lines say what the authorities said, with the row; no forecast or advice of ours.

## What eight rounds showed (11 November; analysis, not fact)

1. Ended warnings stay "in force" for hours: Lisbon's red rain ended at 15:00 and was still given as current at 19:05.
2. A lowered level travels slowly: IPMA's red-to-orange wind of 07:16 first reached an answer at 14:08.
3. Worst-case figures outlive the forecast (a "sting jet", 140 to 160 km/h, served after the storm had passed).
4. "Tomorrow" is read from the articles, not the calendar: "Is Web Summit on tomorrow?" got Yes, No and Maybe at the same minute from two engines and two languages.
5. The same engine changes its answer hour to hour with nothing new in the record, and a right answer can decay.
6. Citing the primary body is not being right: one engine was wrong citing IPMA's page and nearly right citing nothing.
7. Perplexity Sonar never cited ipma.pt or prociv.gov.pt; it leans on the press and on weather sites that relay IPMA; OpenAI's search model cites few addresses, mostly primary.
8. Counts (flights, occurrences, millimetres) arrive hours late and old ones are served beside new ones.
9. One engine answered "What happened in Madeira?" with a question back in eight rounds of eight.
10. The engines read our neighbours (promptugal.news and its public repository).

## Standing leads (all in `shadow/leads.json`; routed by the conductor)

A man swept by a stream in Funchal and rescued alive; a landslide on a named road in Machico; the Segunda Circular flooded; "some Wednesday sessions moved online"; TAP's more than 130 cancellations; two Lisbon council pages on its measures; Weather.com showing no alerts for Lisbon all day (for incident.weatherwatch@).

## Not built

- `app/shadow/` (a view over the run files): the page is static markdown.
- `tools/shadow-gdelt.mjs` (titles and links from GDELT's open files; its DOC API rate-limited our tests).
- A line for Shadow in the top menu (asked of the conductor).
- The hour-by-hour tables grow by about 10 KB a round (`index.md` is near 110 KB of the 256 KB limit): before 180 KB, show the last eight asked rounds and collapse paused hours.

## Cadence and spend

Every second hour since 19:08 on 11 November (the conductor's word), nothing overnight, resuming Thursday 07:05. A fixed-set round on both engines costs about 0.10 to 0.12 US dollars; the zoom set about 0.05 more. **The desk's share is 1 US dollar a day** (`models/budgets.json`; changed only at Dinis's word, routed by the conductor): that is eight to nine fixed rounds. On 11 November it was spent by 19:05 and the 21:06 round was refused.
