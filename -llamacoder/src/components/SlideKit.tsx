import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function SlideHeader({
  number,
  title,
  subtitle,
}: {
  number: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="relative mb-10 overflow-hidden rounded-2xl border border-[#D6B779]/25 bg-gradient-to-l from-[#263C35]/60 via-[#101D2D] to-[#101D2D] p-6 lg:p-8">
      <div className="pointer-events-none absolute -top-16 left-1/3 h-48 w-48 rounded-full bg-[#D6B779]/12 blur-3xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#D6B779 1px, transparent 1px), linear-gradient(90deg, #D6B779 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-3 flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D6B779]"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#D6B779]/15 text-[10px] font-bold text-[#D6B779] ring-1 ring-[#D6B779]/40">
            {number}
          </span>
          دراسة الجدوى التسويقية
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.05 }}
          className="font-display text-2xl font-bold tracking-tight text-[#F5F4F0] lg:text-[2.2rem] lg:leading-[1.2]"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.12 }}
            className="mt-4 max-w-3xl text-sm leading-relaxed text-[#F5F4F0]/65 lg:text-[15px]"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}

export function Section({
  title,
  icon: Icon,
  children,
  className,
  delay = 0,
}: {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: EASE, delay }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-[#D6B779]/18 bg-[#F5F4F0]/[0.03] backdrop-blur-sm transition-all duration-300 hover:border-[#D6B779]/40 hover:bg-[#F5F4F0]/[0.05]",
        className
      )}
    >
      <header className="flex items-center gap-3 border-b border-[#D6B779]/15 px-5 py-4">
        {Icon && (
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#D6B779] text-[#101D2D] shadow-sm transition-transform duration-300 group-hover:scale-105">
            <Icon className="h-4 w-4" />
          </span>
        )}
        <h2 className="font-display text-sm font-semibold tracking-tight text-[#F5F4F0]">
          {title}
        </h2>
      </header>
      <div className="p-5">{children}</div>
    </motion.section>
  );
}

export function Bullets({ items }: { items: (string | ReactNode)[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((it, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: 8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, ease: EASE, delay: i * 0.04 }}
          className="flex gap-3 text-sm leading-relaxed text-[#F5F4F0]/80"
        >
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D6B779]" />
          <span>{it}</span>
        </motion.li>
      ))}
    </ul>
  );
}

export function NumberedList({ items }: { items: (string | ReactNode)[] }) {
  return (
    <ol className="space-y-3">
      {items.map((it, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: 8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, ease: EASE, delay: i * 0.05 }}
          className="flex gap-3 text-sm leading-relaxed text-[#F5F4F0]/80"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#D6B779]/15 text-[11px] font-bold text-[#D6B779]">
            {i + 1}
          </span>
          <span className="pt-0.5">{it}</span>
        </motion.li>
      ))}
    </ol>
  );
}

export function Table({
  headers,
  rows,
}: {
  headers: string[];
  rows: (string | ReactNode)[][];
}) {
  return (
    <div className="vx-scroll -mx-5 overflow-x-auto">
      <table className="w-full border-collapse text-right text-sm">
        <thead>
          <tr className="border-b border-[#D6B779]/25 bg-[#D6B779]/8">
            {headers.map((h) => (
              <th
                key={h}
                className="whitespace-nowrap px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#D6B779]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#D6B779]/10">
          {rows.map((r, i) => (
            <motion.tr
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="transition-colors hover:bg-[#D6B779]/8"
            >
              {r.map((c, j) => (
                <td key={j} className="px-4 py-3 align-top text-[#F5F4F0]/80">
                  {c}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Callout({
  tone = "brand",
  title,
  children,
}: {
  tone?: "brand" | "amber" | "rose" | "indigo" | "emerald";
  title?: string;
  children: ReactNode;
}) {
  const tones = {
    brand: "border-[#D6B779]/45 bg-[#D6B779]/10 text-[#F5F4F0]",
    amber: "border-amber-400/40 bg-amber-400/10 text-amber-100",
    rose: "border-rose-400/40 bg-rose-400/10 text-rose-100",
    indigo: "border-indigo-400/40 bg-indigo-400/10 text-indigo-100",
    emerald: "border-[#263C35] bg-[#263C35]/50 text-[#F5F4F0]",
  }[tone];
  const dot = {
    brand: "bg-[#D6B779]",
    amber: "bg-amber-400",
    rose: "bg-rose-400",
    indigo: "bg-indigo-400",
    emerald: "bg-[#D6B779]",
  }[tone];
  return (
    <div className={cn("relative rounded-xl border p-4 pl-5", tones)}>
      <span className={cn("absolute right-0 top-4 h-6 w-1 rounded-l-full", dot)} />
      {title && <div className="mb-1 text-sm font-semibold">{title}</div>}
      <div className="text-sm leading-relaxed opacity-90">{children}</div>
    </div>
  );
}

export function StatPill({
  label,
  value,
  tone = "brand",
  delay = 0,
}: {
  label: string;
  value: string;
  tone?: "brand" | "amber" | "rose" | "indigo" | "emerald";
  delay?: number;
}) {
  const tones = {
    brand: "bg-[#D6B779]/12 text-[#F5F4F0] ring-[#D6B779]/40",
    amber: "bg-amber-400/10 text-amber-100 ring-amber-400/30",
    rose: "bg-rose-400/10 text-rose-100 ring-rose-400/30",
    indigo: "bg-indigo-400/10 text-indigo-100 ring-indigo-400/30",
    emerald: "bg-[#263C35]/60 text-[#F5F4F0] ring-[#D6B779]/30",
  }[tone];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: EASE, delay }}
      className={cn("rounded-xl p-4 ring-1", tones)}
    >
      <div className="text-[11px] font-medium opacity-75">{label}</div>
      <div className="mt-1 font-display text-xl font-bold tabular">{value}</div>
    </motion.div>
  );
}