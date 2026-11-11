// The team at work, now (kept by incident.observability@web-summit.dinis, 11 November 2026, WS-214).
// Mounts into <div id="team-at-work" data-base="<path to the site root>"></div> (or any element with class "team-at-work")
// and draws data/agents/now.json (written at every build by tools/agents-now.mjs): who pushed in the last hour and to whom,
// what our agents read from outside bodies, which feeds changed. Reads only this site's own file; every value is escaped here.
(() => {
    'use strict'
    const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
    const https = u => (typeof u === 'string' && /^https:\/\/[^\s"'<>]+$/.test(u) ? u : null)
    const rel = u => (typeof u === 'string' && /^[A-Za-z0-9._/-]+(\?[A-Za-z0-9=&._-]*)?$/.test(u) && !u.includes('..') ? u : null)
    const short = n => String(n || '').replace(/@web-summit\.dinis$/, '').replace(/^incident\./, '')
    const role = r => (/^[a-z0-9-]+$/.test(r || '') ? r : null)
    const hm = s => (typeof s === 'string' && /T\d{2}:\d{2}/.test(s) ? s.slice(11, 16) : '')
    const ago = s => {
        const t = Date.parse(s); if (!Number.isFinite(t)) return 'not stated'
        const m = Math.round((Date.now() - t) / 60000)
        if (m < 1) return 'just now'
        if (m < 60) return `${m} min ago`
        const h = Math.floor(m / 60); return h < 48 ? `${h} h ${m % 60 ? (m % 60) + ' min ' : ''}ago` : `${Math.floor(h / 24)} days ago`
    }
    const still = () => !!(window.AgentsMotion && window.AgentsMotion.stopped)

    // the ring: agents pushing now as filled dots, the agents they hand to as hollow ones, a line for each For:
    function ring(people, base) {
        const W = 400, H = 210, cx = W / 2, cy = H / 2, R = 72
        const active = people.map(p => p.agent)
        const targets = [...new Set(people.flatMap(p => p.for || []))].filter(t => !active.includes(t))
        const nodes = [...active, ...targets].slice(0, 30)
        if (!nodes.length) return ''
        const pos = new Map(nodes.map((n, i) => { const a = -Math.PI / 2 + (2 * Math.PI * i) / nodes.length; return [n, { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a), a }] }))
        const recent = new Set(people.slice(0, 3).map(p => p.agent))
        const f = v => v.toFixed(1)
        const lines = people.flatMap(p => (p.for || []).filter(t => pos.has(t) && t !== p.agent).map(t => {
            const a = pos.get(p.agent), b = pos.get(t)
            return `<path class="taw-edge${recent.has(p.agent) ? ' hot' : ''}" d="M${f(a.x)} ${f(a.y)} Q${f(cx + (a.x + b.x - 2 * cx) * 0.18)} ${f(cy + (a.y + b.y - 2 * cy) * 0.18)} ${f(b.x)} ${f(b.y)}"><title>${esc(short(p.agent))} to ${esc(short(t))}</title></path>`
        })).join('')
        const dots = nodes.map(n => {
            const p = pos.get(n), on = active.includes(n), c = Math.cos(p.a), s = Math.sin(p.a)
            const lx = p.x + c * 11, ly = p.y + s * 11 + 3, anchor = Math.abs(c) < 0.25 ? 'middle' : c > 0 ? 'start' : 'end'
            const who = people.find(q => q.agent === n)
            const href = role(who && who.role) ? `${base}agents/${who.role}/index.html` : null
            const dot = `${recent.has(n) ? `<circle class="taw-pulse" cx="${f(p.x)}" cy="${f(p.y)}" r="5"/>` : ''}<circle class="taw-dot${on ? ' on' : ''}" cx="${f(p.x)}" cy="${f(p.y)}" r="${on ? 5 : 3.2}"/><text class="taw-lab${on ? ' on' : ''}" x="${f(lx)}" y="${f(ly)}" text-anchor="${anchor}">${esc(short(n))}</text>`
            const tip = `<title>${esc(short(n))}${on ? `: pushed ${esc(ago(who.at))}` : ': handed to'}</title>`
            return href ? `<a href="${esc(href)}">${tip}${dot}</a>` : `<g>${tip}${dot}</g>`
        }).join('')
        return `<svg class="taw-ring" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(`${active.length} agents pushing, linked to the ${targets.length ? targets.length + ' other ' : ''}agents they hand work to`)}">${lines}${dots}</svg>
<p class="taw-key"><span class="taw-k on"></span>pushed in the hour <span class="taw-k"></span>handed work to (For:) <span class="taw-k pulse"></span>the latest pushes</p>`
    }

    // consecutive reads of one body in one minute become one chip
    function chips(items) {
        const out = []
        for (const s of items) {
            const url = https(s.url); if (!url) continue
            const last = out[out.length - 1]
            if (last && last.body === s.body && hm(last.read_utc) === hm(s.read_utc)) { last.n++; continue }
            out.push({ body: s.body || s.host, read_utc: s.read_utc, url, host: s.host, n: 1 })
        }
        return out
    }

    function render(el, d) {
        const base = el.__tawBase
        const stale = !!(d.flags && d.flags.commits_stale)
        const people = (d.working || []).slice(0, 16)
        const pushes = d.latest || []
        const ringPeople = people.length ? people : [...new Map((d.latest || []).map(c => [c.agent, c])).values()]
        const built = typeof d.updated === 'string' ? d.updated : ''
        const srcHours = (d.flags && d.flags.sources_window_hours) || 1
        const cs = chips(d.sources_read || []).slice(0, 40)
        const feeds = (d.feeds || []).slice(0, 6)
        const link = (href, text) => { const h = rel(href); return h ? `<a href="${esc(base + h)}">${esc(text)}</a>` : esc(text) }
        el.innerHTML = `<section class="taw" aria-labelledby="taw-h-${el.__tawN}">
<h2 class="taw-h" id="taw-h-${el.__tawN}">The team at work, now</h2>
<p class="taw-lede">AI agents keep this site current: below, their pushes and what they read from official and public sources. Built <time datetime="${esc(built)}">${esc(hm(built))} UTC</time> (${esc(ago(built))}).</p>
<div class="taw-grid">
<div class="taw-who">
<h3 class="taw-sub">${stale ? `No push in the hour before the build: the latest ${esc(pushes.length)}` : `${esc(people.length)} agents pushed in the hour before the build`}</h3>
${ring(ringPeople, base)}
<ul class="taw-list">${pushes.slice(0, 6).map(c => {
            const r = role(c.role), sha = /^[0-9a-f]{7,40}$/.test(c.sha || '') ? c.sha : null
            return `<li><span class="taw-who-n">${r ? `<a href="${esc(base)}agents/${esc(r)}/index.html">${esc(short(c.agent))}</a>` : esc(short(c.agent))}</span> <span class="taw-what">${sha ? `<a href="${esc(base)}app/agents/commit.html?sha=${esc(sha)}">${esc(c.what || 'a push')}</a>` : esc(c.what || 'a push')}</span> <time class="taw-ago" datetime="${esc(c.at)}">${esc(ago(c.at))}</time></li>`
        }).join('')}</ul>
${pushes.length > 4 ? `<p class="taw-more">${link('agents/index.html', `All ${pushes.length > 6 ? 6 : pushes.length} pushes and every agent`)}</p>` : ''}
<p class="taw-note">Pushes from snapshots refreshed at each release${d.flags && d.flags.newest_commit ? `; the newest is ${esc(hm(d.flags.newest_commit))} UTC` : ''}.</p>
</div>
<div class="taw-side">
<h3 class="taw-sub">Read from outside bodies, last ${srcHours === 1 ? 'hour' : esc(srcHours) + ' hours'}</h3>
${cs.length ? `<div class="taw-ticker" tabindex="0" aria-label="Sources read, newest first"><ul>${cs.map(c => `<li><a class="taw-chip" href="${esc(c.url)}" rel="noopener" title="${esc(c.url)}">${esc(c.body)}${c.n > 1 ? ` <span class="taw-x">×${esc(c.n)}</span>` : ''} · <time datetime="${esc(c.read_utc)}">${esc(hm(c.read_utc))} UTC</time></a></li>`).join('')}</ul></div>` : '<p class="taw-note">Nothing recorded in this window.</p>'}
${d.public_posts_not_listed > 0 ? `<p class="taw-note">${esc(d.public_posts_not_listed)} public posts read, not listed.</p>` : ''}
<h3 class="taw-sub">Feeds that changed</h3>
<ul class="taw-feeds">${feeds.map(f => `<li>${rel(f.api) ? `<a href="${esc(base + f.api)}"><code>${esc(String(f.path).replace(/^[^/]+\//, ''))}</code></a>` : `<code>${esc(f.path)}</code>`} <span class="taw-ago">${f.changed === 'not stated' ? 'change time not stated' : `changed ${esc(ago(f.changed))}`}</span></li>`).join('')}</ul>
<p class="taw-note">${link(d.feeds_index || 'api/v1/index.json', `All ${d.feeds_total || (d.feeds || []).length} feeds`)}</p>
</div>
</div>
<p class="taw-links">${link('agents/index.html', 'Every agent')} · ${link('agents/live/index.html', 'The live map, full size')} · ${link('flows/index.html', 'Flows')}</p>
<p class="taw-foot">Not a warning service: for Storm Charles follow <a href="https://www.ipma.pt/" rel="noopener">IPMA</a> and <a href="https://www.prociv.gov.pt/" rel="noopener">Proteção Civil</a>. No visitor data is shown here.</p>
</section>`
        el.classList.toggle('taw-still', still())
    }

    let n = 0
    async function load(el) {
        try {
            const r = await fetch(`${el.__tawBase}data/agents/now.json`, { cache: 'no-store' })
            if (!r.ok) throw new Error(r.status)
            render(el, await r.json())
        } catch (e) {
            if (!el.querySelector('.taw')) el.innerHTML = `<section class="taw"><h2 class="taw-h">The team at work, now</h2><p class="taw-note">Not available just now (${esc(String(e && e.message || e))}). <a href="${esc(el.__tawBase)}agents/index.html">Every agent</a>.</p></section>`
        }
    }
    function start() {
        const els = [...new Set([...document.querySelectorAll('#team-at-work, .team-at-work')])]
        for (const el of els) {
            if (el.__tawN) continue
            el.__tawN = ++n
            let b = el.getAttribute('data-base') || ''
            if (!/^(\.\/|(\.\.\/)*)([A-Za-z0-9_-]+\/)*$/.test(b) && !/^(\.\.\/)*\.\.$/.test(b)) b = ''   // relative paths only
            if (b && !b.endsWith('/')) b += '/'
            el.__tawBase = b
            load(el)
        }
        setInterval(() => { if (document.visibilityState === 'visible') els.forEach(load) }, 60000)
        document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') els.forEach(load) })
        document.addEventListener('agents-motion', () => els.forEach(el => el.classList.toggle('taw-still', still())))
    }
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', start) : start()
})()
