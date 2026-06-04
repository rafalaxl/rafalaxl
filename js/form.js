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

    // Feedback visual de envio
    const submitBtn = form.querySelector('.form-submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Redirecionando...';
    submitBtn.disabled = true;

    // Constrói a mensagem para o WhatsApp
    const businessLabel = form.querySelector(`#business option[value="${business}"]`)?.textContent || business;
    const textMsg = `Olá Rafael! Fiz a triagem rápida pelo site:\n👤 *Nome:* ${name}\n📱 *WhatsApp:* ${whatsapp}\n🏢 *Tipo de Negócio:* ${businessLabel}\n🎯 *Objetivo:* ${goal}`;
    const whatsappUrl = `https://wa.me/5515997047914?text=${encodeURIComponent(textMsg)}`;

    setTimeout(() => {
      showFeedback(`Obrigado pelo contato, ${name}! Estamos te redirecionando para o WhatsApp...`, 'success');
      form.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      
      // Abre o WhatsApp em nova aba ou redireciona
      window.open(whatsappUrl, '_blank') || (window.location.href = whatsappUrl);
    }, 1000);
  });
}
