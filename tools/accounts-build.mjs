#!/usr/bin/env node
// The books: what this project costs, from what is written down in the repository. Kept by incident.accountant@web-summit.dinis (WS-214).
//   node tools/accounts-build.mjs          (run by the accountant each round; it writes tracked files, so it is NOT a build generator)
// Reads: models/ledger-summary.json (incident.models@: the model ledger's totals), agents/*/status.json (a "spend" another desk
// reports), accounts/ledger/<role>.jsonl (each agent's own measured line, tools/accounts-measure.mjs), data/ci/ (incident.ci@:
// runs and seconds), data/agents/sessions.json (incident.observability@: which agents and sessions exist), data/vaults.json,
// evidence/index.json, stories/, the incident's signals.json, and the tracked files (git ls-files; no history is read).
// Writes: accounts/models.json, agents.json, machine.json, outputs.json, books.json and accounts/index.md.
// Rules: every figure carries its source and one of measured | reported | estimated; a cell with no figure says "not measured";
// nothing is guessed. No prompt or message text, no session address, no name of the model an agent itself runs on.
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const BY = 'incident.accountant@web-summit.dinis'
const NOW = new Date().toISOString().slice(0, 19) + 'Z'
const P = (...p) => path.join(ROOT, ...p)
const J = f => { try { return JSON.parse(fs.readFileSync(P(f), 'utf8')) } catch { return null } }
const W = (f, o) => fs.writeFileSync(P('accounts', f), JSON.stringify({ about: o.about, by: BY, updated: NOW, ...o }, null, 1) + '\n')
const NM = 'not measured'
const n = v => typeof v === 'number' ? v.toLocaleString('en-GB') : v
const usd = v => typeof v === 'number' ? v.toFixed(v < 0.01 ? 4 : 2) : v
const CACHE_READ_WEIGHT = 0.1   // WS-148 (people/indi/accountant/PROMPT.md): "cache reads cost about a tenth of fresh input"
const weighted = t => Math.round(t.fresh_input + t.output + t.cache_writes + t.cache_reads * CACHE_READ_WEIGHT)
const INC = 'incidents/2026-11-10-storm-charles'

// ---- a. model calls through the ledger -------------------------------------------------------------------------------
const LS = J('models/ledger-summary.json') || { days: [], total: {} }
const CAP = { usd_per_day: 20, since: '2026-11-11T02:50Z', before: 5, kind: 'reported', source: 'BRIEF.md, Dinis, 11 November 2026, ~02:50 UTC ("up to $20 in budget")' }
const today = NOW.slice(0, 10)
const day = LS.days.find(d => d.day === today) || LS.days.at(-1) || null
const reported = []
for (const d of (LS.other_desks || [])) reported.push({ agent: `incident.${d.desk}@web-summit.dinis`, day: (d.updated || '').slice(0, 10), cost_usd: d.cost_usd, kind: 'reported', source: d.file, read: d.updated })
for (const role of fs.readdirSync(P('agents')).sort()) {   // a desk that publishes a "spend" object in its own status file and is not already counted
    const s = J(`agents/${role}/status.json`); const sp = s && s.spend
    if (!sp || role === 'models' || reported.some(r => r.agent.includes(`.${role}@`))) continue
    const v = sp.this_agent_usd ?? sp.usd ?? sp.cost_usd; if (typeof v === 'number') reported.push({ agent: `incident.${role}@web-summit.dinis`, day: sp.day || today, cost_usd: v, kind: 'reported', source: `agents/${role}/status.json`, read: s.updated || null })
}
const ledgerToday = day && day.day === today ? day.cost_usd : 0
const reportedToday = reported.filter(r => r.day === today).reduce((s, r) => s + (r.cost_usd || 0), 0)
const spentToday = +(ledgerToday + reportedToday).toFixed(6)
const hours = day ? Object.entries(day.by_hour || {}).map(([h, v]) => ({ hour: h, ...v })).sort((x, y) => y.cost_usd - x.cost_usd) : []
const models = {
    about: 'Model calls of the incident team, in US dollars: the model ledger\'s totals (one line per call through tools/llm.mjs; the cost is the one the provider reported on each call) by agent, task and model, and the spend other desks report from ledgers in their own sessions. The models named are third-party models that were called, the subject of this table, never the model an agent runs on. No prompt or answer text.',
    currency: 'USD', cap: CAP,
    today: { day: today, spent_usd: spentToday, of_cap: +(spentToday / CAP.usd_per_day).toFixed(4), left_usd: +(CAP.usd_per_day - spentToday).toFixed(6), ledger_usd: ledgerToday, reported_by_other_desks_usd: +reportedToday.toFixed(6), kind: 'measured (the ledger) plus reported (other desks)', source: 'models/ledger-summary.json', read: LS.updated || null },
    most_expensive_hour: hours[0] ? { ...hours[0], day: day.day, kind: 'measured', source: 'models/ledger-summary.json by_hour', note: 'the ledger of incident.models@ only; other desks report a day total, not hours' } : NM,
    ledger: { kind: 'measured', source: 'models/ledger-summary.json', read: LS.updated || null, kept_by: LS.by || null, days: LS.days.map(d => ({ day: d.day, calls: d.calls, cost_usd: d.cost_usd, tokens_in: d.tokens_in, tokens_out: d.tokens_out, by_agent: d.by_agent, by_task: d.by_task, by_model: d.by_model, by_status: d.by_status, by_hour: d.by_hour })) },
    reported,
    provider_account: J('accounts/provider.json') ? (({ about, by, updated, ...r }) => ({ ...r, file: 'accounts/provider.json' }))(J('accounts/provider.json')) : NM,
    not_counted: 'A ledger lives in the session that made the calls. A desk whose calls are in neither the ledger summary nor its own status file is not in these totals: its cell would say "not measured".',
}
W('models.json', models)

