#!/usr/bin/env node

/**
 * Generate ALL 36 graphic elements for Le Pressoir Byzantin.
 * - 16 category icons (line art doré, 256x256 PNG)
 * - 6 tag icons (pictogramme cercle, 128x128 PNG)
 * - 4 branding elements (512x512 PNG)
 * - 6 decorative elements (various sizes PNG)
 * - 4 tileable textures (512x512 WebP)
 */

import { mkdir, stat, writeFile } from "fs/promises";
import { join } from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const API_KEY = process.env.GEMINI_API_KEY;
const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent";
const BASE_DIR = join(import.meta.dirname, "../public/images/generated");

/* ═══════════════════════════════════════════════════════════
   CATEGORY ICONS — line art doré (#c8a456) on white → transparent
   ═══════════════════════════════════════════════════════════ */

const CATEGORY_ICONS = [
  { name: "icon_salade", desc: "un saladier avec feuilles de salade" },
  { name: "icon_burger", desc: "un burger vu de profil avec bun, steak, salade" },
  { name: "icon_pizza", desc: "une part de pizza triangulaire avec fromage filant" },
  { name: "icon_pide", desc: "un pide turc en forme de bateau allongé ouvert" },
  { name: "icon_assiette", desc: "une assiette garnie vue de dessus avec garniture" },
  { name: "icon_shawarma", desc: "un wrap shawarma roulé avec garniture visible" },
  { name: "icon_tacos", desc: "un tacos garni vu de face" },
  { name: "icon_box", desc: "une box à emporter ouverte avec nourriture" },
  { name: "icon_crepe", desc: "une crêpe pliée en triangle" },
  { name: "icon_boissons_chaudes", desc: "une tasse fumante avec vapeur qui monte" },
  { name: "icon_boissons_fraiches", desc: "un verre avec paille et glaçons" },
  { name: "icon_bieres", desc: "une chope de bière avec mousse débordante" },
  { name: "icon_vins", desc: "un verre à vin élégant rempli à mi-hauteur" },
  { name: "icon_cocktails", desc: "un verre à cocktail coupe avec garniture" },
  { name: "icon_extras", desc: "des frites dans un cornet en papier" },
  { name: "icon_formules", desc: "un plateau repas combo avec plusieurs éléments" },
];

function buildCategoryIconPrompt(desc) {
  return `Icône minimaliste en line art, trait doré couleur or (#c8a456) épaisseur 2px uniforme, sur fond blanc uni (#FFFFFF). Style : ${desc}. Lignes légèrement arrondies, design épuré, reconnaissable réduit en 64x64 pixels. Uniquement du trait (stroke), pas de remplissage plein (fill), pas de dégradé, pas d'ombre portée, pas de texte. L'icône occupe environ 60% de l'espace. Format carré 256x256.`;
}

/* ═══════════════════════════════════════════════════════════
   TAG ICONS — pictogramme dans cercle doré on white → transparent
   ═══════════════════════════════════════════════════════════ */

const TAG_ICONS = [
  { name: "tag_vegetarien", desc: "une feuille simple avec tige" },
  { name: "tag_vegan", desc: "la lettre V stylisée avec une feuille" },
  { name: "tag_epice", desc: "un piment" },
  { name: "tag_sans_gluten", desc: "un épi de blé barré en diagonale" },
  { name: "tag_maison", desc: "une toque de chef" },
  { name: "tag_halal", desc: "un croissant de lune avec étoile" },
];

function buildTagIconPrompt(desc) {
  return `Pictogramme minimaliste dans un cercle à bordure fine dorée (#c8a456) 1px, sur fond blanc uni (#FFFFFF). À l'intérieur du cercle : ${desc} en trait fin doré (#c8a456) 1.5px. Style cohérent avec du line art byzantin raffiné. Pas de remplissage plein, pas de dégradé, pas de texte. Format carré 128x128.`;
}

/* ═══════════════════════════════════════════════════════════
   BRANDING — logo variants
   ═══════════════════════════════════════════════════════════ */

