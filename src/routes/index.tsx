import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Waveform } from "@/components/Waveform";
import { Equalizer } from "@/components/Equalizer";
import { ArrowRight, Sparkles, Music, Mic2, Headphones, Disc3, Piano, Guitar, Drum } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Famous Music School — Feel The Rhythm. Become The Music." },
      { name: "description", content: "Chennai's futuristic music academy. Learn keyboard, piano, guitar, drums, violin, vocals, production with AI-guided mentorship." },
      { property: "og:title", content: "The Famous Music School" },
      { property: "og:description", content: "An immersive musical learning universe. Book your free demo." },
    ],
  }),
  component: Home,
});

const stats = [
  { v: "1,200+", l: "Students Trained" },
  { v: "25+", l: "Master Mentors" },
  { v: "120+", l: "Live Concerts" },
  { v: "11", l: "Disciplines" },
];

const instruments = [
  { name: "Piano", icon: Piano },
  { name: "Guitar", icon: Guitar },
  { name: "Drums", icon: Drum },
  { name: "Vocals", icon: Mic2 },
  { name: "Production", icon: Headphones },
  { name: "DJ / Mix", icon: Disc3 },
];

function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="relative pt-36 pb-28 md:pt-44 md:pb-36 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-[radial-gradient(closest-side,oklch(0.65_0.25_295/0.4),transparent)] blur-2xl" />
          <div className="absolute top-40 right-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(closest-side,oklch(0.78_0.16_210/0.3),transparent)] blur-2xl" />
          <Waveform className="absolute inset-x-0 bottom-0 h-72 w-full" lines={4} opacity={0.55} />
        </div>

        {/* floating notes */}
        {["♪", "♫", "♩", "♬", "♭"].map((n, i) => (
          <span
            key={i}
            className="absolute text-3xl text-foreground/20 animate-float font-display select-none pointer-events-none"
            style={{
              top: `${15 + (i * 13) % 60}%`,
              left: `${(i * 19 + 8) % 90}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${6 + i}s`,
            }}
          >
            {n}
          </span>
        ))}

        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-[11px] uppercase tracking-[0.28em]"
          >
            <Equalizer bars={4} className="h-3" />
            <span className="text-muted-foreground">Chennai · Est. 2025</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-7 font-display font-semibold tracking-tight leading-[0.95] text-[clamp(3rem,9vw,7.5rem)]"
          >
            <span className="block text-gradient-aurora">Feel the Rhythm.</span>
            <span className="block text-foreground/95">Become the Music.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mx-auto mt-7 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed"
          >
            A cinematic music universe where instruments, vocals, and production meet AI-guided mentorship — built for the next generation of artists.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              to="/contact"
              data-cursor="hover"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-aurora px-7 py-3.5 text-sm font-semibold text-[oklch(0.13_0.04_270)] shadow-glow-violet transition-transform hover:scale-105"
            >
              Join the Universe
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/programs"
              data-cursor="hover"
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3.5 text-sm font-medium hover:border-[oklch(0.78_0.16_210/0.5)] transition"
            >
              <Sparkles size={15} className="text-[oklch(0.78_0.16_210)]" />
              Explore Programs
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px rounded-3xl glass overflow-hidden border border-border/60"
          >
            {stats.map((s) => (
              <div key={s.l} className="bg-[oklch(0.15_0.04_270/0.6)] px-6 py-7">
                <div className="font-display text-3xl md:text-4xl font-semibold text-gradient-aurora">{s.v}</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* INSTRUMENT MARQUEE */}
      <section className="relative py-20 border-y border-border/40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">02 — Disciplines</div>
              <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold">An orchestra of <span className="text-gradient-violet">possibilities</span></h2>
            </div>
            <Link to="/programs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground" data-cursor="hover">
              View all <ArrowRight size={14}/>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {instruments.map((it, i) => (
              <motion.div
                key={it.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -6 }}
                data-cursor="hover"
                className="group relative aspect-square rounded-3xl glass p-5 flex flex-col justify-between overflow-hidden hover:border-[oklch(0.65_0.25_295/0.5)] transition"
              >
                <span className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-gradient-aurora opacity-0 group-hover:opacity-30 blur-2xl transition" />
                <it.icon size={26} className="text-[oklch(0.78_0.16_210)] group-hover:text-foreground transition" />
                <div>
                  <div className="font-display text-lg font-semibold">{it.name}</div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mt-1">Beginner → Pro</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI LAB */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">03 — AI Music Lab</div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold leading-tight">
              Practice with an <span className="text-gradient-aurora">AI mentor</span> who listens.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed max-w-lg">
              Real-time pitch analysis, rhythm tracking, and creative suggestions — your personal coach between every class. We blend human mentorship with intelligent feedback.
            </p>
            <ul className="mt-7 space-y-3">
              {["Performance analytics", "Rhythm & timing insights", "Creativity prompts", "Personalised practice plans"].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-aurora" /> {f}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square rounded-[2rem] glass-strong shadow-stage overflow-hidden p-8"
          >
            <Waveform className="absolute inset-0 h-full w-full opacity-70" lines={5} opacity={0.7}/>
            <div className="absolute inset-0 bg-[radial-gradient(closest-side,transparent_30%,oklch(0.13_0.04_270/0.7)_100%)]" />
            <div className="relative h-full flex flex-col justify-between">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                <Equalizer bars={4} className="h-3"/> Live Session
              </div>
              <div className="space-y-2 text-sm">
                <div className="glass rounded-2xl p-4">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">Pitch accuracy</div>
                  <div className="font-display text-3xl text-gradient-aurora">96.4%</div>
                </div>
                <div className="glass rounded-2xl p-4">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">Tempo Drift</div>
                  <div className="font-display text-3xl text-gradient-violet">±2 ms</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative rounded-[2.5rem] overflow-hidden glass-strong shadow-stage p-10 md:p-16 text-center">
            <div className="absolute inset-0 bg-gradient-aurora opacity-20" />
            <Waveform className="absolute inset-x-0 bottom-0 h-32 w-full opacity-60" lines={3} opacity={0.6}/>
            <div className="relative">
              <Music size={28} className="mx-auto text-foreground" />
              <h2 className="mt-5 font-display text-3xl md:text-5xl font-semibold leading-tight">
                Your stage is waiting.
              </h2>
              <p className="mt-4 text-muted-foreground max-w-lg mx-auto">Book a free demo session and begin your immersive musical journey today.</p>
              <Link to="/contact" data-cursor="hover" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-aurora px-7 py-3.5 text-sm font-semibold text-[oklch(0.13_0.04_270)] shadow-glow-violet">
                Book Free Demo <ArrowRight size={16}/>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
