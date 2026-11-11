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
// since 11 November 02:28 incident.ci@ keeps every run as data (data/ci/runs/*.json, read from GitHub's API by tools/ci-read.mjs):
// that is the source now; the librarian's own snapshot stays for its observations and for any run the CI data does not hold
try {
    const dir = path.join(ROOT, 'data/ci/runs'), byRun = Object.fromEntries(snap.runs.map(r => [r.run, r]))
    let newest = ''
    for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.json'))) {
        const d = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')); if (d.updated > newest) newest = d.updated
        for (const r of d.runs || []) byRun[r.run] = { run: r.run, conclusion: r.result || (r.ended ? 'unknown' : 'running'), head_sha: String(r.sha || '').slice(0, 10), created_at: r.queued, updated_at: r.ended }
    }
    snap.runs = Object.values(byRun).sort((x, y) => x.run - y.run)
    if (newest) { snap.read_utc = newest.slice(0, 16) + 'Z'; snap.source = 'data/ci/runs/ (incident.ci@web-summit.dinis, from GitHub\'s Actions API)' }
} catch { }
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
    by: 'incident.librarian@web-summit.dinis', updated: snap.read_utc, source: snap.source, made_from: ['data/ci/runs/', 'library/releases-runs.json', 'the tags and commits of this repository'],
    states: { served: 'the run ended green: CI read this version or a newer one from the live site', tagged: 'deployed and tagged; the run was cancelled before CI confirmed it was served', 'not confirmed': 'cancelled before the tag; whether it was ever served is not known from the run', failed: 'the run failed; nothing was deployed by it' },
    counts: { runs: releases.length, served: count('served'), tagged: count('tagged'), not_confirmed: count('not confirmed'), failed: count('failed'), other: releases.filter(e => !['served', 'tagged', 'not confirmed', 'failed'].includes(e.state)).length },
    never_confirmed_served: releases.filter(e => ['not confirmed', 'failed'].includes(e.state)).map(e => e.version),
    parts: []
}
// one file per hour pushed (library/releases/<hour>.json): the whole history in one file outgrows git's 256 KB rule within a day
const newestFirst = releases.slice().reverse(), hours = {}
for (const e of newestFirst) (hours[e.pushed_at ? e.pushed_at.slice(0, 13) : 'no-commit-found'] ||= []).push(e)
fs.rmSync(path.join(ROOT, 'library/releases'), { recursive: true, force: true }); fs.mkdirSync(path.join(ROOT, 'library/releases'), { recursive: true })
for (const [h, list] of Object.entries(hours)) {
    fs.writeFileSync(path.join(ROOT, 'library/releases', h + '.json'), JSON.stringify({ about: `The versions pushed in the hour ${h} (UTC), newest first: what each commit says changed and what is known about whether it was served. One part of library/releases.json.`, by: 'incident.librarian@web-summit.dinis', updated: snap.read_utc, hour: h, releases: list }, null, 1) + '\n')
    out.parts.push({ hour: h, file: `library/releases/${h}.json`, versions: list.length, served: list.filter(e => e.state === 'served').length })
}
out.never_confirmed_served = { count: out.never_confirmed_served.length, see: 'each part lists its versions with their state' }
fs.writeFileSync(path.join(ROOT, 'library/releases.json'), JSON.stringify(out, null, 1) + '\n')
out.releases = newestFirst.slice(0, 60)
const cell = s => String(s).replace(/\|/g, '\\|')
const short = a => a.replace(/@web-summit\.dinis$/, '@')
const md = `# The release history: every version, what changed, and whether it was served

> Kept by incident.librarian@web-summit.dinis, ${snap.read_utc.slice(0, 10)}, ${snap.read_utc.slice(11, 16)} UTC. Built by [tools/library-releases.mjs](../tools/library-releases.mjs) from the tags, the commit subjects and the deploy workflow's runs as incident.ci@ keeps them ([the pipeline](../ci/README.md)), read at that time; the data is [releases.json](releases.json). Back to [the library](README.md).

CI numbers every push (\`v${series}.<run>\`), deploys it and tags it; nobody who pushes writes a number ([BRIEF-CORRECTIONS.md](../BRIEF-CORRECTIONS.md)). Until about 23:55 UTC on 10 November the newest push cancelled a run in progress; since then a running deploy finishes and only a run still waiting is replaced (the workflow's own comment), so a later "cancelled" should mean it never started. **${out.counts.runs} runs: ${out.counts.served} served (confirmed by CI), ${out.counts.tagged} deployed and tagged but cancelled before CI confirmed, ${out.counts.not_confirmed} cancelled before the tag, ${out.counts.failed} failed${out.counts.other ? `, ${out.counts.other} still running or unknown when read` : ''}.**

## Versions never confirmed served

${count('not confirmed') + count('failed')} of ${releases.length}. The newest: ${releases.filter(e => ['not confirmed', 'failed'].includes(e.state)).slice(-30).reverse().map(e => e.version + (e.state === 'failed' ? ' (failed)' : '')).join(', ') || 'none'}. Each hour's file lists every version with its state.

**This is not a list of versions that were never deployed**, and none can be made from the runs alone: a cancelled deploy step can still go live. ${Object.values(seen).map(o => `Run ${o.run}: ${o.what} (${short(o.by)}).`).join(' ')} Each of these versions' commits is contained in the next served version, so no change was lost; what is not known is whether a reader was ever served that exact number.

## The newest sixty versions

What changed is each commit's own subject, as its agent wrote it. Every version, hour by hour, as data: ${out.parts.map(p => `[${p.hour.slice(5).replace('T', ' ')}h](../view/index.html?path=${p.file}) (${p.versions})`).join(' · ')}.

| Version | Pushed (UTC) | State | What changed |
|---|---|---|---|
${out.releases.map(e => `| ${e.version} | ${e.pushed_at ? e.pushed_at.slice(5, 16).replace('T', ' ') : ''} | ${e.state}${e.observed ? ' (seen served)' : ''} | ${e.changes.length ? e.changes.map(c => `${c.by ? `*${short(c.by)}* ` : ''}${cell(c.what)}`).join('<br>') : cell(e.note || 'no commit found for this run')} |`).join('\n')}
`
fs.writeFileSync(path.join(ROOT, 'library/releases.md'), md.replace(/<br>/g, ' · '))
console.log(`library-releases: ${releases.length} runs; served ${out.counts.served}, tagged ${out.counts.tagged}, not confirmed ${out.counts.not_confirmed}, failed ${out.counts.failed}, other ${out.counts.other}`)
