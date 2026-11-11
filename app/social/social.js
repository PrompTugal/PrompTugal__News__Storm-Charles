// Bluesky as a section: draws research/social/*.json (incident.social@web-summit.dinis). No dependencies; reads only this site's own files.
(async () => {
    const root = document.getElementById('social'); if (!root) return
    const base = root.dataset.base || './', sigUrl = root.dataset.signals, tlUrl = root.dataset.timeline
    const J = async u => { const r = await fetch(u, { cache: 'no-cache' }); if (!r.ok) throw new Error(u + ' ' + r.status); return r.json() }
    const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
    const hm = t => t.slice(8, 10) + ' Nov ' + t.slice(11, 16), T = t => Date.parse(t)
    const dur = ms => { const m = Math.round(Math.abs(ms) / 60000); return (m >= 60 ? Math.floor(m / 60) + ' h ' : '') + (m % 60) + ' min' }
    let ix, acc, conv, sig, posts = []
    try {
        [ix, acc, conv, sig] = await Promise.all([J(base + 'posts.json'), J(base + 'accounts.json'), J(base + 'conversation.json'), J(sigUrl).catch(() => ({ items: [] }))])
        posts = (await Promise.all(ix.days.map(d => J(base + d.file)))).flatMap(d => d.posts)
    } catch (e) { root.innerHTML = `<p class="meta">Could not read the data (${esc(e.message)}). The files: <a href="posts.json">posts.json</a>, <a href="conversation.json">conversation.json</a>.</p>`; return }
    const A = Object.fromEntries(acc.accounts.map(a => [a.handle, a])), byId = Object.fromEntries(posts.map(p => [p.id, p]))
    const rows = Object.fromEntries(sig.items.map(r => [r.id, r]))
    const keys = sig.items.filter(r => r.key && r.label === 'fact' && r.kind === 'official')
    const lastRead = Object.values(ix.accounts).map(a => a.read_utc).sort().pop()
    const prov = (file, t) => `<span class="prov"><a href="${file}">${file}</a> · read <time datetime="${t}">${hm(t)} UTC</time></span>`

    // lanes: who speaks. Position and a written label carry identity; colour only marks "about the storm".
    const LANES = [
        { id: 'org', name: 'Web Summit', sub: 'the organisers', f: p => A[p.account].kind === 'organiser' },
        { id: 'auth', name: 'Weather services', sub: 'AEMET, Met Office, …', f: p => /authority|intergovernmental/.test(A[p.account].kind) },
        { id: 'vost', name: 'VOST Portugal', sub: 'volunteers, relaying', f: p => A[p.account].kind === 'volunteer organisation' },
        { id: 'wire', name: 'Lusa', sub: 'the news agency', f: p => p.account === 'lusa.pt' },
        { id: 'press', name: 'Other press', sub: 'Público, Euronews, …', f: p => /press/.test(A[p.account].kind) && p.account !== 'lusa.pt' }
    ]
    const t0 = T('2026-11-09T00:00:00Z'), t1 = Math.max(T(lastRead), Date.now()) + 36e5, W = 1180, L = 150, R = 16
    const x = t => L + (t - t0) / (t1 - t0) * (W - L - R)
    const laneH = 38, top = 64, H1 = top + LANES.length * laneH + 8, volH = 110, H = H1 + 30 + volH + 26
    let q = conv.queries.find(c => c.status === 200 && c.posts) || conv.queries[0], sel = null, selRow = null

    function axis() {
        let s = ''
        for (let t = t0; t <= t1; t += 36e5 * 3) { const d = new Date(t), h = d.getUTCHours(), day = h === 0; s += `<line class="grid${day ? ' day' : ''}" x1="${x(t)}" x2="${x(t)}" y1="${top - 6}" y2="${H - 22}"/>`; if (h % 6 === 0) s += `<text class="ax${day ? ' b' : ''}" x="${x(t) + 3}" y="${H - 8}">${day ? d.getUTCDate() + ' Nov' : String(h).padStart(2, '0') + ':00'}</text>` }
        return s
    }
    function chart() {
        let s = `<svg class="so-chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Posts by listed accounts on one time axis, against the timeline's key moments, and the public conversation as posts per hour">` + axis()
        LANES.forEach((l, i) => {
            const y = top + i * laneH
            if (i % 2 === 0) s += `<rect class="band" x="${L}" y="${y}" width="${W - L - R}" height="${laneH}"/>`
            s += `<text class="lane" x="6" y="${y + 15}">${l.name}</text><text class="lane sub" x="6" y="${y + 28}">${l.sub}</text>`
            const ps = posts.filter(p => l.f(p) && T(p.posted_utc) >= t0)
            if (l.id === 'org') { const last = ps.map(p => p.posted_utc).sort().pop(); if (last) s += `<line class="silent" x1="${x(T(last)) + 8}" x2="${x(T(lastRead))}" y1="${y + laneH / 2}" y2="${y + laneH / 2}"/><text class="silent-t" x="${x(T(lastRead)) - 6}" y="${y + laneH - 3}" text-anchor="end">silent since ${last.slice(11, 16)}</text>` }
            // posts in the same few minutes would sit on top of each other: step them up and down inside the lane; tied ones are drawn last
            let prevX = -99, k = 0
            const placed = ps.slice().sort((a, b) => a.posted_utc.localeCompare(b.posted_utc)).map(p => { const X = x(T(p.posted_utc)); k = X - prevX < 9 ? k + 1 : 0; if (k === 0) prevX = X; return { p, X, dy: [0, -9, 9, -4.5, 4.5][k % 5] } })
            for (const { p, X, dy } of placed.sort((a, b) => !!a.p.timeline - !!b.p.timeline)) s += `<circle class="p${p.about_storm ? ' storm' : ''}${p.timeline ? ' linked' : ''}${sel === p.id ? ' sel' : ''}" data-id="${p.id}" cx="${X.toFixed(1)}" cy="${y + laneH / 2 + dy}" r="${p.timeline ? 5.5 : 4}" tabindex="0"/>`
        })
        // the timeline's key moments (facts from the bodies' own channels), staggered so labels do not collide
        keys.forEach((k, i) => { const X = x(T(k.at)); if (X < L) return; const yy = 14 + (i % 4) * 12; s += `<g class="key${selRow === k.id ? ' sel' : ''}" data-row="${k.id}"><line x1="${X}" x2="${X}" y1="${yy + 3}" y2="${H1}"/><text x="${X > W - 300 ? X - 4 : X + 4}" y="${yy}"${X > W - 300 ? ' text-anchor="end"' : ''}>${k.at.slice(11, 16)} ${esc(short(k.text))}</text><rect class="hit" x="${X - 6}" y="0" width="12" height="${H1}"/></g>` })
        s += `<line class="now" x1="${x(T(lastRead))}" x2="${x(T(lastRead))}" y1="${top - 6}" y2="${H - 22}"/>`
        // the public conversation: one measure, its own baseline (not a second scale on the lanes)
        const vy = H1 + 30, hrs = q.per_hour || {}, max = Math.max(1, ...Object.values(hrs)), bw = Math.max(2, (x(t0 + 36e5) - x(t0)) - 2)
        s += `<text class="lane" x="6" y="${vy + 14}">Public posts</text><text class="lane sub" x="6" y="${vy + 28}">per hour, counted</text><text class="lane sub" x="6" y="${vy + 42}">${esc(q.query)}</text><text class="ax" x="${L - 6}" y="${vy + 10}" text-anchor="end">${max}</text><line class="grid day" x1="${L}" x2="${W - R}" y1="${vy + volH}" y2="${vy + volH}"/>`
        for (const [h, n] of Object.entries(hrs)) { const t = T(h.replace(':00Z', ':00:00Z')); if (t < t0) continue; const bh = n / max * (volH - 6); s += `<rect class="bar" data-h="${h}" data-n="${n}" x="${x(t) + 1}" y="${vy + volH - bh}" width="${bw}" height="${bh}" rx="2"/>` }
        return s + '</svg>'
    }
    function short(t) { t = t.replace(/\*\*/g, '').replace(/^PRIMARY: /, ''); const m = t.match(/^[^:(;,]{8,46}/); return (m ? m[0] : t.slice(0, 44)).trim() }
    function card(p) {
        const a = A[p.account], st = ix.accounts[p.account] || {}
        const tl = (p.timeline || []).map(l => { const r = rows[l.row]; return `<div class="row"><span class="lbl">${esc(l.relation)}</span> timeline row <a href="${tlUrl}#${l.row}"><code>${l.row}</code></a>${r ? ` <span class="meta">(${r.at.slice(8, 10)} Nov ${r.at.slice(11, 16)}: ${esc(r.text.slice(0, 110))}…)</span>` : ''}<br>${esc(l.note)} <span class="lbl">our analysis</span></div>` }).join('')
        const links = p.links.length ? `<dt>Links to</dt><dd>${p.links.map(l => `<a class="so-out" rel="noopener nofollow" href="${esc(l.url)}">${esc(l.title || l.url)}</a>`).join('<br>')}</dd>` : ''
        const media = p.media ? `<dt>Carries</dt><dd>${esc(p.media.kind)}${p.media.count ? ' × ' + p.media.count : ''}${p.media.of ? ' of ' + esc(p.media.of) : ''} (not kept, not shown here)</dd>` : ''
        return `<article class="so-card" id="card"><header><b>${esc(a.who)}</b><span class="lbl">evidence</span><span class="lbl">${esc(a.kind)}</span>${st.verified_by_bluesky ? '<span class="lbl">verified by Bluesky</span>' : '<span class="lbl">not verified by Bluesky</span>'}</header>
<div><time datetime="${p.posted_utc}">${hm(p.posted_utc)}:${p.posted_utc.slice(17, 19)} UTC</time> · posted on Bluesky by <code>${esc(p.account)}</code></div>
<p class="txt" lang="${esc(p.langs[0] || '')}">${esc(p.text)}</p>${p.text_is === 'excerpt' ? '<p class="meta">An excerpt (200 characters): press text is quoted short, with its link.</p>' : ''}${tl}
<dl><dt>Read</dt><dd>first <time>${hm(p.read_utc)} UTC</time>, last <time>${hm(p.last_read_utc)} UTC</time>, from Bluesky's public API</dd>
<dt>At that read</dt><dd>${p.counts.reposts} reposts · ${p.counts.quotes} quotes · ${p.counts.replies} replies · ${p.counts.likes} likes</dd>${links}${media}
<dt>Content id</dt><dd><code>${esc(p.cid)}</code> (Bluesky's hash of the post: it changes if the post is edited)</dd>
<dt>Our record</dt><dd><a href="posts/${p.posted_utc.slice(0, 10)}.json">posts/${p.posted_utc.slice(0, 10)}.json</a>, id <code>${esc(p.id)}</code></dd>
<dt>The post itself</dt><dd><a class="so-out" rel="noopener nofollow" href="${esc(p.url)}">${esc(p.url.replace('https://', ''))}</a></dd></dl></article>`
    }
    function render() {
        const storm = posts.filter(p => p.about_storm), silentOrg = posts.filter(p => A[p.account].kind === 'organiser').map(p => p.posted_utc).sort().pop()
        const shown = (selRow ? posts.filter(p => (p.timeline || []).some(l => l.row === selRow)) : posts.filter(p => p.about_storm || A[p.account].kind === 'organiser')).slice().sort((a, b) => b.posted_utc.localeCompare(a.posted_utc))
        root.innerHTML = `<div class="wx-tiles">
<div class="wx-tile"><p class="meta">Accounts read</p><p><b>${acc.accounts.length}</b></p><p class="meta">official bodies, organisations, outlets: ${prov('accounts.json', acc.updated)}</p></div>
<div class="wx-tile"><p class="meta">Their posts about the storm, kept</p><p><b>${storm.length}</b></p><p class="meta">of ${posts.length} kept since 8 Nov: ${prov('posts.json', ix.updated)}</p></div>
<div class="wx-tile"><p class="meta">Web Summit's last post here</p><p><b>${silentOrg ? silentOrg.slice(11, 16) : 'none'}</b> <span class="meta">${silentOrg ? silentOrg.slice(8, 10) + ' Nov' : ''}</span></p><p class="meta">nothing on Day 2 at our read: ${prov('posts.json', ix.accounts['websummit.bsky.social']?.read_utc || ix.updated)}</p></div>
<div class="wx-tile"><p class="meta">Public posts found for ${esc(q.query)}</p><p><b>${q.posts}</b></p><p class="meta">from ${q.distinct_accounts} accounts, counted and not kept: ${prov('conversation.json', q.read_utc)}</p></div></div>
<section class="card"><h2>Who posted, when: one time axis</h2><p class="meta">Each dot is one post by a listed account (UTC). Filled blue: about the storm; ringed: tied to a timeline row. Vertical lines: the timeline's key facts, at the time their own source gives. Click a dot for its card, a line for the posts tied to that row. All of it is <span class="lbl">evidence</span>.</p>
<div class="wx-scroll" tabindex="0" role="group" aria-label="The time axis: scroll sideways">${chart()}</div>
<ul class="wx-legend"><li><svg width="14" height="14"><circle cx="7" cy="7" r="4.5" style="fill:var(--focus)"/></svg> a post about the storm</li><li><svg width="14" height="14"><circle cx="7" cy="7" r="4.5" style="fill:var(--ink-2)"/></svg> another post (Web Summit's are all kept)</li><li><svg width="16" height="16"><circle cx="8" cy="8" r="5.5" style="fill:var(--focus);stroke:var(--ink);stroke-width:2"/></svg> tied to a timeline row</li><li><span class="k" style="border-top:2px solid var(--ink)"></span> a key fact on the timeline</li><li><span class="k" style="border-top:2px dashed var(--focus)"></span> our last read</li></ul>
<div class="so-pick" role="group" aria-label="Which search the bars count">${conv.queries.filter(c => c.status === 200).map(c => `<button type="button" aria-pressed="${c === q}" data-q="${esc(c.query)}">${esc(c.query)} · ${c.posts}</button>`).join('')}</div>
<p class="meta">The bars: public posts per hour matching the chosen search, by anyone. Counts only: we keep no text, no handle and no address of a private person's post. Languages for this search: ${Object.entries(q.languages || {}).map(([l, n]) => `${l === 'und' ? 'none declared' : esc(l)} ${n}`).join(', ') || 'none'}. ${q.complete ? '' : 'The count is capped: earlier hours are missing. '}${prov('conversation.json', q.read_utc)}</p></section>
<div id="so-card">${sel && byId[sel] ? card(byId[sel]) : ''}</div>
<section class="card"><h2>${selRow ? `Posts tied to row <a href="${tlUrl}#${selRow}"><code>${selRow}</code></a> <button type="button" id="so-clear" class="so-x">show all</button>` : 'The posts, newest first'}</h2>
<ul class="so-list">${shown.map(p => `<li data-id="${p.id}" class="${sel === p.id ? 'sel' : ''}" tabindex="0"><time datetime="${p.posted_utc}">${hm(p.posted_utc)}</time><span>${esc(A[p.account].who.split(/[,(]/)[0])}</span><span class="t">${esc(p.text.replace(/\s+/g, ' ').slice(0, 160))}</span></li>`).join('') || '<li>none</li>'}</ul>
<p class="meta">${shown.length} posts. ${prov('posts.json', ix.updated)}</p></section>`
        bind()
    }
    let tip
    function bind() {
        const pick = id => { sel = id; render(); document.getElementById('so-card').scrollIntoView({ block: 'nearest', behavior: 'smooth' }) }
        root.querySelectorAll('[data-id]').forEach(el => { el.onclick = () => pick(el.dataset.id); el.onkeydown = e => { if (e.key === 'Enter') pick(el.dataset.id) } })
        root.querySelectorAll('.key').forEach(el => el.onclick = () => { selRow = selRow === el.dataset.row ? null : el.dataset.row; sel = null; render() })
        root.querySelectorAll('[data-q]').forEach(el => el.onclick = () => { q = conv.queries.find(c => c.query === el.dataset.q); render() })
        const c = document.getElementById('so-clear'); if (c) c.onclick = () => { selRow = null; render() }
        const show = (e, html) => { tip = tip || document.body.appendChild(Object.assign(document.createElement('div'), { className: 'so-tip' })); tip.innerHTML = html; tip.hidden = false; tip.style.left = Math.min(e.clientX + 12, innerWidth - 330) + 'px'; tip.style.top = e.clientY + 14 + 'px' }
        const hide = () => { if (tip) tip.hidden = true }
        root.querySelectorAll('circle.p').forEach(el => { el.onmousemove = e => { const p = byId[el.dataset.id]; show(e, `<time>${hm(p.posted_utc)}</time> · <b>${esc(A[p.account].who.split(/[,(]/)[0])}</b><br>${esc(p.text.replace(/\s+/g, ' ').slice(0, 140))}`) }; el.onmouseleave = hide })
        root.querySelectorAll('rect.bar').forEach(el => { el.onmousemove = e => show(e, `<time>${hm(el.dataset.h)} to ${String((+el.dataset.h.slice(11, 13) + 1) % 24).padStart(2, '0')}:00</time><br><b>${el.dataset.n}</b> public posts matching ${esc(q.query)}`); el.onmouseleave = hide })
        root.querySelectorAll('.key').forEach(el => { el.onmousemove = e => { const r = rows[el.dataset.row]; show(e, `<time>${hm(r.at)}</time> · timeline, fact<br>${esc(r.text.replace(/\*\*/g, '').slice(0, 200))}`) }; el.onmouseleave = hide })
    }
    const h = location.hash.slice(1); if (byId[h]) sel = h
    render()
})()
