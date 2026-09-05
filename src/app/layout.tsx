import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

import { CartProvider } from "@/components/cart/CartProvider";
import { CartDrawerLazy } from "@/components/cart/CartDrawerLazy";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileOrderBar } from "@/components/layout/MobileOrderBar";
import { Grain } from "@/components/ui/Grain";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { IntroProvider, IntroOverlay } from "@/components/layout/Intro";
import { INTRO_STORAGE_KEY } from "@/lib/intro";
import { RestaurantSchema } from "@/components/seo/StructuredData";
import { SITE_URL, seo } from "@/config/site";
import { dict } from "@/i18n/fr";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: seo.home.title,
    template: "%s | Ebi Sushi El Jadida",
  },
  description: seo.home.description,
  applicationName: "Ebi Sushi",
  authors: [{ name: "Ebi Sushi" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_MA",
    url: SITE_URL,
    siteName: "Ebi Sushi",
    title: seo.home.title,
    description: seo.home.description,
    images: [
      {
        url: "/images/og-ebi-sushi.jpg",
        width: 1200,
        height: 675,
        alt: "Assortiment de sushi Ebi Sushi dressé sur ardoise noire",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.home.title,
    description: seo.home.description,
    images: ["/images/og-ebi-sushi.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "restaurant",
};

export const viewport: Viewport = {
  themeColor: "#090909",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      dir="ltr"
      className={`${cormorant.variable} ${manrope.variable}`}
      // L'attribut data-intro est posé par le script de <head> avant l'hydratation.
      suppressHydrationWarning
    >
      <body className="bg-ink text-ivory antialiased">
        {/* Premier enfant de <body> : le navigateur l'exécute en analysant le
            HTML, avant de peindre quoi que ce soit. Une intro déjà vue dans la
            session est ainsi masquée par CSS sans le moindre éclair. (Un <head>
            écrit à la main est ignoré par l'App Router, et un script
            « beforeInteractive » n'offre pas cette garantie de timing.) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem(${JSON.stringify(INTRO_STORAGE_KEY)}))document.documentElement.setAttribute("data-intro","seen")}catch(e){}`,
          }}
        />

        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ivory focus:px-5 focus:py-3 focus:font-sans focus:text-xs focus:uppercase focus:tracking-[0.2em] focus:text-ink"
        >
          {dict.nav.skipToContent}
        </a>

        <MotionProvider>
        <IntroProvider>
          <CartProvider>
            <Header />
            <main id="contenu">{children}</main>
            <Footer />
            <MobileOrderBar />
            <CartDrawerLazy />
          </CartProvider>
          <IntroOverlay />
        </IntroProvider>
        </MotionProvider>

        <Grain />
        <RestaurantSchema />
      </body>
    </html>
  );
}
