import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { RoomStatus, RequestStatus, StockLevel } from "@/store/AppContext";

/* -------------------------------------------------------------------------- */
/*  Page header                                                               */
/* -------------------------------------------------------------------------- */

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  actions,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 border-b border-slate-200/70 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {eyebrow && (
          <div className="mb-1.5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-teal-700">
            <span className="h-1 w-1 rounded-full bg-teal-500" />
            {eyebrow}
          </div>
        )}
        <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Panel                                                                     */
/* -------------------------------------------------------------------------- */

export function Panel({
  title,
  hint,
  actions,
  children,
  className,
  bodyClassName,
}: {
  title?: string;
  hint?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section className={cn("vx-card overflow-hidden", className)}>
      {(title || actions) && (
        <header className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
          <div className="min-w-0">
            {title && (
              <h2 className="font-display text-sm font-semibold text-slate-900">{title}</h2>
            )}
            {hint && <p className="mt-0.5 text-xs text-slate-500">{hint}</p>}
          </div>
          {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
        </header>
      )}
      <div className={cn("p-5", bodyClassName)}>{children}</div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Stat card                                                                 */
/* -------------------------------------------------------------------------- */

const toneMap = {
  brand: { bg: "bg-teal-50", fg: "text-teal-700", ring: "ring-teal-100", bar: "bg-teal-500" },
  emerald: { bg: "bg-emerald-50", fg: "text-emerald-700", ring: "ring-emerald-100", bar: "bg-emerald-500" },
  amber: { bg: "bg-amber-50", fg: "text-amber-700", ring: "ring-amber-100", bar: "bg-amber-500" },
  rose: { bg: "bg-rose-50", fg: "text-rose-700", ring: "ring-rose-100", bar: "bg-rose-500" },
  indigo: { bg: "bg-indigo-50", fg: "text-indigo-700", ring: "ring-indigo-100", bar: "bg-indigo-500" },
  slate: { bg: "bg-slate-100", fg: "text-slate-700", ring: "ring-slate-200", bar: "bg-slate-500" },
} as const;

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "brand",
  trend,
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
  tone?: keyof typeof toneMap;
  trend?: { value: string; positive?: boolean };
}) {
  const t = toneMap[tone];
  return (
    <div className="vx-card group relative overflow-hidden p-5 transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className={cn("absolute inset-x-0 top-0 h-0.5", t.bar)} />
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs font-medium text-slate-500">{label}</div>
          <div className="mt-2 font-display text-2xl font-bold tabular text-slate-900">
            {value}
          </div>
          {hint && <div className="mt-1 text-[11px] text-slate-400">{hint}</div>}
        </div>
        <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1", t.bg, t.fg, t.ring)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {trend && (
        <div className={cn("mt-3 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium", trend.positive ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700")}>
          {trend.value}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Badges                                                                    */
/* -------------------------------------------------------------------------- */

const roomStatusMap: Record<string, { label: string; cls: string; dot: string }> = {
  "Occupied": { label: "مشغولة", cls: "bg-indigo-50 text-indigo-700 ring-indigo-100", dot: "bg-indigo-500" },
  "Waiting for Cleaning": { label: "بانتظار التنظيف", cls: "bg-rose-50 text-rose-700 ring-rose-100", dot: "bg-rose-500" },
  "Cleaning in Progress": { label: "جارٍ التنظيف", cls: "bg-amber-50 text-amber-700 ring-amber-100", dot: "bg-amber-500" },
  "Waiting for Inspection": { label: "بانتظار الفحص", cls: "bg-sky-50 text-sky-700 ring-sky-100", dot: "bg-sky-500" },
  "Ready for Guest": { label: "جاهزة للنزيل", cls: "bg-emerald-50 text-emerald-700 ring-emerald-100", dot: "bg-emerald-500" },
  "Out of Service": { label: "خارج الخدمة", cls: "bg-slate-100 text-slate-600 ring-slate-200", dot: "bg-slate-400" },
};

export function RoomBadge({ status }: { status: RoomStatus }) {
  const s = roomStatusMap[status] ?? {
    label: String(status ?? "غير معروف"),
    cls: "bg-slate-100 text-slate-600 ring-slate-200",
    dot: "bg-slate-400",
  };
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ring-1", s.cls)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
      {s.label}
    </span>
  );
}

const requestStatusMap: Record<string, { label: string; cls: string; dot: string }> = {
  "Pending": { label: "قيد الانتظار", cls: "bg-amber-50 text-amber-700 ring-amber-100", dot: "bg-amber-500" },
  "Approved": { label: "تمت الموافقة", cls: "bg-sky-50 text-sky-700 ring-sky-100", dot: "bg-sky-500" },
  "Fulfilled": { label: "تم التسليم", cls: "bg-emerald-50 text-emerald-700 ring-emerald-100", dot: "bg-emerald-500" },
  "Rejected": { label: "مرفوض", cls: "bg-rose-50 text-rose-700 ring-rose-100", dot: "bg-rose-500" },
};

export function RequestBadge({ status }: { status: RequestStatus }) {
  const s = requestStatusMap[status] ?? {
    label: String(status ?? "غير معروف"),
    cls: "bg-slate-100 text-slate-600 ring-slate-200",
    dot: "bg-slate-400",
  };
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ring-1", s.cls)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
      {s.label}
    </span>
  );
}

const stockLevelMap: Record<string, { label: string; cls: string; dot: string }> = {
  "Normal": { label: "طبيعي", cls: "bg-emerald-50 text-emerald-700 ring-emerald-100", dot: "bg-emerald-500" },
  "Low Stock": { label: "منخفض", cls: "bg-amber-50 text-amber-700 ring-amber-100", dot: "bg-amber-500" },
  "Critical": { label: "حرج", cls: "bg-rose-50 text-rose-700 ring-rose-100", dot: "bg-rose-500" },
  "Out of Stock": { label: "نفد", cls: "bg-slate-800 text-white ring-slate-800", dot: "bg-white" },
};

export function StockBadge({ level }: { level: StockLevel }) {
  const s = stockLevelMap[level] ?? {
    label: String(level ?? "غير معروف"),
    cls: "bg-slate-100 text-slate-600 ring-slate-200",
    dot: "bg-slate-400",
  };
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ring-1", s.cls)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
      {s.label}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Data table                                                                */
/* -------------------------------------------------------------------------- */

export function DataTable({
  headers,
  children,
}: {
  headers: string[];
  children: ReactNode;
}) {
  return (
    <div className="vx-scroll -mx-5 overflow-x-auto">
      <table className="w-full min-w-full border-collapse text-right text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/60">
            {headers.map((h) => (
              <th
                key={h}
                className="whitespace-nowrap px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">{children}</tbody>
      </table>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Progress bar                                                              */
/* -------------------------------------------------------------------------- */

export function ProgressBar({
  value,
  tone = "brand",
}: {
  value: number;
  tone?: "brand" | "emerald" | "amber" | "rose" | "indigo";
}) {
  const bar = {
    brand: "bg-teal-500",
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    rose: "bg-rose-500",
    indigo: "bg-indigo-500",
  }[tone];
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
      <div
        className={cn("h-full rounded-full transition-all duration-500", bar)}
        style={{ width: `${Math.max(2, Math.min(100, value))}%` }}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Empty state                                                               */
/* -------------------------------------------------------------------------- */

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/40 px-6 py-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm ring-1 ring-slate-100">
        <Icon className="h-5 w-5" />
      </div>
      <div className="mt-4 font-display text-sm font-semibold text-slate-800">{title}</div>
      {description && (
        <p className="mt-1 max-w-sm text-xs leading-relaxed text-slate-500">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}