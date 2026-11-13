import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const GOLD = "#D6B779";

/* ---------- Reusable animated background for every slide ---------- */
export function SlideBackdrop({
  variant = "navy",
  className,
}: {
  variant?: "navy" | "emerald" | "amber" | "rose";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const tint = {
    navy: "#263C35",
    emerald: "#1f4d3f",
    amber: "#5a4420",
    rose: "#5a2a34",
  }[variant];

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#101D2D] via-[#101D2D] to-[#0a1420]" />
      <motion.div
        className="absolute -top-32 right-1/4 h-80 w-80 rounded-full blur-3xl"
        style={{ background: `${GOLD}1a` }}
        animate={reduce ? undefined : { opacity: [0.4, 0.8, 0.4], scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full blur-3xl"
        style={{ background: `${tint}aa` }}
        animate={reduce ? undefined : { opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            `linear-gradient(${GOLD} 1px, transparent 1px), linear-gradient(90deg, ${GOLD} 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
        }}
      />
      {!reduce && <FloatingOrbs count={5} />}
    </div>
  );
}

/* ---------- Floating orbs ---------- */
export function FloatingOrbs({ count = 6 }: { count?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const seed = (i * 7919 + 104729) % 10007;
        const r = seed / 10007;
        const r2 = ((i * 4523 + 17) % 9973) / 9973;
        return (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${(r * 100).toFixed(2)}%`,
              top: `${(r2 * 100).toFixed(2)}%`,
              width: 3 + r2 * 5,
              height: 3 + r2 * 5,
              background: GOLD,
              boxShadow: `0 0 14px ${GOLD}55`,
            }}
            animate={{ y: [0, -18, 0], opacity: [0, 0.7, 0] }}
            transition={{
              duration: 8 + r * 10,
              delay: r2 * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}

/* ---------- Section header with animated rule ---------- */
export function SectionHeader({
  eyebrow,
  title,
  description,
  index,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  index?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mb-8"
    >
      <div className="flex items-center gap-3">
        {index && (
          <motion.span
            initial={{ scale: 0.6, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D6B779] font-display text-sm font-bold text-[#101D2D] shadow-lg shadow-[#D6B779]/25"
          >
            {index}
          </motion.span>
        )}
        <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D6B779]">
          {eyebrow}
        </div>
      </div>
      <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-[#F5F4F0] lg:text-3xl">
        {title}
      </h2>
      <motion.div
        className="mt-3 h-px origin-right bg-gradient-to-l from-[#D6B779]/70 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      />
      {description && (
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#F5F4F0]/60">
          {description}
        </p>
      )}
      {!reduce && (
        <motion.div
          className="mt-4 h-0.5 w-24 rounded-full bg-[#D6B779]/40"
          animate={{ opacity: [0.3, 0.9, 0.3], width: ["6rem", "9rem", "6rem"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </motion.div>
  );
}

/* ---------- Animated card wrapper ---------- */
export function AnimatedCard({
  children,
  className,
  delay = 0,
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      whileHover={hover && !reduce ? { y: -5 } : undefined}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-[#D6B779]/20 bg-[#F5F4F0]/[0.03] p-6",
        "shadow-[0_20px_50px_-30px_rgba(0,0,0,0.7)] transition-colors hover:border-[#D6B779]/45",
        className
      )}
    >
      {!reduce && (
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${GOLD}aa, transparent)` }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      {children}
    </motion.div>
  );
}

/* ---------- Animated progress bar ---------- */
export function AnimatedBar({
  label,
  value,
  max = 100,
  tone = "gold",
  delay = 0,
}: {
  label: string;
  value: number;
  max?: number;
  tone?: "gold" | "emerald" | "amber" | "rose";
  delay?: number;
}) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const bar = {
    gold: "bg-[#D6B779]",
    emerald: "bg-emerald-400",
    amber: "bg-amber-400",
    rose: "bg-rose-400",
  }[tone];
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="text-[#F5F4F0]/85">{label}</span>
        <span className="tabular-nums text-[#F5F4F0]/55">{value}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-[#F5F4F0]/10">
        <motion.div
          className={cn("h-full rounded-full", bar)}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay }}
        />
      </div>
    </div>
  );
}

/* ---------- Animated donut chart ---------- */
export function AnimatedDonut({
  segments,
  size = 180,
  thickness = 18,
  centerLabel,
  centerValue,
}: {
  segments: { label: string; value: number; color: string }[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
  centerValue?: string;
}) {
  const reduce = useReducedMotion();
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#F5F4F0"
            strokeOpacity="0.08"
            strokeWidth={thickness}
          />
          {segments.map((s, i) => {
            const len = (s.value / total) * c;
            const dash = `${len} ${c - len}`;
            const thisOffset = offset;
            offset += len;
            return (
              <motion.circle
                key={s.label}
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={s.color}
                strokeWidth={thickness}
                strokeLinecap="butt"
                strokeDasharray={dash}
                strokeDashoffset={-thisOffset}
                initial={reduce ? undefined : { opacity: 0 }}
                whileInView={reduce ? undefined : { opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {centerValue && (
            <div className="font-display text-2xl font-bold text-[#F5F4F0]">
              {centerValue}
            </div>
          )}
          {centerLabel && (
            <div className="text-[10px] uppercase tracking-wider text-[#D6B779]/80">
              {centerLabel}
            </div>
          )}
        </div>
      </div>
      <ul className="space-y-2">
        {segments.map((s, i) => (
          <motion.li
            key={s.label}
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.3 + i * 0.08 }}
            className="flex items-center gap-2.5 text-xs"
          >
            <span
              className="h-2.5 w-2.5 rounded-sm"
              style={{ background: s.color }}
            />
            <span className="text-[#F5F4F0]/85">{s.label}</span>
            <span className="tabular-nums text-[#F5F4F0]/50">{s.value}%</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Animated line chart ---------- */
export function AnimatedLineChart({
  points,
  labels,
  height = 180,
}: {
  points: number[];
  labels: string[];
  height?: number;
}) {
  const reduce = useReducedMotion();
  const w = 520;
  const h = height;
  const pad = 24;
  const max = Math.max(...points) * 1.15 || 1;
  const stepX = (w - pad * 2) / (points.length - 1);
  const coords = points.map((p, i) => ({
    x: pad + i * stepX,
    y: h - pad - (p / max) * (h - pad * 2),
  }));
  const path = coords
    .map((c, i) => `${i === 0 ? "M" : "L"} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`)
    .join(" ");
  const area = `${path} L ${coords[coords.length - 1].x} ${h - pad} L ${coords[0].x} ${h - pad} Z`;

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="vxArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={GOLD} stopOpacity="0.35" />
            <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1={pad}
            x2={w - pad}
            y1={pad + i * ((h - pad * 2) / 3)}
            y2={pad + i * ((h - pad * 2) / 3)}
            stroke="#F5F4F0"
            strokeOpacity="0.06"
          />
        ))}
        <motion.path
          d={area}
          fill="url(#vxArea)"
          initial={reduce ? undefined : { opacity: 0 }}
          whileInView={reduce ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
        />
        <motion.path
          d={path}
          fill="none"
          stroke={GOLD}
          strokeWidth="2"
          strokeLinecap="round"
          initial={reduce ? undefined : { pathLength: 0 }}
          whileInView={reduce ? undefined : { pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
        {coords.map((c, i) => (
          <motion.circle
            key={i}
            cx={c.x}
            cy={c.y}
            r="4"
            fill={GOLD}
            initial={reduce ? undefined : { scale: 0, opacity: 0 }}
            whileInView={reduce ? undefined : { scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
          />
        ))}
      </svg>
      <div className="mt-2 flex justify-between px-2 text-[10px] text-[#F5F4F0]/50">
        {labels.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Animated bar chart ---------- */
export function AnimatedBarChart({
  data,
  height = 180,
}: {
  data: { label: string; value: number; tone?: "gold" | "emerald" | "amber" | "rose" }[];
  height?: number;
}) {
  const max = Math.max(...data.map((d) => d.value)) || 1;
  const tones = {
    gold: "bg-[#D6B779]",
    emerald: "bg-emerald-400",
    amber: "bg-amber-400",
    rose: "bg-rose-400",
  };
  return (
    <div className="w-full">
      <div className="flex items-end gap-3" style={{ height }}>
        {data.map((d, i) => (
          <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
            <div className="relative flex w-full flex-1 items-end">
              <motion.div
                className={cn(
                  "w-full rounded-t-lg",
                  tones[d.tone ?? "gold"]
                )}
                initial={{ height: 0 }}
                whileInView={{ height: `${(d.value / max) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
              />
            </div>
            <span className="text-[10px] text-[#F5F4F0]/55">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Animated network diagram ---------- */
export function AnimatedNetwork({
  nodes,
  height = 260,
}: {
  nodes: { id: string; label: string; x: number; y: number }[];
  height?: number;
}) {
  const reduce = useReducedMotion();
  const w = 520;
  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="w-full">
      <defs>
        <radialGradient id="vxNodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={GOLD} stopOpacity="0.9" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>
      </defs>
      {nodes.map((n, i) =>
        nodes.slice(i + 1).map((m) => (
          <motion.line
            key={`${n.id}-${m.id}`}
            x1={n.x}
            y1={n.y}
            x2={m.x}
            y2={m.y}
            stroke={GOLD}
            strokeOpacity="0.25"
            strokeWidth="1"
            initial={reduce ? undefined : { pathLength: 0, opacity: 0 }}
            whileInView={reduce ? undefined : { pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 + i * 0.15 }}
          />
        ))
      )}
      {nodes.map((n, i) => (
        <g key={n.id}>
          <motion.circle
            cx={n.x}
            cy={n.y}
            r="22"
            fill="url(#vxNodeGlow)"
            initial={reduce ? undefined : { opacity: 0 }}
            whileInView={reduce ? undefined : { opacity: [0.3, 0.7, 0.3] }}
            viewport={{ once: true }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            cx={n.x}
            cy={n.y}
            r="8"
            fill={GOLD}
            initial={reduce ? undefined : { scale: 0 }}
            whileInView={reduce ? undefined : { scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 + i * 0.12 }}
          />
          <text
            x={n.x}
            y={n.y + 30}
            textAnchor="middle"
            fill="#F5F4F0"
            fillOpacity="0.85"
            fontSize="11"
            fontFamily="inherit"
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ---------- Animated timeline ---------- */
export function AnimatedTimeline({
  steps,
}: {
  steps: { title: string; description: string }[];
}) {
  return (
    <ol className="relative space-y-6 pr-8">
      <div className="absolute right-3 top-2 bottom-2 w-px bg-[#D6B779]/25" />
      {steps.map((s, i) => (
        <motion.li
          key={s.title}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
          className="relative"
        >
          <motion.span
            className="absolute right-[-1.55rem] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#D6B779] text-[10px] font-bold text-[#101D2D]"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
          >
            {i + 1}
          </motion.span>
          <div className="rounded-xl border border-[#D6B779]/20 bg-[#F5F4F0]/[0.03] p-4">
            <div className="font-display text-sm font-semibold text-[#F5F4F0]">
              {s.title}
            </div>
            <p className="mt-1 text-xs leading-relaxed text-[#F5F4F0]/60">
              {s.description}
            </p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}