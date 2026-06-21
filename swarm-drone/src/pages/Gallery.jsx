import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";

const ITEMS = [
  { label: "Airframe Design",      sub: "CAD Render · Rev 3",              large: true,  placeholder: "Full drone CAD render · large cell" },
  { label: "Swarm Simulation",     sub: "Formation flight · 24 nodes",     large: false, placeholder: "Simulation overhead view" },
  { label: "Flight Test",          sub: "Field trial · Phase 2",           large: false, placeholder: "Drone in flight photo" },
  { label: "Mission Planning UI",  sub: "Ground control interface",        large: false, placeholder: "GCS map screenshot" },
  { label: "Ground Station",       sub: "Portable command unit",           large: false, placeholder: "Field command post photo" },
  { label: "Electronics",          sub: "Flight controller assembly",      large: false, placeholder: "PCB / electronics close-up" },
  { label: "Physical Prototype",   sub: "Airframe Rev 2 · Bengaluru Lab",  large: false, placeholder: "Prototype airframe photo" },
];

const FILTERS = ["All", "Hardware", "Software", "Field Tests"];

export default function GalleryPage() {
  return (
    <PageWrapper>
      <div className="min-h-screen bg-slate-950 text-white w-full">

        {/* Page header */}
        <div className="pt-40 pb-20 border-b border-slate-800 w-full">
          <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-blue-400 text-xs uppercase tracking-[6px] mb-5">Gallery</p>
              <h1 className="text-5xl lg:text-6xl font-black max-w-2xl leading-tight">
                Project Showcase
              </h1>
              <p className="text-slate-400 text-lg mt-5 max-w-xl leading-relaxed">
                Design iterations, field trials, simulation runs and
                development milestones from the SHARK'D programme.
              </p>
            </motion.div>

            {/* Filter tabs */}
            <div className="flex gap-3 mt-10 flex-wrap">
              {FILTERS.map((f, i) => (
                <button
                  key={f}
                  className={`text-xs uppercase tracking-widest px-4 py-2 border transition-colors duration-150 ${
                    i === 0
                      ? "border-blue-500 text-blue-400"
                      : "border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-300"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-16">

          <div className="grid md:grid-cols-3 gap-3">

            {/* Large cell — top-left, spans 2 rows */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="md:row-span-2 relative bg-slate-900 border border-slate-800 min-h-[420px] md:min-h-0 group overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 group-hover:from-slate-700 transition-colors duration-300" />
              <span className="absolute inset-0 flex items-center justify-center text-slate-600 text-sm font-mono px-6 text-center">
                {ITEMS[0].placeholder}
              </span>
              <div className="absolute inset-0 border border-blue-500/0 group-hover:border-blue-500/30 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-sm font-semibold">{ITEMS[0].label}</p>
                <p className="text-slate-400 text-xs mt-0.5">{ITEMS[0].sub}</p>
              </div>
              <span className="absolute top-3 left-3 w-5 h-5 border-t border-l border-slate-700" />
              <span className="absolute top-3 right-3 w-5 h-5 border-t border-r border-slate-700" />
            </motion.div>

            {/* Right-column items */}
            {ITEMS.slice(1, 5).map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="relative bg-slate-900 border border-slate-800 h-[200px] group overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 group-hover:from-slate-700 transition-colors duration-300" />
                <span className="absolute inset-0 flex items-center justify-center text-slate-700 text-xs font-mono px-4 text-center">
                  {item.placeholder}
                </span>
                <div className="absolute inset-0 border border-blue-500/0 group-hover:border-blue-500/30 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm font-semibold">{item.label}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Second row: remaining items */}
          <div className="mt-3 grid md:grid-cols-2 gap-3">
            {ITEMS.slice(5).map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="relative bg-slate-900 border border-slate-800 h-[220px] group overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 group-hover:from-slate-700 transition-colors duration-300" />
                <span className="absolute inset-0 flex items-center justify-center text-slate-700 text-xs font-mono px-4 text-center">
                  {item.placeholder}
                </span>
                <div className="absolute inset-0 border border-blue-500/0 group-hover:border-blue-500/30 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm font-semibold">{item.label}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>


        </div>
      </div>
    </PageWrapper>
  );
}
