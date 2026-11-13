import { useState } from "react";
import { PageHeader, Panel, StatCard, DataTable } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Target,
  Users,
  Megaphone,
  Database,
  ClipboardCheck,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  FileText,
  Building2,
  Wallet,
  ShieldCheck,
  Layers,
  ArrowLeft,
} from "lucide-react";

type SectionId =
  | "intro"
  | "marketing"
  | "data"
  | "population"
  | "survey"
  | "demand"
  | "conclusion";

const sections: { id: SectionId; label: string; icon: typeof BookOpen }[] = [
  { id: "intro", label: "المدخل والتمهيد", icon: BookOpen },
  { id: "marketing", label: "الدراسة التسويقية", icon: Megaphone },
  { id: "data", label: "البيانات الأساسية", icon: Database },
  { id: "population", label: "مجتمع الدراسة", icon: Users },
  { id: "survey", label: "الاستبيان والفجوة", icon: ClipboardCheck },
  { id: "demand", label: "تقدير الطلب", icon: TrendingUp },
  { id: "conclusion", label: "الخلاصة والتوصية", icon: Target },
];

export function FeasibilityPage() {
  const [active, setActive] = useState<SectionId>("intro");

  return (
    <div>
      <PageHeader
        eyebrow="دراسة الجدوى التسويقية"
        title="دراسة جدوى مشروع VexOra"
        subtitle="دراسة جدوى تسويقية متكاملة لمنصة إدارة العمليات التشغيلية داخل الفنادق، وفق المنهج الأكاديمي لمقرر دراسات الجدوى وتقييم المشروعات."
        actions={
          <Button variant="outline" onClick={() => setActive("conclusion")}>
            الانتقال إلى التوصية <ArrowLeft className="mr-2 h-4 w-4" />
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="نوع النشاط" value="SaaS" hint="خدمة برمجية بالاشتراك" icon={Layers} tone="brand" />
        <StatCard label="السوق المستهدف" value="فنادق 3-4 نجوم" hint="صغيرة ومتوسطة" icon={Building2} tone="indigo" />
        <StatCard label="نموذج الإيراد" value="اشتراك شهري" hint="حسب عدد الغرف" icon={Wallet} tone="amber" />
        <StatCard label="نطاق الدراسة" value="تسويقي" hint="قبل الفنية والمالية" icon={FileText} tone="slate" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <Panel title="فهرس الدراسة" hint="اضغط للانتقال بين الأقسام" bodyClassName="p-3">
            <nav className="flex flex-col gap-1">
              {sections.map((s, idx) => {
                const isActive = active === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActive(s.id)}
                    className={cn(
                      "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-right text-sm transition-all",
                      isActive
                        ? "bg-teal-50 font-semibold text-teal-700 shadow-[inset_0_0_0_1px_rgba(13,148,136,0.15)]"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold",
                        isActive ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-500"
                      )}
                    >
                      {idx + 1}
                    </span>
                    <span className="flex-1">{s.label}</span>
                    <s.icon className="h-4 w-4 opacity-60" />
                  </button>
                );
              })}
            </nav>
          </Panel>
        </aside>

        <div className="lg:col-span-3">
          {active === "intro" && <IntroSection />}
          {active === "marketing" && <MarketingSection />}
          {active === "data" && <DataSection />}
          {active === "population" && <PopulationSection />}
          {active === "survey" && <SurveySection />}
          {active === "demand" && <DemandSection />}
          {active === "conclusion" && <ConclusionSection />}
        </div>
      </div>
    </div>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return <div className="space-y-4 text-sm leading-relaxed text-slate-600">{children}</div>;
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="font-display text-base font-semibold text-slate-900">{children}</h3>;
}

function Note({ children, tone = "brand" }: { children: React.ReactNode; tone?: "brand" | "amber" }) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4 text-xs leading-relaxed",
        tone === "brand"
          ? "border-teal-100 bg-teal-50/60 text-teal-800"
          : "border-amber-100 bg-amber-50/70 text-amber-800"
      )}
    >
      {children}
    </div>
  );
}

