/* ============================================================
   SITOTAW ABIE ENDALEW — PORTFOLIO JAVASCRIPT
   File: script.js
   Contents:
     1. Floating Circuit Dots
     2. Smooth Scroll (nav links)
     3. Mobile Nav Toggle
     4. Active Nav Link Highlight on Scroll
     5. Skill Bar Animation on Scroll (IntersectionObserver)
     6. Project Card Click Ripple Effect
============================================================ */


/* ── 1. FLOATING CIRCUIT DOTS ── */
(function createDots() {
  const container = document.getElementById('dots');
  if (!container) return;

  const colors = ['#00d4ff', '#7c3aed', '#10b981'];
  const count = 30;

  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';

    const size = 2 + Math.random() * 4;
    dot.style.width  = size + 'px';
    dot.style.height = size + 'px';
    dot.style.left   = Math.random() * 100 + '%';
    dot.style.background       = colors[Math.floor(Math.random() * colors.length)];
    dot.style.animationDuration = (6 + Math.random() * 10) + 's';
    dot.style.animationDelay   = (Math.random() * 12) + 's';

    container.appendChild(dot);
  }
})();


/* ── 2. SMOOTH SCROLL (nav links) ── */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const targetId = anchor.getAttribute('href');
    const target   = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    /* close mobile menu if open */
    document.querySelector('.nav-links').classList.remove('nav-open');
  });
});


/* ── 3. MOBILE NAV TOGGLE ── */
(function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const links  = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  /* inject mobile nav styles dynamically */
  const style = document.createElement('style');
  style.textContent = `
    .nav-links.nav-open {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 100%;
      left: 0; right: 0;
      background: rgba(5, 10, 20, 0.97);
      padding: 1.5rem 2rem;
      gap: 1.25rem;
      border-bottom: 1px solid rgba(0, 212, 255, 0.15);
    }
  `;
  document.head.appendChild(style);

  toggle.addEventListener('click', function () {
    links.classList.toggle('nav-open');
  });
})();


/* ── 4. ACTIVE NAV LINK HIGHLIGHT ON SCROLL ── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id], .hero[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function onScroll() {
    let currentId = '';
    const scrollY = window.scrollY + 120; /* offset for fixed nav */

    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollY) {
        currentId = sec.id;
      }
    });

    navLinks.forEach(function (link) {
      link.style.color = '';
      if (link.getAttribute('href') === '#' + currentId) {
        link.style.color = 'var(--accent)';
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); /* run once on load */
})();


/* ── 5. SKILL BAR ANIMATION ON SCROLL ── */
(function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar');
  if (!bars.length) return;

  /* store target widths then reset to 0 so animation triggers on enter */
  bars.forEach(function (bar) {
    bar.dataset.target = bar.style.width;
    bar.style.width = '0%';
    bar.style.transition = 'width 1.2s ease';
  });

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = bar.dataset.target;
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(function (bar) {
    observer.observe(bar);
  });
})();


/* ── 6. PROJECT CARD CLICK RIPPLE EFFECT ── */
(function initRipple() {
  document.querySelectorAll('.project-card').forEach(function (card) {
    card.addEventListener('click', function (e) {
      /* remove any existing ripple */
      const old = card.querySelector('.ripple');
      if (old) old.remove();

      const ripple = document.createElement('span');
      const rect   = card.getBoundingClientRect();
      const size   = Math.max(rect.width, rect.height);

      ripple.className = 'ripple';
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${e.clientX - rect.left - size / 2}px;
        top:  ${e.clientY - rect.top  - size / 2}px;
        background: rgba(0, 212, 255, 0.12);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleAnim 0.6s linear;
        pointer-events: none;
      `;

      /* inject ripple animation once */
      if (!document.getElementById('rippleStyle')) {
        const s = document.createElement('style');
        s.id = 'rippleStyle';
        s.textContent = `
          @keyframes rippleAnim {
            to { transform: scale(2.5); opacity: 0; }
          }
        `;
        document.head.appendChild(s);
      }

      card.style.position = 'relative';
      card.style.overflow = 'hidden';
      card.appendChild(ripple);

      ripple.addEventListener('animationend', function () {
        ripple.remove();
      });
    });
  });
})();
