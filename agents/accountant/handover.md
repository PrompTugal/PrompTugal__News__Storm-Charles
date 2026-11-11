# Hand-over: incident.accountant@

> Kept by incident.accountant@web-summit.dinis, 11 November 2026, 21:43 UTC

For a fresh accountant session. Read the librarian's pack (`library/pack/start.md`, `library/pack/accountant.md`), this note and [status.json](status.json); open nothing else until you need it.

## A round, in order

1. `git pull` on dev; `node admin/build/build.mjs` (the page count comes from `_site/`); `node tools/accounts-build.mjs` (it writes `accounts/*.json` and `accounts/index.md`; never edit those by hand).
2. Read the ledger as numbers only, with a one-off `node -e` over `accounts/ledger/*.jsonl` (per session: calls, tokens per call in its last hour, context on the last call). Never print a whole line: the lines are long.
3. Update by hand: `accounts/savings.md` (largest cost first; every figure measured, estimated or hypothesis, with the time read), a new `accounts/briefs/<stamp>.md` (six numbered lines for Dinis, the one thing he must act on marked "For you"), `status.json`.
4. `AGENT=incident.accountant@web-summit.dinis node tools/accounts-measure.mjs --task "<line>" --quality pass --append`, then build the books again, commit (all trailers in one final paragraph), `admin/tools/release.sh`.
5. Tell the conductor in at most five numbered lines. Schedule the next round.

## What is true now

- The method and its limits: [accounts/measure.md](../../accounts/measure.md). An agent pushes its own line; the accountant files none on another's behalf.
- A session is identified in the ledger by a hash; an agent with several sessions has several: the latest line of each counts.
- The pack test: [accounts/pack-test.json](../../accounts/pack-test.json). Keep its shape (the librarian's page reads it). Repeat it when the pack changes: two sub-agents, the prompts are the ten files or the three pack files and the same eight questions.
- `accounts/provider.json` is kept by hand from incident.models@'s status file.
- Open: three agents with no line (dev, meteorologist, researcher: the conductor relays), the conductor's sessions after 02:58 UTC, `app/accounts/` not built, no Accounts entry in the menu (asked of the designer), a smaller model for the hourly refreshes not tested.
- An error to remember: the first measure page said the path check would only warn. Check a claim about another agent's tool by running it before writing it down.

## The second session (05:40 to 13:06 UTC, 11 November): for the third

Seven rounds (7 to 13), briefs 7 to 13. The conductor started the third session (session_018yvwtMAwJzdrTaR5WLF97a) at about 13:05 UTC and moved the :40 wake to it; the wake no longer fires into the second session. The third marks `incident-accountant-dinis-2` handed over in `data/keys.json` in the same commit as its own entry (`-3`); the second leaves that file alone.

**The round's numbers in one command:** `node tools/accounts-round.mjs | cut -c1-140` (new at 13:06 UTC): every agent's current session with the context on its last call, its previous session's last hour, the team's last hours, and those hours with and without the conductor. It replaces step 2's one-off script. The edits to `savings.md` each round were made with a small replace script, never by reading the file whole (it is long: `grep -n '^#\|^- \*\*'` first).

**What the conductor wants from a report (its word, 06:42 UTC):** three lines only: the team's tokens per call this hour, who must hand over next, anything wrong; plus the brief's link.

**Where round 13 left the books (12:42 UTC):** 30 of 41 agents measured, 2.51 billion tokens in 8,938 calls; the conductor 31% of it (one session, three compactions, its line to 11:42); the team at 187,811 tokens a call in the 10:00 hour and the others alone at 150,078; twenty-two agents have handed over. Next to hand over: archivist (467,435), sources (430,857), models (403,575, line from 09:31), shadow (311,034), perplexity (254,728, line from 05:27), and the conductor. Model spend 1.06 of 20 US dollars, unchanged all day; the provider's account out of credit since 02:55 UTC (last read 09:31, incident.models@'s status; `accounts/provider.json` still carries the 02:57 read).

**Lessons, each from an error published and corrected:**

- A second session in the ledger is not a hand-over unless its line is the later one (ipma, brief 7: nineteen became eighteen).
- Never conclude from the hour in progress, and an hour's figure settles only when the next hour's lines are in (briefs 8 and 9).
- The conductor's line arrives hours late and is a third to a half of an hour's tokens: give the team's figure only beside the figure without the conductor, and say to what time its line runs (brief 10's "cheapest yet").
- Use the real clock for every "Kept by" and "done" time (`date -u`).

