import { useState } from "react";
import { useApp } from "@/store/AppContext";
import { PageHeader, Panel, RoomBadge, StatCard, DataTable } from "@/components/ui-kit";
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
import { Sparkles, CheckCircle2, ClipboardList, PackagePlus } from "lucide-react";

export function HousekeepingPage() {
  const { rooms, inventory, dispatch } = useApp();
  const [open, setOpen] = useState(false);
  const [itemId, setItemId] = useState(inventory[0]?.id ?? "");
  const [qty, setQty] = useState(5);
  const [room, setRoom] = useState("");

  const queue = rooms.filter((r) =>
    ["Waiting for Cleaning", "Cleaning in Progress", "Waiting for Inspection"].includes(r.status)
  );

  const submit = () => {
    const item = inventory.find((i) => i.id === itemId);
    if (!item) return;
    dispatch({
      type: "SUBMIT_REQUEST",
      payload: {
        itemId: item.id,
        itemName: item.name,
        quantity: qty,
        department: "Housekeeping",
        requestedBy: "منى س.",
        room: room || undefined,
      },
    });
    setOpen(false);
    setQty(5);
    setRoom("");
  };

  return (
    <div>
      <PageHeader
        eyebrow="العمليات اليومية"
        title="لوحة الإشراف الداخلي"
        subtitle="أدر مهام التنظيف واطلب المستلزمات من مكان واحد — كل طلب يصل للمخزن فورًا."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-teal-600 hover:bg-teal-700">
                <PackagePlus className="ml-2 h-4 w-4" /> طلب مستلزمات
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>طلب مستلزمات جديد</DialogTitle>
                <DialogDescription>
                  سيصل الطلب إلى المخزن فورًا ويظهر في قائمة الطلبات.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>الصنف</Label>
                  <Select value={itemId} onValueChange={setItemId}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {inventory.map((i) => (
                        <SelectItem key={i.id} value={i.id}>{i.name} ({i.quantity} {i.unit})</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>الكمية</Label>
                  <Input type="number" min={1} value={qty} onChange={(e) => setQty(Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label>الغرفة (اختياري)</Label>
                  <Input value={room} onChange={(e) => setRoom(e.target.value)} placeholder="مثال: 204" />
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
        <StatCard label="بانتظار التنظيف" value={rooms.filter((r) => r.status === "Waiting for Cleaning").length} icon={Sparkles} tone="rose" />
        <StatCard label="جارٍ التنظيف" value={rooms.filter((r) => r.status === "Cleaning in Progress").length} icon={Sparkles} tone="indigo" />
        <StatCard label="بانتظار الفحص" value={rooms.filter((r) => r.status === "Waiting for Inspection").length} icon={ClipboardList} tone="amber" />
        <StatCard label="جاهزة للنزيل" value={rooms.filter((r) => r.status === "Ready for Guest").length} icon={CheckCircle2} tone="emerald" />
      </div>

      <div className="mt-6">
        <Panel title="مهام التنظيف الحالية" hint={`${queue.length} مهمة في قائمة الانتظار`}>
          {queue.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-500">
              لا توجد مهام تنظيف حاليًا. عمل رائع!
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {queue.map((r) => (
                <div key={r.id} className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-teal-200 hover:shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 font-display text-sm font-bold text-rose-700">
                        {r.number}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">غرفة {r.number}</div>
                        <div className="text-xs text-slate-500">{r.type} · الطابق {r.floor}</div>
                      </div>
                    </div>
                    <RoomBadge status={r.status} />
                  </div>
                  <div className="text-xs text-slate-500">
                    مغادرة {r.lastCheckout ?? "—"} · المسؤول: {r.assignedTo ?? "غير مُعيّن"}
                  </div>
                  <div className="flex gap-2">
                    {r.status === "Waiting for Cleaning" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => dispatch({ type: "START_CLEANING", roomId: r.id })}
                      >
                        بدء التنظيف
                      </Button>
                    )}
                    {r.status === "Cleaning in Progress" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => dispatch({ type: "COMPLETE_CLEANING", roomId: r.id })}
                      >
                        تم التنظيف
                      </Button>
                    )}
                    {r.status === "Waiting for Inspection" && (
                      <Button
                        size="sm"
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                        onClick={() => dispatch({ type: "MARK_READY", roomId: r.id })}
                      >
                        اعتماد الجاهزية
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Panel>
      </div>

      <div className="mt-6">
        <Panel title="مستويات المستلزمات" hint="راقب الأصناف التي تحتاج إلى طلب">
          <DataTable headers={["الصنف", "المتاح", "الحد الأدنى", "الوحدة", "الحالة"]}>
            {inventory.slice(0, 6).map((i) => (
              <tr key={i.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">{i.name}</td>
                <td className="px-4 py-3 tabular text-slate-600">{i.quantity}</td>
                <td className="px-4 py-3 tabular text-slate-600">{i.minLevel}</td>
                <td className="px-4 py-3 text-slate-600">{i.unit}</td>
                <td className="px-4 py-3">
                  <span className={i.quantity < i.minLevel ? "text-rose-600" : "text-emerald-600"}>
                    {i.quantity < i.minLevel ? "يحتاج طلب" : "متوفر"}
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