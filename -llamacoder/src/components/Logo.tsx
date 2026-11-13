import { cn } from "@/lib/utils";

type LogoVariant = "primary" | "horizontal" | "symbol" | "white" | "dark";

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
  showTagline?: boolean;
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-10 w-10", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="vexoraGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E8CE94" />
          <stop offset="50%" stopColor="#D6B779" />
          <stop offset="100%" stopColor="#B08F4E" />
        </linearGradient>
        <linearGradient id="vexoraNavy" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1B2E45" />
          <stop offset="100%" stopColor="#0B1622" />
        </linearGradient>
      </defs>

      <path
        d="M32 3 L55 16 L55 48 L32 61 L9 48 L9 16 Z"
        fill="url(#vexoraNavy)"
        stroke="url(#vexoraGold)"
        strokeWidth="1.5"
      />

      <path
        d="M20 18 L32 44 L44 18"
        stroke="url(#vexoraGold)"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M22 46 L42 46"
        stroke="url(#vexoraGold)"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.85"
      />

      <circle cx="32" cy="12" r="2.6" fill="url(#vexoraGold)" />
    </svg>
  );
}

export function Logo({
  variant = "primary",
  className,
  showTagline = false,
}: LogoProps) {
  const isWhite = variant === "white";
  const isSymbol = variant === "symbol";

  const wordColor = isWhite ? "text-white" : "text-slate-900";
  const taglineColor = isWhite ? "text-white/60" : "text-slate-500";

  if (isSymbol) {
    return <LogoMark className={className} />;
  }

  return (
    <div
      className={cn(
        "flex items-center gap-3",
        variant === "horizontal" && "gap-2.5",
        className,
      )}
    >
      <LogoMark
        className={variant === "horizontal" ? "h-9 w-9" : "h-11 w-11"}
      />
      <div className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif tracking-tight",
            variant === "horizontal" ? "text-xl" : "text-2xl",
            "font-bold",
            wordColor,
          )}
        >
          Vex
          <span className="text-[#D6B779]">O</span>
          ra
        </span>
        {showTagline && (
          <span
            className={cn(
              "mt-1 text-[10px] font-medium tracking-widest uppercase",
              taglineColor,
            )}
          >
            Hotel Operations Suite
          </span>
        )}
      </div>
    </div>
  );
}

export const FAVICON_SVG = `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><rect width="64" height="64" rx="14" fill="#0B1622"/><path d="M20 18 L32 44 L44 18" stroke="#D6B779" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><circle cx="32" cy="12" r="3" fill="#D6B779"/></svg>`;