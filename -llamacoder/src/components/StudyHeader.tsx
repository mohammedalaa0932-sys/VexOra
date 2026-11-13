import { Badge } from "@/components/ui/badge";
import { Building2, Target, Layers, GraduationCap, Users } from "lucide-react";

const stats = [
  { icon: Building2, label: "نوع النشاط", value: "خدمة برمجية SaaS" },
  { icon: Target, label: "العميل", value: "فنادق 3–4 نجوم" },
  { icon: Layers, label: "النموذج", value: "اشتراك / ترخيص" },
  { icon: GraduationCap, label: "المشرف", value: "د. عبد الغفار الأنصاري" },
];

const team = ["محمد علاء", "إسلام بدوي", "حبيبة محرم", "إيمان مصطفى", "عمر الديب"];

export function StudyHeader() {
  return (
    <header className="relative overflow-hidden border-b border-teal-900/20 bg-gradient-to-l from-teal-800 via-teal-700 to-emerald-700">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-10 h-80 w-80 rounded-full bg-teal-300/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <Badge className="mb-4 border-0 bg-emerald-400/20 text-emerald-50 hover:bg-emerald-400/20">
          مقرر: دراسات الجدوى وتقييم المشروعات
        </Badge>
        <h1 className="font-serif text-3xl font-bold leading-tight text-white lg:text-5xl">
          نظام VexOra لإدارة العمليات التشغيلية الذكية بالفنادق
        </h1>
        <p className="mt-2 text-lg font-semibold text-emerald-100">
          Smart Hotel Operations Management System
        </p>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-teal-50/90 lg:text-lg">
          تطبيق ويب متكامل يربط أقسام الفندق (الاستقبال، الإشراف الداخلي، المطبخ،
          المخازن) عبر لوحة تحكم موحّدة وتنبيهات مخزون ذكية، لتحديث حالة الغرف فور
          خروج النزيل، وتسجيل النواقص مباشرة، ومنع أي تأخير في الخدمة.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm"
            >
              <s.icon className="mb-2 h-5 w-5 text-emerald-200" />
              <div className="text-xs text-teal-100/80">{s.label}</div>
              <div className="mt-1 text-sm font-semibold text-white">{s.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-emerald-100">
            <Users className="h-4 w-4" />
            فريق العمل البحثي
          </div>
          <div className="flex flex-wrap gap-2">
            {team.map((name) => (
              <span
                key={name}
                className="rounded-full bg-emerald-400/20 px-3 py-1 text-sm text-white"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}