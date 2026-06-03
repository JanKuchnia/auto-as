/* Auto AS Storefront - Interactive Logic */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Opening Hours Live Checker
  updateOpeningStatus();
  setInterval(updateOpeningStatus, 30000); // Check every 30 seconds

  // Initialize Hamburger Menu Morphing
  initMobileMenu();

  // Initialize Product Catalog Interactive Drawer
  initProductCatalog();

  // Initialize Testimonial Carousel
  initTestimonialCarousel();

  // Initialize Scroll Entry Animation Observer
  initScrollAnimations();

  // Initialize FAQ Accordion Handling
  initFaqAccordions();
});

/**
 * Real-time business opening status checker
 */
function updateOpeningStatus() {
  const now = new Date();
  
  // Calculate local Polish time (Central European Time / Central European Summer Time)
  const options = { timeZone: 'Europe/Warsaw', weekday: 'long', hour: '2-digit', minute: '2-digit', hour12: false };
  const formatter = new Intl.DateTimeFormat('en-US', options);
  const formattedParts = formatter.formatToParts(now);
  
  let weekday = '';
  let hour = 0;
  let minute = 0;
  
  formattedParts.forEach(part => {
    if (part.type === 'weekday') weekday = part.value; // e.g. "Monday"
    if (part.type === 'hour') hour = parseInt(part.value, 10);
    if (part.type === 'minute') minute = parseInt(part.value, 10);
  });
  
  const timeInMinutes = hour * 60 + minute;
  let isOpen = false;
  
  // Days of week returned by en-US formatting
  if (weekday !== 'Sunday') {
    if (weekday === 'Saturday') {
      // Sobota: 08:30 – 14:00 (510 min to 840 min)
      isOpen = timeInMinutes >= 510 && timeInMinutes < 840;
    } else {
      // Pon-Pt: 08:30 – 17:00 (510 min to 1020 min)
      isOpen = timeInMinutes >= 510 && timeInMinutes < 1020;
    }
  }
  
  const statusTexts = document.querySelectorAll('.opening-status-text');
  const statusIndicators = document.querySelectorAll('.opening-status-indicator');
  
  const labelText = isOpen ? 'OTWARTE' : 'ZAMKNIĘTE';
  
  statusTexts.forEach(el => {
    el.textContent = labelText;
    if (isOpen) {
      el.className = 'opening-status-text text-[11px] font-mono font-bold tracking-[0.15em] text-sage-green';
    } else {
      el.className = 'opening-status-text text-[11px] font-mono font-bold tracking-[0.15em] text-copper-amber';
    }
  });

  statusIndicators.forEach(el => {
    if (isOpen) {
      el.className = 'opening-status-indicator w-2.5 h-2.5 rounded-full bg-sage-green relative flex';
      el.innerHTML = '<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage-green opacity-75"></span><span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-sage-green"></span>';
    } else {
      el.className = 'opening-status-indicator w-2.5 h-2.5 rounded-full bg-copper-amber';
      el.innerHTML = '';
    }
  });
}

/**
 * Mobile Navigation Drawer Toggle and Animation
 */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const menuOverlay = document.getElementById('mobile-menu-overlay');
  const menuLinks = document.querySelectorAll('.mobile-nav-link');
  const body = document.body;

  if (!menuBtn || !menuOverlay) return;

  function toggleMenu() {
    const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', !isExpanded);
    
    // Toggle active classes
    menuOverlay.classList.toggle('opacity-0');
    menuOverlay.classList.toggle('pointer-events-none');
    menuOverlay.classList.toggle('active');
    
    // Toggle body scroll lock
    body.classList.toggle('overflow-hidden');

    // Hamburger SVG lines state transition
    const line1 = menuBtn.querySelector('.hamburger-line-1');
    const line2 = menuBtn.querySelector('.hamburger-line-2');
    
    if (line1 && line2) {
      if (isExpanded) {
        // Back to normal
        line1.setAttribute('transform', 'translate(0, 0) rotate(0)');
        line2.setAttribute('transform', 'translate(0, 0) rotate(0)');
      } else {
        // Morph into an 'X'
        line1.setAttribute('transform', 'translate(4, 4) rotate(45 4 4)');
        line2.setAttribute('transform', 'translate(4, 12) rotate(-45 4 12)');
      }
    }
  }

  menuBtn.addEventListener('click', toggleMenu);

  // Close menu when navigation link is clicked
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (menuOverlay.classList.contains('active')) {
        toggleMenu();
      }
    });
  });
}

