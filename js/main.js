/**
 * ==========================================================================
 * ATELIÊ MARFIM — NAIL DESIGN
 * Script Principal (Vanilla JS / Sem frameworks)
 * ==========================================================================
 * 
 * SUMÁRIO:
 * 1. CONFIGURAÇÕES GERAIS (Edite contatos e textos rápidos aqui)
 * 2. NAVEGAÇÃO & MENU MOBILE EM TELA CHEIA
 * 3. GALERIA & FILTROS POR CATEGORIA
 * 4. LIGHTBOX ACESSÍVEL (Teclado, Esc, Swipe Mobile)
 * 5. COMPARADOR ANTES E DEPOIS (Slider Touch & Teclado)
 * 6. ACORDEÃO DE DÚVIDAS FREQUENTES (Acessibilidade WAI-ARIA)
 * 7. BOTÃO FLUTUANTE MOBILE (Aparece após o Hero)
 * 8. ANIMAÇÕES SUTIS DE ENTRADA (IntersectionObserver)
 * ==========================================================================
 */

'use strict';

/* ==========================================================================
   1. CONFIGURAÇÕES GERAIS (Edite aqui facilmente)
   ========================================================================== */
const ATELIE_CONFIG = {
  // Telefone e WhatsApp (apenas números para o link)
  whatsappNumber: '5521998765432',
  whatsappDisplay: '(21) 99876-5432',
  whatsappMessageBase: 'Olá, Camila! Vi seu site e gostaria de agendar um horário. Tenho interesse em: ',

  // Redes e endereço
  instagramUser: '@ateliemarfim.nails',
  instagramUrl: 'https://instagram.com/ateliemarfim.nails',
  endereco: 'Rua das Hortênsias, 128, sala 204 — Ipanema, Rio de Janeiro/RJ, CEP 22410-000',
  horario: 'Terça a sábado, das 9h às 19h (fecha domingo e segunda)'
};

/**
 * Utilitário para gerar link do WhatsApp com mensagem codificada
 */
function getWhatsAppUrl(extraMessage = '') {
  const fullText = ATELIE_CONFIG.whatsappMessageBase + (extraMessage || '');
  return `https://wa.me/${ATELIE_CONFIG.whatsappNumber}?text=${encodeURIComponent(fullText)}`;
}

document.addEventListener('DOMContentLoaded', () => {
  initWhatsAppLinks();
  initMobileMenu();
  initGallery();
  initBeforeAfterSliders();
  initFaqAccordion();
  initFloatingButton();
  initScrollAnimations();
});

/* ==========================================================================
   ATUALIZA LINKS DE WHATSAPP DINAMICAMENTE
   ========================================================================== */
function initWhatsAppLinks() {
  const waLinks = document.querySelectorAll('[data-wa-action]');
  waLinks.forEach(link => {
    const serviceName = link.getAttribute('data-service-name') || '';
    link.href = getWhatsAppUrl(serviceName);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });
}

/* ==========================================================================
   2. NAVEGAÇÃO & MENU MOBILE EM TELA CHEIA
   ========================================================================== */
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const navLinks = mobileNav ? mobileNav.querySelectorAll('a') : [];

  if (!menuToggle || !mobileNav) return;

  function openMenu() {
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.classList.add('is-active');
    mobileNav.classList.add('is-open');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
  }

  function closeMenu() {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.classList.remove('is-active');
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  }

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Fecha ao clicar em qualquer link de âncora
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Fecha com a tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuToggle.focus();
    }
  });
}

/* ==========================================================================
   3. GALERIA & FILTROS POR CATEGORIA
   ========================================================================== */
let activeFilter = 'Todos';
let filteredGallery = [];
let currentLightboxIndex = 0;

function initGallery() {
  const galleryContainer = document.getElementById('gallery-grid');
  const filterButtons = document.querySelectorAll('.gallery-filter-btn');

  if (!galleryContainer || typeof GALERIA_TRABALHOS === 'undefined') return;

  filteredGallery = [...GALERIA_TRABALHOS];

  function renderGallery(items) {
    galleryContainer.innerHTML = '';

    if (items.length === 0) {
      galleryContainer.innerHTML = '<p class="gallery-empty">Nenhum trabalho encontrado nesta categoria.</p>';
      return;
    }

    items.forEach((item, index) => {
      const figure = document.createElement('figure');
      figure.className = 'gallery-item';
      figure.setAttribute('data-category', item.categoria);

      figure.innerHTML = `
        <button type="button" class="gallery-card" data-gallery-index="${index}" aria-label="Ampliar foto: ${item.legenda}">
          <div class="gallery-image-wrap">
            <img 
              src="${item.src}" 
              alt="${item.alt}" 
              width="${item.width}" 
              height="${item.height}" 
              loading="lazy" 
              class="gallery-image"
            />
            <span class="gallery-zoom-indicator" aria-hidden="true">+</span>
          </div>
          <figcaption class="gallery-caption">
            <span class="gallery-item-category">${item.categoria}</span>
            <span class="gallery-item-title">${item.legenda}</span>
          </figcaption>
        </button>
      `;

      const cardBtn = figure.querySelector('.gallery-card');
      cardBtn.addEventListener('click', () => {
        openLightbox(index);
      });

      galleryContainer.appendChild(figure);
    });
  }

  // Render inicial
  renderGallery(filteredGallery);

  // Manipulação dos filtros
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedCategory = btn.getAttribute('data-filter');
      activeFilter = selectedCategory;

      filterButtons.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-pressed', 'false');
      });

      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');

      if (selectedCategory === 'Todos') {
        filteredGallery = [...GALERIA_TRABALHOS];
      } else {
        filteredGallery = GALERIA_TRABALHOS.filter(item => item.categoria.toLowerCase() === selectedCategory.toLowerCase());
      }

      // Transição suave
      galleryContainer.classList.add('is-filtering');
      setTimeout(() => {
        renderGallery(filteredGallery);
        galleryContainer.classList.remove('is-filtering');
      }, 150);
    });
  });

  initLightbox();
}

