import { motion } from "framer-motion";

/*
  IMAGE SPECS FOR GALLERY
  ─────────────────────────────────────────────────────
  All gallery images should be:
    Format     : JPEG optimised (< 300 KB each)
    Aspect     : See individual cell sizes below
    Style      : Dark backgrounds preferred; dramatic
                 lighting; aerospace/engineering aesthetic

  Cell 1 (large, spans 2 rows) — CAD / 3D render
    File       : /public/gallery/cad-render.jpg
    Size       : 900 × 900 px (rendered square, displayed tall)
    Content    : Full-detail drone CAD render, exploded-view
                 or clean 3-quarter perspective

  Cell 2 — Swarm simulation screenshot
    File       : /public/gallery/swarm-sim.jpg
    Size       : 900 × 500 px
    Content    : Top-down simulation view, multiple drone
                 dots forming geometric pattern over terrain

  Cell 3 — Flight test footage still
    File       : /public/gallery/flight-test.jpg
    Size       : 900 × 500 px
    Content    : Real or rendered drone in flight,
                 motion-blurred rotors, blue sky or dusk bg

  Cell 4 — Mission planning UI
    File       : /public/gallery/mission-plan.jpg
    Size       : 900 × 500 px
    Content    : Ground control station monitor showing
                 map, telemetry, and waypoints

  Cell 5 — Ground station exterior
    File       : /public/gallery/ground-station.jpg
    Size       : 900 × 500 px
    Content    : Portable command unit / laptop setup
                 in field environment

  Cell 6 (wide) — Team / workshop photo
    File       : /public/gallery/team.jpg
    Size       : 1800 × 700 px
    Content    : Team working on drone hardware, or
                 lab/workshop environment with drones
  ─────────────────────────────────────────────────────
*/

const ITEMS = [
  { label: "Airframe Design", sub: "CAD Render · Rev 3", large: true },
  { label: "Swarm Simulation", sub: "Formation flight · 24 nodes" },
  { label: "Flight Test", sub: "Field trial · Phase 2" },
  { label: "Mission Planning", sub: "Ground control interface" },
  { label: "Ground Station", sub: "Portable command unit" },
];

export default function Gallery() {
  return (
    <section className="bg-slate-950 py-32 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <p className="text-blue-400 text-xs uppercase tracking-[6px] mb-4">Gallery</p>
            <h2 className="text-4xl md:text-5xl font-black text-white">Project Showcase</h2>
          </div>
          <p className="text-slate-400 text-base max-w-md leading-relaxed">
            Design iterations, flight tests, simulation runs and development
            milestones from the SHARK'D programme.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-3">

          {/* Large cell — spans 2 rows */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="md:row-span-2 relative bg-slate-900 border border-slate-800 h-[420px] md:h-auto group overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 group-hover:from-slate-800 transition-colors duration-300" />
            <span className="absolute inset-0 flex items-center justify-center text-slate-700 text-sm font-mono">
              CAD Render · large cell
            </span>
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white text-sm font-semibold">{ITEMS[0].label}</p>
              <p className="text-slate-400 text-xs mt-0.5">{ITEMS[0].sub}</p>
            </div>
            <span className="absolute top-3 left-3 w-5 h-5 border-t border-l border-slate-700" />
            <span className="absolute top-3 right-3 w-5 h-5 border-t border-r border-slate-700" />
          </motion.div>

          {/* Right column cells */}
          {ITEMS.slice(1).map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="relative bg-slate-900 border border-slate-800 h-[200px] group overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 group-hover:from-slate-800 transition-colors duration-300" />
              <span className="absolute inset-0 flex items-center justify-center text-slate-700 text-xs font-mono">
                {item.label}
              </span>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-white text-sm font-semibold">{item.label}</p>
                <p className="text-slate-400 text-xs mt-0.5">{item.sub}</p>
              </div>
              <div className="absolute inset-0 border border-blue-500/0 group-hover:border-blue-500/40 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Wide team / workshop photo placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-3 relative bg-slate-900 border border-slate-800 h-[220px] overflow-hidden group cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-800 group-hover:from-slate-800 transition-colors duration-300" />
          <span className="absolute inset-0 flex items-center justify-center text-slate-700 text-sm font-mono">
            Team / workshop photo · wide
          </span>
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/70 to-transparent">
            <p className="text-white text-sm font-semibold">The Team</p>
            <p className="text-slate-400 text-xs mt-0.5">Building the future of autonomous flight · Bengaluru, India</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
