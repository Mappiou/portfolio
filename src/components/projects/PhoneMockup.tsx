import type { Project } from "../../data/types";
import type { Language } from "../../i18n";
import { palette } from "../../styles/palette";

const accentMap: Record<NonNullable<Project["accent"]>, string> = {
  red: palette.rust,
  green: palette.mint,
  blue: palette.babyblue,
  yellow: palette.yellow,
};

type Props = {
  project: Project;
  lang: Language;
  /** When set, renders that real screenshot instead of the placeholder */
  src?: string;
  /** Index of this mockup in a row of mockups — used to slightly tilt them */
  index?: number;
  /** Pass a string time like "9:41" to display in the status bar */
  time?: string;
};

export function PhoneMockup({ project, lang, src, index = 0, time = "9:41" }: Props) {
  const accent = accentMap[project.accent];
  const tilt = ((index % 3) - 1) * 1.5; // -1.5°, 0°, +1.5°

  return (
    <div
      className="relative shrink-0"
      style={{
        width: 220,
        transform: `rotate(${tilt}deg)`,
        transition: "transform 0.3s ease",
      }}
    >
      {/* Phone bezel */}
      <div
        className="relative rounded-[40px] p-2.5"
        style={{
          aspectRatio: "9 / 19.5",
          background: "linear-gradient(160deg, #1A1A1A 0%, #2C2C2C 100%)",
          boxShadow:
            "0 20px 50px -20px rgba(14,83,77,0.4), 0 8px 16px -8px rgba(0,0,0,0.2), inset 0 0 0 1.5px rgba(255,255,255,0.08)",
        }}
      >
        {/* Screen */}
        <div
          className="relative w-full h-full overflow-hidden rounded-[30px]"
          style={{
            background: src
              ? "#000"
              : `linear-gradient(180deg, ${accent} 0%, rgba(255,255,255,0.5) 100%)`,
          }}
        >
          {/* Notch */}
          <div
            className="absolute left-1/2 -translate-x-1/2 z-20 rounded-b-2xl"
            style={{
              top: 0,
              width: 70,
              height: 18,
              background: "#1A1A1A",
            }}
            aria-hidden="true"
          />

          {src ? (
            <img
              src={src}
              alt={`${project.name} screenshot`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <PlaceholderContent project={project} lang={lang} time={time} accent={accent} />
          )}
        </div>
      </div>
    </div>
  );
}

function PlaceholderContent({
  project,
  lang,
  time,
  accent,
}: {
  project: Project;
  lang: Language;
  time: string;
  accent: string;
}) {
  return (
    <div className="absolute inset-0 flex flex-col">
      {/* Status bar */}
      <div
        className="flex items-center justify-between px-5 pt-3 pb-1.5 text-[10px] font-semibold"
        style={{ color: palette.textPrimary }}
      >
        <span>{time}</span>
        <span className="flex items-center gap-1">
          <span>•••</span>
          <span>WiFi</span>
          <span>📶</span>
        </span>
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-6 text-center">
        <div
          className="rounded-3xl flex items-center justify-center mb-3"
          style={{
            width: 64,
            height: 64,
            background: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(8px)",
            fontSize: 36,
          }}
          aria-hidden="true"
        >
          {project.emoji}
        </div>
        <p
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 700,
            fontSize: 17,
            letterSpacing: "-0.01em",
            color: palette.textPrimary,
            lineHeight: 1.1,
          }}
        >
          {project.name}
        </p>
        <p
          className="mt-1.5 mb-4"
          style={{
            fontSize: 9,
            lineHeight: 1.3,
            color: palette.textSecondary,
            fontStyle: "italic",
            maxWidth: 160,
          }}
        >
          {project.tagline[lang]}
        </p>

        {/* Fake feature lines (mini cards) */}
        <div className="w-full flex flex-col gap-1.5">
          {project.features.slice(0, 3).map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5"
              style={{
                background: "rgba(255,255,255,0.55)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.5)",
              }}
            >
              <span
                className="rounded-full shrink-0"
                style={{
                  width: 6,
                  height: 6,
                  background: accent,
                  filter: "saturate(2)",
                }}
                aria-hidden="true"
              />
              <span
                className="truncate text-left flex-1"
                style={{
                  fontSize: 8,
                  lineHeight: 1.2,
                  color: palette.textPrimary,
                  fontWeight: 500,
                }}
              >
                {f[lang]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Home indicator */}
      <div className="flex justify-center pb-1.5">
        <span
          className="rounded-full"
          style={{
            width: 80,
            height: 4,
            background: "rgba(0,0,0,0.25)",
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