/* ==========================================================================
   4. LIGHTBOX ACESSÍVEL (Teclado, Esc, Touch Swipe)
   ========================================================================== */
function initLightbox() {
  const lightbox = document.getElementById('gallery-lightbox');
  if (!lightbox) return;

  const btnClose = lightbox.querySelector('.lightbox-close');
  const btnPrev = lightbox.querySelector('.lightbox-prev');
  const btnNext = lightbox.querySelector('.lightbox-next');
  const backdrop = lightbox.querySelector('.lightbox-backdrop');

  if (btnClose) btnClose.addEventListener('click', closeLightbox);
  if (backdrop) backdrop.addEventListener('click', closeLightbox);
  if (btnPrev) btnPrev.addEventListener('click', prevLightboxImage);
  if (btnNext) btnNext.addEventListener('click', nextLightboxImage);

  // Navegação por teclado no documento quando lightbox estiver aberto
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      prevLightboxImage();
    } else if (e.key === 'ArrowRight') {
      nextLightboxImage();
    }
  });

  // Gesto de Swipe no Mobile
  let touchStartX = 0;
  let touchEndX = 0;

  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        prevLightboxImage(); // Swipe para a direita -> Foto anterior
      } else {
        nextLightboxImage(); // Swipe para a esquerda -> Próxima foto
      }
    }
  }
}

let lastFocusedCard = null;

function openLightbox(index) {
  const lightbox = document.getElementById('gallery-lightbox');
  if (!lightbox || !filteredGallery[index]) return;

  lastFocusedCard = document.activeElement;
  currentLightboxIndex = index;
  updateLightboxContent();

  lightbox.classList.add('is-active');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');

  const closeBtn = lightbox.querySelector('.lightbox-close');
  if (closeBtn) closeBtn.focus();
}

function closeLightbox() {
  const lightbox = document.getElementById('gallery-lightbox');
  if (!lightbox) return;

  lightbox.classList.remove('is-active');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');

  if (lastFocusedCard) {
    lastFocusedCard.focus();
  }
}

function updateLightboxContent() {
  const lightbox = document.getElementById('gallery-lightbox');
  if (!lightbox || !filteredGallery[currentLightboxIndex]) return;

  const item = filteredGallery[currentLightboxIndex];
  const imgEl = lightbox.querySelector('.lightbox-image');
  const captionEl = lightbox.querySelector('.lightbox-caption-text');
  const categoryEl = lightbox.querySelector('.lightbox-category-tag');
  const counterEl = lightbox.querySelector('.lightbox-counter');

  if (imgEl) {
    imgEl.src = item.src;
    imgEl.alt = item.alt;
  }
  if (captionEl) captionEl.textContent = item.legenda;
  if (categoryEl) categoryEl.textContent = item.categoria;
  if (counterEl) {
    const currentNum = String(currentLightboxIndex + 1).padStart(2, '0');
    const totalNum = String(filteredGallery.length).padStart(2, '0');
    counterEl.textContent = `${currentNum} / ${totalNum}`;
  }
}

function prevLightboxImage() {
  if (filteredGallery.length <= 1) return;
  currentLightboxIndex = (currentLightboxIndex - 1 + filteredGallery.length) % filteredGallery.length;
  updateLightboxContent();
}

function nextLightboxImage() {
  if (filteredGallery.length <= 1) return;
  currentLightboxIndex = (currentLightboxIndex + 1) % filteredGallery.length;
  updateLightboxContent();
}

/* ==========================================================================
   5. COMPARADOR ANTES E DEPOIS (Slider Touch & Teclado)
   ========================================================================== */
