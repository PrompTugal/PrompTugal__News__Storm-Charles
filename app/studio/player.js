// The Studio's storyboard player (incident.studio@web-summit.dinis). It plays animations that are data:
// studio/animations/index.json lists them; each studio/animations/<id>.json holds chapters of numbered scenes.
// A scene is a still picture described in words: who says what, the pile of blocks the app holds (the conversation),
// what is sent to the model on the right, and the files on the file system. The player draws each scene and moves
// between them. The schema is in studio/animations/README.md. No dependency; colours come from the site's tokens.
//
// A page mounts one explanation: <div id="studio" data-base="../animations/" data-anim="<id>">. The address is #chapter/scene.
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
        lane.meters = l.meters !== undefined ? l.meters : sc.meters !== undefined ? sc.meters : ch.meters
        lane.live = lane.stack.filter(b => b.state !== 'lost')   // a lost block is drawn to show what is missing; it is not held, counted or sent
        return lane
    }
    function normalise(a) {
        a.chapters = (a.chapters || []).map(ch => Object.assign({}, ch, { scenes: ch.scenes.map(sc => ({ caption: sc.caption, note: sc.note || '', dur: sc.dur, at: sc.at, clock: sc.clock, cards: sc.cards || (sc.card ? [sc.card] : []), says: sc.say || {}, lanes: (sc.lanes || [sc]).map(l => laneOf(ch, sc, l)) })) }))
        if (a.simplifies && a.simplifies.length) a.chapters.push({ id: 'what-this-simplifies', title: 'What this simplifies', scenes: [{ caption: 'Every picture here leaves things out. These are the ones that matter.', list: a.simplifies, lanes: [] }] })
        for (const ch of a.chapters) {
            const us = l => l.live.reduce((n, b) => n + b.u, 0)
            ch.units = Math.max(4, ...ch.scenes.flatMap(sc => sc.lanes.map(l => Math.max(us(l) + l.stack.length - l.live.length, (l.window || 0) + 1))))
            // what each request read at full cost and reused, summed over the requests so far in this chapter (per lane)
            const seen = [{}, {}, {}]
            ch.cache = ch.scenes.some(sc => sc.lanes.some(l => l.send && l.send.cached !== undefined))
            for (const sc of ch.scenes) sc.lanes.forEach((l, i) => {
                if (l.send) {
                    const cached = l.live.slice(0, l.send.cached || 0).reduce((n, b) => n + b.u, 0), total = us(l)
                    l.m = { n: l.send.n, read: total - cached, cached, total }
                    seen[i][l.send.n] = l.m
                }
                const all = Object.values(seen[i])
                l.reqs = all.map(m => Object.assign({}, m)); ch.maxReq = Math.max(ch.maxReq || 0, ...all.map(m => m.total))
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
        const tag = { 'new': 'new', summary: 'summary', lost: 'lost', saved: 'saved', doc: 'from a file', changed: 'changed', cached: 'cached', read: 'read', key: 'matters' }[b.state] || ''
        return `<div class="sb-b k-${esc(b.kind || 'turn')} ${b.state ? 's-' + esc(b.state) : ''} ${b.u > 1 ? 'tall' : ''} ${cls || ''}" data-u="${b.u}" data-i="${i}" data-key="${esc(b.key)}"><b>${esc(b.label)}</b>${b.note ? `<i>${esc(b.note)}</i>` : ''}${tag ? `<em>${tag}</em>` : ''}</div>`
    }
    function drawLane(ch, lane, prev, animate) {
        const had = new Set(((prev && prev.stack) || []).map(b => b.key + '|' + b.state + '|' + b.u)), win = lane.window
        let above = lane.live.reduce((n, b) => n + b.u, 0)
        const pile = lane.stack.map((b, i) => {
            const over = win && b.state !== 'lost' && above > win; if (b.state !== 'lost') above -= b.u
            return block(b, (animate && !had.has(b.key + '|' + b.state + '|' + b.u) ? 'enter ' : '') + (over ? 'over' : ''), i)
        }).join('')
        const sendNew = lane.send && animate && !(prev && prev.send && prev.send.n === lane.send.n && (prev.send.cached || 0) === (lane.send.cached || 0))
        const blocked = lane.send && lane.send.blocked
        const got = lane.send && !blocked ? lane.live.map((b, i) => {
            const c = i < (lane.send.cached || 0)
            return block(Object.assign({}, b, { state: c ? 'cached' : 'read' }), c ? 'r-cached' : 'r-read', i)
        }).join('') : ''
        const m = lane.m, sum = lane.sum
        const meters = lane.meters === false || !sum || !sum.requests ? '' : `<div class="sb-count"><dl class="sb-meters">
<div><dt>This request</dt><dd>${m ? m.read : 0}<small> blocks read at full cost${ch.cache ? `, <span class="reuse">${m ? m.cached : 0} reused</span>` : ''}</small></dd></div>
<div><dt>All ${sum.requests} request${sum.requests > 1 ? 's' : ''} so far</dt><dd>${sum.read}<small> read at full cost${ch.cache ? `, <span class="reuse">${sum.cached} reused</span>` : ''}</small></dd></div>
</dl>
<div class="sb-bars" role="img" aria-label="Each request so far: ${lane.reqs.map(r => `request ${r.n}, ${r.read} blocks read at full cost${r.cached ? `, ${r.cached} reused` : ''}`).join('; ')}"><b>Each request so far</b>${lane.reqs.map(r => `<div class="${m && r.n === m.n ? 'now' : ''}"><span>${r.n}</span><i class="c" data-w="${r.cached}"></i><i class="r" data-w="${r.read}"></i><small>${r.read} read${r.cached ? `, ${r.cached} reused` : ''}</small></div>`).join('')}</div></div>`
        const files = lane.files ? `<div class="sb-shelf"><h5>${esc(lane.shelf || 'The file system')}</h5><ul>${lane.files.map(f => `<li title="${esc(f.note || '')}" class="${f.state ? 's-' + esc(f.state) : ''}${animate && f.state === 'new' ? ' enter' : ''}">${f.href ? `<a href="${esc(f.href)}">${esc(f.name)}</a>` : `<b>${esc(f.name)}</b>`}${f.size ? ` <span class="sb-size">${esc(f.size)}</span>` : ''}${f.note ? `<small>${esc(f.note)}</small>` : ''}</li>`).join('')}</ul></div>` : ''
        return `<section class="sb-lane${lane.title ? ' titled' : ''}">${lane.title ? `<h4>${esc(lane.title)}</h4>` : ''}
<div class="sb-cols${win ? ' has-door' : ''}${lane.cast.left ? '' : ' no-left'}">
<div class="sb-side">${head(lane, 'left')}${meters}${lane.cast.left ? files : ''}</div>${head(lane, 'centre')}${head(lane, 'right')}
<div class="sb-pile sb-held" data-units="${ch.units}"><span class="sb-cap">${esc(lane.held || 'The conversation ' + String(lane.names[lane.cast.centre] || 'the app').replace(/^[A-Z]/, c => c.toLowerCase()) + ' holds')}</span>${win ? `<span class="sb-lintel" data-u="${win}"></span>` : ''}${pile}</div>
${win ? `<div class="sb-door${blocked ? ' blocked' : ''}" data-units="${ch.units}"><span data-u="${win}"></span></div>` : ''}
<div class="sb-pile sb-got${sendNew ? ' arrive' : ''}${blocked ? ' blocked' : ''}" data-units="${ch.units}">${win ? `<span class="sb-lintel lab" data-u="${win}"><i>the window: ${win} blocks</i></span>` : ''}<span class="sb-cap">${lane.send ? (blocked ? 'Request ' + lane.send.n + ': does not fit' : 'Request ' + lane.send.n + ': what the model receives') : 'Between requests the model holds nothing'}</span>${got}</div>
</div>${lane.cast.left ? '' : files}</section>`
    }
    // a track: stations in a row (a source, a collector, ... the readers), one of them at work, and a card that fills in as it goes
    function drawTrack(ch, sc, prev, animate) {
        const st = ch.track.stations, seen = new Set(((prev && prev.cards) || []).flatMap(c => (c.fields || []).map(f => c.title + '|' + f.k + '|' + f.v)))
        const card = c => `<div class="sb-card ${c.label ? 'l-' + esc(c.label) : ''} ${c.state ? 's-' + esc(c.state) : ''}"><h5>${c.label ? `<span class="sb-lbl l-${esc(c.label)}">${esc(c.label)}</span>` : ''}${c.id ? (c.href ? `<a class="sb-id" href="${esc(c.href)}">${esc(c.id)}</a>` : `<span class="sb-id">${esc(c.id)}</span>`) : ''}${esc(c.title || '')}${c.state === 'superseded' ? ' <em>superseded</em>' : ''}</h5>${c.text ? `<p>${esc(c.text)}</p>` : ''}<dl>${(c.fields || []).map(f => `<div class="${animate && !seen.has(c.title + '|' + f.k + '|' + f.v) ? 'enter' : ''}${f.new ? ' new' : ''}"><dt>${esc(f.k)}</dt><dd>${f.href ? `<a href="${esc(f.href)}">${esc(f.v)}</a>` : esc(f.v)}</dd></div>`).join('')}</dl></div>`
        return `<section class="sb-track">${sc.clock ? `<p class="sb-clock"><span>the time</span> <time>${esc(sc.clock)}</time></p>` : ''}
<ol class="sb-stations" data-n="${st.length}">${st.map((x, i) => { const say = sc.says[i] || sc.says[x.id] || ''; return `<li class="${i === sc.at ? 'on' : i < sc.at ? 'done' : ''}">${window.StudioCast.draw(x.who, say ? 'talk' : i === sc.at ? (x.mood || 'read') : 'idle', x.name)}<b>${esc(x.name)}</b><small>${esc(x.does || '')}</small></li>` }).join('')}</ol>
${Object.keys(sc.says).length ? `<div class="sb-says">${st.map((x, i) => { const say = sc.says[i] || sc.says[x.id]; return say ? `<p class="sb-say"><b>${esc(x.name)}:</b> ${esc(say)}</p>` : '' }).join('')}</div>` : ''}
<div class="sb-cards">${sc.cards.map(card).join('')}</div></section>`
    }
    function paint(stage, ch, sc, prev, animate) {
        stage.className = 'sb-stage' + (sc.lanes.length > 1 && !ch.track ? ' two' : '') + (animate ? '' : ' still')
        stage.innerHTML = sc.list ? `<ol class="sb-list">${sc.list.map(x => `<li>${esc(x)}</li>`).join('')}</ol>` : ch.track ? drawTrack(ch, sc, prev, animate) : sc.lanes.map((l, i) => drawLane(ch, l, prev && prev.lanes[i], animate)).join('')
        sizes(stage, ch)
    }
    // sizes are set through the CSSOM (no inline style attributes: the site may run under a strict Content-Security-Policy)
    function sizes(stage, ch) {
        for (const e of stage.querySelectorAll('[data-u]')) e.style.setProperty('--u', e.dataset.u)
        for (const e of stage.querySelectorAll('[data-n]')) e.style.setProperty('--n', e.dataset.n)
        for (const e of stage.querySelectorAll('[data-units]')) e.style.setProperty('--units', e.dataset.units)
        for (const e of stage.querySelectorAll('[data-w]')) e.style.width = (60 * e.dataset.w / (ch.maxReq || 1)) + '%'
        for (const e of stage.querySelectorAll('[data-i]')) e.style.setProperty('--i', e.dataset.i)
    }
    // one screen: on a desk the stage, the caption and the controls fit the window without scrolling. The chapter's tallest scene
    // is measured and the block height (--U) is lowered until it fits (never under 13 px); the stage then keeps that height, so
    // nothing jumps between scenes. On a phone the page scrolls and the controls stick to the bottom instead.
    function fit() {
        const ch = S.anim.chapters[S.ch], stage = root.querySelector('.sb-stage'), sb = root.querySelector('.sb')
        S.fit = S.ch + '|' + window.innerWidth + '|' + window.innerHeight + '|' + !!S.max
        stage.style.removeProperty('--U'); stage.style.minHeight = '0'; root.querySelector('.sb-script').style.height = wide() ? '100px' : ''
        if (window.innerWidth < 700) { stage.style.minHeight = ''; root.querySelector('.sb-caption').style.minHeight = ''; return }
        const cap = root.querySelector('.sb-caption'); cap.style.minHeight = ''
        const last = sb.lastElementChild, total = () => Math.ceil(last.getBoundingClientRect().bottom - sb.getBoundingClientRect().top + sb.scrollTop + 14)   // the player's content, top to bottom (when maximised its box is the window, whatever it holds)
        const tallest = () => { let all = 0, st = 0, cp = 0; for (const sc of ch.scenes) { paint(stage, ch, sc, null, false); cap.innerHTML = caption(ch, sc, 0); all = Math.max(all, total()); st = Math.max(st, stage.offsetHeight); cp = Math.max(cp, cap.offsetHeight) } return { all, st, cp } }
        let h = tallest()
        const room = S.max ? window.innerHeight : window.innerHeight - Math.min(sb.getBoundingClientRect().top + window.scrollY, 240) - 8
        if (S.max) for (let U = 22; U <= 46; U++) { stage.style.setProperty('--U', U + 'px'); const n = tallest(); if (n.all > room) { stage.style.setProperty('--U', (U - 1) + 'px'); h = tallest(); break } h = n }   // room to spare: taller blocks
        for (let U = Math.round(parseFloat(getComputedStyle(stage).getPropertyValue('--U'))) - 1; h.all > room && U >= 15; U--) { stage.style.setProperty('--U', U + 'px'); const n = tallest(); if (n.all >= h.all) { stage.style.setProperty('--U', (U + 1) + 'px'); break } h = n }   // stop when shorter blocks no longer help
        stage.style.minHeight = h.st + 'px'; cap.style.minHeight = h.cp + 'px'
        const scr = root.querySelector('.sb-script'); scr.style.height = wide() ? (h.st + (S.max ? Math.max(0, room - h.all) : 0)) + 'px' : ''
        if (S.max && room > h.all) stage.style.minHeight = (h.st + room - h.all) + 'px'
    }
    const caption = (ch, sc, i) => `<b>${esc(ch.title)} · scene ${i + 1} of ${ch.scenes.length}${ch.track || sc.list ? '' : ' <span>· blocks show size as an illustration, not a measurement</span>'}</b>${sc === ch.scenes[0] && ch.question ? `<strong>${esc(ch.question)}</strong> ` : ' '}${esc(sc.caption)}${sc.note ? ` <small>${esc(sc.note)}</small>` : ''}`
    function draw(animate) {
        const a = S.anim, ch = a.chapters[S.ch], sc = ch.scenes[S.sc], stage = root.querySelector('.sb-stage')
        const prev = S.prev && S.prev.ch === S.ch ? ch.scenes[S.prev.sc] : null
        animate = animate && !still()
        root.querySelector('.sb-main').classList.toggle('solo', !!sc.list)   // a list (what this simplifies) is its own text: no script beside it
        if (S.fit !== S.ch + '|' + window.innerWidth + '|' + window.innerHeight + '|' + !!S.max) fit()
        paint(stage, ch, sc, prev, animate)
        if (!S.started) stage.insertAdjacentHTML('beforeend', '<button type="button" class="sb-big" data-do="play"><span aria-hidden="true">▶</span> Play</button>')
        root.querySelector('.sb-caption').innerHTML = caption(ch, sc, S.sc)
        root.querySelectorAll('.sb-chapters button').forEach((b, i) => b.setAttribute('aria-current', i === S.ch ? 'true' : 'false'))
        root.querySelector('.sb-scenes').innerHTML = ch.scenes.map((x, i) => `<button type="button" data-sc="${i}" aria-label="Scene ${i + 1}" aria-current="${i === S.sc}">${i + 1}</button>`).join('')
        const first = S.ch === 0 && S.sc === 0, last = S.ch === a.chapters.length - 1 && S.sc === ch.scenes.length - 1
        root.querySelector('[data-do=prev]').disabled = first
        root.querySelector('[data-do=next]').disabled = last
        const hash = '#' + (S.ch + 1) + '/' + (S.sc + 1), link = root.querySelector('.sb-link')
        link.href = hash; link.textContent = 'Link to this scene'
        if (S.started) try { history.replaceState(null, '', hash) } catch (e) { }
        if (!S.prev || S.prev.ch !== S.ch) unfold()
        mark()
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
    function started() { if (S.started) return; S.started = true; const b = root.querySelector('.sb-big'); if (b) b.remove() }
    function next() { const ch = S.anim.chapters[S.ch]; if (S.sc < ch.scenes.length - 1) go(S.ch, S.sc + 1); else if (S.ch < S.anim.chapters.length - 1) go(S.ch + 1, 0); else play(false) }
    function prev() { if (S.sc > 0) go(S.ch, S.sc - 1, false); else if (S.ch > 0) go(S.ch - 1, -1, false) }
    const dur = sc => sc.dur || Math.max(3500, 1500 + 42 * String(sc.caption).length)
    function schedule() {
        clearTimeout(S.timer)
        const sc = S.anim.chapters[S.ch].scenes[S.sc], bar = root.querySelector('.sb-progress i')
        const ms = (sc.dur || dur(sc)) / S.speed
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

    // the text twin below the player, folded by chapter with the current one open (without JavaScript it is simply all there)
    function fold() {
        for (const h of [...document.querySelectorAll('main.doc article h2')]) {
            if (!/^\d+\. /.test(h.textContent.trim())) continue
            const d = document.createElement('details'), sm = document.createElement('summary'); d.className = 'sb-fold'; d.dataset.ch = h.textContent.trim(); sm.textContent = h.textContent
            let n = h.nextElementSibling; h.replaceWith(d); d.appendChild(sm)
            while (n && n.tagName !== 'H2') { const next = n.nextElementSibling; d.appendChild(n); n = next }
        }
    }
    const wide = () => window.innerWidth >= 1000
    function unfold() { const ch = S.anim.chapters[S.ch]; for (const d of document.querySelectorAll('details.sb-fold')) d.open = !wide() && d.dataset.ch === (S.ch + 1) + '. ' + ch.title }
    // the script: the chapter's scenes as text beside the stage, the current one marked; the writing is part of the piece
    function script() {
        const ch = S.anim.chapters[S.ch], el = root.querySelector('.sb-script')
        el.innerHTML = `<h3><span>${S.ch + 1}</span> ${esc(ch.title)}</h3>${ch.question ? `<p class="q">${esc(ch.question)}</p>` : ''}<ol>${ch.scenes.map((sc, i) => `<li><button type="button" data-sc="${i}" aria-current="${i === S.sc}"><b>${i + 1}</b><span>${esc(sc.caption)}${sc.note ? `<small>${esc(sc.note)}</small>` : ''}</span></button></li>`).join('')}</ol>${ch.track || ch.scenes[0].list ? '' : '<p class="fine">Blocks show size as an illustration, not a measurement.</p>'}`
    }
    function mark() {
        const el = root.querySelector('.sb-script'); if (!el.firstChild || el.dataset.ch !== String(S.ch)) { script(); el.dataset.ch = S.ch }
        el.querySelectorAll('button').forEach((b, i) => b.setAttribute('aria-current', i === S.sc))
        const cur = el.querySelector('[aria-current=true]'); if (cur) el.scrollTop = Math.max(0, cur.offsetTop - el.offsetTop - 60)   // scroll the script, never the page
    }
    function maximise(on) {
        const sb = root.querySelector('.sb'); S.max = on; sb.classList.toggle('max', on); document.documentElement.style.overflow = on ? 'hidden' : ''
        const b = root.querySelector('[data-do=max]'); b.textContent = on ? 'Close full screen' : 'Full screen'; b.setAttribute('aria-pressed', on)
        S.fit = ''; draw(false); if (on) sb.focus()
    }
    function frame() {
        const a = S.anim
        root.innerHTML = `<div class="sb" tabindex="0" role="group" aria-label="Storyboard: ${esc(a.title)}">
<div class="sb-title"><a class="sb-back" href="../index.html">Studio</a><h2>${esc(a.title)}</h2><button type="button" data-do="max" aria-pressed="false" title="Fill the screen (F); Escape returns">Full screen</button><p class="meta"><b>What you will see:</b> ${esc(a.summary || '')} ${a.chapters.length - (a.simplifies ? 1 : 0)} chapters, ${a.chapters.reduce((n, c) => n + c.scenes.length, 0)} scenes, about ${Math.round(a.chapters.reduce((n, c) => n + c.scenes.reduce((m, sc) => m + dur(sc), 0), 0) / 60000)} minutes at normal speed, or step through with Next.</p></div>
<ol class="sb-chapters">${a.chapters.map((c, i) => `<li><button type="button" data-ch="${i}"><span>${i + 1}</span> ${esc(c.title)}</button></li>`).join('')}</ol>
<div class="sb-main"><div class="sb-left-pane"><div class="sb-stage"></div>
<p class="sb-caption" aria-live="polite"></p></div><aside class="sb-script" aria-label="This chapter, scene by scene"></aside></div>
<div class="sb-progress" aria-hidden="true"><i></i></div>
<div class="sb-controls"><button type="button" data-do="prev" title="Previous scene (←)">Previous</button><button type="button" data-do="play" class="primary" aria-pressed="false" title="Play or pause (Space)">Play</button><button type="button" data-do="next" title="Next scene (→)">Next</button><button type="button" data-do="speed" title="Speed (S)">Speed 1×</button></div>
<div class="sb-more"><button type="button" data-do="restart" title="Restart this chapter (R)">Restart</button><a class="sb-link" href="#" title="Copy a link to this scene">Link to this scene</a><span class="sb-scenes" role="group" aria-label="Scenes of this chapter"></span></div>
<p class="sb-keys meta">Keys: Space play or pause · ← → scene · PageUp PageDown chapter · R restart · S speed · F full screen, Escape to return. The whole text, plain, is below.</p>
</div>`
        const sb = root.querySelector('.sb')
        sb.addEventListener('click', e => {
            const l = e.target.closest('.sb-link')
            if (l) { e.preventDefault(); S.started = true; try { history.replaceState(null, '', l.getAttribute('href')) } catch (x) { } const done = () => { l.textContent = 'Link copied' }; if (navigator.clipboard) navigator.clipboard.writeText(l.href).then(done, () => { l.textContent = 'The link is in the address bar' }); else l.textContent = 'The link is in the address bar'; return }
            const b = e.target.closest('button'); if (!b) return
            started()
            if (b.dataset.ch) return go(+b.dataset.ch, 0)
            if (b.dataset.sc) return go(S.ch, +b.dataset.sc)
            const d = b.dataset.do
            if (d === 'play') play(!S.playing); else if (d === 'next') next(); else if (d === 'prev') prev(); else if (d === 'restart') go(S.sc === 0 ? 0 : S.ch, 0); else if (d === 'speed') speed(); else if (d === 'max') maximise(!S.max)
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
            else if (k === 'f' || k === 'F') maximise(!S.max)
            else if (k === 'Escape' && S.max) maximise(false)
            else if (/^[1-9]$/.test(k) && !onControl && +k <= S.anim.chapters.length) go(+k - 1, 0)
            else done = false
            if (done) { e.preventDefault(); started() }
        })
        let rz = 0; window.addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => draw(false), 150) })
        document.addEventListener('visibilitychange', () => { if (document.hidden && S.playing) play(false) })
    }
    function load(id, ch, sc) {
        return getJSON(base + id + '.json').then(a => { clearTimeout(S.timer); S.playing = false; S.prev = null; S.anim = normalise(a); S.fit = ''; if (ch || sc) S.started = true; frame(); go(ch || 0, sc || 0, false) })
    }
    fold()
    const h = decodeURIComponent(location.hash.slice(1)).split('/').filter(x => /^\d+$/.test(x))   // #chapter/scene (an older link's #name/chapter/scene still lands)
    load(root.dataset.anim, (+h[0] || 1) - 1, (+h[1] || 1) - 1).catch(e => { root.insertAdjacentHTML('beforeend', `<p class="meta">The player could not load this explanation (${esc(e.message)}). The same, as text, is below.</p>`) })
})()
