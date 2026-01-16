document.addEventListener("DOMContentLoaded", () => {
    const splineHero = document.getElementById('spline-hero');
    const heroSection = document.querySelector('.hero-section');

    window.addEventListener('scroll', () => {
        const scrollVal = window.scrollY;
        const winHeight = window.innerHeight;
        
        // 1. Move the shoe UP faster than the scroll (Parallax exit)
        heroSection.style.transform = `translateY(-${scrollVal * 0.4}px)`;

        // 2. Faster Fade Out
        // Shoe is gone by 45% of the first screen scroll
        let opacity = 1 - (scrollVal / (winHeight * 0.45));
        splineHero.style.opacity = Math.max(0, opacity);
        
        // 3. Blur softens the shoe as it exits
        let blurVal = (scrollVal / winHeight) * 10;
        splineHero.style.filter = `blur(${blurVal}px)`;
    });

    // Observe elements for the Sequential Fade-In
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { 
        // Trigger when the element is 20% visible for breathing room
        threshold: 0.2 
    });

    document.querySelectorAll('.fade-trigger').forEach(el => observer.observe(el));
});