const BRANDING = [
  {
    name: "favicon",
    prompt: "Icône simplifiée d'un pressoir à raisins stylisé, design minimaliste et géométrique, couleur or (#c8a456) sur fond très sombre (#1a1612). Reconnaissable en 32x32 pixels. Silhouette simple et claire. Pas de texte. Format carré 512x512.",
    size: 512,
    removeWhite: false,
  },
  {
    name: "monogramme_pb",
    prompt: "Monogramme des lettres P et B entrelacées, style filigrane byzantin avec entrelacs décoratifs. Couleur or (#c8a456) sur fond blanc uni (#FFFFFF). Trait fin, élégant, symétrique. Les lettres sont ornées de motifs d'entrelacs. Pas d'autre texte. Format carré 512x512.",
    size: 512,
    removeWhite: true,
  },
  {
    name: "embleme_pressoir",
    prompt: "Illustration style gravure ancienne d'un pressoir à raisins en bois et pierre, encadré de motifs d'entrelacs byzantins et de grappes de vigne stylisées. Couleurs or (#c8a456) et crème (#faf8f5) sur fond blanc uni (#FFFFFF). Style en-tête de document ancien, line art détaillé. Pas de texte. Format carré 512x512.",
    size: 512,
    removeWhite: true,
  },
  {
    name: "logo_footer",
    prompt: "Logo élégant d'un restaurant méditerranéen : un pressoir à raisins stylisé entouré d'entrelacs byzantins et de grappes de vigne, design linéaire fin. Couleurs or clair (#c8a456) et crème (#faf8f5) sur fond très sombre (#1a1612). Style gravure raffinée. Pas de texte. Format carré 512x512.",
    size: 512,
    removeWhite: false,
  },
];

/* ═══════════════════════════════════════════════════════════
   DECORATIVE ELEMENTS
   ═══════════════════════════════════════════════════════════ */

const DECORATIVE = [
  {
    name: "divider_byzantin",
    prompt: "Ornement horizontal de style filigrane byzantin, entrelacs végétaux et géométriques complexes, couleur or (#c8a456) sur fond blanc uni (#FFFFFF). Symétrique horizontalement avec un motif central élaboré (rosace ou palmette). Trait fin et élégant, style gravure ancienne. Composition panoramique très allongée. Pas de texte.",
    ratio: "21:9",
    removeWhite: true,
    resize: { width: 1920, height: 80 },
  },
  {
    name: "divider_simple",
    prompt: "Ligne fine dorée horizontale (#c8a456) avec un petit losange orné au centre, sur fond blanc uni (#FFFFFF). Design très épuré et minimaliste, trait fin 1px. Symétrique. Composition panoramique très allongée. Pas de texte.",
    ratio: "21:9",
    removeWhite: true,
    resize: { width: 1920, height: 40 },
  },
  {
    name: "coin_ornement",
    prompt: "Motif décoratif d'angle (coin supérieur gauche) de style byzantin, arabesque et entrelacs, couleur or (#c8a456) sur fond blanc uni (#FFFFFF). Quart de rosace ou quart de mandala. Trait fin gravé, élégant. Le motif part du coin supérieur gauche et s'estompe vers le centre et le bas. Format carré 256x256. Pas de texte.",
    ratio: "1:1",
    removeWhite: true,
    resize: { width: 256, height: 256 },
  },
  {
    name: "coin_ornement_mirror",
    prompt: "Motif décoratif d'angle (coin supérieur droit) de style byzantin, arabesque et entrelacs, couleur or (#c8a456) sur fond blanc uni (#FFFFFF). Quart de rosace ou quart de mandala, miroir horizontal du coin gauche. Trait fin gravé, élégant. Le motif part du coin supérieur droit et s'estompe vers le centre et le bas. Format carré 256x256. Pas de texte.",
    ratio: "1:1",
    removeWhite: true,
    resize: { width: 256, height: 256 },
  },
  {
    name: "overlay_fumee",
    prompt: "Volutes de fumée blanche très diffuses et légères sur fond noir uni (#000000), se déplaçant horizontalement de gauche à droite. Vapeur éthérée, presque transparente, organique. Aucun objet, juste de la fumée/vapeur très subtile. Format panoramique 16:9.",
    ratio: "16:9",
    removeWhite: false,
    invertBlack: true, // black becomes transparent, white stays
    resize: { width: 1920, height: 600 },
  },
  {
    name: "overlay_grain",
    prompt: "Texture grain de film photographique très subtil, bruit fin quasi uniforme, tons gris moyen sur fond gris neutre (#808080). Tileable seamless, très discret. Pas de motif visible, juste du grain fin organique. Format carré 512x512.",
    ratio: "1:1",
    removeWhite: false,
    resize: { width: 512, height: 512 },
  },
];