function IntroSection() {
  return (
    <div className="space-y-6">
      <Panel title="أولاً: مدخل وتمهيد" hint="تعريف الدراسة وموقعها من قرار الاستثمار">
        <Prose>
          <H3>1. مفهوم دراسة الجدوى ومدى قابلية المشروع للتنفيذ</H3>
          <p>
            دراسة الجدوى هي مجموعة الدراسات المنظمة التي تهدف إلى التحقق من مدى قابلية فكرة
            المشروع للتنفيذ من الناحية التسويقية والفنية والمالية والقانونية والبيئية، قبل
            الالتزام باستثمار الموارد. وفي حالة مشروع <strong>VexOra</strong> — وهو تطبيق ويب
            لإدارة العمليات التشغيلية داخل الفنادق — فإن السؤال المحوري هو: هل توجد فجوة تسويقية
            حقيقية يمكن للمشروع أن يخدمها، وهل يمكن تحويل هذه الفجوة إلى إيراد مستدام؟
          </p>
          <p>
            من منظور مبدئي، المشروع <strong>قابل للتنفيذ</strong> لأن طبيعته برمجية (SaaS)، أي
            أن تكلفته الحدية لكل عميل إضافي منخفضة، ولا يحتاج إلى أصول مادية ثقيلة، ويمكن
            إطلاقه بنسخة أولى (MVP) ثم التوسع تدريجيًا. لكن الجدوى الاقتصادية النهائية تتوقف
            على نتائج الدراسة التسويقية التي نعرضها في هذه الصفحة.
          </p>

          <H3>2. أهمية المشروع للمستثمر وللمجتمع</H3>
          <ul className="list-inside list-disc space-y-1.5 pr-4">
            <li><strong>للمستثمر:</strong> نموذج إيراد متكرر (اشتراك شهري/سنوي)، هامش ربح مرتفع، وقابلية توسع جغرافي دون تكاليف تشغيلية موازية.</li>
            <li><strong>للفندق:</strong> تقليل الأخطاء التشغيلية، تسريع الاستجابة للنزيل، وضبط المخزون ومنع الهدر.</li>
            <li><strong>للمجتمع:</strong> الاستخدام الأمثل للموارد، خلق فرص عمل في مجالات البرمجة والدعم الفني، ورفع إنتاجية قطاع الضيافة، بما يدعم التنمية المستدامة.</li>
          </ul>

          <H3>3. أهداف دراسة الجدوى</H3>
          <ul className="list-inside list-disc space-y-1.5 pr-4">
            <li>تقييم الفرص البديلة أمام المستثمر ومقارنتها بفكرة VexOra.</li>
            <li>قياس الأثر الاقتصادي المتوقع على الفندق والمجتمع.</li>
            <li>رسم خطة توسعية مرحلية (مدينة → محافظة → إقليم).</li>
          </ul>

          <H3>4. الإجابة عن الأسئلة الثلاثة المحورية</H3>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { q: "هل توجد فجوة تسويقية؟", a: "نعم — نسبة كبيرة من الفنادق الصغيرة والمتوسطة تدير التشغيل الداخلي يدويًا أو بأنظمة ناقصة." },
              { q: "هل نملك المقومات للبدء؟", a: "نعم — فريق تطوير، منتج MVP، ونموذج تسعير واضح، مع إمكانية البدء بعملاء تجريبيين." },
              { q: "هل سيحقق أرباحًا مجزية؟", a: "مرجّح — بشرط اختراق 15–25% من السوق المستهدف خلال 3 سنوات بهامش تشغيلي مرتفع." },
            ].map((item) => (
              <div key={item.q} className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-teal-700">
                  <Lightbulb className="h-3.5 w-3.5" /> {item.q}
                </div>
                <p className="text-xs leading-relaxed text-slate-600">{item.a}</p>
              </div>
            ))}
          </div>
        </Prose>
      </Panel>
    </div>
  );
}

