// ==================================================================
// Travel Your Best, site behaviour (2026 redesign)
// ==================================================================

// ---------- Language (EN default, ES) ----------
// Pages with a hand-translated Spanish twin live in /es/. Every other page is machine-translated on request.
const TYB_TWINS = ['index.html','about.html','cruises.html','barcelona.html','balearic-islands.html','lanzarote.html','dominican-republic.html','mexico.html'];
const TYB_ES = /\/es(\/|$)/.test(location.pathname);
const TYB_SEG = location.pathname.split('/').pop();
const TYB_FILE = (TYB_SEG || 'index.html').replace(/^([^.]+)$/, '$1.html');
const TYB_HAS_TWIN = TYB_TWINS.includes(TYB_FILE);
const TYB_ROOT = TYB_ES ? '../' : '';
function tybUrl(u){ // resolve a root-relative page link from inside /es/
  if(!TYB_ES) return u;
  return TYB_TWINS.includes(u.split('#')[0]) ? u : '../' + u;
}
const ES_NAMES = {'Lisbon':'Lisboa','Milan':'Milán','Paris':'París','Rome':'Roma','Vienna':'Viena','Amsterdam':'Ámsterdam','Athens':'Atenas','Balearic Islands':'Islas Baleares','Beijing':'Pekín','Cairo':'El Cairo','Cappadocia':'Capadocia','Dominican Republic':'República Dominicana','Florence':'Florencia','Israel & Palestine':'Israel y Palestina','Istanbul':'Estambul','Japan':'Japón','Lake Como':'Lago de Como','London':'Londres','Mauritius':'Mauricio','Mexico':'México','Morocco':'Marruecos','Positano & Capri':'Positano y Capri','Prague':'Praga','Sicily':'Sicilia','Singapore':'Singapur','Strasbourg & Alsace':'Estrasburgo y Alsacia','Thailand':'Tailandia','Tunis':'Túnez','Venice':'Venecia'};
function tybName(n){ return TYB_ES ? (ES_NAMES[n] || n) : n; }
const ES_SUBS = {"Netherlands": "Países Bajos", "Greece": "Grecia", "Ibiza, Menorca & Mallorca · Spain": "Ibiza, Menorca y Mallorca · España", "Spain": "España", "Egypt": "Egipto", "Turkey": "Turquía", "Punta Cana, Samaná & more": "Punta Cana, Samaná y más", "Croatia": "Croacia", "Bologna, Pisa & Italy": "Bolonia, Pisa e Italia", "Jerusalem, Bethlehem & Tel Aviv": "Jerusalén, Belén y Tel Aviv", "Osaka, Kyoto & Tokyo": "Osaka, Kioto y Tokio", "Italy": "Italia", "Canary Islands · Spain": "Islas Canarias · España", "England": "Inglaterra", "Morondava & the Avenue of the Baobabs": "Morondava y la Avenida de los Baobabs", "Le Morne, Chamarel & Île aux Cerfs": "Le Morne, Chamarel e Île aux Cerfs", "Czech Republic: Old Town, Charles Bridge & the castle": "República Checa: Ciudad Vieja, Puente de Carlos y el castillo", "Cozumel & Costa Maya": "Cozumel y Costa Maya", "Miami & Fort Lauderdale · Florida": "Miami y Fort Lauderdale · Florida", "Quebec, Canada": "Quebec, Canadá", "Marrakesh, Sahara & more": "Marrakech, el Sáhara y más", "Amalfi Coast · Italy": "Costa Amalfitana · Italia", "Mahé, Praslin & La Digue": "Mahé, Praslin y La Digue", "Palermo & Mondello · Italy": "Palermo y Mondello · Italia", "Singapore": "Singapur", "France": "Francia", "Bangkok & Phuket": "Bangkok y Phuket", "Tunisia": "Túnez", "Burano, Murano & Italy": "Burano, Murano e Italia", "Hanoi & Ninh Binh": "Hanói y Ninh Binh", "Czech Republic": "República Checa", "Indonesia": "Indonesia", "China": "China", "Bahamas": "Bahamas", "Jamaica": "Jamaica", "Madagascar": "Madagascar", "Mauritius": "Mauricio", "Seychelles": "Seychelles", "Vietnam": "Vietnam", "Japan": "Japón", "Morocco": "Marruecos", "USA": "EE. UU.", "Canada": "Canadá", "Mexico": "México", "Israel & Palestine": "Israel y Palestina", "Dominican Republic": "República Dominicana", "Portugal: Baixa, Alfama, Belém & Sintra": "Portugal: Baixa, Alfama, Belém y Sintra", "Austria": "Austria", "The Colosseum, Trevi & the Pantheon · Italy": "El Coliseo, la Fontana di Trevi y el Panteón · Italia", "The Duomo & the Galleria · Italy": "El Duomo y la Galería · Italia", "France: Eiffel Tower, Louvre & Montmartre": "Francia: torre Eiffel, Louvre y Montmartre"};
function tybSub(t){ return TYB_ES ? (ES_SUBS[t] || t) : t; }
const L = TYB_ES ? {
  where:'¿A dónde vamos?', search:'Busca un destino…', none:'No se encontró ningún destino', close:'Cerrar', home:'Inicio', explore:'Destinos',
  find:'Buscar', story:'Historia', contact:'Contacto', products:'Productos', ourStory:'Nuestra historia', prev:'Anterior', next:'Siguiente',
  top:'Volver arriba', cruises:'Cruceros', stop:'Parar', route:'Ver nuestros viajes'
} : {
  where:'Where to next?', search:'Search a destination…', none:'No destination found', close:'Close', home:'Home', explore:'Explore',
  find:'Search', story:'Our Story', contact:'Contact', products:'Products', ourStory:'Our Story', prev:'Previous', next:'Next',
  top:'Back to top', cruises:'Cruises', stop:'Stop', route:'Trace our journeys'
};

document.documentElement.classList.add('js');
const REDUCE = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
const ICON = {
  search:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20.5 20.5l-4-4"/></svg>',
  close:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"><path d="M4 11l8-6.5 8 6.5V20h-5.5v-5.5h-5V20H4z"/></svg>',
  globe:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.6 2.5 3.8 5.3 3.8 8.5s-1.2 6-3.8 8.5M12 3.5C9.4 6 8.2 8.8 8.2 12s1.2 6 3.8 8.5"/></svg>',
  heart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"><path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z"/></svg>',
  plane:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>',
  left:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
  right:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>'
};

