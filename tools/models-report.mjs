#!/usr/bin/env node
// The report (incident.models@web-summit.dinis, WS-214): node tools/models-report.mjs
// From models/evals/<task>/items.json and results/<model>.json, models/evals/models.json and licences.json, models/notes.json,
// models/budgets.json and the ledger (outside git):
//   models/results.json         the table: per task and roster row, runs right of runs asked, per field, cost per item, latency, kinds
//   models/which.json           which model for which job here
//   models/ledger-summary.json  the ledger's daily totals: calls, tokens, dollars, by agent, task, model, status, hour. No prompts.
//   models/index.md, models/<task>.md, models/models/index.md, models/models/<model>.md   the pages
// Run by this agent after a round; the build does not run it (the ledger is not in the repository).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { summary } from './llm.mjs'
import { PROMPTS } from './models-prompts.mjs'

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'), BY = 'incident.models@web-summit.dinis'
const J = f => JSON.parse(fs.readFileSync(path.join(REPO, f), 'utf8')), W = (f, s) => { fs.mkdirSync(path.dirname(path.join(REPO, f)), { recursive: true }); fs.writeFileSync(path.join(REPO, f), s) }
const now = new Date(), stamp = now.toISOString().slice(0, 19) + 'Z'
const kept = `> Kept by ${BY}, ${now.getUTCDate()} November 2026, ${stamp.slice(11, 16)} UTC`
const TASKS = [['warnings-in-force', 'Warnings in force at an hour'], ['extract-decision', 'Extract a decision'], ['label', 'Label fact, evidence, hypothesis'], ['translate', 'Translate, figures kept'], ['extract-warning', 'Extract a warning']]
const roster = J('models/evals/models.json'), notes = J('models/notes.json'), LIC = J('models/evals/licences.json'), budgets = J('models/budgets.json')
const slug = id => id.replace(/[\/#]/g, '--'), short = id => id.split('/')[1].replace('#', ' #'), baseOf = id => id.split('#')[0]
const med = a => { const s = a.slice().sort((x, y) => x - y); return s.length ? s[Math.floor((s.length - 1) / 2)] : null }
const p90 = a => { const s = a.slice().sort((x, y) => x - y); return s.length ? s[Math.min(s.length - 1, Math.floor(s.length * 0.9))] : null }
const usd = v => v == null ? '' : v === 0 ? '0' : v < 0.0001 ? v.toFixed(6) : v < 0.01 ? v.toFixed(5) : v.toFixed(4)
const sec = ms => ms == null ? '' : (ms / 1000).toFixed(1)
const cell = s => String(s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' / ')
const NOT = 'Not a warning service: for warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). Nothing here is a forecast or advice.'
const group = m => `${m.open_weight ? 'open-weight' : 'commercial'}, ${m.size}`

// ---- results.json
const out = { about: "Other models, measured: checkable tasks run on several models through tools/llm.mjs (OpenRouter), scored automatically against answers copied from this site's own data room. A row is a model at one reasoning setting. right / asked count RUNS: each item is asked up to three times of a row (repeats in models/evals/models.json), so asked = items x runs. run_right lists the items right in run 1, 2, 3: their spread is the only error bar here. Small samples: read the counts.", by: BY, updated: stamp, models: roster.models, tasks: {} }
const DOC = {}
for (const [task, title] of TASKS) {
    let items; try { items = J(`models/evals/${task}/items.json`) } catch { continue }
    const res = {}; for (const m of roster.models) { try { res[m.id] = J(`models/evals/${task}/results/${slug(m.id)}.json`) } catch {} }
    if (!Object.keys(res).length) continue
    DOC[task] = { items, res }
    const T = out.tasks[task] = { title, items: items.items.length, fields: items.fields, scoring: items.scoring, items_file: `models/evals/${task}/items.json`, results_dir: `models/evals/${task}/results/`, page: `models/${task}.md`, run_utc: Object.values(res).map(r => r.updated).sort().at(-1), models: {} }
    for (const m of roster.models) {
        const r = res[m.id]; if (!r) continue
        const first = items.items.map(it => r.answers[it.id]).filter(Boolean); if (!first.length) continue
        const reps = items.items.flatMap(it => r.answers[it.id] ? (r.repeats?.[it.id] || []) : []), all = [...first, ...reps]
        const kinds = k => all.filter(x => x.kind === k).length, cost = all.reduce((s, x) => s + (x.cost_usd || 0), 0), lat = all.filter(x => x.kind !== 'error').map(x => x.latency_ms)
        const nrep = Math.min(...items.items.filter(it => r.answers[it.id]).map(it => (r.repeats?.[it.id] || []).length))
        const run_right = [first.filter(x => x.right).length, ...Array.from({ length: first.length === items.items.length ? nrep : 0 }, (_, k) => items.items.filter(it => r.repeats[it.id][k].right).length)]
        const unstable = items.items.filter(it => r.answers[it.id] && (r.repeats?.[it.id] || []).some(x => x.right !== r.answers[it.id].right)).length
        T.models[m.id] = { items: first.length, asked: all.length, right: all.filter(x => x.right).length, accuracy: +(all.filter(x => x.right).length / all.length).toFixed(3), run_right, items_that_changed_between_runs: unstable,
            by_field: Object.fromEntries(items.fields.map(f => [f, first.filter(x => x.fields?.[f]).length])), answered: kinds('answered'), malformed: kinds('malformed'), cut_off: kinds('cut_off'), refused: kinds('refused'), errors: kinds('error'),
            cost_usd: +cost.toFixed(6), cost_per_item_usd: +(cost / all.length).toFixed(7), latency_ms_median: med(lat), latency_ms_p90: p90(lat), tokens_in: all.reduce((s, x) => s + (x.tokens_in || 0), 0), tokens_out: all.reduce((s, x) => s + (x.tokens_out || 0), 0) }
    }
}
out.overall = Object.fromEntries(roster.models.map(m => { const R = Object.values(out.tasks).map(t => t.models[m.id]).filter(Boolean); const asked = R.reduce((s, r) => s + r.asked, 0), right = R.reduce((s, r) => s + r.right, 0), cost = R.reduce((s, r) => s + r.cost_usd, 0)
    return [m.id, R.length ? { tasks: R.length, asked, right, accuracy: +(right / asked).toFixed(3), cost_usd: +cost.toFixed(6), cost_per_item_usd: +(cost / asked).toFixed(7), latency_ms_median: med(R.map(r => r.latency_ms_median)), not_answered: R.reduce((s, r) => s + r.malformed + r.cut_off + r.refused + r.errors, 0), tokens_in: R.reduce((s, r) => s + r.tokens_in, 0), tokens_out: R.reduce((s, r) => s + r.tokens_out, 0) } : null] }).filter(([, v]) => v))
const which = { about: notes.which_about, by: BY, updated: stamp, label: 'hypothesis', source: 'models/results.json', jobs: notes.which.map(w => { const r = w.model && out.tasks[w.task]?.models[w.model]; return { job: w.job, use: w.use.replace(/`/g, ''), model: w.model, measured_on: w.task, right: r ? `${r.right}/${r.asked}` : null, usd_per_100_items: r ? +(r.cost_per_item_usd * 100).toFixed(4) : 0, median_seconds: r ? +(r.latency_ms_median / 1000).toFixed(1) : null, check: w.check.replace(/`/g, '') } }) }
out.usd_per_100_items = Object.fromEntries(Object.entries(out.tasks).map(([t, T]) => [t, Object.fromEntries(Object.entries(T.models).map(([m, r]) => [m, +(r.cost_per_item_usd * 100).toFixed(4)]))]))
W('models/which.json', JSON.stringify(which, null, 1) + '\n')
W('models/results.json', JSON.stringify(out, null, 1) + '\n')

// ---- ledger-summary.json
const LEDGER_DIR = process.env.INCIDENT_LEDGER_DIR || path.join(process.env.HOME, '.incident-ledger')
const days = (fs.existsSync(LEDGER_DIR) ? fs.readdirSync(LEDGER_DIR) : []).filter(f => /^\d{4}-\d\d-\d\d\.jsonl$/.test(f)).map(f => f.slice(0, 10)).sort()
const round = o => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, { ...v, cost_usd: +v.cost_usd.toFixed(6) }]))
const led = { about: "The model ledger's daily totals: the model calls made through tools/llm.mjs, counted. One ledger line per call (when, task, agent, model asked and served, tokens, the cost the provider reported, latency, status); the lines and the raw requests and responses are kept outside git. No prompt or answer text here. The models named are the third-party models that were called.", by: BY, updated: stamp, currency: 'USD', source: "tools/llm.mjs --summary (the ledger at ~/.incident-ledger/<day>.jsonl in this agent's session)",
    shape: "days[]: one per UTC day of THIS agent's ledger { day, calls, cost_usd, cap_usd, tokens_in, tokens_out, by_model, by_agent, by_task, by_status, by_hour }, each by_* a map of name -> { calls, cost_usd, tokens_in, tokens_out } (by_hour: 'HH:00' -> { calls, cost_usd }). other_desks[]: one per other agent { desk, file, day?, calls?, cost_usd, by_model?, by_task? }; reported: true means the figure is the one that agent's status file gives, not a ledger summary. budgets: models/budgets.json as it stood. team_today_usd: this agent's last day plus other_desks. total: over days[] only.",
    note: "A ledger lives in the session that made the calls, so this file is this agent's ledger in full and the other agents' as they report it. An agent that calls a model writes `node tools/llm.mjs --summary > <its folder>/ledger-summary.json` after each round and it is read here.",
    budgets: { team_cap_usd: budgets.team_cap_usd, agents: budgets.agents, any_other_agent_usd: budgets.any_other_agent_usd, file: 'models/budgets.json' },
    days: days.map(d => { const s = summary(d); return { ...s, by_model: round(s.by_model), by_agent: round(s.by_agent), by_task: round(s.by_task), by_status: round(s.by_status), by_hour: round(s.by_hour) } }) }
