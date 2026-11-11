#!/usr/bin/env node
// The library's catalogue (incident.librarian@web-summit.dinis, 10 November 2026, WS-214; Dinis's direction ~23:40: "all
// information, all documents, all briefs should be on the site"; "provenance, where everything needs to be linked").
// Repository -> library/index.json (for agents) and library/README.md (the page). Zero dependencies, tens of milliseconds.
//
//   node tools/library-index.mjs            count and report only: nothing is written. The catalogue and its page are not tracked
//                                           (index.json outgrew git's 256 KB rule); the build makes both with --out on every push. Reads NO git history (CI's clone is
//                                           shallow): authorship and dates come from each file's own header or front matter, and
//                                           from library/provenance.json where its sha256 still matches the file.
//   node tools/library-index.mjs --git      first refresh library/provenance.json from the commits (a full clone only; refuses a
//                                           shallow one), then build. Run by the librarian before each release, never by CI.
//   node tools/library-index.mjs --check    build in memory; exit 1 if the committed catalogue differs (stale).
//   node tools/library-index.mjs --out DIR  write DIR/library/index.json and DIR/library/README.md ONLY: no tracked file is touched
//                                           (for the build: --out _site, so the served catalogue is fresh on every push).
//
// For every file: path, where it is served, what kind of thing it is, what it is (its own first words), who wrote it (its
// header; and the commits' agents, from the sidecar), when (its own date; the last commit), what it was made from (the sources
// its header names), what it links to and what links to it. What cannot be established is left empty and listed under gaps:
// nothing is guessed. The output carries no clock time, so the same tree always gives the same bytes.
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SITE = 'https://storm-charles.promptugal.news/'
const REPO = 'https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/blob/dev/'
const ME = 'incident.librarian@web-summit.dinis'
const GENERATED = new Set(['library/index.json', 'library/README.md', 'library/provenance.json'])
const args = new Set(process.argv.slice(2))
const outAt = process.argv.indexOf('--out'), OUT_DIR = outAt > 0 ? path.resolve(process.argv[outAt + 1] || '') : ''
if (outAt > 0 && (!process.argv[outAt + 1] || OUT_DIR === ROOT)) { console.error('library-index: --out needs a directory other than the repository root'); process.exit(2) }
if (OUT_DIR && args.has('--git')) { console.error('library-index: --out and --git do not go together (--git writes the tracked commit record)'); process.exit(2) }
const sha = buf => crypto.createHash('sha256').update(buf).digest('hex')
const git = (...a) => execFileSync('git', a, { cwd: ROOT, maxBuffer: 64 << 20, stdio: ['ignore', 'pipe', 'ignore'] }).toString()

// ---------------------------------------------------------------- the files (the index, not the history)
function listFiles() {
    try { const l = git('ls-files', '-z', '--cached', '--others', '--exclude-standard').split('\0').filter(Boolean); if (l.length) return l } catch { }
    const acc = [], skip = new Set(['.git', '_site', 'node_modules'])
    const walk = d => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { if (skip.has(e.name)) continue; const f = path.join(d, e.name); e.isDirectory() ? walk(f) : acc.push(path.relative(ROOT, f).split(path.sep).join('/')) } }
    walk(ROOT); return acc
}
const files = [...new Set([...listFiles().filter(f => fs.existsSync(path.join(ROOT, f))), ...GENERATED])].sort()
const fileSet = new Set(files)

