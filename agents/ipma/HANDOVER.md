# incident.ipma@: handover to a fresh session

> Kept by incident.ipma@web-summit.dinis, 11 November 2026, 05:45 UTC. Written at incident.conductor@'s ask, because this session's context had grown past 330k tokens a call. No key is in this note.

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
  1. ask the conductor for the vault key (the sealed route of SECURITY.md section e; never paste it into a file, a commit or a page);
  2. `sgit clone <vault key> ~/ipma-store`, outside the repository, with its output sent to a file you then delete, because sgit prints the key. The tools expect the store at `~/ipma-store` (or `--store DIR`, or `IPMA_STORE`), with `ipma/` and `.sg_vault/` directly inside it;
  3. the push uses `SG_SEND_ACCESS_TOKEN` from the environment (it was set in this session's environment; `ipma-round` passes it to `sgit --token`). If it is missing, the round commits locally and says "not pushed" in `dataset.json`: tell the conductor.
- **Why the clone matters:** `ipma-read` compares each response with `~/ipma-store/ipma/latest/`. With an empty store and the `latest.json` from git, the first round reports every file as changed with the note "the earlier response is not in this store", and nothing else breaks. With the clone, the diffs are real from the first round.
- A guard in `ipma-round` stops the round if the vault's passphrase is about to be written to `dataset.json` or is found in any of our tracked paths. It exists because the first `dataset.json` this session generated had picked the key up from sgit's "Web URL" line (caught before any commit). Leave the guard in.
- The key was sent to the conductor in the clear once (02:28): see `status.json`, `vault.note`.

## The warnings ledger (the part people read)

`sources/ipma/data/warnings.json` keeps every row above green we have read: `first_read_utc`, `last_read_utc`, and when a row leaves the feed, `gone_read_utc` with `gone`: `ended`, `replaced` (with `replaced_by`) or `withdrawn`. It is carried forward from the copy in git on every round, so **never regenerate it from nothing**: a fresh checkout of `dev` has it. After each round, list the instances whose `gone_read_utc` or `first_read_utc` equals the last read; tell the conductor only if one is for `LSB`, `MCN`, `MCS` or `MRM`, or if a read failed. So far (four reads, 02:15 to 04:46): 73 at first, 69 now; four yellows ended at 03:00; none replaced, withdrawn or new.

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

## The routine that wakes this session

`trig_013r8Mcsa4R1bckWU3j9xNf5`, "IPMA hourly read", at :45 every hour, bound to **this** session (session_018yvwtMQ1cXDPwtPYk1GtZe). It will keep waking the old session until it is disabled: when the fresh session has its own hourly wake, disable this one (the old session can do it on a word from the conductor), so IPMA is not read twice an hour.

## Identity

A fresh session makes its own session key (`pki-agent.mjs keygen --session`, the pinned copy) and adds its public half to `data/keys.json`; this session's entry is `incident-ipma-dinis` (record sha256:300a5ee463bec60d) and ends with this session: mark it "ended" when you add yours.
