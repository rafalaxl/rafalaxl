'use strict';

let widget, trigger, messagesContainer, chatForm, chatInput;
let userName = '', userBusiness = '', userGoal = '', userCurrentSite = '';
let isStarted = false, step = 'name';

const delay = ms => new Promise(r => setTimeout(r, ms));

export function initChat() {
  widget = document.getElementById('chat-widget');
  trigger = document.getElementById('chat-trigger');
  messagesContainer = document.getElementById('chat-body');
  chatForm = document.getElementById('chat-form');
  chatInput = document.getElementById('chat-input');
  
  if (!widget || !trigger) return;
  trigger.addEventListener('click', (e) => { e.preventDefault(); toggleChat(); });
  
  const closeBtn = document.getElementById('chat-close');
  if (closeBtn) closeBtn.addEventListener('click', (e) => { e.preventDefault(); toggleChat(false); });
  if (chatForm) chatForm.addEventListener('submit', handleFormSubmit);
}

function toggleChat(forceState) {
  const isOpen = typeof forceState === 'boolean' ? forceState : !widget.classList.contains('chat-widget--open');
  widget.classList.toggle('chat-widget--open', isOpen);
  trigger.classList.toggle('chat-trigger--active', isOpen);
  trigger.setAttribute('aria-expanded', String(isOpen));
  widget.setAttribute('aria-hidden', String(!isOpen));
  
  const badge = document.getElementById('chat-badge');
  if (badge) {
    badge.style.opacity = isOpen ? '0' : '1';
    badge.style.visibility = isOpen ? 'hidden' : 'visible';
    badge.style.transform = isOpen ? 'translateY(10px)' : 'translateY(0)';
  }
  if (isOpen && !isStarted) { isStarted = true; startConversation(); }
}

function addMessage(sender, text) {
  const msg = document.createElement('div');
  msg.className = `chat-widget__message chat-widget__message--${sender}`;
  const p = document.createElement('p');
  p.className = 'chat-widget__text';
  p.textContent = text;
  const timeSpan = document.createElement('span');
  timeSpan.className = 'chat-widget__time';
  timeSpan.textContent = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  msg.append(p, timeSpan);
  messagesContainer.appendChild(msg);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

async function simulateTyping(ms) {
  const typing = document.createElement('div');
  typing.className = 'chat-widget__message chat-widget__message--typing js-typing';
  typing.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
  messagesContainer.appendChild(typing);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  await delay(ms);
  typing.remove();
}

async function startConversation() {
  await delay(600);
  await simulateTyping(1000);
  addMessage('bot', 'Olá! Sou o assistente virtual da NECXUS. Qual o seu nome?');
  if (chatInput) chatInput.focus();
}

function handleFormSubmit(e) {
  e.preventDefault();
  const value = chatInput.value.trim();
  if (!value) return;
  chatInput.value = '';
  addMessage('user', value);
  processStep(value);
}

async function processStep(value) {
  if (chatInput) chatInput.disabled = true;
  if (step === 'name') {
    userName = value;
    step = 'business';
    await delay(600);
    await simulateTyping(1000);
    addMessage('bot', `Prazer, ${userName}! Qual o nome do seu negócio ou empresa?`);
    if (chatInput) { chatInput.disabled = false; chatInput.focus(); }
  } else if (step === 'business') {
    userBusiness = value;
    step = 'goal';
    await delay(600);
    await simulateTyping(1000);
    addMessage('bot', 'Entendido! E qual é o seu principal objetivo hoje com o site?');
    showOptions(['Clientes no WhatsApp 💬', 'Design profissional 💎', 'Aparecer no Google 🔍', 'Outro 🚀'], handleGoalSelected);
  }
}

function showOptions(options, callback) {
  const optionsDiv = document.createElement('div');
  optionsDiv.className = 'chat-widget__options';
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'chat-widget__option-btn';
    btn.textContent = opt;
    btn.addEventListener('click', () => {
      optionsDiv.remove();
      addMessage('user', opt);
      callback(opt);
    });
    optionsDiv.appendChild(btn);
  });
  messagesContainer.appendChild(optionsDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

async function handleGoalSelected(goal) {
  userGoal = goal;
  step = 'current_site';
  await delay(600);
  await simulateTyping(1000);
  addMessage('bot', 'Ótimo! Você já tem um site ativo ou quer começar do zero?');
  showOptions(['Já tenho e quero melhorar 🔄', 'Começar do zero 🆕'], handleCurrentSiteSelected);
}

async function handleCurrentSiteSelected(siteState) {
  userCurrentSite = siteState;
  step = 'redirect';
  if (chatInput) chatInput.placeholder = 'Redirecionando...';
  await delay(600);
  await simulateTyping(1200);
  
  // Mensagem de conformidade de privacidade solicitada pelo usuário
  addMessage('bot', 'Ao clicar em enviar abaixo, você concorda que usaremos seu nome e dados de agendamento exclusivamente para realizar o seu atendimento no WhatsApp.');
  
  const textMsg = `Olá Rafael! Quero um orçamento.\n👤 Nome: ${userName}\n🏢 Empresa: ${userBusiness}\n🎯 Objetivo: ${userGoal}\n🌐 Estado: ${userCurrentSite}`;
  const whatsappUrl = `https://wa.me/5515997047914?text=${encodeURIComponent(textMsg)}`;
  await delay(2000);
  
  const fallbackLink = document.createElement('a');
  fallbackLink.href = whatsappUrl;
  fallbackLink.target = '_blank';
  fallbackLink.className = 'chat-widget__option-btn chat-widget__fallback-link';
  fallbackLink.textContent = 'Enviar e ir para o WhatsApp';
  messagesContainer.appendChild(fallbackLink);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
  window.open(whatsappUrl, '_blank') || (window.location.href = whatsappUrl);
}
