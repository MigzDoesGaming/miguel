document.addEventListener("DOMContentLoaded", () => {
    const splineHero = document.getElementById('spline-hero');
    const heroSection = document.querySelector('.hero-section');
    const aboutContent = document.querySelector('.about-content');
    const marquee = document.querySelector('.marquee-background');

    window.addEventListener('scroll', () => {
        const scrollVal = window.scrollY;
        const winHeight = window.innerHeight;
        
        // --- 1. SHOE EXIT LOGIC (Fades and moves out) ---
        heroSection.style.transform = `translateY(-${scrollVal * 0.4}px)`;
        let shoeOpacity = 1 - (scrollVal / (winHeight * 0.5));
        splineHero.style.opacity = Math.max(0, shoeOpacity);
        splineHero.style.filter = `blur(${(scrollVal / winHeight) * 15}px)`;

        // --- 2. ABOUT SECTION ENTRANCE LOGIC (Blur Fade In) ---
        // We calculate how much of the About section is visible
        // scrollVal - winHeight tells us how far into the second page we are
        const aboutStart = winHeight * 0.5; // Start effect halfway through scroll
        const aboutProgress = (scrollVal - aboutStart) / (winHeight * 0.8);
        const clampedProgress = Math.max(0, Math.min(1, aboutProgress));

        if (scrollVal > aboutStart) {
            // Gradually reduce blur from 20px to 0px
            let currentBlur = 20 - (clampedProgress * 20);
            aboutContent.style.filter = `blur(${currentBlur}px)`;
            aboutContent.style.opacity = clampedProgress;
            
            // Fade in the marquee text slightly slower
            marquee.style.opacity = clampedProgress * 0.08;
        } else {
            aboutContent.style.filter = `blur(20px)`;
            aboutContent.style.opacity = 0;
            marquee.style.opacity = 0;
        }
    });

    // You can keep the IntersectionObserver for the Portfolio items below
});
