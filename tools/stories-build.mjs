#!/usr/bin/env node
// Stories, generated from their graphs (incident.stories@web-summit.dinis, 11 November 2026, WS-214; Dinis, ~02:20 UTC: "a complete
// data-driven story ... every thing needs to be hyperlinked ... but you don't have to show it all at the same time: toggles").
//
//   node tools/stories-build.mjs --out _site     for every stories/<slug>/story.json writes, ONLY under <out>/stories/:
//                                                <slug>/index.md (the page: the story as HTML in the frame's mount, every claim with
//                                                its label and its support), <slug>/story.md (the same story as plain linked text),
//                                                <slug>/resolved.json (the graph with every support resolved), index.md and index.json.
//   node tools/stories-build.mjs --check         resolves every support and exits 1 if one does not resolve or no longer says what
//                                                the sentence was written on. Run before every release.
//
// A story is a graph first (stories/grammar.md): claims, each {id, text, label, said_by, at_utc, read_utc, supports}. A support is a
// timeline row (kind row: an id in data/signals.json), a field of a file in the data room (kind data: file + field, with `expect`
// or `contains` = what the field said when the sentence was written) or a decision edge (kind edge: an id in decisions/graph.json).
// The build resolves each one again on every push: when a field no longer says what the sentence was written on, the page says so
// beside the sentence instead of repeating it. A claim with no support is allowed only when it is derived_from other claims.
// No dependencies, no network, nothing from git history, no clock in the output (the same inputs give the same bytes).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2), CHECK = args.includes('--check')
const outAt = args.indexOf('--out'), OUT = outAt >= 0 ? path.resolve(args[outAt + 1] || '') : ''
if (!CHECK && (!OUT || OUT === ROOT)) { console.error('stories-build: --out <dir> (not the repository root), or --check'); process.exit(2) }
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
const J = rel => JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'))
const cache = {}
const file = rel => cache[rel] ??= (fs.existsSync(path.join(ROOT, rel)) ? (rel.endsWith('.json') ? J(rel) : fs.readFileSync(path.join(ROOT, rel), 'utf8')) : undefined)
const host = u => { try { return new URL(u).hostname.replace(/^www\./, '') } catch { return '' } }
// no private person is linked (CLAUDE.md, People): an address on a social platform never leaves this tool as a link
const SOCIAL = /(^|\.)(x\.com|twitter\.com|bsky\.app|threads\.(net|com)|instagram\.com|facebook\.com|linkedin\.com|reddit\.com|tiktok\.com|tumblr\.com)$|mastodon|\/@[^/]+/
const outside = u => typeof u === 'string' && /^https:\/\//.test(u) && !SOCIAL.test(host(u)) && !/\/@[^/?#]+/.test(u) ? u : null
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
// 2026-11-10T22:35:24Z -> "10 Nov, 22:35 UTC"; anything else is shown as written
const when = t => { const m = String(t || '').match(/^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)/); return m ? `${+m[3]} ${MON[+m[2] - 1]}, ${m[4]}:${m[5]} UTC` : String(t || '') }
const timeTag = t => t ? `<time datetime="${esc(t)}">${esc(when(t))}</time>` : ''

// a field address: a.b[2].c[key=value&key2=value2].d  (a filter takes the first record of a list whose fields equal the values)
function get(obj, field) {
    if (!field) return obj
    let cur = obj, parent = null
    for (const part of field.match(/[^.[\]]+|\[[^\]]*\]/g) || []) {
        if (cur == null) return { value: undefined, parent }
        parent = cur
        if (part[0] !== '[') { cur = cur[part]; continue }
        const inner = part.slice(1, -1)
        if (/^\d+$/.test(inner)) { cur = cur[+inner]; continue }
        const conds = inner.split('&').map(c => { const i = c.indexOf('='); return [c.slice(0, i), c.slice(i + 1)] })
        cur = Array.isArray(cur) ? cur.find(x => x && conds.every(([k, v]) => String(x[k]) === v)) : undefined
    }
    return { value: cur, parent }
}
const short = (v, n = 260) => { const s = typeof v === 'string' ? v : JSON.stringify(v); return s === undefined ? '' : s.length > n ? s.slice(0, n - 1) + '…' : s }

