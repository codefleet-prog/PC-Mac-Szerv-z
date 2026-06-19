/* ═══════════════════════════════════════════════════════════════════
   PC-MAC SZERVÍZ — JAVASCRIPT
   Scroll reveal · Counter animations · Navbar · Particles · Forms
═══════════════════════════════════════════════════════════════════ */

'use strict';

// ── DOM READY ────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initCounters();
  initParticles();
  initProgressBars();
  initMobileMenu();
  initSmoothScroll();
  initFormSubmit();
  initNavActiveLinks();
  initCalculator();
});

// ── NAVBAR ────────────────────────────────────────────────────────────
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScroll = 0;
  let ticking = false;

  function updateNavbar() {
    const scroll = window.scrollY;
    if (scroll > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = scroll;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }, { passive: true });
}

// ── MOBILE MENU ───────────────────────────────────────────────────────
function initMobileMenu() {
  const hamburger = document.getElementById('nav-hamburger');
  const mobileNav = document.getElementById('nav-mobile');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    const spans = hamburger.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });
}

// ── SCROLL REVEAL (Intersection Observer) ────────────────────────────
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        if (entry.boundingClientRect.top > 0) {
          entry.target.classList.remove('visible');
        }
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

// ── COUNTER ANIMATIONS ────────────────────────────────────────────────
function initCounters() {
  const counters = document.querySelectorAll('.stat-num[data-target], .hstat-num[data-target]');
  if (!counters.length) return;

  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  const animateCounter = (el, target, duration = 2000) => {
    const start = performance.now();
    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.round(easeOut(progress) * target);
      el.textContent = current;
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    };
    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target, 10);
        animateCounter(entry.target, target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

// ── PROGRESS BARS (Upgrade Section) ──────────────────────────────────
function initProgressBars() {
  const bars = document.querySelectorAll('.bar-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      } else {
        if (entry.boundingClientRect.top > 0) {
          entry.target.classList.remove('animated');
        }
      }
    });
  }, { threshold: 0.5 });

  bars.forEach(bar => observer.observe(bar));
}

// ── HERO PARTICLES ────────────────────────────────────────────────────
function initParticles() {
  const container = document.getElementById('hero-particles');
  if (!container) return;

  const count = 28;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.style.cssText = `
      position: absolute;
      width: ${Math.random() * 2 + 1}px;
      height: ${Math.random() * 2 + 1}px;
      border-radius: 50%;
      background: rgba(${Math.random() > 0.5 ? '59,130,246' : '6,182,212'},${Math.random() * 0.5 + 0.2});
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: particleFloat ${Math.random() * 12 + 8}s ease-in-out infinite;
      animation-delay: ${Math.random() * -12}s;
    `;
    fragment.appendChild(p);
  }

  // Inject keyframes
  if (!document.getElementById('particle-style')) {
    const style = document.createElement('style');
    style.id = 'particle-style';
    style.textContent = `
      @keyframes particleFloat {
        0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
        25%       { transform: translate(${rand(-30, 30)}px, ${rand(-40, -10)}px) scale(1.2); opacity: 0.8; }
        50%       { transform: translate(${rand(-20, 20)}px, ${rand(-20, 20)}px) scale(0.8); opacity: 0.5; }
        75%       { transform: translate(${rand(-30, 30)}px, ${rand(10, 40)}px) scale(1.1); opacity: 0.7; }
      }
    `;
    document.head.appendChild(style);
  }

  container.appendChild(fragment);
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// ── SMOOTH SCROLL ─────────────────────────────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navH = document.getElementById('navbar')?.offsetHeight || 80;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// ── ACTIVE NAV LINKS (Scroll Spy) ────────────────────────────────────
function initNavActiveLinks() {
  const sections = ['services', 'why', 'process', 'calculator', 'contact'].map(id => document.getElementById(id));
  const links = document.querySelectorAll('.nav-link');

  function updateActive() {
    const scroll = window.scrollY + 120;
    let activeId = null;
    sections.forEach(sec => {
      if (!sec) return;
      if (sec.offsetTop <= scroll) activeId = sec.id;
    });
    links.forEach(link => {
      link.style.color = '';
      const href = link.getAttribute('href').replace('#', '');
      if (href === activeId) {
        link.style.color = 'var(--blue-bright)';
      }
    });
  }

  window.addEventListener('scroll', updateActive, { passive: true });
}

