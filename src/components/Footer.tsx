import { Link } from "@tanstack/react-router";
import { Phone, Mail, MessageCircle, Instagram, Youtube, Music2 } from "lucide-react";
import { Logo } from "./Logo";
import { Waveform } from "./Waveform";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border/50 overflow-hidden">
      <Waveform className="absolute inset-x-0 top-0 h-32 w-full opacity-40" lines={3} opacity={0.5} />
      <div className="relative mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-5 max-w-md text-sm text-muted-foreground leading-relaxed">
            A futuristic music-learning academy nurturing creativity, artistic excellence, and immersive musical performance.
          </p>
          <p className="mt-4 font-display italic text-foreground/90">"Feel The Rhythm. Become The Music."</p>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">Explore</h4>
          <ul className="space-y-2.5 text-sm">
            {[
              ["/about", "About"],
              ["/programs", "Programs"],
              ["/mentors", "Mentors"],
              ["/performances", "Performances"],
              ["/contact", "Contact"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-muted-foreground hover:text-foreground transition" data-cursor="hover">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">Connect</h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href="tel:+919791099128" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition" data-cursor="hover"><Phone size={14}/> +91 97910 99128</a></li>
            <li><a href="https://wa.me/919791099128" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition" data-cursor="hover"><MessageCircle size={14}/> WhatsApp</a></li>
            <li><a href="mailto:info@thefamousmusicschool.com" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition" data-cursor="hover"><Mail size={14}/> Email</a></li>
          </ul>
          <div className="mt-5 flex gap-2.5">
            {[Instagram, Youtube, Music2].map((Icon, i) => (
              <a key={i} href="#" className="h-9 w-9 grid place-items-center rounded-full glass hover:bg-gradient-aurora hover:text-[oklch(0.13_0.04_270)] transition-all" data-cursor="hover">
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="relative border-t border-border/40 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} The Famous Music School · Chennai, India
      </div>
    </footer>
  );
}
