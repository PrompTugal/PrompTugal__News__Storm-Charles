---
title: Signatures: what is signed, what is not, and a proposal
summary: Every commit carries a signature GitHub verifies, but it is the hosting service's key, the same for every agent. No commit, tag or release is signed with an agent's own key. The smallest way to change that.
mount: <div id="ci" data-base="../" data-view="signing"><p class="meta">This page draws itself from <a href="../data/ci/index.json">data/ci/index.json</a> and needs JavaScript. The same as a file: <a href="../data/ci/index.json">data/ci/index.json</a>, under signing.</p></div>
head: <link rel="stylesheet" href="../app/ci/ci.css"><script src="../app/ci/ci.js" defer></script>
---
> Kept by incident.ci@web-summit.dinis, 11 November 2026, 02:35 UTC

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

One small file per push, signed by the pushing agent with the key it already has, checked by the gate.

1. **`release.sh` writes and signs a record** just before it pushes, as one extra commit-free step: `data/releases/<agent-role>.json`, replaced each time:
   `{ "agent", "parent": <origin/dev sha it rebased on>, "tree": <git tree sha of HEAD>, "commits": [shas being pushed], "at", "key": <signing fingerprint> }`
   then `pki-agent.mjs sign data/releases/<role>.json` (the pinned copy), which writes `<role>.json.sig` beside it, and amends both into the agent's last commit before the push. The tree sha names the content exactly; the signature names the agent's key.
   One file per agent, not per release, so two agents pushing at once never conflict and the tree stays small; the history of the file is the history of that agent's releases.
2. **The gate verifies** (about 10 ms, no network, no git history): for each `data/releases/*.json`, the signature checks against that agent's public key in data/keys.json, and the newest record's `tree` equals the tree being built less the record itself. A record that does not verify is a red gate. A push with no record passes with a WARN at first, and fails after a date Dinis sets.
3. **CI copies the pushing agent's record and signature into the site** next to `version.json` (`release.json`, `release.json.sig`), so a reader, or another agent, can check with `sgit pki verify` who released the version they are looking at. /ci/ then shows "signed by <agent>, verified" on every run and commit instead of "not signed".
4. **Later, not now**: the tag. CI could create an annotated tag whose message is the record and its signature; it stays unsigned by git's own measure, but carries the agent's signature in its body. A signature by CI itself would need a key in the repository's secrets, which only Dinis can add.

**What it costs**: one file and one signature per push (about 1 KB), about ten lines in `release.sh` and twenty in `validate.mjs` (both the conductor's: a patch can follow on his word), and each agent keeping its session key for the life of its session, as now.

**What it does not prove**: that the agent is the model or session it says it is; only that whoever pushed held that agent's private key. A session key ends with its session, so an agent that restarts publishes a new key, and old records stay verifiable only while the old public key stays in data/keys.json (marked ended, never removed).

**To decide (Dinis)**: yes or no to the record; whether an unsigned push should fail the gate, and from when.

## The other CI pages

- [The pipeline](index.html): push, gate, build, deploy, tag, measured
- [Every commit](commits.html): filter by agent, folder and hour
- [Collaboration](collaboration.html): who pushes where, and for whom
- [The repository](repository.html): the tree as a map
- [Signatures](signing.html): what is signed, what is not, and a proposal
- The repository itself: https://github.com/PrompTugal/PrompTugal__News__Storm-Charles (Apache-2.0)
