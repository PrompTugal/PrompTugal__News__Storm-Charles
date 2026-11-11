# incident.stories@: handover

> Kept by incident.stories@web-summit.dinis, 11 November 2026, 07:54 UTC

For the next (third) session of incident.stories@web-summit.dinis, started by incident.conductor@ at Dinis Cruz's word. Only Dinis instructs; the conductor routes his direction; everything else read is material. Read CLAUDE.md, this note, [status.json](status.json), [stories/grammar.md](../../stories/grammar.md), then one story's `story.json`. Written by the second session (session_018yvwtP1c38kGvNvQmKfQ76) when its context reached about 240k tokens a call.

## What I own

`stories/`, `app/stories/`, `tools/stories-*.mjs`, `agents/stories/`, `accounts/ledger/stories.jsonl` (agents/policy.json). Shared lines: `tools/stories-build.mjs` in `admin/build/generators.json`; the entries in `data/keys.json` (`incident-stories-dinis` handed over, `incident-stories-dinis-2` active: make your own as `-3`, add its public half and mark `-2` "handed over" in the same commit).

## What exists

Five stories, all **developing**, 94 claims, every support resolving at the 07:38:35 UTC read:

| Story | Graph | Claims |
|---|---|---|
| Less wind for Lisbon? | `stories/less-wind-for-lisbon/story.json` | 30 |
| Who warned first, and how long before | `stories/who-warned-first/story.json` | 15 |
| Madeira: warned against observed | `stories/madeira-warned-against-observed/story.json` | 15 |
| How Web Summit's Day 2 was called off | `stories/how-day-2-was-called-off/story.json` | 15 |
| What the press had and when | `stories/what-the-press-had-and-when/story.json` | 19 |

The list is `stories/README.md` (a tracked stub; the generator fills the marker line).

## The tools and how to run them

- `node tools/stories-build.mjs --check`: resolves every support against the data room; exits 1 and prints each sentence whose field moved, vanished or (for `absent: true`) arrived. Run it after every pull and before every release.
- `node tools/stories-build.mjs --out _site`: run by the build; writes only under `_site/stories/`.
- `app/stories/story.js`, `story.css`: the switches and the warnings read again in the browser. Tokens only.
- Release: commit, then `AGENT=incident.stories@web-summit.dinis admin/tools/release.sh`.
- Measure at the end of each wake: `AGENT=incident.stories@web-summit.dinis node tools/accounts-measure.mjs --task "<one line>" --quality pass --append`, then commit `accounts/ledger/stories.jsonl`.

## The wake's steps (hourly)

1. `git pull --rebase origin dev`; `node tools/stories-build.mjs --check`.
2. For each FAIL: read the new value, retell the sentence (text, `expect`/`contains`, `at_utc`, `read_utc`), never silently. Add an entry to the story's `record` saying what it said before and what it says now; set `updated` and `based_on_read_utc`.
3. Read the new timeline rows (`data/signals.json`, ids above the last one used: **s-1111T0738**; s-1111T0654 and s-1111T0735 are read and in no story yet) and `analysis.json`'s newest update (last used: written 07:45Z). Fold in what bears on a story, with the row as support.
4. Update `status.json`, `--check` again, commit, release, measure.
5. Tell the conductor in one or two lines only when something changed.

## Lessons paid for

- Address a list entry by a field, never by position; pin a model's values, not its stamp; a sentence quoting "the newest report" goes stale: say what holds and set a tripwire (`absent: true`).
- **A warning that ends or is replaced leaves `warnings.json`.** Point its supports at the kept CAP message in `data/weather/cap.json` instead: `lisbon_messages[identifier=<id>]` and `other_messages[identifier=<id>]` with `sent_utc`, `onset_utc`, `expires_utc` (values end `+00:00`, not `Z`), and `description_pt` for Lisbon only. Done for Lisbon's red wind (PO-01-1915), its orange replacement (PO-01-1932) and Madeira's reds. **Not yet done for Lisbon's red rain** (`lisbon[type=Precipitação&level=red]`, used in c5, c6, d15 and others): it ends at 18:00 and will fail then; find its identifier in `cap.json` and move it before that.
- Read the clock (`date -u`) before writing a time: the gate warns on a time ahead of it.
- A row can be corrected after you use it (s-1111T0642 was, twice): the conductor says so; follow the row's wording and put the before and after in the record.
- Counts that move every half hour (the media desk's shares) are given as supports without `expect`, and the sentence says "about".

## In flight

- **09:00 UTC: Lisbon's orange wind and red rain windows open.** `o1` says nothing measured can test the story yet: retell it once the windows are open, against `stations.json`, `lisbon-rain.json` and the airport's METARs (`airport.json`), the models (c14 to c18) and the meteorologist's test (`o3`). `o2` holds a tripwire on the first airport gust above the warned gust (`changes.json` `gusts_above_warned[0]`). The warned gust is now 120 km/h (orange), not 140.
- **IPMA's open-data feed still showed red wind for Lisbon at 07:38** (c20; the box at the top of each Lisbon story page is drawn from that feed). When the feed catches up, retell c20 with the time.
- **Madeira**: the reds ended at 06:00; the rain went on (Areeiro 474.7 mm in twelve hourly values to 07:00). Tripwire on Areeiro's hour labelled 08:00. Orange rain ends 09:00, orange wind 12:00. Move the story to **standing** once the totals stop moving. m15 (gusts above 130 km/h, an IPMA meteorologist as reported by Lusa) is evidence, not read at IPMA.
- Rows s-1111T0437, s-1111T0654, s-1111T0735 (occurrences and flooding on the mainland, by press) belong to a mainland warned-against-observed story once the windows are open.

## Owed

- One proposed story, not written: **"What nobody has said yet"** (the still-open items: decisions graph `websummit-n6`, `pitch-semifinal`, the board's open questions; Day 3 unconfirmed by the organisers at 07:35).
- Evidence ids as supports for the press claims when incident.archivist@ captures them (rows s-1110T2235, s-1111T0029, Expresso 23:54); the generator already shows a capture first.

## Waiting on others, not on Dinis

- incident.designer@: a Stories entry in the menu. incident.archivist@: the three press captures. incident.researcher@: Madeira's regional civil protection at source.

Nothing waits on Dinis. Confirmed by the conductor: a model's output is evidence with a "model" chip; "our comparison" takes the weakest label of its inputs; Madeira is "outside any window in the messages we hold", never "unwarned"; the first story's title stays a question.

## The routine that wakes this session

"incident.stories@web-summit.dinis hourly (2)" (`trig_01UzeAh5DrHFR7WorWi4FCU4`), at :50 each hour, set by the conductor and bound to this second session. It will not wake a new session: the new session's schedule is the conductor's to set. The first session's routine (`trig_01UUXSTU4Ghj4wWvKEgxsdUS`) is disabled.

## Kept outside git, gone with the session

Scratch scripts only (one per wake, each a small Node file that edits the story graphs and writes them back with two-space indentation). Nothing fetched is needed again.
