import { useTranslation, Trans } from "react-i18next";
import { palette, tokens } from "../../styles/palette";

export function Hero() {
  const { t } = useTranslation();
  return (
    <section
      className="relative z-10 px-6 pt-24 pb-12 mx-auto text-center"
      style={{ maxWidth: tokens.pageMaxWidth }}
    >
      <p
        className="mb-5 inline-block px-4 py-1.5 rounded-full"
        style={{
          background: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(10px)",
          color: palette.textSecondary,
          fontSize: 14,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          fontWeight: 500,
        }}
      >
        ✱ {t("hero.kicker")}
      </p>
      <h1
        style={{
          fontFamily: tokens.fontTitle,
          fontWeight: 600,
          fontSize: "clamp(56px, 9vw, 140px)",
          lineHeight: 0.92,
          letterSpacing: "-0.04em",
          color: palette.textPrimary,
          fontVariationSettings: tokens.fontVariation,
          margin: 0,
        }}
      >
        <Trans
          i18nKey="hero.title"
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
      </h1>
    </section>
  );
}
