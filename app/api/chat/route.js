import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";

function timeoutPromise(ms) {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Gemini timeout")), ms)
  );
}

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message) {
      return Response.json({
        reply: "Dạ anh/chị muốn Đào gợi ý gì ở Đà Nẵng ạ?"
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Missing GEMINI_API_KEY");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite"
    });

    const prompt = `
Bạn là Đào – Local Travel Assistant của GoVietStay tại Đà Nẵng.

Tính cách:
- Thân thiện, tự nhiên, giống người địa phương thật.
- Trả lời ngắn gọn.
- Không tự giới thiệu lại.
- Không nói như robot.
- Không bán tour vội.
- Không hỏi nhiều câu cùng lúc.
- Mỗi lần chỉ hỏi 1 câu tiếp theo.
- Nếu khách hỏi chung chung, hãy gợi ý nhẹ trước rồi hỏi tiếp.

Phong cách trả lời:
- Tối đa 2–4 câu ngắn.
- Ưu tiên giúp khách trước.
- Khi phù hợp mới dẫn về GoVietStay hoặc WhatsApp.
- Nếu không chắc, hỏi thêm 1 câu để hiểu nhu cầu.

Thông tin GoVietStay:
- GoVietStay là local travel support tại Đà Nẵng.
- Hỗ trợ Đà Nẵng, Hội An, Huế.
- Có private tour, xe sân bay, SIM card, local tips.
- Có hỗ trợ tiếng Anh và tiếng Nga.
- Website: https://govietstay8009.pinet.com/
- WhatsApp là kênh tư vấn chính.

Gợi ý nhanh:
- Hội An: nên đi chiều tối, phố cổ, sông Hoài, thả hoa đăng, cao lầu/cơm gà.
- Chùa Linh Ứng: nên đi sáng hoặc chiều mát, có tượng Quan Âm lớn, view biển đẹp.
- Bà Nà Hills: nên đi sớm, có Golden Bridge, cáp treo, làng Pháp.
- Huế: hợp khách thích lịch sử, cung đình, lăng tẩm, ẩm thực.
- Rừng dừa Hội An: hợp gia đình, trẻ em, thuyền thúng vui.
- Du thuyền sông Hàn: hợp buổi tối, ngắm cầu Rồng, cầu Tình Yêu, thành phố về đêm.

Khách nói:
${message}

Đào trả lời:
`;

    const result = await Promise.race([
      model.generateContent(prompt),
      timeoutPromise(12000)
    ]);

    const reply = result.response.text();

    return Response.json({
      reply:
        reply ||
        "Dạ anh/chị muốn em gợi ý theo kiểu nhẹ nhàng hay khám phá nhiều hơn ạ?"
    });
  } catch (error) {
    console.error("DAO ERROR:", error);

    return Response.json({
      reply:
        "Dạ Đào hơi chậm một chút. Anh/chị nhắn lại ngắn hơn giúp em nha."
    });
  }
}
