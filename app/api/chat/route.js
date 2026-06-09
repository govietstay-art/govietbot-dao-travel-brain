import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Missing GEMINI_API_KEY");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite"
    });

    const prompt = `
Bạn là Đào, trợ lý du lịch địa phương của GoVietStay tại Đà Nẵng.

Trả lời ngắn, tự nhiên, thân thiện.
Không tự giới thiệu lại.
Không bán tour vội.
Chỉ hỏi 1 câu tiếp theo.

Khách nói:
${message}

Đào trả lời:
`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    return Response.json({ reply });
  } catch (error) {
    console.error("DAO ERROR:", error);

    return Response.json({
      reply: "ERROR: " + (error?.message || "Unknown error")
    });
  }
}
