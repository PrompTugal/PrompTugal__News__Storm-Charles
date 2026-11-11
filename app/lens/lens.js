// The lens's content (incident.entities@web-summit.dinis). The panel, its switches and its slots are incident.designer@'s
// (app/design/panel.js: window.stormPanel). This script:
//   - fills the "Lens" slot with what the linker found on this page (names linked, nodes, outside links);
//   - when the panel is open, a click on a linked name opens its node in "This item" (what it is, its edges with the label,
//     the source and the time read of each, its page); with the panel closed, or with a modifier key, the link is a plain link;
//   - window.StormLens.show(id) is what stormPanel.openItem(id) calls.
(function () {
    function base() { var p = document.getElementById('panel'); if (p && p.dataset.base) return p.dataset.base; var s = document.querySelector('script[src*="app/lens/lens.js"]'); return s ? s.getAttribute('src').split('app/lens/')[0] : './' }
    function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] }) }
    function host(u) { try { return new URL(u).host.replace(/^www\./, '') } catch (e) { return 'source' } }
    function when(z) { return z ? String(z).slice(0, 16).replace('T', ' ') + ' UTC' : '' }
    var names = null
    function index() { return names || (names = fetch(base() + 'entities/index.json').then(function (r) { return r.json() }).then(function (j) { var m = {}; j.nodes.forEach(function (n) { m[n.id] = n }); return m })) }
    function slot(name) { return window.stormPanel && window.stormPanel.slot ? window.stormPanel.slot(name) : document.getElementById('panel-' + name) }
    function show(id) {
        var el = slot('item'); if (!el) return false
        var b = base()
        Promise.all([fetch(b + 'entities/' + id + '.json').then(function (r) { if (!r.ok) throw 0; return r.json() }), index()]).then(function (x) {
            var n = x[0], ix = x[1], ss = n.summary_source
            var edge = function (e) {
                var to = ix[e.to] || { name: e.to }
                return '<li>' + esc(e.verb.replace(/_/g, ' ')) + ' <a class="ent" data-ent="' + esc(e.to) + '" href="' + b + 'entities/' + esc(e.to) + '.html">' + esc(to.name) + '</a> <span class="lbl l-' + esc(e.label) + '">' + esc(e.label) + '</span><span class="says">' + esc(e.says || '') + '</span><span class="pn-meta"><a href="' + esc(e.source) + '">' + esc(host(e.source)) + '</a>' + (e.read_utc ? ', read ' + esc(when(e.read_utc)) : '') + (e.row ? ' · row ' + esc(e.row) : '') + '</span></li>'
            }
            el.innerHTML = '<div class="lens-item"><p class="lens-type">' + esc(n.type) + '</p><h3><a href="' + b + 'entities/' + esc(id) + '.html">' + esc(n.name) + '</a></h3><p>' + esc(n.summary || '') + ' <span class="lbl l-' + esc(n.label) + '">' + esc(n.label === 'ours' ? 'our summary' : n.label) + '</span></p>' +
                (ss && ss.url ? '<p class="pn-meta">Read at <a href="' + esc(ss.url) + '">' + esc(host(ss.url)) + '</a>' + (ss.read_utc ? ', ' + esc(when(ss.read_utc)) : '') + '</p>' : '') +
                ((n.edges || []).length ? '<ul>' + n.edges.slice(0, 10).map(edge).join('') + '</ul>' : '<p class="pn-meta">No edge starts here yet.</p>') +
                '<p class="pn-meta"><a href="' + b + 'entities/' + esc(id) + '.html">Its page</a>: ' + (n.edges || []).length + ' edges out, the edges in, the timeline rows that name it, its evidence' + (n.graph ? '; in the graph as ' + esc(n.graph) : '') + '.</p></div>'
        }).catch(function () { el.innerHTML = '<p class="pn-meta">No node at ' + esc(id) + ' yet.</p>' })
        return true
    }
    function count() {
        var lens = slot('lens'); if (!lens) return
        var ents = document.querySelectorAll('a.ent:not(#panel a)'), ids = {}, outs = 0; [].forEach.call(ents, function (a) { ids[a.getAttribute('data-ent')] = 1 })
        ;[].forEach.call(document.querySelectorAll('main a[href^="http"], .banner a[href^="http"], body > .wrap a[href^="http"]'), function (a) { if (a.host !== location.host) outs++ })
        lens.innerHTML = '<p class="lens-count">On this page: ' + ents.length + ' linked name' + (ents.length === 1 ? '' : 's') + ' (' + Object.keys(ids).length + ' things), ' + outs + ' links that leave this site. With this panel open, a click on a linked name opens it under "This item". <a href="' + base() + 'entities/index.html">Every entity</a> · <a href="' + base() + 'entities/ontology.html">the grammar</a></p>'
    }
    function start() {
        count()
        [].forEach.call(document.querySelectorAll('#incident, [data-link-entities]'), live)
        document.addEventListener('click', function (ev) {
            if (ev.defaultPrevented || ev.button || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return
            var a = ev.target.closest && ev.target.closest('a[data-ent]'); if (!a) return
            var P = window.stormPanel; if (!P || !P.isOpen || !P.isOpen()) return
            ev.preventDefault(); P.openItem ? P.openItem(a.getAttribute('data-ent')) : show(a.getAttribute('data-ent'))
        })
    }
    // Pages drawn in the browser (the dashboard: app/storm.js) are not there when the build's linker runs: the same rule is applied
    // here, from entities/index.json (a name with a capital exactly, a lower-case name in any case, the longest first, the first
    // mention in each block), each time the drawing changes.
    var SKIP = { A: 1, CODE: 1, PRE: 1, SVG: 1, BUTTON: 1, SCRIPT: 1, STYLE: 1, LABEL: 1, SUMMARY: 1, TIME: 1, TEXTAREA: 1, SELECT: 1 }
    function live(el) {
        index().then(function (ix) {
            var by = {}, keys = []
            Object.keys(ix).forEach(function (id) { var n = ix[id]; [n.name].concat(n.also || []).forEach(function (nm) { var k = nm.toLowerCase(); if (!by[k]) { by[k] = { id: id, type: n.type, name: nm, exact: nm !== k }; keys.push(k) } }) })
            keys.sort(function (a, b) { return b.length - a.length })
            var re; try { re = new RegExp('(?<![\\p{L}\\p{N}_@/.#-])(?:' + keys.map(function (k) { return k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/ /g, '\\s+') }).join('|') + ')(?![\\p{L}\\p{N}_]|[@/-][\\p{L}\\p{N}]|\\.[\\p{L}\\p{N}])', 'giu') } catch (e) { return }
            var b = base(), busy = false
            function pass() {
                busy = true
                var w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, { acceptNode: function (t) { for (var p = t.parentNode; p && p !== el; p = p.parentNode) if (SKIP[p.nodeName.toUpperCase()] || p.hidden) return NodeFilter.FILTER_REJECT; return /\S/.test(t.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT } }), texts = [], t
                while ((t = w.nextNode())) texts.push(t)
                var seen = new Map()
                texts.forEach(function (t) {
                    var block = t.parentNode.closest('p, li, td, th, dd, dt, h1, h2, h3, h4, div, section') || el, had = seen.get(block) || {}; seen.set(block, had)
                    if (!had.init) { had.init = 1; [].forEach.call(block.querySelectorAll('a.ent'), function (a) { had[a.getAttribute('data-ent')] = 1 }) }
                    var s = t.nodeValue, m, at = 0, frag = null; re.lastIndex = 0
                    while ((m = re.exec(s))) {
                        var got = m[0].replace(/\s+/g, ' '), c = by[got.toLowerCase()]
                        if (!c || (c.exact && c.name !== got)) { re.lastIndex = m.index + 1; continue }
                        if (had[c.id]) continue
                        had[c.id] = 1; frag = frag || document.createDocumentFragment()
                        frag.appendChild(document.createTextNode(s.slice(at, m.index)))
                        var a = document.createElement('a'); a.className = 'ent ent-' + c.type; a.setAttribute('data-kind', 'entity'); a.setAttribute('data-ent', c.id); a.href = b + 'entities/' + c.id + '.html'; a.textContent = m[0]; frag.appendChild(a)
                        at = m.index + m[0].length
                    }
                    if (frag) { frag.appendChild(document.createTextNode(s.slice(at))); t.parentNode.replaceChild(frag, t) }
                })
                count(); setTimeout(function () { busy = false }, 0)
            }
            var timer = null
            new MutationObserver(function () { if (busy) return; clearTimeout(timer); timer = setTimeout(pass, 250) }).observe(el, { childList: true, subtree: true })
            pass()
        })
    }
    window.StormLens = { show: show, link: live }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start()
})()
