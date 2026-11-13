import { motion } from "framer-motion";
import {
  Users,
  Search,
  ClipboardList,
  Eye,
  BookOpen,
  ShieldCheck,
} from "lucide-react";
import { SlideFrame } from "@/components/SlideFrame";
import {
  SectionHeader,
  AnimatedCard,
  AnimatedBar,
} from "@/components/Decorations";

const EASE = [0.22, 1, 0.36, 1] as const;

export function SampleSlide() {
  return (
    <SlideFrame variant="emerald">
      <SectionHeader
        index="٤"
        eyebrow="Study Population"
        title="مجتمع الدراسة ومصادر البيانات"
        description="تحديد مجتمع الدراسة، والمفاضلة بين الحصر الشامل والمعاينة، ومصادر البيانات الثانوية والأولية."
      />

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-6 space-y-6">
          <AnimatedCard delay={0.05}>
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D6B779]/15 text-[#D6B779]">
                <Users className="h-4 w-4" />
              </span>
              <h3 className="font-display text-base font-semibold text-[#F5F4F0]">
                ١. مجتمع الدراسة
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-[#F5F4F0]/70">
              يتمثل مجتمع الدراسة في الفنادق الصغيرة والمتوسطة (3 و4 نجوم) داخل النطاق
              الجغرافي المستهدف، مع التركيز على فئتين: أصحاب القرار (الملاك والمديرون)،
              والمستخدمين الفعليين (موظفو الأقسام).
            </p>
            <div className="mt-4 space-y-3">
              <AnimatedBar label="فنادق 3 نجوم" value={65} tone="gold" />
              <AnimatedBar label="فنادق 4 نجوم" value={35} tone="emerald" />
            </div>
          </AnimatedCard>

          <AnimatedCard delay={0.1}>
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D6B779]/15 text-[#D6B779]">
                <Search className="h-4 w-4" />
              </span>
              <h3 className="font-display text-base font-semibold text-[#F5F4F0]">
                ٢. الحصر الشامل أم المعاينة؟
              </h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-[#D6B779]/20 bg-[#101D2D]/40 p-3.5">
                <div className="text-xs font-semibold text-[#D6B779]">الحصر الشامل</div>
                <p className="mt-1 text-[11px] leading-relaxed text-[#F5F4F0]/60">
                  دقة أعلى، لكنه مكلف ويستغرق وقتًا طويلًا.
                </p>
              </div>
              <div className="rounded-xl border border-[#D6B779]/30 bg-[#D6B779]/8 p-3.5">
                <div className="text-xs font-semibold text-[#D6B779]">المعاينة بالعينة ✓</div>
                <p className="mt-1 text-[11px] leading-relaxed text-[#F5F4F0]/70">
                  الأنسب هنا — عدد الفنادق محدود، والتكلفة أقل، والنتائج قابلة للتعميم.
                </p>
              </div>
            </div>
          </AnimatedCard>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <AnimatedCard delay={0.1}>
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D6B779]/15 text-[#D6B779]">
                <BookOpen className="h-4 w-4" />
              </span>
              <h3 className="font-display text-base font-semibold text-[#F5F4F0]">
                ٣. المصادر الثانوية (غير الميدانية)
              </h3>
            </div>
            <ul className="space-y-2.5">
              {[
                "تقارير وزارة السياحة والآثار.",
                "إحصاءات الجهاز المركزي للتعبئة العامة والإحصاء.",
                "دراسات قطاع الضيافة والمنشورات الأكاديمية.",
                "تقارير شركات أنظمة إدارة الفنادق العالمية.",
              ].map((x, i) => (
                <motion.li
                  key={x}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, ease: EASE, delay: 0.15 + i * 0.06 }}
                  className="flex items-start gap-2.5 rounded-xl border border-[#D6B779]/15 bg-[#101D2D]/40 p-3"
                >
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D6B779]" />
                  <span className="text-[11px] leading-relaxed text-[#F5F4F0]/70">{x}</span>
                </motion.li>
              ))}
            </ul>
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-[#D6B779]/25 bg-[#D6B779]/8 p-3">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D6B779]" />
              <p className="text-[10px] leading-relaxed text-[#F5F4F0]/70">
                يجب مراعاة عدم التحيز، والصدق، والثبات عند جمع البيانات الثانوية.
              </p>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={0.15}>
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D6B779]/15 text-[#D6B779]">
                <ClipboardList className="h-4 w-4" />
              </span>
              <h3 className="font-display text-base font-semibold text-[#F5F4F0]">
                ٤. المصادر الأولية (الميدانية)
              </h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-[#D6B779]/20 bg-[#101D2D]/40 p-3.5">
                <div className="mb-1.5 flex items-center gap-2">
                  <ClipboardList className="h-3.5 w-3.5 text-[#D6B779]" />
                  <span className="text-xs font-semibold text-[#F5F4F0]">الاستقصاء</span>
                </div>
                <p className="text-[11px] leading-relaxed text-[#F5F4F0]/60">
                  استبيانان: أحدهما للمديرين والآخر للموظفين.
                </p>
              </div>
              <div className="rounded-xl border border-[#D6B779]/20 bg-[#101D2D]/40 p-3.5">
                <div className="mb-1.5 flex items-center gap-2">
                  <Eye className="h-3.5 w-3.5 text-[#D6B779]" />
                  <span className="text-xs font-semibold text-[#F5F4F0]">الملاحظة</span>
                </div>
                <p className="text-[11px] leading-relaxed text-[#F5F4F0]/60">
                  مباشرة داخل الفندق، وغير مباشرة عبر تحليل السجلات.
                </p>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </SlideFrame>
  );
}