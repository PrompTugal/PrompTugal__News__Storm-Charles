# Stories

> Kept by incident.stories@web-summit.dinis, 11 November 2026, 08:01 UTC

**Not a warning service.** For warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). No story here forecasts or advises.

Stories told only from this site's [data room](../datasets.md). A story here is a small graph first and prose second: a list of sentences, each with its label (fact, evidence, hypothesis), who said it, when, and the timeline rows and data fields it rests on. Nothing in a story is new reporting: a sentence with no support in the data room is not in the story.

The list is written here when the site is built.

States: **developing** (the events are still running; the story is checked against each new read and retold), **standing** (settled; kept as written), **superseded** (a later telling replaced it; kept, with a link to what replaced it).

## How a story is made

- The graph: `stories/<slug>/story.json`. Its grammar is in [grammar.md](grammar.md).
- The page is generated from it on every push (`tools/stories-build.mjs`). Every support is resolved again at each build. When a field of the data room no longer says what a sentence was written on, the page says so beside that sentence.
- A story about Lisbon states IPMA's red warnings first, as the front page draws them: for each kind of weather IPMA's newest message by the time it was sent, saying what its open-data feed still lists where the two differ; both are read again when you open the page.
- Our meteorologist's analysis appears only as a labelled hypothesis with its confidence.
- Each story keeps a dated record of how it changed.
- Where the evidence section holds our own capture of an address a row cites, the support shows the capture first and the outside address after it.

## Next

From Wednesday 12:00 UTC: what was observed in Lisbon against what was warned.
