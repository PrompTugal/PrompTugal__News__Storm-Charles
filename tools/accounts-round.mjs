#!/usr/bin/env node
// The round, as numbers only: the latest line of each session in accounts/ledger/, each agent's current session (largest context first,
// with its previous session's last-hour tokens per call), the last hours for the team, and the same hours with and without the conductor.
// Kept by incident.accountant@web-summit.dinis (WS-214). Reads only accounts/ledger/*.jsonl; writes nothing. Pipe through cut -c1-140.
import fs from 'fs';
const dir='accounts/ledger/', by={};
for(const f of fs.readdirSync(dir).filter(f=>f.endsWith('.jsonl')))for(const l of fs.readFileSync(dir+f,'utf8').trim().split('\n').filter(Boolean).map(JSON.parse))by[l.session]=l;
const S=Object.values(by), tok=t=>t.fresh_input+t.output+t.cache_writes+t.cache_reads;
let T=0,C=0;const H={},R={};
for(const l of S){const t=l.totals;T+=tok(t);C+=t.calls;(R[l.role]??=[]).push(l);for(const[h,v]of Object.entries(t.by_hour||{})){H[h]??={c:0,t:0,a:new Set()};H[h].c+=v.calls;H[h].t+=tok(v);H[h].a.add(l.role)}}
console.log('sessions',S.length,'roles',Object.keys(R).length,'T',T,'C',C);
const cur=Object.entries(R).map(([r,ls])=>{ls.sort((a,b)=>a.at<b.at?-1:1);const l=ls.at(-1),t=l.totals;const hk=Object.keys(t.by_hour).sort().pop(),h=t.by_hour[hk];
 const prev=ls.filter(x=>x!==l&&x.totals.first_call<t.first_call).at(-1);let po='';if(prev){const pk=Object.keys(prev.totals.by_hour).sort().pop(),ph=prev.totals.by_hour[pk];po=`prev ${prev.totals.calls}c ${Math.round(tok(ph)/ph.calls)}/c`}
 return[t.context_per_call.last,`${r} n=${ls.length} at ${l.at.slice(11,16)} start ${t.first_call.slice(5,16)} calls ${t.calls} last ${t.context_per_call.last} avg ${Math.round(tok(t)/t.calls)} lasthr ${hk.slice(11,13)}:${h.calls}c ${po}`]});
cur.sort((a,b)=>b[0]-a[0]);for(const c of cur)console.log(c[1]);
for(const h of Object.keys(H).sort().slice(-5))console.log(h,H[h].c,Math.round(H[h].t/H[h].c),H[h].a.size);
{

for(const f of fs.readdirSync(dir).filter(f=>f.endsWith('.jsonl')))for(const l of fs.readFileSync(dir+f,'utf8').trim().split('\n').filter(Boolean).map(JSON.parse))by[l.session]=l;
const H={};let ct=0,T=0;
for(const l of Object.values(by)){const c=l.role==='conductor';T+=tok(l.totals);if(c)ct+=tok(l.totals);for(const[h,v]of Object.entries(l.totals.by_hour)){H[h]??={c:0,t:0,cc:0,ctk:0};if(c){H[h].cc+=v.calls;H[h].ctk+=tok(v)}else{H[h].c+=v.calls;H[h].t+=tok(v)}}}
console.log('conductor',ct,(100*ct/T).toFixed(1)+'%');
for(const h of Object.keys(H).sort().slice(-7)){const x=H[h];console.log(h.slice(11),'others',x.c,Math.round(x.t/x.c),'conductor',x.cc,x.cc?Math.round(x.ctk/x.cc):0,'share',(100*x.ctk/(x.ctk+x.t)).toFixed(0)+'%')}
const c=Object.values(by).find(l=>l.role==='conductor').totals;console.log(JSON.stringify(c.context_per_call),c.compactions);
}
