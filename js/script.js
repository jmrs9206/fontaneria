// Script loader: dynamically load modular scripts in order
/* Consolidated script: merged modules into a single file
   Order: nav, smooth-scroll, faq, observers, forms, effects, analytics */

/* ===== nav.js ===== */
(function(){
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuIcon = document.getElementById('menuIcon');
  const closeIcon = document.getElementById('closeIcon');
  const mobileNavLinks = document.querySelectorAll('.nav-link-mobile');
  const header = document.getElementById('header');

  function initMobileMenu(){
    if (!mobileMenuBtn) return;
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      menuIcon.classList.toggle('hidden');
      closeIcon.classList.toggle('hidden');
    });

    // Close mobile menu when clicking on a link
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      });
    });
  }

  // Debounce utility
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  function onScroll() {
    if (!header) return;
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active nav link
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  function init() {
    initMobileMenu();
    window.addEventListener('scroll', debounce(onScroll, 10));
    // run once
    onScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* ===== smooth-scroll.js ===== */
(function(){
  // Smooth scrolling for anchor links
  function init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        // If it's an external HTML page (e.g., politica.html) allow default
        const href = this.getAttribute('href');
        if (!href || href.indexOf('#') !== 0) return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* ===== faq.js ===== */
(function(){
  // FAQ Accordion
  function init() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (!faqQuestions) return;

    faqQuestions.forEach((question) => {
      question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
          item.classList.remove('active');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
          faqItem.classList.add('active');
        }
      });
    });

    // Open first FAQ by default
    if (faqQuestions.length > 0) {
      faqQuestions[0].parentElement.classList.add('active');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* ===== observers.js ===== */
(function(){
  // Intersection Observer for animations + lazy loading + counters
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  function animateOnIntersect(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }

  function initAnimations() {
    const observer = new IntersectionObserver(animateOnIntersect, observerOptions);

    document.querySelectorAll('.service-card').forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = `all 0.6s ease ${index * 0.1}s`;
      observer.observe(card);
    });

    document.querySelectorAll('.gallery-item').forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(30px)';
      item.style.transition = `all 0.6s ease ${index * 0.1}s`;
      observer.observe(item);
    });

    document.querySelectorAll('.testimonial-card').forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = `all 0.6s ease ${index * 0.1}s`;
      observer.observe(card);
    });

    document.querySelectorAll('.contact-card').forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = `all 0.6s ease ${index * 0.1}s`;
      observer.observe(card);
    });
  }

  // Counter animation for stats
  const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    const isPercentage = target === 100;
    const hasPlus = element.textContent.includes('+');

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        clearInterval(timer);
        start = target;
      }

      if (isPercentage) {
        element.textContent = Math.floor(start) + '%';
      } else if (hasPlus) {
        element.textContent = Math.floor(start) + '+';
      } else {
        element.textContent = Math.floor(start);
      }
    }, 16);
  };

  function initCounters() {
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
          entry.target.classList.add('animated');
          const text = entry.target.textContent;
          let target = parseInt(text.replace(/\D/g, ''));

          // Adjust for different stat types
          if (text.includes('24/7')) {
            return; // Skip 24/7
          }

          if (target) {
            animateCounter(entry.target, target);
          }
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(stat => {
      statObserver.observe(stat);
    });
  }

  // Lazy loading images
  function initLazyLoad() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  function init() {
    initAnimations();
    initCounters();
    initLazyLoad();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* ===== forms.js ===== */
(function(){
  // Form validation and submit handling
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    const re = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
    return re.test(String(phone));
  };

  function init() {
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Validate
        let isValid = true;
        let errors = [];

        if (data.email && !validateEmail(data.email)) {
          isValid = false;
          errors.push('Email no válido');
        }

        if (data.phone && !validatePhone(data.phone)) {
          isValid = false;
          errors.push('Teléfono no válido');
        }

        if (isValid) {
          // In a real application, send data to server
          console.log('Form data:', data);
          alert('Gracias por su interés. Nos pondremos en contacto con usted a la brevedad.');
          form.reset();
        } else {
          alert('Errores en el formulario:\n' + errors.join('\n'));
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* ===== effects.js ===== */
(function(){
  // Parallax, hover and ripple effects, preloader
  function initParallax() {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('.hero-background');
      if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    });
  }

  function initHoverEffects() {
    document.querySelectorAll('.service-card').forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
      });

      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    });
  }

  function initRipple() {
    document.querySelectorAll('button, .btn-primary, .btn-hero-primary, .btn-cta').forEach(button => {
      button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });

    // Add CSS for ripple effect if not already present
    if (!document.getElementById('ripple-styles')) {
      const style = document.createElement('style');
      style.id = 'ripple-styles';
      style.textContent = `
        button, .btn-primary, .btn-hero-primary, .btn-cta { position: relative; overflow: hidden; }
        .ripple { position: absolute; border-radius: 50%; background: rgba(255,255,255,0.6); transform: scale(0); animation: ripple-animation 0.6s ease-out; pointer-events: none; }
        @keyframes ripple-animation { to { transform: scale(4); opacity: 0; } }
      `;
      document.head.appendChild(style);
    }
  }

  function initPreloader() {
    window.addEventListener('load', () => {
      document.body.classList.add('loaded');
    });
  }

  function init() {
    initParallax();
    initHoverEffects();
    initRipple();
    initPreloader();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* ===== analytics.js ===== */
(function(){
  // External link handling and simple analytics hooks
  function init() {
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
      link.setAttribute('rel', 'noopener noreferrer');
    });

    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
      link.addEventListener('click', () => {
        console.log('WhatsApp link clicked');
      });
    });

    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
      link.addEventListener('click', () => {
        console.log('Phone link clicked');
      });
    });

    console.log('Analytics module loaded');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// (WhatsApp hide and feature-card handlers removed — reverted per user request)

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
  // ESC key closes mobile menu
  if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
    mobileMenu.classList.add('hidden');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
  }
});

// Focus management for accessibility
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

// Trap focus in mobile menu when open
mobileMenu.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    const focusables = mobileMenu.querySelectorAll(focusableElements);
    const firstFocusable = focusables[0];
    const lastFocusable = focusables[focusables.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  }
});

// Print loaded message
console.log('%c ServInstalaciones ', 'background: #0a1628; color: #d4af37; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c Premium Plumbing & Post-Construction Cleaning ', 'background: #d4af37; color: #0a1628; font-size: 14px; padding: 5px;');

/* ===== whatsapp tooltip close handler ===== */
(function(){
  function init() {
    const tooltip = document.getElementById('whatsappTooltip');
    const closeBtn = document.getElementById('tooltipClose');
    if (!tooltip || !closeBtn) return;
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // hide the tooltip visually
      tooltip.classList.add('hidden');
      tooltip.setAttribute('aria-hidden', 'true');
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
