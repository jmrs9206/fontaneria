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
