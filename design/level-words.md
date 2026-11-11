# A warning's level written in fixed words: the search of 09:25 UTC on 11 November

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 09:26 UTC

**Why.** At 07:16:30 UTC on 11 November IPMA lowered Lisbon's wind warning from red to orange (09:00 to 21:00; row [s-1111T0738](../incidents/2026-11-10-storm-charles/timeline.md), the whole change in row s-1111T0824). The red rain warning (09:00 to 18:00) stands. Any page that still says "red wind" for Lisbon **as a present fact** is wrong since then. A dated record that said so when it was true is right to keep it.

**How.** One search of the 1,802 tracked files that are served (not `admin/`, not `evidence/`, not the ledgers), for a level beside a hazard in English and Portuguese ("red wind", "red warning for wind", "both reds", "two red warnings", "aviso vermelho ... vento" and their variants): 170 files matched; each was read at the matching line. The rule the pages that are right follow: **a level, an hour or a figure of a warning is read from `warnings.json` or `cap.json` when the page is drawn, or it is written with the time it was true.**

## Wrong as present fact (4 pages)

| Page | What it says | Owner | The line sent |
|---|---|---|---|
| `app/storm.js` line 265 (the dashboard's wind chart, `incidents/2026-11-10-storm-charles/index.html`) | "Red band: the red wind warning." The band is drawn from the data and is no longer there. | incident.dev@ (shared with the designer) | **Fixed in this commit**: "Tinted band: IPMA's red wind warning for Lisbon, for as long as its open data lists one". Its fill is `--bad-soft`, a token for states of things we run: `color-mix(in srgb, var(--red) 18%, transparent)` is the one for an IPMA level. |
| `entities/hazard/high-winds.json`, `summary` | "What IPMA's red wind warning warns of" | incident.entities@ | Say "IPMA's wind warning (red when sent on 10 Nov 07:18, orange since 11 Nov 07:16)" or leave the level out. And where `warning/ipma-red-wind` is listed by name, show its `status` ("superseded") beside the name: the name alone reads as in force. |
| `agents/media/status.json`, `state` | "the storm arrives today (IPMA: red rain in Lisbon from 09:00, red wind from 12:00)" | incident.media@ | The wind is orange 09:00 to 21:00 since 07:16; the state line is shown in the team console as now. |
| `help/labels.md` line 9 | the example of a fact: "A red wind warning, read from IPMA's own data." | incident.librarian@ | An example, but a reader on Wednesday takes it for today's: "A red rain warning" is true all day, or give no level. |

## Dated, and right to keep, but a newcomer reads them as now (5 owners)

One line each would do: the date beside the claim, or "lowered to orange at 07:16 on 11 Nov".

| Page | What it says | Owner |
|---|---|---|
| `incidents/2026-11-10-storm-charles/data/weather/analysis.md` section 1 and `analysis.json` (`wednesday_lisbon.why`, `lead_times[].warning`) | "the worst window is 12:00 to 18:00, when IPMA's two red warnings overlap"; "red wind 12:00-21:00". Written 10 Nov 19:05; the addendum of 11 Nov 07:45 has the lowering, 250 lines further down. The dashboard prints the first block with its hour but not its day. | incident.meteorologist@ |
| `agents/media/HANDOVER.md` line 59, `agents/social/HANDOVER.md` line 41, `agents/weatherwatch/HANDOVER.md` line 63 | "red wind in Lisbon from 12:00" as what to expect today (written 03:28 to 05:20) | incident.media@, incident.social@, incident.weatherwatch@ |
| `research/weather-sites/sites/ipma-avisos.md` line 60 (written by `tools/pages.py`) | "Lisbon's red rain and red wind warnings for 11 November are drawn here" (as read 03:39) | incident.weatherwatch@ |
| `incidents/2026-11-10-storm-charles/comms/facts.md` (F1), `comms/dinis.md`, `material/wednesday-is-off-what-now.md` | "Red wind, Lisbon district, Wednesday 12:00 to 21:00" under "facts as of 20:02 UTC, 10 November" | incident.conductor@ (nothing to change: the heading dates them; if a draft is built from F1 today it must be re-read) |

## Right as they are

The timeline's rows and `data/signals.json`; `news/`; `library/releases/`; the stories (all five retell the lowering or date the sending: "IPMA sent the red wind warning on Tuesday at 07:18"); `entities/warning/ipma-red-wind.json` (its `status` is "superseded"); the entities' quotes of dated rows; `models/` (the evals' fixtures and the models' answers); `shadow/` (dated rows); `research/media/`, `research/social/`, `research/wikipedia/` (what outlets said, with when); `data/query/README.md` and `app/labs/timelines.js` ("red wind sent", 10 Nov 07:18); `sources/meteoalarm/` (other districts' messages); `design/round-*.md`; `BRIEF.md` (Dinis's words).

The front page, the data room's front page, the stories' index and the labs read the level from the data: nothing found there.
