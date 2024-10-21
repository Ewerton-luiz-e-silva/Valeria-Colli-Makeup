// Adiciona um evento ao documento para detectar o scroll (rolagem da página)
document.addEventListener('scroll', () => {
  // Seleciona todas as seções da página
  const sections = document.querySelectorAll('section');
  // Seleciona todos os links de navegação (com a classe 'nav-link')
  const navLinks = document.querySelectorAll('.nav-link');

  // Variável para armazenar a seção atual
  let currentSection = '';

  // Para cada seção, verifica a posição no topo da página
  sections.forEach((section) => {
    // Obtém a posição superior da seção e ajusta com uma margem de 70 pixels
    const sectionTop = section.offsetTop - 70;
    // Verifica se a rolagem atual passou da posição da seção
    if (scrollY >= sectionTop) {
      // Atualiza a variável com o ID da seção atual
      currentSection = section.getAttribute('id');
    }
  });

  // Para cada link de navegação, remove a classe 'active' e, se o link 
  // estiver relacionado à seção atual, adiciona a classe 'active'
  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(currentSection)) {
      link.classList.add('active');
    }
  });
});

// Quando o documento estiver pronto, executa a função
$(document).ready(function() {
  // Detecta o evento de scroll (rolagem da página)
  $(window).on('scroll', function() {
    // Obtém a posição atual da rolagem da página
    var scrollPos = $(window).scrollTop();
    
    // Para cada link de navegação dentro do menu
    $('.navbar-nav .nav-link').each(function() {
      // Obtém o atributo 'href' (o link que aponta para a seção)
      var section = $(this).attr('href');
      // Calcula a posição da seção correspondente, ajustando em 100 pixels
      var sectionOffset = $(section).offset().top - 100;

      // Se a rolagem atual passou ou chegou à posição da seção
      if (scrollPos >= sectionOffset) {
        // Remove a classe 'active' de todos os links
        $('.navbar-nav .nav-link').removeClass('active');
        // Adiciona a classe 'active' ao link correspondente à seção atual
        $(this).addClass('active');
      }
    });
  });
});

// Quando o conteúdo do DOM estiver totalmente carregado
document.addEventListener('DOMContentLoaded', function () {
  // Verifica se a URL não contém a âncora '#carrossel'
  // Se não tiver, define a âncora para '#carrossel', garantindo que o site inicie no topo
  if (window.location.hash !== '#carrossel') {
    window.location.hash = '#carrossel';
  }

  // Seleciona os botões de 'Voltar ao Topo' e do WhatsApp
  const backToTopButton = document.getElementById('backToTop');
  const whatsappButton = document.getElementById('whatsappButton');

  // Função para exibir ou esconder os botões dependendo da posição da rolagem
  function toggleButtons() {
    const scrollPosition = window.scrollY;
    // Se a rolagem for maior que 100 pixels, exibe os botões com transição de opacidade
    if (scrollPosition > 100) {
      backToTopButton.style.display = 'flex';
      whatsappButton.style.display = 'flex';
      setTimeout(() => {
        backToTopButton.style.opacity = '1';
        whatsappButton.style.opacity = '1';
      }, 10);
    } else {
      // Caso contrário, esconde os botões lentamente
      backToTopButton.style.opacity = '0';
      whatsappButton.style.opacity = '0';
      setTimeout(() => {
        backToTopButton.style.display = 'none';
        whatsappButton.style.display = 'none';
      }, 500);
    }
  }

  // Adiciona o evento de scroll para ativar a função de exibir ou esconder os botões
  document.addEventListener('scroll', toggleButtons);

  // Ao clicar no botão 'Voltar ao Topo', rola a página suavemente para o topo
  backToTopButton.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Ao clicar no botão do WhatsApp, abre o link do WhatsApp com o número fornecido
  whatsappButton.addEventListener('click', function () {
    window.location.href = 'https://wa.me/5519998537363';
  });
});

// Inicializa a biblioteca AOS (Animação no Scroll) para animações ao rolar a página
AOS.init();
