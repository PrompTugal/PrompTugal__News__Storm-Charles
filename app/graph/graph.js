// The graph page (/app/graph/): the storm's graph (data/graph/storm.json) drawn with Silvio's engine through
// engine.js, with the same graph always available as a list, so nothing depends on WebGL or on another site.
// incident.graph@web-summit.dinis. Everything shown is read from JSON; text is set as text, never as HTML.
(function () {
    'use strict'
    const root = document.getElementById('graph'), BASE = root.dataset.base
    // the page inside the mount element: static markup, no data in it (data is always set as text, below)
    root.innerHTML = "<p class=\"kicker\">The map of the storm</p><h1>Who decided and warned what, what followed what, and where each thing was read</h1><p class=\"meta\"><span id=\"g-asof\">Reading the graph…</span>. Built from the incident's JSON, never by hand. <a href=\"../../data/graph/index.html\">The ontology on one page</a> · <a href=\"../../data/query/index.html\">Query it with SQL</a> · <a href=\"#how-this-page-works\">How this page works</a>.</p>" +
        "<div class=\"chips\" id=\"g-types\" aria-label=\"Kinds of thing: press to hide or show\"></div>\n" +
        "<div class=\"chips\" id=\"g-labels\" aria-label=\"Labels and scope: press to hide or show\"></div>\n" +
        "<div class=\"q-bar\"><button type=\"button\" class=\"small\" id=\"g-fit\">Fit all</button><span id=\"g-count\" class=\"meta\" role=\"status\"></span><span class=\"meta\">Drag to turn, scroll to zoom, press a node to read it. Shape says the kind of thing (the chips above). Colour: blue is a decision; red, orange and yellow are IPMA's warning levels and nothing else; grey is everything else. A link with moving dots is a hypothesis; a fact's link is a plain line, evidence a fainter one.</span></div>\n" +
        "<div class=\"g-layout\">\n" +
        "<div class=\"g-stage\" id=\"g-stage\"><div class=\"g-canvas\" id=\"g-canvas\"></div><div class=\"g-msg\" id=\"g-msg\">Loading the 3D engine (1.6 MB, from web-summit.sgit.ai)… The same graph is in the list below.</div></div>\n" +
        "<aside class=\"g-panel\" id=\"g-panel\" aria-live=\"polite\"><p class=\"meta\">Press a node, or pick one from the list below.</p></aside>\n" +
        "</div>\n" +
        "<h2 class=\"sec\" id=\"lead-times\">Lead times: how far ahead could we have known?</h2>\n" +
        "<p class=\"meta\" id=\"g-line-note\">Every warning and decision with a time known to the minute, on one line of time (UTC = Lisbon time). Between two rows: the time that passed. On the right: how long before the first red warning starts in Lisbon. The bar on the left is blue for a decision, IPMA's level colour for a warning that has a level (the level is written in the row), grey for any other warning. For IPMA's colour warnings the time is when IPMA sent the message. Order, not cause. <a href=\"../../data/graph/tables/timeline.json\">As JSON</a> · <a href=\"../../data/query/index.html?example=lead-times\">as a query</a>.</p>\n" +
        "<ol class=\"g-line\" id=\"g-line\"></ol>\n" +
        "<h2 class=\"sec\">The same graph as a list</h2>\n" +
        "<div class=\"g-list\" id=\"g-list\"></div>\n" +
        "<p class=\"meta\">The files: <a href=\"../../data/graph/storm.json\">storm.json</a> (nodes and edges), <a href=\"../../data/graph/ontology.json\">ontology.json</a>, and the tables under <a href=\"../../data/graph/index.html\">data/graph/</a>.</p>"

    const $ = id => document.getElementById(id)
    const el = (tag, props = {}, kids = []) => { const e = document.createElement(tag); for (const [k, v] of Object.entries(props)) k === 'class' ? e.className = v : k === 'text' ? e.textContent = v : e.setAttribute(k, v); for (const k of [].concat(kids)) e.append(k); return e }
    const TYPES = ['Actor', 'Decision', 'Warning', 'Signal', 'Source', 'Place', 'Dataset', 'Agent']
    // design/README.md, rules 3 and 4: red, orange and yellow are IPMA's levels only, so only a warning with a level wears
    // them; a decision is the site's blue (--focus); every other kind is a grey. What KIND a node is, its shape says.
    const SHAPE = { Actor: 'circle', Decision: 'diamond', Warning: 'triangle', Signal: 'ring', Source: 'square', Place: 'hexagon', Dataset: 'frame', Agent: 'plus' }
    const SHAPE_WORD = { circle: 'circle', diamond: 'diamond', triangle: 'triangle', ring: 'ring', square: 'square', hexagon: 'hexagon', frame: 'frame', plus: 'cross' }
    const tokenOf = n => n.type === 'Decision' ? '--focus' : n.type === 'Warning' ? (/^(red|orange|yellow)$/.test(n.level || '') ? '--' + n.level : '--ink-2') : n.type === 'Actor' ? '--ink' : n.type === 'Source' ? '--wait' : '--ink-2'
    const tok = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim()
    const mark = n => { const s = el('span', { class: 'g-ico', style: `color:var(${tokenOf(n)})` }); s.append(window.StormGraph.icon(SHAPE[n.type])); return s }
    const LABELS = ['fact', 'evidence', 'hypothesis']
    const off = { types: new Set(), labels: new Set(), elsewhere: true }
    let storm = null, byId = new Map(), out = new Map(), inn = new Map(), g = null, tables = {}

    // a node with no link (a source listed but not yet cited) is in the list, not in the 3D view: alone, it only pushes the rest away
    const visible = n => n.degree > 0 && !off.types.has(n.type) && !off.labels.has(n.label) && !(off.elsewhere && n.type === 'Warning' && n.phase === 'in_force' && n.area !== 'LSB') && !(off.elsewhere && n.type === 'Place' && n.code !== 'LSB' && n.code !== 'PT-mainland')
    const apply = () => { if (g) g.show(visible); $('g-count').textContent = `${storm.nodes.filter(visible).length} of ${storm.nodes.length} nodes drawn (${storm.nodes.filter(n => !n.degree).length} have no link yet: they are in the list)` }

    function chip(text, colour, n, pressed, on) {
        const b = el('button', { type: 'button', 'aria-pressed': String(pressed) }, [colour || '', el('span', { text }), el('span', { class: 'n', text: String(n) })])
        b.addEventListener('click', () => { const p = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', String(p)); on(p); apply() })
        return b
    }
    function chips() {
        const t = $('g-types'), l = $('g-labels')
        for (const k of TYPES) t.append(chip(k, mark({ type: k }), storm.nodes.filter(n => n.type === k).length, true, p => p ? off.types.delete(k) : off.types.add(k)))
        for (const k of LABELS) l.append(chip(k, null, storm.nodes.filter(n => n.label === k).length, true, p => p ? off.labels.delete(k) : off.labels.add(k)))
        l.append(chip('warnings outside Lisbon', null, storm.nodes.filter(n => n.type === 'Warning' && n.phase === 'in_force' && n.area !== 'LSB').length, false, p => { off.elsewhere = !p }))
    }
    const originHref = o => { if (!o) return null; const f = (o.startsWith('/') ? o.slice(1) : storm.origin_base + o).split('#')[0]; return BASE + f }
    function pick(n) {
        const p = $('g-panel'); p.textContent = ''
        p.append(el('span', { class: 'g-type' }, [mark(n), n.type + (n.kind ? ' · ' + n.kind : '') + (n.phase ? ' · ' + (n.phase === 'cap' ? 'IPMA message' : n.phase.replace('_', ' ')) : '')]))
        const row = (tables[n.id] || {}), full = row.decision || row.text || n.name
        p.append(el('h2', { text: full }))
        const dl = el('dl'), add = (k, v) => { if (v == null || v === '') return; dl.append(el('dt', { text: k }), el('dd', {}, [v])) }
        add('label', el('span', { class: 'lab ' + n.label, text: n.label }))
        if (n.type === 'Warning' && n.level) add('IPMA level', el('span', { class: 'lvl ' + n.level, text: n.level }))
        add('when', n.at ? n.at.replace('T', ' ').replace('Z', ' UTC') : n.starts ? `${n.starts.slice(0, 16).replace('T', ' ')} to ${n.ends.slice(0, 16).replace('T', ' ')} UTC` : null)
        add('status', n.status && n.type !== 'Signal' ? n.status.replace('_', ' ') : null)
        let h = n.source; try { h = new URL(n.source).hostname.replace(/^www\./, '') } catch { }
        add('source', el('a', { href: n.source, rel: 'noopener', text: h + ' ↗' }))
        add('read', (n.read || '').replace('T', ' ').replace('Z', ' UTC') + (n.read_by ? ', by ' + n.read_by.split(' ')[0] : ''))
        const oh = originHref(n.origin); add('built from', oh ? el('a', { href: oh, text: n.origin.replace(/^\//, '') }) : null)
        p.append(dl)
        if (row.note) p.append(el('p', { class: 'meta', text: row.note }))
        const links = [...(out.get(n.id) || []).map(e => [e.rel + ' →', e.to, e]), ...(inn.get(n.id) || []).map(e => ['← ' + e.rel, e.from, e])]
        p.append(el('p', { class: 'meta', text: `${links.length} link${links.length === 1 ? '' : 's'}` }))
        const ul = el('ul')
        for (const [rel, id, e] of links) {
            const m = byId.get(id); if (!m) continue
            const b = el('button', { type: 'button', text: m.name.length > 90 ? m.name.slice(0, 89) + '…' : m.name })
            b.addEventListener('click', () => { pick(m); if (g && !g.focus(m.id)) $('g-count').textContent = 'That node is hidden by the filters above.' })
            ul.append(el('li', {}, [el('small', { text: `${rel} ${m.type}${e.lead_minutes != null ? ' · ' + e.lead_minutes + ' min later' : ''} · ${e.label}` }), b]))
        }
        p.append(ul)
    }
    function list() {
        const box = $('g-list')
        for (const t of TYPES) {
            const ns = storm.nodes.filter(n => n.type === t).sort((a, b) => (a.at || a.starts || '').localeCompare(b.at || b.starts || '') || a.name.localeCompare(b.name))
            const ul = el('ul'); for (const n of ns) { const b = el('button', { type: 'button', class: 'small', text: 'show' }); b.addEventListener('click', () => { pick(n); g && g.focus(n.id); $('g-panel').scrollIntoView({ block: 'nearest' }) }); ul.append(el('li', {}, [(n.at ? n.at.slice(5, 16).replace('T', ' ') + ' · ' : '') + n.name + ' ', el('span', { class: 'lab ' + n.label, text: n.label }), ' ', b])) }
            box.append(el('details', {}, [el('summary', {}, [el('span', { class: 'g-type' }, [mark({ type: t }), `${t} (${SHAPE_WORD[SHAPE[t]]}): ${ns.length}`])]), ul]))
        }
    }
    const dur = h => { if (h == null) return ''; const m = Math.round(Math.abs(h) * 60), d = Math.floor(m / 1440), hh = Math.floor((m % 1440) / 60), mm = m % 60; return (d ? d + ' d ' : '') + (hh ? hh + ' h ' : '') + (mm || (!d && !hh) ? mm + ' min' : '').trim() }
    const DAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    function line(rows) {
        const ol = $('g-line')
        let prev = null
        for (const r of rows) {
            // the gap from the two times themselves (to the minute), not from the rounded hours
            const gap = prev === null ? null : Math.round((r.at_epoch - prev) / 60) / 60; prev = r.at_epoch
            if (gap !== null) ol.append(el('li', { class: 'gap' }, [el('span', { text: gap === 0 ? 'at the same time' : '+ ' + dur(gap) })]))
            const when = new Date(r.at_epoch * 1000), b = el('button', { type: 'button', text: r.what.length > 150 ? r.what.slice(0, 149) + '…' : r.what })
            b.addEventListener('click', () => { const n = byId.get(r.id); if (n) { pick(n); g && g.focus(n.id); $('g-panel').scrollIntoView({ block: 'nearest', behavior: 'smooth' }) } })
            let h = r.source; try { h = new URL(r.source).hostname.replace(/^www\./, '') } catch { }
            ol.append(el('li', { class: 'ev ' + r.kind + (r.level ? ' ' + r.level : '') }, [
                el('time', { datetime: r.at, text: `${DAY[when.getUTCDay()]} ${r.at.slice(11, 16)}` }),
                el('div', {}, [el('b', { text: r.who || '' }), ' ', el('span', { class: 'lab ' + r.label, text: r.label }), r.level ? ' ' : '', r.level ? el('span', { class: 'lvl ' + r.level, text: r.level }) : '', el('br'), b,
                    el('small', {}, [r.time_is + ' · ', el('a', { href: r.source, rel: 'noopener', text: h + ' ↗' }), r.h_before_effect != null ? ` · ${dur(r.h_before_effect)} ${r.h_before_effect < 0 ? 'after' : 'before'} it takes effect` : ''])]),
                el('span', { class: 'ahead', text: r.h_before_red_starts == null ? '' : dur(r.h_before_red_starts) + (r.h_before_red_starts < 0 ? ' after red starts' : ' before red starts') })]))
        }
    }
    async function boot() {
        const msg = $('g-msg')
        try {
            const get = async u => { const r = await fetch(u, { cache: 'no-cache' }); if (!r.ok) throw new Error(u + ': HTTP ' + r.status); return r.json() }
            const [s, src, more, tl, d, w, sg] = await Promise.all([get(BASE + 'data/graph/storm.json'), get(BASE + 'data/graph/storm-sources.json'), get(BASE + 'data/graph/storm-elsewhere.json'), get(BASE + 'data/graph/tables/timeline.json'), ...['decisions', 'warnings', 'signals'].map(t => get(BASE + `data/graph/tables/${t}.json`))])
            storm = { ...s, nodes: s.nodes.concat(src.nodes, more.nodes), edges: s.edges.concat(src.edges, more.edges) }; for (const t of [d, w, sg]) for (const r of t.rows) tables[r.id] = r
            for (const n of storm.nodes) byId.set(n.id, n)
            for (const e of storm.edges) { (out.get(e.from) || out.set(e.from, []).get(e.from)).push(e); (inn.get(e.to) || inn.set(e.to, []).get(e.to)).push(e) }
            $('g-asof').textContent = `${storm.nodes.length} nodes, ${storm.edges.length} edges, data as of ${storm.as_of.replace('T', ' ').replace('Z', ' UTC')}`
            chips(); list(); line(tl.rows)
            const first = byId.get('decision:websummit-wednesday') || storm.nodes[0]; pick(first)
        } catch (e) { msg.textContent = 'The graph could not be read: ' + (e && e.message || e); return }
        try {
            g = await window.StormGraph.mount($('g-canvas'), window.StormGraph.fromStorm(storm), { style: () => ({ background: tok('--surface-2'), outline: tok('--surface-2'), link: tok('--ink-2'), linkMuted: tok('--line-2'), linkPicked: tok('--ink'), linkHypothesis: tok('--focus') }), colourOf: n => tok(tokenOf(n)), shapeOf: n => SHAPE[n.type], onPick: pick, tip: n => `${n.type} · ${n.label}${n.at ? ' · ' + n.at.slice(5, 16).replace('T', ' ') : ''}` })
            msg.hidden = true; apply()
            // the stage follows the theme: when it changes (the Theme button, or the system), read the tokens again
            new MutationObserver(() => g.restyle()).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
            try { matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => g.restyle()) } catch { }
            window.__tools = Object.assign(window.__tools || {}, { graph: { focus: id => { const n = byId.get(id); if (n) pick(n); return g.focus(id) }, node: id => byId.get(id), counts: () => ({ nodes: storm.nodes.length, edges: storm.edges.length }) } })
            document.dispatchEvent(new CustomEvent('tool:ready', { detail: { tool: 'graph' } }))
        } catch (e) { msg.hidden = false; msg.textContent = 'The 3D view is not available here (' + (e && e.message || e) + '). The same graph is in the list below and in the panel.'; apply() }
    }
    $('g-fit').addEventListener('click', () => g && g.fit())
    boot()
})()
