import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AnimatedBackground from "./AnimatedBackground";

const PRODUCTS = [
  {
    id: "SD-R1",
    
    category: "UAV Platform",
    status: "In Development",
    name: "SHARK'D Recon-1",
    tagline: "Long-endurance autonomous reconnaissance platform",
    description:
      "The Recon-1 is a hybrid VTOL drone designed for extended-range surveillance and autonomous mission execution. Operates independently or as a coordinated swarm node, sharing telemetry and objective data with every other unit in real time.",
    image:"/product-recon.jpg",
      specs: [
      { label: "Range", value: "40 km" },
      { label: "Endurance", value: "90 min" },
      { label: "Max Altitude", value: "3,000 m" },
      { label: "Payload", value: "500 g" },
      { label: "Comms", value: "Encrypted mesh" },
      { label: "Nav Mode", value: "GPS / INS / Vision" },
    ],
    imageSide: "left",
    imgPlaceholder: "Recon-1 · 3/4-view render",
  },
  {
    id: "SD-SC1",
    category: "Command Platform",
    status: "Beta",
    name: "Swarm Control System",
    tagline: "Unified intelligence layer for multi-drone operations",
    description:
      "The SCS is the software backbone of every SHARK'D deployment. It handles mission planning, real-time swarm orchestration, anomaly detection and deconfliction across fleets of 100+ drones from a single operator station.",
    image:"/product-swarm.jpg",
      specs: [
      { label: "Fleet Size", value: "100+ drones" },
      { label: "Latency", value: "< 200 ms" },
      { label: "Interfaces", value: "Web / Desktop" },
      { label: "Mission Types", value: "7 presets" },
      { label: "Data Export", value: "GeoJSON / KML" },
      { label: "Redundancy", value: "Hot failover" },
    ],
    imageSide: "right",
    imgPlaceholder: "SCS · dark map UI screenshot",
  },
  {
    id: "SD-MI1",
    category: "Intelligence Layer",
    status: "Research",
    name: "Mission Intelligence Engine",
    tagline: "Adaptive AI decision-making for autonomous operations",
    description:
      "The MI Engine runs onboard each drone and enables decentralised reasoning. It processes sensor fusion data, reallocates tasks when nodes drop out, and maintains mission continuity without requiring a live uplink.",
    image:"/product-intelligence.jpg",
      specs: [
      { label: "Inference", value: "Onboard edge AI" },
      { label: "Sensor Fusion", value: "Camera / LiDAR / IMU" },
      { label: "Replan Time", value: "< 50 ms" },
      { label: "Comms-denied", value: "Full autonomy" },
      { label: "Model Size", value: "< 8 MB" },
      { label: "Power Draw", value: "< 2 W" },
    ],
    imageSide: "left",
    imgPlaceholder: "MI Engine · AI network diagram",
  },
];

const statusColor = {
  "In Development": "border-blue-500 text-blue-400",
  Beta: "border-green-500 text-green-400",
  Research: "border-amber-500 text-amber-400",
};

export default function Products() {
  return (
    <section className="relative bg-slate-950 py-32 w-full overflow-hidden">
      <AnimatedBackground density={0.00004} color="59,130,246" maxDist={120} />
      <div className="relative z-10 w-full max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-blue-400 text-xs uppercase tracking-[6px] mb-4">
            Products
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            The SHARK'D Ecosystem
          </h2>
          <p className="text-slate-400 mt-5 max-w-2xl text-lg leading-relaxed">
            A complete autonomous aerial platform — airframe, command
            software, and embedded intelligence — engineered to operate as
            one unified system.
          </p>
        </motion.div>

        {/* Product rows */}
        <div className="mt-24 space-y-28">
          {PRODUCTS.map((p) => {
            const imgLeft = p.imageSide === "left";
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`grid md:grid-cols-2 gap-10 lg:gap-20 items-center ${
                  !imgLeft ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
{/* Image cell */}
<div className="relative bg-slate-900 border border-transparent h-[380px] flex items-center justify-center overflow-hidden group cursor-pointer transition-all duration-300 hover:border-cyan-400/60">

  <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800" />

  <img
    src={p.image}
    alt={p.name}
    className="relative w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
  />





  {/* Corner brackets */}
  <span className="absolute top-3 left-3 w-5 h-5 border-t border-l border-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10" />
  <span className="absolute top-3 right-3 w-5 h-5 border-t border-r border-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10" />
  <span className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10" />
  <span className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10" />

  <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-xs font-mono tracking-widest z-10">
    {p.id}
  </span>

</div>

                {/* Text cell */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-blue-400 text-xs uppercase tracking-[5px]">
                      {p.category}
                    </span>
                    <span className={`text-[10px] uppercase tracking-widest border px-2 py-0.5 ${statusColor[p.status]}`}>
                      {p.status}
                    </span>
                  </div>

                  <h3 className="text-3xl lg:text-4xl font-black text-white leading-tight">
                    {p.name}
                  </h3>
                  <p className="text-slate-400 text-sm mt-1">{p.tagline}</p>

                  <p className="text-slate-400 mt-5 text-base leading-relaxed">
                    {p.description}
                  </p>

                  {/* Spec grid */}
                  <div className="mt-8 grid grid-cols-3 border border-slate-800">
                    {p.specs.map((s, si) => (
                      <div
                        key={s.label}
                        className={`px-4 py-3 border-slate-800 ${
                          si % 3 !== 2 ? "border-r" : ""
                        } ${si < 3 ? "border-b" : ""}`}
                      >
                        <p className="text-white font-bold text-sm">{s.value}</p>
                        <p className="text-slate-500 text-xs mt-0.5 uppercase tracking-wide">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex gap-3">
                    <Link to="/products">
                      <button className="text-xs uppercase tracking-widest font-semibold text-white border border-slate-700 hover:border-blue-500 hover:text-blue-400 px-5 py-2.5 transition-colors duration-200">
                        Full Specs
                      </button>
                    </Link>
                    <Link to="/contact">
                      <button className="text-xs uppercase tracking-widest font-semibold bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 transition-colors duration-200">
                        Enquire
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="relative mt-24 border-t border-slate-800 overflow-hidden">
          <AnimatedBackground density={0.00005} color="59,130,246" maxDist={110} />
          <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative z-10 pt-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
        >
          <div>
            <p className="text-white font-bold text-xl">
              Need a custom configuration?
            </p>
            <p className="text-slate-400 text-sm mt-1">
              We work with research institutions and defence integrators to
              develop mission-specific platforms.
            </p>
          </div>
          <Link to="/contact">
            <button className="shrink-0 border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-3 text-xs uppercase tracking-widest font-semibold transition-all duration-200">
              Get in Touch
            </button>
          </Link>
          
        </motion.div>
        </div>
        <div className="mt-24 border-t border-slate-800 pt-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"></div>
        

      </div>
    </section>
  );
}