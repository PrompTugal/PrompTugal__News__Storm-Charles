#!/usr/bin/env node
// The pipeline and the repository as data (kept by incident.ci@web-summit.dinis, WS-214).
//   node tools/ci-read.mjs            read GitHub's Actions API and this clone's history, write data/ci/
//   node tools/ci-read.mjs --no-api   history and tree only (runs are kept as they were)
// Run by the CI agent each wake, by hand, in a FULL clone; never by the build (the build reads no git history and CI
// clones one commit). It writes only small JSON, each file under 256 KB, split by UTC day (by hour, then by ten minutes, when one outgrows it):
//   data/ci/runs/<date>.json      every run of the deploy workflow: number, version, commit, agent, queued, started,
//                                 each step's seconds, push-to-served (from the run's own notice), result, the reason it failed
//   data/ci/commits/<date>.json   every commit on dev: sha, time, agent (from the Agent: trailer), subject, issue, For:,
//                                 files by folder, paths outside the agent's own (agents/policy.json), signature, the run and
//                                 the version that served it
//   data/ci/tree.json             the tree as a map: every folder's files, bytes and owner
//   data/ci/index.json            the list of the files above, the totals, the last runs, who pushes where, hand-offs, signing
// A run that had finished when it was last read is not asked for again (its steps do not change), so a wake costs a few calls.
// No session ids, no e-mail addresses, no names beyond the agents' own.
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { execFileSync, execFile } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { readKeys } from './lane-keystore.mjs'   // data/keys.json and data/keys-archive/ (the key list was split on 11 November)

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const REPO = 'PrompTugal/PrompTugal__News__Storm-Charles', API = `https://api.github.com/repos/${REPO}`, WEB = `https://github.com/${REPO}`
const BY = 'incident.ci@web-summit.dinis', OUT = path.join(ROOT, 'data/ci'), MAXF = 200e3
const NO_API = process.argv.includes('--no-api'), REF = 'origin/dev'
const git = (...a) => execFileSync('git', ['-C', ROOT, ...a], { maxBuffer: 1 << 28 }).toString()
const iso = d => new Date(d).toISOString().replace(/\.\d+Z$/, 'Z'), now = iso(Date.now())
const secs = (a, b) => a && b ? Math.round((new Date(b) - new Date(a)) / 1000) : null
const clean = s => String(s || '').replace(/https?:\/\/claude\.ai\/code\/session_[A-Za-z0-9]+/g, '').replace(/\bsession_[A-Za-z0-9]{8,}\b/g, '').replace(/[\w.+-]+@(?!web-summit\.|PrompTugal\.)[\w-]+\.(com|org|net|io|ai|pt)\b/gi, '').trim()
const readJ = f => { try { return JSON.parse(fs.readFileSync(f, 'utf8')) } catch { return null } }
const writeJ = (rel, o) => { const f = path.join(OUT, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); const s = JSON.stringify(o, null, 1) + '\n'; if (s.length > 256e3) throw new Error(`${rel}: ${s.length} bytes, over the gate's limit`); fs.writeFileSync(f, s); return s.length }
let calls = 0
// curl, not fetch: curl follows the machine's proxy settings (an agent's session reaches GitHub through one)
async function api(p) {
    calls++
    const url = p.startsWith('http') ? p : API + p
    const out = await new Promise((res, rej) => execFile('curl', ['-sS', '--max-time', '30', '-w', '\n%{http_code}', '-H', 'accept: application/vnd.github+json', '-H', 'user-agent: storm-charles-ci-read', url], { maxBuffer: 1 << 27 }, (e, so) => e ? rej(e) : res(so)))
    const cut = out.lastIndexOf('\n'), code = out.slice(cut + 1).trim()
    if (code !== '200') throw new Error(`${p}: HTTP ${code}`)
    return JSON.parse(out.slice(0, cut))
}
const pool = async (items, n, fn) => { const out = []; let i = 0; await Promise.all(Array.from({ length: n }, async () => { while (i < items.length) { const k = i++; out[k] = await fn(items[k]) } })); return out }