const slugs = fs.existsSync(path.join(ROOT, 'stories')) ? fs.readdirSync(path.join(ROOT, 'stories')).filter(d => fs.existsSync(path.join(ROOT, 'stories', d, 'story.json'))).sort() : []
const problems = [], index = []
const write = (rel, data) => { const f = path.join(OUT, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, data) }

for (const slug of slugs) {
    const S = J(`stories/${slug}/story.json`), INC = `incidents/${S.incident}/`, UP = '../../'
    const SIG = file(INC + 'data/signals.json'), G = file(INC + 'data/decisions/graph.json')
    const rows = Object.fromEntries((SIG?.items || []).map(x => [x.id, x])), edges = Object.fromEntries((G?.edges || []).map(x => [x.id, x]))
    const bad = (c, m) => problems.push(`${slug} ${c}: ${m}`)
    // where a file of this site is shown: its viewer when the library has made one (tools/library-view.mjs), else the file itself
    const shown = rel => OUT && fs.existsSync(path.join(OUT, 'view', rel + '.md')) ? `view/${rel}.html` : rel.replace(/(^|\/)README\.md$/, '$1index.html').replace(/\.md$/, '.html')
    const byId = Object.fromEntries(S.claims.map(c => [c.id, c]))
    const order = S.sections.flatMap(s => s.claims)
    for (const id of order) if (!byId[id]) bad(id, 'in a section, not in claims')
    for (const c of S.claims) if (!order.includes(c.id)) bad(c.id, 'a claim in no section')

    function resolve(c, s) {
        if (s.kind === 'row') {
            const r = rows[s.id]; if (!r) { bad(c.id, `no timeline row ${s.id}`); return { ...s, ok: false } }
            return { ...s, ok: true, href: `${INC}timeline.html#${s.id}`, row_label: r.label, row_kind: r.kind, at_utc: r.at, text: r.text, outside: (r.sources || []).map(x => outside(x.url)).filter(Boolean), superseded_by: (SIG.items.find(x => x.supersedes === s.id) || {}).id || null }
        }
        if (s.kind === 'edge') {
            const e = edges[s.id]; if (!e) { bad(c.id, `no decision edge ${s.id}`); return { ...s, ok: false } }
            return { ...s, ok: true, href: shown(INC + 'data/decisions/graph.json'), file: INC + 'data/decisions/graph.json', edge_label: e.label, at_utc: e.at, text: e.decision, by: e.by, read_utc: e.read, outside: [outside(e.source)].filter(Boolean) }
        }
        if (s.kind === 'data') {
            const f = file(s.file); if (f === undefined) { bad(c.id, `no file ${s.file}`); return { ...s, ok: false } }
            const r = { ...s, ok: true, href: shown(s.file), raw: s.file }
            if (typeof f === 'string') return r   // a document: the note says what it is cited for
            const { value, parent } = get(f, s.field)
            if (value === undefined) { bad(c.id, `${s.file}: nothing at ${s.field}`); return { ...r, ok: false } }
            r.value = value
            r.read_utc = (s.read_field ? get(f, s.read_field).value : null) || (parent && !Array.isArray(parent) && (parent.read_utc || parent.read)) || f.read_utc || f.updated || f.written_utc || f.made_at || null
            r.kept_by = f.by || f.updated_by || null
            const u = s.url_field ? get(f, s.url_field).value : (parent && !Array.isArray(parent) && (parent.source || parent.url)) || (typeof f.source === 'string' ? f.source : null)
            r.outside = [outside(u)].filter(Boolean)
            if ('expect' in s && JSON.stringify(value) !== JSON.stringify(s.expect)) { r.moved = true; bad(c.id, `${s.file} ${s.field}: was ${short(s.expect, 80)}, is now ${short(value, 80)}`) }
            if (s.contains) for (const needle of s.contains) if (!String(value).includes(needle)) { r.moved = true; bad(c.id, `${s.file} ${s.field}: no longer contains "${short(needle, 60)}"`) }
            return r
        }
        bad(c.id, `unknown support kind ${s.kind}`); return { ...s, ok: false }
    }
    const LABELS = new Set(['fact', 'evidence', 'hypothesis'])
    const claims = S.claims.map(c => {
        if (!LABELS.has(c.label)) bad(c.id, `label ${c.label}`)
        if (!c.said_by) bad(c.id, 'no said_by')
        if (!c.read_utc) bad(c.id, 'no read_utc')
        if (c.label === 'hypothesis' && !c.confidence) bad(c.id, 'a hypothesis without its confidence')
        for (const d of [...(c.derived_from || []), ...(c.qualified_by || [])]) if (!byId[d]) bad(c.id, `points at no claim ${d}`)
        if (!(c.supports || []).length && !(c.derived_from || []).length) bad(c.id, 'no support: not in the story')
        const supports = (c.supports || []).map(s => resolve(c, s))
        return { ...c, supports, moved: supports.some(s => s.moved), unsupported: supports.some(s => !s.ok) }
    })
    const cById = Object.fromEntries(claims.map(c => [c.id, c]))
    // the official warnings in force, stated first (a story about the weather): resolved now, read again in the browser
    const W = S.warnings_in_force ? file(S.warnings_in_force.file) : null
    const TYPE = { 'Vento': 'wind', 'Precipitação': 'rain', 'Agitação Marítima': 'sea state', 'Trovoada': 'thunderstorms', 'Nevoeiro': 'fog', 'Neve': 'snow' }
    const warn = W ? (W[S.warnings_in_force.list] || []).filter(x => S.warnings_in_force.levels.includes(x.level)).map(x => ({ type: x.type, type_en: TYPE[x.type] || x.type, level: x.level, start_utc: x.start_utc, end_utc: x.end_utc, text_pt: x.text_pt, sent_utc: x.sent_utc, source: x.source, read_utc: x.read_utc })) : []
    if (S.warnings_in_force && !W) bad('warnings', `no file ${S.warnings_in_force.file}`)
    const counts = { fact: 0, evidence: 0, hypothesis: 0 }; for (const c of claims) counts[c.label]++
    const last = S.record[S.record.length - 1], newIds = new Set([...(last.claims_added || []), ...(last.claims_changed || [])])
    const firstTelling = S.record.length === 1
    index.push({ id: slug, title: S.title, state: S.state, standfirst: S.standfirst, written_utc: S.written_utc, updated: S.updated, based_on_read_utc: S.based_on_read_utc, claims: claims.length, ...counts, moved: claims.filter(c => c.moved).length, page: `stories/${slug}/index.html`, graph: `stories/${slug}/story.json`, by: S.by })
    if (CHECK) continue

    // ---------------------------------------------------------------- the page (HTML, one line, in the frame's mount)
    const leave = u => `<a class="st-out" href="${esc(u)}" rel="noopener external">${esc(host(u))}<span> (leaves this site)</span></a>`
    const supHtml = s => {
        if (!s.ok) return `<li class="st-miss"><b>not found</b> ${esc(s.kind)} ${esc(s.id || s.file + ' ' + (s.field || ''))}</li>`
        if (s.kind === 'row') return `<li><b>timeline row</b> <a href="${UP}${esc(s.href)}"><code>${esc(s.id)}</code></a> <span class="lbl l-${esc(s.row_label)}">${esc(s.row_label)}</span> <span class="st-t">${timeTag(s.at_utc)}</span>${s.superseded_by ? ` <i>superseded by <a href="${UP}${esc(INC)}timeline.html#${esc(s.superseded_by)}"><code>${esc(s.superseded_by)}</code></a></i>` : ''}<q>${esc(short(s.text, 420))}</q>${s.outside.length ? `<span class="st-outs">Its source: ${s.outside.map(leave).join(', ')}</span>` : ''}</li>`
        if (s.kind === 'edge') return `<li><b>decision edge</b> <a href="${UP}${esc(s.href)}"><code>${esc(s.id)}</code></a> <span class="lbl l-${esc(s.edge_label)}">${esc(s.edge_label)}</span> <span class="st-t">${timeTag(s.at_utc)}</span><q>${esc(short(s.text, 300))}</q><span class="st-t">read ${timeTag(s.read_utc)}</span>${s.outside.length ? `<span class="st-outs">Its source: ${s.outside.map(leave).join(', ')}</span>` : ''}</li>`
        const name = s.file.split('/').slice(-2).join('/')
        return `<li${s.moved ? ' class="st-moved"' : ''}><b>data</b> <a href="${UP}${esc(s.href)}">${esc(name)}</a>${s.field ? ` <code>${esc(s.field)}</code>` : ''}${'value' in s ? `<q class="st-v">${esc(short(s.value))}</q>` : ''}${s.note ? `<span class="st-note">${esc(s.note)}</span>` : ''}${s.moved ? `<strong class="st-flag">The data has moved since this sentence was written${'expect' in s ? `: it said ${esc(short(s.expect, 120))}` : ''}.</strong>` : ('expect' in s || s.contains) ? `<span class="st-okv">says what the sentence was written on</span>` : ''}<span class="st-t">${s.read_utc ? `read ${timeTag(s.read_utc)}` : ''}${s.kept_by ? ` · kept by ${esc(s.kept_by)}` : ''}</span>${(s.outside || []).length ? `<span class="st-outs">Its source: ${s.outside.map(leave).join(', ')}</span>` : ''}</li>`
    }
    const chip = c => c.voice ? `<span class="lbl l-evidence">evidence</span><span class="lbl l-voice">said aloud</span>` : `<span class="lbl l-${c.label}">${c.label}</span>${c.model ? '<span class="lbl st-model">a model</span>' : ''}${c.derived ? '<span class="lbl st-derived">our comparison</span>' : ''}`
    const refs = (ids, word) => (ids || []).length ? `<span class="st-rel">${word} ${ids.map(i => `<a href="#${esc(i)}"><code>${esc(i)}</code></a>`).join(', ')}</span>` : ''
    const claimHtml = c => `<div class="st-claim st-${c.label}${c.voice ? ' st-voice' : ''}${c.moved ? ' st-stale' : ''}${newIds.has(c.id) && !firstTelling ? ' st-new' : ''}" id="${esc(c.id)}" data-label="${c.label}">` +
        `<p class="st-s">${chip(c)} ${esc(c.text)} <a class="st-id" href="#${esc(c.id)}" title="Link to this sentence"><code>${esc(c.id)}</code></a>${newIds.has(c.id) && !firstTelling ? '<span class="lbl st-chg">changed in the last telling</span>' : ''}</p>` +
        (c.moved ? `<p class="st-flag">A value this sentence was written on has moved in the data room. The sentence is kept as written until the story is retold; open its support for what the data says now.</p>` : '') +
        `<p class="st-who prov"><span class="st-by">${esc(c.said_by)}</span>${c.confidence ? `<span class="st-conf"> · confidence: ${esc(c.confidence)}</span>` : ''}<span class="st-t">${c.at_utc ? ` · said or sent ${timeTag(c.at_utc)}` : ''} · read ${timeTag(c.read_utc)}</span>${refs(c.derived_from, ' · derived from')}${refs(c.qualified_by, ' · read with')}</p>` +
        (c.supports.length ? `<details class="st-sup"><summary>Support (${c.supports.length})</summary><ul>${c.supports.map(supHtml).join('')}</ul>${(c.tested_by || []).length ? `<p class="st-note">To be tested by: ${c.tested_by.map(t => `<a href="${UP}${esc(shown(t.file))}">${esc(t.file.split('/').pop())}</a> <code>${esc(t.field)}</code>`).join(', ')}</p>` : ''}</details>` : '') + `</div>`
    const warnFile = S.warnings_in_force ? S.warnings_in_force.file : ''
    const warnHtml = warn.length ? `<section class="st-warn" id="st-warn" data-api="${UP}api/v1/${esc(S.incident)}/${esc(warnFile.split('/data/')[1] || '')}" data-list="${esc(S.warnings_in_force.list)}" data-levels="${esc(S.warnings_in_force.levels.join(','))}" data-built="${esc(warn.map(x => [x.type, x.level, x.start_utc, x.end_utc, x.text_pt].join('|')).join('~'))}"><h2>IPMA's warnings in force for the Lisbon district</h2><ul>${warn.map(x => `<li><span class="lvl ${esc(x.level)}">${esc(x.level)} · ${esc(x.type_en)}</span> <span class="st-ww">${timeTag(x.start_utc)} to ${timeTag(x.end_utc)}</span> <q lang="pt">${esc(x.text_pt)}</q>${x.sent_utc ? ` <span class="prov">sent by IPMA ${timeTag(x.sent_utc)}</span>` : ''}</li>`).join('')}</ul><p class="prov">Source: <a href="${UP}${esc(shown(warnFile))}">warnings.json</a>, read at IPMA ${timeTag(warn[0].read_utc)}; ${leave(warn[0].source)}. <span id="st-live"></span></p><p class="meta"><strong>Not a warning service.</strong> This page makes no forecast and gives no advice. For warnings follow <a href="https://www.ipma.pt/" rel="noopener external">IPMA</a> and <a href="https://prociv.gov.pt/" rel="noopener external">ANEPC</a>.</p></section>` : ''
    const toggles = `<form class="st-toggles" id="st-toggles" aria-label="What this page shows"><label><input type="checkbox" data-t="sources" checked> Sources</label><label><input type="checkbox" data-t="times" checked> Times</label><label><input type="checkbox" data-t="hyp" checked> Hypothesis layer</label><label><input type="checkbox" data-t="chg"> What changed since</label><button type="button" id="st-open">Open every support</button><output>${claims.length} sentences: ${counts.fact} fact, ${counts.evidence} evidence, ${counts.hypothesis} hypothesis</output></form>`
    const record = `<section class="st-record" id="record"><h2>How this story has changed</h2><ol>${[...S.record].reverse().map(r => `<li>${timeTag(r.at_utc)} ${esc(r.what)}${(r.claims_changed || []).length ? ` Changed: ${r.claims_changed.map(i => `<a href="#${esc(i)}"><code>${esc(i)}</code></a>`).join(', ')}.` : ''}${S.record.length > 1 && (r.claims_added || []).length ? ` Added: ${r.claims_added.map(i => `<a href="#${esc(i)}"><code>${esc(i)}</code></a>`).join(', ')}.` : ''}${(r.claims_removed || []).length ? ` Removed: ${r.claims_removed.map(i => `<code>${esc(i)}</code>`).join(', ')}.` : ''}</li>`).join('')}</ol></section>`
    const html = `<div class="st" id="story" data-slug="${esc(slug)}"><header class="st-head"><p class="kicker">Story · ${esc(S.state)}</p><h1>${esc(S.title)}</h1><p class="st-stand">${esc(S.standfirst)}</p><p class="prov">Written ${timeTag(S.written_utc)} by ${esc(S.by)} on the data read at ${timeTag(S.based_on_read_utc)}. Nothing here is new reporting: every sentence rests on the <a href="${UP}${esc(INC)}timeline.html">timeline</a> or a file of the <a href="${UP}datasets.html">data room</a>. The story as data: <a href="story.json">story.json</a>, <a href="resolved.json">resolved.json</a>; as plain text: <a href="story.html">story.md</a>.</p></header>${warnHtml}${toggles}` +
        S.sections.map(s => `<section class="st-sec${s.layer === 'hypothesis' ? ' st-layer-hyp' : ''}" id="${esc(s.id)}"><h2>${esc(s.title)}</h2>${s.layer === 'hypothesis' ? '<p class="st-note">Analysis by this site\'s meteorologist: a hypothesis with its confidence, never IPMA\'s forecast and not advice.</p>' : ''}${s.claims.map(id => claimHtml(cById[id])).join('')}</section>`).join('') +
        `<section class="st-sec" id="not-known"><h2>What is not known</h2><ul class="st-nk">${S.not_known.map(n => `<li>${esc(n.text)}${n.watch ? ` <span class="prov">Watched in <a href="${UP}${esc(shown(n.watch))}">${esc(n.watch.split('/').pop())}</a></span>` : ''}</li>`).join('')}</ul></section>${record}</div>`
    if (/\n/.test(html)) bad('page', 'a newline in the mount')

    // ---------------------------------------------------------------- the same story as plain linked text (story.md) and the page's own text
    const keptWhen = t => { const m = t.match(/^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)/); return `${+m[3]} ${['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][+m[2] - 1]} ${m[1]}, ${m[4]}:${m[5]} UTC` }
    const kept = `> Kept by ${S.by}, ${keptWhen(S.updated)}`
    const mdSup = s => !s.ok ? `not found: ${s.id || s.file}` : s.kind === 'row' ? `row [${s.id}](${UP}${INC}timeline.md#${s.id}) (${s.row_label})` : s.kind === 'edge' ? `decision edge \`${s.id}\` in [graph.json](${UP}${s.file})` : `[${s.file.split('/').pop()}](${UP}${s.raw})${s.field ? ` \`${s.field}\`` : ''}${s.moved ? ' (THE DATA HAS MOVED since this sentence was written)' : ''}`
    const mdClaim = c => `- **${c.label}${c.voice ? ', said aloud' : ''}${c.model ? ', a model' : ''}${c.derived ? ', our comparison' : ''}** \`${c.id}\` ${c.text}\n  ${c.said_by}${c.confidence ? `; confidence: ${c.confidence}` : ''}${c.at_utc ? `; said or sent ${when(c.at_utc)}` : ''}; read ${when(c.read_utc)}.${c.supports.length ? ` Support: ${c.supports.map(mdSup).join('; ')}.` : ''}${(c.derived_from || []).length ? ` Derived from ${c.derived_from.map(i => '`' + i + '`').join(', ')}.` : ''}`
    const storyMd = `# ${S.title} (as text)\n\n${kept}\n\n**Not a warning service.** For warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). This page makes no forecast and gives no advice of its own.\n\n${S.standfirst}\n\nState: **${S.state}**. Written ${when(S.written_utc)} on the data read at ${when(S.based_on_read_utc)}. The page with toggles: [index](index.md). The graph: [story.json](story.json).\n\n## IPMA's warnings in force for the Lisbon district\n\n${warn.map(x => `- **${x.level} · ${x.type_en}**: ${when(x.start_utc)} to ${when(x.end_utc)}: "${x.text_pt}"${x.sent_utc ? ` (sent by IPMA ${when(x.sent_utc)})` : ''}. Read at [IPMA](${x.source}) ${when(x.read_utc)}, kept in [warnings.json](${UP}${warnFile}).`).join('\n')}\n\n` +
        S.sections.map(s => `## ${s.title}\n\n${s.layer === 'hypothesis' ? "Analysis by this site's meteorologist: a hypothesis with its confidence, never IPMA's forecast and not advice.\n\n" : ''}${s.claims.map(id => mdClaim(cById[id])).join('\n')}`).join('\n\n') +
        `\n\n## What is not known\n\n${S.not_known.map(n => `- ${n.text}`).join('\n')}\n\n## How this story has changed\n\n${[...S.record].reverse().map(r => `- ${when(r.at_utc)}: ${r.what}`).join('\n')}\n`
    const pageMd = `---\ntitle: ${S.title}\nsummary: ${S.standfirst.replace(/\n/g, ' ')} Not a warning service.\nmount: ${html}\nhead: <link rel="stylesheet" href="${UP}app/stories/story.css"><script src="${UP}app/stories/story.js" defer></script>\n---\n${kept}\n\n## How to read this page\n\n- Every sentence above carries its label: **fact** (read from the body that decides or warns), **evidence** (reported by others, with the source) or **hypothesis** (analysis, with its confidence). Words said on air and not in a written record are marked *said aloud*; a model's output is marked *a model*; a sentence that sets two items of the data room side by side is marked *our comparison* and takes the weakest label among them.\n- **Support** under a sentence opens what it rests on: the timeline row, the field of the data file with the value it holds now, the decision edge; then the outside address, marked as leaving this site.\n- The switches show or hide sources, times, the hypothesis layer and what changed since the last telling. Nothing is removed from the data: [story.json](story.json) has all of it.\n- The page is rebuilt on every push from [story.json](story.json) by \`tools/stories-build.mjs\`. Each support is resolved again; if a field no longer says what a sentence was written on, the page says so beside that sentence.\n- The same story as plain linked text: [story.md](story.md). All stories: [stories](../index.md).\n\n**Not a warning service.** For warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/).\n`
    write(`stories/${slug}/index.md`, pageMd)
    write(`stories/${slug}/story.md`, storyMd)
    write(`stories/${slug}/resolved.json`, JSON.stringify({ about: 'stories/' + slug + '/story.json with every support resolved against the data room when the site was built (tools/stories-build.mjs). moved: a field no longer says what the sentence was written on.', by: S.by, updated: S.updated, id: slug, title: S.title, state: S.state, based_on_read_utc: S.based_on_read_utc, warnings_in_force: warn, sections: S.sections, claims, not_known: S.not_known, record: S.record }, null, 1) + '\n')
}

