document.addEventListener("DOMContentLoaded", () => {
    const splineHero = document.getElementById('spline-hero');
    const heroSection = document.querySelector('.hero-section');
    const contentWrapper = document.querySelector('.content-wrapper');

    window.addEventListener('scroll', () => {
        const scrollVal = window.scrollY;
        const winHeight = window.innerHeight;
        
        // 1. Shoe Exit Logic
        heroSection.style.transform = `translateY(-${scrollVal * 0.4}px)`;
        let shoeOpacity = 1 - (scrollVal / (winHeight * 0.5));
        splineHero.style.opacity = Math.max(0, shoeOpacity);
        splineHero.style.filter = `blur(${(scrollVal / winHeight) * 20}px)`;

        // 2. Content Wrapper Entry (Blur + Opacity)
        // Adjust these numbers if the "breathing space" feels too long or short
        const fadeStart = winHeight * 0.5; 
        const fadeEnd = winHeight * 1.2;
        
        let progress = (scrollVal - fadeStart) / (fadeEnd - fadeStart);
        let clamped = Math.max(0, Math.min(1, progress));

        if (scrollVal > fadeStart) {
            contentWrapper.style.opacity = clamped;
            contentWrapper.style.filter = `blur(${30 - (clamped * 30)}px)`;
        } else {
            contentWrapper.style.opacity = 0;
            contentWrapper.style.filter = `blur(30px)`;
        }
    });

    // 3. Portfolio & Footer Observers
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-trigger').forEach(el => observer.observe(el));
});
