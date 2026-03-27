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


    // --- Contact CTA cards ---
    const ctaCards = document.getElementById('contactFormWrapper');
    const ctaCardsContainer = document.querySelector('.contact-cta-cards');
    const contactFormBack = document.getElementById('contactFormBack');
    const contactFormLabel = document.getElementById('contactFormLabel');
    const contactSubject = document.getElementById('contactSubject');

    // "Share Your Look" opens the showcase modal
    document.getElementById('ctaReview').addEventListener('click', () => {
        document.getElementById('showcaseModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Order & Compliment cards show the contact form
    ['ctaOrder', 'ctaCompliment'].forEach(id => {
        document.getElementById(id).addEventListener('click', function() {
            const subject = this.dataset.subject;
            contactSubject.value = subject;
            contactFormLabel.textContent = subject;
            ctaCardsContainer.style.display = 'none';
            ctaCards.style.display = '';
        });
    });

    contactFormBack.addEventListener('click', () => {
        ctaCards.style.display = 'none';
        ctaCardsContainer.style.display = '';
        contactForm.reset();
    });

    // --- Contact form handling ---
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;

        fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                btn.textContent = 'Sent! ✓';
                btn.style.backgroundColor = 'var(--color-primary)';
                btn.style.borderColor = 'var(--color-primary)';
                contactForm.reset();
                setTimeout(() => {
                    ctaCards.style.display = 'none';
                    ctaCardsContainer.style.display = '';
                }, 2000);
            } else {
                btn.textContent = 'Oops — try again';
                btn.style.backgroundColor = '#c75454';
            }
        })
        .catch(() => {
            btn.textContent = 'Oops — try again';
            btn.style.backgroundColor = '#c75454';
        })
        .finally(() => {
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
                btn.style.borderColor = '';
                btn.disabled = false;
            }, 3000);
        });
    });

    // --- Load showcase from Google Sheet ---
    const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR35cJsKo5InFpdwNPrTM-melB0WoWYjdStRcfWiynu2QpwESSfXfTj7SLdrGFUX5iGAnwjeTTvFVPu/pub?output=csv';
    const showcaseGrid = document.getElementById('showcaseGrid');

    function parseCSV(text) {
        const lines = [];
        let current = '';
        let inQuotes = false;
        for (let i = 0; i < text.length; i++) {
            const ch = text[i];
            if (ch === '"') {
                if (inQuotes && text[i + 1] === '"') {
                    current += '"';
                    i++;
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (ch === ',' && !inQuotes) {
                lines.push(current);
                current = '';
            } else if ((ch === '\n' || ch === '\r') && !inQuotes) {
                if (current || lines.length) {
                    lines.push(current);
                    current = '';
                }
                if (lines.length) break; // we process row by row below
            } else {
                current += ch;
            }
        }
        return lines;
    }

    function parseCSVRows(text) {
        const rows = [];
        let i = 0;
        while (i < text.length) {
            const row = [];
            let field = '';
            let inQuotes = false;
            while (i < text.length) {
                const ch = text[i];
                if (ch === '"') {
                    if (inQuotes && text[i + 1] === '"') {
                        field += '"';
                        i++;
                    } else {
                        inQuotes = !inQuotes;
                    }
                } else if (ch === ',' && !inQuotes) {
                    row.push(field);
                    field = '';
                } else if ((ch === '\n' || ch === '\r') && !inQuotes) {
                    row.push(field);
                    field = '';
                    i++;
                    if (text[i] === '\n') i++;
                    break;
                } else {
                    field += ch;
                }
                i++;
            }
            if (i >= text.length && field) row.push(field);
            if (row.length > 0 && row.some(f => f.trim())) rows.push(row);
        }
        return rows;
    }

    function renderShowcase(rows) {
        // rows[0] = headers, rest = data
        if (rows.length < 2) {
            showcaseGrid.innerHTML = '<p style="text-align:center;color:rgba(59,47,47,0.5);">No reviews yet — be the first!</p>';
            return;
        }

        const headers = rows[0].map(h => h.trim().toLowerCase());
        const nameIdx = headers.indexOf('name');
        const ratingIdx = headers.indexOf('rating');
        const reviewIdx = headers.indexOf('review');
        const imageIdx = headers.indexOf('image');

        let html = '';
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const name = row[nameIdx] || 'Anonymous';
            const rating = parseInt(row[ratingIdx]) || 5;
            const review = row[reviewIdx] || '';
            const image = row[imageIdx] || '';

            if (!review.trim() && !image.trim()) continue;

            const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);

            html += `
                <div class="showcase-card">
                    ${image ? `<div class="showcase-image"><img src="${image}" alt="Photo from ${name}" loading="lazy"></div>` : ''}
                    <div class="showcase-content">
                        <div class="showcase-stars">${stars}</div>
                        ${review.trim() ? `<p>"${review}"</p>` : ''}
                        <span class="showcase-author">— ${name}</span>
                    </div>
                </div>`;
        }

        showcaseGrid.innerHTML = html || '<p style="text-align:center;color:rgba(59,47,47,0.5);">No reviews yet — be the first!</p>';
    }

    fetch(SHEET_CSV_URL)
        .then(res => res.text())
        .then(text => renderShowcase(parseCSVRows(text)))
        .catch(() => {
            showcaseGrid.innerHTML = '<p style="text-align:center;color:rgba(59,47,47,0.5);">Couldn\'t load reviews right now.</p>';
        });

    // --- Showcase modal ---
    const showcaseModal = document.getElementById('showcaseModal');
    const openBtn = document.getElementById('openShowcaseForm');
    const closeBtn = document.getElementById('closeShowcaseForm');

    openBtn.addEventListener('click', () => {
        showcaseModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', () => {
        showcaseModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    showcaseModal.addEventListener('click', (e) => {
        if (e.target === showcaseModal) {
            showcaseModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && showcaseModal.classList.contains('active')) {
            showcaseModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // --- Star rating ---
    const stars = document.querySelectorAll('#starRating .star');
    const ratingInput = document.getElementById('ratingValue');

    function setStars(value) {
        stars.forEach(star => {
            star.classList.toggle('active', parseInt(star.dataset.value) <= value);
        });
        ratingInput.value = value;
    }

    setStars(5); // default

    stars.forEach(star => {
        star.addEventListener('click', () => setStars(parseInt(star.dataset.value)));
        star.addEventListener('mouseenter', () => {
            stars.forEach(s => {
                s.classList.toggle('active', parseInt(s.dataset.value) <= parseInt(star.dataset.value));
            });
        });
    });

    document.getElementById('starRating').addEventListener('mouseleave', () => {
        setStars(parseInt(ratingInput.value));
    });

    // --- Showcase form submission ---
    const showcaseForm = document.getElementById('showcaseForm');

    showcaseForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = showcaseForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;

        fetch(showcaseForm.action, {
            method: 'POST',
            body: new FormData(showcaseForm),
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                showcaseForm.reset();
                setStars(5);
                showcaseForm.style.display = 'none';
                const ty = document.createElement('div');
                ty.className = 'showcase-thankyou';
                ty.innerHTML = `
                    <h4>Thanks for your review! 🧶</h4>
                    <p>Want to share a photo of your piece? Send it to us:</p>
                    <p><strong>Instagram:</strong> <a href="https://www.instagram.com/theaudacityofthread" target="_blank" rel="noopener">@theaudacityofthread</a></p>
                    <p><strong>Email:</strong> <a href="mailto:hello@theaudacityofthread.com">hello@theaudacityofthread.com</a></p>
                `;
                showcaseForm.parentNode.insertBefore(ty, showcaseForm.nextSibling);
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
                btn.style.borderColor = '';
                btn.disabled = false;
                setTimeout(() => {
                    showcaseModal.classList.remove('active');
                    document.body.style.overflow = '';
                    showcaseForm.style.display = '';
                    ty.remove();
                }, 5000);
            } else {
                btn.textContent = 'Oops — try again';
                btn.style.backgroundColor = '#c75454';
                btn.disabled = false;
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                }, 3000);
            }
        })
        .catch(() => {
            btn.textContent = 'Oops — try again';
            btn.style.backgroundColor = '#c75454';
            btn.disabled = false;
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
            }, 3000);
        });
    });

});
