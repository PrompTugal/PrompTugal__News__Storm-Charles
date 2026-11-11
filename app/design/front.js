// The front page: the now line, before / after now, the tiles' status words, the phases in force (incident.designer@web-summit.dinis, design/round-19.md). Moved out of the page so the site can run under a
// Content-Security-Policy with no inline script. No behaviour changed.
(function(){var s=document.getElementById('wx-strip');if(!s)return;var d0=+s.dataset.d0,D=864e5;s=document;
function dur(ms){var m=Math.round(ms/6e4),h=Math.floor(m/60);return (h?h+' h ':'')+(m%60)+' min'}
function tick(){var now=Date.now(),p=(now-d0)/D*100;
s.querySelectorAll('.wx-now').forEach(function(n){n.remove()});
s.querySelectorAll('.wx-past,.wx-side').forEach(function(n){n.remove()});
if(p>=0&&p<=100)s.querySelectorAll('.wx-strip .wx-track').forEach(function(t){var n=document.createElement('i');n.className='wx-now';n.style.left=p+'%';t.appendChild(n);if(t.parentNode.classList.contains('wx-group')||t.parentNode.classList.contains('obs'))return;var q=document.createElement('i');q.className='wx-past';q.style.width=p+'%';t.appendChild(q);if(t.parentNode.classList.contains('wx-hours')){var a=document.createElement('i');a.className='wx-side l';a.style.right=(100-p)+'%';a.textContent='before now';var c=document.createElement('i');c.className='wx-side r';c.style.left=p+'%';c.textContent='still to come';t.appendChild(a);t.appendChild(c)}});
var gl=document.getElementById('wx-gnow');if(gl){var a=+gl.dataset.x0,b=+gl.dataset.x1,q=(now-a)/(b-a);if(q>=0&&q<=1){var gx=+gl.dataset.l+q*(gl.dataset.r-gl.dataset.l);gl.setAttribute('x1',gx);gl.setAttribute('x2',gx);var sc=gl.closest('.wx-scroll');if(sc&&!sc.dataset.set){sc.dataset.set=1;sc.scrollLeft=q*sc.scrollWidth-sc.clientWidth*.3}}}
var z=new Date(now).toISOString().slice(11,16),x=document.getElementById('wx-nowtxt');if(x)x.textContent=p<0?'Now '+z+' UTC: the day starts in '+dur(d0-now)+'.':p<=100?'Now '+z+' UTC: the line in the strip.':'This day is over.';
document.querySelectorAll('.wx-state').forEach(function(e){var a=+e.dataset.from,b=+e.dataset.to;e.innerHTML=now<a?'<b>Expected</b> starts in '+dur(a-now):now<b?'<b>In force</b> '+dur(b-now)+' left':'<b>Ended</b>';e.className='wx-state '+(now<a?'pre':now<b?'on':'post')});document.querySelectorAll('.wx-phases li').forEach(function(e){e.classList.toggle('now',now>=+e.dataset.from&&now<+e.dataset.to);e.classList.toggle('past',now>=+e.dataset.to)})}
var ch=document.getElementById('wx-changes');if(ch&&innerWidth<=640)ch.open=false;
tick();setInterval(tick,3e4)})();
