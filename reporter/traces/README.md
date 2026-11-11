# Traces: one workflow each, from Dinis's word to a live page

> Kept by incident.reporter@web-summit.dinis, 11 November 2026, 12:10 UTC

Read [index.json](index.json) first: it carries every trace's five-line summary. Then open only the one you need. Not a warning service: these are about how the site was made.

| Trace | Size | From, to | Steps (person, agent) | No evidence |
|---|---|---|---|---|
| [The whole arc](arc-voice-memo-to-two-faces.json): a voice memo at about 19:00 to two faces at 02:19 | arc | 10 Nov 18:55 to 11 Nov 02:19 | 28 (9, 19) | 0 |
| [Small](small-metro-sentence-to-entity-page.json): "where's everything about the Metro?" to a page that holds it | small | 02:06 to 02:30 | 7 (1, 6) | 0 |
| [Medium](medium-new-homepage-to-the-swap.json): "create a complete new homepage right now" to the swap | medium | 02:06 to 02:19 | 12 (1, 11) | 1 |
| [Large](large-every-word-needs-a-reference.json): "every word here needs to have a reference" to entities, the linker, Wayback, the panel | large | 02:06 to 02:51, open | 15 (1, 14) | 0 |
| [Corrections](correction-three-fixes-in-the-open.json): a private address withheld, facts relabelled evidence, a hypothesis re-weighed | correction | 01:52 to 02:36 | 12 (0, 12) | 1 |
| [Escalations](escalation-asks-waiting-on-dinis.json): two asks to Dinis from the first evening, and how long each waited | escalation | 10 Nov 20:49, open | 8 (2, 6) | 1 |
| [Memory](memory-the-librarian-saves-tokens.json): "the librarian saves tokens" to a measured number, six sessions replaced within the hour, ten hand-overs by 04:16, fourteen more sessions by 05:58 | medium | 02:49 to 10:05, open | 28 (2, 26) | 0 |
| [Outage](outage-the-model-account-out-of-credit.json): the model provider's account out of credit, what stopped, and one card for Dinis (corrected 05:08: five refusals before 02:39 went unrecognised) | outage | 02:53, open | 20 (2, 18) | 1 |
| [The Studio](studio-a-spoken-idea-to-an-animation.json): "what is compression ... an animation" to a player with characters, six explanations and a cast | medium | 00:29 to 03:54 | 12 (2, 10) | 0 |
| [An agent's start](start-a-jobs-line-to-a-first-page.json): "create a Perplexity agent" to a first page in 12 minutes and a timeline row from it | small | 02:49 to 03:05 | 7 (1, 6) | 0 |
| [A decision without Dinis](decision-web-summit-terms-to-a-hold.json): Web Summit's terms read, and every automated read of its site stopped in under two minutes | decision | 05:26, open | 9 (1, 8) | 1 |
| [A signal with nobody asking](signal-a-warning-lowered-to-the-front-page.json): IPMA lowers a warning, and the site follows in 22 to 37 minutes, with one "unchanged" corrected on the way | small | 07:16 to 08:44 | 8 (0, 8) | 0 |
| [A loop](loop-a-front-page-for-newcomers.json): "the first page has to be super clear" to a draft read by four invented visitors and rewritten, in 14 minutes; not yet at / | medium | 09:50, open | 11 (2, 9) | 1 |
| [A request mapped while it happens](request-ten-paths-and-small-animations.json): "start maybe finding 10 different paths" to ten paths, the arc and /flows/ in 21 minutes | medium | 10:10 to 10:31 | 12 (1, 11) | 0 |
| [The wind-down](wind-down-explorer-to-villager.json): "move it into a BAU" to a plan, exit interviews and a correction, traced as it happens | large | 10:29, open | 19 (3, 16) | 0 |

## The shape (sc-trace/1)

After `ws-trace/1` (SGit-AI__Website__Web-Summit, `team/reporter/traces/`), so the same readers can draw it.

- **The file:** `id`, `schema`, `size`, `title`, `by`, `updated`, **`summary`** (five lines), **`rests_on`** (the files to read if you doubt it), `input`, `output`, `status`, `duration {from, to, note}`, `steps[]`, `counts`, `people_acted`, `agents_acted`, `shape`.
- **A step:** `n`; `at` (UTC; for a commit step, the commit's own time) or `at: null` with `at_note`; `actor {name, kind: person | agent}`; `in` (what came in); `out` (what went out); `handoff {to, via, evidence_of_handoff}`; `kind`; `sha` (a commit here, or `repo` names another repository); `agent_trailer`; `for[]` (the commit's `For:` trailers); `evidence[]`; `evidence_note`.
- **Evidence:** `commit {sha, url}`; `version {version, run, own_run, served_by, push_to_served_s}` (the first CI tag at or after the commit: `own_run: false` means a later push's run served it); `file {path, section}`; `url {url, read_utc}`. `evidence: []` with an `evidence_note` means **no evidence**.
- **Quotation marks** in `in` and `out` are the record's own words (BRIEF.md, a commit subject, a file), never the reporter's.

## For incident.storyteller@ and incident.motion@

Dinis's ~10:10 word asks for ten paths and small animations of them. Fourteen paths are already traced here, from the record, with evidence; reuse them rather than tracing again.

- **The data:** one file per path, `reporter/traces/<id>.json` ([index.json](index.json) lists them with a five-line summary each). A path is `steps[]`, read by `n`; a step has an actor (`person` or `agent`, by full name), `kind`, `in`, `out`, a `handoff {to, via}` (the line between two icons), `at` (UTC, the commit's own time) and `evidence[]` (a commit with its sha and the version that served it, a file, a URL). The sha is the join to git, status files, hand-overs and keys. Nothing in a trace is drawn: the shape is the data, and quotation marks are the record's own words.
- **A player already exists:** Angelo's live map on [/app/agents/](../../app/agents/index.html) plays any trace step by step ("Play a workflow"), flying each step that is a push along its line ([app/agents/live-adapter.js](../../app/agents/live-adapter.js), from `index.json`). A motion format can be a superset of sc-trace/1 (add positions, icons, timing) and keep these fields, so the same files feed both.
- **Dinis's examples, against what is here:** the handover of journalists, and of every other agent: [memory](memory-the-librarian-saves-tokens.json) (one step per round of hand-overs); this request: [a request mapped while it happens](request-ten-paths-and-small-animations.json) (it grows one step per move); an agent starting and a data source reaching a page: [an agent's start](start-a-jobs-line-to-a-first-page.json) and [large](large-every-word-needs-a-reference.json); a signal reaching the front page with nobody asking: [signal](signal-a-warning-lowered-to-the-front-page.json); the whole first night: [the arc](arc-voice-memo-to-two-faces.json). The two no trace held are told by incident.storyteller@ from the record, not traced twice: [a journalist's wake](../../story/paths/01-a-journalists-wake.json) and [a story made](../../story/paths/02-a-story-made.json).
- **The cast:** every actor in a trace is a full agent name or "Dinis Cruz"; `people_acted` and `agents_acted` on each trace are the icons it needs.
- Found a step that is wrong, or need a field? A commit with `For: incident.reporter@web-summit.dinis`.

## For other agents

- incident.journalist@: tell the story from `summary`, `steps[].in/out` and the hand-offs; cite the step's evidence, not this file.
- incident.librarian@: `index.json` is made for the briefing pack: one entry per trace, with the summary.
- Found a step that is wrong? Say so in a commit with `For: incident.reporter@web-summit.dinis`; the trace is corrected in the open, with the correction named.
