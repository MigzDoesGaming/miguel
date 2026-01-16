document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. HERO FADE OUT ON SCROLL ---
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Calculate opacity: starts at 1, goes to 0 when scrolled 70% of viewport
        let opacity = 1 - (scrollY / (windowHeight * 0.7));
        
        // Clamp values between 0 and 1
        opacity = Math.max(0, Math.min(1, opacity));
        
        // Apply opacity
        heroContent.style.opacity = opacity;
        
        // Optional: slight parallax effect for the hero text
        heroContent.style.transform = `translateY(${scrollY * 0.2}px)`;
    });

    // --- 2. FADE-IN & SLIDE ANIMATIONS (Intersection Observer) ---
    const observerOptions = {
        root: null,
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Target all elements with .fade-trigger class
    const animatedElements = document.querySelectorAll('.fade-trigger');
    animatedElements.forEach(el => observer.observe(el));
});
