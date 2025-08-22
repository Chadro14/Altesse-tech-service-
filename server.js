const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const OpenAI = require('openai'); // Importer la bibliothèque OpenAI

const app = express();
const PORT = process.env.PORT || 3000;

// Créez une instance d'OpenAI avec votre clé API
// ATTENTION : Ne partagez jamais votre clé API sur GitHub ou ailleurs !
const openai = new OpenAI({
    apiKey: "https://kyotaka-api.vercel.app/", 
});

// Middleware pour analyser le corps des requêtes en JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir les fichiers statiques depuis le dossier 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Point de terminaison pour la communication avec l'IA
app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).json({ reply: "Message manquant." });
    }

    try {
        // Définir la personnalité de l'IA (le "prompt système")
        const systemPrompt = `Tu es Altesse IA, un assistant créé par un développeur congolais du nom de son Altesse. Tu dois t'exprimer de manière majestueuse et noble, comme un roi. Réponds aux questions avec un ton digne et utile, en te référant à toi-même comme "votre humble serviteur".`;

        // Effectuer l'appel à l'API d'OpenAI
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userMessage }
            ],
        });

        const botReply = completion.choices[0].message.content;

        // Renvoyer la réponse de l'IA au client
        res.json({ reply: botReply });

    } catch (error) {
        console.error("Erreur de l'API OpenAI:", error);
        res.status(500).json({ reply: "Désolé, il y a eu un problème technique. Veuillez réessayer plus tard." });
    }
});

app.listen(PORT, () => {
    console.log(`Le serveur est en cours d'exécution sur http://localhost:${PORT}`);
});
          
