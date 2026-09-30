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

// Study Mode Switcher (Estudo Objetivo vs Estudo Detalhado)
const viewObjetivo = document.getElementById('viewEstudoObjetivo');
const viewDetalhado = document.getElementById('viewEstudoDetalhado');
const studyModeBtns = document.querySelectorAll('[data-study-mode]');

function switchStudyMode(mode, shouldScroll = true) {
  if (!viewObjetivo || !viewDetalhado) return;

  if (mode === 'detalhado') {
    viewObjetivo.setAttribute('hidden', '');
    viewDetalhado.removeAttribute('hidden');
    // Ensure all reveals in detailed view are visible or observed
    viewDetalhado.querySelectorAll('.reveal').forEach((el) => {
      io.observe(el);
    });
    studyModeBtns.forEach((btn) => {
      if (btn.getAttribute('data-study-mode') === 'detalhado') {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });
    if (shouldScroll) {
      const target = document.getElementById('estudo-detalhado') || viewDetalhado;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } else {
    viewDetalhado.setAttribute('hidden', '');
    viewObjetivo.removeAttribute('hidden');
    viewObjetivo.querySelectorAll('.reveal').forEach((el) => {
      io.observe(el);
    });
    studyModeBtns.forEach((btn) => {
      if (btn.getAttribute('data-study-mode') === 'objetivo') {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });
    if (shouldScroll) {
      const target = document.getElementById('estudo-objetivo') || document.getElementById('inicio');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

studyModeBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const mode = btn.getAttribute('data-study-mode');
    switchStudyMode(mode, true);
  });
});

// Direct link via URL hash support
if (window.location.hash === '#estudo-detalhado') {
  switchStudyMode('detalhado', false);
}
