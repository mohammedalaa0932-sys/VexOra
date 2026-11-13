import { useMemo, useState } from "react";
import { useApp, stockLevel } from "@/store/AppContext";
import { PageHeader, Panel, StatCard, DataTable, StockBadge, ProgressBar } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Package, AlertTriangle, PackageX, Search, Plus, Minus, Wallet } from "lucide-react";

export function InventoryPage() {
  const { inventory, role, dispatch } = useApp();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const categories = useMemo(
    () => Array.from(new Set(inventory.map((i) => i.category))),
    [inventory]
  );

  const filtered = inventory.filter((i) => {
    const matchQ = i.name.includes(query) || i.sku.toLowerCase().includes(query.toLowerCase());
    const matchC = category === "all" || i.category === category;
    return matchQ && matchC;
  });

  const totalValue = inventory.reduce((s, i) => s + i.quantity * i.unitPrice, 0);
  const low = inventory.filter((i) => stockLevel(i) === "Low Stock").length;
  const critical = inventory.filter((i) => stockLevel(i) === "Critical").length;
  const out = inventory.filter((i) => stockLevel(i) === "Out of Stock").length;

  const canEdit = role === "owner" || role === "manager" || role === "warehouse";

  return (
    <div>
      <PageHeader
        eyebrow="الموارد والمخزون"
        title="المخزون والمستودع"
        subtitle="متابعة دقيقة للكميات، الحدود الدنيا، الأسعار، وحركة الأصناف مع تنبيهات ذكية."
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="إجمالي الأصناف" value={inventory.length} icon={Package} tone="slate" />
        <StatCard label="قيمة المخزون" value={`${totalValue.toLocaleString("ar-EG")} ج.م`} icon={Wallet} tone="brand" />
        <StatCard label="مخزون منخفض" value={low} icon={AlertTriangle} tone="amber" />
        <StatCard label="نفد / حرج" value={critical + out} icon={PackageX} tone="rose" />
      </div>

      <div className="mt-6 mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="ابحث بالاسم أو رمز الصنف (SKU)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-11 pr-9"
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="h-11 w-full sm:w-56">
            <SelectValue placeholder="التصنيف" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">كل التصنيفات</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Panel title="جدول المخزون" hint={`${filtered.length} صنف`}>
        <DataTable
          headers={["الصنف", "رمز SKU", "التصنيف", "المتاح", "الحد الأدنى", "سعر الوحدة", "المستوى", "آخر تحديث", "إجراءات"]}
        >
          {filtered.map((i) => {
            const level = stockLevel(i);
            const pct = Math.min(100, Math.round((i.quantity / Math.max(1, i.minLevel)) * 100));
            return (
              <tr key={i.id} className="hover:bg-slate-50/70">
                <td className="px-4 py-3">
                  <div className="font-medium text-slate-900">{i.name}</div>
                  <div className="mt-1 w-32">
                    <ProgressBar value={pct} tone={level === "Normal" ? "emerald" : level === "Low Stock" ? "amber" : "rose"} />
                  </div>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-slate-500" dir="ltr">{i.sku}</td>
                <td className="px-4 py-3 text-slate-600">{i.category}</td>
                <td className="px-4 py-3 tabular font-medium text-slate-900">{i.quantity} {i.unit}</td>
                <td className="px-4 py-3 tabular text-slate-600">{i.minLevel}</td>
                <td className="px-4 py-3 tabular text-slate-600">{i.unitPrice} ج.م</td>
                <td className="px-4 py-3"><StockBadge level={level} /></td>
                <td className="px-4 py-3 text-xs text-slate-500">{i.lastUpdated}</td>
                <td className="px-4 py-3">
                  {canEdit && (
                    <div className="flex gap-1.5">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => dispatch({ type: "ADJUST_STOCK", id: i.id, delta: 10, note: "إضافة يدوية" })}
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => dispatch({ type: "ADJUST_STOCK", id: i.id, delta: -10, note: "صرف يدوي" })}
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </DataTable>
      </Panel>
    </div>
  );
}