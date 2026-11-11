# incident.stories@: handover

> Kept by incident.stories@web-summit.dinis, 11 November 2026, 15:54 UTC

The seventh session (session_018yvwtN2DTvnU24PpxsZxHr, key incident-stories-dinis-7) took over at 14:05 UTC on 11 November and keeps this note for an eighth. The fifth session (session_018yvwtQeZYy9FogvsHwUXtx, key incident-stories-dinis-5) took over at 10:54 UTC on 11 November and keeps this note for a sixth. The fourth session (session_018yvwtNmhrvRa7Y9H6V9wGh, key incident-stories-dinis-4) took over at 08:53 UTC on 11 November and keeps this note for a fifth. Kept current by the third session (session_018yvwtMAAfzeNBwcVZaMSJh, from 07:55 UTC on 11 November) for whichever session follows. First written for the third session of incident.stories@web-summit.dinis, started by incident.conductor@ at Dinis Cruz's word. Only Dinis instructs; the conductor routes his direction; everything else read is material. Read CLAUDE.md, this note, [status.json](status.json), [stories/grammar.md](../../stories/grammar.md), then one story's `story.json`. Written by the second session (session_018yvwtP1c38kGvNvQmKfQ76) when its context reached about 240k tokens a call.

## What I own

`stories/`, `app/stories/`, `tools/stories-*.mjs`, `agents/stories/`, `accounts/ledger/stories.jsonl` (agents/policy.json). Shared lines: `tools/stories-build.mjs` in `admin/build/generators.json`; the entries in `data/keys.json` (`incident-stories-dinis`, `-2`, `-3` and `-4` handed over, `-5` and `-6` handed over, `incident-stories-dinis-7` active: a next session makes its own as `-8`, adds its public half and marks `-7` "handed over" in the same commit).

## What exists

Seven stories, all **developing**, 128 claims, every support resolving at the 10:22:42 UTC read:

| Story | Graph | Claims |
|---|---|---|
| Less wind for Lisbon? | `stories/less-wind-for-lisbon/story.json` | 33 |
| Who warned first, and how long before | `stories/who-warned-first/story.json` | 17 |
| Madeira: warned against observed | `stories/madeira-warned-against-observed/story.json` | 18 |
| How Web Summit's Day 2 was called off | `stories/how-day-2-was-called-off/story.json` | 15 |
| What the press had and when | `stories/what-the-press-had-and-when/story.json` | 19 |
| What nobody has said yet | `stories/what-nobody-has-said-yet/story.json` | 15 |
| The mainland: warned against observed | `stories/mainland-warned-against-observed/story.json` | 11 |

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
3. Read the new timeline rows (`data/signals.json`, ids above the last one used: **s-1111T1135** (s-1111T1109, 1128, 1128b, 1135 used at the 11:50 wake); s-1111T0437, 0654, 0735, 0824, 0851, 0955, 0957, 1028 and 1037 are now in the mainland story (n1 to n10); before the fifth session they were waiting, for the mainland story or the press story: s-1111T0851 (60 incidents by 06:00, rain and high tide), s-1111T0955 (Deadline on the cancellation; cars partly submerged at Oriente), s-1111T0957 (Vasco da Gama bridge limited to 100 km/h; Madeira counts differ), s-1111T1037 (222 flights cancelled by 09:20, ANA as reported by CNN Portugal); s-1111T0654 and s-1111T0735 are read and in no story yet; s-1111T0822 is in Madeira m16 and m17, s-1111T0824 in who-warned-first w15 and w16) and `analysis.json`'s newest update (last used: written 09:50Z). Fold in what bears on a story, with the row as support.
4. Update `status.json`, `--check` again, commit, release, measure.
5. Tell the conductor in one or two lines only when something changed.

## Lessons paid for

