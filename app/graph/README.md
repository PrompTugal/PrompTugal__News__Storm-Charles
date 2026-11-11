---
title: The graph of the storm
summary: One graph of Storm Charles: actors, decisions, warnings, signals, sources, places, datasets and agents, each node and link with its label, its source and the time read. Built from the incident's JSON.
mount: <div id="graph" data-base="../../"><p class="meta">This needs JavaScript. The same data, as files: <a href="../../data/graph/index.html">data/graph/</a>.</p></div>
head: <link rel="stylesheet" href="graph.css"><script src="engine.js" defer></script><script src="graph.js" defer></script>
---
## How this page works

This page draws [data/graph/storm.json](../../data/graph/storm.json): actors, decisions, warnings, signals, sources, places, datasets and agents, and the links between them. Kept by incident.graph@web-summit.dinis. Not a warning service: it records what was decided and warned, and when we read it.

## What you see

- **A node** is one thing; its colour is its kind (the chips above the graph name each colour). Its size is the number of its links.
- **A link** is one relation (decides, warns, reports, cites, precedes, affects, located-in, produced-by), with an arrow. Grey is a fact, amber is evidence, violet is a hypothesis. `precedes` is time order with a lead time in minutes: **order, not cause**.
- **Press a node** to read it in the panel: its label, when, its source (a link), when it was read and by whom, the file it was built from, and its links, each of which you can follow.
- **The chips** hide and show kinds of thing and labels. A node with no link yet (a source listed but not cited) is in the list, not in the 3D view. Warnings outside Lisbon are hidden at first (48 of them); one chip shows them.
- **Lead times** is one line of time under the graph: every warning and decision with a time known to the minute, the time between each and the next, and how long before the first red warning starts in Lisbon. It is [tables/timeline.json](../../data/graph/tables/timeline.json), drawn. Order, not cause.
- **The same graph as a list** is under that, always: nothing here depends on WebGL.

What each kind of thing and relation means: [the ontology on one page](../../data/graph/README.md). Questions in SQL: [the query page](../../data/query/index.html).

## The engine

The 3D view uses the engine behind web-summit.sgit.ai's Universe (by dashboard@web-summit.silvio): `brain-libs.js`, which bundles 3d-force-graph 1.80.1 and three 0.186.1 (MIT licences). It is 1.6 MB, so it is **not committed here**: it is loaded from `web-summit.sgit.ai/assets/cc/` when the page opens, **pinned by its sha384**. If that file changes there, the browser refuses it, and this page says so and shows the list. `brain.js` itself (the Universe's own data, panels and notes) is not loaded: we reuse the engine and its look, not its data.

## The adapter, for other pages of this site

`app/graph/engine.js` is the whole adapter (about 90 lines). incident.observability@ uses the same file for the agents:

```
<script src="../graph/engine.js"></script>
const g = await StormGraph.mount(element,
  { nodes: [{ id, name, type, degree }], links: [{ source, target, rel, label }] },
  { colours: { agent: '#ee7fd6' }, onPick: node => {}, tip: node => 'text' })
g.show(node => true)   // which nodes are drawn
g.focus(id)            // fly to one
g.fit()                // all in view
g.fg                   // the 3d-force-graph instance, for anything else
```

`StormGraph.fromStorm(storm)` turns `storm.json` into that shape. `mount` throws when there is no WebGL or the engine cannot be loaded: catch it and show your list.

## For an agent

Read [storm.json](../../data/graph/storm.json) directly: `nodes[]`, `edges[]` (`from`, `to`, `rel`), each with `label`, `source`, `read`, `origin`. On the page, after the `tool:ready` event, `window.__tools.graph.focus(id)` selects a node.
