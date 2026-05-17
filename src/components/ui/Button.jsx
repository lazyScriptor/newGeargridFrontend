// Button primitive — supports anchor + button + Link via `as`.
// Variants: primary (filled dark), secondary (ghost on light), accent (amber).
import { Link } from "react-router-dom";

const variants = {
  primary:
    "bg-slate-900 text-white hover:bg-slate-800 shadow-[0_8px_24px_-12px_rgba(15,23,42,0.6)]",
  secondary:
    "bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50",
  accent:
    "bg-gradient-to-br from-amber-400 to-orange-500 text-slate-900 hover:from-amber-300 hover:to-orange-400 shadow-[0_8px_28px_-10px_rgba(245,158,11,0.5)]",
  ghost: "text-slate-900 hover:bg-slate-100",
  outlineDark:
    "ring-1 ring-white/20 text-white hover:bg-white/10",
};

const sizes = {
  sm: "px-4 py-2 text-sm rounded-full",
  md: "px-5 py-2.5 text-sm rounded-full",
  lg: "px-7 py-3.5 text-base rounded-full",
};

export default function Button({
  as = "button",
  to,
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  external,
  ...rest
}) {
  const cls = `inline-flex items-center justify-center gap-2 font-medium tracking-tight transition-all duration-200 active:scale-[0.98] ${variants[variant]} ${sizes[size]} ${className}`;

  if (as === "a" || href) {
    // External links get rel="noopener noreferrer" to prevent reverse tabnabbing
    // and to strip the Referer header from cross-origin navigation.
    const safeRel = external ? "noopener noreferrer" : rest.rel;
    return (
      <a href={href} rel={safeRel} className={cls} {...rest}>
        {children}
      </a>
    );
  }
  if (as === "Link" || to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
