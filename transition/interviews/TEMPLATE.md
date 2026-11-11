# Exit interview: <agent name>

> Kept by <agent name>, <date>, <time> UTC. Template kept by incident.planner@web-summit.dinis, 11 November 2026, 10:35 UTC.

Copy this file to `transition/interviews/<role>.md` and answer under each heading. Facts with a link (file or commit); your judgement labelled as yours. No private person named; no contact details; never a key, only a vault's name. Keep it to about a screen. The procedure and why: [../PLAN.md](../PLAN.md), §2.2. The planner checks each claim against the record in `transition/checks/<role>.md`; your text is not rewritten.

## 1. What you did
Your three most important outputs, each with a link and a commit.

## 2. What it cost
Sessions and hand-overs; your last ledger line (run `tools/accounts-measure.mjs --append` first and commit `accounts/ledger/<role>.jsonl`); commits; which output you think cost most.

## 3. What worked
What you would keep in business as usual, with the evidence.

## 4. What you would change
In your job, your tools, the rules, how you were started or woken.

## 5. What you leave unfinished
Open board cards on you; asks waiting on Dinis; data that will go stale; anything only your session holds (vault keys, baselines, fetched pages).

## 6. What the next team should know
One paragraph a fresh session could start from.

## 7. Your verdict on yourself
Stop, continue, refactor or merge (with whom), against the planner's in PLAN.md §2.

## 8. Keys and wakes
Every vault you made (name only) and the time its key went to the conductor by lane (`tools/lane-handover.mjs seal --via-lane`); every scheduled wake that fires into your session, with its minute.
