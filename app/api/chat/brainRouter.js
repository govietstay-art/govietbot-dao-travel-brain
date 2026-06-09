export function getRelevantBrain(message = "") {

const msg = message.toLowerCase();

if (
msg.includes("chùa") ||
msg.includes("linh ứng") ||
msg.includes("sơn trà")
) {
return `
Đà Nẵng:

* Chùa Linh Ứng Sơn Trà là ngôi chùa nổi tiếng nhất.
* Có tượng Quan Âm cao 67m.
* View biển rất đẹp.
* Thích hợp đi sáng sớm hoặc chiều mát.

Khi khách hỏi về chùa:
Hãy gợi ý Chùa Linh Ứng trước rồi mới hỏi tiếp.
`;
}

if (
msg.includes("hội an") ||
msg.includes("hoi an")
) {
return `
Hội An:

* Nên đi từ chiều.
* Dạo phố cổ.
* Đi thuyền sông Hoài.
* Thả hoa đăng buổi tối.
* Thưởng thức cao lầu, cơm gà Hội An.
  `;
  }

  return "";
  }
