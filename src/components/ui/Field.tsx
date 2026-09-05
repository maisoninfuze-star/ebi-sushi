"use client";

import { useId, type InputHTMLAttributes, type TextareaHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const controlClass =
  "w-full border-b border-ivory/18 bg-transparent px-0 py-3 font-sans text-[0.9375rem] text-ivory " +
  "placeholder:text-ash/45 transition-colors duration-300 focus:border-champagne focus:outline-none " +
  "aria-[invalid=true]:border-vermilion";

function Wrapper({
  id,
  label,
  error,
  hint,
  optional,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      <label
        htmlFor={id}
        className="font-sans text-[0.625rem] font-medium uppercase tracking-[0.2em] text-ash"
      >
        {label}
        {optional && <span className="ml-1.5 normal-case tracking-normal text-ash/50">(facultatif)</span>}
      </label>

      {children}

      {/* Message d'erreur annoncé aux lecteurs d'écran dès qu'il apparaît. */}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 font-sans text-xs text-salmon">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-2 font-sans text-xs text-ash/70">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  wrapperClassName?: string;
};

export function TextField({
  label,
  error,
  hint,
  optional,
  wrapperClassName,
  className,
  id: providedId,
  ...props
}: TextFieldProps) {
  const generated = useId();
  const id = providedId ?? generated;

  return (
    <Wrapper id={id} label={label} error={error} hint={hint} optional={optional} className={wrapperClassName}>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(controlClass, "mt-1", className)}
        {...props}
      />
    </Wrapper>
  );
}

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  wrapperClassName?: string;
};

export function TextAreaField({
  label,
  error,
  hint,
  optional,
  wrapperClassName,
  className,
  id: providedId,
  ...props
}: TextAreaProps) {
  const generated = useId();
  const id = providedId ?? generated;

  return (
    <Wrapper id={id} label={label} error={error} hint={hint} optional={optional} className={wrapperClassName}>
      <textarea
        id={id}
        rows={3}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(controlClass, "mt-1 resize-none", className)}
        {...props}
      />
    </Wrapper>
  );
}

export function SelectField({
  label,
  error,
  hint,
  optional,
  wrapperClassName,
  className,
  children,
  id: providedId,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  wrapperClassName?: string;
}) {
  const generated = useId();
  const id = providedId ?? generated;

  return (
    <Wrapper id={id} label={label} error={error} hint={hint} optional={optional} className={wrapperClassName}>
      <div className="relative mt-1">
        <select
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          className={cn(controlClass, "cursor-pointer pr-8", className)}
          {...props}
        >
          {children}
        </select>
        <svg
          viewBox="0 0 10 6"
          aria-hidden
          className="pointer-events-none absolute right-1 top-1/2 h-1.5 w-2.5 -translate-y-1/2 text-ash"
        >
          <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </div>
    </Wrapper>
  );
}
