// What the graph's pages share (incident.graph@web-summit.dinis): reading the graph's files, the look of a node
// (shape = kind; colour by the design rules), small DOM helpers. Text from data is always set as text.
window.StormData = (function () {
    'use strict'
    const el = (tag, props = {}, kids = []) => { const e = document.createElement(tag); for (const [k, v] of Object.entries(props)) k === 'class' ? e.className = v : k === 'text' ? e.textContent = v : e.setAttribute(k, v); for (const k of [].concat(kids)) e.append(k); return e }
    const get = async u => { const r = await fetch(u, { cache: 'no-cache' }); if (!r.ok) throw new Error(u + ': HTTP ' + r.status); return r.json() }
    const TYPES = ['Actor', 'Decision', 'Warning', 'Signal', 'Source', 'Place', 'Dataset', 'Agent']
    // design/README.md, rules 3 and 4: red, orange and yellow are IPMA's levels only, so only a warning with a level wears
    // them; a decision is the site's blue (--focus); every other kind is a grey. What KIND a node is, its shape says.
    const SHAPE = { Actor: 'circle', Decision: 'diamond', Warning: 'triangle', Signal: 'ring', Source: 'square', Place: 'hexagon', Dataset: 'frame', Agent: 'plus' }
    const SHAPE_WORD = { circle: 'circle', diamond: 'diamond', triangle: 'triangle', ring: 'ring', square: 'square', hexagon: 'hexagon', frame: 'frame', plus: 'cross' }
    const tokenOf = n => n.type === 'Decision' ? '--focus' : n.type === 'Warning' ? (/^(red|orange|yellow)$/.test(n.level || '') ? '--' + n.level : '--ink-2') : n.type === 'Actor' ? '--ink' : n.type === 'Source' ? '--wait' : '--ink-2'
    const tok = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim()
    const mark = n => { const s = el('span', { class: 'g-ico', style: `color:var(${tokenOf(n)})` }); s.append(window.StormGraph.icon(SHAPE[n.type])); return s }
    // the graph is in parts (storm.json names the others in `more`): one graph for the reader
    async function load(base) {
        const [s, ont] = await Promise.all([get(base + 'data/graph/storm.json'), get(base + 'data/graph/ontology.json')])
        const more = await Promise.all((Array.isArray(s.more) ? s.more : []).map(f => get(base + f)))
        const storm = { ...s, nodes: s.nodes.concat(...more.map(m => m.nodes)), edges: s.edges.concat(...more.map(m => m.edges)) }
        const byId = new Map(storm.nodes.map(n => [n.id, n])), out = new Map(), inn = new Map()
        for (const e of storm.edges) { (out.get(e.from) || out.set(e.from, []).get(e.from)).push(e); (inn.get(e.to) || inn.set(e.to, []).get(e.to)).push(e) }
        // the crossings into the site's other graphs and our captures (data/graph/crossings.json): the page works without them
        const x = await get(base + 'data/graph/crossings.json').catch(() => ({ edges: [], captures: {} })), cross = new Map()
        for (const c of x.edges || []) (cross.get(c.from) || cross.set(c.from, []).get(c.from)).push(c)
        return { storm, ont, byId, out, inn, cross, captures: x.captures || {}, table: async t => { const j = await get(base + `data/graph/tables/${t}.json`); for (const f of j.more || []) j.rows = j.rows.concat((await get(base + 'data/graph/tables/' + f)).rows); return j } }
    }
    const when = t => t ? t.replace('T', ' ').replace(/(:\d\d)?Z$/, m => (m.length > 1 ? m.slice(0, 3) : '') + ' UTC') : ''
    const dur = h => { if (h == null) return ''; const m = Math.round(Math.abs(h) * 60), d = Math.floor(m / 1440), hh = Math.floor((m % 1440) / 60), mm = m % 60; return ((d ? d + ' d ' : '') + (hh ? hh + ' h ' : '') + (mm || (!d && !hh) ? mm + ' min' : '')).trim() }
    const hostOf = u => { try { return new URL(u).hostname.replace(/^www\./, '') } catch { return u } }
    // a link that leaves this site says so: its title names where it goes, and the site's lens marks it with an arrow
    const outLink = (u, text) => el('a', { href: u, rel: 'noopener', class: 'out', title: 'Leaves this site: ' + u, text: text || hostOf(u) })
    const nodeHref = (base, id) => base + 'app/graph/index.html?node=' + encodeURIComponent(id)
    const originHref = (base, storm, o) => { if (!o) return null; return base + (o.startsWith('/') ? o.slice(1) : storm.origin_base + o).split('#')[0] }
    const short = (s, n = 90) => s && s.length > n ? s.slice(0, n - 1) + '…' : s
    return { el, get, load, TYPES, SHAPE, SHAPE_WORD, tokenOf, tok, mark, when, dur, hostOf, outLink, nodeHref, originHref, short }
})()
