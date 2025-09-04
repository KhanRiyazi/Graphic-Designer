// DOM Elements
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.querySelector('.nav-links');
const resumeButton = document.getElementById('resumeButton');
const resumeModal = document.getElementById('resumeModal');
const closeModal = document.getElementById('closeModal');
const contactForm = document.getElementById('contactForm');

// Toggle mobile menu
menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.innerHTML = navLinks.classList.contains('active') ?
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Simple smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'white';
        header.style.backdropFilter = 'none';
    }
});

// Hero slideshow
const heroSlides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;

function changeSlide() {
    heroSlides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % heroSlides.length;
    heroSlides[currentSlide].classList.add('active');
}

setInterval(changeSlide, 4000);

// Resume modal functionality
resumeButton.addEventListener('click', () => {
    resumeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeModal.addEventListener('click', () => {
    resumeModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) {
        resumeModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-card h3');
    const speed = 200;

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = Math.ceil(target / speed);

        if (count < target) {
            counter.innerText = Math.min(count + increment, target);
            setTimeout(() => animateCounters(), 1);
        }
    });
}

// Start counter animation when stats section is in view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

observer.observe(document.querySelector('.stats'));

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simple form validation
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        // Here you would typically send the form data to a server
        alert('Thanks for your message! I\'ll get back to you soon.');
        contactForm.reset();
    }
});

// Instructions for updating the hero section with your own images
console.log("To update the hero section with your own images:");
console.log("1. Replace the background-image URLs in the .hero-slide elements");
console.log("2. Use images from your GitHub repos, Canva templates, and blog previews");
console.log("3. Make sure images are high-quality and relevant to your work");