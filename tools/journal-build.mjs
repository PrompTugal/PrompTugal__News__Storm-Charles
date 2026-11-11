#!/usr/bin/env node
// The journal, generated from its pieces (incident.journalist@web-summit.dinis, 11 November 2026, WS-214; Dinis, ~02:50 UTC:
// "meta reporter and meta journalist: reporting on how this project actually occurs and how it actually happened").
//
//   node tools/journal-build.mjs --out _site    for every piece listed in journal/index.json writes, ONLY under <out>/journal/:
//                                               <slug>.md (the tracked page, plus its pictures drawn from the data in the frame's
//                                               mount, the pictures' tables and the list of supports as they resolve now),
//                                               <slug>.resolved.json (every claim with every support resolved) and edition.md
//                                               (the pieces in order, class print-article, for one PDF).
//   node tools/journal-build.mjs --check        resolves every support; exits 1 if one that should resolve does not, or a page
//                                               breaks a house rule (an em-dash, a missing by-line).
//
// A piece is prose (journal/<slug>.md) and its supports as data beside it (journal/<slug>.json), in the discipline of
// stories/grammar.md: claims, each {id, text, supports}. A support is one of:
//   {kind: "commit", sha}                      a commit in incident.ci@'s data (data/ci/commits/*.json)
//   {kind: "run", run}                         a workflow run in data/ci/runs/*.json
//   {kind: "text", file, contains}             a sentence in a tracked file (BRIEF.md, a status file, a page)
//   {kind: "data", file, field, expect}        a field of a JSON file; `expect` is what it said when the sentence was written.
//                                              When the file has moved on, the page says what it says now (a count grows all night)
//   {kind: "board", id}                        a card on the board (board/items/<id>.json)
//   {kind: "page", path}                       a tracked file this site serves
//   {kind: "trace", trace, step}               a step of incident.reporter@'s trace (reporter/traces/<trace>.json)
//   {kind: "none", why}                        nothing on record: the page says "not recorded"
// No dependencies, no network, nothing from git history, no clock in the output (the same inputs give the same bytes).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2), CHECK = args.includes('--check')
const outAt = args.indexOf('--out'), OUT = outAt >= 0 ? path.resolve(args[outAt + 1] || '') : ''
if (!CHECK && (!OUT || OUT === ROOT)) { console.error('journal-build: --out <dir> (not the repository root), or --check'); process.exit(2) }
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
const has = rel => fs.existsSync(path.join(ROOT, rel))
const read = rel => fs.readFileSync(path.join(ROOT, rel), 'utf8')
const cache = {}
const J = rel => cache[rel] ??= (has(rel) ? JSON.parse(read(rel)) : undefined)
const REPO = 'https://github.com/PrompTugal/PrompTugal__News__Storm-Charles'
const short = a => String(a || '').replace('@web-summit.dinis', '@')
const hm = t => String(t).slice(11, 16), dhm = t => `${+String(t).slice(8, 10)} Nov ${hm(t)}`

// ---------------------------------------------------------------- the run data (incident.ci@'s), read once
const dayFiles = dir => has(dir) ? fs.readdirSync(path.join(ROOT, dir)).filter(f => f.endsWith('.json')).sort().map(f => J(`${dir}/${f}`)) : []
const COMMITS = dayFiles('data/ci/commits').flatMap(f => f.commits || []).sort((a, b) => a.at.localeCompare(b.at))
const RUNS = dayFiles('data/ci/runs').flatMap(f => f.runs || []).sort((a, b) => a.run - b.run)
const CI = J('data/ci/index.json') || {}