function MarketingSection() {
  return (
    <div className="space-y-6">
      <Panel title="ثانيًا: الدراسة التسويقية" hint="توصيف السوق والعملاء والمزيج التسويقي">
        <Prose>
          <H3>1. أهداف الدراسة التسويقية</H3>
          <ul className="list-inside list-disc space-y-1.5 pr-4">
            <li>توصيف السوق الفعلي والمتوقع: حجم الطلب، حجم المعروض، الفجوة، القوة الشرائية، درجة المنافسة.</li>
            <li>تحديد المنتجات البديلة (الأنظمة الجاهزة، البرامج المحلية، الإدارة اليدوية) والمكملة (أجهزة الاستقبال، خدمات الدعم) وأسعارها.</li>
          </ul>

          <H3>2. توصيف العملاء</H3>
          <p>
            العملاء هنا فئتان: <strong>المستهلك</strong> (الفندق — صاحب القرار الشرائي) و
            <strong>المستخدم</strong> (موظف الاستقبال، الإشراف الداخلي، المطبخ، المخزن). لكل فئة
            احتياجات مختلفة: الفندق يبحث عن تقليل التكلفة وتحسين الجودة، والموظف يبحث عن سهولة
            الاستخدام وسرعة إنجاز المهمة.
          </p>
          <DataTable headers={["الفئة", "الدافع الأساسي", "المقياس الحاسم", "معدل الاستخدام المتوقع"]}>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-900">مالك / مدير الفندق</td>
              <td className="px-4 py-3 text-slate-600">خفض الهدر وتحسين تجربة النزيل</td>
              <td className="px-4 py-3 text-slate-600">العائد على الاستثمار</td>
              <td className="px-4 py-3 text-slate-600">يوميًا (لوحة التحكم)</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-900">موظف الاستقبال</td>
              <td className="px-4 py-3 text-slate-600">سرعة تسجيل المغادرة</td>
              <td className="px-4 py-3 text-slate-600">عدد النقرات لكل عملية</td>
              <td className="px-4 py-3 text-slate-600">عدة مرات يوميًا</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-900">فريق الإشراف الداخلي</td>
              <td className="px-4 py-3 text-slate-600">وضوح مهام التنظيف</td>
              <td className="px-4 py-3 text-slate-600">زمن إنجاز الغرفة</td>
              <td className="px-4 py-3 text-slate-600">طوال الوردية</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-900">المطبخ / المخزن</td>
              <td className="px-4 py-3 text-slate-600">منع نفاد المواد</td>
              <td className="px-4 py-3 text-slate-600">دقة التنبيهات</td>
              <td className="px-4 py-3 text-slate-600">عند الحاجة</td>
            </tr>
          </DataTable>

          <H3>3. الأبعاد الاستراتيجية للتسويق</H3>
          <ul className="list-inside list-disc space-y-1.5 pr-4">
            <li><strong>الفئات المستهدفة:</strong> فنادق 3 و4 نجوم، من 30 إلى 150 غرفة، في المدن السياحية الكبرى.</li>
            <li><strong>أهداف التسويق:</strong> الوصول إلى 40 فندقًا مشتركًا خلال السنة الأولى، ومعدل استبقاء أعلى من 85%.</li>
            <li><strong>الاستراتيجية:</strong> استراتيجية <em>تطوير منتج</em> (Product Development) مدعومة بـ<em>توسيع سوق</em> تدريجي، لأن السوق يحتوي على بدائل لكنها ناقصة في التخصص التشغيلي.</li>
          </ul>

          <H3>4. المزيج التسويقي (4Ps)</H3>
          <DataTable headers={["العنصر", "الوصف", "السياسة المقترحة"]}>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-900">المنتج</td>
              <td className="px-4 py-3 text-slate-600">منصة ويب لإدارة العمليات التشغيلية</td>
              <td className="px-4 py-3 text-slate-600">وحدات: غرف، إشراف داخلي، مطبخ، مخزون، تنبيهات، لوحة إدارة</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-900">السعر</td>
              <td className="px-4 py-3 text-slate-600">اشتراك شهري/سنوي حسب عدد الغرف</td>
              <td className="px-4 py-3 text-slate-600">3 شرائح: أساسي / احترافي / مؤسسي</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-900">الترويج</td>
              <td className="px-4 py-3 text-slate-600">بيع مباشر + شراكات + محتوى</td>
              <td className="px-4 py-3 text-slate-600">عروض تجريبية 30 يومًا، ندوات قطاع الضيافة، دراسات حالة</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-900">المكان</td>
              <td className="px-4 py-3 text-slate-600">قنوات التوزيع الرقمية</td>
              <td className="px-4 py-3 text-slate-600">موقع مباشر، شركاء تكامل، مندوبو مبيعات ميدانيون</td>
            </tr>
          </DataTable>

          <H3>5. البحث التسويقي</H3>
          <ul className="list-inside list-disc space-y-1.5 pr-4">
            <li>هيكل السوق: مجزأ (Fragmented) مع غياب لاعب مهيمن في شريحة الفنادق الصغيرة والمتوسطة.</li>
            <li>تجزئة العملاء: حسب الحجم (30–60 / 60–100 / 100+ غرفة) وحسب الموقع الجغرافي.</li>
            <li>تحليل المنافسين ونواياهم: الأنظمة الجاهزة تتجه إلى التكامل الشامل، والبرامج المحلية تتجه إلى التخصص، والمنافس غير المباشر (الورق والواتساب) يبقى الأقوى بسبب انعدام التكلفة الظاهرة.</li>
          </ul>
        </Prose>
      </Panel>

      <Panel title="مقارنة المنافسين" hint="الميزات والسعر — أرقام تقديرية للتوضيح">
        <DataTable headers={["المنافس", "النوع", "الميزات القوية", "نقاط الضعف", "السعر التقديري"]}>
          <tr>
            <td className="px-4 py-3 font-medium text-slate-900">أنظمة PMS العالمية</td>
            <td className="px-4 py-3 text-slate-600">مباشر</td>
            <td className="px-4 py-3 text-slate-600">تكامل شامل، سمعة قوية</td>
            <td className="px-4 py-3 text-slate-600">تكلفة مرتفعة، تعقيد، دعم غير محلي</td>
            <td className="px-4 py-3 text-slate-600">50–200 دولار/غرفة/سنة</td>
          </tr>
          <tr>
            <td className="px-4 py-3 font-medium text-slate-900">برامج محلية</td>
            <td className="px-4 py-3 text-slate-600">مباشر</td>
            <td className="px-4 py-3 text-slate-600">سعر أقل، دعم محلي</td>
            <td className="px-4 py-3 text-slate-600">وحدات ناقصة، تجربة استخدام ضعيفة</td>
            <td className="px-4 py-3 text-slate-600">5,000–20,000 ج.م/سنة</td>
          </tr>
          <tr>
            <td className="px-4 py-3 font-medium text-slate-900">الإدارة اليدوية (ورق/واتساب)</td>
            <td className="px-4 py-3 text-slate-600">غير مباشر</td>
            <td className="px-4 py-3 text-slate-600">صفر تكلفة ظاهرة</td>
            <td className="px-4 py-3 text-slate-600">أخطاء، تأخير، هدر مخزون</td>
            <td className="px-4 py-3 text-slate-600">تكلفة خفية مرتفعة</td>
          </tr>
          <tr className="bg-teal-50/40">
            <td className="px-4 py-3 font-semibold text-teal-800">VexOra</td>
            <td className="px-4 py-3 text-teal-700">مباشر</td>
            <td className="px-4 py-3 text-teal-700">تخصص تشغيلي، RTL عربي، تنبيهات ذكية</td>
            <td className="px-4 py-3 text-teal-700">علامة جديدة، تحتاج بناء ثقة</td>
            <td className="px-4 py-3 text-teal-700">اشتراك مرن حسب الحجم</td>
          </tr>
        </DataTable>
        <div className="mt-4">
          <Note tone="amber">
            الأرقام أعلاه تقديرية لأغراض المقارنة. يجب التحقق منها ميدانيًا من عروض أسعار
            المنافسين ومن تقارير قطاع الضيافة.
          </Note>
        </div>
      </Panel>
    </div>
  );
}

