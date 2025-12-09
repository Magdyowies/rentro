import { Jimp } from "jimp";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT = path.join(process.cwd(), "attached_assets/title_1765265412469.jpg");
const OUTPUT = path.join(process.cwd(), "attached_assets/rentora_logo_transparent.png");

async function removeBackground() {
  try {
    console.log(`Reading image from ${INPUT}...`);
    const image = await Jimp.read(INPUT);
    
    console.log("Processing image...");
    const threshold = 20; // Sensitivity for white removal

    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];

      // If the pixel is white (or very close to it), make it transparent
      if (red > 255 - threshold && green > 255 - threshold && blue > 255 - threshold) {
        this.bitmap.data[idx + 3] = 0; // Set alpha to 0
      }
    });

    console.log(`Writing output to ${OUTPUT}...`);
    await image.write(OUTPUT);
    console.log("Done!");
  } catch (error) {
    console.error("Error processing image:", error);
    process.exit(1);
  }
}

removeBackground();
