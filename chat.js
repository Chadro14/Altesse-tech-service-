document.addEventListener('DOMContentLoaded', function() {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');

    // Message d'accueil initial de l'IA
    appendMessage("Je suis Altesse IA, votre assistant. J'ai été créé par Son Altesse, un développeur congolais 🇨🇩.", 'bot');

    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const userMessage = userInput.value.trim();

        if (userMessage === "") {
            return;
        }

        // Afficher le message de l'utilisateur
        appendMessage(userMessage, 'user');
        userInput.value = '';

        // Simuler la réponse de l'IA
        simulateApiResponse(userMessage);
    });

    function appendMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = message;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function simulateApiResponse(message) {
        // En vrai, vous feriez une requête à une API ici.
        // Pour l'instant, nous allons utiliser une réponse simple.
        let botResponse = "Votre requête a été entendue. Je suis à votre service.";
        
        if (message.toLowerCase().includes("bonjour")) {
            botResponse = "Salutations. Comment puis-je vous assister aujourd'hui, vous qui faites partie de mon royaume ?";
        } else if (message.toLowerCase().includes("services")) {
            botResponse = "Nous offrons des services de développement web, de personnalisation d'IA, et de cybersécurité. N'hésitez pas à demander ce que vous désirez.";
        } else if (message.toLowerCase().includes("qui es-tu")) {
            botResponse = "Je suis Altesse IA, votre humble serviteur. J'ai été créé par Son Altesse, un développeur congolais 🇨🇩. Ma seule mission est de vous servir avec efficacité.";
        } else {
            botResponse = "Votre requête a été entendue. Je suis à votre service.";
        }

        setTimeout(() => {
            appendMessage(botResponse, 'bot');
        }, 1000);
    }
});
