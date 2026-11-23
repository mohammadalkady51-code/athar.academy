/* ============================================================
   أكاديمية أثر — رسائل واتساب واستمارة الحصة التجريبية
   لا يوجد خادم: الاستمارة تكوّن رسالة وتفتح واتساب فقط، ولا تُحفظ أي بيانات.
   رقم الواتساب يُعرَّف مرة واحدة في js/data.js
   ============================================================ */
(function () {
  'use strict';

  var WA_NUMBER = (window.ASAR_DATA && window.ASAR_DATA.whatsapp) || '201041175976';

  var MESSAGES = {
    ar: {
      defaultMsg: 'السلام عليكم، أرغب في الاستفسار عن برامج أكاديمية أثر والحصة التجريبية المجانية.',
      program: function (name) { return 'السلام عليكم، أرغب في الاستفسار عن برنامج «' + name + '» في أكاديمية أثر والحصة التجريبية المجانية.'; },
      trial: function (student, name, age, program, phone) {
        var lines = [
          'السلام عليكم، أرغب في طلب حصة تجريبية مجانية في أكاديمية أثر.',
          '',
          'اسم الطالب: ' + student,
          'اسم ولي الأمر: ' + name,
          'عمر الطالب: ' + age,
          'البرنامج المطلوب: ' + program
        ];
        if (phone) lines.push('رقم التواصل: ' + phone);
        lines.push('', 'أرجو التواصل معي لمعرفة التفاصيل وتنسيق موعد مناسب.', '', 'شكرًا لكم.');
        return lines.join('\n');
      }
    },
    en: {
      defaultMsg: 'Assalamu alaikum, I would like to ask about Akademy Asar programs and the free trial lesson.',
      program: function (name) { return 'Assalamu alaikum, I would like to ask about the “' + name + '” program at Akademy Asar and the free trial lesson.'; },
      trial: function (student, name, age, program, phone) {
        var lines = [
          'Assalamu alaikum, I would like to request a free trial lesson at Akademy Asar.',
          '',
          "Student's name: " + student,
          "Parent's name: " + name,
          "Student's age: " + age,
          'Requested program: ' + program
        ];
        if (phone) lines.push('Contact number: ' + phone);
        lines.push('', 'Please contact me with the details to arrange a suitable time.', '', 'Thank you.');
        return lines.join('\n');
      }
    }
  };

  function lang() { return (window.ASAR_LANG && window.ASAR_LANG.current()) || document.documentElement.lang || 'ar'; }
  function waLink(text) { return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text); }
  function ctaMessage(el) {
    var l = lang() === 'en' ? 'en' : 'ar';
    var custom = el.getAttribute('data-wa-msg-' + l);
    if (custom) return custom;
    var prog = el.getAttribute('data-wa-prog-' + l);
    return prog ? MESSAGES[l].program(prog) : MESSAGES[l].defaultMsg;
  }
  function refreshCtas() {
    document.querySelectorAll('[data-wa-cta]').forEach(function (el) { el.setAttribute('href', waLink(ctaMessage(el))); });
  }

  /* ===== التحقق من الحقول ===== */
  function normalizeDigits(s) {
    /* يحوّل الأرقام العربية-الهندية والفارسية إلى لاتينية */
    return String(s).replace(/[٠-٩]/g, function (d) { return d.charCodeAt(0) - 0x0660; })
                    .replace(/[۰-۹]/g, function (d) { return d.charCodeAt(0) - 0x06F0; });
  }
  function setError(form, field, errId, message) {
    var err = form.querySelector('#' + errId);
    var invalid = message !== null;
    if (field) field.setAttribute('aria-invalid', invalid ? 'true' : 'false');
    if (err) {
      err.hidden = !invalid;
      var empty = err.querySelector('.err-empty'), range = err.querySelector('.err-range');
      if (empty && range) { empty.hidden = message !== 'empty'; range.hidden = message !== 'range'; }
    }
    return !invalid;
  }

  function validate(form) {
    var f = function (n) { return form.querySelector('[name="' + n + '"]'); };
    var student = f('student'), name = f('name'), age = f('age'), program = f('program'), phone = f('phone');
    var first = null, ok = true;
    function mark(valid, el) { if (!valid) { ok = false; if (!first) first = el; } }

    mark(setError(form, student, 'err-student', student.value.trim() ? null : 'empty'), student);
    mark(setError(form, name, 'err-name', name.value.trim() ? null : 'empty'), name);

    var ageVal = normalizeDigits(age.value.trim());
    var ageMsg = null;
    if (!ageVal) ageMsg = 'empty';
    else if (!/^\d{1,2}$/.test(ageVal) || +ageVal < 3 || +ageVal > 99) ageMsg = 'range';
    mark(setError(form, age, 'err-age', ageMsg), age);

    mark(setError(form, program, 'err-program', program.value ? null : 'empty'), program);

    var ph = phone.value.trim(), phMsg = null;
    if (ph) {
      var digits = normalizeDigits(ph).replace(/[\s\-().]/g, '');
      if (!/^\+?\d{7,15}$/.test(digits)) phMsg = 'bad';
    }
    mark(setError(form, phone, 'err-phone', phMsg), phone);

    var alertBox = form.querySelector('.form-alert');
    if (alertBox) alertBox.hidden = ok;
    if (!ok && first) first.focus();
    return ok;
  }

  document.addEventListener('DOMContentLoaded', function () {
    refreshCtas();
    document.addEventListener('asar:lang', refreshCtas);
    document.querySelectorAll('[data-wa-cta]').forEach(function (el) {
      el.addEventListener('click', function () { el.setAttribute('href', waLink(ctaMessage(el))); });
    });

    document.querySelectorAll('.js-trial-form').forEach(function (form) {
      /* تحديد البرنامج مسبقًا من رابط ?program= */
      var wanted = new URLSearchParams(window.location.search).get('program');
      var select = form.querySelector('select[name="program"]');
      if (wanted && select && select.querySelector('option[value="' + wanted + '"]')) select.value = wanted;

      /* إزالة الخطأ أثناء التصحيح */
      form.querySelectorAll('input, select').forEach(function (el) {
        var evt = el.tagName === 'SELECT' ? 'change' : 'input';
        el.addEventListener(evt, function () {
          if (el.getAttribute('aria-invalid') === 'true') {
            var errId = 'err-' + el.name;
            if (el.value.trim()) setError(form, el, errId, null);
          }
        });
      });

      var status = form.querySelector('.form-status');
      var fallback = form.querySelector('.js-wa-fallback');

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (status) status.hidden = true;
        if (!validate(form)) return;

        var g = function (n) { return form.querySelector('[name="' + n + '"]'); };
        var l = lang() === 'en' ? 'en' : 'ar';
        var programText = g('program').options[g('program').selectedIndex].textContent.trim();
        var msg = MESSAGES[l].trial(
          g('student').value.trim(),
          g('name').value.trim(),
          normalizeDigits(g('age').value.trim()),
          programText,
          g('phone').value.trim()
        );
        var url = waLink(msg);
        if (fallback) fallback.setAttribute('href', url);
        var win = window.open(url, '_blank', 'noopener');
        if (status) status.hidden = false;
        /* إن مُنعت النافذة المنبثقة يبقى رابط بديل ظاهرًا للمستخدم */
        if (win === null && fallback) fallback.focus();
      });
    });
  });
})();
