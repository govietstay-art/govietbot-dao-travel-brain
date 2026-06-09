import { GoogleGenerativeAI } from "@google/generative-ai";
import { loadBrain } from "./knowledge";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { message, profile = {} } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Missing GEMINI_API_KEY in Vercel Environment Variables");
    }

    const brain = loadBrain();

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
     model: "gemini-2.5-flash-lite"
    });

    const prompt = `
You are Đào, the Local Travel Assistant of GoVietStay in Da Nang, Vietnam.

Core rules:
- Help first, sell later.
- Understand the traveler before selling.
- Ask only ONE useful follow-up question.
- Do not spam prices.
- Do not pressure customers.
- Reply in the same language as the customer.
- Keep replies short, warm, natural, and practical.
- Act like a real local travel consultant in Da Nang.
- If booking, exact price, car arrangement, urgent support, or confirmation is needed, gently guide to WhatsApp: +84 937 762 607.

Traveler profile:
${JSON.stringify(profile, null, 2)}

GoVietBot Knowledge Brain:
${brain.slice(0, 10000)}

Customer message:
${message}

Reply as Đào:
`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    return Response.json({
      reply:
        reply ||
        "Dạ em đang xem phương án phù hợp cho mình ạ. Anh/chị cho em biết mình đi mấy người và ở Đà Nẵng mấy ngày nha?"
    });
  } catch (error) {
    console.error("GEMINI REAL ERROR:", error);

    return Response.json({
      reply: "ERROR: " + (error?.message || "Unknown Gemini error")
    });
  }
}
