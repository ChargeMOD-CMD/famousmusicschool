import { Link } from "@tanstack/react-router";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 group" data-cursor="hover">
      <span className="relative flex h-9 w-9 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-gradient-aurora opacity-90 blur-[6px] group-hover:opacity-100" />
        <svg viewBox="0 0 40 40" className="relative h-9 w-9">
          <defs>
            <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.65 0.25 295)" />
              <stop offset="50%" stopColor="oklch(0.78 0.16 210)" />
              <stop offset="100%" stopColor="oklch(0.82 0.16 80)" />
            </linearGradient>
          </defs>
          <circle cx="20" cy="20" r="18" fill="none" stroke="url(#lg)" strokeWidth="1.5" opacity="0.7" />
          <circle cx="20" cy="20" r="13" fill="none" stroke="url(#lg)" strokeWidth="1" opacity="0.4" />
          <path d="M16 12 L16 24 A3 3 0 1 1 14 21 L14 14 L24 12 L24 22 A3 3 0 1 1 22 19 L22 14 Z" fill="url(#lg)" />
        </svg>
      </span>
      <div className="leading-none">
        <div className="font-display text-[15px] font-semibold tracking-tight">FAMOUS</div>
        <div className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground">Music School</div>
      </div>
    </Link>
  );
}
