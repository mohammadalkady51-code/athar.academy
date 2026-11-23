/* ============================================================
   أكاديمية أثر — الوظائف العامة
   قائمة الجوال · ترويسة لاصقة · الظهور التدريجي · الشهادات والآراء (من data.js)
   عارض الصور (Lightbox) · نافذة المعلم · كاروسيل · شريط تقدم المقال · رسالة واتساب العائمة
   كل العناصر التفاعلية تعمل بالكيبورد وتحترم تقليل الحركة.
   ============================================================ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function lang() { return (window.ASAR_LANG && window.ASAR_LANG.current()) || document.documentElement.lang || 'ar'; }
  function isRtl() { return document.documentElement.dir === 'rtl'; }
  function ui(ar, en) { return lang() === 'en' ? en : ar; }

  var FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';
  function trapTab(container, e) {
    var items = Array.prototype.filter.call(container.querySelectorAll(FOCUSABLE), function (el) { return el.offsetParent !== null || el === document.activeElement; });
    if (!items.length) return;
    var first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  var ICON_ZOOM = '<svg viewBox="0 0 24 24" class="ic" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5M11 8v6M8 11h6"/></svg>';

  document.addEventListener('DOMContentLoaded', function () {
    setupNav();
    setupNavGroups();
    setupHeaderState();
    setupReveal();
    document.querySelectorAll('.js-year').forEach(function (el) { el.textContent = String(new Date().getFullYear()); });

    var data = window.ASAR_DATA || {};
    renderTestimonials(data);
    renderAchievements(data);
    renderGalleries(data);
    setupCarousels();
    var lightbox = setupLightbox();
    setupTeamModal();
    setupWaLabel();
    setupProgress();
    if (lightbox) lightbox.ready = true;

    /* تحديث النصوص الديناميكية (alt/captions) عند تبديل اللغة */
    document.addEventListener('asar:lang', refreshDynamicText);
    refreshDynamicText();
  });

  /* ===== قائمة الجوال ===== */
  function setupNav() {
    var toggle = document.getElementById('navToggle');
    var nav = document.getElementById('mainNav');
    var overlay = document.getElementById('navOverlay');
    if (!toggle || !nav) return;
    var mq = window.matchMedia('(max-width: 1180px)');

    function set(open) {
      nav.classList.toggle('open', open);
      toggle.classList.toggle('open', open);
      if (overlay) overlay.classList.toggle('show', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) { var a = nav.querySelector('a, button'); if (a) a.focus(); }
    }
    toggle.addEventListener('click', function () { set(!nav.classList.contains('open')); });
    if (overlay) overlay.addEventListener('click', function () { set(false); toggle.focus(); });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { set(false); }); });
    document.addEventListener('keydown', function (e) {
      if (!nav.classList.contains('open')) return;
      if (e.key === 'Escape') { set(false); toggle.focus(); }
      if (e.key === 'Tab' && mq.matches) trapTab(document.querySelector('.site-header'), e);
    });
    var onChange = function () { if (!mq.matches && nav.classList.contains('open')) set(false); };
    if (mq.addEventListener) mq.addEventListener('change', onChange); else mq.addListener(onChange);
  }

  /* ===== قوائم فرعية (الأكاديمية / المحتوى) ===== */
  function setupNavGroups() {
    var groups = document.querySelectorAll('.nav-group');
    if (!groups.length) return;
    function setOpen(g, open) {
      g.classList.toggle('open', open);
      var b = g.querySelector('.nav-group-btn');
      if (b) b.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    function closeAll(except) { groups.forEach(function (g) { if (g !== except) setOpen(g, false); }); }
    groups.forEach(function (g) {
      var b = g.querySelector('.nav-group-btn');
      if (g.querySelector('.nav-sub a.active')) g.classList.add('has-active');
      b.addEventListener('click', function (e) { e.stopPropagation(); var o = !g.classList.contains('open'); closeAll(g); setOpen(g, o); });
      g.addEventListener('keydown', function (e) { if (e.key === 'Escape' && g.classList.contains('open')) { setOpen(g, false); b.focus(); e.stopPropagation(); } });
      g.addEventListener('focusout', function (e) { if (!g.contains(e.relatedTarget)) setOpen(g, false); });
    });
    document.addEventListener('click', function (e) { if (!e.target.closest('.nav-group')) closeAll(); });
  }

  /* ===== صور رحلة أثر (من data.js) — القسم الفارغ يبقى مخفيًا ===== */
  function renderGalleries(data) {
    var g = data.gallery || {};
    document.querySelectorAll('.js-gallery').forEach(function (wrap) {
      var key = wrap.getAttribute('data-key');
      var list = g[key] || [];
      if (!list.length) return;
      list.forEach(function (t) {
        var fig = document.createElement('figure');
        fig.className = 'gal-item';
        var btn = document.createElement('button');
        btn.type = 'button'; btn.className = 'zoom';
        btn.setAttribute('data-lightbox', 'gal-' + key);
        btn.setAttribute('data-full', t.img);
        btn.setAttribute('data-alt-ar', t.alt || '');
        btn.setAttribute('data-alt-en', t.altEn || t.alt || '');
        var img = document.createElement('img');
        img.src = t.thumb || t.img; img.loading = 'lazy'; img.decoding = 'async'; img.alt = '';
        btn.appendChild(img);
        btn.insertAdjacentHTML('beforeend', '<span class="zoom-hint">' + ICON_ZOOM + '</span>');
        fig.appendChild(btn); wrap.appendChild(fig);
      });
      var gal = wrap.closest('.gal'); if (gal) gal.hidden = false;
      var stage = wrap.closest('[data-hide-empty]'); if (stage) stage.hidden = false;
    });
  }

  /* ===== حالة الترويسة عند التمرير ===== */
  function setupHeaderState() {
    var h = document.getElementById('siteHeader');
    if (!h) return;
    var ticking = false;
    function upd() { h.classList.toggle('is-scrolled', window.scrollY > 8); ticking = false; }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
    upd();
  }

  /* ===== الظهور التدريجي ===== */
  function setupReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    /* تأخير متدرج للإخوة داخل نفس الشبكة */
    els.forEach(function (el) {
      var sibs = el.parentElement ? Array.prototype.filter.call(el.parentElement.children, function (c) { return c.classList.contains('reveal'); }) : [];
      var i = sibs.indexOf(el);
      if (i > 0) el.style.setProperty('--d', Math.min(i, 5) * 0.07 + 's');
    });
    if (reduceMotion || !('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('visible'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (el) { io.observe(el); });
    /* شبكة أمان: لا نترك محتوى مخفيًا إن تعطل المراقب */
    setTimeout(function () { els.forEach(function (el) { if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('visible'); }); }, 1200);
  }

  /* ===== عرض آراء أولياء الأمور ===== */
  function renderTestimonials(data) {
    document.querySelectorAll('.js-testimonials').forEach(function (wrap) {
      var list = data.testimonials || [];
      if (!list.length) { var s = wrap.closest('section'); if (s) s.hidden = true; return; }
      list.forEach(function (t, i) {
        var fig = document.createElement('figure');
        fig.className = 'tm';
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'zoom';
        btn.setAttribute('data-lightbox', 'testimonials');
        btn.setAttribute('data-full', t.img);
        btn.setAttribute('data-alt-ar', t.alt || '');
        btn.setAttribute('data-alt-en', t.altEn || t.alt || '');
        var img = document.createElement('img');
        img.src = t.thumb || t.img;
        img.loading = 'lazy';
        img.decoding = 'async';
        img.width = 640; img.height = 640;
        btn.appendChild(img);
        btn.insertAdjacentHTML('beforeend', '<span class="zoom-hint">' + ICON_ZOOM + '</span>');
        fig.appendChild(btn);
        wrap.appendChild(fig);
      });
    });
  }

  /* ===== عرض الإنجازات ===== */
  function renderAchievements(data) {
    document.querySelectorAll('.js-achievements').forEach(function (wrap) {
      var list = data.achievements || [];
      var limit = parseInt(wrap.getAttribute('data-limit') || '0', 10);
      if (limit) list = list.slice(0, limit);
      var empty = document.querySelector('.js-achievements-empty');
      if (!list.length) {
        wrap.hidden = true;
        if (empty) empty.hidden = false;
        else { var s = wrap.closest('section'); if (s) s.hidden = true; }
        return;
      }
      if (empty) empty.hidden = true;
      list.forEach(function (a) {
        var fig = document.createElement('figure');
        fig.className = 'cert reveal visible';
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'zoom';
        btn.setAttribute('data-lightbox', 'achievements-' + (limit ? 'home' : 'all'));
        btn.setAttribute('data-full', a.img);
        btn.setAttribute('data-alt-ar', a.alt || '');
        btn.setAttribute('data-alt-en', a.altEn || a.alt || '');
        btn.setAttribute('data-cap-ar', (a.title ? a.title + ' — ' : '') + (a.cap || ''));
        btn.setAttribute('data-cap-en', (a.titleEn ? a.titleEn + ' — ' : '') + (a.capEn || a.cap || ''));
        var img = document.createElement('img');
        img.src = a.thumb || a.img;
        img.loading = 'lazy';
        img.decoding = 'async';
        img.width = 720; img.height = 508;
        btn.appendChild(img);
        btn.insertAdjacentHTML('beforeend', '<span class="zoom-hint">' + ICON_ZOOM + '</span>');
        var cap = document.createElement('figcaption');
        cap.innerHTML = '<strong data-t-ar="' + esc(a.title || '') + '" data-t-en="' + esc(a.titleEn || a.title || '') + '"></strong><span data-t-ar="' + esc(a.cap || '') + '" data-t-en="' + esc(a.capEn || a.cap || '') + '"></span>';
        fig.appendChild(btn);
        if (a.title || a.cap) fig.appendChild(cap);
        wrap.appendChild(fig);
      });
    });
  }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }

  /* نصوص بديلة وتعليقات تتبع اللغة الحالية */
  function refreshDynamicText() {
    var en = lang() === 'en';
    document.querySelectorAll('[data-lightbox]').forEach(function (b) {
      var img = b.querySelector('img');
      if (img) img.alt = b.getAttribute(en ? 'data-alt-en' : 'data-alt-ar') || '';
      b.setAttribute('aria-label', ui('تكبير الصورة: ', 'Enlarge image: ') + (b.getAttribute(en ? 'data-alt-en' : 'data-alt-ar') || ''));
    });
    document.querySelectorAll('[data-t-ar]').forEach(function (el) {
      el.textContent = el.getAttribute(en ? 'data-t-en' : 'data-t-ar') || '';
    });
    var lb = document.getElementById('lightbox');
    if (lb && lb.classList.contains('show') && lb._refresh) lb._refresh();
  }

  /* ===== الكاروسيل (آراء أولياء الأمور) ===== */
  function setupCarousels() {
    document.querySelectorAll('.js-carousel').forEach(function (c) {
      var track = c.querySelector('.car-track');
      var prev = c.querySelector('.car-prev');
      var next = c.querySelector('.car-next');
      if (!track || !prev || !next) return;
      function step(dir) {
        var item = track.querySelector('.tm');
        var w = item ? item.getBoundingClientRect().width + 22 : track.clientWidth * 0.8;
        var sign = isRtl() ? -1 : 1;
        track.scrollBy({ left: dir * sign * w, behavior: reduceMotion ? 'auto' : 'smooth' });
      }
      function state() {
        var max = track.scrollWidth - track.clientWidth - 2;
        var pos = Math.abs(track.scrollLeft);
        prev.disabled = pos <= 2;
        next.disabled = pos >= max;
      }
      prev.addEventListener('click', function () { step(-1); });
      next.addEventListener('click', function () { step(1); });
      track.addEventListener('scroll', function () { window.requestAnimationFrame(state); }, { passive: true });
      track.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { step(isRtl() ? -1 : 1); e.preventDefault(); }
        if (e.key === 'ArrowLeft') { step(isRtl() ? 1 : -1); e.preventDefault(); }
      });
      window.addEventListener('resize', state);
      document.addEventListener('asar:lang', function () { setTimeout(state, 50); });
      setTimeout(state, 100);
    });
  }

  /* ===== عارض الصور (Lightbox) ===== */
  function setupLightbox() {
    var lb = document.getElementById('lightbox');
    if (!lb) return null;
    var img = lb.querySelector('.lb-img');
    var cap = lb.querySelector('.lb-cap');
    var count = lb.querySelector('.lb-count');
    var btnClose = lb.querySelector('.lb-close');
    var btnPrev = lb.querySelector('.lb-prev');
    var btnNext = lb.querySelector('.lb-next');
    var group = [], idx = 0, opener = null, touchX = null;

    function show() {
      var b = group[idx], en = lang() === 'en';
      img.src = b.getAttribute('data-full');
      img.alt = b.getAttribute(en ? 'data-alt-en' : 'data-alt-ar') || '';
      var c = b.getAttribute(en ? 'data-cap-en' : 'data-cap-ar') || b.getAttribute(en ? 'data-alt-en' : 'data-alt-ar') || '';
      cap.textContent = c;
      count.textContent = group.length > 1 ? (idx + 1) + ' / ' + group.length : '';
      var single = group.length < 2;
      btnPrev.hidden = single; btnNext.hidden = single;
      /* تحميل مسبق للصورة التالية */
      if (!single) { var n = new Image(); n.src = group[(idx + 1) % group.length].getAttribute('data-full'); }
    }
    function open(btn) {
      var name = btn.getAttribute('data-lightbox');
      group = Array.prototype.slice.call(document.querySelectorAll('[data-lightbox="' + name + '"]'));
      idx = Math.max(0, group.indexOf(btn));
      opener = btn;
      show();
      lb.classList.add('show');
      lb.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      btnClose.focus();
    }
    function close() {
      lb.classList.remove('show');
      lb.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      img.removeAttribute('src');
      if (opener) opener.focus();
    }
    /* في RTL: «التالي» نحو اليسار؛ زر next يقع عند inline-end */
    function step(d) { idx = (idx + d + group.length) % group.length; show(); }
    lb._refresh = function () { if (group.length) show(); };

    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-lightbox]');
      if (b) { e.preventDefault(); open(b); }
    });
    btnClose.addEventListener('click', close);
    btnPrev.addEventListener('click', function () { step(-1); });
    btnNext.addEventListener('click', function () { step(1); });
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('lb-fig')) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('show')) return;
      if (e.key === 'Escape') { close(); return; }
      if (e.key === 'Tab') { trapTab(lb, e); return; }
      var fwd = isRtl() ? 'ArrowLeft' : 'ArrowRight', back = isRtl() ? 'ArrowRight' : 'ArrowLeft';
      if (e.key === fwd) { step(1); e.preventDefault(); }
      if (e.key === back) { step(-1); e.preventDefault(); }
    });
    lb.addEventListener('touchstart', function (e) { touchX = e.changedTouches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX; touchX = null;
      if (Math.abs(dx) < 50) return;
      /* السحب نحو اليسار يعني التالي في RTL */
      var forward = isRtl() ? dx > 0 : dx < 0;
      step(forward ? 1 : -1);
    }, { passive: true });
    return lb;
  }

  /* ===== نافذة بيانات المعلم (صفحة فريقنا) ===== */
  function setupTeamModal() {
    var modal = document.querySelector('.js-team-modal');
    if (!modal) return;
    var avatarEl = modal.querySelector('.js-team-modal-avatar');
    var nameEl = modal.querySelector('.js-team-modal-name');
    var roleEl = modal.querySelector('.js-team-modal-role');
    var closeBtn = modal.querySelector('.js-team-modal-close');
    var opener = null;

    function open(card) {
      opener = card;
      var av = card.querySelector('.avatar');
      avatarEl.style.backgroundImage = av ? av.style.backgroundImage : '';
      nameEl.textContent = (card.querySelector('.tcard-name') || {}).textContent || '';
      roleEl.textContent = (card.querySelector('.team-role') || {}).textContent || '';
      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    }
    function close() {
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (opener) opener.focus();
    }
    document.querySelectorAll('[data-team-member]').forEach(function (card) {
      card.addEventListener('click', function () { open(card); });
    });
    closeBtn.addEventListener('click', close);
    modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
    document.addEventListener('keydown', function (e) {
      if (!modal.classList.contains('show')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'Tab') trapTab(modal, e);
    });
    /* تحديث اسم المعلم داخل النافذة عند تبديل اللغة وهي مفتوحة */
    document.addEventListener('asar:lang', function () {
      if (modal.classList.contains('show') && opener) {
        nameEl.textContent = (opener.querySelector('.tcard-name') || {}).textContent || '';
        roleEl.textContent = (opener.querySelector('.team-role') || {}).textContent || '';
      }
    });
  }

  /* ===== رسالة زر واتساب العائم: تظهر بعد لحظات، تختفي تلقائيًا، وتُحفظ إن أُغلقت ===== */
  function setupWaLabel() {
    var wrap = document.querySelector('.js-wa-float');
    if (!wrap) return;
    var KEY = 'asar-wa-label-hide';
    var hidden = false;
    try { hidden = localStorage.getItem(KEY) === '1'; } catch (e) {}
    if (hidden) { wrap.classList.add('label-hidden'); return; }
    var t1 = setTimeout(function () { wrap.classList.add('show-label'); }, 4500);
    var t2 = setTimeout(function () { wrap.classList.remove('show-label'); }, 4500 + 12000);
    var btn = wrap.querySelector('.js-wa-dismiss');
    if (btn) btn.addEventListener('click', function () {
      clearTimeout(t1); clearTimeout(t2);
      wrap.classList.remove('show-label');
      wrap.classList.add('label-hidden');
      try { localStorage.setItem(KEY, '1'); } catch (e) {}
    });
  }

  /* ===== شريط تقدم قراءة المقال ===== */
  function setupProgress() {
    var bar = document.querySelector('.js-progress');
    var body = document.querySelector('.article-body');
    if (!bar || !body) return;
    var ticking = false;
    function upd() {
      var r = body.getBoundingClientRect();
      var total = r.height - window.innerHeight * 0.6;
      var p = total > 0 ? Math.min(1, Math.max(0, (-r.top + window.innerHeight * 0.2) / total)) : 1;
      bar.style.transform = 'scaleX(' + p.toFixed(3) + ')';
      ticking = false;
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
    window.addEventListener('resize', upd);
    upd();
  }
})();
