#!/usr/bin/env node
// Wikipedia watch (incident.media@web-summit.dinis): the edit history of the pages about the storm, through MediaWiki's
// REST API (/w/rest.php/v1/page/<title>/bare and /history). One request every 5 seconds; revision times and sizes only:
// editors' names and edit comments are dropped before anything is written.
//   node research/media/tools/wikipedia.mjs
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const OUT = path.join(ROOT, 'research/media/wikipedia.json')
const UA = 'media-watch-bot/0.1 (public pages only; single low-rate reader)'
const SINCE = '2026-11-01T00:00:00Z'      // history is read back to here (the storm was named after this)
const PAGES = [
    { wiki: 'pt', title: 'Depressão_Charles', what: 'the Portuguese article on the storm' },
    { wiki: 'en', title: 'Storm_Charles', what: 'English: a redirect, not an article' },
    { wiki: 'en', title: '2026–27_European_windstorm_season', what: 'English: the season article the redirect points to; Storm Charles is a section of it' },
    { wiki: 'pt', title: 'Tempestade_Charles', what: 'checked: a likely Portuguese title' },
    { wiki: 'es', title: 'Borrasca_Charles', what: 'checked: a likely Spanish title' }
]
const sleep = ms => new Promise(r => setTimeout(r, ms))
async function get(url) {
    for (let i = 0; i < 4; i++) {
        await sleep(5000 * (i + 1))
        const r = await fetch(url, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(30000) })
        if (r.status === 429) { console.error('429, waiting'); await sleep(30000); continue }
        return { status: r.status, json: r.status === 200 ? await r.json() : null }
    }
    return { status: 429, json: null }
}
const prev = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {}
const pages = []
for (const p of PAGES) {
    const base = `https://${p.wiki}.wikipedia.org/w/rest.php/v1/page/${encodeURIComponent(p.title)}`
    const read = new Date().toISOString().replace(/\.\d+Z$/, 'Z')
    const bare = await get(base + '/bare')
    const page = { wiki: p.wiki, title: p.title.replace(/_/g, ' '), url: `https://${p.wiki}.wikipedia.org/wiki/${encodeURIComponent(p.title)}`, what: p.what, exists: bare.status === 200, status: bare.status, read, label: 'evidence' }
    if (bare.status === 429) { const old = (prev.pages || []).find(x => x.url === page.url); pages.push(old || page); continue }
    if (bare.json) {
        page.page_id = bare.json.id
        page.latest_revision = bare.json.latest
        if (bare.json.redirect_target) page.redirects_to = decodeURIComponent(bare.json.redirect_target.replace(/^.*\/page\//, '').replace(/\/bare.*$/, '')).replace(/_/g, ' ')
        page.licence = bare.json.license && bare.json.license.title
        const revs = []
        let url = base + '/history', complete = true
        while (url) {
            const h = await get(url)
            if (!h.json) { complete = false; break }
            for (const r of h.json.revisions) revs.push({ id: r.id, at: r.timestamp, bytes: r.size, delta: r.delta, minor: r.minor || undefined })
            url = h.json.older && revs[revs.length - 1].at > SINCE ? h.json.older : null
            if (h.json.older && !url) complete = false
        }
        page.revisions_read = revs.length
        page.history_complete = complete
        page.history_since = complete ? undefined : SINCE
        page.first_revision_read = revs.length ? revs[revs.length - 1].at : undefined
        page.revisions = revs.filter(r => complete || r.at >= SINCE)
    }
    pages.push(page)
    console.error(`${page.wiki} ${page.title}: ${page.status}${page.revisions ? ', ' + page.revisions.length + ' revisions' : ''}`)
}
fs.writeFileSync(OUT, JSON.stringify({
    about: 'Wikipedia on Storm Charles: which pages exist (pt, en; es checked) and their edit history: revision id, time (UTC), size in bytes and change in bytes. Editors\' names and edit comments are not kept. Read through MediaWiki\'s REST API, one request every 5 seconds. Wikipedia is evidence (a tertiary source written by volunteers), never a fact here. Text of Wikipedia is CC BY-SA 4.0; none of it is copied in this file.',
    by: 'incident.media@web-summit.dinis', tool: 'research/media/tools/wikipedia.mjs', updated: new Date().toISOString().replace(/\.\d+Z$/, 'Z'), pages
}, null, 1) + '\n')
