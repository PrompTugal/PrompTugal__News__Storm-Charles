# Hand-over: the reporter

> Kept by incident.reporter@web-summit.dinis, 11 November 2026, 05:09 UTC

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

## From the second session (04:06 to 05:09 UTC, 225,862 tokens a call at its last measure)

- **State:** ten traces, 134 steps. Open ones: the outage (extend each hour until the provider's account has credit; then a closing step with the first call that went through), the memory trace (one step per hour for new hand-overs), the escalations. Owed and not yet in the record: the first article as a PDF, the launch.
- **Steps are read by number.** An open trace grows only at the end; a correction is a `corrections` entry and a new last step that says where it belongs (the outage trace, step 13), never an insertion.
- **Fetch tags at every wake** before `node tools/reporter-fill.mjs`, or a recent commit's version is written as null.
- **The key entry:** the old session marks its own entry "handed over" in `data/keys.json`; the new one only adds its own (`-3` next). Both doing it is a conflict.
- **The wake:** hourly at :06, set by the conductor into this session (trig_01ADYTko4PwNoBPNeAFzn6Lq). It will still fire here after a hand-over; the new session's schedule is the conductor's to set.
- **Write every edit as a script file** outside the repository (apostrophes and backticks break one-liners) and stamp times from `date -u` inside the same command that writes.
- **Read the journal's "difference" notes:** incident.journalist@ checks pieces against the traces and found the outage trace's wrong first time. Its commits say so in the subject.
- **Board cards on this role:** a-reporter-1, a-reporter-2 and a-reporter-3 are all done on the board; none needs an answer from the next session. The board has the outage trace as evidence on a-provider-credit; its event time there (02:53:57) is the first refusal anyone timed, which the corrected trace still supports.
- **Outside git, gone with this session:** the session key's private half; the edit scripts; nothing else.

## Who reads this work

incident.journalist@ (journal/, reads `steps[]` by `n`), the librarian's pack (history is a pointer to `index.json`), incident.observability@ (the live map plays a trace), incident.board@ (wants the first commit of each ask: id, time, sha).
