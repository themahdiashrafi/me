/* ──────────────────────────────────────────────────────
   Mahdi Ashrafi — Personal Website
   main.js
────────────────────────────────────────────────────── */

/* ── Mobile nav ─────────────────────────────── */
function toggleMenu() {
  const menu = document.getElementById('mmenu');
  const burger = document.getElementById('burger');
  menu.classList.toggle('open');
  // Animate burger → X
  const spans = burger.querySelectorAll('span');
  if (menu.classList.contains('open')) {
    spans[0].style.transform = 'translateY(5.5px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-5.5px) rotate(-45deg)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
}
function closeMenu() {
  const menu = document.getElementById('mmenu');
  const burger = document.getElementById('burger');
  menu.classList.remove('open');
  burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
}
// Close on outside click
document.addEventListener('click', e => {
  const menu = document.getElementById('mmenu');
  const burger = document.getElementById('burger');
  if (menu.classList.contains('open') && !menu.contains(e.target) && !burger.contains(e.target)) {
    closeMenu();
  }
});

/* ── Nav scroll shadow ───────────────────────── */
window.addEventListener('scroll', () => {
  document.getElementById('mnav').classList.toggle('scrolled', window.scrollY > 8);
}, { passive: true });

/* ── Dot matrix canvas ───────────────────────── */
function drawDots(id, opts) {
  const canvas = document.getElementById(id);
  if (!canvas) return;
  const parent = canvas.parentElement;
  const W = parent.offsetWidth;
  const H = parent.offsetHeight;
  canvas.width  = W;
  canvas.height = H;
  const ctx    = canvas.getContext('2d');
  const sp     = opts.sp   || 22;
  const r      = opts.r    || 1.1;
  const dark   = opts.dark || false;

  ctx.clearRect(0, 0, W, H);

  for (let x = sp; x < W; x += sp) {
    for (let y = sp; y < H; y += sp) {
      // Fade: emerge right-ward, fade near bottom edge
      const fRight = Math.min(1, x / (W * 0.35));
      const fTop   = Math.min(1, y / (H * 0.3));
      const fBot   = Math.max(0, 1 - (y / H - 0.65) * 3);
      const alpha  = (dark ? 0.22 : 0.08) * fRight * Math.min(fTop, fBot);
      if (alpha < 0.005) continue;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = dark
        ? `rgba(255,255,255,${alpha})`
        : `rgba(0,0,0,${alpha})`;
      ctx.fill();
    }
  }
}

function initDots() {
  drawDots('dc-hero',  { sp: 22, r: 1.1 });
  drawDots('dc-about', { sp: 20, r: 1.0 });
  drawDots('dc-build', { sp: 22, r: 1.15, dark: true });
}

window.addEventListener('load',   initDots);
window.addEventListener('resize', initDots, { passive: true });

/* ── Avatar parallax tilt (desktop only) ─────── */
const hero  = document.querySelector('.hero');
const acard = document.getElementById('acard');

if (hero && acard && window.matchMedia('(hover: hover)').matches) {
  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const cx = (e.clientX - rect.left)  / rect.width  - 0.5;
    const cy = (e.clientY - rect.top)   / rect.height - 0.5;
    acard.style.transform = `translateY(${cy * -8}px) rotateY(${cx * 5}deg) rotateX(${cy * -2}deg)`;
  });
  hero.addEventListener('mouseleave', () => {
    acard.style.transform = '';
  });
}

/* ── Scroll-in fade for list items ───────────── */
const fadeTargets = document.querySelectorAll('.exp-item, .fact, .pillar, .stack-row, .clink');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target); // fire once
    }
  });
}, { threshold: 0.1 });

fadeTargets.forEach((el, i) => {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(14px)';
  el.style.transition = `opacity 0.45s ease ${i * 0.04}s, transform 0.45s ease ${i * 0.04}s`;
  observer.observe(el);
});
