import { cn } from "@/lib/utils";

/**
 * VexOra brand mark — a stylized "V" formed by two converging strokes,
 * with a golden node at the apex representing the connected departments.
 * Pure SVG, scales cleanly, inherits currentColor for the strokes.
 */
export function VexOraLogo({
  className,
  size = 40,
  tone = "gold",
}: {
  className?: string;
  size?: number;
  tone?: "gold" | "navy" | "light";
}) {
  const stroke =
    tone === "gold" ? "#D6B779" : tone === "navy" ? "#101D2D" : "#F5F4F0";
  const accent = tone === "gold" ? "#101D2D" : "#D6B779";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-label="VexOra"
      role="img"
    >
      <defs>
        <linearGradient id="vxLogoStroke" x1="6" y1="6" x2="42" y2="42">
          <stop offset="0%" stopColor={stroke} stopOpacity="1" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0.55" />
        </linearGradient>
        <radialGradient id="vxLogoNode" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={stroke} stopOpacity="1" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Rounded container */}
      <rect
        x="1"
        y="1"
        width="46"
        height="46"
        rx="13"
        fill={accent}
        fillOpacity="0.08"
        stroke={stroke}
        strokeOpacity="0.35"
        strokeWidth="1"
      />

      {/* The "V" — two converging strokes */}
      <path
        d="M13 14 L24 34 L35 14"
        stroke="url(#vxLogoStroke)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Inner chevron accent */}
      <path
        d="M18.5 14 L24 24 L29.5 14"
        stroke={stroke}
        strokeOpacity="0.45"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Apex node — the connected departments */}
      <circle cx="24" cy="34" r="6" fill="url(#vxLogoNode)" opacity="0.6" />
      <circle cx="24" cy="34" r="2.6" fill={stroke} />

      {/* Small satellite nodes (departments) */}
      <circle cx="13" cy="14" r="1.8" fill={stroke} fillOpacity="0.85" />
      <circle cx="35" cy="14" r="1.8" fill={stroke} fillOpacity="0.85" />
    </svg>
  );
}

/**
 * Full lockup: mark + wordmark.
 */
export function VexOraLockup({
  size = 40,
  tone = "gold",
  subtitle,
  className,
}: {
  size?: number;
  tone?: "gold" | "navy" | "light";
  subtitle?: string;
  className?: string;
}) {
  const textColor =
    tone === "gold" ? "#F5F4F0" : tone === "navy" ? "#101D2D" : "#F5F4F0";
  const subColor =
    tone === "gold" ? "#D6B779" : tone === "navy" ? "#0d9488" : "#D6B779";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <VexOraLogo size={size} tone={tone} />
      <div className="leading-tight">
        <div
          className="font-display font-bold tracking-tight"
          style={{ color: textColor, fontSize: size * 0.45 }}
        >
          VexOra
        </div>
        {subtitle && (
          <div
            className="tracking-wide"
            style={{ color: subColor, fontSize: size * 0.26 }}
          >
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}