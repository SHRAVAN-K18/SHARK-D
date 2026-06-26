import { motion } from "framer-motion";

function PageWrapper({ children }) {
  return (
    <div className="relative min-h-screen">

      {/* ── Video background ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/bg.mp4" type="video/mp4" />
        </video>

        {/* Heavy dark overlay so page content stays readable */}
        <div className="absolute inset-0 bg-slate-950/85" />

        {/* Subtle grid */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.03]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="pw-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#60a5fa" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pw-grid)" />
        </svg>

        {/* Bottom glow accent */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-blue-600/10 rounded-full blur-[100px]" />
      </div>

      {/* ── Page content sits above video ── */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>

    </div>
  );
}

export default PageWrapper;