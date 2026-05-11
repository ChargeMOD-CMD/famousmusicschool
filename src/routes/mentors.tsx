import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageShell, SectionHeader } from "@/components/PageShell";

export const Route = createFileRoute("/mentors")({
  head: () => ({
    meta: [
      { title: "Mentors & Artists — The Famous Music School" },
      { name: "description", content: "Meet our master mentors — performing artists with decades of stage and studio experience." },
      { property: "og:title", content: "Our Mentors" },
      { property: "og:description", content: "World-class musicians shaping the next generation." },
    ],
  }),
  component: Mentors,
});

const mentors = [
  { name: "Aravind Krishnan", role: "Head of Strings · Violin & Guitar", bio: "Carnatic prodigy turned cross-genre performer. 15+ years on stage." },
  { name: "Meera Subramanian", role: "Vocal Director · Classical & Playback", bio: "Trained in Hindustani & Carnatic; recorded for film soundtracks across India." },
  { name: "Ronan D'Souza", role: "Drums & Live Performance Coach", bio: "Toured with leading indie acts. Specialist in groove, fusion and live dynamics." },
  { name: "Saanvi Rao", role: "Piano & Music Theory", bio: "ABRSM-certified concert pianist with a passion for cinematic composition." },
  { name: "Daniel Mathew", role: "Music Production & Songwriting", bio: "Producer, mixer, and songwriter. Champions emerging artist development." },
  { name: "Lakshmi Iyer", role: "Flute & Eastern Classical", bio: "A meditative, breath-led teaching style rooted in Carnatic tradition." },
];

function Mentors() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Mentors & Artists"
          title="Trained by performers. Inspired daily."
          lead="Our faculty are not just teachers — they're working musicians, recording artists, and stage performers who bring real-world artistry into every lesson."
        />

        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {mentors.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              data-cursor="hover"
              className="group relative rounded-3xl glass overflow-hidden"
            >
              <div className="aspect-[4/3] relative bg-gradient-stage overflow-hidden">
                <div className="absolute inset-0 bg-gradient-aurora opacity-20 group-hover:opacity-40 transition" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="font-bebas text-[110px] leading-none text-foreground/15 group-hover:text-foreground/25 transition">
                    {m.name.split(" ").map(n => n[0]).join("")}
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[oklch(0.13_0.04_270)] to-transparent" />
              </div>
              <div className="p-6">
                <div className="font-display text-xl font-semibold">{m.name}</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-[oklch(0.78_0.16_210)]">{m.role}</div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{m.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
