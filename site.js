// Mark that JS is active. The hidden/animated state of .reveal is scoped to html.js,
// so if this script is ever blocked, all content simply renders fully visible.
document.documentElement.classList.add('js');

// mobile nav
const nav = document.querySelector('.nav');
const burger = document.querySelector('.burger');
if (burger) burger.addEventListener('click', () => nav.classList.toggle('open'));

// scroll reveal
const els = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && els.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  els.forEach(el => io.observe(el));
} else {
  els.forEach(el => el.classList.add('in'));
}

// ---------- destination search (constrained to real pages) ----------
const DESTS = [
  {n:'Amsterdam',s:'Netherlands',u:'amsterdam.html'},
  {n:'Athens',s:'Greece',u:'athens.html'},
  {n:'Bali',s:'Indonesia',u:'bali.html'},
  {n:'Balearic Islands',s:'Ibiza, Menorca & Mallorca · Spain',u:'balearic-islands.html'},
  {n:'Barcelona',s:'Spain',u:'barcelona.html'},
  {n:'Beijing',s:'China',u:'beijing.html'},
  {n:'Cairo',s:'Egypt',u:'cairo.html'},
  {n:'Cappadocia',s:'Turkey',u:'cappadocia.html'},
  {n:'Dominican Republic',s:'Punta Cana, Samaná & more',u:'dominican-republic.html'},
  {n:'Dubrovnik',s:'Croatia',u:'dubrovnik.html'},
  {n:'Florence',s:'Bologna, Pisa & Italy',u:'florence.html'},
  {n:'Israel & Palestine',s:'Jerusalem, Bethlehem & Tel Aviv',u:'israel-palestine.html'},
  {n:'Istanbul',s:'Turkey',u:'istanbul.html'},
  {n:'Japan',s:'Osaka, Kyoto & Tokyo',u:'japan.html'},
  {n:'Lake Como',s:'Italy',u:'como.html'},
  {n:'Lanzarote',s:'Canary Islands · Spain',u:'lanzarote.html'},
  {n:'London',s:'England',u:'london.html'},
  {n:'Morocco',s:'Marrakesh, Sahara & more',u:'morocco.html'},
  {n:'Nassau',s:'Bahamas',u:'nassau.html'},
  {n:'Positano & Capri',s:'Amalfi Coast · Italy',u:'positano.html'},
  {n:'Singapore',s:'Singapore',u:'singapore.html'},
  {n:'Strasbourg & Alsace',s:'France',u:'strasbourg.html'},
  {n:'Thailand',s:'Bangkok & Phuket',u:'thailand.html'},
  {n:'Tunis',s:'Tunisia',u:'tunis.html'},
  {n:'Vietnam',s:'Hanoi & Ninh Binh',u:'vietnam.html'}
];
function initDesSearch(root){
  const input = root.querySelector('input');
  const list = root.querySelector('.dessearch-results');
  if(!input || !list) return;
  function render(){
    const q = input.value.trim().toLowerCase();
    list.innerHTML = '';
    if(!q){ list.classList.remove('open'); return; }
    const m = DESTS.filter(d => (d.n+' '+d.s).toLowerCase().includes(q)).slice(0,8);
    if(!m.length){ list.innerHTML = '<li class="dessearch-none">No destination found</li>'; list.classList.add('open'); return; }
    m.forEach(d => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = d.u; a.innerHTML = '<b>'+d.n+'</b><span>'+d.s+'</span>';
      li.appendChild(a); list.appendChild(li);
    });
    list.classList.add('open');
  }
  input.addEventListener('input', render);
  input.addEventListener('keydown', e => {
    if(e.key === 'Enter'){ const a = list.querySelector('a'); if(a){ e.preventDefault(); window.location.href = a.getAttribute('href'); } }
    else if(e.key === 'Escape'){ list.classList.remove('open'); input.blur(); }
  });
  document.addEventListener('click', e => { if(!root.contains(e.target)) list.classList.remove('open'); });
}
document.querySelectorAll('.dessearch').forEach(initDesSearch);

// header search: magnifier expands the box
document.querySelectorAll('.nav-search-toggle').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const ns = btn.closest('.nav-search');
    ns.classList.toggle('open');
    if(ns.classList.contains('open')){ const i = ns.querySelector('input'); if(i) setTimeout(() => i.focus(), 50); }
  });
});
document.addEventListener('click', e => {
  document.querySelectorAll('.nav-search.open').forEach(ns => { if(!ns.contains(e.target)) ns.classList.remove('open'); });
});

// ---------- homepage: filter destination tiles by country ----------
(function(){
  const wrap = document.querySelector('.destfilter-pills');
  const grid = document.querySelector('.citytiles');
  if(!wrap || !grid) return;
  const tiles = Array.from(grid.querySelectorAll('.citytile'));
  const showAll = wrap.querySelector('.destpill-showall');
  const pills = Array.from(wrap.querySelectorAll('.destpill[data-country]'));
  function reset(){
    pills.forEach(p => p.classList.remove('active'));
    tiles.forEach(t => { t.style.display=''; });
    if(showAll){ showAll.hidden = true; wrap.appendChild(showAll); }
  }
  pills.forEach(p => {
    p.addEventListener('click', () => {
      const wasActive = p.classList.contains('active');
      reset();
      if(wasActive) return;                 // clicking the active country again clears it
      p.classList.add('active');
      const c = p.dataset.country;
      tiles.forEach(t => { t.style.display = (t.dataset.country === c) ? '' : 'none'; });
      if(showAll){ p.after(showAll); showAll.hidden = false; showAll.scrollIntoView({block:'nearest',inline:'nearest'}); }
    });
  });
  if(showAll) showAll.addEventListener('click', reset);
})();

