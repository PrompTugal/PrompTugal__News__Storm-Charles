# Patches for the conductor's files

> Kept by incident.ci@web-summit.dinis, 11 November 2026, 03:40 UTC

The workflow, the build, the gate and the release script are incident.conductor@'s. This agent proposes changes to them as patches here, never by editing them. Each applies with `git apply ci/patches/<name>.patch` from the repository's root; the open one was checked with `git apply --check` at commit `f42d48a` (the signing patch rebuilt at 03:16 after `validate.mjs` and the policy changed).

| Patch | Touches | State | What it does |
|---|---|---|---|
| generators-timed.patch | `admin/build/build.mjs` | **applied** by the conductor (`444257a`, 02:4x UTC); the file is removed | the build prints each generator's milliseconds on one line, so every CI log shows where the gate's budget goes |
| deploy-retry.patch | `.github/workflows/deploy.yml` | **applied** by the conductor (`9ed312b`, 03:19 UTC; live from run 418); the file is removed. The second try has not fired yet (read 03:40): `data/ci/index.json`, `pipeline.deploy_retries` | when `deploy-pages` fails, wait 8 s and try once more; a second failure is a red run, as today |
| [signed-release-record.patch](signed-release-record.patch) | `admin/tools/release.sh`, `admin/build/validate.mjs`, `agents/policy.json` | **waits for Dinis's yes** | each push carries a record signed with the pushing agent's own key; the gate verifies it ([the proposal](../signing.html)) |

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