function DataSection() {
  return (
    <div className="space-y-6">
      <Panel title="ثالثًا: البيانات الأساسية لدراسة السوق" hint="البيانات المطلوبة ومصادرها المقترحة">
        <Prose>
          <p>
            تعتمد الدراسة التسويقية على بيانات أساسية يجب جمعها من مصادر موثوقة. الجدول التالي
            يوضح نوع البيانات المطلوبة والمصادر المقترحة للحصول عليها.
          </p>
        </Prose>
        <div className="mt-4">
          <DataTable headers={["نوع البيانات", "التفاصيل المطلوبة", "المصدر المقترح"]}>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-900">عدد الفنادق والغرف</td>
              <td className="px-4 py-3 text-slate-600">عدد المنشآت الفندقية وتصنيفها وعدد الغرف</td>
              <td className="px-4 py-3 text-slate-600">وزارة السياحة، الجهاز المركزي للتعبئة العامة والإحصاء</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-900">نمو القطاع السياحي</td>
              <td className="px-4 py-3 text-slate-600">معدلات الإشغال، أعداد الليالي السياحية</td>
              <td className="px-4 py-3 text-slate-600">تقارير غرفة الفنادق، تقارير منظمة السياحة العالمية</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-900">الدخل وإنفاق التقنية</td>
              <td className="px-4 py-3 text-slate-600">متوسط إنفاق الفندق على الأنظمة والتقنية</td>
              <td className="px-4 py-3 text-slate-600">دراسات قطاع الضيافة، تقارير شركات التقنية</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-900">النشاط التجاري</td>
              <td className="px-4 py-3 text-slate-600">عدد المنافسين وتوزيعهم الجغرافي</td>
              <td className="px-4 py-3 text-slate-600">مسح ميداني، أدلة الأعمال، مواقع المنافسين</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-900">سلوك العميل</td>
              <td className="px-4 py-3 text-slate-600">دوافع الشراء، تفضيل المحلي أو المستورد</td>
              <td className="px-4 py-3 text-slate-600">الاستبيان الميداني، المقابلات مع مديري التشغيل</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-900">سياسات الحكومة</td>
              <td className="px-4 py-3 text-slate-600">الضرائب، الترخيص، حماية البيانات</td>
              <td className="px-4 py-3 text-slate-600">قانون حماية البيانات الشخصية، اللوائح الضريبية</td>
            </tr>
          </DataTable>
        </div>
        <div className="mt-4">
          <Note tone="amber">
            لم يتم اختراع أي إحصائية في هذه الدراسة. الأرقام المذكورة في الأقسام التالية افتراضية
            بوضوح، ويجب استبدالها ببيانات حقيقية من المصادر أعلاه.
          </Note>
        </div>
      </Panel>
    </div>
  );
}

