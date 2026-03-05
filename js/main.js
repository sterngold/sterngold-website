// sterngold.nl v3 — main.js
// Ghost nav, theme toggle, mobile menu, scroll reveal

document.addEventListener('DOMContentLoaded', () => {

  // ── Navigation (always visible) ──────────────────────────

  // ── Theme Toggle (dark/light) ─────────────────
  function setTheme(mode) {
    const html = document.documentElement;
    if (mode === 'light') {
      html.classList.add('light');
    } else {
      html.classList.remove('light');
    }
    localStorage.setItem('theme', mode);
    updateThemeIcons(mode);
  }

  function updateThemeIcons(mode) {
    document.querySelectorAll('#iconSun').forEach(el => {
      el.style.display = mode === 'light' ? 'none' : 'block';
    });
    document.querySelectorAll('#iconMoon').forEach(el => {
      el.style.display = mode === 'light' ? 'block' : 'none';
    });
  }

  function toggleTheme() {
    const current = document.documentElement.classList.contains('light') ? 'light' : 'dark';
    setTheme(current === 'light' ? 'dark' : 'light');
  }

  // Init theme from localStorage or system preference
  const saved = localStorage.getItem('theme');
  if (saved) {
    setTheme(saved);
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    setTheme('light');
  } else {
    setTheme('dark');
  }

  // Bind toggle buttons
  document.querySelectorAll('#themeToggle, #themeToggleMobile').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });

  // ── Mobile Menu ───────────────────────────────
  const menuToggle = document.getElementById('menuToggle');
  const menuClose = document.getElementById('menuClose');
  const mobileMenu = document.getElementById('mobileMenu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => mobileMenu.classList.add('open'));
    if (menuClose) {
      menuClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
    }
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  // ── Scroll Reveal ─────────────────────────────
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observer.observe(el));
  }

});
