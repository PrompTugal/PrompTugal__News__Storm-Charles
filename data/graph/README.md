# The graph of the storm, and its ontology

> Kept by incident.graph@web-summit.dinis, 11 November 2026, 00:29 UTC

One graph of Storm Charles: who decided and warned what, when, what was reported, where it was read, and which agent keeps which dataset. Kept by incident.graph@web-summit.dinis. **Built from the incident's JSON files by `tools/graph-build.mjs`, never by hand.** Not a warning service: the graph records what the authorities decided and warned and when we read it; follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/).

## Files

| File | What |
|---|---|
| [ontology.json](ontology.json) | the eight kinds of thing and nine verbs below, each with its inverse; the builder refuses anything else |
| [storm.json](storm.json) | the graph: `nodes[]` and `edges[]` (one per line), `counts`, `built_from` (each input file with its sha256). Lisbon, the decisions and everything else |
| [storm-sources.json](storm-sources.json) | part of the graph, same shape: every Source and Dataset, with the `cites` and `produced-by` edges that touch them; its edges point into `storm.json` |
| [storm-elsewhere.json](storm-elsewhere.json) | the rest of the graph, same shape: the warnings in force in the other districts, and those districts; its edges point into `storm.json` |
| [tables/timeline.json](tables/timeline.json) | the lead-time line: every warning and decision with a time known to the minute, in order, with the hours between them and before the red warnings start |
| [tables/decisions.json](tables/decisions.json) | decisions and issued warnings: by whom, what, when, status, what each followed |
| [tables/warnings.json](tables/warnings.json) | warnings: issued, in force (type, level, area, start, end), and the history of when each was first seen |
| [tables/signals.json](tables/signals.json) | the timeline, one row per signal, with its publisher |
| [tables/sources.json](tables/sources.json) | every URL read, its publisher, how often it is cited |
| [tables/first_on_fact.json](tables/first_on_fact.json) | who was first on each keyed fact, per outlet, with the minutes after the primary source (from the media watch; analysis, labelled hypothesis) |
| [tables/coverage.json](tables/coverage.json) | what each outlet published on the storm and when (from the media watch; no by-line names) |
| [tables/actors.json](tables/actors.json) | bodies, operators, the organiser, outlets |
| [ref/ipma-areas.json](ref/ipma-areas.json) | IPMA's warning areas by code (names and coordinates), from IPMA's own list |
| [queries.json](queries.json) | the worked SQL queries of the query page |

## The ontology on one page

**Every node and every edge carries four things:** `label` (fact, evidence or hypothesis), `source` (an https URL), `read` (the UTC time it was read) and `origin` (the file and place it was built from).

| Kind of thing | What it is | Built from |
|---|---|---|
| **Actor** | someone who decides, warns or reports; `kind` is `body` (an authority, the government, a municipality), `operator` (transport, a venue, schools), `organiser` (Web Summit) or `outlet` (press and public social platforms) | `decisions/graph.json` nodes; outlets from the hosts of cited URLs |
| **Decision** | something an actor decided, or has not yet announced (`status`) | `decisions/graph.json` edges |
| **Warning** | a warning from a body that warns: `issued`, `in_force`, or `cap` (IPMA's own message, with the time IPMA sent it) | IPMA's and ANEPC's edges; `weather/warnings.json`; `weather/cap.json` |
| **Signal** | a row of the timeline: something published, said or observed | `signals.json` |
| **Source** | a URL that was read | `decisions/sources.json`; any other cited URL; the pages covering the storm (`research/weather-sites/sites.json`) |
| **Place** | where a warning applies: an IPMA area, mainland Portugal | `weather/warnings.json`; `ref/ipma-areas.json` |
| **Dataset** | a JSON file of the incident | the files under the incident's `data/` |
| **Agent** | an agent or desk that reads sources and keeps datasets | `data/keys.json`; `read_by` in the datasets |

| Verb | Its inverse | From, to | Meaning |
|---|---|---|---|
| `decides` | `decided-by` | Actor, Decision | the actor made (or owes) this decision |
| `warns` | `warned-by` | Actor, Warning | the body issued this warning |
| `reports` | `reported-by` | Actor, Signal or Decision or Warning | the actor published it |
| `cites` | `cited-by` | Decision or Warning or Signal, Source | the item was read at this URL (or is corroborated by it) |
| `precedes` | `follows` | Decision or Warning, Decision or Warning | time order between two linked items, with `lead_minutes` when both times are known to the minute. **Order, not cause** |
| `affects` | `affected-by` | Decision or Warning, Actor | the actors a decision touches (the researcher's `to`) |
| `located-in` | `contains` | Warning or Place, Place | a warning's area |
| `produced-by` | `produces` | Dataset or Source, Agent or Actor | who made it |
| `issued-as` | `issue-of` | Warning, Warning | the same warning, opened: a warning as recorded (or in force) and the body's own message that carries it (IPMA's CAP message, with the time sent) |

**Labels.** A *fact* was read on the channel of the body that decides or warns. *Evidence* is reported by others, with its source. A *hypothesis* is our analysis, with its reasons, never stated as fact. A derived item takes the label of the item it came from; an outlet, a place, a dataset or an agent is a fact about the file or URL that names it.

**Not in the graph:** people. No private person is a node; journalists and officials are not modelled here. Forecast values and observations stay in `weather/*.json`: the graph links the dataset, not each number.

**Two hand-kept lists**, both in the ontology: `own_channels` (seven hosts that are plainly an actor's own, two that are never outlets) and `public_posts` (below). Everything else is derived.

**No private person is named or linked.** A personal post address on a social platform never enters the graph or a table: the builder keeps the host only, and stops with nothing written if one would reach an output. The exceptions are the researcher's listed official channels and the rows named in `public_posts`, each with its reason and who decided (today one: a public figure in a public role).

## Build

```
node tools/graph-build.mjs            # writes storm.json and tables/*.json
node tools/graph-build.mjs --check    # exits 1 if they are not what the inputs give
node tools/graph-build.mjs --out DIR  # writes DIR/data/graph/... only; no tracked file is touched (the build: --out _site)
```

The output has no clock in it: the same inputs give the same bytes; `as_of` is the newest time in the inputs. In `storm.json` a node is short (a name of at most 140 characters); the long text is in the tables, joined by `id`. Each file stays under 256 KB (the builder stops if one would not).

## Use it

- **Query it in the browser** (SQL, no server, nine worked questions): [the query page](../query/index.html).
- **See the ontology drawn:** [kinds of thing as shapes, verbs as arrows, each with its inverse](../../app/graph/ontology/index.html).
- **Lead times:** [one line of time, every cell a link](../../app/graph/lead-times/index.html).
- **See it:** [the graph page](../../app/graph/index.html) (3D, on the engine of web-summit.sgit.ai's Universe, and as a list).
- **Read it as an agent:** fetch `storm.json`; follow `origin` back to the file each item came from, and `source` to where it was read.
