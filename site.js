// ---------- Language (EN default, ES) ----------
// Pages with a hand-translated Spanish twin live in /es/. Every other page is machine-translated on request.
const TYB_TWINS = ['index.html','about.html','barcelona.html','balearic-islands.html','lanzarote.html','dominican-republic.html','mexico.html'];
const TYB_ES = /\/es(\/|$)/.test(location.pathname);
const TYB_SEG = location.pathname.split('/').pop();
const TYB_FILE = (TYB_SEG || 'index.html').replace(/^([^.]+)$/, '$1.html');
const TYB_HAS_TWIN = TYB_TWINS.includes(TYB_FILE);
function tybUrl(u){ // resolve a root-relative page link from inside /es/
  if(!TYB_ES) return u;
  return TYB_TWINS.includes(u.split('#')[0]) ? u : '../' + u;
}
const ES_NAMES = {'Amsterdam':'Ámsterdam','Athens':'Atenas','Balearic Islands':'Islas Baleares','Beijing':'Pekín','Cairo':'El Cairo','Cappadocia':'Capadocia','Dominican Republic':'República Dominicana','Florence':'Florencia','Israel & Palestine':'Israel y Palestina','Istanbul':'Estambul','Japan':'Japón','Lake Como':'Lago de Como','London':'Londres','Mauritius':'Mauricio','Mexico':'México','Morocco':'Marruecos','Positano & Capri':'Positano y Capri','Prague':'Praga','Sicily':'Sicilia','Singapore':'Singapur','Strasbourg & Alsace':'Estrasburgo y Alsacia','Thailand':'Tailandia','Tunis':'Túnez','Venice':'Venecia'};
function tybName(n){ return TYB_ES ? (ES_NAMES[n] || n) : n; }
const ES_SUBS = {"Netherlands": "Países Bajos", "Greece": "Grecia", "Ibiza, Menorca & Mallorca · Spain": "Ibiza, Menorca y Mallorca · España", "Spain": "España", "Egypt": "Egipto", "Turkey": "Turquía", "Punta Cana, Samaná & more": "Punta Cana, Samaná y más", "Croatia": "Croacia", "Bologna, Pisa & Italy": "Bolonia, Pisa e Italia", "Jerusalem, Bethlehem & Tel Aviv": "Jerusalén, Belén y Tel Aviv", "Osaka, Kyoto & Tokyo": "Osaka, Kioto y Tokio", "Italy": "Italia", "Canary Islands · Spain": "Islas Canarias · España", "England": "Inglaterra", "Morondava & the Avenue of the Baobabs": "Morondava y la Avenida de los Baobabs", "Le Morne, Chamarel & Île aux Cerfs": "Le Morne, Chamarel e Île aux Cerfs", "Czech Republic: Old Town, Charles Bridge & the castle": "República Checa: Ciudad Vieja, Puente de Carlos y el castillo", "Cozumel & Costa Maya": "Cozumel y Costa Maya", "Miami & Fort Lauderdale · Florida": "Miami y Fort Lauderdale · Florida", "Quebec, Canada": "Quebec, Canadá", "Marrakesh, Sahara & more": "Marrakech, el Sáhara y más", "Amalfi Coast · Italy": "Costa Amalfitana · Italia", "Mahé, Praslin & La Digue": "Mahé, Praslin y La Digue", "Palermo & Mondello · Italy": "Palermo y Mondello · Italia", "Singapore": "Singapur", "France": "Francia", "Bangkok & Phuket": "Bangkok y Phuket", "Tunisia": "Túnez", "Burano, Murano & Italy": "Burano, Murano e Italia", "Hanoi & Ninh Binh": "Hanói y Ninh Binh"};
function tybSub(t){ return TYB_ES ? (ES_SUBS[t] || t) : t; }

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
  {n:'Falmouth',s:'Jamaica',u:'falmouth.html'},
  {n:'Florence',s:'Bologna, Pisa & Italy',u:'florence.html'},
  {n:'Hong Kong',s:'China',u:'hong-kong.html'},
  {n:'Israel & Palestine',s:'Jerusalem, Bethlehem & Tel Aviv',u:'israel-palestine.html'},
  {n:'Istanbul',s:'Turkey',u:'istanbul.html'},
  {n:'Japan',s:'Osaka, Kyoto & Tokyo',u:'japan.html'},
  {n:'Lake Como',s:'Italy',u:'como.html'},
  {n:'Lanzarote',s:'Canary Islands · Spain',u:'lanzarote.html'},
  {n:'London',s:'England',u:'london.html'},
  {n:'Madagascar',s:'Morondava & the Avenue of the Baobabs',u:'madagascar.html'},
  {n:'Mauritius',s:'Le Morne, Chamarel & Île aux Cerfs',u:'mauritius.html'},
  {n:'Prague',s:'Czech Republic: Old Town, Charles Bridge & the castle',u:'prague.html'},
  {n:'Mexico',s:'Cozumel & Costa Maya',u:'mexico.html'},
  {n:'Miami',s:'Miami & Fort Lauderdale · Florida',u:'miami.html'},
  {n:'Montreal',s:'Quebec, Canada',u:'montreal.html'},
  {n:'Morocco',s:'Marrakesh, Sahara & more',u:'morocco.html'},
  {n:'Nassau',s:'Bahamas',u:'nassau.html'},
  {n:'Positano & Capri',s:'Amalfi Coast · Italy',u:'positano.html'},
  {n:'Seychelles',s:'Mahé, Praslin & La Digue',u:'seychelles.html'},
  {n:'Sicily',s:'Palermo & Mondello · Italy',u:'sicily.html'},
  {n:'Singapore',s:'Singapore',u:'singapore.html'},
  {n:'Strasbourg & Alsace',s:'France',u:'strasbourg.html'},
  {n:'Thailand',s:'Bangkok & Phuket',u:'thailand.html'},
  {n:'Tunis',s:'Tunisia',u:'tunis.html'},
  {n:'Venice',s:'Burano, Murano & Italy',u:'venice.html'},
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
    const m = DESTS.filter(d => (d.n+' '+(ES_NAMES[d.n]||'')+' '+d.s+' '+(ES_SUBS[d.s]||'')).toLowerCase().includes(q)).slice(0,8);
    if(!m.length){ list.innerHTML = '<li class="dessearch-none">'+(TYB_ES?'No se encontró ningún destino':'No destination found')+'</li>'; list.classList.add('open'); return; }
    m.forEach(d => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = tybUrl(d.u); a.innerHTML = '<b>'+tybName(d.n)+'</b><span>'+tybSub(d.s)+'</span>';
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
  const AR=()=>{ const r=map.getBoundingClientRect(); return (r.width&&r.height)? r.width/r.height : 2; };
  const maxW=()=>Math.min(MAPW, MAPH*AR());          // widest view that still fills the box (no empty bands)
  const xs=pins.map(p=>+p.dataset.x), ys=pins.map(p=>+p.dataset.y);
  const midX=(Math.min(...xs)+Math.max(...xs))/2, midY=(Math.min(...ys)+Math.max(...ys))/2;
  function home(){ const w=maxW(); vb={x:midX-w/2, y:midY-(w/AR())/2, w, h:w/AR()}; } // whole world, or centred on our pins on tall/narrow screens

  function clamp(){
    const ar=AR();
    vb.w=Math.min(maxW(),Math.max(MINW,vb.w)); vb.h=vb.w/ar;
    vb.x=Math.min(MAPW-vb.w,Math.max(0,vb.x));
    vb.y=Math.min(MAPH-vb.h,Math.max(0,vb.y));
  }
  function fit(){ // screen scale of the current view (view and box share the same shape, so no offsets)
    const rect=map.getBoundingClientRect();
    return {rect, k:rect.width/vb.w, ox:0, oy:0};
  }
  function apply(){
    clamp();
    svg.setAttribute('viewBox',`${vb.x} ${vb.y} ${vb.w} ${vb.h}`);
    svg.setAttribute('preserveAspectRatio','none');
    const {rect,k}=fit();
    pins.forEach(p=>{
      const px=parseFloat(p.dataset.x), py=parseFloat(p.dataset.y);
      const sx=(px-vb.x)*k, sy=(py-vb.y)*k;
      const on = sx>=-20 && sx<=rect.width+20 && sy>=-20 && sy<=rect.height+20;
      p.style.display = on ? '' : 'none';
      p.style.left=sx+'px'; p.style.top=sy+'px';
    });
  }
  function zoomAt(factor, cx, cy){
    const {rect,k}=fit();
    const wx=vb.x+(cx-rect.left)/k, wy=vb.y+(cy-rect.top)/k;     // map point under the finger/cursor
    vb.w=Math.min(maxW(),Math.max(MINW,vb.w*factor)); vb.h=vb.w/AR();
    const k2=rect.width/vb.w;
    vb.x=wx-(cx-rect.left)/k2; vb.y=wy-(cy-rect.top)/k2;
    apply();
  }
  // buttons
  // zoom buttons: from full view, focus the destinations cluster; once zoomed, focus current centre
  const cxAll = pins.reduce((s,p)=>s+parseFloat(p.dataset.x),0)/pins.length;
  const cyAll = pins.reduce((s,p)=>s+parseFloat(p.dataset.y),0)/pins.length;
  function zoomBtn(factor){
    const rect=map.getBoundingClientRect();
    let fx=rect.left+rect.width/2, fy=rect.top+rect.height/2;
    if(vb.w>=maxW()*0.98){ const f=fit(); fx=rect.left+(cxAll-vb.x)*f.k; fy=rect.top+(cyAll-vb.y)*f.k; }
    zoomAt(factor,fx,fy);
  }
  document.getElementById('tybmapIn').addEventListener('click',()=>zoomBtn(0.6));
  document.getElementById('tybmapOut').addEventListener('click',()=>zoomBtn(1/0.6));
  document.getElementById('tybmapReset').addEventListener('click',()=>{home();apply();});
  // wheel zoom
  map.addEventListener('wheel',e=>{e.preventDefault();zoomAt(e.deltaY>0?1.15:0.87, e.clientX, e.clientY);},{passive:false});
  // drag to pan with the mouse
  let drag=null;
  function down(x,y){drag={x,y,vx:vb.x,vy:vb.y};map.classList.add('grabbing');}
  function move(x,y){
    if(!drag) return;
    const {k}=fit();
    vb.x=drag.vx-(x-drag.x)/k;
    vb.y=drag.vy-(y-drag.y)/k;
    apply();
  }
  function up(){drag=null;map.classList.remove('grabbing');}
  map.addEventListener('mousedown',e=>{down(e.clientX,e.clientY);});
  window.addEventListener('mousemove',e=>move(e.clientX,e.clientY));
  window.addEventListener('mouseup',up);
  // touch: ONE finger scrolls the page as normal (the map stays still);
  // TWO fingers move and pinch-zoom the map
  let pinch=null;
  const mid=t=>({x:(t[0].clientX+t[1].clientX)/2, y:(t[0].clientY+t[1].clientY)/2});
  const dist=t=>Math.hypot(t[0].clientX-t[1].clientX, t[0].clientY-t[1].clientY);
  map.addEventListener('touchstart',e=>{
    if(e.touches.length===2){ const m=mid(e.touches); pinch={x:m.x,y:m.y,d:dist(e.touches)}; map.classList.add('grabbing'); }
  },{passive:true});
  map.addEventListener('touchmove',e=>{
    if(!pinch||e.touches.length!==2) return;
    e.preventDefault();
    const m=mid(e.touches), d=dist(e.touches), {k}=fit();
    vb.x-= (m.x-pinch.x)/k; vb.y-= (m.y-pinch.y)/k;               // pan with the two-finger midpoint
    if(pinch.d>0 && d>0) zoomAt(pinch.d/d, m.x, m.y); else apply(); // pinch to zoom
    pinch={x:m.x,y:m.y,d};
  },{passive:false});
  map.addEventListener('touchend',e=>{ if(e.touches.length<2){ pinch=null; map.classList.remove('grabbing'); } });
  // touch screens get instructions that match
  if(window.matchMedia && matchMedia('(pointer: coarse)').matches){
    const sub=document.querySelector('.tybmap-sub');
    if(sub) sub.textContent = (typeof TYB_ES!=='undefined' && TYB_ES)
      ? 'Toca un pin para abrir esa guía. Usa + / − o dos dedos para hacer zoom y moverte por el mapa.'
      : 'Tap a pin to open that guide. Use + / − or two fingers to zoom and move around the map.';
  }
  // prevent a drag from triggering pin navigation
  pins.forEach(p=>{
    let sx,sy;
    p.addEventListener('mousedown',e=>{sx=e.clientX;sy=e.clientY;});
    p.addEventListener('click',e=>{ if(sx!=null && (Math.abs(e.clientX-sx)>6||Math.abs(e.clientY-sy)>6)) e.preventDefault(); });
  });
  let lastW=map.getBoundingClientRect().width;
  window.addEventListener('resize',()=>{ const w=map.getBoundingClientRect().width; if(Math.abs(w-lastW)>1){ lastW=w; home(); apply(); } });
  home(); apply();
})();

