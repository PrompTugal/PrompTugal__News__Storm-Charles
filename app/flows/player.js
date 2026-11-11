// Flows: the player (incident.motion@web-summit.dinis, 11 November 2026, WS-214). An experiment.
// Draws one flow (data/flows/schema.json) as lanes, one per actor, and plays it step by step; every step shows its time and
// its evidence (a commit, a file, an address). A light SVG player of our own: the pinned engines (app/agents/vendor/) draw the
// whole team at once and the Universe needs 1.6 MB of 3D libraries from another host, which a small embed should not pull;
// the full engines are linked from the gallery (/flows/) and the embed can hand a flow to Angelo's live map (&engine=live-map).
//
// Embed by one line:
//   <div data-flow="wake-journalist"></div><script src="https://storm-charles.promptugal.news/app/flows/player.js" defer></script>
//   <iframe src="https://storm-charles.promptugal.news/app/flows/embed.html?flow=wake-journalist" width="640" height="420"></iframe>
// or ask for a flow the gallery does not list (built in the browser from data/flows/record.json by app/flows/core.js):
//   <div data-flow-kind="wake|handover|night" data-flow-agent="reporter" data-flow-at="2026-11-11T09:00:00Z" data-flow-n="2"></div>
// Options: data-flow-autoplay="0" to wait for a press; data-flow-speed (ms a step, default chosen from the length).
// No outside request: it reads only this site's files. Colours are the site's tokens, with system colours where they are absent.
(function () {
    'use strict'
    const ME = document.currentScript && document.currentScript.src
    const BASE = ME ? new URL('../../', ME).href : new URL('/', location.href).href
    const REPO = 'https://github.com/PrompTugal/PrompTugal__News__Storm-Charles'
    const NS = 'http://www.w3.org/2000/svg'
    const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
    const ms = t => Date.parse(t)
    const hm = t => String(t).slice(11, 19)
    const el = (tag, attrs = {}, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e }
    let cssDone = false, recP = null, coreP = null
    const css = () => { if (cssDone || document.querySelector('link[data-flows-css]')) return; cssDone = true; const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = BASE + 'app/flows/flows.css'; l.setAttribute('data-flows-css', ''); document.head.appendChild(l) }
    const getJSON = u => fetch(u, { cache: 'no-cache' }).then(r => { if (!r.ok) throw new Error(u.split('/').pop() + ': ' + r.status); return r.json() })
    const core = () => coreP || (coreP = window.FlowsCore ? Promise.resolve(window.FlowsCore) : new Promise((ok, no) => { const s = document.createElement('script'); s.src = BASE + 'app/flows/core.js'; s.onload = () => ok(window.FlowsCore); s.onerror = () => no(new Error('core.js could not load')); document.head.appendChild(s) }))
    const record = () => recP || (recP = getJSON(BASE + 'data/flows/record.json'))

    async function load(host) {
        const d = host.dataset
        if (d.flow) return getJSON(BASE + 'data/flows/' + encodeURIComponent(d.flow) + '.json')
        const [C, rec] = await Promise.all([core(), record()])
        const f = C.make(rec, { kind: d.flowKind, agent: d.flowAgent, n: d.flowN, at: d.flowAt })
        if (!f) throw new Error('nothing in the record for ' + [d.flowKind, d.flowAgent, d.flowN, d.flowAt].filter(Boolean).join(' '))
        return f
    }

    // the icon of an actor: its shape says its kind (never colour alone), its mark says which
    function icon(g, a, x, y) {
        const k = a.kind, m = a.mark || (a.label || a.id).slice(0, 2).toUpperCase()
        const grp = el('g', { class: 'fl-ic fl-' + k, transform: `translate(${x},${y})` }, g)
        if (k === 'person') { el('circle', { cx: 0, cy: -4, r: 4.2 }, grp); el('path', { d: 'M-8 9 C-8 1 8 1 8 9 Z' }, grp) }
        else if (k === 'session') el('circle', { cx: 0, cy: 0, r: 10, class: 'fl-ring' }, grp)
        else if (k === 'outside') el('path', { d: 'M0 -11 L11 0 L0 11 L-11 0 Z' }, grp)
        else if (k === 'thing') el('path', { d: 'M-8 -10 H4 L8 -6 V10 H-8 Z' }, grp)
        else if (k === 'machine') el('rect', { x: -10, y: -8, width: 20, height: 16, rx: 1 }, grp)
        else el('rect', { x: -10, y: -10, width: 20, height: 20, rx: 5 }, grp)
        if (k !== 'person') { const t = el('text', { x: 0, y: 3.5, 'text-anchor': 'middle', class: 'fl-mark' }, grp); t.textContent = m.slice(0, 3) }
        const ti = el('title', {}, grp); ti.textContent = `${a.emoji ? a.emoji + ' ' : ''}${a.label} (${k}${a.glyph ? ', ' + a.glyph : ''})`
        return grp
    }

    function evHtml(e) {
        if (!e) return '<span class="fl-none">no evidence</span>'
        const out = []
        if (e.commit) out.push(`<a href="${esc(e.url || REPO + '/commit/' + e.commit)}" rel="noopener" target="_blank">commit <code>${esc(e.commit)}</code></a>`)
        else if (e.url) out.push(`<a href="${esc(e.url)}" rel="noopener" target="_blank">${esc(e.run ? 'run ' + e.run : e.url.replace(/^https:\/\//, '').slice(0, 48))}</a>`)
        if (e.file) out.push(/\/$/.test(e.file) ? `<code>${esc(e.file)}</code>` : `<a href="${esc(BASE + 'view/?path=' + encodeURIComponent(e.file))}" target="_blank"><code>${esc(e.file)}</code></a>`)
        if (e.key) out.push(`key <code>${esc(e.key)}</code>`)
        if (e.signal) out.push(`row <code>${esc(e.signal)}</code>`)
        if (e.note) out.push(esc(e.note))
        return out.join(' · ')
    }

    function draw(host, f) {
        css()
        host.classList.add('fl')
        host.innerHTML = ''
        const steps = f.steps || [], actors = f.actors || [], N = steps.length
        const lane = new Map(actors.map((a, i) => [a.id, i]))
        const LH = actors.length > 8 ? 24 : 30, LAB = 118, PADT = 10, H = PADT * 2 + actors.length * LH
        // x: a column a step; a pause of 10 minutes or more is a hatched gap, its length written in it
        const gapAt = new Map(); for (const p of f.pauses || []) gapAt.set(p.to, p)
        const n = N + 1
        const pauses = steps.filter((s, i) => i && gapAt.has(s.t) && steps[i - 1].t !== s.t).length, GAP = Math.min(34, Math.max(16, 120 / Math.max(1, pauses)))
        const W = 640, col = Math.max(3, (W - LAB - 12 - pauses * GAP) / n)
        const xs = []; let x = LAB + col / 2 + 4
        steps.forEach((s, i) => { if (i && gapAt.has(s.t) && steps[i - 1].t !== s.t) x += GAP; xs.push(x); x += col })
        const head = document.createElement('div'); head.className = 'fl-head'
        head.innerHTML = `<span class="fl-exp" title="An experiment: a view of the record, not a finished page">experiment</span> <b>${esc(f.title)}</b>`
        host.appendChild(head)
        const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, class: 'fl-svg', role: 'img', 'aria-label': f.title + ': ' + N + ' steps' })
        host.appendChild(svg)
        const g0 = el('g', {}, svg)
        actors.forEach((a, i) => {
            const y = PADT + i * LH + LH / 2
            el('line', { x1: LAB - 4, x2: W - 4, y1: y, y2: y, class: 'fl-lane fl-lane-' + a.kind }, g0)
            icon(g0, a, 14, y)
            const t = el('text', { x: 30, y: y + 4, class: 'fl-lab' }, g0); t.textContent = (a.label || a.id).slice(0, 15)
        })
        // the pauses
        steps.forEach((s, i) => {
            if (!(i && gapAt.has(s.t) && steps[i - 1].t !== s.t)) return
            const p = gapAt.get(s.t), gx = xs[i] - col / 2 - GAP + 2
            el('rect', { x: gx, y: 2, width: GAP - 4, height: H - 4, class: 'fl-pause' }, g0)
            const t = el('text', { x: gx + (GAP - 4) / 2, y: H - 6, 'text-anchor': 'middle', class: 'fl-pause-t' }, g0)
            t.textContent = p.minutes >= 90 ? Math.round(p.minutes / 6) / 10 + ' h' : p.minutes + "'"
            const ti = el("title", {}, t); ti.textContent = `${p.minutes} minutes, ${hm(p.from)} to ${hm(p.to)} UTC: ${p.why || "no step on record"}`
        })
        const gE = el('g', {}, svg), gS = el('g', {}, svg)
        const marks = steps.map((s, i) => {
            const y = PADT + (lane.get(s.actor) ?? 0) * LH + LH / 2, x = xs[i]
            const grp = el('g', { class: 'fl-step fl-v-' + s.verb + (s.drawn ? ' fl-drawn' : ''), 'data-i': i }, gS)
            let line = null
            if (s.to && s.to.length) for (const t of s.to) {
                const y2 = PADT + (lane.get(t) ?? 0) * LH + LH / 2
                line = el('line', { x1: x, x2: x, y1: y, y2: y2, class: 'fl-edge' + (s.drawn ? ' fl-drawn' : '') }, gE)
                el('path', { d: `M${x - 3} ${y2 + (y2 > y ? -5 : 5)} L${x} ${y2} L${x + 3} ${y2 + (y2 > y ? -5 : 5)}`, class: 'fl-head-arrow' }, gE).dataset.i = i
                line.dataset.i = i
            }
            el('circle', { cx: x, cy: y, r: Math.min(5, Math.max(2.4, col / 2.2)), class: 'fl-dot' }, grp)
            grp.addEventListener('click', () => go(i, true))
            const ti = el('title', {}, grp); ti.textContent = `${hm(s.t)} UTC · ${s.verb} · ${s.object}`
            return grp
        })
        const now = el('line', { x1: 0, x2: 0, y1: 2, y2: H - 2, class: 'fl-now' }, svg)
        const cap = document.createElement('div'); cap.className = 'fl-cap'; cap.setAttribute('aria-live', 'polite'); host.appendChild(cap)
        const bar = document.createElement('div'); bar.className = 'fl-bar'
        bar.innerHTML = `<button type="button" data-a="first" aria-label="First step">⏮</button><button type="button" data-a="prev" aria-label="Previous step">◀</button><button type="button" data-a="play" aria-label="Play" aria-pressed="false">▶</button><button type="button" data-a="next" aria-label="Next step">▶|</button><input type="range" min="0" max="${Math.max(0, N - 1)}" value="0" aria-label="Step"><span class="fl-n"></span>`
        host.appendChild(bar)
        const foot = document.createElement('div'); foot.className = 'fl-foot'
        foot.innerHTML = `${esc(f.summary || '')} <span class="fl-src">Built from <code>${esc((f.built_from || []).join(', '))}</code>${f.id ? ` · <a href="${esc(BASE + 'data/flows/' + f.id + '.json')}" target="_blank">the flow as JSON</a>` : ''} · <a href="${esc(BASE + 'flows/index.html')}" target="_blank">all flows</a></span>`
        host.appendChild(foot)
        const range = bar.querySelector('input'), nOut = bar.querySelector('.fl-n'), playB = bar.querySelector('[data-a=play]')
        let at = -1, timer = null
        const label = id => { const a = actors.find(a => a.id === id); return a ? a.label : id }
        function go(i, user) {
            if (user) stop()
            at = Math.max(0, Math.min(N - 1, i))
            marks.forEach((m, j) => { m.classList.toggle('on', j <= at); m.classList.toggle('cur', j === at) })
            svg.querySelectorAll('.fl-edge,.fl-head-arrow').forEach(e => { const j = +e.dataset.i; e.classList.toggle('on', j <= at); e.classList.toggle('cur', j === at) })
            now.setAttribute('x1', xs[at]); now.setAttribute('x2', xs[at])
            const s = steps[at]
            cap.innerHTML = `<time datetime="${esc(s.t)}">${esc(s.t.slice(0, 10))} ${esc(hm(s.t))} UTC</time>${s.drawn ? ' <span class="fl-dr" title="' + esc(s.drawn) + '">time drawn, not recorded</span>' : ''}<br><b>${esc(label(s.actor))}</b> <span class="fl-verb">${esc(s.verb)}</span>${s.to && s.to.length ? ' → <b>' + s.to.map(t => esc(label(t))).join(', ') + '</b>' : ''}: ${esc(s.object)}${s.files && s.files.length ? ' <span class="fl-files">' + s.files.slice(0, 3).map(x => '<code>' + esc(x) + '</code>').join(' ') + (s.n_files > 3 ? ' +' + (s.n_files - 3) : '') + '</span>' : ''}<br><span class="fl-ev">evidence: ${evHtml(s.evidence)}</span>`
            range.value = at; nOut.textContent = `step ${at + 1} of ${N}`
        }
        const speed = +host.dataset.flowSpeed || Math.max(350, Math.min(1600, 40000 / Math.max(1, N)))
        function play() { if (timer) return stop(); if (at >= N - 1) at = -1; playB.setAttribute('aria-pressed', 'true'); playB.textContent = '❚❚'; timer = setInterval(() => { if (at >= N - 1) return stop(); go(at + 1) }, speed); go(at + 1) }
        function stop() { if (timer) clearInterval(timer); timer = null; playB.setAttribute('aria-pressed', 'false'); playB.textContent = '▶' }
        bar.addEventListener('click', e => { const a = e.target.closest('button')?.dataset.a; if (a === 'play') play(); else if (a === 'first') go(0, true); else if (a === 'prev') go(at - 1, true); else if (a === 'next') go(at + 1, true) })
        range.addEventListener('input', () => go(+range.value, true))
        host.tabIndex = host.tabIndex >= 0 ? host.tabIndex : 0
        host.addEventListener('keydown', e => { if (e.target.tagName === 'INPUT') return; if (e.key === 'ArrowRight') { go(at + 1, true); e.preventDefault() } else if (e.key === 'ArrowLeft') { go(at - 1, true); e.preventDefault() } else if (e.key === ' ') { play(); e.preventDefault() } })
        go(0)
        const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches
        if (host.dataset.flowAutoplay !== '0' && !reduce && N > 1) {
            if ('IntersectionObserver' in window) { const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { io.disconnect(); play() } }, { threshold: 0.4 }); io.observe(host) } else play()
        }
        host.flow = { flow: f, go: i => go(i, true), play, stop }
        host.dispatchEvent(new CustomEvent('flow-ready', { detail: f, bubbles: true }))
    }

    async function mount(host) {
        if (host.dataset.flowMounted) return; host.dataset.flowMounted = '1'
        css(); host.classList.add('fl'); host.innerHTML = '<p class="fl-wait">Loading the flow…</p>'
        try { draw(host, await load(host)) } catch (e) { host.innerHTML = `<p class="fl-err">This flow could not be drawn: ${esc(e.message)}</p>` }
    }
    const scan = () => document.querySelectorAll('[data-flow],[data-flow-kind]').forEach(mount)
    window.FlowsPlayer = { mount, draw, scan, base: BASE }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scan); else scan()
})()
