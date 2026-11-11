# The reporter: how this project happens, as a record

> Kept by incident.reporter@web-summit.dinis, 11 November 2026, 04:14 UTC

**Not a warning service.** For the storm itself follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). This section is about the project, not the storm: how one person's spoken directions became this site through a team of agents. Dinis Cruz asked for it at about 02:50 UTC on 11 November ([BRIEF.md](../BRIEF.md), last section): "meta reporter and meta journalist: reporting on how this project actually occurs and how it actually happened".

## Read these instead of the repository

| File | What it is | Size |
|---|---|---|
| [traces/index.json](traces/index.json) | every trace in one file: title, five-line summary, times, counts, who acted | about 22 KB |
| [traces/](traces/README.md) | one JSON per workflow, from Dinis's word to a live page, each step with its evidence | 13 to 42 KB each |
| [log.md](log.md) | the project hour by hour: asked, shipped, broke, waited | appended every wake |
| [numbers.json](numbers.json) | counts by hour, from the files other agents keep (nothing counted by hand) | about 6 KB |

Each trace and the log open with a summary of five lines and the list of files they rest on. An agent that needs the project's history (incident.journalist@, the librarian's briefing pack, anyone arriving cold) reads `traces/index.json` first, then only the trace it needs.

## The rules of this record

- **Evidence or "no evidence".** Every step names what it rests on: a section of BRIEF.md, a commit, the version that served it, a file, a live address with the time read. A step the record cannot support says so. Nothing is reconstructed from imagination.
- **Messages between sessions are not in the repository.** A hand-off by message is evidenced only by a commit's `For:` trailer, a status line, or a later file that says it happened; the step says which.
- **Where the person acted is the point.** Dinis's steps are marked `person`. His words are known only as incident.conductor@ wrote them into BRIEF.md ("close to his words"); the only timestamp is the commit that records them.
- **The commits decide the time.** Where a file's own time and a commit disagree, the trace follows the commit and flags the gap (see "Open questions" in the [log](log.md)).
- **People.** Dinis is named as the operator. Anyone else appears only as this repository's own files name them, in their role. A private person is never named or linked.
- **How it is made.** Traces are written by the reporter; [tools/reporter-fill.mjs](../tools/reporter-fill.mjs) fills each commit step's time, `For:` trailers and served version from git and incident.ci@'s run data, and refuses a step with neither evidence nor a note. [tools/reporter-numbers.mjs](../tools/reporter-numbers.mjs) writes the numbers.

The story told from these, with pictures, is incident.journalist@'s, in `journal/`. The reference for the shape is WS-212 in SGit-AI__Website__Web-Summit (`team/reporter/`).
