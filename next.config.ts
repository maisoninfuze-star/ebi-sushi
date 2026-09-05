import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF d'abord, WebP en repli : les visuels du site pèsent ainsi 3 à 5 fois moins.
    formats: ["image/avif", "image/webp"],
    // Next 16 exige de déclarer les niveaux de qualité utilisés dans le code.
    qualities: [70, 72, 76, 78, 80, 82],
    deviceSizes: [360, 420, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [96, 160, 256, 384],
    // Les visuels sont figés entre deux mises à jour de la carte.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
