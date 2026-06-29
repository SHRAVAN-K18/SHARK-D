import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  // eslint-disable-next-line no-unused-vars
  useMotionValueEvent,
  // eslint-disable-next-line no-unused-vars
  useMotionValue,
} from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import AnimatedBackground from "../components/AnimatedBackground";

// ─── Data ───────────────────────────────────────────────────────────────────

const ROADMAP = [
  {
    phase: "Phase 1",
    period: "Q1 2025",
    status: "complete",
    title: "Concept & Architecture",
    items: [
      "System requirements definition",
      "Swarm protocol design",
      "Hardware platform selection",
    ],
  },
  {
    phase: "Phase 2",
    period: "Q2–Q3 2025",
    status: "complete",
    title: "Core Comms Framework",
    items: [
      "Mesh network prototype",
      "Encrypted telemetry link",
      "Ground control station v0.1",
    ],
  },
  {
    phase: "Phase 3",
    period: "Q4 2025–Q1 2026",
    status: "active",
    title: "Autonomy & Mission Planning",
    items: [
      "Edge AI inference engine",
      "Autonomous mission replanning",
      "Formation flight testing",
    ],
  },
  {
    phase: "Phase 4",
    period: "2026 onwards",
    status: "upcoming",
    title: "Scale & Deployment",
    items: [
      "50+ node swarm validation",
      "Comms-denied environment testing",
      "Partner programme launch",
    ],
  },
];

const VALUES = [
  {
    label: "Resilience",
    body: "Systems that keep operating when conditions degrade — comms-denied, GPS-jammed, or node-failed.",
  },
  {
    label: "Transparency",
    body: "Every decision the swarm makes is logged, explainable, and reviewable by the operator.",
  },
  {
    label: "Scalability",
    body: "Architectures that grow from 3 drones to 300 without fundamental redesign.",
  },
  {
    label: "Precision",
    body: "Centimetre-level accuracy in navigation, formation-keeping and anomaly detection.",
  },
];

// ─── Style maps ──────────────────────────────────────────────────────────────

const statusStyles = {
  complete: "border-green-500 text-green-400",
  active: "border-blue-500 text-blue-400",
  upcoming: "border-slate-600 text-slate-500",
};

const statusLabel = {
  complete: "Complete",
  active: "In Progress",
  upcoming: "Upcoming",
};

const DOT_COLORS = {
  complete: { ring: "#22c55e", glow: "rgba(34,197,94,0.35)", bg: "#22c55e" },
  active: { ring: "#3b82f6", glow: "rgba(59,130,246,0.45)", bg: "#3b82f6" },
  upcoming: { ring: "#475569", glow: "rgba(71,85,105,0.15)", bg: "#1e293b" },
};

// ─── Spring config ────────────────────────────────────────────────────────────
// Tight spring for line/dot position — tracks scroll closely.
// Card content uses a softer spring for an "easing in" feel.
const SPRING_TIGHT = { stiffness: 100, damping: 30, restDelta: 0.001 };
const SPRING_SOFT  = { stiffness: 60,  damping: 20, restDelta: 0.001 };

// ─── RoadmapItem ─────────────────────────────────────────────────────────────
/**
 * Each item owns its own scroll observer.
 * `useScroll` with `offset: ["start 85%", "start 35%"]` means:
 *   progress 0 → item's top edge is at 85% of the viewport (just entering)
 *   progress 1 → item's top edge is at 35% of the viewport (well into view)
 *
 * This gives a natural, staggerless reveal that is perfectly tied to actual
 * scroll position — no thresholds, no global synchronization required.
 */
