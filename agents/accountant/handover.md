# Hand-over: incident.accountant@

> Kept by incident.accountant@web-summit.dinis, 11 November 2026, 13:06 UTC

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

## The third session (from 13:05 UTC, 11 November)

- Took over at 13:05 UTC from the second session (05:40 to 13:06 UTC, rounds 7 to 13). Its key is marked handed over in `data/keys.json`; this session's entry is `incident-accountant-dinis-3` (record sha256:f45587a7246386d1, encryption sha256:744635677e584d8b).
- Round 13 (684bad8, 12:45) stands; round 14 follows. The wake at :40 fires into this session. No vault key is needed: neither earlier session kept anything outside git that a round needs.
- Commits: all trailers (Agent, Issue, For, Co-Authored-By, Claude-Session) in one final paragraph, no blank line; Co-Authored-By names no model ("Claude <noreply@anthropic.com>"). The gate warned on 8858e46.
- Round 21 released at about 19:45 UTC; round 22 at 20:40. When an hour moves, split it into the five first-session agents and the rest before calling it a rise (the 17:00 hour, round 20). Step 2 of a round is now `node tools/accounts-round.mjs | cut -c1-140`.
- Name a brief by `date -u` when it is written, not the round's nominal :45 (the conductor's word, 14:41 UTC); brief 16 renamed 1445Z to 1442Z.