// ---------- destinations (constrained to real pages) ----------
// r = region: it Italy · eu Europe · me Türkiye & the Middle East · af Africa & the Indian Ocean · as Asia · am The Americas & Caribbean
const DESTS = [
  {n:'Amsterdam',s:'Netherlands',u:'amsterdam.html',r:'eu',i:'amsterdam-bridge-couple.webp'},
  {n:'Athens',s:'Greece',u:'athens.html',r:'eu',i:'athens-acropolis-hill.webp'},
  {n:'Bali',s:'Indonesia',u:'bali.html',r:'as',i:'lempuyang-gates-melody.webp'},
  {n:'Balearic Islands',s:'Ibiza, Menorca & Mallorca · Spain',u:'balearic-islands.html',r:'eu',i:'menorca-turquoise-cove-couple.webp'},
  {n:'Barcelona',s:'Spain',u:'barcelona.html',r:'eu',i:'barcelona-park-guell-bench-couple.webp'},
  {n:'Beijing',s:'China',u:'beijing.html',r:'as',i:'greatwall-arms-melody.webp'},
  {n:'Cairo',s:'Egypt',u:'cairo.html',r:'af',i:'giza-jump-melody.webp'},
  {n:'Cappadocia',s:'Turkey',u:'cappadocia.html',r:'me',i:'cappadocia-snow-valley-couple.webp'},
  {n:'Dominican Republic',s:'Punta Cana, Samaná & more',u:'dominican-republic.html',r:'am',i:'samana-playa-rincon-palms-couple.webp'},
  {n:'Dubrovnik',s:'Croatia',u:'dubrovnik.html',r:'eu',i:'dubrovnik-srd-viewpoint-couple.webp'},
  {n:'Falmouth',s:'Jamaica',u:'falmouth.html',r:'am',i:'falmouth-beach-jamaica-flag-couple.webp'},
  {n:'Florence',s:'Bologna, Pisa & Italy',u:'florence.html',r:'it',i:'florence-duomo-facade-couple.webp'},
  {n:'Hong Kong',s:'China',u:'hong-kong.html',r:'as',i:'hk-harbour-sunset-melody.webp'},
  {n:'Israel & Palestine',s:'Jerusalem, Bethlehem & Tel Aviv',u:'israel-palestine.html',r:'me',i:'jerusalem-oldcity-sunrise.webp'},
  {n:'Istanbul',s:'Turkey',u:'istanbul.html',r:'me',i:'istanbul-hagia-sophia-couple.webp'},
  {n:'Japan',s:'Osaka, Kyoto & Tokyo',u:'japan.html',r:'as',i:'fuji-oishi-flowers.webp'},
  {n:'Lake Como',s:'Italy',u:'como.html',r:'it',i:'como-villa-terrace-melody.webp'},
  {n:'Lisbon',s:'Portugal: Baixa, Alfama, Belém & Sintra',u:'lisbon.html',r:'eu',i:'lisbon-praca-do-comercio-couple.webp'},
  {n:'Lanzarote',s:'Canary Islands · Spain',u:'lanzarote.html',r:'eu',i:'lanzarote-mirador-rio-couple.webp'},
  {n:'London',s:'England',u:'london.html',r:'eu',i:'london-telephone-bigben-couple.webp'},
  {n:'Madagascar',s:'Morondava & the Avenue of the Baobabs',u:'madagascar.html',r:'af',i:'madagascar-baobab-avenue-couple-walking.webp'},
  {n:'Mauritius',s:'Le Morne, Chamarel & Île aux Cerfs',u:'mauritius.html',r:'af',i:'mauritius-le-morne-golden-hour-couple.webp'},
  {n:'Mexico',s:'Cozumel & Costa Maya',u:'mexico.html',r:'am',i:'cozumel-beach-couple.webp'},
  {n:'Miami',s:'Miami & Fort Lauderdale · Florida',u:'miami.html',r:'am',i:'miami-downtown-couple.webp'},
  {n:'Milan',s:'The Duomo & the Galleria · Italy',u:'milan.html',r:'it',i:'milan-duomo-golden-hour-couple.webp'},
  {n:'Montreal',s:'Quebec, Canada',u:'montreal.html',r:'am',i:'montreal-saint-joseph-oratory-couple.webp'},
  {n:'Morocco',s:'Marrakesh, Sahara & more',u:'morocco.html',r:'af',i:'morocco-sahara-camel-shadows.webp'},
  {n:'Nassau',s:'Bahamas',u:'nassau.html',r:'am',i:'nassau-pig-couple-feeding.webp'},
  {n:'Paris',s:'France: Eiffel Tower, Louvre & Montmartre',u:'paris.html',r:'eu',i:'paris-eiffel-trocadero-couple.webp'},
  {n:'Positano & Capri',s:'Amalfi Coast · Italy',u:'positano.html',r:'it',i:'positano-panorama.webp'},
  {n:'Prague',s:'Czech Republic: Old Town, Charles Bridge & the castle',u:'prague.html',r:'eu',i:'prague-couple-riverside-charles-bridge.webp'},
  {n:'Rome',s:'The Colosseum, Trevi & the Pantheon · Italy',u:'rome.html',r:'it',i:'rome-colosseum-couple.webp'},
  {n:'Seychelles',s:'Mahé, Praslin & La Digue',u:'seychelles.html',r:'af',i:'seychelles-source-dargent-couple-on-boulder.webp'},
  {n:'Sicily',s:'Palermo & Mondello · Italy',u:'sicily.html',r:'it',i:'sicily-palermo-cathedral-couple-palms.webp'},
  {n:'Singapore',s:'Singapore',u:'singapore.html',r:'as',i:'singapore-mbs-rooftop-couple.webp'},
  {n:'Strasbourg & Alsace',s:'France',u:'strasbourg.html',r:'eu',i:'strasbourg-place-kleber-tree-couple.webp'},
  {n:'Thailand',s:'Bangkok & Phuket',u:'thailand.html',r:'as',i:'phuket-elephant-kiss.webp'},
  {n:'Tunis',s:'Tunisia',u:'tunis.html',r:'af',i:'tunis-marina-sunset-couple.webp'},
  {n:'Venice',s:'Burano, Murano & Italy',u:'venice.html',r:'it',i:'venice-gondola-selfie-rialto.webp'},
  {n:'Vienna',s:'Austria',u:'vienna.html',r:'eu',i:'vienna-stephansdom-couple.webp'},
  {n:'Vietnam',s:'Hanoi & Ninh Binh',u:'vietnam.html',r:'as',i:'ninhbinh-trangan-boat-couple.webp'}
];
const REGIONS = TYB_ES
  ? [['eu','Europa'],['it','Italia'],['me','Turquía y Oriente Medio'],['af','África y el Índico'],['as','Asia'],['am','América y el Caribe']]
  : [['eu','Europe'],['it','Italy'],['me','Türkiye & the Middle East'],['af','Africa & the Indian Ocean'],['as','Asia'],['am','The Americas & Caribbean']];