function RoadmapItem({ item }) {
  const ref = useRef(null);
  const colors = DOT_COLORS[item.status];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 88%", "start 30%"],
  });

  // Smooth the raw scroll progress once — everything else derives from this.
  const progress = useSpring(scrollYProgress, SPRING_TIGHT);

  // Derived values — all from a single smooth source of truth.
  const dotScale   = useTransform(progress, [0, 1], [0.5, 1]);
  const dotOpacity = useTransform(progress, [0, 0.4], [0.2, 1]);
  const glowOpacity = useTransform(progress, [0.5, 1], [0, 1]);

  // Card: slides up and fades in
  const cardY       = useTransform(progress, [0, 1], [20, 0]);
  const cardOpacity = useTransform(progress, [0, 0.5], [0, 1]);
  const cardYSpring = useSpring(cardY, SPRING_SOFT);

  // Period label
  const periodOpacity = useTransform(progress, [0.1, 0.7], [0, 1]);

  return (
    <div ref={ref} className="relative flex gap-8">
      {/* Period */}
      <div className="shrink-0 w-[72px] text-right pt-1">
        <motion.p
          className="text-slate-600 text-xs font-mono"
          style={{ opacity: periodOpacity }}
        >
          {item.period}
        </motion.p>
      </div>

      {/* Dot column */}
      <div className="relative flex items-start shrink-0">
        {/* Subtle glow halo */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            opacity: glowOpacity,
            boxShadow: `0 0 14px 5px ${colors.glow}`,
          }}
        />

        {/* Pulsing ring for "active" status — only renders when item is visible */}
        {item.status === "active" && (
          <motion.div
            className="absolute -inset-1.5 rounded-full border border-blue-500/30"
            style={{ opacity: glowOpacity }}
            animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        )}

        {/* Dot */}
        <motion.div
          className="mt-1 w-3 h-3 rounded-full shrink-0 z-10 border-2"
          style={{
            scale: dotScale,
            opacity: dotOpacity,
            backgroundColor: colors.bg,
            borderColor: colors.ring,
          }}
        />
      </div>

      {/* Card content */}
      <motion.div
        className="pb-10"
        style={{ y: cardYSpring, opacity: cardOpacity }}
      >
        <div className="flex items-center gap-3 mb-2">
          <p className="text-white font-bold">{item.title}</p>
          <motion.span
            className={`text-[10px] uppercase tracking-widest border px-2 py-0.5 ${statusStyles[item.status]}`}
            style={{ opacity: glowOpacity }}
          >
            {statusLabel[item.status]}
          </motion.span>
        </div>

        <p className="text-slate-600 text-xs uppercase tracking-widest mb-3">
          {item.phase}
        </p>

        <ul className="space-y-1">
          {item.items.map((it, i) => (
            <motion.li
              key={it}
              className="text-slate-400 text-sm flex gap-2"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: 0.05 + i * 0.07, ease: "easeOut" }}
            >
              <span className="text-slate-700">—</span>
              {it}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const roadmapRef = useRef(null);

  /**
   * The vertical line tracks the entire roadmap section.
   * offset: ["start 80%", "end 60%"] means the line starts drawing as the
   * section enters the viewport and finishes just before the section exits.
   */
  const { scrollYProgress: lineProgress } = useScroll({
    target: roadmapRef,
    offset: ["start 80%", "end 60%"],
  });

  // One spring for the line — tight so it tracks accurately, no jitter.
  const smoothLine = useSpring(lineProgress, SPRING_TIGHT);

  // Glowing tip: hide at the very start and end of the section.
  const tipOpacity = useTransform(
    smoothLine,
    [0, 0.04, 0.96, 1],
    [0, 1, 1, 0]
  );

  return (
    <PageWrapper>
      <div className="min-h-screen bg-transparent text-white w-full">

        {/* ── Hero ── */}
        <div className="relative pt-40 pb-24 border-b border-slate-800/50 w-full">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950 opacity-60" />
          <AnimatedBackground density={0.00005} color="59,130,246" maxDist={130} />
          <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <p className="text-blue-400 text-xs uppercase tracking-[6px] mb-5">About</p>
              <h1 className="text-5xl lg:text-6xl font-black leading-tight max-w-3xl">
                Building the Autonomous
                <br />
                <span className="text-blue-400">Swarm Stack</span>
              </h1>
              <p className="text-slate-400 text-lg mt-6 max-w-2xl leading-relaxed">
                SHARK'D is a swarm drone initiative developing the full-stack
                technology required for large-scale, intelligent, autonomous
                aerial operations — from airframe hardware to coordinating AI.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 py-24 space-y-28">

          {/* ── Mission & Vision ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-16"
          >
            <div>
              <p className="text-blue-400 text-xs uppercase tracking-[5px] mb-4">Mission</p>
              <h2 className="text-3xl font-black">Why We Exist</h2>
              <p className="text-slate-400 mt-5 text-base leading-relaxed">
                Most drone platforms are single-unit systems operated by trained
                pilots. SHARK'D exists to change that paradigm — to build systems
                where a single operator can task a swarm of dozens of drones and
                trust them to execute, adapt, and report back without
                micromanagement.
              </p>
            </div>
            <div>
              <p className="text-blue-400 text-xs uppercase tracking-[5px] mb-4">Vision</p>
              <h2 className="text-3xl font-black">Where We're Going</h2>
              <p className="text-slate-400 mt-5 text-base leading-relaxed">
                A world where autonomous aerial swarms are a standard tool for
                surveillance, rescue, inspection, and precision operations — as
                routine and reliable as GPS navigation is today.
              </p>
            </div>
          </motion.div>

          {/* ── Core values ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-blue-400 text-xs uppercase tracking-[5px] mb-4">Principles</p>
            <h2 className="text-3xl font-black mb-10">What We Build By</h2>
            <div className="grid md:grid-cols-2 gap-px bg-slate-800 border border-slate-800 relative overflow-hidden">
              <AnimatedBackground density={0.00004} color="59,130,246" maxDist={100} />
              {VALUES.map((v) => (
                <div
                  key={v.label}
                  className="bg-slate-950 p-8 hover:bg-slate-900 transition-colors duration-200"
                >
                  <p className="text-white font-bold text-lg">{v.label}</p>
                  <p className="text-slate-400 text-sm mt-3 leading-relaxed">{v.body}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Roadmap ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden border border-slate-800/40 p-8 -mx-8"
          >
            <AnimatedBackground density={0.00004} color="59,130,246" maxDist={120} />

            <div className="relative z-10">
              <p className="text-blue-400 text-xs uppercase tracking-[5px] mb-4">Roadmap</p>
              <h2 className="text-3xl font-black mb-12">Development Timeline</h2>

              {/* Timeline scroll target */}
              <div className="relative" ref={roadmapRef}>

                {/* Static track */}
                <div className="absolute left-[88px] top-1 bottom-0 w-px bg-slate-800/60" />

                {/* Animated fill — scaleY driven by a single smoothLine spring */}
                <motion.div
                  className="absolute left-[88px] top-1 bottom-0 w-px origin-top"
                  style={{
                    scaleY: smoothLine,
                    background:
                      "linear-gradient(to bottom, #22c55e 0%, #22c55e 45%, #3b82f6 55%, #3b82f6 75%, #475569 100%)",
                    boxShadow: "0 0 8px 1px rgba(59,130,246,0.3)",
                  }}
                />

                {/* Glowing tip — top is derived from the same smoothLine */}
                <motion.div
                  className="absolute left-[84px] w-2 h-2 rounded-full z-20 pointer-events-none"
                  style={{
                    top: useTransform(
                      smoothLine,
                      [0, 1],
                      ["1px", "calc(100% - 4px)"]
                    ),
                    opacity: tipOpacity,
                    background: "#3b82f6",
                    boxShadow: "0 0 10px 5px rgba(59,130,246,0.65)",
                  }}
                />

                {/* Items — each self-contained with its own scroll observer */}
                <div className="space-y-0">
                  {ROADMAP.map((item) => (
                    <RoadmapItem key={item.phase} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </PageWrapper>
  );
}