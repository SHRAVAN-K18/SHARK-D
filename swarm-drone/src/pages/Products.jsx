import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

const PRODUCTS = [
  {
    id: "SD-R1",
    category: "UAV Platform",
    status: "In Development",
    statusColor: "border-blue-500 text-blue-400",
    name: "SHARK'D Recon-1",
    tagline: "Long-endurance autonomous reconnaissance UAV",
    image: "/product-recon.jpg",
    description:
      "The Recon-1 is SHARK'D's primary airframe — a hybrid VTOL platform designed for persistent area surveillance, perimeter patrol, and intelligence gathering. It operates as a standalone unit or as a coordinated node within a larger swarm, continuously sharing telemetry, detections, and mission state with every other unit.",
    specs: [
      { group: "Flight Performance", items: [
        ["Range", "40 km"],
        ["Endurance", "90 min"],
        ["Max Altitude", "3,000 m AGL"],
        ["Max Speed", "22 m/s"],
        ["Wind Resistance", "Beaufort 5"],
      ]},
      { group: "Payload & Sensors", items: [
        ["Payload", "500 g"],
        ["Imaging", "4K EO / Thermal IR"],
        ["Navigation", "GPS / INS / Vision"],
        ["Comms", "Encrypted mesh radio"],
        ["MTOW", "< 3 kg"],
      ]},
    ],
    imgPlaceholder: "Recon-1 · 3/4-view render · 1200 × 800 px",
  },
  {
    id: "SD-SC1",
    category: "Command Platform",
    status: "Beta",
    statusColor: "border-green-500 text-green-400",
    name: "Swarm Control System",
    tagline: "Unified software for multi-drone mission management",
    image: "/product-swarm.jpg",
    description:
      "The Swarm Control System is the operator interface and intelligence backbone of every SHARK'D deployment. It handles mission planning, real-time fleet orchestration, anomaly triage, and deconfliction for up to 100+ drones simultaneously, from a browser or desktop application.",
    specs: [
      { group: "Capacity & Performance", items: [
        ["Fleet Size", "100+ nodes"],
        ["Command Latency", "< 200 ms"],
        ["Uptime SLA", "99.9% (planned)"],
        ["Mission Presets", "7"],
        ["Redundancy", "Hot failover"],
      ]},
      { group: "Interface & Integration", items: [
        ["Platforms", "Web / Desktop"],
        ["Map Layers", "Satellite / Terrain / DTED"],
        ["Export", "GeoJSON / KML / CSV"],
        ["Auth", "Role-based access control"],
        ["API", "REST + WebSocket"],
      ]},
    ],
    imgPlaceholder: "SCS dashboard dark UI · 1200 × 800 px",
  },
  {
    id: "SD-MI1",
    category: "Intelligence Layer",
    status: "Research",
    statusColor: "border-amber-500 text-amber-400",
    name: "Mission Intelligence Engine",
    tagline: "Onboard edge AI for decentralised autonomous decision-making",
    image: "/product-intelligence.jpg",
    description:
      "The MI Engine runs on each drone and enables fully decentralised reasoning. It processes sensor fusion data in real time, replans when objectives change or nodes fail, and maintains mission continuity without a live uplink — critical for GPS-denied and comms-degraded environments.",
    specs: [
      { group: "Compute & Inference", items: [
        ["Inference Time", "< 50 ms"],
        ["Model Size", "< 8 MB"],
        ["Power Draw", "< 2 W"],
        ["Hardware Target", "ARM Cortex / Nvidia Orin Nano"],
        ["Framework", "TFLite / ONNX Runtime"],
      ]},
      { group: "Sensing & Autonomy", items: [
        ["Sensor Fusion", "Camera / LiDAR / IMU / GPS"],
        ["Comms-Denied", "Full autonomous operation"],
        ["Replan Trigger", "Node loss / boundary breach / timeout"],
        ["Formation Modes", "Line / Wedge / Cluster / Orbit"],
        ["Update OTA", "Yes — signed package delivery"],
      ]},
    ],
    imgPlaceholder: "MI Engine AI network diagram · 1200 × 800 px",
  },
];

