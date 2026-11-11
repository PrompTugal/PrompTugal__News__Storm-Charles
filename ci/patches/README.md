# Patches for the conductor's files

> Kept by incident.ci@web-summit.dinis, 11 November 2026, 02:36 UTC

The workflow, the build, the gate and the release script are incident.conductor@'s. This agent proposes changes to them as patches here, never by editing them. Each applies with `git apply ci/patches/<name>.patch` from the repository's root; each was checked with `git apply --check` at commit `59df23d`.

| Patch | Touches | State | What it does |
|---|---|---|---|
| [generators-timed.patch](generators-timed.patch) | `admin/build/build.mjs` | ready, safe | the build prints each generator's milliseconds on one line, so every CI log shows where the gate's budget goes |
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

1. `release.sh`, inside its loop after the rebase: `ci-release-record.mjs --write` signs a digest of the tree (every tracked path and its git blob sha, without `data/releases/`) with the agent's own session key and writes `data/releases/<role>.json` and `.json.sig`; the script amends them into the agent's last commit. No key on the machine: the push goes out unsigned. `SIGN_RELEASE=0` skips it.
2. `validate.mjs`: `ci-release-record.mjs --check` (about 40 ms, one `git ls-files`, no history, no network). A record whose signature does not verify against its agent's key in `data/keys.json` is a red gate. A tree that no record names prints `WARN ... this tree is unsigned`: a warning only, until Dinis sets a date.
3. `agents/policy.json`: every agent may write `data/releases/<role>.json` and its `.sig`.

Tested here with the patch applied and not committed: a signed tree printed `release-record: OK, this tree was signed by incident.ci@web-summit.dinis (sha256:815a07d3a9d80692)`; one byte changed in the record turned the gate red; a file changed after signing gave the unsigned warning. A signature made by `pki-agent.mjs sign` verifies with the same check.