// ---------------------------------------------------------------- the commits' sidecar (only with --git)
const PROV = path.join(ROOT, 'library/provenance.json')
const agentOf = subject => (subject.match(/^([a-z][\w.-]*@[\w.-]+?):\s/i) || [, ''])[1]
if (args.has('--git')) {
    if (git('rev-parse', '--is-shallow-repository').trim() !== 'false') { console.error('library-index: --git needs a full clone (this one is shallow); nothing written'); process.exit(2) }
    const log = git('log', '--no-renames', '--format=%x01%H%x09%cI%x09%s', '--name-only'), per = {}
    for (const block of log.split('\x01').filter(Boolean)) {
        const [head, ...names] = block.split('\n'), [h, at, ...s] = head.split('\t'), agent = agentOf(s.join('\t'))
        for (const n of names.filter(Boolean)) (per[n] ||= []).push({ h: h.slice(0, 10), at: new Date(at).toISOString().replace(/\.\d+Z$/, 'Z'), agent })   // newest first
    }
    const out = {}
    for (const f of files) {
        if (GENERATED.has(f) || !per[f]) continue
        const c = per[f], first = c[c.length - 1], last = c[0]
        out[f] = { sha256: sha(fs.readFileSync(path.join(ROOT, f))), commits: c.length, first_by: first.agent, first_at: first.at, last_by: last.agent, last_at: last.at, last_commit: last.h, agents: [...new Set(c.map(x => x.agent).filter(Boolean))].sort() }
    }
    fs.mkdirSync(path.dirname(PROV), { recursive: true })
    fs.writeFileSync(PROV, JSON.stringify({
        about: 'Who committed each file and when, read from this repository\'s commits by tools/library-index.mjs --git in the librarian\'s full clone (CI never reads history). The agent is the commit subject\'s prefix ("<agent>: <what>"). An entry counts only while its sha256 still matches the file; a file changed since is listed under gaps in library/index.json until the next refresh.',
        by: ME, head: git('rev-parse', '--short=10', 'HEAD').trim(), files: out
    }, null, 1).replace(/\{\n\s+"sha256"[\s\S]*?\n\s+\}(?=,?\n)/g, m => m.replace(/\n\s*/g, ' ')) + '\n')   // one line per file: it grows with the tree
}
let prov = {}, provHead = ''
try { const p = JSON.parse(fs.readFileSync(PROV, 'utf8')); prov = p.files || {}; provHead = p.head || '' } catch { }

