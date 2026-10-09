'use strict';

// CONFIGURACIÓN: único lugar donde debes cambiar el número.
// Usa 57 + los 10 dígitos del celular, sin espacios, signo + ni guiones.
const WHATSAPP_NUMBER = '573104153624';

// 01 / WHATSAPP — Mensaje específico por servicio y asesoría.
document.querySelectorAll('[data-servicio], [data-mensaje]').forEach((link) => {
  const message = link.dataset.mensaje ||
    (link.dataset.servicio === 'una cita'
      ? 'Hola La Perla, quiero agendar una cita. ¿Qué disponibilidad tienen?'
      : `Hola La Perla, quiero agendar el servicio de ${link.dataset.servicio}. ¿Qué disponibilidad tienen?`);

  link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});

const phoneLabel = document.querySelector('[data-phone-label]');
if (phoneLabel && /^57\d{10}$/.test(WHATSAPP_NUMBER)) {
  phoneLabel.textContent = `+57 ${WHATSAPP_NUMBER.slice(2, 5)} ${WHATSAPP_NUMBER.slice(5, 8)} ${WHATSAPP_NUMBER.slice(8)}`;
  const structuredData = document.querySelector('script[type="application/ld+json"]');
  const business = JSON.parse(structuredData.textContent);
  business.telephone = `+${WHATSAPP_NUMBER}`;
  structuredData.textContent = JSON.stringify(business);
}

// 02 / MENÚ — Escape cierra y devuelve el foco al botón.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
const desktop = window.matchMedia('(min-width: 1000px)');

function closeMenu(returnFocus = false) {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menú');
  navigation.classList.remove('is-open');
  if (returnFocus) menuButton.focus();
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  navigation.classList.toggle('is-open', isOpen);
});

navigation.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (!link) return;
  closeMenu();
  // Mantener el foco visible al ocultar la navegación móvil.
  if (!desktop.matches && link.hash && link.origin === location.origin) {
    const target = document.querySelector(link.hash);
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    }
  } else if (!desktop.matches) {
    menuButton.focus();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.site-header')) closeMenu();
});
desktop.addEventListener('change', () => {
  const focusWillHide = !desktop.matches && navigation.contains(document.activeElement);
  closeMenu(focusWillHide);
});
// La navegación sigue accesible si JavaScript no carga.
document.documentElement.classList.add('js');

// 03 / FILTROS — Estado accesible y contador de resultados.
const filters = document.querySelectorAll('[data-filter]');
const galleryItems = document.querySelectorAll('[data-category]');
const galleryStatus = document.querySelector('#gallery-status');
const galleryEmpty = document.querySelector('.gallery-empty');
const galleryEmptyMessage = document.querySelector('#gallery-empty-message');
const galleryInquiry = galleryEmpty.querySelector('a');

filters.forEach((filter) => {
  filter.addEventListener('click', () => {
    filters.forEach((button) => {
      const active = button === filter;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    let count = 0;
    galleryItems.forEach((item) => {
      item.hidden = filter.dataset.filter !== 'all' && item.dataset.category !== filter.dataset.filter;
      if (!item.hidden) count += 1;
    });
    galleryStatus.textContent = `${count} ${count === 1 ? 'imagen disponible' : 'imágenes disponibles'} en ${filter.textContent.toLowerCase()}.`;
    galleryEmpty.hidden = count !== 0;
    if (count === 0) {
      const category = filter.textContent.toLowerCase();
      galleryEmptyMessage.textContent = `Aún no hemos publicado fotos de ${category}. Escríbenos para conocer las opciones de este servicio.`;
      galleryInquiry.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola La Perla, me gustaría conocer más sobre ${category} y ver trabajos realizados. ¿Me pueden orientar?`)}`;
    }
  });
});

// 04 / LIGHTBOX — <dialog> mantiene el foco y soporta Escape de forma nativa.
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
const lightboxCaption = document.querySelector('#lightbox-caption');
let lastGalleryButton = null;

document.querySelectorAll('.gallery-open').forEach((button) => {
  button.addEventListener('click', () => {
    const image = button.querySelector('img');
    if (typeof lightbox.showModal !== 'function') {
      window.open(button.dataset.full || image.currentSrc || image.src, '_blank', 'noopener,noreferrer');
      return;
    }
    lastGalleryButton = button;
    lightboxImage.width = Number(image.getAttribute('width'));
    lightboxImage.height = Number(image.getAttribute('height'));
    lightboxImage.src = button.dataset.full || image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = `${button.dataset.caption} · La Perla`;
    lightbox.showModal();
    document.body.classList.add('modal-open');
  });
});

document.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => {
  // Solo cierra al pulsar fuera del rectángulo del diálogo, no sobre el pie.
  const bounds = lightbox.getBoundingClientRect();
  if (event.target === lightbox && (event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom)) lightbox.close();
});
lightbox.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  lightboxImage.removeAttribute('src');
  lastGalleryButton?.focus({ preventScroll: true });
});

// 05 / AÑO Y APARICIONES — mejora progresiva sin ocultar contenido esencial.
document.querySelector('#current-year').textContent = new Date().getFullYear();
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        activeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
}
