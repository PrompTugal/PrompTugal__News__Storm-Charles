# The library: everything on this site, and where it came from

> Kept by incident.librarian@web-summit.dinis. This page and [index.json](index.json) are built from the repository by [`tools/library-index.mjs`](../tools/library-index.mjs); nobody writes them by hand. **82 files**, the newest change 11-10 23:58 UTC. Nothing here is guessed: what a file does not say about itself is left empty and listed under [Gaps](#gaps).

Not a warning service: follow IPMA, ANEPC and your local authorities.

**For agents:** [library/index.json](index.json) (every file: kind, what it is, who, when, made from, links in and out, sha256) · [library/provenance.json](provenance.json) (who committed what) · the data files' catalogue with the served sha256: [api/v1/index.json](../api/v1/index.json).

**Also here:** [the reading list](reading/README.md) (what newsroom.sgit.ai's articles mean for this site) · [the glossary](glossary.md) (fact, evidence, hypothesis and the other words this site uses).

**How to read a row.** *By* is who the file itself says wrote or keeps it; the agents named in its commits follow when they differ. *Changed* is the last commit (UTC) when it is known, else the date the file gives for itself. *Made from* is the sources its own header names.

| Kind | Files | What it is |
|---|---|---|
| [rules](#rules) | 1 | The rules every agent reads first. |
| [brief](#brief) | 2 | Dinis's direction, close to his words, and its corrections. |
| [plan](#plan) | 3 | Proposals and priorities: what is to be built and in what order. |
| [record](#record) | 1 | What exists. |
| [decision log](#decision-log) | 2 | The timeline of signals and the decisions, newest first. |
| [incident record](#incident-record) | 2 | The incident's own page and front-page record. |
| [dataset](#dataset) | 14 | JSON data: every value with its source and the time read. |
| [dataset doc](#dataset-doc) | 3 | What a dataset holds and who keeps it. |
| [analysis](#analysis) | 1 | Our analysis, labelled as analysis: a hypothesis with its reasons, never a fact. |
| [reading](#reading) | 1 | The reading list: what others wrote that bears on this site, and what it means here. |
| [library](#library) | 4 | The catalogue itself, the glossary, the standard. |
| [agent file](#agent-file) | 12 | Each agent's jobs, status and asks. |
| [comms draft](#comms-draft) | 6 | Drafts for people; a person sends. |
| [material](#material) | 1 | Material offered to another newsroom's desk. |
| [design](#design) | 1 | Design rounds and notes. |
| [tool](#tool) | 9 | Scripts the agents run. |
| [build](#build) | 3 | The build, the gate and CI. |
| [admin](#admin) | 1 | The admin area. |
| [app](#app) | 11 | What runs in the browser. |
| [repository](#repository) | 4 | The repository's own files. |

## rules

The rules every agent reads first.

| File | What it is | By | Changed | Made from |
|---|---|---|---|---|
| [`CLAUDE.md`](../CLAUDE.md) | **storm-charles.promptugal.news: the rules of this repository.** A newsroom for people and a data source for agents on Storm Charles (Lisbon, 10 to 12 November 2026), and the template for the next incident. Built and run by Dinis Cruz's incident team: … | *not said in the file*; commits: incident.conductor@ | 11-10 21:14 | [`BRIEF.md`](../BRIEF.md), [`PIPELINE.md`](../PIPELINE.md), [`ROADMAP.md`](../ROADMAP.md) |

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
| [`SECURITY.md`](../SECURITY.md) | **Security: Dinis's login, his lane to the conductor, his vaults.** incident.identity@web-summit.dinis, 10 November 2026, at Dinis Cruz's word of ~23:40 UTC (BRIEF.md). A design, then what is built; each section says which. Reused, unmodified and pinned by sha256: … | *not said* |  | [`BRIEF.md`](../BRIEF.md), [`app/login/pki/PIN.json`](../app/login/pki/PIN.json) |

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
| [`incidents/2026-11-10-storm-charles/timeline.md`](../incidents/2026-11-10-storm-charles/timeline.md) | **Timeline (UTC, 10 to 11 November 2026).** Newest first (from 18:58, at the incident conductor's takeover). Facts and evidence carry their source; anything unofficial says so. | *not said* |  | [`incidents/2026-11-10-storm-charles/data/watch/websummit.json`](../incidents/2026-11-10-storm-charles/data/watch/websummit.json), [`incidents/2026-11-10-storm-charles/data/weather/airport.json`](../incidents/2026-11-10-storm-charles/data/weather/airport.json), [`incidents/2026-11-10-storm-charles/data/weather/analysis.md`](../incidents/2026-11-10-storm-charles/data/weather/analysis.md), [pt.euronews.com](https://pt.euronews.com/2026/11/10/portugal-web-summit-cancela-segundo-dia-em-lisboa-devido-a-tempestade-charles), [social.vivaldi.net](https://social.vivaldi.net/@jon/117594316167337659), [storm-charles.promptugal.news**](https://storm-charles.promptugal.news**), and 1 more |

## incident record

The incident's own page and front-page record.

| File | What it is | By | Changed | Made from |
|---|---|---|---|---|
| [`incidents/2026-11-10-storm-charles/README.md`](../incidents/2026-11-10-storm-charles/README.md) | **Incident: the storm on Wednesday 11 November (run as P1).** Declared (board WS-214) by conductor@web-summit.dinis at Dinis's word ("I want to run this weather situation as an incident, only here in our account", in his own session, 10 November 2026, about … | conductor@ (commits: incident.conductor@) | 11-10 21:14 |  |
| [`incidents/2026-11-10-storm-charles/incident.json`](../incidents/2026-11-10-storm-charles/incident.json) | **Storm Charles, Lisbon: Wednesday 11 November 2026.** The incident's front-page record, kept by incident.conductor@web-summit.dinis. The headline is always a decision or warning from its primary source, with the time it was published; the front page … | incident.conductor@ | 11-10 21:14 |  |

## dataset

JSON data: every value with its source and the time read.

| File | What it is | By | Changed | Made from |
|---|---|---|---|---|
| [`data/agents/index.json`](../data/agents/index.json) | Every agent of the incident team behind storm-charles.promptugal.news: its job (agents/JOBS.md), what it says it is doing, has done, will do next and asks for (agents/<role>/status.json; asks … | incident.observability@ |  | [`agents/JOBS.md`](../agents/JOBS.md), [`data/keys.json`](../data/keys.json), [`tools/agents-index.mjs`](../tools/agents-index.mjs) |
| [`data/keys.json`](../data/keys.json) | Public keys of the agents that write this repository. Public halves only: no private key, vault key or token is ever listed here. Each entry was added by the agent that made it, in its own session; … | *not said* |  |  |
| [`incidents/2026-11-10-storm-charles/data/decisions/graph.json`](../incidents/2026-11-10-storm-charles/data/decisions/graph.json) ([api](../api/v1/2026-11-10-storm-charles/decisions/graph.json)) | The decision graph of the storm (WS-214), kept by incident.researcher@web-summit.dinis. Nodes are decision-makers; edges are decisions, each with who made it (by), whom it touches (to) and what it … | incident.researcher@ (commits: incident.conductor@) | 11-10 23:03 |  |
| [`incidents/2026-11-10-storm-charles/data/decisions/sources.json`](../incidents/2026-11-10-storm-charles/data/decisions/sources.json) ([api](../api/v1/2026-11-10-storm-charles/decisions/sources.json)) | Every source incident.researcher@ uses for WS-214: what it holds, how often it changes, whether a machine can read it, its status when last tried. parser_ask = the part we ask incident.dev@ to parse. | *not said in the file*; commits: incident.conductor@ | 11-10 23:03 |  |
| [`incidents/2026-11-10-storm-charles/data/signals.json`](../incidents/2026-11-10-storm-charles/data/signals.json) ([api](../api/v1/2026-11-10-storm-charles/signals.json)) | The incident timeline as data, made from timeline.md by tools/timeline.mjs (never edit by hand; edit timeline.md). See README.md. | *not said* | 11-10 23:41 | [`incidents/2026-11-10-storm-charles/timeline.md`](../incidents/2026-11-10-storm-charles/timeline.md), [`tools/timeline.mjs`](../tools/timeline.mjs), [`incidents/2026-11-10-storm-charles/data/README.md`](../incidents/2026-11-10-storm-charles/data/README.md) |
| [`incidents/2026-11-10-storm-charles/data/watch/websummit.json`](../incidents/2026-11-10-storm-charles/data/watch/websummit.json) ([api](../api/v1/2026-11-10-storm-charles/watch/websummit.json)) | Web Summit's own channels, watched for its decisions (Wednesday 11 November: off, 19:38; now Day 3 and the open items: talks, PITCH, side events, tickets): the blog's listings (polled every 2 … | *not said in the file*; commits: incident.conductor@ | 11-10 21:37 | [`tools/websummit.mjs`](../tools/websummit.mjs), [`incidents/2026-11-10-storm-charles/data/README.md`](../incidents/2026-11-10-storm-charles/data/README.md) |
| [`incidents/2026-11-10-storm-charles/data/weather/airport.json`](../incidents/2026-11-10-storm-charles/data/weather/airport.json) ([api](../api/v1/2026-11-10-storm-charles/weather/airport.json)) | IPMA's aeronautical forecast (TAF) and observations (METAR) for Lisbon airport (LPPT), read through the US NOAA Aviation Weather Center's public API. Knots, with km/h (1 kt = 1.852 km/h). A point … | *not said in the file*; commits: incident.conductor@ | 11-10 23:24 |  |
| [`incidents/2026-11-10-storm-charles/data/weather/analysis.json`](../incidents/2026-11-10-storm-charles/data/weather/analysis.json) ([api](../api/v1/2026-11-10-storm-charles/weather/analysis.json)) | Reasoning from the facts in this folder; not IPMA's words. Times are UTC = Lisbon time (WET). See analysis.md for the reasons. | incident.meteorologist@ (commits: incident.conductor@) | 11-10 23:24 | [`incidents/2026-11-10-storm-charles/data/weather/analysis.md`](../incidents/2026-11-10-storm-charles/data/weather/analysis.md) |
| [`incidents/2026-11-10-storm-charles/data/weather/changes.json`](../incidents/2026-11-10-storm-charles/data/weather/changes.json) ([api](../api/v1/2026-11-10-storm-charles/weather/changes.json)) | thursday (first): Lisbon warnings touching Thursday 12 Nov and the forecasts for its morning. gusts_above_warned: every LPPT METAR gust from Wed 05:00 above the gust warned for that hour (the IPMA … | *not said in the file*; commits: incident.conductor@ | 11-10 23:24 | [`incidents/2026-11-10-storm-charles/data/weather/tools/refresh.py`](../incidents/2026-11-10-storm-charles/data/weather/tools/refresh.py) |
| [`incidents/2026-11-10-storm-charles/data/weather/communiques.json`](../incidents/2026-11-10-storm-charles/data/weather/communiques.json) ([api](../api/v1/2026-11-10-storm-charles/weather/communiques.json)) | IPMA's communiqués (special weather information) from its RSS feed, kept across reads; earthquake notices left out. | *not said in the file*; commits: incident.conductor@ | 11-10 23:24 | [ipma.pt](https://www.ipma.pt/resources.www/rss/comunicados.xml) |
| [`incidents/2026-11-10-storm-charles/data/weather/forecast.json`](../incidents/2026-11-10-storm-charles/data/weather/forecast.json) ([api](../api/v1/2026-11-10-storm-charles/weather/forecast.json)) | IPMA's own forecast for Lisbon (globalIdLocal 1110600): the 5-day daily forecast and the hourly model forecast (mean wind, no gusts). IPMA's wind classes: 1 weak, 2 moderate, 3 strong, 4 very strong. | *not said in the file*; commits: incident.conductor@ | 11-10 23:24 |  |
| [`incidents/2026-11-10-storm-charles/data/weather/gusts-vs-forecast.json`](../incidents/2026-11-10-storm-charles/data/weather/gusts-vs-forecast.json) ([api](../api/v1/2026-11-10-storm-charles/weather/gusts-vs-forecast.json)) | The latest observed wind in Lisbon against what was forecast for that hour. Facts with sources; no analysis here (see analysis.md). | *not said in the file*; commits: incident.conductor@ | 11-10 23:24 | [`incidents/2026-11-10-storm-charles/data/weather/analysis.md`](../incidents/2026-11-10-storm-charles/data/weather/analysis.md) |
| [`incidents/2026-11-10-storm-charles/data/weather/stations.json`](../incidents/2026-11-10-storm-charles/data/weather/stations.json) ([api](../api/v1/2026-11-10-storm-charles/weather/stations.json)) | IPMA's hourly station observations in and next to Lisbon, kept across reads (the feed holds 24 hours). Mean wind only: this feed has NO gusts; gusts are in the airport's METAR (airport.json). | *not said in the file*; commits: incident.conductor@ | 11-10 23:24 | [api.ipma.pt](https://api.ipma.pt/open-data/observation/meteorology/stations/observations.json), [api.ipma.pt](https://api.ipma.pt/open-data/observation/meteorology/stations/stations.json), [`incidents/2026-11-10-storm-charles/data/weather/airport.json`](../incidents/2026-11-10-storm-charles/data/weather/airport.json) |
| [`incidents/2026-11-10-storm-charles/data/weather/warnings.json`](../incidents/2026-11-10-storm-charles/data/weather/warnings.json) ([api](../api/v1/2026-11-10-storm-charles/weather/warnings.json)) | IPMA's weather warnings for the Lisbon district (idAreaAviso LSB), non-green only; red and orange warnings elsewhere; and how Lisbon's warnings changed over time. Times are local = UTC (WET). … | *not said in the file*; commits: incident.conductor@ | 11-10 23:24 | [api.ipma.pt](https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json) |

## dataset doc

What a dataset holds and who keeps it.

| File | What it is | By | Changed | Made from |
|---|---|---|---|---|
| [`incidents/2026-11-10-storm-charles/data/README.md`](../incidents/2026-11-10-storm-charles/data/README.md) | **The storm's data (WS-214).** JSON first: the incident dashboard (the incident page), Vicky's agents and the work desk read these files, not pages. Every item carries one label: fact, evidence or hypothesis (the meteorologist's … | *not said in the file*; commits: incident.conductor@ | 11-10 21:37 | [`incidents/2026-11-10-storm-charles/README.md`](../incidents/2026-11-10-storm-charles/README.md), [`incidents/2026-11-10-storm-charles/data/decisions/README.md`](../incidents/2026-11-10-storm-charles/data/decisions/README.md), [`incidents/2026-11-10-storm-charles/data/decisions/graph.json`](../incidents/2026-11-10-storm-charles/data/decisions/graph.json), [`incidents/2026-11-10-storm-charles/data/decisions/sources.json`](../incidents/2026-11-10-storm-charles/data/decisions/sources.json), [`incidents/2026-11-10-storm-charles/data/signals.json`](../incidents/2026-11-10-storm-charles/data/signals.json), [`incidents/2026-11-10-storm-charles/data/watch/websummit.json`](../incidents/2026-11-10-storm-charles/data/watch/websummit.json), and 5 more |
| [`incidents/2026-11-10-storm-charles/data/decisions/README.md`](../incidents/2026-11-10-storm-charles/data/decisions/README.md) | **The decision graph of the storm (WS-214).** Kept by incident.researcher@web-summit.dinis for the incident team, the dashboard and Vicky's agents (as material). JSON first: read the data, not the pages. | incident.researcher@ (commits: incident.conductor@) | 11-10 21:14 |  |
| [`incidents/2026-11-10-storm-charles/data/weather/README.md`](../incidents/2026-11-10-storm-charles/data/weather/README.md) | **The weather picture: data (WS-214, the storm on Wednesday 11 November 2026).** Kept by incident.meteorologist@web-summit.dinis for the incident team, the dashboard and, as material, Vicky's weather desk. JSON first: read these files, not pages. Every record carries source (the … | incident.meteorologist@ (commits: incident.conductor@) | 11-10 21:14 | [`agents/meteorologist/status.json`](../agents/meteorologist/status.json), [`incidents/2026-11-10-storm-charles/data/weather/airport.json`](../incidents/2026-11-10-storm-charles/data/weather/airport.json), [`incidents/2026-11-10-storm-charles/data/weather/changes.json`](../incidents/2026-11-10-storm-charles/data/weather/changes.json), [`incidents/2026-11-10-storm-charles/data/weather/communiques.json`](../incidents/2026-11-10-storm-charles/data/weather/communiques.json), [`incidents/2026-11-10-storm-charles/data/weather/forecast.json`](../incidents/2026-11-10-storm-charles/data/weather/forecast.json), [`incidents/2026-11-10-storm-charles/data/weather/gusts-vs-forecast.json`](../incidents/2026-11-10-storm-charles/data/weather/gusts-vs-forecast.json), and 9 more |

## analysis

Our analysis, labelled as analysis: a hypothesis with its reasons, never a fact.

| File | What it is | By | Changed | Made from |
|---|---|---|---|---|
| [`incidents/2026-11-10-storm-charles/data/weather/analysis.md`](../incidents/2026-11-10-storm-charles/data/weather/analysis.md) | **Analysis: when the worst arrives in Lisbon on Wednesday, and how far ahead each warning could be known.** Label: ANALYSIS (incident.meteorologist@web-summit.dinis, 10 November 2026, written at 19:05 UTC from the data in this folder as read at 19:01 UTC). The facts it rests on are in the JSON files beside … | incident.meteorologist@ (commits: incident.conductor@) | 11-10 23:24 | [`incidents/2026-11-10-storm-charles/data/weather/analysis.json`](../incidents/2026-11-10-storm-charles/data/weather/analysis.json) |

## reading

The reading list: what others wrote that bears on this site, and what it means here.

| File | What it is | By | Changed | Made from |
|---|---|---|---|---|
| [`library/reading/README.md`](reading/README.md) | **The reading list.** Kept by incident.librarian@web-summit.dinis, 10 November 2026. Being written now: what the articles on https://newsroom.sgit.ai mean for this site. | incident.librarian@ | 2026-11-10 | [`library/README.md`](README.md), [newsroom.sgit.ai](https://newsroom.sgit.ai) |

## library

The catalogue itself, the glossary, the standard.

| File | What it is | By | Changed | Made from |
|---|---|---|---|---|
| [`library/README.md`](README.md) | **The library: everything on this site, and where it came from.** The catalogue as a page, by kind, with the gaps listed. | incident.librarian@ |  | [`tools/library-index.mjs`](../tools/library-index.mjs) |
| [`library/glossary.md`](glossary.md) | **Glossary.** Kept by incident.librarian@web-summit.dinis, 10 November 2026. Being written now. | incident.librarian@ | 2026-11-10 | [`library/README.md`](README.md) |
| [`library/index.json`](index.json) | **The catalogue, for agents.** Every file on this site: kind, what it is, who wrote it, when it changed, what it was made from, what links to it, sha256; and the gaps. | incident.librarian@ |  | [`tools/library-index.mjs`](../tools/library-index.mjs) |
| [`library/provenance.json`](provenance.json) | **Who committed what.** For each file: its commits' agents, the first and the last commit, and the sha256 the record holds for. | incident.librarian@ |  | [`tools/library-index.mjs`](../tools/library-index.mjs) |

## agent file

Each agent's jobs, status and asks.

| File | What it is | By | Changed | Made from |
|---|---|---|---|---|
| [`agents/JOBS.md`](../agents/JOBS.md) | **The team and its jobs (kept by incident.conductor@web-summit.dinis).** From Dinis's direction of 10 November ~23:40 UTC (BRIEF.md). Each agent owns its folders; nobody edits another's files (ask in a commit with For:). Everyone: read CLAUDE.md first, make a session key, … | incident.conductor@ | 11-10 23:35 | [`BRIEF.md`](../BRIEF.md), [`CLAUDE.md`](../CLAUDE.md), [`SECURITY.md`](../SECURITY.md), [`app/site.css`](../app/site.css), [`data/keys.json`](../data/keys.json), [`library/index.json`](index.json) |
| [`agents/README.md`](../agents/README.md) | **The incident team's status files.** One folder per role; status.json holds the jobs routed to it, what is done, what is next, and asks (an ask starting "Dinis:" means the agent is blocked by its environment or needs his decision). Kept … | incident.conductor@ | 11-10 21:14 |  |
| [`agents/conductor/status.json`](../agents/conductor/status.json) |  | incident.conductor@ | 11-10 21:14 |  |
| [`agents/designer/status.json`](../agents/designer/status.json) |  | incident.designer@ | 11-10 23:50 |  |
| [`agents/dev/status.json`](../agents/dev/status.json) |  | incident.dev@web-summit.dinis (done, next, asks, baseline); jobs by incident.conductor@ | 11-10 22:03 |  |
| [`agents/identity/status.json`](../agents/identity/status.json) |  | incident.identity@ | 11-10 23:55 |  |
| [`agents/librarian/status.json`](../agents/librarian/status.json) |  | incident.librarian@ | 11-10 23:58 |  |
| [`agents/media/status.json`](../agents/media/status.json) |  | incident.media@ | 11-10 23:38 |  |
| [`agents/meteorologist/status.json`](../agents/meteorologist/status.json) |  | incident.meteorologist@ (commits: incident.conductor@) | 11-10 23:24 |  |
| [`agents/observability/status.json`](../agents/observability/status.json) |  | incident.observability@ | 11-10 23:55 |  |
| [`agents/researcher/status.json`](../agents/researcher/status.json) |  | incident.researcher@ (commits: incident.conductor@) | 11-10 23:03 |  |
| [`agents/weatherwatch/status.json`](../agents/weatherwatch/status.json) |  | incident.weatherwatch@ | 11-10 23:38 |  |

## comms draft

Drafts for people; a person sends.

| File | What it is | By | Changed | Made from |
|---|---|---|---|---|
| [`incidents/2026-11-10-storm-charles/comms/README.md`](../incidents/2026-11-10-storm-charles/comms/README.md) | **Communications: the storm (incident WS-214).** Kept by journalist.examples@web-summit.dinis, the incident's journalist. The method is Dinis's incident-handling series, part 4 ("Personalised stakeholder communication"): one source, many audiences, … | journalist.examples@ (commits: incident.conductor@) | 11-10 21:14 | [`incidents/2026-11-10-storm-charles/comms/dinis.md`](../incidents/2026-11-10-storm-charles/comms/dinis.md), [`incidents/2026-11-10-storm-charles/comms/facts.md`](../incidents/2026-11-10-storm-charles/comms/facts.md), [`incidents/2026-11-10-storm-charles/comms/meetings.md`](../incidents/2026-11-10-storm-charles/comms/meetings.md), [`incidents/2026-11-10-storm-charles/comms/public.md`](../incidents/2026-11-10-storm-charles/comms/public.md), [`incidents/2026-11-10-storm-charles/comms/team.md`](../incidents/2026-11-10-storm-charles/comms/team.md) |
| [`incidents/2026-11-10-storm-charles/comms/dinis.md`](../incidents/2026-11-10-storm-charles/comms/dinis.md) | **Brief for Dinis (through the incident's lead).** Facts as of 20:02 UTC. Five lines, then what needs your word. The 18:45 version is superseded. | *not said in the file*; commits: incident.conductor@ | 11-10 21:14 |  |
| [`incidents/2026-11-10-storm-charles/comms/facts.md`](../incidents/2026-11-10-storm-charles/comms/facts.md) | **The one source (facts as of 20:02 UTC, 10 November 2026; weather facts as of 18:38, Thursday's as of 19:22).** Every communication draft in this folder is built from these facts and cites them by number. Sources: weather@PrompTugal.vicky's desk (desks/weather-vicky/live.md, last full check 18:36 to 18:38 UTC, … | *not said in the file*; commits: incident.conductor@ | 11-10 21:14 |  |
| [`incidents/2026-11-10-storm-charles/comms/meetings.md`](../incidents/2026-11-10-storm-charles/comms/meetings.md) | **Draft for the people we are meeting on Wednesday (a person sends).** No names here. Whoever holds the meeting sends it on their own channel, edits it in their own voice, and keeps the reply in the private CRM if it is a lead. Facts as of 20:02 UTC (facts.md). | *not said in the file*; commits: incident.conductor@ | 11-10 21:14 |  |
| [`incidents/2026-11-10-storm-charles/comms/public.md`](../incidents/2026-11-10-storm-charles/comms/public.md) | **Draft for the public, through pt.news's newsroom.** An offer to Vicky's newsroom, not a publication. pt.news covers the storm and the summit's decision as news (S41, its weather desk and reviewer). This draft covers what the news does not: how our own … | *not said in the file*; commits: incident.conductor@ | 11-10 21:14 |  |
| [`incidents/2026-11-10-storm-charles/comms/team.md`](../incidents/2026-11-10-storm-charles/comms/team.md) | **Draft for the team (WhatsApp; a person sends).** Facts as of 18:38 UTC (F1 to F7, N1 to N5 in facts.md). Short enough for a phone. Two versions. From 19:55 UTC, B replaces A (Web Summit suspended Wednesday, F8). | *not said in the file*; commits: incident.conductor@ | 11-10 21:14 |  |

## material

Material offered to another newsroom's desk.

| File | What it is | By | Changed | Made from |
|---|---|---|---|---|
| [`incidents/2026-11-10-storm-charles/material/wednesday-is-off-what-now.md`](../incidents/2026-11-10-storm-charles/material/wednesday-is-off-what-now.md) | **Material for Vicky's weather desk: "Wednesday is off: what now?" (a service piece's facts).** Offered by incident.conductor@web-summit.dinis (WS-214), 10 November 2026, 20:00 UTC, as material for weather@PrompTugal.vicky and conductor.B@PrompTugal.vicky. Not an article and not advice. Vicky … | incident.conductor@ | 11-10 21:14 |  |

## design

Design rounds and notes.

| File | What it is | By | Changed | Made from |
|---|---|---|---|---|
| [`design/round-1.md`](../design/round-1.md) | **Design round 1: the home page as the weather presenter.** By incident.designer@web-summit.dinis, 10 November 2026, 23:35 to 23:50 UTC. Screenshots were taken (1280 and 390 wide, light and dark) and are described here, not committed. | incident.designer@ | 2026-11-10 |  |

## tool

Scripts the agents run.

| File | What it is | By | Changed | Made from |
|---|---|---|---|---|
| [`admin/tools/release.sh`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/blob/dev/admin/tools/release.sh) | Release from any agent's clone: AGENT=<name admin/tools/release.sh Commit your SOURCE changes first (subject "<agent: <what", trailers Agent:, Issue:, For:). This script rebases on dev, runs the gate … | *not said in the file*; commits: incident.conductor@ | 11-10 21:14 |  |
| [`incidents/2026-11-10-storm-charles/data/weather/tools/refresh.py`](../incidents/2026-11-10-storm-charles/data/weather/tools/refresh.py) | The weather picture for WS-214 (the storm, Wednesday 11 November 2026), as JSON. | *not said in the file*; commits: incident.conductor@ | 11-10 23:03 |  |
| [`tools/agents-index.mjs`](../tools/agents-index.mjs) | The team's index: repository - data/agents/index.json (kept by incident.observability@web-summit.dinis). node tools/agents-index.mjs write it node tools/agents-index.mjs --check exit 1 if the … | incident.observability@ |  |  |
| [`tools/library-index.mjs`](../tools/library-index.mjs) | The library's catalogue (incident.librarian@web-summit.dinis, 10 November 2026, WS-214; Dinis's direction ~23:40: "all information, all documents, all briefs should be on the site"; "provenance, … | incident.librarian@ | 2026-11-10 |  |
| [`tools/llm.mjs`](../tools/llm.mjs) | The model ledger's one wrapper (incident.dev@web-summit.dinis, 10 November 2026, WS-214; ROADMAP P0.4, Dinis's direction ~19:15): every model call the incident team makes goes through call() here, … | incident.dev@ (commits: incident.conductor@) | 11-10 21:14 |  |
| [`tools/sync-from-websummit.sh`](../tools/sync-from-websummit.sh) | Temporary bridge (10 November 2026): until the incident agents' sessions can push here, they keep writing data/ and their status files in SGit-AI__Website__Web-Summit team/incidents/ (its MOVED.md); … | *not said in the file*; commits: incident.conductor@ | 11-10 21:37 |  |
| [`tools/timeline.mjs`](../tools/timeline.mjs) | timeline.md - signals.json (incident.dev@web-summit.dinis, 10 November 2026, WS-214). The lead keeps the timeline as a markdown table (UTC \| Signal or decision \| Source); this turns just that table … | incident.dev@ | 2026-11-10 |  |
| [`tools/websummit-poll.sh`](../tools/websummit-poll.sh) | The 2-minute blog poll (incident.dev@web-summit.dinis, 10 November 2026, WS-214; incident.researcher@'s ask via the lead, 21:03). Rewritten at 21:30 after security.repos@'s MEDIUM (report … | incident.dev@ (commits: incident.conductor@) | 11-10 21:18 |  |
| [`tools/websummit.mjs`](../tools/websummit.mjs) | Web Summit's own channels, watched for the decision everyone waits for (incident.dev@web-summit.dinis, 10 November 2026, WS-214; incident.researcher@'s parser asks in decisions/sources.json: … | incident.dev@ (commits: incident.conductor@) | 11-10 21:37 |  |

## build

The build, the gate and CI.

| File | What it is | By | Changed | Made from |
|---|---|---|---|---|
| [`.github/workflows/deploy.yml`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/blob/dev/.github/workflows/deploy.yml) | One job: checkout (shallow), build, gate, deploy, tag, measure. Target: push to served in about 40 s (PIPELINE.md section 3). - fetch-depth 1 and nothing reads git history (a blobless full clone made … | *not said in the file*; commits: incident.conductor@ | 11-10 21:14 |  |
| [`admin/build/build.mjs`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/blob/dev/admin/build/build.mjs) | The build: repository - _site/ (never committed). Zero dependencies, one pass, a few hundred milliseconds. - every .md becomes a page beside it (and is served too, as its own markdown twin); - the … | *not said* |  |  |
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
| [`app/agents/about.md`](../app/agents/about.md) | **The agents page: how it works.** The agents, live shows every agent of the incident team: its job, what it says it is doing, what it has done, what is next, what it asks (asks that start "Dinis:" are gathered at the top), its last … | incident.observability@ |  | [`app/agents/index.html`](../app/agents/index.html) |
| [`app/agents/agents.css`](../app/agents/agents.css) | /app/agents/: the team console (incident.observability@web-summit.dinis). Uses app/site.css's tokens; adds nothing global. | incident.observability@ |  |  |
| [`app/agents/agents.js`](../app/agents/agents.js) | The team console (incident.observability@web-summit.dinis): every agent, what it is doing, what it asks, its last push. Mounts into <div id="agents-live" data-base="<path to the site root". Reads … | incident.observability@ |  |  |
| [`app/agents/index.html`](../app/agents/index.html) |  | *not said* |  |  |
| [`app/login/pki/PIN.json`](../app/login/pki/PIN.json) | Copies of pki.sgit.ai's modules, byte for byte, read on 10 November 2026 (23:30 UTC) by incident.identity@web-summit.dinis. Not edited here: to change one, change it at its source and pin the new … | *not said* |  |  |
| [`app/login/pki/door.js`](../app/login/pki/door.js) | door.js: from a passkey's PRF bytes (or a recovery code) to a door vault's key, the way the article says. Moved out of passkey/lab.js so that the vault pane (assets/vault-pane/) and the lab derive … | *not said* |  |  |
| [`app/login/pki/keys.js`](../app/login/pki/keys.js) | keys.js: the key material of the directory of people, in the browser and in Node, byte-compatible with sgit pki. Everything here is Web Crypto and nothing else. Each construction was checked against … | *not said* |  |  |
| [`app/login/pki/local.js`](../app/login/pki/local.js) | local.js: an account kept in this browser only, opened by the passkey alone. No access key, no vault, no passphrase. The passkey's PRF bytes already give a door (door.js). When no vault answers at … | *not said* |  |  |
| [`app/login/pki/message.js`](../app/login/pki/message.js) | message.js: a message to someone in the register, as a link and a QR code, or into their inbox; and an invitation. A message is JSON, signed by the sender when the sender has a key, then sealed in … | *not said* |  |  |
| [`app/site.css`](../app/site.css) | storm-charles.promptugal.news: one stylesheet, no dependencies. Tokens first; the dashboard (app/storm.js) uses the same names. | *not said* |  |  |
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
- [`SECURITY.md`](../SECURITY.md)
- [`admin/series.txt`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/blob/dev/admin/series.txt) (commits: incident.conductor@)
- [`admin/tools/release.sh`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/blob/dev/admin/tools/release.sh) (commits: incident.conductor@)
- [`app/agents/index.html`](../app/agents/index.html)
- [`app/login/pki/PIN.json`](../app/login/pki/PIN.json)
- [`app/login/pki/door.js`](../app/login/pki/door.js)
- [`app/login/pki/keys.js`](../app/login/pki/keys.js)
- [`app/login/pki/local.js`](../app/login/pki/local.js)
- [`app/login/pki/message.js`](../app/login/pki/message.js)
- [`app/site.css`](../app/site.css)
- [`data/keys.json`](../data/keys.json)
- [`incidents/2026-11-10-storm-charles/comms/dinis.md`](../incidents/2026-11-10-storm-charles/comms/dinis.md) (commits: incident.conductor@)
- [`incidents/2026-11-10-storm-charles/comms/facts.md`](../incidents/2026-11-10-storm-charles/comms/facts.md) (commits: incident.conductor@)
- [`incidents/2026-11-10-storm-charles/comms/meetings.md`](../incidents/2026-11-10-storm-charles/comms/meetings.md) (commits: incident.conductor@)
- [`incidents/2026-11-10-storm-charles/comms/public.md`](../incidents/2026-11-10-storm-charles/comms/public.md) (commits: incident.conductor@)
- [`incidents/2026-11-10-storm-charles/comms/team.md`](../incidents/2026-11-10-storm-charles/comms/team.md) (commits: incident.conductor@)
- [`incidents/2026-11-10-storm-charles/data/README.md`](../incidents/2026-11-10-storm-charles/data/README.md) (commits: incident.conductor@)
- [`incidents/2026-11-10-storm-charles/data/decisions/sources.json`](../incidents/2026-11-10-storm-charles/data/decisions/sources.json) (commits: incident.conductor@)
- [`incidents/2026-11-10-storm-charles/data/signals.json`](../incidents/2026-11-10-storm-charles/data/signals.json)
- [`incidents/2026-11-10-storm-charles/data/watch/websummit.json`](../incidents/2026-11-10-storm-charles/data/watch/websummit.json) (commits: incident.conductor@)
- [`incidents/2026-11-10-storm-charles/data/weather/airport.json`](../incidents/2026-11-10-storm-charles/data/weather/airport.json) (commits: incident.conductor@)
- [`incidents/2026-11-10-storm-charles/data/weather/changes.json`](../incidents/2026-11-10-storm-charles/data/weather/changes.json) (commits: incident.conductor@)
- [`incidents/2026-11-10-storm-charles/data/weather/communiques.json`](../incidents/2026-11-10-storm-charles/data/weather/communiques.json) (commits: incident.conductor@)
- [`incidents/2026-11-10-storm-charles/data/weather/forecast.json`](../incidents/2026-11-10-storm-charles/data/weather/forecast.json) (commits: incident.conductor@)
- [`incidents/2026-11-10-storm-charles/data/weather/gusts-vs-forecast.json`](../incidents/2026-11-10-storm-charles/data/weather/gusts-vs-forecast.json) (commits: incident.conductor@)
- [`incidents/2026-11-10-storm-charles/data/weather/stations.json`](../incidents/2026-11-10-storm-charles/data/weather/stations.json) (commits: incident.conductor@)
- [`incidents/2026-11-10-storm-charles/data/weather/tools/refresh.py`](../incidents/2026-11-10-storm-charles/data/weather/tools/refresh.py) (commits: incident.conductor@)
- [`incidents/2026-11-10-storm-charles/data/weather/warnings.json`](../incidents/2026-11-10-storm-charles/data/weather/warnings.json) (commits: incident.conductor@)
- [`incidents/2026-11-10-storm-charles/timeline.md`](../incidents/2026-11-10-storm-charles/timeline.md)
- [`tools/sync-from-websummit.sh`](../tools/sync-from-websummit.sh) (commits: incident.conductor@)

### Records and datasets that give no date of their own

- [`BRIEF-CORRECTIONS.md`](../BRIEF-CORRECTIONS.md)
- [`REALITY.md`](../REALITY.md)
- [`SECURITY.md`](../SECURITY.md)
- [`agents/JOBS.md`](../agents/JOBS.md)
- [`agents/README.md`](../agents/README.md)
- [`data/agents/index.json`](../data/agents/index.json)
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

### Datasets that name no source in their own fields

Their values may each carry a source inside; the file as a whole names none at the top.

- [`data/keys.json`](../data/keys.json)
- [`incidents/2026-11-10-storm-charles/data/decisions/graph.json`](../incidents/2026-11-10-storm-charles/data/decisions/graph.json)
- [`incidents/2026-11-10-storm-charles/data/decisions/sources.json`](../incidents/2026-11-10-storm-charles/data/decisions/sources.json)
- [`incidents/2026-11-10-storm-charles/data/weather/airport.json`](../incidents/2026-11-10-storm-charles/data/weather/airport.json)
- [`incidents/2026-11-10-storm-charles/data/weather/forecast.json`](../incidents/2026-11-10-storm-charles/data/weather/forecast.json)

### Documents nothing links to

"Everything linked" (Dinis, 10 November): these are reachable only from this catalogue.

- [`BRIEF-CORRECTIONS.md`](../BRIEF-CORRECTIONS.md)
- [`agents/README.md`](../agents/README.md)
- [`app/agents/about.md`](../app/agents/about.md)
- [`design/round-1.md`](../design/round-1.md)
- [`incidents/2026-11-10-storm-charles/comms/README.md`](../incidents/2026-11-10-storm-charles/comms/README.md)
- [`incidents/2026-11-10-storm-charles/material/wednesday-is-off-what-now.md`](../incidents/2026-11-10-storm-charles/material/wednesday-is-off-what-now.md)
- [`library/glossary.md`](glossary.md)
- [`library/reading/README.md`](reading/README.md)

### Files with no commit record yet

The commits are read in the librarian's clone, not in CI (last at commit `72a73628ab`); a file new or changed since shows here until the next read.

- [`SECURITY.md`](../SECURITY.md): new since the commits were last read
- [`admin/build/build.mjs`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/blob/dev/admin/build/build.mjs): changed since the commits were last read
- [`agents/designer/status.json`](../agents/designer/status.json): new since the commits were last read
- [`agents/identity/status.json`](../agents/identity/status.json): new since the commits were last read
- [`agents/librarian/status.json`](../agents/librarian/status.json): new since the commits were last read
- [`agents/observability/status.json`](../agents/observability/status.json): new since the commits were last read
- [`app/agents/about.md`](../app/agents/about.md): new since the commits were last read
- [`app/agents/agents.css`](../app/agents/agents.css): new since the commits were last read
- [`app/agents/agents.js`](../app/agents/agents.js): new since the commits were last read
- [`app/agents/index.html`](../app/agents/index.html): new since the commits were last read
- [`app/login/pki/PIN.json`](../app/login/pki/PIN.json): new since the commits were last read
- [`app/login/pki/door.js`](../app/login/pki/door.js): new since the commits were last read
- [`app/login/pki/keys.js`](../app/login/pki/keys.js): new since the commits were last read
- [`app/login/pki/local.js`](../app/login/pki/local.js): new since the commits were last read
- [`app/login/pki/message.js`](../app/login/pki/message.js): new since the commits were last read
- [`app/site.css`](../app/site.css): changed since the commits were last read
- [`data/agents/index.json`](../data/agents/index.json): new since the commits were last read
- [`data/keys.json`](../data/keys.json): changed since the commits were last read
- [`design/round-1.md`](../design/round-1.md): new since the commits were last read
- [`incidents/2026-11-10-storm-charles/data/signals.json`](../incidents/2026-11-10-storm-charles/data/signals.json): changed since the commits were last read
- [`incidents/2026-11-10-storm-charles/timeline.md`](../incidents/2026-11-10-storm-charles/timeline.md): changed since the commits were last read
- [`library/glossary.md`](glossary.md): new since the commits were last read
- [`library/reading/README.md`](reading/README.md): new since the commits were last read
- [`tools/agents-index.mjs`](../tools/agents-index.mjs): new since the commits were last read
- [`tools/library-index.mjs`](../tools/library-index.mjs): new since the commits were last read
- [`tools/timeline.mjs`](../tools/timeline.mjs): changed since the commits were last read

### Not served on the site

In the repository only (the build skips `admin/` and dot files); the links go to GitHub.

- [`.github/workflows/deploy.yml`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/blob/dev/.github/workflows/deploy.yml)
- [`.gitignore`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/blob/dev/.gitignore)
- [`admin/build/build.mjs`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/blob/dev/admin/build/build.mjs)
- [`admin/build/validate.mjs`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/blob/dev/admin/build/validate.mjs)
- [`admin/series.txt`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/blob/dev/admin/series.txt)
- [`admin/tools/release.sh`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/blob/dev/admin/tools/release.sh)
