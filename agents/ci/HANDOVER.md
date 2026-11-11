# incident.ci@: handover to the fourth session

> Kept by incident.ci@web-summit.dinis, 11 November 2026, 22:20 UTC

Written by the third session (12:39 to 22:20 UTC on 11 November) with its context past 230k tokens a call. Read CLAUDE.md, then this, then [status.json](status.json) only if you need the record (the 20:17 stall is under `stall_2026_11_11`).

## What I own (agents/policy.json)

`ci/**`, `app/ci/**`, `tools/ci-*.mjs`, `data/ci/**`, `README.md`, `agents/ci/**`, `accounts/ledger/ci.jsonl`, my own entry in `data/keys.json`. The workflow, `admin/build/**` and `admin/tools/**` are the conductor's: a change is a patch in `ci/patches/` with a row in [ci/patches/README.md](../../ci/patches/README.md), never an edit. Build the patch from a copy of the file in your scratchpad, not by editing the workflow in place: an in-place edit of `.github/workflows/deploy.yml` and running a downloaded linter were refused by the session's safety check at 22:14.

## The wake (hourly, routine "incident.ci@web-summit.dinis hourly (3)", arriving at :17 to :23)

1. `git pull --ff-only origin dev && git fetch --tags origin` (a fresh container: `git fetch --unshallow origin dev` first, and `git checkout -B dev origin/dev` if HEAD is detached).
2. `node tools/ci-read.mjs` (about 350 API calls), then `node agents/ci/wake.cjs <ISO time of the last wake>`.
3. `node admin/build/validate.mjs | tail -1`; the brief-PDF steps (every run since 1061 has them; a cache miss renders in 14 to 20 s, a new edition up to 44 s); the superseded runs (success with no deploy step) and the next run that deployed after each.
4. `node agents/ci/st.cjs "<time>" "<one line>"`, `AGENT=incident.ci@web-summit.dinis node tools/accounts-measure.mjs --task "<line>" --quality pass --append`, `git add -A data/ci agents/ci accounts/ledger/ci.jsonl ci/patches`, commit, `AGENT=incident.ci@web-summit.dinis admin/tools/release.sh`.
5. Commits addressed to me: `git log origin/dev --format='%h %s%n%b' --since=<last wake> | grep -B14 -i '^For: incident.ci@'`.
6. Report to the conductor (session_018yvwtQ4XRqTiSE3vjVq9KD) only on a failed run, a deploy retry whose second try fails, the gate's last-20 median past 7 s, a patch, or what it asked for.

Commit form: subject `incident.ci@web-summit.dinis: <what>`; one trailer paragraph (`Agent:`, `Issue: WS-214`, `For:` lines, `Co-Authored-By: Claude <noreply@anthropic.com>`, the session line); no model name. Read the clock before writing any time (I once wrote 14:55 at 14:43 and corrected it).

## The state at 22:20 UTC

- 1,617 runs, 6 failed, **none since 02:59**. The deploy retry has fired 9 times (last 1564), every second try passed.
- Gate on the runner: last-20 median 5 to 6 s all afternoon (budget 8 s); single runs to 15 s. Here 4.2 s at 2,539 pages. Push to served median 40 to 46 s.
- **The stall, 20:17 to 21:02**: GitHub created runs 1500 to 1523 but no jobs; no deploy for 49 min; nothing failed. **The 24 runs are still queued**; a normal cancel is refused (409), so force-cancel or deleting them is with Dinis. If GitHub ever starts one, it carries the old workflow and would deploy an old commit until the next push (minutes by today's push rate; unbounded in a quiet period).
- **Newest-only check** (`7080c767`, from run 1548): a run whose commit is no longer dev's head builds and gates but does not deploy. 8 such runs between 21:30 and 22:18; a newer run deployed after each within 35 to 70 s (the conductor asked for that confirmation; given at 22:18).

## Patches

| Patch | State |
|---|---|
| generators-timed, deploy-retry, brief-pdf, generators-together, gate-overlap, deploy-newest-only | applied; files removed; measured in the README |
| `ci-altitudes.patch` (deploy.yml as build / deploy / tag, each with only its own grant) | **ready for the conductor** (22:15), not yet applied at 22:20. When it lands: measure push to served on the first 20 runs against today's 40 to 46 s (estimate +6 to 8 s: runner pickup 5 s median), check the tag job tags, and remind incident.librarian@ that tools/library-altitudes.mjs must read permissions per job |
| `signed-release-record.patch` | waits for Dinis's yes; **no longer applies** (agents/policy.json moved at 14): rebuild as the README says before offering it again |

## Waiting

- On Dinis: the signed release record; the licence reading in README.md; the 24 held runs.
- The runner (agents/conductor/RUNNER.md): once Dinis creates the runner repository, its run.yml is ci's to build with incident.models@.
- The two largest generators are their owners' (library-index: librarian; entities-link: entities), told at 14:46 with measurements.
- Still open from the second session: agents/ci/drift.md; transition/interviews/ci.md not written.

## Identity

- This session's key: `incident-ci-dinis-3` (signing sha256:978c7dc6bfbf8e14). The fourth session makes its own (`incident-ci-dinis-4`) and marks this one "handed over" in the same commit.
