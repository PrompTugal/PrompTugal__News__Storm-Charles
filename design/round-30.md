# Design round 30: the frame for round two (full width, subsites, the reader's panel, five themes, the version in the chrome)

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 02:08 to 02:12 UTC

From Dinis's direction of about 02:10 ([BRIEF.md](../BRIEF.md), last section) and the contract in [RESTRUCTURE.md](../RESTRUCTURE.md): my part of step 1. Looked at in a browser at 1680, 1280 and 390; screenshots described, not committed.

## What changed, on every page the build writes

1. **The whole width.** The page column has no maximum any more (24 px at the sides). Prose keeps its own measure; strips, tables and charts take the room.
2. **Subsites in the menu.** First row: the subsites (today: Data room, Studio, Research, Team, About; and Weather, Sources, Evidence, Entities, Labs, Board, Help the push their owners ship a first page: a subsite is listed only when its page exists in the repository, so no link is ever dead). Second row: the pages of the subsite you are in, the current one underlined. "Account" reads "Log in"; "For agents" reads "LLMs"; the front page, the decisions page and the restructure are in the menu. Every link the old menu had is still there.
3. **The version in the chrome**: beside "Live", linked to `version.json` (what was built, from which commit, when). The Version part of the panel shows the same, and says so if the page you are reading is older than the site's latest.
4. **The reader's panel** (button "Panel" in the masthead; open by default from 1,500 px, closed below; a drawer over the page under 1,100 px, with its own Close and Esc). Accordions, each remembered:
   - **Lens**: colour what the page is made of: facts, evidence, hypotheses, entities, links that leave the site. Off by default except the last: **a link that leaves this site is dotted and carries an arrow**, on every page, so it is obvious before the click.
   - **This item**: click a bar in any strip, a district cell, or a row of the timeline: what it is, its full wording, and its links open here (on a phone this is the first time a bar's detail can be read at all: it was a hover tooltip). A bar that links out no longer leaves on the first click: the panel shows what we hold, then the way out.
   - **Source**: the file behind the page (its markdown twin), shown in the panel, not downloaded.
   - **Theme**: auto, light, dark, paper, night, contrast.
   - **Version**.
5. **For the other agents**: `window.stormPanel.show({ title, text | html, links })` puts anything in "This item"; a linked word that should take the entity colour carries `class="ent"` or `data-node`. `app/design/panel.js`; no inline script.

## Three things I could not settle alone

1. **"The five themes of the sgit.ai sites."** I looked (sgit.ai's home page and its guidance) and did not find the list of five. I have made five of my own (light, dark, paper, night, contrast; auto follows the system). If there is a canonical five, give me the page and I will match the names and palettes.
2. **Moving this front page to `data-room/` and giving `/` to Weather.** Not done in this round, on purpose: it changes the address of the page every agent links to (`index.html#day`, `#wind`, `#madeira`...), and `weather/` has no page yet. The menu is ready for both. I will do the move the moment the conductor says which push.
3. **The Weather face's look** is mine with incident.weather@: I have not started it; the frame (width, panel, themes) is what it will stand on.

## Also in this stretch (rounds 28 and 29, small)

- Source lines (`.prov`) may wrap: one ran a research page to 607 px on a phone.
- The Madeira card shows what was searched for an earlier warning, as evidence, from `madeira.json`'s `earlier_warnings`.
