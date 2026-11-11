// incident.ci@: status.json for a wake. node agents/ci/st.cjs "$(date -u +%Y-%m-%dT%H:%M:00Z)" "<one line of what the wake found>"
const fs=require('fs');const q='agents/ci/status.json';const raw=fs.readFileSync(q,'utf8');const s=JSON.parse(raw);const now=process.argv[2];
s.updated=now;s.last_wake=now;s.done.push(now.slice(11,16)+'Z wake: '+process.argv[3]);
fs.writeFileSync(q,JSON.stringify(s,null,raw.match(/\n( +)"/)[1].length)+(raw.endsWith('\n')?'\n':''));
