document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll<HTMLElement>('[data-animate]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const delay = el.dataset.delay ?? '0';
        el.style.transitionDelay = `${delay}ms`;
        el.classList.add('is-visible');
        observer.unobserve(el);
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((el) => observer.observe(el));
});
