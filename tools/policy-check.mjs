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

const fails = [], warns = []
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
        if (any(rule.shared, p, rule.role) || any(policy.everyone.shared, p, rule.role)) { warns.push(`${s7}: ${agent} changed ${p} (shared)`); continue }
        if (any(policy.unassigned, p, rule.role)) { warns.push(`${s7}: ${agent} changed ${p} (no owner in the policy yet)`); continue }
        const owners = Object.entries(policy.agents).filter(([, r]) => any(r.owns, p, r.role)).map(([a]) => a)
        const others = Object.values(policy.agents).some(r => r.role !== rule.role && p.startsWith(`agents/${r.role}/`))
        fails.push(`${s7}: ${agent} changed ${p}: ${owners.length ? `it is ${owners.join(', ')}'s` : others ? 'another agent\'s folder' : 'no rule covers this path (add it to agents/policy.json)'}`)
    }
}
for (const w of warns) console.log('WARN ' + w)
if (fails.length) { for (const f of fails) console.log('FAIL ' + f); console.log(`policy-check: RED, ${fails.length} problem(s) in ${commits} commit(s) of ${range}; ask the owner in a commit with For:, or have the conductor change agents/policy.json`); process.exit(1) }
console.log(`policy-check: OK ${commits} commit(s), ${paths} path(s) in ${range}${warns.length ? `, ${warns.length} warning(s)` : ''}`)
