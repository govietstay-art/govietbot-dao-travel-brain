"use client";

import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "dao",
      text: "Xin chào, em là Đào – Local Travel Assistant tại Đà Nẵng. Anh/chị muốn em hỗ trợ lịch trình, tour, SIM, airport transfer hay Omakase Experience ạ?"
    }
  ]);

  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  async function sendMessage() {
    if (!input.trim() || isThinking) return;

    const userMessage = input;
    setInput("");

    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsThinking(true);

    setMessages((prev) => [
      ...prev,
      { role: "dao", text: "Đào đang xem phương án phù hợp nhất cho anh/chị..." }
    ]);

    await new Promise((resolve) => setTimeout(resolve, 1600));

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: userMessage }),
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev.slice(0, -1),
      { role: "dao", text: data.reply }
    ]);

    setIsThinking(false);
  }

  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: 20, fontFamily: "Arial" }}>
      <h1>Ask Đào 🌿</h1>
      <p>GoVietStay Local Travel Assistant</p>

      <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16, minHeight: 400 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 14, textAlign: m.role === "user" ? "right" : "left" }}>
            <div
              style={{
                display: "inline-block",
                padding: 12,
                borderRadius: 12,
                background: m.role === "user" ? "#DCF8C6" : "#F1F1F1",
                maxWidth: "80%",
                whiteSpace: "pre-wrap"
              }}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask Đào..."
          disabled={isThinking}
          style={{ flex: 1, padding: 12, borderRadius: 8, border: "1px solid #ccc" }}
        />
        <button onClick={sendMessage} disabled={isThinking} style={{ padding: "12px 18px", borderRadius: 8 }}>
          Send
        </button>
      </div>
    </main>
  );
}
