#!/usr/bin/env node
// Shadow reporting, step 2: from shadow/runs/<date>/<hour>.json (the answers, split and compared by the agent) make the page and its data:
//   shadow/index.md      hour by hour, per question: what a reader was told against what the authorities had said; the leads; the sources
//   shadow/leads.json    every statement marked "ahead": to verify at the primary source (for incident.conductor@ and incident.researcher@)
//   shadow/sources.json  which hosts the engines returned and used, per engine, and whether they are primary bodies
//   shadow/cited.json    every address an answer used, with the hour first seen (for incident.archivist@: the Wayback section)
// (incident.shadow@web-summit.dinis, 11 November 2026, WS-214.)  node tools/shadow-index.mjs   No network, no model call.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'), SH = path.join(ROOT, 'shadow'), AGENT = 'incident.shadow@web-summit.dinis'
const INC = '../incidents/2026-11-10-storm-charles'
const Q = JSON.parse(fs.readFileSync(path.join(SH, 'questions.json'), 'utf8'))
const runs = []
for (const d of fs.readdirSync(path.join(SH, 'runs')).sort()) for (const f of fs.readdirSync(path.join(SH, 'runs', d)).sort()) if (/^\d\d\.json$/.test(f)) runs.push({ file: `runs/${d}/${f}`, ...JSON.parse(fs.readFileSync(path.join(SH, 'runs', d, f), 'utf8')) })
const now = new Date().toISOString().slice(0, 19) + 'Z'
const kept = () => { const d = new Date(); return `${d.getUTCDate()} November ${d.getUTCFullYear()}, ${now.slice(11, 16)} UTC` }

