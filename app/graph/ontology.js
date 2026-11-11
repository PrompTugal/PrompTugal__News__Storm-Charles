// The ontology, drawn (/app/graph/ontology/): the kinds of thing as shapes, the verbs as arrows between them, each
// verb with its inverse. Press a kind or a verb to read what it means, how many there are in the graph now, and
// examples that open in the graph. Read from data/graph/ontology.json and the graph itself. incident.graph@web-summit.dinis.
(function () {
    'use strict'
    const D = window.StormData, { el, TYPES, SHAPE, SHAPE_WORD } = D
    const root = document.getElementById('ontology'), BASE = root.dataset.base, NS = 'http://www.w3.org/2000/svg'
    root.innerHTML = '<p class="kicker">The ontology, drawn</p><h1 id="o-h1">The kinds of thing and the verbs between them, each verb with its inverse</h1>' +
        '<p class="meta" id="o-note">Reading…</p>' +
        '<div class="g-layout"><div class="o-stage"><svg id="o-svg" viewBox="0 0 760 560" role="img" aria-label="The kinds of thing and the verbs between them"></svg></div>' +
        '<aside class="g-panel" id="o-panel" aria-live="polite"><p class="meta">Press a kind of thing or a verb.</p></aside></div>' +
        '<h2 class="sec" id="verbs">The verbs</h2><div class="q-out" tabindex="0"><table id="o-verbs"></table></div>' +
        '<h2 class="sec" id="kinds">The kinds of thing</h2><div class="q-out" tabindex="0"><table id="o-kinds"></table></div>'
    const $ = id => document.getElementById(id), S = (tag, a = {}, kids = []) => { const e = document.createElementNS(NS, tag); for (const [k, v] of Object.entries(a)) e.setAttribute(k, v); for (const k of [].concat(kids)) e.append(k); return e }
    let G = null
    const pos = {}; TYPES.forEach((t, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / TYPES.length; pos[t] = [380 + 270 * Math.cos(a), 280 + 215 * Math.sin(a)] })
    const count = { type: t => G.storm.nodes.filter(n => n.type === t).length, verb: (v, a, b) => G.storm.edges.filter(e => e.rel === v && (!a || (G.byId.get(e.from) || {}).type === a) && (!b || (G.byId.get(e.to) || {}).type === b)).length }
    const nodeA = n => el('a', { href: D.nodeHref(BASE, n.id), text: D.short(n.name, 80) })
    function showType(t) {
        const o = G.ont.types[t], p = $('o-panel'); p.textContent = ''
        p.append(el('span', { class: 'g-type' }, [D.mark({ type: t }), `A kind of thing · drawn as a ${SHAPE_WORD[SHAPE[t]]}`]), el('h2', { text: t }), el('p', { text: o.what }))
        const dl = el('dl'), add = (k, v) => dl.append(el('dt', { text: k }), el('dd', {}, [v]))
        add('in the graph now', String(count.type(t))); add('id', el('code', { text: o.id })); add('built from', o.from)
        if (o.kinds) add('kinds', el('span', { text: Object.entries(o.kinds).map(([k, v]) => `${k}: ${v}`).join('; ') }))
        p.append(dl)
        const rel = Object.entries(G.ont.relations)
        const ul = el('ul'); for (const [v, r] of rel) { if (r.from.includes(t)) ul.append(el('li', {}, [el('a', { href: '#' + v, text: v }), ` → ${r.to.join(', ')}`])); if (r.to.includes(t)) ul.append(el('li', {}, [el('a', { href: '#' + v, text: r.inverse }), ` ← ${r.from.join(', ')}`])) }
        p.append(el('p', { class: 'meta', text: 'What it can do, and what can be done to it:' }), ul)
        const ex = G.storm.nodes.filter(n => n.type === t).sort((a, b) => (b.degree || 0) - (a.degree || 0)).slice(0, 6), ul2 = el('ul'); ex.forEach(n => ul2.append(el('li', {}, [nodeA(n)])))
        p.append(el('p', { class: 'meta', text: 'The most linked, each opening as its own graph:' }), ul2)
    }
    function showVerb(v) {
        const r = G.ont.relations[v], p = $('o-panel'); p.textContent = ''
        p.append(el('span', { class: 'g-type', text: 'A verb' }), el('h2', { text: `${v}  ⇄  ${r.inverse}` }), el('p', { text: r.what }))
        const dl = el('dl'), add = (k, x) => dl.append(el('dt', { text: k }), el('dd', {}, [x]))
        add('from', r.from.join(', ')); add('to', r.to.join(', ')); add('read the other way', r.inverse); add('in the graph now', String(count.verb(v)))
        if (r.attributes) add('carries', Object.entries(r.attributes).map(([k, x]) => `${k}: ${x}`).join('; '))
        p.append(dl)
        const ul = el('ul'); G.storm.edges.filter(e => e.rel === v).slice(0, 6).forEach(e => { const a = G.byId.get(e.from), b = G.byId.get(e.to); if (a && b) ul.append(el('li', {}, [nodeA(a), el('span', { class: 'g-verb', text: ` ${v} ` }), nodeA(b)])) })
        p.append(el('p', { class: 'meta', text: 'Examples:' }), ul)
    }
    function draw() {
        const svg = $('o-svg'); svg.textContent = ''
        svg.append(S('defs', {}, [S('marker', { id: 'o-arrow', viewBox: '0 0 10 10', refX: '9', refY: '5', markerWidth: '7', markerHeight: '7', orient: 'auto-start-reverse' }, [S('path', { d: 'M0 0L10 5L0 10z', class: 'o-head' })])]))
        // one arrow per (verb, from kind, to kind) that the ontology allows AND the graph has; pairs between the same two kinds fan out
        const seen = new Map()
        for (const [v, r] of Object.entries(G.ont.relations)) for (const a of r.from) for (const b of r.to) {
            const n = count.verb(v, a, b); if (!n) continue
            const key = [a, b].sort().join('|'), k = seen.get(key) || 0; seen.set(key, k + 1)
            const [x1, y1] = pos[a], [x2, y2] = pos[b]; let d, lx, ly
            if (a === b) { d = `M${x1 - 14} ${y1 - 22} C ${x1 - 70} ${y1 - 95}, ${x1 + 70} ${y1 - 95}, ${x1 + 14} ${y1 - 22}`; lx = x1; ly = y1 - 84 }
            else { const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy), off = (k % 2 ? -1 : 1) * (18 + 26 * Math.floor(k / 2)) * (a < b ? 1 : -1), cx = mx - dy / len * off * 2, cy = my + dx / len * off * 2, t = 30 / len
                d = `M${x1 + dx * t} ${y1 + dy * t} Q ${cx} ${cy} ${x2 - dx * t} ${y2 - dy * t}`; lx = (mx + cx) / 2; ly = (my + cy) / 2 }
            const g = S('a', { href: '#' + v, class: 'o-edge', 'aria-label': `${a} ${v} ${b}: ${n}` }, [S('path', { d, 'marker-end': 'url(#o-arrow)' }), S('text', { x: lx, y: ly, 'text-anchor': 'middle' }, [v])])
            g.addEventListener('click', () => showVerb(v)); svg.append(g)
        }
        for (const t of TYPES) {
            const [x, y] = pos[t], ic = window.StormGraph.icon(SHAPE[t]); ic.setAttribute('x', x - 13); ic.setAttribute('y', y - 13); ic.setAttribute('width', 26); ic.setAttribute('height', 26)
            const g = S('a', { href: '#' + t, class: 'o-node', style: `color:var(${D.tokenOf({ type: t })})`, 'aria-label': `${t}: ${count.type(t)}` }, [S('circle', { cx: x, cy: y, r: 24, class: 'o-halo' }), ic, S('text', { x, y: y + 42, 'text-anchor': 'middle' }, [`${t} · ${count.type(t)}`])])
            g.addEventListener('click', () => showType(t)); svg.append(g)
        }
        const vt = $('o-verbs'); vt.append(el('thead', {}, el('tr', {}, ['verb', 'inverse', 'from', 'to', 'meaning', 'in the graph'].map(h => el('th', { scope: 'col', text: h })))))
        const vb = el('tbody'); vt.append(vb)
        for (const [v, r] of Object.entries(G.ont.relations)) { const a = el('a', { href: '#' + v, id: v, text: v }); a.addEventListener('click', () => showVerb(v)); vb.append(el('tr', {}, [el('td', {}, [a]), el('td', { text: r.inverse }), el('td', { text: r.from.join(', ') }), el('td', { text: r.to.join(', ') }), el('td', { text: r.what }), el('td', { class: 'num', text: String(count.verb(v)) })])) }
        const kt = $('o-kinds'); kt.append(el('thead', {}, el('tr', {}, ['kind', 'drawn as', 'what it is', 'built from', 'in the graph'].map(h => el('th', { scope: 'col', text: h })))))
        const kb = el('tbody'); kt.append(kb)
        for (const t of TYPES) { const o = G.ont.types[t], a = el('a', { href: '#' + t, id: t }, [D.mark({ type: t }), ' ' + t]); a.addEventListener('click', () => showType(t)); kb.append(el('tr', {}, [el('td', {}, [a]), el('td', { text: SHAPE_WORD[SHAPE[t]] }), el('td', { text: o.what }), el('td', { text: o.from }), el('td', { class: 'num', text: String(count.type(t)) })])) }
    }
    (async () => {
        try {
            G = await D.load(BASE)
            $('o-note').textContent = `${G.ont.grammar} Every node and edge carries label, source, read and origin. Below: only the arrows the graph actually has now (${G.storm.nodes.length} things, ${G.storm.edges.length} links, as of ${D.when(G.storm.as_of)}).`
            $('o-h1').textContent = `${D.TYPES.length} kinds of thing, ${Object.keys(G.ont.relations).length} verbs, each with its inverse`
            draw(); const h = decodeURIComponent(location.hash.slice(1)); if (G.ont.relations[h]) showVerb(h); else showType(G.ont.types[h] ? h : 'Decision')
            addEventListener('hashchange', () => { const x = decodeURIComponent(location.hash.slice(1)); if (G.ont.relations[x]) showVerb(x); else if (G.ont.types[x]) showType(x) })
        } catch (e) { $('o-note').textContent = 'The ontology could not be read: ' + (e && e.message || e) }
    })()
})()
