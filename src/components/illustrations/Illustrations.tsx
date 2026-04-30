import { sketchbook } from "../../styles/sketchbook";

type IllustrationProps = { size?: number };

export function ChatbotIllustration({ size = 64 }: IllustrationProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <rect
        x="8"
        y="14"
        width="48"
        height="34"
        rx="6"
        stroke={sketchbook.ink}
        strokeWidth="2"
        fill={sketchbook.paper}
      />
      <circle cx="22" cy="30" r="2.5" fill={sketchbook.red} />
      <circle cx="32" cy="30" r="2.5" fill={sketchbook.red} />
      <circle cx="42" cy="30" r="2.5" fill={sketchbook.red} />
      <path
        d="M22 42 Q32 48 42 42"
        stroke={sketchbook.red}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M28 14 V8 H36 V14" stroke={sketchbook.ink} strokeWidth="2" fill="none" />
      <circle cx="32" cy="6" r="2" fill={sketchbook.green} />
      <path d="M16 50 L12 56" stroke={sketchbook.ink} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function RasaIllustration({ size = 64 }: IllustrationProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle
        cx="32"
        cy="32"
        r="22"
        stroke={sketchbook.ink}
        strokeWidth="2"
        fill={sketchbook.paper}
      />
      <path
        d="M22 28 Q32 20 42 28 M22 36 Q32 44 42 36"
        stroke={sketchbook.red}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="32" cy="32" r="3" fill={sketchbook.green} />
      <text
        x="32"
        y="60"
        textAnchor="middle"
        fontSize="9"
        fontFamily="Caveat, cursive"
        fill={sketchbook.ink}
      >
        chatbot
      </text>
    </svg>
  );
}

export function BlockchainIllustration({ size = 64 }: IllustrationProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <rect
        x="6"
        y="14"
        width="14"
        height="14"
        stroke={sketchbook.ink}
        strokeWidth="2"
        fill={sketchbook.paper}
      />
      <rect
        x="25"
        y="25"
        width="14"
        height="14"
        stroke={sketchbook.ink}
        strokeWidth="2"
        fill={sketchbook.paper}
      />
      <rect
        x="44"
        y="14"
        width="14"
        height="14"
        stroke={sketchbook.ink}
        strokeWidth="2"
        fill={sketchbook.paper}
      />
      <rect
        x="25"
        y="44"
        width="14"
        height="14"
        stroke={sketchbook.ink}
        strokeWidth="2"
        fill={sketchbook.paper}
      />
      <path
        d="M20 22 L25 30 M39 30 L44 22 M32 39 V44"
        stroke={sketchbook.blue}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MusicIllustration({ size = 64 }: IllustrationProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path
        d="M20 44 V14 L48 10 V40"
        stroke={sketchbook.ink}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="18" cy="46" r="6" fill={sketchbook.red} stroke={sketchbook.ink} strokeWidth="2" />
      <circle cx="46" cy="42" r="6" fill={sketchbook.red} stroke={sketchbook.ink} strokeWidth="2" />
      <path d="M20 22 L48 18" stroke={sketchbook.ink} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function HealthIllustration({ size = 64 }: IllustrationProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <rect
        x="8"
        y="20"
        width="48"
        height="28"
        rx="4"
        stroke={sketchbook.ink}
        strokeWidth="2"
        fill={sketchbook.paper}
      />
      <path
        d="M14 36 L20 36 L24 28 L32 44 L36 32 L42 36 L50 36"
        stroke={sketchbook.red}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M28 20 V14 H36 V20" stroke={sketchbook.ink} strokeWidth="2" fill="none" />
    </svg>
  );
}

export function DiplomaIllustration({ size = 64 }: IllustrationProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <rect
        x="10"
        y="12"
        width="44"
        height="38"
        stroke={sketchbook.ink}
        strokeWidth="2"
        fill={sketchbook.paper}
      />
      <line x1="16" y1="22" x2="48" y2="22" stroke={sketchbook.inkSoft} strokeWidth="1" />
      <line x1="16" y1="28" x2="48" y2="28" stroke={sketchbook.inkSoft} strokeWidth="1" />
      <line x1="16" y1="34" x2="40" y2="34" stroke={sketchbook.inkSoft} strokeWidth="1" />
      <circle
        cx="46"
        cy="44"
        r="6"
        fill={sketchbook.red}
        stroke={sketchbook.ink}
        strokeWidth="1.5"
      />
      <path d="M46 50 L43 58 M46 50 L49 58" stroke={sketchbook.red} strokeWidth="1.5" />
    </svg>
  );
}

export function WorldIllustration({ size = 64 }: IllustrationProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle
        cx="32"
        cy="32"
        r="22"
        stroke={sketchbook.ink}
        strokeWidth="2"
        fill={sketchbook.paper}
      />
      <path
        d="M10 32 Q32 24 54 32 M10 32 Q32 40 54 32"
        stroke={sketchbook.blue}
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M32 10 Q24 32 32 54 M32 10 Q40 32 32 54"
        stroke={sketchbook.blue}
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="22" cy="20" r="2" fill={sketchbook.red} />
      <circle cx="44" cy="44" r="2" fill={sketchbook.green} />
    </svg>
  );
}

export function PortraitIllustration({ size = 200 }: IllustrationProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" aria-hidden="true">
      <circle
        cx="100"
        cy="100"
        r="90"
        stroke={sketchbook.ink}
        strokeWidth="3"
        fill={sketchbook.paperDark}
      />
      <circle
        cx="100"
        cy="85"
        r="38"
        stroke={sketchbook.ink}
        strokeWidth="3"
        fill={sketchbook.paper}
      />
      <path
        d="M40 175 Q60 130 100 130 Q140 130 160 175"
        stroke={sketchbook.ink}
        strokeWidth="3"
        fill={sketchbook.paper}
      />
      <circle cx="86" cy="82" r="3" fill={sketchbook.ink} />
      <circle cx="114" cy="82" r="3" fill={sketchbook.ink} />
      <path
        d="M86 100 Q100 110 114 100"
        stroke={sketchbook.ink}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M70 60 Q80 50 90 55 Q100 48 110 55 Q120 50 130 60"
        stroke={sketchbook.ink}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="160" cy="55" r="8" fill={sketchbook.red} opacity="0.8" />
      <circle cx="40" cy="140" r="6" fill={sketchbook.green} opacity="0.7" />
      <path d="M150 165 L165 150" stroke={sketchbook.red} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function PageTear() {
  return (
    <div className="relative h-12 my-4" aria-hidden="true">
      <svg className="w-full h-full" viewBox="0 0 1000 40" preserveAspectRatio="none">
        <path
          d="M0 20 Q50 10 100 20 T200 20 T300 20 T400 20 T500 20 T600 20 T700 20 T800 20 T900 20 T1000 20"
          stroke={sketchbook.ink}
          strokeWidth="1.5"
          strokeDasharray="6 4"
          fill="none"
        />
      </svg>
    </div>
  );
}
