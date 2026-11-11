#!/usr/bin/env node
// The report (incident.models@web-summit.dinis, WS-214): node tools/models-report.mjs
// From models/evals/<task>/{items,results}.json, models/evals/models.json, models/notes.json and the ledger (outside git):
//   models/results.json         the table: per task and model, accuracy, per field, cost per item, latency, refusals, malformed
//   models/ledger-summary.json  the ledger's daily totals: calls, tokens, dollars, by task, model, agent, status, hour. No prompts.
//   models/index.md, models/<task>.md   the pages (their charts are drawn by app/models/models.js from results.json)
// Run by this agent after a round; the build does not run it (the ledger is not in the repository).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { summary } from './llm.mjs'
import { PROMPTS } from './models-prompts.mjs'

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'), BY = 'incident.models@web-summit.dinis'
const J = f => JSON.parse(fs.readFileSync(path.join(REPO, f), 'utf8')), W = (f, s) => fs.writeFileSync(path.join(REPO, f), s)
const now = new Date(), stamp = now.toISOString().slice(0, 19) + 'Z'
const kept = `> Kept by ${BY}, ${now.getUTCDate()} November 2026, ${stamp.slice(11, 16)} UTC`
const TASKS = [['extract-warning', 'Extract a warning'], ['extract-decision', 'Extract a decision'], ['label', 'Label fact, evidence, hypothesis'], ['translate', 'Translate, figures kept']]
const roster = J('models/evals/models.json'), notes = J('models/notes.json')
const short = id => id.split('/')[1]
const med = a => { const s = a.slice().sort((x, y) => x - y); return s.length ? s[Math.floor((s.length - 1) / 2)] : null }
const p90 = a => { const s = a.slice().sort((x, y) => x - y); return s.length ? s[Math.min(s.length - 1, Math.floor(s.length * 0.9))] : null }
const usd = v => v == null ? '' : v === 0 ? '0' : v < 0.0001 ? v.toFixed(6) : v < 0.01 ? v.toFixed(5) : v.toFixed(4)
const cell = s => String(s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' / ')
const NOT = 'Not a warning service: for warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). Nothing here is a forecast or advice.'

// ---- results.json
const out = { about: "Other models, measured: the same checkable tasks run on several models through tools/llm.mjs (OpenRouter), scored automatically against answers copied from this site's own data room. Small samples: read the counts, not the percentages. accuracy = items with every field right / items asked.", by: BY, updated: stamp, models: roster.models, tasks: {} }
const DOC = {}
for (const [task, title] of TASKS) {
    let items, res; try { items = J(`models/evals/${task}/items.json`); res = J(`models/evals/${task}/results.json`) } catch { continue }
    DOC[task] = { items, res }
    const T = out.tasks[task] = { title, items: items.items.length, fields: items.fields, scoring: items.scoring, items_file: `models/evals/${task}/items.json`, results_file: `models/evals/${task}/results.json`, page: `models/${task}.md`, run_utc: res.updated, models: {} }
    for (const m of roster.models) {
        const A = items.items.map(it => res.models[m.id]?.answers[it.id]).filter(Boolean); if (!A.length) continue
        const kinds = k => A.filter(x => x.kind === k).length, cost = A.reduce((s, x) => s + (x.cost_usd || 0), 0), lat = A.filter(x => x.kind !== 'error' && x.kind !== 'not_run').map(x => x.latency_ms)
        T.models[m.id] = { asked: A.length, right: A.filter(x => x.right).length, accuracy: +(A.filter(x => x.right).length / A.length).toFixed(3),
            by_field: Object.fromEntries(items.fields.map(f => [f, A.filter(x => x.fields?.[f]).length])), answered: kinds('answered'), malformed: kinds('malformed'), cut_off: kinds('cut_off'), refused: kinds('refused'), errors: kinds('error') + kinds('not_run'),
            cost_usd: +cost.toFixed(6), cost_per_item_usd: +(cost / A.length).toFixed(7), latency_ms_median: med(lat), latency_ms_p90: p90(lat), tokens_in: A.reduce((s, x) => s + (x.tokens_in || 0), 0), tokens_out: A.reduce((s, x) => s + (x.tokens_out || 0), 0) }
    }
}
// overall, per model, over the tasks it ran
out.overall = Object.fromEntries(roster.models.map(m => { const R = Object.values(out.tasks).map(t => t.models[m.id]).filter(Boolean); const asked = R.reduce((s, r) => s + r.asked, 0), right = R.reduce((s, r) => s + r.right, 0), cost = R.reduce((s, r) => s + r.cost_usd, 0)
    return [m.id, R.length ? { tasks: R.length, asked, right, accuracy: +(right / asked).toFixed(3), cost_usd: +cost.toFixed(6), cost_per_item_usd: +(cost / asked).toFixed(7), latency_ms_median: med(R.map(r => r.latency_ms_median)), not_answered: R.reduce((s, r) => s + r.malformed + r.cut_off + r.refused + r.errors, 0) } : null] }).filter(([, v]) => v))
