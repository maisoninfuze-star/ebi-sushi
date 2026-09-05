"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = Omit<ImageProps, "onLoad" | "onError" | "alt"> & {
  alt: string;
  /** Classe appliquée au conteneur (le ratio se règle ici). */
  wrapperClassName?: string;
  /** Désactive le fondu d'apparition (utile au-dessus de la ligne de flottaison). */
  instant?: boolean;
};

/**
 * Image du site : fondu d'apparition discret, fond sombre pendant le
 * chargement (aucun saut de mise en page) et repli sobre si le fichier est
 * absent — le cas nominal tant que les photos réelles des plats ne sont pas
 * fournies. Le repli reprend le caractère 海老 (« ebi », la crevette) et tient
 * aussi bien dans une vignette de 72 px que dans un grand format.
 */
export function OptimizedImage({
  wrapperClassName,
  className,
  instant = false,
  alt,
  ...props
}: Props) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  // Une source vide ne doit pas atteindre next/image, qui la rejette.
  const missing = typeof props.src !== "string" ? !props.src : props.src.trim().length === 0;
  const decorative = alt.trim().length === 0;

  return (
    <div className={cn("relative overflow-hidden bg-charcoal @container", wrapperClassName)}>
      {missing || status === "error" ? (
        <div
          {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-label": alt })}
          className="absolute inset-0 flex items-center justify-center bg-carbon"
        >
          <span
            aria-hidden
            className="select-none font-display text-[clamp(1.5rem,26cqmin,4rem)] font-light leading-none text-ivory/12"
          >
            海老
          </span>
        </div>
      ) : (
        <Image
          alt={alt}
          className={cn(
            "transition-opacity duration-700 ease-[var(--ease-out-quint)]",
            !instant && status === "loading" ? "opacity-0" : "opacity-100",
            className,
          )}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          {...props}
        />
      )}
    </div>
  );
}
