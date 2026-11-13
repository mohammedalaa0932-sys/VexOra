import { useState } from "react";
import { useApp } from "@/store/AppContext";
import { PageHeader, Panel, RequestBadge, StatCard, DataTable } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChefHat, PackagePlus, ClipboardList, AlertTriangle } from "lucide-react";

export function KitchenPage() {
  const { inventory, requests, dispatch } = useApp();
  const [open, setOpen] = useState(false);
  const [itemId, setItemId] = useState(inventory[0]?.id ?? "");
  const [qty, setQty] = useState(5);

  const kitchenItems = inventory.filter((i) => i.category === "المطبخ");
  const kitchenRequests = requests.filter((r) => r.department === "Kitchen");
  const pending = kitchenRequests.filter((r) => r.status === "Pending").length;
  const shortages = kitchenItems.filter((i) => i.quantity < i.minLevel).length;

  const submit = () => {
    const item = inventory.find((i) => i.id === itemId);
    if (!item) return;
    dispatch({
      type: "SUBMIT_REQUEST",
      payload: {
        itemId: item.id,
        itemName: item.name,
        quantity: qty,
        department: "Kitchen",
        requestedBy: "الشيف كريم",
      },
    });
    setOpen(false);
    setQty(5);
  };

  return (
    <div>
      <PageHeader
        eyebrow="العمليات اليومية"
        title="لوحة المطبخ"
        subtitle="سجّل النواقص واطلب المواد مباشرة من المخزن مع متابعة حالة كل طلب."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-teal-600 hover:bg-teal-700">
                <PackagePlus className="ml-2 h-4 w-4" /> طلب مواد
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>طلب مواد من المخزن</DialogTitle>
                <DialogDescription>
                  سيتم إرسال الطلب إلى أمين المخزن للمراجعة والتسليم.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>المادة</Label>
                  <Select value={itemId} onValueChange={setItemId}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {kitchenItems.map((i) => (
                        <SelectItem key={i.id} value={i.id}>{i.name} ({i.quantity} {i.unit})</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>الكمية</Label>
                  <Input type="number" min={1} value={qty} onChange={(e) => setQty(Number(e.target.value))} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>إلغاء</Button>
                <Button className="bg-teal-600 hover:bg-teal-700" onClick={submit}>إرسال الطلب</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="مواد المطبخ" value={kitchenItems.length} icon={ChefHat} tone="slate" />
        <StatCard label="طلبات قيد الانتظار" value={pending} icon={ClipboardList} tone="amber" />
        <StatCard label="نواقص حرجة" value={shortages} icon={AlertTriangle} tone="rose" />
        <StatCard label="إجمالي الطلبات" value={kitchenRequests.length} icon={ClipboardList} tone="indigo" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="مخزون المطبخ" hint="الكميات المتاحة والحد الأدنى">
          <DataTable headers={["المادة", "المتاح", "الحد الأدنى", "الحالة"]}>
            {kitchenItems.map((i) => (
              <tr key={i.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">{i.name}</td>
                <td className="px-4 py-3 tabular text-slate-600">{i.quantity} {i.unit}</td>
                <td className="px-4 py-3 tabular text-slate-600">{i.minLevel}</td>
                <td className="px-4 py-3">
                  <span className={i.quantity < i.minLevel ? "font-medium text-rose-600" : "text-emerald-600"}>
                    {i.quantity < i.minLevel ? "نقص" : "متوفر"}
                  </span>
                </td>
              </tr>
            ))}
          </DataTable>
        </Panel>

        <Panel title="طلبات المطبخ" hint="متابعة حالة الطلبات">
          <div className="space-y-3">
            {kitchenRequests.map((r) => (
              <div key={r.id} className="flex items-center justify-between rounded-xl border border-slate-200 p-3.5">
                <div>
                  <div className="text-sm font-medium text-slate-900">{r.itemName} · {r.quantity}</div>
                  <div className="text-xs text-slate-500">{r.requestedBy} · {r.createdAt}</div>
                </div>
                <RequestBadge status={r.status} />
              </div>
            ))}
            {kitchenRequests.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
                لا توجد طلبات من المطبخ.
              </div>
            )}
          </div>
        </Panel>
      </div>
    </div>
  );
}