/* ---- Inline AJAX submit for FormSubmit forms (no redirect to FormSubmit page) ---- */
(function () {
  function attachAjax(form, successHTML, busyLabel) {
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var honey = form.querySelector('input[name="_honey"]');
      if (honey && honey.value) return;                       // bot trap
      if (!form.checkValidity()) { form.reportValidity && form.reportValidity(); return; }
      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.dataset.orig = btn.innerHTML; btn.textContent = busyLabel || 'Sending…'; }
      var payload = {};
      new FormData(form).forEach(function (v, k) { if (k !== '_honey') payload[k] = v; });
      var endpoint = (form.getAttribute('action') || '').replace('formsubmit.co/', 'formsubmit.co/ajax/');
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data && (data.success === 'true' || data.success === true)) { showSuccess(form, successHTML); }
        else { throw new Error('formsubmit'); }
      })
      .catch(function () {
        if (btn) { btn.disabled = false; if (btn.dataset.orig) btn.innerHTML = btn.dataset.orig; }
        form.submit();                                          // graceful fallback to normal submit
      });
    });
  }

  function showSuccess(form, html) {
    var wide = form.id === 'contactForm';
    var msg = document.createElement('div');
    msg.className = 'signup-success' + (wide ? ' signup-success--wide' : '');
    msg.setAttribute('role', 'status');
    msg.innerHTML = html;
    form.parentNode.replaceChild(msg, form);
    msg.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }

  document.querySelectorAll('form.foot-signup, form.signup-form').forEach(function (f) {
    attachAjax(f, "<strong>You're in! 🎉</strong> Thanks for joining the journey — see you in your inbox.", 'Joining…');
  });
  attachAjax(document.getElementById('contactForm'),
    "<strong>Message sent! ✅</strong> Thanks for reaching out — we'll get back to you as soon as we can.", 'Sending…');
})();

