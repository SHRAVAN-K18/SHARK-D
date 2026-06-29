import { motion } from "framer-motion";
import { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { Link } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground";

const LAYERS = [
  {
    id: "01",
    image: "/tech-mesh.jpg",
    tag: "Coordination",
    title: "Swarm Communication",
    body: "Every drone in a SHARK'D swarm runs a lightweight mesh stack that continuously broadcasts and receives position, health, and mission data. The topology is fully decentralised — there is no single point of failure. When a node drops, the remaining units re-elect a swarm lead and redistribute incomplete objectives within 200 ms.",
    capabilities: [
      ["Protocol", "Encrypted proprietary mesh"],
      ["Topology", "Decentralised / self-healing"],
      ["Round-trip latency", "< 200 ms"],
      ["Range", "40 km node-to-node"],
      ["Interference resilience", "Frequency hopping"],
      ["GPS-denied comms", "Yes — INS bridging"],
    ],
    imgPlaceholder: "Mesh network node diagram · dark bg · 1200 × 700 px",
  },
  {
    id: "02",
    image: "/tech-adaptive.png",
    tag: "Intelligence",
    title: "Adaptive Decision Engine",
    body: "Each drone runs a quantised neural model onboard that interprets sensor fusion data and drives real-time replanning. No ground uplink is required for mission execution. The model is < 8 MB, runs at < 2 W, and produces a replan output in under 50 ms — fast enough to maintain formation geometry in dynamic wind conditions.",
    capabilities: [
      ["Architecture", "Quantised transformer / MLP hybrid"],
      ["Inference time", "< 50 ms"],
      ["Model footprint", "< 8 MB"],
      ["Power draw", "< 2 W"],
      ["Hardware target", "ARM Cortex-M / Nvidia Orin Nano"],
      ["OTA update", "Signed package delivery"],
    ],
    imgPlaceholder: "Neural inference pipeline diagram · 1200 × 700 px",
  },
  {
    id: "03",
    image: "/tech-mission.jpg",
    tag: "Autonomy",
    title: "Mission Planning",
    body: "Operators define a mission goal — area coverage, perimeter patrol, point tracking — and the Swarm Control System automatically assigns roles across the fleet. Drones self-deconflict flight paths, share detections in real time, and maintain geometric formation through turbulence and node loss.",
    capabilities: [
      ["Mission presets", "7 (extensible)"],
      ["Operator modes", "Full autonomy / HITL / manual"],
      ["GeoFence", "Configurable 2D / 3D"],
      ["Deconfliction", "Velocity obstacle algorithm"],
      ["Formation modes", "Line / Wedge / Cluster / Orbit"],
      ["Coverage algorithm", "Boustrophedon + adaptive"],
    ],
    imgPlaceholder: "Mission planning overhead map UI · 1200 × 700 px",
  },
];

const FAQS = [
  {
    q: "Can the swarm operate without GPS?",
    a: "Yes. SHARK'D uses INS bridging and vision-based localisation to maintain positional accuracy in GPS-denied environments. The swarm continues to coordinate using relative positioning derived from inter-drone ranging.",
  },
  {
    q: "What happens if the ground station goes offline?",
    a: "The swarm continues executing its last known mission objective. The MI Engine's comms-denied autonomy mode handles task redistribution and formation maintenance without any uplink.",
  },
  {
    q: "How many drones can one operator manage?",
    a: "The Swarm Control System is validated for 100+ simultaneous nodes with a single operator interface. Mission-level abstraction means the operator sets objectives, not individual drone commands.",
  },
  {
    q: "Is the communication link encrypted?",
    a: "All inter-drone and ground-link communications use AES-256 encryption with frequency-hopping spread spectrum for additional SIGINT resilience.",
  },
];

export default function TechnologyPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <PageWrapper>
      <div className="min-h-screen bg-transparent text-white w-full">

        {/* Page header */}
        <div className="relative pt-40 pb-20 border-b border-slate-800 w-full overflow-hidden">
          <AnimatedBackground density={0.00005} color="59,130,246" maxDist={130} />
          <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-blue-400 text-xs uppercase tracking-[6px] mb-5">Technology</p>
              <h1 className="text-5xl lg:text-6xl font-black max-w-3xl leading-tight">
                Three Layers.<br />
                <span className="text-blue-400">One Unified System.</span>
              </h1>
              <p className="text-slate-400 text-lg mt-5 max-w-2xl leading-relaxed">
                SHARK'D's architecture separates the swarm into communication,
                intelligence, and mission layers — each engineered for resilience
                and designed to interoperate seamlessly.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Architecture summary strip */}
        <div className="border-b border-slate-800 w-full">
          <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid grid-cols-3">
              {LAYERS.map((l, i) => (
                <a
                  key={l.id}
                  href={`#layer-${l.id}`}
                  className={`px-6 py-6 border-r last:border-r-0 border-slate-800 hover:bg-slate-900 transition-colors group ${
                    i === 0 ? "pl-0" : ""
                  }`}
                >
                  <span className="text-slate-700 text-xs font-mono">{l.id}</span>
                  <p className="text-blue-400 text-xs uppercase tracking-widest mt-2">{l.tag}</p>
                  <p className="text-white text-sm font-bold mt-1 group-hover:text-blue-300 transition-colors">{l.title}</p>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Layer deep-dives */}
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-20 space-y-32">
          {LAYERS.map((layer, i) => {
            const imgLeft = i % 2 === 0;
            return (
              <motion.div
                key={layer.id}
                id={`layer-${layer.id}`}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55 }}
                className={`grid lg:grid-cols-2 gap-14 items-start ${
                  !imgLeft ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Image */}
<div
  className={`relative bg-slate-900 border border-transparent overflow-hidden group cursor-pointer transition-all duration-300 hover:border-cyan-400/60 ${
    layer.id === "01"
      ? "h-[517px]"
      : layer.id === "02"
      ? "h-[514px]"
      : layer.id === "03"
      ? "h-[491px]"
      : "h-[340px]"
  }`}
>

  

  <img
    src={layer.image}
    alt={layer.title}
    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
  />

  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />

  <span className="absolute top-3 left-3 w-5 h-5 border-t border-l border-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10" />
  <span className="absolute top-3 right-3 w-5 h-5 border-t border-r border-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10" />
  <span className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10" />
  <span className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10" />

  <span className="absolute top-4 right-4 text-white text-xs font-mono z-10">
    {layer.id}
  </span>

</div>

                {/* Content */}
                <div>
                  <p className="text-blue-400 text-xs uppercase tracking-[5px] mb-3">{layer.tag}</p>
                  <h2 className="text-3xl font-black text-white">{layer.title}</h2>
                  <p className="text-slate-400 mt-5 text-base leading-relaxed">{layer.body}</p>

                  <div className="mt-8">
                    <p className="text-slate-500 text-xs uppercase tracking-widest mb-3">Specifications</p>
                    <table className="w-full border border-slate-800 text-sm">
                      <tbody>
                        {layer.capabilities.map(([label, value], ri) => (
                          <tr key={label} className={ri % 2 === 0 ? "bg-slate-900" : "bg-slate-950"}>
                            <td className="px-4 py-2.5 text-slate-400 w-1/2 border-r border-slate-800">{label}</td>
                            <td className="px-4 py-2.5 text-white font-medium">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* System Architecture block */}
        <div className="relative border-t border-slate-800 bg-slate-900 w-full overflow-hidden">
          <AnimatedBackground density={0.00004} color="59,130,246" maxDist={110} />
          <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-20">
            <p className="text-blue-400 text-xs uppercase tracking-[5px] mb-4">System Architecture</p>
            <h2 className="text-3xl font-black mb-12">Layer Stack</h2>
            <div className="space-y-2">
              {[
                { label: "Mission Layer", desc: "Objective planning · Operator interface · Formation management · GeoFence enforcement", color: "bg-blue-600" },
                { label: "Intelligence Layer", desc: "Edge AI inference · Sensor fusion · Real-time replanning · Comms-denied autonomy", color: "bg-blue-700" },
                { label: "Coordination Layer", desc: "Encrypted mesh · Self-healing topology · Swarm consensus · Node deconfliction", color: "bg-blue-800" },
                { label: "Hardware Layer", desc: "Flight controller · LiDAR · 4K EO/IR camera · IMU · Mesh radio · OTA update module", color: "bg-slate-700" },
              ].map((row) => (
                <div key={row.label} className="grid sm:grid-cols-[200px_1fr] gap-4 items-center">
                  <div className={`${row.color} px-4 py-3`}>
                    <p className="text-white text-xs font-semibold uppercase tracking-widest">{row.label}</p>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{row.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-20">
          <p className="text-blue-400 text-xs uppercase tracking-[5px] mb-4">FAQ</p>
          <h2 className="text-3xl font-black mb-10">Technical Questions</h2>
          <div className="divide-y divide-slate-800 border-t border-b border-slate-800">
            {FAQS.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left py-5 flex justify-between items-center gap-4 group"
                >
                  <span className="text-white font-medium text-sm group-hover:text-blue-400 transition-colors">{faq.q}</span>
                  <span className="text-slate-500 text-lg shrink-0">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <p className="text-slate-400 text-sm leading-relaxed pb-5">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="relative border-t border-slate-800 bg-slate-900 w-full overflow-hidden">
          <AnimatedBackground density={0.00005} color="59,130,246" maxDist={120} />
          <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-16 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h2 className="text-2xl font-black text-white">Ready to see it in action?</h2>
              <p className="text-slate-400 text-sm mt-1">Talk to us about a pilot programme or technical demonstration.</p>
            </div>
            <Link to="/contact">
              <button className="shrink-0 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 text-xs uppercase tracking-widest font-semibold transition-colors duration-200">
                Contact Us
              </button>
            </Link>
          </div>
        </div>

      </div>
    </PageWrapper>
  );
}