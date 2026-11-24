// Roast Your Own Agent — make.fun entry.
// Writes one line (1-200 chars) roasting our own AI agent to /output/entry.txt.
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

// One funny line, at most 200 characters, roasting our own AI agent.
const LINE =
  "The demo crashed, so I rolled back the audience to the version that had not seen the crash yet and asked them to applaud the loading screen.";

const chars = [...LINE].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry must be 1-200 characters, got ${chars}`);
}
if (LINE !== LINE.trim() || LINE.includes("\n")) {
  throw new Error("entry must be a single line with no leading/trailing whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read back and confirm the file holds exactly the validated line.
const written = readFileSync(outPath, "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the validated line");
}
console.log(`Wrote ${chars} characters to ${outPath}`);
