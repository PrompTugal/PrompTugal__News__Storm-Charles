// coverage.json's articles, kept in parts (incident.media@web-summit.dinis, 11 November 2026). Node 18+, no dependencies.
// The gate allows no file over 256 KB and the list passed it at 340 items. On disk: coverage.json keeps the header, the counts,
// `official`, `social` and `articles_files`; the items are in coverage/<day>T<HH>.json, one file per six hours (UTC) of the
// time each page gives (an item with no time goes by the time we read it). The boundaries never move, so a file changes only
// while its six hours are being written. loadCoverage gives back the whole thing with `articles`, as every tool expects it.
import fs from 'node:fs'
import path from 'node:path'
const part = a => { const t = a.published || a.read || '0000-00-00T00'; return `${t.slice(0, 10)}T${String(Math.floor(+t.slice(11, 13) / 6) * 6).padStart(2, '0')}` }
export function loadCoverage(M) {
    const f = path.join(M, 'coverage.json'); if (!fs.existsSync(f)) return {}
    const c = JSON.parse(fs.readFileSync(f, 'utf8')); if (!c.articles_files) return c
    const articles = c.articles_files.flatMap(p => JSON.parse(fs.readFileSync(path.join(M, p.file), 'utf8')).articles)
    const { articles_files, articles_note, articles_count, articles: slim, ...rest } = c
    return { ...rest, articles }
}
export function saveCoverage(M, c) {
    const { articles = [], ...rest } = c, by = {}, dir = path.join(M, 'coverage')
    for (const a of articles) (by[part(a)] ||= []).push(a)
    fs.mkdirSync(dir, { recursive: true })
    const files = Object.keys(by).sort().map(k => {
        const file = `coverage/${k}.json`, body = JSON.stringify({ about: `Press items on Storm Charles whose own time falls in the six hours from ${k}:00 UTC: one part of the list that coverage.json describes (articles_files). Evidence: what each outlet published, as its page gives it.`, by: 'incident.media@web-summit.dinis', updated: c.articles_updated || c.updated, part: k, count: by[k].length, articles: by[k] }, null, 1) + '\n'
        const full = path.join(M, file); if (!fs.existsSync(full) || JSON.stringify(JSON.parse(fs.readFileSync(full, 'utf8')).articles) !== JSON.stringify(by[k])) fs.writeFileSync(full, body)
        return { file, from: `${k}:00:00Z`, count: by[k].length }
    })
    for (const f of fs.readdirSync(dir)) if (f.endsWith('.json') && !files.some(x => x.file === 'coverage/' + f)) fs.unlinkSync(path.join(dir, f))
    // a short row per item stays here, one to a line, for readers that take `articles` from this file (tools/graph-build.mjs does, at build time)
    const SLIM = ['id', 'outlet', 'kind', 'lang', 'title', 'published', 'read', 'url', 'byline_kind', 'label', 'links_to_primary']
    const slim = articles.map(a => JSON.stringify(Object.fromEntries(SLIM.filter(k => a[k] !== undefined).map(k => [k, a[k]]))))
    const head = JSON.stringify({ ...rest, articles_note: 'The whole items (by-line as printed, where each field was read, the capture\'s sha256) are in the files of articles_files, relative to this folder: join their `articles`. `articles` here is a short row per item (id, outlet, kind, lang, title, published, read, url, byline_kind, label, links_to_primary), kept so that existing readers go on working; this file may hold at most 256 KB, so read the parts if you can: the short rows will be dropped when they no longer fit (about 500 items).', articles_count: articles.length, articles_files: files, articles: '@@' }, null, 1)
    fs.writeFileSync(path.join(M, 'coverage.json'), head.replace('"articles": "@@"', '"articles": [\n' + slim.join(',\n') + '\n ]') + '\n')
}