// ---------------------------------------------------------------- the clone
if (git('rev-parse', '--is-shallow-repository').trim() === 'true') { console.error('ci-read: this clone is shallow; run it in a full clone (git fetch --unshallow origin dev)'); process.exit(1) }
try { git('fetch', '-q', 'origin', 'dev', '--tags') } catch (e) { console.log('WARN fetch failed: reading the clone as it is') }
const SERIES = fs.readFileSync(path.join(ROOT, 'admin/series.txt'), 'utf8').trim()
const policy = readJ(path.join(ROOT, 'agents/policy.json'))
const rx = g => new RegExp('^' + g.split(/(\*\*|\*)/).map(p => p === '**' ? '.*' : p === '*' ? '[^/]*' : p.replace(/[.+?^${}()|[\]\\]/g, '\\$&')).join('') + '$')
const RX = new Map(), any = (globs, p, role) => (globs || []).some(g => { const k = g.replace(/<role>/g, role); if (!RX.has(k)) RX.set(k, rx(k)); return RX.get(k).test(p) })
const short = a => String(a || '').split('@')[0]
// the owners of a path under the policy as it is today (not as it was when the commit was made)
const ownersOf = p => Object.entries(policy.agents).filter(([, r]) => any(r.owns, p, r.role)).map(([a]) => a)
const standing = (agent, p) => {
    const r = policy.agents[agent]; if (!r) return 'unknown-agent'
    if (any(r.owns, p, r.role) || any(policy.everyone.owns, p, r.role)) return 'own'
    if (any((r.shared || []).filter(g => g !== '**'), p, r.role) || any(policy.everyone.shared, p, r.role)) return 'shared'
    return 'outside'
}
const folderOf = p => p.includes('/') ? p.split('/')[0] + '/' : '(root)'

// tags: which exist, what kind (a lightweight tag is a name for a commit and carries no signature)
const tags = git('for-each-ref', 'refs/tags', '--format=%(refname:short)%09%(objecttype)%09%(objectname)%09%(*objectname)').split('\n').filter(Boolean).map(l => { const [name, type, obj, peeled] = l.split('\t'); return { name, annotated: type === 'tag', sha: peeled || obj } })
const tagOfRun = new Map(tags.map(t => [Number(t.name.split('.').pop()), t]))

// commits, oldest first, with the files each changed
const SEP = '\x1e', F = '\x1f'
const log = git('log', REF, '--reverse', '--no-renames', '--name-only', `--format=${SEP}%H${F}%cI${F}%P${F}%B${F}`).split(SEP).filter(Boolean)
const shas = [], outsideAll = new Map()
const commits = log.map(rec => {
    const [sha, at, parents, msg, tail] = rec.split(F), files = (tail || '').split('\n').map(s => s.trim()).filter(Boolean)
    const subject = msg.split('\n')[0]
    const tr = k => [...msg.matchAll(new RegExp(`^${k}:[ \\t]*(.+)$`, 'gmi'))].flatMap(m => m[1].split(/[,;]\s*/)).map(s => s.trim()).filter(Boolean)
    const trailer = tr('Agent')[0], named = (subject.match(/^([a-z][\w.-]*@[\w.-]+?):\s/i) || [])[1]
    const agent = trailer || named || ''
    const folders = {}; for (const p of files) folders[folderOf(p)] = (folders[folderOf(p)] || 0) + 1
    const outside = policy.agents[agent] ? files.filter(p => standing(agent, p) === 'outside') : []
    const shared = policy.agents[agent] ? files.filter(p => standing(agent, p) === 'shared').length : 0
    shas.push(sha); outsideAll.set(sha, outside)
    return {
        sha, at: iso(at), agent, agent_from: trailer ? 'Agent: trailer' : named ? 'subject only' : 'not stated',
        what: clean(subject.replace(/^[^:\s]+@[^:\s]+:\s*/, '')).slice(0, 220), issue: tr('Issue')[0] || '', to: [...new Set(tr('For'))].map(clean).filter(t => /@/.test(t)),
        merge: parents.trim().includes(' ') || undefined, n_files: files.length, folders,
        files: files.slice(0, 40), files_more: Math.max(0, files.length - 40) || undefined,
        outside_n: outside.length || undefined, outside: outside.length ? outside.slice(0, 12).map(p => ({ path: p, owners: ownersOf(p).map(short) })) : undefined, shared_n: shared || undefined
    }
})
// signatures: what each commit object itself carries (the gpgsig header), and the key that made it
const cat = execFileSync('git', ['-C', ROOT, 'cat-file', '--batch'], { input: shas.join('\n') + '\n', maxBuffer: 1 << 28 })
{
    let off = 0
    for (const c of commits) {
        const nl = cat.indexOf(10, off), size = Number(cat.subarray(off, nl).toString().split(' ')[2]), body = cat.subarray(nl + 1, nl + 1 + size).toString('utf8'); off = nl + 1 + size + 1
        const head = body.slice(0, body.indexOf('\n\n')), m = head.match(/^gpgsig(?:-sha256)? (-----BEGIN ([A-Z ]+)-----[\s\S]*?-----END [A-Z ]+-----)/m)
        if (!m) { c.sig = { kind: 'none' }; continue }
        c.sig = { kind: /SSH/.test(m[2]) ? 'ssh' : /PGP/.test(m[2]) ? 'pgp' : 'other' }
        if (c.sig.kind === 'ssh') try {
            const blob = Buffer.from(m[1].replace(/-----[^-]+-----/g, '').replace(/\s+/g, ''), 'base64'), len = blob.readUInt32BE(10), pub = blob.subarray(14, 14 + len)
            c.sig.key = 'SHA256:' + crypto.createHash('sha256').update(pub).digest('base64').replace(/=+$/, '')
        } catch { }
    }
}

