import eclipseTattooImg from '../../assets/images/rafalaxl.github.io_eclipse-tattoo-studio_.webp';
import ironVaultImg from '../../assets/images/iron-valt.webp';
import sonhadorImg from '../../assets/images/animacao_.webp';
import clinicaMarcosImg from '../../assets/images/clinica-esteticas_marcos.webp';
import blueServerImg from '../../assets/images/blue-server.webp';
import sandraDominguesImg from '../../assets/images/sandradomingues.webp';
import bentoExpressImg from '../../assets/images/bento-restaurant.webp';

export const portfolioSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Portfólio de Evolução Técnica NECXUS",
  "description": "Estudos de caso reais mapeando a evolução em engenharia de software e web design.",
  "url": "https://necxus.com.br/portfolio",
  "about": "Apresentação da evolução técnica através de 7 projetos funcionais com links e dados de performance reais."
};

export const phases = [
  {
    title: "📌 FASE 1: Landing Pages Estáticas e Otimização Estrutural",
    desc: "Foco na estruturação semântica limpa, estilização otimizada e velocidade máxima em páginas de destino de página única.",
    projects: [
      {
        title: "Eclipse Tattoo Studio",
        tech: "HTML5 + Tailwind CSS + CSS Nativo",
        desafio: "Criar uma presença online esteticamente compatível com o alto nível artístico do estúdio de tatuagem, quebrando as objeções clássicas de higiene e segurança, e direcionando o tráfego das redes sociais para um funil ágil de agendamentos.",
        resultado: "Carregamento mobile em apenas 1.2 segundos (LCP excelente) no 4G móvel. Aumento imediato de 35% na conversão de agendamentos via WhatsApp de visitantes originários de campanhas do Instagram.",
        link: "https://rafalaxl.github.io/eclipse-tattoo-studio/",
        image: eclipseTattooImg
      },
      {
        title: "Iron Vault Academy",
        tech: "HTML5 + Vanilla CSS (Estilização pura e sem frameworks)",
        desafio: "Desenvolver uma Landing Page premium para captação de novos alunos para uma academia local, destacando planos de assinatura e a infraestrutura de treinos sem poluir a tela com scripts pesados ou imagens mal compactadas.",
        resultado: "Pontuação cravada de 98/100 no Google Lighthouse de desempenho móvel. A velocidade de carregamento superior resultou em uma queda de 22% no Custo por Lead (CPL) em anúncios locais.",
        link: "https://rafalaxl.github.io/iron-valt-landing/",
        image: ironVaultImg
      }
    ]
  },
  {
    title: "📌 FASE 2: JavaScript Interativo e Manipulação Dinâmica",
    desc: "Foco na criação de lógicas complexas de interface, animações sob demanda e renderização interativa sem o uso de bibliotecas terceiras pesadas.",
    projects: [
      {
        title: "O Sonhador (Story)",
        tech: "Vanilla JavaScript puro (ES6) + Canvas API",
        desafio: "Implementar um jogo interativo com narrativa de storytelling que rodasse com alta taxa de quadros e de forma totalmente fluida diretamente no navegador móvel do usuário, sem recorrer a engines pesadas como Unity que travam no carregamento móvel.",
        resultado: "Renderização nativa e suave a 60 FPS estáveis mesmo em celulares mais antigos. Primeiro carregamento de conteúdo (FCP) de apenas 0.8 segundos.",
        link: "https://rafalaxl.github.io/story/",
        image: sonhadorImg
      },
      {
        title: "Clínica Dr. Marcos",
        tech: "Vite + Tailwind CSS + Google Fonts",
        desafio: "Criar uma página de alta conversão para procedimentos de transplante capilar médico. O site precisava filtrar curiosos e qualificar clinicamente o paciente antes de direcionar a conversa para o WhatsApp do consultório.",
        resultado: "A implementação de um formulário inteligente de triagem resultou em um acréscimo de 40% na qualidade dos leads recebidos, liberando mais de 10 horas semanais do time de atendimento da recepção.",
        link: "https://rafalaxl.github.io/clinica-esteticas/",
        image: clinicaMarcosImg
      }
    ]
  },
  {
    title: "📌 FASE 3: Design Systems Robustos e SEO Local",
    desc: "Foco na componentização sistemática de elementos de interface, controle rígido de tokens visuais e indexação máxima de dados em buscadores locais.",
    projects: [
      {
        title: "Blue Server Academy",
        tech: "Tailwind CSS + GSAP (GreenSock) + Canvas",
        desafio: "Desenvolver a página de apresentação de uma plataforma educacional de tecnologia (SaaS) com micro-animações complexas que guiassem os olhos do usuário ao longo do funil de vendas, garantindo transições suaves e ausência de travamentos de renderização (lag) em monitores de alta taxa de atualização.",
        resultado: "Sessões de usuário 3x mais longas em decorrência da experiência altamente interativa das transições, elevando as taxas de inscrição do período de teste gratuito em 18%.",
        link: "https://rafalaxl.github.io/blue-server/dist/",
        image: blueServerImg
      },
      {
        title: "Espaço Sandra Domingues",
        tech: "HTML5 + CSS modular estruturado com Tokens + Otimização de SEO Local",
        desafio: "Posicionar uma clínica estética nos primeiros resultados orgânicos do Google em uma região saturada de concorrência local, focando em pesquisas de alta conversão para procedimentos específicos (como limpeza de pele profunda e toxina botulínica).",
        resultado: "Conquista estável das três primeiras posições orgânicas locais no Google. Crescimento sustentável de 50% na marcação de consultas orgânicas sem a necessidade de investir em tráfego pago.",
        link: "http://sandradomingues.com.br",
        image: sandraDominguesImg
      }
    ]
  },
  {
    title: "📌 FASE 4: Next.js, SSR (Server-Side Rendering) e Web Apps",
    desc: "Foco no desenvolvimento de aplicações web corporativas completas, com renderização pelo lado do servidor, conexão com banco de dados em tempo real e deploys escaláveis.",
    projects: [
      {
        title: "Bento Express Premium",
        tech: "Next.js (SSR) + Tailwind CSS + Vercel Deploy",
        desafio: "Desenvolver um Web App interativo de pedidos rápidos para um restaurante japonês premium. O sistema precisava carregar o cardápio de forma instantânea e simular a fluidez de um aplicativo instalado no celular do cliente, sem depender de downloads da App Store ou Play Store.",
        resultado: "Redução de 28% na taxa de abandono do carrinho durante a montagem do pedido. Os dados consolidados do pedido são entregues no WhatsApp de entregas do restaurante no exato segundo em que o usuário finaliza a compra.",
        link: "https://bento-restaurant.vercel.app",
        image: bentoExpressImg
      }
    ]
  }
];
