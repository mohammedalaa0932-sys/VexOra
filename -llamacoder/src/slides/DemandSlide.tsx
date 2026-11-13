import { motion } from "framer-motion";
import {
  TrendingUp,
  Calculator,
  BarChart3,
  Server,
  Users,
  Headphones,
} from "lucide-react";
import { SlideFrame } from "@/components/SlideFrame";
import {
  SectionHeader,
  AnimatedCard,
  AnimatedLineChart,
  AnimatedBarChart,
  AnimatedNetwork,
  AnimatedBar,
} from "@/components/Decorations";

const EASE = [0.22, 1, 0.36, 1] as const;

export function DemandSlide() {
  return (
    <SlideFrame variant="rose">
      <SectionHeader
        index="٦"
        eyebrow="Demand Forecast"
        title="تقدير الطلب والتنبؤ بالمبيعات"
        description="النماذج الكيفية والكمية، واختيار الأنسب، وتقدير الطلب المتوقع، وربطه بالطاقة التشغيلية."
      />

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-6">
          <AnimatedCard delay={0.05}>
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D6B779]/15 text-[#D6B779]">
                <TrendingUp className="h-4 w-4" />
              </span>
              <h3 className="font-display text-base font-semibold text-[#F5F4F0]">
                ١. النماذج الكيفية
              </h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { t: "المقارنة التاريخية", d: "مقارنة بنمو أنظمة مشابهة في أسواق أخرى." },
                { t: "آراء الخبراء", d: "استشارة مديري فنادق ومتخصصي تقنية." },
                { t: "المشروعات المشابهة", d: "تحليل تجارب أنظمة PMS الإقليمية." },
              ].map((x, i) => (
                <motion.div
                  key={x.t}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.06 }}
                  className="rounded-xl border border-[#D6B779]/15 bg-[#101D2D]/40 p-3.5"
                >
                  <div className="text-xs font-semibold text-[#D6B779]">{x.t}</div>
                  <p className="mt-1 text-[11px] leading-relaxed text-[#F5F4F0]/60">{x.d}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedCard>

          <AnimatedCard delay={0.1}>
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D6B779]/15 text-[#D6B779]">
                <Calculator className="h-4 w-4" />
              </span>
              <h3 className="font-display text-base font-semibold text-[#F5F4F0]">
                ٢. تقدير الطلب المتوقع
              </h3>
            </div>
            <div className="rounded-xl border border-[#D6B779]/25 bg-[#D6B779]/8 p-4">
              <div className="text-[11px] font-semibold text-[#D6B779]">
                معادلة التقدير
              </div>
              <div className="mt-2 font-display text-sm text-[#F5F4F0]">
                الطلب = عدد الفنادق المحتملة × نسبة الاختراق × سعر الاشتراك
              </div>
              <div className="mt-3 grid gap-2 text-[11px] text-[#F5F4F0]/70 sm:grid-cols-3">
                <div>عدد الفنادق: 200 (افتراضي)</div>
                <div>نسبة الاختراق: 5% (افتراضي)</div>
                <div>سعر الاشتراك: 1,500 ج.م/شهر</div>
              </div>
              <div className="mt-3 border-t border-[#D6B779]/20 pt-3 text-xs font-semibold text-[#D6B779]">
                الطلب الشهري المتوقع = 200 × 0.05 × 1,500 = 15,000 ج.م
              </div>
            </div>
            <p className="mt-3 text-[10px] leading-relaxed text-[#F5F4F0]/50">
              جميع الأرقام افتراضية للتوضيح المنهجي فقط.
            </p>
          </AnimatedCard>

          <AnimatedCard delay={0.15}>
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D6B779]/15 text-[#D6B779]">
                <BarChart3 className="h-4 w-4" />
              </span>
              <h3 className="font-display text-base font-semibold text-[#F5F4F0]">
                ٣. الفجوة بين الطلب والعرض
              </h3>
            </div>
            <AnimatedLineChart
              height={170}
              points={[10, 22, 38, 55, 72, 90]}
              labels={["س1", "س2", "س3", "س4", "س5", "س6"]}
            />
            <p className="mt-3 text-[11px] leading-relaxed text-[#F5F4F0]/65">
              يظهر المنحنى استمرار الفجوة التسويقية طوال فترة استرداد الاستثمار، مما
              يدعم جدوى المشروع.
            </p>
          </AnimatedCard>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <AnimatedCard delay={0.1}>
            <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D6B779]">
              المبيعات المتوقعة (افتراضي)
            </div>
            <AnimatedBarChart
              height={150}
              data={[
                { label: "س1", value: 30, tone: "gold" },
                { label: "س2", value: 55, tone: "gold" },
                { label: "س3", value: 80, tone: "emerald" },
                { label: "س4", value: 110, tone: "emerald" },
                { label: "س5", value: 145, tone: "amber" },
              ]}
            />
          </AnimatedCard>

          <AnimatedCard delay={0.15}>
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D6B779]/15 text-[#D6B779]">
                <Server className="h-4 w-4" />
              </span>
              <h3 className="font-display text-sm font-semibold text-[#F5F4F0]">
                الطاقة التشغيلية المطلوبة
              </h3>
            </div>
            <div className="space-y-3">
              <AnimatedBar label="سيرفرات وبنية سحابية" value={70} tone="gold" />
              <AnimatedBar label="فريق تطوير وصيانة" value={85} tone="emerald" />
              <AnimatedBar label="دعم فني وتدريب" value={60} tone="amber" />
            </div>
          </AnimatedCard>

          <AnimatedCard delay={0.2}>
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D6B779]">
              شبكة الترابط التشغيلي
            </div>
            <AnimatedNetwork
              height={220}
              nodes={[
                { id: "rec", label: "الاستقبال", x: 90, y: 60 },
                { id: "hsk", label: "الإشراف الداخلي", x: 260, y: 40 },
                { id: "kit", label: "المطبخ", x: 430, y: 60 },
                { id: "inv", label: "المخازن", x: 170, y: 170 },
                { id: "adm", label: "الإدارة", x: 350, y: 170 },
              ]}
            />
          </AnimatedCard>
        </div>
      </div>
    </SlideFrame>
  );
}