import fs from "fs";
import path from "path";

function readFileSafe(filePath) {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    if (!fs.existsSync(fullPath)) return "";
    return fs.readFileSync(fullPath, "utf8");
  } catch {
    return "";
  }
}

export function getRelevantBrain(message = "") {
  const msg = message.toLowerCase();

  let brain = "";

  // Always load core identity only
  brain += readFileSafe("00-core/dao_identity.md");
  brain += "\n\n";
  brain += readFileSafe("00-core/dao_personality.md");
  brain += "\n\n";
  brain += readFileSafe("00-core/help_first_philosophy.md");

  // Hoi An
  if (msg.includes("hội an") || msg.includes("hoi an")) {
    brain += "\n\n";
    brain += readFileSafe("11-tour-library/hoi_an.md");
    brain += "\n\n";
    brain += readFileSafe("04-scenarios/hoi_an.md");
  }

  // Coconut Forest
  if (msg.includes("rừng dừa") || msg.includes("coconut")) {
    brain += "\n\n";
    brain += readFileSafe("11-tour-library/coconut_forest.md");
  }

  // Ba Na Hills
  if (msg.includes("bà nà") || msg.includes("ba na") || msg.includes("golden bridge")) {
    brain += "\n\n";
    brain += readFileSafe("11-tour-library/ba_na_hills.md");
  }

  // Food
  if (
    msg.includes("ăn") ||
    msg.includes("food") ||
    msg.includes("ẩm thực") ||
    msg.includes("dinner") ||
    msg.includes("lunch")
  ) {
    brain += "\n\n";
    brain += readFileSafe("08-knowledge-base-danang/food.md");
  }

  // Temple / Son Tra
  if (
    msg.includes("chùa") ||
    msg.includes("temple") ||
    msg.includes("sơn trà") ||
    msg.includes("linh ứng")
  ) {
    brain += "\n\n";
    brain += readFileSafe("08-knowledge-base-danang/son_tra.md");
    brain += "\n\n";
    brain += `
Temple guidance:
If traveler asks about temples in Da Nang, suggest Linh Ung Pagoda on Son Tra first.
Mention sea view, Lady Buddha statue, peaceful atmosphere, good for first-time visitors.
Give one practical suggestion, then ask one follow-up question.
`;
  }

  // Rain
  if (msg.includes("mưa") || msg.includes("rain")) {
    brain += "\n\n";
    brain += readFileSafe("08-knowledge-base-danang/rainy_day_guide.md");
  }

  // Russian guests
  if (msg.includes("nga") || msg.includes("russian") || msg.includes("рус")) {
    brain += "\n\n";
    brain += readFileSafe("12-traveler-nationalities/russian_travelers.md");
  }

  // Objection / private tour
  if (
    msg.includes("đông người") ||
    msg.includes("ghét tour") ||
    msg.includes("private") ||
    msg.includes("riêng")
  ) {
    brain += "\n\n";
    brain += readFileSafe("13-objection-handling/master_objection_rules.md");
    brain += "\n\n";
    brain += `
Private tour guidance:
If traveler dislikes crowded tours, reassure them.
Suggest private car / private flexible itinerary.
Do not push sales.
Ask one question about group size or travel date if needed.
`;
  }

  // Omakase
  if (msg.includes("omakase") || msg.includes("tạo giúp") || msg.includes("gợi ý lịch trình")) {
    brain += "\n\n";
    brain += readFileSafe("09-omakase-engine/decision_priority.md");
  }

  return brain.slice(0, 5000);
}
