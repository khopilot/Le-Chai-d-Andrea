#!/usr/bin/env node
// Generate 19 editorial-quality images via OpenAI DALL-E 3
// Usage: OPENAI_API_KEY=sk-... node scripts/generate-images.mjs

import { writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "public", "images");

const API_KEY = process.env.OPENAI_API_KEY;
if (!API_KEY) {
  console.error("Missing OPENAI_API_KEY environment variable");
  process.exit(1);
}

const BASE_STYLE =
  "Editorial luxury photography, dark moody aesthetic, warm candlelight tones. " +
  "Color palette: deep black-brown, burgundy-wine red, antique gold highlights, warm cream. " +
  "Rich shadows, minimal highlights. French countryside luxury. " +
  "No text, no readable labels, no people. " +
  "Shot on medium format camera, shallow depth of field.";

const PRODUCT_STYLE =
  "Dark moody background fading to pure black at edges. " +
  "Centered product composition. Warm directional lighting from upper left.";

/** @type {{ filename: string; size: string; prompt: string }[]} */
const IMAGES = [
  // Hero & sections
  {
    filename: "hero-cave.png",
    size: "1792x1024",
    prompt: `${BASE_STYLE} Wine cave interior, vaulted stone ceiling, candlelight flickering along ancient walls, dark atmospheric space perfect for text overlay. Rows of aged oak barrels receding into shadow. Warm amber light pools on limestone floor.`,
  },
  {
    filename: "about-cave.png",
    size: "1024x1792",
    prompt: `${BASE_STYLE} Portrait orientation: stone wall with wine bottles nestled in carved niches, warm amber light casting long shadows. Ancient limestone texture, a single candle illuminating the bottles. Vertical composition.`,
  },
  {
    filename: "restaurant-ambiance.png",
    size: "1792x1024",
    prompt: `${BASE_STYLE} Elegant dining table set for dinner in a stone-walled French cave restaurant. Exposed stone walls, warm wall sconces, white linen tablecloth, crystal wine glasses, flickering candles. Intimate luxury atmosphere.`,
  },
  {
    filename: "og-image.png",
    size: "1792x1024",
    prompt: `${BASE_STYLE} Wine cave entrance at dusk, golden warm light spilling from arched stone doorway into the evening. Cinematic wide shot, French countryside stone architecture. Dramatic sky.`,
  },

  // Products — wines
  {
    filename: "product-saint-emilion.png",
    size: "1024x1024",
    prompt: `${BASE_STYLE} ${PRODUCT_STYLE} A single bottle of fine Bordeaux red wine next to a filled glass of deep ruby wine. Dark oak surface, rich burgundy color in the glass. Elegant, minimal.`,
  },
  {
    filename: "product-gevrey-chambertin.png",
    size: "1024x1024",
    prompt: `${BASE_STYLE} ${PRODUCT_STYLE} A single bottle of Burgundy Pinot Noir next to a glass of garnet-colored wine. Stone wall background. Delicate, refined composition.`,
  },
  {
    filename: "product-sancerre.png",
    size: "1024x1024",
    prompt: `${BASE_STYLE} ${PRODUCT_STYLE} A single bottle of Loire Valley white wine next to a glass of pale straw-colored wine. Clean, bright highlights on the glass. Fresh, mineral aesthetic.`,
  },
  {
    filename: "product-chateauneuf.png",
    size: "1024x1024",
    prompt: `${BASE_STYLE} ${PRODUCT_STYLE} A single bottle of Rhone Valley red wine next to a glass of deep wine. Dried lavender sprigs as props. Warm Mediterranean light.`,
  },

  // Products — spirits
  {
    filename: "product-armagnac.png",
    size: "1024x1024",
    prompt: `${BASE_STYLE} ${PRODUCT_STYLE} A bottle of aged Armagnac brandy next to a snifter glass with amber spirit. Leather-bound book as prop, rich golden-brown tones.`,
  },
  {
    filename: "product-cognac-xo.png",
    size: "1024x1024",
    prompt: `${BASE_STYLE} ${PRODUCT_STYLE} A crystal decanter of Cognac next to a tulip glass with golden spirit. Beautiful golden backlight creating rim highlights. Ultra-luxurious feel.`,
  },

  // Products — epicerie
  {
    filename: "product-foie-gras.png",
    size: "1024x1024",
    prompt: `${BASE_STYLE} ${PRODUCT_STYLE} A terrine of foie gras on a dark slate board with fig chutney and toasted brioche slices. Artisanal French delicacy, dramatic lighting.`,
  },
  {
    filename: "product-truffe-noire.png",
    size: "1024x1024",
    prompt: `${BASE_STYLE} ${PRODUCT_STYLE} A whole black truffle (Tuber melanosporum) on white marble surface with truffle shavings. Dramatic directional light, extreme close-up detail.`,
  },
  {
    filename: "product-huile-olive.png",
    size: "1024x1024",
    prompt: `${BASE_STYLE} ${PRODUCT_STYLE} A dark glass bottle of premium olive oil next to a ceramic tasting dish with golden oil. A small olive branch with leaves as prop.`,
  },
  {
    filename: "product-fromages.png",
    size: "1024x1024",
    prompt: `${BASE_STYLE} ${PRODUCT_STYLE} A curated cheese board on dark slate with 5 different French cheeses: Comte, Epoisses, Roquefort, goat cheese, and brie. Walnuts and dried fruit as garnish.`,
  },

  // Products — coffrets
  {
    filename: "product-coffret-decouverte.png",
    size: "1024x1024",
    prompt: `${BASE_STYLE} ${PRODUCT_STYLE} An open wooden gift box containing 3 bottles of fine French wine, with tasting note cards visible. Straw packing material. Gift presentation.`,
  },
  {
    filename: "product-coffret-premium.png",
    size: "1024x1024",
    prompt: `${BASE_STYLE} ${PRODUCT_STYLE} A premium luxury hamper in a dark wooden box: wine bottle, foie gras terrine, truffle jar, artisan chocolates. Ribbon bow, ultra-premium presentation.`,
  },

  // Events
  {
    filename: "event-valentine.png",
    size: "1024x1024",
    prompt: `${BASE_STYLE} An intimate table for two set inside a candlelit stone cave. Red roses in a small vase, flickering candles, wine glasses, white linen. Romantic, warm, secluded atmosphere.`,
  },
  {
    filename: "event-degustation.png",
    size: "1024x1024",
    prompt: `${BASE_STYLE} A row of wine tasting glasses arranged in a line, each containing wine of graduated colors from pale gold to deep ruby. Professional tasting setup on a dark surface.`,
  },
  {
    filename: "event-marche.png",
    size: "1024x1024",
    prompt: `${BASE_STYLE} A French producer market scene: rustic wooden tables displaying cheese wheels, charcuterie boards, and wine bottles. Morning golden light streaming in. Artisanal, authentic countryside market.`,
  },
];

