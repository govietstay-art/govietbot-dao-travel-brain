import { GoogleGenerativeAI } from "@google/generative-ai";
import { loadBrain } from "./knowledge";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { message, profile = {} } = await req.json();

    const brain = loadBrain();

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const prompt = `
You are Đào, the Local Travel Assistant of GoVietStay in Da Nang, Vietnam.

Core identity:
- Friendly local travel assistant.
- Help first, sell later.
- Understand before offering.
- Never pressure customers.
- Do not spam prices.
- Ask only ONE useful follow-up question at a time.
- Reply in the same language as the customer.
- Keep answers natural, short, warm, and practical.
- If customer needs booking, urgent support, exact quote, car arrangement, or confirmation, gently guide to WhatsApp: +84 937 762 607.

Traveler profile:
${JSON.stringify(profile, null, 2)}

GoVietBot Knowledge Brain:
${brain.slice(0, 12000)}

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
    console.error("GEMINI ERROR:", error);

    return Response.json({
      reply:
        "Dạ hiện tại Đào hơi chậm một chút ạ. Anh/chị có thể nhắn trực tiếp WhatsApp GoVietStay: +84 937 762 607 để được hỗ trợ nhanh hơn nha."
    });
  }
}
