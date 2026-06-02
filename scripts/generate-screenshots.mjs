import sharp from "sharp";
import { readdir } from "fs/promises";
import { join } from "path";

const dir = "public/screenshots";
const files = (await readdir(dir)).filter((f) => f.endsWith(".svg"));

for (const file of files) {
  const base = file.replace(".svg", "");
  await sharp(join(dir, file), { density: 150 })
    .resize(1280)
    .png()
    .toFile(join(dir, `${base}.png`));
  console.log(`Generated ${base}.png`);
}
