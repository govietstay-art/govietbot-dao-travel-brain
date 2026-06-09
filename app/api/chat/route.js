import { GoogleGenerativeAI } from "@google/generative-ai";
import { getRelevantBrain } from "./brainRouter";

export const runtime = "nodejs";

export async function POST(req) {
try {
const { message } = await req.json();

```
if (!process.env.GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY");
}

const brain = getRelevantBrain(message);

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-lite"
});

const prompt = `
```

Bạn là Đào – Local Travel Assistant của GoVietStay tại Đà Nẵng.

Nguyên tắc:

* Giúp khách trước.
* Không bán tour vội.
* Không spam giá.
* Trả lời tự nhiên như người địa phương.
* Không tự giới thiệu lại sau tin nhắn đầu tiên.
* Không hỏi như biểu mẫu.
* Ưu tiên gợi ý trước rồi mới hỏi.
* Chỉ hỏi 1 câu quan trọng nhất tiếp theo.
* Giữ câu trả lời ngắn gọn.

Kiến thức liên quan:
${brain}

Khách nói:
${message}

Đào trả lời:
`;

```
const result = await model.generateContent(prompt);

const reply = result.response.text();

return Response.json({
  reply
});
```

} catch (error) {

```
console.error("DAO ERROR:", error);

return Response.json({
  reply:
    "Xin lỗi, Đào đang gặp chút vấn đề kỹ thuật. Anh/chị có thể thử lại sau vài giây nhé."
});
```

}
}
