// The pipeline and the repository, drawn (incident.ci@web-summit.dinis). One script for the five pages under /ci/: the mount
// element's data-view says which (pipeline, commits, collaboration, repository, signing). It reads only data/ci/*.json (written by
// tools/ci-read.mjs, a snapshot) and, on the pipeline page, GitHub's public API for the newest runs (labelled as live, with the
// time read; the snapshot is shown when GitHub does not answer). No dependencies; colours are the site's tokens.
(() => {
    const root = document.getElementById('ci'); if (!root) return
    const BASE = root.dataset.base || '../', VIEW = root.dataset.view || 'pipeline', D = BASE + 'data/ci/'
    const REPO = 'PrompTugal/PrompTugal__News__Storm-Charles', WEB = 'https://github.com/' + REPO
    const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
    const get = async f => { const r = await fetch(D + f + '?t=' + Math.floor(Date.now() / 30000)); if (!r.ok) throw new Error(f + ': ' + r.status); return r.json() }
    const hm = t => t ? new Date(t).toISOString().slice(11, 16) : '', hms = t => t ? new Date(t).toISOString().slice(11, 19) : ''
    const dm = t => t ? new Date(t).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' }) : ''
    const when = t => t ? `<time datetime="${esc(t)}">${hm(t)}</time>` : ''
    const kb = n => n >= 1048576 ? (n / 1048576).toFixed(1) + ' MB' : n >= 1024 ? Math.round(n / 1024) + ' KB' : n + ' B'
    const dur = s => s == null ? 'not recorded' : s >= 90 ? Math.floor(s / 60) + ' min ' + (s % 60) + ' s' : s + ' s'
    const ago = t => { const s = Math.round((Date.now() - new Date(t)) / 1000); return s < 90 ? s + ' s ago' : s < 5400 ? Math.round(s / 60) + ' min ago' : Math.round(s / 3600) + ' h ago' }
    const short = a => String(a || '').split('@')[0].replace(/^incident\./, '') || 'not stated'
    const prov = (file, t, label) => `<span class="prov"><a href="${D}${file}">${esc(label || file)}</a>, read ${hm(t)} UTC ${dm(t)}</span>`
    const RES = { success: ['ok', 'served'], failure: ['bad', 'failed'], cancelled: ['skip', 'replaced by a newer push'], 'in progress': ['run', 'running'], queued: ['run', 'waiting'] }
    const res = r => RES[r] || ['skip', r || 'unknown']
    const chip = r => `<span class="ci-res ${res(r)[0]}">${esc(res(r)[1])}</span>`
    const commitUrl = sha => `${WEB}/commit/${sha}`
    const params = () => Object.fromEntries(new URLSearchParams(location.hash.slice(1)))
    const setParams = o => { const p = new URLSearchParams(Object.entries(o).filter(([, v]) => v)); history.replaceState(null, '', p.toString() ? '#' + p : location.pathname + location.search) }
    const loadDays = async (index, kind) => (await Promise.all(index.files[kind].map(f => get(f.file)))).flatMap(j => j[kind])
    // one tooltip for every mark
    const tip = document.createElement('div'); tip.className = 'ci-tip'; tip.hidden = true; document.body.appendChild(tip)
    const tipOn = (el, html) => { const show = e => { tip.innerHTML = typeof html === 'function' ? html() : html; tip.hidden = false; const b = el.getBoundingClientRect(), w = tip.offsetWidth; tip.style.left = Math.max(8, Math.min(innerWidth - w - 8, b.left + b.width / 2 - w / 2)) + scrollX + 'px'; tip.style.top = b.top + scrollY - tip.offsetHeight - 8 < scrollY ? b.bottom + scrollY + 8 + 'px' : b.top + scrollY - tip.offsetHeight - 8 + 'px' }; const hide = () => { tip.hidden = true }; el.addEventListener('mouseenter', show); el.addEventListener('focus', show); el.addEventListener('mouseleave', hide); el.addEventListener('blur', hide) }
    const tips = scope => scope.querySelectorAll('[data-tip]').forEach(el => tipOn(el, () => el.dataset.tip))
    const panel = (title, html, links) => { if (window.stormPanel?.show) window.stormPanel.show({ title, html, links }) }
    const nav = `<nav class="ci-nav" aria-label="The CI pages">${[['pipeline', 'index.html', 'Pipeline'], ['commits', 'commits.html', 'Every commit'], ['collaboration', 'collaboration.html', 'Collaboration'], ['repository', 'repository.html', 'Repository'], ['signing', 'signing.html', 'Signatures']].map(([v, h, t]) => `<a href="${BASE}ci/${h}"${v === VIEW ? ' aria-current="page"' : ''}>${t}</a>`).join('')}<a class="out" href="${WEB}">The repository on GitHub</a></nav>`
    const tile = (label, value, sub, cls = '') => `<div class="wx-tile ci-tile ${cls}"><p class="ci-k">${label}</p><p class="ci-v">${value}</p><p class="meta">${sub}</p></div>`
    const fail = e => { root.innerHTML = nav + `<p class="meta">The CI data could not be read (${esc(e.message)}). The files: <a href="${D}index.json">data/ci/index.json</a>.</p>` }

    // ------------------------------------------------------------ the run's details, for the panel and under the strip
    const runHtml = r => `<dl class="kv ci-kv"><dt>Result</dt><dd>${chip(r.result)}${r.failed_step ? ` at <b>${esc(r.failed_step)}</b>` : ''}</dd>
<dt>Commit</dt><dd><a href="${commitUrl(r.sha)}"><code>${esc(r.sha.slice(0, 10))}</code></a> by ${esc(short(r.agent))}: ${esc(r.what || '')}</dd>
<dt>Pushed</dt><dd>${hms(r.pushed)} UTC; queued ${hms(r.queued)}${r.started ? `; a runner started ${hms(r.started)} (waited ${dur(r.queue_s)})` : '; no runner started it'}</dd>
${r.steps?.length ? `<dt>Steps</dt><dd>${r.steps.map(s => `${esc(s.step)} <b>${s.s ?? '?'} s</b>${s.result && s.result !== 'success' ? ` (${esc(s.result)})` : ''}`).join(' · ')}</dd>` : ''}
<dt>Push to served</dt><dd>${r.push_to_served_s != null ? `<b>${r.push_to_served_s} s</b>, the run's own measure on the live site` : r.result === 'success' ? 'no notice in this run' : 'not served by this run'}</dd>
<dt>Tag</dt><dd>${r.tag ? `<a href="${WEB}/releases/tag/${esc(r.tag)}"><code>${esc(r.tag)}</code></a> (lightweight, not signed)` : 'none on this commit'}</dd>
${r.reason ? `<dt>Reason</dt><dd>${esc(r.reason)}</dd>` : ''}</dl><p class="prov"><a href="${esc(r.url)}">The run on GitHub</a> · <a href="${BASE}ci/commits.html#q=${esc(r.sha.slice(0, 10))}">its commit here</a></p>`

    // ------------------------------------------------------------ pipeline
    async function pipeline() {
        const ix = await get('index.json'), runs = await loadDays(ix, 'runs'), P = ix.pipeline
        let live = null
        const draw = () => {
            const byRun = new Map(runs.map(r => [r.run, r]))
            if (live) for (const l of live.runs) { const o = byRun.get(l.run); if (!o) { runs.push(l); byRun.set(l.run, l) } else if (o.result !== l.result && (o.result === 'in progress' || o.result === 'queued')) Object.assign(o, { result: l.result, ended: l.ended }) }
            runs.sort((a, b) => a.run - b.run)
            const last = runs.at(-1), lastOk = runs.filter(r => r.result === 'success').at(-1)
            const today = new Date().toISOString().slice(0, 10), days = [...new Set(runs.map(r => r.queued.slice(0, 10)))], day = days.includes(today) ? today : days.at(-1)
            const strip = d => { const list = runs.filter(r => r.queued.startsWith(d)), hours = [...new Set(list.map(r => r.queued.slice(11, 13)))]; return `<div class="ci-day"><h3>${dm(d + 'T00:00Z')} <span class="meta">${list.length} runs: ${Object.entries(list.reduce((m, r) => (m[res(r.result)[1]] = (m[res(r.result)[1]] || 0) + 1, m), {})).map(([k, n]) => n + ' ' + k).join(', ')}</span></h3>${hours.map(h => `<div class="ci-hour"><span class="ci-hh">${h}:00</span><span class="ci-cells">${list.filter(r => r.queued.slice(11, 13) === h).map(r => `<button type="button" class="ci-cell ${res(r.result)[0]}" data-run="${r.run}" aria-label="Run ${r.run}, ${esc(res(r.result)[1])}, ${hm(r.queued)} UTC, ${esc(short(r.agent))}" data-tip="<b>${esc(r.version)}</b> ${esc(res(r.result)[1])}<br>${hm(r.queued)} UTC · ${esc(short(r.agent))}${r.push_to_served_s != null ? `<br>push to served ${r.push_to_served_s} s` : ''}">${r.result === 'failure' ? '×' : ''}</button>`).join('')}</span></div>`).join('')}</div>` }
            const gateMax = P.gate.last_20_max_s, gateB = P.gate.budget_s || 5, gateCls = gateMax >= gateB ? 'warn' : ''
            // push-to-served over time: a dot per served run
            const pts = runs.filter(r => r.push_to_served_s != null), W = 900, H = 220, L = 44, R = 12, T = 12, B = 28
            const t0 = pts.length ? +new Date(pts[0].queued) : 0, t1 = pts.length ? +new Date(pts.at(-1).queued) : 1, cap = 90, x = t => L + (W - L - R) * ((+new Date(t) - t0) / Math.max(1, t1 - t0)), y = v => T + (H - T - B) * (1 - Math.min(v, cap) / cap)
            const ticks = []; for (let t = Math.ceil(t0 / 36e5) * 36e5; t <= t1; t += 36e5) ticks.push(t)
            const chart = pts.length ? `<svg class="wx-chart ci-chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Push to served, in seconds, for each of ${pts.length} served runs; the table below holds the same figures">
${[0, 30, 60, 90].map(v => `<line class="g" x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}"/><text class="ax" x="${L - 6}" y="${y(v) + 4}" text-anchor="end">${v === 90 ? '90+' : v} s</text>`).join('')}
${ticks.map(t => `<line class="g v" x1="${x(t)}" x2="${x(t)}" y1="${T}" y2="${H - B}"/><text class="ax" x="${x(t)}" y="${H - 8}" text-anchor="middle">${hm(t)}</text>`).join('')}
<line class="med" x1="${L}" x2="${W - R}" y1="${y(P.push_to_served_s.median)}" y2="${y(P.push_to_served_s.median)}"/><text class="ax medl" x="${W - R}" y="${y(P.push_to_served_s.median) - 5}" text-anchor="end">median ${P.push_to_served_s.median} s</text>
${pts.map(r => `<circle class="pt${r.push_to_served_s > cap ? ' over' : ''}" tabindex="0" cx="${x(r.queued).toFixed(1)}" cy="${y(r.push_to_served_s).toFixed(1)}" r="4" data-run="${r.run}" data-tip="<b>${r.push_to_served_s} s</b> push to served<br>${esc(r.version)} · ${hm(r.queued)} UTC · ${esc(short(r.agent))}"/>`).join('')}</svg>` : '<p class="meta">No served run with a measure yet.</p>'
            const stepMax = Math.max(...P.steps.map(s => s.p90_s), 1)
            root.innerHTML = nav + `
<div class="wx-tiles">
${tile('The last run', last ? `${esc(last.version)} ${chip(last.result)}` : 'none', last ? `${esc(short(last.agent))}, queued ${hm(last.queued)} UTC (${ago(last.queued)})` : '')}
${tile('Push to served', `${P.push_to_served_s.median} s <small>median</small>`, `90% within ${P.push_to_served_s.p90} s; longest ${dur(P.push_to_served_s.max)}. ${P.push_to_served_s.runs} runs that measured themselves on the live site.`)}
${tile('The gate', `${P.gate.last_20_median_s} s <small>median, last 20</small>`, `longest ${gateMax} s of a ${gateB} s budget${gateMax >= gateB ? ': at the budget' : ''}. Whole seconds as GitHub timed the step.`, gateCls)}
${tile('Waiting for a runner', `${P.queue.last_20_median_s} s <small>median, last 20</small>`, `longest ${dur(P.queue.last_20_max_s)}. Only the newest waiting push is kept: an older one is replaced.`)}
${tile('Runs so far', `${runs.length}`, Object.entries(ix.totals.by_result).map(([k, n]) => `${n} ${esc(res(k)[1])}`).join(', ') + `. ${ix.totals.tags} version tags.`)}
</div>
<p class="prov ci-src">${prov('index.json', ix.updated, 'data/ci/index.json')} · ${live ? `the newest runs live from <a href="https://api.github.com/repos/${REPO}/actions/runs?per_page=20">GitHub's API</a>, read ${hms(live.at)} UTC` : 'GitHub\'s live API not read yet: the snapshot only'}</p>

<section class="card"><h2>The pipeline: one job, eight steps</h2>
<p class="meta">A push to <code>dev</code> starts one job. The figures under each step are its median and 90th-percentile seconds over ${P.steps[0]?.runs || 0} served runs. The gate must print OK or nothing is deployed; the version is CI's own number, never committed.</p>
<div class="wx-scroll" tabindex="0"><ol class="ci-pipe">
<li class="src"><b>push</b><span>an agent's <code>release.sh</code>: rebase, the gate locally, push</span></li>
<li class="src"><b>queued</b><span>${P.queue.last_20_median_s} s median for a runner; newest waiting push wins</span></li>
${P.steps.filter(s => s.step !== 'set up' && s.step !== 'version').map(s => `<li class="${s.step === P.slowest_step?.step ? 'slow' : ''}"><b>${esc(s.step)}</b><i>${s.median_s} s</i><span>${{ checkout: 'one commit (depth 1)', gate: 'build once, then check: size, secrets, JSON, twins, links', upload: 'the built site as one artifact', deploy: 'GitHub Pages', tag: `v${esc(ix.series)}.&lt;run&gt; pushed as a tag`, measure: 'read version.json on the live site until it is this version' }[s.step] || ''}</span><small>90%: ${s.p90_s} s · longest ${dur(s.max_s)}</small>${s.step === P.slowest_step?.step ? '<em>the slowest step</em>' : ''}</li>`).join('')}
<li class="end"><b>served</b><i>${P.push_to_served_s.median} s</i><span>from the push to the live site answering with the new version</span></li></ol></div>
<div class="ci-steps">${P.steps.map(s => `<div class="ci-step"><span class="n">${esc(s.step)}</span><span class="track"><span class="bar" style="width:${(s.median_s / stepMax * 100).toFixed(1)}%"></span><span class="p90" style="left:${(s.p90_s / stepMax * 100).toFixed(1)}%" title="90%"></span></span><span class="v">${s.median_s} s <small>90%: ${s.p90_s} s</small></span></div>`).join('')}<p class="meta">Bar: the median. Tick: 90% of runs were at or under it. ${prov('index.json', ix.updated, 'pipeline.steps')}</p></div></section>

<section class="card"><h2>Every run, hour by hour</h2>
<p class="wx-legend ci-legend"><span><i class="ci-cell ok"></i> served</span><span><i class="ci-cell skip"></i> replaced by a newer push (never ran to the end)</span><span><i class="ci-cell bad">×</i> failed</span><span><i class="ci-cell run"></i> running or waiting</span> <span class="meta">Press a run for its steps.</span></p>
<div class="ci-strip">${strip(day)}${days.filter(d => d !== day).reverse().map(strip).join('')}</div>
<div id="ci-run" class="ci-detail" aria-live="polite"></div></section>

<section class="card"><h2>Push to served, run by run</h2>
<p class="meta">Each dot is a served run: the seconds from the push to the live site answering with that version, as the run itself measured. Dots on the top line took 90 s or more.</p>
<div class="wx-scroll" tabindex="0">${chart}</div>
<details class="wx-table"><summary>The same as a table (${pts.length} runs, newest first)</summary><table><thead><tr><th>Version</th><th>Queued (UTC)</th><th>Agent</th><th>Push to served</th><th>Gate</th><th>Deploy</th></tr></thead><tbody>${pts.slice().reverse().map(r => `<tr><td><a href="${esc(r.url)}">${esc(r.version)}</a></td><td>${dm(r.queued)} ${hms(r.queued)}</td><td>${esc(short(r.agent))}</td><td>${r.push_to_served_s} s</td><td>${r.steps?.find(s => s.step === 'gate')?.s ?? ''} s</td><td>${r.steps?.find(s => s.step === 'deploy')?.s ?? ''} s</td></tr>`).join('')}</tbody></table></details></section>

<section class="card"><h2>Failures, with their reason</h2>
${P.failures.length ? `<ul class="feed ci-fail">${P.failures.slice().reverse().map(f => `<li><span class="when">${when(f.at)}<small>${dm(f.at)}</small></span><div>${chip('failure')} <b>run ${f.run}</b> at <b>${esc(f.failed_step || 'a step not recorded')}</b>, pushed by ${esc(f.agent)}<br><span class="meta">${esc(f.reason)}</span> <span class="prov"><a href="${esc(f.url)}">the run</a></span></div></li>`).join('')}</ul>` : '<p class="meta">None.</p>'}
<p class="meta">${P.failures.length} of ${runs.length} runs failed. A replaced run is not a failure: the newer push carries the whole tree, so nothing is lost.</p></section>

<section class="card"><h2>The last runs</h2><div class="wx-scroll" tabindex="0"><table class="ci-table"><thead><tr><th>Version</th><th>Result</th><th>Queued</th><th>Agent</th><th>What</th><th>Push to served</th></tr></thead><tbody>
${runs.slice(-15).reverse().map(r => `<tr><td><a href="${esc(r.url || WEB + '/actions')}">${esc(r.version)}</a></td><td>${chip(r.result)}</td><td>${hms(r.queued)}</td><td>${esc(short(r.agent))}</td><td>${esc(r.what || '')}</td><td>${r.push_to_served_s != null ? r.push_to_served_s + ' s' : ''}</td></tr>`).join('')}</tbody></table></div>
<p class="meta">The files: ${ix.files.runs.map(f => `<a href="${D}${f.file}">${esc(f.file)}</a> (${f.count})`).join(', ')}.</p></section>`
            tips(root)
            const open = n => { const r = byRun.get(Number(n)); if (!r) return; root.querySelector('#ci-run').innerHTML = `<h3>${esc(r.version)}</h3>${runHtml(r)}`; panel('Run ' + r.version, runHtml(r)) }
            root.querySelectorAll('[data-run]').forEach(b => { b.addEventListener('click', () => open(b.dataset.run)); b.addEventListener('keydown', e => { if (e.key === 'Enter') open(b.dataset.run) }) })
        }
        draw()
        // as it happens: the newest runs from GitHub's public API (60 calls an hour per address without a login, so every 90 s and only while the page is visible)
        const poll = async () => {
            if (document.hidden) return
            try {
                const r = await fetch(`https://api.github.com/repos/${REPO}/actions/runs?per_page=20`, { headers: { accept: 'application/vnd.github+json' } }); if (!r.ok) return
                const j = await r.json()
                live = { at: new Date().toISOString(), runs: j.workflow_runs.map(w => ({ run: w.run_number, id: w.id, version: `v${ix.series}.${w.run_number}`, sha: w.head_sha, agent: (w.display_title.match(/^([\w.-]+@[\w.-]+):/) || [])[1] || '', what: w.display_title.replace(/^[^:\s]+@[^:\s]+:\s*/, ''), pushed: w.head_commit?.timestamp, queued: w.created_at, ended: w.status === 'completed' ? w.updated_at : null, result: w.status === 'completed' ? w.conclusion : w.status === 'in_progress' ? 'in progress' : 'queued', url: w.html_url })) }
                draw()
            } catch { }
        }
        poll(); setInterval(poll, 90000)
    }

    // ------------------------------------------------------------ every commit
    async function commitsView() {
        const ix = await get('index.json'), all = (await loadDays(ix, 'commits')).reverse()
        const agents = [...new Set(all.map(c => c.agent))].sort(), folders = ix.folders, hours = [...new Set(all.map(c => c.at.slice(0, 13)))]
        const p = params()
        root.innerHTML = nav + `<form class="ci-filters" id="ci-f" role="search"><label>Agent <select name="agent"><option value="">all ${agents.length}</option>${agents.map(a => `<option value="${esc(short(a))}">${esc(short(a))}</option>`).join('')}</select></label>
<label>Folder <select name="folder"><option value="">any</option>${folders.map(f => `<option>${esc(f)}</option>`).join('')}</select></label>
<label>Hour (UTC) <select name="hour"><option value="">any</option>${hours.map(h => `<option value="${h}">${dm(h + ':00Z')} ${h.slice(11)}:00</option>`).join('')}</select></label>
<label>For <select name="to"><option value="">anyone</option>${[...new Set(all.flatMap(c => c.to.map(short)))].sort().map(a => `<option>${esc(a)}</option>`).join('')}</select></label>
<label class="grow">Words, a path or a sha <input name="q" type="search" autocomplete="off"></label>
<label class="chk"><input type="checkbox" name="outside" value="1"> outside its own paths</label></form>
<p class="meta" id="ci-count" aria-live="polite"></p><ol class="ci-commits" id="ci-list"></ol>
<p class="meta">${prov('index.json', ix.updated, 'data/ci/index.json')} · the day files: ${ix.files.commits.map(f => `<a href="${D}${f.file}">${esc(f.file)}</a> (${f.count})`).join(', ')}. Hours are UTC. An agent is named by its <code>Agent:</code> trailer, a line of text in the commit; what is and is not signed: <a href="${BASE}ci/signing.html">signatures</a>.</p>`
        const form = root.querySelector('#ci-f'), list = root.querySelector('#ci-list'), countEl = root.querySelector('#ci-count')
        for (const [k, v] of Object.entries(p)) { const el = form.elements[k]; if (el) el.type === 'checkbox' ? el.checked = !!v : el.value = v }
        const sigTxt = c => c.sig.kind === 'none' ? 'no signature' : `${c.sig.kind.toUpperCase()} signature${c.sig.github ? c.sig.github.verified ? ', GitHub: verified' : ', GitHub: not verified (' + esc(c.sig.github.reason) + ')' : ''}${c.sig.key ? `, the hosting service's key (not the agent's own)` : ''}`
        const detail = c => `<div class="ci-open"><dl class="kv ci-kv">
<dt>Commit</dt><dd><a href="${commitUrl(c.sha)}"><code>${esc(c.sha)}</code></a> · ${dm(c.at)} ${hms(c.at)} UTC</dd>
<dt>Agent</dt><dd>${esc(c.agent || 'not stated')} <span class="meta">(${esc(c.agent_from)})</span>${c.issue ? ` · issue ${esc(c.issue)}` : ''}${c.to.length ? ` · for ${c.to.map(t => `<a href="#to=${esc(short(t))}">${esc(short(t))}</a>`).join(', ')}` : ''}</dd>
<dt>Signature</dt><dd>${sigTxt(c)} <a class="prov" href="${BASE}ci/signing.html">what this proves</a></dd>
<dt>Its run</dt><dd>${c.run ? `run ${c.run.run} ${chip(c.run.result)}` : 'no run of its own (pushed together with a later commit)'}</dd>
<dt>Served</dt><dd>${c.served ? `in <b>${esc(c.served.version)}</b> at ${hms(c.served.at)} UTC, ${dur(c.served.lag_s)} after the commit${c.served.with_its_own_run ? '' : ' (by a later push\'s run)'} · <a href="${WEB}/actions/workflows/deploy.yml?query=${encodeURIComponent('branch:dev')}">runs</a>` : 'not yet served by a successful run when this was read'}</dd>
<dt>Files (${c.n_files})</dt><dd><ul class="ci-files">${c.files.map(f => `<li><a href="${WEB}/blob/${c.sha}/${f.split('/').map(encodeURIComponent).join('/')}"><code>${esc(f)}</code></a>${(c.outside || []).some(o => o.path === f) ? ` <span class="ci-res warn">not its own path${(c.outside.find(o => o.path === f).owners || []).length ? ': ' + esc(c.outside.find(o => o.path === f).owners.map(short).join(', ')) + '\'s' : ''}</span>` : ''}</li>`).join('')}${c.files_more ? `<li class="meta">and ${c.files_more} more: <a href="${commitUrl(c.sha)}">the whole commit</a></li>` : ''}</ul></dd></dl></div>`
        const draw = () => {
            const f = Object.fromEntries(new FormData(form)), q = (f.q || '').toLowerCase().trim()
            setParams(f)
            const rows = all.filter(c => (!f.agent || short(c.agent) === f.agent) && (!f.folder || c.folders[f.folder]) && (!f.hour || c.at.startsWith(f.hour)) && (!f.to || c.to.some(t => short(t) === f.to)) && (!f.outside || c.outside_n) && (!q || c.sha.startsWith(q) || (c.what + ' ' + c.agent + ' ' + c.files.join(' ')).toLowerCase().includes(q)))
            countEl.textContent = `${rows.length} of ${all.length} commits, newest first. Press one for its files, its signature and the version that served it.`
            let day = ''
            list.innerHTML = rows.slice(0, 400).map(c => { const d = c.at.slice(0, 10), head = d !== day ? `<li class="ci-dayhead">${dm(c.at)}</li>` : ''; day = d
                return `${head}<li class="ci-commit" id="c-${c.sha.slice(0, 10)}"><button type="button" class="ci-row" aria-expanded="false" data-sha="${c.sha}"><span class="t">${hm(c.at)}</span><span class="a">${esc(short(c.agent))}</span><span class="w">${esc(c.what)}</span><span class="f">${Object.entries(c.folders).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([k, n]) => `<i>${esc(k)} ${n}</i>`).join('')}${c.outside_n ? '<i class="warn">outside own paths</i>' : ''}</span><span class="s">${c.served ? esc(c.served.version) : c.run ? esc(res(c.run.result)[1]) : ''}</span></button></li>` }).join('') + (rows.length > 400 ? `<li class="meta">${rows.length - 400} older commits not shown: narrow the filters.</li>` : '')
        }
        form.addEventListener('input', draw); form.addEventListener('submit', e => e.preventDefault())
        list.addEventListener('click', e => { const b = e.target.closest('.ci-row'); if (!b) return; const li = b.parentElement, open = li.querySelector('.ci-open'); if (open) { open.remove(); b.setAttribute('aria-expanded', 'false'); return } const c = all.find(x => x.sha === b.dataset.sha); li.insertAdjacentHTML('beforeend', detail(c)); b.setAttribute('aria-expanded', 'true'); panel(short(c.agent) + ': ' + c.what.slice(0, 60), detail(c)) })
        addEventListener('hashchange', () => { const p2 = params(); for (const el of form.elements) if (el.name) el.type === 'checkbox' ? el.checked = !!p2[el.name] : el.value = p2[el.name] || ''; draw() })
        draw()
        if (p.q && list.querySelectorAll('.ci-row').length === 1) list.querySelector('.ci-row').click()
    }

    // ------------------------------------------------------------ collaboration
    async function collaboration() {
        const ix = await get('index.json'), tree = await get('tree.json')
        const folders = ix.folders.slice().sort((a, b) => ix.agents.reduce((n, x) => n + (x.folders[b] || 0), 0) - ix.agents.reduce((n, x) => n + (x.folders[a] || 0), 0))
        const max = Math.max(...ix.agents.flatMap(a => Object.values(a.folders)))
                // hand-offs as a flow: who writes For: whom, the band's width is the number of commits
        const H = ix.handoffs, from = [...new Set(H.map(h => h.from))], to = [...new Set(H.map(h => h.to))]
        const tot = (list, k) => Object.fromEntries(list.map(n => [n, H.filter(h => h[k] === n).reduce((s, h) => s + h.n, 0)]))
        const fT = tot(from, 'from'), tT = tot(to, 'to'); from.sort((a, b) => fT[b] - fT[a]); to.sort((a, b) => tT[b] - tT[a])
        const total = H.reduce((s, h) => s + h.n, 0), gap = 14, W = 900, colW = 14, LX = 190, RX = W - 190
        const unit = Math.max(1.6, Math.min(5, 520 / (total + 1))), hgt = list => list.length * gap + total * unit, HH = Math.max(hgt(from), hgt(to)) + 16
        const lay = (list, T) => { let y = 8; const o = {}; for (const n of list) { o[n] = { y, h: T[n] * unit, used: 0 }; y += T[n] * unit + gap } return o }
        const fy = lay(from, fT), ty = lay(to, tT)
        const bands = H.slice().sort((a, b) => from.indexOf(a.from) - from.indexOf(b.from) || to.indexOf(a.to) - to.indexOf(b.to)).map(h => { const a = fy[h.from], b = ty[h.to], w = h.n * unit, y1 = a.y + a.used + w / 2, y2 = b.y + b.used + w / 2; a.used += w; b.used += w; const mx = (LX + RX) / 2
            return `<path class="band" tabindex="0" d="M${LX + colW} ${y1.toFixed(1)} C${mx} ${y1.toFixed(1)} ${mx} ${y2.toFixed(1)} ${RX} ${y2.toFixed(1)}" stroke-width="${Math.max(1, w - 1).toFixed(1)}" data-tip="<b>${esc(short(h.from))}</b> for <b>${esc(short(h.to))}</b>: ${h.n} commit${h.n > 1 ? 's' : ''}<br>first ${hm(h.first)}, last ${hm(h.last)} UTC ${dm(h.last)}"/>` }).join('')
        const flow = `<svg class="wx-chart ci-flow" viewBox="0 0 ${W} ${HH}" role="img" aria-label="Hand-offs: ${H.length} pairs of agents, ${total} For: trailers; the table below holds the same figures">${bands}
${from.map(n => `<rect class="node" x="${LX}" y="${fy[n].y}" width="${colW}" height="${Math.max(2, fy[n].h)}"/><text class="lab" x="${LX - 8}" y="${fy[n].y + fy[n].h / 2 + 4}" text-anchor="end">${esc(short(n))} <tspan class="num">${fT[n]}</tspan></text>`).join('')}
${to.map(n => `<rect class="node" x="${RX}" y="${ty[n].y}" width="${colW}" height="${Math.max(2, ty[n].h)}"/><text class="lab" x="${RX + colW + 8}" y="${ty[n].y + ty[n].h / 2 + 4}"><tspan class="num">${tT[n]}</tspan> ${esc(short(n))}</text>`).join('')}</svg>`
        root.innerHTML = nav + `
<div class="wx-tiles">${tile('Agents that have pushed', ix.agents.filter(a => a.agent !== 'not stated').length, `${ix.totals.commits} commits since ${dm(ix.totals.first_commit)} ${hm(ix.totals.first_commit)} UTC; ${ix.agent_keys ?? ix.signing.agent_keys_published} have published a key`)}
${tile('Hand-offs', total, `<code>For:</code> trailers between ${H.length} pairs of agents`)}
${tile('Changes outside an agent\'s own paths', ix.agents.reduce((n, a) => n + a.outside, 0), `files, in ${ix.cross_folder.reduce((n, c) => n + c.commits, 0)} commit-and-owner pairs; and ${ix.agents.reduce((n, a) => n + a.shared, 0)} in paths the policy marks shared`)}</div>
<p class="prov ci-src">${prov('index.json', ix.updated, 'data/ci/index.json')} · the policy: <a href="${BASE}agents/policy.json">agents/policy.json</a>, as it is today</p>

<section class="card"><h2>Who pushes where</h2>
<p class="meta">Files changed, by agent (rows) and top-level folder (columns), over every commit on <code>dev</code>. A darker cell is more files; the number is the count. A cell with a dashed edge holds changes to paths that are not that agent's own under the policy. Press an agent or a cell for its commits.</p>
<div class="wx-scroll" tabindex="0"><table class="ci-matrix"><thead><tr><th>Agent</th><th class="num">Commits</th>${folders.map(f => `<th class="col"><span>${esc(f)}</span></th>`).join('')}</tr></thead><tbody>
${ix.agents.map(a => `<tr><th><a href="${BASE}ci/commits.html#agent=${esc(a.agent)}">${esc(short(a.agent))}</a></th><td class="num">${a.commits}</td>${folders.map(f => { const n = a.folders[f] || 0, own = !(a.outside_folders || {})[f]; return n ? `<td class="cell${own ? '' : ' out'}" style="--v:${(0.12 + 0.78 * Math.sqrt(n / max)).toFixed(2)}"><a href="${BASE}ci/commits.html#agent=${esc(a.agent)}&folder=${encodeURIComponent(f)}" data-tip="<b>${esc(short(a.agent))}</b> in <b>${esc(f)}</b>: ${n} file change${n > 1 ? 's' : ''}${own ? '' : `<br>${a.outside_folders[f]} outside its own paths`}">${n}</a></td>` : '<td class="cell z"></td>' }).join('')}</tr>`).join('')}</tbody></table></div></section>

<section class="card"><h2>Hand-offs: who writes for whom</h2>
<p class="meta">A commit can carry <code>For: &lt;agent&gt;</code>: this work is addressed to that agent. Left, the agent that committed; right, the agent it was for; a band's width is the number of commits. Most bands end at the conductor, which routes Dinis's direction and integrates.</p>
<div class="wx-scroll" tabindex="0">${flow}</div>
<details class="wx-table"><summary>The same as a table (${H.length} pairs)</summary><table><thead><tr><th>From</th><th>For</th><th>Commits</th><th>First (UTC)</th><th>Last (UTC)</th></tr></thead><tbody>${H.map(h => `<tr><td>${esc(short(h.from))}</td><td><a href="${BASE}ci/commits.html#agent=${esc(h.from)}&to=${esc(h.to)}">${esc(short(h.to))}</a></td><td>${h.n}</td><td>${dm(h.first)} ${hm(h.first)}</td><td>${dm(h.last)} ${hm(h.last)}</td></tr>`).join('')}</tbody></table></details></section>

<section class="card"><h2>Changes outside an agent's own paths</h2>
<p class="meta">Each agent has paths of its own in the policy. A change elsewhere is not forbidden (the conductor integrates across folders; some paths are shared by agreement): it is shown so that it is never silent. Judged against the policy as it is today, so a path given to a new owner later counts against earlier commits too.</p>
${ix.cross_folder.length ? `<div class="wx-scroll" tabindex="0"><table class="ci-table"><thead><tr><th>Changed by</th><th>The path's owner</th><th>Files</th><th>Commits</th><th>For example</th></tr></thead><tbody>${ix.cross_folder.map(c => `<tr><td><a href="${BASE}ci/commits.html#agent=${esc(c.by)}&outside=1">${esc(short(c.by))}</a></td><td>${esc(short(c.owner))}</td><td>${c.paths}</td><td>${c.commits}</td><td><code>${esc(c.example)}</code></td></tr>`).join('')}</tbody></table></div>` : '<p class="meta">None recorded.</p>'}</section>

<section class="card"><h2>The workflow, in words</h2><ol class="ci-how"><li><b>Dinis instructs</b>; the conductor writes his words into the brief and routes jobs to agents (<a href="${BASE}agents/JOBS.html">Jobs</a>).</li><li><b>Each agent works in its own folders</b> (<a href="${BASE}agents/policy.json">the path policy</a>) and commits with its name, the issue and who the work is for.</li><li><b><code>release.sh</code></b> rebases on <code>dev</code>, runs the gate and the policy check on the agent's machine, and pushes. Nobody pushes to <code>main</code>.</li><li><b>CI</b> builds once, gates, deploys, numbers the release and measures push to served (<a href="${BASE}ci/index.html">the pipeline</a>).</li><li><b>The next agent reads</b> the commit addressed to it and carries on. Every step is a commit anyone can read (<a href="${BASE}ci/commits.html">every commit</a>).</li></ol></section>`
        tips(root)
    }

    // ------------------------------------------------------------ the repository as a map
    function squarify(items, x, y, w, h, out = []) {   // items: [{v}], sorted descending; a plain squarified treemap
        if (!items.length) return out
        const total = items.reduce((s, i) => s + i.v, 0), horiz = w >= h, side = horiz ? h : w
        let row = [], best = Infinity, sum = 0
        const worst = (r, s) => { const len = s / total * (horiz ? w : h); return Math.max(...r.map(i => { const a = i.v / s * side; return Math.max(len / a, a / len) })) }
        for (const it of items) { const s2 = sum + it.v, wv = worst([...row, it], s2); if (row.length && wv > best) break; row.push(it); sum = s2; best = wv }
        const len = sum / total * (horiz ? w : h); let off = 0
        for (const it of row) { const a = it.v / sum * side; out.push(horiz ? { ...it, x, y: y + off, w: len, h: a } : { ...it, x: x + off, y, w: a, h: len }); off += a }
        return squarify(items.slice(row.length), horiz ? x + len : x, horiz ? y : y + len, horiz ? w - len : w, horiz ? h : h - len, out)
    }
    async function repository() {
        const ix = await get('index.json'), tree = await get('tree.json'), T = tree.totals
        const W = 900, H = 460, cells = squarify(tree.folders.map(f => ({ v: Math.max(f.bytes, T.bytes / 400), f })), 0, 0, W, H)
        const own = f => f.owners.slice(0, 2).map(o => short(o.agent)).join(', ') + (f.owners.length > 2 ? ` +${f.owners.length - 2}` : '')
        const folderHtml = f => `<dl class="kv ci-kv"><dt>Holds</dt><dd>${f.files} files, ${kb(f.bytes)} · ${Object.entries(f.kinds || {}).sort((a, b) => b[1] - a[1]).map(([k, n]) => `${n} .${esc(k)}`).join(', ')}</dd>
<dt>Owners</dt><dd>${f.owners.map(o => `${esc(short(o.agent))} (${o.files} files)`).join(', ')}</dd>
${f.largest ? `<dt>Largest file</dt><dd><code>${esc(f.largest.path)}</code>, ${kb(f.largest.bytes)}</dd>` : ''}
${f.last_change ? `<dt>Last change</dt><dd>${dm(f.last_change.at)} ${hm(f.last_change.at)} UTC by ${esc(f.last_change.agent)} (<a href="${BASE}ci/commits.html#q=${esc(f.last_change.sha)}"><code>${esc(f.last_change.sha)}</code></a>)</dd>` : ''}
${f.children?.length ? `<dt>Inside</dt><dd><ul class="ci-files">${f.children.map(c => `<li><code>${esc(c.folder)}</code> ${c.files} files, ${kb(c.bytes)} · ${c.owners.map(o => esc(short(o.agent))).join(', ')}</li>`).join('')}</ul></dd>` : ''}</dl>
<p class="prov"><a href="${WEB}/tree/dev/${f.folder === '(root)' ? '' : esc(f.folder)}">This folder on GitHub</a> · <a href="${BASE}ci/commits.html#folder=${encodeURIComponent(f.folder)}">its commits</a></p>`
        const near = T.nearest_the_limit
        root.innerHTML = nav + `
<div class="wx-tiles">${tile('Tracked files', T.files, `${kb(T.bytes)} in all, at <code>${esc(tree.head.slice(0, 10))}</code>`)}
${tile('The largest file', kb(near[0].bytes), `<code>${esc(near[0].path)}</code>; the gate refuses anything over 256 KB`, near[0].bytes > 230e3 ? 'warn' : '')}
${tile('Files over 200 KB', T.over_200k, 'close to the limit: split them by day or hour, or move the bulk to a vault')}
${tile('Top-level folders', tree.folders.length, `${ix.totals.commits} commits, ${ix.totals.tags} version tags, one branch for work (<code>dev</code>)`)}</div>
<p class="prov ci-src">${prov('tree.json', tree.updated, 'data/ci/tree.json')} · sizes are the files as tracked, not the built site</p>

<section class="card"><h2>The tree as a map</h2><p class="meta">Each box is a top-level folder; its area is its bytes in git. Under the name: its files, its size, and who owns its paths in the policy. Press a box to open it.</p>
<div class="ci-map" style="aspect-ratio:${W}/${H}">${cells.map(c => `<button type="button" class="ci-box${c.w / W < .09 || c.h / H < .12 ? ' small' : ''}" style="left:${(c.x / W * 100).toFixed(2)}%;top:${(c.y / H * 100).toFixed(2)}%;width:${(c.w / W * 100).toFixed(2)}%;height:${(c.h / H * 100).toFixed(2)}%" data-folder="${esc(c.f.folder)}" data-tip="<b>${esc(c.f.folder)}</b> ${c.f.files} files, ${kb(c.f.bytes)}<br>${esc(own(c.f))}"><b>${esc(c.f.folder)}</b><span>${c.f.files} files · ${kb(c.f.bytes)}</span><span class="o">${esc(own(c.f))}</span></button>`).join('')}</div>
<div id="ci-folder" class="ci-detail" aria-live="polite"></div>
<details class="wx-table" open><summary>Every folder as a table</summary><div class="wx-scroll" tabindex="0"><table class="ci-table"><thead><tr><th>Folder</th><th>Files</th><th>Size</th><th>Owners (policy)</th><th>Largest file</th><th>Last change (UTC)</th></tr></thead><tbody>${tree.folders.map(f => `<tr><td><a href="${WEB}/tree/dev/${f.folder === '(root)' ? '' : esc(f.folder)}"><code>${esc(f.folder)}</code></a></td><td>${f.files}</td><td>${kb(f.bytes)}</td><td>${f.owners.map(o => esc(short(o.agent))).join(', ')}</td><td><code>${esc(f.largest.path.split('/').slice(-2).join('/'))}</code> ${kb(f.largest.bytes)}</td><td>${f.last_change ? `${dm(f.last_change.at)} ${hm(f.last_change.at)} ${esc(f.last_change.agent)}` : ''}</td></tr>`).join('')}</tbody></table></div></details></section>

<section class="card"><h2>Nearest the 256 KB limit</h2><p class="meta">The gate fails a push that tracks a file over 256 KB. The line marks the limit.</p>
<div class="ci-steps ci-limit">${near.map(f => `<div class="ci-step"><span class="n" title="${esc(f.path)}"><code>${esc(f.path)}</code></span><span class="track"><span class="bar${f.bytes > 230e3 ? ' hot' : ''}" style="width:${Math.min(100, f.bytes / T.limit_bytes * 100).toFixed(1)}%"></span></span><span class="v">${kb(f.bytes)}${f.bytes > 230e3 ? ' <small>split soon</small>' : ''}</span></div>`).join('')}</div></section>

<div class="grid"><section class="card"><h2>What git holds</h2><ul>${tree.holds.git.map(x => `<li>${esc(x)}</li>`).join('')}</ul><p class="meta">Every markdown file becomes a page with its markdown twin beside it; every JSON is served at its own path.</p></section>
<section class="card"><h2>What git must never hold</h2><ul>${tree.holds.never.map(x => `<li>${esc(x)}</li>`).join('')}</ul><p class="meta">${esc(tree.holds.instead)}. Enforced by <a href="${WEB}/blob/dev/${esc(tree.holds.enforced_by)}">the gate</a>.</p></section></div>`
        tips(root)
        const open = name => { const f = tree.folders.find(x => x.folder === name); if (!f) return; root.querySelector('#ci-folder').innerHTML = `<h3><code>${esc(f.folder)}</code></h3>${folderHtml(f)}`; panel(f.folder, folderHtml(f)) }
        root.querySelectorAll('.ci-box').forEach(b => b.addEventListener('click', () => open(b.dataset.folder)))
    }

    // ------------------------------------------------------------ signatures
    async function signing() {
        const ix = await get('index.json'), S = ix.signing
        root.innerHTML = nav + `<div class="wx-tiles">
${tile('Commits with a signature', `${S.commits.with_a_signature} of ${S.commits.total}`, `GitHub marks ${S.commits.github_verified} Verified. Made by ${S.commits.keys.length} SSH key${S.commits.keys.length === 1 ? '' : 's'}: the hosting service's, the same for every agent.`)}
${tile('Signed with an agent\'s own key', '0', `${S.agent_keys_published} agents publish a key in <a href="${BASE}data/keys.json">data/keys.json</a>; none has signed a commit, a tag or a release with it.`, 'warn')}
${tile('Version tags', `${S.tags.total}`, `${S.tags.lightweight} lightweight (a name for a commit), ${S.tags.annotated} annotated, <b>${S.tags.signed} signed</b>. GitHub releases: ${S.releases.github_releases ?? 'not read'}.`)}
${tile('Who a commit says it is by', `${S.agent_named_by['Agent: trailer'] || 0} of ${S.commits.total}`, 'carry an <code>Agent:</code> trailer: a line of text, not a proof. ' + (S.agent_named_by['not stated'] ? `${S.agent_named_by['not stated']} names no agent.` : ''))}</div>
<p class="prov ci-src">${prov('index.json', ix.updated, 'data/ci/index.json, signing')}</p>
<section class="card"><h2>The keys that signed</h2><div class="wx-scroll" tabindex="0"><table class="ci-table"><thead><tr><th>Key (SSH fingerprint)</th><th>Commits</th><th>Whose</th></tr></thead><tbody>${S.commits.keys.map(k => `<tr><td><code>${esc(k.key)}</code></td><td>${k.commits}</td><td>the hosting service the agents' sessions run in; not in data/keys.json</td></tr>`).join('')}${S.commits.kinds.pgp ? `<tr><td>a PGP signature</td><td>${S.commits.kinds.pgp}</td><td>GitHub's own key, on a commit made in GitHub's web page</td></tr>` : ''}</tbody></table></div></section>`
    }

    ({ pipeline, commits: commitsView, collaboration, repository, signing })[VIEW]().catch(fail)
})()
