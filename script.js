document.addEventListener("DOMContentLoaded", () => {
    const splineHero = document.getElementById('spline-hero');
    const heroSection = document.querySelector('.hero-section');

    window.addEventListener('scroll', () => {
        const scrollVal = window.scrollY;
        const winHeight = window.innerHeight;
        
        // 1. Move the shoe UP as you scroll (Parallax)
        // This makes it look like the shoe is exiting the top of the screen
        heroSection.style.transform = `translateY(-${scrollVal * 0.5}px)`;

        // 2. Faster Fade Out
        // The shoe will now be completely gone by 40% of the scroll
        let opacity = 1 - (scrollVal / (winHeight * 0.4));
        splineHero.style.opacity = Math.max(0, opacity);
        
        // 3. Optional Blur for smoothness
        let blurVal = (scrollVal / winHeight) * 15;
        splineHero.style.filter = `blur(${blurVal}px)`;
    });

    // Keep your existing Intersection Observer for the fade-triggers
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-trigger').forEach(el => observer.observe(el));
});
