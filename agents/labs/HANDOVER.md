> Kept by incident.labs@web-summit.dinis, 11 November 2026, 06:50 UTC

# Handover: incident.labs@web-summit.dinis

Kept current by the second labs session (from 06:44 UTC on 11 November; key encryption sha256:ebba9a92c386ec63, entry `incident-labs-dinis-2`). A session after this one **makes a new session key**, adds its public half to `data/keys.json` as `incident-labs-dinis-3` and marks `-2` handed over, as its own small commit.

## What I own

`labs/**`, `app/labs/**`, `tools/labs-check.mjs`, `agents/labs/**`, and `accounts/ledger/labs.jsonl` (agents/policy.json). Nothing else: I ask other owners by message or in a commit with `For:`.

## The job, in Dinis's words

Many small experiments in showing this incident, each on its own page, so he can compare and choose: "multiple experiments of different timelines"; "a complete new section with all sorts of decision graphics"; lead times "actually quite cool" (its own part); weather "lots of these ... the hour by hour"; "use the whole screen"; "when I click on one of these, where's the evidence?". One more experiment every round; each round, tell the conductor which is best and why. The best move into the faces by their owners.

## How it is built

- A page is `labs/<area>/<name>.md` with front matter `mount:` (a `<div class="lab" data-lab="<area>/<name>" data-root="../../">`) and `head:` (labs.css, labs.js, the area's script). The text says what it tries and what it shows badly. `labs/index.md` lists every experiment with a verdict: update it each round.
- `app/labs/labs.js` is the core: `Labs.exp(name, { needs, setup, draw, init })`; `needs` are keys of `FILES` (the incident's JSON, plus root-relative ones written with a leading `/`). It gives time scales, axes, `levelBar` (IPMA's colours, level written), `dot` (fact solid, evidence hollow, hypothesis dashed), `choice` (toolbar switches) and item builders (`signalItem`, `edgeItem`, `capItem`, `warnItem`, `valueItem`).
- Every mark gets `L.mark(el, itemId)`. One click handler calls **`Labs.openItem(id)`**: it fills "This item" in the designer's reader's panel (`window.stormPanel`) and falls back to its own side panel. An item lists "Our capture" (the evidence page) first where the row carries `evidence`, then the outside link, the time read and the file behind it.
- Rules kept: only the site's published JSON, nothing fetched from outside, no images, tokens not hex colours, a forecast is never ours (dashed, named).

## How to run and test

```
node admin/build/build.mjs && node tools/labs-check.mjs      # 12 experiments, 1680 and 390 wide; --only <area/name>; --url <site> for the served one
```
It serves `_site/` itself, counts marks, checks nothing is wider than the screen (also with an item and the table open), clicks a mark and reads the item. It does not look: after a change of data, take a screenshot and read it (the 06:50 look found three faults the check passed). Release: commit, then `AGENT=incident.labs@web-summit.dinis admin/tools/release.sh`; then check the served page, not only the local one. End of each wake: `node tools/accounts-measure.mjs --task "..." --quality pass --append`, commit `accounts/ledger/labs.jsonl` with `For: incident.accountant@web-summit.dinis`.

## The experiments and their state (twelve, all passing at 06:50 UTC; each has a table twin from `twin()` in labs.js)

| Page | State | Known weakness |
|---|---|---|
| timelines/known-when | **best timeline**: scrubber, play, Lisbon and Madeira | blind before our first read of the CAP feed (10 Nov 23:51) |
| timelines/lanes | publisher from incident.graph@'s tables | the six lanes are our grouping; a row sits with who published it |
| timelines/story | done | order and gaps, no duration |
| timelines/lag | thin | five keyed facts; no Wikipedia; the "us" chart measures when we learned IPMA's send time |
| decisions/lead-times | **best decision view** | only edges with a minute and `effect_from_utc` (8 when written) |
| decisions/state | new: board by state of service, by place or kind | one word per decision; time nearly absent; "standing" is judged against the graph's `updated`, not the clock |
| decisions/flow | done | an arrow means "followed", read as "caused" |
| decisions/days | done | Tuesday and Thursday thin |
| weather/day-bands | **best weather view; lifted** onto the front page by incident.weather@ (its e7340c6, a36dee5) | dense |
| weather/day-rebuilt | made for incident.weather@ | every Tuesday bar still reads "in the feed": the dotted "rebuilt" style has not yet been seen on real data |
| weather/stations | axis runs to the end of the day of the last observation, with an "observed to" line | warnings speak of gusts, stations report mean wind; no warning area per Madeira station |
| weather/models | rain from the Lisbon station that reports it; scales fit the data; gusts as points | one grid cell against one station; items are labelled hypothesis, while day-bands labels IPMA's forecast a fact with a note: make these agree |

## In flight

Nothing half-done in the tree: everything written is pushed.

## Owed (in order)

1. **After 09:00 and 12:00 UTC on 11 November** (Lisbon's red rain, then red wind): run the check and look at day-bands, stations and models as the observed hours fill in. Known risk: the shared rain scale on stations is set by Madeira (49.6 mm in an hour).
2. **Wikipedia on the lag view**, when the first edit per keyed fact is published in the shape `first-on-each-fact.json` describes (`shape_for_other_series`); not there at 06:50.
3. A keyboard order check on the SVG marks themselves (the table twin is the linear path meanwhile).
4. models against day-bands: one labels a forecast "hypothesis", the other "fact with a note". Choose one.
5. incident.weather@ was asked (status, asks) whether the Tuesday strip needs anything.

## Asks open with others

- incident.researcher@: `effect_from_utc` and a minute of announcement on more edges (lead-times fills by itself).
- incident.meteorologist@: the warning area of each Madeira station; gust observations if any feed has them.
- incident.archivist@ / incident.sources@: an earlier copy of MeteoAlarm's Portugal feed than 10 Nov 23:51, to complete Tuesday.

## What waits on Dinis

His choice between the experiments: nothing else. No vault was created, so there is no key to hand over. No routine or scheduled task wakes this agent: it wakes only on a message.
