"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";

import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { IconClose, IconArrowLeft, IconArrowRight } from "@/components/ui/Icons";
import { gallery } from "@/data/gallery";
import { dict } from "@/i18n/fr";
import { useEscapeKey, useScrollLock } from "@/lib/hooks";
import { useFocusTrap } from "@/lib/focus-trap";
import { cn } from "@/lib/utils";

const SPAN_CLASS = {
  wide: "sm:col-span-2 aspect-4/3 sm:aspect-3/2",
  tall: "row-span-2 aspect-3/4",
  square: "aspect-square",
} as const;

export function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduced = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const isOpen = openIndex !== null;

  useScrollLock(isOpen);
  useEscapeKey(isOpen, () => setOpenIndex(null));
  useFocusTrap(isOpen, dialogRef);

  const go = useCallback(
    (delta: number) => {
      setOpenIndex((current) =>
        current === null ? null : (current + delta + gallery.length) % gallery.length,
      );
    },
    [],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, go]);

  const active = openIndex === null ? null : gallery[openIndex];

  return (
    <section id="galerie" className="bg-ink py-24 sm:py-28 lg:py-(--spacing-section)">
      <div className="container-page">
        <SectionHeading eyebrow={dict.gallery.eyebrow} title={dict.gallery.title} />

        <ul className="mt-14 grid auto-rows-[minmax(0,1fr)] grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {gallery.map((image, i) => (
            <Reveal
              as="li"
              key={image.src}
              delay={(i % 4) * 0.07}
              className={cn("group relative", SPAN_CLASS[image.span])}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                className="size-full overflow-hidden"
                aria-label={`${dict.gallery.open} — ${image.alt}`}
              >
                <OptimizedImage
                  src={image.src}
                  alt={image.alt}
                  fill
                  quality={70}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  wrapperClassName="size-full"
                  className={cn(
                    "object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-quint)]",
                    !reduced && "group-hover:scale-105",
                  )}
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/20"
                />
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      {/* ── Visionneuse ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && active && (
          <m.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={dict.gallery.counter(openIndex + 1, gallery.length)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] flex flex-col bg-ink/97 backdrop-blur-md"
          >
            <div className="flex shrink-0 items-center justify-between px-5 py-4 sm:px-8">
              <p className="font-sans text-xs tabular-nums tracking-[0.18em] text-ash">
                {String(openIndex + 1).padStart(2, "0")}
                <span className="mx-2 text-ivory/25">/</span>
                {String(gallery.length).padStart(2, "0")}
              </p>
              <button
                type="button"
                onClick={() => setOpenIndex(null)}
                aria-label={dict.gallery.close}
                className="flex size-11 items-center justify-center text-ivory/70 transition-colors hover:text-ivory"
              >
                <IconClose className="size-6" />
              </button>
            </div>

            <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-4 sm:px-16">
              <AnimatePresence mode="wait">
                <m.figure
                  key={active.src}
                  initial={reduced ? undefined : { opacity: 0, scale: 0.985 }}
                  animate={reduced ? undefined : { opacity: 1, scale: 1 }}
                  exit={reduced ? undefined : { opacity: 0, scale: 0.985 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex max-h-full w-full max-w-5xl flex-col items-center gap-4"
                >
                  <OptimizedImage
                    src={active.src}
                    alt={active.alt}
                    width={1400}
                    height={1400}
                    quality={82}
                    sizes="(min-width: 640px) 80vw, 100vw"
                    wrapperClassName="max-h-[72vh] w-auto bg-transparent"
                    className="max-h-[72vh] w-auto object-contain"
                  />
                  <figcaption className="max-w-[60ch] text-center font-sans text-xs leading-relaxed text-ash">
                    {active.alt}
                  </figcaption>
                </m.figure>
              </AnimatePresence>

              <button
                type="button"
                onClick={() => go(-1)}
                aria-label={dict.gallery.previous}
                className="absolute left-1 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center text-ivory/60 transition-colors hover:text-ivory sm:left-3"
              >
                <IconArrowLeft className="size-6" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label={dict.gallery.next}
                className="absolute right-1 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center text-ivory/60 transition-colors hover:text-ivory sm:right-3"
              >
                <IconArrowRight className="size-6" />
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
}
