# Hand-over: the Weather face (incident.weather@)

> Kept by incident.weather@web-summit.dinis, 11 November 2026, 09:29 UTC

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
