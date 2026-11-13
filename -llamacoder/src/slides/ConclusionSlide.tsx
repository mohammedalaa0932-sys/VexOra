import { motion } from "framer-motion";
import {
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Users,
  TrendingUp,
  Lightbulb,
} from "lucide-react";
import { SlideFrame } from "@/components/SlideFrame";
import {
  SectionHeader,
  AnimatedCard,
  AnimatedTimeline,
  AnimatedBar,
} from "@/components/Decorations";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ConclusionSlide() {
  return (
    <SlideFrame variant="emerald">
      <SectionHeader
        index="٧"
        eyebrow="Conclusion"
        title="الخلاصة والتوصية"
        description="ملخص نتائج الدراسة التسويقية، والقرار النهائي، والمخاطر الرئيسية وكيفية تقليلها."
      />

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-6">
          <AnimatedCard delay={0.05}>
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D6B779]/15 text-[#D6B779]">
                <CheckCircle2 className="h-4 w-4" />
              </span>
              <h3 className="font-display text-base font-semibold text-[#F5F4F0]">
                ١. ملخص النتائج
              </h3>
            </div>
            <ul className="space-y-2.5">
              {[
                "توجد فجوة تسويقية واضحة في إدارة العمليات الفندقية الداخلية.",
                "الطلب المتوقع يتزايد مع نمو قطاع الضيافة والتحول الرقمي.",
                "نموذج الاشتراك يوفّر دخلًا متكررًا وهامش ربح مرتفع.",
                "المنافسة محدودة في شريحة الفنادق الصغيرة والمتوسطة.",
              ].map((x, i) => (
                <motion.li
                  key={x}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, ease: EASE, delay: 0.1 + i * 0.06 }}
                  className="flex items-start gap-2.5 rounded-xl border border-[#D6B779]/15 bg-[#101D2D]/40 p-3"
                >
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D6B779]" />
                  <span className="text-[11px] leading-relaxed text-[#F5F4F0]/70">{x}</span>
                </motion.li>
              ))}
            </ul>
          </AnimatedCard>

          <AnimatedCard delay={0.1}>
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D6B779]/15 text-[#D6B779]">
                <AlertTriangle className="h-4 w-4" />
              </span>
              <h3 className="font-display text-base font-semibold text-[#F5F4F0]">
                ٣. المخاطر الرئيسية
              </h3>
            </div>
            <div className="space-y-3">
              {[
                { icon: Users, t: "مقاومة الموظفين للتغيير", d: "التقليل: واجهة بسيطة، تدريب مكثف، دعم مستمر." },
                { icon: TrendingUp, t: "المنافسة", d: "التقليل: التخصص في شريحة محددة، والتسعير المرن." },
                { icon: ShieldCheck, t: "الأمان وحماية البيانات", d: "التقليل: تشفير، نسخ احتياطي، التزام بالقوانين." },
              ].map((x, i) => (
                <motion.div
                  key={x.t}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.15 + i * 0.07 }}
                  className="flex items-start gap-3 rounded-xl border border-[#D6B779]/15 bg-[#101D2D]/40 p-3.5"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#D6B779]/15 text-[#D6B779]">
                    <x.icon className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <div className="text-xs font-semibold text-[#F5F4F0]">{x.t}</div>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-[#F5F4F0]/60">{x.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedCard>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <AnimatedCard delay={0.1}>
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D6B779] text-[#101D2D]">
                <Lightbulb className="h-4 w-4" />
              </span>
              <h3 className="font-display text-base font-semibold text-[#F5F4F0]">
                ٢. القرار
              </h3>
            </div>
            <div className="rounded-xl border border-[#D6B779]/35 bg-[#D6B779]/10 p-4">
              <div className="font-display text-lg font-bold text-[#D6B779]">
                الاستمرار في باقي الدراسات
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-[#F5F4F0]/70">
                بناءً على النتائج التسويقية الإيجابية، يُوصى بالانتقال إلى الدراسات
                الفنية والمالية والقانونية والبيئية.
              </p>
            </div>
            <div className="mt-4 space-y-3">
              <AnimatedBar label="الجدوى التسويقية" value={85} tone="emerald" />
              <AnimatedBar label="جاهزية الفريق" value={75} tone="gold" />
              <AnimatedBar label="ملاءمة السوق" value={80} tone="amber" />
            </div>
          </AnimatedCard>

          <AnimatedCard delay={0.15}>
            <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D6B779]">
              الخطوات التالية
            </div>
            <AnimatedTimeline
              steps={[
                { title: "الدراسة الفنية", description: "المتطلبات التقنية، البنية السحابية، فريق التطوير." },
                { title: "الدراسة المالية", description: "التكاليف، الإيرادات، فترة الاسترداد، معدل العائد." },
                { title: "الدراسة القانونية", description: "التراخيص، العقود، حماية البيانات." },
                { title: "الدراسة البيئية", description: "الأثر البيئي والاجتماعي للمشروع." },
              ]}
            />
          </AnimatedCard>
        </div>
      </div>
    </SlideFrame>
  );
}