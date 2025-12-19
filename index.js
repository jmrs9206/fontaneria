// index.js
// Navbar móvil, dropdown Servicios, carrusel de Opiniones, modales legales y banner de cookies

document.addEventListener("DOMContentLoaded", () => {
    setupMobileNav();
    setupServiciosDropdownMobile();
    setupCarouselOpiniones();
    setupOutsideModalClose();
    setupCookieBanner();
    setupFAQAccordion();
    setupScrollEffects();
    injectStructuredData();
});

/* NAV MÓVIL */
function setupMobileNav() {
    const navToggle = document.getElementById("navToggle");
    const navLinks = document.getElementById("navLinks");
    if (!navToggle || !navLinks) return;

    navToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", isOpen);
    });

    // Cerrar menú al hacer clic en un enlace (solo móvil)
    navLinks.addEventListener("click", (e) => {
        if (e.target.tagName === "A" && window.innerWidth <= 768) {
            navLinks.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
        }
    });
}

/* DROPDOWN SERVICIOS (VERSIÓN MÓVIL) */
function setupServiciosDropdownMobile() {
    const navItem = document.querySelector(".nav-item-servicios");
    const link = document.querySelector(".nav-servicios-link");
    if (!navItem || !link) return;

    link.addEventListener("click", (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault(); // Evita el scroll a #servicios
            navItem.classList.toggle("open");
        }
    });

    // Si volvemos a escritorio, reseteamos el dropdown
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            navItem.classList.remove("open");
        }
    });
}

/* CARRUSEL OPINIONES */
function setupCarouselOpiniones() {
    const track = document.querySelector(".carousel-track");
    const dotsContainer = document.getElementById("opinionesDots");
    if (!track || !dotsContainer) return;

    const slides = Array.from(track.children);
    const total = slides.length;
    let currentIndex = 0;
    let timer = null;

    // Crear dots
    slides.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.classList.add("carousel-dot");
        if (index === 0) dot.classList.add("active");

        dot.addEventListener("click", () => {
            goTo(index);
            restartAuto();
        });

        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);

    function goTo(index) {
        if (index < 0) index = total - 1;
        if (index >= total) index = 0;
        currentIndex = index;

        const offset = -index * 100;
        track.style.transform = `translateX(${offset}%)`;

        dots.forEach((d, i) => d.classList.toggle("active", i === index));
    }

    function startAuto() {
        timer = setInterval(() => {
            goTo(currentIndex + 1);
        }, 8000); // cada 8 segundos
    }

    function restartAuto() {
        if (timer) clearInterval(timer);
        startAuto();
    }

    startAuto();
}

/* MODALES LEGALES */
function getModalIdFromType(type) {
    switch (type) {
        case "aviso": return "avisoModal";
        case "privacidad": return "privacidadModal";
        case "cookies": return "cookiesModal";
        default: return null;
    }
}

function openModal(type) {
    const id = getModalIdFromType(type);
    const modal = id ? document.getElementById(id) : null;
    if (modal) modal.style.display = "block";
}

function closeModal(type) {
    const id = getModalIdFromType(type);
    const modal = id ? document.getElementById(id) : null;
    if (modal) modal.style.display = "none";
}

// Exportar para los onclick del HTML
window.openModal = openModal;
window.closeModal = closeModal;

/* CIERRE DE MODALES AL CLICAR FUERA O PULSAR ESC */
function setupOutsideModalClose() {
    window.addEventListener("click", (e) => {
        const modals = document.querySelectorAll(".modal");
        modals.forEach((m) => {
            if (e.target === m) {
                m.style.display = "none";
            }
        });
    });

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            const modals = document.querySelectorAll(".modal");
            modals.forEach((m) => (m.style.display = "none"));
        }
    });
}

/* BANNER DE COOKIES */
function setupCookieBanner() {
    const banner = document.getElementById("cookieBanner");
    if (!banner) return;

    const accepted = localStorage.getItem("cookiesAccepted");
    if (!accepted) {
        banner.style.display = "block";
    }
}

function acceptCookies() {
    const banner = document.getElementById("cookieBanner");
    if (banner) banner.style.display = "none";
    localStorage.setItem("cookiesAccepted", "true");
}

window.acceptCookies = acceptCookies;

/* FAQ ACCORDION - Solo una pregunta abierta a la vez */
function setupFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
        const summary = item.querySelector('summary');
        if (!summary) return;

        summary.addEventListener('click', () => {
            // No necesitamos e.preventDefault() ya que <details> maneja el toggle
            // Solo cerramos los demás
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.removeAttribute('open');
                }
            });
        });
    });
}

/* EFECTOS DE SCROLL: Botones flotantes y aparición de secciones */
function setupScrollEffects() {
    const whatsappBtn = document.querySelector('.whatsapp-float');
    const callBtn = document.querySelector('.call-float');
    const revealElements = document.querySelectorAll('.reveal');

    // 1. Mostrar/Ocultar botones flotantes
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            whatsappBtn?.classList.add('visible');
            callBtn?.classList.add('visible');
        } else {
            whatsappBtn?.classList.remove('visible');
            callBtn?.classList.remove('visible');
        }
    });

    // 2. Revelar secciones al scroll (Intersection Observer)
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Una vez revelado, dejamos de observarlo para ahorrar recursos
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15 // Se activa cuando el 15% del elemento es visible
    });


    revealElements.forEach(el => revealObserver.observe(el));
}

/* INYECTAR DATOS ESTRUCTURADOS (SEO) */
function injectStructuredData() {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Servinstalaciones S&R",
        "image": "https://servinstalaciones.com/assets/img/logo-Servinstalaciones.png",
        "@id": "https://servinstalaciones.com/",
        "url": "https://servinstalaciones.com/",
        "telephone": "+34911222333",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Madrid capital y área metropolitana",
            "addressLocality": "Madrid",
            "addressRegion": "Comunidad de Madrid",
            "postalCode": "28001",
            "addressCountry": "ES"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 40.416775,
            "longitude": -3.703790
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            ],
            "opens": "00:00",
            "closes": "23:59"
        },
        "sameAs": [
            "https://www.facebook.com/",
            "https://www.instagram.com/"
        ]
    };
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
}
