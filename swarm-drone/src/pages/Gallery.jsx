import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";

const ITEMS = [
  {
    label: "Airframe Design",
    sub: "CAD Render · Rev 3",
    image: "/gallery-windtunnel.jpg",
    large: true,
  },
  {
    label: "Swarm Simulation",
    sub: "Formation flight · 24 nodes",
    image: "/gallery-formation.jpg",
  },
  {
    label: "Flight Test",
    sub: "Field trial · Phase 2",
    image: "/gallery-flight.jpg",
  },
  {
    label: "Mission Planning UI",
    sub: "Ground control interface",
    image: "/gallery-ui.jpg",
  },
  {
    label: "Ground Station",
    sub: "Portable command unit",
    image: "/gallery-ground.jpg",
  },
  {
    label: "Electronics",
    sub: "Flight controller assembly",
    image: "/gallery-electronics.jpg",
  },
  {
    label: "Physical Prototype",
    sub: "Airframe Rev 2 · Bengaluru Lab",
    image: "/gallery-prototype.jpg",
  },
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Large cell — top-left, spans 2 rows */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
             className="relative bg-slate-900 border border-slate-800 h-[500px] group overflow-hidden cursor-pointer"
            >
         <img
  src={ITEMS[0].image}
  alt={ITEMS[0].label}
  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
/>

<div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
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
<img
  src={item.image}
  alt={item.label}
  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
/>

<div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
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
<img
  src={item.image}
  alt={item.label}
  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
/>

<div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
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
