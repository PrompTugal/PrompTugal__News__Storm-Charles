#!/usr/bin/env node
// incident.broadcast@web-summit.dinis: the coastline under the /broadcast/ wind map, cut once from Natural Earth's 1:50m land
// (public domain), read through the world-atlas package (https://unpkg.com/world-atlas@2.0.2/land-50m.json).
// Usage: node tools/broadcast-coast.mjs <land-50m.json> [--out broadcast/data/coast.json]
// It writes rings in [lon, lat] (2 decimals), only those that touch the map's box, thinned to about 0.08 degrees.
import fs from 'node:fs'
import crypto from 'node:crypto'
const [src] = process.argv.slice(2).filter(a => !a.startsWith('--'))
const oi = process.argv.indexOf('--out'); const out = oi > 0 ? process.argv[oi + 1] : 'broadcast/data/coast.json'
const BOX = { w: -34, e: 4, s: 28, n: 54 }
const raw = fs.readFileSync(src); const topo = JSON.parse(raw)
const { scale, translate } = topo.transform
const arcs = topo.arcs.map(a => { let x = 0, y = 0; return a.map(([dx, dy]) => { x += dx; y += dy; return [x * scale[0] + translate[0], y * scale[1] + translate[1]] }) })
const arc = i => i < 0 ? arcs[~i].slice().reverse() : arcs[i]
const ring = idx => idx.flatMap((i, k) => { const a = arc(i); return k ? a.slice(1) : a })
const rings = []
for (const g of topo.objects.land.geometries) {
  const polys = g.type === 'Polygon' ? [g.arcs] : g.type === 'MultiPolygon' ? g.arcs : []
  for (const p of polys) for (const r of p) rings.push(ring(r))
}
const r2 = v => Math.round(v * 100) / 100
// Sutherland-Hodgman: cut each ring to a box wider than the model's grid, so the cut edges never show on the map
const CUT = { w: BOX.w - 2, e: BOX.e + 4, s: BOX.s - 2, n: BOX.n + 4 }
const clip = (pts, inside, cross) => { const o = []; for (let i = 0; i < pts.length; i++) { const a = pts[i], b = pts[(i + 1) % pts.length]; const ia = inside(a), ib = inside(b); if (ia) o.push(a); if (ia !== ib) o.push(cross(a, b)) } return o }
const at = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
const cut = r => {
  let p = r
  p = clip(p, q => q[0] >= CUT.w, (a, b) => at(a, b, (CUT.w - a[0]) / (b[0] - a[0])))
  p = clip(p, q => q[0] <= CUT.e, (a, b) => at(a, b, (CUT.e - a[0]) / (b[0] - a[0])))
  p = clip(p, q => q[1] >= CUT.s, (a, b) => at(a, b, (CUT.s - a[1]) / (b[1] - a[1])))
  p = clip(p, q => q[1] <= CUT.n, (a, b) => at(a, b, (CUT.n - a[1]) / (b[1] - a[1])))
  return p
}
const kept = []
for (const r of rings) {
  const c = cut(r); if (c.length < 4) continue
  const t = []; let last = null
  for (const [x, y] of c) {
    if (last && Math.hypot(x - last[0], y - last[1]) < 0.08) continue
    last = [x, y]; t.push([r2(x), r2(y)])
  }
  if (t.length > 3) kept.push(t)
}
const doc = {
  about: "Land outlines for the /broadcast/ wind map: Natural Earth 1:50m land, cut to the box and thinned. Outlines for orientation, not borders.",
  label: 'fact: Natural Earth (public domain), reshaped by us',
  from: [{ url: 'https://unpkg.com/world-atlas@2.0.2/land-50m.json', sha256: crypto.createHash('sha256').update(raw).digest('hex'), licence: 'Natural Earth: public domain (naturalearthdata.com/about/terms-of-use)' }],
  box: BOX, by: 'incident.broadcast@web-summit.dinis', updated: new Date().toISOString().slice(0, 19) + 'Z', rings: kept
}
fs.writeFileSync(out, JSON.stringify(doc)); console.log(out, kept.length, 'rings', fs.statSync(out).size, 'bytes')
