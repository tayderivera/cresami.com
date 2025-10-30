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
    const offset = -i * 100; // desplazamiento
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
  }, 3000); // cambia cada 3 segundos