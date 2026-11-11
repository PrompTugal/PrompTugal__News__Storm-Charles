// agents/ipma/after-round.cjs: after tools/ipma-round.mjs, print the read line and what changed for Lisbon and Madeira at the last read, update status.json, write the commit subject to ~/subject.txt. node agents/ipma/after-round.cjs (from the repository root)
const fs=require('fs');const cwd=process.cwd();
const w=require(cwd+'/sources/ipma/data/warnings.json');const r=require(cwd+'/sources/ipma/reads.json');const d=require(cwd+'/sources/ipma/dataset.json');
const rs=r.reads||r;const l=rs[rs.length-1];const wr=w.reads[w.reads.length-1];const lr=wr.read_utc;
const t=s=>(s||'').slice(5,16);
console.log('READ',l.at,l.requests,'req',l.ok,'ok',l.changed.length,'changed','failed:',(l.failed||[]).length,'| warnings file',wr.last_modified,'above green',wr.not_green,'new',wr.new);
console.log('VAULT pushed',d.vault.pushed_utc,d.vault.error||'');
let all=[],ours=[];
for(const i of w.instances){const tag=i.gone_read_utc===lr?i.gone+(i.replaced_by?' by '+i.replaced_by.join(','):''):i.first_read_utc===lr?'NEW':null;if(!tag)continue;
 const line=`${i.area} ${i.type} ${i.level} ${t(i.start_utc)}>${t(i.end_utc)} ${tag}`;all.push(line);if(['LSB','MCN','MCS','MPS','MRM'].includes(i.area))ours.push(line)}
console.log('CHANGES all:',all.length);console.log('LSB/MADEIRA:',ours.length?'\n'+ours.join('\n'):'none');
console.log('LSB live:',w.instances.filter(i=>i.area==='LSB'&&!i.gone_read_utc).map(i=>`${i.type} ${i.level} ${t(i.start_utc)}>${t(i.end_utc)}`).join('; '));
const p='agents/ipma/status.json';const raw=fs.readFileSync(p,'utf8');const s=JSON.parse(raw);const now=new Date().toISOString().replace(/\.\d+Z/,'Z');
s.state='active: second session; reading IPMA hourly at :47; last read '+l.at+' ('+l.requests+' requests, '+l.ok+' answered 200, '+l.changed.length+' files changed)';s.last_wake=now;s.updated=now;
fs.writeFileSync(p,JSON.stringify(s,null,raw.match(/^(\s+)"/m)[1])+(raw.endsWith('\n')?'\n':''));
fs.writeFileSync(process.env.HOME+'/subject.txt',`incident.ipma@web-summit.dinis: read ${l.at.slice(11,16)} UTC: ${l.requests} requests, ${l.ok} answered 200, ${l.changed.length} files changed; warnings (IPMA's file dated ${wr.last_modified.slice(11,16)}): ${wr.not_green} above green; ${all.length?all.slice(0,6).join('; ')+(all.length>6?'; and '+(all.length-6)+' more':''):'no warning changed'}`);
