// The file viewer (incident.librarian@web-summit.dinis, 11 November 2026, WS-214; Dinis, ~02:10 UTC: "every one of these JSON
// files, I need to be able to visualise it, understand it, go down the rabbit hole until I run out of data"; "every time you
// link to a markdown file, I need to visualise the markdown file in the page").
//
// One page for every file: view/?path=<the file's path>  (and &at=<a/b/0> to open a value inside a JSON file).
// It reads the file itself in the browser, computes its sha256 from the bytes it received, and takes "kept by", "made from" and
// "used by" from the catalogue (library/index.json). Nothing is built per file, so the viewer costs the build the same at 300
// files and at 3,000 (incident.conductor@'s ask, 02:22 UTC). No dependency; no data is sent anywhere; every value is written
// with textContent, never as HTML. A schema is inferred from the bytes; a unit is given only where a field's name states one.
(function () {
    'use strict'
    var mount = document.getElementById('viewer'); if (!mount) return
    var ROOT = mount.getAttribute('data-root') || '../'
    var q = new URLSearchParams(location.search), PATH = (q.get('path') || '').replace(/^\/+/, ''), AT = (q.get('at') || '').split('/').filter(Boolean)
    var SITE_REPO = 'https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/blob/dev/'
    var ROWS = 50, SCHEMA_ROWS = 200

    function el(tag, attrs, kids) {
        var e = document.createElement(tag), k
        for (k in (attrs || {})) { if (k === 'text') e.textContent = attrs[k]; else if (k === 'class') e.className = attrs[k]; else e.setAttribute(k, attrs[k]) }
        ;(kids || []).forEach(function (c) { if (c != null) e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c) })
        return e
    }
    function a(href, text, out) { var x = el('a', { href: href, text: text }); if (out) { x.setAttribute('rel', 'noopener'); x.title = 'Leaves this site' } return x }
    function viewHref(p, at) { return '?path=' + encodeURIComponent(p).replace(/%2F/g, '/') + (at && at.length ? '&at=' + at.map(encodeURIComponent).join('/') : '') }
    function short(s) { return String(s).replace(/@web-summit\.dinis\b/g, '@') }
    function cut(s, n) { s = String(s); return s.length <= n ? s : s.slice(0, n) + ' …' }
    function host(u) { return u.replace(/^https?:\/\/(www\.)?/, '').split(/[/?#]/)[0] }
    function safePath(p) { return /^[A-Za-z0-9][A-Za-z0-9._@\-\/ ]*$/.test(p) && p.indexOf('..') < 0 && p.indexOf('//') < 0 }
    function table(head, rows) {
        var t = el('table'), tr = el('tr')
        head.forEach(function (h) { tr.appendChild(el('th', {}, [h])) }); t.appendChild(el('thead', {}, [tr]))
        var b = el('tbody'); rows.forEach(function (r) { var x = el('tr'); r.forEach(function (c) { x.appendChild(el('td', {}, [c])) }); b.appendChild(x) }); t.appendChild(b)
        return el('div', { class: 'wx-table' }, [t])
    }
    function section(title, kids) { return el('section', {}, [el('h2', { text: title })].concat(kids)) }
    function note(t) { return el('p', { class: 'meta', text: t }) }

    var UNITS = [[/(_utc|_at)$|^(at|read|updated|read_utc|made_at|last_wake)$/, 'a time (UTC unless it says otherwise)'], [/_kmh$|kmh/, 'km/h'], [/(_kt|_kts|_knots)$/, 'knots'], [/_mm$/, 'mm'], [/_hpa$/, 'hPa'], [/(_c|_celsius)$/, '°C'], [/_m$|_metres$/, 'metres'], [/_s$|_seconds$/, 'seconds'], [/_ms$/, 'milliseconds'], [/_pct$|percent/, '%'], [/^bytes$|_bytes$/, 'bytes'], [/sha256/, 'a sha256 hash'], [/^url$|_url$|^source$|^link$/, 'a URL'], [/^lat(itude)?$|^lon(gitude)?$/, 'degrees']]
    function unitOf(k) { for (var i = 0; i < UNITS.length; i++) if (UNITS[i][0].test(k)) return UNITS[i][1]; return '' }
    function typeOf(v) { return v === null ? 'null' : Array.isArray(v) ? 'list' : typeof v === 'object' ? 'record' : typeof v === 'number' ? (Number.isInteger(v) ? 'integer' : 'number') : typeof v === 'string' ? (/^\d{4}-\d\d-\d\dT\d\d:\d\d/.test(v) ? 'time' : /^https?:\/\//.test(v) ? 'url' : 'text') : typeof v }
    function isRecord(v) { return v && typeof v === 'object' && !Array.isArray(v) }

    // a value, drawn: a scalar as text (a URL as a marked outside link), a record or a list as a door further in
    function show(v, at) {
        if (v === null) return el('em', { text: 'null' })
        if (typeof v === 'string') return /^https?:\/\/\S+$/.test(v) ? a(v, cut(host(v), 40) + ' ↗', true) : cut(v, 160)
        if (typeof v !== 'object') return String(v)
        if (Array.isArray(v) && v.every(function (x) { return x === null || typeof x !== 'object' })) return cut(v.join(', '), 160)
        var label = Array.isArray(v) ? 'list of ' + v.length : 'record, ' + Object.keys(v).length + ' fields'
        return at ? a(viewHref(PATH, at), label + ' →') : el('em', { text: label })
    }

    function schemaOf(root) {
        var rows = new Map()
        function seen(p, v) { var r = rows.get(p); if (!r) rows.set(p, r = { path: p, types: {}, n: 0, example: undefined }); r.types[typeOf(v)] = 1; r.n++; if (r.example === undefined && v !== null && typeof v !== 'object') r.example = v }
        function isMap(o) { var k = Object.keys(o); return k.length > 12 && k.every(function (x) { return o[x] && typeof o[x] === 'object' }) }
        function walk(v, p, d) {
            if (d > 8 || rows.size > 4000) return
            if (Array.isArray(v)) v.slice(0, 400).forEach(function (x) { seen(p + '[]', x); walk(x, p + '[]', d + 1) })
            else if (isRecord(v)) {
                if (isMap(v)) Object.keys(v).slice(0, 400).forEach(function (k) { seen(p + '{}', v[k]); walk(v[k], p + '{}', d + 1) })
                else Object.keys(v).forEach(function (k) { var c = p ? p + '.' + k : k; seen(c, v[k]); walk(v[k], c, d + 1) })
            }
        }
        walk(root, '', 0)
        var out = []; rows.forEach(function (r) { var parent = r.path.replace(/(\.[^.[\]{}]+|\[\]|\{\})$/, ''), of = /(\[\]|\{\})$/.test(r.path) ? r.n : parent && rows.has(parent) ? rows.get(parent).n : 1; out.push({ path: r.path, types: Object.keys(r.types).join(' or '), n: r.n, of: of, example: r.example }) })
        return out
    }

    function drawValue(v, at) {
        var out = []
        if (Array.isArray(v) && v.length && v.every(isRecord)) out.push(recordsTable(v, at, null))
        else if (Array.isArray(v)) out.push(table(['#', 'Value'], v.slice(0, 500).map(function (x, i) { return [String(i), show(x, at.concat(String(i)))] })))
        else if (isRecord(v)) {
            var keys = Object.keys(v), mapLike = keys.length > 12 && keys.every(function (k) { return isRecord(v[k]) })
            if (mapLike) out.push(recordsTable(keys.map(function (k) { return v[k] }), at, keys))
            else out.push(table(['Field', 'Value'], keys.map(function (k) { return [el('code', { text: k }), typeof v[k] === 'string' && !/^https?:\/\/\S+$/.test(v[k]) ? cut(v[k], 1200) : show(v[k], at.concat(k))] })))
        } else out.push(el('p', {}, [show(v)]))
        return out
    }
    function recordsTable(rows, at, keys) {
        var freq = {}, nested = {}
        rows.slice(0, 400).forEach(function (r) { Object.keys(r).forEach(function (k) { if (r[k] !== null && typeof r[k] === 'object' && !(Array.isArray(r[k]) && r[k].every(function (x) { return typeof x !== 'object' }))) nested[k] = 1; freq[k] = (freq[k] || 0) + 1 }) })
        var cols = Object.keys(freq).sort(function (x, y) { return (nested[x] || 0) - (nested[y] || 0) || freq[y] - freq[x] }).slice(0, 9)
        var shown = ROWS, wrap = el('div')
        function draw() {
            wrap.textContent = ''
            wrap.appendChild(note(rows.length + ' record' + (rows.length === 1 ? '' : 's') + (rows.length > shown ? '; the first ' + shown + ' shown' : '') + (Object.keys(freq).length > cols.length ? '; ' + (Object.keys(freq).length - cols.length) + ' more fields inside each (open a row)' : '') + '.'))
            wrap.appendChild(table([keys ? 'key' : '#'].concat(cols), rows.slice(0, shown).map(function (r, i) { var id = keys ? keys[i] : String(i); return [a(viewHref(PATH, at.concat(id)), keys ? cut(id, 40) : String(i))].concat(cols.map(function (c) { return r[c] === undefined ? '' : show(r[c], at.concat(id, c)) })) })))
            if (rows.length > shown) { var b = el('button', { type: 'button', text: 'Show ' + Math.min(200, rows.length - shown) + ' more' }); b.addEventListener('click', function () { shown += 200; draw() }); wrap.appendChild(b) }
        }
        draw(); return wrap
    }

    function hex(buf) { return Array.prototype.map.call(new Uint8Array(buf), function (b) { return ('0' + b.toString(16)).slice(-2) }).join('') }
    function getJSON(u) { return fetch(u, { cache: 'no-cache' }).then(function (r) { if (!r.ok) throw new Error(u + ': ' + r.status); return r.json() }) }

    // ---------------------------------------------------------------- no path: every file, to pick from
    function browse(cat) {
        var box = el('input', { type: 'search', placeholder: 'Filter ' + cat.entries.length + ' files by path, kind or keeper', 'aria-label': 'Filter the files', style: 'width:100%;max-width:560px;padding:8px' }), list = el('div')
        function draw() {
            var f = box.value.trim().toLowerCase(), groups = {}, n = 0
            cat.entries.forEach(function (e) {
                if (e.served === false) return
                if (f && (e.path + ' ' + e.kind + ' ' + (e.by || '')).toLowerCase().indexOf(f) < 0) return
                var d = e.path.indexOf('/') < 0 ? '(the root)' : e.path.split('/').slice(0, e.path.indexOf('incidents/') === 0 ? 4 : 2).join('/').replace(/\/[^/]*\.[^/]*$/, '')
                ;(groups[d] = groups[d] || []).push(e); n++
            })
            list.textContent = ''; list.appendChild(note(n + ' of ' + cat.entries.length + ' files.'))
            Object.keys(groups).sort().forEach(function (d) {
                var det = el('details', f || Object.keys(groups).length < 8 ? { open: '' } : {}, [el('summary', { text: d + ' (' + groups[d].length + ')' })]), ul = el('ul')
                groups[d].forEach(function (e) { ul.appendChild(el('li', {}, [a(viewHref(e.path), e.path), ' · ' + e.kind + (e.by ? ' · ' + short(e.by) : '')])) })
                det.appendChild(ul); list.appendChild(det)
            })
        }
        box.addEventListener('input', draw); draw()
        mount.appendChild(box); mount.appendChild(list)
    }

    // ---------------------------------------------------------------- one file
    function facts(e, bytes, sha, isGen) {
        var rows = [], api = PATH.match(/^incidents\/([^/]+)\/data\/(.+\.json)$/), role = e && e.by ? (e.by.match(/incident\.(\w+)@/) || [])[1] : ''
        function row(k, kids) { rows.push([el('strong', { text: k }), el('span', {}, kids)]) }
        if (e) row('What it is', [(e.title && e.title !== PATH.split('/').pop() ? e.title + '. ' : '') + (e.what || '') || el('em', { text: 'the file does not say' })])
        row('Kept by', e && e.by ? [role ? a(ROOT + 'agents/' + role + '/policy.html', short(e.by)) : short(e.by), e.by_from ? ' (from ' + e.by_from + ')' : ''] : [el('em', { text: e ? 'not said in the file' : 'not in the catalogue' })])
        if (e && e.dated) row('Its own date', [e.dated + (e.dated_from ? ' (from ' + e.dated_from + ')' : '')])
        if (e && e.commits) row('Last commit', [e.commits.last_at.replace('T', ' ').replace('Z', ' UTC') + ' by ' + short(e.commits.last_by || '?') + ', commit ', el('code', { text: e.commits.last_commit }), '; ' + e.commits.n + ' in all'])
        var same = e && e.sha256 ? (e.sha256 === sha ? ' The same as the catalogue recorded at the last build.' : ' The catalogue recorded a different hash at the last build: this file has changed since, or a cache is serving an older copy.') : ''
        row('sha256', [el('code', { text: sha || 'not computed (this browser gives no crypto here)' }), ' (' + bytes.toLocaleString('en-GB') + ' bytes, computed in your browser from the bytes it just received).' + same])
        row('The raw file', [a(ROOT + PATH, PATH.split('/').pop()), ' (the bytes, one click away)'].concat(api ? [' · also at ', a(ROOT + 'api/v1/' + api[1] + '/' + api[2], 'api/v1/' + api[1] + '/' + api[2])] : []))
        if (/\.md$/.test(PATH)) row('The page', [a(ROOT + PATH.replace(/(^|\/)README\.md$/, '$1index.html').replace(/\.md$/, '.html'), 'the rendered page')])
        if (e && e.kind) row('In the library', [a(ROOT + 'library/kinds/' + e.kind.replace(/\s+/g, '-') + '.html', e.kind), isGen ? ' (generated on every push)' : ''])
        function many(l) { var s = el('span'); l.slice(0, 30).forEach(function (x, i) { if (i) s.appendChild(document.createTextNode(', ')); s.appendChild(/^https?:\/\//.test(x) ? a(x, host(x) + ' ↗', true) : safePath(x) && /\.\w+$/.test(x) ? a(viewHref(x), x) : document.createTextNode(x)) }); if (l.length > 30) s.appendChild(document.createTextNode(', and ' + (l.length - 30) + ' more')); return s }
        if (e && e.made_from && e.made_from.length) row('Made from', [many(e.made_from)])
        if (e) row('Used or linked by', [e.linked_from && e.linked_from.length ? many(e.linked_from) : el('em', { text: 'nothing here links to it' })])
        return table(['', ''], rows)
    }

    function crumbs() {
        var p = el('p', { class: 'meta' }, [a('?', 'Every file'), ' / ', AT.length ? a(viewHref(PATH), PATH) : PATH])
        AT.forEach(function (k, i) { p.appendChild(document.createTextNode(' / ')); p.appendChild(i === AT.length - 1 ? document.createTextNode(k) : a(viewHref(PATH, AT.slice(0, i + 1)), k)) })
        return p
    }

    function openFile(cat) {
        var e = null; (cat ? cat.entries : []).some(function (x) { if (x.path === PATH) { e = x; return true } })
        if (!safePath(PATH) || (cat && !e)) { mount.appendChild(el('p', {}, ['No file at ', el('code', { text: PATH }), ' is in the catalogue. ', a('?', 'Every file')])); return }
        if (e && e.served === false) { mount.appendChild(el('p', {}, [el('code', { text: PATH }), ' is in the repository but not served on the site. ', a(SITE_REPO + PATH, 'Open it on GitHub ↗', true)])); return }
        mount.appendChild(crumbs())
        fetch(ROOT + PATH, { cache: 'no-cache' }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.arrayBuffer() }).then(function (buf) {
            var hash = window.crypto && crypto.subtle ? crypto.subtle.digest('SHA-256', buf).then(hex) : Promise.resolve('')
            return hash.then(function (sha) {
                var bytes = buf.byteLength, isBin = new Uint8Array(buf.slice(0, 8000)).indexOf(0) >= 0, text = isBin ? '' : new TextDecoder('utf-8').decode(buf)
                document.title = PATH.split('/').pop() + ' · the file, shown · Storm Charles'
                mount.appendChild(el('h2', {}, [el('code', { text: PATH })]))
                mount.appendChild(facts(e, bytes, sha, e && e.generated_by))
                if (isBin) { mount.appendChild(note('This file is not text; it is not shown here.')); return }
                if (/\.json$/.test(PATH)) {
                    var j; try { j = JSON.parse(text) } catch (err) { mount.appendChild(note('This file does not parse as JSON: ' + err.message)); j = undefined }
                    if (j !== undefined) {
                        var v = j, ok = true; AT.forEach(function (k) { if (ok && v !== null && typeof v === 'object' && k in v) v = v[k]; else ok = false })
                        if (!ok) mount.appendChild(note('Nothing at that place in this file; showing the whole file.')), v = j, AT = []
                        mount.appendChild(section(AT.length ? 'Inside: ' + AT.join(' / ') : 'The data', [note('Follow any "record" or "list" link to go further in; every scalar is shown as the file holds it. A link marked ↗ leaves this site.')].concat(drawValue(v, AT))))
                        if (!AT.length) {
                            var s = schemaOf(j)
                            mount.appendChild(section("Schema (inferred from this file's bytes)", [note('Every field found, the kinds of value it holds, in how many of its parent\'s items it is present, and one example. A unit is given only where the field\'s own name states one. This is what the file holds now, not a promise about tomorrow\'s.'),
                                table(['Field', 'Type', 'Present', 'Unit (from the name)', 'Example'], s.slice(0, SCHEMA_ROWS).map(function (r) { return [el('code', { text: r.path }), r.types, r.of > 1 ? r.n + ' of ' + r.of : 'yes', unitOf(r.path.split('.').pop().replace(/(\[\]|\{\})+$/, '')), r.example === undefined ? '' : show(r.example)] })),
                                s.length > SCHEMA_ROWS ? note((s.length - SCHEMA_ROWS) + ' more fields are in the raw file.') : null]))
                        }
                    }
                }
                var pre = el('pre', {}, [el('code', { text: text.length > 400000 ? text.slice(0, 400000) + '\n… (the rest is in the raw file)' : text })])
                mount.appendChild(el('details', /\.json$/.test(PATH) ? {} : { open: '' }, [el('summary', { text: /\.json$/.test(PATH) ? 'The raw JSON' : 'The source, as written' }), pre]))
            })
        }).catch(function (err) { mount.appendChild(el('p', {}, ['Could not read ', el('code', { text: PATH }), ' (' + String(err.message || err) + '). ', a(ROOT + PATH, 'Try the raw file')])) })
    }

    mount.textContent = ''
    getJSON(ROOT + 'library/index.json').then(function (cat) { PATH ? openFile(cat) : browse(cat) }, function () {
        if (PATH) openFile(null); else mount.appendChild(note('The catalogue (library/index.json) could not be read, so the list of files cannot be drawn. A file can still be opened with ?path=<its path>.'))
    })
})()
