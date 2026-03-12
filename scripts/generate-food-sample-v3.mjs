#!/usr/bin/env node

/**
 * Generate food sample v3 — improved chroma key with HSV-based green removal
 * and edge anti-aliasing for cleaner cutout.
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

const PROMPT = `Pizza garnie de poulet rôti doré, lamelles d'agneau, poivrons confits rouges et jaunes, origan frais, dans une assiette ronde en céramique noire mate à bord relevé, isolée sur un fond uni vert vif (#00FF00, chroma key). Vue 3/4 plongeante à 45 degrés. Éclairage latéral gauche chaud (2700K), ombre douce à droite, léger rim light arrière. Pas d'ombre portée sur le fond vert. Aucune surface, table, nappe ni objet autour du plat. Seul le plat dans son assiette, rien d'autre. Le fond vert doit être uniforme et continu autour du plat. Pas de texte, pas de mains, pas de couverts tenus. Photographie food professionnelle haut de gamme, couleurs chaudes, contraste moyen.`;

/**
 * HSV-based chroma key — much better at catching green variations
 * than simple RGB threshold
 */
function chromaKey(pixels, channels) {
  for (let i = 0; i < pixels.length; i += channels) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];

    // Convert to HSV
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let h = 0;
    if (delta > 0) {
      if (max === g) {
        h = 60 * (((b - r) / delta) + 2);
      } else if (max === r) {
        h = 60 * (((g - b) / delta) % 6);
      } else {
        h = 60 * (((r - g) / delta) + 4);
      }
    }
    if (h < 0) h += 360;

    const s = max === 0 ? 0 : delta / max; // 0..1
    const v = max / 255; // 0..1

    // Green hue range: ~70-170 degrees
    const isGreenHue = h >= 60 && h <= 180;
    // Must have some saturation and not be too dark
    const hasSaturation = s > 0.15;
    const notTooDark = v > 0.10;

    if (isGreenHue && hasSaturation && notTooDark) {
      // Soft falloff based on how "green" it is
      const greenness = Math.min(1, s * (1 - Math.abs(h - 120) / 60));

      if (greenness > 0.3) {
        // Fully transparent for clearly green pixels
        pixels[i + 3] = 0;
      } else if (greenness > 0.1) {
        // Partial transparency for edge pixels (anti-aliasing)
        const alpha = Math.round(255 * (1 - (greenness - 0.1) / 0.2));
        pixels[i + 3] = Math.min(pixels[i + 3], alpha);
      }
    }
  }
}

async function generate() {
  console.log("🎨 Generating food sample v3 (improved chroma key)...");

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

  // Save raw for inspection
  const rawPath = join(OUTPUT_DIR, "food_sample_v3_raw.png");
  await writeFile(rawPath, rawBuf);
  console.log(`   Raw saved: ${rawPath}`);

  // Process: ensure alpha channel, get raw pixels
  const { data: pixels, info } = await sharp(rawBuf)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  console.log(`   Image: ${width}x${height}, ${channels}ch`);

  // Apply HSV-based chroma key
  chromaKey(pixels, channels);

  // Save transparent PNG
  const finalPath = join(OUTPUT_DIR, "food_sample_byzantinne_v3.png");
  await sharp(pixels, { raw: { width, height, channels } })
    .png()
    .toFile(finalPath);

  console.log(`   ✅ Transparent PNG: ${finalPath}`);

  // Check file size
  const { stat } = await import("fs/promises");
  const s = await stat(finalPath);
  console.log(`   Size: ${(s.size / 1024).toFixed(0)} KB`);
}

async function main() {
  if (!API_KEY) { console.error("❌ Set GEMINI_API_KEY"); process.exit(1); }
  await mkdir(OUTPUT_DIR, { recursive: true });
  await generate();
}

main().catch((e) => { console.error("❌", e.message); process.exit(1); });
