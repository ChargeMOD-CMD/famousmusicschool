import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageShell, SectionHeader } from "@/components/PageShell";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Programs & Courses — The Famous Music School" },
      { name: "description", content: "Instrument training, vocal coaching, music production and creative programs for every level — from beginner to performer." },
      { property: "og:title", content: "Programs at The Famous Music School" },
      { property: "og:description", content: "Keyboard, Piano, Guitar, Drums, Violin, Vocals, Production and more." },
    ],
  }),
  component: Programs,
});

const groups = [
  {
    label: "Instrument Training",
    color: "var(--gradient-violet)",
    items: ["Keyboard", "Piano", "Guitar", "Drums", "Violin", "Flute", "Ukulele"],
  },
  {
    label: "Vocal Training",
    color: "var(--gradient-cyan)",
    items: ["Classical Vocal", "Western Vocal", "Playback Singing", "Voice Training"],
  },
  {
    label: "Creative Programs",
    color: "var(--gradient-aurora)",
    items: ["Music Production", "Songwriting", "Live Performance Coaching", "Music Theory"],
  },
];

function Programs() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Programs — 11 Disciplines"
          title="Choose your instrument. Discover your voice."
          lead="Every program is taught by performing artists, structured into clear pathways from beginner to stage-ready performer."
        />

        <div className="mt-20 space-y-16">
          {groups.map((g, gi) => (
            <div key={g.label}>
              <div className="flex items-end justify-between mb-6">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">0{gi + 1}</div>
                  <h2 className="mt-2 font-display text-3xl md:text-4xl font-semibold">{g.label}</h2>
                </div>
                <div className="hidden md:block h-px flex-1 mx-8 bg-border" />
                <div className="text-xs text-muted-foreground">{g.items.length} programs</div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {g.items.map((name, i) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{ y: -4 }}
                    data-cursor="hover"
                    className="group relative rounded-3xl glass p-6 overflow-hidden hover:border-[oklch(0.65_0.25_295/0.5)] transition"
                  >
                    <div className="absolute -top-1/2 -right-1/2 h-[180%] w-[180%] rounded-full opacity-0 group-hover:opacity-20 blur-3xl transition" style={{ background: g.color }} />
                    <div className="relative flex items-start justify-between">
                      <div>
                        <div className="font-display text-xl font-semibold">{name}</div>
                        <div className="mt-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">3-month foundation · weekly mentor</div>
                      </div>
                      <ArrowUpRight size={18} className="text-muted-foreground group-hover:text-foreground group-hover:rotate-12 transition" />
                    </div>
                    <Link to="/contact" className="mt-5 inline-block text-xs uppercase tracking-[0.22em] text-[oklch(0.78_0.16_210)] hover:text-foreground" data-cursor="hover">
                      Enquire →
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