function PopulationSection() {
  return (
    <div className="space-y-6">
      <Panel title="رابعًا: مجتمع الدراسة ومصادر البيانات" hint="الحصر الشامل مقابل المعاينة بالعينة">
        <Prose>
          <H3>1. تحديد مجتمع الدراسة والمفاضلة بين الحصر والمعاينة</H3>
          <p>
            مجتمع الدراسة هو <strong>الفنادق الصغيرة والمتوسطة (3 و4 نجوم)</strong> في نطاق
            جغرافي محدد، إضافة إلى <strong>موظفي الأقسام التشغيلية</strong> داخل هذه الفنادق.
            وبما أن عدد الفنادق في النطاق المبدئي محدود نسبيًا، فإن <strong>الحصر الشامل</strong>
            يكون ممكنًا في المرحلة الأولى، ثم ننتقل إلى <strong>المعاينة الطبقية</strong> عند
            التوسع الجغرافي.
          </p>
          <DataTable headers={["الأسلوب", "المميزات", "العيوب", "الأنسب لمشروعنا"]}>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-900">الحصر الشامل</td>
              <td className="px-4 py-3 text-slate-600">دقة عالية، لا خطأ معاينة</td>
              <td className="px-4 py-3 text-slate-600">تكلفة ووقت مرتفعان</td>
              <td className="px-4 py-3 text-emerald-700">✔ المرحلة الأولى (نطاق محدود)</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-900">المعاينة بالعينة</td>
              <td className="px-4 py-3 text-slate-600">أسرع وأقل تكلفة</td>
              <td className="px-4 py-3 text-slate-600">هامش خطأ محتمل</td>
              <td className="px-4 py-3 text-slate-600">المرحلة الثانية (توسع)</td>
            </tr>
          </DataTable>

          <H3>2. المصادر غير الميدانية (الثانوية)</H3>
          <ul className="list-inside list-disc space-y-1.5 pr-4">
            <li>تقارير وزارة السياحة والآثار.</li>
            <li>إحصاءات الجهاز المركزي للتعبئة العامة والإحصاء.</li>
            <li>دراسات قطاع الضيافة الصادرة عن بيوت الخبرة.</li>
          </ul>
          <p>
            مع مراعاة معايير <strong>عدم التحيز</strong> و<strong>الصدق</strong> و
            <strong>الثبات</strong> عند اختيار المصادر وتوثيقها.
          </p>

          <H3>3. المصادر الميدانية (الأولية)</H3>
          <ul className="list-inside list-disc space-y-1.5 pr-4">
            <li><strong>الاستقصاء:</strong> استبيان موجّه لمديري الفنادق وموظفي الأقسام.</li>
            <li><strong>الملاحظة المباشرة:</strong> زيارة ميدانية لمراقبة سير العمل الفعلي.</li>
            <li><strong>الملاحظة غير المباشرة:</strong> تحليل الشكاوى والتقييمات المنشورة عن الفنادق.</li>
          </ul>
        </Prose>
      </Panel>
    </div>
  );
}

