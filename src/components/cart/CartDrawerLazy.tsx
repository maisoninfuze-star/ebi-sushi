"use client";

import dynamic from "next/dynamic";

/**
 * Le tiroir du panier ne s'affiche qu'à l'ouverture : son code (formulaire,
 * animations) est chargé à la demande et ne pèse pas sur le premier rendu.
 */
export const CartDrawerLazy = dynamic(
  () => import("@/components/cart/CartDrawer").then((m) => m.CartDrawer),
  { ssr: false },
);
