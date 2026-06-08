import fs from "fs";
import path from "path";
export const runtime = "nodejs";

function readMarkdownFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;

  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && !["node_modules", ".git", ".next", "app"].includes(file)) {
      results = results.concat(readMarkdownFiles(fullPath));
    } else if (file.endsWith(".md")) {
      results.push({ file, content: fs.readFileSync(fullPath, "utf8") });
    }
  }
  return results;
}

function findBestKnowledge(message, knowledge) {
  const msg = message.toLowerCase();
  const words = msg.split(/\s+/).filter((w) => w.length > 2);

  return knowledge
    .map((item) => {
      const text = item.content.toLowerCase();
      let score = 0;
      for (const word of words) if (text.includes(word)) score++;
      return { ...item, score };
    })
    .sort((a, b) => b.score - a.score)[0];
}

export async function POST(req) {
  const { message } = await req.json();

  const knowledge = readMarkdownFiles(process.cwd());

console.log("CWD:", process.cwd());
console.log("KNOWLEDGE FILES:", knowledge.length);

const best = findBestKnowledge(message, knowledge);

  let reply;

  if (best && best.score > 0 && best.content.trim().length > 20) {
    reply =
      "Em hiểu rồi ạ. Em là Đào – Local Travel Assistant tại Đà Nẵng.\n\n" +
      "Dựa trên Travel Brain của GoVietStay, em gợi ý theo hướng phù hợp và dễ đi nhất:\n\n" +
      best.content.slice(0, 900) +
      "\n\nNếu anh/chị muốn em thiết kế lịch trình riêng kiểu Omakase, mình có thể trao đổi nhanh qua WhatsApp: +84 937 762 607";
  } else {
    reply =
      "Em là Đào – Local Travel Assistant tại Đà Nẵng. Em có thể hỗ trợ Ba Na Hills, Hội An, Huế, Omakase Experience, SIM, airport transfer và local tips. Anh/chị đi mấy người và ở Đà Nẵng mấy ngày ạ?";
  }

  return Response.json({ reply });
}
