// The frame: the theme switch (auto, light, dark) and the address shown on the 404 page (incident.designer@web-summit.dinis, design/round-19.md). Moved out of the page so the site can run under a
// Content-Security-Policy with no inline script. No behaviour changed.
(function(){var b=document.getElementById('theme');if(!b)return; /* the switch moved into the panel (round 30); kept for hand-written pages that still carry the button */var r=document.documentElement,o=['auto','light','dark'];function cur(){return r.dataset.theme||'auto'}function show(){b.innerHTML='<span>Theme: </span>'+cur()}b.hidden=false;show();b.addEventListener('click',function(){var n=o[(o.indexOf(cur())+1)%3];if(n==='auto')delete r.dataset.theme;else r.dataset.theme=n;try{n==='auto'?localStorage.removeItem('theme'):localStorage.setItem('theme',n)}catch(e){}show()})})()
;(function(){var e=document.getElementById('nf-path');if(e)e.textContent=location.pathname})()
// addresses that moved keep working (round 34): the old front page's parts are in the data room; the file viewer is view/?path=
;(function(){var p=location.pathname,h=location.hash,m=p.match(/^(.*\/)view\/(.+)\.html$/);
if(m&&document.getElementById('nf-path')){location.replace(m[1]+'view/?path='+encodeURIComponent(m[2])+h);return}
if(h.length>1&&document.getElementById('wx')&&!document.getElementById(h.slice(1))&&/^#(day|wind|madeira|lisbon-rain|thursday|where|signals|wx-changes)$/.test(h))location.replace((document.getElementById('wx').dataset.base||'./')+'data-room/index.html'+h)})()
// round 46: a long "Kept by" block under a page's title folds to four lines with a "Show all" button (on a phone it was up to 450 px before the
// first paragraph). Without this script the block is whole; print shows it whole; a link into it opens it.
;(function(){var q=document.querySelector('.doc article > h1 + blockquote');if(!q||q.scrollHeight<170)return;
var b=document.createElement('button');b.type='button';b.className='kept-more';
function set(o){q.classList.toggle('open',o);b.setAttribute('aria-expanded',o?'true':'false');b.textContent=o?'Show less':'Show all of this note'}
q.classList.add('kept-fold');var t=location.hash.length>1&&document.getElementById(location.hash.slice(1));set(!!(t&&q.contains(t)));
b.addEventListener('click',function(){set(!q.classList.contains('open'))});q.after(b)})()
// round 48: the masthead's chip says when this page was built, counted from the reader's clock ("Updated 3 min ago"), not a claim that
// everything is live; after an hour its dot goes grey. Without this script it reads "Updated 10:02 UTC".
;(function(){var e=document.querySelector('.live[data-built]');if(!e)return;var t=Date.parse(e.dataset.built);if(!t)return;
function f(){var m=Math.max(0,Math.round((Date.now()-t)/6e4));e.lastChild.textContent=m<1?'just now':m<60?m+' min ago':m<1440?Math.floor(m/60)+' h '+(m%60)+' min ago':Math.floor(m/1440)+' d ago';e.classList.toggle('stale',m>=60)}
f();setInterval(f,30000)})()
// round 64: residents by hour (app/design/hours.js) loads only on a page that mounts <div data-hours-chart="...json">
;(function(){if(!document.querySelector('[data-hours-chart]'))return;var c=document.querySelector('script[src*="app/design/frame.js"]');if(!c)return
var s=document.createElement('script');s.src=c.src.replace('frame.js','hours.js');document.head.appendChild(s)})()
// round 66: the flights map (app/design/flightmap/flightmap.js) loads only on a page that mounts <div data-flightmap="...index.json">
;(function(){if(!document.querySelector('[data-flightmap]'))return;var c=document.querySelector('script[src*="app/design/frame.js"]');if(!c)return
var s=document.createElement('script');s.src=c.src.replace('frame.js','flightmap/flightmap.js');document.head.appendChild(s)})()
