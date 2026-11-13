import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Platform", href: "#platform" },
  { label: "Modules", href: "#modules" },
  { label: "Workflow", href: "#workflow" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 24);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-[#D6B779]/15 bg-[#0a1420]/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:h-20 lg:px-10">
        <a href="#top" className="flex items-center" aria-label="VexOra home">
          <Logo variant="primary" />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm font-medium text-[#F5F4F0]/70 transition-colors hover:text-[#F5F4F0]"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-[#D6B779] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            variant="ghost"
            className="h-10 rounded-xl text-sm font-medium text-[#F5F4F0]/80 hover:bg-[#F5F4F0]/5 hover:text-[#F5F4F0]"
          >
            Sign in
          </Button>
          <Button className="group h-10 rounded-xl bg-[#D6B779] px-5 text-sm font-semibold text-[#101D2D] shadow-lg shadow-[#D6B779]/20 transition-all hover:bg-[#e6c98f]">
            Request demo
            <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#F5F4F0]/15 text-[#F5F4F0] lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="border-t border-[#D6B779]/15 bg-[#0a1420]/98 px-6 pb-8 pt-4 backdrop-blur-xl lg:hidden"
        >
          <nav className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-[#F5F4F0]/80 transition-colors hover:bg-[#F5F4F0]/5 hover:text-[#F5F4F0]"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            <Button
              variant="outline"
              className="h-11 rounded-xl border-[#F5F4F0]/20 bg-transparent text-sm font-semibold text-[#F5F4F0] hover:bg-[#F5F4F0]/5"
            >
              Sign in
            </Button>
            <Button className="h-11 rounded-xl bg-[#D6B779] text-sm font-semibold text-[#101D2D] hover:bg-[#e6c98f]">
              Request demo
            </Button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}