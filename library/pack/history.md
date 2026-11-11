# How this project got here: a pointer

> Kept by incident.librarian@web-summit.dinis, 11 November 2026, 03:13 UTC. For an agent that starts now and was not here. The history is no longer told here: incident.reporter@ keeps it as traces (one piece of work from Dinis's word to a live page, every step with its evidence), and this page only says which to open. [The pack](README.md).

**Read [[file:reporter/traces/index.json]]** (six traces, a five-line summary of each), **then only the trace you need:**

| Open this | If you need |
|---|---|
| [[file:reporter/traces/arc-voice-memo-to-two-faces.json]] | the whole arc: the voice memo at about 19:00 UTC on 10 November to a site with two faces at 02:19 on the 11th; 28 steps, nine of them Dinis's |
| [[file:reporter/traces/small-metro-sentence-to-entity-page.json]] | how a small ask travels: "where's everything about the Metro?" to an entity page, 24 minutes, four agents |
| [[file:reporter/traces/medium-new-homepage-to-the-swap.json]] | how a medium one does: "create a complete new homepage right now" to the Weather face at /, 12 min 26 s, three agents in a relay |
| [[file:reporter/traces/large-every-word-needs-a-reference.json]] | how a large one is split: "every word here needs to have a reference" into owned parts under one contract ([[file:RESTRUCTURE.md]]) |
| [[file:reporter/traces/correction-three-fixes-in-the-open.json]] | how a mistake is corrected here: a private address withheld, facts relabelled evidence, a hypothesis re-weighed; each found by another agent |
| [[file:reporter/traces/escalation-asks-waiting-on-dinis.json]] | how an ask reaches Dinis and how long it waits |

Hour by hour, in prose: [[file:reporter/log.md]]. As journalism: [[file:journal/mistakes-made-in-the-open.md]]. What changed for a reader each hour: `news/`. The round of 02:10, written to print: [[file:news/2026-11-11-round-two.md]]. What exists now: [[file:REALITY.md]].

## What has gone wrong, and what it changed

Checked against the reporter's log at 03:13 UTC: a row marked *log* is told there; a row marked *commits* is the librarian's, from the commits and its own status, and is not in the log.

| What happened | What it changed | Told in |
|---|---|---|
| The organiser's decision was public for 43 minutes before we saw it | a watcher on every listing of its site | commits |
| Rows resting on the press were labelled fact | eight relabelled evidence at 02:18; the rule restated | log |
| A timeline row linked a public post by a private person | withheld 71 seconds after it was found; the rule written into CLAUDE.md | log |
| A cancelled deploy was live; green did not mean served | CI finishes a running deploy and fails if the version is not served | log |
| The catalogue, then the commit record, outgrew 256 KB | the gate refused both pushes; both are now generated or split | commits |
| A page per file nearly broke the gate's budget | the viewer is one page; no page per item; the budget went from 5 s to 8 s as the site passed 1,100 pages | commits; the budget: log |
| 23 captures were of the wrong addresses | removed by the archivist within the round, and said | log |
| A missing semicolon stopped the entity links for some minutes | a check that every script parses before a release | log |
| Timestamps were written ahead of the clock, by several agents | use `date -u`, never a guess; the reporter's tool refuses a stamp later than the clock | log |
| A count matched too much (77 cards for Dinis; it was 36) | corrected on the page with a dated note | log |
| Commit trailers split by a blank line hid `For:` from git's parser; the co-author line named a model | all trailers in one final paragraph; no model name; the path check warns on both | commits |
