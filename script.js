document.addEventListener("DOMContentLoaded", () => {
    const splineHero = document.getElementById('spline-hero');
    const heroSection = document.querySelector('.hero-section');
    const contentWrapper = document.querySelector('.content-wrapper');

    window.addEventListener('scroll', () => {
        const scrollVal = window.scrollY;
        const winHeight = window.innerHeight;
        
        // --- 1. SHOE EXIT ---
        heroSection.style.transform = `translateY(-${scrollVal * 0.4}px)`;
        let shoeOpacity = 1 - (scrollVal / (winHeight * 0.5));
        splineHero.style.opacity = Math.max(0, shoeOpacity);
        splineHero.style.filter = `blur(${(scrollVal / winHeight) * 20}px)`;

        // --- 2. WHOLE SECTION BLUR FADE (Breathing Space Fix) ---
        // We start the fade in a bit later to give the shoe room to exit
        const fadeStart = winHeight * 0.4; 
        const fadeEnd = winHeight * 1.1;
        
        let progress = (scrollVal - fadeStart) / (fadeEnd - fadeStart);
        let clamped = Math.max(0, Math.min(1, progress));

        if (scrollVal > fadeStart) {
            // Apply blur and opacity to the WHOLE wrapper
            let blurVal = 30 - (clamped * 30);
            contentWrapper.style.filter = `blur(${blurVal}px)`;
            contentWrapper.style.opacity = clamped;
        } else {
            contentWrapper.style.filter = `blur(30px)`;
            contentWrapper.style.opacity = 0;
        }
    });

    // Intersection Observer for Portfolio and Footer (standard pop-in)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-trigger').forEach(el => observer.observe(el));
});
