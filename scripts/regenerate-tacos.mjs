#!/usr/bin/env node

/**
 * Regenerate 3 French tacos — in black ceramic plate like all other dishes.
 */

import { writeFile, mkdir, stat } from "fs/promises";
import { join } from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const API_KEY = process.env.GEMINI_API_KEY;
const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent";
const OUTPUT_DIR = join(import.meta.dirname, "../public/images/generated/food");

function buildPrompt(desc, cont) {
  return `${desc}, dans ${cont}, isolé sur un fond uni vert vif (#00FF00, chroma key). Vue 3/4 plongeante à 45 degrés. Éclairage latéral gauche chaud (2700K), ombre douce à droite, léger rim light arrière. Pas d'ombre portée sur le fond vert. Aucune surface, table, nappe ni objet autour du plat. Seul le plat dans son contenant, rien d'autre. Le fond vert doit être uniforme et continu autour du plat. Pas de texte, pas de mains, pas de couverts tenus. Photographie food professionnelle haut de gamme, couleurs chaudes, contraste moyen.`;
}

const DISHES = [
  {
    name: "tacos_simple",
    desc: "French tacos (tacos français) : wrap rectangulaire grillé et doré au panini press, coupé en deux montrant l'intérieur avec 1 viande, fromage fondu filant, sauce, frites à l'intérieur",
    cont: "une assiette ronde en céramique noire mate à bord relevé"
  },
  {
    name: "tacos_maxxy",
    desc: "French tacos (tacos français) : grand wrap rectangulaire grillé et doré au panini press, coupé en deux montrant l'intérieur garni avec 2 viandes visibles, fromage fondu filant abondant, sauce, frites à l'intérieur",
    cont: "une assiette ronde en céramique noire mate à bord relevé"
  },
  {
    name: "tacos_pressoir",
    desc: "French tacos (tacos français) : très grand wrap rectangulaire grillé et doré au panini press, coupé en deux montrant l'intérieur débordant de 3 viandes différentes, fromage fondu filant très abondant, sauces multiples, frites à l'intérieur, le plus garni et généreux",
    cont: "une assiette ronde en céramique noire mate à bord relevé"
  },
];

function chromaKey(pixels, channels) {
  for (let i = 0; i < pixels.length; i += channels) {
    const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];
    const max = Math.max(r, g, b), min = Math.min(r, g, b), delta = max - min;
    let h = 0;
    if (delta > 0) {
      if (max === g) h = 60 * (((b - r) / delta) + 2);
      else if (max === r) h = 60 * (((g - b) / delta) % 6);
      else h = 60 * (((r - g) / delta) + 4);
    }
    if (h < 0) h += 360;
    const s = max === 0 ? 0 : delta / max;
    const v = max / 255;
    if (h >= 60 && h <= 180 && s > 0.15 && v > 0.10) {
      const greenness = Math.min(1, s * (1 - Math.abs(h - 120) / 60));
      if (greenness > 0.3) pixels[i + 3] = 0;
      else if (greenness > 0.1) pixels[i + 3] = Math.min(pixels[i + 3], Math.round(255 * (1 - (greenness - 0.1) / 0.2)));
    }
  }
}

async function generateOne(dish, i) {
  console.log(`\n🌯 [${i + 1}/3] ${dish.name}`);
  const res = await fetch(`${API_URL}?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: buildPrompt(dish.desc, dish.cont) }] }],
      generationConfig: { responseModalities: ["TEXT", "IMAGE"], imageConfig: { aspectRatio: "1:1", imageSize: "1K" } },
    }),
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  const data = await res.json();
  const imgPart = data.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
  if (!imgPart) throw new Error("No image");
  const rawBuf = Buffer.from(imgPart.inlineData.data, "base64");
  const { data: pixels, info } = await sharp(rawBuf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  chromaKey(pixels, info.channels);
  const outPath = join(OUTPUT_DIR, `${dish.name}.webp`);
  await sharp(pixels, { raw: { width: info.width, height: info.height, channels: info.channels } }).webp({ quality: 90 }).toFile(outPath);
  const s = await stat(outPath);
  console.log(`   ✅ ${dish.name}.webp (${(s.size / 1024).toFixed(0)} KB)`);
}

async function main() {
  if (!API_KEY) { console.error("❌ Set GEMINI_API_KEY"); process.exit(1); }
  await mkdir(OUTPUT_DIR, { recursive: true });
  for (let i = 0; i < DISHES.length; i++) await generateOne(DISHES[i], i);
  console.log("\n✅ Done.");
}

main();
