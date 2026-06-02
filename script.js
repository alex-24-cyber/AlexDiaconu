// ===================================
// TERMINAL PORTFOLIO - JAVASCRIPT
// Alexandru Diaconu
// ===================================

// ── Matrix Rain ──────────────────────────────────────────────────────────────
function initMatrixRain() {
    const canvas = document.getElementById('matrix');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>?/\\アイウエオカキクケコサシスセソタチ';
    const fontSize = 13;
    let columns = Math.floor(canvas.width / fontSize);
    let drops   = Array(columns).fill(1);

    window.addEventListener('resize', () => {
        columns = Math.floor(canvas.width / fontSize);
        drops   = Array(columns).fill(1);
    });

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = `${fontSize}px JetBrains Mono, monospace`;

        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            const bright = Math.random() > 0.96;
            ctx.fillStyle = bright ? '#ffffff' : '#00ff41';
            ctx.globalAlpha = bright ? 0.9 : (Math.random() * 0.4 + 0.15);
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
        ctx.globalAlpha = 1;
    }

    setInterval(draw, 50);
}

// ── Scroll Progress ───────────────────────────────────────────────────────────
function updateScrollProgress() {
    const bar      = document.querySelector('.scroll-progress');
    const scrolled = window.pageYOffset || document.documentElement.scrollTop;
    const total    = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    bar.style.width = (scrolled / total * 100) + '%';
}

// ── Navbar scroll effect ──────────────────────────────────────────────────────
function updateNavbarOnScroll() {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 50);
}

// ── Mobile menu ───────────────────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ── Smooth Scroll ─────────────────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
        }
    });
});

// ── Active nav link ───────────────────────────────────────────────────────────
function updateActiveNavLink() {
    const sections  = document.querySelectorAll('section');
    const navLinks  = document.querySelectorAll('.nav-link');
    let   current   = '';

    sections.forEach(section => {
        const top = section.offsetTop - 100;
        if (window.pageYOffset >= top && window.pageYOffset < top + section.offsetHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
}

// ── Counter animation ─────────────────────────────────────────────────────────
function animateCounter(element, target, duration = 1600) {
    const increment = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

let countersAnimated = false;
const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
            countersAnimated = true;
            document.querySelectorAll('.stat-number[data-target]').forEach(el => {
                animateCounter(el, parseInt(el.getAttribute('data-target')));
            });
        }
    });
}, { threshold: 0.5 });

const statsEl = document.querySelector('.neofetch-output');
if (statsEl) counterObserver.observe(statsEl);

// ── Scroll reveal ─────────────────────────────────────────────────────────────
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.section, .skill-card, .project-card, .achievement-card, .timeline-item').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// ── Project filters ───────────────────────────────────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        document.querySelectorAll('.project-card').forEach(card => {
            const show = filter === 'all' || card.getAttribute('data-category') === filter;
            card.style.display = show ? '' : 'none';
            card.classList.toggle('hidden', !show);
        });
    });
});

// ── Project details toggle ────────────────────────────────────────────────────
function toggleProjectDetails(button) {
    const details = button.closest('.project-card-body, .project-card')
                          .querySelector('.project-details-content');
    button.classList.toggle('active');
    details.classList.toggle('active');
}

// ── Throttle helper ───────────────────────────────────────────────────────────
function throttle(fn, wait) {
    let t;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), wait);
    };
}

// ── Scroll handler ────────────────────────────────────────────────────────────
const onScroll = throttle(() => {
    updateScrollProgress();
    updateNavbarOnScroll();
    updateActiveNavLink();
}, 12);

// ── Init ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initMatrixRain();
    updateScrollProgress();
    updateNavbarOnScroll();
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', throttle(updateScrollProgress, 250));
});

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease';
        document.body.style.opacity    = '1';
    }, 80);
});