// ---- b. the agents themselves: tokens per session --------------------------------------------------------------------
const SES = J('data/agents/sessions.json') || { agents: [] }
const POL = J('agents/policy.json') || { agents: {} }
const CI = J('data/ci/index.json') || {}
const roles = new Map()
for (const [name, v] of Object.entries(POL.agents || {})) roles.set(v.role || name.split('@')[0].split('.')[1], { agent: name, role: v.role })
for (const x of SES.agents) if (!roles.has(x.role)) roles.set(x.role, { agent: x.agent, role: x.role })
const ledgerDir = P('accounts', 'ledger')
const lines = {}
if (fs.existsSync(ledgerDir)) for (const f of fs.readdirSync(ledgerDir).filter(f => f.endsWith('.jsonl'))) {
    const role = f.replace(/\.jsonl$/, '')
    lines[role] = fs.readFileSync(path.join(ledgerDir, f), 'utf8').split('\n').filter(Boolean).map(l => { try { return JSON.parse(l) } catch { return null } }).filter(l => l && l.totals && l.role === role)
}
const sum = (list, f) => list.reduce((s, x) => s + (f(x) || 0), 0)
const agents = []
const hourTokens = {}
for (const [role, r] of [...roles].sort((x, y) => x[0].localeCompare(y[0]))) {
    const ss = (SES.agents.find(x => x.role === role) || {}).sessions
    const sessionsKnown = Array.isArray(ss) ? ss.length : 0
    const ci = (CI.agents || []).find(x => x.agent === `incident.${role}`)
    const row = { agent: r.agent, role, sessions_recorded: sessionsKnown, commits: ci ? ci.commits : null, commits_source: ci ? 'data/ci/index.json' : null }
    const L = lines[role] || []
    if (!L.length) { agents.push({ ...row, tokens: NM, why: 'no line in accounts/ledger/' + role + '.jsonl yet: an agent can only measure its own session' }); continue }
    const latest = new Map(); for (const l of L) latest.set(l.session, l)   // each line is a session's running total: the latest of each session counts
    const S = [...latest.values()]
    const tot = { calls: sum(S, l => l.totals.calls + l.subagents.calls), fresh_input: sum(S, l => l.totals.fresh_input + l.subagents.fresh_input), output: sum(S, l => l.totals.output + l.subagents.output), cache_writes: sum(S, l => l.totals.cache_writes + l.subagents.cache_writes), cache_reads: sum(S, l => l.totals.cache_reads + l.subagents.cache_reads) }
    for (const l of S) for (const [h, v] of Object.entries(l.totals.by_hour || {})) { const t = hourTokens[h] = hourTokens[h] || { calls: 0, fresh_input: 0, output: 0, cache_writes: 0, cache_reads: 0, agents: [] }; for (const k of ['calls', 'fresh_input', 'output', 'cache_writes', 'cache_reads']) t[k] += v[k]; if (!t.agents.includes(role)) t.agents.push(role) }
    const all = tot.fresh_input + tot.output + tot.cache_writes + tot.cache_reads
    const last = S.sort((x, y) => x.at.localeCompare(y.at)).at(-1)
    const tools = {}; for (const l of S) for (const [k, v] of Object.entries(l.totals.tools || {})) { tools[k] = tools[k] || { calls: 0, returned_chars: 0 }; tools[k].calls += v.calls; tools[k].returned_chars += v.returned_chars }
    agents.push({ ...row, kind: 'measured', source: `accounts/ledger/${role}.jsonl`, measured_at: last.at, sessions_measured: S.length, lines: L.length,
        tokens: { ...tot, without_cache_reads: all - tot.cache_reads, all, cache_reads_share: all ? +(tot.cache_reads / all).toFixed(4) : 0, weighted: weighted(tot) },
        context_per_call: last.totals.context_per_call, compactions: sum(S, l => l.totals.compactions), subagents: sum(S, l => l.subagents.count),
        first_call: S.map(l => l.totals.first_call).filter(Boolean).sort()[0] || null, last_call: S.map(l => l.totals.last_call).filter(Boolean).sort().at(-1) || null,
        per_commit: ci && ci.commits ? { weighted_tokens: Math.round(weighted(tot) / ci.commits), kind: 'measured tokens over commits counted by incident.ci@ (the two were read at different times)' } : NM,
        tools, last_task: last.task, quality: last.quality })
}
const measured = agents.filter(x => x.kind === 'measured')
const team = measured.length ? { calls: sum(measured, x => x.tokens.calls), fresh_input: sum(measured, x => x.tokens.fresh_input), output: sum(measured, x => x.tokens.output), cache_writes: sum(measured, x => x.tokens.cache_writes), cache_reads: sum(measured, x => x.tokens.cache_reads) } : null
if (team) { team.all = team.fresh_input + team.output + team.cache_writes + team.cache_reads; team.cache_reads_share = team.all ? +(team.cache_reads / team.all).toFixed(4) : 0; team.weighted = weighted(team) }
const hourList = Object.entries(hourTokens).map(([h, v]) => ({ hour: h, ...v, weighted: weighted(v) })).sort((x, y) => y.weighted - x.weighted)
W('agents.json', {
    about: 'Tokens each agent\'s own session has used, by the WS-148 method: an agent runs tools/accounts-measure.mjs in its own session and commits one line of numbers to accounts/ledger/<role>.jsonl (fresh input, output, cache writes, cache reads; no message text). Only the agent can measure its session. Where no line exists the cell says "not measured". Tokens, not money: no price is applied.',
    method: { tool: 'tools/accounts-measure.mjs', from: 'WS-148, people/indi/accountant/measure.mjs in SGit-AI/SGit-AI__Website__Web-Summit', counted: 'each API message once, by its id; a line is the session\'s running total and the latest line of each session counts', weighted: { formula: 'fresh input + output + cache writes + cache reads x ' + CACHE_READ_WEIGHT, kind: 'estimated', source: 'WS-148 PROMPT.md: cache reads cost about a tenth of fresh input; a relative weight to compare sessions, not a price' } },
    coverage: { agents: agents.length, measured: measured.length, not_measured: agents.length - measured.length, source: 'agents/policy.json and data/agents/sessions.json for who exists; accounts/ledger/ for who has measured' },
    team_measured: team ? { ...team, kind: 'measured', note: `the sum of the ${measured.length} measured of ${agents.length} agents; not the team's total` } : NM,
    most_expensive_hour: hourList[0] ? { ...hourList[0], kind: 'measured', note: `among the ${measured.length} measured agents only` } : NM,
    by_hour: hourList.sort((x, y) => x.hour.localeCompare(y.hour)),
    agents,
})

