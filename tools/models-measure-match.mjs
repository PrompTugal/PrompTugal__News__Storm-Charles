#!/usr/bin/env node
// Measure the delegated match-fact task (models/delegate.json) against incident.media@'s first-on-each-fact
// (research/media/first-on-each-fact.json): each outlet's first item on each keyed fact, chosen by that desk's ranking with its
// windows and hand-read exclusions. That list is the gold: an item listed under fact F reports F. The models are asked once per
// distinct item (headline or live-blog entry title, its time, the fact list of research/media/facts.json), through
// tools/models-delegate.mjs, as media's own wake asks them. Kept by incident.models@web-summit.dinis, 11 November 2026 (WS-214).
//   node tools/models-measure-match.mjs [--max N] [--dry]
// Scored per model: right (its fact is one the item is listed under), none (it said none), other (it named another fact: the gold
// lists only first items, so an item may also report a fact it was not first on; counted apart, not as right), invalid (no valid
// answer). The desk's own pattern on the same title is scored the same way, for comparison. Ids, urls and fact ids only: no
// headline text and no model text in the output (models/delegated/match-fact-measure.json).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const { delegate, TABLE } = await import(path.join(ROOT, 'tools/models-delegate.mjs'))
const AGENT = 'incident.models@web-summit.dinis'
const args = process.argv.slice(2), opt = (k, d) => { const i = args.indexOf(k); return i < 0 ? d : args[i + 1] }
const MAX = +opt('--max', 1000), DRY = args.includes('--dry')
const J = p => JSON.parse(fs.readFileSync(path.join(ROOT, p), 'utf8'))
const first = J('research/media/first-on-each-fact.json'), facts = J('research/media/facts.json').facts
const OUT = path.join(ROOT, 'models/delegated/match-fact-measure.json')

// the gold: one entry per distinct item (article id, else url plus time), with every fact it is first on
const items = new Map()
for (const f of first.facts) for (const r of f.first_by_outlet || []) {
    const key = r.article || `${r.url}#${r.published}`
    const it = items.get(key) || { id: key, url: r.url, outlet: r.outlet, published: r.published, via: r.via, title: r.title, gold: [] }
    if (!it.gold.includes(f.id)) it.gold.push(f.id)
    items.set(key, it)
}
const patternFacts = a => facts.filter(f => {
    if (!f.pattern || !new RegExp(f.pattern, 'i').test(a.title)) return false
    if (!a.published) return true
    const t = a.published.replace(/\.\d+Z$/, 'Z'), from = f.from || f.primary_time || '', until = f.until || '2026-11-13T00:00:00Z'
    return t >= from && t < until && !(f.not_matches || []).some(n => n.outlet === a.outlet && n.at === t)
}).map(f => f.id)
const score = (fact, gold) => fact == null ? 'invalid' : gold.includes(fact) ? 'right' : fact === 'none' ? 'none' : 'other'

let prev; try { prev = JSON.parse(fs.readFileSync(OUT, 'utf8')) } catch { prev = { items: {} } }
const out = { items: prev.items || {} }
const todo = [...items.values()].filter(it => !out.items[it.id]).slice(0, MAX)
if (DRY) { console.log(`${items.size} distinct items, ${todo.length} to ask (3 calls each)`); process.exit(0) }
for (const it of todo) {
    const r = await delegate({ task: 'match-fact', input: { id: it.id, input: it.title, published_at: it.published, facts: facts.map(f => ({ id: f.id, what: f.what })) }, agent: AGENT, wake: 'measure match-fact' })
    const pat = patternFacts(it)
    out.items[it.id] = { url: it.url, outlet: it.outlet, published: it.published, via: it.via, gold: it.gold,
        pattern: { facts: pat, score: pat.some(p => it.gold.includes(p)) ? 'right' : pat.length ? 'other' : 'none' },
        models: Object.fromEntries(r.models.map(m => [m.model, { fact: m.valid ? m.answer.fact : null, score: score(m.valid ? m.answer.fact : null, it.gold), attempts: m.attempts, ...(m.comparison ? { label: 'commercial, for comparison' } : { label: 'open-weight' }) }])),
        trace_id: r.trace_id, at: r.at, cost_usd: r.cost_usd, calls: r.calls }
    process.stderr.write('.')
}
process.stderr.write('\n')

const all = Object.values(out.items), tally = sel => { const t = { right: 0, none: 0, other: 0, invalid: 0 }; for (const x of all) { const s = sel(x); if (s) t[s]++ } return { ...t, of: all.length, right_rate: all.length ? +(t.right / all.length).toFixed(3) : null } }
const T = TABLE.tasks['match-fact'], models = [...T.models, T.comparison.model]
const both = all.filter(x => T.models.every(m => x.models[m]?.score === 'right')).length
const agreeRight = all.filter(x => { const v = T.models.map(m => x.models[m]?.fact); return v.every(f => f != null && f === v[0]) })
const result = {
    about: "The delegated match-fact task (models/delegate.json) measured against incident.media@'s first-on-each-fact: each outlet's first item on each fact, chosen by that desk's ranking and hand-read exclusions, is the gold. Per model: right (its fact is one the item is first on), none, other (another fact; the gold lists only first items, so some of these may be true), invalid. The desk's own pattern on the same title, for comparison. Ids, urls and fact ids only.",
    by: AGENT, updated: new Date().toISOString().replace(/\.\d+Z$/, 'Z'), label: 'fact', label_note: 'our measurement: counted by tools/models-measure-match.mjs from the files named',
    source: 'research/media/first-on-each-fact.json (gold, incident.media@), research/media/facts.json (fact list and patterns), models/delegate.json (task and models)',
    gold_items: items.size, gold_rows: first.facts.reduce((s, f) => s + (f.first_by_outlet || []).length, 0), gold_updated: first.updated,
    scores: { ...Object.fromEntries(models.map(m => [m, { label: m === T.comparison.model ? 'commercial, for comparison' : 'open-weight', ...tally(x => x.models[m]?.score) }])), 'pattern (incident.media@)': { label: "the desk's own pattern", ...tally(x => x.pattern.score) } },
    open_weight_both_right: both, open_weight_agree: agreeRight.length, open_weight_agree_and_right: agreeRight.filter(x => x.gold.includes(x.models[T.models[0]].fact)).length,
    cost_usd: +all.reduce((s, x) => s + (x.cost_usd || 0), 0).toFixed(6), calls: all.reduce((s, x) => s + (x.calls || 0), 0),
    items: out.items,
}
fs.mkdirSync(path.dirname(OUT), { recursive: true })
fs.writeFileSync(OUT, JSON.stringify(result, null, 1) + '\n')
console.log(JSON.stringify({ gold_items: result.gold_items, scores: result.scores, open_weight_both_right: both, open_weight_agree: result.open_weight_agree, open_weight_agree_and_right: result.open_weight_agree_and_right, cost_usd: result.cost_usd }, null, 1))
