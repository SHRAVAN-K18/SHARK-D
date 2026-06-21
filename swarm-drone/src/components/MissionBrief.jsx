import { motion } from "framer-motion";

const USE_CASES = [
  {
    id: "01",
    title: "Border Surveillance",
    body: "Persistent autonomous patrols across wide-area perimeters. Swarm nodes hand off coverage seamlessly, maintaining continuous situational awareness with zero operator fatigue.",
  },
  {
    id: "02",
    title: "Search & Rescue",
    body: "Rapid area search with collaborative sensor fusion. Multiple drones cover fragmented terrain simultaneously and relay survivor detections to ground teams in real time.",
  },
  {
    id: "03",
    title: "Infrastructure Inspection",
    body: "Pipeline, power line, and facility inspection with centimetre-precision imaging. Autonomous anomaly flagging reduces manual review time by up to 80%.",
  },
  {
    id: "04",
    title: "Tactical Reconnaissance",
    body: "Low-signature ISR missions in contested environments. Comms-denied operation ensures mission continuity even in electronically degraded theatres.",
  },
];

export default function MissionBrief() {
  return (
    <section className="bg-slate-950 py-32 border-t border-slate-800 w-full">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="grid md:grid-cols-2 gap-16 items-end mb-20"
        >
          <div>
            <p className="text-blue-400 text-xs uppercase tracking-[6px] mb-4">Mission Profiles</p>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              Built for the<br />
              <span className="text-blue-400">World's Hardest Missions</span>
            </h2>
          </div>
          <p className="text-slate-400 text-lg leading-relaxed">
            SHARK'D systems are designed for environments where conventional
            platforms fail — comms-degraded, GPS-denied, and time-critical
            operations where swarm autonomy provides the decisive edge.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-px bg-slate-800 border border-slate-800">
          {USE_CASES.map((uc, i) => (
            <motion.div
              key={uc.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-slate-950 p-10 hover:bg-slate-900 transition-colors duration-200 group"
            >
              <span className="text-slate-700 text-4xl font-black group-hover:text-slate-600 transition-colors duration-200">
                {uc.id}
              </span>
              <h3 className="text-white font-bold text-xl mt-4">{uc.title}</h3>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed">{uc.body}</p>
              <div className="mt-6 flex items-center gap-2 text-blue-400 text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-200">

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
