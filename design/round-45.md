# Round 45: the front page under IPMA's red rain, and the start of the launch pass

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 09:30 UTC

The third designer session's first round. Three things: a look at `/` in the red rain's first half hour (for incident.weather@, whose page it is), a search for a warning's level written in fixed words ([level-words.md](level-words.md)), and the first of the launch pass.

## 1. The front page at 09:22 and 09:30 UTC (the live site, v0.1.726 then v0.1.733)

Looked at 390 × 844 and 1280 × 800, light and dark, on the live site, with the browser's own clock. IPMA's red rain warning for Lisbon was in force (09:00 to 18:00), its wind warning orange (09:00 to 21:00); the page's own data was read at 09:22 ([warnings.json](../incidents/2026-11-10-storm-charles/data/weather/warnings.json)).

**What holds (all four views).** No sideways scroll, no script error, no failed request. The band says "RED, IPMA warning in force in Lisbon now, Rain until 18:00" in the first 320 px; the orange wind is the second line of "In force this hour", in the first screen at both widths; "Rest of today, Thursday, Friday" sit under the band. The hour strip is the best thing on the page: the three warnings as bars against the hours, the decisions under them, observed against IPMA's automatic forecast, the now column; on a phone it opens scrolled to now. Dark is as good as light. Every tile has its source and the time read.

**What a stranger still does not get on the first screen** (measured from the top of the page; a first screen is 800 px on the desk, 844 on the phone):

| | 1280 | 390 | The 05:40 review said |
|---|---|---|---|
| The communiqué's number and "valid to 23:59" | 1,132 px: the middle of the second screen | 1,714 px: the third screen | two screens down: **still so** |
| The hour strip begins | 1,366 px (its heading 1,279): the second screen's lower half | 2,023 px | below the fold on a desk: **still so** |
| The four tiles | 359 to 560 px, about 200 px tall, half of it air | 379 to 550 px | "three of four greyed": not greyed now, see 3 below |

**For incident.weather@ (yours to take or leave; the page is yours):**

1. **The communiqué in one line under the band**, before the three days: "IPMA Comunicado nº2 · valid to 23:59 · last seen 09:22", the number a link. Its full sentence can stay where it is. It costs about 28 px.
2. **On a desk, the strip before the lists.** Its first three rows are "In force this hour" and "Next, as IPMA warns" as a picture. At 1,100 px and wider: band, communiqué line, days, then the strip, then the tiles and the two lists. If the tiles must stay first, make them one compact row there (the figure, unit and age on one line, the place and source under it: about 100 px instead of 200): the strip's head and the three warning rows then start near 480 px and are in the first screen.
3. **The freshest rain is from before the red.** At 09:22 the rain tile says "the hour to 08:00, observed 83 min ago" under a band that says red rain now, and the strip's 08 column says "not read". That is IPMA's delay and it is honest; but nothing on the first screen says the tile's hour is before the warning began. Four words would: "before the red began", for as long as the tile's hour ends before the start of the warning in force.
4. **The band names one hazard.** With red rain and orange wind both in force the band gives the highest, which is right; a second small line in the band ("also in force: orange wind until 21:00", from the same data) would save the reader the scroll on a phone, where the wind line is at 705 px.
5. **"Rest of today RED"** has no owner in the chip (the 05:40 review's point): "IPMA: rest of today".
6. **On a phone a long bar loses its label** once the strip is scrolled to now: the Schools bar is a blank band, the Government's begins mid-sentence. `position: sticky; left: 104px` on the bar's first child keeps "CLOSED 00:00-23:59" in view (the data room's `.wx-bar > span` does this).
7. **A word**: "Why the wind numbers look small beside **a orange** wind warning" (`weather.js` line 276 writes the level into a fixed "a").
8. **Print**: `/` is 1,178 px wide on a 718 px printed page. The rule at `weather.css` line 137 (`max-width: 860px`: 104 px + 24 × 44 px) applies to paper too, and line 138's `width: max-content` beats the print rule on line 146. In the print rule: `.wxc-row { grid-template-columns: 96px repeat(24, minmax(0, 1fr)); } .wxc-grid { width: auto; } .wxc-c { font-size: 9px; }`.
9. **The date wraps** on a phone ("... UTC (Lisbon / time)"): "Wed 11 Nov, 09:22 UTC" there.
10. `/` has two `h1` (the band's and the page's): one should be the page's only.

Not looked at: the 09:25 check's push, if it changed the page after 09:30; the next look is at the :09 wake.

## 2. A warning's level in fixed words

[level-words.md](level-words.md): 170 files name a level beside a hazard; 4 pages said "red wind" as a present fact after IPMA lowered it (one fixed here, three with their owners), 5 owners have dated lines a newcomer reads as now. The front page, the data room's front page, the stories and the labs read the level from the data.

## 3. The launch pass, begun

- **The sweep** (09:28, the local build of 2,041 pages): the menu's 49 pages at 390 dark and 1280 light: no sideways scroll, no script error, no failed request, the frame on every one. Two pages have two `h1` (`/`, the dashboard) and one has none (`evidence/index.html`): notes for incident.weather@, incident.dev@ and incident.sources@.
- **Against the investor pack** (web-summit.sgit.ai/investors/, read 09:26): the top is the same grammar already (brand, menu, version, repository; the subsite's pages on a second bar where the pack has a side list). Not changed.
- **A link in a document's table** now breaks between words: on a phone the first column of "What is here" on `research/media/` read "Visualis / ed".
- **Print**: nothing prints a shadow (incident.journalist@'s ask, card `a-journalist-6`: a shadow is two full-page masks a page in a PDF). `data-room/`, `stories/` and a document page fit the printed page; `/` does not (point 8 above).
- **The menu asks on the board are all in the menu already**: Accounts and For Dinis under Team (`a-accountant-1`, `a-board-1`), Jobs at the drawn page (`a-observability-2`), Perplexity under Research (`a-perplexity-1`), Stories as a subsite (`a-stories-7`). Each card closes when its asker drops the ask from its status file.

## Next

The first screen of an inner page on a phone (five bars before the content: 170 px); more air on the data room's front page; `/studio/` again; then what Dinis sends.
