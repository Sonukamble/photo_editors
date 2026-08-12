import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";

type CommonProps = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-transform duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "btn-gradient px-6 py-3 text-base min-h-11 hover:scale-[1.02]",
  outline:
    "border border-navy/15 bg-white/60 px-4 py-2 text-sm text-navy min-h-10 hover:bg-white hover:border-navy/25",
  ghost: "px-3 py-2 text-sm text-navy/80 hover:text-navy hover:bg-navy/5",
};

export function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}: CommonProps & ComponentProps<"button">) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  children,
  className = "",
  variant = "primary",
  href,
  ...props
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
