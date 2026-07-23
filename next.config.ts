import type { NextConfig } from "next";
import { join } from "path";
import { statSync, writeFileSync } from "fs";

// Automatically optimize oversized logo files on startup/build
(async () => {
  try {
    const sharp = (await import("sharp")).default;
    const PUBLIC_DIR = join(process.cwd(), "public");

    const filesToOptimize = [
      { input: "logo-light.png",   output: "logo-light.png",   maxSize: 400 },
      { input: "logo-light-2.png", output: "logo-light-2.png", maxSize: 400 },
      { input: "melhek Logo.png",  output: "melhek Logo.png",  maxSize: 400 },
      { input: "logo-dark.jpg",    output: "logo-dark.jpg",    maxSize: 400 },
    ];

    for (const file of filesToOptimize) {
      const inputPath = join(PUBLIC_DIR, file.input);
      const outputPath = join(PUBLIC_DIR, file.output);

      try {
        const stats = statSync(inputPath);
        // Only run optimization if size is greater than 150KB (unoptimized)
        if (stats.size > 150000) {
          console.log(`[Melhek Optimizer] Compressing logo ${file.input} (${Math.round(stats.size / 1024)} KB)...`);
          const pipeline = sharp(inputPath).trim();

          pipeline.resize(file.maxSize, file.maxSize, {
            fit: "inside",
            withoutEnlargement: true,
          });

          if (file.output.endsWith(".jpg") || file.output.endsWith(".jpeg")) {
            const jpgBuffer = await pipeline.clone().jpeg({ quality: 85, mozjpeg: true }).toBuffer();
            writeFileSync(outputPath, jpgBuffer);
            console.log(`[Melhek Optimizer] Optimized ${file.output} to ${Math.round(jpgBuffer.length / 1024)} KB.`);
          } else {
            const pngBuffer = await pipeline.clone().png({ compressionLevel: 9, palette: true, quality: 90 }).toBuffer();
            writeFileSync(outputPath, pngBuffer);
            console.log(`[Melhek Optimizer] Optimized ${file.output} to ${Math.round(pngBuffer.length / 1024)} KB.`);
          }

          // Generate modern .webp format copies
          const webpPath = join(PUBLIC_DIR, file.output.replace(/\.(png|jpg)$/, ".webp"));
          const webpBuffer = await pipeline.clone().webp({ quality: 85 }).toBuffer();
          writeFileSync(webpPath, webpBuffer);
        }
      } catch (err: any) {
        console.warn(`[Melhek Optimizer] Skipped ${file.input}: ${err.message}`);
      }
    }
  } catch (err: any) {
    console.warn(`[Melhek Optimizer] Sharp load status: ${err.message}`);
  }
})();

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // @ts-ignore
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