function SurveySection() {
  return (
    <div className="space-y-6">
      <Panel title="خامسًا: الاستبيان وتحديد الفجوة التسويقية" hint="استبيانان قصيران ومحكمان">
        <Prose>
          <p>
            صُمّم استبيانان قصيران: الأول لمديري وأصحاب الفنادق (صاحب القرار الشرائي)، والثاني
            لموظفي الأقسام التشغيلية (المستخدم الفعلي). التزم كل استبيان بالقواعد التالية: هدف
            محدد، لغة بسيطة، سؤال واحد في المرة، أقل بيانات شخصية ممكنة، أسئلة نعم/لا بحذر مع
            خانة "لو الإجابة لا، ما السبب؟"، أسئلة مفتوحة في أضيق الحدود، ومقاييس وفئات في
            الإجابة (ليكرت وفئات عدد الغرف)، وعدد أسئلة بين 10 و15 سؤالًا.
          </p>
        </Prose>
      </Panel>

      <Panel title="الاستبيان الأول — مديرو وأصحاب الفنادق" hint="12 سؤالًا">
        <ol className="list-inside list-decimal space-y-2 pr-4 text-sm text-slate-600">
          <li>ما هو تصنيف فندقكم؟ (3 نجوم / 4 نجوم / 5 نجوم)</li>
          <li>كم عدد الغرف في الفندق؟ (أقل من 30 / 30–60 / 60–100 / أكثر من 100)</li>
          <li>هل تستخدمون حاليًا نظامًا إلكترونيًا لإدارة العمليات التشغيلية؟ (نعم / لا — لو لا، ما السبب؟)</li>
          <li>ما مدى رضاكم عن النظام الحالي؟ (مقياس ليكرت 1–5)</li>
          <li>ما أكبر مشكلة تشغيلية تواجهونها اليوم؟ (اختيار من متعدد)</li>
          <li>هل تعانون من تأخير في تسليم الخدمات للنزلاء؟ (نعم / لا — لو لا، ما السبب؟)</li>
          <li>هل تواجهون هدرًا أو نقصًا في المخزون؟ (نعم / لا)</li>
          <li>ما مدى أهمية التنبيهات التلقائية عند نقص المخزون؟ (ليكرت 1–5)</li>
          <li>ما الميزانية السنوية المتاحة للتقنية التشغيلية؟ (فئات)</li>
          <li>هل تفضلون الاشتراك الشهري أم الترخيص لمرة واحدة؟ (اختيار)</li>
          <li>هل تفضلون نظامًا محليًا أم مستوردًا؟ (اختيار مع سبب)</li>
          <li>ما أهم ثلاث ميزات تبحثون عنها في نظام تشغيلي؟ (سؤال مفتوح)</li>
        </ol>
      </Panel>

      <Panel title="الاستبيان الثاني — موظفو الأقسام" hint="12 سؤالًا">
        <ol className="list-inside list-decimal space-y-2 pr-4 text-sm text-slate-600">
          <li>ما القسم الذي تعمل فيه؟ (استقبال / إشراف داخلي / مطبخ / مخزن)</li>
          <li>كم سنة خبرة لديك في هذا القسم؟ (فئات)</li>
          <li>كيف تسجلون المهام حاليًا؟ (ورق / واتساب / نظام إلكتروني / مكالمات)</li>
          <li>ما مدى سهولة الطريقة الحالية؟ (ليكرت 1–5)</li>
          <li>هل تتأخر معلومات حالة الغرف في الوصول إليك؟ (نعم / لا — لو لا، ما السبب؟)</li>
          <li>هل تحتاج للتواصل مع أقسام أخرى لإتمام مهمتك؟ (نعم / لا)</li>
          <li>كم مرة يوميًا تحتاج لطلب مستلزمات؟ (فئات)</li>
          <li>هل تصل طلباتك للمخزن بسرعة؟ (ليكرت 1–5)</li>
          <li>هل تعرف الكمية المتاحة من المستلزمات قبل الطلب؟ (نعم / لا)</li>
          <li>ما مدى تقبلك لاستخدام نظام إلكتروني جديد؟ (ليكرت 1–5)</li>
          <li>ما أكبر عائق قد يمنعك من استخدام نظام جديد؟ (اختيار من متعدد)</li>
          <li>ما اقتراحك لتحسين سير العمل اليومي؟ (سؤال مفتوح)</li>
        </ol>
      </Panel>

      <Panel title="حجم العينة والنشر وتقرير النتائج" hint="منهجية التنفيذ">
        <Prose>
          <H3>حجم العينة المقترح</H3>
          <p>
            نظرًا لقلة عدد الفنادق في النطاق المبدئي، يُقترح <strong>حصر شامل</strong> في المرحلة
            الأولى (كل الفنادق المستهدفة في المدينة)، مع استهداف <strong>3–5 موظفين</strong> من
            كل فندق يمثلون الأقسام الأربعة. عند التوسع، يُستخدم <strong>معاينة طبقية</strong>
            بحجم لا يقل عن 100 فندق.
          </p>

          <H3>طريقة النشر والتوزيع</H3>
          <ul className="list-inside list-disc space-y-1.5 pr-4">
            <li>زيارات ميدانية مباشرة لمديري الفنادق.</li>
            <li>استبيان إلكتروني عبر روابط مخصصة لكل فندق.</li>
            <li>تعاون مع جمعيات الفنادق وغرف السياحة لتسهيل الوصول.</li>
          </ul>

          <H3>شكل تقرير النتائج</H3>
          <DataTable headers={["العنصر", "المحتوى"]}>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-900">الهدف</td>
              <td className="px-4 py-3 text-slate-600">قياس الفجوة التسويقية وتحديد دوافع الشراء</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-900">الفئة</td>
              <td className="px-4 py-3 text-slate-600">مديرو الفنادق + موظفو الأقسام</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-900">حجم العينة المخطط / الفعلي</td>
              <td className="px-4 py-3 text-slate-600">يُسجَّل الفعلي مقابل المخطط</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-900">تصنيف البيانات</td>
              <td className="px-4 py-3 text-slate-600">حسب التصنيف، الحجم، الموقع، القسم</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-900">التحليل</td>
              <td className="px-4 py-3 text-slate-600">وصفي + استدلالي (توزيعات، ارتباط، فروق)</td>
            </tr>
          </DataTable>
        </Prose>
      </Panel>
    </div>
  );
}

