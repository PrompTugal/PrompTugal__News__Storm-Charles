// Shared by tools/entities-make.mjs and tools/entities-build.mjs (incident.entities@web-summit.dinis): reading the nodes and
// matching their names in text. Zero dependencies.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
export const SITE = 'https://storm-charles.promptugal.news/'
export const readJson = f => JSON.parse(fs.readFileSync(f, 'utf8'))
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

export function loadNodes(root = ROOT) {
    const dir = path.join(root, 'entities'), nodes = []
    if (!fs.existsSync(dir)) return nodes
    for (const t of fs.readdirSync(dir, { withFileTypes: true })) {
        if (!t.isDirectory()) continue
        for (const f of fs.readdirSync(path.join(dir, t.name))) if (f.endsWith('.json')) nodes.push(readJson(path.join(dir, t.name, f)))
    }
    return nodes.sort((a, b) => a.id < b.id ? -1 : 1)
}

// One matcher for every known name. A name with a capital is matched exactly; a name all in lower case in any case.
// The longest name wins. `html: true` matches text as the build escapes it (an apostrophe is &#39;).
export function matcher(nodes, { html = false } = {}) {
    const byName = new Map()   // lower-cased name -> [{ id, type, name, exact }]
    for (const n of nodes) for (const name of new Set([n.name, ...(n.also || [])])) {
        if (!name || n.match?.none?.includes(name)) continue
        const k = name.toLowerCase()
        if (!byName.has(k)) byName.set(k, [])
        byName.get(k).push({ id: n.id, type: n.type, name, exact: name !== k })
    }
    const names = [...byName.keys()].sort((a, b) => b.length - a.length)
    const rx = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/['’]/g, html ? "(?:&#39;|'|’)" : "['’]").replace(/ /g, '\\s+')
    if (!names.length) return { find: () => [], names: byName }
    const re = new RegExp(`(?<![\\p{L}\\p{N}_@/.#-])(?:${names.map(rx).join('|')})(?![\\p{L}\\p{N}_]|[@/-][\\p{L}\\p{N}]|\\.[\\p{L}\\p{N}])`, 'giu')
    const norm = s => s.replace(/&#39;|’/g, "'").replace(/\s+/g, ' ')
    function find(text) {
        const out = []
        re.lastIndex = 0
        let m
        while ((m = re.exec(text))) {
            const got = norm(m[0]), cands = byName.get(got.toLowerCase()) || []
            const hit = cands.find(c => !c.exact || c.name === got)
            if (!hit) { re.lastIndex = m.index + 1; continue }
            out.push({ index: m.index, length: m[0].length, text: m[0], id: hit.id, type: hit.type })
        }
        return out
    }
    return { find, names: byName }
}

// incident.archivist@'s captures: an outside address -> the id of our latest capture of it (its page is evidence/<id>.html)
export function captures(root = ROOT) {
    const m = new Map()
    try { for (const a of readJson(path.join(root, 'evidence/index.json')).addresses || []) if (a.url && a.latest && fs.existsSync(path.join(root, 'evidence', a.latest + '.md'))) { m.set(a.url, a.latest); m.set(a.url.replace(/\/$/, ''), a.latest) } } catch { }
    return { get: u => m.get(u) || m.get(String(u).replace(/\/$/, '')) || null, size: m.size }
}
