const intro = document.querySelector('[data-intro]');
const header = document.querySelector('[data-header]');
const typingLine = document.querySelector('[data-typing]');
const typingTarget = typingLine?.querySelector('span');
const revealItems = document.querySelectorAll('.reveal');

function typeText() {
  if (!typingTarget || !typingLine) return;
  const text = typingLine.dataset.typing || '';
  let index = 0;
  const tick = () => {
    typingTarget.textContent = text.slice(0, index);
    index += 1;
    if (index <= text.length) window.setTimeout(tick, 58);
  };
  window.setTimeout(tick, 650);
}

typeText();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

revealItems.forEach((item) => revealObserver.observe(item));

function updateScrollState() {
  const scrollPosition = window.scrollY;
  header?.classList.toggle('is-scrolled', scrollPosition > 24);
  intro?.classList.toggle('is-fading', scrollPosition > window.innerHeight * 0.2);
}

window.addEventListener('scroll', updateScrollState, { passive: true });
updateScrollState();

// Keep missing user assets readable until the real files are added.
document.querySelectorAll('.logo-placeholder img, [data-asset] img').forEach((image) => {
  image.addEventListener('error', () => {
    image.hidden = true;
    image.parentElement.classList.add('asset-missing');
  }, { once: true });
});
