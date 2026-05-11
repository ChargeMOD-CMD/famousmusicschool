import { useState } from "react";
import { Music4, X, Send } from "lucide-react";
import { Equalizer } from "./Equalizer";

const seedMessages = [
  { from: "ai", text: "Hi! I'm your FAMOUS AI Music Mentor 🎵 Which instrument calls to you today?" },
];

export function AIMentorWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState(seedMessages);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    const aiReply = {
      from: "ai",
      text: "Beautiful choice! Our mentors craft a personalized rhythm path for you. Book a free demo from the Contact page and we'll tune your journey ✨",
    };
    setMsgs((m) => [...m, userMsg, aiReply]);
    setInput("");
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          data-cursor="hover"
          className="fixed bottom-6 right-6 z-40 group"
          aria-label="Open AI Mentor"
        >
          <span className="absolute inset-0 rounded-full bg-gradient-aurora animate-pulse-ring" />
          <span className="absolute inset-0 rounded-full bg-gradient-aurora animate-pulse-ring" style={{ animationDelay: "0.6s" }} />
          <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-aurora shadow-glow-violet text-[oklch(0.13_0.04_270)]">
            <Sparkles size={22} />
          </span>
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-40 w-[min(92vw,360px)] glass-strong rounded-3xl shadow-stage overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between p-4 border-b border-border/60">
            <div className="flex items-center gap-2.5">
              <span className="relative h-9 w-9 grid place-items-center rounded-full bg-gradient-aurora text-[oklch(0.13_0.04_270)]">
                <Sparkles size={16} />
              </span>
              <div>
                <div className="text-sm font-semibold leading-tight">FAMOUS Mentor</div>
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground"><Equalizer bars={3} className="h-2"/> tuned & live</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground" data-cursor="hover"><X size={18}/></button>
          </div>
          <div className="p-4 flex flex-col gap-2.5 max-h-80 overflow-y-auto">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                  m.from === "ai"
                    ? "self-start bg-white/5 text-foreground"
                    : "self-end bg-gradient-aurora text-[oklch(0.13_0.04_270)] font-medium"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-border/60 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about courses, instruments..."
              className="flex-1 bg-white/5 rounded-full px-4 py-2 text-sm outline-none placeholder:text-muted-foreground/70 focus:ring-1 focus:ring-[oklch(0.65_0.25_295)]"
            />
            <button onClick={send} className="h-9 w-9 grid place-items-center rounded-full bg-gradient-aurora text-[oklch(0.13_0.04_270)]" data-cursor="hover">
              <Send size={15}/>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
