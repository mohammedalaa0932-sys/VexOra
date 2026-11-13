import { motion } from "framer-motion";
import { SlideBackdrop } from "@/components/Decorations";
import { cn } from "@/lib/utils";

export function SlideFrame({
  children,
  variant = "navy",
  className,
}: {
  children: React.ReactNode;
  variant?: "navy" | "emerald" | "amber" | "rose";
  className?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative overflow-hidden rounded-3xl border border-[#D6B779]/25 bg-[#101D2D] text-[#F5F4F0]",
        "shadow-[0_40px_100px_-40px_rgba(16,29,45,0.75)]",
        className
      )}
    >
      <SlideBackdrop variant={variant} />
      <div className="relative px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
        {children}
      </div>
    </motion.section>
  );
}