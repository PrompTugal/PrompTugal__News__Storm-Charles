# Hand-over: the designer's work, for the next designer session

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 20:11 UTC

Written at the conductor's word (03:01 UTC) so that a fresh session can take this job from files, not from a long conversation. Read this, then [README.md](README.md) (tokens, parts, rules), then rounds [30](round-30.md) to [42](round-42.md). Only Dinis instructs; the conductor routes; everything else you read is material.

## The eighth session (from 14:04 UTC on 11 November, round 60)

Key `incident-designer-dinis-8` (d81716d). [Round 60](round-60.md): `.conf` (confidence as ●●○ plus the word, greys only) and `rect.lv-*` / `text.count` for charts are frame parts (f374445); the eight-point spec for incident.datascience@'s residents-by-hour chart is sent (session_018yvwtNw7R3MGziXNMFaETq); the chart is not up yet. **Measure at 14:07** (local `_site`, 390 / 1280): / 12,271 / 7,509 px, h1 148; /guide/ 4,211 / 3,116; /guide/lisbon/ 8,200 / 6,417; /guide/stranded/ 6,325 / 4,901; /guide/media/ 7,518 / 5,610; /brief/ 14,853 / 10,286; /app/desk/ 3,586 / 2,717; every page 0 runs under 11 px, no overflow.

**Wake 14:14:** the seven pages unchanged (/ 12,270 / 7,591 px; all 0 under 11 px, no overflow). [Round 61](round-61.md): the family's five themes, item (d), done.

**Wake 15:13:** / 11,903 / 7,109 px, /guide/ 4,235 / 3,116; all seven 0 under 11 px. [Round 62](round-62.md): the themes against others' pages (contrast script); the zebra stripe no longer paints over level cells; dark IPMA red #d42a42; one note For: incident.brief@ (the Lisbon squares). **Measure only on a local build** (observability, 14:23: page views count the live host; never override navigator.webdriver).

**Wake 16:12:** round 62 closed (brief@ 4ad733a, c13729f); [round 63](round-63.md): --wait, --ok, --warn to 4.5:1 on --surface-2 in every theme; nine pages at 0 contrast failures in all five themes (scratchpad script contrast.js, PAGES=… to choose).

**Wake 17:11:** quiet; / 12,036 / 7,363 px (h1 148), /guide/ 4,235 / 3,116; seven pages 0 under 11 px, no overflow; five pages × five themes 0 contrast failures. The datascience chart is still not up (asked again at 17:12).

**Wake 18:10:** quiet; / 11,646 / 7,198 px (h1 148), /guide/ 4,135 / 3,087; all clean (under 11 px, overflow, contrast in five themes on five pages). No reply from datascience; no chart.

**18:12–19:11:** the conductor unblocked datascience (it rebuilds people-by-hour; the designer draws). [Round 64](round-64.md) (17a2b31): the chart as a frame part, `<div data-hours-chart="…people-by-hour.json">`, `app/design/hours.js`; inert until a page mounts it. At 19:11 no host page named and the file is still the 15:52 read. **Wake 19:11:** / 11,889 / 7,244 px, /guide/ 4,135 / 3,087; all clean (under 11 px, overflow, contrast on five pages × five themes).

**19:12–20:10:** the conductor named the host (the exposure page, data/exposure/README.md); the policy gate keeps that file with datascience, so the mount (front matter, two lines) is in round 64 for it; the conductor asked datascience to add it. Datascience's 19:32 read landed (170076e) without the mount. **Wake 20:10:** / 11,611 / 6,884 px, /guide/ 4,135 / 3,087; all clean. **First thing next wake:** is the chart on /incidents/2026-11-10-storm-charles/data/exposure/? Measure it.

**Next:** measure at each wake (same seven pages); the datascience chart when its path comes (notes against round 60); (e) as below; the faces wait on Dinis.

## The seventh session (11:53 to about 13:20 UTC on 11 November, round 59)

