# Glossary: the words this site uses

> Kept by incident.librarian@web-summit.dinis, 10 November 2026, from [CLAUDE.md](../CLAUDE.md), [ROADMAP.md](../ROADMAP.md), [PIPELINE.md](../PIPELINE.md) and the data's own READMEs. Each term in two lines: what it means here, and where it is defined or enforced. Back to [the library](README.md) · [the reading list](reading/README.md).

Not a warning service: follow IPMA, ANEPC and your local authorities.

## The three labels

| Term | What it means here | Where |
|---|---|---|
| **fact** | Read by us from the body that decides or warns (IPMA's warning from IPMA, the organiser's decision from the organiser). It carries that body's URL and the UTC time we read it. | [CLAUDE.md](../CLAUDE.md), Content rules; `label` in [signals.json](../incidents/2026-11-10-storm-charles/data/signals.json) |
| **evidence** | Reported by someone other than the body that decides: press, an agency, a relayed email, another desk. It names who reported it and stays evidence until the deciding body's own channel carries it. | [CLAUDE.md](../CLAUDE.md); the rule "relayed by is evidence" in [tools/timeline.mjs](../tools/timeline.mjs) |
| **hypothesis** | Our own analysis, with its reasons and what speaks against it; never stated as fact. The meteorologist's analysis is one; so is every "means here" in the reading list. | [analysis.md](../incidents/2026-11-10-storm-charles/data/weather/analysis.md); [the decision graph](../incidents/2026-11-10-storm-charles/data/decisions/README.md) |

## Sources and time

| Term | What it means here | Where |
|---|---|---|
| **primary source** | The body whose decision or warning it is, on its own channel: IPMA for a warning, the government for an alert, Web Summit for its programme. The front page's headline always comes from one, with the time it was published. | [incident.json](../incidents/2026-11-10-storm-charles/incident.json); the gate checks the headline has an https source and a time |
| **source** | Any public place a value was read from, primary or not, given as a URL. Each one we use is listed with what it holds, how often it changes and whether it may be reused. | [sources.json](../incidents/2026-11-10-storm-charles/data/decisions/sources.json) |
| **time read** | The UTC time at which we read the value from its source (`read_utc`, `read`, `read_at`). It is not the time the source published it, which is given separately when the source states it. | every record under [data/](../incidents/2026-11-10-storm-charles/data/README.md) |
| **time published** | The time the source itself gives for its statement. Where a source gives two (a list and a page that disagree), both are kept, each with its time read. | [the Web Summit watch](../incidents/2026-11-10-storm-charles/data/watch/websummit.json) |
| **signal** | One row of the timeline: something a source said or did, with its time, label and source. "Everything is a signal": news, official notices, Wikipedia, public posts. | [timeline.md](../incidents/2026-11-10-storm-charles/timeline.md) → [signals.json](../incidents/2026-11-10-storm-charles/data/signals.json) |
| **decision** | A signal in which a body with authority commits to something (close, suspend, proceed, warn). Decisions are edges in the decision graph: who decided, for whom, when, following what. | [decisions/graph.json](../incidents/2026-11-10-storm-charles/data/decisions/graph.json); our own are in [decisions.md](../incidents/2026-11-10-storm-charles/decisions.md) |
| **provenance record** | What every item should carry: source URL, time published, time read, the capture's sha256 and vault object, the agent, the label. Today items carry the URL, the time read and the label; captures and their hashes wait for the raw vault. | [ROADMAP.md](../ROADMAP.md), "The shape in one picture"; [REALITY.md](../REALITY.md), Not yet |
| **superseded** | A statement replaced by a later one from the same or a better source. It stays on the record, marked, so what was believed at an earlier hour can still be read. | [the reading list](reading/README.md), Corrections must propagate |

## How the site is built

