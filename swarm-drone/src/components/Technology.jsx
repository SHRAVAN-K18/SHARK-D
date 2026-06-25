import { motion } from "framer-motion";
import { useState } from "react";

const LAYERS = [
  {
    id: "01",
    image:"/tech-mesh.jpg",
    tag: "Coordination Layer",
    title: "Swarm Communication",
    body: "Every drone broadcasts and receives positional data, mission objectives, and health telemetry across an encrypted mesh network. The swarm is self-healing — if a node drops, the remaining units re-elect a lead and redistribute tasks within milliseconds.",
    chips: ["Encrypted mesh protocol", "Self-healing topology", "< 200 ms round-trip", "GPS-denied resilience"],
    imgPlaceholder: "Swarm mesh network diagram",
  },
  {
    id: "02",
    image:"/tech-adaptive.png",
    tag: "Intelligence Layer",
    title: "Adaptive Decision Engine",
    body: "Each drone runs a lightweight onboard AI model that interprets sensor fusion data and executes real-time replanning. No uplink required. The engine prioritises mission continuity — if the ground station goes dark, the swarm adapts and carries out its last known objective.",
    chips: ["Edge inference < 50 ms", "Sensor fusion (camera / LiDAR / IMU)", "Comms-denied autonomy", "Distributed consensus"],
    imgPlaceholder: "AI decision-tree render",
  },
  {
    id: "03",
    image:"/tech-mission.jpg",
    tag: "Mission Layer",
    title: "Autonomous Mission Planning",
    body: "Operators define a mission objective — area surveillance, perimeter patrol, target tracking — and the SCS automatically distributes roles across the swarm. Drones deconflict flight paths, share detected anomalies, and maintain formation geometry in dynamic wind conditions.",
    chips: ["7 mission presets", "Operator-in-the-loop / full autonomy", "GeoFence enforcement", "Live telemetry dashboard"],
    imgPlaceholder: "Mission planning map UI",
  },
];

export default function Technology() {
  const [activeLayer, setActiveLayer] = useState(null);

  return (
    <section className="bg-slate-1000 pt-1 pb-32 w-full">
      <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-blue-400 text-xs uppercase tracking-[6px] mb-4">
            Technology
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Built for Autonomous Coordination
          </h2>
          <p className="text-slate-400 mt-5 max-w-2xl text-lg leading-relaxed">
            Three interdependent layers — communication, intelligence, and
            mission — that work together to keep every drone in sync and
            every mission on track.
          </p>
        </motion.div>

        {/* Architecture overview strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 grid grid-cols-3 border border-slate-800"
        >
          {LAYERS.map((layer, i) => (
            <button
              key={layer.id}
              onClick={() => setActiveLayer(activeLayer === i ? null : i)}
              className={`text-left px-6 py-5 border-r last:border-r-0 border-slate-800 transition-colors duration-200 ${
                activeLayer === i ? "bg-blue-600/10" : "hover:bg-slate-800/50"
              }`}
            >
              <span className="text-slate-600 text-xs font-mono">{layer.id}</span>
              <p className={`text-xs uppercase tracking-widest mt-2 ${
                activeLayer === i ? "text-blue-400" : "text-slate-400"
              }`}>
                {layer.tag}
              </p>
              <p className="text-white font-bold mt-1 text-sm">{layer.title}</p>
            </button>
          ))}
        </motion.div>

        {/* Tech detail rows */}
        <div className="mt-24 space-y-28">
          {LAYERS.map((layer, i) => {
            const imgLeft = i % 2 === 0;
            return (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className={`grid md:grid-cols-2 gap-10 lg:gap-20 items-center ${
                  !imgLeft ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
               {/* Image cell */}
<div
  className={`relative bg-slate-800 border border-transparent overflow-hidden group cursor-pointer transition-all duration-300 hover:border-cyan-400/60 ${
    layer.id === "02" ? "h-[500px]" : "h-[400px]"       
  }`}
>

  <img
    src={layer.image}
    alt={layer.title}
    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
  />



  {/* Corner brackets */}
  <span className="absolute top-3 left-3 w-5 h-5 border-t border-l border-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10" />
  <span className="absolute top-3 right-3 w-5 h-5 border-t border-r border-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10" />
  <span className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10" />
  <span className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10" />

  <span className="absolute top-4 right-4 text-white text-xs font-mono z-10">
    {layer.id}
  </span>

</div>

                {/* Text cell */}
                <div>
                  <p className="text-blue-400 text-xs uppercase tracking-[5px] mb-3">{layer.tag}</p>
                  <h3 className="text-3xl font-black text-white">{layer.title}</h3>
                  <p className="text-slate-400 mt-5 text-base leading-relaxed">{layer.body}</p>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {layer.chips.map((chip) => (
                      <span
                        key={chip}
                        className="text-xs text-slate-300 border border-slate-700 px-3 py-1.5 uppercase tracking-wide"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stack diagram */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mt-28 border border-slate-800 p-10"
        >
          <p className="text-slate-500 text-xs uppercase tracking-[5px] mb-8">System Architecture</p>
          <div className="space-y-3">
            {[
              { label: "Mission Layer", desc: "Objective planning · Formation geometry · Operator interface", color: "bg-blue-600" },
              { label: "Intelligence Layer", desc: "Edge AI inference · Sensor fusion · Replanning engine", color: "bg-blue-700" },
              { label: "Coordination Layer", desc: "Encrypted mesh · Self-healing topology · Swarm consensus", color: "bg-blue-800" },
              { label: "Hardware Layer", desc: "Flight controller · LiDAR · Camera · IMU · Comms radio", color: "bg-slate-700" },
            ].map((row) => (
              <div key={row.label} className="grid grid-cols-[180px_1fr] items-center gap-6">
                <div className={`${row.color} px-4 py-2.5`}>
                  <p className="text-white text-xs font-semibold uppercase tracking-widest">{row.label}</p>
                </div>
                <p className="text-slate-400 text-sm">{row.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
