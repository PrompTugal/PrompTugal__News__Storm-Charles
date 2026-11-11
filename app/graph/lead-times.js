// Lead times (/app/graph/lead-times/): one line of time, every warning and decision with a time known to the minute,
// with the time between each and the next and how long before the first red warning starts in Lisbon. It is
// data/graph/tables/timeline.json, drawn; every cell goes somewhere: the time to the node, who to the actor, what to the
// node's own graph, the source out (marked), the origin to the file. incident.graph@web-summit.dinis.
(function () {
    'use strict'
    const D = window.StormData, { el } = D
    const root = document.getElementById('lead-times'), BASE = root.dataset.base
    root.innerHTML = '<p class="kicker">Lead times</p><h1>How far ahead could we have known?</h1>' +
        '<p class="meta" id="lt-note">Reading…</p>' +
        '<div class="chips" id="lt-show" role="group" aria-label="Show"></div>' +
        '<ol class="g-line" id="lt-line"></ol>' +
        '<h2 class="sec" id="table">The same as a table</h2><div class="q-out" tabindex="0"><table id="lt-table"></table></div>' +
        '<p class="meta">As data: <a href="../../../data/graph/tables/timeline.json">tables/timeline.json</a> · as a query: <a href="../../../data/query/index.html?example=lead-times">How far ahead could we have known?</a> · <a href="../index.html?q=decided-on-warning">the same events as a graph</a>. Order, not cause.</p>'
    const $ = id => document.getElementById(id), DAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const nodeLink = (id, text, cls) => el('a', { href: D.nodeHref(BASE, id), class: cls || '', text })
    let rows = [], G = null, kinds = new Set(['warning', 'decision'])
    function draw() {
        const ol = $('lt-line'), tb = $('lt-table'); ol.textContent = ''; tb.textContent = ''
        const rs = rows.filter(r => kinds.has(r.kind)); let prev = null
        tb.append(el('thead', {}, el('tr', {}, ['when (UTC)', 'who', 'what', 'after the row above', 'before red starts', 'before its own effect', 'the time is', 'label', 'source', 'built from'].map(h => el('th', { scope: 'col', text: h })))))
        const body = el('tbody'); tb.append(body)
        for (const r of rs) {
            const gap = prev === null ? null : Math.round((r.at_epoch - prev) / 60) / 60; prev = r.at_epoch
            if (gap !== null) ol.append(el('li', { class: 'gap' }, [el('span', { text: gap === 0 ? 'at the same time' : '+ ' + D.dur(gap) })]))
            const when = new Date(r.at_epoch * 1000), by = (G.inn.get(r.id) || []).find(e => e.rel === 'decides' || e.rel === 'warns'), oh = D.originHref(BASE, G.storm, r.origin.startsWith(G.storm.origin_base) ? r.origin.slice(G.storm.origin_base.length) : '/' + r.origin)
            const who = by ? nodeLink(by.from, r.who || '') : el('span', { text: r.who || '' })
            const ahead = r.h_before_red_starts == null ? '' : D.dur(r.h_before_red_starts) + (r.h_before_red_starts < 0 ? ' after red starts' : ' before red starts')
            const eff = r.h_before_effect == null ? '' : D.dur(r.h_before_effect) + (r.h_before_effect < 0 ? ' after' : ' before')
            ol.append(el('li', { class: 'ev ' + r.kind + (r.level ? ' ' + r.level : ''), id: r.id.replace(/[^A-Za-z0-9_-]+/g, '-') }, [
                nodeLink(r.id, '', 't'), el('div', {}, [el('b', {}, [who]), ' ', el('span', { class: 'lab ' + r.label, text: r.label }), r.level ? ' ' : '', r.level ? el('span', { class: 'lvl ' + r.level, text: r.level }) : '', el('br'), nodeLink(r.id, D.short(r.what, 170), 'what'),
                    el('small', {}, [r.time_is + ' · ', D.outLink(r.source), eff ? ` · ${eff} it takes effect` : '', ' · ', el('a', { href: oh, text: 'built from' })])]),
                el('span', { class: 'ahead', text: ahead })]))
            ol.lastChild.querySelector('a.t').append(el('time', { datetime: r.at, text: `${DAY[when.getUTCDay()]} ${r.at.slice(11, 16)}` }))
            body.append(el('tr', {}, [el('td', { class: 'time' }, [nodeLink(r.id, r.at.replace('T', ' ').replace(/(:\d\d)?Z$/, ''))]), el('td', {}, [by ? nodeLink(by.from, r.who || '') : (r.who || '')]), el('td', {}, [nodeLink(r.id, D.short(r.what, 120))]),
                el('td', { class: 'num', text: gap == null ? '' : D.dur(gap) }), el('td', { class: 'num', text: ahead.replace(' red starts', '') }), el('td', { class: 'num', text: eff }), el('td', { text: r.time_is }),
                el('td', {}, [el('span', { class: 'lab ' + r.label, text: r.label })]), el('td', {}, [D.outLink(r.source)]), el('td', {}, [el('a', { href: oh, text: r.origin.split('/').slice(-1)[0].split('#')[0] })])]))
        }
    }
    (async () => {
        try {
            G = await D.load(BASE); const t = await G.table('timeline'); rows = t.rows
            const red = rows.find(r => r.h_before_red_starts != null), redAt = red ? new Date((red.at_epoch + red.h_before_red_starts * 3600) * 1000).toISOString().slice(0, 16).replace('T', ' ') : null
            $('lt-note').textContent = `${rows.length} warnings and decisions with a time known to the minute, in order (UTC = Lisbon time), as of ${D.when(t.as_of)}. Between two rows: the time that passed. On the right: how long before the first red warning starts in Lisbon${redAt ? ' (' + redAt + ' UTC)' : ''}. For IPMA's colour warnings the time is when IPMA sent the message. The bar on the left is blue for a decision, IPMA's level colour for a warning that has a level, grey for any other warning. Every time, name and line is a link. Order, not cause.`
            for (const [k, text] of [['warning', 'Warnings'], ['decision', 'Decisions']]) { const b = el('button', { type: 'button', 'aria-pressed': 'true' }, [el('span', { text }), el('span', { class: 'n', text: String(rows.filter(r => r.kind === k).length) })]); b.addEventListener('click', () => { const p = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', String(p)); p ? kinds.add(k) : kinds.delete(k); draw() }); $('lt-show').append(b) }
            draw()
            if (location.hash.length > 1) { const t2 = document.getElementById(location.hash.slice(1)); if (t2) t2.scrollIntoView() }
        } catch (e) { $('lt-note').textContent = 'The lead times could not be read: ' + (e && e.message || e) }
    })()
})()
