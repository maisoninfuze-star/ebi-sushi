"use client";

import { preload } from "react-dom";

import { cn } from "@/lib/utils";

/**
 * Image statique pré-optimisée (AVIF + WebP + JPEG de repli) pour les deux
 * visuels comptés dans le LCP. Aucun passage par l'optimiseur à la volée, un
 * préchargement déclaré dès le rendu serveur et une priorité réseau haute :
 * le navigateur peut peindre l'image avant même d'avoir exécuté le moindre script.
 */
export function HeroStaticImage({
  name,
  widths,
  fallback,
  sizes,
  alt,
  className,
  decorative = false,
}: {
  /** Préfixe des dérivés dans /images/hero (ex. « carte-1 »). */
  name: string;
  widths: number[];
  /** JPEG original, servi aux navigateurs sans AVIF ni WebP. */
  fallback: string;
  sizes: string;
  alt: string;
  className?: string;
  decorative?: boolean;
}) {
  const set = (ext: "avif" | "webp") =>
    widths.map((w) => `/images/hero/${name}-${w}.${ext} ${w}w`).join(", ");

  // Préchargement émis dans <head> côté serveur (API React 19).
  preload(`/images/hero/${name}-${widths[Math.min(1, widths.length - 1)]}.avif`, {
    as: "image",
    type: "image/avif",
    imageSrcSet: set("avif"),
    imageSizes: sizes,
    fetchPriority: "high",
  });

  return (
    <picture className="contents">
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      <img
        src={fallback}
        alt={alt}
        aria-hidden={decorative || undefined}
        sizes={sizes}
        decoding="async"
        fetchPriority="high"
        className={cn("absolute inset-0 size-full object-cover", className)}
      />
    </picture>
  );
}
