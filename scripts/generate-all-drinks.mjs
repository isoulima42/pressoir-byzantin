#!/usr/bin/env node

/**
 * Generate ALL 18 drink photos — dark studio product photography.
 * No chroma key, no transparency. Clean product shots on dark background.
 */

import { mkdir, stat } from "fs/promises";
import { join } from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const API_KEY = process.env.GEMINI_API_KEY;
const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent";
const OUTPUT_DIR = join(import.meta.dirname, "../public/images/generated/drinks");

/* ─── Prompt builder ─────────────────────────────────────── */

function buildPrompt(description, verre) {
  return `${description} dans ${verre}. Photographie de produit professionnelle en studio. Fond très sombre, presque noir, dégradé subtil. Surface sombre réfléchissante avec reflet discret de la boisson. Éclairage dramatique : lumière principale latérale gauche chaude (2700K), rim light arrière subtil pour détacher la boisson du fond, fill light très doux à droite. La boisson est le seul sujet, parfaitement nette, au centre. Vue 3/4 légèrement en contre-plongée. Aucun objet, aucune décoration, aucun texte, aucune main, aucun logo. Couleurs riches et saturées, contraste élevé. Photographie de boissons haut de gamme pour carte de restaurant.`;
}

/* ─── All 18 drinks ──────────────────────────────────────── */

const DRINKS = [
  // ── Boissons chaudes (6) ──
  { name: "cafe_espresso", desc: "Un café espresso avec crema dorée épaisse, légère vapeur montante", verre: "une petite tasse espresso blanche en porcelaine avec soucoupe" },
  { name: "cafe_latte", desc: "Un latte macchiato avec couches visibles de lait et café séparées", verre: "un grand verre latte macchiato transparent" },
  { name: "cafe_cappuccino", desc: "Un cappuccino avec art latte en rosetta sur mousse crémeuse", verre: "une tasse cappuccino en céramique blanche" },
  { name: "matcha_cappuccino", desc: "Un cappuccino au matcha vert vif avec mousse de lait crémeuse", verre: "une tasse en céramique blanche" },
  { name: "the_marocain", desc: "Un thé à la menthe vert doré, feuilles de menthe fraîche, vapeur visible", verre: "un verre à thé marocain traditionnel orné de motifs dorés" },
  { name: "chocolat_chaud", desc: "Un chocolat chaud onctueux brun foncé avec mousse crémeuse, vapeur visible", verre: "une grande tasse en céramique" },

  // ── Boissons fraîches (3) ──
  { name: "coca_cola", desc: "Un cola brun foncé pétillant avec glaçons, bulles visibles", verre: "un verre tumbler avec condensation sur les parois" },
  { name: "limonade", desc: "Une limonade citron maison jaune pâle, rondelle de citron, feuilles de menthe, glaçons", verre: "un grand verre Mason jar" },
  { name: "ayran", desc: "Un ayran, boisson turque blanche mousseuse au yaourt, mousse en surface, servi très frais", verre: "un verre droit avec condensation" },

  // ── Bières (2) ──
  { name: "biere_pression", desc: "Une bière blonde dorée avec belle mousse blanche crémeuse, bulles fines", verre: "un verre à bière tulipe" },
  { name: "biere_bouteille", desc: "Une bière ambrée, belle robe cuivrée, mousse fine, avec une bouteille de bière ambrée sans étiquette à côté", verre: "un verre à bière avec la bouteille" },

  // ── Vins (3) ──
  { name: "vin_rouge", desc: "Un verre de vin rouge profond rubis, belle robe, lumière traversant le verre", verre: "un verre à vin ballon en cristal" },
  { name: "vin_blanc", desc: "Un verre de vin blanc frais doré pâle, reflets dorés lumineux", verre: "un verre à vin tulipe en cristal" },
  { name: "vin_rose", desc: "Un verre de vin rosé teinte saumon clair, lumière traversante", verre: "un verre à vin évasé en cristal" },

  // ── Cocktails (4) ──
  { name: "mojito", desc: "Un mojito frais avec menthe abondante, quartiers de citron vert, glaçons pilés, eau pétillante", verre: "un verre tumbler highball" },
  { name: "aperol_spritz", desc: "Un Aperol Spritz orange vif avec glaçons, rondelle d'orange, bulles de prosecco", verre: "un verre ballon large" },
  { name: "pina_colada", desc: "Une Piña Colada crémeuse blanche avec crème de coco, morceau d'ananas frais et cerise en garniture", verre: "un verre hurricane" },
  { name: "cocktail_pressoir", desc: "Un cocktail signature maison couleur ambrée dorée, brin de romarin, zeste d'orange, présentation élégante", verre: "une coupette en cristal" },
];

/* ─── Generate one ───────────────────────────────────────── */

async function generateOne(drink, index, total) {
  const tag = `[${index + 1}/${total}]`;
  console.log(`\n🍷 ${tag} ${drink.name}`);

  const res = await fetch(`${API_URL}?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: buildPrompt(drink.desc, drink.verre) }] }],
      generationConfig: {
        responseModalities: ["TEXT", "IMAGE"],
        imageConfig: { aspectRatio: "1:1", imageSize: "1K" },
      },
    }),
  });

  if (!res.ok) throw new Error(`API ${res.status}: ${(await res.text()).slice(0, 200)}`);

  const data = await res.json();
  const imgPart = data.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
  if (!imgPart) throw new Error("No image data");

  const rawBuf = Buffer.from(imgPart.inlineData.data, "base64");

  const outPath = join(OUTPUT_DIR, `${drink.name}.webp`);
  await sharp(rawBuf).webp({ quality: 90 }).toFile(outPath);

  const s = await stat(outPath);
  console.log(`   ✅ ${drink.name}.webp (${(s.size / 1024).toFixed(0)} KB)`);
  return { name: drink.name, ok: true, size: s.size };
}

/* ─── Main ───────────────────────────────────────────────── */

async function main() {
  if (!API_KEY) { console.error("❌ Set GEMINI_API_KEY"); process.exit(1); }
  await mkdir(OUTPUT_DIR, { recursive: true });

  const total = DRINKS.length;
  console.log(`\n🍹 Generating ${total} drinks (dark studio product shots)\n${"═".repeat(55)}`);

  const results = [];
  let ok = 0, fail = 0;

  for (let i = 0; i < total; i++) {
    try {
      const r = await generateOne(DRINKS[i], i, total);
      results.push(r);
      ok++;
    } catch (err) {
      console.error(`   ❌ ${DRINKS[i].name}: ${err.message}`);
      results.push({ name: DRINKS[i].name, ok: false, error: err.message });
      fail++;
      console.log(`   🔄 Retrying...`);
      await new Promise((r) => setTimeout(r, 3000));
      try {
        const r2 = await generateOne(DRINKS[i], i, total);
        results[results.length - 1] = r2;
        ok++; fail--;
      } catch (err2) {
        console.error(`   ❌ Retry failed: ${err2.message}`);
      }
    }
  }

  console.log(`\n${"═".repeat(55)}`);
  console.log(`📊 Done: ${ok}/${total} succeeded, ${fail} failed`);
  const totalSize = results.filter((r) => r.ok).reduce((acc, r) => acc + r.size, 0);
  console.log(`Total size: ${(totalSize / 1024 / 1024).toFixed(1)} MB`);
}

main();
