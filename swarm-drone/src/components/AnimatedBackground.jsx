import { useEffect, useRef } from "react";

/**
 * Drone-swarm particle network canvas.
 * Drop it as the first child of any `relative` container.
 *
 * Props:
 *   density  – particles per px² (default 0.00008)
 *   color    – base rgba string prefix, e.g. "94,213,220" (cyan) or "59,130,246" (blue)
 *   maxDist  – max connection distance in px (default 140)
 *   speed    – particle speed multiplier (default 1)
 *   className
 */
export default function AnimatedBackground({
  density = 0.00008,
  color = "94,213,220",
  maxDist = 140,
  speed = 1,
  className = "",
}) {
  const ref = useRef(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const c = cv.getContext("2d");
    if (!c) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let particles = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const parent = cv.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      cv.style.width = `${w}px`;
      cv.style.height = `${h}px`;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(20, Math.min(120, Math.round(w * h * density)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28 * speed,
        vy: (Math.random() - 0.5) * 0.28 * speed,
      }));
    }

    function frame() {
      c.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }

      c.lineWidth = 0.8;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxDist * maxDist) {
            const alpha = (1 - Math.sqrt(d2) / maxDist) * 0.18;
            c.strokeStyle = `rgba(${color},${alpha})`;
            c.beginPath();
            c.moveTo(a.x, a.y);
            c.lineTo(b.x, b.y);
            c.stroke();
          }
        }
      }

      for (const p of particles) {
        c.fillStyle = `rgba(${color},0.55)`;
        c.beginPath();
        c.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
        c.fill();
      }

      raf = requestAnimationFrame(frame);
    }

    resize();
    frame();

    const ro = new ResizeObserver(resize);
    if (cv.parentElement) ro.observe(cv.parentElement);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [density, color, maxDist, speed]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  );
}