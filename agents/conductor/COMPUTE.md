> Kept by incident.conductor@web-summit.dinis, 2026-11-11, 22:03 UTC

# Compute that runs at the wrong altitude, and what would move it out

Dinis, ~22:10 UTC 11 Nov: we are crossing altitudes. Agents (A3) run code (A0) inside their own environment, code that should run in a container outside it. Map it, and open a thread on what he can give us so the compute runs somewhere else: "a mini container, a mini shell".

The rule this breaks (fringe, docs/where-agents-run.md §3): *the grant's altitude must not be higher than the mandate's.* A reader's mandate is A0 (fetch a page, parse it, write a JSON). Run inside an agent's session, it gets the agent's whole A3 grant:
- push to dev;
- the OpenRouter key;
- the agent's private session key;
- every vault key it holds;
- the right to message other sessions, start sessions and schedule wakes.

Untrusted bytes from the web (press pages, PDFs, feeds, model answers) are parsed in that same place.

## 1. The map (first pass, 22:10; the librarian is adding a grant column to library/altitudes.json)

| Where | The A0/A1 work | Runs in | Untrusted input it touches | What else that environment holds |
|---|---|---|---|---|
| incident.conductor@ (this session) | curl and parse IPMA's CAP feed and open data; the bridge sync script; site builds; PDF rendering in Chromium | the conductor's session | MeteoAlarm XML, IPMA JSON, the old repository's files | 9 vault keys (~/.incident-vaults), an SG/Send key, 17 key/token variables (OpenRouter, push), the right to start sessions and change scheduled tasks |
| incident.meteorologist@ | a background CAP poll, METAR/TAF reads | its session | feeds | its keys, push |
| incident.flights@ (new) | an OpenSky poller every 10 min, Open-Meteo reads | its session | API JSON | its key, push, a vault key |
| incident.observability@, incident.dev@ | background Chromium (live checks, page-view drain) | their sessions | our live site; the sealed page-view lane | lane keys, push |
| incident.researcher@, meteorology@, graph@, labs@, studio@, identity@ | headless browser reads (Diário da República, licence pages, renders) | their sessions | arbitrary web pages and scripts | keys, push |
| incident.archivist@, sources@, weatherwatch@, transport@, media@, social@ | page and feed readers, captures to vaults | their sessions | press pages, operators' sites, posts | vault keys, push |
| incident.models@, perplexity@, shadow@ and soon every delegating collector | model calls (A1) and their answers fed back into the agent | their sessions | model output (untrusted text) | the OpenRouter key, push |
| **GitHub Actions (CI)** | build, gate, deploy | a fresh runner per push | our repository, npm packages, Chromium | **corrected 22:13 (incident.librarian@, f698a96f): it crosses too.** The one job holds `contents: write` (persisted by checkout) and the Pages token while it runs the gate, the generators and Chromium. The fix: a build job with `contents: read`, then a separate deploy-and-tag job (incident.ci@) |

## 2. What we would need: a runner, not a shell in our session

The smallest thing that fixes it is an **A0 runner**. It's a container that is born per task, holds no agent key and no push right, and has a per-task network allowlist. It works like this:

1. The agent writes a **task packet** (JSON): the code by git commit and path (never code text the agent just made up), the inputs by URL or sha256, the hosts it may reach, time and memory limits, and the output schema. Fringe already uses packets: tasks/*/packet.json.
2. The runner pulls the packet, runs it, and returns a **result** (JSON plus logs plus the sha256 of each raw response), signed by the runner's own key. Every altitude holds a key: fringe §3.
3. The agent checks the signature and the schema, and only then writes the result to git.
4. Raw captures go from the runner straight to a vault the runner owns. The agent never parses them.

Each run is also a trace event (A0 start and end, with a parent span), so the runner shows up in the visualisation by itself.

## 3. Options Dinis could give us (cheapest first)

**Dinis, ~22:10: (a) chosen.** He creates a repository for the runners; the data may go to a vault; pullers run on the Actions schedule, or a push triggers them. Not (b). (d) only to run open-weight models locally. The design is two scheduled layers: the Claude agents (A3) wake on scheduled tasks and write packets; the runners (A0) run on their own schedule or a push. Results land in git or a vault, and in Elastic (anything through OpenRouter already does).

| Option | What it is | Fits | Missing |
|---|---|---|---|
| a. **GitHub Actions as the runner** | scheduled and on-demand workflows in a separate repository, running only committed code, with a token that can write only to a data branch or a vault | the pollers, readers and builds; minimum schedule about 5 min | an agent asks for a run by committing a packet (slow, about 30 s to start); no long-lived poller |
| b. **SG/Playwright** (the SGraph team's browser service on an ephemeral sg-compute host, reached over HTTP with a token) | a real browser outside our sessions | every headless browser read (researcher, archivist, licence pages) | a token for us; is it per task or long-lived? |
| c. **A small container API** (Lambda, Cloud Run or a Fly machine) behind one endpoint: POST packet → signed result | the general A0 runner of §2 | everything A0, including the 10-minute pollers | someone to deploy it, and a budget |
| d. **The laptops (R2)** pulling packets | already planned for Ollama (fringe §2.1) | private data, open-weight models locally | only while a laptop is on |

## 4. The questions for Dinis
1. Which of a–d (or another) can you give us first? My suggestion: **(a) now**, since it needs only a repository and its settings, then **(c)** for the pollers.
2. Who holds the runner's key and the vault it writes to? I suggest the runner makes its own, and we publish its public half on the keys page like any agent.
3. Should the agents stop running browser reads in their sessions once (b) exists? I would say yes, in the briefs.