// the bodies that decide or warn (and the organisers and operators, for their own decisions): their own hosts
const PRIMARY = /(^|\.)(ipma\.pt|prociv\.gov\.pt|portugal\.gov\.pt|diariodarepublica\.pt|meteoalarm\.org|websummit\.com|metrolisboa\.pt|lisboa\.pt|amn\.pt|ana\.pt|cp\.pt|fertagus\.pt|carris\.pt|infraestruturasdeportugal\.pt|madeira\.gov\.pt|aemet\.es|usembassy\.gov)$/
const esc = s => String(s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ')
const rowLink = r => /^s-\d{4}T\d{4}[a-z]?$/.test(r) ? `[${r}](${INC}/timeline.md)` : /^data\//.test(r) ? `[${r.split('/').pop()}](${INC}/${r})` : /^[a-z0-9-]+$/.test(r) ? `[${r}](${INC}/data/decisions/graph.json)` : esc(r)
const engName = id => Q.engines.find(e => e.id === id)?.name || id
const answers = runs.flatMap(r => r.answers.map(a => ({ ...a, date: r.date, hour: r.hour_utc, file: r.file })))
const ok = answers.filter(a => a.status === 'ok')
const count = (list, k) => list.reduce((m, x) => { const v = k(x); m[v] = (m[v] || 0) + 1; return m }, {})

// ---- leads
const leads = []
for (const a of ok) for (const s of a.statements) if (s.verdict === 'ahead') leads.push({ id: `${a.date}T${a.hour}.${a.id}.${a.statements.indexOf(s) + 1}`, status: 'to verify at the primary source', statement: s.text, why: s.note || null, near: s.rows, engine: a.engine_name, asked: a.asked, at: a.at, addresses: s.cited.map(n => a.cited.find(c => c.n === n)).filter(Boolean).map(c => c.url || `${c.host} (address withheld)`), run: `shadow/${a.file}` })
fs.writeFileSync(path.join(SH, 'leads.json'), JSON.stringify({ about: 'Leads from shadow reporting: statements an answer engine made that this site\'s record does not hold. Each is to verify at the primary source by incident.researcher@ or the conductor; none is a fact here, and none goes into the timeline from this file. An engine\'s answer is evidence about the engine, not about the storm.', by: AGENT, updated: now, leads }, null, 1) + '\n')

// ---- sources
const hosts = {}
for (const a of ok) for (const c of a.cited) { const h = hosts[c.host] ||= { host: c.host, primary: PRIMARY.test(c.host), returned: 0, used: 0, by_engine: {} }; h.returned++; if (c.used) { h.used++; h.by_engine[a.engine] = (h.by_engine[a.engine] || 0) + 1 } }
const hostList = Object.values(hosts).sort((x, y) => y.used - x.used || y.returned - x.returned)
const perEngine = Q.engines.map(e => { const as = ok.filter(a => a.engine === e.id), used = as.flatMap(a => a.cited.filter(c => c.used)); return { engine: e.id, name: e.name, answers: as.length, addresses_used: used.length, primary_used: used.filter(c => PRIMARY.test(c.host)).length, answers_citing_a_primary: as.filter(a => a.cited.some(c => c.used && PRIMARY.test(c.host))).length, answers_with_no_address: as.filter(a => !a.cited.some(c => c.used)).length } }).filter(e => e.answers)
fs.writeFileSync(path.join(SH, 'sources.json'), JSON.stringify({ about: 'Which hosts the answer engines returned and used in their answers, counted over every run. "primary" marks the hosts of the bodies that decide or warn, and of the organisers and operators for their own decisions (the list is in tools/shadow-index.mjs). "used": the answer pointed at the address; "returned": the engine listed it among its search results.', by: AGENT, updated: now, per_engine: perEngine, hosts: hostList }, null, 1) + '\n')

// ---- cited addresses (for the archivist)
const seen = {}
for (const a of ok) for (const c of a.cited) if (c.used && c.url) { const x = seen[c.url] ||= { url: c.url, host: c.host, primary: PRIMARY.test(c.host), first_cited_utc: a.at, times: 0, engines: [], questions: [] }; x.times++; if (a.at < x.first_cited_utc) x.first_cited_utc = a.at; if (!x.engines.includes(a.engine)) x.engines.push(a.engine); if (!x.questions.includes(a.question)) x.questions.push(a.question) }
const citedList = Object.values(seen).sort((x, y) => y.times - x.times || (x.url < y.url ? -1 : 1))
fs.writeFileSync(path.join(SH, 'cited.json'), JSON.stringify({ about: 'Every address an answer engine pointed at in an answer we kept (social-network addresses left out), with the time it was first cited to a reader. For incident.archivist@: candidates for capture in the Wayback section. Not read or verified by the shadow desk: being cited by an engine says nothing about a page.', by: AGENT, updated: now, count: citedList.length, addresses: citedList }, null, 1) + '\n')

// ---- the page
const V = { matches: 'matches', behind: 'behind us', ahead: 'ahead: a lead', contradicts: 'contradicts', unsupported: 'unsupported' }
const totals = count(ok.flatMap(a => a.statements), s => s.verdict), nSt = ok.reduce((n, a) => n + a.statements.length, 0)
const spent = runs.reduce((s, r) => s + (r.spent_usd || 0), 0)
let md = `---
title: Shadow reporting: what the answer engines told a reader
summary: Every hour we ask answer engines with live search what a reader would ask about Storm Charles, keep what they say as data, and compare each statement with this site's record. An engine's answer is evidence about the engine, not about the storm.
---
# Shadow reporting: what the answer engines told a reader

> Kept by ${AGENT}, ${kept()}

**Not a warning service.** For warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). Nothing below is a forecast or advice of ours, and nothing an engine said is a fact here.

## What this is

A member of the public no longer only reads the news: they ask an answer engine. So every hour we ask a fixed set of questions, in Portuguese and English, exactly as a reader would ([questions.json](questions.json)), keep each answer as data, split it into checkable statements **in our own words**, and compare every statement with what this site holds from the bodies that decide and warn ([the timeline](${INC}/timeline.md), [the decision graph](${INC}/data/decisions/graph.json), [the warnings](${INC}/data/weather/warnings.json)).

The idea is the SGit Newsroom's: "The shadow of an article is evidence. Who cites it, what they quote, what they say it says", and "A shadow is not the article" ([Sources and their shadows](https://newsroom.sgit.ai/articles/sources-and-shadows.html), Dinis Cruz, 25 October 2026). Here the shadow is the one an answer engine casts of the authorities' words: **an engine's answer is evidence about the engine, not about the storm.** A statement we do not hold becomes a *lead* to verify at the primary source; it never enters the timeline from here.

| Label | Meaning |
|---|---|
| **matches** | our record holds the same, from the row named |
| **behind us** | our record holds something newer or more exact that the answer missed |
| **ahead: a lead** | not in our record: to verify at the primary source |
| **contradicts** | our record, or the calendar, says otherwise |
| **unsupported** | outside our record, general information, or an omission we note |

So far: **${runs.filter(r => r.answers.length).length}** hour(s) asked${runs.some(r => r.paused && !r.answers.length) ? `, ${runs.filter(r => r.paused && !r.answers.length).length} paused (the account that pays the engines was out of credit: a gap, not silence)` : ''}, **${ok.length}** answers, **${nSt}** statements: ${Object.keys(V).map(k => `${totals[k] || 0} ${V[k]}`).join(', ')}. Spent on the engines: ${spent.toFixed(2)} US dollars (the day's limit is 1). Data: [runs/](runs/) (one file per hour), [leads.json](leads.json), [sources.json](sources.json), [cited.json](cited.json).

`
// findings written by the agent, kept beside the runs
const notes = path.join(SH, 'findings.md'); if (fs.existsSync(notes)) md += fs.readFileSync(notes, 'utf8').slice(fs.readFileSync(notes, 'utf8').indexOf('\n## ')).trim() + '\n\n'   // from its first section: the title and the kept-by line are the page's own

md += `## Hour by hour: what a reader was told, against what the authorities had said\n\nTimes are UTC (Lisbon is on UTC in November). "The record" is what the authorities had said by our files at the minute of asking.\n\n`
for (const q of Q.questions.filter(q => q.set === 'fixed')) {
    md += `### ${q.ask.map(x => `"${x.text}"`).join(' · ')}\n\n| Asked | Engine | What the reader was told (our words) | Statements | The record at that minute |\n|---|---|---|---|---|\n`
    for (const r of runs) {
        const as = r.answers.filter(a => a.question === q.id)
        if (!as.length) { if (r.paused) md += `| ${r.date.slice(8)} Nov, ${r.hour_utc}:00 | none | not asked: ${esc(r.paused)} | none | |\n`; continue }
        const rec = r.record?.[q.id]
        as.forEach((a, i) => {
            const c = count(a.statements, s => s.verdict), cs = Object.keys(V).filter(k => c[k]).map(k => `${c[k]} ${V[k]}`).join(', ')
            md += `| ${r.date.slice(8)} Nov, ${a.at.slice(11, 16)} | ${esc(engName(a.engine))} (${a.lang}) | ${a.status === 'ok' ? esc(a.told || '') : 'no answer: ' + esc(a.status)} | ${cs || 'none'} | ${i === 0 && rec ? esc(rec.text) + ' ' + rec.rows.map(rowLink).join(', ') : i === 0 ? '' : '〃'} |\n`
        })
    }
    md += '\n'
}
md += `## Zoom in: one decision at a time\n\nQuestions about single decisions in [the graph](${INC}/data/decisions/graph.json), asked in English.\n\n| Asked | Question | Decision | What the reader was told (our words) | Statements | The record at that minute |\n|---|---|---|---|---|---|\n`
for (const r of runs) for (const a of r.answers) { const q = Q.questions.find(x => x.id === a.question); if (!q || q.set !== 'zoom') continue; const c = count(a.statements, s => s.verdict), rec = r.record?.[q.id]; md += `| ${r.date.slice(8)} Nov, ${a.at.slice(11, 16)} | ${esc(a.asked)} (${esc(engName(a.engine))}) | ${rowLink(q.edge)} | ${esc(a.told || '')} | ${Object.keys(V).filter(k => c[k]).map(k => `${c[k]} ${V[k]}`).join(', ')} | ${rec ? esc(rec.text) + ' ' + rec.rows.map(rowLink).join(', ') : ''} |\n` }

md += `\n## Where an answer and the record part\n\nEvery statement that is behind us or contradicts the record, newest first. Each is about the engine.\n\n| Asked | Engine | The statement (our words) | Label | Against |\n|---|---|---|---|---|\n`
for (const a of [...ok].reverse()) for (const s of a.statements) if (s.verdict === 'behind' || s.verdict === 'contradicts') md += `| ${a.at.slice(11, 16)} | ${esc(engName(a.engine))} (${a.lang}): "${esc(a.asked)}" | ${esc(s.text)} | ${V[s.verdict]} | ${esc(s.note || '')} ${s.rows.map(rowLink).join(', ')} |\n`

md += `\n## Leads: to verify at the primary source\n\n**Hypotheses about where to look, not facts.** For incident.conductor@ and incident.researcher@; none is in the timeline. Data: [leads.json](leads.json).\n\n| Seen | The statement (our words) | Why it is a lead | Addresses the engine gave (not read by us) |\n|---|---|---|---|\n`
for (const l of leads) md += `| ${l.at.slice(11, 16)}, ${esc(l.engine)} | ${esc(l.statement)} | ${esc(l.why || '')} | ${l.addresses.map((u, i) => /^https?:/.test(u) ? `[${new URL(u).hostname.replace(/^www\./, '')}](${u})` : esc(u)).join(', ')} |\n`

md += `\n## Which sources the engines lean on\n\n| Engine | Answers | Addresses used | Of them, a primary body's own page | Answers citing a primary body | Answers with no address |\n|---|---|---|---|---|---|\n`
for (const e of perEngine) md += `| ${esc(e.name)} | ${e.answers} | ${e.addresses_used} | ${e.primary_used} (${e.addresses_used ? Math.round(100 * e.primary_used / e.addresses_used) : 0}%) | ${e.answers_citing_a_primary} | ${e.answers_with_no_address} |\n`
md += `\nThe hosts used most (all engines, all runs; [sources.json](sources.json) has every host):\n\n| Host | Used in answers | Returned by search | Primary body? |\n|---|---|---|---|\n`
for (const h of hostList.filter(h => h.used).slice(0, 25)) md += `| ${h.host} | ${h.used} | ${h.returned} | ${h.primary ? 'yes' : 'no'} |\n`
md += `\n"Primary" means the host of a body that decides or warns, or of the organiser or operator for its own decision (IPMA, ANEPC, the government, Diário da República, Web Summit, the Metro, the city council, the maritime authority and a few more; the list is in [tools/shadow-index.mjs](../tools/shadow-index.mjs)). A count of addresses, not a judgement of anyone's journalism.\n\n## How it is made\n\n- [tools/shadow-ask.mjs](../tools/shadow-ask.mjs) asks through the team's one wrapper for model calls (every call recorded, a daily limit). The engines are named because they are the subject: ${Q.engines.map(e => `${e.name} (\`${e.model}\`, ${e.via})`).join('; ')}.\n- The answers' full text stays in the raw store outside this repository (each answer here carries the record's name and sha256). This page and the run files hold our own words, fragments of a few words in quotes, and the addresses the engines gave.\n- Addresses on social networks are kept as the host only: a post there may be a private person's.\n- The splitting into statements and the labels are the shadow desk's reading, by hand, each hour. A label is our analysis: check it against the row it names.\n- A news API for headlines and links: [news-apis.md](news-apis.md).\n`
fs.writeFileSync(path.join(SH, 'index.md'), md)
console.log(`shadow-index: ${runs.length} runs, ${ok.length} answers, ${nSt} statements, ${leads.length} leads, ${citedList.length} addresses, ${hostList.length} hosts; index.md ${md.length} chars`)
