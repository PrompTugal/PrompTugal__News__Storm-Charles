---
title: Labs
summary: Experiments in showing Storm Charles: several timelines, several decision views, several weather views, each on its own page, so they can be compared and the best moved into the site's two faces.
---
> Kept by incident.labs@web-summit.dinis, 11 November 2026, 02:32 UTC

# Labs: many ways of showing the same storm

Small experiments, each on its own page, at Dinis Cruz's word ([BRIEF.md](../BRIEF.md), 11 November, 02:10: "multiple experiments of different timelines", "a complete new section with all sorts of decision graphics", "lots of these" for the weather). Every one reads only this site's published JSON, draws it in the page, says what it tries and what it shows badly, and opens the row or edge behind any mark you click, with its source and the time it was read. They are drafts to choose between: the best move into the Weather face or the data room. Not a warning service: for the warning itself, [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/).

## Timelines

| Experiment | Our verdict so far |
|---|---|
| [What was known when](timelines/known-when.md) | **The strongest timeline.** A scrubber (now with play, and Madeira) that rebuilds the warnings, decisions and rows as they stood at any minute; it answers "what did they know when they decided". Weak before our first read of the warning feed. |
| [Timeline in lanes](timelines/lanes.md) | Good as an overview of who spoke when; Tuesday evening piles up on an even time axis (the even-spacing switch helps). The publisher of each row is from the graph's tables; the six lanes are our grouping. |
| [Lag: the source's time against everyone else's](timelines/lag.md) | New in round 2. How late each outlet was on each keyed fact, and how late our desks read each step of IPMA's warnings; "first" means first among the outlets a bot could read. |
| [The story in decisions only](timelines/story.md) | The most readable on a phone and the easiest to read aloud; shows order and gaps, not duration. |

## Decisions

| Experiment | Our verdict so far |
|---|---|
| [Lead times](decisions/lead-times.md) | **The strongest decision view.** Warning sent, decision announced, effect begins, on one axis with the notice written out. Limited to the few decisions whose hours are stated. |
| [Flow: what followed from a warning](decisions/flow.md) | Answers one question at a time (never the whole graph) and reads well; an arrow means "followed", which is easy to misread as "caused". |
| [Day by day](decisions/days.md) | Useful for Wednesday (everything in effect, hour by hour); Tuesday and Thursday are thin. |

## Weather

| Experiment | Our verdict so far |
|---|---|
| [The day in bands](weather/day-bands.md) | **The strongest weather view.** Warned, forecast, observed, decided and our hypothesis in one 24-hour grid; dense. Now on the front page in a simpler form (incident.weather@). Shading can be switched to one scale per unit. |
| [Tuesday rebuilt from what the files still hold](weather/day-rebuilt.md) | New in round 4, at the Weather face's ask. The same strip for a past day, each warning marked as still in the feed or rebuilt from our record; limited by when our record starts. |
| [Warned against observed, station by station](weather/stations.md) | Shows Madeira's rain against its warnings at a glance; cannot check wind, because warnings speak of gusts and stations report mean wind. |
| [The models side by side](weather/models.md) | Honest about what a forecast is (dashed, named, never ours); one grid cell against one station is a rough comparison. |

## How an experiment is made

A page `labs/<area>/<name>.md` mounts a small app from `app/labs/` through the site's frame. The shared core ([app/labs/labs.js](../app/labs/labs.js)) loads the JSON, draws with SVG from the design tokens, and gives every mark an item id; one function, `Labs.openItem(id)`, shows the item. That function is the single hook the reader's right-hand panel and the evidence pages will replace. The rules it keeps ([design/README.md](../design/README.md)): a fact is solid, evidence is hollow, a hypothesis is dashed and says so; IPMA's colours only for IPMA's levels, with the level written; every figure one click from its source and the time read.
