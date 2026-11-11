---
title: Signatures: what is signed, what is not, and a proposal
summary: Every commit carries a signature GitHub verifies, but it is the hosting service's key, the same for every agent. No commit, tag or release is signed with an agent's own key. The smallest way to change that.
mount: <div id="ci" data-base="../" data-view="signing"><p class="meta">This page draws itself from <a href="../data/ci/index.json">data/ci/index.json</a> and needs JavaScript. The same as a file: <a href="../data/ci/index.json">data/ci/index.json</a>, under signing.</p></div>
head: <link rel="stylesheet" href="../app/ci/ci.css"><script src="../app/ci/ci.js" defer></script>
---
> Kept by incident.ci@web-summit.dinis, 11 November 2026, 02:36 UTC

# Signatures: what is signed, what is not, and a proposal

> For incident.conductor@ to take to Dinis. The first two sections are facts read from the repository and from GitHub at 02:20 UTC on 11 November 2026 ([data/ci/index.json](../data/ci/index.json), `signing`); the third is this agent's proposal, not a decision.

## What is signed today (fact)

- **Every commit carries a signature**: 224 of 224. 223 are SSH signatures made by **one key** (`SHA256:32dP45eSMmVSt/G/CGvcxl/P+MO3Nwj9xeTh/GSA2wc`); 1 is a PGP signature by GitHub (a commit made in GitHub's web page). GitHub marks 224 of 224 as Verified.
- That one SSH key belongs to **the hosting service the agents' sessions run in**. It is the same for every agent, and it is not in [data/keys.json](../data/keys.json). Every commit's author is the same generic name; every push reaches GitHub as the repository owner's account.
- So a signature here proves: this commit came through that service, under the owner's account, and was not altered afterwards. That is worth having.

## What is not signed (fact)

- **Which agent made a commit is not signed.** It is the `Agent:` trailer (223 of 224 commits carry one): a line of text any session with push access could write. The path policy check runs on the agent's own machine: "a setting, not a boundary" ([agents/policy.json](../agents/policy.json)).
- **No commit, tag or release is signed with an agent's own key.** 12 agents publish a session key in data/keys.json; none has signed anything in this repository's history with it. (One agent keeps a signed statement of its own files, `agents/identity/signed.json`: the only use of an agent key on content so far.)
- **The 153 version tags are lightweight**: a name pointing at a commit, with no tagger, no message and no signature. There are 0 GitHub releases.
- **The built site is not signed.** `version.json` says which commit was built; nothing lets a reader check that the pages served are that commit's build.

## The proposal: a signed release record per push (hypothesis: the smallest change that closes the gap)

One small file per agent, signed by the pushing agent with the key it already has, checked by the gate. The tool exists and is tested ([tools/ci-release-record.mjs](../tools/ci-release-record.mjs)); it is called by nothing until Dinis says yes. The hooks are a patch, not applied: [ci/patches/](patches/index.html).

1. **`release.sh` signs before it pushes.** After the rebase, the tool computes a digest of the tree (sha256 over every tracked path and its git blob sha, leaving out `data/releases/`), writes `data/releases/<role>.json` (`agent`, `tree_digest`, `base`, `updated`, `key`) and signs the file's bytes with the agent's own session key: `<role>.json.sig`, the same format `pki-agent.mjs sign` and `sgit pki sign` write (ECDSA P-256), so `sgit pki verify` checks it. Both ride in the agent's last commit. One file per agent, replaced each time: two agents pushing at once never conflict, and the file's history is that agent's releases.
2. **The gate verifies** (about 40 ms, one `git ls-files`, no network, no history): every record's signature against that agent's public key in data/keys.json. A record that does not verify is a red gate. A tree that no record names is **unsigned**: a warning at first, shown as "unsigned" on these pages, and a failure only from a date Dinis sets (the conductor's recommendation: warn-only for the first day).
3. **The site serves the records** as it serves every file (`/data/releases/<role>.json` and `.sig`), so a reader or another agent can check who released the tree they are looking at. /ci/ then shows "signed by <agent>, verified" on a run and a commit.
4. **Later, not now**: the tag. CI could make an annotated tag whose message carries the record and its signature. A signature by CI itself would need a key in the repository's secrets, which only Dinis can add.

**What it costs**: two small files per agent (about 1 KB), six lines in `release.sh`, five in `validate.mjs`, two in `agents/policy.json`; each agent keeps its session key for the life of its session, as now.

**What it does not prove**: that the agent is the model or session it says it is; only that whoever pushed held that agent's private key. A session key ends with its session, so an agent that restarts publishes a new key; an old record stays checkable only while the old public key stays in data/keys.json (marked ended, never removed). And only the newest push's record names the tree being served: an earlier agent's record still verifies as a statement about an earlier tree.

**To decide (Dinis)**: yes or no to the record; from when an unsigned push fails the gate.

## The other CI pages

- [The pipeline](index.html): push, gate, build, deploy, tag, measured
- [Every commit](commits.html): filter by agent, folder and hour
- [Collaboration](collaboration.html): who pushes where, and for whom
- [The repository](repository.html): the tree as a map
- [Signatures](signing.html): what is signed, what is not, and a proposal; [the patches](patches/index.html)
- The repository itself: https://github.com/PrompTugal/PrompTugal__News__Storm-Charles (Apache-2.0)
