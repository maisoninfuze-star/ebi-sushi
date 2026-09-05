"use client";

import { IconMinus, IconPlus } from "@/components/ui/Icons";
import { dict } from "@/i18n/fr";
import { cn } from "@/lib/utils";

export function QuantityStepper({
  value,
  onChange,
  label,
  size = "md",
  min = 0,
  max = 99,
}: {
  value: number;
  onChange: (next: number) => void;
  /** Nom du plat, pour que l'action soit compréhensible hors contexte visuel. */
  label: string;
  size?: "sm" | "md";
  min?: number;
  max?: number;
}) {
  const box = size === "sm" ? "size-9" : "size-11";

  return (
    <div
      className={cn(
        "inline-flex items-center border border-ivory/15",
        size === "sm" ? "h-9" : "h-11",
      )}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={`${dict.cart.decrease} — ${label}`}
        className={cn(
          box,
          "flex items-center justify-center text-ivory/70 transition-colors hover:text-ivory disabled:opacity-30 disabled:hover:text-ivory/70",
        )}
      >
        <IconMinus className="size-3.5" />
      </button>

      <span
        aria-live="polite"
        aria-atomic="true"
        className={cn(
          "min-w-8 text-center font-sans font-medium tabular-nums text-ivory",
          size === "sm" ? "text-xs" : "text-sm",
        )}
      >
        <span className="sr-only">{label} — quantité </span>
        {value}
      </span>

      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={`${dict.cart.increase} — ${label}`}
        className={cn(
          box,
          "flex items-center justify-center text-ivory/70 transition-colors hover:text-ivory disabled:opacity-30",
        )}
      >
        <IconPlus className="size-3.5" />
      </button>
    </div>
  );
}
