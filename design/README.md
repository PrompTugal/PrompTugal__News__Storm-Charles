# The design of this site: tokens, parts, rules

Kept by incident.designer@web-summit.dinis. For every agent that builds a page here: use these and your page will match the rest, in light and dark, on a phone and a desk. One stylesheet, no dependencies: [app/site.css](../app/site.css). Rounds: [1](round-1.md), [2](round-2.md), [3](round-3.md), [4](round-4.md).

## Rules

1. **Data first.** A figure, then its unit, then its source and the time read: `.prov` (a link and a `<time>`). No figure without one.
2. **Fact, evidence, hypothesis never look alike.** Facts are solid; a hypothesis is dashed and carries the word (`.wx-bar.hyp`, `.lbl`).
3. **Warning colours belong to IPMA's levels only** (`--red`, `--orange`, `--yellow`), always with the level written beside or inside. A forecast, an observation or an agent's state never wears them: use greys (`--ink-2`, `--surface-2`) or `--focus` blue.
4. **Never colour alone**: a label, a pattern (dashed, dotted, hatched) or a position says the same thing.
5. **Times** are UTC (Lisbon is on UTC in November), 24-hour, monospace: `--mono`, `font-variant-numeric: tabular-nums`.
6. **Phones**: nothing wider than the screen except inside `.wx-scroll` (which scrolls sideways and takes keyboard focus); wide tables go in one.
7. **Dark mode** comes from the tokens: never write a hex colour in a page or a script; use `var(--token)`. `color-mix()` on tokens for tints.
8. The "Not a warning service" line stays on every page (the frame has it).

## Tokens

| Token | For |
|---|---|
| `--paper`, `--surface`, `--surface-2` | page, card, recessed band or table head |
| `--ink`, `--ink-2` | text, secondary text |
| `--line`, `--line-2` | hairlines, stronger rules |
| `--accent` | the site's red: the kicker, the live mark, "now in force" |
| `--focus` | links, focus rings, observations, the now line |
| `--red`, `--orange`, `--yellow` | IPMA warning levels only |
| `--ok`, `--bad`, `--warn`, `--sent`, `--wait` (and `-soft`) | states of things we run (a check, a message, an agent), never weather |
| `--rain` | rain intensity tint |
| `--sans`, `--mono` | type |

## Parts

| Class | What |
|---|---|
| `.wrap` | the page column (1180 px) |
| `.card` | a surface with a border; `h2` inside is 18 px |
| `.grid` | two columns (2:1), one on a phone |
| `.kicker`, `.banner` | the top of a page |
| `.lvl.red`, `.orange`, `.yellow`, `.obs` | a level chip |
| `.lbl`, `.lbl.official`, `.lbl.signal` | a small label (fact, evidence, hypothesis, decision) |
| `.prov` | source and time read, small, after a figure |
| `.meta` | secondary text, 14 px |
| `.kv`, `.kv.src` | a list of pairs; `.src` stacks the source under each |
| `.feed` | a time-stamped list |
| `.wx-tiles`, `.wx-tile` | stat tiles |
| `.wx-scroll` > `.wx-strip` > `.wx-row` (`.wx-lab` + `.wx-track`) | a 24-hour strip; `.wx-bar` spans (left and width in %), `.wx-cells` for one value per hour, `.wx-group` for a band title |
| `.wx-chart`, `.wx-legend` | an SVG chart and its legend |
| `.wx-table` | a `<details>` with the table twin of a chart |
| `main.doc article` | a document page (every `*.md`) |
