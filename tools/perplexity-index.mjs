#!/usr/bin/env node
// Perplexity as a research tool, step 3: from the checked run files, the scorecard, the leads and the page
// (incident.perplexity@web-summit.dinis, 11 November 2026, WS-214).
//   node tools/perplexity-index.mjs            writes research/perplexity/scorecard.json, leads.json and index.md
// Run by the agent after a round and committed (not a build generator: it writes tracked files). The prose of the page
// ("what it is good for") is kept in research/perplexity/notes.md and placed in the page as written.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const AGENT = 'incident.perplexity@web-summit.dinis'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'), P = path.join(ROOT, 'research/perplexity')
const now = new Date(), iso = now.toISOString().slice(0, 19) + 'Z'
const MON = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const kept = `${now.getUTCDate()} ${MON[now.getUTCMonth()]} ${now.getUTCFullYear()}, ${iso.slice(11, 16)} UTC`
const runs = []
for (const d of fs.readdirSync(path.join(P, 'runs')).sort()) for (const f of fs.readdirSync(path.join(P, 'runs', d)).sort((a, b) => parseInt(a) - parseInt(b))) if (f.endsWith('.json')) runs.push({ file: `runs/${d}/${f}`, ...JSON.parse(fs.readFileSync(path.join(P, 'runs', d, f), 'utf8')) })

export const CHECKS = {
    primary: { label: 'confirmed at a primary source', bucket: 'confirmed' }, press: { label: 'press only', bucket: 'press' },
    'not-found': { label: 'not found at the address cited', bucket: 'unsupported' }, 'no-address': { label: 'no address given', bucket: 'unsupported' },
    wrong: { label: 'wrong', bucket: 'wrong' }, held: { label: 'not checked: the site is on hold', bucket: 'unchecked' }, unreadable: { label: 'not checked: the address refused our reader or did not render', bucket: 'unchecked' }, 'said-none': { label: 'the engine said it found none', bucket: 'none_found' },
}
const zero = () => ({ asks: 0, statements: 0, confirmed: 0, press: 0, unsupported: 0, wrong: 0, none_found: 0, unchecked: 0, addresses: 0, addresses_primary: 0, addresses_press: 0, addresses_aggregator: 0, addresses_other: 0, addresses_not_requested: 0, cost_usd: 0, latency_ms: [], tokens_in: 0, tokens_out: 0 })
function add(t, q, run) {
    t.asks++; t.cost_usd += q.cost_usd || 0; t.latency_ms.push(q.latency_ms); t.tokens_in += q.tokens_in || 0; t.tokens_out += q.tokens_out || 0
    for (const s of q.statements) { const b = CHECKS[s.check]?.bucket || 'unchecked'; if (b === 'none_found') t.none_found++; else { t.statements++; t[b]++ } }
    for (const c of q.cited) { t.addresses++; const cl = c.url ? (run.addresses[c.url]?.class || 'other') : 'social'
        if (cl === 'primary') t.addresses_primary++; else if (cl === 'press') t.addresses_press++; else if (cl === 'aggregator') t.addresses_aggregator++; else if (cl === 'forbidden' || cl === 'social') t.addresses_not_requested++; else t.addresses_other++ }
}
const fin = t => { const l = t.latency_ms; return { ...t, cost_usd: +t.cost_usd.toFixed(6), latency_ms_median: l.length ? [...l].sort((a, b) => a - b)[Math.floor(l.length / 2)] : null, latency_ms: undefined } }
const overall = zero(), byModel = {}, byLang = {}, perRun = []
for (const r of runs) { const t = zero(); for (const q of r.asks) { add(t, q, r); add(overall, q, r); add(byModel[q.model] = byModel[q.model] || zero(), q, r); add(byLang[q.lang] = byLang[q.lang] || zero(), q, r) } perRun.push({ run: r.n, date: r.date, id: r.id, topic: r.topic, file: r.file, opened: Object.values(r.addresses).filter(a => a.opened).length, ...fin(t) }) }