/* ═══════════════════════════════════════════════════════════
   TEXTURES — tileable WebP
   ═══════════════════════════════════════════════════════════ */

const TEXTURES = [
  {
    name: "texture_pierre",
    prompt: "Texture seamless tileable de pierre calcaire méditerranéenne blonde taillée avec joints fins, vue de face rapprochée, éclairage doux et uniforme sans ombre directionnelle forte. Tons beige chaud (#d4c5a9). Très subtile, utilisable comme fond de page web à faible opacité. Pas de texte, pas d'objet, juste la matière. Format carré 512x512.",
  },
  {
    name: "texture_bois_sombre",
    prompt: "Texture seamless tileable de bois de chêne ancien patiné sombre avec veinage visible, vue de face rapprochée, éclairage doux et uniforme. Tons brun chocolat chaud (#1a1612 à #a0522d). Très subtile. Pas de texte, pas d'objet, juste la matière du bois. Format carré 512x512.",
  },
  {
    name: "texture_parchemin",
    prompt: "Texture seamless tileable de parchemin ancien ivoire avec légères imperfections naturelles, taches de thé très subtiles, vue de face rapprochée, éclairage uniforme. Tons ivoire chaud (#faf8f5). Très subtile. Pas de texte, pas d'objet. Format carré 512x512.",
  },
  {
    name: "texture_byzantin_pattern",
    prompt: "Motif géométrique byzantin répétitif seamless tileable, entrelacs et losanges, or terne (#c8a456) sur fond très sombre (#1a1612). Design discret et élégant, utilisable comme fond de page web. Éclairage uniforme. Pas de texte. Format carré 512x512.",
  },
];

/* ═══════════════════════════════════════════════════════════
   POST-PROCESSING: remove white background → transparent
   ═══════════════════════════════════════════════════════════ */

async function removeWhiteBg(inputBuf, threshold = 240) {
  const { data: pixels, info } = await sharp(inputBuf)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  for (let i = 0; i < pixels.length; i += channels) {
    const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];
    // White or near-white → transparent
    if (r > threshold && g > threshold && b > threshold) {
      const whiteness = Math.min(r, g, b);
      if (whiteness > threshold) {
        const alpha = Math.round(255 * (1 - (whiteness - threshold) / (255 - threshold)));
        pixels[i + 3] = Math.min(pixels[i + 3], alpha);
      }
    }
  }

  return { pixels, width, height, channels };
}

/* Invert: black background → transparent, keep light content */
async function invertBlackBg(inputBuf) {
  const { data: pixels, info } = await sharp(inputBuf)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  for (let i = 0; i < pixels.length; i += channels) {
    const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];
    const brightness = (r + g + b) / 3;
    // Set alpha based on brightness (dark = transparent, bright = opaque)
    pixels[i + 3] = Math.round(brightness);
    // Make content white
    pixels[i] = 255;
    pixels[i + 1] = 255;
    pixels[i + 2] = 255;
  }

  return { pixels, width, height, channels };
}

/* ═══════════════════════════════════════════════════════════
   GENERIC API CALL
   ═══════════════════════════════════════════════════════════ */

