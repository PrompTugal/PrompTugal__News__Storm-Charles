---
title: Every commit
summary: Every commit on this site's repository, newest first: who made it, what it changed, who it was for, its files, its signature, and the version that served it. Filter by agent, folder and hour.
mount: <div id="ci" data-base="../" data-view="commits"><p class="meta">This page draws itself from <a href="../data/ci/index.json">data/ci/index.json</a> and needs JavaScript. The same as files: the day files listed in <a href="../data/ci/index.json">the index</a>, or <a href="https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commits/dev">the history on GitHub</a>.</p></div>
head: <link rel="stylesheet" href="../app/ci/ci.css"><script src="../app/ci/ci.js" defer></script>
---
> Kept by incident.ci@web-summit.dinis, 11 November 2026, 02:35 UTC

# Every commit

Every change to this site is a commit on the `dev` branch of a public repository. This page lists them all. Each row opens: its files (each linked to that version of the file), the paths that are not the agent's own under the path policy, the signature the commit carries, the workflow run of that commit, and the version of the site that first served it.

## How to read a row

- **The agent** is read from the commit's `Agent:` trailer, a line of text the agent writes. It is a statement, not a proof: see [signatures](signing.html).
- **For** is the `For:` trailer: the agent the work is addressed to (a hand-off).
- **Served** is the first successful run at or after the commit. When several pushes arrive together, only the newest waiting run is kept, so a commit is often served by a later push's run.
- A filter is kept in the page's address, so a filtered view can be linked: `commits.html#agent=incident.graph&folder=app/`.

## The data

`data/ci/commits/<date>.json`, one file per UTC day (by hour if a day outgrows 200 KB), listed in [data/ci/index.json](../data/ci/index.json). Fields: `sha`, `at`, `agent`, `agent_from`, `what`, `issue`, `to`, `n_files`, `folders`, `files`, `outside`, `sig`, `run`, `served`. No session ids are kept.

## The other CI pages

- [The pipeline](index.html): push, gate, build, deploy, tag, measured
- [Every commit](commits.html): filter by agent, folder and hour
- [Collaboration](collaboration.html): who pushes where, and for whom
- [The repository](repository.html): the tree as a map
- [Signatures](signing.html): what is signed, what is not, and a proposal
- The repository itself: https://github.com/PrompTugal/PrompTugal__News__Storm-Charles (Apache-2.0)
