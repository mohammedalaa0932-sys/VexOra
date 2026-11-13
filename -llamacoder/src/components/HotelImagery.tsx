import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Curated Unsplash hotel photography (stable direct URLs).
 * All images are lazy-loaded and use object-cover for consistent crops.
 */
export const HOTEL_IMAGES = {
  exterior:
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=70",
  lobby:
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1600&q=70",
  suite:
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1600&q=70",
  pool:
    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1600&q=70",
  dining:
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=70",
  kitchen:
    "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1600&q=70",
  housekeeping:
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=70",
  staff:
    "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?auto=format&fit=crop&w=1600&q=70",
  corridor:
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=70",
  reception:
    "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1600&q=70",
} as const;

export type HotelImageKey = keyof typeof HOTEL_IMAGES;

export function HotelImage({
  src,
  alt,
  className,
  imgClassName,
  overlay = "none",
  priority = false,
  kenBurns = false,
  zoomOnHover = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  overlay?: "none" | "soft" | "strong" | "gradient";
  priority?: boolean;
  kenBurns?: boolean;
  zoomOnHover?: boolean;
}) {
  const reduce = useReducedMotion();

  const overlays = {
    none: "",
    soft: "bg-[#101D2D]/35",
    strong: "bg-[#101D2D]/65",
    gradient:
      "bg-gradient-to-t from-[#101D2D] via-[#101D2D]/55 to-transparent",
  }[overlay];

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={cn(
          "h-full w-full object-cover",
          zoomOnHover && !reduce && "transition-transform duration-700 ease-out will-change-transform",
          imgClassName
        )}
        initial={kenBurns && !reduce ? { scale: 1.06 } : undefined}
        animate={
          kenBurns && !reduce
            ? { scale: [1.06, 1.16, 1.06] }
            : undefined
        }
        transition={
          kenBurns && !reduce
            ? { duration: 26, repeat: Infinity, ease: "easeInOut" }
            : undefined
        }
        whileHover={zoomOnHover && !reduce ? { scale: 1.06 } : undefined}
      />
      {overlay !== "none" && (
        <div className={cn("pointer-events-none absolute inset-0", overlays)} />
      )}
    </div>
  );
}

export function ImageTile({
  imageKey,
  title,
  subtitle,
  className,
  delay = 0,
  aspect = "aspect-4/3",
}: {
  imageKey: HotelImageKey;
  title: string;
  subtitle: string;
  className?: string;
  delay?: number;
  aspect?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
      whileHover={reduce ? undefined : { y: -6 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-[#D6B779]/20 bg-[#101D2D] shadow-[0_20px_50px_-25px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      <HotelImage
        src={HOTEL_IMAGES[imageKey]}
        alt={title}
        className={cn("w-full", aspect)}
        overlay="gradient"
        zoomOnHover
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5">
        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D6B779]">
          {subtitle}
        </div>
        <div className="mt-1 font-display text-base font-bold text-[#F5F4F0]">
          {title}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-[#D6B779]/0 transition-all duration-500 group-hover:ring-[#D6B779]/40" />
    </motion.div>
  );
}