W('models/results.json', JSON.stringify(out, null, 1) + '\n')

// ---- ledger-summary.json (every day the ledger has; no prompt or answer text is in the ledger at all)
const LEDGER_DIR = process.env.INCIDENT_LEDGER_DIR || path.join(process.env.HOME, '.incident-ledger')
const days = (fs.existsSync(LEDGER_DIR) ? fs.readdirSync(LEDGER_DIR) : []).filter(f => /^\d{4}-\d\d-\d\d\.jsonl$/.test(f)).map(f => f.slice(0, 10)).sort()
const round = o => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, { ...v, cost_usd: +v.cost_usd.toFixed(6) }]))
const led = { about: "The model ledger's daily totals: every model call the incident team made through tools/llm.mjs, counted. One ledger line per call (when, task, agent, model asked and served, tokens, the cost the provider reported, latency, status); the lines and the raw requests and responses are kept outside git. No prompt or answer text here. The models named are the third-party models that were called.", by: BY, updated: stamp, currency: 'USD', source: 'tools/llm.mjs --summary (the ledger at ~/.incident-ledger/<day>.jsonl in this agent\'s session)',
    note: 'A ledger lives in the session that made the calls: this file counts the calls made through this agent\'s wrapper. Other agents call through it by asking this agent (agents/models/ask.md).',
    days: days.map(d => { const s = summary(d); return { ...s, by_model: round(s.by_model), by_agent: round(s.by_agent), by_task: round(s.by_task), by_status: round(s.by_status), by_hour: round(s.by_hour) } }) }
led.total = { calls: led.days.reduce((s, d) => s + d.calls, 0), cost_usd: +led.days.reduce((s, d) => s + d.cost_usd, 0).toFixed(6), tokens_in: led.days.reduce((s, d) => s + d.tokens_in, 0), tokens_out: led.days.reduce((s, d) => s + d.tokens_out, 0) }
W('models/ledger-summary.json', JSON.stringify(led, null, 1) + '\n')
const today = led.days.at(-1) || { calls: 0, cost_usd: 0, cap_usd: 5, tokens_in: 0, tokens_out: 0, by_task: {}, by_model: {}, by_agent: {} }

// ---- the pages
const mark = a => !a ? '' : a.right ? 'right' : a.kind === 'answered' ? '**wrong**' : `**${a.kind.replace('_', ' ')}**`
const group = m => m.open_weight ? `open-weight, ${m.size}` : `commercial, ${m.size}`
const front = (title, summ, mount) => `---\ntitle: ${title}\nsummary: ${summ}\n${mount ? `mount: ${mount}\nhead: <link rel="stylesheet" href="../app/models/models.css"><script src="../app/models/models.js" defer></script>\n` : ''}---\n`
const sourceLine = `Source for every figure on this page: [results.json](results.json) (made ${stamp.slice(0, 16).replace('T', ' ')} UTC from the runs below) and [ledger-summary.json](ledger-summary.json).`

