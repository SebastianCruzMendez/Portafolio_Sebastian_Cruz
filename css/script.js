/**
 * Portafolio SCM - Interacciones Principales
 * Desarrollado con JavaScript Vanilla (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // =========================================================
  // 1. EFECTO "MÁQUINA DE ESCRIBIR" (TERMINAL HERO)
  // =========================================================
  const initTypewriter = () => {
    const typeWriterElement = document.getElementById('typewriter-text');
    if (!typeWriterElement) return;

    const textToType = "Como alguien que disfruta desarrollando, ensamblando y solucionando problemas desde la raíz, mi enfoque va más allá del código. Construyo sistemas backend robustos conectados a interfaces eficientes. Listo para compilar nuevas ideas.";
    let i = 0;
    
    const typeWriter = () => {
      if (i < textToType.length) {
        typeWriterElement.innerHTML += textToType.charAt(i);
        i++;
        // Variación aleatoria de velocidad para simular un tipeo humano real
        const randomSpeed = Math.random() * (45 - 20) + 20;
        setTimeout(typeWriter, randomSpeed);
      }
    };
    
    // Inicia el efecto 1 segundo después de cargar la página
    setTimeout(typeWriter, 1000);
  };

  // =========================================================
  // 2. ANIMACIONES DE APARICIÓN AL HACER SCROLL (REVEAL)
  // =========================================================
  const initScrollReveal = () => {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Dejamos de observar para que la animación solo ocurra una vez
          observer.unobserve(entry.target); 
        }
      });
    }, { 
      threshold: 0.1, 
      rootMargin: "0px 0px -50px 0px" 
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
  };

  // =========================================================
  // 3. EFECTO TILT 3D PARA TARJETAS DE PROYECTOS
  // =========================================================
  const initTiltEffect = () => {
    const cards = document.querySelectorAll('.schema-card');
  
    cards.forEach(card => {
      // Movimiento 3D siguiendo el cursor
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top;  
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Ecuación para calcular los grados de inclinación (max 8 grados)
        const rotateX = ((y - centerY) / centerY) * -8; 
        const rotateY = ((x - centerX) / centerX) * 8;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });
  
      // Restaurar la posición original suavemente al salir
      card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        card.style.transition = 'transform 0.5s ease';
      });
      
      // Quitar la transición al entrar para que el seguimiento sea instantáneo
      card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
      });
    });
  };

  // =========================================================
  // 4. SEGUIMIENTO DINÁMICO DE NAVEGACIÓN (SPY SCROLL)
  // =========================================================
  const initNavHighlight = () => {
    const sections = document.querySelectorAll('section, header[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === '#' + entry.target.id
            );
          });
        }
      });
    }, { 
      // Ajuste de margen para detectar la sección activa hacia la mitad de la pantalla
      rootMargin: '-40% 0px -60% 0px' 
    });
    
    sections.forEach(sec => navObserver.observe(sec));
  };

  // =========================================================
  // 5. UTILIDADES (Menú Móvil, Año del Footer, Validaciones)
  // =========================================================
  const initUtils = () => {
    // Año dinámico
    const yearElement = document.getElementById('year');
    if(yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  
    // Autocierre del menú en móviles al hacer clic en un enlace
    document.querySelectorAll('#navMenu .nav-link').forEach(link => {
      link.addEventListener('click', () => {
        const menu = document.getElementById('navMenu');
        if (menu.classList.contains('show')) {
          // Utiliza la API de Bootstrap para cerrar el collapse
          bootstrap.Collapse.getOrCreateInstance(menu).hide();
        }
      });
    });
  
    // Validación del formulario de contacto
    const form = document.getElementById('contactForm');
    if(form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (!form.checkValidity()) {
          form.classList.add('was-validated');
          return;
        }
        
        form.classList.add('was-validated');
        const successMessage = document.getElementById('formSuccess');
        if(successMessage) {
          successMessage.classList.remove('d-none');
        }
        form.reset();
        form.classList.remove('was-validated');
      });
    }
  };

  // =========================================================
  // EJECUCIÓN DE TODOS LOS MÓDULOS
  // =========================================================
  initTypewriter();
  initScrollReveal();
  initTiltEffect();
  initNavHighlight();
  initUtils();
  
});