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
  const [profile, setProfile] = useState({
    days: "",
    people: "",
    children: "",
    nationality: "",
    interest: ""
  });

  function updateProfile(message, currentProfile) {
    const msg = message.toLowerCase();
    const next = { ...currentProfile };

    if (msg.includes("3 ngày") || msg.includes("3 days") || msg.includes("2 đêm")) {
      next.days = "3 ngày 2 đêm";
    }

    if (msg.includes("nga") || msg.includes("russian")) {
      next.nationality = "Russian";
    }

    if (msg.includes("trẻ em") || msg.includes("con") || msg.includes("bé")) {
      next.children = "có trẻ em";
    }

    const peopleMatch = msg.match(/(\d+)\s*(người|khách|pax|people)/);
    if (peopleMatch) {
      next.people = peopleMatch[1] + " người";
    }

    if (msg.includes("thiên nhiên")) next.interest = "thiên nhiên";
    if (msg.includes("nghỉ dưỡng")) next.interest = "nghỉ dưỡng";
    if (msg.includes("chụp ảnh")) next.interest = "chụp ảnh";
    if (msg.includes("ẩm thực") || msg.includes("ăn")) next.interest = "ẩm thực";

    return next;
  }

  async function sendMessage() {
    if (!input.trim() || isThinking) return;

    const userMessage = input;
    const newProfile = updateProfile(userMessage, profile);

    setInput("");
    setProfile(newProfile);

    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsThinking(true);

    setMessages((prev) => [
      ...prev,
      { role: "dao", text: "Đào đang xem phương án phù hợp nhất cho anh/chị..." }
    ]);

    await new Promise((resolve) => setTimeout(resolve, 1600));

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        message: userMessage,
        profile: newProfile
      }),
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
