import { motion } from "framer-motion";
import {
  Database,
  Building2,
  TrendingUp,
  DollarSign,
  Scale,
  UserCheck,
  Landmark,
} from "lucide-react";
import { SlideFrame } from "@/components/SlideFrame";
import {
  SectionHeader,
  AnimatedCard,
  AnimatedLineChart,
} from "@/components/Decorations";

const EASE = [0.22, 1, 0.36, 1] as const;

const ROWS = [
  { icon: Building2, t: "عدد الفنادق والغرف", src: "وزارة السياحة، الجهاز المركزي للتعبئة العامة والإحصاء", note: "بيانات حقيقية مطلوبة" },
  { icon: TrendingUp, t: "نمو القطاع السياحي", src: "تقارير منظمة السياحة العالمية، نشرات وزارة السياحة", note: "بيانات حقيقية مطلوبة" },
  { icon: DollarSign, t: "إنفاق الفنادق على التقنية", src: "دراسات قطاع الضيافة، تقارير شركات PMS العالمية", note: "بيانات حقيقية مطلوبة" },
  { icon: Scale, t: "عدد المنافسين", src: "مسح ميداني، أدلة البرمجيات، غرف التجارة", note: "بيانات حقيقية مطلوبة" },
  { icon: UserCheck, t: "سلوك العميل", src: "استبيانات ميدانية، مقابلات مع مديري الفنادق", note: "بيانات حقيقية مطلوبة" },
  { icon: Landmark, t: "سياسات الحكومة", src: "قانون حماية البيانات، قوانين الضرائب، تراخيص البرمجيات", note: "بيانات حقيقية مطلوبة" },
];

export function DataSlide() {
  return (
    <SlideFrame variant="navy">
      <SectionHeader
        index="٣"
        eyebrow="Market Data"
        title="البيانات الأساسية لدراسة السوق"
        description="البيانات المطلوبة ومصادرها المقترحة — مع التنبيه إلى أن الأرقام الحقيقية يجب جمعها من المصادر الرسمية."
      />

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <AnimatedCard delay={0.05}>
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D6B779]/15 text-[#D6B779]">
                <Database className="h-4 w-4" />
              </span>
              <h3 className="font-display text-base font-semibold text-[#F5F4F0]">
                جدول البيانات ومصادرها
              </h3>
            </div>
            <div className="space-y-2.5">
              {ROWS.map((r, i) => (
                <motion.div
                  key={r.t}
                  initial={{ opacity: 0, x: 14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.06 }}
                  className="flex items-start gap-3 rounded-xl border border-[#D6B779]/15 bg-[#101D2D]/40 p-3.5"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#D6B779]/15 text-[#D6B779]">
                    <r.icon className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold text-[#F5F4F0]">{r.t}</div>
                    <div className="mt-0.5 text-[11px] leading-relaxed text-[#F5F4F0]/55">
                      المصدر: {r.src}
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full border border-[#D6B779]/30 bg-[#D6B779]/8 px-2 py-0.5 text-[9px] font-medium text-[#D6B779]">
                    {r.note}
                  </span>
                </motion.div>
              ))}
            </div>
          </AnimatedCard>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <AnimatedCard delay={0.1}>
            <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D6B779]">
              نمو الطلب المتوقع على الأنظمة الفندقية
            </div>
            <AnimatedLineChart
              height={180}
              points={[20, 32, 45, 58, 72, 88]}
              labels={["س1", "س2", "س3", "س4", "س5", "س6"]}
            />
            <p className="mt-3 text-[10px] leading-relaxed text-[#F5F4F0]/50">
              أرقام افتراضية توضيحية — يجب استبدالها ببيانات حقيقية من مصادر رسمية.
            </p>
          </AnimatedCard>

          <AnimatedCard delay={0.15}>
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D6B779]">
              ملاحظة منهجية
            </div>
            <p className="text-xs leading-relaxed text-[#F5F4F0]/65">
              جميع الأرقام الواردة في هذه الدراسة افتراضية لأغراض التوضيح المنهجي، ولا
              يجوز اعتبارها إحصاءات حقيقية. يجب على الباحث جمع البيانات الفعلية من
              المصادر المذكورة أعلاه قبل اتخاذ قرار الاستثمار.
            </p>
          </AnimatedCard>
        </div>
      </div>
    </SlideFrame>
  );
}