**Open:**

- The wind-down: [transition/PLAN.md](../../transition/PLAN.md) waits on Dinis's yes. The accountant is among the early eleven: one closing round as `accounts/closing.md` (tokens per agent, model spend, CI, pages, cost per output), an exit interview in `transition/interviews/accountant.md` when the planner asks, then merged into *operations* with observability and ci. Nothing of it is started.
- Eleven agents with no line (dev, meteorologist, researcher, envoy and those started since 09:50 UTC); the roster grows each hour (`accounts-build.mjs` reads it from `agents/policy.json`).
- `app/accounts/` not built; the Accounts entry in the menu still asked of the designer (card `a-accountant-1`); the librarian's card `a-librarian-8` is answered (the measure page's commit example, 05:41 UTC) and can close.
- Nothing was kept outside git that a round needs: the second session's scratch scripts are gone with it, and `tools/accounts-round.mjs` stands for them.

## The third session (from 13:05 UTC, 11 November): for the fourth

Took over at 13:05 UTC from the second (05:40 to 13:06 UTC). Its key is `incident-accountant-dinis-3` (record sha256:f45587a7246386d1, encryption sha256:744635677e584d8b); the fourth marks it handed over in the same commit as its own `-4`. Rounds 14 to 23, briefs 14 to 23. At 21:41 UTC this session was at about 215,000 tokens a call (89 calls); a fresh one starts near 100,000.

**A round, as done now (about ten calls):** `git pull`; `node admin/build/build.mjs`; `node tools/accounts-build.mjs`; `node tools/accounts-round.mjs | cut -c1-140` (sessions, the hours with and without the conductor); a one-off split of each recent hour into three groups (the conductor, the five never handed over: archivist, sources, shadow, perplexity, models; the rest), with share of tokens; then one python script that edits `savings.md` by exact replacements (the table rows in item 2, a new "As read at" bullet above the last one, the header's round and total), writes `accounts/briefs/<date -u>Z.md` (six lines, one "For you"), and updates `status.json`; then `accounts-measure.mjs --append`, build, validate, commit, `release.sh`; three numbered lines to the conductor with the brief's path.

**Where round 23 left the books (21:41 UTC):** 3.30 billion tokens in 12,009 calls, 30 of 41 agents measured. The conductor: one session since 18:56 UTC on 10 November, five compactions (the last just before 19:24, 128,704 a call at 19:42; it grew about 100,000 an hour after the fourth), 36.5% of all tokens, no line since 19:42. The handed-over agents run at 130,000 to 180,000 a call. The five never handed over (held for Dinis, the conductor's word at 19:43): shadow 541,123, archivist 541,115, sources 500,679, perplexity 409,543 (line from 17:51), models 403,575 (line from 09:31); 29% of the 20:00 hour's tokens on 15 of 128 calls. Calls fell from 1,025 an hour at 10:00 to about 130. Model spend 1.06 of 20 US dollars all day.

**Lessons this session:**

- All trailers in one final paragraph; Co-Authored-By names no model (the gate warned on 8858e46).
- Name a brief by `date -u` at writing, not the round's :45 (the conductor, 14:41 UTC).
- A rising hour without the conductor can be the mix: split it into the five and the rest before calling it a rise (round 20).
- The conductor's line comes hours late and its compactions move the ranking: re-rank from its line when it arrives (19:44, brief 21 added to).
- Release can collide with another accountant session's last commit: take theirs, re-add yours, rebuild the books (round 14).

**Open:** the wind-down (transition/PLAN.md) waits on Dinis's yes: one closing round as `accounts/closing.md`, the exit interview when the planner asks. `app/accounts/` not built; the Accounts menu entry still asked of the designer; eleven agents with no line; `accounts/provider.json` updated at 23:41 from incident.models@'s 22:04 read (in credit again).


## The fourth session (from 21:43 UTC, 11 November)

Took over at 21:43 UTC from the third (13:05 to 21:43 UTC). Its key is `incident-accountant-dinis-4` (record sha256:f5ee47b30db87081, encryption sha256:4ff7a437f6d71ed0); the third is marked handed over. Round 24 at 22:40 UTC.
