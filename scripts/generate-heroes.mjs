#!/usr/bin/env node

/**
 * Generate hero images for Pressoir Byzantin using Google Nano Banana 2
 * (Gemini 3.1 Flash Image Preview)
 */

const API_KEY = process.env.GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent`;

import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

const OUTPUT_DIR = join(import.meta.dirname, "../public/images/heroes");

const PROMPTS = [
  {
    name: "hero-accueil",
    prompt:
      "Vue intérieure d'un restaurant méditerranéen chaleureux, lumière tamisée dorée, tables en bois, bougies, arches en pierre, plats fumants en arrière-plan flou, ambiance conviviale et luxueuse, photographie cinématique, 16:9",
  },
  {
    name: "hero-menu",
    prompt:
      "Close-up d'une table servie avec des plats méditerranéens et orientaux (pide, mezze, shawarma), vue en plongée légère, éclairage naturel chaud, vapeur visible, nappe en lin, herbes fraîches éparses, photographie food haut de gamme, 16:9",
  },
  {
    name: "hero-evenements",
    prompt:
      "Grande salle de réception dans un ancien pressoir en pierre, tables dressées élégamment, guirlandes lumineuses, fleurs, ambiance festive mais raffinée, photographie cinématique, 16:9",
  },
  {
    name: "hero-contact",
    prompt:
      "Façade de restaurant méditerranéen le soir, lumière chaude sortant des fenêtres, terrasse avec plantes, rue pavée, ambiance accueillante, photographie cinématique, 16:9",
  },
  {
    name: "hero-carte-boissons",
    prompt:
      "Bar de restaurant avec des cocktails colorés, verres de vin, éclairage ambré, reflets, bokeh, ambiance lounge, photographie cinématique, 16:9",
  },
];

async function generateImage(prompt, name) {
  console.log(`\n🎨 Generating: ${name}...`);
  console.log(`   Prompt: ${prompt.substring(0, 80)}...`);

  const response = await fetch(`${API_URL}?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseModalities: ["TEXT", "IMAGE"],
        imageConfig: {
          aspectRatio: "16:9",
          imageSize: "2K",
        },
      },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`API error ${response.status}: ${err}`);
  }

  const data = await response.json();

  // Find the image part in the response
  const parts = data.candidates?.[0]?.content?.parts;
  if (!parts) {
    throw new Error(`No parts in response for ${name}: ${JSON.stringify(data).substring(0, 500)}`);
  }

  const imagePart = parts.find((p) => p.inlineData);
  if (!imagePart) {
    throw new Error(`No image data in response for ${name}: ${JSON.stringify(parts).substring(0, 500)}`);
  }

  const { data: b64, mimeType } = imagePart.inlineData;
  const ext = mimeType === "image/png" ? "png" : "jpg";
  const filePath = join(OUTPUT_DIR, `${name}.${ext}`);

  await writeFile(filePath, Buffer.from(b64, "base64"));
  console.log(`   ✅ Saved: ${filePath} (${mimeType})`);

  return filePath;
}

async function main() {
  if (!API_KEY) {
    console.error("❌ Set GEMINI_API_KEY environment variable");
    process.exit(1);
  }

  await mkdir(OUTPUT_DIR, { recursive: true });
  console.log(`Output directory: ${OUTPUT_DIR}`);

  const results = [];
  for (const { name, prompt } of PROMPTS) {
    try {
      const path = await generateImage(prompt, name);
      results.push({ name, path, status: "ok" });
    } catch (err) {
      console.error(`   ❌ Failed: ${name} — ${err.message}`);
      results.push({ name, status: "error", error: err.message });
    }
  }

  console.log("\n📊 Summary:");
  for (const r of results) {
    console.log(`   ${r.status === "ok" ? "✅" : "❌"} ${r.name}${r.path ? ` → ${r.path}` : ` — ${r.error}`}`);
  }
}

main();
