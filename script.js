document.addEventListener("DOMContentLoaded", () => {
    const splineHero = document.getElementById('spline-hero');

    // 1. Smooth Fade-out for Spline Hero
    window.addEventListener('scroll', () => {
        const scrollVal = window.scrollY;
        const winHeight = window.innerHeight;
        
        // Fades out completely by the time you scroll 80% of the viewport
        let opacity = 1 - (scrollVal / (winHeight * 0.8));
        splineHero.style.opacity = Math.max(0, opacity);
    });

    // 2. Observer for Slide-in Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-trigger').forEach(el => observer.observe(el));
});
