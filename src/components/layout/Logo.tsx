import { sketchbook } from "../../styles/sketchbook";

export function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      role="img"
      aria-label="Mathieu Diep logo"
    >
      <circle
        cx="20"
        cy="20"
        r="17"
        stroke={sketchbook.ink}
        strokeWidth="2"
        fill={sketchbook.paper}
      />
      <path
        d="M12 22 Q14 18 18 20 T28 16"
        stroke={sketchbook.red}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="28" cy="16" r="1.6" fill={sketchbook.red} />
    </svg>
  );
}
