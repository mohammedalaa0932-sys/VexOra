import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function SectionShell({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl border border-teal-100 bg-gradient-to-l from-teal-50 to-emerald-50/60 p-6 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-wide text-teal-700">
          {eyebrow}
        </div>
        <h2 className="mt-1 font-serif text-2xl font-bold text-teal-900 lg:text-3xl">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

export function Block({
  title,
  children,
  tone = "default",
}: {
  title: string;
  children: ReactNode;
  tone?: "default" | "amber" | "rose";
}) {
  const tones = {
    default: "border-stone-200 bg-white",
    amber: "border-amber-200 bg-amber-50/60",
    rose: "border-rose-200 bg-rose-50/60",
  };
  return (
    <Card className={cn("shadow-sm", tones[tone])}>
      <CardHeader className="pb-3">
        <CardTitle className="font-serif text-lg text-stone-800">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm leading-relaxed text-stone-700">
        {children}
      </CardContent>
    </Card>
  );
}

export function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-stone-200">
      <table className="w-full border-collapse text-right text-sm">
        <thead>
          <tr className="bg-teal-700 text-white">
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={cn(
                "border-t border-stone-200",
                i % 2 === 0 ? "bg-white" : "bg-stone-50"
              )}
            >
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 align-top text-stone-700">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Callout({
  children,
  tone = "teal",
}: {
  children: ReactNode;
  tone?: "teal" | "amber";
}) {
  const tones = {
    teal: "border-r-4 border-teal-600 bg-teal-50 text-teal-900",
    amber: "border-r-4 border-amber-500 bg-amber-50 text-amber-900",
  };
  return (
    <div className={cn("rounded-lg p-4 text-sm leading-relaxed", tones[tone])}>
      {children}
    </div>
  );
}

export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Numbered({ items }: { items: ReactNode[] }) {
  return (
    <ol className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-700 text-xs font-bold text-white">
            {i + 1}
          </span>
          <span className="pt-0.5">{item}</span>
        </li>
      ))}
    </ol>
  );
}