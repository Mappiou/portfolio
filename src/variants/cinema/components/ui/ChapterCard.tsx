import type { ReactNode } from "react";
import { palette, tokens } from "../../styles/palette";

type Props = {
  chapter: string;
  title: ReactNode;
  bgSrc: string;
  alt?: string;
  headingId?: string;
};

export function ChapterCard({ chapter, title, bgSrc, alt = "", headingId }: Props) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        height: "56vh",
        minHeight: 380,
      }}
    >
      <div className="absolute inset-0">
        <img
          src={bgSrc}
          alt={alt}
          aria-hidden={alt === ""}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "contrast(115%) saturate(70%) brightness(60%)",
            opacity: 0.4,
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #0E0D0B 0%, rgba(14,13,11,0.2) 50%, #0E0D0B 100%)",
          }}
        />
      </div>
      <div
        className="relative flex flex-col items-center justify-center h-full text-center"
        style={{ zIndex: 2, padding: "0 48px" }}
      >
        <div
          style={{
            fontFamily: tokens.fontMono,
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: palette.textSecondary,
            marginBottom: 32,
          }}
        >
          {chapter}
        </div>
        <span
          aria-hidden="true"
          style={{
            display: "block",
            width: 64,
            height: 1,
            background: "rgba(239,233,221,0.22)",
            margin: "0 auto 32px",
          }}
        />
        <h2
          id={headingId}
          style={{
            fontFamily: tokens.fontTitle,
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: "clamp(64px, 9vw, 128px)",
            lineHeight: 0.95,
            letterSpacing: "-0.025em",
            color: palette.textPrimary,
          }}
        >
          {title}
        </h2>
      </div>
    </div>
  );
}
