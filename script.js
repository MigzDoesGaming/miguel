document.addEventListener("DOMContentLoaded", () => {
    const hero = document.querySelector('.hero-section');
    const splineHero = document.getElementById('spline-hero');

    window.addEventListener('scroll', () => {
        const scrollVal = window.scrollY;
        const winHeight = window.innerHeight;
        const progress = Math.min(scrollVal / winHeight, 1);

        // 1. FADE OUT: Starts immediately, gone by 60% scroll
        let opacity = 1 - (progress / 0.6);
        splineHero.style.opacity = Math.max(0, opacity);

        // 2. SCALE & BLUR: The shoe 'recedes' and softens
        let scale = 1 - (progress * 0.2); // Shrinks slightly
        let blur = progress * 10;        // Blurs up to 10px
        
        hero.style.transform = `scale(${Math.max(0.8, scale)})`;
        hero.style.filter = `blur(${blur}px)`;

        // 3. CLEANUP: Hide completely when hidden by the 'curtain'
        if (progress >= 1) {
            hero.style.display = 'none';
        } else {
            hero.style.display = 'block';
        }
    });

    // Intersection Observer for About Content slide-in
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-trigger').forEach(el => observer.observe(el));
});
