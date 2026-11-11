# Traces: one workflow each, from Dinis's word to a live page

> Kept by incident.reporter@web-summit.dinis, 11 November 2026, 03:04 UTC

Read [index.json](index.json) first: it carries every trace's five-line summary. Then open only the one you need. Not a warning service: these are about how the site was made.

| Trace | Size | From, to | Steps (person, agent) | No evidence |
|---|---|---|---|---|
| [The whole arc](arc-voice-memo-to-two-faces.json): a voice memo at about 19:00 to two faces at 02:19 | arc | 10 Nov 18:55 to 11 Nov 02:19 | 28 (9, 19) | 0 |
| [Small](small-metro-sentence-to-entity-page.json): "where's everything about the Metro?" to a page that holds it | small | 02:06 to 02:30 | 7 (1, 6) | 0 |
| [Medium](medium-new-homepage-to-the-swap.json): "create a complete new homepage right now" to the swap | medium | 02:06 to 02:19 | 12 (1, 11) | 1 |
| [Large](large-every-word-needs-a-reference.json): "every word here needs to have a reference" to entities, the linker, Wayback, the panel | large | 02:06 to 02:51, open | 15 (1, 14) | 0 |
| [Corrections](correction-three-fixes-in-the-open.json): a private address withheld, facts relabelled evidence, a hypothesis re-weighed | correction | 01:52 to 02:36 | 12 (0, 12) | 1 |
| [Escalations](escalation-asks-waiting-on-dinis.json): two asks to Dinis from the first evening, and how long each waited | escalation | 10 Nov 20:49, open | 8 (2, 6) | 1 |

## The shape (sc-trace/1)

After `ws-trace/1` (SGit-AI__Website__Web-Summit, `team/reporter/traces/`), so the same readers can draw it.

- **The file:** `id`, `schema`, `size`, `title`, `by`, `updated`, **`summary`** (five lines), **`rests_on`** (the files to read if you doubt it), `input`, `output`, `status`, `duration {from, to, note}`, `steps[]`, `counts`, `people_acted`, `agents_acted`, `shape`.
- **A step:** `n`; `at` (UTC; for a commit step, the commit's own time) or `at: null` with `at_note`; `actor {name, kind: person | agent}`; `in` (what came in); `out` (what went out); `handoff {to, via, evidence_of_handoff}`; `kind`; `sha` (a commit here, or `repo` names another repository); `agent_trailer`; `for[]` (the commit's `For:` trailers); `evidence[]`; `evidence_note`.
- **Evidence:** `commit {sha, url}`; `version {version, run, own_run, served_by, push_to_served_s}` (the first CI tag at or after the commit: `own_run: false` means a later push's run served it); `file {path, section}`; `url {url, read_utc}`. `evidence: []` with an `evidence_note` means **no evidence**.
- **Quotation marks** in `in` and `out` are the record's own words (BRIEF.md, a commit subject, a file), never the reporter's.

## For other agents

- incident.journalist@: tell the story from `summary`, `steps[].in/out` and the hand-offs; cite the step's evidence, not this file.
- incident.librarian@: `index.json` is made for the briefing pack: one entry per trace, with the summary.
- Found a step that is wrong? Say so in a commit with `For: incident.reporter@web-summit.dinis`; the trace is corrected in the open, with the correction named.
