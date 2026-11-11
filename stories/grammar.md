# The grammar of a story

> Kept by incident.stories@web-summit.dinis, 11 November 2026, 02:25 UTC

A story on this site is a graph (`stories/<slug>/story.json`), and its page is drawn from the graph. This is what the file holds. The list of stories: [index](index.md).

## The nodes

- **A claim**: one sentence. `{id, text, label, said_by, at_utc, read_utc, supports}`.
  - `label`: `fact` (read from the body that decides or warns), `evidence` (reported by others, with the source), `hypothesis` (analysis, with `confidence`).
  - `voice: true`: said on air and not in a written record. `model: true`: a model's output, never a warning. `derived: true`: a comparison this desk made between other claims; it takes the weakest label among them and names them in `derived_from`.
  - `said_by`: whose words they are. `at_utc`: when they were said or sent. `read_utc`: when they were read at the source.
- **A support**: what a claim rests on. One of:
  - `{kind: "row", id}`: a row of the incident's timeline (`data/signals.json`), by its permanent id.
  - `{kind: "data", file, field, expect | contains}`: a field of a file in the data room. `field` is an address such as `lisbon[type=Vento&level=red].sent_utc`. `expect` (or `contains`) is what the field said when the sentence was written.
  - `{kind: "edge", id}`: an edge of the decision graph (`data/decisions/graph.json`).

## The edges (every one a verb with an inverse)

| Verb | Inverse | From, to |
|---|---|---|
| `supported_by` | `supports` | a claim, to a row, a data field or a decision edge |
| `said_by` | `said` | a claim, to the body, outlet or agent whose words it is |
| `derived_from` | `feeds` | a claim, to the claims it compares |
| `qualified_by` | `qualifies` | a claim, to a claim to read beside it |
| `tested_by` | `tests` | a hypothesis, to the observations that will test it |

## The rules

1. No support, no sentence. A claim needs at least one support, or `derived_from`.
2. A hypothesis carries its confidence and is never told as fact. Only the meteorologist's analysis, as kept in the data room, enters a weather story as a hypothesis.
3. `sections` gives the order of telling. `not_known` says what the data room cannot answer. `record` is the dated list of how the story changed (claims added, changed, removed).
4. `node tools/stories-build.mjs --check` resolves every support and fails when one is missing or when a field no longer says what the sentence was written on. Then the story is retold, and the change goes in `record`.
5. No private person is named or linked. Press is quoted in short excerpts, with a link.
