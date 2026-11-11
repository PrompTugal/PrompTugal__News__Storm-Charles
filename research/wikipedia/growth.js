// Wikipedia's pages on the storm, growing, on the same hours as our timeline's key moments.
// Reads articles.json, revisions/<page>.json and the incident's signals.json; draws one SVG with a table twin.
// Tokens only (design/README.md): no warning colour is used; series differ by line pattern and a written label.
(async () => {
  const el = document.getElementById('wiki-growth'); if (!el) return
  const base = el.dataset.base || './', sigUrl = el.dataset.signals
  const j = u => fetch(u).then(r => r.ok ? r.json() : null).catch(() => null)
  const [arts, sig] = await Promise.all([j(base + 'articles.json'), j(sigUrl)])
  if (!arts) { el.textContent = 'The data could not be read: see articles.json and revisions.json.'; return }
  const pages = (arts.articles || []).filter(a => a.kind === 'article' || a.kind === 'section')
  const hist = await Promise.all(pages.map(a => j(base + a.revisions_file)))
  const T = s => Date.parse(s.length === 17 ? s.replace('Z', ':00Z') : s)
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
  const hm = t => new Date(t).toISOString().slice(11, 16), dm = t => { const d = new Date(t); return d.getUTCDate() + ' ' + ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getUTCMonth()] + (d.getUTCFullYear() === 2026 ? '' : ' ' + d.getUTCFullYear()) }
  const PAT = ['', '7 4', '2 4', '10 3 2 3', '1 3', '12 4']
  // one series per page: bytes about the storm (the whole article, or the storm's section of a season article)
  const series = pages.map((a, i) => {
    const pts = (hist[i]?.revisions || []).map(r => ({ t: T(r.at), v: a.kind === 'article' ? r.bytes : (r.section_bytes ?? (r.sha256 !== undefined ? 0 : null)), id: r.id, summary: r.summary, refs: a.kind === 'article' ? r.refs : r.section_refs })).filter(p => p.v != null)
    return { a, pts, name: `${a.lang}: ${a.title}${a.kind === 'section' ? ' (the storm\'s section)' : ''}`, short: a.lang + (a.kind === 'section' ? ' section' : ' article') }
  }).filter(s => s.pts.some(p => p.v > 0))
  series.forEach((s, i) => { s.dash = PAT[i % PAT.length]; s.cls = i === 0 ? 'wk-a' : 'wk-b' })
  const read = T(arts.updated)
  const keys = (sig?.items || []).filter(s => s.key && s.kind !== 'team' && T(s.at) <= read)
  const all = series.flatMap(s => s.pts.filter(p => p.v > 0))
  const X0 = Math.floor(Math.min(...all.map(p => p.t), ...keys.map(k => T(k.at))) / 108e5) * 108e5, X1 = Math.ceil(read / 36e5) * 36e5
  const YM = Math.ceil(Math.max(...all.map(p => p.v)) / 5000) * 5000
  const W = 1100, H = 470, ml = 52, mr = 16, mt = 150, mb = 34
  const x = t => ml + (Math.max(X0, Math.min(X1, t)) - X0) / (X1 - X0) * (W - ml - mr), y = v => H - mb - v / YM * (H - mt - mb), f = n => n.toFixed(1)
  const g = []
  for (let v = 0; v <= YM; v += 5000) g.push(`<line class="grid" x1="${ml}" x2="${W - mr}" y1="${f(y(v))}" y2="${f(y(v))}"/><text class="ax" x="${ml - 6}" y="${f(y(v) + 4)}" text-anchor="end">${v / 1000}k</text>`)
  for (let t = X0; t <= X1; t += 108e5) { const mid = new Date(t).getUTCHours() === 0; g.push(`<line class="${mid ? 'grid day' : 'tick'}" x1="${f(x(t))}" x2="${f(x(t))}" y1="${mid ? mt : H - mb}" y2="${H - mb + 4}"/><text class="ax${mid ? ' b' : ''}" x="${f(x(t))}" y="${H - mb + 16}" text-anchor="middle">${mid ? dm(t) : hm(t)}</text>`) }
  g.push(`<text class="ax" x="${ml}" y="${mt - 8}">bytes of wikitext about the storm</text>`)
  // our timeline's key moments: a dashed rule from the plot up to a label in its own lane (labels staggered so none collide)
  const lanes = []
  keys.sort((a, b) => T(a.at) - T(b.at)).forEach(k => {
    const kx = x(T(k.at)), label = `${hm(T(k.at))} ${k.text.replace(/\*\*/g, '').replace(/^(signal|PRIMARY|DECISION|Public): ?/i, '').slice(0, 44)}…`, w = label.length * 5.6 + 8
    const left = kx + 3 + w > W - mr, a = left ? kx - 3 - w : kx + 3, b = a + w
    let lane = lanes.findIndex(iv => iv.every(([p, q]) => b < p - 4 || a > q + 4)); if (lane < 0) { lane = lanes.length; lanes.push([]) }
    lanes[lane].push([a, b])
    const ly = 14 + lane * 15
    g.push(`<a href="${esc(el.dataset.timeline)}#${esc(k.id)}"><title>${esc(dm(T(k.at)) + ', ' + hm(T(k.at)) + ' UTC (' + k.label + '): ' + k.text.replace(/\*\*/g, ''))}</title><line class="wk-key${k.label === 'fact' ? '' : ' ev'}" x1="${f(kx)}" x2="${f(kx)}" y1="${ly + 3}" y2="${H - mb}"/><text class="lab wk-k" x="${f(left ? kx - 3 : kx + 3)}" y="${ly}"${left ? ' text-anchor="end"' : ''}>${esc(label)}</text></a>`)
  })
  series.forEach(s => {
    let d = '', prev = null
    for (const p of s.pts) { if (p.t < X0) { prev = p; continue } d += prev ? `H${f(x(p.t))}V${f(y(p.v))}` : `M${f(x(p.t))},${f(y(p.v))}`; if (prev && !d.startsWith('M')) d = `M${f(x(X0))},${f(y(prev.v))}` + d; prev = p }
    if (prev) d += `H${f(x(read))}`
    g.push(`<path class="wk-line ${s.cls}" d="${d}"${s.dash ? ` stroke-dasharray="${s.dash}"` : ''}/>`)
    for (const p of s.pts) if (p.t >= X0) g.push(`<a href="https://${s.a.lang}.wikipedia.org/w/index.php?oldid=${p.id}"><circle class="wk-dot ${s.cls}" cx="${f(x(p.t))}" cy="${f(y(p.v))}" r="4"><title>${esc(`${s.short}, ${dm(p.t)} ${hm(p.t)} UTC: ${p.v} bytes${p.refs != null ? ', ' + p.refs + ' footnotes' : ''}. Edit summary: ${p.summary || '(none)'} (revision ${p.id})`)}</title></circle><circle class="wk-hit" cx="${f(x(p.t))}" cy="${f(y(p.v))}" r="11"><title>${esc(`${s.short}, ${dm(p.t)} ${hm(p.t)} UTC: ${p.v} bytes${p.refs != null ? ', ' + p.refs + ' footnotes' : ''}. Edit summary: ${p.summary || '(none)'} (revision ${p.id})`)}</title></circle></a>`)
    const lastp = s.pts[s.pts.length - 1]
    g.push(`<text class="lab" text-anchor="end" x="${f(x(read) - 4)}" y="${f(y(lastp.v) - 7)}">${esc(s.short)}: ${lastp.v.toLocaleString('en')} bytes</text>`)
  })
  g.push(`<line class="gnow" x1="${f(x(read))}" x2="${f(x(read))}" y1="${mt}" y2="${H - mb}"/><text class="ax" text-anchor="end" x="${f(x(read) - 3)}" y="${H - mb - 5}">read ${hm(read)}</text>`)
  const rows = series.flatMap(s => s.pts.filter(p => p.t >= X0).map(p => ({ s, p }))).sort((a, b) => a.p.t - b.p.t)
  const st = t => t ? `${dm(T(t))} ${hm(T(t))}` : ''
  const listed = (arts.articles || []).filter(a => !a.not_found_at)
  const pagesHtml = `<section class="card"><h2>The pages: ${listed.length} in ${arts.counts.languages.length} language${arts.counts.languages.length > 1 ? 's' : ''}</h2>
<p class="meta">Every Wikipedia page we found about the storm. <span class="prov">Source: each wiki's API, read <time datetime="${esc(arts.updated)}">${st(arts.updated)} UTC</time>; evidence.</span> Languages checked and found without one: ${[...new Set((arts.checked || []).filter(c => /season article/.test(c.what) || (c.what === 'titles' && !c.found.length)).map(c => c.lang))].filter(l => !arts.counts.languages.includes(l)).sort().join(', ') || 'none'} (<a href="${base}articles.json">what was asked of each</a>).</p>
<div class="wx-scroll" tabindex="0"><table class="wk"><thead><tr><th>Language</th><th>Page</th><th>Kind</th><th>Created (UTC)</th><th>Revisions</th><th>Bytes about the storm</th><th>Footnotes</th><th>Last changed (UTC)</th></tr></thead><tbody>${listed.map(a => `<tr><td><code>${esc(a.lang)}</code></td><td><a href="${esc(a.section_url || a.url)}">${esc(a.title)}</a>${a.kind === 'section' ? ` § ${esc(a.section)}` : ''}${a.kind === 'redirect' ? ` → ${esc(a.redirects_to)}${a.fragment ? ' § ' + esc(a.fragment) : ''}` : ''}</td><td>${esc(a.kind)}</td><td><code>${st(a.kind === 'section' ? a.section_first?.at : a.created)}</code>${a.kind === 'section' ? ' <small>(the section)</small>' : ''}</td><td>${a.revisions}</td><td>${a.kind === 'article' ? a.size : a.kind === 'section' ? `${a.section_bytes} <small>of ${a.size}</small>` : a.kind === 'mention' ? '<small>named only</small>' : a.size}</td><td>${a.kind === 'section' ? a.section_refs : a.kind === 'article' ? a.refs : ''}</td><td><code>${st(a.last_changed)}</code> <a href="${esc(a.current_url)}">this revision</a></td></tr>`).join('')}</tbody></table></div></section>`
  el.innerHTML = pagesHtml + `<section class="card wk-card"><h2>Wikipedia's pages on the storm, growing, against our timeline</h2>
<p class="meta">Each step is one revision. The lines are bytes of wikitext about the storm: a whole article, or the storm's own section of a season article. The dashed rules are the key moments of <a href="${esc(el.dataset.timeline)}">our timeline</a>, at the minute each happened. Times are UTC. <span class="prov">Source: <a href="https://www.mediawiki.org/wiki/API:Revisions">MediaWiki's API</a> on each wiki, read <time datetime="${esc(arts.updated)}">${dm(read)}, ${hm(read)} UTC</time>; evidence, not fact; no editor is named.</span></p>
<div class="wx-scroll" tabindex="0" role="group" aria-label="The growth of each Wikipedia page over time: scroll sideways"><svg class="wx-chart wk-chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Bytes about Storm Charles on each Wikipedia page, revision by revision, with the key moments of our timeline">${g.join('')}</svg></div>
<ul class="wx-legend">${series.map(s => `<li><svg class="wk-key-s" viewBox="0 0 30 8" width="30" height="8" aria-hidden="true"><line class="wk-line ${s.cls}" x1="0" x2="30" y1="4" y2="4"${s.dash ? ` stroke-dasharray="${s.dash}"` : ''}/></svg> <a href="${esc(s.a.url)}">${esc(s.name)}</a>: ${s.a.kind === 'section' ? `the section first appears ${dm(T(s.a.section_first.at))} ${hm(T(s.a.section_first.at))}` : `${s.pts.length} revisions, created ${dm(T(s.a.created))} ${hm(T(s.a.created))}`}</li>`).join('')}<li><svg viewBox="0 0 30 8" width="30" height="8" aria-hidden="true"><line class="wk-key" x1="0" x2="30" y1="4" y2="4"/></svg> a key moment of our timeline, labelled fact</li><li><svg viewBox="0 0 30 8" width="30" height="8" aria-hidden="true"><line class="wk-key ev" x1="0" x2="30" y1="4" y2="4"/></svg> a key moment, labelled evidence</li></ul>
<details class="wx-table"><summary>The same as a table (${rows.length} revisions since ${dm(X0)}, ${hm(X0)})</summary><table><thead><tr><th>UTC</th><th>Page</th><th>Bytes about the storm</th><th>Footnotes</th><th>Edit summary (the editor's words, CC BY-SA 4.0)</th><th>Revision</th></tr></thead><tbody>${rows.map(({ s, p }) => `<tr><td><code>${dm(p.t)} ${hm(p.t)}</code></td><td>${esc(s.short)}</td><td>${p.v}</td><td>${p.refs ?? ''}</td><td>${esc(p.summary || '')}</td><td><a href="https://${s.a.lang}.wikipedia.org/w/index.php?oldid=${p.id}">${p.id}</a></td></tr>`).join('')}</tbody></table></details></section>`
})()
