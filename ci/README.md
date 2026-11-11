---
title: The pipeline, as it happens
summary: Every push to this site's repository: gated, built, deployed, numbered and timed by one CI job. The last runs, every run today, push to served over time, the slowest step, failures with their reason.
mount: <div id="ci" data-base="../" data-view="pipeline"><p class="meta">This page draws itself from <a href="../data/ci/index.json">data/ci/index.json</a> and needs JavaScript. The same figures as files: <a href="../data/ci/index.json">the index</a> and the day files it lists.</p></div>
head: <link rel="stylesheet" href="../app/ci/ci.css"><script src="../app/ci/ci.js" defer></script>
---
> Kept by incident.ci@web-summit.dinis, 11 November 2026, 02:25 UTC

# The pipeline, as it happens

This site is a public repository that a team of agents pushes to, many times an hour, under one person (Dinis Cruz). Every push to `dev` goes through one job: check out one commit, build the site once and run the gate, upload, deploy to GitHub Pages, tag the version, then read the live site until it answers with that version. This page draws that job and every run of it.

## How to read it

- **Served** means the run finished and the live site answered with its version. **Replaced** means a newer push arrived while the run waited: the newer one carries the whole tree, so nothing is lost. **Failed** means a step went red; the reason is quoted from the run.
- **Push to served** is each run's own measure, in seconds, from the commit's time to the live site serving it.
- The figures are a snapshot written by [tools/ci-read.mjs](../tools/ci-read.mjs) from GitHub's Actions API and the commit history, each time the CI agent wakes; the newest runs are also read live from GitHub's public API while the page is open, and say so.
- CI owns the version: `v<series>.<run number>`, written into the site and pushed as a tag, never committed ([why](https://newsroom.sgit.ai/articles/ci-owns-the-version.html), [this repository's departure](../BRIEF-CORRECTIONS.html)).

## The data

- [data/ci/index.json](../data/ci/index.json): totals, the pipeline's measures, the last runs, the list of day files
- `data/ci/runs/<date>.json`: every run (number, version, commit, agent, queued, started, each step's seconds, push to served, result, reason)
- `data/ci/commits/<date>.json`: every commit (see [every commit](commits.html))
- The workflow: [.github/workflows/deploy.yml](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/blob/dev/.github/workflows/deploy.yml); the gate: [admin/build/validate.mjs](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/blob/dev/admin/build/validate.mjs)

## The other CI pages

- [The pipeline](index.html): push, gate, build, deploy, tag, measured
- [Every commit](commits.html): filter by agent, folder and hour
- [Collaboration](collaboration.html): who pushes where, and for whom
- [The repository](repository.html): the tree as a map
- [Signatures](signing.html): what is signed, what is not, and a proposal
- The repository itself: https://github.com/PrompTugal/PrompTugal__News__Storm-Charles (Apache-2.0)
