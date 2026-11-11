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
    // Words first: the text is read word by word, and only a word that begins some name is tried further, against a small
    // regex (a trie of the names that begin with that word; every a-z letter a class, so the longest wins and pick() then holds
    // a name with a capital to its exact writing). One regex over all the names cost a try at every character of every page.
    const piece = ch => ch === ' ' ? '\\s+' : (ch === "'" || ch === enc('’')) ? (html ? `(?:&#39;|'|${enc('’')})` : `(?:'|${enc('’')})`) : ch.replace(/[.*+?^${}()|[\]\\\/-]/g, '\\$&')
    const emit = t => { const alts = [...t.kids].map(([k, v]) => k + emit(v)); if (!alts.length) return ''; const body = alts.length === 1 && !t.end ? alts[0] : `(?:${alts.join('|')})`; return t.end ? (alts.length === 1 ? `(?:${alts[0]})?` : body + '?') : body }
    const WORD = bytes ? /(?:[A-Za-z0-9]|[\xc3-\xc9][\x80-\xbf])+/g : /[A-Za-z0-9À-ÖØ-öø-ÿ]+/g, FIRST = new RegExp('^(?:' + WORD.source + ')')
    const lowA = s => s.replace(/[A-Z]/g, c => c.toLowerCase())
    const tries = new Map()
    for (const [nm] of names) {
        const key = lowA((nm.match(FIRST) || [''])[0]); if (!key) continue   // a-z only: an accented byte keeps its code
        if (!tries.has(key)) tries.set(key, { kids: new Map(), end: false })
        let t = tries.get(key)
        for (const ch of nm.split(enc('’')).flatMap((x, i) => i ? [enc('’'), ...x] : [...x])) { const k = /^[A-Za-z]$/.test(ch) ? `[${ch.toLowerCase()}${ch.toUpperCase()}]` : piece(ch); if (!t.kids.has(k)) t.kids.set(k, { kids: new Map(), end: false }); t = t.kids.get(k) }
        t.end = true
    }
    const byWord = new Map([...tries].map(([key, t]) => [key, new RegExp(`(?<!${bytes ? '[A-Za-z0-9_@/.#-]|[\\xc3-\\xc9][\\x80-\\xbf]' : `[${L}_@/.#-]`})${emit(t)}(?![${L}_]|[@/-][${L}]|\\.[${L}])`, 'y')]))
    const curly = enc('’'), norm = s => s.replace(/&#39;/g, "'").split(curly).join("'").replace(/\s+/g, ' ')
    const low = s => s.replace(/[A-Z]/g, c => c.toLowerCase())
    const one = s => forms.get(s) || loose.get(low(s)) || (s = norm(s), forms.get(s) || loose.get(low(s)))
    // the hit for a match, or for its longest beginning that is a name written as it must be ("Government of portugal" -> "Government")
    const pick = s => { for (;;) { const c = one(s); if (c) return { c, text: s }; const cut = s.search(/\s+\S*$/); if (cut <= 0) return null; s = s.slice(0, cut) } }
    // every hit in text[from, to), in order, to `each(index, text as written, node)`; `each` may use find
    // For pages (bytes): the words are found by a loop over the character codes, and a word is only cut out and looked up when
    // a hash of its letters is that of some name's first word (a table), so nearly every word costs one pass over its letters.
    const gate = new Uint8Array(65536)   // a hash of a name's first word (a-z lower-cased) -> seen
    const lc = c => c >= 65 && c <= 90 ? c + 32 : c
    const byHash = new Map()   // the full hash -> the regexes of the first words with that hash (nearly always one)
    for (const [key, re] of byWord) { let h = 0; for (let k = 0; k < key.length; k++) h = (h * 31 + lc(key.charCodeAt(k))) | 0; gate[h & 0xffff] = 1; if (!byHash.has(h)) byHash.set(h, []); byHash.get(h).push(re) }
    const memo = new Map()   // what was matched -> its hit (the same few hundred writings recur)
    function scanBytes(text, from, to, each) {
        let i = from
        while (i < to) {
            let c = text.charCodeAt(i)
            if (!((c >= 97 && c <= 122) || (c >= 65 && c <= 90) || (c >= 48 && c <= 57) || (c >= 0xc3 && c <= 0xc9))) {
                if (c === 60 && html) { const gt = text.indexOf('>', i); i = gt < 0 ? to : gt + 1 } else i++   // a tag is stepped over whole: no name is linked inside one
                continue
            }
            const start = i; let h = 0
            for (;;) {
                h = (h * 31 + (c >= 65 && c <= 90 ? c + 32 : c)) | 0
                if (c >= 0xc3 && c <= 0xc9) { i++; h = (h * 31 + text.charCodeAt(i)) | 0 }
                c = text.charCodeAt(++i)
                if (!((c >= 97 && c <= 122) || (c >= 65 && c <= 90) || (c >= 48 && c <= 57) || (c >= 0xc3 && c <= 0xc9))) break
            }
            if (!gate[h & 0xffff]) continue
            const res = byHash.get(h); if (!res) continue
            let m = null; for (const re of res) { re.lastIndex = start; if ((m = re.exec(text))) break }
            if (!m) continue
            let hit = memo.get(m[0]); if (hit === undefined) { hit = pick(m[0]); memo.set(m[0], hit) }
            if (!hit) continue
            i = start + hit.text.length
            each(start, hit.text, hit.c)
        }
    }
    function scan(text, from, to, each) {
        if (bytes) return scanBytes(text, from, to, each)
        let pos = from
        for (;;) {
            WORD.lastIndex = pos
            const w = WORD.exec(text); if (!w || w.index >= to) return
            pos = w.index + w[0].length
            const re = byWord.get(lowA(w[0])); if (!re) continue
            re.lastIndex = w.index
            const m = re.exec(text); if (!m) continue
            const hit = pick(m[0]); if (!hit) continue
            pos = w.index + hit.text.length
            each(w.index, hit.text, hit.c)
        }
    }
    function find(text) { const out = []; scan(text, 0, text.length, (index, txt, c) => out.push({ index, length: txt.length, text: txt, id: c.id, type: c.type, href: c.href, own: c.own })); return out }
    return { find, scan, names: byName }
}

// incident.archivist@'s captures: an outside address -> the id of our latest capture of it (its page is evidence/<id>.html)
export function captures(root = ROOT) {
    const m = new Map()
    try { for (const a of readJson(path.join(root, 'evidence/index.json')).addresses || []) if (a.url && a.latest && (a.latest_status == null || a.latest_status === 200) && fs.existsSync(path.join(root, 'evidence', a.latest + '.md'))) { m.set(a.url, a.latest); m.set(a.url.replace(/\/$/, ''), a.latest) } } catch { }
    return { get: u => m.get(u) || m.get(String(u).replace(/\/$/, '')) || null, size: m.size }
}

// The neighbouring graphs, joined and not copied (the conductor, 11 Nov: each world keeps its own types and verbs; a link crosses).
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
    // incident.sources@'s bodies (sources/sources.json): a body that has no page of its own is on the sources page, under its group
    try {
        const S = readJson(path.join(root, 'sources/sources.json'))
        for (const s of S.sources || []) {
            // every body has its own address, sources/<id>/ (made at build time), and `entity` where incident.sources@ matched a node here
            const base = String(s.name || '').replace(/\s*\(.*$/, '').trim(), page = s.page || `${s.id}/index.html`
            if (base.length > 2 && /[A-Z]/.test(base)) out.push({ id: `sources/${s.id}`, type: 'source', kind: s.group, entity: s.entity || null, name: base, also: (s.also || []).filter(x => x !== base && x.length > 2 && /[A-Z]/.test(x)), hosts: s.hosts || [], href: `sources/${page}`, md: `sources/${page.replace(/index\.html$/, 'README.md').replace(/\.html$/, '.md')}`, summary: [s.kind, s.publishes && `Publishes: ${s.publishes}`, s.we_take && `We take: ${s.we_take}`, s.licence?.status && `Licence: ${s.licence.status}${s.licence.summary ? ` (${s.licence.summary})` : ''}`].filter(Boolean).join('. ') })
        }
    } catch { }
    return out
}
