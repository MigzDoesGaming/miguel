document.addEventListener("DOMContentLoaded", () => {
    // --- 1. ORIGINAL SCROLL & REVEAL LOGIC ---
    const splineHero = document.getElementById('spline-hero');
    const heroSection = document.querySelector('.hero-section');
    const contentWrapper = document.querySelector('.content-wrapper');

    window.addEventListener('scroll', () => {
        const scrollVal = window.scrollY;
        const winHeight = window.innerHeight;
        
        heroSection.style.transform = `translateY(-${scrollVal * 0.4}px)`;
        let shoeOpacity = 1 - (scrollVal / (winHeight * 0.5));
        if(splineHero) {
            splineHero.style.opacity = Math.max(0, shoeOpacity);
            splineHero.style.filter = `blur(${(scrollVal / winHeight) * 20}px)`;
        }

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

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-trigger').forEach(el => observer.observe(el));


    // --- 2. FOLDER & GALLERY LOGIC ---
    const modal = document.getElementById('folder-modal');
    const modalImg = document.getElementById('modal-folder-header');
    const galleryContainer = document.getElementById('gallery-container');
    const nextBtn = document.getElementById('next-page');
    const prevBtn = document.getElementById('prev-page');

    let currentImgIndex = 0;
    let currentFolderImages = [];

    // Define images for each folder
    const projectData = {
        1: { header: 'open1.png', images: ['anim1.png'] },
        2: { header: 'open2.png', images: ['illu1.png', 'illu2.png', 'illu3.png', 'illu4.png'] }, // Your focus
        3: { header: 'open3.png', images: ['graph1.png'] },
        4: { header: 'open4.png', images: ['model1.png'] }
    };

    function updateGallery() {
        if (!galleryContainer) return;
        galleryContainer.innerHTML = ''; 
        currentFolderImages.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            if (index === currentImgIndex) img.classList.add('active-img');
            galleryContainer.appendChild(img);
        });
        
        // Hide nav if only 1 image
        const nav = document.querySelector('.folder-nav');
        if(nav) nav.style.display = currentFolderImages.length > 1 ? 'flex' : 'none';
    }

    document.querySelectorAll('.project-item').forEach((item, index) => {
        item.addEventListener('click', () => {
            const id = index + 1;
            const data = projectData[id];
            if (data) {
                modalImg.src = data.header;
                currentFolderImages = data.images;
                currentImgIndex = 0; 
                updateGallery();
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Navigation buttons
    if(nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentImgIndex < currentFolderImages.length - 1) {
                currentImgIndex++;
                updateGallery();
            }
        });
    }

    if(prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentImgIndex > 0) {
                currentImgIndex--;
                updateGallery();
            }
        });
    }

    // Close modal
    const closeBtn = document.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});
