import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/products", label: "Products" },
  { path: "/technology", label: "Technology" },
  { path: "/gallery", label: "Gallery" },
  { path: "/about", label: "About" },
];

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMenuOpen(false), [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-slate-950/95 backdrop-blur-md border-b border-slate-800"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="shrink-0 flex items-center">
          <img
            src="/logo3.png"
            alt="SHARK'D — return to home"
            className="h-9 w-auto object-contain"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`text-sm font-medium uppercase tracking-widest transition-colors duration-200 ${
                isActive(path)
                  ? "text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {label}
              {isActive(path) && (
                <motion.span
                  layoutId="nav-indicator"
                  className="block h-[2px] bg-blue-500 mt-0.5"
                />
              )}
            </Link>
          ))}

          <Link to="/contact">
            <button className="ml-4 border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-5 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-200">
              Contact Us
            </button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {menuOpen ? (
              <>
                <line x1="3" y1="3" x2="19" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="19" y1="3" x2="3" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden overflow-hidden bg-slate-950 border-t border-slate-800"
          >
            <div className="px-4 sm:px-6 py-6 flex flex-col gap-5">
              {NAV_LINKS.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`text-sm font-medium uppercase tracking-widest ${
                    isActive(path) ? "text-white" : "text-slate-400"
                  }`}
                >
                  {label}
                </Link>
              ))}
              <Link to="/contact">
                <button className="mt-2 w-full border border-blue-500 text-blue-400 py-3 text-xs font-semibold uppercase tracking-widest">
                  Contact Us
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
