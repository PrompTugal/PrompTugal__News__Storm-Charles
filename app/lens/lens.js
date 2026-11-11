// The lens (incident.entities@web-summit.dinis): the content of the reader's panel's "Lens" and "This item" accordions.
// The frame and the panel shell are incident.designer@'s: this script fills #panel-lens and #panel-item when they exist and
// does nothing visible when they do not (a linked name is then a plain link to its page).
//   window.StormLens.mount({ lens: Element, item: Element })   fill two elements of your choosing
//   window.StormLens.show('body/ipma')                         show a node in "This item"
(function () {
    var root = document.documentElement, KINDS = [['entity', 'Entities (names linked to their node)'], ['fact', 'Facts'], ['evidence', 'Evidence'], ['hypothesis', 'Hypotheses'], ['out', 'Links that leave this site']]
    var base = (function () { var s = document.querySelector('script[src*="app/lens/lens.js"]'); return s ? s.getAttribute('src').split('app/lens/')[0] : './' })()
    var state = {}; try { state = JSON.parse(localStorage.getItem('lens') || '{}') } catch (e) { }
    function apply() { KINDS.forEach(function (k) { root.classList.toggle('lens-' + k[0], !!state[k[0]]) }) }
    // an item's label: the timeline's rows and any chip that says fact, evidence or hypothesis mark their nearest row or list item
    function tag() {
        document.querySelectorAll('.lbl, [data-label]').forEach(function (el) {
            var w = (el.getAttribute('data-label') || el.textContent || '').toLowerCase(), k = /hypothesis/.test(w) ? 'hypothesis' : /evidence/.test(w) ? 'evidence' : /fact/.test(w) ? 'fact' : ''
            var host = k && el.closest('tr, li, .card, p'); if (host && !host.hasAttribute('data-lens')) host.setAttribute('data-lens', k)
        })
    }
    function el(tag, text, cls) { var e = document.createElement(tag); if (text) e.textContent = text; if (cls) e.className = cls; return e }
    var itemEl = null
    function mount(o) {
        if (o.lens) {
            var box = el('div', '', 'lens-box')
            KINDS.forEach(function (k) {
                var l = el('label'), c = el('input'); c.type = 'checkbox'; c.checked = !!state[k[0]]
                c.addEventListener('change', function () { state[k[0]] = c.checked; try { localStorage.setItem('lens', JSON.stringify(state)) } catch (e) { } apply() })
                l.appendChild(c); l.appendChild(document.createTextNode(' ' + k[1] + ' (' + document.querySelectorAll(k[0] === 'entity' ? 'a.ent' : k[0] === 'out' ? 'a.out' : '[data-lens="' + k[0] + '"]').length + ')')); box.appendChild(l)
            })
            var m = el('p', '', 'meta'), a = el('a', 'Every entity'); a.href = base + 'entities/index.html'; m.appendChild(a); box.appendChild(m)
            o.lens.textContent = ''; o.lens.appendChild(box)
        }
        if (o.item) { itemEl = o.item; if (!itemEl.firstChild) itemEl.appendChild(el('p', 'Click a linked name to see its node here: what it is, its edges, where each was read.', 'meta')) }
    }
    function show(id) {
        if (!itemEl) return false
        fetch(base + 'entities/' + id + '.json').then(function (r) { return r.json() }).then(function (n) {
            var d = el('div', '', 'lens-item'), h = el('h3'), a = el('a', n.name); a.href = base + 'entities/' + id + '.html'; h.appendChild(a); d.appendChild(h)
            d.appendChild(el('p', n.type + ' · ' + (n.label === 'ours' ? 'our summary' : n.label), 'meta')); d.appendChild(el('p', n.summary || ''))
            var ul = el('ul'); (n.edges || []).slice(0, 12).forEach(function (e) {
                var li = el('li'), t = el('a', e.to); t.href = base + 'entities/' + e.to + '.html'; t.setAttribute('data-ent', e.to)
                li.appendChild(document.createTextNode(e.verb.replace(/_/g, ' ') + ' ')); li.appendChild(t); li.appendChild(document.createTextNode(' · ' + e.label + ' · '))
                var s = el('a', (function () { try { return new URL(e.source).host } catch (x) { return 'source' } })()); s.href = e.source; li.appendChild(s)
                if (e.read_utc) li.appendChild(document.createTextNode(', read ' + e.read_utc.replace('T', ' ').replace('Z', ' UTC')))
                ul.appendChild(li)
            }); d.appendChild(ul)
            if ((n.edges || []).length > 12) d.appendChild(el('p', (n.edges.length - 12) + ' more on its page.', 'meta'))
            itemEl.textContent = ''; itemEl.appendChild(d)
        }).catch(function () { })
        return true
    }
    function start() {
        tag(); apply()
        var lens = document.getElementById('panel-lens'), item = document.getElementById('panel-item')
        if (lens || item) mount({ lens: lens, item: item })
        document.addEventListener('click', function (ev) {
            var a = ev.target.closest && ev.target.closest('a[data-ent]')
            if (!a || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.button) return
            if (itemEl && itemEl.offsetParent !== null && show(a.getAttribute('data-ent'))) ev.preventDefault()
        })
    }
    window.StormLens = { mount: mount, show: show, kinds: KINDS.map(function (k) { return k[0] }) }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start()
})()
