#!/usr/bin/env node
// The eval items (incident.models@web-summit.dinis, WS-214): node tools/models-items.mjs
// Writes models/evals/<task>/items.json for the four first tasks. Every gold answer is COPIED from the data room
// (incidents/2026-11-10-storm-charles/data/), never written by hand; each item says which file and record it came from.
// Inputs are official text we may keep (IPMA's CAP messages and communiqué, the government's declaration, short quoted
// lines from a decider's own page) or our own timeline rows. No press text.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const INC = '2026-11-10-storm-charles', DATA = path.join(REPO, 'incidents', INC, 'data')
const R = f => JSON.parse(fs.readFileSync(path.join(DATA, f), 'utf8'))
const BY = 'incident.models@web-summit.dinis'
const now = new Date().toISOString().slice(0, 19) + 'Z'
const z = t => new Date(t).toISOString().slice(0, 19) + 'Z'          // 2026-11-11T12:00:00+00:00 -> 2026-11-11T12:00:00Z
const zmin = t => t == null ? null : (/Z$/.test(t) && t.length === 17 ? t : new Date(t).toISOString().slice(0, 16) + 'Z')
function out(task, doc) {
    const dir = path.join(REPO, 'models', 'evals', task); fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(path.join(dir, 'items.json'), JSON.stringify({ task, by: BY, updated: now, ...doc }, null, 1) + '\n')
    console.log(task, doc.items.length, 'items')
}
const capText = m => [`identifier: ${m.identifier}`, `sent: ${m.sent_utc}`, `msgType: ${m.msg_type}`, `event: ${m.event_pt}`, m.severity ? `severity: ${m.severity}` : null,
    `onset: ${m.onset_utc}`, `expires: ${m.expires_utc}`, `areaDesc: ${(m.areas || ['Lisboa']).join('; ')}`, m.description_pt ? `description: ${m.description_pt}` : null].filter(Boolean).join('\n')

const cap = R('weather/cap.json'), graph = R('decisions/graph.json'), signals = R('signals.json'), comm = R('weather/communiques.json'), warn = R('weather/warnings.json')
const TYPE = { 'Precipitação': 'rain', 'Vento': 'wind', 'Agitação Marítima': 'coastal_event', 'Trovoada': 'thunderstorm' }
const LEVEL = { Amarelo: 'yellow', Laranja: 'orange', Vermelho: 'red' }

// ---- (a) extract-warning: a CAP message's fields as kept in cap.json -> type, level, area, start, end
{
    const all = [...cap.lisbon_messages.map(m => ({ ...m, areas: ['Lisboa'], from: 'lisbon_messages' })), ...cap.other_messages.filter(m => m.areas?.length === 1).map(m => ({ ...m, from: 'other_messages' }))]
    const seen = new Set(), pick = []
    // one of each (event, area) first, newest first, then alternate Lisbon and elsewhere up to 18
    for (const m of all.slice().sort((a, b) => b.sent_utc.localeCompare(a.sent_utc))) {
        const k = m.event_pt + '|' + m.areas[0]; if (seen.has(k)) continue; seen.add(k); pick.push(m)
    }
    const lis = pick.filter(m => m.from === 'lisbon_messages').slice(0, 9), oth = pick.filter(m => m.from === 'other_messages').slice(0, 9)
    const items = [...lis, ...oth].map((m, i) => {
        const mm = m.event_pt.match(/^Aviso (\S+) (.+)$/)
        return { id: `w${String(i + 1).padStart(2, '0')}`, input: capText(m), gold: { type: TYPE[mm[2]], level: LEVEL[mm[1]], area: m.areas[0], start_utc: z(m.onset_utc), end_utc: z(m.expires_utc) },
            gold_from: `incidents/${INC}/data/weather/cap.json ${m.from} identifier ${m.identifier}`, source: m.source, read_utc: m.read_utc }
    })
    out('extract-warning', {
        about: "Extract a warning from one of IPMA's CAP messages (Common Alerting Protocol, read through MeteoAlarm's public feed). The input is the message's fields as the meteorologist keeps them in cap.json (Portuguese event and description, times with offsets); the gold answer is the same record, normalised: type and level in English, times in UTC with Z. 'sent' is in the input and is not the start.",
        fields: ['type', 'level', 'area', 'start_utc', 'end_utc'], scoring: 'each field exact; an item is right when all five are',
        publisher_of_the_warnings: 'IPMA (Instituto Português do Mar e da Atmosfera), via MeteoAlarm', items,
    })
}

