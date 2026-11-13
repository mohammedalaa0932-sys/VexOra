import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BedDouble,
  Sparkles,
  ChefHat,
  Boxes,
  Users,
  Settings,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

const NAV = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: BedDouble, label: "Rooms" },
  { icon: Sparkles, label: "Housekeeping" },
  { icon: ChefHat, label: "Kitchen" },
  { icon: Boxes, label: "Inventory" },
  { icon: Users, label: "Staff" },
  { icon: Settings, label: "Settings" },
];

export function DashboardSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-[#D6B779]/15 bg-[#0a1420] lg:flex">
      <div className="flex h-20 items-center border-b border-[#D6B779]/15 px-6">
        <Logo variant="primary" />
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {NAV.map((item, i) => (
          <motion.a
            key={item.label}
            href="#"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className={cn(
              "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              item.active
                ? "bg-[#D6B779]/15 text-[#D6B779]"
                : "text-[#F5F4F0]/60 hover:bg-[#F5F4F0]/5 hover:text-[#F5F4F0]"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </motion.a>
        ))}
      </nav>
      <div className="border-t border-[#D6B779]/15 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-[#F5F4F0]/[0.03] p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D6B779] font-display text-xs font-bold text-[#101D2D]">
            AH
          </div>
          <div className="min-w-0">
            <div className="truncate text-xs font-semibold text-[#F5F4F0]">
              Ahmed Hassan
            </div>
            <div className="truncate text-[10px] text-[#F5F4F0]/50">
              Operations Manager
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}