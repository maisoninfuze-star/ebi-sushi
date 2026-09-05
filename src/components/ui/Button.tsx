"use client";

import Link from "next/link";
import { useRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "quiet";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2.5 whitespace-nowrap font-sans font-medium " +
  "uppercase tracking-[0.16em] transition-[background-color,color,border-color,opacity] duration-500 " +
  "ease-[var(--ease-out-quint)] disabled:pointer-events-none disabled:opacity-45";

const variants: Record<Variant, string> = {
  primary: "bg-vermilion text-ivory hover:bg-[#c33f32]",
  outline: "border border-ivory/25 text-ivory hover:border-ivory/70 hover:bg-ivory/[0.04]",
  ghost: "border border-champagne/40 text-champagne hover:bg-champagne/10",
  quiet: "text-ivory/70 hover:text-ivory",
};

const sizes: Record<Size, string> = {
  sm: "min-h-11 px-5 text-[0.6875rem]",
  md: "min-h-12 px-7 text-[0.75rem]",
  lg: "min-h-14 px-9 text-[0.75rem] sm:min-h-[3.75rem] sm:px-11",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** Léger aimantage au curseur — pointeurs précis uniquement. */
  magnetic?: boolean;
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type LinkProps = CommonProps & { href: string; external?: boolean; "aria-label"?: string };

export function Button(props: ButtonProps | LinkProps) {
  const { variant = "primary", size = "md", className, children, magnetic = false } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 22, mass: 0.4 });

  const enabled = magnetic && !reduced;

  const onMove = (e: React.MouseEvent) => {
    if (!enabled || !ref.current) return;
    // Ignore les écrans tactiles : l'aimantage n'a pas de sens sans curseur.
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.18);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.18);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const inner = (
    <>
      <span className="relative z-10 flex items-center gap-2.5">{children}</span>
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const { href, external, ...rest } = props as LinkProps;
    const isExternal = external ?? /^(https?:|tel:|mailto:)/.test(href);

    const anchor = isExternal ? (
      <a
        href={href}
        className={classes}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        aria-label={rest["aria-label"]}
      >
        {inner}
      </a>
    ) : (
      <Link href={href} className={classes} aria-label={rest["aria-label"]}>
        {inner}
      </Link>
    );

    if (!enabled) return anchor;
    return (
      <motion.span
        ref={ref}
        className="inline-block"
        style={{ x: sx, y: sy }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        {anchor}
      </motion.span>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, magnetic: _m, ...buttonProps } =
    props as ButtonProps;

  const button = (
    <button className={classes} {...buttonProps}>
      {inner}
    </button>
  );

  if (!enabled) return button;
  return (
    <motion.span
      ref={ref}
      className="inline-block"
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {button}
    </motion.span>
  );
}
