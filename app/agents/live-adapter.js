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
    let host = null, o = null, engine = null, mapSig = '', evSig = '', busy = false, on = false, pending = null
    const wanted = () => on || /^#live/.test(location.hash) || /(^|[?&])display=1(&|$)/.test(location.search.slice(1))

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
            events: evs.map(c => [(Date.parse(c.at) - from) / 6e4,   // minutes, with the seconds kept, so two pushes in one minute fly apart
                 agents.indexOf(c.agent), 'w', c.to.filter(personOf).map(t => targets.indexOf(t)), String(c.sha).slice(0, 8), 0])
        }
        return { map, live }
    }

    // the engine's hook: where each node is, and a layer to draw in. We add the agents' short names, nothing else.
    function labels(ev) {
        const g = ev.detail; if (!g || !g.layer) return
        graph = g; graphHost = ev.target
        const NS = 'http://www.w3.org/2000/svg', el = (t, a, p) => { const e = g.doc.createElementNS(NS, t); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e }
        for (const [id, p] of g.pos) {
            if (p.kind !== 'a') continue
            const page = pages.get(id), box = page ? el('a', { href: page }, g.layer) : g.layer
            if (page) { el('circle', { cx: p.x.toFixed(1), cy: p.y.toFixed(1), r: 16, fill: 'transparent', style: 'cursor:pointer' }, box); el('title', {}, box).textContent = id + ': open its page (what it is doing, its asks, its commits)' }
            const dx = p.x - g.C, dy = p.y - g.C, d = Math.hypot(dx, dy) || 1
            const t = el('text', { x: (p.x + 20 * dx / d).toFixed(1), y: (p.y + 20 * dy / d + 5).toFixed(1), 'text-anchor': Math.abs(dx) < 60 ? 'middle' : dx > 0 ? 'start' : 'end',
                style: `font:600 17px system-ui,sans-serif;fill:var(--rm-text-secondary);paint-order:stroke;stroke:var(--rm-bg);stroke-width:4px;${page ? 'cursor:pointer;text-decoration:underline' : 'pointer-events:none'}` }, box)
            t.textContent = shortOf(id) + (/@web-summit\.dinis$/i.test(id) ? '' : '@' + personOf(id))
        }
        controls()
    }

    // ---- our controls under the map: every push is a step you can take, read and open; and a Stop that stops ----
    // They drive the engine only through what it offers: lvGraph.setBack(ms) (go to a moment) and its 'lv-time' event.
    let graph = null, graphHost = null, list = [], at = -1, auto = null, delay = (+new URLSearchParams(location.search).get('livedelay') || 4) * 6e4
    const pages = new Map()
    const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
    const clean = s => String(s ?? '').replace(/https?:\/\/claude\.ai\/code\/session_[A-Za-z0-9]+/g, '[session]').replace(/\bsession_[A-Za-z0-9]{8,}\b/g, '[session]')
    const BASE = new URL('../../', HERE).href
    function go(i) {
        if (!graph || !list.length) return
        at = Math.max(0, Math.min(list.length - 1, i)); const c = list[at]
        if (window.AgentsMotion && window.AgentsMotion.stopped) window.AgentsMotion.start()
        graph.setBack(Date.now() - delay - (Date.parse(c.at) - 1200))   // the moment just before it: it flies about a second later
        caption()
    }
    function caption() {
        const box = document.querySelector('[data-ag-ctl]'); if (!box) return
        const c = list[at], stopped = !!(window.AgentsMotion && window.AgentsMotion.stopped)
        box.hidden = false
        box.innerHTML = `<div class="row"><button type="button" data-a="prev" ${at === 0 ? 'disabled' : ''}>‹ Previous push</button><button type="button" data-a="next" ${at >= list.length - 1 ? 'disabled' : ''}>Next push ›</button><button type="button" data-a="auto" aria-pressed="${!!auto}">${auto ? '❚❚ Pause' : '▶ Play push by push'}</button><button type="button" data-a="stop" aria-pressed="${stopped}">${stopped ? '▶ Resume motion' : '■ Stop all motion'}</button><button type="button" data-a="live">Back to live</button></div>
<p class="cap">${c ? `<b>Push ${at + 1} of ${list.length}</b> · ${esc(String(c.at).slice(11, 19))} UTC · <code>${esc(shortOf(c.agent))}</code>${c.to.length ? ` → ${c.to.map(t => `<code>${esc(shortOf(t) + (/@web-summit\.dinis$/i.test(t) ? '' : '@' + personOf(t)))}</code>`).join(', ')}` : ' (addressed to nobody)'}: <a href="${BASE}app/agents/commit.html?sha=${esc(c.sha)}">${esc(clean(c.what))}</a>` : `${list.length} pushes read. Step through them one at a time, or play them in order; each one flies along its line and can be opened.`}${stopped ? ' <b>Stopped: nothing moves until you resume.</b>' : ''}</p>`
        for (const b of box.querySelectorAll('button')) b.onclick = () => {
            const a = b.dataset.a
            if (a === 'prev') { halt(); go(at < 0 ? list.length - 1 : at - 1) }
            else if (a === 'next') { halt(); go(at + 1) }
            else if (a === 'auto') { if (auto) halt(); else { if (at < 0 || at >= list.length - 1) at = -1; const tick = () => { if (at >= list.length - 1) { halt(); caption(); return } go(at + 1) }; auto = setInterval(tick, 3000); tick() } caption() }
            else if (a === 'stop') { halt(); window.AgentsMotion && (stopped ? window.AgentsMotion.start() : window.AgentsMotion.stop()) }
            else if (a === 'live') { halt(); at = -1; if (window.AgentsMotion && window.AgentsMotion.stopped) window.AgentsMotion.start(); graph.setBack(0); caption() }
        }
    }
    const halt = () => { if (auto) { clearInterval(auto); auto = null } }
    const controls = () => { caption() }
    // the engine's own pause holds its clock but leaves its background flow flying, which reads as "Stop does not stop".
    // So: pausing it also closes the gate (nothing moves); pressing play, or touching the dial, opens it again.
    document.addEventListener('click', e => {
        const b = e.target.closest && e.target.closest('[data-lv-play]'); if (!b || !window.AgentsMotion) return
        const was = b.getAttribute('aria-pressed') === 'true'
        if (window.AgentsMotion.stopped) window.AgentsMotion.start()
        if (was) setTimeout(() => { if (b.getAttribute('aria-pressed') !== 'true') window.AgentsMotion.stop() }, 80)
    }, true)
    document.addEventListener('input', e => { if (e.target.matches && e.target.matches('[data-lv-dial] input') && window.AgentsMotion && window.AgentsMotion.stopped) window.AgentsMotion.start() }, true)
    document.addEventListener('agents-motion', caption)
    document.addEventListener('lv-time', e => { if (e.detail && e.detail.delay) delay = e.detail.delay }, true)

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
        list = commits.filter(c => personOf(c.agent) && isFinite(Date.parse(c.at))).sort((a, b) => Date.parse(a.at) - Date.parse(b.at))
        pages.clear(); for (const a of idx.agents || []) if (a.has_page) pages.set(a.name, `${BASE}agents/${a.role}/index.html`)
        host = host || document.getElementById('ag-live-map'); if (!host) return
        const ms = JSON.stringify([map.people, map.agents.map(a => a.id)]), es = live.events.map(e => e[4]).join()
        if (es !== evSig || !o) {
            evSig = es
            const url = URL.createObjectURL(new Blob([JSON.stringify(live)], { type: 'application/json' })), old = o && o.liveUrl
            if (o) o.liveUrl = url; else o = { liveUrl: url, layout: 'agents', D: { collab: { map } } }
            if (old) setTimeout(() => URL.revokeObjectURL(old), 5 * 6e4)
        }
        // new agents or people: the graph is drawn again; otherwise the engine picks the new exchanges up on its own next read
        // the map starts only when asked (its button, a #live address, or display mode): the page stays short and light
        if (!wanted()) { pending = map; return }
        if (ms !== mapSig) { mapSig = ms; o.D = { collab: { map } }; show() }
    })
    window.AgentsLive = { start() { on = true; if (pending && o) { mapSig = JSON.stringify([pending.people, pending.agents.map(a => a.id)]); o.D = { collab: { map: pending } }; pending = null; show() } } }
    document.addEventListener('lv-graph', labels, true)
    window.addEventListener('hashchange', () => { if (/^#live/.test(location.hash)) { if (pending) window.AgentsLive.start(); else show() } })
})()
