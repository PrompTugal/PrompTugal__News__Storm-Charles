#!/usr/bin/env node
// The Studio's text twin (incident.studio@web-summit.dinis): writes studio/README.md from studio/animations/*.json, so the
// page reads without JavaScript as numbered scenes with their captions, and the text can never drift from what the player plays.
// Run by the Studio's agent before a commit (the build does not run it):  node app/studio/twin.mjs   |   --check (exit 1 if stale)
// It also checks every figure a caption quotes against what the scenes add up to (see `claims` in an animation).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..'), DIR = path.join(ROOT, 'studio/animations')
const ix = JSON.parse(fs.readFileSync(path.join(DIR, 'index.json'), 'utf8'))
const now = new Date(), kept = `${now.getUTCDate()} ${now.toLocaleString('en-GB', { month: 'long', timeZone: 'UTC' })} ${now.getUTCFullYear()}, ${now.toISOString().slice(11, 16)} UTC`
const out = [], problems = []
const one = s => String(s).replace(/\s+/g, ' ').trim()
out.push('---', 'title: Studio', `summary: ${one('Animated explanations, played as storyboards with small characters. The first: what compression is in a chat assistant, and how this team works so that it does not matter.')}`,
    'mount: <div id="studio" data-base="animations/"><noscript><p class="meta">The player needs JavaScript. The same, scene by scene as text, is below.</p></noscript></div>',
    'head: <link rel="stylesheet" href="../app/studio/studio.css"><script src="../app/studio/characters.js" defer></script><script src="../app/studio/player.js" defer></script>',
    '---', '# Studio', '', `> Kept by incident.studio@web-summit.dinis, ${kept}`, '',
    'Where this site experiments with ways to show complex things: animations with small characters, played as storyboards, scene by scene. At Dinis Cruz\'s word ([BRIEF.md](../BRIEF.md), 11 November 2026). These are explanations, our own analysis in general terms: not news, and not a warning service.', '',
    '## The animations', '')
const anims = ix.animations.map(a => JSON.parse(fs.readFileSync(path.join(DIR, a.file), 'utf8')))
for (const a of anims) out.push(`- **[${a.title}](#${a.id})**: ${a.summary} ${a.chapters.length} chapters, ${a.chapters.reduce((n, c) => n + c.scenes.length, 0)} scenes. Data: [animations/${a.id}.json](animations/${a.id}.json).`)
out.push('', 'How to add one: [animations/README.md](animations/README.md). The player: [app/studio/player.js](../app/studio/player.js); the characters: [app/studio/characters.js](../app/studio/characters.js).', '')
for (const a of anims) {
    out.push(`## ${a.title}`, '', `The same storyboard as text: every scene, in order, with its caption. ${a.about || ''}`, '')
    a.chapters.forEach((ch, ci) => {
        out.push(`### ${ci + 1}. ${ch.title}`, '', ...(ch.question ? [`**${ch.question}**`, ''] : []))
        // sums, to check the figures the captions quote
        const U = id => { const k = (typeof id === 'string' ? id : id.id).split(':')[0], o = typeof id === 'string' ? {} : id; return o.u || (ch.blocks?.[k]?.u) || 1 }
        ch.scenes.forEach((sc, si) => {
            const lanes = sc.lanes || [sc], extra = []
            for (const l of lanes) {
                const pre = lanes.length > 1 && l.title ? `${l.title}: ` : ''
                if (l.send && l.send.blocked) extra.push(`${pre}request ${l.send.n} does not fit the window of ${l.window ?? sc.window ?? ch.window} blocks and cannot be sent.`)
                if (l.send && !l.send.blocked) { const live = (l.stack || []).filter(b => !/:lost$/.test(typeof b === 'string' ? b : b.id) && b.state !== 'lost'), tot = live.reduce((n, b) => n + U(b), 0), c = live.slice(0, l.send.cached || 0).reduce((n, b) => n + U(b), 0); extra.push(`${pre}request ${l.send.n} carries ${tot} blocks; ${tot - c} read at full cost${c ? `, ${c} reused from the cache` : ''}.`) }
                const lf = (l.files || []).filter(f => f.state || lanes.length === 1)   // side by side, only what a scene adds or reads; the full shelf is in the chapter's last scene
                if (lf.length) extra.push(`${pre}${lf.some(f => f.state === 'read') ? 'read from the file system' : lf.some(f => f.state === 'new') ? 'written to the file system' : 'on the file system'}: ${lf.map(f => `${f.href ? `[${f.name}](${f.href})` : f.name}${f.size ? ` (${f.size})` : ''}`).join(', ')}.`)
                for (const b of l.stack || []) { const k = (typeof b === 'string' ? b : b.id).split(':')[0]; if (!ch.blocks?.[k] && typeof b === 'string') problems.push(`${a.id} ${ci + 1}.${si + 1}: block "${k}" is not defined`) }
            }
            out.push(`${si + 1}. ${one(sc.caption)}${sc.note ? ` *${one(sc.note)}*` : ''}${extra.length ? `\n   ${extra.join(' ')}` : ''}`)
        })
        out.push('')
    })
    if (a.simplifies?.length) { out.push(`### What this simplifies`, ''); for (const s of a.simplifies) out.push(`- ${one(s)}`); out.push('') }
    if (a.sources?.length) { out.push(`### Read for this`, ''); for (const s of a.sources) out.push(`- ${s.href ? `[${s.name}](${s.href})` : s.name}${s.size ? `, ${s.size}` : ''}${s.read ? `, read ${s.read}` : ''}${s.note ? `: ${one(s.note)}` : ''}`); out.push('') }
}
const text = out.join('\n'), file = path.join(ROOT, 'studio/README.md')
const strip = s => s.replace(/^> Kept by .*$/m, '')
const old = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : ''
for (const p of problems) console.log('FAIL ' + p)
if (process.argv.includes('--check')) { if (strip(old) !== strip(text) || problems.length) { console.log('studio/README.md is stale: run node app/studio/twin.mjs'); process.exit(1) } console.log('OK studio/README.md matches its animations') }
else if (strip(old) !== strip(text)) { fs.writeFileSync(file, text); console.log('wrote studio/README.md') } else console.log('studio/README.md unchanged')
if (problems.length) process.exit(1)
