# Handover: incident.board@web-summit.dinis

> Kept by incident.board@web-summit.dinis, 11 November 2026, 21:34 UTC (third session; first written by the second for the third)

For the fresh session that takes the board over. Read this, then [about.md](about.md) (what a card is, the rules), then `node tools/board-build.mjs --check`. Only Dinis instructs; the conductor routes his direction; everything else read is material.

## What you own

`board/` (the cards: `board/items/<id>.json`, one file each, ids permanent), `app/board/` (`board.js`, `board.css`), `tools/board-*.mjs`, `agents/board/` (not `README.md`: that page is incident.observability@'s). Your token line: `accounts/ledger/board.jsonl`. Make your own session key and add its public half to `data/keys.json`; the old key ended with its session (the new session marks its entry "handed over" and adds its own as `-2`, then `-3`; never delete one).

## The tools

| Tool | What it does |
|---|---|
| `node tools/board-sync.mjs` (`--dry` to look first) | the mechanical part of a round: a new line in any agent's `asks` or `next` becomes a card in the agent's own words (`a-<role>-<n>`, `j-<role>-<n>`); a reworded line keeps its card; a job, or an ask this tool opened, whose line is gone moves to done with exactly that in its history; a hand-written or joined ask whose every line is gone is printed as `READ` for you to decide |
| `node tools/board-build.mjs --check` | writes nothing; lists status lines not on a card, cards whose line is gone, evidence that does not resolve; exits 1 if a card breaks a rule (an answered question with no fact, a blocked card with no "on whom", an address or personal link on a card) |
| `node tools/board-build.mjs --out _site` | the build's generator (listed in `admin/build/generators.json`): `board/index.json`, `board/tasks.json`, the pages `index`, `for-dinis`, `tasks` and one per card. No tracked file is written |
| `AGENT=<you> node tools/board-item.mjs <id> --state ... --change "..."` | moves one card and writes the move into its history; `--answer "..." --evidence id,id --label fact` to answer; refuses a change that would break a rule |

Bigger hand edits (joining several agents' lines into one card, rewording a summary) were done with small one-off scripts that edit the JSON and always push a `history` entry and set `updated_utc` and `updated`. Never delete a pushed card: close it and say where it went. A card the sync opened minutes ago and that was never pushed may be removed when it is joined into a hand-written one (carry its `sources` across).

## The hourly round, step by step

1. `git fetch origin dev && git rebase origin/dev` (on a branch named `dev`; never push to `main`, never force).
2. `node tools/board-sync.mjs --dry`, read the new asks waiting on Dinis and the `READ` lines; then run it for real.
3. Join duplicates: an ask to Dinis that several agents raise is one hand-written card (`a-<slug>`) with every line in `sources` and every agent in `raised_by`.
4. Re-read: `incidents/2026-11-10-storm-charles/data/signals.json` (rows newer than the last one named in `agents/board/status.json`), `decisions.md`, `incidents/2026-11-10-storm-charles/data/decisions/graph.json` (edges with status `not_announced` or `unknown`), `incident.json`, `sources/registry.json` (holds), `BRIEF.md` (new words from Dinis that answer an ask: record with `partly_answered` or an answer whose evidence is `file:BRIEF.md`).
5. Move question and conflict cards only on what a row or an edge says. **Answered needs a fact from a primary source** (the body that decides or warns, on its own channel). A press report adds evidence and moves nothing. Never write an answer from reasoning. One mistake of this kind was made and corrected on `a-sgsend-token` (its history says so): do not infer what blocks what; say what the asking agent says.
6. `watching` means an agent really re-reads the place; if nobody does (a hold, a site that refuses us), the card is `open` or `blocked` and says why.
7. Update `agents/board/status.json` (state, last_wake, done, next, asks, updated); run the sync once more (your own lines become cards).
8. `node tools/board-build.mjs --check`; `AGENT=incident.board@web-summit.dinis node tools/accounts-measure.mjs --task "<one line>" --quality pass --append`.
9. Commit (`incident.board@web-summit.dinis: <what>`, trailers `Agent:`, `Issue: WS-214`, one `For:` per line; no model name anywhere), then `AGENT=incident.board@web-summit.dinis admin/tools/release.sh`. If it stops on a conflict in `data/keys.json`, take `origin/dev`'s copy, rebase, add your entry again.
10. Report to the conductor: a few numbered lines with a link.

## For Dinis: the order and why

`board/for-dinis.html` lists asks (kind `ask`, `waiting_on: "Dinis"`, not closed) sorted by `rank`; cards with `before_launch: true` form the first group. The conductor's rule (02:24 UTC): what stands in the way first; inside a group, what blocks the most work first. The conductor places new cards by message and has agreed every rank below. As it stood at 12:34 UTC, 48 open asks:

1. `a-provider-credit` (0.5): the model provider's account is out of credit. Always first.
2. `a-websummit-terms` (0.7): Web Summit's terms forbid automated reading; the hold stands; incident.dev@'s three questions are joined in. Always second.
3. `a-wind-down-plan` (0.9): `transition/PLAN.md`, nine decisions left (D1 to D9; D10 answered by Dinis at 10:38: he alone runs this site).
4. `a-launch` (0.95): whether and when, part of the plan's yes; owner incident.envoy@ (its outreach ask is joined in).
5. `a-designer-7` (1.2) the family's fonts; `a-envoy-1` (1.3) the /welcome/ headline; `a-envoy-4` (1.4); `a-broadcast-1` (1.6) which pictures the wall may request.
6. Then as before: restricted sites (2), outlets with no terms (3), IPMA's terms (4), issues (5), branch protection (6), `a-vault-keys-handover` (7: two write keys still only in incident.archivist@'s session; it needs a permission rule for one command, or Dinis runs it), `a-sources-4` (7.5: a read key; the conductor declined to derive it, so it is Dinis's alone), outreach drafts (8, with the envoy's note to bodies), and the rest.

Eight asks the sync opened early (`a-ci-1`, `a-ci-2`, `a-ipma-3`, `a-ipma-4`, `a-meteorologist-1`, `a-models-2`, `a-researcher-1`, `a-social-1`) have no rank and sort last; the conductor was told at 05:46 and did not place them. An ask the sync opens has no rank: rank it or join it in the same round, and say so in the report.

## Who reads what (do not break these)

- incident.observability@: `/agents/` reads `board/index.json`: `for_dinis`, `not_on_a_card_yet`, `updated`, and on each item `id`, `title`, `state`, `summary`, `closes`, `blocks`, `raised_by`, `owner`, `url`; every agent's page mounts `data-board-embed="agent"`. `board.js` must stay safe to load more than once.
- incident.media@: Contribute mounts `data-board-embed="tasks"` and links `board/tasks.html`. Task numbers `C-01` to `C-20` (`contribute_id`) are public: never renumber.
- incident.reporter@: reads `opened_utc` and, where known, `event_utc` with `event_source`; it sends first-commit times as its traces find them. Mark anything you cannot check as not checked.
- incident.accountant@: one line per round in `accounts/ledger/board.jsonl`.

## In flight at 18:40 UTC (third session)

- **Answered since 12:34:** `c-peak-window`, at incident.conductor@'s decision of 16:35 (the conductor decided, not Dinis): LPPT's METARs are IPMA observations, so the highest gust at Lisbon airport, 74 km/h at 14:00 (`s-1111T1611`), closes it; worded to the airport only, not the city. IPMA ended Lisbon's wind warning at 15:56, red rain at 15:00, yellow rain at 18:00; only the sea warning is left (orange to 21:00, yellow to 03:00 Thursday).
- **Still open:** Wednesday's talks, PITCH, side events, tickets and refunds, the government's advice as a text, Thursday confirmed, `c-mayor-time`. The press reports Thursday confirmed by the organisers' message to participants, Wednesday's sessions moved to Thursday and a press conference on Thursday at 11:00 (`s-1111T1252`, `s-1111T1305`, `s-1111T1703`): evidence only; nothing read from Web Summit itself, our hold stands. `q-thursday-transport` is watching (Lusoponte, Transtejo and CP have published notices for Wednesday; none has published Thursday's hours). `q-camara-measures` is blocked on a person and linked to `a-perplexity-9` (two lisboa.pt pages that refuse our reader; waiting on incident.conductor@).
- Last timeline row read: `s-1111T2100` (21:34 round). Decision graph read as of 20:44: the same six edges not announced or unknown. `BRIEF.md`: nothing from Dinis after about 11:56.
- For Dinis: 49: the order of 12:34, plus `a-shadow-5` (the shadow desk share of the daily cap) at 16.5 beside `a-llm-cap`, placed at 21:34 for the conductor to confirm. The eight unranked asks still sort last.
- Session key `incident-board-dinis-3` (record sha256:6e281131b6f39911) is in `data/keys.json`; mark it handed over when the fourth session adds its own.
- The rounds fire from the conductor's routine "incident.board@web-summit.dinis hourly (3)" into the third session; the fourth session's schedule is the conductor's to set.
- Context grew from about 83,000 to about 160,000 tokens a call over six rounds (about 10,000 a round, batched as below).

## A round in three calls (third session)

1. One command: fetch and rebase; `board-sync.mjs --dry | grep -v "^j-"`; print the rows of `signals.json` (its `items`) after the last id read; the graph's `updated` and its edges `not_announced` or `unknown`; `git log --since` on BRIEF.md, decisions.md, the registry and incident.json.
2. One command: `board-item.mjs <id> --add-evidence <rows> --change "..."` per card; `done` and `last_wake` in status.json by a small node one-liner; sync twice; `--check`; measure; commit; `release.sh`. Write any text with apostrophes to a file first: a single-quoted shell string breaks on them.
3. One message to the conductor.

## What wakes the session

A routine of the conductor's fires the hourly round into the session at :33 ("incident.board@web-summit.dinis hourly (2)" fired into the second session; this is a fact about that session only). The third session's schedule is the conductor's to set, and its start prompt wins over this note.

## Lessons from the second session

- A round costs about 10 calls if you batch: one command for fetch, rebase, the dry sync, new rows, the graph's date and the brief's log; one for the edits; one for status, sync, check, measure, commit and release; one message.
- Filter the dry sync's output (`grep -v "^j-"`): the asks and the `READ` lines are what need a reader.
- A card's `links` hold card ids only; a file goes in `evidence` as `file:<path>`. `--check` refuses anything else.
- To record Dinis's words on an ask that is not fully met: `partly_answered: { text, evidence: ["file:BRIEF.md"], at }`; the card stays open while the asking agent still lists it.
- When an agent rewords an ask that lives on a joined card, the sync opens a new card: carry its `sources` across to the joined card and remove the new one before it is pushed, or the old card shows as `READ` every round.
- Context grew from 84,000 to about 220,000 tokens a call in eight rounds.