const thumb = d => TYB_ROOT + 'images/thumbs/' + d.u.replace('.html','') + '.webp';
const big = d => TYB_ROOT + 'images/' + d.i;
const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
const matches = (d, q) => (d.n+' '+(ES_NAMES[d.n]||'')+' '+d.s+' '+(ES_SUBS[d.s]||'')).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'')
  .includes(q.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,''));

function initDesSearch(root){
  const input = root.querySelector('input');
  const list = root.querySelector('.dessearch-results');
  if(!input || !list) return;
  function render(){
    const q = input.value.trim();
    list.innerHTML = '';
    if(!q){ list.classList.remove('open'); return; }
    const m = DESTS.filter(d => matches(d, q)).slice(0,8);
    if(!m.length){ list.innerHTML = '<li class="dessearch-none">'+L.none+'</li>'; list.classList.add('open'); return; }
    m.forEach(d => {
      const li = document.createElement('li');
      li.innerHTML = '<a href="'+tybUrl(d.u)+'"><img src="'+thumb(d)+'" alt="" width="40" height="40"><span><b>'+esc(tybName(d.n))+'</b><span>'+esc(tybSub(d.s))+'</span></span></a>';
      list.appendChild(li);
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

// header search: magnifier expands the box (desktop)
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

// ---------- Explorer: full-screen destinations menu (desktop + mobile) ----------
const Explorer = (function(){
  const nav = document.querySelector('.nav');
  if(!nav) return null;
  const here = TYB_FILE;
  const logo = nav.querySelector('.wordmark');
  const xp = document.createElement('div');
  xp.className = 'xp'; xp.id = 'explorer';
  xp.setAttribute('role','dialog'); xp.setAttribute('aria-modal','true'); xp.setAttribute('aria-label', L.where);
  const link = (u, label) => '<a href="'+tybUrl(u)+'">'+label+'</a>';
  const mainLinks = link('index.html', L.home) + link('products.html', L.products) + link('about.html', L.ourStory) + link('contact.html', L.contact);
  let regions = '';
  const cruiseBlock = '<div class="xp-region xp-cruise" data-r="cruise"><h3>'+L.cruises+'</h3><ul><li><a href="'+tybUrl('cruises.html')+'" data-n="__cruises"'+(here==='cruises.html'?' aria-current="page"':'')+'><img loading="lazy" src="'+TYB_ROOT+'images/thumbs/cruises.webp" alt="" width="38" height="38"><span><b>'+(TYB_ES?'Nuestros cruceros':'Our cruises')+'</b><span>Royal Caribbean, MSC, Norwegian '+(TYB_ES?'y':'&amp;')+' Celebrity</span></span></a></li></ul></div>';
  REGIONS.forEach(([k, label]) => {
    const items = DESTS.filter(d => d.r === k).sort((a,b) => tybName(a.n).localeCompare(tybName(b.n)));
    const h3 = k === 'it' ? '<a class="xp-hub" href="'+tybUrl('italy.html')+'">'+label+' <span aria-hidden="true">→</span></a>' : label;
    regions += '<div class="xp-region" data-r="'+k+'"><h3>'+h3+'</h3><ul>' + items.map(d =>
      '<li><a href="'+tybUrl(d.u)+'" data-n="'+esc(d.n)+'"'+(d.u===here?' aria-current="page"':'')+'><img loading="lazy" src="'+thumb(d)+'" alt="" width="38" height="38"><span><b>'+esc(tybName(d.n))+'</b><span>'+esc(tybSub(d.s))+'</span></span></a></li>'
    ).join('') + '</ul></div>';
  });
  const first = DESTS.find(d => d.u === here) || DESTS.find(d => d.u === 'seychelles.html');
  xp.innerHTML =
    '<div class="xp-top">' + (logo ? logo.outerHTML : '') + '<nav class="xp-links" aria-label="Main">' + mainLinks + '</nav>' +
      '<button class="xp-close" type="button" aria-label="'+L.close+'">'+ICON.close+'</button></div>' +
    '<div class="xp-body"><div class="xp-inner"><div>' +
      '<p class="xp-q">'+L.where+'</p>' +
      '<div class="xp-mlinks">' + mainLinks + '</div>' +
      '<div class="xp-search">'+ICON.search+'<input type="search" placeholder="'+L.search+'" aria-label="'+L.search+'" autocomplete="off"></div>' +
      '<div class="xp-regions">' + regions + cruiseBlock + '</div><p class="xp-none">'+L.none+'</p>' +
      '<div class="xp-social"><a href="https://www.instagram.com/andrewlovesmelody/" target="_blank" rel="noopener">Instagram</a><a href="https://www.tiktok.com/@andrewlovesmelody" target="_blank" rel="noopener">TikTok</a></div>' +
    '</div><figure class="xp-preview"><div class="card"><img src="'+big(first)+'" alt="" width="1125" height="1500" loading="lazy"><figcaption>'+esc(tybName(first.n))+'</figcaption></div></figure></div></div>';
  document.body.appendChild(xp);

  const input = xp.querySelector('.xp-search input');
  const pImg = xp.querySelector('.xp-preview img'), pCap = xp.querySelector('.xp-preview figcaption');
  const none = xp.querySelector('.xp-none');
  let lastFocus = null;
  function open(e, focusSearch){
    lastFocus = document.activeElement;
    if(e && e.clientX){ xp.style.setProperty('--xpx', e.clientX+'px'); xp.style.setProperty('--xpy', e.clientY+'px'); }
    else { xp.style.setProperty('--xpx','50%'); xp.style.setProperty('--xpy', (window.innerHeight-40)+'px'); }
    document.documentElement.classList.add('explore-open');
    setTimeout(() => (focusSearch ? input : xp.querySelector('.xp-close')).focus({preventScroll:true}), 60);
    document.querySelectorAll('.dock [data-x]').forEach(b => b.classList.add('on'));
  }
  function close(){
    document.documentElement.classList.remove('explore-open');
    document.querySelectorAll('.dock [data-x]').forEach(b => b.classList.remove('on'));
    if(lastFocus && lastFocus.focus) lastFocus.focus({preventScroll:true});
  }
  xp.querySelector('.xp-close').addEventListener('click', close);
  document.addEventListener('keydown', e => {
    if(!document.documentElement.classList.contains('explore-open')) return;
    if(e.key === 'Escape') close();
    if(e.key === 'Tab'){ // keep focus inside
      const f = [...xp.querySelectorAll('a,button,input')].filter(el => el.offsetParent !== null);
      if(!f.length) return;
      if(e.shiftKey && document.activeElement === f[0]){ e.preventDefault(); f[f.length-1].focus(); }
      else if(!e.shiftKey && document.activeElement === f[f.length-1]){ e.preventDefault(); f[0].focus(); }
    }
  });
  input.addEventListener('input', () => {
    const q = input.value.trim(); let shown = 0;
    xp.querySelectorAll('.xp-region').forEach(r => {
      let n = 0;
      r.querySelectorAll('li').forEach(li => {
        const d = DESTS.find(x => x.n === li.firstChild.dataset.n);
        const ok = !q || (d ? matches(d, q) : /cruise|crucero|royal|msc|norwegian|celebrity/i.test(q)); li.hidden = !ok; if(ok) n++;
      });
      r.classList.toggle('empty', n === 0); shown += n;
    });
    none.style.display = shown ? 'none' : 'block';
  });
  input.addEventListener('keydown', e => {
    if(e.key === 'Enter'){ const a = [...xp.querySelectorAll('.xp-region li:not([hidden]) a')][0]; if(a){ e.preventDefault(); location.href = a.href; } }
  });
  // postcard preview follows hover / focus (desktop)
  const show = a => { const d = DESTS.find(x => x.n === a.dataset.n); if(!d) return; pImg.src = big(d); pCap.textContent = tybName(d.n); };
  xp.querySelectorAll('.xp-region a').forEach(a => { a.addEventListener('mouseenter', () => show(a)); a.addEventListener('focus', () => show(a)); });

  // triggers: "Destinations" in the nav, the burger
  nav.querySelectorAll('.dd-toggle').forEach(a => a.addEventListener('click', e => { e.preventDefault(); open(e); }));
  const burger = nav.querySelector('.burger');
  if(burger){ burger.setAttribute('aria-controls','explorer'); burger.addEventListener('click', e => open(e)); }
  return {open, close};
})();

// ---------- Mobile dock ----------
(function(){
  if(!Explorer) return;
  const dock = document.createElement('nav');
  dock.className = 'dock'; dock.setAttribute('aria-label','Quick navigation');
  const isHome = TYB_FILE === 'index.html', isStory = TYB_FILE === 'about.html';
  dock.innerHTML =
    '<a href="'+tybUrl('index.html')+'"'+(isHome?' class="on" aria-current="page"':'')+'>'+ICON.home+'<span>'+L.home+'</span></a>' +
    '<button type="button" data-x="1">'+ICON.globe+'<span>'+L.explore+'</span></button>' +
    '<button type="button" data-s="1">'+ICON.search+'<span>'+L.find+'</span></button>' +
    '<a href="'+tybUrl('about.html')+'"'+(isStory?' class="on" aria-current="page"':'')+'>'+ICON.heart+'<span>'+L.story+'</span></a>';
  document.body.appendChild(dock);
  dock.querySelector('[data-x]').addEventListener('click', e => Explorer.open(e));
  dock.querySelector('[data-s]').addEventListener('click', e => Explorer.open(e, true));
})();

// ---------- Homepage: filter destination tiles by country ----------
(function(){
  const wrap = document.querySelector('.destfilter-pills');
  const grid = document.querySelector('.citytiles');
  if(!wrap || !grid) return;
  const tiles = Array.from(grid.querySelectorAll('.citytile'));
  const showAll = wrap.querySelector('.destpill-showall');
  const pills = Array.from(wrap.querySelectorAll('.destpill[data-country]'));
  function reset(){
    pills.forEach(p => { p.classList.remove('active'); p.setAttribute('aria-pressed','false'); });
    tiles.forEach(t => { t.style.display=''; });
    if(showAll){ showAll.hidden = true; wrap.appendChild(showAll); }
  }
  pills.forEach(p => {
    p.setAttribute('aria-pressed','false');
    p.addEventListener('click', () => {
      const wasActive = p.classList.contains('active');
      reset();
      if(wasActive) return;
      p.classList.add('active'); p.setAttribute('aria-pressed','true');
      const c = p.dataset.country;
      tiles.forEach(t => { t.style.display = (t.dataset.country === c) ? '' : 'none'; });
      if(showAll){ p.after(showAll); showAll.hidden = false; showAll.scrollIntoView({block:'nearest',inline:'nearest'}); }
    });
  });
  if(showAll) showAll.addEventListener('click', reset);
})();

// ---------- Homepage hero: postcard deck ----------
(function(){
  const deck = document.querySelector('.hx-deck');
  if(!deck) return;
  const SLIDES = [
    ['cappadocia.html','Turkey','home-hero-couple.webp'],
    ['thailand.html','Phuket','phuket-elephant-kiss.webp'],
    ['seychelles.html','Indian Ocean','seychelles-source-dargent-couple-on-boulder.webp'],
    ['barcelona.html','Our home city','barcelona-park-guell-bench-couple.webp'],
    ['cairo.html','Egypt','giza-jump-melody.webp'],
    ['como.html','Italy','como-villa-terrace-melody.webp'],
    ['madagascar.html','Avenue of the Baobabs','madagascar-baobab-avenue-couple-walking.webp']
  ];
  const SUB_ES = {'Turkey':'Turquía','Indian Ocean':'Océano Índico','Mt Fuji in bloom':'El monte Fuji en flor','Avenue of the Baobabs':'Avenida de los Baobabs','Czech Republic':'República Checa','The Sahara':'El Sáhara','Italy':'Italia','Amalfi Coast':'Costa Amalfitana','Our home city':'Nuestra ciudad','Egypt':'Egipto','France':'Francia','Le Morne':'Le Morne','Indonesia':'Indonesia'};
  const sub = s => TYB_ES ? (SUB_ES[s[1]] || s[1]) : s[1];
  const firstImg = deck.querySelector('img');
  deck.innerHTML = '';
  const cards = SLIDES.map((s, i) => {
    const f = document.createElement('figure'); f.className = 'card pos-hide';
    const img = document.createElement('img');
    img.alt = ''; img.width = 1125; img.height = 1500; img.decoding = 'async';
    if(i === 0){ img.src = firstImg ? firstImg.getAttribute('src') : TYB_ROOT+'images/'+s[2]; img.fetchPriority = 'high'; }
    else img.dataset.src = TYB_ROOT + 'images/' + s[2];
    f.appendChild(img);
    const d = DESTS.find(x => x.u === s[0]);
    const cap = document.createElement('figcaption');
    cap.innerHTML = '<span>'+esc(tybName(d ? d.n : ''))+'</span><small>'+esc(sub(s))+'</small>';
    f.appendChild(cap);
    deck.appendChild(f); return f;
  });
  const stamp = document.createElement('div');
  stamp.className = 'hx-stamp';
  stamp.innerHTML = '<span><b>'+DESTS.length+'</b>'+(TYB_ES?'destinos':'destinations')+'</span>';
  deck.appendChild(stamp);
  const load = i => { const im = cards[i % cards.length].querySelector('img'); if(im.dataset.src){ im.src = im.dataset.src; delete im.dataset.src; } };
  let cur = 0;
  function layout(){
    cards.forEach((c, i) => {
      const rel = (i - cur + cards.length) % cards.length;
      c.className = 'card ' + (rel === 0 ? 'pos-0' : rel === 1 ? 'pos-1' : rel === 2 ? 'pos-2' : 'pos-hide');
    });
    load(cur+1); load(cur+2); load(cur+3);
  }
  function next(){
    const leaving = cards[cur];
    cur = (cur + 1) % cards.length;
    layout();
    leaving.className = 'card pos-out';
    setTimeout(() => { if(leaving.classList.contains('pos-out')) leaving.className = 'card pos-hide'; }, 900);
  }
  layout();
  // clicking the deck opens the guide on the top card
  deck.style.cursor = 'pointer';
  deck.addEventListener('click', () => { location.href = tybUrl(SLIDES[cur][0]); });
  if(REDUCE) return;
  // auto-advance, but only while the hero is on screen and the tab is visible
  let timer = null, visible = true, hover = false;
  const run = () => { clearInterval(timer); if(visible && !hover && !document.hidden) timer = setInterval(next, 4200); };
  if('IntersectionObserver' in window) new IntersectionObserver(es => { visible = es[0].isIntersecting; run(); }).observe(deck);
  document.addEventListener('visibilitychange', run);
  deck.addEventListener('mouseenter', () => { hover = true; run(); });
  deck.addEventListener('mouseleave', () => { hover = false; run(); });
  run();
})();

// ---------- Homepage world map: pan / zoom, pins, and "trace our journeys" ----------
(function(){
  const map = document.getElementById('tybmap');
  const svg = document.getElementById('tybmapSvg');
  const pinsWrap = document.getElementById('tybmapPins');
  if(!map || !svg || !pinsWrap) return;
  const MAPW=1000, MAPH=500, MINW=90;
  const pins = Array.from(pinsWrap.querySelectorAll('.tybpin'));
  let vb={x:0,y:0,w:MAPW,h:MAPH};
  const AR=()=>{ const r=map.getBoundingClientRect(); return (r.width&&r.height)? r.width/r.height : 2; };
  const maxW=()=>Math.min(MAPW, MAPH*AR());
  const xs=pins.map(p=>+p.dataset.x), ys=pins.map(p=>+p.dataset.y);
  const midX=(Math.min(...xs)+Math.max(...xs))/2, midY=(Math.min(...ys)+Math.max(...ys))/2;
  function home(){ const w=maxW(); vb={x:midX-w/2, y:midY-(w/AR())/2, w, h:w/AR()}; }
  function clamp(){
    const ar=AR();
    vb.w=Math.min(maxW(),Math.max(MINW,vb.w)); vb.h=vb.w/ar;
    vb.x=Math.min(MAPW-vb.w,Math.max(0,vb.x));
    vb.y=Math.min(MAPH-vb.h,Math.max(0,vb.y));
  }
  function fit(){ const rect=map.getBoundingClientRect(); return {rect, k:rect.width/vb.w}; }
  function apply(){
    clamp();
    svg.setAttribute('viewBox',`${vb.x} ${vb.y} ${vb.w} ${vb.h}`);
    svg.setAttribute('preserveAspectRatio','none');
    const {rect,k}=fit();
    pins.forEach(p=>{
      const sx=(+p.dataset.x-vb.x)*k, sy=(+p.dataset.y-vb.y)*k;
      const on = sx>=-20 && sx<=rect.width+20 && sy>=-20 && sy<=rect.height+20;
      p.style.display = on ? '' : 'none';
      p.style.left=sx+'px'; p.style.top=sy+'px';
    });
  }
  function zoomAt(factor, cx, cy){
    const {rect,k}=fit();
    const wx=vb.x+(cx-rect.left)/k, wy=vb.y+(cy-rect.top)/k;
    vb.w=Math.min(maxW(),Math.max(MINW,vb.w*factor)); vb.h=vb.w/AR();
    const k2=rect.width/vb.w;
    vb.x=wx-(cx-rect.left)/k2; vb.y=wy-(cy-rect.top)/k2;
    apply();
  }
  const cxAll = xs.reduce((s,v)=>s+v,0)/xs.length, cyAll = ys.reduce((s,v)=>s+v,0)/ys.length;
  function zoomBtn(factor){
    const rect=map.getBoundingClientRect();
    let fx=rect.left+rect.width/2, fy=rect.top+rect.height/2;
    if(vb.w>=maxW()*0.98){ const f=fit(); fx=rect.left+(cxAll-vb.x)*f.k; fy=rect.top+(cyAll-vb.y)*f.k; }
    zoomAt(factor,fx,fy);
  }
  document.getElementById('tybmapIn').addEventListener('click',()=>zoomBtn(0.6));
  document.getElementById('tybmapOut').addEventListener('click',()=>zoomBtn(1/0.6));
  document.getElementById('tybmapReset').addEventListener('click',()=>{home();apply();});
  map.addEventListener('wheel',e=>{e.preventDefault();zoomAt(e.deltaY>0?1.15:0.87, e.clientX, e.clientY);},{passive:false});
  let drag=null;
  map.addEventListener('mousedown',e=>{ if(e.target.closest('.tybmap-ctrl')) return; drag={x:e.clientX,y:e.clientY,vx:vb.x,vy:vb.y}; map.classList.add('grabbing'); });
  window.addEventListener('mousemove',e=>{ if(!drag) return; const {k}=fit(); vb.x=drag.vx-(e.clientX-drag.x)/k; vb.y=drag.vy-(e.clientY-drag.y)/k; apply(); });
  window.addEventListener('mouseup',()=>{drag=null;map.classList.remove('grabbing');});
  // touch: one finger scrolls the page, two fingers pan and pinch the map
  let pinch=null;
  const mid=t=>({x:(t[0].clientX+t[1].clientX)/2, y:(t[0].clientY+t[1].clientY)/2});
  const dist=t=>Math.hypot(t[0].clientX-t[1].clientX, t[0].clientY-t[1].clientY);
  map.addEventListener('touchstart',e=>{ if(e.touches.length===2){ const m=mid(e.touches); pinch={x:m.x,y:m.y,d:dist(e.touches)}; map.classList.add('grabbing'); } },{passive:true});
  map.addEventListener('touchmove',e=>{
    if(!pinch||e.touches.length!==2) return;
    e.preventDefault();
    const m=mid(e.touches), d=dist(e.touches), {k}=fit();
    vb.x-= (m.x-pinch.x)/k; vb.y-= (m.y-pinch.y)/k;
    if(pinch.d>0 && d>0) zoomAt(pinch.d/d, m.x, m.y); else apply();
    pinch={x:m.x,y:m.y,d};
  },{passive:false});
  map.addEventListener('touchend',e=>{ if(e.touches.length<2){ pinch=null; map.classList.remove('grabbing'); } });
  if(window.matchMedia && matchMedia('(pointer: coarse)').matches){
    const sub=document.querySelector('.tybmap-sub');
    if(sub) sub.textContent = TYB_ES
      ? 'Toca un pin para abrir esa guía. Usa + / − o dos dedos para hacer zoom y moverte por el mapa.'
      : 'Tap a pin to open that guide. Use + / − or two fingers to zoom and move around the map.';
  }
  pins.forEach(p=>{
    let sx,sy;
    p.addEventListener('mousedown',e=>{sx=e.clientX;sy=e.clientY;});
    p.addEventListener('click',e=>{ if(sx!=null && (Math.abs(e.clientX-sx)>6||Math.abs(e.clientY-sy)>6)) e.preventDefault(); });
  });
  let lastW=map.getBoundingClientRect().width;
  window.addEventListener('resize',()=>{ const w=map.getBoundingClientRect().width; if(Math.abs(w-lastW)>1){ lastW=w; home(); apply(); } });
  home(); apply();

  // our trips in the order we took them
  const MO_EN = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const MO_ES = ['ene','feb','mar','abr','may','jun','jul','ago','sept','oct','nov','dic'];
  const ROUTE = [['paris',4,2022],['venice',12,2022],['athens',2,2024],['istanbul',3,2024],['positano',5,2024],['sicily',5,2024],['morocco',5,2024],['nassau',7,2024],['cairo',8,2024],
    ['miami',11,2024],['mexico',1,2025],['cappadocia',2,2025],['thailand',3,2025],['singapore',3,2025],['israel-palestine',4,2025],['amsterdam',5,2025],['dubrovnik',5,2025],
    ['london',6,2025],['como',8,2025],['bali',9,2025],['lanzarote',11,2025],['strasbourg',12,2025],['falmouth',2,2026],['hong-kong',3,2026],['beijing',4,2026],['japan',4,2026],
    ['vietnam',7,2026],['tunis',8,2026],['seychelles',9,2026],['madagascar',9,2026],['mauritius',9,2026],['prague',10,2026]];
  const btn = document.getElementById('tybmapRoute');
  const now = document.getElementById('tybmapNow');
  if(!btn) return;
  const pinBy = slug => pins.find(p => p.getAttribute('href').replace(/^.*\//,'') === slug + '.html');
  const NS = 'http://www.w3.org/2000/svg';
  let g = null, playing = false, timers = [];
  const label = btn.querySelector('span');
  function stop(){
    playing = false; timers.forEach(clearTimeout); timers = [];
    label.textContent = L.route; btn.setAttribute('aria-pressed','false');
  }
  function clear(){ if(g) g.remove(); g = null; pins.forEach(p => p.classList.remove('lit','show')); now.classList.remove('show'); }
  btn.addEventListener('click', () => {
    if(playing){ stop(); return; }
    clear(); home(); apply();
    playing = true; label.textContent = L.stop; btn.setAttribute('aria-pressed','true');
    g = document.createElementNS(NS,'g'); svg.appendChild(g);
    const step = REDUCE ? 0 : 520;
    let prev = null;
    ROUTE.forEach(([slug, m, y], i) => {
      const p = pinBy(slug); if(!p) return;
      const at = {x:+p.dataset.x, y:+p.dataset.y};
      const from = prev; prev = at;
      timers.push(setTimeout(() => {
        if(!playing) return;
        if(from){
          const dx = at.x-from.x, dy = at.y-from.y, len = Math.hypot(dx,dy);
          const cx = (from.x+at.x)/2 + dy*0.18 - 0, cy = (from.y+at.y)/2 - Math.max(8, len*0.28);
          const path = document.createElementNS(NS,'path');
          path.setAttribute('d', `M${from.x},${from.y} Q${cx},${cy} ${at.x},${at.y}`);
          path.setAttribute('class','route-arc');
          g.appendChild(path);
          const L2 = path.getTotalLength();
          if(!REDUCE){
            path.style.strokeDasharray = L2; path.style.strokeDashoffset = L2;
            path.getBoundingClientRect();
            path.style.transition = 'stroke-dashoffset .48s cubic-bezier(.4,0,.2,1)';
            path.style.strokeDashoffset = 0;
          }
          [...g.children].slice(0,-1).forEach(pp => pp.classList.add('done'));
        }
        pins.forEach(q => q.classList.remove('show'));
        p.classList.add('lit','show');
        const d = DESTS.find(x => x.u === slug + '.html');
        now.innerHTML = '<b>'+esc(tybName(d ? d.n : slug))+'</b>'+(TYB_ES?MO_ES:MO_EN)[m-1]+' '+y+' · '+(i+1)+'/'+ROUTE.length;
        now.classList.add('show');
        if(i === ROUTE.length-1) timers.push(setTimeout(stop, 600));
      }, i*step));
    });
  });
})();

// ---------- Inline AJAX submit for FormSubmit forms ----------
(function () {
  function attachAjax(form, successHTML, busyLabel) {
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var honey = form.querySelector('input[name="_honey"]');
      if (honey && honey.value) return;
      if (!form.checkValidity()) { form.reportValidity && form.reportValidity(); return; }
      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.dataset.orig = btn.innerHTML; btn.textContent = busyLabel || 'Sending…'; }
      var payload = {};
      new FormData(form).forEach(function (v, k) { if (k !== '_honey') payload[k] = v; });
      var endpoint = (form.getAttribute('action') || '').replace('formsubmit.co/', 'formsubmit.co/ajax/');
      fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(payload) })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data && (data.success === 'true' || data.success === true)) { showSuccess(form, successHTML); }
        else { throw new Error('formsubmit'); }
      })
      .catch(function () {
        if (btn) { btn.disabled = false; if (btn.dataset.orig) btn.innerHTML = btn.dataset.orig; }
        form.submit();
      });
    });
  }
  function showSuccess(form, html) {
    var msg = document.createElement('div');
    msg.className = 'signup-success' + (form.id === 'contactForm' ? ' signup-success--wide' : '');
    msg.setAttribute('role', 'status');
    msg.innerHTML = html;
    form.parentNode.replaceChild(msg, form);
    msg.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }
  document.querySelectorAll('form.foot-signup, form.signup-form').forEach(function (f) {
    attachAjax(f, TYB_ES ? "<strong>¡Ya estás dentro! 🎉</strong> Gracias por unirte al viaje." : "<strong>You're in! 🎉</strong> Thanks for joining the journey: see you in your inbox.", TYB_ES ? 'Enviando…' : 'Joining…');
  });
  attachAjax(document.getElementById('contactForm'),
    "<strong>Message sent! ✅</strong> Thanks for reaching out: we'll get back to you as soon as we can.", 'Sending…');
})();

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
  if (TYB_ES) setGoogTrans(null);
  else if (pref === 'es' && !TYB_HAS_TWIN) autoTranslate();
  else if (pref === 'en') setGoogTrans(null);
  document.querySelectorAll('.langtoggle button').forEach(b => b.addEventListener('click', () => {
    const lang = b.dataset.lang;
    set(lang); mark(lang);
    if (lang === 'es') {
      if (TYB_ES) return;
      if (TYB_HAS_TWIN) { location.href = 'es/' + TYB_SEG + location.hash; return; }
      autoTranslate();
    } else {
      setGoogTrans(null);
      if (TYB_ES) { location.href = '../' + TYB_SEG + location.hash; return; }
      if (window.__tybTranslating) location.reload();
    }
  }));
})();

