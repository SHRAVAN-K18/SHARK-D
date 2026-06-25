import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const STATS = [
  { value: "40 km", label: "Operational Range" },
  { value: "100+", label: "Drones Per Swarm" },
  { value: "90 min", label: "Endurance" },
  { value: "<200ms", label: "Swarm Latency" },
];

export default function Hero() {
  return (
    <section className="relative h-screen max-h-screen flex flex-col justify-center bg-slate-950 w-full">

      {/* ── Background ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">

        {/* Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-slate-950/10" />

        <div
          className="absolute bottom-0 right-0 pointer-events-none z-10"
          style={{
            width: "280px",
            height: "90px",
            background: "linear-gradient(to top left, #020617 35%, transparent 100%)",
          }}
        />

        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#60a5fa" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <motion.div
          animate={{ x: ["0%", "100%"] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-transparent via-blue-400/20 to-transparent"
        />

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      {/* ── Main content ── */}
      {/* FIX: px-5 on mobile, proper pt/pb, removed invalid pb-38 */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-5 sm:px-6 lg:px-10 pt-32 sm:pt-40 pb-10 flex-1 flex flex-col justify-center">

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

        {/* FIX: text-4xl on mobile instead of text-5xl */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-[80px] font-black text-white leading-[1.05] tracking-tight max-w-4xl"
        >
          Swarms That{" "}
          <span className="text-blue-400">Think.</span>
          <br />
          Missions That{" "}
          <span className="text-blue-400">Win.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-8 text-gray-300 text-lg lg:text-xl max-w-2xl leading-relaxed"
        >
          SHARK'D develops autonomous drone swarms capable of
          collaborative decision-making, adaptive mission planning and
          coordinated aerial operations at unprecedented scale.
        </motion.p>

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
            <button className="border border-slate-500 hover:border-blue-400 text-white hover:text-blue-400 px-8 py-3.5 text-sm font-semibold uppercase tracking-widest transition-colors duration-200 backdrop-blur-sm">
              Our Technology
            </button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-10 flex items-center gap-2 text-slate-500 text-xs uppercase tracking-widest"
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
      {/* FIX: py-6 on mobile instead of py-12 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="relative z-10 w-full border-t border-slate-800 bg-slate-950/95 backdrop-blur-sm"
      >
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-800">
          {STATS.map((s) => (
            <div key={s.label} className="py-6 sm:py-12 px-4 sm:px-8 first:pl-0 last:pr-0">
              <p className="text-2xl font-black text-white">{s.value}</p>
              <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

    </section>
  );
}