import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const GOLD = "#D6B779";

/* ---------------- Animated golden particles ---------------- */
export function GoldParticles({ count = 26 }: { count?: number }) {
  const reduce = useReducedMotion();
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const seed = (i * 9301 + 49297) % 233280;
        const r = seed / 233280;
        const r2 = ((i * 4523 + 7919) % 10007) / 10007;
        return {
          left: `${(r * 100).toFixed(2)}%`,
          top: `${(r2 * 100).toFixed(2)}%`,
          size: 1 + r2 * 2.2,
          dur: 9 + r * 12,
          delay: r2 * 6,
          drift: (r - 0.5) * 40,
        };
      }),
    [count]
  );

  if (reduce) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: GOLD,
            boxShadow: `0 0 ${p.size * 4}px ${GOLD}66`,
          }}
          animate={{
            y: [0, -22, 0],
            x: [0, p.drift, 0],
            opacity: [0, 0.75, 0],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ---------------- Floating geometric shapes ---------------- */
export function FloatingGeometry() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute right-[8%] top-[14%] h-24 w-24 rounded-2xl border"
        style={{ borderColor: `${GOLD}33` }}
        animate={{ y: [0, -14, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[6%] top-[58%] h-16 w-16 rounded-full border"
        style={{ borderColor: `${GOLD}2a` }}
        animate={{ y: [0, 12, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />
      <motion.div
        className="absolute right-[18%] bottom-[12%] h-10 w-10 rotate-45 border"
        style={{ borderColor: `${GOLD}30` }}
        animate={{ y: [0, -10, 0], rotate: [45, 55, 45] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      />
    </div>
  );
}

/* ---------------- Ambient lighting ---------------- */
export function AmbientLight() {
  const reduce = useReducedMotion();
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-40 right-1/4 h-96 w-96 rounded-full blur-3xl"
        style={{ background: `${GOLD}1f` }}
        animate={reduce ? undefined : { opacity: [0.5, 0.85, 0.5], scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "#263C35aa" }}
        animate={reduce ? undefined : { opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: `${GOLD}12` }}
        animate={reduce ? undefined : { opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
    </div>
  );
}

/* ---------------- 3D Hotel visual composition ---------------- */
export function HotelHeroVisual() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      setTilt({ x: px * 10, y: py * -10 });
    };
    const onLeave = () => setTilt({ x: 0, y: 0 });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [reduce]);

  return (
    <div
      ref={ref}
      className="relative aspect-square w-full"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: tilt.x, rotateX: tilt.y }}
        transition={{ type: "spring", stiffness: 90, damping: 18, mass: 0.6 }}
      >
        <div className="absolute inset-0 overflow-hidden rounded-2xl border border-[#D6B779]/25 bg-gradient-to-br from-[#263C35]/80 via-[#101D2D] to-[#101D2D] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]">
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(#D6B779 1px, transparent 1px), linear-gradient(90deg, #D6B779 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {!reduce && (
            <motion.div
              className="absolute inset-y-0 w-1/3 -skew-x-12"
              style={{
                background: `linear-gradient(90deg, transparent, ${GOLD}22, transparent)`,
              }}
              animate={{ x: ["-150%", "350%"] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
            />
          )}

          <svg
            viewBox="0 0 400 400"
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="vxGold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={GOLD} stopOpacity="0.95" />
                <stop offset="100%" stopColor={GOLD} stopOpacity="0.15" />
              </linearGradient>
              <linearGradient id="vxGoldSoft" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={GOLD} stopOpacity="0.35" />
                <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
              </linearGradient>
              <linearGradient id="vxTower" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1a2b40" />
                <stop offset="100%" stopColor="#0c1622" />
              </linearGradient>
              <radialGradient id="vxGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={GOLD} stopOpacity="0.9" />
                <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
              </radialGradient>
            </defs>

            <rect x="0" y="330" width="400" height="70" fill="url(#vxGoldSoft)" />
            <line x1="0" y1="330" x2="400" y2="330" stroke={GOLD} strokeOpacity="0.5" />

            <g>
              <rect x="58" y="180" width="70" height="150" rx="3" fill="url(#vxTower)" stroke="url(#vxGold)" strokeWidth="1.1" />
              <rect x="138" y="130" width="94" height="200" rx="3" fill="url(#vxTower)" stroke="url(#vxGold)" strokeWidth="1.3" />
              <rect x="240" y="200" width="62" height="130" rx="3" fill="url(#vxTower)" stroke="url(#vxGold)" strokeWidth="1.1" />
              <rect x="310" y="235" width="40" height="95" rx="3" fill="url(#vxTower)" stroke="url(#vxGold)" strokeWidth="1" />
            </g>

            <g>
              {Array.from({ length: 8 }).map((_, r) =>
                Array.from({ length: 4 }).map((_, c) => (
                  <motion.rect
                    key={`w-${r}-${c}`}
                    x={148 + c * 21}
                    y={145 + r * 22}
                    width="13"
                    height="14"
                    rx="1.5"
                    fill={GOLD}
                    initial={{ fillOpacity: 0.08 }}
                    animate={reduce ? undefined : { fillOpacity: [0.08, 0.35, 0.08] }}
                    transition={{
                      duration: 4 + ((r + c) % 4),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: (r * 4 + c) * 0.18,
                    }}
                  />
                ))
              )}
            </g>

            <g stroke={GOLD} strokeOpacity="0.6" strokeWidth="1" fill="none">
              <motion.path
                d="M93 200 L185 150 L271 220 L330 250"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2.4, ease: "easeInOut", delay: 0.6 }}
              />
              <motion.path
                d="M185 150 L185 80"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.6, ease: "easeInOut", delay: 1.4 }}
              />
            </g>

            {[
              { cx: 93, cy: 200, r: 3.5 },
              { cx: 185, cy: 150, r: 4.5 },
              { cx: 271, cy: 220, r: 3.5 },
              { cx: 330, cy: 250, r: 3 },
              { cx: 185, cy: 80, r: 3 },
            ].map((p, i) => (
              <g key={i}>
                <motion.circle
                  cx={p.cx}
                  cy={p.cy}
                  r={p.r * 3}
                  fill="url(#vxGlow)"
                  initial={{ opacity: 0 }}
                  animate={reduce ? { opacity: 0.35 } : { opacity: [0.2, 0.55, 0.2] }}
                  transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                />
                <motion.circle
                  cx={p.cx}
                  cy={p.cy}
                  r={p.r}
                  fill={GOLD}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1 + i * 0.15, ease: "easeOut" }}
                />
              </g>
            ))}
          </svg>

          <FloatingChip
            className="left-4 top-6"
            label="إشغال"
            value="78%"
            delay={1.2}
            reduce={!!reduce}
          />
          <FloatingChip
            className="right-4 top-24"
            label="غرف جاهزة"
            value="42"
            delay={1.5}
            reduce={!!reduce}
          />
          <FloatingChip
            className="bottom-20 left-6"
            label="طلبات معلقة"
            value="7"
            delay={1.8}
            reduce={!!reduce}
          />

          <div className="absolute bottom-4 right-4 left-4 flex items-center justify-between rounded-xl border border-[#D6B779]/25 bg-[#101D2D]/75 px-4 py-3 backdrop-blur">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#D6B779]/80">
                Connected Departments
              </div>
              <div className="mt-0.5 text-xs font-medium text-[#F5F4F0]/90">
                استقبال · إشراف داخلي · مطبخ · مخازن
              </div>
            </div>
            <motion.span
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#D6B779]/15 text-[#D6B779]"
              animate={reduce ? undefined : { scale: [1, 1.12, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
              </svg>
            </motion.span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function FloatingChip({
  className,
  label,
  value,
  delay,
  reduce,
}: {
  className: string;
  label: string;
  value: string;
  delay: number;
  reduce: boolean;
}) {
  return (
    <motion.div
      className={`absolute ${className} rounded-xl border border-[#D6B779]/30 bg-[#F5F4F0]/[0.06] px-3 py-2 backdrop-blur-md`}
      initial={{ opacity: 0, y: 12, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
      >
        <div className="text-[9px] uppercase tracking-wider text-[#D6B779]/80">{label}</div>
        <div className="font-display text-sm font-bold text-[#F5F4F0]">{value}</div>
      </motion.div>
    </motion.div>
  );
}