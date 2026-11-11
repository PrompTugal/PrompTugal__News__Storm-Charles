#!/usr/bin/env node
// The delegation at a glance (incident.models@web-summit.dinis, WS-214): from every published hour file of calls (models/calls/index.json)
// and the owners' result files, per collector: delegated calls, cost, failures (not ok), re-asks (A2 steps not valid), loops, and the
// agreement each owner's own check reports. Writes models/delegated/summary.json; text-free.
//   node tools/models-delegated.mjs
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const J = f => { try { return JSON.parse(fs.readFileSync(path.join(REPO, f), 'utf8')) } catch { return null } }
const idx = J('models/calls/index.json'), by = {}
for (const f of idx.files) {
    const d = J(f.path); if (!d) continue
    for (const c of d.calls.filter(c => String(c.task).startsWith('WS-214/delegate/'))) {
        const a = by[c.agent] ||= { calls: 0, ok: 0, failed: 0, cost_usd: 0, tasks: {}, models: {}, loops: new Set(), steps: 0, steps_invalid: 0 }
        a.calls++; c.status === 'ok' ? a.ok++ : a.failed++; a.cost_usd += c.cost_usd || 0
        a.tasks[c.task.split('/').pop()] = (a.tasks[c.task.split('/').pop()] || 0) + 1; a.models[c.model_asked] = (a.models[c.model_asked] || 0) + 1
    }
    for (const e of d.events.filter(e => e.altitude === 'A2')) {
        const a = by[e.runner] ||= { calls: 0, ok: 0, failed: 0, cost_usd: 0, tasks: {}, models: {}, loops: new Set(), steps: 0, steps_invalid: 0 }
        if (e.phase === 'start') a.loops.add(e.unit_id)
        if (e.phase === 'step') { a.steps++; if (e.valid === false) a.steps_invalid++ }
    }
}
const owner = {
    'incident.transport@web-summit.dinis': () => { const g = J('transport/gloss.json'); if (!g) return null; const v = Object.values(g.items); return { file: 'transport/gloss.json', items: v.length, check_passed: v.filter(x => String(x.check).startsWith('passed')).length } },
    'incident.media@web-summit.dinis': () => { const g = J('research/media/models-match.json'); return g ? { file: 'research/media/models-match.json', ...g.totals } : null },
    'incident.sources@web-summit.dinis': () => { const g = J('sources/meteoalarm/data/portugal/models-check.json'); return g ? { file: 'sources/meteoalarm/data/portugal/models-check.json', ...g.totals } : null },
    'incident.models@web-summit.dinis': () => { const g = J('models/delegated/press-decisions.json'); return g ? { file: 'models/delegated/press-decisions.json (for incident.researcher@)', ...g.totals } : null },
}
const now = new Date().toISOString().slice(0, 19) + 'Z'
const collectors = Object.fromEntries(Object.entries(by).map(([k, a]) => [k, { calls: a.calls, failed: a.failed, failure_rate: a.calls ? +(a.failed / a.calls).toFixed(3) : null, cost_usd: +a.cost_usd.toFixed(6), loops: a.loops.size, answers_checked: a.steps, reasked: a.steps_invalid, reask_rate: a.steps ? +(a.steps_invalid / a.steps).toFixed(3) : null, tasks: a.tasks, models: a.models, owner_check: owner[k] ? owner[k]() : null }]))
const out = { about: 'The delegation of collectors\' analysis to open-weight models through OpenRouter, at a glance: per calling agent, delegated calls (tasks WS-214/delegate/*), failures (a call not ok), re-asks (an answer that failed the schema or the task\'s check and was asked again), loops, and the agreement each owner\'s own check reports. From the published call records; text-free.', by: 'incident.models@web-summit.dinis', updated: now, label: 'fact', source: 'models/calls/index.json and the owners\' result files named', collectors }
fs.mkdirSync(path.join(REPO, 'models/delegated'), { recursive: true }); fs.writeFileSync(path.join(REPO, 'models/delegated/summary.json'), JSON.stringify(out, null, 1) + '\n')
console.log(JSON.stringify(Object.fromEntries(Object.entries(collectors).map(([k, v]) => [k.split('@')[0], { calls: v.calls, failed: v.failed, reask: v.reask_rate, usd: v.cost_usd, check: v.owner_check }]))))
