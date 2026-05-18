import { useTranslation, Trans } from "react-i18next";
import { palette, tokens } from "../../styles/palette";

export function Hero() {
  const { t } = useTranslation();
  return (
    <section
      className="relative z-10 mx-auto px-6 md:px-10"
      style={{
        maxWidth: tokens.pageMaxWidth,
        paddingTop: "clamp(80px, 12vw, 140px)",
        paddingBottom: "clamp(80px, 12vw, 160px)",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end">
        <div className="md:col-span-6">
          <div
            className="relative overflow-hidden"
            style={{ aspectRatio: "4 / 5" }}
          >
            <img
              src="https://picsum.photos/seed/mathieu-portrait/800/1000"
              alt="Mathieu Diep"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "sepia(8%) saturate(110%)",
              }}
            />
          </div>
          <p
            className="mt-3"
            style={{
              fontFamily: tokens.fontItalic,
              fontStyle: "italic",
              fontSize: 14,
              color: palette.textSecondary,
              fontWeight: 300,
            }}
          >
            — Mathieu Diep, Barcelone, mai 2026.
          </p>
        </div>

        <div className="md:col-span-6" style={{ paddingBottom: 24 }}>
          <p
            className="flex items-center gap-3 mb-8"
            style={{
              fontFamily: tokens.fontMono,
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: palette.textSecondary,
              fontWeight: 400,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                width: 28,
                height: 1,
                background: palette.teal,
              }}
            />
            <span>§ {t("hero.kicker")}</span>
          </p>
          <h1
            style={{
              fontFamily: tokens.fontTitle,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(56px, 8vw, 112px)",
              lineHeight: 0.94,
              letterSpacing: "-0.035em",
              color: palette.textPrimary,
              margin: 0,
              fontFeatureSettings: '"ss01", "ss02"',
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
                      color: palette.teal,
                    }}
                  />
                ),
              }}
            />
          </h1>
          <p
            className="mt-9"
            style={{
              fontSize: 19,
              lineHeight: 1.55,
              color: palette.textPrimary,
              maxWidth: 480,
              fontWeight: 400,
            }}
          >
            {t("bio.intro")}
          </p>
          <a
            href="#about"
            className="inline-flex items-center gap-3 mt-14 transition-all"
            style={{
              fontFamily: tokens.fontMono,
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: palette.textPrimary,
              textDecoration: "none",
              borderBottom: `1px solid ${palette.hairlineStrong}`,
              paddingBottom: 6,
            }}
          >
            <span>↓ {t("nav.home")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