function initBeforeAfterSliders() {
  const sliders = document.querySelectorAll('.before-after-slider');

  sliders.forEach(slider => {
    const afterWrap = slider.querySelector('.ba-after-wrap');
    const handle = slider.querySelector('.ba-handle');
    const rangeInput = slider.querySelector('.ba-range-input');

    if (!afterWrap || !handle) return;

    let isDragging = false;

    function setPosition(percentage) {
      const clamped = Math.max(0, Math.min(100, percentage));
      afterWrap.style.width = `${clamped}%`;
      handle.style.left = `${clamped}%`;

      if (rangeInput) {
        rangeInput.value = clamped;
        rangeInput.setAttribute('aria-valuenow', Math.round(clamped));
      }
    }

    // Posição inicial: 50%
    setPosition(50);

    // Controle pelo range input acessível
    if (rangeInput) {
      rangeInput.addEventListener('input', (e) => {
        setPosition(parseFloat(e.target.value));
      });
    }

    // Eventos de arrastar pelo mouse e touch diretamente no elemento
    function onPointerMove(e) {
      if (!isDragging) return;
      const rect = slider.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const offsetX = clientX - rect.left;
      const pct = (offsetX / rect.width) * 100;
      setPosition(pct);
    }

    function onPointerUp() {
      if (isDragging) {
        isDragging = false;
        slider.classList.remove('is-dragging');
        window.removeEventListener('mousemove', onPointerMove);
        window.removeEventListener('mouseup', onPointerUp);
        window.removeEventListener('touchmove', onPointerMove);
        window.removeEventListener('touchend', onPointerUp);
      }
    }

    function onPointerDown(e) {
      isDragging = true;
      slider.classList.add('is-dragging');
      onPointerMove(e);
      window.addEventListener('mousemove', onPointerMove);
      window.addEventListener('mouseup', onPointerUp);
      window.addEventListener('touchmove', onPointerMove, { passive: false });
      window.addEventListener('touchend', onPointerUp);
    }

    handle.addEventListener('mousedown', onPointerDown);
    handle.addEventListener('touchstart', onPointerDown, { passive: false });
    slider.addEventListener('mousedown', (e) => {
      // Ignora se clicou em outros botões
      if (e.target.tagName !== 'BUTTON' && e.target !== rangeInput) {
        onPointerDown(e);
      }
    });
  });
}

/* ==========================================================================
   6. ACORDEÃO DE DÚVIDAS FREQUENTES (Acessibilidade WAI-ARIA)
   ========================================================================== */
function initFaqAccordion() {
  const accordionButtons = document.querySelectorAll('.faq-trigger');

  accordionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const targetId = btn.getAttribute('aria-controls');
      const targetPanel = document.getElementById(targetId);

      // Fecha outros painéis para manter elegância editorial
      accordionButtons.forEach(otherBtn => {
        if (otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          const otherPanel = document.getElementById(otherBtn.getAttribute('aria-controls'));
          if (otherPanel) {
            otherPanel.style.maxHeight = null;
            otherPanel.classList.remove('is-open');
          }
        }
      });

      // Alterna o atual
      if (isExpanded) {
        btn.setAttribute('aria-expanded', 'false');
        if (targetPanel) {
          targetPanel.style.maxHeight = null;
          targetPanel.classList.remove('is-open');
        }
      } else {
        btn.setAttribute('aria-expanded', 'true');
        if (targetPanel) {
          targetPanel.classList.add('is-open');
          targetPanel.style.maxHeight = targetPanel.scrollHeight + 'px';
        }
      }
    });

    // Suporte a teclado: setas para cima e baixo
    btn.addEventListener('keydown', (e) => {
      const btnList = Array.from(accordionButtons);
      const currIdx = btnList.indexOf(btn);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIdx = (currIdx + 1) % btnList.length;
        btnList[nextIdx].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIdx = (currIdx - 1 + btnList.length) % btnList.length;
        btnList[prevIdx].focus();
      }
    });
  });
}

/* ==========================================================================
   7. BOTÃO FLUTUANTE MOBILE (Aparece após o Hero)
   ========================================================================== */
function initFloatingButton() {
  const floatingBtn = document.getElementById('mobile-floating-cta');
  const heroSection = document.getElementById('hero');

  if (!floatingBtn || !heroSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Quando o hero NÃO está visível, mostra o botão flutuante
      if (!entry.isIntersecting) {
        floatingBtn.classList.add('is-visible');
        floatingBtn.setAttribute('aria-hidden', 'false');
      } else {
        floatingBtn.classList.remove('is-visible');
        floatingBtn.setAttribute('aria-hidden', 'true');
      }
    });
  }, {
    root: null,
    threshold: 0.1
  });

  observer.observe(heroSection);
}

/* ==========================================================================
   8. ANIMAÇÕES SUTIS DE ENTRADA (IntersectionObserver)
   ========================================================================== */
function initScrollAnimations() {
  // Respeita prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animatedElements = document.querySelectorAll('.editorial-reveal');

  if (prefersReducedMotion) {
    animatedElements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.08
  });

  animatedElements.forEach(el => observer.observe(el));
}
