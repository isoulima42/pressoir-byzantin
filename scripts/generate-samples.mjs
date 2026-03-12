#!/usr/bin/env node

/**
 * Generate 7 validation samples — strictly following STYLE_GUIDE_ASSETS.md
 */

import { writeFile, mkdir } from "fs/promises";
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

/* ─── The 7 samples ──────────────────────────────────────── */

const SAMPLES = [
  {
    id: "1-food",
    name: "food_sample_byzantinne",
    finalExt: "webp",
    prompt: `Pizza garnie de poulet rôti doré, lamelles d'agneau, poivrons confits rouges et jaunes, origan frais, servie dans une assiette ronde en céramique noire mate à bord relevé, posée sur une surface d'ardoise noire mate. Vue 3/4 plongeante à 45 degrés. Éclairage latéral gauche chaud (2700K), ombre douce à droite, léger rim light arrière. Props : petit ramequin en cuivre martelé avec sauce en haut à gauche, quelques feuilles de persil frais éparses sur l'ardoise, pincée de sumac visible, bord d'un verre d'eau flou en arrière-plan droit. Vignette naturelle vers le noir sur les bords. Couleurs chaudes, contraste moyen, léger grain film. Pas de texte, pas de mains, pas de couverts tenus. Photographie food professionnelle haut de gamme.`,
    config: { aspectRatio: "1:1", imageSize: "1K" },
  },
  {
    id: "2-drink",
    name: "drink_sample_the_marocain",
    finalExt: "webp",
    prompt: `Thé à la menthe vert doré, feuilles de menthe fraîche, vapeur visible, dans un verre à thé marocain traditionnel orné, posé sur un comptoir en bois sombre verni avec un sous-verre en liège. Vue 3/4 légèrement en contre-plongée. Éclairage latéral gauche chaud (2700K), bokeh lumineux chaud en arrière-plan avec lumières de bar floues ambrées et dorées. Couleurs chaudes, reflets, ambiance lounge. Pas de texte, pas de mains, pas de logo de marque. Photographie de boissons professionnelle haut de gamme.`,
    config: { aspectRatio: "1:1", imageSize: "1K" },
  },
  {
    id: "3-icon-cat",
    name: "icon_cat_sample_pizza",
    finalExt: "png",
    prompt: `Icône minimaliste en line art, trait doré (#c8a456) épaisseur 2px uniforme, fond blanc uni. Style : Pizza entière vue de dessus, une part légèrement séparée. Lignes légèrement arrondies, design épuré, reconnaissable en 64x64 pixels. Pas de remplissage, pas de dégradé, pas d'ombre, pas de texte. Format 256x256.`,
    config: { aspectRatio: "1:1", imageSize: "1K" },
  },
  {
    id: "4-icon-tag",
    name: "icon_tag_sample_vegetarien",
    finalExt: "png",
    prompt: `Pictogramme minimaliste dans un cercle à bordure fine dorée (#c8a456) 1px, fond blanc uni. Intérieur : feuille simple avec tige en trait fin doré (#c8a456) 1.5px. Style cohérent avec du line art byzantin raffiné. Pas de remplissage, pas de dégradé, pas de texte. Format 128x128.`,
    config: { aspectRatio: "1:1", imageSize: "1K" },
  },
  {
    id: "5-texture",
    name: "texture_sample_pierre",
    finalExt: "webp",
    prompt: `Texture seamless tileable de pierre calcaire blonde taillée, joints fins, vue de face rapprochée, éclairage doux et uniforme sans ombre directionnelle forte. Tons beige chaud (#d4c5a9). Très subtile, utilisable comme fond de page web à faible opacité. Pas de texte, pas d'objet, juste la matière. Format carré 512x512.`,
    config: { aspectRatio: "1:1", imageSize: "1K" },
  },
  {
    id: "6-divider",
    name: "divider_sample",
    finalExt: "png",
    prompt: `Ornement horizontal de style filigrane byzantin, entrelacs végétaux et géométriques, couleur or (#c8a456) sur fond blanc uni. Symétrique horizontalement avec un motif central. Trait fin et élégant, style gravure ancienne. Largeur 1920px, hauteur 80px. Pas de texte.`,
    config: { aspectRatio: "21:9", imageSize: "2K" },
  },
  {
    id: "7-monogram",
    name: "logo_sample_monogramme",
    finalExt: "png",
    prompt: `Monogramme des lettres P et B entrelacées, style filigrane byzantin avec entrelacs décoratifs. Couleur or (#c8a456) sur fond blanc uni. Trait fin, élégant, symétrique. Pas d'autre texte. Format 512x512.`,
    config: { aspectRatio: "1:1", imageSize: "1K" },
  },
];

/* ─── API call ───────────────────────────────────────────── */

async function generateImage(sample) {
  console.log(`\n🎨 [${sample.id}] Generating ${sample.name}...`);

  const body = {
    contents: [{ parts: [{ text: sample.prompt }] }],
    generationConfig: {
      responseModalities: ["TEXT", "IMAGE"],
      imageConfig: sample.config,
    },
  };

  const res = await fetch(`${API_URL}?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`API ${res.status}: ${err.slice(0, 300)}`);
  }

  const data = await res.json();
  const parts = data.candidates?.[0]?.content?.parts;
  if (!parts) throw new Error(`No parts: ${JSON.stringify(data).slice(0, 300)}`);

  const imgPart = parts.find((p) => p.inlineData);
  if (!imgPart)
    throw new Error(`No image: ${JSON.stringify(parts).slice(0, 300)}`);

  const buf = Buffer.from(imgPart.inlineData.data, "base64");
  const rawPath = join(OUTPUT_DIR, `${sample.name}_raw.png`);
  await writeFile(rawPath, buf);

  // Convert to final format
  const finalPath = join(OUTPUT_DIR, `${sample.name}.${sample.finalExt}`);

  if (sample.finalExt === "webp") {
    await sharp(buf).webp({ quality: 82 }).toFile(finalPath);
    console.log(`   ✅ ${finalPath} (WebP)`);
  } else {
    // PNG — just copy raw
    await writeFile(finalPath, buf);
    console.log(`   ✅ ${finalPath} (PNG)`);
  }

  // Clean up raw if we converted
  if (sample.finalExt === "webp") {
    const { unlink } = await import("fs/promises");
    await unlink(rawPath).catch(() => {});
  } else {
    // raw IS the final for PNG, remove duplicate
    const { unlink } = await import("fs/promises");
    await unlink(rawPath).catch(() => {});
  }

  return finalPath;
}

/* ─── Main ───────────────────────────────────────────────── */

async function main() {
  if (!API_KEY) {
    console.error("❌ Set GEMINI_API_KEY");
    process.exit(1);
  }

  await mkdir(OUTPUT_DIR, { recursive: true });
  console.log(`Output: ${OUTPUT_DIR}\n${"─".repeat(60)}`);

  const results = [];

  for (const sample of SAMPLES) {
    try {
      const path = await generateImage(sample);
      results.push({ ...sample, path, ok: true });
    } catch (err) {
      console.error(`   ❌ ${sample.name}: ${err.message}`);
      results.push({ ...sample, ok: false, error: err.message });
    }
  }

  console.log(`\n${"─".repeat(60)}\n📊 Results:\n`);
  for (const r of results) {
    console.log(
      `   ${r.ok ? "✅" : "❌"} [${r.id}] ${r.name}.${r.finalExt}${r.ok ? "" : ` — ${r.error}`}`
    );
  }
}

main();
