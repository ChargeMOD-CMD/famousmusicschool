import { useEffect, useRef, useState } from "react";
import { useCursorPrefs } from "./CursorSettings";

/**
 * Custom glowing music-orb cursor with rhythmic pulse + soundwave trail.
 * - Disabled on touch devices (replaced by touch-ripple fallback).
 * - Smoothness + trail count are user-configurable via CursorSettings.
 */
export function RhythmCursor() {
  const { prefs } = useCursorPrefs();
  const orbRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<Array<HTMLDivElement | null>>([]);
  const [hovering, setHovering] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsFinePointer(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  // Touch-device fallback: musical ripple on tap
  useEffect(() => {
    if (isFinePointer) return;
    const handleTouch = (e: TouchEvent) => {
      const t = e.touches[0] || e.changedTouches[0];
      if (!t) return;
      const id = Date.now() + Math.random();
      setRipples((r) => [...r, { id, x: t.clientX, y: t.clientY }]);
      setTimeout(() => setRipples((r) => r.filter((x) => x.id !== id)), 900);
    };
    window.addEventListener("touchstart", handleTouch, { passive: true });
    return () => window.removeEventListener("touchstart", handleTouch);
  }, [isFinePointer]);

  // Desktop custom cursor
  useEffect(() => {
    if (!isFinePointer || !prefs.enabled) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx, ry = my;
    const trailCount = prefs.trail;
    const lerp = prefs.smoothness; // higher = snappier
    const trail = Array(trailCount).fill(0).map(() => ({ x: mx, y: my }));

    const handleMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (orbRef.current) orbRef.current.style.transform = `translate3d(${mx - 10}px, ${my - 10}px, 0)`;
      const t = e.target as HTMLElement;
      setHovering(!!t.closest('a, button, input, textarea, select, [data-cursor="hover"]'));
    };

    window.addEventListener("mousemove", handleMove, { passive: true });

    let raf = 0;
    const tick = () => {
      rx += (mx - rx) * Math.min(1, lerp + 0.1);
      ry += (my - ry) * Math.min(1, lerp + 0.1);
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${rx - 24}px, ${ry - 24}px, 0)`;

      let px = mx, py = my;
      for (let i = 0; i < trail.length; i++) {
        trail[i].x += (px - trail[i].x) * lerp;
        trail[i].y += (py - trail[i].y) * lerp;
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
  }, [isFinePointer, prefs.enabled, prefs.smoothness, prefs.trail]);

  // Toggle native cursor visibility based on enabled state
  useEffect(() => {
    if (typeof document === "undefined") return;
    const shouldHide = isFinePointer && prefs.enabled;
    document.documentElement.style.setProperty("--app-cursor", shouldHide ? "none" : "auto");
    document.body.style.cursor = shouldHide ? "none" : "auto";
  }, [isFinePointer, prefs.enabled]);

  // Touch fallback rendering
  if (!isFinePointer) {
    return (
      <div className="pointer-events-none fixed inset-0 z-[9999]">
        {ripples.map((r) => (
          <span
            key={r.id}
            className="absolute h-16 w-16 rounded-full animate-pulse-ring"
            style={{
              left: r.x - 32,
              top: r.y - 32,
              border: "2px solid oklch(0.78 0.16 210 / 0.7)",
              boxShadow: "0 0 24px oklch(0.65 0.25 295 / 0.6)",
            }}
          />
        ))}
      </div>
    );
  }

  if (!prefs.enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      {Array.from({ length: prefs.trail }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { trailRef.current[i] = el; }}
          className="absolute h-1.5 w-1.5 rounded-full"
          style={{
            background: `oklch(0.78 0.16 210 / ${Math.max(0.05, 0.5 - i * 0.07)})`,
            boxShadow: `0 0 8px oklch(0.78 0.16 210 / ${Math.max(0.05, 0.6 - i * 0.08)})`,
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