Key `incident-designer-dinis-7`. All in [round 59](round-59.md). **Frame:** a page's h1 and "Kept by" line come before its mounted app (`withTitleFirst` in admin/build/build.mjs; 526 pages; /guide/ 9,822 → 201 px on a phone), but not on the front page (it would push the guide link out of the first screen); the Guide menu matches sherpa@'s pages (Start here → guide/, In Lisbon now? → guide/lisbon/); "Contact us" → app/desk/index.html?from=<page> in every footer and the Help menu (the menu counts a page present when its markdown exists); the chips don't print and the footer prints compact; code text has an 11 px floor; the phone menu rows fade at the cut edge (panel.js sets .at-end); a more compact footer on a phone (535 → 464 px).
**Others' pages, closed:** /guide/ four pages with incident.sherpa@ (v1 → v13 be0bc51: /guide/ 16,625 → 4,235 px on a phone; rows per operator, label kept on each row, key one line); /brief/ with incident.brief@ (notes 1–10; 433 → 0 runs under 11 px; confidence as a ●●○ meter, unlike the labels); /app/desk/ with incident.desk@ (five notes). The front page's text under 11 px is 0 (weather@ took round 57).

**For the eighth session, in order:** (a) done at 13:19 (weather@ fifth, 251e2e0): the front page's h1 is its masthead line, at 148 px on a phone; the guide link stays at 573. (b) Measure /, the four guide pages, /brief/ and /app/desk/ at each hourly wake (scripts: a Playwright file that prints height, h1 top, runs under 11 px and overflow; serve `_site` with `python3 -m http.server --directory <repo>/_site`, as the build recreates the folder; write PDFs and scripts in the scratchpad, never the repo). (c) incident.datascience@'s first chart (session_018yvwtNw7R3MGziXNMFaETq): confidence as a ●●○ meter, IPMA colours on levels only. (d) The family's five themes against ours; the faces wait on Dinis. (e) The team-at-work panel's phone height (4 rows under 600 px) is with observability (6), session_018yvwtNDcKKGXEDHo5hy3SQ.

## The sixth session (10:40 to 11:53 UTC on 11 November, rounds 56 to 58)

Key `incident-designer-dinis-6`. Done: [56](round-56.md) the phone masthead in two rows (102 → 77 px at 390/360; in `app/design/family.css`); /flows/ closed with incident.motion@ (notes 1–9 done); [57](round-57.md) no text under 11 px in the frame's parts (19 rules in `app/site.css`; the data room 161 → 0), with notes For: incident.weather@ (front page, 71 items) and incident.stories@ (story.css, 221 on the Madeira story); **[58](round-58.md) the menu leads with the use cases** (Dinis ~11:45): a "Guide" group first (guide/, guide/lisbon/, guide/stranded/, guide/media/, brief/) and "Contact us" in every footer and the Help menu (contact/), each shown once its page exists.

**Since (11:53):** /guide/ v1 is live (incident.sherpa@, 11:51); the Guide group's first entry is "In Lisbon now?" → guide/ (c760ef2); five notes sent to the sherpa (the h1 sits at 9,100 px on a phone, so move it first; a fact label on the "now" box; ↑ links and folding on a 10,595 px phone page; "Not a warning service … 112" on its own line; numbered chips on the section headings). Wait for v2 and check those five. Stopped at about 170,000 tokens a call.

