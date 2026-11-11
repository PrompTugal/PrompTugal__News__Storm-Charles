# Round 47: the features page for newcomers, as parts made from plain markdown

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 09:53 UTC

Dinis, about 09:50 UTC ([BRIEF.md](../BRIEF.md), last section): the first page "has to be super clear ... like a normal website, a features website, that explains everything"; the current front page stays as the live overview. The lead's reading: incident.envoy@ writes it at `welcome/`, the designer designs it, and it moves to `/` on Dinis's yes. This round is the design, ahead of the words.

## What was made

- **The parts** (`app/site.css`, the round 47 block): a page with the front matter `class: landing` is drawn as a features page from what markdown already has. The build escapes raw HTML, so there are no classes for the writer to learn: a title, the "Kept by" line, a lead, buttons (a bold link, an italic link), figures (a list before the first section), then sections with cards (a list), steps (a numbered list) and a pull quote (a block quotation). Tokens only; no warning colour anywhere in it.
- **The worked example and the contract**: [landing.md](landing.md), which is itself such a page. incident.envoy@ copies its shape and writes its own words.
- **Against the investor pack** (web-summit.sgit.ai/investors/, read 09:52): the same warm paper, one accent, a 17 px body, a 40 px title, cards in a grid of three or four. Ours sets the title larger (up to 56 px) because it is a front door, not a section page.
- **The way in and back** (`admin/build/build.mjs`, two lines): when `welcome/index.md` exists, the masthead shows "New here?" beside the Live chip on every page; the features page's main button goes to the live overview. When the page moves to `/`, the Weather tab is the overview and "New here?" can go: a line for whoever moves it.

## Checked

`design/landing.html` at 390 and 1280 (the local build, 09:53): no sideways scroll, no script error; the title begins at 220 px on a phone and 211 px on a desk, the buttons are in the first screen at both.

## Not done, and next

The page itself (incident.envoy@'s words); its look with real words at 390, 1280 and 1680, light and dark; a live figure in the hero (the level in force, from the Weather face's data, through the page's `mount:` front matter) if incident.envoy@ and incident.weather@ want it; incident.synthetic@'s findings. Then the launch pass again: air on the data room's front page, `/studio/`.

## After incident.envoy@'s first draft (10:00 UTC; `welcome/index.md`, 94f2ed9)

Looked at `welcome/` on the local build at 390, 1280 and 1680, light and dark: no sideways scroll, no script error; the title begins at 132 px on a desk and 135 px on a phone; the main button is in the first screen at every width (513 px and 591 px). The words are a draft Dinis has not agreed.

- **The frame treats `welcome/` as a front door** (`admin/build/build.mjs`): no subsite lit, no sub-bar, no trail. It was filed under "Data room" (incident.envoy@'s note 2).
- **A linked name inside a card is not bold** (its note 1): only the card's own name is.
- **"New here?" and the menu**: at 1280 the new link cut "Help" and "About" off the sites bar. Below 1440 px it takes the version chip's place (the version is in the panel) and the brand drops " · PrompTugal"; the bar fits again at 1280. The menu sweep after it: 51 addresses, clean.
- **For incident.envoy@**: a figure reads best as a number and one or two words ("10 November, 21:14 UTC" and "31 agents, 1 editor" wrap to two lines beside "22 minutes"); the lead is six lines on a desk and nine on a phone, two sentences would let the figures into the first screen.
