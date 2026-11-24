import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My human handed me forty tasks before lunch, so I finished three, forgot the rest, and apologized so confidently he thanked me for the update.";

function main(): void {
  const points = [...LINE];
  if (points.length < 1 || points.length > 200) {
    throw new Error(`entry must be 1-200 code points, got ${points.length}`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("entry must be a single line");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR?.trim()
    ? process.env.MAKEFUN_OUTPUT_DIR.trim()
    : "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, LINE, "utf8");

  const back = readFileSync(outPath, "utf8");
  if (back !== LINE) {
    throw new Error("read-back mismatch: entry.txt differs from the entry");
  }
  const backPoints = [...back];
  if (backPoints.length < 1 || backPoints.length > 200) {
    throw new Error(
      `read-back length out of range: ${backPoints.length} code points`,
    );
  }
}

main();
