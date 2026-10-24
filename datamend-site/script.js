// ── Nav scroll shadow ────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 12);
}, { passive: true });

// ── Mobile menu ──────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ── Copy install command ─────────────────────────────────────────
const copyBtn = document.getElementById('copyBtn');
const installCmd = document.getElementById('installCmd');
if (copyBtn && installCmd) {
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(installCmd.textContent.trim()).then(() => {
      copyBtn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
      setTimeout(() => {
        copyBtn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>`;
      }, 2000);
    }).catch(() => {});
  });
}

// ── Tab switching ────────────────────────────────────────────────
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const section = tab.closest('.code-example');
    section.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    section.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    const target = section.querySelector('#tab-' + tab.dataset.tab);
    if (target) target.classList.add('active');
  });
});

// ── Intersection Observer for reveal animations ──────────────────
const revealEls = document.querySelectorAll(
  '.pillar-card, .pipeline-step, .integration-card, .vs-card, ' +
  '.benchmark-table-wrap, .mendscore-inner, .doc-block, ' +
  '.stack-bar, .matrix-wrap, .feature-matrix h3'
);
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 70);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => {
  el.classList.add('reveal');
  revealObs.observe(el);
});

// ── MendScore ring animation ─────────────────────────────────────
const ringFill = document.getElementById('ringFill');
const scoreValue = document.getElementById('scoreValue');
const targetScore = 96.8;
const circumference = 2 * Math.PI * 80;

const scoreObs = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    animateScore();
    scoreObs.disconnect();
  }
}, { threshold: 0.3 });
const scoreSection = document.querySelector('.mendscore-section');
if (scoreSection) scoreObs.observe(scoreSection);

function animateScore() {
  const duration = 1800;
  const start = performance.now();
  function tick(now) {
    const elapsed = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - elapsed, 3);
    const current = targetScore * eased;
    const offset = circumference * (1 - current / 100);
    if (ringFill) {
      ringFill.style.strokeDasharray = circumference;
      ringFill.style.strokeDashoffset = offset;
    }
    if (scoreValue) scoreValue.textContent = current.toFixed(1);
    if (elapsed < 1) requestAnimationFrame(tick);
    else if (scoreValue) scoreValue.textContent = targetScore.toFixed(1);
  }
  requestAnimationFrame(tick);
}

// ── Smooth anchor scroll ─────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id = anchor.getAttribute('href').slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Pillar card dynamic glow ──────────────────────────────────────
document.querySelectorAll('.pillar-card').forEach(card => {
  const iconWrap = card.querySelector('.pillar-icon-wrap');
  const accent = iconWrap?.style.getPropertyValue('--accent') || '#3b82f6';
  card.addEventListener('mouseenter', () => {
    card.style.boxShadow = `0 20px 60px ${accent}28, 0 8px 20px ${accent}18`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.boxShadow = '';
  });
});

// ── Doc block subtle hover ────────────────────────────────────────
document.querySelectorAll('.doc-block').forEach(block => {
  const header = block.querySelector('.doc-block-header');
  const accentRaw = header?.style.getPropertyValue('--accent') || '#3b82f6';
  block.addEventListener('mouseenter', () => {
    block.style.boxShadow = `0 12px 40px ${accentRaw}18, 0 4px 12px ${accentRaw}10`;
  });
  block.addEventListener('mouseleave', () => {
    block.style.boxShadow = '';
  });
});
