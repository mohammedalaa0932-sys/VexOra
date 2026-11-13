import { useApp, stockLevel } from "@/store/AppContext";
import { PageHeader, Panel, StatCard, RoomBadge, RequestBadge, StockBadge, ProgressBar } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import type { PageId } from "@/components/AppShell";
import {
  BedDouble,
  DoorOpen,
  Sparkles,
  ClipboardList,
  AlertTriangle,
  TrendingUp,
  ArrowLeft,
  Activity,
  Package,
  ConciergeBell,
  ChefHat,
  ShieldAlert,
} from "lucide-react";

export function OverviewPage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const { rooms, requests, inventory, notifications } = useApp();

  const total = rooms.length;
  const occupied = rooms.filter((r) => r.status === "Occupied").length;
  const available = rooms.filter((r) => r.status === "Ready for Guest").length;
  const cleaning = rooms.filter((r) => r.status === "Waiting for Cleaning" || r.status === "Cleaning in Progress").length;
  const pending = requests.filter((r) => r.status === "Pending").length;
  const lowStock = inventory.filter((i) => stockLevel(i) === "Low Stock").length;
  const critical = inventory.filter((i) => stockLevel(i) === "Critical" || stockLevel(i) === "Out of Stock").length;
  const occupancy = total ? Math.round((occupied / total) * 100) : 0;

  const recent = [...requests].slice(0, 6);
  const alerts = notifications.filter((n) => !n.read).slice(0, 5);

  const weekly = [
    { d: "السبت", v: 62 },
    { d: "الأحد", v: 74 },
    { d: "الاثنين", v: 58 },
    { d: "الثلاثاء", v: 81 },
    { d: "الأربعاء", v: 69 },
    { d: "الخميس", v: 88 },
    { d: "الجمعة", v: 94 },
  ];
  const maxV = Math.max(...weekly.map((w) => w.v));

  return (
    <div>
      <PageHeader
        eyebrow="لوحة التحكم الرئيسية"
        title="نظرة عامة على العمليات"
        subtitle="صورة لحظية لحالة الفندق: الغرف، الطلبات، المخزون، والتنبيهات الحرجة."
        actions={
          <>
            <Button variant="outline" onClick={() => onNavigate("reports")}>
              التقارير
            </Button>
            <Button className="bg-teal-600 hover:bg-teal-700" onClick={() => onNavigate("reception")}>
              <ConciergeBell className="ml-2 h-4 w-4" /> فتح الاستقبال
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="إجمالي الغرف" value={total} icon={BedDouble} tone="slate" hint="جميع الوحدات" />
        <StatCard label="الغرف المشغولة" value={occupied} icon={DoorOpen} tone="indigo" trend={{ value: `نسبة الإشغال ${occupancy}%`, positive: true }} />
        <StatCard label="جاهزة للنزيل" value={available} icon={Sparkles} tone="emerald" hint="متاحة للحجز الفوري" />
        <StatCard label="تحتاج تنظيف" value={cleaning} icon={Sparkles} tone="rose" hint="في قائمة الإشراف الداخلي" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Panel
            title="حركة الإشغال خلال الأسبوع"
            hint="نسبة الإشغال اليومية (بيانات توضيحية)"
            actions={
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-100">
                <TrendingUp className="h-3 w-3" /> +8.4% عن الأسبوع الماضي
              </span>
            }
          >
            <div className="flex h-56 items-end justify-between gap-3">
              {weekly.map((w) => (
                <div key={w.d} className="flex flex-1 flex-col items-center gap-2">
                  <div className="text-[11px] font-semibold tabular text-slate-500">{w.v}%</div>
                  <div className="relative flex h-full w-full items-end overflow-hidden rounded-xl bg-slate-50">
                    <div
                      className="w-full rounded-xl bg-gradient-to-t from-teal-600 to-teal-400 transition-all duration-700"
                      style={{ height: `${(w.v / maxV) * 100}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-slate-500">{w.d}</div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <Panel
          title="التنبيهات الحرجة"
          hint={`${alerts.length} تنبيه غير مقروء`}
          actions={
            <Button variant="ghost" size="sm" onClick={() => onNavigate("notifications")}>
              عرض الكل <ArrowLeft className="mr-1 h-3.5 w-3.5" />
            </Button>
          }
        >
          <div className="space-y-3">
            {alerts.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-xs text-slate-500">
                لا توجد تنبيهات حالية.
              </div>
            )}
            {alerts.map((n) => (
              <div key={n.id} className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-3">
                <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${n.severity === "critical" ? "bg-rose-100 text-rose-700" : n.severity === "warning" ? "bg-amber-100 text-amber-700" : "bg-sky-100 text-sky-700"}`}>
                  <ShieldAlert className="h-3.5 w-3.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-slate-800">{n.title}</div>
                  <div className="mt-0.5 line-clamp-2 text-[11px] leading-relaxed text-slate-500">{n.body}</div>
                  <div className="mt-1 text-[10px] text-slate-400">{n.createdAt}</div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Panel
          title="أحدث الطلبات"
          hint="آخر الطلبات الواردة من الأقسام"
          className="lg:col-span-2"
          actions={
            <Button variant="ghost" size="sm" onClick={() => onNavigate("requests")}>
              إدارة الطلبات <ArrowLeft className="mr-1 h-3.5 w-3.5" />
            </Button>
          }
        >
          <div className="space-y-3">
            {recent.map((r) => (
              <div key={r.id} className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 p-3.5 transition-colors hover:bg-slate-50/60">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700 ring-1 ring-teal-100">
                    {r.department === "Kitchen" ? <ChefHat className="h-4 w-4" /> : r.department === "Housekeeping" ? <Sparkles className="h-4 w-4" /> : <Package className="h-4 w-4" />}
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-slate-900">
                      {r.itemName} · {r.quantity}
                    </div>
                    <div className="truncate text-[11px] text-slate-500">
                      {r.requestedBy} · {r.createdAt}
                    </div>
                  </div>
                </div>
                <RequestBadge status={r.status} />
              </div>
            ))}
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel title="مؤشرات المخزون" hint="حالة الأصناف الحرجة">
            <div className="space-y-4">
              <div>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="text-slate-600">مخزون طبيعي</span>
                  <span className="font-semibold tabular text-slate-900">
                    {inventory.length - lowStock - critical}
                  </span>
                </div>
                <ProgressBar value={((inventory.length - lowStock - critical) / Math.max(1, inventory.length)) * 100} tone="emerald" />
              </div>
              <div>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="text-slate-600">مخزون منخفض</span>
                  <span className="font-semibold tabular text-amber-700">{lowStock}</span>
                </div>
                <ProgressBar value={(lowStock / Math.max(1, inventory.length)) * 100} tone="amber" />
              </div>
              <div>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="text-slate-600">حرج / نفد</span>
                  <span className="font-semibold tabular text-rose-700">{critical}</span>
                </div>
                <ProgressBar value={(critical / Math.max(1, inventory.length)) * 100} tone="rose" />
              </div>
            </div>
            <Button variant="outline" size="sm" className="mt-4 w-full" onClick={() => onNavigate("inventory")}>
              فتح المخزون <ArrowLeft className="mr-1 h-3.5 w-3.5" />
            </Button>
          </Panel>

          <Panel title="ملخص الأقسام" hint="نشاط اليوم">
            <div className="space-y-2.5">
              {[
                { l: "الاستقبال", v: rooms.filter((r) => r.status === "Occupied").length, i: ConciergeBell, t: "indigo" },
                { l: "الإشراف الداخلي", v: cleaning, i: Sparkles, t: "rose" },
                { l: "المطبخ", v: requests.filter((r) => r.department === "Kitchen").length, i: ChefHat, t: "amber" },
                { l: "المخزن", v: requests.filter((r) => r.department === "Warehouse").length, i: Package, t: "brand" },
              ].map((d) => (
                <div key={d.l} className="flex items-center justify-between rounded-xl bg-slate-50/70 px-3 py-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className={`flex h-7 w-7 items-center justify-center rounded-lg bg-white text-slate-600 ring-1 ring-slate-100`}>
                      <d.i className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-xs font-medium text-slate-700">{d.l}</span>
                  </div>
                  <span className="font-display text-sm font-bold tabular text-slate-900">{d.v}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>

      <div className="mt-6">
        <Panel title="حالة الغرف السريعة" hint="آخر 8 غرف تم تحديثها">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {rooms.slice(0, 8).map((r) => (
              <div key={r.id} className="rounded-xl border border-slate-100 bg-white p-3 text-center transition-all hover:-translate-y-0.5 hover:shadow-sm">
                <div className="font-display text-lg font-bold tabular text-slate-900">{r.number}</div>
                <div className="mt-1 text-[10px] text-slate-500">{r.type}</div>
                <div className="mt-2 flex justify-center">
                  <RoomBadge status={r.status} />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}