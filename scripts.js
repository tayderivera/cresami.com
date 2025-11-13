  window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {  
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  let index = 0;

  function showSlide(i) {
    const offset = -i * 100; // desplazamiento ajustado para slides de 80% + 2% margin
    document.querySelector('.carousel-container').style.transform = `translateX(${offset}%)`;
  }

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % slides.length; // si llega al final, vuelve al inicio
    showSlide(index);
  });

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length; // si está al inicio, va al final
    showSlide(index);
  });

  // Opcional: animación automática
  setInterval(() => {
    nextBtn.click();
  }, 5000); // cambia cada 3 segundos

  // Funcionalidad de pestañas para ubicaciones
  function initializeTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const mapaIframes = document.querySelectorAll('.mapa-iframe');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const targetTab = this.getAttribute('data-tab');

        // Remover clase active de todos los botones y contenidos
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(content => {
          content.classList.remove('active');
          content.style.display = 'none';
        });
        mapaIframes.forEach(iframe => {
          iframe.classList.remove('active');
          iframe.style.display = 'none';
        });

        // Agregar clase active al botón clickeado
        this.classList.add('active');

        // Mostrar el contenido correspondiente
        const targetContent = document.getElementById(targetTab);
        if (targetContent) {
          targetContent.classList.add('active');
          targetContent.style.display = 'flex';
        }

        // Mostrar el mapa correspondiente
        const targetMap = document.getElementById(`mapa-${targetTab}`);
        if (targetMap) {
          targetMap.classList.add('active');
          targetMap.style.display = 'block';
        }
      });
    });
  }

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTabs);
  } else {
    initializeTabs();
  }

  // Funcionalidad del menú hamburguesa
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu ul li a');

  // Toggle del menú hamburguesa
  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Cerrar menú al hacer click en un enlace
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Cerrar menú al hacer click fuera de él
  document.addEventListener('click', function(event) {
    const isClickInsideNav = navMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);
    
    if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });

  // Cerrar menú al cambiar el tamaño de la ventana (cuando se cambia de móvil a desktop)
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });