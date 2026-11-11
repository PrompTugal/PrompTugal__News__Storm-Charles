#!/usr/bin/env node
// A viewer page for every published file (incident.librarian@web-summit.dinis, 11 November 2026, WS-214; Dinis, ~02:10 UTC: "every
// one of these JSON files, I need to be able to visualise it, understand it, go down the rabbit hole until I run out of data";
// "every time you link to a markdown file, I need to visualise the markdown file in the page").
//
//   node tools/library-view.mjs --out _site      writes _site/view/<path>.md for every served file, and _site/view/README.md and
//                                                _site/view/index.json. It writes ONLY under <out>/view/: no tracked file is touched.
//                                                Run it after tools/library-index.mjs --out (it reads <out>/library/index.json for
//                                                who keeps a file, what links to it and what it was made from; without it those
//                                                rows are left out, never guessed).
//
// The address of a file's viewer is always  view/<the file's path>.html  (its markdown twin: view/<path>.md). For example
//   incidents/2026-11-10-storm-charles/data/weather/warnings.json  ->  view/incidents/2026-11-10-storm-charles/data/weather/warnings.json.html
// A JSON file's page: what it is, who keeps it and when (its own "by" and "updated"), its sha256 and size, where it is used, its
// schema as inferred from the file itself (every field, its types, how often it is present, a unit where the field's name states
// one, an example), its values as tables (every list of records, the first rows; the raw has all), and the raw one click away.
// A markdown or code file's page: the same facts, the rendered page beside it, and the source as written.
// Nothing here is invented: a schema is what the bytes show, a unit only what a field's name says, and it says where it came from.
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const ME = 'incident.librarian@web-summit.dinis'
const outAt = process.argv.indexOf('--out'), OUT = outAt > 0 && process.argv[outAt + 1] ? path.resolve(process.argv[outAt + 1]) : ''
if (!OUT || OUT === ROOT) { console.error('library-view: --out <dir> is required (a directory other than the repository root); nothing written'); process.exit(2) }
const sha = b => crypto.createHash('sha256').update(b).digest('hex')
const TEXT = new Set(['.md', '.json', '.mjs', '.js', '.css', '.sh', '.py', '.txt', '.html', '.yml', '.yaml', '.xml', '.svg', '.nt', '.csv', ''])
const SOURCE_MAX = 60 * 1024, PAGE_ROWS = 40, MAX_TABLES = 8, MAX_COLS = 8, SCHEMA_ROWS = 160

// ---------------------------------------------------------------- the files that are served
function listFiles() {
    try { const l = execFileSync('git', ['ls-files', '-z', '--cached', '--others', '--exclude-standard'], { cwd: ROOT, maxBuffer: 64 << 20, stdio: ['ignore', 'pipe', 'ignore'] }).toString().split('\0').filter(Boolean); if (l.length) return l } catch { }
    const acc = [], skip = new Set(['.git', '_site', 'node_modules'])
    const walk = d => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { if (skip.has(e.name)) continue; const f = path.join(d, e.name); e.isDirectory() ? walk(f) : acc.push(path.relative(ROOT, f).split(path.sep).join('/')) } }
    walk(ROOT); return acc
}
const served = f => !f.split('/').some(p => p.startsWith('.')) && !f.startsWith('admin/') && !f.startsWith('view/') && !f.startsWith('_site/')
const files = listFiles().filter(f => served(f) && fs.existsSync(path.join(ROOT, f)) && fs.statSync(path.join(ROOT, f)).isFile()).sort()
// generated files worth a viewer too (they exist only in <out>)
const generated = ['library/index.json', 'api/v1/index.json'].filter(f => fs.existsSync(path.join(OUT, f)))
let cat = {}
try { cat = Object.fromEntries(JSON.parse(fs.readFileSync(path.join(OUT, 'library/index.json'), 'utf8')).entries.map(e => [e.path, e])) } catch { }
const known = new Set([...files, ...generated])

