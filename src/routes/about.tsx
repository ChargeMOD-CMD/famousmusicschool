import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageShell, SectionHeader } from "@/components/PageShell";
import { Heart, Sparkles, Trophy } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — The Famous Music School" },
      { name: "description", content: "Our creative philosophy, artistic mission, and performance culture at Chennai's most immersive music academy." },
      { property: "og:title", content: "About The Famous Music School" },
      { property: "og:description", content: "Where artistic excellence meets futuristic music education." },
    ],
  }),
  component: About,
});

const pillars = [
  { icon: Heart, title: "Creative Philosophy", body: "We believe music is emotion in motion. Every student is taught to feel before they perform." },
  { icon: Sparkles, title: "Artistic Mission", body: "To craft a generation of musicians fluent in tradition, technology, and self-expression." },
  { icon: Trophy, title: "Performance Culture", body: "From classroom to concert stage — performance is the heartbeat of how we learn." },
];

function About() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="About — Chapter 01"
          title="A music school built like a stage."
          lead="The Famous Music School is more than an academy — it's a creative ecosystem. We blend classical tradition, modern production, and AI-guided practice into one immersive learning universe in the heart of Chennai."
        />

        <div className="mt-20 grid md:grid-cols-3 gap-5">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative rounded-3xl glass p-7 hover:border-[oklch(0.65_0.25_295/0.5)] transition"
              data-cursor="hover"
            >
              <div className="h-11 w-11 grid place-items-center rounded-xl bg-gradient-aurora text-[oklch(0.13_0.04_270)] mb-5">
                <p.icon size={20}/>
              </div>
              <h3 className="font-display text-xl font-semibold">{p.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 grid lg:grid-cols-5 gap-10 items-center">
          <div className="lg:col-span-2">
            <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Our story</div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold">Tradition, reimagined for tomorrow's artists.</h2>
          </div>
          <div className="lg:col-span-3 space-y-4 text-muted-foreground leading-relaxed">
            <p>Founded with a simple belief — every person carries a song waiting to be heard — The Famous Music School blends decades of musical mastery with today's most expressive technology.</p>
            <p>Our mentors are performing artists. Our classrooms breathe like studios. Our students perform on real stages, in front of real audiences, from their very first season.</p>
            <p>This is where rhythm becomes ritual, and learning becomes art.</p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
