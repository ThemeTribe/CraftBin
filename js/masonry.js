/**
 * CraftBin Masonry Gallery JavaScript
 * Implements true masonry layout with collage-style images
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get all gallery images
    const masonryImages = document.querySelectorAll('.masonry-item img');
    const masonryColumns = document.querySelectorAll('.masonry-column');
    
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
    }
    
    // Function to balance columns by height
    function balanceColumns() {
        // This function could be expanded to dynamically move items between columns
        // for a perfectly balanced layout, but the current CSS-based approach works well for most cases
        
        // We could potentially add this feature if needed:
        /*
        // Get column heights
        let columnHeights = [];
        masonryColumns.forEach(column => {
            columnHeights.push(column.offsetHeight);
        });
        
        // Find the tallest and shortest columns
        const tallestColumn = Math.max(...columnHeights);
        const shortestColumn = Math.min(...columnHeights);
        
        // If height difference is too large, we could rebalance by moving items
        if (tallestColumn - shortestColumn > 200) {
            // Code to move items from tallest to shortest column
        }
        */
    }
    
    // Initialize masonry layout
    checkImagesLoaded();
    
    // Reapply layout on window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            optimizeMasonryLayout();
        }, 250);
    });
});
