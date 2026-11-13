import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "نظرة عامة", href: "#overview" },
  { label: "المزايا", href: "#features" },
  { label: "الهوية", href: "#brand" },
  { label: "الأسعار", href: "#pricing" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Logo variant="horizontal" />

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-[#B08F4E]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Button className="bg-[#0B1622] text-white hover:bg-[#1B2E45]">
          ابدأ الآن
        </Button>
      </div>
    </header>
  );
}