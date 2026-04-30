import { useTranslation, Trans } from "react-i18next";
import { palette, tokens } from "../../styles/palette";
import { experiences } from "../../data/experiences";
import { useLanguageRoute } from "../../hooks/useLanguageRoute";

export function TimelineSection() {
  const { t } = useTranslation();
  const lang = useLanguageRoute();

  return (
    <section
      id="timeline"
      className="relative z-10 mx-auto px-6 pb-24"
      style={{ maxWidth: tokens.pageMaxWidth }}
      aria-labelledby="timeline-heading"
    >
      <h2
        id="timeline-heading"
        className="text-center mb-10"
        style={{
          fontFamily: tokens.fontTitle,
          fontWeight: 600,
          fontSize: "clamp(36px, 4.5vw, 64px)",
          letterSpacing: "-0.03em",
          lineHeight: 1.05,
          color: palette.textPrimary,
        }}
      >
        <Trans
          i18nKey="timeline.title"
          components={{
            italic: (
              <span
                style={{
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontFamily: tokens.fontItalic,
                }}
              />
            ),
          }}
        />
      </h2>

      <div className="flex flex-col gap-3.5">
        {experiences.map((entry) => (
          <div
            key={entry.id}
            className="flex items-center gap-4 md:gap-8 px-5 md:px-7 py-3.5 md:py-4 rounded-full"
            style={{
              background: palette.teal,
              color: palette.textTertiary,
            }}
          >
            <span
              style={{
                fontFamily: tokens.fontTitle,
                fontSize: "clamp(15px, 1.4vw, 20px)",
                fontWeight: 500,
                flex: "0 0 max-content",
                letterSpacing: "-0.01em",
                minWidth: 130,
              }}
            >
              {entry.period[lang]}
            </span>
            <span
              style={{
                fontSize: "clamp(15px, 1.3vw, 19px)",
                fontWeight: 600,
                flex: "1 1 auto",
              }}
            >
              {entry.company}
            </span>
            <span
              className="hidden md:inline"
              style={{
                fontSize: "clamp(13px, 1vw, 16px)",
                color: palette.textQuarterly,
                flex: "0 0 auto",
                textAlign: "right",
              }}
            >
              {entry.role[lang]}
            </span>
          </div>
        ))}
      </div>

      <p
        className="text-center text-sm mt-6"
        style={{ color: palette.textSecondary, fontStyle: "italic" }}
      >
        {t("timeline.note")}
      </p>
    </section>
  );
}