const BATCH_SIZE = 3;
const BATCH_DELAY_MS = 20_000; // 20s between batches to respect ~5 req/min

async function generateImage({ filename, size, prompt }) {
  const outPath = join(OUT_DIR, filename);

  if (existsSync(outPath)) {
    console.log(`  [skip] ${filename} already exists`);
    return;
  }

  console.log(`  [gen]  ${filename} (${size})...`);

  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt,
      n: 1,
      size,
      quality: "hd",
      style: "natural",
      response_format: "url",
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`API error for ${filename}: ${res.status} ${err}`);
  }

  const json = await res.json();
  const url = json.data[0].url;

  // Download the image
  const imgRes = await fetch(url);
  if (!imgRes.ok) throw new Error(`Download failed for ${filename}`);
  const buffer = Buffer.from(await imgRes.arrayBuffer());
  await writeFile(outPath, buffer);

  console.log(`  [ok]   ${filename} (${(buffer.length / 1024).toFixed(0)} KB)`);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  console.log(`\nGenerating ${IMAGES.length} images into ${OUT_DIR}\n`);

  for (let i = 0; i < IMAGES.length; i += BATCH_SIZE) {
    const batch = IMAGES.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(IMAGES.length / BATCH_SIZE);

    console.log(`Batch ${batchNum}/${totalBatches}:`);

    await Promise.all(batch.map(generateImage));

    if (i + BATCH_SIZE < IMAGES.length) {
      console.log(`  Waiting ${BATCH_DELAY_MS / 1000}s before next batch...\n`);
      await new Promise((r) => setTimeout(r, BATCH_DELAY_MS));
    }
  }

  console.log(`\nDone! ${IMAGES.length} images generated.\n`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
