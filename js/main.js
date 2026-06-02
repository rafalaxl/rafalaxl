'use strict';

import { initMenu } from './menu.js';
import { initFormValidation } from './form.js';
import { initScrollAnimations } from './scroll.js';
import { initChat } from './chat.js';
import { initCounters } from './counter.js';

// Inicializar todos os comportamentos de UI quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initFormValidation();
  initScrollAnimations();
  initChat();
  initCounters();
});
