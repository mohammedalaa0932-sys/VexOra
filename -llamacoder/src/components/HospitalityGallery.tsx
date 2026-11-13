import { motion, useReducedMotion } from "framer-motion";
import { ImageTile, type HotelImageKey } from "@/components/HotelImagery";

const TILES: {
  key: HotelImageKey;
  title: string;
  subtitle: string;
  span: string;
  aspect: string;
}[] = [
  {
    key: "lobby",
    title: "الاستقبال واللوبي",
    subtitle: "Front Office",
    span: "lg:col-span-2 lg:row-span-2",
    aspect: "aspect-4/3 lg:aspect-auto lg:h-full",
  },
  {
    key: "suite",
    title: "الأجنحة والغرف",
    subtitle: "Housekeeping",
    span: "lg:col-span-1",
    aspect: "aspect-4/3",
  },
  {
    key: "kitchen",
    title: "المطبخ والتغذية",
    subtitle: "Kitchen Ops",
    span: "lg:col-span-1",
    aspect: "aspect-4/3",
  },
  {
    key: "pool",
    title: "المرافق والمنتجع",
    subtitle: "Facilities",
    span: "lg:col-span-1",
    aspect: "aspect-4/3",
  },
  {
    key: "dining",
    title: "المطاعم الفاخرة",
    subtitle: "Fine Dining",
    span: "lg:col-span-1",
    aspect: "aspect-4/3",
  },
  {
    key: "staff",
    title: "فريق العمل",
    subtitle: "Service Team",
    span: "lg:col-span-2",
    aspect: "aspect-16/9",
  },
];

export function HospitalityGallery() {
  const reduce = useReducedMotion();
  return (
    <section className="mt-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-6 flex flex-wrap items-end justify-between gap-4"
      >
        <div>
          <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D6B779]">
            <span className="h-px w-8 bg-[#D6B779]/60" />
            Hospitality Context
          </div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-[#F5F4F0] lg:text-3xl">
            بيئة التشغيل الفندقي
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#F5F4F0]/60">
            نظرة على الأقسام التي يخدمها نظام VexOra داخل الفندق — من الاستقبال إلى
            المطبخ والمخازن والمرافق.
          </p>
        </div>
      </motion.div>

      <div className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TILES.map((t, i) => (
          <ImageTile
            key={t.key}
            imageKey={t.key}
            title={t.title}
            subtitle={t.subtitle}
            className={t.span}
            aspect={t.aspect}
            delay={reduce ? 0 : i * 0.06}
          />
        ))}
      </div>
    </section>
  );
}