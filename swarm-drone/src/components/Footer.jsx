import { Link } from "react-router-dom";

const LINKS = {
  Platform: [
    { label: "Products", to: "/products" },
    { label: "Technology", to: "/technology" },
    { label: "Gallery", to: "/gallery" },
  ],
  Company: [
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ],
  "Mission Profiles": [
    { label: "Border Surveillance", to: "/technology" },
    { label: "Search & Rescue", to: "/technology" },
    { label: "Infrastructure Inspection", to: "/technology" },
    { label: "Tactical Reconnaissance", to: "/technology" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-black border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">

        {/* Top row */}
        <div className="grid md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 pb-12 border-b border-slate-900">

          {/* Brand column */}
          <div>
            <Link to="/">
              <img
                src="/logo3.png"
                alt="SHARK'D"
                className="h-8 w-auto object-contain mb-5"
              />
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Scalable Hybrid Autonomous Reconnaissance &amp; Kinematic Drones.
              Advancing swarm intelligence for the missions that matter.
            </p>
            <p className="text-slate-600 text-xs mt-4">Bengaluru, India</p>
            <a
              href="mailto:sharkd5051@gmail.com"
              className="text-blue-500 text-xs mt-1 block hover:text-blue-400 transition-colors"
            >
              sharkd5051@gmail.com
            </a>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([heading, items]) => (
            <div key={heading}>
              <p className="text-white text-xs font-semibold uppercase tracking-widest mb-4">
                {heading}
              </p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="text-slate-500 hover:text-slate-300 text-sm transition-colors duration-150"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-700 text-xs">
            © 2026 SHARK'D. All rights reserved.
          </p>
          <p className="text-slate-800 text-xs text-center">
            SHARK'D is a research and development initiative. Product specifications subject to change.
          </p>
        </div>

      </div>
    </footer>
  );
}