// ---- c. the machine ---------------------------------------------------------------------------------------------------
const runs = []
if (fs.existsSync(P('data/ci/runs'))) for (const f of fs.readdirSync(P('data/ci/runs')).sort()) for (const r of (J('data/ci/runs/' + f) || { runs: [] }).runs) runs.push(r)
const byResult = {}, ciHours = {}
for (const r of runs) { byResult[r.result] = (byResult[r.result] || 0) + 1; const h = (r.pushed || r.queued || '').slice(0, 13); if (!h) continue; const t = ciHours[h] = ciHours[h] || { runs: 0, run_s: 0, queue_s: 0, success: 0 }; t.runs++; t.run_s += r.run_s || 0; t.queue_s += r.queue_s || 0; if (r.result === 'success') t.success++ }
const timed = runs.filter(r => typeof r.run_s === 'number')
const ok = runs.filter(r => r.result === 'success')
const ciHourList = Object.entries(ciHours).map(([h, v]) => ({ hour: h + ':00Z', ...v })).sort((x, y) => x.hour.localeCompare(y.hour))
let tracked = { files: NM }
try { const files = execFileSync('git', ['ls-files', '-z'], { cwd: ROOT, maxBuffer: 1 << 26 }).toString().split('\0').filter(Boolean); let bytes = 0; const kinds = {}; for (const f of files) { try { bytes += fs.statSync(P(f)).size } catch { } const e = path.extname(f) || '(none)'; kinds[e] = (kinds[e] || 0) + 1 } tracked = { files: files.length, bytes, kinds: Object.fromEntries(Object.entries(kinds).sort((x, y) => y[1] - x[1]).slice(0, 8)), kind: 'measured', source: 'git ls-files in the accountant\'s clone, working sizes', read: NOW } } catch { }
const site = P('_site'); let pages = NM
if (fs.existsSync(site)) { let html = 0, all = 0, bytes = 0; const walk = d => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else { all++; bytes += fs.statSync(p).size; if (e.name.endsWith('.html')) html++ } } }; walk(site); pages = { pages_html: html, files_served: all, bytes, kind: 'measured', source: 'node admin/build/build.mjs in the accountant\'s clone, then a count of _site/', read: NOW } }
const V = J('data/vaults.json') || { vaults: [] }
const machine = {
    about: 'The machine this site runs on, counted: CI runs and their seconds (incident.ci@\'s day files), pushes, pages built, files tracked, and the vaults with their sizes where one is published. No price is applied to a runner\'s time: seconds are the cost shown.',
    ci: { kind: 'measured', source: 'data/ci/runs/*.json (GitHub\'s Actions API, read by incident.ci@)', read: CI.updated || null, note: 'a snapshot as of read; runs after it are not here',
        runs: runs.length, by_result: byResult, pushes: runs.filter(r => r.event === 'push').length, releases: ok.length,
        run_seconds: { total: sum(timed, r => r.run_s), runs_timed: timed.length, successful_total: sum(ok, r => r.run_s), per_release: ok.length ? +(sum(ok, r => r.run_s) / ok.length).toFixed(1) : NM, spent_on_runs_that_released_nothing: sum(timed.filter(r => r.result !== 'success'), r => r.run_s) },
        queue_seconds: { total: sum(runs, r => r.queue_s) },
        push_to_served_s: CI.pipeline ? CI.pipeline.push_to_served_s : NM,
        busiest_hour: ciHourList.slice().sort((x, y) => y.runs - x.runs)[0] || NM, by_hour: ciHourList },
    commits: CI.totals ? { count: CI.totals.commits, first: CI.totals.first_commit, last: CI.totals.last_commit, agents: CI.totals.agents, tags: CI.totals.tags, kind: 'measured', source: 'data/ci/index.json totals', read: CI.updated } : NM,
    tracked, built: pages,
    vaults: (V.vaults || []).map(v => ({ id: v.id, name: v.name, kind_of_vault: v.kind || null, mode: v.mode || null, kept_by: v.by || null, size: v.bytes ?? v.size ?? 'not published', source: 'data/vaults.json' })),
    vaults_note: 'data/vaults.json lists vaults by id; none publishes a size yet. A vault named only in a feed\'s record (evidence/data.json) is counted there, not here.',
}
W('machine.json', machine)

