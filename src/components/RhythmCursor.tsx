import { useEffect, useRef, useState } from "react";

/**
 * Custom glowing music-orb cursor with rhythmic pulse + soundwave trail.
 * Hidden on touch devices via CSS media queries.
 */
export function RhythmCursor() {
  const orbRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<Array<HTMLDivElement | null>>([]);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let ox = mx, oy = my;
    const trail = Array(6).fill(0).map(() => ({ x: mx, y: my }));

    const handleMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const t = e.target as HTMLElement;
      const interactive = !!t.closest('a, button, [data-cursor="hover"]');
      setHovering(interactive);
    };

    window.addEventListener("mousemove", handleMove);

    let raf = 0;
    const tick = () => {
      ox += (mx - ox) * 0.22;
      oy += (my - oy) * 0.22;
      if (orbRef.current) orbRef.current.style.transform = `translate3d(${ox - 10}px, ${oy - 10}px, 0)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ox - 24}px, ${oy - 24}px, 0)`;

      // trail
      let px = ox, py = oy;
      for (let i = 0; i < trail.length; i++) {
        trail[i].x += (px - trail[i].x) * 0.35;
        trail[i].y += (py - trail[i].y) * 0.35;
        const el = trailRef.current[i];
        if (el) el.style.transform = `translate3d(${trail[i].x - 3}px, ${trail[i].y - 3}px, 0)`;
        px = trail[i].x;
        py = trail[i].y;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { trailRef.current[i] = el; }}
          className="absolute h-1.5 w-1.5 rounded-full"
          style={{
            background: `oklch(0.78 0.16 210 / ${0.5 - i * 0.07})`,
            boxShadow: `0 0 8px oklch(0.78 0.16 210 / ${0.6 - i * 0.08})`,
          }}
        />
      ))}
      <div
        ref={ringRef}
        className={`absolute h-12 w-12 rounded-full border transition-all duration-300 ${
          hovering ? "scale-150 border-[oklch(0.82_0.16_80)]" : "scale-100 border-[oklch(0.65_0.25_295/0.6)]"
        }`}
      />
      <div
        ref={orbRef}
        className={`absolute h-5 w-5 rounded-full transition-all duration-200 ${
          hovering ? "scale-150" : "scale-100"
        }`}
        style={{
          background: "var(--gradient-aurora)",
          boxShadow: "0 0 24px oklch(0.65 0.25 295 / 0.9), 0 0 48px oklch(0.78 0.16 210 / 0.5)",
        }}
      />
    </div>
  );
}
