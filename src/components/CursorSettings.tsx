import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Settings2, X } from "lucide-react";

export type CursorPrefs = {
  enabled: boolean;
  smoothness: number; // 0.05 (very smooth/laggy) -> 1 (instant)
  trail: number;      // 0..12 trail dots
  autoPerformance: boolean; // auto-reduce effects when FPS drops
};

const DEFAULTS: CursorPrefs = { enabled: true, smoothness: 0.45, trail: 6, autoPerformance: true };
const STORAGE_KEY = "rhythm-cursor-prefs";

type Ctx = {
  prefs: CursorPrefs;
  setPrefs: (p: CursorPrefs) => void;
  lowFps: boolean;
  setLowFps: (v: boolean) => void;
};
const CursorCtx = createContext<Ctx>({ prefs: DEFAULTS, setPrefs: () => {}, lowFps: false, setLowFps: () => {} });

export function useCursorPrefs() { return useContext(CursorCtx); }

export function CursorSettingsProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefsState] = useState<CursorPrefs>(DEFAULTS);
  const [lowFps, setLowFps] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setPrefsState({ ...DEFAULTS, ...JSON.parse(raw) });
    } catch {}
  }, []);

  const setPrefs = (p: CursorPrefs) => {
    setPrefsState(p);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch {}
  };

  return <CursorCtx.Provider value={{ prefs, setPrefs, lowFps, setLowFps }}>{children}</CursorCtx.Provider>;
}

export function CursorSettingsButton() {
  const { prefs, setPrefs } = useCursorPrefs();
  const [open, setOpen] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsFinePointer(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        data-cursor="hover"
        aria-label="Cursor settings"
        className="fixed bottom-6 left-6 z-[60] h-11 w-11 rounded-full glass-strong shadow-stage flex items-center justify-center hover:scale-105 transition"
      >
        <Settings2 size={18} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm glass-strong rounded-3xl p-6 shadow-stage">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg">Cursor Settings</h3>
              <button onClick={() => setOpen(false)} className="p-1 hover:opacity-70" aria-label="Close"><X size={18} /></button>
            </div>

            {!isFinePointer && (
              <p className="text-xs text-muted-foreground mb-4 p-3 rounded-xl bg-white/5">
                Touch device detected. The custom cursor is disabled — touch ripples will play instead.
              </p>
            )}

            <label className="flex items-center justify-between text-sm mb-5">
              <span>Enable custom cursor</span>
              <input
                type="checkbox"
                checked={prefs.enabled}
                onChange={(e) => setPrefs({ ...prefs, enabled: e.target.checked })}
                className="h-4 w-4 accent-[oklch(0.65_0.25_295)]"
              />
            </label>

            <div className="mb-5">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-muted-foreground">Smoothness</span>
                <span className="font-mono">{Math.round(prefs.smoothness * 100)}%</span>
              </div>
              <input
                type="range" min={0.05} max={1} step={0.05}
                value={prefs.smoothness}
                onChange={(e) => setPrefs({ ...prefs, smoothness: parseFloat(e.target.value) })}
                className="w-full accent-[oklch(0.65_0.25_295)]"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                <span>Floaty</span><span>Instant</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-muted-foreground">Trail intensity</span>
                <span className="font-mono">{prefs.trail}</span>
              </div>
              <input
                type="range" min={0} max={12} step={1}
                value={prefs.trail}
                onChange={(e) => setPrefs({ ...prefs, trail: parseInt(e.target.value) })}
                className="w-full accent-[oklch(0.78_0.16_210)]"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                <span>None</span><span>Maximum</span>
              </div>
            </div>

            <button
              onClick={() => setPrefs(DEFAULTS)}
              className="mt-6 w-full text-xs text-muted-foreground hover:text-foreground transition"
            >
              Reset to defaults
            </button>
          </div>
        </div>
      )}
    </>
  );
}
