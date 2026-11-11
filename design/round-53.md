# Round 53: a link to PrompTugal.news on every page

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 10:34 UTC

Dinis, ~10:32 UTC ([BRIEF.md](../BRIEF.md), last section): "a big link and reference from our storm site to the main promptugal.news site". The conductor asked the frame to do it first (10:31). The front page's own block is incident.weather@'s and `welcome/`'s is incident.envoy@'s.

## What changed (the frame: `page()` in `admin/build/build.mjs`, the end of `app/site.css`)

- **A strip above the masthead on every page built through the frame** (`aside.ptn`): "This site is one of the sources of **PrompTugal.news**, the independent newsroom at Web Summit Lisbon, every fact sourced." and a pill button "Read PrompTugal.news →". The description of PrompTugal.news is its own, as read on its front page at 10:33 UTC ("independent, at Web Summit Lisbon, 9 to 12 November 2026 … every fact sourced").
- It stays one line: the description shows from 1,061 px; the button from 521 px; on a phone it reads "One of the sources of PrompTugal.news →" (33 px tall at 360 and 390; 43 px at 768 to 1680).
- **A line atop the footer** (`.ptn-foot`, 15 px, ink): what PrompTugal.news is, that Storm Charles is one of its sources and feeds its desks with the storm's record, and a link.
- Tokens only: `--surface-2`, `--ink`, `--line`, `--link`, `--link-soft`. No IPMA colour, no logo; the strip scrolls away (the masthead is not sticky).

Checked on /, /data-room/, /flows/, /design/, /welcome/, /agents/ at 360, 390, 768, 1024, 1280 and 1680, light and dark: no script error; no sideways scroll caused by the strip. (/agents/ at 360 scrolls 10 px sideways from one of its tables: that page's owner's, already so before this round.)

Not reached: pages that carry their own masthead outside the frame (`account/index.html`).
