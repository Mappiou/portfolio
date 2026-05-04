import type { Language } from "../../i18n";

type Props = { className?: string };

export function FrenchFlag({ className }: Props) {
  return (
    <svg
      viewBox="0 0 90 60"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="30" height="60" fill="#002654" />
      <rect x="30" width="30" height="60" fill="#FFFFFF" />
      <rect x="60" width="30" height="60" fill="#ED2939" />
    </svg>
  );
}

export function BritishFlag({ className }: Props) {
  return (
    <svg
      viewBox="0 0 60 30"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <clipPath id="uk-clip">
        <rect width="60" height="30" />
      </clipPath>
      <g clipPath="url(#uk-clip)">
        <rect width="60" height="30" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" strokeWidth="6" />
        <path
          d="M0,0 L60,30 M60,0 L0,30"
          stroke="#C8102E"
          strokeWidth="4"
          clipPath="polygon(0 0, 50% 0, 50% 50%, 0 50%, 0 0, 50% 50%, 0 100%, 50% 100%, 50% 50%, 100% 50%, 100% 100%, 50% 100%, 50% 50%, 100% 50%, 100% 0, 50% 0)"
        />
        <rect x="25" width="10" height="30" fill="#FFFFFF" />
        <rect y="10" width="60" height="10" fill="#FFFFFF" />
        <rect x="27" width="6" height="30" fill="#C8102E" />
        <rect y="12" width="60" height="6" fill="#C8102E" />
      </g>
    </svg>
  );
}

export function SpanishFlag({ className }: Props) {
  return (
    <svg
      viewBox="0 0 90 60"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="90" height="15" fill="#AA151B" />
      <rect y="15" width="90" height="30" fill="#F1BF00" />
      <rect y="45" width="90" height="15" fill="#AA151B" />
    </svg>
  );
}

export function FlagFor({ lang, className }: { lang: Language; className?: string }) {
  if (lang === "fr") return <FrenchFlag className={className} />;
  if (lang === "en") return <BritishFlag className={className} />;
  return <SpanishFlag className={className} />;
}
