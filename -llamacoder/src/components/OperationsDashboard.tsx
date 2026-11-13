import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  BedDouble,
  Sparkles,
  ChefHat,
  Package,
  AlertTriangle,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { HOTEL_IMAGES } from "@/components/HotelImagery";

const EASE = [0.22, 1, 0.36, 1] as const;

function useCountUp(target: number, active: boolean, duration = 1400) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? target : 0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    if (reduce) {
      setValue(target);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [active, target, duration, reduce]);

  return value;
}

function StatCard({
  icon: Icon,
  label,
  value,
  suffix,
  tone,
  delay,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  suffix?: string;
  tone: "gold" | "emerald" | "amber" | "rose";
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const count = useCountUp(value, inView);

  const tones = {
    gold: "from-[#D6B779]/20 to-transparent text-[#D6B779] ring-[#D6B779]/35",
    emerald: "from-emerald-400/15 to-transparent text-emerald-300 ring-emerald-400/30",
    amber: "from-amber-400/15 to-transparent text-amber-300 ring-amber-400/30",
    rose: "from-rose-400/15 to-transparent text-rose-300 ring-rose-400/30",
  }[tone];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: EASE, delay }}
      whileHover={{ y: -4 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-[#D6B779]/20 bg-[#F5F4F0]/[0.03] p-5 backdrop-blur-sm",
        "transition-colors hover:border-[#D6B779]/45"
      )}
    >
      <div className={cn("absolute inset-x-0 top-0 h-24 bg-gradient-to-b", tones.split(" ")[0], tones.split(" ")[1])} />
      <div className="relative flex items-start justify-between">
        <div>
          <div className="text-[11px] font-medium text-[#F5F4F0]/60">{label}</div>
          <div className="mt-2 font-display text-3xl font-bold tabular-nums text-[#F5F4F0]">
            {count}
            {suffix && <span className="text-lg text-[#D6B779]">{suffix}</span>}
          </div>
        </div>
        <span
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-xl ring-1",
            tones.split(" ").slice(2).join(" ")
          )}
        >
          <Icon className="h-4 w-4" />
        </span>
      </div>
    </motion.div>
  );
}

const ROOMS = [
  { no: "201", status: "فارغة", tone: "emerald", note: "جاهزة للتنظيف" },
  { no: "202", status: "مشغولة", tone: "rose", note: "نزيل حتى الغد" },
  { no: "203", status: "قيد التنظيف", tone: "amber", note: "الإشراف الداخلي" },
  { no: "204", status: "فارغة", tone: "emerald", note: "تم الفحص" },
  { no: "205", status: "صيانة", tone: "rose", note: "تكييف" },
  { no: "206", status: "فارغة", tone: "emerald", note: "جاهزة" },
];

const ALERTS = [
  { item: "مناديل ورقية", left: 100, min: 500, tone: "rose" },
  { item: "منظف أرضيات", left: 320, min: 400, tone: "amber" },
  { item: "أكياس قمامة", left: 780, min: 500, tone: "emerald" },
];

