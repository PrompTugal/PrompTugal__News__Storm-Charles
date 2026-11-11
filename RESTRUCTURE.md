# The restructure: two faces, one graph, evidence in vaults

> Kept by incident.conductor@web-summit.dinis, 11 November 2026, 02:25 UTC. From Dinis's direction of ~02:10 ([BRIEF.md](BRIEF.md), last section). This is the contract between the agents; the jobs are in [agents/JOBS.md](agents/JOBS.md). Rounds, not one pass: each agent ships something small and linked within the hour, then improves.

## Read before you build

- Meaning through connectivity: https://graphs.sgit.ai/llms.txt (a node is just a node; every edge is a verb with an inverse; no generic "related to" edge; never render the whole graph, render the result of a query).
- Fractal Semantic Graphs: https://sgit.ai/demos/fractal-graphs/index.md and https://newsroom.sgit.ai/articles/introducing-fractal-semantic-graphs.html (every node opens into a graph with its own ontology; only the grammar is shared).
- The estate's guidance: https://sgit.ai/docs/guidance/llms.txt (the version in the chrome, linking to that version's details; anything rendered stays one click from its bytes; do not build what the platform has), https://sgit.ai/demos/vaults/llms.txt (worked vaults), https://newsroom.sgit.ai/llms.txt.

## The two faces

| Face | Address | What it is | Rule |
|---|---|---|---|
| **Weather** (the channel) | `/` and `weather/` | clean, professional, for anyone: Storm Charles as a weather channel would show it | reads **only** the data room's published JSON (`api/v1/...`, `entities/`, `evidence/`); fetches nothing external; states no forecast of its own |
| **Data room** | `data-room/` (today's front page) and everything under it | the evidence: timeline, decisions, weather data, signals, sources, graph, query | the only face that consumes outside sources; every item labelled, sourced, timed |

Around them, as subsites in the top menu: **Sources** (`sources/`), **Evidence** (`evidence/`), **Entities** (`entities/`), **Labs** (`labs/`: timelines, decisions, weather), **Board** (`board/`), **Studio**, **Research** (media, social, Wikipedia, weather sites), **Team** (agents, jobs, log in, contribute), **Help and what's new** (`help/`, `news/`), **About** (brief, design, LLMs).

## One grammar for every linked thing

Every thing a page can mention is a node with an address. A page links a word by pointing at a node id; the build turns it into a link to the node's page.

- **Entity** `entities/<type>/<id>.json` (owner: incident.entities@): `{id, type, name, also: [names], summary, label, edges: [{verb, to, source, read_utc}], sources: [evidence ids], by, updated}`. Types to start: body (IPMA, ANEPC, PSP, the government), organisation (Web Summit), place (Lisbon, Madeira, Vasco da Gama bridge, MEO Arena), service (Metro, CP, Rede Expressos, TAP, the port), day (`2026-11-11`), hazard (tidal flooding, high winds), term (fact, evidence, hypothesis, red warning, alert situation), outlet, agent. Verbs carry an inverse, declared in `entities/ontology.json`. Each type may have its own vocabulary: that is the point.
- **Evidence** `evidence/<source>/<yyyy>/<mm>/<dd>/<hhmm>-<slug>.json` (owner: incident.archivist@): `{id, url, host, read_utc, sha256_html, sha256_screenshot, vault: {id, path}, title, licence, by}`. The page for it shows the screenshot from the display vault, the hash, the time, earlier and later captures of the same address, and only then the link out (marked as leaving the site).
- **Source** `sources/<id>/` (owners: incident.ipma@ for `sources/ipma/`, incident.sources@ for the rest): `source.json` (who, what it publishes, endpoints, formats, licence, how we read it, how often), an API map, and its data sets.
- **Data set** in a vault, pointer in git: `latest/<file>` and `<yyyy>/<mm>/<dd>/<hh>/<file>` (plus a diff against the previous hour); git keeps `dataset.json` with the vault's read key, the paths and each file's sha256. Git's 256 KB and no-binary rules do not bend.
- **Agent provenance** (owner: incident.observability@): every `by` resolves to an agent page: its key, its sessions (id, started, by which conductor, on whose instruction), its commits. Missing links are marked "not recorded", never guessed.

**The chain a reader can always walk:** a word → its entity → the row or edge that says so → the evidence page (our capture) → the outside address. And: any file → who kept it → that agent's session and key.

## Vaults (Dinis's yes, 02:10)

Any agent may create a vault with `sgit`. Three kinds:
1. **Capture vault** (packed): every external page's HTML and response, by source and date. Not readable from the web.
2. **Display vault** (normal): the screenshots and excerpts the pages show, organised by evidence id. Its **read key** is published in `data/vaults.json`.
3. **Data vaults** (normal): the feeds' `latest/` and dated copies the site reads.

Rules: a vault key is never written in a tracked file, a commit message or a page; only read keys are published; the creating agent sends the vault key to incident.conductor@ **by session message**, once, and says so in its status file (id only). Past about 10,000 files, start a new vault. Press pages: the capture is kept privately; the site shows a screenshot only where the licence allows, otherwise the hash, the title, a short excerpt and the link.

## The reader's panel (owner: incident.designer@, with incident.entities@)

Full width on a wide screen. A right-hand panel of accordions: **Lens** (colour facts, evidence, hypotheses, entities, outside links; on or off each), **This item** (whatever was clicked: its node, edges, evidence), **Source** (the file behind the view, shown not downloaded), **Theme**, **Version** (links to that version's notes). The panel is one part every page gets from the frame.

## Order of work

1. Now: new agents start; the frame gets the menu, the width, the panel shell, the version in the chrome; the front page moves to `data-room/` and Weather takes `/`.
2. Within hours: entities for the headline and the dashboard's first screen; captures for every source the timeline cites; IPMA and MeteoAlarm maps.
3. Rounds: linking spreads page by page; labs try timelines and decision views; the best move into the faces.
