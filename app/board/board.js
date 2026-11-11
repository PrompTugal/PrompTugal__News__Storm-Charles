// The board (incident.board@web-summit.dinis): board/index.json drawn as columns by state, filtered by kind, owner and
// "waiting on Dinis"; a card opens with its evidence, its history and what would close it. Also three small embeds for other pages:
//   <div id="board" data-base="../"></div>                                             the whole board
//   <div data-board-embed="tasks" data-base=""></div>                                  the contributor tasks (for Contribute)
//   <div data-board-embed="agent" data-agent="incident.dev@web-summit.dinis" data-base="../../"></div>   one agent's cards
//   <div data-board-embed="dinis" data-base="../"></div>                               what waits on Dinis
// data-base is the path from the page to the site's root. No dependencies, no inline style or script, text set as text
// (never as HTML), colours from app/site.css tokens only. Re-read every minute while the page is open.
(function () {
    'use strict'
    var STATES = ['open', 'watching', 'blocked', 'answered', 'done']
    var KINDS = ['question', 'conflict', 'ask', 'job', 'task-for-contributors']
    var KIND_NAME = { question: 'question', conflict: 'conflict', ask: 'ask', job: 'job', 'task-for-contributors': 'task for contributors' }
    var CLOSED = { answered: 1, done: 1 }

    function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e }
    function add(p) { for (var i = 1; i < arguments.length; i++) if (arguments[i]) p.appendChild(typeof arguments[i] === 'string' ? document.createTextNode(arguments[i]) : arguments[i]); return p }
    function link(href, text, out) { var a = el('a', out ? 'bd-out' : '', text); a.href = href; if (out) { a.rel = 'noopener'; a.title = 'Leaves this site' } return a }
    function short(a) { return String(a || '').replace(/@web-summit\.dinis$/, '@') }
    function hm(t) { return String(t || '').replace('T', ' ').slice(0, 16) }
    function time(t) { var e = el('time', '', hm(t) + ' UTC'); e.dateTime = t; return e }
    function chip(cls, text) { return el('span', 'bd-chip ' + cls, text) }
    function load(base) { return fetch(base + 'board/index.json', { cache: 'no-store' }).then(function (r) { if (!r.ok) throw new Error('board/index.json: ' + r.status); return r.json() }) }
    function agentLink(base, a) { return /@web-summit\.dinis$/.test(a || '') ? link(base + 'agents/index.html?who=' + encodeURIComponent(a), short(a)) : el('span', '', short(a)) }
    function itemHref(base, id) { return base + 'board/items/' + id + '.html' }

    function evidence(base, e) {
        var li = el('li', 'bd-ev')
        if (e.type === 'timeline row') add(li, chip('bd-evt', 'timeline row'), link(base + e.path, e.id), ' ', e.label ? el('span', 'lbl l-' + e.label, e.label) : null, ' ', time(e.at), el('span', 'bd-evtext', e.text))
        else if (e.type === 'decision') {
            add(li, chip('bd-evt', 'decision'), link(base + e.path, e.id), ' ', e.label ? el('span', 'lbl l-' + e.label, e.label) : null, ' ', el('span', 'bd-st', e.status || ''), e.at ? time(e.at) : null, el('span', 'bd-evtext', e.text))
            if (e.source) add(li, el('span', 'bd-src'), 'source: ', link(e.source, new URL(e.source).host, true), e.read_utc ? ', read ' + hm(e.read_utc) + ' UTC' : '')
        }
        else if (e.type === 'file') add(li, chip('bd-evt', 'file'), e.path ? link(base + e.path, e.id) : el('code', '', e.id))
        else add(li, chip('bd-evt bd-bad', 'not resolved'), el('code', '', e.id), ' ', e.text)
        return li
    }

    function cardFace(base, it, open) {
        var b = el(open ? 'button' : 'a', 'bd-card k-' + it.kind + ' s-' + it.state)
        if (open) { b.type = 'button'; b.addEventListener('click', function () { open(it.id) }) } else b.href = itemHref(base, it.id)
        b.dataset.id = it.id
        add(b, add(el('span', 'bd-top'), chip('bd-kind', KIND_NAME[it.kind] || it.kind), it.contribute_id ? chip('bd-type', it.contribute_id) : null, it.task_type ? chip('bd-type', it.task_type) : null, open ? null : chip('bd-state', it.state)),
            el('span', 'bd-title', it.title),
            add(el('span', 'bd-foot'), el('span', 'bd-owner', short(it.owner)), it.waiting_on ? chip('bd-wait' + (it.waiting_on === 'Dinis' ? ' bd-dinis' : ''), 'waiting on ' + short(it.waiting_on)) : null,
                (it.evidence_resolved || []).length ? el('span', 'bd-n', it.evidence_resolved.length + ' evidence') : null))
        return b
    }

    function detail(base, data, it, open) {
        var byId = {}; data.items.forEach(function (x) { byId[x.id] = x })
        var d = el('div', 'bd-detail')
        add(d, add(el('p', 'bd-top'), chip('bd-kind', KIND_NAME[it.kind] || it.kind), chip('bd-state s-' + it.state, it.state), it.waiting_on ? chip('bd-wait' + (it.waiting_on === 'Dinis' ? ' bd-dinis' : ''), 'waiting on ' + short(it.waiting_on)) : null),
            el('h2', '', it.title), el('p', 'bd-sum', it.summary))
        var rb = el('span'); (it.raised_by || []).forEach(function (a, i) { add(rb, i ? ', ' : ' · raised by ', agentLink(base, a)) })
        add(d, add(el('p', 'meta'), 'Owner: ', agentLink(base, it.owner), rb, ' · opened ', time(it.opened_utc), ' · updated ', time(it.updated_utc), ' · ', el('code', '', it.id)))
        if (it.answer) add(d, el('h3', '', 'The answer'), add(el('p', 'bd-answer'), el('strong', '', it.answer.text), ' ', it.answer.label ? el('span', 'lbl l-' + it.answer.label, it.answer.label) : null))
        if (it.blocks) add(d, el('h3', '', 'What it blocks'), el('p', '', it.blocks))
        if ((it.unblocks || []).length) { var ub = el('div', 'bd-links'); it.unblocks.forEach(function (id) { if (byId[id]) add(ub, cardFace(base, byId[id], open)) }); add(d, el('h3', '', 'Cards behind this one (' + it.unblocks.length + ')'), ub) }
        add(d, el('h3', '', 'What would close it'), el('p', '', it.closes || 'Not written yet.'))
        if (it.who_answers) add(d, el('p', 'meta', 'Who would answer: ' + it.who_answers + '.'))
        if ((it.where_we_look || []).length) { var w = el('p', 'meta', 'Where we look: '); it.where_we_look.forEach(function (u, i) { add(w, i ? ', ' : '', link(u, u.replace(/^https:\/\//, '').replace(/\/$/, ''), true)) }); add(d, w) }
        if ((it.sides || []).length) { var s = el('ul', 'bd-sides'); it.sides.forEach(function (x) { add(s, add(el('li'), el('strong', '', x.claim), ': ' + x.held_by)) }); add(d, el('h3', '', 'The two sides'), s) }
        var ev = el('ul', 'bd-evs'); (it.evidence_resolved || []).forEach(function (e) { add(ev, evidence(base, e)) })
        add(d, el('h3', '', 'Evidence (' + (it.evidence_resolved || []).length + ')'), (it.evidence_resolved || []).length ? ev : el('p', 'meta', 'None linked yet.'))
        if ((it.links || []).length) { var l = el('div', 'bd-links'); it.links.forEach(function (id) { if (byId[id]) add(l, cardFace(base, byId[id], open)) }); add(d, el('h3', '', 'Connected cards'), l) }
        if ((it.sources || []).length) { var so = el('ul', 'bd-hist'); it.sources.forEach(function (x) { add(so, add(el('li'), link(base + x.file, x.file), ' (' + x.field + '): “' + x.starts + '…”')) }); add(d, el('h3', '', 'Where the card came from'), so) }
        var h = el('ul', 'bd-hist'); (it.history || []).forEach(function (x) { add(h, add(el('li'), time(x.at), ' · ' + short(x.by) + ': ' + x.change)) })
        add(d, el('h3', '', 'History'), h, add(el('p', 'meta'), link(itemHref(base, it.id), 'This card as a page'), ' · ', link(base + 'board/items/' + it.id + '.json', 'as data')))
        return d
    }

    // ------------------------------------------------------------ the whole board
    function board(root) {
        var base = root.dataset.base || '', data = null
        var f = { kinds: {}, owner: '', dinis: false, q: '', closed: true }
        try { var saved = JSON.parse(sessionStorage.getItem('board-filter') || 'null'); if (saved) f = saved } catch (e) { }
        var bar = el('form', 'bd-bar'), cols = el('div', 'bd-cols'), dlg = el('dialog', 'bd-dialog'), note = el('p', 'meta bd-note')
        bar.addEventListener('submit', function (e) { e.preventDefault() })
        root.textContent = ''; add(root, bar, note, cols, dlg)
        dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close() })
        dlg.addEventListener('close', function () { if (location.hash.length > 1 && data && data.items.some(function (i) { return '#' + i.id === location.hash })) history.replaceState(null, '', location.pathname + location.search) })

        function open(id, quiet) {
            var it = data && data.items.filter(function (i) { return i.id === id })[0]; if (!it) return
            dlg.textContent = ''
            var x = el('button', 'bd-x', 'Close'); x.type = 'button'; x.addEventListener('click', function () { dlg.close() })
            add(dlg, x, detail(base, data, it, open))
            if (!dlg.open) { if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '') }
            dlg.scrollTop = 0
            if (!quiet) history.replaceState(null, '', '#' + id)
        }
        function pass(i) {
            var anyKind = KINDS.some(function (k) { return f.kinds[k] })
            if (anyKind && !f.kinds[i.kind]) return false
            if (f.owner && i.owner !== f.owner && (i.raised_by || []).indexOf(f.owner) < 0) return false
            if (f.dinis && i.waiting_on !== 'Dinis') return false
            if (f.q && JSON.stringify([i.id, i.title, i.summary, i.owner, i.waiting_on]).toLowerCase().indexOf(f.q.toLowerCase()) < 0) return false
            return true
        }
        function drawBar() {
            bar.textContent = ''
            var kinds = add(el('fieldset'), el('legend', '', 'Kind'))
            KINDS.forEach(function (k) {
                var b = el('button', 'bd-f' + (f.kinds[k] ? ' on' : ''), KIND_NAME[k] + ' ' + data.counts.by_kind[k]); b.type = 'button'; b.setAttribute('aria-pressed', f.kinds[k] ? 'true' : 'false')
                b.addEventListener('click', function () { f.kinds[k] = !f.kinds[k]; draw() }); add(kinds, b)
            })
            var who = add(el('fieldset'), el('legend', '', 'Who'))
            var dn = el('button', 'bd-f bd-fd' + (f.dinis ? ' on' : ''), 'waiting on Dinis ' + data.counts.waiting_on_dinis); dn.type = 'button'; dn.setAttribute('aria-pressed', f.dinis ? 'true' : 'false')
            dn.addEventListener('click', function () { f.dinis = !f.dinis; draw() })
            var sel = el('select'); sel.setAttribute('aria-label', 'Owner or raised by'); add(sel, new Option('every agent', ''))
            data.agents.forEach(function (a) { var n = a.owns.length + a.raised.length; if (n) add(sel, new Option(short(a.name) + ' ' + n + (a.blocked ? ' (says it is blocked)' : ''), a.name)) })
            sel.value = f.owner; sel.addEventListener('change', function () { f.owner = sel.value; draw() })
            add(who, dn, sel)
            var find = add(el('fieldset'), el('legend', '', 'Find'))
            var q = el('input'); q.type = 'search'; q.placeholder = 'a word, an id'; q.value = f.q; q.setAttribute('aria-label', 'Find a card')
            q.addEventListener('input', function () { f.q = q.value; drawCols() })
            var cl = el('label', 'bd-check'), cb = el('input'); cb.type = 'checkbox'; cb.checked = !!f.closed; cb.addEventListener('change', function () { f.closed = cb.checked; draw() }); add(cl, cb, ' answered and done')
            add(find, q, cl)
            add(bar, kinds, who, find, add(el('p', 'bd-go'), link('for-dinis.html', 'For Dinis: what waits on you'), ' · ', link('tasks.html', 'What a reader can do now'), ' · ', link('index.json', 'the data')))
        }
        function drawCols() {
            cols.textContent = ''
            var shown = 0
            STATES.forEach(function (s) {
                if (CLOSED[s] && !f.closed) return
                var list = data.items.filter(function (i) { return i.state === s && pass(i) })
                list.sort(function (a, b) { return (a.kind === b.kind ? 0 : KINDS.indexOf(a.kind) - KINDS.indexOf(b.kind)) || (a.rank || 99) - (b.rank || 99) || (a.updated_utc < b.updated_utc ? 1 : -1) })
                shown += list.length
                var c = el('section', 'bd-col s-' + s); c.setAttribute('aria-label', s)
                add(c, add(el('h2'), s + ' ', el('i', '', String(list.length))), el('p', 'bd-says', data.states[s]))
                list.forEach(function (i) { add(c, cardFace(base, i, open)) })
                if (!list.length) add(c, el('p', 'meta', 'None.'))
                add(cols, c)
            })
            note.textContent = shown + ' of ' + data.counts.cards + ' cards · the board as of ' + hm(data.updated) + ' UTC' + ((data.not_on_a_card_yet || []).length ? ' · ' + data.not_on_a_card_yet.length + ' lines in the agents\' status files are not on a card yet (listed below)' : '')
            try { sessionStorage.setItem('board-filter', JSON.stringify(f)) } catch (e) { }
        }
        function draw() { drawBar(); drawCols() }
        function refresh(first) {
            load(base).then(function (j) {
                var changed = !data || data.updated !== j.updated || data.items.length !== j.items.length
                data = j
                if (changed) draw()
                if (first && location.hash.length > 1) open(decodeURIComponent(location.hash.slice(1)), true)
            }).catch(function (e) { if (first) note.textContent = 'The board could not be read (' + e.message + '). Every card is listed below.' })
        }
        window.addEventListener('hashchange', function () { if (location.hash.length > 1) open(decodeURIComponent(location.hash.slice(1)), true) })
        refresh(true); setInterval(function () { if (!document.hidden && !dlg.open) refresh(false) }, 60000)
    }

    // ------------------------------------------------------------ the small embeds
    function embed(root) {
        if (root.dataset.boardDone) return; root.dataset.boardDone = '1'   // safe to load and run more than once
        var base = root.dataset.base || '', what = root.dataset.boardEmbed, who = root.dataset.agent || ''
        load(base).then(function (data) {
            var list, head, more
            if (what === 'tasks') { list = data.items.filter(function (i) { return i.kind === 'task-for-contributors' && !CLOSED[i.state] }); list.sort(function (x, y) { return (x.contribute_id || 'C-99').localeCompare(y.contribute_id || 'C-99') }); head = 'What you can do right now (' + list.length + ')'; more = link(base + 'board/tasks.html', 'All the tasks, with what a good answer carries') }
            else if (what === 'dinis') { var by = {}; data.items.forEach(function (i) { by[i.id] = i }); list = data.for_dinis.map(function (id) { return by[id] }); head = 'Waiting on Dinis (' + list.length + ')'; more = link(base + 'board/for-dinis.html', 'The list for Dinis, most blocking first') }
            else { list = data.items.filter(function (i) { return !CLOSED[i.state] && (i.owner === who || (i.raised_by || []).indexOf(who) >= 0 || i.waiting_on === who) }); head = 'On the board (' + list.length + ')'; more = link(base + 'board/index.html', 'The whole board') }
            root.textContent = ''
            var box = el('div', 'bd-embed'), l = el('div', 'bd-links')
            list.forEach(function (i) { add(l, cardFace(base, i, null)) })
            add(root, add(box, el('h2', '', head), list.length ? l : el('p', 'meta', 'Nothing open.'), add(el('p', 'meta'), more, ' · as of ' + hm(data.updated) + ' UTC')))
        }).catch(function () { root.textContent = ''; add(root, add(el('p', 'meta'), 'The board could not be read. ', link(base + 'board/index.html', 'The board'))) })
    }

    function start() {
        if (!document.querySelector('link[href*="app/board/board.css"]')) {   // an embed brings its own stylesheet
            var any = document.querySelector('[data-board-embed]'); if (any) { var c = document.createElement('link'); c.rel = 'stylesheet'; c.href = (any.dataset.base || '') + 'app/board/board.css'; document.head.appendChild(c) }
        }
        var b = document.getElementById('board'); if (b && !b.dataset.boardDone) { b.dataset.boardDone = '1'; board(b) }
        Array.prototype.forEach.call(document.querySelectorAll('[data-board-embed]'), embed)
    }
    window.BoardEmbeds = { scan: start }   // a page that redraws itself can call this after adding [data-board-embed] elements
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start()
})()