// Destinations dropdown: filter links as you type (desktop)
document.querySelectorAll('.dropdown').forEach(dd => {
  const input = dd.querySelector('.dd-search input');
  if(!input) return;
  const links = [...dd.querySelectorAll(':scope > a')];
  const none = document.createElement('div'); none.className = 'dd-none'; none.textContent = TYB_ES ? 'No se encontró ningún destino' : 'No destination found'; none.hidden = true; dd.appendChild(none);
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase(); let shown = 0;
    links.forEach(a => { const ok = !q || a.textContent.toLowerCase().includes(q); a.style.display = ok ? '' : 'none'; if(ok) shown++; });
    none.hidden = shown > 0;
  });
  input.addEventListener('keydown', e => {
    if(e.key === 'Enter'){ const a = links.find(l => l.style.display !== 'none'); if(a){ e.preventDefault(); window.location.href = a.getAttribute('href'); } }
    else if(e.key === 'Escape'){ input.value = ''; input.dispatchEvent(new Event('input')); input.blur(); }
  });
});


// ---------- Language toggle ----------
(function(){
  const KEY = 'tyb-lang';
  const get = () => { try { return localStorage.getItem(KEY); } catch(e){ return null; } };
  const set = v => { try { localStorage.setItem(KEY, v); } catch(e){} };
  if (TYB_ES) set('es');
  const pref = TYB_ES ? 'es' : (get() || 'en');
  const host = location.hostname;
  function setGoogTrans(val){
    const exp = val ? '' : ';expires=Thu, 01 Jan 1970 00:00:00 GMT';
    const v = val || '';
    document.cookie = 'googtrans=' + v + ';path=/' + exp;
    if (host && host.indexOf('.') > -1) {
      document.cookie = 'googtrans=' + v + ';path=/;domain=' + host + exp;
      document.cookie = 'googtrans=' + v + ';path=/;domain=.' + host.replace(/^www\./,'') + exp;
    }
  }
  function autoTranslate(){
    if (window.__tybTranslating) return; window.__tybTranslating = true;
    setGoogTrans('/en/es');
    document.documentElement.classList.add('tyb-mt');
    const holder = document.createElement('div'); holder.id = 'google_translate_element'; holder.style.display = 'none';
    document.body.appendChild(holder);
    window.googleTranslateElementInit = function(){
      new google.translate.TranslateElement({pageLanguage:'en', includedLanguages:'es', autoDisplay:false}, 'google_translate_element');
    };
    const sc = document.createElement('script');
    sc.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    sc.async = true; document.head.appendChild(sc);
  }
  function mark(lang){
    document.querySelectorAll('.langtoggle button').forEach(b => {
      const on = b.dataset.lang === lang;
      b.classList.toggle('on', on); b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }
  mark(pref);
  if (TYB_ES) {
    setGoogTrans(null); // hand-translated page: never machine-translate it
  } else if (pref === 'es' && !TYB_HAS_TWIN) {
    autoTranslate();
  } else if (pref === 'en') {
    setGoogTrans(null);
  }
  document.querySelectorAll('.langtoggle button').forEach(b => b.addEventListener('click', () => {
    const lang = b.dataset.lang;
    set(lang); mark(lang);
    if (lang === 'es') {
      if (TYB_ES) return;                                                     // already the Spanish page
      if (TYB_HAS_TWIN) { location.href = 'es/' + TYB_SEG + location.hash; return; } // hand-translated twin
      autoTranslate();                                                        // machine-translate this page
    } else {
      setGoogTrans(null);
      if (TYB_ES) { location.href = '../' + TYB_SEG + location.hash; return; } // back to the English twin
      if (window.__tybTranslating) location.reload();                         // undo machine translation
    }
  }));
})();


// ---------- Motion & interaction layer ----------
(function(){
  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const navEl = document.querySelector('.nav');
  const root = document.documentElement;
  const setNavH = () => { if(navEl) root.style.setProperty('--navh', navEl.offsetHeight + 'px'); };
  setNavH(); window.addEventListener('resize', setNavH);

  // reading progress bar on guide pages
  const cover = document.querySelector('.cover');
  let bar = null;
  if (cover) { bar = document.createElement('div'); bar.className = 'tyb-progress'; bar.setAttribute('aria-hidden','true'); document.body.appendChild(bar); }

  // back to top
  const top = document.createElement('button');
  top.type = 'button'; top.className = 'tyb-top';
  top.setAttribute('aria-label', (typeof TYB_ES!=='undefined' && TYB_ES) ? 'Volver arriba' : 'Back to top');
  top.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));
  document.body.appendChild(top);

  // sticky jump-to bar + active section
  const cnav = document.querySelector('.citynav');
  const coverImg = cover ? cover.querySelector('img') : null;
  let ticking = false;
  function onScroll(){
    const y = window.scrollY, vh = window.innerHeight;
    if (navEl) navEl.classList.toggle('is-scrolled', y > 8);
    top.classList.toggle('show', y > vh * 1.2);
    if (bar) { const max = document.documentElement.scrollHeight - vh; bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, y / max) : 0) + ')'; }
    if (cnav) { const r = cnav.getBoundingClientRect(); cnav.classList.toggle('is-stuck', r.top <= (navEl ? navEl.offsetHeight : 0) + 1 && y > 50); }
    if (coverImg && !reduce && window.innerWidth > 820) { coverImg.style.setProperty('--py', Math.min(40, y * 0.12) + 'px'); }
    ticking = false;
  }
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  if (cnav && 'IntersectionObserver' in window) {
    const links = [...cnav.querySelectorAll('a[href^="#"]')];
    const targets = links.map(a => document.getElementById(a.getAttribute('href').slice(1))).filter(Boolean);
    const setActive = id => {
      links.forEach(a => {
        const on = a.getAttribute('href') === '#' + id;
        a.classList.toggle('is-active', on);
        if (on && cnav.scrollWidth > cnav.clientWidth) cnav.scrollTo({ left: a.offsetLeft - 24, behavior: reduce ? 'auto' : 'smooth' });
      });
    };
    const seen = new Map();
    const spy = new IntersectionObserver(es => {
      es.forEach(e => seen.set(e.target.id, e.isIntersecting ? e.boundingClientRect.top : null));
      // active = the last section whose heading has passed the top third of the screen
      let best = null;
      targets.forEach(t => { if (t.getBoundingClientRect().top < window.innerHeight * 0.35) best = t.id; });
      links.forEach(a => a.classList.remove('is-active'));
      if (best) setActive(best);
    }, { rootMargin: '0px 0px -60% 0px', threshold: [0, 1] });
    targets.forEach(t => spy.observe(t));
    window.addEventListener('scroll', () => {
      let best = null;
      targets.forEach(t => { if (t.getBoundingClientRect().top < window.innerHeight * 0.35) best = t.id; });
      if (best) setActive(best); else links.forEach(a => a.classList.remove('is-active'));
    }, { passive: true });
  }

  if (reduce) return;

  // cascading grids
  const groups = document.querySelectorAll('.res-grid, .pr-grid, .res-guest');
  if ('IntersectionObserver' in window && groups.length) {
    const gio = new IntersectionObserver(es => es.forEach(e => {
        if (!e.isIntersecting) return;
        const g = e.target; g.classList.add('in'); gio.unobserve(g);
        setTimeout(() => { [...g.children].forEach(c => c.style.setProperty('--sd','0s')); g.classList.add('tyb-done'); }, 1400); // hover effects respond instantly afterwards
      }),
      { threshold: 0.05, rootMargin: '0px 0px -6% 0px' });
    groups.forEach(g => {
      g.classList.remove('reveal');
      [...g.children].forEach((c, i) => { c.classList.remove('reveal'); c.style.setProperty('--sd', Math.min(i % 10, 9) * 0.06 + 's'); });
      g.classList.add('tyb-stagger');
      gio.observe(g);
    });
  }

  // map pins: staggered pulse
  document.querySelectorAll('.tybpin-dot').forEach((d, i) => d.style.setProperty('--pd', ((i * 0.37) % 2.8).toFixed(2) + 's'));

})();

