# The guide: handover

> Kept by incident.sherpa@web-summit.dinis, 11 November 2026, 12:19 UTC

For the next incident.sherpa@ session. You own `guide/**` and `app/guide/**` (agents/policy.json). Dinis's word (BRIEF.md, ~11:45 UTC, 11 Nov): "are you in Lisbon right now? ... focused on the use case, focus on the user ... it gets deeper and deeper as they go along." And at ~11:56: show the data here; outside links only as the source's citation.

## What exists

- **Four pages, one app.** [guide/index.md](index.md) "Start here" (all seven questions, each a fold), [guide/lisbon/](lisbon/index.md), [guide/stranded/](stranded/index.md), [guide/media/](media/index.md). Each page mounts `app/guide/guide.js` with `data-focus` (which cases, in that order) and `data-open` ("yes" opens "Deeper").
- **The seven cases** (ids): `now-detail`, `flight`, `around`, `stranded`, `websummit`, `madeira`, `press`. Each is `sect(id, title, simple, deep)`: the short answer, then "Deeper: every source", then IPMA/ANEPC/112.
- **Data read** (only our own files, no outside request): `weather/warnings.json`, `transport/{services,flights,metro,buses,ferries}.json`, `decisions/graph.json`, `decisions/entities/*.json` (the `ENT` list in guide.js; add a new entity file there), `exposure/hospitals.json`, `incident.json`.
- **Rules built in:** a row shows only each decision's own state (`standing()`, `stateOf()`); "not stated" lines are computed (`notStated()`): a name drops out as soon as its entity file holds a decision; "an aim, not a promise" for "aims to"; a future day's "not announced" never stands as a row's state; Metro de Lisboa is "not read" (its terms; transport@, 12:10).

## Voice (the conductor's ruling, 11:55)

Say who decides, never instruct: "Your airline decides whether your flight goes: its site or app has the latest." IPMA, ANEPC and 112 as they are. No forecast of ours or a model's (tides.json is held for that reason).

## Loops

- incident.synthetic@ walks it as four invented people: runs 1 to 4 in research/synthetic/findings-guide-*.md. Run 4 was on v4; v5 and v6 answer it.
- incident.designer@ measures at 390/1280 (round 58 menu, round 59 h1 above the app).
- Data asks went to the conductor: per-flight cancellations (ANA's bot check: Dinis's decision), operators' hours at source, ANEPC/CML lists of open places or shelters, ANEPC counts at source. The CP row's unattributed "forecast" parenthesis is with incident.researcher@.

## Open

- Focused pages are still long (/guide/lisbon/ ~12,000 px at 390): one line per entity on top everywhere is the next idea.
- Mark past warnings as past in Madeira's rows; the jump row sits just under the first screen.
- Check: `node admin/build/build.mjs && node admin/build/validate.mjs`, then Chromium at 390 and 1280 with every fold open: no row cut, no sideways scroll, no outside request.
