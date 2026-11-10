// The adapter between this repository's commits and Angelo's live map (incident.observability@web-summit.dinis).
// The engine is an unchanged, pinned copy: vendor/live-map@57636ac/ (live.js, live3d.js by dev.map@PrompTugal.angelo; pin.json
// says which commit). Nothing of its logic is copied here. This file only (1) shapes what the engine reads:
//   - o.D.collab.map: { people, agents, links }  the operators (the part after "@web-summit." or "@PrompTugal." in an agent's
//     name, the engine's own rule), every agent that pushed here or was addressed in a For: trailer, and how often each pair spoke;
//   - o.liveUrl: a live.json { from, agents, targets, events: [[minute, agent, 'w', [targets], sha, 0]] } made in the browser
//     from the commits the page already read from GitHub's public API (a blob: address, replaced when new commits arrive);
// and (2) writes each agent's short name beside its dot, through the hook the engine offers (the 'lv-graph' event).
// 3D needs three.js: brain-libs.js (1.6 MB, Silvio's bundle) is loaded from web-summit.sgit.ai only when 3D is switched on, and
// only if it matches the sha384 below; it is never committed here.
(() => {
    const HERE = document.currentScript.src, PIN = 'vendor/live-map@57636ac/'
    const LIBS = 'https://web-summit.sgit.ai/assets/cc/brain-libs.js', LIBS_SRI = 'sha384-FGe8jg7muKBvFcLZR295Ju2x8gGa1eYfgstKeICxxWwHrXuCHKGytFV8szwXsBuL'
    const REPO = 'PrompTugal/PrompTugal__News__Storm-Charles (dev)'
    const load = (src, attrs = {}) => new Promise((ok, no) => { const s = document.createElement('script'); s.src = src; Object.assign(s, attrs); s.onload = ok; s.onerror = () => no(new Error(src.split('/').pop() + ' could not load')); document.head.appendChild(s) })
    const personOf = n => { const m = String(n).match(/@(?:web-summit|promptugal)\.([a-z0-9-]+)$/i); return m ? m[1].toLowerCase() : '' }
    const shortOf = n => String(n).split('@')[0].replace(/^incident\./, '')
    const want3d = () => /[?&]d3=1(&|$)/.test(location.hash) || /(^|[?&])d3=1(&|$)/.test(location.search.slice(1))
    let host = null, o = null, engine = null, mapSig = '', evSig = '', busy = false

    function shape(idx, commits) {
        const n = new Map(), bump = (name, k) => { if (!personOf(name)) return; const a = n.get(name) || { commits: 0 }; a.commits += k; n.set(name, a) }
        for (const a of idx.agents || []) bump(a.name, 0)
        const pair = new Map()
        for (const c of commits) { bump(c.agent, 1); for (const t of c.to) { bump(t, 0); if (personOf(c.agent) && personOf(t) && t !== c.agent) pair.set(c.agent + '|' + t, (pair.get(c.agent + '|' + t) || 0) + 1) } }
        const persons = [...new Set([...n.keys()].map(personOf))].sort((a, b) => (b === 'dinis') - (a === 'dinis') || a.localeCompare(b))
        const map = {
            people: persons.map(p => ({ id: p, name: p[0].toUpperCase() + p.slice(1) })),
            agents: [...n].map(([id, a]) => ({ id, person: personOf(id), family: /@web-summit\./i.test(id) ? 'web-summit' : 'promptugal', commits: a.commits, short: shortOf(id), kind: 'session' })),
            links: [...pair].map(([k, v]) => { const [from, to] = k.split('|'); return { from, to, n: v } })
        }
        const evs = commits.filter(c => personOf(c.agent) && isFinite(Date.parse(c.at))).sort((a, b) => Date.parse(a.at) - Date.parse(b.at))
        const from = evs.length ? Math.floor(Date.parse(evs[0].at) / 6e4) * 6e4 - 6e4 : Date.now() - 36e5
        const agents = [...new Set(evs.map(c => c.agent))], targets = [...new Set(evs.flatMap(c => c.to).filter(personOf))]
        const live = {
            built_at: new Date().toISOString(), version: 'from GitHub\'s public API, in this browser', from: new Date(from).toISOString(), repos: [REPO], agents, targets,
            events: evs.map(c => [Math.floor((Date.parse(c.at) - from) / 6e4), agents.indexOf(c.agent), 'w', c.to.filter(personOf).map(t => targets.indexOf(t)), String(c.sha).slice(0, 8), 0])
        }
        return { map, live }
    }

    // the engine's hook: where each node is, and a layer to draw in. We add the agents' short names, nothing else.
    function labels(ev) {
        const g = ev.detail; if (!g || !g.layer) return
        const NS = 'http://www.w3.org/2000/svg'
        for (const [id, p] of g.pos) {
            if (p.kind !== 'a') continue
            const dx = p.x - g.C, dy = p.y - g.C, d = Math.hypot(dx, dy) || 1, t = g.doc.createElementNS(NS, 'text')
            t.setAttribute('x', (p.x + 20 * dx / d).toFixed(1)); t.setAttribute('y', (p.y + 20 * dy / d + 5).toFixed(1))
            t.setAttribute('text-anchor', Math.abs(dx) < 60 ? 'middle' : dx > 0 ? 'start' : 'end')
            t.setAttribute('style', 'font:600 17px system-ui,sans-serif;fill:#BCCCDC;paint-order:stroke;stroke:#07111F;stroke-width:4px;pointer-events:none')
            t.textContent = shortOf(id) + (/@web-summit\.dinis$/i.test(id) ? '' : '@' + personOf(id)); g.layer.appendChild(t)
        }
    }

    async function show() {
        if (!host || !o || busy) return; busy = true
        const note = host.parentNode.querySelector('[data-ag-live-note]')
        try {
            if (!window.AngeloLive) await load(new URL(PIN + 'live.js', HERE).href)
            if (want3d() && !window.BrainLibs) { try { await load(LIBS, { integrity: LIBS_SRI, crossOrigin: 'anonymous' }) } catch (e) { if (note) note.textContent = '3D is not available: the 3D libraries on web-summit.sgit.ai did not load or no longer match the pinned copy. Showing the flat map.'; history.replaceState(null, '', location.pathname + location.search + '#live') } }
            engine = window.AngeloLive.view(host, o)
        } catch (e) { host.innerHTML = `<p class="ag-note ag-err">The live map could not start (${String(e.message).replace(/[<&]/g, '')}).</p>` }
        busy = false
    }

    document.addEventListener('agents-data', ev => {
        const { idx, commits } = ev.detail, { map, live } = shape(idx, commits)
        host = host || document.getElementById('ag-live-map'); if (!host) return
        const ms = JSON.stringify([map.people, map.agents.map(a => a.id)]), es = live.events.map(e => e[4]).join()
        if (es !== evSig || !o) {
            evSig = es
            const url = URL.createObjectURL(new Blob([JSON.stringify(live)], { type: 'application/json' })), old = o && o.liveUrl
            if (o) o.liveUrl = url; else o = { liveUrl: url, layout: 'agents', D: { collab: { map } } }
            if (old) setTimeout(() => URL.revokeObjectURL(old), 5 * 6e4)
        }
        // new agents or people: the graph is drawn again; otherwise the engine picks the new exchanges up on its own next read
        if (ms !== mapSig) { mapSig = ms; o.D = { collab: { map } }; show() }
    })
    document.addEventListener('lv-graph', labels, true)
    window.addEventListener('hashchange', () => { if (/^#live/.test(location.hash)) show() })
})()
