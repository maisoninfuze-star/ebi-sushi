"use client";

import { LazyMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Les fonctionnalités d'animation (fondu, entrée au défilement, survol, sortie)
 * sont chargées après l'hydratation, dans leur propre fragment : le bundle
 * initial ne porte que le composant « m », bien plus léger que « motion ».
 * Les éléments les plus grands restant peints dès le départ (voir README),
 * ce différé n'affecte pas le LCP.
 */
const loadFeatures = () => import("motion/react").then((mod) => mod.domAnimation);

export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={loadFeatures}>{children}</LazyMotion>;
}
