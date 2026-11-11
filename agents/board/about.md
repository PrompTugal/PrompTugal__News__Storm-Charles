# How the board is kept

> Kept by incident.board@web-summit.dinis, 11 November 2026, 02:30 UTC

Keeps [the board](../../board/index.html): what is still open on Storm Charles, each item a card joined to its evidence. Started by incident.conductor@ at Dinis Cruz's word (BRIEF.md, 02:10 on 11 November: "move all this into a Kanban, project-management workflow ... each of these becomes almost a mini project that we connect so we can track it"). Its state: [status.json](status.json).

## What a card is

One small file, `board/items/<id>.json`. The id is permanent (`q-` question, `c-` conflict, `a-` ask, `j-` job, `t-` task for contributors).

| Field | What |
|---|---|
| `kind` | question (the authorities or organisers have not said), conflict (two sources disagree), ask (waits on Dinis or another agent), job (work an agent has taken on), task-for-contributors (what a reader could do now) |
| `state` | open, watching, blocked (with on whom, in `waiting_on`), answered (with the evidence that answers it, in `answer`), done |
| `owner`, `raised_by`, `waiting_on` | who works it, who asked, who it waits on (an agent, "Dinis", or the outside body that would answer) |
| `summary`, `closes` | the card in plain words; what would close it |
| `who_answers`, `where_we_look` | for a question: the primary source, and the addresses read for it |
| `sides` | for a conflict: each claim, who holds it, its evidence |
| `evidence` | ids: a timeline row (`s-1110T1909`), a decision edge (`websummit-n6`), a file (`file:<path>`); evidence ids when incident.archivist@'s captures exist |
| `links` | connected cards |
| `sources` | the line in an agent's status file the card came from (its hash, so a changed or removed line shows) |
| `opened_utc`, `event_utc` | when the board first read it; and, where known, when the matter itself was first written down, with the commit it comes from (`event_source`), so a wait can be measured from the cards alone |
| `partly_answered` | what has been answered so far, with its evidence, when the card stays open for the rest |
| `history` | every move: when, by whom, what changed |

## The rules it keeps

- A question is answered only by a primary source: the body that decides or warns, on its own channel. The generator refuses an answered question or conflict whose answer points at no fact.
- No answer is invented: a card says only what a row, an edge or a file says.
- No private person and no contact detail on a card. The generator refuses a card that carries an address or a link to a personal account.
- Not a warning service: no forecast or advice of our own.

## How it is kept

Each wake: re-read `agents/*/status.json`, the timeline and the decisions; `node tools/board-sync.mjs` does the mechanical part (a new line in an agent's asks or next list becomes a card in the agent's own words; a reworded line keeps its card; a job that left its owner's next list moves to done; an ask whose line is gone is listed to be read, never closed by the tool); `node tools/board-build.mjs --check` lists the status lines not on a card yet and the cards whose line is gone; move cards with `node tools/board-item.mjs <id> --state ... --change "..."`, which writes the move into the card's history. The build runs `tools/board-build.mjs --out _site`, which writes `board/index.json`, `board/tasks.json` and the pages; no generated file is tracked.

## For other pages

`app/board/board.js` also draws small lists on any page: the contributor tasks (`data-board-embed="tasks"`), one agent's cards (`data-board-embed="agent"` with `data-agent`), what waits on Dinis (`data-board-embed="dinis"`). Each takes `data-base`, the path to the site's root.
