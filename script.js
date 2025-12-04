// ===================================
// MODERN PORTFOLIO - JAVASCRIPT
// Alexandru Diaconu
// ===================================

// Scroll Progress Bar
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
}

// Navigation Scroll Effect
function updateNavbarOnScroll() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link Highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Animated Counter for Stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Initialize Counters when in viewport
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

let countersAnimated = false;

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
            countersAnimated = true;
            document.querySelectorAll('.stat-number[data-target]').forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
            });
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    counterObserver.observe(statsSection);
}

// Scroll Reveal Animation
function revealOnScroll() {
    const reveals = document.querySelectorAll('.section');

    reveals.forEach(section => {
        const windowHeight = window.innerHeight;
        const elementTop = section.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            section.classList.add('reveal', 'active');
        }
    });
}

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filterValue === 'all') {
                card.classList.remove('hidden');
                setTimeout(() => {
                    card.style.display = 'block';
                }, 10);
            } else {
                const category = card.getAttribute('data-category');
                if (category === filterValue) {
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.style.display = 'block';
                    }, 10);
                } else {
                    card.style.display = 'none';
                }
            }
        });
    });
});

// Project Details Toggle
function toggleProjectDetails(button) {
    const projectCard = button.closest('.project-card');
    const detailsContent = projectCard.querySelector('.project-details-content');
    const icon = button.querySelector('i');

    button.classList.toggle('active');
    detailsContent.classList.toggle('active');

    if (detailsContent.classList.contains('active')) {
        icon.style.transform = 'rotate(180deg)';
    } else {
        icon.style.transform = 'rotate(0deg)';
    }
}

// Parallax Effect for Hero Section
function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-content, .hero-visual');

    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}

// Mouse Cursor Effect (Optional enhancement)
function createMouseTrail() {
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        const diffX = mouseX - cursorX;
        const diffY = mouseY - cursorY;

        cursorX += diffX * 0.1;
        cursorY += diffY * 0.1;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();
}

// Intersection Observer for Animations
const animateOnScrollObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    },
    {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    }
);

// Observe all sections for scroll animations
document.querySelectorAll('.section').forEach(section => {
    section.classList.add('reveal');
    animateOnScrollObserver.observe(section);
});

// Observe skill cards
document.querySelectorAll('.skill-card').forEach(card => {
    card.classList.add('reveal');
    animateOnScrollObserver.observe(card);
});

// Observe project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.classList.add('reveal');
    animateOnScrollObserver.observe(card);
});

// Observe achievement cards
document.querySelectorAll('.achievement-card').forEach(card => {
    card.classList.add('reveal');
    animateOnScrollObserver.observe(card);
});

// Typing Effect for Hero (Optional)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Gradient Animation for Orbs
function animateGradientOrbs() {
    const orbs = document.querySelectorAll('.gradient-orb');
    orbs.forEach((orb, index) => {
        orb.style.animation = `float ${20 + index * 5}s infinite ease-in-out`;
        orb.style.animationDelay = `${index * 2}s`;
    });
}

// Add hover effect to cards
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.skill-card, .project-card, .achievement-card, .contact-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });

        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
}

// Lazy Loading Images (if you add images later)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Performance: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Scroll Event Handlers (Throttled)
const throttledScrollHandler = throttle(() => {
    updateScrollProgress();
    updateNavbarOnScroll();
    updateActiveNavLink();
    revealOnScroll();
}, 10);

// Initialize on Page Load
document.addEventListener('DOMContentLoaded', () => {
    // Initial calls
    updateScrollProgress();
    updateNavbarOnScroll();
    revealOnScroll();
    animateGradientOrbs();
    addCardHoverEffects();
    lazyLoadImages();

    // Add scroll event listener
    window.addEventListener('scroll', throttledScrollHandler);

    // Add resize event listener
    window.addEventListener('resize', throttle(() => {
        revealOnScroll();
    }, 250));

    console.log('Portfolio loaded successfully! 🚀');
});

// Smooth page reveal on load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is not visible
        console.log('Page hidden - pausing animations');
    } else {
        // Resume animations when page becomes visible
        console.log('Page visible - resuming animations');
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});

// Service Worker Registration (for PWA if needed)
if ('serviceWorker' in navigator) {
    // Uncomment when you want to add PWA support
    // navigator.serviceWorker.register('/sw.js')
    //     .then(reg => console.log('Service Worker registered', reg))
    //     .catch(err => console.error('Service Worker registration failed', err));
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateScrollProgress,
        updateNavbarOnScroll,
        animateCounter,
        toggleProjectDetails
    };
}
