// Particle Animation Background
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particles');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mousePosition = { x: 0, y: 0 };
        this.init();
        this.animate();
        this.setupEventListeners();
    }

    init() {
        this.resizeCanvas();
        this.createParticles();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.particles = [];
            this.createParticles();
        });

        window.addEventListener('mousemove', (e) => {
            this.mousePosition.x = e.clientX;
            this.mousePosition.y = e.clientY;
        });
    }

    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Boundary check
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(100, 255, 218, ${particle.opacity})`;
            this.ctx.fill();

            // Draw connections
            this.particles.slice(index + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = `rgba(100, 255, 218, ${0.1 * (1 - distance / 150)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            });

            // Mouse interaction
            const mouseDistance = Math.sqrt(
                Math.pow(particle.x - this.mousePosition.x, 2) + 
                Math.pow(particle.y - this.mousePosition.y, 2)
            );

            if (mouseDistance < 100) {
                const force = (100 - mouseDistance) / 100;
                particle.vx += (particle.x - this.mousePosition.x) * force * 0.01;
                particle.vy += (particle.y - this.mousePosition.y) * force * 0.01;
            }
        });
    }

    animate() {
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }
}

// Navigation functionality
class Navigation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.navMenu = document.getElementById('navMenu');
        this.navToggle = document.querySelector('.nav-toggle');
        this.init();
    }

    init() {
        this.handleScroll();
        this.setupSmoothScroll();
        this.setupActiveLink();
        this.setupMobileMenu();
        
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }

    setupSmoothScroll() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offset = 80;
                    const targetPosition = targetSection.offsetTop - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    this.navMenu.classList.remove('active');
                }
            });
        });
    }

    setupActiveLink() {
        const observerOptions = {
            rootMargin: '-40% 0px -40% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    this.navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        document.querySelectorAll('section[id]').forEach(section => {
            observer.observe(section);
        });
    }

    setupMobileMenu() {
        // Mobile menu toggle handled by toggleNav function
    }
}

// Toggle mobile navigation
function toggleNav() {
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.querySelector('.nav-toggle');
    
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    if (navMenu.classList.contains('active')) {
        navToggle.children[0].style.transform = 'rotate(-45deg) translateY(8px)';
        navToggle.children[1].style.opacity = '0';
        navToggle.children[2].style.transform = 'rotate(45deg) translateY(-8px)';
    } else {
        navToggle.children[0].style.transform = 'none';
        navToggle.children[1].style.opacity = '1';
        navToggle.children[2].style.transform = 'none';
    }
}

// Experience tabs functionality
function showExperience(tabName) {
    const tabs = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.experience-panel');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    panels.forEach(panel => panel.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

// Number counter animation for stats
class StatsCounter {
    constructor() {
        this.statNumbers = document.querySelectorAll('.stat-number');
        this.hasAnimated = false;
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.animateNumbers();
                    this.hasAnimated = true;
                }
            });
        }, { threshold: 0.5 });

        const statsSection = document.querySelector('.about-stats');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }

    animateNumbers() {
        this.statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateNumber = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateNumber);
                } else {
                    stat.textContent = target;
                }
            };

            updateNumber();
        });
    }
}

// Typing effect for hero section
class TypeWriter {
    constructor() {
        this.heroTitle = document.querySelector('.hero-title');
        this.titles = [
            'Cybersecurity Specialist',
            'Ethical Hacker',
            'Digital Forensics Analyst',
            'OSINT Researcher'
        ];
        this.currentTitle = 0;
        this.currentChar = 0;
        this.isDeleting = false;
        this.typeSpeed = 100;
        this.init();
    }

    init() {
        // Only run if we want the typing effect
        // Currently disabled as the static title looks good
    }

    type() {
        const fullText = this.titles[this.currentTitle];
        
        if (this.isDeleting) {
            this.currentChar--;
        } else {
            this.currentChar++;
        }

        const displayText = `${fullText.substring(0, this.currentChar)} & Ethical Hacker`;
        this.heroTitle.innerHTML = displayText;

        let typeSpeed = this.isDeleting ? 50 : 100;

        if (!this.isDeleting && this.currentChar === fullText.length) {
            typeSpeed = 2000;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentChar === 0) {
            this.isDeleting = false;
            this.currentTitle = (this.currentTitle + 1) % this.titles.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Scroll reveal animations
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.project-card, .skill-category');
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, observerOptions);

        this.elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s cubic-bezier(0.645, 0.045, 0.355, 1)';
            observer.observe(element);
        });
    }
}

// Form validation (for future contact form)
class FormHandler {
    constructor() {
        // Placeholder for future contact form functionality
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}

// Project filter functionality (for future implementation)
class ProjectFilter {
    constructor() {
        // Can add filter buttons for different project categories
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle system
    new ParticleSystem();
    
    // Initialize navigation
    new Navigation();
    
    // Initialize stats counter
    new StatsCounter();
    
    // Initialize scroll reveal
    new ScrollReveal();
    
    // Initialize typing effect (optional)
    // new TypeWriter();
    
    // Add smooth fade-in for hero content
    const heroElements = document.querySelectorAll('.greeting, .hero-name, .hero-title, .hero-description, .hero-cta');
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Console easter egg for fellow developers
    console.log('%c👨‍💻 Looking for a cybersecurity specialist?', 'color: #00ff9d; font-size: 20px; font-weight: bold;');
    console.log('%cHi there! I\'m Alexandru Diaconu, and I love diving deep into code.', 'color: #64ffda; font-size: 14px;');
    console.log('%cFeel free to reach out at alexdiaconu369@gmail.com', 'color: #8892b0; font-size: 12px;');
    console.log('%c🔒 Stay secure!', 'color: #00ff9d; font-size: 16px;');
});

// Performance optimization: Debounce scroll events
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Add parallax effect to hero section
window.addEventListener('scroll', debounce(() => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-content');
    if (parallax && scrolled < window.innerHeight) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        parallax.style.opacity = 1 - (scrolled / window.innerHeight);
    }
}));

// Prevent right-click on images (optional security feature)
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
        return false;
    }
});

// Loading animation (if needed in future)
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});