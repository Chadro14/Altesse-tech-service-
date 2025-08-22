<script>
  const messages = document.getElementById("messages");
  const input = document.getElementById("input");

  function addMessage(text, type) {
    const msg = document.createElement("div");
    msg.classList.add(type);
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text }),
      });

      const data = await res.json();
      addMessage(data.reply || data.message, "bot");
    } catch (e) {
      addMessage("Erreur API", "bot");
    }
  }

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });
</script>
