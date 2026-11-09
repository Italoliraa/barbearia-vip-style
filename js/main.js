(function () {
  var SITE = window.SITE, DATA = window.DATA;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var DAYS = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
  var DAYS_SHORT = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
  var brl = function (n) { return 'R$ ' + n.toFixed(0); };
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };
  var toMin = function (t) { var p = t.split(':'); return +p[0] * 60 + +p[1]; };
  var toTime = function (m) { return pad(Math.floor(m / 60)) + ':' + pad(m % 60); };

  /* ---------- Ícones ---------- */
  var ICONS = {
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>', x: '<path d="M18 6 6 18M6 6l12 12"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    whatsapp: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    instagram: '<rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/>',
    scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12"/>'
  };
  function icon(n, s, c) { return '<svg class="icon ' + (c || '') + '" width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[n] + '</svg>'; }
  function hydrate(root) { $$('[data-icon]', root).forEach(function (el) { el.outerHTML = icon(el.getAttribute('data-icon'), el.getAttribute('data-size') || 22, el.className); }); }

  function wa(text) { return 'https://wa.me/' + SITE.whatsapp + '?text=' + encodeURIComponent(text); }
  var HELLO = 'Olá! Quero agendar um horário na Barbearia Vip Style.';

  /* ---------- Dados fixos na página ---------- */
  $$('[data-wa]').forEach(function (a) { a.href = wa(HELLO); a.target = '_blank'; a.rel = 'noreferrer'; });
  $$('[data-ig]').forEach(function (a) { a.href = SITE.instagramUrl; a.target = '_blank'; a.rel = 'noreferrer'; a.textContent = '@' + SITE.instagramUser; });
  $$('[data-site]').forEach(function (el) { el.textContent = SITE[el.getAttribute('data-site')]; });
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
  if (SITE.mapEmbedUrl) $('#map').innerHTML = '<iframe title="Mapa da barbearia" src="' + SITE.mapEmbedUrl + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';

  /* ---------- Tabela de preços ---------- */
  var all = [];
  $('#menu-board').innerHTML = DATA.menu.map(function (g) {
    return '<div class="board__group reveal"><h3>' + g.cat + '</h3><ul>' + g.items.map(function (it) {
      all.push(it);
      return '<li><button type="button" class="row" data-service="' + it.id + '"><span class="row__name">' + it.name + '<small>' + it.desc + '</small></span><span class="row__dots"></span><span class="row__price">' + brl(it.price) + '</span></button></li>';
    }).join('') + '</ul></div>';
  }).join('');

  /* ---------- Galeria (ilustrações em SVG ou foto) ---------- */
  var HAIR = {
    fade: [['M60 94C56 54 78 40 100 40C122 40 144 54 140 94C132 76 120 68 100 68C80 68 68 76 60 94Z', 1], ['M57 108V84C57 77 63 73 67 78V108Z', .3], ['M143 108V84C143 77 137 73 133 78V108Z', .3]],
    pompa: [['M54 98C44 50 70 20 104 22C136 24 152 52 146 98C140 76 128 62 100 60C74 62 60 78 54 98Z', 1]],
    social: [['M58 96C56 56 78 42 102 42C128 42 146 58 142 96C134 72 118 62 96 62C80 62 66 74 58 96Z', 1], ['M82 44C78 52 76 58 74 66', 0, 1]],
    buzz: [['M60 90C60 58 78 48 100 48C122 48 140 58 140 90C130 72 118 64 100 64C82 64 70 72 60 90Z', .55]],
    mohawk: [['M87 18C94 11 106 11 113 18L117 80H83Z', 1], ['M60 94C58 74 66 64 82 62V90Z', .3], ['M140 94C142 74 134 64 118 62V90Z', .3]],
    curly: [['M100 20C134 16 158 40 152 72C150 84 146 92 142 96C138 74 122 64 100 64C78 64 62 74 58 96C54 92 50 84 48 72C42 40 66 16 100 20Z', 1]]
  };
  function head(c) {
    var h = HAIR[c.hair].map(function (p) {
      return p[2] ? '<path d="' + p[0] + '" fill="none" stroke="' + c.bg + '" stroke-width="2.5" stroke-linecap="round"/>' : '<path d="' + p[0] + '" fill="#161D2E" opacity="' + p[1] + '"/>';
    }).join('');
    var beard = c.beard ? '<path d="M58 116C60 160 80 174 100 174C120 174 140 160 142 116C134 138 118 148 100 148C82 148 66 138 58 116Z" fill="#161D2E"/>' : '';
    return '<svg viewBox="0 0 200 240" role="img" aria-label="Ilustração do corte ' + c.name + '"><rect width="200" height="240" fill="' + c.bg + '"/>' +
      '<path d="M16 240C16 202 58 188 82 186H118C142 188 184 202 184 240Z" fill="#0F1A33"/>' +
      '<path d="M100 214L84 186h32Z" fill="#fff" opacity=".9"/><rect x="82" y="148" width="36" height="42" fill="' + c.skin + '"/><rect x="82" y="148" width="36" height="14" fill="#000" opacity=".12"/>' +
      '<ellipse cx="58" cy="110" rx="7" ry="12" fill="' + c.skin + '"/><ellipse cx="142" cy="110" rx="7" ry="12" fill="' + c.skin + '"/>' +
      '<ellipse cx="100" cy="106" rx="43" ry="55" fill="' + c.skin + '"/>' + beard + h +
      '<path d="M82 100q6-3 12 0M106 100q6-3 12 0" stroke="#161D2E" stroke-width="3" stroke-linecap="round" fill="none"/></svg>';
  }
  $('#gallery').innerHTML = DATA.cuts.map(function (c, i) {
    var msg = 'Olá! Quero fazer o corte "' + c.name + '" na Barbearia Vip Style.';
    var media = c.img ? '<img src="' + c.img + '" alt="Corte ' + c.name + '" loading="lazy">' : head(c);
    return '<article class="cut reveal" data-delay="' + (i % 3) * 80 + '"><div class="cut__media">' + media + '</div><div class="cut__info"><h3>' + c.name + '</h3><p>' + c.tag + '</p><a href="' + wa(msg) + '" target="_blank" rel="noreferrer" class="link">Quero esse corte</a></div></article>';
  }).join('');

  $('#perks').innerHTML = DATA.perks.map(function (p) {
    return '<li class="reveal"><span data-icon="check" data-size="20"></span><div><strong>' + p.title + '</strong><span>' + p.text + '</span></div></li>';
  }).join('');
  hydrate(document);

  /* ---------- Aberto agora ---------- */
  function openInfo(now) {
    var h = SITE.hours[now.getDay()], m = now.getHours() * 60 + now.getMinutes();
    if (h && m >= toMin(h[0]) && m < toMin(h[1])) return { open: true, text: 'Aberto agora, fecha às ' + h[1].replace(':00', 'h').replace(':', 'h') };
    for (var i = 0; i < 8; i++) {
      var d = (now.getDay() + i) % 7, hh = SITE.hours[d];
      if (!hh) continue;
      if (i === 0 && m >= toMin(hh[1])) continue;
      if (i === 0) return { open: false, text: 'Fechado, abre hoje às ' + hh[0].replace(':00', 'h') };
      return { open: false, text: 'Fechado, abre ' + (i === 1 ? 'amanhã' : DAYS[d]) + ' às ' + hh[0].replace(':00', 'h') };
    }
    return { open: false, text: 'Fechado' };
  }
  function paintStatus() {
    var s = openInfo(new Date());
    $$('[data-status]').forEach(function (el) { el.classList.toggle('is-open', s.open); $('span', el).textContent = s.text; });
  }
  paintStatus(); setInterval(paintStatus, 60000);

  $('#hours-list').innerHTML = [1, 2, 3, 4, 5, 6, 0].map(function (d) {
    var h = SITE.hours[d];
    return '<li' + (d === new Date().getDay() ? ' class="is-today"' : '') + '><span>' + DAYS[d].charAt(0).toUpperCase() + DAYS[d].slice(1) + '</span><span>' + (h ? h[0] + ' às ' + h[1] : 'Fechado') + '</span></li>';
  }).join('');

  /* ---------- Agendamento via WhatsApp ---------- */
  var state = { service: '', barber: '', date: null, time: '' };
  var elService = $('#f-service'), elBarbers = $('#f-barbers'), elDays = $('#f-days'), elTimes = $('#f-times'), elName = $('#f-name'), elSum = $('#summary'), elBtn = $('#book-btn'), elErr = $('#book-err');

  elService.innerHTML = '<option value="">Escolha o serviço</option>' + all.map(function (s) { return '<option value="' + s.id + '">' + s.name + ' (' + brl(s.price) + ')</option>'; }).join('');
  elBarbers.innerHTML = ['Qualquer barbeiro'].concat(SITE.barbers).map(function (b, i) {
    return '<label class="chip"><input type="radio" name="barber" value="' + (i ? b : '') + '"' + (i ? '' : ' checked') + '><span>' + b + '</span></label>';
  }).join('');

  var days = [];
  for (var i = 0; days.length < 7 && i < 21; i++) {
    var d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + i);
    if (SITE.hours[d.getDay()]) days.push(d);
  }
  function dayLabel(d) {
    var diff = Math.round((d - new Date(new Date().setHours(0, 0, 0, 0))) / 864e5);
    return (diff === 0 ? 'Hoje' : diff === 1 ? 'Amanhã' : DAYS_SHORT[d.getDay()]) + ' ' + pad(d.getDate()) + '/' + pad(d.getMonth() + 1);
  }
  elDays.innerHTML = days.map(function (d, i) { return '<label class="chip"><input type="radio" name="day" value="' + i + '"><span>' + dayLabel(d) + '</span></label>'; }).join('');

  function slotsFor(d) {
    var h = SITE.hours[d.getDay()], out = [], now = new Date(), isToday = d.toDateString() === now.toDateString();
    var min = isToday ? now.getHours() * 60 + now.getMinutes() + 30 : 0;
    for (var m = toMin(h[0]); m + SITE.slotMinutes <= toMin(h[1]); m += SITE.slotMinutes) if (m >= min) out.push(toTime(m));
    return out;
  }
  function renderTimes() {
    state.time = '';
    if (!state.date) { elTimes.innerHTML = '<p class="hint">Escolha um dia para ver os horários.</p>'; return update(); }
    var s = slotsFor(state.date);
    elTimes.innerHTML = s.length ? s.map(function (t) { return '<label class="chip chip--sm"><input type="radio" name="time" value="' + t + '"><span>' + t + '</span></label>'; }).join('') : '<p class="hint">Sem horários livres neste dia. Escolha outro dia.</p>';
    update();
  }
  function update() {
    var svc = all.filter(function (s) { return s.id === state.service; })[0];
    var parts = [];
    if (svc) parts.push(svc.name + ' (' + brl(svc.price) + ')');
    if (state.barber) parts.push('com ' + state.barber);
    if (state.date) parts.push(dayLabel(state.date).toLowerCase());
    if (state.time) parts.push('às ' + state.time);
    elSum.textContent = parts.length ? parts.join(' · ') : 'Monte seu horário nas opções ao lado.';
    elBtn.disabled = !(svc && state.date && state.time);
  }
  elService.addEventListener('change', function () { state.service = elService.value; update(); });
  elBarbers.addEventListener('change', function (e) { state.barber = e.target.value; update(); });
  elDays.addEventListener('change', function (e) { state.date = days[+e.target.value]; renderTimes(); });
  elTimes.addEventListener('change', function (e) { state.time = e.target.value; update(); });
  elTimes.innerHTML = '<p class="hint">Escolha um dia para ver os horários.</p>';

  function selectService(id) {
    elService.value = id; state.service = id; update();
    $('#agendar').scrollIntoView({ behavior: 'smooth' });
  }
  $$('[data-service]').forEach(function (b) { b.addEventListener('click', function () { selectService(b.getAttribute('data-service')); }); });

  $('#book-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var name = elName.value.trim();
    if (name.length < 2) { elErr.textContent = 'Informe seu nome para o barbeiro saber quem é você.'; elName.focus(); return; }
    elErr.textContent = '';
    var svc = all.filter(function (s) { return s.id === state.service; })[0];
    var txt = 'Olá! Sou ' + name + ' e quero agendar na Barbearia Vip Style.\n' +
      'Serviço: ' + svc.name + ' (' + brl(svc.price) + ')\n' +
      (state.barber ? 'Barbeiro: ' + state.barber + '\n' : '') +
      'Dia: ' + dayLabel(state.date) + '\nHorário: ' + state.time + '\nPode confirmar?';
    window.open(wa(txt), '_blank', 'noopener');
  });

  /* ---------- Menu, rolagem e animações ---------- */
  var header = $('.header'), nav = $('#nav'), burger = $('.burger');
  function onScroll() { header.classList.toggle('is-solid', window.scrollY > 24 || nav.classList.contains('is-open')); }
  function setMenu(o) { nav.classList.toggle('is-open', o); burger.setAttribute('aria-expanded', o); burger.setAttribute('aria-label', o ? 'Fechar menu' : 'Abrir menu'); burger.innerHTML = icon(o ? 'x' : 'menu', 26); document.body.style.overflow = o ? 'hidden' : ''; onScroll(); }
  burger.addEventListener('click', function () { setMenu(!nav.classList.contains('is-open')); });
  $$('a', nav).concat($$('.logo')).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  window.addEventListener('scroll', onScroll, { passive: true });
  burger.innerHTML = icon('menu', 26); onScroll();

  var items = $$('.reveal');
  items.forEach(function (el) { el.style.transitionDelay = (el.getAttribute('data-delay') || 0) + 'ms'; });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }); }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else items.forEach(function (el) { el.classList.add('is-in'); });
})();
