// ==========================================
// MODERN PORTFOLIO - JAVASCRIPT
// ==========================================

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // ignore Download CV and external links
        const href = this.getAttribute("href");
        if (href && !href.startsWith("#")) return;

        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(element => {
    observer.observe(element);
});

// ==========================================
// ENHANCED INTERACTIVITY
// ==========================================

// 1. Particle Background System
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 20 + 5;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${posX}% ;
            top: ${posY}%;
            animation-duration: ${duration}s;
            animation-delay: -${delay}s;
        `;

        hero.appendChild(particle);
    }
}

// 2. Spray/Particle Mouse Effect
function initSprayEffect() {
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#3b82f6'];

    document.addEventListener('mousemove', (e) => {
        for (let i = 0; i < 2; i++) {
            const particle = document.createElement('div');
            particle.classList.add('spray-particle');

            const color = colors[Math.floor(Math.random() * colors.length)];
            particle.style.background = color;

            particle.style.left = `${e.clientX}px`;
            particle.style.top = `${e.clientY}px`;

            document.body.appendChild(particle);

            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 60 + 20;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;

            const animation = particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 0.8 },
                { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
            ], {
                duration: 600 + Math.random() * 400,
                easing: 'cubic-bezier(0, .9, .57, 1)'
            });

            animation.onfinish = () => particle.remove();
        }
    });
}

// 3. Button Ripple Effect
function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// 4. Enhanced 3D Card Tilt
const projectCards = document.querySelectorAll('.project-card, .interest-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });

    card.style.transition = 'transform 0.1s ease';
});

// 5. Skill Bounce Animation
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    item.addEventListener('mouseenter', () => item.style.transform = 'translateY(-10px)');
    item.addEventListener('mouseleave', () => item.style.transform = 'translateY(0)');
});

// Initialize effects
window.addEventListener('load', () => {
    createParticles();
    initSprayEffect();
    initRippleEffect();

    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Scroll-To-Top Button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-top-btn';
document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
// ================================================
// DOWNLOAD CV — robust open-in-new-tab + download
// ================================================

/**
 * openAndDownload:
 * - opens a blank tab synchronously (best chance to avoid popup blockers)
 * - tries to fetch the PDF and create a blob URL
 * - points the opened tab to the blob URL (user sees PDF)
 * - triggers a hidden <a download> click to save the file with the desired filename
 * - falls back gracefully on errors
 */
async function openAndDownload(url, filename = 'Abhijith_Reddy_CV.pdf') {
    console.log('[CV] openAndDownload start', { url, filename });

    // open blank tab early to avoid popup blockers
    let newTab = null;
    try {
        newTab = window.open('', '_blank');
        if (!newTab) console.warn('[CV] blank tab blocked or returned null');
    } catch (err) {
        console.warn('[CV] window.open threw', err);
    }

    try {
        const resp = await fetch(url, { cache: 'no-store' });
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

        const blob = await resp.blob();
        const blobUrl = URL.createObjectURL(blob);
        console.log('[CV] fetched blob, blobUrl created');

        // Try to show PDF in the newTab; if newTab blocked, open blobUrl in a new tab
        if (newTab && !newTab.closed) {
            try {
                newTab.location.href = blobUrl;
                console.log('[CV] navigated blank tab to blobUrl');
            } catch (err) {
                console.warn('[CV] could not set newTab.location — opening blobUrl in new tab', err);
                window.open(blobUrl, '_blank');
            }
        } else {
            window.open(blobUrl, '_blank');
            console.log('[CV] opened blobUrl in new tab (no blank tab available)');
        }

        // Trigger download using the blob URL
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        console.log('[CV] download triggered via blob URL');

        // cleanup
        setTimeout(() => {
            try { URL.revokeObjectURL(blobUrl); console.log('[CV] revoked blob url'); }
            catch (e) { /* ignore */ }
        }, 15000);
        return;
    } catch (err) {
        console.error('[CV] fetch -> blob failed:', err);
    }

    // If fetch fails, open original url in a new tab (but make sure we don't navigate current tab)
    try {
        if (newTab && !newTab.closed) {
            newTab.location.href = url;
            console.log('[CV] opened original url in blank tab as fallback');
        } else {
            window.open(url, '_blank');
            console.log('[CV] opened original url in new tab as fallback');
        }
    } catch (err) {
        console.error('[CV] fallback open failed:', err);
    }

    // Try native download as a last-ditch attempt (may be ignored for cross-origin)
    try {
        const a2 = document.createElement('a');
        a2.href = url;
        a2.download = filename;
        document.body.appendChild(a2);
        a2.click();
        a2.remove();
        console.log('[CV] attempted native download fallback');
    } catch (err) {
        console.warn('[CV] native download fallback failed or ignored by browser', err);
    }
}

/**
 * bindCVDownload:
 * Finds anchors that point to CV PDF (case-insensitive) or have download attribute
 * and binds click handler which calls openAndDownload.
 */
function bindCVDownload() {
    // Use getAttribute('href') to check relative paths reliably and avoid absolute URL surprises
    const anchors = Array.from(document.querySelectorAll('a'));
    const links = anchors.filter(a => {
        const hrefAttr = (a.getAttribute('href') || '').toLowerCase();
        const hasDownload = a.hasAttribute('download');
        const looksLikeCV = hrefAttr.endsWith('cv.pdf') || hrefAttr.endsWith('curriculum-vitae.pdf') || hrefAttr.includes('/cv') || hrefAttr.includes('cv');
        return hasDownload || looksLikeCV;
    });

    if (!links.length) {
        console.log('[CV] no CV-like links found to bind');
        return;
    }

    links.forEach(link => {
        if (link.dataset.cvBound) return; // avoid double-binding
        link.dataset.cvBound = 'true';

        // ensure the anchor won't accidentally navigate current tab later
        link.setAttribute('role', 'button');

        link.addEventListener('click', function (e) {
            // allow user modifiers (open in new tab) to behave naturally
            if (e.ctrlKey || e.metaKey || e.button === 1) {
                console.log('[CV] user used modifier key — letting browser handle it normally');
                return;
            }

            e.preventDefault();

            // use getAttribute to keep relative path (works with local assets)
            const hrefAttr = link.getAttribute('href');
            const url = new URL(hrefAttr, window.location.href).toString();
            const filename = link.getAttribute('download') || 'Abhijith_Reddy_CV.pdf';

            console.log('[CV] click intercepted — starting open+download', { url, filename });
            openAndDownload(url, filename);
        });
    });

    console.log('[CV] bindCVDownload attached to', links.length, 'link(s)');
}

// bind on DOMContentLoaded (safe even if script is at end)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindCVDownload);
} else {
    bindCVDownload();
}




// Console message
console.log('%c👋 Hello, Developer!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cBuilt with ❤️ using vanilla HTML, CSS, and JavaScript', 'font-size: 12px; color: #a1a1aa;');
