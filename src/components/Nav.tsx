import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/programs", label: "Programs" },
  { to: "/mentors", label: "Mentors" },
  { to: "/performances", label: "Performances" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
      <div className={`mx-auto max-w-7xl px-5 transition-all`}>
        <div className={`flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 ${scrolled ? "glass-strong shadow-stage" : "glass"}`}>
          <Logo />
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                data-cursor="hover"
                className="relative px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {({ isActive }) => (
                  <>
                    <span>{l.label}</span>
                    {isActive && (
                      <span className="absolute inset-x-2 -bottom-px h-px bg-gradient-aurora" />
                    )}
                  </>
                )}
              </Link>
            ))}
          </nav>
          <Link
            to="/contact"
            data-cursor="hover"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-gradient-aurora px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[oklch(0.13_0.04_270)] shadow-glow-violet transition-transform hover:scale-105"
          >
            Join Now
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-foreground p-1.5"
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden mt-2 glass-strong rounded-3xl p-4 flex flex-col gap-1 animate-in fade-in slide-in-from-top-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm hover:bg-white/5 transition"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 text-center bg-gradient-aurora text-[oklch(0.13_0.04_270)] font-semibold rounded-full px-4 py-2.5 text-sm"
            >
              Join Now
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
