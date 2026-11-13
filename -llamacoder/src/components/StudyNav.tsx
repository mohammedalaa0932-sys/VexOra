import { cn } from "@/lib/utils";
import {
  BookOpen,
  Megaphone,
  Database,
  Users,
  ClipboardList,
  LineChart,
  CheckCircle2,
} from "lucide-react";

export type SectionId =
  | "intro"
  | "marketing"
  | "data"
  | "population"
  | "survey"
  | "demand"
  | "conclusion";

const items: { id: SectionId; label: string; icon: typeof BookOpen }[] = [
  { id: "intro", label: "أولاً: مدخل وتمهيد", icon: BookOpen },
  { id: "marketing", label: "ثانيًا: الدراسة التسويقية", icon: Megaphone },
  { id: "data", label: "ثالثًا: بيانات دراسة السوق", icon: Database },
  { id: "population", label: "رابعًا: مجتمع الدراسة", icon: Users },
  { id: "survey", label: "خامسًا: الاستبيان والفجوة", icon: ClipboardList },
  { id: "demand", label: "سادسًا: تقدير الطلب", icon: LineChart },
  { id: "conclusion", label: "سابعًا: الخلاصة والتوصية", icon: CheckCircle2 },
];

export function StudyNav({
  active,
  onChange,
}: {
  active: SectionId;
  onChange: (id: SectionId) => void;
}) {
  return (
    <nav className="lg:sticky lg:top-6 lg:h-fit lg:w-72 lg:shrink-0">
      <div className="rounded-2xl border border-stone-200 bg-white p-3 shadow-sm">
        <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-stone-400">
          محتويات الدراسة
        </div>
        <ul className="flex flex-col gap-1">
          {items.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onChange(item.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-right text-sm transition-colors",
                    isActive
                      ? "bg-teal-700 font-semibold text-white shadow-sm"
                      : "text-stone-600 hover:bg-teal-50 hover:text-teal-800"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-4 w-4 shrink-0",
                      isActive ? "text-emerald-200" : "text-teal-600"
                    )}
                  />
                  <span className="leading-snug">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}