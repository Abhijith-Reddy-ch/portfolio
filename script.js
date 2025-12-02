// ==========================================
// MODERN PORTFOLIO - JAVASCRIPT
// ==========================================

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

    // Add scrolled class for styling
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

// Observe all elements with reveal class
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

        // Random positioning and sizing
        const size = Math.random() * 20 + 5;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${posX}%;
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
        // Create multiple particles for a "spray" feel
        for (let i = 0; i < 2; i++) {
            const particle = document.createElement('div');
            particle.classList.add('spray-particle');

            // Random color
            const color = colors[Math.floor(Math.random() * colors.length)];
            particle.style.background = color;

            // Set initial position
            particle.style.left = `${e.clientX}px`;
            particle.style.top = `${e.clientY}px`;

            document.body.appendChild(particle);

            // Randomize movement
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 60 + 20;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;

            // Animate
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

            setTimeout(() => {
                ripple.remove();
            }, 600);
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

    // Smooth transition
    card.style.transition = 'transform 0.1s ease';
});

// 5. Skill Item Bounce Animation
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;

    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px)';
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
    });
});

// Initialize all features
window.addEventListener('load', () => {
    createParticles();
    initSprayEffect();
    initRippleEffect();

    // Fade in body
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Smooth scroll to top button
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

// Console message
console.log('%c👋 Hello, Developer!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cBuilt with ❤️ using vanilla HTML, CSS, and JavaScript', 'font-size: 12px; color: #a1a1aa;');

