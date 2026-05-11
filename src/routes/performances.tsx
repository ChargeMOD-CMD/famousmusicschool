import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageShell, SectionHeader } from "@/components/PageShell";
import { Quote, Play } from "lucide-react";

export const Route = createFileRoute("/performances")({
  head: () => ({
    meta: [
      { title: "Student Performances — The Famous Music School" },
      { name: "description", content: "Concert highlights, performance galleries, and student success stories from our stage." },
      { property: "og:title", content: "Student Performances" },
      { property: "og:description", content: "Watch our students take the stage." },
    ],
  }),
  component: Performances,
});

const concerts = [
  { title: "Resonance · Annual Showcase", year: "2025", tag: "Stage", grad: "linear-gradient(135deg, oklch(0.65 0.25 295), oklch(0.78 0.16 210))" },
  { title: "Echoes of Carnatic", year: "2025", tag: "Classical", grad: "linear-gradient(135deg, oklch(0.78 0.16 210), oklch(0.82 0.16 80))" },
  { title: "Synthwave Sessions", year: "2024", tag: "Production", grad: "linear-gradient(135deg, oklch(0.5 0.27 300), oklch(0.65 0.25 295))" },
  { title: "Open Mic Friday", year: "Monthly", tag: "Vocal", grad: "linear-gradient(135deg, oklch(0.82 0.16 80), oklch(0.65 0.25 295))" },
  { title: "Drum Circle Live", year: "2024", tag: "Rhythm", grad: "linear-gradient(135deg, oklch(0.78 0.16 210), oklch(0.5 0.27 300))" },
  { title: "Festival Finale", year: "2024", tag: "Showcase", grad: "linear-gradient(135deg, oklch(0.65 0.25 295), oklch(0.82 0.16 80))" },
];

const stories = [
  { name: "Anika, 14", quote: "I went from being shy to performing at our annual concert in just 8 months. The stage feels like home now." },
  { name: "Vikram, 22", quote: "The AI feedback combined with my mentor's coaching transformed my guitar tone completely." },
  { name: "Priya, 17", quote: "I learned to write my own songs here. Three of them are now on streaming platforms." },
];

function Performances() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="On Stage"
          title="Where students become artists."
          lead="Every season, our students take the stage in concerts, recitals, and digital releases. Here are a few unforgettable moments."
        />

        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {concerts.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              data-cursor="hover"
              className="group relative aspect-[4/5] rounded-3xl overflow-hidden glass"
            >
              <div className="absolute inset-0 opacity-80 group-hover:opacity-100 transition" style={{ background: c.grad }} />
              <div className="absolute inset-0 bg-[radial-gradient(closest-side,transparent,oklch(0.08_0.03_270/0.8))]" />
              <div className="relative h-full p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/90 glass px-3 py-1 rounded-full">{c.tag}</span>
                  <span className="h-10 w-10 grid place-items-center rounded-full glass-strong group-hover:bg-gradient-aurora group-hover:text-[oklch(0.13_0.04_270)] transition">
                    <Play size={14} className="ml-0.5"/>
                  </span>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/70">{c.year}</div>
                  <div className="mt-1 font-display text-2xl font-semibold leading-tight">{c.title}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-28">
          <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Voices from the stage</div>
          <h2 className="mt-2 font-display text-3xl md:text-4xl font-semibold">Student stories.</h2>

          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {stories.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-3xl glass p-7"
              >
                <Quote className="text-[oklch(0.78_0.16_210)]" size={22}/>
                <p className="mt-4 text-foreground/90 leading-relaxed">"{s.quote}"</p>
                <div className="mt-5 text-xs uppercase tracking-[0.22em] text-muted-foreground">— {s.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
