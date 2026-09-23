const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.12 }
);
reveals.forEach((el) => io.observe(el));

const bar = document.getElementById('progressBar') || document.querySelector('.reading-progress span') || document.querySelector('.reading-progress');
if (bar) {
  addEventListener(
    'scroll',
    () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      bar.style.width = `${h > 0 ? (scrollY / h) * 100 : 0}%`;
    },
    { passive: true }
  );
}

const button = document.querySelector('.menu-button');
const menu = document.getElementById('menu');
if (button && menu) {
  button.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    button.setAttribute('aria-expanded', open);
    button.querySelector('span').textContent = open ? '−' : '+';
  });
  menu.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      button.setAttribute('aria-expanded', 'false');
      button.querySelector('span').textContent = '+';
    })
  );
}

const downloadBtn = document.getElementById('downloadPdf');
if (downloadBtn) {
  downloadBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const link = document.createElement('a');
    link.href = '/aula-01-mentoria-trafego.pdf';
    link.download = 'aula-01-mentoria-trafego.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
  });
}

// Aulas Selector Modal Handler
const aulasModal = document.getElementById('aulasModal');
const openAulasBtns = document.querySelectorAll('[data-open-aulas]');
const closeAulasBtns = document.querySelectorAll('[data-close-aulas]');

function openAulas() {
  if (!aulasModal) return;
  aulasModal.removeAttribute('hidden');
  // force reflow for smooth animation
  void aulasModal.offsetWidth;
  aulasModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  openAulasBtns.forEach((btn) => btn.setAttribute('aria-expanded', 'true'));
  // If mobile menu was open, close it
  if (menu && menu.classList.contains('open')) {
    menu.classList.remove('open');
    if (button) {
      button.setAttribute('aria-expanded', 'false');
      const span = button.querySelector('span');
      if (span) span.textContent = '+';
    }
  }
}

function closeAulas() {
  if (!aulasModal) return;
  aulasModal.classList.remove('active');
  document.body.style.overflow = '';
  openAulasBtns.forEach((btn) => btn.setAttribute('aria-expanded', 'false'));
  setTimeout(() => {
    if (!aulasModal.classList.contains('active')) {
      aulasModal.setAttribute('hidden', '');
    }
  }, 250);
}

openAulasBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    openAulas();
  });
});

closeAulasBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    closeAulas();
  });
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && aulasModal && aulasModal.classList.contains('active')) {
    closeAulas();
  }
});
