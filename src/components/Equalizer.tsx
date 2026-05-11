export function Equalizer({ bars = 5, className = "" }: { bars?: number; className?: string }) {
  return (
    <div className={`flex items-end gap-[3px] h-5 ${className}`}>
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className="w-[3px] rounded-full bg-gradient-aurora bar-eq"
          style={{ animationDelay: `${i * 0.12}s`, height: "100%" }}
        />
      ))}
    </div>
  );
}
