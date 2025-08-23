document.addEventListener('DOMContentLoaded', function() {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');

    chatForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const userMessage = userInput.value.trim();

        if (userMessage === "") {
            return;
        }

        appendMessage(userMessage, 'user');
        userInput.value = '';

        try {
            // Requête vers votre serveur local
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
