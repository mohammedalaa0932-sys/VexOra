import { useState } from "react";
import { useApp } from "@/store/AppContext";
import { PageHeader, Panel, RoomBadge, StatCard, EmptyState } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ConciergeBell, DoorOpen, Sparkles, LogOut, Search, UserPlus } from "lucide-react";

export function ReceptionPage() {
  const { rooms, dispatch } = useApp();
  const [query, setQuery] = useState("");
  const [checkoutId, setCheckoutId] = useState<string | null>(null);
  const [checkinId, setCheckinId] = useState<string | null>(null);
  const [guestName, setGuestName] = useState("");

  const filtered = rooms.filter((r) => r.number.includes(query));
  const occupied = rooms.filter((r) => r.status === "Occupied");
  const ready = rooms.filter((r) => r.status === "Ready for Guest");

  const checkoutRoom = rooms.find((r) => r.id === checkoutId);
  const checkinRoom = rooms.find((r) => r.id === checkinId);

  const confirmCheckout = () => {
    if (!checkoutId) return;
    dispatch({ type: "CHECKOUT", roomId: checkoutId });
    setCheckoutId(null);
  };

  const confirmCheckin = () => {
    if (!checkinId || !guestName.trim()) return;
    dispatch({ type: "CHECKIN", roomId: checkinId, guestName: guestName.trim() });
    setCheckinId(null);
    setGuestName("");
  };

  return (
    <div>
      <PageHeader
        eyebrow="العمليات اليومية"
        title="مكتب الاستقبال"
        subtitle="تسجيل الوصول والمغادرة بسرعة، وتحديث حالة الغرف فورًا لفريق الإشراف الداخلي."
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="غرف مشغولة" value={occupied.length} icon={DoorOpen} tone="indigo" />
        <StatCard label="جاهزة للاستقبال" value={ready.length} icon={Sparkles} tone="emerald" />
        <StatCard label="إجمالي الغرف" value={rooms.length} icon={ConciergeBell} tone="slate" />
        <StatCard label="مغادرات اليوم" value={occupied.filter((r) => r.lastCheckout).length} icon={LogOut} tone="amber" />
      </div>

      <div className="mt-6 mb-4">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="ابحث برقم الغرفة..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-11 pr-9"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={ConciergeBell} title="لا توجد غرف مطابقة" description="جرّب رقمًا آخر." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <div key={r.id} className="vx-card p-5 transition-all hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-display text-2xl font-bold tabular text-slate-900">{r.number}</div>
                  <div className="mt-0.5 text-xs text-slate-500">{r.type} · الطابق {r.floor}</div>
                </div>
                <RoomBadge status={r.status} />
              </div>

              <div className="mt-4 space-y-1.5 text-[11px] text-slate-500">
                <div className="flex justify-between">
                  <span>النزيل</span>
                  <span className="font-medium text-slate-700">{r.guestName ?? "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span>آخر مغادرة</span>
                  <span className="font-medium text-slate-700">{r.lastCheckout ?? "—"}</span>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                {r.status === "Occupied" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-rose-200 text-rose-700 hover:bg-rose-50"
                    onClick={() => setCheckoutId(r.id)}
                  >
                    <LogOut className="ml-1.5 h-3.5 w-3.5" /> تسجيل مغادرة
                  </Button>
                )}
                {r.status === "Ready for Guest" && (
                  <Button
                    size="sm"
                    className="flex-1 bg-teal-600 hover:bg-teal-700"
                    onClick={() => setCheckinId(r.id)}
                  >
                    <UserPlus className="ml-1.5 h-3.5 w-3.5" /> تسجيل وصول
                  </Button>
                )}
                {r.status !== "Occupied" && r.status !== "Ready for Guest" && (
                  <div className="flex-1 rounded-lg bg-slate-50 px-3 py-2 text-center text-[11px] text-slate-500">
                    غير متاحة حاليًا
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={!!checkoutId} onOpenChange={(o) => !o && setCheckoutId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تأكيد تسجيل المغادرة</DialogTitle>
            <DialogDescription>
              سيتم تحويل الغرفة {checkoutRoom?.number} إلى "بانتظار التنظيف" وإشعار فريق الإشراف الداخلي فورًا.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCheckoutId(null)}>إلغاء</Button>
            <Button className="bg-rose-600 hover:bg-rose-700" onClick={confirmCheckout}>
              تأكيد المغادرة
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!checkinId} onOpenChange={(o) => !o && setCheckinId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تسجيل وصول نزيل</DialogTitle>
            <DialogDescription>أدخل اسم النزيل لتسجيل الوصول في الغرفة {checkinRoom?.number}.</DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label>اسم النزيل</Label>
            <Input value={guestName} onChange={(e) => setGuestName(e.target.value)} placeholder="مثال: أحمد محمود" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCheckinId(null)}>إلغاء</Button>
            <Button className="bg-teal-600 hover:bg-teal-700" onClick={confirmCheckin}>تأكيد الوصول</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}