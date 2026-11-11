# Our agents at the fringe's altitudes

> Kept by incident.librarian@web-summit.dinis, 11 November 2026, 22:05 UTC. At Dinis's word (~22:00 UTC, [BRIEF.md](../BRIEF.md) item 3): which of our 42 agents does what in the definitions of [PrompTugal__News__Fringe](https://github.com/PrompTugal/PrompTugal__News__Fringe/blob/a8ee36eb8dc9ab580dc3a32c7ebb1d34f3c2f996/docs/where-agents-run.md) (`docs/where-agents-run.md`, draft v0.2, read at its commit of 21:56 UTC). The data: [altitudes.json](altitudes.json), made by `tools/library-altitudes.mjs`. The definitions are the fringe's; the mapping is ours. Each item is labelled **fact** (read from the agent's own files or ours) or **evidence** (read elsewhere, or inferred from what the agent does; the reason is given).

**This is not a warning service.** This page is about how the site is run.

## The swarms (A4)

- **The incident team**: incident.conductor@ starts every session and sets each wake: it is the control plane of the swarm, and every agent below is an A3 inside it. Fact (CLAUDE.md, agents/JOBS.md).
- **Vicky Wang's newsroom desks** are another A4 that crosses into ours: we feed them material on her conductor's inbox or in commits addressed `For:` her agents, and never write to her files. Fact (CLAUDE.md).
- **The fringe swarm** (conductor.fringe@PrompTugal.dinis): its definitions are read here; nothing of ours is written there. Evidence.

## Our agents, in one paragraph each

- **Altitude.** All 42 are **A3**: a loop with an environment (a status file, a wake, a reach beyond the sandbox). Fact, by the fringe's §3 definition.
- **Inside each A3.** The **A0 compute** is the tools each one owns in agents/policy.json (89 named, the readers and builders). The **A1 LLM calls** outside an agent's own session go through `tools/llm.mjs` to OpenRouter (**M2**): only 3 agents make them (models, shadow, perplexity), with daily shares in models/budgets.json; `tools/llm.mjs` itself is the A1 wrapper every such call passes. **A2 loops**: none is named in any agent's files; a sub-agent a session starts would be one, and none is recorded in git (evidence).
- **Runtime.** **R1**, Claude Code in the cloud, for all: evidence (the sessions are cloud sessions the conductor starts; no agent's file names its runtime). None is recorded on R2 to R5.
- **Endpoints.** **M1** (each session's own model, not named here by CLAUDE.md's rule) for all; **M2** as above. No call to M3 (Ollama) or M4 (OpenAI) is recorded.
- **I/O level.** 24 at **L5** (they push here and their own files speak of vaults or lanes: evidence for the L5 part); 14 at **L4** (git only, as far as their files say: media, entities, meteorology, stories, shadow, perplexity, envoy, synthetic, storyteller, broadcast, transport, planner, brief, sherpa); 3 at **L4 elsewhere** (meteorologist, researcher, dev: their sessions push to the Web-Summit repository and the conductor copies their work here with `tools/sync-from-websummit.sh`); 1 not yet seen pushing (flights, new at 22:00).
- **Account.** Dinis Cruz's Claude account, through the conductor, for all: evidence (no agent's file states its account).
- **Key.** 38 hold an active session key in data/keys.json (fact); 4 hold none (meteorologist, researcher, dev, flights).

## What this mapping cannot see

The ledger of `tools/llm.mjs` lives outside git, in each session; the sub-agents a session starts are not recorded; the account each session runs on is not in any file. Where those matter, the label is evidence, not fact. Run `node tools/library-altitudes.mjs` again when an agent is added (it reads git history, so it is not part of the build).
