import { useApp, stockLevel } from "@/store/AppContext";
import { PageHeader, Panel, StatCard, DataTable, ProgressBar } from "@/components/ui-kit";
import { BarChart3, TrendingUp, Package, Users, Wallet, Activity } from "lucide-react";

export function ReportsPage() {
  const { rooms, requests, inventory } = useApp();

  const totalValue = inventory.reduce((s, i) => s + i.quantity * i.unitPrice, 0);
  const occupancy = rooms.length ? Math.round((rooms.filter((r) => r.status === "Occupied").length / rooms.length) * 100) : 0;

  const deptStats = [
    { d: "الاستقبال", v: rooms.filter((r) => r.status === "Occupied").length, t: "indigo" as const },
    { d: "الإشراف الداخلي", v: rooms.filter((r) => r.status.startsWith("Waiting") || r.status === "Cleaning in Progress").length, t: "rose" as const },
    { d: "المطبخ", v: requests.filter((r) => r.department === "Kitchen").length, t: "amber" as const },
    { d: "المخزن", v: requests.filter((r) => r.department === "Warehouse").length, t: "brand" as const },
  ];
  const maxDept = Math.max(...deptStats.map((d) => d.v), 1);

  const monthly = [
    { m: "يناير", v: 62 }, { m: "فبراير", v: 68 }, { m: "مارس", v: 74 },
    { m: "أبريل", v: 71 }, { m: "مايو", v: 79 }, { m: "يونيو", v: 85 },
  ];
  const maxM = Math.max(...monthly.map((m) => m.v));

  return (
    <div>
      <PageHeader
        eyebrow="الإدارة والتحليل"
        title="التقارير والتحليلات"
        subtitle="مؤشرات الأداء الرئيسية ونشاط الأقسام وحركة المخزون."
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="نسبة الإشغال" value={`${occupancy}%`} icon={TrendingUp} tone="brand" trend={{ value: "+6% شهريًا", positive: true }} />
        <StatCard label="قيمة المخزون" value={`${totalValue.toLocaleString("ar-EG")} ج.م`} icon={Wallet} tone="indigo" />
        <StatCard label="إجمالي الطلبات" value={requests.length} icon={Activity} tone="amber" />
        <StatCard label="أصناف حرجة" value={inventory.filter((i) => stockLevel(i) !== "Normal").length} icon={Package} tone="rose" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="اتجاه الإشغال الشهري" hint="بيانات توضيحية">
          <div className="flex h-52 items-end justify-between gap-3">
            {monthly.map((m) => (
              <div key={m.m} className="flex flex-1 flex-col items-center gap-2">
                <div className="text-[11px] font-semibold tabular text-slate-500">{m.v}%</div>
                <div className="relative flex h-full w-full items-end overflow-hidden rounded-xl bg-slate-50">
                  <div className="w-full rounded-xl bg-gradient-to-t from-indigo-600 to-indigo-400 transition-all duration-700" style={{ height: `${(m.v / maxM) * 100}%` }} />
                </div>
                <div className="text-[11px] text-slate-500">{m.m}</div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="نشاط الأقسام" hint="عدد العمليات لكل قسم">
          <div className="space-y-4">
            {deptStats.map((d) => (
              <div key={d.d}>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700">{d.d}</span>
                  <span className="font-semibold tabular text-slate-900">{d.v}</span>
                </div>
                <ProgressBar value={(d.v / maxDept) * 100} tone={d.t} />
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="mt-6">
        <Panel title="ملخص المخزون" hint="أعلى 8 أصناف قيمة">
          <DataTable headers={["الصنف", "التصنيف", "المتاح", "سعر الوحدة", "القيمة الإجمالية", "الحالة"]}>
            {[...inventory]
              .sort((a, b) => b.quantity * b.unitPrice - a.quantity * a.unitPrice)
              .slice(0, 8)
              .map((i) => (
                <tr key={i.id} className="hover:bg-slate-50/70">
                  <td className="px-4 py-3 font-medium text-slate-900">{i.name}</td>
                  <td className="px-4 py-3 text-slate-600">{i.category}</td>
                  <td className="px-4 py-3 tabular text-slate-600">{i.quantity} {i.unit}</td>
                  <td className="px-4 py-3 tabular text-slate-600">{i.unitPrice} ج.م</td>
                  <td className="px-4 py-3 tabular font-semibold text-slate-900">{(i.quantity * i.unitPrice).toLocaleString("ar-EG")} ج.م</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{stockLevel(i)}</td>
                </tr>
              ))}
          </DataTable>
        </Panel>
      </div>
    </div>
  );
}