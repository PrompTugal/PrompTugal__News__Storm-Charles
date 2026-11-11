// The graph page (/app/graph/). It never draws the whole graph first: it starts from a QUESTION, and what is drawn is
// that question's answer (after graphs.sgit.ai: "never render the whole graph, render the result of a query").
// From there the reader adds and removes: press a node to read it and bring in its neighbours, hide it, open it as its
// own graph; filter by kind of thing, by verb, by label; change the layout. Every node and every edge has a detail pane
// with its source. incident.graph@web-summit.dinis. Everything shown is read from JSON; text is set as text.
(function () {
    'use strict'
    const D = window.StormData, { el, TYPES, SHAPE, SHAPE_WORD, tokenOf, tok, mark } = D
    const root = document.getElementById('graph'), BASE = root.dataset.base
    root.innerHTML = '<p class="kicker">The map of the storm</p><h1>Ask the graph a question; what you see is its answer</h1>' +
        '<p class="meta"><span id="g-asof">Reading the graph…</span>. Built from the incident\'s JSON, never by hand. <a href="ontology/index.html">The ontology, drawn</a> · <a href="lead-times/index.html">Lead times</a> · <a href="../../data/query/index.html">Query it with SQL</a> · <a href="#how-this-page-works">How this page works</a>.</p>' +
        '<h2 class="sec">1. Start from a question</h2><div class="q-examples" id="g-presets"></div>' +
        '<p class="g-about"><label for="g-who">Everything about </label><select id="g-who"></select> <label for="g-depth">within</label> <select id="g-depth"><option value="1">1 step</option><option value="2" selected>2 steps</option><option value="3">3 steps</option></select></p>' +
        '<p id="g-answer" class="meta" role="status"></p>' +
        '<details class="g-controls" open><summary>2. Change what is shown: kinds of thing, verbs, labels, layout</summary>' +
        '<div class="chips" id="g-types" aria-label="Kinds of thing: press to hide or show"></div>' +
        '<div class="chips" id="g-verbs" aria-label="Verbs (kinds of link): press to hide or show"></div>' +
        '<div class="chips" id="g-labels" aria-label="Labels: press to hide or show"></div>' +
        '<div class="chips radio" id="g-layouts" role="group" aria-label="Layout"></div>' +
        '<p class="meta">Shape says the kind of thing. Colour: blue is a decision; red, orange and yellow are IPMA\'s warning levels and nothing else; grey is everything else. A link with moving dots is a hypothesis; a fact\'s link is a plain line, evidence a fainter one. Press a node to read it and bring in what it is linked to; press a link to read the link.</p></details>' +
        '<div class="g-layout"><div class="g-stage" id="g-stage"><div class="g-canvas" id="g-canvas"></div><div class="g-msg" id="g-msg">Loading the 3D engine (1.6 MB, from web-summit.sgit.ai)… The same answer is in the list below.</div></div>' +
        '<aside class="g-panel" id="g-panel" aria-live="polite"><p class="meta">Press a node or a link, or pick one from the list below.</p></aside></div>' +
        '<h2 class="sec" id="list">3. The same answer as a list: every item linked</h2><div class="g-list" id="g-list"></div>' +
        '<p class="meta">The files: <a href="../../data/graph/storm.json">storm.json</a> and its parts, <a href="../../data/graph/ontology.json">ontology.json</a>, the tables under <a href="../../data/graph/index.html">data/graph/</a>.</p>'
    const $ = id => document.getElementById(id)
    const LABELS = ['fact', 'evidence', 'hypothesis']
    let G = null, g = null, rows = {}, VERBS = []
    const off = { types: new Set(), verbs: new Set(), labels: new Set() }
    let base = new Set(), removed = new Set(), question = '', layout = 'force'

    // ---------------------------------------------------------------- questions: each returns the ids that answer it
    const nb = (id, verbs) => [...(G.out.get(id) || []).filter(e => !verbs || verbs.includes(e.rel)).map(e => e.to), ...(G.inn.get(id) || []).filter(e => !verbs || verbs.includes(e.rel)).map(e => e.from)]
    const around = (ids, depth, verbs) => { const seen = new Set(ids); let edge = [...ids]; for (let d = 0; d < depth; d++) { const next = []; for (const id of edge) for (const m of nb(id, verbs)) if (!seen.has(m)) { seen.add(m); next.push(m) } edge = next } return seen }
    const ofType = (...t) => G.storm.nodes.filter(n => t.includes(n.type))
    const lisbon = n => !(n.type === 'Warning' && n.phase === 'in_force' && n.area !== 'LSB') && !(n.type === 'Place' && n.code !== 'LSB' && n.code !== 'PT-mainland')
    const PRESETS = [
        { id: 'decided-on-warning', q: 'Who decided what, on whose warning?', say: 'Every decision that happened and every warning issued, who made each, and what followed what.',
          run: () => { const core = ofType('Decision', 'Warning').filter(n => n.phase !== 'in_force' && (n.status === 'happened' || n.type === 'Warning')).map(n => n.id); return around(core, 1, ['decides', 'warns', 'precedes']) } },
        { id: 'last-hour', q: 'What changed in the last hour?', say: 'Everything dated or read in the hour before the newest input, and what each is linked to.',
          run: () => { const end = Date.parse(G.storm.as_of), t = n => Date.parse(n.at || '') || 0; const core = G.storm.nodes.filter(n => lisbon(n) && n.type !== 'Dataset' && n.type !== 'Agent' && n.type !== 'Source' && end - t(n) <= 3600e3 && end - t(n) >= 0).map(n => n.id); return around(core, 1) } },
        { id: 'open', q: 'What is still not announced?', say: 'Decisions that were due and not announced when last read, our hypotheses (never stated as fact), and who owes each.',
          run: () => around(ofType('Decision').filter(n => ['not_announced', 'expected', 'unknown'].includes(n.status)).map(n => n.id), 1, ['decides', 'precedes']) },
        { id: 'warnings-lisbon', q: 'What did IPMA warn for Lisbon, and when?', say: 'IPMA\'s own messages for the Lisbon district (with the time IPMA sent each), the warnings in force, and what replaced what.',
          run: () => around(ofType('Warning').filter(n => n.area === 'LSB' || n.phase === 'issued').map(n => n.id), 1, ['warns', 'precedes', 'located-in']) },
        { id: 'who-reported', q: 'Who reported what?', say: 'The outlets and bodies that published each signal and each reported decision.',
          run: () => { const es = G.storm.edges.filter(e => e.rel === 'reports'); return new Set(es.flatMap(e => [e.from, e.to])) } },
        { id: 'where-read', q: 'Where was each decision read?', say: 'Each decision and the addresses it was read at or is corroborated by, with whose channel each address is.',
          run: () => around(ofType('Decision').map(n => n.id), 1, ['cites']) },
        { id: 'who-keeps', q: 'Which agent keeps which data?', say: 'The data sets of the incident and the agents that keep them.',
          run: () => around(ofType('Dataset').map(n => n.id), 1, ['produced-by']) },
        { id: 'all', q: 'Everything (the whole graph)', say: 'Every node that has a link, Lisbon only for warnings in force. Slow to read: a question above is nearly always better.',
          run: () => new Set(G.storm.nodes.filter(n => n.degree > 0 && lisbon(n)).map(n => n.id)) }
    ]
    function ask(p, push) {
        base = p.run(); removed = new Set(); question = p.q
        document.querySelectorAll('#g-presets button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.id === p.id)))
        $('g-answer').dataset.say = p.say
        if (push) try { history.replaceState(null, '', '?q=' + encodeURIComponent(p.id)) } catch { }
        apply(true)
        // the pane opens on the most linked thing in the answer, so there is always something to read
        const top = shownNodes().sort((a, b) => (b.degree || 0) - (a.degree || 0))[0]; if (top) pick(top)
    }
    function about(id, depth, push) {
        const n = G.byId.get(id); if (!n) return false
        base = around([id], depth); removed = new Set(); question = `Everything about ${n.name}`
        document.querySelectorAll('#g-presets button').forEach(b => b.setAttribute('aria-pressed', 'false'))
        $('g-answer').dataset.say = `${D.short(n.name, 80)} and everything within ${depth} step${depth > 1 ? 's' : ''} of it: its own graph.`
        if (push) try { history.replaceState(null, '', '?node=' + encodeURIComponent(id) + '&depth=' + depth) } catch { }
        apply(true); pick(n); return true
    }

    // ---------------------------------------------------------------- what is shown = the answer, minus what the reader hid, through the filters
    const nodeOn = n => base.has(n.id) && !removed.has(n.id) && !off.types.has(n.type) && !off.labels.has(n.label)
    const edgeOn = e => !off.verbs.has(e.rel) && !off.labels.has(e.label)
    const shownNodes = () => G.storm.nodes.filter(nodeOn)
    const shownEdges = () => { const ids = new Set(shownNodes().map(n => n.id)); return G.storm.edges.filter(e => ids.has(e.from) && ids.has(e.to) && edgeOn(e)) }
    function apply(refit) {
        const ns = shownNodes(), es = shownEdges()
        if (g) { g.show(nodeOn, l => edgeOn(l)); if (refit) place() }
        $('g-answer').textContent = `${question}: ${ns.length} thing${ns.length === 1 ? '' : 's'}, ${es.length} link${es.length === 1 ? '' : 's'}. ${$('g-answer').dataset.say || ''}`
        list(ns)
    }
    // layouts: the forces alone; laid along time (left to right); or in lanes by kind of thing
    function place() {
        if (!g) return
        if (layout === 'force') return g.layout(null)
        const ns = shownNodes()
        if (layout === 'time') {
            // by ORDER in time, evenly spaced (by the clock, five quiet days would squeeze one busy afternoon into a dot)
            const t = n => Date.parse(n.at || n.starts || '') || null, timed = ns.filter(t).sort((a, b) => t(a) - t(b))
            if (timed.length < 2) return g.layout(null)
            const rank = new Map(timed.map((n, i) => [n.id, i])), width = Math.max(320, timed.length * 16)
            return g.layout(n => rank.has(n.id) && nodeOn(n) ? { x: (rank.get(n.id) / (timed.length - 1) - 0.5) * width } : null)
        }
        if (layout === 'kind') { const lanes = TYPES.filter(k => ns.some(n => n.type === k)); return g.layout(n => nodeOn(n) ? { y: (lanes.indexOf(n.type) - (lanes.length - 1) / 2) * -70 } : null) }
    }

    // ---------------------------------------------------------------- controls
    function chip(text, lead, n, pressed, on) {
        const b = el('button', { type: 'button', 'aria-pressed': String(pressed) }, [lead || '', el('span', { text }), n == null ? '' : el('span', { class: 'n', text: String(n) })])
        b.addEventListener('click', () => { const p = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', String(p)); on(p); apply() })
        return b
    }
    function controls() {
        for (const p of PRESETS) { const b = el('button', { type: 'button', 'data-id': p.id, 'aria-pressed': 'false', text: p.q }); b.addEventListener('click', () => ask(p, true)); $('g-presets').append(b) }
        const who = $('g-who'); who.append(el('option', { value: '', text: 'choose…' }))
        for (const t of ['Actor', 'Place', 'Agent']) { const og = el('optgroup', { label: t + 's' }); G.storm.nodes.filter(n => n.type === t && n.degree > 0).sort((a, b) => a.name.localeCompare(b.name)).forEach(n => og.append(el('option', { value: n.id, text: D.short(n.name, 60) }))); who.append(og) }
        const go = () => { if (who.value) about(who.value, +$('g-depth').value, true) }
        who.addEventListener('change', go); $('g-depth').addEventListener('change', go)
        for (const k of TYPES) $('g-types').append(chip(`${k} (${SHAPE_WORD[SHAPE[k]]})`, mark({ type: k }), G.storm.nodes.filter(n => n.type === k).length, true, p => p ? off.types.delete(k) : off.types.add(k)))
        for (const v of VERBS) $('g-verbs').append(chip(v, null, G.storm.edges.filter(e => e.rel === v).length, true, p => p ? off.verbs.delete(v) : off.verbs.add(v)))
        for (const k of LABELS) $('g-labels').append(chip(k, null, null, true, p => p ? off.labels.delete(k) : off.labels.add(k)))
        const L = [['force', 'Layout: by links'], ['time', 'in order of time, left to right'], ['kind', 'in lanes by kind']]
        for (const [id, text] of L) { const b = el('button', { type: 'button', 'aria-pressed': String(id === layout), text }); b.addEventListener('click', () => { layout = id; [...$('g-layouts').querySelectorAll('button[aria-pressed]')].forEach(x => x.setAttribute('aria-pressed', String(x === b))); place() }); $('g-layouts').append(b) }
        const fit = el('button', { type: 'button', text: 'Fit all in view' }); fit.addEventListener('click', () => g && g.fit()); $('g-layouts').append(fit)
    }

    // ---------------------------------------------------------------- the detail pane: a node, or an edge
    const nodeBtn = (n, text) => { const b = el('button', { type: 'button', class: 'linkish', text: text || D.short(n.name) }); b.addEventListener('click', () => open(n.id)); return b }
    function open(id) { const n = G.byId.get(id); if (!n) return; if (!base.has(id) || removed.has(id)) { base.add(id); removed.delete(id); apply() } pick(n); if (g) g.focus(id) }
    function facts(dl, x) {
        const add = (k, v) => { if (v == null || v === '') return; dl.append(el('dt', { text: k }), el('dd', {}, [v])) }
        add('label', el('span', { class: 'lab ' + x.label, text: x.label }))
        if (x.type === 'Warning' && x.level) add('IPMA level', el('span', { class: 'lvl ' + x.level, text: x.level }))
        add('when', x.at ? D.when(x.at) : x.starts ? `${D.when(x.starts)} to ${D.when(x.ends)}` : null)
        if (x.effect_from) add('in effect', `${D.when(x.effect_from)}${x.effect_to ? ' to ' + D.when(x.effect_to) : ''}`)
        add('status', x.status && x.type !== 'Signal' ? x.status.replace('_', ' ') : null)
        if (x.lead_minutes != null) add('lead time', D.dur(x.lead_minutes / 60) + ' between them')
        add('source', D.outLink(x.source))
        add('read', D.when(x.read) + (x.read_by ? ', by ' + x.read_by.split(' ')[0] : ''))
        const oh = D.originHref(BASE, G.storm, x.origin); add('built from', oh ? el('a', { href: oh, text: x.origin.replace(/^\//, '') }) : null)
        return add
    }
    function pick(n) {
        const p = $('g-panel'); p.textContent = ''
        p.append(el('span', { class: 'g-type' }, [mark(n), n.type + (n.kind ? ' · ' + n.kind : '') + (n.phase ? ' · ' + (n.phase === 'cap' ? 'IPMA message' : n.phase.replace('_', ' ')) : '')]))
        const row = rows[n.id] || {}
        p.append(el('h2', { text: row.decision || row.text || n.name }))
        const acts = el('p', { class: 'g-acts' })
        const act = (text, fn) => { const b = el('button', { type: 'button', class: 'small', text }); b.addEventListener('click', fn); acts.append(b) }
        act('Open as its own graph', () => about(n.id, n.type === 'Warning' ? 2 : 1, true))
        act('Bring in its links', () => { for (const m of nb(n.id)) { base.add(m); removed.delete(m) } apply() })
        act('Hide it', () => { removed.add(n.id); apply() })
        p.append(acts)
        const dl = el('dl'), add = facts(dl, n)
        if (n.entity) add('its page', el('a', { href: BASE + 'entities/' + n.entity + '.html', text: 'everything about it (entities/' + n.entity + ')' }))
        add('address', el('a', { href: D.nodeHref(BASE, n.id), text: 'a link to this node' })); p.append(dl)
        if (row.note) p.append(el('p', { class: 'meta', text: row.note }))
        // its links, by verb: outgoing with the verb, incoming with the verb's inverse
        const groups = new Map(), put = (verb, e, other) => (groups.get(verb) || groups.set(verb, []).get(verb)).push([e, other])
        for (const e of G.out.get(n.id) || []) put(e.rel, e, e.to)
        for (const e of G.inn.get(n.id) || []) put((G.ont.relations[e.rel] || {}).inverse || '← ' + e.rel, e, e.from)
        for (const [verb, items] of groups) {
            const ul = el('ul')
            for (const [e, id] of items.slice(0, 60)) { const m = G.byId.get(id); if (!m) continue
                const eb = el('button', { type: 'button', class: 'linkish small-link', text: 'the link' }); eb.addEventListener('click', () => pickEdge(e))
                ul.append(el('li', {}, [mark(m), ' ', nodeBtn(m), el('small', {}, [`${m.type}${e.lead_minutes != null ? ' · ' + D.dur(e.lead_minutes / 60) : ''} · ${e.label} · `, eb])])) }
            p.append(el('details', { open: '' }, [el('summary', {}, [el('b', { text: verb }), ` ${items.length}`]), ul]))
        }
    }
    function pickEdge(e) {
        const a = G.byId.get(e.from), b = G.byId.get(e.to), r = G.ont.relations[e.rel] || {}, p = $('g-panel'); p.textContent = ''
        p.append(el('span', { class: 'g-type', text: 'A link' }))
        p.append(el('h2', {}, [nodeBtn(a, D.short(a.name, 70)), el('span', { class: 'g-verb', text: ` ${e.rel} ` }), nodeBtn(b, D.short(b.name, 70))]))
        p.append(el('p', { class: 'meta', text: `${e.rel}: ${r.what || ''}. Read the other way: ${r.inverse || 'no inverse recorded'}.` }))
        const dl = el('dl'); facts(dl, e); p.append(dl)
        p.append(el('p', { class: 'meta' }, [el('a', { href: 'ontology/index.html#' + e.rel, text: `The verb "${e.rel}" in the ontology` })]))
    }

    // ---------------------------------------------------------------- the answer as a list: every item linked
    function list(ns) {
        const box = $('g-list'); box.textContent = ''
        for (const t of TYPES) {
            const of = ns.filter(n => n.type === t).sort((a, b) => (a.at || a.starts || '').localeCompare(b.at || b.starts || '') || a.name.localeCompare(b.name)); if (!of.length) continue
            const ul = el('ul')
            for (const n of of) { const oh = D.originHref(BASE, G.storm, n.origin)
                ul.append(el('li', {}, [n.at ? el('time', { datetime: n.at, text: n.at.slice(5, 16).replace('T', ' ') + ' ' }) : '', nodeBtn(n, D.short(n.name, 140)), ' ', el('span', { class: 'lab ' + n.label, text: n.label }), n.level ? el('span', { class: 'lvl ' + n.level, text: n.level }) : '', ' ', el('small', {}, [D.outLink(n.source), oh ? ' · ' : '', oh ? el('a', { href: oh, text: 'built from' }) : '', ' · ', el('a', { href: D.nodeHref(BASE, n.id), text: 'link' })])])) }
            box.append(el('details', of.length <= 40 ? { open: '' } : {}, [el('summary', {}, [el('span', { class: 'g-type' }, [mark({ type: t }), `${t} (${SHAPE_WORD[SHAPE[t]]}): ${of.length}`])]), ul]))
        }
    }

    async function boot() {
        const msg = $('g-msg')
        try {
            G = await D.load(BASE); VERBS = Object.keys(G.ont.relations)
            const [d, w, sg] = await Promise.all(['decisions', 'warnings', 'signals'].map(G.table)); for (const t of [d, w, sg]) for (const r of t.rows) rows[r.id] = r
            $('g-asof').textContent = `${G.storm.nodes.length} things and ${G.storm.edges.length} links in all, data as of ${D.when(G.storm.as_of)}`
            controls()
        } catch (e) { msg.textContent = 'The graph could not be read: ' + (e && e.message || e); return }
        const u = new URLSearchParams(location.search), start = () => { if (!(u.get('node') && about(u.get('node'), +(u.get('depth') || 1)))) ask(PRESETS.find(p => p.id === u.get('q')) || PRESETS[0]) }
        start()
        try {
            g = await window.StormGraph.mount($('g-canvas'), window.StormGraph.fromStorm(G.storm), { style: () => ({ background: tok('--surface-2'), outline: tok('--surface-2'), link: tok('--ink-2'), linkMuted: tok('--line-2'), linkPicked: tok('--ink'), linkHypothesis: tok('--focus') }), colourOf: n => tok(tokenOf(n)), shapeOf: n => SHAPE[n.type],
                onPick: n => { pick(n); const add = nb(n.id).filter(m => !base.has(m) || removed.has(m)); if (add.length && add.length <= 25) { add.forEach(m => { base.add(m); removed.delete(m) }); apply() } },
                onPickLink: l => pickEdge(l), tip: n => `${n.type} · ${n.label}${n.at ? ' · ' + n.at.slice(5, 16).replace('T', ' ') : ''}` })
            msg.hidden = true; apply(true)
            new MutationObserver(() => g.restyle()).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
            try { matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => g.restyle()) } catch { }
            window.__tools = Object.assign(window.__tools || {}, { graph: { ask: id => ask(PRESETS.find(p => p.id === id) || PRESETS[0]), about, open, questions: () => PRESETS.map(p => ({ id: p.id, q: p.q })), shown: () => ({ nodes: shownNodes().map(n => n.id), edges: shownEdges().length }) } })
            document.dispatchEvent(new CustomEvent('tool:ready', { detail: { tool: 'graph' } }))
        } catch (e) { msg.hidden = false; msg.textContent = 'The 3D view is not available here (' + (e && e.message || e) + '). The same answer is in the list below and in the panel.' }
    }
    boot()
})()
