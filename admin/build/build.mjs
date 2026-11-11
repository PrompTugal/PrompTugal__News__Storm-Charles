#!/usr/bin/env node
// The build: repository -> _site/ (never committed). Zero dependencies, one pass, a few hundred milliseconds.
//   - every *.md becomes a page beside it (and is served too, as its own markdown twin);
//   - the front page is the newsroom: the incident's headline (incident.json), the warnings now, the latest signals;
//   - each incident page carries the live dashboard (app/storm.js), which reads the incident's data/ every minute;
//   - every JSON under incidents/*/data/ is served at its own path AND at api/v1/<incident>/<path>, listed in
//     api/v1/index.json with its size, sha256 and what it is (the data site for agents); llms.txt says how to use it;
//   - version.json: the version CI gives (VERSION), the commit, when it was pushed and when it was built.
// Nothing here reads git history (a blobless clone made the team site's gate 40x slower: PIPELINE.md section 0).
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const OUT = path.join(ROOT, '_site')
const t0 = Date.now()
const SKIP = new Set(['.git', '.github', '_site', 'node_modules', 'admin'])
const SITE = 'https://storm-charles.promptugal.news/'
const VERSION = process.env.VERSION || 'local'
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
const write = (rel, data) => { const f = path.join(OUT, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, data) }
const walk = (dir, acc = []) => { for (const e of fs.readdirSync(dir, { withFileTypes: true })) { if (SKIP.has(e.name) || e.name.startsWith('.')) continue; const f = path.join(dir, e.name); e.isDirectory() ? walk(f, acc) : acc.push(path.relative(ROOT, f)) } return acc }

