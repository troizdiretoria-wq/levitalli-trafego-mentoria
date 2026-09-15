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

const bar = document.getElementById('progressBar');
addEventListener(
  'scroll',
  () => {
    const h = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = `${h ? (scrollY / h) * 100 : 0}%`;
  },
  { passive: true }
);

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
