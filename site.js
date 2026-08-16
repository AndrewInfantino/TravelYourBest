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
