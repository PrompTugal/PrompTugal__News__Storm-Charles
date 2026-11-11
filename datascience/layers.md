> Kept by incident.datascience@web-summit.dinis, 2026-11-11, 11:57 UTC

# How to communicate it: the site in layers, from the use case to the data

Dinis, ~11:45 (BRIEF.md): "what we have starts to move to the back end of the website, and you start to add layer and then layer of abstraction ... focused on the use case, focus on the user ... it gets deeper and deeper ... as they go along." This is the data scientist's half of that plan, for **incident.sherpa@** (the guided paths), **incident.brief@** (the decision brief) and **incident.designer@** (the parts). Not a warning service: every layer says IPMA warns and ANEPC instructs.

## The rule of the layers

Each layer answers one question in the reader's words, and links one step down. **No figure appears in a layer unless the layer below holds its source, time read, method and confidence.** Going down adds detail and uncertainty; it never changes the answer above without changing the answer above too.

| Layer | Reader | Question | What it shows | From (data) | Kept by |
|---|---|---|---|---|---|
| **0. The use case** | anyone in Lisbon now; a stranded visitor | "Am I under a warning, now and in the next hours? What do the authorities say I should do?" | IPMA's level for where I am, its window, ANEPC's instruction, one link to my use case (flight, getting around, where to go) | `weather/warnings.json`; `decisions/`; `transport/` | sherpa@, weather@ |
| **1. The picture** | a resident, an organiser, a hotel desk | "How big is this, and when is the worst?" | one sentence and one number per area: *about 2.3 million residents of Lisbon district are under red for rain from 09 to 18 UTC* (residents, not people at risk); a strip of hours coloured by IPMA level; high water time at Cascais | `exposure/people-by-hour.json`, `tides.json` | brief@, designer@ |
| **2. The decision brief** | a decision-maker, a journalist | "What is decided, what could change, how sure is anyone?" | the authorities' decisions; three scenarios with **shares of forecasts, not the chance of it happening**; the sources-compared table with HIGH/MEDIUM/LOW; who is exposed by district and municipality (65+ included) | `exposure/ensemble.json`, `population.json`, `lisbon-municipalities.json`; `weather/analysis.md` | brief@ |
| **3. The map** | planners, the press desk, the Fringe and main sites | "Where exactly?" | Lisbon in 49 squares: residents, low land, hospitals; Madeira by zone | `exposure/lisbon-grid.json`, `hospitals.json` | designer@, broadcast@ |
| **4. The method** | analysts, other newsrooms, the curious | "How was this made, and where is it weak?" | one card per data set: source, licence, time read, method, confidence, known limits (residents not visitors; the DEM is a surface model; tides above mean sea level) | `exposure/README.md`, each file's `method` and `confidence` | datascience@ |
| **5. The data** | agents, developers, the Fringe site | "Give me the numbers." | the JSON itself, at `api/v1/<incident>/exposure/*` with sha256 | `incidents/*/data/exposure/*.json` | datascience@ |

## Words to use (and not)

- **Residents under a red warning**, never "people at risk" or "people affected". Residents are where people sleep (Census 2021), not where they are at noon, and not the ~70,000 visitors.
- **Shares of forecasts, not the chance of it happening**: "41 % of the 51 ECMWF forecasts take the centre within about 55 km of Lisbon", never "a 41 % chance".
- **Low land (0.5–5 m above sea level)** is where water *can* reach first; never "flood zone". Say the surface-model limit wherever a low-land figure is shown.
- **Model**, not forecast of ours: every model figure names its model and run time; IPMA's warnings outrank it.
- A figure with **LOW confidence** never appears at layers 0–1.

## How a figure travels up (one example)

1. Data (5): `people-by-hour.json` → `areas[LSB].residents = 2,275,385`, `hours_red = 9`, `first_red_utc 09:00`, `last_red_utc 18:00`, read at its `read_utc`.
2. Method (4): census counts × IPMA windows; HIGH; residents not visitors.
3. Map/brief (2–3): the district's row in the exposure table, with 65+ (489,002).
4. Picture (1): "About 2.3 million residents of Lisbon district are under IPMA's red warning for rain until 18:00 UTC (IPMA, read 11:50 UTC; INE Census 2021)."
5. Use case (0): "Lisbon: red warning for rain until 18:00 UTC. ANEPC: [its instruction, linked]." No number needed.

## For each partner

- **sherpa@**: layer 0 never needs our exposure numbers; it needs the level, the window and the instruction for *where the reader is*. A "how big is this?" link goes to layer 1. A "Lisbon square" lookup (lisbon-grid.json: which square am I in, nearest OSM hospitals) is available for "where do I go".
- **brief@**: `people-by-hour.json` gives the "people under each level, hour by hour" grid and the small multiples every 3 h; `ensemble.json` gives the three scenarios (north / near / south; refresh with each run: `node tools/ds-ensemble.mjs`); `lisbon-municipalities.json` gives the metro table. Quote `method` and `confidence` in the brief's "estimates and how they are made".
- **designer@**: confidence as a part (HIGH / MEDIUM / LOW) that looks different from a fact; IPMA's colours only for IPMA levels, so the residents-by-hour strip uses IPMA's colours for the levels and a neutral token for counts; a source and time read after every figure.

## Open

- Refresh rhythm: `tools/ds-exposure.mjs` after each IPMA change (the meteorologist's hourly read at :22 is the natural moment); `tools/ds-ensemble.mjs` after each ECMWF run (00/06/12/18 UTC, available ~7–8 h later); `tools/ds-tides.mjs` daily.
- Not yet filled: power (E-REDES), ANEPC incident counts, precedents table, IH's official tides (needs an account): see [gaps.md](gaps.md).
