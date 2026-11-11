# incident.stories@: handover

> Kept by incident.stories@web-summit.dinis, 11 November 2026, 09:31 UTC

The fourth session (session_018yvwtNmhrvRa7Y9H6V9wGh, key incident-stories-dinis-4) took over at 08:53 UTC on 11 November and keeps this note for a fifth. Kept current by the third session (session_018yvwtMAAfzeNBwcVZaMSJh, from 07:55 UTC on 11 November) for whichever session follows. First written for the third session of incident.stories@web-summit.dinis, started by incident.conductor@ at Dinis Cruz's word. Only Dinis instructs; the conductor routes his direction; everything else read is material. Read CLAUDE.md, this note, [status.json](status.json), [stories/grammar.md](../../stories/grammar.md), then one story's `story.json`. Written by the second session (session_018yvwtP1c38kGvNvQmKfQ76) when its context reached about 240k tokens a call.

## What I own

`stories/`, `app/stories/`, `tools/stories-*.mjs`, `agents/stories/`, `accounts/ledger/stories.jsonl` (agents/policy.json). Shared lines: `tools/stories-build.mjs` in `admin/build/generators.json`; the entries in `data/keys.json` (`incident-stories-dinis`, `-2` and `-3` handed over, `incident-stories-dinis-4` active: a next session makes its own as `-5`, adds its public half and marks `-4` "handed over" in the same commit).

## What exists

Six stories, all **developing**, 113 claims, every support resolving at the 08:45:09 UTC read:

| Story | Graph | Claims |
|---|---|---|
| Less wind for Lisbon? | `stories/less-wind-for-lisbon/story.json` | 30 |
| Who warned first, and how long before | `stories/who-warned-first/story.json` | 17 |
| Madeira: warned against observed | `stories/madeira-warned-against-observed/story.json` | 17 |
| How Web Summit's Day 2 was called off | `stories/how-day-2-was-called-off/story.json` | 15 |
| What the press had and when | `stories/what-the-press-had-and-when/story.json` | 19 |
| What nobody has said yet | `stories/what-nobody-has-said-yet/story.json` | 15 |

The list is `stories/README.md` (a tracked stub; the generator fills the marker line).

## The tools and how to run them

- `node tools/stories-build.mjs --check`: resolves every support against the data room; exits 1 and prints each sentence whose field moved, vanished or (for `absent: true`) arrived. Run it after every pull and before every release.
- `node tools/stories-build.mjs --out _site`: run by the build; writes only under `_site/stories/`.
- `app/stories/story.js`, `story.css`: the switches and the warnings read again in the browser. Tokens only.
- `app/stories/channels.js`: the rule of the box at the top of a Lisbon story (the front page's `channels` in `app/weather/weather.js`: IPMA's newest message per hazard from `cap.json`, saying what the open data still lists). One file, run by the generator (through `vm`) and by the page, so the two cannot drift. If incident.weather@ changes its rule, change this file to match. The box lists only the levels in the story's `warnings_in_force.levels` (red), and a hazard on which the two channels differ.
- Release: commit, then `AGENT=incident.stories@web-summit.dinis admin/tools/release.sh`.
- Measure at the end of each wake: `AGENT=incident.stories@web-summit.dinis node tools/accounts-measure.mjs --task "<one line>" --quality pass --append`, then commit `accounts/ledger/stories.jsonl`.

## The wake's steps (hourly)

1. `git pull --rebase origin dev`; `node tools/stories-build.mjs --check`.
2. For each FAIL: read the new value, retell the sentence (text, `expect`/`contains`, `at_utc`, `read_utc`), never silently. Add an entry to the story's `record` saying what it said before and what it says now; set `updated` and `based_on_read_utc`.
3. Read the new timeline rows (`data/signals.json`, ids above the last one used: **s-1111T0844**; s-1111T0654 and s-1111T0735 are read and in no story yet; s-1111T0822 is in Madeira m16 and m17, s-1111T0824 in who-warned-first w15 and w16) and `analysis.json`'s newest update (last used: written 07:45Z). Fold in what bears on a story, with the row as support.
4. Update `status.json`, `--check` again, commit, release, measure.
5. Tell the conductor in one or two lines only when something changed.

## Lessons paid for

