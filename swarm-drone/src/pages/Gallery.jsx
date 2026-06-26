import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import AnimatedBackground from "../components/AnimatedBackground";

const ITEMS = [
  // Hardware × 3
  {
    id: "hw-1",
    label: "Airframe Design",
    sub: "CAD Render · Rev 3",
    image: "/gallery-windtunnel.jpg",
    category: "Hardware",
  },
  {
    id: "hw-2",
    label: "Modular Payload",
sub: "Configurable mission payloads",
    image: "/gallery-payload.png",
    category: "Hardware", 
  },
  {
    id: "hw-3",
    label: "Next-gen Propulsion",
    sub: "Advanced electric propulsion system",
    image: "/gallery-propulsion.jpg",
    category: "Hardware",
  },

  // Software × 3
  {
    id: "sw-1",
    label: "Swarm Simulation",
    sub: "Formation flight · 24 nodes",
    image: "/gallery-formation.jpg",
    category: "Software",
  },
  {
    id: "sw-2",
    label: "Mission Planning UI",
    sub: "Ground control interface",
    image: "/gallery-ui.jpg",
    category: "Software",
  },
  {
    id: "sw-3",
    label: "Digital Twin",
    sub: "Real-time system visualization",
    image: "/gallery-twin.png",
    category: "Software",
  },

  // Field Tests × 3
{
  id: "ft-1",
  label: "Flight Test",
  sub: "Field trial · Phase 2",
  image: "/gallery-flight.png",
  category: "Field Tests",
},
{
  id: "ft-2",
  label: "Ground Station",
  sub: "Mission command & control",
  image: "/gallery-ground.jpg",
  category: "Field Tests",
},
{
  id: "ft-3",
  label: "Pre-flight Inspection",
  sub: "Systems verification & calibration",
  image: "/gallery-inspect.png",
  category: "Field Tests",
},
];
const FILTERS = ["All", "Hardware", "Software", "Field Tests"];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null); // index of open image

  const filtered =
    activeFilter === "All"
      ? ITEMS
      : ITEMS.filter((item) => item.category === activeFilter);

  const openLightbox = (item) => {
    if (!item.placeholder) setLightbox(item);
  };

  const closeLightbox = () => setLightbox(null);

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
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`text-xs uppercase tracking-widest px-4 py-2 border transition-colors duration-150 ${
                    activeFilter === f
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
          <div
  className={`grid gap-8 ${
    activeFilter === "All"
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-1 lg:grid-cols-2"
  }`}
>
              {filtered.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => openLightbox(item)}
                  className={`relative bg-slate-900 border border-slate-800 overflow-hidden group ${
                    item.placeholder
                      ? "cursor-default"
                      : "cursor-pointer"
                  }`}
                  style={{ aspectRatio: "16/11" }}
                >
                  {item.placeholder ? (
                    /* Placeholder card */
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                      {/* Animated dashed border via SVG */}
                      <svg
                        className="absolute inset-0 w-full h-full"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="1"
                          y="1"
                          width="calc(100% - 2px)"
                          height="calc(100% - 2px)"
                          fill="none"
                          stroke="rgba(100,116,139,0.4)"
                          strokeWidth="1"
                          strokeDasharray="6 4"
                        />
                      </svg>
                      <div className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-slate-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </div>
                      <p className="text-slate-500 text-sm font-semibold">
                        {item.label}
                      </p>
                      <p className="text-slate-600 text-xs">{item.sub}</p>
                    </div>
                  ) : (
                    /* Normal image card */
                    <>
                      <img
                        src={item.image}
                        alt={item.label}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                      {/* Blue border on hover */}
                      <div className="absolute inset-0 border border-blue-500/0 group-hover:border-blue-500/30 transition-colors duration-300 pointer-events-none" />
                      {/* Corner brackets */}
                      <span className="absolute top-3 left-3 w-5 h-5 border-t border-l border-slate-700 pointer-events-none" />
                      <span className="absolute top-3 right-3 w-5 h-5 border-t border-r border-slate-700 pointer-events-none" />
                      {/* Category badge */}
                      {item.category && (
                        <span className="absolute top-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-slate-400 bg-black/50 px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {item.category}
                        </span>
                      )}
                      {/* Caption */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-white text-sm font-semibold leading-snug">
                          {item.label}
                        </p>
                        <p className="text-slate-400 text-xs mt-0.5">{item.sub}</p>
                      </div>
                      {/* Expand icon */}
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg
                          className="w-4 h-4 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                          />
                        </svg>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
          </div>


        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.image}
                alt={lightbox.label}
                className="w-full max-h-[80vh] object-contain"
              />
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold">{lightbox.label}</p>
                  <p className="text-slate-400 text-sm mt-0.5">{lightbox.sub}</p>
                </div>
                <button
                  onClick={closeLightbox}
                  className="text-slate-400 hover:text-white text-xs uppercase tracking-widest border border-slate-700 hover:border-slate-500 px-4 py-2 transition-colors duration-150"
                >
                  Close
                </button>
              </div>
              {/* Close X */}
              <button
                onClick={closeLightbox}
                className="absolute -top-10 right-0 text-slate-500 hover:text-white transition-colors duration-150"
                aria-label="Close lightbox"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}