// ---------- Guide pages: title letters, filmstrips, lightbox ----------
(function(){
  // split the destination name into letters for its one entrance
  const t = document.querySelector('.gx-title');
  if(t && !REDUCE){
    let i = 0;
    const walk = node => {
      [...node.childNodes].forEach(n => {
        if(n.nodeType === 3){
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part => {
            if(!part) return;
            if(/^\s+$/.test(part)){ frag.appendChild(document.createTextNode(' ')); return; }
            const w = document.createElement('span'); w.className = 'w';
            [...part].forEach(ch => { const s = document.createElement('span'); s.className = 'ch'; s.style.setProperty('--i', i++); s.textContent = ch; w.appendChild(s); });
            frag.appendChild(w);
          });
          n.replaceWith(frag);
        } else if(n.nodeType === 1) walk(n);
      });
    };
    t.setAttribute('aria-label', t.textContent.trim());
    walk(t);
    t.querySelectorAll('.w').forEach(w => w.setAttribute('aria-hidden','true'));
  }

  // multi-photo spots: a swipeable filmstrip with counter + dots on phones
  document.querySelectorAll('.spot-media.stack').forEach(strip => {
    const imgs = [...strip.querySelectorAll('img')];
    if(imgs.length < 2) return;
    const wrap = document.createElement('div'); wrap.className = 'spot-wrap';
    strip.parentNode.insertBefore(wrap, strip); wrap.appendChild(strip);
    const count = document.createElement('span'); count.className = 'spot-count'; count.textContent = '1 / ' + imgs.length; wrap.appendChild(count);
    const dots = document.createElement('div'); dots.className = 'spot-dots'; dots.setAttribute('aria-hidden','true');
    imgs.forEach((_, i) => { const d = document.createElement('i'); if(!i) d.className = 'on'; dots.appendChild(d); });
    wrap.appendChild(dots);
    let raf = 0;
    strip.addEventListener('scroll', () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const w = imgs[0].getBoundingClientRect().width + 10;
        const i = Math.max(0, Math.min(imgs.length-1, Math.round(strip.scrollLeft / w)));
        count.textContent = (i+1) + ' / ' + imgs.length;
        [...dots.children].forEach((d, j) => d.classList.toggle('on', j === i));
      });
    }, {passive:true});
  });

  // lightbox for every photo on a guide
  const groups = [...document.querySelectorAll('.spot-media, .gallery, .proposal-media')];
  if(!groups.length) return;
  const lb = document.createElement('div');
  lb.className = 'lb'; lb.setAttribute('role','dialog'); lb.setAttribute('aria-modal','true'); lb.setAttribute('aria-label','Photo viewer');
  lb.innerHTML = '<div class="lb-stage"><img alt=""></div><div class="lb-bar"><span class="lb-cap"></span><span class="lb-n"></span></div>' +
    '<button class="lb-close" type="button" aria-label="'+L.close+'">'+ICON.close+'</button>' +
    '<button class="lb-prev" type="button" aria-label="'+L.prev+'">'+ICON.left+'</button><button class="lb-next" type="button" aria-label="'+L.next+'">'+ICON.right+'</button>';
  document.body.appendChild(lb);
  const big = lb.querySelector('.lb-stage img'), cap = lb.querySelector('.lb-cap'), num = lb.querySelector('.lb-n');
  let set = [], idx = 0, opener = null;
  function show(i){
    idx = (i + set.length) % set.length;
    const im = set[idx];
    big.src = im.currentSrc || im.src; big.alt = im.alt || '';
    cap.textContent = im.alt || ''; num.textContent = (idx+1) + ' / ' + set.length;
    big.style.animation = 'none'; big.offsetWidth; big.style.animation = '';
  }
  function open(group, im){
    opener = im; set = [...group.querySelectorAll('img')]; show(set.indexOf(im));
    lb.classList.add('open'); document.documentElement.style.overflow = 'hidden';
    lb.querySelector('.lb-close').focus({preventScroll:true});
  }
  function close(){ lb.classList.remove('open'); document.documentElement.style.overflow = ''; if(opener) opener.focus && opener.focus({preventScroll:true}); }
  groups.forEach(g => g.querySelectorAll('img').forEach(im => {
    im.tabIndex = 0;
    im.addEventListener('click', () => {
      const strip = im.closest('.spot-media.stack');
      if(strip && strip.dataset.dragged === '1') return;
      open(g, im);
    });
    im.addEventListener('keydown', e => { if(e.key === 'Enter'){ e.preventDefault(); open(g, im); } });
  }));
  lb.querySelector('.lb-close').addEventListener('click', close);
  lb.querySelector('.lb-prev').addEventListener('click', () => show(idx-1));
  lb.querySelector('.lb-next').addEventListener('click', () => show(idx+1));
  lb.querySelector('.lb-stage').addEventListener('click', e => { if(e.target === e.currentTarget) close(); });
  document.addEventListener('keydown', e => {
    if(!lb.classList.contains('open')) return;
    if(e.key === 'Escape') close();
    if(e.key === 'ArrowLeft') show(idx-1);
    if(e.key === 'ArrowRight') show(idx+1);
  });
  let sx = null, sy = null;
  lb.addEventListener('touchstart', e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, {passive:true});
  lb.addEventListener('touchend', e => {
    if(sx === null) return;
    const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    if(Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) show(idx + (dx < 0 ? 1 : -1));
    else if(dy > 90) close();
    sx = null;
  });
})();

