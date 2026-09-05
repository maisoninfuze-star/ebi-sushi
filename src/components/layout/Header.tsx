"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { m, AnimatePresence } from "motion/react";

import { Logo } from "@/components/ui/Logo";
import { IconCart, IconMenu } from "@/components/ui/Icons";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import dynamic from "next/dynamic";

// Le menu mobile plein écran n'est chargé qu'à sa première ouverture.
const MobileNavigation = dynamic(
  () => import("@/components/layout/MobileNavigation").then((m) => m.MobileNavigation),
  { ssr: false },
);
import { useCart } from "@/components/cart/CartProvider";
import { mainNav } from "@/config/site";
import { dict } from "@/i18n/fr";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count, openCart, hydrated } = useCart();

  // Seule la page d'accueil possède un hero plein écran : ailleurs, l'en-tête
  // est habillée dès le chargement pour rester lisible.
  const overHero = pathname === "/";

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > 24));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const solid = scrolled || !overHero;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ease-[var(--ease-out-quint)]",
          solid
            ? "border-b border-ivory/[0.08] bg-charcoal/85 backdrop-blur-md supports-[backdrop-filter]:bg-charcoal/75 lg:backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-page">
          <div
            className={cn(
              "flex items-center justify-between transition-[height] duration-500 ease-[var(--ease-out-quint)]",
              solid ? "h-[4.5rem] lg:h-20" : "h-20 lg:h-28",
            )}
          >
            {/* Marque */}
            <Link
              href="/"
              className="shrink-0 transition-opacity duration-300 hover:opacity-80"
            >
              <Logo size={solid ? "sm" : "md"} />
              <span className="sr-only"> — accueil</span>
            </Link>

            {/* Navigation principale */}
            <nav aria-label="Navigation principale" className="hidden lg:block">
              <ul className="flex items-center gap-9">
                {mainNav.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "group relative block py-2 font-sans text-[0.75rem] font-medium uppercase tracking-[0.18em] transition-colors duration-300",
                          active ? "text-ivory" : "text-ivory/60 hover:text-ivory",
                        )}
                      >
                        {link.label}
                        <span
                          aria-hidden
                          className={cn(
                            "absolute -bottom-0.5 left-0 h-px bg-champagne transition-all duration-500 ease-[var(--ease-out-quint)]",
                            active ? "w-full" : "w-0 group-hover:w-full",
                          )}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              <LanguageSwitcher className="hidden lg:block" />

              <button
                type="button"
                onClick={openCart}
                className="relative flex size-11 items-center justify-center text-ivory/75 transition-colors duration-300 hover:text-ivory"
                aria-label={
                  hydrated && count > 0
                    ? `${dict.nav.cart} — ${dict.cart.itemCount(count)}`
                    : dict.nav.cart
                }
              >
                <IconCart className="size-[1.35rem]" />
                <AnimatePresence>
                  {hydrated && count > 0 && (
                    <m.span
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.4, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute right-1 top-1.5 flex min-w-[1.15rem] items-center justify-center rounded-full bg-vermilion px-1 font-sans text-[0.625rem] font-semibold leading-[1.15rem] text-ivory"
                    >
                      {count}
                    </m.span>
                  )}
                </AnimatePresence>
              </button>

              <Link
                href="/menu"
                className="hidden min-h-11 items-center bg-vermilion px-6 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-ivory transition-colors duration-500 hover:bg-[#b43023] sm:inline-flex"
              >
                {dict.nav.order}
              </Link>

              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="flex size-11 items-center justify-center text-ivory lg:hidden"
                aria-label={dict.nav.openMenu}
                aria-expanded={mobileOpen}
              >
                <IconMenu className="size-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileNavigation open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