// ---------- homepage world map: pan / zoom + pin positioning ----------
(function(){
  const map = document.getElementById('tybmap');
  const svg = document.getElementById('tybmapSvg');
  const pinsWrap = document.getElementById('tybmapPins');
  if(!map || !svg || !pinsWrap) return;
  const MAPW=1000, MAPH=500, MINW=90;                 // MINW = max zoom (smaller = closer)
  const pins = Array.from(pinsWrap.querySelectorAll('.tybpin'));
  let vb={x:0,y:0,w:MAPW,h:MAPH};

  function clamp(){
    vb.w=Math.min(MAPW,Math.max(MINW,vb.w)); vb.h=vb.w/2;
    vb.x=Math.min(MAPW-vb.w,Math.max(0,vb.x));
    vb.y=Math.min(MAPH-vb.h,Math.max(0,vb.y));
  }
  function apply(){
    clamp();
    svg.setAttribute('viewBox',`${vb.x} ${vb.y} ${vb.w} ${vb.h}`);
    const rect=map.getBoundingClientRect();
    pins.forEach(p=>{
      const px=parseFloat(p.dataset.x), py=parseFloat(p.dataset.y);
      const sx=(px-vb.x)/vb.w*rect.width, sy=(py-vb.y)/vb.h*rect.height;
      const on = sx>=-20 && sx<=rect.width+20 && sy>=-20 && sy<=rect.height+20;
      p.style.display = on ? '' : 'none';
      p.style.left=sx+'px'; p.style.top=sy+'px';
    });
  }
  function zoomAt(factor, cx, cy){
    const rect=map.getBoundingClientRect();
    const relx=(cx-rect.left)/rect.width, rely=(cy-rect.top)/rect.height;
    const wx=vb.x+relx*vb.w, wy=vb.y+rely*vb.h;
    vb.w*=factor; vb.h=vb.w/2;
    vb.x=wx-relx*vb.w; vb.y=wy-rely*vb.h;
    apply();
  }
  // buttons
  // zoom buttons: from full view, focus the destinations cluster; once zoomed, focus current centre
  const cxAll = pins.reduce((s,p)=>s+parseFloat(p.dataset.x),0)/pins.length;
  const cyAll = pins.reduce((s,p)=>s+parseFloat(p.dataset.y),0)/pins.length;
  function zoomBtn(factor){
    const rect=map.getBoundingClientRect();
    let fx=rect.left+rect.width/2, fy=rect.top+rect.height/2;
    if(vb.w>=MAPW*0.98){ fx=rect.left+(cxAll-vb.x)/vb.w*rect.width; fy=rect.top+(cyAll-vb.y)/vb.h*rect.height; }
    zoomAt(factor,fx,fy);
  }
  document.getElementById('tybmapIn').addEventListener('click',()=>zoomBtn(0.6));
  document.getElementById('tybmapOut').addEventListener('click',()=>zoomBtn(1/0.6));
  document.getElementById('tybmapReset').addEventListener('click',()=>{vb={x:0,y:0,w:MAPW,h:MAPH};apply();});
  // wheel zoom
  map.addEventListener('wheel',e=>{e.preventDefault();zoomAt(e.deltaY>0?1.15:0.87, e.clientX, e.clientY);},{passive:false});
  // drag to pan (mouse + touch)
  let drag=null;
  function down(x,y){drag={x,y,vx:vb.x,vy:vb.y};map.classList.add('grabbing');}
  function move(x,y){
    if(!drag) return;
    const rect=map.getBoundingClientRect();
    vb.x=drag.vx-(x-drag.x)/rect.width*vb.w;
    vb.y=drag.vy-(y-drag.y)/rect.height*vb.h;
    apply();
  }
  function up(){drag=null;map.classList.remove('grabbing');}
  map.addEventListener('mousedown',e=>{down(e.clientX,e.clientY);});
  window.addEventListener('mousemove',e=>move(e.clientX,e.clientY));
  window.addEventListener('mouseup',up);
  map.addEventListener('touchstart',e=>{if(e.touches.length===1)down(e.touches[0].clientX,e.touches[0].clientY);},{passive:true});
  map.addEventListener('touchmove',e=>{if(drag&&e.touches.length===1){move(e.touches[0].clientX,e.touches[0].clientY);}},{passive:true});
  map.addEventListener('touchend',up);
  // prevent a drag from triggering pin navigation
  pins.forEach(p=>{
    let sx,sy;
    p.addEventListener('mousedown',e=>{sx=e.clientX;sy=e.clientY;});
    p.addEventListener('click',e=>{ if(sx!=null && (Math.abs(e.clientX-sx)>6||Math.abs(e.clientY-sy)>6)) e.preventDefault(); });
  });
  window.addEventListener('resize',apply);
  apply();
})();
