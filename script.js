// ============================================
// PARTICLE SYSTEM
// ============================================
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = Math.random() > 0.5 ? 'rgba(0, 255, 157, 0.6)' : 'rgba(56, 189, 248, 0.6)';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Add glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
    }
}

let particles = [];
const particleCount = 100;

function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections between nearby particles
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.strokeStyle = `rgba(0, 255, 157, ${0.15 * (1 - distance / 100)})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animateParticles);
}

// ============================================
// TYPEWRITER EFFECT
// ============================================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    element.style.opacity = '1';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================
function reveal() {
    const reveals = document.querySelectorAll('section');

    reveals.forEach(section => {
        const windowHeight = window.innerHeight;
        const elementTop = section.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            section.classList.add('reveal');
        }
    });
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================
function toggleMenu() {
    document.getElementById('mainMenu').classList.toggle('active');
}

// ============================================
// PROJECT ACCORDION
// ============================================
function toggleProject(header) {
    const details = header.nextElementSibling;
    const toggle = header.querySelector('.project-toggle');

    details.classList.toggle('active');
    toggle.classList.toggle('active');
}

// ============================================
// SMOOTH SCROLL FOR NAVIGATION
// ============================================
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            document.getElementById('mainMenu').classList.remove('active');
        }
    });
});

// ============================================
// MOUSE TRAIL EFFECT
// ============================================
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Create floating particle at mouse position occasionally
    if (Math.random() > 0.95) {
        createMouseParticle(e.clientX, e.clientY);
    }
});

function createMouseParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = 'rgba(0, 255, 157, 0.8)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';
    particle.style.boxShadow = '0 0 10px rgba(0, 255, 157, 0.8)';
    particle.style.animation = 'float-up 1s ease-out forwards';

    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 1000);
}

// Add float-up animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes float-up {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-50px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// INITIALIZATION
// ============================================
window.addEventListener('load', () => {
    // Initialize particles
    initParticles();
    animateParticles();

    // Typewriter effect for status
    const statusElement = document.getElementById('typewriter');
    const statusText = statusElement.textContent;
    setTimeout(() => {
        typeWriter(statusElement, statusText, 50);
    }, 500);

    // Initial reveal check
    setTimeout(() => {
        reveal();
    }, 100);
});

// Scroll event listener
window.addEventListener('scroll', reveal);

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// Add random glitch effect to header occasionally
setInterval(() => {
    const header = document.querySelector('header h1');
    if (Math.random() > 0.95) {
        header.style.animation = 'none';
        setTimeout(() => {
            header.style.animation = 'glitch-anim 3s infinite';
        }, 100);
    }
}, 3000);