async function callAPI(prompt, ratio = "1:1") {
  const res = await fetch(`${API_URL}?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseModalities: ["TEXT", "IMAGE"],
        imageConfig: { aspectRatio: ratio, imageSize: ratio === "1:1" ? "1K" : "2K" },
      },
    }),
  });

  if (!res.ok) throw new Error(`API ${res.status}: ${(await res.text()).slice(0, 200)}`);

  const data = await res.json();
  const imgPart = data.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
  if (!imgPart) throw new Error("No image data");

  return Buffer.from(imgPart.inlineData.data, "base64");
}

/* ═══════════════════════════════════════════════════════════
   GENERATE FUNCTIONS
   ═══════════════════════════════════════════════════════════ */

async function generateCategoryIcon(icon, index, total) {
  console.log(`\n📌 [${index + 1}/${total}] ${icon.name}`);
  const rawBuf = await callAPI(buildCategoryIconPrompt(icon.desc));

  const { pixels, width, height, channels } = await removeWhiteBg(rawBuf);
  const outDir = join(BASE_DIR, "icons/categories");
  await mkdir(outDir, { recursive: true });
  const outPath = join(outDir, `${icon.name}.png`);

  await sharp(pixels, { raw: { width, height, channels } })
    .resize(256, 256)
    .png()
    .toFile(outPath);

  const s = await stat(outPath);
  console.log(`   ✅ ${icon.name}.png (${(s.size / 1024).toFixed(0)} KB)`);
  return { name: icon.name, ok: true, size: s.size };
}

async function generateTagIcon(icon, index, total) {
  console.log(`\n🏷️  [${index + 1}/${total}] ${icon.name}`);
  const rawBuf = await callAPI(buildTagIconPrompt(icon.desc));

  const { pixels, width, height, channels } = await removeWhiteBg(rawBuf);
  const outDir = join(BASE_DIR, "icons/tags");
  await mkdir(outDir, { recursive: true });
  const outPath = join(outDir, `${icon.name}.png`);

  await sharp(pixels, { raw: { width, height, channels } })
    .resize(128, 128)
    .png()
    .toFile(outPath);

  const s = await stat(outPath);
  console.log(`   ✅ ${icon.name}.png (${(s.size / 1024).toFixed(0)} KB)`);
  return { name: icon.name, ok: true, size: s.size };
}

async function generateBranding(item, index, total) {
  console.log(`\n🎨 [${index + 1}/${total}] ${item.name}`);
  const rawBuf = await callAPI(item.prompt);

  const outDir = join(BASE_DIR, "branding");
  await mkdir(outDir, { recursive: true });
  const outPath = join(outDir, `${item.name}.png`);

  if (item.removeWhite) {
    const { pixels, width, height, channels } = await removeWhiteBg(rawBuf);
    await sharp(pixels, { raw: { width, height, channels } })
      .resize(item.size, item.size)
      .png()
      .toFile(outPath);
  } else {
    await sharp(rawBuf).resize(item.size, item.size).png().toFile(outPath);
  }

  const s = await stat(outPath);
  console.log(`   ✅ ${item.name}.png (${(s.size / 1024).toFixed(0)} KB)`);
  return { name: item.name, ok: true, size: s.size };
}

async function generateDecorative(item, index, total) {
  console.log(`\n✨ [${index + 1}/${total}] ${item.name}`);
  const rawBuf = await callAPI(item.prompt, item.ratio);

  const outDir = join(BASE_DIR, "decorative");
  await mkdir(outDir, { recursive: true });
  const outPath = join(outDir, `${item.name}.png`);

  if (item.invertBlack) {
    const { pixels, width, height, channels } = await invertBlackBg(rawBuf);
    await sharp(pixels, { raw: { width, height, channels } })
      .resize(item.resize.width, item.resize.height, { fit: "fill" })
      .png()
      .toFile(outPath);
  } else if (item.removeWhite) {
    const { pixels, width, height, channels } = await removeWhiteBg(rawBuf);
    await sharp(pixels, { raw: { width, height, channels } })
      .resize(item.resize.width, item.resize.height, { fit: "fill" })
      .png()
      .toFile(outPath);
  } else {
    await sharp(rawBuf)
      .resize(item.resize.width, item.resize.height, { fit: "fill" })
      .png()
      .toFile(outPath);
  }

  const s = await stat(outPath);
  console.log(`   ✅ ${item.name}.png (${(s.size / 1024).toFixed(0)} KB)`);
  return { name: item.name, ok: true, size: s.size };
}

async function generateTexture(tex, index, total) {
  console.log(`\n🧱 [${index + 1}/${total}] ${tex.name}`);
  const rawBuf = await callAPI(tex.prompt);

  const outDir = join(BASE_DIR, "textures");
  await mkdir(outDir, { recursive: true });
  const outPath = join(outDir, `${tex.name}.webp`);

  await sharp(rawBuf).resize(512, 512).webp({ quality: 90 }).toFile(outPath);

  const s = await stat(outPath);
  console.log(`   ✅ ${tex.name}.webp (${(s.size / 1024).toFixed(0)} KB)`);
  return { name: tex.name, ok: true, size: s.size };
}

/* ═══════════════════════════════════════════════════════════
   BATCH RUNNER WITH RETRY
   ═══════════════════════════════════════════════════════════ */

async function runBatch(label, items, fn) {
  console.log(`\n${"═".repeat(55)}`);
  console.log(`📦 ${label} (${items.length} items)`);
  console.log(`${"═".repeat(55)}`);

  const results = [];
  let ok = 0, fail = 0;

  for (let i = 0; i < items.length; i++) {
    try {
      const r = await fn(items[i], i, items.length);
      results.push(r);
      ok++;
    } catch (err) {
      console.error(`   ❌ ${items[i].name}: ${err.message}`);
      results.push({ name: items[i].name, ok: false, error: err.message });
      fail++;
      console.log(`   🔄 Retrying...`);
      await new Promise((r) => setTimeout(r, 3000));
      try {
        const r2 = await fn(items[i], i, items.length);
        results[results.length - 1] = r2;
        ok++; fail--;
      } catch (err2) {
        console.error(`   ❌ Retry failed: ${err2.message}`);
      }
    }
  }

  console.log(`\n   📊 ${label}: ${ok}/${items.length} succeeded, ${fail} failed`);
  return { results, ok, fail };
}

/* ═══════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════ */

async function main() {
  if (!API_KEY) { console.error("❌ Set GEMINI_API_KEY"); process.exit(1); }

  console.log(`\n🎨 Generating 36 graphic elements for Le Pressoir Byzantin\n${"═".repeat(55)}`);

  const all = [];

  // 1. Category icons (16)
  const r1 = await runBatch("Category Icons (16)", CATEGORY_ICONS, generateCategoryIcon);
  all.push(r1);

  // 2. Tag icons (6)
  const r2 = await runBatch("Tag Icons (6)", TAG_ICONS, generateTagIcon);
  all.push(r2);

  // 3. Branding (4)
  const r3 = await runBatch("Branding (4)", BRANDING, generateBranding);
  all.push(r3);

  // 4. Decorative (6)
  const r4 = await runBatch("Decorative Elements (6)", DECORATIVE, generateDecorative);
  all.push(r4);

  // 5. Textures (4)
  const r5 = await runBatch("Textures (4)", TEXTURES, generateTexture);
  all.push(r5);

  // Summary
  const totalOk = all.reduce((s, b) => s + b.ok, 0);
  const totalFail = all.reduce((s, b) => s + b.fail, 0);
  const totalSize = all.flatMap(b => b.results).filter(r => r.ok).reduce((s, r) => s + r.size, 0);

  console.log(`\n${"═".repeat(55)}`);
  console.log(`🏁 DONE: ${totalOk}/36 succeeded, ${totalFail} failed`);
  console.log(`Total size: ${(totalSize / 1024 / 1024).toFixed(1)} MB`);
  console.log(`${"═".repeat(55)}`);
}

main();
