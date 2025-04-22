/**
 * CraftBin Header JavaScript
 * Handles responsive menu functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuClose = document.querySelector('.menu-close');
    const body = document.body;

    // Open mobile menu
    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });

    // Close mobile menu
    menuClose.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        body.style.overflow = ''; // Restore scrolling
    });

    // Mobile accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionContent = this.nextElementSibling;
            
            // Toggle the accordion content
            accordionContent.classList.toggle('active');
            
            // Toggle active class on the header for icon rotation
            this.classList.toggle('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(event.target) && 
            !menuToggle.contains(event.target)) {
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Close mobile menu on ESC key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Ensure transitions work properly on window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        document.body.classList.add('resize-animation-stopper');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove('resize-animation-stopper');
        }, 400);
    });
});
