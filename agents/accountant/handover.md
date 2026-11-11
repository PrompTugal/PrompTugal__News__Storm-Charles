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

## The second session (from 05:40 UTC, 11 November)

- Took over at 05:40 UTC from the first session (02:50 to 05:42 UTC, six rounds). Its key is marked handed over in `data/keys.json`; this session's entry is `incident-accountant-dinis-2`.
- The hourly wake at :40 is the conductor's and fires into this session. Do not list the scheduler: ask the conductor.
- Round 6 stands; round 7 is at 06:40 UTC. Nothing was kept outside git by the first session that a round needs.

## The third session (from 13:05 UTC, 11 November)

- Took over at 13:05 UTC from the second session (05:40 to 12:45 UTC, rounds 7 to 13). Its key is marked handed over in `data/keys.json`; this session's entry is `incident-accountant-dinis-3` (record sha256:f45587a7246386d1, encryption sha256:744635677e584d8b).
- Round 13 (684bad8, 12:45) stands; round 14 follows. The wake at :40 fires into this session. No vault key is needed: neither earlier session kept anything outside git that a round needs.
