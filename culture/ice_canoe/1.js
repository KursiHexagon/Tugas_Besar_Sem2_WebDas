'use strict';
 
/* ── 1. HERO IMAGE subtle zoom on load ──────────────────────── */
(function initHeroImage() {
  const img = document.querySelector('.hero img');
  if (!img) return;
 
  function onLoaded() {
    img.classList.add('loaded');
  }
 
  if (img.complete && img.naturalWidth) {
    onLoaded();
  } else {
    img.addEventListener('load', onLoaded);
  }
})();
 
 
/* ── 2. SCROLL-TRIGGERED REVEAL (IntersectionObserver) ──────── */
(function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.intro-card, .fact-card, .tl-item, .info-card'
  );
 
  if (!('IntersectionObserver' in window)) {
    // Fallback: just show everything immediately
    targets.forEach(el => el.classList.add('visible'));
    return;
  }
 
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
 
        const el    = entry.target;
        const delay = parseInt(el.dataset.delay || '0', 10);
 
        setTimeout(() => el.classList.add('visible'), delay);
        observer.unobserve(el);
      });
    },
    { threshold: 0.15 }
  );
 
  targets.forEach(el => observer.observe(el));
})();
 
 
/* ── 3. FACT CARD — pulse icon on hover ─────────────────────── */
(function initFactCardHover() {
  const cards = document.querySelectorAll('.fact-card');
 
  cards.forEach(card => {
    const icon = card.querySelector('i');
    if (!icon) return;
 
    card.addEventListener('mouseenter', () => {
      icon.style.transition = 'transform 0.25s ease';
      icon.style.transform  = 'scale(1.3) rotate(-8deg)';
    });
 
    card.addEventListener('mouseleave', () => {
      icon.style.transform = 'scale(1) rotate(0deg)';
    });
  });
})();
 
 
/* ── 4. NAVIGATION BUTTONS — tooltip hints ──────────────────── */
(function initNavTooltips() {
  const tooltip  = document.getElementById('tooltip');
  const btnBack  = document.getElementById('btn-back');
  const btnHome  = document.getElementById('btn-home');
 
  if (!tooltip) return;
 
  let hideTimer;
 
  function showTip(text) {
    clearTimeout(hideTimer);
    tooltip.textContent = text;
    tooltip.classList.add('show');
  }
 
  function hideTip() {
    hideTimer = setTimeout(() => tooltip.classList.remove('show'), 120);
  }
 
  if (btnBack) {
    btnBack.addEventListener('mouseenter', () => showTip('← Kembali ke slide sebelumnya'));
    btnBack.addEventListener('mouseleave', hideTip);
    btnBack.addEventListener('focus',      () => showTip('← Kembali ke slide sebelumnya'));
    btnBack.addEventListener('blur',       hideTip);
  }
 
  if (btnHome) {
    btnHome.addEventListener('mouseenter', () => showTip('🏠 Kembali ke halaman utama'));
    btnHome.addEventListener('mouseleave', hideTip);
    btnHome.addEventListener('focus',      () => showTip('🏠 Kembali ke halaman utama'));
    btnHome.addEventListener('blur',       hideTip);
  }
})();
 
 
/* ── 5. KEYBOARD NAVIGATION (Arrow keys) ────────────────────── */
(function initKeyboardNav() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      document.getElementById('btn-back')?.click();
    }
    if (e.key === 'ArrowRight' || e.key === 'Home') {
      document.getElementById('btn-home')?.click();
    }
  });
})();
 
 
/* ── 6. SMOOTH SCROLL to top on page load ───────────────────── */
(function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
})();
 
 
/* ── 7. SLIDE DOT — active pulse animation ──────────────────── */
(function initDotPulse() {
  const activeDot = document.querySelector('.dot.active');
  if (!activeDot) return;
 
  // Re-trigger scale pulse every 3s as a subtle "you are here" reminder
  setInterval(() => {
    activeDot.style.transition = 'transform 0.15s ease';
    activeDot.style.transform  = 'scaleX(1.15)';
    setTimeout(() => {
      activeDot.style.transform = 'scaleX(1)';
    }, 160);
  }, 3000);
})();
 
 
/* ── 8. PAGE TRANSITION — fade-out before navigate ──────────── */
(function initPageTransition() {
  const links = document.querySelectorAll('a.btn');
 
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('javascript')) return;
 
      e.preventDefault();
 
      // Fade out the page
      document.body.style.transition = 'opacity 0.3s ease';
      document.body.style.opacity    = '0';
 
      setTimeout(() => {
        window.location.href = href;
      }, 300);
    });
  });
 
  // Fade in on arrival
  document.body.style.opacity    = '0';
  document.body.style.transition = 'opacity 0.35s ease';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });
})();
 