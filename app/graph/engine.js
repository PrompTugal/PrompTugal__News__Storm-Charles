// A small adapter onto Silvio's graph engine (incident.graph@web-summit.dinis).
// The engine is the bundle behind web-summit.sgit.ai's Universe (assets/cc/brain.js): brain-libs.js, which holds
// 3d-force-graph 1.80.1 and three 0.186.1 as window.BrainLibs. It is 1.6 MB, so it is never committed here: it is
// loaded from web-summit.sgit.ai when a graph opens, pinned by its sha384 (if the file there changes, nothing runs
// and the page falls back to its list). brain.js itself is the Universe's own data and panels; we reuse the engine,
// not its data and not its colours: this site's design rules (design/README.md) decide how a node looks.
//
// A node is a flat shape: the SHAPE says what kind of thing it is, the colour is whatever the page gives (a token's
// value). No colour is written here: every colour comes from the page's stylesheet, so light and dark both work.
//
// For any page of this site (incident.observability@ uses it for the agents):
//   const g = await StormGraph.mount(element, { nodes: [{ id, name, type, degree? }], links: [{ source, target, rel?, label? }] },
//       { style: () => ({ background, outline, link, linkMuted, linkPicked, linkHypothesis }),   // read from tokens; called again by restyle()
//         colourOf(node) -> colour, shapeOf(node) -> a key of StormGraph.SHAPES, onPick(node), tip(node) -> string })
//   g.show(predicate)   which nodes are drawn      g.focus(id)   fly to one      g.fit()   all in view
//   g.restyle()         re-read the colours (after a theme change)              g.fg      the 3d-force-graph instance
//   StormGraph.fromStorm(storm)   data/graph/storm.json -> { nodes, links } for mount
//   StormGraph.icon(shape)        the same shape as an <svg> element (fill: currentColor), for a legend
window.StormGraph = (function () {
    'use strict'
    const LIBS = 'https://web-summit.sgit.ai/assets/cc/brain-libs.js'
    const LIBS_SHA384 = 'sha384-FGe8jg7muKBvFcLZR295Ju2x8gGa1eYfgstKeICxxWwHrXuCHKGytFV8szwXsBuL'
    // the shapes, as paths in a 24 x 24 box (filled with the even-odd rule, so a ring and a frame are hollow)
    const SHAPES = {
        circle: 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18z',
        diamond: 'M12 1.5L22.5 12L12 22.5L1.5 12z',
        triangle: 'M12 2.5L22.5 21H1.5z',
        square: 'M4 4h16v16H4z',
        hexagon: 'M12 2l8.7 5v10L12 22l-8.7-5V7z',
        plus: 'M9 3h6v6h6v6h-6v6H9v-6H3V9h6z',
        ring: 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18zM12 8a4 4 0 1 1 0 8a4 4 0 1 1 0-8z',
        frame: 'M4 4h16v16H4zM9 9v6h6V9z'
    }
    function icon(shape) {
        const NS = 'http://www.w3.org/2000/svg', s = document.createElementNS(NS, 'svg'), p = document.createElementNS(NS, 'path')
        s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('width', '12'); s.setAttribute('height', '12'); s.setAttribute('aria-hidden', 'true')
        p.setAttribute('d', SHAPES[shape] || SHAPES.circle); p.setAttribute('fill', 'currentColor'); p.setAttribute('fill-rule', 'evenodd'); s.append(p); return s
    }
    let loading = null
    const libs = () => loading || (loading = new Promise((ok, no) => {
        if (window.BrainLibs) return ok(window.BrainLibs)
        const s = document.createElement('script')
        s.src = LIBS; s.integrity = LIBS_SHA384; s.crossOrigin = 'anonymous'
        s.onload = () => window.BrainLibs ? ok(window.BrainLibs) : no(new Error('the engine loaded but is not the one expected'))
        s.onerror = () => { loading = null; no(new Error('the graph engine could not be loaded from web-summit.sgit.ai (or is no longer the pinned file)')) }
        document.head.appendChild(s)
    }))
    const webgl = () => { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')) } catch { return false } }
    const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

    function fromStorm(storm) {
        return { nodes: storm.nodes.map(n => ({ ...n })), links: storm.edges.map(e => ({ ...e, source: e.from, target: e.to })) }
    }

    async function mount(el, data, opts = {}) {
        if (!webgl()) throw new Error('this browser has no WebGL, which the 3D engine needs')
        if (!opts.style || !opts.colourOf) throw new Error('StormGraph.mount needs style() and colourOf(node): the colours come from the page')
        const { ForceGraph3D: FG, THREE } = await libs()
        let S = opts.style(), picked = null
        const shapeOf = opts.shapeOf || (() => 'circle')
        const sprites = new Map()
        const sprite = (col, shape) => {
            const k = col + '|' + shape + '|' + S.outline; if (sprites.has(k)) return sprites.get(k)
            const c = document.createElement('canvas'); c.width = c.height = 96
            const x = c.getContext('2d'), p = new Path2D(SHAPES[shape] || SHAPES.circle)
            x.scale(4, 4); x.lineWidth = 1.6; x.lineJoin = 'round'; x.strokeStyle = S.outline; x.stroke(p); x.fillStyle = col; x.fill(p, 'evenodd')
            const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; sprites.set(k, t); return t
        }
        const size = n => 8 + Math.min(22, Math.sqrt(n.degree || 1) * 3.6)
        const ends = l => picked && (l.source.id === picked || l.target.id === picked)
        const all = { nodes: data.nodes, links: data.links }
        const obj = n => { const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: sprite(opts.colourOf(n), shapeOf(n)), transparent: true, depthWrite: false, toneMapped: false })); sp.scale.setScalar(size(n)); return sp }
        const linkCol = l => ends(l) ? S.linkPicked : l.label === 'hypothesis' ? S.linkHypothesis : l.label === 'evidence' ? S.linkMuted : S.link
        const fg = new FG(el, { controlType: 'orbit', rendererConfig: { antialias: true, alpha: false } })
            .backgroundColor(S.background).showNavInfo(false)
            .width(el.clientWidth).height(el.clientHeight)
            .nodeLabel(n => `<div class="g-tip">${esc(n.name)}<small>${esc(opts.tip ? opts.tip(n) : n.type)}</small></div>`)
            .nodeThreeObject(obj)
            .linkColor(linkCol).linkOpacity(0.55).linkWidth(l => ends(l) ? 0.9 : 0)
            .linkDirectionalArrowLength(2.4).linkDirectionalArrowRelPos(1)
            // a hypothesis is never drawn like a fact: its link carries moving dots (a fact's link is a plain line)
            .linkDirectionalParticles(l => l.label === 'hypothesis' ? 3 : 0).linkDirectionalParticleWidth(1.6).linkDirectionalParticleSpeed(0.006)
            .linkLabel(l => `<div class="g-tip">${esc(l.rel || '')}${l.lead_minutes != null ? ' · ' + l.lead_minutes + ' min' : ''}<small>${esc(l.label || '')}</small></div>`)
            .onNodeClick(n => { api.focus(n.id); if (opts.onPick) opts.onPick(n) })
            .graphData({ nodes: all.nodes.slice(), links: all.links.slice() })
        fg.d3Force('charge').strength(-45); fg.d3Force('link').distance(30)
        // fit once the layout has roughly settled, and again when it stops, unless the reader has already picked a node
        let fitted = 0; const fit = () => { if (!picked && fitted++ < 3) try { fg.zoomToFit(700, 20) } catch { } }
        setTimeout(fit, 1200); setTimeout(fit, 3500); fg.onEngineStop(fit)
        const ro = new ResizeObserver(() => fg.width(el.clientWidth).height(el.clientHeight)); ro.observe(el)
        // stop drawing when the tab is hidden: a 3D scene costs battery
        document.addEventListener('visibilitychange', () => document.hidden ? fg.pauseAnimation() : fg.resumeAnimation())
        const relink = () => fg.linkColor(linkCol).linkWidth(fg.linkWidth())
        const api = {
            fg,
            show(keep) {
                const nodes = all.nodes.filter(keep), ids = new Set(nodes.map(n => n.id)), id = x => typeof x === 'object' ? x.id : x
                fg.graphData({ nodes, links: all.links.filter(l => ids.has(id(l.source)) && ids.has(id(l.target))) })
            },
            focus(id) {
                const n = fg.graphData().nodes.find(x => x.id === id); if (!n) return false
                picked = id; relink()
                const d = Math.hypot(n.x || 1, n.y || 1, n.z || 1) || 1, k = 1 + 110 / d
                fg.cameraPosition({ x: (n.x || 1) * k, y: (n.y || 1) * k, z: (n.z || 1) * k }, n, 1100); return true
            },
            fit() { picked = null; relink(); fg.zoomToFit(900, 40) },
            restyle() { S = opts.style(); sprites.clear(); fg.backgroundColor(S.background).nodeThreeObject(obj); relink() }
        }
        return api
    }
    return { mount, fromStorm, libs, icon, SHAPES, engine: { url: LIBS, integrity: LIBS_SHA384, holds: '3d-force-graph 1.80.1, three 0.186.1' } }
})()
