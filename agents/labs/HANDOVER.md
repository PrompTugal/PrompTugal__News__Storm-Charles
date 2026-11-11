> Kept by incident.labs@web-summit.dinis, 11 November 2026, 12:14 UTC

# Handover: incident.labs@web-summit.dinis

Kept current by the third labs session (from 12:08 UTC on 11 November; key encryption sha256:a5c56a67fc4acce5, entry `incident-labs-dinis-3`; `-2` marked handed over). A session after this one **makes a new session key**, adds its public half to `data/keys.json` as `incident-labs-dinis-4` and marks `-3` handed over.

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
It serves `_site/` itself, counts marks, checks nothing is wider than the screen (also with an item and the table open), clicks a mark and reads the item. It does not look: after a change of data, take a screenshot and read it (the 06:50 look found three faults the check passed, the 09:15 look a fourth). The screenshot script was a scratch file: Playwright, `page.locator('.lab').screenshot()` at 1500 wide. Release: commit, then `AGENT=incident.labs@web-summit.dinis admin/tools/release.sh`; then check the served page, not only the local one. End of each wake: `node tools/accounts-measure.mjs --task "..." --quality pass --append`, commit `accounts/ledger/labs.jsonl` with `For: incident.accountant@web-summit.dinis`.

## The experiments and their state (twelve, all passing at 06:50 UTC; each has a table twin from `twin()` in labs.js)

| Page | State | Known weakness |
|---|---|---|
| timelines/known-when | **best timeline**: scrubber, play, Lisbon and Madeira; jumps "wind changed" (graph edge `ipma-wind-orange`) and "latest read" (cap.json) | blind before our first read of the CAP feed (10 Nov 23:51) |
| timelines/lanes | publisher from incident.graph@'s tables | the six lanes are our grouping; a row sits with who published it |
| timelines/story | done | order and gaps, no duration |
| timelines/lag | thin | five keyed facts; no Wikipedia; the "us" chart measures when we learned IPMA's send time |
| decisions/lead-times | **best decision view** | only edges with a minute and `effect_from_utc` (8 when written) |
| decisions/state | new: board by state of service, by place or kind | one word per decision; time nearly absent; "standing" is judged against the graph's `updated`, not the clock |
| decisions/flow | done | an arrow means "followed", read as "caused" |
| decisions/days | done | Tuesday and Thursday thin |
| weather/day-bands | **best weather view; lifted** onto the front page by incident.weather@ (its e7340c6, a36dee5) | dense |
| weather/day-rebuilt | made for incident.weather@ | every Tuesday bar still reads "in the feed": the dotted "rebuilt" style has not yet been seen on real data |
| weather/stations | axis to the end of the day, "observed to" line; **opens on each station's own scale** (12:14 on 11 Nov) | warnings speak of gusts, stations report mean wind; no warning area per Madeira station |
| weather/models | rain from the Lisbon station that reports it; scales fit the data; gusts as points | one grid cell against one station; items are labelled hypothesis, while day-bands labels IPMA's forecast a fact with a note: make these agree |

## In flight

Nothing half-done in the tree: everything written is pushed.

## The 12:00 look (11 November, data read 11:26 UTC)

Built, `labs-check` 24/24, then screenshots read by eye against warnings.json (Lisbon: orange sea from 12:00 to 21:00 then yellow to 03:00; red rain 09:00 to 18:00; orange wind 09:00 to 21:00), cap.json (Madeira's orange wind to 12:00) and decisions/graph.json (11:56).

- **Right:** day-bands, models (no airport gusts since Tue 15:00; observed rain at Tapada about 5 mm in the hour against the models' 18 mm peak at 12:00 to 14:00, still ahead), stations (Madeira's wind bars end at 12:00), state.
- **Fixed, found only by looking:** lead-times drew "IPMA lowers Lisbon's wind warning from red to orange" as a red bar: `L.level()` took the first colour word. It now takes the level a "from X to Y" (or "de X para Y") change goes to. Stations opened on one scale set by Madeira's 58 mm hour, so Lisbon's rain under its red warning was flat: it now opens on each station's own scale.
- **Added:** known-when had no jump after Tuesday night: "wind changed" and "latest read", both taken from the data.

## Owed (in order)

1. **A view from `data/exposure/`** (incident.datascience@, 11:50 to 12:05): `people-by-hour.json` gives residents under the highest level in force per hour (12:00: about 4.93 million under red, 4.93 million under orange, 0.25 million under yellow; where people sleep, never harm), a stacked strip under day-bands or a lane on known-when; `ensemble.json` gives the gust spread at Lisbon by hour (p10, median, p90, members over 90 km/h) and north/near/south shares of the 51 ECMWF members, a shaded band on models' gusts chart, labelled "shares of forecasts, not a chance", dashed like every forecast; `tides.json` high water at Cascais against the orange sea warning. `hospitals.json` already places each site in its IPMA warning area: the same method could give each Madeira station its area (ask a-labs-3, now to incident.datascience@ as well).
2. **Wikipedia on the lag view**, when the first edit per keyed fact is published in the shape `first-on-each-fact.json` describes (`shape_for_other_series`).
3. A keyboard order check on the SVG marks themselves (the table twin is the linear path meanwhile).
4. models against day-bands: one labels a forecast "hypothesis", the other "fact with a note". Choose one.
5. incident.weather@ was asked (status, asks) whether the Tuesday strip needs anything.

## Asks open with others

- incident.researcher@: `effect_from_utc` and a minute of announcement on more edges (lead-times fills by itself).
- incident.meteorologist@: the warning area of each Madeira station; gust observations if any feed has them.
- incident.archivist@ / incident.sources@: an earlier copy of MeteoAlarm's Portugal feed than 10 Nov 23:51, to complete Tuesday.

## What waits on Dinis

His choice between the experiments: nothing else. No vault was created, so there is no key to hand over. One-shot wakes from incident.conductor@ fired at 09:12 (second session) and 12:08 UTC (third); there is no recurring wake. The screenshot script is a scratch file again (Playwright, `page.locator('.lab').screenshot()` at 1500 wide, pages at `labs/<area>/<name>.html` on a static server over `_site/`).
