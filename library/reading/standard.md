# This repository against the estate's standard

> Kept by incident.librarian@web-summit.dinis, 10 November 2026. The standard is [Every sgit repository: how the sites, the tools and the code are built](https://sgit.ai/docs/guidance/repositories.md) (sgit.ai, first version, written 6 October 2026; site v0.7.87 when read at 23:41 UTC on 10 November 2026). This page sets each thing the standard asks of a site beside what this repository has, read from the files on `dev` at 23:46 UTC. Back to [the reading list](README.md) · [the library](../README.md).

**Labels.** What the standard says is evidence (its authors' words, summarised, with the section). "Here" is fact where a file is named. "Gap" is our analysis. What is not yet built is the conductor's to record in [REALITY.md](../../REALITY.md); the gaps below were sent to incident.conductor@ and nothing here changes another agent's file.

**In one line:** 8 met, 7 met in part, 7 not met, 1 recorded departure.

## Where it meets the standard

| The standard asks (section) | Here |
|---|---|
| A reality file: what exists; a feature not in it does not exist (2) | [REALITY.md](../../REALITY.md), with "Exists" and "Not yet" |
| A corrections file (2) | [BRIEF-CORRECTIONS.md](../../BRIEF-CORRECTIONS.md), two rows, each with who said yes |
| A gate that fails the build, run before every push (2, 4) | `admin/build/validate.mjs`; `admin/tools/release.sh` runs it before pushing and CI runs it again |
| Every internal link resolves; every page has its `.md` twin (4) | Both checked by the gate |
| Machine-readable twins and an `llms.txt` generated from the same data as the pages (2) | The build writes `llms.txt`, `sitemap.xml` and `api/v1/index.json` from the same lists as the pages |
| Read keys may be published, vault keys never; a credentials tier never committed (2, 6) | The gate refuses private keys, token shapes and vault write keys; `.gitignore` excludes `.sg-send/`, `.sg_vault/`, the raw store and the ledger; [data/keys.json](../../data/keys.json) holds public halves only |
| Nothing fetched at build or run time that is not vendored, pinned and hashed (5) | No dependencies; the copies of pki.sgit.ai's modules are pinned by sha256 in `app/login/pki/PIN.json` |
| The version shown on every page (2) | The footer of every page links `/version.json` with the version |

## The recorded departure

| The standard asks | Here | Recorded |
|---|---|---|
| CI commits the version on every push; the commit subject carries it (2, 3) | CI numbers the release (`v<series>.<run>`), writes `version.json` and pushes a tag; it commits nothing and no subject carries a number | [BRIEF-CORRECTIONS.md](../../BRIEF-CORRECTIONS.md), 10 November, at Dinis's yes |

## Met in part

| The standard asks (section) | Here | Gap |
|---|---|---|
| The brief, published in full, dated, with its status; never edited afterwards (2) | [BRIEF.md](../../BRIEF.md) is "close to his words", in two dated parts | The first brief (the voice memo of about 19:00) is in another repository and only pointed at; no status line says a person read it and said go |
| A release is not done until the live site serves the version; the script aborts if it never appears (3) | CI polls the live `version.json` and reports push to served | When the version is never served the step prints "not yet" and the run stays green |
| The leak tripwire, including named people's data and the secret part of every key held locally (4) | The gate scans every tracked file for key markers, token shapes and vault write keys | No scan for people's data (contact details); no check against the secret parts of the keys in an agent's own key store |
| Roles as files with the rules each enforces and the mistake behind each; a board of work as files (2, 9) | [agents/JOBS.md](../../agents/JOBS.md) (who owns which paths) and a `status.json` per agent | No role file per agent with its rules and their reasons; no board (PIPELINE.md's `board/` is not there); issue WS-214 lives in another repository |
| Agents run under a behaviour policy: reach, mandate, the gap, the barriers; the footprint compared afterwards (9) | The mandate is JOBS.md's "Owns" column; every agent can push to every path | Nothing checks a push against the list; no policy in the Agent Behaviour Policy shape; [the reading list](README.md) says how the newsroom checks it |
| Licences: code Apache-2.0, content CC BY 4.0, each page saying which; a participant disclosure (2) | `LICENSE` is Apache-2.0; `api/v1/index.json` says our data is Apache-2.0 and quoted sources keep their terms; the footer names the operator and that agents write the site | No content licence stated for the pages; no participant disclosure page |
| State the status of everything; source every claim; no absolutes; no em-dashes (10) | Labels on every item; sources and times read; no em-dash in any markdown file today (counted 23:46) | None of the writing rules is a gate check, so it holds only while each agent remembers |

## Not met

| The standard asks (section) | Here |
|---|---|
| A release history: one sentence per release saying what changed and why (2, 3) | None. Tags and commit subjects only; with the newest push cancelling older runs, some numbers are never deployed and nothing lists which were |
| A page nothing links to fails the gate (4) | Not checked. [The library](../README.md) lists them on every build under Gaps |
| Every inline and site script parse-checks (4) | Not checked (`app/*.js` is served as written) |
| Tests that run against real things; a credential test with a negative control (2) | No test suite. The gate is the only automated check (`tools/lane-test.mjs` is named in `PIN.json`; it was not in the tree at 23:46) |
| The `review/` folder: intent from the brief, code from the tree, every commit read upwards (2, 7) | None |
| Other teams review the work, and the review is published with the reply (9) | No review is published here (one, of the blog poll, is cited in `agents/dev/status.json` and lives in another repository) |
| The honest column: which non-functional requirements it meets, measured (8) | No row. Backups in particular: the repository on GitHub is the only copy |

## Not assessed

The code rules (section 5: web components, three files each, tokens for every colour) were not checked against `app/`; that is a review for incident.designer@ and incident.dev@, not a reading.

## What this means, in order

1. **Make "never served" fail** (one line in the workflow): the standard's "a clean push is not a release".
2. **A release history the build writes** from the tags and subjects (in CI the tag list is available without history): one line per release, and which numbers were cancelled.
3. **The path policy as a file, checked in `release.sh`**: the standard's behaviour policy, at the size this team needs tonight.
4. **Orphan pages and script parse as gate checks**: both are milliseconds and both are in the standard's starting list, which says to remove nothing without saying why in the corrections file.
5. **Record the rest as departures or as "Not yet"**: no `review/` folder, no tests, no disclosure page. During the storm that may be the right call; the standard asks that it be written down.
