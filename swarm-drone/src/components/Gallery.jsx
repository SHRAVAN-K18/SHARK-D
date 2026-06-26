import { motion } from "framer-motion";
import AnimatedBackground from "./AnimatedBackground";

const ITEMS = [
  {
    label: "Airframe Design",
    sub: "CAD Render · Rev 3",
    image: "/gallery-windtunnel.jpg",
    large: true,
  },
  {
    label: "Swarm Formation",
    sub: "Formation flight · 24 nodes",
    image: "/gallery-formation.jpg",
  },
  {
    label: "Modular Payload",
    sub: "Field trial · Phase 2",
    image: "/gallery-payload.png",
  },
  {
    label: "Mission Planning",
    sub: "Ground control interface",
    image: "/gallery-ui.jpg",
  },
  {
    label: "Ground Station",
    sub: "Portable command unit",
    image: "/gallery-ground.jpg",
  },
];

export default function Gallery() {
  return (
    <section className="relative bg-slate-950 py-32 border-t border-slate-800 w-full overflow-hidden">
      <AnimatedBackground density={0.00004} color="59,130,246" maxDist={120} />
      <div className="relative z-10 w-full max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-10">

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
            className="md:row-span-2 relative bg-slate-900 border border-transparent h-[500px] md:h-auto group overflow-hidden cursor-pointer transition-all duration-300 hover:border-cyan-400/60"
          >
            <img
  src={ITEMS[0].image}
  alt={ITEMS[0].label}
  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
/>

<div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white text-sm font-semibold">{ITEMS[0].label}</p>
              <p className="text-slate-400 text-xs mt-0.5">{ITEMS[0].sub}</p>
            </div>
            <span className="absolute top-3 left-3 w-5 h-5 border-t border-l border-slate-700" />
            <span className="absolute top-3 right-3 w-5 h-5 border-t border-r border-slate-700" />
            {/* Cyan hover corners */}
<span className="absolute top-3 left-3 w-5 h-5 border-t border-l border-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10" />
<span className="absolute top-3 right-3 w-5 h-5 border-t border-r border-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10" />
<span className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10" />
<span className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10" />
          </motion.div>

          {/* Right column cells */}
          {ITEMS.slice(1).map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="relative bg-slate-900 border border-transparent h-[260px] group overflow-hidden cursor-pointer transition-all duration-300 hover:border-cyan-400/60"
            >
<img
  src={item.image}
  alt={item.label}
  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
/>

<>
  <span className="absolute top-3 left-3 w-5 h-5 border-t border-l border-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10" />
  <span className="absolute top-3 right-3 w-5 h-5 border-t border-r border-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10" />
  <span className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10" />
  <span className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10" />
</>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-white text-sm font-semibold">{item.label}</p>
                <p className="text-slate-400 text-xs mt-0.5">{item.sub}</p>
              </div>
              <div className="absolute inset-0 border border-blue-500/0 group-hover:border-blue-500/40 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>



      </div>
    </section>
  );
}