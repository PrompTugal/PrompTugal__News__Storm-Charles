// incident.ci@: the wake in one screen. node agents/ci/wake.cjs <ISO time of the last wake>   (after node tools/ci-read.mjs)
const fs=require('fs');const p=JSON.parse(fs.readFileSync('data/ci/index.json')).pipeline;
console.log('failures',p.failures.map(f=>f.run+':'+f.failed_step+'@'+f.at.slice(11,16)).join(' '));
console.log('retries',p.deploy_retries.map(r=>r.run+':'+r.second_try+'@'+r.at.slice(11,16)).join(' '));
console.log('gate',JSON.stringify(p.gate).slice(0,70),'queue',JSON.stringify(p.queue),'pts',JSON.stringify(p.push_to_served_s).slice(0,70));
let runs=[];for(const f of fs.readdirSync('data/ci/runs'))runs.push(...(JSON.parse(fs.readFileSync('data/ci/runs/'+f)).runs||[]));
const since=runs.filter(r=>r.pushed>(process.argv[2]||''));const c={};for(const r of since)c[r.result]=(c[r.result]||0)+1;
const g=since.map(r=>(r.steps||[]).find(s=>s.step=='gate')?.s).filter(x=>x!=null).sort((a,b)=>a-b);
const pts=since.map(r=>r.push_to_served_s).filter(Boolean).sort((a,b)=>a-b);const q=since.map(r=>r.queue_s).filter(x=>x!=null).sort((a,b)=>a-b);
console.log('since '+(process.argv[2]||'the start'),since.length,JSON.stringify(c),'gate med',g[g.length>>1],'max',g.at(-1),'pts med',pts[pts.length>>1],'max',pts.at(-1),'queue max',q.at(-1));