if (CHECK) {
    for (const p of problems) console.log('FAIL ' + p)
    console.log(problems.length ? `stories: ${problems.length} problem(s)` : `stories: OK, ${index.length} stor${index.length === 1 ? 'y' : 'ies'}, ${index.reduce((n, s) => n + s.claims, 0)} claims, every support resolves and says what it was written on`)
    process.exit(problems.length ? 1 : 0)
}
// the list: the tracked stories/index.md with its marker line replaced by the table
const stub = fs.existsSync(path.join(ROOT, 'stories/index.md')) ? fs.readFileSync(path.join(ROOT, 'stories/index.md'), 'utf8') : '# Stories\n\nThe list is written here when the site is built.\n'
const table = index.length ? `| Story | State | Written | Sentences | Graph |\n|---|---|---|---|---|\n` + index.map(s => `| [**${s.title}**](${s.id}/index.md) ${s.standfirst} | ${s.state}${s.moved ? ` (${s.moved} sentence${s.moved === 1 ? '' : 's'} behind the data)` : ''} | ${when(s.updated)}, on the data read ${when(s.based_on_read_utc)} | ${s.claims}: ${s.fact} fact, ${s.evidence} evidence, ${s.hypothesis} hypothesis | [story.json](${s.id}/story.json), [as text](${s.id}/story.md) |`).join('\n') : 'No story yet.'
write('stories/index.md', stub.replace(/^The list is written here when the site is built\.$/m, table))
write('stories/index.json', JSON.stringify({ about: 'The stories of this site: each a graph of claims (story.json) with its page. States: developing, standing, superseded.', by: 'incident.stories@web-summit.dinis', updated: index.map(s => s.updated).sort().pop() || null, stories: index }, null, 1) + '\n')
for (const p of problems) console.error('stories-build: ' + p)
