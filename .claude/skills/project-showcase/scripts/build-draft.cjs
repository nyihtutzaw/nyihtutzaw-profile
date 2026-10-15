// Usage: node build-draft.cjs <dir>   (dir contains project.json and the screenshots)
// Writes <dir>/index.html: a vertical-scroll walkthrough draft. No live URL or credentials are included.
const fs = require('fs');
const path = require('path');
const dir = process.argv[2];
const p = JSON.parse(fs.readFileSync(path.join(dir, 'project.json'), 'utf8'));
const esc = (s = '') => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const frame = (img, alt) => `<div class="frame"><div class="dots"><i></i><i></i><i></i></div><img src="${esc(img)}" alt="${esc(alt)}"></div>`;

const first = p.steps[0];
const intro = `<section class="slide"><div><div class="step">Project</div><h1>${esc(p.title)}</h1><p class="lead">${esc(p.summary)}</p>
<div class="tags">${(p.tags || []).map((t) => `<span>${esc(t)}</span>`).join('')}</div>
${p.thumbnail ? `<div class="thumbbox">Card thumbnail (16:10)<img src="${esc(p.thumbnail)}" alt=""></div>` : ''}</div>${frame(first.image, p.title)}</section>`;
const steps = p.steps.map((s, i) => `<section class="slide"><div><div class="step">Step ${i + 1} of ${p.steps.length}</div><h2>${esc(s.title)}</h2>
<p class="lead">${esc(s.description)}</p>${s.bullets ? `<ul>${s.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>` : ''}</div>${frame(s.image, s.title)}</section>`).join('\n');

const css = `:root{--bg:#fafaf9;--fg:#1c1917;--muted:#78716c;--card:#fff;--line:#e7e5e4;--accent:#14532d;--gold:#b8893c}
@media(prefers-color-scheme:dark){:root{--bg:#0c0a09;--fg:#f5f5f4;--muted:#a8a29e;--card:#1c1917;--line:#292524;--accent:#4ade80}}
*{box-sizing:border-box}html{scroll-snap-type:y proximity;scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.6 -apple-system,BlinkMacSystemFont,"Inter",sans-serif}
.bar{position:fixed;top:0;left:0;height:3px;background:var(--accent);transition:width .3s;z-index:5}
.top{position:fixed;top:0;left:0;right:0;display:flex;justify-content:space-between;padding:14px 28px;font-size:13px;color:var(--muted);z-index:4}
.draft{color:var(--gold);font-weight:600;letter-spacing:.08em;text-transform:uppercase}
.slide{min-height:100vh;scroll-snap-align:start;display:grid;grid-template-columns:minmax(280px,5fr) 7fr;gap:48px;align-items:center;padding:72px 6vw;border-bottom:1px solid var(--line)}
.slide>*{opacity:0;transform:translateY(32px);transition:opacity .6s,transform .6s}.slide.on>*{opacity:1;transform:none}.slide.on>*:nth-child(2){transition-delay:.12s}
.step{font-size:13px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--accent)}
h1,h2{line-height:1.15;margin:.4rem 0 .8rem;letter-spacing:-.01em}h1{font-size:clamp(2.4rem,5vw,3.6rem)}h2{font-size:clamp(1.7rem,3vw,2.3rem)}
.lead{font-size:1.15rem;color:var(--muted);margin:0 0 18px}ul{padding:0;margin:0;list-style:none}li{padding-left:26px;position:relative;margin:10px 0}
li::before{content:"";position:absolute;left:0;top:.55em;width:10px;height:10px;border-radius:50%;background:var(--accent)}
.tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:20px}.tags span{border:1px solid var(--line);background:var(--card);border-radius:999px;padding:2px 12px;font-size:13px}
.frame{border:1px solid var(--line);border-radius:14px;overflow:hidden;background:var(--card);box-shadow:0 20px 50px -20px rgba(0,0,0,.35)}
.frame .dots{height:26px;display:flex;align-items:center;gap:6px;padding:0 12px;border-bottom:1px solid var(--line)}.frame .dots i{width:9px;height:9px;border-radius:50%;background:var(--line)}
.frame img{display:block;width:100%;max-height:calc(100vh - 160px);object-fit:cover;object-position:top left}
.thumbbox{margin-top:24px;font-size:13px;color:var(--muted)}.thumbbox img{display:block;width:240px;aspect-ratio:16/10;object-fit:cover;object-position:top;border-radius:10px;border:1px solid var(--line);margin-top:6px}
@media(max-width:860px){.slide{grid-template-columns:1fr;gap:20px;min-height:auto;padding:64px 20px 40px}.frame img{max-height:none}html{scroll-snap-type:none}}`;
const js = `const s=[...document.querySelectorAll('.slide')],bar=document.getElementById('bar'),c=document.getElementById('count');
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');c.textContent=(s.indexOf(e.target)+1)+' / '+s.length}}),{threshold:.35});s.forEach(x=>io.observe(x));
addEventListener('scroll',()=>{const m=document.documentElement.scrollHeight-innerHeight;bar.style.width=(m>0?scrollY/m*100:0)+'%'},{passive:true});`;

fs.writeFileSync(path.join(dir, 'index.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(p.title)} draft</title><style>${css}</style></head><body>
<div class="bar" id="bar"></div><div class="top"><span class="draft">Draft · not yet on website</span><span id="count"></span></div>
${intro}\n${steps}\n<script>${js}</script></body></html>`);
console.log('wrote', path.join(dir, 'index.html'));