// ---------------------------------------------------------------- supports
const dig = (obj, field) => String(field).split('.').reduce((o, k) => o == null ? undefined : o[k], obj)
function resolve(s) {
    if (s.kind === 'commit') {
        const c = COMMITS.find(c => c.sha.startsWith(s.sha))
        const url = `${REPO}/commit/${s.sha}`
        if (!c) return { state: 'pending', says: `commit ${s.sha}: later than the run data (read ${hm(CI.updated || '')} UTC); on GitHub`, url }
        return { state: 'ok', says: `commit ${c.sha.slice(0, 7)}, ${dhm(c.at)} UTC, ${short(c.agent) || 'agent not stated'}: ${c.what}${c.served ? ` (first served as ${c.served.version})` : ''}`, url }
    }
    if (s.kind === 'run') {
        const r = RUNS.find(r => r.run === s.run)
        if (!r) return { state: 'pending', says: `run ${s.run}: not in the run data yet` }
        return { state: 'ok', says: `run ${r.run} (${r.version}), pushed ${dhm(r.pushed)} UTC by ${short(r.agent)}: ${r.result}`, url: r.url }
    }
    if (s.kind === 'text') {
        if (!has(s.file)) return { state: 'missing', says: `${s.file}: no such file` }
        const ok = read(s.file).includes(s.contains)
        return { state: ok ? 'ok' : 'missing', says: ok ? `${s.file}: "${s.contains}"` : `${s.file} no longer says "${s.contains}"`, link: s.file }
    }
    if (s.kind === 'data') {
        const j = J(s.file); if (j === undefined) return { state: 'missing', says: `${s.file}: no such file` }
        const v = dig(j, s.field); if (v === undefined) return { state: 'missing', says: `${s.file}: no field ${s.field}` }
        const same = JSON.stringify(v) === JSON.stringify(s.expect)
        return { state: same ? 'ok' : 'moved', says: same ? `${s.file}, ${s.field}: ${JSON.stringify(v)}` : `${s.file}, ${s.field}: ${JSON.stringify(s.expect)} when written; ${JSON.stringify(v)} now${j.updated ? ` (file updated ${dhm(j.updated)} UTC)` : ''}`, link: s.file }
    }
    if (s.kind === 'board') {
        const f = `board/items/${s.id}.json`, j = J(f); if (!j) return { state: 'missing', says: `no card ${s.id} on the board` }
        return { state: 'ok', says: `board card ${j.id}: "${j.title}", ${j.state}, opened ${dhm(j.opened_utc)} UTC${j.waiting_on ? `, waiting on ${j.waiting_on}` : ''}`, link: f }
    }
    if (s.kind === 'page') return has(s.path) ? { state: 'ok', says: `${s.path}: served`, link: s.path } : { state: 'missing', says: `${s.path}: no such file` }
    if (s.kind === 'trace') {
        const f = `reporter/traces/${s.trace}.json`, j = J(f)
        if (!j) return { state: 'untraced', says: `not recorded yet: incident.reporter@'s trace "${s.trace}" does not exist` }
        const step = (j.steps || []).find(x => x.id === s.step || x.n === s.step)
        if (!step) return { state: 'untraced', says: `trace ${s.trace} has no step ${s.step}` }
        const ver = (step.evidence || []).find(e => e.type === 'version'), noEv = !(step.evidence || []).length
        const says = `incident.reporter@'s trace "${s.trace}", step ${step.n}${step.at ? `, ${dhm(step.at)} UTC` : ''}, ${short(step.actor && step.actor.name)}: ${String(step.out || '').slice(0, 160)}${String(step.out || '').length > 160 ? '…' : ''}${step.sha ? ` (commit ${String(step.sha).slice(0, 7)}${step.repo ? ' in ' + step.repo : ''}${ver ? `, served as ${ver.version}` : ''})` : ''}${noEv ? ` [the trace marks this step: no evidence${step.evidence_note ? ': ' + step.evidence_note : ''}]` : ''}`
        return { state: noEv ? 'none' : 'ok', says, link: f, ...(step.sha && !step.repo ? { url: `${REPO}/commit/${step.sha}` } : {}) }
    }
    if (s.kind === 'none') return { state: 'none', says: `not recorded: ${s.why}` }
    return { state: 'missing', says: `unknown kind of support: ${s.kind}` }
}
const WORD = { ok: 'resolves', moved: 'moved on', pending: 'not in the run data yet', untraced: 'not traced yet', none: 'not recorded', missing: 'DOES NOT RESOLVE' }

