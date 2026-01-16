document.addEventListener("DOMContentLoaded", () => {
    const splineHero = document.getElementById('spline-hero');

    // 1. Fade out the Hero as you scroll
    window.addEventListener('scroll', () => {
        const scrollVal = window.scrollY;
        const winHeight = window.innerHeight;
        
        // Fades from 1 to 0 over the first 80% of the screen
        let opacity = 1 - (scrollVal / (winHeight * 0.8));
        splineHero.style.opacity = Math.max(0, opacity);
    });

    // 2. Intersection Observer for fade-in elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-trigger').forEach(el => observer.observe(el));
});