{   // index
    const L = []
    L.push(front('Other models, measured', 'The same checkable tasks, taken from this site\'s own verified data, run on open-weight and commercial models: accuracy, cost per item, latency, refusals, malformed answers, and the spend.', '<div id="models" data-view="index" data-base="./"><p class="meta">The charts are drawn in the browser from <a href="results.json">results.json</a>; the same figures are in the tables below.</p></div>'))
    L.push('# Other models, measured', '', kept, '', `**${NOT}**`, '')
    L.push('## The answer to "have we started using other models?"', '')
    L.push(`Yes. On ${stamp.slice(0, 10)} the team's wrapper made **${today.calls} model calls** to **${Object.keys(today.by_model).length} third-party models** and spent **${usd(today.cost_usd)} US dollars** of the day's ${today.cap_usd} dollar cap (${today.tokens_in.toLocaleString('en-GB')} tokens in, ${today.tokens_out.toLocaleString('en-GB')} out). Source: [ledger-summary.json](ledger-summary.json), written ${stamp.slice(11, 16)} UTC. Before 02:21 UTC on 11 November the ledger held no call.`, '')
    L.push('No model writes anything on this site yet. What follows is a measurement: could these models do a curator\'s small jobs, and at what price.', '')
    L.push('## What we asked', '')
    L.push('| Task | Items | The input | The answer it is scored against |', '|---|---|---|---|')
    for (const [task, title] of TASKS) if (DOC[task]) L.push(`| [${title}](${task}.md) | ${DOC[task].items.items.length} | ${cell(notes.tasks[task].input)} | ${cell(notes.tasks[task].gold)} |`)
    L.push('', 'Every gold answer is copied by `tools/models-items.mjs` from the data room; none was written for the test. Each model got the same instruction, at its own default settings (a model that reasons by default was left to), temperature 0 where the model takes it, 4,000 tokens of room. Scoring is automatic and exact, field by field.', '')
    L.push('## What we got', '', `Right answers out of items asked, per task. ${sourceLine}`, '')
    const ran = TASKS.filter(([t]) => out.tasks[t])
    L.push(`| Model | Kind | ${ran.map(([t, ti]) => `[${ti}](${t}.md)`).join(' | ')} | All | Not answered | Cost per item, USD | Median latency, s |`, `|---|---|${ran.map(() => '---').join('|')}|---|---|---|---|`)
    for (const m of roster.models) { const o = out.overall[m.id]; if (!o) continue
        L.push(`| \`${m.id}\` | ${group(m)} | ${ran.map(([t]) => { const r = out.tasks[t].models[m.id]; return r ? `${r.right}/${r.asked}` : '' }).join(' | ')} | **${o.right}/${o.asked}** | ${o.not_answered} | ${usd(o.cost_per_item_usd)} | ${(o.latency_ms_median / 1000).toFixed(1)} |`) }
    L.push('', '"Not answered" counts answers that were not the JSON asked for, were cut off at the token limit, were refusals, or failed at the provider. Latency is the median over a task\'s items, then the median over tasks, measured from this session through OpenRouter (it includes their routing).', '')
    L.push('**How to read it.** ' + notes.how_to_read, '')
    L.push('## What we would use each for', '', '*Our reading of the table: a hypothesis, from small samples, to be re-run as the item sets grow.*', '')
    for (const u of notes.use) L.push(`- **${u.job}**: ${u.pick} ${u.why}`)
    L.push('', '## What the models tell us about our own data', '', notes.own_data.replace(/\bs-\d{4}T\d{4}[a-z]?\b/g, id => `[${id}](../incidents/2026-11-10-storm-charles/timeline.md#${id})`).replace('on the label page', 'on [the label page](label.md)'), '')
    L.push('## The spend', '', `From the ledger's summary ([ledger-summary.json](ledger-summary.json), ${stamp.slice(0, 16).replace('T', ' ')} UTC). Costs are what OpenRouter reported for each call.`, '')
    L.push('| By task | Calls | Tokens in | Tokens out | USD |', '|---|---|---|---|---|')
    for (const [k, v] of Object.entries(today.by_task).sort((a, b) => b[1].cost_usd - a[1].cost_usd)) L.push(`| \`${k}\` | ${v.calls} | ${v.tokens_in} | ${v.tokens_out} | ${usd(v.cost_usd)} |`)
    L.push(`| **all** | **${today.calls}** | **${today.tokens_in}** | **${today.tokens_out}** | **${usd(today.cost_usd)}** |`, '')
    L.push('| By model | Calls | Tokens in | Tokens out | USD |', '|---|---|---|---|---|')
    for (const [k, v] of Object.entries(today.by_model).sort((a, b) => b[1].cost_usd - a[1].cost_usd)) L.push(`| \`${k}\` | ${v.calls} | ${v.tokens_in} | ${v.tokens_out} | ${usd(v.cost_usd)} |`)
    L.push('', '| By agent | Calls | USD |', '|---|---|---|')
    for (const [k, v] of Object.entries(today.by_agent)) L.push(`| ${k} | ${v.calls} | ${usd(v.cost_usd)} |`)
    L.push('', notes.more_would_buy, '')
    L.push('## The models', '', `Read from [OpenRouter's public model list](${roster.source}) at ${roster.read_utc.slice(0, 16).replace('T', ' ')} UTC. "Open-weight" here means that list gives a Hugging Face address for the weights.`, '')
    L.push('| Model | Name | Kind | Weights | List price in, out (USD per million tokens) |', '|---|---|---|---|---|')
    for (const m of roster.models) L.push(`| \`${m.id}\` | ${cell(m.name)} | ${group(m)} | ${m.weights ? `[Hugging Face](${m.weights})` : 'not published'} | ${m.usd_per_million_in}, ${m.usd_per_million_out} |`)
    L.push('', '## How it is kept', '', '- Every call goes through [`tools/llm.mjs`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/blob/dev/tools/llm.mjs): one ledger line per call, the raw request and response in a store outside git (an encrypted vault), a daily cap.', '- The items: `models/evals/<task>/items.json`. Each model\'s parsed answers: `models/evals/<task>/results.json` (each with the name and sha256 of its raw record). The roster: [models.json](evals/models.json).', '- Run again: `node tools/models-items.mjs && node tools/models-run.mjs && node tools/models-report.mjs`.', '- For agents: the table is [results.json](results.json); the spend is [ledger-summary.json](ledger-summary.json).', '- Asking a model from another desk: [agents/models/ask.md](../agents/models/ask.md).', '')
    W('models/index.md', L.join('\n'))
}
for (const [task, title] of TASKS) {
    if (!DOC[task]) continue
    const { items, res } = DOC[task], T = out.tasks[task], L = [], ms = roster.models.filter(m => T.models[m.id])
    L.push(front(`Models: ${title.toLowerCase()}`, `${items.items.length} items from the data room, ${ms.length} models: every item, the answer it is scored against, and each model's answer marked right or wrong.`, `<div id="models" data-view="task" data-task="${task}" data-base="./"><p class="meta">The chart is drawn in the browser from <a href="results.json">results.json</a>; the same figures are in the table below.</p></div>`))
    L.push(`# ${title}`, '', kept, '', `**${NOT}** Part of [Other models, measured](index.md).`, '', items.about, '', `Scoring: ${items.scoring}. Run ${res.updated.slice(0, 16).replace('T', ' ')} UTC. ${sourceLine}`, '')
    L.push('## The instruction', '', 'The same for every model (the item follows it as the user\'s message):', '', '```', PROMPTS[task](items.items[0], items)[0].content, '```', '')
    L.push('## The table', '', `| Model | Kind | Right | ${items.fields.map(f => `\`${f}\``).join(' | ')} | Malformed | Cut off | Refused | Errors | Cost per item, USD | Median latency, s | p90, s |`, `|---|---|---|${items.fields.map(() => '---').join('|')}|---|---|---|---|---|---|---|`)
    for (const m of ms) { const r = T.models[m.id]; L.push(`| \`${m.id}\` | ${group(m)} | **${r.right}/${r.asked}** | ${items.fields.map(f => r.by_field[f]).join(' | ')} | ${r.malformed} | ${r.cut_off} | ${r.refused} | ${r.errors} | ${usd(r.cost_per_item_usd)} | ${(r.latency_ms_median / 1000).toFixed(1)} | ${(r.latency_ms_p90 / 1000).toFixed(1)} |`) }
    L.push('', notes.tasks[task].reading ? `**Reading (ours, a hypothesis):** ${notes.tasks[task].reading}` : '', '')
    L.push('## Item by item', '', `| Item | Right | ${ms.map(m => short(m.id)).join(' | ')} |`, `|---|---|${ms.map(() => '---').join('|')}|`)
    for (const it of items.items) { const A = ms.map(m => res.models[m.id].answers[it.id]); L.push(`| [${it.id}](#${it.id.toLowerCase()}) | ${A.filter(a => a?.right).length}/${A.filter(Boolean).length} | ${A.map(a => !a ? '' : a.right ? 'right' : '**no**').join(' | ')} |`) }
    L.push('')
    const show = (a) => !a ? '' : a.answer ? (task === 'translate' ? a.answer.en : task === 'label' ? a.answer.label : JSON.stringify(Object.fromEntries(Object.entries(a.answer).filter(([k]) => items.fields.includes(k) || k === 'what')))) : a.said ? `(said) ${a.said}` : a.error ? `(error) ${a.error}` : ''
    for (const it of items.items) {
        L.push(`### ${it.id}`, '')
        const input = typeof it.input === 'string' ? it.input : `${it.input.text}\nSource(s): ${it.input.sources.join(' ; ')}`
        L.push('```', (it.published_at ? `Published at: ${it.published_at}\n\n` : '') + input, '```', '')
        L.push(`Scored against: \`${JSON.stringify(it.gold)}\`, from \`${it.gold_from}\`.${it.source ? ` Source of the text: [${it.source.replace(/^https:\/\//, '').split('/')[0]}](${it.source}), read ${String(it.read_utc).slice(0, 16).replace('T', ' ')} UTC.` : ''}${it.row ? ` The row: [${it.id}](../${it.row}).` : ''}${it.note ? ` Note: ${it.note}.` : ''}`, '')
        L.push('| Model | Answer | Result |', '|---|---|---|')
        for (const m of ms) { const a = res.models[m.id].answers[it.id]; if (a) L.push(`| \`${short(m.id)}\` | ${cell(show(a)).slice(0, 700)} | ${mark(a)}${a.kind === 'answered' && !a.right ? ` (${Object.entries(a.fields).filter(([, v]) => !v).map(([k]) => k).join(', ')})` : ''} |`) }
        L.push('')
    }
    W(`models/${task}.md`, L.join('\n'))
}
console.log('report written', stamp, 'calls', today.calls, 'usd', today.cost_usd)
