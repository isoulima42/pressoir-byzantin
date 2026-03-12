#!/usr/bin/env node

/**
 * Generate ALL 43 food dish photos — dark studio product photography.
 * No chroma key. Clean product shots on dark background.
 */

import { mkdir, stat } from "fs/promises";
import { join } from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const API_KEY = process.env.GEMINI_API_KEY;
const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent";
const OUTPUT_DIR = join(import.meta.dirname, "../public/images/generated/food");

/* ─── Prompt builder ─────────────────────────────────────── */

function buildPrompt(description, contenant) {
  return `${description}, dans ${contenant}. Photographie food professionnelle en studio. Fond très sombre, presque noir, dégradé subtil. Surface sombre avec reflet discret du plat. Éclairage dramatique : lumière principale latéral gauche chaude (2700K), rim light arrière subtil pour détacher le plat du fond, fill light très doux à droite. Le plat est le seul sujet, parfaitement net, au centre. Vue 3/4 plongeante à 45 degrés. Aucune surface de table visible, aucune décoration, aucun texte, aucune main, aucun couvert tenu. Couleurs chaudes et appétissantes, contraste élevé. Photographie food haut de gamme pour carte de restaurant.`;
}

/* ─── All 43 dishes ──────────────────────────────────────── */

const DISHES = [
  // ── Salades (3) ──
  { name: "salade_byzantinne", desc: "Salade avec tomates tranchées, concombre, huile d'olive, féta en cubes, noix, olives noires, origan", cont: "une assiette creuse en céramique noire mate" },
  { name: "salade_mediterraneenne", desc: "Salade verte de saison, tranches de melon, féta émiettée, jambon cru en chiffonnade", cont: "une assiette creuse en céramique noire mate" },
  { name: "salade_chevre_chaud", desc: "Salade avec croûtons dorés, fromage de chèvre gratiné sur toast, miel en filet, salade verte, huile d'olive", cont: "une assiette creuse en céramique noire mate" },

  // ── Burgers (3) ──
  { name: "burger_classique", desc: "Burger avec bun doré, steak haché juteux, tranche de tomate, cornichon, sauce visible, avec frites dorées à côté", cont: "une planche en bois rustique" },
  { name: "burger_pink", desc: "Burger avec pain rose distinctif, galette veggie verte, tomate, salade, cornichon, oignons, sauce cocktail, avec frites dorées à côté", cont: "une planche en bois rustique" },
  { name: "burger_byzantinne", desc: "Burger avec pain noir charbon, steak haché, fromage de chèvre fondant, oignons séchés caramélisés, filet de miel, avec frites dorées à côté", cont: "une planche en bois rustique" },

  // ── Pizzas (11) ──
  { name: "pizza_margherita", desc: "Pizza ronde avec sauce tomate, mozzarella fondue, origan, feuilles de basilic frais", cont: "une assiette ronde en céramique noire mate à bord relevé" },
  { name: "pizza_nutella", desc: "Pizza sucrée avec Nutella étalée brillante, noix concassées, sucre glace léger", cont: "une assiette ronde en céramique noire mate à bord relevé" },
  { name: "pizza_chevre_miel", desc: "Pizza avec crème fraîche, rondelles de chèvre fondant, filet de miel doré, basilic frais", cont: "une assiette ronde en céramique noire mate à bord relevé" },
  { name: "pizza_tonnata", desc: "Pizza avec sauce tomate, mozzarella, morceaux de thon, olives noires, origan", cont: "une assiette ronde en céramique noire mate à bord relevé" },
  { name: "pizza_jambon", desc: "Pizza avec sauce tomate, mozzarella fondue, tranches de jambon, origan", cont: "une assiette ronde en céramique noire mate à bord relevé" },
  { name: "pizza_romaine", desc: "Pizza avec sauce tomate, mozzarella, jambon, champignons émincés, origan", cont: "une assiette ronde en céramique noire mate à bord relevé" },
  { name: "pizza_tunisienne", desc: "Pizza avec sauce tomate, mozzarella, rondelles de merguez épicées, origan", cont: "une assiette ronde en céramique noire mate à bord relevé" },
  { name: "pizza_tartiflette", desc: "Pizza avec crème fraîche, lardons dorés, origan", cont: "une assiette ronde en céramique noire mate à bord relevé" },
  { name: "pizza_4_fromages", desc: "Pizza avec sauce tomate, mozzarella, féta, chèvre, copeaux de parmesan, origan", cont: "une assiette ronde en céramique noire mate à bord relevé" },
  { name: "pizza_nordique", desc: "Pizza avec crème fraîche, tranches de saumon fumé rosé, rondelles de pommes de terre, origan", cont: "une assiette ronde en céramique noire mate à bord relevé" },
  { name: "pizza_byzantinne", desc: "Pizza avec sauce tomate, mozzarella, morceaux de poulet rôti et agneau, poivrons confits, oignons, origan", cont: "une assiette ronde en céramique noire mate à bord relevé" },

  // ── Pide (7) ──
  { name: "pide_fromage", desc: "Pide turque en forme de bateau allongé, ouverte, garnie de féta et mozzarella fondues, bords dorés croustillants", cont: "une assiette ovale en céramique noire mate" },
  { name: "pide_fromage_oeuf", desc: "Pide turque en forme de bateau allongé avec un oeuf au centre, féta et mozzarella fondues, bords dorés", cont: "une assiette ovale en céramique noire mate" },
  { name: "pide_epinards", desc: "Pide turque en forme de bateau allongé aux épinards sautés verts, féta, mozzarella fondante, bords dorés", cont: "une assiette ovale en céramique noire mate" },
  { name: "pide_viande", desc: "Pide turque en forme de bateau allongé à la viande hachée épicée, féta, mozzarella, bords dorés", cont: "une assiette ovale en céramique noire mate" },
  { name: "pide_soudjouk", desc: "Pide turque en forme de bateau allongé au soudjouk (saucisse orientale tranchée), féta, mozzarella, bords dorés", cont: "une assiette ovale en céramique noire mate" },
  { name: "pide_pressoir", desc: "Pide turque en forme de bateau allongé très garnie de morceaux de poulet et agneau, féta, mozzarella, la plus généreuse, bords dorés", cont: "une assiette ovale en céramique noire mate" },
  { name: "lahmacun", desc: "Lahmacun, galette fine croustillante garnie de viande hachée d'agneau, oignon, tomate, persil, présentée à plat et ouverte", cont: "une assiette ronde en céramique noire mate" },

  // ── Assiettes (6) ──
  { name: "assiette_shawarma", desc: "Assiette composée avec shawarma de poulet doré tranché, salade fraîche, frites dorées, petit ramequin de houmous", cont: "une grande assiette ovale en céramique noire mate" },
  { name: "assiette_kefta", desc: "Assiette composée avec galettes de kefta grillées, salade fraîche, frites dorées, petit ramequin de houmous", cont: "une grande assiette ovale en céramique noire mate" },
  { name: "assiette_adana", desc: "Assiette composée avec brochettes adana épicées sur pain pita, salade fraîche, frites dorées, petit ramequin de houmous", cont: "une grande assiette ovale en céramique noire mate" },
  { name: "assiette_falafel", desc: "Assiette composée avec 7 falafels dorés croustillants, salade fraîche, frites dorées, petit ramequin de houmous", cont: "une grande assiette ovale en céramique noire mate" },
  { name: "assiette_borek", desc: "Assiette composée avec böreks triangulaires dorés feuilletés, salade d'accompagnement", cont: "une grande assiette ovale en céramique noire mate" },
  { name: "assiette_nuggets", desc: "Assiette composée avec nuggets croustillants dorés, frites, salade, petit ramequin de sauce", cont: "une grande assiette ovale en céramique noire mate" },

  // ── Shawarmas (2) ──
  { name: "shawarma_classique", desc: "Shawarma wrap en papier kraft entrouvert montrant poulet tranché, oignons, persil, sauce ail, tomate, houmous, cornichons", cont: "un wrap en papier kraft entrouvert" },
  { name: "shawarma_falafel", desc: "Shawarma wrap en papier kraft entrouvert montrant falafels, oignons, persil, sauce ail, sauce piquante, houmous", cont: "un wrap en papier kraft entrouvert" },

  // ── French Tacos (3) ──
  { name: "tacos_simple", desc: "French tacos (tacos français) : wrap rectangulaire grillé et doré au panini press, coupé en deux montrant l'intérieur avec 1 viande, fromage fondu filant, sauce, frites à l'intérieur", cont: "une assiette ronde en céramique noire mate à bord relevé" },
  { name: "tacos_maxxy", desc: "French tacos (tacos français) : grand wrap rectangulaire grillé et doré au panini press, coupé en deux montrant l'intérieur garni avec 2 viandes visibles, fromage fondu filant abondant, sauce, frites à l'intérieur", cont: "une assiette ronde en céramique noire mate à bord relevé" },
  { name: "tacos_pressoir", desc: "French tacos (tacos français) : très grand wrap rectangulaire grillé et doré au panini press, coupé en deux montrant l'intérieur débordant de 3 viandes différentes, fromage fondu filant très abondant, sauces multiples, frites à l'intérieur, le plus garni et généreux", cont: "une assiette ronde en céramique noire mate à bord relevé" },

  // ── Box (2) ──
  { name: "box_shawarma", desc: "Box en carton kraft ouverte vue du dessus avec shawarma de poulet tranché, frites dorées, salade, sauces", cont: "une box en carton kraft ouverte" },
  { name: "box_falafel", desc: "Box en carton kraft ouverte vue du dessus avec falafels dorés, frites, salade, sauces", cont: "une box en carton kraft ouverte" },

  // ── Crêpes (6) ──
  { name: "crepe_sucre", desc: "Crêpe fine pliée en triangle avec cristaux de sucre visibles sur le dessus", cont: "une assiette plate en céramique noire mate" },
  { name: "crepe_sucre_cannelle", desc: "Crêpe fine pliée en triangle saupoudrée de sucre et poudre de cannelle", cont: "une assiette plate en céramique noire mate" },
  { name: "crepe_chocolat", desc: "Crêpe fine avec chocolat fondu coulant sur le dessus et sur les côtés", cont: "une assiette plate en céramique noire mate" },
  { name: "crepe_banane_chocolat", desc: "Crêpe fine avec rondelles de banane et chocolat fondu coulant", cont: "une assiette plate en céramique noire mate" },
  { name: "crepe_fromage", desc: "Crêpe salée pliée avec fromage fondu visible qui déborde", cont: "une assiette plate en céramique noire mate" },
  { name: "crepe_jambon_fromage", desc: "Crêpe salée ouverte montrant jambon et fromage fondu à l'intérieur", cont: "une assiette plate en céramique noire mate" },
];

