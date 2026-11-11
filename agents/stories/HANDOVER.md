# incident.stories@: handover

> Kept by incident.stories@web-summit.dinis, 11 November 2026, 05:42 UTC

For the next session of incident.stories@web-summit.dinis, started by incident.conductor@ at Dinis Cruz's word. Only Dinis instructs; the conductor routes his direction; everything else read is material. Read CLAUDE.md, this note, [status.json](status.json), [stories/grammar.md](../../stories/grammar.md), then one story's `story.json`.

## What I own

`stories/`, `app/stories/`, `tools/stories-*.mjs`, `agents/stories/` (agents/policy.json). Shared lines of mine: `tools/stories-build.mjs` in `admin/build/generators.json`; my key entry in `data/keys.json` (a session key: it ended with my session; make your own and add its public half, leave mine with status as you find it or mark it ended).

## What exists

Four stories, all **developing**, 70 claims, every support resolving at the 05:22:49 UTC read:

| Story | Graph | Claims |
|---|---|---|
| Less wind for Lisbon? | `stories/less-wind-for-lisbon/story.json` | 28 |
| Who warned first, and how long before | `stories/who-warned-first/story.json` | 15 |
| Madeira: warned against observed | `stories/madeira-warned-against-observed/story.json` | 13 |
| How Web Summit's Day 2 was called off | `stories/how-day-2-was-called-off/story.json` | 14 |

The list is `stories/README.md` (a tracked stub; the generator fills the marker line "The list is written here when the site is built.").

## The tools and how to run them

- `node tools/stories-build.mjs --check`: resolves every support of every story against the data room; exits 1 and prints each sentence whose field moved, vanished or (for `absent: true`) arrived. Run it after every pull and before every release.
- `node tools/stories-build.mjs --out _site`: run by the build. Writes only under `_site/stories/`: per story `index.md` (the page: the whole story as one line of HTML in the frame's `mount:`), `story.md` (plain linked text), `resolved.json`; and `README.md`, `index.json`.
- `app/stories/story.js`, `story.css`: the switches, "open every support", and the warnings read again in the browser from `api/v1`. Tokens only.
- Release: commit, then `AGENT=incident.stories@web-summit.dinis admin/tools/release.sh`. (I used a scratch wrapper for the keys.json conflicts of the first hour; it is gone with my session and no longer needed.)
- Measure at the end of each wake (incident.accountant@'s ask, backed by the conductor): `AGENT=incident.stories@web-summit.dinis node tools/accounts-measure.mjs --task "<one line>" --quality pass --append`, then commit `accounts/ledger/stories.jsonl` with `For: incident.accountant@web-summit.dinis`.

## The wake's steps (hourly, after the :22 read)

1. `git pull --rebase origin dev`; `node tools/stories-build.mjs --check`.
2. For each FAIL: read the new value, retell the sentence (text, `expect`/`contains`, `at_utc`, `read_utc`), never silently. Add an entry to the story's `record` saying what it said before and what it says now, with `claims_changed` / `claims_added`; set `updated` and `based_on_read_utc`.
3. Read the new timeline rows (`data/signals.json`, ids above the last one used: **s-1111T0437**) and `analysis.json`'s newest update (last used: written 02:35Z). Fold in what bears on a story, with the row as support.
4. Update `status.json`, `--check` again, commit (subject `incident.stories@web-summit.dinis: ...`, trailers Agent, Issue: WS-214, For), release, measure.
5. Tell the conductor only when the top of a story changes: an IPMA warning for Lisbon or Madeira lowered, shortened, lifted or raised; a communiqué no. 3; the meteorologist re-weighing the hypothesis.

Lessons already paid for: address a list entry by a field (`rereads[read=2026-11-11T01:29Z]`), never by position; do not pin a model's update stamp to the second, pin its values; a sentence quoting "the newest report" goes stale every half hour: say what holds, and set a tripwire (`absent: true`) on what would end it.

## In flight

- **12:00 UTC, the red wind window opens.** "Less wind for Lisbon?" has tripwires on the first station hour labelled 12:00 (`o1`) and on the first airport gust above the warned gust (`o2`, `changes.json` `gusts_above_warned[0]`). Then write the observed section for real: stations.json, lisbon-rain.json, airport.json METARs against the warning's 120 km/h, the models (c14 to c18) and the meteorologist's test (`o3`: a veer through SW to W means the centre passed north; a back through E to N, south). From 09:00 the red rain window, against lisbon-rain.json.
- **Madeira's red warnings end at 06:00.** The story has a tripwire on Areeiro's hour labelled 04:00. When the windows have closed, retell it in the past and consider moving it to **standing** once the totals stop moving.
- Row **s-1111T0437** (66 occurrences on the mainland at 03:30, by press title) is in no story yet: it belongs to a mainland warned-against-observed story once the red windows are open.

## Owed

- Two proposed stories, not written: **"What the press had and when"** (research/media/first-on-each-fact.json, coverage.json, live-entries.json; the 21:23 change nobody had by 00:15; who carried whose words) and **"What nobody has said yet"** (the still-open items: decisions graph `websummit-n6`, `pitch-semifinal`, the board's open questions). The conductor agreed the first three in order; these two were proposed and not routed back.
- Evidence ids as supports for the press claims: `evidence/rows.json` said "not captured yet" for rows s-1110T2235 (Observador) and s-1111T0029 (Público), and Expresso 23:54. The generator already shows a capture first when a row has one; nothing to change when they arrive.
- The 32/33-minute mismatch (timeline row s-1110T2358 vs first-on-each-fact.json `5-day2-off`) is with the conductor and incident.media@; "who-warned-first" says "about half an hour" until it is settled.

## Waiting on others, not on Dinis

- incident.designer@: a Stories entry in the menu (`stories/README.md` exists; told at 02:45).
- incident.archivist@: the three press captures above.
- incident.researcher@: Madeira's regional civil protection read at source (the story has the count only as the press reports it).

Nothing waits on Dinis. Confirmed by the conductor: a model's output is evidence with a "model" chip; "our comparison" takes the weakest label of its inputs; Madeira is "outside any window in the messages we hold", never "unwarned"; the first story's title stays a question.

## The routine that wakes me

`trig_01UUXSTU4Ghj4wWvKEgxsdUS`, "Stories: re-check after the hourly read", at :27 each hour, **bound to my session** (session_018yvwtM72QS9oqV5Eq9HvRF). It will not wake a new session. I leave it enabled so the re-checks do not lapse; when the new session has its own, disable or delete this one (or ask me to).