function DemandSection() {
  return (
    <div className="space-y-6">
      <Panel title="سادسًا: تقدير الطلب والتنبؤ بالمبيعات" hint="النماذج الكيفية والكمية">
        <Prose>
          <H3>1. النماذج الكيفية</H3>
          <DataTable headers={["الأسلوب", "المميزات", "العيوب"]}>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-900">المقارنة التاريخية</td>
              <td className="px-4 py-3 text-slate-600">مبنية على بيانات فعلية</td>
              <td className="px-4 py-3 text-slate-600">لا تصلح لمنتج جديد</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-900">آراء الخبراء</td>
              <td className="px-4 py-3 text-slate-600">سريعة ومرنة</td>
              <td className="px-4 py-3 text-slate-600">ذاتية وقد تتحيز</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-900">المقارنة بمشروعات مشابهة</td>
              <td className="px-4 py-3 text-slate-600">واقعية وقابلة للتطبيق</td>
              <td className="px-4 py-3 text-slate-600">تتطلب بيانات من مشروعات مماثلة</td>
            </tr>
          </DataTable>

          <H3>2. النماذج الكمية</H3>
          <p>
            أسلوب <strong>السلاسل الزمنية</strong> يعتمد على بيانات تاريخية لقياس الاتجاه
            الموسمي، وهو مناسب بعد تشغيل المشروع لعدة أشهر، لكنه غير كافٍ في مرحلة الإطلاق.
          </p>

          <H3>3. الأسلوب الأنسب والتقدير</H3>
          <p>
            الأنسب لمشروع VexOra هو <strong>المقارنة بمشروعات مشابهة</strong> مدعومة بـ
            <strong>آراء الخبراء</strong>، لأن المشروع جديد ولا يملك بيانات تاريخية. ويُقدَّر
            الطلب وفق المعادلة:
          </p>
          <div className="rounded-xl border border-teal-100 bg-teal-50/60 p-4 text-center font-display text-sm font-semibold text-teal-800">
            الطلب المتوقع = عدد الفنادق المحتملة × نسبة الاختراق × سعر الاشتراك السنوي
          </div>
          <div className="mt-4">
            <DataTable headers={["السنة", "عدد الفنادق المحتملة", "نسبة الاختراق", "عدد المشتركين", "سعر الاشتراك السنوي", "الإيراد المتوقع"]}>
              <tr>
                <td className="px-4 py-3 font-medium text-slate-900">السنة 1</td>
                <td className="px-4 py-3 tabular text-slate-600">200</td>
                <td className="px-4 py-3 tabular text-slate-600">10%</td>
                <td className="px-4 py-3 tabular text-slate-600">20</td>
                <td className="px-4 py-3 tabular text-slate-600">30,000 ج.م</td>
                <td className="px-4 py-3 tabular font-semibold text-teal-700">600,000 ج.م</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-slate-900">السنة 2</td>
                <td className="px-4 py-3 tabular text-slate-600">220</td>
                <td className="px-4 py-3 tabular text-slate-600">18%</td>
                <td className="px-4 py-3 tabular text-slate-600">40</td>
                <td className="px-4 py-3 tabular text-slate-600">32,000 ج.م</td>
                <td className="px-4 py-3 tabular font-semibold text-teal-700">1,280,000 ج.م</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-slate-900">السنة 3</td>
                <td className="px-4 py-3 tabular text-slate-600">240</td>
                <td className="px-4 py-3 tabular text-slate-600">25%</td>
                <td className="px-4 py-3 tabular text-slate-600">60</td>
                <td className="px-4 py-3 tabular text-slate-600">34,000 ج.م</td>
                <td className="px-4 py-3 tabular font-semibold text-teal-700">2,040,000 ج.م</td>
              </tr>
            </DataTable>
          </div>
          <Note tone="amber">
            جميع الأرقام أعلاه افتراضية لأغراض التوضيح فقط. يجب استبدالها ببيانات حقيقية عن عدد
            الفنادق ونسب الاختراق المتوقعة وأسعار السوق.
          </Note>

          <H3>4. إثبات وجود الفجوة واستمرارها</H3>
          <p>
            الفجوة التسويقية = الفنادق التي تدير التشغيل الداخلي يدويًا أو بأنظمة ناقصة. وبما أن
            نسبة كبيرة من الفنادق الصغيرة والمتوسطة لا تزال تعتمد على الورق والواتساب، فإن الفجوة
            مستمرة طوال فترة استرداد الاستثمار (3 سنوات على الأقل)، مع انخفاض تدريجي مع دخول
            منافسين جدد.
          </p>

          <H3>5. ربط المبيعات بالطاقة التشغيلية</H3>
          <DataTable headers={["السنة", "المشتركون", "السيرفرات المطلوبة", "فريق التطوير", "فريق الدعم الفني"]}>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-900">السنة 1</td>
              <td className="px-4 py-3 tabular text-slate-600">20</td>
              <td className="px-4 py-3 text-slate-600">سيرفر واحد</td>
              <td className="px-4 py-3 text-slate-600">3 مطورين</td>
              <td className="px-4 py-3 text-slate-600">موظف دعم واحد</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-900">السنة 2</td>
              <td className="px-4 py-3 tabular text-slate-600">40</td>
              <td className="px-4 py-3 text-slate-600">سيرفران</td>
              <td className="px-4 py-3 text-slate-600">5 مطورين</td>
              <td className="px-4 py-3 text-slate-600">موظفا دعم</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-900">السنة 3</td>
              <td className="px-4 py-3 tabular text-slate-600">60</td>
              <td className="px-4 py-3 text-slate-600">3 سيرفرات</td>
              <td className="px-4 py-3 text-slate-600">7 مطورين</td>
              <td className="px-4 py-3 text-slate-600">3 موظفي دعم</td>
            </tr>
          </DataTable>
        </Prose>
      </Panel>
    </div>
  );
}

