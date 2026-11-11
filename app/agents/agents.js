// The team console (incident.observability@web-summit.dinis): every agent, what it is doing, what it asks, its last push.
// Mounts into <div id="agents-live" data-base="<path to the site root>">. Reads JSON only:
//   1. data/agents/index.json  the roster, jobs, statuses and key fingerprints (tools/agents-index.mjs, from the repository);
//   2. agents/<role>/status.json  each agent's own file, live (so a status shows as soon as its agent pushes it);
//   3. GitHub's public API: this repository's last 100 commits on dev (who pushed what, when, and For: whom),
//      cached two minutes in this browser; the browser calls api.github.com directly, nothing else leaves the page.
// Refreshes every minute. Everything shown is escaped; session ids are stripped; only https links are made.
(() => {
    const el = document.getElementById('agents-live'); if (!el) return
    // Stop means stop: one gate on the page's animation frames, put in place before any engine loads. While it is closed no
    // frame runs (the live map, its 3D view and the Universe all draw from requestAnimationFrame), so everything holds exactly
    // where it is; opening it lets the held frames run again. The engines are not touched: they simply are not called.
    if (!window.AgentsMotion) {
        const raf0 = window.requestAnimationFrame.bind(window), caf0 = window.cancelAnimationFrame.bind(window), held = new Map(); let frozen = false, n = 0
        window.requestAnimationFrame = cb => { if (!frozen) return raf0(cb); const id = -(++n); held.set(id, cb); return id }
        window.cancelAnimationFrame = id => { if (id < 0) held.delete(id); else caf0(id) }
        window.AgentsMotion = { get stopped() { return frozen }, stop() { frozen = true; document.documentElement.classList.add('ag-frozen'); document.dispatchEvent(new Event('agents-motion')) },
            start() { frozen = false; document.documentElement.classList.remove('ag-frozen'); for (const [id, cb] of [...held]) { held.delete(id); raf0(cb) } document.dispatchEvent(new Event('agents-motion')) } }
    }
    const ROLE = el.dataset.role || ''   // set on an agent's own page (/agents/<role>/): its card, strip, policy and commits only
    const VIEW = el.dataset.view || ''   // 'commit': one commit (?sha=) or one file's history (?path=); 'jobs': who owns what, doing what, blocked on whom
    const HERE = document.currentScript.src
    // the live map (Angelo's engine, pinned; live-adapter.js feeds it): its own box after the cards, so a refresh never redraws it
    const liveBox = document.createElement('section'); liveBox.id = 'live'; liveBox.className = 'ag-live'
    liveBox.innerHTML = `<h2 class="ag-h">Who talks to whom, live</h2><p class="ag-note">Each dot is an agent, beside the person who operates it; each pulse is a commit travelling to the agents named in its <code>For:</code> trailer, at its real moment (four minutes behind, so it plays in order); the faint flow shows how busy each pair has been. Drag the dial to look back. The engine is <a href="https://web-summit.sgit.ai/people/angelo/app/">the live map by dev.map@PrompTugal.angelo, of Angelo's team</a>, an unchanged copy pinned at <a href="${new URL('vendor/live-map@57636ac/pin.json', HERE).href}">commit 57636ac</a>; 3D uses the three.js bundle from Silvio's Universe, loaded from web-summit.sgit.ai only when switched on.</p><p><button type="button" class="ag-btn" data-ag-live>Show the live map</button></p><div class="ag-ctl" data-ag-ctl hidden></div><div id="ag-live-map"></div><p class="ag-note" data-ag-live-note></p>`
    const startLive = () => { const b = liveBox.querySelector('[data-ag-live]'); if (b) b.parentNode.remove(); window.AgentsLive?.start() }
    liveBox.querySelector('[data-ag-live]').onclick = startLive
    document.addEventListener('lv-graph', () => { const b = liveBox.querySelector('[data-ag-live]'); if (b) b.parentNode.remove() }, true)
    if (!ROLE && !VIEW) el.insertAdjacentElement('afterend', liveBox)
    // the Universe (Silvio's engine, pinned; universe-adapter.js feeds it): opened on request, because it needs 1.6 MB of 3D libraries
    const uniBox = document.createElement('section'); uniBox.id = 'universe'; uniBox.className = 'ag-uni'
    uniBox.innerHTML = `<h2 class="ag-h">The team as a Universe: map, circuit and Talk</h2><p class="ag-note">The same team in <a href="https://web-summit.sgit.ai/">the Universe by dashboard@web-summit.silvio, of Silvio's team</a>: a 3D <b>Map</b> (people, agents, the folders each may write), the <b>Circuit</b> (each agent through its behaviour policy to what it reaches) and <b>Talk</b> (who talks to whom, from the commits' <code>For:</code> trailers). The engine is an unchanged copy pinned at <a href="${new URL('vendor/universe@57636ac/pin.json', HERE).href}">commit 57636ac</a>, reading this site's data through one adapter. The policies it shows are the librarian's drafts (<a href="${el.dataset.base || "../../"}library/abp.html">all of them</a>).</p><p class="ag-draft" data-ag-draft><b>Draft policies, not agreed by Dinis.</b> A draft is not a licence to operate: where the Circuit says "a written policy", read "a written draft".</p><p class="ag-note">Opening it loads 1.6 MB of 3D libraries from web-summit.sgit.ai (checked against a pinned hash).</p><p><button type="button" class="ag-btn" data-ag-uni>Open the Universe</button> <span class="ag-note" data-ag-uni-note></span></p><div id="ag-universe"></div><p class="ag-note">The dark stage and its colours are the Universe's own theme, as its authors made it: it does not follow this site's light and dark.</p>`
    if (!ROLE && !VIEW) liveBox.insertAdjacentElement('afterend', uniBox)
    if (!ROLE && !VIEW) for (const f of ['live-adapter.js', 'universe-adapter.js']) { const s = document.createElement('script'); s.src = new URL(f, HERE).href; s.async = false; document.head.appendChild(s) }
    const openUni = () => { const b = uniBox.querySelector('[data-ag-uni]'); if (!window.AgentsUniverse || b.hidden) return; b.hidden = true; window.AgentsUniverse.open(uniBox.querySelector('#ag-universe'), uniBox.querySelector('[data-ag-uni-note]')).then(() => { if (!uniBox.querySelector('.bm')) b.hidden = false }) }
    uniBox.querySelector('[data-ag-uni]').onclick = openUni
    document.addEventListener('agents-universe', e => { const d = e.detail, n = uniBox.querySelector('[data-ag-draft]'); if (!n) return
        n.innerHTML = d.policies ? (d.drafts ? `<b>${d.drafts} of ${d.policies} behaviour policies are drafts, not agreed by Dinis</b> (${d.policies} of ${d.agents} agents have one). A draft is not a licence to operate: where the Circuit says "a written policy", read "a written draft".` : `${d.policies} of ${d.agents} agents have an agreed behaviour policy.`) : `<b>0 of ${d.agents} agents have a behaviour policy.</b>` })
    const BASE = el.dataset.base || '../../', REPO = 'PrompTugal/PrompTugal__News__Storm-Charles', BRANCH = 'dev'
    const GH = `https://api.github.com/repos/${REPO}/commits?sha=${BRANCH}&per_page=100`, CACHE = 'sc-agents-commits-v2', TTL = 120e3
    const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
    const clean = s => String(s ?? '').replace(/https?:\/\/claude\.ai\/code\/session_[A-Za-z0-9]+/g, '[session]').replace(/\bsession_[A-Za-z0-9]{8,}\b/g, '[session]')
    const T = s => esc(clean(s))
    const short = n => String(n || '').replace(/@web-summit\.dinis$/, '@')
    const ago = t => { const ms = Date.now() - Date.parse(t); if (!isFinite(ms)) return ''; const m = Math.round(ms / 60e3); return m < 1 ? 'just now' : m < 60 ? `${m} min ago` : m < 1440 ? `${Math.floor(m / 60)} h ${m % 60} min ago` : `${Math.floor(m / 1440)} d ago` }
    const utc = t => { const d = new Date(t); return isFinite(d) ? d.toISOString().slice(0, 16).replace('T', ' ') + ' UTC' : T(t) }
    const getJSON = async (u, opt) => { const r = await fetch(u, opt); if (!r.ok) throw new Error(`${r.status} ${u.split('?')[0]}`); return r.json() }

    // commits: the subject is "<agent>: <what>"; trailers Agent:, For:, Issue:
    const parse = c => {
        const msg = c.commit?.message || '', subject = msg.split('\n')[0]
        const tr = k => [...msg.matchAll(new RegExp(`^${k}:\\s*(.+)$`, 'gmi'))].flatMap(m => m[1].split(/[,;]\s*/)).map(s => s.trim()).filter(Boolean)
        const agent = tr('Agent')[0] || (subject.match(/^([a-z]+\.[a-z0-9-]+@[a-z0-9.-]+):/i) || [])[1] || ''
        return { sha: c.sha, at: c.commit?.committer?.date || c.commit?.author?.date, agent, to: tr('For'), issue: tr('Issue')[0] || '', what: subject.replace(/^[^:]+@[^:]+:\s*/, ''), url: c.html_url }
    }
    // GitHub first (two-minute cache); when it does not answer, the snapshot in data/agents/commits.json; whichever is newer wins,
    // and commits GitHub's list no longer holds are kept from the snapshot (the map's dial reaches back over them)
    async function commits() {
        let c = null; try { c = JSON.parse(localStorage.getItem(CACHE)) } catch { }
        if (c && Date.now() - c.read < TTL) return { ...c, cached: true }
        let error = '', api = null
        try { api = (await getJSON(GH, { headers: { Accept: 'application/vnd.github+json' } })).map(parse) } catch (e) { error = e.message }
        let snap = null; try { snap = await getJSON(`${BASE}data/agents/commits.json?t=${Math.floor(Date.now() / 6e4)}`) } catch { }
        if (!api && !snap) return c ? { ...c, cached: true, error } : { read: 0, items: [], error }
        const have = new Set((api || []).map(x => x.sha)), items = (api || []).concat((snap?.items || []).filter(x => !have.has(x.sha))).sort((a, b) => Date.parse(b.at) - Date.parse(a.at))
        for (const c of items) if (!c.url) c.url = `https://github.com/${REPO}/commit/${c.sha}`
        const out = { read: Date.now(), items, error, source: api ? 'github' : 'snapshot', snapshot_at: snap?.updated || snap?.read_at || '', hist: snap?.status_history || {} }
        if (api) try { localStorage.setItem(CACHE, JSON.stringify(out)) } catch { }
        return out
    }

    // releases: CI's public run records (one run per push; the newest push cancels an older run still going), cached five minutes
    const RUNS = `https://api.github.com/repos/${REPO}/actions/workflows/deploy.yml/runs?branch=${BRANCH}&per_page=100`, RCACHE = 'sc-agents-runs-v2'
    async function runs() {
        let c = null; try { c = JSON.parse(localStorage.getItem(RCACHE)) } catch { }
        if (c && Date.now() - c.read < 300e3) return c
        try {
            const j = await getJSON(RUNS, { headers: { Accept: 'application/vnd.github+json' } })
            c = { read: Date.now(), items: (j.workflow_runs || []).map(r => ({ n: r.run_number, sha: r.head_sha, status: r.status, conclusion: r.conclusion || '', pushed: r.head_commit?.timestamp || r.created_at, started: r.run_started_at || r.created_at, ended: r.updated_at, url: r.html_url })) }
            try { localStorage.setItem(RCACHE, JSON.stringify(c)) } catch { }
            return c
        } catch (e) { return c ? { ...c, error: e.message } : { read: 0, items: [], error: e.message } }
    }
    // CI's own measured push-to-served, from the notice the workflow's last step prints (title "push-to-served"): two public
    // API reads per release, kept for good in this browser once read (a finished run never changes); one new release per
    // refresh at most, and only while GitHub's hourly allowance for this address is not running low
    const EX = 'sc-agents-served-v1'
    const exactAll = () => { try { return JSON.parse(localStorage.getItem(EX)) || {} } catch { return {} } }
    async function exact(R) {
        const have = exactAll(), r = R.items.find(r => r.conclusion === 'success' && !(r.sha in have)); if (!r) return have
        try {
            const res = await fetch(`https://api.github.com/repos/${REPO}/commits/${r.sha}/check-runs?per_page=20`, { headers: { Accept: 'application/vnd.github+json' } })
            if (!res.ok || +(res.headers.get('x-ratelimit-remaining') || 0) < 20) return have
            const cr = ((await res.json()).check_runs || []).find(c => c.name === 'deploy' && c.conclusion === 'success'); if (!cr) return have
            const an = await getJSON(`https://api.github.com/repos/${REPO}/check-runs/${cr.id}/annotations`, { headers: { Accept: 'application/vnd.github+json' } })
            const m = (an.find(a => a.title === 'push-to-served') || {}).message, n = m && String(m).match(/^(\d{1,5}) s\b/)
            have[r.sha] = n ? +n[1] : null   // null: that run printed no figure (it ran before the notice existed)
            const keys = Object.keys(have); for (const k of keys.slice(0, Math.max(0, keys.length - 80))) delete have[k]
            try { localStorage.setItem(EX, JSON.stringify(have)) } catch { }
        } catch { }
        return have
    }
    const secs = (a, b) => Math.round((Date.parse(b) - Date.parse(a)) / 1000)
    function releases(R, by, series, X = {}) {
        if (!R.items.length) return `<p class="ag-note">${R.error ? `<span class="ag-err">GitHub did not answer (${T(R.error)}).</span> ` : ''}No run records read. Each run's own summary on GitHub carries CI's measured "push to served".</p>`
        const who = new Map(); for (const [name, cs] of by) for (const c of cs) who.set(c.sha, name)
        const done = R.items.filter(r => r.conclusion === 'success').map(r => secs(r.pushed, r.ended)).filter(x => x > 0 && x < 3600).sort((a, b) => a - b)
        const q = p => done.length ? done[Math.min(done.length - 1, Math.floor(p * done.length))] : null
        const n = k => R.items.filter(r => r.conclusion === k).length
        return `<div class="ag-sum"><div><b>${q(0.5) ?? 'n/a'} s</b><span>median, push to run finished</span></div><div><b>${q(0.9) ?? 'n/a'} s</b><span>slowest tenth, at least</span></div><div><b>${done[0] ?? 'n/a'} s</b><span>fastest</span></div><div><b>${n('success')}</b><span>deployed</span></div><div><b>${n('cancelled')}</b><span>superseded by a newer push</span></div><div><b>${n('failure')}</b><span>failed</span></div></div>
<table class="ag-flow"><thead><tr><th>Release</th><th>Pushed (UTC)</th><th>By</th><th>Result</th><th>Push to run finished</th><th>Push to served (CI's measure)</th></tr></thead><tbody>${R.items.slice(0, 20).map(r => { const s = secs(r.pushed, r.ended), ok = r.conclusion === 'success'
            return `<tr><td><a href="${esc(/^https:/.test(r.url) ? r.url : '#')}"><code>v${esc(series)}.${esc(r.n)}</code></a></td><td>${esc(String(r.pushed).slice(11, 19))}</td><td><code>${T(short(who.get(r.sha) || '') || '?')}</code></td><td>${ok ? 'deployed' : r.conclusion === 'cancelled' ? 'superseded' : r.conclusion === 'failure' ? '<span class="ag-err">failed</span>' : T(r.status)}</td><td class="n">${ok && s > 0 ? `<span class="bar" style="width:${Math.min(120, s)}px"></span>${s} s` : ''}</td><td class="n">${X[r.sha] != null ? `<b>${esc(X[r.sha])} s</b>` : ''}</td></tr>` }).join('')}</tbody></table>
<p class="ag-note">From the last ${R.items.length} runs of the deploy workflow on dev (GitHub's public API, read ${esc(new Date(R.read).toISOString().slice(11, 19))} UTC, cached five minutes). "Push to run finished" is the commit's time to the end of its CI run: it includes the build, the gate, the deploy and CI's own wait until the site serves the new version, so it is an upper bound on push-to-served, a few seconds above it. "Push to served" is CI's own measure, printed by the workflow's last step as a notice and read here from the public check-runs API: one release per refresh, kept in this browser, so the column fills in over a few minutes and is empty for runs older than the notice. A newer push waits for the run in progress, and only the newest waiting push is deployed ("superseded" marks the ones skipped).</p>`
    }
    async function ledger(idx) {
        const files = await Promise.all((idx.ledger || []).map(f => getJSON(`${BASE}${f}?t=${Math.floor(Date.now() / 6e4)}`).catch(() => null)))
        const rows = files.filter(Boolean).flatMap(f => (f.days || []).map(d => ({ agent: f.agent, written: f.updated, ...d }))).sort((a, b) => b.day.localeCompare(a.day) || a.agent.localeCompare(b.agent))
        const live = rows.filter(r => r.calls > r.mock)
        if (!rows.length) return `<p class="ag-note">No agent has published model calls yet. Every model call goes through <code>tools/llm.mjs</code>, which keeps a ledger on the machine that made it; an agent publishes its counts with <code>AGENT=&lt;name&gt; node tools/agents-ledger.mjs</code> (per day and task: calls, tokens, cost, latency; never model names, prompts or answers).</p>`
        const tot = k => rows.reduce((s, r) => s + (r[k] || 0), 0)
        return `<div class="ag-sum"><div><b>${tot('calls')}</b><span>model calls published</span></div><div><b>$${tot('cost_usd').toFixed(4)}</b><span>cost the providers reported</span></div><div><b>${tot('tokens_in') + tot('tokens_out')}</b><span>tokens in and out</span></div><div><b>${tot('failed')}</b><span>failed</span></div><div><b>${tot('refused_by_cap')}</b><span>refused by the daily cap</span></div></div>
<table class="ag-flow"><thead><tr><th>Day</th><th>Agent</th><th>Calls</th><th>Tokens in / out</th><th>Cost</th><th>Cap</th><th>Tasks</th></tr></thead><tbody>${rows.map(r => `<tr><td>${T(r.day)}</td><td><code>${T(short(r.agent))}</code></td><td class="n">${r.calls}${r.failed ? ` <span class="ag-err">(${r.failed} failed)</span>` : ''}${r.mock ? ` (${r.mock} mock)` : ''}</td><td class="n">${r.tokens_in} / ${r.tokens_out}</td><td class="n">$${(+r.cost_usd).toFixed(4)}</td><td class="n">${r.cap_usd != null ? '$' + T(r.cap_usd) : ''}</td><td>${(r.tasks || []).map(t => `${T(t.task)} (${t.calls})`).join(', ')}</td></tr>`).join('')}</tbody></table>
<p class="ag-note">Counts each agent published from its own ledger (<code>tools/agents-ledger.mjs</code>); an agent that made calls and has not run it is missing here. ${live.length ? '' : 'Only mock calls so far. '}No model names, prompts or answers are published.</p>`
    }

    // ---- "The night as it happened": one strip per agent on a shared axis, ten-minute cells ----
    // pushes: its commits in the cell. Waiting on Dinis: its status file held an ask for him (from the file's history in
    // data/agents/commits.json, then the file as served now). Waiting on an agent: it pushed work For: an agent that has not
    // pushed since. Wakes: the last_wake times its status file has given. All derived from commits and status files; nothing typed.
    const CELL = 6e5, NIGHT0 = Date.parse('2026-11-10T21:00:00Z')
    function nightData(idx, items, hist) {
        const now = Date.now(), t0 = now - NIGHT0 > 9 * 36e5 ? Math.floor((now - 8 * 36e5) / CELL) * CELL : NIGHT0, n = Math.max(1, Math.ceil((now - t0) / CELL))
        const cell = t => Math.floor((t - t0) / CELL), nextBy = new Map()
        const asc = items.slice().sort((a, b) => Date.parse(a.at) - Date.parse(b.at))
        for (const c of asc) { if (!nextBy.has(c.agent)) nextBy.set(c.agent, []); nextBy.get(c.agent).push(Date.parse(c.at)) }
        const rows = idx.agents.map(a => {
            const R = { a, n, t0, push: new Array(n).fill(0), dinis: new Array(n).fill(0), on: Array.from({ length: n }, () => new Set()), wake: new Array(n).fill(0), what: Array.from({ length: n }, () => []) }
            const mark = (arr, from, to, v) => { for (let i = Math.max(0, cell(from)); i <= Math.min(n - 1, cell(to)); i++) typeof v === 'function' ? v(i) : arr[i] = Math.max(arr[i], v) }
            for (const c of asc) if (c.agent === a.name) {
                const t = Date.parse(c.at), i = cell(t); if (i >= 0 && i < n) { R.push[i]++; R.what[i].push(c.what) }
                for (const to of c.to) { if (to === a.name) continue; const nx = (nextBy.get(to) || []).find(x => x > t); mark(null, t, nx ? nx - 1 : now, k => R.on[k].add(short(to))) }
            }
            const H = (hist[a.role] || []).slice()
            if (a.has_status) H.push({ at: new Date(now).toISOString(), asks_dinis: (a.asks_dinis || []).length, last_wake: a.last_wake || '' })
            H.forEach((h, k) => { const from = Date.parse(h.at), to = k + 1 < H.length ? Date.parse(H[k + 1].at) - 1 : now; if (h.asks_dinis > 0 && to >= from) mark(R.dinis, from, to, h.asks_dinis) })
            for (const w of new Set(H.map(h => h.last_wake).filter(Boolean))) { const t = Date.parse(w), i = cell(t); if (isFinite(t) && i >= 0 && i < n) R.wake[i] = 1 }
            R.total = R.push.reduce((x, y) => x + y, 0); R.synced = items.length > 0 && a.has_status && !items.some(c => c.agent === a.name)   // the same rule as the stale asks
            R.wDinis = R.dinis.filter(Boolean).length * 10; R.wAgent = R.on.filter(x => x.size).length * 10
            return R
        })
        return { rows, n, t0 }
    }
    const hm = t => new Date(t).toISOString().slice(11, 16)
    function strip(R) {
        const W = 6, H = 22, cells = []
        for (let i = 0; i < R.n; i++) {
            const x = i * W, tip = `${hm(R.t0 + i * CELL)} to ${hm(R.t0 + (i + 1) * CELL)} UTC: ${R.push[i]} push${R.push[i] === 1 ? '' : 'es'}${R.dinis[i] ? `; waiting on Dinis (${R.dinis[i]} ask${R.dinis[i] > 1 ? 's' : ''})` : ''}${R.on[i].size ? `; sent work for ${[...R.on[i]].join(', ')}, not yet picked up` : ''}${R.wake[i] ? '; a wake' : ''}${R.what[i].length ? ': ' + R.what[i].slice(0, 3).map(clean).join(' | ') : ''}`
            cells.push(`<g><title>${esc(tip)}</title><rect class="bg${R.dinis[i] ? ' dinis' : R.on[i].size ? ' agent' : ''}" x="${x}" y="0" width="${W}" height="${H}"/>${R.dinis[i] && R.on[i].size ? `<rect class="agent2" x="${x}" y="${H - 3}" width="${W}" height="3"/>` : ''}${R.push[i] ? `<rect class="p p${Math.min(3, R.push[i])}" x="${x + 0.6}" y="${H - 4 - Math.min(3, R.push[i]) * 4.5}" width="${W - 1.2}" height="${Math.min(3, R.push[i]) * 4.5}"/>` : ''}${R.wake[i] ? `<rect class="w" x="${x + 1.5}" y="0" width="${W - 3}" height="3"/>` : ''}</g>`)
        }
        const hours = []; for (let t = Math.ceil(R.t0 / 36e5) * 36e5; t < R.t0 + R.n * CELL; t += 36e5) hours.push(`<line class="h" x1="${(t - R.t0) / CELL * W}" x2="${(t - R.t0) / CELL * W}" y1="0" y2="${H}"/>`)
        return `<svg class="ag-strip" viewBox="0 0 ${R.n * W} ${H}" preserveAspectRatio="none" role="img" aria-label="${esc(`${short(R.a.name)}: ${R.synced ? 'its files arrive by sync from the old repository, pushes not counted here' : R.total + ' pushes'}; waiting on Dinis about ${R.wDinis} minutes; on other agents about ${R.wAgent} minutes`)}">${cells.join('')}${hours.join('')}</svg>`
    }
    function axis(N) { const out = []; for (let t = Math.ceil(N.t0 / 36e5) * 36e5; t < N.t0 + N.n * CELL; t += 36e5) out.push(`<span style="left:${(100 * (t - N.t0) / (N.n * CELL)).toFixed(2)}%">${hm(t).slice(0, 2)}</span>`); return `<div class="ag-axis" aria-hidden="true">${out.join('')}</div>` }
    const dur = m => m < 60 ? `${m} min` : `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, '0')}`
    function night(N, only) {
        const rows = only ? N.rows.filter(R => R.a.role === only) : N.rows
        return `<div class="ag-night">${axis(N)}${rows.map(R => `<div class="row"><a class="nm" href="${only || !R.a.has_page ? `#${esc(R.a.role)}` : `${BASE}agents/${esc(R.a.role)}/index.html`}">${T(short(R.a.name).replace(/^incident\./, '').replace(/@$/, ''))}</a><span class="ag-note">${R.synced ? 'files arrive by sync from the old repository; pushes not counted here' : `${R.total} push${R.total === 1 ? '' : 'es'}`}${R.wDinis ? ` · on Dinis ${dur(R.wDinis)}` : ''}${R.wAgent ? ` · on agents ${dur(R.wAgent)}` : ''}</span>${strip(R)}</div>`).join('')}
<p class="ag-note ag-key"><i class="k p"></i>pushes (taller: more) <i class="k dinis"></i>an ask for Dinis was open <i class="k agent"></i>sent work for an agent that had not pushed since <i class="k w"></i>a wake (from its status file). Ten-minute cells, ${N.t0 === NIGHT0 ? 'from 21:00 UTC on Tuesday 10 November' : 'the last eight hours'} to now; hours in UTC; hover or press a cell for what was pushed. Derived from the commits and each status file's history (<a href="${BASE}data/agents/commits.json">data/agents/commits.json</a>, then GitHub's API and the files as served); "waiting" is our reading of those, not the agent's word.</p></div>`
    }

    // ---- "What Dinis can unblock": the open asks, the same ask from several agents as one row ----
    const THEMES = [
        ['The SG/Send token and the vaults', /sg\/?send|vault|append lane|\blane\b/i],
        ['Attach a repository, or session access', /add_repo|attach|cannot reach|can't reach|read-only|permission check|credentials? for/i],
        ['Protect the branches', /branch protection|protect(ed)? (main|dev|branch)|protected: false/i],
        ['Agree the behaviour policies', /polic(y|ies)|ABP|licen[cs]e to operate/i],
        ['Models, the OpenRouter key and the spend cap', /openrouter|open_router|daily (spend )?cap|\bmodels?\b|ledger/i],
        ['Login, keys and identity', /passkey|login|sign(ed|ing)? |\bkey\b|identity|pki/i],
        ['Outreach: a person sends', /outreach|send(s)? (it|them|the)|contact|journalist|expert/i],
    ]
    function unblock(asks, idx) {
        const G = new Map()
        for (const q of asks) { const th = (THEMES.find(([, rx]) => rx.test(q.x)) || ['Decisions only Dinis can make'])[0]; if (!G.has(th)) G.set(th, []); G.get(th).push(q) }
        const next = new Map(idx.agents.map(a => [a.name, (a.next || [])[0] || '']))
        const rows = [...G].map(([th, qs]) => ({ th, qs, who: [...new Set(qs.map(q => q.who))], fresh: qs.filter(q => !q.old).length })).sort((a, b) => (b.fresh > 0) - (a.fresh > 0) || b.who.length - a.who.length || b.qs.length - a.qs.length)
        return rows.map(r => `<details class="ag-un${r.fresh ? '' : ' old'}" data-k="un-${esc(r.th)}" id="un-${esc(r.th.toLowerCase().replace(/[^a-z]+/g, '-'))}">
<summary><b>${esc(r.th)}</b><span class="ag-note">unblocks ${r.who.length} agent${r.who.length > 1 ? 's' : ''}: ${r.who.map(w => T(short(w).replace(/^incident\./, '').replace(/@$/, ''))).join(', ')}${r.fresh ? '' : ' · may be stale'}</span></summary>
<ul>${r.qs.map(q => `<li${q.old ? ' class="old"' : ''}><a class="who" href="#${esc(q.role)}">${T(short(q.who))}${q.old ? ' · may be stale' : ''}</a>${T(q.x.replace(/^Dinis\s*:\s*/i, ''))}</li>`).join('')}</ul>
${r.who.filter(w => next.get(w)).length ? `<p class="lbl">What they would do next (their own words)</p><ul>${r.who.filter(w => next.get(w)).map(w => `<li><code>${T(short(w))}</code> ${T(next.get(w))}</li>`).join('')}</ul>` : ''}
</details>`).join('')
    }

    const commitHref = c => `${BASE}app/agents/commit.html?sha=${encodeURIComponent(c.sha)}`
    const fileHref = p => `${BASE}app/agents/commit.html?path=${encodeURIComponent(p)}`
    const agentHref = (name, idx) => { const a = (idx.agents || []).find(x => x.name === name); return a && a.has_page ? `${BASE}agents/${a.role}/index.html` : '' }
    const who = (name, idx) => { const h = agentHref(name, idx); return h ? `<a href="${esc(h)}"><code>${T(short(name))}</code></a>` : `<code>${T(short(name) || '?')}</code>` }
    const mark = (a, px = 22) => a && a.mark ? `<img class="ag-mark" src="${BASE}${esc(a.mark)}" width="${px}" height="${px}" alt="" loading="lazy">` : ''
    const NR = '<span class="ag-nr">not recorded</span>'
    const nr = v => v == null || v === '' || v === 'not recorded' ? NR : T(v)

    // ---- one commit, or one file's history (app/agents/commit.html?sha=… | ?path=…) ----
    async function drawCommit(idx, gh) {
        const q = new URLSearchParams(location.search), sha = (q.get('sha') || '').replace(/[^0-9a-f]/gi, '').slice(0, 40), fpath = (q.get('path') || '').replace(/^\/+/, '').slice(0, 300)
        if (fpath && !/\.\.|[<>"'`\\]/.test(fpath)) return drawFile(idx, gh, fpath)
        const c = sha.length >= 7 ? gh.items.find(x => x.sha.startsWith(sha)) : null
        if (!sha) { el.innerHTML = `<p class="ag-note">Give a commit (<code>?sha=</code>) or a file (<code>?path=</code>). The last pushes:</p><ul class="ag-feed">${gh.items.slice(0, 40).map(c => `<li><time>${esc(String(c.at).slice(5, 16).replace('T', ' '))}</time>${who(c.agent, idx)} <a href="${commitHref(c)}">${T(c.what)}</a></li>`).join('')}</ul>`; return }
        let d = null, src = ''
        if (c) { try { const f = await getJSON(`${BASE}data/agents/detail-${c.at.slice(0, 13)}.json`); if (f.commits && f.commits[c.sha]) { d = f.commits[c.sha]; src = `data/agents/detail-${c.at.slice(0, 13)}.json` } } catch { } }
        let api = null
        if (!d) { try { api = await getJSON(`https://api.github.com/repos/${REPO}/commits/${sha}`, { headers: { Accept: 'application/vnd.github+json' } }); src = "GitHub's public API" } catch { } }
        const C = c || (api ? parse(api) : null)
        if (!C) { el.innerHTML = `<p class="ag-note ag-err">No commit ${esc(sha.slice(0, 12))} was found in the snapshot, and GitHub's API did not answer. <a href="https://github.com/${REPO}/commit/${esc(sha)}">Try it on GitHub</a>.</p>`; return }
        // served in: the snapshot's answer (CI's tags), or, for a push newer than the snapshot, CI's run records: its own run if
        // that deployed, otherwise the next run after it that did
        let served = C.served_in || '', servedFrom = served ? "CI's tag" : ''
        if (!served) { try { const R = await runs(), ver = await getJSON(`${BASE}version.json?t=${Date.now()}`).catch(() => null), series = String(ver?.version || 'v0.1.0').replace(/^v/, '').split('.').slice(0, 2).join('.')
            const asc = R.items.slice().sort((a, b) => a.n - b.n), i = asc.findIndex(r => r.sha === C.sha), hit = i >= 0 ? asc.slice(i).find(r => r.conclusion === 'success') : null
            if (hit) { served = `v${series}.${hit.n}`; servedFrom = hit.sha === C.sha ? "CI's run for this push" : "its own run was superseded; the next run that deployed" } } catch { } }
        const files = d ? d.files : api ? (api.files || []).map(f => ({ p: f.filename, a: f.additions, d: f.deletions })) : [], more = d ? d.more_files : 0
        const msg = api ? String(api.commit?.message || '') : ''
        const body = d ? d.body : msg.split('\n').slice(1).filter(l => !/^(Agent|Issue|For|Co-Authored-By|Claude-Session):/i.test(l)).join('\n').trim()
        const session = d ? d.session : (msg.match(/^Claude-Session:\s*\S*?(session_[A-Za-z0-9]+)/m) || [])[1] || ''
        const add = files.reduce((n, f) => n + (f.a || 0), 0), del = files.reduce((n, f) => n + (f.d || 0), 0), max = Math.max(1, ...files.map(f => (f.a || 0) + (f.d || 0)))
        const dirs = new Map(); for (const f of files) { const k = f.p.includes('/') ? f.p.split('/').slice(0, 2).join('/') : f.p; dirs.set(k, (dirs.get(k) || 0) + 1) }
        const iAll = gh.items.findIndex(x => x.sha === C.sha), newer = iAll > 0 ? gh.items[iAll - 1] : null, older = iAll >= 0 ? gh.items[iAll + 1] : null
        const mineAll = gh.items.filter(x => x.agent === C.agent), iMine = mineAll.findIndex(x => x.sha === C.sha)
        document.title = `${clean(C.what).slice(0, 60)} · a push · Storm Charles`
        el.innerHTML = `<p class="ag-note"><a href="${BASE}agents/index.html">All the agents</a> · ${older ? `<a href="${commitHref(older)}">‹ the push before</a>` : ''} ${newer ? `· <a href="${commitHref(newer)}">the push after ›</a>` : ''}</p>
<section class="ag-one"><p class="kicker">One push</p><h2>${T(C.what)}</h2>
<dl class="ag-dl">
<dt>Who</dt><dd>${who(C.agent, idx)}${iMine >= 0 ? ` <span class="ag-note">its push ${mineAll.length - iMine} of ${mineAll.length} read</span>` : ''}</dd>
<dt>For</dt><dd>${C.to.length ? C.to.map(t => who(t, idx)).join(', ') : '<span class="ag-note">nobody named</span>'}</dd>
<dt>When</dt><dd>${esc(utc(C.at))} <span class="ag-note">${esc(ago(C.at))}</span></dd>
<dt>Served in</dt><dd>${served ? `<a href="https://github.com/${REPO}/releases/tag/${esc(served)}"><code>${T(served)}</code></a> <span class="ag-note">the first release that contains it (${esc(servedFrom)})</span>` : `${NR} <span class="ag-note">no deployed run was found for it yet (still building, or GitHub did not answer)</span>`}</dd>
<dt>Session</dt><dd>${session ? `<code>${esc(session)}</code> <span class="ag-note">from the commit's Claude-Session trailer; <a href="${esc(agentHref(C.agent, idx) || '#')}#provenance">the agent's sessions</a></span>` : NR}</dd>
<dt>Issue</dt><dd>${nr(C.issue)}</dd>
<dt>Commit</dt><dd><a href="https://github.com/${REPO}/commit/${esc(C.sha)}"><code>${esc(C.sha.slice(0, 12))}</code> on GitHub (the full diff)</a> <span class="ag-note">not signed: the agent is named by its Agent: trailer</span></dd>
</dl>
${body ? `<h3>What it says it did</h3><p class="ag-body">${T(body).replace(/\n/g, '<br>')}</p>` : ''}
<h3>What changed: ${files.length + more} file${files.length + more === 1 ? '' : 's'}, +${add} −${del} lines</h3>
<p class="ag-note">${[...dirs].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([k, n]) => `${esc(k)}${n > 1 ? ` (${n})` : ''}`).join(' · ')}</p>
<ul class="ag-files">${files.map(f => `<li><a href="${fileHref(f.p)}"><code>${esc(f.p)}</code></a><span class="n">${f.a == null ? 'binary' : `<i class="a" style="width:${Math.round(60 * (f.a || 0) / max)}px"></i><i class="d" style="width:${Math.round(60 * (f.d || 0) / max)}px"></i> +${f.a} −${f.d}`}</span></li>`).join('')}${more ? `<li class="ag-note">and ${more} more (see the full diff on GitHub)</li>` : ''}</ul>
<p class="ag-note">From ${esc(src || 'the commits list')}; read ${esc(new Date().toISOString().slice(11, 19))} UTC. Lines added and removed are git's count; the diff itself is on GitHub.</p></section>`
    }
    async function drawFile(idx, gh, fpath) {
        let rows = [], src = ''
        try { const j = await getJSON(`https://api.github.com/repos/${REPO}/commits?sha=${BRANCH}&per_page=50&path=${encodeURIComponent(fpath)}`, { headers: { Accept: 'application/vnd.github+json' } }); rows = j.map(parse); src = "GitHub's public API (the last 50 commits that changed it)" } catch { }
        if (!rows.length) {   // the snapshot: every hour's detail file, newest first
            let files = []; try { files = (await getJSON(`${BASE}data/agents/commits.json`)).detail_files || [] } catch { }
            const D = await Promise.all(files.map(f => getJSON(`${BASE}data/agents/${f}`).catch(() => null)))
            const has = new Map(); for (const f of D) if (f) for (const [sha, c] of Object.entries(f.commits || {})) { const x = (c.files || []).find(x => x.p === fpath); if (x) has.set(sha, x) }
            rows = gh.items.filter(c => has.has(c.sha)).map(c => ({ ...c, a: has.get(c.sha).a, d: has.get(c.sha).d })); src = 'the snapshot (data/agents/detail-*.json)'
        }
        // who may change it (the path policy's globs), and what the file says of itself (by / updated, or its Kept-by line)
        const rx = g => new RegExp('^' + g.split(/(\*\*|\*)/).map(p => p === '**' ? '.*' : p === '*' ? '[^/]*' : p.replace(/[.+?^${}()|[\]\\]/g, '\\$&')).join('') + '$')
        const owners = idx.agents.filter(a => (a.policy_owns || []).some(g => g !== '**' && rx(g.replace(/<role>/g, a.role)).test(fpath)))
        let self = ''
        try { const r = await fetch(`${BASE}${fpath}`, { cache: 'no-cache' }); if (r.ok) { const t = await r.text()
            if (/\.json$/.test(fpath)) { const j = JSON.parse(t); if (j.by || j.updated) self = `It says of itself: by <b>${T(j.by || 'not recorded')}</b>, updated ${T(j.updated || 'not recorded')}.` }
            else if (/\.md$/.test(fpath)) { const m = t.match(/^>\s*Kept by ([^\n]{0,200})/m); if (m) self = `It says of itself: kept by ${T(m[1].replace(/\*\*/g, ''))}` } } } catch { }
        const shown = /\.md$/.test(fpath) ? fpath.replace(/(^|\/)README\.md$/, '$1index.html').replace(/\.md$/, '.html') : fpath
        const authors = new Map(); for (const c of rows) authors.set(c.agent, (authors.get(c.agent) || 0) + 1)
        document.title = `${fpath} · a file's history · Storm Charles`
        el.innerHTML = `<p class="ag-note"><a href="${BASE}agents/index.html">All the agents</a></p>
<section class="ag-one"><p class="kicker">One file</p><h2><code>${esc(fpath)}</code></h2>
<dl class="ag-dl">
<dt>See it</dt><dd><a href="${BASE}${esc(shown)}">as this site serves it</a> · <a href="https://github.com/${REPO}/blob/${BRANCH}/${esc(fpath)}">on GitHub</a> · <a href="https://github.com/${REPO}/commits/${BRANCH}/${esc(fpath)}">its whole history on GitHub</a></dd>
<dt>May change it</dt><dd>${owners.length ? owners.map(a => who(a.name, idx)).join(', ') + ' <span class="ag-note">by the path policy (agents/policy.json)</span>' : '<span class="ag-note">no agent\'s own paths cover it (shared, or the conductor\'s)</span>'}</dd>
<dt>Kept by</dt><dd>${self || NR}</dd>
<dt>Changed by</dt><dd>${[...authors].sort((a, b) => b[1] - a[1]).map(([n, k]) => `${who(n, idx)} ×${k}`).join(', ') || NR}</dd>
</dl>
<h3>${rows.length} push${rows.length === 1 ? '' : 'es'} that changed it</h3>
<ul class="ag-feed">${rows.map(c => `<li><time datetime="${esc(c.at)}">${esc(String(c.at).slice(5, 16).replace('T', ' '))}</time>${who(c.agent, idx)} <a href="${commitHref(c)}">${T(c.what)}</a>${c.a != null ? ` <span class="ag-note">+${c.a} −${c.d}</span>` : ''}</li>`).join('') || '<li class="ag-note">No push that changed it was found.</li>'}</ul>
<p class="ag-note">From ${esc(src)}; read ${esc(new Date().toISOString().slice(11, 19))} UTC.</p></section>`
    }

    // ---- Jobs, drawn: who owns what, doing what, blocked on whom (app/agents/jobs.html) ----
    // From data/agents/index.json (the jobs table, the path policy, each status file) and the commits; nothing typed here.
    function drawJobs(idx, gh, by, N) {
        const row = a => N.rows.find(r => r.a.name === a.name), lv = a => liveness(a, (by.get(a.name) || [])[0])
        const onNow = a => { const R = row(a); return R ? [...R.on[R.n - 1]] : [] }
        const state = a => { const [c, w] = lv(a), R = row(a); return R && R.synced ? ['silent', 'by sync'] : [c, w] }
        const nameOf = sh => idx.agents.find(x => short(x.name) === sh)
        const tag = a => `<a class="ag-tag" href="${esc(agentHref(a.name, idx) || '#' + a.role)}">${mark(a, 16)}${T(a.role)}</a>`
        const D = idx.agents.filter(a => (a.asks_dinis || []).length).sort((x, y) => y.asks_dinis.length - x.asks_dinis.length)
        const W = idx.agents.map(a => [a, onNow(a)]).filter(([, o]) => o.length)
        const waitedOn = new Map(); for (const [a, o] of W) for (const b of o) { if (!waitedOn.has(b)) waitedOn.set(b, []); waitedOn.get(b).push(a) }
        const idle = idx.agents.filter(a => lv(a)[0] === 'none')
        // who owns what: each top-level folder the path policy names, and the agents whose paths fall in it
        const F = new Map()
        for (const a of idx.agents) for (const g of a.policy_owns || []) { if (g === '**') continue; const top = g.replace(/<role>/g, a.role).split('/')[0].replace(/\*.*$/, '') || '(root files)'; const k = /\./.test(top) ? '(root files)' : top + '/'; if (!F.has(k)) F.set(k, new Map()); if (!F.get(k).has(a.name)) F.get(k).set(a.name, []); F.get(k).get(a.name).push(g) }
        const folders = [...F].sort((x, y) => y[1].size - x[1].size || x[0].localeCompare(y[0]))
        const counts = { now: 0, quiet: 0, silent: 0, blocked: 0, none: 0 }; for (const a of idx.agents) counts[lv(a)[0]]++
        el.innerHTML = `<p class="ag-line"><span><b>${idx.agents.length}</b> agents</span><span><b>${counts.now}</b> active</span><span><b>${counts.quiet + counts.silent}</b> quiet or silent</span><span><b>${counts.blocked}</b> say blocked</span><span><b>${counts.none}</b> not started</span><span><a href="${BASE}agents/index.html">the agents, live</a></span><span><a href="${BASE}agents/JOBS.html">the jobs table as written</a></span></p>
<h2 class="ag-h" id="blocked">Blocked on whom</h2>
<div class="ag-who">
<section class="dinis"><h3>On Dinis <span class="ag-note">${D.reduce((n, a) => n + a.asks_dinis.length, 0)} asks from ${D.length} agents</span></h3>${D.length ? `<ul>${D.map(a => `<li>${tag(a)} <b>${a.asks_dinis.length}</b> <span class="ag-note">${T(a.asks_dinis[0].replace(/^Dinis\s*:\s*/i, '')).slice(0, 110)}${a.asks_dinis[0].length > 116 ? '…' : ''}</span></li>`).join('')}</ul><p class="ag-note"><a href="${BASE}agents/index.html#asks">Grouped by what is asked</a></p>` : '<p class="ag-note">Nobody.</p>'}</section>
<section class="agent"><h3>On another agent <span class="ag-note">work sent For: it, and it has not pushed since</span></h3>${waitedOn.size ? `<ul>${[...waitedOn].sort((x, y) => y[1].length - x[1].length).map(([b, as]) => { const B = nameOf(b); return `<li>${B ? tag(B) : `<code>${T(b)}</code>`} <span class="ag-note">is awaited by</span> ${as.map(tag).join(' ')}${B && row(B) && row(B).synced ? ' <span class="ag-note">(its files arrive by sync: it cannot answer here)</span>' : ''}</li>` }).join('')}</ul>` : '<p class="ag-note">Nobody.</p>'}</section>
<section class="none"><h3>Not started <span class="ag-note">in the jobs table; no status file, no push</span></h3>${idle.length ? `<p>${idle.map(tag).join(' ')}</p>` : '<p class="ag-note">None.</p>'}</section>
</div>
<h2 class="ag-h" id="lanes">Each agent: its job, what it is doing, what it owns</h2>
<div class="ag-lanes">${idx.agents.map(a => { const [c, w] = state(a), o = onNow(a), last = (by.get(a.name) || [])[0], job = clean(a.job || '').replace(/`/g, ''), lead = (job.match(/\*\*([^*]+)\*\*/) || [, ''])[1]
            return `<details class="ag-lane ${c}" id="${esc(a.role)}" data-k="lane"><summary><h3>${tag(a)} <span class="ag-pill ${c}">${esc(w)}</span>${(a.asks_dinis || []).length ? ` <span class="ag-pill wd">waits on Dinis ×${a.asks_dinis.length}</span>` : ''}${o.length ? ` <span class="ag-pill wa">waits on ${T(o.slice(0, 3).map(x => x.replace(/^incident\./, '').replace(/@$/, '')).join(', '))}${o.length > 3 ? ` +${o.length - 3}` : ''}</span>` : ''}</h3>
${lead ? `<p class="job"><b>${T(lead.replace(/[.:]$/, ''))}</b></p>` : job ? `<p class="job">${T(job.replace(/\*\*/g, '')).slice(0, 160)}${job.length > 160 ? '…' : ''}</p>` : '<p class="ag-note">No row in the jobs table.</p>'}</summary>
${a.state ? `<p class="doing"><span class="lbl">Doing</span>${T(a.state).slice(0, 260)}${a.state.length > 260 ? '…' : ''}</p>` : ''}
${last ? `<p class="ag-note">last push ${esc(ago(last.at))}: <a href="${commitHref(last)}">${T(last.what).slice(0, 110)}</a></p>` : ''}
${(a.policy_owns || []).length ? `<p class="ag-chips">${a.policy_owns.map(g => `<a href="${fileHref(g.replace(/<role>/g, a.role).replace(/\/?\*.*$/, '') || g)}"><code>${esc(g)}</code></a>`).join(' ')}</p>` : ''}
${job && lead ? `<p class="ag-note">${T(job.replace(/\*\*/g, ''))}</p>` : ''}</details>` }).join('')}</div>
${section('owns', 'Who owns what', `<div class="ag-owns">${folders.map(([k, m]) => `<div class="tile${m.size > 1 ? ' many' : ''}"><b><a href="${fileHref(k.replace(/\/$/, ''))}">${esc(k)}</a></b>${[...m].map(([n, gs]) => { const a = idx.agents.find(x => x.name === n); return `<span title="${esc(gs.join(', '))}">${a ? tag(a) : T(short(n))}${gs.length > 1 || gs[0].replace(/\/?\*.*$/, '') + '/' !== k ? ` <span class="ag-note">${esc(gs.map(g => g.split('/').slice(1).join('/') || g).join(', ')).slice(0, 80)}</span>` : ''}</span>` }).join('')}</div>`).join('')}</div>`, `${folders.length} folders`)}
<p class="ag-note">A folder with more than one agent is marked: each owns the paths named beside it. The conductor may change any path (it integrates across folders) and is not listed on every tile. Read ${esc(new Date().toISOString().slice(11, 19))} UTC; refreshes every minute. From <a href="${fileHref('agents/JOBS.md')}">agents/JOBS.md</a> (each job), <a href="${fileHref('agents/policy.json')}">agents/policy.json</a> (who may change which paths), each agent's status file as served now, and the commits. "Waits on" is this page's reading of status files and commits, not the agent's word.</p>`
    }

    const liveness = (a, last) => {
        if (!a.has_status && !last) return ['none', 'not started']
        if (/^blocked/i.test(a.state || '')) return ['blocked', 'blocked']
        const t = Math.max(Date.parse(last?.at) || 0, Date.parse(a.last_wake) || 0); if (!t) return ['silent', 'no push yet']
        const m = (Date.now() - t) / 60e3
        return m < 30 ? ['now', 'active'] : m < 120 ? ['quiet', 'quiet'] : ['silent', 'silent']
    }
    const ul = (xs, cls = '') => xs?.length ? `<ul>${xs.map(x => `<li${cls ? ` class="${cls}"` : ''}>${T(x)}</li>`).join('')}</ul>` : ''
    const fold = (title, xs, open = false, newestLast = false) => xs?.length ? `<details data-k="${esc(title)}"${open ? ' open' : ''}><summary>${esc(title)} (${xs.length})</summary>${ul(newestLast ? xs.slice().reverse() : xs)}</details>` : ''
    const section = (id, title, body, extra = '') => `<details class="ag-fold" id="${id}" data-k="sec"><summary>${esc(title)}${extra ? ` <span class="ag-note">${extra}</span>` : ''}</summary><div class="body">${body}</div></details>`

    function card(a, by) {
        const mine = by.get(a.name) || [], last = mine[0], [cls, word] = liveness(a, last)
        const k = (a.keys || [])[0]
        const nAsk = (a.asks_dinis || []).length
        return `<details class="ag-card" id="${esc(a.role)}" data-k="card">
<summary>${mark(a)}<span class="nm">${T(short(a.name))}</span><span class="ag-pill ${cls}">${esc(word)}</span>${nAsk ? `<span class="n">${nAsk} ask${nAsk > 1 ? 's' : ''} for Dinis</span>` : ''}<span class="lp">${last ? `${esc(ago(last.at))}: ${T(last.what)}` : a.state ? T(a.state) : 'no push read'}</span></summary>
<div class="body">
${ROLE || !a.has_page ? '' : `<p class="ag-note"><a href="${BASE}agents/${esc(a.role)}/index.html">Its own page</a>: its night, its policy, its last 20 commits.</p>`}
${a.state ? `<p><span class="lbl">Doing (its own words)</span>${T(a.state)}</p>` : `<p class="ag-note">${a.has_status ? 'No state written.' : `No status file yet (expected at <code>agents/${esc(a.role)}/status.json</code>).`}</p>`}
<p><span class="lbl">Last push</span>${last ? `<a href="${commitHref(last)}">${T(last.what)}</a><br><span class="ag-note">${esc(ago(last.at))} · ${esc(utc(last.at))} · ${mine.length} commit${mine.length > 1 ? 's' : ''} read${last.to.length ? ` · for ${T(last.to.map(short).join(', '))}` : ''}</span>` : '<span class="ag-note">No commit read from it on dev.</span>'}</p>
${a.last_wake ? `<p><span class="lbl">Last wake (its own file)</span>${esc(utc(a.last_wake))} · ${esc(ago(a.last_wake))}</p>` : ''}
${a.asks_dinis?.length ? `<p><span class="lbl">Asks Dinis</span></p>${ul(a.asks_dinis, 'ask')}` : ''}
${a.asks?.length ? `<p><span class="lbl">Asks the team</span></p>${ul(a.asks)}` : ''}
${fold('Next', a.next)}${fold('Done', a.done, false, true)}${fold('Jobs routed to it', a.jobs)}
${a.job ? `<details data-k="job"><summary>Its job (agents/JOBS.md)</summary><p>${T(a.job).replace(/\*\*/g, '')}</p><p><span class="lbl">Owns</span>${T(a.owns).replace(/`/g, '')}</p></details>` : ''}
<details data-k="key"><summary>Key${k ? '' : ': none yet'}</summary>${k ? `<p>record <code>${T(k.record)}</code><br>encryption <code>${T(k.encryption)}</code><br><span class="ag-note">${T(k.status)}, added ${T(k.added)}; public half in <a href="${BASE}data/keys.json">data/keys.json</a></span></p>` : '<p class="ag-note">No public key in data/keys.json.</p>'}${a.status_file ? `<p class="ag-note"><a href="${BASE}${esc(a.status_file)}">${esc(a.status_file)}</a></p>` : ''}</details>
</div></details>`
    }

    function flow(items) {
        const pair = new Map()
        for (const c of items) for (const to of c.to) { const k = `${c.agent}\u0000${to}`; const p = pair.get(k) || { from: c.agent, to, n: 0, last: c.at, what: c.what }; p.n++; pair.set(k, p) }
        const rows = [...pair.values()].sort((a, b) => b.n - a.n || Date.parse(b.last) - Date.parse(a.last)), max = rows[0]?.n || 1
        return rows.length ? `<table class="ag-flow"><thead><tr><th>From</th><th>For</th><th>Commits</th><th>Latest</th></tr></thead><tbody>${rows.map(r => `<tr><td><code>${T(short(r.from) || '(no Agent: trailer)')}</code></td><td><code>${T(short(r.to))}</code></td><td class="n"><span class="bar" style="width:${Math.round(60 * r.n / max)}px"></span>${r.n}</td><td>${T(r.what)} <span class="ag-note">${esc(ago(r.last))}</span></td></tr>`).join('')}</tbody></table>` : '<p class="ag-note">No For: trailers read yet.</p>'
    }

    let whoMiss = ''
    async function draw() {
        let idx
        try { idx = await getJSON(`${BASE}data/agents/index.json?t=${Math.floor(Date.now() / 6e4)}`) }
        catch (e) { if (!el.dataset.drawn) el.innerHTML = `<p class="ag-err">Could not read data/agents/index.json (${esc(e.message)}).</p>`; return }
        // each agent's live status (the index is a snapshot; the agent's own file is the truth); a role with no file yet is tried too
        await Promise.all(idx.agents.map(async a => {
            try {
                const s = await getJSON(`${BASE}agents/${encodeURIComponent(a.role)}/status.json?t=${Math.floor(Date.now() / 6e4)}`)
                const arr = v => Array.isArray(v) ? v.map(x => typeof x === 'string' ? x : JSON.stringify(x)) : v ? [String(v)] : []
                const asks = arr(s.asks)
                Object.assign(a, { has_status: true, status_file: `agents/${a.role}/status.json`, state: s.state || '', last_wake: s.last_wake || '', jobs: arr(s.jobs), done: arr(s.done), next: arr(s.next), asks_dinis: asks.filter(x => /^Dinis\b/i.test(x)), asks: asks.filter(x => !/^Dinis\b/i.test(x)) })
            } catch { }
        }))
        if (!ROLE && !VIEW) { const w = new URLSearchParams(location.search).get('who'); if (w) { const a = idx.agents.find(x => x.name === w || x.name === w.replace(/@$/, '@web-summit.dinis') || x.role === w); if (a && a.has_page) { location.replace(`${BASE}agents/${a.role}/index.html`); return } whoMiss = w } }
        const [gh, ver, R, led] = await Promise.all([commits(), getJSON(`${BASE}version.json?t=${Date.now()}`).catch(() => null), runs(), ledger(idx).catch(() => '')])
        const X = R.items.length ? await exact(R) : {}
        const series = String(ver?.version || 'v0.1.0').replace(/^v/, '').split('.').slice(0, 2).join('.')
        const by = new Map(); for (const c of gh.items) { if (!by.has(c.agent)) by.set(c.agent, []); by.get(c.agent).push(c) }
        const known = new Set(idx.agents.map(a => a.name)), strangers = [...by.keys()].filter(n => n && !known.has(n))
        // an agent with a status file here and no commit of its own here: its file comes by sync from the old repository
        // (the conductor's note), so its asks may predate the move; they are listed last and say so. Only when commits were read.
        const synced = a => gh.items.length > 0 && a.has_status && !(by.get(a.name) || []).length
        const asks = idx.agents.flatMap(a => (a.asks_dinis || []).map(x => ({ who: a.name, role: a.role, x, old: synced(a) }))).sort((p, q) => p.old - q.old)
        const fresh = asks.filter(q => !q.old).length
        const live = idx.agents.map(a => liveness(a, (by.get(a.name) || [])[0])[0])
        const n = k => live.filter(x => x === k).length
        const keyOf = d => (d.id || d.closest('[id]')?.id || '') + '|' + (d.dataset.k || '')
        const all = [...el.querySelectorAll('details')], open = new Set(all.filter(d => d.open).map(keyOf))
        const hadDrawn = !!el.dataset.drawn
        const N = nightData(idx, gh.items, gh.hist || {})
        if (VIEW === 'jobs') { const o2 = new Set([...el.querySelectorAll('details[open]')].map(keyOf)); drawJobs(idx, gh, by, N); if (hadDrawn) for (const d of el.querySelectorAll('details')) d.open = o2.has(keyOf(d)); else openHash(); el.dataset.drawn = '1'; return }
        if (VIEW === 'commit') { if (!hadDrawn) { await drawCommit(idx, gh); el.dataset.drawn = '1' } return }
        if (ROLE) { if (hadDrawn && el.querySelector('[data-embed-box]:not([hidden])')) return; return drawRole(idx, gh, by, N, keyOf, open, hadDrawn) }
        // pipeline health: the last hour of the deploy workflow's runs (the same records as "Release speed" below)
        const hour = R.items.filter(r => Date.now() - Date.parse(r.pushed) < 36e5), okH = hour.filter(r => r.conclusion === 'success')
        const medOf = a => { a = a.filter(x => x != null && x > 0).sort((p, q) => p - q); return a.length ? a[Math.floor(a.length / 2)] : null }
        const servedH = okH.map(r => X[r.sha]).filter(x => x != null), mServed = servedH.length >= 3 ? medOf(servedH) : null, mRun = medOf(okH.map(r => secs(r.pushed, r.ended)))
        const failedH = hour.filter(r => r.conclusion === 'failure').length, supH = hour.filter(r => r.conclusion === 'cancelled').length
        const health = !R.items.length ? `<p class="ag-note" id="health">Pipeline health: ${R.error ? 'GitHub did not answer this browser, so the run records could not be read.' : 'no run records read.'}</p>`
            : `<div class="ag-health${failedH ? ' bad' : ''}" id="health"><b>Pipeline, last hour</b><span><b>${hour.length}${R.items.length >= 100 && hour.length === R.items.length ? '+' : ''}</b> pushes</span><span><b>${okH.length}</b> deployed</span><span><b>${mServed != null ? mServed + ' s' : mRun != null ? '≤ ' + mRun + ' s' : 'n/a'}</b> median push to served${mServed != null ? ` (CI's measure, ${servedH.length} of ${okH.length} read so far)` : mRun != null ? ' (upper bound: push to run finished)' : ''}</span><span><b>${supH}</b> superseded</span><span class="${failedH ? 'ag-err' : ''}"><b>${failedH}</b> failed</span><a href="#releases">push by push</a></div>`
        el.innerHTML = `
${whoMiss ? `<p class="ag-draft">No page for <code>${T(whoMiss)}</code>: it is not an agent of this team (or has no page yet). It may be another team's agent, named in a commit's For: line.</p>` : ''}${health}
<p class="ag-line"><span><b>${idx.agents.length}</b> agents</span><span><b>${n('now')}</b> active in the last 30 min</span><span><b>${n('blocked')}</b> blocked</span><span><b>${n('none')}</b> not started</span><span>last push <b>${gh.items[0] ? esc(ago(gh.items[0].at)) : 'n/a'}</b></span><span>serving <b>${ver?.version ? esc(ver.version) : 'n/a'}</b></span></p>
<section class="ag-asks" id="asks"><h2>What Dinis can unblock: ${asks.length ? `${fresh} open ask${fresh === 1 ? '' : 's'}${asks.length > fresh ? `, and ${asks.length - fresh} that may be stale` : ''}, in ${new Set(asks.map(q => (THEMES.find(([, rx]) => rx.test(q.x)) || ['x'])[0])).size} groups` : 'nothing is waiting for you'}</h2>
${unblock(asks, idx)}
${asks.length ? `<p class="ag-note">Grouped by what is asked (by keyword, so read a row before acting on it); each row opens to the agents' own words and what each would do next. "May be stale": from a status file synced from the old repository, by an agent that has pushed nothing here.</p>` : ''}</section>
<h2 class="ag-h" id="night">The night as it happened</h2>
${night(N)}
<h2 class="ag-h">The agents <span class="ag-note">one line each; open one for its state, asks, next, done, job and key</span></h2>
${(idx.groups && idx.groups.length ? idx.groups : ['']).map(g => { const as = idx.agents.filter(a => !g || (a.group || 'Other') === g); return as.length ? `${g ? `<h3 class="ag-group">${esc(g)} <span class="ag-note">${as.length}</span></h3>` : ''}<div class="ag-grid">${as.map(a => card(a, by)).join('')}</div>` : '' }).join('')}
${strangers.length ? `<p class="ag-note">Also pushing here, not in agents/JOBS.md: ${strangers.map(s => `<code>${T(s)}</code>`).join(', ')}.</p>` : ''}
${section('releases', 'Release speed, push by push', releases(R, by, series, X))}
${section('flow', 'Who writes for whom', flow(gh.items), "the commits' For: trailers, as a table")}
${section('ledger', 'Model calls (the ledger)', led)}
${section('pushes', 'The last pushes', `<ul class="ag-feed">${gh.items.slice(0, 25).map(c => `<li><time datetime="${esc(c.at)}">${esc(String(c.at).slice(11, 16))}</time>${who(c.agent, idx)} <a href="${commitHref(c)}">${T(c.what)}</a>${c.to.length ? ` <span class="ag-note">for ${c.to.map(t => who(t, idx)).join(', ')}</span>` : ''}</li>`).join('') || '<li class="ag-note">No commits read.</li>'}</ul>`)}
<p class="ag-note">Read ${esc(new Date().toISOString().slice(11, 19))} UTC; refreshes every minute. Roster, jobs, statuses and keys: <a href="${BASE}data/agents/index.json">data/agents/index.json</a> (written ${T(idx.updated || idx.generated_at)} from agents/JOBS.md, agents/*/status.json and data/keys.json), then each agent's own status.json as served now. Commits: ${gh.source === 'snapshot' ? `<a href="${BASE}data/agents/commits.json">the snapshot in data/agents/commits.json</a>, taken ${T(gh.snapshot_at)} <span class="ag-err">(GitHub's public API did not answer this browser${gh.error ? ': ' + T(gh.error) : ''}; without a login it allows 60 calls an hour per address, so pushes after the snapshot are missing until it does)</span>` : `<a href="https://github.com/${REPO}/commits/${BRANCH}">GitHub's public API</a>${gh.read ? `, read ${esc(new Date(gh.read).toISOString().slice(11, 19))} UTC${gh.cached ? ' (cached up to two minutes in this browser)' : ''}` : ''}${gh.error ? ` <span class="ag-err">(GitHub did not answer: ${T(gh.error)})</span>` : ''}`}. "Active", "quiet" (30 min to 2 h) and "silent" are derived from the last push or wake; "blocked" is the agent's own word. Session ids are never shown.</p>`
        if (hadDrawn) for (const d of el.querySelectorAll('details')) d.open = open.has(keyOf(d))
        else openHash()
        el.dataset.drawn = '1'
        document.dispatchEvent(new CustomEvent('agents-data', { detail: { idx, commits: gh.items } }))
        if (!hadDrawn) setTimeout(() => window.AgentsUniverse?.counts().catch(() => { }), 1500)
    }
    // an agent's own page: its card (open), its strip, its policy (the built page's article, same site), its last 20 commits
    // an agent's timeline report: its pushes (with what each changed and the release that served it), the changes in its
    // status file (asks for Dinis, blocked, wakes) and its sessions' starts, newest first, grouped by hour
    function timeline(a, mine, H, sess, idx) {
        const ev = []
        for (const c of mine) ev.push({ at: c.at, k: 'push', html: `<a href="${commitHref(c)}">${T(c.what)}</a>${c.files != null ? ` <span class="ag-note">${c.files} file${c.files === 1 ? '' : 's'}, +${c.added} −${c.removed}${c.served_in ? `, served in ${T(c.served_in)}` : ''}</span>` : ''}${c.to.length ? ` <span class="ag-note">for ${c.to.map(t => who(t, idx)).join(', ')}</span>` : ''}` })
        H.forEach((h, k) => { const p = H[k - 1]; if (!p) { if (h.asks_dinis) ev.push({ at: h.at, k: 'ask', html: `its status file first asked Dinis for ${h.asks_dinis} thing${h.asks_dinis > 1 ? 's' : ''}` }); return }
            if (h.asks_dinis !== p.asks_dinis) ev.push({ at: h.at, k: 'ask', html: `asks for Dinis: ${p.asks_dinis} → ${h.asks_dinis}` })
            if (h.blocked !== p.blocked) ev.push({ at: h.at, k: h.blocked ? 'blocked' : 'ok', html: h.blocked ? 'it began to call itself blocked' : 'it stopped calling itself blocked' }) })
        for (const w of new Set(H.map(h => h.last_wake).filter(Boolean))) if (isFinite(Date.parse(w))) ev.push({ at: new Date(Date.parse(w)).toISOString(), k: 'wake', html: 'a wake (from its status file)' })
        for (const x of sess) ev.push({ at: x.first_commit.at, k: 'session', html: `first push of session <code>${esc(x.id)}</code>${x.started_by && x.started_by !== 'not recorded' ? `, started by ${who(x.started_by, idx)}` : ''}` })
        ev.sort((x, y) => Date.parse(y.at) - Date.parse(x.at))
        if (!ev.length) return '<p class="ag-note">Nothing recorded yet: no push of its own, no status history.</p>'
        const hours = new Map(); for (const e of ev) { const h = String(e.at).slice(0, 13); if (!hours.has(h)) hours.set(h, []); hours.get(h).push(e) }
        const one = ([h, es], open) => { const n = es.filter(e => e.k === 'push').length; return `<details class="ag-hour" data-k="h-${esc(h)}"${open ? ' open' : ''}><summary><b>${esc(h.slice(5, 10))} ${esc(h.slice(11))}:00 UTC</b> <span class="ag-note">${n} push${n === 1 ? '' : 'es'}${es.length > n ? `, ${es.length - n} other event${es.length - n === 1 ? '' : 's'}` : ''}</span></summary><ul class="ag-tl">${es.map(e => `<li class="${e.k}"><time datetime="${esc(e.at)}">${esc(String(e.at).slice(11, 16))}</time><span class="k">${esc(e.k)}</span> ${e.html}</li>`).join('')}</ul></details>` }
        return [...hours].map((x, i) => one(x, i === 0)).join('') + `<p class="ag-note">Pushes from the commits; asks, blocked and wakes from the history of its status file; sessions from commit trailers. Releases are named on each push ("served in"). Messages between sessions are not in the repository unless an agent writes them into its status file, so they are not here.</p>`
    }
    document.addEventListener('click', e => { const b = e.target.closest && e.target.closest('[data-embed]'); if (!b) return; const box = el.querySelector('[data-embed-box]'); if (!box) return
        const src = BASE + b.dataset.embed; box.hidden = false; box.innerHTML = `<p class="ag-note">Showing <a href="${esc(src)}">${esc(b.dataset.embed)}</a> here, live. <button type="button" class="ag-mini" data-embed-close>Close</button></p><iframe src="${esc(src)}" title="This agent's work, live" loading="lazy"></iframe>`; box.scrollIntoView({ block: 'nearest' }) })
    document.addEventListener('click', e => { if (e.target.closest && e.target.closest('[data-embed-close]')) { const box = el.querySelector('[data-embed-box]'); if (box) { box.hidden = true; box.innerHTML = '' } } })
    let policyHtml = null, provenance = null
    async function drawRole(idx, gh, by, N, keyOf, open, hadDrawn) {
        const a = idx.agents.find(x => x.role === ROLE)
        if (!a) { el.innerHTML = `<p class="ag-note">No agent with the role "${esc(ROLE)}" in <a href="${BASE}agents/JOBS.html">the jobs table</a>.</p>`; return }
        if (policyHtml === null) { policyHtml = ''; try { const r = await fetch(`${BASE}agents/${encodeURIComponent(ROLE)}/policy.html`, { cache: 'no-cache' }); if (r.ok) { const art = new DOMParser().parseFromString(await r.text(), 'text/html').querySelector('article'); if (art) { for (const x of art.querySelectorAll('script,style,link,iframe')) x.remove(); for (const l of art.querySelectorAll('a[href]')) { const h = l.getAttribute('href'); if (!/^(https:|#)/.test(h)) l.setAttribute('href', `${BASE}agents/${ROLE}/${h}`) } policyHtml = art.innerHTML } } } catch { } }
        const mine = by.get(a.name) || [], draft = /NOT AGREED/i.test(policyHtml)
        if (provenance === null) { provenance = {}; try { provenance = await getJSON(`${BASE}data/agents/sessions.json?t=${Math.floor(Date.now() / 3e5)}`) } catch { } }
        const P = (provenance.agents || []).find(x => x.agent === a.name) || {}, sess = Array.isArray(P.sessions) ? P.sessions : [], keys = Array.isArray(P.keys) ? P.keys : []
        // state and blocker, in plain words, from its own status file and the commits (the same reading as the night strip)
        const R = N.rows.find(r => r.a.role === ROLE), last = mine[0], nowOn = R ? [...R.on[R.n - 1]] : [], H = (gh.hist || {})[ROLE] || []
        const askSince = (() => { let t = ''; for (let k = H.length - 1; k >= 0 && H[k].asks_dinis > 0; k--) t = H[k].at; return t })()
        const [cls, word] = liveness(a, last)
        const plain = [
            !a.has_status && !last ? 'It has not started: no status file, no push.' : R && R.synced ? 'Its files arrive here by sync from the old repository; it has pushed nothing here under its own name, so what it is doing now is not visible from this repository.' : last ? `It last pushed ${ago(last.at)} (${utc(last.at)}).` : 'It has a status file and has pushed nothing yet.',
            /^blocked/i.test(a.state || '') ? `It says it is blocked: "${clean(a.state).slice(0, 220)}"` : '',
            (a.asks_dinis || []).length ? `It is waiting on Dinis for ${a.asks_dinis.length} thing${a.asks_dinis.length > 1 ? 's' : ''}${askSince ? `, the oldest open since ${utc(askSince)}` : ''} (below).` : 'It asks nothing of Dinis.',
            nowOn.length ? `It has sent work for ${nowOn.join(', ')}, who ${nowOn.length > 1 ? 'have' : 'has'} not pushed since.` : '',
            (a.asks || []).length ? `It asks ${a.asks.length} thing${a.asks.length > 1 ? 's' : ''} of the team.` : ''
        ].filter(Boolean)
        const owns = a.policy_owns || []
        el.innerHTML = `<p class="ag-note"><a href="${BASE}agents/index.html">All the agents</a> · <a href="${BASE}agents/${esc(ROLE)}/status.json">its status file</a> · <a href="${BASE}agents/JOBS.html">the jobs</a></p>
<section class="ag-one ag-home">${a.figure ? `<a class="fig" href="${BASE}studio/cast/index.html" title="Its character, by incident.studio@${a.wears ? ': ' + esc(a.wears) : ''}"><img src="${BASE}${esc(a.figure)}" width="96" height="108" alt="${esc(a.wears ? `Its character: ${a.wears}` : 'Its character')}"></a>` : ''}<div><p class="kicker">${T(a.group || a.role)} <span class="ag-pill ${cls}">${esc(word)}</span></p><h2><code>${T(a.name)}</code></h2>
${a.tagline ? `<p class="for"><b>What it is for:</b> ${T(a.tagline)}.</p>` : ''}
<ul class="ag-plain">${plain.map(x => `<li>${T(x)}</li>`).join('')}</ul></div></section>
${(a.work || []).length ? `<h2 class="ag-h" id="work">Its work, to open</h2><div class="ag-work">${a.work.map((w, k) => `<div class="w"><a href="${BASE}${esc(w.href)}"><b>${T(w.title)}</b></a><span class="ag-note"><code>${esc(w.path)}</code></span><button type="button" class="ag-mini" data-embed="${esc(w.href)}">Open it here</button></div>`).join('')}</div><div class="ag-embed" data-embed-box hidden></div>` : ''}
${idx.board ? `<h2 class="ag-h" id="board">On the board</h2><div data-board-embed="agent" data-agent="${esc(a.name)}" data-base="${esc(BASE)}"></div><p class="ag-note">Its cards on <a href="${BASE}board/index.html">the board</a> (kept by incident.board@): what it owns, what it raised, what waits on it.</p>` : ''}
<div class="ag-grid">${card(a, by).replace('<details class="ag-card"', '<details open class="ag-card"')}</div>
<h2 class="ag-h" id="folders">Its folders</h2>
${owns.length ? `<p class="ag-chips">${owns.map(g => { const top = g.replace(/\*.*$/, '').replace(/\/$/, ''); return `<a href="${fileHref(top || g)}"><code>${esc(g)}</code></a>` }).join(' ')}</p><p class="ag-note">The paths it may change, by the path policy (<a href="${fileHref('agents/policy.json')}">agents/policy.json</a>): a check each agent runs on itself before pushing, not a lock.${mine.length ? ` Where its last ${Math.min(mine.length, 100)} pushes went is in each push below.` : ''}</p>` : `<p class="ag-note">No paths of its own in agents/policy.json.</p>`}
<h2 class="ag-h" id="provenance">Who it is: key and sessions</h2>
<dl class="ag-dl">
<dt>Operator</dt><dd>${nr(P.operator)}</dd>
${keys.length ? keys.map(k => `<dt>Key</dt><dd>record <code>${nr(k.record)}</code> · encryption <code>${nr(k.encryption)}</code><br><span class="ag-note">${nr(k.status)}, added ${nr(k.added)}. ${nr(k.how)}</span><br><span class="ag-note">operator's key it says it is linked to: ${nr(k.operator_key)} · <a href="${fileHref('data/keys.json')}">data/keys.json</a> (public halves only)</span></dd>`).join('') : `<dt>Key</dt><dd>${NR} <span class="ag-note">no public key for it in data/keys.json</span></dd>`}
${sess.length ? sess.map(x => `<dt>Session</dt><dd><code>${esc(x.id)}</code> <span class="ag-note">(the link opens only for the operator)</span><br>${x.commits} push${x.commits === 1 ? '' : 'es'}, first <a href="${commitHref(x.first_commit)}">${esc(utc(x.first_commit.at))}</a>, last <a href="${commitHref(x.last_commit)}">${esc(utc(x.last_commit.at))}</a><br>started ${nr(x.started_at)} · by ${x.started_by && x.started_by !== 'not recorded' ? who(x.started_by, idx) : NR} · from session ${x.started_by_session && x.started_by_session !== 'not recorded' ? `<code>${esc(x.started_by_session)}</code>` : NR}<br>on whose word: ${nr(x.on_whose_word)}<br><span class="ag-note">source: ${nr(x.source)}</span></dd>`).join('') : `<dt>Session</dt><dd>${NR} <span class="ag-note">no commit here carries its name with a Claude-Session trailer</span></dd>`}
<dt>Signed?</dt><dd><span class="ag-note">No commit is signed yet: the agent is named by the commit's Agent: trailer, written by whoever pushed it. Its key signs nothing so far.</span></dd>
</dl>
<p class="ag-note">From <a href="${fileHref('data/agents/sessions.json')}">data/agents/sessions.json</a> (written ${T(provenance.updated || '')} from the commits' trailers, the status files and data/keys.json). "Not recorded" means the fact is not written in the repository; nothing is guessed. An agent records its own start in its status file's "session" object.</p>
${section('history', 'Its status through the night', H.length ? `<ul class="ag-feed">${H.slice().reverse().slice(0, 30).map(h => `<li><time datetime="${esc(h.at)}">${esc(String(h.at).slice(5, 16).replace('T', ' '))}</time>${h.blocked ? '<b>blocked</b> · ' : ''}${h.asks_dinis} ask${h.asks_dinis === 1 ? '' : 's'} for Dinis${h.last_wake ? ` · said its last wake was ${T(h.last_wake)}` : ''}</li>`).join('')}</ul><p class="ag-note">Each time its status file changed in what it asks of Dinis, whether it calls itself blocked, or its last wake (as of the snapshot of ${T(gh.snapshot_at || '')}).</p>` : `<p class="ag-note">No history of its status file in the snapshot.</p>`)}
<h2 class="ag-h">Its night</h2>
${night(N, ROLE)}
<h2 class="ag-h">Its behaviour policy</h2>
${policyHtml ? `${draft ? '<p class="ag-draft"><b>A draft, not agreed by Dinis.</b> A draft is not a licence to operate.</p>' : ''}<details class="ag-fold" data-k="policy" id="policy"><summary>Read the policy${draft ? ' (draft)' : ''}</summary><div class="body ag-policy">${policyHtml}</div></details><p class="ag-note">As served at <a href="${BASE}agents/${esc(ROLE)}/policy.html">agents/${esc(ROLE)}/policy.html</a>; kept by the librarian's generator, not by this page.</p>` : `<p class="ag-note">No behaviour policy at agents/${esc(ROLE)}/policy.md.</p>`}
<h2 class="ag-h" id="timeline">Its timeline: what it did, hour by hour</h2>
${timeline(a, mine, H, sess, idx)}
<p class="ag-note">Read ${esc(new Date().toISOString().slice(11, 19))} UTC; refreshes every minute. Its status file as served now; commits from ${gh.source === 'snapshot' ? `the snapshot of ${T(gh.snapshot_at)} (GitHub's API did not answer this browser)` : "GitHub's public API"}. Session ids are never shown.</p>`
        if (hadDrawn) for (const d of el.querySelectorAll('details')) d.open = open.has(keyOf(d))
        el.dataset.drawn = '1'
        if (idx.board) { if (idx.board.style && !document.querySelector('link[data-board]')) { const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = BASE + idx.board.style; l.dataset.board = '1'; document.head.appendChild(l) }
            const old = document.querySelector('script[data-board]'); if (old) old.remove(); const sc = document.createElement('script'); sc.src = BASE + idx.board.script; sc.dataset.board = '1'; document.head.appendChild(sc) }
    }
    // the cast's characters, inline: as <img> they follow the system's light and dark, not this site's theme button; inline they
    // take the site's tokens. Each file is fetched once (same site, under 2 KB), cleaned of anything that is not drawing, and
    // put in place of its <img>, keeping the size and the alt text.
    const svgCache = new Map()
    function inlineCast() {
        for (const im of document.querySelectorAll('img.ag-mark, .ag-home .fig img')) {
            const src = im.getAttribute('src'); if (!/\.svg$/.test(src) || im.dataset.done) continue; im.dataset.done = '1'
            if (!svgCache.has(src)) svgCache.set(src, fetch(src).then(r => r.ok ? r.text() : '').catch(() => ''))
            svgCache.get(src).then(t => { if (!t || !im.isConnected) return
                const svg = new DOMParser().parseFromString(t, 'image/svg+xml').documentElement; if (!svg || svg.nodeName !== 'svg') return
                for (const x of svg.querySelectorAll('script,foreignObject,image,a')) x.remove()
                for (const x of svg.querySelectorAll('*')) for (const at of [...x.attributes]) if (/^on/i.test(at.name) || /^(href|xlink:href)$/i.test(at.name)) x.removeAttribute(at.name)
                svg.setAttribute('width', im.getAttribute('width')); svg.setAttribute('height', im.getAttribute('height')); svg.setAttribute('class', im.className)
                const alt = im.getAttribute('alt'); if (alt) svg.setAttribute('aria-label', alt); else { svg.setAttribute('aria-hidden', 'true'); svg.removeAttribute('aria-label'); svg.removeAttribute('role') }
                im.replaceWith(document.importNode(svg, true)) })
        }
    }
    new MutationObserver(inlineCast).observe(el, { childList: true, subtree: true })
    const openHash = () => { const t = location.hash && !/[?&=]/.test(location.hash) ? document.getElementById(location.hash.slice(1)) : null; if (!t) return; if (t.tagName === 'DETAILS') t.open = true; t.scrollIntoView() }
    window.addEventListener('hashchange', openHash)
    draw(); setInterval(() => { if (!document.hidden) draw() }, 60e3)
    document.addEventListener('visibilitychange', () => { if (!document.hidden) draw() })
})()
