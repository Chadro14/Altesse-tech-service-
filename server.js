const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Assurez-vous que tous vos fichiers (HTML, CSS, JS) sont dans un dossier nommé 'public'
// Ou si ce n'est pas le cas, changez la ligne ci-dessous
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).json({ reply: "Message manquant." });
    }

    try {
        const apiUrl = `https://kyotaka-api.vercel.app/api/chat?query=${encodeURIComponent(userMessage)}`;

        const response = await fetch(apiUrl);
        const data = await response.json();
        const botReply = data.message;

        res.json({ reply: botReply });

    } catch (error) {
        console.error("Erreur de l'API Kyotaka:", error);
        res.status(500).json({ reply: "Désolé, il y a eu un problème technique. Veuillez réessayer plus tard." });
    }
});

app.listen(PORT, () => {
    console.log(`Le serveur est en cours d'exécution sur http://localhost:${PORT}`);
});