// ---------------------------------------------------------------- GitHub: verification of each commit, the runs
const prevRuns = new Map()
for (const f of fs.existsSync(path.join(OUT, 'runs')) ? fs.readdirSync(path.join(OUT, 'runs')) : []) for (const r of readJ(path.join(OUT, 'runs', f))?.runs || []) prevRuns.set(r.id, r)
const prevCommits = new Map()
for (const f of fs.existsSync(path.join(OUT, 'commits')) ? fs.readdirSync(path.join(OUT, 'commits')) : []) for (const c of readJ(path.join(OUT, 'commits', f))?.commits || []) prevCommits.set(c.sha, c)
const SPLIT_RUN = 1618   // the first run of the three-job workflow (fd90abcd)
const STEP = [[/^Set up job/, 'set up'], [/^Tag/, 'tag'], [/checkout/i, 'checkout'], [/^Version/, 'version'], [/^Build and gate/, 'gate'], [/upload-pages/, 'upload'], [/deploy-pages/, 'deploy'], [/^Measure/, 'measure']]
let runs = [...prevRuns.values()], apiOk = false, releases = null, apiError = ''
if (!NO_API) try {
    // GitHub's own verdict on each signature (verified, and why not when not)
    for (let page = 1, got = 0; got < commits.length && page <= 20; page++) {
        const list = await api(`/commits?sha=dev&per_page=100&page=${page}`); if (!list.length) break
        got += list.length
        for (const g of list) { const c = commits.find(x => x.sha === g.sha); if (c) c.sig.github = { verified: !!g.commit.verification?.verified, reason: g.commit.verification?.reason || '' } }
    }
    releases = (await api('/releases?per_page=100')).length
    const list = []
    for (let page = 1; page <= 30; page++) { const j = await api(`/actions/runs?per_page=100&page=${page}`); list.push(...j.workflow_runs); if (list.length >= j.total_count || !j.workflow_runs.length) break }
    const bySha = new Map(commits.map(c => [c.sha, c]))
    runs = await pool(list.filter(r => r.path === '.github/workflows/deploy.yml'), 8, async r => {
        const old = prevRuns.get(r.id)
        if (old && old.result !== 'in progress' && old.result !== 'queued' && old.attempt === r.run_attempt && (old.run < 418 || old.p === 4 || (old.p === 2 && old.run < SPLIT_RUN))) return old
        const done = r.status === 'completed', c = bySha.get(r.head_sha)
        const o = {
            run: r.run_number, id: r.id, attempt: r.run_attempt, version: `v${SERIES}.${r.run_number}`, sha: r.head_sha, branch: r.head_branch, event: r.event,
            agent: c?.agent || '', what: c?.what.slice(0, 120) || clean(r.display_title).slice(0, 120),
            pushed: r.head_commit?.timestamp ? iso(r.head_commit.timestamp) : null, queued: iso(r.created_at), started: null, ended: done ? iso(r.updated_at) : null,
            result: done ? r.conclusion : r.status === 'in_progress' ? 'in progress' : 'queued', url: r.html_url
        }
        try {
            // since run 1618 (fd90abcd, ci-altitudes.patch) a run is three jobs: build (contents: read), then deploy and tag beside
            // each other; before, one job. The run's steps are read from every job, build's first; queue_s is build's pickup;
            // gap_s is build's end to deploy's start (the second runner pickup the split costs); superseded: build passed and
            // deploy was skipped because the commit was no longer dev's head (deploy-newest-only, 7080c767)
            const all = (await api(`/actions/runs/${r.id}/jobs`)).jobs || []
            const ORDER = { build: 0, deploy: 1, tag: 2 }
            const jobs = all.length > 1 ? all.slice().sort((x, y) => (ORDER[x.name] ?? 9) - (ORDER[y.name] ?? 9)) : all
            const job = jobs[0]
            if (job) {
                o.started = job.started_at ? iso(job.started_at) : null; o.queue_s = secs(r.created_at, job.started_at)
                const ends = jobs.map(j => j.completed_at).filter(Boolean).sort()
                if (done && ends.length) { o.ended = iso(ends.at(-1)); o.run_s = secs(job.started_at, ends.at(-1)) }
                if (jobs.length > 1) {
                    o.jobs = jobs.map(j => ({ job: j.name, queue_s: j.started_at && j.conclusion !== 'skipped' ? secs(j.created_at, j.started_at) : null, s: j.conclusion === 'skipped' ? null : secs(j.started_at, j.completed_at), result: j.conclusion || j.status }))
                    const dj = jobs.find(j => j.name === 'deploy')
                    if (dj?.started_at && dj.conclusion !== 'skipped' && job.completed_at) o.gap_s = secs(job.completed_at, dj.started_at)
                    if (done && job.conclusion === 'success' && dj?.conclusion === 'skipped') o.superseded = true
                }
                // since run 418 the workflow tries the deploy a second time when the first fails (ci/patches, applied 9ed312b):
                // a skipped step is left out; the second try is its own step; a run the retry saved is "success" with deploy_retried
                let deploys = 0
                const stepName = s => { const n = (STEP.find(([re]) => re.test(s.name)) || [0, s.name])[1]; return n === 'deploy' && ++deploys > 1 ? 'deploy (2nd try)' : /^Wait before/.test(s.name) ? 'wait' : n }
                o.steps = jobs.flatMap(j => (j.steps || []).filter(s => !/^(Post |Complete job)/.test(s.name)).map(s => ({ step: j !== job && /^Set up job/.test(s.name) ? 'set up (' + j.name + ')' : stepName(s), s: secs(s.started_at, s.completed_at), result: s.conclusion || s.status }))).filter(s => s.result !== 'skipped')
                o.p = jobs.length > 1 ? 4 : 2   // 4: three jobs, the tag step named tag (3 named it checkout: its name says "no checkout")
                const first = o.steps.find(s => s.step === 'deploy'), second = o.steps.find(s => s.step === 'deploy (2nd try)')
                // the first try has continue-on-error, so GitHub's API reports its conclusion as "success" even when it failed:
                // the second try only runs when the first failed, so its presence (not skipped) is the evidence
                if (first && second && /^(success|failure)$/.test(second.result)) o.deploy_retried = second.result   // a run still going lists the step as pending
                const bad = o.steps.filter(s => s.result === 'failure').at(-1); if (bad && r.conclusion === 'failure') o.failed_step = bad.step
                if (done) {
                    const ann = (await Promise.all(jobs.filter(j => j.conclusion && j.conclusion !== 'skipped').map(j => api(`/check-runs/${j.id}/annotations`)))).flat()
                    const pts = ann.find(a => a.title === 'push-to-served'); if (pts) o.push_to_served_s = Number((pts.message.match(/^(\d+) s/) || [])[1] ?? NaN)
                    const errs = [...new Set(ann.filter(a => a.annotation_level === 'failure').map(a => clean(a.message).split('\n')[0].slice(0, 200)))]; if (errs.length) o.reason = errs.join(' | ')
                }
            }
        } catch (e) { o.note = 'steps not read: ' + e.message }
        return o
    })
    apiOk = true
} catch (e) { apiError = e.message; console.log('WARN the API did not answer (' + e.message + '): runs kept as last read') }
// a commit GitHub was not asked about this time keeps the verdict of the last read
for (const c of commits) if (!c.sig.github && prevCommits.get(c.sha)?.sig?.github) c.sig.github = prevCommits.get(c.sha).sig.github
runs.sort((a, b) => a.run - b.run)
for (const r of runs) { const t = tagOfRun.get(r.run); r.tag = t && t.sha === r.sha ? t.name : null; if (r.push_to_served_s != null && Number.isNaN(r.push_to_served_s)) delete r.push_to_served_s }

