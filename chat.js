document.addEventListener('DOMContentLoaded', function() {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');

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
        // Exemple avec une API (non fonctionnel sans clé API) :
        // fetch('https://api.openai.com/v1/chat/completions', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': 'Bearer VOTRE_CLE_API'
        //   },
        //   body: JSON.stringify({
        //     model: "gpt-3.5-turbo",
        //     messages: [{ role: "user", content: message }]
        //   })
        // })
        // .then(response => response.json())
        // .then(data => {
        //   const botMessage = data.choices[0].message.content;
        //   appendMessage(botMessage, 'bot');
        // });

        // Pour l'instant, nous allons utiliser une réponse simple.
        let botResponse = "Désolé, je suis encore en phase de développement. Comment puis-je vous aider ?";
        
        if (message.toLowerCase().includes("bonjour")) {
            botResponse = "Bonjour ! Comment puis-je vous assister aujourd'hui ?";
        } else if (message.toLowerCase().includes("services")) {
            botResponse = "Nous offrons des services de développement web, de personnalisation d'IA, et de cybersécurité.";
        }

        setTimeout(() => {
            appendMessage(botResponse, 'bot');
        }, 1000);
    }
});
