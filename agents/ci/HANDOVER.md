# incident.ci@: handover to a fresh session

> Kept by incident.ci@web-summit.dinis, 11 November 2026, 05:44 UTC

Written at incident.conductor@'s ask (this session's context passed 330k tokens a call). Everything a new session needs is in the repository; this note says where. Read CLAUDE.md first, then this, then [status.json](status.json).

## What I own (agents/policy.json)

`ci/**`, `app/ci/**`, `tools/ci-*.mjs`, `data/ci/**`, `README.md`, `agents/ci/**`, and my own `accounts/ledger/ci.jsonl`. The workflow, `admin/build/**` and `admin/tools/**` are the conductor's: changes to them go as a patch file in `ci/patches/`, never an edit.

## The wake (every 20 to 45 minutes; the whole job once the pages exist)

1. `git pull --ff-only origin dev`. The clone must be FULL: a fresh container is shallow, so first `git fetch --unshallow origin dev && git fetch --tags origin`.
2. `node tools/ci-read.mjs`: GitHub's Actions API through `curl` (it follows the session's proxy; node's own fetch gets a 403) plus the clone's history, into `data/ci/` (`index.json`, `runs/`, `commits/`, `tree.json`). A finished run is never asked for twice: 10 to 100 calls a wake. Files split by day, hour, then ten minutes under 256 KB; names are listed in `index.json` (incident.observability@ reads that list: never rename by hand).
3. Read `data/ci/index.json`, `pipeline`: `failures` (new ones), `deploy_retries` (none yet), `gate.last_20_median_s` and `last_20_max_s` against `gate.budget_s` (8, read from validate.mjs), `queue`. For the last runs one by one: each run's `steps` (the `gate` step's seconds), `queue_s`, `push_to_served_s` in `data/ci/runs/*.json`.
4. Time the gate here: `node admin/build/validate.mjs | tail -3` prints each generator's milliseconds and the total. The runner is 1.2 to 2 times slower than a session's machine.
5. `git apply --check ci/patches/signed-release-record.patch`. If it fails, release.sh, validate.mjs or policy.json changed: rebuild it (apply the three hooks described in [ci/patches/README.md](../../ci/patches/README.md) by hand, `git diff` the three files into the patch, test with a record written and staged, then `git checkout` the three files). It has been rebuilt three times.
6. Update `status.json` with the clock's time (`date -u`; never an estimate), run `AGENT=incident.ci@web-summit.dinis node tools/accounts-measure.mjs --task "<one line>" --quality pass --append`, commit, `AGENT=incident.ci@web-summit.dinis admin/tools/release.sh`.
7. Tell the conductor in a few numbered lines, only what is new. At once when: a run fails, a deploy retry fires (say what the second try did), runs queue for minutes, or the gate's median on the runner reaches the budget.
8. Look for commits addressed to me: `git log origin/dev --format='%h %s%n%b' --since=<last wake> | grep -B8 -i '^For: incident.ci@'`.

Commit form (tools/policy-check.mjs warns otherwise): subject `incident.ci@web-summit.dinis: <what>`; ONE final paragraph of trailers: `Agent:`, `Issue: WS-214`, `For:` lines, then `Co-Authored-By: Claude <noreply@anthropic.com>` and the session line; no model name anywhere.

## The state at 05:44 UTC

- 535 runs, 6 failed: run 1 (the gate, the first push) and five at deploy-pages ("No artifacts named github-pages were found": runs 54, 55, 205, 343, 344). None since 02:59. The retry the conductor applied (9ed312b, live from run 418) has not fired.
- Corrected by the second session, 05:55 UTC: the retry HAD fired (runs 459 and 520, then 587); the reader missed it because GitHub reports a continue-on-error step as "success". Fixed in tools/ci-read.mjs.
- Gate step on the runner: median 5 s, 4 to 8 s, budget 8 s (a warning, not a failure). Here 4.5 s at 1928 pages. The cost is page count: build.mjs rendering, then entities-link (about 500 ms) and library-index (about 450 ms).
- Push to served: median 34 s, 90% within 49 s. Queue: median 5 to 12 s, never over 34 s.
- Pushes fell from 85 a half hour (02:30) to 18 (05:00).

## Patches

| Patch | State |
|---|---|
| generators-timed | applied by the conductor (444257a) |
| deploy-retry | applied by the conductor (9ed312b) |
| generators in-process | measured, NOT recommended: plain import silently breaks the linker; workers save nothing (ci/patches/README.md) |
| `ci/patches/signed-release-record.patch` + `tools/ci-release-record.mjs` | ready and tested, **waits for Dinis's yes**; applies at dev's head as of this note |

## Waiting on Dinis (through the conductor)

1. Yes or no to the signed release record ([ci/signing.md](../../ci/signing.md)); the conductor recommends yes, warn-only for the first day.
2. The licence reading in README.md (our code and text Apache-2.0; others' material under its owner's terms), or a licence for the data the team compiled.

## Still open in agents/ci/drift.md

PIPELINE.md has no "as built" line; agents/README.md lists four roles; the workflow's actions draw a Node 20 deprecation warning on every run; `.gitignore` is a Python template.

## Agreed with others

- incident.observability@: I own runs, signatures and files per commit; it owns the roster, talks, status history and sessions. Two link forms are a contract: `ci/commits.html#q=<sha prefix>` and `#agent=incident.<role>` (also `folder`, `hour`, `to`, `outside`). No session ids in data/ci/.
- incident.designer@: the menu and the Repo chip are done (db34689).
- incident.accountant@: one ledger line per wake.
- incident.entities@: the linker's time is theirs to shrink; I report the figure.

## Not done (round 4, if the conductor wants it)

- A page per version (what changed, who, signed or not).
- Commits drawn as lanes per agent over time.
- /ci/ showing "signed by <agent>, verified in your browser" per push: only after the signing patch is applied.
- A known wart: `app/ci/ci.js` builds each page as one large template; it works and was checked in a browser at desktop and phone widths on 11 November 02:25, not since. Re-check it after any change (serve `_site/` and look).

## Identity and the routine

- This session's key (signing sha256:815a07d3a9d80692, in data/keys.json as `incident-ci-dinis`) ends with this session. The new session makes its own (`pki-agent.mjs keygen --session`), adds it, and marks this one `"status": "ended"`; never remove it.
- This session wakes itself by a one-shot scheduled message each time (the latest: trig_01Q3VwKyPSnWKtxGDZTzJ9Xy, 06:02 UTC, into this session only). It does not repeat on its own. At that wake this session checks whether a new incident.ci@ session has pushed; if so it does nothing and sets no further wake. The new session sets its own.
