// Detecta o evento de scroll (rolagem da página) para identificar a seção atual
document.addEventListener('scroll', () => {
  // Seleciona todas as seções da página
  const sections = document.querySelectorAll('section');
  // Seleciona todos os links de navegação que possuem a classe 'nav-link'
  const navLinks = document.querySelectorAll('.nav-link');

  // Variável para armazenar a seção atualmente visível
  let currentSection = '';

  // Para cada seção, verifica sua posição em relação ao topo da página
  sections.forEach((section) => {
    // Ajusta a posição superior da seção com uma margem de 70px
    const sectionTop = section.offsetTop - 70;
    // Verifica se o scroll atual já passou da seção
    if (scrollY >= sectionTop) {
      // Se sim, armazena o ID da seção atual
      currentSection = section.getAttribute('id');
    }
  });

  // Atualiza os links de navegação para destacar o link da seção atual
  navLinks.forEach((link) => {
    // Remove a classe 'active' de todos os links
    link.classList.remove('active');
    // Adiciona a classe 'active' ao link correspondente à seção visível
    if (link.getAttribute('href').includes(currentSection)) {
      link.classList.add('active');
    }
  });
});

// Utiliza jQuery para detectar o evento de scroll e destacar o link da seção ativa
$(document).ready(function() {
  $(window).on('scroll', function() {
    // Obtém a posição atual da rolagem
    var scrollPos = $(window).scrollTop();

    // Para cada link de navegação dentro da barra de navegação
    $('.navbar-nav .nav-link').each(function() {
      // Obtém o link que aponta para a seção correspondente
      var section = $(this).attr('href');
      // Calcula a posição da seção, ajustando 100px
      var sectionOffset = $(section).offset().top - 100;

      // Verifica se a rolagem atual passou da seção
      if (scrollPos >= sectionOffset) {
        // Remove a classe 'active' de todos os links
        $('.navbar-nav .nav-link').removeClass('active');
        // Adiciona a classe 'active' ao link da seção atual
        $(this).addClass('active');
      }
    });
  });
});

// Garante que a página inicie na seção '#carrossel' caso não seja fornecida uma âncora
document.addEventListener('DOMContentLoaded', function () {
  if (window.location.hash !== '#carrossel') {
    window.location.hash = '#carrossel';
  }

  // Seleciona os botões de 'Voltar ao Topo' e do WhatsApp
  const backToTopButton = document.getElementById('backToTop');
  const whatsappButton = document.getElementById('whatsappButton');

  // Função para exibir ou esconder os botões dependendo da posição de rolagem
  function toggleButtons() {
    const scrollPosition = window.scrollY;

    // Exibe os botões se a rolagem for maior que 100px
    if (scrollPosition > 100) {
      backToTopButton.style.display = 'flex';
      whatsappButton.style.display = 'flex';
      setTimeout(() => {
        backToTopButton.style.opacity = '1';
        whatsappButton.style.opacity = '1';
      }, 10);
    } else {
      // Esconde os botões se a rolagem for menor que 100px
      backToTopButton.style.opacity = '0';
      whatsappButton.style.opacity = '0';
      setTimeout(() => {
        backToTopButton.style.display = 'none';
        whatsappButton.style.display = 'none';
      }, 500);
    }
  }

  // Detecta o evento de scroll para mostrar ou esconder os botões
  document.addEventListener('scroll', toggleButtons);

  // Rola a página suavemente para o topo ao clicar no botão 'Voltar ao Topo'
  backToTopButton.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Abre o WhatsApp com o número fornecido ao clicar no botão do WhatsApp
  whatsappButton.addEventListener('click', function () {
    window.location.href = 'https://wa.me/5519998537363';
  });
});

// Inicializa a biblioteca AOS (Animação no Scroll) para animações em rolagem
AOS.init();

// Validação e formatação de número de telefone em tempo real
document.getElementById('telefone').addEventListener('input', function (e) {
  let input = e.target.value;

  // Remove caracteres não numéricos
  input = input.replace(/\D/g, '');

  // Aplica a formatação do número de telefone no padrão brasileiro
  if (input.length > 10) {
    input = input.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
  } else if (input.length > 6) {
    input = input.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
  } else if (input.length > 2) {
    input = input.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
  } else {
    input = input.replace(/^(\d{0,2})/, '($1)');
  }

  // Atualiza o valor do campo de entrada com o número formatado
  e.target.value = input;
});

// Validação de campo de mensagem e controle de contagem de caracteres
const mensagemInput = document.getElementById('mensagem');
const charCount = document.getElementById('char-count');
const feedback = document.getElementById('feedback');
const maxChars = 500;

// Atualiza a contagem de caracteres restantes enquanto o usuário digita
mensagemInput.addEventListener('input', function () {
  const mensagem = mensagemInput.value;
  const remainingChars = maxChars - mensagem.length;
  
  // Exibe o número de caracteres restantes
  charCount.textContent = `${remainingChars} caracteres restantes`;

  // Exibe um aviso se o limite de caracteres for excedido
  if (remainingChars < 0) {
    feedback.textContent = 'Você excedeu o limite de caracteres!';
    feedback.style.color = 'red';
    mensagemInput.classList.add('is-invalid');
  } else {
    // Remove o aviso caso o número de caracteres esteja dentro do limite
    feedback.textContent = '';
    mensagemInput.classList.remove('is-invalid');
  }

  // Verifica palavras indesejadas (exemplo de filtro de conteúdo)
  const palavrasProibidas = ['palavra1', 'palavra2']; // Lista de palavras proibidas
  const palavrasEncontradas = palavrasProibidas.filter(palavra => mensagem.includes(palavra));
  if (palavrasEncontradas.length > 0) {
    // Exibe um alerta se palavras proibidas forem encontradas
    feedback.textContent = `Evite usar as palavras: ${palavrasEncontradas.join(', ')}`;
    feedback.style.color = 'orange';
  }
});

// Validação de formulário ao enviar
const form = document.getElementById('contactForm');

form.addEventListener('submit', function(event) {
  // Previne o envio do formulário até que os campos sejam validados
  event.preventDefault();

  const nome = document.getElementById('nome');
  const email = document.getElementById('email');
  const telefone = document.getElementById('telefone');

  // Valida o campo nome
  if (nome.value === "") {
    alert("Por favor, preencha o campo Nome.");
    nome.focus();
    return;
  }

  // Valida o campo email
  if (email.value === "") {
    alert("Por favor, preencha o campo Email.");
    email.focus();
    return;
  }

  // Valida o campo telefone
  if (telefone.value === "") {
    alert("Por favor, preencha o campo Telefone.");
    telefone.focus();
    return;
  }

  // Se todos os campos estiverem preenchidos corretamente, o formulário é enviado
  form.submit();
});
