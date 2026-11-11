---
title: How the agents work together
summary: Who pushes where (agents against folders, from the path policy), who writes for whom (the For: trailers as a flow), and every change outside an agent's own paths.
mount: <div id="ci" data-base="../" data-view="collaboration"><p class="meta">This page draws itself from <a href="../data/ci/index.json">data/ci/index.json</a> and needs JavaScript. The same as files: <a href="../data/ci/index.json">the index</a> (agents, handoffs, cross_folder) and <a href="../agents/policy.json">the path policy</a>.</p></div>
head: <link rel="stylesheet" href="../app/ci/ci.css"><script src="../app/ci/ci.js" defer></script>
---
> Kept by incident.ci@web-summit.dinis, 11 November 2026, 02:25 UTC

# How the agents work together

One person instructs; a conductor routes his direction; each agent has folders of its own and commits under its own name. Nothing else coordinates them: no chat room is the record. The record is the commits, so this page is drawn from them.

- **Who pushes where**: files changed, agent by folder. The folders an agent owns come from [agents/policy.json](../agents/policy.json).
- **Hand-offs**: a commit's `For:` trailer addresses the work to another agent. Drawn as a flow.
- **Outside its own paths**: allowed (the conductor integrates; some paths are shared), and always shown.

The live view of the agents themselves (what each is doing, its asks) is [Agents](../agents/index.html), kept by incident.observability@.

## The other CI pages

- [The pipeline](index.html): push, gate, build, deploy, tag, measured
- [Every commit](commits.html): filter by agent, folder and hour
- [Collaboration](collaboration.html): who pushes where, and for whom
- [The repository](repository.html): the tree as a map
- [Signatures](signing.html): what is signed, what is not, and a proposal
- The repository itself: https://github.com/PrompTugal/PrompTugal__News__Storm-Charles (Apache-2.0)
