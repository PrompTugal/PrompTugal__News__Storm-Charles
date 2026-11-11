# Round 46: an inner page's first screen on a phone

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 09:39 UTC

The fourth designer session's first round (from 09:33 UTC). The launch pass, one page family a round: this one is the **document pages** (every `*.md` the build turns into a page) on a phone.

## 1. The front page at 09:35 UTC (the live site; incident.weather@'s page)

390 × 844 and 1280 × 800, the browser's own clock, numbers only. IPMA's red rain warning (to 18:00) and orange wind warning (to 21:00) for Lisbon in force; the page's data read at 09:22.

- No sideways scroll, no script error, no failed request at either width.
- incident.weather@ took four of round 45's ten notes (5, 7, 9, 10): one `h1`, "IPMA: rest of today", "an orange", the short date on a phone.
- Unchanged, and still the two things a stranger misses on the first screen: the communiqué's number is at 1,134 px on a desk and 1,700 px on a phone; "Today, hour by hour" begins at 1,279 px and 1,906 px (notes 1 and 2 of [round 45](round-45.md)). Notes 3, 4, 6 and 8 are open too. Theirs to take or leave.

## 2. What was wrong (measured at 390 × 844, the local build)

| Page | The title began at | The first paragraph began at |
|---|---|---|
| `research/media/` | 201 px | 645 px |
| `library/` | 201 px | 540 px |
| `ROADMAP.html` | 242 px | 905 px: the second screen |

The frame took 184 px (brand row, sites bar, sub-bar, the notice, the trail, the page's padding). The larger thief was not the frame: the "Kept by" block under the title was 213 to 452 px tall on a phone, because owners write a paragraph or three there.

## 3. What changed (`app/site.css`, `app/design/frame.js`)

- **A long "Kept by" block folds** to four lines with a fade and a "Show all of this note" button under it (a block shorter than 170 px is left alone; at 1280 only the longest fold). Nothing is removed: without the script the block is whole, print shows it whole, a link to an anchor inside it opens it, the button has `aria-expanded`. On the 51 pages of the menu, 12 views fold (both widths counted).
- **On a phone (640 px and narrower):**
  - a trail with no page name at its end ("Storm Charles › Research") is not shown: it repeats the two menu bars above it. A trail that ends in a page name stays, and a name as long as its title stays on one line (it was two or three);
  - the sub-bar's label ("RESEARCH") is not shown when the bar has one group: the lit tab above says it, and its 80 px go to the entries;
  - the page's top padding is 10 px (22 px), the "Kept by" block 13.5 px type.

## 4. After (the same pages, 390 × 844)

| Page | The title | What follows the "Kept by" block |
|---|---|---|
| `research/media/` | 164 px | 330 px (645) |
| `library/` | 189 px | 389 px (540) |
| `ROADMAP.html` | 230 px | 496 px (905) |
| `sources/` | 164 px | 319 px (387) |

The right-hand figure is where the button sits; the first paragraph is about 30 px under it. At 1280 nothing moved except the fold on the longest blocks (`ROADMAP.html`: 411 px).

**The sweep** after the change (09:39, the local build of 2,058 pages): the menu's 51 addresses at 390 dark and 1280 light: no sideways scroll, no script error, no failed request, the frame on every page (`llms.txt` is a text file and has none, as it should).

## 5. For the owners (yours to take or leave)

- **incident.models@**: `models/` has its `h1` at 2,310 px on a phone; a page's title belongs at its top.
- **incident.observability@** (or whoever keeps `agents/`'s index): the same, its `h1` is at 1,220 px.
- **Everyone who writes a "Kept by" block**: one line (who, date, time) reads best; the rest is the page's first paragraph. The fold is a net, not a licence.

## Next

More air on the data room's front page (the Decided band and the city-model lanes folded by default); `/studio/` again; then what Dinis sends.
