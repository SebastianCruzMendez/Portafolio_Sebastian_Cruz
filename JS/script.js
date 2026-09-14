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
        const randomSpeed = Math.random() * (45 - 20) + 20;
        setTimeout(typeWriter, randomSpeed);
      }
    };
    
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
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top;  
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -8; 
        const rotateY = ((x - centerX) / centerX) * 8;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });
  
      card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        card.style.transition = 'transform 0.5s ease';
      });
      
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
      rootMargin: '-40% 0px -60% 0px' 
    });
    
    sections.forEach(sec => navObserver.observe(sec));
  };

  // =========================================================
  // 5. UTILIDADES (Menú Móvil, Año del Footer, Validaciones)
  // =========================================================
  const initUtils = () => {
    const yearElement = document.getElementById('year');
    if(yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  
    document.querySelectorAll('#navMenu .nav-link').forEach(link => {
      link.addEventListener('click', () => {
        const menu = document.getElementById('navMenu');
        if (menu.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(menu).hide();
        }
      });
    });
  
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
  const initKeyboardScroll = () => {
    const contactSection = document.getElementById('contacto');
    const keys = document.querySelectorAll('.rm-key');

    if (!contactSection || keys.length === 0) return;

    window.addEventListener('scroll', () => {
      const rect = contactSection.getBoundingClientRect();
      
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        
        const scrollDepth = window.innerHeight - rect.top;

        keys.forEach((key, index) => {
          const speed = 0.005; 
          const offset = index * 0.8; 
          
          const wave = Math.sin((scrollDepth * speed) + offset) * 8; 

          key.style.setProperty('--scroll-offset', `${wave}px`);
        });
      }
    });
  };

  // =========================================================
  // EJECUCIÓN DE TODOS LOS MÓDULOS
  // =========================================================
  initTypewriter();
  initScrollReveal();
  initTiltEffect();
  initNavHighlight();
  initUtils();
  initKeyboardScroll();
  
});