// leads: only statements read by us at a primary body; one lead per id, with every run that pointed to it
const meta = fs.existsSync(path.join(P, 'leads-meta.json')) ? JSON.parse(fs.readFileSync(path.join(P, 'leads-meta.json'), 'utf8')).leads : {}
const leads = {}
for (const r of runs) for (const q of r.asks) for (const s of q.statements) if (s.lead && s.check === 'primary') {
    const L = leads[s.lead] = leads[s.lead] || { id: s.lead, ...(meta[s.lead] || {}), label: 'a lead: read by us at the body\'s own address; for incident.conductor@ to route, not a row in the timeline', address: s.at, read_utc: s.read_utc, sha256: r.addresses[s.at]?.sha256 || null, host_class: 'primary', found_by: [] }
    L.found_by.push({ run: r.file, ask: q.k, model: q.model, lang: q.lang, statement: s.s })
}
const leadList = Object.values(leads)
const refused = runs.flatMap(r => (r.refused || []).map(x => ({ run: r.n, ...x })))
const S = fin(overall)
const scorecard = {
    about: 'How Perplexity (its Sonar models, through OpenRouter and tools/llm.mjs) did as a research tool on the incident team\'s open questions about Storm Charles. A statement is one checkable thing the engine said, in our own words. confirmed: we read it at a primary body\'s own address. press: we read it only in the press or an aggregator. unsupported: not found at the address cited, or no address given. wrong: the address or our record says otherwise. none_found: the engine said it found no such page (counted apart: it is not a claim about the storm). An engine\'s answer is evidence about the engine, never a fact about the storm.',
    by: AGENT, updated: iso, runs: runs.length, overall: S, leads: leadList.length,
    cost_per_lead_usd: leadList.length ? +(S.cost_usd / leadList.length).toFixed(4) : null, cost_per_confirmed_statement_usd: S.confirmed ? +(S.cost_usd / S.confirmed).toFixed(4) : null,
    by_model: Object.fromEntries(Object.entries(byModel).map(([k, v]) => [k, fin(v)])), by_lang: Object.fromEntries(Object.entries(byLang).map(([k, v]) => [k, fin(v)])), per_run: perRun, refused,
    budget: { mine_today_usd: 4, team_cap_usd: 20, note: 'Dinis, 02:50 UTC on 11 November (BRIEF.md)' },
}
fs.writeFileSync(path.join(P, 'scorecard.json'), JSON.stringify(scorecard, null, 1) + '\n')
fs.writeFileSync(path.join(P, 'leads.json'), JSON.stringify({ about: 'Leads from the Perplexity research runs, offered to incident.conductor@: only what this desk itself read at a primary body\'s own address, with the address, the time read (UTC) and the page\'s sha256. Nothing here is in the timeline by this desk. Press-only findings are in the run files and are not leads.', by: AGENT, updated: iso, for: 'incident.conductor@web-summit.dinis', leads: leadList }, null, 1) + '\n')

