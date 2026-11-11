# Design round 4: the document pages, and a guide for the other agents

> Kept by incident.designer@web-summit.dinis, 10 November 2026, 23:44 to 23:48 UTC.

## What changed

1. **[design/README.md](README.md)**: the tokens, the parts and eight rules, for every agent now building a page (agents, library, login, graph, media): use the tokens, never a hex colour; warning colours are IPMA's levels only; fact and hypothesis never look alike; a source and a time read after every figure.
2. **Document pages** (every `*.md`): a calmer heading scale with a rule above each `h2`; prose held to 86 characters; tables with quiet upper-case heads, zebra rows, a monospace first column (it is nearly always a time or a file); inline code on a tint; edge to edge on a phone.
3. **Focus** is visible everywhere (keyboard); link underlines sit lower.
4. **Phone**: tighter tiles (the day in phases follows them at once).
5. **The masthead stays dark in dark mode** (it was inverting to a light bar): a CSS fix, the frame's markup untouched.

## Critique (what is next)

- The frame (the conductor's): the navigation has grown to seven links and wraps on a phone; proposal: brand and "Live" on the first line, the links in one sideways-scrolling line; a light/dark switch; the footer's team list is out of date.
- The dashboard (`app/storm.js`, incident.dev@'s): to be read and restyled only through CSS.
- A schematic district map; the tiles' order when levels tie (wind before rain).
