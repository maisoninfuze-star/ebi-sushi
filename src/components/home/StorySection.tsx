"use client";

import { useRef } from "react";
import { m, useScroll, useTransform, useReducedMotion } from "motion/react";

import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { RevealText, Reveal, RevealRule } from "@/components/ui/Reveal";
import { dict } from "@/i18n/fr";

/**
 * Récit de marque : deux images en relation de parallaxe, une grande
 * verticale et un détail rapproché, avec la typographie posée entre les deux.
 */
export function StorySection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const mainY = useTransform(scrollYProgress, [0, 1], ["-4%", "6%"]);
  const detailY = useTransform(scrollYProgress, [0, 1], ["10%", "-12%"]);

  return (
    <section
      id="univers"
      ref={ref}
      className="relative overflow-hidden bg-charcoal py-24 sm:py-28 lg:py-(--spacing-section)"
      aria-labelledby="univers-titre"
    >
      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Images */}
          <div className="relative lg:col-span-6">
            <m.div style={reduced ? undefined : { y: mainY }}>
              <OptimizedImage
                src="/images/atelier-preparation-saumon.jpg"
                alt="Couteau japonais et longe de saumon en cours de découpe dans la cuisine d'Ebi Sushi"
                width={900}
                height={1125}
                quality={78}
                sizes="(min-width: 1024px) 42vw, 90vw"
                wrapperClassName="aspect-4/5 w-full max-w-[34rem]"
                className="size-full object-cover"
              />
            </m.div>

            {/* Détail rapproché, en débord — crée la profondeur. */}
            <m.div
              style={reduced ? undefined : { y: detailY }}
              className="absolute -bottom-10 right-0 w-[38%] max-w-[13rem] sm:-bottom-14 sm:w-[34%] lg:-right-10"
            >
              <OptimizedImage
                src="/images/detail-texture-saumon.jpg"
                alt="Macro d'une tranche de saumon frais posée sur ardoise"
                width={500}
                height={500}
                quality={72}
                sizes="(min-width: 1024px) 16vw, 34vw"
                wrapperClassName="aspect-square w-full border-4 border-charcoal sm:border-8"
                className="size-full object-cover"
              />
            </m.div>
          </div>

          {/* Texte */}
          <div className="lg:col-span-6 lg:pl-8">
            <Reveal>
              <p className="eyebrow">{dict.story.eyebrow}</p>
            </Reveal>

            <RevealText
              as="h2"
              text={dict.story.title}
              delay={0.08}
              className="mt-6 max-w-[16ch] font-display text-[clamp(2.1rem,5.6vw,3.9rem)] font-light leading-[1.06] text-ivory"
            />

            <RevealRule delay={0.24} className="mt-9 w-14" />

            <Reveal delay={0.16}>
              <p className="mt-8 max-w-[44ch] font-sans text-[0.9375rem] leading-[1.85] text-ash sm:text-base">
                {dict.story.text}
              </p>
            </Reveal>

            <Reveal delay={0.26}>
              <p
                aria-hidden
                className="mt-12 font-display text-5xl font-light leading-none text-ivory/[0.08]"
              >
                海老
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