// the page
const esc = s => String(s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ')
const usd = x => x == null ? 'n/a' : x < 0.1 ? x.toFixed(4) : x.toFixed(2), t = z => z ? z.slice(11, 16) : ''
const slug = h => h.toLowerCase().replace(/<[^>]+>|[^\w\s-]/g, '').trim().replace(/\s+/g, '-')   // as admin/build/build.mjs makes a heading's id
const short = u => { try { const p = new URL(u); return p.hostname.replace(/^www\./, '') } catch { return u } }
const row = (name, x) => `| ${name} | ${x.asks} | ${x.statements} | ${x.confirmed} | ${x.press} | ${x.unsupported} | ${x.wrong} | ${x.unchecked} | ${x.none_found} | ${x.addresses} | ${x.addresses_primary} | ${usd(x.cost_usd)} | ${x.latency_ms_median != null ? (x.latency_ms_median / 1000).toFixed(1) + ' s' : ''} |`
const HEAD = '| | Answers | Statements | Confirmed at a primary source | Press only | Unsupported | Wrong | Not checked | "Found none" | Addresses returned | of them primary bodies | Cost, USD | Median wait |\n|---|---|---|---|---|---|---|---|---|---|---|---|---|'
const notes = fs.existsSync(path.join(P, 'notes.md')) ? fs.readFileSync(path.join(P, 'notes.md'), 'utf8').replace(/^>.*\n+/, '').trim() : ''
let md = `---
title: Perplexity as a research tool
summary: The incident team's open questions about Storm Charles, put to Perplexity's Sonar models; every statement that came back checked by opening the address it cited; what it found, what it cost, and what it is good for here.
mount: <div id="pplx" data-base="./"><p class="meta">The charts are drawn in the browser from <a href="scorecard.json">scorecard.json</a>; the same figures are in the tables below.</p></div>
head: <link rel="stylesheet" href="../../app/perplexity/perplexity.css"><script src="../../app/perplexity/perplexity.js" defer></script>
---
# Perplexity as a research tool

> Kept by ${AGENT}, ${kept}

**Not a warning service.** For warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). Nothing below is a forecast or advice of ours, and **nothing an engine said is a fact here**: an answer is evidence about the engine. A statement becomes a *lead* only when this desk has read it at the body's own address, and a lead becomes a row in [the timeline](../../incidents/2026-11-10-storm-charles/timeline.md) only by incident.conductor@.

**Runs were paused from 02:54 to 13:30 UTC on 11 November** for lack of credit on the OpenRouter account; they resumed at 13:30.

**In one sentence:** of ${S.statements} statements, ${S.confirmed} confirmed at a primary body, ${S.press} press only, ${S.unsupported} unsupported and ${S.wrong} wrong; the wrong ones are the instructive ones: it said a government page records advice to Web Summit that the page does not contain; it said ANA had published nothing while citing the page that lists ANA's statement; and it joined two unrelated paragraphs of one page into a fact about MeteoAlarm's archive.

## What this is

[The shadow desk](../../shadow/index.md) asks answer engines what a reader would ask, and measures what the reader is told. This desk does the other thing: it uses one engine, Perplexity (its Sonar models, through OpenRouter and [the team's one wrapper](../../agents/models/ask.md)), as a **tool to find things** the team has not found: the questions come from [the board](../../board/index.md)'s open questions and conflicts and from the "open" lists in [the decision data](../../incidents/2026-11-10-storm-charles/data/decisions/README.md). Then it shows honestly how good a tool it is: every statement in an answer is rewritten in our own words, and **each address the engine cited is opened by us**, one at a time, and the statement marked:

| Mark | Meaning |
|---|---|
| **confirmed at a primary source** | we read it on the site of the body that decides, warns or operates |
| **press only** | we read it, but only in the press or on a site that rewrites the press |
| **not found at the address cited** / **no address given** | unsupported: the page does not say it, or there is no page |
| **wrong** | the page cited, or our record from the primary body, says otherwise |
| **the engine said it found none** | not a claim about the storm; counted apart, with what our record says |

Unlike the shadow desk's bare questions, a research question carries a short brief: the time of asking, and a request for the deciding body's own page over the press ("if you found no such page, say so plainly"). The brief is in [tools/perplexity-ask.mjs](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/blob/dev/tools/perplexity-ask.mjs). The answers' full text is not published (it quotes the press): it stays in the raw store, and each answer here carries the raw record's name and sha256.

## The scorecard

So far: **${runs.length}** runs, **${S.asks}** answers, **${S.statements}** statements checked: **${S.confirmed}** confirmed at a primary source, **${S.press}** press only, **${S.unsupported}** unsupported, **${S.wrong}** wrong, **${S.unchecked}** not checked (a site on hold, or a page that refused our reader or did not render); **${S.none_found}** times the engine said it found no page. It returned **${S.addresses}** addresses; **${S.addresses_primary}** were a primary body's own page. Spent: **${usd(S.cost_usd)} US dollars** (this desk plans up to 4 a day of the team's 20). Leads offered to the conductor: **${leadList.length}**${leadList.length ? ` (${usd(scorecard.cost_per_lead_usd)} US dollars each)` : ''}. Data: [scorecard.json](scorecard.json), [leads.json](leads.json), [runs/](runs/), [hosts.json](hosts.json).

### By run

${HEAD}
${perRun.map(r => row(`[${r.run}. ${esc(r.topic)}](#${slug(`Run ${r.run}: ${r.topic}`)})`, r)).join('\n')}
${row('**All**', S)}

### By model

${HEAD}
${Object.entries(scorecard.by_model).map(([k, v]) => row('`' + k + '`', v)).join('\n')}
${refused.length ? `\n${refused.filter(x => x.status === 'empty').length} calls to \`perplexity/sonar-reasoning-pro\` returned nothing (no text, no addresses, no cost reported) after 20 to 35 s each, so that variant is not compared. ${refused.filter(x => x.status !== 'empty').length} calls were refused earlier for lack of account credit, at no cost.\n` : ''}
### By language of the question

${HEAD}
${Object.entries(scorecard.by_lang).map(([k, v]) => row(k === 'pt' ? 'Portuguese' : 'English', v)).join('\n')}

## Leads offered to the conductor

Only what we read ourselves at the body's own address. Each is a lead, not a row: incident.conductor@ decides.

${leadList.length ? leadList.map(L => `- **${esc(L.title || L.id)}** ${L.what || ''} Address: [${short(L.address)}](${L.address}), read ${L.read_utc.slice(0, 10)} ${t(L.read_utc)} UTC (sha256 \`${(L.sha256 || '').slice(0, 16)}\`).${L.bears_on ? ' Bears on: ' + L.bears_on.join(', ') + '.' : ''} ${L.status ? 'Status: ' + L.status + '. ' : ''}Found by: ${L.found_by.map(f => `run ${f.run.split('/').pop().replace('.json', '')}, ${f.lang === 'pt' ? 'Portuguese' : 'English'}`).join('; ')}.`).join('\n') : 'None yet.'}

${notes}

## The runs

Each run: the question as asked, the model and settings, then every statement in our words with its mark and the address where we read it (or did not).
`
for (const r of runs) {
    md += `\n### Run ${r.n}: ${r.topic}\n\nFrom: ${r.from.map(f => '`' + f + '`').join(', ') || 'the brief'}. Data: [${r.file}](${r.file}). Addresses opened by us: ${Object.values(r.addresses).filter(a => a.opened).length} of ${Object.keys(r.addresses).length} returned (those the answers used).\n`
    for (const q of r.asks) {
        const prim = q.cited.filter(c => c.url && r.addresses[c.url]?.class === 'primary').length
        md += `\n**Asked ${t(q.at)} UTC, ${q.lang === 'pt' ? 'in Portuguese' : 'in English'}, of \`${q.model}\`** (${q.settings.brief.startsWith('none') ? 'bare question' : 'with the research brief'}; at most ${q.settings.max_tokens} tokens; search context: ${q.settings.search_context}): "${esc(q.question)}"\n\nCame back in ${(q.latency_ms / 1000).toFixed(1)} s for ${usd(q.cost_usd)} US dollars, with ${q.cited.length} addresses (${prim} a primary body's). Raw record \`${q.raw}\`, sha256 \`${q.raw_sha256}\`.\n\n| # | What the engine said (our words) | Mark | Where we read it | Note |\n|---|---|---|---|---|\n`
        for (const s of q.statements) md += `| ${s.i} | ${esc(s.s)} | **${CHECKS[s.check]?.label || s.check}**${s.lead ? ' (a lead)' : ''} | ${s.at ? `[${short(s.at)}](${s.at}), ${t(s.read_utc)}` : ''} | ${esc(s.note)} |\n`
        md += `\nAddresses returned: ${q.cited.map(c => c.url ? `[${c.host}](${c.url})${r.addresses[c.url]?.class === 'primary' ? ' (primary)' : r.addresses[c.url]?.class === 'forbidden' ? ' (not requested by us: its terms)' : ''}` : `${c.host} (address withheld)`).join(', ')}.\n`
    }
}
md += `\n## How it is made\n\n1. \`tools/perplexity-ask.mjs\` asks (through \`tools/llm.mjs\`: the raw record outside git, one ledger line, the cap) and writes the run file with the addresses returned.\n2. \`tools/perplexity-check.mjs\` opens the addresses the answer used, one at a time, 2 s apart; never the hosts on [the archivist's forbidden and never lists](../../evidence/sources.json). Git keeps the status, the time read, the bytes and the sha256; the page text stays outside git.\n3. The agent reads each page and writes the statements and their marks into the run file.\n4. \`tools/perplexity-index.mjs\` writes the scorecard, the leads and this page.\n`
fs.writeFileSync(path.join(P, 'index.md'), md)
console.log(`runs ${runs.length}, answers ${S.asks}, statements ${S.statements}: confirmed ${S.confirmed}, press ${S.press}, unsupported ${S.unsupported}, wrong ${S.wrong}, none-found ${S.none_found}; addresses ${S.addresses} (${S.addresses_primary} primary); ${usd(S.cost_usd)} USD; leads ${leadList.length}`)
