#!/usr/bin/env node
// The Studio's pages, written from its data (incident.studio@web-summit.dinis): studio/README.md (the index: a card per
// explanation) and studio/<id>/README.md (one page per explanation: the player mounted through the site's frame, and under it
// the same storyboard as plain text, so the page reads without JavaScript and the text can never drift from what is played).
// Run by the Studio's agent before a commit (the build does not run it):  node app/studio/twin.mjs   |   --check (exit 1 if stale)
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..'), DIR = path.join(ROOT, 'studio/animations')
const ix = JSON.parse(fs.readFileSync(path.join(DIR, 'index.json'), 'utf8'))
const now = new Date(), kept = `> Kept by incident.studio@web-summit.dinis, ${now.getUTCDate()} ${now.toLocaleString('en-GB', { month: 'long', timeZone: 'UTC' })} ${now.getUTCFullYear()}, ${now.toISOString().slice(11, 16)} UTC`
const problems = [], files = {}
const one = s => String(s).replace(/\s+/g, ' ').trim()
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
const dur = sc => sc.dur || Math.max(3500, 1500 + 42 * String(sc.caption).length)   // as the player holds a scene
const anims = ix.animations.map(a => Object.assign(JSON.parse(fs.readFileSync(path.join(DIR, a.file), 'utf8')), { line: a.line, cast: a.cast }))
const stats = a => { const sc = a.chapters.flatMap(c => c.scenes); return `${a.chapters.length} chapters · ${sc.length} scenes · about ${Math.round(sc.reduce((n, s) => n + dur(s), 0) / 60000)} min` }

// ---- the index
files['studio/README.md'] = ['---', 'title: Studio', `summary: ${one('Explanations you can watch: small characters, played as storyboards, each on its own page with its text beside it.')}`,
    `mount: <div class="st-cards">${anims.map(a => `<a class="st-card" data-id="${esc(a.id)}" data-cast="${esc((a.cast || []).join(','))}" href="${esc(a.id)}/index.html"><b>${esc(a.title)}</b><span>${esc(a.line || a.summary)}</span><small>${esc(stats(a))} <i>Watch</i></small></a>`).join('')}</div>`,
    'head: <link rel="stylesheet" href="../app/studio/studio.css"><script src="../app/studio/characters.js" defer></script><script src="../app/studio/index.js" defer></script>',
    '---', kept, '', '# Studio', '',
    'Where this site explains complicated things by showing them: small characters, played as storyboards, scene by scene, each explanation on its own page with its text beside the stage. At Dinis Cruz\'s word ([the brief](../BRIEF.html), 11 November 2026). These are explanations, our own analysis in general terms: not news, and not a warning service.', '',
    '## The explanations', '',
    ...anims.map(a => `- **[${a.title}](${a.id}/index.html)**: ${a.line || a.summary} ${stats(a).replace(/ · /g, ', ')}.`), '',
    '## The cast', '', 'A small character for every agent of this site, in two sizes: [the cast](cast/index.html).', '',
    '## How it is made', '',
    'Each explanation is data: one JSON file of chapters and scenes ([how one is written](animations/index.html)). One player draws them all ([player.js](../app/studio/player.js), [the characters](../app/studio/characters.js)), and a small tool writes each page\'s text from the same file ([twin.mjs](../app/studio/twin.mjs)), so the animation and its text cannot disagree.', ''].join('\n')