// which run and which version served each commit: its own run if that succeeded, else the first later run that did
const idx = new Map(commits.map((c, i) => [c.sha, i])), ok = runs.filter(r => r.result === 'success' && idx.has(r.sha)).sort((a, b) => idx.get(a.sha) - idx.get(b.sha) || a.run - b.run)
const ownRun = new Map(); for (const r of runs) if (!ownRun.has(r.sha) || r.result === 'success') ownRun.set(r.sha, r)
for (const [i, c] of commits.entries()) {
    const own = ownRun.get(c.sha); c.run = own ? { run: own.run, result: own.result } : null
    const s = ok.find(r => idx.get(r.sha) >= i)
    c.served = s ? { version: s.version, run: s.run, at: s.ended, with_its_own_run: s.sha === c.sha, lag_s: secs(c.at, s.ended) } : null
}

// ---------------------------------------------------------------- write: by day, by hour when a day is too big
const about = {
    runs: 'Runs of the deploy workflow (.github/workflows/deploy.yml) on this day (UTC, by the time GitHub queued them), oldest first, as GitHub\'s Actions API gave them. version: v<series>.<run number>, CI\'s own number. agent, what: from the commit the run built (the Agent: trailer). pushed: the head commit\'s time; queued: the run created; started: a runner took the job; queue_s between the last two. steps: seconds per step. jobs (from run 1618, three: build, deploy, tag): each job\'s queue_s, seconds and result; gap_s: build\'s end to deploy\'s start; superseded: build passed, deploy skipped (no longer dev\'s head). push_to_served_s: the run\'s own notice (it reads version.json on the live site until it serves this version). result: success, failure, cancelled (a newer push replaced it while it waited), in progress. tag: the version tag when it exists on that commit. Read by tools/ci-read.mjs.',
    commits: 'Commits on dev made on this day (UTC, committer time), oldest first, from a full clone. agent: the Agent: trailer (agent_from says where it was read); what: the subject without the agent; to: the For: trailers (a hand-off); folders: files changed per top-level folder; files: the paths (the first 40); outside: paths that are not the agent\'s own under agents/policy.json as it is today, with their owners; sig: the signature the commit object carries (kind, the key\'s fingerprint) and GitHub\'s verdict; run: the workflow run of this very commit; served: the run and version that first served it (its own, or a later one when its own was replaced), and lag_s from commit to served. No session ids. A commit: ' + WEB + '/commit/<sha>.'
}
// by day; a day over the size by hour; an hour over it by ten minutes (a busy hour here is fifty commits of forty paths each)
const split = (items, timeOf, cut = 10) => {
    const groups = new Map(); for (const it of items) { const d = timeOf(it).slice(0, cut); (groups.get(d) || groups.set(d, []).get(d)).push(it) }
    const out = []
    for (const [d, list] of groups) {
        if (cut >= 15 || JSON.stringify(list, null, 1).length < MAXF) out.push([d, list])
        else out.push(...split(list, timeOf, cut === 10 ? 13 : 15))
    }
    return out
}
const listing = { runs: [], commits: [] }
for (const [kind, items, timeOf] of [['runs', runs, r => r.queued], ['commits', commits, c => c.at]]) {
    const dir = path.join(OUT, kind), keep = new Set()
    for (const [key, list] of split(items, timeOf)) {
        const name = key.replace(':', '') + (key.length === 15 ? '0' : '') + '.json'; keep.add(name)   // 2026-11-11, 2026-11-11T02, 2026-11-11T0210
        // a file whose items did not change keeps its stamp, so a wake that finds nothing new changes nothing
        const old = readJ(path.join(dir, name)), same = old && JSON.stringify(old[kind]) === JSON.stringify(list)
        const bytes = same ? fs.statSync(path.join(dir, name)).size : writeJ(`${kind}/${name}`, { about: about[kind], by: BY, updated: now, source: kind === 'runs' ? `${API}/actions/runs` : `${WEB}/commits/dev`, period: key, count: list.length, [kind]: list })
        listing[kind].push({ file: `${kind}/${name}`, period: key, count: list.length, bytes, from: timeOf(list[0]), to: timeOf(list.at(-1)) })
    }
    if (fs.existsSync(dir)) for (const f of fs.readdirSync(dir)) if (!keep.has(f)) fs.rmSync(path.join(dir, f))
}

