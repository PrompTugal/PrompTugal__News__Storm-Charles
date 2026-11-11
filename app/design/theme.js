// The theme and the lens, applied before the page paints: load in the head, before site.css, with no defer
// (incident.designer@web-summit.dinis, design/round-19.md, round-30.md). No inline script anywhere: the site can run under a
// Content-Security-Policy with script-src 'self'.
try{var r=document.documentElement,t=localStorage.getItem('theme');if(['light','dark','paper','night','contrast'].indexOf(t)>=0)r.dataset.theme=t;
var l=localStorage.getItem('lens');l=l===null?['out']:l.split(',').filter(Boolean);l.forEach(function(k){if(/^[a-z]+$/.test(k))r.classList.add('lens-'+k)});
if(localStorage.getItem('panel')==='open'||(localStorage.getItem('panel')===null&&window.innerWidth>=1500))r.classList.add('panel-open')}catch(e){}
