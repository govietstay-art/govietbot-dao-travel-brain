import fs from "fs";
import path from "path";

const BRAIN_FOLDERS = [
  "00-core",
  "01-customer-psychology",
  "02-market-intelligence",
  "03-govietstay-tours",
  "04-scenarios",
  "05-whatsapp-flow",
  "06-real-cases",
  "07-language-brain",
  "08-knowledge-base-danang",
  "09-omakase-engine",
  "10-govietstay-business-brain",
  "11-tour-library",
  "12-traveler-nationalities",
  "12.5-vietnamese-traveler-brain",
  "13-objection-handling",
  "14-happy-travelers-memory"
];

export function loadBrain() {
  let brain = "";

  try {
    for (const folder of BRAIN_FOLDERS) {
      const folderPath = path.join(process.cwd(), folder);

      if (!fs.existsSync(folderPath)) continue;

      const files = fs.readdirSync(folderPath);

      for (const file of files) {
        if (!file.endsWith(".md")) continue;

        const filePath = path.join(folderPath, file);

        const content = fs.readFileSync(filePath, "utf8");

        brain += `

### FILE: ${folder}/${file}

${content}

`;
      }
    }
  } catch (err) {
    console.error(err);
  }

  return brain;
}