// ---------------------------------------------------------------- the tree as a map
const tracked = git('ls-files', '-z').split('\0').filter(Boolean)
const node = () => ({ files: 0, bytes: 0, owners: {}, kinds: {}, largest: null })
const top = {}, sub = {}
for (const p of tracked) {
    let bytes = 0; try { bytes = fs.statSync(path.join(ROOT, p)).size } catch { continue }
    const seg = p.split('/'), t = seg.length > 1 ? seg[0] + '/' : '(root)', s2 = seg.length > 2 ? seg[0] + '/' + seg[1] + '/' : null
    const own = ownersOf(p).map(short), ext = (p.match(/\.([a-z0-9]+)$/i) || [0, 'none'])[1].toLowerCase()
    for (const [map, k] of [[top, t], ...(s2 ? [[sub, s2]] : [])]) {
        const n = map[k] || (map[k] = node()); n.files++; n.bytes += bytes; n.kinds[ext] = (n.kinds[ext] || 0) + 1
        for (const o of own.length ? own : ['no owner']) n.owners[o] = (n.owners[o] || 0) + 1
        if (!n.largest || bytes > n.largest.bytes) n.largest = { path: p, bytes }
    }
}
const lastTouch = {}; for (const c of commits) for (const f of Object.keys(c.folders)) lastTouch[f] = { at: c.at, agent: short(c.agent), sha: c.sha.slice(0, 10) }
const shape = (map, extra = () => ({})) => Object.entries(map).map(([folder, n]) => ({ folder, ...n, owners: Object.entries(n.owners).sort((a, b) => b[1] - a[1]).map(([agent, files]) => ({ agent, files })), ...extra(folder) })).sort((a, b) => b.bytes - a.bytes)
const biggest = tracked.map(p => { try { return { path: p, bytes: fs.statSync(path.join(ROOT, p)).size } } catch { return null } }).filter(Boolean).sort((a, b) => b.bytes - a.bytes)
const treeTotals = { files: biggest.length, bytes: biggest.reduce((n, f) => n + f.bytes, 0), limit_bytes: 256 * 1024, over_200k: biggest.filter(f => f.bytes > 200e3).length, nearest_the_limit: biggest.slice(0, 12) }
const prevTree = readJ(path.join(OUT, 'tree.json')), treeBody = { totals: treeTotals, folders: shape(top, f => ({ last_change: lastTouch[f] || null, children: shape(Object.fromEntries(Object.entries(sub).filter(([k]) => k.startsWith(f)))).map(({ largest, kinds, ...r }) => r) })) }
if (!prevTree || JSON.stringify({ totals: prevTree.totals, folders: prevTree.folders }) !== JSON.stringify(treeBody))
    writeJ('tree.json', {
        about: 'The repository as a map: every top-level folder (and the folders inside it) with its tracked files, bytes, kinds by extension, largest file, and who owns its files under agents/policy.json (a file with no owning glob counts under "no owner"; the conductor\'s catch-all is not ownership). last_change: the newest commit that touched the folder. From git ls-files in the CI agent\'s clone at head; the working files\' sizes. What git must never hold is in holds.never (CLAUDE.md; the gate enforces it).',
        by: BY, updated: now, head: commits.at(-1)?.sha, ...treeBody,
        holds: { git: ['code', 'schemas', 'markdown', 'small JSON (each file at most 256 KB)'], never: ['binaries (images, PDFs, video)', 'raw captures (HTML, screenshots, API dumps)', 'model request and response text', 'node_modules', '_site/ (CI builds it)', 'anything from a key store'], instead: 'raw captures, screenshots and model calls go to vaults; git keeps a pointer and a sha256', enforced_by: 'admin/build/validate.mjs' }
    })

