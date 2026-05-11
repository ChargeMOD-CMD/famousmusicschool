import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { PageShell, SectionHeader } from "@/components/PageShell";
import { Phone, Mail, MessageCircle, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Free Demo — The Famous Music School" },
      { name: "description", content: "Book a free demo session. Reach us by phone, WhatsApp, or visit our Chennai studio." },
      { property: "og:title", content: "Contact The Famous Music School" },
      { property: "og:description", content: "Begin your musical journey today." },
    ],
  }),
  component: Contact,
});

const programs = ["Keyboard","Piano","Guitar","Drums","Violin","Flute","Ukulele","Vocal","Music Production","Songwriting"];

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Enrollment"
          title="Book your free demo."
          lead="Pick a program, share a few details, and we'll tune your first session within 24 hours."
        />

        <div className="mt-16 grid lg:grid-cols-5 gap-6">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="lg:col-span-3 rounded-3xl glass-strong shadow-stage p-7 md:p-10 space-y-5"
          >
            {sent ? (
              <div className="flex flex-col items-center text-center py-12">
                <CheckCircle2 size={48} className="text-[oklch(0.78_0.16_210)]" />
                <h3 className="mt-5 font-display text-2xl font-semibold">Inquiry received 🎶</h3>
                <p className="mt-3 text-sm text-muted-foreground max-w-sm">Our team will reach out within 24 hours to schedule your free demo session.</p>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Full Name" name="name" placeholder="Your name" required />
                  <Field label="Phone" name="phone" placeholder="+91" required />
                </div>
                <Field label="Email" name="email" type="email" placeholder="you@email.com" required />
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-2">Program of Interest</label>
                  <select className="w-full bg-white/5 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[oklch(0.65_0.25_295)] border border-border">
                    {programs.map(p => <option key={p} className="bg-[oklch(0.18_0.05_275)]">{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-2">Message (optional)</label>
                  <textarea rows={4} className="w-full bg-white/5 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[oklch(0.65_0.25_295)] border border-border resize-none" placeholder="Tell us about your musical interests..." />
                </div>
                <button type="submit" data-cursor="hover" className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-aurora px-6 py-3.5 text-sm font-semibold text-[oklch(0.13_0.04_270)] shadow-glow-violet hover:scale-[1.01] transition">
                  Request Free Demo <Send size={15}/>
                </button>
              </>
            )}
          </motion.form>

          {/* Info */}
          <div className="lg:col-span-2 space-y-4">
            <InfoCard icon={Phone} label="Call us" value="+91 97910 99128" href="tel:+919791099128" />
            <InfoCard icon={MessageCircle} label="WhatsApp" value="Chat instantly" href="https://wa.me/919791099128" />
            <InfoCard icon={Mail} label="Email" value="info@thefamousmusicschool.com" href="mailto:info@thefamousmusicschool.com" />
            <InfoCard icon={MapPin} label="Studio" value="Chennai, Tamil Nadu, India" />
            <InfoCard icon={Clock} label="Hours" value="Mon–Fri 9AM–9PM · Sat–Sun 8AM–8PM" />
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-2">{label}</label>
      <input {...rest} className="w-full bg-white/5 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[oklch(0.65_0.25_295)] border border-border placeholder:text-muted-foreground/60" />
    </div>
  );
}

function InfoCard({ icon: Icon, label, value, href }: { icon: any; label: string; value: string; href?: string }) {
  const Wrap: any = href ? "a" : "div";
  return (
    <Wrap href={href} data-cursor={href ? "hover" : undefined} className="block rounded-3xl glass p-5 hover:border-[oklch(0.65_0.25_295/0.5)] transition">
      <div className="flex items-start gap-4">
        <div className="h-11 w-11 grid place-items-center rounded-xl bg-gradient-aurora text-[oklch(0.13_0.04_270)] shrink-0">
          <Icon size={18}/>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
          <div className="mt-1 font-display text-lg leading-tight">{value}</div>
        </div>
      </div>
    </Wrap>
  );
}
