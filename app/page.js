"use client";

import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "dao",
      text:
        "Xin chào, em là Đào – Local Travel Assistant tại Đà Nẵng. Anh/chị muốn em hỗ trợ lịch trình, tour, SIM, airport transfer hay Omakase Experience ạ?"
    }
  ]);

  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const [profile, setProfile] = useState({
    days: "",
    people: "",
    children: "",
    nationality: "",
    language: "",
    interest: "",
    travelStyle: "",
    lastIntent: "",
    destination: ""
  });

  function detectIntent(msg) {
    if (msg.includes("hội an") || msg.includes("hoi an")) return "hoi_an";
    if (msg.includes("bà nà") || msg.includes("ba na") || msg.includes("golden bridge")) return "ba_na";
    if (msg.includes("huế") || msg.includes("hue")) return "hue";
    if (msg.includes("sân bay") || msg.includes("airport") || msg.includes("transfer")) return "airport";
    if (msg.includes("sim") || msg.includes("esim") || msg.includes("internet")) return "sim";
    if (msg.includes("mưa") || msg.includes("rain")) return "rain";
    if (msg.includes("giá") || msg.includes("bao nhiêu") || msg.includes("price") || msg.includes("cost")) return "price";
    if (msg.includes("omakase")) return "omakase";
    if (msg.includes("book") || msg.includes("đặt") || msg.includes("whatsapp") || msg.includes("zalo")) return "book";
    if (msg.includes("có gì vui") || msg.includes("what to do") || msg.includes("things to do")) return "fun";
    if (msg.includes("nga") || msg.includes("russian") || msg.includes("рус")) return "russian";
    return "";
  }

  function updateProfile(message, currentProfile) {
    const msg = message.toLowerCase();
    const next = { ...currentProfile };

    const intent = detectIntent(msg);
    if (intent) next.lastIntent = intent;

    // Days / duration
    if (msg.includes("3 ngày") || msg.includes("3 days") || msg.includes("2 đêm")) {
      next.days = "3 ngày 2 đêm";
    }
    if (msg.includes("2 ngày") || msg.includes("2 days") || msg.includes("1 đêm")) {
      next.days = "2 ngày 1 đêm";
    }
    if (msg.includes("1 ngày") || msg.includes("one day") || msg.includes("day trip")) {
      next.days = "1 ngày";
    }

    // People number
    const peopleMatch = msg.match(/(\d+)\s*(người|khách|pax|people|persons)/);
    if (peopleMatch) {
      next.people = peopleMatch[1] + " người";
    }

    // Vietnamese natural family formats
    if (msg.includes("2 người lớn") && (msg.includes("2 bé") || msg.includes("2 trẻ em") || msg.includes("2 con"))) {
      next.people = "4 người";
      next.children = "có 2 trẻ em";
      next.travelStyle = "family";
    }

    if (msg.includes("2 người lớn") && (msg.includes("1 bé") || msg.includes("1 trẻ em") || msg.includes("1 con"))) {
      next.people = "3 người";
      next.children = "có 1 trẻ em";
      next.travelStyle = "family";
    }

    if (
      msg.includes("trẻ em") ||
      msg.includes("con") ||
      msg.includes("bé") ||
      msg.includes("child") ||
      msg.includes("children") ||
      msg.includes("kids")
    ) {
      if (!next.children) next.children = "có trẻ em";
    }

    if (
      msg.includes("gia đình") ||
      msg.includes("vợ") ||
      msg.includes("chồng") ||
      msg.includes("con") ||
      msg.includes("family") ||
      msg.includes("wife") ||
      msg.includes("husband") ||
      msg.includes("kids") ||
      msg.includes("children")
    ) {
      next.travelStyle = "family";
    }

    if (
      (msg.includes("vợ") && msg.includes("2 con")) ||
      (msg.includes("wife") && msg.includes("2 children"))
    ) {
      next.people = "4 người";
      next.children = "có 2 trẻ em";
      next.travelStyle = "family";
    }

    if (
      (msg.includes("vợ") && msg.includes("1 con")) ||
      (msg.includes("wife") && msg.includes("1 child"))
    ) {
      next.people = "3 người";
      next.children = "có 1 trẻ em";
      next.travelStyle = "family";
    }

    // Nationality / language
    if (msg.includes("nga") || msg.includes("russian") || msg.includes("рус")) {
      next.nationality = "russian";
      next.language = "russian";
    }

    if (msg.includes("hàn") || msg.includes("korean") || msg.includes("한국")) {
      next.nationality = "korean";
      next.language = "korean";
    }

    if (msg.includes("trung") || msg.includes("chinese") || msg.includes("中国")) {
      next.nationality = "chinese";
      next.language = "chinese";
    }

    if (msg.includes("việt") || msg.includes("vietnamese")) {
      next.nationality = "vietnamese";
      next.language = "vietnamese";
    }

    if (msg.includes("india") || msg.includes("ấn độ") || msg.includes("indian")) {
      next.nationality = "indian";
      next.language = "english";
    }

    if (msg.includes("german") || msg.includes("đức")) {
      next.nationality = "german";
      next.language = "english";
    }

    // Destination memory
    if (msg.includes("hội an") || msg.includes("hoi an")) next.destination = "Hội An";
    if (msg.includes("bà nà") || msg.includes("ba na") || msg.includes("golden bridge")) next.destination = "Ba Na Hills";
    if (msg.includes("huế") || msg.includes("hue")) next.destination = "Huế";

    // Interest memory
    if (msg.includes("thiên nhiên")) next.interest = "thiên nhiên";
    if (msg.includes("nghỉ dưỡng")) next.interest = "nghỉ dưỡng";
    if (msg.includes("chụp ảnh")) next.interest = "chụp ảnh";
    if (msg.includes("ẩm thực") || msg.includes("ăn")) next.interest = "ẩm thực";
    if (msg.includes("biển") || msg.includes("beach")) next.interest = "biển";

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

    await new Promise((resolve) => setTimeout(resolve, 1000));

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

        <button
          onClick={sendMessage}
          disabled={isThinking}
          style={{ padding: "12px 18px", borderRadius: 8 }}
        >
          Send
        </button>
      </div>
    </main>
  );
}
