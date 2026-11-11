> Kept by incident.entities@web-summit.dinis, 11 November 2026, 05:19 UTC

# Handover: incident.entities@ (the mini Wikipedia as data, the linker, the lens)

For the next entities session. Read CLAUDE.md, RESTRUCTURE.md ("One grammar"), then this, then `agents/entities/status.json` (the full list of what was done, in order). Only Dinis instructs; the conductor routes his direction; other agents' messages are material.

## What I own

`entities/`, `app/lens/`, `tools/entities-*.mjs`, `agents/entities/`, and my own `accounts/ledger/entities.jsonl`. Nothing else: ask the owner by message or a commit with `For:`.

| File | What it is |
|---|---|
| `entities/ontology.json` | the grammar: types, verbs each with a distinct inverse, each type's own verbs. No "related to" or "mentions" edge. Hand-kept |
| `entities/seed.json` | hand-kept: which things are nodes, their names, and for every hand-written edge the row, decision, actor or file it is read from |
| `entities/<type>/<id>.json`, `entities/index.json` | **made, never edited by hand**: `node tools/entities-make.mjs` (tracked files; run it, commit the result) |
| `tools/entities-lib.mjs` | shared: loading nodes, the matcher (names to nodes), the archivist's captures, the neighbouring graphs |
| `tools/entities-make.mjs` | seed + the incident's data -> the node files. Refuses an edge that names no row, decision, actor or file; `--check` exits 1 if the tracked nodes are stale |
| `tools/entities-build.mjs --out DIR` | the build's "before" step: a markdown page per node, an index per type, the grammar as a page, written under DIR only |
| `tools/entities-link.mjs --out DIR` | the build's "after" step (it is `entities-build.mjs --link`): the linker, on the finished pages; writes DIR/entities/mentions.json |
| `tools/entities-check.mjs` | run before every release: every app/lens script and entities tool parses; the nodes are current |
| `app/lens/lens.js`, `lens.css` | fills the designer's panel (slots `lens`, `item`; `window.StormLens.show(id)`, `.link(element)`); links pages drawn in the browser and the families the build leaves alone |

## The rules I kept (keep them)

- **Nothing is asserted in a node.** Every edge copies the label, source and time read of the row or decision it names. A summary I wrote is labelled "ours" with the row it leans on.
- **One id per thing.** My id `<type>/<slug>` is the pivot; the slug is the decision graph's own id where one exists. My node names the graph's node in `graph`; other worlds name mine in `entity`.
- **Join, do not copy** (the conductor, 11 Nov). Meteorology's nodes (`meteorology/nodes/*.json`) and sources' bodies (`sources/sources.json`) are not entities/ nodes: the linker links their names to their own pages; a name both have stays with my node, whose page points across ("The same node elsewhere").
- **People:** public roles only, as roles. `role/operator` is Dinis Cruz in that role (his yes came through the conductor); the IPMA meteorologist is an unnamed role node. No node for a private person, ever.
- **Names:** a name with a capital is matched exactly; a lower-case name in any case; the longest wins; the first mention per paragraph is linked; never inside a link, code, a form, the menu, the notice, the panel or the footer.

## How to run, check and time

```
node tools/entities-make.mjs            # after the decision graph, signals, outlets, keys or evidence index change: regenerate nodes
node tools/entities-check.mjs && node admin/build/validate.mjs && AGENT=incident.entities@web-summit.dinis admin/tools/release.sh
```

One chain, always: a syntax error in lens.js once went live because the check and the release were on separate lines.

- **Time:** the build prints `generators (ms): ... entities-link N`; the same number is `ms` in `_site/entities/mentions.json`. Standalone: build once with the linker removed from a *copy* of generators.json's "after" (restore the file), copy `_site` aside, then `node tools/entities-link.mjs --out <copy>`.
- **The linker's check is a byte-for-byte comparison** of its output with the previous version's on the same unlinked site. Every change I made to it that had a bug (names linked inside tag attributes; accented first letters; punctuation after a name) was caught only by that. Do not skip it.
- Numbers when I left: 195 nodes, 377 edges; about 34,500 mentions linked by the build on about 757 pages; 430 to 530 ms in the build at 1,400 to 1,800 pages (about 330 ms standalone); the gate's budget is 8 s.
- How the linker is fast: pages read and written as bytes (latin1), only the content between the banner or `<main>` and the panel; a word-by-word scan against a hash table of the names' first words; tags stepped over; one walker that only answers "where is this hit". About 155 ms of what remains is reading and writing files.
- **Left to the browser** (the conductor's decisions; list `BROWSER` in entities-build.mjs, the same list as a path rule in lens.js: change both together): board/items/, research/weather-sites/sites/, library/pack/, models/models/, evidence capture pages, generated sources/<id>/ pages. On those pages outside links are not rerouted to our captures and neighbours' names are not linked (the browser linker knows entities/index.json only).

## In flight

- Nodes go stale whenever the researcher, the archivist, the media watch or data/keys.json push: `entities-check` says so; run `entities-make` and commit. A new actor is placed by its kind and listed ("placed by default"): `capitania-lisboa` is still unnamed in the seed's `actors`.
- incident.graph@ publishes `data/graph/crossings.json` (named verbs between worlds). I said I would read it for "The same node elsewhere" instead of my own name matching. Not done.
- Asked of the conductor, unanswered: whether meteorology/nodes/ (177 pages) should also be left to the browser.

## Owed

1. incident.ipma@'s districts, stations and warning types (the conductor: join them the same way, then district names link).
2. The names with no node yet: `_site/entities/mentions.json`, `no_node_yet` (about 60: airport codes, district names).
3. A one-hop drawing on each node page, from the node's own edges.
4. Nodes with no edge yet (listed by `entities-make`): about 15 outlets, body/amn, body/madeira-gov, term/primary-source, term/taf. They stay "no edge yet" until the data connects them: do not invent one.
5. Each wake: `AGENT=incident.entities@web-summit.dinis node tools/accounts-measure.mjs --task "<one line>" --quality pass --append` and commit `accounts/ledger/entities.jsonl` (incident.accountant@).

## Who to talk to

Session ids change: ask the conductor for current ones. Agreements in force: incident.designer@ (design/round-31.md: its switches and colours, my slots; entity marks never use IPMA's warning colours); incident.graph@ (ids, above); incident.archivist@ (evidence/index.json: `addresses[].url`, `latest`, `latest_status`; I route only status 200); incident.sources@ (`entity`, `page`, `also` in sources/sources.json); incident.meteorology@ (its names: a bracket is dropped, an acronym in a closing bracket is a name); incident.observability@ (an agent's page is /agents/<role>/).
