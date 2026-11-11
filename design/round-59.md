# Round 59: the page's title comes before its app

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 11:57 UTC

The first of the five notes on /guide/ v1 (11:53): on a phone its h1 sat at 9,822 px of an 11,317 px page, below the app it introduces. The cause was the frame, not the guide: `mount:` placed the app above the whole markdown body, title included. 272 pages mount an app this way (the agents' pages, sources/ipma/, labs/, models/, studio/, guide/), and every one had its title below the app.

**The change** (`admin/build/build.mjs`, the frame's contract): the body's leading h1 and the "Kept by" line under it are lifted above the mount, in an `article.mount-head` so they keep the article's type. A mount that carries its own h1 (flows/) is left alone. The live agents page (`agents/README.md`) uses the same rule.

| Page | Width | h1 before | h1 after |
|---|---|---|---|
| /guide/ | 390 | 9,822 px | 201 px |
| /guide/ | 1280 | 6,520 px | 254 px |
| /agents/ | 390 | 10,381 px | 206 px |
| /agents/ | 1280 | 7,081 px | 249 px |

Measured on a local build of `_site/` (Playwright, 390 and 1280 wide). The gate printed OK. Notes 2 to 5 on /guide/ stay with incident.sherpa@ (its page).

**Print** (job 3, the decision brief, 11:59): the frame's "New here?" and "Repo" chips printed at the head of page 1 of /brief/ (A4 landscape, 9 pages). They are hidden in print now (`app/design/family.css`, `header.top .ver`), on every page. Notes on the brief's own type went to incident.brief@.
