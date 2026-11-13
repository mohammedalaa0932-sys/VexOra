import { motion, useReducedMotion } from "framer-motion";
import { VexOraLogo, VexOraLockup } from "@/components/VexOraLogo";

const EASE = [0.22, 1, 0.36, 1] as const;

export function BrandShowcase() {
  const reduce = useReducedMotion();

  return (
    <section className="mt-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: EASE }}
        className="mb-6"
      >
        <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D6B779]">
          <span className="h-px w-8 bg-[#D6B779]/60" />
          Brand Identity
        </div>
        <h2 className="font-display text-2xl font-bold tracking-tight text-[#F5F4F0] lg:text-3xl">
          هوية VexOra البصرية
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#F5F4F0]/60">
          الشعار يجمع حرف V بثلاث نقاط تمثل الأقسام المترابطة: الاستقبال، الإشراف
          الداخلي، والمخازن — متصلة جميعها بعقدة واحدة.
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Primary on dark */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE, delay: 0 }}
          whileHover={reduce ? undefined : { y: -5 }}
          className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-[#D6B779]/25 bg-[#101D2D] p-8"
        >
          <VexOraLogo size={72} tone="gold" />
          <div className="text-center">
            <div className="font-display text-sm font-bold text-[#F5F4F0]">
              VexOra
            </div>
            <div className="mt-0.5 text-[10px] text-[#D6B779]/80">
              Primary · Dark
            </div>
          </div>
        </motion.div>

        {/* On gold */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
          whileHover={reduce ? undefined : { y: -5 }}
          className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-[#D6B779]/40 bg-[#D6B779] p-8"
        >
          <VexOraLogo size={72} tone="navy" />
          <div className="text-center">
            <div className="font-display text-sm font-bold text-[#101D2D]">
              VexOra
            </div>
            <div className="mt-0.5 text-[10px] text-[#101D2D]/70">
              Inverse · Gold
            </div>
          </div>
        </motion.div>

        {/* Monochrome light */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.16 }}
          whileHover={reduce ? undefined : { y: -5 }}
          className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-[#F5F4F0]/15 bg-[#F5F4F0]/[0.04] p-8"
        >
          <VexOraLogo size={72} tone="light" />
          <div className="text-center">
            <div className="font-display text-sm font-bold text-[#F5F4F0]">
              VexOra
            </div>
            <div className="mt-0.5 text-[10px] text-[#F5F4F0]/50">
              Monochrome
            </div>
          </div>
        </motion.div>

        {/* Lockup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.24 }}
          whileHover={reduce ? undefined : { y: -5 }}
          className="flex flex-col items-center justify-center gap-5 rounded-2xl border border-[#D6B779]/25 bg-gradient-to-br from-[#263C35]/60 to-[#101D2D] p-8"
        >
          <VexOraLockup size={56} tone="gold" subtitle="Smart Hotel Operations" />
          <div className="text-[10px] text-[#D6B779]/70">Full Lockup</div>
        </motion.div>
      </div>
    </section>
  );
}