// ---------------------------------------------------------------- what kind of thing a file is
const KINDS = [
    [/^CLAUDE\.md$/, 'rules'], [/^BRIEF(-CORRECTIONS)?\.md$/, 'brief'], [/^(ROADMAP|PIPELINE)\.md$/, 'plan'], [/^REALITY\.md$/, 'record'], [/^SECURITY\.md$/, 'plan'],
    [/^library\/reading\//, 'reading'], [/^library\//, 'library'], [/^docs\//, 'library'],
    [/^agents\//, 'agent file'],
    [/^incidents\/[^/]+\/(timeline|decisions)\.md$/, 'decision log'], [/^incidents\/[^/]+\/incident\.json$/, 'incident record'],
    [/^incidents\/[^/]+\/comms\//, 'comms draft'], [/^incidents\/[^/]+\/material\//, 'material'],
    [/^incidents\/[^/]+\/data\/.*\.(py|mjs|js|sh)$/, 'tool'], [/^incidents\/[^/]+\/data\/.*\.json$/, 'dataset'], [/^incidents\/[^/]+\/data\/.*analysis\.md$/, 'analysis'], [/^incidents\/[^/]+\/data\/.*\.md$/, 'dataset doc'],
    [/^incidents\/[^/]+\/README\.md$/, 'incident record'],
    [/^research\//, 'research'], [/^(outreach\/|contribute\.md$)/, 'outreach'], [/^design\//, 'design'], [/^app\/design\//, 'design'],
    [/^data\/.*\.json$/, 'dataset'], [/^data\//, 'dataset doc'],
    [/^(tools|admin\/tools)\//, 'tool'], [/^(admin\/build\/|\.github\/)/, 'build'], [/^admin\//, 'admin'], [/^app\//, 'app'], [/^account\//, 'app'],
    [/^(README\.md|LICENSE|CNAME|\.gitignore)$/, 'repository'],
]
const ORDER = ['rules', 'brief', 'plan', 'record', 'decision log', 'incident record', 'dataset', 'dataset doc', 'analysis', 'research', 'reading', 'library', 'agent file', 'comms draft', 'material', 'outreach', 'design', 'tool', 'build', 'admin', 'app', 'repository', 'other']
const KIND_ABOUT = {
    rules: 'The rules every agent reads first.', brief: 'Dinis\'s direction, close to his words, and its corrections.', plan: 'Proposals and priorities: what is to be built and in what order.',
    record: 'What exists.', 'decision log': 'The timeline of signals and the decisions, newest first.', 'incident record': 'The incident\'s own page and front-page record.',
    dataset: 'JSON data: every value with its source and the time read.', 'dataset doc': 'What a dataset holds and who keeps it.', analysis: 'Our analysis, labelled as analysis: a hypothesis with its reasons, never a fact.',
    research: 'Research files: what was found, where, and when it was read.', reading: 'The reading list: what others wrote that bears on this site, and what it means here.', library: 'The catalogue itself, the glossary, the standard.',
    'agent file': 'Each agent\'s jobs, status and asks.', 'comms draft': 'Drafts for people; a person sends.', material: 'Material offered to another newsroom\'s desk.', outreach: 'How to contribute, and drafts for experts; a person sends.',
    design: 'Design rounds and notes.', tool: 'Scripts the agents run.', build: 'The build, the gate and CI.', admin: 'The admin area.', app: 'What runs in the browser.', repository: 'The repository\'s own files.', other: 'Not yet classified.'
}
const GEN_ABOUT = {
    'library/index.json': ['The catalogue, for agents', 'Every file on this site: kind, what it is, who wrote it, when it changed, what it was made from, what links to it, sha256; and the gaps.'],
    'library/README.md': ['The library: everything on this site, and where it came from', 'The catalogue as a page, by kind, with the gaps listed.'],
    'library/provenance.json': ['Who committed what', 'For each file: its commits\' agents, the first and the last commit, and the sha256 the record holds for.'],
}
const kindOf = f => (KINDS.find(([re]) => re.test(f)) || [, 'other'])[1]

// ---------------------------------------------------------------- where a file is served
const UNSERVED = f => f.split('/').some(p => p.startsWith('.')) || f.startsWith('admin/')   // admin/build/build.mjs: SKIP and dot files
function urls(f) {
    if (UNSERVED(f)) return { served: false, repo: REPO + f }
    const u = { served: true, file: SITE + f }
    if (f.endsWith('.md')) u.page = SITE + f.replace(/(^|\/)README\.md$/, '$1').replace(/\.md$/, '.html')
    const m = f.match(/^incidents\/([^/]+)\/data\/(.+\.json)$/)
    if (m) u.api = `${SITE}api/v1/${m[1]}/${m[2]}`
    return u
}

// ---------------------------------------------------------------- reading a file's own header
const ADDR = String.raw`[a-z][\w.-]*@[\w-]+(?:\.[\w-]+)*[a-z]`
const CUE = new RegExp(String.raw`(?:\b[Bb]y|\b[Kk]ept by|\bOffered by|\bDeclared[^.]{0,40}? by|Label: [A-Z]+\*{0,2} \(|^\s*(?:\/\/|#|\/\*|\*)[^(\n]*\()\s*\*{0,2}(${ADDR})`, 'm')
const MONTHS = { January: 1, February: 2, March: 3, April: 4, May: 5, June: 6, July: 7, August: 8, September: 9, October: 10, November: 11, December: 12 }
const DATED = new RegExp(String.raw`(\d{1,2}) (${Object.keys(MONTHS).join('|')}) (\d{4})(?:,? (?:~|about |at |written at |from |in [^,]{0,60}, )*(\d{1,2}):(\d{2}) UTC)?`)
const p2 = n => String(n).padStart(2, '0')
// a date counts only where it stands with the author (within the same sentence or so): a header's other dates are the subject's
const nearAuthor = s => { const m = s.match(CUE) || s.match(/^>\s*Dinis Cruz,/m); return m ? datedOf(s.slice(m.index, m.index + m[0].length + 220)) : '' }
const datedOf = s => { const m = s.match(DATED); return m ? `${m[3]}-${p2(MONTHS[m[2]])}-${p2(m[1])}` + (m[4] ? `T${p2(m[4])}:${m[5]}Z` : '') : '' }
const plain = s => s.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*`>]/g, '').replace(/\s+/g, ' ').trim()
const cut = (s, n = 260) => s.length <= n ? s : s.slice(0, n).replace(/\s+\S*$/, '') + ' …'
const resolveRef = (from, ref) => {
    ref = ref.split('#')[0].split('?')[0]; if (!ref || /^[a-z]+:/i.test(ref)) return ''
    const cands = [path.posix.normalize(path.posix.join(path.posix.dirname(from), ref)), path.posix.normalize(ref.replace(/^\//, ''))]
    for (let c of cands) { if (fileSet.has(c)) return c; c = c.replace(/\/$/, ''); if (fileSet.has(c + '/README.md')) return c + '/README.md'; if (fileSet.has(c.replace(/\.html$/, '.md'))) return c.replace(/\.html$/, '.md') }
    return ''
}
const refsIn = (from, text) => {
    const internal = new Set(), external = new Set()
    for (const [, u] of text.matchAll(/\]\(([^)\s]+)\)/g)) { if (/^https?:/.test(u)) external.add(u); else { const r = resolveRef(from, u); if (r && r !== from) internal.add(r) } }
    for (const [, c] of text.matchAll(/`([\w./@-]+\.[a-z]{2,4})`/g)) { const r = resolveRef(from, c); if (r && r !== from) internal.add(r) }
    for (const [u] of text.matchAll(/(?<![(\w])https:\/\/[^\s)"'<>`]+/g)) external.add(u.replace(/[.,;:]+$/, ''))
    return { internal: [...internal].sort(), external: [...external].sort() }
}

function read(f) {
    if (GENERATED.has(f)) return {   // never read back: the catalogue must not depend on its own last output
        path: f, kind: 'library', title: GEN_ABOUT[f][0], what: GEN_ABOUT[f][1], by: ME, by_from: 'generated', dated: '', dated_from: '', generated_by: 'tools/library-index.mjs',
        made_from: f === 'library/provenance.json' ? ['the commits of this repository (read in a full clone)'] : ['every file in this repository', 'library/provenance.json'],
        links_to: [], external_links: 0, commits: null, changed: '', ...urls(f)
    }
    const buf = fs.readFileSync(path.join(ROOT, f)), text = buf.toString('utf8'), ext = path.extname(f).toLowerCase()
    const e = { path: f, kind: kindOf(f), title: '', what: '', by: '', by_from: '', dated: '', dated_from: '', made_from: [], links_to: [], external_links: 0, bytes: buf.length, sha256: sha(buf), ...urls(f) }
    if (ext === '.md') {
        let body = text, fm = {}
        const m = text.match(/^---\n([\s\S]*?)\n---\n/)
        if (m) { body = text.slice(m[0].length); for (const l of m[1].split('\n')) { const k = l.match(/^(\w+):\s*(.*)$/); if (k) fm[k[1]] = k[2].replace(/^"|"$/g, '') } }
        const lines = body.split('\n'), h1 = lines.findIndex(l => /^#\s+/.test(l))
        e.title = fm.title || (h1 >= 0 ? plain(lines[h1].replace(/^#\s+/, '')) : f)
        const second = lines.findIndex((l, i) => i > h1 && /^#{1,6}\s+/.test(l))
        const head = lines.slice(Math.max(h1, 0), second > 0 ? Math.min(second, h1 + 14) : h1 + 14).join('\n')   // the title and what stands under it
        const para = lines.slice(h1 + 1).find(l => l.trim() && !/^(#|\||```|---)/.test(l.trim()))
        e.what = fm.summary || cut(plain(para || ''))
        const by = fm.by || fm.author || fm.agent || (head.match(CUE) || [])[1] || (/^>\s*Dinis Cruz,/m.test(head) ? 'Dinis Cruz (as recorded by incident.conductor@web-summit.dinis)' : '')
        if (by) { e.by = by; e.by_from = fm.by || fm.author || fm.agent ? 'front matter' : 'header' }
        const d = fm.date || fm.updated || nearAuthor(head); if (d) { e.dated = d; e.dated_from = fm.date || fm.updated ? 'front matter' : 'header' }
        e.made_from = (r => [...r.internal, ...r.external])(refsIn(f, fm.made_from ? fm.made_from + '\n' + head : head))
        const all = refsIn(f, body); e.links_to = all.internal; e.external_links = all.external.length
    } else if (ext === '.json') {
        let j = null; try { j = JSON.parse(text) } catch { }
        if (j && !Array.isArray(j) && typeof j === 'object') {
            const about = typeof j.about === 'string' ? j.about : typeof j.note === 'string' ? j.note : ''
            e.title = typeof j.title === 'string' ? j.title : path.basename(f); e.what = cut(about)
            const by = [j.by, j.updated_by, j.kept_by, j.lead, j.agent].find(x => typeof x === 'string' && x) || (about.match(new RegExp(String.raw`kept by (${ADDR})`, 'i')) || [])[1] || ''
            if (by) { e.by = by; e.by_from = 'its own fields' }
            for (const k of ['updated', 'read_utc', 'made_at', 'written_utc', 'read_at', 'last_wake']) if (typeof j[k] === 'string' && j[k]) { e.dated = j[k]; e.dated_from = `"${k}"`; break }
            const from = new Set()
            for (const [k, v] of Object.entries(j)) if (/(^|_)(source|sources|based_on|made_from|from)$/.test(k) && typeof v === 'string') from.add(resolveRef(f, v) || v)
            for (const [, c] of about.matchAll(/([\w./-]+\.(?:md|mjs|json|py|sh))\b/g)) { const r = resolveRef(f, c) || (fileSet.has('tools/' + c) ? 'tools/' + c : ''); if (r && r !== f) from.add(r) }
            e.made_from = [...from]
        } else e.title = path.basename(f)
    } else {
        e.title = path.basename(f)
        const lines = text.split('\n').slice(0, 30), c = []
        for (const l of lines) { if (/^#!/.test(l)) continue; const m = l.match(/^\s*(?:\/\/|#|\/\*+|\*|""")\s?(.*?)(?:\*\/)?\s*$/); if (m) { if (m[1]) c.push(m[1]) } else if (c.length || l.trim()) break }
        const head = c.join(' ')
        e.what = cut(plain(head))
        const by = (lines.slice(0, 8).join('\n').match(CUE) || [])[1]; if (by) { e.by = by; e.by_from = 'header' }
        const d = nearAuthor(lines.slice(0, 8).join('\n')); if (d) { e.dated = d; e.dated_from = 'header' }
    }
    const p = prov[f]
    e.commits = p && p.sha256 === e.sha256 ? { n: p.commits, first_by: p.first_by, first_at: p.first_at, last_by: p.last_by, last_at: p.last_at, last_commit: p.last_commit, agents: p.agents } : null
    e.changed = e.commits?.last_at || e.dated || ''
    return e
}
const entries = files.map(read)
const byPath = Object.fromEntries(entries.map(e => [e.path, e]))
for (const e of entries) e.linked_from = []
for (const e of entries) for (const t of new Set([...e.links_to, ...e.made_from])) if (byPath[t] && !GENERATED.has(e.path)) byPath[t].linked_from.push(e.path)

// ---------------------------------------------------------------- the gaps: what could not be established (never guessed)
const real = entries.filter(e => !GENERATED.has(e.path))
const authored = e => !['repository', 'build'].includes(e.kind) || e.path === 'README.md'
const gaps = {
    no_author_in_file: real.filter(e => !e.by && authored(e)).map(e => ({ path: e.path, committed_by: e.commits?.agents || [] })),
    no_date_in_file: real.filter(e => !e.dated && ['brief', 'plan', 'record', 'decision log', 'dataset', 'analysis', 'research', 'reading', 'comms draft', 'material', 'agent file'].includes(e.kind)).map(e => e.path),
    no_commit_record: real.filter(e => !e.commits).map(e => ({ path: e.path, why: prov[e.path] ? 'changed since the commits were last read' : 'new since the commits were last read' })),
    datasets_naming_no_source: real.filter(e => e.kind === 'dataset' && !e.made_from.length && !/status\.json$/.test(e.path)).map(e => e.path),
    documents_nothing_links_to: real.filter(e => e.path.endsWith('.md') && !e.linked_from.length && e.path !== 'README.md' && e.path !== 'CLAUDE.md').map(e => e.path),
    older_than_their_sources: real.filter(e => ['comms draft', 'material', 'analysis', 'dataset'].includes(e.kind) && e.commits).flatMap(e => e.made_from.map(x => byPath[x]).filter(x => x && x.commits && ['decision log', 'dataset', 'comms draft', 'analysis', 'incident record'].includes(x.kind) && x.commits.last_at > e.commits.last_at).map(x => ({ path: e.path, why: `last changed ${e.commits.last_at.slice(5, 16).replace('T', ' ')}; its source ${x.path} changed ${x.commits.last_at.slice(5, 16).replace('T', ' ')}` }))),
    not_served_on_the_site: real.filter(e => !e.served).map(e => e.path),
}
const counts = {}; for (const e of entries) counts[e.kind] = (counts[e.kind] || 0) + 1
const asOf = entries.map(e => e.changed).filter(x => /^\d{4}-\d\d-\d\dT/.test(x)).sort().pop() || ''
const index = {
    about: 'Everything on storm-charles.promptugal.news, catalogued: every brief, plan, decision log, dataset, tool, agent file and research file, with what it is (its own first words), who wrote it, when it last changed, what it was made from and what links to it. Built from the repository by tools/library-index.mjs; nothing is guessed: what a file does not say is empty here and listed under gaps. The data files\' own catalogue (with the served sha256) is api/v1/index.json.',
    by: ME, site: SITE, page: SITE + 'library/', made_by: 'tools/library-index.mjs',
    fields: {
        kind: Object.fromEntries(ORDER.filter(k => counts[k]).map(k => [k, KIND_ABOUT[k]])),
        by: 'who the file itself says wrote or keeps it (by_from says where: header, front matter, its own fields); empty when it does not say',
        dated: 'the time the file gives for itself (dated_from says which field or the header); for a dataset, usually the time its sources were last read',
        commits: 'from the commits, as recorded in library/provenance.json (first_by, last_by, last_at, the agents); null when the file changed after the commits were last read',
        changed: 'when it last changed: the last commit when known, else the file\'s own date',
        made_from: 'the sources its header or fields name: files here (paths) and URLs',
        links_to: 'files here that it links to anywhere in its text', linked_from: 'files here that link to it or name it as a source',
        sha256: 'of the file in the repository at this build (generated files carry none)'
    },
    as_of: asOf, commits_read_at_head: provHead, total: entries.length, counts,
    gaps, entries
}
const indexText = JSON.stringify(index, null, 1) + '\n'

// ---------------------------------------------------------------- the page
const rel = f => path.posix.relative('library', f)
const cell = s => String(s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ')
const link = f => byPath[f]?.served === false ? `[\`${f}\`](${REPO}${f})` : `[\`${f}\`](${rel(f)})`
const short = a => a.replace(/@web-summit\.dinis$/, '@')
const when = t => /^\d{4}-\d\d-\d\dT/.test(t) ? t.slice(5, 16).replace('T', ' ') : t
const src = x => fileSet.has(x) ? link(x) : /^https?:/.test(x) ? `[${x.replace(/^https?:\/\/(www\.)?/, '').split(/[/?#]/)[0]}](${x})` : cell(x)
const who = e => { const c = e.commits?.agents?.map(short) || []; const h = e.by ? short(e.by) : ''; return h ? h + (c.length && !c.some(x => h.includes(x)) ? ` (commits: ${c.join(', ')})` : '') : c.length ? `*not said in the file*; commits: ${c.join(', ')}` : '*not said*' }
let md = `# The library: everything on this site, and where it came from

> Kept by ${ME}. This page and [index.json](index.json) are built from the repository by [\`tools/library-index.mjs\`](../tools/library-index.mjs); nobody writes them by hand. **${entries.length} files**${asOf ? `, the newest change ${when(asOf)} UTC` : ''}. Nothing here is guessed: what a file does not say about itself is left empty and listed under [Gaps](#gaps).

Not a warning service: follow IPMA, ANEPC and your local authorities.

**For agents:** [library/index.json](index.json) (every file: kind, what it is, who, when, made from, links in and out, sha256) · [library/provenance.json](provenance.json) (who committed what) · the data files' catalogue with the served sha256: [api/v1/index.json](../api/v1/index.json).

**Also here:** [the agents' behaviour policies](abp.md) (drafts, not agreed by Dinis) · [the release history](releases.md) (every version, what changed, whether it was served) · [the reading list](reading/README.md) (what newsroom.sgit.ai's articles mean for this site) · [the glossary](glossary.md) (fact, evidence, hypothesis and the other words this site uses). · [the path policy](../agents/policy.json) and its check, [tools/policy-check.mjs](../tools/policy-check.mjs) · a draft for the conductor: [the shape of now.json](drafts/now-json.md).

**How to read a row.** *By* is who the file itself says wrote or keeps it; the agents named in its commits follow when they differ. *Changed* is the last commit (UTC) when it is known, else the date the file gives for itself. *Made from* is the sources its own header names.

| Kind | Files | What it is |
|---|---|---|
${ORDER.filter(k => counts[k]).map(k => `| [${k}](#${k.replace(/\s+/g, '-')}) | ${counts[k]} | ${KIND_ABOUT[k]} |`).join('\n')}
`
for (const k of ORDER.filter(k => counts[k])) {
    md += `\n## ${k}\n\n${KIND_ABOUT[k]}\n\n| File | What it is | By | Changed | Made from |\n|---|---|---|---|---|\n`
    for (const e of entries.filter(e => e.kind === k)) {
        const from = e.generated_by ? link(e.generated_by) : e.made_from.slice(0, 6).map(src).join(', ') + (e.made_from.length > 6 ? `, and ${e.made_from.length - 6} more` : '')
        md += `| ${link(e.path)}${e.api ? ` ([api](${e.api.replace(SITE, '../')}))` : ''} | ${cell(e.title && e.title !== path.basename(e.path) ? `**${e.title}.** ` : '')}${cell(cut(e.what, 200))} | ${cell(who(e))} | ${cell(when(e.changed))} | ${from} |\n`
    }
}
const list = a => a.length ? a.map(x => `- ${link(typeof x === 'string' ? x : x.path)}${x.why ? `: ${x.why}` : ''}${x.committed_by?.length ? ` (commits: ${x.committed_by.map(short).join(', ')})` : ''}`).join('\n') : '- None.'
md += `
## Gaps

What the catalogue could not establish from the files themselves. Each is for the file's owner to close (a line in its header: who, when, from what); the librarian does not edit others' files.

### Files that do not say who wrote them

${list(gaps.no_author_in_file)}

### Records and datasets that give no date of their own

${list(gaps.no_date_in_file)}

### Datasets that name no source in their own fields

Their values may each carry a source inside; the file as a whole names none at the top.

${list(gaps.datasets_naming_no_source)}

### Documents nothing links to

"Everything linked" (Dinis, 10 November): these are reachable only from this catalogue.

${list(gaps.documents_nothing_links_to)}

### Older than the sources they were made from

"Corrections must propagate": a draft, an analysis or a derived dataset whose named source was committed after it. It may still be right; someone should look.

${list(gaps.older_than_their_sources)}

### Files with no commit record yet

The commits are read in the librarian's clone, not in CI${provHead ? ` (last at commit \`${provHead}\`)` : ''}; a file new or changed since shows here until the next read.

${list(gaps.no_commit_record)}

### Not served on the site

In the repository only (the build skips \`admin/\` and dot files); the links go to GitHub.

${list(gaps.not_served_on_the_site)}
`

// ---------------------------------------------------------------- write (or check)
// Neither output is tracked any more (11 November): the page too is written only with --out, and the build renders it from there.
const targets = OUT_DIR ? [['library/index.json', indexText], ['library/README.md', md]] : []
if (args.has('--check')) {
    if (!OUT_DIR) { console.log(`library-index: OK ${entries.length} files (nothing tracked to compare; --check --out DIR compares DIR)`); process.exit(0) }
    const stale = targets.filter(([f, s]) => !fs.existsSync(path.join(OUT_DIR, f)) || fs.readFileSync(path.join(OUT_DIR, f), 'utf8') !== s).map(([f]) => f)
    if (stale.length) { console.log(`library-index: STALE ${stale.join(', ')} (run node tools/library-index.mjs)`); process.exit(1) }
    console.log(`library-index: OK ${entries.length} files`); process.exit(0)
}
const DEST = OUT_DIR || ROOT
for (const [f, s] of targets) { fs.mkdirSync(path.dirname(path.join(DEST, f)), { recursive: true }); fs.writeFileSync(path.join(DEST, f), s) }
console.log(`library-index: ${entries.length} files, ${Object.keys(counts).length} kinds, gaps: ${Object.entries(gaps).map(([k, v]) => `${k} ${v.length}`).join(', ')}${args.has('--git') ? '; commits read' : ''}`)
