import { motion } from "framer-motion";
import {
  Target,
  Users,
  Compass,
  Layers,
  DollarSign,
  Megaphone,
  MapPin,
  Package,
  Search,
  PieChart,
} from "lucide-react";
import { SlideFrame } from "@/components/SlideFrame";
import {
  SectionHeader,
  AnimatedCard,
  AnimatedBar,
  AnimatedBarChart,
  AnimatedDonut,
} from "@/components/Decorations";

const EASE = [0.22, 1, 0.36, 1] as const;

export function MarketingSlide() {
  return (
    <SlideFrame variant="amber">
      <SectionHeader
        index="٢"
        eyebrow="Marketing Study"
        title="الدراسة التسويقية"
        description="توصيف السوق والعملاء، والأبعاد الاستراتيجية، والمزيج التسويقي، والبحث التسويقي لتحليل المنافسين."
      />

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-6">
          <AnimatedCard delay={0.05}>
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D6B779]/15 text-[#D6B779]">
                <Target className="h-4 w-4" />
              </span>
              <h3 className="font-display text-base font-semibold text-[#F5F4F0]">
                ١. أهداف الدراسة التسويقية
              </h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { t: "حجم الطلب", d: "تقدير عدد الفنادق المحتملة وحجم الإنفاق على التقنية." },
                { t: "حجم المعروض", d: "حصر الأنظمة القائمة والبرامج المحلية والبدائل اليدوية." },
                { t: "الفجوة التسويقية", d: "الفنادق التي تدير التشغيل يدويًا أو بأنظمة ناقصة." },
                { t: "درجة المنافسة", d: "تحليل المنافسين المباشرين وغير المباشرين." },
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
                <Users className="h-4 w-4" />
              </span>
              <h3 className="font-display text-base font-semibold text-[#F5F4F0]">
                ٢. توصيف العملاء
              </h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-[#D6B779]/20 bg-[#101D2D]/40 p-4">
                <div className="mb-2 text-xs font-semibold text-[#D6B779]">
                  صاحب القرار (الفندق)
                </div>
                <ul className="space-y-1.5 text-[11px] leading-relaxed text-[#F5F4F0]/65">
                  <li>• مالك الفندق أو مدير التشغيل.</li>
                  <li>• يهتم بالتكلفة، والعائد، وسهولة التطبيق.</li>
                  <li>• دورة شراء أطول، وقرار جماعي.</li>
                </ul>
              </div>
              <div className="rounded-xl border border-[#D6B779]/20 bg-[#101D2D]/40 p-4">
                <div className="mb-2 text-xs font-semibold text-[#D6B779]">
                  المستخدم الفعلي (الموظف)
                </div>
                <ul className="space-y-1.5 text-[11px] leading-relaxed text-[#F5F4F0]/65">
                  <li>• الاستقبال، الإشراف الداخلي، المطبخ، المخازن.</li>
                  <li>• يهتم بسهولة الاستخدام وسرعة الإدخال.</li>
                  <li>• مقاومة للتغيير — تحتاج تدريبًا ودعمًا.</li>
                </ul>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={0.15}>
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D6B779]/15 text-[#D6B779]">
                <Compass className="h-4 w-4" />
              </span>
              <h3 className="font-display text-base font-semibold text-[#F5F4F0]">
                ٣. الأبعاد الاستراتيجية
              </h3>
            </div>
            <div className="space-y-3">
              <AnimatedBar label="استراتيجية تطوير المنتج" value={45} tone="gold" />
              <AnimatedBar label="استراتيجية المنافسة بالسعر" value={30} tone="emerald" />
              <AnimatedBar label="استراتيجية توسيع السوق" value={25} tone="amber" />
            </div>
          </AnimatedCard>

          <AnimatedCard delay={0.2}>
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D6B779]/15 text-[#D6B779]">
                <Layers className="h-4 w-4" />
              </span>
              <h3 className="font-display text-base font-semibold text-[#F5F4F0]">
                ٤. المزيج التسويقي (4Ps)
              </h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: Package, t: "المنتج", d: "نظام SaaS متكامل: إدارة غرف، مطبخ، مخزون، لوحة تحكم." },
                { icon: DollarSign, t: "السعر", d: "اشتراك شهري/سنوي حسب عدد الغرف، مع ترخيص اختياري." },
                { icon: Megaphone, t: "الترويج", d: "عرض تجريبي، محتوى تعليمي، شراكات مع جمعيات الفنادق." },
                { icon: MapPin, t: "المكان", d: "بيع مباشر، شركاء محليون، ومنصة إلكترونية." },
              ].map((x, i) => (
                <motion.div
                  key={x.t}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.25 + i * 0.06 }}
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
        </div>

        <div className="lg:col-span-4 space-y-6">
          <AnimatedCard delay={0.1}>
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D6B779]/15 text-[#D6B779]">
                <PieChart className="h-4 w-4" />
              </span>
              <h3 className="font-display text-sm font-semibold text-[#F5F4F0]">
                حصص السوق المتوقعة
              </h3>
            </div>
            <AnimatedDonut
              size={160}
              thickness={14}
              centerValue="100%"
              centerLabel="السوق"
              segments={[
                { label: "إدارة يدوية", value: 55, color: "#fb7185" },
                { label: "أنظمة ناقصة", value: 25, color: "#fbbf24" },
                { label: "أنظمة PMS", value: 15, color: "#34d399" },
                { label: "VexOra (هدف)", value: 5, color: "#D6B779" },
              ]}
            />
          </AnimatedCard>

          <AnimatedCard delay={0.15}>
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D6B779]/15 text-[#D6B779]">
                <Search className="h-4 w-4" />
              </span>
              <h3 className="font-display text-sm font-semibold text-[#F5F4F0]">
                تحليل المنافسين
              </h3>
            </div>
            <AnimatedBarChart
              height={140}
              data={[
                { label: "يدوي", value: 90, tone: "rose" },
                { label: "محلي", value: 55, tone: "amber" },
                { label: "PMS", value: 70, tone: "emerald" },
                { label: "VexOra", value: 85, tone: "gold" },
              ]}
            />
            <p className="mt-3 text-[10px] leading-relaxed text-[#F5F4F0]/50">
              مؤشر ملاءمة الحل لاحتياجات الفنادق الصغيرة والمتوسطة.
            </p>
          </AnimatedCard>
        </div>
      </div>
    </SlideFrame>
  );
}