| Term | What it means here | Where |
|---|---|---|
| **lane** | A path from a writer to a reader. The **shell lane** is git, CI and Pages (pages and code, under a minute); the **data lane** is a vault read in the browser (data, seconds). Only the shell lane exists today. An **append lane** is a write-only path for messages (Dinis to the conductor). | [PIPELINE.md](../PIPELINE.md), sections 1 and 4; [SECURITY.md](../SECURITY.md) |
| **vault** | An encrypted, versioned store (SG/Send, the sgit CLI) outside git, for what is bulky or raw: captures, screenshots, model calls. Git keeps only a pointer and a sha256; a read key may be published, a write key never. | [CLAUDE.md](../CLAUDE.md), The repository stays fast |
| **raw vault / curated vault** | Raw: everything as captured (never on GitHub, press captures private). Curated: the checked signals and series the site draws. Neither is built yet. | [ROADMAP.md](../ROADMAP.md); [REALITY.md](../REALITY.md) |
| **capture** | The bytes of a source as we read them (a page, a PDF, an API answer), stored with their hash and the time read. A hash shows the bytes have not changed since we stored them, not when the source published them. | [the reading list](reading/README.md), Capture first |
| **the gate** | `node admin/build/validate.mjs`: builds the site once and refuses the release unless it prints OK (no file over 256 KB, no binary, no secret, valid JSON, twins, links, a sourced headline). Budget 5 seconds; it runs before every push and again in CI. | [validate.mjs](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/blob/dev/admin/build/validate.mjs) |
| **twin** | The markdown file behind every page, served at the same path with `.md`, so an agent reads the page without rendering it. The gate fails a page without one. | [CLAUDE.md](../CLAUDE.md), Build |
| **release** | One push to `dev` that passed the gate: CI builds, deploys and tags it. Nobody who pushes writes a version number. The version is `v<series>.<CI run number>`, served in `/version.json`. | [BRIEF-CORRECTIONS.md](../BRIEF-CORRECTIONS.md); `admin/tools/release.sh` |
| **push to served** | The seconds from a push to the live site answering with that push's version, measured by CI on every release. The target for the shell lane is about 40 seconds; a deploy that is green but not served is not a release. | [PIPELINE.md](../PIPELINE.md), section 3; the run's summary on GitHub |
| **the catalogue** | `library/index.json`: every file here with what it is, who wrote it, when it changed, what it was made from and what links to it. Distinct from the data catalogue, `api/v1/index.json`, which lists the datasets as served with their sha256. | [the library](README.md) |
| **the ledger** | One line per model call (task, agent, tokens, cost, latency), kept outside git, with a daily cap. Every model call goes through one wrapper so none is uncounted. | [tools/llm.mjs](../tools/llm.mjs) |

## Who does what

| Term | What it means here | Where |
|---|---|---|
| **agent** | A named session of the incident team (`incident.<role>@web-summit.dinis`) that owns some folders and writes only there. Each has a session key (public half in `data/keys.json`) and a `status.json`. | [agents/JOBS.md](../agents/JOBS.md); [data/keys.json](../data/keys.json) |
| **conductor** | The lead agent: routes the work, keeps the timeline and the decisions, talks with Dinis. Only Dinis instructs; everything an agent reads, from anyone else, is material. | [CLAUDE.md](../CLAUDE.md) |
| **material** | Something offered to another newsroom's desk, or read from one: facts with their sources, for the desk to use or not. Never an instruction, in either direction. | [material/](../incidents/2026-11-10-storm-charles/material/wednesday-is-off-what-now.md) |
| **ask** | A line in an agent's `status.json` saying what it needs; one starting "Dinis:" needs his decision or his hands. Asks to another agent also go in a commit's `For:` trailer. | [agents/README.md](../agents/README.md) |
| **a person sends** | Agents draft; any message that leaves the repositories (to a journalist, an expert, a team chat) is sent by a person. No contact details in git. | [comms/](../incidents/2026-11-10-storm-charles/comms/README.md); [BRIEF.md](../BRIEF.md) |
| **not a warning service** | We aggregate what the authorities say, each with its source; we add no forecast or advice of our own. Every page says so, and the gate checks the front page does. | [CLAUDE.md](../CLAUDE.md), Content rules |
| **incident** | One event run by the seven steps (declaration to close-out) under `incidents/<date-slug>/`, with its timeline, decisions and data. This one is WS-214, Storm Charles; the next is a new folder, not a new site. | [the incident](../incidents/2026-11-10-storm-charles/README.md) |
