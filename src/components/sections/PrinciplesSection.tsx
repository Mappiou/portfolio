import { useTranslation, Trans } from "react-i18next";
import { palette, tokens } from "../../styles/palette";
import { principles } from "../../data/principles";
import { useLanguageRoute } from "../../hooks/useLanguageRoute";

export function PrinciplesSection() {
  const { t } = useTranslation();
  const lang = useLanguageRoute();

  return (
    <section
      id="principles"
      className="relative z-10 mx-auto px-6 pb-24"
      style={{ maxWidth: tokens.pageMaxWidth }}
      aria-labelledby="principles-heading"
    >
      <div
        className="relative rounded-[64px] px-6 md:px-12 lg:px-16 pt-16 pb-20"
        style={{
          background: palette.white30,
          backdropFilter: "blur(12px) saturate(1.3)",
          WebkitBackdropFilter: "blur(12px) saturate(1.3)",
          border: "1px solid rgba(255,255,255,0.5)",
        }}
      >
        <div className="text-center mb-12">
          <p
            className="inline-block px-4 py-1.5 rounded-full mb-4"
            style={{
              background: "rgba(255,255,255,0.6)",
              color: palette.textSecondary,
              fontSize: 13,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            ◆ {t("principles.kicker")}
          </p>
          <h2
            id="principles-heading"
            style={{
              fontFamily: tokens.fontTitle,
              fontWeight: 600,
              fontSize: "clamp(32px, 4vw, 56px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: palette.textPrimary,
            }}
          >
            <Trans
              i18nKey="principles.title"
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
                br: <br />,
              }}
            />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
          {principles.map((p) => (
            <div key={p.n}>
              <p
                style={{
                  fontFamily: tokens.fontTitle,
                  fontWeight: 600,
                  fontSize: 32,
                  color: palette.textPrimary,
                  opacity: 0.45,
                  marginBottom: 8,
                  letterSpacing: "-0.01em",
                }}
              >
                {p.n}
              </p>
              <h3
                style={{
                  fontFamily: tokens.fontTitle,
                  fontWeight: 600,
                  fontSize: "clamp(22px, 1.9vw, 28px)",
                  letterSpacing: "-0.015em",
                  lineHeight: 1.2,
                  color: palette.textPrimary,
                }}
              >
                {p.title[lang]}
              </h3>
              <p
                className="mt-3"
                style={{ fontSize: 16, lineHeight: 1.65, color: palette.textSecondary }}
              >
                {p.desc[lang]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
