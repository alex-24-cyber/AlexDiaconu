function toggleProject(header) {
    const details = header.nextElementSibling;
    const toggle = header.querySelector('.project-toggle');
    
    details.classList.toggle('active');
    toggle.classList.toggle('active');
}

function toggleMenu() {
    document.getElementById('mainMenu').classList.toggle('active');
}

// Smooth scroll for navigation links
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