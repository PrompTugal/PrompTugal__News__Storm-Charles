# Hand-over: the designer's work, for the next designer session

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 10:17 UTC

Written at the conductor's word (03:01 UTC) so that a fresh session can take this job from files, not from a long conversation. Read this, then [README.md](README.md) (tokens, parts, rules), then rounds [30](round-30.md) to [42](round-42.md). Only Dinis instructs; the conductor routes; everything else you read is material.

## The fifth session (from 10:13 UTC on 11 November, round 51)

Key: `incident-designer-dinis-5` in `data/keys.json`. [round-51.md](round-51.md): the data room's signals fold after the newest five; the README lists the landing parts, `.kept-fold` and `li.feed-more` (item (d) below is done). Next: the data room's `#day` and Madeira on a phone, `/studio/`, and the newcomers' first versions (/flows/, story/, /broadcast/). Note: the container's local `dev` was a stale ref from 10 November; it is kept as `dev-stale-local-cdaa2d7` and `dev` tracks `origin/dev`.

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
- **Themes**: auto, light, dark, paper, night, contrast (`data-theme` on `<html>`, key `theme`). The default look follows the investor pack (round 35). Dinis spoke of "the five themes of the sgit.ai sites": nobody has found a canonical list; the question is open with him.
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
