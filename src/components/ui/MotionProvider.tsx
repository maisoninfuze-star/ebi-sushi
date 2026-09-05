"use client";

import { LazyMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Composant « m » + LazyMotion limité à `domAnimation` (fondu, entrée au
 * défilement, survol, sortie) : les fonctionnalités inutilisées (drag, layout)
 * ne sont pas activées. Le chargement différé des fonctionnalités n'a pas
 * réduit le bundle initial mesuré (le module est déjà importé ailleurs) ; il
 * reste inoffensif et prêt si les imports statiques sont un jour allégés.
 */
const loadFeatures = () => import("motion/react").then((mod) => mod.domAnimation);

export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={loadFeatures}>{children}</LazyMotion>;
}
