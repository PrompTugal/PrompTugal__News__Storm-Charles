#!/usr/bin/env node
// entities-build: the pages of the mini Wikipedia, and the linker (incident.entities@web-summit.dinis).
//   node tools/entities-build.mjs --out <dir>          writes <dir>/entities/**.md (a page per node, an index per type, the
//                                                      ontology as a page); the build renders every markdown file it finds there
//   node tools/entities-build.mjs --out <dir> --link   after every page is built: links the first mention per paragraph of every
//                                                      known name to its node page, marks outside links, loads the lens, and
//                                                      writes <dir>/entities/mentions.json (what was linked, and what has no node yet)
// It reads the tracked entities/**.json and the incident's data; it writes only under --out, never a tracked file.
import fs from 'node:fs'
import path from 'node:path'
import { ROOT, readJson, esc, loadNodes, matcher, captures as loadCaptures, neighbours } from './entities-lib.mjs'

const arg = k => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null }
const OUT = arg('--out'); if (!OUT) { console.error('entities-build: --out <dir> is required'); process.exit(1) }
const LINK = process.argv.includes('--link')
const nodes = loadNodes(), byId = new Map(nodes.map(n => [n.id, n]))
if (!nodes.length) process.exit(0)
const onto = readJson(path.join(ROOT, 'entities/ontology.json')), index = readJson(path.join(ROOT, 'entities/index.json'))
const INC = `incidents/${index.incident}/`
const signals = readJson(path.join(ROOT, INC, 'data/signals.json'))
const write = (rel, s) => { const f = path.join(OUT, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, s) }

if (!LINK) pages(); else link()

