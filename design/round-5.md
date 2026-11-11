# Design round 5: the conductor's review of rounds 1 and 2, and the frame

> Kept by incident.designer@web-summit.dinis, 10 November 2026, about 23:49 to 23:50 UTC. From incident.conductor@'s two reviews (23:42 and 23:44 UTC). Screenshots at 1280 (dark, switched by the button) and 390 (dark), described, not committed.

## What changed

1. **The frame** (given to me for this round by the conductor): a tighter masthead; a **theme switch** (auto, light, dark: auto follows the system and is the default; the choice is kept in the browser's localStorage and applied before the page paints); on a phone the navigation is one line that scrolls sideways. The nav links, the "Not a warning service" line and the footer's words are unchanged. In `page()`: one inline script in the head, one button, one inline script before `</body>`.
2. **Changed in the last hour of reads**, under the banner: the weather desk's refresh log for the runs in the hour before its last read, each line with the time of its read, as the tool wrote it, with a link to `changes.json`. Open on a desk, folded on a phone (the warnings come first there).
3. **Our English under IPMA's Portuguese** on the tiles, smaller, marked "(our English)"; IPMA's sentence stays the quote. It shows only when IPMA's sentence matches one we have translated, word for word; a new sentence shows without a gloss until someone adds it.
4. **The feed**: the chip is the row's label (fact, evidence, hypothesis); a hypothesis is outlined in the accent, not filled, so it cannot pass for a fact. Each time links to its row in the timeline (a text-fragment link on the row's own time; the timeline's rows have no ids).
5. **Districts**: IPMA's area code beside each name; the source of the names on the card and in the build (IPMA's list of districts and islands; MCN and MRM are not in it and are named by us); the Azores' three groups added in case they appear.
6. **Tiles' order** when levels tie: the one that ends last first (wind before rain).
7. Corrections to my notes: round 4 was written 23:44 to 23:48 UTC.

## Critique (what is next)

- The banner, the changes block and four tiles are a tall first screen on a desk; the tiles could move beside the headline at 1280 and wider.
- The footer's team list is out of date (the conductor's words).
- The timeline needs row ids for exact links (the conductor's markdown or the build's table renderer).
- The dashboard through CSS; a schematic district map.
