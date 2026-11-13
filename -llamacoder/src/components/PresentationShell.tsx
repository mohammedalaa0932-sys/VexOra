import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { VexOraLockup } from "@/components/VexOraLogo";
import {
  BookOpen,
  Compass,
  Target,
  Database,
  Users,
  ClipboardList,
  TrendingUp,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export type SlideId =
  | "cover"
  | "intro"
  | "marketing"
  | "data"
  | "sample"
  | "survey"
  | "demand"
  | "conclusion";

export const SLIDES: {
  id: SlideId;
  label: string;
  short: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "cover", label: "الغلاف", short: "الغلاف", icon: BookOpen },
  { id: "intro", label: "أولاً: مدخل وتمهيد", short: "المدخل", icon: Compass },
  { id: "marketing", label: "ثانيًا: الدراسة التسويقية", short: "التسويق", icon: Target },
  { id: "data", label: "ثالثًا: البيانات الأساسية", short: "البيانات", icon: Database },
  { id: "sample", label: "رابعًا: مجتمع الدراسة", short: "المجتمع", icon: Users },
  { id: "survey", label: "خامسًا: الاستبيان والفجوة", short: "الاستبيان", icon: ClipboardList },
  { id: "demand", label: "سادسًا: تقدير الطلب", short: "الطلب", icon: TrendingUp },
  { id: "conclusion", label: "سابعًا: الخلاصة والتوصية", short: "الخلاصة", icon: CheckCircle2 },
];

export function PresentationShell({
  active,
  onChange,
  children,
}: {
  active: SlideId;
  onChange: (id: SlideId) => void;
  children: ReactNode;
}) {
  const index = SLIDES.findIndex((s) => s.id === active);
  const prev = index > 0 ? SLIDES[index - 1] : null;
  const next = index < SLIDES.length - 1 ? SLIDES[index + 1] : null;

  return (
    <div dir="rtl" className="relative min-h-screen bg-[#101D2D] text-[#F5F4F0]">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-[#D6B779]/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#263C35]/50 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(#D6B779 1px, transparent 1px), linear-gradient(90deg, #D6B779 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-[#D6B779]/50 to-transparent" />
      </div>

      <header className="sticky top-0 z-40 border-b border-[#D6B779]/20 bg-[#101D2D]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 lg:px-8">
          <VexOraLockup size={40} tone="gold" subtitle="دراسة الجدوى التسويقية" />

          <nav className="hidden items-center gap-0.5 rounded-full border border-[#D6B779]/20 bg-[#F5F4F0]/[0.04] p-1 lg:flex">
            {SLIDES.map((s) => (
              <button
                key={s.id}
                onClick={() => onChange(s.id)}
                className={cn(
                  "relative rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-200",
                  active === s.id
                    ? "text-[#101D2D]"
                    : "text-[#F5F4F0]/55 hover:text-[#F5F4F0]"
                )}
              >
                {active === s.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-[#D6B779]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{s.short}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden text-[11px] font-medium tabular-nums text-[#D6B779]/60 sm:inline">
              {String(index + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
            </span>
            <button
              onClick={() => prev && onChange(prev.id)}
              disabled={!prev}
              className="group flex h-9 w-9 items-center justify-center rounded-lg border border-[#D6B779]/25 bg-[#F5F4F0]/[0.04] text-[#F5F4F0]/70 transition-all duration-200 hover:border-[#D6B779]/60 hover:bg-[#D6B779] hover:text-[#101D2D] disabled:opacity-30 disabled:hover:bg-[#F5F4F0]/[0.04] disabled:hover:text-[#F5F4F0]/70"
              aria-label="السابق"
            >
              <ChevronRight className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            </button>
            <button
              onClick={() => next && onChange(next.id)}
              disabled={!next}
              className="group flex h-9 w-9 items-center justify-center rounded-lg border border-[#D6B779]/25 bg-[#F5F4F0]/[0.04] text-[#F5F4F0]/70 transition-all duration-200 hover:border-[#D6B779]/60 hover:bg-[#D6B779] hover:text-[#101D2D] disabled:opacity-30 disabled:hover:bg-[#F5F4F0]/[0.04] disabled:hover:text-[#F5F4F0]/70"
              aria-label="التالي"
            >
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        <div className="h-px w-full bg-[#D6B779]/15">
          <motion.div
            className="h-full bg-gradient-to-l from-[#D6B779] via-[#D6B779] to-[#263C35]"
            initial={false}
            animate={{ width: `${((index + 1) / SLIDES.length) * 100}%` }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </header>

      <div className="vx-scroll flex gap-2 overflow-x-auto border-b border-[#D6B779]/15 bg-[#101D2D]/60 px-4 py-2.5 backdrop-blur lg:hidden">
        {SLIDES.map((s) => (
          <button
            key={s.id}
            onClick={() => onChange(s.id)}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
              active === s.id
                ? "bg-[#D6B779] text-[#101D2D]"
                : "bg-[#F5F4F0]/[0.04] text-[#F5F4F0]/55 ring-1 ring-[#D6B779]/20"
            )}
          >
            <s.icon className="h-3.5 w-3.5" />
            {s.short}
          </button>
        ))}
      </div>

      <main className="relative mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 pb-12 lg:px-8">
        <button
          onClick={() => prev && onChange(prev.id)}
          disabled={!prev}
          className="group flex items-center gap-2 rounded-xl border border-[#D6B779]/25 bg-[#F5F4F0]/[0.04] px-4 py-2.5 text-sm font-medium text-[#F5F4F0]/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D6B779]/60 hover:bg-[#D6B779]/10 disabled:opacity-30 disabled:hover:translate-y-0"
        >
          <ChevronRight className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          {prev ? prev.label : "البداية"}
        </button>
        <button
          onClick={() => next && onChange(next.id)}
          disabled={!next}
          className="group flex items-center gap-2 rounded-xl bg-[#D6B779] px-4 py-2.5 text-sm font-semibold text-[#101D2D] shadow-lg shadow-[#D6B779]/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#F5F4F0] hover:shadow-xl disabled:opacity-30 disabled:hover:translate-y-0"
        >
          {next ? next.label : "النهاية"}
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </footer>
    </div>
  );
}