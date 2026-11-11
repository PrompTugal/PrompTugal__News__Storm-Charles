// The team console (incident.observability@web-summit.dinis): every agent, what it is doing, what it asks, its last push.
// Mounts into <div id="agents-live" data-base="<path to the site root>">. Reads JSON only:
//   1. data/agents/index.json  the roster, jobs, statuses and key fingerprints (tools/agents-index.mjs, from the repository);
//   2. agents/<role>/status.json  each agent's own file, live (so a status shows as soon as its agent pushes it);
//   3. GitHub's public API: this repository's last 100 commits on dev (who pushed what, when, and For: whom),
//      cached two minutes in this browser; the browser calls api.github.com directly, nothing else leaves the page.
// Refreshes every minute. Everything shown is escaped; session ids are stripped; only https links are made.
(() => {
    const el = document.getElementById('agents-live'); if (!el) return
    const ROLE = el.dataset.role || ''   // set on an agent's own page (/agents/<role>/): its card, strip, policy and commits only
    const HERE = document.currentScript.src
    // the live map (Angelo's engine, pinned; live-adapter.js feeds it): its own box after the cards, so a refresh never redraws it
    const liveBox = document.createElement('section'); liveBox.id = 'live'; liveBox.className = 'ag-live'
    liveBox.innerHTML = `<h2 class="ag-h">Who talks to whom, live</h2><p class="ag-note">Each dot is an agent, beside the person who operates it; each pulse is a commit travelling to the agents named in its <code>For:</code> trailer, at its real moment (four minutes behind, so it plays in order); the faint flow shows how busy each pair has been. Drag the dial to look back. The engine is <a href="https://web-summit.sgit.ai/people/angelo/app/">the live map by dev.map@PrompTugal.angelo, of Angelo's team</a>, an unchanged copy pinned at <a href="${new URL('vendor/live-map@57636ac/pin.json', HERE).href}">commit 57636ac</a>; 3D uses the three.js bundle from Silvio's Universe, loaded from web-summit.sgit.ai only when switched on.</p><p><button type="button" class="ag-btn" data-ag-live>Show the live map</button></p><div id="ag-live-map"></div><p class="ag-note" data-ag-live-note></p>`
    const startLive = () => { const b = liveBox.querySelector('[data-ag-live]'); if (b) b.parentNode.remove(); window.AgentsLive?.start() }
    liveBox.querySelector('[data-ag-live]').onclick = startLive
    document.addEventListener('lv-graph', () => { const b = liveBox.querySelector('[data-ag-live]'); if (b) b.parentNode.remove() }, true)
    if (!ROLE) el.insertAdjacentElement('afterend', liveBox)
    // the Universe (Silvio's engine, pinned; universe-adapter.js feeds it): opened on request, because it needs 1.6 MB of 3D libraries
    const uniBox = document.createElement('section'); uniBox.id = 'universe'; uniBox.className = 'ag-uni'
    uniBox.innerHTML = `<h2 class="ag-h">The team as a Universe: map, circuit and Talk</h2><p class="ag-note">The same team in <a href="https://web-summit.sgit.ai/">the Universe by dashboard@web-summit.silvio, of Silvio's team</a>: a 3D <b>Map</b> (people, agents, the folders each may write), the <b>Circuit</b> (each agent through its behaviour policy to what it reaches) and <b>Talk</b> (who talks to whom, from the commits' <code>For:</code> trailers). The engine is an unchanged copy pinned at <a href="${new URL('vendor/universe@57636ac/pin.json', HERE).href}">commit 57636ac</a>, reading this site's data through one adapter. The policies it shows are the librarian's drafts (<a href="${el.dataset.base || "../../"}library/abp.html">all of them</a>).</p><p class="ag-draft" data-ag-draft><b>Draft policies, not agreed by Dinis.</b> A draft is not a licence to operate: where the Circuit says "a written policy", read "a written draft".</p><p class="ag-note">Opening it loads 1.6 MB of 3D libraries from web-summit.sgit.ai (checked against a pinned hash).</p><p><button type="button" class="ag-btn" data-ag-uni>Open the Universe</button> <span class="ag-note" data-ag-uni-note></span></p><div id="ag-universe"></div><p class="ag-note">The dark stage and its colours are the Universe's own theme, as its authors made it: it does not follow this site's light and dark.</p>`
    if (!ROLE) liveBox.insertAdjacentElement('afterend', uniBox)
    if (!ROLE) for (const f of ['live-adapter.js', 'universe-adapter.js']) { const s = document.createElement('script'); s.src = new URL(f, HERE).href; s.async = false; document.head.appendChild(s) }
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
            R.total = R.push.reduce((x, y) => x + y, 0); R.wDinis = R.dinis.filter(Boolean).length * 10; R.wAgent = R.on.filter(x => x.size).length * 10
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
        return `<svg class="ag-strip" viewBox="0 0 ${R.n * W} ${H}" preserveAspectRatio="none" role="img" aria-label="${esc(`${short(R.a.name)}: ${R.total} pushes; waiting on Dinis about ${R.wDinis} minutes; on other agents about ${R.wAgent} minutes`)}">${cells.join('')}${hours.join('')}</svg>`
    }
    function axis(N) { const out = []; for (let t = Math.ceil(N.t0 / 36e5) * 36e5; t < N.t0 + N.n * CELL; t += 36e5) out.push(`<span style="left:${(100 * (t - N.t0) / (N.n * CELL)).toFixed(2)}%">${hm(t).slice(0, 2)}</span>`); return `<div class="ag-axis" aria-hidden="true">${out.join('')}</div>` }
    const dur = m => m < 60 ? `${m} min` : `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, '0')}`
    function night(N, only) {
        const rows = only ? N.rows.filter(R => R.a.role === only) : N.rows
        return `<div class="ag-night">${axis(N)}${rows.map(R => `<div class="row"><a class="nm" href="${only ? '#' : `${BASE}agents/${esc(R.a.role)}/index.html`}">${T(short(R.a.name).replace(/^incident\./, '').replace(/@$/, ''))}</a><span class="ag-note">${R.total} push${R.total === 1 ? '' : 'es'}${R.wDinis ? ` · on Dinis ${dur(R.wDinis)}` : ''}${R.wAgent ? ` · on agents ${dur(R.wAgent)}` : ''}</span>${strip(R)}</div>`).join('')}
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
<ul>${r.qs.map(q => `<li${q.old ? ' class="old"' : ''}><a class="who" href="${BASE}agents/${esc(q.role)}/index.html">${T(short(q.who))}${q.old ? ' · may be stale' : ''}</a>${T(q.x.replace(/^Dinis\s*:\s*/i, ''))}</li>`).join('')}</ul>
${r.who.filter(w => next.get(w)).length ? `<p class="lbl">What they would do next (their own words)</p><ul>${r.who.filter(w => next.get(w)).map(w => `<li><code>${T(short(w))}</code> ${T(next.get(w))}</li>`).join('')}</ul>` : ''}
</details>`).join('')
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
<summary><span class="nm">${T(short(a.name))}</span><span class="ag-pill ${cls}">${esc(word)}</span>${nAsk ? `<span class="n">${nAsk} ask${nAsk > 1 ? 's' : ''} for Dinis</span>` : ''}<span class="lp">${last ? `${esc(ago(last.at))}: ${T(last.what)}` : a.state ? T(a.state) : 'no push read'}</span></summary>
<div class="body">
${ROLE ? '' : `<p class="ag-note"><a href="${BASE}agents/${esc(a.role)}/index.html">Its own page</a>: its night, its policy, its last 20 commits.</p>`}
${a.state ? `<p><span class="lbl">Doing (its own words)</span>${T(a.state)}</p>` : `<p class="ag-note">${a.has_status ? 'No state written.' : `No status file yet (expected at <code>agents/${esc(a.role)}/status.json</code>).`}</p>`}
<p><span class="lbl">Last push</span>${last ? `<a href="${esc(/^https:/.test(last.url) ? last.url : '#')}">${T(last.what)}</a><br><span class="ag-note">${esc(ago(last.at))} · ${esc(utc(last.at))} · ${mine.length} commit${mine.length > 1 ? 's' : ''} read${last.to.length ? ` · for ${T(last.to.map(short).join(', '))}` : ''}</span>` : '<span class="ag-note">No commit read from it on dev.</span>'}</p>
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
        if (ROLE) return drawRole(idx, gh, by, N, keyOf, open, hadDrawn)
        // pipeline health: the last hour of the deploy workflow's runs (the same records as "Release speed" below)
        const hour = R.items.filter(r => Date.now() - Date.parse(r.pushed) < 36e5), okH = hour.filter(r => r.conclusion === 'success')
        const medOf = a => { a = a.filter(x => x != null && x > 0).sort((p, q) => p - q); return a.length ? a[Math.floor(a.length / 2)] : null }
        const servedH = okH.map(r => X[r.sha]).filter(x => x != null), mServed = servedH.length >= 3 ? medOf(servedH) : null, mRun = medOf(okH.map(r => secs(r.pushed, r.ended)))
        const failedH = hour.filter(r => r.conclusion === 'failure').length, supH = hour.filter(r => r.conclusion === 'cancelled').length
        const health = !R.items.length ? `<p class="ag-note" id="health">Pipeline health: ${R.error ? 'GitHub did not answer this browser, so the run records could not be read.' : 'no run records read.'}</p>`
            : `<div class="ag-health${failedH ? ' bad' : ''}" id="health"><b>Pipeline, last hour</b><span><b>${hour.length}${R.items.length >= 100 && hour.length === R.items.length ? '+' : ''}</b> pushes</span><span><b>${okH.length}</b> deployed</span><span><b>${mServed != null ? mServed + ' s' : mRun != null ? '≤ ' + mRun + ' s' : 'n/a'}</b> median push to served${mServed != null ? ` (CI's measure, ${servedH.length} of ${okH.length} read so far)` : mRun != null ? ' (upper bound: push to run finished)' : ''}</span><span><b>${supH}</b> superseded</span><span class="${failedH ? 'ag-err' : ''}"><b>${failedH}</b> failed</span><a href="#releases">push by push</a></div>`
        el.innerHTML = `
${health}
<p class="ag-line"><span><b>${idx.agents.length}</b> agents</span><span><b>${n('now')}</b> active in the last 30 min</span><span><b>${n('blocked')}</b> blocked</span><span><b>${n('none')}</b> not started</span><span>last push <b>${gh.items[0] ? esc(ago(gh.items[0].at)) : 'n/a'}</b></span><span>serving <b>${ver?.version ? esc(ver.version) : 'n/a'}</b></span></p>
<section class="ag-asks" id="asks"><h2>What Dinis can unblock: ${asks.length ? `${fresh} open ask${fresh === 1 ? '' : 's'}${asks.length > fresh ? `, and ${asks.length - fresh} that may be stale` : ''}, in ${new Set(asks.map(q => (THEMES.find(([, rx]) => rx.test(q.x)) || ['x'])[0])).size} groups` : 'nothing is waiting for you'}</h2>
${unblock(asks, idx)}
${asks.length ? `<p class="ag-note">Grouped by what is asked (by keyword, so read a row before acting on it); each row opens to the agents' own words and what each would do next. "May be stale": from a status file synced from the old repository, by an agent that has pushed nothing here.</p>` : ''}</section>
<h2 class="ag-h" id="night">The night as it happened</h2>
${night(N)}
<h2 class="ag-h">The agents <span class="ag-note">one line each; open one for its state, asks, next, done, job and key</span></h2>
<div class="ag-grid">${idx.agents.map(a => card(a, by)).join('')}</div>
${strangers.length ? `<p class="ag-note">Also pushing here, not in agents/JOBS.md: ${strangers.map(s => `<code>${T(s)}</code>`).join(', ')}.</p>` : ''}
${section('releases', 'Release speed, push by push', releases(R, by, series, X))}
${section('flow', 'Who writes for whom', flow(gh.items), "the commits' For: trailers, as a table")}
${section('ledger', 'Model calls (the ledger)', led)}
${section('pushes', 'The last pushes', `<ul class="ag-feed">${gh.items.slice(0, 25).map(c => `<li><time datetime="${esc(c.at)}">${esc(String(c.at).slice(11, 16))}</time><code>${T(short(c.agent) || '?')}</code> <a href="${esc(/^https:/.test(c.url) ? c.url : '#')}">${T(c.what)}</a>${c.to.length ? ` <span class="ag-note">for ${T(c.to.map(short).join(', '))}</span>` : ''}</li>`).join('') || '<li class="ag-note">No commits read.</li>'}</ul>`)}
<p class="ag-note">Read ${esc(new Date().toISOString().slice(11, 19))} UTC; refreshes every minute. Roster, jobs, statuses and keys: <a href="${BASE}data/agents/index.json">data/agents/index.json</a> (written ${T(idx.updated || idx.generated_at)} from agents/JOBS.md, agents/*/status.json and data/keys.json), then each agent's own status.json as served now. Commits: ${gh.source === 'snapshot' ? `<a href="${BASE}data/agents/commits.json">the snapshot in data/agents/commits.json</a>, taken ${T(gh.snapshot_at)} <span class="ag-err">(GitHub's public API did not answer this browser${gh.error ? ': ' + T(gh.error) : ''}; without a login it allows 60 calls an hour per address, so pushes after the snapshot are missing until it does)</span>` : `<a href="https://github.com/${REPO}/commits/${BRANCH}">GitHub's public API</a>${gh.read ? `, read ${esc(new Date(gh.read).toISOString().slice(11, 19))} UTC${gh.cached ? ' (cached up to two minutes in this browser)' : ''}` : ''}${gh.error ? ` <span class="ag-err">(GitHub did not answer: ${T(gh.error)})</span>` : ''}`}. "Active", "quiet" (30 min to 2 h) and "silent" are derived from the last push or wake; "blocked" is the agent's own word. Session ids are never shown.</p>`
        if (hadDrawn) for (const d of el.querySelectorAll('details')) d.open = open.has(keyOf(d))
        else openHash()
        el.dataset.drawn = '1'
        document.dispatchEvent(new CustomEvent('agents-data', { detail: { idx, commits: gh.items } }))
        if (!hadDrawn) setTimeout(() => window.AgentsUniverse?.counts().catch(() => { }), 1500)
    }
    // an agent's own page: its card (open), its strip, its policy (the built page's article, same site), its last 20 commits
    let policyHtml = null
    async function drawRole(idx, gh, by, N, keyOf, open, hadDrawn) {
        const a = idx.agents.find(x => x.role === ROLE)
        if (!a) { el.innerHTML = `<p class="ag-note">No agent with the role "${esc(ROLE)}" in <a href="${BASE}agents/JOBS.html">the jobs table</a>.</p>`; return }
        if (policyHtml === null) { policyHtml = ''; try { const r = await fetch(`${BASE}agents/${encodeURIComponent(ROLE)}/policy.html`, { cache: 'no-cache' }); if (r.ok) { const art = new DOMParser().parseFromString(await r.text(), 'text/html').querySelector('article'); if (art) { for (const x of art.querySelectorAll('script,style,link,iframe')) x.remove(); for (const l of art.querySelectorAll('a[href]')) { const h = l.getAttribute('href'); if (!/^(https:|#)/.test(h)) l.setAttribute('href', `${BASE}agents/${ROLE}/${h}`) } policyHtml = art.innerHTML } } } catch { } }
        const mine = by.get(a.name) || [], draft = /NOT AGREED/i.test(policyHtml)
        el.innerHTML = `<p class="ag-note"><a href="${BASE}agents/index.html">All the agents</a> · <a href="${BASE}agents/${esc(ROLE)}/status.json">its status file</a> · <a href="${BASE}agents/JOBS.html">the jobs</a></p>
<div class="ag-grid">${card(a, by).replace('<details class="ag-card"', '<details open class="ag-card"')}</div>
<h2 class="ag-h">Its night</h2>
${night(N, ROLE)}
<h2 class="ag-h">Its behaviour policy</h2>
${policyHtml ? `${draft ? '<p class="ag-draft"><b>A draft, not agreed by Dinis.</b> A draft is not a licence to operate.</p>' : ''}<details class="ag-fold" data-k="policy" id="policy"><summary>Read the policy${draft ? ' (draft)' : ''}</summary><div class="body ag-policy">${policyHtml}</div></details><p class="ag-note">As served at <a href="${BASE}agents/${esc(ROLE)}/policy.html">agents/${esc(ROLE)}/policy.html</a>; kept by the librarian's generator, not by this page.</p>` : `<p class="ag-note">No behaviour policy at agents/${esc(ROLE)}/policy.md.</p>`}
<h2 class="ag-h">Its last ${Math.min(20, mine.length)} commits</h2>
<ul class="ag-feed">${mine.slice(0, 20).map(c => `<li><time datetime="${esc(c.at)}">${esc(String(c.at).slice(5, 16).replace('T', ' '))}</time><a href="${esc(/^https:/.test(c.url) ? c.url : '#')}">${T(c.what)}</a>${c.to.length ? ` <span class="ag-note">for ${T(c.to.map(short).join(', '))}</span>` : ''}</li>`).join('') || '<li class="ag-note">No commit of its own read on dev.</li>'}</ul>
<p class="ag-note">Read ${esc(new Date().toISOString().slice(11, 19))} UTC; refreshes every minute. Its status file as served now; commits from ${gh.source === 'snapshot' ? `the snapshot of ${T(gh.snapshot_at)} (GitHub's API did not answer this browser)` : "GitHub's public API"}. Session ids are never shown.</p>`
        if (hadDrawn) for (const d of el.querySelectorAll('details')) d.open = open.has(keyOf(d))
        el.dataset.drawn = '1'
    }
    const openHash = () => { const t = location.hash && !/[?&=]/.test(location.hash) ? document.getElementById(location.hash.slice(1)) : null; if (!t) return; if (t.tagName === 'DETAILS') t.open = true; t.scrollIntoView() }
    window.addEventListener('hashchange', openHash)
    draw(); setInterval(() => { if (!document.hidden) draw() }, 60e3)
    document.addEventListener('visibilitychange', () => { if (!document.hidden) draw() })
})()