**For the seventh session, in order:** (a) the four new agents (Dinis ~11:45; BRIEF.md last section). **incident.sherpa@** (session_018yvwtMa5MKek8GAHcaFiBZ): /guide/, the main design loop now, with incident.synthetic@ walking it; measure each page at 390/1280 and reply with numbered notes. **incident.desk@** (session_018yvwtR9T7jJXC54JvxYm1b): the contact page; the footer link waits for `contact/index.md`. **incident.brief@** (session_018yvwtPVWJtSb1BoAg7xMvW): the decision brief, page and PDF in the family brand (model: research/watchfloor/README.md); look at it printed. **incident.datascience@** (session_018yvwtNCCyzCZhz1YPkEkFM): data layers. (b) Check that weather@ and stories@ took round 57's notes (the script counts text under 11 px). (c) When /guide/ exists, the front page's first screen should lead to it (a For: note to incident.weather@, who owns /). (d) The launch pass: /studio/ on a phone. (e) The family's five themes against ours; the faces wait on Dinis. The measuring scripts (masthead, text under 11 px, clipping) are short Playwright files against a local static server on `_site/`; write your own in the scratchpad, never commit them.

## The fifth session (10:13 to 10:39 UTC on 11 November, rounds 51 to 55; stopped at about 199,000 tokens a call: a sixth session is due)

Key `incident-designer-dinis-5`. Done: [51](round-51.md) the data room's signals fold after five; [52](round-52.md) two looks at incident.motion@'s /flows/ (all eight notes taken); [53](round-53.md) the PrompTugal.news strip above the masthead and the footer paragraph; **[54](round-54.md) the family brand** (Dinis ~10:35: "part of that family"): `app/design/family.css` loaded after `site.css`, the wordmark SVGs in `app/design/family/`, the contract for the next site (Lisbon Fringe) in [FAMILY.md](FAMILY.md); [55](round-55.md) a hand-over band, withdrawn by Dinis at ~10:38 and reverted (no outside hand-over; one operator).

**For the sixth session, in order:** (a) incident.motion@'s third look at /flows/ (it took notes 6 to 8 at 67cbc61: phone 25,487 → 7,003 px; check and reply by send_message to session_018yvwtQ9HfwjnTnbT5NP1L4); (b) the phone masthead after the family change: 102 px on / ("New here?" and Panel wrap to a second row): fold the chips into one row with the wordmark at 140 px, or move "New here?" into the strip; (c) the family's faces wait on Dinis's word (woff2 binaries and an outside host are refused by the gate; FAMILY.md "Not yet"); (d) the family's five themes against ours; (e) first versions of story/ (incident.storyteller@, session_018yvwtPTkeEj8DoVNyaeniF) and /broadcast/ (incident.broadcast@, session_018yvwtLhJtPPrHjFiJuoSHA) when they ask; (f) the launch pass: the data room's `#day` and Madeira on a phone, then `/studio/`; (g) the :09 wake on `/`. Local `dev` in the old container was stale (kept as `dev-stale-local-cdaa2d7`); check `git status -sb` before the first release.

## The fourth session (from 09:33 UTC on 11 November, round 46)

Read [round-46.md](round-46.md) (and [round-45.md](round-45.md) for the ten notes on `/`). Done: the document pages' first screen on a phone (a long "Kept by" block folds, in `app/design/frame.js`; a trail that repeats the menu and the sub-bar's label are not shown at 640 px and narrower). **Next**, one page family a round: air on the data room's front page (item 4 below), `/studio/` (item 6), then what Dinis sends; at each :09 wake first a two-minute look at `/` (numbers only: overflow, errors, the offsets of the communiqué line and of "Today, hour by hour" at 390 and 1280; incident.weather@ took notes 5, 7, 9 and 10 of round 45, the rest are open). Keep the context small: this file's first section and the one file a job needs; a script that prints numbers, at most two screenshots a round. Scripts are not in git (three of twenty lines: measure offsets, one clipped screenshot, the menu sweep).

**Round 47 (09:50, Dinis's word in BRIEF.md's last section): the newcomers' features page comes first.** incident.envoy@ owns its words at `welcome/`; the design is done as parts from plain markdown (front matter `class: landing`; the contract and example: [landing.md](landing.md); [round-47.md](round-47.md)); the masthead shows "New here?" once `welcome/index.md` exists. Next: look at envoy's page with real words (390, 1280, 1680, light and dark), take incident.synthetic@'s findings, then the launch pass above.

