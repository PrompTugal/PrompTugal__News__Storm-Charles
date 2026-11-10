// The team console (incident.observability@web-summit.dinis): every agent, what it is doing, what it asks, its last push.
// Mounts into <div id="agents-live" data-base="<path to the site root>">. Reads JSON only:
//   1. data/agents/index.json  the roster, jobs, statuses and key fingerprints (tools/agents-index.mjs, from the repository);
//   2. agents/<role>/status.json  each agent's own file, live (so a status shows as soon as its agent pushes it);
//   3. GitHub's public API: this repository's last 100 commits on dev (who pushed what, when, and For: whom),
//      cached two minutes in this browser; the browser calls api.github.com directly, nothing else leaves the page.
// Refreshes every minute. Everything shown is escaped; session ids are stripped; only https links are made.
(() => {
    const el = document.getElementById('agents-live'); if (!el) return
    const HERE = document.currentScript.src
    // the live map (Angelo's engine, pinned; live-adapter.js feeds it): its own box after the cards, so a refresh never redraws it
    const liveBox = document.createElement('section'); liveBox.id = 'live'; liveBox.className = 'ag-live'
    liveBox.innerHTML = `<h2 class="ag-h">Who talks to whom, live</h2><p class="ag-note">Each dot is an agent, beside the person who operates it; each pulse is a commit travelling to the agents named in its <code>For:</code> trailer, at its real moment (four minutes behind, so it plays in order); the faint flow shows how busy each pair has been. Drag the dial to look back. The engine is <a href="https://web-summit.sgit.ai/people/angelo/app/">the live map by dev.map@PrompTugal.angelo, of Angelo's team</a>, an unchanged copy pinned at <a href="${new URL('vendor/live-map@57636ac/pin.json', HERE).href}">commit 57636ac</a>; 3D uses the three.js bundle from Silvio's Universe, loaded from web-summit.sgit.ai only when switched on.</p><div id="ag-live-map"></div><p class="ag-note" data-ag-live-note></p>`
    el.insertAdjacentElement('afterend', liveBox)
    { const s = document.createElement('script'); s.src = new URL('live-adapter.js', HERE).href; document.head.appendChild(s) }
    const BASE = el.dataset.base || '../../', REPO = 'PrompTugal/PrompTugal__News__Storm-Charles', BRANCH = 'dev'
    const GH = `https://api.github.com/repos/${REPO}/commits?sha=${BRANCH}&per_page=100`, CACHE = 'sc-agents-commits-v1', TTL = 120e3
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
        const out = { read: Date.now(), items, error, source: api ? 'github' : 'snapshot', snapshot_at: snap?.read_at || '' }
        if (api) try { localStorage.setItem(CACHE, JSON.stringify(out)) } catch { }
        return out
    }

    const liveness = (a, last) => {
        if (!a.has_status && !last) return ['none', 'not started']
        if (/^blocked/i.test(a.state || '')) return ['blocked', 'blocked']
        const t = Math.max(Date.parse(last?.at) || 0, Date.parse(a.last_wake) || 0); if (!t) return ['silent', 'no push yet']
        const m = (Date.now() - t) / 60e3
        return m < 30 ? ['now', 'active'] : m < 120 ? ['quiet', 'quiet'] : ['silent', 'silent']
    }
    const ul = (xs, cls = '') => xs?.length ? `<ul>${xs.map(x => `<li${cls ? ` class="${cls}"` : ''}>${T(x)}</li>`).join('')}</ul>` : ''
    const fold = (title, xs, open = false, newestLast = false) => xs?.length ? `<details${open ? ' open' : ''}><summary>${esc(title)} (${xs.length})</summary>${ul(newestLast ? xs.slice().reverse() : xs)}</details>` : ''

    function card(a, by) {
        const mine = by.get(a.name) || [], last = mine[0], [cls, word] = liveness(a, last)
        const k = (a.keys || [])[0]
        return `<article class="ag-card" id="${esc(a.role)}">
<h3>${T(short(a.name))}<span class="ag-pill ${cls}">${esc(word)}</span></h3>
<div class="role">${T(a.role)}${a.shared_row ? '' : ''}</div>
${a.state ? `<p><span class="lbl">Doing (its own words)</span>${T(a.state)}</p>` : `<p class="ag-note">${a.has_status ? 'No state written.' : `No status file yet (expected at <code>agents/${esc(a.role)}/status.json</code>).`}</p>`}
<p><span class="lbl">Last push</span>${last ? `<a href="${esc(/^https:/.test(last.url) ? last.url : '#')}">${T(last.what)}</a><br><span class="ag-note">${esc(ago(last.at))} · ${esc(utc(last.at))} · ${mine.length} commit${mine.length > 1 ? 's' : ''} read${last.to.length ? ` · for ${T(last.to.map(short).join(', '))}` : ''}</span>` : '<span class="ag-note">No commit read from it on dev.</span>'}</p>
${a.last_wake ? `<p><span class="lbl">Last wake (its own file)</span>${esc(utc(a.last_wake))} · ${esc(ago(a.last_wake))}</p>` : ''}
${a.asks_dinis?.length ? `<p><span class="lbl">Asks Dinis</span></p>${ul(a.asks_dinis, 'ask')}` : ''}
${a.asks?.length ? `<p><span class="lbl">Asks the team</span></p>${ul(a.asks)}` : ''}
${fold('Next', a.next, true)}${fold('Done', a.done, false, true)}${fold('Jobs routed to it', a.jobs)}
${a.job ? `<details><summary>Its job (agents/JOBS.md)</summary><p>${T(a.job).replace(/\*\*/g, '')}</p><p><span class="lbl">Owns</span>${T(a.owns).replace(/`/g, '')}</p></details>` : ''}
<details><summary>Key${k ? '' : ': none yet'}</summary>${k ? `<p>record <code>${T(k.record)}</code><br>encryption <code>${T(k.encryption)}</code><br><span class="ag-note">${T(k.status)}, added ${T(k.added)}; public half in <a href="${BASE}data/keys.json">data/keys.json</a></span></p>` : '<p class="ag-note">No public key in data/keys.json.</p>'}${a.status_file ? `<p class="ag-note"><a href="${BASE}${esc(a.status_file)}">${esc(a.status_file)}</a></p>` : ''}</details>
</article>`
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
        const [gh, ver] = await Promise.all([commits(), getJSON(`${BASE}version.json?t=${Date.now()}`).catch(() => null)])
        const by = new Map(); for (const c of gh.items) { if (!by.has(c.agent)) by.set(c.agent, []); by.get(c.agent).push(c) }
        const known = new Set(idx.agents.map(a => a.name)), strangers = [...by.keys()].filter(n => n && !known.has(n))
        const asks = idx.agents.flatMap(a => (a.asks_dinis || []).map(x => ({ who: a.name, role: a.role, x })))
        const live = idx.agents.map(a => liveness(a, (by.get(a.name) || [])[0])[0])
        const n = k => live.filter(x => x === k).length
        const open = new Set([...el.querySelectorAll('details[open]')].map(d => d.closest('article')?.id + '|' + d.querySelector('summary')?.textContent.replace(/ \(\d+\)$/, '')))
        const hadDrawn = !!el.dataset.drawn
        el.innerHTML = `
<div class="ag-sum">
<div><b>${idx.agents.length}</b><span>agents in the team</span></div>
<div><b>${n('now')}</b><span>active in the last 30 min</span></div>
<div><b>${n('blocked')}</b><span>say they are blocked</span></div>
<div><b>${n('none')}</b><span>not started yet</span></div>
<div><b>${asks.length}</b><span>asks for Dinis</span></div>
<div><b>${gh.items[0] ? esc(ago(gh.items[0].at)) : 'n/a'}</b><span>last push to dev</span></div>
<div><b>${ver?.version ? esc(ver.version) : 'n/a'}</b><span>version served</span></div>
</div>
<section class="ag-asks" id="asks"><h2>Dinis: ${asks.length ? `${asks.length} ask${asks.length > 1 ? 's' : ''} only you can answer` : 'nothing is waiting for you'}</h2>
${asks.length ? `<ol>${asks.map(q => `<li><a class="who" href="#${esc(q.role)}">${T(short(q.who))}</a>${T(q.x.replace(/^Dinis\s*:\s*/i, ''))}</li>`).join('')}</ol>` : ''}</section>
<h2 class="ag-h">The agents</h2>
<div class="ag-grid">${idx.agents.map(a => card(a, by)).join('')}</div>
${strangers.length ? `<p class="ag-note">Also pushing here, not in agents/JOBS.md: ${strangers.map(s => `<code>${T(s)}</code>`).join(', ')}.</p>` : ''}
<h2 class="ag-h" id="flow">Who writes for whom (the commits' For: trailers)</h2>
${flow(gh.items)}
<h2 class="ag-h" id="pushes">The last pushes</h2>
<ul class="ag-feed">${gh.items.slice(0, 25).map(c => `<li><time datetime="${esc(c.at)}">${esc(String(c.at).slice(11, 16))}</time><code>${T(short(c.agent) || '?')}</code> <a href="${esc(/^https:/.test(c.url) ? c.url : '#')}">${T(c.what)}</a>${c.to.length ? ` <span class="ag-note">for ${T(c.to.map(short).join(', '))}</span>` : ''}</li>`).join('') || '<li class="ag-note">No commits read.</li>'}</ul>
<p class="ag-note">Read ${esc(new Date().toISOString().slice(11, 19))} UTC; refreshes every minute. Roster, jobs, statuses and keys: <a href="${BASE}data/agents/index.json">data/agents/index.json</a> (written ${T(idx.generated_at)} from agents/JOBS.md, agents/*/status.json and data/keys.json), then each agent's own status.json as served now. Commits: ${gh.source === 'snapshot' ? `<a href="${BASE}data/agents/commits.json">the snapshot in data/agents/commits.json</a>, taken ${T(gh.snapshot_at)} <span class="ag-err">(GitHub's public API did not answer this browser${gh.error ? ': ' + T(gh.error) : ''}; without a login it allows 60 calls an hour per address, so pushes after the snapshot are missing until it does)</span>` : `<a href="https://github.com/${REPO}/commits/${BRANCH}">GitHub's public API</a>${gh.read ? `, read ${esc(new Date(gh.read).toISOString().slice(11, 19))} UTC${gh.cached ? ' (cached up to two minutes in this browser)' : ''}` : ''}${gh.error ? ` <span class="ag-err">(GitHub did not answer: ${T(gh.error)})</span>` : ''}`}. "Active", "quiet" (30 min to 2 h) and "silent" are derived from the last push or wake; "blocked" is the agent's own word. Session ids are never shown.</p>`
        for (const d of el.querySelectorAll('details')) { const k = d.closest('article')?.id + '|' + d.querySelector('summary')?.textContent.replace(/ \(\d+\)$/, ''); if (hadDrawn) d.open = open.has(k) }
        el.dataset.drawn = '1'
        document.dispatchEvent(new CustomEvent('agents-data', { detail: { idx, commits: gh.items } }))
        if (!hadDrawn && location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView()
    }
    draw(); setInterval(() => { if (!document.hidden) draw() }, 60e3)
    document.addEventListener('visibilitychange', () => { if (!document.hidden) draw() })
})()
