import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VexOraLogo, VexOraLockup } from "@/components/VexOraLogo";
import { ShieldCheck, Sparkles, ArrowLeft, CheckCircle2 } from "lucide-react";

export function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("admin@vexora.io");
  const [password, setPassword] = useState("demo1234");

  return (
    <div dir="rtl" className="min-h-screen bg-slate-950 text-slate-100">
      <div className="grid min-h-screen lg:grid-cols-5">
        <div className="relative hidden overflow-hidden border-l border-slate-800 bg-gradient-to-bl from-slate-900 via-slate-950 to-teal-950 p-12 lg:col-span-3 lg:flex lg:flex-col lg:justify-between">
          <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative flex items-center justify-between">
            <VexOraLockup size={44} tone="gold" subtitle="منصة إدارة عمليات الفنادق" />
            <div className="hidden items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-400 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              جميع الأنظمة تعمل
            </div>
          </div>

          <div className="relative max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-xs font-semibold text-teal-300">
              <Sparkles className="h-3.5 w-3.5" /> منصة SaaS احترافية لإدارة الفنادق
            </div>
            <h1 className="font-display text-4xl font-bold leading-tight text-white lg:text-5xl">
              منصة واحدة.
              <br />
              كل الأقسام.
              <br />
              <span className="text-teal-300">بلا تأخير.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-400">
              اربط الاستقبال والإشراف الداخلي والمطبخ والمخزن في الوقت الفعلي.
              تابع الطلبات، راقب المخزون، وحافظ على تجربة نزيل مثالية.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { k: "الأقسام المتصلة", v: "5" },
                { k: "تنبيهات مباشرة", v: "24/7" },
                { k: "زمن التشغيل", v: "99.9%" },
              ].map((s) => (
                <div key={s.k} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur">
                  <div className="font-display text-2xl font-bold text-teal-300">{s.v}</div>
                  <div className="mt-1 text-xs text-slate-500">{s.k}</div>
                </div>
              ))}
            </div>

            <ul className="mt-10 space-y-3 text-sm text-slate-400">
              {[
                "تحديث فوري لحالة الغرف بين الاستقبال والإشراف الداخلي",
                "تنبيهات ذكية عند وصول المخزون للحد الأدنى",
                "لوحة تحكم إدارية بمؤشرات الأداء التشغيلي",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-teal-400" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="h-4 w-4" /> صلاحيات حسب الدور · بياناتك تبقى داخل مساحة فندقك
          </div>
        </div>

        <div className="flex items-center justify-center p-6 lg:col-span-2 lg:p-12">
          <div className="w-full max-w-sm">
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <VexOraLogo size={40} tone="gold" />
              <div className="font-display text-lg font-bold">VexOra</div>
            </div>
            <h2 className="font-display text-2xl font-bold text-white">تسجيل الدخول إلى مساحة العمل</h2>
            <p className="mt-2 text-sm text-slate-400">
              استخدم بيانات الدخول التجريبية لاستكشاف المنصة.
            </p>

            <form
              className="mt-8 space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                onLogin();
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 border-slate-800 bg-slate-900 text-slate-100 placeholder:text-slate-600 focus-visible:ring-teal-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">كلمة المرور</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 border-slate-800 bg-slate-900 text-slate-100 placeholder:text-slate-600 focus-visible:ring-teal-500"
                />
              </div>
              <Button
                type="submit"
                className="h-11 w-full bg-teal-500 text-slate-950 hover:bg-teal-400"
              >
                تسجيل الدخول <ArrowLeft className="mr-2 h-4 w-4" />
              </Button>
            </form>

            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-xs text-slate-400">
              <div className="font-semibold text-slate-300">بيانات تجريبية</div>
              <div className="mt-1 font-mono" dir="ltr">admin@vexora.io · demo1234</div>
              <div className="mt-2 text-slate-500">
                يمكنك تبديل الدور من الشريط العلوي بعد الدخول لاستكشاف كل قسم.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}