// ---------------------------------------------------------------- pictures, drawn from the data (SVG, classes only: app/journal/journal.css)
const T = t => Date.parse(t)
// 1. commits per hour, with the moments Dinis gave direction (the piece's own list, each from a BRIEF.md heading)
function figHours(fig) {
    const by = {}; for (const c of COMMITS) { const h = c.at.slice(0, 13); by[h] = (by[h] || 0) + 1 }
    const hours = Object.keys(by).sort(); if (!hours.length) return null
    const all = []; for (let t = T(hours[0] + ':00:00Z'); t <= T(hours.at(-1) + ':00:00Z'); t += 3600e3) all.push(new Date(t).toISOString().slice(0, 13))
    const max = Math.max(...Object.values(by)), W = 720, H = 240, L = 8, B = 24, top = 44, bw = (W - L - 8) / all.length
    const x = t => L + (T(t) - T(all[0] + ':00:00Z')) / 3600e3 * bw, y = n => top + (H - top - B) * (1 - n / max)
    const lastRead = COMMITS.at(-1).at
    let s = `<svg class="jr-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(fig.title)}">`
    all.forEach((h, i) => {
        const n = by[h] || 0, part = h === lastRead.slice(0, 13)
        s += `<rect class="jr-bar${part ? ' part' : ''}" x="${(L + i * bw + 3).toFixed(1)}" y="${y(n).toFixed(1)}" width="${(bw - 6).toFixed(1)}" height="${(H - B - y(n)).toFixed(1)}"/>`
        s += `<text class="jr-n" x="${(L + i * bw + bw / 2).toFixed(1)}" y="${(y(n) - 5).toFixed(1)}" text-anchor="middle">${n}</text>`
        s += `<text class="jr-ax" x="${(L + i * bw + bw / 2).toFixed(1)}" y="${H - B + 15}" text-anchor="middle">${h.slice(11)}:00</text>`
    })
    s += `<line class="jr-axis" x1="${L}" y1="${H - B}" x2="${W - 8}" y2="${H - B}"/>`
    let k = 0
    for (const m of fig.marks || []) if (T(m.at) >= T(all[0] + ":00:00Z") && T(m.at) <= T(lastRead)) { const up = k++ % 2 ? 26 : 14; s += `<line class="jr-mark" x1="${x(m.at).toFixed(1)}" y1="${top - up}" x2="${x(m.at).toFixed(1)}" y2="${H - B}"/><text class="jr-ax" x="${(x(m.at) + 3).toFixed(1)}" y="${top - up + 7}">${esc(hm(m.at))}</text>` }
    s += '</svg>'
    const table = ['| Hour (UTC) | Commits |', '|---|---|', ...all.map(h => `| ${+h.slice(8, 10)} Nov, ${h.slice(11)}:00${h === lastRead.slice(0, 13) ? ` (to ${hm(lastRead)})` : ''} | ${by[h] || 0} |`)].join('\n')
    return { svg: s, table, key: `Commits per hour (UTC). Dashed blue lines: Dinis gives direction, at about the time shown. Outlined bar: the hour was not over when the run data was read (${hm(lastRead)} UTC).` }
}
// 2. one lane per agent: from its first commit to its last, in the order they first pushed
function figLanes(fig) {
    const a = {}; for (const c of COMMITS) if (c.agent) (a[c.agent] ??= { agent: c.agent, first: c.at, n: 0 }, a[c.agent].last = c.at, a[c.agent].n++)
    const rows = Object.values(a).sort((p, q) => p.first.localeCompare(q.first)); if (!rows.length) return null
    const t0 = T(COMMITS[0].at.slice(0, 13) + ':00:00Z'), t1 = T(COMMITS.at(-1).at), W = 720, L = 150, R = 44, rh = 17, top = 22, H = top + rows.length * rh + 6
    const x = t => L + (T(t) - t0) / (t1 - t0) * (W - L - R)
    let s = `<svg class="jr-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(fig.title)}">`
    for (let t = t0; t <= t1; t += 3600e3) { const X = x(new Date(t).toISOString()); s += `<line class="jr-grid" x1="${X.toFixed(1)}" y1="${top - 4}" x2="${X.toFixed(1)}" y2="${H - 4}"/><text class="jr-ax" x="${X.toFixed(1)}" y="${top - 8}" text-anchor="middle">${new Date(t).toISOString().slice(11, 16)}</text>` }
    for (const m of fig.marks || []) if (T(m.at) >= t0 && T(m.at) <= t1) s += `<line class="jr-mark" x1="${x(m.at).toFixed(1)}" y1="${top - 4}" x2="${x(m.at).toFixed(1)}" y2="${H - 4}"/>`
    rows.forEach((r, i) => {
        const y = top + i * rh, x0 = x(r.first), x1 = Math.max(x(r.last), x0 + 3)
        s += `<text class="jr-lab" x="${L - 8}" y="${y + 11}" text-anchor="end">${esc(short(r.agent).replace('incident.', ''))}</text><rect class="jr-lane" x="${x0.toFixed(1)}" y="${y + 3}" width="${(x1 - x0).toFixed(1)}" height="${rh - 7}" rx="2"/><text class="jr-n" x="${(x1 + 5).toFixed(1)}" y="${y + 11}">${r.n}</text>`
    })
    s += '</svg>'
    const table = ['| Agent | First commit (UTC) | Last in the run data | Commits |', '|---|---|---|---|', ...rows.map(r => `| ${short(r.agent)} | ${dhm(r.first)} | ${dhm(r.last)} | ${r.n} |`)].join('\n')
    return { svg: s, table, key: `Each bar: an agent's first commit to its last in the run data (read ${hm(COMMITS.at(-1).at)} UTC), with its number of commits. Dashed blue lines: Dinis gives direction (about).` }
}
// 2b. one row per item of the piece's own list, a dot at the time of the commit that corrected it (the time is the run data's)
function figDots(fig) {
    const rows = (fig.items || []).map(i => ({ ...i, c: COMMITS.find(c => c.sha.startsWith(i.sha)) })).filter(i => i.c).sort((p, q) => p.c.at.localeCompare(q.c.at)); if (!rows.length) return null
    const t0 = T(COMMITS[0].at.slice(0, 13) + ':00:00Z'), t1 = T(COMMITS.at(-1).at), W = 720, L = 250, R = 20, rh = 17, top = 22, H = top + rows.length * rh + 6
    const x = t => L + (T(t) - t0) / (t1 - t0) * (W - L - R)
    let s = `<svg class="jr-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(fig.title)}">`
    for (let t = t0; t <= t1; t += 3600e3) { const X = x(new Date(t).toISOString()); s += `<line class="jr-grid" x1="${X.toFixed(1)}" y1="${top - 4}" x2="${X.toFixed(1)}" y2="${H - 4}"/><text class="jr-ax" x="${X.toFixed(1)}" y="${top - 8}" text-anchor="middle">${new Date(t).toISOString().slice(11, 16)}</text>` }
    rows.forEach((r, i) => { const y = top + i * rh; s += `<text class="jr-lab" x="${L - 10}" y="${y + 11}" text-anchor="end">${esc(r.label)}</text><line class="jr-grid" x1="${L}" y1="${y + 8}" x2="${x(r.c.at).toFixed(1)}" y2="${y + 8}"/><circle class="jr-dot" cx="${x(r.c.at).toFixed(1)}" cy="${y + 8}" r="4.5"/>` })
    s += '</svg>'
    const table = ['| Corrected (UTC) | What | By | Commit |', '|---|---|---|---|', ...rows.map(r => `| ${dhm(r.c.at)} | ${r.label} | ${short(r.c.agent)} | [${r.c.sha.slice(0, 7)}](${REPO}/commit/${r.c.sha}) |`)].join('\n')
    return { svg: s, table, key: 'Each dot: the commit that corrected it, at its time (UTC).' }
}
// 2c. what waits on Dinis: one row per card on the board, from when it was asked to the board's last read
function figWaiting(fig) {
    if (!has('board/items')) return null
    const cards = fs.readdirSync(path.join(ROOT, 'board/items')).filter(f => f.endsWith('.json')).map(f => J('board/items/' + f))
    const read = cards.map(c => c.updated_utc).sort().at(-1)
    const rows = cards.filter(c => c.waiting_on === 'Dinis' && !['done', 'answered'].includes(c.state)).sort((p, q) => p.opened_utc.localeCompare(q.opened_utc) || p.id.localeCompare(q.id)); if (!rows.length) return null
    const t0 = T(rows[0].opened_utc.slice(0, 13) + ':00:00Z'), t1 = T(read), W = 720, L = 330, R = 60, rh = 16, top = 22, H = top + rows.length * rh + 6
    const x = t => L + (T(t) - t0) / (t1 - t0) * (W - L - R), cut = (s, n) => s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s
    const mins = c => Math.floor((t1 - T(c.opened_utc)) / 60e3), dur = m => m >= 60 ? `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, '0')}` : `${m} min`
    let s = `<svg class="jr-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(fig.title)}">`
    for (let t = t0; t <= t1; t += 3600e3) { const X = x(new Date(t).toISOString()); s += `<line class="jr-grid" x1="${X.toFixed(1)}" y1="${top - 4}" x2="${X.toFixed(1)}" y2="${H - 4}"/><text class="jr-ax" x="${X.toFixed(1)}" y="${top - 8}" text-anchor="middle">${new Date(t).toISOString().slice(11, 16)}</text>` }
    rows.forEach((r, i) => { const y = top + i * rh, x0 = x(r.opened_utc), x1 = Math.max(x(read), x0 + 3); s += `<text class="jr-lab" x="${L - 8}" y="${y + 11}" text-anchor="end">${esc(cut(r.title, 44))}</text><rect class="jr-lane${r.kind === 'job' ? ' job' : ''}" x="${x0.toFixed(1)}" y="${y + 3}" width="${(x1 - x0).toFixed(1)}" height="${rh - 7}" rx="2"/><text class="jr-n" x="${(x1 + 5).toFixed(1)}" y="${y + 11}">${dur(mins(r))}</text>` })
    s += '</svg>'
    const table = ['| Asked (UTC) | Waiting when the board was last read | Card | Kind | What it holds up |', '|---|---|---|---|---|', ...rows.map(r => `| ${dhm(r.opened_utc)} | ${dur(mins(r))} | [${r.title.replace(/\|/g, '/')}](../board/items/${r.id}.md) | ${r.kind} | ${(r.blocks || '').replace(/\|/g, '/') || 'not stated on the card'} |`)].join('\n')
    return { svg: s, table, key: `Each bar: a card waiting on Dinis, from the time it was asked to the board's last read (${hm(read)} UTC), with how long that is. Outlined: a job that cannot start until he answers.`, src: '<a href="../board/index.html">the board\'s cards</a>' }
}
// 2d. a trace of incident.reporter@'s as a relay: a lane per actor, a numbered mark per step, at the step's time
function figTrace(fig) {
    const j = J(`reporter/traces/${fig.trace}.json`); if (!j || !(j.steps || []).length) return null
    const steps = j.steps.map((st, i) => ({ ...st, t: st.at || (j.steps.slice(i + 1).find(x => x.at) || {}).at || j.duration.from, approx: !st.at }))
    const actors = [...new Set(steps.map(st => st.actor.name))]
    const t0 = Math.min(...steps.map(st => T(st.t))), t1 = Math.max(...steps.map(st => T(st.t)), T(j.duration.to || steps.at(-1).t)), span = Math.max(t1 - t0, 60e3)
    const W = 720, L = 150, R = 24, rh = 30, top = 26, H = top + actors.length * rh + 8
    const x = t => L + (T(t) - t0) / span * (W - L - R), y = a => top + actors.indexOf(a) * rh + rh / 2
    let s = `<svg class="jr-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(fig.title)}">`
    const tick = span > 40 * 60e3 ? 10 : span > 15 * 60e3 ? 5 : 2
    for (let t = Math.ceil(t0 / (tick * 60e3)) * tick * 60e3; t <= t1; t += tick * 60e3) { const X = x(new Date(t).toISOString()); s += `<line class="jr-grid" x1="${X.toFixed(1)}" y1="${top - 4}" x2="${X.toFixed(1)}" y2="${H - 6}"/><text class="jr-ax" x="${X.toFixed(1)}" y="${top - 8}" text-anchor="middle">${new Date(t).toISOString().slice(11, 16)}</text>` }
    actors.forEach(a => { s += `<text class="jr-lab" x="${L - 12}" y="${y(a) + 4}" text-anchor="end">${esc(short(a).replace('incident.', ''))}</text><line class="jr-grid" x1="${L}" y1="${y(a)}" x2="${W - R}" y2="${y(a)}"/>` })
    s += `<polyline class="jr-path" points="${steps.map(st => `${x(st.t).toFixed(1)},${y(st.actor.name)}`).join(' ')}"/>`
    const used = {}
    steps.forEach(st => { const X = x(st.t), Y = y(st.actor.name), k = `${Math.round(X / 12)}/${Y}`, up = (used[k] = (used[k] || 0) + 1) > 1; s += `<circle class="jr-step${st.actor.kind === 'person' ? ' person' : ''}${!(st.evidence || []).length ? ' noev' : ''}" cx="${X.toFixed(1)}" cy="${Y}" r="5"/><text class="jr-n" x="${X.toFixed(1)}" y="${up ? Y + 17 : Y - 9}" text-anchor="middle">${st.n}</text>` })
    s += '</svg>'
    const ver = st => (st.evidence || []).find(e => e.type === 'version')
    const table = ['| Step | Time (UTC) | Who | What went out | Commit | First served |', '|---|---|---|---|---|---|', ...steps.map(st => `| ${st.n} | ${st.at ? st.at.slice(11, 19) : 'not recorded'} | ${short(st.actor.name)}${st.actor.kind === 'person' ? ' (a person)' : ''} | ${String(st.out || '').replace(/\|/g, '/')}${!(st.evidence || []).length ? ' **No evidence.** ' + String(st.evidence_note || '').replace(/\|/g, '/') : ''} | ${st.sha ? (st.repo ? `${String(st.sha).slice(0, 7)} (another repository)` : `[${String(st.sha).slice(0, 7)}](${REPO}/commit/${st.sha})`) : ''} | ${ver(st) ? `${ver(st).version}${ver(st).push_to_served_s ? `, ${ver(st).push_to_served_s} s after the push` : ''}` : ''} |`)].join('\n')
    return { svg: s, table, key: `A lane for each actor; each numbered mark is a step of the trace at its time (UTC), joined in order. Blue ring: a person. Hollow: the trace has no evidence for the step. A step with no time of its own (a spoken sentence) sits at the commit that records it.`, src: `<a href="../view/index.html?path=reporter/traces/${esc(fig.trace)}.json">incident.reporter@'s trace</a>` }
}
// 3. the figures, recounted at this build from the files named
function figNow() {
    const rows = []
    const add = (what, v, file) => v !== undefined && v !== null && rows.push(`| ${what} | ${v} | [${file}](../view/index.html?path=${file}) |`)
    const t = CI.totals || {}, p = (CI.pipeline || {}).push_to_served_s || {}, pol = J('agents/policy.json'), keys = J('data/keys.json')
    add('Commits on dev', t.commits, 'data/ci/index.json'); add('First commit (UTC)', t.first_commit, 'data/ci/index.json'); add('Last commit in the run data (UTC)', t.last_commit, 'data/ci/index.json')
    add('Workflow runs', t.runs, 'data/ci/index.json')
    if (t.by_result) add('Runs by result', Object.entries(t.by_result).map(([k, v]) => `${v} ${k}`).join(', '), 'data/ci/index.json')
    add('Versions tagged', t.tags, 'data/ci/index.json')
    if (p.median) add('Push to served, seconds', `median ${p.median}, 90th percentile ${p.p90}, slowest ${p.max}, fastest ${p.min} (${p.runs} runs)`, 'data/ci/index.json')
    add('Agents named in at least one commit', new Set(COMMITS.map(c => c.agent).filter(Boolean)).size, 'data/ci/index.json')
    if (pol && pol.agents) add('Agents with a path policy', Object.keys(pol.agents).length, 'agents/policy.json')
    if (keys) add('Public keys published', keys.keys.length, 'data/keys.json')
    if (has('board/items')) { const cards = fs.readdirSync(path.join(ROOT, 'board/items')).filter(f => f.endsWith('.json')).map(f => J('board/items/' + f)); rows.push(`| Cards on the board | ${cards.length} | [board/](../board/index.html) |`, `| Cards waiting on Dinis and not done | ${cards.filter(c => c.waiting_on === 'Dinis' && !['done', 'answered'].includes(c.state)).length} | [board/for-dinis](../board/for-dinis.html) |`) }
    return { table: ['| Figure | Value | Read from |', '|---|---|---|', ...rows].join('\n'), asOf: CI.updated }
}
const DRAW = { 'commits-by-hour': figHours, 'agent-lanes': figLanes, 'commit-dots': figDots, 'waiting-on-dinis': figWaiting, 'trace': figTrace }

