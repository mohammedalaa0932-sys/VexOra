import { useApp } from "@/store/AppContext";
import { PageHeader, Panel, StatCard, EmptyState } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { Bell, ShieldAlert, AlertTriangle, Info, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function NotificationsPage() {
  const { notifications, dispatch } = useApp();

  const unread = notifications.filter((n) => !n.read).length;
  const critical = notifications.filter((n) => n.severity === "critical").length;
  const warning = notifications.filter((n) => n.severity === "warning").length;

  const severityIcon = {
    critical: { icon: ShieldAlert, cls: "bg-rose-100 text-rose-700" },
    warning: { icon: AlertTriangle, cls: "bg-amber-100 text-amber-700" },
    info: { icon: Info, cls: "bg-sky-100 text-sky-700" },
  } as const;

  return (
    <div>
      <PageHeader
        eyebrow="الإدارة والتحليل"
        title="مركز التنبيهات"
        subtitle="كل التنبيهات التشغيلية في مكان واحد، مرتبة حسب الأولوية والوقت."
        actions={
          <Button variant="outline" onClick={() => dispatch({ type: "MARK_ALL_READ" })}>
            <CheckCheck className="ml-2 h-4 w-4" /> تعليم الكل كمقروء
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="إجمالي التنبيهات" value={notifications.length} icon={Bell} tone="slate" />
        <StatCard label="غير مقروء" value={unread} icon={Bell} tone="brand" />
        <StatCard label="حرجة" value={critical} icon={ShieldAlert} tone="rose" />
        <StatCard label="تحذيرية" value={warning} icon={AlertTriangle} tone="amber" />
      </div>

      <div className="mt-6">
        <Panel title="قائمة التنبيهات" hint={`${notifications.length} تنبيه`}>
          {notifications.length === 0 ? (
            <EmptyState icon={Bell} title="لا توجد تنبيهات" description="كل شيء يسير على ما يرام." />
          ) : (
            <div className="space-y-3">
              {notifications.map((n) => {
                const s = severityIcon[n.severity];
                return (
                  <div
                    key={n.id}
                    className={cn(
                      "flex items-start gap-4 rounded-xl border p-4 transition-all",
                      n.read ? "border-slate-100 bg-white" : "border-teal-100 bg-teal-50/40"
                    )}
                  >
                    <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", s.cls)}>
                      <s.icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-semibold text-slate-900">{n.title}</div>
                        {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />}
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-slate-600">{n.body}</p>
                      <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-400">
                        <span>{n.createdAt}</span>
                        <span>·</span>
                        <span>{n.category}</span>
                      </div>
                    </div>
                    {!n.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => dispatch({ type: "MARK_READ", id: n.id })}
                      >
                        تعليم كمقروء
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </Panel>
      </div>
    </div>
  );
}