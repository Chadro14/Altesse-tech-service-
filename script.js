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


document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
    }

    const dashboardButtons = document.querySelectorAll('.dashboard-buttons .cta-button');
    const hiddenSections = document.querySelectorAll('.hidden-section');

    dashboardButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('data-section') + '-section';

            hiddenSections.forEach(section => {
                if (section.id === targetId) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });

            // Code de l'API ajouté ici, comme demandé
            if (this.getAttribute('data-section') === 'altesse-ia') {
                callAltesseApi();
            }
        });
    });

    // Fonction pour appeler l'API, ce qui ne fonctionnera pas sans un serveur
    async function callAltesseApi() {
        const query = "Bonjour Altesse IA !";
        console.log("Tentative d'appel de l'API Kyotaka directement depuis script.js...");
        try {
            const response = await fetch(`https://kyotaka-api.vercel.app/api/chat?query=${encodeURIComponent(query)}`);
            const data = await response.json();
            console.log("Réponse de l'API (s'il n'y a pas d'erreur CORS):", data);
        } catch (error) {
            console.error("Échec de l'appel API. Vérifiez les erreurs CORS dans la console du navigateur.", error);
        }
    }
});
