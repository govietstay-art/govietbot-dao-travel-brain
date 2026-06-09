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
    destination: "",
    lastTopic: "",
    lastIntent: ""
  });

  function updateProfile(message, currentProfile) {
    const msg = message.toLowerCase();
    const next = { ...currentProfile };

    if (msg.includes("hội an") || msg.includes("hoi an")) {
      next.destination = "Hội An";
      next.lastTopic = "hoi_an";
      next.lastIntent = "destination";
    }

    if (msg.includes("bà nà") || msg.includes("ba na") || msg.includes("golden bridge")) {
      next.destination = "Ba Na Hills";
      next.lastTopic = "ba_na";
      next.lastIntent = "destination";
    }

    if (msg.includes("huế") || msg.includes("hue")) {
      next.destination = "Huế";
      next.lastTopic = "hue";
      next.lastIntent = "destination";
    }

    if (msg.includes("sân bay") || msg.includes("airport") || msg.includes("transfer") || msg.includes("xe")) {
      next.lastTopic = "airport";
      next.lastIntent = "service";
    }

    if (msg.includes("sim") || msg.includes("esim") || msg.includes("internet")) {
      next.lastTopic = "sim";
      next.lastIntent = "service";
    }

    if (msg.includes("3 ngày") || msg.includes("3 days") || msg.includes("2 đêm")) {
      next.days = "3 ngày 2 đêm";
      next.lastIntent = "duration";
    }

    if (msg.includes("2 ngày") || msg.includes("2 days") || msg.includes("1 đêm")) {
      next.days = "2 ngày 1 đêm";
      next.lastIntent = "duration";
    }

    if (msg.includes("1 ngày") || msg.includes("one day") || msg.includes("day trip")) {
      next.days = "1 ngày";
      next.lastIntent = "duration";
    }

    const peopleMatch = msg.match(/(\d+)\s*(người|khách|pax|people|persons)/);
    if (peopleMatch) {
      next.people = peopleMatch[1] + " người";
      next.lastIntent = "people";
    }

    if (msg.includes("2 người lớn") && (msg.includes("2 bé") || msg.includes("2 trẻ em") || msg.includes("2 con"))) {
      next.people = "4 người";
      next.children = "có 2 trẻ em";
      next.travelStyle = "family";
      next.lastIntent = "family_profile";
    }

    if (msg.includes("2 người lớn") && (msg.includes("1 bé") || msg.includes("1 trẻ em") || msg.includes("1 con"))) {
      next.people = "3 người";
      next.children = "có 1 trẻ em";
      next.travelStyle = "family";
      next.lastIntent = "family_profile";
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
      next.travelStyle = "family";
    }

    if (
      msg.includes("gia đình") ||
      msg.includes("vợ") ||
      msg.includes("chồng") ||
      msg.includes("family") ||
      msg.includes("wife") ||
      msg.includes("husband")
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
      next.lastIntent = "family_profile";
    }

    if (
      (msg.includes("vợ") && msg.includes("1 con")) ||
      (msg.includes("wife") && msg.includes("1 child"))
    ) {
      next.people = "3 người";
      next.children = "có 1 trẻ em";
      next.travelStyle = "family";
      next.lastIntent = "family_profile";
    }

    if (msg.includes("nga") || msg.includes("russian") || msg.includes("рус")) {
      next.nationality = "russian";
      next.language = "russian";
      next.lastIntent = "nationality";
    }

    if (msg.includes("hàn") || msg.includes("korean") || msg.includes("한국")) {
      next.nationality = "korean";
      next.language = "korean";
      next.lastIntent = "nationality";
    }

    if (msg.includes("trung") || msg.includes("chinese") || msg.includes("中国")) {
      next.nationality = "chinese";
      next.language = "chinese";
      next.lastIntent = "nationality";
    }

    if (msg.includes("việt") || msg.includes("vietnamese")) {
      next.nationality = "vietnamese";
      next.language = "vietnamese";
      next.lastIntent = "nationality";
    }

    if (msg.includes("india") || msg.includes("ấn độ") || msg.includes("indian")) {
      next.nationality = "indian";
      next.language = "english";
      next.lastIntent = "nationality";
    }

    if (msg.includes("german") || msg.includes("đức")) {
      next.nationality = "german";
      next.language = "english";
      next.lastIntent = "nationality";
    }

    if (msg.includes("nghỉ dưỡng") || msg.includes("relax") || msg.includes("resort") || msg.includes("nhẹ")) {
      next.interest = "nghỉ dưỡng";
      next.lastIntent = "interest";
    }

    if (msg.includes("chụp ảnh") || msg.includes("photo") || msg.includes("instagram") || msg.includes("đẹp")) {
      next.interest = "chụp ảnh";
      next.lastIntent = "interest";
    }

    if (msg.includes("ẩm thực") || msg.includes("ăn uống") || msg.includes("ăn ngon") || msg.includes("food")) {
      next.interest = "ẩm thực";
      next.lastIntent = "interest";
    }

    if (msg.includes("thiên nhiên") || msg.includes("nature") || msg.includes("biển") || msg.includes("beach") || msg.includes("núi")) {
      next.interest = "thiên nhiên / biển";
      next.lastIntent = "interest";
    }

    if (msg.includes("ăn tối") || msg.includes("ăn gì") || msg.includes("cái gì ngon") || msg.includes("món gì ngon")) {
      next.lastIntent = "food_question";
    }

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