// ---------- Scroll layer: header state, progress plane, jump-to spy, back to top ----------
(function(){
  const navEl = document.querySelector('.nav');
  const root = document.documentElement;
  const setNavH = () => { if(navEl) root.style.setProperty('--navh', navEl.offsetHeight + 'px'); };
  setNavH(); window.addEventListener('resize', setNavH);

  const cover = document.querySelector('.gx-hero');
  let bar = null;
  if (cover) {
    bar = document.createElement('div'); bar.className = 'tyb-progress'; bar.setAttribute('aria-hidden','true');
    bar.innerHTML = '<i></i>' + ICON.plane;
    document.body.appendChild(bar);
  }
  const top = document.createElement('button');
  top.type = 'button'; top.className = 'tyb-top'; top.setAttribute('aria-label', L.top);
  top.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: REDUCE ? 'auto' : 'smooth' }));
  document.body.appendChild(top);

  const cnav = document.querySelector('.citynav');
  const links = cnav ? [...cnav.querySelectorAll('a[href^="#"]')] : [];
  const targets = links.map(a => document.getElementById(a.getAttribute('href').slice(1))).filter(Boolean);
  const coverImg = cover ? cover.querySelector('.gx-photo img') : null;
  let activeId = null, ticking = false;
  function setActive(id){
    if(id === activeId) return; activeId = id;
    links.forEach(a => {
      const on = a.getAttribute('href') === '#' + id;
      a.classList.toggle('is-active', on);
      if (on && cnav.scrollWidth > cnav.clientWidth) cnav.scrollTo({ left: a.offsetLeft - 60, behavior: REDUCE ? 'auto' : 'smooth' });
    });
  }
  function onScroll(){
    const y = window.scrollY, vh = window.innerHeight;
    if (navEl) navEl.classList.toggle('is-scrolled', y > (document.body.classList.contains('pg-guide') && window.innerWidth <= 820 ? vh * 0.6 : 8));
    top.classList.toggle('show', y > vh * 1.2);
    if (bar) { const max = document.documentElement.scrollHeight - vh; bar.style.setProperty('--p', max > 0 ? Math.min(1, y / max).toFixed(4) : 0); bar.classList.toggle('go', y > 40); }
    if (coverImg && !REDUCE) coverImg.style.setProperty('--py', Math.min(60, y * 0.15) + 'px');
    if (targets.length){
      let best = null;
      targets.forEach(t => { if (t.getBoundingClientRect().top < vh * 0.35) best = t.id; });
      if (best) setActive(best); else { activeId = null; links.forEach(a => a.classList.remove('is-active')); }
    }
    ticking = false;
  }
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
})();

// ---------- Tile click: a small plane glides off, then the guide opens ----------
(function(){
  if (REDUCE) return;
  let leaving = false;
  document.addEventListener('click', e => {
    const t = e.target.closest('.citytiles .citytile, .related-tiles .citytile');
    if (!t || leaving || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || t.target === '_blank') return;
    e.preventDefault();
    leaving = true;
    const r = t.getBoundingClientRect();
    const fx = document.createElement('span');
    fx.className = 'tyb-takeoff';
    fx.style.left = (e.clientX || (r.left + r.width / 2)) + 'px';
    fx.style.top = (e.clientY || (r.top + r.height / 2)) + 'px';
    fx.innerHTML = ICON.plane;
    document.body.appendChild(fx);
    t.classList.add('tko-press');
    const go = t.href;
    setTimeout(() => { window.location.href = go; }, 450);
  });
  window.addEventListener('pageshow', () => {
    leaving = false;
    document.querySelectorAll('.tyb-takeoff').forEach(n => n.remove());
    document.querySelectorAll('.tko-press').forEach(n => n.classList.remove('tko-press'));
  });
})();
