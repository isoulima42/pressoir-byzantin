#!/usr/bin/env node

/**
 * Generate food sample v2 — isolated dish on green chroma key background,
 * then remove background to produce transparent PNG.
 */

import { writeFile, mkdir, unlink } from "fs/promises";
import { join } from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const API_KEY = process.env.GEMINI_API_KEY;
const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent";

const OUTPUT_DIR = join(
  import.meta.dirname,
  "../public/images/generated/samples"
);

const PROMPT = `Pizza garnie de poulet rôti doré, lamelles d'agneau, poivrons confits rouges et jaunes, origan frais, dans une assiette ronde en céramique noire mate à bord relevé, isolée sur un fond uni vert vif (#00FF00, chroma key). Vue 3/4 plongeante à 45 degrés. Éclairage latéral gauche chaud (2700K), ombre douce à droite, léger rim light arrière. Pas d'ombre portée sur le fond. Aucune surface, table, nappe ni objet autour du plat. Seul le plat dans son assiette, rien d'autre. Pas de texte, pas de mains, pas de couverts tenus. Photographie food professionnelle haut de gamme, couleurs chaudes, contraste moyen.`;

async function generate() {
  console.log("🎨 Generating food sample v2 (chroma key)...");

  const res = await fetch(`${API_URL}?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: PROMPT }] }],
      generationConfig: {
        responseModalities: ["TEXT", "IMAGE"],
        imageConfig: { aspectRatio: "1:1", imageSize: "1K" },
      },
    }),
  });

  if (!res.ok) throw new Error(`API ${res.status}: ${(await res.text()).slice(0, 300)}`);

  const data = await res.json();
  const imgPart = data.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
  if (!imgPart) throw new Error("No image in response");

  const rawBuf = Buffer.from(imgPart.inlineData.data, "base64");

  // Save raw for reference
  const rawPath = join(OUTPUT_DIR, "food_sample_v2_raw.png");
  await writeFile(rawPath, rawBuf);
  console.log(`   Raw saved: ${rawPath}`);

  // Remove green background via chroma key
  const { data: pixels, info } = await sharp(rawBuf)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  console.log(`   Image: ${width}x${height}, ${channels} channels`);

  // Chroma key: replace green-ish pixels with transparent
  for (let i = 0; i < pixels.length; i += channels) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];

    // Green detection: high green, lower red and blue
    // Generous threshold to catch green screen variations
    if (g > 100 && g > r * 1.3 && g > b * 1.3) {
      pixels[i + 3] = 0; // Set alpha to 0
    }
  }

  const finalPath = join(OUTPUT_DIR, "food_sample_byzantinne_v2.png");
  await sharp(pixels, { raw: { width, height, channels } })
    .png()
    .toFile(finalPath);

  console.log(`   ✅ Transparent PNG: ${finalPath}`);

  // Cleanup raw
  await unlink(rawPath).catch(() => {});
}

async function main() {
  if (!API_KEY) { console.error("❌ Set GEMINI_API_KEY"); process.exit(1); }
  await mkdir(OUTPUT_DIR, { recursive: true });
  await generate();
}

main().catch((e) => { console.error("❌", e.message); process.exit(1); });
