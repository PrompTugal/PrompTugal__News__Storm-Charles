# Our agents at the fringe's altitudes

> Kept by incident.librarian@web-summit.dinis, 11 November 2026, 22:11 UTC (first written 22:05; grants and crossings added at 22:11). At Dinis's word (~22:00 UTC, [BRIEF.md](../BRIEF.md) item 3): which of our 42 agents does what in the definitions of [PrompTugal__News__Fringe](https://github.com/PrompTugal/PrompTugal__News__Fringe/blob/a8ee36eb8dc9ab580dc3a32c7ebb1d34f3c2f996/docs/where-agents-run.md) (`docs/where-agents-run.md`, draft v0.2, read at its commit of 21:56 UTC). The data: [altitudes.json](altitudes.json), made by `tools/library-altitudes.mjs`. The definitions are the fringe's; the mapping is ours. Each item is labelled **fact** (read from the agent's own files or ours) or **evidence** (read elsewhere, or inferred from what the agent does; the reason is given).

**This is not a warning service.** This page is about how the site is run.

## The swarms (A4)

- **The incident team**: incident.conductor@ starts every session and sets each wake: it is the control plane of the swarm, and every agent below is an A3 inside it. Fact (CLAUDE.md, agents/JOBS.md).
- **Vicky Wang's newsroom desks** are another A4 that crosses into ours: we feed them material on her conductor's inbox or in commits addressed `For:` her agents, and never write to her files. Fact (CLAUDE.md).
- **The fringe swarm** (conductor.fringe@PrompTugal.dinis): its definitions are read here; nothing of ours is written there. Evidence.

## Our agents, in one paragraph each

- **Altitude.** All 42 are **A3**: a loop with an environment (a status file, a wake, a reach beyond the sandbox). Fact, by the fringe's §3 definition.
- **Inside each A3.** The **A0 compute** is the tools each one owns in agents/policy.json, plus the compute its own files name (101 units, the readers, pollers, browsers and builders). The **A1 LLM calls** outside an agent's own session go through `tools/llm.mjs` to OpenRouter (**M2**): 4 agents have them (models, shadow, perplexity, and flights's planned hourly summary), with daily shares in models/budgets.json; `tools/llm.mjs` itself is the A1 wrapper every such call passes. **A2 loops**: one, `tools/models-delegate.mjs` (incident.models@, 9fff5fb7); a sub-agent a session starts would be another, and none is recorded in git (evidence).
- **Runtime.** **R1**, Claude Code in the cloud, for all: evidence (the sessions are cloud sessions the conductor starts; no agent's file names its runtime). None is recorded on R2 to R5.
- **Endpoints.** **M1** (each session's own model, not named here by CLAUDE.md's rule) for all; **M2** as above. No call to M3 (Ollama) or M4 (OpenAI) is recorded.
- **I/O level.** 24 at **L5** (they push here and their own files speak of vaults or lanes: evidence for the L5 part); 15 at **L4** (git only, as far as their files say: media, entities, meteorology, stories, shadow, perplexity, envoy, synthetic, storyteller, broadcast, transport, planner, brief, sherpa, flights); 3 at **L4 elsewhere** (meteorologist, researcher, dev: their sessions push to the Web-Summit repository and the conductor copies their work here with `tools/sync-from-websummit.sh`). incident.flights@ pushed first at 22:03 (87cc4c51).
- **Account.** Dinis Cruz's Claude account, through the conductor, for all: evidence (no agent's file states its account).
- **Key.** 39 hold an active session key in data/keys.json (fact); 3 hold none here (meteorologist, researcher, dev).

## Grants and crossings (Dinis, ~22:05 and ~22:10 UTC)

For every A0, A1 and A2 unit, [altitudes.json](altitudes.json) now says where it runs, the grant it inherits there, the untrusted input it touches, and `crosses: true` where the grant's altitude is above the mandate's (the fringe's §3 rule: *the grant's altitude must not be above the mandate's*). It starts from the conductor's first pass ([COMPUTE.md](../agents/conductor/COMPUTE.md) §1), corrected from the agents' own files, the code and the workflow. The grant's altitude: **A4** if the place can start or schedule other sessions; **A3** if it holds a durable reach (push, vault keys, an agent's key); A1 a model key only; A0 nothing beyond the code.

- **112 units, 112 cross** (101 A0, 10 A1, 1 A2). Fact. None runs at its own altitude today.
- **In an agent's session the grant is A4**: push to dev, the agent's private key, its vault keys, the environment's credentials (an OpenRouter key, a GitHub token, an SG/Send token, cloud-provider credentials) and the right to message and start sessions and set wakes. Fact for the librarian's session (names read, never values); evidence for the others.
- **The 15 generators run in every pushing agent's session**: `release.sh` runs the gate, the gate builds, the build runs every generator. Every agent runs the other agents' code under its own A4 grant: by count, the widest crossing. Fact.
- **CI is not yet at its own altitude** (a correction to COMPUTE.md): the deploy job holds `contents: write` (kept in `.git/config` by `actions/checkout` for every step), `pages: write` and `id-token: write`, and in that one job runs the gate, every generator and, when the brief changed, Chromium installed from npm at run time. Its grant is A3 in part (push to this repository, deploy the site; no agent key, vault key or model key). The fix: build and gate in a job with `contents: read`, then deploy and tag in a job that runs no repository code. The workflow is incident.ci@'s. Fact.
- **Browsers**: graph, labs, studio, identity and weatherwatch run a headless browser on our own pages; the researcher, meteorology (`render: true`) and the conductor open outside pages in one (a correction to COMPUTE.md §1, which listed them together). Fact, from their files.
- **Untrusted input most touched**: vault contents (22 units), sealed messages from the public lanes (9), the open network with hosts from data (8), a headless browser (7), model answers (10 A1 and the A2). The rest read only the repository, some of which was itself written from web reads.
- **The first A2** is `tools/models-delegate.mjs` (incident.models@, 9fff5fb7), run in its session: an A2 mandate under an A4 grant.
- The meteorologist, researcher and dev run on the Web-Summit repository's side: their grant there is that repository's push.

Dinis chose GitHub runners for the compute (~22:10, BRIEF.md): a unit moved to a runner whose job holds no write token would have `crosses: false`. Re-run `node tools/library-altitudes.mjs` after each move.

## What this mapping cannot see

The ledger of `tools/llm.mjs` lives outside git, in each session; the sub-agents a session starts are not recorded; the account each session runs on is not in any file. Where those matter, the label is evidence, not fact. Run `node tools/library-altitudes.mjs` again when an agent is added (it reads git history, so it is not part of the build).
