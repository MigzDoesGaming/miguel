document.addEventListener("DOMContentLoaded", () => {
    
    // 1. HERO FADE OUT LOGIC
    const heroSection = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Calculate opacity: 1 at top, 0 when scrolled down 80% of viewport
        let opacity = 1 - (scrollPosition / (windowHeight * 0.8));
        
        // Ensure opacity stays between 0 and 1
        if(opacity < 0) opacity = 0;
        if(opacity > 1) opacity = 1;
        
        // Apply opacity to hero content
        heroSection.style.opacity = opacity;
    });


    // 2. FADE-IN + SLIDE-IN ANIMATIONS (Intersection Observer)
    const observerOptions = {
        root: null, // viewport
        threshold: 0.2, // Trigger when 20% of element is visible
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add class to trigger CSS animation
                entry.target.classList.add('active');
                
                // Optional: Stop observing once animated (remove if you want it to animate every time)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements with the class 'fade-trigger'
    const animatedElements = document.querySelectorAll('.fade-trigger');
    animatedElements.forEach(el => observer.observe(el));
});
