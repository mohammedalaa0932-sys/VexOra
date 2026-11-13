import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Users, GraduationCap } from "lucide-react";
import { VexOraLogo } from "@/components/VexOraLogo";
import {
  GoldParticles,
  FloatingGeometry,
  AmbientLight,
  HotelHeroVisual,
} from "@/components/CoverEffects";

const EASE = [0.22, 1, 0.36, 1] as const;

const TEAM = [
  "محمد علاء",
  "إسلام بدوي",
  "حبيبة محرم",
  "إيمان مصطفى",
  "عمر الديب",
];

export function CoverSlide() {
  const reduce = useReducedMotion();

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#D6B779]/25 bg-[#101D2D] text-[#F5F4F0] shadow-[0_1px_2px_rgba(16,29,45,0.06),0_40px_100px_-40px_rgba(16,29,45,0.65)]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#101D2D] via-[#101D2D] to-[#0a1420]" />
        <AmbientLight />
        <FloatingGeometry />
        <GoldParticles count={30} />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(#D6B779 1px, transparent 1px), linear-gradient(90deg, #D6B779 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <motion.div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${"#D6B779"}cc, transparent)`,
          }}
          animate={reduce ? undefined : { opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative px-6 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex items-center justify-between gap-4 border-b border-[#D6B779]/20 pb-6"
        >
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0.7, rotate: -12, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            >
              <VexOraLogo size={48} tone="gold" />
            </motion.div>
            <div className="leading-tight">
              <div className="font-display text-lg font-bold tracking-tight text-[#F5F4F0]">
                VexOra
              </div>
              <div className="text-[11px] tracking-wide text-[#D6B779]/80">
                Smart Hotel Operations
              </div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
            className="hidden items-center gap-2 rounded-full border border-[#D6B779]/30 bg-[#D6B779]/8 px-3 py-1.5 text-[11px] font-medium text-[#D6B779] sm:flex"
          >
            <Sparkles className="h-3 w-3" />
            مشروع بحثي وتطوير برمجي
          </motion.div>
        </motion.div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
              className="mb-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D6B779]"
            >
              <motion.span
                className="h-px w-8 bg-[#D6B779]/60"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
                style={{ transformOrigin: "right" }}
              />
              Academic Project
            </motion.div>

            <h1 className="font-display text-3xl font-bold leading-[1.25] tracking-tight text-[#F5F4F0] sm:text-4xl lg:text-[2.9rem]">
              {"نظام ".split("").map((ch, i) => (
                <motion.span
                  key={`a-${i}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.35 + i * 0.03 }}
                  className="inline-block"
                >
                  {ch === " " ? "\u00A0" : ch}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
                className="relative inline-block"
              >
                <span className="relative z-10 text-[#D6B779]">VexOra</span>
                <motion.span
                  className="absolute bottom-1 left-0 right-0 z-0 h-2.5 origin-right rounded-full bg-[#D6B779]/25"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 1.1 }}
                />
                {!reduce && (
                  <motion.span
                    className="absolute inset-0 z-0 rounded-lg"
                    style={{ background: "#D6B779", filter: "blur(18px)" }}
                    animate={{ opacity: [0.15, 0.4, 0.15] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </motion.span>
              {" لإدارة العمليات التشغيلية الذكية بالفنادق".split("").map((ch, i) => (
                <motion.span
                  key={`b-${i}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.75 + i * 0.02 }}
                  className="inline-block"
                >
                  {ch === " " ? "\u00A0" : ch}
                </motion.span>
              ))}
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 1.4 }}
              className="mt-6 flex items-center gap-3"
            >
              <motion.span
                className="h-px w-10 bg-[#D6B779]/50"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease: EASE, delay: 1.5 }}
                style={{ transformOrigin: "right" }}
              />
              <p className="font-display text-sm font-medium tracking-[0.14em] text-[#D6B779]/90 sm:text-base">
                Smart Hotel Operations Management System
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 1.55 }}
              className="mt-8 max-w-xl text-sm leading-relaxed text-[#F5F4F0]/65"
            >
              منظومة رقمية متكاملة تربط أقسام الفندق — الاستقبال والإشراف الداخلي والمطبخ
              والمخازن — في مسار تشغيلي واحد، لتقليل الأخطاء، وتسريع الاستجابة، ورفع جودة
              الخدمة المقدمة للنزلاء.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.5 }}
            className="lg:col-span-5"
          >
            <HotelHeroVisual />
          </motion.div>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 1.7 }}
            className="lg:col-span-4"
          >
            <motion.div
              className="relative h-full overflow-hidden rounded-2xl border border-[#D6B779]/25 bg-[#D6B779]/6 p-6"
              whileHover={reduce ? undefined : { y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              {!reduce && (
                <motion.div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at 30% 20%, ${"#D6B779"}22, transparent 60%)`,
                  }}
                  animate={{ opacity: [0.4, 0.85, 0.4] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              <div className="relative mb-4 flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D6B779]">
                <GraduationCap className="h-4 w-4" />
                الإشراف الأكاديمي
              </div>
              <div className="relative font-display text-lg font-bold leading-snug text-[#F5F4F0]">
                د. عبد الغفار حمدان الأنصاري
              </div>
              <div className="relative mt-3 h-px w-12 bg-[#D6B779]/50" />
              <p className="relative mt-3 text-xs leading-relaxed text-[#F5F4F0]/55">
                مقرر دراسات الجدوى وتقييم المشروعات
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 1.8 }}
            className="lg:col-span-8"
          >
            <div className="h-full rounded-2xl border border-[#D6B779]/20 bg-[#F5F4F0]/[0.03] p-6">
              <div className="mb-5 flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D6B779]">
                <Users className="h-4 w-4" />
                فريق البحث
              </div>
              <ol className="grid gap-3 sm:grid-cols-2">
                {TEAM.map((name, i) => (
                  <motion.li
                    key={name}
                    initial={{ opacity: 0, x: 14, filter: "blur(4px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.55, ease: EASE, delay: 1.95 + i * 0.09 }}
                    whileHover={reduce ? undefined : { x: -4 }}
                    className="group flex items-center gap-3 rounded-xl border border-[#D6B779]/15 bg-[#101D2D]/40 px-4 py-3 transition-colors hover:border-[#D6B779]/40 hover:bg-[#D6B779]/8"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#D6B779]/15 text-[11px] font-bold text-[#D6B779] transition-colors group-hover:bg-[#D6B779] group-hover:text-[#101D2D]">
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium text-[#F5F4F0]/90">{name}</span>
                  </motion.li>
                ))}
              </ol>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 2.5 }}
          className="mt-12 flex items-center justify-between gap-4 border-t border-[#D6B779]/20 pt-6"
        >
          <div className="text-[11px] tracking-[0.2em] text-[#D6B779]/70">
            VEXORA · SMART HOTEL OPERATIONS
          </div>
          <div className="hidden text-[11px] text-[#F5F4F0]/40 sm:block">
            دراسة الجدوى التسويقية
          </div>
        </motion.div>
      </div>
    </div>
  );
}