/**
 * Product Catalog Data and Tab Controller
 */
function initProductCatalog() {
  const categoryData = {
    'parts': {
      title: 'Części eksploatacyjne',
      badge: 'Regularna wymiana = spokojne kilometry',
      description: 'Oferujemy szeroki asortyment elementów eksploatacyjnych od renomowanych marek z rynku niezależnego (IAM), zapewniających idealny balans ceny do jakości.',
      items: [
        'Filtry: oleju, kabinowe (węglowe), powietrza, paliwa',
        'Układ hamulcowy: klocki, tarcze, bębny, przewody elastyczne',
        'Zawieszenie: wahacze, sworznie, tuleje metalowo-gumowe, amortyzatory',
        'Układ kierowniczy: drążki, końcówki drążków, osłony',
        'Układ napędowy: paski rozrządu, paski klinowe, świece zapłonowe i żarowe'
      ],
      brands: ['Filtron', 'Mann-Filter', 'Bosch', 'Brembo', 'ATE', 'TRW', 'Contitech', 'Febi Bilstein']
    },
    'oils': {
      title: 'Oleje silnikowe',
      badge: 'Właściwy olej to dłuższe życie silnika',
      description: 'Zapewniamy oleje w oryginalnych pojemnościach (1L, 4L, 5L) dopasowane do najnowszych i starszych specyfikacji silnikowych polskich kierowców.',
      items: [
        'Syntetyki o niskim popiele (Low SAPS) do silników z filtrem cząstek stałych (DPF/GPF)',
        'Oleje półsyntetyczne i mineralne do silników o większych przebiegach',
        'Lepkości: 5W-30, 5W-40, 10W-40, 0W-20, 5W-20',
        'Oleje przekładniowe do skrzyni manualnych i automatycznych',
        'Płyny do wspomagania układu kierowniczego'
      ],
      brands: ['Castrol', 'Shell', 'Motul', 'Valvoline', 'Mobil 1', 'Total', 'Liqui Moly', 'Elf']
    },
    'chemistry': {
      title: 'Chemia i płyny eksploatacyjne',
      badge: 'Zadbane auto to bezpieczne auto',
      description: 'Wszystkie płyny niezbędne do prawidłowej temperatury pracy podzespołów i ochrony przed korozją w zmiennym klimacie.',
      items: [
        'Płyny chłodnicze (G12, G12+, G13) - koncentraty i gotowe płyny',
        'Płyny hamulcowe (DOT 3, DOT 4, DOT 5.1)',
        'Płyny do spryskiwaczy: zimowe (odporne na silne mrozy) oraz letnie',
        'Preparaty wielofunkcyjne, odrdzewiacze (WD-40, penetranty)',
        'Smary techniczne: miedziowe, grafitowe, silikonowe, do zacisków'
      ],
      brands: ['K2', 'Sonax', 'Borygo', 'Liqui Moly', 'WD-40', 'Castrol']
    },
    'detailing': {
      title: 'Detailing i pielęgnacja',
      badge: 'Efekt „prosto z salonu" w Twoim garażu',
      description: 'Dla hobbystów oraz profesjonalistów chcących zadbać o połysk lakieru, konserwację uszczelek oraz czystość wnętrza.',
      items: [
        'Pielęgnacja zewnętrzna: szampony, woski twarde, powłoki hydrofobowe, glinki',
        'Czyszczenie wnętrza: preparaty do kokpitu, APC, pianki do tapicerki i skóry',
        'Środki do felg i opon: tzw. „krwawa felga", czernidła',
        'Akcesoria: puszyste mikrofibry, aplikatory, glinki, rękawice'
      ],
      brands: ['ADBL', 'Shiny Garage', 'Meguiar\'s', 'Soft99', 'Sonax', 'K2']
    },
    'accessories': {
      title: 'Akcesoria samochodowe',
      badge: 'Małe rzeczy. Duże znaczenie',
      description: 'Wyposażenie dodatkowe wymagane przepisami drogowymi oraz gadżety podnoszące komfort codziennej jazdy.',
      items: [
        'Pióra wycieraczek przednich i tylnych (szkieletowe i płaskie)',
        'Żarówki samochodowe: halogenowe (H7, H4, H1), ksenony, oświetlenie LED wnętrza',
        'Bezpieczeństwo: apteczki DIN, trójkąty ostrzegawcze, gaśnice proszkowe, kamizelki',
        'Akcesoria sezonowe: skrobaczki, szczotki do śniegu, odmrażacze',
        'Drobne narzędzia warsztatowe, opaski, bezpieczniki, bezpieczniki płytkowe'
      ],
      brands: ['Osram', 'Philips', 'Bosma', 'Valeo', 'Alca', 'Wunder-Baum']
    },
    'suspension': {
      title: 'Zawieszenie i hamulce',
      badge: 'Pewne hamowanie. Stabilna jazda',
      description: 'Kluczowe podzespoły podwozia odpowiadające bezpośrednio za drogę hamowania i precyzję prowadzenia w zakrętach.',
      items: [
        'Amortyzatory gazowe i olejowe, odboje i osłony',
        'Sprężyny zawieszenia o standardowej charakterystyce',
        'Wahacze kompletne, sworznie wahacza, tuleje',
        'Łączniki stabilizatora, gumy stabilizatora',
        'Klocki hamulcowe i tarcze o wysokiej odporności termicznej'
      ],
      brands: ['Lemförder', 'Sachs', 'Kayaba (KYB)', 'TRW', 'Febi Bilstein', 'Delphi', 'Brembo', 'ATE']
    },
    'electrical': {
      title: 'Oświetlenie i elektryka',
      badge: 'Dobra widoczność = dobra decyzja na drodze',
      description: 'Komponenty instalacji elektrycznej samochodu zapewniające sprawne uruchamianie silnika i bezawaryjne działanie odbiorników prądu.',
      items: [
        'Żarówki główne i pomocnicze (tradycyjne i wzmocnione +150%)',
        'Bezpieczniki topikowe (mikro, mini, standard) i przekaźniki',
        'Klemy akumulatora, kable rozruchowe miedziane',
        'Czujniki silnikowe (położenia wału, temperatury płynu, ciśnienia oleju)',
        'Czujniki ABS i czujniki zużycia klocków hamulcowych'
      ],
      brands: ['Osram', 'Philips', 'Bosch', 'Bosma', 'Febi Bilstein', 'Hella']
    }
  };

  const cards = document.querySelectorAll('.category-card');
  const drawer = document.getElementById('catalog-drawer');
  const detailTitle = document.getElementById('drawer-title');
  const detailBadge = document.getElementById('drawer-badge');
  const detailDesc = document.getElementById('drawer-desc');
  const itemsList = document.getElementById('drawer-items-list');
  const brandsList = document.getElementById('drawer-brands-list');

  if (cards.length === 0 || !drawer) return;

  // Active class constant
  const activeClass = 'border-cyber-blue';
  const inactiveClass = 'border-slate-200';

  function displayCategory(catId) {
    const data = categoryData[catId];
    if (!data) return;

    // Set textual details
    detailTitle.textContent = data.title;
    detailBadge.textContent = data.badge;
    detailDesc.textContent = data.description;

    // Populate list items
    itemsList.innerHTML = '';
    data.items.forEach(item => {
      const li = document.createElement('li');
      li.className = 'flex items-start text-sm text-slate-700 font-sans';
      li.innerHTML = `
        <svg class="w-4 h-4 text-cyber-blue mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
        <span>${item}</span>
      `;
      itemsList.appendChild(li);
    });

    // Populate brands list (badges)
    brandsList.innerHTML = '';
    data.brands.forEach(brand => {
      const span = document.createElement('span');
      span.className = 'px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-xs font-mono text-slate-700 select-none hover:border-cyber-blue hover:text-cyber-blue transition-colors duration-300';
      span.textContent = brand;
      brandsList.appendChild(span);
    });

    // Smooth reveal animation
    drawer.classList.remove('hidden');
    drawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Add click listener to cards
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const catId = card.getAttribute('data-category');
      
      // Update visual border highlights
      cards.forEach(c => {
        c.classList.remove(activeClass, 'bg-white');
        c.classList.add(inactiveClass);
        // Dim inactive cards slightly to emphasize selected
        c.style.opacity = '0.65';
      });

      card.classList.remove(inactiveClass);
      card.classList.add(activeClass, 'bg-white');
      card.style.opacity = '1';

      displayCategory(catId);
    });
  });

  // Load first category details by default on desktop
  if (window.innerWidth >= 1024) {
    cards[0].click();
  }
}