// ── FORM SUBMIT ───────────────────────────────────────────────────────
function initFormSubmit() {
  const form = document.getElementById('contact-form');
  const btn = document.getElementById('form-submit-btn');
  if (!form || !btn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name')?.value.trim();
    const message = document.getElementById('message')?.value.trim();

    if (!name) {
      showFormError('name', 'Kérjük adja meg a nevét.');
      return;
    }

    // Animate button
    const originalHTML = btn.innerHTML;
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation:spin 0.8s linear infinite">
        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
      </svg>
      Küldés...
    `;
    btn.disabled = true;
    btn.style.opacity = '0.8';

    setTimeout(() => {
      btn.innerHTML = `✓ Üzenet elküldve!`;
      btn.style.background = 'linear-gradient(135deg, #15803d, #22c55e)';
      btn.style.boxShadow = '0 4px 20px rgba(34,197,94,0.4)';

      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.disabled = false;
        btn.style.opacity = '';
        btn.style.background = '';
        btn.style.boxShadow = '';
        form.reset();
      }, 3000);
    }, 1800);
  });

  // Open FB messenger as fallback
  const fbNote = form.querySelector('.form-note');
  if (fbNote) {
    fbNote.innerHTML = '* Az üzenetek a <a href="https://www.facebook.com/profile.php?id=61584975975354" target="_blank" style="color:var(--blue-bright)">Facebook oldalon</a> keresztül is elérhetők. Hamarosan felvesszük Önnel a kapcsolatot.';
  }
}

function showFormError(fieldId, message) {
  const field = document.getElementById(fieldId);
  if (!field) return;
  field.style.borderColor = '#ef4444';
  field.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.15)';
  const existing = field.parentNode.querySelector('.field-error');
  if (existing) existing.remove();
  const err = document.createElement('span');
  err.className = 'field-error';
  err.style.cssText = 'font-size:0.78rem;color:#f87171;margin-top:4px;';
  err.textContent = message;
  field.parentNode.appendChild(err);
  field.addEventListener('input', () => {
    field.style.borderColor = '';
    field.style.boxShadow = '';
    err.remove();
  }, { once: true });
}

// ── CALCULATOR ────────────────────────────────────────────────────────
function initCalculator() {
  const deviceSelect = document.getElementById('calc-device');
  const problemSelect = document.getElementById('calc-problem');
  const priceDisplay = document.getElementById('calc-price');
  const contactBtn = document.getElementById('calc-to-contact');
  
  if (!deviceSelect || !problemSelect) return;

  const data = {
    macbook: {
      kijelzo: { label: 'Kijelző csere', price: '120 000 Ft - 250 000 Ft' },
      akku: { label: 'Akkumulátor csere', price: '45 000 Ft - 75 000 Ft' },
      viz: { label: 'Vízkár tisztítás', price: '30 000 Ft - 80 000 Ft' },
      tisztitas: { label: 'Belső tisztítás + pasztázás', price: '15 000 Ft' },
      egyeb: { label: 'Egyéb probléma', price: 'Egyedi ajánlat' }
    },
    imac: {
      ssd: { label: 'SSD bővítés / csere', price: '35 000 Ft - 85 000 Ft' },
      tapegyseg: { label: 'Tápegység javítás', price: '40 000 Ft - 90 000 Ft' },
      tisztitas: { label: 'Belső tisztítás', price: '20 000 Ft' },
      egyeb: { label: 'Egyéb probléma', price: 'Egyedi ajánlat' }
    },
    laptop: {
      kijelzo: { label: 'Kijelző csere', price: '35 000 Ft - 75 000 Ft' },
      akku: { label: 'Akkumulátor csere', price: '20 000 Ft - 40 000 Ft' },
      ssd: { label: 'HDD -> SSD csere', price: '25 000 Ft - 55 000 Ft' },
      tisztitas: { label: 'Belső tisztítás + pasztázás', price: '12 000 Ft - 18 000 Ft' },
      windows: { label: 'Windows telepítés', price: '10 000 Ft - 15 000 Ft' },
      egyeb: { label: 'Egyéb probléma', price: 'Egyedi ajánlat' }
    },
    pc: {
      ssd: { label: 'SSD bővítés', price: '20 000 Ft - 50 000 Ft' },
      tap: { label: 'Tápegység csere', price: '15 000 Ft - 45 000 Ft' },
      virus: { label: 'Vírusirtás', price: '10 000 Ft - 20 000 Ft' },
      tisztitas: { label: 'Belső tisztítás', price: '10 000 Ft' },
      windows: { label: 'Windows telepítés', price: '10 000 Ft - 15 000 Ft' },
      egyeb: { label: 'Egyéb probléma', price: 'Egyedi ajánlat' }
    },
    phone: {
      kijelzo: { label: 'Kijelző csere', price: '30 000 Ft - 120 000 Ft' },
      akku: { label: 'Akkumulátor csere', price: '15 000 Ft - 35 000 Ft' },
      tolto: { label: 'Töltőcsatlakozó csere', price: '15 000 Ft - 30 000 Ft' },
      egyeb: { label: 'Egyéb probléma', price: 'Egyedi ajánlat' }
    }
  };

  deviceSelect.addEventListener('change', () => {
    const dev = deviceSelect.value;
    problemSelect.innerHTML = '<option value="">Válasszon problémát...</option>';
    
    if (dev && data[dev]) {
      problemSelect.disabled = false;
      Object.keys(data[dev]).forEach(key => {
        const opt = document.createElement('option');
        opt.value = key;
        opt.textContent = data[dev][key].label;
        problemSelect.appendChild(opt);
      });
    } else {
      problemSelect.disabled = true;
    }
    
    updatePrice();
  });

  problemSelect.addEventListener('change', updatePrice);

  function updatePrice() {
    const dev = deviceSelect.value;
    const prob = problemSelect.value;
    
    if (dev && prob && data[dev] && data[dev][prob]) {
      priceDisplay.textContent = data[dev][prob].price;
      contactBtn.disabled = false;
    } else {
      priceDisplay.textContent = '---';
      contactBtn.disabled = true;
    }
  }

  contactBtn.addEventListener('click', () => {
    const devText = deviceSelect.options[deviceSelect.selectedIndex].text;
    const probText = problemSelect.options[problemSelect.selectedIndex].text;
    
    const contactDev = document.getElementById('device');
    const contactMsg = document.getElementById('message');
    
    if (contactDev) {
      let found = false;
      for (let i = 0; i < contactDev.options.length; i++) {
        if (contactDev.options[i].text.includes(devText) || devText.includes(contactDev.options[i].text)) {
          contactDev.selectedIndex = i;
          found = true;
          break;
        }
      }
      if (!found) contactDev.selectedIndex = 0;
    }
    
    if (contactMsg) {
      contactMsg.value = `Érdeklődni szeretnék javításról.\nEszköz: ${devText}\nProbléma: ${probText}\n`;
    }
    
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  });
}

// ── SPIN KEYFRAME for button ─────────────────────────────────────────
(function injectSpin() {
  const s = document.createElement('style');
  s.textContent = '@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }';
  document.head.appendChild(s);
})();

// ── PARALLAX HERO ORBS ────────────────────────────────────────────────────────
(function initParallax() {
  const orb1 = document.querySelector('.hero-orb-1');
  const orb2 = document.querySelector('.hero-orb-2');
  if (!orb1 || !orb2) return;

  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    orb1.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
    orb2.style.transform = `translate(${-x * 0.3}px, ${-y * 0.3}px)`;
  }, { passive: true });
})();

// ── DEVICE CARDS — mouse tilt ─────────────────────────────────────────
(function initCardTilt() {
  const cards = document.querySelectorAll('.device-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

// ── BENTO CARDS — subtle shimmer on hover ────────────────────────────
(function initBentoShimmer() {
  const cards = document.querySelectorAll('.bento-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', `${x}%`);
      card.style.setProperty('--my', `${y}%`);
      card.style.backgroundImage = `radial-gradient(circle at var(--mx) var(--my), rgba(59,130,246,0.06) 0%, transparent 50%), none`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.backgroundImage = '';
    });
  });
})();
