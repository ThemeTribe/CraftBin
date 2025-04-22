/**
 * CraftBin Masonry Gallery JavaScript
 * Implements true masonry layout with collage-style images
 * and lightbox functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get all gallery images and elements
    const masonryItems = document.querySelectorAll('.masonry-item');
    const masonryImages = document.querySelectorAll('.masonry-item img');
    const masonryColumns = document.querySelectorAll('.masonry-column');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    // Function to check if all images are loaded
    function checkImagesLoaded() {
        let loadedImages = 0;
        const totalImages = masonryImages.length;
        
        // Count loaded images
        masonryImages.forEach(img => {
            if (img.complete) {
                loadedImages++;
            } else {
                img.addEventListener('load', function() {
                    loadedImages++;
                    if (loadedImages === totalImages) {
                        // All images loaded, apply masonry layout
                        optimizeMasonryLayout();
                    }
                });
                
                // Handle image loading errors
                img.addEventListener('error', function() {
                    loadedImages++;
                    this.style.display = 'none';
                    if (loadedImages === totalImages) {
                        optimizeMasonryLayout();
                    }
                });
            }
        });
        
        // If all images were already cached and loaded
        if (loadedImages === totalImages) {
            optimizeMasonryLayout();
        }
    }
    
    // Function to dynamically rebalance columns for optimal masonry layout
    function optimizeMasonryLayout() {
        // Add a class to indicate that images are loaded
        document.querySelector('.masonry-gallery').classList.add('images-loaded');
        
        // On smaller screens, we need to ensure columns are properly distributed
        if (window.innerWidth < 576) {
            // Single column layout - no rebalancing needed
        } else {
            // Make sure column heights are relatively balanced
            balanceColumns();
        }
        
        // Add click events to all masonry items
        setupLightboxEvents();
    }
    
    // Function to set up lightbox events
    function setupLightboxEvents() {
        // Add click event to each masonry item
        masonryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = item.querySelector('img').src;
                openLightbox(imgSrc);
            });
        });
        
        // Also add click events to magnify buttons explicitly
        const magnifyButtons = document.querySelectorAll('.magnify-icon');
        magnifyButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Prevent the click from propagating to the masonry item
                e.stopPropagation();
                
                // Find the parent masonry item and get its image
                const parentItem = this.closest('.masonry-item');
                const imgSrc = parentItem.querySelector('img').src;
                openLightbox(imgSrc);
            });
        });
    }
    
    // Function to open lightbox
    function openLightbox(imgSrc) {
        lightboxImage.src = imgSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
    }
    
    // Close lightbox when clicking the close button
    lightboxClose.addEventListener('click', function() {
        closeLightbox();
    });
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close lightbox when pressing Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    // Function to close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Function to balance columns by height
    function balanceColumns() {
        // This function could be expanded to dynamically move items between columns
        // for a perfectly balanced layout, but the current CSS-based approach works well for most cases
    }
    
    // Initialize masonry layout
    checkImagesLoaded();
    
    // Since you've already added the overlays manually, let's also add the click handlers immediately
    setupLightboxEvents();
    
    // Reapply layout on window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            optimizeMasonryLayout();
        }, 250);
    });
});
