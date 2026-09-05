"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "motion/react";

import { IconPhone, IconCalendar, IconCart, IconArrowRight } from "@/components/ui/Icons";
import { useCart } from "@/components/cart/CartProvider";
import { business } from "@/config/business";
import { dict } from "@/i18n/fr";
import { formatPrice } from "@/lib/format";

/**
 * Barre d'action permanente sur mobile.
 *
 * Elle change de rôle selon le contexte : trois raccourcis de conversion par
 * défaut, et un récapitulatif de panier dès qu'une commande est en cours sur
 * la carte — plutôt que deux barres empilées qui mangeraient l'écran.
 */
export function MobileOrderBar() {
  const pathname = usePathname();
  const { count, subtotal, openCart, hydrated } = useCart();

  const showCartSummary = hydrated && count > 0 && pathname.startsWith("/menu");

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
      <AnimatePresence mode="wait" initial={false}>
        {showCartSummary ? (
          <m.div
            key="cart"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-ivory/10 bg-charcoal/95 backdrop-blur-md"
          >
            <div className="px-4 pt-3 pb-safe">
              <button
                type="button"
                onClick={openCart}
                className="flex min-h-[3.25rem] w-full items-center justify-between bg-vermilion px-5 text-ivory"
              >
                <span className="flex items-center gap-2.5">
                  <IconCart className="size-[1.15rem]" />
                  <span className="font-sans text-[0.75rem] font-medium uppercase tracking-[0.16em]">
                    {dict.cart.itemCount(count)}
                  </span>
                </span>
                <span className="flex items-center gap-3">
                  <span className="font-sans text-sm font-semibold">{formatPrice(subtotal)}</span>
                  <IconArrowRight className="size-4" />
                </span>
              </button>
            </div>
          </m.div>
        ) : (
          <m.nav
            key="actions"
            aria-label="Actions rapides"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-ivory/10 bg-charcoal/95 backdrop-blur-md"
          >
            <ul className="grid grid-cols-3 pb-safe">
              <li className="border-r border-ivory/[0.08]">
                <a
                  href={`tel:${business.phone.e164}`}
                  className="flex min-h-[3.75rem] flex-col items-center justify-center gap-1 text-ivory/80"
                >
                  <IconPhone className="size-[1.1rem]" />
                  <span className="font-sans text-[0.625rem] font-medium uppercase tracking-[0.16em]">
                    {dict.mobileBar.call}
                  </span>
                </a>
              </li>
              <li className="border-r border-ivory/[0.08]">
                <Link
                  href="/reservation"
                  className="flex min-h-[3.75rem] flex-col items-center justify-center gap-1 text-ivory/80"
                >
                  <IconCalendar className="size-[1.1rem]" />
                  <span className="font-sans text-[0.625rem] font-medium uppercase tracking-[0.16em]">
                    {dict.mobileBar.reserve}
                  </span>
                </Link>
              </li>
              <li className="bg-vermilion">
                <Link
                  href="/menu"
                  className="flex min-h-[3.75rem] flex-col items-center justify-center gap-1 text-ivory"
                >
                  <IconCart className="size-[1.1rem]" />
                  <span className="font-sans text-[0.625rem] font-semibold uppercase tracking-[0.16em]">
                    {dict.mobileBar.order}
                  </span>
                </Link>
              </li>
            </ul>
          </m.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