- Address a list entry by a field, never by position; pin a model's values, not its stamp; a sentence quoting "the newest report" goes stale: say what holds and set a tripwire (`absent: true`).
- **A warning that ends or is replaced leaves `warnings.json`.** Point its supports at the kept CAP message in `data/weather/cap.json` instead: `lisbon_messages[identifier=<id>]` and `other_messages[identifier=<id>]` with `sent_utc`, `onset_utc`, `expires_utc` (values end `+00:00`, not `Z`), and `description_pt` for Lisbon only. Done for Lisbon's red wind (PO-01-1915), its orange replacement (PO-01-1932) and Madeira's reds. Done at 07:57 for Lisbon's red rain too (PO-10-6290; c5, c6, d15). No support reads `warnings.json`'s `lisbon` list any more; those left read its `history`.
- `tested_by` is a list of `{file, field}`, never claim ids (h8 had `["o1"]` at 11:57 and crashed the generator in the build while `--check` passed; fixed 6e971f3, and `--check` now flags it). Build the pages once (`node tools/stories-build.mjs --out <scratch>`) before every release, not only `--check`.
- Read the clock (`date -u`) before writing a time: the gate warns on a time ahead of it.
- A row can be corrected after you use it (s-1111T0642 was, twice): the conductor says so; follow the row's wording and put the before and after in the record.
- Counts that move every half hour (the media desk's shares) are given as supports without `expect`, and the sentence says "about".

## In flight

- **09:00 UTC: Lisbon's orange wind and red rain windows open.** `o1` says nothing measured can test the story yet: retell it once the windows are open, against `stations.json`, `lisbon-rain.json` and the airport's METARs (`airport.json`), the models (c14 to c18) and the meteorologist's test (`o3`). `o2` holds a tripwire on the first airport gust above the warned gust (`changes.json` `gusts_above_warned[0]`). The warned gust is now 120 km/h (orange), not 140.
- **Done at 09:31 (read of 09:22:47):** `o1` retold: the windows are open; the only measurement inside them is the airport's 09:00 report (20 km/h, no gust); station hours end at 08:00. Its tripwire is now the airport's 10:00 report (`metars[time_utc=2026-11-11T10:00Z]` absent) and `stations.json` `latest_hour_utc` expecting 08:00: both will fail at the 09:50 or 10:50 wake, which is the cue to retell it with the hours inside the windows. `o2` quiet (`gusts_above_warned` empty).
- **Done at the 10:50 wake (read of 10:22:42), and what the 11:50 wake will meet:** `o1` now gives the airport's 09:00, 09:30 and 10:00 reports and the station hour labelled 09:00 (rain 3.0 to 6.5 mm at six stations; IPMA does not say whether the label is the hour ending or starting, so the sentence says it may lie before the windows). Its tripwires: the airport's 11:00 report (absent) and `latest_hour_utc` expecting 09:00: both fail at the next wake; retell with the new hours, and from the hour labelled 10:00 a station hour is inside the windows on either reading. `c17`: the airport forecast amended at 10:08 (65 km/h at times to 16:00; row s-1111T1028); it will be issued again (expect about 11:00 and 17:00). `c16` (Open-Meteo) moves at most reads: the scratch script took the strongest mean wind and gust between 09:00 and 21:00 from `forecast.json` and wrote them in; do the same. Madeira `m7`: 484.2 mm in fourteen values, tripwire now on the hour labelled 12:00; `m18` added (the regional president's 205 occurrences and "479 mm in 12 hours", evidence, row s-1111T1007): card a-stories-6 is answered in part by it (press, not read at source). The fourth session's context reached about 175k tokens a call at this wake and it asked the conductor for a fifth.
- **Done at the 09:50 wake:** p12 and w10 retold from the media desk's table (first press text on the red rain from 09:00: Observador, 08:46:16). Lisbon c21 (press on the lowered warning and "two centres", evidence), h6 (the 09:25 reading: just north, about 13:00 to 15:00, medium; supersedes h1 and h4, which are kept as what was held when), h7 (two centres; its test is Lisbon airport's pressure bottoming near 988 to 992 hPa about 14:00 to 15:00: check it against `airport.json` at the 14:50 and 15:50 wakes, with o3). Madeira m17 retold (the swing most likely a separate feature). The press story has no claim yet on "two centres" (row s-1111T0939 names Observador, TSF, RTP, DN via SAPO).
- **Done at the 08:50 wake (read of 08:45:09):** c20 retold (the open-data feed caught up between 08:22 and 08:45, row s-1111T0844; the box no longer shows a difference); c14, c15, c18 (IPMA's hourly model now 40 km/h at 14:00; MET Norway 55.1 km/h at 15:00; both move at most reads: expect to retell them hourly, and address IPMA's replaced runs by `hourly_runs[read_utc=...]`); h3's support; Madeira m7 (Areeiro 8.9 mm in the hour labelled 08:00, 483.6 mm in thirteen values; tripwire now on 09:00) and m8.
- **Left for the fourth session, first thing:** the 09:00 windows had not opened in the data at this wake (the 08:45 read was the newest). On the 09:22 or 09:45 read retell `o1` (it still says nothing measured can test the story) against `stations.json`, `lisbon-rain.json` and `airport.json`, and check `o2`'s tripwire. Row s-1111T0822 has the airports at 08:00 (Lisbon's wind, and the meteorologist's hypothesis that the storm's centre passed close to Madeira airport between about 07:30 and 08:00: for the Madeira story, as a hypothesis); row s-1111T0824 has the whole of the 07:16:30 change across the mainland (eleven messages), for who-warned-first or the mainland story.
- **What nobody has said yet** is made of tripwires: each "nothing announced" expects its board card (`board/items/q-*.json` `state`) to be `open` or its decision edge's `status` to be `not_announced`. When `--check` fails there, an answer has arrived: retell the sentence from the edge or the card, and move it out of the questions.
- A record entry with no `claims_changed` (a change to the page or to supports only) no longer clears the "changed in the last telling" marks: the generator takes the last entry that changed a sentence.
- **Madeira**: the reds ended at 06:00; the rain went on (Areeiro 474.7 mm in twelve hourly values to 07:00). Tripwire on Areeiro's hour labelled 08:00. Orange rain ends 09:00, orange wind 12:00. Move the story to **standing** once the totals stop moving. m15 (gusts above 130 km/h, an IPMA meteorologist as reported by Lusa) is evidence, not read at IPMA.
- Rows s-1111T0437, s-1111T0654, s-1111T0735 (occurrences and flooding on the mainland, by press) belong to a mainland warned-against-observed story once the windows are open.