led.total = { calls: led.days.reduce((s, d) => s + d.calls, 0), cost_usd: +led.days.reduce((s, d) => s + d.cost_usd, 0).toFixed(6), tokens_in: led.days.reduce((s, d) => s + d.tokens_in, 0), tokens_out: led.days.reduce((s, d) => s + d.tokens_out, 0) }
led.other_desks = []
for (const d of fs.readdirSync(REPO, { withFileTypes: true }).filter(d => d.isDirectory() && !['models', '_site', 'node_modules'].includes(d.name) && !d.name.startsWith('.'))) {
    for (const f of [path.join(REPO, d.name, 'ledger-summary.json'), path.join(REPO, 'agents', d.name, 'ledger-summary.json')]) { if (!fs.existsSync(f)) continue
        try { const s = JSON.parse(fs.readFileSync(f, 'utf8')); if (typeof s.cost_usd === 'number') led.other_desks.push({ desk: d.name, file: path.relative(REPO, f), day: s.day, calls: s.calls, cost_usd: s.cost_usd, by_model: s.by_model, by_task: s.by_task }) } catch {} }
}
for (const a of fs.readdirSync(path.join(REPO, 'agents'))) {
    if (a === 'models' || led.other_desks.some(o => o.desk === a)) continue
    try { const st = JSON.parse(fs.readFileSync(path.join(REPO, 'agents', a, 'status.json'), 'utf8')), line = (st.done || []).map(String).find(x => /^spend today: [\d.]+ US dollars/.test(x))
        if (line) led.other_desks.push({ desk: a, reported: true, file: `agents/${a}/status.json`, updated: st.updated, cost_usd: +line.match(/^spend today: ([\d.]+)/)[1], says: line }) } catch {}
}
led.team_today_usd = +((led.days.at(-1)?.cost_usd || 0) + led.other_desks.reduce((s, o) => s + (o.cost_usd || 0), 0)).toFixed(4)
W('models/ledger-summary.json', JSON.stringify(led, null, 1) + '\n')
const today = led.days.at(-1) || { calls: 0, cost_usd: 0, cap_usd: 20, tokens_in: 0, tokens_out: 0, by_task: {}, by_model: {}, by_agent: {} }

