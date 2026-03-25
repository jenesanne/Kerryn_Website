/* ============================================
   THE AUDACITY OF THREAD — Main JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar scroll effect ---
    const navbar = document.getElementById('navbar');

    const handleNavScroll = () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleNavScroll, { passive: true });


    // --- Mobile nav toggle ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });


    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offset = navbar.offsetHeight + 20;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });


    // --- Gallery filter ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // --- Load More ---
    const ITEMS_PER_PAGE = 12;
    let visibleCount = ITEMS_PER_PAGE;
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    const updateGalleryVisibility = () => {
        const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
        let shown = 0;
        let totalMatching = 0;

        galleryItems.forEach(item => {
            const matches = activeFilter === 'all' || item.dataset.category === activeFilter;
            if (matches) {
                totalMatching++;
                if (shown < visibleCount) {
                    item.classList.remove('hidden');
                    item.style.display = '';
                    item.style.opacity = '0';
                    requestAnimationFrame(() => {
                        item.style.transition = 'opacity 0.4s ease';
                        item.style.opacity = '1';
                    });
                    shown++;
                } else {
                    item.classList.add('hidden');
                    item.style.display = 'none';
                }
            } else {
                item.classList.add('hidden');
                item.style.display = 'none';
            }
        });

        // Show/hide load more button
        if (loadMoreBtn) {
            loadMoreBtn.classList.toggle('hidden-btn', shown >= totalMatching);
        }
    };

    // Initial visibility
    updateGalleryVisibility();

    // Load More click
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            visibleCount += ITEMS_PER_PAGE;
            updateGalleryVisibility();
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Reset to first page when switching filters
            visibleCount = ITEMS_PER_PAGE;
            updateGalleryVisibility();
        });
    });


    // --- Lightbox ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    let currentLightboxIndex = 0;
    let lightboxImages = [];

    const openLightbox = (index) => {
        // Collect visible gallery items that have real images
        lightboxImages = Array.from(document.querySelectorAll('.gallery-item'))
            .filter(item => item.style.display !== 'none')
            .filter(item => item.querySelector('img'));

        if (lightboxImages.length === 0) return;

        currentLightboxIndex = index;
        updateLightbox();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const updateLightbox = () => {
        const item = lightboxImages[currentLightboxIndex];
        if (!item) return;

        const img = item.querySelector('img');
        const overlay = item.querySelector('.gallery-item-overlay');

        if (img) {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt || '';
        }

        if (overlay) {
            const title = overlay.querySelector('h3');
            lightboxCaption.textContent = title ? title.textContent : '';
        }
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        currentLightboxIndex = (currentLightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
        updateLightbox();
    });

    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        currentLightboxIndex = (currentLightboxIndex + 1) % lightboxImages.length;
        updateLightbox();
    });

    // Keyboard nav for lightbox
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') lightboxPrev.click();
        if (e.key === 'ArrowRight') lightboxNext.click();
    });

    // Attach click handlers to gallery items
    galleryItems.forEach((item) => {
        item.addEventListener('click', () => {
            // Only open lightbox if the item has a real image and is visible
            if (item.querySelector('img') && item.style.display !== 'none') {
                // Find this item's index among the currently visible images
                const visibleItems = Array.from(document.querySelectorAll('.gallery-item'))
                    .filter(i => i.style.display !== 'none' && i.querySelector('img'));
                const visibleIndex = visibleItems.indexOf(item);
                if (visibleIndex !== -1) {
                    openLightbox(visibleIndex);
                }
            }
        });
    });


    // --- Scroll reveal animations ---
    const revealElements = document.querySelectorAll(
        '.section-label, .section-title, .section-subtitle, ' +
        '.about-image, .about-content, ' +
        '.gallery-filters, .gallery-item, ' +
        '.service-card, .testimonial-card, ' +
        '.contact-info, .contact-form-wrapper'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));


    // --- Contact form handling ---
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // For now, just show a confirmation
        // Replace with actual form endpoint (Formspree, Netlify Forms, etc.)
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Sent! ✓';
        btn.style.backgroundColor = 'var(--color-primary)';
        btn.style.borderColor = 'var(--color-primary)';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.backgroundColor = '';
            btn.style.borderColor = '';
            btn.disabled = false;
            contactForm.reset();
        }, 3000);
    });

});