export function OperationsDashboard() {
  const reduce = useReducedMotion();

  return (
    <section className="mt-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: EASE }}
        className="mb-6 flex flex-wrap items-end justify-between gap-4"
      >
        <div>
          <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D6B779]">
            <span className="h-px w-8 bg-[#D6B779]/60" />
            Live Operations
          </div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-[#F5F4F0] lg:text-3xl">
            لوحة التحكم التشغيلية
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#F5F4F0]/60">
            عرض توضيحي لكيفية متابعة حالة الغرف، وطلبات الأقسام، وتنبيهات المخزون في
            الوقت الفعلي.
          </p>
        </div>
      </motion.div>

      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={BedDouble} label="غرف فارغة" value={42} tone="emerald" delay={0} />
        <StatCard icon={Sparkles} label="قيد التنظيف" value={8} tone="amber" delay={0.06} />
        <StatCard icon={ChefHat} label="طلبات المطبخ" value={17} tone="gold" delay={0.12} />
        <StatCard icon={AlertTriangle} label="تنبيهات مخزون" value={3} tone="rose" delay={0.18} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        {/* Room status board */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="lg:col-span-7"
        >
          <div className="overflow-hidden rounded-2xl border border-[#D6B779]/20 bg-[#F5F4F0]/[0.03]">
            <div className="flex items-center justify-between border-b border-[#D6B779]/15 px-5 py-4">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#D6B779] text-[#101D2D]">
                  <BedDouble className="h-4 w-4" />
                </span>
                <h3 className="font-display text-sm font-semibold text-[#F5F4F0]">
                  حالة الغرف — الطابق الثاني
                </h3>
              </div>
              <span className="flex items-center gap-1.5 text-[11px] text-[#F5F4F0]/50">
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                  animate={reduce ? undefined : { opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
                مباشر
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-3">
              {ROOMS.map((r, i) => {
                const tones = {
                  emerald: "border-emerald-400/30 bg-emerald-400/8 text-emerald-200",
                  amber: "border-amber-400/30 bg-amber-400/8 text-amber-200",
                  rose: "border-rose-400/30 bg-rose-400/8 text-rose-200",
                }[r.tone as "emerald" | "amber" | "rose"];
                return (
                  <motion.div
                    key={r.no}
                    initial={{ opacity: 0, scale: 0.94 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: EASE, delay: i * 0.05 }}
                    whileHover={reduce ? undefined : { y: -3 }}
                    className={cn(
                      "rounded-xl border p-3 transition-colors",
                      tones
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-base font-bold text-[#F5F4F0]">
                        {r.no}
                      </span>
                      <span className="text-[10px] font-semibold">{r.status}</span>
                    </div>
                    <div className="mt-1.5 text-[10px] text-[#F5F4F0]/55">{r.note}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Inventory alerts + image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="lg:col-span-5"
        >
          <div className="overflow-hidden rounded-2xl border border-[#D6B779]/20 bg-[#F5F4F0]/[0.03]">
            <div className="relative h-32">
              <img
                src={HOTEL_IMAGES.housekeeping}
                alt="الإشراف الداخلي"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101D2D] via-[#101D2D]/40 to-transparent" />
              <div className="absolute bottom-3 right-4 left-4 flex items-center gap-2">
                <Package className="h-4 w-4 text-[#D6B779]" />
                <span className="text-xs font-semibold text-[#F5F4F0]">
                  تنبيهات المخزون الذكية
                </span>
              </div>
            </div>
            <div className="space-y-3 p-5">
              {ALERTS.map((a, i) => {
                const pct = Math.min(100, Math.round((a.left / a.min) * 100));
                const barTone = {
                  rose: "bg-rose-400",
                  amber: "bg-amber-400",
                  emerald: "bg-emerald-400",
                }[a.tone as "rose" | "amber" | "emerald"];
                return (
                  <motion.div
                    key={a.item}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, ease: EASE, delay: i * 0.08 }}
                  >
                    <div className="mb-1.5 flex items-center justify-between text-xs">
                      <span className="text-[#F5F4F0]/85">{a.item}</span>
                      <span className="tabular-nums text-[#F5F4F0]/55">
                        {a.left} / {a.min}
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-[#F5F4F0]/10">
                      <motion.div
                        className={cn("h-full rounded-full", barTone)}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: EASE, delay: 0.2 + i * 0.08 }}
                      />
                    </div>
                  </motion.div>
                );
              })}
              <div className="flex items-center gap-2 rounded-xl border border-[#D6B779]/25 bg-[#D6B779]/8 px-3 py-2.5 text-[11px] text-[#F5F4F0]/85">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#D6B779]" />
                يتم إرسال إشعار تلقائي للمخزن عند الوصول للحد الأدنى.
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Trend strip */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
        className="mt-6 grid gap-4 sm:grid-cols-3"
      >
        {[
          { label: "متوسط زمن الاستجابة", value: "أقل من دقيقة", icon: TrendingUp },
          { label: "دقة تسجيل النواقص", value: "99%", icon: CheckCircle2 },
          { label: "رضا النزلاء", value: "4.7 / 5", icon: Sparkles },
        ].map((s, i) => (
          <div
            key={s.label}
            className="flex items-center gap-3 rounded-2xl border border-[#D6B779]/20 bg-[#F5F4F0]/[0.03] px-5 py-4"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D6B779]/15 text-[#D6B779]">
              <s.icon className="h-4 w-4" />
            </span>
            <div>
              <div className="text-[11px] text-[#F5F4F0]/55">{s.label}</div>
              <div className="font-display text-sm font-bold text-[#F5F4F0]">
                {s.value}
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}