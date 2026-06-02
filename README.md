# NECXUS Digital

A NECXUS é uma agência focada na criação de sites institucionais ultrarrápidos e Landing Pages projetadas cientificamente para capturar leads qualificados e redirecioná-los diretamente para o WhatsApp do seu negócio.

## 🚀 Sobre o Projeto

Este repositório contém o código-fonte do site oficial da NECXUS. O projeto foi desenvolvido com foco total em **Performance (Mobile-First)**, **Acessibilidade** e **Conversão de Leads**. 

A arquitetura do site é construída com tecnologias web nativas para garantir a máxima velocidade de carregamento, sem depender de frameworks pesados que prejudicam a experiência do usuário em redes 3G/4G.

### Tecnologias Utilizadas
- **HTML5 Semântico:** Estruturação otimizada para SEO local e leitores de tela.
- **CSS Modular (Design Tokens):** Sistema de estilos escalável, com arquivos divididos por seções (nav, hero, footer, etc.) e variáveis globais.
- **Vanilla JavaScript:** Scripts leves e modulares para o funcionamento do menu interativo e integração com o widget de atendimento virtual.

## 🧪 Testes e Auditorias Executadas

O código passou por uma rigorosa auditoria de qualidade técnica (detalhada no arquivo `AUDITORIA.md`):

- **Performance e Semântica:** Validação de hierarquia HTML (apenas um `<h1>` por página) e implementação de schema markup JSON-LD para SEO avançado.
- **Acessibilidade Web:** Uso rigoroso de atributos `aria-*` e `role` em componentes interativos (como o Chat Widget e Menu Mobile) garantindo navegação inclusiva.
- **Responsividade Real:** Layout Mobile-First exaustivamente testado para telas pequenas, garantindo carregamento instantâneo.
- **Padronização Visual:** Validação de tokens de design, garantindo contraste adequado e consistência nas cores em todo o ecossistema do site.
- **Integração de Contato:** Testes no fluxo do Atendente Virtual, garantindo que a triagem de dados do visitante seja capturada e formatada perfeitamente no redirecionamento para o WhatsApp.

## 💻 Como Executar

Como o site é construído puramente com HTML/CSS/JS nativos, não é necessário processos de *build* ou compilação complexos.

1. Clone o repositório:
   ```bash
   git clone https://github.com/rafalaxl/rafalaxl.git
   ```
2. Abra a pasta local no seu editor de código.
3. Inicie um servidor local. Você pode usar a extensão **Live Server** do VS Code ou via Node.js pelo terminal:
   ```bash
   npx http-server . -p 8080
   ```
4. Acesse `http://localhost:8080` no seu navegador.

---
*Desenvolvido com 💻 e foco em conversões.*
