// A small adapter onto Silvio's graph engine (incident.graph@web-summit.dinis).
// The engine is the bundle behind web-summit.sgit.ai's Universe (assets/cc/brain.js): brain-libs.js, which holds
// 3d-force-graph 1.80.1 and three 0.186.1 as window.BrainLibs. It is 1.6 MB, so it is never committed here: it is
// loaded from web-summit.sgit.ai when a graph opens, pinned by its sha384 (if the file there changes, nothing runs
// and the page falls back to its list). brain.js itself is the Universe's own data and panels; we reuse the engine
// and its look (orbs on a dark stage), not its data.
//
// For any page of this site (incident.observability@ uses it for the agents):
//   const g = await StormGraph.mount(element, { nodes: [{ id, name, type, degree? }], links: [{ source, target, rel? }] },
//                                    { colours: { <type>: '#rrggbb' }, onPick(node), tip(node) -> string })
//   g.show(predicate)   which nodes are drawn      g.focus(id)   fly to one      g.fg   the 3d-force-graph instance
//   StormGraph.fromStorm(storm)   data/graph/storm.json -> { nodes, links } for mount
window.StormGraph = (function () {
    'use strict'
    const LIBS = 'https://web-summit.sgit.ai/assets/cc/brain-libs.js'
    const LIBS_SHA384 = 'sha384-FGe8jg7muKBvFcLZR295Ju2x8gGa1eYfgstKeICxxWwHrXuCHKGytFV8szwXsBuL'
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
        const { ForceGraph3D: FG, THREE } = await libs()
        const colours = opts.colours || {}, colourOf = n => colours[n.type] || '#9aa3b2'
        // the engine's look: each node a soft orb in its colour (a sprite, as in the Universe), sized by its links
        const orbs = new Map()
        const orb = col => {
            if (orbs.has(col)) return orbs.get(col)
            const c = document.createElement('canvas'); c.width = c.height = 64
            const x = c.getContext('2d'), g = x.createRadialGradient(32, 32, 2, 32, 32, 30)
            g.addColorStop(0, '#ffffff'); g.addColorStop(0.28, col); g.addColorStop(0.7, col); g.addColorStop(1, 'rgba(0,0,0,0)')
            x.fillStyle = g; x.beginPath(); x.arc(32, 32, 30, 0, Math.PI * 2); x.fill()
            const t = new THREE.CanvasTexture(c); orbs.set(col, t); return t
        }
        const size = n => 9 + Math.min(26, Math.sqrt(n.degree || 1) * 4.2)
        const all = { nodes: data.nodes, links: data.links }
        let picked = null
        const fg = new FG(el, { controlType: 'orbit', rendererConfig: { antialias: true, alpha: false } })
            .backgroundColor(opts.background || '#0b0d12').showNavInfo(false)
            .width(el.clientWidth).height(el.clientHeight)
            .nodeLabel(n => `<div class="g-tip">${esc(n.name)}<small>${esc(opts.tip ? opts.tip(n) : n.type)}</small></div>`)
            .nodeThreeObject(n => { const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: orb(colourOf(n)), transparent: true, depthWrite: false })); sp.scale.setScalar(size(n)); n.__sp = sp; return sp })
            .linkColor(l => picked && (l.source.id === picked || l.target.id === picked) ? '#ffffff' : l.label === 'hypothesis' ? '#b08cf0' : l.label === 'evidence' ? '#c99a4a' : '#5d6b85')
            .linkOpacity(0.38).linkWidth(l => picked && (l.source.id === picked || l.target.id === picked) ? 0.9 : 0)
            .linkDirectionalArrowLength(2.4).linkDirectionalArrowRelPos(1)
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
        const api = {
            fg,
            show(keep) {
                const nodes = all.nodes.filter(keep), ids = new Set(nodes.map(n => n.id)), id = x => typeof x === 'object' ? x.id : x
                fg.graphData({ nodes, links: all.links.filter(l => ids.has(id(l.source)) && ids.has(id(l.target))) })
            },
            focus(id) {
                const n = fg.graphData().nodes.find(x => x.id === id); if (!n) return false
                picked = id; fg.linkColor(fg.linkColor()).linkWidth(fg.linkWidth())
                const d = Math.hypot(n.x || 1, n.y || 1, n.z || 1) || 1, k = 1 + 110 / d
                fg.cameraPosition({ x: (n.x || 1) * k, y: (n.y || 1) * k, z: (n.z || 1) * k }, n, 1100); return true
            },
            fit() { picked = null; fg.linkColor(fg.linkColor()).linkWidth(fg.linkWidth()); fg.zoomToFit(900, 40) }
        }
        return api
    }
    return { mount, fromStorm, libs, engine: { url: LIBS, integrity: LIBS_SHA384, holds: '3d-force-graph 1.80.1, three 0.186.1' } }
})()
