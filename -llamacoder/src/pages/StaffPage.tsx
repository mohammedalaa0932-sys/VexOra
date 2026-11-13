import { PageHeader, Panel, StatCard, DataTable } from "@/components/ui-kit";
import { Users, UserCheck, UserX, Shield } from "lucide-react";

const staff = [
  { name: "أحمد محمود", role: "مدير تشغيل", dept: "الإدارة", status: "نشط", shift: "صباحي" },
  { name: "منى سعيد", role: "مشرفة داخلية", dept: "الإشراف الداخلي", status: "نشط", shift: "صباحي" },
  { name: "كريم عبد الله", role: "رئيس طهاة", dept: "المطبخ", status: "نشط", shift: "مسائي" },
  { name: "سارة إبراهيم", role: "موظفة استقبال", dept: "الاستقبال", status: "نشط", shift: "صباحي" },
  { name: "محمد فتحي", role: "أمين مخزن", dept: "المخزن", status: "نشط", shift: "صباحي" },
  { name: "هند علي", role: "عاملة نظافة", dept: "الإشراف الداخلي", status: "في إجازة", shift: "—" },
];

export function StaffPage() {
  return (
    <div>
      <PageHeader
        eyebrow="الإدارة والتحليل"
        title="إدارة الموظفين"
        subtitle="قائمة فريق العمل، الأدوار، الورديات، وحالة كل موظف."
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="إجمالي الموظفين" value={staff.length} icon={Users} tone="slate" />
        <StatCard label="نشط" value={staff.filter((s) => s.status === "نشط").length} icon={UserCheck} tone="emerald" />
        <StatCard label="في إجازة" value={staff.filter((s) => s.status === "في إجازة").length} icon={UserX} tone="amber" />
        <StatCard label="الأقسام" value={new Set(staff.map((s) => s.dept)).size} icon={Shield} tone="brand" />
      </div>

      <div className="mt-6">
        <Panel title="فريق العمل" hint={`${staff.length} موظف`}>
          <DataTable headers={["الاسم", "الدور", "القسم", "الوردية", "الحالة"]}>
            {staff.map((s) => (
              <tr key={s.name} className="hover:bg-slate-50/70">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-50 text-xs font-bold text-teal-700 ring-1 ring-teal-100">
                      {s.name.slice(0, 2)}
                    </div>
                    <span className="font-medium text-slate-900">{s.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600">{s.role}</td>
                <td className="px-4 py-3 text-slate-600">{s.dept}</td>
                <td className="px-4 py-3 text-slate-600">{s.shift}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ${s.status === "نشط" ? "bg-emerald-50 text-emerald-700 ring-emerald-100" : "bg-amber-50 text-amber-700 ring-amber-100"}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${s.status === "نشط" ? "bg-emerald-500" : "bg-amber-500"}`} />
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </DataTable>
        </Panel>
      </div>
    </div>
  );
}