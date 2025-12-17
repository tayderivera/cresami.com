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
    const offset = -i * 100;
    document.querySelector('.carousel-container').style.transform = `translateX(${offset}%)`;
  }

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % slides.length; 
    showSlide(index);
  });

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length; 
    showSlide(index);
  });


  setInterval(() => {
    nextBtn.click();
  }, 5000); 

  function initializeTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const mapaIframes = document.querySelectorAll('.mapa-iframe');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const targetTab = this.getAttribute('data-tab');

        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(content => {
          content.classList.remove('active');
          content.style.display = 'none';
        });
        mapaIframes.forEach(iframe => {
          iframe.classList.remove('active');
          iframe.style.display = 'none';
        });

        this.classList.add('active');


        const targetContent = document.getElementById(targetTab);
        if (targetContent) {
          targetContent.classList.add('active');
          targetContent.style.display = 'flex';
        }

        const targetMap = document.getElementById(`mapa-${targetTab}`);
        if (targetMap) {
          targetMap.classList.add('active');
          targetMap.style.display = 'block';
        }
      });
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTabs);
  } else {
    initializeTabs();
  }

  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu ul li a');
  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  document.addEventListener('click', function(event) {
    const isClickInsideNav = navMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);
    
    if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });

  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
 
  const form = document.getElementById("contactForm");
  const btn = document.getElementById("btnSend");

  form.addEventListener("submit", function (event){
    event.preventDefault();
  
    const recaptchaResponse = grecaptcha.getResponse();
    if (recaptchaResponse.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Verificación requerida',
        text: 'Por favor, completa el captcha para continuar.',
        confirmButtonColor: '#007bff'
      });
      return;
    }
    
    btn.disabled = true;
    btn.innerText = "Enviando...";

    emailjs.sendForm(
      'service_8lfihxk',
      'template_sbb0m7j',
      '#contactForm',
      '3udCcSju34YsiYZfb'
    ).then(() => {
      Swal.fire({
        icon: 'success',
        title: '¡Mensaje enviado!',
        text: 'Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto contigo pronto.',
        confirmButtonColor: '#007bff'
      });
      form.reset();
      grecaptcha.reset(); 
      btn.disabled = false;
      btn.innerText = "Enviar";
    }).catch((error) => {
      console.error('Error al enviar:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al enviar el mensaje. Por favor, intenta de nuevo.',
        confirmButtonColor: '#dc3545'
      });
      grecaptcha.reset(); 
      btn.disabled = false;
      btn.innerText = "Enviar";
    });
  });

