type Props = {
  colors: string[];
  opacity?: number;
};

export function AuraCanvas({ colors, opacity = 0.5 }: Props) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0, opacity }}
      aria-hidden="true"
    >
      <div
        className="absolute"
        style={{
          top: "8%",
          left: "12%",
          width: "32rem",
          height: "32rem",
          borderRadius: "50%",
          background: colors[0],
          filter: "blur(160px)",
        }}
      />
      <div
        className="absolute"
        style={{
          top: "30%",
          right: "8%",
          width: "28rem",
          height: "28rem",
          borderRadius: "50%",
          background: colors[1],
          filter: "blur(160px)",
        }}
      />
      <div
        className="absolute"
        style={{
          bottom: "10%",
          left: "30%",
          width: "30rem",
          height: "30rem",
          borderRadius: "50%",
          background: colors[2] ?? colors[0],
          filter: "blur(180px)",
        }}
      />
    </div>
  );
}
