(function(){
  const partials = [
    'partials/inicio.html',
    'partials/servicios.html',
    'partials/nosotros.html',
    'partials/galeria.html',
    'partials/testimonios.html',
    'partials/faq.html',
    'partials/contacto.html'
  ];

  const container = document.getElementById('main-content');
  if (!container) return;

  // Load partials sequentially to preserve order
  (async function loadAll() {
    for (const path of partials) {
      try {
        const res = await fetch(path);
        if (!res.ok) {
          console.warn('Failed to load partial:', path, res.status);
          continue;
        }
        const html = await res.text();
        const wrapper = document.createElement('div');
        wrapper.innerHTML = html;
        // Append children of wrapper to container
        Array.from(wrapper.children).forEach(child => container.appendChild(child));
      } catch (err) {
        console.error('Error loading partial', path, err);
      }
    }

    // After partials are loaded, initialize existing script.js behaviors
    // Load original script if not already present
    if (!document.querySelector('script[data-original-script]')) {
      const s = document.createElement('script');
      s.src = 'script.js';
      s.setAttribute('data-original-script', '1');
      document.body.appendChild(s);
    }
  })();
})();