// ---- the pages
const mark = a => !a ? '' : a.right ? 'right' : a.kind === 'answered' ? '**wrong**' : `**${a.kind.replace('_', ' ')}**`
const front = (title, summ, mount, up = '../') => `---\ntitle: ${title}\nsummary: ${summ}\n${mount ? `mount: ${mount}\nhead: <link rel="stylesheet" href="${up}app/models/models.css"><script src="${up}app/models/models.js" defer></script>\n` : ''}---\n`
const sourceLine = `Source for every figure on this page: [results.json](results.json) (made ${stamp.slice(0, 16).replace('T', ' ')} UTC from the runs) and [ledger-summary.json](ledger-summary.json).`
const spread = r => r.run_right.length > 1 ? `${Math.min(...r.run_right)}${Math.min(...r.run_right) === Math.max(...r.run_right) ? '' : ' to ' + Math.max(...r.run_right)} of ${r.items} (${r.run_right.length} runs)` : `${r.run_right[0]} of ${r.items} (1 run)`
const show = (task, items, a) => !a ? '' : a.answer ? (task === 'translate' ? (typeof a.answer.en === 'string' ? a.answer.en : JSON.stringify(a.answer.en)) : task === 'label' ? a.answer.label : task === 'warnings-in-force' ? JSON.stringify(a.answer.in_force) : JSON.stringify(Object.fromEntries(Object.entries(a.answer).filter(([k]) => items.fields.includes(k) || k === 'what')))) : a.said ? `(said) ${a.said}` : a.error ? `(error) ${a.error}` : ''
const ran = TASKS.filter(([t]) => out.tasks[t])
const modelPage = m => `models/${slug(baseOf(m.id))}.md`

