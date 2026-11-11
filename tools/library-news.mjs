#!/usr/bin/env node
// What changed in a release window, as data (incident.librarian@web-summit.dinis, 11 November 2026, WS-214; Dinis, ~02:10 UTC:
// "every time you push a change you need to create a new article ... not just the description of the files at a commit level").
// The article is written by the librarian (news/<window>.md); this gives it its facts, so nothing in it is remembered:
//
//   node tools/library-news.mjs 2026-11-11T02     writes news/data/2026-11-11T02.json: the hour 02:00 to 03:00 UTC: the versions
//                                                 pushed in it and whether each was served (library/releases.json), every commit
//                                                 (who, what), the files added, removed and changed by area, the pages that are
//                                                 new, and the datasets that changed. A full clone only (it reads the commits).
//   node tools/library-news.mjs --index           rewrites news/README.md from the articles in news/ (newest first).
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const ME = 'incident.librarian@web-summit.dinis'
const git = (...a) => execFileSync('git', a, { cwd: ROOT, maxBuffer: 64 << 20, stdio: ['ignore', 'pipe', 'ignore'] }).toString()
const arg = process.argv[2]
if (arg === '--index') {
    const rounds = fs.readdirSync(path.join(ROOT, 'news')).filter(f => /^\d{4}-\d\d-\d\d-[\w-]+\.md$/.test(f)).sort().reverse().map(f => {
        const t = fs.readFileSync(path.join(ROOT, 'news', f), 'utf8'), h1 = (t.split('\n').find(l => /^# /.test(l)) || '# ' + f).slice(2)
        return `- **[${h1}](${f})** (${f.slice(0, 10)})`
    })
    const arts = fs.readdirSync(path.join(ROOT, 'news')).filter(f => /^\d{4}-\d\d-\d\dT\d\d\.md$/.test(f)).sort().reverse().map(f => {
        const t = fs.readFileSync(path.join(ROOT, 'news', f), 'utf8'), w = f.slice(0, 13)
        const lines = t.split('\n'), h1 = (lines.find(l => /^# /.test(l)) || '# ' + w).slice(2), para = lines.find((l, i) => i > 0 && l.trim() && !/^(#|>|\||-|\*\*Not)/.test(l)) || ''
        let d = {}; try { d = JSON.parse(fs.readFileSync(path.join(ROOT, 'news/data', w + '.json'), 'utf8')) } catch { }
        return `| ${w.slice(0, 10)} ${w.slice(11)}:00 to ${String(+w.slice(11) + 1).padStart(2, '0')}:00 | [${h1.replace(/\|/g, '/')}](${f}) | ${d.versions ? `${d.versions.first} to ${d.versions.last} (${d.versions.served} served of ${d.versions.pushed})` : ''} | ${d.commits ? d.commits.length : ''} |`
    })
    fs.writeFileSync(path.join(ROOT, 'news/README.md'), `# What is new\n\n> Kept by ${ME}. One article per release window (an hour, while the storm runs): what is new for a reader, what changed in the data, what was corrected, each with links. The list is written by [tools/library-news.mjs](../tools/library-news.mjs); the articles by the librarian, from each window's data in [news/data/](data/README.md). Back to [Help](../help/README.md).\n\nEvery push is a version (\`v0.1.<n>\`, shown on each page and at \`/version.json\`). Which versions were really served, one line each: [the release history](../library/releases.md) (as data: [releases.json](../library/releases.json)).\n\nNot a warning service: follow IPMA, ANEPC and your local authorities.\n\n## The rounds\n\nOne article per round of direction: what was asked, the shape chosen, the patterns, what is live and what is not. Written to be printed.\n\n${rounds.join('\n') || '- None yet.'}\n\n## Hour by hour\n\n| Window (UTC) | Article | Versions | Commits |\n|---|---|---|---|\n${arts.join('\n')}\n`)
    console.log(`library-news: index of ${arts.length} article(s)`); process.exit(0)
}
if (!/^\d{4}-\d\d-\d\dT\d\d$/.test(arg || '')) { console.error('library-news: give a window, e.g. 2026-11-11T02, or --index'); process.exit(2) }
if (git('rev-parse', '--is-shallow-repository').trim() !== 'false') { console.error('library-news: needs a full clone; nothing written'); process.exit(2) }
const from = arg + ':00:00Z', to = new Date(Date.parse(from) + 3600e3).toISOString().replace('.000', '')
const log = git('log', '--reverse', '--no-merges', '--no-renames', `--since=${from}`, `--until=${to}`, '--format=%x01%h%x09%cI%x09%s', '--name-status')
const commits = [], files = {}
for (const b of log.split('\x01').filter(Boolean)) {
    const [head, ...rest] = b.split('\n'), [h, at, ...s] = head.split('\t'), subj = s.join('\t'), m = subj.match(/^([a-z][\w.-]*@[\w.-]+?):\s+(.*)$/i)
    if (Date.parse(at) < Date.parse(from) || Date.parse(at) >= Date.parse(to)) continue
    const c = { commit: h, at: new Date(at).toISOString().replace(/\.\d+Z$/, 'Z'), by: m ? m[1] : '', what: (m ? m[2] : subj).slice(0, 400), files: 0 }
    for (const l of rest.filter(Boolean)) { const [st, f] = l.split('\t'); c.files++; const x = files[f] ||= { first: st, last: st, by: new Set() }; x.last = st; x.by.add(c.by) }
    commits.push(c)
}
const exists = f => fs.existsSync(path.join(ROOT, f))
const added = Object.entries(files).filter(([f, x]) => x.first === 'A' && exists(f)).map(([f]) => f).sort()
const removed = Object.entries(files).filter(([f, x]) => x.last === 'D' && !exists(f)).map(([f]) => f).sort()
const changed = Object.entries(files).filter(([f, x]) => x.first !== 'A' && exists(f)).map(([f]) => f).sort()
const area = f => f.includes('/') ? f.split('/').slice(0, f.startsWith('incidents/') ? 3 : 1).join('/') : '(root)'
const tally = l => Object.entries(l.reduce((a, f) => (a[area(f)] = (a[area(f)] || 0) + 1, a), {})).sort((a, b) => b[1] - a[1]).map(([k, n]) => ({ area: k, files: n }))
const isData = f => /\.json$/.test(f) && (/^incidents\/[^/]+\/data\//.test(f) || /^(data|entities|evidence|sources)\//.test(f))
let rel = []; try { rel = JSON.parse(fs.readFileSync(path.join(ROOT, 'library/releases.json'), 'utf8')).releases.filter(r => r.pushed_at >= from && r.pushed_at < to).reverse() } catch { }
const byAgent = Object.entries(commits.reduce((a, c) => (a[c.by || 'not named'] = (a[c.by || 'not named'] || 0) + 1, a), {})).sort((a, b) => b[1] - a[1]).map(([agent, n]) => ({ agent, commits: n }))
const out = {
    about: `What changed on storm-charles.promptugal.news between ${from} and ${to}: the facts behind the article news/${arg}.md. Read from the commits in the librarian's full clone and from library/releases.json (which versions were served). A file counts as new if its first change in the window added it and it still exists.`,
    by: ME, updated: new Date(Math.max(...commits.map(c => Date.parse(c.at)), Date.parse(from))).toISOString().replace(/\.\d+Z$/, 'Z'), window: { from, to }, made_by: 'tools/library-news.mjs', made_from: ['the commits of this repository', 'library/releases.json'],
    versions: rel.length ? { first: rel[0].version, last: rel[rel.length - 1].version, pushed: rel.length, served: rel.filter(r => r.state === 'served').length, as_of: 'library/releases.json', list: rel.map(r => ({ version: r.version, state: r.state, pushed_at: r.pushed_at })) } : null,
    by_agent: byAgent,
    new_pages: added.filter(f => f.endsWith('.md')), new_datasets: added.filter(isData), changed_datasets: changed.filter(isData), new_tools: added.filter(f => /^tools\//.test(f) || /\/tools\//.test(f)),
    added: { files: added.length, by_area: tally(added) }, changed: { files: changed.length, by_area: tally(changed) }, removed: { files: removed.length, list: removed.slice(0, 60) },
    commits
}
fs.mkdirSync(path.join(ROOT, 'news/data'), { recursive: true })
fs.writeFileSync(path.join(ROOT, 'news/data', arg + '.json'), JSON.stringify(out, null, 1) + '\n')
console.log(`library-news: ${arg}: ${commits.length} commits by ${byAgent.length} agents; ${added.length} files added, ${changed.length} changed, ${removed.length} removed; ${rel.length} versions`)
