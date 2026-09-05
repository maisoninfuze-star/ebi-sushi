/**
 * Dérivés statiques des deux images comptées pour le LCP du hero (fond mobile
 * et première carte). Servis tels quels depuis /public — sans passer par
 * l'optimiseur à la volée — avec préchargement : le premier rendu ne dépend
 * ni d'un traitement serveur ni du JavaScript.
 *
 * Usage : node scripts/build-hero-assets.mjs   (relancé par `npm run images:optimize`)
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const OUT = path.resolve("public/images/hero");
const SOURCES = [
  { name: "fond-mobile", src: "public/images/commande-a-emporter.jpg", widths: [420, 640, 840], quality: 55 },
  { name: "carte-1", src: "public/images/carte-california-rolls-portrait.jpg", widths: [320, 480, 640, 800], quality: 68 },
];

await mkdir(OUT, { recursive: true });
for (const { name, src, widths, quality } of SOURCES) {
  for (const w of widths) {
    const base = sharp(src).resize({ width: w, withoutEnlargement: true });
    await base.clone().avif({ quality, effort: 6 }).toFile(path.join(OUT, `${name}-${w}.avif`));
    await base.clone().webp({ quality: quality + 8 }).toFile(path.join(OUT, `${name}-${w}.webp`));
  }
  console.log(`✓ ${name} → ${widths.join("/")} px (avif + webp)`);
}
