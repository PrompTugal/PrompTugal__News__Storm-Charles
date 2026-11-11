#!/usr/bin/env node
// The timed entries inside the press live blogs (incident.media@web-summit.dinis). Node 18+, no dependencies.
//   MEDIA_RAW=<dir outside git> node research/media/tools/live.mjs   -> research/media/live-entries.json
// Reads each live blog once, takes each entry's own time and title, and KEEPS ONLY the entries about the keyed facts
// (facts.json). An entry's text is read to match it and is not kept; no author, e-mail or image is kept.
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { fileURLToPath } from 'url'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const M = path.join(ROOT, 'research/media')
const RAW = process.env.MEDIA_RAW; if (!RAW) { console.error('set MEDIA_RAW'); process.exit(1) }
fs.mkdirSync(RAW, { recursive: true })
const UA = 'media-watch-bot/0.1 (public pages only)'
const FACTS = JSON.parse(fs.readFileSync(path.join(M, 'facts.json'), 'utf8')).facts
const BLOGS = [
    { outlet: 'negocios', url: 'https://www.jornaldenegocios.pt/economia/detalhe/fiquem-em-casa-todos-os-que-puderem-escolas-e-servicos-publicos-encerrados-amanha-siga-ao-minuto', parse: negocios },
    { outlet: 'dn', url: 'https://www.dn.pt/sociedade/governo-decreta-situao-de-alerta-montenegro-avisa-que-devemos-passar-horas-difceis-amanh', parse: dn },
    { outlet: 'observador', url: 'https://observador.pt/liveblogs/manifestantes-detidos-no-porto-pronunciam-se-sobre-suspensao-provisoria-do-processo/', parse: dn },   // the slug is the page's first headline of the day; the page is Observador's running live blog, storm entries included
    { outlet: 'rtp', url: 'https://www.rtp.pt/noticias/pais/depressao-charles-esperado-agravamento-significativo-das-condicoes-meteorologicas_e1778024', parse: rtp }
]
const ent = s => (s || '').replace(/<[^>]+>/g, ' ').replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16))).replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&(\w+);/g, (m, n) => ({ amp: '&', quot: '"', nbsp: ' ', lt: '<', gt: '>', aacute: 'á', eacute: 'é', iacute: 'í', oacute: 'ó', uacute: 'ú', atilde: 'ã', otilde: 'õ', ccedil: 'ç', acirc: 'â', ecirc: 'ê', ocirc: 'ô', agrave: 'à', Aacute: 'Á', Eacute: 'É', ldquo: '“', rdquo: '”', ndash: '–' }[n] || m)).replace(/\s+/g, ' ').trim()
// Negócios: newest first, a clock time per entry (Lisbon = UTC in November); the day is found by walking back from the read.
function negocios(html, read) {
    const out = []; const day0 = new Date(read.slice(0, 10) + 'T00:00:00Z'), readMins = (Date.parse(read) - day0) / 60000
    for (const b of html.split(/<div id="eventoAoMinuto\d+" class="bloco_post">/).slice(1)) {
        const t = [...(b.match(/<div class="data_post">([\s\S]*?)<\/div>/) || [, ''])[1].matchAll(/(\d{1,2})h(\d{2})/g)].pop(); if (!t) continue
        const mins = +t[1] * 60 + +t[2]      // entries are not strictly in order; one printed later than the read belongs to the day before
        const title = ent((b.match(/<h2 class="title_post">([\s\S]*?)<\/h2>/) || [, ''])[1])
        const body = ent((b.split('class="texto_post"')[1] || '').slice(0, 6000))
        const day = mins > readMins + 10 ? new Date(day0 - 86400000) : day0
        out.push({ at: new Date(+day + mins * 60000).toISOString().replace('.000Z', 'Z'), title, body, time_from: 'the entry\'s printed clock time (Lisbon = UTC), on the day of our read' })
    }
    return out
}
function dn(html) {
    const out = []
    for (const m of html.matchAll(/<script[^>]*ld\+json[^>]*>([\s\S]*?)<\/script>/g)) { let d; try { d = JSON.parse(m[1]) } catch { continue }
        for (const o of [].concat(d).flatMap(x => x && x['@graph'] ? [x, ...x['@graph']] : [x])) for (const u of (o && o.liveBlogUpdate) || []) out.push({ at: new Date(u.datePublished).toISOString().replace('.000Z', 'Z'), url: typeof u.url === 'string' ? u.url : undefined, title: ent(u.headline), body: ent(u.articleBody || '').slice(0, 6000), time_from: 'the page\'s JSON-LD (liveBlogUpdate.datePublished)' }) }
    return out
}
function rtp(html) {
    const out = [], seen = new Set()
    for (const m of html.matchAll(/<a href="([^"]+#article_content_\d+)"[^>]*title="([^"]*)">\s*<div class="live-moments-block">[\s\S]{0,300}?datetime="([^"]+)"[^>]*pub-data="publicado (\d\d):(\d\d), (\d+) Novembro 2026"/g)) {
        if (seen.has(m[1])) continue; seen.add(m[1])
        out.push({ at: `2026-11-${m[6].padStart(2, '0')}T${m[4]}:${m[5]}:00Z`, modified: m[3], title: ent(m[2]), body: '', url: m[1], time_from: 'the entry\'s "publicado" time (Lisbon = UTC)' })
    }
    return out
}
const blogs = [], entries = []
const IDX = path.join(RAW, 'index.json'), idx = fs.existsSync(IDX) ? JSON.parse(fs.readFileSync(IDX, 'utf8')) : {}
for (const b of BLOGS) {
    const r = await fetch(b.url, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(40000) }); const html = await r.text()
    const read = new Date().toISOString().replace(/\.\d+Z$/, 'Z'), sha = crypto.createHash('sha256').update(html).digest('hex')
    fs.writeFileSync(path.join(RAW, 'live-' + sha.slice(0, 16) + '.html'), html)
    let all = r.status === 200 ? b.parse(html, read) : [], used = { read, sha }, note
    if (!all.length && idx[b.url] && fs.existsSync(path.join(RAW, idx[b.url].sha.slice(0, 16) + '.html'))) {
        // the page no longer prints a time per entry (after midnight Negócios prints the date; DN's JSON-LD comes and goes): use our earlier capture
        used = idx[b.url]; all = b.parse(fs.readFileSync(path.join(RAW, used.sha.slice(0, 16) + '.html'), 'utf8'), used.read)
        note = `entry times taken from our capture of ${used.read}: at ${read} the page no longer gave a time per entry`
    }
    const times = all.map(e => e.at).sort()
    blogs.push({ outlet: b.outlet, url: b.url, status: r.status, read: used.read, capture_sha256: used.sha, note, entries_read: all.length, first_entry: times[0] || null, last_entry: times[times.length - 1] || null })
    for (const e of all) for (const f of FACTS) {
        const re = new RegExp(f.live_pattern || f.pattern, 'i')
        if (e.at >= (f.from || f.primary_time) && e.at < (f.until || '2026-11-11T12:00:00Z') && re.test(e.title + (f.match_entry_text ? ' ' + e.body : '')))
            entries.push({ fact: f.id, outlet: b.outlet, at: e.at, title: e.title || '(entry without a title)', url: e.url || r.url, time_from: e.time_from, matched_in: re.test(e.title) ? 'title' : 'entry text (read, not kept)', label: 'evidence', read: used.read })
    }
    console.error(`${b.outlet}: ${r.status}, ${all.length} entries (${times[0]} to ${times[times.length - 1]})`)
    await new Promise(r => setTimeout(r, 1000))
}
// a page drops its entry times after midnight: keep what earlier reads timed
{ const OUTF = path.join(M, 'live-entries.json'), key = e => e.fact + '|' + e.outlet + '|' + e.at + '|' + e.title, have = new Set(entries.map(key))
  if (fs.existsSync(OUTF)) for (const e of JSON.parse(fs.readFileSync(OUTF, 'utf8')).entries || []) if (!have.has(key(e))) entries.push(e) }
entries.sort((a, b) => a.fact.localeCompare(b.fact) || a.at.localeCompare(b.at))
fs.writeFileSync(path.join(M, 'live-entries.json'), JSON.stringify({
    about: 'Timed entries inside the press live blogs on Storm Charles, for the keyed facts only (facts.json): the entry\'s own time (UTC), its title, the live blog\'s URL. An entry\'s text is read to match it and is not kept; no author is kept. Observador\'s storm entries are inside its general live blog of the day, whose address names another story (we missed it at first and said it had none: corrected 00:50 UTC, 11 November); Notícias ao Minuto\'s live page prints no time per entry. Evidence, not fact.',
    by: 'incident.media@web-summit.dinis', tool: 'research/media/tools/live.mjs', updated: new Date().toISOString().replace(/\.\d+Z$/, 'Z'), blogs, entries
}, null, 1) + '\n')
console.error(`${entries.length} entries on the keyed facts`)
