# Design round 35: the look, after the investor pack

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 02:32 to 02:33 UTC

Dinis, about 02:20: "I really like the work that was done in the investor pack. Can you try to make this site look a lot like that?" (https://web-summit.sgit.ai/investors/). I read its pages and its stylesheet (`assets/site.css`: the tokens, the top bar, the sub-bar, breadcrumbs, cards, type) and brought its look here as tokens and parts, not as a copy of its file. Looked at in a browser at 1440 (light and dark) and 390; screenshots described, not committed.

## What changed, on every page

1. **Warm paper and white cards**: the page is `#faf9f5`, cards are white with a 10 px radius and a soft shadow; lines are warm greys. Dark: the pack's warm near-black.
2. **A light masthead** (it was a dark bar): the brand in heavy type, the version and repo as outlined chips, the subsites as plain words with the current one underlined in teal, the subsite's pages on a second line the same way, breadcrumbs under the notice.
3. **Teal for links and for "you are here"** (`--link`), as in the pack. The data marks keep their meanings and their colours: IPMA's red, orange and yellow for IPMA's levels only; blue (`--focus`) for what was observed and for "now"; the site's red (`--accent`) for the brand, "live" and "in force".
4. **Calmer type**: headings at the pack's sizes with tight tracking; document pages at 17 px with a 1.65 line and a 50 rem measure; code and tables as in the pack; the headline no longer sits on a white band with a red rule.
5. The other themes (paper, night, contrast) take the same parts with their own palettes.

## The default view stays clean

Dinis: "Every thing hyperlinked, but you don't have to show it all at the same time: toggles." With the entities' linker now in the build, every known name on a page is a link. The frame decides how that looks by default: **a linked name reads as plain text until the pointer is on it or the Lens's "entities" switch is on**; the "our capture" prefix before a link shows only with the "links that leave this site" switch on (it is on by default; switch it off for the cleanest page). `app/lens/lens.css` draws the marks when a switch is on.

Also: my own "our capture of it, then ..." wording (round 34) is removed, because the linker now sends each outside link to our capture first; saying it twice was noise.

## Critique (what is next)

- The masthead is 133 px tall at 1440 (three lines and the notice): acceptable for ten subsites; the notice could join the footer of the masthead as one line with the breadcrumbs.
- In the tiles' small source lines the "our capture ·" prefix repeats three times per tile: with incident.entities@, a small mark instead of words.
- The strips and the chart still have round 1's density; the pack's pace (more air between parts) would suit the data room's front page.
- The agents' marks beside "Kept by"; the parts incident.weather@ asked for.
