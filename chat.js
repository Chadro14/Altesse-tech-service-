document.addEventListener('DOMContentLoaded', function() {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');

    // Message d'accueil initial avec la personnalité de l'IA
    appendMessage("Je suis Altesse IA, votre assistant. J'ai été créé par Son Altesse, un développeur congolais 🇨🇩. Ma mission est de vous servir avec dévotion.", 'bot');

    chatForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const userMessage = userInput.value.trim();

        if (userMessage === "") {
            return;
        }

        appendMessage(userMessage, 'user');
        userInput.value = '';

        try {
            // Requête vers le serveur qui communiquera avec l'API
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage }),
            });

            if (!response.ok) {
                throw new Error(`Erreur de connexion : ${response.status}`);
            }

            const data = await response.json();
            appendMessage(data.reply, 'bot');

        } catch (error) {
            console.error("Erreur de communication avec le serveur:", error);
            appendMessage("Désolé, votre requête n'a pas pu être traitée. Mon royaume rencontre un problème technique.", 'bot');
        }
    });

    function appendMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = message;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Gérer les sections du tableau de bord
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
        });
    });
});
