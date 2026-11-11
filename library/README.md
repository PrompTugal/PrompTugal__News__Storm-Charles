# The library: everything on this site, and where it came from

> Kept by incident.librarian@web-summit.dinis. This page and [index.json](index.json) are built from the repository by [`tools/library-index.mjs`](../tools/library-index.mjs); nobody writes them by hand. **197 files**, the newest change 11-11 00:01 UTC. Nothing here is guessed: what a file does not say about itself is left empty and listed under [Gaps](#gaps).

Not a warning service: follow IPMA, ANEPC and your local authorities.

**For agents:** [library/index.json](index.json) (every file: kind, what it is, who, when, made from, links in and out, sha256) · [library/provenance.json](provenance.json) (who committed what) · the data files' catalogue with the served sha256: [api/v1/index.json](../api/v1/index.json).

**Also here:** [the agents' behaviour policies](abp.md) (drafts, not agreed by Dinis) · [the release history](releases.md) (every version, what changed, whether it was served) · [the reading list](reading/README.md) (what newsroom.sgit.ai's articles mean for this site) · [the glossary](glossary.md) (fact, evidence, hypothesis and the other words this site uses). · [the path policy](../agents/policy.json) and its check, [tools/policy-check.mjs](../tools/policy-check.mjs) · a draft for the conductor: [the shape of now.json](drafts/now-json.md).

**How to read a row.** *By* is who the file itself says wrote or keeps it; the agents named in its commits follow when they differ. *Changed* is the last commit (UTC) when it is known, else the date the file gives for itself. *Made from* is the sources its own header names.

| Kind | Files | What it is |
|---|---|---|
| [rules](#rules) | 1 | The rules every agent reads first. |
| [brief](#brief) | 2 | Dinis's direction, close to his words, and its corrections. |
| [plan](#plan) | 3 | Proposals and priorities: what is to be built and in what order. |
| [record](#record) | 1 | What exists. |
| [decision log](#decision-log) | 2 | The timeline of signals and the decisions, newest first. |
| [incident record](#incident-record) | 2 | The incident's own page and front-page record. |
| [dataset](#dataset) | 29 | JSON data: every value with its source and the time read. |
| [dataset doc](#dataset-doc) | 6 | What a dataset holds and who keeps it. |
| [analysis](#analysis) | 1 | Our analysis, labelled as analysis: a hypothesis with its reasons, never a fact. |
| [research](#research) | 22 | Research files: what was found, where, and when it was read. |
| [reading](#reading) | 3 | The reading list: what others wrote that bears on this site, and what it means here. |
| [library](#library) | 10 | The catalogue itself, the glossary, the standard. |
| [agent file](#agent-file) | 25 | Each agent's jobs, status and asks. |
| [comms draft](#comms-draft) | 6 | Drafts for people; a person sends. |
| [material](#material) | 1 | Material offered to another newsroom's desk. |
| [outreach](#outreach) | 4 | How to contribute, and drafts for experts; a person sends. |
| [design](#design) | 10 | Design rounds and notes. |
| [tool](#tool) | 25 | Scripts the agents run. |
| [build](#build) | 3 | The build, the gate and CI. |
| [admin](#admin) | 1 | The admin area. |
| [app](#app) | 36 | What runs in the browser. |
| [repository](#repository) | 4 | The repository's own files. |

## rules

The rules every agent reads first.

| File | What it is | By | Changed | Made from |
|---|---|---|---|---|
| [`CLAUDE.md`](../CLAUDE.md) | **storm-charles.promptugal.news: the rules of this repository.** A newsroom for people and a data source for agents on Storm Charles (Lisbon, 10 to 12 November 2026), and the template for the next incident. Built and run by Dinis Cruz's incident team: … | *not said in the file*; commits: incident.conductor@ | 11-10 23:49 | [`BRIEF.md`](../BRIEF.md), [`PIPELINE.md`](../PIPELINE.md), [`ROADMAP.md`](../ROADMAP.md) |

## brief

Dinis's direction, close to his words, and its corrections.

| File | What it is | By | Changed | Made from |
|---|---|---|---|---|
| [`BRIEF-CORRECTIONS.md`](../BRIEF-CORRECTIONS.md) | **Brief corrections and departures from the estate's standard.**  | *not said in the file*; commits: incident.conductor@ | 11-10 21:14 |  |
| [`BRIEF.md`](../BRIEF.md) | **Brief.** Dinis Cruz, 10 November 2026, in his session with incident.conductor@web-summit.dinis (close to his words). The incident team's own brief, from his voice memo of about 19:00 UTC, is in … | Dinis Cruz (as recorded by incident.conductor@web-summit.dinis) | 11-10 23:35 |  |

## plan

Proposals and priorities: what is to be built and in what order.

| File | What it is | By | Changed | Made from |
|---|---|---|---|---|
| [`PIPELINE.md`](../PIPELINE.md) | **The incident site: repository, pipeline, data and dashboard (a proposal for Dinis).** The direction and priorities it serves: ROADMAP.md (Dinis, ~19:15: a proxy of the flows, a newsroom and a data source for agents). | incident.conductor@ | 11-10 21:14 | [`ROADMAP.md`](../ROADMAP.md) |
| [`ROADMAP.md`](../ROADMAP.md) | **The incident site: a newsroom for people and a data source for agents (roadmap, in priority order).** By incident.conductor@web-summit.dinis, 10 November 2026, ~19:20 UTC, from Dinis's direction in his session (close to his words): a separate repository that publishes "super fast"; "a proxy of the … | incident.conductor@ | 11-10 21:14 | [`PIPELINE.md`](../PIPELINE.md) |
| [`SECURITY.md`](../SECURITY.md) | **Security: Dinis's login, his lane to the conductor, his vaults.** Kept by incident.identity@web-summit.dinis, 10 November 2026, 23:55 UTC. At Dinis Cruz's word of 10 November, ~23:40 UTC (BRIEF.md). A design, then what is built; each section says which. Reused, … | incident.identity@ | 11-10 23:53 | [`BRIEF.md`](../BRIEF.md), [`app/login/pki/PIN.json`](../app/login/pki/PIN.json) |

## record

What exists.

| File | What it is | By | Changed | Made from |
|---|---|---|---|---|
| [`REALITY.md`](../REALITY.md) | **Reality: what exists (a thing not here does not exist).** Version: see /version.json on the live site (CI writes it; never committed). | *not said in the file*; commits: incident.conductor@ | 11-10 21:14 |  |

## decision log

The timeline of signals and the decisions, newest first.

| File | What it is | By | Changed | Made from |
|---|---|---|---|---|
| [`incidents/2026-11-10-storm-charles/decisions.md`](../incidents/2026-11-10-storm-charles/decisions.md) | **Decisions (simulate first: each decision is written here before anyone acts).** Newest first. | conductor@ (commits: incident.conductor@) | 11-10 21:14 | [websummit.com](https://websummit.com/blog/web-summit/important-event-update-2026/) |
| [`incidents/2026-11-10-storm-charles/timeline.md`](../incidents/2026-11-10-storm-charles/timeline.md) | **Timeline (UTC, 10 to 11 November 2026).** Newest first (from 18:58, at the incident conductor's takeover). Facts and evidence carry their source; anything unofficial says so. | *not said in the file*; commits: incident.conductor@ | 11-11 00:00 | [`incidents/2026-11-10-storm-charles/data/weather/airport.json`](../incidents/2026-11-10-storm-charles/data/weather/airport.json), [`incidents/2026-11-10-storm-charles/data/weather/analysis.md`](../incidents/2026-11-10-storm-charles/data/weather/analysis.md), [`incidents/2026-11-10-storm-charles/data/weather/cap.json`](../incidents/2026-11-10-storm-charles/data/weather/cap.json), [`research/media/coverage.json`](../research/media/coverage.json), [api.ipma.pt](https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json) |

## incident record

The incident's own page and front-page record.

| File | What it is | By | Changed | Made from |
|---|---|---|---|---|
| [`incidents/2026-11-10-storm-charles/README.md`](../incidents/2026-11-10-storm-charles/README.md) | **Incident: the storm on Wednesday 11 November (run as P1).** Declared (board WS-214) by conductor@web-summit.dinis at Dinis's word ("I want to run this weather situation as an incident, only here in our account", in his own session, 10 November 2026, about … | conductor@ (commits: incident.conductor@) | 11-10 21:14 |  |
| [`incidents/2026-11-10-storm-charles/incident.json`](../incidents/2026-11-10-storm-charles/incident.json) | **Storm Charles, Lisbon: Wednesday 11 November 2026.** The incident's front-page record, kept by incident.conductor@web-summit.dinis. The headline is always a decision or warning from its primary source, with the time it was published; the front page … | incident.conductor@ | 11-10 23:53 |  |

## dataset

JSON data: every value with its source and the time read.

| File | What it is | By | Changed | Made from |
|---|---|---|---|---|
| [`data/agents/commits.json`](../data/agents/commits.json) | The last commits on dev of this repository: who pushed what, when, and for whom (Agent: and For: trailers), and each pair's count. Written by tools/agents-commits.mjs from git log; a snapshot as of … | incident.observability@ | 11-10 23:57 | [`tools/agents-commits.mjs`](../tools/agents-commits.mjs) |
| [`data/agents/index.json`](../data/agents/index.json) | Every agent of the incident team behind storm-charles.promptugal.news: its job (agents/JOBS.md), what it says it is doing, has done, will do next and asks for (agents/<role>/status.json; asks … | incident.observability@ | 11-10 23:56 | [`agents/JOBS.md`](../agents/JOBS.md), [`data/keys.json`](../data/keys.json), [`tools/agents-index.mjs`](../tools/agents-index.mjs) |
| [`data/agents/obs.json`](../data/agents/obs.json) | Where app/agents/obs.js sends page views and reads, when it is switched on. Public on purpose: an append token can only write to its lane, and the key can only encrypt. Off until a vault with append … | incident.observability@ | 11-10 23:54 | [`agents/observability/status.json`](../agents/observability/status.json) |
| [`data/graph/ontology.json`](../data/graph/ontology.json) | The ontology of an incident on this site: eight kinds of thing and eight relations, small enough to explain on one page (README.md beside this file). tools/graph-build.mjs reads it, builds … | incident.graph@ | 11-10 23:58 | [`data/graph/README.md`](../data/graph/README.md), [`tools/graph-build.mjs`](../tools/graph-build.mjs), [`data/graph/storm.json`](../data/graph/storm.json) |
| [`data/graph/queries.json`](../data/graph/queries.json) | The worked queries of the query page (/data/query/): each answers a real question about Storm Charles from the tables built by tools/graph-build.mjs. SQL for SQLite. Kept by … | incident.graph@ | 11-11 00:00 | [`tools/graph-build.mjs`](../tools/graph-build.mjs) |
| [`data/graph/ref/ipma-areas.json`](../data/graph/ref/ipma-areas.json) | IPMA's warning areas by code (idAreaAviso), from IPMA's list of districts and islands: the first place listed for each area gives its name and coordinates. Reference data for the graph's Place nodes. … | *not said in the file*; commits: incident.graph@ | 11-10 23:44 | [api.ipma.pt](https://api.ipma.pt/open-data/distrits-islands.json), [`tools/graph-places.mjs`](../tools/graph-places.mjs) |
| [`data/graph/storm-elsewhere.json`](../data/graph/storm-elsewhere.json) | The rest of the graph of Storm Charles, Lisbon: Wednesday 11 November 2026: IPMA's red and orange warnings in force outside the Lisbon district, and those districts. Same shape as … | *not said in the file*; commits: incident.graph@ | 11-11 00:00 | [`data/graph/storm.json`](../data/graph/storm.json), [`tools/graph-build.mjs`](../tools/graph-build.mjs) |
| [`data/graph/storm.json`](../data/graph/storm.json) | One graph of Storm Charles, Lisbon: Wednesday 11 November 2026: actors, decisions, warnings, signals, sources, places, datasets and agents, built from the incident's JSON files by … | *not said in the file*; commits: incident.graph@ | 11-11 00:00 | [`tools/graph-build.mjs`](../tools/graph-build.mjs), [`data/graph/ontology.json`](../data/graph/ontology.json) |
| [`data/graph/tables/actors.json`](../data/graph/tables/actors.json) | Who decides, warns or reports: bodies, operators, the organiser, outlets (outlets are derived from cited hosts). Built by tools/graph-build.mjs from the incident's JSON; every row carries label, … | *not said in the file*; commits: incident.graph@ | 11-11 00:00 | [`tools/graph-build.mjs`](../tools/graph-build.mjs) |
| [`data/graph/tables/decisions.json`](../data/graph/tables/decisions.json) | Decisions and issued warnings: who (by), what, when (at, at_epoch in seconds when known to the minute), status, and what each followed. Built by tools/graph-build.mjs from the incident's JSON; every … | *not said in the file*; commits: incident.graph@ | 11-11 00:00 | [`tools/graph-build.mjs`](../tools/graph-build.mjs) |
| [`data/graph/tables/signals.json`](../data/graph/tables/signals.json) | The timeline as rows: one per signal, with who published it (publisher) where the source has a URL. Built by tools/graph-build.mjs from the incident's JSON; every row carries label, source, read and … | *not said in the file*; commits: incident.graph@ | 11-11 00:00 | [`tools/graph-build.mjs`](../tools/graph-build.mjs) |
| [`data/graph/tables/sources.json`](../data/graph/tables/sources.json) | Every URL read: the researcher's list, every other URL an item cites and the pages covering the storm (coverage: liveblog, explainer, ...; from research/weather-sites), with its publisher, how often … | *not said in the file*; commits: incident.graph@ | 11-11 00:00 | [`tools/graph-build.mjs`](../tools/graph-build.mjs) |
| [`data/graph/tables/timeline.json`](../data/graph/tables/timeline.json) | The lead-time line: every warning and decision with a time known to the minute, in order: hours since the previous one, since the first, before the first red warning starts in Lisbon … | *not said in the file*; commits: incident.graph@ | 11-11 00:00 | [`tools/graph-build.mjs`](../tools/graph-build.mjs) |
| [`data/graph/tables/warnings.json`](../data/graph/tables/warnings.json) | Warnings: issued (when made or first read), in_force (type, level, area, start, end: IPMA), cap (IPMA's own CAP messages for Lisbon: at is when IPMA sent it; an Update names the message it replaces) … | *not said in the file*; commits: incident.graph@ | 11-11 00:00 | [`tools/graph-build.mjs`](../tools/graph-build.mjs) |
| [`data/keys.json`](../data/keys.json) | Public keys of the agents that write this repository. Public halves only: no private key, vault key or token is ever listed here. Each entry was added by the agent that made it, in its own session; … | *not said in the file*; commits: incident.conductor@, incident.designer@, incident.graph@, incident.identity@, incident.librarian@, incident.media@, incident.observability@, incident.weatherwatch@ | 11-10 23:44 |  |
| [`data/lanes.json`](../data/lanes.json) | The lanes between Dinis Cruz and incident.conductor@web-summit.dinis (incident.identity@web-summit.dinis, 10 November 2026; the design is SECURITY.md). Public on purpose: an append token can only … | incident.identity@ | 11-10 23:53 | [`SECURITY.md`](../SECURITY.md), [`agents/identity/status.json`](../agents/identity/status.json) |
| [`incidents/2026-11-10-storm-charles/data/decisions/graph.json`](../incidents/2026-11-10-storm-charles/data/decisions/graph.json) ([api](../api/v1/2026-11-10-storm-charles/decisions/graph.json)) | The decision graph of the storm (WS-214), kept by incident.researcher@web-summit.dinis. Nodes are decision-makers; edges are decisions, each with who made it (by), whom it touches (to) and what it … | incident.researcher@ (commits: incident.conductor@) | 11-10 23:57 |  |
| [`incidents/2026-11-10-storm-charles/data/decisions/sources.json`](../incidents/2026-11-10-storm-charles/data/decisions/sources.json) ([api](../api/v1/2026-11-10-storm-charles/decisions/sources.json)) | Every source incident.researcher@ uses for WS-214: what it holds, how often it changes, whether a machine can read it, its status when last tried. parser_ask = the part we ask incident.dev@ to parse. | *not said in the file*; commits: incident.conductor@ | 11-10 23:03 |  |
| [`incidents/2026-11-10-storm-charles/data/signals.json`](../incidents/2026-11-10-storm-charles/data/signals.json) ([api](../api/v1/2026-11-10-storm-charles/signals.json)) | The incident timeline as data, made from timeline.md by tools/timeline.mjs (never edit by hand; edit timeline.md). See README.md. | *not said in the file*; commits: incident.conductor@ | 11-11 00:00 | [`incidents/2026-11-10-storm-charles/timeline.md`](../incidents/2026-11-10-storm-charles/timeline.md), [`tools/timeline.mjs`](../tools/timeline.mjs), [`incidents/2026-11-10-storm-charles/data/README.md`](../incidents/2026-11-10-storm-charles/data/README.md) |
| [`incidents/2026-11-10-storm-charles/data/watch/websummit.json`](../incidents/2026-11-10-storm-charles/data/watch/websummit.json) ([api](../api/v1/2026-11-10-storm-charles/watch/websummit.json)) | Web Summit's own channels, watched for its decisions (Wednesday 11 November: off, 19:38; now Day 3 and the open items: talks, PITCH, side events, tickets): the blog's listings (polled every 2 … | *not said in the file*; commits: incident.conductor@ | 11-10 21:37 | [`tools/websummit.mjs`](../tools/websummit.mjs), [`incidents/2026-11-10-storm-charles/data/README.md`](../incidents/2026-11-10-storm-charles/data/README.md) |
| [`incidents/2026-11-10-storm-charles/data/weather/airport.json`](../incidents/2026-11-10-storm-charles/data/weather/airport.json) ([api](../api/v1/2026-11-10-storm-charles/weather/airport.json)) | IPMA's aeronautical forecast (TAF) and observations (METAR) for Lisbon airport (LPPT), read through the US NOAA Aviation Weather Center's public API. Knots, with km/h (1 kt = 1.852 km/h). A point … | *not said in the file*; commits: incident.conductor@ | 11-10 23:57 |  |
| [`incidents/2026-11-10-storm-charles/data/weather/analysis.json`](../incidents/2026-11-10-storm-charles/data/weather/analysis.json) ([api](../api/v1/2026-11-10-storm-charles/weather/analysis.json)) | Reasoning from the facts in this folder; not IPMA's words. Times are UTC = Lisbon time (WET). See analysis.md for the reasons. | incident.meteorologist@ (commits: incident.conductor@) | 11-11 00:00 | [`incidents/2026-11-10-storm-charles/data/weather/analysis.md`](../incidents/2026-11-10-storm-charles/data/weather/analysis.md) |
| [`incidents/2026-11-10-storm-charles/data/weather/cap.json`](../incidents/2026-11-10-storm-charles/data/weather/cap.json) ([api](../api/v1/2026-11-10-storm-charles/weather/cap.json)) | IPMA's warnings for the Lisbon district as CAP messages (Common Alerting Protocol), read through MeteoAlarm's public feed. Unlike IPMA's open data, each message carries `sent_utc`, the time IPMA … | *not said in the file*; commits: incident.conductor@ | 11-10 23:57 | [feeds.meteoalarm.org](https://feeds.meteoalarm.org/api/v1/warnings/feeds-portugal) |
| [`incidents/2026-11-10-storm-charles/data/weather/changes.json`](../incidents/2026-11-10-storm-charles/data/weather/changes.json) ([api](../api/v1/2026-11-10-storm-charles/weather/changes.json)) | thursday (first): Lisbon warnings touching Thursday 12 Nov and the forecasts for its morning. gusts_above_warned: every LPPT METAR gust from Wed 05:00 above the gust warned for that hour (the IPMA … | *not said in the file*; commits: incident.conductor@ | 11-10 23:57 | [`incidents/2026-11-10-storm-charles/data/weather/tools/refresh.py`](../incidents/2026-11-10-storm-charles/data/weather/tools/refresh.py) |
| [`incidents/2026-11-10-storm-charles/data/weather/communiques.json`](../incidents/2026-11-10-storm-charles/data/weather/communiques.json) ([api](../api/v1/2026-11-10-storm-charles/weather/communiques.json)) | IPMA's communiqués (special weather information) from its RSS feed, kept across reads; earthquake notices left out. | *not said in the file*; commits: incident.conductor@ | 11-10 23:57 | [ipma.pt](https://www.ipma.pt/resources.www/rss/comunicados.xml) |
| [`incidents/2026-11-10-storm-charles/data/weather/forecast.json`](../incidents/2026-11-10-storm-charles/data/weather/forecast.json) ([api](../api/v1/2026-11-10-storm-charles/weather/forecast.json)) | IPMA's own forecast for Lisbon (globalIdLocal 1110600): the 5-day daily forecast and the hourly model forecast (mean wind, no gusts). IPMA's wind classes: 1 weak, 2 moderate, 3 strong, 4 very strong. | *not said in the file*; commits: incident.conductor@ | 11-10 23:57 |  |
| [`incidents/2026-11-10-storm-charles/data/weather/gusts-vs-forecast.json`](../incidents/2026-11-10-storm-charles/data/weather/gusts-vs-forecast.json) ([api](../api/v1/2026-11-10-storm-charles/weather/gusts-vs-forecast.json)) | The latest observed wind in Lisbon against what was forecast for that hour. Facts with sources; no analysis here (see analysis.md). | *not said in the file*; commits: incident.conductor@ | 11-10 23:57 | [`incidents/2026-11-10-storm-charles/data/weather/analysis.md`](../incidents/2026-11-10-storm-charles/data/weather/analysis.md) |
| [`incidents/2026-11-10-storm-charles/data/weather/stations.json`](../incidents/2026-11-10-storm-charles/data/weather/stations.json) ([api](../api/v1/2026-11-10-storm-charles/weather/stations.json)) | IPMA's hourly station observations in and next to Lisbon, kept across reads (the feed holds 24 hours). Mean wind only: this feed has NO gusts; gusts are in the airport's METAR (airport.json). | *not said in the file*; commits: incident.conductor@ | 11-10 23:57 | [api.ipma.pt](https://api.ipma.pt/open-data/observation/meteorology/stations/observations.json), [api.ipma.pt](https://api.ipma.pt/open-data/observation/meteorology/stations/stations.json), [`incidents/2026-11-10-storm-charles/data/weather/airport.json`](../incidents/2026-11-10-storm-charles/data/weather/airport.json) |
| [`incidents/2026-11-10-storm-charles/data/weather/warnings.json`](../incidents/2026-11-10-storm-charles/data/weather/warnings.json) ([api](../api/v1/2026-11-10-storm-charles/weather/warnings.json)) | IPMA's weather warnings for the Lisbon district (idAreaAviso LSB), non-green only; red and orange warnings elsewhere; and how Lisbon's warnings changed over time. Times are local = UTC (WET). IPMA's … | *not said in the file*; commits: incident.conductor@ | 11-10 23:57 | [api.ipma.pt](https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json), [`incidents/2026-11-10-storm-charles/data/weather/cap.json`](../incidents/2026-11-10-storm-charles/data/weather/cap.json) |

## dataset doc

What a dataset holds and who keeps it.

| File | What it is | By | Changed | Made from |
|---|---|---|---|---|
| [`data/graph/README.md`](../data/graph/README.md) | **The graph of the storm, and its ontology.** One graph of Storm Charles: who decided and warned what, when, what was reported, where it was read, and which agent keeps which dataset. Kept by incident.graph@web-summit.dinis. Built from the … | incident.graph@ | 11-11 00:00 | [`tools/graph-build.mjs`](../tools/graph-build.mjs), [prociv.gov.pt](https://prociv.gov.pt/), [ipma.pt](https://www.ipma.pt/) |
| [`data/query/about.md`](../data/query/about.md) | **Query the storm: how the page works.** The query page is a database that runs in your browser. It loads this site's JSON, builds eight tables in memory, and runs the SQL you write. There is no server behind it: nothing is uploaded, … | incident.graph@ | 11-11 00:00 | [`data/query/index.html`](../data/query/index.html) |
| [`data/query/index.html`](../data/query/index.html) |  | *not said in the file*; commits: incident.graph@ | 11-11 00:00 |  |
| [`incidents/2026-11-10-storm-charles/data/README.md`](../incidents/2026-11-10-storm-charles/data/README.md) | **The storm's data (WS-214).** JSON first: the incident dashboard (the incident page), Vicky's agents and the work desk read these files, not pages. Every item carries one label: fact, evidence or hypothesis (the meteorologist's … | *not said in the file*; commits: incident.conductor@ | 11-10 21:37 | [`incidents/2026-11-10-storm-charles/README.md`](../incidents/2026-11-10-storm-charles/README.md), [`incidents/2026-11-10-storm-charles/data/decisions/README.md`](../incidents/2026-11-10-storm-charles/data/decisions/README.md), [`incidents/2026-11-10-storm-charles/data/decisions/graph.json`](../incidents/2026-11-10-storm-charles/data/decisions/graph.json), [`incidents/2026-11-10-storm-charles/data/decisions/sources.json`](../incidents/2026-11-10-storm-charles/data/decisions/sources.json), [`incidents/2026-11-10-storm-charles/data/signals.json`](../incidents/2026-11-10-storm-charles/data/signals.json), [`incidents/2026-11-10-storm-charles/data/watch/websummit.json`](../incidents/2026-11-10-storm-charles/data/watch/websummit.json), and 5 more |
| [`incidents/2026-11-10-storm-charles/data/decisions/README.md`](../incidents/2026-11-10-storm-charles/data/decisions/README.md) | **The decision graph of the storm (WS-214).** Kept by incident.researcher@web-summit.dinis for the incident team, the dashboard and Vicky's agents (as material). JSON first: read the data, not the pages. | incident.researcher@ (commits: incident.conductor@) | 11-10 23:57 |  |
| [`incidents/2026-11-10-storm-charles/data/weather/README.md`](../incidents/2026-11-10-storm-charles/data/weather/README.md) | **The weather picture: data (WS-214, the storm on Wednesday 11 November 2026).** Kept by incident.meteorologist@web-summit.dinis for the incident team, the dashboard and, as material, Vicky's weather desk. JSON first: read these files, not pages. Every record carries source (the … | incident.meteorologist@ (commits: incident.conductor@) | 11-10 23:55 | [`agents/meteorologist/status.json`](../agents/meteorologist/status.json), [`incidents/2026-11-10-storm-charles/data/weather/airport.json`](../incidents/2026-11-10-storm-charles/data/weather/airport.json), [`incidents/2026-11-10-storm-charles/data/weather/changes.json`](../incidents/2026-11-10-storm-charles/data/weather/changes.json), [`incidents/2026-11-10-storm-charles/data/weather/communiques.json`](../incidents/2026-11-10-storm-charles/data/weather/communiques.json), [`incidents/2026-11-10-storm-charles/data/weather/forecast.json`](../incidents/2026-11-10-storm-charles/data/weather/forecast.json), [`incidents/2026-11-10-storm-charles/data/weather/gusts-vs-forecast.json`](../incidents/2026-11-10-storm-charles/data/weather/gusts-vs-forecast.json), and 9 more |

## analysis

Our analysis, labelled as analysis: a hypothesis with its reasons, never a fact.

| File | What it is | By | Changed | Made from |
|---|---|---|---|---|
| [`incidents/2026-11-10-storm-charles/data/weather/analysis.md`](../incidents/2026-11-10-storm-charles/data/weather/analysis.md) | **Analysis: when the worst arrives in Lisbon on Wednesday, and how far ahead each warning could be known.** Label: ANALYSIS (incident.meteorologist@web-summit.dinis, 10 November 2026, written at 19:05 UTC from the data in this folder as read at 19:01 UTC). The facts it rests on are in the JSON files beside … | incident.meteorologist@ (commits: incident.conductor@) | 11-11 00:00 | [`incidents/2026-11-10-storm-charles/data/weather/analysis.json`](../incidents/2026-11-10-storm-charles/data/weather/analysis.json) |

## research

Research files: what was found, where, and when it was read.

| File | What it is | By | Changed | Made from |
|---|---|---|---|---|
| [`research/media/README.md`](../research/media/README.md) | **Media watch: who is covering Storm Charles.** Kept by incident.media@web-summit.dinis for the incident team (WS-214), at Dinis Cruz's word of 10 November 2026, ~23:40 UTC: "a mapping for the social media, the media watch ... who are all the … | incident.media@ | 11-10 23:59 | [prociv.gov.pt](https://prociv.gov.pt/), [ipma.pt](https://www.ipma.pt/) |
| [`research/media/coverage.json`](../research/media/coverage.json) | Who is covering Storm Charles (Lisbon, 10 to 12 November 2026): press articles and live blogs (`articles`), the official channels (`official`) and what can be read of social platforms without a login … | incident.media@ | 11-10 23:58 |  |
| [`research/media/feeds.json`](../research/media/feeds.json) | The public RSS feeds and news sitemaps (as listed in each site's robots.txt) the media watch reads (research/media/tools/harvest.mjs). last_status is the HTTP status at the last run. RSS feeds that … | *not said in the file*; commits: incident.media@ | 11-10 23:58 | [`research/media/tools/harvest.mjs`](../research/media/tools/harvest.mjs) |
| [`research/media/outlets.json`](../research/media/outlets.json) | The outlets seen covering Storm Charles (Lisbon, 10 to 12 November 2026), each with what coverage.json shows of it: counts, the by-lines as printed on its articles (reporters in their public … | incident.media@ | 11-10 23:58 | [`research/media/coverage.json`](../research/media/coverage.json), [`research/media/tools/rank.mjs`](../research/media/tools/rank.mjs) |
| [`research/media/ranking.md`](../research/media/ranking.md) | **Media watch: who is fastest, who is most sourced.** Label: analysis (incident.media@web-summit.dinis), computed at 10 Nov 23:57 UTC from coverage.json: 212 items from 16 outlets, each read from the outlet's own page, feed or news sitemap. It ranks … | *not said in the file*; commits: incident.media@ | 11-10 23:58 | [`research/media/coverage.json`](../research/media/coverage.json), [prociv.gov.pt](https://prociv.gov.pt/), [ipma.pt](https://www.ipma.pt/) |
| [`research/media/seeds.txt`](../research/media/seeds.txt) | URLs seen in an outlet's public feed at an earlier read and since scrolled out of it (one per line). harvest.mjs reads them again and keeps those about the storm. | *not said in the file*; commits: incident.media@ | 11-10 23:58 |  |
| [`research/media/tools/harvest.mjs`](../research/media/tools/harvest.mjs) | Media watch harvester (incident.media@web-summit.dinis). No dependencies, Node 18+. MEDIA_RAW=<dir outside git node research/media/tools/harvest.mjs 1. reads the public RSS feeds in … | incident.media@ | 11-10 23:58 |  |
| [`research/media/tools/rank.mjs`](../research/media/tools/rank.mjs) | Media watch, last step (incident.media@web-summit.dinis): from research/media/coverage.json's articles it writes - coverage.json's header, counts and official list (official channels, from … | incident.media@ | 11-10 23:58 |  |
| [`research/media/tools/social.mjs`](../research/media/tools/social.mjs) | Official and social channels on the storm, read without a login (incident.media@web-summit.dinis). Node 18+. node research/media/tools/social.mjs - the official and social keys of … | incident.media@ | 11-10 23:58 |  |
| [`research/media/tools/wikipedia.mjs`](../research/media/tools/wikipedia.mjs) | Wikipedia watch (incident.media@web-summit.dinis): the edit history of the pages about the storm, through MediaWiki's REST API (/w/rest.php/v1/page/<title/bare and /history). One request every 5 … | incident.media@ | 11-10 23:58 |  |
| [`research/media/wikipedia.json`](../research/media/wikipedia.json) | Wikipedia on Storm Charles: which pages exist (pt, en; es checked) and their edit history: revision id, time (UTC), size in bytes and change in bytes. Editors' names and edit comments are not kept. … | incident.media@ | 11-10 23:58 |  |
| [`research/weather-sites/README.md`](../research/weather-sites/README.md) | **The best weather sites, and who is covering Storm Charles.** Research for the home page, by incident.weatherwatch@web-summit.dinis, for incident.designer@web-summit.dinis. The data is sites.json, with gap.json (who shows what) and imagery.json (what imagery we … | incident.weatherwatch@ | 11-10 23:58 | [`research/weather-sites/gap.json`](../research/weather-sites/gap.json), [`research/weather-sites/imagery.json`](../research/weather-sites/imagery.json), [`research/weather-sites/sites.json`](../research/weather-sites/sites.json) |
| [`research/weather-sites/gap.json`](../research/weather-sites/gap.json) | The gap analysis: for each of the 27 entries of the Storm Charles map in sites.json, whether it shows the six things this site is built on. Kept by incident.weatherwatch@web-summit.dinis. Judgements … | incident.weatherwatch@ | 11-10 23:56 | [`research/weather-sites/sites.json`](../research/weather-sites/sites.json) |
| [`research/weather-sites/imagery.json`](../research/weather-sites/imagery.json) | Imagery we may show: the reuse terms as read on each owner's own page, with the page's address, and a verdict for the designer: hotlink (load the owner's image or tiles in our page), copy (serve our … | incident.weatherwatch@ | 11-10 23:56 |  |
| [`research/weather-sites/meteoalarm-check.json`](../research/weather-sites/meteoalarm-check.json) | Does this site's use of IPMA's warnings meet MeteoAlarm's Terms and Conditions (https://www.meteoalarm.org/en/live/page/terms-and-conditions, last updated 15/03/2024, read 2026-11-10T23:53Z)? Checked … | *not said in the file*; commits: incident.weatherwatch@ | 11-10 23:58 |  |
| [`research/weather-sites/outreach/README.md`](../research/weather-sites/outreach/README.md) | **Drafts for a person to send (weather imagery).** Drafts only, by incident.weatherwatch@web-summit.dinis, asked for by incident.conductor@ on 10 November 2026. A person sends; no agent does. No contact details are kept here: the sender finds the … | incident.weatherwatch@ | 11-10 23:58 | [`research/weather-sites/imagery.json`](../research/weather-sites/imagery.json), [`research/weather-sites/outreach/eumetsat-registration.md`](../research/weather-sites/outreach/eumetsat-registration.md), [`research/weather-sites/outreach/ipma-radar.md`](../research/weather-sites/outreach/ipma-radar.md) |
| [`research/weather-sites/outreach/eumetsat-registration.md`](../research/weather-sites/outreach/eumetsat-registration.md) | **Draft: EUMETSAT, registering and accepting the licence.** Status: steps for a person. No agent registers or accepts terms: accepting a licence binds the person or organisation that accepts it. Read from EUMETSAT's guide … | *not said in the file*; commits: incident.weatherwatch@ | 11-10 23:58 |  |
| [`research/weather-sites/outreach/ipma-radar.md`](../research/weather-sites/outreach/ipma-radar.md) | **Draft: to IPMA, about showing the radar image.** Status: draft, not sent. A person sends it, in their own name. Where to send: IPMA's own contact page ("Contacto" on ipma.pt); no address is kept here. Before sending, Dinis settles the two points in … | *not said in the file*; commits: incident.weatherwatch@ | 11-10 23:58 |  |
| [`research/weather-sites/sites.json`](../research/weather-sites/sites.json) | Three maps of weather sites, for incident.designer@ and whoever builds the home page: (a) worldwide, (b) Portugal, (c) who covers Storm Charles and how. Kept by … | incident.weatherwatch@ | 11-10 23:51 |  |
| [`research/weather-sites/tools/gap.py`](../research/weather-sites/tools/gap.py) | Writes gap.json and imagery.json beside sites.json. Usage: gap.py <dir with sites.json. | *not said in the file*; commits: incident.weatherwatch@ | 11-10 23:56 |  |
| [`research/weather-sites/tools/gen.py`](../research/weather-sites/tools/gen.py) | Builds research/weather-sites/sites.json from the probe results (status, time read) and the entries below. | *not said in the file*; commits: incident.weatherwatch@ | 11-10 23:51 |  |
| [`research/weather-sites/tools/probe.sh`](../research/weather-sites/tools/probe.sh) | usage: probe.sh <outdir < urls ; one line per url: id<TABurl | *not said in the file*; commits: incident.weatherwatch@ | 11-10 23:47 |  |

## reading

The reading list: what others wrote that bears on this site, and what it means here.

| File | What it is | By | Changed | Made from |
|---|---|---|---|---|
| [`library/reading/README.md`](reading/README.md) | **The reading list: what newsroom.sgit.ai's articles mean for this site.** Kept by incident.librarian@web-summit.dinis, 2026-11-10, at Dinis Cruz's word ("read a lot of the articles, because a lot of the stuff that we talk about here is related"). Rendered from reading.json … | incident.librarian@ | 11-10 23:47 | [`library/README.md`](README.md), [`library/glossary.md`](glossary.md), [`library/reading/reading.json`](reading/reading.json), [`library/reading/standard.md`](reading/standard.md), [`tools/library-reading.mjs`](../tools/library-reading.mjs), [newsroom.sgit.ai](https://newsroom.sgit.ai/llms.txt) |
| [`library/reading/reading.json`](reading/reading.json) | The reading list: what the articles and design pages on newsroom.sgit.ai say that bears on this site, each with its argument in two sentences (our summary, not a quotation) and what it means here: a … | incident.librarian@ | 11-10 23:47 | [newsroom.sgit.ai](https://newsroom.sgit.ai/llms.txt), [`BRIEF.md`](../BRIEF.md), [`tools/library-reading.mjs`](../tools/library-reading.mjs) |
| [`library/reading/standard.md`](reading/standard.md) | **This repository against the estate's standard.** Kept by incident.librarian@web-summit.dinis, 10 November 2026. The standard is Every sgit repository: how the sites, the tools and the code are built (sgit.ai, first version, written 6 October 2026; … | incident.librarian@ | 11-10 23:47 | [`REALITY.md`](../REALITY.md), [`library/README.md`](README.md), [`library/reading/README.md`](reading/README.md), [sgit.ai](https://sgit.ai/docs/guidance/repositories.md) |

## library

The catalogue itself, the glossary, the standard.

| File | What it is | By | Changed | Made from |
|---|---|---|---|---|
| [`library/README.md`](README.md) | **The library: everything on this site, and where it came from.** The catalogue as a page, by kind, with the gaps listed. | incident.librarian@ |  | [`tools/library-index.mjs`](../tools/library-index.mjs) |
| [`library/abp.json`](abp.json) | What is particular to each agent's behaviour policy: its business task where agents/JOBS.md only says 'as before', what it reaches beyond the repository, and the gaps that are its own. … | incident.librarian@ | 11-10 23:59 | [`agents/JOBS.md`](../agents/JOBS.md), [`tools/library-abp.mjs`](../tools/library-abp.mjs), [`agents/policy.json`](../agents/policy.json), [`data/keys.json`](../data/keys.json), [`CLAUDE.md`](../CLAUDE.md) |
| [`library/abp.md`](abp.md) | **The agents' behaviour policies (drafts).** Kept by incident.librarian@web-summit.dinis, 2026-11-11, 00:05 UTC. DRAFTS, NOT AGREED BY DINIS. One Agent Behaviour Policy per incident agent, in the shape of web-summit.sgit.ai/abp/: Reach, … | incident.librarian@ | 11-10 23:59 | [`CLAUDE.md`](../CLAUDE.md), [`admin/build/build.mjs`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/blob/dev/admin/build/build.mjs), [`agents/JOBS.md`](../agents/JOBS.md), [`agents/conductor/policy.md`](../agents/conductor/policy.md), [`agents/designer/policy.md`](../agents/designer/policy.md), [`agents/identity/policy.md`](../agents/identity/policy.md), and 8 more |
| [`library/drafts/now-json.md`](drafts/now-json.md) | **Draft: the shape of now.json (one small file for an agent with one question).** Kept by incident.librarian@web-summit.dinis, 10 November 2026, 23:52 UTC. A draft for incident.conductor@ to build (asked 23:49 UTC); nothing serves it yet. From the reading list: "The agent is the … | incident.librarian@ | 11-10 23:50 | [`library/README.md`](README.md), [`library/reading/README.md`](reading/README.md) |
| [`library/glossary.md`](glossary.md) | **Glossary: the words this site uses.** Kept by incident.librarian@web-summit.dinis, 10 November 2026, from CLAUDE.md, ROADMAP.md, PIPELINE.md and the data's own READMEs. Each term in two lines: what it means here, and where it is defined … | incident.librarian@ | 11-10 23:50 | [`CLAUDE.md`](../CLAUDE.md), [`PIPELINE.md`](../PIPELINE.md), [`ROADMAP.md`](../ROADMAP.md), [`library/README.md`](README.md), [`library/reading/README.md`](reading/README.md) |
| [`library/index.json`](index.json) | **The catalogue, for agents.** Every file on this site: kind, what it is, who wrote it, when it changed, what it was made from, what links to it, sha256; and the gaps. | incident.librarian@ |  | [`tools/library-index.mjs`](../tools/library-index.mjs) |
| [`library/provenance.json`](provenance.json) | **Who committed what.** For each file: its commits' agents, the first and the last commit, and the sha256 the record holds for. | incident.librarian@ |  | [`tools/library-index.mjs`](../tools/library-index.mjs) |
| [`library/releases-runs.json`](releases-runs.json) | The deploy workflow's runs as GitHub's Actions API listed them (run number, conclusion, the commit built, when created): a snapshot the librarian takes by hand each wake, because the build cannot … | incident.librarian@ | 11-10 23:54 | [github.com](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/actions/workflows/deploy.yml), [`tools/library-releases.mjs`](../tools/library-releases.mjs) |
| [`library/releases.json`](releases.json) | The release history of storm-charles.promptugal.news: for every CI run number, the version, what its commits say changed (one line per commit, the commit's own subject), and what is known about … | incident.librarian@ | 11-10 23:54 | [github.com](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/actions/workflows/deploy.yml), [`tools/library-releases.mjs`](../tools/library-releases.mjs), [`library/releases-runs.json`](releases-runs.json) |
| [`library/releases.md`](releases.md) | **The release history: every version, what changed, and whether it was served.** Kept by incident.librarian@web-summit.dinis, 2026-11-10, 23:53 UTC. Built by tools/library-releases.mjs from the tags, the commit subjects and a snapshot of the deploy workflow's runs read at that … | incident.librarian@ | 11-10 23:54 | [`BRIEF-CORRECTIONS.md`](../BRIEF-CORRECTIONS.md), [`library/README.md`](README.md), [`library/releases-runs.json`](releases-runs.json), [`library/releases.json`](releases.json), [`tools/library-releases.mjs`](../tools/library-releases.mjs) |

## agent file

Each agent's jobs, status and asks.

| File | What it is | By | Changed | Made from |
|---|---|---|---|---|
| [`agents/JOBS.md`](../agents/JOBS.md) | **The team and its jobs (kept by incident.conductor@web-summit.dinis).** From Dinis's direction of 10 November ~23:40 UTC (BRIEF.md). Each agent owns its folders; nobody edits another's files (ask in a commit with For:). Everyone: read CLAUDE.md first, make a session key, … | incident.conductor@ | 11-10 23:53 | [`BRIEF.md`](../BRIEF.md), [`CLAUDE.md`](../CLAUDE.md), [`SECURITY.md`](../SECURITY.md), [`agents/policy.json`](../agents/policy.json), [`app/site.css`](../app/site.css), [`contribute.md`](../contribute.md), and 5 more |
| [`agents/README.md`](../agents/README.md) | **The incident team's status files.** One folder per role; status.json holds the jobs routed to it, what is done, what is next, and asks (an ask starting "Dinis:" means the agent is blocked by its environment or needs his decision). Kept … | incident.conductor@ | 11-10 21:14 |  |
| [`agents/conductor/policy.md`](../agents/conductor/policy.md) | **ABP: incident.conductor@web-summit.dinis.** Kept by incident.librarian@web-summit.dinis, 2026-11-11, 00:05 UTC. DRAFT, NOT AGREED BY DINIS. The Agent Behaviour Policy of incident.conductor@web-summit.dinis, one of Dinis Cruz's incident agents … | incident.librarian@ | 11-10 23:59 | [`CLAUDE.md`](../CLAUDE.md), [`agents/JOBS.md`](../agents/JOBS.md), [`agents/policy.json`](../agents/policy.json), [`library/abp.json`](abp.json), [`library/abp.md`](abp.md), [`tools/library-abp.mjs`](../tools/library-abp.mjs), and 1 more |
| [`agents/conductor/status.json`](../agents/conductor/status.json) |  | incident.conductor@ | 11-11 00:00 |  |
| [`agents/designer/policy.md`](../agents/designer/policy.md) | **ABP: incident.designer@web-summit.dinis.** Kept by incident.librarian@web-summit.dinis, 2026-11-11, 00:05 UTC. DRAFT, NOT AGREED BY DINIS. The Agent Behaviour Policy of incident.designer@web-summit.dinis, one of Dinis Cruz's incident agents … | incident.librarian@ | 11-10 23:59 | [`CLAUDE.md`](../CLAUDE.md), [`agents/JOBS.md`](../agents/JOBS.md), [`agents/policy.json`](../agents/policy.json), [`library/abp.json`](abp.json), [`library/abp.md`](abp.md), [`tools/library-abp.mjs`](../tools/library-abp.mjs), and 1 more |
| [`agents/designer/status.json`](../agents/designer/status.json) |  | incident.designer@ | 11-11 00:00 |  |
| [`agents/dev/policy.md`](../agents/dev/policy.md) | **ABP: incident.dev@web-summit.dinis.** Kept by incident.librarian@web-summit.dinis, 2026-11-11, 00:05 UTC. DRAFT, NOT AGREED BY DINIS. The Agent Behaviour Policy of incident.dev@web-summit.dinis, one of Dinis Cruz's incident agents on … | incident.librarian@ | 11-10 23:59 | [`CLAUDE.md`](../CLAUDE.md), [`agents/JOBS.md`](../agents/JOBS.md), [`agents/policy.json`](../agents/policy.json), [`library/abp.json`](abp.json), [`library/abp.md`](abp.md), [`tools/library-abp.mjs`](../tools/library-abp.mjs), and 1 more |
| [`agents/dev/status.json`](../agents/dev/status.json) |  | incident.dev@web-summit.dinis (done, next, asks, baseline); jobs by incident.conductor@ | 11-10 22:03 |  |
| [`agents/graph/policy.md`](../agents/graph/policy.md) | **ABP: incident.graph@web-summit.dinis.** Kept by incident.librarian@web-summit.dinis, 2026-11-11, 00:05 UTC. DRAFT, NOT AGREED BY DINIS. The Agent Behaviour Policy of incident.graph@web-summit.dinis, one of Dinis Cruz's incident agents on … | incident.librarian@ | 11-10 23:59 | [`CLAUDE.md`](../CLAUDE.md), [`agents/JOBS.md`](../agents/JOBS.md), [`agents/policy.json`](../agents/policy.json), [`library/abp.json`](abp.json), [`library/abp.md`](abp.md), [`tools/library-abp.mjs`](../tools/library-abp.mjs), and 1 more |
| [`agents/graph/status.json`](../agents/graph/status.json) |  | incident.graph@ | 11-11 00:00 |  |
| [`agents/identity/policy.md`](../agents/identity/policy.md) | **ABP: incident.identity@web-summit.dinis.** Kept by incident.librarian@web-summit.dinis, 2026-11-11, 00:05 UTC. DRAFT, NOT AGREED BY DINIS. The Agent Behaviour Policy of incident.identity@web-summit.dinis, one of Dinis Cruz's incident agents … | incident.librarian@ | 11-10 23:59 | [`CLAUDE.md`](../CLAUDE.md), [`agents/JOBS.md`](../agents/JOBS.md), [`agents/policy.json`](../agents/policy.json), [`library/abp.json`](abp.json), [`library/abp.md`](abp.md), [`tools/library-abp.mjs`](../tools/library-abp.mjs), and 1 more |
| [`agents/identity/status.json`](../agents/identity/status.json) |  | incident.identity@ | 11-10 23:53 |  |
| [`agents/librarian/policy.md`](../agents/librarian/policy.md) | **ABP: incident.librarian@web-summit.dinis.** Kept by incident.librarian@web-summit.dinis, 2026-11-11, 00:05 UTC. DRAFT, NOT AGREED BY DINIS. The Agent Behaviour Policy of incident.librarian@web-summit.dinis, one of Dinis Cruz's incident agents … | incident.librarian@ | 11-10 23:59 | [`CLAUDE.md`](../CLAUDE.md), [`agents/JOBS.md`](../agents/JOBS.md), [`agents/policy.json`](../agents/policy.json), [`library/abp.json`](abp.json), [`library/abp.md`](abp.md), [`tools/library-abp.mjs`](../tools/library-abp.mjs), and 1 more |
| [`agents/librarian/status.json`](../agents/librarian/status.json) |  | incident.librarian@ | 11-11 00:01 |  |
| [`agents/media/policy.md`](../agents/media/policy.md) | **ABP: incident.media@web-summit.dinis.** Kept by incident.librarian@web-summit.dinis, 2026-11-11, 00:05 UTC. DRAFT, NOT AGREED BY DINIS. The Agent Behaviour Policy of incident.media@web-summit.dinis, one of Dinis Cruz's incident agents on … | incident.librarian@ | 11-10 23:59 | [`CLAUDE.md`](../CLAUDE.md), [`agents/JOBS.md`](../agents/JOBS.md), [`agents/policy.json`](../agents/policy.json), [`library/abp.json`](abp.json), [`library/abp.md`](abp.md), [`tools/library-abp.mjs`](../tools/library-abp.mjs), and 1 more |
| [`agents/media/status.json`](../agents/media/status.json) |  | incident.media@ | 11-10 23:58 |  |
| [`agents/meteorologist/policy.md`](../agents/meteorologist/policy.md) | **ABP: incident.meteorologist@web-summit.dinis.** Kept by incident.librarian@web-summit.dinis, 2026-11-11, 00:05 UTC. DRAFT, NOT AGREED BY DINIS. The Agent Behaviour Policy of incident.meteorologist@web-summit.dinis, one of Dinis Cruz's incident … | incident.librarian@ | 11-10 23:59 | [`CLAUDE.md`](../CLAUDE.md), [`agents/JOBS.md`](../agents/JOBS.md), [`agents/policy.json`](../agents/policy.json), [`library/abp.json`](abp.json), [`library/abp.md`](abp.md), [`tools/library-abp.mjs`](../tools/library-abp.mjs), and 1 more |
| [`agents/meteorologist/status.json`](../agents/meteorologist/status.json) |  | incident.meteorologist@ (commits: incident.conductor@) | 11-10 23:55 |  |
| [`agents/observability/policy.md`](../agents/observability/policy.md) | **ABP: incident.observability@web-summit.dinis.** Kept by incident.librarian@web-summit.dinis, 2026-11-11, 00:05 UTC. DRAFT, NOT AGREED BY DINIS. The Agent Behaviour Policy of incident.observability@web-summit.dinis, one of Dinis Cruz's incident … | incident.librarian@ | 11-10 23:59 | [`CLAUDE.md`](../CLAUDE.md), [`agents/JOBS.md`](../agents/JOBS.md), [`agents/policy.json`](../agents/policy.json), [`library/abp.json`](abp.json), [`library/abp.md`](abp.md), [`tools/library-abp.mjs`](../tools/library-abp.mjs), and 1 more |
| [`agents/observability/status.json`](../agents/observability/status.json) |  | incident.observability@ | 11-10 23:56 |  |
| [`agents/policy.json`](../agents/policy.json) | Who may change which paths in this repository: the Owns column of agents/JOBS.md as globs, with the owners incident.conductor@ gave on 10 November 2026 (23:51 UTC) for the paths JOBS.md did not … | incident.librarian@web-summit.dinis (drafted, at incident.conductor@'s ask; the owners are the conductor's decisions) | 11-10 23:56 | [`agents/JOBS.md`](../agents/JOBS.md), [`tools/policy-check.mjs`](../tools/policy-check.mjs) |
| [`agents/researcher/policy.md`](../agents/researcher/policy.md) | **ABP: incident.researcher@web-summit.dinis.** Kept by incident.librarian@web-summit.dinis, 2026-11-11, 00:05 UTC. DRAFT, NOT AGREED BY DINIS. The Agent Behaviour Policy of incident.researcher@web-summit.dinis, one of Dinis Cruz's incident agents … | incident.librarian@ | 11-10 23:59 | [`CLAUDE.md`](../CLAUDE.md), [`agents/JOBS.md`](../agents/JOBS.md), [`agents/policy.json`](../agents/policy.json), [`library/abp.json`](abp.json), [`library/abp.md`](abp.md), [`tools/library-abp.mjs`](../tools/library-abp.mjs), and 1 more |
| [`agents/researcher/status.json`](../agents/researcher/status.json) |  | incident.researcher@ (commits: incident.conductor@) | 11-10 23:57 |  |
| [`agents/weatherwatch/policy.md`](../agents/weatherwatch/policy.md) | **ABP: incident.weatherwatch@web-summit.dinis.** Kept by incident.librarian@web-summit.dinis, 2026-11-11, 00:05 UTC. DRAFT, NOT AGREED BY DINIS. The Agent Behaviour Policy of incident.weatherwatch@web-summit.dinis, one of Dinis Cruz's incident … | incident.librarian@ | 11-10 23:59 | [`CLAUDE.md`](../CLAUDE.md), [`agents/JOBS.md`](../agents/JOBS.md), [`agents/policy.json`](../agents/policy.json), [`library/abp.json`](abp.json), [`library/abp.md`](abp.md), [`tools/library-abp.mjs`](../tools/library-abp.mjs), and 1 more |
| [`agents/weatherwatch/status.json`](../agents/weatherwatch/status.json) |  | incident.weatherwatch@ | 11-10 23:58 |  |

## comms draft

Drafts for people; a person sends.

| File | What it is | By | Changed | Made from |
|---|---|---|---|---|
| [`incidents/2026-11-10-storm-charles/comms/README.md`](../incidents/2026-11-10-storm-charles/comms/README.md) | **Communications: the storm (incident WS-214).** Kept by journalist.examples@web-summit.dinis, the incident's journalist. The method is Dinis's incident-handling series, part 4 ("Personalised stakeholder communication"): one source, many audiences, … | journalist.examples@ (commits: incident.conductor@) | 11-10 21:14 | [`incidents/2026-11-10-storm-charles/comms/dinis.md`](../incidents/2026-11-10-storm-charles/comms/dinis.md), [`incidents/2026-11-10-storm-charles/comms/facts.md`](../incidents/2026-11-10-storm-charles/comms/facts.md), [`incidents/2026-11-10-storm-charles/comms/meetings.md`](../incidents/2026-11-10-storm-charles/comms/meetings.md), [`incidents/2026-11-10-storm-charles/comms/public.md`](../incidents/2026-11-10-storm-charles/comms/public.md), [`incidents/2026-11-10-storm-charles/comms/team.md`](../incidents/2026-11-10-storm-charles/comms/team.md) |
| [`incidents/2026-11-10-storm-charles/comms/dinis.md`](../incidents/2026-11-10-storm-charles/comms/dinis.md) | **Brief for Dinis (through the incident's lead).** Facts as of 20:02 UTC. Five lines, then what needs your word. The 18:45 version is superseded. | *not said in the file*; commits: incident.conductor@ | 11-10 21:14 |  |
| [`incidents/2026-11-10-storm-charles/comms/facts.md`](../incidents/2026-11-10-storm-charles/comms/facts.md) | **The one source (facts as of 20:02 UTC, 10 November 2026; weather facts as of 18:38, Thursday's as of 19:22).** Every communication draft in this folder is built from these facts and cites them by number. Sources: weather@PrompTugal.vicky's desk (desks/weather-vicky/live.md, last full check 18:36 to 18:38 UTC, … | *not said in the file*; commits: incident.conductor@ | 11-10 23:53 |  |
| [`incidents/2026-11-10-storm-charles/comms/meetings.md`](../incidents/2026-11-10-storm-charles/comms/meetings.md) | **Draft for the people we are meeting on Wednesday (a person sends).** No names here. Whoever holds the meeting sends it on their own channel, edits it in their own voice, and keeps the reply in the private CRM if it is a lead. Facts as of 20:02 UTC (facts.md). | *not said in the file*; commits: incident.conductor@ | 11-10 21:14 |  |
| [`incidents/2026-11-10-storm-charles/comms/public.md`](../incidents/2026-11-10-storm-charles/comms/public.md) | **Draft for the public, through pt.news's newsroom.** An offer to Vicky's newsroom, not a publication. pt.news covers the storm and the summit's decision as news (S41, its weather desk and reviewer). This draft covers what the news does not: how our own … | *not said in the file*; commits: incident.conductor@ | 11-10 21:14 |  |
| [`incidents/2026-11-10-storm-charles/comms/team.md`](../incidents/2026-11-10-storm-charles/comms/team.md) | **Draft for the team (WhatsApp; a person sends).** Facts as of 18:38 UTC (F1 to F7, N1 to N5 in facts.md). Short enough for a phone. Two versions. From 19:55 UTC, B replaces A (Web Summit suspended Wednesday, F8). | *not said in the file*; commits: incident.conductor@ | 11-10 21:14 |  |

## material

Material offered to another newsroom's desk.

| File | What it is | By | Changed | Made from |
|---|---|---|---|---|
| [`incidents/2026-11-10-storm-charles/material/wednesday-is-off-what-now.md`](../incidents/2026-11-10-storm-charles/material/wednesday-is-off-what-now.md) | **Material for Vicky's weather desk: "Wednesday is off: what now?" (a service piece's facts).** Offered by incident.conductor@web-summit.dinis (WS-214), 10 November 2026, 20:00 UTC, as material for weather@PrompTugal.vicky and conductor.B@PrompTugal.vicky. Not an article and not advice. Vicky … | incident.conductor@ | 11-10 21:14 |  |

## outreach

How to contribute, and drafts for experts; a person sends.

| File | What it is | By | Changed | Made from |
|---|---|---|---|---|
| [`contribute.md`](../contribute.md) | **Contribute: add or correct a fact.** This site records Storm Charles (Lisbon, 10 to 12 November 2026) from public sources: what was decided or warned, by whom, when, and where we read it. If you are a journalist, a specialist … | *not said in the file*; commits: incident.media@ | 11-10 23:58 | [prociv.gov.pt](https://prociv.gov.pt/), [ipma.pt](https://www.ipma.pt/) |
| [`outreach/README.md`](../outreach/README.md) | **Outreach: who could give an official view, and what we would ask.** Drafts only. Nothing here has been sent. A person sends every message (Dinis Cruz, or someone he names), from their own address, after reading it. No contact details are kept in this repository: each … | incident.media@ | 11-10 23:58 | [`outreach/drafts.md`](../outreach/drafts.md), [`outreach/questions.json`](../outreach/questions.json) |
| [`outreach/drafts.md`](../outreach/drafts.md) | **Draft messages, one per audience.** Drafts. None sent. A person sends each one, from their own address, after editing it. […] marks what the sender fills in. No contact details are kept here: use the public contact or press page on the … | incident.media@ | 11-10 23:58 | [`outreach/README.md`](../outreach/README.md) |
| [`outreach/questions.json`](../outreach/questions.json) | The questions the incident team would put to bodies and experts who could give an official view on Storm Charles, by field. Drafts: none has been sent; a person sends every message. No contact … | incident.media@ | 11-10 23:58 | [`outreach/README.md`](../outreach/README.md) |

## design

Design rounds and notes.

| File | What it is | By | Changed | Made from |
|---|---|---|---|---|
| [`design/README.md`](../design/README.md) | **The design of this site: tokens, parts, rules.** Kept by incident.designer@web-summit.dinis. For every agent that builds a page here: use these and your page will match the rest, in light and dark, on a phone and a desk. One stylesheet, no … | incident.designer@ | 11-11 00:00 | [`app/site.css`](../app/site.css), [`design/round-1.md`](../design/round-1.md), [`design/round-2.md`](../design/round-2.md), [`design/round-3.md`](../design/round-3.md), [`design/round-4.md`](../design/round-4.md), [`design/round-5.md`](../design/round-5.md), and 4 more |
| [`design/round-1.md`](../design/round-1.md) | **Design round 1: the home page as the weather presenter.** By incident.designer@web-summit.dinis, 10 November 2026, 23:30 to 23:41 UTC. Screenshots were taken (1280 and 390 wide, light and dark) and are described here, not committed. | incident.designer@ | 11-10 23:43 |  |
| [`design/round-2.md`](../design/round-2.md) | **Design round 2: the wind on one axis, and where.** By incident.designer@web-summit.dinis, 10 November 2026, 23:41 to 23:44 UTC. Screenshots taken (1280 and 390 wide, light and dark), described here, not committed. | incident.designer@ | 11-10 23:45 |  |
| [`design/round-3.md`](../design/round-3.md) | **Design round 3: the day in phases (phones first), and the chart's table.** By incident.designer@web-summit.dinis, 10 November 2026, about 23:44 to 23:50 UTC. Screenshots at 390 wide, described here, not committed. | incident.designer@ | 11-10 23:45 |  |
| [`design/round-4.md`](../design/round-4.md) | **Design round 4: the document pages, and a guide for the other agents.** By incident.designer@web-summit.dinis, 10 November 2026, 23:44 to 23:48 UTC. | incident.designer@ | 11-10 23:50 |  |
| [`design/round-5.md`](../design/round-5.md) | **Design round 5: the conductor's review of rounds 1 and 2, and the frame.** By incident.designer@web-summit.dinis, 10 November 2026, about 23:49 to 23:50 UTC. From incident.conductor@'s two reviews (23:42 and 23:44 UTC). Screenshots at 1280 (dark, switched by the button) and … | incident.designer@ | 11-10 23:50 |  |
| [`design/round-6.md`](../design/round-6.md) | **Design round 6: decisions and warnings on one time axis.** By incident.designer@web-summit.dinis, 10 November 2026, 23:52 to 23:53 UTC. Asked by incident.conductor@ (23:50), from incident.weatherwatch@'s ideas. Screenshots at 1280, light and dark, described, … | incident.designer@ | 11-11 00:00 |  |
| [`design/round-7.md`](../design/round-7.md) | **Design round 7: status words, the tile's times, and why the model row is so low.** By incident.designer@web-summit.dinis, 10 November 2026, 23:54 to 23:55 UTC. From incident.conductor@'s notes of 23:51 and 23:52 (the second carrying incident.weatherwatch@'s second survey). … | incident.designer@ | 11-10 23:55 |  |
| [`design/round-8.md`](../design/round-8.md) | **Design round 8: three facts in one sentence; links, not images; what we measured.** By incident.designer@web-summit.dinis, 10 November 2026, 23:57 to 23:58 UTC. From incident.conductor@'s note of 23:57 (incident.weatherwatch@'s licence reading and gap count) and round 7's critique. … | incident.designer@ | 11-10 23:58 |  |
| [`design/round-9.md`](../design/round-9.md) | **Design round 9: the decisions' hours from the data; the model wording corrected.** By incident.designer@web-summit.dinis, 10 November 2026, 23:59 to 00:00 UTC (2026-11-11). From incident.conductor@'s two notes of 23:58 (the researcher's effect hours; the meteorologist's … | incident.designer@ | 11-11 00:00 |  |

## tool

Scripts the agents run.

| File | What it is | By | Changed | Made from |
|---|---|---|---|---|
| [`admin/tools/release.sh`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/blob/dev/admin/tools/release.sh) | Release from any agent's clone: AGENT=<name admin/tools/release.sh Commit your SOURCE changes first (subject "<agent: <what", trailers Agent:, Issue:, For:). This script rebases on dev, runs the gate … | *not said in the file*; commits: incident.conductor@ | 11-10 23:53 |  |
| [`incidents/2026-11-10-storm-charles/data/weather/tools/refresh.py`](../incidents/2026-11-10-storm-charles/data/weather/tools/refresh.py) | The weather picture for WS-214 (the storm, Wednesday 11 November 2026), as JSON. | *not said in the file*; commits: incident.conductor@ | 11-10 23:57 |  |
| [`tools/agents-commits.mjs`](../tools/agents-commits.mjs) | The last commits on dev as data: git log - data/agents/commits.json (kept by incident.observability@web-summit.dinis). node tools/agents-commits.mjs Who pushed what, when, and for whom (the Agent: … | incident.observability@ | 11-10 23:54 |  |
| [`tools/agents-index.mjs`](../tools/agents-index.mjs) | The team's index: repository - data/agents/index.json (kept by incident.observability@web-summit.dinis). node tools/agents-index.mjs write it node tools/agents-index.mjs --check exit 1 if the … | incident.observability@ | 11-10 23:54 |  |
| [`tools/agents-ledger.mjs`](../tools/agents-ledger.mjs) | The model ledger, as counts: this machine's ledger (tools/llm.mjs writes one line per model call to INCIDENT_LEDGER_DIR, default ~/.incident-ledger, never git) - data/agents/ledger/<role.json. Kept … | incident.observability@ | 11-10 23:54 |  |
| [`tools/agents-pin.mjs`](../tools/agents-pin.mjs) | Pinned copies of other teams' engines (kept by incident.observability@web-summit.dinis): copy named files, unchanged, from a checkout of their repository into app/agents/vendor/<name@<short commit/ … | incident.observability@ | 11-10 23:54 |  |
| [`tools/graph-build.mjs`](../tools/graph-build.mjs) | The graph of an incident, built from its JSON files and never by hand (incident.graph@web-summit.dinis). node tools/graph-build.mjs [incidents/<id] writes data/graph/storm.json and … | incident.graph@ | 11-11 00:00 |  |
| [`tools/graph-places.mjs`](../tools/graph-places.mjs) | IPMA's warning areas, by code: node tools/graph-places.mjs <the file fetched from IPMA <UTC time read Reads IPMA's own list (https://api.ipma.pt/open-data/distrits-islands.json), keeps one row per … | *not said in the file*; commits: incident.graph@ | 11-10 23:44 |  |
| [`tools/lane-common.mjs`](../tools/lane-common.mjs) | lane-common.mjs: what the lane tools share (incident.identity@web-summit.dinis; the design is SECURITY.md). The same pinned pki.sgit.ai modules the browser runs (app/login/pki/), over Node's Web … | incident.identity@ | 11-10 23:53 |  |
| [`tools/lane-configure.mjs`](../tools/lane-configure.mjs) | lane-configure.mjs: open the feedback lane on an existing vault (the bridge vault). It does not create the vault. SG_SEND_TOKEN=<access token LANE_VAULT_KEY=<the vault's key node … | *not said in the file*; commits: incident.identity@ | 11-10 23:53 |  |
| [`tools/lane-drain.mjs`](../tools/lane-drain.mjs) | lane-drain.mjs: the conductor's drain, each wake. Lists the lane (metadata only), fetches what is pending, opens each message with this agent's key, judges it (lane-common.mjs judge), prints one JSON … | *not said in the file*; commits: incident.identity@ | 11-10 23:53 |  |
| [`tools/lane-e2e.mjs`](../tools/lane-e2e.mjs) | lane-e2e.mjs: the login and the lane in a real browser (Chromium through Playwright, which is not a dependency of this repository: the test says so and stops where it is not installed). Throwaway … | *not said in the file*; commits: incident.identity@ | 11-10 23:47 |  |
| [`tools/lane-open.mjs`](../tools/lane-open.mjs) | lane-open.mjs: open what Dinis sealed to this agent, and judge it. One JSON line per message. node tools/lane-open.mjs <m1 code \| file holding one [...] (or the text on stdin) "accept": true only for … | *not said in the file*; commits: incident.identity@ | 11-10 23:47 |  |
| [`tools/lane-seal.mjs`](../tools/lane-seal.mjs) | lane-seal.mjs: the reverse path. Sign with this agent's key, seal to a key in data/keys.json (Dinis's), 7 days by default. node tools/lane-seal.mjs --to <key id --text "…" [--subject S] [--expires … | *not said in the file*; commits: incident.identity@ | 11-10 23:47 |  |
| [`tools/lane-test.mjs`](../tools/lane-test.mjs) | lane-test.mjs: the lane, end to end, with throwaway keys made here and thrown away (nothing is written to a key store). node tools/lane-test.mjs 1. the pinned pki.sgit.ai copies are byte for byte … | *not said in the file*; commits: incident.identity@ | 11-10 23:53 |  |
| [`tools/library-abp.mjs`](../tools/library-abp.mjs) | The agents' behaviour policies, as drafts (incident.librarian@web-summit.dinis, 11 November 2026, WS-214, at incident.conductor@'s ask). One agents/<role/policy.md per agent in agents/policy.json, in … | incident.librarian@ | 11-10 23:59 |  |
| [`tools/library-index.mjs`](../tools/library-index.mjs) | The library's catalogue (incident.librarian@web-summit.dinis, 10 November 2026, WS-214; Dinis's direction ~23:40: "all information, all documents, all briefs should be on the site"; "provenance, … | incident.librarian@ | 11-10 23:59 |  |
| [`tools/library-reading.mjs`](../tools/library-reading.mjs) | library/reading/reading.json - library/reading/README.md (incident.librarian@web-summit.dinis, 10 November 2026, WS-214). The reading list is kept as data (one entry per article: URL, its argument, … | incident.librarian@ | 11-10 23:47 |  |
| [`tools/library-releases.mjs`](../tools/library-releases.mjs) | The release history (incident.librarian@web-summit.dinis, 10 November 2026, WS-214, at incident.conductor@'s ask; the estate's standard asks for "one sentence per release"; the reading list: "Green … | incident.librarian@ | 11-10 23:54 |  |
| [`tools/llm.mjs`](../tools/llm.mjs) | The model ledger's one wrapper (incident.dev@web-summit.dinis, 10 November 2026, WS-214; ROADMAP P0.4, Dinis's direction ~19:15): every model call the incident team makes goes through call() here, … | incident.dev@ (commits: incident.conductor@) | 11-10 21:14 |  |
| [`tools/policy-check.mjs`](../tools/policy-check.mjs) | The path policy's check (incident.librarian@web-summit.dinis, 10 November 2026, WS-214, at incident.conductor@'s ask; from the reading list: "Behaviour policies" on newsroom.sgit.ai, where the reach … | incident.librarian@ | 11-11 00:01 |  |
| [`tools/sync-from-websummit.sh`](../tools/sync-from-websummit.sh) | Temporary bridge (10 November 2026): until the incident agents' sessions can push here, they keep writing data/ and their status files in SGit-AI__Website__Web-Summit team/incidents/ (its MOVED.md); … | *not said in the file*; commits: incident.conductor@ | 11-10 21:37 |  |
| [`tools/timeline.mjs`](../tools/timeline.mjs) | timeline.md - signals.json (incident.dev@web-summit.dinis, 10 November 2026, WS-214). The lead keeps the timeline as a markdown table (UTC \| Signal or decision \| Source); this turns just that table … | incident.dev@ (commits: incident.conductor@) | 11-10 23:49 |  |
| [`tools/websummit-poll.sh`](../tools/websummit-poll.sh) | The 2-minute blog poll (incident.dev@web-summit.dinis, 10 November 2026, WS-214; incident.researcher@'s ask via the lead, 21:03). Rewritten at 21:30 after security.repos@'s MEDIUM (report … | incident.dev@ (commits: incident.conductor@) | 11-10 21:18 |  |
| [`tools/websummit.mjs`](../tools/websummit.mjs) | Web Summit's own channels, watched for the decision everyone waits for (incident.dev@web-summit.dinis, 10 November 2026, WS-214; incident.researcher@'s parser asks in decisions/sources.json: … | incident.dev@ (commits: incident.conductor@) | 11-10 21:37 |  |

## build

The build, the gate and CI.

| File | What it is | By | Changed | Made from |
|---|---|---|---|---|
| [`.github/workflows/deploy.yml`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/blob/dev/.github/workflows/deploy.yml) | One job: checkout (shallow), build, gate, deploy, tag, measure. Target: push to served in about 40 s (PIPELINE.md section 3). - fetch-depth 1 and nothing reads git history (a blobless full clone made … | *not said in the file*; commits: incident.conductor@ | 11-10 23:56 |  |
| [`admin/build/build.mjs`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/blob/dev/admin/build/build.mjs) | The build: repository - _site/ (never committed). Zero dependencies, one pass, a few hundred milliseconds. - every .md becomes a page beside it (and is served too, as its own markdown twin); - the … | *not said in the file*; commits: incident.conductor@, incident.designer@ | 11-11 00:00 |  |
| [`admin/build/validate.mjs`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/blob/dev/admin/build/validate.mjs) | The gate: must print OK, and a red gate is no release. Budget: 5 seconds. It builds the site once, then checks: 1. the repository stays fast: no tracked file over 256 KB, no binary, no raw capture, … | *not said in the file*; commits: incident.conductor@ | 11-10 21:15 |  |

## admin

The admin area.

| File | What it is | By | Changed | Made from |
|---|---|---|---|---|
| [`admin/series.txt`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/blob/dev/admin/series.txt) |  | *not said in the file*; commits: incident.conductor@ | 11-10 21:14 |  |

## app

What runs in the browser.

| File | What it is | By | Changed | Made from |
|---|---|---|---|---|
| [`account/account.md`](../account/account.md) | **Account: the operator's login, and how it works.** Kept by incident.identity@web-summit.dinis, 10 November 2026, 23:55 UTC | incident.identity@ | 11-10 23:53 | [`SECURITY.md`](../SECURITY.md), [`account/index.html`](../account/index.html) |
| [`account/inbox.json`](../account/inbox.json) | Replies to Dinis Cruz, each sealed to his public key (ciphertext: sgit's hybrid v2 envelope as an m1 code). Written by tools/lane-seal.mjs --inbox; opened at /account/ with his key. Never a vault … | incident.identity@ | 11-10 23:53 | [`tools/lane-seal.mjs`](../tools/lane-seal.mjs), [`SECURITY.md`](../SECURITY.md) |
| [`account/index.html`](../account/index.html) |  | *not said in the file*; commits: incident.identity@ | 11-10 23:53 |  |
| [`app/agents/about.md`](../app/agents/about.md) | **The agents page: how it works.** Kept by incident.observability@web-summit.dinis, 10 November 2026, 23:53 UTC | incident.observability@ | 11-10 23:54 | [`app/agents/index.html`](../app/agents/index.html) |
| [`app/agents/agents.css`](../app/agents/agents.css) | /app/agents/: the team console (incident.observability@web-summit.dinis). Uses app/site.css's tokens; adds nothing global. | incident.observability@ | 11-10 23:56 |  |
| [`app/agents/agents.js`](../app/agents/agents.js) | The team console (incident.observability@web-summit.dinis): every agent, what it is doing, what it asks, its last push. Mounts into <div id="agents-live" data-base="<path to the site root". Reads … | incident.observability@ | 11-10 23:57 |  |
| [`app/agents/index.html`](../app/agents/index.html) |  | *not said in the file*; commits: incident.observability@ | 11-10 23:47 |  |
| [`app/agents/live-adapter.js`](../app/agents/live-adapter.js) | The adapter between this repository's commits and Angelo's live map (incident.observability@web-summit.dinis). The engine is an unchanged, pinned copy: vendor/live-map@57636ac/ (live.js, live3d.js by … | incident.observability@ | 11-10 23:47 |  |
| [`app/agents/obs.js`](../app/agents/obs.js) | Page views and reads for storm-charles.promptugal.news (incident.observability@web-summit.dinis, 10 November 2026). The model is promptugal.news's assets/obs/obs.js (observability@PrompTugal.dinis, … | incident.observability@ | 11-10 23:54 |  |
| [`app/agents/universe-adapter.js`](../app/agents/universe-adapter.js) | The adapter between this repository's team and Silvio's Universe (incident.observability@web-summit.dinis). The engine is an unchanged, pinned copy: vendor/universe@57636ac/ (brain.js, brain.css by … | incident.observability@ | 11-10 23:51 |  |
| [`app/agents/vendor/live-map@57636ac/live.js`](../app/agents/vendor/live-map@57636ac/live.js) | The live map: Team and the machine's graph as a small always-on view, lines and dots only, in a hexagon (dev.map@PrompTugal.angelo, 7 November 2026, at Angelo's go; spec: … | dev.map@PrompTugal.angelo (commits: incident.observability@) | 11-10 23:47 |  |
| [`app/agents/vendor/live-map@57636ac/live3d.js`](../app/agents/vendor/live-map@57636ac/live3d.js) | The live graph in 3D (backlog 0c; Angelo, 8 November: "interacting with the mouse is very slow, it lags heavily, and more importantly, dots and lines don't light up, so it's cool static graph but not … | dev.map@PrompTugal.angelo (commits: incident.observability@) | 11-10 23:47 |  |
| [`app/agents/vendor/live-map@57636ac/pin.json`](../app/agents/vendor/live-map@57636ac/pin.json) | Unchanged copies, pinned so the authors' daily changes never break this site. Not forked: our side is one adapter in app/agents/. To update: run tools/agents-pin.mjs on a newer checkout (a new … | incident.observability@ | 11-10 23:54 | [`tools/agents-pin.mjs`](../tools/agents-pin.mjs) |
| [`app/agents/vendor/universe@57636ac/brain.css`](../app/agents/vendor/universe@57636ac/brain.css) | Silvio's brain, the 3D map (Lab only), premium: the sky is drawn by the 3D engine (stars, nebulae, glow); | *not said in the file*; commits: incident.observability@ | 11-10 23:51 |  |
| [`app/agents/vendor/universe@57636ac/brain.js`](../app/agents/vendor/universe@57636ac/brain.js) | The Universe, read live (dashboard@web-summit.silvio, 10 November 2026; Silvio: "everything must be in live data"). Every time the map opens it reads, from their sources, at that moment: - the team … | dashboard@web-summit.silvio (commits: incident.observability@) | 11-10 23:51 |  |
| [`app/agents/vendor/universe@57636ac/pin.json`](../app/agents/vendor/universe@57636ac/pin.json) | Unchanged copies, pinned so the authors' daily changes never break this site. Not forked: our side is one adapter in app/agents/. To update: run tools/agents-pin.mjs on a newer checkout (a new … | incident.observability@ | 11-10 23:54 | [`tools/agents-pin.mjs`](../tools/agents-pin.mjs) |
| [`app/graph/about.md`](../app/graph/about.md) | **The graph page: how it works.** The graph of the storm draws data/graph/storm.json: actors, decisions, warnings, signals, sources, places, datasets and agents, and the links between them. Kept by incident.graph@web-summit.dinis. … | incident.graph@ | 11-11 00:00 | [`app/graph/index.html`](../app/graph/index.html), [`data/graph/storm.json`](../data/graph/storm.json) |
| [`app/graph/engine.js`](../app/graph/engine.js) | A small adapter onto Silvio's graph engine (incident.graph@web-summit.dinis). The engine is the bundle behind web-summit.sgit.ai's Universe (assets/cc/brain.js): brain-libs.js, which holds … | incident.graph@ | 11-10 23:49 |  |
| [`app/graph/graph.css`](../app/graph/graph.css) | The query page and the graph page (incident.graph@web-summit.dinis). Colours come from app/site.css's tokens; | incident.graph@ | 11-11 00:00 |  |
| [`app/graph/graph.js`](../app/graph/graph.js) | The graph page (/app/graph/): the storm's graph (data/graph/storm.json) drawn with Silvio's engine through engine.js, with the same graph always available as a list, so nothing depends on WebGL or on … | *not said in the file*; commits: incident.graph@ | 11-11 00:00 |  |
| [`app/graph/index.html`](../app/graph/index.html) |  | *not said in the file*; commits: incident.graph@ | 11-11 00:00 |  |
| [`app/graph/query.js`](../app/graph/query.js) | The query page (/data/query/): SQLite in the reader's browser over the tables of the storm's graph. incident.graph@web-summit.dinis. The engine is sql.js 1.14.2 (SQLite compiled to WebAssembly), the … | *not said in the file*; commits: incident.graph@ | 11-11 00:00 |  |
| [`app/login/account.js`](../app/login/account.js) | account.js: the page at /account/ (incident.identity@; the design is /SECURITY.md). Three states: no key in this browser (make one), a key that is locked (unlock), unlocked (the public half to hand … | *not said in the file*; commits: incident.identity@ | 11-10 23:53 |  |
| [`app/login/dom.js`](../app/login/dom.js) | dom.js: the few DOM helpers the login pages share. Text only, never markup: nothing read from a message is parsed as HTML. | *not said in the file*; commits: incident.identity@ | 11-10 23:47 |  |
| [`app/login/feedback.js`](../app/login/feedback.js) | feedback.js: the feedback box, on any page that loads it (incident.identity@; the design is /SECURITY.md, section b). <script type="module" src="<root/app/login/feedback.js"</script It draws nothing … | *not said in the file*; commits: incident.identity@ | 11-10 23:47 |  |
| [`app/login/id.js`](../app/login/id.js) | id.js: Dinis's key in this browser (incident.identity@web-summit.dinis; the design is /SECURITY.md, section a). passkey ──PRF──▶ door seed (pki/door.js) ──▶ AES-256-GCM ──▶ localStorage … | incident.identity@ | 11-10 23:47 |  |
| [`app/login/lane.js`](../app/login/lane.js) | lane.js: what travels between Dinis's browser and the conductor (the design is /SECURITY.md, sections b and c). feedback pki/message.js compose (signed by his key; to = the conductor's signing … | *not said in the file*; commits: incident.identity@ | 11-10 23:47 |  |
| [`app/login/login.css`](../app/login/login.css) | The login and the feedback box (incident.identity@). Tokens from app/site.css only (design/README.md): no colour is | *not said in the file*; commits: incident.identity@ | 11-10 23:53 |  |
| [`app/login/package.json`](../app/login/package.json) |  | *not said in the file*; commits: incident.identity@ | 11-10 23:47 |  |
| [`app/login/pki/PIN.json`](../app/login/pki/PIN.json) | Copies of pki.sgit.ai's modules, byte for byte, read on 10 November 2026 (23:30 UTC) by incident.identity@web-summit.dinis. Not edited here: to change one, change it at its source and pin the new … | incident.identity@ | 11-10 23:53 | [`tools/lane-test.mjs`](../tools/lane-test.mjs) |
| [`app/login/pki/door.js`](../app/login/pki/door.js) | door.js: from a passkey's PRF bytes (or a recovery code) to a door vault's key, the way the article says. Moved out of passkey/lab.js so that the vault pane (assets/vault-pane/) and the lab derive … | *not said in the file*; commits: incident.identity@ | 11-10 23:41 |  |
| [`app/login/pki/keys.js`](../app/login/pki/keys.js) | keys.js: the key material of the directory of people, in the browser and in Node, byte-compatible with sgit pki. Everything here is Web Crypto and nothing else. Each construction was checked against … | *not said in the file*; commits: incident.identity@ | 11-10 23:41 |  |
| [`app/login/pki/local.js`](../app/login/pki/local.js) | local.js: an account kept in this browser only, opened by the passkey alone. No access key, no vault, no passphrase. The passkey's PRF bytes already give a door (door.js). When no vault answers at … | *not said in the file*; commits: incident.identity@ | 11-10 23:41 |  |
| [`app/login/pki/message.js`](../app/login/pki/message.js) | message.js: a message to someone in the register, as a link and a QR code, or into their inbox; and an invitation. A message is JSON, signed by the sender when the sender has a key, then sealed in … | *not said in the file*; commits: incident.identity@ | 11-10 23:41 |  |
| [`app/site.css`](../app/site.css) | storm-charles.promptugal.news: one stylesheet, no dependencies. Tokens first; the dashboard (app/storm.js) uses the same names. | *not said in the file*; commits: incident.conductor@, incident.designer@ | 11-11 00:00 |  |
| [`app/storm.js`](../app/storm.js) | The incident dashboard (incident.dev@web-summit.dinis, 10 November 2026, WS-214, at Dinis's word: "a full-blown new dashboard" that leverages Silvio's and Angelo's work). It reads the incident's data … | incident.dev@ (commits: incident.conductor@) | 11-10 21:16 |  |

## repository

The repository's own files.

| File | What it is | By | Changed | Made from |
|---|---|---|---|---|
| [`.gitignore`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/blob/dev/.gitignore) | Byte-compiled / optimized / DLL files | *not said in the file*; commits: incident.conductor@ | 11-10 21:15 |  |
| [`CNAME`](../CNAME) |  | *not said in the file*; commits: incident.conductor@ | 11-10 21:14 |  |
| [`LICENSE`](../LICENSE) |  | *not said* | 11-10 21:03 |  |
| [`README.md`](../README.md) | **PrompTugal__News__Storm-Charles.** https://storm-charles.promptugal.news: Storm Charles, Lisbon, November 2026. What is decided, what is warned and what is known, each with its source and the time read; and the data behind it, for … | *not said in the file*; commits: incident.conductor@ | 11-10 21:14 | [`CLAUDE.md`](../CLAUDE.md), [`PIPELINE.md`](../PIPELINE.md), [`REALITY.md`](../REALITY.md), [`ROADMAP.md`](../ROADMAP.md), [`incidents/2026-11-10-storm-charles/README.md`](../incidents/2026-11-10-storm-charles/README.md), [storm-charles.promptugal.news**](https://storm-charles.promptugal.news**) |

## Gaps

What the catalogue could not establish from the files themselves. Each is for the file's owner to close (a line in its header: who, when, from what); the librarian does not edit others' files.

### Files that do not say who wrote them

- [`BRIEF-CORRECTIONS.md`](../BRIEF-CORRECTIONS.md) (commits: incident.conductor@)
- [`CLAUDE.md`](../CLAUDE.md) (commits: incident.conductor@)
- [`README.md`](../README.md) (commits: incident.conductor@)
- [`REALITY.md`](../REALITY.md) (commits: incident.conductor@)
- [`account/index.html`](../account/index.html) (commits: incident.identity@)
- [`admin/series.txt`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/blob/dev/admin/series.txt) (commits: incident.conductor@)
- [`admin/tools/release.sh`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/blob/dev/admin/tools/release.sh) (commits: incident.conductor@)
- [`app/agents/index.html`](../app/agents/index.html) (commits: incident.observability@)
- [`app/agents/vendor/universe@57636ac/brain.css`](../app/agents/vendor/universe@57636ac/brain.css) (commits: incident.observability@)
- [`app/graph/graph.js`](../app/graph/graph.js) (commits: incident.graph@)
- [`app/graph/index.html`](../app/graph/index.html) (commits: incident.graph@)
- [`app/graph/query.js`](../app/graph/query.js) (commits: incident.graph@)
- [`app/login/account.js`](../app/login/account.js) (commits: incident.identity@)
- [`app/login/dom.js`](../app/login/dom.js) (commits: incident.identity@)
- [`app/login/feedback.js`](../app/login/feedback.js) (commits: incident.identity@)
- [`app/login/lane.js`](../app/login/lane.js) (commits: incident.identity@)
- [`app/login/login.css`](../app/login/login.css) (commits: incident.identity@)
- [`app/login/package.json`](../app/login/package.json) (commits: incident.identity@)
- [`app/login/pki/door.js`](../app/login/pki/door.js) (commits: incident.identity@)
- [`app/login/pki/keys.js`](../app/login/pki/keys.js) (commits: incident.identity@)
- [`app/login/pki/local.js`](../app/login/pki/local.js) (commits: incident.identity@)
- [`app/login/pki/message.js`](../app/login/pki/message.js) (commits: incident.identity@)
- [`app/site.css`](../app/site.css) (commits: incident.conductor@, incident.designer@)
- [`contribute.md`](../contribute.md) (commits: incident.media@)
- [`data/graph/ref/ipma-areas.json`](../data/graph/ref/ipma-areas.json) (commits: incident.graph@)
- [`data/graph/storm-elsewhere.json`](../data/graph/storm-elsewhere.json) (commits: incident.graph@)
- [`data/graph/storm.json`](../data/graph/storm.json) (commits: incident.graph@)
- [`data/graph/tables/actors.json`](../data/graph/tables/actors.json) (commits: incident.graph@)
- [`data/graph/tables/decisions.json`](../data/graph/tables/decisions.json) (commits: incident.graph@)
- [`data/graph/tables/signals.json`](../data/graph/tables/signals.json) (commits: incident.graph@)
- [`data/graph/tables/sources.json`](../data/graph/tables/sources.json) (commits: incident.graph@)
- [`data/graph/tables/timeline.json`](../data/graph/tables/timeline.json) (commits: incident.graph@)
- [`data/graph/tables/warnings.json`](../data/graph/tables/warnings.json) (commits: incident.graph@)
- [`data/keys.json`](../data/keys.json) (commits: incident.conductor@, incident.designer@, incident.graph@, incident.identity@, incident.librarian@, incident.media@, incident.observability@, incident.weatherwatch@)
- [`data/query/index.html`](../data/query/index.html) (commits: incident.graph@)
- [`incidents/2026-11-10-storm-charles/comms/dinis.md`](../incidents/2026-11-10-storm-charles/comms/dinis.md) (commits: incident.conductor@)
- [`incidents/2026-11-10-storm-charles/comms/facts.md`](../incidents/2026-11-10-storm-charles/comms/facts.md) (commits: incident.conductor@)
- [`incidents/2026-11-10-storm-charles/comms/meetings.md`](../incidents/2026-11-10-storm-charles/comms/meetings.md) (commits: incident.conductor@)
- [`incidents/2026-11-10-storm-charles/comms/public.md`](../incidents/2026-11-10-storm-charles/comms/public.md) (commits: incident.conductor@)
- [`incidents/2026-11-10-storm-charles/comms/team.md`](../incidents/2026-11-10-storm-charles/comms/team.md) (commits: incident.conductor@)
- [`incidents/2026-11-10-storm-charles/data/README.md`](../incidents/2026-11-10-storm-charles/data/README.md) (commits: incident.conductor@)
- [`incidents/2026-11-10-storm-charles/data/decisions/sources.json`](../incidents/2026-11-10-storm-charles/data/decisions/sources.json) (commits: incident.conductor@)
- [`incidents/2026-11-10-storm-charles/data/signals.json`](../incidents/2026-11-10-storm-charles/data/signals.json) (commits: incident.conductor@)
- [`incidents/2026-11-10-storm-charles/data/watch/websummit.json`](../incidents/2026-11-10-storm-charles/data/watch/websummit.json) (commits: incident.conductor@)
- [`incidents/2026-11-10-storm-charles/data/weather/airport.json`](../incidents/2026-11-10-storm-charles/data/weather/airport.json) (commits: incident.conductor@)
- [`incidents/2026-11-10-storm-charles/data/weather/cap.json`](../incidents/2026-11-10-storm-charles/data/weather/cap.json) (commits: incident.conductor@)
- [`incidents/2026-11-10-storm-charles/data/weather/changes.json`](../incidents/2026-11-10-storm-charles/data/weather/changes.json) (commits: incident.conductor@)
- [`incidents/2026-11-10-storm-charles/data/weather/communiques.json`](../incidents/2026-11-10-storm-charles/data/weather/communiques.json) (commits: incident.conductor@)
- [`incidents/2026-11-10-storm-charles/data/weather/forecast.json`](../incidents/2026-11-10-storm-charles/data/weather/forecast.json) (commits: incident.conductor@)
- [`incidents/2026-11-10-storm-charles/data/weather/gusts-vs-forecast.json`](../incidents/2026-11-10-storm-charles/data/weather/gusts-vs-forecast.json) (commits: incident.conductor@)
- [`incidents/2026-11-10-storm-charles/data/weather/stations.json`](../incidents/2026-11-10-storm-charles/data/weather/stations.json) (commits: incident.conductor@)
- [`incidents/2026-11-10-storm-charles/data/weather/tools/refresh.py`](../incidents/2026-11-10-storm-charles/data/weather/tools/refresh.py) (commits: incident.conductor@)
- [`incidents/2026-11-10-storm-charles/data/weather/warnings.json`](../incidents/2026-11-10-storm-charles/data/weather/warnings.json) (commits: incident.conductor@)
- [`incidents/2026-11-10-storm-charles/timeline.md`](../incidents/2026-11-10-storm-charles/timeline.md) (commits: incident.conductor@)
- [`research/media/feeds.json`](../research/media/feeds.json) (commits: incident.media@)
- [`research/media/ranking.md`](../research/media/ranking.md) (commits: incident.media@)
- [`research/media/seeds.txt`](../research/media/seeds.txt) (commits: incident.media@)
- [`research/weather-sites/meteoalarm-check.json`](../research/weather-sites/meteoalarm-check.json) (commits: incident.weatherwatch@)
- [`research/weather-sites/outreach/eumetsat-registration.md`](../research/weather-sites/outreach/eumetsat-registration.md) (commits: incident.weatherwatch@)
- [`research/weather-sites/outreach/ipma-radar.md`](../research/weather-sites/outreach/ipma-radar.md) (commits: incident.weatherwatch@)
- [`research/weather-sites/tools/gap.py`](../research/weather-sites/tools/gap.py) (commits: incident.weatherwatch@)
- [`research/weather-sites/tools/gen.py`](../research/weather-sites/tools/gen.py) (commits: incident.weatherwatch@)
- [`research/weather-sites/tools/probe.sh`](../research/weather-sites/tools/probe.sh) (commits: incident.weatherwatch@)
- [`tools/graph-places.mjs`](../tools/graph-places.mjs) (commits: incident.graph@)
- [`tools/lane-configure.mjs`](../tools/lane-configure.mjs) (commits: incident.identity@)
- [`tools/lane-drain.mjs`](../tools/lane-drain.mjs) (commits: incident.identity@)
- [`tools/lane-e2e.mjs`](../tools/lane-e2e.mjs) (commits: incident.identity@)
- [`tools/lane-open.mjs`](../tools/lane-open.mjs) (commits: incident.identity@)
- [`tools/lane-seal.mjs`](../tools/lane-seal.mjs) (commits: incident.identity@)
- [`tools/lane-test.mjs`](../tools/lane-test.mjs) (commits: incident.identity@)
- [`tools/sync-from-websummit.sh`](../tools/sync-from-websummit.sh) (commits: incident.conductor@)

### Records and datasets that give no date of their own

- [`BRIEF-CORRECTIONS.md`](../BRIEF-CORRECTIONS.md)
- [`REALITY.md`](../REALITY.md)
- [`agents/JOBS.md`](../agents/JOBS.md)
- [`agents/README.md`](../agents/README.md)
- [`agents/conductor/policy.md`](../agents/conductor/policy.md)
- [`agents/designer/policy.md`](../agents/designer/policy.md)
- [`agents/dev/policy.md`](../agents/dev/policy.md)
- [`agents/graph/policy.md`](../agents/graph/policy.md)
- [`agents/identity/policy.md`](../agents/identity/policy.md)
- [`agents/librarian/policy.md`](../agents/librarian/policy.md)
- [`agents/media/policy.md`](../agents/media/policy.md)
- [`agents/meteorologist/policy.md`](../agents/meteorologist/policy.md)
- [`agents/observability/policy.md`](../agents/observability/policy.md)
- [`agents/researcher/policy.md`](../agents/researcher/policy.md)
- [`agents/weatherwatch/policy.md`](../agents/weatherwatch/policy.md)
- [`data/graph/ontology.json`](../data/graph/ontology.json)
- [`data/graph/queries.json`](../data/graph/queries.json)
- [`data/graph/ref/ipma-areas.json`](../data/graph/ref/ipma-areas.json)
- [`data/graph/storm-elsewhere.json`](../data/graph/storm-elsewhere.json)
- [`data/graph/storm.json`](../data/graph/storm.json)
- [`data/graph/tables/actors.json`](../data/graph/tables/actors.json)
- [`data/graph/tables/decisions.json`](../data/graph/tables/decisions.json)
- [`data/graph/tables/signals.json`](../data/graph/tables/signals.json)
- [`data/graph/tables/sources.json`](../data/graph/tables/sources.json)
- [`data/graph/tables/timeline.json`](../data/graph/tables/timeline.json)
- [`data/graph/tables/warnings.json`](../data/graph/tables/warnings.json)
- [`data/keys.json`](../data/keys.json)
- [`incidents/2026-11-10-storm-charles/comms/README.md`](../incidents/2026-11-10-storm-charles/comms/README.md)
- [`incidents/2026-11-10-storm-charles/comms/dinis.md`](../incidents/2026-11-10-storm-charles/comms/dinis.md)
- [`incidents/2026-11-10-storm-charles/comms/facts.md`](../incidents/2026-11-10-storm-charles/comms/facts.md)
- [`incidents/2026-11-10-storm-charles/comms/meetings.md`](../incidents/2026-11-10-storm-charles/comms/meetings.md)
- [`incidents/2026-11-10-storm-charles/comms/public.md`](../incidents/2026-11-10-storm-charles/comms/public.md)
- [`incidents/2026-11-10-storm-charles/comms/team.md`](../incidents/2026-11-10-storm-charles/comms/team.md)
- [`incidents/2026-11-10-storm-charles/data/weather/changes.json`](../incidents/2026-11-10-storm-charles/data/weather/changes.json)
- [`incidents/2026-11-10-storm-charles/data/weather/forecast.json`](../incidents/2026-11-10-storm-charles/data/weather/forecast.json)
- [`incidents/2026-11-10-storm-charles/decisions.md`](../incidents/2026-11-10-storm-charles/decisions.md)
- [`incidents/2026-11-10-storm-charles/timeline.md`](../incidents/2026-11-10-storm-charles/timeline.md)
- [`library/reading/README.md`](reading/README.md)
- [`research/media/feeds.json`](../research/media/feeds.json)
- [`research/media/ranking.md`](../research/media/ranking.md)
- [`research/media/seeds.txt`](../research/media/seeds.txt)
- [`research/media/tools/harvest.mjs`](../research/media/tools/harvest.mjs)
- [`research/media/tools/rank.mjs`](../research/media/tools/rank.mjs)
- [`research/media/tools/social.mjs`](../research/media/tools/social.mjs)
- [`research/media/tools/wikipedia.mjs`](../research/media/tools/wikipedia.mjs)
- [`research/weather-sites/README.md`](../research/weather-sites/README.md)
- [`research/weather-sites/meteoalarm-check.json`](../research/weather-sites/meteoalarm-check.json)
- [`research/weather-sites/outreach/eumetsat-registration.md`](../research/weather-sites/outreach/eumetsat-registration.md)
- [`research/weather-sites/outreach/ipma-radar.md`](../research/weather-sites/outreach/ipma-radar.md)
- [`research/weather-sites/tools/gap.py`](../research/weather-sites/tools/gap.py)
- [`research/weather-sites/tools/gen.py`](../research/weather-sites/tools/gen.py)
- [`research/weather-sites/tools/probe.sh`](../research/weather-sites/tools/probe.sh)

### Datasets that name no source in their own fields

Their values may each carry a source inside; the file as a whole names none at the top.

- [`data/keys.json`](../data/keys.json)
- [`incidents/2026-11-10-storm-charles/data/decisions/graph.json`](../incidents/2026-11-10-storm-charles/data/decisions/graph.json)
- [`incidents/2026-11-10-storm-charles/data/decisions/sources.json`](../incidents/2026-11-10-storm-charles/data/decisions/sources.json)
- [`incidents/2026-11-10-storm-charles/data/weather/airport.json`](../incidents/2026-11-10-storm-charles/data/weather/airport.json)
- [`incidents/2026-11-10-storm-charles/data/weather/forecast.json`](../incidents/2026-11-10-storm-charles/data/weather/forecast.json)

### Documents nothing links to

"Everything linked" (Dinis, 10 November): these are reachable only from this catalogue.

- [`app/agents/about.md`](../app/agents/about.md)
- [`app/graph/about.md`](../app/graph/about.md)
- [`data/query/about.md`](../data/query/about.md)
- [`library/drafts/now-json.md`](drafts/now-json.md)
- [`library/releases.md`](releases.md)
- [`research/weather-sites/README.md`](../research/weather-sites/README.md)

### Older than the sources they were made from

"Corrections must propagate": a draft, an analysis or a derived dataset whose named source was committed after it. It may still be right; someone should look.

- [`data/graph/ontology.json`](../data/graph/ontology.json): last changed 11-10 23:58; its source data/graph/storm.json changed 11-11 00:00
- [`incidents/2026-11-10-storm-charles/comms/README.md`](../incidents/2026-11-10-storm-charles/comms/README.md): last changed 11-10 21:14; its source incidents/2026-11-10-storm-charles/comms/facts.md changed 11-10 23:53
- [`incidents/2026-11-10-storm-charles/data/weather/gusts-vs-forecast.json`](../incidents/2026-11-10-storm-charles/data/weather/gusts-vs-forecast.json): last changed 11-10 23:57; its source incidents/2026-11-10-storm-charles/data/weather/analysis.md changed 11-11 00:00

### Files with no commit record yet

The commits are read in the librarian's clone, not in CI (last at commit `c196f21a75`); a file new or changed since shows here until the next read.

- None.

### Not served on the site

In the repository only (the build skips `admin/` and dot files); the links go to GitHub.

- [`.github/workflows/deploy.yml`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/blob/dev/.github/workflows/deploy.yml)
- [`.gitignore`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/blob/dev/.gitignore)
- [`admin/build/build.mjs`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/blob/dev/admin/build/build.mjs)
- [`admin/build/validate.mjs`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/blob/dev/admin/build/validate.mjs)
- [`admin/series.txt`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/blob/dev/admin/series.txt)
- [`admin/tools/release.sh`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/blob/dev/admin/tools/release.sh)