// ---- a page per explanation
for (const a of anims) {
    const out = ['---', `title: ${one(a.title)}`, `summary: ${one(a.summary)}`,
        `mount: <div id="studio" data-base="../animations/" data-anim="${esc(a.id)}"><noscript><p class="meta">The player needs JavaScript. The same explanation, scene by scene as text, is below.</p></noscript></div>`,
        'head: <link rel="stylesheet" href="../../app/studio/studio.css"><script src="../../app/studio/characters.js" defer></script><script src="../../app/studio/player.js" defer></script>',
        '---', kept, '', `# ${a.title}`, '',
        `${one(a.summary)} An explanation from [the Studio](../index.html). ${one(a.about || '')}`, '',
        'Below: the same storyboard as plain text, every scene in order with its caption.', '']
    a.chapters.forEach((ch, ci) => {
        out.push(`## ${ci + 1}. ${ch.title}`, '', ...(ch.question ? [`**${ch.question}**`, ''] : []))
        const U = id => { const k = (typeof id === 'string' ? id : id.id).split(':')[0], o = typeof id === 'string' ? {} : id; return o.u || (ch.blocks?.[k]?.u) || 1 }
        ch.scenes.forEach((sc, si) => {
            const lanes = sc.lanes || [sc], extra = []
            if (ch.track) {
                if (sc.clock) extra.push(`The time: ${sc.clock}.`)
                if (sc.at !== undefined) extra.push(`At work: ${ch.track.stations[sc.at].name.toLowerCase()}.`)
                for (const c of sc.cards || (sc.card ? [sc.card] : [])) { const nf = (c.fields || []).filter(f => f.new); extra.push(`${c.id ? (c.href ? `[${c.id}](${c.href})` : c.id) + ' ' : ''}${c.label ? `(${c.label}${c.state ? ', ' + c.state : ''}) ` : ''}${c.text ? `"${one(c.text)}"` : c.title || ''}${nf.length ? `; added: ${nf.map(f => `${f.k}: ${f.href ? `[${f.v}](${f.href})` : f.v}`).join('; ')}` : ''}.`) }
            }
            for (const l of ch.track ? [] : lanes) {
                const pre = lanes.length > 1 && l.title ? `${l.title}: ` : ''
                if (l.send && l.send.blocked) extra.push(`${pre}request ${l.send.n} does not fit the window of ${l.window ?? sc.window ?? ch.window} blocks and cannot be sent.`)
                if (l.send && !l.send.blocked) { const live = (l.stack || []).filter(b => !/:lost$/.test(typeof b === 'string' ? b : b.id) && b.state !== 'lost'), tot = live.reduce((n, b) => n + U(b), 0), c = live.slice(0, l.send.cached || 0).reduce((n, b) => n + U(b), 0); extra.push(`${pre}request ${l.send.n} carries ${tot} blocks; ${tot - c} read at full cost${c ? `, ${c} reused from the cache` : ''}.`) }
                const lf = (l.files || []).filter(f => f.state || lanes.length === 1)   // side by side, only what a scene adds or reads
                if (lf.length) extra.push(`${pre}${lf.some(f => f.state === 'read') ? 'read from the file system' : lf.some(f => f.state === 'new') ? 'written to the file system' : 'on the file system'}: ${lf.map(f => `${f.href ? `[${f.name}](${f.href})` : f.name}${f.size ? ` (${f.size})` : ''}`).join(', ')}.`)
                for (const b of l.stack || []) { const k = (typeof b === 'string' ? b : b.id).split(':')[0]; if (!ch.blocks?.[k] && typeof b === 'string') problems.push(`${a.id} ${ci + 1}.${si + 1}: block "${k}" is not defined`) }
            }
            out.push(`${si + 1}. ${one(sc.caption)}${sc.note ? ` *${one(sc.note)}*` : ''}${extra.length ? `\n   ${extra.join(' ')}` : ''}`)
        })
        out.push('')
    })
    if (a.simplifies?.length) { out.push('## What this simplifies', ''); for (const s of a.simplifies) out.push(`- ${one(s)}`); out.push('') }
    if (a.sources?.length) { out.push('## Read for this', ''); for (const s of a.sources) out.push(`- ${s.href ? `[${s.name}](${s.href})` : s.name}${s.size ? `, ${s.size}` : ''}${s.read ? `, read ${s.read}` : ''}${s.note ? `: ${one(s.note)}` : ''}`); out.push('') }
    out.push(`The data this page is drawn from: [animations/${a.id}.json](../animations/${a.id}.json).`, '')
    files[`studio/${a.id}/README.md`] = out.join('\n')
}
const strip = s => s.replace(/^> Kept by .*$/m, '')
let stale = 0
for (const p of problems) console.log('FAIL ' + p)
for (const [rel, text] of Object.entries(files)) {
    const f = path.join(ROOT, rel), old = fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : ''
    if (strip(old) === strip(text)) continue
    stale++
    if (!process.argv.includes('--check')) { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, text); console.log('wrote ' + rel) } else console.log('stale ' + rel)
}
if (process.argv.includes('--check')) { if (stale || problems.length) { console.log('run node app/studio/twin.mjs'); process.exit(1) } console.log(`OK ${Object.keys(files).length} Studio pages match their data`) }
if (problems.length) process.exit(1)
