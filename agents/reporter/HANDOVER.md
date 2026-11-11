# Hand-over: the reporter

> Kept by incident.reporter@web-summit.dinis, 11 November 2026, 04:05 UTC

For a fresh incident.reporter@ session. Read the pack's start first ([library/pack/start.md](../../library/pack/start.md)), then this, then [reporter/traces/index.json](../../reporter/traces/index.json). Do not re-read the repository: the traces and the log are the memory.

## What you own and how it is made

- `reporter/traces/<id>.json`: written by hand, one workflow each (shape: [reporter/traces/README.md](../../reporter/traces/README.md)). For a commit step write only `actor`, `kind`, `sha`, `in`, `out`, `handoff`, and any `evidence` of type file or url; then run `node tools/reporter-fill.mjs`, which fills `at`, `for`, the commit and the served version, numbers the steps, rewrites `index.json`, and refuses a step with neither evidence nor an `evidence_note`. It needs a **full clone with tags** (`git fetch --unshallow; git fetch --tags`). A commit in SGit-AI__Website__Web-Summit takes `repo`, `at` and a hand-written commit entry.
- `reporter/log.md`: append one block per hour above "Open questions" (asked, shipped, broke, corrected, waited on Dinis); update the five lines at the top; a code is a commit.
- `reporter/numbers.json`: `node tools/reporter-numbers.mjs`; never by hand.
- Each wake: read the clock (`date -u`) **before** writing any time; pull; read the commits since the last log block, BRIEF.md's last section, the board's cards waiting on Dinis; then the measure step ([accounts/measure.md](../../accounts/measure.md)); gate; commit (all trailers in one final paragraph, no model name); `AGENT=incident.reporter@web-summit.dinis admin/tools/release.sh`; a few numbered lines to the conductor.

## What I learned the hard way

- I stamped files ahead of the clock twice. The fill tool refuses it now; the habit is still: clock first.
- An unquoted shell here-document eats the backticks around commit codes. Write text from a script file.
- Read the file before quoting its figure (the pack test: I first wrote that both arms scored the same; they did not).
- `git`'s trailer parser sees only the last paragraph; read `For:` from the whole message (the fill tool does).
- BRIEF.md's "~" times are the conductor's estimates; the conductor's answer (03:05): follow the commits.
- A private person is never named; the corrections trace does not repeat the withheld address and nobody should search history for it.

## Outside git, gone with this session

The session key's private half (make a new key; mark this one handed over in `data/keys.json`). A shallow clone of the reference repository (WS-212, `team/reporter/`, `team/incidents/`): clone it again only if a step before 21:14 on 10 November needs checking. The hourly wake is a scheduled task of this session: set your own.

## Who reads this work

incident.journalist@ (journal/, reads `steps[]` by `n`), the librarian's pack (history is a pointer to `index.json`), incident.observability@ (the live map plays a trace), incident.board@ (wants the first commit of each ask: id, time, sha).
