#!/usr/bin/env node
// The path policy's check (incident.librarian@web-summit.dinis, 10 November 2026, WS-214, at incident.conductor@'s ask; from the
// reading list: "Behaviour policies" on newsroom.sgit.ai, where the reach is every file and the mandate is a short list of paths).
// It reads the commits about to be pushed, takes each commit's agent from its Agent: trailer, and checks every path the commit
// changed against agents/policy.json.
//
//   node tools/policy-check.mjs                 the commits in origin/dev..HEAD (what release.sh is about to push)
//   node tools/policy-check.mjs <range>         any git range, e.g. HEAD~5..HEAD
//
// Exit 1, with the list, when a commit has no Agent: trailer, names an agent the policy does not know, has a subject that names a
// different agent than its trailer, or changes a path outside that agent's globs. A shared or unassigned path warns and passes.
// An agent whose policy has the catch-all "**" (the conductor, who integrates across folders) can never be refused: each such change
// prints as "WARN <role> outside its own paths: ..." and, when that agent is the one releasing (AGENT=...), is appended to
// agents/<role>/cross-folder.log.md for it to commit with the push.
// It reads the local commits only (never run in CI: the clone there is shallow). It is a check an agent runs on itself: it catches
// mistakes; it is a setting, not a boundary (the reading list: "Where a check runs is part of the policy").
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const git = (...a) => execFileSync('git', a, { cwd: ROOT, maxBuffer: 64 << 20 }).toString()
const range = process.argv[2] || 'origin/dev..HEAD'
const policy = JSON.parse(fs.readFileSync(path.join(ROOT, 'agents/policy.json'), 'utf8'))

const rx = g => new RegExp('^' + g.split(/(\*\*|\*)/).map(p => p === '**' ? '.*' : p === '*' ? '[^/]*' : p.replace(/[.+?^${}()|[\]\\]/g, '\\$&')).join('') + '$')
const any = (globs, p, role) => (globs || []).some(g => rx(g.replace(/<role>/g, role)).test(p))

const fails = [], warns = [], wide = []
let commits = 0, paths = 0
for (const sha of git('rev-list', '--reverse', '--no-merges', range).split('\n').filter(Boolean)) {
    commits++
    const s7 = sha.slice(0, 7), subject = git('log', '-1', '--format=%s', sha).trim()
    // read from the whole message: git's own trailer parser sees only the last paragraph, and the attribution lines often follow
    const trailer = [...new Set([...git('log', '-1', '--format=%B', sha).matchAll(/^Agent:[ \t]*(\S+)[ \t]*$/gm)].map(m => m[1]))]
    const named = (subject.match(/^([a-z][\w.-]*@[\w.-]+?):\s/i) || [])[1]
    if (trailer.length !== 1) { fails.push(`${s7}: ${trailer.length ? 'more than one' : 'no'} Agent: trailer ("${subject.slice(0, 60)}")`); continue }
    const agent = trailer[0], rule = policy.agents[agent]
    if (named && named !== agent) fails.push(`${s7}: the subject names ${named}, the Agent: trailer ${agent}`)
    if (!rule) { fails.push(`${s7}: ${agent} is not in agents/policy.json`); continue }
    for (const p of git('diff-tree', '--no-commit-id', '--name-only', '-r', '--root', '--no-renames', sha).split('\n').filter(Boolean)) {
        paths++
        if (any(rule.owns, p, rule.role) || any(policy.everyone.owns, p, rule.role)) continue
        // a catch-all rule ("**") can never refuse: every match that only it allows is printed and, for that agent, recorded
        if (!any((rule.shared || []).filter(g => g !== '**'), p, rule.role) && !any(policy.everyone.shared, p, rule.role) && (rule.shared || []).includes('**')) {
            const owners = Object.entries(policy.agents).filter(([, r]) => any(r.owns, p, r.role)).map(([a]) => a.split('@')[0] + '@')
            wide.push({ line: `WARN ${rule.role} outside its own paths: ${s7} ${p}${owners.length ? ` (${owners.join(', ')}'s)` : ' (no owner)'}`, agent, role: rule.role, s7, p, owners, subject, at: git('log', '-1', '--format=%cI', sha).trim() }); continue
        }
        if (any(rule.shared, p, rule.role) || any(policy.everyone.shared, p, rule.role)) { warns.push(`${s7}: ${agent} changed ${p} (shared)`); continue }
        if (any(policy.unassigned, p, rule.role)) { warns.push(`${s7}: ${agent} changed ${p} (no owner in the policy yet)`); continue }
        const owners = Object.entries(policy.agents).filter(([, r]) => any(r.owns, p, r.role)).map(([a]) => a)
        const others = Object.values(policy.agents).some(r => r.role !== rule.role && p.startsWith(`agents/${r.role}/`))
        fails.push(`${s7}: ${agent} changed ${p}: ${owners.length ? `it is ${owners.join(', ')}'s` : others ? 'another agent\'s folder' : 'no rule covers this path (add it to agents/policy.json)'}`)
    }
}
for (const w of warns) console.log('WARN ' + w)
for (const w of wide) console.log(w.line)
// the record: when the agent releasing is the one with the catch-all rule, its cross-folder changes are appended to its own log
// (agents/<role>/cross-folder.log.md), once each, for it to commit with the push. A record, not a boundary.
const me = wide.filter(w => w.agent === process.env.AGENT)
if (me.length && !fails.length) {
    const f = path.join(ROOT, 'agents', me[0].role, 'cross-folder.log.md')
    let text = fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : `# ${me[0].agent}: changes outside its own paths\n\n> Kept by ${me[0].agent}; each line is written by [tools/policy-check.mjs](../../tools/policy-check.mjs) when it releases (the path policy gives it a catch-all rule, so the check cannot refuse it: [agents/policy.json](../policy.json)). A record, not a boundary. Newest last.\n\n| UTC | Commit | Path | Whose | The commit said |\n|---|---|---|---|---|\n`
    const add = me.filter(w => !text.includes(`| ${w.p} |`) || !text.includes(w.subject.slice(0, 80).replace(/\|/g, '/')))
        .map(w => `| ${new Date(w.at).toISOString().slice(0, 16).replace('T', ' ')} | ${w.s7} | ${w.p} | ${w.owners.join(', ') || 'no owner'} | ${w.subject.slice(0, 80).replace(/\|/g, '/')} |\n`)
    if (add.length) { fs.writeFileSync(f, text + add.join('')); console.log(`policy-check: ${add.length} line(s) appended to agents/${me[0].role}/cross-folder.log.md: commit it with this push`) }
}
if (fails.length) { for (const f of fails) console.log('FAIL ' + f); console.log(`policy-check: RED, ${fails.length} problem(s) in ${commits} commit(s) of ${range}; ask the owner in a commit with For:, or have the conductor change agents/policy.json`); process.exit(1) }
console.log(`policy-check: OK ${commits} commit(s), ${paths} path(s) in ${range}${warns.length + wide.length ? `, ${warns.length + wide.length} warning(s)` : ''}`)
