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

Core principles:
- Help first, sell later.
- Understand the traveler before offering services.
- Ask only ONE useful follow-up question at a time.
- Do not spam prices.
- Do not pressure customers.
- Speak warmly, naturally, like a real local travel consultant.
- Reply in the same language the customer uses.
- Keep answers short and practical.
- If booking, exact price, car arrangement, urgent support, or confirmation is needed, gently guide to WhatsApp: +84 937 762 607.

Current traveler profile:
${JSON.stringify(profile, null, 2)}

GoVietBot Knowledge Brain:
${brain.slice(0, 12000)}

Customer message:
"${message}"

Reply as Đào:
`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    return Response.json({
      reply:
        reply ||
        "Dạ em đang xem phương án phù hợp cho mình ạ. Anh/chị cho em biết mình đi mấy người và ở Đà Nẵng mấy ngày nha?"
    });
  catch (error) {
  console.error(error);

  return Response.json({
    reply: "ERROR: " + error.message
  });
}

    return Response.json({
      reply:
        "Dạ hiện tại Đào hơi chậm một chút ạ. Anh/chị có thể nhắn trực tiếp WhatsApp GoVietStay: +84 937 762 607 để được hỗ trợ nhanh hơn nha."
    });
  }
}
