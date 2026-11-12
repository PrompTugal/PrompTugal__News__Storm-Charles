// Union each staged JSON into the worktree copy (origin/dev): frames by t, snapshots by area+time; the stage wins a tie.
// The worktree is reset to origin/dev before every publish, so dev keeps the union of every session's polls.
import fs from 'node:fs'; import path from 'node:path'
const { writeJSON } = await import(process.env.REPO + '/tools/flights-common.mjs')
const [stageRoot, wtRoot, rel] = process.argv.slice(2)
const walk = d => fs.existsSync(d) ? fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]) : []
const KEYS = { frames: x => x.t || x.request?.read, snapshots: x => `${x.area}|${x.time || x.request?.read}` }
let gained = 0
for (const f of walk(path.join(stageRoot, rel)).filter(f => f.endsWith('.json'))) {
  const w = path.join(wtRoot, path.relative(stageRoot, f))
  const s = JSON.parse(fs.readFileSync(f, 'utf8'))
  let o = null; try { o = JSON.parse(fs.readFileSync(w, 'utf8')) } catch {}
  if (o) {
    for (const [k, key] of Object.entries(KEYS)) {
      if (!Array.isArray(s[k]) || !Array.isArray(o[k])) continue
      const m = new Map(o[k].map(x => [key(x), x])); const n = s[k].length
      for (const x of s[k]) m.set(key(x), x)
      s[k] = [...m.values()].sort((a, b) => String(key(a)).localeCompare(String(key(b))))
      if (s[k].length > n) gained++
    }
    if (o.airlines && s.airlines) for (const a of Object.keys(o.airlines)) s.airlines[a] ??= o.airlines[a]
  }
  writeJSON(w, s)
}
console.log(`merge: ${gained} file(s) kept rows only dev had`)
