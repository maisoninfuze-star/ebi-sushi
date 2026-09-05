/**
 * Génération des visuels d'ambiance Ebi Sushi via fal.ai (FLUX 1.1 Pro Ultra).
 *
 * Usage : FAL_KEY=... node scripts/generate-images.mjs [slug ...]
 * Les images sont écrites dans public/images/.
 */
import { writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const KEY = process.env.FAL_KEY;
if (!KEY) {
  console.error("FAL_KEY manquant dans l'environnement.");
  process.exit(1);
}

const MODEL = "fal-ai/flux-pro/v1.1-ultra";
const OUT = path.resolve("public/images");

/** Direction artistique commune à tous les visuels — garantit une cohérence de série. */
const LOOK =
  "editorial food photography, contemporary Japanese fine dining, very dark charcoal and near-black setting, " +
  "single soft warm directional key light, deep controlled shadows, warm ivory and champagne highlights, " +
  "muted vermilion accents, matte ceramic and dark textured stone surfaces, natural realistic colours, " +
  "shot on a Hasselblad medium format, 90mm lens, shallow depth of field, crisp micro texture, " +
  "photorealistic, commercial quality, colour graded, no text, no lettering, no logos, no watermark, no people";

const NEG =
  "cartoon, illustration, anime, 3d render, cgi, plastic look, oversaturated, neon, cherry blossom, pagoda, " +
  "text, letters, words, logo, watermark, signature, hands, fingers, deformed food, melted fish, " +
  "unrealistic proportions, cluttered background, harsh flash, blurry";

const IMAGES = [
  // --- Hero -----------------------------------------------------------------
  {
    slug: "hero-plateau-signature-ebi-sushi",
    ratio: "16:9",
    prompt:
      "Cinematic three-quarter view of a refined assortment of contemporary sushi arranged on a long matte black stone slab: " +
      "salmon nigiri with glossy fresh salmon, precise maki rolls, a crispy tempura roll with golden crumb, thin cucumber ribbons, " +
      "a few micro shiso leaves and a small dish of soy sauce. Generous negative space on the left of the frame, " +
      "background falling into pure black. " + LOOK,
  },
  {
    slug: "hero-plateau-signature-ebi-sushi-mobile",
    ratio: "3:4",
    prompt:
      "Vertical cinematic close composition of a refined contemporary sushi selection on a matte black stone slab: " +
      "salmon nigiri, precise maki rolls and one crispy golden tempura roll, micro herbs, soy dish, " +
      "food positioned in the lower two thirds of the frame with deep black empty space above. " + LOOK,
  },

  // --- Signatures (types de plats réellement à la carte) ---------------------
  {
    slug: "signature-california-rolls",
    ratio: "4:3",
    prompt:
      "Six California rolls coated in pale sesame seeds, filled with avocado and surimi, arranged in a precise line " +
      "on a dark slate plate, a single dab of spicy mayo, one shiso leaf. Overhead three-quarter angle. " + LOOK,
  },
  {
    slug: "signature-fry-rolls-crispy",
    ratio: "4:3",
    prompt:
      "Six crispy fried sushi rolls with a golden panko crust, topped with fine tempura crumbs, drizzled with dark teriyaki glaze " +
      "and a thin line of spicy mayonnaise, served on a dark ceramic rectangular plate, steam barely visible. " + LOOK,
  },
  {
    slug: "signature-spring-rolls",
    ratio: "4:3",
    prompt:
      "Six fresh Vietnamese spring rolls in translucent rice paper revealing pink shrimp, mint leaves, vermicelli and julienned carrot, " +
      "cut on the bias and standing upright on a dark stone plate beside a small bowl of peanut dipping sauce. " + LOOK,
  },
  {
    slug: "signature-poke-bowl",
    ratio: "4:3",
    prompt:
      "A poke bowl in a dark matte ceramic bowl: cubes of fresh raw salmon, sliced avocado fanned out, edamame, " +
      "shredded red cabbage, seaweed, black and white sesame, a wedge of lime, on sushi rice. Overhead angle, " +
      "the bowl slightly off centre. " + LOOK,
  },
  {
    slug: "signature-sashimi-saumon",
    ratio: "4:3",
    prompt:
      "Five thick slices of premium raw salmon sashimi with visible marbling, fanned across a bed of finely shredded daikon radish " +
      "on a dark textured ceramic plate, a small mound of wasabi and a folded shiso leaf. Close macro three-quarter view. " + LOOK,
  },
  {
    slug: "signature-gyoza",
    ratio: "4:3",
    prompt:
      "Six pan-fried gyoza dumplings with a lacy golden-brown crisp base, pleated tops, arranged in a fan on a dark cast iron plate, " +
      "scattered spring onion and toasted sesame, a small dish of dipping sauce. " + LOOK,
  },

  // --- Récit de marque ------------------------------------------------------
  {
    slug: "atelier-preparation-saumon",
    ratio: "4:5",
    prompt:
      "Vertical close-up of a Japanese yanagiba knife resting beside a whole trimmed salmon loin on a pale hinoki wood cutting board, " +
      "three perfectly cut slices laid out with precision, dark kitchen pass in the background falling out of focus, " +
      "one warm overhead light. No hands. " + LOOK,
  },
  {
    slug: "detail-texture-saumon",
    ratio: "1:1",
    prompt:
      "Extreme macro of a single slice of fresh salmon showing delicate fat marbling and moist surface sheen, " +
      "resting on dark wet slate, a few grains of flaked sea salt. Very shallow depth of field. " + LOOK,
  },

  // --- Galerie / atmosphère -------------------------------------------------
  {
    slug: "salle-restaurant-ambiance",
    ratio: "3:2",
    prompt:
      "Interior of an intimate contemporary Japanese restaurant at night: dark micro-cement walls, warm low pendant lights, " +
      "a polished dark wood counter, simple ceramic tableware, empty leather banquette seating, soft pools of amber light, " +
      "no diners. Wide architectural shot, moody and luxurious. " + LOOK,
  },
  {
    slug: "comptoir-sushi-bar",
    ratio: "3:4",
    prompt:
      "Vertical view along a dark polished sushi counter lit by a single warm strip light, neatly arranged ceramic plates, " +
      "a bamboo rolling mat, a small vase with one green branch, deep shadows and reflections, no people. " + LOOK,
  },
  {
    slug: "detail-nigiri-macro",
    ratio: "1:1",
    prompt:
      "Extreme macro of two salmon nigiri: individual rice grains visible, glossy fish surface, a fine brush of nikiri soy, " +
      "on dark stone. Ultra sharp foreground, background dissolving to black. " + LOOK,
  },
  {
    slug: "plateau-partage-table",
    ratio: "3:2",
    prompt:
      "Overhead flat lay of a shared Japanese meal on a dark table: a large assortment platter of maki and nigiri, " +
      "two small bowls of miso soup, a seaweed salad, black chopsticks on ceramic rests, two glasses of water, linen napkin. " +
      "Symmetrical, generous, editorial. " + LOOK,
  },
  {
    slug: "commande-a-emporter",
    ratio: "4:3",
    prompt:
      "An elegant black takeaway sushi box, lid slightly ajar revealing a neat assortment of maki and nigiri, " +
      "sitting on a dark surface beside chopsticks in a paper sleeve and a small sauce container. " +
      "Clean minimal composition, premium unbranded packaging. " + LOOK,
  },
  {
    slug: "soupe-et-entrees",
    ratio: "3:4",
    prompt:
      "Vertical composition of Japanese starters on a dark table: a dark lacquer bowl of miso soup with tofu and spring onion, " +
      "a small plate of edamame with sea salt, and a seaweed wakame salad with sesame in a ceramic dish. " + LOOK,
  },

  // --- Cartes du carrousel d'accueil (portrait, plat en haut, surface libre en bas) ---
  {
    slug: "carte-california-rolls-portrait",
    ratio: "2:3",
    prompt:
      "Vertical composition: a tight row of six California rolls coated in pale sesame, filled with avocado and surimi, " +
      "arranged on a long dark slate plate placed in the upper half of the frame, a small dab of spicy mayo and one shiso leaf, " +
      "the lower third of the frame is a clean uninterrupted dark matte stone surface with soft light falloff. " + LOOK,
  },
  {
    slug: "carte-fry-rolls-portrait",
    ratio: "2:3",
    prompt:
      "Vertical composition: six crispy fried sushi rolls with golden panko crust, dark teriyaki glaze and a fine line of spicy mayonnaise, " +
      "stacked in two short rows on a dark ceramic plate in the upper half of the frame, " +
      "the lower third is a clean dark matte stone surface, soft warm rim light from the upper left. " + LOOK,
  },
  {
    slug: "carte-nigiri-sashimi-portrait",
    ratio: "2:3",
    prompt:
      "Vertical composition: four salmon nigiri and three thick slices of salmon sashimi fanned over shredded daikon on a dark textured ceramic plate, " +
      "a small mound of wasabi, plate placed in the upper half of the frame, the lower third a clean dark stone surface. " + LOOK,
  },
  {
    slug: "carte-spring-rolls-portrait",
    ratio: "2:3",
    prompt:
      "Vertical composition: six fresh Vietnamese spring rolls in translucent rice paper showing pink shrimp, mint and vermicelli, " +
      "cut on the bias and standing upright on a dark stone plate beside a small bowl of peanut sauce, in the upper half of the frame, " +
      "the lower third a clean dark matte surface with gentle light falloff. " + LOOK,
  },

  // --- Partage social -------------------------------------------------------
  {
    slug: "og-ebi-sushi",
    ratio: "16:9",
    prompt:
      "Wide cinematic hero shot of a luxurious contemporary sushi assortment on matte black stone, " +
      "salmon nigiri, maki and crispy rolls arranged with precision, dramatic single warm light, " +
      "large areas of deep black negative space on the right for typography. " + LOOK,
  },
];

async function generate({ slug, prompt, ratio }) {
  const dest = path.join(OUT, `${slug}.jpg`);
  if (existsSync(dest) && !process.env.FORCE) {
    console.log(`↷ ${slug} (déjà présent)`);
    return { slug, skipped: true };
  }

  const submit = await fetch(`https://queue.fal.run/${MODEL}`, {
    method: "POST",
    headers: { Authorization: `Key ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt,
      negative_prompt: NEG,
      aspect_ratio: ratio,
      num_images: 1,
      output_format: "jpeg",
      safety_tolerance: "2",
      enable_safety_checker: true,
      raw: false,
    }),
  });

  if (!submit.ok) throw new Error(`${slug}: soumission ${submit.status} ${await submit.text()}`);
  const { status_url, response_url } = await submit.json();

  for (let i = 0; i < 120; i++) {
    await new Promise((r) => setTimeout(r, 2500));
    const s = await fetch(status_url, { headers: { Authorization: `Key ${KEY}` } });
    const body = await s.json();
    if (body.status === "COMPLETED") break;
    if (body.status === "FAILED") throw new Error(`${slug}: génération échouée`);
    if (i === 119) throw new Error(`${slug}: délai dépassé`);
  }

  const res = await fetch(response_url, { headers: { Authorization: `Key ${KEY}` } });
  const data = await res.json();
  const url = data?.images?.[0]?.url;
  if (!url) throw new Error(`${slug}: aucune image renvoyée`);

  const bin = Buffer.from(await (await fetch(url)).arrayBuffer());
  await writeFile(dest, bin);
  console.log(`✓ ${slug}.jpg (${(bin.length / 1024).toFixed(0)} Ko)`);
  return { slug, bytes: bin.length };
}

const only = process.argv.slice(2);
const queue = only.length ? IMAGES.filter((i) => only.includes(i.slug)) : IMAGES;

await mkdir(OUT, { recursive: true });

const results = await Promise.allSettled(queue.map(generate));
const failed = results.filter((r) => r.status === "rejected");
for (const f of failed) console.error("✗", f.reason.message);
console.log(`\nTerminé : ${results.length - failed.length}/${results.length} visuels.`);
if (failed.length) process.exit(1);