// ---- d. per output ----------------------------------------------------------------------------------------------------
const SIG = J(INC + '/data/signals.json'); const EV = J('evidence/index.json')
const stories = fs.existsSync(P('stories')) ? fs.readdirSync(P('stories')).filter(d => fs.existsSync(P('stories', d, 'story.json'))).length : 0
const tok = role => { const x = agents.find(x => x.role === role); return x && x.kind === 'measured' ? x : null }
const per = (label, count, countSource, role, why) => {
    const x = tok(role), o = { output: label, count, count_source: countSource, count_kind: 'measured', made_by: `incident.${role}@web-summit.dinis` }
    if (!x || !count) return { ...o, weighted_tokens_each: NM, why: x ? 'none counted' : `incident.${role}@ has not measured its session` }
    return { ...o, weighted_tokens_each: Math.round(x.tokens.weighted / count), all_tokens_each: Math.round(x.tokens.all / count), kind: 'measured tokens over a measured count', note: why, source: `accounts/ledger/${role}.jsonl`, measured_at: x.measured_at }
}
const outputs = {
    about: 'Cost per thing made, only where both sides are measured: the count of the thing (from the site\'s own data) and the tokens of the agent that makes it (its own measured line). An agent does more than one thing in a session, so each figure is an upper bound on that output\'s cost, not its exact cost. CI seconds per release are exact.',
    per_output: [
        per('timeline row', SIG && SIG.items ? SIG.items.length : 0, INC + '/data/signals.json', 'conductor', 'the conductor also leads the team in the same session: an upper bound'),
        per('story', stories, 'stories/*/story.json', 'stories', 'the whole session over the stories published: an upper bound'),
        per('captured page', EV && EV.counts ? EV.counts.captures : 0, 'evidence/index.json', 'archivist', 'the whole session over the captures kept: an upper bound'),
        { output: 'release (a successful CI run)', count: ok.length, count_source: 'data/ci/runs/*.json', count_kind: 'measured', ci_seconds_each: machine.ci.run_seconds.per_release, kind: 'measured', source: 'data/ci/runs/*.json', read: CI.updated || null,
          weighted_tokens_each: measured.length === agents.length && ok.length ? Math.round(team.weighted / ok.length) : NM, why: measured.length === agents.length ? undefined : `${measured.length} of ${agents.length} agents have measured: the team's tokens per release need all of them` },
        { output: 'model call through the ledger', count: LS.total.calls || 0, count_source: 'models/ledger-summary.json', count_kind: 'measured', usd_each: LS.total.calls ? +(LS.total.cost_usd / LS.total.calls).toFixed(6) : NM, kind: 'measured', source: 'models/ledger-summary.json', read: LS.updated || null },
    ],
}
W('outputs.json', outputs)

