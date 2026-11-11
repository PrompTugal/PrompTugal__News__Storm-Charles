#!/usr/bin/env node
// data/agents/sessions.json and data/agents/index.json, split one file per agent so neither nears the gate's 256 KB
// (kept by incident.observability@web-summit.dinis; split on 11 November 2026 at about 23:25 UTC, when each was within 5 KB).
//
// The tracked shape, for each of the two (NAME = sessions | index):
//   data/agents/<NAME>/index.json      the head: every top-level field but the agents, and "agents": [{ name, file }] in order
//   data/agents/<NAME>/<slug>.json     one agent's record, exactly as it stood in the agents array
// <slug> is the part of the name between "incident." and "@" (the role); anything else is the whole name made filename-safe.
//
// The served shape is unchanged: the build ("before" in admin/build/generators.json) writes the whole object, as before, to
// <out>/data/agents/sessions.json (this file) and <out>/data/agents/index.json (agents-index.mjs --out), never into git, so the pages and outside readers keep their
// address. A reader in tools/ calls readAgentsData('sessions' | 'index'), which joins the split files (or the old single file,
// if a checkout still has one).
//   node tools/agents-split.mjs --out _site     write the joined sessions.json into the site (index.json: agents-index.mjs --out)
//   node tools/agents-split.mjs --check         sizes and placement only
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
export const NAMES = ['sessions', 'index']
const KEY = { sessions: 'agent', index: 'name' }   // the field that names the agent in each record
const LIMIT = 200 * 1024                            // warn well before the gate's 256 KB

export const slugOf = name => (String(name).match(/^incident\.([a-z0-9-]+)@web-summit\.dinis$/i) || [, ''])[1].toLowerCase()
    || String(name).toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '') || 'unnamed'
export const dirOf = (name, root = ROOT) => path.join(root, 'data/agents', name)

/** The whole object (head fields, agents in order), from data/agents/<name>/, or from the old data/agents/<name>.json. */
export function readAgentsData(name, root = ROOT) {
    const dir = dirOf(name, root), head = path.join(dir, 'index.json')
    if (!fs.existsSync(head)) return JSON.parse(fs.readFileSync(path.join(root, 'data/agents', name + '.json'), 'utf8'))
    const h = JSON.parse(fs.readFileSync(head, 'utf8')), { agents: list = [], split, ...rest } = h
    const agents = list.map(e => JSON.parse(fs.readFileSync(path.join(dir, e.file), 'utf8')))
    // updated and content_sha256 stay last, where the single file had them
    const { updated, content_sha256, ...front } = rest
    return { ...front, agents, ...(updated !== undefined ? { updated } : {}), ...(content_sha256 !== undefined ? { content_sha256 } : {}) }
}

/** For readers that read JSON by path: the joined object if the path is data/agents/sessions.json or data/agents/index.json
 *  (relative to root, or absolute), else undefined (read the file as before). */
export function agentsFile(p, root = ROOT) {
    const rel = path.isAbsolute(String(p)) ? path.relative(root, p) : path.normalize(String(p))
    const m = rel.split(path.sep).join('/').match(/^data\/agents\/(sessions|index)\.json$/)
    return m ? readAgentsData(m[1], root) : undefined
}

const ser = (o, indent) => JSON.stringify(o, null, indent) + '\n'
const writeIfChanged = (file, text) => { if (fs.existsSync(file) && fs.readFileSync(file, 'utf8') === text) return false; fs.writeFileSync(file, text); return true }

/** Write the whole object as data/agents/<name>/: only files whose text changed; agent files no longer listed are removed. */
export function writeAgentsData(name, body, { root = ROOT, indent = 1 } = {}) {
    const dir = dirOf(name, root), key = KEY[name]
    fs.mkdirSync(dir, { recursive: true })
    const { agents = [], ...rest } = body, used = new Set(), list = []
    let changed = 0
    for (const a of agents) {
        let slug = slugOf(a[key]); for (let n = 2; used.has(slug); n++) slug = slugOf(a[key]) + '-' + n
        used.add(slug)
        const file = slug + '.json'
        list.push({ name: a[key], file })
        if (writeIfChanged(path.join(dir, file), ser(a, indent))) changed++
    }
    const { updated, content_sha256, ...front } = rest
    const head = { ...front, split: `one file per agent beside this one (agents[].file); tools/agents-split.mjs joins them (readAgentsData), and the build serves the whole object at data/agents/${name}.json`, agents: list, ...(updated !== undefined ? { updated } : {}), ...(content_sha256 !== undefined ? { content_sha256 } : {}) }
    if (writeIfChanged(path.join(dir, 'index.json'), ser(head, 2))) changed++
    for (const f of fs.readdirSync(dir)) if (f.endsWith('.json') && f !== 'index.json' && !used.has(f.slice(0, -5))) { fs.unlinkSync(path.join(dir, f)); changed++ }
    const old = path.join(root, 'data/agents', name + '.json'); if (fs.existsSync(old)) { fs.unlinkSync(old); changed++ }
    return { changed, files: list.length + 1 }
}

/** Sizes: every split file under 200 KB (the gate refuses 256 KB); no old single file left beside a split one. */
export function check(root = ROOT) {
    const out = []
    for (const name of NAMES) {
        const dir = dirOf(name, root)
        if (!fs.existsSync(path.join(dir, 'index.json'))) { out.push(`data/agents/${name}/ is not split yet`); continue }
        if (fs.existsSync(path.join(root, 'data/agents', name + '.json'))) out.push(`data/agents/${name}.json is still tracked beside data/agents/${name}/`)
        for (const f of fs.readdirSync(dir)) { const s = fs.statSync(path.join(dir, f)).size; if (s > LIMIT) out.push(`data/agents/${name}/${f}: ${s} bytes, over 200 KB`) }
        readAgentsData(name, root)   // throws if a listed file is missing or broken
    }
    return out
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    const a = process.argv.slice(2), at = a.indexOf('--out')
    if (a.includes('--check')) { const p = check(); console.log(p.length ? p.join('\n') : 'agents-split: OK'); process.exit(p.length ? 1 : 0) }
    if (at < 0 || !a[at + 1]) { console.error('usage: agents-split.mjs --out <dir> | --check'); process.exit(2) }
    const out = path.resolve(a[at + 1])
    fs.mkdirSync(path.join(out, 'data/agents'), { recursive: true })
    // index.json is served by agents-index.mjs --out (a "before" generator, run beside this one, from this commit): this one
    // writes only sessions.json, so the two never write the same file
    for (const name of ['sessions']) {
        const target = path.join(out, 'data/agents', name + '.json')
        const body = readAgentsData(name)
        fs.writeFileSync(target, ser(body, 1))
        console.log(`agents-split: ${path.join(a[at + 1], 'data/agents', name + '.json')}: ${body.agents.length} agents`)
    }
}
