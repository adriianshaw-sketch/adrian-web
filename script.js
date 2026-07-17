/* ============================================================
   Adrian Web — interacciones (vanilla, sin dependencias)
   Movimiento que susurra: secuencia de entrada, reveals con foco,
   cursor artesanal sobre el trabajo, parallax dentro de los marcos.
   ============================================================ */
(function () {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* Hero: secuencia de entrada al cargar */
  const hero = document.querySelector('.hero');
  if (hero) requestAnimationFrame(() => hero.classList.add('is-ready'));

  /* Reveal al hacer scroll */
  const items = document.querySelectorAll('[data-reveal]');
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const sibs = Array.from(e.target.parentElement.querySelectorAll(':scope > [data-reveal]'));
        const i = sibs.indexOf(e.target);
        e.target.style.transitionDelay = (i > 0 ? Math.min(i, 5) * 85 : 0) + 'ms';
        e.target.classList.add('is-in');
        obs.unobserve(e.target);
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
    items.forEach((el) => io.observe(el));
  }

  /* Nav condensada */
  const nav = document.getElementById('nav');
  const onNav = () => nav.classList.toggle('is-scrolled', window.scrollY > 20);
  onNav();
  window.addEventListener('scroll', onNav, { passive: true });

  /* Menú móvil */
  const burger = document.getElementById('burger');
  const drawer = document.getElementById('drawer');
  if (burger) {
    const set = (open) => {
      nav.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      drawer.setAttribute('aria-hidden', String(!open));
    };
    burger.addEventListener('click', () => set(!nav.classList.contains('is-open')));
    drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => set(false)));
  }

  /* Scroll suave con offset de nav */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length < 2) return;
      const t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 74, behavior: reduce ? 'auto' : 'smooth' });
    });
  });

  /* ----- Cursor artesanal (solo puntero fino, sin reduced-motion) ----- */
  const cursor = document.getElementById('cursor');
  if (cursor && fine && !reduce) {
    document.body.classList.add('has-cursor');
    let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my, shown = false;
    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      if (!shown) { shown = true; cursor.classList.add('is-visible'); }
    }, { passive: true });
    const loop = () => {
      cx += (mx - cx) * 0.18; cy += (my - cy) * 0.18;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    };
    loop();
    document.querySelectorAll('.case__view').forEach((v) => {
      v.addEventListener('mouseenter', () => cursor.classList.add('is-hot'));
      v.addEventListener('mouseleave', () => cursor.classList.remove('is-hot'));
      v.addEventListener('click', () => {
        // Nada de abrir dominios de demo que no existen: el clic vende.
        const name = v.closest('.case')?.querySelector('.case__name')?.textContent?.trim() || 'estas';
        const msg = encodeURIComponent('Hola Adrian, quiero una web como la de ' + name + ' para mi negocio.');
        window.open('https://wa.me/34655334170?text=' + msg, '_blank', 'noopener');
      });
    });
    // hide native-cursor loss when leaving window
    document.addEventListener('mouseleave', () => cursor.classList.remove('is-visible'));
    document.addEventListener('mouseenter', () => cursor.classList.add('is-visible'));
  }

  /* ----- Opiniones: duplicar para bucle sin costuras ----- */
  const track = document.getElementById('revTrack');
  if (track && !reduce) {
    track.innerHTML += track.innerHTML;   // 6 → 12 tarjetas; la animación a -50% encaja
    track.setAttribute('aria-hidden', 'false');
  }

  /* ----- Parallax de la foto dentro del marco ----- */
  if (!reduce) {
    const bgs = document.querySelectorAll('.site--brasa .site__bg, .site--forja .site__bg');
    let ticking = false;
    const update = () => {
      const vh = innerHeight;
      bgs.forEach((bg) => {
        const r = bg.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const p = (r.top + r.height / 2 - vh / 2) / vh;      // -0.5..0.5
        bg.style.transform = `scale(1.12) translate3d(0, ${(-p * 26).toFixed(2)}px, 0)`;
      });
      ticking = false;
    };
    const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener('scroll', req, { passive: true });
    window.addEventListener('resize', req);
    update();
  }
})();

/* Cursor-spotlight en tarjetas de reseñas (librería #3) */
(function () {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const first = document.querySelector('.rev');
  if (!first || !first.parentElement) return;
  first.parentElement.addEventListener('pointermove', (e) => {
    const card = e.target.closest('.rev');
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, { passive: true });
})();

/* Neón de ventas: la gráfica se dibuja al entrar en vista (una sola vez) */
(function () {
  const g = document.querySelector('.growth');
  if (!g) return;
  if (!('IntersectionObserver' in window)) { g.classList.add('is-drawn'); return; }
  new IntersectionObserver((es, io) => es.forEach((e) => {
    if (e.isIntersecting) { g.classList.add('is-drawn'); io.disconnect(); }
  }), { threshold: 0.4 }).observe(g);
})();
