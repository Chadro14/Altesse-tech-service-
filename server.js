const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fetch = require('node-fetch'); // Pour faire des requêtes HTTP

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour analyser le corps des requêtes en JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir les fichiers statiques (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Point de terminaison pour la communication avec l'IA
app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).json({ reply: "Message manquant." });
    }

    try {
        // Envoi de la requête à l'API Kyotaka
        const apiUrl = `https://kyotaka-api.vercel.app/api/chat?query=${encodeURIComponent(userMessage)}`;

        const response = await fetch(apiUrl);
        const data = await response.json();
        const botReply = data.message;

        // Renvoyer la réponse de l'IA au client
        res.json({ reply: botReply });

    } catch (error) {
        console.error("Erreur de l'API Kyotaka:", error);
        res.status(500).json({ reply: "Désolé, il y a eu un problème technique. Veuillez réessayer plus tard." });
    }
});

app.listen(PORT, () => {
    console.log(`Le serveur est en cours d'exécution sur http://localhost:${PORT}`);
});
