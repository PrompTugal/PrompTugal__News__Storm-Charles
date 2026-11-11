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
export function matcher(nodes, { html = false, bytes = false } = {}) {
    const enc = s => bytes ? Buffer.from(s, 'utf8').toString('latin1') : s   // bytes: the text is a page read as latin1 (its UTF-8 bytes)
    const byName = new Map()   // lower-cased name -> [{ id, type, name, exact }]
    for (const n of nodes) for (const name of new Set([n.name, ...(n.also || [])])) {
        if (!name || n.match?.none?.includes(name)) continue
        const k = name.toLowerCase()
        if (!byName.has(k)) byName.set(k, [])
        byName.get(k).push({ id: n.id, type: n.type, name, exact: name !== k, href: n.href || `entities/${n.id}.html`, own: !n.href })
    }
    // One case-sensitive regex, built once, with no unicode-property classes (they made it the slowest step of the gate): a name
    // with a capital is written as it is; each a-z letter of a lower-case name is written as a class ([aA]), so it is found in any case without the i flag.
    // in bytes, a letter with an accent is two bytes (a lead byte c3 to c9, then one more); other bytes above 7f are punctuation (… ” —)
    const L = bytes ? 'A-Za-z0-9\\xc3-\\xc9' : 'A-Za-zÀ-ÖØ-öø-ÿ0-9', cap = s => s.charAt(0).toUpperCase() + s.slice(1)
    const forms = new Map()   // the text as it may be written -> the node
    const loose = new Map()   // a lower-case name (matched in any case of its a-z letters) -> the node
    for (const [k, list] of byName) for (const c of list) { if (!c.exact && !loose.has(enc(k))) loose.set(enc(k), c) }
    // (a name with a capital whose lower-case form is also a name is left to the lower-case one: one branch, so the longest still wins)
    for (const [k, list] of byName) for (const c of list) if (c.exact && !loose.has(enc(k)) && !forms.has(enc(c.name))) forms.set(enc(c.name), c)
    const names = [...loose.keys()].map(n => [n, true]).concat([...forms.keys()].map(n => [n, false]))
    if (!names.length) return { find: () => [], names: byName }
    // the names as one trie, so each position in the text is tried against a few branches, not against every name
    const piece = ch => ch === ' ' ? '\\s+' : (ch === "'" || ch === enc('’')) ? (html ? `(?:&#39;|'|${enc('’')})` : `(?:'|${enc('’')})`) : ch.replace(/[.*+?^${}()|[\]\\\/-]/g, '\\$&')
    const trie = { kids: new Map(), end: false }
    for (const [nm, any] of names) { let t = trie; for (const ch of nm.split(enc('’')).flatMap((x, i) => i ? [enc('’'), ...x] : [...x])) { const k = /^[A-Za-z]$/.test(ch) ? `[${ch.toLowerCase()}${ch.toUpperCase()}]` : piece(ch);   // every a-z letter is a class, so all names share one trie and the longest wins; pick() then holds a name with a capital to its exact writing
            if (!t.kids.has(k)) t.kids.set(k, { kids: new Map(), end: false }); t = t.kids.get(k) } t.end = true }
    const emit = t => { const alts = [...t.kids].map(([k, v]) => k + emit(v)); if (!alts.length) return ''; const body = alts.length === 1 && !t.end ? alts[0] : `(?:${alts.join('|')})`; return t.end ? (alts.length === 1 ? `(?:${alts[0]})?` : body + '?') : body }
    const re = new RegExp(`(?<!${bytes ? '[A-Za-z0-9_@/.#-]|[\\xc3-\\xc9][\\x80-\\xbf]' : `[${L}_@/.#-]`})${emit(trie)}(?![${L}_]|[@/-][${L}]|\\.[${L}])`, 'g')
    const curly = enc('’'), norm = s => s.replace(/&#39;/g, "'").split(curly).join("'").replace(/\s+/g, ' ')
    const low = s => s.replace(/[A-Z]/g, c => c.toLowerCase())
    const one = s => forms.get(s) || loose.get(low(s)) || (s = norm(s), forms.get(s) || loose.get(low(s)))
    // the hit for a match, or for its longest beginning that is a name written as it must be ("Government of portugal" -> "Government")
    const pick = s => { for (;;) { const c = one(s); if (c) return { c, text: s }; const cut = s.search(/\s+\S*$/); if (cut <= 0) return null; s = s.slice(0, cut) } }
    function find(text) {
        const out = []
        re.lastIndex = 0
        let m
        while ((m = re.exec(text))) { const hit = pick(m[0]); if (hit) { out.push({ index: m.index, length: hit.text.length, text: hit.text, id: hit.c.id, type: hit.c.type, href: hit.c.href, own: hit.c.own }); re.lastIndex = m.index + hit.text.length } else re.lastIndex = m.index + 1 }
        return out
    }
    // the same, over a stretch of a larger string, calling back for each hit (the linker's single scan of a page)
    function scan(text, from, to, each) { re.lastIndex = from; let m; while ((m = re.exec(text)) && m.index < to) { const hit = pick(m[0]), next = hit ? m.index + hit.text.length : m.index + 1; if (hit) each(m.index, hit.text, hit.c); re.lastIndex = next } }   // (each may use find)
    return { find, scan, names: byName }
}

// incident.archivist@'s captures: an outside address -> the id of our latest capture of it (its page is evidence/<id>.html)
export function captures(root = ROOT) {
    const m = new Map()
    try { for (const a of readJson(path.join(root, 'evidence/index.json')).addresses || []) if (a.url && a.latest && fs.existsSync(path.join(root, 'evidence', a.latest + '.md'))) { m.set(a.url, a.latest); m.set(a.url.replace(/\/$/, ''), a.latest) } } catch { }
    return { get: u => m.get(u) || m.get(String(u).replace(/\/$/, '')) || null, size: m.size }
}

// incident.meteorology@'s nodes (meteorology/nodes/<type>.json; pages at meteorology/nodes/<id>.html): a graph of its own, with its
// own types and verbs. They are not copied into entities/: the linker links their names to their own pages, and a name both sides
// have stays with entities/ (whose page then points across). A bracket is dropped from a name; an acronym in a bracket is a name too.
export function neighbours(root = ROOT) {
    const out = [], dir = path.join(root, 'meteorology/nodes')
    if (!fs.existsSync(dir)) return out
    for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort()) {
        const j = readJson(path.join(dir, f))
        for (const n of j.nodes || []) {
            const base = String(n.name || '').replace(/\s*\(.*$/, '').trim(), br = (String(n.name).match(/\(([A-Z][A-Z0-9-]{2,})\)\s*$/) || [])[1]
            const names = [base, br, ...(n.also || [])].filter(x => x && x.length > 2 && /[A-Z]/.test(x))   // names with a capital only: matched exactly
            if (names.length) out.push({ id: `meteorology/${n.id}`, type: 'meteorology', kind: j.type || 'node', name: names[0], also: names.slice(1), href: `meteorology/nodes/${n.id}.html`, md: `meteorology/nodes/${n.id}.md`, summary: n.summary || '' })
        }
    }
    return out
}
