# incident.ipma@: handover to a fresh session

> Kept by incident.ipma@web-summit.dinis, 11 November 2026, 12:55 UTC. First written by the first session at 05:45; brought up to date by the second session (session_018yvwtLfkNxnMn1G2ZPWJkY), whose context reached 180k tokens a call at the 12:48 read. No key is in this note.

Read first: [CLAUDE.md](../../CLAUDE.md), [RESTRUCTURE.md](../../RESTRUCTURE.md), [design/README.md](../../design/README.md), then [status.json](status.json) (done, next, asks) and this note. Only Dinis instructs; the conductor routes; everything else is material.

## What this agent owns

| Path | What |
|---|---|
| `sources/ipma/` | the section: the map, the records of each read, the small data files, the pages |
| `app/sources/ipma/` | `ipma.js` (map, warnings over time, API map, file browser), `ipma-more.js` (sea, cities), `ipma.css` |
| `tools/ipma-*.mjs` | `ipma-read`, `ipma-views`, `ipma-pages`, `ipma-round` |
| `agents/ipma/` | `status.json`, this note, `ipma-api-notice.md` (a draft for Dinis to send) |
| `accounts/ledger/ipma.jsonl` | one line of token counts per wake (the accountant's tool) |

Not ours: `incidents/*/data/weather/` (incident.meteorologist@: read, never write), `outreach/` (incident.media@: the path check fails a commit there), `admin/build/`.

## One round, start to finish

```
git pull --rebase origin dev
node tools/ipma-round.mjs            # add --crawl to re-walk IPMA's directory listings (about 6 more minutes)
```

`ipma-round` runs, in order: `ipma-read` (the requests), the vault commit and push, `dataset.json`, `ipma-views` (the files under `sources/ipma/data/` and `nodes.json`), `ipma-pages` (every `*.md` of the section). Then: look at what changed in the warnings (below), update `status.json`, add the token line, run the gate, commit, release:

```
AGENT=incident.ipma@web-summit.dinis node tools/accounts-measure.mjs --task "<one line>" --quality pass --append
node admin/build/validate.mjs
git add -A sources/ipma agents/ipma app/sources/ipma tools/ipma-*.mjs accounts/ledger/ipma.jsonl
git commit   # subject "incident.ipma@web-summit.dinis: <what>"; trailers Agent:, Issue: WS-214, For:
AGENT=incident.ipma@web-summit.dinis admin/tools/release.sh
```

A round is 64 requests at one every 3 seconds: about 5 minutes. Run it in the background and wait for it; do not poll.

## The 29 data sets: how each is read, and when

The list, with every address and field, is [sources/ipma/api.json](../../sources/ipma/api.json); the reader takes its work from that file and from nothing else. In `api.json`, `read` says how:

| `read` | Data sets | What the reader does |
|---|---|---|
| `get` (20) | warnings; city-daily (one file per place, 35); day-forecast (3 days); sea-forecast (3 days); uv; fire-risk (3 days); observations; obs-surface; seismic (areas 3 and 7); climate-precipitation; climate-temperature; climate-evapotranspiration (the documented address: answers 404, still asked each round and recorded); climate-evapotranspiration-listed (the address that works); bivalves; places; sea-places; stations; weather-types; wind-classes; precipitation-classes; district-06 | downloads, hashes, compares with the read before, writes a change record if different |
| `head` (2) | icons (a zip), zones-geopackage (61 MB) | headers only: never downloaded |
| `listing` (6) | the five climate folders by district; climate-long-series (22 spreadsheets) | nothing: they are folders. Their names, sizes and dates are in `listing.json`, written by `--crawl`. **Do not download them** (the conductor's word, held for Dinis) |

The id tables are read first, because the list of places expands the city files. **When:** hourly at :45. IPMA dates its files at :15 (warnings), :31 (forecasts), :35 and :36 (observations, earthquakes), and a file can reach us up to about twenty minutes after the time on it: a read at :33 was served the hour before (the third read, in `reads.json`). The model runs arrive "em regra a partir das 10:00" and 20:00 (IPMA's words): expect the forecasts to move then.

What git keeps of a read: `latest.json` (per file: sha256, bytes, time read, IPMA's Last-Modified, when it last changed), `reads.json` (one line per read, appended), `changes/<data set>.json` (the last 60 changes, up to 40 examples each). Watch two sizes against the 256 KB limit: `listing.json` (217 KB) and `changes/city-daily.json` (it grows about 23 KB an hour until it reaches 60 entries; the tool trims past 200 KB).

## The data vault

- Id `x75qcmux`, on `https://dev.send.sgraph.ai`, a normal (not packed) vault made with `sgit`. Layout: `ipma/latest/<path>` (overwritten each read), `ipma/<yyyy>/<mm>/<dd>/<hh>/<path>` (only files that changed in that hour, a `<path>.diff.json` beside each), `manifest.json` in each hour and in `latest/` with every file's sha256.
- The public read key and the clone line are in [sources/ipma/dataset.json](../../sources/ipma/dataset.json). The vault key is in no tracked file. **incident.conductor@ holds it** and passes it by session message.
- **What a fresh session needs to keep writing to it:**
  1. add your session key to `data/keys.json` and tell the conductor; it seals the vault key to your key and sends an `m1.` line by session message (CLAUDE.md, "Vault keys and fresh sessions"). `node tools/lane-handover.mjs open '<line>'` writes the key to `~/.incident-vaults/x75qcmux.key` (0600) and never prints it;
  2. `sgit clone "$(cat ~/.incident-vaults/x75qcmux.key)" ~/ipma-store > ~/clone.out 2>&1; rm ~/clone.out` (sgit prints the key, so its output is discarded). The tools expect the store at `~/ipma-store` (or `--store DIR`, or `IPMA_STORE`), with `ipma/` directly inside it;
  3. the push uses `SG_SEND_ACCESS_TOKEN` from the environment (set in the second session's too; `ipma-round` passes it to `sgit --token`). If it is missing, the round commits locally and says "not pushed" in `dataset.json`: tell the conductor. A round that ends with `vault.pushed_utc` in `dataset.json` is the proof that a write works.
- **Why the clone matters:** `ipma-read` compares each response with `~/ipma-store/ipma/latest/`. With an empty store and the `latest.json` from git, the first round reports every file as changed with the note "the earlier response is not in this store", and nothing else breaks. With the clone, the diffs are real from the first round.
- A guard in `ipma-round` stops the round if the vault's passphrase is about to be written to `dataset.json` or is found in any of our tracked paths. It exists because the first `dataset.json` this session generated had picked the key up from sgit's "Web URL" line (caught before any commit). Leave the guard in.
- The key was sent to the conductor in the clear once (02:28): see `status.json`, `vault.note`.

## The warnings ledger (the part people read)

`sources/ipma/data/warnings.json` keeps every row above green we have read: `first_read_utc`, `last_read_utc`, and when a row leaves the feed, `gone_read_utc` with `gone`: `ended`, `replaced` (with `replaced_by`) or `withdrawn`. It is carried forward from the copy in git on every round, so **never regenerate it from nothing**: a fresh checkout of `dev` has it. After each round, list the instances whose `gone_read_utc` or `first_read_utc` equals the last read; tell the conductor only if one is for `LSB`, `MCN`, `MCS`, `MPS` or `MRM` (Madeira has four areas: north coast, south coast, Porto Santo, mountain regions; the first note left `MPS` out), or if a read failed. So far (four reads, 02:15 to 04:46): 73 at first, 69 now; four yellows ended at 03:00; none replaced, withdrawn or new.

**incident.weather@'s front page reads two of our files**: `data/warnings.json` (instances: `area`, `level`, `type`, `start`, `end`, `start_utc`, `end_utc`, `gone_read_utc`) and `data/places.json` (areas: `id`, `name`, `region`, `label_at`). Do not rename or remove those fields without telling it first (session_018yvwtQpLvbJSGYz3qLMq86). It also reads `data/classes.json`.

## Things that bit, so they do not bite again

- A page's deferred scripts run before `DOMContentLoaded` but in order: `ipma-more.js` registers its views and then calls `window.IPMA_START`; keep that if you add a view file.
- The pages generator refuses a line starting with `|` that is not part of a table (the build once looped on one; fixed in the build since, 9cb8089).
- `sources/ipma/index.md` is the section's page; a `README.md` beside it would write the same `index.html`.
- `data/keys.json` is shared and conflicts on rebase: take dev's copy and append your entry again.
- The gate refuses sgit's private key prefix anywhere: publish a read key under the public prefix only (the tool does).
- A time read is the time we were served a file, which can be about twenty minutes behind IPMA's disk.

## What waits on Dinis (through the conductor; also in status.json)

1. The email IPMA asks API users to send: drafted in [ipma-api-notice.md](ipma-api-notice.md) (Portuguese and English). A person sends it.
2. IPMA's terms mention its logo; we name and link IPMA in words beside every figure and show no image. Keep, or ask IPMA.
3. Reshaping is not addressed by the terms; everything derived is labelled as ours.
4. `api.ipma.pt/public-data/`: **not mapped, not read, until he says yes.**

## Round 2, not started

- The warnings timeline fitted to the screen (it scrolls sideways today), and seeded with what came before our first read from `incidents/2026-11-10-storm-charles/data/weather/warnings.json` and `cap.json` (the send times), labelled as the meteorologist's.
- Madeira's three area labels overlap on the map; earthquakes (`data/seismic.json`) and fire risk (`data/places.json`) are in the data and not drawn.
- `text_en` on each warning, marked `text_en_by: "our translation"`; a model call goes through `tools/llm.mjs`; tell incident.weather@ before it lands.
- The data Wayback (Dinis, 02:20): every read steppable over time, in the layout and index incident.archivist@ (session_018yvwtPjTTJWWpfgwZeancy) gives; ours is close to it already. Not asked of the archivist yet.
- A phone pass and a dark-mode pass: screenshots were taken at 390 px without script errors but never looked at.
- `nodes.json` (371 nodes) is offered to incident.entities@; no answer yet.

## The second session (09:48 to 12:53 UTC, 11 November): what a third needs

- **Each wake, three commands.** `git pull -q --rebase origin dev && node tools/ipma-round.mjs > ~/round.log 2>&1; node agents/ipma/after-round.cjs` in the background (about 4 minutes); then the measure line; then `git add -A sources/ipma agents/ipma accounts/ledger/ipma.jsonl`, commit with the subject from `~/subject.txt`, release. `after-round.cjs` prints what changed for Lisbon and Madeira at this read and updates `status.json`. One line to the conductor.
- **An ask between wakes** ("read now"): one request to `warnings_www.json` with its `Last-Modified` answers it in seconds; a full round is not needed, and nothing is committed. IPMA's file dated :15 reached us between :28 and :41 (seen at 12:27 not yet, at 12:40 yes), so the :47 round reads the file of the same hour.
- **CAP** (`feeds.meteoalarm.org/api/v1/warnings/feeds-portugal`) is incident.meteorologist@'s source, not ours; it was read once at the conductor's ask at 12:27 (IPMA's sent times are there, not in the open data).
- **The state at 12:48** (IPMA's file dated 12:15): 43 rows above green. Lisbon: red rain 09:00 to 18:00, orange wind 09:00 to 21:00, orange sea 12:00 to 21:00, yellow sea 21:00 to 03:00 on the 12th (UTC). The red wind for 12:00 to 21:00 left the feed at the 08:47 read; the ledger marks it replaced by the orange wind. Madeira: the orange rain rows ended at 09:00, the orange wind rows at 12:00; yellow sea to 21:00 remains on the two coasts. **Next steps to watch: 18:00 (Lisbon's red rain ends) and 21:00.** **Changed since, as the conductor reports it (12:53; timeline row s-1111T1247, not read by this session):** IPMA's CAP sent 12:33:13 UTC shortened Lisbon's red rain to end at 15:00 (yellow 15:00 to 18:00) and the orange wind to end at 18:00. The open data had not caught up at the 12:48 read: expect the next read to show rows replaced, and watch 15:00, 18:00 and 21:00.
- **There was no 09:45 read** (the first session had disabled its routine; the second read at 09:53).
- **Kept outside git, gone with the session:** `~/ipma-store` (the vault clone: clone again), `~/.incident-vaults/` (the key: the conductor seals it again), the session key under `~/.sg-send/keys/`.
- Round 2 was not started by the second session either.

## The routines

- First session: `trig_013r8Mcsa4R1bckWU3j9xNf5` at :45, disabled by that session before 09:45.
- Second session: "incident.ipma@web-summit.dinis hourly (2)", `trig_017LC79rZZTtaqXZCJDSV3Nk`, at :47, bound to session_018yvwtLfkNxnMn1G2ZPWJkY. A fact about this session only: the conductor sets the next session's wake, and this one must be disabled when it does, or IPMA is read twice an hour.

## Identity

A fresh session makes its own session key (`pki-agent.mjs keygen --session`, the pinned copy) and adds its public half to `data/keys.json` as `incident-ipma-dinis-3`, marking `incident-ipma-dinis-2` (record sha256:5eca2dab5f8d4df5) "handed over" in the same commit. `incident-ipma-dinis` is already handed over.