// ---- the books at a glance, and the page ------------------------------------------------------------------------------
const books = {
    about: 'The books at a glance: today\'s model spend against the cap, tokens by agent where measured, the most expensive hour, cost per output. Every figure is in the file named beside it with its source and whether it is measured, reported or estimated.',
    day: today,
    model_spend: { spent_usd: spentToday, cap_usd: CAP.usd_per_day, of_cap: models.today.of_cap, kind: models.today.kind, file: 'accounts/models.json' },
    agent_tokens: { measured: measured.length, of: agents.length, team_measured: team || NM, file: 'accounts/agents.json' },
    most_expensive_hour: { models_usd: models.most_expensive_hour, tokens: hourList.length ? hourList.slice().sort((x, y) => y.weighted - x.weighted)[0] : NM, ci: machine.ci.busiest_hour },
    machine: { ci_runs: runs.length, releases: ok.length, ci_run_seconds: machine.ci.run_seconds.total, tracked_files: tracked.files, pages_built: pages === NM ? NM : pages.pages_html, file: 'accounts/machine.json' },
    per_output: outputs.per_output.map(o => ({ output: o.output, count: o.count, weighted_tokens_each: o.weighted_tokens_each, ci_seconds_each: o.ci_seconds_each, usd_each: o.usd_each })),
}
W('books.json', books)

