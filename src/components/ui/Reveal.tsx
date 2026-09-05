"use client";

import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Apparition au défilement : léger fondu vers le haut, une seule fois.
 * Neutralisée si le système demande moins d'animations.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "article" | "figure";
}) {
  const reduced = useReducedMotion();
  const Component = m[as];

  return (
    <Component
      className={className}
      initial={reduced ? undefined : { opacity: 0, y }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  );
}

/**
 * Révélation typographique par masque : chaque mot monte depuis sa propre
 * fenêtre. Le texte reste intégralement dans le DOM — donc lisible par les
 * moteurs de recherche et les lecteurs d'écran, même animation désactivée.
 */
export function RevealText({
  text,
  className,
  delay = 0,
  stagger = 0.045,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) return <Tag className={className}>{text}</Tag>;

  // Le titre principal est souvent l'élément le plus grand de l'écran : un
  // texte masqué n'est pas « peint » et repousserait le LCP. Il se pose sans masque.
  if (Tag === "h1") {
    return (
      <m.h1
        className={className}
        initial={{ y: 22 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {text}
      </m.h1>
    );
  }

  return (
    <Tag className={className}>
      {/* Le texte complet reste accessible ; la version animée est décorative. */}
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline">
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden align-bottom"
            // Le masque doit dépasser la boîte de ligne des deux côtés, sinon
            // il rogne les accents français en haut et les jambages en bas.
            style={{
              paddingTop: "0.22em",
              marginTop: "-0.22em",
              paddingBottom: "0.14em",
              marginBottom: "-0.14em",
            }}
          >
            <m.span
              className="inline-block"
              initial={{ y: "108%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{
                duration: 0.9,
                delay: delay + i * stagger,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </m.span>
            {i < words.length - 1 && " "}
          </span>
        ))}
      </span>
    </Tag>
  );
}

/** Filet horizontal qui se déploie à l'entrée dans le champ — ponctue les sections. */
export function RevealRule({ className, delay = 0 }: { className?: string; delay?: number }) {
  const reduced = useReducedMotion();

  return (
    <m.span
      aria-hidden
      className={cn("block h-px origin-left bg-champagne/30", className)}
      initial={reduced ? undefined : { scaleX: 0 }}
      whileInView={reduced ? undefined : { scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
