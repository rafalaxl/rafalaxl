'use strict';

/**
 * Módulo de interatividade do Menu Hambúrguer (Mobile)
 */
export function initMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (!menuToggle || !navMenu) return;

  menuToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('nav-bar__menu--open');
    menuToggle.setAttribute('aria-expanded', isOpen.toString());
  });

  // Fechar o menu ao clicar em qualquer link (móvel)
  const navLinks = navMenu.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('nav-bar__menu--open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}
