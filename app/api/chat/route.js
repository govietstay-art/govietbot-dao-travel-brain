export const runtime = "nodejs";

export async function POST(req) {
  const { message, profile = {} } = await req.json();
if (profile.travelStyle === "family" && profile.people && profile.children) {
  return Response.json({
    reply:
      `Dạ em hiểu rồi ạ.

Anh/chị đi ${profile.people || "theo nhóm gia đình"}, ${profile.children || "có trẻ em"}, thời gian ${profile.days}.

Đào sẽ ưu tiên lịch trình gia đình thoải mái, ít mệt và phù hợp trẻ nhỏ.

Anh/chị muốn Đào tư vấn bằng tiếng Việt, English, Русский, 中文 hay 한국어 ạ?
  });
}
  const msg = (message || "").toLowerCase();

  let reply = "";

  if (msg.includes("mưa") || msg.includes("rain")) {
    reply =
      "Nếu đang mưa ở Đà Nẵng, mình không nên ép lịch trình ngoài trời ạ. Em gợi ý đi theo hướng nhẹ nhàng hơn: cafe đẹp, massage thư giãn, ăn uống địa phương, hoặc lịch trình trong nhà. Anh/chị đang ở khu Mỹ Khê, Sơn Trà hay trung tâm Đà Nẵng ạ?";
  } else if (msg.includes("nga") || msg.includes("russian")) {
    reply =
      "Dạ em hiểu rồi ạ. Với gia đình khách Nga đi cùng vợ và 2 bé, Đào sẽ ưu tiên lịch trình thoải mái, ít mệt, có thời gian biển, ăn uống dễ chịu và các điểm nổi bật như Ba Na Hills, Hội An hoặc Omakase Family Experience. Hai bé khoảng bao nhiêu tuổi ạ?";
  } else if (msg.includes("3 ngày") || msg.includes("3 days") || msg.includes("2 đêm")) {
    reply =
      "Dạ 3 ngày 2 đêm ở Đà Nẵng là lịch trình rất đẹp ạ. Đào sẽ không vội báo giá trước, mình nên thiết kế lịch trình theo nhóm khách trước. Anh/chị đi mấy người ạ, có trẻ em hoặc người lớn tuổi đi cùng không?";
  } else if (msg.includes("giá") || msg.includes("bao nhiêu") || msg.includes("price")) {
    reply =
      "Dạ em có thể báo giá, nhưng để báo đúng và không làm anh/chị bị rối, Đào cần biết mình đi mấy người và muốn đi private tour hay ghép lịch trình nhẹ nhàng hơn ạ?";
  } else if (msg.includes("omakase")) {
    reply =
      "Omakase Experience là trải nghiệm Đào thiết kế riêng cho khách. Anh/chị không cần tự chọn tour trước, Đào sẽ dựa vào số ngày, số người, sở thích, thời tiết và ngân sách để gợi ý hành trình phù hợp nhất. Anh/chị thích thiên nhiên, nghỉ dưỡng, chụp ảnh hay khám phá địa phương ạ?";
  } else {
    reply =
      "Em là Đào – Local Travel Assistant tại Đà Nẵng. Em có thể hỗ trợ Ba Na Hills, Hội An, Huế, Omakase Experience, SIM, airport transfer và local tips. Anh/chị đi mấy người và ở Đà Nẵng mấy ngày ạ?";
  }

  return Response.json({ reply });
}
