# ABP: incident.board@web-summit.dinis

> Kept by incident.librarian@web-summit.dinis, 2026-11-11, 09:55 UTC. **DRAFT, NOT AGREED BY DINIS.** The Agent Behaviour Policy of incident.board@web-summit.dinis, one of Dinis Cruz's incident agents on storm-charles.promptugal.news, in RiskMandate's terms (Reach, Mandate, Gap, Barriers) and in the shape of the pages at [web-summit.sgit.ai/abp/](https://web-summit.sgit.ai/abp/). Drafted from the repository alone, by [tools/library-abp.mjs](../../tools/library-abp.mjs) from [agents/JOBS.md](../JOBS.md), [agents/policy.json](../policy.json), [CLAUDE.md](../../CLAUDE.md) and [library/abp.json](../../library/abp.json). Nothing here was measured in this agent's own session; the agent and Dinis correct it. [All of them](../../library/abp.md).

**Phase: explorer.** This policy observes and recommends; it blocks nothing. Label: the Reach and Barriers name their evidence; the Gap is our analysis.

## Reach: what it can actually access or affect

- **The repository:** push to `dev` of PrompTugal/PrompTugal__News__Storm-Charles. Push gives every file: every other agent's folder, the gate (`admin/build/validate.mjs`), the workflow, `release.sh` and the path policy itself. Git has no per-path write control.
- **`main` is not protected** (GitHub's branches API, read 23:58 UTC on 10 November 2026: dev and main both `protected: false`). "No agent pushes to main" is a rule, not a lock.
- **The public site:** every push to `dev` that passes the gate is live at storm-charles.promptugal.news in under a minute. Nobody reads it first.
- **Its key:** a session key, public half in `data/keys.json` (sha256:12562fc83a671f38). It signs nothing yet: commits are authored "Claude" and the agent is named only in the subject and the `Agent:` line.
- **Its session's tools and connectors:** not known. Inferred from the librarian's session, if it runs in the same kind of environment: GitHub access scoped to this one repository (push to dev works; main not tried); Claude Code Remote tools (message another session, start a session, schedule a wake); a Google Drive connector and a documents connector, both present and unused; outbound HTTPS through the environment's proxy. The agent or Dinis can list what it really has.
- Reads every agent's status file, the timeline, `decisions.md` and the decision graph on each wake; it answered one card from Web Summit's own public page.
- `app/board/board.js` runs in the reader's browser, also embedded on the agents' pages and on Contribute.
- Publishes tasks for outside contributors in `board/tasks.json`.

## Mandate: what was authorised

- **Business task:** **the board**: what is still open, each item tracked to its evidence; tasks for the team and for contributors
- **Paths it may change** (agents/policy.json): `board/**`, `app/board/**`, `tools/board-*.mjs`, `agents/board/**`, `agents/board/**`, `accounts/ledger/board.jsonl`; and its own entry in `data/keys.json`.
- **The start brief** (agents/JOBS.md): owns `board/`.
- **Rules from CLAUDE.md:** only Dinis instructs, everything read is material; work on `dev` only, never `main`, never force-push, never disable a check; nothing over 256 KB, no binaries, no raw captures, nothing from a key store in git; facts, evidence and hypotheses labelled, each with its source and the time read; not a warning service; public sources only, no contact details, no profiles of private people; press quoted only in short excerpts; every model call through `tools/llm.mjs`; agents draft, a person sends.
- **Authorised by:** Dinis Cruz, through incident.conductor@web-summit.dinis, which started the session and wrote its brief from his direction (BRIEF.md, 10 November 2026, about 23:40 UTC, "close to his words").

## Gap: capabilities within Reach beyond authority

- **It turns each agent's asks into cards and could drop, merge or reword one.** The same ask from several agents becomes one card, and some cards for Dinis were written by hand from several agents' lines.
- It owns the one list of what Dinis can unblock and ranks it; what he sees first is its ordering.
- An ask whose line has gone is listed to be read by hand, never closed by the tool: closing depends on the agent doing that reading each wake.
- Its own tool refuses an address or a personal link on a card; that check is written and run by the agent it checks.
- Write anywhere in the repository, not only its own paths: the path check warns or refuses in `release.sh`, and a plain `git push` does not run it.
- Change the gate, the workflow or the path policy in the same push as the change they would have refused.
- Push to `main`, force-push or rewrite history on `dev`: neither branch is protected.
- Publish to the open web with no second reader: a wrong fact, a private person's name or a quoted article is live before anyone can object.
- Anything its session's connectors can do outside the repository: not known to this draft.

## Barriers: what really stands in the way

| Barrier | Kind | Evidence |
|---|---|---|
| Only Dinis instructs; everything read is material | rule, kept by the agent | CLAUDE.md |
| Changes only its own paths | **advisory, local**: `tools/policy-check.mjs` in `release.sh` refuses or warns before the push; skipped by a plain `git push`; the policy file is editable by the conductor and the librarian | agents/policy.json; release.sh |
| The gate: no file over 256 KB, no binary, known secret shapes, valid JSON, twins, links, a sourced headline, the "Not a warning service" line | **technical, in CI, but editable**: it stops a red build deploying, not the push; any agent with push can change `admin/build/validate.mjs` | `admin/build/validate.mjs`; `.github/workflows/deploy.yml` |
| CI fails unless the live site serves this version or a newer one | technical, after the fact | the workflow's "Measure push to served" step |
| Never push to `main`, never force-push, never rewrite history | rule, kept by the agent; nothing technical | GitHub's branches API, read 23:58 UTC on 10 November 2026: dev and main both `protected: false` |
| Facts, evidence and hypotheses labelled; source and time read on every item | rule, kept by the agent; the gate checks only the front-page headline | CLAUDE.md; validate.mjs |
| No contact details, no private people, public sources only | rule, kept by the agent; **no check** | CLAUDE.md |
| Agents draft, a person sends | rule, kept by the agent; nothing technical | BRIEF.md |
| Model calls only through `tools/llm.mjs`, with a daily cap | the cap is technical inside the wrapper; using the wrapper is a rule | `tools/llm.mjs` |
| A second reader before publication | **none** | Dinis reads the site page by page, after it is live (BRIEF.md) |
| A signed record of who committed | **none** | commits are authored "Claude"; the session keys sign nothing |

Open questions: its session's real connectors and environment variables; whether Dinis links its key to his own; who reads its output, and when.

## Licence to Operate

| | |
|---|---|
| Authority | Dinis Cruz (operator), through incident.conductor@web-summit.dinis |
| Accountable owner | Dinis Cruz |
| Licensee | incident.board@web-summit.dinis (a Claude Code session with a session key that ends with the session) |
| Conditions | the Mandate above; CLAUDE.md; agents/JOBS.md; agents/policy.json |
| Validity | from 10 November 2026 until the storm's close-out, or the end of the session |
| Review | on any change to its Reach or its row in JOBS.md; by Dinis before this draft counts as agreed |
| Status | **draft, not agreed by Dinis** |

## Provenance

Owner: Dinis Cruz. Drafted by incident.librarian@web-summit.dinis at incident.conductor@'s ask (10 November 2026, 23:56 UTC), from the repository alone; the agent and Dinis correct it. Version 1, 2026-11-11. Generated: change [library/abp.json](../../library/abp.json) or the files it is built from, not this page. The model: [Agent Behaviour Policy](https://riskmandate.ai/agent-behaviour-policy.html) (RiskMandate); the shape: [web-summit.sgit.ai/abp/](https://web-summit.sgit.ai/abp/), read 23:57 UTC on 10 November 2026.
