import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/* ─────────────────────────────────────────────
   Animated tactical-grid SVG background
   Replace the <video> tag's src once footage is available.
   Asset spec:
     Format : MP4 (H.264) + WebM fallback
     Dimensions : 1920 × 1080 minimum, 16:9
     Duration : 10–20 s looping, no audio
     Content : Low-altitude drone swarm footage or
               photorealistic CGI render flying over
               terrain at dusk/night
     Placement : Full-bleed behind hero, object-fit:cover
     Dark overlay : bg-black/60 so text stays legible
───────────────────────────────────────────── */

const STATS = [
  { value: "40 km", label: "Operational Range" },
  { value: "100+", label: "Drones Per Swarm" },
  { value: "90 min", label: "Endurance" },
  { value: "<200ms", label: "Swarm Latency" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-slate-950">

      {/* ── Tactical grid background (replace with <video> when asset is ready) ── */}
      <div className="absolute inset-0 z-0">
        {/* Placeholder: swap this div for a <video> element */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

        {/* Animated SVG grid overlay */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.07]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#60a5fa" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Animated sweep line — suggests active radar/scan */}
        <motion.div
          animate={{ x: ["0%", "100%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-transparent via-blue-400/30 to-transparent"
        />

        {/* Blue glow — bottom-center horizon light */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-40 pb-24 w-full">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="inline-block w-8 h-[1px] bg-blue-400" />
          <span className="text-blue-400 text-xs uppercase tracking-[6px] font-medium">
            Autonomous Aerial Intelligence
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-[80px] font-black text-white leading-[1.05] tracking-tight max-w-4xl"
        >
          Swarms That{" "}
          <span className="text-blue-400">Think.</span>
          <br />
          Missions That{" "}
          <span className="text-blue-400">Win.</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-8 text-gray-400 text-lg lg:text-xl max-w-2xl leading-relaxed"
        >
          SHARK'D develops autonomous drone swarms capable of
          collaborative decision-making, adaptive mission planning and
          coordinated aerial operations at unprecedented scale.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link to="/products">
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 text-sm font-semibold uppercase tracking-widest transition-colors duration-200">
              View Products
            </button>
          </Link>
          <Link to="/technology">
            <button className="border border-slate-600 hover:border-blue-400 text-white hover:text-blue-400 px-8 py-3.5 text-sm font-semibold uppercase tracking-widest transition-colors duration-200">
              Our Technology
            </button>
          </Link>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 flex items-center gap-2 text-slate-600 text-xs uppercase tracking-widest"
        >
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            ↓
          </motion.span>
          <span>Scroll to explore</span>
        </motion.div>
      </div>

      {/* ── Metrics strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="relative z-10 border-t border-slate-800 bg-slate-950/80 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-800">
          {STATS.map((s) => (
            <div key={s.label} className="py-6 px-8 first:pl-0 last:pr-0">
              <p className="text-2xl font-black text-white">{s.value}</p>
              <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

    </section>
  );
}
