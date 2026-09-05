import { RevealText, Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { dict } from "@/i18n/fr";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-ivory/[0.08] bg-ink py-24 sm:py-28 lg:py-32">
      {/* Halo vermillon très diffus — la seule couleur vive de la section. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-vermilion/[0.09] blur-[120px]"
      />

      <div className="container-page relative text-center">
        <RevealText
          as="h2"
          text={dict.finalCta.title}
          className="mx-auto max-w-[16ch] font-display text-[clamp(2.5rem,8vw,5.5rem)] font-light leading-[1.02] text-ivory"
        />

        <Reveal delay={0.14}>
          <p className="mx-auto mt-7 max-w-[44ch] font-sans text-[0.9375rem] leading-[1.8] text-ash sm:text-base">
            {dict.finalCta.text}
          </p>
        </Reveal>

        <Reveal delay={0.22}>
          <div className="mt-11 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <Button href="/menu" size="lg" magnetic>
              {dict.hero.primaryCta}
            </Button>
            <Button href="/reservation" variant="outline" size="lg" magnetic>
              {dict.hero.secondaryCta}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