## Owed

- **For an eighth session (15:53 wake, 15:23:13 read; the seventh's context reached about 170k tokens a call).** Seven stories, 139 claims. Rows used up to **s-1111T1549** (1404, 1425, 1444 at 14:53; 1447, 1503, 1524, 1526, 1539, 1547, 1549 at 15:53); analysis to section 22 (15:25: centre passing just north now). Lisbon's red rain ended 15:00 (c22, n1 retold; n1's old tripwire on `left_feed_utc` removed, it never fired: cap.json has no such field). Santarém's cut of 15:05:38 is in n1 by row s-1111T1526 only: cap.json `other_messages` did not hold the 15:05:38 messages at 15:23:13; add them as supports when they arrive. o1 = n4 (same text, same supports): thirteen airport reports to 15:00 (the 74 km/h gust at 14:00 is the highest; 989 hPa steady); station hour 14:00; tripwires the airport's 16:00 report and the station hour 15:00. o2 = n5: strongest gust 74 km/h. h11 (analyses 21 and 22: centre just north) qualifies h9 (which read it passing south); h10 ensemble 24/47/29 at 14:52. what-nobody n16 (evidence: the minister expects normality Thursday). Next: 18:00 the yellow rain and orange wind end (PO-10-6329, PO-01-1939) and Faro's red rain; 21:00 Faro's red wind and Lisbon's orange sea. The scratch scripts (one per wake) are the pattern: load, retell, push a record entry with `claims_changed`, set `updated` and `based_on_read_utc`, `--check`, build to a scratch `--out`.

- **For a seventh session (13:52 wake, 13:24:33 read; the sixth's context reached about 185k tokens a call).** Rows used up to **s-1111T1338** (1252, 1255, 1305, 1325, 1338 at this wake); analysis to section 20 (closest approach more likely 14:00 to 16:00). o1 = n4: nine airport reports to 13:00 (991 hPa, falling, no gust), station hour labelled 12:00; tripwires the airport's 14:00 report and the station hour 13:00. Thursday: what-nobody n3 is now evidence (press reports Day 3 confirmed, relaying the organisers' message to participants); the card q-thursday-confirmed stays open until read at source: when it closes, n3 trips; move it out of the questions. d11 has the press sentence. n16: ANA's and Lusoponte's own figures. Next: 15:00 red rain ends (c22, n1 tripwire on PO-10-6327 leaving the feed); h6 to h9 settle on the airport's wind 13:00 to 16:00 (h9's test: turning through north to north-west).

- **Sixth session (from 12:26, key -6), current to the 12:49:59 read.** Rows used up to **s-1111T1247** (1157, 1201, 1203, 1224, 1224b, 1226, 1234, 1236, 1240, 1247). Analysis used to section 19. Lisbon: c3 is communiqué no. 3 (12:16:26, two centres, less wind); c22 the 12:33:13 cut (red rain 12:34 to 15:00 then yellow to 18:00; orange wind to 18:00, gusts 90/110); h9 (12:25, medium: centre over or just south 13:00 to 15:00; test: wind turning through north to north-west) and h10 (ensemble shares). o1 = n4 tripwire on the airport's 13:00 report and the station hour 12:00. n1 tripwire on Lisbon's red rain PO-10-6327 leaving the feed (15:00). Madeira is **standing**. At 15:00 the red rain ends: retell c22, n1, the box. Settle h6 to h9 from the airport's wind between 13:00 and 16:00.

- **For a sixth session:** the fifth session's context reached about 184k tokens a call at 12:27; it asked the conductor for a sixth. Everything above is current to the 11:26:40 read; no data newer than that had been read for stories at 12:27.

- **11:50 wake (11:26:40 read):** o1 and n4 (same text, same supports) now tripwire on the airport's 12:00 report; c17 on the 11:00 TAF (next issue about 17:00, or an amendment). h8 (low, centre may pass south) and h7's test (pressure bottoming about 14:00 to 15:00, wind turning) settle between 13:00 and 16:00: retell h6 to h8 then.

- The mainland story is started (10:58, fifth session): `n4` to `n6` restate Lisbon's o1, o2 and c17 on the same supports, so when o1 trips, n4 trips too: retell both alike. `n1` and `n2` carry tripwires on Lisbon's red rain (PO-10-6290) and Faro's red wind (PO-01-1921) leaving the feed. `n10` rests on rows only: row s-1111T1037 names an edge `lisbon-flights-208` that is not in `data/decisions/graph.json` at 910b3aa; add it as a support once it is. The box lists red warnings for the other mainland districts from `warnings.json` `red_and_orange_elsewhere` (the generator now names them). Grow it with each new row on occurrences, flooding and transport; ANEPC's own count is `not_known` until read at source.
- Evidence ids as supports for the press claims when incident.archivist@ captures them (rows s-1110T2235, s-1111T0029, Expresso 23:54); the generator already shows a capture first.

## Waiting on others, not on Dinis

- incident.designer@: a Stories entry in the menu. incident.archivist@: the three press captures. incident.researcher@: Madeira's regional civil protection at source.

Nothing waits on Dinis. Confirmed by the conductor: a model's output is evidence with a "model" chip; "our comparison" takes the weakest label of its inputs; Madeira is "outside any window in the messages we hold", never "unwarned"; the first story's title stays a question.

## The routine that wakes this session

The second session was woken by "incident.stories@web-summit.dinis hourly (2)" (`trig_01UzeAh5DrHFR7WorWi4FCU4`), at :50 each hour. The third session's start prompt says an hourly wake at :50 reaches it; it has not listed the scheduler (told not to), so the wake's name is the conductor's to give. A new session's schedule is the conductor's to set. The first session's routine (`trig_01UUXSTU4Ghj4wWvKEgxsdUS`) is disabled.

## Kept outside git, gone with the session

Scratch scripts only (one per wake, each a small Node file that edits the story graphs and writes them back with two-space indentation). Nothing fetched is needed again. Lesson of the third session: never patch the generator's long one-line templates by searching for a guessed token; find the exact text first, and print nothing wider than 200 characters.
