document.addEventListener('DOMContentLoaded', function() {
    const ctaButton = document.getElementById('ctaButton');

    ctaButton.addEventListener('click', function() {
        window.location.href = 'services.html';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
    }
});


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
