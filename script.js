// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Spline scene
    initializeSpline();
    
    // Set up intersection observers for animations
    setupObservers();
    
    // Set up scroll-based animations
    setupScrollAnimations();
    
    // Smooth scroll for navigation
    setupSmoothScroll();
});

// Initialize Spline background
function initializeSpline() {
    const splineContainer = document.getElementById('spline-background');
    
    // Clear the placeholder background
    splineContainer.style.background = 'none';
    
    // Create Spline viewer
    // Replace 'YOUR_SPLINE_SCENE_URL' with your actual Spline scene URL
    const splineViewer = document.createElement('spline-viewer');
    splineViewer.setAttribute('url', 'YOUR_SPLINE_SCENE_URL');
    splineViewer.setAttribute('loading', 'eager');
    splineViewer.style.width = '100%';
    splineViewer.style.height = '100%';
    
    // Add to container
    splineContainer.appendChild(splineViewer);
    
    // Fallback if Spline fails to load
    setTimeout(() => {
        if (splineContainer.children.length === 0 || 
            splineContainer.querySelector('spline-viewer').shadowRoot === null) {
            console.warn('Spline failed to load, using fallback background');
            splineContainer.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
        }
    }, 3000);
}

// Set up Intersection Observers for scroll-triggered animations
function setupObservers() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    // Create main observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add 'visible' class based on element type
                if (entry.target.classList.contains('section-title')) {
                    entry.target.classList.add('visible');
                } else if (entry.target.classList.contains('text-line')) {
                    const paragraph = entry.target.querySelector('.about-paragraph');
                    if (paragraph) paragraph.classList.add('visible');
                } else if (entry.target.classList.contains('about-image')) {
                    entry.target.classList.add('visible');
                } else if (entry.target.classList.contains('portfolio-item')) {
                    entry.target.classList.add('visible');
                } else if (entry.target.classList.contains('footer-content')) {
                    entry.target.classList.add('visible');
                }
            }
        });
    }, observerOptions);

    // Observe all elements that need animation
    document.querySelectorAll('.section-title').forEach(el => observer.observe(el));
    document.querySelectorAll('.text-line').forEach(el => observer.observe(el));
    document.querySelectorAll('.about-image').forEach(el => observer.observe(el));
    document.querySelectorAll('.portfolio-item').forEach(el => observer.observe(el));
    document.querySelectorAll('.footer-content').forEach(el => observer.observe(el));
}

// Set up scroll-based animations
function setupScrollAnimations() {
    // Horizontal text movement for about section
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Initial check on page load
    setTimeout(handleScrollAnimations, 100);
}

function handleScrollAnimations() {
    // About section horizontal text movement
    const aboutSection = document.getElementById('about');
    const aboutRect = aboutSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Only apply effect when about section is in view
    if (aboutRect.top < windowHeight && aboutRect.bottom > 0) {
        const scrollPercent = 1 - (aboutRect.top / windowHeight);
        
        // Move text lines horizontally based on scroll
        const textLines = document.querySelectorAll('.text-line');
        textLines.forEach((line, index) => {
            const speed = parseFloat(line.getAttribute('data-speed')) || 1;
            const translateX = -100 + (scrollPercent * 100 * speed);
            
            // Only apply if not already animated by intersection observer
            const paragraph = line.querySelector('.about-paragraph');
            if (paragraph && !paragraph.classList.contains('visible')) {
                paragraph.style.transform = `translateX(${Math.min(translateX, 0)}px)`;
                paragraph.style.opacity = Math.min(scrollPercent * 2, 1);
            }
        });
        
        // Animate the image based on scroll
        const aboutImage = document.querySelector('.about-image');
        if (aboutImage && !aboutImage.classList.contains('visible')) {
            const imageProgress = Math.min(Math.max(scrollPercent * 1.5, 0), 1);
            aboutImage.style.opacity = imageProgress;
            aboutImage.style.transform = `scale(${0.8 + (imageProgress * 0.2)})`;
        }
    }
    
    // Portfolio items animation based on scroll position
    const portfolioSection = document.getElementById('portfolio');
    const portfolioRect = portfolioSection.getBoundingClientRect();
    
    if (portfolioRect.top < windowHeight && portfolioRect.bottom > 0) {
        const scrollPercent = 1 - (portfolioRect.top / windowHeight);
        
        // Animate portfolio items
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach((item, index) => {
            if (!item.classList.contains('visible')) {
                const delay = index * 0.2;
                const itemProgress = Math.max(0, (scrollPercent - delay) * 2);
                
                if (itemProgress > 0) {
                    const directionClass = item.classList.contains('left') ? -1 : 1;
                    const translateX = directionClass * 100 * (1 - itemProgress);
                    
                    item.style.opacity = Math.min(itemProgress * 2, 1);
                    item.style.transform = `translateX(${translateX}px)`;
                }
            }
        });
    }
    
    // Footer animation based on scroll position
    const footer = document.getElementById('contact');
    const footerRect = footer.getBoundingClientRect();
    
    if (footerRect.top < windowHeight) {
        const footerContent = document.querySelector('.footer-content');
        if (footerContent && !footerContent.classList.contains('visible')) {
            const footerProgress = Math.max(0, 1 - (footerRect.top / windowHeight));
            footerContent.style.opacity = Math.min(footerProgress * 2, 1);
            footerContent.style.transform = `translateY(${50 * (1 - footerProgress)}px)`;
        }
    }
}

// Smooth scroll for navigation
function setupSmoothScroll() {
    // Scroll indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
    
    // Add scroll progress indicator (optional)
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;
        
        // Update scroll indicator opacity
        if (scrollIndicator) {
            scrollIndicator.style.opacity = Math.max(0, 1 - (scrollPercent * 5));
        }
    });
}

// Handle window resize
window.addEventListener('resize', () => {
    // Re-trigger scroll animations on resize
    handleScrollAnimations();
});

// Add loading state
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Force a scroll event to trigger animations on page load
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 300);
});