// ---------------------------------------------------------------- small helpers (markdown that the build's renderer reads)
const cell = s => String(s ?? '').replace(/\r?\n/g, ' ').replace(/\|/g, '\\|').replace(/`/g, "'").replace(/</g, '‹')
const cut = (s, n) => { s = String(s); return s.length <= n ? s : s.slice(0, n).replace(/\s+\S*$/, '') + ' …' }
const short = a => String(a).replace(/@web-summit\.dinis\b/g, '@')
const up = f => '../'.repeat(f.split('/').length)                       // from view/<path>.md back to the site root
const viewOf = (from, f) => `${up(from)}view/${f}.md`
const linkView = (from, f) => known.has(f) ? `[\`${f}\`](${viewOf(from, f)})` : `\`${f}\``
const host = u => u.replace(/^https?:\/\/(www\.)?/, '').split(/[/?#]/)[0]
const show = v => {
    if (v === null) return '*null*'
    if (typeof v === 'string') return /^https?:\/\/\S+$/.test(v) ? `[${cell(cut(host(v), 40))}](${v.replace(/[()\s|]/g, encodeURIComponent)})` : cell(cut(v, 110))
    if (typeof v === 'number' || typeof v === 'boolean') return String(v)
    if (Array.isArray(v)) return v.length && v.every(x => typeof x !== 'object' || x === null) ? cell(cut(v.join(', '), 110)) : `*list of ${v.length}*`
    return `*record, ${Object.keys(v).length} fields*`
}
const UNITS = [[/(_utc|_at)$|^(at|read|updated|read_utc|made_at|last_wake)$/, 'a time (UTC unless it says otherwise)'], [/_kmh$|kmh/, 'km/h'], [/(_kt|_kts|_knots)$/, 'knots'], [/_mm$/, 'mm'], [/_hpa$/, 'hPa'], [/(_c|_celsius)$/, '°C'], [/_m$|_metres$/, 'metres'], [/_s$|_seconds$/, 'seconds'], [/_ms$/, 'milliseconds'], [/_pct$|percent/, '%'], [/^bytes$|_bytes$/, 'bytes'], [/sha256/, 'a sha256 hash'], [/^url$|_url$|^source$|^link$/, 'a URL'], [/^lat(itude)?$|^lon(gitude)?$/, 'degrees']]
const unitOf = k => (UNITS.find(([re]) => re.test(k)) || [, ''])[1]
const typeOf = v => v === null ? 'null' : Array.isArray(v) ? 'list' : typeof v === 'object' ? 'record' : typeof v === 'number' ? (Number.isInteger(v) ? 'integer' : 'number') : typeof v === 'string' ? (/^\d{4}-\d\d-\d\dT\d\d:\d\d/.test(v) ? 'time' : /^https?:\/\//.test(v) ? 'url' : 'text') : typeof v

// ---------------------------------------------------------------- the schema, inferred from the bytes
function schemaOf(root) {
    const rows = new Map(), lists = []
    const note = (p, v, parentCount) => {
        let r = rows.get(p); if (!r) rows.set(p, r = { path: p, types: new Set(), n: 0, of: 0, example: undefined })
        r.types.add(typeOf(v)); r.n++; r.of = Math.max(r.of, parentCount)
        if (r.example === undefined && v !== null && typeof v !== 'object') r.example = v
    }
    const isMap = o => { const k = Object.keys(o); return k.length > 12 && k.every(x => o[x] && typeof o[x] === 'object') }   // keyed by id, not by field
    const walk = (v, p, depth) => {
        if (depth > 7 || rows.size > 4000) return
        if (Array.isArray(v)) {
            if (v.length && v.every(x => x && typeof x === 'object' && !Array.isArray(x))) lists.push({ path: p, rows: v })
            for (const x of v.slice(0, 400)) { note(p + '[]', x, Math.min(v.length, 400)); walk(x, p + '[]', depth + 1) }
        } else if (v && typeof v === 'object') {
            if (isMap(v)) { const vals = Object.entries(v); lists.push({ path: p + '{}', rows: vals.map(([k, x]) => Array.isArray(x) ? { key: k, items: x.length } : { key: k, ...x }), keyed: true }); for (const [, x] of vals.slice(0, 400)) { note(p + '{}', x, Math.min(vals.length, 400)); walk(x, p + '{}', depth + 1) } }
            else for (const [k, x] of Object.entries(v)) { note(p ? `${p}.${k}` : k, x, 1); walk(x, p ? `${p}.${k}` : k, depth + 1) }
        }
    }
    walk(root, '', 0)
    // how often a field is present among its parent's items
    const count = p => rows.get(p)?.n || 1
    for (const r of rows.values()) { const parent = r.path.replace(/(\.[^.[\]{}]+|\[\]|\{\})$/, ''); r.of = /(\[\]|\{\})$/.test(r.path) ? r.n : parent && rows.has(parent) ? count(parent) : 1 }
    return { rows: [...rows.values()], lists }
}

function jsonPage(f, text, e) {
    let j; try { j = JSON.parse(text) } catch (err) { return `**This file does not parse as JSON** (${cell(err.message)}). The source:\n\n${source(text)}` }
    const out = []
    // 1. what it says about itself
    if (j && typeof j === 'object' && !Array.isArray(j)) {
        const scal = Object.entries(j).filter(([, v]) => v === null || typeof v !== 'object' || (Array.isArray(v) && v.every(x => typeof x !== 'object')))
        if (scal.length) out.push(`## What the file says at the top\n\n| Field | Value |\n|---|---|\n${scal.slice(0, 40).map(([k, v]) => `| \`${k}\` | ${typeof v === 'string' ? cell(cut(v, 600)) : show(v)} |`).join('\n')}`)
    }
    // 2. the schema
    const { rows, lists } = schemaOf(j)
    if (rows.length) out.push(`## Schema (inferred from this file's bytes)\n\nEvery field found, where it sits, the kinds of value it holds, in how many of its parent's items it is present, and one example. A unit is given only where the field's own name states one. This is what the file contains now, not a promise about tomorrow's.\n\n| Field | Type | Present | Unit (from the name) | Example |\n|---|---|---|---|---|\n${rows.slice(0, SCHEMA_ROWS).map(r => `| \`${r.path}\` | ${[...r.types].join(' or ')} | ${r.of > 1 ? `${r.n} of ${r.of}` : 'yes'} | ${unitOf(r.path.split('.').pop().replace(/(\[\]|\{\})+$/, ''))} | ${r.example === undefined ? '' : show(r.example)} |`).join('\n')}${rows.length > SCHEMA_ROWS ? `\n\n${rows.length - SCHEMA_ROWS} more fields are in the raw file.` : ''}`)
    // 3. the values, as tables
    const tables = lists.filter(l => l.rows.length).sort((a, b) => a.path.split(/[.[{]/).length - b.path.split(/[.[{]/).length).slice(0, MAX_TABLES)
    if (tables.length) out.push(`## The data (${lists.length} list${lists.length === 1 ? '' : 's'} of records in this file${lists.length > tables.length ? `; the first ${tables.length} shown` : ''})`)
    for (const t of tables) {
        const freq = {}; for (const r of t.rows.slice(0, 400)) for (const [k, v] of Object.entries(r)) if (v === null || typeof v !== 'object' || Array.isArray(v)) freq[k] = (freq[k] || 0) + 1
        const cols = Object.entries(freq).sort((a, b) => b[1] - a[1]).map(([k]) => k).slice(0, MAX_COLS), nested = [...new Set(t.rows.slice(0, 50).flatMap(r => Object.entries(r).filter(([, v]) => v && typeof v === 'object').map(([k]) => k)))]
        if (!cols.length) continue
        out.push(`### \`${t.path || '(the file is a list)'}\`: ${t.rows.length} record${t.rows.length === 1 ? '' : 's'}${t.keyed ? ' (keyed by `key`)' : ''}\n\n${t.rows.length > PAGE_ROWS ? `The first ${PAGE_ROWS}; all ${t.rows.length} are in the raw file. ` : ''}${nested.length ? `Each record also holds: ${nested.slice(0, 12).map(k => `\`${k}\``).join(', ')} (see the schema above).` : ''}\n\n| ${cols.map(c => `\`${c}\``).join(' | ')} |\n|${cols.map(() => '---').join('|')}|\n${t.rows.slice(0, PAGE_ROWS).map(r => `| ${cols.map(c => r[c] === undefined ? '' : show(r[c])).join(' | ')} |`).join('\n')}`)
    }
    return out.join('\n\n')
}
const source = text => '```\n' + text.replace(/^```/gm, ' ```') + (text.endsWith('\n') ? '' : '\n') + '```'

// ---------------------------------------------------------------- one page per file
const index = []
let written = 0
for (const f of [...files, ...generated]) {
    const isGen = generated.includes(f), abs = path.join(isGen ? OUT : ROOT, f), buf = fs.readFileSync(abs), ext = path.extname(f).toLowerCase()
    const e = cat[f] || {}, u = up(f), bin = buf.subarray(0, 8000).includes(0) || !TEXT.has(ext), text = bin ? '' : buf.toString('utf8')
    let by = e.by || '', updated = e.dated || '', what = e.what || '', title = e.title && e.title !== path.basename(f) ? e.title : ''
    if (ext === '.json' && !bin) { try { const j = JSON.parse(text); if (j && !Array.isArray(j)) { by ||= [j.by, j.updated_by, j.kept_by].find(x => typeof x === 'string') || ''; updated ||= [j.updated, j.read_utc, j.made_at].find(x => typeof x === 'string') || ''; what ||= typeof j.about === 'string' ? j.about : '' } } catch { } }
    const rendered = ext === '.md' ? u + f.replace(/(^|\/)README\.md$/, '$1index.html').replace(/\.md$/, '.html') : ''
    const api = (f.match(/^incidents\/([^/]+)\/data\/(.+\.json)$/) || []).slice(1)
    const role = (by.match(/incident\.(\w+)@/) || [])[1]
    const facts = [
        ['What it is', (title ? `**${cell(title)}.** ` : '') + cell(cut(what, 500)) || '*the file does not say*'],
        ['Kept by', by ? (role && fs.existsSync(path.join(ROOT, 'agents', role, 'policy.md')) ? `[${cell(short(by))}](${u}agents/${role}/policy.md)` : cell(short(by))) + (e.by_from ? ` (from ${e.by_from})` : '') : '*not said in the file*'],
        ['Its own date', updated ? cell(updated) + (e.dated_from ? ` (from ${e.dated_from})` : '') : '*not said in the file*'],
        ...(e.commits ? [['Last commit', `${e.commits.last_at.replace('T', ' ').replace('Z', ' UTC')} by ${cell(short(e.commits.last_by || '?'))}, commit \`${e.commits.last_commit}\`; ${e.commits.n} commit${e.commits.n === 1 ? '' : 's'} in all`]] : []),
        ['sha256', `\`${sha(buf)}\` (${buf.length.toLocaleString('en-GB')} bytes; of the file as served with this build)`],
        ['The raw file', `[${path.basename(f)}](${u}${f}) (the bytes, one click away)${api.length ? ` · also at [api/v1/${api[0]}/${api[1]}](${u}api/v1/${api[0]}/${api[1]})` : ''}`],
        ...(rendered ? [['The page', `[${rendered.slice(u.length)}](${rendered})`]] : []),
        ...(e.kind ? [['In the library', `[${e.kind}](${u}library/kinds/${e.kind.replace(/\s+/g, '-')}.md)${isGen ? ' (generated on every push)' : ''}`]] : []),
        ...(e.made_from?.length ? [['Made from', e.made_from.slice(0, 12).map(x => known.has(x) ? linkView(f, x) : /^https?:/.test(x) ? `[${host(x)}](${x}) (outside this site)` : cell(x)).join(', ') + (e.made_from.length > 12 ? `, and ${e.made_from.length - 12} more` : '')]] : []),
        ...(e.linked_from?.length ? [['Used or linked by', e.linked_from.slice(0, 20).map(x => linkView(f, x)).join(', ') + (e.linked_from.length > 20 ? `, and ${e.linked_from.length - 20} more` : '')]] : [['Used or linked by', cat[f] ? '*nothing here links to it*' : '*not in the catalogue*']]),
    ]
    let body
    if (bin) body = `This file is not text (${ext || 'no extension'}); it is not shown here. [Open it](${u}${f}).`
    else if (ext === '.json') body = jsonPage(f, text, e) + (buf.length <= SOURCE_MAX ? `\n\n## The raw JSON\n\n${source(text)}` : `\n\n## The raw JSON\n\n${buf.length.toLocaleString('en-GB')} bytes: too long to print here. [Open the raw file](${u}${f}).`)
    else body = `## The source, as written\n\n${ext === '.md' ? `The rendered page is [here](${rendered}). ` : ''}${buf.length <= SOURCE_MAX ? `A line of the source that begins with three backticks is shown with one space before it.\n\n${source(text)}` : `${buf.length.toLocaleString('en-GB')} bytes: too long to print here. [Open the file](${u}${f}).`}`
    const md = `# \`${f}\`\n\n> Kept by ${ME}: a viewer page, written by [tools/library-view.mjs](${u}view/tools/library-view.mjs.md) on every push from the file itself and [the catalogue](${u}library/README.md); nobody writes it by hand. [Every file](${u}view/README.md).\n\n| | |\n|---|---|\n${facts.map(([k, v]) => `| **${k}** | ${v} |`).join('\n')}\n\n${body}\n`
    fs.mkdirSync(path.dirname(path.join(OUT, 'view', f)), { recursive: true })
    fs.writeFileSync(path.join(OUT, 'view', f + '.md'), md); written++
    index.push({ path: f, view: `view/${f}.html`, kind: e.kind || '', by, bytes: buf.length })
}

// ---------------------------------------------------------------- the list, and the pattern as data
const byDir = {}
for (const x of index) (byDir[x.path.includes('/') ? x.path.split('/').slice(0, x.path.startsWith('incidents/') ? 4 : 2).join('/').replace(/\/[^/]*\.[^/]*$/, '') : '(the root)'] ||= []).push(x)
fs.writeFileSync(path.join(OUT, 'view/README.md'), `# Every file, shown\n\n> Kept by ${ME}. Written by [tools/library-view.mjs](tools/library-view.mjs.md) on every push. ${index.length} files, each with a page that shows it: what it is, who keeps it, its sha256, where it is used, its schema and its values (JSON) or its source (markdown and code), and the raw bytes one click away. The same files by kind, with their gaps: [the library](../library/README.md).\n\n**The address pattern:** a file at \`<path>\` is shown at \`view/<path>.html\` (as markdown: \`view/<path>.md\`). The list as data: [index.json](index.json).\n\nNot a warning service: follow IPMA, ANEPC and your local authorities.\n\n${Object.entries(byDir).sort().map(([d, l]) => `## ${d}\n\n${l.map(x => `- [\`${x.path}\`](${x.path}.md)${x.kind ? ` · ${x.kind}` : ''}`).join('\n')}`).join('\n\n')}\n`)
fs.writeFileSync(path.join(OUT, 'view/index.json'), JSON.stringify({ about: 'Every served file and the address of the page that shows it. The pattern never changes: view/<path>.html (markdown twin: view/<path>.md).', by: ME, made_by: 'tools/library-view.mjs', pattern: 'view/<path>.html', files: index }, null, 1) + '\n')
console.log(`library-view: ${written} viewer pages -> ${path.relative(ROOT, OUT) || OUT}/view/`)
