import { motion } from "framer-motion";
import {
  Target,
  Users,
  TrendingUp,
  Leaf,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";
import { SlideFrame } from "@/components/SlideFrame";
import {
  SectionHeader,
  AnimatedCard,
  AnimatedTimeline,
  AnimatedDonut,
  FloatingOrbs,
} from "@/components/Decorations";

const EASE = [0.22, 1, 0.36, 1] as const;

export function IntroSlide() {
  return (
    <SlideFrame variant="emerald">
      <SectionHeader
        index="١"
        eyebrow="Introduction"
        title="مدخل وتمهيد"
        description="تعريف بدراسة الجدوى وأهميتها، وأهدافها، والإجابة عن الأسئلة الجوهرية الثلاثة قبل الانتقال إلى الدراسة التسويقية التفصيلية."
      />

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-6">
          <AnimatedCard delay={0.05}>
            <div className="mb-3 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D6B779]/15 text-[#D6B779]">
                <Lightbulb className="h-4 w-4" />
              </span>
              <h3 className="font-display text-base font-semibold text-[#F5F4F0]">
                ١. مفهوم دراسة الجدوى
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-[#F5F4F0]/70">
              دراسة الجدوى هي مجموعة الدراسات العلمية المنظمة التي تُجرى قبل تنفيذ
              المشروع، لتحديد مدى قابليته للتنفيذ وتحقيقه لعائد اقتصادي مجزٍ، مع
              المفاضلة بين البدائل المتاحة. وفي مشروع VexOra — وهو نظام برمجي لإدارة
              العمليات الفندقية — تُعدّ الجدوى التسويقية حجر الأساس، لأن نجاح المشروع
              يعتمد على وجود طلب حقيقي من الفنادق على هذا النوع من الأنظمة.
            </p>
          </AnimatedCard>

          <AnimatedCard delay={0.1}>
            <div className="mb-3 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D6B779]/15 text-[#D6B779]">
                <Target className="h-4 w-4" />
              </span>
              <h3 className="font-display text-base font-semibold text-[#F5F4F0]">
                ٢. أهمية المشروع
              </h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: TrendingUp, t: "للمستثمر", d: "عائد متكرر عبر الاشتراكات، وتوسع جغرافي منخفض التكلفة." },
                { icon: Users, t: "للمجتمع", d: "فرص عمل تقنية، ورفع كفاءة قطاع الضيافة." },
                { icon: Leaf, t: "للموارد", d: "تقليل الهدر في المستلزمات عبر تنبيهات المخزون." },
                { icon: ShieldCheck, t: "للاستدامة", d: "رقمنة العمليات تدعم التنمية المستدامة للقطاع." },
              ].map((x, i) => (
                <motion.div
                  key={x.t}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.15 + i * 0.06 }}
                  className="rounded-xl border border-[#D6B779]/15 bg-[#101D2D]/40 p-3.5"
                >
                  <div className="mb-1.5 flex items-center gap-2">
                    <x.icon className="h-3.5 w-3.5 text-[#D6B779]" />
                    <span className="text-xs font-semibold text-[#F5F4F0]">{x.t}</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-[#F5F4F0]/60">{x.d}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedCard>

          <AnimatedCard delay={0.15}>
            <div className="mb-3 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D6B779]/15 text-[#D6B779]">
                <CheckCircle2 className="h-4 w-4" />
              </span>
              <h3 className="font-display text-base font-semibold text-[#F5F4F0]">
                ٣. أهداف دراسة الجدوى
              </h3>
            </div>
            <AnimatedTimeline
              steps={[
                { title: "تحديد الفرص البديلة", description: "المفاضلة بين بناء نظام كامل، أو تطوير وحدات تدريجية، أو الشراكة مع مزوّد قائم." },
                { title: "قياس الأثر الاقتصادي", description: "تقدير العائد المتوقع من الاشتراكات مقابل تكاليف التطوير والتشغيل." },
                { title: "رسم الخطط التوسعية", description: "التوسع من فنادق 3 نجوم إلى 4 و5 نجوم، ومن محافظة إلى أخرى." },
              ]}
            />
          </AnimatedCard>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <AnimatedCard delay={0.1}>
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D6B779]/15 text-[#D6B779]">
                <HelpCircle className="h-4 w-4" />
              </span>
              <h3 className="font-display text-base font-semibold text-[#F5F4F0]">
                ٤. الأسئلة الجوهرية الثلاثة
              </h3>
            </div>
            <div className="space-y-3">
              {[
                { q: "هل توجد فجوة تسويقية؟", a: "نعم — نسبة كبيرة من الفنادق الصغيرة والمتوسطة تدير التشغيل الداخلي يدويًا." },
                { q: "هل نملك مقومات البدء؟", a: "نعم — فريق تطوير، وفهم عميق لاحتياجات القطاع، وتكلفة دخول منخفضة." },
                { q: "هل الأرباح مجزية؟", a: "نعم — نموذج الاشتراك يوفّر دخلًا متكررًا وهامش ربح مرتفع." },
              ].map((x, i) => (
                <motion.div
                  key={x.q}
                  initial={{ opacity: 0, x: 14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.2 + i * 0.1 }}
                  className="rounded-xl border border-[#D6B779]/20 bg-[#101D2D]/40 p-3.5"
                >
                  <div className="text-xs font-semibold text-[#D6B779]">{x.q}</div>
                  <p className="mt-1 text-[11px] leading-relaxed text-[#F5F4F0]/65">{x.a}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedCard>

          <AnimatedCard delay={0.2}>
            <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D6B779]">
              توزيع أهمية المشروع
            </div>
            <AnimatedDonut
              size={170}
              thickness={16}
              centerValue="100%"
              centerLabel="قيمة مضافة"
              segments={[
                { label: "كفاءة تشغيلية", value: 40, color: "#D6B779" },
                { label: "تقليل الأخطاء", value: 30, color: "#34d399" },
                { label: "رضا النزلاء", value: 20, color: "#fbbf24" },
                { label: "توفير التكاليف", value: 10, color: "#fb7185" },
              ]}
            />
          </AnimatedCard>
        </div>
      </div>

      <FloatingOrbs count={4} />
    </SlideFrame>
  );
}