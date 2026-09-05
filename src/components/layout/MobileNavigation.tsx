"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { AnimatePresence, m } from "motion/react";

import { Logo } from "@/components/ui/Logo";
import { IconClose, IconPhone, IconInstagram, IconFacebook } from "@/components/ui/Icons";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { mainNav } from "@/config/site";
import { business } from "@/config/business";
import { dict } from "@/i18n/fr";
import { useEscapeKey, useScrollLock } from "@/lib/hooks";
import { useFocusTrap } from "@/lib/focus-trap";
import { cn } from "@/lib/utils";

export function MobileNavigation({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);

  useScrollLock(open);
  useEscapeKey(open, onClose);
  useFocusTrap(open, panelRef);

  // Un changement de page ferme le panneau (retour arrière du navigateur inclus).
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[70] flex flex-col bg-ink lg:hidden"
        >
          {/* Bandeau supérieur, aligné sur celui de l'en-tête */}
          <div className="container-page flex h-20 shrink-0 items-center justify-between">
            <Logo size="sm" />
            <div className="flex items-center gap-1">
              <LanguageSwitcher />
              <button
                type="button"
                onClick={onClose}
                className="flex size-11 items-center justify-center text-ivory"
                aria-label={dict.nav.closeMenu}
              >
                <IconClose className="size-6" />
              </button>
            </div>
          </div>

          {/* Liens */}
          <nav
            aria-label="Navigation principale"
            className="container-page flex-1 overflow-y-auto overscroll-contain pt-4"
          >
            <ul className="flex flex-col">
              {mainNav.map((link, i) => {
                const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <m.li
                    key={link.href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.06 + i * 0.055,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="border-b border-ivory/[0.07]"
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className="flex items-baseline justify-between py-5"
                    >
                      <span
                        className={cn(
                          "font-display text-[2.15rem] font-light leading-none",
                          active ? "text-ivory" : "text-ivory/75",
                        )}
                      >
                        {link.label}
                      </span>
                      <span
                        aria-hidden
                        className="font-sans text-[0.625rem] tracking-[0.2em] text-champagne/60"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </m.li>
                );
              })}
            </ul>

            {/* Contact et réseaux */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.36 }}
              className="mt-10 pb-10"
            >
              <p className="eyebrow">{dict.footer.contact}</p>

              <a
                href={`tel:${business.phone.e164}`}
                className="mt-3 flex min-h-11 items-center gap-3 font-sans text-lg text-ivory"
              >
                <IconPhone className="size-4 text-champagne" />
                {business.phone.display}
              </a>

              <p className="mt-4 max-w-[32ch] font-sans text-sm leading-relaxed text-ash">
                {business.address.full}
              </p>
              <p className="mt-2 font-sans text-sm text-ash">{business.hours.summary}</p>

              <div className="mt-7 flex items-center gap-3">
                <a
                  href={business.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ebi Sushi sur Instagram"
                  className="flex size-11 items-center justify-center border border-ivory/15 text-ivory/70 transition-colors hover:border-ivory/40 hover:text-ivory"
                >
                  <IconInstagram className="size-[1.15rem]" />
                </a>
                <a
                  href={business.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ebi Sushi sur Facebook"
                  className="flex size-11 items-center justify-center border border-ivory/15 text-ivory/70 transition-colors hover:border-ivory/40 hover:text-ivory"
                >
                  <IconFacebook className="size-[1.15rem]" />
                </a>
              </div>
            </m.div>
          </nav>

          {/* Actions permanentes */}
          <div className="container-page shrink-0 border-t border-ivory/[0.08] py-4 pb-safe">
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/reservation"
                onClick={onClose}
                className="flex min-h-[3.25rem] items-center justify-center border border-ivory/25 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-ivory"
              >
                {dict.mobileBar.reserve}
              </Link>
              <Link
                href="/menu"
                onClick={onClose}
                className="flex min-h-[3.25rem] items-center justify-center bg-vermilion font-sans text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-ivory"
              >
                {dict.nav.order}
              </Link>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
