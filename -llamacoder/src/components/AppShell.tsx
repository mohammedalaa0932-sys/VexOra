import { useState } from "react";
import { useApp, type Role } from "@/store/AppContext";
import { roleLabels, roleShortLabels } from "@/lib/labels";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VexOraLockup } from "@/components/VexOraLogo";
import {
  LayoutDashboard,
  BedDouble,
  Sparkles,
  ConciergeBell,
  ChefHat,
  Package,
  ClipboardList,
  Bell,
  BarChart3,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  BookOpen,
} from "lucide-react";
import { OverviewPage } from "@/pages/OverviewPage";
import { RoomsPage } from "@/pages/RoomsPage";
import { HousekeepingPage } from "@/pages/HousekeepingPage";
import { ReceptionPage } from "@/pages/ReceptionPage";
import { KitchenPage } from "@/pages/KitchenPage";
import { InventoryPage } from "@/pages/InventoryPage";
import { RequestsPage } from "@/pages/RequestsPage";
import { NotificationsPage } from "@/pages/NotificationsPage";
import { ReportsPage } from "@/pages/ReportsPage";
import { StaffPage } from "@/pages/StaffPage";
import { SettingsPage } from "@/pages/SettingsPage";
import { FeasibilityPage } from "@/pages/FeasibilityPage";

export type PageId =
  | "overview"
  | "rooms"
  | "housekeeping"
  | "reception"
  | "kitchen"
  | "inventory"
  | "requests"
  | "notifications"
  | "reports"
  | "staff"
  | "settings"
  | "feasibility";

const navGroups: {
  label: string;
  items: { id: PageId; label: string; icon: typeof LayoutDashboard; roles: Role[] }[];
}[] = [
  {
    label: "العمليات اليومية",
    items: [
      { id: "overview", label: "نظرة عامة", icon: LayoutDashboard, roles: ["owner", "manager"] },
      { id: "reception", label: "الاستقبال", icon: ConciergeBell, roles: ["owner", "manager", "receptionist"] },
      { id: "housekeeping", label: "الإشراف الداخلي", icon: Sparkles, roles: ["owner", "manager", "housekeeping"] },
      { id: "kitchen", label: "المطبخ", icon: ChefHat, roles: ["owner", "manager", "kitchen"] },
    ],
  },
  {
    label: "الموارد والمخزون",
    items: [
      { id: "rooms", label: "إدارة الغرف", icon: BedDouble, roles: ["owner", "manager", "receptionist", "housekeeping"] },
      { id: "inventory", label: "المخزون", icon: Package, roles: ["owner", "manager", "warehouse", "kitchen", "housekeeping"] },
      { id: "requests", label: "الطلبات والمهام", icon: ClipboardList, roles: ["owner", "manager", "warehouse", "housekeeping", "kitchen"] },
    ],
  },
  {
    label: "الإدارة والتحليل",
    items: [
      { id: "notifications", label: "التنبيهات", icon: Bell, roles: ["owner", "manager", "receptionist", "housekeeping", "kitchen", "warehouse"] },
      { id: "reports", label: "التقارير والتحليلات", icon: BarChart3, roles: ["owner", "manager"] },
      { id: "staff", label: "إدارة الموظفين", icon: Users, roles: ["owner", "manager"] },
      { id: "settings", label: "الإعدادات", icon: Settings, roles: ["owner", "manager"] },
    ],
  },
  {
    label: "دراسة الجدوى",
    items: [
      { id: "feasibility", label: "دراسة الجدوى التسويقية", icon: BookOpen, roles: ["owner", "manager"] },
    ],
  },
];

