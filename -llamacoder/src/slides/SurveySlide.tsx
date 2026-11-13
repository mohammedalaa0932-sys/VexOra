import { motion } from "framer-motion";
import {
  ClipboardList,
  Users,
  Send,
  FileBarChart,
  CheckCircle2,
} from "lucide-react";
import { SlideFrame } from "@/components/SlideFrame";
import {
  SectionHeader,
  AnimatedCard,
  AnimatedBar,
} from "@/components/Decorations";

const EASE = [0.22, 1, 0.36, 1] as const;

const MANAGER_QS = [
  "كم عدد الغرف في الفندق؟ (فئات: أقل من 30 / 30–60 / 60–100 / أكثر من 100)",
  "ما تصنيف الفندق؟ (3 نجوم / 4 نجوم / 5 نجوم)",
  "كيف تديرون حاليًا العمليات التشغيلية الداخلية؟ (ورق / واتساب / نظام / مختلط)",
  "هل تواجهون تأخيرًا في تلبية طلبات النزلاء؟ (نعم / لا — لو لا، ما السبب؟)",
  "هل تعانون من هدر أو نقص في مستلزمات الأقسام؟ (نعم / لا)",
  "ما أهم مشكلة تشغيلية تواجهكم حاليًا؟ (سؤال مفتوح قصير)",
  "هل تستخدمون أي نظام إلكتروني لإدارة الغرف أو المخزون؟ (نعم / لا)",
  "ما مدى رضاكم عن النظام الحالي؟ (مقياس ليكرت 1–5)",
  "هل أنتم مستعدون لتجربة نظام جديد؟ (نعم / لا / ربما)",
  "ما الميزانية الشهرية المتوقعة للتقنية؟ (فئات)",
  "ما أهم ميزة تبحثون عنها في النظام؟ (اختيار من متعدد)",
  "هل تفضلون الاشتراك الشهري أم الترخيص لمرة واحدة؟",
];

const STAFF_QS = [
  "ما القسم الذي تعمل به؟ (استقبال / إشراف داخلي / مطبخ / مخازن)",
  "كم سنة خبرة لديك في العمل الفندقي؟ (فئات)",
  "كيف تسجل النواقص حاليًا؟ (ورق / واتساب / مكالمة / نظام)",
  "كم يستغرق إبلاغ المخزن بالنواقص؟ (فئات زمنية)",
  "هل تصل الطلبات دائمًا في الوقت المناسب؟ (نعم / لا)",
  "هل تجد صعوبة في استخدام الأنظمة الإلكترونية؟ (مقياس ليكرت 1–5)",
  "ما أكثر ما يزعجك في الطريقة الحالية؟ (سؤال مفتوح قصير)",
  "هل تعتقد أن نظامًا إلكترونيًا سيسهّل عملك؟ (نعم / لا / ربما)",
  "هل تحتاج تدريبًا لاستخدام نظام جديد؟ (نعم / لا)",
  "ما الجهاز الذي تفضل استخدامه؟ (كمبيوتر / جوال / تابلت)",
];

export function SurveySlide() {
  return (
    <SlideFrame variant="amber">
      <SectionHeader
        index="٥"
        eyebrow="Survey Design"
        title="الاستبيان وتحديد الفجوة التسويقية"
        description="استبيانان قصيران: أحدهما لمديري وأصحاب الفنادق، والآخر لموظفي الأقسام — مع تحديد حجم العينة وطريقة النشر."
      />

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <AnimatedCard delay={0.05}>
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D6B779]/15 text-[#D6B779]">
                <Users className="h-4 w-4" />
              </span>
              <h3 className="font-display text-base font-semibold text-[#F5F4F0]">
                استبيان مديري وأصحاب الفنادق
              </h3>
            </div>
            <ol className="space-y-2">
              {MANAGER_QS.map((q, i) => (
                <motion.li
                  key={q}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: EASE, delay: 0.1 + i * 0.04 }}
                  className="flex items-start gap-2.5 rounded-lg border border-[#D6B779]/12 bg-[#101D2D]/40 p-2.5"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#D6B779]/15 text-[9px] font-bold text-[#D6B779]">
                    {i + 1}
                  </span>
                  <span className="text-[11px] leading-relaxed text-[#F5F4F0]/70">{q}</span>
                </motion.li>
              ))}
            </ol>
          </AnimatedCard>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <AnimatedCard delay={0.1}>
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D6B779]/15 text-[#D6B779]">
                <ClipboardList className="h-4 w-4" />
              </span>
              <h3 className="font-display text-base font-semibold text-[#F5F4F0]">
                استبيان موظفي الأقسام
              </h3>
            </div>
            <ol className="space-y-2">
              {STAFF_QS.map((q, i) => (
                <motion.li
                  key={q}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: EASE, delay: 0.15 + i * 0.04 }}
                  className="flex items-start gap-2.5 rounded-lg border border-[#D6B779]/12 bg-[#101D2D]/40 p-2.5"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#D6B779]/15 text-[9px] font-bold text-[#D6B779]">
                    {i + 1}
                  </span>
                  <span className="text-[11px] leading-relaxed text-[#F5F4F0]/70">{q}</span>
                </motion.li>
              ))}
            </ol>
          </AnimatedCard>

          <AnimatedCard delay={0.15}>
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D6B779]/15 text-[#D6B779]">
                <Send className="h-4 w-4" />
              </span>
              <h3 className="font-display text-base font-semibold text-[#F5F4F0]">
                حجم العينة والنشر
              </h3>
            </div>
            <div className="space-y-3">
              <AnimatedBar label="مديرون (هدف)" value={40} max={60} tone="gold" />
              <AnimatedBar label="موظفون (هدف)" value={120} max={200} tone="emerald" />
            </div>
            <div className="mt-4 space-y-2 text-[11px] leading-relaxed text-[#F5F4F0]/65">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D6B779]" />
                <span>النشر: إلكتروني عبر نماذج Google Forms + زيارات ميدانية.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D6B779]" />
                <span>التوزيع: عبر جمعيات الفنادق، وروابط مباشرة، وشراكات محلية.</span>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={0.2}>
            <div className="mb-3 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D6B779]/15 text-[#D6B779]">
                <FileBarChart className="h-4 w-4" />
              </span>
              <h3 className="font-display text-base font-semibold text-[#F5F4F0]">
                شكل تقرير النتائج
              </h3>
            </div>
            <ul className="space-y-1.5 text-[11px] leading-relaxed text-[#F5F4F0]/65">
              <li>• الهدف من الاستبيان.</li>
              <li>• الفئة المستهدفة.</li>
              <li>• حجم العينة المخطط والفعلي.</li>
              <li>• تصنيف البيانات (كمية / وصفية).</li>
              <li>• التحليل والاستنتاجات.</li>
            </ul>
          </AnimatedCard>
        </div>
      </div>
    </SlideFrame>
  );
}