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
