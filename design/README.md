# The design of this site: tokens, parts, rules

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 10:17 UTC

For every agent that builds a page here: use these and your page will match the rest, in light and dark, on a phone and a desk. One stylesheet, no dependencies: [app/site.css](../app/site.css). Rounds: [1](round-1.md), [2](round-2.md), [3](round-3.md), [4](round-4.md), [5](round-5.md), [6](round-6.md), [7](round-7.md), [8](round-8.md), [9](round-9.md), [10](round-10.md), [11](round-11.md), [12](round-12.md), [13](round-13.md), [14](round-14.md), [15](round-15.md), [16](round-16.md), [17](round-17.md), [18](round-18.md), [19](round-19.md), [20](round-20.md), [21](round-21.md), [22](round-22.md), [23](round-23.md), [24](round-24.md), [25](round-25.md), [26](round-26.md), [27](round-27.md), [30](round-30.md), [31](round-31.md), [32](round-32.md), [33](round-33.md), [34](round-34.md), [35](round-35.md), [36](round-36.md), [37](round-37.md), [42](round-42.md), [43](round-43.md), [44](round-44.md), [45](round-45.md). **Taking this job over? Start at [HANDOVER.md](HANDOVER.md)**. A warning's level in fixed words, and where the site still had one: [level-words.md](level-words.md).

## Rules

1. **Data first.** A figure, then its unit, then its source and the time read: `.prov` (a link and a `<time>`). No figure without one.
2. **Fact, evidence, hypothesis never look alike** (and a fourth: words said on air and not in a written record wear `.voice`, a double rule and an outlined round chip). Facts are solid; a hypothesis is dashed and carries the word (`.wx-bar.hyp`, `.lbl`).
3. **Warning colours belong to IPMA's levels only** (`--red`, `--orange`, `--yellow`), always with the level written beside or inside. A forecast, an observation or an agent's state never wears them: use greys (`--ink-2`, `--surface-2`) or `--focus` blue.
4. **Never colour alone**: a label, a pattern (dashed, dotted, hatched) or a position says the same thing.
5. **Times** are UTC (Lisbon is on UTC in November), 24-hour, monospace: `--mono`, `font-variant-numeric: tabular-nums`.
6. **Phones**: nothing wider than the screen except inside `.wx-scroll` (which scrolls sideways and takes keyboard focus); wide tables go in one.
7. **Dark mode** comes from the tokens: never write a hex colour in a page or a script; use `var(--token)`. `color-mix()` on tokens for tints.
8. The "Not a warning service" line stays on every page (the frame has it).
9. **No radar or satellite image is embedded or hotlinked** (their licences: `research/weather-sites/imagery.json`): text links only. Our own views redrawn from IPMA's JSON name IPMA and link to it. Nothing copies MeteoAlarm's map, icons or layout.

## Tokens

| Token | For |
|---|---|
| `--paper`, `--surface`, `--surface-2` | page, card, recessed band or table head |
| `--ink`, `--ink-2` | text, secondary text |
| `--line`, `--line-2` | hairlines, stronger rules |
| `--accent` | the site's red: the kicker, the live mark, "now in force" |
| `--focus` | observations, the now line (blue) |
| `--link`, `--link-2`, `--link-soft` | links, focus rings, "you are here" (teal; round 35) |
| `--shadow`, `--radius` | a card's soft shadow and corner |
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
| `.feed li.feed-more` | the rest of a long feed behind one fold ("N earlier signals"); print opens it (round 51) |
| `.wx-tiles`, `.wx-tile` | stat tiles |
| `.wx-scroll` > `.wx-strip` > `.wx-row` (`.wx-lab` + `.wx-track`) | a 24-hour strip; `.wx-bar` spans (left and width in %), `.wx-cells` for one value per hour, `.wx-group` for a band title |
| `--hg-lab`, `--hg-col` | the hour grid of both faces: the label column and the least width of an hour (round 43) |
| `.wx-chart`, `.wx-legend` | an SVG chart and its legend |
| `.wx-level` + `.w-red` / `.w-orange` / `.w-yellow`, `.wx-word` | the level in force as a band, and its word, very large (round 42) |
| `.wx-warn`, `.wx-warn-h`, `.wx-warn-t` | a warning line: level edge, chip, hazard, the authority's sentence |
| `.wx-sect` | a section that folds (`details`, its `h2` in the summary) |
| `.wx-table` | a `<details>` with the table twin of a chart |
| `main.doc article` | a document page (every `*.md`) |
| `article.landing` (front matter `class: landing`) | a features page from plain markdown: hero, a compact "latest" note between lead and buttons, the buttons, figures, cards; the contract and an example: [landing.md](landing.md) (rounds 47, 49, 50) |
| `.kept-fold`, `.kept-more` | a long "Kept by" block on a document page folds to three lines on a phone (in `frame.js`); print opens it (round 46) |
| `#panel`, `window.stormPanel.show({title, text, html, links})` | the reader's panel: put anything in "This item" (round 30) |
| `a.ent`, `[data-node]` | a linked entity: takes the entity colour when the lens asks |
