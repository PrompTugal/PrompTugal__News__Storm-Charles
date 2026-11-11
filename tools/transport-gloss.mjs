#!/usr/bin/env node
// An English summary of each new Portuguese operator notice, delegated to open-weight models through OpenRouter
// (proposed by incident.models@web-summit.dinis for incident.transport@web-summit.dinis, 11 November 2026, WS-214; Dinis ~22:00 UTC,
// BRIEF.md: collectors through OpenRouter, open-source models). Run after tools/transport-read.mjs:
//   node tools/transport-gloss.mjs [--max 12] [--dry] [--wake "hourly HH:MM"]
// For each notice in incidents/<id>/data/transport/*.json with Portuguese text (title or header, and excerpt), not CP's (its licence:
// titles, times and links only), it asks tools/models-delegate.mjs (task translate: two open-weight models, plus one commercial model
// for comparison) once per distinct text, caches the result in transport/gloss.json by the text's sha256, and writes beside the
// notice: en: { text, models, label: 'evidence', check, at, trace_id }. The check is this agent's own: every figure of the Portuguese
// is in the English and the two open models give the same figures. A failed check keeps the text out (en.text null, the reason kept).
// The summary is model output: shown as evidence with the models' names, the Portuguese and the link always beside it. Every call is
// in the ledger and published text-free in agents/transport/calls/ (tools/models-calls.mjs).
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { delegate } from './models-delegate.mjs'

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const AGENT = process.env.GLOSS_AGENT || 'incident.transport@web-summit.dinis'
const DIR = path.join(REPO, 'incidents/2026-11-10-storm-charles/data/transport')
const CACHE = path.join(REPO, 'transport/gloss.json')
const SKIP = new Set(['cp'])   // CP: titles, times and links only (its legal notice)
const a = process.argv.slice(2), opt = k => { const i = a.indexOf('--' + k); return i >= 0 ? a[i + 1] : undefined }
const MAX = +(opt('max') || 12), DRY = a.includes('--dry'), WAKE = opt('wake') || process.env.INCIDENT_WAKE || null
const sha = s => crypto.createHash('sha256').update(s).digest('hex')
const figs = t => (String(t).match(/\d+(?:[.,]\d+)?/g) || []).map(x => x.replace(',', '.')).sort()

let cache; try { cache = JSON.parse(fs.readFileSync(CACHE, 'utf8')) } catch { cache = { about: 'English summaries of operator notices by open-weight models (tools/transport-gloss.mjs), by the sha256 of the Portuguese text: evidence, labelled with the models\' names.', by: AGENT, updated: null, items: {} } }
let asked = 0, reused = 0, spent = 0
const now = () => new Date().toISOString().slice(0, 19) + 'Z'
for (const f of fs.readdirSync(DIR).filter(f => f.endsWith('.json')).sort()) {
    const p = path.join(DIR, f), doc = JSON.parse(fs.readFileSync(p, 'utf8')); let changed = false
    for (const op of doc.operators || []) {
        if (SKIP.has(op.id) || !Array.isArray(op.notices)) continue
        for (const n of op.notices) {
            const head = n.title || n.header || '', body = n.excerpt || ''
            if (!body || /Lisbon time$|^Note for /.test(head) && !body) continue
            const text = [/Lisbon time$|^Note for /.test(head) ? '' : head, body].filter(Boolean).join('. ')
            const k = sha(text)
            if (!cache.items[k] && asked < MAX) {
                const r = await delegate({ task: 'translate', input: { id: `${op.id}:${k.slice(0, 8)}`, input: text }, agent: AGENT, wake: WAKE })
                asked++; spent += r.cost_usd
                const open = r.models.filter(m => !m.comparison && m.valid)
                const sameFigs = open.length >= 2 && new Set(open.map(m => JSON.stringify(figs(m.answer.en)))).size === 1
                const allFigs = open.length > 0 && figs(text).every(x => figs(open[0].answer.en).includes(x))
                const pass = sameFigs && allFigs
                cache.items[k] = { at: r.at, trace_id: r.trace_id, text: pass ? open[0].answer.en : null, models: open.map(m => m.model), served: open.map(m => m.model_served),
                    comparison: r.models.filter(m => m.comparison).map(m => ({ model: m.model, label: 'commercial, for comparison', valid: !!m.valid, same_figures: m.valid && open[0] ? JSON.stringify(figs(m.answer.en)) === JSON.stringify(figs(open[0].answer.en)) : null })),
                    check: pass ? 'passed: every figure of the Portuguese is in the English, and both open models give the same figures' : `failed: ${!open.length ? 'no valid answer' : !sameFigs ? 'the open models give different figures' : 'a figure of the Portuguese is missing'}`,
                    cost_usd: r.cost_usd, calls: r.calls }
            } else if (cache.items[k]) reused++
            const c = cache.items[k]; if (!c) continue
            n.en = { text: c.text, label: 'evidence', source: `model summary (${c.models.join(' and ')}), not the operator's words`, check: c.check, at: c.at, trace_id: c.trace_id }
            changed = true
        }
    }
    if (changed && !DRY) fs.writeFileSync(p, JSON.stringify(doc, null, 1) + '\n')
}
cache.updated = now()
if (!DRY) { fs.mkdirSync(path.dirname(CACHE), { recursive: true }); fs.writeFileSync(CACHE, JSON.stringify(cache, null, 1) + '\n') }
if (DRY) console.error(JSON.stringify(cache.items, null, 1))
console.log(JSON.stringify({ agent: AGENT, asked, reused, cost_usd: +spent.toFixed(6), dry: DRY }))
