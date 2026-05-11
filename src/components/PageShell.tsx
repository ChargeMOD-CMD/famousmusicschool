import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      className="pt-28 pb-12"
    >
      {children}
    </motion.main>
  );
}

export function SectionHeader({ eyebrow, title, lead }: { eyebrow?: string; title: string; lead?: string }) {
  return (
    <div className="max-w-3xl">
      {eyebrow && (
        <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-aurora" />
          {eyebrow}
        </div>
      )}
      <h1 className="mt-5 font-display text-4xl md:text-6xl font-semibold leading-[1.05] text-gradient-aurora">{title}</h1>
      {lead && <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">{lead}</p>}
    </div>
  );
}