// ---------------------------------------------------------------- the index: totals and the joins the pages draw
const count = (list, key) => { const m = {}; for (const x of list) { const k = key(x); if (k != null) m[k] = (m[k] || 0) + 1 } return m }
const matrix = {}, standingBy = {}, outF = {}
for (const c of commits) { const a = short(c.agent) || 'not stated', row = matrix[a] || (matrix[a] = {}); for (const [f, n] of Object.entries(c.folders)) row[f] = (row[f] || 0) + n; const s = standingBy[a] || (standingBy[a] = { commits: 0, files: 0, outside: 0, shared: 0, first: c.at, last: c.at }); s.commits++; s.files += c.n_files; s.outside += c.outside_n || 0; s.shared += c.shared_n || 0; s.last = c.at; const of = outF[a] || (outF[a] = {}); for (const p of outsideAll.get(c.sha) || []) of[folderOf(p)] = (of[folderOf(p)] || 0) + 1 }
const flows = new Map(); for (const c of commits) for (const to of c.to) { const k = short(c.agent) + '\0' + short(to), f = flows.get(k) || { from: short(c.agent), to: short(to), n: 0, first: c.at, last: c.at, last_sha: '' }; f.n++; f.last = c.at; f.last_sha = c.sha.slice(0, 10); flows.set(k, f) }
const cross = new Map(); for (const c of commits) for (const p of outsideAll.get(c.sha) || []) for (const ow of ownersOf(p).length ? ownersOf(p).map(short) : ['no owner']) { const k = short(c.agent) + '\0' + ow, f = cross.get(k) || { by: short(c.agent), owner: ow, paths: 0, commits: new Set(), example: p }; f.paths++; f.commits.add(c.sha); cross.set(k, f) }
const keys = (() => { try { return readKeys().keys } catch { return null } })() || []
const sigKeys = count(commits.filter(c => c.sig.key), c => c.sig.key)
const fin = runs.filter(r => r.result === 'success'), pts = fin.map(r => r.push_to_served_s).filter(n => Number.isFinite(n)).sort((a, b) => a - b)
const q = (a, p) => a.length ? a[Math.min(a.length - 1, Math.floor(p * a.length))] : null
const stepAgg = {}; for (const r of fin) for (const s of r.steps || []) if (s.s != null) (stepAgg[s.step] || (stepAgg[s.step] = [])).push(s.s)
const steps = Object.entries(stepAgg).map(([step, a]) => { a.sort((x, y) => x - y); return { step, runs: a.length, median_s: q(a, .5), p90_s: q(a, .9), max_s: a.at(-1) } })
const last20 = fin.slice(-20), gate20 = last20.map(r => r.steps?.find(s => s.step === 'gate')?.s).filter(n => n != null)
const queue20 = runs.slice(-20).map(r => r.queue_s).filter(n => n != null)
const index = {
    about: 'The pipeline and the repository of storm-charles.promptugal.news as data: the list of the day files (runs/, commits/), the totals, the pipeline\'s measures, who pushes where (agents against top-level folders, by files changed), hand-offs (For: trailers), changes outside an agent\'s own paths, and what is and is not signed. Written by tools/ci-read.mjs, run by incident.ci@ each wake in a full clone: a snapshot as of updated, not a live feed. The pages under /ci/ draw it. No session ids.',
    by: BY, updated: now, repository: REPO, web: WEB, branch: 'dev', head: commits.at(-1)?.sha, series: SERIES,
    read: { api: apiOk ? 'read ' + now : NO_API ? 'not asked this time' : 'did not answer: ' + apiError, api_calls: calls, history: 'a full clone, origin/dev at head' },
    files: listing, tree: 'tree.json',
    totals: { commits: commits.length, first_commit: commits[0]?.at, last_commit: commits.at(-1)?.at, runs: runs.length, by_result: count(runs, r => r.result), agents: Object.keys(standingBy).length, tags: tags.length, github_releases: releases },
    pipeline: {
        steps_in_order: ['push', 'queued', 'checkout', 'gate', 'upload', 'deploy', 'tag', 'measure'],
        push_to_served_s: { runs: pts.length, median: q(pts, .5), p90: q(pts, .9), max: pts.at(-1) ?? null, min: pts[0] ?? null, source: 'each successful run\'s own notice' },
        steps, slowest_step: steps.slice().sort((a, b) => b.median_s - a.median_s || b.max_s - a.max_s)[0] || null,
        gate: { budget_s: Number((fs.readFileSync(path.join(ROOT, 'admin/build/validate.mjs'), 'utf8').match(/over its (\d+) s budget/) || [0, 5])[1]), last_20_max_s: gate20.length ? Math.max(...gate20) : null, last_20_median_s: q(gate20.slice().sort((a, b) => a - b), .5), note: 'the step\'s seconds as GitHub timed them (whole seconds, node start included); the gate prints its own milliseconds in the run\'s log' },
        queue: { last_20_max_s: queue20.length ? Math.max(...queue20) : null, last_20_median_s: q(queue20.slice().sort((a, b) => a - b), .5) },
        deploy_retries: runs.map(r => ({ r, second: r.deploy_retried || r.steps?.find(s => s.step === 'deploy (2nd try)')?.result })).filter(x => /^(success|failure)$/.test(x.second || '')).map(({ r, second }) => ({ run: r.run, at: r.queued, second_try: second, first_try_error: r.reason ? r.reason.split(' | ')[0].slice(0, 120) : null, result: r.result, push_to_served_s: r.push_to_served_s ?? null, url: r.url })),
        failures: runs.filter(r => r.result === 'failure').map(r => ({ run: r.run, at: r.queued, agent: short(r.agent), failed_step: r.failed_step || null, reason: r.reason || 'not recorded', url: r.url })),
        last: runs.slice(-12).reverse().map(r => ({ run: r.run, version: r.version, result: r.result, agent: short(r.agent), queued: r.queued, push_to_served_s: r.push_to_served_s ?? null, what: r.what }))
    },
    agents: Object.entries(standingBy).map(([agent, s]) => ({ agent, ...s, folders: matrix[agent], outside_folders: outF[agent] || {}, has_key: keys.some(k => short(k.agent) === agent) })).sort((a, b) => b.commits - a.commits),
    folders: [...new Set(commits.flatMap(c => Object.keys(c.folders)))].sort(),
    handoffs: [...flows.values()].sort((a, b) => b.n - a.n || a.from.localeCompare(b.from)),
    cross_folder: [...cross.values()].map(f => ({ ...f, commits: f.commits.size })).sort((a, b) => b.paths - a.paths),
    signing: {
        commits: { total: commits.length, with_a_signature: commits.filter(c => c.sig.kind !== 'none').length, without: commits.filter(c => c.sig.kind === 'none').map(c => c.sha.slice(0, 10)), github_verified: commits.filter(c => c.sig.github?.verified).length, github_not_asked: commits.filter(c => !c.sig.github).length, keys: Object.entries(sigKeys).map(([key, n]) => ({ key, commits: n, in_data_keys_json: false })), kinds: count(commits, c => c.sig.kind) },
        agent_named_by: count(commits, c => c.agent_from),
        tags: { total: tags.length, annotated: tags.filter(t => t.annotated).length, lightweight: tags.filter(t => !t.annotated).length, signed: 0 },
        releases: { github_releases: releases, signed_by_an_agent_key: 0 },
        agent_keys_published: keys.length,
        reading: 'Every commit object carries one signature, made by the hosting service the agents\' sessions run in, with a key that is the same for every agent: it shows the commit came through that service and was not altered after, and GitHub marks it Verified. It does not say WHICH agent: that is only the Agent: trailer, a line of text any pusher could write. No commit, tag or release is signed with an agent\'s own key from data/keys.json. The version tags are lightweight: names for commits, with no signature. The proposal: ci/signing.md.'
    }
}
const prevIndex = readJ(path.join(OUT, 'index.json')), strip = o => JSON.stringify({ ...o, updated: 0, read: 0 })
if (!prevIndex || strip(prevIndex) !== strip(index)) writeJ('index.json', index)
console.log(`ci-read: ${commits.length} commits (${listing.commits.length} file(s)), ${runs.length} runs (${listing.runs.length} file(s)), ${tracked.length} files in the tree, ${calls} API call(s)${apiOk ? '' : ' (API not read)'}`)
