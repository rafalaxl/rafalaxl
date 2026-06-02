'use strict';

/**
 * Módulo de animações de scroll utilizando IntersectionObserver
 */
export function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  if (elements.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Deixa de observar após animar
      }
    });
  }, observerOptions);

  elements.forEach(element => {
    observer.observe(element);
  });
}
