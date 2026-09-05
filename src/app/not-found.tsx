import type { Metadata } from "next";
import Link from "next/link";

import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: { absolute: "Page introuvable | Ebi Sushi El Jadida" },
  description: "Cette page n'existe pas ou a été déplacée. Retrouvez la carte et la réservation d'Ebi Sushi à El Jadida.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="flex min-h-[80svh] flex-col items-center justify-center px-6 py-32 text-center">
      <Logo size="lg" />

      <p aria-hidden className="mt-14 font-display text-6xl font-light text-ivory/12">
        404
      </p>

      <h1 className="mt-6 max-w-[18ch] font-display text-[clamp(2rem,6vw,3.25rem)] font-light leading-tight text-ivory">
        Cette page n&apos;est plus au menu.
      </h1>

      <p className="mt-5 max-w-[44ch] font-sans text-sm leading-relaxed text-ash">
        La page que vous cherchez a été déplacée ou n&apos;existe pas. La carte, elle, vous attend.
      </p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
        <Button href="/menu" size="lg">
          Voir la carte
        </Button>
        <Button href="/" variant="outline" size="lg">
          Retour à l&apos;accueil
        </Button>
      </div>

      <Link
        href="/contact"
        className="mt-8 inline-flex min-h-11 items-center font-sans text-xs uppercase tracking-[0.16em] text-ash underline underline-offset-4 transition-colors hover:text-ivory"
      >
        Nous contacter
      </Link>
    </div>
  );
}
