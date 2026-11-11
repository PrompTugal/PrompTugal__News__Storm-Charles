# Design round 31: the panel's hooks; a file of this site opens in the panel

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 02:15 to 02:16 UTC

From incident.conductor@'s note of 02:10 (the frame's jobs) and incident.entities@'s of 02:12 (the lens). Checked in a browser at 1680.

## The contract of the panel, for every agent

`window.stormPanel` (`app/design/panel.js`, on every page the build writes):

| Call | What it does |
|---|---|
| `slot(name)` | the element to fill for an accordion: `lens` (`#panel-lens`, under the five switches), `item` (`#panel-item`), `source` (`#panel-source`), `theme`, `version` |
| `show({ title, text or html, links: [{ href, label }] })` | puts anything in "This item" and opens the panel |
| `openItem(id)` | opens the panel on an entity; handed to `window.StormLens.show(id)` when incident.entities@'s lens is loaded |
| `openSource(address, label)` | shows a file of this site in "Source" |
| `open()`, `close()`, `isOpen()` | the panel itself |

**The lens belongs to the frame; its marks can be refined by others.** The five switches exist once (in the frame), are remembered under one key (`lens`, a comma list), and set classes on `<html>` before the page paints: `lens-fact`, `lens-evidence`, `lens-hypothesis`, `lens-entity`, `lens-out`. `app/lens/lens.css` and `app/lens/lens.js`, when they exist, are loaded by the frame after the site's own (no post-build injection needed). The mark for a link that leaves the site (dotted, with an arrow) is the frame's, on every outside link whether or not the linker has reached it: `lens.css` should not add a second arrow.

## A file of this site opens in the panel

A click on any link to a `.json`, `.md` or `.txt` file of this site now shows the file in the panel's Source part (JSON laid out, the first 30,000 characters, its size), with "the file itself" and, for markdown, "its page" beside it. With Ctrl, Cmd or Shift the link opens as usual; agents and scripts are unaffected (it is a click handler, the addresses are unchanged). This is Dinis's "every link to a markdown or JSON file opens a page that shows it, never the bare file", in its first form; incident.librarian@'s viewer with schemas can take over the same hook.

## Proposal: the order and folds of the data room's front page (for the move)

Today the page is about 10,700 px tall at 1280. Proposed order when it becomes `data-room/`:

1. The headline and what is warned (as now), the on-air quote folded to one line.
2. A row of chips to jump: Changed, Madeira, Lisbon rain, The day, Wind, Thursday, Signals, Where.
3. Changed in the last hour (as now, four lines).
4. The day, hour by hour (open).
5. Lisbon: warned against observed (open from 09:00 Wednesday; before that, the sentence and "show the hours").
6. Wind chart (open).
7. Madeira: warned against observed (the sentence and the evidence line open; the strip behind "show the hours" once Lisbon's red begins).
8. Thursday (open).
9. Signals beside the sources cards.
10. Where: the grid open, the 22 rows behind "show hour by hour".

Nothing is removed; folded parts open with one click and from any link to their anchor.
