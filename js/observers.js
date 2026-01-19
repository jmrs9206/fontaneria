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
