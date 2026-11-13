import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  BedDouble,
  Sparkles,
  ChefHat,
  Boxes,
  LayoutDashboard,
  ShieldCheck,
  Zap,
  TrendingUp,
  CheckCircle2,
  Star,
  Play,
  Building2,
  Users,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const GOLD = "#D6B779";
const NAVY = "#101D2D";

/* Real hotel photography (Unsplash CDN, high resolution, relevant) */
const IMG = {
  heroExterior:
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2400&q=80",
  heroLobby:
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=2000&q=80",
  heroRoom:
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=2000&q=80",
  reception:
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80",
  suite:
    "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1600&q=80",
  housekeeping:
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=80",
  kitchen:
    "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1600&q=80",
  pool:
    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1600&q=80",
  staff:
    "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?auto=format&fit=crop&w=1600&q=80",
  corridor:
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=80",
  dining:
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80",
  resort:
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=80",
};

/* ---------------- HERO ---------------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.85]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden bg-[#0a1420]"
    >
      {/* Cinematic background with Ken Burns */}
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { y, scale }}
      >
        <motion.img
          src={IMG.heroExterior}
          alt="Luxury hotel exterior at dusk"
          className="h-full w-full object-cover"
          initial={{ scale: 1.08 }}
          animate={reduce ? undefined : { scale: 1.18 }}
          transition={{ duration: 22, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          loading="eager"
        />
      </motion.div>

      {/* Layered overlays for readability */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-[#0a1420]/85 via-[#0a1420]/55 to-[#0a1420]"
        style={reduce ? undefined : { opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1420] via-[#0a1420]/40 to-transparent" />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            `linear-gradient(${GOLD} 1px, transparent 1px), linear-gradient(90deg, ${GOLD} 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />

      {/* Floating decorative orbs */}
      {!reduce && (
        <>
          <motion.div
            className="pointer-events-none absolute -top-20 right-1/4 h-96 w-96 rounded-full blur-3xl"
            style={{ background: `${GOLD}22` }}
            animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.1, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full blur-3xl"
            style={{ background: "#1f4d3faa" }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-32 pb-24 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-3xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D6B779]/35 bg-[#D6B779]/10 px-4 py-1.5 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#D6B779]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D6B779]">
              Smart Hotel Operations Platform
            </span>
          </div>

          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-[#F5F4F0] sm:text-5xl lg:text-7xl">
            Run every hotel
            <span className="block bg-gradient-to-r from-[#D6B779] via-[#f0d9a8] to-[#D6B779] bg-clip-text text-transparent">
              operation from one place.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#F5F4F0]/75 sm:text-lg">
            VexOra connects reception, housekeeping, kitchen, and inventory into a
            single intelligent system — so rooms turn over faster, supplies never
            run out, and every guest request is answered on time.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button
              size="lg"
              className="group h-12 rounded-xl bg-[#D6B779] px-7 text-sm font-semibold text-[#101D2D] shadow-lg shadow-[#D6B779]/25 transition-all hover:bg-[#e6c98f] hover:shadow-xl hover:shadow-[#D6B779]/35"
            >
              Request a live demo
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group h-12 rounded-xl border-[#F5F4F0]/25 bg-[#F5F4F0]/5 px-6 text-sm font-semibold text-[#F5F4F0] backdrop-blur-sm transition-all hover:border-[#D6B779]/60 hover:bg-[#F5F4F0]/10"
            >
              <Play className="mr-2 h-4 w-4 fill-current" />
              Watch 2-min tour
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-[#F5F4F0]/60">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#D6B779]" />
              No hardware required
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#D6B779]" />
              Deployed in under 48 hours
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#D6B779]" />
              Arabic & English support
            </div>
          </div>
        </motion.div>

        {/* Floating stat cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
          className="mt-16 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4"
        >
          {[
            { v: "38%", l: "Faster room turnover" },
            { v: "62%", l: "Fewer supply shortages" },
            { v: "24/7", l: "Live operations view" },
            { v: "4.9★", l: "Hotel partner rating" },
          ].map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.5 + i * 0.08 }}
              className="rounded-2xl border border-[#F5F4F0]/10 bg-[#F5F4F0]/[0.04] p-4 backdrop-blur-md"
            >
              <div className="font-display text-2xl font-bold text-[#D6B779]">
                {s.v}
              </div>
              <div className="mt-1 text-[11px] leading-snug text-[#F5F4F0]/65">
                {s.l}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      {!reduce && (
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex h-9 w-6 items-start justify-center rounded-full border border-[#F5F4F0]/30 p-1.5">
            <div className="h-1.5 w-1 rounded-full bg-[#D6B779]" />
          </div>
        </motion.div>
      )}
    </section>
  );
}

/* ---------------- TRUST BAR ---------------- */
function TrustBar() {
  const items = [
    "Boutique Hotels",
    "Resort Groups",
    "City Hotels",
    "Serviced Apartments",
    "Hospitality Groups",
  ];
  return (
    <section className="border-y border-[#D6B779]/15 bg-[#0a1420] py-6">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 lg:px-10">
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D6B779]/70">
          Built for
        </span>
        {items.map((x, i) => (
          <motion.span
            key={x}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="font-display text-sm font-medium text-[#F5F4F0]/45"
          >
            {x}
          </motion.span>
        ))}
      </div>
    </section>
  );
}

/* ---------------- FEATURES ---------------- */
const FEATURES = [
  {
    icon: BedDouble,
    title: "Room & Housekeeping Control",
    desc: "Reception marks a guest out — the room instantly appears as vacant for the cleaning team. No calls, no delays.",
    img: IMG.housekeeping,
    tone: "emerald",
  },
  {
    icon: ChefHat,
    title: "Kitchen Requisitions",
    desc: "Chefs submit ingredient and supply shortages directly through the platform. Requests reach the store in seconds.",
    img: IMG.kitchen,
    tone: "amber",
  },
  {
    icon: Boxes,
    title: "Smart Inventory Alerts",
    desc: "The system monitors stock levels and triggers automatic alerts the moment any item hits its minimum threshold.",
    img: IMG.corridor,
    tone: "rose",
  },
  {
    icon: LayoutDashboard,
    title: "Management Dashboard",
    desc: "Set available quantities, price items, and track every movement across departments from one live control panel.",
    img: IMG.reception,
    tone: "gold",
  },
];

function Features() {
  return (
    <section className="relative bg-[#0a1420] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-3xl"
        >
          <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D6B779]">
            Core Modules
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-[#F5F4F0] sm:text-4xl lg:text-5xl">
            Four connected modules.
            <span className="block text-[#F5F4F0]/45">One operational truth.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#F5F4F0]/60 sm:text-base">
            Every department works from the same live data — eliminating the
            WhatsApp groups, paper logs, and phone calls that slow hotels down.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {FEATURES.map((f, i) => (
            <motion.article
              key={f.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl border border-[#F5F4F0]/10 bg-[#F5F4F0]/[0.03] transition-colors hover:border-[#D6B779]/40"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={f.img}
                  alt={f.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1420] via-[#0a1420]/40 to-transparent" />
                <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-[#D6B779]/30 bg-[#0a1420]/70 backdrop-blur-md">
                  <f.icon className="h-5 w-5 text-[#D6B779]" />
                </div>
              </div>
              <div className="p-6 lg:p-7">
                <h3 className="font-display text-lg font-semibold text-[#F5F4F0]">
                  {f.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#F5F4F0]/60">
                  {f.desc}
                </p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#D6B779] opacity-0 transition-opacity group-hover:opacity-100">
                  Explore module
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- WORKFLOW ---------------- */
function Workflow() {
  const steps = [
    {
      n: "01",
      t: "Guest checks out",
      d: "Reception logs the departure in one tap.",
      img: IMG.reception,
    },
    {
      n: "02",
      t: "Room turns vacant",
      d: "Housekeeping sees the room as ready for cleaning instantly.",
      img: IMG.housekeeping,
    },
    {
      n: "03",
      t: "Shortages reported",
      d: "Staff record missing supplies directly from the room.",
      img: IMG.suite,
    },
    {
      n: "04",
      t: "Store restocks",
      d: "The inventory team receives the request and fulfils it.",
      img: IMG.corridor,
    },
  ];
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0a1420] via-[#101D2D] to-[#0a1420] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-3xl"
        >
          <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D6B779]">
            How It Works
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-[#F5F4F0] sm:text-4xl lg:text-5xl">
            From checkout to restock
            <span className="block text-[#F5F4F0]/45">in under four minutes.</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-3xl border border-[#F5F4F0]/10">
                <img
                  src={s.img}
                  alt={s.t}
                  loading="lazy"
                  className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1420] via-[#0a1420]/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="font-display text-3xl font-bold text-[#D6B779]/80">
                    {s.n}
                  </div>
                  <div className="mt-1 font-display text-base font-semibold text-[#F5F4F0]">
                    {s.t}
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed text-[#F5F4F0]/65">
                    {s.d}
                  </p>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-[#D6B779]/40 lg:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- DASHBOARD PREVIEW ---------------- */
function DashboardPreview() {
  const reduce = useReducedMotion();
  const stats = [
    { icon: Building2, label: "Rooms occupied", value: "142", tone: "text-emerald-400" },
    { icon: Sparkles, label: "Rooms to clean", value: "18", tone: "text-amber-400" },
    { icon: Boxes, label: "Low stock alerts", value: "3", tone: "text-rose-400" },
    { icon: Clock, label: "Avg. response", value: "2m 14s", tone: "text-[#D6B779]" },
  ];
  const rooms = [
    { n: "204", s: "Occupied", c: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30" },
    { n: "205", s: "Vacant", c: "bg-[#D6B779]/15 text-[#D6B779] border-[#D6B779]/30" },
    { n: "206", s: "Cleaning", c: "bg-amber-500/15 text-amber-300 border-amber-400/30" },
    { n: "207", s: "Occupied", c: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30" },
    { n: "208", s: "Maintenance", c: "bg-rose-500/15 text-rose-300 border-rose-400/30" },
    { n: "209", s: "Vacant", c: "bg-[#D6B779]/15 text-[#D6B779] border-[#D6B779]/30" },
  ];
  return (
    <section className="relative bg-[#0a1420] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="lg:col-span-5"
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D6B779]">
              Live Dashboard
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-[#F5F4F0] sm:text-4xl lg:text-5xl">
              See the whole hotel
              <span className="block text-[#F5F4F0]/45">at a single glance.</span>
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-[#F5F4F0]/60 sm:text-base">
              Managers get a real-time view of room status, housekeeping progress,
              kitchen requisitions, and inventory levels — updated the moment
              anything changes on the floor.
            </p>
            <ul className="mt-7 space-y-3">
              {[
                "Real-time room status across every floor",
                "Automatic low-stock alerts and reorder points",
                "Department-level performance tracking",
                "Full audit trail of every item movement",
              ].map((x, i) => (
                <motion.li
                  key={x}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.2 + i * 0.08 }}
                  className="flex items-start gap-3 text-sm text-[#F5F4F0]/75"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#D6B779]" />
                  {x}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="relative overflow-hidden rounded-3xl border border-[#D6B779]/25 bg-[#101D2D]/80 p-5 shadow-2xl shadow-black/50 backdrop-blur-xl lg:p-7">
              {/* Header */}
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D6B779]">
                    <LayoutDashboard className="h-4 w-4 text-[#101D2D]" />
                  </div>
                  <div>
                    <div className="font-display text-sm font-semibold text-[#F5F4F0]">
                      Operations Overview
                    </div>
                    <div className="text-[10px] text-[#F5F4F0]/50">
                      Grand Nile Hotel · Live
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-medium text-emerald-300">
                    Connected
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.3 + i * 0.08 }}
                    className="rounded-2xl border border-[#F5F4F0]/10 bg-[#F5F4F0]/[0.03] p-3.5"
                  >
                    <s.icon className={cn("h-4 w-4", s.tone)} />
                    <div className="mt-2 font-display text-xl font-bold text-[#F5F4F0]">
                      {s.value}
                    </div>
                    <div className="text-[10px] text-[#F5F4F0]/55">{s.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Room grid */}
              <div className="mt-5">
                <div className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D6B779]/80">
                  Room Status · Floor 2
                </div>
                <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-6">
                  {rooms.map((r, i) => (
                    <motion.div
                      key={r.n}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, ease: EASE, delay: 0.5 + i * 0.05 }}
                      whileHover={reduce ? undefined : { y: -3 }}
                      className={cn(
                        "rounded-xl border p-2.5 text-center",
                        r.c
                      )}
                    >
                      <div className="font-display text-sm font-bold">{r.n}</div>
                      <div className="mt-0.5 text-[9px] opacity-80">{r.s}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Alert strip */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.9 }}
                className="mt-5 flex items-center gap-3 rounded-2xl border border-rose-400/25 bg-rose-500/10 p-3.5"
              >
                <Boxes className="h-4 w-4 shrink-0 text-rose-300" />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-rose-200">
                    Low stock alert · Napkins
                  </div>
                  <div className="text-[10px] text-rose-200/70">
                    Minimum 500 · Remaining 100 · Reorder recommended
                  </div>
                </div>
                <Button
                  size="sm"
                  className="h-7 shrink-0 rounded-lg bg-rose-400/90 px-3 text-[10px] font-semibold text-[#101D2D] hover:bg-rose-300"
                >
                  Reorder
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- GALLERY ---------------- */
function Gallery() {
  const shots = [
    { src: IMG.heroLobby, label: "Reception & Lobby", span: "lg:col-span-2 lg:row-span-2" },
    { src: IMG.suite, label: "Suites & Rooms", span: "" },
    { src: IMG.dining, label: "Fine Dining", span: "" },
    { src: IMG.pool, label: "Resort & Pool", span: "lg:col-span-2" },
    { src: IMG.staff, label: "Hotel Teams", span: "" },
  ];
  return (
    <section className="bg-gradient-to-b from-[#0a1420] to-[#101D2D] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-3xl"
        >
          <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D6B779]">
            Built For Every Department
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-[#F5F4F0] sm:text-4xl lg:text-5xl">
            From the lobby
            <span className="block text-[#F5F4F0]/45">to the back of house.</span>
          </h2>
        </motion.div>

        <div className="mt-12 grid auto-rows-56 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {shots.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
              className={cn(
                "group relative overflow-hidden rounded-3xl border border-[#F5F4F0]/10",
                s.span
              )}
            >
              <img
                src={s.src}
                alt={s.label}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1420] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4">
                <div className="font-display text-sm font-semibold text-[#F5F4F0]">
                  {s.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- BENEFITS ---------------- */
function Benefits() {
  const items = [
    { icon: Zap, t: "Faster service", d: "Requests move between departments in seconds, not hours." },
    { icon: ShieldCheck, t: "Fewer mistakes", d: "One source of truth removes duplicate entries and lost notes." },
    { icon: TrendingUp, t: "Lower waste", d: "Smart thresholds prevent over-ordering and stock-outs." },
    { icon: Users, t: "Happier teams", d: "Staff spend less time chasing information and more time serving guests." },
  ];
  return (
    <section className="bg-[#0a1420] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="lg:col-span-5"
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D6B779]">
              Why Hotels Choose VexOra
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-[#F5F4F0] sm:text-4xl lg:text-5xl">
              Operational clarity,
              <span className="block text-[#F5F4F0]/45">measured every day.</span>
            </h2>
            <div className="mt-8 overflow-hidden rounded-3xl border border-[#F5F4F0]/10">
              <img
                src={IMG.resort}
                alt="Resort view"
                loading="lazy"
                className="h-64 w-full object-cover lg:h-80"
              />
            </div>
          </motion.div>

          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {items.map((x, i) => (
                <motion.div
                  key={x.t}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
                  whileHover={{ y: -5 }}
                  className="rounded-3xl border border-[#F5F4F0]/10 bg-[#F5F4F0]/[0.03] p-6 transition-colors hover:border-[#D6B779]/40"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#D6B779]/15">
                    <x.icon className="h-5 w-5 text-[#D6B779]" />
                  </div>
                  <h3 className="mt-4 font-display text-base font-semibold text-[#F5F4F0]">
                    {x.t}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#F5F4F0]/60">
                    {x.d}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
              className="mt-4 rounded-3xl border border-[#D6B779]/25 bg-gradient-to-br from-[#D6B779]/10 to-transparent p-6 lg:p-7"
            >
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-[#D6B779] text-[#D6B779]" />
                ))}
              </div>
              <p className="mt-4 font-display text-base leading-relaxed text-[#F5F4F0]/85 lg:text-lg">
                “Before VexOra, housekeeping updates lived in three different
                WhatsApp groups. Now the room status is simply correct — and our
                guests feel the difference.”
              </p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D6B779] font-display text-sm font-bold text-[#101D2D]">
                  AH
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#F5F4F0]">
                    Ahmed Hassan
                  </div>
                  <div className="text-[11px] text-[#F5F4F0]/55">
                    Operations Manager · Boutique Hotel, Cairo
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA ---------------- */
function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#0a1420] py-24 lg:py-32">
      <div className="absolute inset-0">
        <img
          src={IMG.heroExterior}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1420] via-[#0a1420]/85 to-[#0a1420]" />
      </div>
      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-[#D6B779]/35 bg-[#D6B779]/10 px-4 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#D6B779]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D6B779]">
              Ready When You Are
            </span>
          </div>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-[#F5F4F0] sm:text-4xl lg:text-5xl">
            Bring your hotel operations
            <span className="block bg-gradient-to-r from-[#D6B779] to-[#f0d9a8] bg-clip-text text-transparent">
              into a single system.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#F5F4F0]/65 sm:text-base">
            Book a 20-minute walkthrough with our team and see how VexOra fits
            your property — no commitment, no hardware, no disruption.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              className="group h-12 rounded-xl bg-[#D6B779] px-7 text-sm font-semibold text-[#101D2D] shadow-lg shadow-[#D6B779]/25 transition-all hover:bg-[#e6c98f] hover:shadow-xl hover:shadow-[#D6B779]/35"
            >
              Request a live demo
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-xl border-[#F5F4F0]/25 bg-[#F5F4F0]/5 px-6 text-sm font-semibold text-[#F5F4F0] backdrop-blur-sm transition-all hover:border-[#D6B779]/60 hover:bg-[#F5F4F0]/10"
            >
              Talk to sales
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- PAGE ---------------- */
export function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a1420] font-sans text-[#F5F4F0] antialiased">
      <Hero />
      <TrustBar />
      <Features />
      <Workflow />
      <DashboardPreview />
      <Gallery />
      <Benefits />
      <FinalCTA />
    </main>
  );
}