{   // index
    const L = []
    L.push(front('Other models, measured', "Checkable tasks, taken from this site's own verified data, run on open-weight and commercial models: accuracy, cost per item, latency, refusals, malformed answers, and the spend.", '<div id="models" data-view="index" data-base="./"><p class="meta">The charts are drawn in the browser from <a href="results.json">results.json</a>; the same figures are in the tables below.</p></div>'))
    L.push('# Other models, measured', '', kept, '', `**${NOT}**`, '')
    L.push('## The answer to "have we started using other models?"', '')
    const okCalls = today.by_status?.ok?.calls ?? today.calls, refusedCalls = today.calls - okCalls
    L.push(`Yes. On ${stamp.slice(0, 10)} this desk's wrapper made **${okCalls.toLocaleString('en-GB')} answered model calls** to **${Object.keys(today.by_model).length} third-party models** and spent **${usd(today.cost_usd)} US dollars** (${today.tokens_in.toLocaleString('en-GB')} tokens in, ${today.tokens_out.toLocaleString('en-GB')} out); with what the other desks report, the team is at **${usd(led.team_today_usd)} of the day's ${budgets.team_cap_usd} US dollars**. Source: [ledger-summary.json](ledger-summary.json), written ${stamp.slice(11, 16)} UTC. Before 02:21 UTC on 11 November the ledger held no call.${refusedCalls ? ` A further ${refusedCalls.toLocaleString('en-GB')} calls were refused or failed at the provider and cost nothing (${(today.by_status?.http_402?.calls || 0).toLocaleString('en-GB')} of them 'Insufficient credits' on the OpenRouter account, from 02:55 UTC).` : ''}`, '', notes.round_2 ? `**Round 2 is partial.** ${notes.round_2}` : '', '')
    L.push("No model writes anything on this site. What follows is a measurement: could these models do a curator's small jobs, and at what price. A page for each model, the open-weight ones first: [the models](models/index.md).", '')
    L.push('## What we asked', '', '| Task | Items | The input | The answer it is scored against |', '|---|---|---|---|')
    for (const [task, title] of ran) L.push(`| [${title}](${task}.md) | ${DOC[task].items.items.length} | ${cell(notes.tasks[task].input)} | ${cell(notes.tasks[task].gold)} |`)
    L.push('', "Every gold answer is copied by `tools/models-items.mjs` from the data room; none was written for the test. Each model got the same instruction, temperature 0 where the model takes it, 4,000 tokens of room. Scoring is automatic and exact, field by field. **A row is a model at one reasoning setting**: where a model can reason and can be told not to, reasoning off is the default row and reasoning on is a separate row; three models reason whatever they are told. Each item is asked three times of the cheap rows and once of the dear ones.", '')
    L.push('## What we got', '', `Runs right out of runs asked, per task (an item asked three times counts three). ${sourceLine}`, '')
    L.push(`| Model, reasoning | Kind | ${ran.map(([t, ti]) => `[${ti}](${t}.md)`).join(' | ')} | All | Not answered | Cost per item, USD | Median latency, s |`, `|---|---|${ran.map(() => '---').join('|')}|---|---|---|---|`)
    for (const m of roster.models) { const o = out.overall[m.id]; if (!o) continue
        L.push(`| [\`${m.id}\`](${modelPage(m)}): ${m.reasoning} | ${group(m)} | ${ran.map(([t]) => { const r = out.tasks[t].models[m.id]; return r ? `${r.right}/${r.asked}` : '' }).join(' | ')} | **${o.right}/${o.asked}** | ${o.not_answered} | ${usd(o.cost_per_item_usd)} | ${sec(o.latency_ms_median)} |`) }
    L.push('', '"Not answered" counts answers that were not the JSON asked for, were cut off at the token limit, were refusals, or failed at the provider. Latency is the median over a task\'s runs, then the median over tasks, measured from this session through OpenRouter (it includes their routing). The spread between runs is on each task\'s page.', '')
    L.push('**How to read it.** ' + notes.how_to_read, '')
    L.push('## Which model for which job here', '', `*${notes.which_about}* As data: [which.json](which.json).`, '', '| Job | Call | Right in the runs | USD per 100 items | Median seconds | The check before anything is used |', '|---|---|---|---|---|---|')
    for (const w of which.jobs) { const n = notes.which.find(x => x.job === w.job); L.push(`| ${cell(w.job)} | ${cell(n.use)} | ${w.right ? `${w.right} ([${out.tasks[w.measured_on].title.toLowerCase()}](${w.measured_on}.md))` : ''} | ${w.usd_per_100_items} | ${w.median_seconds ?? ''} | ${cell(n.check)} |`) }
    L.push('', '**What 100 timeline rows cost.** Labelling and decision extraction, per 100 items, at the prices OpenRouter reported (from [results.json](results.json), `usd_per_100_items`):', '', '| Model, reasoning | Label 100 rows, USD | Right on labels | Extract 100 decisions, USD | Right on decisions |', '|---|---|---|---|---|')
    for (const m of roster.models) { const a = out.tasks.label?.models[m.id], b = out.tasks['extract-decision']?.models[m.id]; if (a && b) L.push(`| \`${m.id}\`: ${m.reasoning} | ${(a.cost_per_item_usd * 100).toFixed(4)} | ${a.right}/${a.asked} | ${(b.cost_per_item_usd * 100).toFixed(4)} | ${b.right}/${b.asked} |`) }
    L.push('', notes.per_100, '')
    L.push('## What we would use each for', '', '*Our reading of the table: a hypothesis, from small samples, to be re-run as the item sets grow.*', '')
    for (const u of notes.use) L.push(`- **${u.job}**: ${u.pick} ${u.why}`)
    L.push('', '## What the models tell us about our own data', '', notes.own_data.replace(/\bs-\d{4}T\d{4}[a-z]?\b/g, id => `[${id}](../incidents/2026-11-10-storm-charles/timeline.md#${id})`).replace('on the label page', 'on [the label page](label.md)'), '')
    L.push('## The spend', '', `From the ledger's summary ([ledger-summary.json](ledger-summary.json), ${stamp.slice(0, 16).replace('T', ' ')} UTC). Costs are what OpenRouter reported for each call. **The cap: ${budgets.team_cap_usd} US dollars a day for the whole team** (Dinis, 11 November ~02:50 UTC, [BRIEF.md](../BRIEF.md); 5 before), kept as shares ([budgets.json](budgets.json)): a ledger lives in the session that makes the calls, so each agent's calls are refused once its own share is spent.`, '')
    L.push('| By agent | Share of the day, USD | Calls | Spent, USD |', '|---|---|---|---|')
    for (const [k, v] of Object.entries(today.by_agent)) L.push(`| ${k} (this ledger) | ${budgets.agents[k]?.usd ?? budgets.any_other_agent_usd} | ${v.calls} | ${usd(v.cost_usd)} |`)
    for (const o of led.other_desks) L.push(`| incident.${o.desk}@ (its own session's ledger${o.reported ? `; the figure its status file gives, ${String(o.updated).slice(11, 16)} UTC` : ''}: [${o.file}](../${o.file})) | ${budgets.agents[`incident.${o.desk}@web-summit.dinis`]?.usd ?? budgets.any_other_agent_usd} | ${o.calls ?? 'not given'} | ${usd(o.cost_usd)} |`)
    L.push(`| **the team, today** | **${budgets.team_cap_usd}** | | **${usd(led.team_today_usd)}** |`, '')
    L.push('| By task | Calls | Tokens in | Tokens out | USD |', '|---|---|---|---|---|')
    for (const [k, v] of Object.entries(today.by_task).sort((a, b) => b[1].cost_usd - a[1].cost_usd)) L.push(`| \`${k}\` | ${v.calls} | ${v.tokens_in} | ${v.tokens_out} | ${usd(v.cost_usd)} |`)
    L.push(`| **all** | **${today.calls}** | **${today.tokens_in}** | **${today.tokens_out}** | **${usd(today.cost_usd)}** |`, '')
    L.push('| By model | Calls | Tokens in | Tokens out | USD |', '|---|---|---|---|---|')
    for (const [k, v] of Object.entries(today.by_model).sort((a, b) => b[1].cost_usd - a[1].cost_usd)) L.push(`| \`${k}\` | ${v.calls} | ${v.tokens_in} | ${v.tokens_out} | ${usd(v.cost_usd)} |`)
    L.push('', notes.more_would_buy, '')
    L.push('## How it is kept', '', '- Every call goes through [`tools/llm.mjs`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/blob/dev/tools/llm.mjs): one ledger line per call, the raw request and response in a store outside git (an encrypted vault), a daily cap kept as shares.', "- The items: `models/evals/<task>/items.json`. Each model's parsed answers: `models/evals/<task>/results/<model>.json` (each with the sha256 of its raw record). The roster: [models.json](evals/models.json); the licences: [licences.json](evals/licences.json).", '- Run again: `node tools/models-items.mjs && node tools/models-run.mjs && node tools/models-report.mjs`.', '- For agents: the table is [results.json](results.json); which model for which job is [which.json](which.json); the spend is [ledger-summary.json](ledger-summary.json).', '- Asking a model from another desk: [agents/models/ask.md](../agents/models/ask.md).', '')
    W('models/index.md', L.join('\n'))
}
for (const [task, title] of ran) {
    const { items, res } = DOC[task], T = out.tasks[task], L = [], ms = roster.models.filter(m => T.models[m.id])
    L.push(front(`Models: ${title.toLowerCase()}`, `${items.items.length} items from the data room, ${ms.length} rows: every item, the answer it is scored against, and each model's answer marked right or wrong.`, `<div id="models" data-view="task" data-task="${task}" data-base="./"><p class="meta">The chart is drawn in the browser from <a href="results.json">results.json</a>; the same figures are in the table below.</p></div>`))
    L.push(`# ${title}`, '', kept, '', `**${NOT}** Part of [Other models, measured](index.md).`, '', items.about, '', `Scoring: ${items.scoring}. Last run ${T.run_utc.slice(0, 16).replace('T', ' ')} UTC. ${sourceLine}`, '')
    L.push('## The instruction', '', "The same for every model (the item follows it as the user's message):", '', '```', PROMPTS[task](items.items[0], items)[0].content, '```', '')
    L.push('## The table', '', `| Model, reasoning | Kind | Runs right | Items right, run by run | Changed between runs | ${items.fields.map(f => `\`${f}\``).join(' | ')} | Malformed | Cut off | Refused | Errors | Cost per item, USD | Median latency, s | p90, s |`, `|---|---|---|---|---|${items.fields.map(() => '---').join('|')}|---|---|---|---|---|---|---|`)
    for (const m of ms) { const r = T.models[m.id]; L.push(`| [\`${m.id}\`](${modelPage(m)}): ${m.reasoning} | ${group(m)} | **${r.right}/${r.asked}** | ${spread(r)} | ${r.run_right.length > 1 ? r.items_that_changed_between_runs + ' items' : ''} | ${items.fields.map(f => r.by_field[f]).join(' | ')} | ${r.malformed} | ${r.cut_off} | ${r.refused} | ${r.errors} | ${usd(r.cost_per_item_usd)} | ${sec(r.latency_ms_median)} | ${sec(r.latency_ms_p90)} |`) }
    L.push('', 'The field columns count the first run. "Changed between runs": items a row got right in one run and wrong in another, at temperature 0.', '', notes.tasks[task].reading ? `**Reading (ours, a hypothesis):** ${notes.tasks[task].reading}` : '', '')
    if (task === 'label' && notes.fourth_label) { const F = notes.fourth_label
        L.push(`## ${F.title}`, '', `*${F.by}.*`, '', F.text, '', '| Row | Our label | What the rows said (first run) | The row |', '|---|---|---|---|')
        for (const id of F.rows) { const it = items.items.find(x => x.id === id); if (!it) continue; const c = {}; let n = 0; for (const m of ms) { const a = res[m.id].answers[id]; if (!a) continue; n++; const k = a.answer?.label || 'no answer'; c[k] = (c[k] || 0) + 1 }
            L.push(`| [${id}](../incidents/2026-11-10-storm-charles/timeline.md#${id}) | ${it.gold.label} | ${Object.entries(c).sort((x, y) => y[1] - x[1]).map(([k, v]) => `${k} ${v}`).join(', ')} (of ${n}) | ${cell(it.input.text.slice(0, 160))}… |`) }
        L.push('') }
    L.push('## Item by item', '', 'First run of each row.', '', `| Item | Right | ${ms.map(m => short(m.id)).join(' | ')} |`, `|---|---|${ms.map(() => '---').join('|')}|`)
    for (const it of items.items) { const A = ms.map(m => res[m.id].answers[it.id]); L.push(`| [${it.id}](#${it.id.toLowerCase()}) | ${A.filter(a => a?.right).length}/${A.filter(Boolean).length} | ${A.map(a => !a ? '' : a.right ? 'right' : '**no**').join(' | ')} |`) }
    L.push('')
    let shared = null
    if (task === 'warnings-in-force') { shared = items.items[0].input; L.push('### The seventeen messages', '', 'The same for every item of this task; only the hour asked changes.', '', '```', shared, '```', '') }
    for (const it of items.items) {
        L.push(`### ${it.id}`, '')
        const input = shared ? `The hour: ${it.at_utc}\n\n(the seventeen messages above)` : typeof it.input === 'string' ? it.input : `${it.input.text}\nSource(s): ${it.input.sources.join(' ; ')}`
        L.push('```', (it.published_at ? `Published at: ${it.published_at}\n\n` : '') + input, '```', '')
        L.push(`Scored against: \`${JSON.stringify(it.gold)}\`, from \`${it.gold_from}\`.${it.source ? ` Source of the text: [${it.source.replace(/^https:\/\//, '').split('/')[0]}](${it.source}), read ${String(it.read_utc).slice(0, 16).replace('T', ' ')} UTC.` : ''}${it.row ? ` The row: [${it.id}](../${it.row}).` : ''}${it.note ? ` Note: ${it.note}.` : ''}`, '')
        L.push('| Model | Answer (first run) | Result | Right in runs |', '|---|---|---|---|')
        for (const m of ms) { const a = res[m.id].answers[it.id]; if (!a) continue; const rp = res[m.id].repeats?.[it.id] || []
            L.push(`| \`${short(m.id)}\` | ${cell(show(task, items, a)).slice(0, 700)} | ${mark(a)}${a.kind === 'answered' && !a.right && items.fields.length > 1 ? ` (${Object.entries(a.fields).filter(([, v]) => !v).map(([k]) => k).join(', ')})` : ''} | ${[a, ...rp].filter(x => x.right).length}/${1 + rp.length} |`) }
        L.push('')
    }
    W(`models/${task}.md`, L.join('\n'))
}

// ---- a page per model (models/models/<model>.md), and their index, the open-weight ones first
const bases = roster.models.filter(m => !m.variant_of)
const lic = m => LIC.licences[LIC.models[m.id]?.licence] || null
for (const m of bases) {
    const rows = roster.models.filter(r => baseOf(r.id) === m.id && out.overall[r.id]), L = [], li = LIC.models[m.id] || {}, l = lic(m), o = rows.map(r => out.overall[r.id])
    const tot = { asked: o.reduce((s, x) => s + x.asked, 0), right: o.reduce((s, x) => s + x.right, 0), cost: o.reduce((s, x) => s + x.cost_usd, 0), tin: o.reduce((s, x) => s + x.tokens_in, 0), tout: o.reduce((s, x) => s + x.tokens_out, 0), na: o.reduce((s, x) => s + x.not_answered, 0) }
    L.push(front(`Model: ${m.name}`, `${m.name} as used on this site: what it is and its licence, every job we gave it, its scores per task with the items it got wrong, tokens, cost, latency, and what we would use it for.`, null))
    L.push(`# ${m.name}`, '', kept, '', `**${NOT}** One of [the models](index.md) in [Other models, measured](../index.md). The id we call it by: \`${m.id}\` (through OpenRouter).`, '')
    L.push('## What it is', '')
    L.push(`- **Publisher:** ${li.publisher || 'not recorded'}.`)
    L.push(m.open_weight ? `- **Open weights:** yes. The weights: [${m.weights.replace('https://huggingface.co/', '')}](${m.weights}) on Hugging Face (the address OpenRouter's model list gives for it).` : `- **Open weights:** no. It is used only through its provider's API (here by way of OpenRouter).`)
    if (l) L.push(`- **Licence, as its publisher states it:** ${l.name}${l.link ? ` ([the text](${l.link}))` : ''}. ${li.stated || ''} Read ${LIC.read_utc.slice(0, 16).replace('T', ' ')} UTC${li.source ? ` at [${li.source.replace(/^https:\/\//, '').split('/').slice(0, 3).join('/')}](${li.source})` : ''}.`, `- **What that licence allows:** ${l.allows}`)
    else L.push(`- **Licence:** ${li.stated || 'the provider\'s commercial terms; no weights are published.'}`)
    L.push(`- **Reasoning:** ${rows.map(r => `\`${r.id}\`: ${r.reasoning}`).join('; ') || m.reasoning}.`, `- **List price** (OpenRouter, read ${roster.read_utc.slice(0, 16).replace('T', ' ')} UTC): ${m.usd_per_million_in} US dollars per million tokens in, ${m.usd_per_million_out} out. Listed there since ${m.listed}. Our grouping: ${group(m)}.`, '')
    L.push('## Its use here, in one line', '', `**${tot.asked} runs** on ${ran.filter(([t]) => rows.some(r => out.tasks[t].models[r.id])).length} tasks, **${tot.right} right**; ${tot.na} not answered (malformed, cut off, refused or a provider error); **${tot.tin.toLocaleString('en-GB')} tokens in, ${tot.tout.toLocaleString('en-GB')} out; ${usd(tot.cost)} US dollars**. Source: [results.json](../results.json), made ${stamp.slice(0, 16).replace('T', ' ')} UTC. It has written nothing on this site: every call was a test.`, '')
    L.push('## Every job we gave it', '', '| Task | Setting | Runs right | Items right, run by run | Malformed | Cut off | Refused | Errors | Tokens in | Tokens out | Cost, USD | Per item, USD | Median s | p90 s |', '|---|---|---|---|---|---|---|---|---|---|---|---|---|---|')
    for (const [t, ti] of ran) for (const r of rows) { const x = out.tasks[t].models[r.id]; if (x) L.push(`| [${ti}](../${t}.md) | ${r.reasoning.replace(/ \(.*/, '')} | **${x.right}/${x.asked}** | ${spread(x)} | ${x.malformed} | ${x.cut_off} | ${x.refused} | ${x.errors} | ${x.tokens_in} | ${x.tokens_out} | ${usd(x.cost_usd)} | ${usd(x.cost_per_item_usd)} | ${sec(x.latency_ms_median)} | ${sec(x.latency_ms_p90)} |`) }
    L.push('', '## What we would use it for', '', `*Ours, a hypothesis from these runs.* ${notes.per_model?.[m.id] || 'Not yet written.'}`, '')
    L.push('## The items it got wrong', '', 'First run of each setting; the item links to its page, where every model\'s answer is.', '')
    let any = false
    for (const [t, ti] of ran) for (const r of rows) { const res = DOC[t].res[r.id]; if (!res) continue
        const wrong = DOC[t].items.items.filter(it => res.answers[it.id] && !res.answers[it.id].right); if (!wrong.length) continue; any = true
        L.push(`**${ti}, ${r.reasoning.replace(/ \(.*/, '')}** (${wrong.length} of ${DOC[t].items.items.filter(it => res.answers[it.id]).length}):`, '', '| Item | Scored against | It answered | Result |', '|---|---|---|---|')
        for (const it of wrong.slice(0, 40)) { const a = res.answers[it.id]; L.push(`| [${it.id}](../${t}.md#${it.id.toLowerCase()}) | ${cell(t === 'translate' ? `figures ${it.gold.figures.join(' ')}; units ${it.gold.units.join(' ')}` : t === 'label' ? it.gold.label : JSON.stringify(t === 'warnings-in-force' ? it.gold.in_force : it.gold)).slice(0, 300)} | ${cell(show(t, DOC[t].items, a)).slice(0, 400)} | ${mark(a)} |`) }
        L.push('') }
    if (!any) L.push('None in the first runs.', '')
    W(`models/models/${slug(m.id)}.md`, L.join('\n'))
}
{
    const L = [front('The models, one by one', 'A page for each model used on this site, the open-weight ones first: who publishes it, its licence, every job we gave it, its scores, tokens, cost and latency.', null)]
    L.push('# The models, one by one', '', kept, '', `**${NOT}** Part of [Other models, measured](../index.md).`, '', `Each model's page says what it is (its publisher, whether its weights are open, its licence as the publisher states it and what that allows), every job we gave it here, its scores with the items it got wrong, its tokens, cost and latency, and what we would use it for. "Open-weight" means OpenRouter's model list gives a Hugging Face address for the weights; the licence is read at that address (${LIC.read_utc.slice(0, 16).replace('T', ' ')} UTC), and a licence tag is not legal advice: the linked text decides. Figures: [results.json](../results.json), made ${stamp.slice(0, 16).replace('T', ' ')} UTC.`, '')
    const table = (title, list) => { L.push(`## ${title}`, '', '| Model | Publisher | Licence | Runs right, all settings | Not answered | Tokens in | Tokens out | Cost, USD |', '|---|---|---|---|---|---|---|---|')
        for (const m of list) { const o = roster.models.filter(r => baseOf(r.id) === m.id).map(r => out.overall[r.id]).filter(Boolean); if (!o.length) continue; const s = k => o.reduce((a, x) => a + x[k], 0)
            L.push(`| [${m.name}](${slug(m.id)}.md) \`${m.id}\` | ${LIC.models[m.id]?.publisher || ''} | ${lic(m)?.name || 'commercial terms; no weights'} | ${s('right')}/${s('asked')} | ${s('not_answered')} | ${s('tokens_in')} | ${s('tokens_out')} | ${usd(s('cost_usd'))} |`) }
        L.push('') }
    table('Open-weight, small', bases.filter(m => m.open_weight && m.size === 'small')); table('Open-weight, large', bases.filter(m => m.open_weight && m.size === 'large')); table('Commercial (API only)', bases.filter(m => !m.open_weight))
    W('models/models/index.md', L.join('\n'))
}
console.log('report written', stamp, 'calls', today.calls, 'usd', today.cost_usd, 'team', led.team_today_usd)
