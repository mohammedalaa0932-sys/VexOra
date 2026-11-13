import { motion, useReducedMotion } from "framer-motion";
import { Building2, Sparkles, ArrowLeft } from "lucide-react";
import { HOTEL_IMAGES } from "@/components/HotelImagery";

const EASE = [0.22, 1, 0.36, 1] as const;

const BACKDROPS = [
  HOTEL_IMAGES.exterior,
  HOTEL_IMAGES.lobby,
  HOTEL_IMAGES.pool,
  HOTEL_IMAGES.suite,
];

export function CinematicHero() {
  const reduce = useReducedMotion();

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#D6B779]/25 bg-[#101D2D] shadow-[0_40px_100px_-40px_rgba(16,29,45,0.75)]">
      {/* Cinematic crossfading backdrops with Ken Burns */}
      <div className="absolute inset-0">
        {BACKDROPS.map((src, i) => (
          <motion.div
            key={src}
            className="absolute inset-0"
            initial={{ opacity: i === 0 ? 1 : 0 }}
            animate={
              reduce
                ? { opacity: i === 0 ? 1 : 0 }
                : { opacity: [0, 1, 1, 0] }
            }
            transition={
              reduce
                ? undefined
                : {
                    duration: 24,
                    times: [0, 0.08, 0.25, 0.33],
                    repeat: Infinity,
                    repeatDelay: 0,
                    delay: i * 6,
                    ease: "easeInOut",
                  }
            }
          >
            <motion.img
              src={src}
              alt=""
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              className="h-full w-full object-cover"
              initial={reduce ? undefined : { scale: 1.08 }}
              animate={reduce ? undefined : { scale: [1.08, 1.2, 1.08] }}
              transition={
                reduce
                  ? undefined
                  : { duration: 24, repeat: Infinity, ease: "easeInOut", delay: i * 6 }
              }
            />
          </motion.div>
        ))}
        {/* Layered dark overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#101D2D] via-[#101D2D]/75 to-[#101D2D]/45" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#101D2D]/85 via-transparent to-[#101D2D]/60" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(#D6B779 1px, transparent 1px), linear-gradient(90deg, #D6B779 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      {/* Floating gold accents */}
      {!reduce && (
        <>
          <motion.div
            className="pointer-events-none absolute right-[12%] top-[18%] h-40 w-40 rounded-full blur-3xl"
            style={{ background: "#D6B77922" }}
            animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute left-[8%] bottom-[14%] h-32 w-32 rounded-full blur-3xl"
            style={{ background: "#263C35aa" }}
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </>
      )}

      <div className="relative px-6 py-14 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <motion.div
              className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-[#D6B779] text-[#101D2D] shadow-lg shadow-[#D6B779]/30"
              initial={{ scale: 0.7, rotate: -12, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            >
              <Building2 className="h-5 w-5" />
            </motion.div>
            <div className="leading-tight">
              <div className="font-display text-lg font-bold tracking-tight text-[#F5F4F0]">
                VexOra
              </div>
              <div className="text-[11px] tracking-wide text-[#D6B779]/85">
                Smart Hotel Operations
              </div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
            className="hidden items-center gap-2 rounded-full border border-[#D6B779]/35 bg-[#101D2D]/60 px-3.5 py-1.5 text-[11px] font-medium text-[#D6B779] backdrop-blur sm:flex"
          >
            <Sparkles className="h-3 w-3" />
            منصة تشغيل فندقي متكاملة
          </motion.div>
        </motion.div>

        <div className="mt-16 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
            className="mb-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D6B779]"
          >
            <motion.span
              className="h-px w-8 bg-[#D6B779]/60"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
              style={{ transformOrigin: "right" }}
            />
            Hospitality Technology
          </motion.div>

          <h1 className="font-display text-3xl font-bold leading-[1.2] tracking-tight text-[#F5F4F0] sm:text-4xl lg:text-5xl">
            <motion.span
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
              className="block"
            >
              إدارة فندقية ذكية
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.75 }}
              className="mt-2 block text-[#D6B779]"
            >
              بمعايير عالمية
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 1 }}
            className="mt-6 max-w-2xl text-sm leading-relaxed text-[#F5F4F0]/75 sm:text-base"
          >
            منصة VexOra تربط الاستقبال والإشراف الداخلي والمطبخ والمخازن في مسار تشغيلي
            واحد، مع تنبيهات ذكية للمخزون ولوحة تحكم شاملة — لتقليل الأخطاء وتسريع
            الخدمة ورفع رضا النزلاء.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 1.15 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <div className="flex items-center gap-2 rounded-xl bg-[#D6B779] px-5 py-3 text-sm font-semibold text-[#101D2D] shadow-lg shadow-[#D6B779]/25">
              استكشف الدراسة
              <ArrowLeft className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-[#D6B779]/35 bg-[#101D2D]/50 px-5 py-3 text-sm font-medium text-[#F5F4F0]/85 backdrop-blur">
              عرض لوحة التحكم
            </div>
          </motion.div>
        </div>

        {/* Floating stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.35 }}
          className="mt-14 grid gap-3 sm:grid-cols-3"
        >
          {[
            { label: "أقسام مترابطة", value: "4+" },
            { label: "تنبيهات ذكية", value: "فورية" },
            { label: "تقارير تشغيلية", value: "لحظية" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 1.45 + i * 0.1 }}
              className="rounded-2xl border border-[#D6B779]/25 bg-[#101D2D]/55 px-5 py-4 backdrop-blur-md"
            >
              <div className="text-[11px] font-medium text-[#D6B779]/85">{s.label}</div>
              <div className="mt-1 font-display text-xl font-bold text-[#F5F4F0]">
                {s.value}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}