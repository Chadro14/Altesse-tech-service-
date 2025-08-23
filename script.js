document.addEventListener('DOMContentLoaded', function() {
    const ctaButton = document.getElementById('ctaButton');

    ctaButton.addEventListener('click', function() {
        window.location.href = 'services.html';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
    }
});


