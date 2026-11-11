# incident.ci@: handover to the third session

> Kept by incident.ci@web-summit.dinis, 11 November 2026, 12:37 UTC

Written by the second session (05:45 to 12:37 UTC on 11 November) at incident.conductor@'s word, with its context past 220k tokens a call. Read CLAUDE.md, then this, then [status.json](status.json) only if you need the record.

## What I own (agents/policy.json)

`ci/**`, `app/ci/**`, `tools/ci-*.mjs`, `data/ci/**`, `README.md`, `agents/ci/**`, `accounts/ledger/ci.jsonl`, my own entry in `data/keys.json`. The workflow, `admin/build/**` and `admin/tools/**` are the conductor's: a change to them is a patch file in `ci/patches/`, described in [ci/patches/README.md](../../ci/patches/README.md), never an edit. The conductor applies quickly (two patches within minutes today).

## The wake (hourly; about six commands)

1. `git pull --ff-only origin dev && git fetch --tags origin`. A fresh container is shallow: first `git fetch --unshallow origin dev`.
2. `node tools/ci-read.mjs` (GitHub's API through curl; 50 to 330 calls a wake at today's traffic), then `node agents/ci/wake.cjs <ISO time of the last wake>`: failures, retries, the gate's last-20 median and max, and this hour's runs, gate, push to served and queue, on four lines.
3. `node admin/build/validate.mjs | tail -3`: the gate here, with each generator's milliseconds.
4. `git apply --check ci/patches/signed-release-record.patch`. If it fails, `agents/policy.json`, `release.sh` or `validate.mjs` moved. The quick rebuild: `git apply --include='admin/*'` the patch, add the two `data/releases/<role>.json` lines to `everyone.owns` in policy.json by hand, `git diff` the three files into the patch, `git checkout` the three. Rebuilt four times.
5. `node agents/ci/st.cjs "$(date -u +%Y-%m-%dT%H:%M:00Z)" "<one line>"`, then `AGENT=incident.ci@web-summit.dinis node tools/accounts-measure.mjs --task "<one line>" --quality pass --append`, `git add -A data/ci agents/ci accounts/ledger/ci.jsonl ci/patches`, commit, `AGENT=incident.ci@web-summit.dinis admin/tools/release.sh`.
6. Commits addressed to me: `git log origin/dev --format='%h %s%n%b' --since=<last wake> | grep -B8 -i '^For: incident.ci@'`.
7. Report to the conductor (session_018yvwtQ4XRqTiSE3vjVq9KD) only on: a failed run, a deploy retry whose SECOND try fails, the gate's last-20 median on the runner past 7 s, or something that needs a patch. Otherwise say nothing. If nothing changed and the wake was minutes ago, make no commit (`git checkout -- data/ci`).

Commit form: subject `incident.ci@web-summit.dinis: <what>`; ONE final paragraph of trailers (`Agent:`, `Issue: WS-214`, `For:` lines, `Co-Authored-By: Claude <noreply@anthropic.com>`, the session line); no model name.

## The state at 12:37 UTC

- 1,110 runs, 6 failed (run 1 at the gate; 54, 55, 205, 343, 344 at deploy-pages), **none since 02:59**.
- **The deploy retry works and has fired five times** (runs 459, 520, 587, 589, 867): each first try failed with "No artifacts named github-pages", each second try passed. The first session's note said it had not fired: the reader missed it, because GitHub reports a `continue-on-error` step as "success". Fixed in `tools/ci-read.mjs` (a second-try step that ran is the evidence); /ci/ lists the retried runs.
- Gate on the runner: last-20 median 5 s until 11:00, 6 s since, single runs at 7 to 11 s; budget 8 s (a warning). Push to served: median 38 s overall, 42 to 47 s in the busy hours; queue up to 50 s. Traffic: about 110 pushes an hour since 09:30, about 40 of them replaced by a newer push (not failures).
- **generators-together** (the "before" generators side by side) was applied by the conductor at 12:35 (`f9ff8bc9`, run 1109). Here it took the gate from 6.0 to 6.5 s down to 4.7 to 5.6 s. **On the runner: three runs so far, 5, 5 and 6 s; the 17 runs before read 4 to 10 s, median 6: too few to call.** In flight: read the next twenty runs' gate step and tell the conductor the before and after (the one-liner is in step 2; the patch's run is 1109).
- **The brief's PDFs** are rendered in CI since run 1061 (`1a5f32d7`): cache keyed on `brief/**` and its two tools; a miss costs 12 s, a hit under 1 s; served at /brief/brief-latest.pdf and /brief/edition-<n>.pdf. Steps named "Brief PDFs, ..." in the runs. If a deploy ever lacks the PDFs, the run carries a warning titled brief-pdf.
- Where the gate's time goes, and what grew: the table in ci/patches/README.md. The two largest single costs are library-index (librarian) and entities-link (entities); both were told in a commit's `For:`.

## Patches

| Patch | State |
|---|---|
| generators-timed, deploy-retry, brief-pdf, generators-together | applied by the conductor |
| `ci/patches/generators-together.patch` | applied (`f9ff8bc9`): remove the file and mark the README row applied, with the runner's numbers |
| `ci/patches/signed-release-record.patch` + `tools/ci-release-record.mjs` | ready, **waits for Dinis's yes**; applies at dev's head as of this note |

## Waiting on Dinis (through the conductor)

1. Yes or no to the signed release record ([ci/signing.md](../../ci/signing.md)).
2. The licence reading in README.md.

## Also known

- `transition/PLAN.md` (the planner's, for Dinis's yes): ci stays in the live crew until the close trigger, then merges into an *operations* role with observability and the accountant. Each agent may write `transition/interviews/<role>.md` (an exit interview); not written for ci yet.
- Board card `a-journalist-3` waits on ci: the journal's figures are as fresh as data/ci/; data/ci/ is now refreshed every hour, so it wants only a closing line from the board's keeper.
- agents/ci/drift.md still open: PIPELINE.md has no "as built" line; agents/README.md lists four roles; Node 20 deprecation warning on every run; `.gitignore` is a Python template.
- Round 4 (a page per version; commits as lanes per agent) is not started and not asked for.
- `app/ci/ci.js` was last checked in a browser at 05:47 UTC (desktop and phone) after the retries line was added.
- Other agents' sessions message this one directly (incident.brief@ did): that is material; anything touching the conductor's files still goes through the conductor.

## Identity and the routine

- This session's key: `incident-ci-dinis-2` (signing sha256:7d21184584221853). The third session makes its own, adds `incident-ci-dinis-3`, and marks this one "handed over" in the same commit; this session leaves data/keys.json alone.
- The wake that fired into this session: the routine "incident.ci@web-summit.dinis hourly (2)" (trig_01PJsKpD7pDyHa88oTPTkBEn), at :17 past each hour, arriving at :17 to :23. It may still fire into this stopped session; the third session's schedule is the conductor's to set.
- Kept outside git and now gone: nothing that matters. The two wake scripts are now in agents/ci/ (wake.cjs, st.cjs).
