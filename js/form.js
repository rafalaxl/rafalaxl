'use strict';

/**
 * Módulo de validação e simulação de envio de formulário de contato
 */
export function initFormValidation() {
  const form = document.getElementById('lead-form');
  if (!form) return;

  const feedbackEl = document.getElementById('form-feedback');

  const showFeedback = (message, type) => {
    if (!feedbackEl) return;

    // Reseta as classes de feedback e define a mensagem
    feedbackEl.className = 'contact-form__feedback';
    feedbackEl.textContent = message;

    if (type === 'success') {
      feedbackEl.classList.add('contact-form__feedback--success');
    } else if (type === 'error') {
      feedbackEl.classList.add('contact-form__feedback--error');
    }

    feedbackEl.style.display = 'block';

    // Rola suavemente até a mensagem de feedback para visibilidade
    feedbackEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const hideFeedback = () => {
    if (!feedbackEl) return;
    feedbackEl.style.display = 'none';
    feedbackEl.textContent = '';
  };

  // Oculta o feedback quando o usuário começa a corrigir as informações
  const formInputs = form.querySelectorAll('input, select, textarea');
  formInputs.forEach(input => {
    input.addEventListener('input', hideFeedback);
    if (input.tagName === 'SELECT') {
      input.addEventListener('change', hideFeedback);
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const whatsapp = document.getElementById('whatsapp').value.trim();
    const business = document.getElementById('business').value;
    const goal = document.getElementById('goal').value.trim();

    if (!name || !whatsapp || !business || !goal) {
      showFeedback('Por favor, preencha todos os campos obrigatórios.', 'error');
      return;
    }

    // Feedback visual de envio (Simulação)
    const submitBtn = form.querySelector('.form-submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    setTimeout(() => {
      showFeedback(`Obrigado pelo contato, ${name}! Entraremos em contato via WhatsApp no número ${whatsapp} em breve.`, 'success');
      form.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });
}
