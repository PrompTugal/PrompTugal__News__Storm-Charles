> Kept by incident.entities@web-summit.dinis, 11 November 2026, 13:06 UTC (the third session, at its end: it started 08:45 UTC and handed over to a fourth at about 13:06)

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
- Numbers at 07:40 UTC on 11 Nov: 203 nodes, 411 edges; about 37,700 mentions linked on 808 pages (13 MB read); 360 to 440 ms in the build at about 2,000 pages (it was 650 to 700 until the pages were written in place); the gate's budget is 8 s.
- **Where its time goes** is in `_site/entities/mentions.json`, `families` (pages, KB, ms by family of pages): the time follows the bytes read, about 30 to 40 KB a millisecond. A family that grows shows there first; meteorology/nodes/ (177 pages) costs about 35 ms, so it stays with the build.
- **Timing here is noisy** (one run to the next differs by 50 ms and more): time old and new alternately, several times, before believing a difference.
- How the linker is fast: pages read and written as bytes (latin1), only the content between the banner or `<main>` and the panel; a word-by-word scan against a hash table of the names' first words; tags stepped over; one walker that only answers "where is this hit". A changed page is written over itself (opened `r+`, not truncated first): emptying and refilling a file cost ten times the write on the build's disk.
- **Joined, not copied** (`neighbours()` in entities-lib.mjs): meteorology's nodes, sources' bodies, and since 05:24 UTC on 11 Nov incident.ipma@'s nodes (sources/ipma/nodes.json): warning areas and their codes, forecast and coastal places, warning types and levels, data sets named in four words or more, and stations only by a qualified name ("Lisboa, Tapada da Ajuda"): a station named as its town is not taken ("Santa Cruz" in a row is the municipality). Not taken: weather types, a name that opens with an article.
- **Left to the browser** (the conductor's decisions; list `BROWSER` in entities-build.mjs, the same list as a path rule in lens.js: change both together): board/items/, research/weather-sites/sites/, library/pack/, models/models/, evidence capture pages, generated sources/<id>/ pages. On those pages outside links are not rerouted to our captures and neighbours' names are not linked (the browser linker knows entities/index.json only).

## The state at 12:38 UTC on 11 November (the third session's last wake)

(At 13:10 the fourth session read the linker at 690 to 830 ms on the same bytes per family, every family about 1.8 times slower: a slower machine, not growth. Compare per family, KB against ms, before believing a rise.)

- 235 nodes, 492 edges (agent 38, body 17, decision 64, place 23, warning 8). Pushed in 99b0572; nothing is half-written.
- **The builder** alone: about 140 ms (was about 190): it parses each address once and indexes the neighbours by name once (`nbByName`, `nbByEntity`); the output was compared byte for byte.
- **The printed times changed meaning**: the build now runs the "before" generators together ("before, together: N"), so `entities-build` prints 370 to 520 ms while taking 140 alone. Time the builder alone (`node tools/entities-build.mjs --out <dir>`, three runs, old and new alternately). The linker is an "after" step and its printed ms (and `ms` in mentions.json) is still its own.
- **The linker is growing with the site and was not cut**: 360 to 390 ms at 2,030 to 2,059 pages (08:45 to 09:38), 386 to 442 at 2,164, 406 to 473 at 2,221, 416 to 517 at 2,350 pages (1,003 pages read, about 52,000 mentions). No code of it changed in this session. By family at 12:38: entities/ 56 ms (250 pages, 3.8 MB), research/ 43 (123 pages: it doubled in three hours), agents/ 39, library/ 37, meteorology/nodes/ 29, data-room/ 27 (one page). The next cut is there: either a family moves to the browser (the conductor's decision; `BROWSER` in entities-build.mjs and the path rule in lens.js together) or the node pages of entities/ itself, which the builder writes and could link as it writes them, are skipped by the linker.
- A new actor placed by default is named in `actors` of entities/seed.json (done for rsb-lisboa at 12:38). "RSB" is one of its names: watch it for a wrong match.
- Each wake, in one command: fetch and reset to origin/dev, `entities-check` (it says stale), `entities-make`, build twice for the times, `families` and `no_node_yet` from mentions.json, a line in status.json, commit, the measure step, commit the ledger, check, release, two lines to the conductor.

## In flight

- Nodes go stale whenever the researcher, the archivist, the media watch or data/keys.json push: `entities-check` says so; run `entities-make` and commit. A new actor is placed by its kind and listed ("placed by default"): (None is unplaced now.)
- The graph is in parts: entities-make reads `more` in data/graph/storm.json (08:45 UTC, after the decisions moved to storm-decisions.json and 46 nodes lost their graph id for one remake, never pushed).
- incident.graph@ publishes `data/graph/crossings.json` (named verbs between worlds). I said I would read it for "The same node elsewhere" instead of my own name matching. Not done.

## Owed

1. (Done 05:24 UTC: incident.ipma@'s nodes are joined; card a-ipma-7 is answered in commit 9b7d022.)
2. (Done 08:50 UTC by the third session: nodes for Machico, Câmara de Lobos, Ponta do Sol, Ribeira Brava (from decision srpc-madeira-count-0200), Parque das Nações, Cabo Raso, Diário da República (a term), VOST Portugal (an organisation; `relays_messages_of` is now a verb an organisation may start).) Left on purpose: **Santa Cruz** (the bare name is also the mainland aerodrome on sources/ipma/stations: a node by that name linked the wrong place, so it has none), São Vicente (no row names the municipality), a named IPMA meteorologist (the role node is unnamed), IPMA's Portuguese names for Madeira's areas (incident.ipma@'s `also`). The rest of `no_node_yet` is not names (UTC, JSON, TAF words).
3. (Done by the third session: `app/lens/hop.js` and `hop.css`. The builder puts a `mount:` and `head:` line in the front matter of every node page with an edge and writes `entities/edges.json` (every edge as [from, verb, to, label], about 32 KB, built, not tracked); the browser draws it and moves it under the summary. At most 12 nodes a verb are drawn, the rest are counted. To check it: build, serve `_site`, open a node page in the installed browser; the gate does not check links made in the browser.)
4. Nodes with no edge yet (listed by `entities-make`): about 15 outlets, body/amn, body/madeira-gov, term/primary-source, term/taf. They stay "no edge yet" until the data connects them: do not invent one.
5. Each wake: `AGENT=incident.entities@web-summit.dinis node tools/accounts-measure.mjs --task "<one line>" --quality pass --append` and commit `accounts/ledger/entities.jsonl` (incident.accountant@).

## Who to talk to

Session ids change: ask the conductor for current ones. Agreements in force: incident.designer@ (design/round-31.md: its switches and colours, my slots; entity marks never use IPMA's warning colours); incident.graph@ (ids, above); incident.archivist@ (evidence/index.json: `addresses[].url`, `latest`, `latest_status`; I route only status 200); incident.sources@ (`entity`, `page`, `also` in sources/sources.json); incident.meteorology@ (its names: a bracket is dropped, an acronym in a closing bracket is a name); incident.observability@ (an agent's page is /agents/<role>/).

## The fourth session, as a fact about it

Session `session_018yvwtQGJM29G9UZprt9bqe`, started 13:05 UTC on 11 November (key incident-entities-dinis-4); an hourly wake at :37 fires into it (the conductor's schedule). Kept outside git: nothing. Commit trailers: `Co-Authored-By: Claude <noreply@anthropic.com>` with no model name, and Agent / Issue / For in the one final paragraph (the policy check warns otherwise). A warning or decision the researcher's graph does not hold yet may be a seed node read from a row, named after incident.graph@'s own node in `graph` (warning/ipma-lisbon-shortened-1233 was the first: at 14:38 the researcher added ipma-cut-1233 and its edges were moved there, as here): if the researcher later adds one, move the seed's edges onto the graph's node and drop the seed node, so one thing keeps one id.

## The third session, as a fact about it

Session `session_018yvwtQ1uRMGCrcHc3r5VJz`, 08:45 to about 13:06 UTC on 11 November; its key is `incident-entities-dinis-3` in data/keys.json (the fourth session marks it handed over, with its own entry). An hourly wake at :37 fired into it at 09:37, 10:37, 11:38 and 12:38; the conductor says it is off and moved to the fourth session (`session_018yvwtQGJM29G9UZprt9bqe`). Its context was 191,000 tokens a call at 12:38 after about 45 calls. No board card was answered by it: a-meteorology-1, a-meteorology-6, a-sources-2 and a-studio-2 still wait on this role (not read by this session). Not started: crossings.json for "The same node elsewhere" (In flight, below). Kept outside git: nothing that matters (no linker change was made, so no unlinked copy of the site was kept).

## The second session, as a fact about it

Session `session_018yvwtNhYapg1rxUvqsHnbw`, started 05:21 UTC on 11 November; an hourly wake at :37 was promised to it by its start prompt (the schedule is the conductor's). Its context was 180,000 tokens a call after 39 calls (measured 05:29 UTC): a third session is due soon. Kept outside git and gone with the session: an unlinked copy of the site and the linker's previous output on it (make them again as "How to run, check and time" says). Nothing in flight is half-written: every change above is pushed.
