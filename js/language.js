/* ============================================================
   أكاديمية أثر — تبديل اللغة (عربي افتراضي / English)
   - المحتوى العربي هو الأصل في ملفات HTML، والإنجليزية في js/lang-en.js
   - قاموس الإنجليزية يُحمَّل عند الحاجة فقط (لا يُحمَّل في الصفحة العربية)
   - الاختيار يُحفظ في localStorage، ويمكن فرضه بـ ?lang=en أو ?lang=ar
   - يعمل على العناصر المضافة ديناميكيًا أيضًا (أعد استدعاء ASAR_LANG.refresh())
   ============================================================ */
(function () {
  'use strict';
  var STORAGE = 'asar-lang';

  function current() {
    try {
      var q = new URLSearchParams(window.location.search).get('lang');
      if (q === 'en' || q === 'ar') return q;
      return localStorage.getItem(STORAGE) === 'en' ? 'en' : 'ar';
    } catch (e) { return 'ar'; }
  }

  /* نخزّن الأصل العربي على العنصر نفسه عند أول ترجمة (آمن للعناصر المضافة لاحقًا) */
  function arOf(el, kind, attr) {
    var store = el.__ar || (el.__ar = {});
    var k = kind + (attr || '');
    if (!(k in store)) store[k] = kind === 'attr' ? el.getAttribute(attr) : el.textContent;
    return store[k];
  }

  var dictPromise = null;
  function loadDict() {
    if (window.ASAR_EN) return Promise.resolve(window.ASAR_EN);
    if (dictPromise) return dictPromise;
    dictPromise = new Promise(function (resolve) {
      var existing = document.getElementById('asar-en-dict');
      var s = existing || document.createElement('script');
      function done() { resolve(window.ASAR_EN || {}); }
      s.addEventListener('load', done);
      s.addEventListener('error', function () { dictPromise = null; resolve({}); });
      if (!existing) {
        var base = document.querySelector('script[src$="js/language.js"]');
        s.src = base ? base.getAttribute('src').replace('language.js', 'lang-en.js') : 'js/lang-en.js';
        s.id = 'asar-en-dict';
        document.head.appendChild(s);
      } else if (window.ASAR_EN) { done(); }
    });
    return dictPromise;
  }

  function translate(root, lang, dict) {
    (root || document).querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      var base = arOf(el, 'text');
      if (lang === 'en') { if (typeof dict[k] === 'string') el.textContent = dict[k]; }
      else el.textContent = base;
    });
    (root || document).querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      var parts = el.getAttribute('data-i18n-attr').split(':');
      var attr = parts[0], k = parts.slice(1).join(':');
      var base = arOf(el, 'attr', attr);
      if (lang === 'en') { if (typeof dict[k] === 'string') el.setAttribute(attr, dict[k]); }
      else if (base !== null) el.setAttribute(attr, base);
    });
  }

  function chrome(lang) {
    var d = document.documentElement;
    d.lang = lang;
    d.dir = (lang === 'ar') ? 'rtl' : 'ltr';
    document.querySelectorAll('.js-lang-toggle').forEach(function (btn) {
      var label = btn.querySelector('.js-lang-label');
      (label || btn).textContent = (lang === 'ar') ? 'EN' : 'عربي';
      btn.setAttribute('aria-label', lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
      btn.setAttribute('lang', lang === 'ar' ? 'en' : 'ar');
    });
    var og = document.querySelector('meta[property="og:locale"]');
    if (og) og.setAttribute('content', lang === 'ar' ? 'ar_AR' : 'en_US');
  }

  function apply(lang, persist) {
    chrome(lang);
    var run = function (dict) {
      translate(document, lang, dict);
      /* العناوين og تتبع اللغة */
      var t = document.querySelector('title'), ot = document.querySelector('meta[property="og:title"]');
      if (t && ot) ot.setAttribute('content', t.textContent);
      var m = document.querySelector('meta[name="description"]'), od = document.querySelector('meta[property="og:description"]');
      if (m && od) od.setAttribute('content', m.getAttribute('content'));
      document.dispatchEvent(new CustomEvent('asar:lang', { detail: { lang: lang } }));
    };
    if (persist !== false) { try { localStorage.setItem(STORAGE, lang); } catch (e) {} }
    if (lang === 'en') loadDict().then(run); else run({});
  }

  function refresh() { var l = current(); if (l === 'en') loadDict().then(function (d) { translate(document, 'en', d); }); }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.js-lang-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        /* نُلغي معامل ?lang من الرابط حتى لا يتجاوز الاختيار الجديد */
        try {
          var u = new URL(window.location.href);
          if (u.searchParams.has('lang')) { u.searchParams.delete('lang'); history.replaceState(null, '', u.pathname + u.search + u.hash); }
        } catch (e) {}
        apply(document.documentElement.lang === 'ar' ? 'en' : 'ar');
      });
    });
    apply(current());
  });

  window.ASAR_LANG = {
    apply: apply,
    refresh: refresh,
    current: function () { return document.documentElement.lang === 'en' ? 'en' : 'ar'; }
  };
})();
