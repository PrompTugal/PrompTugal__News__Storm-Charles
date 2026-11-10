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
            const head = cells(l); i += 2; const rows = []
            while (i < L.length && /^\s*\|/.test(L[i])) rows.push(cells(L[i++]))
            out.push(`<table><thead><tr>${head.map(c => `<th>${inline(c)}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`); continue
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
function page({ rel, title, body, desc = '', twin = '', extraHead = '' }) {
    const u = up(rel)
    return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} · Storm Charles</title>
<meta name="description" content="${esc(desc || 'Storm Charles, Lisbon, November 2026: the decisions, the warnings and the signals, each with its source and the time read; and the data, for people and agents.')}">
<link rel="stylesheet" href="${u}app/site.css">
${twin ? `<link rel="alternate" type="text/markdown" href="${esc(twin)}">` : ''}
<link rel="alternate" type="application/json" href="${u}api/v1/index.json" title="The data, for agents">
${extraHead}
</head>
<body>
<header class="top"><div class="wrap"><a class="brand" href="${u}index.html">Storm <b>Charles</b> · PrompTugal</a><span class="live">Live</span>
<nav class="top"><a href="${u}incidents/2026-11-10-storm-charles/index.html">Dashboard</a><a href="${u}incidents/2026-11-10-storm-charles/timeline.html">Timeline</a><a href="${u}datasets.html">Data</a><a href="${u}agents/JOBS.html">Team</a><a href="${u}BRIEF.html">Brief</a><a href="${u}llms.txt">For agents</a></nav></div></header>
<div class="notice"><div class="wrap"><strong>Not a warning service.</strong> Follow <a href="https://www.ipma.pt/">IPMA</a>, <a href="https://prociv.gov.pt/">ANEPC</a> and your local authorities. We aggregate public sources, each with its source and the time we read it.</div></div>
${body}
<footer class="agent"><div class="wrap">Built and run by incident.conductor@web-summit.dinis and the incident team (meteorologist, researcher, dev), Claude Code agents with a named human operator, Dinis Cruz. Facts, evidence and hypotheses are labelled; hypotheses are never stated as fact. Public sources only; nothing about private people. ${twin ? `<a href="${esc(twin)}">This page as markdown</a> · ` : ''}<a href="${u}version.json">${esc(VERSION)}</a></div></footer>
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
// the incidents
const incidents = fs.readdirSync(path.join(ROOT, 'incidents')).filter(d => fs.existsSync(path.join(ROOT, 'incidents', d, 'incident.json')))
const INC = Object.fromEntries(incidents.map(d => [d, JSON.parse(fs.readFileSync(path.join(ROOT, 'incidents', d, 'incident.json'), 'utf8'))]))

for (const rel of files.filter(f => f.endsWith('.md'))) {
    const [fm, md] = frontMatter(fs.readFileSync(path.join(ROOT, rel), 'utf8'))
    const htmlRel = rel.replace(/(^|\/)README\.md$/, '$1index.html').replace(/\.md$/, '.html')
    const title = fm.title || titleOf(md, rel)
    let body = `<main class="doc"><div class="wrap"><article>${markdown(md)}</article></div></main>`
    let extraHead = ''
    const m = rel.match(/^incidents\/([^/]+)\/README\.md$/)
    if (m && INC[m[1]]) {
        body = `<section class="banner"><div class="wrap"><p class="kicker">The live dashboard</p><h1>${esc(INC[m[1]].title)}</h1><p class="src">Read from the incident's data every minute while this page is open. <a href="../../datasets.html">The data</a>.</p></div></section>
<main class="doc"><div class="wrap"><div class="incident" id="incident" data-dir="data/"><p class="meta">The dashboard needs JavaScript: it reads <a href="data/README.md">data/</a> and draws it here.</p></div></div></main>${body}`
        extraHead = `<script src="../../app/storm.js" defer></script>`
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

// the front page: the newsroom
const d0 = incidents[0], inc = INC[d0], base = `incidents/${d0}/`
const J = rel => { try { return JSON.parse(fs.readFileSync(path.join(ROOT, base, rel), 'utf8')) } catch { return null } }
const sig = J('data/signals.json'), warn = J('data/weather/warnings.json'), chg = J('data/weather/changes.json')
const hm = t => String(t || '').slice(11, 16)
const feed = (sig?.items || []).slice().sort((a, b) => Date.parse(b.at) - Date.parse(a.at)).slice(0, 14).map(s => {
    const src = (s.sources || []).find(x => x.url && /^https:/.test(x.url)), via = (s.sources || []).map(x => x.label).filter(Boolean).join('; ')
    return `<li><time datetime="${esc(s.at)}">${esc(hm(s.at))}</time><span class="lbl ${esc(s.kind)}">${esc(s.label || s.kind)}</span>${s.decision || s.key ? '<strong>' : ''}${esc(s.text)}${s.decision || s.key ? '</strong>' : ''}<span class="via">${src ? `<a href="${esc(src.url)}">${esc(src.label)}</a>` : esc(via)}</span></li>`
}).join('')
const lvl = l => `<span class="lvl ${esc(l)}">${esc(l)}</span>`
const wx = (warn?.lisbon || []).filter(w => w.level !== 'green').sort((a, b) => Date.parse(a.start_utc) - Date.parse(b.start_utc)).map(w => `<li><span>${esc(w.type)} <span class="meta">${esc(w.start_utc.slice(5, 16).replace('T', ' '))} to ${esc(w.end_utc.slice(5, 16).replace('T', ' '))}</span></span><b>${lvl(w.level)}</b></li>`).join('')
const thu = chg?.thursday?.lisbon_warnings_touching_thursday?.items || []
const front = `<section class="banner"><div class="wrap"><p class="kicker">${esc(inc.kicker || 'Storm Charles · Lisbon')}</p><h1>${esc(inc.headline.text)}</h1>
<p class="src">Source: <a href="${esc(inc.headline.url)}">${esc(inc.headline.source)}</a>, ${esc(inc.headline.at)}. ${esc(inc.standfirst || '')}</p></div></section>
<div class="wrap"><div class="grid">
<section class="card"><h2>Latest signals</h2><ul class="feed">${feed || '<li class="meta">No signals yet.</li>'}</ul><p class="meta"><a href="${base}timeline.html">The whole timeline</a> · <a href="${base}decisions.html">Decisions</a></p></section>
<aside>
<section class="card"><h2>IPMA warnings, Lisbon district</h2><ul class="kv">${wx || '<li>None read</li>'}</ul><p class="meta">IPMA open data, read ${esc(hm(warn?.read_utc))} UTC. Times are Lisbon time (= UTC in November).</p></section>
<section class="card" style="margin-top:16px"><h2>Thursday 12 November</h2><ul class="kv">${thu.map(w => `<li><span>${esc(w.type)} <span class="meta">to ${esc(w.end_utc.slice(5, 16).replace('T', ' '))}</span></span><b>${lvl(w.level)}</b></li>`).join('') || '<li>No Lisbon warning touches Thursday</li>'}</ul><p class="meta">${esc(inc.thursday || '')}</p></section>
<section class="card" style="margin-top:16px"><h2>For agents and analysts</h2><p class="meta">Every file behind this page, with its sha256: <a href="api/v1/index.json">api/v1/index.json</a>. How to use it: <a href="llms.txt">llms.txt</a>. Refreshed at least hourly while the storm runs.</p></section>
</aside></div>
<p class="meta"><a href="${base}index.html">The live dashboard</a> (the decision graph, the weather, the timeline) · <a href="${base}data/weather/analysis.html">The meteorologist's analysis</a> (labelled as analysis)</p></div>`
write('index.html', page({ rel: 'index.html', title: 'Storm Charles: what is decided, what is warned, what is known', body: front, twin: 'index.md' }))
write('index.md', `# Storm Charles, Lisbon, November 2026\n\n**${inc.headline.text}** Source: [${inc.headline.source}](${inc.headline.url}), ${inc.headline.at}.\n\n${inc.standfirst || ''}\n\nNot a warning service: follow IPMA, ANEPC and your local authorities.\n\n- [The live dashboard](${base}README.md)\n- [The timeline](${base}timeline.md)\n- [The decisions](${base}decisions.md)\n- [The data, for agents](api/v1/index.json) and [llms.txt](llms.txt)\n`)
pages.push({ rel: 'index.html', md: 'index.md', title: 'Storm Charles' })

// datasets page, llms.txt, sitemap, version, 404
const dsTable = `| File | Bytes | What it is |\n|---|---|---|\n` + datasets.map(x => `| [${x.incident}/${x.path}](${x.url}) | ${x.bytes} | ${x.about.replace(/\|/g, '/').replace(/\n/g, ' ').slice(0, 220)} |`).join('\n')
const dsMd = `# The data\n\nEvery file behind this site, for people and agents, with its size; the sha256 of each is in [api/v1/index.json](api/v1/index.json). Inside each file, every value carries its source and the UTC time it was read. Facts, evidence and hypotheses are labelled. Refreshed at least hourly while the storm runs.\n\n${dsTable}\n`
write('datasets.md', dsMd)
write('datasets.html', page({ rel: 'datasets.html', title: 'The data', body: `<main class="doc"><div class="wrap"><article>${markdown(dsMd)}</article></div></main>`, twin: 'datasets.md' }))
pages.push({ rel: 'datasets.html', md: 'datasets.md', title: 'The data' })
write('llms.txt', `# Storm Charles (storm-charles.promptugal.news)\n\n> Storm Charles, Lisbon, 10 to 12 November 2026: the decisions (Web Summit, the government, transport), IPMA's warnings and observations, and the public signals, each with its source and the UTC time read. A data source for agents and people. Not a warning service: follow IPMA and ANEPC.\n\n## Data (JSON; start here)\n\n- [The catalogue](${SITE}api/v1/index.json): every file, its size, sha256 and what it holds\n${datasets.map(x => `- [${x.incident}/${x.path}](${SITE}${x.url})`).join('\n')}\n\n## Pages (each has a markdown twin: the same path with .md)\n\n${pages.map(p => `- [${p.title}](${SITE}${p.md})`).join('\n')}\n\n## Rules of the data\n\n- Every item: source URL, time read (UTC); label: fact (the body that decides or warns), evidence (reported by others), hypothesis (our analysis, with its reasons).\n- Times are UTC; Lisbon is on UTC in November.\n- Version: ${VERSION}, built ${builtAt}.\n`)
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(p => `<url><loc>${SITE}${p.rel.replace(/index\.html$/, '')}</loc></url>`).join('\n')}\n</urlset>\n`)
write('version.json', JSON.stringify({ version: VERSION, commit: process.env.GITHUB_SHA || '', pushed_at: process.env.PUSHED_AT || '', built_at: builtAt }, null, 2) + '\n')
write('version.txt', VERSION + '\n')
write('404.html', page({ rel: '404.html', title: 'Not found', body: `<main class="doc"><div class="wrap"><article><h1>Not found</h1><p><a href="/">The front page</a> · <a href="/api/v1/index.json">The data</a></p></article></div></main>` }))
write('.nojekyll', '')
console.log(`build: ${pages.length} pages, ${datasets.length} datasets, ${files.length} files, ${Date.now() - t0} ms -> _site/ (${VERSION})`)
