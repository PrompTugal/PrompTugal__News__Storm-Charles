// The Studio's storyboard player (incident.studio@web-summit.dinis). It plays animations that are data:
// studio/animations/index.json lists them; each studio/animations/<id>.json holds chapters of numbered scenes.
// A scene is a still picture described in words: who says what, the pile of blocks the app holds (the conversation),
// what is sent to the model on the right, and the files on the file system. The player draws each scene and moves
// between them. The schema is in studio/animations/README.md. No dependency; colours come from the site's tokens.
//
// Keys (when the player has focus): Space or K play/pause · ← → previous/next scene · PageUp PageDown chapter ·
// Home or R restart the chapter · S speed · 1-9 chapter.
(function () {
    'use strict'
    const root = document.getElementById('studio')
    if (!root || !window.StudioCast) return
    const base = root.dataset.base || 'animations/'
    const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
    const still = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const SPEEDS = [1, 1.5, 2, 0.5]
    const S = { list: [], anim: null, ch: 0, sc: 0, playing: false, speed: 1, timer: 0, prev: null }

    const getJSON = u => fetch(u, { cache: 'no-cache' }).then(r => { if (!r.ok) throw new Error(u + ': ' + r.status); return r.json() })

    // ---- the data, normalised: every scene becomes { caption, lanes: [lane] }
    const NAMES = { user: 'You', app: 'The app', model: 'The model', agent: 'An agent', fresh: 'A fresh agent' }
    function blockOf(ch, item) {
        const o = typeof item === 'string' ? { id: item } : Object.assign({}, item)
        const m = String(o.id).match(/^([^:]+)(?::(.+))?$/)
        const def = (ch.blocks || {})[m[1]] || {}
        return Object.assign({ id: m[1], key: def.key || m[1], u: 1, label: m[1] }, def, o, { id: m[1], state: o.state || m[2] || '' })
    }
    function laneOf(ch, sc, l) {
        const lane = Object.assign({}, l)
        lane.cast = Object.assign({ left: 'user', centre: 'app', right: 'model' }, ch.cast, sc.cast, l.cast)
        lane.names = Object.assign({}, NAMES, ch.names, sc.names, l.names)
        lane.window = l.window !== undefined ? l.window : sc.window !== undefined ? sc.window : ch.window
        lane.stack = (l.stack || []).map(b => blockOf(ch, b))
        lane.say = l.say || {}; lane.mood = l.mood || {}
        lane.files = l.files || null
        return lane
    }
    function normalise(a) {
        a.chapters = (a.chapters || []).map(ch => Object.assign({}, ch, { scenes: ch.scenes.map(sc => ({ caption: sc.caption, note: sc.note || '', dur: sc.dur, lanes: (sc.lanes || [sc]).map(l => laneOf(ch, sc, l)) })) }))
        if (a.simplifies && a.simplifies.length) a.chapters.push({ id: 'what-this-simplifies', title: 'What this simplifies', scenes: [{ caption: 'Every picture here leaves things out. These are the ones that matter.', list: a.simplifies, lanes: [] }] })
        for (const ch of a.chapters) {
            const us = l => l.stack.reduce((n, b) => n + b.u, 0)
            ch.units = Math.max(4, ...ch.scenes.flatMap(sc => sc.lanes.map(l => Math.max(us(l), l.window || 0)))) + 1
            // what each request read at full cost and reused, summed over the requests so far in this chapter (per lane)
            const seen = [{}, {}, {}]
            ch.cache = ch.scenes.some(sc => sc.lanes.some(l => l.send && l.send.cached !== undefined))
            for (const sc of ch.scenes) sc.lanes.forEach((l, i) => {
                if (l.send) {
                    const cached = l.stack.slice(0, l.send.cached || 0).reduce((n, b) => n + b.u, 0), total = us(l)
                    l.m = { n: l.send.n, read: total - cached, cached, total }
                    seen[i][l.send.n] = l.m
                }
                const all = Object.values(seen[i])
                l.sum = { requests: all.length, read: all.reduce((n, m) => n + m.read, 0), cached: all.reduce((n, m) => n + m.cached, 0), sent: all.reduce((n, m) => n + m.total, 0) }
            })
        }
        return a
    }

    // ---- drawing
    const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e }
    function head(lane, slot) {
        const who = lane.cast[slot]; if (!who) return ''
        const say = lane.say[slot] || lane.say[who] || '', mood = lane.mood[slot] || lane.mood[who] || (say ? 'talk' : 'idle')
        return `<div class="sb-head sb-${slot}"><div class="sb-who">${window.StudioCast.draw(who, mood, lane.names[who])}<span>${esc(lane.names[who])}</span></div>${say ? `<p class="sb-say">${esc(say)}</p>` : ''}</div>`
    }
    function block(b, cls, i) {
        const tag = { 'new': 'new', summary: 'summary', lost: 'lost', saved: 'saved', doc: 'from a file', changed: 'changed', cached: 'cached', read: 'read' }[b.state] || ''
        return `<div class="sb-b k-${esc(b.kind || 'turn')} ${b.state ? 's-' + esc(b.state) : ''} ${cls || ''}" data-u="${b.u}" data-i="${i}" data-key="${esc(b.key)}"><b>${esc(b.label)}</b>${b.note ? `<i>${esc(b.note)}</i>` : ''}${tag ? `<em>${tag}</em>` : ''}</div>`
    }
    function drawLane(ch, lane, prev, animate) {
        const had = new Set(((prev && prev.stack) || []).map(b => b.key + '|' + b.state + '|' + b.u)), win = lane.window
        let above = lane.stack.reduce((n, b) => n + b.u, 0)
        const pile = lane.stack.map((b, i) => {
            const over = win && above > win; above -= b.u
            return block(b, (animate && !had.has(b.key + '|' + b.state + '|' + b.u) ? 'enter ' : '') + (over ? 'over' : ''), i)
        }).join('')
        const sendNew = lane.send && animate && !(prev && prev.send && prev.send.n === lane.send.n && (prev.send.cached || 0) === (lane.send.cached || 0))
        const blocked = lane.send && lane.send.blocked
        const got = lane.send && !blocked ? lane.stack.map((b, i) => {
            const c = i < (lane.send.cached || 0)
            return block(Object.assign({}, b, { state: c ? 'cached' : 'read' }), c ? 'r-cached' : 'r-read', i)
        }).join('') : ''
        const m = lane.m, sum = lane.sum
        const meters = lane.meters === false || !sum || !sum.requests ? '' : `<dl class="sb-meters${ch.cache ? '' : ' two'}">
<div><dt>This request, read at full cost</dt><dd>${m ? m.read : 0}<small> of ${m ? m.total : 0} blocks sent</small></dd></div>
${ch.cache ? `<div class="reuse"><dt>This request, reused from the cache</dt><dd>${m ? m.cached : 0}<small> blocks</small></dd></div>` : ''}
<div><dt>All ${sum.requests} request${sum.requests > 1 ? 's' : ''} so far, read at full cost</dt><dd>${sum.read}<small> blocks${sum.cached ? ` (${sum.cached} reused)` : ''}</small></dd></div>
</dl>`
        const files = lane.files ? `<div class="sb-shelf"><h5>${esc(lane.shelf || 'The file system')}</h5><ul>${lane.files.map(f => `<li class="${f.state ? 's-' + esc(f.state) : ''}${animate && f.state === 'new' ? ' enter' : ''}">${f.href ? `<a href="${esc(f.href)}">${esc(f.name)}</a>` : `<b>${esc(f.name)}</b>`}${f.size ? ` <span class="sb-size">${esc(f.size)}</span>` : ''}${f.note ? `<small>${esc(f.note)}</small>` : ''}</li>`).join('')}</ul></div>` : ''
        return `<section class="sb-lane${lane.title ? ' titled' : ''}">${lane.title ? `<h4>${esc(lane.title)}</h4>` : ''}
<div class="sb-cols${win ? ' has-door' : ''}${lane.cast.left ? '' : ' no-left'}">
${head(lane, 'left')}${head(lane, 'centre')}${head(lane, 'right')}
<div class="sb-pile sb-held" data-units="${ch.units}"><span class="sb-cap">${esc(lane.held || 'The conversation the app holds')}</span>${win ? `<span class="sb-lintel" data-u="${win}"><i>the window: ${win} blocks</i></span>` : ''}${pile}</div>
${win ? `<div class="sb-door${blocked ? ' blocked' : ''}" data-units="${ch.units}"><span data-u="${win}"></span></div>` : ''}
<div class="sb-pile sb-got${sendNew ? ' arrive' : ''}${blocked ? ' blocked' : ''}" data-units="${ch.units}"><span class="sb-cap">${lane.send ? (blocked ? 'Request ' + lane.send.n + ': does not fit' : 'Request ' + lane.send.n + ': what the model receives') : 'Between requests the model holds nothing'}</span>${got}</div>
</div>${meters}${files}</section>`
    }
    function draw(animate) {
        const a = S.anim, ch = a.chapters[S.ch], sc = ch.scenes[S.sc], stage = root.querySelector('.sb-stage')
        const prev = S.prev && S.prev.ch === S.ch ? ch.scenes[S.prev.sc] : null
        animate = animate && !still()
        stage.className = 'sb-stage' + (sc.lanes.length > 1 ? ' two' : '') + (animate ? '' : ' still')
        stage.innerHTML = sc.list ? `<ol class="sb-list">${sc.list.map(x => `<li>${esc(x)}</li>`).join('')}</ol>` : sc.lanes.map((l, i) => drawLane(ch, l, prev && prev.lanes[i], animate)).join('')
        // sizes are set through the CSSOM (no inline style attributes: the site may run under a strict Content-Security-Policy)
        for (const e of stage.querySelectorAll('[data-u]')) e.style.setProperty('--u', e.dataset.u)
        for (const e of stage.querySelectorAll('[data-units]')) e.style.setProperty('--units', e.dataset.units)
        for (const e of stage.querySelectorAll('[data-i]')) e.style.setProperty('--i', e.dataset.i)
        root.querySelector('.sb-caption').innerHTML = `<b>${esc(ch.title)} · scene ${S.sc + 1} of ${ch.scenes.length}</b> ${esc(sc.caption)}${sc.note ? ` <small>${esc(sc.note)}</small>` : ''}`
        root.querySelectorAll('.sb-chapters button').forEach((b, i) => b.setAttribute('aria-current', i === S.ch ? 'true' : 'false'))
        root.querySelector('.sb-scenes').innerHTML = ch.scenes.map((x, i) => `<button type="button" data-sc="${i}" aria-label="Scene ${i + 1}" aria-current="${i === S.sc}">${i + 1}</button>`).join('')
        const first = S.ch === 0 && S.sc === 0, last = S.ch === a.chapters.length - 1 && S.sc === ch.scenes.length - 1
        root.querySelector('[data-do=prev]').disabled = first
        root.querySelector('[data-do=next]').disabled = last
        try { history.replaceState(null, '', '#' + a.id + '/' + (S.ch + 1) + '/' + (S.sc + 1)) } catch (e) { }
        S.prev = { ch: S.ch, sc: S.sc }
    }
    function go(ch, sc, animate) {
        const a = S.anim
        ch = Math.max(0, Math.min(a.chapters.length - 1, ch))
        if (sc < 0) sc = a.chapters[ch].scenes.length - 1
        S.ch = ch; S.sc = Math.max(0, Math.min(a.chapters[ch].scenes.length - 1, sc))
        draw(animate !== false)
        if (S.playing) schedule()
    }
    function next() { const ch = S.anim.chapters[S.ch]; if (S.sc < ch.scenes.length - 1) go(S.ch, S.sc + 1); else if (S.ch < S.anim.chapters.length - 1) go(S.ch + 1, 0); else play(false) }
    function prev() { if (S.sc > 0) go(S.ch, S.sc - 1, false); else if (S.ch > 0) go(S.ch - 1, -1, false) }
    function schedule() {
        clearTimeout(S.timer)
        const sc = S.anim.chapters[S.ch].scenes[S.sc], bar = root.querySelector('.sb-progress i')
        const ms = (sc.dur || Math.max(3800, 2200 + 55 * String(sc.caption).length)) / S.speed
        bar.style.animation = 'none'; void bar.offsetWidth
        if (!still()) bar.style.animation = `sb-progress ${ms}ms linear forwards`
        S.timer = setTimeout(next, ms)
    }
    function play(on) {
        const a = S.anim
        if (on && S.ch === a.chapters.length - 1 && S.sc === a.chapters[S.ch].scenes.length - 1) { S.playing = true; setPlay(); return go(0, 0) }
        S.playing = on; setPlay()
        clearTimeout(S.timer); root.querySelector('.sb-progress i').style.animation = 'none'
        if (on) schedule()
    }
    function setPlay() { const b = root.querySelector('[data-do=play]'); b.textContent = S.playing ? 'Pause' : 'Play'; b.setAttribute('aria-pressed', S.playing) }
    function speed() { S.speed = SPEEDS[(SPEEDS.indexOf(S.speed) + 1) % SPEEDS.length]; root.querySelector('[data-do=speed]').textContent = 'Speed ' + S.speed + '×'; if (S.playing) schedule() }

    function frame() {
        const a = S.anim
        root.innerHTML = `<div class="sb" tabindex="0" role="group" aria-label="Storyboard: ${esc(a.title)}">
<div class="sb-title">${S.list.length > 1 ? `<label>Animation <select class="sb-pick">${S.list.map(x => `<option value="${esc(x.id)}"${x.id === a.id ? ' selected' : ''}>${esc(x.title)}</option>`).join('')}</select></label>` : `<h2>${esc(a.title)}</h2>`}<p class="meta">${esc(a.summary || '')}</p></div>
<ol class="sb-chapters">${a.chapters.map((c, i) => `<li><button type="button" data-ch="${i}"><span>${i + 1}</span> ${esc(c.title)}</button></li>`).join('')}</ol>
<div class="sb-stage"></div>
<p class="sb-caption" aria-live="polite"></p>
<div class="sb-progress" aria-hidden="true"><i></i></div>
<div class="sb-controls"><button type="button" data-do="restart" title="Restart this chapter (R)">Restart</button><button type="button" data-do="prev" title="Previous scene (←)">Previous</button><button type="button" data-do="play" class="primary" aria-pressed="false" title="Play or pause (Space)">Play</button><button type="button" data-do="next" title="Next scene (→)">Next</button><button type="button" data-do="speed" title="Speed (S)">Speed 1×</button><span class="sb-scenes" role="group" aria-label="Scenes of this chapter"></span></div>
<p class="sb-keys meta">Keys: Space play or pause · ← → scene · PageUp PageDown chapter · R restart · S speed. Blocks are an illustration of size, not a measurement. The same, as text, is below.</p>
</div>`
        const sb = root.querySelector('.sb')
        sb.addEventListener('click', e => {
            const b = e.target.closest('button'); if (!b) return
            if (b.dataset.ch) return go(+b.dataset.ch, 0)
            if (b.dataset.sc) return go(S.ch, +b.dataset.sc)
            const d = b.dataset.do
            if (d === 'play') play(!S.playing); else if (d === 'next') next(); else if (d === 'prev') prev(); else if (d === 'restart') go(S.sc === 0 ? 0 : S.ch, 0); else if (d === 'speed') speed()
        })
        sb.addEventListener('keydown', e => {
            if (e.altKey || e.ctrlKey || e.metaKey) return
            const onControl = /^(BUTTON|SELECT|A|INPUT)$/.test(e.target.tagName), k = e.key
            let done = true
            if ((k === ' ' && !onControl) || k === 'k' || k === 'K') play(!S.playing)
            else if (k === 'ArrowRight') next(); else if (k === 'ArrowLeft') prev()
            else if (k === 'PageDown') go(S.ch + 1, 0); else if (k === 'PageUp') go(S.ch - 1, 0)
            else if (k === 'Home' || k === 'r' || k === 'R') go(S.sc === 0 ? 0 : S.ch, 0)
            else if (k === 's' || k === 'S') speed()
            else if (/^[1-9]$/.test(k) && !onControl && +k <= S.anim.chapters.length) go(+k - 1, 0)
            else done = false
            if (done) e.preventDefault()
        })
        const pick = root.querySelector('.sb-pick'); if (pick) pick.addEventListener('change', () => load(pick.value, 0, 0))
        document.addEventListener('visibilitychange', () => { if (document.hidden && S.playing) play(false) })
    }
    function load(id, ch, sc) {
        const item = S.list.find(x => x.id === id) || S.list[0]
        return getJSON(base + item.file).then(a => { clearTimeout(S.timer); S.playing = false; S.prev = null; S.anim = normalise(a); frame(); go(ch || 0, sc || 0, false) })
    }
    getJSON(base + 'index.json').then(ix => {
        S.list = ix.animations || []
        const h = decodeURIComponent(location.hash.slice(1)).split('/')
        return load(h[0], (+h[1] || 1) - 1, (+h[2] || 1) - 1)
    }).catch(e => { root.insertAdjacentHTML('beforeend', `<p class="meta">The player could not load its animations (${esc(e.message)}). The same, as text, is below.</p>`) })
})()
