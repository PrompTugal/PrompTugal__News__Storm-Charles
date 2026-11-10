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
    const TABLES = ['decisions', 'warnings', 'signals', 'sources', 'actors']
    const $ = id => document.getElementById(id)
    const el = (tag, props = {}, kids = []) => { const e = document.createElement(tag); for (const [k, v] of Object.entries(props)) k === 'class' ? e.className = v : k === 'text' ? e.textContent = v : e.setAttribute(k, v); for (const k of [].concat(kids)) e.append(k); return e }
    const ms = t => t < 10 ? t.toFixed(1) + ' ms' : Math.round(t) + ' ms'
    const kb = n => Math.round(n / 1024) + ' KB'
    const hex = buf => [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('')
    const conv = v => v === null || v === undefined ? null : typeof v === 'boolean' ? (v ? 1 : 0) : typeof v === 'object' ? JSON.stringify(v) : v
    let db = null, examples = [], schema = []

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
            const [[q], ...files] = await Promise.all([getJSON(BASE + 'queries.json'), getJSON(BASE + 'storm.json'), getJSON(BASE + 'storm-elsewhere.json'), ...TABLES.map(t => getJSON(BASE + 'tables/' + t + '.json'))])
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
            const tt = performance.now(), storm = { ...files[0][0], nodes: files[0][0].nodes.concat(files[1][0].nodes), edges: files[0][0].edges.concat(files[1][0].edges) }
            files.slice(2).forEach(([t]) => load(t.table, t.columns, t.rows))
            const cols = arr => [...arr.reduce((s, x) => { Object.keys(x).forEach(k => s.add(k)); return s }, new Set())]
            const edges = storm.edges.map(e => ({ id: `${e.rel}:${e.from}>${e.to}`, ...e }))
            load('nodes', cols(storm.nodes), storm.nodes); load('edges', cols(edges), edges)
            const rows = schema.reduce((n, t) => n + t.rows, 0), tTables = performance.now() - tt
            $('m-engine').textContent = ms(tEngine); $('m-data').textContent = kb(bytes); $('m-data-s').textContent = `${files.length} files, ${ms(tData)}`
            $('m-tables').textContent = schema.length + ' tables'; $('m-tables-s').textContent = `${rows} rows, ${ms(tTables)}`
            $('m-asof').textContent = (storm.as_of || '').slice(11, 16) + ' UTC'; $('m-asof-s').textContent = 'data as of ' + (storm.as_of || '').slice(0, 10)
            drawSchema(); $('q-run').disabled = false
            status.textContent = `Ready: ${schema.length} tables, ${rows} rows. Pick a question or write SQL (Ctrl+Enter runs it).`
            window.__tools = Object.assign(window.__tools || {}, { sql: { run: exec, schema: () => schema.map(t => ({ ...t })), examples: () => examples.map(e => ({ ...e })) } })
            const h = location.hash.startsWith('#q=') ? decodeURIComponent(location.hash.slice(3)) : null
            if (h) { $('q-sql').value = h; run() } else pick((new URLSearchParams(location.search).get('example')) || examples[0].id)
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
    function pick(id) {
        const e = examples.find(x => x.id === id) || examples[0]
        $('q-sql').value = e.sql; $('q-note').textContent = e.note
        document.querySelectorAll('#q-examples button').forEach(b => b.setAttribute('aria-pressed', b.dataset.id === e.id ? 'true' : 'false'))
        if (db) run()
    }
    function cell(v) {
        const td = el('td')
        if (v === null) { td.append(el('span', { class: 'null', text: '–' })); return td }
        if (typeof v === 'number') { td.className = 'num'; td.textContent = String(v); return td }
        const s = String(v)
        if (/^\d{4}-\d\d-\d\d(T[\d:]+Z)?$/.test(s)) { td.className = 'time'; td.textContent = s.replace('T', ' ').replace('Z', ''); td.title = s + ' (UTC)'; return td }
        if (/^https:\/\/[^\s"<>]+$/.test(s)) { let h = s; try { h = new URL(s).hostname.replace(/^www\./, '') } catch { } td.append(el('a', { href: s, rel: 'noopener', title: s, text: h + ' ↗' })) }
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
            try { history.replaceState(null, '', '#q=' + encodeURIComponent(sql)) } catch { }
        } catch (e) { info.textContent = 'SQLite says: ' + (e && e.message || e); info.classList.add('bad') }
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
