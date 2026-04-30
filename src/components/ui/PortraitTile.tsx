type Props = {
  bg: string;
  size?: number;
  src?: string;
  alt?: string;
};

export function PortraitTile({ bg, size = 420, src, alt }: Props) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: "100%",
        aspectRatio: "1 / 1.05",
        maxHeight: size,
        borderRadius: 28,
        background: bg,
        boxShadow: "0 10px 40px -8px rgba(14,83,77,0.15)",
      }}
    >
      {src ? (
        <img
          src={src}
          alt={alt ?? ""}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <>
          <svg
            viewBox="0 0 200 200"
            preserveAspectRatio="xMidYMid slice"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="pt-glow" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </radialGradient>
            </defs>
            <rect width="200" height="200" fill="url(#pt-glow)" />
            <circle cx="100" cy="78" r="34" fill="rgba(0,0,0,0.18)" />
            <path d="M28 220 Q28 130 100 130 Q172 130 172 220 Z" fill="rgba(0,0,0,0.18)" />
          </svg>
          <span
            className="absolute bottom-3 right-4 text-xs font-mono"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            photo placeholder
          </span>
        </>
      )}
    </div>
  );
}
