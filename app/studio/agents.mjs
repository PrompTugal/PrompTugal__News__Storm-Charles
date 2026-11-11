#!/usr/bin/env node
// The cast: a small character for every agent of this site (incident.studio@web-summit.dinis), at Dinis Cruz's word
// (BRIEF.md, 11 November 2026, ~02:20 UTC: "a little identity ... start to sprinkle those identities across the site, but let's experiment").
// One family: the same head and shoulders, and one thing worn or held that says the job. Written as SVG text files, no image inside:
//   app/studio/agents/<role>.svg        the figure (64 x 72), for the agent's home
//   app/studio/agents/<role>.mark.svg   the mark (the head and its thing, 44 x 46), for a by-line at about 20 px
//   app/studio/agents/index.json        the list: role, agent, the job in a line, what it wears, the two paths
//   studio/cast/README.md               the page showing them all
// Colours are the site's tokens when the SVG is inline in a page (var(--ink) ...); as an <img> a file cannot see the page's
// tokens, so it falls back to the browser's own system colours (CanvasText, Canvas, LinkText), which follow light and dark. No hex.
// Run: node app/studio/agents.mjs   |   --check (exit 1 if a file is stale). The roles come from agents/policy.json.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const policy = JSON.parse(fs.readFileSync(path.join(ROOT, 'agents/policy.json'), 'utf8'))
const STYLE = w => `<style>svg{color-scheme:light dark}.ag-s{fill:none;stroke:var(--ink,CanvasText);stroke-width:${w};stroke-linecap:round;stroke-linejoin:round}.ag-f{fill:var(--ink,CanvasText)}.ag-p{fill:var(--surface,Canvas);stroke:var(--ink,CanvasText);stroke-width:${w};stroke-linejoin:round}.ag-a{fill:var(--focus,LinkText);stroke:var(--ink,CanvasText);stroke-width:${w * .75};stroke-linejoin:round}.ag-b{fill:var(--ink-2,GrayText)}.ag-t{font:700 9px ui-monospace,Menlo,monospace;fill:var(--ink,CanvasText)}</style>`
// each: [what it wears or holds (for the index and the alt text), the job in a line, behind the head, in front of the head, eyes?]
const C = {
    conductor: ['a baton, raised', 'leads the incident and the team; keeps the timeline', '', '<path d="M47 24l8 -19" class="ag-s"/><circle cx="55" cy="5" r="2" class="ag-a"/><path d="M27 43l5 3 5 -3v6l-5 -3 -5 3z" class="ag-f"/>'],
    designer: ['a beret', 'the look of the site: tokens, parts, rounds', '', '<path d="M16 19c2 -11 30 -13 33 -2 -8 5 -24 6 -33 2z" class="ag-a"/><path d="M33 9l2 -5" class="ag-s"/>'],
    observability: ['binoculars', 'the live map of the agents: who is doing what, now', '', '<circle cx="25" cy="28" r="6" class="ag-p"/><circle cx="39" cy="28" r="6" class="ag-p"/><path d="M31 27h2" class="ag-s"/><circle cx="25" cy="28" r="2" class="ag-f"/><circle cx="39" cy="28" r="2" class="ag-f"/>', 'none'],
    identity: ['a key', 'who each agent is: keys, sign-in, the account page', '', '<circle cx="50" cy="12" r="5" class="ag-p"/><path d="M47 16l-6 8M43 21l3 2M41 24l3 2" class="ag-s"/>'],
    weatherwatch: ['a spyglass', 'watches the sites that cover the storm, and rereads them', '', '<path d="M36 25l16 -7 2 5 -16 7z" class="ag-p"/><path d="M52 18l4 -2 2 5 -4 2" class="ag-a"/>', 'left'],
    media: ['a press hat', 'the outlets, the by-lines, who published what and when', '', '<path d="M17 20c1 -10 29 -10 30 0z" class="ag-p"/><path d="M11 20h42" class="ag-s"/><rect x="36" y="11" width="9" height="6" class="ag-a"/>'],
    librarian: ['reading glasses and a bun', 'everything catalogued, findable and linked', '<circle cx="32" cy="9" r="6" class="ag-b"/>', '<rect x="20" y="24" width="10" height="7" rx="2" class="ag-s"/><rect x="34" y="24" width="10" height="7" rx="2" class="ag-s"/><path d="M30 27h4" class="ag-s"/>'],
    graph: ['three nodes, joined', 'the ontologist and cartographer: one graph of the storm', '', '<path d="M22 8l10 -5 10 5M22 8h20" class="ag-s"/><circle cx="22" cy="8" r="3.5" class="ag-a"/><circle cx="42" cy="8" r="3.5" class="ag-p"/><circle cx="32" cy="3.5" r="3" class="ag-p"/>'],
    meteorologist: ['an anemometer', 'the weather data and its analysis, labelled as analysis', '', '<path d="M32 14v-9M22 5h20" class="ag-s"/><path d="M19 2a3 3 0 0 0 0 6zM45 2a3 3 0 0 1 0 6z" class="ag-a"/><circle cx="32" cy="5" r="2" class="ag-f"/>'],
    researcher: ['a magnifying glass', 'the decisions: who decided what, when, on what', '', '<circle cx="46" cy="16" r="7" class="ag-p"/><path d="M51 21l6 6" class="ag-s"/>'],
    dev: ['curly braces', 'the tools that read the sources; the dashboard', '', '<path d="M14 14c-4 0 -2 7 -6 7 4 0 2 7 6 7M50 14c4 0 2 7 6 7 -4 0 -2 7 -6 7" class="ag-s"/>'],
    studio: ['a clapperboard', 'explanations you can watch, with small characters', '', '<path d="M17 18l30 -8 1 5 -30 8z" class="ag-p"/><path d="M24 16l3 5M32 14l3 5M40 12l3 5" class="ag-s"/>'],
    wikipedia: ['a citation mark', 'Wikipedia on the storm, in every language, compared', '', '<rect x="41" y="3" width="17" height="13" rx="2" class="ag-p"/><text x="49.5" y="13" text-anchor="middle" class="ag-t">[1]</text>'],
    weather: ['a screen around the head', 'the Weather face: the storm as a weather channel would show it', '<rect x="11" y="9" width="42" height="38" rx="6" class="ag-p"/><path d="M26 9l-5 -7M38 9l5 -7" class="ag-s"/>', '<circle cx="48" cy="14" r="2" class="ag-a"/>'],
    ipma: ['a wave', "IPMA's open data: every endpoint mapped, read and drawn", '', '<path d="M14 15q4.5 -7 9 0t9 0 9 0 9 0" class="ag-s"/><path d="M18 9q4.5 -6 9 0t9 0 9 0" class="ag-s"/>'],
    sources: ['a feed', 'a section for each source body: feeds, formats, licences', '', '<circle cx="44" cy="15" r="2.5" class="ag-a"/><path d="M44 8a7 7 0 0 1 7 7M44 2a13 13 0 0 1 13 13" class="ag-s"/>'],
    archivist: ['an archive box', 'captures every outside page: screenshot, hash, vault', '', '<path d="M15 19h34v-12h-34z" class="ag-p"/><path d="M13 7h38" class="ag-s"/><rect x="27" y="11" width="10" height="4" rx="1" class="ag-a"/>'],
    entities: ['a tag', 'a node and a page for every thing a page mentions', '', '<path d="M40 14l9 -9h8v8l-9 9z" class="ag-p"/><circle cx="53" cy="9" r="1.8" class="ag-a"/>'],
    labs: ['a flask', 'experiments: timelines, decision views, weather views', '', '<path d="M45 3v6l-6 10h18l-6 -10v-6z" class="ag-p"/><path d="M43 3h10M42 15h12" class="ag-s"/><circle cx="48" cy="-1" r="1.5" class="ag-a"/>'],
    board: ['a board of cards', 'open questions as tracked items; tasks for the team', '', '<rect x="15" y="1" width="34" height="16" rx="2" class="ag-p"/><path d="M26 1v16M38 1v16" class="ag-s"/><rect x="18" y="4" width="5" height="4" class="ag-a"/><rect x="29" y="4" width="6" height="4" class="ag-f"/><rect x="41" y="9" width="5" height="4" class="ag-f"/>'],
    social: ['a speech bubble', 'public social sources: official accounts, as data', '', '<path d="M40 3h17v11h-9l-5 5v-5h-3z" class="ag-p"/><path d="M44 7h9M44 10h6" class="ag-s"/>'],
    meteorology: ['a barometer', 'where every forecast and picture comes from, and its licence', '', '<path d="M19 15a13 13 0 0 1 26 0z" class="ag-p"/><path d="M32 15l6 -8" class="ag-s"/><circle cx="32" cy="15" r="2" class="ag-a"/>'],
    stories: ['a quill', 'data-driven stories, every statement linked', '', '<path d="M45 22c0 -9 4 -17 12 -20 0 9 -4 16 -10 19z" class="ag-a"/><path d="M43 27l4 -8" class="ag-s"/>'],
    models: ['a pair of scales', 'other models, measured on tasks that can be checked', '', '<path d="M32 13v-10M20 5h24M20 5l-4 8h8zM44 5l-4 8h8z" class="ag-s"/><path d="M16 13a4 3 0 0 0 8 0zM40 13a4 3 0 0 0 8 0z" class="ag-a"/>'],
    shadow: ['a shadow', 'what other sources and answer engines say, beside our record', '<circle cx="40" cy="24" r="14" class="ag-b"/>', ''],
    ci: ['a hard hat with a tick', 'the pipeline and the repository, made visible', '', '<path d="M17 20a15 15 0 0 1 30 0z" class="ag-a"/><path d="M13 20h38" class="ag-s"/><path d="M27 14l4 4 7 -8" class="ag-s"/>'],
}
const eyes = e => e === 'none' ? '' : e === 'left' ? '<circle cx="26" cy="29" r="2.2" class="ag-f"/><path d="M36 29h5" class="ag-s"/>' : '<circle cx="26" cy="29" r="2.2" class="ag-f"/><circle cx="38" cy="29" r="2.2" class="ag-f"/>'
const draw = ([, , back, front, e], mark) => `${mark ? '' : '<path d="M12 72c0-14 9-21 20-21s20 7 20 21z" class="ag-b"/>'}${back || ''}<circle cx="32" cy="28" r="14" class="ag-p"/>${eyes(e)}${mark ? '' : '<path d="M27 36q5 3.5 10 0" class="ag-s"/>'}${front || ''}`
const svg = (role, mark) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${mark ? '8 -3 52 50' : '0 -4 64 76'}" role="img" aria-label="incident.${role}@: ${C[role][0]}">${STYLE(mark ? 3 : 2)}${draw(C[role], mark)}</svg>\n`
const inline = (role, mark, cls) => `<svg class="${cls}" viewBox="${mark ? '8 -3 52 50' : '0 -4 64 76'}" role="img" aria-label="incident.${role}@: ${C[role][0]}">${draw(C[role], mark)}</svg>`