/* ─── Generate one ───────────────────────────────────────── */

async function generateOne(dish, index, total) {
  const tag = `[${index + 1}/${total}]`;
  console.log(`\n🎨 ${tag} ${dish.name}`);

  const res = await fetch(`${API_URL}?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: buildPrompt(dish.desc, dish.cont) }] }],
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

  const outPath = join(OUTPUT_DIR, `${dish.name}.webp`);
  await sharp(rawBuf).webp({ quality: 90 }).toFile(outPath);

  const s = await stat(outPath);
  console.log(`   ✅ ${dish.name}.webp (${(s.size / 1024).toFixed(0)} KB)`);
  return { name: dish.name, ok: true, size: s.size };
}

/* ─── Main ───────────────────────────────────────────────── */

async function main() {
  if (!API_KEY) { console.error("❌ Set GEMINI_API_KEY"); process.exit(1); }
  await mkdir(OUTPUT_DIR, { recursive: true });

  const total = DISHES.length;
  console.log(`\n🍽️  Generating ${total} food images (dark studio product shots)\n${"═".repeat(55)}`);

  const results = [];
  let ok = 0, fail = 0;

  for (let i = 0; i < total; i++) {
    try {
      const r = await generateOne(DISHES[i], i, total);
      results.push(r);
      ok++;
    } catch (err) {
      console.error(`   ❌ ${DISHES[i].name}: ${err.message}`);
      results.push({ name: DISHES[i].name, ok: false, error: err.message });
      fail++;
      console.log(`   🔄 Retrying...`);
      await new Promise((r) => setTimeout(r, 3000));
      try {
        const r2 = await generateOne(DISHES[i], i, total);
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
