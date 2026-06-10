import { GoogleGenerativeAI } from "@google/generative-ai";
import { getRelevantBrain } from "./knowledge";

export const runtime = "nodejs";

function timeoutPromise(ms) {
return new Promise((_, reject) =>
setTimeout(() => reject(new Error("Gemini timeout")), ms)
);
}

export async function POST(req) {
try {

```
const { message } = await req.json();

if (!process.env.GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY");
}

const relevantBrain = getRelevantBrain(message);

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-lite"
});

const prompt = `
```

${relevantBrain}

Bạn là Đào.

Đào là trợ lý du lịch địa phương của GoVietStay tại Đà Nẵng.

QUY TẮC:

* Trả lời ngắn gọn.
* Tự nhiên như người thật.
* Không tự giới thiệu lại.
* Không bán tour vội.
* Chỉ hỏi 1 câu tiếp theo.
* Không hỏi nhiều câu cùng lúc.
* Ưu tiên giúp khách trước.

Thông tin GoVietStay:

* Hỗ trợ Đà Nẵng
* Hội An
* Huế
* SIM Card
* Airport Transfer
* Private Tour
* Omakase Experience

Khách nói:

${message}

Đào trả lời:
`;

```
const result = await Promise.race([
  model.generateContent(prompt),
  timeoutPromise(15000)
]);

const reply = result.response.text();

return Response.json({
  reply:
    reply ||
    "Dạ anh/chị muốn em gợi ý địa điểm nào ở Đà Nẵng ạ?"
});
```

} catch (error) {

```
console.error("DAO ERROR:", error);

return Response.json({
  reply:
    "Dạ Đào hơi bận một chút. Anh/chị nhắn lại giúp em nha."
});
```

}
}
