import { useState } from "react";
import { useApp, type RoomStatus } from "@/store/AppContext";
import { PageHeader, Panel, RoomBadge, StatCard, EmptyState } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BedDouble, DoorOpen, Sparkles, Search, Wrench, Filter } from "lucide-react";

const statusFilters: { value: RoomStatus | "all"; label: string }[] = [
  { value: "all", label: "كل الحالات" },
  { value: "Occupied", label: "مشغولة" },
  { value: "Ready for Guest", label: "جاهزة للنزيل" },
  { value: "Waiting for Cleaning", label: "بانتظار التنظيف" },
  { value: "Cleaning in Progress", label: "جارٍ التنظيف" },
  { value: "Waiting for Inspection", label: "بانتظار الفحص" },
  { value: "Out of Service", label: "خارج الخدمة" },
];

export function RoomsPage() {
  const { rooms } = useApp();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<RoomStatus | "all">("all");

  const filtered = rooms.filter((r) => {
    const matchQ = r.number.includes(query) || r.type.includes(query);
    const matchF = filter === "all" || r.status === filter;
    return matchQ && matchF;
  });

  const occupied = rooms.filter((r) => r.status === "Occupied").length;
  const ready = rooms.filter((r) => r.status === "Ready for Guest").length;
  const cleaning = rooms.filter((r) => r.status.startsWith("Waiting") || r.status === "Cleaning in Progress").length;
  const oos = rooms.filter((r) => r.status === "Out of Service").length;

  return (
    <div>
      <PageHeader
        eyebrow="الموارد والمخزون"
        title="إدارة الغرف"
        subtitle="نظرة شاملة على حالة كل غرفة، مع إمكانية الفلترة والبحث السريع."
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="مشغولة" value={occupied} icon={DoorOpen} tone="indigo" />
        <StatCard label="جاهزة للنزيل" value={ready} icon={Sparkles} tone="emerald" />
        <StatCard label="قيد التنظيف" value={cleaning} icon={BedDouble} tone="amber" />
        <StatCard label="خارج الخدمة" value={oos} icon={Wrench} tone="slate" />
      </div>

      <div className="mt-6 mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="ابحث برقم الغرفة أو النوع"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-11 pr-9"
          />
        </div>
        <Select value={filter} onValueChange={(v) => setFilter(v as RoomStatus | "all")}>
          <SelectTrigger className="h-11 w-full sm:w-56">
            <Filter className="ml-2 h-4 w-4 text-slate-400" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statusFilters.map((s) => (
              <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={BedDouble}
          title="لا توجد غرف مطابقة"
          description="جرّب تغيير كلمة البحث أو الفلتر لعرض نتائج أخرى."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((r) => (
            <div
              key={r.id}
              className="vx-card group relative overflow-hidden p-5 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-display text-2xl font-bold tabular text-slate-900">
                    {r.number}
                  </div>
                  <div className="mt-0.5 text-xs text-slate-500">
                    {r.type} · الطابق {r.floor}
                  </div>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700 ring-1 ring-teal-100">
                  <BedDouble className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-4">
                <RoomBadge status={r.status} />
              </div>

              <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-4 text-[11px] text-slate-500">
                <div className="flex justify-between">
                  <span>النزيل الحالي</span>
                  <span className="font-medium text-slate-700">{r.guestName ?? "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span>آخر مغادرة</span>
                  <span className="font-medium text-slate-700">{r.lastCheckout ?? "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span>المسؤول</span>
                  <span className="font-medium text-slate-700">{r.assignedTo ?? "غير مُعيّن"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}