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
