const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

async function sendMessage() {
  const question = userInput.value.trim();
  if (!question) return;

  // user message show
  const userMsg = document.createElement("div");
  userMsg.className = "message user";
  userMsg.textContent = question;
  chatBox.appendChild(userMsg);
  userInput.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  // bot thinking
  const botMsg = document.createElement("div");
  botMsg.className = "message bot";
  botMsg.textContent = "Thinking...";
  chatBox.appendChild(botMsg);
  chatBox.scrollTop = chatBox.scrollHeight;

  // OpenAI API call
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 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
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }]
    })
  });

  const data = await response.json();
  botMsg.textContent = data.choices[0].message.content;
  chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});