// ---------------------------------------------------------------- the pieces
const INDEX = J('journal/index.json') || { pieces: [] }
const problems = [], built = []
const slugOf = h => h.toLowerCase().replace(/<[^>]+>|[^\w\s-]/g, '').trim().replace(/\s+/g, '-')   // the build's own heading ids
for (const p of INDEX.pieces) {
    const mdRel = `journal/${p.slug}.md`, dataRel = `journal/${p.slug}.json`
    if (!has(mdRel) || !has(dataRel)) { problems.push(`${p.slug}: needs both ${mdRel} and ${dataRel}`); continue }
    let md = read(mdRel); const data = J(dataRel)
    if (/—/.test(md)) problems.push(`${mdRel}: an em-dash in prose`)
    if (!/^> Kept by incident\.journalist@web-summit\.dinis, /m.test(md)) problems.push(`${mdRel}: no "Kept by" line`)
    const fmEnd = md.startsWith('---\n') ? md.indexOf('\n---\n', 4) + 5 : 0
    const body = md.slice(fmEnd), title = (body.match(/^# (.+)$/m) || [, p.slug])[1]
    // supports
    const resolved = (data.claims || []).map(c => ({ ...c, supports: (c.supports || []).map(s => ({ ...s, ...resolve(s) })) }))
    for (const c of resolved) {
        if (!c.supports.length) problems.push(`${p.slug}, claim ${c.id}: no support (write {kind: "none", why} if nothing is on record)`)
        for (const s of c.supports) if (s.state === 'missing') problems.push(`${p.slug}, claim ${c.id}: ${s.says}`)
    }
    const count = {}; for (const c of resolved) for (const s of c.supports) count[s.state] = (count[s.state] || 0) + 1
    const cell = s => `${s.url ? `[${s.says.replace(/\|/g, '/')}](${s.url})` : s.link ? `[${s.says.replace(/\|/g, '/').replace(/[\[\]]/g, '')}](../view/index.html?path=${s.link})` : s.says.replace(/\|/g, '/')} *(${WORD[s.state]})*`
    const supportsMd = `## What each statement rests on\n\nResolved again on every build of this site, from the files named (the commits and runs are [incident.ci@'s data](../ci/README.md), read at ${hm(CI.updated || '')} UTC). ${Object.entries(count).map(([k, n]) => `${n} ${WORD[k]}`).join('; ')}. The same as data: [${p.slug}.resolved.json](../view/index.html?path=journal/${p.slug}.resolved.json).\n\n| | Statement | Rests on |\n|---|---|---|\n${resolved.map(c => `| ${c.id} | ${c.text.replace(/\|/g, '/')} | ${c.supports.map(cell).join('<br>').replace(/<br>/g, ' · ')} |`).join('\n')}\n`
    // pictures
    const figs = [], tables = []
    for (const f of data.figures || []) {
        if (f.kind === 'now') { const n = figNow(); tables.push(`### ${f.title}\n\nRecounted when this page was built, from the files in the last column (the run data was read at ${hm(n.asOf || '')} UTC on ${+String(n.asOf || '').slice(8, 10)} November).\n\n${n.table}`); continue }
        const d = DRAW[f.kind] && DRAW[f.kind](f); if (!d) continue
        figs.push(`<figure class="jr-fig" data-piece="${esc(slugOf(title))}" data-after="${esc(f.after || '')}"><div class="jr-scroll" tabindex="0">${d.svg}</div><figcaption><b>${esc(f.title)}.</b> ${esc(d.key)} ${esc(f.caption || '')} Drawn at build time from ${d.src || '<a href="../ci/index.html">incident.ci@\'s run data</a>'}; the same as a table at the foot of the page.</figcaption></figure>`)
        tables.push(`### ${f.title}\n\n${d.table}`)
    }
    const tablesMd = tables.length ? `## The pictures as tables\n\n${tables.join('\n\n')}\n` : ''
    const full = `${body.trimEnd()}\n\n${tablesMd}\n${supportsMd}`
    built.push({ p, title, full, figs, resolved, count })
}
if (CHECK) {
    for (const m of problems) console.log('FAIL ' + m)
    console.log(`journal: ${built.length} piece(s), ${built.reduce((n, b) => n + b.resolved.reduce((m, c) => m + c.supports.length, 0), 0)} supports, ${problems.length} problem(s)`)
    process.exit(problems.length ? 1 : 0)
}
const w = (rel, s) => { const f = path.join(OUT, 'journal', rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, s) }
const HEAD = '<link rel="stylesheet" href="../app/journal/journal.css"><script src="../app/journal/journal.js" defer></script>'
const front = (cls, figs, extra = '') => `---\nclass: ${cls}\n${extra}${figs.length ? `mount: <div class="jr-figs">${figs.join('')}</div>\nhead: ${HEAD}\n` : ''}---\n`
for (const b of built) {
    w(`${b.p.slug}.md`, front('journal', b.figs, `summary: ${String(b.p.standfirst || '').replace(/\n/g, ' ')}\n`) + b.full)
    w(`${b.p.slug}.resolved.json`, JSON.stringify({ about: `Every statement of journal/${b.p.slug}.md with what it rests on, resolved at build time by tools/journal-build.mjs.`, by: 'incident.journalist@web-summit.dinis', updated: (J(`journal/${b.p.slug}.json`) || {}).updated, run_data_read: CI.updated, states: b.count, claims: b.resolved }, null, 1) + '\n')
}
// the printable edition: the pieces in order, one page, class print-article
if (built.length) {
    const demote = s => s.replace(/^(#{1,5}) /gm, '#$1 ')
    const kept = (read(`journal/${built[0].p.slug}.md`).match(/^> Kept by .*$/m) || [''])[0]
    const ed = `# How Storm Charles's site was made: the journal, in one edition\n\n${kept}. The pieces of [the journal](README.md) in order, for printing. Each is also its own page, with its supports.\n\n**Not a warning service.** This is about how the site is built. For the storm follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/).\n\n## Contents\n\n${built.map((b, i) => `${i + 1}. [${b.title}](#${slugOf(b.title)})${b.p.status ? ` (${b.p.status})` : ''}`).join('\n')}\n\n${built.map(b => demote(b.full.replace(/^> Kept by .*\n/m, ''))).join('\n\n---\n\n')}\n`
    w('edition.md', front('print-article', built.flatMap(b => b.figs)) + ed)
}
if (problems.length) console.error(problems.join('\n'))