// ---- (b) extract-decision: a short official passage -> who decided, the hours it covers (null when the text gives no clock hours)
{
    const P = JSON.parse(fs.readFileSync(path.join(REPO, 'models/evals/extract-decision/passages.json'), 'utf8'))
    const edge = id => graph.edges.find(e => e.id === id), msg = id => [...cap.lisbon_messages, ...cap.other_messages].find(m => m.identifier === id)
    const items = P.passages.map((p, i) => {
        let text = p.text, gold, gold_from
        if (p.cap) { const m = msg(p.cap); if (!m) throw new Error('no CAP message ' + p.cap); text = capText(m) }
        if (p.edge) { const e = edge(p.edge); if (!e) throw new Error('no edge ' + p.edge); gold = { decider: e.by, effect_from_utc: zmin(e.effect_from_utc), effect_to_utc: zmin(e.effect_to_utc) }; gold_from = `incidents/${INC}/data/decisions/graph.json edge ${e.id} (by, effect_from_utc, effect_to_utc; label ${e.label})` }
        else { const m = msg(p.cap); gold = { decider: 'ipma', effect_from_utc: zmin(m.onset_utc), effect_to_utc: zmin(m.expires_utc) }; gold_from = `incidents/${INC}/data/weather/cap.json identifier ${m.identifier} (onset, expires; the publisher of the warnings is IPMA)` }
        return { id: `d${String(i + 1).padStart(2, '0')}`, published_at: p.published_at, lang: p.lang, input: text, gold, gold_from, source: p.source, read_utc: p.read_utc, ...(p.note ? { note: p.note } : {}) }
    })
    out('extract-decision', {
        about: "From a short official passage, say who decided and which hours the decision covers. The gold answer is the decision graph's own edge (kept by incident.researcher@): its decider and its effect window, which the graph fills 'only from the source's own words' and leaves null where the source gives no clock hours. So most answers here are null on purpose: the test is also whether a model invents hours.",
        fields: ['decider', 'effect_from_utc', 'effect_to_utc'], scoring: "each field exact; an item is right when all three are. The model's one-line 'what' is published and not scored.",
        deciders: graph.nodes.map(n => ({ id: n.id, name: n.name })), items,
    })
}

// ---- (c) label: a timeline row (its text without the leading marker, and its source labels) -> fact / evidence / hypothesis
{
    const strip = t => t.replace(/^analysis \([^)]*\):\s*/i, '').replace(/^\((unofficial[^)]*)\)\s*/i, '').replace(/^(PRIMARY|DECISION|Public):\s*/i, '')
    const ok = r => !/Mastodon|private person/i.test(r.text + r.sources.map(s => s.label).join(' '))
    const rows = signals.items.filter(ok), H = rows.filter(r => r.label === 'hypothesis').slice(0, 7)
    const F = rows.filter(r => r.label === 'fact' && r.kind === 'official').slice(-5).concat(rows.filter(r => r.label === 'fact' && r.kind === 'team').slice(-2))
    const E = rows.filter(r => r.label === 'evidence' && !/["“]/.test(r.text)).slice(-6)
    const items = [...H, ...F, ...E].sort((a, b) => a.id.localeCompare(b.id)).map(r => ({ id: r.id, input: { text: strip(r.text), sources: r.sources.map(s => s.label) }, gold: { label: r.label },
        gold_from: `incidents/${INC}/data/signals.json item ${r.id} (label)`, row: `incidents/${INC}/timeline.html#${r.id}` }))
    out('label', {
        about: "Label a row of our timeline as fact, evidence or hypothesis by this site's rules. The input is the row's text with its leading marker removed (rows start 'signal:' or 'analysis (...)': that would give the answer away) and its source labels. The gold is the row's label in signals.json, which tools/timeline.mjs derives from the lead's markers. Rows that quote the press or point at a private person's post are left out.",
        fields: ['label'], scoring: 'exact', items,
    })
}

// ---- (d) translate: IPMA's Portuguese warning text -> English; the figures and units must survive
{
    const texts = new Map()
    const add = (t, from, source, read) => { if (t && !texts.has(t)) texts.set(t, { from, source, read }) }
    for (const m of [...cap.lisbon_messages, ...cap.other_messages]) add(m.description_pt, `weather/cap.json identifier ${m.identifier} description_pt`, m.source, m.read_utc)
    for (const w of [...warn.lisbon, ...warn.red_and_orange_elsewhere.items]) add(w.text_pt, `weather/warnings.json ${w.area || 'LSB'} ${w.type} ${w.start_utc} text_pt`, warn.source, warn.read_utc)
    const c2 = comm.items[0]
    for (const s of c2.text_pt.split(/(?<=[a-zà-ú0-9]\.) (?=[A-ZÀ-Ú])/).filter(s => /\d/.test(s) && /mm|km\/h|metros|hPa/.test(s) && s.length < 420)) add(s.trim(), `weather/communiques.json "${c2.title}" (one sentence of text_pt)`, c2.source, c2.read_utc)
    const figs = t => (t.match(/\d+(?:[.,]\d+)?/g) || []).map(x => x.replace(',', '.'))
    const units = t => ['km/h', 'mm', 'hPa'].filter(u => t.includes(u)).concat(/metros/.test(t) ? ['metre'] : [])
    const items = [...texts].sort((a, b) => figs(b[0]).length - figs(a[0]).length || a[0].localeCompare(b[0])).slice(0, 20).map(([t, m], i) => ({ id: `t${String(i + 1).padStart(2, '0')}`, input: t,
        gold: { figures: figs(t), units: units(t) }, gold_from: `incidents/${INC}/data/${m.from}: the figures and units of the Portuguese text itself`, source: m.source, read_utc: m.read_utc }))
    out('translate', {
        about: "Translate IPMA's Portuguese warning text to English. There is no reference translation: the check is that every figure of the Portuguese text is in the English one, as digits and no others added, and that each unit is still there (km/h, mm, hPa; 'metros' as metre or meter). A fluent translation that writes 'five' for 5, or drops 13, is wrong here.",
        fields: ['figures', 'units'], scoring: 'the numbers in the answer are the numbers in the source (each as many times, in any order); every unit present; and the answer is not the Portuguese text again', items,
    })
}
