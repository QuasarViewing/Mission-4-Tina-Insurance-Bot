let conversationHistory = [];
let tinaStarted = false;

async function startConversation() {
  if (tinaStarted) return;
  tinaStarted = true;

  document.getElementById("submitBtn").disabled = true;
  document.getElementById("submitBtn").textContent = "Thinking...";

  const opening = await callBackend("Hello, I would like help choosing insurance.");
  addMessage(opening, "tina");

  document.getElementById("submitBtn").disabled = false;
  document.getElementById("submitBtn").textContent = "Send";
}

async function sendMessage() {
  const userInput = document.getElementById("userInput").value.trim();
  if (!userInput) return;

  addMessage(userInput, "user");
  document.getElementById("userInput").value = "";

  document.getElementById("submitBtn").disabled = true;
  document.getElementById("submitBtn").textContent = "Thinking...";

  const response = await callBackend(userInput);
  addMessage(response, "tina");

  document.getElementById("submitBtn").disabled = false;
  document.getElementById("submitBtn").textContent = "Send";
}

async function callBackend(userMessage) {
  conversationHistory.push({
    role: "user",
    parts: [{ text: userMessage }]
  });

  try {
    const response = await fetch("http://localhost:3001/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        history: conversationHistory,
      }),
    });

    const data = await response.json();

    if (!data.message) {
      console.error("Backend error:", data);
      return "I'm having a little trouble right now. Please try again in a moment.";
    }

    conversationHistory.push({
      role: "model",
      parts: [{ text: data.message }]
    });

    return data.message;

  } catch (error) {
    console.error("Fetch error:", error);
    return "I'm having a little trouble right now. Please try again in a moment.";
  }
}

function addMessage(text, sender) {
  const conversation = document.getElementById("conversation");
  const message = document.createElement("div");
  message.classList.add("message", sender);
  message.textContent = text;
  conversation.appendChild(message);
  conversation.scrollTop = conversation.scrollHeight;
}

document.addEventListener("DOMContentLoaded", startConversation);

document.getElementById("userInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});