/**
 * Slide control for social testimonials carousel
 */
function initTestimonialCarousel() {
  const track = document.getElementById('carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.getElementById('carousel-prev-btn');
  const nextBtn = document.getElementById('carousel-next-btn');
  const indicatorsContainer = document.getElementById('carousel-indicators');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  const slideCount = slides.length;

  // Generate indicator dots
  indicatorsContainer.innerHTML = '';
  for (let i = 0; i < slideCount; i++) {
    const dot = document.createElement('button');
    dot.className = `w-2 h-2 rounded-full transition-all duration-300 ${i === 0 ? 'bg-cyber-blue w-6' : 'bg-slate-300'}`;
    dot.setAttribute('aria-label', `Pokaż opinię ${i + 1}`);
    dot.addEventListener('click', () => {
      goToSlide(i);
    });
    indicatorsContainer.appendChild(dot);
  }

  const dots = indicatorsContainer.querySelectorAll('button');

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update dots
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.remove('bg-slate-300');
        dot.classList.add('bg-cyber-blue', 'w-6');
      } else {
        dot.classList.remove('bg-cyber-blue', 'w-6');
        dot.classList.add('bg-slate-300');
      }
    });

    // Disable buttons at bounds
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex === slideCount - 1;
  }

  function goToSlide(index) {
    if (index < 0 || index >= slideCount) return;
    currentIndex = index;
    updateCarousel();
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
    });
  }

  // Initial update
  updateCarousel();

  // Support swipe gesture on mobile
  let startX = 0;
  let endX = 0;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50;
    if (startX - endX > swipeThreshold) {
      // Swipe Left -> next
      goToSlide(currentIndex + 1);
    } else if (endX - startX > swipeThreshold) {
      // Swipe Right -> prev
      goToSlide(currentIndex - 1);
    }
  }
}