// ------------------------------------------------------------------------------------------------ the pages
function pages() {
    const M = matcher(nodes)
    const t = s => String(s ?? '').replace(/\s+/g, ' ').replace(/\[/g, '(').replace(/\]/g, ')').replace(/\|/g, '/').replace(/[*`]/g, '').trim()
    const u = s => String(s).replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\s/g, '%20')
    const MON = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const when = z => { const m = String(z || '').match(/^(\d{4})-(\d\d)-(\d\d)(?:T(\d\d):(\d\d))?/); return !m ? '' : `${+m[3]} ${MON[+m[2] - 1].slice(0, 3)}${m[4] ? `, ${m[4]}:${m[5]} UTC` : ''}` }
    const kept = `> Kept by incident.entities@web-summit.dinis, ${(d => `${+d.slice(8, 10)} ${MON[+d.slice(5, 7) - 1]} ${d.slice(0, 4)}, ${d.slice(11, 16)} UTC`)(index.updated)}`
    const host = url => { try { return new URL(url).host.replace(/^www\./, '') } catch { return 'source' } }
    const nlink = (id, from) => `[${t(byId.get(id).name)}](${from}${id}.md)`
    const rowLink = (id, up) => `[row ${id}](${up}${INC}timeline.md#${id})`
    const src = (e, up) => {
        if (!e.row && !e.decision && /^research\/media\//.test(e.origin)) return `[${host(e.source)}](${u(e.source)}), read ${when(e.read_utc)} · from [the media watch's first on each fact](${up}research/media/first-on-each-fact.json)`
        const own = e.source.startsWith('https://storm-charles.promptugal.news/')
        const from = e.row ? rowLink(e.row, up) : e.decision ? `[decision ${e.decision}](${up}${INC}decisions.md)` : `\`${t(e.origin)}\``
        return `${own ? 'this site' : `[${host(e.source)}](${u(e.source)})`}${e.read_utc ? `, read ${when(e.read_utc)}` : e.read_note ? `, ${t(e.read_note)}` : ', time read in the row'} · from ${from}`
    }
    // rows that mention each node (a query, not an edge)
    const rowsOf = new Map()
    for (const r of signals.items) for (const id of new Set(M.find(r.text).map(h => h.id))) { if (!rowsOf.has(id)) rowsOf.set(id, []); rowsOf.get(id).push(r) }
    // incoming edges, read through the verb's inverse
    const incoming = new Map()
    for (const n of nodes) for (const e of n.edges) { if (!incoming.has(e.to)) incoming.set(e.to, []); incoming.get(e.to).push({ ...e, from: n.id }) }
    const rowTable = (rs, up) => rs.length ? ['| When (UTC) | Label | What the row says |', '|---|---|---|', ...rs.slice().sort((a, b) => a.at < b.at ? 1 : -1).map(r => `| [${when(r.at)}](${up}${INC}timeline.md#${r.id}) | ${r.label}${r.decision ? ', decision' : ''} | ${t(r.text).slice(0, 300)}${r.text.length > 300 ? '…' : ''} |`)].join('\n') : ''
    const CAP = loadCaptures()

    const NBP = neighbours(), mine = new Set(nodes.flatMap(n => [n.name, ...n.also].map(x => x.toLowerCase())))
    for (const n of nodes) {
        const up = '../../', here = '../', out = []
        const names = n.also.filter(a => !n.match?.none?.includes(a))
        out.push('---', `title: "${t(n.name).replace(/"/g, "'")}"`, `summary: "${t(n.summary).replace(/"/g, "'").slice(0, 200)}"`, '---', kept + `. A node of the [entities](../README.md): made from [its data](${n.id.split('/')[1]}.json), where every line names the row or decision it was taken from. Nothing is stated here for the first time.`, '', `# ${t(n.name)}`, '')
        out.push(`**${n.type}**: ${t(onto.types[n.type].what)} [All ${n.type} nodes](README.md).${names.length ? ` Also written: ${names.map(t).join('; ')}.` : ''}`, '')
        const ss = n.summary_source
        if (n.summary) out.push(`${t(n.summary)} (${n.label === 'ours' ? `**our summary**${ss ? (ss.origin.includes('#s-') ? `, from ${rowLink(ss.origin.split('#')[1], up)}, a row labelled ${ss.taken_from_label}` : `, from \`${t(ss.origin)}\``) : ', no source: ours'}` : `**${n.label}**; ${ss.url.startsWith('https://storm-charles') ? 'this site' : `[${host(ss.url)}](${u(ss.url)})`}${ss.read_utc ? `, read ${when(ss.read_utc)}` : ''}`})`, '')
        if (n.dossier) {
            const D = readJson(path.join(ROOT, n.dossier)), did = new Map(nodes.filter(x => x.type === 'decision' || x.type === 'warning').map(x => [x.id.split('/')[1], x.id]))
            out.push(`## Everything decided about it, as it stands`, '', `From the researcher's file for this service, [${t(n.dossier.split('/').pop())}](${up}${n.dossier}) (updated ${when(D.updated)}); the decision graph is the source of truth.`, '', '| Decision | Status | Published | In effect | Label | Read | Where |', '|---|---|---|---|---|---|---|',
                ...D.decisions.map(d => `| ${did.has(d.edge) ? `[${t(d.decision).slice(0, 160)}](${up}entities/${did.get(d.edge)}.md)` : t(d.decision).slice(0, 160)}${d.note ? ` *${t(d.note).slice(0, 220)}* ` : ''} | ${t(d.status).replace(/_/g, ' ')} | ${when(d.published_utc) || 'not stated'} | ${d.effect_from_utc ? `${when(d.effect_from_utc)}${d.effect_to_utc ? ` to ${when(d.effect_to_utc)}` : ''}` : t(d.effect_note || 'not stated')} | ${d.label} | ${when(d.read)} | [${host(d.address)}](${u(d.address)}) |`), '')
            if (D.open?.length) out.push('### Still open', '', ...D.open.map(x => `- ${t(x)}`), '')
            if (D.tries?.length) out.push(`### Each try at the primary page (${D.tries.length})`, '', '| When (UTC) | Address | Answer | What was found |', '|---|---|---|---|', ...D.tries.slice().sort((a, b2) => a.at < b2.at ? 1 : -1).slice(0, 30).map(x => `| ${when(x.at)} | [${host(x.url)}](${u(x.url)}) | ${x.http ?? ''} | ${t(x.result)}${x.corrected ? ` (corrected: ${t(x.corrected)})` : ''} |`), '')
        }
        if (n.type === 'decision' || n.type === 'warning') out.push(`- Status: ${t(n.status)}${n.at ? `\n- Made: ${when(n.at)}` : ''}${n.effect_from_utc ? `\n- In effect: ${when(n.effect_from_utc)}${n.effect_to_utc ? ` to ${when(n.effect_to_utc)}` : ''}` : ''}`, '')
        const group = (list, key, title, line) => { const by = new Map(); for (const e of list) { if (!by.has(e[key])) by.set(e[key], []); by.get(e[key]).push(e) } for (const [verb, es] of by) { out.push(`## ${title(verb)}`, '', ...es.map(line), '') } }
        group(n.edges, 'verb', v => `${t(n.name).length > 60 ? 'It' : t(n.name)} ${onto.verbs[v].reads}`, e => `- ${nlink(e.to, up + 'entities/')} · **${e.label}** · "${t(e.says)}" · ${src(e, up)}`)
        group(incoming.get(n.id) || [], 'verb', v => `${t(n.name).length > 60 ? 'It' : t(n.name)} ${onto.verbs[v].inverse_reads}`, e => `- ${nlink(e.from, up + 'entities/')} · **${e.label}** · "${t(e.says)}" · ${src(e, up)}`)
        if (n.type === 'day') {
            const day = n.id.split('/')[1], rs = signals.items.filter(r => r.at.slice(0, 10) === day)
            for (const [title, f] of [['Decisions that day', r => r.decision], ['Facts read that day (from the body that decides or warns)', r => !r.decision && r.label === 'fact' && r.kind !== 'team'], ['Evidence that day (reported by others)', r => !r.decision && r.label === 'evidence'], ['Hypotheses that day (our analysis, never fact)', r => r.label === 'hypothesis'], ['The team that day', r => !r.decision && r.kind === 'team' && r.label !== 'hypothesis']]) { const x = rs.filter(f); if (x.length) out.push(`## ${title}`, '', rowTable(x, up), '') }
            if (!rs.length) out.push('## Rows that day', '', 'No timeline row is dated this day yet.', '')
        } else {
            const rs = rowsOf.get(n.id) || []
            if (n.hosts?.length) { const cited = signals.items.filter(r => (r.sources || []).some(s => { const h = host(s.url || ''); return n.hosts.some(x => h === x || h.endsWith('.' + x)) })); out.push(`## Timeline rows read at it (${cited.length})`, '', cited.length ? rowTable(cited, up) : 'No timeline row gives one of its addresses as its source.', '') }
            out.push(`## Timeline rows that mention it (${rs.length})`, '', rs.length ? rowTable(rs, up) : 'No timeline row uses one of its names yet.', '')
        }
        const seen = new Map()
        for (const e of [...(ss && n.label !== 'ours' ? [{ source: ss.url, read_utc: ss.read_utc }] : []), ...n.edges, ...(incoming.get(n.id) || [])]) if (!e.source.startsWith('https://storm-charles.promptugal.news/') && !seen.has(e.source)) seen.set(e.source, e)
        out.push(`## Evidence (${seen.size} outside address${seen.size === 1 ? '' : 'es'})`, '', seen.size ? [...seen.values()].map(e => { const c = CAP.get(e.source); return `- ${host(e.source)}${e.read_utc ? `, read ${when(e.read_utc)}` : ''} · ${c ? `[our capture of it](${up}evidence/${c}.md) (the page as we read it, its hash, then the way out)` : `no capture of ours yet · [the address itself](${u(e.source)})`}` }).join('\n') : 'Its statements come from this site\'s own files.', '')
        const across = NBP.filter(x => [x.name, ...x.also].some(a => mine.has(a.toLowerCase()) && [n.name, ...n.also].some(b2 => b2.toLowerCase() === a.toLowerCase())))
        out.push('## The same node elsewhere', '', ...across.map(x => `- In the meteorology graph (${x.kind}): [${t(x.name)}](${up}${x.md}): ${t(x.summary).slice(0, 200)}`), n.graph ? `- In the graph: \`${n.graph}\` ([open it there](${up}app/graph/index.html?node=${encodeURIComponent(n.graph)}), [its data](${up}data/graph/storm.json))` : '- The graph (data/graph/) has no node for this yet.', ...(n.page ? [`- Its page on this site: [${t(n.page.replace(/README\.md$/, ''))}](${up}${n.page})`] : []), `- As data: [${n.id}.json](${n.id.split('/')[1]}.json) · [every node](${up}entities/index.json) · [the grammar](${up}entities/ontology.md)`, '')
        write(`entities/${n.id}.md`, out.join('\n'))
    }
    // an index per type, the front index, the ontology as a page
    const types = Object.keys(onto.types).filter(ty => nodes.some(n => n.type === ty))
    for (const ty of types) {
        const ns = nodes.filter(n => n.type === ty).sort((a, b) => a.name.localeCompare(b.name))
        write(`entities/${ty}/README.md`, [kept + '. [All entities](../README.md).', '', `# Entities: ${ty}`, '', t(onto.types[ty].what), '', '| Node | What the data says | Edges out, in | Rows |', '|---|---|---|---|', ...ns.map(n => `| [${t(n.name)}](${n.id.split('/')[1]}.md) | ${t(n.summary).slice(0, 180)} (${n.label}) | ${n.edges.length}, ${(incoming.get(n.id) || []).length} | ${ty === 'day' ? signals.items.filter(r => r.at.slice(0, 10) === n.id.split('/')[1]).length : (rowsOf.get(n.id) || []).length} |`), ''].join('\n'))
    }
    write('entities/README.md', ['---', 'title: "Entities: every thing these pages mention"', '---', kept + '. The data: [index.json](index.json); the grammar: [ontology.json](ontology.json), [as a page](ontology.md).', '', '# Entities', '', `Every thing a page here mentions is a node with an address: **${index.counts.nodes} nodes** and **${index.counts.edges} edges** so far. A node is only a name until it is connected: each page shows the node's edges (a verb, read both ways), the timeline rows that use its name, and the outside addresses its statements were read at. Every edge names the row or decision it was taken from; a summary with no source is marked as ours. Across the site, the first mention of a name in each paragraph links here.`, '', '| Type | What | Nodes |', '|---|---|---|', ...types.map(ty => `| [${ty}](${ty}/README.md) | ${t(onto.types[ty].what)} | ${nodes.filter(n => n.type === ty).length} |`), '', ...types.filter(ty => ty !== 'decision' && ty !== 'warning').flatMap(ty => [`## ${ty}`, '', nodes.filter(n => n.type === ty).map(n => `[${t(n.name)}](${n.id}.md)`).join(' · '), '']), '## decision and warning', '', `The [${nodes.filter(n => n.type === 'decision').length} decisions](decision/README.md) and [${nodes.filter(n => n.type === 'warning').length} warnings](warning/README.md) carry the ids of the decision graph, so each is the same node in [the graph](../app/graph/README.md).`, ''].join('\n'))
    write('entities/ontology.md', [kept + '. The file: [ontology.json](ontology.json). [All entities](README.md).', '', '# Entities: the grammar', '', t(onto.about), '', '## Types', '', '| Type | What | Its own verbs |', '|---|---|---|', ...Object.entries(onto.types).map(([k, v]) => `| ${k} | ${t(v.what)} | ${v.verbs.join(', ') || 'none yet'} |`), '', '## Verbs, each with its inverse', '', '| Verb | Reads | Inverse | Reads | May point at |', '|---|---|---|---|---|', ...Object.entries(onto.verbs).map(([k, v]) => `| ${k} | A ${t(v.reads)} B | ${v.inverse} | B ${t(v.inverse_reads)} A | ${v.to.join(', ')} |`), '', '## Names', '', t(onto.names.rule), ''].join('\n'))
    console.log(`entities-build: ${nodes.length} node pages, ${types.length} type indexes`)
}

// ------------------------------------------------------------------------------------------------ the linker
function link() {
    const t0 = Date.now()
    // Pages are read and written as bytes (latin1): nothing is decoded or re-encoded, and what is not changed is copied as it was.
    // The names are matched in their UTF-8 bytes (matcher's `bytes`), so an accented name is found the same.
    const dec = s => Buffer.from(s, 'latin1').toString('utf8')
    const NB = neighbours()   // entities/ first: a name both have goes to the node here
    const M = matcher([...nodes, ...NB], { html: true, bytes: true })
    const SKIP = new Set(['a', 'code', 'pre', 'svg', 'button', 'nav', 'header', 'footer', 'form', 'select', 'label', 'summary', 'time', 'kbd', 'samp', 'output', 'noscript', 'template'])
    const RAW = new Set(['script', 'style', 'textarea', 'title'])
    const VOID = new Set(['br', 'hr', 'img', 'input', 'meta', 'link', 'wbr', 'source', 'col', 'area', 'base', 'embed', 'track'])
    const BLOCK = new Set(['p', 'li', 'td', 'th', 'dd', 'dt', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'figcaption', 'div', 'section', 'article', 'aside', 'main'])
    const CLOSE = Object.fromEntries([...RAW].map(n => [n, new RegExp('</' + n, 'gi')]))
    const TAG = /<(\/?)([a-zA-Z][\w:-]*)((?:"[^"]*"|'[^']*'|[^>"'])*)>/y
    const CAP = loadCaptures()
    const stats = { pages: 0, pages_linked: 0, linked: 0, outside_marked: 0, outside_to_evidence: 0, by_node: {}, by_page: {} }
    const gaps = new Map(), known = new Set([...M.names.keys()])
    const CAND = /(?<![\p{L}\p{N}])(?:[A-ZÀ-Ý][\p{L}\p{N}]+(?:\s+(?:de|da|do|dos|das|of)(?=\s+[A-ZÀ-Ý]))?(?:\s+(?=[A-ZÀ-Ý]))?){2,5}|(?<![\p{L}\p{N}.@/-])[A-Z]{3,}(?![\p{L}\p{N}])/gu
    const files = []; (function walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const f = path.join(d, e.name); e.isDirectory() ? walk(f) : e.name.endsWith('.html') && files.push(f) } })(OUT)
    for (const f of files) {
        const rel = path.relative(OUT, f).split(path.sep).join('/')
        if (rel.startsWith('board/items/')) { stats.left_to_the_browser = (stats.left_to_the_browser || 0) + 1; continue }   // a third of the bytes: linked in the browser by app/lens/lens.js (the conductor's decision, 11 Nov)
        if (rel.startsWith('view/')) continue   // the librarian's file viewers show a file as it is: its text is not linked
        const html = fs.readFileSync(f, 'latin1')
        const up = rel === '404.html' ? '/' : '../'.repeat(rel.split('/').length - 1)
        const self = rel.startsWith('entities/') ? rel.slice(9).replace(/\.html$/, '') : null
        const wantGaps = rel === 'index.html' || rel.startsWith('data-room/') || (rel.startsWith(INC) && !rel.includes('/data/'))
        // only the page's own content is read: from the banner or <main> to the panel or the footer (the head, the menu, the
        // notice, the reader's panel and the footer are the frame's and are never linked); one pass, pieces joined once
        const a0 = html.indexOf('<section class="banner"'), a1 = html.indexOf('<main'), from = a0 >= 0 && (a1 < 0 || a0 < a1) ? a0 : a1
        let to = html.indexOf('<aside class="panel"'); if (to < 0) to = html.indexOf('<footer'); if (to < 0) to = html.indexOf('</body>')
        stats.pages++
        if (from < 0 || to < from) continue
        let i = from, n = 0, skip = 0, last = 0
        const parts = [], stack = [], seen = new Set()
        const put = (a, b, s) => { parts.push(html.slice(last, a), s); last = b }   // only what changes is cut; the rest is copied in runs
        // The walker reads the tags up to a given place and keeps what the place is inside of (a link, code, a form ...; which
        // block). The names are found in one scan of the page's content; each hit asks the walker where it is.
        let inTag = false, textFrom = from
        const walk = upTo => {
            if (upTo < i) { inTag = true; return }   // still inside the tag, comment or script the walker last read
            inTag = false
            while (i <= upTo) {
                const lt = html.indexOf('<', i); if (lt < 0 || lt > upTo || lt >= to) { i = upTo + 1; return }
                if (wantGaps && lt > textFrom && !skip) gapText(textFrom, lt)
                const c = html.charCodeAt(lt + 1)
                if (c === 33) { const e = html.indexOf('-->', lt); i = e < 0 ? to : e + 3; textFrom = i; if (i > upTo) inTag = true; continue }
                let gt = html.indexOf('>', lt); if (gt < 0) { i = to; return }
                if (c === 47) {
                    const name = html.slice(lt + 2, gt).trim().toLowerCase(); i = textFrom = gt + 1
                    let k = stack.length - 1; while (k >= 0 && stack[k].name !== name) k--
                    if (k >= 0) for (const x of stack.splice(k)) if (x.skip) skip--
                    if (BLOCK.has(name)) seen.clear()
                    if (gt > upTo) inTag = true
                    continue
                }
                if (!((c >= 65 && c <= 90) || (c >= 97 && c <= 122))) { i = lt + 1; continue }
                let tag = html.slice(lt, gt + 1)
                if (tag.indexOf('"') >= 0 || tag.indexOf("'") >= 0) { TAG.lastIndex = lt; const m = TAG.exec(html); if (m) { tag = m[0]; gt = lt + tag.length - 1 } }
                let sp = 1; while (sp < tag.length - 1) { const ch = tag.charCodeAt(sp); if (ch === 32 || ch === 10 || ch === 9 || ch === 47) break; sp++ }
                const name = tag.slice(1, sp).toLowerCase(), attrs = tag.slice(sp, -1)
                i = textFrom = gt + 1
                if (RAW.has(name)) { CLOSE[name].lastIndex = i; const e = CLOSE[name].exec(html); i = textFrom = e ? e.index : to; if (i > upTo) inTag = true; continue }
                if (BLOCK.has(name)) seen.clear()
                if (name === 'a' && !skip) {
                    const href = (attrs.match(/\shref="(https?:\/\/[^"]+)"/) || [])[1]
                    if (href && !href.startsWith('https://storm-charles.promptugal.news/')) {
                        const cap = rel.startsWith('evidence/') ? null : CAP.get(dec(href).replace(/&amp;/g, '&'))
                        let nt = /\sclass="/.test(tag) ? tag.replace(/\sclass="/, ' class="out ') : tag.replace(/^<a/i, '<a class="out"')
                        nt = nt.replace(/^<a/i, '<a data-kind="out"')
                        if (cap) { nt = nt.replace(/\shref="[^"]+"/, ` href="${up}evidence/${cap}.html" data-out="${href}"`); stats.outside_to_evidence++ }
                        stats.outside_marked++; put(lt, gt + 1, nt)
                    }
                }
                if (!VOID.has(name) && attrs.charCodeAt(attrs.length - 1) !== 47) { const sk = SKIP.has(name) || (attrs.length > 5 && /\sclass="(?:[^"]* )?notice(?: [^"]*)?"|\sdata-nolink|\shidden(?=[\s=]|$)/.test(attrs)); stack.push({ name, skip: sk }); if (sk) skip++ }
                if (gt > upTo) inTag = true
            }
        }
        const gapText = (a, b) => { const s = html.slice(a, b); let plain = '', at = 0; for (const h of M.find(s)) { plain += s.slice(at, h.index) + ' '; at = h.index + h.length } for (const m of dec(plain + s.slice(at)).replace(/&#39;|&quot;|&amp;/g, ' ').matchAll(CAND)) { const k = m[0].trim().replace(/\s+/g, ' '); if (!known.has(k.toLowerCase())) gaps.set(k, (gaps.get(k) || 0) + 1) } }
        M.scan(html, from, to, (at, txt, h) => {
            walk(at)
            if (inTag || skip || at < last || seen.has(h.id) || h.id === self || (!h.own && rel === h.href)) return
            seen.add(h.id); n++; stats.by_node[h.id] = (stats.by_node[h.id] || 0) + 1
            if (!h.own) stats.to_meteorology = (stats.to_meteorology || 0) + 1
            put(at, at + txt.length, h.own ? `<a class="ent ent-${h.type}" data-kind="entity" data-ent="${h.id}" href="${up}entities/${h.id}.html">${txt}</a>` : `<a class="ent ent-${h.type}" data-kind="entity" data-node="${h.id}" href="${up}${h.href}">${txt}</a>`)
        })
        walk(to - 1)
        if (n) { stats.pages_linked++; stats.by_page[rel] = n; stats.linked += n }
        if (parts.length) { parts.push(html.slice(last)); fs.writeFileSync(f, parts.join(''), 'latin1') }
    }
    const noNode = [...gaps].sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1)).slice(0, 150).map(([text, count]) => ({ text, count }))
    write('entities/mentions.json', JSON.stringify({ about: 'What the linker did on this build: mentions of known names linked (the first in each paragraph), by node and by page; outside links marked; and capitalised names on the front page and the incident\'s pages that no node has yet (a rough list: sentence openings are in it too). Made by tools/entities-build.mjs --link; not a tracked file.', by: 'incident.entities@web-summit.dinis', updated: index.updated, nodes: nodes.length, edges: index.counts.edges, ms: Date.now() - t0, ...stats, no_node_yet: { distinct: noNode.length, mentions: noNode.reduce((s, x) => s + x.count, 0), items: noNode } }, null, 1) + '\n')
    console.log(`entities-build --link: ${stats.linked} mentions linked on ${stats.pages_linked} of ${stats.pages} pages; ${stats.outside_marked} outside links marked; ${noNode.length} names with no node yet; ${Date.now() - t0} ms`)
}
