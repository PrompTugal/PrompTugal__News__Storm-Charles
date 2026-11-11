// The query page (/data/query/): SQLite in the reader's browser over the tables of the storm's graph.
// incident.graph@web-summit.dinis. The engine is sql.js 1.14.2 (SQLite compiled to WebAssembly), the one
// newsroom.sgit.ai's SQL console uses, loaded from where the newsroom loads it and pinned by hash: the script by its
// integrity attribute (in the page), the WebAssembly file by the sha256 below, checked here before it runs.
// Nothing is uploaded and nothing is written: the tables are built in memory from this site's JSON and thrown away
// when the tab closes. window.__tools.sql.run(sql) -> { columns, rows, ms } after the 'tool:ready' event (the
// newsroom's convention), so a person, a test and an agent use the same console.
(function () {
    'use strict'
    const ENGINE = 'https://newsroom.sgit.ai/assets/vendor/'
    const WASM_SHA256 = '38c14f6e379210bc942bdc4ebca44e7bfdb4318ecc1c72ca666a28fdce96670a'
    const root = document.getElementById('query'), BASE = root.dataset.base || '../graph/'
    // the page inside the mount element: static markup, no data in it (data is always set as text, below)
    root.innerHTML = "<p class=\"kicker\">A database in your browser</p><h1>Query the storm: what was decided, by whom, when, and how long after the first warning</h1><p class=\"meta\">SQLite, running in this tab over <a href=\"../graph/index.html\">the graph's tables</a>. No server, nothing uploaded; every row carries its label, its source and the time it was read. <a href=\"#how-this-page-works\">How this page works</a> · <a href=\"../../app/graph/index.html\">The graph</a>.</p>" +
        "<div class=\"meter\" aria-label=\"How the database was built in this tab\">\n" +
        "<div><b id=\"m-engine\">–</b><span>engine started</span><em>SQLite as WebAssembly, hash checked</em></div>\n" +
        "<div><b id=\"m-data\">–</b><span>data fetched</span><em id=\"m-data-s\">this site's JSON</em></div>\n" +
        "<div><b id=\"m-tables\">–</b><span>built in memory</span><em id=\"m-tables-s\">rows inserted</em></div>\n" +
        "<div><b id=\"m-asof\">–</b><span>newest input</span><em id=\"m-asof-s\">data as of</em></div>\n" +
        "</div>\n" +
        "<p id=\"q-status\" class=\"meta\" role=\"status\">Starting the database: this needs JavaScript and WebAssembly. Without them, the same data is in the files listed at the foot of this page.</p>\n" +
        "<h2 class=\"sec\" id=\"answers\">The answers</h2>\n<p class=\"meta\">Every saved question, answered now from the tables in this tab: a small chart, the first rows, and a link to the answer. Open any in the console below to change it.</p>\n<nav class=\"q-toc\" id=\"q-toc\" aria-label=\"The questions\"></nav>\n<div id=\"q-answers\"></div>\n" +
        "<h2 class=\"sec\" id=\"console\">Ask your own: start from a question and change it</h2>\n" +
        "<div class=\"q-examples\" id=\"q-examples\"></div>\n" +
        "<p id=\"q-note\"></p>\n" +
        "<label for=\"q-sql\" class=\"meta\">SQL (SQLite). Tables: timeline, decisions, warnings, signals, sources, actors, first_on_fact, coverage, nodes, edges.</label>\n" +
        "<textarea id=\"q-sql\" spellcheck=\"false\" autocapitalize=\"off\" autocomplete=\"off\"></textarea>\n" +
        "<div class=\"q-bar\"><button type=\"button\" id=\"q-run\" disabled>Run</button><span id=\"q-info\" role=\"status\"></span></div>\n" +
        "<div class=\"q-out\" id=\"q-out\" tabindex=\"0\" aria-label=\"Result\"></div>\n" +
        "<h2 class=\"sec\">The tables</h2>\n" +
        "<div class=\"q-schema\" id=\"q-schema\"></div>\n" +
        "<p class=\"meta\">The same data as files: <a href=\"../graph/tables/timeline.json\">timeline</a>, <a href=\"../graph/tables/decisions.json\">decisions</a>, <a href=\"../graph/tables/warnings.json\">warnings</a>, <a href=\"../graph/tables/signals.json\">signals</a>, <a href=\"../graph/tables/sources.json\">sources</a>, <a href=\"../graph/tables/actors.json\">actors</a>, <a href=\"../graph/storm.json\">the graph (nodes and edges)</a> and <a href=\"../graph/storm-elsewhere.json\">its other districts</a>, <a href=\"../graph/queries.json\">the queries</a>. Built by <code>tools/graph-build.mjs</code> from the incident's JSON.</p>"

    const TABLES = ['timeline', 'decisions', 'warnings', 'signals', 'sources', 'actors', 'first_on_fact', 'coverage']
    const $ = id => document.getElementById(id)
    const el = (tag, props = {}, kids = []) => { const e = document.createElement(tag); for (const [k, v] of Object.entries(props)) k === 'class' ? e.className = v : k === 'text' ? e.textContent = v : e.setAttribute(k, v); for (const k of [].concat(kids)) e.append(k); return e }
    const ms = t => t < 10 ? t.toFixed(1) + ' ms' : Math.round(t) + ' ms'
    const kb = n => Math.round(n / 1024) + ' KB'
    const hex = buf => [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('')
    const conv = v => v === null || v === undefined ? null : typeof v === 'boolean' ? (v ? 1 : 0) : typeof v === 'object' ? JSON.stringify(v) : v
    let db = null, examples = [], schema = [], quietRun = false

    async function getJSON(u) { const r = await fetch(u, { cache: 'no-cache' }); if (!r.ok) throw new Error(u + ': HTTP ' + r.status); const t = await r.text(); return [JSON.parse(t), t.length] }

    function load(name, columns, rows) {
        const q = c => '"' + c.replace(/"/g, '""') + '"'
        db.run(`CREATE TABLE ${q(name)} (${columns.map(q).join(', ')})`)
        const st = db.prepare(`INSERT INTO ${q(name)} VALUES (${columns.map(() => '?').join(', ')})`)
        for (const r of rows) st.run(columns.map(c => conv(r[c])))
        st.free(); schema.push({ name, columns, rows: rows.length })
    }

    async function boot() {
        const status = $('q-status')
        try {
            const t0 = performance.now()
            const [[q], ...files] = await Promise.all([getJSON(BASE + 'queries.json'), getJSON(BASE + 'storm.json'), getJSON(BASE + 'storm-sources.json'), getJSON(BASE + 'storm-elsewhere.json'), ...TABLES.map(t => getJSON(BASE + 'tables/' + t + '.json'))])
            examples = q.queries; drawExamples()
            const bytes = files.reduce((n, f) => n + f[1], 0), tData = performance.now() - t0
            // the engine: fetch the WebAssembly file, check its sha256, only then hand it to sql.js
            const te = performance.now()
            if (typeof initSqlJs !== 'function') throw new Error('the engine script did not load (sql-wasm.js from newsroom.sgit.ai, or its pinned hash no longer matches)')
            const wr = await fetch(ENGINE + 'sql-wasm.wasm'); if (!wr.ok) throw new Error('sql-wasm.wasm: HTTP ' + wr.status)
            const wasm = await wr.arrayBuffer(), got = hex(await crypto.subtle.digest('SHA-256', wasm))
            if (got !== WASM_SHA256) throw new Error('the engine file is not the one pinned (sql-wasm.wasm sha256 ' + got.slice(0, 12) + '…): not run')
            const SQL = await initSqlJs({ wasmBinary: wasm })
            const tEngine = performance.now() - te
            db = new SQL.Database()
            const tt = performance.now(), storm = { ...files[0][0], nodes: files[0][0].nodes.concat(files[1][0].nodes, files[2][0].nodes), edges: files[0][0].edges.concat(files[1][0].edges, files[2][0].edges) }
            files.slice(3).forEach(([t]) => load(t.table, t.columns, t.rows))
            const cols = arr => [...arr.reduce((s, x) => { Object.keys(x).forEach(k => s.add(k)); return s }, new Set())]
            const edges = storm.edges.map(e => ({ id: `${e.rel}:${e.from}>${e.to}`, ...e }))
            load('nodes', cols(storm.nodes), storm.nodes); load('edges', cols(edges), edges)
            const rows = schema.reduce((n, t) => n + t.rows, 0), tTables = performance.now() - tt
            $('m-engine').textContent = ms(tEngine); $('m-data').textContent = kb(bytes); $('m-data-s').textContent = `${files.length} files, ${ms(tData)}`
            $('m-tables').textContent = schema.length + ' tables'; $('m-tables-s').textContent = `${rows} rows, ${ms(tTables)}`
            $('m-asof').textContent = (storm.as_of || '').slice(11, 16) + ' UTC'; $('m-asof-s').textContent = 'data as of ' + (storm.as_of || '').slice(0, 10)
            drawSchema(); $('q-run').disabled = false; answers(storm.as_of)
            status.textContent = `Ready: ${schema.length} tables, ${rows} rows. Pick a question or write SQL (Ctrl+Enter runs it).`
            window.__tools = Object.assign(window.__tools || {}, { sql: { run: exec, schema: () => schema.map(t => ({ ...t })), examples: () => examples.map(e => ({ ...e })) } })
            const h = location.hash.startsWith('#q=') ? decodeURIComponent(location.hash.slice(3)) : null
            const ex = new URLSearchParams(location.search).get('example')
            if (h) { $('q-sql').value = h; run() } else pick(ex || examples[0].id, true)
            if (h || ex) $('console').scrollIntoView(); else if (location.hash.startsWith('#a-')) { const t = document.getElementById(location.hash.slice(1)); if (t) t.scrollIntoView() }
            document.dispatchEvent(new CustomEvent('tool:ready', { detail: { tool: 'sql' } }))
        } catch (e) { status.textContent = 'The console could not start: ' + (e && e.message || e) + '. The same data, as files: the tables linked below.'; status.classList.add('bad') }
    }

    function exec(sql) {
        const t = performance.now(), res = db.exec(sql), last = res[res.length - 1]
        return { columns: last ? last.columns : [], rows: last ? last.values : [], ms: performance.now() - t }
    }
    function drawExamples() {
        const box = $('q-examples'); box.textContent = ''
        for (const e of examples) { const b = el('button', { type: 'button', 'data-id': e.id, text: e.question }); b.addEventListener('click', () => pick(e.id)); box.append(b) }
    }
    function pick(id, quiet) {
        const e = examples.find(x => x.id === id) || examples[0]
        $('q-sql').value = e.sql; $('q-note').textContent = e.note
        document.querySelectorAll('#q-examples button').forEach(b => b.setAttribute('aria-pressed', b.dataset.id === e.id ? 'true' : 'false'))
        quietRun = !!quiet; if (db) run()
    }
    function cell(v) {
        const td = el('td')
        if (v === null) { td.append(el('span', { class: 'null', text: '–' })); return td }
        if (typeof v === 'number') { td.className = 'num'; td.textContent = String(v); return td }
        const s = String(v)
        if (/^\d{4}-\d\d-\d\d(T[\d:]+Z)?$/.test(s)) { td.className = 'time'; td.textContent = s.replace('T', ' ').replace('Z', ''); td.title = s + ' (UTC)'; return td }
        if (/^https:\/\/[^\s"<>]+$/.test(s)) { let h = s; try { h = new URL(s).hostname.replace(/^www\./, '') } catch { } td.append(el('a', { href: s, rel: 'noopener', class: 'out', title: 'Leaves this site: ' + s, text: h })) }
        else if (/^(fact|evidence|hypothesis)$/.test(s)) td.append(el('span', { class: 'lab ' + s, text: s }))
        else td.textContent = s
        return td
    }
    function run() {
        const out = $('q-out'), info = $('q-info'), sql = $('q-sql').value.trim()
        if (!db || !sql) return
        out.textContent = ''; info.classList.remove('bad')
        try {
            const r = exec(sql)
            info.textContent = `${r.rows.length} row${r.rows.length === 1 ? '' : 's'} in ${ms(r.ms)}` + (r.rows.length > 500 ? ' (the first 500 shown)' : '')
            if (!r.columns.length) { out.append(el('p', { class: 'meta', text: 'The statement ran and returned no rows.' })); return }
            const table = el('table', {}, [el('thead', {}, el('tr', {}, r.columns.map(c => el('th', { scope: 'col', text: c })))), el('tbody', {}, r.rows.slice(0, 500).map(row => el('tr', {}, row.map(cell))))])
            out.append(table)
            if (!quietRun) try { history.replaceState(null, '', '#q=' + encodeURIComponent(sql)) } catch { }
            quietRun = false
        } catch (e) { info.textContent = 'SQLite says: ' + (e && e.message || e); info.classList.add('bad') }
    }
    // ---------------------------------------------------------------- the answers: every saved question, run and drawn
    // A chart here is plain HTML: one bar per row of one numeric column (zero marked, negative bars to the left), dots
    // along time, or a count by one column. Bars are the site's blue: never IPMA's colours. Each has its number beside it.
    const col = (r, name) => r.columns.indexOf(name)
    const num = v => v === null || v === '' || isNaN(+v) ? null : +v
    function bars(r, c) {
        const li = col(r, c.label), l2 = c.label2 ? col(r, c.label2) : -1, gi = c.group ? col(r, c.group) : -1, vi = col(r, c.value)
        const rows = r.rows.filter(x => num(x[vi]) !== null).slice(0, 14); if (li < 0 || vi < 0 || !rows.length) return null
        const lo = Math.min(0, ...rows.map(x => +x[vi])), hi = Math.max(0, ...rows.map(x => +x[vi])), span = hi - lo || 1, zero = (0 - lo) / span * 100
        const box = el('div', { class: 'q-bars', role: 'img', 'aria-label': c.say }); let last = null
        for (const x of rows) {
            if (gi >= 0 && x[gi] !== last) { last = x[gi]; box.append(el('div', { class: 'grp', text: String(x[gi]) })) }
            const v = +x[vi], w = Math.abs(v) / span * 100, left = v < 0 ? zero - w : zero
            const name = String(x[li] ?? '') + (l2 >= 0 && x[l2] ? ' · ' + x[l2] : '')
            box.append(el('div', { class: 'row' }, [el('span', { class: 'name', title: name, text: name.length > 44 ? name.slice(0, 43) + '…' : name }), el('span', { class: 'track' }, [el('i', { class: 'zero', style: `left:${zero}%` }), el('b', { style: `left:${left}%;width:${Math.max(w, 0.6)}%` })]), el('span', { class: 'val', text: `${v} ${c.unit || ''}` })]))
        }
        if (r.rows.length > rows.length) box.append(el('p', { class: 'meta', text: `The first ${rows.length} of ${r.rows.length} rows are drawn; the table has them all.` }))
        return box
    }
    function times(r, c) {
        const ti = col(r, c.time), li = col(r, c.label); if (ti < 0) return null
        const pts = r.rows.map(x => ({ t: Date.parse(x[ti]), at: x[ti], name: li >= 0 ? String(x[li] ?? '') : '' })).filter(p => p.t && /T/.test(String(p.at))); if (pts.length < 2) return null
        const lo = Math.min(...pts.map(p => p.t)), hi = Math.max(...pts.map(p => p.t)), span = hi - lo || 1
        const box = el('div', { class: 'q-times', role: 'img', 'aria-label': c.say }), track = el('div', { class: 'track' })
        for (const p of pts) track.append(el('i', { style: `left:${(p.t - lo) / span * 100}%`, title: `${p.at.slice(5, 16).replace('T', ' ')} ${p.name}` }))
        box.append(track, el('div', { class: 'ends' }, [el('span', { text: pts[0].at.slice(5, 16).replace('T', ' ') + ' UTC' }), el('span', { text: `${pts.length} with a time` }), el('span', { text: pts[pts.length - 1].at.slice(5, 16).replace('T', ' ') + ' UTC' })]))
        return box
    }
    function counts(r, c) {
        const bi = col(r, c.by); if (bi < 0) return null
        const m = new Map(); for (const x of r.rows) m.set(String(x[bi]), (m.get(String(x[bi])) || 0) + 1)
        return bars({ columns: ['k', 'n'], rows: [...m].map(([k, n]) => [k, n]) }, { label: 'k', value: 'n', unit: '', say: c.say })
    }
    function answers(asOf) {
        const box = $('q-answers'), toc = $('q-toc'); box.textContent = ''; toc.textContent = ''
        examples.forEach((e, i) => {
            const id = 'a-' + e.id; toc.append(el('a', { href: '#' + id, text: `${i + 1}. ${e.question}` }))
            const card = el('section', { class: 'q-card', id })
            card.append(el('h3', {}, [el('a', { href: '#' + id, text: `${i + 1}. ${e.question}` })]))
            try {
                const r = exec(e.sql), c = e.chart || {}
                const chart = c.type === 'bars' ? bars(r, c) : c.type === 'times' ? times(r, c) : c.type === 'count' ? counts(r, c) : null
                if (chart) card.append(el('p', { class: 'meta', text: c.say }), chart)
                const shown = r.rows.slice(0, 5), tbl = rows => el('table', {}, [el('thead', {}, el('tr', {}, r.columns.map(k => el('th', { scope: 'col', text: k })))), el('tbody', {}, rows.map(row => el('tr', {}, row.map(cell))))])
                card.append(el('div', { class: 'q-out', tabindex: '0' }, [tbl(shown)]))
                if (r.rows.length > shown.length) { const d = el('details', {}, [el('summary', { text: `All ${r.rows.length} rows` })]); d.addEventListener('toggle', () => { if (d.open && !d.querySelector('table')) d.append(el('div', { class: 'q-out', tabindex: '0' }, [tbl(r.rows)])) }, { once: false }); card.append(d) }
                const open = el('a', { href: '?example=' + encodeURIComponent(e.id) + '#console', text: 'Open in the console and change it' })
                card.append(el('p', { class: 'meta' }, [`${r.rows.length} row${r.rows.length === 1 ? '' : 's'}, from the tables as of ${(asOf || '').replace('T', ' ').replace('Z', ' UTC')}. ${e.note} `, open, ' · ', el('a', { href: '#' + id, text: 'link to this answer' })]))
                card.append(el('details', {}, [el('summary', { text: 'The SQL' }), el('pre', {}, [el('code', { text: e.sql })])]))
            } catch (x) { card.append(el('p', { class: 'meta bad', text: 'SQLite says: ' + (x && x.message || x) })) }
            box.append(card)
        })
    }
    function drawSchema() {
        const box = $('q-schema'); box.textContent = ''
        for (const t of schema) {
            const d = el('details', {}, [el('summary', {}, [el('code', { text: t.name }), ` ${t.rows} rows, ${t.columns.length} columns`])])
            const p = el('p', { class: 'cols' }); t.columns.forEach((c, i) => { if (i) p.append(', '); p.append(el('code', { text: c })) }); d.append(p)
            const b = el('button', { type: 'button', class: 'small', text: `SELECT * FROM ${t.name} LIMIT 20` }); b.addEventListener('click', () => { $('q-sql').value = `SELECT * FROM ${t.name} LIMIT 20;`; $('q-note').textContent = ''; run(); $('q-sql').scrollIntoView({ block: 'center' }) }); d.append(b)
            box.append(d)
        }
    }
    $('q-run').addEventListener('click', run)
    $('q-sql').addEventListener('keydown', e => { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); run() } })
    boot()
})()
