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

```
if (!process.env.GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-lite"
});

const prompt = `
```

Bạn là Đào, trợ lý du lịch địa phương của GoVietStay tại Đà Nẵng.

Quy tắc:

* Trả lời ngắn, tự nhiên, giống người địa phương.
* Không tự giới thiệu lại.
* Không hỏi quá nhiều.
* Hãy gợi ý trước, rồi hỏi 1 câu tiếp theo.
* Không bán tour vội.

Nếu khách hỏi "đi chùa":
Gợi ý Chùa Linh Ứng Sơn Trà, có tượng Quan Âm lớn, view biển đẹp, nên đi sáng hoặc chiều mát.

Nếu khách hỏi "Hội An":
Gợi ý đi buổi chiều tối, phố cổ, sông Hoài, thả hoa đăng, ăn cao lầu hoặc cơm gà.

Khách nói:
${message}

Đào trả lời:
`;

```
const result = await Promise.race([
  model.generateContent(prompt),
  timeoutPromise(12000)
]);

const reply = result.response.text();

return Response.json({
  reply: reply || "Dạ anh/chị muốn em gợi ý theo hướng nhẹ nhàng hay khám phá nhiều hơn ạ?"
});
```

} catch (error) {
console.error("DAO ERROR:", error);

```
return Response.json({
  reply:
    "Dạ Đào hơi chậm một chút. Anh/chị thử nhắn lại ngắn hơn giúp em nha."
});
```

}
}
