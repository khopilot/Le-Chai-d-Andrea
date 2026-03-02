import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envFile = fs.readFileSync(path.resolve(__dirname, "../.env.local"), "utf8");
const match = envFile.match(/NEXT_PUBLIC_OPENAI_API_KEY=(.+)/);
const API_KEY = match?.[1]?.trim();
if (!API_KEY) { console.error("Missing OPENAI API key"); process.exit(1); }

const OUT_DIR = path.resolve(__dirname, "../public/images");

const HEROES = [
  {
    name: "hero-home.png",
    prompt: `Abstract contemporary fine art painting for a luxury French wine restaurant. Deep noir and burgundy background with ethereal gold leaf brushstrokes flowing diagonally across the canvas. Minimalist composition — vast negative space, a single sweeping calligraphic gold gesture against charcoal and dark wine tones. Inspired by Pierre Soulages outrenoir and Zao Wou-Ki's ink washes. No text, no objects, no people. Ultra high resolution, museum quality, matte finish texture.`,
  },
  {
    name: "hero-restaurant.png",
    prompt: `Abstract contemporary art for a fine dining restaurant page. Extreme close-up of layered dark paint strokes — deep mahogany, burnt umber, and espresso black with subtle warm undertones. A single thin horizontal gold line bisects the composition like a horizon. Texture of impasto oil paint. Inspired by Mark Rothko's color fields and Antoni Tàpies' material art. No text, no objects, no people. Moody, sophisticated, minimal. Museum quality, 4K detail.`,
  },
  {
    name: "hero-boutique.png",
    prompt: `Abstract contemporary art for a luxury wine boutique. Dark atmospheric composition with scattered particles of gold dust floating through deep black and aubergine gradients. Like looking into the darkness of an ancient wine cellar with flecks of candlelight. Minimal, ethereal, precious. Inspired by Anish Kapoor's void works and James Turrell's light installations. No text, no objects, no people. High resolution, museum quality.`,
  },
  {
    name: "hero-evenements.png",
    prompt: `Abstract contemporary art for an events page of a luxury wine venue. Rich dark canvas with an organic constellation of warm amber and copper droplets scattered across a midnight-blue-black field. Like sparks rising from a fire or stars in a sommelier's sky. Movement and celebration suggested through abstract form only. Inspired by Yves Klein's monochromes and Hans Hartung's gestural abstraction. No text, no objects, no people. Elegant, dynamic, minimal.`,
  },
  {
    name: "hero-contact.png",
    prompt: `Abstract contemporary art for a contact page of an upscale French restaurant. Soft gradient from deep charcoal black to warm dark taupe, with a subtle circular golden glow emanating from the center like light through a keyhole. Extremely minimal — almost monochrome with a whisper of warmth. Inspired by Hiroshi Sugimoto's seascapes and Agnes Martin's subtle grids. No text, no objects, no people. Serene, inviting, museum quality.`,
  },
];

async function generateImage(hero) {
  const outPath = path.join(OUT_DIR, hero.name);
  if (fs.existsSync(outPath)) {
    console.log(`  ⏭  ${hero.name} already exists, skipping`);
    return;
  }

  console.log(`  🎨 Generating ${hero.name}...`);
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt: hero.prompt,
      n: 1,
      size: "1792x1024",
      quality: "hd",
      response_format: "b64_json",
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(`  ❌ Failed ${hero.name}: ${err.slice(0, 200)}`);
    return;
  }

  const data = await res.json();
  const b64 = data.data[0].b64_json;
  const revised = data.data[0].revised_prompt;
  fs.writeFileSync(outPath, Buffer.from(b64, "base64"));
  console.log(`  ✅ ${hero.name} saved (${(fs.statSync(outPath).size / 1024).toFixed(0)} KB)`);
  if (revised) console.log(`     Revised prompt: ${revised.slice(0, 120)}...`);
}

async function main() {
  console.log("Generating hero backgrounds with DALL-E 3 HD...\n");
  fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const hero of HEROES) {
    await generateImage(hero);
    console.log();
  }
  console.log("Done!");
}

main();