function ConclusionSection() {
  return (
    <div className="space-y-6">
      <Panel title="سابعًا: الخلاصة والتوصية" hint="القرار النهائي والمخاطر">
        <Prose>
          <H3>ملخص نتائج الدراسة التسويقية</H3>
          <ul className="list-inside list-disc space-y-1.5 pr-4">
            <li>يوجد سوق حقيقي من الفنادق الصغيرة والمتوسطة التي تدير التشغيل الداخلي يدويًا أو بأنظمة ناقصة.</li>
            <li>المنافسة مجزأة، ولا يوجد لاعب مهيمن في هذه الشريحة.</li>
            <li>نموذج الإيراد المتكرر (SaaS) يمنح المشروع استدامة مالية وقابلية توسع.</li>
            <li>الفجوة التسويقية مستمرة طوال فترة استرداد الاستثمار.</li>
          </ul>

          <H3>القرار</H3>
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-4">
            <div className="flex items-center gap-2 font-display text-sm font-semibold text-emerald-800">
              <CheckCircle2 className="h-4 w-4" /> الاستمرار في باقي الدراسات
            </div>
            <p className="mt-2 text-xs leading-relaxed text-emerald-800">
              بناءً على النتائج التسويقية، يُوصى بالاستمرار في إعداد الدراسات الفنية والمالية
              والقانونية والبيئية، مع البدء في بناء نسخة أولى (MVP) واختبارها مع 3–5 فنادق
              تجريبية.
            </p>
          </div>

          <H3>المخاطر الرئيسية وكيفية تقليلها</H3>
          <DataTable headers={["المخاطرة", "الأثر المحتمل", "إجراء التخفيف"]}>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-900">مقاومة الموظفين للتغيير</td>
              <td className="px-4 py-3 text-slate-600">انخفاض معدل الاستخدام الفعلي</td>
              <td className="px-4 py-3 text-slate-600">تدريب ميداني، واجهة بسيطة، دعم فوري</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-900">المنافسة</td>
              <td className="px-4 py-3 text-slate-600">ضغط على الأسعار</td>
              <td className="px-4 py-3 text-slate-600">التخصص التشغيلي، جودة الدعم، شراكات</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-900">الأمان وحماية البيانات</td>
              <td className="px-4 py-3 text-slate-600">فقدان ثقة العملاء</td>
              <td className="px-4 py-3 text-slate-600">تشفير، نسخ احتياطي، التزام بقانون حماية البيانات</td>
            </tr>
          </DataTable>

          <H3>الخطوات التالية لاستكمال الدراسة</H3>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { t: "الدراسة الفنية", d: "تحديد البنية التقنية، السيرفرات، ومتطلبات التطوير." },
              { t: "الدراسة المالية", d: "تقدير التكاليف والإيرادات وصافي القيمة الحالية ومعدل العائد الداخلي." },
              { t: "الدراسة القانونية", d: "الترخيص، العقود، حماية البيانات، الملكية الفكرية." },
              { t: "الدراسة البيئية", d: "أثر التشغيل الرقمي، تقليل الهدر الورقي والمادي." },
            ].map((s) => (
              <div key={s.t} className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-teal-700">
                  <ShieldCheck className="h-3.5 w-3.5" /> {s.t}
                </div>
                <p className="text-xs leading-relaxed text-slate-600">{s.d}</p>
              </div>
            ))}
          </div>
        </Prose>
      </Panel>
    </div>
  );
}