const t = s => s ? s.slice(11, 16) + ' UTC' : 'time not recorded'
const d = s => s ? `${+s.slice(8, 10)} November, ${t(s)}` : 'not recorded'
const pct = v => (v * 100).toFixed(1) + '%'
const briefs = fs.existsSync(P('accounts/briefs')) ? fs.readdirSync(P('accounts/briefs')).filter(f => f.endsWith('.md')).sort() : []
const link = role => fs.existsSync(P('agents', role, 'README.md')) ? `[${role}](../agents/${role}/index.html)` : role
const md = []
md.push(`---
title: The accounts
summary: What this project costs: model spend against the day's cap, tokens by agent session, CI time, cost per output; each figure with its source and whether it is measured, reported or estimated.
---
> Kept by ${BY}, ${+NOW.slice(8, 10)} November 2026, ${NOW.slice(11, 16)} UTC

# The accounts: what this project costs

This is the cost of running the site, not news of the storm, and not a warning service: for warnings read [IPMA](https://www.ipma.pt/) and the authorities. Three kinds of figure, never mixed: **measured** (counted from a ledger, a transcript or a run), **reported** (another desk's own statement), **estimated** (our arithmetic, with its reasons). A cell with no figure says *not measured*; nothing is guessed. Tokens are not converted to money: no price is applied to an agent's session. Where the savings are: [savings](savings.md).${briefs.length ? ` The latest brief for Dinis: [${briefs.at(-1).replace('.md', '')}](briefs/${briefs.at(-1)}).` : ''}

## The books at a glance

| | Figure | Kind | Source, read |
|---|---|---|---|
| Model spend today | **${usd(spentToday)} of ${CAP.usd_per_day} US dollars** (${pct(models.today.of_cap)} of the cap) | measured ${usd(ledgerToday)} + reported ${usd(reportedToday)} | [models.json](models.json), from [the model ledger's summary](../models/ledger-summary.json), ${d(LS.updated)} |
${models.provider_account === NM ? '' : `| The provider's account | **${models.provider_account.state}**: credits ${models.provider_account.total_credits_usd}, used ${models.provider_account.total_usage_usd} US dollars (the account serves more than this project) | reported by the provider | [provider.json](provider.json), from [incident.models@'s status](../agents/models/status.json), ${d(models.provider_account.read)} |
`}| Agent sessions measured | **${measured.length} of ${agents.length}** | measured | [agents.json](agents.json), ${d(NOW)} |
| Tokens, measured sessions | ${team ? `**${n(team.all)}** in all, ${n(team.cache_reads)} of them cache reads (${pct(team.cache_reads_share)})` : NM} | measured | [the ledger lines](ledger/) |
| Most expensive hour, models | ${hours[0] ? `${hours[0].hour} UTC: ${usd(hours[0].cost_usd)} US dollars, ${n(hours[0].calls)} calls` : NM} | measured | [models.json](models.json) |
| Most expensive hour, tokens | ${hourList.length ? (() => { const h = hourList.slice().sort((x, y) => y.weighted - x.weighted)[0]; return `${h.hour.slice(11, 16)} UTC: ${n(h.fresh_input + h.output + h.cache_writes + h.cache_reads)} tokens (${h.agents.length} measured agent${h.agents.length > 1 ? 's' : ''})` })() : NM} | measured | [agents.json](agents.json) |
| Busiest hour, CI | ${machine.ci.busiest_hour === NM ? NM : `${machine.ci.busiest_hour.hour.slice(11, 16)} UTC: ${machine.ci.busiest_hour.runs} runs, ${n(machine.ci.busiest_hour.run_s)} s`} | measured | [machine.json](machine.json), from [incident.ci@'s runs](../data/ci/index.json), ${d(CI.updated)} |
| CI | ${n(runs.length)} runs, ${n(ok.length)} releases, ${n(machine.ci.run_seconds.total)} s of runner time | measured | the same |
| Repository | ${n(tracked.files)} files tracked${typeof tracked.bytes === 'number' ? `, ${(tracked.bytes / 1e6).toFixed(1)} MB` : ''}${pages === NM ? '' : `; ${n(pages.pages_html)} pages built`} | measured | [machine.json](machine.json), ${d(NOW)} |

The cap: ${CAP.usd_per_day} US dollars a day since ${CAP.since.slice(11, 16)} UTC on 11 November (${CAP.before} before), [Dinis's words in the brief](../BRIEF.md).

## Cost per output

Only where both sides are measured. An agent does more than one thing in a session, so tokens per output are an upper bound.

| Output | Count | Cost each | Kind | Source |
|---|---|---|---|---|
${outputs.per_output.map(o => `| ${o.output} | ${n(o.count)} | ${[typeof o.weighted_tokens_each === 'number' ? n(o.weighted_tokens_each) + ' weighted tokens' : null, typeof o.ci_seconds_each === 'number' ? o.ci_seconds_each + ' s of CI' : null, typeof o.usd_each === 'number' ? o.usd_each.toFixed(4) + ' US dollars' : null].filter(Boolean).join('; ') || 'tokens'}${o.why && typeof o.weighted_tokens_each !== 'number' ? `${typeof o.ci_seconds_each === 'number' ? '; tokens' : ''} ${NM}: ${o.why}` : ''} | ${o.kind || 'count measured'} | [${o.count_source.replace(INC + '/', '')}](../${o.count_source.includes('*') ? o.count_source.split('*')[0] : o.count_source}) |`).join('\n')}

Weighted tokens: fresh input + output + cache writes + a tenth of cache reads (an estimate of relative cost from WS-148, not a price). File: [outputs.json](outputs.json).

## Tokens by agent

Each agent measures its own session with [tools/accounts-measure.mjs](../tools/accounts-measure.mjs) (the method of WS-148: one line of numbers, no message text) and commits the line. The latest line of each session counts.

| Agent | Calls | Fresh input | Output | Cache writes | Cache reads | Cache reads' share | Context per call, last | Measured |
|---|---|---|---|---|---|---|---|---|
${agents.map(x => x.kind === 'measured' ? `| ${link(x.role)} | ${n(x.tokens.calls)} | ${n(x.tokens.fresh_input)} | ${n(x.tokens.output)} | ${n(x.tokens.cache_writes)} | ${n(x.tokens.cache_reads)} | ${pct(x.tokens.cache_reads_share)} | ${n(x.context_per_call.last)} | [${t(x.measured_at)}](ledger/${x.role}.jsonl) |` : `| ${link(x.role)} | ${NM} | | | | | | | |`).join('\n')}

File: [agents.json](agents.json). How to add your line: [the measure step](measure.md).

## Model calls through the ledger

${LS.days.map(dd => `**${dd.day}**: ${n(dd.calls)} calls, ${usd(dd.cost_usd)} US dollars, ${n(dd.tokens_in)} tokens in, ${n(dd.tokens_out)} out (measured: the provider's reported cost on each ledger line; [the summary](../models/ledger-summary.json), read ${d(LS.updated)}).

| Task | Calls | US dollars | Tokens in | Tokens out |
|---|---|---|---|---|
${Object.entries(dd.by_task || {}).sort((x, y) => y[1].cost_usd - x[1].cost_usd).map(([k, v]) => `| ${k} | ${n(v.calls)} | ${v.cost_usd.toFixed(4)} | ${n(v.tokens_in)} | ${n(v.tokens_out)} |`).join('\n')}

| Model called | Calls | US dollars | Share of the day | Tokens out |
|---|---|---|---|---|
${Object.entries(dd.by_model || {}).sort((x, y) => y[1].cost_usd - x[1].cost_usd).map(([k, v]) => `| ${k} | ${n(v.calls)} | ${v.cost_usd.toFixed(4)} | ${dd.cost_usd ? pct(v.cost_usd / dd.cost_usd) : ''} | ${n(v.tokens_out)} |`).join('\n')}

| Agent (ledger) | Calls | US dollars |
|---|---|---|
${Object.entries(dd.by_agent || {}).map(([k, v]) => `| ${k} | ${n(v.calls)} | ${v.cost_usd.toFixed(4)} |`).join('\n')}`).join('\n\n')}

Reported by other desks (their own statement, not this ledger):

| Desk | Day | US dollars | Source, read |
|---|---|---|---|
${reported.map(r => `| ${r.agent} | ${r.day} | ${usd(r.cost_usd)} | [${r.source}](../${r.source}), ${d(r.read)} |`).join('\n') || '| none | | | |'}

File: [models.json](models.json).

## The machine

| | Figure | Kind | Source, read |
|---|---|---|---|
| CI runs | ${n(runs.length)} (${Object.entries(byResult).map(([k, v]) => `${v} ${k}`).join(', ')}) | measured | [data/ci/](../data/ci/index.json), ${d(CI.updated)} |
| Runner seconds | ${n(machine.ci.run_seconds.total)} s over ${n(timed.length)} timed runs; ${n(machine.ci.run_seconds.spent_on_runs_that_released_nothing)} s on runs that released nothing | measured | the same |
| Seconds per release | ${machine.ci.run_seconds.per_release} s | measured | the same |
| Queue seconds | ${n(machine.ci.queue_seconds.total)} s | measured | the same |
| Push to served | ${CI.pipeline ? `median ${CI.pipeline.push_to_served_s.median} s, 90th percentile ${CI.pipeline.push_to_served_s.p90} s` : NM} | measured | the same |
| Commits | ${CI.totals ? `${n(CI.totals.commits)} by ${CI.totals.agents} agents, ${n(CI.totals.tags)} tags` : NM} | measured | the same |
| Files tracked | ${n(tracked.files)}${typeof tracked.bytes === 'number' ? `, ${n(tracked.bytes)} bytes` : ''} | measured | git ls-files, ${d(NOW)} |
| Pages built | ${pages === NM ? NM : `${n(pages.pages_html)} pages, ${n(pages.files_served)} files served, ${(pages.bytes / 1e6).toFixed(1)} MB`} | measured | the build in the accountant's clone, ${d(NOW)} |
| Vaults | ${machine.vaults.length} listed; sizes not published | reported | [data/vaults.json](../data/vaults.json) |

CI by hour (UTC):

| Hour | Runs | Releases | Runner s | Queue s |
|---|---|---|---|---|
${ciHourList.map(h => `| ${h.hour.slice(5, 10)} ${h.hour.slice(11, 16)} | ${h.runs} | ${h.success} | ${n(h.run_s)} | ${n(h.queue_s)} |`).join('\n')}

File: [machine.json](machine.json).

## The files

[books.json](books.json) (at a glance), [models.json](models.json), [provider.json](provider.json), [agents.json](agents.json), [machine.json](machine.json), [outputs.json](outputs.json), [the ledger lines](ledger/), [savings](savings.md), [the measure step](measure.md)${briefs.length ? ', briefs: ' + briefs.map(b => `[${b.replace('.md', '')}](briefs/${b})`).join(', ') : ''}. The method is WS-148's (an accountant agent: every agent measures its tokens, the accountant finds the savings) from [web-summit.sgit.ai](https://web-summit.sgit.ai).
`)
fs.writeFileSync(P('accounts', 'index.md'), md.join('\n'))
console.log(`accounts: ${usd(spentToday)} of ${CAP.usd_per_day} USD today; ${measured.length} of ${agents.length} agents measured; ${runs.length} CI runs; ${tracked.files} files`)
