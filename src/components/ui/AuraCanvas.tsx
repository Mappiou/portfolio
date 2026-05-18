type Props = {
  colors: string[];
  opacity?: number;
};

export function AuraCanvas({ colors, opacity = 0.35 }: Props) {
  const [a, b, c] = [colors[0] ?? "#C7C0A8", colors[1] ?? "#D4B5C7", colors[2] ?? "#A04A2D"];
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0, opacity }}
      aria-hidden="true"
    >
      <div
        className="absolute"
        style={{
          top: "6%",
          left: "8%",
          width: "36rem",
          height: "36rem",
          borderRadius: "50%",
          background: a,
          filter: "blur(160px)",
        }}
      />
      <div
        className="absolute"
        style={{
          top: "30%",
          right: "4%",
          width: "30rem",
          height: "30rem",
          borderRadius: "50%",
          background: b,
          filter: "blur(170px)",
        }}
      />
      <div
        className="absolute"
        style={{
          bottom: "8%",
          left: "28%",
          width: "32rem",
          height: "32rem",
          borderRadius: "50%",
          background: c,
          filter: "blur(180px)",
          opacity: 0.6,
        }}
      />
    </div>
  );
}