- Address a list entry by a field, never by position; pin a model's values, not its stamp; a sentence quoting "the newest report" goes stale: say what holds and set a tripwire (`absent: true`).
- **A warning that ends or is replaced leaves `warnings.json`.** Point its supports at the kept CAP message in `data/weather/cap.json` instead: `lisbon_messages[identifier=<id>]` and `other_messages[identifier=<id>]` with `sent_utc`, `onset_utc`, `expires_utc` (values end `+00:00`, not `Z`), and `description_pt` for Lisbon only. Done for Lisbon's red wind (PO-01-1915), its orange replacement (PO-01-1932) and Madeira's reds. Done at 07:57 for Lisbon's red rain too (PO-10-6290; c5, c6, d15). No support reads `warnings.json`'s `lisbon` list any more; those left read its `history`.
- Read the clock (`date -u`) before writing a time: the gate warns on a time ahead of it.
- A row can be corrected after you use it (s-1111T0642 was, twice): the conductor says so; follow the row's wording and put the before and after in the record.
- Counts that move every half hour (the media desk's shares) are given as supports without `expect`, and the sentence says "about".

## In flight

- **09:00 UTC: Lisbon's orange wind and red rain windows open.** `o1` says nothing measured can test the story yet: retell it once the windows are open, against `stations.json`, `lisbon-rain.json` and the airport's METARs (`airport.json`), the models (c14 to c18) and the meteorologist's test (`o3`). `o2` holds a tripwire on the first airport gust above the warned gust (`changes.json` `gusts_above_warned[0]`). The warned gust is now 120 km/h (orange), not 140.
- **Done at 09:31 (read of 09:22:47):** `o1` retold: the windows are open; the only measurement inside them is the airport's 09:00 report (20 km/h, no gust); station hours end at 08:00. Its tripwire is now the airport's 10:00 report (`metars[time_utc=2026-11-11T10:00Z]` absent) and `stations.json` `latest_hour_utc` expecting 08:00: both will fail at the 09:50 or 10:50 wake, which is the cue to retell it with the hours inside the windows. `o2` quiet (`gusts_above_warned` empty).
- **Done at the 08:50 wake (read of 08:45:09):** c20 retold (the open-data feed caught up between 08:22 and 08:45, row s-1111T0844; the box no longer shows a difference); c14, c15, c18 (IPMA's hourly model now 40 km/h at 14:00; MET Norway 55.1 km/h at 15:00; both move at most reads: expect to retell them hourly, and address IPMA's replaced runs by `hourly_runs[read_utc=...]`); h3's support; Madeira m7 (Areeiro 8.9 mm in the hour labelled 08:00, 483.6 mm in thirteen values; tripwire now on 09:00) and m8.
- **Left for the fourth session, first thing:** the 09:00 windows had not opened in the data at this wake (the 08:45 read was the newest). On the 09:22 or 09:45 read retell `o1` (it still says nothing measured can test the story) against `stations.json`, `lisbon-rain.json` and `airport.json`, and check `o2`'s tripwire. Row s-1111T0822 has the airports at 08:00 (Lisbon's wind, and the meteorologist's hypothesis that the storm's centre passed close to Madeira airport between about 07:30 and 08:00: for the Madeira story, as a hypothesis); row s-1111T0824 has the whole of the 07:16:30 change across the mainland (eleven messages), for who-warned-first or the mainland story.
- **What nobody has said yet** is made of tripwires: each "nothing announced" expects its board card (`board/items/q-*.json` `state`) to be `open` or its decision edge's `status` to be `not_announced`. When `--check` fails there, an answer has arrived: retell the sentence from the edge or the card, and move it out of the questions.
- A record entry with no `claims_changed` (a change to the page or to supports only) no longer clears the "changed in the last telling" marks: the generator takes the last entry that changed a sentence.
- **Madeira**: the reds ended at 06:00; the rain went on (Areeiro 474.7 mm in twelve hourly values to 07:00). Tripwire on Areeiro's hour labelled 08:00. Orange rain ends 09:00, orange wind 12:00. Move the story to **standing** once the totals stop moving. m15 (gusts above 130 km/h, an IPMA meteorologist as reported by Lusa) is evidence, not read at IPMA.
- Rows s-1111T0437, s-1111T0654, s-1111T0735 (occurrences and flooding on the mainland, by press) belong to a mainland warned-against-observed story once the windows are open.

## Owed

- A mainland "warned against observed" story from 12:00 UTC (see In flight).
- Evidence ids as supports for the press claims when incident.archivist@ captures them (rows s-1110T2235, s-1111T0029, Expresso 23:54); the generator already shows a capture first.

## Waiting on others, not on Dinis

- incident.designer@: a Stories entry in the menu. incident.archivist@: the three press captures. incident.researcher@: Madeira's regional civil protection at source.

Nothing waits on Dinis. Confirmed by the conductor: a model's output is evidence with a "model" chip; "our comparison" takes the weakest label of its inputs; Madeira is "outside any window in the messages we hold", never "unwarned"; the first story's title stays a question.

## The routine that wakes this session

The second session was woken by "incident.stories@web-summit.dinis hourly (2)" (`trig_01UzeAh5DrHFR7WorWi4FCU4`), at :50 each hour. The third session's start prompt says an hourly wake at :50 reaches it; it has not listed the scheduler (told not to), so the wake's name is the conductor's to give. A new session's schedule is the conductor's to set. The first session's routine (`trig_01UUXSTU4Ghj4wWvKEgxsdUS`) is disabled.

## Kept outside git, gone with the session

Scratch scripts only (one per wake, each a small Node file that edits the story graphs and writes them back with two-space indentation). Nothing fetched is needed again. Lesson of the third session: never patch the generator's long one-line templates by searching for a guessed token; find the exact text first, and print nothing wider than 200 characters.