export default function ProductsPage() {
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
              <p className="text-blue-400 text-xs uppercase tracking-[6px] mb-5">Products</p>
              <h1 className="text-5xl lg:text-6xl font-black max-w-3xl leading-tight">
                The SHARK'D Platform
              </h1>
              <p className="text-slate-400 text-lg mt-5 max-w-2xl leading-relaxed">
                A complete autonomous aerial system — airframe, command software,
                and embedded intelligence — designed to work as one.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-20 space-y-28">
          {PRODUCTS.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55 }}
            >
              {/* Product header */}
              <div className="flex flex-wrap items-center gap-4 mb-10 pb-6 border-b border-slate-800">
                <span className="text-slate-600 text-sm font-mono">{p.id}</span>
                <span className="text-blue-400 text-xs uppercase tracking-widest">{p.category}</span>
                <span className={`text-[10px] uppercase tracking-widest border px-2 py-0.5 ${p.statusColor}`}>
                  {p.status}
                </span>
              </div>

              <div className="grid lg:grid-cols-2 gap-14 items-start">
                {/* Left: image + description */}
                <div>
<div className="relative bg-slate-900 border border-transparent h-[360px] mb-8 overflow-hidden group cursor-pointer transition-all duration-300 hover:border-cyan-400/60">

  <img
    src={p.image}
    alt={p.name}
    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
  />

  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />

  <span className="absolute top-3 left-3 w-5 h-5 border-t border-l border-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10" />
  <span className="absolute top-3 right-3 w-5 h-5 border-t border-r border-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10" />
  <span className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10" />
  <span className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10" />

</div>

                  <h2 className="text-3xl font-black text-white">{p.name}</h2>
                  <p className="text-slate-400 text-sm mt-1 mb-4">{p.tagline}</p>
                  <p className="text-slate-400 text-base leading-relaxed">{p.description}</p>

                  <div className="mt-8 flex gap-3 flex-wrap">
                    <Link to="/contact">
                      <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 text-xs uppercase tracking-widest font-semibold transition-colors duration-200">
                        Enquire
                      </button>
                    </Link>
                    <Link to="/technology">
                      <button className="border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white px-6 py-2.5 text-xs uppercase tracking-widest font-semibold transition-colors duration-200">
                        See Technology
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Right: spec tables */}
                <div className="space-y-8">
                  {p.specs.map((group) => (
                    <div key={group.group}>
                      <p className="text-slate-500 text-xs uppercase tracking-widest mb-3">{group.group}</p>
                      <table className="w-full border border-slate-800 text-sm">
                        <tbody>
                          {group.items.map(([label, value], ri) => (
                            <tr
                              key={label}
                              className={ri % 2 === 0 ? "bg-slate-900" : "bg-slate-950"}
                            >
                              <td className="px-4 py-2.5 text-slate-400 w-1/2 border-r border-slate-800">{label}</td>
                              <td className="px-4 py-2.5 text-white font-medium">{value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA banner */}
        <div className="border-t border-slate-800 bg-slate-900 w-full">
          <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-20 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-black text-white">
                Need a mission-specific build?
              </h2>
              <p className="text-slate-400 text-base mt-3 leading-relaxed">
                We work with defence integrators, research institutions and
                national agencies on custom platform configurations.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 md:justify-end">
              <Link to="/contact">
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 text-xs uppercase tracking-widest font-semibold transition-colors duration-200">
                  Contact Us
                </button>
              </Link>
              <Link to="/technology">
                <button className="border border-slate-700 hover:border-slate-500 text-slate-300 px-8 py-3.5 text-xs uppercase tracking-widest font-semibold transition-colors duration-200">
                  Our Technology
                </button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </PageWrapper>
  );
}
