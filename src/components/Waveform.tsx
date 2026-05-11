import { useEffect, useRef } from "react";

/** Animated soundwave canvas — flowing sine layers reacting subtly to time. */
export function Waveform({ className = "", lines = 3, opacity = 0.5 }: { className?: string; lines?: number; opacity?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let t = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["oklch(0.65 0.25 295)", "oklch(0.78 0.16 210)", "oklch(0.82 0.16 80)"];

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      for (let l = 0; l < lines; l++) {
        ctx.beginPath();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = colors[l % colors.length];
        ctx.globalAlpha = opacity * (1 - l * 0.18);
        const amp = h * 0.18 * (1 - l * 0.15);
        const freq = 0.008 + l * 0.003;
        const speed = t * (0.6 + l * 0.3);
        for (let x = 0; x <= w; x += 4) {
          const y = h / 2 + Math.sin(x * freq + speed) * amp + Math.sin(x * freq * 2.1 + speed * 1.4) * amp * 0.4;
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      t += 0.02;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [lines, opacity]);

  return <canvas ref={ref} className={className} />;
}