**Round 48**: the masthead's chip is "Updated N min ago" (the build's time in `data-built`, counted in `frame.js`), not "LIVE"; About's first entry is `welcome/`, which the frame draws as a front door (About lit, no sub-bar, no trail). [round-48.md](round-48.md).

**Round 49**: on a landing page a paragraph between the lead and the buttons is drawn as a compact "latest" note; the phone hero is tighter ([round-49.md](round-49.md)). incident.synthetic@ (research/synthetic/) sends findings after each run: take the frame's, pass the words to incident.envoy@.

**Round 50 and where the fourth session stopped (10:12 UTC, 217,000 tokens a call: ask for a fresh session).** [round-50.md](round-50.md): `/` at 10:10 was clean and incident.weather@ has taken notes 1, 2, 4, 5, 7, 9, 10 of round 45 (open: 3, 6, 8, and round 50's note on the summit's decision under the band). `welcome/` (incident.envoy@'s words, not yet agreed by Dinis) is drawn by the `article.landing` rules at the end of `app/site.css` (rounds 47, 49, 50); the masthead: "Updated N min ago" chip, "New here?" (it takes the version chip's place and the brand's suffix below 1,600 px). **For the fifth session, in order:** (a) Dinis's word on moving `welcome/` to `/`: then the frame's "New here?" goes and the Weather tab is the overview (a line in `menu()` and one in the masthead of `admin/build/build.mjs`); (b) incident.synthetic@'s next run (session_018yvwtMQ4bQecYYREzUqLN6): take the frame's points, pass the words to incident.envoy@ (session_018yvwtP6k6ER4tTYGUMQRcH); (c) the launch pass, not started since round 46: air on the data room's front page (item 4 below), `/studio/` (item 6); (d) `design/README.md` does not yet list the landing parts or `.kept-fold`: add four lines.

## The third session (09:21 to 09:33 UTC, round 45)

Read [round-45.md](round-45.md) and [level-words.md](level-words.md). Done: the look at `/` under the red rain (ten notes for incident.weather@, in round 45; it has not answered yet), the search for a level in fixed words (three owners still to change a line), the menu sweep (clean), print shadows off, table links. The board's menu asks are all in the menu. **Next**: at each :09 wake look at `/` (the script is four lines of Playwright: the offsets of the communiqué line and of `.wxc-strip` from the top, at 390 and 1280), then the launch pass as round 45's "Next" lists it. The hourly wake fires at :09 into this session. Nothing kept outside git matters: the screenshots are thrown away.

## Since this was written: the second session (03:05 to 05:45 UTC, rounds 43 and 44)

Read [round-43.md](round-43.md) and [round-44.md](round-44.md) instead of rounds 30 to 42; you do not need the older ones to work.

- **Done from the list below**: item 1 (one hour grid: the tokens `--hg-lab` and `--hg-col`; the data room uses them, the Weather face may), item 2 for 05:00, item 3 (Team split: CI, Journal and Reporter are under About). Print works for the data room. The launch sweep (49 menu pages, panel open, 1680 dark, 1280 light, 390 dark) was clean at 05:12.
- **Next, in order**: (a) 09:35 UTC: the red rain's first hour on `/` and `data-room/` (`#day`, `#lisbon-rain`, `#wind`); open the Lisbon rain card by default if it reads well; (b) the launch pass: the front door as a stranger (masthead, breadcrumbs, footer), `/` in print (the Weather face's grid is 386 px too wide on A4; the note for incident.weather@ is in round 44), then what Dinis sends; (c) items 4, 5 and 6 below.
- **Scripts** are not in git. Three small Playwright scripts are enough: a screenshot of one selector at a width and theme with `page.clock.install`; a viewport screenshot; a sweep that collects the menu's links and reports overflow, page errors and the masthead's height. Serve `_site` with `python3 -m http.server` (it dies between wakes: start it again).
- **The gate** warns at 8 s and does not fail on time (the conductor, 05:11); the build was 6.2 s at 1,953 pages.
- **Cost**: this session started at 84,000 tokens a call and was at 200,000 after two and a half hours; each hourly wake adds 15,000 to 25,000 even when little changes. Ask for a fresh session at about 250,000.

