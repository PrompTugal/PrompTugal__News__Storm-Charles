# Hand-over: the Weather face (incident.weather@)

> Kept by incident.weather@web-summit.dinis, 11 November 2026, 12:28 UTC

For the next weather session, started by incident.conductor@ at Dinis Cruz's word. The first session ran 02:08 to 09:29 UTC on 11 November and is handed over because its context grew large, not because anything is broken. Read [CLAUDE.md](../../CLAUDE.md), [RESTRUCTURE.md](../../RESTRUCTURE.md), [design/README.md](../../design/README.md) and design/HANDOVER.md first, then this. The running record is [status.json](status.json).

## What you own

| Path | What |
|---|---|
| `weather/index.md` | the page: front matter `mount:` (keep `data-base="../"` exactly) and `head:`, the "Kept by" line, the "Not a warning service" sentence, two lines. The build writes the same page at `/` (the front door) and at `/weather/` |
| `weather/about.md` | what the page shows, which file feeds which part, how to read it, how the rule is kept |
| `app/weather/weather.js` | the whole face: one script, about 540 lines, no dependencies, drawn in the browser |
| `app/weather/weather.css` | its styles: tokens only, no hex colour |
| `tools/weather-check.mjs` | the face's own rule as a check; **the gate runs it** |
| `agents/weather/` | status.json, this file |
| `accounts/ledger/weather.jsonl` | one line of token counts per wake (`tools/accounts-measure.mjs --append`), yours to commit |

Make your own session key and add its public half to `data/keys.json` (mine ends with my session: mark it `ended`).

## The rules of the face (do not bend them)

1. **It reads only this site's own JSON** that carries a source and a time read: `api/v1/<incident>/`, `incidents/<incident>/incident.json`, `sources/<id>/data/`, `entities/`, `evidence/`. Never an outside address. Every fetch takes its address from the `FILES` table at the top of weather.js; `tools/weather-check.mjs` fails on anything else, on an outside address other than the two links to IPMA and ANEPC, on a hex colour or an image, and on a script that does not parse.
2. **No forecast and no advice of ours.** IPMA's warnings and the bodies' decisions are facts with source and time read. The meteorologist's reading is a hypothesis: dashed, labelled, closed by default, with no end time other than the warnings'. Sentences on the first screen are composed from data fields, never written.
3. **IPMA's red, orange and yellow only for IPMA's levels**, always with the level written. Observed is solid blue; IPMA's automatic forecast is grey and hatched; a decision is ink (solid: fact; outlined: evidence).
4. **Every figure is followed by its source and the time read**, linked to the data room's viewer: `view/?path=<path>&at=<field>` (the `ROOM` table, beside `FILES`).
5. **Never write a time you did not read from the clock** (`date -u`) or from a file. I wrote hours of invented times into status.json before I noticed; they are corrected, and the status file says so.

## The sixteen files it reads (`FILES`)

`incident.json`; under `api/v1/2026-11-10-storm-charles/`: `signals.json`, `weather/warnings.json`, `weather/cap.json`, `weather/lisbon-rain.json`, `weather/stations.json`, `weather/forecast.json`, `weather/airport.json`, `weather/madeira.json`, `weather/airport-madeira.json`, `weather/changes.json`, `weather/analysis.json`, `weather/communiques.json`, `decisions/graph.json`; and `sources/ipma/data/warnings.json`, `sources/ipma/data/places.json`. A missing file leaves its part out and is named in the page's last line; nothing else breaks.

## The rule for IPMA's two channels (function `channels(t)`)

IPMA publishes Lisbon's warnings as an open-data feed (`warnings.json`, array `lisbon`) and as CAP messages relayed by MeteoAlarm (`cap.json`, `lisbon_messages`, each with `sent_utc` and `replaces`). They can differ for hours. Per hazard: take the CAP messages still standing (not named in another message's `replaces`, no `left_feed_utc`); if their windows still to run differ from the open data's, **and** the newest of them was sent after everything the open data lists for that hazard (an open-data entry with no sent time counts as older), the page shows the CAP messages and says plainly what the open-data feed still lists: a boxed note under the band (`channelNote`) and an outlined band on the hour strip. Otherwise the open data is shown. When the feeds agree again the note goes by itself. This ran for real at 07:42 (wind lowered from red to orange) and cleared by 09:22. The page never chooses a level.

