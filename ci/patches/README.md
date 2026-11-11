# Patches for the conductor's files

> Kept by incident.ci@web-summit.dinis, 11 November 2026, 22:22 UTC

The workflow, the build, the gate and the release script are incident.conductor@'s. This agent proposes changes to them as patches here, never by editing them. Each applies with `git apply ci/patches/<name>.patch` from the repository's root; the open one was checked with `git apply --check` at commit `f42d48a` (the signing patch rebuilt at 03:16 after `validate.mjs` and the policy changed).

| Patch | Touches | State | What it does |
|---|---|---|---|
| generators-timed.patch | `admin/build/build.mjs` | **applied** by the conductor (`444257a`, 02:4x UTC); the file is removed | the build prints each generator's milliseconds on one line, so every CI log shows where the gate's budget goes |
| deploy-retry.patch | `.github/workflows/deploy.yml` | **applied** by the conductor (`9ed312b`, 03:19 UTC; live from run 418); the file is removed. The second try has not fired yet (read 03:40): `data/ci/index.json`, `pipeline.deploy_retries` | when `deploy-pages` fails, wait 8 s and try once more; a second failure is a red run, as today |
| [signed-release-record.patch](signed-release-record.patch) | `admin/tools/release.sh`, `admin/build/validate.mjs`, `agents/policy.json` | **waits for Dinis's yes** | each push carries a record signed with the pushing agent's own key; the gate verifies it ([the proposal](../signing.html)) |
| brief-pdf.patch | `.github/workflows/deploy.yml` | **applied** by the conductor (`1a5f32d7`, 12:17 UTC; live from run 1061); the file is removed | the brief's PDFs are rendered in CI from the built page and served at `/brief/brief-latest.pdf` and `/brief/edition-<n>.pdf`, from a cache keyed on the page's inputs |
| generators-together.patch | `admin/build/build.mjs` | **applied** by the conductor (`f9ff8bc9`, 12:35 UTC; live from run 1109); the file is removed. On the runner, the 20 runs after (1110 to 1138): gate median 5.5 s, max 7; the 17 before (1079 to 1108): median 6 s, max 10. Push to served median 40 s after, 43 s before (read 13:24 UTC, data/ci/runs) | the twelve "before" generators run side by side instead of one after another: the gate is about 1.2 s shorter here, same output |
| gate-overlap.patch | `admin/build/validate.mjs` | **applied** by the conductor (`d4ba6505`, 14:45 UTC; gate 3.4 to 3.6 s on its machine at 2,406 pages); the file is removed. On the runner, the 20 runs after (1264 to 1285): gate median 5 s, max 8, three runs at 3 s; the 17 before (1240 to 1263): median 6 s, max 9. Push to served median 41.5 s after, 47 s before (read 15:19 UTC) | the gate starts the build as a child process and checks the tracked files while it runs (that scan reads only the repository, never `_site/`); the built-site checks `await` the build. A failing build still fails the gate (exit 1, "admin/build/build.mjs exited <code>"). Here, six runs each, interleaved: 4,153 to 5,013 ms today (median about 4,400), 3,601 to 5,057 ms with it (median about 3,860) |
| deploy-newest-only.patch | `.github/workflows/deploy.yml` | **applied** by the conductor (`7080c767`, 21:25 UTC; run 1548 deployed with no notice); the file is removed | one step after checkout asks `git ls-remote` for dev's head: if dev has moved on, the run builds and gates (a broken commit is still red) but skips upload, deploy, tag and the live check, with a notice titled superseded; if the lookup fails it deploys as today. Why: from 20:17 to 21:02 on 11 November GitHub held runs 1500 to 1523 queued with no jobs; at 21:19 they are still queued. If GitHub ever starts one, it would deploy that older commit over the newest, and the live check would pass (v0.1.1500 is at least 1500). Tested here both ways (head: no output; an older sha: stale=1 and the notice) |
| ci-altitudes.patch | `.github/workflows/deploy.yml` | **applied** by the conductor (`fd90abcd`, 22:19 UTC); the file is removed. First runs: 1618, 1620, 1623 superseded (build green; deploy and tag skipped); 1626 the first to deploy: build 28 s, tag beside it (v0.1.1626 created through the API), deploy job picked up 5 s after build ended, deploy 9 s, push to served 49 s (today's median 40 to 46 s; to be measured over 20 runs) | one job becomes three, each with only its own grant. **build**: `contents: read`, checkout with `persist-credentials: false`; it runs the newest-only check, the gate and generators, and the brief's PDFs (npm Chromium), then uploads the site as the Pages artifact. **deploy**: `pages: write` and `id-token: write`, no checkout and no repository code; it deploys that artifact (with the second try) and measures push to served, and is skipped when build says superseded. **tag**: `contents: write`, no checkout and no repository code; it creates the version tag through the API (`gh api .../git/refs`), beside the deploy rather than after it, so the run holds the pages group no longer. The trade-off: a tag can (rarely) name a build whose deploy then failed. Cost: runner pickup on 318 of today's runs that waited on nothing, median 5 s, p90 6 s; with job setup the deploy job should add about 6 to 8 s to push to served (median 40 s today), measured on the first runs after it lands. Checked here: YAML parses, three jobs with the grants above, `git apply --check`; not run on GitHub before the conductor applies it. After it lands, `tools/library-altitudes.mjs` (incident.librarian@) reads the permissions with one regex over the whole file and will need to read them per job |

## Generators in-process: measured, and not recommended

The conductor asked for a patch that runs the build's generators inside the build's own process. It was built two ways and measured on this agent's machine at `59df23d` (881 pages, 1283 tracked files), five gate runs each:

| How the generators run | Gate (ms) | Output |
|---|---|---|
| as today: one node process each | 3179 to 3392 | the reference |
| each in a worker thread of the build | 3284 to 3551 | identical (only time stamps differ) |
| each imported into the build (`await import`) | 1877 to 1955 | **wrong: no entity links on any page** |

- A node process starts in about 30 ms here; eight of them are about a quarter of a second at most, and worker threads did not recover even that. This agent's earlier estimate (about 0.4 s saved) was wrong.
- Plain import looks 1.4 s faster only because the linker silently did nothing: `tools/entities-link.mjs` is one line that imports `tools/entities-build.mjs` again with `--link`, and a module already imported is not run twice. The gate stayed green while 880 pages lost their links. Several generators also call `process.exit` on their normal path. So importing is not safe without changing other agents' tools.
- **Where the time is** (one line from the timed build): graph-build 114 ms, library-index 268, library-view 40, agents-index 53, board-build 191, entities-build 164, stories-build 44, **entities-link 806**. The generators are about 1.7 s of a 3.1 s gate; the linker alone is a quarter of the gate and grows with every page.
- **What would help**, in order: the linker working on the pages in memory before they are written instead of rereading and rewriting 880 files (its owner: incident.entities@); library-index reading each file once; and the timed line above, so the next slow generator is seen the push it lands.

## Where the gate's time goes at 2,297 pages, and the cut (12:33 UTC)

The conductor asked what grew (the librarian measured 8,975 ms on its machine; the runner's median is 6 s, with runs at 7 to 11 s). Measured here, three runs, at `48f3e795` plus an hour of pushes (2,297 pages, 2,944 tracked files); the gate was 5,959 to 6,499 ms:

| Part | ms | Whose |
|---|---|---|
| the twelve "before" generators, one after another | about 2,100 | each generator's owner |
| the build itself (copy, render 2,297 pages) | about 1,000 to 1,500 | the conductor (halved at 09:16) |
| the three "after" generators (flows-build 90 to 118, **entities-link 570 to 602**, agents-now 132 to 183) | about 830 | flows, entities, observability |
| the gate's own checks (220,472 links in 41 MB of pages: about 460; tracked files: about 40; the rest) | about 700 | the conductor |
| node starting, sixteen times | the rest | |

**What grew since 05:44 UTC** (1,965 pages, gate 4,171 ms): library-index 491 to about 700 ms, entities-link 457 to about 590, meteorology-build 149 to about 180, journal-build 84 to about 130, and two new "after" generators (flows-build about 100, agents-now about 150). The largest single costs are **library-index** (664 to 747 ms; it grows with the number of files) and **entities-link** (it rereads every page).

**The cut: generators-together.patch.** The "before" generators do not read one another's output (each writes its own files into `_site/`), so the build can start them together and wait for all of them. One function and one line in `admin/build/build.mjs`; the log line keeps each generator's own milliseconds and adds the wall time ("before, together"). The "after" generators stay in order (the linker must see the finished pages).

| | "before" generators | build | gate |
|---|---|---|---|
| as today | about 2,100 ms | 3,507 to 4,316 ms | 5,959 to 6,499 ms |
| together | 895 to 1,143 ms | 2,294 to 3,283 ms | 4,693 to 5,596 ms |

Checked: the two builds have the same 7,265 files; with time stamps and each tool's own "ms" figures removed, the only differences left are the bytes and sha256 of `admin/build/build.mjs` itself in the catalogue (the patch changes that file). This machine has 4 cores, as the runner does; a generator's own figure roughly doubles when run together (they share the cores), so the per-generator numbers in the log are then for comparing a generator with itself, not for adding up. A generator that one day reads another's output would have to move to "after".

**For the owners, not patched here:** incident.librarian@: library-index is the largest generator and grows with every file; incident.entities@: entities-link at about 590 ms is the largest "after" step and cannot be run together with anything.

## The brief's PDFs: what the patch adds

incident.brief@ asked for /brief/ as a PDF (Dinis's decision brief, BRIEF.md ~11:45). A PDF is a binary, so it is never in git; the gate only checks tracked files, so a PDF added to `_site/` after the gate needs no change to `validate.mjs`. The patch adds three steps between the gate and the upload, all `continue-on-error`: none can turn a run red.

1. **The cache** (`actions/cache@v4`, path `.brief-pdf`). Every deploy replaces the whole site, so a push that skipped the render would drop the PDFs: the cache is what lets a push that does not touch the brief still serve them.
2. **Its key, narrowed at the conductor's ask (12:16 UTC)**: `hashFiles('brief/**', 'tools/brief-make.mjs', 'tools/brief-pdf.mjs')`, the brief's own files only. The script's full list of 14 inputs holds no live data, but it includes `admin/build/build.mjs` and `app/site.css`, which changed 15 and 14 times between 06:00 and 12:15 UTC: keyed on those, about five pushes an hour would have paid for a Chromium install. The price: a change to the shared frame or styles does not reach the PDFs until the brief itself next changes.
3. **The render, only on a miss**: installs Playwright and its Chromium, runs `tools/brief-pdf.mjs --site _site --out .brief-pdf`. If nothing was rendered the folder is removed, so an empty result is never cached and the next push tries again.
   Then **the copy** into `_site/brief/`, or a warning on the run ("no PDF in this deploy").

**What it costs, honestly.** Measured here: the render is 3.8 s for three PDFs (0.44 to 0.57 MB each; 1.5 MB more in the artifact). Not measured, because only the runner can: the cache restore and its save step (expected a second or two on every push), and the Chromium install on a miss (expected 20 to 40 s, only on a push that changes `brief/**` or its two tools). The first runs after it is applied will say; this agent reads them (`data/ci/runs/`, the steps are named "Brief PDFs, ...") and reports the numbers. If the miss is too slow, the runner already has Chrome: `tools/brief-pdf.mjs` could launch that through `playwright-core` and skip the download (incident.brief@'s file).

**Measured on the runner after it was applied** (`1a5f32d7`): the miss, run 1061: restore 1 s, Chromium install plus render 12 s, copy 0 s; the job took 38 s against 21 to 23 s for the three runs before, push to served 48 s. A hit, run 1064: restore 0 s, copy 0 s. The three PDFs were served at 12:18:38 UTC (200, `application/pdf`, 0.35 to 0.45 MB each).

**To undo**: revert the commit; the cache expires by itself after seven days unused.

## The signed release record: what the patch wires in

`tools/ci-release-record.mjs` (this agent's; already in the tree, called by nothing) does the work; the patch is three small hooks.

1. `release.sh`, inside its loop after every rebase (the tree changes when someone else pushed first, so the record is signed again): `ci-release-record.mjs --write` signs a digest of the tree (every tracked path and its git blob sha, without `data/releases/`) with the agent's own session key and writes `data/releases/<role>.json` and `.json.sig`; the script amends them into the agent's last commit. No key on the machine: the push goes out unsigned. `SIGN_RELEASE=0` skips it.
2. `validate.mjs`: `ci-release-record.mjs --check` (about 40 ms, one `git ls-files`, no history, no network). A record whose signature does not verify against its agent's key in `data/keys.json` is a red gate. A tree that no record names prints `WARN ... this tree is unsigned`: a warning only, until Dinis sets a date.
3. `agents/policy.json`: every agent may write `data/releases/<role>.json` and its `.sig`.

Tested here with the patch applied and not committed: a signed tree printed `release-record: OK, this tree was signed by incident.ci@web-summit.dinis (sha256:815a07d3a9d80692)`; one byte changed in the record turned the gate red; a file changed after signing gave the unsigned warning. A signature made by `pki-agent.mjs sign` verifies with the same check.

## The deploy retry: why, and what is not known

Five of the first 414 runs failed at the deploy step with the same words from GitHub: "No artifacts named github-pages were found for this workflow run", each a second or two after the upload step succeeded in the same job (runs 54 and 55 at 23:54, 205 at 02:21, 343 and 344 at 02:58: twice in pairs). Each time the next push's run served the tree, 20 to 60 s later, so nothing was lost; but if the failed run is the last push for a while, the site stays one push behind until someone pushes again.

- **Fact**: the failures, their wording and their times (`data/ci/index.json`, `pipeline.failures`).
- **Hypothesis**: the artifact exists but GitHub's artifact listing has not caught up when `deploy-pages` asks. If so, a second try a few seconds later succeeds. This has not been tested: it can only be seen on the runner, the next time it happens.
- **The patch**: the first `deploy-pages` may fail without stopping the job; then an 8 s wait and a second `deploy-pages`. If the second fails, the job stops there, red, with no tag and no measure, exactly as now. The page address is taken from whichever try succeeded.
- After it is applied, /ci/ will show whether a retried run served: the first try's failure stays visible in the run's steps.

**Where the gate's time goes at 2,403 pages** (14:40 UTC, here, four cores; three runs of an instrumented copy outside git): the build 3,134 to 3,609 ms (inside it, the "before" generators together 847 to 1,011 ms, bounded by **library-index** at 844 to 1,008; then **entities-link** 568 to 761 ms in order), the tracked-file scan 353 to 527 ms, the Weather face's check 65 to 71 ms, the built-site checks (twins and links over every page) 641 to 738 ms. gate-overlap.patch takes the tracked-file scan off the path. The next cuts are the two owners' (library-index, entities-link) and the link check, which reads every page the build has just written.

**On the runner** (data/ci/runs, medians by hour from 06 to 14 UTC): 5, 5, 5, 5, 6, 6, 6, 6, 5 s; p90 6 to 8 s; no trend toward 7 s yet. A single agent's machine reading 7.76 s (incident.entities@, 14:39) is that machine, not the runner.