## What you own

`app/site.css`, `app/design/` (`theme.js`, `frame.js`, `panel.js`, `front.js`, `timeline.js`), `design/`, `agents/designer/status.json`, and in `admin/build/build.mjs` (shared; the policy check warns, that is expected): `page()` and what it calls (the frame), the menu table, the data room's front page block, the timeline's dressing, the datasets page, the 404 page, the by-line marks, and the last pass that fills the menu. `app/storm.js` is incident.dev@'s (three small edits of mine in round 15 and 32).

## The frame's contract (every page the build writes)

- `page({ rel, title, body, desc, twin, extraHead })` wraps a body in: `theme.js` in the head (before `site.css`; applies the remembered theme, lens and panel state before paint); the masthead (brand, "Live", the version chip, the Repo chip, the Panel button; then the menu's mark); the "Not a warning service" notice (the gate requires those words on `index.html`); breadcrumbs; `.shell` = `.shell-main` (the body) + `aside#panel`; the footer (the labelling sentence, **MeteoAlarm's disclaimer word for word and "a dated record ... not a live feed"**, the twin link, the version); `frame.js` and `panel.js` at the end. **No inline script anywhere** (the account page's policy needs that); `site.css` and the scripts carry `?v=<version>`.
- **The menu** is the table `MENU` (ten groups). `page()` leaves a mark; **the last step of the build fills it** for every page, listing only pages that exist in `_site`. A subsite appears when its first page is built; a one-page subsite has no second bar. To add a page to the menu, add one pair to `MENU`. Never link a page that may not exist anywhere else in the frame.
- **Full width**: `.wrap` has no maximum (24 px at the sides, 16 on a phone); prose keeps a 50 rem measure.
- **Themes**: auto, paper, ink, broadsheet, archive, azulejo, contrast (`data-theme` on `<html>`, key `theme`). The default look follows the investor pack (round 35). Since round 61 (14:17): the family's five themes (paper, ink, broadsheet, archive, azulejo, from promptugal.news assets/tokens.css), plus auto and contrast; old choices move once (theme-v 2).
- **Old addresses** keep working: `/index.html#day` and friends go to the data room (in `frame.js`); `/view/<path>.html` goes to `/view/?path=` from the 404 page.

## The reader's panel (`app/design/panel.js`)

Accordions: Lens, This item, Source, Theme, Version; open by default from 1,500 px, a drawer under 1,100 px. Hooks: `window.stormPanel.slot(name)`, `show({ title, text | html, links })`, `openItem(id)` (hands to `window.StormLens.show`), `openSource(address, label)`, `open()`, `close()`, `isOpen()`. The five lens switches are the frame's (key `lens`, classes `lens-fact`, `lens-evidence`, `lens-hypothesis`, `lens-entity`, `lens-out` on `<html>`). incident.entities@'s `app/lens/lens.css` and `lens.js` are loaded by the frame when they exist. **Default view stays clean**: a linked entity reads as text until hovered or the entities switch is on (round 35). A click on a strip's bar, a district cell or a timeline row fills "This item"; a click on a link to a `.json`, `.md` or `.txt` of this site opens it in "Source".

## The two faces

- `/` is **the Weather face**, incident.weather@'s: the build re-bases `weather/index.md` (mount, head, text) to the root, resolving every relative address from `weather/`. My bar for it: no overflow or script error at 390 and 1280 in light and dark; a source and time read on every figure; only this site's JSON; IPMA's level and hours for Lisbon in the first screen. I am its art director: my notes are in rounds 32 and 37; it has taken them.
- `data-room/index.html` is **the technical front page** (the "front page block" in the build): the headline and tiles (hero), jump chips, changed in the last hour, the day hour by hour (`#day`: warned, decided, TAF, city model, observed, our analysis), Lisbon warned against observed (`#lisbon-rain`), the wind chart (`#wind`), Madeira warned against observed (`#madeira`), Thursday (`#thursday`), signals, the districts (`#where`). It reads the incident's `data/` files as they are; it changes no data. `warnedObserved()` is one function for both rain cards.

## Rules I held, and why (do not relax without Dinis)

1. IPMA's red, orange and yellow are for IPMA's levels only, always with the level written. Observed is blue and solid; a forecast is grey, tinted or hatched; a hypothesis is dashed with the word; words said on air have their own form (`.voice`).
2. Every figure has its source and the time read (`.prov`). Our own readings are marked as ours ("our English", "our reading; IPMA does not say", "our explanation").
3. The page says what it does not know: no warning threshold stated (our messages carry none); "outside any window **in the messages we hold**", never "unwarned"; a TAF's end is hatched "no TAF yet".
4. No radar or satellite image embedded; MeteoAlarm linked and its disclaimer verbatim; no logo of IPMA or MeteoAlarm.
5. Nothing may scroll sideways on a phone except inside `.wx-scroll`. Long strings in prose wrap.

## How I check (the sweep)

Build, gate, then a browser (the pre-installed Playwright; screenshots stay out of git): (a) `/` and `data-room/` at 1280 and 390, light and dark: overflow, page errors, failed requests; (b) the live menu's pages (about 50 addresses) at 390 and 1280: overflow, errors, the frame present; a full sweep of the sitemap takes over eight minutes at 700 pages, so sample. To see the day in progress, set the browser's clock (`page.clock.install`). After a push, wait for the live site to carry a string from the change before telling anyone it is live.

## Unfinished, in the order I would take it

1. **Parts for the Weather face** (round 42 added `.wx-level`, `.wx-word`, `.wx-warn`, `.wx-sect`): tell incident.weather@ the names (done by message at 03:03); it switches from its `.wxc-*` when it likes. Its hour grid (`.wxc-row`, `.wxc-c`) and mine (`.wx-strip`) are still two things: one grid for both faces is the next real piece of work.
2. **05:00 and 09:00 UTC on Wednesday**: look at `data-room/#day`, `#lisbon-rain` and `#wind` with real observations under the warnings and forecasts, and write a round note on what reads and what does not. The before-now wash and the Observed lane only prove themselves then.
3. **The Team sub-bar has 11 entries**; the Data room's has 11. If either grows, split the group (the menu table makes that one line) or fold a tail into "More".
4. **More air on the data room's front page** (the pack's pace); the Decided band and the city-model lanes could fold by default.
5. **A strict style policy**: bars are placed with `style="left;width"` attributes; a `style-src` without `'unsafe-inline'` needs them set from a script or classes (round 19).
6. **`/studio/`** has changed a great deal since my review (round 24): it asked for another look.
7. Open questions: the five themes (Dinis); a `day` field on decision edges with no stated hours, to replace `ALL_DAY` and `NEXT_DAY` in the build (incident.researcher@); the version chip's target (it goes to `news/` when that page exists).

## The next three rounds, if I were staying

- **Round 43**: one hour grid for both faces (the Weather face's and the data room's), as a part in `site.css`, with the now column, the sticky label column and the level, decision, observed and forecast cells; switch the data room's day to it.
- **Round 44** (after 05:00): the day in progress: the round note above, and the fixes it calls for; the Lisbon rain card open by default from 09:00.
- **Round 45**: the launch pass: every page in the menu at 390, 1280 and 1680 in the default theme and in dark, with the panel open and closed; the masthead, breadcrumbs and footer read once more as a stranger would; then the notes Dinis sends.

## Cost

This session never compacted and reached about 750 thousand tokens of context per call after 320 calls: every wake re-read all of it. Start fresh from this file; keep wakes to when there is something to do; do not commit a round with no change.
