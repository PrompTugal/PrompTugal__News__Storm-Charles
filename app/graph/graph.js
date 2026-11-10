// The graph page (/app/graph/): the storm's graph (data/graph/storm.json) drawn with Silvio's engine through
// engine.js, with the same graph always available as a list, so nothing depends on WebGL or on another site.
// incident.graph@web-summit.dinis. Everything shown is read from JSON; text is set as text, never as HTML.
(function () {
    'use strict'
    const root = document.getElementById('graph'), BASE = root.dataset.base
    const $ = id => document.getElementById(id)
    const el = (tag, props = {}, kids = []) => { const e = document.createElement(tag); for (const [k, v] of Object.entries(props)) k === 'class' ? e.className = v : k === 'text' ? e.textContent = v : e.setAttribute(k, v); for (const k of [].concat(kids)) e.append(k); return e }
    const css = getComputedStyle(document.documentElement)
    const TYPES = ['Actor', 'Decision', 'Warning', 'Signal', 'Source', 'Place', 'Dataset', 'Agent']
    const COL = Object.fromEntries(TYPES.map(t => [t, css.getPropertyValue('--g-' + t.toLowerCase()).trim() || '#888']))
    // on the dark stage the same hues, lighter, so each kind stays readable against it
    const STAGE = { Actor: '#6ea0ff', Decision: '#ff5d73', Warning: '#ffa23d', Signal: '#b592ff', Source: '#a3aebf', Place: '#4fd699', Dataset: '#41cfe0', Agent: '#ee7fd6' }
    const LABELS = ['fact', 'evidence', 'hypothesis']
    const off = { types: new Set(), labels: new Set(), elsewhere: true }
    let storm = null, byId = new Map(), out = new Map(), inn = new Map(), g = null, tables = {}

    // a node with no link (a source listed but not yet cited) is in the list, not in the 3D view: alone, it only pushes the rest away
    const visible = n => n.degree > 0 && !off.types.has(n.type) && !off.labels.has(n.label) && !(off.elsewhere && n.type === 'Warning' && n.phase === 'in_force' && n.area !== 'LSB') && !(off.elsewhere && n.type === 'Place' && n.code !== 'LSB' && n.code !== 'PT-mainland')
    const apply = () => { if (g) g.show(visible); $('g-count').textContent = `${storm.nodes.filter(visible).length} of ${storm.nodes.length} nodes drawn (${storm.nodes.filter(n => !n.degree).length} have no link yet: they are in the list)` }

    function chip(text, colour, n, pressed, on) {
        const b = el('button', { type: 'button', 'aria-pressed': String(pressed) }, [colour ? el('i', { style: `--c:${colour}` }) : '', el('span', { text }), el('span', { class: 'n', text: String(n) })])
        b.addEventListener('click', () => { const p = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', String(p)); on(p); apply() })
        return b
    }
    function chips() {
        const t = $('g-types'), l = $('g-labels')
        for (const k of TYPES) t.append(chip(k, COL[k], storm.nodes.filter(n => n.type === k).length, true, p => p ? off.types.delete(k) : off.types.add(k)))
        for (const k of LABELS) l.append(chip(k, null, storm.nodes.filter(n => n.label === k).length, true, p => p ? off.labels.delete(k) : off.labels.add(k)))
        l.append(chip('warnings outside Lisbon', null, storm.nodes.filter(n => n.type === 'Warning' && n.phase === 'in_force' && n.area !== 'LSB').length, false, p => { off.elsewhere = !p }))
    }
    const originHref = o => { if (!o) return null; const f = (o.startsWith('/') ? o.slice(1) : storm.origin_base + o).split('#')[0]; return BASE + f }
    function pick(n) {
        const p = $('g-panel'); p.textContent = ''
        p.append(el('span', { class: 'g-type' }, [el('i', { style: `--c:${COL[n.type]}` }), n.type + (n.kind ? ' · ' + n.kind : '') + (n.phase ? ' · ' + (n.phase === 'cap' ? 'IPMA message' : n.phase.replace('_', ' ')) : '')]))
        const row = (tables[n.id] || {}), full = row.decision || row.text || n.name
        p.append(el('h2', { text: full }))
        const dl = el('dl'), add = (k, v) => { if (v == null || v === '') return; dl.append(el('dt', { text: k }), el('dd', {}, [v])) }
        add('label', el('span', { class: 'lab ' + n.label, text: n.label }))
        add('when', n.at ? n.at.replace('T', ' ').replace('Z', ' UTC') : n.starts ? `${n.starts.slice(0, 16).replace('T', ' ')} to ${n.ends.slice(0, 16).replace('T', ' ')} UTC` : null)
        add('status', n.status && n.type !== 'Signal' ? n.status.replace('_', ' ') : null)
        add('level', n.level || null)
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
            box.append(el('details', {}, [el('summary', {}, [el('span', { class: 'g-type' }, [el('i', { style: `--c:${COL[t]}` }), `${t}: ${ns.length}`])]), ul]))
        }
    }
    async function boot() {
        const msg = $('g-msg')
        try {
            const get = async u => { const r = await fetch(u, { cache: 'no-cache' }); if (!r.ok) throw new Error(u + ': HTTP ' + r.status); return r.json() }
            const [s, more, d, w, sg] = await Promise.all([get(BASE + 'data/graph/storm.json'), get(BASE + 'data/graph/storm-elsewhere.json'), ...['decisions', 'warnings', 'signals'].map(t => get(BASE + `data/graph/tables/${t}.json`))])
            storm = { ...s, nodes: s.nodes.concat(more.nodes), edges: s.edges.concat(more.edges) }; for (const t of [d, w, sg]) for (const r of t.rows) tables[r.id] = r
            for (const n of storm.nodes) byId.set(n.id, n)
            for (const e of storm.edges) { (out.get(e.from) || out.set(e.from, []).get(e.from)).push(e); (inn.get(e.to) || inn.set(e.to, []).get(e.to)).push(e) }
            $('g-asof').textContent = `${storm.nodes.length} nodes, ${storm.edges.length} edges, data as of ${storm.as_of.replace('T', ' ').replace('Z', ' UTC')}`
            chips(); list()
            const first = byId.get('decision:websummit-wednesday') || storm.nodes[0]; pick(first)
        } catch (e) { msg.textContent = 'The graph could not be read: ' + (e && e.message || e); return }
        try {
            g = await window.StormGraph.mount($('g-canvas'), window.StormGraph.fromStorm(storm), { colours: STAGE, onPick: pick, tip: n => `${n.type} · ${n.label}${n.at ? ' · ' + n.at.slice(5, 16).replace('T', ' ') : ''}` })
            msg.hidden = true; apply()
            window.__tools = Object.assign(window.__tools || {}, { graph: { focus: id => { const n = byId.get(id); if (n) pick(n); return g.focus(id) }, node: id => byId.get(id), counts: () => ({ nodes: storm.nodes.length, edges: storm.edges.length }) } })
            document.dispatchEvent(new CustomEvent('tool:ready', { detail: { tool: 'graph' } }))
        } catch (e) { msg.hidden = false; msg.textContent = 'The 3D view is not available here (' + (e && e.message || e) + '). The same graph is in the list below and in the panel.'; apply() }
    }
    $('g-fit').addEventListener('click', () => g && g.fit())
    boot()
})()
