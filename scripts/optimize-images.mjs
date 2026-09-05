/**
 * Optimisation des visuels source de public/images.
 *
 * Next.js redimensionne et convertit les images à la volée pour les balises
 * <Image>, mais il part du fichier source : un original de 1,5 Mo coûte de la
 * mémoire à chaque première demande. L'image de partage social (og-*.jpg), elle,
 * est servie telle quelle — elle doit donc rester légère.
 *
 * Usage : node scripts/optimize-images.mjs
 */
import { readdir, stat, rename, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIR = path.resolve("public/images");

/** Largeur maximale conservée selon l'usage du visuel. */
function maxWidthFor(name) {
  if (name.startsWith("og-")) return 1200; // Format de partage social.
  if (name.startsWith("hero-")) return 2400; // Plein écran sur grand moniteur.
  return 1800;
}

const files = (await readdir(DIR)).filter((f) => /\.(jpe?g|png)$/i.test(f));
// Les dérivés de public/images/hero sont produits par build-hero-assets.mjs.
let before = 0;
let after = 0;

for (const file of files) {
  const full = path.join(DIR, file);
  const original = (await stat(full)).size;
  before += original;

  const max = maxWidthFor(file);
  const tmp = path.join(DIR, `.tmp-${file}`);

  await sharp(full)
    .resize({ width: max, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true, progressive: true, chromaSubsampling: "4:4:4" })
    .toFile(tmp);

  const optimized = (await stat(tmp)).size;

  if (optimized < original) {
    await rename(tmp, full);
    after += optimized;
    console.log(
      `✓ ${file}  ${(original / 1024).toFixed(0)} Ko → ${(optimized / 1024).toFixed(0)} Ko`,
    );
  } else {
    await unlink(tmp);
    after += original;
    console.log(`↷ ${file} (déjà optimal)`);
  }
}

console.log(
  `\nTotal : ${(before / 1024 / 1024).toFixed(1)} Mo → ${(after / 1024 / 1024).toFixed(1)} Mo ` +
    `(−${Math.round((1 - after / before) * 100)} %)`,
);
