document.addEventListener("DOMContentLoaded", () => {
    const splineHero = document.getElementById('spline-hero');
    const heroSection = document.querySelector('.hero-section');
    const aboutContent = document.querySelector('.about-content');
    const marquee = document.querySelector('.marquee-background');

    window.addEventListener('scroll', () => {
        const scrollVal = window.scrollY;
        const winHeight = window.innerHeight;
        
        // --- 1. SHOE EXIT (First Page) ---
        heroSection.style.transform = `translateY(-${scrollVal * 0.4}px)`;
        let shoeOpacity = 1 - (scrollVal / (winHeight * 0.5));
        splineHero.style.opacity = Math.max(0, shoeOpacity);
        splineHero.style.filter = `blur(${(scrollVal / winHeight) * 15}px)`;

        // --- 2. ABOUT BLUR FADE (Second Page) ---
        // This calculates progress specifically for the About section
        const aboutStart = winHeight * 0.6; 
        const aboutEnd = winHeight * 1.2;
        
        let aboutProgress = (scrollVal - aboutStart) / (aboutEnd - aboutStart);
        let clampedAbout = Math.max(0, Math.min(1, aboutProgress));

        if (scrollVal > aboutStart) {
            let blurVal = 20 - (clampedAbout * 20);
            aboutContent.style.filter = `blur(${blurVal}px)`;
            aboutContent.style.opacity = clampedAbout;
            marquee.style.opacity = clampedAbout * 0.08;
        } else {
            aboutContent.style.filter = `blur(20px)`;
            aboutContent.style.opacity = 0;
            marquee.style.opacity = 0;
        }
    });

    // --- 3. PORTFOLIO FADE (Third Page) ---
    // This brings back the portfolio items you saw disappear in the video
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-trigger').forEach(el => observer.observe(el));
});
