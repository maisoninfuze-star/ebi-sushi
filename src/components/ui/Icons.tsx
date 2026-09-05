import type { SVGProps } from "react";

/**
 * Jeu d'icônes linéaires, dessiné à un trait constant de 1,25 px pour rester
 * cohérent avec la finesse typographique du site.
 */
type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const IconPhone = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6.5 3h3l1.5 4.5-2 1.5a12 12 0 0 0 6 6l1.5-2L21 14.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 5.2 2 2 0 0 1 6 3Z" />
  </Icon>
);

export const IconWhatsApp = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.5 20.5 4.9 16A8 8 0 1 1 8 19.1l-4.5 1.4Z" />
    <path d="M9 9.2c.3 2.4 3.4 5.5 5.8 5.8l1-1.4 1.9.9c-.2 1.1-1.2 1.7-2.3 1.6-3.2-.3-6.6-3.7-6.9-6.9-.1-1.1.5-2.1 1.6-2.3l.9 1.9L9 9.2Z" />
  </Icon>
);

export const IconCart = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 5h2l2 10.5h9.5L20 8H7" />
    <circle cx="9.5" cy="19" r="1.1" />
    <circle cx="17" cy="19" r="1.1" />
  </Icon>
);

export const IconClose = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Icon>
);

export const IconMenu = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 7h18M3 12h18M3 17h12" />
  </Icon>
);

export const IconSearch = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4.5 4.5" />
  </Icon>
);

export const IconPlus = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 5v14M5 12h14" />
  </Icon>
);

export const IconMinus = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 12h14" />
  </Icon>
);

export const IconArrowRight = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5" />
  </Icon>
);

export const IconArrowLeft = (p: IconProps) => (
  <Icon {...p}>
    <path d="M20 12H5m0 0 5.5-5.5M5 12l5.5 5.5" />
  </Icon>
);

export const IconPin = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </Icon>
);

export const IconClock = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7v5.2l3.2 2" />
  </Icon>
);

export const IconCalendar = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="1.5" />
    <path d="M3.5 9.5h17M8 3v4M16 3v4" />
  </Icon>
);

export const IconCheck = (p: IconProps) => (
  <Icon {...p}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </Icon>
);

export const IconStar = (p: IconProps) => (
  <Icon {...p}>
    <path d="m12 3.8 2.5 5.2 5.7.8-4.1 4 1 5.7L12 16.8 6.9 19.5l1-5.7-4.1-4 5.7-.8L12 3.8Z" />
  </Icon>
);

export const IconInstagram = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
  </Icon>
);

export const IconFacebook = (p: IconProps) => (
  <Icon {...p}>
    <path d="M15 8h-1.8c-.9 0-1.2.5-1.2 1.3V11H15l-.4 3h-2.6v7" />
    <path d="M9.5 14h2.5" />
  </Icon>
);

/* ── Pictogrammes de services ─────────────────────────────────────────────── */

export const IconDineIn = (p: IconProps) => (
  <Icon {...p}>
    <path d="M7 3v8.5M4.5 3v4a2.5 2.5 0 0 0 5 0V3M7 11.5V21" />
    <path d="M17.5 3c-1.7 1.4-2.5 3.3-2.5 5.5 0 1.9.8 3 2.5 3.2V21" />
  </Icon>
);

export const IconDelivery = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="6" cy="17.5" r="2.5" />
    <circle cx="18" cy="17.5" r="2.5" />
    <path d="M8.5 17.5h7M4 8h5l2.5 5.5M15.5 17.5 14 8h-2M17 8h3l1 4.5v5h-1.5" />
  </Icon>
);

export const IconTakeaway = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 8h14l-1.2 11.2a1.5 1.5 0 0 1-1.5 1.3H7.7a1.5 1.5 0 0 1-1.5-1.3L5 8Z" />
    <path d="M8.5 8V6.2A3.2 3.2 0 0 1 11.7 3h.6a3.2 3.2 0 0 1 3.2 3.2V8" />
  </Icon>
);

export const IconReservation = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.5 20.5v-1.8A3.7 3.7 0 0 1 7.2 15h3.6a3.7 3.7 0 0 1 3.7 3.7v1.8" />
    <circle cx="9" cy="8" r="3.2" />
    <path d="M16.5 15h1a3 3 0 0 1 3 3v2.5M16 5.2a2.8 2.8 0 0 1 0 5.6" />
  </Icon>
);

export const IconLeaf = (p: IconProps) => (
  <Icon {...p}>
    <path d="M20 4c0 8-4.5 12-9 12a5 5 0 0 1-5-5c0-4.5 5-7 14-7Z" />
    <path d="M13 11c-3 1.4-5 4-6 9" />
  </Icon>
);

export const IconFlame = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 21a5.5 5.5 0 0 0 5.5-5.5c0-4.5-4-5.5-3-10.5-3 1.5-5.5 5-5.5 8 0-1.2-.6-2.4-1.5-3a7.6 7.6 0 0 0-1 5.5A5.5 5.5 0 0 0 12 21Z" />
  </Icon>
);

/* ── Carrousel ────────────────────────────────────────────────────────────── */

export const IconChevronLeft = (p: IconProps) => (
  <Icon {...p}>
    <path d="m15 5-7 7 7 7" />
  </Icon>
);

export const IconChevronRight = (p: IconProps) => (
  <Icon {...p}>
    <path d="m9 5 7 7-7 7" />
  </Icon>
);

export const IconPause = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9 6v12M15 6v12" />
  </Icon>
);

export const IconPlay = (p: IconProps) => (
  <Icon {...p}>
    <path d="M8 5.5v13l10-6.5-10-6.5Z" />
  </Icon>
);
