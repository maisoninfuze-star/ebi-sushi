"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "motion/react";

import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { Button } from "@/components/ui/Button";
import { IconChevronLeft, IconChevronRight, IconPause, IconPlay } from "@/components/ui/Icons";
import { heroSlides, heroCarousel, heroBackdrops } from "@/data/hero";
import { getItem, piecesOf } from "@/data/menu";
import { dict } from "@/i18n/fr";
import { formatPrice } from "@/lib/format";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { useIntro } from "@/components/layout/Intro";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;
const t = dict.hero;

/**
 * Hero en deux panneaux.
 *
 * À gauche, sur un fond photographique volontairement sobre, un carrousel de
 * cartes verticales : chaque carte présente un plat réellement à la carte dans
 * un cadre décalé aux angles asymétriques (haut-droit et bas-gauche arrondis),
 * la photo débordant du filet de dix pixels vers le bas et la gauche. À droite,
 * une seule photographie porte le nom du restaurant en très grand.
 *
 * Sur mobile, le panneau de marque disparaît : le nom vient coiffer le
 * carrousel, qui occupe alors tout l'écran.
 */
export function Hero() {
  const reduced = usePrefersReducedMotion();
  // Les animations d'entrée démarrent quand le rideau de l'intro se lève.
  const { ready } = useIntro();
  const play = ready && !reduced;

  const slides = heroSlides
    .map((slide) => ({ ...slide, item: getItem(slide.itemId) }))
    .filter((slide): slide is typeof slide & { item: NonNullable<typeof slide.item> } =>
      Boolean(slide.item),
    );

  const [emblaRef, embla] = useEmblaCarousel(
    { loop: true, align: "center", duration: heroCarousel.scrollDuration, skipSnaps: false },
    [
      Autoplay({
        delay: heroCarousel.autoplayDelay,
        // Le survol suspend le défilement ; il reprend au départ du pointeur.
        stopOnMouseEnter: heroCarousel.pauseOnHover,
        stopOnInteraction: false,
        stopOnFocusIn: true,
        playOnInit: true,
      }),
    ],
  );

  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(true);
  /** Arrêt explicite demandé par l'utilisateur (bouton pause). */
  const [userPaused, setUserPaused] = useState(false);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    const onPlay = () => setPlaying(true);
    const onStop = () => setPlaying(false);
    onSelect();
    embla.on("select", onSelect);
    embla.on("autoplay:play", onPlay);
    embla.on("autoplay:stop", onStop);
    return () => {
      embla.off("select", onSelect);
      embla.off("autoplay:play", onPlay);
      embla.off("autoplay:stop", onStop);
    };
  }, [embla]);

  // Réglage système « réduire les animations » : aucun défilement automatique.
  useEffect(() => {
    const autoplay = embla?.plugins().autoplay;
    if (!autoplay) return;
    if (reduced || userPaused) autoplay.stop();
    else autoplay.play();
  }, [embla, reduced, userPaused]);

  const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla?.scrollNext(), [embla]);
  const scrollTo = useCallback((i: number) => embla?.scrollTo(i), [embla]);

  const current = slides[selected]?.item;

  return (
    <section
      aria-label="Ebi Sushi — cuisine japonaise contemporaine à El Jadida"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink lg:block"
    >
      {/* ── Fond du panneau carrousel (plein écran sur mobile, moitié gauche au-delà) ── */}
      <div aria-hidden className="absolute inset-0 lg:right-1/2">
        <OptimizedImage
          src={heroBackdrops.left.src}
          alt=""
          fill
          priority
          instant
          quality={58}
          sizes="(min-width: 1024px) 50vw, 100vw"
          wrapperClassName="size-full"
          className="object-cover object-center opacity-55 lg:opacity-60"
        />
        {/* Le fond doit rester en retrait : la carte porte la lumière. */}
        <div className="absolute inset-0 bg-ink/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-transparent to-ink/80" />
      </div>

      {/* ── Fond du panneau de marque (grand écran uniquement) ─────────────── */}
      <div aria-hidden className="absolute inset-y-0 left-1/2 right-0 hidden lg:block">
        <OptimizedImage
          src={heroBackdrops.right.src}
          alt=""
          fill
          priority
          instant
          quality={80}
          // La variante masquée sur mobile ne charge qu'une vignette d'un pixel.
          sizes="(max-width: 1023px) 1px, 50vw"
          wrapperClassName="size-full"
          className="object-cover object-[center_70%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/20 to-ink/85" />
        <div className="absolute inset-y-0 left-0 w-px bg-ivory/10" />
      </div>

      {/* ── Marque : coiffe le carrousel sur mobile, occupe le panneau droit au-delà ── */}
      <div
        className={cn(
          "relative z-10 flex flex-col items-center px-5 pt-24 text-center",
          "lg:absolute lg:inset-y-0 lg:left-1/2 lg:right-0 lg:justify-center lg:px-12 lg:pb-28 lg:pt-28",
        )}
      >
        <motion.p
          className="eyebrow"
          initial={reduced ? undefined : { opacity: 0, y: 12 }}
          animate={!play ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
        >
          {t.eyebrow}
        </motion.p>

        <h1 className="mt-4 font-display font-light uppercase leading-[0.86] tracking-[0.06em] text-ivory lg:mt-8">
          <span className="sr-only">Ebi Sushi — {t.title}</span>
          <span aria-hidden className="block">
            {t.wordmark.map((line, i) => (
              <span
                key={line}
                className="block overflow-hidden pb-[0.08em] pt-[0.1em] -mt-[0.1em] -mb-[0.08em]"
              >
                <motion.span
                  className={cn(
                    "block text-[clamp(3.25rem,15vw,6rem)] lg:text-[clamp(6rem,11.5vw,13.5rem)]",
                    i === 1 && "text-champagne",
                  )}
                  initial={reduced ? undefined : { y: "104%" }}
                  animate={!play ? undefined : { y: 0 }}
                  transition={{ duration: 1.1, delay: 0.45 + i * 0.12, ease: EASE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        <motion.p
          className="mt-4 hidden max-w-[24ch] font-display text-2xl font-light italic leading-snug text-ivory/85 lg:mt-7 lg:block lg:text-3xl"
          initial={reduced ? undefined : { opacity: 0, y: 12 }}
          animate={!play ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease: EASE }}
        >
          {t.title}
        </motion.p>

        {/* Les deux appels à l'action — sur mobile, la barre fixe en bas d'écran s'en charge. */}
        <motion.div
          className="absolute inset-x-0 bottom-0 hidden items-center justify-center gap-4 pb-12 lg:flex"
          initial={reduced ? undefined : { opacity: 0, y: 16 }}
          animate={!play ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1, ease: EASE }}
        >
          <Button href="/menu" size="lg" magnetic>
            {t.primaryCta}
          </Button>
          <Button href="/reservation" variant="outline" size="lg" magnetic>
            {t.secondaryCta}
          </Button>
        </motion.div>
      </div>

      {/* ── Carrousel de plats ──────────────────────────────────────────────── */}
      <div
        role="region"
        aria-roledescription="carrousel"
        aria-label={t.carousel.label}
        className={cn(
          "relative z-10 flex flex-1 flex-col items-center justify-center pb-[5.5rem] pt-3",
          "lg:absolute lg:inset-y-0 lg:left-0 lg:w-1/2 lg:pb-16 lg:pt-28",
        )}
      >
        {/* Fenêtre Embla */}
        <motion.div
          ref={emblaRef}
          className="w-full shrink-0 overflow-hidden"
          initial={reduced ? undefined : { opacity: 0, y: 28 }}
          animate={!play ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.55, ease: EASE }}
        >
          <div className="flex touch-pan-y">
            {slides.map(({ item, image, alt }, i) => {
              const pieces = piecesOf(item);
              const active = i === selected;
              return (
                <div
                  key={item.id}
                  role="group"
                  aria-roledescription="diapositive"
                  aria-label={`${i + 1} / ${slides.length} — ${item.name}`}
                  aria-hidden={!active}
                  className="flex min-w-0 flex-[0_0_100%] justify-center px-6 pb-7 pt-4"
                >
                  {/* Carte : filet + photo décalée de dix pixels vers le bas et la gauche. */}
                  <div
                    className={cn(
                      "relative aspect-[17/30] h-[min(46svh,27rem)] max-w-[84%] transition-opacity duration-700 lg:h-[min(58svh,34rem)]",
                      active ? "opacity-100" : "opacity-60",
                    )}
                  >
                    <div
                      aria-hidden
                      className="absolute inset-0 rounded-[0_2.5rem_0_2.5rem] border border-champagne/70 lg:rounded-[0_5rem_0_5rem]"
                    />

                    <div className="absolute inset-0 -translate-x-2.5 translate-y-2.5 overflow-hidden rounded-[0_2.5rem_0_2.5rem] bg-charcoal shadow-[0_0_10px_rgba(0,0,0,0.5)] lg:rounded-[0_5rem_0_5rem]">
                      <OptimizedImage
                        src={image}
                        alt={alt}
                        fill
                        priority={i === 0}
                        instant={i === 0}
                        quality={72}
                        sizes="(min-width: 1024px) 24rem, 72vw"
                        wrapperClassName="size-full"
                        className="object-cover object-top"
                      />

                      {/* Voile bas : la légende et le bouton restent lisibles sur toute photo. */}
                      <div
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/90 via-ink/45 to-transparent"
                      />

                      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-4 px-5 pb-6 text-center">
                        <div>
                          <p className="font-display text-[1.35rem] font-normal leading-tight text-ivory lg:text-2xl">
                            {item.name}
                          </p>
                          <p className="mt-1 font-sans text-[0.625rem] uppercase tracking-[0.2em] text-champagne">
                            {formatPrice(item.price)}
                            {pieces && (
                              <>
                                <span className="mx-2 text-ivory/30">·</span>
                                {dict.menu.pieces(pieces)}
                              </>
                            )}
                          </p>
                        </div>

                        <Link
                          href={`/menu#categorie-${item.category}`}
                          tabIndex={active ? 0 : -1}
                          className="inline-flex min-h-11 items-center border border-ivory/60 px-6 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-ivory transition-colors duration-500 hover:border-champagne hover:bg-champagne/10 hover:text-champagne"
                        >
                          {t.carousel.cardCta}
                          <span className="sr-only"> — {item.name}</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Flèches — aux bords du panneau, à mi-hauteur */}
        <button
          type="button"
          onClick={scrollPrev}
          aria-label={t.carousel.previous}
          className="absolute left-1 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center text-champagne transition-colors duration-300 hover:text-ivory lg:left-3 lg:size-14"
        >
          <IconChevronLeft className="size-7 lg:size-9" strokeWidth={1} />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          aria-label={t.carousel.next}
          className="absolute right-1 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center text-champagne transition-colors duration-300 hover:text-ivory lg:right-3 lg:size-14"
        >
          <IconChevronRight className="size-7 lg:size-9" strokeWidth={1} />
        </button>

        {/* Puces + pause */}
        <div className="mt-1 flex shrink-0 items-center justify-center gap-1 lg:mt-3">
          <ul className="flex items-center" aria-label={t.carousel.label}>
            {slides.map(({ item }, i) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => scrollTo(i)}
                  aria-label={t.carousel.goTo(i + 1, item.name)}
                  aria-current={i === selected ? "true" : undefined}
                  className="flex size-10 items-center justify-center"
                >
                  <span
                    aria-hidden
                    className={cn(
                      "block size-1.5 rounded-full transition-[background-color,transform] duration-500",
                      i === selected ? "scale-125 bg-champagne" : "bg-ivory/25",
                    )}
                  />
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setUserPaused((v) => !v)}
            aria-pressed={userPaused}
            aria-label={playing ? t.carousel.pause : t.carousel.play}
            className="flex size-10 items-center justify-center text-ivory/50 transition-colors hover:text-ivory"
          >
            {playing ? <IconPause className="size-4" /> : <IconPlay className="size-4" />}
          </button>
        </div>

        {/* Annonce discrète du plat affiché aux technologies d'assistance. */}
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {current ? t.carousel.status(selected + 1, slides.length, current.name) : ""}
        </p>
      </div>
    </section>
  );
}
