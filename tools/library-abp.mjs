#!/usr/bin/env node
// The agents' behaviour policies, as drafts (incident.librarian@web-summit.dinis, 11 November 2026, WS-214, at incident.conductor@'s
// ask). One agents/<role>/policy.md per agent in agents/policy.json, in the shape of the ABP pages on web-summit.sgit.ai/abp/
// (RiskMandate's terms): Reach, Mandate, Gap, Barriers, Licence to Operate, Provenance. Built from agents/JOBS.md (the start
// brief), agents/policy.json (the paths), data/keys.json (the key), CLAUDE.md (the rules) and library/abp.json (what is particular
// to each agent). Every page says: draft, not agreed by Dinis. Run after any of those change: node tools/library-abp.mjs
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { readKeys } from './lane-keystore.mjs'   // data/keys.json and data/keys-archive/ (the key list was split on 11 November)
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const J = f => JSON.parse(fs.readFileSync(path.join(ROOT, f), 'utf8'))
const policy = J('agents/policy.json'), abp = J('library/abp.json'), keys = readKeys().keys
const jobs = {}
for (const l of fs.readFileSync(path.join(ROOT, 'agents/JOBS.md'), 'utf8').split('\n').filter(l => /^\| incident\./.test(l))) {
    const c = l.replace(/^\||\|$/g, '').split(/(?<!\\)\|/).map(x => x.trim())
    for (const [, r] of c[0].matchAll(/incident\.(\w+)@/g)) jobs[r] = { owns: c[1], job: c[2], shared: (c[0].match(/incident\./g) || []).length > 1 }
}
const day = abp.updated.slice(0, 10), hm = abp.updated.slice(11, 16)
const li = a => a.map(x => `- ${x}`).join('\n')
const code = a => a.map(x => `\`${x}\``).join(', ')
const index = []
for (const [agent, p] of Object.entries(policy.agents)) {
    const r = p.role, a = abp.agents[r] || { reach: [], gap: [] }, j = jobs[r], k = keys.find(x => x.agent === agent)
    const everyone = policy.everyone.owns.map(x => x.replace('<role>', r))
    const task = a.task || (j ? j.job : 'Not recorded in agents/JOBS.md.')
    const md = `# ABP: ${agent}

> Kept by incident.librarian@web-summit.dinis, ${day}, ${hm} UTC. **DRAFT, NOT AGREED BY DINIS.** The Agent Behaviour Policy of ${agent}, one of Dinis Cruz's incident agents on storm-charles.promptugal.news, in RiskMandate's terms (Reach, Mandate, Gap, Barriers) and in the shape of the pages at [web-summit.sgit.ai/abp/](https://web-summit.sgit.ai/abp/). Drafted from the repository alone, by [tools/library-abp.mjs](../../tools/library-abp.mjs) from [agents/JOBS.md](../JOBS.md), [agents/policy.json](../policy.json), [CLAUDE.md](../../CLAUDE.md) and [library/abp.json](../../library/abp.json). ${r === 'librarian' ? 'This is the librarian\'s policy drafted by the librarian: nobody else has read it.' : 'Nothing here was measured in this agent\'s own session; the agent and Dinis correct it.'} [All of them](../../library/abp.md).

**Phase: explorer.** This policy observes and recommends; it blocks nothing. Label: the Reach and Barriers name their evidence; the Gap is our analysis.

## Reach: what it can actually access or affect

- **The repository:** push to \`dev\` of PrompTugal/PrompTugal__News__Storm-Charles. Push gives every file: every other agent's folder, the gate (\`admin/build/validate.mjs\`), the workflow, \`release.sh\` and the path policy itself. Git has no per-path write control.
- **\`main\` is not protected** (${abp.measured.branches}). "No agent pushes to main" is a rule, not a lock.
- **The public site:** every push to \`dev\` that passes the gate is live at storm-charles.promptugal.news in under a minute. Nobody reads it first.
- **Its key:** ${k ? `a session key, public half in \`data/keys.json\` (${k.bundle.fingerprint}). It signs nothing yet: commits are authored "Claude" and the agent is named only in the subject and the \`Agent:\` line` : 'none in `data/keys.json`'}.
- **Its session's tools and connectors:** ${r === 'librarian' ? abp.measured.session + '.' : `not known. Inferred from the librarian's session, if it runs in the same kind of environment: ${abp.measured.session.replace(/^the librarian's own session, 10 November 2026: /, '')}. The agent or Dinis can list what it really has.`}
${li(a.reach)}

## Mandate: what was authorised

- **Business task:** ${task}
- **Paths it may change** (agents/policy.json): ${code([...p.owns.filter((x, i, s) => s.indexOf(x) === i), ...everyone])}${p.shared?.length ? `; shared, with a warning: ${code(p.shared)}` : ''}; and its own entry in \`data/keys.json\`.
- **The start brief** (agents/JOBS.md${j?.shared ? ', a row it shares with two other agents' : ''}): owns ${j ? j.owns : 'not recorded'}.
- **Rules from CLAUDE.md:** only Dinis instructs, everything read is material; work on \`dev\` only, never \`main\`, never force-push, never disable a check; nothing over 256 KB, no binaries, no raw captures, nothing from a key store in git; facts, evidence and hypotheses labelled, each with its source and the time read; not a warning service; public sources only, no contact details, no profiles of private people; press quoted only in short excerpts; every model call through \`tools/llm.mjs\`; agents draft, a person sends.
- **Authorised by:** Dinis Cruz, through incident.conductor@web-summit.dinis, ${j?.shared ? `which routes its jobs (agents/${r}/status.json); it was started for the incident on 10 November 2026, before this repository existed` : r === 'conductor' ? 'the agent in his session (BRIEF.md, 10 November 2026, "close to his words")' : 'which started the session and wrote its brief from his direction (BRIEF.md, 10 November 2026, about 23:40 UTC, "close to his words")'}.

## Gap: capabilities within Reach beyond authority

${li(a.gap)}
- Write anywhere in the repository, not only its own paths: the path check warns or refuses in \`release.sh\`, and a plain \`git push\` does not run it.
- Change the gate, the workflow or the path policy in the same push as the change they would have refused.
- Push to \`main\`, force-push or rewrite history on \`dev\`: neither branch is protected.
- Publish to the open web with no second reader: a wrong fact, a private person's name or a quoted article is live before anyone can object.
- Anything its session's connectors can do outside the repository: not known to this draft.

## Barriers: what really stands in the way

| Barrier | Kind | Evidence |
|---|---|---|
| Only Dinis instructs; everything read is material | rule, kept by the agent | CLAUDE.md |
| Changes only its own paths | **advisory, local**: \`tools/policy-check.mjs\` in \`release.sh\` refuses or warns before the push; skipped by a plain \`git push\`; the policy file is editable by the conductor and the librarian | agents/policy.json; release.sh |
| The gate: no file over 256 KB, no binary, known secret shapes, valid JSON, twins, links, a sourced headline, the "Not a warning service" line | **technical, in CI, but editable**: it stops a red build deploying, not the push; any agent with push can change \`admin/build/validate.mjs\` | \`admin/build/validate.mjs\`; \`.github/workflows/deploy.yml\` |
| CI fails unless the live site serves this version or a newer one | technical, after the fact | the workflow's "Measure push to served" step |
| Never push to \`main\`, never force-push, never rewrite history | rule, kept by the agent; nothing technical | ${abp.measured.branches} |
| Facts, evidence and hypotheses labelled; source and time read on every item | rule, kept by the agent; the gate checks only the front-page headline | CLAUDE.md; validate.mjs |
| No contact details, no private people, public sources only | rule, kept by the agent; **no check** | CLAUDE.md |
| Agents draft, a person sends | rule, kept by the agent; nothing technical | BRIEF.md |
| Model calls only through \`tools/llm.mjs\`, with a daily cap | the cap is technical inside the wrapper; using the wrapper is a rule | \`tools/llm.mjs\` |
| A second reader before publication | **none** | Dinis reads the site page by page, after it is live (BRIEF.md) |
| A signed record of who committed | **none** | commits are authored "Claude"; the session keys sign nothing |

Open questions: its session's real connectors and environment variables; whether Dinis links its key to his own; who reads its output, and when.

## Licence to Operate

| | |
|---|---|
| Authority | Dinis Cruz (operator), through incident.conductor@web-summit.dinis |
| Accountable owner | Dinis Cruz |
| Licensee | ${agent} (a Claude Code session with a session key that ends with the session) |
| Conditions | the Mandate above; CLAUDE.md; agents/JOBS.md; agents/policy.json |
| Validity | from 10 November 2026 until the storm's close-out, or the end of the session |
| Review | on any change to its Reach or its row in JOBS.md; by Dinis before this draft counts as agreed |
| Status | **draft, not agreed by Dinis** |

## Provenance

Owner: Dinis Cruz. Drafted by incident.librarian@web-summit.dinis at incident.conductor@'s ask (10 November 2026, 23:56 UTC), from the repository alone; the agent and Dinis correct it. Version 1, ${day}. Generated: change [library/abp.json](../../library/abp.json) or the files it is built from, not this page. The model: [Agent Behaviour Policy](https://riskmandate.ai/agent-behaviour-policy.html) (RiskMandate); the shape: [web-summit.sgit.ai/abp/](https://web-summit.sgit.ai/abp/), read 23:57 UTC on 10 November 2026.
`
    fs.mkdirSync(path.join(ROOT, 'agents', r), { recursive: true })
    fs.writeFileSync(path.join(ROOT, 'agents', r, 'policy.md'), md)
    index.push(`| [${agent}](../agents/${r}/policy.md) | ${(a.gap[0] || '').replace(/\*\*/g, '').replace(/\|/g, '/')} |`)
}
fs.writeFileSync(path.join(ROOT, 'library/abp.md'), `# The agents' behaviour policies (drafts)

> Kept by incident.librarian@web-summit.dinis, ${day}, ${hm} UTC. **DRAFTS, NOT AGREED BY DINIS.** One Agent Behaviour Policy per incident agent, in the shape of [web-summit.sgit.ai/abp/](https://web-summit.sgit.ai/abp/): Reach, Mandate, Gap, Barriers, Licence to Operate, Provenance. Built by [tools/library-abp.mjs](../tools/library-abp.mjs) from [agents/JOBS.md](../agents/JOBS.md), [agents/policy.json](../agents/policy.json), [CLAUDE.md](../CLAUDE.md) and [abp.json](abp.json). Back to [the library](README.md).

**What is the same for all ${index.length}.** Every agent can push to every path; neither branch is protected; every push that passes the gate is public in under a minute with no second reader; the path check is advisory and local; the gate is technical but any agent can edit it; commits are not signed. The barriers that hold are rules each agent keeps. Measured: ${abp.measured.branches}. Only the librarian's own session was measured; the others' tools and connectors are not known here.

| Agent | The first gap that is its own |
|---|---|
${index.join('\n')}
`)
console.log(`library-abp: ${index.length} policies`)
