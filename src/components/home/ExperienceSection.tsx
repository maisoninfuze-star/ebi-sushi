"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { RevealText, Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { dict } from "@/i18n/fr";

/**
 * Respiration pleine largeur entre deux sections construites : l'image occupe
 * tout l'écran, le texte se pose dessus.
 */
export function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[38rem] items-center overflow-hidden bg-ink py-28 lg:min-h-[44rem]"
      aria-labelledby="experience-titre"
    >
      <motion.div className="absolute inset-0 -z-10" style={reduced ? undefined : { y, scale: 1.12 }}>
        <OptimizedImage
          src="/images/salle-restaurant-ambiance.jpg"
          alt="Salle du restaurant Ebi Sushi à El Jadida, éclairage tamisé"
          fill
          quality={72}
          sizes="100vw"
          wrapperClassName="size-full"
          className="object-cover"
        />
      </motion.div>

      <div aria-hidden className="absolute inset-0 -z-10 bg-ink/72" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-transparent to-ink"
      />

      <div className="container-page relative text-center">
        <Reveal>
          <p className="eyebrow">{dict.experience.eyebrow}</p>
        </Reveal>

        <RevealText
          as="h2"
          text={dict.experience.title}
          delay={0.08}
          className="mx-auto mt-6 max-w-[14ch] font-display text-[clamp(2.4rem,7.5vw,5.25rem)] font-light leading-[1.02] text-ivory"
        />

        <Reveal delay={0.18}>
          <p className="mx-auto mt-8 max-w-[52ch] font-sans text-[0.9375rem] leading-[1.85] text-ivory/70 sm:text-base">
            {dict.experience.description}
          </p>
        </Reveal>

        <Reveal delay={0.26}>
          <div className="mt-11 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <Button href="/reservation" size="lg" magnetic>
              {dict.reservation.cta}
            </Button>
            <Button href="/menu" variant="outline" size="lg" magnetic>
              {dict.signatures.viewAll}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