const roles = Object.entries(policy.agents).map(([agent, v]) => ({ role: v.role, agent })), files = {}, missing = roles.filter(r => !C[r.role]).map(r => r.role)
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
const now = new Date(), stamp = now.toISOString().slice(0, 16) + 'Z'
const have = roles.filter(r => C[r.role])
for (const r of have) { files[`app/studio/agents/${r.role}.svg`] = svg(r.role, false); files[`app/studio/agents/${r.role}.mark.svg`] = svg(r.role, true) }
files['app/studio/agents/index.json'] = JSON.stringify({
    about: "The cast: a small character for every agent of this site, one family (the same head and shoulders, one thing worn or held that says the job). Two files each: the figure for the agent's home and the mark for a by-line at about 20 px. SVG text, no image inside. Inline in a page they take the site's tokens (classes ag-s, ag-f, ag-p, ag-a, ag-b; the rules are in app/studio/studio.css and in each file); as an <img> they use the browser's system colours, which follow light and dark. An experiment, at Dinis Cruz's word (BRIEF.md, 11 November 2026).",
    by: 'incident.studio@web-summit.dinis', updated: stamp, made_by: 'app/studio/agents.mjs', page: 'studio/cast/',
    sizes: { figure: 'viewBox 0 -4 64 76; show at 64 px wide or more', mark: 'viewBox 8 -3 52 50 (the head and its thing); show at 20 to 28 px' },
    agents: have.map(r => ({ role: r.role, agent: r.agent, wears: C[r.role][0], job: C[r.role][1], figure: `app/studio/agents/${r.role}.svg`, mark: `app/studio/agents/${r.role}.mark.svg`, home: `agents/${r.role}/` })),
    not_drawn_yet: missing
}, null, 2) + '\n'
const kept = `> Kept by incident.studio@web-summit.dinis, ${now.getUTCDate()} ${now.toLocaleString('en-GB', { month: 'long', timeZone: 'UTC' })} ${now.getUTCFullYear()}, ${now.toISOString().slice(11, 16)} UTC`
const home = r => fs.existsSync(path.join(ROOT, 'agents', r.role, 'README.md')) ? `../../agents/${r.role}/index.html` : fs.existsSync(path.join(ROOT, 'agents', r.role, 'status.json')) ? `../../agents/${r.role}/status.json` : ''
files['studio/cast/README.md'] = ['---', 'title: The cast', 'summary: A small character for every agent of this site: one family, one thing each that says the job.',
    `mount: <div class="st-castgrid">${have.map(r => { const h = home(r); return `<${h ? `a href="${h}"` : 'div'} class="st-agent">${inline(r.role, false, 'ag-fig')}<b>${inline(r.role, true, 'ag-mark')} ${esc(r.role)}</b><span>${esc(C[r.role][1])}</span><small>${esc(C[r.role][0])}</small></${h ? 'a' : 'div'}>` }).join('')}</div>`,
    'head: <link rel="stylesheet" href="../../app/studio/studio.css">', '---', kept, '', '# The cast', '',
    `A small character for each of the ${have.length} agents that build and run this site. One family: the same head and shoulders, and one thing worn or held that says the job at a glance. Each comes in two sizes: a figure, for the agent's own page, and a mark (the head and its thing), for a by-line. An experiment, at Dinis Cruz's word ([the brief](../../BRIEF.html), 11 November 2026, about 02:20 UTC): "a little identity ... start to sprinkle those identities across the site, but let's experiment". Part of [the Studio](../index.html).`, '',
    '| Agent | Wears or holds | Its job | Figure | Mark |', '|---|---|---|---|---|',
    ...have.map(r => `| incident.${r.role}@ | ${C[r.role][0]} | ${C[r.role][1]} | [${r.role}.svg](../../app/studio/agents/${r.role}.svg) | [${r.role}.mark.svg](../../app/studio/agents/${r.role}.mark.svg) |`), '',
    '## Using them', '',
    '- The list, as data: [app/studio/agents/index.json](../../app/studio/agents/index.json) (role, agent, what it wears, its job, the two paths).',
    '- As an image: `<img src="app/studio/agents/<role>.mark.svg" width="20" height="20" alt="">` beside a by-line. A file used this way cannot see the page\'s tokens, so it uses the browser\'s own text and background colours, which follow light and dark (the system\'s setting, not this site\'s theme button).',
    '- Inline, to follow the site\'s theme exactly: put the SVG\'s markup in the page; the classes (`ag-s`, `ag-f`, `ag-p`, `ag-a`, `ag-b`) take the tokens `--ink`, `--surface`, `--focus`, `--ink-2` from [app/studio/studio.css](../../app/studio/studio.css).',
    '- No hex colour and no embedded image in any file; each is under 2 KB. They are made by [app/studio/agents.mjs](../../app/studio/agents.mjs) from [agents/policy.json](../../agents/policy.json): a new agent gets a character by adding one line there.', ''].join('\n')
const strip = s => s.replace(/^> Kept by .*$/m, '').replace(/"updated": "[^"]*"/, '')
let stale = 0
for (const [rel, text] of Object.entries(files)) {
    const f = path.join(ROOT, rel), old = fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : ''
    if (strip(old) === strip(text)) continue
    stale++
    if (!process.argv.includes('--check')) { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, text) } else console.log('stale ' + rel)
}
if (missing.length) console.log('no character yet for: ' + missing.join(', '))
if (process.argv.includes('--check')) { if (stale) { console.log('run node app/studio/agents.mjs'); process.exit(1) } console.log(`OK the cast: ${have.length} agents, ${Object.keys(files).length} files`) } else console.log(`the cast: ${have.length} agents, ${stale} file(s) written`)
