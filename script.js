document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById('folder-modal');
    const modalImg = document.getElementById('modal-folder-header');
    const galleryContainer = document.getElementById('gallery-container');
    const pageNumDisplay = document.getElementById('page-number');
    const nextBtn = document.getElementById('next-page');
    const prevBtn = document.getElementById('prev-page');

    let currentImgIndex = 0;
    let currentFolderImages = [];

    // DATA CONFIGURATION
    const projectData = {
        1: { // Folder 1
            header: 'open1.png',
            images: ['anim1.png'] 
        },
        2: { // FOLDER 2: ILLUSTRATIONS (YOUR FOCUS)
            header: 'open2.png',
            images: ['illu1.png', 'illu2.png', 'illu3.png', 'illu4.png']
        },
        3: { // Folder 3
            header: 'open3.png',
            images: ['graphic1.png']
        },
        4: { // Folder 4
            header: 'open4.png',
            images: ['model1.png']
        }
    };

    function updateGallery() {
        galleryContainer.innerHTML = ''; 
        
        currentFolderImages.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            if (index === currentImgIndex) img.classList.add('active-img');
            galleryContainer.appendChild(img);
        });

        // Update the counter text (e.g., "1 / 4")
        pageNumDisplay.innerText = `${currentImgIndex + 1} / ${currentFolderImages.length}`;
        
        // Hide nav if there's only one page
        const nav = document.querySelector('.folder-nav');
        nav.style.display = currentFolderImages.length > 1 ? 'flex' : 'none';
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

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentImgIndex < currentFolderImages.length - 1) {
            currentImgIndex++;
            updateGallery();
        }
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentImgIndex > 0) {
            currentImgIndex--;
            updateGallery();
        }
    });

    // Close on background click
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});
