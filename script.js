document.addEventListener("DOMContentLoaded", () => {
    // 1. SCROLL ANIMATIONS
    const splineHero = document.getElementById('spline-hero');
    const heroSection = document.querySelector('.hero-section');
    const contentWrapper = document.querySelector('.content-wrapper');

    window.addEventListener('scroll', () => {
        const scrollVal = window.scrollY;
        const winHeight = window.innerHeight;
        
        heroSection.style.transform = `translateY(-${scrollVal * 0.4}px)`;
        let shoeOpacity = 1 - (scrollVal / (winHeight * 0.5));
        splineHero.style.opacity = Math.max(0, shoeOpacity);
        splineHero.style.filter = `blur(${(scrollVal / winHeight) * 20}px)`;

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

    // 2. REVEAL ON SCROLL
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-trigger').forEach(el => observer.observe(el));

    // 3. FOLDER MODAL LOGIC
    const modal = document.getElementById('folder-modal');
    const modalImg = document.getElementById('modal-folder-header');
    const closeBtn = document.querySelector('.close-modal');

    const folderOpenImages = {
        1: 'open1.png',
        2: 'open2.png',
        3: 'open3.png',
        4: 'open4.png'
    };

    document.querySelectorAll('.project-item').forEach((item, index) => {
        item.addEventListener('click', () => {
            const folderNum = index + 1;
            modalImg.src = folderOpenImages[folderNum];
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close when clicking the dark area (outside the image)
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});
