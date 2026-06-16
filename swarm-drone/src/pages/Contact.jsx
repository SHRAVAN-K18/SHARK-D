import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "../components/PageWrapper";

/*
  EmailJS credentials should be moved to .env:
    VITE_EMAILJS_SERVICE  = service_h6l63ro
    VITE_EMAILJS_TEMPLATE = template_jpm1u7p
    VITE_EMAILJS_KEY      = hGTiiBLKecDtwluwh
  Then reference via import.meta.env.VITE_EMAILJS_*
*/

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

export default function ContactPage() {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [inquiryType, setInquiryType] = useState(INQUIRY_TYPES[0]);

  const sendEmail = (e) => {
    e.preventDefault();
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
          setNotification({ type: "success", message: "Message sent. We'll be in touch shortly." });
          form.current.reset();
          setTimeout(() => setNotification(null), 4000);
        },
        () => {
          setLoading(false);
          setNotification({ type: "error", message: "Send failed. Please try email directly." });
          setTimeout(() => setNotification(null), 4000);
        }
      );
  };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-slate-950 text-white">

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
        <div className="pt-40 pb-16 border-b border-slate-800 max-w-6xl mx-auto px-6">
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

        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 items-start">

            {/* ── Left panel ── */}
            <div>
              {/* Engagement paths */}
              <div className="space-y-0 border border-slate-800 mb-10">
                {ENGAGEMENT_PATHS.map((ep, i) => (
                  <div
                    key={ep.title}
                    className={`p-6 ${i < ENGAGEMENT_PATHS.length - 1 ? "border-b border-slate-800" : ""}`}
                  >
                    <p className="text-white font-semibold text-sm">{ep.title}</p>
                    <p className="text-slate-500 text-sm mt-2 leading-relaxed">{ep.body}</p>
                  </div>
                ))}
              </div>

              {/* Direct contact */}
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

            {/* ── Contact form ── */}
            <div className="border border-slate-800 p-10">
              <h2 className="text-2xl font-black mb-8">Send a Message</h2>

              <form ref={form} onSubmit={sendEmail} className="space-y-5">

                {/* Inquiry type selector */}
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
                  {/* Hidden field to include inquiry type in email */}
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

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3.5 text-xs uppercase tracking-widest font-semibold transition-colors duration-200"
                >
                  {loading ? "Sending…" : "Send Message"}
                </button>

              </form>
            </div>

          </div>
        </div>

      </div>
    </PageWrapper>
  );
}
