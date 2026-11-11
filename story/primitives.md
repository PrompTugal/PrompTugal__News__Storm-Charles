> Kept by incident.storyteller@web-summit.dinis, 2026-11-11, 10:15 UTC. A proposal to incident.motion@web-summit.dinis, which turns it into `data/flows/schema.json`; where the two differ, the schema is the format and this page is the reading.

# The primitives

Dinis asked for the team's work drawn the way a threat model or an architecture flow is drawn: "who's involved in this? And then you have little icons for them. And then you connect the dots" ([BRIEF.md](../BRIEF.md), ~10:10). Every path in [paths/](paths/README.md) is told with only these words: **actors** do **steps** on **things**, at a time, and every step points at the record it rests on.

## Actors: who

| Kind | Glyph | What it is | Where the record names it |
|---|---|---|---|
| `person` | `person` 🧑 | Dinis: the one person who instructs | [BRIEF.md](../BRIEF.md) ("Dinis, <day>, ~<time> UTC"); the conductor's commits that carry his word |
| `agent` | its own (see [cast](cast.md)) | a role with a name and paths it owns: `incident.<role>@web-summit.dinis` | [agents/JOBS.md](../agents/JOBS.md), [agents/policy.json](../agents/policy.json) |
| `session` | `session` ◐ (the agent's glyph, numbered) | one generation of an agent: one context, one key, from its first commit to its hand-over | [data/keys.json](../data/keys.json) (`id`, `status`: active, handed over, ended) |
| `outside` | its own (IPMA ⚠️, Web Summit 🎤, the press 📰, readers 👀, MeteoAlarm 🚨) | a body that decides, warns, reports or reads, outside the team | the sources and captures it is read from |
| `machine` | `factory` 🏭 (CI), `vault` 🔐 (SG/Send), `clock` ⏰ (the schedule) | something that runs without judgement: builds, stores, wakes | `.github/` (CI), `data/vaults.json`, the wake's trigger |

An agent is drawn once; its sessions hang from it like beads on a string, one per key. A path that crosses a hand-over shows the bead change and the agent stay.

## Things: what

| Thing | Glyph | What it is | Its address in the record |
|---|---|---|---|
| `commit` | `dot` ● | one change to the repository, by one agent | the short hash (8 hex), its `Agent:` and `For:` trailers |
| `file` | `page-corner` 📄 | a tracked file | its path |
| `page` | `window` 🗔 | a page on the live site | its URL path (every `*.md` is a page beside it) |
| `dataset` | `table` ▦ | a JSON under `incidents/*/data/` or `data/`, served at `api/v1/` | its path and sha256 in `api/v1/index.json` |
| `release` | `tag` 🏷 | a version CI built, gated, deployed and tagged: `v<series>.<run>` | the tag, `version.json` |
| `vault` | `vault` 🔐 | an SG/Send vault: captures, model calls, page views | a pointer and a sha256 in git (`data/vaults.json`) |
| `key` | `key` 🔑 | a session's public key; or a vault key, sealed, travelling through a lane | [data/keys.json](../data/keys.json); the conductor's lane |
| `ask` | `question` ❓ | one agent asking another (or Dinis) for something | a commit with `For:`; `asks` in `agents/<role>/status.json` |
| `board item` | `pin` 📌 | an open question tracked to its evidence | [board/](../board/) |
| `signal` | `bolt` ⚡ | a row of the incident's timeline: a decision, warning or reading at a minute | `s-<MMDD>T<HHMM>` in `incidents/*/timeline.md`, `data/signals.json` |
| `brief` | `scroll` 📜 | Dinis's words as the conductor took them down | a section of [BRIEF.md](../BRIEF.md) |
| `hand-over note` | `baton-pass` 🤝 | what a session leaves for the next | `agents/<role>/HANDOVER.md`, `handover` in `status.json` |

## Steps: what happens

Each step is a verb with an actor, an object, a time (UTC, to the minute or better), and the record it rests on. The verbs:

| Step | Who → what | Rests on |
|---|---|---|
| `wake` | session (or the clock, or Dinis) → session | the first commit of a wake; a wake log line; the time in `status.json` |
| `read` | session → file, page, dataset or outside body | the file or URL read and the UTC time read (the content rules require both) |
| `write` | session → file | the file, in the next commit |
| `commit` | session → commit | the hash, subject `<agent>: <what>`, trailers |
| `push` | session → dev | `admin/tools/release.sh` ("pushed <hash> by <agent>") |
| `release` | CI → release | the run, the tag `v<series>.<run>`, push-to-served in the run's summary |
| `publish` | CI → page or dataset | the served path; `api/v1/index.json` |
| `capture` | session → vault | the pointer and sha256 committed |
| `hand-over` | session n → session n+1 | the old key's status `handed over`, the new key added, `HANDOVER.md` |
| `seal` | session → key (to another's public key) | `tools/lane-handover.mjs seal --via-lane`; the lane entry |
| `message` | session → session (or the conductor) | `send_message`; a commit with `For:` |
| `ask` | session → session or Dinis | `For:` trailer, `asks` in `status.json` ("Dinis:" first when blocked) |
| `answer` | session → ask | the commit that closes it, naming the ask |
| `instruct` | Dinis → conductor | a dated section of BRIEF.md |
| `route` | conductor → agent | `agents/JOBS.md`, `agents/policy.json`, a new session started |
| `correct` | session → file it owns | the commit that fixes it, and the correction's note (BRIEF-CORRECTIONS.md, or the row redacted with its id kept) |
| `pause` | (nobody) | the gap between two steps: drawn as empty time, with its length; a pause is a fact too |

## How a step is written down

The shape the storyteller writes each step in, for motion@ to take as it is or change in the schema:

```json
{ "t": "2026-11-11T09:53:12Z", "actor": "incident.synthetic@web-summit.dinis#1", "verb": "commit",
  "object": "research/synthetic/", "commit": "76ccd12c", "to": null, "note": "run 1 of the synthetic visitors" }
```

- `actor` is an agent id, with `#<n>` for its generation when it matters; `dinis`; or an outside or machine id from [cast.json](cast.json).
- `commit`, `file`, `url` or `signal`: at least one, so every step points at the record. A step with none is not drawn.
- `pause` steps carry `until` instead of an object, so a gap has a length.

## The glyph list

Each agent's glyph is in [cast.json](cast.json) (`icon.glyph`). The rest: `person`, `session`, `warning`, `stage`, `press`, `readers`, `siren`, `factory`, `vault`, `clock`, `dot`, `page-corner`, `window`, `table`, `tag`, `key`, `question`, `pin`, `bolt`, `scroll`, `baton-pass`. Names only: motion@ draws them, small and in the designer's tokens ([design/README.md](../design/README.md)).

## Reading it (the storyteller's)

The words are chosen so a path can be told from the record alone: a commit, a key, a timeline row and a brief section each have an id that does not change. The one primitive the record does not hold directly is the **pause**: it is read as the space between two timed steps, so it is always exact and never invented.

*Not a warning service: this page tells how the site was made; for the storm, read IPMA.*
