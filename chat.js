document.addEventListener('DOMContentLoaded', function() {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');

    // Message d'accueil initial de l'IA
    appendMessage("Je suis Altesse IA, votre assistant. J'ai été créé par Son Altesse, un développeur congolais 🇨🇩.", 'bot');

    chatForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const userMessage = userInput.value.trim();

        if (userMessage === "") {
            return;
        }

        appendMessage(userMessage, 'user');
        userInput.value = '';

        // Appeler la route API du serveur pour obtenir une réponse
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await response.json();
            appendMessage(data.reply, 'bot');

        } catch (error) {
            console.error("Erreur de communication avec l'IA:", error);
            appendMessage("Désolé, il y a eu un problème technique. Veuillez réessayer plus tard.", 'bot');
        }
    });

    function appendMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = message;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});