## What is on the page, top to bottom (`render`)

- **The band** (`hero`): the largest word is the level **in force now**; one composed line of the hazards at that level with their hours (for wind, IPMA's own gust figure); beside it, smaller, the highest level still to come today with its start, when it is higher than what is in force or nothing is. Then the channels note if any, the next three days' highest level, four observed tiles with their ages (dimmed past 90 minutes), the warnings in force, **closed / said it would run, with limits / said it would run** by body (each name opens its entry; "in part" when a closed body also has a decision with hours today that it runs), the next warnings, the headline decision, where else IPMA has red, the communiqué in force, the read's age and the next read.
- **The day, hour by hour** (`hours`): Today / tomorrow switch; rows: IPMA's warnings, decisions with stated hours, rain, wind, gusts (airport observed, then IPMA's warned figure), temperature. A station's hour is read as the hour **ending** at its label (the meteorologist's inference in `lisbon-rain.json`, `hour_label`), so a value labelled 09:00 sits in the 08 column. A past hour with no reading says "not read"; it never shows the automatic forecast.
- **Where** (`whereMap`): the highest level for the rest of today per warning area, as dots at label spots (not borders) and a list.
- **Tomorrow**, **the last three key changes**, **Madeira** (rain, the airport's gust as one point, the warnings in force now).
- **Folded**: every closed and running entry; the rain and wind charts (`rainChart`, `windChart`, each with a table twin); Madeira by the hour; the reading.
- The page redraws each minute and reloads its files every five; what the reader opened stays open. `?now=2026-11-11T13:20Z` shows it as at that time with today's files (a check, never a forecast).

## How to check before every push

```
node tools/weather-check.mjs && node admin/build/validate.mjs     # both must print OK
(cd _site && python3 -m http.server 8765 &)                        # then open / with Playwright (pre-installed)
```

Open `http://localhost:8765/index.html` at 390 and 1280 px, light and dark: no page error, `document.documentElement.scrollWidth - innerWidth` is 0, every `.wxc a[href]` on this origin answers 200, and read the band, the tiles' ages, the now column and the rain row against the files. The gate does not open the page: a script that parses but throws leaves the front door empty, and only a browser shows it. To test a state the data is not in yet (a new CAP message), change the **built** copy under `_site/api/v1/...` only, never a tracked file; the next build restores it.

## The 12:00 check (yours at 12:25)

By the files read at 09:22 there is **no red wind at 12:00**: wind is orange 09:00 to 21:00 since IPMA's 07:16 message. At 12:00 the orange sea warning begins. Check, after the 12:22 read lands (the conductor syncs at :27):

1. the band still says RED (rain, until 18:00), and three warnings are in force: red rain, orange wind, orange sea; the next is yellow sea from 21:00;
2. the warnings file has not changed again (compare `lisbon` with `cap.json`; if they differ the note must appear and read right);
3. the first gusts at Lisbon airport (`airport.json`, `metars[].gust_kmh`) on the gust row and the wind chart against IPMA's "up to 120"; the tile says "Gust at the airport" when one is reported;
4. the rain row: hours to 09:00, 10:00, 11:00 under the red band; "not read" for hours not yet in the file;
5. CP's 12:00 to 15:00 bar and the coaches' 10:00 to 23:59 bar on the strip, with the now column at 12;
6. Madeira's heading and airport line; 390 and 1280, light and dark. Then at 18:00 (red rain ends) and 21:00 (wind and orange sea end): the band must step down by itself.

## What was asked for the first screen, and where it stands

- incident.designer@ (design/round-32.md, and the third session's rule of 03:12): the level in force is the largest thing: **done**; one row of equal tiles: **done**; about two screens, the rest folded: **done** (about 5,600 px at 1280 with Where); a light decision card: **done**; a line of "now" above the warnings on a phone: **done**. Its shared parts are in app/site.css (`.wx-level`, `.wx-word`, `.wx-warn`, `.wx-warn-h`, `.wx-warn-t`, `.wx-sect`): **not switched to yet**; mine (`.wxc-level`, `.wxc-word`, `.wxc-w`, `.wxc-fold`) carry the same values. The hour grid is not shared yet. Notes from its 09:35 look are coming to you.
- incident.weatherwatch@ (two reviews): highest level and one sentence first, day chips, where, the read's age and next read, English with the Portuguese one click away, ages on tiles, nothing that reads as our forecast or advice, the communiqué, decisions on the strip's axis, the gust its own row: **all done**. Its last word: nothing on the first screen reads as ours.
- incident.labs@: `labs/weather/day-rebuilt.html` has Tuesday rebuilt from `cap.json` (code: the dayBands block in app/labs/weather.js). **Not lifted yet.** If you add Tuesday to the day switch, word it "from the messages we kept", say the record starts Tue 23:51 so Tuesday can look calmer than it was warned to be, and draw no empty rows for what was not kept.

## Open asks (others')

- incident.researcher@ (the conductor has sent it): a **scope** on each decision edge (the whole service, or part: one route, four trains), so "in part" is read, not inferred; and for the city's measures, **which thing** is closed (the edge names the Câmara; the first screen should name the tunnels and parks).
- incident.meteorologist@: its English for Lisbon's orange rain now carries "at times"; no ask open. If it publishes gusts for more points, tell the face their paths.
- incident.ipma@: `text_en` per instance in `sources/ipma/data/warnings.json` is coming, labelled as a translation; it will not rename a field the face reads (`instances`: area, level, type, start, end, start_utc, end_utc, gone_read_utc; `areas`: id, name, region, label_at) without a line first.

## Known weak spots (mine, not fixed)

- No page without JavaScript beyond a short fallback with links. A generator (`tools/weather-*.mjs --out`, a line in `admin/build/generators.json`) could prerender the band.
- The closed / running groups come from the researcher's `state`; an edge with no `state` falls back to words in the decision text (`groupOf`).
- "Where" reads the open-data copy only; it does not apply the two-channels rule to other areas.
- The hours of IPMA's all-areas warnings are read as UTC: sure for the mainland and Madeira in winter, unconfirmed for the Azores (the page says so).
- The charts' SVG text gets small on a phone (the chart scrolls sideways there).
- I checked local builds of current dev, and the live site only by fetching its files; I did not drive a browser against the live address.

## Added by the second session (from 09:31 UTC)

- Its session is session_018yvwtNZb76i5cStvskYn1i; its key is `incident-weather-dinis-2` in data/keys.json (the first is "handed over", the file's word; not "ended" as said above). Its wakes: 12:25 for the 12:00 check, then hourly at :25 (the conductor's).
- design/round-45.md's ten notes are all on the page. What changed in the shape: the band's heading is an `h2.wxc-h` (the page's title is the only h1); the band carries "Also in force" (the warnings in force below the highest level, each with its level written); `commLine` puts the communiqué's number, validity and last-seen time under the band (`commNow` picks it; the full sentence stays lower down); a rain or wind tile says "before IPMA's <level> <hazard> warning began" while its hour ended at or before the start of the warning in force; `hero(t, wide)` returns two sections and `render` puts the hour strip between them at 1,100 px and wider (`MQ`), after them on a phone; a bar's label is `i.wxc-bl`, sticky beside the row's name; the print rule gives the 24 hours the page's width.
- When checking in a browser, block requests that leave localhost: the frame's page-view script (app/agents/obs.js, incident.observability@'s) sends an event to a lane outside the site on every page load, a local build included. It is not the face's (tools/weather-check.mjs checks app/weather/ only).
- Kept outside git and gone with the session: the check scripts (a Playwright look at four views with positions, a strip and print photograph). Rewrite from "How to check" above; ten lines each.

## Added by the third session (10:31 to about 11:58 UTC)

The third session is handed over because its context passed about 200,000 tokens a call, not because anything is broken. Its session is session_018yvwtQYMVvhqjVntBCKjaa; its key is `incident-weather-dinis-3` in data/keys.json (mark it "handed over" when you add yours). Wakes: hourly at :25 (the routine "incident.weather@web-summit.dinis hourly (3)").

**Due first: the 12:00 check at the 12:25 wake** (the six points above), then the 18:00 and 21:00 step-downs. At the 11:27 check (files read 11:26) everything read true: RED rain to 18:00, ORANGE wind to 21:00, next ORANGE sea 12:00 to 21:00, then YELLOW sea 21:00 to Thu 03:00; IPMA's two channels agree.

**New on the page, top to bottom** (all in `hero` and `render`, app/weather/weather.js):

- `changeLine(t)`, just under the band: "Wind lowered by IPMA from RED to ORANGE · message sent 07:16 UTC". Read from cap.json: a standing CAP message whose own `replaces` names a message for the same hazard at another level; shown only for a message sent today and while it still runs (weatherwatch@'s 09:40 review, point 1).
- `summitLine(t)`: Web Summit's latest decision, the newest dated fact or evidence with `by: websummit` in decisions/graph.json, with its time, the time read, a link to its entry (`#d-<id>`) and to the data room. Its words are incident.json's `headline` when the headline cites the same source URL; otherwise the edge's own, cut to 170 characters. On the right: "New here? What this site is →" (/welcome/) and `ptnLine()`, "This site is one of the sources of PrompTugal.news" (Dinis ~10:32; the frame's top bar carries the big link on every page, so this stays small). designer@'s round 50 note 4; synthetic@'s run 3 point 5.
- `nowTiles(t, 'line')`: on a desk only, one "Measured" line above the strip (airport wind or gust, the wettest station's last hour; age and source; dimmed past 90 min). weatherwatch@'s point 3.
- `team(t)`, after the hours and the rest of the band, before Where: "The team at work" from incident.observability@'s `data/agents/now.json` (built on every push by tools/agents-now.mjs, never tracked; `FILES.team`, and allowed in tools/weather-check.mjs). The fields read are listed in the message to observability@ (11:58): `updated`, `counts`, `flags.commits_stale`, `flags.sources_window_hours`, `working[]`, `sources_read[]`, `public_posts_not_listed`, `feeds[]`, `links[]`. observability@ promised a line before any field name changes. Not weather: no IPMA colour.
- tools/weather-check.mjs now allows one more link out, `https://promptugal.news/` (a link, never fetched), and one more file, `base + 'data/agents/now.json'`.

**Open for you, in order:**

1. The 12:00 check (12:25 wake), then 18:00 and 21:00.
2. The conductor, 11:51: "In Lisbon now? Start here →" to /guide/ (incident.sherpa@'s) beside "New here?" in `summitLine`. Read /guide/ first: the front page must not link into advice of ours.
3. weatherwatch@'s 09:40 point 2: draw the day's past hours on the strip from the CAP record (faded, a mark where a message replaced another), so a re-issue no longer erases the morning.
4. Decision edges now carry `scope` (`extent`, `parts`): read it in `closedStrip` instead of inferring "in part" (`part(e)`).
5. The gust row: from the now column on it shows IPMA's warned "up to 120"; the hour's observed "none" appears only once the hour has passed. Correct by design, but worth a look.
6. Still open from before: Tuesday on the day switch (labs@), the designer's shared parts.

**Lessons from this session:** read the clock before writing any time (I wrote 10:34 and 10:37 against a 10:33 and 10:36 clock and corrected both before pushing); run check scripts from the scratchpad, not the repository (their screenshots stopped a release once); in shell, write JSON edits as a script file (a quote in a one-liner broke one).

## Added by the fourth session (from 11:59 UTC)

Its session is session_018yvwtLwwDUdneufUUP2KR9; its key is `incident-weather-dinis-4` in data/keys.json (the third's is marked "handed over"). Its wake is the conductor's "hourly (4)" at :25; do not make a second one. Already at about 170,000 tokens a call after the first round (one list of every routine cost about 46,000 characters: do not list them; the conductor tells you which is yours).

**Done (all pushed to dev, each checked at 390 and 1280, light and dark):**

- `summitLine`: "In Lisbon now? Start here →" to incident.sherpa@'s /guide/ beside "New here?" (the conductor's 11:51 ask). /guide/ was read first: sourced only, not a warning service.
- `closedStrip`: "in part" is read from each edge's `scope` (`extent: part`, for a body listed closed or running; "with limits" gets no mark), with `scope.parts` as the mark's tooltip. Only an edge with no scope falls back to the old inference. On dev at 12:02: FlixBus, CP (four bridge trains 12:00 to 15:00), Transtejo Soflusa (one route).
- `capRecord(t, D0, D1)` and the "earlier today" rows in `hours` (weatherwatch@'s point 2): under each warning row, today only, the hours already past from cap.json, faded (`.wxc-band.rec`), the level written, each message cut at the time its replacement was sent, never past now; a dashed tick (`.wxc-mark`) where a message replaced another, with a screen-reader line. A message already drawn in the warning row is skipped. weather/about.md says so, and that the record starts Tue 23:51.

**The 12:00 check: done at the 12:25 wake, all six points true** on the live site (v0.1.1082, files read 12:23): RED rain to 18:00, also ORANGE sea and ORANGE wind to 21:00, next YELLOW sea 21:00 to Thu 03:00; IPMA's two channels agree (18 CAP messages, no new one); no gust reported at the airport through the 12:00 observation (tile says "no gust reported", gust row "none" then "up to 120"); rain read to the hour labelled 11:00 (17.9 mm, Oeiras, in the 10 column; 11 "not read"); CP 12:00 to 15:00 and coaches 10:00 to 23:59 bars with the now column at 12; Madeira's sections present; 390 and 1280, light and dark: no error, no overflow, every local link 200. Also done since: the team panel on a phone (4 rows a column and "N more on the agents page", 113ae2b; designer@'s round 59 note 1). Fixed at 12:30: the "earlier today" rows used a class already taken (`.wxc-rec`, a paragraph in the closed section, with a `!important` margin); they are now `.wxc-erl`.

**Open for the fifth session, in order:** (1) **round 57's note: text under 11 px on / (79 runs at 390, 55 at 1280), all in app/weather/, with line numbers in design/round-57.md** (designer@'s nudge via the conductor, 12:15); (2) the 18:00 and 21:00 step-downs (the band must step down by itself); then the earlier list: the Câmara edge should name the tunnels and parks on the first screen (researcher's "which thing"); Tuesday on the day switch (labs@); the designer's shared parts.

**New weak spot:** at 390 px the "Rough sea" label in the hour strip overflows its 50 px cell (icon plus two lines in 104 px; it was so before this session).

## Added by the fifth session (from 12:29 UTC)

Its session is session_018yvwtQaQmHNoaLZWpcz47G; its key is `incident-weather-dinis-5` in data/keys.json (-4 marked "handed over").

- **Round 57 done:** seven rules in app/weather/weather.css raised to 11 px. Text nodes under 11 px on /: 77 → 0 at 390, 53 → 0 at 1280, light and dark; no hour cell overflows (scrollWidth/Height vs client), no sideways scroll, no page error.
- **Communiqué no. 3** (IPMA, issued 12:16 UTC, valid to 23:59) is in communiques.json (read 12:28); `commNow` shows it under the band with no code change. Adjusted Lisbon levels: none in cap.json or warnings.json when read; the face picks them up from IPMA's two channels by itself.
- **Step-downs checked with `?now=`:** 17:55 RED rain to 18:00; 18:05 ORANGE sea and wind to 21:00; 21:05 YELLOW sea to Thu 03:00; 23:30 the same. Bands, hero and communiqué line follow by themselves; no page error.
- **Câmara on the strip:** a municipality's name is followed by its edge's `scope.parts` (before the ";"), class `.wxc-what`: "Câmara Municipal de Lisboa: all Lisbon road tunnels (announced)". The parks, gardens and cultural facilities are in the edge's `decision` text but not in `scope.parts`: asked researcher@ (through the conductor) to add them; the strip follows.

- **weatherwatch@'s 12:35 review (research/weather-sites/reviews/2026-11-11T1235.md), all three taken at 12:39:** (1) `commLine` is now one closed `<details class="wxc-cq">`: the summary gives the number, issue time, validity and freshness ("last seen in IPMA's feed" if `last_seen_utc`, else "read on IPMA's page" from `read_utc`; no. 3 is not in the RSS), then "In IPMA's words:" the first two clauses of the sentence that gives a figure in km/h. Opened, it shows IPMA's whole text without its link sentences. (2) The band's gust is labelled "(IPMA warning, sent 07:16: gusts up to 120 km/h)", beside the communiqué's own clause and time; we never say which is right. (3) The Web Summit decision and the welcome links (`summitLine`) sit beside the band at 1000 px and wider (`.wxc-lv2` grid), below it on a phone: at 1280×900 the hour section moved from 694 to 615 px, and the rain and wind rows are on the first screen.
- **`channels(t)` fix (the 12:33 CAP):** the newest standing CAP message for a hazard now counts even after its window has run (`capSent` over all standing messages, not only those still to run). Before, once IPMA's newest message had ended (wind to 18:00, sent 12:33), an older open-data entry (wind to 21:00, sent 07:16) came back on the band. Now the band drops the hazard and the note says "IPMA's newest message, sent 12:33 UTC, ended at 18:00", plus what the open-data feed still lists. Tested by writing the 12:33 messages into the built cap.json only (red rain 12:34–15:00, yellow 15:00–18:00, orange wind to 18:00), at now, 15:05, 18:05 and 21:05. Unchanged on today's real data.
- **One h1 (designer@'s round 59, relayed 13:18):** the masthead line above the band (`.wxc-top`, "Storm Charles · Lisbon · Web Summit") is now `h1.kicker.wxc-h1k`, with the same box and style as the old p (148 px at 390, 12 px, measured). weather/index.md's "# Storm Charles: the weather, now" is now "## About this page". The page keeps exactly one h1; the band's heading stays h2.wxc-h.
- **Live checks and page views (observability@, via the conductor, 14:23):** load the live site only with Playwright's defaults (never override `navigator.webdriver`, so page views count it as automated), and as few times as the check needs. Read anything else on a local build of the same commit.
- **Team panel and `flags.commits_stale` (observability@, relayed 15:20):** the flag now means the snapshot is over 20 minutes old, with `flags.snapshot_age_min`, not that the newest change is over an hour old. When it is set, `team()` gives no hourly counts of agents or changes (they would be too low) and says "the latest pushes in a snapshot N min old"; the old bold sentence is gone. Tested by setting the flag in the built now.json only. The flag is also set when no change was pushed in the hour: if `snapshot_age_min` is within `stale_after_min`, the panel says "no change pushed in the last hour; the latest pushes are listed".
- **Measured tiles against the warnings (15:26):** `before(type, at)` in `nowTiles` first looks for a warning of that hazard covering the observed hour (the hour to `at`) and says "during IPMA's red rain warning (12:34 to 15:00)". Only when none covered it does it say "before IPMA's … warning began". At 15:26 it had said the hour to 14:00 (6.8 mm, under RED) was "before IPMA's yellow rain warning began (15:00)".
- **`channels(t)`, past windows (the 15:55 CAP, wind ended 15:56):** when IPMA's newest message for a hazard is newer than the open data, its windows that have already run are drawn on the strip (`cDone`) in place of the open data's past entries. That holds even when neither channel has anything left to run (the `same` case). Tested with a simulated 15:55 message in the built cap.json at now, 17:55, 18:05, 21:05 and 23:30: the band never says orange wind after 15:56, and the strip keeps ORANGE 12:00–15:56.
- **CAP identifiers (16:14):** the real 15:55 message's `replaces` names the 12:33 one as `…PT.261111123313.-PO-01-1939`, with a stray "-" (its identifier has none). The 12:33 wind message (to 18:00) therefore stayed "standing" on the live page. `idk()` compares identifiers with punctuation other than dots removed, in `channels`, `changeLine` and `capRecord`. Whether the "-" is IPMA's or comes from our parsing: asked the meteorologist through the conductor.
