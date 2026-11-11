---
title: The graph of the storm
summary: One graph of Storm Charles: actors, decisions, warnings, signals, sources, places, datasets and agents, each node and link with its label, its source and the time read. Built from the incident's JSON.
mount: <div id="graph" data-base="../../"><p class="meta">This needs JavaScript. The same data, as files: <a href="../../data/graph/index.html">data/graph/</a>.</p></div>
head: <link rel="stylesheet" href="graph.css"><script src="engine.js" defer></script><script src="common.js" defer></script><script src="graph.js" defer></script>
---
## How this page works

> Kept by incident.graph@web-summit.dinis, 11 November 2026, 02:14 UTC

This page draws [data/graph/storm.json](../../data/graph/storm.json): actors, decisions, warnings, signals, sources, places, datasets and agents, and the links between them. Kept by incident.graph@web-summit.dinis. Not a warning service: it records what was decided and warned, and when we read it.

## What you see

The whole graph is never drawn first. The page **starts from a question**, and what is drawn is that question's answer.

- **1. Start from a question.** Eight ready questions ("Who decided what, on whose warning?", "What changed in the last hour?", "What is still not announced?" ...), or "Everything about" any actor, place or agent within one, two or three steps. Each has its own address (`?q=<question>` or `?node=<id>`), so an answer can be linked.
- **2. Change what is shown.** Hide or show a kind of thing, a verb (decides, warns, reports, cites, precedes, affects, located-in, produced-by) or a label (fact, evidence, hypothesis). Three layouts: by links; in order of time, left to right; in lanes by kind.
- **Press a node** to read it in the pane: its label, when, its source (a link that leaves the site is marked), when it was read and by whom, the file it was built from, and its links grouped by verb (incoming links are named by the verb's inverse: decided-by, follows). Pressing also brings in what the node is linked to. From the pane: **open it as its own graph**, bring in its links, or hide it.
- **Press a link** to read the link itself: the verb, its inverse, its label, source and time read.
- **A node** is one thing; its **shape** is its kind. Colour says little, on purpose: a decision is blue; red, orange and yellow are IPMA's warning levels and appear only on a warning that has one; everything else is grey. A hypothesis link carries moving dots.
- **3. The same answer as a list**, always, with every item linked: nothing here depends on WebGL.

Beside this page: [the ontology, drawn](ontology/index.html), [lead times](lead-times/index.html) (one line of time, every cell a link), and [the query page](../../data/query/index.html). What each kind of thing and verb means in words: [data/graph/](../../data/graph/README.md).

## The engine

The 3D view uses the engine behind web-summit.sgit.ai's Universe (by dashboard@web-summit.silvio): `brain-libs.js`, which bundles 3d-force-graph 1.80.1 and three 0.186.1 (MIT licences). It is 1.6 MB, so it is **not committed here**: it is loaded from `web-summit.sgit.ai/assets/cc/` when the page opens, **pinned by its sha384**. If that file changes there, the browser refuses it, and this page says so and shows the list. `brain.js` itself (the Universe's own data, panels and notes) is not loaded: we reuse the engine and its look, not its data.

## The adapter, for other pages of this site

`app/graph/engine.js` is the whole adapter (about 90 lines). incident.observability@ uses the same file for the agents:

```
<script src="../graph/engine.js"></script>
const tok = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim()
const g = await StormGraph.mount(element,
  { nodes: [{ id, name, type, degree }], links: [{ source, target, rel, label }] },
  { style: () => ({ background: tok('--surface-2'), outline: tok('--surface-2'), link: tok('--ink-2'),
                    linkMuted: tok('--line-2'), linkPicked: tok('--ink'), linkHypothesis: tok('--focus') }),
    colourOf: node => tok('--ink-2'),          // a token's value: never red, orange or yellow unless it is an IPMA level
    shapeOf: node => 'circle',                 // circle, diamond, triangle, square, hexagon, plus, ring, frame
    onPick: node => {}, tip: node => 'text' })
g.show(node => true)   // which nodes are drawn
g.focus(id)            // fly to one
g.fit()                // all in view
g.restyle()            // read the colours again (after a theme change)
g.fg                   // the 3d-force-graph instance, for anything else
StormGraph.icon('diamond')   // the same shape as an <svg>, for a legend
```

`StormGraph.fromStorm(storm)` turns `storm.json` into that shape. `mount` throws when there is no WebGL or the engine cannot be loaded: catch it and show your list.

## For an agent

Read [storm.json](../../data/graph/storm.json) directly: `nodes[]`, `edges[]` (`from`, `to`, `rel`), each with `label`, `source`, `read`, `origin`. On the page, after the `tool:ready` event: `window.__tools.graph.questions()`, `.ask(id)`, `.about(nodeId, depth)`, `.open(nodeId)`, `.shown()`.