/**
 * Native CSS/JS entry animation triggers using Intersection Observer
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.reveal-on-scroll');

  // If user prefers reduced motion, disable animations instantly
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    animatedElements.forEach(el => {
      el.classList.remove('reveal-on-scroll');
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.filter = 'none';
    });
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px', // Trigger slightly before element enters
    threshold: 0.1 // 10% visible
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Unobserve once animation is executed
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => {
    observer.observe(el);
  });
}

/**
 * FAQ Accordion smooth height transitions
 */
function initFaqAccordions() {
  const detailsElements = document.querySelectorAll('#faq-accordion details');

  detailsElements.forEach(el => {
    const summary = el.querySelector('summary');
    const content = el.querySelector('.accordion-content');

    if (!summary || !content) return;

    summary.addEventListener('click', (e) => {
      // Prevent default browser instant toggle
      e.preventDefault();

      if (el.hasAttribute('open')) {
        // Shrink animation
        content.style.maxHeight = '0px';
        content.style.opacity = '0';
        
        setTimeout(() => {
          el.removeAttribute('open');
        }, 300); // matches style transition duration
      } else {
        // Close all other accordions first (accordion style)
        detailsElements.forEach(otherEl => {
          if (otherEl !== el && otherEl.hasAttribute('open')) {
            const otherContent = otherEl.querySelector('.accordion-content');
            if (otherContent) {
              otherContent.style.maxHeight = '0px';
              otherContent.style.opacity = '0';
            }
            otherEl.removeAttribute('open');
          }
        });

        // Open animation
        el.setAttribute('open', '');
        // Force calculation of scrollHeight
        const height = content.scrollHeight;
        content.style.maxHeight = `${height}px`;
        content.style.opacity = '1';
      }
    });
  });
}
