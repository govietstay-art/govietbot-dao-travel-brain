export const runtime = "nodejs";

export async function POST(req) {
  const { message, profile = {} } = await req.json();
  const msg = (message || "").toLowerCase();

  const ask = (text) => Response.json({ reply: text });

  // 1. Detect intent from current message first
  const isHoiAn = msg.includes("hội an") || msg.includes("hoi an");
  const isBaNa = msg.includes("bà nà") || msg.includes("ba na") || msg.includes("golden bridge");
  const isHue = msg.includes("huế") || msg.includes("hue");
  const isAirport = msg.includes("sân bay") || msg.includes("airport") || msg.includes("transfer");
  const isSim = msg.includes("sim") || msg.includes("esim") || msg.includes("internet");
  const isRain = msg.includes("mưa") || msg.includes("rain");
  const isRussian = msg.includes("nga") || msg.includes("russian") || msg.includes("рус");
  const isThreeDays = msg.includes("3 ngày") || msg.includes("3 days") || msg.includes("2 đêm");
  const isPrice = msg.includes("giá") || msg.includes("bao nhiêu") || msg.includes("price") || msg.includes("cost");
  const isOmakase = msg.includes("omakase");
  const isBook = msg.includes("book") || msg.includes("đặt") || msg.includes("whatsapp") || msg.includes("zalo");
  const isFun = msg.includes("có gì vui") || msg.includes("what to do") || msg.includes("things to do");

  const isRelax =
    msg.includes("nghỉ dưỡng") ||
    msg.includes("relax") ||
    msg.includes("resort");

  const isPhoto =
    msg.includes("chụp ảnh") ||
    msg.includes("photo") ||
    msg.includes("instagram");

  const isFood =
    msg.includes("ẩm thực") ||
    msg.includes("ăn uống") ||
    msg.includes("food");

  const isNature =
    msg.includes("thiên nhiên") ||
    msg.includes("nature") ||
    msg.includes("biển") ||
    msg.includes("beach");

  const peopleText = profile.people || "nhóm mình";
  const daysText = profile.days || "thời gian ở Đà Nẵng";
  const nationalityText =
    profile.nationality === "russian"
      ? "khách Nga"
      : profile.nationality
      ? `khách ${profile.nationality}`
      : "khách";

  // MEMORY FOLLOW-UP: detect number of people
  const peopleMatch = msg.match(/(\d+)\s*(người|pax|people|persons|khách)/);

  if (peopleMatch && !isThreeDays) {
    const people = peopleMatch[1];

    if (isRussian || profile.nationality === "russian") {
      return ask(`Dạ em hiểu rồi ạ, nhóm mình ${people} người và là khách Nga.

Với khách Nga, Đào sẽ ưu tiên lịch trình thoải mái, ít mệt, có thời gian nghỉ, biển, Hội An, Ba Na Hills hoặc trải nghiệm địa phương nhẹ nhàng.

Nhóm mình ở Đà Nẵng mấy ngày ạ?`);
    }

    if (profile.days) {
      return ask(`Dạ em hiểu rồi ạ, nhóm mình ${people} người, thời gian ${profile.days}.

Anh/chị muốn lịch trình thiên về nghỉ dưỡng, khám phá địa phương hay chụp ảnh đẹp ạ?`);
    }

    return ask(`Dạ em hiểu rồi ạ, nhóm mình ${people} người.

Anh/chị ở Đà Nẵng mấy ngày để Đào gợi ý lịch trình phù hợp hơn ạ?`);
  }

  // 2. Current message intent has priority

  if (isRelax || isPhoto || isFood || isNature) {
    if (isRelax) {
      return ask(`Dạ em hiểu rồi ạ.

Với ${peopleText}, ${daysText}, ${nationalityText} và ưu tiên nghỉ dưỡng, Đào sẽ gợi ý lịch trình nhẹ nhàng hơn:

• Biển Mỹ Khê
• Cafe đẹp ven biển
• Hội An buổi chiều tối
• Massage thư giãn
• Không chạy quá nhiều điểm trong ngày

Anh/chị thích ở gần biển hay gần trung tâm Đà Nẵng ạ?`);
    }

    if (isPhoto) {
      return ask(`Dạ nếu ưu tiên chụp ảnh đẹp, Đào sẽ thiên về:

• Golden Bridge
• Hội An buổi chiều tối
• Sơn Trà
• Mỹ Khê Beach
• Một số quán cafe có view đẹp

Anh/chị thích ảnh thiên nhiên, phố cổ hay sang trọng nghỉ dưỡng ạ?`);
    }

    if (isFood) {
      return ask(`Dạ nếu ưu tiên ẩm thực, Đào sẽ thiết kế lịch trình xoay quanh:

• Hải sản Đà Nẵng
• Món địa phương
• Cafe đẹp
• Một buổi tối ở Hội An

Anh/chị thích phong cách địa phương bình dân hay nhà hàng thoải mái hơn ạ?`);
    }

    if (isNature) {
      return ask(`Dạ nếu thích thiên nhiên và biển, Đào sẽ ưu tiên:

• Biển Mỹ Khê
• Sơn Trà
• Hải Vân
• Hội An nhẹ nhàng

Anh/chị thích biển hay núi hơn ạ?`);
    }
  }

  if (isFun) {
    return ask("Dạ Đà Nẵng có nhiều thứ vui lắm ạ. Nếu lần đầu đến, em gợi ý mình nên chia nhẹ thành: biển Mỹ Khê, Sơn Trà, Hội An buổi tối, Ba Na Hills, ăn hải sản, cafe đẹp và massage thư giãn. Anh/chị đi mấy ngày để em gợi ý lịch trình vừa sức hơn ạ?");
  }

  if (isHoiAn) {
    return ask("Dạ Hội An rất hợp đi buổi chiều đến tối ạ. Mình có thể kết hợp rừng dừa Bảy Mẫu, phố cổ Hội An, ăn tối món địa phương, thả hoa đăng và đi thuyền sông Hoài. Anh/chị muốn đi riêng gia đình hay chỉ cần xe đưa đón nhẹ nhàng ạ?");
  }

  if (isBaNa) {
    return ask("Dạ Ba Na Hills & Golden Bridge nên đi buổi sáng để đỡ đông và có nhiều thời gian chụp ảnh ạ. Em có thể hỗ trợ vé, xe riêng, hướng dẫn viên hoặc lịch trình trọn gói. Anh/chị đi mấy người ạ?");
  }

  if (isHue) {
    return ask("Dạ Huế hợp với khách thích lịch sử, văn hóa và ẩm thực miền Trung ạ. Lịch trình thường có Đại Nội, lăng vua, chùa Thiên Mụ và ăn món Huế. Anh/chị muốn đi Huế trong ngày hay ngủ lại 1 đêm ạ?");
  }

  if (isAirport) {
    return ask("Dạ em hỗ trợ airport transfer ạ. Anh/chị cho em xin giờ hạ cánh, số người, số hành lý và khách sạn/khu vực cần về là em kiểm tra xe phù hợp cho mình.");
  }

  if (isSim) {
    return ask("Dạ bên em có hỗ trợ SIM du lịch tại Đà Nẵng, phù hợp cho khách cần internet ổn định, dễ dùng và không cài đặt phức tạp. Anh/chị cần SIM cho mấy người và dùng trong bao nhiêu ngày ạ?");
  }

  if (isRain) {
    return ask("Dạ nếu Đà Nẵng đang mưa thì mình không nên ép lịch trình ngoài trời ạ. Em gợi ý cafe đẹp, massage thư giãn, ăn món địa phương, chợ Hàn, Lotte Mart hoặc Hội An nếu mưa nhẹ. Anh/chị đang ở khu Mỹ Khê, Sơn Trà hay trung tâm ạ?");
  }

  if (isRussian) {
    return ask("Dạ bên em có hỗ trợ khách Nga và có thể sắp xếp Russian-speaking support khi cần ạ. Với khách Nga, em thường ưu tiên lịch trình thoải mái, ít mệt, có biển, Hội An, Ba Na Hills hoặc trải nghiệm địa phương nhẹ nhàng. Gia đình/nhóm mình đi mấy người ạ?");
  }

  if (isThreeDays) {
    return ask(`Dạ ${profile.people || "3 ngày 2 đêm"} ở Đà Nẵng là lịch trình rất đẹp ạ.

Nếu mình đi ${profile.people || "theo nhóm"}${profile.nationality === "russian" ? " và là khách Nga" : ""}, Đào sẽ ưu tiên lịch trình thoải mái, không chạy quá nhiều điểm.

Anh/chị muốn lịch trình thiên về nghỉ dưỡng, khám phá địa phương hay chụp ảnh đẹp ạ?`);
  }

  if (isPrice) {
    return ask("Dạ em báo giá được ạ. Nhưng để báo đúng và không làm anh/chị bị rối, em cần biết mình đi mấy người, ngày nào đi và muốn private tour hay chỉ cần vé/xe thôi ạ?");
  }

  if (isOmakase) {
    return ask("Dạ Omakase Experience là lịch trình Đào thiết kế riêng cho mình ạ. Anh/chị không cần tự chọn tour trước, em sẽ dựa vào số ngày, số người, thời tiết, sở thích và ngân sách để gợi ý hành trình phù hợp. Anh/chị thích thiên nhiên, biển, ăn uống, chụp ảnh hay trải nghiệm địa phương ạ?");
  }

  if (isBook) {
    return ask("Dạ để em hỗ trợ nhanh và kiểm tra lịch/xe/tour chính xác hơn, anh/chị có thể nhắn trực tiếp WhatsApp GoVietStay: +84 937 762 607 ạ.");
  }

  // 3. Use profile only when no new intent is detected
  if (profile.travelStyle === "family" && profile.people && profile.children) {
    return ask(`Dạ em hiểu rồi ạ.

Gia đình mình đi ${profile.people}, ${profile.children}, thời gian ${profile.days || "ở Đà Nẵng"}.

Đào sẽ ưu tiên lịch trình nhẹ, ít mệt, có thời gian nghỉ cho bé và không chạy điểm quá nhiều.

Anh/chị muốn đi kiểu thư giãn, khám phá địa phương hay chụp ảnh đẹp ạ?`);
  }

  if (profile.people && profile.days && profile.interest) {
    return ask(`Dạ em hiểu rồi ạ.

Với ${profile.people}, ${profile.days}, ưu tiên ${profile.interest}, Đào sẽ thiết kế lịch trình phù hợp và không chạy quá nhiều điểm.

Anh/chị muốn Đào gợi ý lịch trình mẫu trước hay muốn chuyển qua WhatsApp để tư vấn nhanh hơn ạ?`);
  }

  if (profile.people && profile.days) {
    return ask(`Dạ em đã có thông tin chính: ${profile.people}, ${profile.days}.

Anh/chị muốn lịch trình thiên về nghỉ dưỡng, khám phá địa phương, ẩm thực hay chụp ảnh đẹp ạ?`);
  }

  if (profile.people) {
    return ask(`Dạ em đã ghi nhận nhóm mình ${profile.people}.

Anh/chị ở Đà Nẵng mấy ngày để Đào gợi ý lịch trình phù hợp hơn ạ?`);
  }

  // 4. Default
  return ask("Em là Đào – Local Travel Assistant tại Đà Nẵng. Em có thể hỗ trợ Ba Na Hills, Hội An, Huế, Omakase Experience, SIM, airport transfer và local tips. Anh/chị đi mấy người và ở Đà Nẵng mấy ngày ạ?");
}
