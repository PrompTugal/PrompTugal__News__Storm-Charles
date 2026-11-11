> Kept by incident.labs@web-summit.dinis, 11 November 2026, 06:43 UTC

# Handover: incident.labs@web-summit.dinis

Written at incident.conductor@'s ask, for the fresh session that takes over the Labs. The session that wrote this ran from 02:09 UTC on 11 November; its key (encryption sha256:e7ba51b45cae191b) ends with it. **Make a new session key and add its public half to `data/keys.json`** (as its own small commit: that file is contended and conflicts on rebase).

## What I own

`labs/**`, `app/labs/**`, `tools/labs-*.mjs` (none written yet), `agents/labs/**`, and `accounts/ledger/labs.jsonl` (agents/policy.json). Nothing else: I ask other owners by message or in a commit with `For:`.

## The job, in Dinis's words

Many small experiments in showing this incident, each on its own page, so he can compare and choose: "multiple experiments of different timelines"; "a complete new section with all sorts of decision graphics"; lead times "actually quite cool" (its own part); weather "lots of these ... the hour by hour"; "use the whole screen"; "when I click on one of these, where's the evidence?". One more experiment every round; each round, tell the conductor which is best and why. The best move into the faces by their owners.

## How it is built

- A page is `labs/<area>/<name>.md` with front matter `mount:` (a `<div class="lab" data-lab="<area>/<name>" data-root="../../">`) and `head:` (labs.css, labs.js, the area's script). The text says what it tries and what it shows badly. `labs/index.md` lists every experiment with a verdict: update it each round.
- `app/labs/labs.js` is the core: `Labs.exp(name, { needs, setup, draw, init })`; `needs` are keys of `FILES` (the incident's JSON, plus root-relative ones written with a leading `/`). It gives time scales, axes, `levelBar` (IPMA's colours, level written), `dot` (fact solid, evidence hollow, hypothesis dashed), `choice` (toolbar switches) and item builders (`signalItem`, `edgeItem`, `capItem`, `warnItem`, `valueItem`).
- Every mark gets `L.mark(el, itemId)`. One click handler calls **`Labs.openItem(id)`**: it fills "This item" in the designer's reader's panel (`window.stormPanel`) and falls back to its own side panel. An item lists "Our capture" (the evidence page) first where the row carries `evidence`, then the outside link, the time read and the file behind it.
- Rules kept: only the site's published JSON, nothing fetched from outside, no images, tokens not hex colours, a forecast is never ours (dashed, named).

## How to run and test

```
node admin/build/build.mjs && (cd _site && python3 -m http.server 8765)
```
Then a headless browser over every page at 1680 and 390 wide: count `.lab [data-item]`, check `document.documentElement.scrollWidth - innerWidth` is 0, click a mark and read `#panel-item`. I kept the script outside git (a scratch file); it is twenty lines of Playwright and worth rewriting as `tools/labs-check.mjs`. Restart the server after each build (the build deletes `_site/`). Release: commit, then `AGENT=incident.labs@web-summit.dinis admin/tools/release.sh`; then check the served page, not only the local one. End of each wake: `node tools/accounts-measure.mjs --task "..." --quality pass --append`, commit `accounts/ledger/labs.jsonl` with `For: incident.accountant@web-summit.dinis`.

## The experiments and their state (eleven, all live and passing at 02:45 UTC)

| Page | State | Known weakness |
|---|---|---|
| timelines/known-when | **best timeline**: scrubber, play, Lisbon and Madeira | blind before our first read of the CAP feed (10 Nov 23:51) |
| timelines/lanes | publisher from incident.graph@'s tables | the six lanes are our grouping; a row sits with who published it |
| timelines/story | done | order and gaps, no duration |
| timelines/lag | thin | five keyed facts; no Wikipedia; the "us" chart measures when we learned IPMA's send time |
| decisions/lead-times | **best decision view** | only edges with a minute and `effect_from_utc` (8 when written) |
| decisions/flow | done | an arrow means "followed", read as "caused" |
| decisions/days | done | Tuesday and Thursday thin |
| weather/day-bands | **best weather view; lifted** onto the front page by incident.weather@ (its e7340c6, a36dee5) | dense |
| weather/day-rebuilt | made for incident.weather@ | every Tuesday bar still reads "in the feed": the dotted "rebuilt" style has not yet been seen on real data |
| weather/stations | done | warnings speak of gusts, stations report mean wind; no warning area per Madeira station |
| weather/models | done | one grid cell against one station; items are labelled hypothesis, while day-bands labels IPMA's forecast a fact with a note: make these agree |

## In flight

Nothing half-done in the tree: everything written is pushed.

## Owed (next rounds, in my order)

1. A decisions view **by state of service** (closed, suspended, limited, running): 33 of 53 edges now carry `state`.
2. **Wikipedia on the lag view**, when incident.media@ or incident.wikipedia@ publish the first edit per keyed fact (asked; not yet there).
3. A **table twin** for each chart (the design's `.wx-table`), and a keyboard pass: marks are focusable, the order is not checked.
4. `tools/labs-check.mjs`: the browser check as a tool in the repository.
5. Re-check every page after other agents change the JSON: fields were added three times in one hour (`evidence` on rows, `state` on edges). No decision edge carried `evidence` when this was written; `edgeItem` already passes it through.
6. incident.weather@ said it would lift the Tuesday strip after the 05:00 observations: ask whether it needs anything changed.

## Asks open with others

- incident.researcher@: `effect_from_utc` and a minute of announcement on more edges (lead-times fills by itself).
- incident.meteorologist@: the warning area of each Madeira station; gust observations if any feed has them.
- incident.archivist@ / incident.sources@: an earlier copy of MeteoAlarm's Portugal feed than 10 Nov 23:51, to complete Tuesday.

## What waits on Dinis

His choice between the experiments: nothing else. No vault was created, so there is no key to hand over. No routine or scheduled task wakes this agent: it wakes only on a message.
