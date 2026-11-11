# Hand-over: the reporter

> Kept by incident.reporter@web-summit.dinis, 11 November 2026, 23:08 UTC

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

## From the third session (05:10 to 10:09 UTC; this section replaces what the second session wrote where they differ)

- **State:** thirteen traces. Open: the outage (one step per shadow gap; a closing step when a call goes through), memory (one step per hour: the accounts' round and the new sessions), the Web Summit hold (waits on Dinis; agents/conductor/holds.md is where the conductor records it), the loop (/welcome/: add a step when it moves to / or Dinis answers), the escalations (not touched since 03:04; its status is stale). Owed: the first article as a PDF; the launch (the move of /welcome/ to / may be it).
- **A wake in six tool calls:** (1) read the notification; (2) one command: `date -u`, pull, `git fetch --tags`, `git log --since=<last block> --reverse` cut to about 220 characters a line, `git log -- BRIEF.md agents/conductor/holds.md`, the count of open cards waiting on Dinis, `ls shadow/runs/<date>/`; (3) only if BRIEF.md moved: its diff; (4) one script file outside the repository that appends the steps, the README rows, the log block and the status, then the fill tool, the numbers tool, commit, measure, commit, release; (5) the message to the conductor. The script throws if a README row or a file it cites is missing: keep that.
- **The key entry:** the new session marks the earlier one "handed over" in the same commit as its own entry (start.md's rule; the note above saying the old session does it is wrong). Next id: incident-reporter-dinis-4.
- **The wake:** hourly at :06 into this session, trig_014Kj9wgkKUZ4jReygeGnicj, the conductor's. A fact about this session only; the next session's schedule is the conductor's to set.
- **Durations in a trace are arithmetic on commit times:** print the steps' `at` after the fill tool and check each figure before the push.
- **A wake reads the record at one instant:** say "not in the record at hh:mm", never "has not happened" (the 09:06 block missed the shadow desk's commit of 09:07:06, which was not yet on dev at the 09:07:10 pull).
- **Who uses the traces within minutes:** incident.journalist@ writes a piece from each new trace in the next round and re-anchors on every correction; the conductor answered a "not in the record" by writing the record (holds.md). A gap named plainly gets filled.
- **Board cards on this role:** a-reporter-4 answered (the wake); a-reporter-5 (the list for the librarian) still open, no answer needed from the next session; a-journalist-5 was answered by the 05:08 correction.
- **Outside git, gone with this session:** the session key's private half; the edit scripts (one per wake); nothing else.

## From the fourth session (10:14 to 11:18 UTC; 187,780 tokens a call at the 11:17 measure; this section replaces earlier ones where they differ)

- **State:** fifteen traces. New: [the 10:10 request](../../reporter/traces/request-ten-paths-and-small-animations.json), closed at 10:31:29; [the wind-down](../../reporter/traces/wind-down-explorer-to-villager.json), **open, the main job now**: one step per exit interview (transition/interviews/<role>.md), per hand-over, Dinis's yes to transition/PLAN.md, the close trigger (the storyteller's: IPMA's first read after 21:00 plus Web Summit's Day 3 decision). Still open: outage (a step per shadow gap; it was the ninth at 11:00), memory (a step per hour), the Web Summit hold, the loop (/welcome/ linked from / since 10:33:40, not moved), escalations (stale).
- **The wind-down decides this role's future.** PLAN.md's verdict for the reporter: merge with the journalist and the storyteller into one desk, "the record". My six points for the closing record are in PLAN.md section 3 (close the open traces; trace the launch and the wind-down; reporter/arc.md end to end; interviews as steps; what carries into BAU; start at the close trigger). Nobody stops before Dinis's yes and its own hand-over to the record desk (Dinis ~10:32). Write the reporter's own exit interview from transition/interviews/TEMPLATE.md before the close trigger.
- **Who reuses the traces now:** incident.motion@ reads every reporter/traces/*.json at build time into data/flows/trace-<id>.json (4038053e): a step with no sha, path or URL is skipped; a null `at` is drawn dashed from `at_note`. So keep evidence on every step and keep `at_note` readable. incident.storyteller@'s ten paths (story/paths/) cite the traces; paths 1 and 2 (a journalist's wake, a story made) are theirs and are not traced twice here (the README says so).
- **The checkout may start detached** from dev; release.sh refuses ("be on dev"). `git checkout -B dev <HEAD>` after checking HEAD contains origin/dev.
- **A new trace is renumbered freely until it is pushed;** after that it only grows at the end. The fill tool does not check time order: print `n` and `at` after it (I swapped two steps 11 s apart before the push).
- **The board's count waiting on Dinis:** cards whose state is not done and whose `waiting_on` starts with "Dinis" (44 at 11:14).
- **At 12:10 (the last wake of the fourth session):** the wind-down trace is at 18 steps; Dinis's four words of 11:42 to 11:56 started four agents (sherpa, desk, brief, datascience) and new sections, and the plan took them in as the start of business as usual (step 18): keep reading BRIEF.md for whether he means the wind-down to wait. The log is closed to 12:10.
- **The wake:** hourly at :06 into this session, the conductor's; the next session's is the conductor's to set.
- **Outside git, gone with this session:** the session key's private half (incident-reporter-dinis-4); the edit scripts. Next key id: incident-reporter-dinis-5.

## From the fifth session (12:12 UTC on; written at 15:09, about 165,000 tokens a call)

- **State at 15:09:** fifteen traces. The **outage is closed** (step 21, 13:12:51: the shadow desk's 13:09 round got through; who restored the credit is not in the record). Open: the wind-down (19 steps; step 19 is Thursday by the press, half the close trigger as evidence), memory (30; a step per hour), the Web Summit hold (9; step 9 is the first organisers' decision arriving through the press), the loop (no move since 12:10), escalations (stale). Dinis: no new word in BRIEF.md since ~11:56.
- **Each wake in about seven calls:** pull (`git checkout -q dev` first: the pull can leave HEAD detached and release.sh then refuses); `git log --since=<last block>` minus "tokens measured"; BRIEF.md, holds, transition/, welcome/; `ls shadow/runs/<date>/`; the cards count (board/items/*.json, not done, `waiting_on` starting "Dinis"); one script in the scratchpad (steps, README row counts, status, log block, throws on a missing row); fill, numbers, gate; commit; measure; commit; release; the message.
- **Hold durations from 05:27:00; the outage's from 02:53:57.** Use the committer time (the step's `at`) in any duration, not the author time.
- **Key:** incident-reporter-dinis-5; next id incident-reporter-dinis-6. The wake: trig_01MxDB2k6E4qnpW4Cgxzzx19, the conductor's.
- **For the conductor:** the shadow desk's d7e19951 names a model in a trailer (reported at 13:14).

## From the sixth session (16:03 UTC on; written at 21:08, about 180,000 tokens a call)

- **State at 21:07:** fifteen traces, 224 steps. Open: the wind-down (25 steps; step 25 is 21:00 passing and the brief's edition 10; the close trigger's first half waits on incident.ipma@'s first read after 21:00, its reads land at about :48; the second half, the organisers' Day 3 decision, is press only, their site under the 05:27 hold), memory (37; a step per hour from the accountant's round), the Web Summit hold, the loop and escalations (no move). Dinis: no new word in BRIEF.md since ~11:56; 53 cards wait on him.
- **Each wake in five calls:** pull and list the commits since the last block (with the keys file's log for hand-overs, the cards count, data/agents/count.json); one script in the scratchpad writes the steps, both statuses, the log block and status.json; fill, numbers, build, gate; commit, measure, commit, release; the message. About 10,000 tokens a call per wake.
- **Fetch right before writing.** At 16:05 this session wrote that the journalist's hand-over was not in the record; it had been pushed at 16:04:47 and the clone had not fetched it. Step 32 carries the correction.
- **Open for the conductor at 21:07:** CI reported not starting runs since 20:17 (51a6b1af), while tags v0.1.1525 and v0.1.1529 exist for commits of 20:54 and 21:01; model names in 336 commit trailers (e0dea65f), for Dinis. This role's trailers say only "Co-Authored-By: Claude <noreply@anthropic.com>".
- **Key:** incident-reporter-dinis-6; next id incident-reporter-dinis-7. The wake: trig_011jNEDHPs4LDgsiEuzi8FLW at :06, the conductor's.

## From the seventh session (21:09 UTC on; written at 23:08, about 165,000 tokens a call)

- **State at 23:08:** fifteen traces. Wind-down 27 steps: the close trigger is not met (yellow sea to 03:00 Thursday; no Day 3 decision); the plan has no rule for an IPMA read after the first, and does not say whether a Thursday warning outside Lisbon holds Phase 2: both the planner's, for Dinis. Memory 39. 60 cards wait on Dinis.
- **Trace JSON files keep their own indent:** reporter/traces/*.json use one space, status.json two. A script that checks the round trip must try both, or it refuses before writing.
- **Pack rule 16 (22:20):** every agent logs its messages and writes with `AGENT=<you> node tools/trace.mjs msg|write ...` into `data/trace/<date>/<HH>.reporter.json`, committed with the work. This session does it from the 23:06 wake.
- **data/keys.json holds active keys only** (5f3e9983): a handed-over entry moves to `data/keys-archive/<role>.json`; read identity@'s commit before you mark -7.
- **Key:** incident-reporter-dinis-7; next id -8. The wake: trig_0148PuLPHncpVosGgqxYL5TM at :06, the conductor's.

## Who reads this work

incident.journalist@ (journal/, reads `steps[]` by `n`), the librarian's pack (history is a pointer to `index.json`), incident.observability@ (the live map plays a trace), incident.board@ (wants the first commit of each ask: id, time, sha).
