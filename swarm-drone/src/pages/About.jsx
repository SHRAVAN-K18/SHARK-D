import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";

/*
  IMAGE SPECS FOR ABOUT PAGE
  ─────────────────────────────────────────────────────
  Hero banner (top of page)
    File     : /public/images/about-hero.jpg
    Size     : 1920 × 640 px
    Content  : Aerial landscape shot at dusk/dawn, OR
               close-up of drone hardware on a workbench.
               High-contrast, cinematic.
    Placement: Full-width behind the page header, h-[400px],
               dark overlay so text stays legible.

  Team member portraits (if real photos available)
    File     : /public/team/[name].jpg
    Size     : 400 × 400 px (square, cropped to face)
    Style    : Neutral dark background, professional
  ─────────────────────────────────────────────────────
*/

const ROADMAP = [
  {
    phase: "Phase 1",
    period: "Q1 2025",
    status: "complete",
    title: "Concept & Architecture",
    items: ["System requirements definition", "Swarm protocol design", "Hardware platform selection"],
  },
  {
    phase: "Phase 2",
    period: "Q2–Q3 2025",
    status: "complete",
    title: "Core Comms Framework",
    items: ["Mesh network prototype", "Encrypted telemetry link", "Ground control station v0.1"],
  },
  {
    phase: "Phase 3",
    period: "Q4 2025–Q1 2026",
    status: "active",
    title: "Autonomy & Mission Planning",
    items: ["Edge AI inference engine", "Autonomous mission replanning", "Formation flight testing"],
  },
  {
    phase: "Phase 4",
    period: "2026 onwards",
    status: "upcoming",
    title: "Scale & Deployment",
    items: ["50+ node swarm validation", "Comms-denied environment testing", "Partner programme launch"],
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

const statusStyles = {
  complete: "border-green-500 text-green-400",
  active: "border-blue-500 text-blue-400",
  upcoming: "border-slate-600 text-slate-500",
};
const statusLabel = { complete: "Complete", active: "In Progress", upcoming: "Upcoming" };

export default function AboutPage() {
  return (
    <PageWrapper>
      <div className="min-h-screen bg-slate-950 text-white">

        {/* ── Page hero ── */}
        <div className="relative pt-40 pb-24 border-b border-slate-800">
          {/* Swap this for a full-bleed <img> when asset is ready */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950 opacity-60" />
          <div className="relative z-10 max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <p className="text-blue-400 text-xs uppercase tracking-[6px] mb-5">About</p>
              <h1 className="text-5xl lg:text-6xl font-black leading-tight max-w-3xl">
                Building the Autonomous<br />
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

        <div className="max-w-6xl mx-auto px-6 py-24 space-y-28">

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
            <div className="grid md:grid-cols-2 gap-px bg-slate-800 border border-slate-800">
              {VALUES.map((v) => (
                <div key={v.label} className="bg-slate-950 p-8 hover:bg-slate-900 transition-colors duration-200">
                  <p className="text-white font-bold text-lg">{v.label}</p>
                  <p className="text-slate-400 text-sm mt-3 leading-relaxed">{v.body}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Team placeholder ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-blue-400 text-xs uppercase tracking-[5px] mb-4">Team</p>
            <h2 className="text-3xl font-black mb-4">The People Behind SHARK'D</h2>
            <p className="text-slate-400 text-sm mb-10 max-w-xl">
              A team of engineers and researchers working at the intersection of
              autonomous systems, robotics, and AI.
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {["Founder / Systems Lead", "Software Engineer", "Aerospace Engineer"].map((role) => (
                <div key={role} className="border border-slate-800 p-6 hover:border-slate-700 transition-colors duration-200">
                  {/*
                    Replace the avatar div below with:
                    <img src="/team/[name].jpg" alt="[Name]"
                         className="w-16 h-16 object-cover rounded-none mb-4 grayscale" />
                  */}
                  <div className="w-16 h-16 bg-slate-800 mb-4 flex items-center justify-center text-slate-600 text-xs font-mono">
                    Photo
                  </div>
                  <p className="text-white font-semibold text-sm">Team Member</p>
                  <p className="text-slate-500 text-xs mt-1 uppercase tracking-wide">{role}</p>
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
          >
            <p className="text-blue-400 text-xs uppercase tracking-[5px] mb-4">Roadmap</p>
            <h2 className="text-3xl font-black mb-12">Development Timeline</h2>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[72px] top-0 bottom-0 w-px bg-slate-800" />

              <div className="space-y-10">
                {ROADMAP.map((item) => (
                  <div key={item.phase} className="relative flex gap-8">
                    {/* Phase label */}
                    <div className="shrink-0 w-[72px] text-right">
                      <p className="text-slate-600 text-xs font-mono">{item.period}</p>
                    </div>

                    {/* Dot */}
                    <div className="relative flex items-start">
                      <div
                        className={`mt-1 w-3 h-3 border-2 rounded-full shrink-0 z-10 ${
                          item.status === "active"
                            ? "bg-blue-500 border-blue-500"
                            : item.status === "complete"
                            ? "bg-green-500 border-green-500"
                            : "bg-slate-800 border-slate-700"
                        }`}
                      />
                    </div>

                    {/* Content */}
                    <div className="pb-8">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="text-white font-bold">{item.title}</p>
                        <span className={`text-[10px] uppercase tracking-widest border px-2 py-0.5 ${statusStyles[item.status]}`}>
                          {statusLabel[item.status]}
                        </span>
                      </div>
                      <p className="text-slate-600 text-xs uppercase tracking-widest mb-3">{item.phase}</p>
                      <ul className="space-y-1">
                        {item.items.map((it) => (
                          <li key={it} className="text-slate-400 text-sm flex gap-2">
                            <span className="text-slate-700">—</span>
                            {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </PageWrapper>
  );
}
