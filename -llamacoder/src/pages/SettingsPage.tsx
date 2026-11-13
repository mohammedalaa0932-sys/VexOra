import { useState } from "react";
import { PageHeader, Panel } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Building2, Bell, Shield, Save } from "lucide-react";

export function SettingsPage() {
  const [hotelName, setHotelName] = useState("فندق جراند النيل");
  const [email, setEmail] = useState("ops@grandnile.com");
  const [phone, setPhone] = useState("+20 100 000 0000");
  const [lowStockAlert, setLowStockAlert] = useState(true);
  const [criticalAlert, setCriticalAlert] = useState(true);
  const [emailDigest, setEmailDigest] = useState(false);

  return (
    <div>
      <PageHeader
        eyebrow="الإدارة والتحليل"
        title="الإعدادات"
        subtitle="إعدادات الفندق، التنبيهات، والأمان."
        actions={
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Save className="ml-2 h-4 w-4" /> حفظ التغييرات
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="بيانات الفندق" hint="المعلومات الأساسية">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>اسم الفندق</Label>
              <Input value={hotelName} onChange={(e) => setHotelName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>البريد الإلكتروني</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} dir="ltr" />
            </div>
            <div className="space-y-2">
              <Label>رقم الهاتف</Label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} dir="ltr" />
            </div>
          </div>
        </Panel>

        <Panel title="التنبيهات" hint="تحكم في متى يتم إشعارك">
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-xl border border-slate-100 p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-700 ring-1 ring-amber-100">
                  <Bell className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-sm font-medium text-slate-900">تنبيه المخزون المنخفض</div>
                  <div className="text-xs text-slate-500">عند وصول الصنف للحد الأدنى</div>
                </div>
              </div>
              <Switch checked={lowStockAlert} onCheckedChange={setLowStockAlert} />
            </div>

            <div className="flex items-center justify-between rounded-xl border border-slate-100 p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-700 ring-1 ring-rose-100">
                  <Shield className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-sm font-medium text-slate-900">تنبيهات حرجة</div>
                  <div className="text-xs text-slate-500">نفاد المخزون أو الأعطال</div>
                </div>
              </div>
              <Switch checked={criticalAlert} onCheckedChange={setCriticalAlert} />
            </div>

            <div className="flex items-center justify-between rounded-xl border border-slate-100 p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-700 ring-1 ring-sky-100">
                  <Building2 className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-sm font-medium text-slate-900">ملخص يومي بالبريد</div>
                  <div className="text-xs text-slate-500">تقرير مختصر كل صباح</div>
                </div>
              </div>
              <Switch checked={emailDigest} onCheckedChange={setEmailDigest} />
            </div>
          </div>
        </Panel>
      </div>

      <div className="mt-6">
        <Panel title="الأمان" hint="إعدادات الحماية">
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-xl border border-slate-100 p-4">
              <div>
                <div className="text-sm font-medium text-slate-900">التحقق بخطوتين</div>
                <div className="text-xs text-slate-500">طبقة حماية إضافية لحسابك</div>
              </div>
              <Button variant="outline" size="sm">تفعيل</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between rounded-xl border border-slate-100 p-4">
              <div>
                <div className="text-sm font-medium text-slate-900">تغيير كلمة المرور</div>
                <div className="text-xs text-slate-500">يُنصح بتغييرها كل 90 يومًا</div>
              </div>
              <Button variant="outline" size="sm">تغيير</Button>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}