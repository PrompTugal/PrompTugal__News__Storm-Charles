#!/usr/bin/env node
// The release history (incident.librarian@web-summit.dinis, 10 November 2026, WS-214, at incident.conductor@'s ask; the estate's
// standard asks for "one sentence per release"; the reading list: "Green does not mean live").
// Tags + commit subjects + the Actions runs snapshot -> library/releases.json and library/releases.md.
//
//   node tools/library-releases.mjs      in a FULL clone with the tags fetched (git fetch --tags); refuses a shallow one.
//
// A version is v<admin/series.txt>.<run number>; CI pushes its tag after the deploy step. For each run number: the commits it
// carried (those after the previous run's commit), what they say, and what is known about whether it was served:
//   served        the run ended green: CI read that version (or a newer one) from the live site
//   tagged        deployed and tagged, but the run was cancelled before CI confirmed it was served
//   not confirmed cancelled before the tag: a cancelled deploy can still go live (run 32 did), so this is not "never deployed"
//   failed        the run failed
// Nothing here is guessed: a run the snapshot does not list is "not in the snapshot".
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const git = (...a) => execFileSync('git', a, { cwd: ROOT, maxBuffer: 64 << 20, stdio: ['ignore', 'pipe', 'ignore'] }).toString()
if (git('rev-parse', '--is-shallow-repository').trim() !== 'false') { console.error('library-releases: needs a full clone; nothing written'); process.exit(2) }
const series = fs.readFileSync(path.join(ROOT, 'admin/series.txt'), 'utf8').trim()
const snap = JSON.parse(fs.readFileSync(path.join(ROOT, 'library/releases-runs.json'), 'utf8'))
const tags = Object.fromEntries(git('for-each-ref', '--format=%(refname:short) %(objectname)', 'refs/tags').split('\n').filter(Boolean).map(l => l.split(' ')).filter(([t]) => t.startsWith(`v${series}.`)).map(([t, h]) => [+t.split('.').pop(), h]))
const runs = Object.fromEntries(snap.runs.map(r => [r.run, r]))
const seen = Object.fromEntries((snap.observations || []).map(o => [o.run, o]))
const max = Math.max(...Object.keys(tags).map(Number), ...Object.keys(runs).map(Number))
const has = h => { try { git('cat-file', '-e', h + '^{commit}'); return true } catch { return false } }
const iso = s => new Date(s).toISOString().replace(/\.\d+Z$/, 'Z')
const releases = []
let prev = ''
for (let n = 1; n <= max; n++) {
    const r = runs[n], head = tags[n] || (r && has(r.head_sha) ? git('rev-parse', r.head_sha).trim() : '')
    const e = { version: `v${series}.${n}`, run: n, tag: !!tags[n], run_conclusion: r ? r.conclusion : 'not in the snapshot', commit: head.slice(0, 10), pushed_at: '', state: '', changes: [] }
    e.state = !r && !tags[n] ? 'unknown' : r?.conclusion === 'success' ? 'served' : tags[n] ? 'tagged' : r?.conclusion === 'cancelled' ? 'not confirmed' : r?.conclusion === 'failure' ? 'failed' : r?.conclusion || 'unknown'
    if (seen[n]) e.observed = seen[n]
    if (head) {
        e.pushed_at = iso(git('log', '-1', '--format=%cI', head).trim())
        const list = git('log', '--reverse', '--no-merges', '--format=%h%x09%s', prev && prev !== head ? `${prev}..${head}` : '-1', head, ...(prev && prev !== head ? [] : [])).split('\n').filter(Boolean)
        e.changes = prev === head ? [] : list.map(l => { const [h, ...s] = l.split('\t'), subj = s.join('\t'), m = subj.match(/^([a-z][\w.-]*@[\w.-]+?):\s+(.*)$/i); return { commit: h, by: m ? m[1] : '', what: (m ? m[2] : subj).slice(0, 400) } })
        if (prev === head) e.note = 'the same commit as the run before (a re-run)'
        prev = head
    }
    releases.push(e)
}
const count = s => releases.filter(e => e.state === s).length
const out = {
    about: 'The release history of storm-charles.promptugal.news: for every CI run number, the version, what its commits say changed (one line per commit, the commit\'s own subject), and what is known about whether it was served. Built by tools/library-releases.mjs in the librarian\'s full clone from the tags, the commit subjects and library/releases-runs.json (a snapshot of the Actions API). The newest push cancels older runs, so not every number was confirmed served; a cancelled deploy can still go live, so "not confirmed" is not "never deployed".',
    by: 'incident.librarian@web-summit.dinis', updated: snap.read_utc, source: snap.source, made_from: ['library/releases-runs.json', 'the tags and commits of this repository'],
    states: { served: 'the run ended green: CI read this version or a newer one from the live site', tagged: 'deployed and tagged; the run was cancelled before CI confirmed it was served', 'not confirmed': 'cancelled before the tag; whether it was ever served is not known from the run', failed: 'the run failed; nothing was deployed by it' },
    counts: { runs: releases.length, served: count('served'), tagged: count('tagged'), not_confirmed: count('not confirmed'), failed: count('failed'), other: releases.filter(e => !['served', 'tagged', 'not confirmed', 'failed'].includes(e.state)).length },
    never_confirmed_served: releases.filter(e => ['not confirmed', 'failed'].includes(e.state)).map(e => e.version),
    releases: releases.slice().reverse()
}
fs.writeFileSync(path.join(ROOT, 'library/releases.json'), JSON.stringify(out, null, 1) + '\n')
const cell = s => String(s).replace(/\|/g, '\\|')
const short = a => a.replace(/@web-summit\.dinis$/, '@')
const md = `# The release history: every version, what changed, and whether it was served

> Kept by incident.librarian@web-summit.dinis, ${snap.read_utc.slice(0, 10)}, ${snap.read_utc.slice(11, 16)} UTC. Built by [tools/library-releases.mjs](../tools/library-releases.mjs) from the tags, the commit subjects and [a snapshot of the deploy workflow's runs](releases-runs.json) read at that time; the data is [releases.json](releases.json). Back to [the library](README.md).

CI numbers every push (\`v${series}.<run>\`), deploys it and tags it; nobody who pushes writes a number ([BRIEF-CORRECTIONS.md](../BRIEF-CORRECTIONS.md)). The newest push cancels the runs before it. **${out.counts.runs} runs: ${out.counts.served} served (confirmed by CI), ${out.counts.tagged} deployed and tagged but cancelled before CI confirmed, ${out.counts.not_confirmed} cancelled before the tag, ${out.counts.failed} failed${out.counts.other ? `, ${out.counts.other} still running or unknown when read` : ''}.**

## Versions never confirmed served

${releases.filter(e => ['not confirmed', 'failed'].includes(e.state)).map(e => e.version + (e.observed ? ' (seen served by us, see below)' : e.state === 'failed' ? ' (failed)' : '')).join(', ') || 'None.'}

**This is not a list of versions that were never deployed**, and none can be made from the runs alone: a cancelled deploy step can still go live. ${Object.values(seen).map(o => `Run ${o.run}: ${o.what} (${short(o.by)}).`).join(' ')} Each of these versions' commits is contained in the next served version, so no change was lost; what is not known is whether a reader was ever served that exact number.

## Every version, newest first

What changed is each commit's own subject, as its agent wrote it.

| Version | Pushed (UTC) | State | What changed |
|---|---|---|---|
${out.releases.map(e => `| ${e.version} | ${e.pushed_at ? e.pushed_at.slice(5, 16).replace('T', ' ') : ''} | ${e.state}${e.observed ? ' (seen served)' : ''} | ${e.changes.length ? e.changes.map(c => `${c.by ? `*${short(c.by)}* ` : ''}${cell(c.what)}`).join('<br>') : cell(e.note || 'no commit found for this run')} |`).join('\n')}
`
fs.writeFileSync(path.join(ROOT, 'library/releases.md'), md.replace(/<br>/g, ' · '))
console.log(`library-releases: ${releases.length} runs; served ${out.counts.served}, tagged ${out.counts.tagged}, not confirmed ${out.counts.not_confirmed}, failed ${out.counts.failed}, other ${out.counts.other}`)
