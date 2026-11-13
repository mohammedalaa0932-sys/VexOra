import { useState } from "react";
import { useApp, type RequestStatus } from "@/store/AppContext";
import { PageHeader, Panel, RequestBadge, StatCard, EmptyState, DataTable } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClipboardList, CheckCircle2, XCircle, PackageCheck, Filter } from "lucide-react";

export function RequestsPage() {
  const { requests, role, dispatch } = useApp();
  const [filter, setFilter] = useState<RequestStatus | "all">("all");

  const filtered = requests.filter((r) => filter === "all" || r.status === filter);
  const pending = requests.filter((r) => r.status === "Pending").length;
  const approved = requests.filter((r) => r.status === "Approved").length;
  const fulfilled = requests.filter((r) => r.status === "Fulfilled").length;

  const canAct = role === "owner" || role === "manager" || role === "warehouse";

  return (
    <div>
      <PageHeader
        eyebrow="الموارد والمخزون"
        title="الطلبات والمهام"
        subtitle="متابعة كل الطلبات الواردة من الأقسام، مع إمكانية الموافقة أو الرفض أو التسليم."
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="إجمالي الطلبات" value={requests.length} icon={ClipboardList} tone="slate" />
        <StatCard label="قيد الانتظار" value={pending} icon={ClipboardList} tone="amber" />
        <StatCard label="تمت الموافقة" value={approved} icon={CheckCircle2} tone="indigo" />
        <StatCard label="تم التسليم" value={fulfilled} icon={PackageCheck} tone="emerald" />
      </div>

      <div className="mt-6 mb-4">
        <Select value={filter} onValueChange={(v) => setFilter(v as RequestStatus | "all")}>
          <SelectTrigger className="h-11 w-full sm:w-56">
            <Filter className="ml-2 h-4 w-4 text-slate-400" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">كل الحالات</SelectItem>
            <SelectItem value="Pending">قيد الانتظار</SelectItem>
            <SelectItem value="Approved">تمت الموافقة</SelectItem>
            <SelectItem value="Fulfilled">تم التسليم</SelectItem>
            <SelectItem value="Rejected">مرفوض</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Panel title="جدول الطلبات" hint={`${filtered.length} طلب`}>
        {filtered.length === 0 ? (
          <EmptyState icon={ClipboardList} title="لا توجد طلبات" description="لم يتم العثور على طلبات مطابقة للفلتر." />
        ) : (
          <DataTable headers={["الصنف", "الكمية", "القسم", "مقدم الطلب", "التاريخ", "الحالة", "إجراءات"]}>
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50/70">
                <td className="px-4 py-3 font-medium text-slate-900">{r.itemName}</td>
                <td className="px-4 py-3 tabular text-slate-600">{r.quantity}</td>
                <td className="px-4 py-3 text-slate-600">{r.department}</td>
                <td className="px-4 py-3 text-slate-600">{r.requestedBy}</td>
                <td className="px-4 py-3 text-xs text-slate-500">{r.createdAt}</td>
                <td className="px-4 py-3"><RequestBadge status={r.status} /></td>
                <td className="px-4 py-3">
                  {canAct && r.status === "Pending" && (
                    <div className="flex gap-1.5">
                      <Button size="sm" className="h-8 bg-teal-600 hover:bg-teal-700" onClick={() => dispatch({ type: "UPDATE_REQUEST", id: r.id, status: "Approved" })}>
                        موافقة
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 border-rose-200 text-rose-700 hover:bg-rose-50" onClick={() => dispatch({ type: "UPDATE_REQUEST", id: r.id, status: "Rejected" })}>
                        <XCircle className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  )}
                  {canAct && r.status === "Approved" && (
                    <Button size="sm" className="h-8 bg-emerald-600 hover:bg-emerald-700" onClick={() => dispatch({ type: "UPDATE_REQUEST", id: r.id, status: "Fulfilled" })}>
                      تسليم
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </DataTable>
        )}
      </Panel>
    </div>
  );
}