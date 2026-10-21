  document.documentElement.classList.add('js');
  document.querySelectorAll('.card[data-open]').forEach(function (c) {
    c.addEventListener('click', function (e) {
      e.preventDefault();
      var ids = c.getAttribute('data-open').split(',');
      document.querySelectorAll('.pl').forEach(function (d) { d.open = false; });
      ids.forEach(function (n) { var d = document.getElementById('pl-' + n); if (d) d.open = true; });
      var first = document.getElementById('pl-' + ids[0]);
      (first || document.getElementById('ceny')).scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      if (first) first.querySelector('summary').focus({ preventScroll: true });
    });
  });
  (function () {
    var tabs = [].slice.call(document.querySelectorAll('.fl__tabs [role=tab]'));
    function pick(t) {
      tabs.forEach(function (b) {
        var on = b === t;
        b.setAttribute('aria-selected', on);
        b.tabIndex = on ? 0 : -1;
        document.getElementById(b.getAttribute('aria-controls')).hidden = !on;
      });
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { pick(t); });
      t.addEventListener('keydown', function (e) {
        var k = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (!k) return;
        var n = tabs[(i + k + tabs.length) % tabs.length];
        pick(n); n.focus(); e.preventDefault();
      });
    });
  })();
  (function () {
    var els = document.querySelectorAll('.rv');
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('on'); }); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } });
    }, { threshold: 0, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (e) { io.observe(e); });
  })();