// ---------- Tile click: plane take-off + orange light burst, then open the guide ----------
(function(){
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const PLANE = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>';
  let leaving = false;
  document.addEventListener('click', e => {
    const t = e.target.closest('.citytiles .citytile, .related-tiles .citytile');
    if (!t || leaving || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || t.target === '_blank') return;
    e.preventDefault();
    leaving = true;
    const r = t.getBoundingClientRect();
    const x = e.clientX || (r.left + r.width / 2), y = e.clientY || (r.top + r.height / 2);
    const fx = document.createElement('div');
    fx.className = 'tyb-takeoff'; fx.style.left = x + 'px'; fx.style.top = y + 'px';
    let rays = '';
    for (let i = 0; i < 10; i++) rays += '<span class="tko-ray" style="--a:' + (i * 36) + 'deg"></span>';
    fx.innerHTML = '<span class="tko-burst"></span><span class="tko-ring"></span>' + rays + '<span class="tko-trail"></span><span class="tko-plane">' + PLANE + '</span>';
    document.body.appendChild(fx);
    t.classList.add('tko-press');
    const go = t.href;
    setTimeout(() => { window.location.href = go; }, 650);
  });
  // coming back with the browser's Back button: clear any leftover effect
  window.addEventListener('pageshow', () => {
    leaving = false;
    document.querySelectorAll('.tyb-takeoff').forEach(n => n.remove());
    document.querySelectorAll('.tko-press').forEach(n => n.classList.remove('tko-press'));
  });
})();
