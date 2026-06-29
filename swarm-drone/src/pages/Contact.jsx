import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import AnimatedBackground from "../components/AnimatedBackground";

// ─── Data ────────────────────────────────────────────────────────────────────

const INQUIRY_TYPES = [
  "Research Collaboration",
  "System Integration",
  "Product Enquiry",
  "Partnership",
  "Media / Press",
  "General",
];

const ENGAGEMENT_PATHS = [
  {
    title: "Research Partners",
    body: "We collaborate with universities and R&D institutions on swarm AI, navigation, and sensor fusion.",
  },
  {
    title: "Defence Integrators",
    body: "Custom platform builds for defence primes requiring mission-specific autonomous systems.",
  },
  {
    title: "Pilot Programmes",
    body: "Early-access evaluations for operators interested in testing SHARK'D systems in field conditions.",
  },
];

// ─── Drone SVG silhouette (top-down quadcopter) ───────────────────────────────
function DroneSilhouette({ size = 18, color = "#93c5fd" }) {
  const s = size;
  const arm = s * 0.38;
  const rotor = s * 0.18;
  const body = s * 0.14;

  return (
    <svg
      width={s}
      height={s}
      viewBox={`0 0 ${s} ${s}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      <line x1={s * 0.5 - arm} y1={s * 0.5 - arm} x2={s * 0.5 + arm} y2={s * 0.5 + arm} stroke={color} strokeWidth={s * 0.07} strokeLinecap="round" />
      <line x1={s * 0.5 + arm} y1={s * 0.5 - arm} x2={s * 0.5 - arm} y2={s * 0.5 + arm} stroke={color} strokeWidth={s * 0.07} strokeLinecap="round" />
      <circle cx={s * 0.5 - arm} cy={s * 0.5 - arm} r={rotor} fill="none" stroke={color} strokeWidth={s * 0.055} />
      <circle cx={s * 0.5 + arm} cy={s * 0.5 - arm} r={rotor} fill="none" stroke={color} strokeWidth={s * 0.055} />
      <circle cx={s * 0.5 - arm} cy={s * 0.5 + arm} r={rotor} fill="none" stroke={color} strokeWidth={s * 0.055} />
      <circle cx={s * 0.5 + arm} cy={s * 0.5 + arm} r={rotor} fill="none" stroke={color} strokeWidth={s * 0.055} />
      <rect x={s * 0.5 - body} y={s * 0.5 - body} width={body * 2} height={body * 2} rx={s * 0.04} fill={color} />
    </svg>
  );
}

// ─── Drone formation config ───────────────────────────────────────────────────
const DRONE_FORMATION = [
  { xOffset: 0,   delay: 0.05, size: 18 },
  { xOffset: -22, delay: 0.13, size: 15 },
  { xOffset: 22,  delay: 0.13, size: 15 },
  { xOffset: -42, delay: 0.22, size: 13 },
  { xOffset: 42,  delay: 0.22, size: 13 },
];

// ─── Individual drone rendered in fixed overlay ───────────────────────────────
// Positioned absolutely on the screen using the button's bounding rect,
// so it is never clipped by the button's overflow: hidden.
function FixedDrone({ xOffset = 0, delay = 0, size = 16, originX, originY }) {
  const TRAIL_COUNT = 3;

  return (
    <motion.div
      style={{
        position: "absolute",
        left: originX + xOffset,
        top: originY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      initial={{ y: 0, opacity: 0, scale: 0.7 }}
      animate={{
        y: [-4, -140, -380],
        opacity: [0, 1, 0],
        scale: [0.7, 1, 0.5],
      }}
      transition={{
        duration: 1.4,
        delay,
        ease: [0.22, 1, 0.36, 1],
        times: [0, 0.22, 1],
      }}
    >
      {/* Motion trails */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            opacity: [0, 0.22 - i * 0.06, 0],
            y: [(i + 1) * 8, (i + 1) * 18],
            scale: [0.9 - i * 0.1, 0.5 - i * 0.08],
          }}
          transition={{
            duration: 0.6,
            delay: delay + 0.15 + i * 0.05,
            ease: "easeOut",
          }}
        >
          <DroneSilhouette size={size} color={`rgba(147,197,253,${0.35 - i * 0.1})`} />
        </motion.div>
      ))}

      {/* Glow halo */}
      <motion.div
        style={{
          position: "absolute",
          inset: -8,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)",
        }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.2, delay, times: [0, 0.2, 1] }}
      />

      <DroneSilhouette size={size} color="#93c5fd" />
    </motion.div>
  );
}

// ─── Drone Overlay ────────────────────────────────────────────────────────────
// Renders as a fixed full-screen layer so drones can fly freely above all content.
function DroneOverlay({ active, buttonRect }) {
  if (!active || !buttonRect) return null;

  const originX = buttonRect.left + buttonRect.width / 2;
  const originY = buttonRect.top + buttonRect.height / 2;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      {DRONE_FORMATION.map((d, i) => (
        <FixedDrone
          key={i}
          {...d}
          originX={originX}
          originY={originY}
        />
      ))}
    </div>
  );
}

// ─── Launch Button ────────────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
function LaunchButton({ onSuccess, onError }) {
  const [phase, setPhase] = useState("idle");
  const buttonRef = useRef(null);
  const [buttonRect, setButtonRect] = useState(null);

  const handleClick = async () => {
    if (phase !== "idle") return;

    // Capture position before any animation shifts the layout
    if (buttonRef.current) {
      setButtonRect(buttonRef.current.getBoundingClientRect());
    }

    setPhase("sending");
    await new Promise((r) => setTimeout(r, 180));

    setPhase("opening");
    await new Promise((r) => setTimeout(r, 450));

    setPhase("launching");
    await new Promise((r) => setTimeout(r, 1200));

    setPhase("closing");
    await new Promise((r) => setTimeout(r, 400));

    setPhase("idle");
    setButtonRect(null);
    onSuccess();
  };

  const isOpen = phase === "opening" || phase === "launching";
  const isAnimating = phase !== "idle";
  const showDrones = phase === "launching";

  return (
    <>
      {/* Drone overlay rendered outside the button — no overflow clipping */}
      <DroneOverlay active={showDrones} buttonRect={buttonRect} />

      <motion.button
        ref={buttonRef}
        type="button"
        onClick={handleClick}
        disabled={isAnimating}
        style={{ position: "relative", overflow: "hidden" }}
        animate={phase === "sending" ? { scale: 0.985 } : { scale: 1 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="w-full bg-blue-600 hover:bg-blue-500 disabled:cursor-not-allowed text-white py-3.5 text-xs uppercase tracking-widest font-semibold transition-colors duration-200"
      >
        {/* Label */}
        <motion.span
          animate={{ opacity: isAnimating ? 0 : 1 }}
          transition={{ duration: 0.15 }}
          style={{ display: "block" }}
        >
          {phase === "idle" ? "Send Message" : "Launching…"}
        </motion.span>

        {/* Hangar animation (stays inside the button) */}
        <AnimatePresence>
          {isAnimating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "stretch",
                overflow: "hidden",
              }}
            >
              {/* Hangar interior */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to bottom, #0f172a 0%, #0c1a3a 50%, #0f172a 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Ambient glow */}
                <motion.div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(37,99,235,0.28) 0%, transparent 70%)",
                  }}
                  animate={{ opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                />

                {/* Floor grid */}
                <motion.div
                  animate={{ opacity: isOpen ? 0.35 : 0 }}
                  transition={{ duration: 0.25, delay: 0.15 }}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "20%",
                    right: "20%",
                    height: "40%",
                    background:
                      "repeating-linear-gradient(90deg, rgba(59,130,246,0.3) 0px, rgba(59,130,246,0.3) 1px, transparent 1px, transparent 18px)",
                  }}
                />
              </div>

              {/* Left door */}
              <motion.div
                animate={{ x: isOpen ? "-100%" : "0%" }}
                transition={{
                  duration: 0.4,
                  ease: [0.32, 0, 0.67, 0],
                  delay: isOpen ? 0 : 0.05,
                }}
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  width: "50%",
                  background: "linear-gradient(to right, #1e3a5f 0%, #1d4ed8 85%, #2563eb 100%)",
                  zIndex: 20,
                  borderRight: "1px solid rgba(147,197,253,0.15)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: "0 8px",
                    background:
                      "repeating-linear-gradient(0deg, transparent 0px, transparent 7px, rgba(255,255,255,0.04) 7px, rgba(255,255,255,0.04) 8px)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "15%",
                    bottom: "15%",
                    width: 2,
                    background: "linear-gradient(to bottom, transparent, rgba(147,197,253,0.5), transparent)",
                  }}
                />
              </motion.div>

              {/* Right door */}
              <motion.div
                animate={{ x: isOpen ? "100%" : "0%" }}
                transition={{
                  duration: 0.4,
                  ease: [0.32, 0, 0.67, 0],
                  delay: isOpen ? 0 : 0.05,
                }}
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  right: 0,
                  width: "50%",
                  background: "linear-gradient(to left, #1e3a5f 0%, #1d4ed8 85%, #2563eb 100%)",
                  zIndex: 20,
                  borderLeft: "1px solid rgba(147,197,253,0.15)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: "0 8px",
                    background:
                      "repeating-linear-gradient(0deg, transparent 0px, transparent 7px, rgba(255,255,255,0.04) 7px, rgba(255,255,255,0.04) 8px)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "15%",
                    bottom: "15%",
                    width: 2,
                    background: "linear-gradient(to bottom, transparent, rgba(147,197,253,0.5), transparent)",
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [inquiryType, setInquiryType] = useState(INQUIRY_TYPES[0]);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE || "service_h6l63ro",
        import.meta.env.VITE_EMAILJS_TEMPLATE || "template_jpm1u7p",
        form.current,
        import.meta.env.VITE_EMAILJS_KEY || "hGTiiBLKecDtwluwh"
      )
      .then(
        () => {
          setLoading(false);
          form.current.reset();
        },
        () => {
          setLoading(false);
          showNotification("error", "Send failed. Please try email directly.");
        }
      );
  };

  const handleLaunchSuccess = () => {
    showNotification("success", "Mission launched. We'll be in touch shortly.");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    sendEmail(e);
  };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-transparent text-white w-full">

        {/* Notification */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ y: -80, opacity: 0 }}
              animate={{ y: 80, opacity: 1 }}
              exit={{ y: -80, opacity: 0 }}
              className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 px-6 py-3 text-sm font-medium tracking-wide ${
                notification.type === "success"
                  ? "bg-green-900 border border-green-700 text-green-300"
                  : "bg-red-900 border border-red-700 text-red-300"
              }`}
            >
              {notification.message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page header */}
        <div className="relative pt-40 pb-16 border-b border-slate-800 w-full overflow-hidden">
          <AnimatedBackground density={0.00005} color="59,130,246" maxDist={130} />
          <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-blue-400 text-xs uppercase tracking-[6px] mb-5">Contact</p>
              <h1 className="text-5xl lg:text-6xl font-black max-w-2xl leading-tight">
                Let's Talk Missions
              </h1>
              <p className="text-slate-400 text-lg mt-5 max-w-xl leading-relaxed">
                Whether you're a researcher, integrator, or operator — we want to
                hear about your mission.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 py-20">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 items-start">

            {/* Left panel */}
            <div>
              <div className="relative space-y-0 border border-slate-800 mb-10 overflow-hidden">
                <AnimatedBackground density={0.00006} color="59,130,246" maxDist={100} />
                {ENGAGEMENT_PATHS.map((ep, i) => (
                  <div
                    key={ep.title}
                    className={`relative z-10 p-6 ${i < ENGAGEMENT_PATHS.length - 1 ? "border-b border-slate-800" : ""}`}
                  >
                    <p className="text-white font-semibold text-sm">{ep.title}</p>
                    <p className="text-slate-500 text-sm mt-2 leading-relaxed">{ep.body}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-blue-400 text-xs uppercase tracking-widest mb-1">Email</p>
                  <a
                    href="mailto:sharkd5051@gmail.com"
                    className="text-white text-sm hover:text-blue-400 transition-colors"
                  >
                    sharkd5051@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-blue-400 text-xs uppercase tracking-widest mb-1">Location</p>
                  <p className="text-white text-sm">Bengaluru, Karnataka, India</p>
                </div>
                <div>
                  <p className="text-blue-400 text-xs uppercase tracking-widest mb-1">Response Time</p>
                  <p className="text-white text-sm">Within 48 hours for qualified enquiries</p>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="border border-slate-800 p-6 sm:p-10">
              <h2 className="text-2xl font-black mb-8">Send a Message</h2>

              <form ref={form} onSubmit={handleFormSubmit} className="space-y-5">

                <div>
                  <label className="block text-slate-400 text-xs uppercase tracking-widest mb-3">
                    Inquiry Type
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {INQUIRY_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setInquiryType(type)}
                        className={`text-xs px-3 py-1.5 border uppercase tracking-wide transition-colors duration-150 ${
                          inquiryType === type
                            ? "border-blue-500 text-blue-400 bg-blue-500/10"
                            : "border-slate-700 text-slate-500 hover:border-slate-600"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                  <input type="hidden" name="inquiry_type" value={inquiryType} />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-slate-400 text-xs uppercase tracking-widest mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      placeholder="Your name"
                      className="w-full bg-slate-900 border border-slate-800 px-4 py-3 text-white text-sm placeholder-slate-700 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-slate-400 text-xs uppercase tracking-widest mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      placeholder="you@org.com"
                      className="w-full bg-slate-900 border border-slate-800 px-4 py-3 text-white text-sm placeholder-slate-700 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="org" className="block text-slate-400 text-xs uppercase tracking-widest mb-2">
                    Organisation <span className="text-slate-700 normal-case tracking-normal">(optional)</span>
                  </label>
                  <input
                    id="org"
                    type="text"
                    name="organisation"
                    placeholder="Company / Institution"
                    className="w-full bg-slate-900 border border-slate-800 px-4 py-3 text-white text-sm placeholder-slate-700 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-slate-400 text-xs uppercase tracking-widest mb-2">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    required
                    placeholder="What's this about?"
                    className="w-full bg-slate-900 border border-slate-800 px-4 py-3 text-white text-sm placeholder-slate-700 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-slate-400 text-xs uppercase tracking-widest mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    name="message"
                    required
                    placeholder="Describe your mission, use-case or requirement..."
                    className="w-full bg-slate-900 border border-slate-800 px-4 py-3 text-white text-sm placeholder-slate-700 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                <LaunchButton onSuccess={handleLaunchSuccess} onError={() => {}} />

              </form>
            </div>

          </div>
        </div>

      </div>
    </PageWrapper>
  );
}