export function AppShell({ onLogout }: { onLogout: () => void }) {
  const { role, dispatch, notifications } = useApp();
  const [page, setPage] = useState<PageId>("overview");
  const [mobileOpen, setMobileOpen] = useState(false);

  const unread = notifications.filter((n) => !n.read).length;

  const renderPage = () => {
    switch (page) {
      case "overview": return <OverviewPage onNavigate={setPage} />;
      case "rooms": return <RoomsPage />;
      case "housekeeping": return <HousekeepingPage />;
      case "reception": return <ReceptionPage />;
      case "kitchen": return <KitchenPage />;
      case "inventory": return <InventoryPage />;
      case "requests": return <RequestsPage />;
      case "notifications": return <NotificationsPage />;
      case "reports": return <ReportsPage />;
      case "staff": return <StaffPage />;
      case "settings": return <SettingsPage />;
      case "feasibility": return <FeasibilityPage />;
      default: return <OverviewPage onNavigate={setPage} />;
    }
  };

  const currentLabel =
    navGroups.flatMap((g) => g.items).find((i) => i.id === page)?.label ?? "نظرة عامة";

  return (
    <div dir="rtl" className="min-h-screen bg-[#f6f8fb] text-slate-900">
      <div className="flex">
        <aside
          className={cn(
            "fixed inset-y-0 right-0 z-40 flex w-72 shrink-0 flex-col border-l border-slate-200 bg-white transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
            mobileOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
          )}
        >
          <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5">
            <VexOraLockup size={38} tone="navy" subtitle="إدارة عمليات الفنادق" />
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <nav className="vx-scroll flex flex-1 flex-col gap-6 overflow-y-auto p-4">
            {navGroups.map((group) => {
              const items = group.items.filter((i) => i.roles.includes(role));
              if (items.length === 0) return null;
              return (
                <div key={group.label}>
                  <div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {group.label}
                  </div>
                  <div className="flex flex-col gap-1">
                    {items.map((item) => {
                      const active = page === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setPage(item.id);
                            setMobileOpen(false);
                          }}
                          className={cn(
                            "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-right text-sm transition-all",
                            active
                              ? "bg-teal-50 font-semibold text-teal-700 shadow-[inset_0_0_0_1px_rgba(13,148,136,0.15)]"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          )}
                        >
                          <span
                            className={cn(
                              "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                              active
                                ? "bg-teal-600 text-white"
                                : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                            )}
                          >
                            <item.icon className="h-4 w-4" />
                          </span>
                          <span className="flex-1">{item.label}</span>
                          {item.id === "notifications" && unread > 0 && (
                            <Badge className="border-0 bg-rose-500 text-white hover:bg-rose-500">
                              {unread}
                            </Badge>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="border-t border-slate-100 p-4">
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white">
                  {roleShortLabels[role].slice(0, 2)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-xs font-semibold text-slate-800">
                    {roleLabels[role]}
                  </div>
                  <div className="truncate text-[11px] text-slate-500">فندق جراند النيل</div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-3 w-full"
                onClick={onLogout}
              >
                <LogOut className="ml-2 h-3.5 w-3.5" /> تسجيل الخروج
              </Button>
            </div>
          </div>
        </aside>

        {mobileOpen && (
          <div
            className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/85 backdrop-blur">
            <div className="flex h-16 items-center gap-3 px-4 lg:px-8">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>

              <div className="hidden min-w-0 flex-1 items-center gap-3 md:flex">
                <div className="relative w-full max-w-md">
                  <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    placeholder="ابحث عن غرفة، طلب، أو صنف..."
                    className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/60 pr-9 pl-3 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-teal-300 focus:bg-white focus:ring-2 focus:ring-teal-100"
                  />
                </div>
              </div>

              <div className="flex flex-1 items-center justify-between gap-3 md:flex-none">
                <div className="min-w-0 md:hidden">
                  <div className="truncate text-xs text-slate-500">مساحة العمل</div>
                  <div className="truncate font-display text-sm font-semibold text-slate-900">
                    {currentLabel}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 sm:flex">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span className="text-xs text-slate-600">مباشر</span>
                  </div>

                  <button
                    onClick={() => setPage("notifications")}
                    className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50"
                  >
                    <Bell className="h-4 w-4" />
                    {unread > 0 && (
                      <span className="absolute -top-1 -left-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                        {unread}
                      </span>
                    )}
                  </button>

                  <Select
                    value={role}
                    onValueChange={(v) => dispatch({ type: "SET_ROLE", role: v as Role })}
                  >
                    <SelectTrigger className="h-10 w-40 border-slate-200 bg-white lg:w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(Object.keys(roleLabels) as Role[]).map((r) => (
                        <SelectItem key={r} value={r}>{roleLabels[r]}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </header>

          <main className="vx-fade-up p-4 lg:p-8" key={page}>
            {renderPage()}
          </main>
        </div>
      </div>
    </div>
  );
}