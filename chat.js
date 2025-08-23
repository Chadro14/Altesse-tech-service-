<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Chatbot KYOTAKA</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      background: #0a0a0a;
      color: #e5e5e5;
      font-family: monospace;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    .chat-container {
      width: 100%;
      max-width: 480px;
      height: 100vh;
      display: flex;
      flex-direction: column;
      background: #111;
    }
    .messages {
      flex: 1;
      padding: 10px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .msg {
      padding: 10px 14px;
      border-radius: 10px;
      max-width: 80%;
      word-wrap: break-word;
      font-size: 14px;
    }
    .user {
      align-self: flex-end;
      background: #1e1e1e;
      color: #0ff;
    }
    .bot {
      align-self: flex-start;
      background: #191919;
      color: #0f0;
    }
    .input-area {
      display: flex;
      border-top: 1px solid #222;
      padding: 8px;
      gap: 6px;
    }
    input {
      flex: 1;
      padding: 12px;
      background: #0a0a0a;
      border: 1px solid #222;
      border-radius: 8px;
      outline: none;
      color: #e5e5e5;
      font-size: 14px;
    }
    button {
      background: #0f0;
      color: #000;
      border: none;
      border-radius: 8px;
      padding: 0 16px;
      cursor: pointer;
      font-weight: bold;
      font-size: 14px;
    }
    button:active {
      background: #0c0;
    }
  </style>
</head>
<body>
  <div class="chat-container">
    <div class="messages" id="messages"></div>
    <div class="input-area">
      <input id="input" type="text" placeholder="Écris ici...">
      <button onclick="sendMessage()">➤</button>
    </div>
  </div>
  <script>
    const messages = document.getElementById("messages");
    const input = document.getElementById("input");
    function addMessage(text, type) {
      const msg = document.createElement("div");
      msg.classList.add("msg", type);
      msg.textContent = text;
      messages.appendChild(msg);
      messages.scrollTop = messages.scrollHeight;
    }
    async function sendMessage() {
      const text = input.value.trim();
      if (!text) return;
      addMessage(text, "user");
      input.value = "";
      try {
        const res = await fetch("https://kyotaka-api.vercel.app/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: text })
        });
        const data = await res.json();
        addMessage(data.reply || data.message || JSON.stringify(data), "bot");
      } catch {
        addMessage("Erreur API", "bot");
      }
    }
    input.addEventListener("keydown", e => {
      if (e.key === "Enter") sendMessage();
    });
  </script>
</body>
</html>
