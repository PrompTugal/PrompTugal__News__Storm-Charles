// The polite reader every tools/wikipedia-*.mjs shares. Read-only: nothing here edits or posts to Wikipedia.
// One request at a time, at least GAP ms apart, the action API with maxlag=5; a 429 or a maxlag answer waits
// (Retry-After, or 40 s) and is counted, so the status can say so. A generic client name, no personal details.
// Never asks for rvprop=user or userid: times, sizes, tags and edit summaries only.
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

export const AGENT = 'incident.wikipedia@web-summit.dinis'
export const UA = 'IncidentWikipediaReader/0.1 (read-only research; one request every 5 s; honours maxlag and Retry-After)'
export const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
export const DIR = path.join(ROOT, 'research/wikipedia')
export const GAP = Number(process.env.WIKI_GAP_MS || 5000)
export const stats = { requests: 0, waits_429: 0, waits_maxlag: 0, waited_s: 0, failed: 0 }

const sleep = ms => new Promise(r => setTimeout(r, ms))
let last = 0

export async function get(url, { tries = 6, json = true } = {}) {
  for (let i = 0; i < tries; i++) {
    const wait = last + GAP - Date.now()
    if (wait > 0) await sleep(wait)
    last = Date.now()
    stats.requests++
    let r
    try { r = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Encoding': 'gzip' }, signal: AbortSignal.timeout(40000) }) }
    catch (e) { stats.failed++; await sleep(10000); continue }
    if (r.status === 429 || r.status === 503) {
      const ra = Math.min(Number(r.headers.get('retry-after')) || 40, 120) + 3
      if (r.status === 429) stats.waits_429++; else stats.waits_maxlag++
      stats.waited_s += ra
      process.stderr.write(`  ${r.status} from ${new URL(url).host}: waiting ${ra} s\n`)
      await sleep(ra * 1000); continue
    }
    if (!r.ok) { stats.failed++; return { status: r.status, body: null } }
    if (!json) return { status: 200, body: await r.text() }
    const body = await r.json()
    if (body?.error?.code === 'maxlag') { stats.waits_maxlag++; stats.waited_s += 10; await sleep(10000); continue }
    return { status: 200, body }
  }
  stats.failed++
  return { status: 429, body: null }
}

// The action API of one wiki (host like "pt.wikipedia.org"); params as an object.
export async function api(host, params) {
  const q = new URLSearchParams({ format: 'json', formatversion: '2', maxlag: '5', ...params })
  const r = await get(`https://${host}/w/api.php?${q}`)
  return r.body
}

export const now = () => new Date().toISOString().replace(/\.\d+Z$/, 'Z')
export const sha256 = s => crypto.createHash('sha256').update(s).digest('hex')
export const readJson = (f, dflt) => { try { return JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8')) } catch { return dflt } }
export const writeJson = (f, o, dir = DIR) => {
  const p = path.join(dir, f); fs.mkdirSync(path.dirname(p), { recursive: true })
  const s = JSON.stringify(o, null, 1) + '\n'
  if (s.length > 250000) throw new Error(`${f} would be ${s.length} bytes: split it (256 KB limit)`)
  fs.writeFileSync(p, s)
}
export const pageUrl = (host, title) => `https://${host}/wiki/${encodeURIComponent(title.replace(/ /g, '_'))}`
export const oldidUrl = (host, title, oldid) => `https://${host}/w/index.php?title=${encodeURIComponent(title.replace(/ /g, '_'))}&oldid=${oldid}`
