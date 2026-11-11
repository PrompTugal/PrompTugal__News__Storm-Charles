// Perplexity as a research tool: the scorecard as small charts (incident.perplexity@web-summit.dinis, WS-214).
// Reads research/perplexity/scorecard.json only; the same figures are in the page's tables. No dependencies.
(async () => {
    const el = document.getElementById('pplx'); if (!el) return
    const base = el.dataset.base || './', h = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
    let S; try { S = await (await fetch(base + 'scorecard.json', { cache: 'no-store' })).json() } catch { return }
    const usd = x => x == null ? 'n/a' : x < 0.1 ? x.toFixed(4) : x.toFixed(2), o = S.overall
    const MARKS = [['confirmed', 'confirmed at a primary source'], ['press', 'press only'], ['unsupported', 'unsupported'], ['wrong', 'wrong'], ['unchecked', 'not checked (on hold, or did not render)'], ['none_found', 'the engine said it found none']]
    const ADDR = [['primary', 'a primary body\'s own page'], ['press', 'press'], ['aggregator', 'a site that rewrites others'], ['other', 'other'], ['not_requested', 'not requested by us (terms, social)']]
    const bar = (x, keys, get) => { const tot = keys.reduce((s, [k]) => s + get(x, k), 0) || 1; return `<div class="px-track" role="img" aria-label="${h(keys.map(([k, l]) => get(x, k) + ' ' + l).join(', '))}">${keys.map(([k, l]) => get(x, k) ? `<span class="px-seg ${k}" style="width:${(100 * get(x, k) / tot).toFixed(2)}%" title="${get(x, k)} ${h(l)}"></span>` : '').join('')}</div>` }
    const m = (x, k) => x[k] || 0, a = (x, k) => x['addresses_' + k] || 0
    const rows = (list, keys, get, num) => `<div class="px-rows">${list.map(([name, x]) => `<div class="name">${name}</div>${bar(x, keys, get)}<div class="num">${num(x)}</div>`).join('')}</div>`
    const legend = keys => `<p class="px-legend">${keys.map(([k, l]) => `<span><i class="px-seg ${k}"></i>${h(l)}</span>`).join('')}</p>`
    const marksNum = x => `${x.confirmed} · ${x.press} · ${x.unsupported} · ${x.wrong} · ${x.unchecked || 0} · ${x.none_found}`
    const runs = S.per_run.map(r => [`<a href="#run-${r.run}-${h(String(r.topic).toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-'))}">Run ${r.run}</a>: ${h(r.topic)}`, r])
    const models = Object.entries(S.by_model).map(([k, v]) => [`<code>${h(k)}</code>`, v]), langs = Object.entries(S.by_lang).map(([k, v]) => [k === 'pt' ? 'Asked in Portuguese' : 'Asked in English', v])
    el.innerHTML = `<section class="px">
<div class="px-tiles">
<div class="wx-tile"><b>${o.statements}</b>statements checked in ${o.asks} answers</div>
<div class="wx-tile"><b>${o.confirmed}</b>confirmed at a primary source</div>
<div class="wx-tile"><b>${o.press}</b>press only</div>
<div class="wx-tile"><b>${o.unsupported + o.wrong}</b>unsupported or wrong</div>
<div class="wx-tile"><b>${o.addresses_primary}/${o.addresses}</b>addresses returned that were a primary body's</div>
<div class="wx-tile"><b>${S.leads}</b>leads offered to the conductor</div>
<div class="wx-tile"><b>${usd(o.cost_usd)}</b>US dollars spent; ${usd(S.cost_per_lead_usd)} a lead</div>
</div>
<h2>What each answer's statements came to, by run</h2>
${rows(runs, MARKS, m, marksNum)}${legend(MARKS)}
<p class="meta">Counts beside each bar, in the legend's order. Each statement was marked by opening the address the engine cited.</p>
<h2>By model, and by the language of the question</h2>
${rows([...models, ...langs], MARKS, m, x => marksNum(x) + ' · ' + usd(x.cost_usd) + ' USD')}
<h2>Whose pages it returned</h2>
${rows([['All addresses returned', o], ...runs], ADDR, a, x => `${x.addresses_primary} of ${x.addresses} primary`)}${legend(ADDR)}
<p class="meta">Source: <a href="${base}scorecard.json">scorecard.json</a>, updated <time datetime="${h(S.updated)}">${h(S.updated.slice(0, 16).replace('T', ' '))} UTC</time>. An engine's answer is evidence about the engine, not about the storm.</p>
</section>`
})()
