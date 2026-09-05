"use client";

import { useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { locales } from "@/config/site";
import { dict } from "@/i18n/fr";
import { useEscapeKey } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/**
 * Sélecteur de langue.
 *
 * Le français est la seule langue publiée à ce jour ; l'anglais et l'arabe
 * sont annoncés comme à venir plutôt que masqués, et restent désactivés tant
 * que leur dictionnaire n'existe pas (voir src/i18n/ et src/config/site.ts).
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEscapeKey(open, () => setOpen(false));

  const current = locales.find((l) => l.enabled) ?? locales[0];

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={dict.nav.language}
        className="flex min-h-11 items-center gap-1.5 px-2 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-ivory/65 transition-colors duration-300 hover:text-ivory"
      >
        {current.short}
        <svg
          viewBox="0 0 10 6"
          className={cn("h-1.5 w-2.5 transition-transform duration-300", open && "rotate-180")}
          aria-hidden
        >
          <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <m.ul
            role="menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-full z-50 mt-2 min-w-[10.5rem] border border-ivory/10 bg-charcoal/95 py-1.5 backdrop-blur-xl"
          >
            {locales.map((locale) => (
              <li key={locale.code} role="none">
                <button
                  type="button"
                  role="menuitem"
                  disabled={!locale.enabled}
                  onClick={() => setOpen(false)}
                  aria-current={locale.enabled ? "true" : undefined}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left font-sans text-[0.75rem] transition-colors",
                    locale.enabled
                      ? "text-ivory hover:bg-ivory/[0.06]"
                      : "cursor-not-allowed text-ash/45",
                  )}
                >
                  <span>{locale.label}</span>
                  {locale.enabled ? (
                    <span className="text-[0.5625rem] uppercase tracking-[0.18em] text-champagne">
                      Actif
                    </span>
                  ) : (
                    <span className="text-[0.5625rem] uppercase tracking-[0.18em]">Bientôt</span>
                  )}
                </button>
              </li>
            ))}
          </m.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