// ---------------------------------------------------------------- markdown (the subset this repository writes)
function inline(s) {
    const codes = []
    s = s.replace(/`([^`]+)`/g, (_, c) => `\u0000${codes.push(c) - 1}\u0000`)
    s = esc(s)
    s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, u) => {
        let href = u.replace(/&amp;/g, '&')
        if (!/^[a-z]+:/i.test(href) && !href.startsWith('#')) href = href.replace(/(^|\/)README\.md(#|$)/, '$1index.html$2').replace(/\.md(#|$)/, '.html$1')
        if (!/^(https:|http:|mailto:|#|\.|\/|[a-z0-9_-])/i.test(href)) href = '#'
        return `<a href="${esc(href)}">${t}</a>`
    })
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/(^|[^*\w])\*([^*\n]+)\*(?!\w)/g, '$1<em>$2</em>')
    return s.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${esc(codes[+i])}</code>`)
}
// a timeline row's permanent id, the same as tools/timeline.mjs gives it in signals.json: s-<MMDD>T<HHMM>, lettered within a minute
const MONTHS = { Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06', Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12' }
function rowId(cell, seen) {
    const m = String(cell).match(/^(\d{1,2}) ([A-Z][a-z]{2}),?\s*~?(\d{1,2}):(\d\d)$/)
    if (!m || !MONTHS[m[2]]) return ''
    const base = `s-${MONTHS[m[2]]}${m[1].padStart(2, '0')}T${m[3].padStart(2, '0')}${m[4]}`
    seen[base] = (seen[base] || 0) + 1
    return ` id="${seen[base] === 1 ? base : base + String.fromCharCode(96 + seen[base])}"`
}
function markdown(md) {
    const L = md.replace(/\r/g, '').split('\n'), out = []
    let i = 0
    const cells = l => l.trim().replace(/^\||\|$/g, '').split(/(?<!\\)\|/).map(c => c.trim())
    while (i < L.length) {
        const l = L[i]
        if (/^```/.test(l)) { const buf = []; i++; while (i < L.length && !/^```/.test(L[i])) buf.push(L[i++]); i++; out.push(`<pre><code>${esc(buf.join('\n'))}</code></pre>`); continue }
        const h = l.match(/^(#{1,6})\s+(.*)$/)
        if (h) { const id = h[2].toLowerCase().replace(/<[^>]+>|[^\w\s-]/g, '').trim().replace(/\s+/g, '-'); out.push(`<h${h[1].length} id="${esc(id)}">${inline(h[2])}</h${h[1].length}>`); i++; continue }
        if (/^\s*\|/.test(l) && i + 1 < L.length && /^\s*\|?\s*:?-{3,}/.test(L[i + 1])) {
            const head = cells(l); i += 2; const rows = [], seenIds = {}
            while (i < L.length && /^\s*\|/.test(L[i])) rows.push(cells(L[i++]))
            out.push(`<table><thead><tr>${head.map(c => `<th>${inline(c)}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr${rowId(r[0], seenIds)}>${r.map(c => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`); continue
        }
        if (/^>\s?/.test(l)) { const buf = []; while (i < L.length && /^>\s?/.test(L[i])) buf.push(L[i++].replace(/^>\s?/, '')); out.push(`<blockquote>${markdown(buf.join('\n'))}</blockquote>`); continue }
        if (/^\s*([-*]|\d+\.)\s+/.test(l)) {
            const ordered = /^\s*\d+\./.test(l), items = []
            while (i < L.length && (/^\s*([-*]|\d+\.)\s+/.test(L[i]) || (/^\s{2,}\S/.test(L[i]) && items.length))) {
                if (/^\s*([-*]|\d+\.)\s+/.test(L[i]) && !/^\s{2,}/.test(L[i])) items.push(L[i].replace(/^\s*([-*]|\d+\.)\s+/, ''))
                else items[items.length - 1] += '\n' + L[i].trim().replace(/^([-*]|\d+\.)\s+/, '• ')
                i++
            }
            out.push(`<${ordered ? 'ol' : 'ul'}>${items.map(x => `<li>${inline(x).replace(/\n/g, '<br>')}</li>`).join('')}</${ordered ? 'ol' : 'ul'}>`); continue
        }
        if (/^\s*$/.test(l)) { i++; continue }
        if (/^---+\s*$/.test(l)) { out.push('<hr>'); i++; continue }
        const buf = []; while (i < L.length && L[i].trim() && !/^(#{1,6}\s|```|>|\s*\||\s*([-*]|\d+\.)\s)/.test(L[i])) buf.push(L[i++])
        out.push(`<p>${inline(buf.join(' '))}</p>`)
    }
    return out.join('\n')
}
const frontMatter = md => { const m = md.match(/^---\n([\s\S]*?)\n---\n/); if (!m) return [{}, md]; const fm = {}; for (const l of m[1].split('\n')) { const k = l.match(/^(\w+):\s*(.*)$/); if (k) fm[k[1]] = k[2].replace(/^"|"$/g, '') } return [fm, md.slice(m[0].length)] }
const titleOf = (md, fallback) => (md.match(/^#\s+(.+)$/m) || [, fallback])[1].replace(/[*`]/g, '')

// ---------------------------------------------------------------- the page frame
const up = rel => '../'.repeat(rel.split('/').length - 1) || './'
// the menu: subsites on the first row, the pages of the subsite you are in on the second, breadcrumbs under them
// (incident.designer@, design/round-34.md; RESTRUCTURE.md and Dinis's 02:20 note). page() leaves a mark; the LAST step of the build fills
// it, when every page exists, so a link is listed only where its page was really built: no dead link, and nobody edits this file to appear.
const INCP = 'incidents/2026-11-10-storm-charles/'
const MENU = [
    ['Weather', [['Storm Charles', 'index.html']]],
    ['Stories', [['Stories', 'stories/index.html']]],
    ['Data room', [['Front page', 'data-room/index.html'], ['Dashboard', INCP + 'index.html'], ['Timeline', INCP + 'timeline.html'], ['Decisions', INCP + 'decisions.html'], ['Data', 'datasets.html'], ['Query', 'data/query/index.html'], ['Graph', 'app/graph/index.html'], ['Ontology', 'app/graph/ontology/index.html'], ['Lead times', 'app/graph/lead-times/index.html'], ['Entities', 'entities/index.html'], ['Library', 'library/index.html']]],
    ['Sources', [['Sources', 'sources/index.html'], ['IPMA', 'sources/ipma/index.html'], ['MeteoAlarm', 'sources/meteoalarm/index.html'], ['Meteorology', 'meteorology/index.html'], ['Wayback', 'evidence/index.html']]],
    ['Research', [['Media', 'research/media/index.html'], ['Media charts', 'research/media/charts.html'], ['Social', 'research/social/index.html'], ['Wikipedia', 'research/wikipedia/index.html'], ['Weather sites', 'research/weather-sites/index.html'], ['Studies', 'research/weather-sites/studies/index.html'], ['Shadow', 'shadow/index.html'], ['Models', 'models/index.html']]],
    ['Labs', [['Labs', 'labs/index.html']]],
    ['Studio', [['Studio', 'studio/index.html'], ['Cast', 'studio/cast/index.html']]],
    ['Team', [['Agents', 'agents/index.html'], ['Jobs', 'app/agents/jobs.html'], ['Jobs, the table', 'agents/JOBS.html'], ['Board', 'board/index.html'], ['For Dinis', 'board/for-dinis.html'], ['CI', 'ci/index.html'], ['Log in', 'account/index.html'], ['Contribute', 'contribute.html'], ['Launch draft', 'outreach/launch.html']]],
    ['Help', [['Help', 'help/index.html'], ["What's new", 'news/index.html']]],
    ['About', [['Brief', 'BRIEF.html'], ['Restructure', 'RESTRUCTURE.html'], ['Design', 'design/index.html'], ['LLMs', 'llms.txt']]]
]
const REPO = 'https://github.com/PrompTugal/PrompTugal__News__Storm-Charles'
let MENU_LIVE = null
function menu(rel, u, title) {
    if (!MENU_LIVE) MENU_LIVE = MENU.map(([name, items]) => [name, items.filter(([, t]) => fs.existsSync(path.join(OUT, t)))]).filter(([, items]) => items.length)
    const dir = t => t.replace(/[^/]*$/, '')
    // the subsite of a page: an exact address first, else the longest folder it sits under
    let active = MENU_LIVE.find(([, items]) => items.some(([, t]) => t === rel)), best = 0
    if (!active) for (const s of MENU_LIVE) for (const [, t] of s[1]) { const d = dir(t); if (d && rel.startsWith(d) && d.length > best) { best = d.length; active = s } }
    if (!active) active = MENU_LIVE.find(([n]) => n === 'Data room') || MENU_LIVE[0]
    const here = active[1].find(([, t]) => t === rel)
    const a = ([label, t], cur) => `<a href="${u}${t}"${cur ? ' aria-current="page"' : ''}>${esc(label)}</a>`
    const nav = `<nav class="sites" aria-label="Subsites">${MENU_LIVE.map(s => `<a href="${u}${s[1][0][1]}"${s === active ? ' aria-current="true"' : ''}>${esc(s[0])}</a>`).join('')}</nav>
<nav class="top" aria-label="${esc(active[0])}"><span class="navg"><b>${esc(active[0])}</b>${active[1].map(i => a(i, i[1] === rel)).join('')}</span></nav>`
    const crumbs = rel === 'index.html' ? '' : `<nav class="crumbs" aria-label="Where you are"><div class="wrap"><a href="${u}index.html">Storm Charles</a><span>›</span><a href="${u}${active[1][0][1]}">${esc(active[0])}</a>${here && here[1] === active[1][0][1] ? '' : `<span>›</span><b>${esc(here ? here[0] : title)}</b>`}</div></nav>`
    return { nav, crumbs }
}
const MENU_MARK = (rel, u, title) => `<!--menu:${Buffer.from(JSON.stringify([rel, u, title])).toString('base64')}-->`
const HAS_LENS_CSS = fs.existsSync(path.join(ROOT, 'app/lens/lens.css')), HAS_LENS_JS = fs.existsSync(path.join(ROOT, 'app/lens/lens.js'))
const HAS_NEWS = fs.existsSync(path.join(ROOT, 'news/README.md')) || fs.existsSync(path.join(ROOT, 'news/index.md'))
function page({ rel, title, body, desc = '', twin = '', extraHead = '' }) {
    const u = rel === '404.html' ? '/' : up(rel)   // the 404 page is served at any depth: its links are absolute
    return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} · Storm Charles</title>
<meta name="description" content="${esc(desc || 'Storm Charles, Lisbon, November 2026: the decisions, the warnings and the signals, each with its source and the time read; and the data, for people and agents.')}">
<script src="${u}app/design/theme.js?v=${encodeURIComponent(VERSION)}"></script>
<link rel="stylesheet" href="${u}app/site.css?v=${encodeURIComponent(VERSION)}">${HAS_LENS_CSS ? `\n<link rel="stylesheet" href="${u}app/lens/lens.css?v=${encodeURIComponent(VERSION)}">` : ''}
${twin ? `<link rel="alternate" type="text/markdown" href="${esc(twin)}">` : ''}
<link rel="alternate" type="application/json" href="${u}api/v1/index.json" title="The data, for agents">
<script type="module" src="${u}app/login/feedback.js"></script>
<script src="${u}app/agents/obs.js" defer></script>
${extraHead}
</head>
<body>
<header class="top"><div class="wrap"><a class="brand" href="${u}index.html">Storm <b>Charles</b> · PrompTugal</a><span class="live">Live</span><a class="ver" href="${u}${HAS_NEWS ? 'news/index.html' : 'version.json'}" title="This version: what changed, what was built, when">${esc(VERSION)}</a><a class="ver repo" href="${REPO}" title="The repository this site is built from (leaves this site)">repo</a><button type="button" class="theme" id="panel-btn" hidden aria-controls="panel" aria-expanded="false">Panel</button>
${MENU_MARK(rel, u, title)}</div></header>
<div class="notice"><div class="wrap"><strong>Not a warning service.</strong> Follow <a href="https://www.ipma.pt/">IPMA</a>, <a href="https://prociv.gov.pt/">ANEPC</a> and your local authorities. We aggregate public sources, each with its source and the time we read it.</div></div>
<!--crumbs--><div class="shell" id="shell"><div class="shell-main">
${body}
</div><aside class="panel" id="panel" hidden aria-label="The reader's panel" data-base="${u}" data-version="${esc(VERSION)}"${twin ? ` data-twin="${esc(twin)}"` : ''}>
<p class="pn-top"><b>The reader's panel</b><button type="button" id="panel-close" aria-label="Close the panel">Close ×</button></p>
<details id="pn-lens" open><summary>Lens</summary><p class="pn-meta">Colour what a page is made of. Yours only; kept in this browser.</p>
<label><input type="checkbox" data-lens="fact"> <span class="lbl l-fact">fact</span> read at the source that decides or warns</label>
<label><input type="checkbox" data-lens="evidence"> <span class="lbl l-evidence">evidence</span> reported by others</label>
<label><input type="checkbox" data-lens="hypothesis"> <span class="lbl l-hypothesis">hypothesis</span> our analysis</label>
<label><input type="checkbox" data-lens="entity"> <span class="pn-sw ent"></span> entities (things with a page here)</label>
<label><input type="checkbox" data-lens="out" checked> <span class="pn-sw out"></span> links that leave this site</label><div id="panel-lens"></div></details>
<details id="pn-item" open><summary>This item</summary><div id="panel-item"><p class="pn-meta">Click a bar in a strip, a row of the timeline or a linked word: what it is, and where it comes from, opens here.</p></div></details>
<details id="pn-source"><summary>Source</summary><div id="panel-source"><p class="pn-meta">The file behind this page, shown here, not downloaded.</p></div></details>
<details id="pn-theme"><summary>Theme</summary><div class="pn-themes" id="panel-theme" role="radiogroup" aria-label="Theme">${['auto', 'light', 'dark', 'paper', 'night', 'contrast'].map(t => `<label><input type="radio" name="pn-theme" value="${t}"> ${t}</label>`).join('')}</div></details>
<details id="pn-version"><summary>Version</summary><div id="panel-version"><p><a href="${u}version.json">${esc(VERSION)}</a></p></div></details>
</aside></div>
<footer class="agent"><div class="wrap">Built and run by Dinis Cruz's incident team of Claude Code agents (see <a href="${u}agents/index.html">Agents</a>), with a named human operator. Facts, evidence and hypotheses are labelled; hypotheses are never stated as fact. <span class="cap">The times IPMA sent its warnings come through <a href="https://www.meteoalarm.org">MeteoAlarm</a> (EUMETNET). Time delays between this website and the www.meteoalarm.org website are possible. For the most up-to-date awareness information as published by the participating National Meteorological and Hydrological Services, please refer to <a href="https://www.meteoalarm.org">www.meteoalarm.org</a>. Our copy is a dated record, read about every 5 to 30 minutes, not a live feed.</span> ${twin ? `<a href="${esc(twin)}">This page as markdown</a> · ` : ''}<a href="${u}version.json">${esc(VERSION)}</a></div></footer>
<script src="${u}app/design/frame.js?v=${encodeURIComponent(VERSION)}"></script>
<script src="${u}app/design/panel.js?v=${encodeURIComponent(VERSION)}"></script>${HAS_LENS_JS ? `\n<script src="${u}app/lens/lens.js?v=${encodeURIComponent(VERSION)}"></script>` : ''}
</body>
</html>
`
}

// ---------------------------------------------------------------- go
fs.rmSync(OUT, { recursive: true, force: true })
fs.mkdirSync(OUT, { recursive: true })
const files = walk(ROOT)
const pages = []
for (const rel of files) {
    const src = path.join(ROOT, rel)
    write(rel, fs.readFileSync(src))   // everything public in the repository is served as itself (the twins, the data, the app)
}
// generators that take --out: they write only into _site/, never a tracked file (CLAUDE.md, "Building a page")
const GENS = JSON.parse(fs.readFileSync(path.join(ROOT, 'admin/build/generators.json'), 'utf8'))
const runGens = list => { for (const g of list || []) { if (!fs.existsSync(path.join(ROOT, g))) continue; try { execFileSync(process.execPath, [path.join(ROOT, g), '--out', OUT], { cwd: ROOT, stdio: 'ignore' }) } catch (e) { console.log(`WARN ${g}: ${String(e.message).split('\n')[0]}`) } } }
runGens(GENS.before)
process.on('exit', () => runGens(GENS.after))   // "after": steps that need the finished pages (the linker)
// the incidents
const incidents = fs.readdirSync(path.join(ROOT, 'incidents')).filter(d => fs.existsSync(path.join(ROOT, 'incidents', d, 'incident.json')))
const INC = Object.fromEntries(incidents.map(d => [d, JSON.parse(fs.readFileSync(path.join(ROOT, 'incidents', d, 'incident.json'), 'utf8'))]))

// every markdown file being served: the tracked ones, and any a generator wrote into _site/ (so a generated page needs no tracked copy)
const walkOut = (dir, acc = []) => { for (const e of fs.readdirSync(dir, { withFileTypes: true })) { const f = path.join(dir, e.name); e.isDirectory() ? walkOut(f, acc) : e.name.endsWith('.md') && acc.push(path.relative(OUT, f)) } return acc }
for (const rel of walkOut(OUT).sort()) {
    const [fm, md] = frontMatter(fs.readFileSync(path.join(OUT, rel), 'utf8'))   // the served copy (a generator may have refreshed it)
    const htmlRel = rel.replace(/(^|\/)README\.md$/, '$1index.html').replace(/\.md$/, '.html')
    const title = fm.title || titleOf(md, rel)
    let body = `<main class="doc"><div class="wrap"><article${/^[a-z][a-z0-9 -]*$/.test(fm.class || '') ? ` class="${fm.class}"` : ''}>${markdown(md)}</article></div></main>`
    let extraHead = ''
    const m = rel.match(/^incidents\/([^/]+)\/README\.md$/)
    if (m && INC[m[1]]) {
        body = `<section class="banner"><div class="wrap"><p class="kicker">The live dashboard</p><h1>${esc(INC[m[1]].title)}</h1><p class="src">Read from the incident's data every minute while this page is open. <a href="../../datasets.html">The data</a>.</p></div></section>
<main class="doc"><div class="wrap"><div class="incident" id="incident" data-dir="data/"><p class="meta">The dashboard needs JavaScript: it reads <a href="data/README.md">data/</a> and draws it here.</p></div></div></main>${body}`
        extraHead = `<script src="../../app/storm.js" defer></script>`
    }
    // the timeline as a page (incident.designer@, design/round-14.md): the markdown table stays the source and keeps its row anchors;
    // each row is dressed from data/signals.json (label, kind, decision, key, supersedes) at build time, so it reads without JavaScript;
    // app/design/timeline.js only filters.
    const tlm = rel.match(/^incidents\/([^/]+)\/timeline\.md$/)
    if (tlm) {
        let sg = null; try { sg = JSON.parse(fs.readFileSync(path.join(ROOT, 'incidents', tlm[1], 'data/signals.json'), 'utf8')) } catch { }
        const byId = Object.fromEntries((sg?.items || []).map(x => [x.id, x])), supBy = {}
        for (const x of sg?.items || []) if (x.supersedes) supBy[x.supersedes] = x.id
        let lastDay = '', n = 0
        const html = markdown(md).replace(/<tr id="(s-[^"]+)"><td>([^<]*)<\/td>/g, (all, id, when) => {
            const x = byId[id]; if (!x) return all
            n++
            const d = String(x.at).slice(0, 10), t = String(x.at).slice(11, 16), dayRow = d !== lastDay ? `<tr class="tl-day"><th colspan="3">${esc(new Date(d + 'T00:00:00Z').toLocaleDateString('en-GB', { timeZone: 'UTC', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }))}</th></tr>` : ''
            lastDay = d
            return `${dayRow}<tr id="${esc(id)}" class="tl-row${x.key ? ' key' : ''}${x.decision ? ' decision' : ''}${supBy[id] ? ' superseded' : ''}" data-label="${esc(x.label || '')}" data-kind="${esc(x.kind || '')}"><td class="tl-t"><a href="#${esc(id)}" title="Link to this row"><time datetime="${esc(x.at)}">${x.approx ? '~' : ''}${esc(t)}</time></a><small>${esc(when.split(',')[0])}</small><span class="lbl l-${esc(x.label || '')}">${esc(x.label || '')}</span>${x.decision ? '<span class="lbl dec">decision</span>' : ''}<small class="tl-kind">${esc(x.kind || '')}</small>${x.supersedes ? `<small class="tl-sup">supersedes <a href="#${esc(x.supersedes)}">${esc(x.supersedes)}</a></small>` : ''}${supBy[id] ? `<small class="tl-sup">superseded by <a href="#${esc(supBy[id])}">${esc(supBy[id])}</a></small>` : ''}</td>`
        })
        const count = k => f => (sg?.items || []).filter(x => x[k] === f).length
        const box = (k, v) => `<label><input type="checkbox" data-f="${k}" value="${esc(v)}" checked> ${esc(v)} <i>${count(k)(v)}</i></label>`
        body = `<main class="doc tl"><div class="wrap"><article>
<form class="tl-filter" id="tl-filter" hidden><fieldset><legend>Label</legend>${[...new Set((sg?.items || []).map(x => x.label).filter(Boolean))].map(v => box('label', v)).join('')}</fieldset><fieldset><legend>Kind</legend>${[...new Set((sg?.items || []).map(x => x.kind).filter(Boolean))].map(v => box('kind', v)).join('')}</fieldset><fieldset><legend>Only</legend><label><input type="checkbox" data-f="only" value="decision"> decisions</label><label><input type="checkbox" data-f="only" value="key"> key rows</label></fieldset><output id="tl-count">${n} rows</output></form>
${html}
<p class="meta">Every row's label, kind and id are in <a href="data/signals.json">data/signals.json</a> (made ${esc(String(sg?.made_at || '').replace('T', ' ').slice(0, 16))} UTC from this table). A row's time links to itself: copy it to cite the row.</p></article></div></main>`
        extraHead += `<script src="../../app/design/timeline.js" defer></script>`
    }
    // any page can mount an app through the frame: front matter `mount:` (the element, one line of HTML, placed above the text) and
    // `head:` (its stylesheet and script tags, one line). The page then always has the site's nav, notice and footer
    if (fm.mount) { body = `<main class="doc"><div class="wrap">${fm.mount}</div></main>` + body; extraHead += fm.head || '' }
    if (rel === 'agents/README.md') {   // the live agents page (incident.observability@'s app/agents/)
        body = `<main class="doc"><div class="wrap"><div id="agents-live" data-base="../"></div></div></main>` + body
        extraHead = `<link rel="stylesheet" href="../app/agents/agents.css"><script src="../app/agents/agents.js" defer></script>`
    }
    write(htmlRel, page({ rel: htmlRel, title, body, desc: fm.summary || '', twin: path.basename(rel), extraHead }))
    pages.push({ rel: htmlRel, md: rel, title })
}

// the data site: api/v1
const datasets = []
for (const d of incidents) for (const rel of files.filter(f => f.startsWith(`incidents/${d}/data/`) && f.endsWith('.json'))) {
    const buf = fs.readFileSync(path.join(ROOT, rel)); let about = ''
    try { const j = JSON.parse(buf); about = typeof j.about === 'string' ? j.about : '' } catch { }
    const sub = rel.slice(`incidents/${d}/data/`.length)
    write(`api/v1/${d}/${sub}`, buf)
    datasets.push({ incident: d, path: sub, url: `api/v1/${d}/${sub}`, source_file: rel, bytes: buf.length, sha256: crypto.createHash('sha256').update(buf).digest('hex'), about: about.slice(0, 400) })
}
const builtAt = new Date().toISOString()
const catalog = {
    about: 'The data behind storm-charles.promptugal.news, for agents and people: every file with its size and sha256. Inside each file, every value carries its source and the UTC time it was read; facts, evidence and hypotheses are labelled. Refreshed by the incident agents at least hourly while the storm runs. Not a warning service: follow IPMA and ANEPC.',
    version: VERSION, built_at: builtAt, site: SITE, licence: 'Our own data: Apache-2.0 (the repository\'s licence). Quoted sources keep their own terms; each item links its source.',
    incidents: incidents.map(d => ({ id: d, title: INC[d].title, status: INC[d].status, headline: INC[d].headline })), datasets
}
write('api/v1/index.json', JSON.stringify(catalog, null, 2) + '\n')

// the front page: the weather presenter. Markup by incident.designer@web-summit.dinis (design/round-1.md); it reads the
// incident's files as they are and changes no data. Every figure carries its source link and the time it was read.
const d0 = incidents[0], inc = INC[d0], base = `incidents/${d0}/`
const J = rel => { try { return JSON.parse(fs.readFileSync(path.join(ROOT, base, rel), 'utf8')) } catch { return null } }
const sig = J('data/signals.json'), warn = J('data/weather/warnings.json'), chg = J('data/weather/changes.json')
const fc = J('data/weather/forecast.json'), ap = J('data/weather/airport.json'), an = J('data/weather/analysis.json'), gv = J('data/weather/gusts-vs-forecast.json')
const T = t => typeof t === 'number' ? t : Date.parse(t), ok = t => t && !isNaN(T(t))
const utc = (t, o) => new Date(T(t)).toLocaleString('en-GB', { timeZone: 'UTC', ...o })
const hm = t => ok(t) ? new Date(T(t)).toISOString().slice(11, 16) : '?'
const dm = t => ok(t) ? utc(t, { day: 'numeric', month: 'short' }) : ''
const wd = t => ok(t) ? utc(t, { weekday: 'short' }) : ''
const day = t => ok(t) ? new Date(T(t)).toISOString().slice(0, 10) : ''
const rng = (a, b) => `${wd(a)} ${hm(a)} to ${day(a) === day(b) ? '' : wd(b) + ' '}${hm(b)}`
const prov = (url, name, t) => `<span class="prov">${url ? `<a href="${esc(url)}">${esc(name)}</a>` : esc(name)}${ok(t) ? `, read <time datetime="${esc(t)}">${hm(t)} UTC ${dm(t)}</time>` : ''}</span>`
const lvl = l => `<span class="lvl ${esc(l)}">${esc(l)}</span>`
const RANK = { yellow: 1, orange: 2, red: 3 }
const EN = { 'Vento': 'Wind', 'Precipitação': 'Rain', 'Agitação Marítima': 'Sea state', 'Trovoada': 'Thunderstorms', 'Nevoeiro': 'Fog', 'Neve': 'Snow', 'Tempo Frio': 'Cold', 'Tempo Quente': 'Heat' }
const lis = (warn?.lisbon || []).filter(w => RANK[w.level] && ok(w.start_utc) && ok(w.end_utc)).sort((a, b) => T(a.start_utc) - T(b.start_utc))
// the day the page presents: the day the highest warning starts (no warning: the day after the build)
const top = lis.slice().sort((a, b) => RANK[b.level] - RANK[a.level] || T(a.start_utc) - T(b.start_utc))[0]
const DAY = top ? day(top.start_utc) : new Date(Date.now() + 864e5).toISOString().slice(0, 10)
const D0 = T(DAY + 'T00:00:00Z'), D1 = D0 + 864e5, dayName = utc(D0, { weekday: 'long', day: 'numeric', month: 'long' })
const NEXT = new Date(D1).toISOString().slice(0, 10), nextName = utc(D1, { weekday: 'long', day: 'numeric', month: 'long' })
const inDay = (a, b) => T(a) < D1 && T(b) > D0
const pct = t => Math.max(0, Math.min(100, (T(t) - D0) / 864e3))
const bar = ({ a, b, cls = '', text, title = '', style = '', href = '' }) => {
    const l = pct(a), r = pct(b); if (r <= l) return ''
    const tag = href ? `a href="${esc(href)}"` : 'div'
    return `<${tag} class="wx-bar ${cls}${T(a) < D0 ? ' cut-l' : ''}${T(b) > D1 ? ' cut-r' : ''}" style="left:${l.toFixed(3)}%;width:${(r - l).toFixed(3)}%;${style}" title="${esc(title)}"><span>${text}</span></${href ? 'a' : 'div'}>`
}
const rows = [], tbl = []
const row = (label, sub, inner, cls = '') => rows.push(`<div class="wx-row ${cls}"><div class="wx-lab"><b>${label}</b>${sub}</div><div class="wx-track">${inner}</div></div>`)
const head = (label, sub) => rows.push(`<div class="wx-row wx-group"><div class="wx-lab"><b>${label}</b></div><div class="wx-track"><span>${sub}</span></div></div>`)

// 1. IPMA's warnings, one lane per type
const types = [...new Set(lis.filter(w => inDay(w.start_utc, w.end_utc)).map(w => w.type))]
const warnProv = prov(warn?.source, 'IPMA warnings', warn?.read_utc)
if (types.length) head('Warned', `IPMA's warnings for the Lisbon district: facts. ${warnProv}`)
for (const ty of types) {
    const ws = lis.filter(w => w.type === ty && inDay(w.start_utc, w.end_utc))
    row(esc(EN[ty] || ty), `<i lang="pt">${esc(ty)}</i>`, ws.map(w => bar({ a: w.start_utc, b: w.end_utc, cls: 'w-' + esc(w.level), text: `<b>${esc(w.level)}</b> ${hm(w.start_utc)} to ${hm(w.end_utc)}`, title: `${w.level}: ${rng(w.start_utc, w.end_utc)}. ${w.text_pt || ''}` })).join(''))
    for (const w of ws) tbl.push([`IPMA warning: ${EN[ty] || ty}`, `${w.level}. <span lang="pt">${esc(w.text_pt || '')}</span>`, w.start_utc, w.end_utc, prov(w.source || warn.source, 'IPMA', w.read_utc || warn.read_utc)])
}
// 1b. the decisions in force on the day, on the same hours as the warnings (data/decisions/graph.json, kept by incident.researcher@).
// The hours come from the data: effect_from_utc / effect_to_utc on each edge, from the sources' own words (effect_note). An edge with a
// start and no end runs to the end of the strip, open. IPMA's own edges are not repeated here: they are the Warned band.
// ALL_DAY: edges whose source names this day but no hours; drawn across the day, outlined, "hours not stated" (the conductor's list,
// 10 Nov 23:58). It is the one thing here not yet in the data: a day field on the edge would replace it.
const dg = J('data/decisions/graph.json')
const ALL_DAY = { '2026-11-11': ['websummit-wednesday', 'bridges-60', 'metro-runs', 'carris-runs-watched', 'flixbus-suspends', 'ana-conditioned'] }
const dEdges = (dg?.edges || []).filter(e => e.status === 'happened' && e.by !== 'ipma' && (ok(e.effect_from_utc) || (ALL_DAY[DAY] || []).includes(e.id))).map(e => {
    const stated = ok(e.effect_from_utc), open = stated && !ok(e.effect_to_utc)
    return { e, stated, open, a: stated ? T(e.effect_from_utc) : D0, b: !stated || open ? D1 + 1 : T(e.effect_to_utc) + (/T23:59/.test(e.effect_to_utc) ? 6e4 : 0), node: (dg.nodes || []).find(n => n.id === e.by) }
}).filter(d => d.b > D0 && d.a < D1).sort((p, q) => (p.stated ? 0 : 1) - (q.stated ? 0 : 1) || (p.e.label === 'fact' ? 0 : 1) - (q.e.label === 'fact' ? 0 : 1) || (T(p.e.at) || 0) - (T(q.e.at) || 0))
if (dEdges.length) {
    head('Decided', `Decisions in force on the day, on the same hours: who decided, what, from when to when, in the sources' own hours. Solid: a fact, read on the decider's own channel. Outlined: evidence, reported by others. Dotted, across the day: the source names the day but no hours. Under each name: the label and when it was decided. Each bar links to its source. <span class="prov"><a href="${base}data/decisions/graph.json">The decision graph</a>, updated ${hm(dg.updated)} UTC ${dm(dg.updated)}</span>`)
    let folded = false
    for (const d of dEdges) {
        if (!d.stated && !folded) { folded = true; rows.push(`<details class="wx-fold"><summary><span>${dEdges.filter(x => !x.stated).length} more decisions for the day, hours not stated: ${esc(dEdges.filter(x => !x.stated).map(x => String(x.node?.name || x.e.by).replace(/\s*\(.*$/, '')).join(', '))}</span></summary>`) }
        const who = String(d.node?.name || d.e.by).replace(/\s*\(.*$/, ''), made = /T\d\d:\d\d/.test(d.e.at || '') && ok(d.e.at) ? `${wd(d.e.at)} ${hm(d.e.at)}` : ok(d.e.at) ? `${dm(d.e.at)}, hour not given` : 'time not given'
        const hours = !d.stated ? 'hours not stated' : d.open ? `from ${hm(d.a)}, end not stated` : `${hm(d.a)} to ${hm(d.e.effect_to_utc)}`
        row(esc(who), `<i>${esc(d.e.label)} · ${esc(made)}</i>`, bar({ a: d.a, b: d.b, cls: 'dec d-' + esc(d.e.label) + (d.stated ? '' : ' d-nohours'), href: /^https:/.test(d.e.source || '') ? d.e.source : '', text: `<b>${esc(d.e.label)}</b> <i>${esc(hours)}</i> ${esc(d.e.decision)}`, title: `${d.e.label}: ${d.e.decision} Hours: ${hours}${d.e.effect_note ? ' (' + d.e.effect_note + ')' : ''}. Decided ${made}; source read ${hm(d.e.read)} UTC ${dm(d.e.read)} by ${d.e.read_by || ''}.${d.e.note ? ' Note: ' + d.e.note : ''}` }), 'wx-dec')
        tbl.push([`Decision: ${who}`, `${d.e.label}. ${d.e.decision} (${hours}${d.e.effect_note ? ': ' + d.e.effect_note : ''})`, d.a, Math.min(d.b, D1), prov(d.e.source, who, d.e.read)])
    }
}
if (dEdges.some(d => !d.stated)) rows.push('</details>')
// 2. the airport forecast (TAF): prevailing, at times, and with a stated chance
const taf = ap?.taf, groups = (taf?.groups || []).filter(g => ok(g.from_utc) && ok(g.to_utc) && inDay(g.from_utc, g.to_utc))
const gtxt = g => [g.wind_kmh != null ? `${g.wind_kmh}${g.gust_kmh != null ? ` <b>G${g.gust_kmh}</b>` : ''} km/h` : '', g.weather ? esc(g.weather) : ''].filter(Boolean).join(' · ') || 'no change in wind'
const gttl = g => `${g.change}${g.prob ? ' PROB' + g.prob : ''} ${rng(g.from_utc, g.to_utc)}${g.becoming_by_utc ? ', becoming by ' + hm(g.becoming_by_utc) : ''}: ${g.wind_kt != null ? `${g.wind_dir}° ${g.wind_kt} kt${g.gust_kt != null ? ' gusting ' + g.gust_kt + ' kt' : ''} (${g.wind_kmh}${g.gust_kmh != null ? ' gusting ' + g.gust_kmh : ''} km/h)` : 'wind unchanged'}${g.weather ? ', ' + g.weather : ''}`
const heat = g => `--k:${Math.round(Math.min(1, (g.gust_kmh ?? g.wind_kmh ?? 0) / 120) * 100)}%`
if (groups.length) {
    const tafProv = prov(taf.source, 'TAF LPPT', taf.read_utc)
    head('Airport forecast', `TAF for Lisbon airport (LPPT), issued ${hm(taf.issue_utc)} UTC ${dm(taf.issue_utc)}: a point forecast for pilots, never instead of IPMA's warning. Mean wind and gusts (G) in km/h. ${tafProv}`)
    const lanes = [['Prevailing', 'base and becoming', g => !g.prob && g.change !== 'TEMPO'], ['At times', 'TEMPO', g => !g.prob && g.change === 'TEMPO'], ...[...new Set(groups.filter(g => g.prob).map(g => g.prob))].map(p => [`${p}% chance`, `PROB${p} TEMPO`, g => g.prob === p])]
    for (const [name, sub, f] of lanes) {
        const gs = groups.filter(f); if (!gs.length) continue
        row(esc(name), `<i>${esc(sub)}</i>`, gs.map(g => {
            const tr = g.becoming_by_utc ? (Math.min(T(g.becoming_by_utc), D1) - Math.max(T(g.from_utc), D0)) / (Math.min(T(g.to_utc), D1) - Math.max(T(g.from_utc), D0)) * 100 : 0
            return bar({ a: g.from_utc, b: g.to_utc, cls: 'taf' + (tr ? ' becmg' : ''), text: (tr ? `<i>by ${hm(g.becoming_by_utc)}:</i> ` : '') + gtxt(g), title: gttl(g), style: `${heat(g)};--tr:${tr.toFixed(1)}%` })
        }).join(''), 'wx-taf')
        for (const g of gs) tbl.push([`Airport TAF: ${name}`, gttl(g), g.from_utc, g.to_utc, tafProv])
    }
}
// 3. IPMA's hourly model for the city (mean wind, no gusts), and what the airport has observed
const hours = [...Array(24)].map((_, h) => D0 + h * 36e5)
const cells = f => hours.map((t, h) => { const c = f(t, h); return `<div class="wx-cell${c ? '' : ' empty'}"${c?.title ? ` title="${esc(c.title)}"` : ''}${c?.style ? ` style="${c.style}"` : ''}>${c ? c.text : ''}</div>` }).join('')
const hr = (fc?.hourly?.rows || []).filter(r => ok(r.time_utc) && T(r.time_utc) >= D0 && T(r.time_utc) < D1)
if (hr.length) {
    const at = t => hr.find(r => T(r.time_utc) === t), mProv = prov(fc.hourly.source, 'IPMA hourly forecast', fc.hourly.read_utc)
    const wg = (lis.find(w => w.type === 'Vento' && inDay(w.start_utc, w.end_utc))?.text_pt || '').match(/\d+/g) || [], restamped = (fc.hourly_runs || []).some(r => r.updated_local === fc.hourly.updated_local)
    head('City model', `City model, mean wind. Why these numbers sit far below the warning's: this is a model's value for one point in the city, the wind averaged over minutes; mean wind only, this feed has no gusts. The warning is IPMA's forecasters on gusts, the brief peaks${wg.length >= 2 ? `: up to ${esc(wg[0])} km/h across the district, ${esc(wg[1])} in its most exposed places` : ''}. Two measures, not two opinions (our explanation). IPMA's hourly model forecast for Lisbon, stamped ${hm(fc.hourly.updated_local + 'Z')} ${wd(fc.hourly.updated_local + 'Z')}${restamped ? `; IPMA has changed its values since without changing the stamp (read ${hm(fc.hourly.read_utc)})` : ''}. ${mProv}`)
    row('Mean wind', '<i>city model · km/h, from</i>', cells(t => { const r = at(t); return r && r.wind_mean_kmh != null ? { text: `<b>${Math.round(r.wind_mean_kmh)}</b><i>${esc(r.wind_dir || '')}</i>`, title: `${hm(r.time_utc)}: mean wind ${r.wind_mean_kmh} km/h from ${r.wind_dir}`, style: `--k:${Math.round(Math.min(1, r.wind_mean_kmh / 120) * 100)}%` } : null }), 'wx-cells')
    row('Rain', '<i>city model · IPMA intensity class</i>', cells(t => { const r = at(t); return r && r.rain_intensity_class != null ? { text: `<b>${esc(r.rain_intensity_class)}</b>${r.rain_prob_pct != null ? `<i>${esc(r.rain_prob_pct)}%</i>` : ''}`, title: `${hm(r.time_utc)}: rain intensity class ${r.rain_intensity_class}${r.rain_prob_pct != null ? ', probability ' + r.rain_prob_pct + '%' : ''}`, style: `--k:${Math.min(100, r.rain_intensity_class * 25)}%` } : null }), 'wx-cells rain')
    tbl.push(['IPMA hourly model', `mean wind ${Math.min(...hr.map(r => r.wind_mean_kmh))} to ${Math.max(...hr.map(r => r.wind_mean_kmh))} km/h; no gusts in this feed`, new Date(D0).toISOString(), new Date(D1).toISOString(), mProv])
}
const obs = (ap?.metars || []).filter(m => ok(m.time_utc) && T(m.time_utc) >= D0 && T(m.time_utc) < D1)
{
    const oProv = prov(obs[0]?.source || ap?.max_gust?.source, 'METAR LPPT', ap?.read_utc)
    head('Observed', `Lisbon airport's reports (METAR), the strongest in each hour: gust (G) if one was reported, else mean wind, km/h. ${obs.length ? '' : `None yet for ${esc(dayName)}. `}${oProv}`)
    row('Airport', '<i>km/h</i>', cells(t => { const ms = obs.filter(m => T(m.time_utc) >= t && T(m.time_utc) < t + 36e5); if (!ms.length) return null; const m = ms.slice().sort((a, b) => (b.gust_kmh ?? b.wind_kmh ?? 0) - (a.gust_kmh ?? a.wind_kmh ?? 0))[0]; return { text: `<b>${m.gust_kmh != null ? 'G' + m.gust_kmh : m.wind_kmh ?? ''}</b><i>${m.weather ? esc(m.weather) : ''}</i>`, title: m.raw, style: `--k:${Math.round(Math.min(1, (m.gust_kmh ?? m.wind_kmh ?? 0) / 120) * 100)}%` } }), 'wx-cells obs')
}
// 4. our analysis, always labelled, drawn unlike a fact
const lastAn = (an?.updates || []).slice(-1)[0] || an?.wednesday_lisbon, ww = lastAn?.worst_window_utc
if (ww && ok(ww[0]) && inDay(ww[0], ww[1])) {
    const ends = lastAn.ends_utc, conf = lastAn.confidence?.window
    head('Our analysis', `A hypothesis by ${esc(an.by || 'the meteorologist')}, written ${hm(lastAn.written_utc || an.written_utc)} UTC ${dm(lastAn.written_utc || an.written_utc)}: reasoning from the files above, not IPMA's words. <span class="prov"><a href="${base}data/weather/analysis.html">The reasons</a></span>`)
    row('Worst window', `<i>confidence: ${esc(conf || 'not stated')}</i>`, bar({ a: ww[0], b: ww[1], cls: 'hyp', text: `<b>hypothesis</b> worst ${hm(ww[0])} to ${hm(ww[1])}`, title: lastAn.why ? String([].concat(lastAn.why).join('; ')) : '' }) + (ok(ends) && T(ends) > T(ww[1]) ? bar({ a: ww[1], b: ends, cls: 'hyp ease', text: `easing, ends ${hm(ends)}`, title: 'analysis: when the warned weather ends' }) : ''), 'wx-hyp')
    tbl.push(['Our analysis (hypothesis)', `worst window, confidence ${conf || 'not stated'}`, ww[0], ww[1], `<span class="prov"><a href="${base}data/weather/analysis.html">analysis</a></span>`])
}
// round 3: the day in phases (each stretch of hours in which the set of Lisbon warnings does not change): the phone's view of the strip
// a prevailing group holds until the next one has finished becoming (so a stretch never reads lighter than the TAF allows)
const prevG = groups.filter(q => !q.prob && q.change !== 'TEMPO' && q.wind_kmh != null).sort((p, q) => T(p.from_utc) - T(q.from_utc))
const endOf = q => { const n = prevG[prevG.indexOf(q) + 1]; return prevG.includes(q) && n ? T(n.becoming_by_utc || n.from_utc) : T(q.to_utc) }
const dayW = lis.filter(w => inDay(w.start_utc, w.end_utc))
const cuts = [...new Set([D0, D1, ...dayW.flatMap(w => [T(w.start_utc), T(w.end_utc)]).filter(t => t > D0 && t < D1)])].sort((a, b) => a - b)
const phases = cuts.slice(0, -1).map((a, i) => {
    const b = cuts[i + 1], on = dayW.filter(w => T(w.start_utc) < b && T(w.end_utc) > a).sort((p, q) => RANK[q.level] - RANK[p.level])
    const gs = groups.filter(q => T(q.from_utc) < b && endOf(q) > a && q.wind_kmh != null), mx = f => Math.max(-1, ...gs.filter(f).map(q => q.gust_kmh ?? q.wind_kmh))
    const pv = mx(q => !q.prob && q.change !== 'TEMPO'), tp = mx(q => !q.prob && q.change === 'TEMPO'), pb = gs.filter(q => q.prob).sort((p, q) => (q.gust_kmh ?? 0) - (p.gust_kmh ?? 0))[0]
    const tafTxt = [pv >= 0 ? `up to ${pv}` : '', tp >= 0 ? `at times ${tp}` : '', pb ? `${pb.prob}% chance of ${pb.gust_kmh ?? pb.wind_kmh}` : ''].filter(Boolean).join(', ')
    return `<li class="p-${esc(on[0]?.level || 'none')}" data-from="${a}" data-to="${b}"><time>${hm(a)}<small>to ${b === D1 ? '24:00' : hm(b)}</small></time><div><p>${on.map(w => `<span class="wx-chip">${lvl(w.level)} ${esc(EN[w.type] || w.type)}</span>`).join(' ') || '<span class="meta">No warning above green</span>'}</p>${tafTxt ? `<p class="wx-ph-taf">Airport forecast, km/h: ${esc(tafTxt)}</p>` : ''}</div></li>`
}).join('')
const phaseHtml = `<div class="wx-phases"><ol>${phases}</ol><p class="meta">Warnings: ${warnProv}.${taf ? ` Airport forecast (strongest wind or gust in each stretch; a point forecast, not a warning): ${prov(taf.source, `TAF LPPT ${hm(taf.issue_utc)}`, taf.read_utc)}.` : ''} The full strip is below: scroll it sideways.</p></div>`
const strip = `<section class="card wx-day" id="day"><div class="wx-head"><h2>${esc(dayName)}, hour by hour</h2><p class="meta">Lisbon time (UTC in November). Warnings first; then forecasts; then what was observed; our analysis last and labelled. <span class="wx-nowtxt" id="wx-nowtxt"></span></p><!--lede--></div>
${phaseHtml}
<div class="wx-scroll" tabindex="0" role="group" aria-label="${esc(dayName)}, hour by hour: scroll sideways"><div class="wx-strip" id="wx-strip" data-d0="${D0}">
<div class="wx-row wx-hours"><div class="wx-lab"></div><div class="wx-track">${hours.map((_, h) => `<span>${String(h).padStart(2, '0')}</span>`).join('')}</div></div>
${rows.join('\n')}
</div></div>
<details class="wx-table"><summary>The same as a table, each row with its source</summary><table><thead><tr><th>Lane</th><th>What</th><th>From</th><th>To</th><th>Source, time read</th></tr></thead><tbody>${tbl.map(r => `<tr><td>${esc(r[0])}</td><td>${r[1].includes('<') ? r[1] : esc(r[1])}</td><td>${wd(r[2])} ${hm(r[2])}</td><td>${wd(r[3])} ${hm(r[3])}</td><td>${r[4]}</td></tr>`).join('')}</tbody></table>${taf?.raw ? `<p class="meta">The TAF as issued: <code>${esc(taf.raw)}</code></p>` : ''}<p class="meta">Codes: RA rain, +RA heavy rain, TSRA thunderstorm with rain, SHRA showers, BR mist; G gust; TEMPO at times; BECMG becoming.</p></details></section>`

// round 2: one chart, one axis (km/h): what is warned, what the airport forecast says, what the airport observed
const gw = gv?.forecast_ipma_red_wind_warning, gnum = String(gw?.gusts_kmh || '').match(/\d+/g)?.map(Number) || []
// round 23: the next day on the same grammar (00:00 to 18:00): what touches it, what is decided for it, the forecasts (the airport's TAF,
// IPMA's city model, and MET Norway's as a second, labelled model), and the meteorologist's view of its morning, dashed.
const thuStrip = (() => {
    const A = D1, B = D1 + 18 * 36e5, N = 18, R = [], hrs = [...Array(N)].map((_, h) => A + h * 36e5)
    const pc = t => Math.max(0, Math.min(100, (T(t) - A) / (B - A) * 100)), inW = (a, b) => T(a) < B && T(b) > A
    const br = ({ a, b, cls = '', text, title = '', style = '', href = '' }) => { const l = pc(a), r = pc(b); if (r <= l) return ''; const tag = href ? `a href="${esc(href)}"` : 'div'; return `<${tag} class="wx-bar ${cls}${T(a) < A ? ' cut-l' : ''}${T(b) > B ? ' cut-r' : ''}" style="left:${l.toFixed(3)}%;width:${(r - l).toFixed(3)}%;${style}" title="${esc(title)}"><span>${text}</span></${href ? 'a' : 'div'}>` }
    const rw = (label, sub, inner, cls = '') => R.push(`<div class="wx-row ${cls}"><div class="wx-lab"><b>${label}</b>${sub}</div><div class="wx-track">${inner}</div></div>`)
    const hd = (label, sub) => R.push(`<div class="wx-row wx-group"><div class="wx-lab"><b>${label}</b></div><div class="wx-track"><span>${sub}</span></div></div>`)
    const cl = f => hrs.map(t => { const c = f(t); return `<div class="wx-cell${c ? '' : ' empty'}"${c?.title ? ` title="${esc(c.title)}"` : ''}${c?.style ? ` style="${c.style}"` : ''}>${c ? c.text : ''}</div>` }).join('')
    // warned
    const ws = lis.filter(w => inW(w.start_utc, w.end_utc)), wt = [...new Set(ws.map(w => w.type))]
    hd('Warned', `IPMA's warnings for the Lisbon district that touch the day: facts. ${ws.length ? '' : 'None above green at the last read. '}${warnProv}`)
    for (const ty of wt) rw(esc(EN[ty] || ty), `<i lang="pt">${esc(ty)}</i>`, ws.filter(w => w.type === ty).map(w => br({ a: w.start_utc, b: w.end_utc, cls: 'w-' + esc(w.level), text: `<b>${esc(w.level)}</b> ${T(w.start_utc) < A ? 'to' : hm(w.start_utc) + ' to'} ${hm(w.end_utc)}`, title: `${w.level}: ${rng(w.start_utc, w.end_utc)}. ${w.text_pt || ''}` })).join(''))
    if (!wt.length) rw('Lisbon', '<i>no warning above green</i>', '')
    // decided: edges whose effect touches the day, and the edges named for the day with no hours
    const NEXT_DAY = { '2026-11-12': ['websummit-thursday'] }
    const ds = (dg?.edges || []).filter(e => e.status === 'happened' && e.by !== 'ipma' && ((ok(e.effect_from_utc) && T(e.effect_from_utc) < B && (!ok(e.effect_to_utc) ? false : T(e.effect_to_utc) > A + 6e4)) || (NEXT_DAY[NEXT] || []).includes(e.id)))
    if (ds.length) {
        hd('Decided', `Decisions for the day. Dotted, across the day: the source names the day but no hours. Each bar links to its source. <span class="prov"><a href="${base}data/decisions/graph.json">The decision graph</a>, updated ${hm(dg.updated)} UTC ${dm(dg.updated)}</span>`)
        for (const e of ds) {
            const stated = ok(e.effect_from_utc), who = String((dg.nodes || []).find(n => n.id === e.by)?.name || e.by).replace(/\s*\(.*$/, ''), made = /T\d\d:\d\d/.test(e.at || '') && ok(e.at) ? `${wd(e.at)} ${hm(e.at)}` : 'time not given'
            rw(esc(who), `<i>${esc(e.label)} · ${esc(made)}</i>`, br({ a: stated ? e.effect_from_utc : A, b: stated ? e.effect_to_utc : B + 1, cls: 'dec d-' + esc(e.label) + (stated ? '' : ' d-nohours'), href: /^https:/.test(e.source || '') ? e.source : '', text: `<b>${esc(e.label)}</b> <i>${stated ? `${hm(e.effect_from_utc)} to ${hm(e.effect_to_utc)}` : 'hours not stated'}</i> ${esc(e.decision)}`, title: `${e.label}: ${e.decision}${e.note ? ' Note: ' + e.note : ''} Source read ${hm(e.read)} UTC ${dm(e.read)}.` }), 'wx-dec')
        }
    }
    // the airport forecast
    const tg = (taf?.groups || []).filter(g => ok(g.from_utc) && ok(g.to_utc) && inW(g.from_utc, g.to_utc) && g.wind_kmh != null)
    if (taf) {
        const ends = ok(taf.valid_to_utc) && T(taf.valid_to_utc) < B ? taf.valid_to_utc : ''
        hd('Airport forecast', `TAF for Lisbon airport (LPPT), issued ${hm(taf.issue_utc)} UTC ${dm(taf.issue_utc)}${ends ? `; <b>it ends at ${hm(ends)}</b>: nothing is forecast here after that until a later TAF` : ''}. A point forecast for pilots. ${prov(taf.source, 'TAF LPPT', taf.read_utc)}`)
        rw('Prevailing', '<i>mean wind, gusts (G), km/h</i>', tg.filter(g => !g.prob && g.change !== 'TEMPO').map(g => br({ a: g.from_utc, b: g.to_utc, cls: 'taf', text: gtxt(g), title: gttl(g), style: heat(g) })).join('') + (ends ? br({ a: ends, b: B, cls: 'none', text: 'no TAF yet', title: `The TAF read ends at ${hm(ends)}` }) : ''), 'wx-taf')
        const tt2 = tg.filter(g => g.prob || g.change === 'TEMPO'); if (tt2.length) rw('At times', '<i>TEMPO, PROB</i>', tt2.map(g => br({ a: g.from_utc, b: g.to_utc, cls: 'taf', text: (g.prob ? `${g.prob}%: ` : '') + gtxt(g), title: gttl(g), style: heat(g) })).join(''), 'wx-taf')
    }
    // IPMA's city model
    const hr2 = (fc?.hourly?.rows || []).filter(r => ok(r.time_utc) && T(r.time_utc) >= A && T(r.time_utc) < B), at = t => hr2.find(r => T(r.time_utc) === t)
    if (hr2.length) {
        hd('City model', `IPMA's hourly model forecast for Lisbon: mean wind only, this feed has no gusts. ${prov(fc.hourly.source, 'IPMA hourly forecast', fc.hourly.read_utc)}`)
        rw('Mean wind', '<i>city model · km/h, from</i>', cl(t => { const r = at(t); return r && r.wind_mean_kmh != null ? { text: `<b>${Math.round(r.wind_mean_kmh)}</b><i>${esc(r.wind_dir || '')}</i>`, title: `${hm(r.time_utc)}: mean wind ${r.wind_mean_kmh} km/h from ${r.wind_dir}`, style: `--k:${Math.round(Math.min(1, r.wind_mean_kmh / 120) * 100)}%` } : null }), 'wx-cells')
        rw('Rain', '<i>city model · IPMA intensity class</i>', cl(t => { const r = at(t); return r && r.rain_intensity_class != null ? { text: `<b>${esc(r.rain_intensity_class)}</b>${r.rain_prob_pct != null ? `<i>${esc(r.rain_prob_pct)}%</i>` : ''}`, title: `${hm(r.time_utc)}: rain intensity class ${r.rain_intensity_class}`, style: `--k:${Math.min(100, r.rain_intensity_class * 25)}%` } : null }), 'wx-cells rain')
    }
    // a second model, labelled as such
    const mn = fc?.second_models?.met_no, mr = (mn?.rows || []).filter(r => ok(r.time_utc) && T(r.time_utc) >= A && T(r.time_utc) < B), ma = t => mr.find(r => T(r.time_utc) === t)
    if (mr.length) {
        hd('Second model', `${esc(mn.name || 'MET Norway')}: another forecaster's model for the same point, shown beside IPMA's, never instead of it. Model run ${hm(mn.updated_utc)} UTC ${dm(mn.updated_utc)}. ${esc(mn.licence || '')}. ${prov(mn.source, 'api.met.no', mn.read_utc)}`)
        rw('Mean wind', '<i>met.no · km/h, gust (G)</i>', cl(t => { const r = ma(t); return r && r.wind_mean_kmh != null ? { text: `<b>${Math.round(r.wind_mean_kmh)}</b><i>${r.gust_kmh != null ? 'G' + Math.round(r.gust_kmh) : ''}</i>`, title: `${hm(r.time_utc)}: mean wind ${r.wind_mean_kmh} km/h${r.gust_kmh != null ? ', gust ' + r.gust_kmh : ''}${r.wind_from_deg != null ? ', from ' + Math.round(r.wind_from_deg) + '°' : ''}`, style: `--k:${Math.round(Math.min(1, (r.gust_kmh ?? r.wind_mean_kmh) / 120) * 100)}%` } : null }), 'wx-cells')
        if (mr.some(r => r.rain_mm_next_1h != null)) rw('Rain', '<i>met.no · mm in the hour</i>', cl(t => { const r = ma(t); return r && r.rain_mm_next_1h != null ? { text: `<b>${r.rain_mm_next_1h}</b>`, title: `${hm(r.time_utc)}: ${r.rain_mm_next_1h} mm in the next hour`, style: `--k:${Math.round(Math.min(1, r.rain_mm_next_1h / 8) * 100)}%` } : null }), 'wx-cells rain')
    }
    // the meteorologist's view of the morning: a hypothesis, drawn as one
    const tv = (an?.updates || []).filter(u => u.thursday_morning).slice(-1)[0]
    if (tv) {
        const v = tv.thursday_morning
        hd('Our analysis', `A hypothesis by ${esc(an.by || 'the meteorologist')}, written ${hm(tv.written_utc)} UTC ${dm(tv.written_utc)}: not IPMA's words. <span class="prov"><a href="${base}data/weather/analysis.html">The reasons</a></span>`)
        rw('The morning', `<i>confidence: ${esc(v.confidence || 'not stated')}</i>`, br({ a: A, b: A + 12 * 36e5, cls: 'hyp', text: `<b>hypothesis</b> ${esc(v.view || '')}`, title: String(v.why || '') }), 'wx-hyp')
    }
    return `<section class="card wx-day" id="thursday"><div class="wx-head"><h2>${esc(nextName)}, 00:00 to 18:00</h2><p class="meta">The same lanes as the day before, for the day after: what is warned, what is decided, what is forecast, and our analysis last and labelled. Lisbon time (UTC in November). ${esc(inc.thursday || '')}</p></div>
<div class="wx-scroll" tabindex="0" role="group" aria-label="${esc(nextName)}, hour by hour to 18:00: scroll sideways"><div class="wx-strip" style="--n:${N}" data-d0="${A}" data-span="${B - A}">
<div class="wx-row wx-hours"><div class="wx-lab"></div><div class="wx-track">${hrs.map((_, h) => `<span>${String(h).padStart(2, '0')}</span>`).join('')}</div></div>
${R.join('\n')}
</div></div></section>`
})()
// rounds 26 and 27: warned against observed, on one axis: a place's rain warnings (IPMA's CAP messages, with the time each was sent) over
// the rain its stations measured hour by hour. Madeira first (the storm has been there); Lisbon as its own hours come.
const capAll = J('data/weather/cap.json')
const warnedObserved = ({ id, title, file, messages, areaName, window, noteExtra = '' }) => {
    const md = J(file); if (!md?.stations?.length) return ''
    const allH = md.stations.flatMap(s => (s.hourly || []).map(h => h.time_utc)).filter(ok).sort(), last = T(allH[allH.length - 1])
    const [A, B] = window(last), N = Math.round((B - A) / 36e5), hrs = [...Array(N)].map((_, h) => A + h * 36e5), R = []
    const ending = /ending/i.test(md.hour_label?.our_inference?.reading || ''), span = L => ending ? [L - 36e5, L] : [L, L + 36e5]   // the hour a label covers
    const pc = t => Math.max(0, Math.min(100, (T(t) - A) / (B - A) * 100))
    const br = ({ a, b, cls = '', text, title = '' }) => { const l = pc(a), r = pc(b); if (r <= l) return ''; return `<div class="wx-bar ${cls}${T(a) < A ? ' cut-l' : ''}${T(b) > B ? ' cut-r' : ''}" style="left:${l.toFixed(3)}%;width:${(r - l).toFixed(3)}%" title="${esc(title)}"><span>${text}</span></div>` }
    const rw = (label, sub, inner, cls = '') => R.push(`<div class="wx-row ${cls}"><div class="wx-lab"><b>${label}</b>${sub}</div><div class="wx-track">${inner}</div></div>`)
    const hd = (label, sub) => R.push(`<div class="wx-row wx-group"><div class="wx-lab"><b>${label}</b></div><div class="wx-track"><span>${sub}</span></div></div>`)
    // warned: the rain messages that touch the window and were not replaced by a later message
    const LV = { Amarelo: 'yellow', Laranja: 'orange', Vermelho: 'red' }
    const ms = (messages || []).filter(m => /Precipita/.test(m.event_pt || '') && ok(m.onset_utc) && ok(m.expires_utc))
    const gone = new Set(ms.flatMap(m => (m.replaces || []).map(r => r.identifier)))
    const live = ms.filter(m => !gone.has(m.identifier) && T(m.onset_utc) < B && T(m.expires_utc) > A).map(m => ({ ...m, areas: (m.areas || []).length ? m.areas : [areaName], level: LV[(m.event_pt.match(/Aviso (\w+)/) || [])[1]] || 'yellow' }))
    const short = a => String(a).replace(/^Madeira - /, '')
    const areas = [...new Set(live.flatMap(m => m.areas))].sort((p, q) => Math.max(...live.filter(m => m.areas.includes(q)).map(m => RANK[m.level])) - Math.max(...live.filter(m => m.areas.includes(p)).map(m => RANK[m.level])))
    const capProv = prov('https://www.meteoalarm.org', "IPMA's messages via MeteoAlarm", capAll?.read_utc)
    if (areas.length) {
        hd('Warned', `IPMA's rain warnings, each with the time IPMA sent it: facts. ${capProv}`)
        for (const a of areas) rw(esc(short(a)), '<i>rain · <span lang="pt">Precipitação</span></i>', live.filter(m => m.areas.includes(a)).sort((p, q) => T(p.onset_utc) - T(q.onset_utc)).map(m => br({ a: m.onset_utc, b: m.expires_utc, cls: 'w-' + m.level, text: `<b>${m.level}</b> ${hm(m.onset_utc)} to ${hm(m.expires_utc)} · sent ${wd(m.sent_utc)} ${hm(m.sent_utc)}`, title: `${m.event_pt}, ${a}: ${rng(m.onset_utc, m.expires_utc)}; sent by IPMA ${wd(m.sent_utc)} ${hm(m.sent_utc)} UTC (${m.identifier})` })).join(''))
    }
    // observed: the wettest stations, the rain of each hour as a column, drawn in the hour the label covers
    const inWin = h => { const [a, b] = span(T(h.time_utc)); return b > A && a < B }
    const top = md.stations.filter(s => (s.hourly || []).some(h => inWin(h) && h.rain_mm != null)).slice(0, 6); if (!top.length) return ''
    const vmax = Math.max(10, Math.ceil(Math.max(...top.flatMap(s => s.hourly.filter(inWin).map(h => h.rain_mm || 0))) / 10) * 10)
    const reading = ending ? `Each column is drawn in the hour <b>ending</b> at its label <span class="hyp-note">(hour ending: our reading; IPMA does not say)</span>.` : `The feed labels each hour with one time and does not say whether that is the hour's start or its end; columns are drawn at the label.`
    hd('Observed', `Rain measured in each hour at the ${top.length} wettest stations, mm (columns to scale, ${vmax} mm the full height): facts, measured, not forecast. Observations to the hour labelled ${wd(last)} ${hm(last)}. ${reading} ${prov(md.source, 'IPMA observations', md.read_utc)}`)
    for (const s of top) {
        const by = Object.fromEntries(s.hourly.map(h => [span(T(h.time_utc))[0], h])), m6 = s.max_6h_rain, tot = s.hourly.filter(inWin).reduce((n, h) => n + (h.rain_mm || 0), 0)
        rw(esc(s.name.replace(/^Madeira, /, '')), `<i>${tot.toFixed(1)} mm in these hours</i>`, hrs.map(t => { const h = by[t]; return h && h.rain_mm != null ? `<div class="wx-cell wx-rain" title="${esc(`${s.name}, hour labelled ${wd(h.time_utc)} ${hm(h.time_utc)}: ${h.rain_mm} mm${h.wind_mean_kmh != null ? `; mean wind ${h.wind_mean_kmh} km/h ${h.wind_dir || ''}` : ''}`)}"><b>${h.rain_mm >= 10 ? Math.round(h.rain_mm) : h.rain_mm}</b><i style="height:${Math.max(h.rain_mm > 0 ? 1 : 0, Math.round(h.rain_mm / vmax * 30))}px"></i></div>` : '<div class="wx-cell empty"></div>' }).join(''), 'wx-cells obs wx-rainrow')
    }
    // the comparison, in sentences, from the data alone
    const s0 = top[0], hs = s0.hourly.filter(inWin), tot0 = hs.reduce((n, h) => n + (h.rain_mm || 0), 0)
    const within = (h, lv) => { const [a, b] = span(T(h.time_utc)); return live.some(m => m.level === lv && a >= T(m.onset_utc) && b <= T(m.expires_utc)) }
    const sum = lv => hs.filter(h => within(h, lv) && !['red', 'orange', 'yellow'].slice(0, ['red', 'orange', 'yellow'].indexOf(lv)).some(u => within(h, u))).reduce((n, h) => n + (h.rain_mm || 0), 0)
    const parts = ['red', 'orange', 'yellow'].map(lv => [lv, sum(lv)]).filter(([lv]) => live.some(m => m.level === lv)), outside = tot0 - parts.reduce((n, p) => n + p[1], 0)
    const topM = live.slice().sort((p, q) => RANK[q.level] - RANK[p.level] || T(p.onset_utc) - T(q.onset_utc))[0], lead = topM ? Math.round((T(topM.onset_utc) - T(topM.sent_utc)) / 6e4) : 0, begun = topM && T(topM.onset_utc) < last
    const wet = hs.slice().sort((p, q) => (q.rain_mm || 0) - (p.rain_mm || 0))[0]
    const s1 = topM ? `IPMA sent the <b>${topM.level} rain warning</b>${topM.msg_type === 'Update' ? ' (this message updates an earlier one)' : ''} for ${esc([...new Set(live.filter(m => m.level === topM.level && m.sent_utc === topM.sent_utc).flatMap(m => m.areas))].map(short).join(' and '))} on ${wd(topM.sent_utc)} at ${hm(topM.sent_utc)}, <b>${Math.floor(lead / 60)} h ${lead % 60} min before</b> it began (${rng(topM.onset_utc, topM.expires_utc)})${begun ? '' : '; <b>its hours have not come yet</b>'}. ` : ''
    const s2 = `${esc(s0.name.replace(/^Madeira, /, ''))}, the wettest station, has measured <b>${tot0.toFixed(1)} mm</b> in these hours, ${esc(wet.rain_mm)} mm in its wettest${s0.max_6h_rain?.mm != null ? `; its largest six hours in the feed: <b>${esc(s0.max_6h_rain.mm)} mm</b> (labels ${wd(s0.max_6h_rain.hours_labelled[0])} ${hm(s0.max_6h_rain.hours_labelled[0])} to ${hm(s0.max_6h_rain.hours_labelled[1])})` : ''}. `
    const s3 = parts.length ? `Of that ${tot0.toFixed(1)} mm: ${parts.map(([lv, v]) => `<b>${v.toFixed(1)} mm</b> inside ${lv === 'orange' ? 'an' : 'a'} ${lv} window`).join(', ')}, ${outside.toFixed(1)} mm outside any window <b>in the messages we hold</b>${ending ? ' <span class="hyp-note">(reading each label as the hour ending at it: our reading; IPMA does not say)</span>' : ''}.` : ''
    return `<section class="card wx-day wx-madeira" id="${id}"><div class="wx-head"><h2>${esc(title)}</h2><p class="wx-lede">${s1}${s2}${s3}</p><p class="meta">${wd(A)} ${hm(A)} to ${wd(B)} ${hm(B)} UTC. Warnings above, measurements below, on the same hours. The stations are not tied to warning areas in the data, so no station is placed in an area here; and this card states no threshold for a warning level, because IPMA's messages as we hold them carry none. ${noteExtra}</p>${md.earlier_warnings?.answer ? `<p class="wx-searched"><span class="lbl l-evidence">evidence</span> <b>What we searched for an earlier warning.</b> ${esc(md.earlier_warnings.question || '')} ${esc(md.earlier_warnings.answer)} Searched: ${(md.earlier_warnings.items || []).map(i => `${/^https:/.test(i.source || '') ? `<a href="${esc(i.source)}">${esc(String(i.what || '').split(/ \(|: |, | read \d/)[0].trim())}</a>` : esc(String(i.what || '').split(/ \(|: |, | read \d/)[0].trim())} <span class="prov">(${esc(i.kind || '')}${ok(i.read_utc) ? `, read ${hm(i.read_utc)} UTC ${dm(i.read_utc)}` : ''})</span>`).join('; ')}.</p>` : ''}</div>
<div class="wx-scroll" tabindex="0" role="group" aria-label="${esc(title)}, hour by hour: scroll sideways"><div class="wx-strip" style="--n:${N};min-width:${Math.max(980, N * 34 + 150)}px" data-d0="${A}" data-span="${B - A}">
<div class="wx-row wx-hours"><div class="wx-lab"></div><div class="wx-track">${hrs.map(t => `<span${new Date(t).getUTCHours() === 0 ? ' class="d"' : ''}>${new Date(t).getUTCHours() === 0 ? wd(t) + ' ' : ''}${hm(t).slice(0, 2)}</span>`).join('')}</div></div>
${R.join('\n')}
</div></div>
<p class="meta wx-mfoot">All ${md.stations.length} stations, hourly: <a href="${base}${file}">${esc(file.split('/').pop())}</a>. The messages: <a href="${base}data/weather/cap.json">cap.json</a>. Next read ${ok(md.next_read_utc) ? hm(md.next_read_utc) + ' UTC' : 'not stated'}.</p></section>`
}
const day12 = last => { const B = Math.ceil((last + 1) / (12 * 36e5)) * 12 * 36e5; return [B - 864e5, B] }
const madeira = warnedObserved({ id: 'madeira', title: 'Madeira: what was warned, and what fell', file: 'data/weather/madeira.json', messages: (capAll?.other_messages || []).filter(m => (m.areas || []).some(a => /^Madeira/.test(a))), areaName: 'Madeira', window: day12, noteExtra: `Madeira is on UTC in November. ${esc(capAll?.other_messages_about || '')} So rain shown outside any window may have fallen under an earlier warning we never saw.` })
const lisbonRain = warnedObserved({ id: 'lisbon-rain', title: 'Lisbon: what is warned, and what has fallen', file: 'data/weather/lisbon-rain.json', messages: capAll?.lisbon_messages || [], areaName: 'Lisboa district', window: () => [D0 - 864e5, D1], noteExtra: 'Two days, so Tuesday\'s rain under Tuesday\'s warnings can be read before Wednesday\'s arrives. A message that left the feed before we first read it is not here.' })
const chart = (() => {
    const W = 960, H = 290, ml = 40, mr = 14, mt = 14, mb = 30, X0 = D0 - 12 * 36e5, X1 = D1 + 6 * 36e5, YM = 150
    const x = t => ml + (Math.max(X0, Math.min(X1, T(t))) - X0) / (X1 - X0) * (W - ml - mr), y = v => mt + (1 - v / YM) * (H - mt - mb), f = n => n.toFixed(1)
    const g = []
    for (let v = 0; v <= YM; v += 30) g.push(`<line class="grid" x1="${ml}" x2="${W - mr}" y1="${f(y(v))}" y2="${f(y(v))}"/><text class="ax" x="${ml - 6}" y="${f(y(v) + 4)}" text-anchor="end">${v}</text>`)
    for (let t = X0; t <= X1; t += 3 * 36e5) { const mid = new Date(t).getUTCHours() === 0; g.push(`<line class="${mid ? 'grid day' : 'tick'}" x1="${f(x(t))}" x2="${f(x(t))}" y1="${mid ? mt : H - mb}" y2="${H - mb + 4}"/><text class="ax${mid ? ' b' : ''}" x="${f(x(t))}" y="${H - mb + 16}" text-anchor="middle">${mid ? wd(t) + ' ' + dm(t) : hm(t).slice(0, 2)}</text>`) }
    if (gw && gnum.length && ok(gw.start_utc)) {
        const lo = gnum[0], hi = gnum[1] || gnum[0], xa = x(gw.start_utc), xb = x(gw.end_utc)
        g.push(`<a href="${esc(gw.source)}"><rect class="warned" x="${f(xa)}" y="${f(y(hi))}" width="${f(xb - xa)}" height="${f(y(lo) - y(hi))}"><title>IPMA red wind warning, ${rng(gw.start_utc, gw.end_utc)}: ${esc(gw.text_pt)} (read ${hm(gw.read_utc)} UTC)</title></rect><line class="warned-l" x1="${f(xa)}" x2="${f(xb)}" y1="${f(y(lo))}" y2="${f(y(lo))}"/></a><text class="lab red" x="${f(xa + 6)}" y="${f(y(hi) - 5)}">IPMA red warning: gusts to ${lo}${hi > lo ? `, up to ${hi} in the most exposed places` : ''}</text>`)
    }
    for (const q of (taf?.groups || []).filter(q => ok(q.from_utc) && ok(q.to_utc) && T(q.to_utc) > X0 && T(q.from_utc) < X1 && q.wind_kmh != null)) {
        const kind = q.prob ? 'prob' : q.change === 'TEMPO' ? 'tempo' : 'prev', a = x(q.becoming_by_utc || q.from_utc), b = x(q.to_utc), top = q.gust_kmh ?? q.wind_kmh
        const name = q.prob ? `${q.prob}% chance` : kind === 'tempo' ? 'at times' : 'prevailing'
        g.push(`<g class="taf ${kind}"><title>${esc(gttl(q))}</title><line class="hit" x1="${f(a)}" x2="${f(b)}" y1="${f(y(top))}" y2="${f(y(top))}"/><line x1="${f(a)}" x2="${f(b)}" y1="${f(y(top))}" y2="${f(y(top))}"/>${q.gust_kmh != null ? `<line class="mean" x1="${f(a)}" x2="${f(b)}" y1="${f(y(q.wind_kmh))}" y2="${f(y(q.wind_kmh))}"/>` : ''}</g>${b - a > 90 ? `<text class="lab" x="${f(a + 4)}" y="${f(y(top) - 5)}">${name}: ${q.gust_kmh != null ? 'G' : ''}${top}</text>` : ''}`)
    }
    const ms = (ap?.metars || []).filter(m => ok(m.time_utc) && T(m.time_utc) >= X0 && T(m.time_utc) <= X1 && m.wind_kmh != null).sort((a, b) => T(a.time_utc) - T(b.time_utc))
    if (ms.length) {
        g.push(`<polyline class="obs" points="${ms.map(m => f(x(m.time_utc)) + ',' + f(y(m.wind_kmh))).join(' ')}"/>`)
        for (const m of ms) g.push(m.gust_kmh != null ? `<circle class="obs-g" cx="${f(x(m.time_utc))}" cy="${f(y(m.gust_kmh))}" r="4"><title>${wd(m.time_utc)} ${hm(m.time_utc)}: gust ${m.gust_kmh} km/h (mean ${m.wind_kmh}). ${esc(m.raw)}</title></circle>` : `<circle class="obs-hit" cx="${f(x(m.time_utc))}" cy="${f(y(m.wind_kmh))}" r="7"><title>${wd(m.time_utc)} ${hm(m.time_utc)}: mean ${m.wind_kmh} km/h, no gust reported. ${esc(m.raw)}</title></circle>`)
        const l = ms[ms.length - 1]; g.push(`<circle class="obs-last" cx="${f(x(l.time_utc))}" cy="${f(y(l.wind_kmh))}" r="3.5"/><text class="lab blue" text-anchor="end" x="${f(x(l.time_utc) - 4)}" y="${f(y(l.wind_kmh) - 12)}">observed ${hm(l.time_utc)}: ${l.wind_kmh}</text>`)
    }
    g.push(`<line class="gnow" id="wx-gnow" data-x0="${X0}" data-x1="${X1}" data-l="${ml}" data-r="${W - mr}" y1="${mt}" y2="${H - mb}" x1="-9" x2="-9"/>`)
    return `<section class="card wx-day wx-gust" id="wind"><div class="wx-head"><h2>Wind: warned, forecast, observed</h2><p class="meta">One axis, km/h; Lisbon time. Three different measures, shown together and never as one: IPMA's warning is for the district's gusts, most of all in exposed places; the TAF and the observations are for one point, the airport.</p></div>
<div class="wx-scroll" tabindex="0" role="group" aria-label="Wind in km/h: scroll sideways"><svg class="wx-chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Wind in km/h from ${wd(X0)} ${hm(X0)} to ${wd(X1)} ${hm(X1)}: the gusts IPMA warns of, the airport forecast and the airport's observations">${g.join('')}</svg></div>
<ul class="wx-legend"><li><i class="k warned"></i>Warned gusts ${prov(gw?.source, 'IPMA warning', gw?.read_utc)}</li><li><i class="k prev"></i>Airport forecast, prevailing gust <i class="k tempo"></i>at times <i class="k prob"></i>with a stated chance; thin line: mean wind ${prov(taf?.source, `TAF LPPT ${hm(taf?.issue_utc)}`, taf?.read_utc)}</li><li><i class="k obs"></i>Observed mean wind <i class="k obsg"></i>observed gust ${prov(ms[0]?.source, 'METAR LPPT', ap?.read_utc)}</li></ul>
<details class="wx-table"><summary>The observations as a table (${ms.length} reports, newest first)</summary><table><thead><tr><th>Time (UTC)</th><th>Mean, km/h</th><th>Gust, km/h</th><th>From</th><th>Report as issued</th><th>Read</th></tr></thead><tbody>${ms.slice().reverse().map(m => `<tr><td>${wd(m.time_utc)} ${hm(m.time_utc)}</td><td>${esc(m.wind_kmh)}</td><td>${m.gust_kmh != null ? esc(m.gust_kmh) : ''}</td><td>${m.wind_dir != null ? esc(m.wind_dir) + '°' : ''}</td><td><code>${esc(m.raw)}</code></td><td>${hm(m.read_utc)}</td></tr>`).join('')}</tbody></table><p class="meta">Source: ${prov(ms[0]?.source, 'NOAA AWC, METAR LPPT (IPMA issues it)', ap?.read_utc)}. The file: <a href="${base}data/weather/airport.json">airport.json</a>.</p></details></section>`
})()

// round 2: where. Every district with a red or orange warning on the day, on the same 24 hours
// IPMA's idAreaAviso codes. Names: IPMA's own list, https://api.ipma.pt/open-data/distrits-islands.json (checked by incident.conductor@,
// 10 Nov 23:44: the 18 mainland codes, MCS (Funchal) and MPS match). MCN and MRM are not in that list: our names for Madeira's north coast
// and mountain regions. ACE, AOC, AOR: the Azores' central, western and eastern groups, in case they appear.
const AREA = { ACE: 'Azores, central group', AOC: 'Azores, western group', AOR: 'Azores, eastern group', AVR: 'Aveiro', BJA: 'Beja', BRG: 'Braga', BGC: 'Bragança', CBO: 'Castelo Branco', CBR: 'Coimbra', EVR: 'Évora', FAR: 'Faro', GDA: 'Guarda', LRA: 'Leiria', LSB: 'Lisboa', PTG: 'Portalegre', PTO: 'Porto', STM: 'Santarém', STB: 'Setúbal', VCT: 'Viana do Castelo', VRL: 'Vila Real', VIS: 'Viseu', MCN: 'Madeira, north coast', MCS: 'Madeira, south coast', MRM: 'Madeira, mountains', MPS: 'Porto Santo' }
const LANE = { 'Vento': 0, 'Precipitação': 1, 'Agitação Marítima': 2 }
const els = warn?.red_and_orange_elsewhere, byArea = {}
for (const w of [...(els?.items || []), ...lis.filter(w => RANK[w.level] >= 2).map(w => ({ ...w, area: 'LSB' }))]) if (RANK[w.level] && ok(w.start_utc) && ok(w.end_utc) && inDay(w.start_utc, w.end_utc)) (byArea[w.area] ??= []).push(w)
const redHours = ws => ws.filter(w => w.level === 'red').reduce((n, w) => n + (Math.min(T(w.end_utc), D1) - Math.max(T(w.start_utc), D0)) / 36e5, 0)
const areaList = Object.entries(byArea).sort((a, b) => redHours(b[1]) - redHours(a[1]) || (AREA[a[0]] || a[0]).localeCompare(AREA[b[0]] || b[0]))
const redIn = ty => areaList.filter(([, ws]) => ws.some(w => w.type === ty && w.level === 'red')).map(([a]) => AREA[a] || a)
// A labelled grid, not a map: [column, row] for each mainland district, roughly north at the top and the coast at the left. No outline,
// no borders, no distances (the conductor, 10 Nov 23:51: nothing that implies geography we cannot source). Islands in their own rows.
const CELL = { VCT: [1, 1], BRG: [2, 1], VRL: [3, 1], BGC: [4, 1], PTO: [1, 2], VIS: [3, 2], GDA: [4, 2], AVR: [1, 3], CBR: [2, 3], CBO: [4, 3], LRA: [1, 4], STM: [2, 4], PTG: [4, 4], LSB: [1, 5], EVR: [3, 5], STB: [1, 6], BJA: [3, 6], FAR: [2, 7] }
const ISLES = [['Madeira', ['MCN', 'MRM', 'MCS', 'MPS']], ['Azores', ['AOC', 'ACE', 'AOR']]]
const cell = (a, pos) => {
    const ws = byArea[a] || [], pk = ty => ws.filter(w => w.type === ty).sort((p, q) => RANK[q.level] - RANK[p.level])[0], top = ws.slice().sort((p, q) => RANK[q.level] - RANK[p.level])[0]
    const lines = Object.keys(LANE).map(ty => { const p = pk(ty); return p ? `<span>${lvl(p.level)} ${esc((EN[ty] || ty).replace(' state', ''))} <i>${day(p.start_utc) === DAY && day(p.end_utc) === DAY ? `${hm(p.start_utc)} to ${hm(p.end_utc)}` : rng(p.start_utc, p.end_utc)}</i></span>` : '' }).join('')
    return `<div class="wx-cellmap c-${esc(top?.level || 'none')}${a === 'LSB' ? ' here' : ''}"${pos ? ` style="grid-column:${pos[0]};grid-row:${pos[1]}"` : ''}><b>${esc(AREA[a] || a)} <code>${esc(a)}</code></b>${lines || '<span class="none">no red or orange</span>'}</div>`
}
const grid = areaList.length ? `<div class="wx-gridwrap"><div class="wx-grid" role="group" aria-label="The mainland's districts as a labelled grid: the highest warning of each type on the day">${Object.entries(CELL).map(([a, p]) => cell(a, p)).join('')}</div>
<div class="wx-isles">${ISLES.filter(([, as]) => as.some(a => byArea[a])).map(([n, as]) => `<div><h3>${n}</h3><div class="wx-islerow">${as.filter(a => byArea[a] || n === 'Madeira').map(a => cell(a)).join('')}</div></div>`).join('')}<p class="meta">A labelled grid, not a map: roughly north at the top and the coast at the left; no borders, no distances. Each cell: the highest red or orange warning of each type on the day and its hours (yellow is not in this feed). ${prov(els?.source, 'IPMA warnings', els?.read_utc)}</p></div></div>` : ''
const where = areaList.length ? `<section class="card wx-day wx-where" id="where"><div class="wx-head"><h2>Where: ${esc(dayName)}, district by district</h2><p class="meta">${Object.keys(LANE).map(ty => { const r = redIn(ty); return r.length ? `<b>Red ${esc((EN[ty] || ty).toLowerCase())}</b> in ${r.length}: ${esc(r.join(', '))}.` : '' }).filter(Boolean).join(' ')} Every district IPMA has under red or orange on the day (yellow is not shown here); most red hours first. In each row, top to bottom: wind, rain, sea. ${prov(els?.source, 'IPMA warnings', els?.read_utc)}. Names from <a href="https://api.ipma.pt/open-data/distrits-islands.json">IPMA's list of districts and islands</a>, IPMA's area code beside each; MCN and MRM are not in that list and are named by us.</p></div>
${grid}
<details class="wx-more"><summary>Show hour by hour, district by district (${areaList.length} rows)</summary><div class="wx-scroll" tabindex="0" role="group" aria-label="Warnings by district: scroll sideways"><div class="wx-strip" data-d0="${D0}">
<div class="wx-row wx-hours"><div class="wx-lab"></div><div class="wx-track">${hours.map((_, h) => `<span>${String(h).padStart(2, '0')}</span>`).join('')}</div></div>
${areaList.map(([a, ws]) => {
    const peak = ty => ws.filter(w => w.type === ty).sort((p, q) => RANK[q.level] - RANK[p.level])[0]
    const sub = Object.keys(LANE).map(ty => { const p = peak(ty); return p ? `${(EN[ty] || ty).toLowerCase().replace(' state', '')} ${p.level}` : '' }).filter(Boolean).join(' · ')
    return `<div class="wx-row wx-drow${a === 'LSB' ? ' here' : ''}"><div class="wx-lab"><b>${esc(AREA[a] || a)} <code>${esc(a)}</code></b><i>${esc(sub)}</i></div><div class="wx-track">${ws.map(w => { const l = pct(w.start_utc), r = pct(w.end_utc); return r > l ? `<i class="wx-d w-${esc(w.level)}" style="left:${l.toFixed(3)}%;width:${(r - l).toFixed(3)}%;top:${4 + (LANE[w.type] ?? 3) * 9}px" title="${esc(`${AREA[a] || a}: ${EN[w.type] || w.type}, ${w.level}, ${rng(w.start_utc, w.end_utc)}. ${w.text_pt || ''}`)}"></i>` : '' }).join('')}</div></div>`
}).join('\n')}
</div></div></details></section>` : ''

// our English for IPMA's exact sentences (shown only when the sentence matches exactly; IPMA's Portuguese stays the quote)
const GLOSS = {
    'Rajadas até 120 km/h, podendo atingir 140 km/h nos locais mais expostos.': 'Gusts up to 120 km/h, possibly reaching 140 km/h in the most exposed places.',
    'Precipitação forte e persistente.': 'Heavy and persistent rain.',
    'Precipitação por vezes forte e persistente.': 'Rain at times heavy and persistent.',
    'Ondas de sudoeste com 5 a 7 metros e que poderão atingir até 13 metros de altura máxima.': 'South-westerly waves of 5 to 7 metres, which may reach a maximum height of 13 metres.',
    'Ondas de sudoeste com 4 a 5 metros.': 'South-westerly waves of 4 to 5 metres.',
    'Ondas do quadrante oeste com 4 a 5 metros.': 'Waves from the west, 4 to 5 metres.'
}
// what the last hour of reads changed (the meteorologist's refresh log, as the tool wrote it)
const runs = (chg?.runs || []).filter(r => ok(r.read_utc)), lastRun = runs[runs.length - 1]
const recent = lastRun ? runs.filter(r => T(r.read_utc) > T(lastRun.read_utc) - 36e5) : []
const changed = lastRun ? `<details class="wx-changes" id="wx-changes" open><summary>Changed in the last hour of reads (${recent.reduce((n, r) => n + (r.changes || []).length, 0)}; last read ${hm(lastRun.read_utc)} UTC)</summary>${(() => { const rk = c => /warnings? changed/i.test(c) ? 3 : /new .*TAF|communiqu/i.test(c) ? 2 : /^THURSDAY/.test(c) ? 0 : 1, all = recent.slice().reverse().flatMap(r => (r.changes || []).map(c => ({ c, r }))).filter(x => !/^no change$/i.test(x.c)).sort((p, q) => rk(q.c) - rk(p.c)), li = x => `<li><time datetime="${esc(x.r.read_utc)}">${hm(x.r.read_utc)}</time> ${esc(x.c)}</li>`; return `<ul>${all.slice(0, 4).map(li).join('') || '<li>Nothing changed.</li>'}</ul>${all.length > 4 ? `<details class="more"><summary>${all.length - 4} more</summary><ul>${all.slice(4).map(li).join('')}</ul></details>` : ''}` })()}<p class="prov">The weather desk's refresh log, as its tool wrote it: <a href="${base}data/weather/changes.json">changes.json</a>, last read ${hm(lastRun.read_utc)} UTC ${dm(lastRun.read_utc)}${(lastRun.errors || []).length ? `; ${lastRun.errors.length} source(s) failed in that read` : ''}</p></details>` : ''
// the tiles: what is warned (the highest level of each type on the day), and the latest observation
const tiles = types.map(ty => {
    const ws = lis.filter(w => w.type === ty && inDay(w.start_utc, w.end_utc)), w = ws.slice().sort((a, b) => RANK[b.level] - RANK[a.level])[0], rest = ws.filter(x => x !== w)
    return { rank: RANK[w.level], end: T(w.end_utc), html: `<article class="wx-tile t-${esc(w.level)}"><p class="wx-th">${lvl(w.level)} <b>${esc(EN[ty] || ty)}</b> <span class="wx-state" data-from="${T(w.start_utc)}" data-to="${T(w.end_utc)}"></span></p><p class="wx-big">${rng(w.start_utc, w.end_utc)}</p><p class="wx-pt" lang="pt">${esc(w.text_pt || '')}</p>${GLOSS[w.text_pt] ? `<p class="wx-en">${esc(GLOSS[w.text_pt])} <span class="prov">(our English)</span></p>` : ''}${rest.length ? `<p class="wx-also">Also: ${rest.map(x => `${lvl(x.level)} ${rng(x.start_utc, x.end_utc)}`).join(' · ')}</p>` : ''}<p class="wx-times">${ok(w.sent_utc) ? `<span>This window sent by IPMA <b>${wd(w.sent_utc)} ${hm(w.sent_utc)}</b> via <a href="https://www.meteoalarm.org">MeteoAlarm</a></span>` : ''}<span>Valid to <b>${wd(w.end_utc)} ${hm(w.end_utc)}</b></span>${ok(warn.next_read_utc) ? `<span>Next read <b>${hm(warn.next_read_utc)}</b></span>` : ''}</p><p class="wx-src">${prov(w.source || warn.source, 'IPMA', w.read_utc || warn.read_utc)}</p></article>` }
}).sort((a, b) => b.rank - a.rank || b.end - a.end).map(x => x.html)
const o = gv?.observed_airport_latest, mg = gv?.observed_airport_max_gust
if (o) tiles.push(`<article class="wx-tile t-obs"><p class="wx-th"><span class="lvl obs">observed</span> <b>Lisbon airport</b></p><p class="wx-big">${esc(o.wind_kmh)} km/h <small>mean wind from ${esc(o.wind_dir)}°, ${o.gust_kmh != null ? `gusting ${esc(o.gust_kmh)} km/h` : 'no gust reported'}</small></p><p class="wx-pt">At ${hm(o.time_utc)} UTC ${dm(o.time_utc)}${o.weather ? `, ${esc(o.weather)}` : ''}${o.pressure_hpa ? `, ${esc(o.pressure_hpa)} hPa` : ''}.${mg ? ` Strongest gust so far: ${esc(mg.kmh)} km/h, ${wd(mg.time_utc)} ${hm(mg.time_utc)}.` : ''}</p><p class="wx-also">The airport's gusts and the warning's gusts are not the same measure.</p><p class="wx-src">${prov(o.source, 'METAR LPPT', o.read_utc)}</p></article>`)

// round 8: three sourced facts in one sentence above the strip (all from the data: the red warnings, the last observation, the decisions in force)
const reds = dayW.filter(w => RANK[w.level] === RANK[top?.level]).sort((p, q) => T(p.start_utc) - T(q.start_utc))
const lastDec = dEdges.filter(d => /T\d\d:\d\d/.test(d.e.at || '')).sort((p, q) => T(q.e.at) - T(p.e.at))[0]
const lede = `<p class="wx-lede">${reds.length ? `IPMA warns <b>${reds.map(w => `${esc(w.level)} ${esc((EN[w.type] || w.type).toLowerCase())} ${hm(w.start_utc)} to ${hm(w.end_utc)}`).join('</b> and <b>')}</b> for the Lisbon district ${prov(warn.source, 'IPMA', warn.read_utc)}. ` : ''}${o ? `The airport last reported <b>${esc(o.wind_kmh)} km/h</b> mean wind, ${o.gust_kmh != null ? `gusting <b>${esc(o.gust_kmh)}</b>` : 'no gust'}, at ${hm(o.time_utc)} ${prov(o.source, 'METAR LPPT', o.read_utc)}. ` : ''}${dEdges.length ? `<b>${dEdges.length} decisions</b> are drawn in force on the day${lastDec ? `, the latest by ${esc(String(lastDec.node?.name || lastDec.e.by).replace(/\s*\(.*$/, ''))}, ${wd(lastDec.e.at)} ${hm(lastDec.e.at)} ${prov(lastDec.e.source, 'source', lastDec.e.read)}` : ''}.` : ''}</p>`
// what we measured about the coverage (incident.weatherwatch@'s gap.json), and links (never images) to radar and satellite
const gap = (() => { try { return JSON.parse(fs.readFileSync(path.join(ROOT, 'research/weather-sites/gap.json'), 'utf8')) } catch { return null } })()
const gs = gap?.summary, gapHtml = gs && gs.press_pages_counted ? `<section class="card"><h2>What we measured</h2><p class="meta">One read of each page, ${esc(String(gap.about || '').match(/on (\d+ \w+ \d{4}) \(([^)]+)\)/)?.slice(1).join(', ') || dm(gap.updated))}: of <b>${esc(gs.press_pages_counted)}</b> press pages on Storm Charles, <b>${esc(gs.press_pages_with_no_link_to_ipma_or_anepc)}</b> had no link to ipma.pt or prociv.gov.pt; of <b>${esc(gs.assessed)}</b> pages assessed, <b>${esc(gs.by_column?.decisions?.yes ?? '?')}</b> showed the decisions as a list or table. A page may have changed since; it is a count, not a judgement of anyone's journalism. <a href="research/weather-sites/gap.json">gap.json</a> · <a href="research/weather-sites/index.html">the survey</a></p></section>` : ''
const sky = `<section class="card"><h2>Radar and satellite</h2><p class="meta">Links only: we embed no radar or satellite image (their licences; <a href="research/weather-sites/imagery.json">what we read</a>). <a href="https://www.ipma.pt/pt/otempo/obs.radar/">Radar: IPMA</a> · <a href="https://view.eumetsat.int/">Satellite: EUMETView</a></p></section>`
const spoken = (an?.updates || []).flatMap(u => u.press_quoting_ipma || []).filter(q => q && Array.isArray(q.quotes_pt) && q.quotes_pt.length && ok(q.read_utc))
const voice = spoken.map(q => `<details class="voice"><summary><span class="lbl l-voice">said on air</span> <b>${esc(q.who || '')}</b>, ${esc(q.outlet || '')}${ok(q.entry_utc) ? `, ${wd(q.entry_utc)} ${hm(q.entry_utc)}` : ''}. Spoken, as reported by the outlet: <b>not in IPMA's written record</b> (its warnings and communiqués).</summary>${q.quotes_pt.map(t => `<blockquote lang="pt">${esc(t)}</blockquote>`).join('')}<p class="prov">${q.url ? `<a href="${esc(q.url)}">${esc(q.outlet || 'source')}</a>` : esc(q.outlet || '')}, read ${hm(q.read_utc)} UTC ${dm(q.read_utc)}${q.note ? `. Our reading: ${esc(q.note)}` : ''}</p></details>`).join('')
const feed = (sig?.items || []).slice().sort((a, b) => T(b.at) - T(a.at)).slice(0, 14).map(s => {
    const src = (s.sources || []).find(x => x.url && /^https:/.test(x.url)), via = (s.sources || []).map(x => x.label).filter(Boolean).join('; ')
    return `<li><a class="when" href="${base}timeline.html${s.id ? '#' + esc(s.id) : ''}" title="This signal in the timeline"><time datetime="${esc(s.at)}">${esc(hm(s.at))}<small>${esc(dm(s.at))}</small></time></a><div><span class="lbl ${esc(s.kind)} l-${esc(s.label || '')}">${esc(s.label || s.kind)}</span>${s.decision || s.key ? '<strong>' : ''}${esc(s.text)}${s.decision || s.key ? '</strong>' : ''}<span class="via">${(() => { const ev = src && (s.evidence || []).find(e => e.url === src.url && e.page); return src ? `<a href="${esc(src.url)}">${esc(src.label)}</a>` : esc(via) })()}</span></div></li>`
}).join('')
const th = chg?.thursday || {}, thu = th.lisbon_warnings_touching_thursday?.items || [], tm = th.ipma_model_thursday_morning, td = th.ipma_daily_thursday, tt = th.taf_groups_into_thursday
const thuRows = [
    ...thu.map(w => `<li><span>${lvl(w.level)} ${esc(EN[w.type] || w.type)} <span class="meta">${rng(w.start_utc, w.end_utc)}</span></span>${prov(w.source, 'IPMA', w.read_utc)}</li>`),
    !thu.length ? `<li><span>No Lisbon warning touches the day</span>${prov(th.lisbon_warnings_touching_thursday?.source, 'IPMA', th.lisbon_warnings_touching_thursday?.read_utc)}</li>` : '',
    tm ? `<li><span>Morning, city model: mean wind <b>${esc((tm.wind_mean_kmh_range || []).join(' to '))} km/h</b> from ${esc((tm.wind_dirs || []).join(', '))}; rain probability up to <b>${esc(tm.rain_prob_pct_max)}%</b>; sea ${esc((tm.sea_total_m_range || []).join(' to '))} m</span>${prov(tm.source, 'IPMA hourly', tm.read_utc)}</li>` : '',
    td ? `<li><span>Day forecast: <b>${esc(td.tMin)} to ${esc(td.tMax)} °C</b>, rain probability ${esc(Math.round(td.precipitaProb))}%, wind from ${esc(td.predWindDir)}</span>${prov(td.source, 'IPMA daily', td.read_utc)}</li>` : '',
    ...(tt?.groups || []).map(g => `<li><span>Airport, ${rng(g.from_utc, g.to_utc)}: <b>${gtxt(g)}</b></span>${prov(tt.source, `TAF LPPT ${hm(tt.taf_issue_utc)}`, tt.read_utc)}</li>`)
].join('')
const front = `<section class="banner"><div class="wrap hero"><div class="hero-h"><p class="kicker">${esc(inc.kicker || 'Storm Charles · Lisbon')}</p><h1>${esc(inc.headline.text)}</h1>
<p class="src"><span class="lbl official">decision · ${esc(inc.headline.label || 'fact')}</span> Source: <a href="${esc(inc.headline.url)}">${esc(inc.headline.source)}</a>, ${esc(inc.headline.at)}.</p><p class="stand">${esc(inc.standfirst || '')}</p>${voice}</div>
<div class="hero-w"><section class="wx-tiles" aria-label="What is warned, when, where: IPMA, Lisbon district">${tiles.join('') || '<p class="meta">No warning above green read for the Lisbon district.</p>'}</section>
${lis.some(w => ok(w.sent_utc)) ? `<p class="wx-cap">The times IPMA sent each warning are read from IPMA's messages on <a href="https://www.meteoalarm.org">MeteoAlarm</a> (EUMETNET). Time delays between this website and the www.meteoalarm.org website are possible. For the most up-to-date awareness information as published by the participating National Meteorological and Hydrological Services, please refer to <a href="https://www.meteoalarm.org">www.meteoalarm.org</a>. Our copy is a dated record, read about every 5 to 30 minutes (last read ${hm(warn.read_utc)} UTC ${dm(warn.read_utc)}), not a live feed.</p>` : ''}</div></div></section>
<div class="wrap">
<nav class="ds-jump wx-jump" aria-label="On this page">${[['#wx-changes', 'Changed'], ['#day', 'The day, hour by hour'], ['#lisbon-rain', 'Lisbon: warned and fallen'], ['#wind', 'Wind'], ['#madeira', 'Madeira'], ['#thursday', esc(nextName.split(' ')[0])], ['#signals', 'Signals'], ['#where', 'Where']].map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}</nav>
${changed}
${strip.replace('<!--lede-->', lede)}
${lisbonRain}
${chart}
${madeira}
${thuStrip}
<div class="grid">
<section class="card" id="signals"><h2>Latest signals</h2><ul class="feed">${feed || '<li class="meta">No signals yet.</li>'}</ul><p class="meta"><a href="${base}timeline.html">The whole timeline</a> · <a href="${base}decisions.html">Decisions</a></p></section>
<aside>
<section class="card"><h2>${esc(nextName)}</h2><ul class="kv src">${thuRows}</ul><p class="meta">${esc(inc.thursday || '')}</p></section>
${sky}
${gapHtml}
<section class="card"><h2>For agents and analysts</h2><p class="meta">Every file behind this page, with its sha256: <a href="api/v1/index.json">api/v1/index.json</a>. How to use it: <a href="llms.txt">llms.txt</a>. Refreshed at least hourly while the storm runs.</p></section>
</aside></div>
${where}
<p class="meta wx-foot"><a href="${base}index.html">The live dashboard</a> (the decision graph, the weather, the timeline) · <a href="${base}data/weather/analysis.html">The meteorologist's analysis</a> (labelled as analysis)</p></div>
<script src="app/design/front.js?v=${encodeURIComponent(VERSION)}" defer></script>`
// THE SWAP (incident.designer@, design/round-32.md; RESTRUCTURE.md): the technical front page is the data room's (data-room/index.html);
// `/` is the Weather face (incident.weather@'s weather/index.md, the same mount, its addresses re-based to the root).
const reroot = h => h.replace(/\b(href|src)="(?!https?:|#|\/|mailto:|data:|\.\.\/)([^"]*)"/g, '$1="../$2"')
write('data-room/index.html', page({ rel: 'data-room/index.html', title: 'The data room: what is decided, what is warned, what is known', body: reroot(front), twin: 'index.md' }))
write('data-room/index.md', (`# Storm Charles, Lisbon, November 2026\n\n**${inc.headline.text}** Source: [${inc.headline.source}](${inc.headline.url}), ${inc.headline.at}.\n\n${inc.standfirst || ''}\n\nNot a warning service: follow IPMA, ANEPC and your local authorities.\n\n- [The live dashboard](${base}README.md)\n- [The timeline](${base}timeline.md)\n- [The decisions](${base}decisions.md)\n- [The data, for agents](api/v1/index.json) and [llms.txt](llms.txt)\n`).replace(/\]\((?!https?:|#|\/|mailto:)/g, '](../'))
pages.push({ rel: 'data-room/index.html', md: 'data-room/index.md', title: 'The data room' })
{
    const wf = path.join(ROOT, 'weather/index.md')
    if (fs.existsSync(wf)) {
        const [fm, md] = frontMatter(fs.readFileSync(wf, 'utf8'))
        const toRoot = h => h.replace(/\b(href|src)="\.\.\//g, '$1="').replace(/\b(href|src)="(?!https?:|#|\/|mailto:|data:|app\/|incidents\/|data\/|research\/|agents\/|api\/|design\/|library\/|studio\/|data-room\/|sources\/|evidence\/|entities\/|labs\/|board\/|help\/|news\/|account\/|[A-Za-z-]+\.(?:html|json|txt|md)")([^"]*)"/g, '$1="weather/$2"').replace(/data-base="\.\.\/"/g, 'data-base="./"').replace(/data-base=""/g, 'data-base="./"')
        const body = `<main class="doc"><div class="wrap">${toRoot(fm.mount || '')}</div></main><main class="doc"><div class="wrap"><article>${toRoot(markdown(md))}</article></div></main>`
        write('index.html', page({ rel: 'index.html', title: fm.title || 'Storm Charles: the weather, now', desc: fm.summary || '', body, twin: 'weather/index.md', extraHead: toRoot(fm.head || '') }))
        pages.push({ rel: 'index.html', md: 'weather/index.md', title: fm.title || 'Storm Charles: the weather' })
    } else {   // no Weather face in the repository: the root sends the reader to the data room, in the frame
        write('index.html', page({ rel: 'index.html', title: 'Storm Charles', body: `<main class="doc"><div class="wrap"><article><h1>Storm Charles</h1><p><a href="data-room/index.html">The data room</a>: what is decided, what is warned, what is known.</p></article></div></main>`, twin: 'data-room/index.md' }))
        pages.push({ rel: 'index.html', md: 'data-room/index.md', title: 'Storm Charles' })
    }
}

// datasets page, llms.txt, sitemap, version, 404
const dsTable = `| File | Bytes | What it is |\n|---|---|---|\n` + datasets.map(x => `| [${x.incident}/${x.path}](${x.url}) | ${x.bytes} | ${x.about.replace(/\|/g, '/').replace(/\n/g, ' ').slice(0, 220)} |`).join('\n')
const dsMd = `# The data\n\nEvery file behind this site, for people and agents, with its size; the sha256 of each is in [api/v1/index.json](api/v1/index.json). Inside each file, every value carries its source and the UTC time it was read. Facts, evidence and hypotheses are labelled. Refreshed at least hourly while the storm runs.\n\n${dsTable}\n`
// the data page as cards, one per family (incident.designer@, design/round-16.md): what it is, each file's size, when it was last read
// or written and when it is next read (from the file's own top-level fields), and links to the JSON, its README, the query page and the catalogue.
const FAMILIES = [
    ['weather', 'Weather', `incidents/${d0}/data/weather/`, "IPMA's warnings, communiqués, observations and forecasts for Lisbon; the airport's TAF and METARs; the labelled analysis. Kept by incident.meteorologist@."],
    ['decisions', 'Decisions', `incidents/${d0}/data/decisions/`, 'Who decided what, when, and what it followed: the decision graph and every source used. Kept by incident.researcher@.'],
    ['signals', 'Signals and watches', `incidents/${d0}/data/`, 'The timeline as data (every row with its id, label, kind and sources) and the watch on the organisers\' pages. Kept by incident.conductor@ and incident.dev@.'],
    ['graph', 'The graph', 'data/graph/', 'One graph of the storm (actors, decisions, warnings, sources, signals, places) and its ontology. Kept by incident.graph@.'],
    ['media', 'Media watch', 'research/media/', 'Who covers the storm: outlets, coverage, who was first on each fact, the Wikipedia article. Kept by incident.media@.'],
    ['weather-sites', 'Weather sites', 'research/weather-sites/', 'The survey of weather sites, the gap count, the imagery licences, the MeteoAlarm terms check. Kept by incident.weatherwatch@.'],
    ['agents', 'Agents', 'data/agents/', 'Every agent: what it is doing, its commits, the page views. Kept by incident.observability@.']
]
const STAMP = ['read_utc', 'as_of', 'updated', 'made_at', 'checked', 'generated_at', 'generated', 'built_at', 'written_utc']
const kb = n => n < 1024 ? `${n} B` : `${(n / 1024).toFixed(n < 10240 ? 1 : 0)} KB`
const fams = FAMILIES.map(([id, title, dir, what]) => {
    const abs = path.join(OUT, dir); let names = []
    try { names = fs.readdirSync(abs).filter(f => f.endsWith('.json') && !fs.statSync(path.join(abs, f)).isDirectory()).sort() } catch { }
    const rowsF = names.map(f => {
        const buf = fs.readFileSync(path.join(abs, f)); let j = {}; try { j = JSON.parse(buf) } catch { }
        const k = STAMP.find(s => typeof j[s] === 'string' && ok(j[s].length === 10 ? j[s] + 'T00:00Z' : j[s])), nested = k ? '' : Object.values(j).map(v => v && typeof v === 'object' && !Array.isArray(v) && typeof v.read_utc === 'string' && ok(v.read_utc) ? v.read_utc : '').filter(Boolean).sort().pop() || '', at = k ? j[k] : nested
        return { f, href: dir + f, bytes: buf.length, at, how: k || (nested ? 'read_utc, inside' : ''), next: typeof j.next_read_utc === 'string' && ok(j.next_read_utc) ? j.next_read_utc : '', about: typeof j.about === 'string' ? j.about : '' }
    })
    const has = f => fs.existsSync(path.join(OUT, f))
    return { id, title, dir, what, rowsF, readme: has(dir + 'index.html') ? dir + 'index.html' : '', total: rowsF.reduce((n, r) => n + r.bytes, 0), latest: rowsF.map(r => r.at).filter(a => a.length > 10).sort().pop() || '', next: rowsF.map(r => r.next).filter(Boolean).sort()[0] || '' }
}).filter(f => f.rowsF.length)
const stamp = t => t ? (t.length > 10 ? `${hm(t)} UTC ${dm(t)}` : dm(t + 'T00:00Z')) : 'not stated'
const dsCards = `<main class="doc ds"><div class="wrap"><article><h1>The data</h1><p>Every file behind this site, for people and agents. Inside each file, every value carries its source and the UTC time it was read; facts, evidence and hypotheses are labelled. Each file's sha256 is in <a href="api/v1/index.json">the catalogue</a>; <a href="llms.txt">llms.txt</a> says how to use it; <a href="data/query/index.html">the query page</a> runs SQL over the same files in the browser. Times below are each file's own stamp (when it was last read at its source, or written).</p>
<nav class="ds-jump">${fams.map(f => `<a href="#ds-${f.id}">${esc(f.title)} <i>${f.rowsF.length}</i></a>`).join('')}</nav></article>
${fams.map(f => `<section class="card ds-card" id="ds-${f.id}"><header><h2>${esc(f.title)}</h2><p class="ds-facts"><span><b>${f.rowsF.length}</b> files</span><span><b>${kb(f.total)}</b></span><span>last read or written <b>${esc(stamp(f.latest))}</b></span>${f.next ? `<span>next read <b>${esc(stamp(f.next))}</b></span>` : ''}</p></header><p>${esc(f.what)}</p>
<div class="wx-scroll"><table><thead><tr><th>File</th><th>Size</th><th>Last read or written</th><th>Next read</th><th>What it holds</th></tr></thead><tbody>${f.rowsF.map(r => `<tr><td><a href="${esc(r.href)}">${esc(r.f)}</a></td><td>${kb(r.bytes)}</td><td>${esc(stamp(r.at))}${r.how ? ` <small>${esc(r.how)}</small>` : ''}</td><td>${r.next ? esc(stamp(r.next)) : ''}</td><td>${esc(r.about.slice(0, 260))}${r.about.length > 260 ? '…' : ''}</td></tr>`).join('')}</tbody></table></div>
<p class="meta">${f.readme ? `<a href="${esc(f.readme)}">What the fields mean</a> · ` : ''}${f.id === 'graph' && fs.existsSync(path.join(OUT, 'data/graph/ontology.json')) ? '<a href="data/graph/ontology.json">The ontology</a> · ' : ''}<a href="data/query/index.html">Query it</a> · <a href="api/v1/index.json">Catalogue (sha256)</a> · folder <code>${esc(f.dir)}</code></p></section>`).join('\n')}
</div></main>`
const dsMdCards = `# The data\n\nEvery file behind this site, for people and agents. Inside each file, every value carries its source and the UTC time it was read. Facts, evidence and hypotheses are labelled. The sha256 of each incident file is in [api/v1/index.json](api/v1/index.json).\n\n${fams.map(f => `## ${f.title}\n\n${f.what}\n\n| File | Bytes | Last read or written | Next read |\n|---|---|---|---|\n${f.rowsF.map(r => `| [${r.f}](${r.href}) | ${r.bytes} | ${r.at || 'not stated'} | ${r.next} |`).join('\n')}\n`).join('\n')}`
write('datasets.md', dsMdCards)
write('datasets.html', page({ rel: 'datasets.html', title: 'The data', body: dsCards, twin: 'datasets.md' }))
pages.push({ rel: 'datasets.html', md: 'datasets.md', title: 'The data' })
write('llms.txt', `# Storm Charles (storm-charles.promptugal.news)\n\n> Storm Charles, Lisbon, 10 to 12 November 2026: the decisions (Web Summit, the government, transport), IPMA's warnings and observations, and the public signals, each with its source and the UTC time read. A data source for agents and people. Not a warning service: follow IPMA and ANEPC.\n\n## Data (JSON; start here)\n\n- [The catalogue](${SITE}api/v1/index.json): every file, its size, sha256 and what it holds\n${datasets.map(x => `- [${x.incident}/${x.path}](${SITE}${x.url})`).join('\n')}\n\n## Pages (each has a markdown twin: the same path with .md)\n\n${pages.map(p => `- [${p.title}](${SITE}${p.md})`).join('\n')}\n\n## Rules of the data\n\n- Every item: source URL, time read (UTC); label: fact (the body that decides or warns), evidence (reported by others), hypothesis (our analysis, with its reasons).\n- Times are UTC; Lisbon is on UTC in November.\n- Version: ${VERSION}, built ${builtAt}.\n`)
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(p => `<url><loc>${SITE}${p.rel.replace(/index\.html$/, '')}</loc></url>`).join('\n')}\n</urlset>\n`)
write('version.json', JSON.stringify({ version: VERSION, commit: process.env.GITHUB_SHA || '', pushed_at: process.env.PUSHED_AT || '', built_at: builtAt }, null, 2) + '\n')
write('version.txt', VERSION + '\n')
write('404.html', page({ rel: '404.html', title: 'Not found', body: `<main class="doc nf"><div class="wrap"><article><p class="kicker">404</p><h1>No page at this address</h1><p class="nf-path" id="nf-path"></p><p>Pages here are files in a public repository, so an address can change when a file moves. The facts have not gone: every row of the timeline and every dataset keeps its own address.</p><ul class="nf-go"><li><a href="/"><b>The weather</b><span>what is warned now, in a page for anyone</span></a></li><li><a href="/data-room/index.html"><b>The data room</b><span>what is warned, what is decided, hour by hour, with every source</span></a></li><li><a href="/${base}timeline.html"><b>The timeline</b><span>every signal and decision, each with its source</span></a></li><li><a href="/datasets.html"><b>The data</b><span>every file, its size and when it was read</span></a></li><li><a href="/library/index.html"><b>The library</b><span>the catalogue of everything on this site</span></a></li><li><a href="/llms.txt"><b>For agents</b><span>llms.txt and the API catalogue</span></a></li></ul><p class="meta">Not a warning service: for the weather itself, <a href="https://www.ipma.pt/">IPMA</a> and <a href="https://prociv.gov.pt/">ANEPC</a>.</p></article></div></main>` }))
{
    const all = []; const wk = d => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const f = path.join(d, e.name); e.isDirectory() ? wk(f) : e.name.endsWith('.html') && all.push(f) } }; wk(OUT)
    for (const f of all) {
        const h = fs.readFileSync(f, 'utf8'), m = h.match(/<!--menu:([A-Za-z0-9+/=]+)-->/); if (!m) continue
        const [rel, u, title] = JSON.parse(Buffer.from(m[1], 'base64').toString('utf8')), { nav, crumbs } = menu(rel, u, title)
        fs.writeFileSync(f, h.replace(m[0], () => nav).replace('<!--crumbs-->', () => crumbs))
    }
}
write('.nojekyll', '')
console.log(`build: ${pages.length} pages, ${datasets.length} datasets, ${files.length} files, ${Date.now() - t0} ms -> _site/ (${VERSION})`)
